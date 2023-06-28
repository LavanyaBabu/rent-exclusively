import { GraphQLClient } from "graphql-request";
import { ApartmentFilters } from "../admin/dto";
import {
  ApartmentWhereInput,
  DeleteApartmentImageMutation,
  FindApartmentImagesQuery,
  FindFloorPlansQuery,
  getSdk,
  OrderDirection,
  UpdateApartmentImageMutation
} from "../gql/generated/sdk";
import { isNotNullNorUndefined } from "../utils/bool";

const api = getSdk(
  new GraphQLClient(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql`, {
    credentials: "include"
  })
);

export async function getImagesByApartmentId(apartmentId: number): Promise<FindApartmentImagesQuery> {
  return await api.FindApartmentImages({
    where: {
      apartment: {
        id: {
          equals: apartmentId.toString()
        }
      }
    },
    orderBy: [
      {
        order: OrderDirection.Asc
      }
    ]
  });
}

export async function getFloorPlansByApartmentId(apartmentId: number): Promise<FindFloorPlansQuery> {
  const data = await api.FindFloorPlans({
    where: {
      apartment: {
        id: {
          equals: apartmentId.toString()
        }
      }
    },
    orderBy: [
      {
        createdAt: OrderDirection.Desc
      }
    ]
  });

  return data;
}

export async function deleteApartmentImage(imageId: number): Promise<DeleteApartmentImageMutation> {
  const data = await api.DeleteApartmentImage({
    where: { id: imageId.toString() }
  });
  return data;
}

export async function updateApartmentImage(
  imageId: number,
  data: {
    default?: boolean;
  }
): Promise<UpdateApartmentImageMutation> {
  const res = await api.UpdateApartmentImage({
    where: { id: imageId.toString() },
    data
  });
  return res;
}

export async function getAllApartments() {
  return await api.AllApartmentsForFilter({
    orderBy: [
      {
        name: OrderDirection.Asc
      }
    ],
    imagesOrderBy: [{ order: OrderDirection.Asc }]
  });
}

export async function getAllAmenities() {
  return await api.Amenities({
    orderBy: [
      {
        name: OrderDirection.Asc
      }
    ]
  });
}

export async function searchApartments(filters: ApartmentFilters) {
  let where: ApartmentWhereInput = {};
  if (isNotNullNorUndefined(filters.areas) && filters.areas.length > 0) {
    where = {
      ...where,
      area: {
        in: filters.areas
      }
    };
  }
  if (isNotNullNorUndefined(filters.beds) && filters.beds >= 0) {
    where = {
      ...where,
      floorPlans: {
        some: {
          ...where.floorPlans?.some,
          bedrooms: {
            gte: ~~filters.beds
          }
        }
      }
    };
  }
  if (isNotNullNorUndefined(filters.baths) && filters.baths >= 0) {
    where = {
      ...where,
      floorPlans: {
        some: {
          ...where.floorPlans?.some,
          bathrooms: {
            gte: ~~filters.baths
          }
        }
      }
    };
  }
  if (isNotNullNorUndefined(filters.amenities) && filters.amenities.length > 0) {
    where = {
      ...where,
      amenities: {
        some: {
          id: {
            in: filters.amenities.map((a) => a.toString())
          }
        }
      }
    };
  }

  if (
    isNotNullNorUndefined(filters.priceFrom) &&
    filters.priceFrom >= 0 &&
    isNotNullNorUndefined(filters.priceTo) &&
    filters.priceTo >= 0
  ) {
    where = {
      ...where,
      floorPlans: {
        some: {
          minPrice: {
            gte: ~~filters.priceFrom
          },
          maxPrice: {
            lte: ~~filters.priceTo
          }
        }
      }
    };
  }

  return await api.UserApartmentPromotionalEmailApartmentResults({
    aptWhere: where
  });
}

export async function getUsers() {
  return await api.Users();
}

export async function sendPromotionEmailToUsers(data: {
  apartmentIds: string[];
  userIds: string[];
  beds?: number;
  baths?: number;
  location?: string[];
  priceFrom?: number;
  priceTo?: number;
}) {
  return await api.SendPromotionalEmail({ data });
}

export async function followUpBossPeopleCreated(userIds: string[]) {
  return await api.FollowUpBossPeopleCreated({ userIds });
}
