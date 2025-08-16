'use client';

import { useState } from 'react';
import { QRCategory, AnyQRFormData, QRCodeStyle } from '@/types/qr-generator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { QRFormField } from './QRFormField';
import { QRStyleCustomizer } from './QRStyleCustomizer';
import { QRPreview } from './QRPreview';

interface QRFormProps {
  category: QRCategory;
  onBack: () => void;
  onGenerate: (data: AnyQRFormData, style: QRCodeStyle) => void;
}

export function QRForm({ category, onBack, onGenerate }: QRFormProps) {
  const [formData, setFormData] = useState<AnyQRFormData>({});
  const [style, setStyle] = useState<QRCodeStyle>({
    shape: 'square',
    backgroundColor: '#FFFFFF',
    foregroundColor: '#000000',
    logo: null,
    logoSize: 20,
  });

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStyleChange = (field: keyof QRCodeStyle, value: unknown) => {
    setStyle(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData, style);
  };

  const handleDownload = () => {
    // This will be handled by the QRPreview component
    // but we can also trigger the main onGenerate if needed
    onGenerate(formData, style);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create your QR Code</h1>
            <p className="text-muted-foreground">Create all QR Codes</p>
          </div>
        </div>
        
        <Button className="bg-blue-600 hover:bg-blue-700">
          Continue →
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Form Fields */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-4">{category.name}</h3>
              <QRFormField
                category={category}
                formData={formData}
                onInputChange={handleInputChange}
              />
            </div>

            {/* Style Customizer */}
            <div className="bg-white border rounded-lg p-4">
              <QRStyleCustomizer
                style={style}
                onStyleChange={handleStyleChange}
              />
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-4 sticky top-6">
            <QRPreview 
              category={category}
              formData={formData}
              style={style}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}