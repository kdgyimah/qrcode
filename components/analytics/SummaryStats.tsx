import React from "react";
import { FaQrcode, FaBarcode, FaUsers, FaChartLine } from "react-icons/fa";

export default function SummaryStats({
  stats,
}: {
  stats: { label: string; value: number }[];
}) {
  // Map labels to icons and colors
  const iconMap: Record<
    string,
    { icon: React.ReactNode; color: string }
  > = {
    "QR Codes": { icon: <FaQrcode />, color: "#10B981" }, // green
    "Scans": { icon: <FaBarcode />, color: "#F59E0B" }, // amber
    "Users": { icon: <FaUsers />, color: "#3B82F6" }, // blue
    "Revenue": { icon: <FaChartLine />, color: "#EF4444" }, // red
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {stats.map((card) => {
        const { icon, color } = iconMap[card.label] || {};
        return (
          <div
            key={card.label}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 flex flex-col items-center justify-center text-center"
          >
            {icon && (
              <div className="mb-2 text-2xl sm:text-3xl" style={{ color }}>
                {icon}
              </div>
            )}
            <div className="text-sm sm:text-base text-gray-500 font-medium">
              {card.label}
            </div>
            <div className="text-xl sm:text-2xl font-bold mt-1 text-gray-800">
              {card.value.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
