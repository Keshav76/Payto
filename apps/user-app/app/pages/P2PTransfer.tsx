"use client";

import Loader from "@repo/ui/Loader";
import TextBox from "@repo/ui/TextBox";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import getUsersDetail from "../lib/actions/getUsers";
import transferMoney from "../lib/actions/transferMoney";
import { TransactionCategory } from ".prisma/client";

function P2PTransfer() {
  const router = useRouter();
  const [phone, setPhone] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [category, setCategory] = useState<TransactionCategory>(
    TransactionCategory.Miscellaneous
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const session = useSession();
  const sendHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!session.data || !session.data.user) return;
    setLoading(true);
    setErrorMessage("");

    const userToSend = await getUsersDetail(phone.toString());
    if (!userToSend) {
      setLoading(false);
      return setErrorMessage("No such users");
    }
    if (amount <= 0) {
      setLoading(false);
      return setErrorMessage("Invalid amount");
    }
    const question = `Send ₹${amount} to ${userToSend?.name || userToSend?.number}`;
    if (!confirm(question)) {
      setLoading(false);
      return setErrorMessage("User Canceled Request");
    }
    const msg = await transferMoney(userToSend.id, amount, message, category);
    if (msg !== "success") {
      setLoading(false);
      return setErrorMessage(msg);
    } else router.push("/");
    setLoading(false);
  };
  return (
    <div className="h-full flex items-center justify-center">
      <div className="border w-1/3 border-gray-400 rounded-md p-4 bg-gray-50">
        <div className="text-3xl w-full text-center font-bold p-2">
          Transfer
        </div>
        <form onSubmit={sendHandler}>
          <TextBox
            type="number"
            label="Phone Number"
            placeholder="9876543210"
            changeHandler={(val: number) => setPhone(val)}
          />
          <TextBox
            type="number"
            changeHandler={(val: number) => setAmount(val)}
            label="Amount"
            placeholder="100"
          />
          <TextBox
            type="text"
            label="Any Comments?"
            placeholder="---Your message here---"
            changeHandler={(val: string) => setMessage(val)}
          />
          <label
            className="block mt-2 text-sm font-medium text-gray-900"
            htmlFor="selectCategory"
          >
            Category
          </label>
          <select
            id="selectCategory"
            className="mt-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            // @ts-ignore
            onChange={(e) => setCategory(e.target.value)}
            defaultValue={"Miscellaneous"}
          >
            {Object.keys(TransactionCategory).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            disabled={loading}
            className="disabled:bg-gray-600 flex gap-4 items-center justify-center mt-4 bg-gray-900 border border-gray-700 text-gray-100 text-sm rounded-lg w-full p-2.5"
          >
            Send {loading && <Loader />}
          </button>
          <div
            className={
              (errorMessage.length ? "p-2 w-full" : "w-0") +
              " box-border text-ellipsis whitespace-nowrap m-auto overflow-hidden transition-[width] duration-[1s] bg-red-600 text-white text-center rounded-lg mt-2"
            }
          >
            {errorMessage}
          </div>
        </form>
      </div>
    </div>
  );
}
export default P2PTransfer;
