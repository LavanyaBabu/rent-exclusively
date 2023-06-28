import { graphQLSchemaExtension } from "@keystone-6/core";
// import { main } from "../../scripts/upload_image_to_cloudinary";
import { nanoid } from "nanoid";
import type { FavoriteWhereInput, FavoriteOrderByInput, SearchOrderByInput, SearchWhereInput, Context } from ".keystone/types";
import { Listing, sendEmail } from "../../lib/email";
import { registerPropertyView, registerPropertySearch, getUsersFromPersonIds, registerWebhooks } from "../../external/followUpBoss";
import { prisma } from "../../db";

interface CreateEnquiryArgs {
  message?: string;
  apartmentId?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  preferredTime?: Date | string;
}

interface PromotionEmailInput {
  apartmentIds: string[];
  beds?: number;
  baths?: number;
  location?: string[];
  userIds: string[];
  priceFrom?: number;
  priceTo?: number;
}

export const extendGraphqlSchema = graphql.extend({
  typeDefs: `
    type Mutation {
      """ Sync cloudinary images """
      syncCloudinaryImages: Boolean

      """ Create Enquiry """
      createUserEnquiry(data: CreateEnquiryArgs): Enquiry

      """ User Create Password """
      userCreatePassword(passwordCreateUUID: String!, password: String!): User

      """ Assign Enquiry To Logged In User """
      assignEnquiryToUser(enquiryId: ID!): Enquiry

      """ Remove assigned Enquiry from Logged In User """
      removeEnquiryFromUser(enquiryId: ID!): Enquiry

      """ Update Apartment Images Order """
      updateImagesOrder(images: [ID!]!): Boolean

      """ Send Promotional Email """
      sendPromotionalEmail(data: PromotionEmailInput!): Boolean

      """ Follow Up Boss """
      registerPropertyViewed(apartmentId: ID!): Boolean
      registerPropertySearched(searchUrl: String!): Boolean
      followUpBossPeopleCreated(userIds: [String!]!): Boolean
      registerWebhooks: Boolean
    }

    type Query {
      """ Get Logged In Users Favorites """
      getMyFavorites(
        where: FavoriteWhereInput!={}
        orderBy: [FavoriteOrderByInput!]! = []
        take: Int
        skip: Int! = 0  
      ): [Favorite!]

      """ Get Logged In Users Searches """
        getMySearches(
          where: SearchWhereInput! = {}
          orderBy: [SearchOrderByInput!]! = []
          take: Int
          skip: Int! = 0
        ): [Search!]
      
      """ Get Logged In User's Assigned Enquiries """
        getMyAssignedEnquiries: [Enquiry!]

      """ Get All Unassigned Enquiries """
        getUnAssignedEnquiries: [Enquiry!]

    }

    input CreateEnquiryArgs {
      message: String
      apartmentId: ID
      firstName: String
      lastName: String
      email: String!
      phone: String
      preferredTime: DateTime
    }

    input PromotionEmailInput {
      apartmentIds: [ID!]!
      userIds: [ID!]!
      beds: Int
      baths: Int
      location: [String]
      priceFrom: Int
      priceTo: Int
    }
    `,
  resolvers: {
    Mutation: {
      syncCloudinaryImages: async () => {
        // await main();
        return true;
      },
      followUpBossPeopleCreated: async (_, { userIds: fubUserIds }: { userIds: string[] }, context: Context) => {
        const users = await context.prisma.user.findMany({
          where: {
            followUpBossId: {
              in: fubUserIds.map((id) => parseInt(id))
            }
          }
        });
        // create only the ones that don't exist
        // user map
        const userMap = users.reduce((acc, user) => {
          if (user.followUpBossId) acc[user.followUpBossId] = true;
          return acc;
        }, {} as Record<number, boolean>);

        fubUserIds = fubUserIds.filter((id) => !userMap[parseInt(id)]);

        // fetch people data from fub
        const people = await getUsersFromPersonIds(fubUserIds);
        // create users
        const userCreateData = people
          .filter((person) => !!person.emails?.length && !!person.emails?.[0].value)
          .map((person) => ({
            email: person.emails?.[0].value,
            firstName: person.firstName,
            lastName: person.lastName,
            followUpBossId: person.id,
            password: nanoid()
          }));

        const newUsers = await context.prisma.$transaction(
          userCreateData.map((user) => {
            return context.prisma.user.create({ data: user });
          })
        );

        for (const usr of newUsers) {
          // create password token
          const usrPwdCreateToken = await context.db.UserPasswordCreateToken.createOne({
            data: {
              token: nanoid(),
              userId: usr.id
            }
          });

          await sendEmail({
            to: usr.email,
            type: "newUserPasswordCreate",
            data: { passwordCreateUUID: usrPwdCreateToken.token }
          });
        }

        return true;
      },
      createUserEnquiry: async (
        root,
        { data: { message, apartmentId, firstName, lastName, email, phone, preferredTime } }: { data: CreateEnquiryArgs },
        context: Context
      ) => {
        const isLoggedIn = !!context.session?.itemId;

        if (isLoggedIn) {
          return await context.db.Enquiry.createOne({
            data: {
              apartment: apartmentId ? { connect: { id: apartmentId } } : undefined,
              message,
              user: { connect: { id: context.session.itemId } },
              preferredTime
            }
          });
        }

        if (!email) {
          throw new Error("Email is required");
        }

        const userExists = await context.db.User.findOne({ where: { email } });

        if (userExists) {
          return await context.db.Enquiry.createOne({
            data: {
              apartment: apartmentId ? { connect: { id: apartmentId } } : undefined,
              message,
              user: { connect: { id: `${userExists.id}` } },
              preferredTime
            }
          });
        }
        // create new user
        const newUser = await context.db.User.createOne({
          data: {
            email,
            firstName,
            lastName,
            phone,
            password: nanoid()
          }
        });

        const newEnq = await context.db.Enquiry.createOne({
          data: {
            apartment: apartmentId ? { connect: { id: apartmentId } } : undefined,
            message,
            user: { connect: { id: `${newUser.id}` } },
            preferredTime
          }
        });

        // create password token
        const usrPwdCreateToken = await context.db.UserPasswordCreateToken.createOne({
          data: {
            token: nanoid(),
            userId: newUser.id
          }
        });

        await sendEmail({
          to: email,
          type: "newUserPasswordCreate",
          data: { passwordCreateUUID: usrPwdCreateToken.token }
        });
        return newEnq;
      },
      userCreatePassword: async (
        _,
        { password, passwordCreateUUID }: { password: string; passwordCreateUUID: string },
        context: Context
      ) => {
        // get user from token
        const userPwdCreateToken = await context.db.UserPasswordCreateToken.findOne({
          where: { token: passwordCreateUUID }
        });
        if (!userPwdCreateToken) {
          throw new Error("Invalid token");
        }
        const user = await context.db.User.findOne({ where: { id: userPwdCreateToken.userId.toString() } });
        if (!user) {
          throw new Error("Invalid token");
        }

        // update user password
        return await context.sudo().db.User.updateOne({
          where: { id: user.id.toString() },
          data: { password }
        });
      },
      assignEnquiryToUser: async (_, { enquiryId }: { enquiryId: string }, context: Context) => {
        if (!context.session?.itemId) {
          throw new Error("You must be logged in to assign an enquiry");
        }
        // check if enquiry exists or already assigned
        const enquiry = await context.db.Enquiry.findOne({
          where: { id: enquiryId }
        });
        if (!enquiry) {
          throw new Error("Enquiry not found");
        }
        if (enquiry.assignedToId) {
          throw new Error("Enquiry already assigned");
        }
        // check if logged in user has role of agent
        const user = await context.query.User.findOne({
          where: { id: context.session.itemId },
          query: "role { id canManageLeads }"
        });
        if (!user) {
          throw new Error("User not found");
        }
        if (!user.role?.canManageLeads) {
          throw new Error("You do not have permission to assign an enquiry");
        }

        return await context.db.Enquiry.updateOne({
          where: { id: enquiryId },
          data: { assignedTo: { connect: { id: context.session.itemId } } }
        });
      },
      removeEnquiryFromUser: async (_, { enquiryId }: { enquiryId: string }, context: Context) => {
        if (!context.session?.itemId) {
          throw new Error("You must be logged in to remove an enquiry");
        }
        // check if enquiry exists or already assigned
        const enquiry = await context.db.Enquiry.findOne({
          where: { id: enquiryId }
        });
        if (!enquiry) {
          throw new Error("Enquiry not found");
        }
        if (!enquiry.assignedToId) {
          throw new Error("Enquiry not assigned");
        }
        // check if logged in user has role of agent
        const user = await context.query.User.findOne({
          where: { id: context.session.itemId },
          query: "role { id canManageLeads }"
        });
        if (!user) {
          throw new Error("User not found");
        }
        if (!user.role?.canManageLeads) {
          throw new Error("You do not have permission to remove an enquiry");
        }

        return await context.db.Enquiry.updateOne({
          where: { id: enquiryId },
          data: { assignedTo: { disconnect: true } }
        });
      },
      updateImagesOrder: async (_, { images }: { images: string[] }, context: Context) => {
        if (!context.session?.itemId) {
          throw new Error("You must be logged in to update apartment images order");
        }
        // check if logged in user has role of agent
        const user = await context.query.User.findOne({
          where: { id: context.session.itemId },
          query: "role { id canManageLeads }"
        });
        if (!user) {
          throw new Error("User not found");
        }
        if (!user.role?.canManageLeads) {
          throw new Error("You do not have permission to update apartment images order");
        }
        // update the image order based on the array of image ids
        // loop through all images
        for (let i = 0; i < images.length; i++) {
          await context.db.ApartmentImage.updateOne({
            where: { id: images[i] },
            data: { order: i }
          });
        }
        return true;
      },
      sendPromotionalEmail: async (
        _,
        { data: { apartmentIds, beds, baths, location, userIds, priceFrom, priceTo } }: { data: PromotionEmailInput },
        context: Context
      ) => {
        const apts = await context.prisma.apartment.findMany({
          where: {
            id: {
              in: apartmentIds.map((id) => Number(id))
            }
          },
          include: {
            images: {
              orderBy: {
                order: "asc"
              }
            },
            floorPlans: {
              include: {
                units: {}
              }
            }
          }
        });

        const users = await context.prisma.user.findMany({
          where: {
            id: {
              in: userIds.map((id) => Number(id))
            }
          }
        });

        if (users.length === 0) {
          throw new Error("No users found");
        }
        if (apts.length === 0) {
          throw new Error("No apartments found");
        }

        const listings: Listing[] = [];

        for (const apt of apts) {
          const minPrice = apt.floorPlans.reduce((acc, fp) => (fp.minPrice > 0 ? Math.min(acc, fp.minPrice) : acc), Infinity);
          const maxBeds = apt.floorPlans.reduce((acc, fp) => Math.max(acc, fp.bedrooms), 0);
          const maxBaths = apt.floorPlans.reduce((acc, fp) => Math.max(acc, fp.bathrooms), 0);

          if (!apt || !apt.name || !apt.area || !apt.images) continue;
          const listing: Listing = {
            id: apt.id,
            location: apt.area,
            name: apt.name,
            image:
              apt.images[0].url ??
              "https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/1674924[…]issing-image-mark-image-not-available-or-image-comin.jpg?ver=6",
            price: `${minPrice === Infinity ? "-- NA --" : `${minPrice}`}`,
            beds: beds ?? maxBeds,
            baths: baths ?? maxBaths
          };
          listings.push(listing);
        }
        if (listings.length === 0) {
          throw new Error("No listings found name, area, images");
        }

        // get logged in user
        const agent = await context.prisma.user.findUnique({ where: { id: Number(context.session.itemId) } });
        let fromName = "Rent Exclusively";
        if (agent) {
          fromName = agent.firstName;
        }

        for (const user of users) {
          sendEmail({
            to: user.email,
            toName: user.firstName,
            fromName,
            type: "newListingsAdded",
            data: { listings, beds, baths, location, minPrice: priceFrom, maxPrice: priceTo }
          });
        }
        return true;
      },
      registerPropertyViewed: async (_, { apartmentId }, context: Context) => {
        if (!context.session?.itemId) {
          throw new Error("User not logged in!");
        }
        const user = await context.prisma.user.findUnique({ where: { id: Number(context.session.itemId) } });
        if (!user) {
          throw new Error("User not found");
        }
        const apartment = await context.prisma.apartment.findUnique({ where: { id: Number(apartmentId) } });
        if (!apartment) {
          throw new Error("Apartment not found");
        }
        registerPropertyView(user, apartment);
        return true;
      },
      registerPropertySearched: async (_, { searchUrl }, context: Context) => {
        if (!context.session?.itemId) {
          throw new Error("User not logged in!");
        }
        // remove the question mark from the search url
        searchUrl = searchUrl.trim().replace("?", "");
        const user = await context.prisma.user.findUnique({ where: { id: Number(context.session.itemId) } });
        if (!user) {
          throw new Error("User not found");
        }
        const url = new URL("http://localhost:5000" + "?" + searchUrl); // hardcoding localhost as we just need the query params
        const { searchParams } = url;

        console.log({ searchParams });
        await registerPropertySearch(user, {
          country: searchParams.get("country") ?? "USA",
          state: searchParams.get("state") ?? "IL",
          city: searchParams.get("city") ?? "Chicago",
          maxBathrooms: Number(searchParams.get("baths")) ?? 0,
          minBathrooms: Number(searchParams.get("baths")) ?? 0,
          maxBedrooms: Number(searchParams.get("beds")) ?? 0,
          minBedrooms: Number(searchParams.get("beds")) ?? 0,
          neighborhood: searchParams.get("areas") ?? ""
        });
        return true;
      },
      registerWebhooks: async (_, __, context: Context) => {
        const isAdmin = !!context.session?.data?.role;
        if (!isAdmin) {
          throw new Error("You do not have permission to register webhooks");
        }
        await registerWebhooks();
        return true;
      }
    },
    Query: {
      getMyFavorites: async (
        root,
        { where, orderBy, take, skip = 0 }: { where: FavoriteWhereInput; orderBy: FavoriteOrderByInput[]; take: number; skip: number },
        context: Context
      ) => {
        const userId = context.session?.itemId;
        if (!userId) {
          return [];
        }
        where = {
          ...where,
          user: {
            id: {
              equals: userId
            }
          }
        };
        return await context.db.Favorite.findMany({
          where,
          orderBy,
          take,
          skip
        });
      },
      getMyAssignedEnquiries: async (root, {}, context: Context) => {
        const userId = context.session?.itemId;
        if (!userId) {
          return [];
        }
        return await context.db.Enquiry.findMany({
          where: {
            assignedTo: {
              id: {
                equals: userId
              }
            }
          }
        });
      },
      getUnAssignedEnquiries: async (root, {}, context: Context) => {
        const userId = context.session?.itemId;
        if (!userId) {
          return [];
        }
        return await context.prisma.enquiry.findMany({
          where: {
            assignedToId: {
              equals: null
            }
          }
        });
      },
      getMySearches: async (
        root,
        { where, orderBy, take, skip = 0 }: { where: SearchWhereInput; orderBy: SearchOrderByInput[]; take: number; skip: number },
        context: Context
      ) => {
        const userId = context.session?.itemId;
        if (!userId) {
          return [];
        }
        where = {
          ...where,
          user: {
            id: {
              equals: userId
            }
          }
        };
        return await context.db.Search.findMany({
          where,
          orderBy,
          take,
          skip
        });
      }
    }
  }
});

export const followUpBossRegisterUsers = async (fubUserIds: string[]) => {
  const users = await prisma.user.findMany({
    where: {
      followUpBossId: {
        in: fubUserIds.map((id) => parseInt(id))
      }
    }
  });
  // create only the ones that don't exist
  // user map
  const userMap = users.reduce((acc, user) => {
    if (user.followUpBossId) acc[user.followUpBossId] = true;
    return acc;
  }, {} as Record<number, boolean>);

  fubUserIds = fubUserIds.filter((id) => !userMap[parseInt(id)]);

  // fetch people data from fub
  const people = await getUsersFromPersonIds(fubUserIds);
  // create users
  const userCreateData = people
    .filter((person) => !!person.emails?.length && !!person.emails?.[0].value)
    .map((person) => ({
      email: person.emails?.[0].value,
      firstName: person.firstName,
      lastName: person.lastName,
      followUpBossId: person.id,
      password: nanoid()
    }));

  const newUsers = await prisma.$transaction(
    userCreateData.map((user) => {
      return prisma.user.create({ data: user });
    })
  );

  for (const usr of newUsers) {
    // create password token
    const usrPwdCreateToken = await prisma.userPasswordCreateToken.create({
      data: {
        token: nanoid(),
        userId: usr.id
      }
    });

    await sendEmail({
      to: usr.email,
      type: "newUserPasswordCreate",
      data: { passwordCreateUUID: usrPwdCreateToken.token }
    });
  }
};
