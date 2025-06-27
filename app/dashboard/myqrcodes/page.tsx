// app/dashboard/myqrcodes/page.tsx
import MyQrCodesClient from '../components/MyQrCodesClient';

import type { QrData } from '../types';

export default function Page() {
  const handleShowDetail = (qr: QrData) => {
    // Implement show detail logic here
  };

  const handleShowEdit = (qr: QrData) => {
    // Implement show edit logic here
  };

  return <MyQrCodesClient onShowDetail={handleShowDetail} onShowEdit={handleShowEdit} />;
}
