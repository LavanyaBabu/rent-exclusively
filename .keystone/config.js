"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core6 = require("@keystone-6/core");

// schema/lists/user-lists.ts
var import_fields2 = require("@keystone-6/core/fields");
var import_core = require("@keystone-6/core");

// schema/common.ts
var import_fields = require("@keystone-6/core/fields");
var hideField = {
  ui: {
    createView: {
      fieldMode: "hidden"
    },
    itemView: {
      fieldMode: "hidden"
    },
    listView: {
      fieldMode: "hidden"
    }
  }
};
var baseFields = {
  createdAt: (0, import_fields.timestamp)({
    defaultValue: { kind: "now" },
    validation: { isRequired: true },
    ui: {
      createView: {
        fieldMode: "hidden"
      },
      itemView: {
        fieldMode: "read"
      },
      listView: {
        fieldMode: "read"
      }
    },
    db: {
      isNullable: false
    }
    // ...hideField
  }),
  updatedAt: (0, import_fields.timestamp)({
    validation: { isRequired: true },
    defaultValue: { kind: "now" },
    db: {
      updatedAt: true,
      isNullable: false
    },
    ui: {
      createView: {
        fieldMode: "hidden"
      },
      itemView: {
        fieldMode: "read"
      },
      listView: {
        fieldMode: "read"
      }
    }
    // ...hideField
  })
};

// schema/permissions.ts
var isSignedIn = ({ session: session2 }) => {
  return !!session2;
};
var permissions = {
  canManageContent: ({ session: session2 }) => {
    return !!session2?.data.role?.canManageContent;
  },
  canManageUsers: ({ session: session2 }) => {
    return !!session2?.data.role?.canManageUsers;
  },
  canManageLeads: ({ session: session2 }) => {
    return !!session2?.data.role?.canManageLeads;
  }
};
var rules = {
  canUseAdminUI: ({ session: session2 }) => {
    return !!session2?.data.role;
  },
  canManageUser: ({ session: session2, item }) => {
    if (permissions.canManageUsers({ session: session2 }))
      return true;
    if (session2?.itemId === item.id)
      return true;
    return false;
  },
  canManageUserList: ({ session: session2 }) => {
    if (!isSignedIn({ session: session2 }))
      return false;
    if (permissions.canManageUsers({ session: session2 }))
      return true;
    return { where: { id: { equals: session2?.itemId } } };
  },
  canManageLeads: ({ session: session2 }) => {
    if (!isSignedIn({ session: session2 }))
      return false;
    if (permissions.canManageLeads({ session: session2 }))
      return true;
    return { where: { id: { equals: session2?.itemId } } };
  },
  canViewUserList: ({ session: session2 }) => {
    if (permissions.canManageUsers({ session: session2 }) || permissions.canManageLeads({ session: session2 }))
      return true;
    return false;
  },
  canManageUserEntity: ({ session: session2 }) => {
    if (!isSignedIn({ session: session2 }))
      return false;
    if (permissions.canManageUsers({ session: session2 }))
      return true;
    return {
      user: {
        id: {
          equals: session2?.itemId
        }
      }
    };
  },
  canUserCreateEntity: ({ session: session2 }) => {
    if (!isSignedIn({ session: session2 }))
      return false;
    return true;
  },
  canUserUpdateCustomer: ({ session: session2 }) => {
    if (!isSignedIn({ session: session2 }))
      return false;
    if (permissions.canManageLeads({ session: session2 }))
      return true;
    return {
      id: {
        equals: session2?.itemId
      }
    };
  }
};

// utils/bool.ts
function isNotNullNorUndefined(value) {
  return value !== void 0 && value !== null;
}
function isNullOrUndefined(value) {
  return value === void 0 || value === null;
}
function isEmpty(value) {
  if (isNullOrUndefined(value)) {
    return true;
  }
  if (Array.isArray(value) || typeof value === "string" || value instanceof String) {
    return value.length === 0;
  }
  if (typeof value === "number" || value instanceof Number) {
    return false;
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }
  return Object.keys(value).length === 0;
}

// external/followUpBoss/index.ts
var import_axios = __toESM(require("axios"));
var EVENTS_URL = "https://api.followupboss.com/v1/events";
var PEOPLE_URL = "https://api.followupboss.com/v1/people";
var WEBHOOKS_URL = "https://api.followupboss.com/v1/webhooks";
var API_KEY = "fka_0fGcew81yUWBHykqq3Py8W4Xwkx9GkqELq";
var getPersonFromUser = (user) => {
  return {
    contacted: false,
    emails: [
      {
        isPrimary: true,
        value: user.email,
        type: "work"
      }
    ],
    phones: [
      {
        isPrimary: true,
        value: user.phone,
        type: "work"
      }
    ],
    tags: ["RentExclusively"],
    firstName: user.firstName,
    lastName: user.lastName,
    source: "rentexclusively.com",
    sourceUrl: "https://admin.rentexclusively.com/users/" + user.id,
    stage: "Lead",
    id: user.followUpBossId
  };
};
var getUsersFromPersonIds = async (ids) => {
  try {
    const people = await import_axios.default.get(PEOPLE_URL + "?id=" + ids.join(","), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(API_KEY + ":").toString("base64")
      }
    });
    return people.data.people;
  } catch (error) {
    console.error(error);
    return [];
  }
};
var getPropertyFromApartment = (apartment) => {
  return {
    street: apartment.street,
    city: apartment.city,
    state: apartment.state,
    code: apartment.zip,
    country: "USA",
    url: "https://rentexclusively.com/apartments/" + apartment.id,
    type: "Apartment"
  };
};
var registerUser = async (user) => {
  const payload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Registration",
    message: "New user registration",
    description: "New user registration",
    person: getPersonFromUser(user)
  };
  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering user in follow up boss");
    console.error(error);
    return null;
  }
};
var registerContactUsEnquiry = async (enq, user) => {
  const payload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "General Inquiry",
    message: enq.message,
    description: "User contact us enquiry",
    person: getPersonFromUser(user)
  };
  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering enquiry in follow up boss");
    console.error(error);
    return null;
  }
};
var registerEnquiry = async (enq, user, apartment) => {
  const payload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Property Inquiry",
    message: enq.message,
    description: "User enquiry",
    person: getPersonFromUser(user),
    property: getPropertyFromApartment(apartment)
  };
  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering enquiry in follow up boss");
    console.error(error);
    return null;
  }
};
var registerFavorite = async (user, apartment) => {
  const payload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Saved Property",
    message: "User favorited property",
    description: "User favorited property",
    person: getPersonFromUser(user),
    property: getPropertyFromApartment(apartment)
  };
  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering favorite in follow up boss");
    console.error(error);
    return null;
  }
};
var registerSavedPropertySearch = async (user, search) => {
  const payload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Saved Property Search",
    message: "User saved property search",
    description: "User saved property search",
    person: getPersonFromUser(user),
    propertySearch: search
  };
  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering property search in follow up boss");
    console.error(error);
    return null;
  }
};
var registerPropertyView = async (user, apartment) => {
  const payload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Viewed Property",
    message: "User viewed property",
    description: "User viewed property",
    person: getPersonFromUser(user),
    property: getPropertyFromApartment(apartment)
  };
  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering favorite in follow up boss");
    console.error(error);
    return null;
  }
};
var registerPropertySearch = async (user, search) => {
  const payload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Property Search",
    message: "User Property Search",
    description: "User Property Search",
    person: getPersonFromUser(user),
    propertySearch: search
  };
  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering property search in follow up boss");
    console.error(error);
    return null;
  }
};
var createEvent = async (payload) => {
  const res = await import_axios.default.post(EVENTS_URL, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(API_KEY + ":").toString("base64")
    }
  });
  return res.data;
};
var registerWebhooks = async () => {
  try {
    const payload = {
      event: "peopleCreated",
      url: "https://admin.rentexclusively.com/api/callbacks/fub/peopleCreated"
    };
    let res = await import_axios.default.get(WEBHOOKS_URL + "?system=RentExclusively", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(API_KEY + ":").toString("base64"),
        "X-System-Key": "ed08882d6b153a0d900e9dc9cde25830"
      }
    });
    const existingWebhooks = res.data?.webhooks ?? [];
    const webhookExists = existingWebhooks.find(
      (webhook) => webhook.url === payload.url && webhook.event === payload.event && webhook.status === "Active"
    );
    if (webhookExists) {
      console.log("Webhook already exists");
      return;
    }
    res = await import_axios.default.post(WEBHOOKS_URL + "?system=RentExclusively", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(API_KEY + ":").toString("base64"),
        "X-System-Key": "ed08882d6b153a0d900e9dc9cde25830"
      }
    });
    return res.data;
  } catch (error) {
    console.error("Errored out while registering webhooks in follow up boss");
    console.error(error);
    return null;
  }
};

// schema/lists/user-lists.ts
var fieldModes = {
  editSelfOrRead: ({ session: session2, item }) => permissions.canManageUsers({ session: session2 }) || session2.itemId === item.id ? "edit" : "read",
  editSelfOrHidden: ({ session: session2, item }) => permissions.canManageUsers({ session: session2 }) || session2.itemId === item.id ? "edit" : "hidden"
};
var User = (0, import_core.list)({
  access: {
    filter: {
      update: rules.canManageUserList,
      delete: rules.canManageUserList
    }
  },
  hooks: {
    resolveInput: async ({ resolvedData, operation }) => {
      if (operation === "create") {
        const usr = resolvedData;
        if (!usr.roleId && isNullOrUndefined(usr.followUpBossId)) {
          const data = await registerUser(usr);
          if (data && data.id) {
            return {
              ...resolvedData,
              followUpBossId: data.id
            };
          }
        }
      }
      return resolvedData;
    }
  },
  fields: {
    email: (0, import_fields2.text)({
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
    firstName: (0, import_fields2.text)({ validation: { isRequired: true } }),
    lastName: (0, import_fields2.text)(),
    fullName: (0, import_fields2.virtual)({
      field: import_core.graphql.field({
        type: import_core.graphql.String,
        resolve: (item) => `${item.firstName} ${item.lastName}`
      })
    }),
    phone: (0, import_fields2.text)(),
    password: (0, import_fields2.password)({
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
    followUpBossId: (0, import_fields2.integer)(),
    role: (0, import_fields2.relationship)({
      ref: "Role.users"
      // access: permissions.canManageUsers
    }),
    enquiries: (0, import_fields2.relationship)({
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
    managedEnquiries: (0, import_fields2.relationship)({
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
    favorites: (0, import_fields2.relationship)({
      ref: "Favorite.user",
      many: true,
      ui: {
        createView: {
          fieldMode: "hidden"
        },
        views: require.resolve("../fields/users/favorites.tsx")
      }
    }),
    searches: (0, import_fields2.relationship)({
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
      defaultFieldMode: (context) => rules.canViewUserList(context) ? "read" : "hidden"
    },
    searchFields: ["email", "firstName", "lastName", "phone"],
    labelField: "fullName"
  }
});
var UserPasswordCreateToken = (0, import_core.list)({
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
    token: (0, import_fields2.text)({
      db: {
        isNullable: false
      },
      validation: {
        isRequired: true
      },
      isIndexed: "unique"
    }),
    userId: (0, import_fields2.integer)({
      db: {
        isNullable: false
      },
      validation: {
        isRequired: true
      }
    }),
    redeemedAt: (0, import_fields2.timestamp)({
      db: {
        isNullable: true
      }
    }),
    ...baseFields
  }
});
var Favorite = (0, import_core.list)({
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
      if (operation === "create") {
        try {
          const fav = item;
          const apartment = await context.prisma.apartment.findFirst({ where: { id: Number(fav.apartmentId) } });
          if (!apartment) {
            throw new Error("Apartment not found");
          }
          const user = await context.prisma.user.findFirst({ where: { id: Number(fav.userId) } });
          if (!user) {
            throw new Error("User not found");
          }
          await registerFavorite(user, apartment);
        } catch (error) {
          console.error(error);
          return;
        }
      }
    }
  },
  fields: {
    user: (0, import_fields2.relationship)({
      ref: "User.favorites",
      hooks: {
        resolveInput({ operation, resolvedData, context }) {
          if (operation === "create" && isEmpty(resolvedData.user) && !Number.isNaN(Number(context.session?.itemId))) {
            return { connect: { id: Number(context.session?.itemId) } };
          }
          return resolvedData.user;
        }
      }
    }),
    apartment: (0, import_fields2.relationship)({
      ref: "Apartment.favorites"
    }),
    ...baseFields
  }
});
var Search = (0, import_core.list)({
  fields: {
    name: (0, import_fields2.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    url: (0, import_fields2.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    displayName: (0, import_fields2.virtual)({
      field: import_core.graphql.field({
        type: import_core.graphql.String,
        resolve: (item) => {
          const url = new URL("http://localhost:5000" + item.url);
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
          return displayNames.join(" \u25CF ");
        }
      }),
      label: "Details"
    }),
    user: (0, import_fields2.relationship)({
      ref: "User.searches",
      hooks: {
        resolveInput({ operation, resolvedData, context }) {
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
      if (operation === "create") {
        try {
          const srch = item;
          const user = await context.prisma.user.findFirst({ where: { id: Number(srch.userId) } });
          if (!user) {
            throw new Error("User not found");
          }
          const url = new URL("http://localhost:5000" + item.url);
          const { searchParams } = url;
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
var Role = (0, import_core.list)({
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
      defaultFieldMode: ({ session: session2 }) => permissions.canManageUsers({ session: session2 }) ? "edit" : "hidden"
    }
  },
  fields: {
    name: (0, import_fields2.text)({
      isIndexed: "unique"
    }),
    canManageContent: (0, import_fields2.checkbox)({
      defaultValue: false,
      ui: {
        description: "Permission to manage apartment, images, units, floor plans and amenities"
      }
    }),
    canManageUsers: (0, import_fields2.checkbox)({
      defaultValue: false,
      ui: {
        description: "Permission to manage users, roles, user favorites and user searches"
      }
    }),
    canManageLeads: (0, import_fields2.checkbox)({
      defaultValue: false,
      ui: {
        description: "Permission to manage user enquiries and contact form submissions"
      }
    }),
    users: (0, import_fields2.relationship)({ ref: "User.role", many: true }),
    ...baseFields
  }
});

// schema/lists/rentals.ts
var import_core2 = require("@keystone-6/core");
var import_fields3 = require("@keystone-6/core/fields");
var Rental = (0, import_core2.list)({
  defaultIsFilterable: () => true,
  fields: {
    MLSId: (0, import_fields3.text)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    rentPrice: (0, import_fields3.decimal)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    remarks: (0, import_fields3.text)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    // virtualTourLinks: string[], //todo
    address: (0, import_fields3.text)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    status: (0, import_fields3.select)({
      validation: {
        isRequired: true
      },
      isFilterable: true,
      db: {
        isNullable: false
      },
      options: [
        { label: "ACTV", value: "ACTV" },
        { label: "AUCT", value: "AUCT" },
        { label: "BOMK", value: "BOMK" },
        { label: "CTG", value: "CTG" },
        { label: "NEW", value: "NEW" },
        { label: "PCHG", value: "PCHG" },
        { label: "RACT", value: "RACT" },
        { label: "TEMP", value: "TEMP" },
        { label: "PRIV_ACTV", value: "PRIV_ACTV" },
        { label: "PRIV_CTG", value: "PRIV_CTG" },
        { label: "CANC", value: "CANC" },
        { label: "CLSD", value: "CLSD" },
        { label: "EXP", value: "EXP" },
        { label: "PEND", value: "PEND" },
        { label: "RNTD", value: "RNTD" },
        { label: "PRIV_PEND", value: "PRIV_PEND" },
        { label: "PRIV_EXP", value: "PRIV_EXP" },
        { label: "PRIV_CANC", value: "PRIV_CANC" }
      ],
      type: "enum"
    }),
    bedrooms: (0, import_fields3.integer)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true,
      defaultValue: 0
    }),
    bathrooms: (0, import_fields3.integer)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true,
      defaultValue: 0
    }),
    appxSf: (0, import_fields3.text)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    spaces: (0, import_fields3.text)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    parkingIncluded: (0, import_fields3.checkbox)({
      isFilterable: true,
      defaultValue: false
    }),
    yearBuilt: (0, import_fields3.integer)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    exposure: (0, import_fields3.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    airConditioned: (0, import_fields3.checkbox)({
      isFilterable: true,
      defaultValue: false
    }),
    heating: (0, import_fields3.checkbox)({
      isFilterable: true,
      defaultValue: false
    }),
    parkingFee: (0, import_fields3.integer)({
      validation: {
        isRequired: true
      },
      isFilterable: true,
      db: {
        isNullable: false
      },
      defaultValue: 0
    }),
    // laundryFeatures, todo string[]
    garageOwnership: (0, import_fields3.checkbox)({
      isFilterable: true,
      defaultValue: false
    }),
    garageOnSite: (0, import_fields3.checkbox)({
      isFilterable: true,
      defaultValue: false
    }),
    garageType: (0, import_fields3.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    // amenities            String[] todo
    availableAsOf: (0, import_fields3.timestamp)(),
    listDate: (0, import_fields3.timestamp)(),
    mktTime: (0, import_fields3.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    feesNApprovals: (0, import_fields3.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    monthlyRentIncl: (0, import_fields3.checkbox)({
      isFilterable: true,
      defaultValue: false
    }),
    shortTermLease: (0, import_fields3.checkbox)({
      isFilterable: true,
      defaultValue: false
    }),
    availFurnished: (0, import_fields3.checkbox)({
      isFilterable: true,
      defaultValue: false
    }),
    petsAllowed: (0, import_fields3.checkbox)({
      isFilterable: true,
      defaultValue: false
    }),
    maxPetWeight: (0, import_fields3.decimal)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    elementarySchool: (0, import_fields3.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    juniorHigh: (0, import_fields3.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    highSchool: (0, import_fields3.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    coopComp: (0, import_fields3.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    broker: (0, import_fields3.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    listBroker: (0, import_fields3.text)({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    // brokerPrivateRemarks String[] todo
    // Images               String[] todo
    // favorites: relationship({
    //   ref: "Favorite.rental",
    //   many: true,
    // }),
    ...baseFields
  },
  ui: {
    isHidden: true
  }
});

// schema/lists/content-lists.ts
var import_core3 = require("@keystone-6/core");
var import_fields4 = require("@keystone-6/core/fields");
var import_cloudinary = require("@keystone-6/cloudinary");

// config.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var baseUrl = process.env.SERVER_URL || "http://localhost:3000";
var port = process.env.PORT ? Number(process.env.PORT) : 3e3;
var db = {
  provider: "postgresql",
  url: process.env.DATABASE_URL || "postgresql://pgadmin:password@localhost:5432/us_real_estate",
  useMigrations: true,
  idField: { kind: "autoincrement" },
  enableLogging: process.env.ENABLE_DB_LOGGING == "true",
  additionalPrismaDatasourceProperties: {}
};
var sessionSecret = process.env.SESSION_SECRET || "9z$C&F_J@McQfTjW9z$C&F_J@McQfTjW";
var nodeEnv = process.env.NODE_ENV || "development";
var googleSpreadSheetId = process.env.GOOGLE_SPREADSHEET_ID || "1pH2oxk50I3D0X9ReRSKHbI5FhGjsZBJ2f0HF7UHoFMU";
var cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  folder: process.env.CLOUDINARY_FOLDER
};
var clientUrl = process.env.CLIENT_URL;
var adminEmail = process.env.ADMIN_EMAIL;
var GMass = {
  apiKey: process.env.GMASS_API_KEY,
  fromEmail: process.env.GMASS_FROM_EMAIL,
  fromName: process.env.GMASS_FROM_NAME
};

// schema/lists/content-lists.ts
var contentListAccess = {
  filter: {
    create: permissions.canManageContent,
    update: permissions.canManageContent,
    delete: permissions.canManageContent
  }
};
var contentUIConfig = {
  hideCreate: (context) => !permissions.canManageContent(context),
  hideDelete: (context) => !permissions.canManageContent(context),
  itemView: {
    defaultFieldMode: (context) => permissions.canManageContent(context) ? "edit" : "read"
  }
};
var Apartment = (0, import_core3.list)({
  access: contentListAccess,
  ui: {
    ...contentUIConfig,
    listView: {
      initialColumns: ["name", "propertyType", "website", "area", "floorPlans"],
      initialSort: { field: "name", direction: "ASC" },
      pageSize: 25
    },
    labelField: "name",
    label: "Properties",
    searchFields: ["name", "propertyType", "website", "area"]
  },
  fields: {
    name: (0, import_fields4.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    propertyType: (0, import_fields4.select)({
      options: [
        { label: "Apartment", value: "apartment" },
        { label: "Rentals", value: "rental" }
      ],
      defaultValue: "apartment"
    }),
    sourceId: (0, import_fields4.text)(),
    bedrooms: (0, import_fields4.integer)({
      label: "Bedrooms count for rentals/condos"
    }),
    bathrooms: (0, import_fields4.integer)({
      label: "Bathrooms count for rentals/condos"
    }),
    listAgentEmail: (0, import_fields4.text)(),
    listAgentName: (0, import_fields4.text)(),
    listAgentMobile: (0, import_fields4.text)(),
    daysOnMarket: (0, import_fields4.integer)(),
    listPrice: (0, import_fields4.float)(),
    roomsCount: (0, import_fields4.integer)({
      label: "Rooms count for rentals/condos"
    }),
    description: (0, import_fields4.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    commision: (0, import_fields4.float)(),
    pool: (0, import_fields4.checkbox)({
      defaultValue: false,
      ui: {
        description: "Does this apartment have a pool?"
      }
    }),
    petFriendly: (0, import_fields4.checkbox)({
      defaultValue: false,
      ui: {
        description: "Is this apartment pet friendly?"
      }
    }),
    website: (0, import_fields4.text)({
      validation: { isRequired: true },
      isIndexed: "unique",
      ui: {
        itemView: {
          fieldMode: () => "read"
        }
      }
    }),
    apartmentListUrl: (0, import_fields4.text)({
      ...hideField
    }),
    zillowUrl: (0, import_fields4.text)({
      ...hideField
    }),
    primaryScraper: (0, import_fields4.select)({
      options: [
        { label: "Apartment List", value: "apartmentList" },
        { label: "Zillow", value: "zillow" }
      ],
      defaultValue: "apartmentList",
      type: "enum",
      db: {
        isNullable: false
      },
      ...hideField
    }),
    street: (0, import_fields4.text)(),
    neighborhood: (0, import_fields4.text)(),
    area: (0, import_fields4.text)({ validation: { isRequired: true } }),
    city: (0, import_fields4.text)(),
    state: (0, import_fields4.text)(),
    zip: (0, import_fields4.text)(),
    country: (0, import_fields4.text)(),
    phone: (0, import_fields4.text)(),
    email: (0, import_fields4.text)(),
    contactName: (0, import_fields4.text)(),
    lat: (0, import_fields4.float)({
      ui: {
        itemView: {
          fieldMode: "read"
        },
        listView: {
          fieldMode: "read"
        }
      }
    }),
    lng: (0, import_fields4.float)({
      ui: {
        itemView: {
          fieldMode: "read"
        },
        listView: {
          fieldMode: "read"
        }
      }
    }),
    enquiries: (0, import_fields4.relationship)({
      ref: "Enquiry.apartment",
      many: true,
      graphql: {
        omit: true
      },
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" }
      }
    }),
    images: (0, import_fields4.relationship)({
      ref: "ApartmentImage.apartment",
      many: true,
      ui: {
        createView: {
          fieldMode: "hidden"
        },
        views: require.resolve("../fields/apartment/images.tsx")
      },
      label: "Images"
    }),
    floorPlans: (0, import_fields4.relationship)({
      ref: "FloorPlan.apartment",
      many: true,
      label: "Floor Plans",
      ui: {
        views: require.resolve("../fields/apartment/floorPlans.tsx"),
        createView: { fieldMode: "hidden" }
      }
    }),
    favorites: (0, import_fields4.relationship)({
      ref: "Favorite.apartment",
      many: true,
      ui: {
        itemView: {
          fieldMode: "hidden"
        },
        createView: {
          fieldMode: "hidden"
        }
      }
    }),
    amenities: (0, import_fields4.relationship)({
      ref: "Amenity.apartments",
      many: true,
      ui: {
        displayMode: "select",
        createView: { fieldMode: "hidden" }
      }
    }),
    ...baseFields,
    unitsCount: (0, import_fields4.virtual)({
      field: import_core3.graphql.field({
        type: import_core3.graphql.Int,
        resolve: async (item, args, context) => {
          if (item.propertyType === "rental") {
            return item.roomsCount;
          }
          return await context.db.Unit.count({
            where: {
              floorPlan: {
                apartment: {
                  id: {
                    equals: item.id.toString()
                  }
                }
              }
            }
          });
        }
      }),
      ui: {
        ...hideField
      }
    }),
    minPrice: (0, import_fields4.virtual)({
      field: import_core3.graphql.field({
        type: import_core3.graphql.Float,
        resolve: async (item, args, context) => {
          if (item.propertyType === "rental") {
            return item.listPrice;
          }
          const floorPlans = await context.db.FloorPlan.findMany({
            where: {
              apartment: {
                id: {
                  equals: item.id.toString()
                }
              },
              minPrice: {
                gt: 0
              }
            },
            orderBy: {
              minPrice: "asc"
            },
            take: 1
          });
          return floorPlans[0]?.minPrice ?? 0;
        }
      }),
      ui: {
        ...hideField
      }
    })
  }
});
var ApartmentImage = (0, import_core3.list)({
  access: contentListAccess,
  ui: {
    ...contentUIConfig,
    isHidden: true,
    label: "Apartment Image"
  },
  fields: {
    apartment: (0, import_fields4.relationship)({
      ref: "Apartment.images",
      many: false,
      isFilterable: true,
      ui: {
        hideCreate: true,
        linkToItem: true,
        itemView: {
          fieldMode: "read"
        }
      }
    }),
    default: (0, import_fields4.checkbox)({
      defaultValue: false,
      ...hideField
    }),
    isAdminUploaded: (0, import_fields4.checkbox)({
      defaultValue: false,
      // these images will not be deleted when the data is re-scraped
      ui: {
        itemView: {
          fieldMode: "hidden"
        },
        createView: {
          fieldMode: "hidden"
        },
        listView: {
          fieldMode: "hidden"
        }
      }
    }),
    url: (0, import_fields4.text)({
      ui: {
        createView: {
          fieldMode: "edit"
        },
        itemView: {
          fieldMode: "hidden"
        },
        listView: {
          fieldMode: "hidden"
        }
      },
      label: "URL"
    }),
    cloudinaryImage: (0, import_cloudinary.cloudinaryImage)({
      cloudinary,
      label: "Image",
      ui: {
        itemView: {
          fieldMode: "hidden"
        },
        listView: {
          fieldMode: "hidden"
        }
      }
    }),
    imageUrl: (0, import_fields4.virtual)({
      field: import_core3.graphql.field({
        type: import_core3.graphql.String,
        resolve: async (item, args, context) => {
          const data = await context.query.ApartmentImage.findOne({
            where: { id: item.id.toString() },
            query: "url cloudinaryImage { publicUrlTransformed }"
          });
          return data.cloudinaryImage?.publicUrlTransformed || data.url;
        }
      }),
      ui: {
        createView: {
          fieldMode: "hidden"
        },
        views: require.resolve("../fields/apartmentImages/image.tsx")
      }
    }),
    type: (0, import_fields4.select)({
      options: [
        { label: "Interiors", value: "INTERIORS" },
        { label: "Amenities", value: "AMENITIES" },
        { label: "Exteriors", value: "EXTERIORS" },
        { label: "Floor Plans", value: "FLOORPLANS" },
        { label: "Life Style", value: "LIFESTYLE" },
        { label: "Neighborhood", value: "NEIGHBORHOOD" },
        { label: "Residences", value: "RESIDENCES" },
        { label: "Convertible", value: "CONVERTIBLE" },
        { label: "One Bedroom", value: "ONEBEDROOM" },
        { label: "Two Bedroom", value: "TWOBEDROOM" },
        { label: "Three Bedroom", value: "THREEBEDROOM" },
        { label: "Architecture", value: "ARCHITECTURE" },
        { label: "Penthouse", value: "PENTHOUSE" },
        { label: "Other", value: "OTHER" }
      ],
      label: "Image Type",
      type: "enum",
      db: {
        isNullable: false
      },
      ui: {
        displayMode: "select"
      },
      validation: { isRequired: true }
    }),
    order: (0, import_fields4.integer)({
      ui: {
        createView: {
          fieldMode: "hidden"
        },
        itemView: {
          fieldMode: "read"
        },
        listView: {
          fieldMode: "read"
        }
      }
    }),
    sourceKey: (0, import_fields4.text)(),
    ...baseFields
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      return {
        ...resolvedData,
        isAdminUploaded: true
      };
    },
    afterOperation: async ({ operation, item, context }) => {
      syncImageUrlToCloudinaryUrl(context, operation, item?.id.toString() ?? null);
      syncOrder(context, operation, item?.id.toString() ?? null);
    }
  }
});
var FloorPlan = (0, import_core3.list)({
  access: contentListAccess,
  ui: {
    ...contentUIConfig,
    isHidden: true,
    label: "Floor Plans"
  },
  fields: {
    source: (0, import_fields4.text)({
      ...hideField
    }),
    sourceId: (0, import_fields4.text)({
      ...hideField
    }),
    name: (0, import_fields4.text)(),
    title: (0, import_fields4.text)(),
    bedrooms: (0, import_fields4.float)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      defaultValue: 0
    }),
    bathrooms: (0, import_fields4.float)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      defaultValue: 0
    }),
    squareFootage: (0, import_fields4.float)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      defaultValue: 0
    }),
    squareFootageMax: (0, import_fields4.float)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      defaultValue: 0
    }),
    minPrice: (0, import_fields4.float)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    maxPrice: (0, import_fields4.float)(),
    imageUrl: (0, import_fields4.virtual)({
      field: import_core3.graphql.field({
        type: import_core3.graphql.String,
        resolve: async (item, args, context) => {
          const data = await context.query.FloorPlan.findOne({
            where: { id: item.id.toString() },
            query: "floorPlanImage"
          });
          return data.floorPlanImage;
        }
      }),
      ui: {
        createView: {
          fieldMode: "hidden"
        },
        views: require.resolve("../fields/apartmentUnits/floorPlanImage.tsx")
      }
    }),
    floorPlanImage: (0, import_fields4.text)({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      label: "Floor Plan Image URL"
    }),
    dataDump: (0, import_fields4.json)({
      ...hideField
    }),
    units: (0, import_fields4.relationship)({
      ref: "Unit.floorPlan",
      many: true,
      ui: {
        itemView: {
          fieldMode: "read"
        },
        inlineConnect: false
      }
    }),
    apartment: (0, import_fields4.relationship)({
      ref: "Apartment.floorPlans",
      many: false,
      ui: {
        itemView: {
          fieldMode: "read"
        },
        listView: {
          fieldMode: "read"
        }
      }
    }),
    ...baseFields
    // concessions: array string todo
    // images : array string todo
  }
});
var Unit = (0, import_core3.list)({
  access: contentListAccess,
  ui: {
    ...contentUIConfig,
    isHidden: true,
    label: "Units"
  },
  fields: {
    floorPlan: (0, import_fields4.relationship)({
      ref: "FloorPlan.units"
    }),
    source: (0, import_fields4.text)({
      ...hideField
    }),
    sourceId: (0, import_fields4.text)({
      ...hideField
    }),
    name: (0, import_fields4.text)(),
    displayName: (0, import_fields4.text)(),
    price: (0, import_fields4.float)({
      defaultValue: 0
    }),
    squareFootage: (0, import_fields4.float)(),
    availability: (0, import_fields4.text)(),
    availableOn: (0, import_fields4.timestamp)(),
    applyOnlineUrl: (0, import_fields4.text)()
  }
});
var Amenity = (0, import_core3.list)({
  access: contentListAccess,
  ui: {
    ...contentUIConfig,
    listView: {
      initialColumns: ["name"],
      initialSort: { field: "name", direction: "ASC" },
      pageSize: 25
    },
    labelField: "name",
    label: "Amenities",
    description: "All Amenities"
  },
  fields: {
    name: (0, import_fields4.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    description: (0, import_fields4.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    source: (0, import_fields4.text)({
      ...hideField
    }),
    displayName: (0, import_fields4.text)(),
    rawText: (0, import_fields4.text)({
      ...hideField
    }),
    isVerified: (0, import_fields4.checkbox)({
      defaultValue: false
    }),
    image: (0, import_cloudinary.cloudinaryImage)({
      cloudinary,
      label: "Image"
    }),
    type: (0, import_fields4.select)({
      options: [
        { label: "Apartment", value: "APARTMENT" },
        { label: "Community", value: "COMMUNITY" },
        { label: "Building", value: "BUILDING" },
        { label: "Appliances", value: "APPLIANCES" },
        { label: "Accessibility", value: "ACCESSIBILITY" },
        { label: "Outdoor", value: "OUTDOOR" },
        { label: "Fitness", value: "FITNESS" },
        { label: "Security", value: "SECURITY" },
        { label: "Cooling", value: "COOLING" },
        { label: "Heating", value: "HEATING" },
        { label: "Flooring", value: "FLOORING" },
        { label: "Laundry", value: "LAUNDRY" },
        { label: "Parking", value: "PARKING" },
        { label: "Pets", value: "PETS" },
        { label: "Other", value: "OTHER" }
      ],
      label: "Amenity Type",
      type: "enum"
    }),
    apartments: (0, import_fields4.relationship)({
      ref: "Apartment.amenities",
      many: true,
      ui: {
        listView: {
          fieldMode: "hidden"
        },
        displayMode: "cards",
        cardFields: ["name"],
        linkToItem: true
      }
    }),
    ...baseFields
  }
});
async function syncImageUrlToCloudinaryUrl(context, operation, itemId) {
  if ((operation === "create" || operation === "update") && itemId) {
    const item = await context.query.ApartmentImage.findOne({
      where: { id: itemId },
      query: "cloudinaryImage { publicUrlTransformed }"
    });
    const cloudinaryImageUrl = item?.cloudinaryImage?.publicUrlTransformed;
    if (cloudinaryImageUrl) {
      await context.db.ApartmentImage.updateOne({
        where: { id: itemId },
        data: { url: cloudinaryImageUrl }
      });
    }
  }
}
async function syncOrder(context, operation, itemId) {
  if (operation === "create" && itemId) {
    const image = await context.db.ApartmentImage.findOne({
      where: { id: itemId }
    });
    const apartmentId = image?.apartmentId;
    if (apartmentId) {
      const maxImg = await context.db.ApartmentImage.findMany({
        where: {
          apartment: {
            id: apartmentId
          }
        },
        orderBy: {
          order: "desc"
        },
        take: 1
      });
      const maxOrder = maxImg[0]?.order || 0;
      await context.db.ApartmentImage.updateOne({
        where: { id: itemId },
        data: { order: maxOrder + 1 }
      });
    }
  }
}

// schema/lists/customer-lists.ts
var import_core4 = require("@keystone-6/core");
var import_fields5 = require("@keystone-6/core/fields");

// external/google/index.ts
var import_googleapis = require("googleapis");
var getGoogleSheetsClient = async () => {
  const auth = new import_googleapis.google.auth.GoogleAuth({
    keyFile: "./external/google/google-credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });
  const client = await auth.getClient();
  return import_googleapis.google.sheets({ version: "v4", auth: client });
};

// schema/lists/customer-lists.ts
var customerListAccess = {
  filter: {
    create: rules.canUserCreateEntity,
    update: permissions.canManageLeads,
    delete: permissions.canManageLeads
  }
};
var customerUIConfig = {
  hideDelete: (context) => !permissions.canManageLeads(context),
  itemView: {
    defaultFieldMode: (context) => permissions.canManageLeads(context) ? "edit" : "read"
  }
};
var Enquiry = (0, import_core4.list)({
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
    assignedTo: (0, import_fields5.relationship)({
      ref: "User.managedEnquiries",
      many: false,
      ui: {
        createView: {
          fieldMode: "hidden"
          // Do not change this as it will break the UI
        },
        description: "The agent assigned to this enquiry",
        views: require.resolve("../fields/enquiries/assignedTo.tsx")
      }
    }),
    message: (0, import_fields5.text)(),
    preferredTime: (0, import_fields5.timestamp)(),
    user: (0, import_fields5.relationship)({
      ref: "User.enquiries",
      many: false,
      ui: {
        itemView: {
          fieldMode: "read"
        }
      }
    }),
    apartment: (0, import_fields5.relationship)({
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
        const data = await context.prisma.enquiry.findUnique({
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
        sClient.spreadsheets.values.append({
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
        }).then(() => console.log("Successfully appended to google sheet")).catch((err) => console.log("Error appending to google sheet", err));
        try {
          const enq = item;
          const user = await context.prisma.user.findFirst({ where: { id: Number(enq.userId) } });
          if (!user) {
            throw new Error("User not found");
          }
          const apartment = await context.prisma.apartment.findFirst({ where: { id: Number(enq.apartmentId) } });
          if (!apartment) {
            return await registerContactUsEnquiry(enq, user);
          }
          await registerEnquiry(enq, user, apartment);
        } catch (error) {
          console.error(error);
          return;
        }
      }
    }
  }
});

// schema/gql-extension/index.ts
var import_core5 = require("@keystone-6/core");
var import_nanoid2 = require("nanoid");

// lib/email/gmass.ts
var import_axios2 = __toESM(require("axios"));
var import_nanoid = require("nanoid");
var sendGMassEmail = (to, subject, body) => {
  const emailObj = {
    transactionalEmailId: (0, import_nanoid.nanoid)(),
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
  import_axios2.default.post(url, emailObj).then(() => {
    console.info("Email sent successfully");
  }).catch((err) => {
    console.error("Errored out while sending emails");
    console.error(err);
  });
};

// lib/email/index.ts
var import_handlebars = __toESM(require("handlebars"));
var import_fs = __toESM(require("fs"));

// utils/url.ts
function makeUrl(path, params = {}) {
  let url = path.replace(/\/$/, "").replace(/\s/g, "-");
  if (params) {
    url += "?";
    Object.keys(params).forEach((key) => {
      url = `${url}${key}=${params[key]}&`;
    });
    url = url.slice(0, -1);
  }
  return `/${url.toLocaleLowerCase()}`;
}

// utils/money.ts
function money(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// lib/email/index.ts
async function sendEmail(data) {
  if (data.type === "passwordReset") {
    sendGMassEmail(data.to, "Password Reset", passwordResetHtmlMessage(data.data.token, data.to));
  } else if (data.type === "newUserPasswordCreate") {
    sendGMassEmail(data.to, "Create your password", newUserPasswordCreateHtmlMessage(data.data.passwordCreateUUID));
  } else if (data.type == "newListingsAdded") {
    const listings = data.data.listings;
    const beds = data.data.beds;
    const baths = data.data.baths;
    const location = data.data.location;
    if (listings.length === 0)
      return;
    sendGMassEmail(
      data.to,
      "Greetings from Rentexclusively!",
      userNewListingsAdded({ agentName: data.fromName, userName: data.toName, listings, beds, baths, location })
    );
  } else {
    sendGMassEmail(data.to, "New Enquiry", newEnquiryHtmlMessage(data.data.enquiryID));
  }
}
var passwordResetHtmlMessage = (token, email) => `
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
var newUserPasswordCreateHtmlMessage = (passwordCreateUUID) => `
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
var newEnquiryHtmlMessage = (enquiryID) => `
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
var userNewListingsAdded = (data) => {
  const { listings, beds, baths, location, userName, agentName } = data;
  const baseUrl2 = new URL("https://rentexclusively.com/apartments");
  location?.forEach((loc) => baseUrl2.searchParams.append("areas", loc.trim()));
  isNotNullNorUndefined(beds) && baseUrl2.searchParams.append("beds", beds.toString());
  isNotNullNorUndefined(baths) && baseUrl2.searchParams.append("baths", baths.toString());
  const displayListings = listings.slice(0, listings.length - listings.length % 2).map((listing) => ({
    ...listing,
    urlSlug: makeUrl(`${listing.name}-${listing.id}`, { gmasstrack: false }),
    price: Number.isNaN(Number(listing.price)) ? "-- price unavailable --" : money(Number(listing.price))
  }));
  const template = import_handlebars.default.compile(import_fs.default.readFileSync("email-templates/listing-email.hbs", "utf8"));
  const compiledHtml = template({ userName, agentName, listings: displayListings, baseUrl: baseUrl2.toString() });
  return compiledHtml;
};

// db/index.ts
var import_client = require("@prisma/client");
var import_tiny_invariant = __toESM(require("tiny-invariant"));
var prisma;
if (process.env.NODE_ENV === "production") {
  prisma = getClient();
} else {
  if (!global.__db__) {
    global.__db__ = getClient();
  }
  prisma = global.__db__;
}
function getClient() {
  const { DATABASE_URL } = process.env;
  (0, import_tiny_invariant.default)(typeof DATABASE_URL === "string", "DATABASE_URL env var not set");
  const databaseUrl = new URL(DATABASE_URL);
  console.log(`\u{1F50C} setting up prisma client to ${databaseUrl.host}`);
  const client = new import_client.PrismaClient({
    log: ["info", "warn", "error"]
  });
  client.$connect();
  return client;
}

// schema/gql-extension/index.ts
var extendGraphqlSchema = (0, import_core5.graphQLSchemaExtension)({
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
        return true;
      },
      followUpBossPeopleCreated: async (_, { userIds: fubUserIds }, context) => {
        const users = await context.prisma.user.findMany({
          where: {
            followUpBossId: {
              in: fubUserIds.map((id) => parseInt(id))
            }
          }
        });
        const userMap = users.reduce((acc, user) => {
          if (user.followUpBossId)
            acc[user.followUpBossId] = true;
          return acc;
        }, {});
        fubUserIds = fubUserIds.filter((id) => !userMap[parseInt(id)]);
        const people = await getUsersFromPersonIds(fubUserIds);
        const userCreateData = people.filter((person) => !!person.emails?.length && !!person.emails?.[0].value).map((person) => ({
          email: person.emails?.[0].value,
          firstName: person.firstName,
          lastName: person.lastName,
          followUpBossId: person.id,
          password: (0, import_nanoid2.nanoid)()
        }));
        const newUsers = await context.prisma.$transaction(
          userCreateData.map((user) => {
            return context.prisma.user.create({ data: user });
          })
        );
        for (const usr of newUsers) {
          const usrPwdCreateToken = await context.db.UserPasswordCreateToken.createOne({
            data: {
              token: (0, import_nanoid2.nanoid)(),
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
      createUserEnquiry: async (root, { data: { message, apartmentId, firstName, lastName, email, phone, preferredTime } }, context) => {
        const isLoggedIn = !!context.session?.itemId;
        if (isLoggedIn) {
          return await context.db.Enquiry.createOne({
            data: {
              apartment: apartmentId ? { connect: { id: apartmentId } } : void 0,
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
              apartment: apartmentId ? { connect: { id: apartmentId } } : void 0,
              message,
              user: { connect: { id: `${userExists.id}` } },
              preferredTime
            }
          });
        }
        const newUser = await context.db.User.createOne({
          data: {
            email,
            firstName,
            lastName,
            phone,
            password: (0, import_nanoid2.nanoid)()
          }
        });
        const newEnq = await context.db.Enquiry.createOne({
          data: {
            apartment: apartmentId ? { connect: { id: apartmentId } } : void 0,
            message,
            user: { connect: { id: `${newUser.id}` } },
            preferredTime
          }
        });
        const usrPwdCreateToken = await context.db.UserPasswordCreateToken.createOne({
          data: {
            token: (0, import_nanoid2.nanoid)(),
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
      userCreatePassword: async (_, { password: password2, passwordCreateUUID }, context) => {
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
        return await context.sudo().db.User.updateOne({
          where: { id: user.id.toString() },
          data: { password: password2 }
        });
      },
      assignEnquiryToUser: async (_, { enquiryId }, context) => {
        if (!context.session?.itemId) {
          throw new Error("You must be logged in to assign an enquiry");
        }
        const enquiry = await context.db.Enquiry.findOne({
          where: { id: enquiryId }
        });
        if (!enquiry) {
          throw new Error("Enquiry not found");
        }
        if (enquiry.assignedToId) {
          throw new Error("Enquiry already assigned");
        }
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
      removeEnquiryFromUser: async (_, { enquiryId }, context) => {
        if (!context.session?.itemId) {
          throw new Error("You must be logged in to remove an enquiry");
        }
        const enquiry = await context.db.Enquiry.findOne({
          where: { id: enquiryId }
        });
        if (!enquiry) {
          throw new Error("Enquiry not found");
        }
        if (!enquiry.assignedToId) {
          throw new Error("Enquiry not assigned");
        }
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
      updateImagesOrder: async (_, { images }, context) => {
        if (!context.session?.itemId) {
          throw new Error("You must be logged in to update apartment images order");
        }
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
        for (let i = 0; i < images.length; i++) {
          await context.db.ApartmentImage.updateOne({
            where: { id: images[i] },
            data: { order: i }
          });
        }
        return true;
      },
      sendPromotionalEmail: async (_, { data: { apartmentIds, beds, baths, location, userIds, priceFrom, priceTo } }, context) => {
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
        const listings = [];
        for (const apt of apts) {
          const minPrice = apt.floorPlans.reduce((acc, fp) => fp.minPrice > 0 ? Math.min(acc, fp.minPrice) : acc, Infinity);
          const maxBeds = apt.floorPlans.reduce((acc, fp) => Math.max(acc, fp.bedrooms), 0);
          const maxBaths = apt.floorPlans.reduce((acc, fp) => Math.max(acc, fp.bathrooms), 0);
          if (!apt || !apt.name || !apt.area || !apt.images)
            continue;
          const listing = {
            id: apt.id,
            location: apt.area,
            name: apt.name,
            image: apt.images[0].url ?? "https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/1674924[\u2026]issing-image-mark-image-not-available-or-image-comin.jpg?ver=6",
            price: `${minPrice === Infinity ? "-- NA --" : `${minPrice}`}`,
            beds: beds ?? maxBeds,
            baths: baths ?? maxBaths
          };
          listings.push(listing);
        }
        if (listings.length === 0) {
          throw new Error("No listings found name, area, images");
        }
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
      registerPropertyViewed: async (_, { apartmentId }, context) => {
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
      registerPropertySearched: async (_, { searchUrl }, context) => {
        if (!context.session?.itemId) {
          throw new Error("User not logged in!");
        }
        searchUrl = searchUrl.trim().replace("?", "");
        const user = await context.prisma.user.findUnique({ where: { id: Number(context.session.itemId) } });
        if (!user) {
          throw new Error("User not found");
        }
        const url = new URL("http://localhost:5000?" + searchUrl);
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
      registerWebhooks: async (_, __, context) => {
        const isAdmin = !!context.session?.data?.role;
        if (!isAdmin) {
          throw new Error("You do not have permission to register webhooks");
        }
        await registerWebhooks();
        return true;
      }
    },
    Query: {
      getMyFavorites: async (root, { where, orderBy, take, skip = 0 }, context) => {
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
      getMyAssignedEnquiries: async (root, {}, context) => {
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
      getUnAssignedEnquiries: async (root, {}, context) => {
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
      getMySearches: async (root, { where, orderBy, take, skip = 0 }, context) => {
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
var followUpBossRegisterUsers = async (fubUserIds) => {
  const users = await prisma.user.findMany({
    where: {
      followUpBossId: {
        in: fubUserIds.map((id) => parseInt(id))
      }
    }
  });
  const userMap = users.reduce((acc, user) => {
    if (user.followUpBossId)
      acc[user.followUpBossId] = true;
    return acc;
  }, {});
  fubUserIds = fubUserIds.filter((id) => !userMap[parseInt(id)]);
  const people = await getUsersFromPersonIds(fubUserIds);
  const userCreateData = people.filter((person) => !!person.emails?.length && !!person.emails?.[0].value).map((person) => ({
    email: person.emails?.[0].value,
    firstName: person.firstName,
    lastName: person.lastName,
    followUpBossId: person.id,
    password: (0, import_nanoid2.nanoid)()
  }));
  const newUsers = await prisma.$transaction(
    userCreateData.map((user) => {
      return prisma.user.create({ data: user });
    })
  );
  for (const usr of newUsers) {
    const usrPwdCreateToken = await prisma.userPasswordCreateToken.create({
      data: {
        token: (0, import_nanoid2.nanoid)(),
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

// schema/schema.ts
var lists = {
  Enquiry,
  User,
  Apartment,
  ApartmentImage,
  FloorPlan,
  Rental,
  Favorite,
  Search,
  Amenity,
  UserPasswordCreateToken,
  Role,
  Unit
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret2 = process.env.SESSION_SECRET;
if (!sessionSecret2 && process.env.NODE_ENV !== "production") {
  sessionSecret2 = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret2
});

// keystone.ts
var import_body_parser = __toESM(require("body-parser"));
var keystone_default = withAuth(
  (0, import_core6.config)({
    db,
    ui: {
      isAccessAllowed: (ctx) => rules.canUseAdminUI({ session: ctx.session })
    },
    lists,
    extendGraphqlSchema,
    session,
    storage: {
      assets: {
        kind: "local",
        type: "image",
        serverRoute: {
          path: "/"
        },
        storagePath: "public/images",
        generateUrl: (path) => `${baseUrl}/images${path}`
      }
    },
    graphql: {
      playground: "apollo"
    },
    server: {
      port,
      cors: {
        origin: [/localhost:*/, /rentexclusively\.com$/, "https://studio.apollographql.com"],
        credentials: true
      },
      extendExpressApp: (app) => {
        app.post("/api/callbacks/fub/peopleCreated", import_body_parser.default.json(), async (req, res) => {
          try {
            const body = req.body;
            if (body["event"] !== "peopleCreated")
              return res.status(404);
            const fubUserIDs = body["resourceIds"];
            await followUpBossRegisterUsers(fubUserIDs);
            res.status(200).json({ success: true });
          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false });
          }
        });
      }
    }
  })
);
