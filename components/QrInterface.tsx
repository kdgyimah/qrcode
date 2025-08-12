"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import CategorySelector from '@/components/CategorySelector';
import QrFormRenderer, {
  FormDataType,
  type Category as CategoryType,
} from '@/components/QrFormRenderer';
import QrPreview from '@/components/QrPreview';
import QRDesignPanel from './QRDesignPanel';
import SearchBar from './SearchBar';

interface DesignConfig {
  frame: string;
  color: string;
  logo: File | null;
}

const initialFormData: Record<CategoryType, FormDataType> = {
  link: { url: '' },
  sms: { smsPhone: '', smsBody: '' },
  whatsapp: { waPhone: '', waBody: '' },
  mail: { email: '' },
  call: { phone: '' },
  wifi: { ssid: '', password: '', encryption: 'WPA' },
  image: { imageUrl: '' },
  video: { videoUrl: '' },
  bulkqr: { bulkList: '' },
  app: { appUrl: '' },
  social: { socialUrl: '' },
  event: {
    eventTitle: '',
    eventStart: '',
    eventEnd: '',
    eventLocation: '',
    eventDesc: '',
  },
  barcode2d: { barcodeValue: '' },
  contact: { name: '', phone: '', email: '' },
  pdf: { pdfUrl: '' },
};

const initialDesign: DesignConfig = {
  frame: 'Frame 1',
  color: '#000000',
  logo: null,
};

export default function QrInterface() {
  const allCategories: CategoryType[] = useMemo(
    () => [
      'link',
      'sms',
      'whatsapp',
      'mail',
      'call',
      'wifi',
      'image',
      'video',
      'bulkqr',
      'app',
      'social',
      'event',
      'barcode2d',
      'contact',
      'pdf',
    ],
    []
  );

  const [category, setCategory] = useState<CategoryType>('link');
  const [formData, setFormData] = useState<FormDataType>(initialFormData['link']);
  const [formReady, setFormReady] = useState<boolean>(false);
  const [design, setDesign] = useState<DesignConfig>(initialDesign);
  const [ setValidationErrors] = useState<Record<string, string>>({});

  const handleSearch = useCallback(
    (q: string) => {
      const norm = q.trim().toLowerCase();
      if (!norm) return;
      // exact match first
      let found = allCategories.find((c) => c.toLowerCase() === norm);
      // fallback to partial match
      if (!found) {
        found = allCategories.find((c) => c.toLowerCase().includes(norm));
      }
      if (found) {
        setCategory(found);
      }
    },
    [allCategories]
  );

  // reset formData when category changes
  useEffect(() => {
    setFormData(initialFormData[category] || {});
    // also reset readiness / errors until renderer validates
    setFormReady(false);
   
  }, [category]);

  const handleValidityChange = useCallback(
    (valid: boolean, errors: Record<string, string>) => {
      setFormReady(valid);
    },
    []
  );

  return (
    <div id="qr-interface" className="bg-blue-50 px-4 md:px-8 scroll-mt-20 py-8">
      <div className=" relative -right-12 py-2 flex justify-start ">
        <SearchBar onSearch={handleSearch} className="w-[200px] max-w-md" />
      </div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Left Panel */}
        <div className="w-full md:w-4/5 shadow-md p-6 md:ml-12 my-10 bg-gray-50 rounded-lg">
          <CategorySelector selected={category} onSelect={setCategory} />
          <QrFormRenderer
            category={category}
            formData={formData}
            setFormData={setFormData}
            onValidityChange={handleValidityChange}
          />
          <QRDesignPanel design={design} setDesign={setDesign} />
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/4 bg-white mx-4 my-10 md:mr-24 shadow-sm rounded-lg">
          <QrPreview
            category={category}
            formData={formData}
            ready={formReady}
            design={design}
          />
        </div>
      </div>
    </div>
  );
}
