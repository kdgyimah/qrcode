"use client";

import React, { useCallback, useMemo, useState } from "react";
import type { FormProps, ContactFormData } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { ChevronUp, Plus } from "lucide-react";

export const ContactForm: React.FC<FormProps<ContactFormData>> = ({
  formData,
  onChange,
  onPhoneChange,
}) => {
  const requiredFields = useMemo(
    () => new Set(["firstName", "lastName", "phone", "email"]),
    []
  );

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showMore, setShowMore] = useState(false);

  const markTouched = (field: keyof ContactFormData) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const validateField = (field: keyof ContactFormData, value: string): string | undefined => {
    if (requiredFields.has(field) && !value.trim()) return "This field is required.";
    if (field === "email" && value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) return "Please enter a valid email address.";
    }
    if (field === "phone" && value.trim()) {
      const phonePattern = /^\+?\d{7,}$/;
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

  const getError = (field: keyof ContactFormData): string | undefined =>
    touched[field] ? validateField(field, formData[field] || "") : undefined;

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


  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900 border-b pb-2">
          Contact Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
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

          {/* Last Name */}
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

          {/* Phone */}
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

          {/* Email */}
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
        </div>
      </div>

      {/* Optional Fields Toggle */}
      <button
        type="button"
        onClick={() => setShowMore((prev) => !prev)}
        className="flex items-center text-blue-600 hover:underline text-sm mt-2"
      >
        {showMore ? (
          <>
            <ChevronUp className="w-4 h-4 mr-1" /> Hide Additional Fields
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 mr-1" /> Add More Details
          </>
        )}
      </button>

      {/* Optional Fields */}
      {showMore && (
        <div className="border-t pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organization">Organization</Label>
              <input
                type="text"
                id="organization"
                value={formData.organization || ""}
                onChange={handleChange("organization")}
                placeholder="Company or Institution"
                className={inputBase}
              />
            </div>

            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <input
                type="text"
                id="jobTitle"
                value={formData.jobTitle || ""}
                onChange={handleChange("jobTitle")}
                placeholder="Software Engineer"
                className={inputBase}
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <input
                type="url"
                id="website"
                value={formData.website || ""}
                onChange={handleChange("website")}
                placeholder="https://example.com"
                className={cn(inputBase, getError("website") && "border-red-500 bg-red-50")}
              />
              {getError("website") && (
                <ErrorText id="website-error">{getError("website")}</ErrorText>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <input
                type="text"
                id="address"
                value={formData.address || ""}
                onChange={handleChange("address")}
                placeholder="123 Street, City"
                className={inputBase}
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <input
                type="text"
                id="city"
                value={formData.city || ""}
                onChange={handleChange("city")}
                placeholder="Accra"
                className={inputBase}
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <input
                type="text"
                id="country"
                value={formData.country || ""}
                onChange={handleChange("country")}
                placeholder="Ghana"
                className={inputBase}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
