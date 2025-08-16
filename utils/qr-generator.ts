import { QRCategory, AnyQRFormData } from "@/types/qr-generator";
import QRCodeStyling from "qr-code-styling";
import type { QRCodeStyle } from "@/types/qr-generator";

/**
 * Generate a styled QR code as DataURL (with optional logo).
 */
export async function generateQRCode(
  content: string,
  style: QRCodeStyle,
  size: number = 300
): Promise<string> {
  if (!content.trim()) return Promise.resolve("");

  return new Promise((resolve, reject) => {
    try {
      const qr = new QRCodeStyling({
        width: size,
        height: size,
        data: content,
        margin: 2,
        dotsOptions: {
          color: style.foregroundColor,
          type:
            style.shape === "circle"
              ? "dots"
              : style.shape === "rounded"
              ? "rounded"
              : "square",
        },
        backgroundOptions: {
          color: style.backgroundColor,
        },
        image: typeof style.logo === "string" ? style.logo : undefined,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 0,
          imageSize: style.logoSize ? style.logoSize / 100 : 0.2, // percentage → decimal
        },
      });

      qr.getRawData("png").then((blob) => {
        if (!blob) {
          reject(new Error("QR code generation failed"));
          return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(blob as Blob);
      });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Convert category-specific form data into a QR code content string.
 */
export function generateQRContent(
  category: QRCategory,
  formData: AnyQRFormData
): string {
  switch (category.id) {
    case "link":
      return (formData as { url: string }).url || "";

    case "call":
      return `tel:${(formData as { phone: string }).phone || ""}`;

    case "mail": {
      const { email, subject, message } = formData as {
        email: string;
        subject?: string;
        message?: string;
      };
      const subjectParam = subject ? `?subject=${encodeURIComponent(subject)}` : "";
      const bodyParam = message
        ? `${subjectParam ? "&" : "?"}body=${encodeURIComponent(message)}`
        : "";
      return `mailto:${email || ""}${subjectParam}${bodyParam}`;
    }

    case "sms": {
      const { phone, message } = formData as { phone: string; message?: string };
      const messageParam = message ? `?body=${encodeURIComponent(message)}` : "";
      return `sms:${phone || ""}${messageParam}`;
    }

    case "whatsapp": {
      const { waPhone, waBody } = formData as {
        waPhone: string;
        waBody?: string;
      };
      const bodyParam = waBody ? `?text=${encodeURIComponent(waBody)}` : "";
      return `https://wa.me/${waPhone || ""}${bodyParam}`;
    }

    case "wifi": {
      const { ssid, password, encryption } = formData as {
        ssid: string;
        password?: string;
        encryption: string;
      };
      return `WIFI:T:${encryption || "WPA"};S:${ssid || ""};P:${password || ""};;`;
    }

    case "image":
      return (formData as { imageUrl?: string }).imageUrl || "";

    case "video":
      return (formData as { videoUrl: string }).videoUrl || "";

    case "bulkqr":
      return (formData as { bulkList: string }).bulkList || "";

    case "app":
      return (formData as { appUrl: string }).appUrl || "";

    case "social":
      return (formData as { socialUrl: string }).socialUrl || "";

    case "event": {
      const { eventTitle, eventStart, eventEnd, eventLocation, eventDesc } =
        formData as {
          eventTitle: string;
          eventStart: string;
          eventEnd?: string;
          eventLocation?: string;
          eventDesc?: string;
        };
      return `BEGIN:VEVENT
SUMMARY:${eventTitle || ""}
DTSTART:${eventStart || ""}
DTEND:${eventEnd || ""}
LOCATION:${eventLocation || ""}
DESCRIPTION:${eventDesc || ""}
END:VEVENT`;
    }

    case "barcode2d":
      return (formData as { barcodeValue: string }).barcodeValue || "";

    case "contact": {
      const {
        firstName,
        lastName,
        organization,
        jobTitle,
        phone,
        mobile,
        email,
        website,
        address,
        city,
        state,
        zip,
        country,
      } = formData as {
        firstName?: string;
        lastName?: string;
        organization?: string;
        jobTitle?: string;
        phone?: string;
        mobile?: string;
        email?: string;
        website?: string;
        address?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
      };

      return `MECARD:N:${firstName || ""} ${lastName || ""};ORG:${
        organization || ""
      };TITLE:${jobTitle || ""};TEL:${phone || ""};TEL:${mobile || ""};EMAIL:${
        email || ""
      };ADR:${address || ""} ${city || ""} ${state || ""} ${zip || ""} ${
        country || ""
      };URL:${website || ""};;`;
    }

    case "pdf":
      return (formData as { pdfUrl?: string }).pdfUrl || "";

    default:
      return "";
  }
}
