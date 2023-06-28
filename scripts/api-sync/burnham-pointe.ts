// import * as cheerio from "cheerio";
// import { request } from "undici";

// import { prisma } from "~db";
// import { isNullOrUndefined } from "~utils/bool";

// export const WEBSITE = "https://www.burnhampointechicago.com";

// const URL = "https://www.burnhampointechicago.com/floorplans.aspx";

// async function main() {
//   const apartment = await prisma.apartment.findFirst({
//     where: { website: WEBSITE },
//   });

//   if (isNullOrUndefined(apartment)) {
//     return;
//   }

//   const response = await request(URL, {
//     bodyTimeout: 0,
//     headersTimeout: 0,
//   });
//   const HTML = await response.body.text();

//   const dom = cheerio.load(HTML);

//   dom
//     .root()
//     .find("#floorplanlist .availability-accordion")
//     .each((i, el) => {
//       const entry = cheerio.load(el);
//       entry
//         .root()
//         .find("tbody tr[scope]")
//         .each((j, unitElement) => {
//           const unit = cheerio.load(unitElement);

//           const apartmentUnit = {
//             apartmentId: apartment.id,
//             name: String(
//               unit
//                 .root()
//                 .find(":nth-child(2)")
//                 .text()
//                 .split("Floor Plan")[1]
//                 .replace(/(\r\n|\n|\r)/gm, "")
//                 .trim()
//             ),
//             title: String(
//               unit
//                 .root()
//                 .find(":nth-child(2)")
//                 .text()
//                 .split("Floor Plan")[1]
//                 .replace(/(\r\n|\n|\r)/gm, "")
//                 .trim()
//             ),
//             bedrooms: Number(
//               unit
//                 .root()
//                 .find(":nth-child(3)")
//                 .text()
//                 .split("Bed/Bath")[1]
//                 .replace(/(\r\n|\n|\r)/gm, "")
//                 .trim()
//                 .split("/")[0]
//                 .trim()
//             ),
//             bathrooms: Number(
//               unit
//                 .root()
//                 .find(":nth-child(3)")
//                 .text()
//                 .split("Bed/Bath")[1]
//                 .replace(/(\r\n|\n|\r)/gm, "")
//                 .trim()
//                 .split("/")[0]
//                 .trim()
//             ),
//             squareFootage: Number(
//               unit
//                 .root()
//                 .find(":nth-child(4)")
//                 .text()
//                 .split("Square Foot")[0]
//                 .replace(/\D/g, "")
//                 .trim()
//             ),
//             floorPlanImage: String(
//               unit.root().find(".floorplan-img img").attr("data-src")
//             ),
//             availableUnits: 1,
//             price: Number(
//               unit.root().find(":nth-child(5)").text().split("to")[1]
//                 ? unit
//                     .root()
//                     .find(":nth-child(5)")
//                     .text()
//                     .split("to")[1]
//                     .replace(/\D/g, "")
//                 : 0
//             ),
//             dataDump: unit.html(),
//           };

//           (async () => {
//             await prisma.apartmentUnit.create({
//               data: apartmentUnit,
//             });
//           })();
//         });
//     });
// }

// export default main;

export {};
