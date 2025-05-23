'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface Props {
  category: string;
  formData: any;
}

export default function QrPreview({ category, formData }: Props) {
  const [qrSrc, setQrSrc] = useState<string>('');

  useEffect(() => {
    const generate = async () => {
      const data = JSON.stringify({ category, ...formData });
      const url = await QRCode.toDataURL(data);
      setQrSrc(url);
    };
    if (formData && Object.keys(formData).length) generate();
  }, [formData, category]);

  return (
    <div className="flex flex-col items-center justify-center border rounded-lg p-6 bg-gray-50 h-full">
      {qrSrc ? (
        <>
          <img src={qrSrc} alt="Generated QR Code" className="w-48 h-48" />
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Download
          </button>
        </>
      ) : (
        <p className="text-gray-500">Fill the form to generate QR code</p>
      )}
    </div>
  );
}
