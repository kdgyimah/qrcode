'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { QRCategory, QRFormData, QRCodeStyle } from '@/types/qr-generator';
import { generateQRContent, generateQRCode } from '@/utils/qr-generator';
import Image from 'next/image';

interface QRPreviewProps {
  category: QRCategory;
  formData: QRFormData;
  style: QRCodeStyle;
  onDownload: () => void;
}

export function QRPreview({ category, formData, style, onDownload }: QRPreviewProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let objectUrl: string | undefined;

    const generatePreview = async () => {
      const content = generateQRContent(category, formData);

      if (!content.trim()) {
        setQrDataUrl('');
        setError('');
        return;
      }

      setIsGenerating(true);
      setError('');

      try {
        const logoUrl =
          style.logo instanceof File ? URL.createObjectURL(style.logo) : null;
        objectUrl = logoUrl || undefined;

        const dataUrl = await generateQRCode(
          content,
          { ...style, logo: logoUrl || null },
          200
        );

        setQrDataUrl(dataUrl);
      } catch (err) {
        console.error('QR generation error:', err);
        setError('Failed to generate QR code');
      } finally {
        setIsGenerating(false);
      }
    };

    generatePreview();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [category, formData, style]);

  const handleDownload = async () => {
    if (!qrDataUrl) return;

    try {
      const content = generateQRContent(category, formData);
      const logoUrl =
        style.logo instanceof File ? URL.createObjectURL(style.logo) : null;

      const highResDataUrl = await generateQRCode(
        content,
        { ...style, logo: logoUrl || null },
        512
      );

      const link = document.createElement('a');
      link.href = highResDataUrl;
      link.download = `qr-code-${category.name.toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (logoUrl) URL.revokeObjectURL(logoUrl);

      onDownload();
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border rounded-lg p-4 flex items-center justify-center">
        <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <span className="text-sm text-gray-500">Generating...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <div className="text-2xl mb-2">⚠️</div>
              <p className="text-sm">{error}</p>
            </div>
          ) : qrDataUrl ? (
            <Image
              src={qrDataUrl}
              alt="QR Code Preview"
              width={192}
              height={192}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">📱</div>
              <p className="text-sm">QR Code Preview</p>
              <p className="text-xs">Fill in the form to see preview</p>
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={handleDownload}
        className="w-full bg-blue-600 hover:bg-blue-700"
        size="lg"
        disabled={!qrDataUrl || isGenerating}
      >
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    </div>
  );
}
