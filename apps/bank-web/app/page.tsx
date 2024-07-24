"use client";
import Center from "@repo/ui/Center";
import Loader from "@repo/ui/Loader";
import { useState } from "react";

export default function Bank() {
  if (typeof window === "undefined") return null;
  const token = new URLSearchParams(window.location.search).get("token");
  const userId = new URLSearchParams(window.location.search).get("userID");
  const amount = new URLSearchParams(window.location.search).get("amount");
  const [loading, setLoading] = useState(false);

  function handler() {
    setLoading(true);
    fetch("http://localhost:3002/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, userId, amount }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Captured")
          window.location.href = "http://localhost:3001";
        else if (confirm("Transaction failed. Try again?")) handler();
      })
      .catch((e) => /*setTimeout(handler, 1000)*/{})
      .finally(() => setLoading(false));
  }

  return (
    <div className="h-screen w-screen">
      <Center>
        <button
          onClick={handler}
          type="button"
          className=" flex items-center justify-between gap-4 p-2 text-3xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 "
        >
          Authorize {loading && <Loader />}
        </button>
      </Center>
    </div>
  );
}
