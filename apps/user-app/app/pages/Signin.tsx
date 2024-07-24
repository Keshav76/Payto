"use client";
import Loader from "@repo/ui/Loader";
import TextBox from "@repo/ui/TextBox";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const [phone, setPhone] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const signinHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    signIn("credentials", { phone, password, redirect: false }).then((e) => {
      setLoading(false);
      if (e?.ok) return router.push("/dashboard");
      setErrorMessage(e?.error || "");
    });
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="border w-1/3 border-gray-400 rounded-md p-4 bg-gray-50">
        <div className="text-3xl w-full text-left font-bold p-2 pl-0">
          Sign In
        </div>
        <div>
          <form onSubmit={signinHandler}>
            <TextBox
              type="number"
              label="Phone Number"
              placeholder="9876543210"
              changeHandler={(val: number) => setPhone(val)}
            />
            <TextBox
              type="password"
              changeHandler={(val: string) => setPassword(val)}
              label="Password"
              placeholder="Password"
            />
            <button className="flex gap-4 items-center justify-center mt-4 bg-gray-900 border border-gray-700 text-gray-100 text-sm rounded-lg w-full p-2.5">
              Submit {loading && <Loader />}
            </button>
          </form>
          <div className="w-full text-sm text-center mt-2">
            Don't have an account yet?{" "}
            <button
              className="cursor-pointer underline"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </button>
          </div>
          <div
            className={
              (errorMessage.length ? "p-2 w-full" : "w-0") +
              " box-border text-ellipsis whitespace-nowrap m-auto overflow-hidden transition-[width] duration-[1s] bg-red-600 text-white text-center rounded-lg mt-2"
            }
          >
            {errorMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
