// types/qr-generator.ts




// QR category type
export type QrCategory = "link" | "email" | "pdf";

// QR type (static or dynamic)
export type QrType = "Static" | "Dynamic";

// Individual QR category info
export interface QRCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

// Dynamic form data used to generate QR codes
export interface QRFormData {
  [key: string]: string | boolean | File | null;
}

// Style configuration for a generated QR code
export interface QRCodeStyle {
  shape: "square" | "circle" | "rounded";
  backgroundColor: string;
  foregroundColor: string;
  logo?: File | null;
  logoSize: number;
}

// Main unified QR data interface
export interface QrData {
  id: string;
  name: string;
  type: QrType;                      // Static or Dynamic
  category: QrCategory;              // link, email, pdf
  link: string;                      // URL or email or file path
  folder: string;
  created: string;                   // ISO string or display date
  lastModified: string;
  scans: number;
  lastScan: string;
  visits: number;
  status: "Active" | "Inactive";
  description: string;
  tags: string[];
  qrImage: string;                   // preview image URL or path
  qrCodeUrl?: string;                // optional CDN-hosted version
  data?: QRFormData;                 // optional form input used for generation
  style?: QRCodeStyle;
               // optional QR visual styling
}

// Optional: Extend with UI-related fields if needed in frontend
export interface QrDataWithUI extends QrData {
  selected?: boolean;
  isEditing?: boolean;
}

// Chart data type for analytics visualizations (e.g., Pie/Bar charts)
export type ChartData = {
  name: string;
  value: number;
};
