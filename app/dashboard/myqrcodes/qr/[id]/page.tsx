import QrDetail from "@/app/dashboard/components/QrDetail";
import type { QrData, QrType, QrCategory } from "@/types/qr-generator";

// Simulate fetching QR detail (replace with real fetch logic)
const allQrData: QrData[] = [
  {
    id: "1",
    name: "Product Launch",
    type: "link" as QrType,              // ✅ Must match your defined QrType union
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
    qrImage: "/qr1-image.png",
    category: "link" as QrCategory,     // ✅ Must match your defined QrCategory union      
  },
  // Add more items as needed
];

export default function QrDetailPage({ params }: { params: { id: string } }) {
  const qr = allQrData.find(q => q.id === params.id);
  if (!qr) return <div className="p-8 text-red-500">QR Code not found.</div>;
  return <QrDetail qr={qr} onClose={() => {}} />;
}
