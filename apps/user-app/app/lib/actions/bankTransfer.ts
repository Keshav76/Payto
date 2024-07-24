"use server";
import db from "@repo/db/client";

export async function getBalance(id: string) {
  const user = await db.user.findFirst({
    where: {
      id: Number(id),
    },
  });
  return {
    amount: user?.balance || 0,
    locked: user?.locked || 0,
  };
}

export async function getOnRampTransactions(id: string) {
  const txns = await db.onRampTransaction.findMany({
    where: {
      userId: Number(id),
    },
    orderBy: {
      startTime: "desc",
    },
    take: 5,
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export async function getOffRampTransactions(id: string) {
  const txns = await db.offRampTransaction.findMany({
    where: {
      userId: Number(id),
    },
    orderBy: {
      startTime: "desc",
    },
    take: 5,
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}
