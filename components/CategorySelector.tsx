"use client";

import {
  QrCode,
  Phone,
  Mail,
  Wifi,
  Image,
  Video,
  FileText,
  MessageSquareText,
  MessageCircle,
  Users,
  AppWindow,
  CalendarDays,
  Barcode,
} from "lucide-react";
import type { ReactElement } from "react";

interface Category {
  id: string;
  name: string;
  icon: ReactElement;
}

interface CategorySelectorProps {
  selected: string;
  onSelect: (categoryId: string) => void;
}

export default function CategorySelector({
  selected,
  onSelect,
}: CategorySelectorProps) {
  const categoryList: Category[] = [
    { id: "link", name: "Link", icon: <QrCode size={28} /> },
    { id: "call", name: "Call", icon: <Phone size={28} /> },
    { id: "mail", name: "Email", icon: <Mail size={28} /> },
    { id: "sms", name: "SMS", icon: <MessageSquareText size={28} /> },
    { id: "whatsapp", name: "WhatsApp", icon: <MessageCircle size={28} /> },
    { id: "wifi", name: "WiFi", icon: <Wifi size={28} /> },
    { id: "image", name: "Image", icon: <Image size={28} /> },
    { id: "video", name: "Video", icon: <Video size={28} /> },
    { id: "bulkqr", name: "Bulk QR", icon: <QrCode size={28} /> },
    { id: "app", name: "App", icon: <AppWindow size={28} /> },
    { id: "social", name: "Social Media", icon: <Users size={28} /> },
    { id: "event", name: "Event", icon: <CalendarDays size={28} /> },
    { id: "barcode2d", name: "2D Barcode", icon: <Barcode size={28} /> },
    { id: "pdf", name: "PDF", icon: <FileText size={28} /> },
    { id: "contact", name: "Contact", icon: <Users size={28} /> },
  ];

  return (
    <div className="bg-white shadow-lg p-4 rounded-sm">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
  {categoryList.map(({ id, name, icon }) => {
    const isSelected = selected === id;
    return (
      <button
        key={id}
        type="button"
        aria-pressed={isSelected}
        aria-label={name}
        onClick={() => onSelect(id)}
        className={`w-full rounded-md p-3 flex items-center justify-center gap-2
          transition-all duration-200 ease-in-out transform hover:scale-105
          ${isSelected 
            ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500 font-semibold' 
            : 'bg-white text-black hover:bg-blue-50 hover:text-blue-500 hover:ring-1 hover:ring-blue-300'}
        `}
      >
        <div className={`text-2xl transition-colors duration-200 ${isSelected ? 'text-blue-600' : 'text-black'}`}>
          {icon}
        </div>
        <div className="text-sm">
          {name}
        </div>
      </button>
    );
  })}
</div>

    </div>
  );
}
