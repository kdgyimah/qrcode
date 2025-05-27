'use client';

import React from 'react';
// Import shadcn/ui tabs
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface QRDesignPanelProps {
  design: {
    frame: string;
    color: string;
    logo: File | null;
  };
  setDesign: (d: any) => void;
}

export default function QRDesignPanel({ design, setDesign }: QRDesignPanelProps) {
  const handleFrame = (frame: string) => setDesign({ ...design, frame });
  const handleColor = (color: string) => setDesign({ ...design, color });
  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesign({
      ...design,
      logo: e.target.files?.[0] ?? null
    });
  };

  return (
    <div className="mt-8 w-full max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Design Your QR</h2>
      <Tabs defaultValue="frame" className="w-full">
        <TabsList className="bg-white border-b border-gray-200 px-2 gap-x-2">
          <TabsTrigger
            value="frame"
             className="
              bg-white text-black
              hover:bg-gray-100 hover:text-blue-600
               data-[state=active]:bg-gray-100
              data-[state=active]:text-blue-600
              rounded-sm px-4 py-2
              transition
            "
          >
            Frame
          </TabsTrigger>
          <TabsTrigger
            value="color"
            className="
              bg-white text-black
              hover:bg-gray-100 hover:text-blue-600
               data-[state=active]:bg-gray-100
              data-[state=active]:text-blue-600
              rounded-sm px-4 py-2
              transition
            "
          >
            Shape & Color
          </TabsTrigger>
          <TabsTrigger
            value="logo"
            className="
              bg-white text-black
              hover:bg-gray-100 hover:text-blue-600
               data-[state=active]:bg-gray-100
              data-[state=active]:text-blue-600
              rounded-sm px-4 py-2
              transition
            "
          >
            Logo
          </TabsTrigger>
        </TabsList>
        <TabsContent value="frame">
          <div className="p-4 flex gap-4">
            {['Frame 1', 'Frame 2'].map(f => (
              <button
                key={f}
                className={`w-16 h-16 border-2 ${design.frame === f ? 'border-blue-400' : 'border-gray-300'} rounded-xl flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition`}
                onClick={() => handleFrame(f)}
                type="button"
                aria-pressed={design.frame === f}
              >
                <span className="text-xs text-gray-500">{f}</span>
              </button>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="color">
          <div className="p-4 flex space-x-4 overflow-x-auto">
            {[
              { label: 'Black', color: '#000000' },
              { label: 'Blue', color: '#3b82f6' },
              { label: 'Green', color: '#22c55e' },
              { label: 'Pink', color: '#ec4899' }
            ].map(({ label, color }) => (
              <button
                key={label}
                className={`w-12 h-12 rounded-full border-2 ${design.color === color ? 'ring-2 ring-blue-400' : 'border-gray-400'} transition`}
                style={{ background: color }}
                title={label}
                onClick={() => handleColor(color)}
                type="button"
                aria-label={label}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="logo">
          <div className="p-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white"
              onChange={handleLogo}
            />
            <p className="mt-1 text-xs text-gray-500">Supported formats: png, jpg, svg, etc.</p>
            {design.logo && (
              <div className="mt-2">
                <span className="text-xs text-gray-700">Selected: {design.logo.name}</span>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}