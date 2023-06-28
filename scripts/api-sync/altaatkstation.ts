import * as cheerio from "cheerio";
import { request } from "undici";
import { ApartmentImageTypeType } from "@prisma/client";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://altaatkstation.com";

const URL = "https://www.altaatkstation.com/chicago/alta-at-k-station/conventional/";

const GALLERY_URL = "https://www.altaatkstation.com/chicago/alta-at-k-station/photos/";

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
            minPrice: Number(
              unit
                .root()
                .find(".rent .fp-col-text")
                .contents()
                .filter((i, e) => e.type === "text")
                .text()
                .replace(/\D/g, "")
            ),
            dataDump: unit.html()
          };

          (async () => {
            await prisma.apartmentUnit.create({
              data: apartmentUnit
            });
          })();
        });
    });

  const gallery = await request(GALLERY_URL, {
    bodyTimeout: 0,
    headersTimeout: 0
  });
  const galleryHtml = await gallery.body.text();

  const gallery_dom = cheerio.load(galleryHtml);

  gallery_dom
    .root()
    .find("#photos-group > div:nth-child(1) .photo-box a")
    .each((i, el) => {
      const { href } = el.attribs;

      const apartmentImage: any = {
        url: href,
        type: ApartmentImageTypeType.OTHER,
        default: i === 0
      };

      (async () => {
        try {
          await prisma.apartmentImage.upsert({
            where: {
              url: href
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
