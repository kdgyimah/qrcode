'use client';

import CreateQrButton from "@/components/myqrcodes/CreateQrButton";
import FolderManager from "@/components/myqrcodes/FolderManager";
import FolderSearch from "@/components/myqrcodes/FolderSearch";
import QrSearch from "@/components/myqrcodes/QrSearch";
import QrTabs from "@/components/myqrcodes/QrTabs";
import QrTable from "@/components/myqrcodes/QrCodeTable";
import DateSelector from "@/components/myqrcodes/DateSelector";
import FilterDropdown from "@/components/myqrcodes/FilterDropdown";
import type { QrData } from '@/types/qr-generator';

interface MyQrCodesClientProps {
  onShowDetail: (qr: QrData) => void;
  onShowEdit: (qr: QrData) => void;
  handleCreateClick: () => void;
}

const MyQrCodesClient: React.FC<MyQrCodesClientProps> = ({
  onShowDetail,
  onShowEdit,
  handleCreateClick,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My QR Codes</h1>
          <p className="text-gray-500 mt-2">Browse all QR Codes.</p>
        </div>
        <CreateQrButton onClick={handleCreateClick} />
      </div>

      <FolderSearch />
      <FolderManager />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <QrTabs />
        <div className="flex items-end gap-2">
          <QrSearch />
          <DateSelector />
          <FilterDropdown />
        </div>
      </div>

      <QrTable data={[]} onRowClick={onShowDetail} onRowEdit={onShowEdit} />
    </div>
  );
};

export default MyQrCodesClient;
