"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Globe, Phone, Mail, User, Wifi, MessageCircle, FileText, ImageIcon,
  Video, Calendar, AppWindow, BookUser, Share2, Layers3, Barcode,
} from "lucide-react";
import { LiaSmsSolid } from "react-icons/lia";

type QROption = {
  id: number;
  name: string;
  icon: React.ReactElement;
  description: string;
};

const qrOptions: QROption[] = [
  { id: 1, name: "Website", icon: <Globe size={24} />, description: "Link to any website" },
  { id: 2, name: "Call", icon: <Phone size={24} />, description: "Click to dial directly" },
  { id: 3, name: "Contact", icon: <User size={24} />, description: "Link to any Contact" },
  { id: 4, name: "Mail", icon: <Mail size={24} />, description: "Send email with one scan" },
  { id: 5, name: "SMS", icon: <LiaSmsSolid size={24} />, description: "Send SMS Easily" },
  { id: 6, name: "Whatsapp", icon: <MessageCircle size={24} />, description: "Link to WhatsApp" },
  { id: 7, name: "PDF", icon: <FileText size={24} />, description: "Download shared PDF" },
  { id: 8, name: "Image", icon: <ImageIcon size={24} />, description: "Link to an image" },
  { id: 9, name: "Video", icon: <Video size={24} />, description: "Link to a video" },
  { id: 10, name: "App", icon: <AppWindow size={24} />, description: "Redirect to App Store" },
  { id: 11, name: "Vcard", icon: <BookUser size={24} />, description: "Save contact with one tap" },
  { id: 12, name: "Social Media", icon: <Share2 size={24} />, description: "Link to your profile" },
  { id: 13, name: "Wifi", icon: <Wifi size={24} />, description: "Connect without password" },
  { id: 14, name: "Event Info", icon: <Calendar size={24} />, description: "Share event details" },
  { id: 15, name: "Bulk QR", icon: <Layers3 size={24} />, description: "Generate in bulk" },
  { id: 16, name: "2D Barcode", icon: <Barcode size={24} />, description: "Create 2D barcodes" },
];

export default function QRGenerationSection() {
  const [selectedOption, setSelectedOption] = useState<QROption | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

  const handleGenerate = () => {
    setQrCodeImage("/images/sample-qr.png");

    // Smooth scroll to the interface section
    const target = document.getElementById("qr-interface");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-gray-50 flex justify-center py-16 px-4">
      <div className="w-full max-w-[1440px]">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-16">
          Generate different types of QR codes
        </h1>

        <div className="max-w-[1126px] mx-auto flex flex-col lg:flex-row gap-10 min-h-[684px]">
          {/* Left: QR Category List */}
          <div className="w-full max-w-[808px] grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-4">
            {qrOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option)}
                className={`flex flex-col items-center bg-white justify-center rounded-lg border text-center p-4 transition-all ${
                  selectedOption?.id === option.id
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-500"
                    : "border-gray-200 hover:shadow-sm"
                }`}
              >
                <div className="text-blue-600 bg-blue-50 p-2.5 rounded-full ">{option.icon}</div>
                <div className="text-sm font-semibold mt-2">{option.name}</div>
                <div className="text-xs text-gray-500 mt-1">{option.description}</div>
              </button>
            ))}
          </div>

          {/* Right: iPhone Preview */}
          <div className="w-full max-w-[200px] flex flex-col items-center">
            <div className="relative w-[200px] h-[401.31px] mb-12">
              <Image
                src="/images/iphoneprev.png"
                alt="Phone Screen"
                width={200}
                height={501}
                className="w-full h-auto object-contain"
              />
              {qrCodeImage && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <Image
                    src={qrCodeImage}
                    alt="QR Code"
                    width={100}
                    height={100}
                    className="rounded shadow-lg border border-white bg-white"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleGenerate}
              disabled={!selectedOption}
              className={`w-48 h-12 rounded-md font-semibold text-white ${
                selectedOption
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
