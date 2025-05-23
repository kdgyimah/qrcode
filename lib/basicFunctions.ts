// lib/basicFunctions.ts

/**
 * Generate a vCard string for contact information.
 */
export const generateVCard = (contact: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  company: string;
  jobTitle: string;
}): string => {
  return `
BEGIN:VCARD
VERSION:3.0
N:${contact.lastName};${contact.firstName}
FN:${contact.firstName} ${contact.lastName}
ORG:${contact.company}
TITLE:${contact.jobTitle}
TEL:${contact.phone}
EMAIL:${contact.email}
ADR:;;${contact.address}
END:VCARD
  `.trim();
};

/**
 * Create a mailto link for email data.
 */
export const generateEmailData = ({
  receiverEmail,
  subject,
  message,
}: {
  receiverEmail: string;
  subject: string;
  message: string;
}): string => {
  return `mailto:${receiverEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
};

/**
 * Create SMS data URI.
 */
export const generateSmsData = ({
  phoneNumber,
  smsMessage,
}: {
  phoneNumber: string;
  smsMessage: string;
}): string => {
  return `sms:${phoneNumber}?body=${encodeURIComponent(smsMessage)}`;
};

/**
 * Generate a WhatsApp link with an encoded message.
 */
export const generateWhatsAppLink = ({
  waPhoneNumber,
  waMessage,
}: {
  waPhoneNumber: string;
  waMessage: string;
}): string => {
  return `https://wa.me/${waPhoneNumber}?text=${encodeURIComponent(waMessage)}`;
};

/**
 * Generate a PDF from content string (simple placeholder for future logic).
 */
export const generatePDF = ({ pdfContent }: { pdfContent: string }): string => {
  return pdfContent;
};

/**
 * Return image content string (URL/base64 placeholder).
 */
export const generateImage = ({ imageContent }: { imageContent: string }): string => {
  return imageContent;
};
