import { QueryResult, useQuery } from "@keystone-6/core/admin-ui/apollo";
import { SearchesQuery, SearchesQueryVariables, SearchesDocument } from "../../../../gql/generated/sdk";
import {
  AuthenticatedItemDocument,
  AuthenticatedItemQuery,
  FavoritesQuery,
  FavoritesQueryVariables,
  FavoritesDocument,
  OrderDirection
} from "../../../../gql/generated/sdk";

export function useAuthenticatedUser() {
  return useQuery<AuthenticatedItemQuery>(AuthenticatedItemDocument);
}

export function useUserFavorties(userID: string): QueryResult<FavoritesQuery, FavoritesQueryVariables> {
  return useQuery<FavoritesQuery, FavoritesQueryVariables>(FavoritesDocument, {
    variables: {
      where: {
        user: {
          id: {
            equals: userID
          }
        }
      },
      orderBy: [
        {
          createdAt: OrderDirection.Desc
        }
      ],
      imageOrderBy: [
        {
          order: OrderDirection.Asc
        }
      ],
      take: 5
    }
  });
}

export function useUserSearches(userID: string): QueryResult<SearchesQuery, SearchesQueryVariables> {
  return useQuery<SearchesQuery, SearchesQueryVariables>(SearchesDocument, {
    variables: {
      where: {
        user: {
          id: {
            equals: userID
          }
        }
      }
    }
  });
}
