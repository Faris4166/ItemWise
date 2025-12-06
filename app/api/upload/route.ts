import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "no file" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = Date.now() + "-" + (file.name ?? "upload.jpg");
    const savePath = path.join(process.cwd(), "public", "uploads", filename);

    await writeFile(savePath, buffer);
    return NextResponse.json({ path: `/uploads/${filename}` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "upload error" }, { status: 500 });
  }
}
