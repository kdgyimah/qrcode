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
    { icon: React.ReactNode; bgColor: string; iconColor: string }
  > = {
    "QR Codes": { 
      icon: <FaQrcode />, 
      bgColor: "bg-emerald-50", 
      iconColor: "text-emerald-600" 
    },
    "Scans": { 
      icon: <FaBarcode />, 
      bgColor: "bg-amber-50", 
      iconColor: "text-amber-600" 
    },
    "Users": { 
      icon: <FaUsers />, 
      bgColor: "bg-blue-50", 
      iconColor: "text-blue-600" 
    },
    "Revenue": { 
      icon: <FaChartLine />, 
      bgColor: "bg-rose-50", 
      iconColor: "text-rose-600" 
    },
  };

  return (
    <div className="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-6">
      {stats.map((card) => {
        const { icon, bgColor, iconColor } = iconMap[card.label] || {
          icon: <FaQrcode />,
          bgColor: "bg-gray-50",
          iconColor: "text-gray-600"
        };
        
        return (
          <div
            key={card.label}
            className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden"
          >
            <div className="p-5 sm:p-6 lg:p-7">
              <div className="flex items-start justify-between mb-4 sm:mb-5">
                <div className={`${bgColor} ${iconColor} p-3 sm:p-3.5 lg:p-4 rounded-lg text-xl sm:text-2xl transition-transform hover:scale-110`}>
                  {icon}
                </div>
              </div>
              
              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide">
                  {card.label}
                </p>
                <p className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                  {card.value.toLocaleString()}
                </p>
              </div>
            </div>
            
            {/* Optional: Bottom accent line */}
            <div className={`h-1 ${bgColor.replace('50', '200')}`} />
          </div>
        );
      })}
    </div>
  );
}