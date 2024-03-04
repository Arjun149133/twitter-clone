import { SparklesIcon } from "@heroicons/react/outline";
import React from "react";
import Input from "./Input";
import Post from "./Post";

const Feed = () => {
  const posts = [
    {
      id: "1",
      name: "Arjun",
      username: "arjun",
      userImg: "http://localhost:3000/twitter.svg",
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW5zfGVufDB8fDB8fHww",
      text: "Nice view",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "Arjun",
      username: "arjun",
      userImg: "http://localhost:3000/twitter.svg",
      img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Cinema!!",
      timestamp: "2 days ago",
    },
  ];
  return (
    <div className=" xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl border-gray-200">
      <div className=" flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className=" text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className=" hoverEffect items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className=" h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post}/>
      ))}
    </div>
  );
};

export default Feed;
