"use client";

import React, { useCallback, useMemo } from "react";
import { FileText, Upload, Link } from "lucide-react";
import type { FormProps, PdfFormData } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";
import { cn } from "@/lib/utils";

// --------------------------
// Small Hook for Error Tracking
// --------------------------
const useFieldError = () => {
  const [touched, setTouched] = React.useState(false);
  const handleBlur = () => setTouched(true);
  const shouldShow = (error?: string) => touched && !!error;
  return { handleBlur, shouldShow };
};

// --------------------------
// Utility: Ensure https:// prefix for URLs
// --------------------------
const sanitizeUrl = (value: string): string => {
  if (!value) return "";
  if (!/^https?:\/\//i.test(value)) {
    return "https://" + value;
  }
  return value;
};

// --------------------------
// Main PdfForm Component
// --------------------------
export const PdfForm: React.FC<FormProps<PdfFormData>> = ({
  formData,
  onChange,
  errors,
}) => {
  const uploadType = formData.uploadType || "url";

  // validate overall form
  const isValid = useMemo(() => {
    if (uploadType === "url") return !!formData.pdfUrl?.trim();
    return formData.file instanceof File;
  }, [uploadType, formData.pdfUrl, formData.file]);

  // --------------------------
  // Handlers
  // --------------------------
  const handleUploadTypeChange = useCallback(
    (type: "url" | "file") => {
      onChange("uploadType", type);
      if (type === "url") {
        onChange("file", undefined);
      } else {
        onChange("pdfUrl", "");
      }
    },
    [onChange]
  );

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange("pdfUrl", e.target.value);
    },
    [onChange]
  );

  const handleUrlBlur = useCallback(() => {
    if (formData.pdfUrl) onChange("pdfUrl", sanitizeUrl(formData.pdfUrl));
  }, [formData.pdfUrl, onChange]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      onChange("file", file);
    },
    [onChange]
  );

  // --------------------------
  // Render
  // --------------------------
  return (
    <div className="space-y-6">
      <UploadTypeSelector
        selectedType={uploadType}
        onTypeChange={handleUploadTypeChange}
      />

      {uploadType === "url" ? (
        <UrlInput
          url={formData.pdfUrl || ""}
          error={errors.pdfUrl}
          onChange={handleUrlChange}
          onBlur={handleUrlBlur}
        />
      ) : (
        <FileInput
          file={formData.file}
          error={errors.file}
          onChange={handleFileChange}
        />
      )}

      {isValid && uploadType === "file" && formData.file && (
        <FilePreview file={formData.file} />
      )}
    </div>
  );
};

// --------------------------
// Subcomponents
// --------------------------
interface UploadTypeSelectorProps {
  selectedType: "url" | "file";
  onTypeChange: (type: "url" | "file") => void;
}

function UploadTypeSelector({ selectedType, onTypeChange }: UploadTypeSelectorProps) {
  return (
    <div>
      <Label>PDF Source *</Label>
      <div className="flex gap-4 mt-2">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="radio"
            name="uploadType"
            value="url"
            checked={selectedType === "url"}
            onChange={() => onTypeChange("url")}
          />
          <Link className="w-4 h-4 text-blue-500" />
          <span>Use PDF URL</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="radio"
            name="uploadType"
            value="file"
            checked={selectedType === "file"}
            onChange={() => onTypeChange("file")}
          />
          <Upload className="w-4 h-4 text-blue-500" />
          <span>Upload File</span>
        </label>
      </div>
    </div>
  );
}

interface UrlInputProps {
  url: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

function UrlInput({ url, error, onChange, onBlur }: UrlInputProps) {
  const { handleBlur, shouldShow } = useFieldError();
  const showError = shouldShow(error);

  return (
    <div>
      <Label htmlFor="pdfUrl">PDF URL *</Label>
      <input
        type="url"
        id="pdfUrl"
        value={url}
        onChange={onChange}
        onBlur={() => {
          handleBlur();
          onBlur();
        }}
        placeholder="https://example.com/document.pdf"
        className={cn(inputBase, showError && "border-red-500 bg-red-50")}
        aria-invalid={!!showError}
        aria-describedby={showError ? "pdfUrl-error" : undefined}
      />
      {showError && <ErrorText id="pdfUrl-error">{error}</ErrorText>}
    </div>
  );
}

interface FileInputProps {
  file?: File;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileInput({ file, error, onChange }: FileInputProps) {
  const { handleBlur, shouldShow } = useFieldError();
  const showError = shouldShow(error);

  return (
    <div>
      <Label htmlFor="pdfFile">Upload PDF *</Label>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          showError
            ? "border-red-400 bg-red-50"
            : "border-gray-300 hover:border-gray-400"
        )}
      >
        <input
          type="file"
          id="pdfFile"
          accept=".pdf,application/pdf"
          onChange={onChange}
          onBlur={handleBlur}
          className="hidden"
        />
        <label
          htmlFor="pdfFile"
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          <Upload className="w-8 h-8 text-gray-400" />
          {file ? (
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Click to upload PDF</p>
              <p className="text-xs text-gray-400">Max file size: 10MB</p>
            </div>
          )}
        </label>
      </div>
      {showError && <ErrorText id="pdfFile-error">{error}</ErrorText>}
    </div>
  );
}

function FilePreview({ file }: { file: File }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <Label className="mb-2">Selected File</Label>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-100 rounded-lg">
          <FileText className="w-5 h-5 text-red-700" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{file.name}</p>
          <p className="text-sm text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
          </p>
        </div>
      </div>
    </div>
  );
}