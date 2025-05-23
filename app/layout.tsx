import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import 'react-datepicker/dist/react-datepicker.css';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
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
  description: "Generate unique and customizable QR codes for your business, events, or personal uses in seconds. It's fast, easy, and free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
