"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import React, { useState } from "react";
import MyQrCodesPage from "@/app/dashboard/myqrcodes/page";
import AnalyticsPage from "@/components/pages/AnalyticsPage";
import TeamPage from "@/components/pages/TeamPage";
import BulkPage from "@/components/pages/BulkPage";
import ApiIntegrationPage from "@/components/pages/ApiIntegrationPage";
import SettingsPage from "@/app/dashboard/settings/SettingsPage";
import SupportPage from "@/components/pages/SupportPage";
import QrDetailView from "@/app/dashboard/components/QrDetail";
import QrEditView from "@/app/dashboard/components/QrEditView";
import type { QrData } from './types'; // adjust path as needed

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("my-qrs");
  const [detailQr, setDetailQr] = useState<QrData | null>(null);
  const [editQr, setEditQr] = useState<QrData | null>(null);

  // Handler to show detail
  const handleShowDetail = (qr: QrData) => {
    setDetailQr(qr);
    setEditQr(null); // Close edit view if open
  };

  // Handler to show edit in content area
  const handleShowEdit = (qr: QrData) => {
    setEditQr(qr);
    setDetailQr(null); // Close detail view if open
  };

  // Handler to close edit view
  const handleCloseEdit = () => setEditQr(null);

  // Handler to close detail view
  const handleCloseDetail = () => setDetailQr(null);

  // Handler for when edit is saved
  const handleEditSaved = (updatedQr: QrData) => {
    setEditQr(null);
    setDetailQr(updatedQr); // Optionally show detail after saving
  };

  return (
    <div className="flex h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} onNavigate={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 relative">
          {editQr ? (
            // Render edit view as main content (not modal)
            <QrEditView
              qr={editQr}
              onClose={handleCloseEdit}
              onSaved={handleEditSaved}
            />
          ) : detailQr ? (
            <QrDetailView
              qr={detailQr}
              onClose={handleCloseDetail}
              onEdit={handleShowEdit}
            />
          ) : (
            <>
              {activeView === "my-qrs" ? (
                <MyQrCodesPage
                  onShowDetail={handleShowDetail}
                  onShowEdit={handleShowEdit}
                />
              ) : activeView === "analytics" ? (
                <AnalyticsPage />
              ) : activeView === "team" ? (
                <TeamPage />
              ) : activeView === "bulk" ? (
                <BulkPage />
              ) : activeView === "api" ? (
                <ApiIntegrationPage />
              ) : activeView === "settings" ? (
                <SettingsPage />
              ) : activeView === "support" ? (
                <SupportPage />
              ) : (
                <MyQrCodesPage onShowDetail={handleShowDetail} onShowEdit={handleShowEdit} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}