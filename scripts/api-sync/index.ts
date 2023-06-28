import Promise from "bluebird";
import fs from "fs";

import { prisma } from "db";

prisma.apartmentUnit
  .deleteMany({})
  .then(() => {
    const files = fs.readdirSync(__dirname);
    Promise.mapSeries(files, async (file) => {
      if (file === "index.ts") {
        return Promise.resolve(file);
      }
      const sync = await import(`${__dirname}/${file}`);

      if (!sync.default) {
        return Promise.resolve();
      }

      await sync.default();

      console.log("*".repeat(100));
      return Promise.delay(500);
    });
  })
  .catch((e) => {
    console.warn(e);
  });
