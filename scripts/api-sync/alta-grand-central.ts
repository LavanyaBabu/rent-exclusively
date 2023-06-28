import * as cheerio from "cheerio";
import { request } from "undici";

import { sanitize } from "~utils/object";
import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://altagrandcentral.com";
export const URL = "https://alta-grand-central.myzeki.com/api/v1/content?v=1527";

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

  const modelImages: any = {};

  data.models.forEach((model: any) => {
    if (model.id && model.images && model.images.length && model.images[0].uuid) {
      modelImages[model.id] = model.images[0].uuid;
    }
  });

  Promise.all(
    data.units.map((post: any) => {
      if (post.building_id) {
        const aptData = sanitize({
          apartmentId: apartment?.id,
          name: post.label,
          title: post.label,
          bedrooms: Number(post.beds),
          bathrooms: Number(post.baths),
          squareFootage: Number(post.sqft.max),
          floorPlanImage: `https://assets.myzeki.com/${modelImages[post.model_id]}/`,
          availableUnits: 1,
          minPrice: Number(post.rent.min),
          maxPrice: Number(post.rent.max),
          dataDump: JSON.stringify(post)
        });

        return prisma.apartmentUnit.create({
          data: aptData
        });
      }
    })
  );

  const gallery = await request("https://altagrandcentral.com/gallery/#/");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  const types: any = {
    interiors: "INTERIORS",
    amenities: "AMENITIES",
    lifestyle: "LIFESTYLE"
  };

  gallery_dom
    .root()
    .find(".tab-wrapper .tab-content")
    .each((i, el) => {
      const entry = cheerio.load(el);
      const id = el.attribs["id"];
      entry
        .root()
        .find(".media-gallery-slider .slide")
        .each((j, el) => {
          const unit = cheerio.load(el);
          const src = unit.root().find("img").attr("src");
          const apartmentImage: any = {
            url: src,
            type: types[id],
            default: i === 0 && j === 0
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
    });
}

export default main;
