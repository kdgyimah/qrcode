"use client";

import {
  CheckCircleIcon,
  PencilSquareIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/superbase";
import { toast } from "react-hot-toast";

export default function AccountSettings() {
  const user = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSaveProfile = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name },
    });
    if (error) toast.error("Failed to update profile");
    else toast.success("Profile updated successfully");
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast.error("Failed to update password");
    else toast.success("Password updated successfully");
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const userId = user.id;
    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      toast.error("Failed to upload avatar.");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl },
    });

    if (updateError) {
      toast.error("Failed to update avatar.");
    } else {
      toast.success("Avatar updated!");
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Personal Info Section */}
      <div className="md:flex md:items-start gap-8">
        <div className="min-w-[180px] md:w-1/4 mb-4 md:mb-0">
          <div className="font-semibold text-base">Personal Info</div>
          <div className="text-gray-400 text-sm">
            You can change your personal information settings here.
          </div>
        </div>
        <div className="flex-1">
          <section className="bg-white rounded-xl shadow p-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs mb-1 font-medium">Full Name</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs mb-1 font-medium">Email Address</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={email}
                  disabled
                  type="email"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 font-medium">Change Avatar</label>
                <div className="flex items-center gap-3">
                  <Image
                    src={user?.user_metadata?.avatar_url || "/images/img1.jpg"}
                    alt="avatar"
                    width={48}
                    height={48}
                    className="rounded-full border"
                  />
                  <button
                    type="button"
                    className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1.5 text-xs rounded-md font-medium transition hover:bg-blue-700"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={handleSaveProfile}
                  className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition flex items-center gap-2"
                >
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
        <div className="min-w-[180px] md:w-1/4 mb-4 md:mb-0">
          <div className="font-semibold text-base">Password</div>
          <div className="text-gray-400 text-sm">You can change your password here.</div>
        </div>
        <div className="flex-1">
          <section className="bg-white rounded-xl shadow p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1 font-medium">New Password</label>
                <div className="relative">
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                    onClick={() => setShowNewPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1 font-medium">Confirm Password</label>
                <div className="relative">
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={handlePasswordChange}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition"
            >
              Save
            </button>
          </section>
        </div>
      </div>

      {/* Deactivate Section */}
      <div className="md:flex md:items-start gap-8">
        <div className="min-w-[180px] md:w-1/4 mb-4 md:mb-0">
          <div className="font-semibold text-base text-red-500">Deactivate Account</div>
          <div className="text-gray-400 text-sm">
            This will shut down your account and you may cry, lol
          </div>
        </div>
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
