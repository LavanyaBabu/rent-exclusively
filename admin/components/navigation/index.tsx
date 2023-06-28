import { NavigationContainer, NavItem, ListNavItems } from "@keystone-6/core/admin-ui/components";
import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
import React from "react";
import { useQuery } from "@keystone-6/core/admin-ui/apollo";
import { AuthenticatedItemQuery, AuthenticatedItemDocument } from "../../../gql/generated/sdk";

export default function CustomNavigation({ authenticatedItem, lists }: NavigationProps) {
  const { data } = useQuery<AuthenticatedItemQuery>(AuthenticatedItemDocument);
  const isAgent = !!data?.authenticatedItem?.role?.canManageLeads;

  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href='/'>Dashboard</NavItem>
      {isAgent && <NavItem href='/unassigned-leads'>Unassigned Enquiries</NavItem>}
      {isAgent && <NavItem href='/myleads'>My Leads</NavItem>}
      <NavItem href='/email-users'>Marketing</NavItem>
      <ListNavItems lists={lists} />
    </NavigationContainer>
  );
}
