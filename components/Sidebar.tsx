'use client';

import {
  QrCode,
  BarChart2,
  Users,
  Code,
  Layers,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useState, useEffect } from "react";
import Image from "next/image";

type SidebarProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onNavigate: (view: string) => void;
};

const menuItemsTop = [
  { icon: <QrCode size={18} />, label: "My QR Codes", view: "my-qrs" },
  { icon: <BarChart2 size={18} />, label: "Analytics", view: "analytics" },
  { icon: <Layers size={18} />, label: "Bulk QR Codes", view: "bulk" },
  { icon: <Code size={18} />, label: "API Integration", view: "api" },
  { icon: <Users size={18} />, label: "Team", view: "team" },
];

const menuItemsBottom = [
  { icon: <Settings size={18} />, label: "Settings", view: "settings" },
  { icon: <HelpCircle size={18} />, label: "Support", view: "support" },
];

export default function Sidebar({ open, setOpen, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const SidebarContent = (
    <>
      {/* Collapse Button & Logo */}
      <div className="relative">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 z-10 bg-white border border-gray-300 rounded-l-full shadow p-1 hover:bg-gray-100 hidden md:block"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <div className="p-6 flex items-center text-indigo-600 text-xl font-bold gap-2">
          <Image
            src="/logos/logod.svg"
            alt="Logo"
            width={collapsed ? 24 : 28}
            height={collapsed ? 24 : 28}
          />
          {!collapsed && "QR GEN"}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="px-4 pb-20 overflow-y-auto">
        {menuItemsTop.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.view)}
            className="w-full text-left"
          >
            <SidebarItem icon={item.icon} label={item.label} href="#" collapsed={collapsed} />
          </button>
        ))}
        <hr className="my-10 border-gray-200" />
        {menuItemsBottom.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.view)}
            className="w-full text-left"
          >
            <SidebarItem icon={item.icon} label={item.label} href="#" collapsed={collapsed} />
          </button>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`bg-white h-screen md:flex flex-col shadow-2xs border-r border-gray-300 justify-between hidden transition-all duration-300 ${
          collapsed ? "w-15" : "w-60"
        }`}
      >
        {SidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Image src="/logos/logod.svg" alt="Logo" width={28} height={28} />
          <button onClick={() => setOpen(false)}>
            <X className="text-gray-600" size={20} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-64px)]">{SidebarContent}</div>
      </aside>
    </>
  );
}
