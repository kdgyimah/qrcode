"use client";

import React, { useState } from "react";
import { CallFormData, FormProps } from "@/types/qr-generator";
import { PhoneInput } from "@/components/PhoneInput";

export const CallForm: React.FC<FormProps<CallFormData>> = ({
  formData,
  onChange,
  onPhoneChange,
}) => {
  const [touched, setTouched] = useState(false);

  const handlePhoneChange = (value: string) => {
    if (onPhoneChange) {
      onPhoneChange("phone", value);
    } else {
      onChange("phone", value);
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  // Phone validation logic
  const validatePhone = (phone: string): string | undefined => {
    if (!phone || phone.trim() === "") {
      return "This field is required.";
    }
    // Simple validation: must be digits after country code
    const phonePattern = /^\+\d{1,4}\s\d{4,}$/; 
    if (!phonePattern.test(phone)) {
      return "Please enter a valid phone number.";
    }
    return undefined;
  };

  // Decide which error to show
  const dynamicError =
    touched || (formData.phone && formData.phone.trim() !== "")
      ? validatePhone(formData.phone || "")
      : undefined;

  return (
    <PhoneInput
      name="phone"
      value={formData.phone || ""}
      onChange={handlePhoneChange}
      onBlur={handleBlur}
      label="Phone"
      error={dynamicError}
    />
  );
};
