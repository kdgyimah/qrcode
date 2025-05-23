"use client";

import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";

type HeaderProps = {
  setSidebarOpen: (open: boolean) => void;
};

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="h-16 z-10 bg-white px-4 md:px-6 flex items-center justify-between">
      {/* Left side: Hamburger + Button */}
      <div className="flex items-center gap-3">
        {/* Hamburger only on mobile */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setSidebarOpen(true)}
        >
          <RxHamburgerMenu size={24} />
        </button>

        {/* Action Button - visible on md+ */}
        <button className="hidden md:flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-indigo-100">
          <Image
            src="/icons/crown.svg"
            alt="Crown"
            width={16}
            height={16}
            className="text-white" // if needed to show white crown
          />
          <span className="text-black font-medium">Upgrade to Pro</span>
        </button>
      </div>

      {/* Right side: Notification + Profile */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-gray-800">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/images/img2.jpg"
            alt="User"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div className="hidden sm:block leading-tight text-sm text-left">
            <div className="font-medium text-gray-800">Daniel Essel</div>
            <div className="text-gray-500 text-xs">Admin</div>
          </div>
          <ChevronDown size={20}className="text-gray-600 border-1 rounded-full p-1" />
        </div>
      </div>
    </header>  
  );
}
