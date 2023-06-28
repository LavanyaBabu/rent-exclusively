/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from "@keystone-ui/core";
import { CellContainer } from "@keystone-6/core/admin-ui/components";
import { FieldLabel } from "@keystone-ui/fields";
import { LoadingDots } from "@keystone-ui/loading";
import { Button } from "@keystone-ui/button";
import { useToasts } from "@keystone-ui/toast";
import React from "react";
import Card from "../../../admin/components/card";
import { useAuthenticatedUser } from "../../../api/hooks/data/user";
import { useGetApartmentFloorPlans } from "../../../api/hooks/data/floorPlans";

export const Field = (data: { value: { id: string | null } }) => {
  const {
    value: { id }
  } = data;
  const floorPlanData = useGetApartmentFloorPlans(id);
  const { addToast } = useToasts();
  const { data: user } = useAuthenticatedUser();
  const canUserManageContent = !!user?.authenticatedItem?.role?.canManageContent;

  if (floorPlanData?.loading) {
    return <LoadingDots label='Getting data' />;
  }

  if (floorPlanData?.error) {
    addToast({ title: "Errored out while getting floor plans. Please contact admin in case the issue persists.", tone: "negative" });
    return <div>{floorPlanData.error.message}</div>;
  }

  return (
    <React.Fragment>
      <FieldLabel>
        {"Floor Plans"}
        <Button
          css={css`
            margin-left: 10px;
          `}
          size='small'
          type='button'
          tone='active'
        >
          {canUserManageContent && (
            <a
              css={css`
                text-decoration: none;
              `}
              href='/floor-plans/create'
              target={"_blank"}
            >
              {"Add New Floor Plan"}
            </a>
          )}
        </Button>
      </FieldLabel>
      <CellContainer>
        <div
          css={css`
            display: grid;
            grid-template-columns: "1fr 1fr";
            grid-gap: 1rem;
          `}
        >
          {(floorPlanData?.data?.floorPlans ?? []).map((floorPlan) => {
            return (
              <Card
                horizontal
                title={floorPlan.title}
                key={floorPlan.id}
                image={floorPlan.floorPlanImage}
                linkToItem={`/floor-plans/${floorPlan.id}`}
              >
                <div
                  css={css`
                    display: flex;
                    margin: 0.75rem 0;
                    gap: 1rem;
                  `}
                >
                  {floorPlan.bedrooms === 0 ? <span>Studio</span> : <span>{floorPlan.bedrooms} Beds</span>}
                  <span>{floorPlan.bathrooms} Bath</span>
                </div>

                <div
                  css={css`
                    display: flex;
                    margin: 0.75rem 0;
                    gap: 1rem;
                  `}
                >
                  <span>
                    {floorPlan.squareFootage}
                    <small className='italic'>&nbsp;sqft</small>
                  </span>
                  {Number(floorPlan.minPrice) > 0 && (
                    <span>
                      {Intl.NumberFormat("en-US", {
                        currency: "USD",
                        style: "currency"
                      }).format(Number(floorPlan.minPrice))}
                      <sup>+</sup>
                    </span>
                  )}
                </div>
                {Number(floorPlan.unitsCount) > 0 && (
                  <div>
                    <span>{floorPlan.unitsCount} Unit(s) Available</span>
                  </div>
                )}

                {floorPlan.minPrice === 0 && <span className='italic'>-NA-</span>}
              </Card>
            );
          })}
        </div>
      </CellContainer>
    </React.Fragment>
  );
};
