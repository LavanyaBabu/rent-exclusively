/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from "@keystone-ui/core";
import { Button } from "@keystone-ui/button";
import React from "react";
import { PropsWithChildren } from "react";

interface CardProps {
  image: string;
  title: string;
  id: number;
  redirectURL: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImageToDelete: React.Dispatch<React.SetStateAction<number>>;
  showDeleteButton: boolean;
}

type CardPropsWithChildren = PropsWithChildren<CardProps>;

export function ImageCard({ image, title, redirectURL, setIsOpen, setImageToDelete, id, showDeleteButton }: CardPropsWithChildren) {
  return (
    <React.Fragment>
      {image && (
        <div
          css={css`
            background-color: white;
          `}
        >
          <a href={redirectURL}>
            <img
              css={css`
                width: 100%;
                height: auto;
                &:hover {
                  transform: scale(0.95);
                  transition: 0.3s;
                }
              `}
              src={image}
              alt={title}
            />
          </a>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              margin-bottom: 1rem;
            `}
          >
            {showDeleteButton && (
              <Button
                size='small'
                type='button'
                tone='negative'
                onClick={() => {
                  setIsOpen(true);
                  setImageToDelete(id);
                }}
              >
                {"Delete"}
              </Button>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
