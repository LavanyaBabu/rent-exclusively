import { GMass } from "../../config";
import axios from "axios";
import { nanoid } from "nanoid";

export const sendGMassEmail = (to: string, subject: string, body: string) => {
  const emailObj = {
    transactionalEmailId: nanoid(),
    fromEmail: GMass.fromEmail,
    fromName: GMass.fromName,
    to,
    subject,
    message: body,
    settings: {
      openTracking: false,
      clickTracking: false
    }
  };

  const url = `https://api.gmass.co/api/transactional?apikey=${GMass.apiKey}`;

  axios
    .post(url, emailObj)
    .then(() => {
      console.info("Email sent successfully");
    })
    .catch((err) => {
      console.error("Errored out while sending emails");
      console.error(err);
    });
};
