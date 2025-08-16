import React, { useState, useMemo } from "react";
import { useCountryDetection } from "@/hooks/useCountryDetection";
import { countries } from "@/data/countries";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { CountryDropdown } from "@/components/ui/country-dropdown";

interface PhoneInputProps {
  name: string;
  value?: string;
  onChange: (val: string) => void;
  error?: string;
  label?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  value = "",
  onChange,
  error,
  label,
}) => {
  const { detectedCountry, isDetecting } = useCountryDetection();
  const [showDropdown, setShowDropdown] = useState(false);

  // Parse code/local from value
  const { code, local } = useMemo(() => {
    const sortedCountries = [...countries].sort(
      (a, b) => b.code.length - a.code.length
    );
    const match = sortedCountries.find((c) => value.startsWith(c.code + " "));
    return {
      code: match?.code || detectedCountry || "",
      local: match
        ? value.substring(match.code.length + 1)
        : value || "",
    };
  }, [value, detectedCountry]);

  const selectedCountry = countries.find((c) => c.code === code);

  const handleLocalChange = (localPart: string) => {
    const combined = localPart.trim() ? `${code} ${localPart.trim()}` : "";
    onChange(combined);
  };

  const handleCodeChange = (newCode: string) => {
    const combined = local.trim() ? `${newCode} ${local.trim()}` : newCode;
    onChange(combined);
  };

  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className="flex gap-0 mt-1">
        {/* Country selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex items-center gap-2 px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px] ${
              error ? "border-red-500" : ""
            }`}
          >
            <span className="text-lg">{selectedCountry?.flag || "🌍"}</span>
            <span className="text-sm font-medium">{code}</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showDropdown && (
            <CountryDropdown
              countries={countries}
              selectedCode={code}
              onSelect={handleCodeChange}
              onClose={() => setShowDropdown(false)}
            />
          )}
        </div>

        {/* Phone number input */}
        <input
          type="tel"
          name={name}
          value={local}
          onChange={(e) => handleLocalChange(e.target.value)}
          placeholder="Phone number"
          className={`w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
            error ? "border-red-500" : ""
          }`}
        />
      </div>

      {isDetecting && (
        <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Detecting your country...
        </p>
      )}

      {error && <ErrorText>{error}</ErrorText>}

      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};
