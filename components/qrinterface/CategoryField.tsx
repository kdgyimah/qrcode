'use client';

import LinkForm from '../forms/LinkForm';
import CallForm from '../forms/CallForm';
import ContactForm from '../forms/ContactForm';
import EmailForm from '../forms/EmailForm';
import SMSForm from '../forms/SMSForm';
import WhatsAppForm from '../forms/WhatsAppForm';
import PDFForm from '../forms/PDFForm';
import ImageForm from '../forms/ImageForm';
import type { HandleContentCreateData } from "./QR-Interface";

interface Category {
  selectedCategory?: Category;
  onContentCreate: (content: HandleContentCreateData) => void;
}

interface CategoryFieldProps {
  selectedCategory?: Category;
  onContentCreate: (content: string, ) => void;
}

export default function CategoryField({
  selectedCategory,
  onContentCreate,
}: CategoryFieldProps) {
  const renderForm = () => {
    switch (selectedCategory?.label) {
      case 'Link':
        return <LinkForm linkContent={onContentCreate} />;
      case 'Contact':
        return <ContactForm linkContent={onContentCreate} />;
      case 'Mail':
        return <EmailForm linkContent={onContentCreate} />;
      case 'WhatsApp':
        return <WhatsAppForm linkContent={onContentCreate} />;
      case 'SMS':
        return <SMSForm linkContent={onContentCreate} />;
      case 'Image':
        return <ImageForm linkContent={onContentCreate} />;
      case 'PDF':
        return <PDFForm linkContent={onContentCreate} />;
      case 'Call':
        return <CallForm linkContent={onContentCreate} />;
      default:
        return (
          <p style={{ color: '#727070' }} className="px-5">
            Select a category to fill the form.
          </p>
        );
    }
  };

  return (
    <div className="bg-white shadow-lg p-3 rounded-lg">
      <h3 className="px-3 font-semibold text-lg mb-4">
        {selectedCategory?.label ?? 'Choose Category'}
      </h3>
      {renderForm()}
    </div>
  );
}
