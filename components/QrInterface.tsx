'use client';

import { useState } from 'react';
import CategorySelector from '@/components/CategorySelector';
import QrFormRenderer from '@/components/QrFormRenderer';
import QrPreview from '@/components/QrPreview';
import QRDesignPanel from './QRDesignPanel';

export default function QrInterface() {
  const [category, setCategory] = useState<string>('link');
  const [formData, setFormData] = useState<any>({});

  return (
    <div className=" max-w-5xl  mx-auto py-12 px-4 md:px-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Generate Your QR Code</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Category + Form */}
        <div>
          <CategorySelector selected={category} onSelect={setCategory} />
          <QrFormRenderer category={category} formData={formData} setFormData={setFormData} />
          <QRDesignPanel />
        </div>

        {/* Right: Preview + Button */}
        <QrPreview formData={formData} category={category} />
      </div>
    </div>
  );
}
