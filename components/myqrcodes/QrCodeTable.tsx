import React, { useState } from "react";
import { MoreHorizontal, X, Trash, Download, Eye, Copy } from "lucide-react";
import Image from "next/image";
import PaginationBar from "@/components/PaginationBar";
import { QrData } from "@/types/qr-generator";

// ✅ Accept `data` prop from parent
interface QrTableProps {
  data: QrData[];
  onRowClick: (qr: QrData) => void;
  onRowEdit?: (qr: QrData) => void;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
}

function getCategoryLabel(qr: QrData) {
  switch (qr.category) {
    case "email":
      return <span className="text-xs text-blue-600">{qr.link}</span>;
    case "pdf":
      return (
        <a
          href={qr.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 underline"
        >
          PDF
        </a>
      );
    case "link":
    default:
      return (
        <a
          href={qr.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 underline"
        >
          {qr.link}
        </a>
      );
  }
}

export default function QrTable({ data, onRowClick, onRowEdit }: QrTableProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sel) => sel !== id) : [...prev, id]
    );
  };

  const allSelected = selected.length === data.length;

  const total = 20;
  const perPage = 8;
  const showingStart = 1;
  const showingEnd = Math.min(perPage, total);

  return (
    <div className="relative overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-white text-sm text-gray-600">
          <tr>
            <th className="p-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() =>
                  setSelected(allSelected ? [] : data.map((qr) => qr.id))
                }
                aria-label="Select all"
                className="accent-blue-600 w-4 h-4 rounded"
              />
            </th>
            <th className="text-left p-3">QR Code</th>
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
          {data.map((qr) => (
            <tr
              key={qr.id}
              className={`border-t text-sm bg-white transition cursor-pointer hover:bg-blue-50 ${
                selected.includes(qr.id) ? "bg-blue-50" : ""
              }`}
              onClick={() => onRowClick(qr)}
            >
              <td className="p-3 py-4" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selected.includes(qr.id)}
                  onChange={() => handleSelect(qr.id)}
                  aria-label={`Select ${qr.name}`}
                  className="accent-blue-600 w-4 h-4 rounded"
                />
              </td>
              <td className="p-3 py-4">
                <Image
                  src={qr.qrImage}
                  alt={qr.name}
                  width={48}
                  height={48}
                  className="rounded shadow border border-gray-100"
                />
              </td>
              <td className="p-3 py-4 font-medium text-gray-800">
                {qr.name}
                <div className="mt-1">{getCategoryLabel(qr)}</div>
              </td>
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
              <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-end gap-2">
                  {onRowEdit && (
                    <button
                      title="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowEdit(qr);
                      }}
                      className="text-blue-600 hover:underline text-xs font-medium"
                    >
                      Edit
                    </button>
                  )}
                  <button className="text-gray-600 hover:text-gray-900">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected.length > 0 && (
        <div className="fixed right-4 top-1/4 z-50 flex flex-col gap-2 rounded-xl shadow-lg bg-white border border-gray-200 p-2 transition-all">
          <button className="p-2 hover:bg-blue-50 rounded">
            <X size={20} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-blue-50 rounded">
            <Trash size={20} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-blue-50 rounded">
            <Download size={20} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-blue-50 rounded">
            <Eye size={20} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-blue-50 rounded">
            <Copy size={20} className="text-blue-600" />
          </button>
          <span className="mx-auto mt-2 text-blue-600 font-semibold">
            {selected.length}
          </span>
        </div>
      )}

      <PaginationBar
        showingStart={showingStart}
        showingEnd={showingEnd}
        total={total}
        page={1}
      />
    </div>
  );
}
