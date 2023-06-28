import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.parkmichiganchicago.com";

const URL = "https://www.parkmichiganchicago.com/floorplans.aspx";

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
    .find("#floorplanlist .availability-accordion")
    .each((i, el) => {
      const entry = cheerio.load(el);
      entry
        .root()
        .find("tbody tr[scope]")
        .each((j, unitElement) => {
          const unit = cheerio.load(unitElement);

          const apartmentUnit = {
            apartmentId: apartment.id,
            name: String(
              unit
                .root()
                .find(":nth-child(2)")
                .text()
                .split("Floor Plan")[1]
                .replace(/(\r\n|\n|\r)/gm, "")
                .trim()
            ),
            title: String(
              unit
                .root()
                .find(":nth-child(2)")
                .text()
                .split("Floor Plan")[1]
                .replace(/(\r\n|\n|\r)/gm, "")
                .trim()
            ),
            bedrooms: isNaN(Number(unit.root().find(":nth-child(3)").text().split("Bed/Bath")[1].trim().split("/")[0].trim()))
              ? 0
              : Number(unit.root().find(":nth-child(3)").text().split("Bed/Bath")[1].trim().split("/")[0].trim()),
            bathrooms: isNaN(Number(unit.root().find(":nth-child(3)").text().split("Bed/Bath")[1].trim().split("/")[0].trim()))
              ? 0
              : Number(unit.root().find(":nth-child(3)").text().split("Bed/Bath")[1].trim().split("/")[0].trim()),
            squareFootage: Number(unit.root().find(":nth-child(4)").text().split("Square Foot")[0].replace(/\D/g, "").trim()),
            floorPlanImage: String(unit.root().find(".floorplan-img img").attr("data-src")),
            availableUnits: 1,
            minPrice:
              unit.root().find(":nth-child(4)").text().split("to")[0] === undefined ||
              isNaN(Number(unit.root().find(":nth-child(4)").text().split("to")[0].replace(/\D/g, "")))
                ? 0
                : Number(unit.root().find(":nth-child(4)").text().split("to")[0].replace(/\D/g, "")),
            maxPrice:
              unit.root().find(":nth-child(4)").text().split("to")[1] === undefined ||
              isNaN(Number(unit.root().find(":nth-child(4)").text().split("to")[1].replace(/\D/g, "")))
                ? 0
                : Number(unit.root().find(":nth-child(4)").text().split("to")[1].replace(/\D/g, "")),
            dataDump: unit.html()
          };

          (async () => {
            await prisma.apartmentUnit.create({
              data: apartmentUnit
            });
          })();
        });
    });

  const gallery = await request("https://www.parkmichiganchicago.com/photogallery.aspx");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);
  gallery_dom
    .root()
    .find(".carousel-inner div")
    .each((i, el) => {
      const entry = cheerio.load(el);
      const src = entry.root().find("img").attr("data-src");

      const apartmentImage: any = {
        url: src,
        type: ApartmentImageTypeType.OTHER,
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
}

export default main;
