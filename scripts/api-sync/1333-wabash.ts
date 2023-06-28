import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.1333wabash.com";
const URL = "https://www.1333wabash.com/floorplans";
const GALLERY_URL = "https://www.1333wabash.com/photogallery";

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
  let counter = 0;

  dom
    .root()
    .find("#floorPlanAccordion>div")
    .each((i, el) => {
      const entry = cheerio.load(el);
      entry
        .root()
        .find(".fp-container")
        .each((j, unitElement) => {
          const unit = cheerio.load(unitElement);

          const apartmentUnit = {
            apartmentId: apartment.id,
            name: String(unit.root().find(`[data-selenium-id=Floorplan${counter}Name]`).text()),
            title: String(unit.root().find(`[data-selenium-id=Floorplan${counter}Name]`).text()),
            bedrooms: Number(unit.root().find(`[data-selenium-id=Floorplan${counter}Beds]`).text().replace(/\D/g, "")),
            bathrooms: Number(unit.root().find(`[data-selenium-id=Floorplan${counter}Baths]`).text().replace(/\D/g, "")),
            squareFootage: Number(unit.root().find(`[data-selenium-id=Floorplan${counter}SqFt]`).text().replace(/\D/g, "")),
            floorPlanImage: String(unit.root().find(`[data-selenium-id=Floorplan${counter}Image]`).attr("src")),
            availableUnits: Number(unit.root().find(`[data-selenium-id='Floorplan${counter} Availability']`).text().replace(/\D/g, "")),
            minPrice: Number(unit.root().find(`[data-selenium-id='Floorplan${counter}Rent']`).text().split("-")[0].replace(/\D/g, "")),
            maxPrice: Number(unit.root().find(`[data-selenium-id='Floorplan${counter}Rent']`).text().split("-")[1].replace(/\D/g, "")),
            dataDump: unit.html()
          };

          (async () => {
            await prisma.apartmentUnit.create({
              data: apartmentUnit
            });
          })();
          counter++;
        });
    });

  const gallery = await request(GALLERY_URL, {
    bodyTimeout: 0,
    headersTimeout: 0
  });
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find("#Photos .gallery-thumbnails li > img")
    .each((i, el) => {
      const src = el.attribs["data-src"];

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
