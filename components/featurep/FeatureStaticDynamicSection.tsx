"use client";

import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

const staticItems = [
  "Ideal for unchanging info like URLs or text.",
  "Cannot be updated once generated and printed.",
  "No scan tracking or analytics available.",
  "Great for personal use and printed materials.",
  "No scan tracking or analytics available.",
];

const dynamicItems = [
  "Change the destination anytime without reprinting codes.",
  "Track scans by time, location, and device.",
  "Best for campaigns, business, and advanced features.",
  "Enable retargeting and integration with marketing tools.",
  "Content can be updated after printing the code.",
];

export default function FeatureStaticDynamicSection() {
  const [activeTab, setActiveTab] = useState("static");

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
        {/* Text & Tabs */}
        <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 text-center lg:text-left">
            Static vs Dynamic QR
          </h1>

          <Tabs defaultValue="static" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center lg:justify-start">
              <TabsList className="w-fit grid grid-cols-2 h-auto p-1 bg-gray-100 rounded-lg">
                <TabsTrigger
                  value="static"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-all text-sm sm:text-base"
                >
                  Static
                </TabsTrigger>
                <TabsTrigger
                  value="dynamic"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-all text-sm sm:text-base"
                >
                  Dynamic
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="static" className="mt-6 sm:mt-8">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center lg:text-left">
                  Easy, permanent codes for fixed-use cases
                </h2>
                <ul className="space-y-3 sm:space-y-4 p-2">
                  {staticItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 sm:gap-4">
                      <FaCheckCircle className="text-blue-600 text-base sm:text-lg shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="dynamic" className="mt-6 sm:mt-8">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center lg:text-left">
                  Smart, flexible, and analytics-enabled QR codes
                </h2>
                <ul className="space-y-3 sm:space-y-4 p-2">
                  {dynamicItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 sm:gap-4">
                      <FaCheckCircle className="text-blue-600 text-base sm:text-lg shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Image & Shapes */}
        <div className="relative flex items-center justify-center w-full order-1 lg:order-2 mb-4 lg:mb-0">
          {/* Background shapes - responsive positioning */}
          <div className="hidden md:block absolute left-4 lg:left-20 top-6 w-[250px] md:w-[320px] lg:w-[423px] h-[280px] md:h-[400px] lg:h-[522px] bg-gray-100 z-0 rounded" />
          <div className="hidden md:block absolute left-0 lg:left-0 bottom-1 w-[50px] md:w-[70px] lg:w-[91px] h-[50px] md:h-[70px] lg:h-[92px] bg-[#A7A7FE] z-0 rounded" />
          <div className="hidden md:block absolute left-16 lg:left-32 top-0 w-4 md:w-6 lg:w-8 h-4 md:h-6 lg:h-8 bg-[#A7A7FE] z-0 rounded" />

          {/* Dynamic Image based on active tab */}
         <div className="relative z-10 w-[320px] sm:w-[400px] md:w-[450px] lg:w-[480px] h-[320px] sm:h-[400px] md:h-[450px] lg:h-[480px]">
  <Image
    src={activeTab === "static" ? "/images/proimg6.jpg" : "/images/qr-static-dynamic.jpg"}
    alt={activeTab === "static" ? "Static QR code illustration" : "Dynamic QR code illustration"}
    fill
    className="rounded-lg sm:rounded-xl object-cover shadow-lg sm:shadow-xl transition-opacity duration-300"
    priority
    key={activeTab}
  />
</div>

        </div>
      </div>
    </section>
  );
}