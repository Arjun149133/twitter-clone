"use client";
import Feed from "./ui/Feed";
import Sidebar from "./ui/Sidebar";
import { Widgets } from "./ui/Widgets";
import CommentModel from "./ui/CommentModel";
import { useRecoilValue } from "recoil";
import { themeState } from "@/atoms/modalAtom";

export default async function Home() {
  const theme = useRecoilValue(themeState);
  return (
    <main
      className={`${
        theme == "dark" ? " bg-black text-white" : ""
      } flex min-h-screen mx-auto`}
    >
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed />
      {/* widgets  */}
      <Widgets />
      {/* commentModel  */}
      <CommentModel />
    </main>
  );
}
