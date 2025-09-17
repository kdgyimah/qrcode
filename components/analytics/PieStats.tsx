"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChartData } from "@/types/qr-generator";

// Palette for each donut
const pieColors = [
  ["#34c759", "#007aff", "#ff9500", "#a2845e"], // OS
  ["#007aff", "#34c759", "#ff9500", "#a2845e"], // Country
  ["#ff9500", "#34c759", "#007aff", "#a2845e"], // Device Type
];

// Custom legend with responsive layout
function CustomLegend({
  data,
  colors,
}: {
  data: ChartData[];
  colors: string[];
}) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 w-full sm:max-w-xs">
      {data.map((entry, idx) => (
        <div key={entry.name} className="flex items-center">
          <span
            className="inline-block w-3 h-3 mr-2 rounded"
            style={{ backgroundColor: colors[idx % colors.length] }}
          />
          <span className="text-xs font-medium truncate">{entry.name}</span>
          <span className="ml-1 text-xs text-gray-400">{entry.value}%</span>
        </div>
      ))}
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
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center w-full h-full">
      <span className="font-semibold text-center mb-3 text-sm sm:text-base">
        {label}
      </span>
      <div className="w-full h-40 sm:h-48">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="70%"
              fill="#8884d8"
              dataKey="value"
              stroke="#fff"
              strokeWidth={4}
            >
              {data.map((entry, idx) => (
                <Cell
                  key={`cell-${label}-${idx}`}
                  fill={colors[idx % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend data={data} colors={colors} />
    </div>
  );
}

// ✅ Main component
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
