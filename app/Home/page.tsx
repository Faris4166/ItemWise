import ChartUi from "@/components/chart/page";
import React from "react";

export default function page() {
  return (
    // เปลี่ยนจาก className="px-2" เป็น className="w-full" หรือเพียงแค่ลบคลาส padding ที่จำกัดความกว้างออก
    <div className="w-full">
      <h1 className="font-serif text-2xl">Home</h1>
      <hr className="border-white" />
      <ChartUi />
    </div>
  );
}
