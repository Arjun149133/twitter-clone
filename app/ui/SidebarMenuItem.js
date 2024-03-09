"use client";
import { themeState } from "@/atoms/modalAtom"
import { useRecoilValue } from "recoil"

const SidebarMenuItem = ({text, Icon, active}) => {
  const theme = useRecoilValue(themeState);
  return (
    <div className={`${
      theme === "dark"
        ? " text-white darkHoverEffect"
        : "text-gray-700 hoverEffect"
    } flex items-center justify-center xl:justify-start text-lg space-x-3`}>
        <Icon className="h-7" />
        <span className={`${active && " font-bold"} hidden xl:inline`}>{text}</span>
    </div>
  )
}

export default SidebarMenuItem