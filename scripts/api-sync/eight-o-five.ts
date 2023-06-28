import * as cheerio from "cheerio";
import { request } from "undici";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.805lasalle.com";

const URL = "https://www.805lasalle.com/floorplans";

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
    .find("#floorplans-container > div")
    .each((i, el) => {
      const entry = cheerio.load(el);
      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(
          entry
            .root()
            .find(".card-title")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        title: String(
          entry
            .root()
            .find(".card-title")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        bedrooms: isNaN(
          Number(
            entry
              .root()
              .find(".nu-bed")
              .parent()
              .text()
              .replace(/(\r\n|\n|\r)/gm, "")
              .trim()
              .split(" ")[0]
          )
        )
          ? 0
          : Number(
              entry
                .root()
                .find(".nu-bed")
                .parent()
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
                .trim()
                .split(" ")[0]
            ),
        bathrooms: isNaN(
          Number(
            entry
              .root()
              .find(".nu-bathroom")
              .parent()
              .text()
              .replace(/(\r\n|\n|\r)/gm, "")
              .trim()
              .split(" ")[0]
          )
        )
          ? 0
          : Number(
              entry
                .root()
                .find(".nu-bathroom")
                .parent()
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
                .trim()
                .split(" ")[0]
            ),
        squareFootage: isNaN(
          Number(
            entry
              .root()
              .find(".nu-area")
              .parent()
              .text()
              .replace(/(\r\n|\n|\r)/gm, "")
              .trim()
              .split(" ")[0]
          )
        )
          ? 0
          : Number(
              entry
                .root()
                .find(".nu-area")
                .parent()
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
                .trim()
                .split(" ")[0]
            ),
        floorPlanImage: String(entry.root().find(".card-img img").attr("src")),
        availableUnits: isNaN(
          Number(
            entry
              .root()
              .find(".card-header span")
              .text()
              .replace(/(\r\n|\n|\r)/gm, "")
              .trim()
              .split(" ")[0]
          )
        )
          ? 0
          : Number(
              entry
                .root()
                .find(".card-header span")
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
                .trim()
                .split(" ")[0]
            ),
        minPrice: Number(entry.root().find(".card-body p").text().replace(/\D/g, "")),
        dataDump: entry.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request("https://www.805lasalle.com/photogallery");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  // const types: any = {
  //   INTERIORS: "INTERIORS",
  //   EXTERIORS: "EXTERIORS",
  //   AMENITIES: "AMENITIES"
  // };

  gallery_dom
    .root()
    .find(".tab-content > div")
    .each((i, el) => {
      const entry = cheerio.load(el);
      // const header = el.attribs["aria-labelledby"].split("gallery-photogallery-")[1].split("-")[0];

      if (i !== 0) {
        entry
          .root()
          .find(".carousel-item")
          .each((j, el) => {
            const unit = cheerio.load(el);
            const src = unit.root().find("a").attr("href");

            // const apartmentImage: any = {
            //   url: src,
            //   type: types[header],
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
