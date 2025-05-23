import { useState } from "react";
import CategoryField from "./CategoryField";
import "./QR-Interface.css";
import QROutputInterface from "./QROutputInterface";
import ScrollCategoryOption from "./ScrollCategoryOption";
import Frames from "./Frames";
// Update the import path to the correct location of FormModal, for example:
import FormModal from "../FrameStructure/FormModal"; // <-- Change this path if FormModal is elsewhere

// If FormModal is actually in the same folder, use:
// import FormModal from "./FormModal";

// Or if it's in a different folder, adjust the path accordingly, e.g.:
// import FormModal from "../someOtherFolder/FormModal";
import ConfirmationModal from "./ConfirmationModal";

const QRInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [tempCategory, setTempCategory] = useState<CategoryItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState({
    url: "",
    description: "",
    imageUrl: "",
    showIcon: false,
  });

  const [pdfData, setPdfData] = useState({ pdfContent: "" });
  const [imageData, setImageData] = useState({ imageContent: "" });

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    company: "",
    jobTitle: "",
  });

  const [smsData, setSmsData] = useState({});
  const [whatsappData, setWhatsappData] = useState({
    waPhoneNumber: "",
    waMessage: "",
  });

  const [frame, setFrame] = useState<string | null>(null);
  const [qrStyle, setQrStyle] = useState({
    dotsOptions: { type: "dots", color: "#726e6e" },
    cornersSquareOptions: { type: "square", color: "#160101" },
    cornersDotOptions: { type: "square", color: "#635858" },
  });

  const hasUnsavedData = () => {
    return (
      Object.values(content).some(Boolean) ||
      Object.values(pdfData).some(Boolean) ||
      Object.values(imageData).some(Boolean) ||
      Object.values(contactInfo).some(Boolean) ||
      Object.values(smsData).some(Boolean) ||
      Object.values(whatsappData).some(Boolean)
    );
  };

  interface CategoryItem {
    label: string;
    [key: string]: any;
  }

  interface ContentData {
    url: string;
    description: string;
    imageUrl: string;
    showIcon: boolean;
  }

  interface PdfData {
    pdfContent: string;
  }

  interface ImageData {
    imageContent: string;
  }

  interface ContactInfo {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    company: string;
    jobTitle: string;
  }

  interface SmsData {
    [key: string]: any;
  }

  interface WhatsappData {
    waPhoneNumber: string;
    waMessage: string;
  }

  interface QrStyle {
    dotsOptions: { type: string; color: string };
    cornersSquareOptions: { type: string; color: string };
    cornersDotOptions: { type: string; color: string };
  }

  const handleCategorySelected = (categoryItem: CategoryItem) => {
    if (hasUnsavedData()) {
      setTempCategory(categoryItem);
      setShowModal(true);
    } else {
      setSelectedCategory(categoryItem);
    }
  };

  const handleDiscard = () => {
    setContent({ url: "", description: "", imageUrl: "", showIcon: false });
    setPdfData({ pdfContent: "" });
    setImageData({ imageContent: "" });
    setContactInfo({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      company: "",
      jobTitle: "",
    });
    setSmsData({});
    setWhatsappData({ waPhoneNumber: "", waMessage: "" });
    setSelectedCategory(tempCategory);
    setTempCategory(null);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setTempCategory(null);
  };

  interface FrameHandler {
    (frameUrl: string): void;
  }

  const frameHandler: FrameHandler = (frameUrl) => {
    setFrame(frameUrl);
  };

  interface HandleContentCreateData {
    [key: string]: any;
  }

  const handleContentCreate = (data: HandleContentCreateData) => {
    switch (selectedCategory?.label) {
      case "Contact":
        setContactInfo(data as ContactInfo);
        break;
      case "SMS":
        setSmsData(data as SmsData);
        break;
      case "WhatsApp":
        setWhatsappData(data as WhatsappData);
        break;
      case "PDF":
        setPdfData(data as PdfData);
        break;
      case "Image":
        setImageData(data as ImageData);
        break;
      default:
        setContent(data as ContentData);
    }
  };

  return (
    <section className="qrSection container mt-4" style={{ padding: "10px" }}>
      <div className="qr-interface container">
        <ScrollCategoryOption onCategorySelect={handleCategorySelected} />

        <CategoryField
          selectedCategory={selectedCategory ?? undefined}
          onContentCreate={handleContentCreate}
        />

        <QROutputInterface
          frameSelected={frame}
          content={
            selectedCategory?.label === "Contact"
              ? contactInfo
              : selectedCategory?.label === "SMS"
              ? smsData
              : selectedCategory?.label === "WhatsApp"
              ? whatsappData
              : selectedCategory?.label === "Image"
              ? imageData
              : selectedCategory?.label === "PDF"
              ? pdfData
              : content
          }
          qrStyle={qrStyle}
          onStyleChange={setQrStyle}
        />

        <Frames onsetFrame={frameHandler} />

        {(selectedCategory?.label === "Contact"
          ? contactInfo
          : content
        ).url && (
          <FormModal
            formCSSData={frame}
            qrCodeContent={
              selectedCategory?.label === "Contact" ? contactInfo : content
            }
            qrStyle={qrStyle}
          />
        )}

        {showModal && (
          <ConfirmationModal onDiscard={handleDiscard} onCancel={handleCancel} />
        )}
      </div>
    </section>
  );
};

export default QRInterface;
