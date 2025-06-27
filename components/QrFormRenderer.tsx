'use client';

import React from 'react';

interface QRFormData {
  url?: string;
  email?: string;
  phone?: string;
  ssid?: string;
  password?: string;
  encryption?: string;
  name?: string;
  imageUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
  smsPhone?: string;
  smsBody?: string;
  waPhone?: string;
  waBody?: string;
  bulkList?: string;
  appUrl?: string;
  socialUrl?: string;
  eventTitle?: string;
  eventStart?: string;
  eventEnd?: string;
  eventLocation?: string;
  eventDesc?: string;
  barcodeValue?: string;
  [key: string]: string | undefined; // allows dynamic keys while staying type-safe
}

interface QRFormRendererProps {
  category: string;
  formData: QRFormData;
  setFormData: (data: QRFormData) => void;
}

export default function QrFormRenderer({ category, formData, setFormData }: QRFormRendererProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function renderFields() {
    switch (category) {
      case 'link':
        return (
          <input
            type="url"
            name="url"
            value={formData.url || ''}
            placeholder="Enter a URL (e.g. https://example.com)"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        );
      // ... [NO CHANGES to your existing render fields – keep all as-is]
      // the rest of your renderFields switch remains unchanged
      // (for brevity, it's not duplicated here, but should stay intact)

      default:
        return <p className="text-gray-500 italic">Select a category to get started.</p>;
    }
  }

  return (
    <div className="mt-8 w-full max-w-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Content</h2>
      <div className=" border-gray-300 rounded-2xl p-2">
        <h2>Label</h2>
        {renderFields()}
      </div>
    </div>
  );
}
