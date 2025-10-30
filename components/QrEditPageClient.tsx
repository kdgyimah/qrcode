"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowDownToLine,
  Edit2,
  FolderPlus,
  Loader2,
  Plus,
  Share2,
  Trash2,
} from "lucide-react";
import type { Folder, CreateFolder } from "@/types/database";
import type { QrData } from "@/types/qr-generator";
import QrEditView from "./QrEditView";

interface QrEditPageClientProps {
  id: string;
  qr: QrData;
  folders: Folder[];
}

export default function QrEditPageClient({
  qr,
  folders: initialFolders,
}: QrEditPageClientProps) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { toast } = useToast();

  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  // ✅ Create Folder
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a folder name.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreatingFolder(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("User not authenticated");

      const newFolderData: CreateFolder = {
        name: newFolderName.trim(),
        user_id: user.id,
      };

      const { data, error } = await supabase
        .from("folders")
        .insert([newFolderData])
        .select()
        .single<Folder>();

      if (error) throw error;

      setFolders((prev) => [...prev, data]);
      setNewFolderName("");
      setShowNewFolderDialog(false);

      toast({
        title: "Folder Created",
        description: "New folder has been added successfully.",
      });
    } catch (error) {
      console.error("Error creating folder:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create folder.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingFolder(false);
    }
  };

  // ✅ Delete QR Code
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const { error } = await supabase.from("qr_codes").delete().eq("id", qr.id);
      if (error) throw error;

      toast({
        title: "Deleted!",
        description: "QR code removed successfully.",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete QR code.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  // ✅ Download QR Code
  const handleDownload = async () => {
    try {
      const response = await fetch(qr.qrImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${qr.name.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.click();

      URL.revokeObjectURL(url);

      toast({
        title: "Downloaded!",
        description: "QR code saved successfully.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download QR code.",
        variant: "destructive",
      });
    }
  };

  // ✅ Share QR Code
  const handleShare = async () => {
    const shareUrl = qr.link || window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: qr.name,
          text: `Check out this QR code: ${qr.name}`,
          url: shareUrl,
        });
        toast({ title: "Shared!", description: "QR code shared successfully." });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Share error:", error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied!",
          description: "Copied to clipboard.",
        });
      } catch {
        toast({
          title: "Error",
          description: "Could not copy link.",
          variant: "destructive",
        });
      }
    }
  };

  // ✅ Handle Save Refresh
  const handleQrSaved = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: updatedFolders, error } = await supabase
          .from("folders")
          .select("*")
          .eq("user_id", user.id)
          .order("name", { ascending: true })
          .returns<Folder[]>();

        if (!error && updatedFolders) setFolders(updatedFolders);
      }

      router.refresh();
    } catch (error) {
      console.error("Error reloading folders:", error);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 bg-[#fafafd] flex flex-col gap-6">
      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold mb-1">
            Edit QR Details
          </h1>
          <div className="text-sm text-gray-400">
            Created{" "}
            {new Date(qr.created).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}{" "}
            · Last Modified{" "}
            {new Date(qr.lastModified).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </div>
        </div>

        {/* ===== Actions ===== */}
        <div className="flex flex-wrap gap-2">
          {/* Delete */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <button
                title="Delete"
                className="rounded-full p-2 border border-gray-200 hover:bg-red-50 transition"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete QR Code</DialogTitle>
                <DialogDescription>
                  Are you sure? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Share */}
          <button
            title="Share"
            onClick={handleShare}
            className="rounded-full p-2 border border-gray-200 hover:bg-blue-50 transition"
          >
            <Share2 size={18} className="text-blue-500" />
          </button>

          {/* Edit */}
          <button
            title="Edit"
            className="rounded px-4 py-2 border border-blue-200 text-blue-700 bg-white flex items-center gap-1 font-medium hover:bg-blue-50 transition"
          >
            <Edit2 size={18} />
            <span className="hidden sm:inline">Edit</span>
          </button>

          {/* Download */}
          <button
            title="Download"
            onClick={handleDownload}
            className="rounded px-4 py-2 bg-blue-600 text-white flex items-center gap-1 font-medium hover:bg-blue-700 transition"
          >
            <ArrowDownToLine size={18} />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">QR Code Details</h2>
              <Dialog
                open={showNewFolderDialog}
                onOpenChange={setShowNewFolderDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <FolderPlus className="w-4 h-4 mr-2" />
                    New Folder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                    <DialogDescription>
                      Enter a name for your new folder.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="newFolderName">Folder Name</Label>
                    <Input
                      id="newFolderName"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      placeholder="e.g., Campaigns"
                      className="mt-1"
                      onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewFolderDialog(false);
                        setNewFolderName("");
                      }}
                      disabled={isCreatingFolder}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateFolder}
                      disabled={isCreatingFolder}
                    >
                      {isCreatingFolder ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Create
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Embedded edit form */}
            <QrEditView
              qr={qr}
              availableFolders={folders}
              onSaved={handleQrSaved}
            />
          </div>
        </div>

        {/* Right Panel - QR Preview */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center sticky top-6">
            <Image
              src={qr.qrImage}
              alt="QR Code"
              width={192}
              height={192}
              className="w-40 h-40 sm:w-48 sm:h-48 object-contain mb-6"
            />
            <Button
              onClick={handleDownload}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 flex items-center justify-center gap-2 font-medium transition"
            >
              <ArrowDownToLine size={18} />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
