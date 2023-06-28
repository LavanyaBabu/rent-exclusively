import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.oldtownpark.com/building/tower-2";

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

      const splitByBed = entry
        .root()
        .find(".floorplan__details .float-l p")
        .text()
        .replace(/(\r\n|\n|\r)/gm, "")
        .trim()
        .split("Bed");

      let splitBySqft: any = [];
      let sqft = 0;
      let price = 0;
      let bed = 0;
      if (splitByBed.length === 1) {
        splitBySqft = splitByBed[0].split("sqft");
        sqft = Number(splitBySqft[0].trim().replace(/\D/g, ""));
        price = Number(splitBySqft[1].trim().replace(/\D/g, ""));
      } else {
        splitBySqft = splitByBed[1].split("sqft");
        sqft = Number(splitBySqft[0].trim().replace(/\D/g, ""));
        price = Number(splitBySqft[1].trim().replace(/\D/g, ""));
        bed = isNaN(Number(splitByBed[0].trim())) ? 0 : Number(splitByBed[0].trim());
      }

      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(
          entry
            .root()
            .find(".floorplan__details .float-l h3")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        title: String(
          entry
            .root()
            .find(".floorplan__details .float-l h3")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        squareFootage: isNaN(sqft) ? 0 : sqft,
        bedrooms: bed,
        bathrooms: 0,
        floorPlanImage: String(entry.root().find(".floorplan__img").attr("src")),
        availableUnits: 1,
        minPrice: isNaN(price) ? 0 : price,
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
