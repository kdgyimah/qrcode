'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

interface QRDesign {
  frame: string;
  color: string;
  logo: File | null;
}

interface Props {
  category: string;
  formData: any;
  ready?: boolean;
  design: QRDesign;
}

// Expanded getQRValue to support all your categories
function getQRValue(category: string, formData: any): string {
  switch (category) {
    case 'link':
      return formData.url || '';
    case 'mail':
      return formData.email ? `mailto:${formData.email}` : '';
    case 'call':
      return formData.phone ? `tel:${formData.phone}` : '';
    case 'sms':
      // sms:+123456789?body=Hello
      if (!formData.smsPhone) return '';
      return `sms:${formData.smsPhone}${formData.smsBody ? `?body=${encodeURIComponent(formData.smsBody)}` : ''}`;
    case 'whatsapp':
      // wa.me link
      if (!formData.waPhone) return '';
      return `https://wa.me/${formData.waPhone}${formData.waBody ? `?text=${encodeURIComponent(formData.waBody)}` : ''}`;
    case 'wifi':
      return formData.ssid
        ? `WIFI:T:${formData.encryption || 'WPA'};S:${formData.ssid};P:${formData.password || ''};;`
        : '';
    case 'image':
      return formData.imageUrl || '';
    case 'video':
      return formData.videoUrl || '';
    case 'bulkqr':
      // For preview, just show the first value
      if (!formData.bulkList) return '';
      return formData.bulkList.split('\n').filter(Boolean)[0] || '';
    case 'app':
      return formData.appUrl || '';
    case 'social':
      return formData.socialUrl || '';
    case 'event':
      // iCal format for event (very basic)
      if (!formData.eventTitle || !formData.eventStart) return '';
      return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${formData.eventTitle}`,
        formData.eventDesc ? `DESCRIPTION:${formData.eventDesc}` : '',
        formData.eventLocation ? `LOCATION:${formData.eventLocation}` : '',
        `DTSTART:${formData.eventStart.replace(/[-:]/g, '').slice(0, 15)}Z`,
        formData.eventEnd ? `DTEND:${formData.eventEnd.replace(/[-:]/g, '').slice(0, 15)}Z` : '',
        'END:VEVENT',
        'END:VCALENDAR'
      ].filter(Boolean).join('\n');
    case 'barcode2d':
      return formData.barcodeValue || '';
    case 'contact':
      // MECARD format
      return formData.name || formData.phone || formData.email
        ? `MECARD:N:${formData.name};TEL:${formData.phone};EMAIL:${formData.email};;`
        : '';
    case 'pdf':
      return formData.pdfUrl || '';
    default:
      return '';
  }
}

export default function QrPreview({ category, formData, ready, design }: Props) {
  const [qrSrc, setQrSrc] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Needed for PDF export
  const imgRef = useRef<HTMLImageElement>(null);

  const placeholderQR =
    'data:image/svg+xml;utf8, <svg width="192" height="192" xmlns="http://www.w3.org/2000/svg"><rect fill="lightgray" width="100%" height="100%"/><text x="50%" y="50%" font-size="32" fill="gray" font-family="Arial" text-anchor="middle" alignment-baseline="middle">QR</text></svg>';

  useEffect(() => {
    if (design.logo) {
      const reader = new FileReader();
      reader.onload = (e) => setLogoUrl(e.target?.result as string);
      reader.readAsDataURL(design.logo);
    } else {
      setLogoUrl(null);
    }
  }, [design.logo]);

  useEffect(() => {
    const generate = async () => {
      const value = getQRValue(category, formData);
      if (ready && value) {
        const url = await QRCode.toDataURL(value, {
          color: {
            dark: design.color,
            light: '#ffffff'
          },
          margin: 2
        });
        setQrSrc(url);
      } else {
        setQrSrc('');
      }
    };
    generate();
  }, [formData, category, ready, design.color]);

  const isActive = ready && !!qrSrc;

  const handleDownload = (type: 'png' | 'jpg' | 'image' | 'pdf' = 'png') => {
    if (!qrSrc) return;

    // Default (png)
    if (type === 'png' || type === 'image') {
      const link = document.createElement('a');
      link.href = qrSrc;
      link.download = 'qr-code.png';
      link.click();
    } else if (type === 'jpg') {
      const img = document.createElement('img');
      img.src = qrSrc;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const jpgUrl = canvas.toDataURL('image/jpeg');
          const link = document.createElement('a');
          link.href = jpgUrl;
          link.download = 'qr-code.jpg';
          link.click();
        }
      };
    } else if (type === 'pdf') {
      // Only works in browser
      import('jspdf').then((jsPDFModule) => {
        const jsPDF = jsPDFModule.default;
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: [200, 240]
        });
        pdf.text('QR Code', 80, 20);
        pdf.addImage(qrSrc, 'PNG', 20, 40, 160, 160);
        pdf.save('qr-code.pdf');
      });
    }
    setDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const close = () => setDropdownOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [dropdownOpen]);

  return (
    <div className='w-full max-w-md items-center bg-white justify-center px- py-4 flex flex-col'>
      <div className="flex flex-col items-center justify-center border rounded-lg p-6  h-full min-h-[300px] transition-all relative">
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <img
            ref={imgRef}
            src={isActive ? qrSrc : placeholderQR}
            alt="QR Code Preview"
            className={`w-48 h-48 transition-all 
              ${isActive ? '' : 'opacity-50 grayscale'}
              ${design.frame === 'Frame 2' ? 'rounded-2xl border-4 border-blue-200' : 'rounded-lg'}
            `}
            style={{
              filter: isActive ? 'none' : 'grayscale(1) opacity(0.5)',
              transition: 'filter 0.4s',
              objectFit: 'contain'
            }}
          />
          {/* Logo overlay */}
          {isActive && logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              className="absolute rounded-full"
              style={{
                width: '56px',
                height: '56px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                objectFit: 'cover',
                border: '2px solid white',
                background: 'white'
              }}
            />
          )}
        </div>
        
        {!isActive && (
          <p className="mt-4 text-gray-400 text-center text-sm">
            Select a category and fill the form to activate your QR code.
          </p>
        )}
      </div>
      <div className="relative bg-white mt-8 ">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
              isActive
                ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={isActive ? () => handleDownload('png') : undefined}
            disabled={!isActive}
            aria-disabled={!isActive}
            type="button"
          >
            {/* Download icon (outline) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9 3a1 1 0 00-1 1v7.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V4a1 1 0 00-1-1z" /><path d="M3 17a1 1 0 001 1h12a1 1 0 001-1v-2a1 1 0 112 0v2a3 3 0 01-3 3H4a3 3 0 01-3-3v-2a1 1 0 112 0v2z" /></svg>
            Download
            {/* Dropdown arrow */}
            <span
              onClick={isActive ? (e) => { e.stopPropagation(); setDropdownOpen((v) => !v); } : undefined}
              className={`ml-2 flex items-center cursor-pointer ${isActive ? '' : 'pointer-events-none'}`}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </span>
          </button>
          {/* Dropdown menu */}
          {isActive && dropdownOpen && (
            <div
              className="absolute top-full right-0 z-20 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100 text-sm text-blue-700"
                onClick={() => handleDownload('png')}
                type="button"
              >
                Download as PNG
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100 text-sm text-blue-700"
                onClick={() => handleDownload('jpg')}
                type="button"
              >
                Download as JPG
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100 text-sm text-blue-700"
                onClick={() => handleDownload('pdf')}
                type="button"
              >
                Download as PDF
              </button>
            </div>
          )}
        </div>
    </div>
  );
}