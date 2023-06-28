import { baseUrl, clientUrl } from "../../config";
import { sendGMassEmail } from "./gmass";
import Handlebars from "handlebars";
import { isNotNullNorUndefined } from "../../utils/bool";
import fs from "fs";
import { makeUrl } from "../../utils/url";
import { money } from "../../utils/money";

type SendEmailParamsType =
  | {
      to: string;
      type: "passwordReset";
      data: { token: string };
    }
  | {
      to: string;
      type: "newUserPasswordCreate";
      data: { passwordCreateUUID: string };
    }
  | {
      to: string;
      type: "newUserEnquiry";
      data: { enquiryID: string };
    }
  | {
      to: string;
      toName: string;
      fromName: string;
      type: "newListingsAdded";
      data: {
        listings: Listing[];
        beds?: number;
        baths?: number;
        location?: string[];
        minPrice?: number;
        maxPrice?: number;
      };
    };

export type Listing = { id: number; location: string; name: string; image: string; price: string; beds: number; baths: number };

export async function sendEmail(data: SendEmailParamsType) {
  if (data.type === "passwordReset") {
    sendGMassEmail(data.to, "Password Reset", passwordResetHtmlMessage(data.data.token, data.to));
  } else if (data.type === "newUserPasswordCreate") {
    sendGMassEmail(data.to, "Create your password", newUserPasswordCreateHtmlMessage(data.data.passwordCreateUUID));
  } else if (data.type == "newListingsAdded") {
    // newUserEnquiry
    const listings = data.data.listings;
    const beds = data.data.beds;
    const baths = data.data.baths;
    const location = data.data.location;

    if (listings.length === 0) return;

    sendGMassEmail(
      data.to,
      "Greetings from Rentexclusively!",
      userNewListingsAdded({ agentName: data.fromName, userName: data.toName, listings, beds, baths, location })
    );
  } else {
    // newUserEnquiry
    sendGMassEmail(data.to, "New Enquiry", newEnquiryHtmlMessage(data.data.enquiryID));
  }
}

// todo: beautify this
const passwordResetHtmlMessage = (token: string, email: string) => `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                          <a href="https://rentexclusively.com?gmasstrack=false" title="logo" target="_blank">
                            <img width="60" src="https://rentexclusively.com/_next/image?url=%2Flogo.png&w=640&q=75" title="logo" alt="logo">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            To reset your password, click the following link and follow the instructions.
                                        </p>
                                        <a href="${clientUrl}/reset-password?token=${token}&email=${email}&gmasstrack=false"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.rentexclusively.com</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`;

// todo: beautify and make it more relevant
const newUserPasswordCreateHtmlMessage = (passwordCreateUUID: string) => `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                          <a href="https://rentexclusively.com?gmasstrack=false" title="logo" target="_blank">
                            <img width="240" src="https://rentexclusively.com/_next/image?url=%2Flogo.png&w=640&q=75" title="logo" alt="logo">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Welcome to Rent Exclusively</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                          We have received your inquiry. You can create your password by clicking on the link below
                                        </p>
                                        <a href="${clientUrl}/set-password?token=${passwordCreateUUID}&gmasstrack=false"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Create
                                            Account</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>rentexclusively.com</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`;

const newEnquiryHtmlMessage = (enquiryID: string) => `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                          <a href="https://rentexclusively.com?gmasstrack=false" title="logo" target="_blank">
                            <img width="60" src="https://rentexclusively.com/_next/image?url=%2Flogo.png&w=640&q=75" title="logo" alt="logo">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Welcome to Rent Exclusively</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            New enquiry. Can be viewed by clicking the link below.
                                        </p>
                                        <a href="${baseUrl}/enquiries/${enquiryID}?gmasstrack=false"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Create
                                            Account</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>rentexclusively.com</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`;

const userNewListingsAdded = (data: {
  userName: string;
  agentName: string;
  listings: Listing[];
  beds?: number;
  baths?: number;
  location?: string[];
}) => {
  const { listings, beds, baths, location, userName, agentName } = data;
  const baseUrl = new URL("https://rentexclusively.com/apartments");
  location?.forEach((loc) => baseUrl.searchParams.append("areas", loc.trim()));
  isNotNullNorUndefined(beds) && baseUrl.searchParams.append("beds", beds.toString());
  isNotNullNorUndefined(baths) && baseUrl.searchParams.append("baths", baths.toString());

  const displayListings = listings.slice(0, listings.length - (listings.length % 2)).map((listing) => ({
    ...listing,
    urlSlug: makeUrl(`${listing.name}-${listing.id}`, { gmasstrack: false }),
    price: Number.isNaN(Number(listing.price)) ? "-- price unavailable --" : money(Number(listing.price))
  }));

  const template = Handlebars.compile(fs.readFileSync("email-templates/listing-email.hbs", "utf8"));
  const compiledHtml = template({ userName, agentName, listings: displayListings, baseUrl: baseUrl.toString() });
  // fs.writeFile("comp.html", compiledHtml, (err) => {
  //   if (err) console.log(err);
  //   else {
  //     console.log("File written successfully\n");
  //     console.log("The written has the following contents:");
  //   }
  // });
  return compiledHtml;
};
