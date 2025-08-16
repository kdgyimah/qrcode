import React from "react";
import { CallFormData, FormProps } from "@/types/qr-generator";
import { PhoneInput } from "@/components/PhoneInput";

export const CallForm: React.FC<FormProps<CallFormData>> = ({ 
  formData, 
  errors, 
  onChange,
  onPhoneChange,
}) => {
  const handlePhoneChange = (value: string) => {
    if (onPhoneChange) {
      // Use the specialized phone handler if available
      onPhoneChange('phone', value);
    } else {
      // Fallback to regular onChange
      onChange('phone', value);
    }
  };

  return (
    <PhoneInput
      name="phone"
      value={formData.phone || ""}
      onChange={handlePhoneChange}
      label="Phone"
      error={errors.phone}
    />
  );
};