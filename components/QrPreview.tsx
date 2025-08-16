"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import type {
  QRCategory,
  Category,
  AnyQRFormData,
  QRFormDataByCategory,
  QRCodeStyle,
  LinkFormData,
  CallFormData,
  MailFormData,
  SmsFormData,
  WhatsAppFormData,
  WifiFormData,
  ImageFormData,
  VideoFormData,
  BulkQRFormData,
  AppFormData,
  SocialFormData,
  EventFormData,
  BarcodeFormData,
  ContactFormData,
  PdfFormData,
} from "@/types/qr-generator";

interface QRDesign {
  frame: string;
  color: string;
  logo: File | null;
}

interface Props {
  category: QRCategory;
  formData: AnyQRFormData;
  ready?: boolean;
  design: QRDesign;
  style?: QRCodeStyle;
}

function getQRValue(category: QRCategory, formData: AnyQRFormData): string {
  const categoryId = category.id as Category;

  switch (categoryId) {
    case "link":
      return (formData as LinkFormData).url || "";

    case "call":
      return `tel:${(formData as CallFormData).phone}` || "";

    case "mail": {
      const { email, subject, message } = formData as MailFormData;
      if (!email) return "";
      const params = new URLSearchParams();
      if (subject) params.append("subject", subject);
      if (message) params.append("body", message);
      const queryString = params.toString();
      return `mailto:${email}${queryString ? `?${queryString}` : ""}`;
    }

    case "sms": {
      const { phone, message } = formData as SmsFormData;
      return phone
        ? `sms:${phone}${message ? `?body=${encodeURIComponent(message)}` : ""}`
        : "";
    }

    case "whatsapp": {
      const { waPhone, waBody } = formData as WhatsAppFormData;
      return waPhone
        ? `https://wa.me/${waPhone}${
            waBody ? `?text=${encodeURIComponent(waBody)}` : ""
          }`
        : "";
    }

    case "wifi": {
      const {
        ssid,
        password = "",
        encryption = "WPA",
      } = formData as WifiFormData;
      return ssid ? `WIFI:T:${encryption};S:${ssid};P:${password};;` : "";
    }

    case "image": {
      const { imageUrl, uploadType } = formData as ImageFormData;
      return uploadType === "url" ? imageUrl || "" : "";
    }

    case "video":
      return (formData as VideoFormData).videoUrl || "";

    case "bulkqr": {
      const list = (formData as BulkQRFormData).bulkList;
      return list ? list.split("\n").filter(Boolean)[0] || "" : "";
    }

    case "app":
      return (formData as AppFormData).appUrl || "";

    case "social":
      return (formData as SocialFormData).socialUrl || "";

    case "event": {
      const { eventTitle, eventStart, eventEnd, eventLocation, eventDesc } =
        formData as EventFormData;
      if (!eventTitle || !eventStart) return "";
      return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `SUMMARY:${eventTitle}`,
        eventDesc && `DESCRIPTION:${eventDesc}`,
        eventLocation && `LOCATION:${eventLocation}`,
        `DTSTART:${eventStart.replace(/[-:]/g, "").slice(0, 15)}Z`,
        eventEnd && `DTEND:${eventEnd.replace(/[-:]/g, "").slice(0, 15)}Z`,
        "END:VEVENT",
        "END:VCALENDAR",
      ]
        .filter(Boolean)
        .join("\n");
    }

    case "barcode2d":
      return (formData as BarcodeFormData).barcodeValue || "";

    case "contact": {
      const {
        firstName = "",
        lastName = "",
        phone = "",
        mobile = "",
        email = "",
        organization = "",
        jobTitle = "",
        website = "",
        address = "",
        city = "",
        state = "",
        zip = "",
        country = "",
      } = formData as ContactFormData;

      const fullName =
        [firstName, lastName].filter(Boolean).join(" ") || "Unknown";

      const vcardLines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${fullName}`,
        `N:${lastName || ""};${firstName || ""};;;`,
        organization && `ORG:${organization}`,
        jobTitle && `TITLE:${jobTitle}`,
        phone && `TEL;TYPE=WORK:${phone}`,
        mobile && `TEL;TYPE=CELL:${mobile}`,
        email && `EMAIL:${email}`,
        website && `URL:${website}`,
        (address || city || state || zip || country) &&
          `ADR:;;${address || ""};${city || ""};${state || ""};${zip || ""};${
            country || ""
          }`,
        "END:VCARD",
      ];

      // Filter out falsey lines to avoid empty lines breaking QR
      return vcardLines.filter(Boolean).join("\n");
    }

    case "pdf": {
      const { pdfUrl, uploadType } = formData as PdfFormData;
      return uploadType === "url" ? pdfUrl || "" : "";
    }

    default:
      return "";
  }
}

export default function QrPreview({
  category,
  formData,
  ready,
  design,
  style,
}: Props) {
  const [qrSrc, setQrSrc] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  const placeholderQR =
    'data:image/svg+xml;utf8,<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg"><rect fill="lightgray" width="100%" height="100%"/><text x="50%" y="50%" font-size="32" fill="gray" font-family="Arial" text-anchor="middle" alignment-baseline="middle">QR</text></svg>';

  useEffect(() => {
    if (design.logo) {
      const reader = new FileReader();
      reader.onload = (e) => setLogoUrl(e.target?.result as string);
      reader.readAsDataURL(design.logo);
    } else {
      setLogoUrl(null);
    }
  }, [design.logo]);

  useEffect(() => {
    const generate = async () => {
      const value = getQRValue(category, formData);
      if (ready && value) {
        try {
          const url = await QRCode.toDataURL(value, {
            color: {
              dark: style?.foregroundColor || design.color || "#000000",
              light: style?.backgroundColor || "#ffffff",
            },
            margin: 2,
            width: 256,
            errorCorrectionLevel: "M",
          });
          setQrSrc(url);
        } catch (error) {
          console.error("Error generating QR code:", error);
          setQrSrc("");
        }
      } else {
        setQrSrc("");
      }
    };

    // Only generate if `ready` is true and `formData` is valid
    if (ready && formData) {
      generate();
    }
  }, [formData, category, ready, design.color, style]);

  const isActive = ready && !!qrSrc;

  const handleDownload = (type: "png" | "jpg" | "pdf" = "png") => {
    if (!qrSrc) return;

    const fileName = `${category.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-qr-code`;

    if (type === "png") {
      const link = document.createElement("a");
      link.href = qrSrc;
      link.download = `${fileName}.png`;
      link.click();
    } else if (type === "jpg") {
      const img = document.createElement("img");
      img.src = qrSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Fill with white background for JPEG
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          const jpgUrl = canvas.toDataURL("image/jpeg", 0.9);
          const link = document.createElement("a");
          link.href = jpgUrl;
          link.download = `${fileName}.jpg`;
          link.click();
        }
      };
    } else if (type === "pdf") {
      import("jspdf").then((jsPDFModule) => {
        const jsPDF = jsPDFModule.default;
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: [200, 240],
        });
        pdf.text(`${category.name} QR Code`, 20, 30);
        pdf.addImage(qrSrc, "PNG", 20, 40, 160, 160);
        pdf.save(`${fileName}.pdf`);
      });
    }
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (!dropdownOpen) return;
    const close = () => setDropdownOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [dropdownOpen]);

  return (
    <div className="w-full max-w-md items-center bg-white justify-center px-4 py-4 flex flex-col">
      <div className="flex flex-col items-center justify-center border rounded-lg p-6 h-full min-h-[300px] transition-all relative">
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <Image
            ref={imgRef}
            src={isActive ? qrSrc : placeholderQR}
            alt={`${category.name} QR Code Preview`}
            width={192}
            height={192}
            className={`transition-all ${
              isActive ? "" : "opacity-50 grayscale"
            } ${
              design.frame === "Frame 2"
                ? "rounded-2xl border-4 border-blue-200"
                : style?.shape === "circle"
                ? "rounded-full"
                : style?.shape === "rounded"
                ? "rounded-xl"
                : "rounded-lg"
            }`}
            style={{
              filter: isActive ? "none" : "grayscale(1) opacity(0.5)",
              objectFit: "contain",
            }}
          />
          {isActive && logoUrl && (
            <Image
              src={logoUrl}
              alt="Logo"
              width={
                style?.logoSize ? Math.floor(192 * (style.logoSize / 100)) : 56
              }
              height={
                style?.logoSize ? Math.floor(192 * (style.logoSize / 100)) : 56
              }
              className="absolute rounded-full"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                objectFit: "cover",
                border: "2px solid white",
                background: "white",
              }}
            />
          )}
        </div>

        {!isActive && (
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Fill out the {category.name.toLowerCase()} form to generate your
              QR code.
            </p>
            <p className="text-gray-300 text-xs mt-1">{category.description}</p>
          </div>
        )}
      </div>

      <div className="relative bg-white mt-8">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
            isActive
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          onClick={isActive ? () => handleDownload("png") : undefined}
          disabled={!isActive}
          aria-disabled={!isActive}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 3a1 1 0 00-1 1v7.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V4a1 1 0 00-1-1z" />
            <path d="M3 17a1 1 0 001 1h12a1 1 0 001-1v-2a1 1 0 112 0v2a3 3 0 01-3 3H4a3 3 0 01-3-3v-2a1 1 0 112 0v2z" />
          </svg>
          Download
          <span
            onClick={
              isActive
                ? (e) => {
                    e.stopPropagation();
                    setDropdownOpen((v) => !v);
                  }
                : undefined
            }
            className={`ml-2 flex items-center cursor-pointer ${
              isActive ? "" : "pointer-events-none"
            }`}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        {isActive && dropdownOpen && (
          <div
            className="absolute top-full right-0 z-20 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full text-left px-4 py-2 hover:bg-blue-100 text-sm text-blue-700"
              onClick={() => handleDownload("png")}
              type="button"
            >
              Download as PNG
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-blue-100 text-sm text-blue-700"
              onClick={() => handleDownload("jpg")}
              type="button"
            >
              Download as JPG
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-blue-100 text-sm text-blue-700"
              onClick={() => handleDownload("pdf")}
              type="button"
            >
              Download as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
