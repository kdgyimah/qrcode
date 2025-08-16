"use client";

import React, { useCallback, useMemo } from "react";
import { FileText, Upload, Link } from "lucide-react";
import type { FormProps, PdfFormData } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";
import { cn } from "@/lib/utils";

export const PdfForm: React.FC<FormProps<PdfFormData>> = ({
  formData,
  onChange,
  errors,
}) => {
  // Memoized validation state
  const isValid = useMemo(() => {
    if (formData.uploadType === "url") {
      return formData.pdfUrl?.trim();
    }
    return formData.file instanceof File;
  }, [formData.uploadType, formData.pdfUrl, formData.file]);

  // Optimized change handlers
  const handleUploadTypeChange = useCallback((type: "url" | "file") => {
    onChange("uploadType", type);
    // Clear the other field when switching types
    if (type === "url") {
      onChange("file", undefined);
    } else {
      onChange("pdfUrl", "");
    }
  }, [onChange]);

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange("pdfUrl", e.target.value);
  }, [onChange]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange("file", file);
  }, [onChange]);

  const uploadType = formData.uploadType || "url";

  return (
    <div className="space-y-6">
      <FormHeader />

      <UploadTypeSelector
        selectedType={uploadType}
        onTypeChange={handleUploadTypeChange}
      />

      {uploadType === "url" ? (
        <UrlInput
          url={formData.pdfUrl || ""}
          error={errors.pdfUrl}
          onChange={handleUrlChange}
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

      <PdfTips />
    </div>
  );
};

// Extracted components for better organization
function FormHeader() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-red-100 rounded-lg">
        <FileText className="w-5 h-5 text-red-700" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">PDF QR Code</h3>
        <p className="text-sm text-gray-600">Share PDF documents</p>
      </div>
    </div>
  );
}

interface UploadTypeSelectorProps {
  selectedType: "url" | "file";
  onTypeChange: (type: "url" | "file") => void;
}

function UploadTypeSelector({ selectedType, onTypeChange }: UploadTypeSelectorProps) {
  return (
    <div>
      <Label>PDF Source *</Label>
      <div className="flex gap-4 mt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="uploadType"
            value="url"
            checked={selectedType === "url"}
            onChange={() => onTypeChange("url")}
            className="text-blue-600"
          />
          <Link className="w-4 h-4" />
          <span className="text-sm">PDF URL</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="uploadType"
            value="file"
            checked={selectedType === "file"}
            onChange={() => onTypeChange("file")}
            className="text-blue-600"
          />
          <Upload className="w-4 h-4" />
          <span className="text-sm">Upload File</span>
        </label>
      </div>
    </div>
  );
}

interface UrlInputProps {
  url: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UrlInput({ url, error, onChange }: UrlInputProps) {
  return (
    <div>
      <Label htmlFor="pdfUrl">PDF URL *</Label>
      <input
        type="url"
        id="pdfUrl"
        value={url}
        onChange={onChange}
        placeholder="https://example.com/document.pdf"
        className={cn(
          inputBase,
          error && "border-red-500 bg-red-50"
        )}
        aria-invalid={!!error}
        aria-describedby={error ? "pdfUrl-error" : undefined}
        required
      />
      {error && (
        <ErrorText>{error}</ErrorText>
      )}
      <p className="mt-1 text-xs text-gray-500">
        Direct link to PDF file that's publicly accessible
      </p>
    </div>
  );
}

interface FileInputProps {
  file?: File;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileInput({ file, error, onChange }: FileInputProps) {
  return (
    <div>
      <Label htmlFor="pdfFile">Upload PDF *</Label>
      <div className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
        error ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
      )}>
        <input
          type="file"
          id="pdfFile"
          accept=".pdf,application/pdf"
          onChange={onChange}
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
      {error && (
        <ErrorText>{error}</ErrorText>
      )}
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

function PdfTips() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="text-sm font-medium text-blue-900 mb-2">
        PDF Sharing Tips
      </h4>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>• URL option: PDF must be publicly accessible</li>
        <li>• File upload: Best for private or temporary sharing</li>
        <li>• Consider file size for mobile users</li>
        <li>• Test QR code before sharing widely</li>
        <li>• File uploads may require cloud hosting</li>
      </ul>
    </div>
  );
}