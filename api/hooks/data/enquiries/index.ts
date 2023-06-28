import { useMutation, useQuery } from "@keystone-6/core/admin-ui/apollo";
import {
  GetMyAssignedEnquiriesDocument,
  GetMyAssignedEnquiriesQuery,
  GetUnassignedEnquiriesQuery,
  GetUnassignedEnquiriesDocument,
  GetEnquiryByIdQuery,
  GetEnquiryByIdQueryVariables,
  GetEnquiryByIdDocument,
  AssignEnquiryToUserMutation,
  AssignEnquiryToUserMutationVariables,
  AssignEnquiryToUserDocument,
  RemoveEnquiryFromUserDocument,
  RemoveEnquiryFromUserMutationVariables,
  RemoveEnquiryFromUserMutation
} from "../../../../gql/generated/sdk";

export function useGetEnquiryById(enquiryId: string) {
  return useQuery<GetEnquiryByIdQuery, GetEnquiryByIdQueryVariables>(GetEnquiryByIdDocument, {
    variables: { id: enquiryId }
  });
}

export function useAssignEnquiry(enquiryID: string) {
  return useMutation<AssignEnquiryToUserMutation, AssignEnquiryToUserMutationVariables>(AssignEnquiryToUserDocument, {
    variables: { enquiryId: enquiryID },
    refetchQueries: [{ query: GetMyAssignedEnquiriesDocument }, { query: GetUnassignedEnquiriesDocument }]
  });
}

export function useRemoveEnquiry(enquiryID: string) {
  return useMutation<RemoveEnquiryFromUserMutation, RemoveEnquiryFromUserMutationVariables>(RemoveEnquiryFromUserDocument, {
    variables: { enquiryId: enquiryID },
    refetchQueries: [{ query: GetMyAssignedEnquiriesDocument }, { query: GetUnassignedEnquiriesDocument }]
  });
}

export function useGetMyAssignedEnquiries() {
  return useQuery<GetMyAssignedEnquiriesQuery>(GetMyAssignedEnquiriesDocument);
}

export function useGetUnassignedEnquiries() {
  return useQuery<GetUnassignedEnquiriesQuery>(GetUnassignedEnquiriesDocument);
}
