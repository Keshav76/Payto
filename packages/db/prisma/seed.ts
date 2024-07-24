import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.create({
    data: {
      number: "9999999999",
      password: await bcrypt.hash("alice", 10),
      name: "alice",
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  });
  const bob = await prisma.user.create({
    data: {
      number: "9999999998",
      password: await bcrypt.hash("bob", 10),
      name: "bob",
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Failed",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
