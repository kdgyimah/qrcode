export type QrData = {
  id: string;
  name: string;
  link: string;
  folder: string;
  created?: string;
  lastModified?: string;
  type?: string;
  scans?: number;
  lastScan?: string;
  status?: string;
  description?: string;
  qrImage?: string;
  category?: "link" | "email" | "pdf";
  tags?: string[];
  visits?: number;
  [key: string]: any; // allows extra properties
};