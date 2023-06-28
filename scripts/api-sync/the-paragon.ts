import * as cheerio from "cheerio";
import { request } from "undici";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.theparagonchicago.com";

async function main() {
  const apartment = await prisma.apartment.findFirst({
    where: { website: WEBSITE }
  });

  if (isNullOrUndefined(apartment)) {
    return;
  }

  const types = ["studio", 1, 2, 3];

  types.forEach(async (type) => {
    const URL = `https://www.theparagonchicago.com/floor-plans/apartments/?bedroom=${type}`;
    const response = await request(URL, {
      bodyTimeout: 0,
      headersTimeout: 0
    });
    const HTML = await response.body.text();

    const dom = cheerio.load(HTML);

    dom
      .root()
      .find(".fp-list-block-wrapper .fp-block")
      .each((j, unitElement) => {
        const unit = cheerio.load(unitElement);

        const apartmentUnit = {
          apartmentId: apartment.id,
          name: String(unit.root().find(".fp-block>h3").text()),
          title: String(unit.root().find(".fp-block>h3").text()),
          bedrooms: type === "studio" ? 0 : Number(type),
          bathrooms: Number(unit.root().find(".unit-bed-bath").text().split(",")[1].replace(/\D/g, "")),
          squareFootage: Number(unit.root().find(".sqft-rate").text().split("-")[0].replace(/\D/g, "")),
          floorPlanImage: String(unit.root().find(".unit-plan").attr("src")),
          availableUnits: 1,
          minPrice: Number(unit.root().find(".sqft-rate").text().split("-")[1].replace(/\D/g, "")),
          dataDump: unit.html()
        };

        (async () => {
          await prisma.apartmentUnit.create({
            data: apartmentUnit
          });
        })();
      });
  });

  const imageTypeArray = ["exterior", "amenities", "neighborhood", "residences"];

  imageTypeArray.forEach(async (type) => {
    const gallery = await request(`https://www.theparagonchicago.com/gallery/?slider=${type}`);
    const galleryHtml = await gallery.body.text();

    const gallery_dom = cheerio.load(galleryHtml);

    gallery_dom
      .root()
      .find(".slick-slider .slick-container")
      .each((i, el) => {
        const entry = cheerio.load(el);

        const src = entry.root().find("img").attr("src");

        const apartmentImage: any = {
          url: src,
          type: type === "exterior" ? "EXTERIORS" : type.toUpperCase(),
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
  });
}

export default main;
