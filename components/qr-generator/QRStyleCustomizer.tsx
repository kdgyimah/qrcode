'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QRCodeStyle } from '@/types/qr-generator';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface QRStyleCustomizerProps {
  style: QRCodeStyle;
  onStyleChange: (field: keyof QRCodeStyle, value: unknown) => void;
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

export function QRStyleCustomizer({ style, onStyleChange }: QRStyleCustomizerProps) {
  const [isShapeOpen, setIsShapeOpen] = useState(true);
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  // Handle logo preview memory cleanup
  useEffect(() => {
    if (style.logo instanceof File) {
      const url = URL.createObjectURL(style.logo);
      setLogoPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLogoPreviewUrl(null);
    }
  }, [style.logo]);

  return (
    <div className="space-y-4">
      {/* Shapes & Colors */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => setIsShapeOpen(!isShapeOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-left font-medium"
        >
          <span>Shapes & Color</span>
          {isShapeOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isShapeOpen && (
          <div className="px-4 pb-4 space-y-4">
            <div>
              <Label className="text-sm text-gray-600">Shapes</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {QR_SHAPES.map((shape) => (
                  <button
                    key={shape.value}
                    type="button"
                    className={cn(
                      'p-2 border rounded-lg text-center transition-all',
                      style.shape === shape.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                    onClick={() => onStyleChange('shape', shape.value)}
                  >
                    <div className="text-lg mb-1">{shape.preview}</div>
                    <div className="text-xs">{shape.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  className={cn(
                    'p-2 border rounded-lg text-center transition-all',
                    style.backgroundColor === preset.bg && style.foregroundColor === preset.fg
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                  onClick={() => {
                    onStyleChange('backgroundColor', preset.bg);
                    onStyleChange('foregroundColor', preset.fg);
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bg-color" className="text-sm text-gray-600">Background Color</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    id="bg-color"
                    value={style.backgroundColor}
                    onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
                    className="w-8 h-8 rounded border cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">{style.backgroundColor}</span>
                </div>
              </div>
              <div>
                <Label htmlFor="fg-color" className="text-sm text-gray-600">Foreground Color</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    id="fg-color"
                    value={style.foregroundColor}
                    onChange={(e) => onStyleChange('foregroundColor', e.target.value)}
                    className="w-8 h-8 rounded border cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">{style.foregroundColor}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logo Upload */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => setIsLogoOpen(!isLogoOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-left font-medium"
        >
          <span>Logo</span>
          {isLogoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isLogoOpen && (
          <div className="px-4 pb-4 space-y-4">
            <div>
              <Label className="text-sm text-gray-600">Upload Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  onStyleChange('logo', file);
                }}
              />
              {logoPreviewUrl && (
                <div className="mt-2 flex items-center gap-3">
                  <Image
                    src={logoPreviewUrl}
                    alt="Logo Preview"
                    className="w-12 h-12 object-contain border rounded"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onStyleChange('logo', null)}
                    className="text-red-500"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm text-gray-600">Logo Size</Label>
              <Input
                type="range"
                min={10}
                max={50}
                value={style.logoSize}
                onChange={(e) => onStyleChange('logoSize', Number(e.target.value))}
              />
              <p className="text-xs text-gray-500">Size: {style.logoSize}px</p>
            </div>
          </div>
        )}
      </div>

      {/* Folder Section (Optional) */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => setIsFolderOpen(!isFolderOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-left font-medium"
        >
          <span>Folder</span>
          {isFolderOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isFolderOpen && (
          <div className="px-4 pb-4">
            <Label className="text-sm text-gray-600">Folder</Label>
            <select className="w-full p-2 border rounded mt-2">
              <option value="">Select folder</option>
              {/* Dynamic options go here */}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
