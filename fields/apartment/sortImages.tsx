/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from "@keystone-ui/core";
import { useToasts } from "@keystone-ui/toast";
import { SortableContainer } from "../../../admin/components/sortable/container";
import { useUpdateImagesOrder } from "../../../api/hooks/data/apartment-images";
import { ApartmentImage } from "../../../gql/generated/sdk";
import UnexpectedError from "../../../admin/components/errors/components/UnexpectedError";

export const SortImage = ({ images, refetch }: { images: ApartmentImage[]; refetch: () => void }) => {
  const { addToast } = useToasts();
  const [updateImagesOrder, { error: updateErr }] = useUpdateImagesOrder();

  const saveOrder = (images: string[]) => {
    updateImagesOrder({
      variables: { images }
    }).then(() => {
      addToast({ title: "Images order saved", tone: "positive" });
      refetch();
    });
  };

  if (updateErr) {
    addToast({ title: "Errored out while getting images. Please contact admin in case the issue persists.", tone: "negative" });
    return <UnexpectedError />;
  }

  const sortImagesData: {
    id: number;
    imageUrl: string;
  }[] = [];

  images.forEach((img) => {
    const imgUrl = img.cloudinaryImage?.publicUrlTransformed ?? img.url;
    if (imgUrl) {
      sortImagesData.push({
        id: Number(img.id),
        imageUrl: imgUrl
      });
    }
  });

  if (sortImagesData.length === 0) {
    return <div>No Images</div>;
  }
  return <SortableContainer images={sortImagesData} saveOrder={saveOrder} />;
};
