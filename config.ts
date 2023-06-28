import dotenv from "dotenv";
import { BaseKeystoneTypeInfo, DatabaseConfig } from "@keystone-6/core/types";
dotenv.config();

export const baseUrl = process.env.SERVER_URL || "http://localhost:3000";
export const port = process.env.PORT ? Number(process.env.PORT) : 3000;
export const db: DatabaseConfig<BaseKeystoneTypeInfo> = {
  provider: "postgresql",
  url: process.env.DATABASE_URL || "postgresql://pgadmin:password@localhost:5432/us_real_estate",
  useMigrations: true,
  idField: { kind: "autoincrement" },
  enableLogging: process.env.ENABLE_DB_LOGGING == "true",
  additionalPrismaDatasourceProperties: {}
};
export const sessionSecret = process.env.SESSION_SECRET || "9z$C&F_J@McQfTjW9z$C&F_J@McQfTjW";
export const nodeEnv = process.env.NODE_ENV || "development";
export const googleSpreadSheetId = process.env.GOOGLE_SPREADSHEET_ID || "1pH2oxk50I3D0X9ReRSKHbI5FhGjsZBJ2f0HF7UHoFMU";
export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  folder: process.env.CLOUDINARY_FOLDER
};
export const clientUrl = process.env.CLIENT_URL;
export const adminEmail = process.env.ADMIN_EMAIL;
export const GMass = {
  apiKey: process.env.GMASS_API_KEY,
  fromEmail: process.env.GMASS_FROM_EMAIL,
  fromName: process.env.GMASS_FROM_NAME
};
