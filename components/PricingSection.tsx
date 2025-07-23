"use client";

import { useState } from "react";
import PricingCard from "./PricingCard";
import ToggleSwitch from "./ToggleSwitch";
import { RiHeartsFill } from "react-icons/ri";
import { BiSolidCrown } from "react-icons/bi";
import { PiLightningFill } from "react-icons/pi";
import Image from "next/image";

const pricingData = {
  monthly: [
    {
      title: "Free",
      subtitle: "Perfect plan to get started",
      price: "$0 /month",
      features: [
        { text: "Basic QR Codes", available: true },
        { text: "Limited Scans", available: true },
        { text: "PNG Download", available: true },
        { text: "Analytics", available: false },
        { text: "Bulk QR Codes", available: false },
        { text: "100+ integrations", available: true },
      ],
      additional: "Basic QR customization (colors, shapes)",
      isPopular: false,
    },
    {
      title: "Pro",
      subtitle: "Advanced customization & analytics.",
      price: "$12 /month",
      features: [
        { text: "Everything in Free Plan", available: true },
        { text: "Dynamic QR codes", available: true },
        { text: "Advanced Custom", available: true },
        { text: "Scan Analytics", available: true },
        { text: "Logo uploads", available: true },
        { text: "Bulk Generation", available: true },
        { text: "SVG, PDF, EPS", available: true },
      ],
      additional: "Expiry-based QR codes",
      isPopular: true,
    },
    {
      title: "Business",
      subtitle: "Best suits for great company!",
      price: "$20 /month",
      features: [
        { text: "Everything in Pro Plan", available: true },
        { text: "Team Collaboration", available: true },
        { text: "API Access", available: true },
        { text: "White-label QR", available: true },
        { text: "Priority Support", available: true },
        { text: "Custom features", available: true },
      ],
      additional: "Advanced security (2FA, encrypted QR codes)",
      isPopular: false,
    },
  ],
  yearly: [
    {
      title: "Free",
      subtitle: "Perfect plan to get started",
      price: "$0 /year",
      features: [
        { text: "Basic QR Codes", available: true },
        { text: "Limited Scans", available: true },
        { text: "PNG Download", available: true },
        { text: "Analytics", available: false },
        { text: "Bulk QR Codes", available: false },
        { text: "100+ integrations", available: true },
      ],
      additional: "Basic QR customization (colors, shapes)",
      isPopular: false,
    },
    {
      title: "Pro",
      subtitle: "Advanced customization & analytics.",
      price: "$120 /year",
      features: [
        { text: "Everything in Free Plan", available: true },
        { text: "Dynamic QR codes", available: true },
        { text: "Advanced Custom", available: true },
        { text: "Scan Analytics", available: true },
        { text: "Logo uploads", available: true },
        { text: "Bulk Generation", available: true },
        { text: "SVG, PDF, EPS", available: true },
      ],
      additional: "Expiry-based QR codes",
      isPopular: true,
    },
    {
      title: "Business",
      subtitle: "Best suits for great company!",
      price: "$200 /year",
      features: [
        { text: "Everything in Pro Plan", available: true },
        { text: "Team Collaboration", available: true },
        { text: "API Access", available: true },
        { text: "White-label QR", available: true },
        { text: "Priority Support", available: true },
        { text: "Custom features", available: true },
      ],
      additional: "Advanced security (2FA, encrypted QR codes)",
      isPopular: false,
    },
  ],
};

const iconColor = "text-[#7C5CFC]";
const icons = [
  <RiHeartsFill key="heart" className={`${iconColor} w-6 h-6`} />,
  <BiSolidCrown key="crown" className={`${iconColor} w-6 h-6`} />,
  <PiLightningFill key="lightning" className={`${iconColor} w-6 h-6`} />,
];


export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const plans = isYearly ? pricingData.yearly : pricingData.monthly;

  return (
    <section className="px-4 sm:px-6 md:px-12 py-16 bg-white text-gray-900">
      {/* Toggle + Save 65% */}
      <div className="flex flex-col items-center gap-4 relative mb-12">
        <div className="inline-flex items-center gap-4">
          <span className="font-semibold text-lg">Monthly</span>
          <ToggleSwitch enabled={isYearly} setEnabled={setIsYearly} />
          <span className="font-semibold text-lg">Yearly</span>
        </div>

        {/* Save 65% badge with arrow */}
        <div className="relative">
          <span className="bg-[#E9DFFF] text-[#0F0F0F] text-sm font-medium px-4 py-1 rounded-full">
            Save 65%
          </span>
          <Image
            className="absolute -bottom-3 -right-26 transform -translate-x-1/2 w-20 h-14"
            src="/pricingarrow.svg"
            alt="icon"
            width={32}
            height={32}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            subtitle={plan.subtitle}
            price={plan.price}
            features={plan.features}
            additional={plan.additional}
            icon={icons[index]}
            isPopular={plan.isPopular}
          />
        ))}
      </div>
    </section>
  );
}
