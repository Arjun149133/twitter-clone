import Feed from "./ui/Feed";
import Sidebar from "./ui/Sidebar";

export default function Home() {
  return (
    <main className=" flex min-h-screen max-w-7xl mx-auto">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed />
    </main>
  );
}
