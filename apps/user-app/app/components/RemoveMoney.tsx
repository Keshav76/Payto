"use client";

import Button from "@repo/ui/Button";
import Card from "@repo/ui/Card";
import Select from "@repo/ui/Select";
import TextBox from "@repo/ui/TextBox";
import { useRouter } from "next/navigation";
import { useState } from "react";
import createOffRampTransaction from "../lib/actions/createOffRamp";
import { SUPPORTED_BANKS } from "../lib/constants";

interface RemoveMoneyProps {
  id: string;
}
function RemoveMoney({ id }: RemoveMoneyProps) {
  const router = useRouter();

  const [redirectUrl, setRedirectUrl] = useState<string>(
    SUPPORTED_BANKS[0]?.redirectUrl || ""
  );
  const [provider, setProvider] = useState<string>(
    SUPPORTED_BANKS[0]?.name || ""
  );
  const [amount, setAmount] = useState<number>(0);
  return (
    <Card title="Withdraw Money">
      <div className="w-full">
        <TextBox
          type="text"
          label={"Amount"}
          placeholder={"Amount"}
          changeHandler={(val: string) => setAmount(Number(val))}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          changeHandler={(value: string) => {
            setProvider(value);
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => {
              createOffRampTransaction(id, amount, provider);
              //todo add redirect-url
              // router.push(redirectUrl || "");
              router.push("/dashboard");
            }}
          >
            Withdraw Money
          </Button>
        </div>
      </div>
    </Card>
  );
}
export default RemoveMoney;
