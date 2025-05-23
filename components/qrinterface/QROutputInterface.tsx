import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import QRCodeStyling from "qr-code-styling";

import IconImage from '../../images/freecall-logo.webp';
import EmailImage from '../../images/email.png';
import WhatsAppImage from '../../images/whatsapp-logo.jpg';
import QRFrame from "./QRFrame";

import { 
  generateVCard, 
  generateEmailData, 
  generateSmsData, 
  generateWhatsAppLink, 
  generatePDF,
  generateImage
} from '../../lib/basicFunctions';

interface QROutputInterfaceProps {
  content: {
    phoneNumber?: string;
    waPhoneNumber?: string;
    smsMessage?: string;
    waMessage?: string;
    showIcon?: boolean;
    firstName?: string;
    pdfTitle?: string;
    pdfAuthor?: string;
    pdfMessage?: string;
    pdfImage?: string;
    lastName?: string;
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
  qrStyle: any;
  onStyleChange: (newStyle: any) => void;
}

const QROutputInterface = ({ content, qrStyle, onStyleChange }: QROutputInterfaceProps) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);
  const [selectedFormat, setSelectedFormat] = useState("png");
  const [isClient, setIsClient] = useState(false);

  // Set client flag to true after mount to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize QRCodeStyling once
  useEffect(() => {
    if (!isClient) return;
    if (!qrCodeInstance.current) {
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
        dotsOptions: qrStyle.dotsOptions || {},
        cornersSquareOptions: qrStyle.cornersSquareOptions || {},
        cornersDotOptions: qrStyle.cornersDotOptions || {},
      });
      if (qrCodeRef.current) {
        qrCodeInstance.current.append(qrCodeRef.current);
      }
    }
  }, [isClient]);

  // Update QR code whenever content or style changes
  useEffect(() => {
    if (!isClient || !qrCodeInstance.current) return;

    let qrData = "";
    let qrImage = "";

    if (content.waPhoneNumber && content.waMessage) {
      qrData = generateWhatsAppLink(content);
      qrImage = content.showIcon ? (typeof WhatsAppImage === "string" ? WhatsAppImage : WhatsAppImage.src) : "";
    } else if (content.smsMessage) {
      qrData = generateSmsData(content);
    } else if (content.phoneNumber) {
      qrData = `tel:${content.phoneNumber}`;
      qrImage = content.showIcon ? (typeof IconImage === "string" ? IconImage : IconImage.src) : "";
    } else if (content.firstName && content.lastName) {
      qrData = generateVCard(content);
    } else if (content.receiverEmail) {
      qrData = generateEmailData(content);
      qrImage = content.showIcon ? (typeof EmailImage === "string" ? EmailImage : EmailImage.src) : "";
    } else if (content.pdfContent) {
      qrData = generatePDF(content);
    } else if (content.imageContent) {
      qrData = generateImage(content);
    } else {
      qrData = `Link: ${content.url}\nProgram Description: ${content.description}\nPowered by: KayDee Solutions`;
    }

    qrCodeInstance.current.update({
      data: qrData,
      image: qrImage || content.imageUrl || "",
      dotsOptions: qrStyle.dotsOptions || {},
      cornersSquareOptions: qrStyle.cornersSquareOptions || {},
      cornersDotOptions: qrStyle.cornersDotOptions || {},
    });
  }, [content, qrStyle, isClient]);

  // Handle QR code download
  interface DownloadOptions {
    name: string;
    extension: "png" | "svg" | "jpeg";
  }

  const handleDownload = (format: DownloadOptions["extension"]) => {
    if (!qrCodeInstance.current) return;
    qrCodeInstance.current.download({ name: "qr-code", extension: format });
  };

  // Handle style change callback
  interface QRStyle {
    dotsOptions?: object;
    cornersSquareOptions?: object;
    cornersDotOptions?: object;
    [key: string]: any;
  }

  const handleStyleChange = (newStyle: QRStyle) => {
    onStyleChange(newStyle);
  };

  if (!isClient) {
    // Optional: you can return a loader or null while waiting for client
    return null;
  }

  return (
    <div className="bg-white shadow-lg qr-interface-item p-3 outputHere">
      <p>
        Want to do more? <a href="#">Click Here</a>
      </p>
      <div className="qrContainer">
        <div ref={qrCodeRef} />
      </div>

      <div>
        <QRFrame className="qr" qrCompStyle={handleStyleChange} />
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
          onChange={(e) => setSelectedFormat(e.target.value)}
        >
          <option value="png">PNG</option>
          <option value="svg">SVG</option>
          <option value="jpeg">JPEG</option>
        </select>
      </div>
    </div>
  );
};

QROutputInterface.propTypes = {
  content: PropTypes.shape({
    phoneNumber: PropTypes.string,
    waPhoneNumber: PropTypes.string,
    smsMessage: PropTypes.string,
    waMessage: PropTypes.string,
    showIcon: PropTypes.bool,
    firstName: PropTypes.string,
    pdfTitle: PropTypes.string,
    pdfAuthor: PropTypes.string,
    pdfMessage: PropTypes.string,
    pdfImage: PropTypes.string,
    lastName: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    receiverEmail: PropTypes.string,
    subject: PropTypes.string,
    message: PropTypes.string,
    address: PropTypes.string,
    company: PropTypes.string,
    jobTitle: PropTypes.string,
    imageUrl: PropTypes.string,
    pdfContent: PropTypes.string,
    imageContent: PropTypes.string,
  }).isRequired,
  qrStyle: PropTypes.object.isRequired,
  onStyleChange: PropTypes.func.isRequired,
};

export default QROutputInterface;
