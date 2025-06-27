"use client";

import React, { useState } from "react";
import Image from "next/image";

type QROption = {
  id: number;
  name: string;
  icon: string;
  description: string;
};

const qrOptions: QROption[] = [
  {
    id: 1,
    name: "Website URL",
    icon: "🌐",
    description: "Link to any website",
  },
  { id: 2, name: "Plain Text", icon: "📝", description: "Display simple text" },
  { id: 3, name: "Email", icon: "✉️", description: "Compose an email" },
  { id: 4, name: "Phone", icon: "📱", description: "Dial a phone number" },
  { id: 5, name: "SMS", icon: "💬", description: "Send a text message" },
  { id: 6, name: "WiFi", icon: "📶", description: "Connect to WiFi" },
  { id: 7, name: "VCard", icon: "👤", description: "Add a contact" },
  { id: 8, name: "Event", icon: "📅", description: "Save an event" },
  { id: 9, name: "Bitcoin", icon: "₿", description: "Make a payment" },
  { id: 10, name: "Location", icon: "📍", description: "Open a map location" },
  { id: 11, name: "PayPal", icon: "💲", description: "Send money via PayPal" },
  { id: 12, name: "YouTube", icon: "▶️", description: "Link to a video" },
  { id: 13, name: "Spotify", icon: "🎵", description: "Open a track or album" },
  {
    id: 14,
    name: "Instagram",
    icon: "📸",
    description: "Link to an IG profile",
  },
  { id: 15, name: "Facebook", icon: "👍", description: "Link to a FB page" },
  {
    id: 16,
    name: "Twitter",
    icon: "🐦",
    description: "Share a tweet or profile",
  },
];

function QRGenerationSection() {
  const [selectedOption, setSelectedOption] = useState<QROption | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

  const handleGenerate = () => {
    setQrCodeImage("/images/sample-qr.png");
  };

  return (
    <section className="w-full bg-gray-50 shadow-md rounded-lg">
      <div className="px-4 py-10 sm:px-6 sm:py-12 max-w-6xl mx-auto lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">
          Generate different types of QR codes
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: QR Option Cards */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
              {qrOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedOption(option)}
                  aria-label={`Select ${option.name} QR option`}
                  className={`p-3 sm:p-4 bg-white border rounded-lg text-center transition-all flex flex-col items-center justify-center text-xs sm:text-sm
                    ${
                      selectedOption?.id === option.id
                        ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500"
                        : "border-gray-200 hover:border-indigo-400 hover:shadow"
                    }`}
                >
                  <span className="text-xl sm:text-2xl">{option.icon}</span>
                  <span className="font-medium mt-1">{option.name}</span>
                  <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-1">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Preview + Button */}
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            <div className="w-full flex justify-center mb-6">
              <div className="relative w-[220px] sm:w-[260px] md:w-[300px]">
                <Image
                  src="/images/iphonscrn.png"
                  alt="Phone Frame"
                  width={400}
                  height={500}
                  className="object-contain w-full h-auto"
                  priority
                />
                {qrCodeImage && (
                  <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-10">
                    <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-lg">
                      <Image
                        src={qrCodeImage}
                        alt={selectedOption?.name || "QR Code"}
                        width={48}
                        height={48}
                        className="rounded shadow border border-gray-100"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!selectedOption}
              aria-label="Generate QR code"
              className={`w-[60%] max-w-[250px] h-[48px] rounded-md font-semibold text-white transition-all
                ${
                  selectedOption
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-300 cursor-not-allowed"
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

export default QRGenerationSection;
