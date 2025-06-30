"use client";

import { useState, useEffect } from "react";
import CategorySelector from "@/components/CategorySelector";
import QrFormRenderer from "@/components/QrFormRenderer";
import QrPreview from "@/components/QrPreview";
import QRDesignPanel from "./QRDesignPanel";

import type { Category } from "@/types/Category";

type FormDataType = {
  url?: string;
  smsPhone?: string;
  smsBody?: string;
  waPhone?: string;
  waBody?: string;
  email?: string;
  phone?: string;
  ssid?: string;
  password?: string;
  encryption?: "WPA" | "WEP" | "None" | string;
  imageUrl?: string;
  videoUrl?: string;
  bulkList?: string;
  appUrl?: string;
  socialUrl?: string;
  eventTitle?: string;
  eventStart?: string;
  eventEnd?: string;
  eventLocation?: string;
  eventDesc?: string;
  barcodeValue?: string;
  name?: string;
  pdfUrl?: string;
};

interface DesignConfig {
  frame: string;
  color: string;
  logo: File | null;
}

const initialFormData: Record<Category, FormDataType> = {
  link: { url: "" },
  sms: { smsPhone: "", smsBody: "" },
  whatsapp: { waPhone: "", waBody: "" },
  mail: { email: "" },
  call: { phone: "" },
  wifi: { ssid: "", password: "", encryption: "WPA" },
  image: { imageUrl: "" },
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
  contact: { name: "", phone: "", email: "" },
  pdf: { pdfUrl: "" },
};

const initialDesign: DesignConfig = {
  frame: "Frame 1",
  color: "#000000",
  logo: null,
};

export default function QrInterface() {
  const [category, setCategory] = useState<Category>("link");
  const [formData, setFormData] = useState<FormDataType>(initialFormData["link"]);
  const [formReady, setFormReady] = useState<boolean>(false);
  const [design, setDesign] = useState<DesignConfig>(initialDesign);

  useEffect(() => {
    setFormData(initialFormData[category] || {});
  }, [category]);

  useEffect(() => {
    let ready = false;
    switch (category) {
      case "link":
        ready = !!formData.url && formData.url.startsWith("http");
        break;
      case "sms":
        ready = !!formData.smsPhone;
        break;
      case "whatsapp":
        ready = !!formData.waPhone && !!formData.waBody;
        break;
      case "mail":
        ready = !!formData.email;
        break;
      case "call":
        ready = !!formData.phone;
        break;
      case "wifi":
        ready = !!formData.ssid && !!formData.password && !!formData.encryption;
        break;
      case "image":
        ready = !!formData.imageUrl;
        break;
      case "video":
        ready = !!formData.videoUrl;
        break;
      case "bulkqr":
        ready = !!formData.bulkList && formData.bulkList.trim().length > 0;
        break;
      case "app":
        ready = !!formData.appUrl;
        break;
      case "social":
        ready = !!formData.socialUrl;
        break;
      case "event":
        ready = !!formData.eventTitle && !!formData.eventStart;
        break;
      case "barcode2d":
        ready = !!formData.barcodeValue;
        break;
      case "contact":
        ready = !!formData.name && !!formData.phone;
        break;
      case "pdf":
        ready = !!formData.pdfUrl;
        break;
      default:
        ready = false;
    }
    setFormReady(ready);
  }, [category, formData]);

  return (
    <div id="qr-interface" className="bg-blue-100 px-4 md:px-8 scroll-mt-20">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Panel */}
        <div className="w-full md:w-4/5 shadow-md p-6 md:ml-12 my-10 bg-gray-50">
          <CategorySelector selected={category} onSelect={setCategory} />
          <QrFormRenderer category={category} formData={formData} setFormData={setFormData} />
          <QRDesignPanel design={design} setDesign={setDesign} />
        </div>
        {/* Right Panel */}
        <div className="w-full md:w-1/4 bg-white mx-4 my-10 md:mr-24 shadow-sm">
          <QrPreview category={category} formData={formData} ready={formReady} design={design} />
        </div>
      </div>
    </div>
  );
}
