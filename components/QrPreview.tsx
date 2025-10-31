"use client";

import { useEffect, useRef, useState } from "react";

import type {
  QRCategory,
  Category,
  AnyQRFormData,
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
import Image from "next/image";

interface QRDesign {
  frame: string;
  shape: "square" | "circle" | "rounded";
  color: string;
  logo: File | null;
  logoSize?: number;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  }, [formData, design, ready, design.logoSize]);

  useEffect(() => {
    const generate = async () => {
      const value = getQRValue(category, formData)?.trim();
      if (!value) return;

      try {
        // Import qrcode-generator
        const qrcodeGen = (await import("qrcode-generator")).default;
        const qr = qrcodeGen(0, "M");
        qr.addData(value);
        qr.make();

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const moduleCount = qr.getModuleCount();
        const cellSize = 8;
        const margin = 4;
        const qrSize = moduleCount * cellSize;
        const totalSize = qrSize + margin * 2 * cellSize;

        // Determine frame padding
        const framePadding =
          design.frame !== "square" && design.frame !== "dots" ? 40 : 0;
        const finalSize = totalSize + framePadding * 2;

        canvas.width = finalSize;
        canvas.height = finalSize;

        // Fill background
        ctx.fillStyle = style?.backgroundColor || "#ffffff";
        ctx.fillRect(0, 0, finalSize, finalSize);

        // Draw frame if applicable
        if (framePadding > 0) {
          ctx.save();
          const frameColor = design.frame === "badge" ? "#3b82f6" : "#e5e7eb";
          const borderRadius =
            design.frame === "rounded" || design.frame === "badge"
              ? 20
              : design.frame === "curved"
              ? 30
              : 10;

          ctx.strokeStyle = frameColor;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.roundRect(
            framePadding / 2,
            framePadding / 2,
            finalSize - framePadding,
            finalSize - framePadding,
            borderRadius
          );
          ctx.stroke();
          ctx.restore();
        }

        // Calculate QR offset
        const qrOffset = framePadding + margin * cellSize;
        const color = style?.foregroundColor || design.color || "#000000";

        // Draw QR code based on shape
        for (let row = 0; row < moduleCount; row++) {
          for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
              const x = qrOffset + col * cellSize;
              const y = qrOffset + row * cellSize;

              ctx.fillStyle = color;

              if (design.shape === "rounded") {
                const radius = cellSize / 3;
                ctx.beginPath();
                ctx.roundRect(x, y, cellSize, cellSize, radius);
                ctx.fill();
              } else if (design.shape === "circle") {
                ctx.beginPath();
                ctx.arc(
                  x + cellSize / 2,
                  y + cellSize / 2,
                  cellSize / 2.5,
                  0,
                  Math.PI * 2
                );
                ctx.fill();
              } else {
                ctx.fillRect(x, y, cellSize, cellSize);
              }
            }
          }
        }

        // Add logo if present
        if (logoUrl) {
          const logo = new window.Image();
          logo.crossOrigin = "anonymous";
          logo.onload = () => {
            // Use user-selected logo size (default to 50%)
            const sizePercent = design.logoSize || 50;
            const logoSize = Math.floor(qrSize * (sizePercent / 100)); // use slider value

            // Calculate logo position (centered)
            const logoX = (finalSize - logoSize) / 2;
            const logoY = (finalSize - logoSize) / 2;

            // White circular background behind the logo
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(
              finalSize / 2,
              finalSize / 2,
              logoSize / 2 + 8,
              0,
              Math.PI * 2
            );
            ctx.fill();

            // Clip the logo into a circle
            ctx.save();
            ctx.beginPath();
            ctx.arc(finalSize / 2, finalSize / 2, logoSize / 2, 0, Math.PI * 2);
            ctx.clip();

            // ✅ Draw logo in the center
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

            ctx.restore();

            // Save QR as base64 data URL
            setQrSrc(canvas.toDataURL());
          };
          logo.src = logoUrl;
        } else {
          setQrSrc(canvas.toDataURL());
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    const hasContent = Object.values(formData).some(
      (v) => v && String(v).trim() !== ""
    );

    if (ready && hasContent) {
      generate();
    } else if (!hasContent) {
      setQrSrc("");
    }
  }, [
    category,
    formData,
    design.color,
    design.shape,
    design.frame,
    design.logoSize,
    logoUrl,
    style,
    ready,
  ]);

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
      const canvas = canvasRef.current;
      if (!canvas) return;

      const jpgCanvas = document.createElement("canvas");
      jpgCanvas.width = canvas.width;
      jpgCanvas.height = canvas.height;
      const jpgCtx = jpgCanvas.getContext("2d");

      if (jpgCtx) {
        jpgCtx.fillStyle = "#ffffff";
        jpgCtx.fillRect(0, 0, jpgCanvas.width, jpgCanvas.height);
        jpgCtx.drawImage(canvas, 0, 0);

        const link = document.createElement("a");
        link.href = jpgCanvas.toDataURL("image/jpeg", 0.95);
        link.download = `${fileName}.jpg`;
        link.click();
      }
    } else if (type === "pdf") {
      import("jspdf").then((jsPDFModule) => {
        const jsPDF = jsPDFModule.default;
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: [250, 300],
        });
        pdf.text(`${category.name} QR Code`, 25, 30);
        pdf.addImage(qrSrc, "PNG", 25, 50, 200, 200);
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
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="flex flex-col items-center justify-center border rounded-lg p-6 h-full min-h-[300px] transition-all relative">
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          {isActive ? (
            qrSrc ? (
              <Image
                src={qrSrc}
                alt={`${category.name} QR Code Preview`}
                width={200}
                height={200}
                className="object-contain"
              />
            ) : (
              <Image
                src={placeholderQR}
                alt="QR Code Placeholder"
                width={192}
                height={192}
                className="opacity-50 grayscale object-contain"
              />
            )
          ) : (
            <Image
              src={placeholderQR}
              alt="QR Code Placeholder"
              width={192}
              height={192}
              className="opacity-50 grayscale object-contain"
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
