"use client";

import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Switch } from "@headlessui/react";

export default function NotificationPreferenceSettings() {
  // State for notification toggles
  const [notifications, setNotifications] = useState([
    true, // Receive product updates
    true, // Weekly analytics reports
    true, // QR code scan alerts
    true, // Promotional emails
  ]);
  // State for theme toggle
  const [themeDark, setThemeDark] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Notification Section */}
      <div className="md:flex md:items-start gap-8">
        {/* Left: Heading & Info */}
        <div className="min-w-[180px] md:w-1/4 mb-4 md:mb-0">
          <div className="font-semibold text-base">Notification</div>
          <div className="text-gray-400 text-sm">
            Customize what alerts you receive and how you get them.
          </div>
        </div>
        {/* Right: Card */}
        <div className="flex-1">
          <section className="bg-white rounded-xl shadow p-6">
            <div className="space-y-4">
              {[
                {
                  label: "Receive product updates",
                  desc: "Receive real-time notifications while using the app.",
                },
                {
                  label: "Weekly analytics reports",
                  desc: "Receive weekly summaries of your QR code performance.",
                },
                {
                  label: "QR code scan alerts",
                  desc: "Be notified when your QR codes are scanned in real time.",
                },
                {
                  label: "Promotional emails",
                  desc: "Get notified about special deals and feature releases.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                  <Switch
                    checked={notifications[idx]}
                    onChange={checked =>
                      setNotifications(notifications =>
                        notifications.map((v, i) => (i === idx ? checked : v))
                      )
                    }
                    className={`${
                      notifications[idx] ? "bg-blue-600" : "bg-gray-300"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                  >
                    <span
                      className={`${
                        notifications[idx] ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
              ))}
            </div>
            <button className="mt-6 bg-blue-600 text-white rounded-lg px-6 py-2 font-medium text-sm hover:bg-blue-700 transition flex items-center gap-2">
              Save
              <CheckCircleIcon className="w-5 h-5 ml-1" />
            </button>
          </section>
        </div>
      </div>

      {/* Preference Section */}
      <div className="md:flex md:items-start gap-8">
        {/* Left: Heading & Info */}
        <div className="min-w-[180px] md:w-1/4 mb-4 md:mb-0">
          <div className="font-semibold text-base">Preference</div>
          <div className="text-gray-400 text-sm">
            Set your language, time zone, and appearance.
          </div>
        </div>
        {/* Right: Card */}
        <div className="flex-1">
          <section className="bg-white rounded-xl shadow p-6">
            <form className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1 font-medium">Language</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1 font-medium">Time Zone</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>UTC</option>
                </select>
              </div>
              <div className="md:col-span-2 flex items-center gap-3 mt-2">
                <label className="text-sm font-medium">Theme (Dark/Light Mode)</label>
                <Switch
                  checked={themeDark}
                  onChange={setThemeDark}
                  className={`${
                    themeDark ? "bg-blue-600" : "bg-gray-300"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                >
                  <span
                    className={`${
                      themeDark ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <span className="text-xs text-gray-400">
                  Switch between light and dark appearance.
                </span>
              </div>
            </form>
            <button className="mt-6 bg-blue-600 text-white rounded-lg px-6 py-2 font-medium text-sm hover:bg-blue-700 transition flex items-center gap-2">
              Save
              <CheckCircleIcon className="w-5 h-5 ml-1" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}