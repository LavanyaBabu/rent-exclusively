import * as cheerio from "cheerio";
import { request } from "undici";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.rentnemachicago.com";
export const URL = "https://www.rentnemachicago.com/availability";

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
  const images: any = [];

  dom
    .root()
    .find(".availabilities-list__items .floorplan-availabilities-list__items")
    .each((i, el) => {
      const unit = cheerio.load(el);

      images.push(unit.root().find(".floorplan-availabilities-list__item").attr("data-image"));
    });

  dom
    .root()
    .find(".availabilities-list__items .availabilities-list__item")
    .each((i, el) => {
      const unit = cheerio.load(el);

      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(unit.root().find(".availabilities-list__item").attr("data-unit")),
        title: String(unit.root().find(".availabilities-list__item").attr("data-unit")),
        bedrooms: Number(unit.root().find(".availabilities-list__item").attr("data-unit-beds")),
        bathrooms: Number(unit.root().find(".availabilities-list__item").attr("data-unit-bath")),
        squareFootage: Number(unit.root().find(".availabilities-list__item").attr("data-sqft")),
        floorPlanImage: images[i],
        availableUnits: 1,
        minPrice: Number(unit.root().find(".availabilities-list__item").attr("data-rent")),
        dataDump: unit.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request("https://www.rentnemachicago.com/gallery");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  const types: any = {
    Architecture: "ARCHITECTURE",
    Amenities: "AMENITIES",
    "Skyline Collection Amenities": "AMENITIES",
    "Signature Residences": "RESIDENCES",
    "Skyline Collection Residences": "RESIDENCES",
    Neighborhood: "NEIGHBORHOOD"
  };

  gallery_dom
    .root()
    .find(".gallery .gallery__images")
    .each((i, el) => {
      const entry = cheerio.load(el);
      const header = entry.root().find("h3").text();
      entry
        .root()
        .find(".gallery__carousel .gallery__carousel__item")
        .each((j, el) => {
          const unit = cheerio.load(el);
          const src = unit.root().find("img").attr("data-src");

          const apartmentImage: any = {
            url: src,
            type: types[header],
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
