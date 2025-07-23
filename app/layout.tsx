// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Roboto_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import 'react-datepicker/dist/react-datepicker.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} ${poppins.variable}`}
    >
      <body className="font-poppins scroll-smooth w-full min-h-screen">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
