"use client";

import Image from "next/image";
import React from "react";

export type QrCodeRow = {
  name: string;
  img: string;
  totalScans: number;
  scanFreq: string;
  location: string;
  date: string;
  status: string;
};

interface QrCodesTableProps {
  data: QrCodeRow[];
  onRowClick: (qr: QrCodeRow) => void;
  search: string;
  setSearch: (value: string) => void;
}

export default function QrCodesTable({ 
  data, 
  onRowClick, 
  search, 
  setSearch 
}: QrCodesTableProps) {
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <span className="font-semibold text-lg">QR Code Details</span>
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="Search QR codes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left">QR Code</th>
              <th className="py-2 px-3 text-left">Total Scans</th>
              <th className="py-2 px-3 text-left">Scan Frequency</th>
              <th className="py-2 px-3 text-left">Location</th>
              <th className="py-2 px-3 text-left">Date Created</th>
              <th className="py-2 px-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((qr, idx) => (
              <tr 
                key={idx} 
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick(qr)}
              >
                <td className="py-2 px-3 flex items-center gap-2">
                  <Image 
                    src={qr.img} 
                    alt={`QR Code: ${qr.name}`}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded bg-gray-100" 
                  />
                  <span>{qr.name}</span>
                </td>
                <td className="py-2 px-3">{qr.totalScans}</td>
                <td className="py-2 px-3">{qr.scanFreq}</td>
                <td className="py-2 px-3">{qr.location}</td>
                <td className="py-2 px-3">{qr.date}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      qr.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {qr.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-400">
                  No QR codes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button className="px-2 text-sm text-blue-600">{"<"}</button>
        <span className="px-2 text-sm">1</span>
        <button className="px-2 text-sm text-blue-600">{">"}</button>
      </div>
    </div>
  );
}