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
    console.log("Generating QR for:", selectedOption);
    setQrCodeImage("/images/sample-qr.png"); // Replace with actual QR generation
  };

  return (
    <section className="width-full bg-gray-50 shadow-md rounded-lg">
      <div className="px-2 py-8 sm:px-4 sm:py-12 max-w-6xl mx-auto lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          Generate different types of QR codes
        </h1>

        {/* Responsive stacking: column on mobile, row on lg+ */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8">
          {/* Left side - QR Option Cards */}
          <div className="w-full lg:w-4/5">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
              {qrOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`p-3 xs:p-4 sm:p-5 bg-white border rounded-lg text-center transition-all flex flex-col shadow-2xl items-center justify-center
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      ${
        selectedOption?.id === option.id
          ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500"
          : "border-gray-200 hover:border-indigo-400 hover:shadow-md"
      }`}
                  onClick={() => setSelectedOption(option)}
                  aria-label={`Select ${option.name} QR option`}
                >
                  <span className="text-xl xs:text-2xl sm:text-3xl mb-1 sm:mb-2">
                    {option.icon}
                  </span>
                  <span className="text-xs xs:text-sm sm:text-base font-medium">
                    {option.name}
                  </span>
                  <p className="text-[10px] xs:text-xs text-gray-500 mt-1 text-center">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right side - iPhone mockup and button */}
          <div className="w-full lg:w-1/3 flex flex-col items-center mb-5 lg:mb-0">
            {/* Container for the mockup screen */}
            <div className="w-full flex justify-center mb-6 content-right">
                <div className="relative w-[250px] sm:w-[300px] md:w-[340px] lg:w-[380px] ">
                {/* Use a grayscale filter and invert for color effect */}
                <div className="w-full h-full">
                  <Image
                  src="/images/iphonscrn.png"
                  alt="iPhone display"
                  width={500}
                  height={650}
                  className="object-contain w-full h-full"
                  priority
                  />
                </div>

                {/* QR code overlay */}
                {qrCodeImage ? (
                  <div className="absolute inset-0 flex items-center justify-center p-8 xs:p-10 sm:p-12">
                  <div className="relative w-[120px] h-[120px] rounded-xl flex items-center justify-center">
                    <Image
                    src={qrCodeImage}
                    alt="Generated QR Code"
                    fill
                    className="object-contain filter invert-[0.9] grayscale"
                    />
                  </div>
                  </div>
                ) : null}
                </div>
            </div>

            {/* Generate button in separate div */}
            <div className=" w-full flex justify-center">
              <button
                type="button"
                className={`w-[45%] max-w-[300px] h-[50px] rounded-md font-semibold text-white transition-colors
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${
          selectedOption
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-indigo-300 cursor-not-allowed"
        }`}
                onClick={handleGenerate}
                disabled={!selectedOption}
                aria-label="Generate QR code"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QRGenerationSection;
