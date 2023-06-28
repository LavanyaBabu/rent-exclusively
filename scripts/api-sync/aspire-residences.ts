import { request } from "undici";

import { isNullOrUndefined } from "~utils/bool";
import { sanitize } from "~utils/object";
import { prisma } from "db";

export const WEBSITE = "https://rentataspire.com";

export const URL = "https://rentataspire.com/wp-json/floorplans/v1/floorplans?rentMin=&rentMax=&sqftMin=&sqftMax=";

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

  return Promise.all(
    data.posts.map((post: any) => {
      const aptData = sanitize({
        apartmentId: apartment.id,
        name: post.name,
        title: post.title,
        bedrooms: Number(post.beds),
        bathrooms: Number(post.baths),
        squareFootage: Number(post.max_sqft),
        floorPlanImage: post.floor_plan_url[0],
        availableUnits: Number(post.available_units),
        minPrice: Number(post.min_rent),
        maxPrice: Number(post.max_rent),
        dataDump: JSON.stringify(post)
      });

      return prisma.apartmentUnit.create({
        data: aptData
      });
    })
  );
}

export default main;
