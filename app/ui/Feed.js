"use client";
import { SparklesIcon, MenuIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import Post from "./Post";
import { Suspense } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <div className=" xl:ml-[420px] border-l border-r xl:min-w-[600px] sm:ml-[73px] flex-grow max-w-xl border-gray-200 overflow-hidden">
      <div className=" flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        {isSidebarOpen ? (
          <>
            <p>hello</p>
          </>
        ) : (
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className=" flex hoverEffect items-center justify-center px-0 w-9 h-9"
          >
            <MenuIcon className=" h-5" />
          </div>
        )}
        <h2 className=" text-lg sm:text-xl font-bold cursor-pointer pt-1">
          Home
        </h2>
        <div className=" flex hoverEffect items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className=" h-5" />
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
