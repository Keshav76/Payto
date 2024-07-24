import { ReactNode } from "react";
import AppBarClient from "../components/AppBarClient";
import Sidebar from "../components/Sidebar";
interface Props {
  children: ReactNode;
}
function layout({ children }: Props) {
  return (
    <>
      <AppBarClient />
      <div className="grid grid-cols-6 h-[calc(100vh_-_60px)]">
        <Sidebar />
        <div className="col-span-5 h-full overflow-y-scroll overflow-x-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
export default layout;
