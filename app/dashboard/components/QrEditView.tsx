"use client";

import React, { useState, useEffect } from "react";
import { ArrowDownToLine, Edit2, Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import type { QrData } from "@/types/qr-generator";

interface QrEditViewProps {
  qr: QrData;
  onClose?: () => void;
  onSaved?: (updatedQr: QrData) => void;
}

export default function QrEditView({ qr, onSaved }: QrEditViewProps) {
  const [name, setName] = useState(qr.name);
  const [link, setLink] = useState(qr.link);
  const [folder, setFolder] = useState(qr.folder);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );

  useEffect(() => {
    setName(qr.name);
    setLink(qr.link);
    setFolder(qr.folder);
  }, [qr]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    try {
      await new Promise((res) => setTimeout(res, 700)); // Simulate API call

      const updatedQr: QrData = {
        id: qr.id,
        name,
        link,
        folder,
        lastModified: new Date().toISOString(),
        created: qr.created ?? new Date().toISOString(),
        type: qr.type ?? "Dynamic",
        scans: qr.scans ?? 0,
        lastScan: qr.lastScan ?? "",
        status: qr.status ?? "Active",
        description: qr.description ?? "",
        qrImage: qr.qrImage ?? "/images/sample-qr.png",
        category: qr.category ?? "link",
        tags: qr.tags ?? [],
        visits: qr.visits ?? 0,
      };

      onSaved?.(updatedQr);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 1000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1000);
    }
  }

  const formattedCreated = qr.created
    ? new Date(qr.created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "";
  const formattedModified = qr.lastModified
    ? new Date(qr.lastModified).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "";

  return (
    <div className="w-full p-2 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Edit QR Details</h1>
          <div className="text-sm text-gray-400">
            {formattedCreated && <>Created {formattedCreated}</>}
            {formattedCreated && formattedModified && <> · </>}
            {formattedModified && <>Last Modified {formattedModified}</>}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button
            title="Delete"
            className="rounded-full p-2 border border-gray-200 hover:bg-red-50"
            type="button"
          >
            <Trash2 size={18} className="text-blue-500" />
          </button>
          <button
            title="Share"
            className="rounded-full p-2 border border-gray-200 hover:bg-blue-50"
            type="button"
          >
            <Share2 size={18} className="text-blue-500" />
          </button>
          <button
            title="Edit"
            className="rounded px-4 py-2 border border-blue-200 text-blue-700 bg-white flex items-center gap-1 font-medium"
            type="button"
          >
            <Edit2 size={18} />
            Edit
          </button>
          <button
            title="Download"
            className="rounded px-5 py-2 bg-blue-600 text-white flex items-center gap-1 font-medium hover:bg-blue-700"
            type="button"
            onClick={() => {
              if (qr.qrImage) {
                const link = document.createElement("a");
                link.href = qr.qrImage;
                link.download = "qr-code.png";
                link.click();
              }
            }}
          >
            <ArrowDownToLine size={18} />
            Download
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col md:flex-row gap-14">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-8 w-[70%] shadow flex flex-col gap-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              QR Name
            </label>
            <input
              placeholder="Enter QR name"
              className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target URL
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-200 bg-gray-50 text-gray-400 text-sm">
                https://
              </span>
              <input
                placeholder="your-url.com"
                className="w-full border border-gray-200 rounded-r px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white"
                value={link.replace(/^https?:\/\//, "")}
                onChange={(e) =>
                  setLink(
                    "https://" + e.target.value.replace(/^https?:\/\//, "")
                  )
                }
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Folder
            </label>
            <select
              className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              required
            >
              <option value="">Select Folder</option>
              <option value="Marketing">Marketing</option>
              <option value="Event">Event</option>
              <option value="Surveys">Surveys</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 mt-2 font-medium transition"
            disabled={status === "saving"}
          >
            {status === "saving"
              ? "Saving..."
              : status === "success"
              ? "Saved!"
              : status === "error"
              ? "Error!"
              : "Save Changes"}
          </button>
        </form>

        {/* QR Preview */}
        <div className="w-full md:w-96 flex-shrink-2">
          <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
            {qr.qrImage ? (
              <Image
                src={qr.qrImage}
                alt="QR Code"
                width={192}
                height={192}
                className="w-48 h-48 object-contain mb-6"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-100 flex items-center justify-center mb-6 rounded text-gray-400">
                No QR
              </div>
            )}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 flex items-center justify-center gap-2 font-medium transition"
              type="button"
              onClick={() => {
                if (qr.qrImage) {
                  const link = document.createElement("a");
                  link.href = qr.qrImage;
                  link.download = "qr-code.png";
                  link.click();
                }
              }}
            >
              <ArrowDownToLine size={18} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
