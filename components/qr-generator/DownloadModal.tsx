"use client";

import { useEffect, useState } from "react";
import { QRFormData, QRCodeStyle } from "@/types/qr-generator";
import { QRCodeCanvas } from "qrcode.react";
import * as htmlToImage from 'html-to-image';
import jsPDF from "jspdf";

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
import { Download, Share2, Pencil, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: QRFormData;
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
  const [qrName, setQrName] = useState(`${categoryName}_QR`);
  const [format, setFormat] = useState("PNG");
  const [size, setSize] = useState("1200");
  const [isDownloading, setIsDownloading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const value = Object.values(data)[0] as string;

  useEffect(() => {
    if (!style.logo) return setLogoUrl(null);

    if (typeof style.logo === "string") {
      setLogoUrl(style.logo);
    } else if (style.logo instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoUrl(reader.result as string);
      reader.readAsDataURL(style.logo);
    }
  }, [style.logo]);

  const handleDownload = async () => {
    const node = document.getElementById("qr-preview-wrapper");
    if (!node) return;

    setIsDownloading(true);
    const width = parseInt(size);
    const height = parseInt(size);

    try {
      if (["PNG", "JPG", "WEBP"].includes(format)) {
        const toImage = {
          PNG: htmlToImage.toPng,
          JPG: htmlToImage.toJpeg,
          WEBP: htmlToImage.toBlob,
        }[format];

        if (!toImage) throw new Error("Unsupported format");

        const result = await toImage(node, { width, height });

        let blob: Blob;

        if (format === "WEBP") {
          if (!result) throw new Error("Failed to generate WEBP image.");
          blob = result as Blob;
        } else {
          blob = await fetch(result as string).then((r) => r.blob());
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${qrName}.${format.toLowerCase()}`;
        link.click();
        URL.revokeObjectURL(url);
      } else if (format === "PDF") {
        const dataUrl = await htmlToImage.toPng(node, { width, height });
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [width + 40, height + 40],
        });

        pdf.addImage(dataUrl, "PNG", 20, 20, width, height);
        pdf.save(`${qrName}.pdf`);
      } else if (format === "SVG") {
        const svg = await htmlToImage.toSvg(node, { width, height });
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${qrName}.svg`;
        link.click();
        URL.revokeObjectURL(url);
      } else {
        alert("Unsupported format.");
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert("Something went wrong while downloading.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    console.log("Sharing QR...");
    // You can implement Web Share API or custom logic here
  };

  const handleTrack = () => {
    console.log("Track scan clicked");
    // Navigate to tracking page or open modal, etc.
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[748px] h-[494px] p-5 flex flex-col justify-between"
        style={{ maxWidth: "748px", maxHeight: "494px" }}
      >
        <div className="flex flex-col gap-4 h-full">
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-semibold">
              Name your QR code and share
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-5 flex-1">
            {/* Left Section */}
            <div className="flex flex-col justify-between">
              <div className="space-y-3">
                {/* QR Name */}
                <div>
                  <Label htmlFor="qr-name">QR Code Name</Label>
                  <div className="relative">
                    <Input
                      id="qr-name"
                      value={qrName}
                      onChange={(e) => setQrName(e.target.value)}
                      className="pr-8"
                    />
                    <Pencil className="absolute right-2 top-2.5 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* URL Preview */}
                <div>
                  <Label>URL</Label>
                  <div className="relative">
                    <Input
                      readOnly
                      value={value}
                      className="pr-8 bg-muted cursor-default"
                    />
                    <Eye className="absolute right-2 top-2.5 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Format & Size */}
                <div className="flex gap-4">
                  <div className="w-full">
                    <Label>Image Format</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PNG">PNG</SelectItem>
                        <SelectItem value="JPG">JPG</SelectItem>
                        <SelectItem value="WEBP">WEBP</SelectItem>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="SVG">SVG (beta)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full">
                    <Label>Image Size</Label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="400">400px</SelectItem>
                        <SelectItem value="800">800px</SelectItem>
                        <SelectItem value="1200">1200px</SelectItem>
                        <SelectItem value="2400">2400px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Download/Share Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleDownload}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                  disabled={isDownloading}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isDownloading ? "Downloading..." : "Download"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* QR Preview */}
            <div className="flex items-center justify-center">
              <Card className="w-full max-w-xs shadow-none border">
                <CardContent className="flex items-center justify-center p-4">
                  <div
                    id="qr-preview-wrapper"
                    className="bg-white border rounded-md flex items-center justify-center"
                    style={{
                      width: "240px",
                      height: "240px",
                      padding: "12px",
                    }}
                  >
                    <QRCodeCanvas
                      value={value}
                      size={216}
                      fgColor={style?.foregroundColor || "#000000"}
                      bgColor={style?.backgroundColor || "#ffffff"}
                      includeMargin
                      imageSettings={
                        logoUrl
                          ? {
                              src: logoUrl,
                              height: 40,
                              width: 40,
                              excavate: true,
                            }
                          : undefined
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Track Section */}
          <div className="bg-gray-100 rounded-md px-4 py-3 flex items-center justify-between text-sm text-muted-foreground">
            <span>Track your code and see the scans on it</span>
            <Button
              variant="link"
              size="sm"
              onClick={handleTrack}
              className="text-blue-600"
            >
              Track Scan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
