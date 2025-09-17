import React from "react";
import { MailFormData, FormProps } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";

export const MailForm: React.FC<FormProps<MailFormData>> = ({
  formData,
  errors,
  onChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange(name as keyof MailFormData, value);
  };

  return (
    <>
      <div>
        <Label htmlFor="email">Recipient Email</Label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email || ""}
          placeholder="recipient@example.com"
          onChange={handleChange}
          className={`${inputBase} ${
            errors.email ? "border-gray-300 bg-white" : ""
          }`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
        />
        {errors.email && (
          <ErrorText id="message-error">{errors.email}</ErrorText>
        )}
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject || ""}
          placeholder="Email subject"
          onChange={handleChange}
          className={`${inputBase} ${
            errors.subject ? "border-gray-300 bg-white" : ""
          }`}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <ErrorText id="message-error">{errors.subject}</ErrorText>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          value={formData.message || ""}
          placeholder="Email content"
          onChange={handleChange}
          rows={4}
          className={`${inputBase} resize-none ${
            errors.message ? "border-gray-300 bg-white" : ""
          }`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <ErrorText id="message-error">{errors.message}</ErrorText>
        )}
      </div>
    </>
  );
};
