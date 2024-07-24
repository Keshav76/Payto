import { getServerSession } from "next-auth";
import authOptions, { Session } from "../lib/auth";
import { redirect } from "next/navigation";
import BankTransferClient from "./BankTransferClient";
import {
  getBalance,
  getOffRampTransactions,
  getOnRampTransactions,
} from "../lib/actions/bankTransfer";

const Transfer = async function () {
  const session: Session = await getServerSession(authOptions);
  if (!session) return redirect("/api/auth/signin");
  const userId = session.user.id;

  const balance = await getBalance(userId);
  const onRampTransactions = await getOnRampTransactions(userId);
  const offRampTransactions = await getOffRampTransactions(userId);

  return (
    <BankTransferClient
      id={userId}
      balance={balance}
      onRampTransactions={onRampTransactions}
      offRampTransactions={offRampTransactions}
    />
  );
};

export default Transfer;
