import QRCode from 'qrcode';
import { QRCategory, QRFormData, QRCodeStyle } from '@/types/qr-generator';

/**
 * Generates the content string based on QR category and user input
 */
export function generateQRContent(category: QRCategory, formData: QRFormData): string {
  switch (category.id) {
    case 'website':
      return formData.url || '';

    case 'call':
      return `tel:${formData.phone || ''}`;

    case 'mail':
      const subject = formData.subject ? `?subject=${encodeURIComponent(formData.subject)}` : '';
      const body = formData.body ? `${subject ? '&' : '?'}body=${encodeURIComponent(formData.body)}` : '';
      return `mailto:${formData.email || ''}${subject}${body}`;

    case 'sms':
      const message = formData.message ? `?body=${encodeURIComponent(formData.message)}` : '';
      return `sms:${formData.phone || ''}${message}`;

    case 'wifi':
      return `WIFI:T:${formData.security || 'WPA'};S:${formData.ssid || ''};P:${formData.password || ''};H:false;;`;

    case 'text':
      return formData.text || '';

    default:
      return formData.content || '';
  }
}

/**
 * Generates a QR Code as a base64 image (with optional logo)
 */
export async function generateQRCode(
  content: string,
  style: QRCodeStyle,
  size: number = 256
): Promise<string> {
  if (!content.trim()) return '';

  try {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    await QRCode.toCanvas(canvas, content, {
      width: size,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: style.foregroundColor,
        light: style.backgroundColor,
      },
    });

    // Add logo if provided
    if (style.logo) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const logo = new Image();
        const logoUrl =
          typeof style.logo === 'string'
            ? style.logo
            : URL.createObjectURL(style.logo);

        const logoSize = ((style.logoSize ?? 20) / 100) * size;
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;

        await new Promise((resolve, reject) => {
          logo.onload = () => {
            ctx.drawImage(logo, x, y, logoSize, logoSize);
            if (typeof style.logo !== 'string') {
              URL.revokeObjectURL(logoUrl);
            }
            resolve(true);
          };
          logo.onerror = reject;
          logo.src = logoUrl;
        });
      }
    }

    return canvas.toDataURL();
  } catch (error) {
    console.error('Error generating QR code with logo:', error);
    return '';
  }
}