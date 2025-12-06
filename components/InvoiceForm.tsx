"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { calculateSubtotal, formatBaht } from "@/lib/utils";

export default function InvoiceForm() {
  const router = useRouter();

  const [seller, setSeller] = useState({ name: "", phone: "", address: "" });
  const [buyer, setBuyer] = useState({ name: "", phone: "" });
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }]);
  const [labor, setLabor] = useState(0);
  const [promptPay, setPromptPay] = useState({ id: "", type: "phone" });

  const subtotal = calculateSubtotal(items);
  const total = subtotal + Number(labor || 0);

  const handleAddItem = () => setItems([...items, { name: "", qty: 1, price: 0 }]);

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = field === "name" ? value : Number(value);
    setItems(newItems);
  };

  const handlePreview = () => {
    const data = { seller, buyer, items, labor, promptPay };
    localStorage.setItem("invoiceData", JSON.stringify(data));
    router.push("../");
  };

  return (
    <Card className="p-6 space-y-6 max-w-4xl mx-auto my-6 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">สร้างใบแจ้งหนี้</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* ---------------- ผู้ขาย ---------------- */}
        <section>
          <h3 className="font-semibold mb-3">ข้อมูลผู้ขาย</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="ชื่อผู้ขาย"  onChange={(e) => setSeller({ ...seller, name: e.target.value })} />
            <Input placeholder="เบอร์โทร" onChange={(e) => setSeller({ ...seller, phone: e.target.value })} />
            <Input placeholder="ที่อยู่" onChange={(e) => setSeller({ ...seller, address: e.target.value })} />
          </div>
        </section>

        {/* ---------------- ผู้ซื้อ ---------------- */}
        <section>
          <h3 className="font-semibold mb-3">ข้อมูลผู้ซื้อ</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="ชื่อผู้ซื้อ" onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} />
            <Input placeholder="เบอร์โทร" onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })} />
          </div>
        </section>

        {/* ---------------- รายการสินค้า ---------------- */}
        <section>
          <h3 className="font-semibold mb-3">รายการสินค้า</h3>

          {/* หัวตาราง */}
          <div className="grid grid-cols-5 gap-4 font-semibold border-b pb-2">
            <div>ชื่อสินค้า</div>
            <div className="text-center">จำนวน</div>
            <div className="text-center">ราคา (฿)</div>
            <div className="text-right">รวม (฿)</div>
            <div className="text-center">ลบ</div>
          </div>

          {/* แถวสินค้า */}
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 items-center py-2 border-b">
              <Input
                value={item.name}
                placeholder="ชื่อสินค้า"
                onChange={(e) => handleChange(i, "name", e.target.value)}
              />
              <Input
                type="number"
                value={item.qty}
                placeholder="จำนวน"
                className="text-center"
                onChange={(e) => handleChange(i, "qty", e.target.value)}
              />
              <Input
                type="number"
                value={item.price}
                placeholder="ราคา"
                className="text-center"
                onChange={(e) => handleChange(i, "price", e.target.value)}
              />
              <div className="text-right font-medium">{item.qty * item.price} ฿</div>
              <div className="text-center">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveItem(i)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={handleAddItem} className="mt-3">
            <Plus className="w-4 h-4 mr-2" /> เพิ่มรายการ
          </Button>
        </section>

        {/* ---------------- ค่าแรง ---------------- */}
        <section className="border-t pt-4">
          <div className="flex justify-between items-center">
            <Label>ค่าแรง</Label>
            <Input
              className="w-32 text-right"
              type="number"
              value={labor}
              onChange={(e) => setLabor(Number(e.target.value))}
            />
          </div>
          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>รวมทั้งหมด:</span>
            <span>{formatBaht(total)}</span>
          </div>
        </section>

        {/* ---------------- PromptPay ---------------- */}
        <section className="border-t pt-4">
          <h3 className="font-semibold mb-3">PromptPay</h3>
          <div className="flex gap-4 flex-wrap">
            <select
              className="border rounded px-2 py-1"
              value={promptPay.type}
              onChange={(e) => setPromptPay({ ...promptPay, type: e.target.value as "phone" | "citizen" })}
            >
              <option value="phone">เบอร์โทรศัพท์</option>
              <option value="citizen">เลขบัตรประชาชน</option>
            </select>
            <Input
              placeholder="เบอร์โทร / เลขบัตร"
              onChange={(e) => setPromptPay({ ...promptPay, id: e.target.value })}
            />
          </div>
        </section>

        {/* ---------------- ปุ่ม ---------------- */}
        <div className="flex justify-end gap-4 pt-6">
          <Button onClick={handlePreview}>ดูตัวอย่างก่อนพิมพ์</Button>
        </div>
      </CardContent>
    </Card>
  );
}
