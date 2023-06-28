import { CloudinaryAdapter } from "@keystone-6/cloudinary/src/cloudinary";
import { cloudinary } from "../../config";

export const getCloudinaryInstance = () => {
  const adapter = new CloudinaryAdapter(
    cloudinary as {
      cloudName: string;
      apiKey: string;
      apiSecret: string;
      folder: string;
    }
  );
  return adapter;
};
