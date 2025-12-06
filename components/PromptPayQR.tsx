"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import promptpay from "promptpay-qr";

interface Props {
  id: string; // เบอร์โทร หรือเลขประชาชน
  amount?: number;
}

export default function PromptPayQR({ id, amount }: Props) {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (!id) return;
    const payload = promptpay(id, { amount });
    QRCode.toDataURL(payload, { width: 200 }).then(setQrUrl);
  }, [id, amount]);

  return (
    <div className="flex flex-col items-center">
      {qrUrl && <img src={qrUrl} alt="PromptPay QR" className="w-40 h-40" />}
      <p className="text-sm text-gray-600 mt-2">พร้อมเพย์: {id}</p>
    </div>
  );
}
