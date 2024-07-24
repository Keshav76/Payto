import { ReactNode } from "react";

interface CenterProps {
  children: ReactNode;
}
function Center({ children }: CenterProps) {
  return (
    <div className="flex items-center justify-center h-full"> {children} </div>
  );
}
export default Center;
