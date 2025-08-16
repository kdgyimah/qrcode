"use client";

import React, { useState } from "react";
import CategoryField from "./CategoryField";
import "./QR-Interface.css";
import QROutputInterface from "./QROutputInterface";
import ScrollCategoryOption from "./ScrollCategoryOption";
import ConfirmationModal from "./ConfirmationModal";

import {
  QRCategory,
  AnyQRFormData,
  QRCodeStyle,
} from "@/types/qr-generator";
import { generateQRContent } from "@/utils/qr-generator";
import QRCodeStyling from "qr-code-styling";

const QRInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState<QRCategory>();
  const [formData, setFormData] = useState<AnyQRFormData>({} as AnyQRFormData);

  const [qrStyle, setQrStyle] = useState<QRCodeStyle>({
    shape: "square",
    backgroundColor: "#ffffff",
    foregroundColor: "#000000",
    logo: null,
    logoSize: 20,
  });

  const [qrPreview, setQrPreview] = useState<string>("");

  const [showModal, setShowModal] = useState(false);
  const [tempCategory, setTempCategory] = useState<QRCategory>();

  // 🔹 Check if current form has unsaved values
  const hasUnsavedData = () =>
    formData &&
    Object.values(formData).some(
      (val) => val !== "" && val !== null && val !== undefined
    );

  const handleCategorySelected = (category: QRCategory) => {
    if (hasUnsavedData()) {
      setTempCategory(category);
      setShowModal(true);
    } else {
      setSelectedCategory(category);
      setFormData({} as AnyQRFormData);
    }
  };

  const handleDiscard = () => {
    setFormData({} as AnyQRFormData);
    setSelectedCategory(tempCategory);
    setTempCategory(undefined);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setTempCategory(undefined);
  };

  // 🔹 Called by CategoryField to update form data + generate preview
  const handleContentCreate = async (data: AnyQRFormData) => {
    setFormData(data);

    if (selectedCategory) {
      const content = generateQRContent(selectedCategory, data);

      if (content) {
        const qr = new QRCodeStyling({
          width: 300,
          height: 300,
          data: content,
          margin: 2,
          dotsOptions: {
            color: qrStyle.foregroundColor,
          },
          backgroundOptions: {
            color: qrStyle.backgroundColor,
          },
          image: typeof qrStyle.logo === "string" ? qrStyle.logo : undefined,
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 2,
            imageSize: qrStyle.logoSize ? qrStyle.logoSize / 100 : 0.2, // percentage → decimal
          },
        });

        const dataUrl = await qr.getRawData("png");
        if (dataUrl) {
          setQrPreview(URL.createObjectURL(new Blob([], { type: "image/png" })));
        }
      }
    }
  };

  return (
    <section className="qrSection container mt-4" style={{ padding: "10px" }}>
      <div className="qr-interface container">
        <ScrollCategoryOption onCategorySelect={handleCategorySelected} />

        <CategoryField
          selectedCategory={selectedCategory}
          onContentCreate={handleContentCreate}
          formData={formData}
        />

        <QROutputInterface
          qrImage={qrPreview}
          
        />

        {showModal && (
          <ConfirmationModal onDiscard={handleDiscard} onCancel={handleCancel} />
        )}
      </div>
    </section>
  );
};

export default QRInterface;
