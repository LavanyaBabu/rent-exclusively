import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.oldtownpark.com/building/tower-3";

const URL = "https://www.oldtownpark.com/building/tower-3";

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
        squareFootage: isNaN(Number(entry.root().find(".yard__card__details :nth-child(1) .text-upper").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".yard__card__details :nth-child(1) .text-upper").text().replace(/\D/g, "")),
        bedrooms: isNaN(Number(entry.root().find(".yard__card__heading .align-l p").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".yard__card__heading .align-l p").text().replace(/\D/g, "")),
        bathrooms: 0,
        floorPlanImage: String(entry.root().find(".yard__img").attr("src")),
        availableUnits: 1,
        minPrice: Number(entry.root().find(".yard__card__heading .align-r .price").text().replace(/\D/g, "")),
        dataDump: entry.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request("https://www.oldtownpark.com/gallery");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find(".gallery a")
    .each((i, el) => {
      const { href } = el.attribs;

      const apartmentImage: any = {
        url: href,
        type: ApartmentImageTypeType.OTHER,
        default: i === 0
      };

      (async () => {
        try {
          await prisma.apartmentImage.upsert({
            where: {
              url: href
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
