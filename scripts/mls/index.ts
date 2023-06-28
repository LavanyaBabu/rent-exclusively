import axios from "axios";
import { prisma } from "db";
import { Apartment } from "@prisma/client";

export interface Medium {
  ImageHeight: number;
  Order: number;
  ImageWidth: number;
  MediaURL: string;
  MediaModificationTimestamp: Date;
  MediaKey: string;
}

export interface Room {
  MRD_Flooring: string;
  RoomLevel: string;
  RoomDimensions: string;
  RoomType: string;
  MRD_WindowTreatments: string;
  RoomKey: string;
  MRD_Type: string;
  MRD_Bath: string;
}

export interface RootObject {
  "@odata.id": string;
  MRD_AAN: string;
  LotSizeAcres: number;
  RoomType: string[];
  SpecialListingConditions: string[];
  InternetAddressDisplayYN: boolean;
  MRD_AGE: string;
  Cooling: string[];
  CommunityFeatures: string[];
  MRD_AMT: string;
  MRD_AON: string;
  Appliances: string[];
  MLSAreaMajor: string;
  LivingArea: number;
  LivingAreaSource: string;
  AssociationFee: number;
  MRD_ATC: string;
  MRD_B78: string;
  MRD_BAS: string;
  MRD_BB: string;
  Basement: string[];
  MRD_BOARDNUM: string;
  BedroomsTotal: number;
  BedroomsPossible: number;
  MRD_BRBELOW: string;
  MRD_CARS: string;
  BuyerAgencyCompensation: string;
  City: string;
  CloseDate: string;
  CountyOrParish: string;
  PurchaseContractDate: string;
  MRD_CRP: string;
  LotSizeDimensions: string;
  MRD_DIN: string;
  Directions: string;
  MRD_DRV: string;
  MRD_E: string;
  Electric: string[];
  OtherEquipment: string[];
  MRD_EXT: string;
  MRD_FIN: string;
  MRD_FIREPLACE_LOCATION: string;
  FoundationDetails: string[];
  PetsAllowed: string[];
  FireplacesTotal: number;
  FireplaceFeatures: string[];
  AssociationFeeFrequency: string;
  BathroomsFull: number;
  BathroomsTotalInteger: number;
  MRD_GAR: string;
  MRD_GARAGE_OWNERSHIP: string;
  ElementarySchool: string;
  ElementarySchoolDistrict: string;
  Heating: string[];
  MRD_HEM: string;
  HighSchool: string;
  HighSchoolDistrict: string;
  StreetNumber: string;
  MRD_IDX: string;
  Sewer: string[];
  WaterSource: string[];
  MRD_INF: string;
  InternetEntireListingDisplayYN: boolean;
  MiddleOrJuniorSchool: string;
  MiddleOrJuniorSchoolDistrict: string;
  MRD_LACITY: string;
  ListAgentEmail: string;
  ListAgentFirstName: string;
  ListAgentMlsId: string;
  ListAgentKey: string;
  ListAgentLastName: string;
  ListAgentOfficePhone: string;
  MRD_LASTATE: string;
  MRD_LASTREETNAME: string;
  MRD_LASTREETNUMBER: string;
  MRD_LAZIP: string;
  ListingContractDate: string;
  OriginalEntryTimestamp: Date;
  LotFeatures: string[];
  PreviousListPrice: number;
  DaysOnMarket: number;
  ListingKey: string;
  ListingId: string;
  MRD_LO_LOCATION: string;
  MRD_LOCITY: string;
  ListOfficeFax: string;
  ListOfficeMlsId: string;
  ListOfficeKey: string;
  ListOfficeName: string;
  ListOfficePhone: string;
  MRD_LOSTATE: string;
  MRD_LOSTREETNAME: string;
  MRD_LOSTREETNUMBER: string;
  ListOfficeURL: string;
  MRD_LOZIP: string;
  ListPrice: number;
  MRD_LSZ: string;
  AssociationFeeIncludes: string[];
  MRD_MANAGINGBROKER: string;
  MRD_MC: string;
  Model: string;
  AdditionalParcelsYN: boolean;
  MRD_N: string;
  NewConstructionYN: boolean;
  ParkingTotal: number;
  OriginalListPrice: number;
  OffMarketDate: string;
  MRD_OMT: string;
  OwnerPhone: string;
  Ownership: string;
  OwnerName: string;
  ParkingFeatures: string[];
  PhotosCount: number;
  ParcelNumber: string;
  MRD_PKN: string;
  Possession: string[];
  OriginatingSystemModificationTimestamp: Date;
  MRD_RECORDMODDATE: Date;
  PublicRemarks: string;
  MRD_REMARKSINTERNET: string;
  PropertyType: string;
  MRD_TYP: string;
  RoomsTotal: number;
  Roof: string[];
  MRD_S: string;
  MRD_SACITY: string;
  BuyerAgentEmail: string;
  BuyerAgentFax: string;
  BuyerAgentFirstName: string;
  BuyerAgentMlsId: string;
  BuyerAgentKey: string;
  BuyerAgentLastName: string;
  BuyerAgentOfficePhone: string;
  MRD_SAS: string;
  MRD_SASTATE: string;
  MRD_SASTREETNAME: string;
  MRD_SASTREETNUMBER: string;
  MRD_SAZIP: string;
  MRD_SCI: string;
  MRD_SO_LOCATION: string;
  MRD_SOCITY: string;
  BuyerOfficeEmail: string;
  BuyerOfficeFax: string;
  BuyerOfficeMlsId: string;
  BuyerOfficeKey: string;
  BuyerOfficeName: string;
  BuyerOfficePhone: string;
  MRD_SOSTATE: string;
  MRD_SOSTREETNAME: string;
  MRD_SOSTREETNUMBER: string;
  MRD_SOZIP: string;
  ClosePrice: number;
  MlsStatus: string;
  StandardStatus: string;
  StateOrProvince: string;
  StatusChangeTimestamp: Date;
  StreetName: string;
  ArchitecturalStyle: string[];
  TaxAnnualAmount: number;
  MRD_TPE: string;
  Township: string;
  MRD_TXC: string;
  TaxYear: number;
  MRD_UD: Date;
  MRD_VT: string;
  MRD_VTDATE: Date;
  MRD_W: string;
  WaterfrontYN: boolean;
  PostalCode: string;
  PostalCodePlus4: string;
  OriginatingSystemName: string;
  ModificationTimestamp: Date;
  Media: Medium[];
  PhotosChangeTimestamp: Date;
  Rooms: Room[];
  MlgCanView: boolean;
  MlgCanUse: string[];
  Latitude: number;
  Longitude: number;
}

async function main() {
  const exisitngRentals = await prisma.apartment.findMany({
    where: {
      propertyType: "rental"
    }
  });

  const apts = await prisma.apartment.findMany({
    where: {
      propertyType: "apartment"
    },
    select: {
      area: true
    }
  });
  const validAreas = apts.map((apt) => apt.area);

  const rentalMap = new Map<string, Apartment>();
  for (const rental of exisitngRentals) {
    rentalMap.set(rental.sourceId, rental);
  }

  const url =
    "https://api.mlsgrid.com/v2/Property?$expand=Media,Rooms,UnitTypes&$top=1000&$filter=%27OriginatingSystemName%27%20eq%20%27mred%27";

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 0612183c6a0f8f01f74f01cf00a5fcce4b26e376",
        Accept: "application/json"
      }
    });
    // const nextLink = response.data["@odata.nextLink"];
    const values = response.data.value as RootObject[];

    for (const val of values) {
      const mlsId = val.ListingId;
      if (val.City.trim().toLowerCase() !== "chicago") {
        continue;
      }
      // CHI - Uptown
      // split the area into two parts
      const spl = val.MLSAreaMajor.split("-");
      let AREA = "";
      if (spl.length >= 2) {
        // join the last parts
        AREA = spl.slice(1).join("-").trim();
      } else {
        AREA = spl[0].trim();
      }
      // check if rental's area is valid
      for (const area of validAreas) {
        if (AREA.toLowerCase().includes(area.toLowerCase()) || area.toLowerCase().includes(AREA.toLowerCase())) {
          AREA = area;
          break;
        }
      }
      if (rentalMap.has(mlsId)) {
        // check if the rental's last updated date is newer than the one in the db
        const rental = rentalMap.get(mlsId)!;
        const lastUpdated = new Date(val.ModificationTimestamp);
        if (lastUpdated > rental.updatedAt) {
          console.info("Updating rental", mlsId);

          const updatedRental = await prisma.apartment.update({
            where: {
              id: rental.id
            },
            data: {
              bedrooms: val.BedroomsTotal,
              bathrooms: val.BathroomsTotalInteger,
              description: val.PublicRemarks,
              listPrice: val.ListPrice,
              listAgentEmail: val.ListAgentEmail,
              listAgentName: `${val.ListAgentFirstName} ${val.ListAgentLastName}`,
              sourceId: mlsId,
              updatedAt: lastUpdated
            }
          });
          console.info("Updated rental", updatedRental);
        }
      } else {
        // create a new rental
        console.info("Creating rental", mlsId);
        const newRental = await prisma.apartment.create({
          data: {
            name: mlsId,
            website: val["@odata.id"],
            bedrooms: val.BedroomsTotal,
            bathrooms: val.BathroomsTotalInteger,
            description: val.PublicRemarks,
            listPrice: val.ListPrice,
            listAgentEmail: val.ListAgentEmail,
            sourceId: mlsId,
            propertyType: "rental",
            updatedAt: new Date(val.ModificationTimestamp),
            area: AREA,
            neighborhood: val.MLSAreaMajor,
            petFriendly: !!(val.PetsAllowed?.length > 0),
            pool: val.PublicRemarks?.toLowerCase().includes("pool") ?? false,
            roomsCount: val.RoomsTotal,
            city: val.City,
            contactName: `${val.ListAgentFirstName} ${val.ListAgentLastName}`,
            country: "US",
            zip: val.PostalCode,
            street: val.StreetName,
            state: val.StateOrProvince,
            phone: val.ListAgentOfficePhone,
            listAgentName: `${val.ListAgentFirstName} ${val.ListAgentLastName}`,
            daysOnMarket: val.DaysOnMarket,
            email: val.ListAgentEmail,
            lat: val.Latitude,
            lng: val.Longitude
          }
        });
        console.info("Created rental", newRental);
        // create images
        for (const media of val.Media ?? []) {
          const newImage = await prisma.apartmentImage.create({
            data: {
              url: media.MediaURL,
              type: "OTHER",
              sourceKey: media.MediaKey,
              apartment: {
                connect: {
                  id: newRental.id
                }
              }
            }
          });
          console.info("Created image", newImage);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

main();
