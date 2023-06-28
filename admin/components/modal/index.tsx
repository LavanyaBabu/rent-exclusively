import { AlertDialog } from "@keystone-ui/modals";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  // id: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageToDelete: number;
  setImageToDelete: React.Dispatch<React.SetStateAction<number>>;
  deleteImage: (id: number) => void;
}

export const DeleteApartmentImageModal = ({ isOpen, setIsOpen, imageToDelete, setImageToDelete, deleteImage }: ModalProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      title='Delete Image'
      tone='negative'
      actions={{
        confirm: {
          label: "Delete",
          action: async () => {
            deleteImage(imageToDelete);
            setImageToDelete(0);
            setIsOpen(false);
          }
        },
        cancel: {
          label: "Cancel",
          action: () => {
            setImageToDelete(0);
            setIsOpen(false);
          }
        }
      }}
    >
      <p>Are you sure you want to delete?</p>
    </AlertDialog>
  );
};
