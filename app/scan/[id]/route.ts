import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; 

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ Await the params

  // 1️⃣ Fetch QR code
  const { data, error } = await supabase
    .from("qr_codes")
    .select("destination_url, scans")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "QR not found" }, { status: 404 });
  }

  // 2️⃣ Update scan count + last_scan
  await supabase
    .from("qr_codes")
    .update({
      scans: (data.scans || 0) + 1,
      last_scan: new Date().toISOString(),
    })
    .eq("id", id);

  // 3️⃣ Redirect to actual destination
  return NextResponse.redirect(data.destination_url);
}