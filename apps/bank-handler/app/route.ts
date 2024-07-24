import db from "@repo/db/client";
import { NextRequest } from "next/server";

type PaymentType = {
  token: string;
  userId: string;
  amount: string;
};

export async function POST(req: NextRequest) {
  const { token, userId, amount } = await req.json();
  try {
    const paymentInfo: PaymentType = { token, userId, amount };

    const data = await db.onRampTransaction.findFirst({
      where: { token: paymentInfo.token },
    });

    if (!data) return Response.json({ message: "No such request exists" });

    if (data?.status !== "Processing")
      return Response.json({ message: "Captured" });

    try {
      await db.$transaction([
        db.user.update({
          where: { id: Number(paymentInfo.userId) },
          data: { balance: { increment: Number(paymentInfo.amount) * 100 } },
        }),

        db.onRampTransaction.update({
          where: { token: paymentInfo.token },
          data: { status: "Success" },
        }),
      ]);

      return Response.json({ message: "Captured" });
    } catch (e) {}

    await db.onRampTransaction.update({
      where: { token: paymentInfo.token },
      data: { status: "Failed" },
    });

    return Response.json({ message: "Failed" });
  } catch (e) {
    return Response.json({ message: "Failed" });
  }
}
