import { MutationTuple, useMutation } from "@keystone-6/core/admin-ui/apollo";
import { UpdateImagesOrderDocument, UpdateImagesOrderMutation, UpdateImagesOrderMutationVariables } from "../../../../gql/generated/sdk";

export function useUpdateImagesOrder(): MutationTuple<UpdateImagesOrderMutation, UpdateImagesOrderMutationVariables> {
  return useMutation<UpdateImagesOrderMutation, UpdateImagesOrderMutationVariables>(UpdateImagesOrderDocument);
}

// {
//     variables: { images },
//     refetchQueries: [
//       {
//         query: FindApartmentImagesDocument,
//         variables: {
//           where: { apartment: { id: { equals: apartmentId } } },
//           orderBy: [
//             {
//               order: OrderDirection.Asc
//             }
//           ]
//         }
//       }
//     ]
//   }
