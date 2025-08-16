"use client";

import { FC } from "react";

import { LinkForm } from "../forms/LinkForm";
import { CallForm } from "../forms/CallForm";
import ContactForm from "../ContactForm";
import { MailForm } from "../forms/MailForm";
import { SmsForm } from "../forms/SMSForm";
import { WhatsAppForm } from "../forms/WhatsAppForm";
import { PdfForm } from "../forms/PDFForm";
import { ImageForm } from "../forms/ImageForm";

import {
  QRCategory,
  QRFormDataByCategory,
  AnyQRFormData,
  FormProps,
  Category,
} from "@/types/qr-generator";

interface CategoryFieldProps {
  selectedCategory?: QRCategory;
  onContentCreate: (data: AnyQRFormData) => void;
  formData?: AnyQRFormData;
}

// 🔹 Map each category to its form component
const formMap: {
  [K in Category]?: FC<FormProps<QRFormDataByCategory[K]>>;
} = {
  link: LinkForm,
  call: CallForm,
  contact: ContactForm,
  mail: MailForm,
  pdf: PdfForm,
  sms: SmsForm,
  whatsapp: WhatsAppForm,
  image: ImageForm,
  // you can add: wifi, video, event, bulkqr, etc.
};

export default function CategoryField({
  selectedCategory,
  onContentCreate,
  formData,
}: CategoryFieldProps) {
  if (!selectedCategory) {
    return (
      <div className="bg-white shadow-lg p-3 rounded-lg">
        <h3 className="px-3 font-semibold text-lg mb-4">Choose Category</h3>
        <p style={{ color: "#727070" }} className="px-5">
          Select a category to fill the form.
        </p>
      </div>
    );
  }

  const FormComponent = formMap[selectedCategory.id as Category];

  return (
    <div className="bg-white shadow-lg p-3 rounded-lg">
      <h3 className="px-3 font-semibold text-lg mb-4">
        {selectedCategory.name}
      </h3>
      {FormComponent ? (
        <FormComponent
          onContentCreate={onContentCreate as any}
          formData={(formData || {}) as any}
          errors={{}}
          onChange={() => {}}
        />
      ) : (
        <p style={{ color: "#727070" }} className="px-5">
          No form available for this category yet.
        </p>
      )}
    </div>
  );
}
