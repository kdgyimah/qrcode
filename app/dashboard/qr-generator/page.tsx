'use client';

import { useState } from 'react';
import { QRCategory, QRFormData, QRCodeStyle } from '@/types/qr-generator';
import { CategoryGrid } from '@/components/qr-generator/category-grid';
import { QRForm } from '@/components/qr-generator/qr-form';
import { DownloadModal } from '@/components/qr-generator/download-modal';

export default function QRGeneratorPage() {
  const [currentStep, setCurrentStep] = useState<'categories' | 'form' | 'download'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<QRCategory | null>(null);
  const [formData, setFormData] = useState<QRFormData>({});
  const [qrStyle, setQrStyle] = useState<QRCodeStyle>({
    shape: 'square',
    backgroundColor: '#FFFFFF',
    foregroundColor: '#000000',
    logo: null,
    logoSize: 20,
  });

  const handleCategorySelect = (category: QRCategory) => {
    setSelectedCategory(category);
    setCurrentStep('form');
  };

  const handleBackToCategories = () => {
    setCurrentStep('categories');
    setSelectedCategory(null);
    setFormData({});
  };

  const handleGenerateQR = (data: QRFormData, style: QRCodeStyle) => {
    setFormData(data);
    setQrStyle(style);
    setCurrentStep('download');
  };

  const handleCloseDownload = () => {
    setCurrentStep('categories');
    setSelectedCategory(null);
    setFormData({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {currentStep === 'categories' && (
        <CategoryGrid onCategorySelect={handleCategorySelect} />
      )}

      {currentStep === 'form' && selectedCategory && (
        <QRForm
          category={selectedCategory}
          onBack={handleBackToCategories}
          onGenerate={handleGenerateQR}
        />
      )}

      <DownloadModal
        isOpen={currentStep === 'download'}
        onClose={handleCloseDownload}
        data={formData}
        style={qrStyle}
        categoryName={selectedCategory?.name || ''}
      />
    </div>
  );
}