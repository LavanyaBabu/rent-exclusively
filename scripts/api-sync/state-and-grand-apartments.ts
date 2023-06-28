import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.stateandgrandapts.com";

export const URL = "https://www.stateandgrandapts.com/Floor-plans.aspx";

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
    .find("#floorplan-container .floorplan-block")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const floorplanIdentifier = entry.root().find(".floorplan-block").attr("id")?.split("_")[1];

      if (isNullOrUndefined(floorplanIdentifier)) {
        return;
      }

      const apartmentUnit = {
        apartmentId: apartment.id,
        name: String(entry.root().find(".floorplan-block").attr("data-floorplan-name")),
        title: String(entry.root().find(".floorplan-block").attr("data-floorplan-name")),
        bedrooms: Number(entry.root().find(".floorplan-block").attr("data-bed")),
        bathrooms: Number(entry.root().find(".floorplan-block").attr("data-bath")),
        squareFootage: Number(entry.root().find(".floorplan-block").attr("data-sqft")),
        floorPlanImage: String(entry.root().find(".floorplan-image a").attr("href")),
        availableUnits: Number(entry.root().find(".floorplan-block").attr("data-numunits")),
        minPrice: Number(entry.root().find(".floorplan-block").attr("data-rent")),
        dataDump: entry.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request("https://www.stateandgrandapts.com/Gallery.aspx");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find(".photolist a")
    .each((i, el) => {
      const { href } = el.attribs;

      const apartmentImage: any = {
        url: `https:${href}`,
        type: ApartmentImageTypeType.OTHER,
        default: i === 0
      };

      if (href !== undefined && href !== "") {
        (async () => {
          try {
            await prisma.apartmentImage.upsert({
              where: {
                url: `https:${href}`
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
