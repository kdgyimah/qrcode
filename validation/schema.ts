import { z } from "zod";
import { Category } from "@/types/qr-generator";

export const baseSchemas: Record<Category, z.ZodTypeAny> = {
  link: z.object({ url: z.string().url({ message: "Invalid URL" }) }),
  call: z.object({ phone: z.string().min(1, "Phone is required") }),
  mail: z.object({
    email: z.string().email("Invalid email"),
    subject: z.string().min(1, "Subject required"),
    message: z.string().min(1, "Message required"),
  }),
  sms: z.object({
    smsPhone: z.string().min(1, "Phone required"),
    smsBody: z.string().min(1, "Message required"),
  }),
  whatsapp: z.object({
    waPhone: z.string().min(1, "WhatsApp number required"),
    waBody: z.string().min(1, "Message required"),
  }),
  wifi: z.object({
    ssid: z.string().min(1, "SSID required"),
    password: z.string().min(1, "Password required"),
    encryption: z.union([
      z.literal("WPA"),
      z.literal("WEP"),
      z.literal("None"),
      z.string(),
    ]),
  }),
  image: z.object({ imageUrl: z.string().url("Invalid image URL") }),
  video: z.object({ videoUrl: z.string().url("Invalid video URL") }),
  bulkqr: z.object({ bulkList: z.string().min(1, "Bulk list cannot be empty") }),
  app: z.object({ appUrl: z.string().url("Invalid app URL") }),
  social: z.object({ socialUrl: z.string().url("Invalid social URL") }),
  event: z.object({
    eventTitle: z.string().min(1, "Title required"),
    eventStart: z.string().min(1, "Start datetime required"),
    eventLocation: z.string().min(1, "Location required"),
    eventEnd: z.string().optional(),
    eventDesc: z.string().optional(),
  }),
  barcode2d: z.object({ barcodeValue: z.string().min(1, "Value is required") }),
  contact: z.object({
    name: z.string().min(1, "Name required"),
    phone: z.string().min(1, "Phone required"),
    email: z.string().optional(),
  }),
  pdf: z.object({ pdfUrl: z.string().url("Invalid PDF URL") }),
};

export const getSchemaFor = (category: Category) => baseSchemas[category];

export const extractErrors = (
  result: ReturnType<z.ZodTypeAny["safeParse"]>
): Record<string, string> => {
  if (result.success) return {};
  const errs: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const path = issue.path[0];
    if (typeof path === "string") {
      errs[path] = issue.message;
    }
  }
  return errs;
};
