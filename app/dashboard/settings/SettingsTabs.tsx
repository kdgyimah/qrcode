"use client";

type Tab = { key: string; label: string };

export default function SettingsTabs({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}) {
  return (
    <div className="flex border-b border-gray-200 mb-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`px-6 py-2 border-b-2 font-medium transition-colors ${
            activeTab === tab.key
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}