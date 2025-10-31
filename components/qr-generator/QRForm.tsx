"use client";

import { useState } from "react";
import { QRCategory, AnyQRFormData, QRCodeStyle } from "@/types/qr-generator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { QRFormField } from "./QRFormField";
import { QRStyleCustomizer } from "./QRStyleCustomizer";
import { QRPreview } from "./QRPreview";
import { supabase } from "@/lib/supabase";

interface Folder {
  id: string;
  name: string;
}

interface QRFormProps {
  category: QRCategory;
  folders: Folder[];
  isGenerating: boolean;
  onBack: () => void;
  onGenerate: (data: AnyQRFormData, style: QRCodeStyle) => void;
}

export function QRForm({
  category,
  folders,
  isGenerating,
  onBack,
  onGenerate,
}: QRFormProps) {
  const [formData, setFormData] = useState<AnyQRFormData>({});
  const [style, setStyle] = useState<QRCodeStyle>({
    shape: "square",
    backgroundColor: "#FFFFFF",
    foregroundColor: "#000000",
    logo: null,
    logoSize: 20,
  });
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");

  const handleInputChange = (
    field: string,
    value: string | boolean | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStyleChange = (field: keyof QRCodeStyle, value: unknown) => {
    setStyle((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isGenerating) {
      onGenerate(formData, style);
    }
  };

  const handleDownload = () => {
    if (!isGenerating) {
      onGenerate(formData, style);
    }
  };

  // ✅ NEW: Helper to convert base64 to Blob
  function base64ToBlob(base64: string) {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/png" });
  }

  // ✅ UPDATED: Save QR Code to Supabase
  const handleSaveQRCode = async (qrBase64: string) => {
    try {
      if (!selectedFolderId) {
        alert("Please select a folder before saving the QR code.");
        return;
      }

      // 1️⃣ Get authenticated user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Auth error:", authError);
        alert("You must be logged in to save QR codes.");
        return;
      }

      // 2️⃣ Convert QR base64 to blob
      const blob = base64ToBlob(qrBase64);

      // 3️⃣ Generate a unique file path
      const filePath = `qr-images/${user.id}/${crypto.randomUUID()}.png`;

      // 4️⃣ Upload to Supabase storage bucket (must exist: "qr-images")
      const { error: uploadError } = await supabase.storage
        .from("qr-images")
        .upload(filePath, blob, { contentType: "image/png" });

      if (uploadError) throw uploadError;

      // 5️⃣ Get the public URL of the uploaded file
      const { data: publicData } = supabase.storage
        .from("qr-images")
        .getPublicUrl(filePath);

      const publicUrl = publicData?.publicUrl;
      if (!publicUrl) throw new Error("Failed to retrieve public URL.");

      // 6️⃣ Insert into the qr_codes table
      const { error: insertError } = await supabase.from("qr_codes").insert([
        {
          user_id: user.id,
          folder_id: selectedFolderId,
          name: `${category.name} QR Code`,
          type: category.id,
          data: formData,
          design: style,
          qr_image_url: publicUrl,
          status: "Active",
        },
      ]);

      if (insertError) throw insertError;

      console.log("✅ QR code saved successfully:", publicUrl);
      alert("QR code saved successfully!");
    } catch (error: unknown  ) {
      console.error("❌ Error saving QR:", {
        message: error,
        details: error,
        hint: error,
        code: error,
      });
      alert(`Failed to save QR: ${error}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create your QR Code</h1>
            <p className="text-muted-foreground">Create all QR Codes</p>
          </div>
        </div>

        <Button
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isGenerating}
          onClick={handleSubmit}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            "Continue →"
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Form Fields */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-4">{category.name}</h3>
              <QRFormField
                category={category}
                formData={formData}
                folders={folders}
                onInputChange={handleInputChange}
              />
            </div>

            {/* Style Customizer */}
            <div className="bg-white border rounded-lg p-4">
              <QRStyleCustomizer
                style={style}
                onStyleChange={handleStyleChange}
                folders={folders}
                selectedFolderId={selectedFolderId}
                onFolderChange={setSelectedFolderId}
              />
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-4 sticky top-6">
            <QRPreview
              category={category}
              formData={formData}
              style={style}
              onDownload={handleDownload}
              selectedFolderId={selectedFolderId}
              onSave={handleSaveQRCode} // ✅ Updated handler
            />
          </div>
        </div>
      </div>
    </div>
  );
}