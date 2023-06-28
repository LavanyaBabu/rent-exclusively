import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { isNullOrUndefined } from "~utils/bool";
import { sanitize } from "~utils/object";
import { prisma } from "db";

export const WEBSITE = "https://www.1225oldtown.com";

const URL =
  "https://www.1225oldtown.com/CmsSiteManager/callback.aspx?act=Proxy/GetUnits&available=true&honordisplayorder=true&siteid=7527218&bestprice=true&leaseterm=1&leaseterm=2&leaseterm=3&leaseterm=4&leaseterm=5&leaseterm=6&leaseterm=7&leaseterm=8&leaseterm=9&leaseterm=10&leaseterm=11&leaseterm=12&leaseterm=13&leaseterm=14&dateneeded=2022-06-02";

async function getData() {
  const { body } = await request(URL, {
    bodyTimeout: 0,
    headersTimeout: 0
  });
  return body.json();
}

async function main() {
  try {
    const apartment = await prisma.apartment.findFirst({
      where: { website: WEBSITE }
    });

    if (isNullOrUndefined(apartment)) {
      return;
    }
    const data = await getData();

    Promise.all(
      data.units.map((post: any) => {
        const aptData = sanitize({
          apartmentId: apartment.id,
          name: post.name,
          title: post.name,
          bedrooms: Number(post.numberOfBeds),
          bathrooms: Number(post.numberOfBaths),
          squareFootage: Number(post.squareFeet),
          floorPlanImage: post.floorPlanImages[0].src,
          availableUnits: 1,
          minPrice: Number(post.rent),
          dataDump: JSON.stringify(post)
        });

        return prisma.apartmentUnit.create({
          data: aptData
        });
      })
    );

    const gallery = await request("https://www.1225oldtown.com/Gallery.aspx");
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
  } catch (error) {
    console.log("Errored out while syncing 1225 Old Town");
    console.log(error);
  }
}

export default main;
