import { prisma } from "db";
import { Prisma, ApartmentImageTypeType } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { JSDOM } from "jsdom";
import sleep from "sleep";
import { isEmpty } from "../../utils/bool";

const IMAGE_CLOUDINARY_PREFIX = "https://res.cloudinary.com/apartmentlist/image/upload/c_fill,dpr_auto,f_auto,g_center,h_415,q_auto,w_640";
const UNIT_CLOUDINARY_PREFIX = "https://res.cloudinary.com/apartmentlist/image/upload/c_fit,dpr_auto,f_auto,h_640,q_auto,w_640";

const getImageCloudinaryPrefix = (imageId: string) => {
  return `${IMAGE_CLOUDINARY_PREFIX}/${imageId}.jpg`;
};

const getUnitCloudinaryPrefix = (imageId: string) => {
  return `${UNIT_CLOUDINARY_PREFIX}/${imageId}.jpg`;
};

type UnitType = {
  id: number;
  name: string;
  display_name: string;
  price: number;
  price_max: number;
  sqft: number;
  availability: "available" | "unavailable" | "not-available";
  available_on: string; // eg. "2022-10-21";
  apply_online_url: string | null;
};
type AvailableUnitsType = {
  id: number;
  name: string;
  bed: number;
  bath: number;
  sqft: number;
  sqft_max: number;
  price: number;
  price_max: number;
  photos: Array<{ type: string; id: string }>;
  units: UnitType[];
};

type AmenitiesType = {
  display_name: string; // eg."In unit laundry";
  cloudinary_id: string; // eg. "amenity_washer_icon";
  group: string; // eg. "laundry";
  group_rank: number;
  filter_param: string; // eg. "has_in_unit_laundry";
};

type PetPolicyType = {
  allowed: boolean;
  allowed_pets: string[]; //["birds", "cats", "dogs", "fish", "lizards"];
  details: string | null; //"";
  cats: { deposit: string | null; fee: string | null; limit: string | null; rent: string | null; restrictions: string | null };
  dogs: { deposit: string | null; fee: string | null; limit: string | null; rent: string | null; restrictions: string | null };
  general: {
    deposit: string; // eg. "N/a";
    fee: string; // eg."$500 per pet ";
    limit: string; // eg."2";
    rent: string; // eg."$30 a month ";
    restrictions: string; // eg."Breed restrictions consult with office management ";
  };
};

type ApartmentListingType = {
  display_name: string;
  street: string;
  street_address: string;
  neighborhood: string;
  zip: string;
  city: string;
  state: string;
  county: string;
  formatted_address: string;
  all_photos: Array<{ type: string; id: string }>;
  available_units: AvailableUnitsType[];
  email: string | null;
  phone: string | null;
  contact_name: string | null;
  website_url: string | null;
  has_remote_tours: boolean;
  has_nurture_sms: boolean;
  has_nurture_voice: boolean;
  tour_booking_allowed: boolean;
  lat: number;
  lon: number;
  parking_details_text: string | null;
  storage_details_text: string | null;
  why_we_love_it: string | null;
  active: boolean;
  slug: string;
  source_name: string | null;
  utilities_included_text: string | null;
  yelp_slug: string | null;
  top_amenities: AmenitiesType[];
  unit_amenities: AmenitiesType[];
  community_amenities: AmenitiesType[];
  pet_policies: PetPolicyType | null;
};

interface IScriptTextContent {
  props: {
    pageProps: {
      component: {
        listing: ApartmentListingType;
      } | null;
    } | null;
  } | null;
}

async function main() {
  const aptsToScrape = await prisma.apartment.findMany({
    where: {
      apartmentListUrl: {
        not: {
          equals: ""
        }
      }
    },
    orderBy: {
      id: "asc"
    }
  });
  for (const apt of aptsToScrape) {
    try {
      const listing = await scrapeUrl(apt.apartmentListUrl);
      if (!listing) {
        console.log(`Failed to scrape ${apt.apartmentListUrl}`);
        continue;
      }
      console.log(`Scraped ${apt.apartmentListUrl}`);

      const allAmenities: Prisma.AmenityCreateInput[] = [];

      const amenityMap = new Map<string, boolean>();
      let hasPool = false;

      for (const amenity of [...listing.top_amenities, ...listing.unit_amenities, ...listing.community_amenities]) {
        // add to array if not amenity name does not exist in map
        if (!amenityMap.has(amenity.display_name)) {
          // checking if pool exists
          if (amenity.display_name.toLowerCase().trim() === "pool" || amenity.display_name.toLowerCase().trim() === "swimming pool") {
            hasPool = true;
          }
          amenityMap.set(amenity.display_name, true);
          allAmenities.push({
            name: amenity.display_name
          });
        }
      }

      await prisma.$transaction(
        allAmenities.map((amenity) => {
          return prisma.amenity.upsert({
            where: {
              name: amenity.name
            },
            update: {
              apartments: {
                connect: {
                  id: apt.id
                }
              }
            },
            create: {
              name: amenity.name,
              apartments: {
                connect: {
                  id: apt.id
                }
              }
            }
          });
        })
      );

      console.log("Amenities added");

      const staticAptData: any = {};
      if (isEmpty(apt.street) && !isEmpty(listing.street)) {
        staticAptData.street = listing.street;
      }
      if (isEmpty(apt.city) && !isEmpty(listing.city)) {
        staticAptData.city = listing.city;
      }
      if (isEmpty(apt.state) && !isEmpty(listing.state)) {
        staticAptData.state = listing.state;
      }
      if (isEmpty(apt.zip) && !isEmpty(listing.zip)) {
        staticAptData.zip = listing.zip;
      }
      if (isEmpty(apt.neighborhood) && !isEmpty(listing.neighborhood)) {
        staticAptData.neighborhood = listing.neighborhood;
      }
      // phone
      if (isEmpty(apt.phone) && !isEmpty(listing.phone)) {
        staticAptData.phone = listing.phone;
      }
      // email
      if (isEmpty(apt.email) && !isEmpty(listing.email)) {
        staticAptData.email = listing.email;
      }
      // description
      if (isEmpty(apt.description) && !isEmpty(listing.why_we_love_it)) {
        staticAptData.description = listing.why_we_love_it;
      }
      // contact name
      if (isEmpty(apt.contactName) && !isEmpty(listing.contact_name)) {
        staticAptData.contactName = listing.contact_name;
      }

      await prisma.apartment.update({
        where: {
          id: apt.id
        },
        data: {
          ...staticAptData,
          country: "US",
          petFriendly: !!listing.pet_policies?.allowed,
          pool: hasPool
        }
      });

      console.log("Apartment updated");

      // adding apartment floor plans
      const allFPs: Prisma.FloorPlanCreateInput[] = [];
      for (const floorPlan of listing.available_units) {
        const dbFp: Prisma.FloorPlanCreateInput = {
          apartment: {
            connect: {
              id: apt.id
            }
          },
          source: "ApartmentList",
          sourceId: `aptl__${floorPlan.id}`,
          name: floorPlan.name,
          title: floorPlan.name,
          bedrooms: floorPlan.bed,
          bathrooms: floorPlan.bath,
          squareFootage: floorPlan.sqft,
          squareFootageMax: floorPlan.sqft_max,
          minPrice: floorPlan.price,
          maxPrice: floorPlan.price_max,
          dataDump: JSON.stringify(floorPlan)
        };
        if (floorPlan.photos.length > 0) {
          dbFp.floorPlanImage = getUnitCloudinaryPrefix(floorPlan.photos[0].id);
        }

        const dbUnits: Array<Prisma.UnitCreateInput> = [];

        for (const unitInfo of floorPlan.units) {
          const dbUnit: Prisma.UnitCreateInput = {
            source: "ApartmentList",
            sourceId: `aptl__${unitInfo.id}`,
            name: unitInfo.name,
            applyOnlineUrl: unitInfo.apply_online_url ?? "",
            availability: unitInfo.availability,
            availableOn: Number(new Date(unitInfo.available_on)) === NaN ? null : new Date(unitInfo.available_on),
            displayName: unitInfo.display_name,
            price: unitInfo.price,
            squareFootage: unitInfo.sqft
          };
          dbUnits.push(dbUnit);
        }
        dbFp.units = {
          create: dbUnits
        };
        allFPs.push(dbFp);
      }
      if (allFPs.length > 0) {
        await prisma.$transaction([
          prisma.floorPlan.deleteMany({
            where: {
              apartmentId: apt.id
            }
          }),
          prisma.unit.deleteMany({
            where: {
              floorPlan: {
                apartmentId: apt.id
              }
            }
          }),
          ...allFPs.map((fp) => {
            return prisma.floorPlan.create({
              data: fp
            });
          })
        ]);
      }

      // adding apartment images
      const allImages: Prisma.ApartmentImageCreateManyInput[] = [];
      for (const photo of listing.all_photos) {
        if (photo.id) {
          const photoObj: Prisma.ApartmentImageCreateManyInput = {
            apartmentId: apt.id,
            url: getImageCloudinaryPrefix(photo.id),
            type: ApartmentImageTypeType.EXTERIORS
          };
          if (allImages.length < 6) {
            photoObj.default = true;
          }
          allImages.push(photoObj);
        }
      }

      if (allImages.length > 0) {
        await prisma.$transaction([
          prisma.apartmentImage.deleteMany({
            where: {
              apartmentId: apt.id
            }
          }),
          prisma.apartmentImage.createMany({ data: allImages })
        ]);
        console.log("Images created");
      } else {
        console.log("No images to create");
      }

      console.log("Data successfully scraped for " + apt.apartmentListUrl);
    } catch (error) {
      console.error("errored out while scraping apartment ", apt.id);
      console.error(error);
    }
    sleep.sleep(5);
  } // End of for loop
}

async function scrapeUrl(URL: string): Promise<ApartmentListingType | undefined> {
  console.log("Scraping URL: " + URL);

  const doc = await fetchFromWebOrCache(URL);
  if (!doc) {
    console.log("Failed to fetch document, returning.");
    return;
  }
  console.log("Got Document: " + doc);

  const text = doc.querySelector("script#__NEXT_DATA__")?.textContent;
  if (!text) {
    console.log("No text found");
    return;
  }
  console.log("Found text....");
  const data: IScriptTextContent = JSON.parse(text);
  return data.props?.pageProps?.component?.listing;
}

async function fetchPage(url: string): Promise<string | undefined> {
  try {
    const res = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
        Cookie: "geofence_bypass=true" //DO NOT REMOVE THIS
      },
      withCredentials: true
    });
    return res.data;
  } catch (error: unknown) {
    console.error(`There was an error with ${(error as AxiosError)?.config?.url}.`);
    console.error((error as AxiosError).toJSON());
    return;
  }
}

async function fetchFromWebOrCache(url: string) {
  const HTMLData = await fetchPage(url);
  if (!HTMLData) {
    return;
  }
  const dom = new JSDOM(HTMLData);
  return dom.window.document;
}

(async () => await main())();
