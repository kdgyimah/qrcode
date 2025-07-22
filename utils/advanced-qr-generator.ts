import QRCode from "qrcode";
import { QRCodeStyle } from "@/types/qr-generator";

/**
 * Generates a styled QR code as a base64 PNG string.
 * @param content - The text content to encode in the QR code.
 * @param style - Customization settings for color, shape, and logo.
 * @param size - Output image size in pixels.
 * @returns Data URL of the generated QR code image.
 */
export async function generateAdvancedQRCode(
  content: string,
  style: QRCodeStyle,
  size: number = 256
): Promise<string> {
  if (!content.trim()) return "";

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  canvas.width = size;
  canvas.height = size;

  try {
    // Step 1: Generate base QR
    await QRCode.toCanvas(canvas, content, {
      width: size,
      margin: 2,
      errorCorrectionLevel: "M",
      color: {
        dark: style.foregroundColor,
        light: style.backgroundColor,
      },
    });

    // Step 2: Apply shape styling
    if (style.shape === "circle") {
      const imageData = ctx.getImageData(0, 0, size, size);
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2;

      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          const dx = x - centerX;
          const dy = y - centerY;
          if (Math.sqrt(dx * dx + dy * dy) > radius) {
            const index = (y * size + x) * 4;
            imageData.data[index + 3] = 0; // transparent alpha
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    } else if (style.shape === "rounded") {
      const radius = size * 0.1;
      ctx.globalCompositeOperation = "destination-in";
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, radius);
      ctx.fill();
    }

    // Step 3: Overlay logo (optional)
    if (style.logo) {
      const logoSize = (style.logoSize ?? 20) * 0.01 * size;
      const logoX = (size - logoSize) / 2;
      const logoY = (size - logoSize) / 2;

      const logoImg = new Image();

      let objectUrl: string | null = null;
      if (style.logo instanceof File) {
        objectUrl = URL.createObjectURL(style.logo);
        logoImg.src = objectUrl;
      } else if (typeof style.logo === "string") {
        logoImg.src = style.logo;
      }

      await new Promise<void>((resolve, reject) => {
        logoImg.onload = () => {
          // Optional: add white background behind logo
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          resolve();
        };
        logoImg.onerror = reject;
      });
    }

    return canvas.toDataURL("image/png");
  } catch (err) {
    console.error("Error generating QR code:", err);
    throw err;
  }
}
