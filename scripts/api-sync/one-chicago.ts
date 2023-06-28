import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://liveonechicago.com//";

const URL = "https://liveonechicago.com/floor-plans";

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
    .find("#units-table tbody tr")
    .each((i, el) => {
      const entry = cheerio.load(el);
      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(
          entry
            .root()
            .find("td:nth-child(1)")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        title: String(
          entry
            .root()
            .find("td:nth-child(1)")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),

        squareFootage: isNaN(Number(entry.root().find("td:nth-child(4)").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find("td:nth-child(4)").text().replace(/\D/g, "")),
        bedrooms: isNaN(Number(entry.root().find("td:nth-child(3)").text().split("/")[0].replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find("td:nth-child(3)").text().split("/")[0].replace(/\D/g, "")),
        bathrooms: isNaN(Number(entry.root().find("td:nth-child(3)").text().split("/")[1].replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find("td:nth-child(3)").text().split("/")[1].replace(/\D/g, "")),

        floorPlanImage: String(entry.root().find("td:nth-child(6) img").attr("src")),
        availableUnits: 1,

        minPrice:
          entry.root().find("td:nth-child(5)").text().split("-")[0] === undefined ||
          isNaN(Number(entry.root().find("td:nth-child(5)").text().split("-")[0].replace(/\D/g, "")))
            ? 0
            : Number(entry.root().find("td:nth-child(5)").text().split("-")[0].replace(/\D/g, "")),
        maxPrice:
          entry.root().find("td:nth-child(5)").text().split("-")[1] === undefined ||
          isNaN(Number(entry.root().find("td:nth-child(5)").text().split("-")[1].replace(/\D/g, "")))
            ? 0
            : Number(entry.root().find("td:nth-child(5)").text().split("-")[1].replace(/\D/g, "")),
        dataDump: entry.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request("https://liveonechicago.com/gallery");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find(".gallery .image-w-caption img")
    .each((i, el) => {
      const entry = cheerio.load(el);
      const src = entry.root().find("img").attr("data-srcset")?.split(",")[0];

      const apartmentImage: any = {
        url: src,
        type: ApartmentImageTypeType.OTHER,
        default: i === 0
      };

      (async () => {
        try {
          await prisma.apartmentImage.upsert({
            where: {
              url: src!
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
