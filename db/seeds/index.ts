import { sanitize } from "~utils/object";

import { prisma } from "db";
import Apartments from "./data/apartments";
import Users from "./data/users";

async function seed() {
  await Promise.all(
    Users.map(async (user) => {
      try {
        await prisma.user.upsert({
          where: { email: user.email },
          update: user,
          create: user
        });
      } catch (error) {
        console.error(`errored out while upserting user ${user.email}`);
        console.error(error);
      }
    })
  );

  await Promise.all(
    Apartments.map((apt) =>
      prisma.apartment
        .upsert({
          where: { website: apt.website },
          update: sanitize(apt),
          create: sanitize(apt)
        })
        .catch((e) => {
          console.error(`errored out while upserting apt ${apt.website}`);
          console.error(e);
        })
    )
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
