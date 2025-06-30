import { useState } from "react";
import PropTypes from 'prop-types';

import InsertLinkSharpIcon from "@mui/icons-material/InsertLinkSharp";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import TextsmsSharpIcon from "@mui/icons-material/TextsmsSharp";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import ImageSharpIcon from "@mui/icons-material/ImageSharp";
import type { Category } from "@/types/Category";

interface CategoryItem {
  value: Category;
  label: string;
  icon: React.ReactElement;
}

interface ScrollCategoryOptionProps {
  onCategorySelect: (item: CategoryItem) => void;
}

const ScrollCategoryOption = ({ onCategorySelect }: ScrollCategoryOptionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  const handleCategoryClick = (item: CategoryItem, selectedObjectIndex: number) => {
    setActiveIndex(selectedObjectIndex);
    onCategorySelect(item);
    console.log(`item selected label is: ${item.label} with index: ${selectedObjectIndex}`);
  };

  return (
    <div
      className="bg-white p-2 shadow-lg text-white qr-interface-item"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="scroller snaps-inline">
        {items.map((item, i) => (
          <div
            key={i}
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
