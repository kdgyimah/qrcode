"use client";

import {
  QrCode,
  Phone,
  Mail,
  Wifi,
  Video,
  FileText,
  MessageSquareText,
  MessageCircle,
  Users,
  AppWindow,
  CalendarDays,
  Barcode,
  ImageIcon,
  Globe,
} from "lucide-react";

import type { ReactElement } from "react";
import type { Category } from "@/types/Category"; // ✅ Using your string union

// Define structure for local display, but only pass Category as selected/onSelect
interface CategoryOption {
  id: Category;
  name: string;
  icon: ReactElement;
}

interface CategorySelectorProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export default function CategorySelector({
  selected,
  onSelect,
}: CategorySelectorProps) {
  const categoryList: CategoryOption[] = [
    { id: "link", name: "Link", icon: <Globe size={28} /> },
    { id: "call", name: "Call", icon: <Phone size={28} /> },
    { id: "mail", name: "Email", icon: <Mail size={28} /> },
    { id: "sms", name: "SMS", icon: <MessageSquareText size={28} /> },
    { id: "whatsapp", name: "WhatsApp", icon: <MessageCircle size={28} /> },
    { id: "wifi", name: "WiFi", icon: <Wifi size={28} /> },
    { id: "image", name: "Image", icon: <ImageIcon size={28} /> },
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
        {categoryList.map((category) => {
          const isSelected = selected === category.id;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isSelected}
              aria-label={category.name}
              onClick={() => onSelect(category.id)}
              className={`w-full rounded-md p-3 flex items-center justify-center gap-2
                transition-all duration-200 ease-in-out transform hover:scale-105
                ${isSelected
                  ? "bg-blue-100 text-blue-600 ring-2 ring-blue-500 font-semibold"
                  : "bg-white text-black hover:bg-blue-50 hover:text-blue-500 hover:ring-1 hover:ring-blue-300"}
              `}
            >
              <div
                className={`text-2xl transition-colors duration-200 ${
                  isSelected ? "text-blue-600" : "text-black"
                }`}
              >
                {category.icon}
              </div>
              <div className="text-sm">{category.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
