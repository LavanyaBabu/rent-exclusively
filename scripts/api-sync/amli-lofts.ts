import * as cheerio from "cheerio";
import { request } from "undici";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.amli.com/apartments/chicago/south-loop-apartments/amli-lofts";

export const URL = "https://www.amli.com/apartments/chicago/south-loop-apartments/amli-lofts/floorplans";

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
    .find("floorplansfloorplancardviewlist0")
    .each((i, el) => {
      const unit = cheerio.load(el);

      unit
        .root()
        .find(".floorplan-list-item")
        .each((i, el) => {
          const entry = cheerio.load(el);

          const apartmentUnit = {
            apartmentId: apartment.id,
            name: String(entry.root().find(".floorplan-title").text()),
            title: String(entry.root().find(".floorplan-title").text()),
            bedrooms: Number(entry.root().find(".floorplan-beds").text().replace(/\D/g, "")),
            bathrooms: Number(entry.root().find(".floorplan-baths").text().replace(/\D/g, "")),
            squareFootage: Number(entry.root().find(".floorplan-size").text().replace(/\D/g, "")),
            floorPlanImage: String(entry.root().find(".floorplan-img-container img").attr("src")),
            availableUnits: 0,
            minPrice: Number(entry.root().find(".floorplan-pricing").text().replace(/\D/g, "")),
            dataDump: entry.html()
          };

          (async () => {
            await prisma.apartmentUnit.create({
              data: apartmentUnit
            });
          })();
        });
    });
}

export default main;
