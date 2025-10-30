export interface Folder {
  id: string;
  name: string;
  user_id: string;
  color?: string;
  created_at: string;
  updated_at?: string;
}

export interface QRCode {
  id: string;
  user_id: string;
  folder_id?: string | null;
  name: string;
  type: string; // 'url', 'text', 'vcard', 'email', 'phone', 'sms', 'wifi', etc.
  data: any; // JSON data for the QR code content
  qr_image_url?: string | null;
  scans_count: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  // Optional: Additional metadata
  design?: {
    fgColor?: string;
    bgColor?: string;
    logo?: string;
    pattern?: string;
  };
}

export interface Scan {
  id: string;
  qr_id: string;
  scanned_at: string;
  location?: string | null;
  country?: string | null;
  city?: string | null;
  device?: string | null;
  browser?: string | null;
  os?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
}

// Helper type for creating new records (without id, timestamps)
export type CreateFolder = Omit<Folder, 'id' | 'created_at' | 'updated_at'>;
export type CreateQRCode = Omit<QRCode, 'id' | 'created_at' | 'updated_at' | 'scans_count'>;
export type CreateScan = Omit<Scan, 'id' | 'scanned_at'>;

// Helper type for updating records
export type UpdateFolder = Partial<Omit<Folder, 'id' | 'user_id' | 'created_at'>>;
export type UpdateQRCode = Partial<Omit<QRCode, 'id' | 'user_id' | 'created_at'>>;