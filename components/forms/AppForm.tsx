"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { FormProps, AppFormData } from "@/types/qr-generator";

type AppStore = "ios" | "android" | "both" | "custom";

export function AppForm({
  formData,
  onChange,
  onContentCreate,
}: FormProps<AppFormData>) {
  const [touched, setTouched] = useState(false);
  const [appId, setAppId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if ((formData.appUrl ?? "").trim()) {
      onContentCreate({
        ...formData,
        appUrl: formData.appUrl ?? "",
      });
    }
  };

  const handleAppUrlChange = (value: string) => {
    if (!touched) setTouched(true);
    onChange("appUrl", value);
  };

  const generateAppUrl = (store: AppStore, appId: string) => {
    if (!appId.trim()) return "";
    switch (store) {
      case "ios":
        return `https://apps.apple.com/app/id${appId}`;
      case "android":
        return `https://play.google.com/store/apps/details?id=${appId}`;
      default:
        return appId;
    }
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const detectAppStore = (url: string): string => {
    if (url.includes("apps.apple.com") || url.includes("itunes.apple.com")) {
      return "App Store (iOS)";
    }
    if (url.includes("play.google.com")) {
      return "Google Play (Android)";
    }
    if (url.includes("microsoft.com/store")) {
      return "Microsoft Store";
    }
    if (url.includes("amazon.com/dp")) {
      return "Amazon Appstore";
    }
    return "Custom App Link";
  };

  const appUrl = formData.appUrl ?? "";
  const isEmpty = appUrl.trim() === "";
  const isValid = !isEmpty && isValidUrl(appUrl);
  const detectedStore = isValid ? detectAppStore(appUrl) : "";

  // dynamic error message
  let dynamicError: string | null = null;
  if (touched) {
    if (isEmpty) {
      dynamicError = "This field is required.";
    } else if (!isValid) {
      dynamicError = "Please enter a valid URL.";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* App URL Field */}
        <div>
          <label
            htmlFor="appUrl"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            App URL *
          </label>
          <div className="relative">
            <input
              type="url"
              id="appUrl"
              value={appUrl}
              onChange={(e) => handleAppUrlChange(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="https://apps.apple.com/app/id123456789 or https://play.google.com/store/apps/details?id=com.example.app"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                dynamicError ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {isValid && (
              <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            )}
          </div>
          {/* Dynamic validation message */}
          {dynamicError && (
            <p className="mt-1 text-sm text-red-600">{dynamicError}</p>
          )}
          {/* Success message */}
          {detectedStore && !dynamicError && (
            <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {detectedStore} detected
            </p>
          )}
        </div>

        {/* Quick Generate App Links */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Quick Generate by App ID
          </label>
          <input
            type="text"
            placeholder="Enter App ID (e.g. com.example.app or 123456789)"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
              onClick={() =>
                handleAppUrlChange(generateAppUrl("ios", appId))
              }
            >
              iOS App Store
            </button>
            <button
              type="button"
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
              onClick={() =>
                handleAppUrlChange(generateAppUrl("android", appId))
              }
            >
              Google Play
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
