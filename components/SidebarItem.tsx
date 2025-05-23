'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  collapsed?: boolean;
}

export default function SidebarItem({ icon, label, href, collapsed = false }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-2 mb-2 rounded-lg transition-all ${
        isActive
          ? 'bg-indigo-100 text-indigo-600 font-semibold'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className={`shrink-0 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
        {icon}
      </span>
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
