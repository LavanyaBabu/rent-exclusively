import { request } from "undici";
import * as cheerio from "cheerio";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";
import { sanitize } from "~utils/object";

export const WEBSITE = "https://www.liveatwaterchicago.com";
const GALLERY_URL = `${WEBSITE}/photos/`;

export const URL = "https://sightmap.com/app/api/v1/m1ywy53yvq0/sightmaps/12679";

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

  const unitObj: Record<string, any> = {};

  data.data.units.forEach((unit: any) => {
    if (isNullOrUndefined(unitObj[unit["floor_plan_id"]])) {
      unitObj[unit["floor_plan_id"]] = [];
    }
    unitObj[unit["floor_plan_id"]].push(unit);
  });

  await Promise.all(
    data.data.floor_plans.map((post: any) => {
      const dump = { ...post };
      dump.unitDetails = unitObj[post.id];
      const aptData = sanitize({
        apartmentId: apartment.id,
        name: `${post.bedroom_label} - ${post.bathroom_label}`,
        title: post.filter_label,
        bedrooms: Number(post.bedroom_count),
        bathrooms: Number(post.bathroom_count),
        floorPlanImage: post.image_url,
        minPrice: !isNullOrUndefined(unitObj[post.id]) ? Number(unitObj[post.id][0].price) : 0,
        squareFootage: !isNullOrUndefined(unitObj[post.id]) ? Number(unitObj[post.id][0].area) : 0,
        availableUnits: !isNullOrUndefined(unitObj[post.id]) ? unitObj[post.id].length : 0,
        dataDump: JSON.stringify(dump)
      });

      return prisma.apartmentUnit.create({
        data: aptData
      });
    })
  );

  const gallery = await request(GALLERY_URL, {
    bodyTimeout: 0,
    headersTimeout: 0
  });
  const galleryHtml = await gallery.body.text();

  const dom = cheerio.load(galleryHtml);
  dom
    .root()
    .find("#gallery-container #gallery-large > img")
    .each((i, el) => {
      const { src, alt } = el.attribs;

      const apartmentImage: any = {
        url: `${WEBSITE}${src}`,
        type: ApartmentImageTypeType.OTHER,
        default: i === 0
      };

      if (alt.match(/exterior|entrance|courtyard|entry|skyline|view/gi)) {
        apartmentImage.type = ApartmentImageTypeType.EXTERIORS;
      }

      if (alt.match(/living|lounge|kitchen|dining|bedroom|bathroom|balcony|tv/gi)) {
        apartmentImage.type = ApartmentImageTypeType.INTERIORS;
      }

      if (alt.match(/amenity|pool|gym|business|billiards/gi)) {
        apartmentImage.type = ApartmentImageTypeType.AMENITIES;
      }

      (async () => {
        try {
          await prisma.apartmentImage.upsert({
            where: {
              url: `${WEBSITE}${src}`
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
