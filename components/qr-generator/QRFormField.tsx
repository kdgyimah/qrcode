// components/qr-generator/QRFormField.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QRCategory, QRFormData } from '@/types/qr-generator';

interface QRFormFieldProps {
  category: QRCategory;
  formData: QRFormData;
  onInputChange: (field: string, value: string | boolean | File | null) => void;
}

export function QRFormField({ category, formData, onInputChange }: QRFormFieldProps) {
  const renderFormFields = () => {
    switch (category.id) {
      case 'website':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={formData.url as string || ''}
                onChange={(e) => onInputChange('url', e.target.value)}
                required
              />
            </div>
          </div>
        );
      
      case 'call':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone as string || ''}
                onChange={(e) => onInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>
        );

      case 'mail':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@example.com"
                value={formData.email as string || ''}
                onChange={(e) => onInputChange('email', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={formData.subject as string || ''}
                onChange={(e) => onInputChange('subject', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="body">Message</Label>
              <Textarea
                id="body"
                placeholder="Email message"
                value={formData.body as string || ''}
                onChange={(e) => onInputChange('body', e.target.value)}
                rows={4}
              />
            </div>
          </div>
        );

      case 'sms':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone as string || ''}
                onChange={(e) => onInputChange('phone', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="SMS message"
                value={formData.message as string || ''}
                onChange={(e) => onInputChange('message', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ssid">WiFi Network Name (SSID)</Label>
              <Input
                id="ssid"
                placeholder="My WiFi Network"
                value={formData.ssid as string || ''}
                onChange={(e) => onInputChange('ssid', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="WiFi password"
                value={formData.password as string || ''}
                onChange={(e) => onInputChange('password', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="security">Security Type</Label>
              <Select 
                value={formData.security as string || 'WPA'}
                onValueChange={(value) => onInputChange('security', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select security type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text Content</Label>
              <Textarea
                id="text"
                placeholder="Enter your text here"
                value={formData.text as string || ''}
                onChange={(e) => onInputChange('text', e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                placeholder={`Enter ${category.name.toLowerCase()} details`}
                value={formData.content as string || ''}
                onChange={(e) => onInputChange('content', e.target.value)}
                required
              />
            </div>
          </div>
        );
    }
  };

  return <div>{renderFormFields()}</div>;
}