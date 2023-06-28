import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.sinclairapts.com";

const URL = "https://www.sinclairapts.com/apartment-floor-plans/";

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
    .find(".landing-list .landing-item")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(entry.root().find(".modal-target h2").text()),
        title: String(entry.root().find(".modal-target h2").text()),
        squareFootage: isNaN(Number(entry.root().find(".modal-target :nth-child(2)").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".modal-target :nth-child(2)").text().replace(/\D/g, "")),
        bedrooms: 0,
        bathrooms: 0,
        floorPlanImage: String(entry.root().find(".floorimage img").attr("src")),
        availableUnits: 1,
        minPrice: Number(entry.root().find(".modal-target :nth-child(3)").text().replace(/\D/g, "")),
        dataDump: entry.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request("https://www.sinclairapts.com/apartment-gallery/");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find(".gallery div")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const src = entry.root().find("img").attr("src");

      const apartmentImage: any = {
        url: src,
        type: ApartmentImageTypeType.OTHER,
        default: i === 0
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
}

export default main;
