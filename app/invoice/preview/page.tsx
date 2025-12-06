"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import PromptPayQR from "@/components/PromptPayQR";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { formatBaht, calculateSubtotal } from "@/lib/utils";

export default function PreviewPage() {
  const [data, setData] = useState<any>(null);
  const ref = useRef<HTMLDivElement>(null);

  // ✅ โหลดข้อมูลจาก localStorage
  useEffect(() => {
    const saved = localStorage.getItem("invoiceData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  // ✅ ฟังก์ชันบันทึกเป็น PDF (เวอร์ชันเสถียร)
  const handleDownloadPDF = async () => {
    if (!ref.current) return;

    // ป้องกันภาพเบี้ยวจาก scroll
    window.scrollTo(0, 0);

    // ✅ ใช้ html2canvas โดยไม่ clone node
    const canvas = await html2canvas(ref.current, {
      backgroundColor: "#ffffff", // ป้องกัน error lab()
      scale: 2, // เพิ่มความคมชัด
      useCORS: true, // รองรับ QR code หรือรูปจาก external source
      foreignObjectRendering: false, // ป้องกัน iframe/foreignObject error
      logging: false,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("invoice.pdf");
  };

  // ✅ ฟังก์ชันพิมพ์
  const handlePrint = () => {
    window.print();
  };

  if (!data) return <p className="text-center mt-10">กำลังโหลด...</p>;

  const subtotal = calculateSubtotal(data.items);
  const total = subtotal + Number(data.labor || 0);

  return (
    <main className="container mx-auto p-6">
      {/* เนื้อหาใบแจ้งหนี้ */}
      <div
        ref={ref}
        className="bg-white p-8 shadow-md rounded-lg max-w-3xl mx-auto print:shadow-none print:p-0"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          ใบเสร็จ
        </h2>

        {/* ข้อมูลผู้ขาย / ผู้ซื้อ */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-1">ผู้ขาย</h3>
            <p>{data.seller.name}</p>
            <p>{data.seller.phone}</p>
            <p>{data.seller.address}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">ผู้ซื้อ</h3>
            <p>{data.buyer.name}</p>
            <p>{data.buyer.phone}</p>
          </div>
        </div>

        {/* ตารางสินค้า */}
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">ชื่อสินค้า</th>
              <th className="border p-2 text-center">จำนวน</th>
              <th className="border p-2 text-right">ราคา</th>
              <th className="border p-2 text-right">รวม</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((i: any, idx: number) => (
              <tr key={idx}>
                <td className="border p-2">{i.name}</td>
                <td className="border p-2 text-center">{i.qty}</td>
                <td className="border p-2 text-right">{formatBaht(i.price)}</td>
                <td className="border p-2 text-right">
                  {formatBaht(i.qty * i.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* รวมยอด */}
        <div className="text-right mt-6 space-y-1">
          <p>ค่าแรง: {formatBaht(data.labor)}</p>
          <p className="font-semibold text-lg">
            รวมทั้งหมด: {formatBaht(total)}
          </p>
        </div>

        {/* QR พร้อมเพย์ */}
        {data.promptPay?.id && (
          <div className="flex justify-start mt-8">
            <PromptPayQR id={data.promptPay.id} amount={total} />
          </div>
        )}

        {/* ข้อความท้าย */}
        <div className="text-sm text-gray-500 mt-8 border-t pt-4 text-center">
          <p>ขอบคุณที่ใช้บริการ</p>
        </div>
      </div>

      {/* ปุ่มควบคุม */}
      <div className="flex justify-center gap-4 mt-8 print:hidden">
        {/* <Button onClick={handleDownloadPDF} className="px-6">
          บันทึกเป็น PDF
        </Button> */}
        <Button variant="outline" onClick={handlePrint} className="px-6">
          พิมพ์ใบแจ้งหนี้
        </Button>
      </div>
    </main>
  );
}
