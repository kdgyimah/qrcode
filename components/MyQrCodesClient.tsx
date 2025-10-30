"use client";

import { useEffect, useState } from "react";
import CreateQrButton from "@/components/myqrcodes/CreateQrButton";
import QrSearch from "@/components/myqrcodes/QrSearch";
import QrTabs, { QrTabType } from "@/components/myqrcodes/QrTabs";
import QrTable from "@/components/myqrcodes/QrCodeTable";
import DateSelector, { DateRange } from "@/components/myqrcodes/DateSelector";
import FilterDropdown, {
  StatusFilter,
  TypeFilter,
} from "@/components/myqrcodes/FilterDropdown";
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
import type { Folder, QRCode } from "@/types/database";
import QrEditView from "@/components/QrEditView";
import { qrCodeService } from "@/lib/services/qrcodes";
import { folderService } from "@/lib/services/folders";

interface MyQrCodesClientProps {
  onShowDetail: (qr: QrData) => void;
  onShowEdit: (qr: QrData) => void;
  handleCreateClick: () => void;
}

const MyQrCodesClient: React.FC<MyQrCodesClientProps> = ({
  onShowDetail,
  handleCreateClick,
}) => {
  const [folderName, setFolderName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [editQr, setEditQr] = useState<QrData | null>(null);

  // Filter and search state - updated to match child component types
  const [qrSearchTerm, setQrSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<QrTabType>("all");
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilters, setTypeFilters] = useState<TypeFilter[]>([]); // Changed to array

  // Database state
  const [folders, setFolders] = useState<Folder[]>([]);
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Load data from database
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [foldersData, qrCodesData] = await Promise.all([
        folderService.getFolders(),
        qrCodeService.getQRCodes(),
      ]);
      setFolders(foldersData);
      setQrCodes(qrCodesData);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Convert database QRCode to QrData format for compatibility
  const convertToQrData = (qr: QRCode): QrData => {
    const folder = folders.find((f) => f.id === qr.folder_id);
    return {
      id: qr.id,
      name: qr.name,
      type: qr.is_active ? "dynamic" : "static",
      category: qr.type as QrData["category"],
      link: qr.data?.url || "",
      folder: folder?.name || "Uncategorized",
      created: new Date(qr.created_at).toISOString().split("T")[0],
      lastModified: qr.updated_at
        ? new Date(qr.updated_at).toISOString().split("T")[0]
        : new Date(qr.created_at).toISOString().split("T")[0],
      scans: qr.scans_count,
      lastScan: "",
      visits: qr.scans_count,
      status: qr.is_active ? "Active" : "Inactive",
      description: "",
      tags: [],
      qrImage: qr.qr_image_url || "/images/sample-qr.png",
      qrCodeUrl: qr.qr_image_url || "",
    };
  };

  // Enhanced filtering function with all filter criteria
  const getFilteredQrCodes = () => {
    return qrCodes.filter((qr) => {
      // Filter by selected folder
      if (selectedFolder) {
        const folder = folders.find((f) => f.id === qr.folder_id);
        if (folder?.name !== selectedFolder) return false;
      }

      // Filter by search term
      if (qrSearchTerm) {
        const searchLower = qrSearchTerm.toLowerCase();
        const matchesSearch =
          qr.name.toLowerCase().includes(searchLower) ||
          qr.type.toLowerCase().includes(searchLower) ||
          (qr.data?.url && qr.data.url.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Filter by tab type
      if (selectedTab !== "all") {
        if (selectedTab === "scheduled") {
          // Add your scheduled QR code logic here
          // Example: return qr.is_scheduled === true;
          // For now, we'll return true to show all until you implement scheduled logic
          return true;
        } else {
          const qrType = qr.is_active ? "dynamic" : "static";
          if (qrType !== selectedTab) return false;
        }
      }

      // Filter by status
      if (statusFilter !== "all") {
        const isActive = statusFilter === "active";
        if (qr.is_active !== isActive) return false;
      }

      // Filter by type (from FilterDropdown) - updated for array
      if (typeFilters.length > 0) {
        const qrType = qr.is_active ? "dynamic" : "static";
        if (!typeFilters.includes(qrType as TypeFilter)) return false;
      }

      // Filter by date range
      if (dateRange) {
        const qrDate = new Date(qr.created_at);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        if (startDate && qrDate < startDate) return false;
        if (endDate && qrDate > endDate) return false;
      }

      return true;
    });
  };

  // Filter folders by search term
  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get filtered QR codes
  const filteredQrCodes = getFilteredQrCodes();

  // Calculate pagination
  const totalItems = filteredQrCodes.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get paginated data
  const paginatedQrCodes = filteredQrCodes.slice(startIndex, endIndex);
  const displayedQrData = paginatedQrCodes.map(convertToQrData);

  // Calculate showing range
  const showingStart = totalItems > 0 ? startIndex + 1 : 0;
  const showingEnd = Math.min(endIndex, totalItems);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedFolder,
    qrSearchTerm,
    selectedTab,
    statusFilter,
    typeFilters,
    dateRange,
  ]);


  // Calculate QR count per folder
  const getFolderQRCount = (folderId: string) => {
    return qrCodes.filter((qr) => qr.folder_id === folderId).length;
  };

  // Handle create/edit folder
  const handleSaveFolder = async () => {
    if (!folderName.trim()) return;

    try {
      if (editingFolder) {
        await folderService.updateFolder(editingFolder.id, {
          name: folderName,
        });
      } else {
        await folderService.createFolder({ name: folderName, user_id: "" });
      }
      await loadData();
      setOpenDialog(false);
      setFolderName("");
      setEditingFolder(null);
    } catch (err) {
      console.error("Error saving folder:", err);
      setError("Failed to save folder. Please try again.");
    }
  };

  // Handle delete folder
  const handleDeleteFolder = async (folderId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this folder? QR codes will not be deleted."
      )
    ) {
      return;
    }

    try {
      await folderService.deleteFolder(folderId);
      await loadData();
      if (selectedFolder === folders.find((f) => f.id === folderId)?.name) {
        setSelectedFolder(null);
      }
    } catch (err) {
      console.error("Error deleting folder:", err);
      setError("Failed to delete folder. Please try again.");
    }
  };

  // Handler functions for child components
  const handleTabChange = (tab: QrTabType) => {
    setSelectedTab(tab);
  };

  const handleSearchChange = (search: string) => {
    setQrSearchTerm(search);
  };

  const handleDateRangeChange = (range: DateRange | null) => {
    setDateRange(range);
  };

  const handleStatusFilterChange = (status: StatusFilter) => {
    setStatusFilter(status);
  };

  const handleTypeFiltersChange = (types: TypeFilter[]) => {
    setTypeFilters(types);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setQrSearchTerm("");
    setSelectedTab("all");
    setStatusFilter("all");
    setTypeFilters([]);
    setDateRange(null);
  };

  const hasActiveFilters =
    qrSearchTerm ||
    selectedTab !== "all" ||
    statusFilter !== "all" ||
    typeFilters.length > 0 ||
    dateRange;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-gray-600">Loading your QR codes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 overflow-x-hidden">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My QR Codes</h1>
          <p className="text-gray-500 mt-2">
            {qrCodes.length} QR Code{qrCodes.length !== 1 ? "s" : ""} in{" "}
            {folders.length} folder{folders.length !== 1 ? "s" : ""}
          </p>
        </div>
        <CreateQrButton onClick={handleCreateClick} />
      </div>

      {/* Folder Search */}
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
            ← Show All QR Codes
          </Button>
        </div>
      )}

      {/* Folders Section */}
      <div className="relative overflow-hidden">
        {/* Mobile: Horizontal Scrollable Carousel */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-4 min-w-max">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <button
                  onClick={() => {
                    setFolderName("");
                    setEditingFolder(null);
                    setOpenDialog(true);
                  }}
                  className="snap-start border border-dashed border-blue-300 rounded-xl flex flex-col justify-center items-center text-blue-600 bg-blue-50 
                     py-6 px-4 hover:bg-blue-100 transition cursor-pointer w-[160px] flex-shrink-0 h-[140px]"
                >
                  <FaFolder size={36} />
                  <span className="mt-2 font-medium text-sm">New Folder</span>
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingFolder ? "Edit Folder" : "Create New Folder"}
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-2">
                  <Input
                    placeholder="Enter folder name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveFolder();
                    }}
                  />
                </div>
                <DialogFooter className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOpenDialog(false);
                      setFolderName("");
                      setEditingFolder(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveFolder}
                    disabled={!folderName.trim()}
                  >
                    {editingFolder ? "Save" : "Create"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Mobile Folder Cards */}
            {filteredFolders.map((folder) => {
              const qrCount = getFolderQRCount(folder.id);
              return (
                <div
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.name)}
                  className={`snap-start cursor-pointer border shadow-sm bg-white rounded-xl flex flex-col justify-between
                    transition hover:shadow-md p-4 w-[160px] flex-shrink-0 h-[140px]
                    ${
                      selectedFolder === folder.name
                        ? "ring-2 ring-blue-500 border-blue-500"
                        : "border-gray-200 hover:border-blue-400"
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2 items-center min-w-0 flex-1">
                      <FaFolder
                        className="text-blue-600 flex-shrink-0"
                        size={20}
                      />
                      <span className="font-semibold text-gray-800 text-sm truncate">
                        {folder.name}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="ml-1"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-500" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            setFolderName(folder.name);
                            setEditingFolder(folder);
                            setOpenDialog(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFolder(folder.id);
                          }}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-col gap-1 text-xs text-gray-600">
                    <span className="font-medium">
                      {qrCount} QR Code{qrCount !== 1 ? "s" : ""}
                    </span>
                    <span className="text-gray-400">
                      {new Date(folder.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet and Desktop: Grid Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <button
                onClick={() => {
                  setFolderName("");
                  setEditingFolder(null);
                  setOpenDialog(true);
                }}
                className="border border-dashed border-blue-300 rounded-xl flex flex-col justify-center items-center text-blue-600 bg-blue-50 
                   py-6 px-4 hover:bg-blue-100 transition cursor-pointer"
              >
                <FaFolder size={36} />
                <span className="mt-2 font-medium text-sm">New Folder</span>
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingFolder ? "Edit Folder" : "Create New Folder"}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-2">
                <Input
                  placeholder="Enter folder name"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveFolder();
                  }}
                />
              </div>
              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpenDialog(false);
                    setFolderName("");
                    setEditingFolder(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveFolder}
                  disabled={!folderName.trim()}
                >
                  {editingFolder ? "Save" : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Desktop Folder Cards */}
          {filteredFolders.map((folder) => {
            const qrCount = getFolderQRCount(folder.id);
            return (
              <div
                key={folder.id}
                onClick={() => setSelectedFolder(folder.name)}
                className={`cursor-pointer border shadow-sm bg-white rounded-xl flex flex-col justify-between
                  transition hover:shadow-md p-4
                  ${
                    selectedFolder === folder.name
                      ? "ring-2 ring-blue-500 border-blue-500"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-2 items-center min-w-0">
                    <FaFolder className="text-blue-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-800 text-sm truncate">
                      {folder.name}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="w-5 h-5 text-gray-500" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setFolderName(folder.name);
                          setEditingFolder(folder);
                          setOpenDialog(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFolder(folder.id);
                        }}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-600 mt-3">
                  <span>
                    {qrCount} QR Code{qrCount !== 1 ? "s" : ""}
                  </span>
                  <span>
                    {new Date(folder.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Controls Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <QrTabs selectedTab={selectedTab} onTabChange={handleTabChange} />

        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 w-full sm:w-auto">
          <QrSearch
            searchTerm={qrSearchTerm}
            onSearchChange={handleSearchChange}
            placeholder="Search QR codes..."
            // debounceMs={300}
          />

          <div className="flex gap-2">
            <DateSelector
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
            />

            <FilterDropdown
              selectedStatus={statusFilter}
              selectedTypes={typeFilters}
              onStatusChange={handleStatusFilterChange}
              onTypesChange={handleTypeFiltersChange}
            />
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {showingStart}-{showingEnd} of {totalItems} QR codes
        {hasActiveFilters && (
          <span className="ml-2">
            •{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={clearAllFilters}
            >
              Clear filters
            </Button>
          </span>
        )}
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
            availableFolders={folders} // ✅ Pass full folder objects
            onClose={() => setEditQr(null)}
            onSaved={async () => {
              setEditQr(null);
              await loadData();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MyQrCodesClient;
