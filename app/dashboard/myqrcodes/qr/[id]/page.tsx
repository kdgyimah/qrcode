import QrDetail from "@/app/dashboard/components/QrDetail";
import type { QrData, QrType, QrCategory } from "@/types/qr-generator"; // Adjust import path as needed

// Simulate fetching QR detail (replace with real fetch logic)
const allQrData: QrData[] = [
  {
    id: "1",
    name: "Product Launch",
    type: "link" as QrType, // mock value for type, must be "link", "email", or "pdf"
    folder: "Marketing",
    created: "2025-05-01",
    scans: 152,
    lastScan: "2025-05-20",
    status: "Active",
    description: "This QR promotes our product launch.",
    tags: ["launch", "marketing"],
    link: "https://example.com/product-launch",
    visits: 200,
    lastModified: "2025-05-21",
    qrImage: "/qr1-image.png", // mock value for qrImage
    category: "link" as QrCategory,     // mock value for category, must be "link", "email", or "pdf"
    // Add any other required properties with default or mock values
  },
  // ...other QR items
];

export default function QrDetailPage({ params }: { params: { id: string } }) {
  const qr = allQrData.find(q => q.id === params.id);
  if (!qr) return <div className="p-8 text-red-500">QR Code not found.</div>;
  return <QrDetail qr={qr} onClose={() => {}} />;
}