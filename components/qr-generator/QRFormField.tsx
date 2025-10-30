'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QRCategory, AnyQRFormData } from '@/types/qr-generator';


interface QRFormFieldProps {
  category: QRCategory;
  formData: AnyQRFormData;
  folders: { id: string; name: string }[]; 
  onInputChange: (field: string, value: string | boolean | File | null) => void;
}



// --- Helper components ---
const TextInput = ({
  id,
  label,
  value,
  placeholder,
  type = 'text',
  required = false,
  onChange,
}: {
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (val: string) => void;
}) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value || ''}
      required={required}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const TextAreaInput = ({
  id,
  label,
  value,
  placeholder,
  rows = 3,
  required = false,
  onChange,
}: {
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  onChange: (val: string) => void;
}) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Textarea
      id={id}
      placeholder={placeholder}
      value={value || ''}
      rows={rows}
      required={required}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const SelectInput = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value?: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}) => (
  <div>
    <Label>{label}</Label>
    <Select value={value || options[0]?.value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// --- Helper to safely get field value ---
function getFieldValue(formData: AnyQRFormData, field: string): string {
  const value = (formData as Record<string, unknown>)[field];
  return typeof value === "string" ? value : "";
}

export function QRFormField({
  category,
  formData,
  onInputChange,

}: QRFormFieldProps) {
  const { id } = category;

  switch (id) {
    case 'link':
      return (
        <TextInput
          id="url"
          label="Website URL"
          placeholder="https://example.com"
          value={getFieldValue(formData, 'url')}
          required
          onChange={(val) => onInputChange('url', val)}
        />
      );

    case 'call':
      return (
        <TextInput
          id="phone"
          label="Phone Number"
          placeholder="+1 (555) 123-4567"
          value={getFieldValue(formData, 'phone')}
          required
          onChange={(val) => onInputChange('phone', val)}
        />
      );

    case 'mail':
      return (
        <>
          <TextInput
            id="email"
            label="Email Address"
            placeholder="contact@example.com"
            value={getFieldValue(formData, 'email')}
            required
            onChange={(val) => onInputChange('email', val)}
          />
          <TextInput
            id="subject"
            label="Subject"
            placeholder="Email subject"
            value={getFieldValue(formData, 'subject')}
            onChange={(val) => onInputChange('subject', val)}
          />
          <TextAreaInput
            id="body"
            label="Message"
            placeholder="Email message"
            rows={4}
            value={getFieldValue(formData, 'message') || getFieldValue(formData, 'body')}
            onChange={(val) => onInputChange('message', val)}
          />
        </>
      );

    case 'sms':
      return (
        <>
          <TextInput
            id="phone"
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            value={getFieldValue(formData, 'phone')}
            required
            onChange={(val) => onInputChange('phone', val)}
          />
          <TextAreaInput
            id="message"
            label="Message"
            placeholder="SMS message"
            rows={3}
            value={getFieldValue(formData, 'message')}
            onChange={(val) => onInputChange('message', val)}
          />
        </>
      );

    case 'whatsapp':
      return (
        <>
          <TextInput
            id="waPhone"
            label="WhatsApp Phone Number"
            placeholder="+1 (555) 123-4567"
            value={getFieldValue(formData, 'waPhone')}
            required
            onChange={(val) => onInputChange('waPhone', val)}
          />
          <TextAreaInput
            id="waBody"
            label="Message"
            placeholder="WhatsApp message"
            value={getFieldValue(formData, 'waBody')}
            onChange={(val) => onInputChange('waBody', val)}
          />
        </>
      );

    case 'wifi':
      return (
        <>
          <TextInput
            id="ssid"
            label="WiFi Network Name (SSID)"
            placeholder="My WiFi Network"
            value={getFieldValue(formData, 'ssid')}
            required
            onChange={(val) => onInputChange('ssid', val)}
          />
          <TextInput
            id="password"
            type="password"
            label="Password"
            placeholder="WiFi password"
            value={getFieldValue(formData, 'password')}
            onChange={(val) => onInputChange('password', val)}
          />
          <SelectInput
            label="Security Type"
            value={getFieldValue(formData, 'encryption') || 'WPA'}
            options={[
              { label: 'WPA/WPA2', value: 'WPA' },
              { label: 'WEP', value: 'WEP' },
              { label: 'No Password', value: 'None' },
            ]}
            onChange={(val) => onInputChange('encryption', val)}
          />
        </>
      );

    case 'image':
      return (
        <TextInput
          id="imageUrl"
          label="Image URL"
          placeholder="https://example.com/image.jpg"
          value={getFieldValue(formData, 'imageUrl')}
          onChange={(val) => onInputChange('imageUrl', val)}
        />
      );

    case 'video':
      return (
        <TextInput
          id="videoUrl"
          label="Video URL"
          placeholder="https://example.com/video.mp4"
          value={getFieldValue(formData, 'videoUrl')}
          onChange={(val) => onInputChange('videoUrl', val)}
        />
      );

    case 'bulkqr':
      return (
        <TextAreaInput
          id="bulkList"
          label="Bulk QR List"
          placeholder="Enter one entry per line"
          rows={6}
          value={getFieldValue(formData, 'bulkList')}
          onChange={(val) => onInputChange('bulkList', val)}
        />
      );

    case 'app':
      return (
        <TextInput
          id="appUrl"
          label="App URL"
          placeholder="https://example.com/app"
          value={getFieldValue(formData, 'appUrl')}
          onChange={(val) => onInputChange('appUrl', val)}
        />
      );

    case 'social':
      return (
        <TextInput
          id="socialUrl"
          label="Social Media URL"
          placeholder="https://twitter.com/username"
          value={getFieldValue(formData, 'socialUrl')}
          onChange={(val) => onInputChange('socialUrl', val)}
        />
      );

    case 'event':
      return (
        <>
          <TextInput
            id="eventTitle"
            label="Event Title"
            value={getFieldValue(formData, 'eventTitle')}
            onChange={(val) => onInputChange('eventTitle', val)}
          />
          <TextInput
            id="eventStart"
            label="Start Date/Time"
            value={getFieldValue(formData, 'eventStart')}
            onChange={(val) => onInputChange('eventStart', val)}
          />
          <TextInput
            id="eventEnd"
            label="End Date/Time"
            value={getFieldValue(formData, 'eventEnd')}
            onChange={(val) => onInputChange('eventEnd', val)}
          />
          <TextInput
            id="eventLocation"
            label="Location"
            value={getFieldValue(formData, 'eventLocation')}
            onChange={(val) => onInputChange('eventLocation', val)}
          />
          <TextAreaInput
            id="eventDesc"
            label="Description"
            value={getFieldValue(formData, 'eventDesc')}
            onChange={(val) => onInputChange('eventDesc', val)}
          />
        </>
      );

    case 'barcode2d':
      return (
        <TextInput
          id="barcodeValue"
          label="Barcode Value"
          value={getFieldValue(formData, 'barcodeValue')}
          onChange={(val) => onInputChange('barcodeValue', val)}
        />
      );

    case 'contact':
      return (
        <>
          <TextInput
            id="firstName"
            label="First Name"
            value={getFieldValue(formData, 'firstName')}
            onChange={(val) => onInputChange('firstName', val)}
          />
          <TextInput
            id="lastName"
            label="Last Name"
            value={getFieldValue(formData, 'lastName')}
            onChange={(val) => onInputChange('lastName', val)}
          />
          <TextInput
            id="phone"
            label="Phone"
            value={getFieldValue(formData, 'phone')}
            onChange={(val) => onInputChange('phone', val)}
          />
          <TextInput
            id="email"
            label="Email"
            value={getFieldValue(formData, 'email')}
            onChange={(val) => onInputChange('email', val)}
          />
        </>
      );

    case 'pdf':
      return (
        <TextInput
          id="pdfUrl"
          label="PDF URL"
          placeholder="https://example.com/file.pdf"
          value={getFieldValue(formData, 'pdfUrl')}
          onChange={(val) => onInputChange('pdfUrl', val)}
        />
      );

    default:
      return (
        <TextInput
          id="content"
          label="Content"
          placeholder={`Enter ${category.name.toLowerCase()} details`}
          value={getFieldValue(formData, 'content')}
          required
          onChange={(val) => onInputChange('content', val)}
        />
      );
  }
}
