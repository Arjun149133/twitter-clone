import { getServerSession } from "next-auth";
import Feed from "./ui/Feed";
import Sidebar from "./ui/Sidebar";
import { Widgets } from "./ui/Widgets";
import { signOut, useSession } from "next-auth/react";
import authConfig from "./utils/auth";

export default function Home() {
  return (
    <main className=" flex min-h-screen mx-auto">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed />
      {/* widgets  */}
      <Widgets />
    </main>
  );
}
