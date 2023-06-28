import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.flatslife.com/apartments/il/chicago/108-w-chicago-avenue";

const URL = "https://www.flatslife.com/apartments/il/chicago/108-w-chicago-avenue//floorplans.aspx";

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
    .find("#floorplanlist .tab-pane")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(
          entry
            .root()
            .find(".floor-plan-name")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        title: String(
          entry
            .root()
            .find(".floor-plan-name")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim()
        ),
        squareFootage: 0,
        bedrooms: isNaN(Number(entry.root().find("tbody tr:nth-child(1)").find("td:nth-child(2)").text()))
          ? 0
          : Number(entry.root().find("tbody tr:nth-child(1)").find("td:nth-child(2)").text()),
        bathrooms: isNaN(Number(entry.root().find("tbody tr:nth-child(2)").find("td:nth-child(2)").text()))
          ? 0
          : Number(entry.root().find("tbody tr:nth-child(2)").find("td:nth-child(2)").text()),

        floorPlanImage: "",
        availableUnits: 1,
        minPrice: isNaN(Number(entry.root().find("tbody tr:nth-child(3)").find("td:nth-child(2)").text().split("-")[0].replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find("tbody tr:nth-child(3)").find("td:nth-child(2)").text().split("-")[0].replace(/\D/g, "")),
        maxPrice:
          entry.root().find("tbody tr:nth-child(3)").find("td:nth-child(2)").text().split("-")[1] === undefined ||
          isNaN(Number(entry.root().find("tbody tr:nth-child(3)").find("td:nth-child(2)").text().split("-")[1].replace(/\D/g, "")))
            ? 0
            : Number(entry.root().find("tbody tr:nth-child(3)").find("td:nth-child(2)").text().split("-")[1].replace(/\D/g, "")),
        dataDump: entry.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request("https://www.flatslife.com/apartments/il/chicago/108-w-chicago-avenue/photogallery.aspx");
  const galleryHtml = await gallery.body.text();
  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find(".photoGalleryColumn .item")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const src = entry.root().find("a").attr("href");

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
