import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import 'react-datepicker/dist/react-datepicker.css';

// Google Font Setup (replace Geist with Inter & Roboto_Mono)
const inter = Inter({
  variable: "--font-geist-sans", // still using same CSS variable names to avoid extra changes
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO
export const metadata: Metadata = {
  title: "QR Code Generator",
  icons: {
    icon: "/logos/logod.svg",
    shortcut: "/logos/logod.svg",
    apple: "/logos/logod.svg",
  },
  description:
    "Generate unique and customizable QR codes for your business, events, or personal uses in seconds. It's fast, easy, and free.",
};

// Root Layout Wrapper
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} scroll-smooth`}
      >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
