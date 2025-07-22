import React from "react";

export default function SummaryStats({ stats }: { stats: { label: string; value: number }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {stats.map((card) => (
        <div key={card.label} className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold">{card.label}</div>
          <div className="text-2xl font-bold mt-2">{card.value}</div>
        </div>
      ))}
    </div>
  );
}