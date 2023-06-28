import { checkbox, integer, password, relationship, text, timestamp, virtual } from "@keystone-6/core/fields";
import { list, graphql } from "@keystone-6/core";
import { baseFields } from "../common";
import { BaseItem } from "@keystone-6/core/types";
import { permissions, rules } from "../permissions";
import { isEmpty, isNullOrUndefined } from "../../utils/bool";
import { registerSavedPropertySearch, registerUser } from "../../external/followUpBoss";
import { User as Usr } from "@prisma/client";
import { registerFavorite } from "../../external/followUpBoss/index";
import { Context } from ".keystone/types";
import { Favorite as Fav, Search as Srch } from "@prisma/client";

//TODO: add role validation to ensure that only admins can create admins

const fieldModes = {
  editSelfOrRead: ({ session, item }: any) => (permissions.canManageUsers({ session }) || session.itemId === item.id ? "edit" : "read"),
  editSelfOrHidden: ({ session, item }: any) => (permissions.canManageUsers({ session }) || session.itemId === item.id ? "edit" : "hidden")
};

export const User = list({
  access: {
    filter: {
      update: rules.canManageUserList,
      delete: rules.canManageUserList
    }
  },
  hooks: {
    resolveInput: async ({ resolvedData, operation }) => {
      if (operation === "create") {
        const usr = resolvedData as Usr;
        if (!usr.roleId && isNullOrUndefined(usr.followUpBossId)) {
          // only create if no role is set, i.e. non-admin user
          const data = await registerUser(usr);
          if (data && data.id) {
            return {
              ...resolvedData,
              followUpBossId: data.id
            };
          }
        }
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    }
  },
  fields: {
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true,
      label: "Email",
      ui: {
        itemView: {
          fieldMode: () => "read"
        }
      }
    }),
    firstName: text({ validation: { isRequired: true } }),
    lastName: text(),
    fullName: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve: (item) => `${(item as BaseItem).firstName} ${(item as BaseItem).lastName}`
      })
    }),
    phone: text(),
    password: password({
      ui: {
        listView: {
          fieldMode: "hidden"
        }
      },
      validation: {
        length: { min: 8 }
      },
      db: {
        isNullable: false
      }
    }),
    followUpBossId: integer(),
    role: relationship({
      ref: "Role.users"
      // access: permissions.canManageUsers
    }),
    enquiries: relationship({
      ref: "Enquiry.user",
      many: true,
      ui: {
        // labelField: "name",
        // hideCreate: true,
        cardFields: ["apartment", "createdAt"],
        displayMode: "cards",
        linkToItem: true,
        inlineCreate: { fields: ["apartment", "message", "user"] }
      },
      isFilterable: true,
      isOrderable: true
    }),
    managedEnquiries: relationship({
      ref: "Enquiry.assignedTo",
      many: true,
      ui: {
        itemView: {
          fieldMode: "hidden"
        },
        listView: {
          fieldMode: "hidden"
        },
        createView: {
          fieldMode: "hidden"
        }
      },
      isFilterable: true,
      isOrderable: true
    }),
    favorites: relationship({
      ref: "Favorite.user",
      many: true,
      ui: {
        createView: {
          fieldMode: "hidden"
        },
        views: require.resolve("../fields/users/favorites.tsx")
      }
    }),
    searches: relationship({
      ref: "Search.user",
      many: true,
      ui: {
        cardFields: ["name", "displayName"],
        displayMode: "cards",
        linkToItem: true
      }
    }),
    ...baseFields
  },
  ui: {
    hideCreate: (context) => !permissions.canManageUsers(context),
    hideDelete: (context) => !permissions.canManageUsers(context),
    itemView: {
      defaultFieldMode: fieldModes.editSelfOrRead
    },
    listView: {
      initialColumns: ["email", "firstName", "lastName", "phone", "role"],
      pageSize: 25,
      initialSort: { field: "createdAt", direction: "DESC" },
      defaultFieldMode: (context) => (rules.canViewUserList(context) ? "read" : "hidden")
    },
    searchFields: ["email", "firstName", "lastName", "phone"],
    labelField: "fullName"
  }
});

export const UserPasswordCreateToken = list({
  access: {
    filter: {
      delete: permissions.canManageUsers,
      query: permissions.canManageUsers,
      update: permissions.canManageUsers
    }
  },
  ui: {
    label: "User Password Create Tokens",
    description: "Tokens used to uniquely indentify newly created users through enquiry",
    isHidden: true
  },
  fields: {
    token: text({
      db: {
        isNullable: false
      },
      validation: {
        isRequired: true
      },
      isIndexed: "unique"
    }),
    userId: integer({
      db: {
        isNullable: false
      },
      validation: {
        isRequired: true
      }
    }),
    redeemedAt: timestamp({
      db: {
        isNullable: true
      }
    }),
    ...baseFields
  }
});

export const Favorite = list({
  ui: {
    listView: {
      initialColumns: ["user", "apartment"]
    },
    itemView: {
      defaultFieldMode: "read"
    }
  },
  access: {
    operation: {
      create: rules.canUserCreateEntity
    },
    filter: {
      query: rules.canViewUserList,
      update: rules.canManageUserEntity,
      delete: rules.canManageUserEntity
    }
  },
  hooks: {
    afterOperation: async ({ operation, context, item }) => {
      // call registerEnquiry after creation
      if (operation === "create") {
        try {
          const fav = item as Fav;
          // get apartment details
          const apartment = await (context as Context).prisma.apartment.findFirst({ where: { id: Number(fav.apartmentId) } });
          if (!apartment) {
            throw new Error("Apartment not found");
          }
          // get user details
          const user = await (context as Context).prisma.user.findFirst({ where: { id: Number(fav.userId) } });
          if (!user) {
            throw new Error("User not found");
          }
          // register enquiry
          await registerFavorite(user, apartment);
        } catch (error) {
          console.error(error);
          return;
        }
      }
    }
  },
  fields: {
    user: relationship({
      ref: "User.favorites",
      hooks: {
        resolveInput({ operation, resolvedData, context }) {
          // Default to the currently logged in user on create.
          if (operation === "create" && isEmpty(resolvedData.user) && !Number.isNaN(Number(context.session?.itemId))) {
            return { connect: { id: Number(context.session?.itemId) } };
          }
          return resolvedData.user;
        }
      }
    }),
    apartment: relationship({
      ref: "Apartment.favorites"
    }),
    ...baseFields
  }
});

export const Search = list({
  fields: {
    name: text({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    url: text({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    displayName: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve: (item) => {
          const url = new URL("http://localhost:5000" + (item as BaseItem).url); // hardcoding localhost as we just need the query params
          const { searchParams } = url;

          const displayNames = [];

          if (searchParams.has("areas")) {
            displayNames.push(searchParams.get("areas"));
          }
          if (searchParams.has("beds")) {
            displayNames.push(`${searchParams.get("beds")} beds`);
          }
          if (searchParams.has("baths")) {
            displayNames.push(`${searchParams.get("baths")} baths`);
          }

          return displayNames.join(" ● ");
        }
      }),
      label: "Details"
    }),
    user: relationship({
      ref: "User.searches",
      hooks: {
        resolveInput({ operation, resolvedData, context }) {
          // Default to the currently logged in user on create.
          if (operation === "create" && isEmpty(resolvedData.user) && !Number.isNaN(Number(context.session?.itemId))) {
            return { connect: { id: Number(context.session?.itemId) } };
          }
          return resolvedData.user;
        }
      }
    }),
    ...baseFields
  },
  ui: {
    itemView: {
      defaultFieldMode: "read"
    }
  },
  access: {
    operation: {
      create: rules.canUserCreateEntity
    },
    filter: {
      query: rules.canViewUserList,
      update: rules.canManageUserEntity,
      delete: rules.canManageUserEntity
    }
  },
  hooks: {
    afterOperation: async ({ operation, context, item }) => {
      // call registerEnquiry after creation
      if (operation === "create") {
        try {
          const srch = item as Srch;
          // get user details
          const user = await (context as Context).prisma.user.findFirst({ where: { id: Number(srch.userId) } });
          if (!user) {
            throw new Error("User not found");
          }
          const url = new URL("http://localhost:5000" + (item as BaseItem).url); // hardcoding localhost as we just need the query params
          const { searchParams } = url;

          // register enquiry
          await registerSavedPropertySearch(user, {
            country: searchParams.get("country") ?? "USA",
            state: searchParams.get("state") ?? "IL",
            city: searchParams.get("city") ?? "Chicago",
            maxBathrooms: Number(searchParams.get("baths")) ?? 0,
            minBathrooms: Number(searchParams.get("baths")) ?? 0,
            maxBedrooms: Number(searchParams.get("beds")) ?? 0,
            minBedrooms: Number(searchParams.get("beds")) ?? 0,
            neighborhood: searchParams.get("areas") ?? ""
          });
        } catch (error) {
          console.error(error);
          return;
        }
      }
    }
  }
});

export const Role = list({
  access: {
    filter: {
      delete: permissions.canManageUsers,
      query: permissions.canManageUsers,
      update: permissions.canManageUsers
    },
    operation: {
      create: permissions.canManageUsers
    }
  },
  ui: {
    isHidden: (context) => !permissions.canManageUsers(context),
    listView: {
      initialColumns: ["name", "canManageContent", "canManageUsers", "canManageLeads"]
    },
    createView: {
      defaultFieldMode: ({ session }: any) => (permissions.canManageUsers({ session }) ? "edit" : "hidden")
    }
  },
  fields: {
    name: text({
      isIndexed: "unique"
    }),
    canManageContent: checkbox({
      defaultValue: false,
      ui: {
        description: "Permission to manage apartment, images, units, floor plans and amenities"
      }
    }),
    canManageUsers: checkbox({
      defaultValue: false,
      ui: {
        description: "Permission to manage users, roles, user favorites and user searches"
      }
    }),
    canManageLeads: checkbox({
      defaultValue: false,
      ui: {
        description: "Permission to manage user enquiries and contact form submissions"
      }
    }),
    users: relationship({ ref: "User.role", many: true }),
    ...baseFields
  }
});
