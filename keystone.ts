// // Welcome to Keystone!
// //
// // This file is what Keystone uses as the entry-point to your headless backend
// //
// // Keystone imports the default export of this file, expecting a Keystone configuration object
// //   you can find out more at https://keystonejs.com/docs/apis/config

// import { config, list } from '@keystone-6/core';

// // to keep this file tidy, we define our schema in a different file
// // import { lists } from './schema';

// // authentication is configured separately here too, but you might move this elsewhere
// // when you write your list-level access control functions, as they typically rely on session data
// import { withAuth, session } from './auth';


// import { allowAll } from '@keystone-6/core/access';
// import { text } from '@keystone-6/core/fields';


// // const lists = {
// //   User: list({
// //     access: {
// //       create: true,
// //       read: true,
// //       update: true,
// //       delete: true,
// //     },
// //     fields: {
// //       name: text({ validation: { isRequired: true } }),
// //       email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
// //     },
// //   }),
// // };


// export default withAuth(
//   config({
//     db: {
//       // we're using sqlite for the fastest startup experience
//       //   for more information on what database might be appropriate for you
//       //   see https://keystonejs.com/docs/guides/choosing-a-database#title
//       // provider: 'sqlite',
//       // url: 'file:./keystone.db',
//       provider: 'postgresql',
//       url: 'postgres://postgres:Lavanya%40123@127.0.0.1:5432/keystone_learning',
//       onConnect: async context => { /* ... */ },
//       enableLogging: true,
//       idField: { kind: 'uuid' },
//       shadowDatabaseUrl: 'postgres://postgres:Lavanya%40123@127.0.0.1:5432/keystone_learning_shadow'
//     },
//     lists: {
//       User: list({
//         access: allowAll,
//         fields: {
//           name: text({ validation: { isRequired: true } }),
//           email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
//         },
//       }),
//     },
//     session,
//   })
// );


import { config } from "@keystone-6/core";
import { lists, extendGraphqlSchema } from "./schema/schema";
import { withAuth, session } from "./auth";
import { baseUrl, db, port } from "./config";
import { rules } from "./schema/permissions";
import { followUpBossRegisterUsers } from "./schema/gql-extension";
import bodyParser from "body-parser";

export default withAuth(
  config({
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
        app.post("/api/callbacks/fub/peopleCreated", bodyParser.json(), async (req, res) => {
          try {
            const body = req.body;
            // if event is not peopleCreated, return 404
            if (body["event"] !== "peopleCreated") return res.status(404);
            // if event is peopleCreated, get resourceIds
            const fubUserIDs = body["resourceIds"];
            // call followUpBossPeopleCreated function
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
