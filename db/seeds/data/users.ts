import bcrypt from "bcryptjs";
import { Prisma } from ".prisma/client";

const Users: Prisma.UserCreateInput[] = [
  {
    email: "vinit@info.com",
    firstName: "Vinit",
    lastName: "Sarvade",
    phone: "8792369896",
    password: bcrypt.hashSync("vinit@123"),
    role: {
      connectOrCreate: {
        where: {
          name: "Admin"
        },
        create: {
          name: "Admin",
          canManageContent: true,
          canManageLeads: true,
          canManageUsers: true
        }
      }
    }
  },
  {
    email: "anant@info.com",
    firstName: "Anant",
    lastName: "Kamat",
    phone: "8197670792",
    password: bcrypt.hashSync("anant@123"),
    role: {
      connectOrCreate: {
        where: {
          name: "Admin"
        },
        create: {
          name: "Admin",
          canManageContent: true,
          canManageLeads: true,
          canManageUsers: true
        }
      }
    }
  },
  {
    email: "aftab@info.com",
    firstName: "Aftab",
    lastName: "Hussain",
    phone: "8867803331",
    password: bcrypt.hashSync("aftab@123"),
    role: {
      connectOrCreate: {
        where: {
          name: "Admin"
        },
        create: {
          name: "Admin",
          canManageContent: true,
          canManageLeads: true,
          canManageUsers: true
        }
      }
    }
  }
];

export default Users;
