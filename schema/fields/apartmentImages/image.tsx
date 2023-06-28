import React from "react";
import { FieldProps } from "@keystone-6/core/types";
// import { Button } from "@keystone-ui/button";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
// import { MinusCircleIcon, EditIcon } from "@keystone-ui/icons";
import { controller } from "@keystone-6/core/fields/types/virtual/views"; //todo: change this to specific type based on field type

export const Field = (data: FieldProps<typeof controller>) => {
  return data.value && typeof data.value === "string" ? (
    <FieldContainer>
      <FieldLabel>{"Image"}</FieldLabel>
      <div>
        <img
          style={{
            width: "100%"
          }}
          src={data.value}
        ></img>
      </div>
    </FieldContainer>
  ) : (
    <></>
  );
};
