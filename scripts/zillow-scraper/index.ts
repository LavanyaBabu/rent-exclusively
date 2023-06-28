import axios, { AxiosRequestConfig } from "axios";
import { prisma } from "db";
import { Prisma, ApartmentImageTypeType } from ".prisma/client";
import { APIResponse } from "./interfaces";
import { isEmpty } from "../../utils/bool";
import sleep from "sleep";

const getData = (key: string) => {
  return `{"operationName":"BuildingQuery","variables":{"buildingKey":"${key}","cache":false,"latitude":null,"longitude":null,"lotId":null,"update":false},"queryId":"7cf2cdc5f039d8d8f5f229a03896cf13"}`;
};

const getConfig = (referer: string, data: string): AxiosRequestConfig<string> => {
  return {
    method: "post",
    url: "https://www.zillow.com/graphql/",
    headers: {
      authority: "www.zillow.com",
      accept: "/",
      "accept-language": "en-IN,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,it;q=0.6",
      "client-id": "vertical-living",
      "content-type": "text/plain",
      cookie:
        'zguid=24|%24e70eefa4-b20d-49ca-b9df-5c832053484a; _ga=GA1.2.1165754811.1665816628; zjs_user_id=null; zg_anonymous_id=%2298908615-7ae2-4346-9805-5cba7be098cb%22; zjs_anonymous_id=%22e70eefa4-b20d-49ca-b9df-5c832053484a%22; _gcl_au=1.1.1145630071.1665816628; _cs_c=0; _pxvid=a7e80d14-4c55-11ed-8278-55796c79786e; __pdst=6a9fb800319f4a22a8d47bfdfced56e0; _fbp=fb.1.1665816642374.993528599; _pin_unauth=dWlkPU16TXdNakpoTldVdFpXRmhPUzAwTW1WakxUZzROVE10TURGaVlqTmxOalpoT0RWaQ; G_ENABLED_IDPS=google; FSsampler=1302712438; __gads=ID=c7bcf98d0dc2dc93:T=1665816642:S=ALNI_MYTDYEjXXPN9Tc0Ju-UTr8W1m5DzA; zgsession=1|2ed0cc02-d164-4529-8183-7a9e528bb3bc; _gid=GA1.2.1279611728.1667300864; KruxPixel=true; DoubleClickSession=true; _gat=1; _pxff_cc=U2FtZVNpdGU9TGF4Ow==; pxcts=693413db-59d5-11ed-bfdb-4e6c4f6d514e; _pxff_bsco=1; utag_main=v_id:0183da688eb5002c0d284df87b3005075001706d009dc$_sn:2$_se:1$_ss:1$_st:1667302664646$dc_visit:2$ses_id:1667300864646%3Bexp-session$_pn:1%3Bexp-session$dcsyncran:1%3Bexp-session$tdsyncran:1%3Bexp-session$dc_event:1%3Bexp-session$dc_region:ap-east-1%3Bexp-session; _hp2_ses_props.1215457233=%7B%22ts%22%3A1667300864807%2C%22d%22%3A%22www.zillow.com%22%2C%22h%22%3A%22%2F%22%7D; _hp2_id.1215457233=%7B%22userId%22%3A%22857076401678605%22%2C%22pageviewId%22%3A%22766721903143635%22%2C%22sessionId%22%3A%221069195149482698%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; _cs_id=b9e04afc-c1fa-a225-c959-85d4dab0e2c5.1665816629.3.1667300883.1667300865.1.1699980629578; _cs_s=2.5.0.1667302683476; JSESSIONID=01B89509791C4570253590EAD61F1134; _pxff_tm=1; _px3=22634aed5c41b4bb85f58db81a2477fbfec72fae3ae430be55332a941c9979ab:2+WzegG3fCnc+Wz8rXgzYlFpiMJ5Kkh8NNyHEYYuQ8ZSUw1HVXGkpjJJzsH/BgE7ITQOhTBm+hfc1CMaEim3iA==:1000:jTq7bai4ZigbaMuBxMVVr1vk+Ps5i8iQop8uqtCPtVOy/qye9imymauL8oCfISef4pufSQdiRK5tKOo4KhtzPjX5OL/6DV98GcMkwRu8EX2Skclmo1a4umOhV6ecGzIGHNCwjh7DfEGawkhThTZwamSgsdqWVEat1NbhtOebkE7xEkr+MLpvo0uvelNzdojfGMym84gq6176haW6Kod0rQ==; _uetsid=7929557059d511ed9403fb87e0bbdfd1; _uetvid=af8e4c804c5511edb50c29a81fbb727b; __gpi=UID=00000b61d69483a0:T=1665816642:RT=1667300891:S=ALNI_MZ0S5Tu2KTAhNPEaIXu4V3KGj3AhQ; _clck=1f503s8|1|f67|0; AWSALB=FXwM9ZiIwgbinI/J2iLKGgW0NCooUpHQu7hj8hKqWJbO+q9z6KcS+TItfsudii4WP29pR43kNrGybISCp3GyC6zWJc+xgbyDS4JYp5dkv9t14Jjo9oVxI/4HoiQZ; AWSALBCORS=FXwM9ZiIwgbinI/J2iLKGgW0NCooUpHQu7hj8hKqWJbO+q9z6KcS+TItfsudii4WP29pR43kNrGybISCp3GyC6zWJc+xgbyDS4JYp5dkv9t14Jjo9oVxI/4HoiQZ; search=6|1669892894920%7Crect%3D42.04878089417609%252C-87.49779588183594%252C41.61852047358152%252C-87.96608811816407%26rid%3D17426%26disp%3Dmap%26mdm%3Dauto%26p%3D1%26z%3D1%26fs%3D0%26fr%3D1%26mmm%3D0%26rs%3D0%26ah%3D0%26singlestory%3D0%26housing-connector%3D0%26abo%3D0%26garage%3D0%26pool%3D0%26ac%3D0%26waterfront%3D0%26finished%3D0%26unfinished%3D0%26cityview%3D0%26mountainview%3D0%26parkview%3D0%26waterview%3D0%26hoadata%3D1%26zillow-owned%3D0%263dhome%3D0%26featuredMultiFamilyBuilding%3D0%26excludeNullAvailabilityDates%3D0%09%0917426%09%09%09%09%09%09; g_state={"i_p":1667387295853,"i_l":2}; _clsk=1jcgobx|1667300899910|3|0|d.clarity.ms/collect',
      origin: "https://www.zillow.com",
      referer,
      "sec-ch-ua": '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
    },
    data
  };
};

async function main() {
  const aptsToScrape = await prisma.apartment.findMany({
    where: {
      zillowUrl: {
        not: {
          equals: ""
        }
      }
    },
    orderBy: {
      id: "asc"
    }
  });
  console.log("aptsToScrape", aptsToScrape.length);

  for (const apt of aptsToScrape) {
    try {
      console.info(`========> Scraping ${apt.zillowUrl}`);
      const key = getKeyFromUrl(apt.zillowUrl);
      if (!key) {
        console.error(`No key found for ${apt.zillowUrl}`);
        continue;
      }
      const response = await scrape(apt.zillowUrl, key);
      //   console.log(JSON.stringify(response.data, null, 2));
      const data = response.data;
      if (data.errors?.length > 0) {
        console.error(data.errors);
        continue;
      }

      const building = data.data.building;
      const allAmenities: Prisma.AmenityCreateInput[] = [];

      const buildingAmenityDetails = building.amenityDetails;
      buildingAmenityDetails?.customAmenities?.rawAmenities?.forEach((amenity) => {
        console.log("amenity added - ", amenity);
        allAmenities.push({
          name: amenity,
          rawText: amenity,
          source: "zillow"
        });
      });

      // const amenityMap = new Map<string, boolean>();
      // let hasPool = false;

      // // for (const amenity of [...listing.top_amenities, ...listing.unit_amenities, ...listing.community_amenities]) {
      // //   // add to array if not amenity name does not exist in map
      // //   if (!amenityMap.has(amenity.display_name)) {
      // //     // checking if pool exists
      // //     if (amenity.display_name.toLowerCase().trim() === "pool" || amenity.display_name.toLowerCase().trim() === "swimming pool") {
      // //       hasPool = true;
      // //     }
      // //     amenityMap.set(amenity.display_name, true);
      // //     allAmenities.push({
      // //       name: amenity.display_name
      // //     });
      // //   }
      // // }

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
              rawText: amenity.rawText,
              source: amenity.source,
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
      if (isEmpty(apt.street) && !isEmpty(building.address.streetAddress)) {
        staticAptData.street = building.address.streetAddress;
      }
      if (isEmpty(apt.city) && !isEmpty(building.city)) {
        staticAptData.city = building.city;
      }
      if (isEmpty(apt.state) && !isEmpty(building.state)) {
        staticAptData.state = building.state;
      }
      if (isEmpty(apt.zip) && !isEmpty(building.address?.zipcode)) {
        staticAptData.zip = building.address?.zipcode;
      }
      // if (isEmpty(apt.neighborhood) && !isEmpty(building.address.neighborhood?)) { // NO DATA TO REFER TO FOR THIS. INVESTIGATE LATER
      //   staticAptData.neighborhood = building.neighborhood;
      // }
      // phone
      if (isEmpty(apt.phone) && !isEmpty(building.buildingPhoneNumber)) {
        staticAptData.phone = building.buildingPhoneNumber;
      }
      // email
      // if (isEmpty(apt.email) && !isEmpty(building.email)) {
      //   staticAptData.email = building.email;
      // }
      // description
      if (isEmpty(apt.description) && !isEmpty(building.description)) {
        staticAptData.description = building.description;
      }
      // contact name
      // if (isEmpty(apt.contactName) && !isEmpty(building.contactInfo?.)) {
      //   staticAptData.contactName = building.contact_name;
      // }

      let isPetFriendly = false;
      if (building.amenityDetails?.pets) {
        if (building.amenityDetails?.pets.length > 0) {
          isPetFriendly = true;
        }
      }

      await prisma.apartment.update({
        where: {
          id: apt.id
        },
        data: {
          ...staticAptData,
          country: "US",
          petFriendly: isPetFriendly
          // pool: hasPool,
          // parkingDetailsText: listing.parking_details_text ?? "",
          // storageDetailsText: listing.storage_details_text ?? "",
          // utilitiesIncludedText: listing.utilities_included_text ?? ""
        }
      });
      console.log("Apartment updated");

      // adding apartment floor plans
      const allFPs: Prisma.FloorPlanCreateInput[] = [];
      if (building.floorPlans && Array.isArray(building.floorPlans)) {
        for (const floorPlan of building.floorPlans) {
          const dbFp: Prisma.FloorPlanCreateInput = {
            apartment: {
              connect: {
                id: apt.id
              }
            },
            source: "zillow",
            sourceId: `zill__${floorPlan.zpid}`,
            name: floorPlan.name,
            title: floorPlan.name,
            bedrooms: floorPlan.beds,
            bathrooms: floorPlan.baths,
            squareFootage: floorPlan.sqft,
            squareFootageMax: floorPlan.sqft,
            minPrice: floorPlan.minPrice,
            maxPrice: floorPlan.maxPrice,
            dataDump: JSON.stringify(floorPlan)
          };
          if (floorPlan.photos?.length > 0) {
            dbFp.floorPlanImage = floorPlan.photos[floorPlan.photos.length - 1].url;
          }

          const dbUnits: Array<Prisma.UnitCreateInput> = [];

          if (floorPlan.units && Array.isArray(floorPlan.units)) {
            for (const unitInfo of floorPlan.units) {
              const dbUnit: Prisma.UnitCreateInput = {
                source: "zillow",
                sourceId: `zill__${unitInfo.zpid}`,
                name: unitInfo.unitNumber ?? "",
                //   applyOnlineUrl: unitInfo. ?? "",
                availability: Number(new Date(unitInfo.availableFrom)) === NaN ? "not-available" : "available",
                availableOn: Number(new Date(unitInfo.availableFrom)) === NaN ? undefined : new Date(unitInfo.availableFrom),
                displayName: unitInfo.unitNumber,
                price: unitInfo.price
                //   squareFootage: unitInfo.unitNumber // NO DATA TO REFER TO FOR THIS. INVESTIGATE LATER
              };
              dbUnits.push(dbUnit);
            }
            dbFp.units = {
              create: dbUnits
            };
            allFPs.push(dbFp);
          }
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
      }

      // adding apartment images
      const allImages: Prisma.ApartmentImageCreateManyInput[] = [];
      if (building.galleryPhotos && Array.isArray(building.galleryPhotos)) {
        for (const gallPhoto of building.galleryPhotos) {
          let photoUrl: string | null = null;
          if (gallPhoto.mixedSources.jpeg) {
            photoUrl = gallPhoto.mixedSources.jpeg[gallPhoto.mixedSources.jpeg.length - 1].url;
          }
          if (photoUrl) {
            const photoObj: Prisma.ApartmentImageCreateManyInput = {
              apartmentId: apt.id,
              url: photoUrl,
              type: ApartmentImageTypeType.EXTERIORS
            };
            if (allImages.length < 6) {
              photoObj.default = true;
            }
            allImages.push(photoObj);
          }
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
      console.log("Data successfully scraped for " + apt.zillowUrl);
    } catch (error) {
      console.error("errored out while scraping apartment ", apt.id);
      console.error(error);
    }
    sleep.sleep(5);
  }
}

const getKeyFromUrl = (url: string) => {
  // eg. https://www.zillow.com/b/amli-river-north-chicago-il-5XjR5q/
  // if url ends with a slash, remove it
  const urlWithoutSlash = url.endsWith("/") ? url.slice(0, -1) : url;
  const slug = urlWithoutSlash.split("/").pop();
  // the last part of slug is the key
  return slug?.split("-").pop();
};

async function scrape(referer: string, key: string) {
  try {
    return axios<APIResponse>(getConfig(referer, getData(key)));
  } catch (error) {
    console.error(error);
    throw error;
  }
}
main();
