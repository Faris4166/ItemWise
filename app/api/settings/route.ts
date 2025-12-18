import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "settings.json");

// ดึงข้อมูล (GET)
export async function GET() {
  try {
    if (!fs.existsSync(path.join(process.cwd(), "data"))) {
      fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({});
    }
    const fileContent = fs.readFileSync(filePath, "utf8");
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// บันทึกข้อมูล (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!fs.existsSync(path.join(process.cwd(), "data"))) {
      fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf8");
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}