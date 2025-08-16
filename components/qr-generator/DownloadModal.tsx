'use client';

import { useState } from 'react';
import { AnyQRFormData, QRCodeStyle } from '@/types/qr-generator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Share2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AnyQRFormData;
  style: QRCodeStyle;
  categoryName: string;
}

export function DownloadModal({ isOpen, onClose, data, style, categoryName }: DownloadModalProps) {
  const [qrName, setQrName] = useState(`${categoryName}_QR`);
  const [format, setFormat] = useState('PNG');
  const [size, setSize] = useState('1200px');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      // Here you would implement actual QR code generation and download
      console.log('Downloading QR code:', { qrName, format, size, data, style });
    }, 1500);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing QR code');
  };


  const handleTrack = () => {
    // Implement tracking functionality
    console.log('Track QR code scans');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Name your QR code and share
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="qr-name">QR Code Name</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="qr-name"
                  value={qrName}
                  onChange={(e) => setQrName(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  ✏️
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {Object.values(data)[0] as string}
              </p>
              <Button variant="link" size="sm" className="p-0 h-auto text-muted-foreground">
                👁️ Show QR Code
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="format">Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PNG">PNG</SelectItem>
                    <SelectItem value="JPG">JPG</SelectItem>
                    <SelectItem value="SVG">SVG</SelectItem>
                    <SelectItem value="PDF">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="size">Size</Label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="400px">400px</SelectItem>
                    <SelectItem value="800px">800px</SelectItem>
                    <SelectItem value="1200px">1200px</SelectItem>
                    <SelectItem value="2400px">2400px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleDownload} 
                className="flex-1"
                disabled={isDownloading}
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Downloading...' : 'Download'}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>📊 Track your code and see the scans on it!</span>
                <Button variant="link" size="sm" onClick={handleTrack}>
                  Track Scan
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Card className="w-full max-w-xs">
              <CardContent className="p-6">
                <div className="aspect-square bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                  <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📱</div>
                      <p className="text-sm text-muted-foreground">Generated QR Code</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}