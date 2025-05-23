// app/dashboard/components/QrTable.tsx

"use client";

import { MoreHorizontal } from "lucide-react";

const qrData = [
  // Add more entries as needed
  {
    name: "Product Launch",
    type: "Dynamic",
    folder: "Marketing",
    created: "2025-05-01",
    scans: 152,
    lastScan: "2025-05-20",
    status: "Active",
  },
  {
    name: "Product Launch",
    type: "Dynamic",
    folder: "Marketing",
    created: "2025-05-01",
    scans: 152,
    lastScan: "2025-05-20",
    status: "Active",
  },
  {
    name: "Product Launch",
    type: "Dynamic",
    folder: "Marketing",
    created: "2025-05-01",
    scans: 152,
    lastScan: "2025-05-20",
    status: "Active",
  },
  {
    name: "Product Launch",
    type: "Static",
    folder: "Marketing",
    created: "2025-05-01",
    scans: 152,
    lastScan: "2025-05-20",
    status: "Inactive",
  },
];

export default function QrTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-white text-sm text-gray-600">
          <tr>
            <th className="text-left p-3">QR Code Name</th>
            <th className="text-left p-3">Type</th>
            <th className="text-left p-3">Folder</th>
            <th className="text-left p-3">Date Created</th>
            <th className="text-left p-3">Scans</th>
            <th className="text-left p-3">Last Scan</th>
            <th className="text-left p-3">Status</th>
            <th className="text-right p-3"></th>
          </tr>
        </thead>
        <tbody>
          {qrData.map((qr, index) => (
            <tr
              key={index}
              className="border-t text-sm bg-white transition"
            >
              <td className="p-3 py-4 font-medium text-gray-800">{qr.name}</td>
              <td className="p-3 py-4 text-gray-700">{qr.type}</td>
              <td className="p-3 py-4 text-gray-700">{qr.folder}</td>
              <td className="p-3 py-4 text-gray-700">{qr.created}</td>
              <td className="p-3 py-4 text-gray-700">{qr.scans}</td>
              <td className="p-3 py-4 text-gray-700">{qr.lastScan}</td>
              <td className="p-3 py-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    qr.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {qr.status}
                </span>
              </td>
              <td className="p-3 text-right">
                <button className="text-gray-600 hover:text-gray-900">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
