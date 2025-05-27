'use client';

import { QrCode, Phone, Mail, Wifi, Image, Video, FileText, MessageSquareText, MessageCircle, Users, AppWindow, CalendarDays, Barcode } from 'lucide-react';
import type { ReactElement } from 'react';

interface Category {
  id: string;
  name: string;
  icon: ReactElement;
}

interface CategorySelectorProps {
  selected: string;
  onSelect: (categoryId: string) => void;
}

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const categoryList: Category[] = [
    { id: 'link', name: 'Link', icon: <QrCode size={28} /> },
    { id: 'call', name: 'Call', icon: <Phone size={28} /> },
    { id: 'mail', name: 'Email', icon: <Mail size={28} /> },
    { id: 'sms', name: 'SMS', icon: <MessageSquareText size={28} /> },
    { id: 'whatsapp', name: 'WhatsApp', icon: <MessageCircle size={28} /> },
    { id: 'wifi', name: 'WiFi', icon: <Wifi size={28} /> },
    { id: 'image', name: 'Image', icon: <Image size={28} /> },
    { id: 'video', name: 'Video', icon: <Video size={28} /> },
    { id: 'bulkqr', name: 'Bulk QR', icon: <QrCode size={28} /> },
    { id: 'app', name: 'App', icon: <AppWindow size={28} /> },
    { id: 'social', name: 'Social Media', icon: <Users size={28} /> },
    { id: 'event', name: 'Event', icon: <CalendarDays size={28} /> },
    { id: 'barcode2d', name: '2D Barcode', icon: <Barcode size={28} /> },
    { id: 'pdf', name: 'PDF', icon: <FileText size={28} /> },
    { id: 'contact', name: 'Contact', icon: <Users size={28} /> }
  ];

  return (
    <div className="bg-white shadow-lg p-4 rounded-md">
  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-1">
    {categoryList.map(({ id, name, icon }) => (
      <button
        key={id}
        type="button"
        aria-pressed={selected === id}
        aria-label={name}
        onClick={() => onSelect(id)}
        className={`bg-white w-[80%] rounded-xl p-2 flex flex-row space-x-2 items-center justify-center transition 
          hover:ring-2 hover:ring-blue-400 
          ${selected === id ? 'ring-2 ring-blue-500' : ''}`}
      >
        <div className="text-black">{icon}</div>
        <div className="text-sm font-medium text-black">{name}</div>
      </button>
    ))}
  </div>
</div>
  );
}