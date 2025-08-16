// components/DynamicCard.tsx
"use client";

import Image from "next/image";
import { FC } from "react";

interface DynamicCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  stats?: {
    label: string;
    value: string | number;
  }[];
}

const DynamicCard: FC<DynamicCardProps> = ({
  imageUrl,
  title,
  subtitle,
  description,
  buttonText = "Learn More",
  onButtonClick,
  stats = [],
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Content Section */}
      <div className="flex flex-col justify-between p-6 md:p-8 w-full md:w-1/2">
        {/* Title & Subtitle */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700 text-sm leading-relaxed">
          {description}
        </p>

        {/* Stats */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Button */}
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default DynamicCard;
