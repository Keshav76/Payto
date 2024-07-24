"use server";
import { getServerSession } from "next-auth";
import authOptions, { Session } from "../auth";
import db, { TransactionCategory } from "@repo/db/client";

const transferMoney = async (
  to: number,
  amount: number,
  message: string = "",
  category: TransactionCategory = "Miscellaneous"
) => {
  const amountToSend = amount * 100;

  const fromUser: Session = await getServerSession(authOptions);
  if (!fromUser?.user) return "No user found!";
  const from = Number(fromUser.user.id);
  if (from === to) return "Cant tranfer to self";
  try {
    await db.$transaction(
      async (txDb) => {
        await txDb.$queryRaw`SELECT * FROM "User" WHERE id=${from} FOR UPDATE;`;

        const exisitingUser = await txDb.user.findFirst({
          where: { id: from },
        });
        if (!exisitingUser || exisitingUser.balance < amountToSend)
          throw new Error("Insufficient Balance");

        await txDb.user.update({
          where: { id: from },
          data: { balance: { decrement: amountToSend } },
        });

        await txDb.user.update({
          where: { id: to },
          data: { balance: { increment: amountToSend } },
        });

        await txDb.p2PTransaction.create({
          data: {
            amount: amountToSend,
            category,
            message,
            fromId: from,
            toId: to,
          },
        });
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );
    return "success";
  } catch (err) {
    if (err instanceof Error) return err.message;
    return "Something went wrong!";
  }
};
export default transferMoney;
