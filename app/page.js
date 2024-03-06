import { getServerSession } from "next-auth";
import Feed from "./ui/Feed";
import Sidebar from "./ui/Sidebar";
import { Widgets } from "./ui/Widgets";
import authConfig from "./utils/auth";
import CommentModel from "./ui/CommentModel";

export default async function Home() {
  const session = await getServerSession(authConfig);

  // if (!session) redirect("/auth/signin");
  return (
    <main className=" flex min-h-screen mx-auto">
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
