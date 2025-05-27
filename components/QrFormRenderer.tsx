'use client';

import React from 'react';

interface QRFormRendererProps {
  category: string;
  formData: any;
  setFormData: (data: any) => void;
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
      case 'mail':
        return (
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            placeholder="Enter email address"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        );
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
      case 'wifi':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="ssid"
              value={formData.ssid || ''}
              placeholder="WiFi Name (SSID)"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="password"
              value={formData.password || ''}
              placeholder="WiFi Password"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="encryption"
              value={formData.encryption || 'WPA'}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </select>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              placeholder="Email Address (optional)"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      case 'image':
        return (
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl || ''}
            placeholder="Paste image URL"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        );
      case 'video':
        return (
          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl || ''}
            placeholder="Paste video URL"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        );
      case 'pdf':
        return (
          <input
            type="url"
            name="pdfUrl"
            value={formData.pdfUrl || ''}
            placeholder="Paste PDF file URL"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        );
      // NEW CATEGORIES:
      case 'sms':
        return (
          <div className="space-y-3">
            <input
              type="tel"
              name="smsPhone"
              value={formData.smsPhone || ''}
              placeholder="Recipient Phone Number"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
            <textarea
              name="smsBody"
              value={formData.smsBody || ''}
              placeholder="Message (optional)"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              rows={2}
            />
          </div>
        );
      case 'whatsapp':
        return (
          <div className="space-y-3">
            <input
              type="tel"
              name="waPhone"
              value={formData.waPhone || ''}
              placeholder="WhatsApp Number (with country code)"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
            <textarea
              name="waBody"
              value={formData.waBody || ''}
              placeholder="Message"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              rows={2}
            />
          </div>
        );
      case 'bulkqr':
        return (
          <textarea
            name="bulkList"
            value={formData.bulkList || ''}
            placeholder="Paste or type values, one per line"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            rows={5}
            required
          />
        );
      case 'app':
        return (
          <input
            type="url"
            name="appUrl"
            value={formData.appUrl || ''}
            placeholder="App Store / Play Store URL"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        );
      case 'social':
        return (
          <input
            type="url"
            name="socialUrl"
            value={formData.socialUrl || ''}
            placeholder="Social media profile URL"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        );
      case 'event':
        return (
          <div className="space-y-3">
            <input
              type="text"
              name="eventTitle"
              value={formData.eventTitle || ''}
              placeholder="Event Title"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="datetime-local"
              name="eventStart"
              value={formData.eventStart || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="datetime-local"
              name="eventEnd"
              value={formData.eventEnd || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="eventLocation"
              value={formData.eventLocation || ''}
              placeholder="Location"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <textarea
              name="eventDesc"
              value={formData.eventDesc || ''}
              placeholder="Event Description"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              rows={2}
            />
          </div>
        );
      case 'barcode2d':
        return (
          <input
            type="text"
            name="barcodeValue"
            value={formData.barcodeValue || ''}
            placeholder="Enter value for 2D Barcode"
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg"
            required
          />
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