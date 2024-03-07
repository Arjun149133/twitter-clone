import Feed from "./ui/Feed";
import Sidebar from "./ui/Sidebar";
import { Widgets } from "./ui/Widgets";
import CommentModel from "./ui/CommentModel";

export default async function Home() {
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
