import { list } from "@keystone-6/core";
import { decimal, select, integer, checkbox, timestamp, text } from "@keystone-6/core/fields";
import { baseFields } from "../common";

export const Rental = list({
  defaultIsFilterable: () => true,
  fields: {
    MLSId: text({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    rentPrice: decimal({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    remarks: text({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    // virtualTourLinks: string[], //todo
    address: text({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    status: select({
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
    bedrooms: integer({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true,
      defaultValue: 0
    }),
    bathrooms: integer({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true,
      defaultValue: 0
    }),
    appxSf: text({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    spaces: text({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    parkingIncluded: checkbox({
      isFilterable: true,
      defaultValue: false
    }),
    yearBuilt: integer({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    exposure: text({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    airConditioned: checkbox({
      isFilterable: true,
      defaultValue: false
    }),
    heating: checkbox({
      isFilterable: true,
      defaultValue: false
    }),
    parkingFee: integer({
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
    garageOwnership: checkbox({
      isFilterable: true,
      defaultValue: false
    }),
    garageOnSite: checkbox({
      isFilterable: true,
      defaultValue: false
    }),
    garageType: text({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    // amenities            String[] todo
    availableAsOf: timestamp(),
    listDate: timestamp(),
    mktTime: text({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    feesNApprovals: text({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    monthlyRentIncl: checkbox({
      isFilterable: true,
      defaultValue: false
    }),
    shortTermLease: checkbox({
      isFilterable: true,
      defaultValue: false
    }),
    availFurnished: checkbox({
      isFilterable: true,
      defaultValue: false
    }),
    petsAllowed: checkbox({
      isFilterable: true,
      defaultValue: false
    }),
    maxPetWeight: decimal({
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      },
      isFilterable: true
    }),
    elementarySchool: text({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    juniorHigh: text({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    highSchool: text({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    coopComp: text({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    broker: text({
      isFilterable: true,
      validation: {
        isRequired: true
      },
      db: {
        isNullable: false
      }
    }),
    listBroker: text({
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
