"use client";

import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { FaChevronDown } from "react-icons/fa";

export default function ScanActivityChart({
  data,
  filterQr,
  chartDateRange,
}: {
  data: { date: string; scans: number }[];
  filterQr: string;
  setFilterQr: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  chartDateRange: string;
  setChartDateRange: (v: string) => void;
  qrOptions: string[];
  sortOptions: string[];
  dateOptions: string[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-2">
        {/* Left: QR Dropdown */}
        <div className="relative">
          <button className="border rounded px-3 py-1 flex items-center" onClick={() => {}}>
            {filterQr} <FaChevronDown className="ml-2 text-xs" />
          </button>
          {/* Replace with dropdown logic if needed */}
        </div>
        {/* Right: Sort & Date */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button className="border rounded px-3 py-1 flex items-center" onClick={() => {}}>
              Sort by <FaChevronDown className="ml-2 text-xs" />
            </button>
            {/* Replace with dropdown logic if needed */}
          </div>
          <div className="relative">
            <button className="border rounded px-3 py-1 flex items-center" onClick={() => {}}>
              {chartDateRange} <FaChevronDown className="ml-2 text-xs" />
            </button>
            {/* Replace with dropdown logic if needed */}
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="scans"
            stroke="#34c759"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}