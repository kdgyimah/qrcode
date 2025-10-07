
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
  try {
    const qrs = await prisma.qrCode.findMany({
      include: { folder: true },
      orderBy: { created: "desc" },
    });
    return NextResponse.json(qrs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch QR codes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newQr = await prisma.qrCode.create({
      data: {
        name: body.name,
        type: body.type,
        category: body.category,
        link: body.link,
        folderId: body.folderId,
        description: body.description,
        tags: body.tags,
        qrImage: body.qrImage,
        qrCodeUrl: body.qrCodeUrl,
      },
    });
    return NextResponse.json(newQr);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create QR" }, { status: 500 });
  }
}

