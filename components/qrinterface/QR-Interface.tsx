'use client';

import React, { useState } from "react";
import CategoryField from "./CategoryField";
import "./QR-Interface.css";
import QROutputInterface from "./QROutputInterface";
import ScrollCategoryOption from "./ScrollCategoryOption";
import Frames from "./Frames";
import FormModal from "../qrinterface/ConfirmationModal";
import ConfirmationModal from "./ConfirmationModal";
import type { Gradient } from "qr-code-styling";

interface CategoryItem {
  label: string;
  value: string;
  icon?: React.ReactElement;
  color?: string;
}

interface ContentData {
  url: string;
  description: string;
  imageUrl: string;
  showIcon: boolean;
}

interface PdfData {
  pdfContent: string;
}

interface ImageData {
  imageContent: string;
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  company: string;
  jobTitle: string;
}

interface SmsData {
  phone: string;
  message: string;
}

interface WhatsappData {
  waPhoneNumber: string;
  waMessage: string;
}

interface QrStyle {
  dotsOptions: {
    type: "dots" | "square" | "rounded" | "classy" | "classy-rounded" | "extra-rounded" | "dot" ;
    color: string;
    gradient?: Gradient;
  };
  cornersSquareOptions: {
    type: "dots" | "square" | "rounded" | "classy" | "classy-rounded" | "extra-rounded" | "dot" ;
    color: string;
    gradient?: Gradient;
  };
  cornersDotOptions: {
    type: "dots" | "square" | "rounded" | "classy" | "classy-rounded" | "extra-rounded" | "dot" ;
    color: string;
    gradient?: Gradient;
  };
}

type HandleContentCreateData =
  | ContentData
  | PdfData
  | ImageData
  | ContactInfo
  | SmsData
  | WhatsappData;

const QRInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [tempCategory, setTempCategory] = useState<CategoryItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [content, setContent] = useState<ContentData>({
    url: "",
    description: "",
    imageUrl: "",
    showIcon: false,
  });

  const [pdfData, setPdfData] = useState<PdfData>({ pdfContent: "" });
  const [imageData, setImageData] = useState<ImageData>({ imageContent: "" });

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    company: "",
    jobTitle: "",
  });

  const [smsData, setSmsData] = useState<SmsData>({ phone: "", message: "" });
  const [whatsappData, setWhatsappData] = useState<WhatsappData>({
    waPhoneNumber: "",
    waMessage: "",
  });

  const [frame, setFrame] = useState<string | null>(null);
  const [qrStyle, setQrStyle] = useState<QrStyle>({
    dotsOptions: { type: "dots", color: "#726e6e" },
    cornersSquareOptions: { type: "square", color: "#160101" },
    cornersDotOptions: { type: "square", color: "#635858" },
  });

  const hasUnsavedData = () => {
    return (
      Object.values(content).some(Boolean) ||
      Object.values(pdfData).some(Boolean) ||
      Object.values(imageData).some(Boolean) ||
      Object.values(contactInfo).some(Boolean) ||
      Object.values(smsData).some(Boolean) ||
      Object.values(whatsappData).some(Boolean)
    );
  };

  const handleCategorySelected = (categoryItem: CategoryItem) => {
    if (hasUnsavedData()) {
      setTempCategory(categoryItem);
      setShowModal(true);
    } else {
      setSelectedCategory(categoryItem);
    }
  };

  const handleDiscard = () => {
    setContent({ url: "", description: "", imageUrl: "", showIcon: false });
    setPdfData({ pdfContent: "" });
    setImageData({ imageContent: "" });
    setContactInfo({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      company: "",
      jobTitle: "",
    });
    setSmsData({ phone: "", message: "" });
    setWhatsappData({ waPhoneNumber: "", waMessage: "" });
    setSelectedCategory(tempCategory);
    setTempCategory(null);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setTempCategory(null);
  };

  const frameHandler = (frameUrl: string) => {
    setFrame(frameUrl);
  };

  const handleContentCreate = (data: HandleContentCreateData) => {
    switch (selectedCategory?.label) {
      case "Contact":
        setContactInfo(data as ContactInfo);
        break;
      case "SMS":
        setSmsData(data as SmsData);
        break;
      case "WhatsApp":
        setWhatsappData(data as WhatsappData);
        break;
      case "PDF":
        setPdfData(data as PdfData);
        break;
      case "Image":
        setImageData(data as ImageData);
        break;
      default:
        setContent(data as ContentData);
    }
  };

  return (
    <section className="qrSection container mt-4" style={{ padding: "10px" }}>
      <div className="qr-interface container">
        <ScrollCategoryOption onCategorySelect={handleCategorySelected} />

        <CategoryField
          selectedCategory={selectedCategory ?? undefined}
          onContentCreate={handleContentCreate}
        />

        <QROutputInterface
          content={
            selectedCategory?.label === "Contact"
              ? contactInfo
              : selectedCategory?.label === "SMS"
              ? smsData
              : selectedCategory?.label === "WhatsApp"
              ? whatsappData
              : selectedCategory?.label === "Image"
              ? imageData
              : selectedCategory?.label === "PDF"
              ? pdfData
              : content
          }
          qrStyle={qrStyle}
          onStyleChange={setQrStyle}
        />

        <Frames onsetFrame={frameHandler} />

        {(selectedCategory?.label === "Contact"
          ? contactInfo.firstName
          : content.url) && (
          <FormModal onDiscard={handleDiscard} onCancel={handleCancel} />
        )}

        {showModal && (
          <ConfirmationModal onDiscard={handleDiscard} onCancel={handleCancel} />
        )}
      </div>
    </section>
  );
};

export default QRInterface;
