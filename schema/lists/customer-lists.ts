import { list } from "@keystone-6/core";
import { text, relationship, timestamp } from "@keystone-6/core/fields";
import { baseFields } from "../common";
import { permissions, rules } from "../permissions";
import { Context } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema";
import { googleSpreadSheetId } from "../../config";
import { getGoogleSheetsClient } from "../../external/google";
import { Enquiry as Enq } from "@prisma/client";
import { registerContactUsEnquiry, registerEnquiry } from "../../external/followUpBoss/index";

export const customerListAccess = {
  filter: {
    create: rules.canUserCreateEntity,
    update: permissions.canManageLeads,
    delete: permissions.canManageLeads
  }
};

export const customerUIConfig = {
  hideDelete: (context: any) => !permissions.canManageLeads(context),
  itemView: {
    defaultFieldMode: (context: any) => (permissions.canManageLeads(context) ? "edit" : "read")
  }
};

export const Enquiry = list({
  access: customerListAccess,
  ui: {
    ...customerUIConfig,
    listView: {
      initialColumns: ["user", "apartment", "message", "assignedTo", "preferredTime", "createdAt"],
      initialSort: { field: "createdAt", direction: "DESC" },
      pageSize: 50
    },
    label: "All Enquiries"
  },
  fields: {
    assignedTo: relationship({
      ref: "User.managedEnquiries",
      many: false,
      ui: {
        createView: {
          fieldMode: "hidden" // Do not change this as it will break the UI
        },
        description: "The agent assigned to this enquiry",
        views: require.resolve("../fields/enquiries/assignedTo.tsx")
      }
    }),
    message: text(),
    preferredTime: timestamp(),
    user: relationship({
      ref: "User.enquiries",
      many: false,

      ui: {
        itemView: {
          fieldMode: "read"
        }
      }
    }),
    apartment: relationship({
      ref: "Apartment.enquiries",
      many: false,
      isFilterable: true
    }),
    ...baseFields
  },
  hooks: {
    resolveInput: ({ resolvedData, context, operation }) => {
      if (operation === "create") {
        if (resolvedData.user) {
          return resolvedData;
        }
        // get logged in user id if user is not provided
        if (context.session && context.session.itemId && !Number.isNaN(Number(context.session.itemId))) {
          return {
            ...resolvedData,
            user: { connect: { id: Number(context.session.itemId) } }
          };
        }
      }
      return resolvedData;
    },
    // validateInput({ resolvedData, operation, addValidationError }) { // not checking as contact us form will now be used as an enquiry
    //   if (operation === "create") {
    //     if (!resolvedData.apartment && !resolvedData.apartmentId) {
    //       addValidationError("Apartment must be set on create");
    //     }
    //   } else if (operation === "update") {
    //     if (resolvedData.apartment || resolvedData.apartmentId) {
    //       addValidationError("Apartment cannot be changed on update");
    //     }
    //   }
    // },
    afterOperation: async ({ operation, item, context }) => {
      if (operation === "create") {
        const sClient = await getGoogleSheetsClient();

        const data = await (context as Context).prisma.enquiry.findUnique({
          where: {
            id: Number(item.id.toString())
          },
          select: {
            id: true,
            message: true,
            createdAt: true,
            apartment: {
              select: {
                name: true,
                area: true,
                website: true
              }
            },
            user: {
              select: {
                email: true,
                phone: true,
                firstName: true,
                lastName: true
              }
            }
          }
        });
        if (!data) {
          return;
        }
        // appending to google sheet
        sClient.spreadsheets.values
          .append({
            spreadsheetId: googleSpreadSheetId,
            range: "Sheet1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [
                [
                  data.id,
                  data.message,
                  data.createdAt,
                  data.apartment?.name || "",
                  data.apartment?.area || "",
                  data.apartment?.website || "",
                  data.user?.email || "",
                  data.user?.phone || "",
                  data.user?.firstName || "" + data.user?.lastName || ""
                ]
              ]
            }
          })
          .then(() => console.log("Successfully appended to google sheet"))
          .catch((err) => console.log("Error appending to google sheet", err));

        // call registerEnquiry after creation
        try {
          const enq = item as Enq;
          // get user details
          const user = await (context as Context).prisma.user.findFirst({ where: { id: Number(enq.userId) } });
          if (!user) {
            throw new Error("User not found");
          }
          // get apartment details
          const apartment = await (context as Context).prisma.apartment.findFirst({ where: { id: Number(enq.apartmentId) } });
          if (!apartment) {
            // contact us form
            return await registerContactUsEnquiry(enq, user);
          }
          // register enquiry
          await registerEnquiry(enq, user, apartment);
        } catch (error) {
          console.error(error);
          return;
        }

        // sending email to all agents
        // const agents = await context.db.User.findMany({
        //   where: {
        //     role: {
        //       name: {
        //         equals: "Agent",
        //         mode: "insensitive"
        //       }
        //     }
        //   }
        // });
        // await Promise.all(
        //   agents.map(async (agent: any) => {
        //     await sendEmail({ data: { enquiryID: item.id.toString() }, to: agent.email, type: "newUserEnquiry" });
        //   })
        // );
      }
    }
  }
});
