import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.kingsburyplaza.com";

const URL = "https://www.kingsburyplaza.com/floorplans";

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
    .find("tbody tr[scope]")
    .each((i, el) => {
      const unit = cheerio.load(el);

      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(
          unit
            .root()
            .find("td:nth-child(2)")
            .text()
            .split("Floor Plan")[1]
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        title: String(
          unit
            .root()
            .find("td:nth-child(2)")
            .text()
            .split("Floor Plan")[1]
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        bedrooms: isNaN(
          Number(
            unit
              .root()
              .find("td:nth-child(3)")
              .text()
              .split("Bed/Bath")[1]
              .replace(/(\r\n|\n|\r)/gm, "")
              .trim()
              .split("/")[0]
              .trim()
          )
        )
          ? 0
          : Number(
              unit
                .root()
                .find("td:nth-child(3)")
                .text()
                .split("Bed/Bath")[1]
                .replace(/(\r\n|\n|\r)/gm, "")
                .trim()
                .split("/")[0]
                .trim()
            ),
        bathrooms: isNaN(
          Number(
            unit
              .root()
              .find("td:nth-child(3)")
              .text()
              .split("Bed/Bath")[1]
              .replace(/(\r\n|\n|\r)/gm, "")
              .trim()
              .split("/")[1]
              .trim()
          )
        )
          ? 0
          : Number(
              unit
                .root()
                .find("td:nth-child(3)")
                .text()
                .split("Bed/Bath")[1]
                .replace(/(\r\n|\n|\r)/gm, "")
                .trim()
                .split("/")[1]
                .trim()
            ),
        squareFootage: Number(unit.root().find("td:nth-child(4)").text().split("Square Foot")[0].replace(/\D/g, "").trim()),
        floorPlanImage: String(unit.root().find(".floorplan-img img").attr("data-src")),
        availableUnits: Number(unit.root().find(".available-fp").text().replace(/\D/g, "")),
        minPrice: Number(
          unit.root().find("td:nth-child(5)").text().split("to")[0]
            ? unit.root().find("td:nth-child(5)").text().split("to")[0].replace(/\D/g, "")
            : 0
        ),
        maxPrice: Number(
          unit.root().find("td:nth-child(5)").text().split("to")[1]
            ? unit.root().find("td:nth-child(5)").text().split("to")[1].replace(/\D/g, "")
            : 0
        ),
        dataDump: unit.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request("https://www.kingsburyplaza.com/photogallery");
  const galleryHtml = await gallery.body.text();
  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find("#photoGalleryThumbs .item")
    .each((i, el) => {
      const entry = cheerio.load(el);
      const src = entry.root().find("img").attr("src");

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
