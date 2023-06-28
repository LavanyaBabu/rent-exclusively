import * as cheerio from "cheerio";
import { request } from "undici";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.amli.com/apartments/chicago/river-north-apartments/amli-808";

const URL = "https://www.amli.com/apartments/chicago/river-north-apartments/amli-808/floorplans";

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
    .find("floorplansfloorplancardviewlist0 .floorplan-list-item")
    .each((i, el) => {
      const entry = cheerio.load(el);
      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(entry.root().find(".floorplan-title").text()),
        title: String(entry.root().find(".floorplan-title").text()),
        squareFootage: isNaN(Number(entry.root().find(".floorplan-size p").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".floorplan-size p").text().replace(/\D/g, "")),
        bedrooms: isNaN(Number(entry.root().find(".floorplan-beds p").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".floorplan-beds p").text().replace(/\D/g, "")),
        bathrooms: isNaN(Number(entry.root().find(".floorplan-baths p").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".floorplan-baths p").text().replace(/\D/g, "")),

        floorPlanImage: String(entry.root().find(".floorplan-img-container img").attr("src")),
        availableUnits: isNaN(Number(entry.root().find(".floorplan-available-units").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".floorplan-available-units").text().replace(/\D/g, "")),
        minPrice: Number(entry.root().find(".floorplan-pricing").text().replace(/\D/g, "")),
        dataDump: entry.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });
}

export default main;
