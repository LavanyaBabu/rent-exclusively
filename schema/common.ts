import { timestamp } from "@keystone-6/core/fields";

export const hideField: any = {
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

export const baseFields = {
  createdAt: timestamp({
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
  updatedAt: timestamp({
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
