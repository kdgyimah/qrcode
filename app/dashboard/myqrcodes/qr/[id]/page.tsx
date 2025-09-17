import QrDetail from "@/components/QrDetail";
import type { QrData, QrType } from "@/types/qr-generator";

// Simulate fetching QR detail (replace with real fetch logic)
const allQrData: QrData[] = [
  {
    id: "1",
    name: "Product Launch",
    type: "link" as QrType,
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
    category: "link",
  },
  // Add more items as needed
];

export default async function QrDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const qr = allQrData.find((q) => q.id === id);

  if (!qr) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <p className="text-red-500 text-lg font-medium">
          QR Code not found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        <QrDetail qr={qr} onClose={() => {}} />
      </div>
    </div>
  );
}
