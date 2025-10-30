"use client";

import { useState, useRef } from "react";
import { AnyQRFormData, QRCodeStyle } from "@/types/qr-generator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { QRCodeCanvas } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/hooks/useUser";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AnyQRFormData & { name?: string; folder?: string };
  style: QRCodeStyle;
  categoryName: string;
}

export function DownloadModal({
  isOpen,
  onClose,
  data,
  style,
  categoryName,
}: DownloadModalProps) {
  const { toast } = useToast();
  const user = useUser();
  const [qrName, setQrName] = useState(data.name || `${categoryName}_QR`);
  const [format, setFormat] = useState<"png" | "jpg">("png");
  const [size] = useState("800");
  const [isSaving, setIsSaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Convert form data to final content string
  const convertToQRString = (formData: AnyQRFormData): string => {
    if ("url" in formData && formData.url) return formData.url;
    if ("phone" in formData && formData.phone && !("message" in formData))
      return `tel:${formData.phone}`;
    if ("phone" in formData && "message" in formData)
      return `SMSTO:${formData.phone}:${formData.message}`;
    if ("waPhone" in formData && formData.waPhone) {
      const phone = formData.waPhone.replace(/[^0-9]/g, "");
      const message = formData.waBody
        ? `?text=${encodeURIComponent(formData.waBody)}`
        : "";
      return `https://wa.me/${phone}${message}`;
    }
    if ("email" in formData && formData.email) {
      if ("subject" in formData && formData.subject) {
        const msg = "message" in formData ? formData.message || "" : "";
        return `mailto:${formData.email}?subject=${encodeURIComponent(
          formData.subject
        )}&body=${encodeURIComponent(msg)}`;
      }
      return `mailto:${formData.email}`;
    }
    if ("ssid" in formData && formData.ssid) {
      const encryption = formData.encryption || "WPA";
      const password = formData.password || "";
      return `WIFI:T:${encryption};S:${formData.ssid};P:${password};;`;
    }
    if ("firstName" in formData || "lastName" in formData) {
      return `BEGIN:VCARD
VERSION:3.0
FN:${formData.firstName || ""} ${formData.lastName || ""}
TEL:${formData.phone || ""}
EMAIL:${formData.email || ""}
END:VCARD`;
    }
    if ("eventTitle" in formData) return formData.eventTitle;
    if ("socialUrl" in formData) return formData.socialUrl;
    if ("appUrl" in formData) return formData.appUrl;
    if ("videoUrl" in formData) return formData.videoUrl;
    if ("imageUrl" in formData) return formData.imageUrl || "";
    if ("pdfUrl" in formData) return formData.pdfUrl || "";
    return "https://example.com";
  };

  // 🔥 Save to Supabase & generate tracking link
  const saveQRCodeToSupabase = async (): Promise<string | null> => {
    try {
      setIsSaving(true);

      const destinationUrl = convertToQRString(data);

      // Save record
      const { data: inserted, error } = await supabase
        .from("qr_codes")
        .insert([
          {
            name: qrName,
            type: categoryName,
            destination_url: destinationUrl,
            user_id: user?.id,
            status: "active",
          },
        ])
        .select("id")
        .single();

      if (error) throw error;

      // Build tracking URL (replace with your domain)
      const trackingUrl = `${window.location.origin}/scan/${inserted.id}`;
      return trackingUrl;
    } catch (err: unknown) {
      console.error("Failed to save QR code:", err);
      toast({
        title: "Error",
        description: "Failed to save QR code",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  // 📥 Download the QR
  const handleDownload = async () => {
    if (!canvasRef.current) return;

    setIsSaving(true);
    const trackingUrl = await saveQRCodeToSupabase();
    if (!trackingUrl) return;

    const canvas = canvasRef.current;
    const fileName = `${qrName.replace(/\s+/g, "-")}.${format}`;
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, `image/${format}`)
    );

    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = fileName;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      toast({
        title: "QR code saved!",
        description: "Your QR was saved and downloaded successfully.",
      });
    }

    setIsSaving(false);
  };

  const qrValue = convertToQRString(data);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6">
        <DialogHeader>
          <DialogTitle>Download & Save QR</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <Label>QR Name</Label>
            <Input
              value={qrName}
              onChange={(e) => setQrName(e.target.value)}
              placeholder="Enter QR Name"
            />

            <Label>Format</Label>
            <Select value={format} onValueChange={(v: "png" | "jpg") => setFormat(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpg">JPG</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleDownload}
              disabled={isSaving}
              className="bg-blue-500 hover:bg-blue-600 text-white w-full"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" /> Save & Download
                </>
              )}
            </Button>
          </div>

          <div className="flex justify-center items-center md:w-1/2">
            <Card className="w-full max-w-xs">
              <CardContent className="p-4 flex justify-center">
                <QRCodeCanvas
                  ref={canvasRef}
                  value={qrValue}
                  size={parseInt(size)}
                  level="H"
                  includeMargin
                  style={{
                    backgroundColor: style.backgroundColor,
                    color: style.foregroundColor,
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}