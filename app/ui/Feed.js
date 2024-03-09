"use client";
import {
  SparklesIcon,
  MenuIcon,
  LoginIcon,
  LogoutIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/outline";
import React, { use, useEffect, useState } from "react";
import Input from "./Input";
import Post from "./Post";
import { Suspense } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeState } from "@/atoms/modalAtom";

const Feed = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? " border-gray-800" : " border-gray-200"
      } sm:border-r sm:border-l xl:ml-[420px] xl:min-w-[600px] sm:ml-[73px] flex-grow max-w-xl overflow-hidden`}
    >
      <div
        className={`${
          theme === "dark"
            ? " bg-black border-gray-600"
            : " bg-white border-gray-200"
        } flex py-2 px-3 sticky top-0 z-50 border-b justify-center items-center`}
      >
        {isSidebarOpen ? (
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`${
              theme === "dark" ? "darkHoverEffect" : "hoverEffect"
            } flex items-center justify-center px-0 w-9 h-9 xl:hidden`}
          >
            <MenuIcon className=" h-5" />
          </div>
        ) : (
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`${
              theme === "dark" ? "darkHoverEffect" : "hoverEffect"
            } flex items-center justify-center px-0 w-9 h-9 xl:hidden`}
          >
            <MenuIcon className=" h-5" />
          </div>
        )}
        <h2 className=" text-lg sm:text-xl font-bold cursor-pointer pt-1">
          Home
        </h2>
        <div className=" flex ml-auto space-x-3 justify-center items-center">
          {theme === "dark" ? (
            <SunIcon
              onClick={() => setTheme("light")}
              className={`darkHoverEffect flex items-center justify-center px-0 ml-auto w-7 h-7 xl:size-12 transition duration-300 ease-in-out`}
            />
          ) : (
            <MoonIcon
              onClick={() => setTheme("dark")}
              className={`hoverEffect flex items-center justify-center px-0 ml-auto w-7 h-7 xl:size-12 transition duration-300 ease-in-out`}
            />
          )}
          {session ? (
            <div
              onClick={signOut}
              className={`${
                theme === "dark" ? "darkHoverEffect" : "hoverEffect"
              } flex items-center justify-center px-0 ml-auto w-9 h-9`}
            >
              <LogoutIcon className=" h-5" />
            </div>
          ) : (
            <div
              onClick={signIn}
              className={`${
                theme === "dark" ? "darkHoverEffect" : "hoverEffect"
              } flex items-center justify-center px-0 ml-auto w-9 h-9`}
            >
              <LoginIcon className=" h-5" />
            </div>
          )}
        </div>
      </div>
      <Suspense fallback={<p>Loading input</p>}>
        <Input />
      </Suspense>
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Post key={post.id} id={post.id} post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Feed;
