import React, { useEffect } from "react";
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

  // 🔑 Tell parent when form is valid
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
          error={errors.phone}
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
          rows={3}
          className={`${inputBase} resize-none ${errors.message ? "border-gray-300 bg-white" : ""}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          maxLength={160} // SMS character limit
        />
        {errors.message && <ErrorText>{errors.message}</ErrorText>}
        
        {/* Character counter */}
        <div className="text-sm text-gray-500 mt-1">
          {(formData.message || "").length}/160 characters
        </div>
      </div>
    </>
  );
};
