"use client";

import React, { useCallback, useMemo } from "react";
import { Calendar, Clock, MapPin, FileText } from "lucide-react";
import type { FormProps, EventFormData } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase} from "@/constants/styles";
import { cn } from "@/lib/utils";

export const EventForm: React.FC<FormProps<EventFormData>> = ({
  formData,
  onChange,
  errors,
}) => {
  // Memoized validation state (safe against undefined)
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
      <FormHeader />

      <div className="space-y-4">
        <EventTitleInput
          title={formData?.eventTitle ?? ""}
          error={errors?.eventTitle}
          onChange={handleChange("eventTitle")}
        />

        <DateTimeSection
          startDate={formData?.eventStart ?? ""}
          endDate={formData?.eventEnd ?? ""}
          startError={errors?.eventStart}
          endError={errors?.eventEnd}
          onStartChange={handleChange("eventStart")}
          onEndChange={handleChange("eventEnd")}
        />

        <LocationInput
          location={formData?.eventLocation ?? ""}
          error={errors?.eventLocation}
          onChange={handleChange("eventLocation")}
        />

        <DescriptionInput
          description={formData?.eventDesc ?? ""}
          error={errors?.eventDesc}
          onChange={handleChange("eventDesc")}
        />
      </div>

      {isValid && (
        <EventPreview formData={formData} formatDate={formatDateForDisplay} />
      )}

      <EventTips />
    </div>
  );
};

/* ---------- Subcomponents ---------- */

function FormHeader() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-orange-100 rounded-lg">
        <Calendar className="w-5 h-5 text-orange-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">Event QR Code</h3>
        <p className="text-sm text-gray-600">
          Create calendar event invitations
        </p>
      </div>
    </div>
  );
}

function EventTitleInput({
  title,
  error,
  onChange,
}: {
  title: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <Label htmlFor="eventTitle">Event Title *</Label>
      <input
        type="text"
        id="eventTitle"
        value={title}
        onChange={onChange}
        placeholder="Annual Conference 2024"
        className={cn(inputBase, error && "border-red-500 bg-red-50")}
        aria-invalid={!!error}
        aria-describedby={error ? "eventTitle-error" : undefined}
        required
      />
      {error && <ErrorText>{error}</ErrorText>}
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
}: {
  startDate: string;
  endDate: string;
  startError?: string;
  endError?: string;
  onStartChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
          className={cn(inputBase, startError && "border-red-500 bg-red-50")}
          aria-invalid={!!startError}
          aria-describedby={startError ? "eventStart-error" : undefined}
          required
        />
        {startError && <ErrorText>{startError}</ErrorText>}
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
          className={cn(inputBase, endError && "border-red-500 bg-red-50")}
          aria-invalid={!!endError}
          aria-describedby={endError ? "eventEnd-error" : undefined}
        />
        {endError && <ErrorText>{endError}</ErrorText>}
      </div>
    </div>
  );
}

function LocationInput({
  location,
  error,
  onChange,
}: {
  location: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        placeholder="123 Main St, City, State or Virtual Meeting"
        className={cn(inputBase, error && "border-red-500 bg-red-50")}
        aria-invalid={!!error}
        aria-describedby={error ? "eventLocation-error" : undefined}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function DescriptionInput({
  description,
  error,
  onChange,
}: {
  description: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
        placeholder="Event details, agenda, special instructions..."
        rows={4}
        className={cn(inputBase, error && "border-red-500 bg-red-50")}
        aria-invalid={!!error}
        aria-describedby={error ? "eventDesc-error" : undefined}
      />
      {error && <ErrorText>{error}</ErrorText>}
      <p className="mt-1 text-xs text-gray-500">
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

function EventTips() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="text-sm font-medium text-blue-900 mb-2">
        Calendar Event Tips
      </h4>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>• QR code will generate a calendar event (.ics file)</li>
        <li>• Works with most calendar apps (Google, Outlook, Apple)</li>
        <li>• Include timezone-specific times for accuracy</li>
        <li>• Virtual events: add meeting links in description</li>
        <li>• Physical events: include full address for GPS</li>
      </ul>
    </div>
  );
}
