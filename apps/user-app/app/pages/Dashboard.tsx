import { getServerSession } from "next-auth";
import authOptions, { Session } from "../lib/auth";
import { redirect } from "next/navigation";
import { getBalance } from "../lib/actions/bankTransfer";

async function Dashboard() {
  const session: Session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const { amount, locked } = await getBalance(session.user.id);
  return (
    <div>
      <div className="text-4xl font-bold tracking-tighter flex gap-1 m-10">
        Welcome <div className="text-green-500 ml-4">{session.user.name}!</div>
      </div>
      <div className="ml-10  font-bold tracking-tight text-xl">
        <div className="flex gap-1">
          You have
          <div className="text-green-500">₹ {(amount / 100).toFixed(1)}</div> in
          your wallet.
        </div>
        {locked > 0 ? (
          <div className="flex gap-1">
            You have
            <div className="text-green-500">₹ {(locked / 100).toFixed(1)}</div>
            in your savings account.
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default Dashboard;
