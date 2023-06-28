import React from "react";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import { Link, H5 } from "@keystone-ui/core";
import { LoadingDots } from "@keystone-ui/loading";
import { Button } from "@keystone-ui/button";
import { useToasts } from "@keystone-ui/toast";
import { useGetEnquiryById } from "../../../api/hooks/data/enquiries";
import { useAuthenticatedUser } from "../../../api/hooks/data/user";
import { useAssignEnquiry, useRemoveEnquiry } from "../../../api/hooks/data/enquiries/index";

export const Field = (props: { value: { id: string } }) => {
  const enquiryId = props.value.id;
  const { addToast } = useToasts();
  const { data, loading, error } = useGetEnquiryById(enquiryId);
  const { data: user } = useAuthenticatedUser();
  const [assignEnq, { loading: isAssigning, error: assignError }] = useAssignEnquiry(enquiryId);
  const [removeEnq, { loading: isRemoving, error: removeError }] = useRemoveEnquiry(enquiryId);

  if (loading || isAssigning || isRemoving) return <LoadingDots label='loading' />;

  if (error || assignError || removeError) {
    console.error({ error });
    addToast({ title: "Errored out while querying API. Please contact admin in case the issue persists.", tone: "negative" });
    return <></>;
  }

  if (!data || !data.enquiries?.length) {
    console.error("No data returned from API");
    addToast({ title: "No enquiry found. Please contact admin in case the issue persists.", tone: "negative" });
    return <></>;
  }
  const loggedInUserIsAgent = !!user?.authenticatedItem?.role?.canManageLeads;

  const enquiry = data.enquiries[0];
  const assignedAgent = enquiry.assignedTo;
  const isAssignedToLoggedInUser = assignedAgent?.id === user?.authenticatedItem?.id;

  return (
    <FieldContainer>
      <FieldLabel>{"Assigned Agent"}</FieldLabel>
      {assignedAgent ? (
        <>
          <Link href={`/users/${assignedAgent.id}`}>{assignedAgent.firstName ?? assignedAgent.lastName ?? assignedAgent.email ?? ""}</Link>
          <br />
          {isAssignedToLoggedInUser && (
            <Button size='medium' tone='warning' onClick={() => removeEnq()}>
              Remove
            </Button>
          )}
        </>
      ) : (
        <>
          <H5>-- NA --</H5>
          {loggedInUserIsAgent && (
            <Button tone='active' size='medium' onClick={() => assignEnq()}>
              Assign Myself
            </Button>
          )}
        </>
      )}
    </FieldContainer>
  );
};
