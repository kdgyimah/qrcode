"use client";

import { useState } from "react";
import { QRCategory, QRFormData, QRCodeStyle } from "@/types/qr-generator";
import { CategoryGrid } from "@/components/qr-generator/CategoryGrid";
import { QRForm } from "@/components/qr-generator/QRForm";
import { DownloadModal } from "@/components/qr-generator/DownloadModal";
import { motion, AnimatePresence } from "framer-motion";

export default function QRGeneratorPage() {
  const [currentStep, setCurrentStep] = useState<
    "categories" | "form" | "download"
  >("categories");
  const [selectedCategory, setSelectedCategory] = useState<QRCategory | null>(
    null
  );
  const [formData, setFormData] = useState<QRFormData>({});
  const [qrStyle, setQrStyle] = useState<QRCodeStyle>({
    shape: "square",
    backgroundColor: "#FFFFFF",
    foregroundColor: "#000000",
    logo: null,
    logoSize: 20,
  });

  const handleCategorySelect = (category: QRCategory) => {
    setSelectedCategory(category);
    setCurrentStep("form");
  };

  const handleBackToCategories = () => {
    setCurrentStep("categories");
    setSelectedCategory(null);
    setFormData({});
  };

  const handleGenerateQR = (data: QRFormData, style: QRCodeStyle) => {
    setFormData(data);
    setQrStyle(style);
    setCurrentStep("download");
  };

  const handleCloseDownload = () => {
    setCurrentStep("categories");
    setSelectedCategory(null);
    setFormData({});
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AnimatePresence mode="wait">
        {currentStep === "categories" && (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryGrid onCategorySelect={handleCategorySelect} />
          </motion.div>
        )}

        {currentStep === "form" && selectedCategory && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QRForm
              category={selectedCategory}
              onBack={handleBackToCategories}
              onGenerate={handleGenerateQR}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <DownloadModal
        isOpen={currentStep === "download"}
        onClose={handleCloseDownload}
        data={formData}
        style={qrStyle}
        categoryName={selectedCategory?.name || ""}
      />
    </div>
  );
}
