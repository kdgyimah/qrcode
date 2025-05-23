// app/dashboard/components/CreateQrButton.tsx

"use client";

import { Plus } from "lucide-react";

export default function CreateQrButton() {
  return (
    <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
      <Plus size={16} />
      <span className="font-medium">Create QR Code</span>
    </button>
  );
}