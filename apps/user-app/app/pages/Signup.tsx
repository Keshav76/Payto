"use client";
import TextBox from "@repo/ui/TextBox";
import Loader from "@repo/ui/Loader";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createUser, deleteUser, verifyUser } from "../lib/actions/createUser";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import auth from "../../firebase.config";
import OTPInput from "react-otp-input";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}

type PageOptions = "Signup" | "OTP";

const SignUp = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [userId, setUserId] = useState<number>(-1);
  const [page, setPage] = useState<PageOptions>("Signup");
  const [loading, setLoading] = useState(false);

  function onCaptchVerify() {
    if (window.recaptchaVerifier) return;
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible", callback: () => {} }
    );
  }

  async function onOTPVerify() {
    setLoading(true);
    try {
      window.confirmationResult.confirm(otp).then(async () => {
        setLoading(false);
        verifyUser(userId);
        router.push("/signin");
      });
    } catch (err) {
      setErrorMessage("Error while OTP Verification");
      await deleteUser(userId);
      setLoading(false);
      setPage("Signup");
    }
  }

  const handlerSignup = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const { msg, id } = await createUser({ name, email, number, password });
    if (msg !== "success") {
      setLoading(false);
      return setErrorMessage(msg);
    }
    setUserId(id);

    const appVerifier = window.recaptchaVerifier;
    const extendedPhoneNumber = "+91" + number;

    onCaptchVerify(); //initailize recaptcha
    signInWithPhoneNumber(auth, extendedPhoneNumber, appVerifier) //send otp
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setPage("OTP");
      })
      .catch(async (err) => {
        console.log(err);
        const a = await deleteUser(userId);
        console.log(a);
        setErrorMessage("Error in sending otp");
        setLoading(false);
      });
  };

  return (
    <div className="h-full flex items-center justify-center">
      {page === "Signup" && (
        <div className="border w-1/3 border-gray-400 rounded-md p-4 bg-gray-50">
          <div className="text-3xl w-full text-center font-bold p-2">
            Signup
          </div>

          <form className="" onSubmit={handlerSignup}>
            <TextBox
              type="email"
              changeHandler={(val: string) => setEmail(val)}
              label="Email"
              placeholder="john.doe@gmail.com"
            />
            <TextBox
              type="text"
              changeHandler={(val: string) => setName(val)}
              label="Name"
              placeholder="John Doe"
            />
            <TextBox
              type="number"
              label="Phone Number"
              placeholder="9876543210"
              changeHandler={(val: string) => setNumber(Number(val))}
            />
            <TextBox
              type="password"
              changeHandler={(val: string) => setPassword(val)}
              label="Password"
              placeholder="Password"
            />
            <div
              id="recaptcha-container"
              className="w-full flex items-center"
            />
            <button className="flex gap-4 mt-4 bg-gray-900 border border-gray-700 text-gray-100 text-sm rounded-lg items-center justify-center w-full p-2.5">
              Submit
              {loading && <Loader />}
            </button>
            <div className="w-full text-sm text-center mt-2">
              Don't have an account yet?{" "}
              <button
                className="cursor-pointer underline"
                onClick={() => router.push("/signin")}
              >
                Sign In
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
          </form>
        </div>
      )}
      {page === "OTP" && (
        <div className="border  border-gray-400 rounded-md p-4 bg-gray-50">
          <div className="text-3xl w-full text-center font-bold p-2 mb-10">
            OTP
          </div>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{
              border: "1px solid black",
              width: "40px",
              aspectRatio: "1/1",
              marginInline: "4px",
              borderRadius: "4px",
            }}
            inputType="number"
            renderInput={(props) => <input {...props} />}
          />
          <button
            onClick={onOTPVerify}
            className="flex gap-4 mt-4 bg-gray-900 border border-gray-700 text-gray-100 text-sm rounded-lg items-center justify-center w-full p-2.5"
          >
            Submit
            {loading && <Loader />}
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
