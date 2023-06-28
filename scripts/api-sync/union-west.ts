import { request } from "undici";
import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";
import { sanitize } from "~utils/object";

export const WEBSITE = "https://www.unionwestchicago.com";
export const URL = "https://www.unionwestchicago.com/ajax/planspricing/";

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
    data.map((post: any) => {
      const aptData = sanitize({
        apartmentId: apartment.id,
        name: post.name,
        title: post.FloorPlanName,
        bedrooms: Number(post.Bedrooms),
        bathrooms: Number(post.Bathrooms),
        squareFootage: Number(post.MaxSqFt),
        floorPlanImage: post.DisplayImage,
        availableUnits: Number(post.UnitsAvailable),
        minPrice: Number(post.MinPrice),
        maxPrice: Number(post.MaxPrice),
        dataDump: JSON.stringify(post)
      });

      return prisma.apartmentUnit.create({
        data: aptData
      });
    })
  );

  //   const gallery = await request('https://www.unionwestchicago.com/photos');
  //   const galleryHtml = await gallery.body.text();

  //   const gallery_dom = cheerio.load(galleryHtml);

  // console.warn('first',   gallery_dom
  // .root()
  // .html())

  //   gallery_dom
  //     .root()
  //     .find(".gallery__filter-Apartments li")
  //     .each((i, el) => {
  //       const entry = cheerio.load(el);

  //       const src = entry.root().find('img').attr('src')

  //       let apartmentImage: any = {
  //         url: src,
  //         type: ApartmentImageTypeType.OTHER,
  //         default: i === 0,
  //       };

  //       (async () => {
  //         try {
  //           await prisma.apartmentImage.upsert({
  //             where: { url: src },
  //             update: {},
  //             create: { apartmentId: apartment.id, ...apartmentImage },
  //           });
  //         } catch (e) {
  //           console.error(e);
  //         }
  //       })();
  //     });
}

export default main;
