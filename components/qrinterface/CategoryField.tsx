'use client';

import LinkForm from '../forms/LinkForm';
import CallForm from '../forms/CallForm';
import ContactForm from '../forms/ContactForm';
import EmailForm from '../forms/EmailForm';
import SMSForm from '../forms/SMSForm';
import WhatsAppForm from '../forms/WhatsAppForm';
import PDFForm from '../forms/PDFForm';
import ImageForm from '../forms/ImageForm';

interface Category {
  label: string;
}


import type { HandleContentCreateData } from '@/types/qr-generator'; // Adjust the path as needed

interface CategoryFieldProps {
  selectedCategory?: Category;
  onContentCreate: (content: HandleContentCreateData) => void;
}

export default function CategoryField({
  selectedCategory,
  onContentCreate,
}: CategoryFieldProps) {
  const key = selectedCategory?.label?.toLowerCase();

  const formMap: Record<string, React.ComponentType<{ linkContent: (data: any) => void }>> = {
    link: LinkForm,
    call: CallForm,
    contact: ContactForm,
    mail: EmailForm,
    sms: SMSForm,
    whatsapp: WhatsAppForm,
    pdf: PDFForm,
    image: ImageForm,
  };

  const FormComponent = key ? formMap[key] : undefined;

  console.log('🔍 Selected Category:', selectedCategory?.label);
  console.log('🔍 Lookup Key:', key);
  console.log('🔍 FormComponent:', FormComponent);

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
