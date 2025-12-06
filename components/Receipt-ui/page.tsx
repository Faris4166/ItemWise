"use client";

import React, { useState, useCallback } from 'react'
import From_me from './ui/from-ui/from_me'
import From_customer from './ui/from-ui/from_customer'
import Receipt from './ui/Receipt'
import Pay from './ui/from-ui/pay'
import { Button } from "@/components/ui/button"; 


export default function Receipt_page() {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  // *** ข้อมูลพร้อมเพย์ของร้านค้า ***
  // โปรดเปลี่ยน "0812345678" เป็น PromptPay ID (เบอร์โทร หรือ เลขผู้เสียภาษี) ของคุณ
  const PROMPTPAY_ID = "0812345678"; 

  // Callback function สำหรับรับยอดรวมจาก Receipt component
  const handleTotalChange = useCallback((total: number) => {
    setTotalAmount(total);
  }, []);

  // ฟังก์ชันสำหรับเรียกหน้าต่างพิมพ์ของเบราว์เซอร์
  const handlePrint = () => {
    window.print();
  };
    
  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* ปุ่มพิมพ์ - ซ่อนเมื่อทำการพิมพ์ */}
      <div className="mb-6 flex justify-end">
        <Button onClick={handlePrint} className="print:hidden">
          พิมพ์ใบเสร็จ (PDF)
        </Button>
      </div>
      
      <div id="receipt-document">
        <From_me />
        {/* ส่ง totalAmount และ PromptPay ID ไปให้ Pay component */}
        <Pay totalAmount={totalAmount} promptPayId={PROMPTPAY_ID} /> 
        <From_customer />
        {/* ส่ง callback function ไปให้ Receipt component */}
        <Receipt onTotalChange={handleTotalChange} /> 
      </div>
    </div>
  )
}