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

    case 'call':
      return (
        <input
          type="tel"
          name="phone"
          value={formData.phone || ''}
          placeholder="Enter phone number"
          onChange={handleChange}
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      );

    case 'mail':
      return (
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          placeholder="Enter recipient email"
          onChange={handleChange}
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      );

    case 'sms':
      return (
        <>
          <input
            type="tel"
            name="smsPhone"
            value={formData.smsPhone || ''}
            placeholder="Enter phone number"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="smsBody"
            value={formData.smsBody || ''}
            placeholder="Enter message"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </>
      );

    case 'whatsapp':
      return (
        <>
          <input
            type="tel"
            name="waPhone"
            value={formData.waPhone || ''}
            placeholder="Enter WhatsApp number"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="waBody"
            value={formData.waBody || ''}
            placeholder="Enter message"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </>
      );

    case 'wifi':
      return (
        <>
          <input
            type="text"
            name="ssid"
            value={formData.ssid || ''}
            placeholder="WiFi SSID"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="password"
            value={formData.password || ''}
            placeholder="WiFi Password"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="encryption"
            value={formData.encryption || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select encryption type</option>
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No Password</option>
          </select>
        </>
      );

    case 'image':
      return (
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl || ''}
          placeholder="Enter image URL"
          onChange={handleChange}
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );

    case 'video':
      return (
        <input
          type="url"
          name="videoUrl"
          value={formData.videoUrl || ''}
          placeholder="Enter video URL"
          onChange={handleChange}
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );

    case 'bulkqr':
      return (
        <textarea
          name="bulkList"
          value={formData.bulkList || ''}
          placeholder="Enter list (one per line)"
          onChange={handleChange}
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        />
      );

    case 'app':
      return (
        <input
          type="url"
          name="appUrl"
          value={formData.appUrl || ''}
          placeholder="Enter app store URL"
          onChange={handleChange}
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );

    case 'social':
      return (
        <input
          type="url"
          name="socialUrl"
          value={formData.socialUrl || ''}
          placeholder="Enter social profile URL"
          onChange={handleChange}
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );

    case 'event':
      return (
        <>
          <input
            type="text"
            name="eventTitle"
            value={formData.eventTitle || ''}
            placeholder="Event Title"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="datetime-local"
            name="eventStart"
            value={formData.eventStart || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="datetime-local"
            name="eventEnd"
            value={formData.eventEnd || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="eventLocation"
            value={formData.eventLocation || ''}
            placeholder="Event Location"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="eventDesc"
            value={formData.eventDesc || ''}
            placeholder="Event Description"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </>
      );

    case 'barcode2d':
      return (
        <input
          type="text"
          name="barcodeValue"
          value={formData.barcodeValue || ''}
          placeholder="Enter value for 2D barcode"
          onChange={handleChange}
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );

    case 'pdf':
      return (
        <input
          type="url"
          name="pdfUrl"
          value={formData.pdfUrl || ''}
          placeholder="Enter PDF URL"
          onChange={handleChange}
          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );

    case 'contact':
      return (
        <>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      );

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

