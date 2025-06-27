"use client";

import React, { useState } from "react";
import TopBar from "../analytics/TopBar";
import SummaryStats from "../analytics/SummaryStats";
import ScanActivityChart from "../analytics/ScanActivityChart";
import PieStats from "../analytics/PieStats";
import QrCodesTable from "../myqrcodes/QrCodeTable";

// --- Mock Data ---
const summaryData = [
  { label: "Total QR Codes", value: 121 },
  { label: "Active QR Codes", value: 83 },
  { label: "Total Scans", value: 234 },
  { label: "Folders", value: 12 },
];

const scanActivityData = [
  { date: "Apr 1", scans: 120 }, { date: "Apr 2", scans: 80 }, { date: "Apr 3", scans: 90 },
  { date: "Apr 4", scans: 150 }, { date: "Apr 5", scans: 110 }, { date: "Apr 6", scans: 170 },
  // ... rest of your scan activity data ...
];

interface QrCodeRow {
  name: string;
  img: string;
  totalScans: number;
  scanFreq: string;
  location: string;
  date: string;
  status: string;
}

const qrTableData: QrCodeRow[] = [
  {
    name: "QR for Events",
    img: "/qr-sample-1.png",
    totalScans: 120,
    scanFreq: "Weekly",
    location: "Nigeria",
    date: "2024-04-01",
    status: "Active",
  },
  // ... rest of your QR code data ...
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

  return (
    <div className="w-full">
      {/* Top bar: search + date */}
      <TopBar
        search={topSearch}
        setSearch={setTopSearch}
        dateRange={dateRange}
        onDateClick={() => {
  _setDateRange("Mar 1 - Apr 1, 2024"); // update when user selects new range
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
        qrOptions={["All QR Codes", "QR for Events", "Promo QR", "Product QR", "Website QR"]}
        sortOptions={["Date", "Scans"]}
        dateOptions={["Last 7 Days", "Last 30 Days", "Custom"]}
      />

      {/* Pie stats */}
      <PieStats
        osData={[
          { name: "iOS", value: 50 },
          { name: "Android", value: 30 },
          { name: "Windows", value: 10 },
          { name: "Others", value: 10 },
        ]}
        countryData={[
          { name: "Nigeria", value: 60 },
          { name: "Ghana", value: 20 },
          { name: "Kenya", value: 10 },
          { name: "Others", value: 10 },
        ]}
        deviceTypeData={[
          { name: "Mobile", value: 80 },
          { name: "Desktop", value: 15 },
          { name: "Tablet", value: 5 },
        ]}
      />

      {/* Table */}
      <QrCodesTable
        data={qrTableData}
        onRowClick={(qr) => {
          console.log("QR code clicked:", qr);
          // Add your click handling logic here
        }}
        search={tableSearch}
        setSearch={setTableSearch}
      />
    </div>
  );
}