import { ApartmentImageTypeType } from "@prisma/client";
import { request } from "undici";

import { prisma } from "db";
import { isNullOrUndefined } from "~utils/bool";

export const WEBSITE = "https://www.amli.com/apartments/chicago/downtown-chicago-apartments/amli-river-north";

const API_URL = "https://prodeastgraph.amli.com/graphql";

async function main() {
  const apartment = await prisma.apartment.findFirst({
    where: { website: WEBSITE }
  });
  if (isNullOrUndefined(apartment)) {
    return;
  }

  const response = await request(API_URL, {
    headers: {
      "content-type": "application/json"
    },
    body: '{"operationName":"propertyFloorplansSummary","variables":{"amliPropertyId":88600,"propertyId":"XGtaKRAAACMAXZke","moveInDate":"2022-07-19"},"query":"query propertyFloorplansSummary($propertyId: ID!, $amliPropertyId: ID!, $moveInDate: String) {\\n  propertyFloorplansSummary(propertyId: $propertyId, amliPropertyId: $amliPropertyId, moveInDate: $moveInDate) {\\n    floorplanId\\n    entrataFloorplanId\\n    floorplanName\\n    bathroomMin\\n    bedroomMax\\n    bedroomMin\\n    priceMin\\n    priceMax\\n    bedroomMax\\n    sqFtMax\\n    sqftMin\\n    availableUnitCount\\n    isFloorplanActive\\n    isCallForPricing\\n    descriptionShort\\n    returnedRegularUnitCount\\n    returnedAffordableUnitCount\\n    allFloorPlanUnitsAreAffordable\\n    displayOrder\\n    units\\n    cms\\n    __typename\\n  }\\n}\\n"}',
    method: "POST"
  });

  const {
    data: { propertyFloorplansSummary }
  } = await response.body.json();

  const apartmentUnits = propertyFloorplansSummary.map((floorplan: any) => ({
    apartmentId: apartment.id,
    name: floorplan.floorplanName,
    title: floorplan.descriptionShort || floorplan.floorplanName,
    bedrooms: floorplan.bedroomMax,
    bathrooms: floorplan.bathroomMin,
    squareFootage: floorplan.sqFtMax,
    floorPlanImage: floorplan.cms.data.main_image.url,
    availableUnits: floorplan.availableUnitCount,
    minPrice: floorplan.priceMin,
    maxPrice: floorplan.priceMax,
    availableFrom: floorplan.units ? new Date(Math.min(...floorplan.units.map((u: any) => new Date(u.rpAvailableDate)))) : null,
    dataDump: floorplan
  }));

  await prisma.apartmentUnit.createMany({
    data: apartmentUnits,
    skipDuplicates: true
  });

  // Gallery images
  const galleryResponse = await request(API_URL, {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: '{"operationName":"propertyGallery","variables":{"id":"XGtaKRAAACMAXZke"},"query":"query propertyGallery($id: ID) {\\n  propertyGallery(id: $id) {\\n    interior\\n    exterior\\n    videos\\n    __typename\\n  }\\n}\\n"}'
  });

  const {
    data: { propertyGallery }
  } = await galleryResponse.body.json();

  const interior = propertyGallery.interior.map(({ image }: any) => ({
    apartmentId: apartment.id,
    url: image.url,
    type: ApartmentImageTypeType.INTERIORS
  }));

  const exterior = propertyGallery.exterior.map(({ image }: any, idx: number) => ({
    apartmentId: apartment.id,
    url: image.url,
    default: idx === 0,
    type: ApartmentImageTypeType.EXTERIORS
  }));

  return await prisma.apartmentImage.createMany({
    data: [...interior, ...exterior],
    skipDuplicates: true
  });
}

export default main;
