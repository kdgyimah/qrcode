// app/(dashboard)/qrs/[id]/page.tsx
import QrEditViewClient from "@/components/QrEditPageClient";
import type { QrData } from "@/types/qr-generator";
import type { Folder } from "@/types/database"; // ✅ Use correct Folder type

interface QrEditViewPageProps {
  params: Promise<{ id: string }>;
}


export default async function QrEditViewPage({ params }: QrEditViewPageProps) {
  const { id } = await params; // ✅ Await because params is Promise<{ id }>


  try {
    // ✅ Fetch QR and Folder data concurrently for better performance
    const [qrRes, foldersRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/qrs/${id}`, { cache: "no-store" }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/folders`, { cache: "no-store" }),
    ]);

    if (!qrRes.ok) throw new Error(`Failed to fetch QR data for ID: ${id}`);
    if (!foldersRes.ok) throw new Error("Failed to fetch folders list");

    const [qr, folders]: [QrData, Folder[]] = await Promise.all([
      qrRes.json(),
      foldersRes.json(),
    ]);

    // ✅ Pass fetched data to the client-side editor
    return <QrEditViewClient id={id} qr={qr} folders={folders} />;
  } catch (error) {
    console.error("❌ Error loading QR edit view:", error);

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-2">
        <h2 className="text-xl font-semibold text-red-600">
          Failed to load QR edit data
        </h2>
        <p className="text-gray-500">
          Please check your internet connection or try again later.
        </p>
      </div>
    );
  }
}
