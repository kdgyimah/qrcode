"use client";

import { useState } from "react";
import SettingsTabs from "./SettingsTabs";
import AccountSettings from "./tabs/AccountSettings";
import PlansBillingSettings from "./tabs/PlansBillingSettings";
import NotificationPreferenceSettings from "./tabs/NotificationPreferenceSettings";

const TABS = [
  { key: "account", label: "Account" },
  { key: "plans", label: "Plans & Billings" },
  { key: "notifications", label: "Notification & Preference" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold">Settings</h2>
          <p className="text-gray-500 text-sm">Tailor Your Experience</p>
        </div>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base">
          Continue
        </button>
      </div>

      {/* Tabs */}
      <SettingsTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab content */}
      <div className="mt-6 sm:mt-8">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "plans" && <PlansBillingSettings />}
        {activeTab === "notifications" && <NotificationPreferenceSettings />}
      </div>
    </div>
  );
}
