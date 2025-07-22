"use client";

import { X, Edit2, Trash, Download, Share2 } from "lucide-react";
import { QrData } from "@/types/qr-generator"; 
import Image from "next/image";

export default function QrDetailView({
  qr,
  onClose,
  onEdit,        // Add this prop to trigger edit modal
  onShowEdit,    // Optional alternative for edit action
}: {
  qr: QrData;
  onClose: () => void;
  onEdit?: (qr: QrData) => void;
  onShowEdit?: (qr: QrData) => void;
}) {
  return (
    <div className="w-full mx-auto rounded-xl p-6 bg-white animate-fade-in">
      {/* Header: Title and Actions */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{qr.name}</h2>
          <div className="text-xs text-gray-400 mt-1">
            Created {qr.created} &nbsp;·&nbsp; Last Modified {qr.lastModified}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Share */}
          <button className="hover:bg-gray-100 rounded p-1" title="Share">
            <Share2 size={18} />
          </button>
          {/* Delete */}
          <button className="hover:bg-red-50 rounded p-1" title="Delete">
            <Trash size={18} className="text-red-500" />
          </button>
          {/* Edit */}
          <button
            className="hover:bg-blue-50 rounded p-1 border border-blue-100 text-blue-600 flex items-center gap-1"
            title="Edit"
            onClick={() => {
              if (onEdit) return onEdit(qr);
              if (onShowEdit) return onShowEdit(qr);
            }}
            type="button"
          >
            <Edit2 size={16} />
            Edit
          </button>
          {/* Download */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 ml-2 flex items-center gap-1"
            title="Download"
          >
            <Download size={16} />
            Download
          </button>
          {/* Close */}
          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded p-1 ml-1"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      {/* Tags/Links/Status */}
      <div className="flex flex-wrap items-center gap-2 mb-5 mt-2">
        {qr.tags?.map((tag: string) => (
          <span
            key={tag}
            className="inline-block bg-gray-100 text-xs text-gray-600 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
        {qr.link && (
          <a
            href={qr.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-blue-600 hover:underline"
          >
            {qr.link}
          </a>
        )}
        <span
          className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${
            qr.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {qr.status}
        </span>
      </div>
      {/* Stats and QR */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-1 flex gap-3">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
            <div className="bg-gray-50 rounded-md px-4 py-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Scan</div>
              <div className="text-xl font-semibold">{qr.scans}</div>
            </div>
            <div className="bg-gray-50 rounded-md px-4 py-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Visit</div>
              <div className="text-xl font-semibold">{qr.visits}</div>
            </div>
            <div className="bg-gray-50 rounded-md px-4 py-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Visit</div>
              <div className="text-xl font-semibold">{qr.visits}</div>
            </div>
          </div>
        </div>
        {/* QR Code */}
        <div className="flex-shrink-0 mt-6 sm:mt-0">
          {qr.qrImage ? (
            <Image
              src={qr.qrImage}
              alt="QR code"
              width={192}
              height={192}
              className="w-40 h-40 rounded shadow border border-gray-100"
            />
          ) : (
            <div className="w-40 h-40 rounded bg-gray-100 flex items-center justify-center text-gray-400">
              No QR
            </div>
          )}
        </div>
      </div>
    </div>
  );
}