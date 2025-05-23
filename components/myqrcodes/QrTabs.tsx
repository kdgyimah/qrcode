// app/dashboard/components/QrTabs.tsx

"use client";

import { useState } from "react";

const tabs = ["All QRs", "Static", "Dynamic", "Scheduled"];

export default function QrTabs() {
  const [active, setActive] = useState("All QRs");

  return (
    <div className="bg-white border rounded-2xl">
      <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            active === tab
              ? ""
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
    </div>
  );
}
