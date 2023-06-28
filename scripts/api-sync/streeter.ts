import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.thestreeter.com";

const URL = "https://www.thestreeter.com/chicago/the-streeter/conventional/";

async function main() {
  const apartment = await prisma.apartment.findFirst({
    where: { website: WEBSITE }
  });

  if (isNullOrUndefined(apartment)) {
    return;
  }

  const response = await request(URL, {
    bodyTimeout: 0,
    headersTimeout: 0
  });
  const HTML = await response.body.text();

  const dom = cheerio.load(HTML);

  dom
    .root()
    .find("#floorplan-overview-content .fp-group-list")
    .each((i, el) => {
      const entry = cheerio.load(el);

      entry
        .root()
        .find(".fp-group-item")
        .each((_, unitElement) => {
          const unit = cheerio.load(unitElement);

          const priceVar = unit
            .root()
            .find(".rent .fp-col-text")
            .contents()
            .filter((i, e) => e.type === "text")
            .text();

          const urlParts = unit.root().find("meta[itemprop='url']").attr("content")?.split("/");

          if (isNullOrUndefined(urlParts)) {
            return;
          }

          const floorplanIdentifier = urlParts.at(6)?.split("-");

          if (isNullOrUndefined(floorplanIdentifier)) {
            return;
          }

          const noOfUnitsContent = unit.root().find('meta[itemprop="numberOfAvailableAccommodationUnits"]').attr("content");

          const numberOfUnits = Number.isInteger(noOfUnitsContent) ? noOfUnitsContent : 0;

          const apartmentUnit = {
            apartmentId: apartment.id,
            name: String(unit.root().find("meta[itemprop='name']").attr("content")),
            title: String(unit.root().find("meta[itemprop='name']").attr("content")),
            bedrooms: Number(unit.root().find("meta[itemprop='numberOfBedrooms']").attr("content")),
            bathrooms: Number(unit.root().find("meta[itemprop='numberOfBathroomsTotal']").attr("content")),
            squareFootage: Number(unit.root().find(".sq-feet .fp-col-text").text().replace(/\D/g, "")),
            floorPlanImage: String(unit.root().find('meta[itemprop="image"]').attr("content")),
            availableUnits: Number(numberOfUnits),
            minPrice:
              priceVar.split("-")[0] === undefined || isNaN(Number(priceVar.split("-")[0].replace(/\D/g, "")))
                ? 0
                : Number(priceVar.split("-")[0].replace(/\D/g, "")),
            maxPrice:
              priceVar.split("-")[1] === undefined || isNaN(Number(priceVar.split("-")[1].replace(/\D/g, "")))
                ? 0
                : Number(priceVar.split("-")[1].replace(/\D/g, "")),
            dataDump: unit.html()
          };

          (async () => {
            await prisma.apartmentUnit.create({
              data: apartmentUnit
            });
          })();
        });
    });

  const gallery = await request("https://www.thestreeter.com/chicago/the-streeter/photos/");
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find("#id-buildingamenities .body-photos div")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const src = entry.root().find("img").attr("src");

      const apartmentImage: any = {
        url: src,
        type: ApartmentImageTypeType.AMENITIES,
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

  gallery_dom
    .root()
    .find("#id-convertiblemodel .body-photos div")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const src = entry.root().find("img").attr("src");

      const apartmentImage: any = {
        url: src,
        type: ApartmentImageTypeType.CONVERTIBLE,
        default: false
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

  gallery_dom
    .root()
    .find("#id-onebedroommodel .body-photos div")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const src = entry.root().find("img").attr("src");

      const apartmentImage: any = {
        url: src,
        type: ApartmentImageTypeType.ONEBEDROOM,
        default: false
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

  gallery_dom
    .root()
    .find("#id-twobedroommodel .body-photos div")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const src = entry.root().find("img").attr("src");

      const apartmentImage: any = {
        url: src,
        type: ApartmentImageTypeType.TWOBEDROOM,
        default: false
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

  gallery_dom
    .root()
    .find("#id-threebedroommodel .body-photos div")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const src = entry.root().find("img").attr("src");

      const apartmentImage: any = {
        url: src,
        type: ApartmentImageTypeType.THREEBEDROOM,
        default: false
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

  gallery_dom
    .root()
    .find("#id-exteriorlobby .body-photos div")
    .each((i, el) => {
      const entry = cheerio.load(el);

      const src = entry.root().find("img").attr("src");

      const apartmentImage: any = {
        url: src,
        type: ApartmentImageTypeType.EXTERIORS,
        default: false
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
