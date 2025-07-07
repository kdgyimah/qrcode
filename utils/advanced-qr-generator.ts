import QRCode from 'qrcode';
import { QRCodeStyle } from '@/types/qr-generator';

export async function generateAdvancedQRCode(
  content: string,
  style: QRCodeStyle,
  size: number = 256
): Promise<string> {
  if (!content.trim()) {
    return '';
  }

  try {
    // Generate base QR code
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    canvas.width = size;
    canvas.height = size;

    // Generate QR code on canvas
    await QRCode.toCanvas(canvas, content, {
      width: size,
      margin: 2,
      color: {
        dark: style.foregroundColor,
        light: style.backgroundColor,
      },
      errorCorrectionLevel: 'M',
    });

    // Apply shape styling
    if (style.shape === 'circle') {
      // Create circular mask
      const imageData = ctx.getImageData(0, 0, size, size);
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2;

      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          if (distance > radius) {
            const index = (y * size + x) * 4;
            imageData.data[index + 3] = 0; // Make transparent
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    } else if (style.shape === 'rounded') {
      // Apply rounded corners (simplified version)
      const cornerRadius = size * 0.1;
      ctx.globalCompositeOperation = 'destination-in';
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, cornerRadius);
      ctx.fill();
    }

    // Add logo if provided
    if (style.logo) {
      const logoSize = (size * (style.logoSize || 20)) / 100;
      const logoX = (size - logoSize) / 2;
      const logoY = (size - logoSize) / 2;

      const logoImg = new Image();
      logoImg.src = URL.createObjectURL(style.logo);
      
      await new Promise((resolve) => {
        logoImg.onload = () => {
          // Draw white background for logo
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
          
          // Draw logo
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
          resolve(void 0);
        };
      });
    }

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating advanced QR code:', error);
    throw error;
  }
}