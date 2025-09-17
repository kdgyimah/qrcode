"use client";

import React, { useState, useEffect } from "react";
import { SmsFormData, FormProps } from "@/types/qr-generator";
import { PhoneInput } from "@/components/PhoneInput";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";

export const SmsForm: React.FC<FormProps<SmsFormData>> = ({
  formData,
  errors,
  onChange,
  onPhoneChange,
  onValidityChange,
}) => {
  // track touched state for fields
  const [touched, setTouched] = useState({ phone: false, message: false });

  const handlePhoneChange = (value: string) => {
    if (onPhoneChange) {
      onPhoneChange("phone", value);
    } else {
      onChange("phone", value);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    onChange("message", value);
  };

  const handleBlur = (field: "phone" | "message") => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // tell parent if form is valid
  useEffect(() => {
    const valid = Boolean(formData.phone && formData.message);
    onValidityChange?.(valid);
  }, [formData, onValidityChange]);

  return (
    <>
      <div>
        <PhoneInput
          name="phone"
          value={formData.phone || ""}
          onChange={handlePhoneChange}
          onBlur={() => handleBlur("phone")}
          error={touched.phone ? errors.phone : undefined}
          label="Recipient Phone"
        />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          value={formData.message || ""}
          placeholder="SMS content"
          onChange={handleMessageChange}
          onBlur={() => handleBlur("message")}
          rows={3}
          className={`${inputBase} resize-none ${
            touched.message && errors.message ? "border-red-500 bg-red-50" : ""
          }`}
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={touched.message && errors.message ? "message-error" : undefined}
          maxLength={160}
        />
        {touched.message && errors.message && (
          <ErrorText id="message-error">{errors.message}</ErrorText>
        )}

        {/* Character counter */}
        <div className="text-sm text-gray-500 mt-1">
          {(formData.message || "").length}/160 characters
        </div>
      </div>
    </>
  );
};
