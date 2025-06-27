import QrEditView from "@/app/dashboard/components/QrEditView";
import { ArrowDownToLine, Edit2, Share2, Trash2 } from "lucide-react";
import Image from "next/image";

// Mock data and fetch function
const allQrData = [
  {
    id: "1",
    name: "Product Launch",
    link: "https://behance.portfolio",
    folder: "Event",
    created: "2025-02-15",
    lastModified: "2025-03-02",
    qrImage: "/qr1-image.png",
  },
  // ...other QR codes
];

async function fetchQrById(id: string) {
  // Simulate async fetching
  await new Promise((res) => setTimeout(res, 50));
  return allQrData.find(q => q.id === id) || null;
}

export default async function QreditViewPage({ params }: { params: { id: string } }) {
  const qr = await fetchQrById(params.id);
  if (!qr) return <div className="p-8 text-red-500">QR Code not found.</div>;

  // Header as in the DetailView
  return (
    <div className="w-full min-h-screen p-8 bg-[#fafafd] flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Edit QR Details</h1>
          <div className="text-sm text-gray-400">
            Created {new Date(qr.created).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })} . Last Modified {new Date(qr.lastModified).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
          </div>
        </div>
        <div className="flex gap-2">
          <button title="Delete" className="rounded-full p-2 border border-gray-200 hover:bg-red-50">
            <Trash2 size={18} className="text-red-500" />
          </button>
          <button title="Share" className="rounded-full p-2 border border-gray-200 hover:bg-blue-50">
            <Share2 size={18} className="text-blue-500" />
          </button>
          <button title="Edit" className="rounded px-5 py-2 border border-blue-200 text-blue-700 bg-white flex items-center gap-1 font-medium">
            <Edit2 size={18} />
            Edit
          </button>
          <button title="Download" className="rounded px-5 py-2 bg-blue-600 text-white flex items-center gap-1 font-medium hover:bg-blue-700">
            <ArrowDownToLine size={18} />
            Download
          </button>
        </div>
      </div>
      {/* Content Area: Form and QR Preview */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <QrEditView qr={qr} />
        </div>
        <div className="w-full md:w-96 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <Image
              src={qr.qrImage}
              alt="QR Code"
              className="w-48 h-48 object-contain mb-6"
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