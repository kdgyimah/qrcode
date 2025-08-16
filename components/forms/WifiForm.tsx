import React from "react";
import type { WifiFormData, FormProps } from "@/types/qr-generator";

export function WifiForm({
  formData,
  errors,
  onChange,
}: FormProps<WifiFormData>) {
  return (
    <div className="space-y-4">
      {/* SSID Input */}
      <div>
        <label className="block text-sm font-medium">SSID</label>
        <input
          type="text"
          value={formData.ssid || ""}
          onChange={(e) => onChange("ssid", e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        />
        {errors.ssid && <p className="text-red-500 text-sm">{errors.ssid}</p>}
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="text"
          value={formData.password || ""}
          onChange={(e) => onChange("password", e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {/* Encryption Select */}
      <div>
        <label className="block text-sm font-medium">Encryption</label>
        <select
          value={formData.encryption || "WPA"}
          onChange={(e) =>
            onChange("encryption", e.target.value as WifiFormData["encryption"])
          }
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="WPA">WPA</option>
          <option value="WEP">WEP</option>
          <option value="None">None</option>
        </select>
        {errors.encryption && (
          <p className="text-red-500 text-sm">{errors.encryption}</p>
        )}
      </div>
    </div>
  );
}
