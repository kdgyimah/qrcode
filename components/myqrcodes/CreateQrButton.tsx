'use client';

import { Plus } from "lucide-react";
import type { FC } from "react";

interface CreateQrButtonProps {
  onClick: () => void;
}

const CreateQrButton: FC<CreateQrButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors"
  >
    <Plus size={16} />
    <span className="font-medium">Create QR Code</span>
  </button>
);

export default CreateQrButton;