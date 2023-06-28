import { useQuery } from "@keystone-6/core/admin-ui/apollo";
import { FindFloorPlansQuery, FindFloorPlansQueryVariables, FindFloorPlansDocument, OrderDirection } from "../../../../gql/generated/sdk";

export function useGetApartmentFloorPlans(apartmentId: string | null) {
  if (!apartmentId) return null;
  return useQuery<FindFloorPlansQuery, FindFloorPlansQueryVariables>(FindFloorPlansDocument, {
    variables: {
      where: {
        apartment: {
          id: {
            equals: apartmentId
          }
        }
      },
      orderBy: [
        {
          createdAt: OrderDirection.Desc
        }
      ]
    }
  });
}
