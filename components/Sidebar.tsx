"use client";

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
import { cn } from "@/lib/utils"; // helper for classNames

type SidebarProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onNavigate: (view: string) => void;
  activeView: string;
  onCollapse?: (collapsed: boolean) => void;
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

export default function Sidebar({ open, setOpen, onNavigate, activeView, onCollapse }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Notify parent component of collapse state changes
  useEffect(() => {
    if (onCollapse) {
      onCollapse(collapsed);
    }
  }, [collapsed, onCollapse]);

  const handleClick = (view: string) => {
    onNavigate(view);
    setOpen(false); // auto-close mobile sidebar
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const SidebarContent = (
    <>
      {/* Collapse Button & Logo */}
      <div className="relative">
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-6 z-10 bg-white border border-gray-300 rounded-full shadow p-1 hover:bg-gray-100 hidden lg:block"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <div className={cn(
          "p-6 flex items-center text-indigo-600 text-xl font-bold transition-all duration-300",
          collapsed ? "gap-0 justify-center" : "gap-2"
        )}>
          <Image
            src="/logos/logod.svg"
            alt="Logo"
            width={collapsed ? 24 : 28}
            height={collapsed ? 24 : 28}
          />
          {!collapsed && <span>QR GEN</span>}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="px-4 pb-20 overflow-y-auto">
        {[...menuItemsTop, ...menuItemsBottom].map((item) => {
          const isActive = activeView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => handleClick(item.view)}
              className={cn(
                "w-full text-left rounded-md transition-colors flex items-center",
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600 pl-2"
                  : "text-gray-700 hover:bg-gray-100 border-l-4 border-transparent pl-2",
                collapsed && "justify-center pl-0 border-l-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              <SidebarItem
                icon={item.icon}
                label={item.label}
                href="#"
                collapsed={collapsed}
              />
            </button>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "bg-white h-screen lg:flex flex-col shadow-2xs border-r border-gray-300 justify-between hidden transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {SidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-white bg-opacity-80 z-40 lg:hidden transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
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