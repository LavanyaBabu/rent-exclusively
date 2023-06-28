import { useQuery } from "@keystone-6/core/admin-ui/apollo";
import { ApartmentDocument, ApartmentQuery, ApartmentQueryVariables } from "../../../../gql/generated/sdk";
import {
  FindApartmentImagesQueryVariables,
  FindApartmentImagesDocument,
  FindApartmentImagesQuery,
  OrderDirection
} from "../../../../gql/generated/sdk";

export function useGetApartmentImages(apartmentId: string) {
  return useQuery<FindApartmentImagesQuery, FindApartmentImagesQueryVariables>(FindApartmentImagesDocument, {
    variables: {
      where: { apartment: { id: { equals: apartmentId } } },
      orderBy: [
        {
          order: OrderDirection.Asc
        }
      ]
    }
  });
}

export function useGetApartmentById(apartmentId: string) {
  return useQuery<ApartmentQuery, ApartmentQueryVariables>(ApartmentDocument, {
    variables: {
      where: { id: apartmentId }
    }
  });
}
