// QR code type: either static or dynamic
export type QrType = "static" | "dynamic";

// Available QR code categories
export type QrCategory =
  | "link"
  | "email"
  | "pdf"
  | "contact"
  | "phone"
  | "sms"
  | "vcard"
  | "app"
  | "social"
  | "image"
  | "video"
  | "wifi"
  | "event"
  | "bulk";

// Information about a QR category used in the UI
export interface QRCategory {
  id: string;               // category key, e.g. 'link'
  name: string;             // Display name
  description: string;      // Short description
  icon: string;             // Icon name (Lucide icon key)
  color: string;            // Tailwind color class (e.g., 'bg-blue-600')
}

// Form data used to generate a QR code (varies by category)
export interface QRFormData {
  url?: string;
  phone?: string;
  email?: string;
  subject?: string;
  body?: string;
  message?: string;
  ssid?: string;
  password?: string;
  security?: string;
  text?: string;
  content?: string;
  [key: string]: string | boolean | File | null | undefined;
}

// Visual customization for a generated QR code
export interface QRCodeStyle {
  shape: 'square' | 'circle' | 'rounded';
  backgroundColor: string;
  foregroundColor: string;
  logo?: File | string | null; // ← allow string too for URL-based logos
  logoSize?: number; // % relative to QR size
}

// Complete QR code record used in app/database
export interface QrData {
  id: string;
  name: string;
  type: String;
  category: QrCategory;
  link: string;               // Could be a URL, phone, etc.
  folder: string;
  created: string;            // ISO date string
  lastModified: string;       // ISO date string
  scans: number;
  lastScan: string;           // ISO date string
  visits: number;
  status: "Active" | "Inactive";
  description: string;
  tags: string[];
  qrImage: string;            // Preview image path/URL
  qrCodeUrl?: string;         // CDN or public-facing QR code
  data?: QRFormData;          // Optional form input
  style?: QRCodeStyle;        // Optional styling
}

// Extended data used in UI (for editing, selection)
export interface QrDataWithUI extends QrData {
  selected?: boolean;
  isEditing?: boolean;
}

// Reusable format for analytics charts (Pie/Bar)
export interface ChartData {
  name: string;
  value: number;
}
