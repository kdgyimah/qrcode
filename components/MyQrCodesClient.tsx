"use client";

import { useEffect, useState } from "react";
import CreateQrButton from "@/components/myqrcodes/CreateQrButton";
import QrSearch from "@/components/myqrcodes/QrSearch";
import QrTabs from "@/components/myqrcodes/QrTabs";
import QrTable from "@/components/myqrcodes/QrCodeTable";
import DateSelector from "@/components/myqrcodes/DateSelector";
import FilterDropdown from "@/components/myqrcodes/FilterDropdown";
import { FaFolder } from "react-icons/fa";
import { MoreHorizontal, Search } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { QrData } from "@/types/qr-generator";
import QrEditView from "@/components/QrEditView";

interface MyQrCodesClientProps {
  onShowDetail: (qr: QrData) => void;
  onShowEdit: (qr: QrData) => void;
  handleCreateClick: () => void;
}

interface Folder {
  name: string;
  createdAt: string;
  qrCount: number;
}

const mockQrData: QrData[] = [
  {
    id: "qr-001",
    name: "Website QR",
    type: "static",
    category: "link",
    link: "https://myportfolio.com",
    folder: "Marketing",
    created: "2025-07-01",
    lastModified: "2025-07-03",
    scans: 45,
    lastScan: "2025-07-04",
    visits: 32,
    status: "Active",
    description: "My portfolio site",
    tags: ["portfolio", "web", "home"],
    qrImage: "/images/sample-qr.png",
    qrCodeUrl: "https://cdn.qrgen.com/qr-001",
  },
  {
    id: "qr-002",
    name: "Contact QR",
    type: "dynamic",
    category: "contact",
    link: "https://mycrm.com/vcard?id=123",
    folder: "Contacts",
    created: "2025-06-15",
    lastModified: "2025-06-20",
    scans: 112,
    lastScan: "2025-07-04",
    visits: 89,
    status: "Active",
    description: "Scan to get my business card",
    tags: ["contact", "vcard", "networking"],
    qrImage: "/images/sample-qr.png",
    qrCodeUrl: "https://cdn.qrgen.com/qr-002",
  },
  {
    id: "qr-003",
    name: "App Download",
    type: "static",
    category: "app",
    link: "https://apps.apple.com/myapp",
    folder: "Product",
    created: "2025-07-02",
    lastModified: "2025-07-02",
    scans: 27,
    lastScan: "2025-07-03",
    visits: 18,
    status: "Inactive",
    description: "Download our iOS app",
    tags: ["app", "ios", "download"],
    qrImage: "/images/sample-qr.png",
  },
  {
    id: "qr-004",
    name: "PDF Brochure",
    type: "static",
    category: "pdf",
    link: "/files/brochure.pdf",
    folder: "Documents",
    created: "2025-06-01",
    lastModified: "2025-06-15",
    scans: 5,
    lastScan: "2025-06-28",
    visits: 3,
    status: "Active",
    description: "Product brochure",
    tags: ["pdf", "brochure", "product"],
    qrImage: "/images/sample-qr.png",
  },
];

const MyQrCodesClient: React.FC<MyQrCodesClientProps> = ({
  onShowDetail,
  handleCreateClick,
}) => {
  const [folderName, setFolderName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [editQr, setEditQr] = useState<QrData | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("qr-folders");
    if (stored) {
      setFolders(JSON.parse(stored));
    } else {
      const folderMap = mockQrData.reduce<Record<string, Folder>>((acc, qr) => {
        if (!acc[qr.folder]) {
          acc[qr.folder] = {
            name: qr.folder,
            createdAt: qr.created,
            qrCount: 1,
          };
        } else {
          acc[qr.folder].qrCount += 1;
        }
        return acc;
      }, {});
      setFolders(Object.values(folderMap));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("qr-folders", JSON.stringify(folders));
  }, [folders]);

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedQrData = selectedFolder
    ? mockQrData.filter((qr) => qr.folder === selectedFolder)
    : mockQrData;

  const availableFolderNames = folders.map((f) => f.name);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My QR Codes</h1>
          <p className="text-gray-500 mt-2">Browse all QR Codes.</p>
        </div>
        <CreateQrButton onClick={handleCreateClick} />
      </div>

      <div className="w-full relative">
        <Search className="absolute left-3 top-3 w-5 h-4 text-gray-500" />
        <Input
          className="pl-9"
          placeholder="Search folders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {selectedFolder && (
        <div className="mt-2">
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => setSelectedFolder(null)}
          >
            Show All QR Codes
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <button
              onClick={() => {
                setFolderName("");
                setEditingIndex(null);
                setOpenDialog(true);
              }}
              className="w-[232px] h-[119px] border border-gray-300 rounded-lg flex flex-col justify-center items-center text-blue-600 bg-white"
            >
              <FaFolder size={40} />
              <span className="mt-2 font-medium">New Folder</span>
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? "Edit Folder" : "Create New Folder"}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-2">
              <Input
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!folderName.trim()) return;
                  setFolders((prev) => {
                    const updated = [...prev];
                    if (editingIndex !== null) {
                      updated[editingIndex].name = folderName;
                    } else {
                      updated.push({
                        name: folderName,
                        createdAt: new Date().toISOString().split("T")[0],
                        qrCount: 0,
                      });
                    }
                    return updated;
                  });
                  setOpenDialog(false);
                }}
                disabled={!folderName.trim()}
              >
                {editingIndex !== null ? "Save" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {filteredFolders.map((folder, index) => (
          <div
            key={index}
            onClick={() => setSelectedFolder(folder.name)}
            className={`cursor-pointer w-[232px] h-[119px] border border-gray-200 shadow-sm bg-white flex flex-col justify-between ${
              selectedFolder === folder.name ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex justify-between items-start px-4 pt-3">
              <div className="flex gap-2 items-center">
                <FaFolder className="text-blue-600" />
                <span className="font-semibold text-gray-800 text-sm truncate max-w-[120px]">
                  {folder.name}
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setFolderName(folder.name);
                      setEditingIndex(index);
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <hr className="my-2 border-t border-gray-200" />
            <div className="flex justify-between items-center text-xs text-gray-600 px-4 pb-2">
              <span>{folder.qrCount} QR Codes</span>
              <span>{folder.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <QrTabs />
        <div className="flex items-end gap-2">
          <QrSearch />
          <DateSelector />
          <FilterDropdown />
        </div>
      </div>

      <QrTable
        data={displayedQrData}
        onRowClick={onShowDetail}
        onRowEdit={(qr) => {
          setEditQr(qr);
        }}
      />

      {editQr && (
        <div className="mt-10">
          <QrEditView
            qr={editQr}
            availableFolders={availableFolderNames}
            onClose={() => setEditQr(null)}
            onSaved={(updatedQr) => {
              setEditQr(null);

              if (updatedQr.folder !== editQr.folder) {
                setFolders((prev) => {
                  const updated = [...prev];

                  const oldIndex = updated.findIndex(
                    (f) => f.name === editQr.folder
                  );
                  if (oldIndex !== -1) {
                    updated[oldIndex].qrCount = Math.max(
                      0,
                      updated[oldIndex].qrCount - 1
                    );
                  }

                  const newIndex = updated.findIndex(
                    (f) => f.name === updatedQr.folder
                  );
                  if (newIndex !== -1) {
                    updated[newIndex].qrCount += 1;
                  } else {
                    updated.push({
                      name: updatedQr.folder,
                      createdAt: new Date().toISOString().split("T")[0],
                      qrCount: 1,
                    });
                  }

                  return updated;
                });
              }

              console.log("Updated QR:", updatedQr);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MyQrCodesClient;
