"use client";
import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { themeState } from "@/atoms/modalAtom";

const Sidebar = () => {
  const { data: session } = useSession();
  const theme = useRecoilValue(themeState);
  const router = useRouter();

  return (
    <div className=" hidden sm:flex flex-col p-2 xl:items-start fixed h-full max-h-full xl:ml-24 z-50">
      <div className={`${theme === "dark" ? "darkHoverEffect hover:bg-blue-950" : "hoverEffect hover:bg-blue-100"} p-0  xl:px-1`}>
        <Image src="/twitter.svg" width={50} height={50} alt="twitter"></Image>
      </div>
      <div className=" mt-4 mb-2.5 xl:items-start">
        <div onClick={() => router.push("/")}>
          <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        </div>
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarMenuItem text="Notifications" Icon={BellIcon} />
            <SidebarMenuItem text="Messages" Icon={InboxIcon} />
            <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItem text="Profile" Icon={UserIcon} />
            <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>

      {session ? (
        <>
          <button
            onClick={signOut}
            className=" bg-blue-500 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
          >
            Sign Out
          </button>

          <div onClick={signOut} className=" xl:hidden">
            <SidebarMenuItem text="signout" Icon={LogoutIcon} />
          </div>

          <div
            className={`${
              theme === "dark"
                ? " text-white darkHoverEffect"
                : "text-gray-700 hoverEffect"
            } flex  items-center justify-center xl:justify-start mt-auto`}
          >
            <Image
              src={session?.user.image}
              quality={100}
              alt="user"
              width={50}
              height={50}
              className=" h-10 w-10 rounded-full xl:mr-2"
            />
            <div className=" leading-5 hidden xl:inline">
              <h4 className=" font-bold">{session?.user.name} </h4>
              <p className=" text-gray-500 ">@a{session?.user.username} </p>
            </div>
            <DotsHorizontalIcon className=" h-5 xl:ml-8 hidden xl:inline" />
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className=" bg-blue-500 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Sidebar;
