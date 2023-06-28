import { request } from "undici";
import * as cheerio from "cheerio";
import { ApartmentImageTypeType } from "@prisma/client";

import { isNullOrUndefined } from "~utils/bool";
import { sanitize } from "~utils/object";
import { prisma } from "db";

export const WEBSITE = "https://wolfpointeast.com/#nestio-listings";

export const URL =
  "https://wolfpoint.urbanapt.com/api/listings/?per_page=50&listing_type=rentals&property_type=residential&page=1&sort=price&sort_dir=asc&childId=nestio-iframe-pym&iframe=true&initialWidth=805&parentTitle=Wolf+Point+East+%7C+Find+Your+Home&parentUrl";

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
    data.items.map((post: any) => {
      const aptData = sanitize({
        apartmentId: apartment.id,
        name: post.layout,
        title: post.layout,
        bedrooms: Number(post.bedrooms),
        bathrooms: Number(post.bathrooms),
        squareFootage: Number(post.square_footage),
        floorPlanImage: post.photos ? post.photos[0].original : "",
        availableUnits: 1,
        minPrice: Number(post.price),
        dataDump: JSON.stringify(post)
      });

      return prisma.apartmentUnit.create({
        data: aptData
      });
    })
  );

  const gallery = await request("https://wolfpointeast.com/gallery#nestio-listings");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find(".gallery .slide")
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
