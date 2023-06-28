import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.astonchicago.com";

export const URL = "https://www.astonchicago.com/Floor-plans.aspx";

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
        bedrooms: Number(entry.root().find("[id$=_beds]").text()),
        bathrooms: Number(entry.root().find("[id$=_baths]").text()),
        squareFootage: Number(entry.root().find("[id$=_sqft]").text().replace(/\D/g, "")),
        floorPlanImage: String(entry.root().find(".floorplan-image a").attr("href")),
        availableUnits: Number(entry.root().find(".floorplan-block").attr("data-numunits")),
        minPrice: Number(entry.root().find("[id$=_range]").text().replace(/\D/g, "")),
        dataDump: entry.html()
      };

      (async () => {
        await prisma.apartmentUnit.create({
          data: apartmentUnit
        });
      })();
    });

  const gallery = await request("https://www.astonchicago.com/Gallery.aspx");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find("#photoList0 a")
    .each((i, el) => {
      const { href } = el.attribs;

      const apartmentImage: any = {
        url: `https:${href}`,
        type: ApartmentImageTypeType.OTHER,
        default: i === 0
      };

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
    });
}

export default main;

//Comments

// Price value is not getting updated please check once.
