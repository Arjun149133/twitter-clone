"use client"
import { SparklesIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import Post from "./Post";
import { Suspense } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <div className=" xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl border-gray-200">
      <div className=" flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className=" text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className=" hoverEffect items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className=" h-5" />
        </div>
      </div>
      <Suspense fallback={<p>Loading input</p>}>
        <Input />
      </Suspense>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
