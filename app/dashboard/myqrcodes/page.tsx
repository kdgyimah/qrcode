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

      {/* Conditional Drawer/Panel */}
      {selectedQr && mode && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90vw] max-w-lg relative shadow-lg">
            <button
              onClick={handleClosePanel}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              &times;
            </button>

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
                {/* You can replace this with a proper form component */}
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
                  {/* Add more fields as needed */}
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
      )}
    </div>
  );
}
