"use client";

import { useState } from "react";
import Image from "next/image";
import { QRCategory } from "@/types/qr-generator";
import { QR_CATEGORIES } from "@/lib/qr-categories";
import * as Icons from "lucide-react";

interface CategoryGridProps {
  onCategorySelect: (category: QRCategory) => void;
}

export function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<QRCategory | null>(
    null
  );

  const handleSelect = (category: QRCategory) => {
    setSelectedCategory(category);
  };

  const handleContinue = () => {
    if (selectedCategory) {
      onCategorySelect(selectedCategory);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Create your QR Code
          </h1>
          <p className="text-muted-foreground">Select a category to continue</p>
        </div>

        <div className="text-center md:text-right">
          <button
            onClick={handleContinue}
            disabled={!selectedCategory}
            className={`px-6 py-3 rounded-md font-semibold text-white transition ${
              selectedCategory
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continue →
          </button>
        </div>
      </div>

      {/* Content - Responsive Grid and Preview */}
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12">
        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full lg:max-w-2xl">
          {QR_CATEGORIES.map((category) => {
            const IconComponent = Icons[
              category.icon as keyof typeof Icons
            ] as React.ElementType;
            const isSelected = selectedCategory?.id === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleSelect(category)}
                className={`flex flex-col items-center bg-white justify-center rounded-lg border text-center p-4 transition-all min-h-[120px] ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-500"
                    : "border-gray-200 hover:shadow-sm"
                }`}
              >
                <div className="text-blue-600 bg-blue-50 p-2.5 rounded-full mb-3">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold mb-1">
                  {category.name}
                </div>
                <div className="text-xs text-gray-500">
                  {category.description}
                </div>
              </button>
            );
          })}
        </div>

        {/* iPhone Preview */}
        <div className="w-full max-w-[200px] mx-auto lg:mx-0">
          <div className="relative w-[200px] h-[401.31px]">
            <div className="relative w-[200px] h-[401px]">
              <Image
                src="/images/iphoneprev.png"
                alt="Phone Screen"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
