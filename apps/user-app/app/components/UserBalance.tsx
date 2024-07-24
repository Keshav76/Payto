import Card from "@repo/ui/Card";

interface UserBalanceProps {
  amount: number;
  locked: number;
}
const UserBalance = ({ amount, locked }: UserBalanceProps) => {
  return (
    <Card title={"Balance"}>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Unlocked balance</div>
        <div>₹{amount / 100}</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Locked Balance</div>
        <div>₹{locked / 100}</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Balance</div>
        <div>₹{(locked + amount) / 100}</div>
      </div>
    </Card>
  );
};

export default UserBalance;
