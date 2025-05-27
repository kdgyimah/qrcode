'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type QROption = {
  id: number;
  name: string;
  icon: string;
};

export function QRGeneratorSection() {
  const qrOptions: QROption[] = [
    { id: 1, name: 'Website URL', icon: '🌐' },
    { id: 2, name: 'Plain Text', icon: '📝' },
    { id: 3, name: 'Email', icon: '✉️' },
    { id: 4, name: 'Phone', icon: '📱' },
    { id: 5, name: 'SMS', icon: '💬' },
    { id: 6, name: 'WiFi', icon: '📶' },
    { id: 7, name: 'VCard', icon: '👤' },
    { id: 8, name: 'Event', icon: '📅' },
    { id: 9, name: 'Bitcoin', icon: '₿' },
    { id: 10, name: 'Location', icon: '📍' },
    { id: 11, name: 'PayPal', icon: '💲' },
    { id: 12, name: 'YouTube', icon: '▶️' },
    { id: 13, name: 'Spotify', icon: '🎵' },
    { id: 14, name: 'Instagram', icon: '📸' },
    { id: 15, name: 'Facebook', icon: '👍' },
    { id: 16, name: 'Twitter', icon: '🐦' },
  ];

  const [selectedOption, setSelectedOption] = useState<QROption | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

  const handleGenerate = () => {
    console.log('Generating QR for:', selectedOption);
    setQrCodeImage('/sample-qr.png'); // Replace with actual QR generation
  };

  return (
    <section className="px-2 py-8 sm:px-4 sm:py-12 max-w-6xl mx-auto lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
        Create Your Custom QR Code
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
                className={`p-3 xs:p-4 sm:p-5 border rounded-lg text-center transition-all flex flex-col items-center justify-center
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                  ${
                    selectedOption?.id === option.id
                      ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500'
                      : 'border-gray-200 hover:border-indigo-400 hover:shadow-md'
                  }`}
                onClick={() => setSelectedOption(option)}
                aria-label={`Select ${option.name} QR option`}
              >
                <span className="text-xl xs:text-2xl sm:text-3xl mb-1 sm:mb-2">{option.icon}</span>
                <span className="text-xs xs:text-sm sm:text-base font-medium">{option.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right side - iPhone mockup and button */}
        <div className="w-full lg:w-1/5 flex flex-col mb-5 lg:mb-0 ">
          <div className="relative w-full max-w-[180px] xs:max-w-[200px] sm:max-w-[230px] md:max-w-[250px] aspect-[9/16] mx-auto">
            <Image
              src="/images/iphonscrn.png"
              alt="iPhone display"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 230px, 250px"
              priority
            />

            {/* QR code display area */}
            {qrCodeImage && (
              <div className="absolute inset-0 flex items-center justify-center p-8 xs:p-10 sm:p-12">
                <div className="relative w-full h-[30%]">
                  <Image
                    src={qrCodeImage}
                    alt="Generated QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Generate button */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className={`w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold text-white transition-colors
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                ${
                  selectedOption
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-indigo-300 cursor-not-allowed'
                }`}
              onClick={handleGenerate}
              disabled={!selectedOption}
              aria-label="Generate QR code"
            >
              Generate QR Code
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}