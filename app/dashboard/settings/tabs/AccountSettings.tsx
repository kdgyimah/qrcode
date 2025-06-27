"use client";

import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function AccountSettings() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Personal Info Section */}
      <div className="md:flex md:items-start gap-8">
        {/* Left: heading/info */}
        <div className="min-w-[180px] md:w-1/4 mb-4 md:mb-0">
          <div className="font-semibold text-base">Personal Info</div>
          <div className="text-gray-400 text-sm">
            You can change your personal information settings here.
          </div>
        </div>
        {/* Right: card */}
        <div className="flex-1">
          <section className="bg-white rounded-xl shadow p-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs mb-1 font-medium">
                  Full Name
                </label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  defaultValue="Azusa Nakano"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 font-medium">
                  Email Address
                </label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  defaultValue="elementary221@gmail.com"
                  type="email"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  defaultValue="+44 (123) 456-9878"
                  type="tel"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 font-medium">
                  Change Avatar
                </label>
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/img1.jpg"
                    alt="avatar"
                    width={48}
                    height={48}
                    className="rounded-full border"
                  />

                  <button
                    type="button"
                    className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1.5 text-xs rounded-md font-medium transition hover:bg-blue-700"
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 bg-red-500 text-white px-4 py-1.5 text-xs rounded-md font-medium transition hover:bg-red-600"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
              <div>
                <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition flex items-center gap-2">
                  Save
                  <CheckCircleIcon className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Password Section */}
      <div className="md:flex md:items-start gap-8">
        {/* Left: heading/info */}
        <div className="min-w-[180px] md:w-1/4 mb-4 md:mb-0">
          <div className="font-semibold text-base">Password</div>
          <div className="text-gray-400 text-sm">
            You can change your password here.
          </div>
        </div>
        {/* Right: card */}
        <div className="flex-1">
          <section className="bg-white rounded-xl shadow p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1 font-medium">
                  New Password
                </label>
                <div className="relative">
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type={showNewPassword ? "text" : "password"}
                    defaultValue="************"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                    onClick={() => setShowNewPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1 font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type={showConfirmPassword ? "text" : "password"}
                    defaultValue="************"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition">
              Save
            </button>
          </section>
        </div>
      </div>

      {/* Deactivate Section */}
      <div className="md:flex md:items-start gap-8">
        {/* Left: heading/info */}
        <div className="min-w-[180px] md:w-1/4 mb-4 md:mb-0">
          <div className="font-semibold text-base text-red-500">
            Deactivate Account
          </div>
          <div className="text-gray-400 text-sm">
            This will shut down your account and you may cry, lol
          </div>
        </div>
        {/* Right: card */}
        <div className="flex-1">
          <section className="bg-white rounded-xl shadow p-6">
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-red-600 transition">
              Deactivate
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
