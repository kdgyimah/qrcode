"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MoreHorizontal, X, Trash, Download, Eye, Copy } from "lucide-react";
import Image from "next/image";
import PaginationBar from "@/components/PaginationBar";
import { QrData } from "@/types/qr-generator";

interface QrTableProps {
  data: QrData[];
  onRowClick: (qr: QrData) => void;
  onRowEdit?: (qr: QrData) => void;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
}

function getCategoryLabel(qr: QrData) {
  switch (qr.category) {
    case "mail":
      return <span className="text-xs text-blue-600 break-all">{qr.link}</span>;
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
    default:
      return (
        <a
          href={qr.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 underline break-all"
        >
          {qr.link}
        </a>
      );
  }
}

export default function QrTable({
  data,
  onRowClick,
  onRowEdit,
  search = "",
  setSearch,
}: QrTableProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sel) => sel !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelected(
      selected.length === paginatedData.length
        ? []
        : paginatedData.map((qr) => qr.id)
    );
  };

  const clearSelection = () => setSelected([]);

  
  const filteredData = useMemo(() => {
    if (!search) return data;
    const term = search.toLowerCase();
    return data.filter(
      (qr) =>
        qr.name.toLowerCase().includes(term) ||
        qr.folder.toLowerCase().includes(term) ||
        qr.category.toLowerCase().includes(term)
    );
  }, [data, search]);

  // Pagination calculations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const showingStart = totalItems > 0 ? startIndex + 1 : 0;
  const showingEnd = Math.min(endIndex, totalItems);

  const allSelected =
    selected.length === paginatedData.length && paginatedData.length > 0;

  return (
    <div className="relative">
      {/* Desktop info */}
      {setSearch && (
        <div className="hidden md:block mb-4">
          <div className="text-sm text-gray-600 mb-2">
            {totalItems} QR code{totalItems !== 1 ? "s" : ""} found
          </div>
        </div>
      )}

      {/* === DESKTOP TABLE === */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-3 w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="accent-blue-600 w-4 h-4 rounded"
                />
              </th>
              <th className="text-left p-3 w-20">QR Code</th>
              <th className="text-left p-3">QR Code Name</th>
              <th className="text-left p-3 w-24">Type</th>
              <th className="text-left p-3 w-32">Folder</th>
              <th className="text-left p-3 w-32">Date Created</th>
              <th className="text-left p-3 w-20">Scans</th>
              <th className="text-left p-3 w-32">Last Scan</th>
              <th className="text-left p-3 w-24">Status</th>
              <th className="text-right p-3 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((qr) => (
              <tr
                key={qr.id}
                onClick={() => onRowClick(qr)}
                className={`border-t text-sm bg-white cursor-pointer hover:bg-blue-50 transition ${
                  selected.includes(qr.id) ? "bg-blue-50" : ""
                }`}
              >
                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.includes(qr.id)}
                    onChange={() => handleSelect(qr.id)}
                    className="accent-blue-600 w-4 h-4 rounded"
                  />
                </td>
                <td className="p-3">
                  <Image
                    src={qr.qrImage}
                    alt={qr.name}
                    width={48}
                    height={48}
                    className="rounded shadow border border-gray-100"
                  />
                </td>
                <td className="p-3 font-medium text-gray-800">
                  <div className="truncate">{qr.name}</div>
                  <div className="mt-1">{getCategoryLabel(qr)}</div>
                </td>
                <td className="p-3 text-gray-700">{qr.type}</td>
                <td className="p-3 text-gray-700 truncate">{qr.folder}</td>
                <td className="p-3 text-gray-700">{qr.created}</td>
                <td className="p-3 text-gray-700">{qr.scans}</td>
                <td className="p-3 text-gray-700">{qr.lastScan}</td>
                <td className="p-3">
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
                <td
                  className="p-3 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end gap-2">
                    {onRowEdit && (
                      <button
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
      </div>

      {/* === EMPTY STATE === */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No QR codes found</div>
          <div className="text-gray-500 text-sm">
            {search
              ? "Try adjusting your search terms"
              : "Create your first QR code to get started"}
          </div>
        </div>
      )}

      {/* ✅ DESKTOP FLOATING ACTION TOOLBAR (Right Side Popup) */}
      {selected.length > 0 && (
        <div className="hidden md:block fixed right-4 top-1/4 z-50">
          <div className="flex flex-col gap-2 rounded-xl shadow-lg bg-white border border-gray-200 p-2 transition-all">
            <button
              onClick={clearSelection}
              className="p-2 hover:bg-gray-50 rounded-lg transition"
            >
              <X size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-blue-50 rounded-lg transition">
              <Trash size={20} className="text-blue-600" />
            </button>
            <button className="p-2 hover:bg-blue-50 rounded-lg transition">
              <Download size={20} className="text-blue-600" />
            </button>
            <button className="p-2 hover:bg-blue-50 rounded-lg transition">
              <Eye size={20} className="text-blue-600" />
            </button>
            <button className="p-2 hover:bg-blue-50 rounded-lg transition">
              <Copy size={20} className="text-blue-600" />
            </button>
            <div className="mx-auto mt-2 text-blue-600 font-semibold text-sm">
              {selected.length}
            </div>
          </div>
        </div>
      )}

      {/* === PAGINATION === */}
      {totalItems > 0 && (
        <div className={`${selected.length > 0 ? "mb-20 md:mb-0" : ""}`}>
          <PaginationBar
            showingStart={showingStart}
            showingEnd={showingEnd}
            total={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
