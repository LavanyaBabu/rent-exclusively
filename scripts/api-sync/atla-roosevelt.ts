import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";
import { sanitize } from "~utils/object";

export const WEBSITE = "https://www.livealta.com";

export const URL = "https://stacking.panoskin.com/api/clients/byTag/AltaRoosevelt";

async function getData() {
  const { body } = await request(URL, {
    bodyTimeout: 0,
    headersTimeout: 0
  });
  return body.json();
}

async function main() {
  const apartment = await prisma.apartment.findFirst({
    where: { website: WEBSITE }
  });

  if (isNullOrUndefined(apartment)) {
    return;
  }
  const data = await getData();

  Promise.all(
    data.floors.map((floor: any) => {
      if (floor && floor.units.length > 0) {
        floor.units.map((post: any) => {
          if (post.showOnline) {
            const aptData = sanitize({
              apartmentId: apartment.id,
              name: post.num,
              title: post.num,
              bedrooms: Number(post.numBedrooms),
              bathrooms: Number(post.numBathrooms),
              squareFootage: Number(post.squareFootage),
              floorPlanImage: `https://stacking.panoskin.com${post.planUrl}`,
              availableUnits: 1,
              minPrice: Number(post.rentAmount),
              dataDump: JSON.stringify(post)
            });

            return prisma.apartmentUnit.create({
              data: aptData
            });
          }
        });
      }
    })
  );

  const gallery = await request("https://www.livealta.com/chicago-apartments/south-loop/gallery/");
  const galleryHtml = await gallery.body.text();
  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find("ul li")
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
