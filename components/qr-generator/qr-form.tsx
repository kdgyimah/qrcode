'use client';

import { useState } from 'react';
import { QRCategory, QRFormData, QRCodeStyle } from '@/types/qr-generator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QRFormProps {
  category: QRCategory;
  onBack: () => void;
  onGenerate: (data: QRFormData, style: QRCodeStyle) => void;
}

const QR_SHAPES = [
  { value: 'square', label: 'Square', preview: '⬜' },
  { value: 'circle', label: 'Circle', preview: '⭕' },
  { value: 'rounded', label: 'Rounded', preview: '⬛' },
] as const;

const COLOR_PRESETS = [
  { name: 'Classic', bg: '#FFFFFF', fg: '#000000' },
  { name: 'Blue', bg: '#EBF8FF', fg: '#2563EB' },
  { name: 'Green', bg: '#F0FDF4', fg: '#16A34A' },
  { name: 'Purple', bg: '#FAF5FF', fg: '#9333EA' },
  { name: 'Red', bg: '#FEF2F2', fg: '#DC2626' },
  { name: 'Orange', bg: '#FFF7ED', fg: '#EA580C' },
];

export function QRForm({ category, onBack, onGenerate }: QRFormProps) {
  const [formData, setFormData] = useState<QRFormData>({});
  const [style, setStyle] = useState<QRCodeStyle>({
    shape: 'square',
    backgroundColor: '#FFFFFF',
    foregroundColor: '#000000',
    logo: null,
    logoSize: 20,
  });

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStyleChange = (field: keyof QRCodeStyle, value: unknown) => {
    setStyle(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData, style);
  };

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
                onChange={(e) => handleInputChange('url', e.target.value)}
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
                onChange={(e) => handleInputChange('phone', e.target.value)}
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
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={formData.subject as string || ''}
                onChange={(e) => handleInputChange('subject', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="body">Message</Label>
              <Textarea
                id="body"
                placeholder="Email message"
                value={formData.body as string || ''}
                onChange={(e) => handleInputChange('body', e.target.value)}
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
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="SMS message"
                value={formData.message as string || ''}
                onChange={(e) => handleInputChange('message', e.target.value)}
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
                onChange={(e) => handleInputChange('ssid', e.target.value)}
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
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="security">Security Type</Label>
              <Select 
                value={formData.security as string || 'WPA'}
                onValueChange={(value) => handleInputChange('security', value)}
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
                onChange={(e) => handleInputChange('text', e.target.value)}
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
                onChange={(e) => handleInputChange('content', e.target.value)}
                required
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create your QR Code</h1>
          <p className="text-muted-foreground">Create all QR Codes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white", category.color)}>
                  <span className="text-sm font-bold">{category.name[0]}</span>
                </div>
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderFormFields()}
                
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-4">Customize Design</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Shape & Color</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {QR_SHAPES.map((shape) => (
                          <button
                            key={shape.value}
                            type="button"
                            className={cn(
                              "p-3 border rounded-lg text-center transition-all",
                              style.shape === shape.value
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            )}
                            onClick={() => handleStyleChange('shape', shape.value)}
                          >
                            <div className="text-lg mb-1">{shape.preview}</div>
                            <div className="text-xs">{shape.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Color Presets</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {COLOR_PRESETS.map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            className={cn(
                              "p-2 border rounded-lg text-center transition-all",
                              style.backgroundColor === preset.bg && style.foregroundColor === preset.fg
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            )}
                            onClick={() => {
                              handleStyleChange('backgroundColor', preset.bg);
                              handleStyleChange('foregroundColor', preset.fg);
                            }}
                          >
                            <div 
                              className="w-full h-6 rounded mb-1"
                              style={{ backgroundColor: preset.bg, border: `2px solid ${preset.fg}` }}
                            />
                            <div className="text-xs">{preset.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bg-color">Background</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="color"
                            id="bg-color"
                            value={style.backgroundColor}
                            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                            className="w-10 h-10 rounded border"
                          />
                          <Input
                            value={style.backgroundColor}
                            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="fg-color">Foreground</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="color"
                            id="fg-color"
                            value={style.foregroundColor}
                            onChange={(e) => handleStyleChange('foregroundColor', e.target.value)}
                            className="w-10 h-10 rounded border"
                          />
                          <Input
                            value={style.foregroundColor}
                            onChange={(e) => handleStyleChange('foregroundColor', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Generate QR Code
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-8">
              <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-4xl mb-2">📱</div>
                  <p>QR Code Preview</p>
                  <p className="text-sm">Will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}