import { TransactionStatus } from "@repo/db/client";
import Card from "@repo/ui/Card";

export interface TransactionType {
  time: Date;
  amount: number;
  status: TransactionStatus;
  provider: string;
}

interface OnRampProps {
  title: string;
  transactions: TransactionType[];
}
const BankTransactionsList = ({ title, transactions }: OnRampProps) => {
  if (!transactions.length) {
    return (
      <Card title={title}>
        <div className="text-center px-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title={title}>
      <div className="pt-2">
        {transactions.map((t, ind) => (
          <Transaction
            amount={t.amount}
            status={t.status}
            provider={t.provider}
            time={t.time}
            key={"transaction-" + ind}
          />
        ))}
      </div>
    </Card>
  );
};

export default BankTransactionsList;

const Transaction = ({ amount, status, time }: TransactionType) => {
  const textColor =
    status === "Processing"
      ? "text-gray-500"
      : status === "Success"
        ? "text-green-500"
        : "text-red-500";
  return (
    <div className={textColor + " flex justify-between"} title={status}>
      <div>
        <div className="text-sm">Received INR</div>
        <div className="text-xs">{time.toDateString()}</div>
      </div>
      <div className="flex flex-col justify-center">+ Rs {amount / 100}</div>
    </div>
  );
};
