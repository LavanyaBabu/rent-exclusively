import { graphql, list } from "@keystone-6/core";
import { checkbox, float, integer, json, relationship, select, text, timestamp, virtual } from "@keystone-6/core/fields";
import { hideField, baseFields } from "../common";
import { permissions } from "../permissions";
import { Context } from ".keystone/types";
import { cloudinaryImage as cloudinaryImageField } from "@keystone-6/cloudinary";
import { BaseItem } from "@keystone-6/core/types";
import { cloudinary } from "../../config";
import { IdFilter } from "../../gql/generated/sdk";

export const contentListAccess = {
  filter: {
    create: permissions.canManageContent,
    update: permissions.canManageContent,
    delete: permissions.canManageContent
  }
};

export const contentUIConfig = {
  hideCreate: (context: any) => !permissions.canManageContent(context),
  hideDelete: (context: any) => !permissions.canManageContent(context),
  itemView: {
    defaultFieldMode: (context: any) => (permissions.canManageContent(context) ? "edit" : "read")
  }
};

export const Apartment = list({
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
    name: text({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    propertyType: select({
      options: [
        { label: "Apartment", value: "apartment" },
        { label: "Rentals", value: "rental" }
      ],
      defaultValue: "apartment"
    }),
    sourceId: text(),
    bedrooms: integer({
      label: "Bedrooms count for rentals/condos"
    }),
    bathrooms: integer({
      label: "Bathrooms count for rentals/condos"
    }),
    listAgentEmail: text(),
    listAgentName: text(),
    listAgentMobile: text(),
    daysOnMarket: integer(),
    listPrice: float(),
    roomsCount: integer({
      label: "Rooms count for rentals/condos"
    }),
    description: text({
      ui: {
        displayMode: "textarea"
      }
    }),
    commision: float(),
    pool: checkbox({
      defaultValue: false,
      ui: {
        description: "Does this apartment have a pool?"
      }
    }),
    petFriendly: checkbox({
      defaultValue: false,
      ui: {
        description: "Is this apartment pet friendly?"
      }
    }),
    website: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      ui: {
        itemView: {
          fieldMode: () => "read"
        }
      }
    }),
    apartmentListUrl: text({
      ...hideField
    }),
    zillowUrl: text({
      ...hideField
    }),
    primaryScraper: select({
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
    street: text(),
    neighborhood: text(),
    area: text({ validation: { isRequired: true } }),
    city: text(),
    state: text(),
    zip: text(),
    country: text(),
    phone: text(),
    email: text(),
    contactName: text(),
    lat: float({
      ui: {
        itemView: {
          fieldMode: "read"
        },
        listView: {
          fieldMode: "read"
        }
      }
    }),
    lng: float({
      ui: {
        itemView: {
          fieldMode: "read"
        },
        listView: {
          fieldMode: "read"
        }
      }
    }),
    enquiries: relationship({
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
    images: relationship({
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
    floorPlans: relationship({
      ref: "FloorPlan.apartment",
      many: true,
      label: "Floor Plans",
      ui: {
        views: require.resolve("../fields/apartment/floorPlans.tsx"),
        createView: { fieldMode: "hidden" }
      }
    }),
    favorites: relationship({
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
    amenities: relationship({
      ref: "Amenity.apartments",
      many: true,
      ui: {
        displayMode: "select",
        createView: { fieldMode: "hidden" }
      }
    }),
    ...baseFields,
    unitsCount: virtual({
      field: graphql.field({
        type: graphql.Int,
        resolve: async (item, args, context) => {
          if ((item as BaseItem).propertyType === "rental") {
            return (item as BaseItem).roomsCount as number;
          }
          return await (context as Context).db.Unit.count({
            where: {
              floorPlan: {
                apartment: {
                  id: {
                    equals: (item as BaseItem).id.toString()
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
    minPrice: virtual({
      field: graphql.field({
        type: graphql.Float,
        resolve: async (item, args, context) => {
          if ((item as BaseItem).propertyType === "rental") {
            return (item as BaseItem).listPrice as number;
          }
          const floorPlans = await (context as Context).db.FloorPlan.findMany({
            where: {
              apartment: {
                id: {
                  equals: (item as BaseItem).id.toString()
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

export const ApartmentImage = list({
  access: contentListAccess,
  ui: {
    ...contentUIConfig,
    isHidden: true,
    label: "Apartment Image"
  },
  fields: {
    apartment: relationship({
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
    default: checkbox({
      defaultValue: false,
      ...hideField
    }),
    isAdminUploaded: checkbox({
      defaultValue: false, // these images will not be deleted when the data is re-scraped
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
    url: text({
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
    cloudinaryImage: cloudinaryImageField({
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
    imageUrl: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve: async (item, args, context) => {
          const data = await context.query.ApartmentImage.findOne({
            where: { id: (item as BaseItem).id.toString() },
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
    type: select({
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
    order: integer({
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
    sourceKey: text(),
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
      syncImageUrlToCloudinaryUrl(context as Context, operation, item?.id.toString() ?? null);
      syncOrder(context as Context, operation, item?.id.toString() ?? null);
    }
  }
});

export const FloorPlan = list({
  access: contentListAccess,
  ui: {
    ...contentUIConfig,
    isHidden: true,
    label: "Floor Plans"
  },
  fields: {
    source: text({
      ...hideField
    }),
    sourceId: text({
      ...hideField
    }),
    name: text(),
    title: text(),
    bedrooms: float({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      defaultValue: 0
    }),
    bathrooms: float({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      defaultValue: 0
    }),
    squareFootage: float({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      defaultValue: 0
    }),
    squareFootageMax: float({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      defaultValue: 0
    }),
    minPrice: float({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    maxPrice: float(),
    imageUrl: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve: async (item, args, context) => {
          const data = await context.query.FloorPlan.findOne({
            where: { id: (item as BaseItem).id.toString() },
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
    floorPlanImage: text({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      label: "Floor Plan Image URL"
    }),
    dataDump: json({
      ...hideField
    }),
    units: relationship({
      ref: "Unit.floorPlan",
      many: true,
      ui: {
        itemView: {
          fieldMode: "read"
        },
        inlineConnect: false
      }
    }),
    apartment: relationship({
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

export const Unit = list({
  access: contentListAccess,
  ui: {
    ...contentUIConfig,
    isHidden: true,
    label: "Units"
  },
  fields: {
    floorPlan: relationship({
      ref: "FloorPlan.units"
    }),
    source: text({
      ...hideField
    }),
    sourceId: text({
      ...hideField
    }),
    name: text(),
    displayName: text(),
    price: float({
      defaultValue: 0
    }),
    squareFootage: float(),
    availability: text(),
    availableOn: timestamp(),
    applyOnlineUrl: text()
  }
});

export const Amenity = list({
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
    name: text({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    description: text({
      ui: {
        displayMode: "textarea"
      }
    }),
    source: text({
      ...hideField
    }),
    displayName: text(),
    rawText: text({
      ...hideField
    }),
    isVerified: checkbox({
      defaultValue: false
    }),
    image: cloudinaryImageField({
      cloudinary,
      label: "Image"
    }),
    type: select({
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
    apartments: relationship({
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

async function syncImageUrlToCloudinaryUrl(context: Context, operation: "delete" | "update" | "create", itemId: string | null) {
  if ((operation === "create" || operation === "update") && itemId) {
    // sync the cloudinary image url to the url field
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

async function syncOrder(context: Context, operation: "delete" | "update" | "create", itemId: string | null) {
  if (operation === "create" && itemId) {
    // sync the order number
    // get apartment id
    const image = await context.db.ApartmentImage.findOne({
      where: { id: itemId }
    });
    const apartmentId = image?.apartmentId;
    if (apartmentId) {
      // max order
      const maxImg = await context.db.ApartmentImage.findMany({
        where: {
          apartment: {
            id: apartmentId as IdFilter
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
