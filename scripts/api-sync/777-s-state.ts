import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://777southstate.groupfox.com";
const URL = "https://777southstate.groupfox.com/floorplans";
const GALLERY_URL = "https://777southstate.groupfox.com/photogallery";

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
        squareFootage: 0,
        floorPlanImage: String(entry.root().find(".card-img img").attr("src")),
        availableUnits: 1,
        minPrice: Number(entry.root().find(".card-body p").text().replace(/\D/g, "")),
        dataDump: entry.html()
      };

      if (apartmentUnit.name !== "") {
        (async () => {
          await prisma.apartmentUnit.create({
            data: apartmentUnit
          });
        })();
      }
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
