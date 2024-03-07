"use client";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import CommentModel from "../../ui/CommentModel";
import Sidebar from "../../ui/Sidebar";
import { Widgets } from "../../ui/Widgets";
import { usePathname, useRouter } from "next/navigation";
import Post from "../../ui/Post";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default async function Page() {
  const router = useRouter();
  const path = usePathname();
  const id = path.split("/")[2];
  const [post, setPost] = useState(null);

  useEffect(
    () => onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot)),
    [db]
  );
  return (
    <main className=" flex min-h-screen mx-auto">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <div className=" xl:ml-[420px] border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl border-gray-200">
        <div className=" flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 items-center">
          <div className=" flex justify-center items-center space-x-2">
            <div className="hoverEffect flex items-center justify-center">
              <ArrowNarrowLeftIcon
                onClick={() => router.push("/")}
                className=" h-5"
              />
            </div>
            <h2 className=" text-lg sm:text-xl font-bold cursor-pointer">
              Tweet
            </h2>
          </div>
        </div>
        <Post id={id} post={post} />
      </div>

      {/* widgets  */}
      <Widgets />
      {/* commentModel  */}
      <CommentModel />
    </main>
  );
}
