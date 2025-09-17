"use client";

import { useState } from "react";
import MyQrCodesClient from "../../../components/MyQrCodesClient";
import type { QrData } from "@/types/qr-generator";

export default function Page() {
  const [selectedQr, setSelectedQr] = useState<QrData | null>(null);
  const [mode, setMode] = useState<"detail" | "edit" | null>(null);

  const handleShowDetail = (qr: QrData) => {
    setSelectedQr(qr);
    setMode("detail");
  };

  const handleShowEdit = (qr: QrData) => {
    setSelectedQr(qr);
    setMode("edit");
  };

  const handleCreateClick = () => {
    // Your logic to open a create QR code modal or page
    console.log("Create button clicked");
  };

  const handleClosePanel = () => {
    setSelectedQr(null);
    setMode(null);
  };

  return (
    <div className="relative">
      <MyQrCodesClient
        onShowDetail={handleShowDetail}
        handleCreateClick={handleCreateClick}
        onShowEdit={handleShowEdit}
      />

      {/* Responsive Drawer/Panel */}
      {selectedQr && mode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:items-start sm:justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleClosePanel}
          />

          {/* Panel */}
          <div
            className={`
              relative bg-white shadow-lg rounded-t-lg sm:rounded-l-lg sm:rounded-t-none
              w-full sm:w-[400px] md:w-[500px] lg:w-[600px]
              h-[90vh] sm:h-full
              overflow-y-auto
              z-50
              animate-slide-up sm:animate-slide-left
            `}
          >
            <button
              onClick={handleClosePanel}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            <div className="p-6">
              {mode === "detail" ? (
                <div>
                  <h2 className="text-xl font-bold mb-2">QR Code Details</h2>
                  <p>
                    <strong>Title:</strong> {selectedQr.name}
                  </p>
                  <p>
                    <strong>Type:</strong> {selectedQr.type}
                  </p>
                  <p>
                    <strong>Folder:</strong> {selectedQr.folder}
                  </p>
                  <p>
                    <strong>Scans:</strong> {selectedQr.scans}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedQr.status}
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    Created: {selectedQr.created} | Last Modified:{" "}
                    {selectedQr.lastModified}
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold mb-4">Edit QR Code</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Save logic here
                      alert("Changes saved (mock)");
                      handleClosePanel();
                    }}
                  >
                    <label className="block mb-2">
                      Name:
                      <input
                        type="text"
                        defaultValue={selectedQr.name}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </label>
                    <button
                      type="submit"
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
