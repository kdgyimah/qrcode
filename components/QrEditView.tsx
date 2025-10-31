"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowDownToLine, Edit2, Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import QRCodeStyling from "qr-code-styling";
import { supabase } from "@/lib/supabase";
import { folderService } from "@/lib/services/folders";
import type { QrData } from "@/types/qr-generator";
import type { Folder } from "@/types/database";

/* ----------------------- Types ----------------------- */

interface LinkFormData { url: string; [key: string]: unknown; }
interface CallFormData { phone: string; [key: string]: unknown; }
interface MailFormData { email: string; subject?: string; message?: string; [key: string]: unknown; }
interface SmsFormData { phone: string; message: string; [key: string]: unknown; }
interface WhatsAppFormData { waPhone: string; waBody?: string; [key: string]: unknown; }
interface WifiFormData { ssid: string; password?: string; encryption?: string; [key: string]: unknown; }
interface EventFormData { eventStart: string; eventEnd?: string; eventTitle: string; eventLocation?: string; eventDesc?: string; [key: string]: unknown; }
interface ContactFormData { firstName?: string; lastName?: string; organization?: string; jobTitle?: string; phone?: string; email?: string; address?: string; [key: string]: unknown; }

interface QrEditViewProps {
  id?: string;
  qr: QrData;
  availableFolders?: Folder[];
  onClose?: () => void;
  onSaved?: (updatedQr: QrData) => void;
  onDeleted?: () => void;
}

/* ----------------------- Constants ----------------------- */

const BUCKET_NAME = "qr-images";

/* ----------------------- Helper Functions ----------------------- */

function parseSupabasePublicUrl(url: string) {
  try {
    const u = new URL(url);
    const pathParts = u.pathname.split("/").filter(Boolean);
    const objectIndex = pathParts.findIndex(p => p === "object");
    
    if (objectIndex !== -1 && pathParts[objectIndex + 1] === "public") {
      const bucket = pathParts[objectIndex + 2];
      const objectPath = pathParts.slice(objectIndex + 3).join("/");
      if (bucket && objectPath) return { bucket, path: objectPath };
    }

    const storageIndex = pathParts.findIndex(p => p === "storage");
    if (storageIndex !== -1) {
      const objIdx = pathParts.findIndex(p => p === "object");
      if (objIdx !== -1 && pathParts[objIdx + 1] === "public") {
        const bucket = pathParts[objIdx + 2];
        const objectPath = pathParts.slice(objIdx + 3).join("/");
        if (bucket && objectPath) return { bucket, path: objectPath };
      }
    }
  } catch (e) {
    console.error("Failed to parse Supabase URL:", e);
  }
  return null;
}

/* ----------------------- Main Component ----------------------- */

export default function QrEditView({
  qr,
  availableFolders = [],
  onSaved,
  onDeleted,
  onClose,
}: QrEditViewProps) {
  // State
  const [name, setName] = useState(qr.name);
  const [link, setLink] = useState(qr.link);
  const [folderId, setFolderId] = useState(qr.folderId || "");
  const [qrData, setQrData] = useState<Record<string, unknown>>(qr.data as Record<string, unknown> || {});
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [isDeleting, setIsDeleting] = useState(false);
  const [folders, setFolders] = useState<Folder[]>(availableFolders || []);
  const [isFetchingFolders, setIsFetchingFolders] = useState(false);
  const [previewQrUrl, setPreviewQrUrl] = useState<string | null>(qr.qrImage || null);

  // Refs
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  /* ----------------------- Effects ----------------------- */

  // Sync with prop changes
  useEffect(() => {
    setName(qr.name);
    setLink(qr.link);
    setFolderId(qr.folderId || "");
    setQrData(qr.data as Record<string, unknown> || {});
    setPreviewQrUrl(qr.qrImage || null);
  }, [qr]);

  // Fetch folders if not provided
  useEffect(() => {
    if (!availableFolders || availableFolders.length === 0) {
      fetchFolders();
    }
  }, [availableFolders]);

  // Initialize QR Code
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    initializeQRCode();

    return () => {
      qrCodeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  /* ----------------------- Type Guards ----------------------- */

  const isLinkData = useCallback((data: Record<string, unknown>): data is LinkFormData => 
    typeof data.url === "string", []);
  const isCallData = useCallback((data: Record<string, unknown>): data is CallFormData => 
    typeof data.phone === "string", []);
  const isMailData = useCallback((data: Record<string, unknown>): data is MailFormData => 
    typeof data.email === "string", []);
  const isSmsData = useCallback((data: Record<string, unknown>): data is SmsFormData => 
    typeof data.phone === "string", []);
  const isWhatsAppData = useCallback((data: Record<string, unknown>): data is WhatsAppFormData => 
    typeof data.waPhone === "string", []);
  const isWifiData = useCallback((data: Record<string, unknown>): data is WifiFormData => 
    typeof data.ssid === "string", []);
  const isEventData = useCallback((data: Record<string, unknown>): data is EventFormData => 
    typeof data.eventStart === "string" && typeof data.eventTitle === "string", []);
  const isContactData = useCallback((data: Record<string, unknown>): data is ContactFormData => 
    typeof data.firstName === "string" || typeof data.lastName === "string", []);

  /* ----------------------- QR Generation ----------------------- */

  const generateLinkFromData = useCallback((): string => {
    switch (qr.category) {
      case "link":
        return isLinkData(qrData) ? qrData.url : link;
      
      case "call":
        return isCallData(qrData) ? `tel:${qrData.phone}` : link;
      
      case "mail":
        if (isMailData(qrData)) {
          let mailUrl = `mailto:${qrData.email}`;
          const params: string[] = [];
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
        return (qrData.videoUrl as string) || link;
      
      case "image":
        return (qrData.imageUrl as string) || link;
      
      case "app":
        return (qrData.appUrl as string) || link;
      
      case "social":
        return (qrData.socialUrl as string) || link;
      
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

  const initializeQRCode = async () => {
    const style = qr.style;
    const dotType = style?.shape === "square" ? "square" : style?.shape === "circle" ? "dots" : "rounded";

    qrCodeRef.current = new QRCodeStyling({
      width: 300,
      height: 300,
      data: qr.link || generateLinkFromData(),
      margin: 10,
      qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "Q" },
      imageOptions: { hideBackgroundDots: true, imageSize: style?.logoSize || 0.4, margin: 0 },
      dotsOptions: { type: dotType, color: style?.foregroundColor || "#000000" },
      backgroundOptions: { color: style?.backgroundColor || "#ffffff" },
      cornersSquareOptions: { type: dotType === "square" ? "square" : "extra-rounded", color: style?.foregroundColor || "#000000" },
      cornersDotOptions: { type: dotType === "square" ? "square" : "dot", color: style?.foregroundColor || "#000000" },
      image: typeof style?.logo === "string" ? style.logo : undefined,
    });

    if (qrCodeRef.current && canvasRef.current) {
      canvasRef.current.innerHTML = "";
      await qrCodeRef.current.append(canvasRef.current);
      const raw = await qrCodeRef.current.getRawData("png");
      if (raw instanceof Blob) {
        setPreviewQrUrl(URL.createObjectURL(raw));
      }
    }
  };

  /* ----------------------- Storage Operations ----------------------- */

  const removeOldImage = async (imageUrl: string | null) => {
    if (!imageUrl || imageUrl.startsWith('data:')) {
      return; // Skip base64 images
    }
    
    try {
      const parsed = parseSupabasePublicUrl(imageUrl);
      if (!parsed) {
        console.warn("Could not parse Supabase storage path from URL:", imageUrl);
        return;
      }

      const { error } = await supabase.storage
        .from(parsed.bucket)
        .remove([parsed.path]);

      if (error) {
        console.error("Error removing image:", error);
      }
    } catch (error) {
      console.error("Error in removeOldImage:", error);
    }
  };

  const uploadNewQRImage = async (blob: Blob): Promise<string | null> => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) throw new Error("Not authenticated");

      const fileName = `${user.id}/${Date.now()}.png`;
      
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, blob, { contentType: "image/png" });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading QR image:", error);
      return null;
    }
  };

  /* ----------------------- API Operations ----------------------- */

  async function fetchFolders() {
    setIsFetchingFolders(true);
    try {
      const folderData = await folderService.getFolders();
      setFolders(folderData);
    } catch (err) {
      console.error("Error fetching folders:", err);
    } finally {
      setIsFetchingFolders(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");

    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) throw new Error("Not authenticated");

      // Generate new QR image and upload
      let newQrImageUrl = qr.qrImage;
      
      if (qrCodeRef.current) {
        const raw = await qrCodeRef.current.getRawData("png");
        if (raw instanceof Blob) {
          const uploadedUrl = await uploadNewQRImage(raw);
          if (uploadedUrl) {
            // Remove old image before updating
            if (qr.qrImage) {
              await removeOldImage(qr.qrImage);
            }
            newQrImageUrl = uploadedUrl;
          }
        }
      }

      // Prepare update data
      const generatedLink = generateLinkFromData();
      
      const { error } = await supabase
        .from("qr_codes")
        .update({
          name: name,
          data: qrData,
          destination_url: generatedLink,
          qr_image_url: newQrImageUrl,
          folder_id: folderId || null,
          last_modified: new Date().toISOString(),
        })
        .eq("id", qr.id)
        .eq("user_id", user.id);

      if (error) throw error;

      setStatus("success");
      
      // Call callback with updated data
      onSaved?.({
        ...qr,
        name,
        link: generatedLink,
        data: qrData,
        qrImage: newQrImageUrl,
        folderId: folderId || undefined,
        lastModified: new Date().toISOString(),
      });

      setTimeout(() => setStatus("idle"), 2000);
    } catch (error: unknown) {
      console.error("Error updating QR:", error);
      setStatus("error");
      alert(error || "Failed to update QR code");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  async function handleDelete() {
    const confirmed = confirm(
      `Are you sure you want to delete "${qr.name}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) throw new Error("Not authenticated");

      // Remove image from storage
      if (qr.qrImage) {
        await removeOldImage(qr.qrImage);
      }

      // Delete from database
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
      alert("Failed to delete QR code. Check console for details.");
    } finally {
      setIsDeleting(false);
    }
  }

  /* ----------------------- UI Handlers ----------------------- */

  async function handleShare() {
    if (!previewQrUrl) return handleCopyLink();
    
    if (navigator.share) {
      try {
        const response = await fetch(previewQrUrl);
        const blob = await response.blob();
        const file = new File([blob], `${name}.png`, { type: "image/png" });
        await navigator.share({
          title: name,
          files: [file],
          text: `QR for ${generateLinkFromData()}`,
        });
      } catch (error) {
        console.error("Share failed:", error);
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  }

  function handleCopyLink() {
    if (!previewQrUrl) return;
    navigator.clipboard.writeText(generateLinkFromData());
    alert("Link copied to clipboard.");
  }

  function handleDownload() {
    if (!previewQrUrl) return;
    const a = document.createElement("a");
    a.href = previewQrUrl;
    a.download = `${(name || "qr").replace(/[^a-z0-9]/gi, "_")}.png`;
    a.click();
  }

  async function handleFolderChange(value: string) {
    if (value === "__new__") {
      const newName = prompt("Enter new folder name:", "");
      if (newName && newName.trim()) {
        try {
          const { data: userData } = await supabase.auth.getUser();
          const user = userData?.user;
          if (!user) throw new Error("User not authenticated");
          
          const newFolder = await folderService.createFolder({
            name: newName.trim(),
            color: "#3B82F6",
            user_id: user.id,
          });
          
          setFolders(prev => [newFolder, ...prev]);
          setFolderId(newFolder.id);
        } catch (error) {
          console.error("Error creating folder:", error);
          alert("Failed to create folder. See console for details.");
        }
      }
    } else {
      setFolderId(value);
    }
  }

  /* ----------------------- Form Field Renderers ----------------------- */

  function renderCategoryFields() {
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
                value={((qrData.url as string) || "").replace(/^https?:\/\//, "")}
                onChange={(e) => setQrData({ ...qrData, url: "https://" + e.target.value.replace(/^https?:\/\//, "") })}
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
              value={(qrData.phone as string) || ""}
              onChange={(e) => setQrData({ ...qrData, phone: e.target.value })}
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
                value={(qrData.email as string) || ""}
                onChange={(e) => setQrData({ ...qrData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject (Optional)</label>
              <input
                type="text"
                placeholder="Email subject"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(qrData.subject as string) || ""}
                onChange={(e) => setQrData({ ...qrData, subject: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea
                placeholder="Email message"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={(qrData.message as string) || ""}
                onChange={(e) => setQrData({ ...qrData, message: e.target.value })}
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
                value={(qrData.phone as string) || ""}
                onChange={(e) => setQrData({ ...qrData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                placeholder="SMS message"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={(qrData.message as string) || ""}
                onChange={(e) => setQrData({ ...qrData, message: e.target.value })}
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
                value={(qrData.waPhone as string) || ""}
                onChange={(e) => setQrData({ ...qrData, waPhone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea
                placeholder="Pre-filled message"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={(qrData.waBody as string) || ""}
                onChange={(e) => setQrData({ ...qrData, waBody: e.target.value })}
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
                value={(qrData.ssid as string) || ""}
                onChange={(e) => setQrData({ ...qrData, ssid: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="text"
                placeholder="WiFi password"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(qrData.password as string) || ""}
                onChange={(e) => setQrData({ ...qrData, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Encryption</label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(qrData.encryption as string) || "WPA"}
                onChange={(e) => setQrData({ ...qrData, encryption: e.target.value })}
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
                onChange={(e) => setLink("https://" + e.target.value.replace(/^https?:\/\//, ""))}
                required
              />
            </div>
          </div>
        );
    }
  }

  /* ----------------------- Date Formatting ----------------------- */

  const formattedCreated = qr.created 
    ? new Date(qr.created).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" }) 
    : "";
  const formattedModified = qr.lastModified 
    ? new Date(qr.lastModified).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" }) 
    : "";

  /* ----------------------- Render ----------------------- */

  return (
    <div className="w-full p-2 flex flex-col gap-10">
      {/* Header */}
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
          <button title="Delete" className="rounded-full p-2 border border-gray-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleDelete} disabled={isDeleting}>
            <Trash2 size={18} className="text-red-500" />
          </button>
          <button title="Share" className="rounded-full p-2 border border-gray-200 hover:bg-blue-50" onClick={handleShare}>
            <Share2 size={18} className="text-blue-500" />
          </button>
          <button title="Edit" className="rounded px-4 py-2 border border-blue-200 text-blue-700 bg-white flex items-center gap-1 font-medium">
            <Edit2 size={18} />
            Edit
          </button>
          <button title="Download" className="rounded px-5 py-2 bg-blue-600 text-white flex items-center gap-1 font-medium hover:bg-blue-700" onClick={handleDownload}>
            <ArrowDownToLine size={18} />
            Download
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-14">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 w-full md:w-[70%] shadow flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">QR Name</label>
            <input placeholder="Enter QR name" className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          {renderCategoryFields()}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Folder</label>
            <select className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" value={folderId} onChange={(e) => handleFolderChange(e.target.value)} disabled={isFetchingFolders} required>
              <option value="">{isFetchingFolders ? "Loading folders..." : "Select Folder"}</option>
              {folders.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
              <option value="__new__">+ New Folder</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 mt-2 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={status === "saving"}>
            {status === "saving" ? "Saving..." : status === "success" ? "Saved!" : status === "error" ? "Error! Try Again" : "Save Changes"}
          </button>
        </form>

        <div className="w-full md:w-96 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              {previewQrUrl ? (
                <Image src={previewQrUrl} alt="QR Code Preview" width={192} height={192} className="w-48 h-48 object-contain" unoptimized />
              ) : (
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded text-gray-400">Generating...</div>
              )}
              <div ref={canvasRef} className="hidden" />
            </div>
            <div className="w-full text-center mb-4">
              <p className="text-xs text-gray-500">Preview updates as you edit</p>
            </div>
            <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 flex items-center justify-center gap-2 font-medium transition" onClick={handleDownload}>
              <ArrowDownToLine size={18} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
