"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { ChartData } from "@/types/qr-generator"; // ✅ Import ChartData type

// Palette for each donut
const pieColors = [
  ["#34c759", "#007aff", "#ff9500", "#a2845e"], // OS
  ["#007aff", "#34c759", "#ff9500", "#a2845e"], // Country
  ["#ff9500", "#34c759", "#007aff", "#a2845e"], // Device Type
];

// Custom legend with two columns and percentage
function CustomLegend({
  data,
  colors,
}: {
  data: ChartData[];
  colors: string[];
}) {
  const mid = Math.ceil(data.length / 2);
  const firstCol = data.slice(0, mid);
  const secondCol = data.slice(mid);

  return (
    <div className="flex w-full justify-center mt-2 gap-8">
      <div className="flex flex-col">
        {firstCol.map((entry, idx) => (
          <div key={entry.name} className="flex items-center mb-1">
            <span
              className="inline-block w-3 h-3 mr-2 rounded"
              style={{ backgroundColor: colors[idx % colors.length] }}
            />
            <span className="text-xs font-medium">{entry.name}</span>
            <span className="ml-2 text-xs text-gray-400">{entry.value}%</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {secondCol.map((entry, idx) => (
          <div key={entry.name} className="flex items-center mb-1">
            <span
              className="inline-block w-3 h-3 mr-2 rounded"
              style={{
                backgroundColor: colors[(mid + idx) % colors.length],
              }}
            />
            <span className="text-xs font-medium">{entry.name}</span>
            <span className="ml-2 text-xs text-gray-400">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({
  data,
  colors,
  label,
}: {
  data: ChartData[];
  colors: string[];
  label: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center w-full max-w-xs mx-auto">
      <span className="font-semibold mb-2">{label}</span>
      <PieChart width={160} height={160}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
          stroke="#fff"
          strokeWidth={5}
        >
          {data.map((entry, idx) => (
            <Cell
              key={`cell-${label}-${idx}`}
              fill={colors[idx % colors.length]}
            />
          ))}
        </Pie>
      </PieChart>
      <CustomLegend data={data} colors={colors} />
    </div>
  );
}

// ✅ Fix: Accept props
export default function PieStats({
  osData,
  countryData,
  deviceTypeData,
}: {
  osData: ChartData[];
  countryData: ChartData[];
  deviceTypeData: ChartData[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <DonutChart
        data={osData}
        colors={pieColors[0]}
        label="Scan by Operating System"
      />
      <DonutChart
        data={countryData}
        colors={pieColors[1]}
        label="Scan by Country"
      />
      <DonutChart
        data={deviceTypeData}
        colors={pieColors[2]}
        label="Scan by Device Type"
      />
    </div>
  );
}
