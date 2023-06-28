import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";
import { sanitize } from "~utils/object";

export const WEBSITE = "https://www.newcityapts.com";

export const URL =
  "https://inventory.g5marketingcloud.com/api/v1/apartment_complexes/g5-cl-1jkj1ycnt2-the-residences-at-newcity/floorplans";

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
    data.floorplans.map((post: any) => {
      const aptData = sanitize({
        apartmentId: apartment.id,
        name: post.name,
        title: post.name,
        bedrooms: Number(post.beds),
        bathrooms: Number(post.baths),
        squareFootage: Number(post.sqft),
        floorPlanImage: post.image_url,
        availableUnits: Number(post.total_available_units),
        minPrice: Number(post.starting_rate),
        maxPrice: Number(post.ending_rate),
        dataDump: JSON.stringify(post)
      });

      return prisma.apartmentUnit.create({
        data: aptData
      });
    })
  );

  const gallery = await request("https://www.newcityapts.com/apartments/il/chicago/photos");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find(".slides li")
    .each((i, el) => {
      const entry = cheerio.load(el);
      const src = entry.root().find("img").attr("src");

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
