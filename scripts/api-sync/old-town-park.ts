import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.oldtownpark.com/building/tower-1";

async function main() {
  const apartment = await prisma.apartment.findFirst({
    where: { website: WEBSITE }
  });

  if (isNullOrUndefined(apartment)) {
    return;
  }

  const response = await request(WEBSITE);
  const HTML = await response.body.text();

  const dom = cheerio.load(HTML);

  dom
    .root()
    .find(".js-floorplan-grid .js-plan-item")
    .each((i, el) => {
      const entry = cheerio.load(el);
      const split = entry.root().find(".floorplan__details__inner p").text().trim().split("\n");

      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(
          entry
            .root()
            .find(".floorplan__details__inner h3")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        title: String(
          entry
            .root()
            .find(".floorplan__details__inner h3")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        squareFootage: isNaN(Number(split[2].replace(/\D/g, ""))) ? 0 : Number(split[2].replace(/\D/g, "")),
        bedrooms: isNaN(Number(split[0].replace(/\D/g, ""))) ? 0 : Number(split[0].replace(/\D/g, "")),
        bathrooms: 0,
        floorPlanImage: String(entry.root().find(".floorplan__img").attr("src")),
        availableUnits: 1,
        minPrice: split[5] ? Number(split[5].replace(/\D/g, "")) : 0,
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
