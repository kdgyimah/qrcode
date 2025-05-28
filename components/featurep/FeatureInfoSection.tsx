"use client";

import { RiTeamFill, RiBox3Line, RiColorFilterLine } from "react-icons/ri";
import { PiFolderFill, PiFolder } from "react-icons/pi";
import { TbScan } from "react-icons/tb";
import { IoFlashOutline } from "react-icons/io5";

const cards = [
  {
    icon: <IoFlashOutline className="text-3xl" />,
    iconBg: "bg-blue-500",
    title: "Instant QR Generation",
    desc: "Create QR codes instantly—no waiting, no hassle. Generate codes for any type of content in seconds.",
  },
  {
    icon: <RiColorFilterLine className="text-3xl" />,
    iconBg: "bg-emerald-600",
    title: "Custom Design Tools",
    desc: "Personalize your QR codes with colors, frames, and logos using our easy design editor.",
  },
  {
    icon: <RiTeamFill className="text-3xl" />,
    iconBg: "bg-blue-400",
    title: "Analytics & Tracking",
    desc: "Track scans and user engagement with real-time analytics for every QR code you share.",
  },
  {
    icon: <TbScan className="text-3xl" />,
    iconBg: "bg-purple-600",
    title: "Static & Dynamic QR Codes",
    desc: "Choose between static and dynamic QR codes to suit your campaign and editing needs.",
  },
  {
    icon: <RiBox3Line className="text-3xl" />,
    iconBg: "bg-orange-500",
    title: "Bulk QR Code",
    desc: "Create and manage large batches of QR codes efficiently for events, products, or campaigns.",
  },
  {
    icon: <PiFolder className="text-3xl" />,
    iconBg: "bg-pink-400",
    title: "Organized with Folders",
    desc: "Keep your QR codes organized by grouping them into folders for easy management and access.",
  },
];

export default function FeatureInfoSection() {
  return (
    <section
      className="bg-white flex justify-center mt-12 mb-0 w-full"
      style={{ minHeight: 600, maxWidth: "100vw" }}
    >
      <div className="flex flex-col w-full items-center">
        {/* Top Texts */}
        <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold capitalize text-gray-800 mb-6 md:mb-10">
            Powerful Features To Build, Share & Track QR codes
          </h1>
        </div>

        {/* Cards Container */}
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-y-14 gap-x-6
            w-full
            max-w-screen-xl
            px-2 sm:px-4 md:px-8
          "
        >
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="
                relative bg-white rounded-lg shadow-2xl shadow-gray-300
                p-6 md:p-8 flex flex-col items-start text-left
                min-h-[260px] md:min-h-[280px]
                max-w-full
                transition-transform hover:scale-[1.02]
              "
            >
              <div
                className={`absolute -top-8 self-center text-white rounded-full p-4 shadow-md ${card.iconBg}`}
              >
                {card.icon}
              </div>
              <h2 className="text-lg md:text-xl font-semibold mt-12 mb-2 md:mb-3">{card.title}</h2>
              <p className="text-gray-600 text-sm md:text-base">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}