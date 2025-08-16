"use client";

import React, { useCallback } from "react";
import {
  QRFormDataByCategory,
  Category,
  AnyQRFormData,
  FormProps,
  categories, // ✅ runtime array from types file
  QRCategory,
} from "@/types/qr-generator";
import { useFormValidation } from "@/hooks/useFormValidation";

// Import all category-specific forms
import { LinkForm } from "./forms/LinkForm";
import { CallForm } from "./forms/CallForm";
import { MailForm } from "./forms/MailForm";
import { SmsForm } from "./forms/SMSForm";
import { WhatsAppForm } from "./forms/WhatsAppForm";
import { WifiForm } from "./forms/WifiForm";    //kkk
import { ImageForm } from "./forms/ImageForm";
import { VideoForm } from "./forms/VideoForm";
import { BulkQRForm } from "./forms/BulkQRForm";
import { AppForm } from "./forms/AppForm";
import { EventForm } from "./forms/EventForm";
import { ContactForm } from "./forms/ContactForm";
import { SocialForm } from "./forms/SocialForm";
import { PdfForm } from "./forms/PDFForm";

interface QRFormRendererProps {
  category: QRCategory;
  formData: AnyQRFormData;
  setFormData: React.Dispatch<React.SetStateAction<AnyQRFormData>>;
  onValidityChange?: (isValid: boolean) => void;
}

export default function QRFormRenderer({
  category,
  formData,
  setFormData,
  onValidityChange,
}: QRFormRendererProps) {
  const { errors } = useFormValidation(category.id as Category, formData, onValidityChange);

  // Generic change handler that works with typed form data
  const handleChange = useCallback(
    <K extends keyof AnyQRFormData>(field: K, value: AnyQRFormData[K]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setFormData]
  );

  // Phone-specific handler for international phone formatting
  const handlePhoneChange = useCallback(
    <K extends keyof AnyQRFormData>(field: K, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setFormData]
  );

  // Content creation handler
  const handleContentCreate = useCallback(
    (data: AnyQRFormData) => {
      setFormData(data);
    },
    [setFormData]
  );

  // Type-safe form props factory
  const createFormProps = <T extends AnyQRFormData>(): FormProps<T> => ({
    onContentCreate: handleContentCreate as (data: T) => void,
    formData: formData as T,
    errors: errors as Partial<Record<keyof T, string>>,
    onChange: handleChange as <K extends keyof T>(field: K, value: T[K]) => void,
    onPhoneChange: handlePhoneChange as <K extends keyof T>(field: K, value: string) => void,
  });

  const renderForm = () => {
    const categoryId = category.id as Category;

    switch (categoryId) {
      case "link":
        return <LinkForm {...createFormProps<QRFormDataByCategory["link"]>()} />;
      case "call":
        return <CallForm {...createFormProps<QRFormDataByCategory["call"]>()} />;
      case "mail":
        return <MailForm {...createFormProps<QRFormDataByCategory["mail"]>()} />;
      case "sms":
        return <SmsForm {...createFormProps<QRFormDataByCategory["sms"]>()} />;
      case "whatsapp":
        return <WhatsAppForm {...createFormProps<QRFormDataByCategory["whatsapp"]>()} />;
      case "wifi":
        return <WifiForm {...createFormProps<QRFormDataByCategory["wifi"]>()} />;
      case "image":
        return <ImageForm {...createFormProps<QRFormDataByCategory["image"]>()} />;
      case "video":
        return <VideoForm {...createFormProps<QRFormDataByCategory["video"]>()} />;
      case "bulkqr":
        return <BulkQRForm {...createFormProps<QRFormDataByCategory["bulkqr"]>()} />;
      case "app":
        return <AppForm {...createFormProps<QRFormDataByCategory["app"]>()} />;
      case "social":
        return <SocialForm {...createFormProps<QRFormDataByCategory["social"]>()} />;
      case "event":
        return <EventForm {...createFormProps<QRFormDataByCategory["event"]>()} />;
      case "contact":
        return <ContactForm {...createFormProps<QRFormDataByCategory["contact"]>()} />;
      case "pdf":
        return <PdfForm {...createFormProps<QRFormDataByCategory["pdf"]>()} />;
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500 italic text-lg">
              Select a category to get started.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Choose from {categories.length} available QR code types above.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="mt-8 w-full max-w-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Enter Content for {category.name}
      </h2>
      <div className="rounded-2xl p-6 border border-gray-200 bg-white shadow-sm space-y-6">
        {renderForm()}
      </div>
    </div>
  );
}
