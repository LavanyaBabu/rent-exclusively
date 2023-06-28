/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";
import invariant from "tiny-invariant";

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
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
  invariant(typeof DATABASE_URL === "string", "DATABASE_URL env var not set");

  const databaseUrl = new URL(DATABASE_URL as string);

  // const isLocalHost = databaseUrl.hostname === "localhost";

  // const PRIMARY_REGION = isLocalHost ? null : process.env.PRIMARY_REGION;
  // const FLY_REGION = isLocalHost ? null : process.env.FLY_REGION;

  // const isReadReplicaRegion = !PRIMARY_REGION || PRIMARY_REGION === FLY_REGION;

  // if (!isLocalHost) {
  //   databaseUrl.host = `${FLY_REGION}.${databaseUrl.host}`;
  //   if (!isReadReplicaRegion) {
  //     // 5433 is the read-replica port
  //     databaseUrl.port = "5433";
  //   }
  // }

  console.log(`🔌 setting up prisma client to ${databaseUrl.host}`);
  // NOTE: during development if you change anything in this function, remember
  // that this only runs once per server restart and won't automatically be
  // re-run per request like everything else is. So if you need to change
  // something in this file, you'll need to manually restart the server.
  const client = new PrismaClient({
    log: ["info", "warn", "error"]
  });

  // type Updates = "update" | "updateMany";

  // Soft Delete middleware
  // client.$use(async (params, next) => {
  //   if (params.action.startsWith("delete")) {
  //     // Delete queries, Change action to an update
  //     params.action = params.action.replace("delete", "update") as Updates;
  //     params.args = {
  //       ...params.args,
  //       data: {
  //         ...(params.args?.data ?? {}),
  //         deletedAt: new Date(),
  //       },
  //     };
  //   }

  //   if (params.action.startsWith("find")) {
  //     // Find queries, add deleted filter
  //     params.args = {
  //       ...params.args,
  //       where: {
  //         ...(params.args?.where ?? {}),
  //         deletedAt: null,
  //       },
  //     };

  //     // Add deleted at for all child relations
  //     Object.keys(params.args?.include ?? {}).forEach((includeOption) => {
  //       if (typeof params.args.include[includeOption] === "boolean") {
  //         params.args.include[includeOption] = {
  //           where: { deletedAt: null },
  //         };
  //       }
  //         params.args.include[includeOption].where = {
  //           ...params.args.include[includeOption].where,
  //           deletedAt: null,
  //         };
  //       }
  //     });

  //     console.log(JSON.stringify(params, null, 2));
  //   }
  //   return next(params);
  // });

  // connect eagerly
  client.$connect();

  return client;
}

export { prisma };
