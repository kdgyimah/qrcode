'use client';

import { FC } from "react";

import LinkForm from '../forms/LinkForm';
import CallForm from '../forms/CallForm';
import ContactForm from '../forms/ContactForm';
import EmailForm from '../forms/EmailForm';
import SMSForm from '../forms/SMSForm';
import WhatsAppForm from '../forms/WhatsAppForm';
import PDFForm from '../forms/PDFForm';
import ImageForm from '../forms/ImageForm';

import { HandleContentCreateData } from "@/types/qr-generator";

// This is the common interface every form uses
interface FormProps {
  linkContent: (data: HandleContentCreateData) => void;
}

interface Category {
  label: string;
}

interface CategoryFieldProps {
  selectedCategory?: Category;
  onContentCreate: (data: HandleContentCreateData) => void;
}

const formMap: Record<string, FC<FormProps>> = {
  link: LinkForm,
  call: CallForm,
  contact: ContactForm,
  email: EmailForm,
  pdf: PDFForm,
  sms: SMSForm,
  whatsapp: WhatsAppForm,

  image: ImageForm,
  
  
};

export default function CategoryField({
  selectedCategory,
  onContentCreate,

}: CategoryFieldProps) {
  const key = selectedCategory?.label?.toLowerCase();
  const FormComponent = key ? formMap[key] : undefined;

  return (
    <div className="bg-white shadow-lg p-3 rounded-lg">
      <h3 className="px-3 font-semibold text-lg mb-4">
        {selectedCategory?.label ?? 'Choose Category'}
      </h3>
      {FormComponent ? (
        <FormComponent linkContent={onContentCreate} />
      ) : (
        <p style={{ color: '#727070' }} className="px-5">
          Select a category to fill the form.
        </p>
      )}
    </div>
  );
}
