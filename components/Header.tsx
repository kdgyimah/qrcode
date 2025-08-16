"use client";

import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

type HeaderProps = {
  setSidebarOpen: (open: boolean) => void;
  onLogout?: () => void;
};

export default function Header({ setSidebarOpen, onLogout }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useUser();

  const fullName = user?.user_metadata?.full_name ?? "Guest";
  const avatarUrl = user?.user_metadata?.avatar_url ?? "/images/img2.jpg";

  return (
    <header className="h-16 z-10 bg-white px-4 md:px-6 flex items-center justify-between shadow-sm">
      {/* Left: Hamburger + Upgrade Button */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden text-gray-600"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <RxHamburgerMenu size={24} />
        </button>

        {/* Upgrade to Pro */}
        <Link
          href="/pricing"
          className="hidden md:flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-indigo-100 transition-colors"
        >
          <Image src="/icons/crown.svg" alt="Crown" width={16} height={16} />
          <span className="text-black font-medium">Upgrade to Pro</span>
        </Link>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="relative flex items-center gap-4">
        {/* Notifications */}
        <button
          type="button"
          className="relative text-gray-600 hover:text-gray-800"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile Dropdown Trigger */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <Image
              src={avatarUrl}
              alt="User Avatar"
              width={30}
              height={30}
              className="rounded-full object-cover"
            />
            <div className="hidden sm:block leading-tight text-sm text-left">
              <div className="font-medium text-gray-800">{fullName}</div>
              <div className="text-gray-500 text-xs">Admin</div>
            </div>
            <ChevronDown
              size={20}
              className="text-gray-600 border rounded-full p-1"
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-12 bg-white shadow-lg border rounded-md w-48 py-2 z-50">
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
