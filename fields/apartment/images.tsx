/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from "@keystone-ui/core";
import React from "react";
// import { FieldProps } from "@keystone-6/core/types";
import { FieldLabel } from "@keystone-ui/fields";
import { LoadingDots } from "@keystone-ui/loading";
import { Button } from "@keystone-ui/button";
import { useToasts } from "@keystone-ui/toast";
import { ImageCard } from "../../../admin/components/imageCard/imageCard";
import { DeleteApartmentImageModal } from "../../../admin/components/modal/index";
import { CellContainer } from "@keystone-6/core/admin-ui/components";
import { isNotNullNorUndefined, isNullOrUndefined } from "../../../utils/bool";
import { FindApartmentImagesQuery } from "../../../gql/generated/sdk";
import { deleteApartmentImage, getImagesByApartmentId } from "../../../api";
import { useAuthenticatedUser } from "../../../api/hooks/data/user";

export const Field = (data: { value: { id: string | null } }) => {
  const {
    value: { id }
  } = data;
  const [images, setImages] = React.useState<NonNullable<FindApartmentImagesQuery["apartmentImages"]>>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  // state to keep track of opening modal
  const [isOpen, setIsOpen] = React.useState(false);
  // state to track which image is being deleted
  const [imageToDelete, setImageToDelete] = React.useState<number>(0);
  const { addToast } = useToasts();
  const { data: user } = useAuthenticatedUser();

  React.useEffect(() => {
    if (isNullOrUndefined(id)) {
      // invalid state
      addToast({ title: "Errored out. Please contact admin in case the issue persists.", tone: "negative" });
      setImages([]);
    } else {
      getImages(Number(id));
    }
  }, []);

  const sortImages = (images: FindApartmentImagesQuery["apartmentImages"]): NonNullable<FindApartmentImagesQuery["apartmentImages"]> => {
    // get default and place it first
    if (isNotNullNorUndefined(images)) {
      const defaultImage = images.filter((image) => image.default);
      const otherImages = images.filter((image) => !image.default);
      return [...defaultImage, ...otherImages];
    }
    return [];
  };

  const getImages = async (id: number) => {
    setIsLoading(true);
    try {
      const data = await getImagesByApartmentId(id);
      if (isNotNullNorUndefined(data.apartmentImages)) {
        setImages(sortImages(data.apartmentImages));
      } else {
        addToast({ title: "Data not found. Please contact admin incase the issue persists", tone: "negative" });
        setImages([]);
      }
    } catch (error) {
      addToast({ title: "Errored out while querying API. Please contact admin in case the issue persists.", tone: "negative" });
      console.error({ error });
      setImages([]);
    }
    setIsLoading(false);
  };

  const refetchData = () => {
    if (isNotNullNorUndefined(id)) {
      getImages(Number(id));
    } else {
      // reload window
      window.location.reload();
    }
  };

  const deleteImage = async (imageId: number) => {
    if (isNotNullNorUndefined(imageId)) {
      deleteApartmentImage(imageId)
        .then(() => {
          refetchData();
          addToast({ title: "Image deleted successfully", tone: "positive" });
        })
        .catch((error) => {
          addToast({ title: "Errored out while deleting image. Please contact admin in case the issue persists.", tone: "negative" });
          console.error({ error });
        });
    } else {
      addToast({ title: "Errored out while deleting image. Please contact admin in case the issue persists.", tone: "negative" });
    }
  };

  // const toggleDefaultStatus = (id: number, isDefault: boolean) => {
  //   // toggle default status
  //   updateApartmentImage(id, { default: !isDefault }).then((data) => {
  //     if (!data) {
  //       console.error("Errored out while updating default status");
  //       window.location.reload();
  //       return;
  //     }
  //     addToast({ title: "Default status updated successfully", tone: "positive" });
  //     refetchData();
  //   });
  // };

  const canUserManageContent = !!user?.authenticatedItem?.role?.canManageContent;

  return isLoading ? (
    <LoadingDots label='Getting data' />
  ) : (
    <React.Fragment>
      <FieldLabel>{"Apartment Images"}</FieldLabel>
      {canUserManageContent && (
        <div>
          <Button size='small' type='button' tone='active'>
            <a
              css={css`
                text-decoration: none;
              `}
              href='/apartment-images/create'
              target={"_blank"}
            >
              {"Add New Image"}
            </a>
          </Button>
          <Button
            css={css`
              margin-left: 10px;
            `}
            size='small'
            type='button'
            tone='active'
          >
            <a
              css={css`
                text-decoration: none;
              `}
              href={`/apartments/${id}/sort-images`}
              target={"_blank"}
            >
              {"Sort Images"}
            </a>
          </Button>
        </div>
      )}
      <CellContainer>
        <DeleteApartmentImageModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          imageToDelete={imageToDelete}
          setImageToDelete={setImageToDelete}
          deleteImage={deleteImage}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "0.8rem",
            marginTop: "0.8rem"
          }}
        >
          {images
            .filter((item) => isNotNullNorUndefined(item.url) || isNotNullNorUndefined(item.cloudinaryImage?.publicUrlTransformed))
            .map((item) => {
              const imageUrl = item.cloudinaryImage?.publicUrlTransformed || item.url;
              if (!imageUrl) {
                return <React.Fragment></React.Fragment>;
              }
              return (
                <ImageCard
                  image={imageUrl}
                  key={item.id}
                  id={Number(item.id)}
                  title={imageUrl}
                  redirectURL={`/apartment-images/${item.id}`}
                  setIsOpen={setIsOpen}
                  setImageToDelete={setImageToDelete}
                  showDeleteButton={canUserManageContent}
                ></ImageCard>
              );
            })}
        </div>
      </CellContainer>
    </React.Fragment>
  );
};
