"use client";

import { Apple, Play, ExternalLink } from "lucide-react";
import type { FormProps, AppFormData } from "@/types/qr-generator";

type AppStore = "ios" | "android" | "both" | "custom";

export function AppForm({
  formData,
  onChange,
  errors,
  onContentCreate,
}: FormProps<AppFormData>) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((formData.appUrl ?? "").trim()) {
      onContentCreate({
        ...formData,
        appUrl: formData.appUrl ?? "", // ensure it's always a string
      });
    }
  };

  const handleAppUrlChange = (value: string) => {
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

  const handleQuickGenerate = (store: AppStore) => {
    const appId = prompt(
      store === "ios"
        ? "Enter App Store ID (numbers only, e.g., 1234567890):"
        : "Enter Package Name (e.g., com.example.app):"
    );

    if (appId) {
      const url = generateAppUrl(store, appId);
      handleAppUrlChange(url);
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

  const appUrl = formData.appUrl ?? ""; // default to empty string
  const isValid = appUrl.trim() !== "" && isValidUrl(appUrl);
  const detectedStore = isValid ? detectAppStore(appUrl) : "";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
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
              placeholder="https://apps.apple.com/app/id123456789 or https://play.google.com/store/apps/details?id=com.example.app"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                errors.appUrl ? "border-gray-300 bg-white" : "border-gray-300"
              }`}
              required
            />
            {isValid && (
              <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            )}
          </div>
          {errors.appUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.appUrl}</p>
          )}
          {detectedStore && (
            <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {detectedStore} detected
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Generate
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleQuickGenerate("ios")}
              className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Apple className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  App Store
                </div>
                <div className="text-xs text-gray-500">iOS Apps</div>
              </div>

            </button>
            <button
              type="button"
              onClick={() => handleQuickGenerate("android")}
              className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Play className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  Google Play
                </div>
                <div className="text-xs text-gray-500">Android Apps</div>
              </div>
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Click to quickly generate store URLs with App ID or Package Name
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Supported App Stores
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-blue-700">
            <div className="flex items-center gap-2">
              <Apple className="w-4 h-4" />
              <span>Apple App Store</span>
            </div>
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span>Google Play Store</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>Microsoft Store</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>Custom App Links</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            URL Examples
          </h4>
          <div className="space-y-1 text-xs text-gray-600 font-mono">
            <div>iOS: https://apps.apple.com/app/id1234567890</div>
            <div>
              Android:
              https://play.google.com/store/apps/details?id=com.example.app
            </div>
            <div>Direct APK: https://example.com/app.apk</div>
          </div>
        </div>
      </div>
    </form>
  );
}
