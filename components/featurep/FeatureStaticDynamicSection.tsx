"use client";

import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
  return (
    <section className="w-full bg-white py-16 px-20">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text & Tabs */}
        <div className="space-y-8 px-5">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Static vs Dynamic QR
          </h1>

          <Tabs defaultValue="static" className="w-full">
            <TabsList className="w-fit">
              <TabsTrigger value="static" className="mr-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700 px-6 py-2 rounded-sm font-semibold transition-all">
                Static
              </TabsTrigger>
              <TabsTrigger value="dynamic" className="ml-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700 px-6 py-2 rounded-sm font-semibold transition-all">
                Dynamic
              </TabsTrigger>
            </TabsList>

            <TabsContent value="static">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Easy, permanent codes for fixed-use cases
                </h2>
                <ul className="space-y-4">
                  {staticItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <FaCheckCircle className="text-blue-600 text-lg shrink-0 mt-1" />
                      <span className="text-gray-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="dynamic">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Smart, flexible, and analytics-enabled QR codes
                </h2>
                <ul className="space-y-4">
                  {dynamicItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <FaCheckCircle className="text-blue-600 text-lg shrink-0 mt-1" />
                      <span className="text-gray-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Image & Shapes */}
        <div className="relative flex items-center justify-center">
          {/* Background shapes */}
          <div className="absolute left-20 top-6 w-[423px] h-[522px] bg-gray-100 z-0" />
          <div className="absolute left-0 bottom-5 w-[91px] h-[92px] bg-[#A7A7FE] z-0" />
          <div className="absolute left-32 top-0 w-8 h-8 bg-[#A7A7FE] z-0" />

          {/* Image */}
          <div className="relative z-10 w-[494px] h-[474px]">
            <Image
              src="/images/qr-static-dynamic.jpg"
              alt="Static vs Dynamic QR illustration"
              width={504}
              height={484}
              className="rounded-sm object-cover shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
