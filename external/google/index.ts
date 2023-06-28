import { google } from "googleapis";

export const getGoogleSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./external/google/google-credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });
  const client = await auth.getClient();

  return google.sheets({ version: "v4", auth: client });
};
