/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from "@keystone-ui/core";
import React from "react";
import { Apartment } from "../../../gql/generated/sdk";

interface Props {
  apartments: Apartment[];
}

export default function ApartmentList({ apartments }: Props) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 0.5rem;
        overflow: auto;
        border-color: #e5e7eb;
        border-style: solid;
        border-width: 0;
        box-sizing: border-box;
        font-family: "Nunito", sans-serif;
        font-size: 16px;
        line-height: inherit;
        tab-size: 4;
      `}
    >
      {apartments.map((apartment) => (
        <div
          css={css`
            position: relative;
          `}
        >
          <a href={"/apartments/" + apartment.id} />
          {/* card */}
          <div
            css={css`
              display: grid;
              background-color: white;
              cursor: pointer;
            `}
            onClick={() => {
              window.location.href = "/apartments/" + apartment.id;
            }}
          >
            <div
              css={css`
                position: relative;
                height: 240px;
                width: 100%;
                border-color: #e5e7eb;
                border-style: solid;
                border-width: 0;
              `}
            >
              <img
                css={css`
                  display: block;
                  max-width: 100%;
                  object-fit: cover;
                  position: absolute;
                  height: 100%;
                  width: 100%;
                  inset: 0px;
                  color: transparent;
                `}
                src={apartment.images?.[0]?.url as any}
              />
            </div>
            {/* card info */}
            <div
              css={css`
                padding: 0.5rem;
              `}
            >
              <div
                css={css`
                  font-size: 1.25rem;
                  line-height: 1.75rem;
                  font-weight: 700;
                `}
              >
                {apartment.name}
              </div>
              {apartment.area}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
