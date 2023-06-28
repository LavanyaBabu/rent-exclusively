/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from "@keystone-ui/core";
import React from "react";
import { FieldLabel } from "@keystone-ui/fields";
import { LoadingDots } from "@keystone-ui/loading";
import { useToasts } from "@keystone-ui/toast";
import { CellContainer } from "@keystone-6/core/admin-ui/components";
import { useUserFavorties } from "../../../api/hooks/data/user";
import ApartmentList from "../../../admin/components/favoriteApartmentList";
import { Apartment } from "../../../gql/generated/sdk";

export const Field = (props: { value: { id: string } }) => {
  const { addToast } = useToasts();
  const {
    value: { id }
  } = props;
  const { data, error, loading } = useUserFavorties(id);

  if (loading) return <LoadingDots label='loading' />;

  if (error) {
    console.error({ error });
    addToast({ title: "Errored out while querying API. Please contact admin in case the issue persists.", tone: "negative" });
    return <React.Fragment></React.Fragment>;
  }
  const favs = data?.favorites || [];
  const apartments = (favs.map((fav) => fav.apartment) ?? []) as Apartment[];

  if (apartments.length == 0) {
    return (
      <React.Fragment>
        <FieldLabel>{"Favorites"}</FieldLabel>
        <CellContainer>
          <p>No favorites yet</p>
        </CellContainer>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <FieldLabel>{"Favorites"}</FieldLabel>
      <ApartmentList apartments={apartments} />
    </React.Fragment>
  );
};
