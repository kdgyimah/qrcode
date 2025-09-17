"use client";

import React, { useCallback, useMemo, useState } from "react";
import type { FormProps, ContactFormData } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";
import { cn } from "@/lib/utils";

export const ContactForm: React.FC<FormProps<ContactFormData>> = ({
  formData,
  onChange,
  onPhoneChange,
}) => {
  const requiredFields = useMemo(
    () => new Set(["firstName", "lastName", "phone", "email"]),
    []
  );

  // Track touched fields
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const markTouched = (field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validation logic
  const validateField = (field: keyof ContactFormData, value: string): string | undefined => {
    if (requiredFields.has(field) && !value.trim()) {
      return "This field is required.";
    }
    if (field === "email" && value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) return "Please enter a valid email address.";
    }
    if (field === "phone" && value.trim()) {
      const phonePattern = /^\+?\d{7,}$/; // basic: at least 7 digits
      if (!phonePattern.test(value)) return "Please enter a valid phone number.";
    }
    if (field === "website" && value.trim()) {
      try {
        new URL(value);
      } catch {
        return "Please enter a valid URL.";
      }
    }
    return undefined;
  };

  const getError = (field: keyof ContactFormData): string | undefined => {
    if (!touched[field]) return undefined;
    return validateField(field, formData[field] || "");
  };

  // Optimized change handlers
  const handleChange = useCallback(
    (field: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field, e.target.value);
    },
    [onChange]
  );

  const handlePhoneChangeWrapper = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (onPhoneChange) {
        onPhoneChange("phone", value);
      } else {
        onChange("phone", value);
      }
    },
    [onChange, onPhoneChange]
  );

  const handleMobileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (onPhoneChange) {
        onPhoneChange("mobile", value);
      } else {
        onChange("mobile", value);
      }
    },
    [onChange, onPhoneChange]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Personal Info */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 border-b pb-2">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName || ""}
                onChange={handleChange("firstName")}
                onBlur={() => markTouched("firstName")}
                placeholder="John"
                className={cn(inputBase, getError("firstName") && "border-red-500 bg-red-50")}
              />
              {getError("firstName") && (
                <ErrorText id="firstName-error">{getError("firstName")}</ErrorText>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName || ""}
                onChange={handleChange("lastName")}
                onBlur={() => markTouched("lastName")}
                placeholder="Doe"
                className={cn(inputBase, getError("lastName") && "border-red-500 bg-red-50")}
              />
              {getError("lastName") && (
                <ErrorText id="lastName-error">{getError("lastName")}</ErrorText>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <input
                type="tel"
                id="phone"
                value={formData.phone || ""}
                onChange={handlePhoneChangeWrapper}
                onBlur={() => markTouched("phone")}
                placeholder="+233 (555) 123-4567"
                className={cn(inputBase, getError("phone") && "border-red-500 bg-red-50")}
              />
              {getError("phone") && <ErrorText id="phone-error">{getError("phone")}</ErrorText>}
            </div>
            <div>
              <Label htmlFor="mobile">Mobile</Label>
              <input
                type="tel"
                id="mobile"
                value={formData.mobile || ""}
                onChange={handleMobileChange}
                onBlur={() => markTouched("mobile")}
                placeholder="+233 (555) 987-6543"
                className={cn(inputBase, getError("mobile") && "border-red-500 bg-red-50")}
              />
              {getError("mobile") && <ErrorText id="mobile-error">{getError("mobile")}</ErrorText>}
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <input
                type="email"
                id="email"
                value={formData.email || ""}
                onChange={handleChange("email")}
                onBlur={() => markTouched("email")}
                placeholder="john.doe@example.com"
                className={cn(inputBase, getError("email") && "border-red-500 bg-red-50")}
              />
              {getError("email") && <ErrorText id="email-error">{getError("email")}</ErrorText>}
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <input
                type="url"
                id="website"
                value={formData.website || ""}
                onChange={handleChange("website")}
                onBlur={() => markTouched("website")}
                placeholder="https://example.com"
                className={cn(inputBase, getError("website") && "border-red-500 bg-red-50")}
              />
              {getError("website") && <ErrorText id="website-error">{getError("website")}</ErrorText>}
            </div>
          </div>
        </div>

        {/* You can apply the same getError+markTouched pattern in ProfessionalInfoSection and AddressSection */}
      </div>
    </div>
  );
};
