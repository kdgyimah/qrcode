"use client";

import { useState } from "react";
import PropTypes from "prop-types";

import InsertLinkSharpIcon from "@mui/icons-material/InsertLinkSharp";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import TextsmsSharpIcon from "@mui/icons-material/TextsmsSharp";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import ImageSharpIcon from "@mui/icons-material/ImageSharp";

import type { Category } from "@/types/qr-generator"; // ✅ uses the union: "link" | "sms" | ...

// Each selectable item in the scrollable category bar
interface CategoryItem {
  value: Category;           // strict to union type
  label: string;
  icon: React.ReactElement;
}

interface ScrollCategoryOptionProps {
  onCategorySelect: (item: Category) => void; // returns union value only
}

const ScrollCategoryOption = ({ onCategorySelect }: ScrollCategoryOptionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // ✅ All available items mapped to `Category` union type
  const items: CategoryItem[] = [
    { value: "link", label: "Link", icon: <InsertLinkSharpIcon className="icons" /> },
    { value: "call", label: "Call", icon: <CallSharpIcon className="icons" /> },
    { value: "contact", label: "Contact", icon: <ContactPageIcon className="icons" /> },
    { value: "mail", label: "Mail", icon: <EmailSharpIcon className="icons" /> },
    { value: "sms", label: "SMS", icon: <TextsmsSharpIcon className="icons" /> },
    { value: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon className="icons" /> },
    { value: "pdf", label: "PDF", icon: <PictureAsPdfSharpIcon className="icons" /> },
    { value: "image", label: "Image", icon: <ImageSharpIcon className="icons" /> },
  ];

  // Handle click and propagate selected category
  const handleCategoryClick = (item: CategoryItem, index: number) => {
    setActiveIndex(index);
    onCategorySelect(item.value); // ✅ only send union string
    console.log(`Selected: ${item.label} (index ${index})`);
  };

  return (
    <div
      className="bg-white p-2 shadow-lg qr-interface-item"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="scroller snaps-inline">
        {items.map((item, i) => (
          <div
            key={item.value}
            className={`scroller-item ${activeIndex === i ? "active" : ""}`}
            onClick={() => handleCategoryClick(item, i)}
          >
            {item.icon}
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ScrollCategoryOption.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};

export default ScrollCategoryOption;
