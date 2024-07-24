"use server";

import db from "@repo/db/client";

const createOnRampTransaction = async (
  id: string,
  amount: number,
  provider: string
) => {
  const newToken = (Math.random() * 1000).toString();
  await db.onRampTransaction.create({
    data: {
      token: newToken,
      amount: amount * 100,
      provider: provider,
      userId: Number(id),
    },
  });
  return newToken;
};

export default createOnRampTransaction;
