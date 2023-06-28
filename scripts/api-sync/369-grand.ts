import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://369grand.com";

const URL = "https://369grand.com/floorplans";
const GALLERY_URL = `${WEBSITE}/gallery`;

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
    .find(".js-floorplan-grid .js-plan-item")
    .each((i, el) => {
      const entry = cheerio.load(el);
      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(
          entry
            .root()
            .find(".yard__card__heading .align-l h2")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        title: String(
          entry
            .root()
            .find(".yard__card__heading .align-l h2")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        squareFootage: isNaN(Number(entry.root().find(".content--yard .text-upper").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".content--yard .text-upper").text().replace(/\D/g, "")),
        bedrooms: isNaN(Number(entry.root().find(".yard__card__heading .align-l p").text().split("/")[0].replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".yard__card__heading .align-l p").text().split("/")[0].replace(/\D/g, "")),
        bathrooms: 0,
        floorPlanImage: String(entry.root().find(".yard__img").attr("src")),
        availableUnits: 1,
        minPrice: isNaN(Number(entry.root().find(".price").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".price").text().replace(/\D/g, "")),
        dataDump: entry.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request(GALLERY_URL, {
    bodyTimeout: 0,
    headersTimeout: 0
  });
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find(".gallery .gallery__img")
    .each((i, el: any) => {
      const src = el.attribs["data-bgset"].split(" ")[0];

      const apartmentImage: any = {
        url: src,
        type: ApartmentImageTypeType.OTHER,
        default: i === 0
      };

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
    });
}

export default main;
