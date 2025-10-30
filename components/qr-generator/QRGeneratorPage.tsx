"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase"; // ✅ make sure this is imported
import { CategoryGrid } from "@/components/qr-generator/CategoryGrid";
import { QRForm } from "@/components/qr-generator/QRForm";
import { DownloadModal } from "@/components/qr-generator/DownloadModal";
import {
  QRCategory,
  AnyQRFormData,
  QRCodeStyle,
} from "@/types/qr-generator";

interface Folder {
  id: string;
  name: string;
}

interface QRGeneratorPageProps {
  onBack: () => void;
}

export default function QRGeneratorPage({ onBack }: QRGeneratorPageProps) {
  // 🧠 UI step management
  const [currentStep, setCurrentStep] = useState<"categories" | "form" | "download">("categories");

  // 📂 Folder data and generation state
  const [folders, setFolders] = useState<Folder[]>([]);
  const [saving] = useState(false);

  // 🧾 QR data and style
  const [selectedCategory, setSelectedCategory] = useState<QRCategory | null>(null);
  const [formData, setFormData] = useState<AnyQRFormData>({});
  const [qrStyle, setQrStyle] = useState<QRCodeStyle>({
    shape: "square",
    backgroundColor: "#FFFFFF",
    foregroundColor: "#000000",
    logo: null,
    logoSize: 20,
  });

  // 🚀 Load folders once
  useEffect(() => {
    const loadFolders = async () => {
      try {
        const { data, error } = await supabase.from("folders").select("id, name");
        if (error) throw error;
        if (data) setFolders(data);
      } catch (err) {
        console.error("Error loading folders:", err);
      }
    };
    loadFolders();
  }, []);

  // 🔁 Step navigation handlers
  const handleCategorySelect = useCallback((category: QRCategory) => {
    setSelectedCategory(category);
    setCurrentStep("form");
  }, []);

  const handleBackToCategories = useCallback(() => {
    if (currentStep === "form") {
      setSelectedCategory(null);
      setFormData({});
      setCurrentStep("categories");
    } else {
      onBack();
    }
  }, [currentStep, onBack]);

  const handleGenerateQR = useCallback(
    (data: AnyQRFormData, style: QRCodeStyle) => {
      setFormData(data);
      setQrStyle(style);
      setCurrentStep("download");
    },
    []
  );

  const handleCloseDownload = useCallback(() => {
    setSelectedCategory(null);
    setFormData({});
    setCurrentStep("categories");
  }, []);

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
              folders={folders}
              isGenerating={saving}
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
        categoryName={selectedCategory?.name ?? ""}
      />
    </div>
  );
}
