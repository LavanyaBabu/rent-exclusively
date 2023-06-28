import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://theloftsatrivereast.groupfox.com";

const URL = "https://theloftsatrivereast.groupfox.com/floorplans";

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
    .find("#floorplans-container .fp-container")
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
        squareFootage: isNaN(Number(entry.root().find(".nu-area").parent().text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".nu-area").parent().text().replace(/\D/g, "")),
        bedrooms: isNaN(Number(entry.root().find(".nu-bed").parent().text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".nu-bed").parent().text().replace(/\D/g, "")),
        bathrooms: isNaN(Number(entry.root().find(".nu-bathroom").parent().text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".nu-bathroom").parent().text().replace(/\D/g, "")),

        floorPlanImage: String(entry.root().find(".card-img img").attr("src")),
        availableUnits: isNaN(Number(entry.root().find(".card-header > span").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".card-header > span").text().replace(/\D/g, "")),
        minPrice: isNaN(Number(entry.root().find(".card-body .bg-light p").text().replace(/\D/g, "")))
          ? 0
          : Number(entry.root().find(".card-body .bg-light p").text().replace(/\D/g, "")),
        dataDump: entry.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request("https://theloftsatrivereast.groupfox.com/photogallery");
  const galleryHtml = await gallery.body.text();
  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find("#Photos #carousel-photogallery .carousel-inner .carousel-item")
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
