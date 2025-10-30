// app/dashboard/components/QrTabs.tsx

export type QrTabType = "all" | "static" | "dynamic" | "scheduled";

interface QrTabsProps {
  selectedTab: QrTabType;
  onTabChange: (tab: QrTabType) => void;
}

const tabConfig: { key: QrTabType; label: string }[] = [
  { key: "all", label: "All QRs" },
  { key: "static", label: "Static" },
  { key: "dynamic", label: "Dynamic" },
  { key: "scheduled", label: "Scheduled" },
];

export default function QrTabs({ selectedTab, onTabChange }: QrTabsProps) {
  return (
    <div className="bg-white border rounded-2xl p-2 sm:p-1">
      <div className="flex flex-wrap gap-2">
        {tabConfig.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              selectedTab === tab.key
                ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
