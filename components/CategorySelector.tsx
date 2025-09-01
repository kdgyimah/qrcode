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
  Barcode,
  ImageIcon,
  Link,
  Share2,
  Smartphone,
  Calendar,
  User,
  Grid,
} from "lucide-react";

import type { ReactElement } from "react";
import type { Category, QRCategory } from "@/types/qr-generator";

// Define structure for local display
interface CategoryOption {
  id: Category;
  name: string;
  icon: ReactElement;
  color?: string; // Optional color from QRCategory
}

interface CategorySelectorProps {
  selected: Category;
  onSelect: (category: Category) => void;
  categories?: QRCategory[]; // Optional: use provided categories or fallback to default
}

export default function CategorySelector({
  selected,
  onSelect,
  categories,
}: CategorySelectorProps) {
  // Icon mapping for consistent display
  const iconMap: Record<Category, ReactElement> = {
    link: <Link size={28} />,
    call: <Phone size={28} />,
    mail: <Mail size={28} />,
    sms: <MessageSquareText size={28} />,
    whatsapp: <MessageCircle size={28} />,
    wifi: <Wifi size={28} />,
    image: <ImageIcon size={28} />,
    video: <Video size={28} />,
    bulkqr: <Grid size={28} />,
    app: <Smartphone size={28} />,
    social: <Share2 size={28} />,
    event: <Calendar size={28} />,
    barcode2d: <Barcode size={28} />,
    contact: <User size={28} />,
    pdf: <FileText size={28} />,
  };

  // Default category list (fallback if categories prop not provided)
  const defaultCategoryList: CategoryOption[] = [
    { id: "link", name: "Link", icon: iconMap.link },
    { id: "call", name: "Call", icon: iconMap.call },
    { id: "mail", name: "Mail", icon: iconMap.mail },
    { id: "sms", name: "SMS", icon: iconMap.sms },
    { id: "whatsapp", name: "WhatsApp", icon: iconMap.whatsapp },
    { id: "wifi", name: "WiFi", icon: iconMap.wifi },
    { id: "image", name: "Image", icon: iconMap.image },
    { id: "video", name: "Video", icon: iconMap.video },
    { id: "bulkqr", name: "Bulk QR", icon: iconMap.bulkqr },
    { id: "app", name: "App", icon: iconMap.app },
    { id: "social", name: "Social Media", icon: iconMap.social },
    { id: "event", name: "Event", icon: iconMap.event },
    { id: "barcode2d", name: "2D Barcode", icon: iconMap.barcode2d },
    { id: "contact", name: "Contact", icon: iconMap.contact },
    { id: "pdf", name: "PDF", icon: iconMap.pdf },
  ];

  // Use provided categories or fall back to default
  const categoryList: CategoryOption[] = categories
    ? categories.map((cat) => ({
        id: cat.id as Category,
        name: cat.name,
        icon: iconMap[cat.id as Category] || <QrCode size={28} />,
        color: cat.color,
      }))
    : defaultCategoryList;

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