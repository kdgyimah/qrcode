"use client";

import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Adjust the import path according to your project

const staticItems = [
  "Ideal for unchanging info like URLs or text.",
  "Cannot be updated once generated and printed.",
  "No scan tracking or analytics available.",
  "Great for personal use and printed materials.",
  "No scan tracking or analytics available..",
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
    <section
      className="w-full flex items-center justify-center bg-white"
      style={{ minHeight: 848, width: 1440, maxWidth: "100vw" }}
    >
      <div className="relative flex flex-row w-[1171px] h-[606px] max-w-full bg-transparent">
        {/* Left container */}
        <div className="flex flex-col w-[554px] h-[483px] mt-[60px] bg-white z-10">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl px-8 font-bold text-gray-900 mb-14">
            Static vs Dynamic QR
          </h1>

          {/* Shadcn Tabs */}
          <Tabs defaultValue="static" className="w-full">
            <TabsList className="mx-6 w-[334px] h-[64px] mb-1">
              <TabsTrigger
                value="static"
                className="mr-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600
              data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700
              px-6 py-2 rounded-sm font-semibold transition-all"
              >
                Static
              </TabsTrigger>
              <TabsTrigger
                value="dynamic"
                className="ml-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600
              data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700
              px-6 py-2 rounded-sm font-semibold transition-all"
              >
                Dynamic
              </TabsTrigger>
            </TabsList>
            <TabsContent value="static">
              <div className=" p-6 min-h-[240px] w-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Easy, permanent codes for fixed-use cases
                </h2>
                <ul className="space-y-4">
                  {staticItems.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <FaCheckCircle className="text-blue-600 text-lg shrink-0" />
                      <span className="text-gray-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="dynamic">
              <div className="bg-white p-6 min-h-[240px] w-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Smart, flexible, and analytics-enabled QR codes.
                </h2>
                <ul className="space-y-4">
                  {dynamicItems.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <FaCheckCircle className="text-blue-600 text-lg shrink-0" />
                      <span className="text-gray-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right container */}
        <div className="relative w-[600px] h-[606px] flex items-center justify-center ml-auto">
          {/* Large gray shape behind image */}
          <div
            className="absolute left-[160px] top-[23px] rounded-0 bg-gray-100 z-0"
            style={{ width: 423, height: 522 }}
          />
          {/* Small gray shape bottom-left overlapping image */}
          <div
            className="absolute left-[0px] right-[10px] bottom-[20px] rounded-[1px] z-0"
            style={{
              width: 91,
              height: 92,
              background: "rgba(167, 167, 254, 1)",
            }}
          />
          {/* Small gray shape top-left overlapping Large grey shape */}
          <div
            className="absolute left-[130px] right-[10px] top-[0px]  rounded-[1px] z-0"
            style={{
              width: 32,
              height: 32,
              background: "rgba(167, 167, 254, 1)",
            }}
          />
          {/* Image */}
          <div
            className="relative z-10 bottom-5 left-3 flex items-center justify-center"
            style={{
              width: 494,
              height: 474,
            }}
          >
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
