import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.oneeast.com";

const URL = "https://www.oneeast.com/chicago/one-east-delaware/conventional/";

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
    .find("#floorplan-overview-content [id^='floorplans-']")
    .each((i, el) => {
      const item = cheerio.load(el);

      item
        .root()
        .find("li")
        .each((i, ele) => {
          const entry = cheerio.load(ele);
          const apartmentUnit = {
            apartmentId: apartment.id,
            name: String(entry.root().find(".fp-name-link").text()),
            title: String(entry.root().find(".fp-name-link").text()),
            squareFootage: isNaN(Number(entry.root().find(".sq-feet .fp-col-text").text().replace(/\D/g, "")))
              ? 0
              : Number(entry.root().find(".sq-feet .fp-col-text").text().replace(/\D/g, "")),
            bedrooms: isNaN(Number(entry.root().find(".bed-bath .fp-col-text").text().split("/")[0].replace(/\D/g, "")))
              ? 0
              : Number(entry.root().find(".bed-bath .fp-col-text").text().split("/")[0].replace(/\D/g, "")),
            bathrooms: isNaN(Number(entry.root().find(".bed-bath .fp-col-text").text().split("/")[1].replace(/\D/g, "")))
              ? 0
              : Number(entry.root().find(".bed-bath .fp-col-text").text().split("/")[1].replace(/\D/g, "")),
            floorPlanImage: String(entry.root().find('.image-container meta[itemprop="image"]').attr("content")),
            availableUnits: isNaN(Number(entry.root().find(".action .primary-action").text().replace(/\D/g, "")))
              ? 0
              : Number(entry.root().find(".action .primary-action").text().replace(/\D/g, "")),
            minPrice: Number(entry.root().find(".rent .fp-col-text").text().replace(/\D/g, "")),
            dataDump: entry.html()
          };

          (async () => {
            await prisma.apartmentUnit.create({
              data: apartmentUnit
            });
          })();
        });
    });

  const gallery = await request("https://www.oneeast.com/chicago/one-east-delaware/photos/");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find("#photos-group .photo-box")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const src = entry.root().find("a").attr("href");

      const apartmentImage: any = {
        url: `https:${src}`,
        type: ApartmentImageTypeType.OTHER,
        default: i === 0
      };

      (async () => {
        try {
          await prisma.apartmentImage.upsert({
            where: {
              url: `https:${src}`
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
