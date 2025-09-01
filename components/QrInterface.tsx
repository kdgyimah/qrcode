"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import CategorySelector from "@/components/CategorySelector";
import QrFormRenderer from "@/components/QrFormRenderer";
import type { 
  QRFormDataByCategory, 
  Category,
  QRCategory,
  AnyQRFormData,
  QRCodeStyle 
} from "@/types/qr-generator";
import QrPreview from "@/components/QrPreview";
import QRDesignPanel from "./QRDesignPanel";
import SearchBar from "./SearchBar";

interface DesignConfig {
  frame: string;
  color: string;
  logo: File | null;
}

// Properly typed initial form data matching your interfaces
const initialFormData: QRFormDataByCategory = {
  link: { url: "" },
  call: { phone: "" },
  mail: { email: "", subject: "", message: "" },
  sms: { phone: "", message: "" },
  whatsapp: { waPhone: "", waBody: "" },
  wifi: { ssid: "", password: "", encryption: "WPA" },
  image: { uploadType: "url", imageUrl: "", file: undefined },
  video: { videoUrl: "" },
  bulkqr: { bulkList: "" },
  app: { appUrl: "" },
  social: { socialUrl: "" },
  event: {
    eventTitle: "",
    eventStart: "",
    eventEnd: "",
    eventLocation: "",
    eventDesc: "",
  },
  barcode2d: { barcodeValue: "" },
  contact: {
    firstName: "",
    lastName: "",
    organization: "",
    jobTitle: "",
    phone: "",
    mobile: "",
    email: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },
  pdf: { uploadType: "url", pdfUrl: "", file: undefined },
};

// Category definitions with full QRCategory interface
const qrCategories: QRCategory[] = [
  { id: "link", name: "Website URL", description: "Share any website link", icon: "Link", color: "bg-blue-600" },
  { id: "call", name: "Call", description: "Make a phone call", icon: "Phone", color: "bg-green-600" },
  { id: "mail", name: "Email", description: "Send an email", icon: "Mail", color: "bg-red-600" },
  { id: "sms", name: "SMS", description: "Send a text message", icon: "MessageSquare", color: "bg-yellow-600" },
  { id: "whatsapp", name: "WhatsApp", description: "Send WhatsApp message", icon: "MessageCircle", color: "bg-green-500" },
  { id: "wifi", name: "WiFi", description: "Connect to WiFi", icon: "Wifi", color: "bg-purple-600" },
  { id: "image", name: "Image", description: "Share an image", icon: "Image", color: "bg-pink-600" },
  { id: "video", name: "Video", description: "Share a video", icon: "Video", color: "bg-red-500" },
  { id: "bulkqr", name: "Bulk QR", description: "Generate multiple QR codes", icon: "Grid", color: "bg-gray-600" },
  { id: "app", name: "App Store", description: "Link to app download", icon: "Smartphone", color: "bg-indigo-600" },
  { id: "social", name: "Social Media", description: "Social media profile", icon: "Share2", color: "bg-blue-500" },
  { id: "event", name: "Event", description: "Calendar event", icon: "Calendar", color: "bg-orange-600" },
  { id: "barcode2d", name: "Barcode", description: "2D Barcode", icon: "Barcode", color: "bg-gray-800" },
  { id: "contact", name: "Contact", description: "vCard contact info", icon: "User", color: "bg-teal-600" },
  { id: "pdf", name: "PDF", description: "Share PDF document", icon: "FileText", color: "bg-red-700" },
];

const initialDesign: DesignConfig = {
  frame: "Frame 1",
  color: "#000000",
  logo: null,
};

export default function QrInterface() {
  const [selectedCategory, setSelectedCategory] = useState<QRCategory>(qrCategories[0]);
  const [formData, setFormData] = useState<AnyQRFormData>(
    initialFormData.link
  );
  const [formReady, setFormReady] = useState(false);
  const [design, setDesign] = useState<DesignConfig>(initialDesign);
  const [, setValidationErrors] = useState<Record<string, string>>({});

  // Create category lookup map
  const categoryMap = useMemo(() => {
    return new Map(qrCategories.map(cat => [cat.id as Category, cat]));
  }, []);

  const handleSearch = useCallback(
    (q: string) => {
      const norm = q.trim().toLowerCase();
      if (!norm) return;
      
      // First try exact match
      let found = qrCategories.find((c) => c.id.toLowerCase() === norm);
      
      // Then try partial match on name or id
      if (!found) {
        found = qrCategories.find((c) => 
          c.id.toLowerCase().includes(norm) || 
          c.name.toLowerCase().includes(norm)
        );
      }
      
      if (found) {
        setSelectedCategory(found);
      }
    },
    []
  );

  // Handle category selection
  const handleCategorySelect = useCallback((categoryId: Category) => {
    const category = categoryMap.get(categoryId);
    if (category) {
      setSelectedCategory(category);
    }
  }, [categoryMap]);

  // Reset form data when category changes
  useEffect(() => {
    const categoryId = selectedCategory.id as keyof QRFormDataByCategory;
    setFormData(initialFormData[categoryId]);
    setFormReady(false);
    setValidationErrors({});
  }, [selectedCategory]);

  const handleValidityChange = useCallback((valid: boolean) => {
    setFormReady(valid);
  }, []);

  // Convert design config to QRCodeStyle
  const qrStyle: QRCodeStyle = useMemo(() => ({
    shape: "square",
    backgroundColor: "#ffffff",
    foregroundColor: design.color,
    logo: design.logo,
    logoSize: 20,
  }), [design]);

  return (
    <div
      id="qr-interface"
      className="bg-slate-100 px-4 md:px-8 scroll-mt-20 py-8"
    >
      <div className="py-1 flex justify-center ml-4 md:justify-start md:pl-8">
        <SearchBar
          onSearch={handleSearch}
          className="w-full h-[40px] max-w-xs sm:max-w-sm md:max-w-md"
        />
      </div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Left Panel */}
        <div className="w-full md:w-4/5 shadow-md p-6 md:ml-12 my-10 bg-gray-50 rounded-lg">
          <CategorySelector 
            selected={selectedCategory.id as Category} 
            onSelect={handleCategorySelect}
            categories={qrCategories}
          />
          
          <QrFormRenderer
            category={selectedCategory}
            formData={formData}
            setFormData={setFormData}
            onValidityChange={handleValidityChange}
          />
          
          <QRDesignPanel design={design} setDesign={setDesign} />
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/4 bg-white mx-4 my-10 md:mr-24 shadow-sm rounded-lg">
          <QrPreview
            category={selectedCategory}
            formData={formData}
            ready={formReady}
            design={design}
            style={qrStyle}
          />
        </div>
      </div>
    </div>
  );
}