"use client";
import { themeState } from "@/atoms/modalAtom";
import { SearchIcon } from "@heroicons/react/outline";
import { useRecoilValue } from "recoil";
// import React, { useState } from "react";
// import RandomUsersList from "../utils/RandomUsersList";

export const Widgets = () => {
  // const [randomUserNum, setRandomUserNum] = useState(3);
  const theme = useRecoilValue(themeState);
  return (
    <div className=" xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div
        className={`${
          theme === "dark" ? " bg-black" : " bg-white"
        } w-[90%] xl:w-[75%] sticky top-0 py-1.5 z-50`}
      >
        <div
          className={`${
            theme === "dark" ? " text-white" : " text-gray-500"
          } flex items-center p-3 rounded-full relative`}
        >
          <SearchIcon className={`h-5 z-50`} />
          <input
            type="text"
            placeholder="Search Twitter"
            className={`${
              theme === "dark"
                ? " text-white bg-black focus:bg-black"
                : " text-gray-700 bg-gray-100 focus:bg-white"
            } absolute border-gray-500 inset-0 rounded-full pl-11 focus:shadow-lg `}
          />
        </div>
      </div>
      <div
        className={`${
          theme === "dark"
            ? " text-white bg-black"
            : " text-gray-700 bg-gray-100"
        } space-y-3 pt-2 rounded-xl w-[90%] xl:w-[75%]`}
      >
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
