"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/superbase";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import AnalyticsPage from "@/components/pages/AnalyticsPage";
import TeamPage from "@/components/pages/TeamPage";
import BulkPage from "@/components/pages/BulkPage";
import ApiIntegrationPage from "@/components/pages/ApiIntegrationPage";
import SettingsPage from "@/app/dashboard/settings/SettingsPage";
import SupportPage from "@/components/pages/SupportPage";

import QrDetailView from "@/app/dashboard/components/QrDetail";
import QrEditView from "@/app/dashboard/components/QrEditView";
import MyQrCodesClient from "./components/MyQrCodesClient";
import QRGeneratorPage from "@/components/qr-generator/QRGeneratorPage";
import type { QrData } from "@/types/qr-generator";
import { useUser } from "@/hooks/useUser";
import TrialModal from "@/components/TrialModal";

export default function DashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("my-qrs");
  const [detailQr, setDetailQr] = useState<QrData | null>(null);
  const [editQr, setEditQr] = useState<QrData | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session) {
        router.replace("/login");
        return;
      }

      const user = session.user;

      // 🚨 Check and set trial start time if not already present
      if (!user.user_metadata?.trial_started_at) {
        await supabase.auth.updateUser({
          data: {
            trial_started_at: new Date().toISOString(),
          },
        });
      }

      setLoading(false);
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleShowDetail = (qr: QrData) => {
    setDetailQr(qr);
    setEditQr(null);
  };

  const handleShowEdit = (qr: QrData) => {
    setEditQr(qr);
    setDetailQr(null);
  };

  const handleCloseEdit = () => setEditQr(null);
  const handleCloseDetail = () => setDetailQr(null);

  const handleEditSaved = (updatedQr: QrData) => {
    setEditQr(null);
    setDetailQr(updatedQr);
  };

  const renderMainContent = () => {
    if (editQr) {
      return (
        <QrEditView
          qr={editQr}
          onClose={handleCloseEdit}
          onSaved={handleEditSaved}
          availableFolders={[]}
        />
      );
    }

    if (detailQr) {
      return (
        <QrDetailView
          qr={detailQr}
          onClose={handleCloseDetail}
          onEdit={handleShowEdit}
        />
      );
    }

    switch (activeView) {
      case "my-qrs":
        return (
          <MyQrCodesClient
            onShowDetail={handleShowDetail}
            onShowEdit={handleShowEdit}
            handleCreateClick={() => setActiveView("qr-generator")}
          />
        );
      case "qr-generator":
        return <QRGeneratorPage onBack={() => setActiveView("my-qrs")} />;
      case "analytics":
        return <AnalyticsPage />;
      case "team":
        return <TeamPage />;
      case "bulk":
        return <BulkPage />;
      case "api":
        return <ApiIntegrationPage />;
      case "settings":
        return <SettingsPage />;
      case "support":
        return <SupportPage />;
      default:
        return (
          <MyQrCodesClient
            onShowDetail={handleShowDetail}
            onShowEdit={handleShowEdit}
            handleCreateClick={() => setActiveView("qr-generator")}
          />
        );
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
  <>
    <div className="flex h-screen">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onNavigate={setActiveView}
      />
      <div className="flex-1 flex flex-col">
        <Header setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 relative">
          {renderMainContent()}
        </main>
      </div>
    </div>

    {!loading && user?.user_metadata?.trial_started_at && <TrialModal />}
  </>
);
}