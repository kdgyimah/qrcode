'use client';

import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import QRFrame from "./QRFrame";

import IconImage from '../../images/freecall-logo.webp';
import EmailImage from '../../images/email.png';
import WhatsAppImage from '../../images/whatsapp-logo.jpg';

import {
  generateVCard,
  generateEmailData,
  generateSmsData,
  generateWhatsAppLink,
  generatePDF,
  generateImage
} from '../../lib/basicFunctions';

import type { Gradient } from "qr-code-styling";

// === Type Definitions ===

type DotType = "dots" | "rounded" | "classy" | "classy-rounded" | "square" | "extra-rounded" | "dot";

type QRStyleOptions = {
  type: "dots" | "rounded" | "classy" | "classy-rounded" | "square" | "extra-rounded" | "dot";
  color: string;
  gradient?: Gradient;
};

interface QRStyle {
  dotsOptions: QRStyleOptions;
  cornersSquareOptions: QRStyleOptions;
  cornersDotOptions: QRStyleOptions;
}

type QRFrameStyle = {
  dotsOptions?: {
    type?: DotType;
    color?: string;
    gradient?: Gradient;
    roundSize?: boolean;
  };
  cornersSquareOptions?: {
    type?: DotType;
    color?: string;
    gradient?: Gradient;
  };
  cornersDotOptions?: {
    type?: DotType;
    color?: string;
    gradient?: Gradient;
  };
};

interface QROutputInterfaceProps {
  content: {
    phoneNumber?: string;
    waPhoneNumber?: string;
    smsMessage?: string;
    waMessage?: string;
    showIcon?: boolean;
    firstName?: string;
    lastName?: string;
    pdfTitle?: string;
    pdfAuthor?: string;
    pdfMessage?: string;
    pdfImage?: string;
    url?: string;
    description?: string;
    email?: string;
    receiverEmail?: string;
    subject?: string;
    message?: string;
    address?: string;
    company?: string;
    jobTitle?: string;
    imageUrl?: string;
    pdfContent?: string;
    imageContent?: string;
  };
  qrStyle: QRStyle;
  onStyleChange: (newStyle: QRStyle) => void;
}

// === Component ===

const QROutputInterface = ({ content, qrStyle, onStyleChange }: QROutputInterfaceProps) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<"png" | "svg" | "jpeg">("png");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || qrCodeInstance.current) return;

    qrCodeInstance.current = new QRCodeStyling({
      width: 200,
      height: 200,
      type: "svg",
      margin: 0,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "H",
      },
      dotsOptions: qrStyle.dotsOptions
        ? {
            ...qrStyle.dotsOptions,
            type: qrStyle.dotsOptions.type === "dot" ? "dots" : qrStyle.dotsOptions.type,
          }
        : {},
      cornersSquareOptions: qrStyle.cornersSquareOptions || {},
      cornersDotOptions: qrStyle.cornersDotOptions || {},
    });

    if (qrCodeRef.current) {
      qrCodeInstance.current.append(qrCodeRef.current);
    }
  }, [
    isClient,
    qrStyle.dotsOptions,
    qrStyle.cornersSquareOptions,
    qrStyle.cornersDotOptions,
  ]);

  useEffect(() => {
    if (!isClient || !qrCodeInstance.current) return;

    let qrData = "";
    let qrImage = "";

    if (content.waPhoneNumber && content.waMessage) {
      qrData = generateWhatsAppLink({
        waPhoneNumber: content.waPhoneNumber,
        waMessage: content.waMessage
      });
      qrImage = content.showIcon ? (typeof WhatsAppImage === "string" ? WhatsAppImage : WhatsAppImage.src) : "";
    } else if (content.smsMessage && content.phoneNumber) {
      qrData = generateSmsData({ phoneNumber: content.phoneNumber, smsMessage: content.smsMessage });
    } else if (content.phoneNumber) {
      qrData = `tel:${content.phoneNumber}`;
      qrImage = content.showIcon ? (typeof IconImage === "string" ? IconImage : IconImage.src) : "";
    } else if (content.firstName && content.lastName) {
      qrData = generateVCard({
        firstName: content.firstName,
        lastName: content.lastName,
        phone: content.phoneNumber ?? "",
        email: content.email ?? "",
        address: content.address ?? "",
        company: content.company ?? "",
        jobTitle: content.jobTitle ?? ""
      });
    } else if (content.receiverEmail && content.subject && content.message) {
      qrData = generateEmailData({
        receiverEmail: content.receiverEmail,
        subject: content.subject,
        message: content.message
      });
      qrImage = content.showIcon ? (typeof EmailImage === "string" ? EmailImage : EmailImage.src) : "";
    } else if (content.pdfContent) {
      qrData = generatePDF({ pdfContent: content.pdfContent ?? "" });
    } else if (content.imageContent) {
      qrData = generateImage({ imageContent: content.imageContent ?? "" });
    } else {
      qrData = `Link: ${content.url}\nProgram Description: ${content.description}\nPowered by: KayDee Solutions`;
    }

    const fixedDotsOptions = qrStyle.dotsOptions
      ? {
          ...qrStyle.dotsOptions,
          type: qrStyle.dotsOptions.type === "dot" ? "dots" : qrStyle.dotsOptions.type,
        }
      : {};

    qrCodeInstance.current.update({
      data: qrData,
      image: qrImage || content.imageUrl || "",
      dotsOptions: fixedDotsOptions,
      cornersSquareOptions: qrStyle.cornersSquareOptions || {},
      cornersDotOptions: qrStyle.cornersDotOptions || {},
    });
  }, [
    content,
    isClient,
    qrStyle.dotsOptions,
    qrStyle.cornersSquareOptions,
    qrStyle.cornersDotOptions,
  ]);

  const handleDownload = (format: "png" | "svg" | "jpeg") => {
    if (!qrCodeInstance.current) return;
    qrCodeInstance.current.download({ name: "qr-code", extension: format });
  };

  const handleFrameStyleChange = (newFrameStyle: QRFrameStyle) => {
    const convertedStyle: QRStyle = {
      dotsOptions: {
        type: newFrameStyle.dotsOptions?.type ?? "dots",
        color: newFrameStyle.dotsOptions?.color ?? "#000000",
        gradient: newFrameStyle.dotsOptions?.gradient,
      },
      cornersSquareOptions: {
        type: newFrameStyle.cornersSquareOptions?.type ?? "square",
        color: newFrameStyle.cornersSquareOptions?.color ?? "#000000",
        gradient: newFrameStyle.cornersSquareOptions?.gradient,
      },
      cornersDotOptions: {
        type: newFrameStyle.cornersDotOptions?.type ?? "dot",
        color: newFrameStyle.cornersDotOptions?.color ?? "#000000",
        gradient: newFrameStyle.cornersDotOptions?.gradient,
      },
    };

    onStyleChange(convertedStyle);
  };

  if (!isClient) return null;

  return (
    <div className="bg-white shadow-lg qr-interface-item p-3 outputHere">
      <p>
        Want to do more? <a href="#">Click Here</a>
      </p>

      <div className="qrContainer">
        <div ref={qrCodeRef} />
      </div>

      <div>
        <QRFrame qrCompStyle={handleFrameStyleChange} />
      </div>

      <div className="takeAction d-flex">
        <button
          className="btn btn-secondary rounded-0 ms-2"
          type="button"
          onClick={() => handleDownload(selectedFormat)}
        >
          Download
        </button>

        <select
          className="form-select format-select btn-focus btn btn-secondary rounded-0 ms-1"
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value as "png" | "svg" | "jpeg")}
        >
          <option value="png">PNG</option>
          <option value="svg">SVG</option>
          <option value="jpeg">JPEG</option>
        </select>
      </div>
    </div>
  );
};

export default QROutputInterface;
