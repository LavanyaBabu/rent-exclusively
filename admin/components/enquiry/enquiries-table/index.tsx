/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from "@keystone-ui/core";
import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { Heading } from "@keystone-ui/core";
import { Enquiry } from "../../../../gql/generated/sdk";
import { AssignEnquiryBtn } from "../assignEnquiryBtn";
import ListTable, { EnquiryRow } from "../../listTable";

type PropTypes = {
  enquiries: Enquiry[];
  heading: string;
};

export const EnquiryTable = ({ enquiries, heading }: PropTypes) => {
  const headers = ["ID", "Message", "User", "Agent", "Apartment", "Enquiry Date"];

  const rows: EnquiryRow[] =
    enquiries.map((enquiry) => {
      const row: EnquiryRow = {
        cells: [
          {
            value: enquiry.id,
            link: `/enquiries/${enquiry.id}`
          },
          {
            value: enquiry.message ?? "",
            link: `/enquiries/${enquiry.id}`
          },
          {
            value: enquiry.user?.firstName ?? "",
            link: enquiry.user?.id ? `/users/${enquiry.user.id}` : undefined
          },
          {
            value: enquiry.assignedTo?.firstName ?? "",
            link: enquiry.assignedTo?.id ? `/users/${enquiry.assignedTo.id}` : undefined,
            element: <AssignEnquiryBtn enquiryId={enquiry.id} allowRemove={false} />
          },
          {
            value: enquiry.apartment?.name ?? "",
            link: enquiry.apartment?.id ? `/apartments/${enquiry.apartment.id}` : undefined
          },
          {
            value: new Date(enquiry.createdAt).toLocaleString()
          }
        ],
        enquiryId: enquiry.id
      };
      return row;
    }) ?? [];

  return (
    <PageContainer header={<Heading type='h3'>{heading}</Heading>}>
      <ListTable headers={headers} rows={rows} />
    </PageContainer>
  );
};
