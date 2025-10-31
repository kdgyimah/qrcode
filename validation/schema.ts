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
    phone: z.string().min(1, "Phone required"),
    message: z.string().min(1, "Message required"),
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
  bulkqr: z.object({
    bulkList: z.string().min(1, "Bulk list cannot be empty"),
  }),
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

  // ✅ Updated Contact Schema
  contact: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    organization: z.string().optional(),
    jobTitle: z.string().optional(),

    phone: z
      .string()
      .min(1, "Phone is required")
      .regex(/^\+?\d{7,}$/, "Invalid phone number"),

    mobile: z
      .string()
      .regex(/^\+?\d{7,}$/, "Invalid mobile number")
      .optional()
      .or(z.literal("").optional()),

    email: z
      .string()
      .email("Invalid email address")
      .optional()
      .or(z.literal("").optional()),

    website: z
      .string()
      .url("Invalid website URL")
      .optional()
      .or(z.literal("").optional()),

    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
  }),

  pdf: z
    .object({
      uploadType: z.enum(["url", "file"]).default("url"),
      pdfUrl: z.string().url("Invalid PDF URL").optional(),
      file: z
        .instanceof(File, { message: "Please upload a valid PDF file" })
        .optional(),
    })
    .refine(
      (data) =>
        (data.uploadType === "url" && !!data.pdfUrl) ||
        (data.uploadType === "file" && !!data.file),
      {
        message: "Please provide either a PDF URL or upload a file",
        path: ["pdfUrl"],
      }
    ),
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
