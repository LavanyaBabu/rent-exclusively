/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from "@keystone-ui/core";
import { LoadingDots } from "@keystone-ui/loading";
import { useGetUnassignedEnquiries } from "../../api/hooks/data/enquiries/index";
import { EnquiryTable } from "../components/enquiry/enquiries-table";

export default function UnassignedLeads() {
  const { data, loading } = useGetUnassignedEnquiries();

  return loading ? (
    <LoadingDots label='Loading' />
  ) : (
    <EnquiryTable enquiries={data?.getUnAssignedEnquiries ?? []} heading={"Unassigned Leads"} />
  );
}
