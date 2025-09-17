"use client";

import React, { useState, useMemo } from "react";
import { MoreHorizontal, X, Trash, Download, Eye, Copy, Search, Filter } from "lucide-react";
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
    case "link":
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
  const [showFilters, setShowFilters] = useState(false);

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sel) => sel !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelected(selected.length === filteredData.length ? [] : filteredData.map((qr) => qr.id));
  };

  const clearSelection = () => {
    setSelected([]);
  };

  // --- Filter data based on search ---
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(
      (qr) =>
        qr.name.toLowerCase().includes(search.toLowerCase()) ||
        qr.folder.toLowerCase().includes(search.toLowerCase()) ||
        qr.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const total = filteredData.length;
  const perPage = 8;
  const showingStart = 1;
  const showingEnd = Math.min(perPage, total);
  const allSelected = selected.length === filteredData.length && filteredData.length > 0;

  return (
    <div className="relative">
      {/* Mobile Header with Search and Filters */}
      <div className="block md:hidden mb-4 px-1">
        <div className="flex items-center gap-2 mb-3">
          {setSearch && (
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search QR codes..."
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 flex-shrink-0"
          >
            <Filter size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Mobile Selection Header */}
        {filteredData.length > 0 && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 min-w-0">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="accent-blue-600 w-4 h-4 rounded flex-shrink-0"
              />
              <span className="text-sm text-gray-600 truncate">
                {selected.length > 0 ? `${selected.length} selected` : "Select all"}
              </span>
            </div>
            {selected.length > 0 && (
              <button
                onClick={clearSelection}
                className="text-sm text-blue-600 hover:text-blue-800 flex-shrink-0 ml-2"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Desktop Search Input */}
      {setSearch && (
        <div className="hidden md:block mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, folder, or category..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-3 w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all"
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
            {filteredData.map((qr) => (
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
                <td className="p-3 py-4 font-medium text-gray-800 min-w-0">
                  <div className="truncate">{qr.name}</div>
                  <div className="mt-1 min-w-0">{getCategoryLabel(qr)}</div>
                </td>
                <td className="p-3 py-4 text-gray-700">{qr.type}</td>
                <td className="p-3 py-4 text-gray-700 truncate">{qr.folder}</td>
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
      </div>

      {/* TABLET TABLE - Simplified columns */}
      <div className="hidden md:block lg:hidden overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-3 w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all"
                  className="accent-blue-600 w-4 h-4 rounded"
                />
              </th>
              <th className="text-left p-3 w-20">QR</th>
              <th className="text-left p-3">Name & Details</th>
              <th className="text-left p-3 w-24">Scans</th>
              <th className="text-left p-3 w-24">Status</th>
              <th className="text-right p-3 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((qr) => (
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
                    width={40}
                    height={40}
                    className="rounded shadow border border-gray-100"
                  />
                </td>
                <td className="p-3 py-4 min-w-0">
                  <div className="font-medium text-gray-800 truncate">{qr.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{qr.type} • {qr.folder}</div>
                  <div className="text-xs text-gray-400 mt-1">{qr.created}</div>
                </td>
                <td className="p-3 py-4 text-gray-700 text-center">{qr.scans}</td>
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
                  <button className="text-gray-600 hover:text-gray-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
<div className="grid gap-4 md:hidden px-2">
  {filteredData.map((qr) => (
    <div
      key={qr.id}
      onClick={() => onRowClick(qr)}
      className={`bg-white p-4 rounded-2xl shadow-sm border transition cursor-pointer hover:shadow-md active:scale-[0.98] ${
        selected.includes(qr.id) ? "ring-2 ring-blue-500 bg-blue-50" : ""
      }`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <input
            type="checkbox"
            checked={selected.includes(qr.id)}
            onChange={(e) => {
              e.stopPropagation();
              handleSelect(qr.id);
            }}
            className="accent-blue-600 w-4 h-4 rounded flex-shrink-0"
          />
          <Image
            src={qr.qrImage}
            alt={qr.name}
            width={44}
            height={44}
            className="rounded-lg shadow-sm border border-gray-200 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">
              {qr.name.length > 25 ? `${qr.name.substring(0, 25)}...` : qr.name}
            </div>
            <div className="text-xs text-gray-500 truncate">{getCategoryLabel(qr)}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${
              qr.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {qr.status}
          </span>
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="grid grid-cols-2 gap-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Type</span>
          <span className="text-gray-800 font-semibold">{qr.type}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Scans</span>
          <span className="text-gray-800 font-semibold">{qr.scans}</span>
        </div>
        <div className="flex items-center justify-between col-span-2">
          <span className="text-gray-500 font-medium">Folder</span>
          <span
            className="text-gray-800 font-semibold truncate max-w-[160px]"
            title={qr.folder}
          >
            {qr.folder}
          </span>
        </div>
        <div className="flex items-center justify-between col-span-2">
          <span className="text-gray-500 font-medium">Created</span>
          <span className="text-gray-800 font-semibold">
            {qr.created.length > 10 ? qr.created.substring(0, 10) : qr.created}
          </span>
        </div>
      </div>

      {/* Edit Button */}
      {onRowEdit && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRowEdit(qr);
            }}
            className="w-full text-blue-600 text-sm font-medium hover:text-blue-800 transition"
          >
            ✏️ Edit QR Code
          </button>
        </div>
      )}
    </div>
  ))}
</div>


      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No QR codes found</div>
          <div className="text-gray-500 text-sm">
            {search ? "Try adjusting your search terms" : "Create your first QR code to get started"}
          </div>
        </div>
      )}

      {/* Mobile Bottom Action Bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={clearSelection}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={20} className="text-gray-600" />
                </button>
                <span className="text-sm font-semibold text-gray-700">
                  {selected.length} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-blue-50 rounded-lg transition">
                  <Eye size={18} className="text-blue-600" />
                </button>
                <button className="p-2 hover:bg-blue-50 rounded-lg transition">
                  <Download size={18} className="text-blue-600" />
                </button>
                <button className="p-2 hover:bg-blue-50 rounded-lg transition">
                  <Copy size={18} className="text-blue-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition">
                  <Trash size={18} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Floating Action Toolbar */}
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

      <div className={`${selected.length > 0 ? 'mb-20 md:mb-0' : ''}`}>
        <PaginationBar
          showingStart={showingStart}
          showingEnd={showingEnd}
          total={total}
          page={1}
        />
      </div>
    </div>
  );
}