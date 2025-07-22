import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import 'react-datepicker/dist/react-datepicker.css';

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} scroll-smooth w-full min-h-screen`}
      >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
