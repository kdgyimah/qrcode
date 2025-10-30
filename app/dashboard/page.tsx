"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import AnalyticsPage from "@/components/pages/AnalyticsPage";
import TeamPage from "@/components/pages/TeamPage";
import BulkPage from "@/components/pages/BulkPage";
import ApiIntegrationPage from "@/components/pages/ApiIntegrationPage";
import SettingsPage from "@/app/dashboard/settings/SettingsPage";
import SupportPage from "@/components/pages/SupportPage";

import QrDetailView from "@/components/QrDetail";
import QrEditView from "@/components/QrEditView";
import MyQrCodesClient from "../../components/MyQrCodesClient";
import QRGeneratorPage from "@/components/qr-generator/QRGeneratorPage";
import type { QrData } from "@/types/qr-generator";
import { useUser } from "@/hooks/useUser";
import TrialModal from "@/components/TrialModal";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("my-qrs");
  const [detailQr, setDetailQr] = useState<QrData | null>(null);
  const [editQr, setEditQr] = useState<QrData | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
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
    setLogoutLoading(true);
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
          id={editQr.id}
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

  if (loading || !user || logoutLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">
          {logoutLoading ? "Logging out..." : "Loading your dashboard..."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar for large screens */}
        <div
          className={cn(
            "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:transition-all lg:duration-300",
            sidebarCollapsed ? "lg:w-20" : "lg:w-64"
          )}
        >
          <Sidebar
            open
            setOpen={setSidebarOpen}
            onNavigate={setActiveView}
            activeView={activeView}
            onCollapse={setSidebarCollapsed}
          />
        </div>

        {/* Sidebar drawer for mobile */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <Sidebar
              open={sidebarOpen}
              setOpen={setSidebarOpen}
              onNavigate={setActiveView}
              activeView={activeView}
            />
          </div>
        )}

        {/* Main content area */}
        <div
          className={cn(
            "flex flex-1 min-w-0 flex-col w-full lg:transition-all lg:duration-300",
            sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
          )}
        >
          <Header setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />
          <main className="flex-1 overflow-y-auto px-2 py-2 sm:px-4 sm:py-6 bg-gray-100 relative text-sm sm:text-base">
            {renderMainContent()}
          </main>
        </div>
      </div>

      {!loading && user?.user_metadata?.trial_started_at && <TrialModal />}
    </>
  );
}
