import QrEditView from "@/components/QrEditView";
import { ArrowDownToLine, Edit2, Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import type { QrData, QrType } from "@/types/qr-generator";

const mockQr: QrData = {
  id: "123",
  name: "Sample QR",
  link: "https://example.com",
  folder: "Marketing",
  created: "2025-01-01T12:00:00.000Z",
  lastModified: "2025-01-02T12:00:00.000Z",
  qrImage: "/qr.png",
  type: "Dynamic" as QrType,
  category: "link",
  scans: 42,
  lastScan: "2025-01-02T10:00:00.000Z",
  status: "Active",
  description: "Promo QR code for marketing",
  tags: ["promo", "campaign"],
  visits: 100,
  qrCodeUrl: "/cdn/qrs/123.png",
  style: {
    shape: "rounded",
    backgroundColor: "#ffffff",
    foregroundColor: "#000000",
    logo: null,
    logoSize: 20,
  },
};

const allQrData: QrData[] = [mockQr];

async function fetchQrById(id: string) {
  await new Promise((res) => setTimeout(res, 50));
  return allQrData.find((q) => q.id === id) || null;
}

export default async function QreditViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const qr = await fetchQrById(id);
  if (!qr) return <div className="p-8 text-red-500">QR Code not found.</div>;

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 bg-[#fafafd] flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold mb-1">
            Edit QR Details
          </h1>
          <div className="text-sm text-gray-400">
            Created{" "}
            {new Date(qr.created).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}{" "}
            · Last Modified{" "}
            {new Date(qr.lastModified).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            title="Delete"
            className="rounded-full p-2 border border-gray-200 hover:bg-red-50"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
          <button
            title="Share"
            className="rounded-full p-2 border border-gray-200 hover:bg-blue-50"
          >
            <Share2 size={18} className="text-blue-500" />
          </button>
          <button
            title="Edit"
            className="rounded px-4 py-2 border border-blue-200 text-blue-700 bg-white flex items-center gap-1 font-medium"
          >
            <Edit2 size={18} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            title="Download"
            className="rounded px-4 py-2 bg-blue-600 text-white flex items-center gap-1 font-medium hover:bg-blue-700"
          >
            <ArrowDownToLine size={18} />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Edit Form */}
        <div className="flex-1">
          <QrEditView qr={qr} />
        </div>

        {/* QR Preview */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <Image
              src={qr.qrImage}
              alt="QR Code"
              width={192}
              height={192}
              className="w-40 h-40 sm:w-48 sm:h-48 object-contain mb-6"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 flex items-center justify-center gap-2 font-medium transition">
              <ArrowDownToLine size={18} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
