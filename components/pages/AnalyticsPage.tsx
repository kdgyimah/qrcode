"use client";

import React, { useState } from "react";
import TopBar from "../analytics/TopBar";
import SummaryStats from "../analytics/SummaryStats";
import ScanActivityChart from "../analytics/ScanActivityChart";
import PieStats from "../analytics/PieStats";
import QrCodesTable from "../myqrcodes/QrCodeTable";
import { ChartData } from "@/types/qr-generator"; // ✅ Import ChartData

// --- Mock Data ---
const summaryData = [
  { label: "Total QR Codes", value: 121 },
  { label: "Active QR Codes", value: 83 },
  { label: "Total Scans", value: 234 },
  { label: "Folders", value: 12 },
];

const scanActivityData = [
  { date: "Apr 1", scans: 120 },
  { date: "Apr 2", scans: 80 },
  { date: "Apr 3", scans: 90 },
  { date: "Apr 4", scans: 150 },
  { date: "Apr 5", scans: 110 },
  { date: "Apr 6", scans: 170 },
];

// Replace QrCodeRow with QrData mock (ensure all required fields are present)
import { QrData, QrType, QrCategory } from "@/types/qr-generator";

export const qrTableData: QrData[] = [
  {
    id: "1",
    name: "QR for Events",
    type: "Dynamic",                      // QrType
    category: "link",                     // QrCategory
    link: "https://example.com/event",
    folder: "Events",
    created: "2024-03-01",
    lastModified: "2024-04-01",
    scans: 120,
    lastScan: "2024-04-01",
    visits: 150,
    status: "Active",
    description: "QR code for event entry",
    tags: ["event", "entry", "qr"],
    qrImage: "/qr-sample-1.png",
    qrCodeUrl: "https://cdn.example.com/qrs/qr1.png", // Optional
    data: {
      eventName: "Tech Conference",
      location: "Nigeria"
    },
    style: {
      shape: "square",
      backgroundColor: "#ffffff",
      foregroundColor: "#000000",
      logo: null,
      logoSize: 20,
    }
  },
  {
    id: "2",
    name: "Feedback QR",
    type: "Static",
    category: "link",
    link: "https://example.com/feedback",
    folder: "Surveys",
    created: "2024-02-15",
    lastModified: "2024-03-01",
    scans: 89,
    lastScan: "2024-03-01",
    visits: 120,
    status: "Inactive",
    description: "Collect user feedback",
    tags: ["feedback", "form"],
    qrImage: "/qr-sample-2.png",
    data: {
      formId: "fb123"
    },
    style: {
      shape: "circle",
      backgroundColor: "#f9f9f9",
      foregroundColor: "#1f2937",
      logo: null,
      logoSize: 25,
    }
  },
];

export default function AnalyticsPage() {
  // Page/global state
  const [topSearch, setTopSearch] = useState("");
  const [dateRange, _setDateRange] = useState("Feb 1 - Mar 1, 2024");

  // Chart filters state
  const [filterQr, setFilterQr] = useState("All QR Codes");
  const [sortBy, setSortBy] = useState("Date");
  const [chartDateRange, setChartDateRange] = useState("Last 30 days");

  // Table search state
  const [tableSearch, setTableSearch] = useState("");

  // ✅ Chart data with proper ChartData[] typing
  const osData: ChartData[] = [
    { name: "iOS", value: 50 },
    { name: "Android", value: 30 },
    { name: "Windows", value: 10 },
    { name: "Others", value: 10 },
  ];

  const countryData: ChartData[] = [
    { name: "Nigeria", value: 60 },
    { name: "Ghana", value: 20 },
    { name: "Kenya", value: 10 },
    { name: "Others", value: 10 },
  ];

  const deviceTypeData: ChartData[] = [
    { name: "Mobile", value: 80 },
    { name: "Desktop", value: 15 },
    { name: "Tablet", value: 5 },
  ];

  return (
    <div className="w-full">
      {/* Top bar: search + date */}
      <TopBar
        search={topSearch}
        setSearch={setTopSearch}
        dateRange={dateRange}
        onDateClick={() => {
          _setDateRange("Mar 1 - Apr 1, 2024");
        }}
      />

      {/* Stat cards */}
      <SummaryStats stats={summaryData} />

      {/* QR Code scan activities chart + filters */}
      <ScanActivityChart
        data={scanActivityData}
        filterQr={filterQr}
        setFilterQr={setFilterQr}
        sortBy={sortBy}
        setSortBy={setSortBy}
        chartDateRange={chartDateRange}
        setChartDateRange={setChartDateRange}
        qrOptions={[
          "All QR Codes",
          "QR for Events",
          "Promo QR",
          "Product QR",
          "Website QR",
        ]}
        sortOptions={["Date", "Scans"]}
        dateOptions={["Last 7 Days", "Last 30 Days", "Custom"]}
      />

      {/* Pie stats */}
      <PieStats
        osData={osData}
        countryData={countryData}
        deviceTypeData={deviceTypeData}
      />

      {/* Table */}
      <QrCodesTable
        data={qrTableData}
        onRowClick={(qr) => {
          console.log("QR code clicked:", qr);
        }}
        search={tableSearch}
        setSearch={setTableSearch}
      />
    </div>
  );
}
