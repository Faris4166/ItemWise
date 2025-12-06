"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent, 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"


// =========================================================================
// !!! NOTE: Placeholder สำหรับ QR Code Component และ PromptPay Logic !!!
// แนะนำให้ใช้ไลบรารีจริง เช่น react-qr-code
// =========================================================================

// Placeholder Component for QR Code
// **หากใช้ react-qr-code ให้เปลี่ยนโค้ดส่วนนี้เป็น import QRCode from 'react-qr-code';**
const QRCode = ({ value, size = 150 }) => {
  if (!value) return null;
  return (
    <div 
      style={{ width: size, height: size, backgroundColor: 'white', padding: '10px' }}
      className="border border-gray-300 rounded flex items-center justify-center"
    >
      <p className="text-sm text-center">
        [Placeholder: QR Code]
        <br />
        {value.substring(0, 20)}...
      </p>
    </div>
  );
};

// Placeholder Function for PromptPay QR String generation (EMV-TLV)
const generatePromptPayQrString = (promptPayId: string, amount: number) => {
    if (!promptPayId || amount <= 0) return "";
    // !!! นี่คือตัวอย่างที่ไม่สมบูรณ์: ผู้ใช้ต้องใช้ EMV-TLV payload generation ที่ถูกต้อง !!!
    // คุณสามารถใช้ไลบรารีที่ช่วยสร้าง PromptPay EMV-TLV string ได้
    return `PromptPayData_ID:${promptPayId}_Amount:${amount.toFixed(2)}`;
};


interface PayProps {
    totalAmount: number;
    promptPayId: string; // ID พร้อมเพย์ของร้านค้า (จาก page.tsx)
}


export default function Pay({ totalAmount, promptPayId }: PayProps) {
  // State สำหรับเลือกวิธีการชำระเงิน
  const [isPromptPaySelected, setIsPromptPaySelected] = useState(false);

  // คำนวณ QR Code String ใหม่เมื่อยอดรวมหรือ PromptPay ID เปลี่ยนไป
  const qrCodeValue = useMemo(() => {
    if (isPromptPaySelected && totalAmount > 0) {
        return generatePromptPayQrString(promptPayId, totalAmount);
    }
    return "";
  }, [isPromptPaySelected, totalAmount, promptPayId]);

  return (
    <div className="mt-2.5">
      <Card>
        <CardHeader>
          <CardTitle>ระบบชำระเงิน</CardTitle>
          <CardDescription>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Checkbox 
                  id="promptpay" 
                  checked={isPromptPaySelected}
                  onCheckedChange={(checked) => setIsPromptPaySelected(!!checked)}
                />
                <Label htmlFor="promptpay">พร้อมเพย์</Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="terms-2" defaultChecked />
                <div className="grid gap-2">
                  <Label htmlFor="terms-2">ธนาคาร</Label>
                </div>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        
        {/* ส่วนแสดง QR Code - แสดงเฉพาะเมื่อเลือก PromptPay และมียอดรวม > 0 */}
        {isPromptPaySelected && totalAmount > 0 && (
            <CardContent>
                <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold text-center">สแกนเพื่อชำระเงินด้วยพร้อมเพย์</h3>
                    <p className="text-2xl font-bold text-blue-600">
                        ยอดรวม: {totalAmount.toFixed(2)} บาท
                    </p>
                    {/* QR Code จะแสดงในหน้าพิมพ์ PDF ด้วย */}
                    <div className="p-2">
                      <QRCode value={qrCodeValue} size={150} />
                    </div>
                    <p className="text-sm text-gray-600 text-center print:hidden">
                        (กรุณาใช้แอปธนาคารสแกน QR Code นี้)
                    </p>
                </div>
            </CardContent>
        )}
      </Card>
    </div>
  );
}