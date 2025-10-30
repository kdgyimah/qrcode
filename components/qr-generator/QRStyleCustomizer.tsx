"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QRCodeStyle } from "@/types/qr-generator";
import { cn } from "@/lib/utils";

interface QRStyleCustomizerProps {
  style: QRCodeStyle;
  onStyleChange: (field: keyof QRCodeStyle, value: unknown) => void;
  folders: { id: string; name: string }[];
  selectedFolderId?: string;
  onFolderChange?: (folderId: string) => void;
}

const QR_SHAPES = [
  { value: "square", label: "Square", preview: "⬜" },
  { value: "circle", label: "Circle", preview: "⭕" },
  { value: "rounded", label: "Rounded", preview: "⬛" },
] as const;

const COLOR_PRESETS = [
  { name: "Classic", bg: "#FFFFFF", fg: "#000000" },
  { name: "Blue", bg: "#EBF8FF", fg: "#2563EB" },
  { name: "Green", bg: "#F0FDF4", fg: "#16A34A" },
  { name: "Purple", bg: "#FAF5FF", fg: "#9333EA" },
  { name: "Red", bg: "#FEF2F2", fg: "#DC2626" },
  { name: "Orange", bg: "#FFF7ED", fg: "#EA580C" },
];

export function QRStyleCustomizer({
  style,
  onStyleChange,
  folders,
  selectedFolderId,
  onFolderChange,
}: QRStyleCustomizerProps) {
  const [openSection, setOpenSection] = useState<"shape" | "logo" | "folder" | null>("shape");
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  // Handle logo preview memory cleanup
  useEffect(() => {
    if (style.logo instanceof File) {
      const url = URL.createObjectURL(style.logo);
      setLogoPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setLogoPreviewUrl(null);
  }, [style.logo]);

  const toggleSection = (section: typeof openSection) =>
    setOpenSection((prev) => (prev === section ? null : section));

  return (
    <div className="space-y-4">
      {/* --- SHAPE & COLOR SECTION --- */}
      <CollapsibleSection
        title="Shapes & Color"
        isOpen={openSection === "shape"}
        onToggle={() => toggleSection("shape")}
      >
        {/* Shapes */}
        <div>
          <Label className="text-sm text-gray-600">Shapes</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {QR_SHAPES.map((shape) => (
              <button
                key={shape.value}
                type="button"
                onClick={() => onStyleChange("shape", shape.value)}
                className={cn(
                  "p-2 border rounded-lg text-center transition-all",
                  style.shape === shape.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="text-lg mb-1">{shape.preview}</div>
                <div className="text-xs">{shape.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Presets */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                onStyleChange("backgroundColor", preset.bg);
                onStyleChange("foregroundColor", preset.fg);
              }}
              className={cn(
                "p-2 border rounded-lg text-center transition-all",
                style.backgroundColor === preset.bg &&
                  style.foregroundColor === preset.fg
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div
                className="w-full h-6 rounded mb-1"
                style={{ backgroundColor: preset.bg, border: `2px solid ${preset.fg}` }}
              />
              <div className="text-xs">{preset.name}</div>
            </button>
          ))}
        </div>

        {/* Custom Colors */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <ColorPicker
            label="Background Color"
            value={style.backgroundColor}
            onChange={(val) => onStyleChange("backgroundColor", val)}
          />
          <ColorPicker
            label="Foreground Color"
            value={style.foregroundColor}
            onChange={(val) => onStyleChange("foregroundColor", val)}
          />
        </div>
      </CollapsibleSection>

      {/* --- LOGO SECTION --- */}
      <CollapsibleSection
        title="Logo"
        isOpen={openSection === "logo"}
        onToggle={() => toggleSection("logo")}
      >
        <div>
          <Label className="text-sm text-gray-600">Upload Logo</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onStyleChange("logo", e.target.files?.[0] || null)}
          />

          {logoPreviewUrl && (
            <div className="mt-2 flex items-center gap-3">
              <Image
                src={logoPreviewUrl}
                alt="Logo Preview"
                className="w-12 h-12 object-contain border rounded"
                width={48}
                height={48}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStyleChange("logo", null)}
                className="text-red-500"
              >
                <X className="w-4 h-4 mr-1" /> Remove
              </Button>
            </div>
          )}
        </div>

        <div className="mt-4">
          <Label className="text-sm text-gray-600">Logo Size</Label>
          <Input
            type="range"
            min={10}
            max={50}
            value={style.logoSize}
            onChange={(e) => onStyleChange("logoSize", Number(e.target.value))}
          />
          <p className="text-xs text-gray-500">Size: {style.logoSize}px</p>
        </div>
      </CollapsibleSection>

      {/* --- FOLDER SECTION --- */}
      <CollapsibleSection
        title="Folder"
        isOpen={openSection === "folder"}
        onToggle={() => toggleSection("folder")}
      >
        <Label className="text-sm text-gray-600">Folder</Label>
        <select
          className="w-full p-2 border rounded mt-2"
          value={selectedFolderId || ""}
          onChange={(e) => onFolderChange?.(e.target.value)}
        >
          <option value="">Select folder</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </CollapsibleSection>
    </div>
  );
}

/* ---------------------- REUSABLE SUBCOMPONENTS ---------------------- */

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function CollapsibleSection({ title, isOpen, onToggle, children }: CollapsibleSectionProps) {
  return (
    <div className="border rounded-lg">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-left font-medium"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && <div className="px-4 pb-4 space-y-4">{children}</div>}
    </div>
  );
}

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div>
      <Label className="text-sm text-gray-600">{label}</Label>
      <div className="flex items-center gap-2 mt-1">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border cursor-pointer"
        />
        <span className="text-sm text-gray-500">{value}</span>
      </div>
    </div>
  );
}
