'use client';

import { useState } from 'react';
import { QrCode, Phone, Mail, Wifi, Image, Video, FileText } from 'lucide-react';
import type { ReactElement } from 'react';

interface Category {
  id: string;
  name: string;
  icon: ReactElement;
}

export default function QRCodeCategorySelector({
  onSelect,
}: {
  onSelect: (categoryId: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  // You can also fetch this from '@/data/qrCategories' if centralizing
  const categoryList: Category[] = [
    { id: 'link', name: 'Link', icon: <QrCode size={28} /> },
    { id: 'call', name: 'Call', icon: <Phone size={28} /> },
    { id: 'mail', name: 'Email', icon: <Mail size={28} /> },
    { id: 'wifi', name: 'WiFi', icon: <Wifi size={28} /> },
    { id: 'image', name: 'Image', icon: <Image size={28} /> },
    { id: 'video', name: 'Video', icon: <Video size={28} /> },
    { id: 'pdf', name: 'PDF', icon: <FileText size={28} /> },
    // Add more as needed
  ];

  const handleClick = (id: string) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded-md">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categoryList.map(({ id, name, icon }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={`bg-white w-full rounded-xl p-4 flex flex-row space-x-2 items-center justify-center transition 
            hover:ring-2 hover:ring-blue-400 
            ${selected === id ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className="text-black mb-2">{icon}</div>
          <div className="text-sm font-medium text-black">{name}</div>
        </button>
      ))}
    </div>
    </div>
  );
}
