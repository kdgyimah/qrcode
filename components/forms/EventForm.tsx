"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Calendar, Clock, MapPin, FileText } from "lucide-react";
import type { FormProps, EventFormData } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";
import { cn } from "@/lib/utils";

export const EventForm: React.FC<FormProps<EventFormData>> = ({
  formData,
  onChange,
  errors,
}) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const markTouched = (field: keyof EventFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validation state
  const isValid = useMemo(() => {
    const title = formData?.eventTitle?.trim?.() ?? "";
    const start = formData?.eventStart?.trim?.() ?? "";
    return Boolean(title && start);
  }, [formData?.eventTitle, formData?.eventStart]);

  // Change handler factory
  const handleChange = useCallback(
    (field: keyof EventFormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(field, e.target.value),
    [onChange]
  );

  // Format date for preview
  const formatDateForDisplay = useCallback((dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return (
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    } catch {
      return dateString;
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <EventTitleInput
          title={formData?.eventTitle ?? ""}
          error={touched.eventTitle ? errors?.eventTitle : undefined}
          onChange={handleChange("eventTitle")}
          onBlur={() => markTouched("eventTitle")}
        />

        <DateTimeSection
          startDate={formData?.eventStart ?? ""}
          endDate={formData?.eventEnd ?? ""}
          startError={touched.eventStart ? errors?.eventStart : undefined}
          endError={touched.eventEnd ? errors?.eventEnd : undefined}
          onStartChange={handleChange("eventStart")}
          onEndChange={handleChange("eventEnd")}
          onStartBlur={() => markTouched("eventStart")}
          onEndBlur={() => markTouched("eventEnd")}
        />

        <LocationInput
          location={formData?.eventLocation ?? ""}
          error={touched.eventLocation ? errors?.eventLocation : undefined}
          onChange={handleChange("eventLocation")}
          onBlur={() => markTouched("eventLocation")}
        />

        <DescriptionInput
          description={formData?.eventDesc ?? ""}
          error={touched.eventDesc ? errors?.eventDesc : undefined}
          onChange={handleChange("eventDesc")}
          onBlur={() => markTouched("eventDesc")}
        />
      </div>

      {isValid && (
        <EventPreview formData={formData} formatDate={formatDateForDisplay} />
      )}
    </div>
  );
};

/* ---------- Subcomponents ---------- */

function EventTitleInput({
  title,
  error,
  onChange,
  onBlur,
}: {
  title: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <Label htmlFor="eventTitle">Event Title *</Label>
      <input
        type="text"
        id="eventTitle"
        value={title}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Annual Conference 2024"
        className={cn(inputBase, error && "border-red-500")}
        aria-invalid={!!error}
        aria-describedby={error ? "eventTitle-error" : undefined}
        required
      />
      {error && <ErrorText id="eventTitle-error">{error}</ErrorText>}
    </div>
  );
}

function DateTimeSection({
  startDate,
  endDate,
  startError,
  endError,
  onStartChange,
  onEndChange,
  onStartBlur,
  onEndBlur,
}: {
  startDate: string;
  endDate: string;
  startError?: string;
  endError?: string;
  onStartChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartBlur: () => void;
  onEndBlur: () => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="eventStart" className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Start Date & Time *
        </Label>
        <input
          type="datetime-local"
          id="eventStart"
          value={startDate}
          onChange={onStartChange}
          onBlur={onStartBlur}
          className={cn(inputBase, startError && "border-red-500")}
          aria-invalid={!!startError}
          aria-describedby={startError ? "eventStart-error" : undefined}
          required
        />
        {startError && <ErrorText id="eventStart-error">{startError}</ErrorText>}
      </div>

      <div>
        <Label htmlFor="eventEnd" className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          End Date & Time (Optional)
        </Label>
        <input
          type="datetime-local"
          id="eventEnd"
          value={endDate}
          onChange={onEndChange}
          onBlur={onEndBlur}
          className={cn(inputBase, endError && "border-red-500")}
          aria-invalid={!!endError}
          aria-describedby={endError ? "eventEnd-error" : undefined}
        />
        {endError && <ErrorText id="eventEnd-error">{endError}</ErrorText>}
      </div>
    </div>
  );
}

function LocationInput({
  location,
  error,
  onChange,
  onBlur,
}: {
  location: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <Label htmlFor="eventLocation" className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Location (Optional)
      </Label>
      <input
        type="text"
        id="eventLocation"
        value={location}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="123 Main St, City, State or Virtual Meeting"
        className={cn(inputBase, error && "border-red-500")}
        aria-invalid={!!error}
        aria-describedby={error ? "eventLocation-error" : undefined}
      />
      {error && <ErrorText id="eventLocation-error">{error}</ErrorText>}
    </div>
  );
}

function DescriptionInput({
  description,
  error,
  onChange,
  onBlur,
}: {
  description: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <Label htmlFor="eventDesc" className="flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Description (Optional)
      </Label>
      <textarea
        id="eventDesc"
        value={description}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Event details, agenda, special instructions..."
        rows={4}
        className={cn(inputBase, error && "border-red-500")}
        aria-invalid={!!error}
        aria-describedby={error ? "eventDesc-error" : undefined}
      />
      {error && <ErrorText id="eventDesc-error">{error}</ErrorText>}
      <p className="mt-1 text-xs text-gray-500 ">
        {description.length}/500 characters
      </p>
    </div>
  );
}

function EventPreview({
  formData,
  formatDate,
}: {
  formData: EventFormData;
  formatDate: (dateString: string) => string;
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <Label className="mb-3">Event Preview</Label>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">
              {formData?.eventTitle ?? ""}
            </p>
            <p className="text-sm text-gray-600">
              {formatDate(formData?.eventStart)}
              {formData?.eventEnd && (
                <span> - {formatDate(formData?.eventEnd)}</span>
              )}
            </p>
          </div>
        </div>

        {formData?.eventLocation && (
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
            <p className="text-sm text-gray-600">
              {formData.eventLocation}
            </p>
          </div>
        )}

        {formData?.eventDesc && (
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
            <p className="text-sm text-gray-600">{formData.eventDesc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
