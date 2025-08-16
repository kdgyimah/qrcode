"use client";

import React, { useState, useMemo } from "react";
import { countries as countriesData } from "@/data/countries";

type Country = {
  name: string;
  code: string;
  iso: string;
  flag: string;
};

interface CountryDropdownProps {
  countries?: Country[];      // optional, defaults to imported list
  selectedCode: string;
  onSelect: (code: string) => void;
  onClose: () => void;
}

export const CountryDropdown: React.FC<CountryDropdownProps> = ({
  countries = countriesData,
  selectedCode,
  onSelect,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return countries;

    const term = searchTerm.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.code.toLowerCase().includes(term) ||
        c.iso.toLowerCase().includes(term)
    );
  }, [countries, searchTerm]);

  const handleSelect = (code: string) => {
    onSelect(code);
    onClose();
    setSearchTerm(""); // reset search
  };

  return (
    <div className="absolute z-50 mt-1 w-80 max-h-60 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      {/* 🔹 Search Input */}
      <div className="border-b border-gray-200 p-3">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* 🔹 List */}
      <div className="max-h-48 overflow-y-auto">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => handleSelect(country.code)}
              className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                selectedCode === country.code ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <span className="text-lg">{country.flag}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-gray-900">
                  {country.name}
                </div>
              </div>
              <span className="font-mono text-gray-500">{country.code}</span>
            </button>
          ))
        ) : (
          <div className="px-3 py-4 text-center text-sm text-gray-500">
            No countries found
          </div>
        )}
      </div>
    </div>
  );
};
