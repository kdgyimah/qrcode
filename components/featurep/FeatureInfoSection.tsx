"use client";

import {
  RiTeamFill,
  RiBox3Line,
  RiColorFilterLine,
} from "react-icons/ri";
import { PiFolder } from "react-icons/pi";
import { TbScan } from "react-icons/tb";
import { IoFlashOutline } from "react-icons/io5";

const cards = [
  {
    icon: <IoFlashOutline className="text-2xl sm:text-3xl" />,
    iconBg: "bg-blue-500",
    title: "Instant QR Generation",
    desc: "Create QR codes instantly—no waiting, no hassle. Generate codes for any type of content in seconds.",
  },
  {
    icon: <RiColorFilterLine className="text-2xl sm:text-3xl" />,
    iconBg: "bg-emerald-600",
    title: "Custom Design Tools",
    desc: "Personalize your QR codes with colors, frames, and logos using our easy design editor.",
  },
  {
    icon: <RiTeamFill className="text-2xl sm:text-3xl" />,
    iconBg: "bg-blue-400",
    title: "Analytics & Tracking",
    desc: "Track scans and user engagement with real-time analytics for every QR code you share.",
  },
  {
    icon: <TbScan className="text-2xl sm:text-3xl" />,
    iconBg: "bg-purple-600",
    title: "Static & Dynamic QR Codes",
    desc: "Choose between static and dynamic QR codes to suit your campaign and editing needs.",
  },
  {
    icon: <RiBox3Line className="text-2xl sm:text-3xl" />,
    iconBg: "bg-orange-500",
    title: "Bulk QR Code",
    desc: "Create and manage large batches of QR codes efficiently for events, products, or campaigns.",
  },
  {
    icon: <PiFolder className="text-2xl sm:text-3xl" />,
    iconBg: "bg-pink-400",
    title: "Organized with Folders",
    desc: "Keep your QR codes organized by grouping them into folders for easy management and access.",
  },
];

export default function FeatureInfoSection() {
  return (
    <section className="bg-white flex justify-center mt-12 w-full px-4">
      <div className="flex flex-col w-full items-center max-w-[1280px]">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12 max-w-3xl px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold capitalize text-gray-800 mb-6 md:mb-10 leading-tight">
            Powerful Features To Build, Share & Track QR codes
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="w-full max-w-[1148px] h-[850px] pt-[60px] mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-[40px] gap-y-[60px] px-4 sm:px-6 overflow-y-auto">
          {cards.map((card) => (
            <div
              key={card.title}
              className="relative bg-white rounded-xl shadow-lg p-4 pt-16 flex flex-col items-start text-left transition-transform hover:scale-[1.02] w-full max-w-[360px] h-[290px] mx-auto"
            >
              <div
                className={`absolute -top-6 left-1/2 -translate-x-1/2 text-white rounded-full p-3 shadow-md ${card.iconBg}`}
              >
                {card.icon}
              </div>
              <h2 className="text-lg font-semibold mt-2 mb-2">{card.title}</h2>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
