import QrDetail from "@/app/dashboard/components/QrDetail";

// Simulate fetching QR detail (replace with real fetch logic)
const allQrData = [
  {
    id: "1",
    name: "Product Launch",
    type: "Dynamic",
    folder: "Marketing",
    created: "2025-05-01",
    scans: 152,
    lastScan: "2025-05-20",
    status: "Active",
    imageUrl: "/qr1.png",
    description: "This QR promotes our product launch.",
    tags: ["launch", "marketing"],
    link: "https://example.com/product-launch",
    visits: 200,
    lastModified: "2025-05-21",
    qrImage: "/qr1-image.png", // mock value for qrImage
    category: "link" as "link",     // mock value for category, must be "link", "email", or "pdf"
    // Add any other required properties with default or mock values
  },
  // ...other QR items
];

export default function QrDetailPage({ params }: { params: { id: string } }) {
  const qr = allQrData.find(q => q.id === params.id);
  if (!qr) return <div className="p-8 text-red-500">QR Code not found.</div>;
  return <QrDetail qr={qr} onClose={() => {}} />;
}