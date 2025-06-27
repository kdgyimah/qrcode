export interface QRCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface QRFormData {
  [key: string]: string | boolean | File | null;
}

export interface QRCodeStyle {
  shape: 'square' | 'circle' | 'rounded';
  backgroundColor: string;
  foregroundColor: string;
  logo?: File | null;
  logoSize: number;
}

export interface GeneratedQR {
  id: string;
  name: string;
  category: string;
  data: QRFormData;
  style: QRCodeStyle;
  qrCodeUrl: string;
  createdAt: Date;
}