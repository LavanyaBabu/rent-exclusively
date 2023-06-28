import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.arrivelex.com";
export const URL = "https://www.arrivelex.com/chicago-il-apartments/arrive-lex/conventional/";

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
    .find("#floorplan-overview-content .accoridan-panel")
    .each((i, e) => {
      const entry = cheerio.load(e);

      entry
        .root()
        .find(".fp-group-item")
        .each((j, el) => {
          const unit = cheerio.load(el);

          const apartmentUnit = {
            apartmentId: apartment.id,
            name: String(unit.root().find(".fp-name").text()),
            title: String(unit.root().find(".fp-name").text()),
            bedrooms: Number(unit.root().find("meta[itemprop='numberOfBedrooms']").attr("content")),
            bathrooms: Number(unit.root().find("meta[itemprop='numberOfBathroomsTotal']").attr("content")),
            floorPlanImage: unit.root().find(".image-link img").attr("src") || "",
            availableUnits: 1,
            minPrice: Number(unit.root().find(".rent").text().replace(/\D/g, "")),
            squareFootage: Number(unit.root().find(".sq-feet").text().replace(/\D/g, "")),
            dataDump: unit.html()
          };

          (async () => {
            await prisma.apartmentUnit.create({
              data: apartmentUnit
            });
          })();
        });
    });

  const gallery = await request("https://www.arrivelex.com/chicago-il-apartments/arrive-lex/photos/", {
    bodyTimeout: 0,
    headersTimeout: 0
  });
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find("#galleria-viewer-img a")
    .each((i, el) => {
      const src = el.attribs["href"];

      const apartmentImage: any = {
        url: src,
        type: ApartmentImageTypeType.OTHER,
        default: i === 0
      };

      (async () => {
        try {
          await prisma.apartmentImage.upsert({
            where: {
              url: `${WEBSITE}${src}`
            },
            update: {},
            create: { apartmentId: apartment.id, ...apartmentImage }
          });
        } catch (e) {
          console.error(e);
        }
      })();
    });
}

export default main;
