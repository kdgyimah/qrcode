import QrEditViewClient from "@/components/QrEditPageClient";

interface QrEditViewPageProps {
  params: { id: string };
}

export default function QrEditViewPage({ params }: QrEditViewPageProps) {
  return <QrEditViewClient id={params.id} />; 
}
