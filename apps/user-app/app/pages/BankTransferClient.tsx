"use client";
import { useState } from "react";
import AddMoney from "../components/AddMoney";
import RemoveMoney from "../components/RemoveMoney";
import UserBalance from "../components/UserBalance";
import { TransactionStatus } from ".prisma/client";
import BankTransactionsList from "../components/BankTransactions";

interface TransactionType {
  time: Date;
  amount: number;
  status: TransactionStatus;
  provider: string;
}

interface BankTransferClientProps {
  id: string;
  onRampTransactions: TransactionType[];
  offRampTransactions: TransactionType[];
  balance: {
    amount: number;
    locked: number;
  };
}

function BankTransferClient({
  id,
  onRampTransactions,
  offRampTransactions,
  balance,
}: BankTransferClientProps) {
  const [add, setAdd] = useState<Boolean>(true);

  return (
    <div className="mx-4">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 py-4 w-full">
        <div>
          <div className="flex items-center justify-center gap-4 text-2xl mb-5">
            <div>Add</div>
            <button onClick={() => setAdd((p) => !p)}>
              <div
                className={
                  "rounded-full w-14 h-6 flex items-center transition-all " +
                  (add ? "bg-red-600" : "bg-emerald-600")
                }
              >
                <div
                  className={
                    "rounded-full size-5 aspect-square m-0.5 transition-all bg-white " +
                    (add ? "translate-x-0" : "translate-x-8")
                  }
                ></div>
              </div>
            </button>
            <div>Withdraw</div>
          </div>
          {add ? <AddMoney id={id} /> : <RemoveMoney id={id} />}
        </div>
        <div>
          <UserBalance amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            {add ? (
              <BankTransactionsList
                title="Recent Add Transactions"
                transactions={onRampTransactions}
              />
            ) : (
              <BankTransactionsList
                title="Recent Withdraw Transactions"
                transactions={offRampTransactions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BankTransferClient;
