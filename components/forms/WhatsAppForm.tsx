import React from "react";
import { WhatsAppFormData, FormProps } from "@/types/qr-generator";
import { PhoneInput } from "@/components/PhoneInput";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";

export const WhatsAppForm: React.FC<FormProps<WhatsAppFormData>> = ({ 
  formData, 
  errors, 
  onChange,
  onPhoneChange,

}) => {
  const handlePhoneChange = (value: string) => {
    if (onPhoneChange) {
      // Use the specialized phone handler if available
      onPhoneChange('waPhone', value);
    } else {
      // Fallback to regular onChange
      onChange('waPhone', value);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    onChange('waBody', value);
  };

  return (
    <>
      <div>
        <PhoneInput
          name="waPhone"
          value={formData.waPhone || ""}
          onChange={handlePhoneChange}
          error={errors.waPhone}
          label="WhatsApp Number"
        />
      </div>

      <div>
        <Label htmlFor="waBody">Message (Optional)</Label>
        <textarea
          id="waBody"
          name="waBody"
          value={formData.waBody || ""}
          placeholder="WhatsApp message (optional)"
          onChange={handleMessageChange}
          rows={3}
          className={`${inputBase} resize-none ${errors.waBody ? "border-red-500" : ""}`}
          aria-invalid={!!errors.waBody}
          aria-describedby={errors.waBody ? "waBody-error" : undefined}
        />
        {errors.waBody && <ErrorText>{errors.waBody}</ErrorText>}
        
        {/* Optional: Character counter for very long messages */}
        {formData.waBody && formData.waBody.length > 0 && (
          <div className="text-sm text-gray-500 mt-1">
            {formData.waBody.length} characters
          </div>
        )}
      </div>
    </>
  );
};