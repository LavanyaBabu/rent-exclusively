import React from "react";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";

export const Field = (data: { value: string }) => {
  return data.value ? (
    <FieldContainer>
      <FieldLabel>{"Floor Plan Image"}</FieldLabel>
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
