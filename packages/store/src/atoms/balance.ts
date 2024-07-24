import { atom } from "recoil";

const balanceAtom = atom<number>({
  key: "balance",
  default: 0,
});
export default balanceAtom;
