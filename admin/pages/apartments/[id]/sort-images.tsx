/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from "@keystone-ui/core";
import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { Heading } from "@keystone-ui/core";
import { useRouter } from "next/router";
import { LoadingDots } from "@keystone-ui/loading";
import { useAuthenticatedUser } from "../../../../api/hooks/data/user";
import UnexpectedError from "../../../components/errors/components/UnexpectedError";
import { DataNotFound } from "../../../components/errors/pages/DataNotFound";
import { useGetApartmentById, useGetApartmentImages } from "../../../../api/hooks/data/apartment";
import { Unauthorized } from "../../../components/errors/pages/Unauthorized";
import { SortImage } from "../../../../schema/fields/apartment/sortImages";

const SortImages = () => {
  let pageTitle = "Manage Apartment Images";
  const router = useRouter();
  const { id: apartmentId } = router.query;
  if (!apartmentId || typeof apartmentId !== "string") {
    return <DataNotFound pageTitle={pageTitle} />;
  }
  const { data: apartment, loading: aptLoading, error: aptError } = useGetApartmentById(apartmentId);
  const { data: user, loading: userLoading, error: userError } = useAuthenticatedUser();
  const { data: images, refetch: refetchImages, loading: imagesLoading, error: imagesErr } = useGetApartmentImages(apartmentId);

  if (!userLoading && !userError) {
    const canUserManageContent = !!user?.authenticatedItem?.role?.canManageContent;
    if (!canUserManageContent) {
      return <Unauthorized pageTitle={pageTitle} />;
    }
  }

  if (!aptLoading && !aptError) {
    if (!apartment || !apartment.apartment) {
      return <DataNotFound pageTitle={pageTitle} />;
    } else {
      pageTitle = `Sort Images for ${apartment.apartment.name}`;
    }
  }

  const refetch = () => {
    refetchImages();
  };

  return (
    <PageContainer header={<Heading type='h3'>{pageTitle}</Heading>}>
      {userLoading || imagesLoading ? (
        <LoadingDots label='Loading' />
      ) : userError || imagesErr ? (
        <UnexpectedError />
      ) : (
        <SortImage images={images?.apartmentImages ?? []} refetch={refetch} />
      )}
    </PageContainer>
  );
};

export default SortImages;
