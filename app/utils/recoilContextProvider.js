"use client";
import { RecoilRoot } from "recoil";

export default function RecoilContextProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
