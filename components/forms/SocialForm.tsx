"use client";

import React, { useState, useEffect } from "react";
import { 
  Share2, Facebook, Twitter, Instagram, Linkedin, Github, Youtube 
} from "lucide-react";
import type { FormProps, SocialFormData } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";

type SocialPlatform = 
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "github"
  | "youtube"
  | "tiktok"
  | "custom";

interface PlatformConfig {
  name: string;
  icon: React.ReactNode;
  color: string;
  urlPattern: string;
  placeholder: string;
  example: string;
}

const socialPlatforms: Record<SocialPlatform, PlatformConfig> = {
  facebook: {
    name: "Facebook",
    icon: <Facebook className="w-4 h-4" />,
    color: "text-blue-600",
    urlPattern: "https://facebook.com/",
    placeholder: "username or page name",
    example: "https://facebook.com/username",
  },
  twitter: {
    name: "Twitter/X",
    icon: <Twitter className="w-4 h-4" />,
    color: "text-gray-900",
    urlPattern: "https://twitter.com/",
    placeholder: "username",
    example: "https://twitter.com/username",
  },
  instagram: {
    name: "Instagram",
    icon: <Instagram className="w-4 h-4" />,
    color: "text-pink-600",
    urlPattern: "https://instagram.com/",
    placeholder: "username",
    example: "https://instagram.com/username",
  },
  linkedin: {
    name: "LinkedIn",
    icon: <Linkedin className="w-4 h-4" />,
    color: "text-blue-700",
    urlPattern: "https://linkedin.com/in/",
    placeholder: "profile name",
    example: "https://linkedin.com/in/username",
  },
  github: {
    name: "GitHub",
    icon: <Github className="w-4 h-4" />,
    color: "text-gray-900",
    urlPattern: "https://github.com/",
    placeholder: "username",
    example: "https://github.com/username",
  },
  youtube: {
    name: "YouTube",
    icon: <Youtube className="w-4 h-4" />,
    color: "text-red-600",
    urlPattern: "https://youtube.com/@",
    placeholder: "channel name",
    example: "https://youtube.com/@username",
  },
  tiktok: {
    name: "TikTok",
    icon: <Share2 className="w-4 h-4" />,
    color: "text-pink-600",
    urlPattern: "https://tiktok.com/@",
    placeholder: "username",
    example: "https://tiktok.com/@username",
  },
  custom: {
    name: "Custom",
    icon: <Share2 className="w-4 h-4" />,
    color: "text-gray-600",
    urlPattern: "",
    placeholder: "full social media URL",
    example: "https://example.com/profile",
  },
};

export const SocialForm: React.FC<FormProps<SocialFormData>> = ({
  errors,
  onChange,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>("facebook");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!username.trim()) return;

    const platform = socialPlatforms[selectedPlatform];
    let url = "";

    if (selectedPlatform === "custom") {
      url = username.startsWith("http") ? username : `https://${username}`;
    } else {
      const cleanUsername = username.replace(/^@/, "");
      url = platform.urlPattern + cleanUsername;
    }

    onChange("socialUrl", url);
  }, [username, selectedPlatform, onChange]);

  const handlePlatformSelect = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
    setUsername("");
    onChange("socialUrl", "");
  };

  return (
    <>
      {/* Platform Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {Object.entries(socialPlatforms).map(([key, platform]) => (
          <button
            key={key}
            type="button"
            onClick={() => handlePlatformSelect(key as SocialPlatform)}
            className={`flex items-center justify-center gap-2 p-2 border rounded-lg text-sm transition ${
              selectedPlatform === key
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className={platform.color}>{platform.icon}</span>
            {platform.name}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <Label htmlFor="socialUrl">{socialPlatforms[selectedPlatform].name} Profile</Label>
      <input
        id="socialUrl"
        name="socialUrl"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={socialPlatforms[selectedPlatform].example}
        className={`${inputBase} ${errors.socialUrl ? "border-red-500" : ""}`}
        aria-invalid={!!errors.socialUrl}
        aria-describedby={errors.socialUrl ? "socialUrl-error" : undefined}
      />
      {errors.socialUrl && (
        <ErrorText id="socialUrl-error">{errors.socialUrl}</ErrorText>
      )}
    </>
  );
};
