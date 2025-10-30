import type { DotTypes, Gradient } from "qr-code-styling";
import { unknown } from "zod";


// ===================
// QR code type: either static or dynamic
// ===================
export type QrType = "static" | "dynamic";

// ===================
// Available QR code categories (single source of truth)
// ===================
export const categories = [
  "link",
  "call",
  "mail",
  "sms",
  "whatsapp",
  "wifi",
  "image",
  "video",
  "bulkqr",
  "app",
  "social",
  "event",
  "barcode2d",
  "contact",
  "pdf",
] as const;

export type Category = typeof categories[number]; // auto union from array

// ===================
// Information about a QR category (used in UI)
// ===================
export interface QRCategory {
  id: Category;             // category key, e.g. 'link'
  name: string;             // Display name
  description: string;      // Short description
  icon: string;             // Icon name (Lucide icon key)
  color: string;            // Tailwind color class (e.g., 'bg-blue-600')
}

// ===================
// Category-specific form data
// ===================
export interface LinkFormData { url: string; }
export interface CallFormData { phone: string; }
export interface MailFormData { email: string; subject?: string; message?: string; }
export interface SmsFormData { phone: string; message: string; }
export interface WhatsAppFormData { waPhone: string; waBody?: string; }
export interface WifiFormData { ssid: string; password?: string; encryption: "WPA" | "WEP" | "None" | string; }
export interface ImageFormData { uploadType?: "url" | "file"; imageUrl?: string; file?: File; }
export interface VideoFormData { videoUrl: string; }
export interface BulkQRFormData { bulkList: string; }
export interface AppFormData { appUrl: string; }
export interface SocialFormData { socialUrl: string; }
export interface EventFormData { eventTitle: string; eventStart: string; eventEnd?: string; eventLocation?: string; eventDesc?: string; }
export interface BarcodeFormData { barcodeValue: string; }
export interface ContactFormData {
  firstName?: string; lastName?: string; organization?: string; jobTitle?: string;
  phone?: string; mobile?: string; email?: string; website?: string;
  address?: string; city?: string; state?: string; zip?: string; country?: string;
}
export interface PdfFormData { uploadType?: "url" | "file"; pdfUrl?: string; file?: File; }


// Map category to its form data

export interface QRFormDataByCategory {
  link: LinkFormData;
  call: CallFormData;
  mail: MailFormData;
  sms: SmsFormData;
  whatsapp: WhatsAppFormData;
  wifi: WifiFormData;
  image: ImageFormData;
  video: VideoFormData;
  bulkqr: BulkQRFormData;
  app: AppFormData;
  social: SocialFormData;
  event: EventFormData;
  barcode2d: BarcodeFormData;
  contact: ContactFormData;
  pdf: PdfFormData;
}

// Union of all form data types
export type AnyQRFormData = QRFormDataByCategory[keyof QRFormDataByCategory];

// Discriminated union for "type-safe category + data"
export type QRFormDataUnion = {
  [K in keyof QRFormDataByCategory]: {
    type: K;
    data: QRFormDataByCategory[K];
  };
}[keyof QRFormDataByCategory];

// ===================
// Visual customization for a generated QR code
// ===================
export interface QRCodeStyle {
  shape: "square" | "circle" | "rounded";
  backgroundColor: string;
  foregroundColor: string;
  logo?: File | string | null;
  logoSize?: number;
  
}



// ===================
// Complete QR code record used in app/database
// ===================
export interface QrData {
  id: string;
  name: string;
  type: QrType;
  category: Category;
  link: string;
  folder: string;
  folderId?: string;
  created: string;
  lastModified: string;
  scans: number;
  lastScan: string;
  visits: number;
  status: "Active" | "Inactive";
  description: string;
  tags: string[];
  qrImage: string;
  qrCodeUrl?: string;
  data?: AnyQRFormData;
  style?: QRCodeStyle;
}

// Extended data for UI
export interface QrDataWithUI extends QrData {
  selected?: boolean;
  isEditing?: boolean;
}




// ===================
// Reusable format for analytics charts
// ===================
export interface ChartData { name: string; value: number; }

// ===================
// Generic form props
// ===================
export interface FormProps<T> {
  onContentCreate: (data: T) => void;
  formData: T;
  errors: Partial<Record<keyof T, string>>;
  onChange: <K extends keyof T>(field: K, value: T[K]) => void;
  onPhoneChange?: <K extends keyof T>(field: K, value: string) => void;
  onValidityChange?: (isValid: boolean) => void; // 🔥 added
}


// ===================
// Layout props
// ===================
export interface LayoutProps {
  children?: React.ReactNode;
  params: { id: string };
}

export interface QRFormRendererProps {
  category: QRCategory;
  formData: AnyQRFormData;
  setFormData: React.Dispatch<React.SetStateAction<AnyQRFormData>>;
  onValidityChange?: (isValid: boolean) => void;
}


interface QrCodesTableProps {
  data: QrData[];
  onRowClick?: (qr: QrData) => void;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
}



type DotType =
  | "dots"
  | "rounded"
  | "classy"
  | "classy-rounded"
  | "square"
  | "extra-rounded"
  | "dot";

type QRStyleOptions = {
  type: DotType;
  color: string;
  gradient?: Gradient;
  
};

export interface QRStyle {
  dotsOptions: QRStyleOptions;
  cornersSquareOptions: QRStyleOptions;
  cornersDotOptions: QRStyleOptions;
}

export type QRFrameStyle = {
  dotsOptions?: {
    type?: DotTypes;
    color?: string;
    gradient?: Gradient;
    roundSize?: boolean;
  };
  cornersSquareOptions?: {
    type?: DotType;
    color?: string;
    gradient?: Gradient;
  };
  cornersDotOptions?: {
    type?: DotType;
    color?: string;
    gradient?: Gradient;
  };
};

export interface QROutputInterfaceProps {
  content: {
    phoneNumber?: string;
    waPhoneNumber?: string;
    smsMessage?: string;
    waMessage?: string;
    showIcon?: boolean;
    firstName?: string;
    lastName?: string;
    pdfTitle?: string;
    pdfAuthor?: string;
    pdfMessage?: string;
    pdfImage?: string;
    url?: string;
    description?: string;
    email?: string;
    receiverEmail?: string;
    subject?: string;
    message?: string;
    address?: string;
    company?: string;
    jobTitle?: string;
    imageUrl?: string;
    pdfContent?: string;
    imageContent?: string;
  };
  qrStyle: QRStyle;
  onStyleChange: React.Dispatch<React.SetStateAction<QRStyle>>; // ✅ FIXED
}
