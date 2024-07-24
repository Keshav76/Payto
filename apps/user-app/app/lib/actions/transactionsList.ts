"use server";

import db from "@repo/db/client";

async function getTransactionsList(userId: number) {
  const response = await db.p2PTransaction.findMany({
    where: {
      OR: [{ fromId: userId }, { toId: userId }],
    },
    include: { from: true, to: true },
  });
  return response;
}

export default getTransactionsList;
