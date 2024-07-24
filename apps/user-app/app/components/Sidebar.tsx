import { HomeIcon, TransactionsIcon, TransferIcon, UsersIcon } from "./Icons";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <div className="border-r border-slate-300 pt-28 h-full">
      <SidebarItem href="/dashboard" icon={<HomeIcon />} title="Home" />
      <SidebarItem href="/bank" icon={<TransferIcon />} title="Bank Transfer" />
      <SidebarItem href="/p2p" icon={<UsersIcon />} title="P2P Transfer" />
      <SidebarItem
        href="/transactions"
        icon={<TransactionsIcon />}
        title="Transactions"
      />
    </div>
  );
}
export default Sidebar;
