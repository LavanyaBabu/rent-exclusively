import * as cheerio from "cheerio";
import { request } from "undici";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.parchuron.com";

async function main() {
  const apartment = await prisma.apartment.findFirst({
    where: { website: WEBSITE }
  });

  if (isNullOrUndefined(apartment)) {
    return;
  }

  let dataAvailable = true;
  let page = 1;

  const numbers: any = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5
  };

  while (dataAvailable) {
    const URL = `https://www.parchuron.com/floor-plans/apartments?page=${page}`;
    const response = await request(URL, {
      bodyTimeout: 0,
      headersTimeout: 0
    });
    const HTML = await response.body.text();
    const dom = cheerio.load(HTML);
    const length = dom.root().find(".content-section .result-list").length;

    if (length === 0) {
      dataAvailable = false;
    } else {
      dom
        .root()
        .find(".content-section .result-list")
        .each((i, el) => {
          const entry = cheerio.load(el);

          let bed = 0;
          let bath = 0;

          for (const key in numbers) {
            if (entry.root().find(".bedroom").text().toLowerCase().includes(key)) {
              bed = numbers[key];
            }

            if (entry.root().find(".bathrooms").text().toLowerCase().includes(key)) {
              bath = numbers[key];
            }
          }

          const apartmentUnit = {
            apartmentId: apartment.id,
            name: String(entry.root().find(".unit-no").text()),
            title: String(entry.root().find(".unit-no").text()),
            bedrooms: bed,
            bathrooms: bath,
            squareFootage: Number(entry.root().find(".sq-ft").text().replace(/\D/g, "")),
            floorPlanImage: String(entry.root().find(".unit-image img").attr("href")),
            availableUnits: 1,
            minPrice: Number(entry.root().find(".rent").text().replace(/\D/g, "")),
            dataDump: entry.html()
          };

          (async () => {
            await prisma.apartmentUnit.create({
              data: apartmentUnit
            });
          })();
        });
    }
    page++;
  }

  const gallery = await request("https://www.parchuron.com/gallery/");
  const galleryHtml = await gallery.body.text();
  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find(".selected-image .category")
    .each((i, el) => {
      const entry = cheerio.load(el);
      if (i < 3) {
        entry
          .root()
          .find("div")
          .each((j, el) => {
            const unit = cheerio.load(el);
            const src = unit.root().find("a").attr("href");

            // const apartmentImage: any = {
            //   url: src,
            //   type: ApartmentImageTypeType.OTHER,
            //   default: i === 0 && j === 0
            // };

            if (src !== undefined && src !== "") {
              (async () => {
                try {
                  // await prisma.apartmentImage.upsert({
                  //   where: {
                  //     url: src
                  //   },
                  //   update: {},
                  //   create: { apartmentId: apartment.id, ...apartmentImage }
                  // });
                } catch (e) {
                  console.error(e);
                }
              })();
            }
          });
      }
    });
}

export default main;
