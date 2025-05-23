"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import React, { useState } from "react";
import MyQrCodesPage from "@/app/dashboard/myqrcodes/page";
// import AnalyticsPage from "@/components/pages/AnalyticsPage";
// import TeamPage from "@/components/pages/TeamPage";
// import BulkPage from "@/components/pages/BulkPage";
// import ApiIntegrationPage from "@/components/pages/ApiIntegrationPage";
// import SettingsPage from "@/components/pages/SettingsPage";
// import SupportPage from "@/components/pages/SupportPage";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("my-qrs");

  const renderView = () => {
    switch (activeView) {
      case "analytics":
        // return <AnalyticsPage />;
      case "team":
        // return <TeamPage />;
      case "bulk":
        // return <BulkPage />;
      case "api":
        // return <ApiIntegrationPage />;
      case "settings":
        // return <SettingsPage />;
      case "support":
        // return <SupportPage />;
      case "my-qrs":
      default:
        return <MyQrCodesPage />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} onNavigate={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
