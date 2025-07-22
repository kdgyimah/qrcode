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
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Settings</h2>
          <p className="text-gray-400 text-sm">Tailor Your Experience</p>
        </div>
        <button className="btn-primary px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Continue
        </button>
      </div>
      <SettingsTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="mt-8">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "plans" && <PlansBillingSettings />}
        {activeTab === "notifications" && <NotificationPreferenceSettings />}
      </div>
    </div>
  );
}