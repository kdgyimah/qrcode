"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { FaFolder } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FolderManager() {
  const [folderName, setFolderName] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    if (!folderName.trim()) return;
    // Logic to create the folder, e.g., call an API or update state
    console.log("Creating folder:", folderName);
    setFolderName("");
    setOpen(false);
  };

  const handleCancel = () => {
    setFolderName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-50 bg-white h-30 border border-gray-300 px-12 py-2 rounded-lg transition text-sm">
          <div className="items-center text-blue-600 justify-center flex mb-2">
            <FaFolder size={40} />
          </div>
          <div className="flex gap-2">
            <FolderPlus size={20} className="text-blue-600" />
            <span className="text-blue-600 font-medium">New Folder</span>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <Input
            placeholder="Enter folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!folderName.trim()}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
