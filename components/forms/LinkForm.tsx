import React from "react";
import { LinkFormData, FormProps } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";

export const LinkForm: React.FC<FormProps<LinkFormData>> = ({ 
  formData, 
  errors, 
  onChange, 
  onContentCreate 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof LinkFormData, value);
  };

  return (
    <>
      <Label htmlFor="url">URL</Label>
      <input
        id="url"
        name="url"
        type="url"
        value={formData.url || ""}
        placeholder="https://example.com"
        onChange={handleChange}
        className={`${inputBase} ${errors.url ? "border-red-500" : ""}`}
        aria-invalid={!!errors.url}
        aria-describedby={errors.url ? "url-error" : undefined}
      />
      {errors.url && <ErrorText>{errors.url}</ErrorText>}
    </>
  );
};