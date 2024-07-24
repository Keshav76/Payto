import { TransactionCategory } from "@repo/db/client";
import { getServerSession } from "next-auth";
import authOptions, { Session } from "../lib/auth";
import { redirect } from "next/navigation";
import { ChatIcon } from "../components/Icons";
import getTransactionsList from "../lib/actions/transactionsList";

async function Transactions() {
  const session: Session = await getServerSession(authOptions);
  if (!session) redirect("/signin");
  const userId = Number(session.user.id);

  const transactionList = await getTransactionsList(userId);

  return (
    <div className="mx-4">
      <div className="border-b border-gray-300 my-5 py-4 text-4xl text-[#6a51a6] font-bold">
        Transactions
      </div>
      <div className="">
        {transactionList.reverse().map((txn, ind) => {
          const person = txn.fromId === userId ? txn.to.name : txn.from.name;
          return (
            <Transaction
              key={`transaction ${ind}`}
              person={person}
              timestamp={txn.time}
              amount={Number(txn.amount) / 100}
              recieved={txn.toId === userId}
              category={txn.category}
              message={txn.message}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Transactions;

interface TransactionType {
  person: string;
  timestamp: Date;
  amount: Number;
  recieved: Boolean;
  message: string;
  category: TransactionCategory;
}

const Transaction = ({
  person,
  timestamp,
  amount,
  recieved,
  category,
  message,
}: TransactionType) => {
  let color = "black";
  if (category === "Bill") color = "red-600";
  else if (category === "Entertainment") color = "yellow-600";
  else if (category === "Food") color = "green-600";
  else if (category === "Household") color = "blue-600";
  else if (category === "Recharge") color = "indigo-600";
  else if (category === "Transportation") color = "pink-600";
  else if (category === "Utility") color = "purple-600";
  else if (category === "Miscellaneous") color = "emerald-600";
  else color = "gray-600";

  return (
    <div className="grid grid-cols-3 gap-2 items-center bg-slate-50 rounded-lg my-2 p-3 w-full text-gray-900">
      <div>
        <div>{person[0]?.toUpperCase() + person.slice(1)}</div>
        <div title={timestamp.toTimeString()} className="text-xs text-gray-600">
          {timestamp.toDateString()}
        </div>
        {message.length && message !== "Miscellaneous" && (
          <div className="text-xs text-gray-600 flex gap-2 items-center mt-2">
            <div className="size-4">
              <ChatIcon />
            </div>
            <div className="text-justify">{message}</div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <div
          className={`border border-${color} rounded-full items-center justify-center h-6 inline-flex`}
        >
          <div className={`rounded-full aspect-square h-4 ml-1 bg-${color}`} />
          <div className="px-2 text-sm">{category}</div>
        </div>
      </div>
      <div
        className={
          "flex justify-end " + (recieved ? "text-green-600" : "text-red-600")
        }
      >
        {recieved ? "+" : "-"} {" ₹ " + amount.toString()}
      </div>
    </div>
  );
};
