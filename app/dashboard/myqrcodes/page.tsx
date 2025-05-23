import CreateQrButton from "@/components/myqrcodes/CreateQrButton";
import FolderManager from "@/components/myqrcodes/FolderManager";
import FolderSearch from "@/components/myqrcodes/FolderSearch";
import QrSearch from "@/components/myqrcodes/QrSearch";
import QrTabs from "@/components/myqrcodes/QrTabs";
import QrTable from "@/components/myqrcodes/QrCodeTable";

// Import your DateSelector
import DateSelector from "@/components/myqrcodes/DateSelector";
import FilterDropdown from "@/components/myqrcodes/FilterDropdown";

export default function MyQrCodesPage() {
  return (
    <div className="space-y-6">
      {/* Top Bar: Create Button + Folder Manager */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My QR Codes</h1>
          <p className="text-gray-500 mt-2">Browse all QR Codes.</p>
        </div>
        <CreateQrButton />
      </div>
      {/* Search Area: Folder Search */}
      <FolderSearch />
      <div>
        <FolderManager />
      </div>

      {/* Tabs + Search + Date Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <QrTabs />
        <div className="flex items-end gap-2">
          <QrSearch />
          <DateSelector />
          <FilterDropdown />
        </div>
      </div>

      {/* QR Code Table */}
      <QrTable />
    </div>
  );
}
