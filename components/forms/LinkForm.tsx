import React, { useState, ChangeEvent, FocusEvent } from "react";
import { LinkFormData, FormProps } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";

export const LinkForm: React.FC<FormProps<LinkFormData>> = ({
  formData,
  onChange,
}) => {
  const [localError, setLocalError] = useState<string>("");
  const [touched, setTouched] = useState(false);

  const validateUrl = (value: string) => {
    if (!value) {
      setLocalError("This field is required.");
    } else if (!/^https?:\/\//i.test(value)) {
      setLocalError("Please enter a valid URL (must start with http:// or https://).");
    } else {
      setLocalError("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Auto prepend https:// if missing
    if (newValue && !/^https?:\/\//i.test(newValue)) {
      newValue = "https://" + newValue;
    }

    onChange(name as keyof LinkFormData, newValue);

    if (touched) validateUrl(newValue);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    validateUrl(e.target.value.trim());
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
        onBlur={handleBlur}
        className={`${inputBase} ${localError ? "border-red-500" : "border-gray-300 bg-white"}`}
        aria-invalid={!!localError}
        aria-describedby={localError ? "url-error" : undefined}
      />
      {localError && <ErrorText id="url-error">{localError}</ErrorText>}
    </>
  );
};
