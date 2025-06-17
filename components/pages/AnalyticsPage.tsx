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
  { date: "Apr 7", scans: 100 }, { date: "Apr 8", scans: 130 }, { date: "Apr 9", scans: 110 },
  { date: "Apr 10", scans: 160 }, { date: "Apr 11", scans: 140 }, { date: "Apr 12", scans: 120 },
  { date: "Apr 13", scans: 130 }, { date: "Apr 14", scans: 170 }, { date: "Apr 15", scans: 180 },
  { date: "Apr 16", scans: 120 }, { date: "Apr 17", scans: 180 }, { date: "Apr 18", scans: 140 },
  { date: "Apr 19", scans: 110 }, { date: "Apr 20", scans: 120 }, { date: "Apr 21", scans: 90 },
  { date: "Apr 22", scans: 150 }, { date: "Apr 23", scans: 120 }, { date: "Apr 24", scans: 130 },
  { date: "Apr 25", scans: 110 }, { date: "Apr 26", scans: 100 }, { date: "Apr 27", scans: 130 },
  { date: "Apr 28", scans: 120 }, { date: "Apr 29", scans: 150 }, { date: "Apr 30", scans: 140 },
];

const osData = [
  { name: "iOS", value: 50 },
  { name: "Android", value: 30 },
  { name: "Windows", value: 10 },
  { name: "Others", value: 10 },
];
const countryData = [
  { name: "Nigeria", value: 60 },
  { name: "Ghana", value: 20 },
  { name: "Kenya", value: 10 },
  { name: "Others", value: 10 },
];
const deviceTypeData = [
  { name: "Mobile", value: 80 },
  { name: "Desktop", value: 15 },
  { name: "Tablet", value: 5 },
];

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
  {
    name: "Promo QR",
    img: "/qr-sample-2.png",
    totalScans: 80,
    scanFreq: "Monthly",
    location: "Ghana",
    date: "2024-04-03",
    status: "Active",
  },
  {
    name: "Product QR",
    img: "/qr-sample-3.png",
    totalScans: 60,
    scanFreq: "Daily",
    location: "Kenya",
    date: "2024-04-05",
    status: "Inactive",
  },
  {
    name: "Website QR",
    img: "/qr-sample-4.png",
    totalScans: 110,
    scanFreq: "Weekly",
    location: "Nigeria",
    date: "2024-04-07",
    status: "Active",
  },
];

export default function AnalyticsPage() {
  // Page/global state
  const [topSearch, setTopSearch] = useState("");
  const [dateRange, setDateRange] = useState("Feb 1 - Mar 1, 2024");

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
          // implement date picker logic here
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
      <PieStats />

      {/* Table */}
      <QrCodesTable
        data={qrTableData}
        search={tableSearch}
        setSearch={setTableSearch}
      />
    </div>
  );
}