"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowDownToLine, Edit2, Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import QRCodeStyling from "qr-code-styling";
import { supabase } from "@/lib/supabase";
import { folderService } from "@/lib/services/folders";
import type { QrData } from "@/types/qr-generator";
import type { Folder } from "@/types/database";

// Type definitions for QR data
interface LinkFormData {
  url: string;
  [key: string]: unknown;
}

interface CallFormData {
  phone: string;
  [key: string]: unknown;
}

interface MailFormData {
  email: string;
  subject?: string;
  message?: string;
  [key: string]: unknown;
}

interface SmsFormData {
  phone: string;
  message: string;
  [key: string]: unknown;
}

interface WhatsAppFormData {
  waPhone: string;
  waBody?: string;
  [key: string]: unknown;
}

interface WifiFormData {
  ssid: string;
  password?: string;
  encryption?: string;
  [key: string]: unknown;
}

interface EventFormData {
  eventStart: string;
  eventEnd?: string;
  eventTitle: string;
  eventLocation?: string;
  eventDesc?: string;
  [key: string]: unknown;
}

interface ContactFormData {
  firstName?: string;
  lastName?: string;
  organization?: string;
  jobTitle?: string;
  phone?: string;
  email?: string;
  address?: string;
  [key: string]: unknown;
}

interface QrEditViewProps {
  id: string;
  qr: QrData;
  availableFolders?: Folder[];
  onClose?: () => void;
  onSaved?: (updatedQr: QrData) => void;
  onDeleted?: () => void;
}

export default function QrEditView({
  qr,
  availableFolders = [],
  onSaved,
  onDeleted,
  onClose,
}: QrEditViewProps) {
  const [name, setName] = useState(qr.name);
  const [link, setLink] = useState(qr.link);
  const [folderId, setFolderId] = useState(qr.folderId || "");
  const [qrData, setQrData] = useState<Record<string, unknown>>(qr.data as Record<string, unknown> || {});
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [isDeleting, setIsDeleting] = useState(false);
  const [folders, setFolders] = useState<Folder[]>(availableFolders || []);
  const [isFetchingFolders, setIsFetchingFolders] = useState(false);
  const [previewQrUrl, setPreviewQrUrl] = useState(qr.qrImage);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setName(qr.name);
    setLink(qr.link);
    setFolderId(qr.folderId || "");
    setQrData(qr.data as Record<string, unknown> || {});
    setPreviewQrUrl(qr.qrImage);
  }, [qr]);

  // Fetch folders from Supabase if not provided
  useEffect(() => {
    if (!availableFolders || availableFolders.length === 0) {
      fetchFolders();
    }
  
  }, [availableFolders]);

  // Initialize QR code styling
  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = qr.style;
      const dotType = style?.shape === "square" ? "square" : style?.shape === "circle" ? "dots" : "rounded";
      
      qrCodeRef.current = new QRCodeStyling({
        width: 300,
        height: 300,
        data: qr.link,
        margin: 10,
        qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "Q" },
        imageOptions: { 
          hideBackgroundDots: true, 
          imageSize: style?.logoSize || 0.4, 
          margin: 0 
        },
        dotsOptions: {
          type: dotType,
          color: style?.foregroundColor || "#000000",
        },
        backgroundOptions: {
          color: style?.backgroundColor || "#ffffff",
        },
        cornersSquareOptions: {
          type: dotType === "square" ? "square" : "extra-rounded",
          color: style?.foregroundColor || "#000000",
        },
        cornersDotOptions: {
          type: dotType === "square" ? "square" : "dot",
          color: style?.foregroundColor || "#000000",
        },
        image: typeof style?.logo === "string" ? style.logo : undefined,
      });
    }
  }, [qr.link, qr.style]);

  // Type guards
  const isLinkData = useCallback((data: Record<string, unknown>): data is LinkFormData => {
    return typeof data.url === "string";
  }, []);

  const isCallData = useCallback((data: Record<string, unknown>): data is CallFormData => {
    return typeof data.phone === "string";
  }, []);

  const isMailData = useCallback((data: Record<string, unknown>): data is MailFormData => {
    return typeof data.email === "string";
  }, []);

  const isSmsData = useCallback((data: Record<string, unknown>): data is SmsFormData => {
    return typeof data.phone === "string";
  }, []);

  const isWhatsAppData = useCallback((data: Record<string, unknown>): data is WhatsAppFormData => {
    return typeof data.waPhone === "string";
  }, []);

  const isWifiData = useCallback((data: Record<string, unknown>): data is WifiFormData => {
    return typeof data.ssid === "string";
  }, []);

  const isEventData = useCallback((data: Record<string, unknown>): data is EventFormData => {
    return typeof data.eventStart === "string" && typeof data.eventTitle === "string";
  }, []);

  const isContactData = useCallback((data: Record<string, unknown>): data is ContactFormData => {
    return typeof data.firstName === "string" || typeof data.lastName === "string";
  }, []);

  // Generate link based on QR category and data
  const generateLinkFromData = useCallback((): string => {
    switch (qr.category) {
      case "link":
        return isLinkData(qrData) ? qrData.url : link;
      
      case "call":
        return isCallData(qrData) ? `tel:${qrData.phone}` : link;
      
      case "mail":
        if (isMailData(qrData)) {
          let mailUrl = `mailto:${qrData.email}`;
          const params = [];
          if (qrData.subject) params.push(`subject=${encodeURIComponent(qrData.subject)}`);
          if (qrData.message) params.push(`body=${encodeURIComponent(qrData.message)}`);
          if (params.length) mailUrl += `?${params.join("&")}`;
          return mailUrl;
        }
        return link;
      
      case "sms":
        if (isSmsData(qrData)) {
          return `sms:${qrData.phone}${qrData.message ? `?body=${encodeURIComponent(qrData.message)}` : ""}`;
        }
        return link;
      
      case "whatsapp":
        if (isWhatsAppData(qrData)) {
          return `https://wa.me/${qrData.waPhone}${qrData.waBody ? `?text=${encodeURIComponent(qrData.waBody)}` : ""}`;
        }
        return link;
      
      case "wifi":
        if (isWifiData(qrData)) {
          return `WIFI:T:${qrData.encryption || "WPA"};S:${qrData.ssid};P:${qrData.password || ""};;`;
        }
        return link;
      
      case "video":
        return (qrData.videoUrl as string | undefined) || link;
      
      case "image":
        return (qrData.imageUrl as string | undefined) || link;
      
      case "app":
        return (qrData.appUrl as string | undefined) || link;
      
      case "social":
        return (qrData.socialUrl as string | undefined) || link;
      
      case "event":
        if (isEventData(qrData)) {
          return `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${qrData.eventStart}
DTEND:${qrData.eventEnd || ""}
SUMMARY:${qrData.eventTitle}
LOCATION:${qrData.eventLocation || ""}
DESCRIPTION:${qrData.eventDesc || ""}
END:VEVENT
END:VCALENDAR`;
        }
        return link;
      
      case "contact":
        if (isContactData(qrData)) {
          return `BEGIN:VCARD
VERSION:3.0
FN:${qrData.firstName || ""} ${qrData.lastName || ""}
ORG:${qrData.organization || ""}
TITLE:${qrData.jobTitle || ""}
TEL:${qrData.phone || ""}
EMAIL:${qrData.email || ""}
ADR:${qrData.address || ""}
END:VCARD`;
        }
        return link;
      
      default:
        return link;
    }
  }, [qr.category, qrData, link, isLinkData, isCallData, isMailData, isSmsData, isWhatsAppData, isWifiData, isEventData, isContactData]);

  const regenerateQRCode = useCallback(async () => {
    if (!qrCodeRef.current || !canvasRef.current) return;

    try {
      const generatedLink = generateLinkFromData();
      
      qrCodeRef.current.update({
        data: generatedLink,
      });

      canvasRef.current.innerHTML = "";
      
      await qrCodeRef.current.append(canvasRef.current);

      const rawData = await qrCodeRef.current.getRawData("png");
      if (rawData instanceof Blob) {
        const url = URL.createObjectURL(rawData);
        setPreviewQrUrl(url);
      }
    } catch (error) {
      console.error("Error regenerating QR code:", error);
    }
  }, [generateLinkFromData]);

  // Regenerate QR code when data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      regenerateQRCode();
    }, 500);

    return () => clearTimeout(timer);
  }, [qrData, name, regenerateQRCode]);

  async function fetchFolders() {
    setIsFetchingFolders(true);
    try {
      const folderData = await folderService.getFolders();
      setFolders(folderData);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setIsFetchingFolders(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Not authenticated");
      }

      const generatedLink = generateLinkFromData();

      let qrImageUrl = qr.qrImage;
      if (qrCodeRef.current) {
        const blob = await qrCodeRef.current.getRawData("png");
        if (blob) {
          const fileName = `${qr.id}_${Date.now()}.png`;
          const filePath = `${user.id}/${fileName}`;

          if (qr.qrImage) {
            const urlParts = qr.qrImage.split('/');
            const storageIndex = urlParts.findIndex(part => part === 'storage');
            if (storageIndex !== -1) {
              const pathAfterBucket = urlParts.slice(storageIndex + 3).join('/');
              await supabase.storage.from("qr-codes").remove([pathAfterBucket]);
            }
          }

          const { error: uploadError } = await supabase.storage
            .from("qr-codes")
            .upload(filePath, blob, { contentType: "image/png" });

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from("qr-codes")
            .getPublicUrl(filePath);

          qrImageUrl = urlData.publicUrl;
        }
      }

      const selectedFolder = folders.find(f => f.id === folderId);

      const { data, error } = await supabase
        .from("qr_codes")
        .update({
          name,
          link: generatedLink,
          folder_id: folderId,
          folder: selectedFolder?.name || "",
          data: qrData,
          qr_image: qrImageUrl,
          last_modified: new Date().toISOString(),
        })
        .eq("id", qr.id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedQr: QrData = {
        ...qr,
        name,
        link: data.link,
        folderId: data.folder_id,
        folder: data.folder,
        data: data.data,
        qrImage: data.qr_image,
        lastModified: data.last_modified,
      };

      onSaved?.(updatedQr);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (error) {
      console.error("Error updating QR:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  async function handleDelete() {
    const confirmed = confirm(`Are you sure you want to delete "${qr.name}"? This action cannot be undone.`);
    
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Not authenticated");
      }

      if (qr.qrImage) {
        const urlParts = qr.qrImage.split('/');
        const storageIndex = urlParts.findIndex(part => part === 'storage');
        if (storageIndex !== -1) {
          const pathAfterBucket = urlParts.slice(storageIndex + 3).join('/');
          await supabase.storage
            .from("qr-codes")
            .remove([pathAfterBucket]);
        }
      }

      const { error } = await supabase
        .from("qr_codes")
        .delete()
        .eq("id", qr.id)
        .eq("user_id", user.id);

      if (error) throw error;

      onDeleted?.();
      onClose?.();
    } catch (error) {
      console.error("Error deleting QR:", error);
      alert("Failed to delete QR code. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleShare() {
    if (navigator.share && previewQrUrl) {
      try {
        const response = await fetch(previewQrUrl);
        const blob = await response.blob();
        const file = new File([blob], `${name}.png`, { type: "image/png" });

        await navigator.share({
          title: name,
          text: `QR Code for ${generateLinkFromData()}`,
          files: [file],
        });
      } catch (error) {
        console.error("Error sharing:", error);
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  }

  function handleCopyLink() {
    if (previewQrUrl) {
      navigator.clipboard.writeText(previewQrUrl);
      alert("QR code link copied to clipboard!");
    }
  }

  // Render dynamic form fields based on QR category
  function renderCategoryFields() {
    const data = qrData;

    switch (qr.category) {
      case "link":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target URL</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-200 bg-gray-50 text-gray-400 text-sm">
                https://
              </span>
              <input
                placeholder="your-url.com"
                className="w-full border border-gray-200 rounded-r px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={((data.url as string) || "").replace(/^https?:\/\//, "")}
                onChange={(e) =>
                  setQrData({ ...data, url: "https://" + e.target.value.replace(/^https?:\/\//, "") })
                }
                required
              />
            </div>
          </div>
        );

      case "call":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+1234567890"
              className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={(data.phone as string) || ""}
              onChange={(e) => setQrData({ ...data, phone: e.target.value })}
              required
            />
          </div>
        );

      case "mail":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(data.email as string) || ""}
                onChange={(e) => setQrData({ ...data, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject (Optional)</label>
              <input
                type="text"
                placeholder="Email subject"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(data.subject as string) || ""}
                onChange={(e) => setQrData({ ...data, subject: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea
                placeholder="Email message"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={(data.message as string) || ""}
                onChange={(e) => setQrData({ ...data, message: e.target.value })}
              />
            </div>
          </>
        );

      case "sms":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+1234567890"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(data.phone as string) || ""}
                onChange={(e) => setQrData({ ...data, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                placeholder="SMS message"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={(data.message as string) || ""}
                onChange={(e) => setQrData({ ...data, message: e.target.value })}
                required
              />
            </div>
          </>
        );

      case "whatsapp":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input
                type="tel"
                placeholder="+1234567890"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(data.waPhone as string) || ""}
                onChange={(e) => setQrData({ ...data, waPhone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea
                placeholder="Pre-filled message"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={(data.waBody as string) || ""}
                onChange={(e) => setQrData({ ...data, waBody: e.target.value })}
              />
            </div>
          </>
        );

      case "wifi":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Network Name (SSID)</label>
              <input
                type="text"
                placeholder="My WiFi Network"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(data.ssid as string) || ""}
                onChange={(e) => setQrData({ ...data, ssid: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="text"
                placeholder="WiFi password"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(data.password as string) || ""}
                onChange={(e) => setQrData({ ...data, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Encryption</label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(data.encryption as string) || "WPA"}
                onChange={(e) => setQrData({ ...data, encryption: e.target.value })}
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="None">None</option>
              </select>
            </div>
          </>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target URL</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-200 bg-gray-50 text-gray-400 text-sm">
                https://
              </span>
              <input
                placeholder="your-url.com"
                className="w-full border border-gray-200 rounded-r px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={link.replace(/^https?:\/\//, "")}
                onChange={(e) =>
                  setLink("https://" + e.target.value.replace(/^https?:\/\//, ""))
                }
                required
              />
            </div>
          </div>
        );
    }
  }

  async function handleFolderChange(value: string) {
    if (value === "__new__") {
      const newName = prompt("Enter new folder name:", "");
      if (newName && newName.trim()) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error("User not authenticated");
          const newFolder = await folderService.createFolder({ 
            name: newName.trim(),
            color: "#3B82F6",
            user_id: user.id
          });
          setFolders([newFolder, ...folders]);
          setFolderId(newFolder.id);
        } catch (error) {
          console.error("Error creating folder:", error);
          alert("Failed to create folder. Please try again.");
        }
      }
    } else {
      setFolderId(value);
    }
  }

  function handleDownload() {
    if (previewQrUrl) {
      const link = document.createElement("a");
      link.href = previewQrUrl;
      link.download = `${name.replace(/[^a-z0-9]/gi, "_")}.png`;
      link.click();
    }
  }

  const formattedCreated = qr.created
    ? new Date(qr.created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "";

  const formattedModified = qr.lastModified
    ? new Date(qr.lastModified).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "";

  return (
    <div className="w-full p-2 flex flex-col gap-10">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Edit QR Details</h1>
          <div className="text-sm text-gray-400">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium mr-2">
              {qr.category.toUpperCase()}
            </span>
            {formattedCreated && <>Created {formattedCreated}</>}
            {formattedCreated && formattedModified && <> · </>}
            {formattedModified && <>Last Modified {formattedModified}</>}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <button
            title="Delete"
            className="rounded-full p-2 border border-gray-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
          <button
            title="Share"
            className="rounded-full p-2 border border-gray-200 hover:bg-blue-50"
            onClick={handleShare}
          >
            <Share2 size={18} className="text-blue-500" />
          </button>
          <button
            title="Edit"
            className="rounded px-4 py-2 border border-blue-200 text-blue-700 bg-white flex items-center gap-1 font-medium"
          >
            <Edit2 size={18} />
            Edit
          </button>
          <button
            title="Download"
            className="rounded px-5 py-2 bg-blue-600 text-white flex items-center gap-1 font-medium hover:bg-blue-700"
            onClick={handleDownload}
          >
            <ArrowDownToLine size={18} />
            Download
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-14">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-8 w-full md:w-[70%] shadow flex flex-col gap-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">QR Name</label>
            <input
              placeholder="Enter QR name"
              className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {renderCategoryFields()}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Folder</label>
            <select
              className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              value={folderId}
              onChange={(e) => handleFolderChange(e.target.value)}
              disabled={isFetchingFolders}
              required
            >
              <option value="">
                {isFetchingFolders ? "Loading folders..." : "Select Folder"}
              </option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
              <option value="__new__">+ New Folder</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 mt-2 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === "saving"}
          >
            {status === "saving"
              ? "Saving..."
              : status === "success"
              ? "Saved!"
              : status === "error"
              ? "Error! Try Again"
              : "Save Changes"}
          </button>
        </form>

        <div className="w-full md:w-96 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              {previewQrUrl ? (
                <Image
                  src={previewQrUrl}
                  alt="QR Code Preview"
                  width={192}
                  height={192}
                  className="w-48 h-48 object-contain"
                  unoptimized
                />
              ) : (
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded text-gray-400">
                  Generating...
                </div>
              )}
              {/* Hidden canvas for QR generation */}
              <div ref={canvasRef} className="hidden" />
            </div>
            <div className="w-full text-center mb-4">
              <p className="text-xs text-gray-500">Preview updates as you edit</p>
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 flex items-center justify-center gap-2 font-medium transition"
              onClick={handleDownload}
            >
              <ArrowDownToLine size={18} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}