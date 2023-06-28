import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNotNullNorUndefined, isNullOrUndefined } from "~utils/bool";
import { sanitize } from "~utils/object";

export const WEBSITE = "https://www.nextapts.com";

export const URL = "https://www.nextapts.com/CmsSiteManager/callback.aspx?act=Proxy/GetFloorPlans";

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
        bedrooms: isNaN(Number(post.bedRooms)) ? 0 : Number(post.bedRooms),
        bathrooms: isNaN(Number(post.bathrooms)) ? 0 : Number(post.bathrooms),
        squareFootage: Number(post.maximumSquareFeet),
        floorPlanImage: post.diagramUrl || isNotNullNorUndefined(post.floorPlanImages) ? post.floorPlanImages[0].src : "placeholder",
        availableUnits: Number(post.numberOfUnitsDisplay),
        minPrice: Number(post.minimumMarketRent),
        maxPrice: Number(post.maximumMarketRent),
        dataDump: JSON.stringify(post)
      });

      return prisma.apartmentUnit.create({
        data: aptData
      });
    })
  );

  const gallery = await request("https://www.nextapts.com/Gallery.aspx");
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
