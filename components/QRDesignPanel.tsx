'use client';

import { useState } from 'react';

const tabs = ['Frame', 'Shape & Color', 'Logo'];

export default function QRDesignPanel() {
  const [activeTab, setActiveTab] = useState('Frame');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Frame':
        return (
          <div className="p-4">
            {/* Replace with your actual frame options */}
            <p className="text-gray-600">Choose from available QR frames.</p>
          </div>
        );
      case 'Shape & Color':
        return (
          <div className="p-4 flex space-x-4 overflow-x-auto">
            {/* Replace with actual QR shape & color options */}
            <div className="w-24 h-24 bg-black rounded-md"></div>
            <div className="w-24 h-24 bg-blue-500 rounded-md"></div>
            <div className="w-24 h-24 bg-green-500 rounded-md"></div>
          </div>
        );
      case 'Logo':
        return (
          <div className="p-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 w-full max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Design Your QR</h2>

      {/* Tab headers */}
      <div className="flex space-x-4 border-b border-gray-300 mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content box */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-sm min-h-[150px]">
        {renderTabContent()}
      </div>
    </div>
  );
}
