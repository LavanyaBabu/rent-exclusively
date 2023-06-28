/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from "@keystone-ui/core";
import { SerializedStyles } from "@emotion/react";
import { PropsWithChildren } from "react";

interface CardProps {
  image?: string | null;
  title?: string | null;
  customCss?: SerializedStyles;
  horizontal?: boolean;
  linkToItem?: string;
}

type CardPropsWithChildren = PropsWithChildren<CardProps>;

export default function Card({ image, title, children, customCss, horizontal = false, linkToItem }: CardPropsWithChildren) {
  return (
    <div
      css={css`
        display: grid;
        ${customCss}
        background-color: white;
        grid-template-columns: auto auto;
        cursor: ${linkToItem ? "pointer" : "default"};
        @media (min-width: 768px) {
          grid-auto-flow: column;
        }
      `}
      onClick={() => {
        if (linkToItem) {
          window.location.href = linkToItem;
        }
      }}
    >
      {image && (
        <div
          css={css`
            position: relative;
            width: 100%;
            height: 240px;
            overflow: hidden;
          `}
        >
          <img
            css={css`
              object-fit: ${horizontal ? "cover" : "contain"};
              width: 100vw;
              @media (min-width: 933px) {
                width: 25vw;
              }
            `}
            src={image}
            alt={title ?? image}
          />
        </div>
      )}

      <div
        css={css`
          padding: 1.25rem;
        `}
      >
        <div
          css={css`
            font-size: 1.25rem;
            font-weight: 500;
            text-align: left;
          `}
        >
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}
