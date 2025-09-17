"use client";

import { useState, useRef, useEffect } from "react";
import CountryFlag from "react-country-flag";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Switch } from "@headlessui/react";

const countries = [
  { code: "GB", label: "United Kingdom" },
  { code: "US", label: "United States" },
  { code: "NG", label: "Nigeria" },
];

export default function PlansBillingSettings() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [autoPayout, setAutoPayout] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCountryDropdownOpen(false);
      }
    }
    if (countryDropdownOpen) {
      window.addEventListener("mousedown", handleClick);
    }
    return () => window.removeEventListener("mousedown", handleClick);
  }, [countryDropdownOpen]);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* BILLING SECTION */}
      <div className="md:flex md:items-start gap-8">
        <div className="min-w-[180px] md:w-1/4 mb-4 md:mb-0">
          <div className="font-semibold text-base">Billing</div>
          <div className="text-gray-400 text-sm">
            Manage your subscription and payment methods.
          </div>
        </div>
        <div className="flex-1">
          <section className="bg-white rounded-xl shadow p-6">
            <div className="mb-4">
              <div className="text-sm font-semibold mb-1">Current plan</div>
              <div className="text-xs text-gray-500">
                <span className="font-medium">Plan:</span> Pro Tier (Monthly)
              </div>
              <div className="text-xs text-gray-500">
                Renewal Date:{" "}
                <span className="font-semibold">Sept 30, 2025</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-sm font-medium transition-colors flex items-center gap-2">
                Upgrade
                <CheckCircleIcon className="w-5 h-5 ml-1" />
              </button>
              <button className="border border-gray-300 text-gray-700 rounded-lg px-5 py-2 text-sm font-medium transition-colors hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* PAYMENT METHOD SECTION */}
      <div className="md:flex md:items-start gap-8">
        <div className="min-w-[180px] md:w-1/4 mb-4 md:mb-0">
          <div className="font-semibold text-base">Payment Method</div>
          <div className="text-gray-400 text-sm">
            Update your payment details.
          </div>
        </div>
        <div className="flex-1">
          <section className="bg-white rounded-xl shadow p-6">
            <form className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="block text-xs mb-1 font-medium text-gray-500">
                  Credit Card
                </label>
                <div className="relative">
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    defaultValue="9978 1128 1558 1978"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-700">
                    VISA
                  </span>
                </div>
              </div>

              {/* Card Holder */}
              <div>
                <label className="block text-xs mb-1 font-medium text-gray-500">
                  Card Holder Name
                </label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  defaultValue="Azusa Nakano"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs mb-1 font-medium text-gray-500">
                  Country
                </label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 pl-10 pr-10 text-sm flex items-center focus:outline-none focus:ring-2 focus:ring-blue-200 relative bg-white"
                    onClick={() => setCountryDropdownOpen((open) => !open)}
                  >
                    <span className="absolute left-3 flex items-center">
                      <CountryFlag
                        countryCode={selectedCountry.code}
                        svg
                        className="w-5 h-5 mr-1"
                        style={{ borderRadius: "2px" }}
                      />
                    </span>
                    <span className="truncate">{selectedCountry.label}</span>
                    <ChevronDownIcon className="w-4 h-4 absolute right-3 text-gray-400" />
                  </button>
                  {countryDropdownOpen && (
                    <div className="absolute z-10 left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                      {countries.map((country) => (
                        <button
                          type="button"
                          key={country.code}
                          className={`flex items-center w-full px-3 py-2 text-sm hover:bg-blue-50 ${
                            selectedCountry.code === country.code
                              ? "bg-blue-100 font-semibold"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedCountry(country);
                            setCountryDropdownOpen(false);
                          }}
                        >
                          <CountryFlag
                            countryCode={country.code}
                            svg
                            className="w-5 h-5 mr-2"
                            style={{ borderRadius: "2px" }}
                          />
                          {country.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Auto Payout Switch */}
              <div className="flex items-center justify-between mt-2">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Enable Auto Payout
                  </div>
                  <div className="text-xs text-gray-400">
                    Autopayout occurs at the end of each month.
                  </div>
                </div>
                <Switch
                  checked={autoPayout}
                  onChange={setAutoPayout}
                  className={`${
                    autoPayout ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                >
                  <span
                    className={`${
                      autoPayout ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-2 text-sm font-medium transition flex items-center gap-2"
                  type="submit"
                >
                  Save
                  <CheckCircleIcon className="w-5 h-5 ml-1" />
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
