"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ✅ shadcn Select

export default function ScanActivityChart({
  data,
  filterQr,
  setFilterQr,
  sortBy,
  setSortBy,
  chartDateRange,
  setChartDateRange,
  qrOptions,
  sortOptions,
  dateOptions,
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
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        {/* Left: QR Dropdown */}
        <Select value={filterQr} onValueChange={setFilterQr}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Select QR" />
          </SelectTrigger>
          <SelectContent>
            {qrOptions.map((qr) => (
              <SelectItem key={qr} value={qr}>
                {qr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Right: Sort & Date */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={chartDateRange} onValueChange={setChartDateRange}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              {dateOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              fontSize={12}
              tick={{ fill: "#6b7280" }}
              tickLine={false}
            />
            <YAxis
              fontSize={12}
              tick={{ fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                fontSize: "0.75rem",
                borderRadius: "0.5rem",
              }}
            />
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
    </div>
  );
}
