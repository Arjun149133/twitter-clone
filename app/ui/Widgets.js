"use client";
import { SearchIcon } from "@heroicons/react/outline";
// import React, { useState } from "react";
// import RandomUsersList from "../utils/RandomUsersList";

export const Widgets = () => {
  // const [randomUserNum, setRandomUserNum] = useState(3);
  return (
    <div className=" xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className=" w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className=" flex items-center p-3 rounded-full relative">
          <SearchIcon className=" h-5 z-50 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className=" absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100"
          />
        </div>
      </div>
      <div className=" text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]">
        <h4 className=" font-bold text-xl px-4">Who to follow</h4>
        {/* <RandomUsersList randmUserNum={randomUserNum} />
        <button
          onClick={() => {
            setRandomUserNum(randomUserNum + 3);
            console.log(randomUserNum);
          }}
          className=" text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button> */}
      </div>
    </div>
  );
};
