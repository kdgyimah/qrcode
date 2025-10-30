"use client";

import React, { useState, useEffect } from "react";
import { FormProps } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";

export interface Barcode2DFormData {
  content: string;
  description?: string;
}

export const Barcode2DForm: React.FC<FormProps<Barcode2DFormData>> = ({
  formData,
  errors,
  onChange,
  onValidityChange,
}) => {
  // Track touched fields for validation feedback
  const [touched, setTouched] = useState({
    content: false,
    description: false,
  });

  const handleBlur = (field: keyof Barcode2DFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Notify parent when form validity changes
  useEffect(() => {
    const isValid = Boolean(formData.content?.trim());
    onValidityChange?.(isValid);
  }, [formData, onValidityChange]);

  return (
    <>
      <div>
        <Label htmlFor="content">Barcode Content</Label>
        <input
          id="content"
          name="content"
          type="text"
          value={formData.content || ""}
          placeholder="Enter text or number for barcode"
          onChange={(e) => onChange("content", e.target.value)}
          onBlur={() => handleBlur("content")}
          className={`${inputBase} ${
            touched.content && errors.content ? "border-red-500 bg-red-50" : ""
          }`}
          aria-invalid={touched.content && !!errors.content}
          aria-describedby={
            touched.content && errors.content ? "content-error" : undefined
          }
        />
        {touched.content && errors.content && (
          <ErrorText id="content-error">{errors.content}</ErrorText>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description (optional)</Label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ""}
          placeholder="Short note about this barcode"
          onChange={(e) => onChange("description", e.target.value)}
          onBlur={() => handleBlur("description")}
          rows={2}
          className={`${inputBase} resize-none`}
          maxLength={100}
        />
        <div className="text-sm text-gray-500 mt-1">
          {(formData.description || "").length}/100 characters
        </div>
      </div>
    </>
  );
};
