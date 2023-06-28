import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { Heading } from "@keystone-ui/core";
import React from "react";

export const DataNotFound = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <PageContainer header={<Heading type='h3'>{pageTitle}</Heading>}>
      <div>No Data Found</div>
    </PageContainer>
  );
};
