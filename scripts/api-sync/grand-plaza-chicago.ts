import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.grandplazachicago.com/grand-plaza-chicago-il";
export const URL = "https://www.grandplazachicago.com/grand-plaza-chicago-il/floorplans";

async function main() {
  const apartment = await prisma.apartment.findFirst({
    where: { website: WEBSITE }
  });

  if (isNullOrUndefined(apartment)) {
    return;
  }

  const response = await request(URL, {
    bodyTimeout: 0,
    headersTimeout: 0
  });
  const HTML = await response.body.text();

  const dom = cheerio.load(HTML);

  dom
    .root()
    .find(".floorplan-tab-content .floorplan")
    .each((i, el) => {
      const unit = cheerio.load(el);

      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(unit.root().find(".title").text().trim()),
        title: String(unit.root().find(".title").text().trim()),
        bedrooms: isNaN(Number(unit.root().find(".bedbath").text().split("+")[0].replace(/\D/g, "")))
          ? 0
          : Number(unit.root().find(".bedbath").text().split("+")[0].replace(/\D/g, "")),
        bathrooms: isNaN(Number(unit.root().find(".bedbath").text().split("+")[1].replace(/\D/g, "")))
          ? 0
          : Number(unit.root().find(".bedbath").text().split("+")[1].replace(/\D/g, "")),
        squareFootage: Number(unit.root().find(".sqft").text() ? unit.root().find(".sqft").text().replace(/\D/g, "") : 0),
        floorPlanImage: String(unit.root().find(".floorplan-img img").attr("src")),
        availableUnits: 1,
        minPrice: Number(unit.root().find(".price").text() ? unit.root().find(".price").text().replace(/\D/g, "") : 0),
        dataDump: unit.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request("https://www.grandplazachicago.com/grand-plaza-chicago-il/gallery");
  const galleryHtml = await gallery.body.text();
  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find(".gallery-content .gallery-panel")
    .each((i, el) => {
      const entry = cheerio.load(el);
      entry
        .root()
        .find(".gallery-image")
        .each((j, el) => {
          const unit = cheerio.load(el);
          const src = unit.root().find("a").attr("href");

          const apartmentImage: any = {
            url: src,
            type: ApartmentImageTypeType.OTHER,
            default: i === 0 && j === 0
          };

          if (src !== undefined && src !== "") {
            (async () => {
              try {
                await prisma.apartmentImage.upsert({
                  where: {
                    url: src
                  },
                  update: {},
                  create: { apartmentId: apartment.id, ...apartmentImage }
                });
              } catch (e) {
                console.error(e);
              }
            })();
          }
        });
    });
}

export default main;
