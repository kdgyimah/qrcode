"use client";

import React, { useCallback, useMemo } from "react";
import { Video } from "lucide-react";
import type { FormProps, VideoFormData } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";
import { cn } from "@/lib/utils";

export const VideoForm: React.FC<FormProps<VideoFormData>> = ({
  formData,
  onChange,
  errors,
}) => {
  const videoUrl = formData.videoUrl ?? "";

  // URL validation
  const isValidUrl = useCallback((url: string): boolean => {
    if (!url.trim()) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, []);

  // Thumbnail preview
  const videoPreview = useMemo(() => {
    if (!videoUrl || !isValidUrl(videoUrl)) return null;

    const youtubeRegex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const youtubeMatch = videoUrl.match(youtubeRegex);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
    }

    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const vimeoMatch = videoUrl.match(vimeoRegex);
    if (vimeoMatch) {
      return `https://vumbnail.com/${vimeoMatch[1]}.jpg`;
    }

    return null;
  }, [videoUrl, isValidUrl]);

  // Validation state
  const isValid = useMemo(() => {
    return videoUrl.trim().length > 0 && isValidUrl(videoUrl);
  }, [videoUrl, isValidUrl]);

  // Change handler
  const handleVideoUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange("videoUrl", e.target.value);
    },
    [onChange]
  );

  return (
    <div className="space-y-6">
      <FormHeader />

      <VideoUrlInput
        videoUrl={videoUrl}
        error={errors.videoUrl}
        onChange={handleVideoUrlChange}
      />

      {videoPreview && <VideoPreview previewUrl={videoPreview} />}

      <PlatformInfo />
    </div>
  );
};

// Subcomponents
function FormHeader() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-red-100 rounded-lg">
        <Video className="w-5 h-5 text-red-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">Video QR Code</h3>
        <p className="text-sm text-gray-600">Share any video link</p>
      </div>
    </div>
  );
}

interface VideoUrlInputProps {
  videoUrl: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function VideoUrlInput({ videoUrl, error, onChange }: VideoUrlInputProps) {
  return (
    <div>
      <Label htmlFor="videoUrl">Video URL *</Label>
      <div className="relative">
        <input
          type="url"
          id="videoUrl"
          value={videoUrl}
          onChange={onChange}
          placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
          className={cn(
            inputBase,
            "pr-10",
            error && "border-red-500 bg-red-50"
          )}
          aria-invalid={!!error}
          aria-describedby={error ? "videoUrl-error" : undefined}
          required
        />
      </div>
      {error && <ErrorText>{error}</ErrorText>}
      <p className="mt-2 text-xs text-gray-500">
        Supports YouTube, Vimeo, and other video platforms
      </p>
    </div>
  );
}

function VideoPreview({ previewUrl }: { previewUrl: string }) {
  return (
    <div className="mt-4">
      <Label>Preview</Label>
      <div className="relative rounded-lg overflow-hidden border border-gray-200">
        <img
          src={previewUrl}
          alt="Video thumbnail"
          className="w-full h-32 object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <Video className="w-8 h-8 text-white opacity-80" />
        </div>
      </div>
    </div>
  );
}

function PlatformInfo() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="text-sm font-medium text-blue-900 mb-2">
        Popular Video Platforms
      </h4>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>• YouTube - Direct video links</li>
        <li>• Vimeo - Professional video hosting</li>
        <li>• Dailymotion - Social video platform</li>
        <li>• Any other video URL</li>
      </ul>
    </div>
  );
}
