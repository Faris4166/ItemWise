"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
// สมมติว่าคอมโพเนนต์ UI อยู่ใน paths ที่ถูกต้อง
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// กำหนด Type สำหรับรายการสินค้า
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// เพิ่ม Type สำหรับ Props
interface ReceiptProps {
  onTotalChange: (total: number) => void; 
}

export default function Receipt({ onTotalChange }: ReceiptProps) {
  // State สำหรับเก็บรายการสินค้าทั้งหมด
  const [products, setProducts] = useState<Product[]>([]);
  // State สำหรับ ID ถัดไป (ใช้ในการเพิ่มสินค้า)
  const [nextId, setNextId] = useState<number>(1);

  // --- 1. ฟังก์ชันเพิ่มสินค้า (Add Product) ---
  const handleAddProduct = () => {
    const newProduct: Product = {
      id: nextId,
      name: `สินค้า ${nextId}`,
      price: 0,
      quantity: 1,
    };
    // เพิ่มสินค้าใหม่เข้าใน array
    setProducts([...products, newProduct]);
    // อัปเดต nextId สำหรับสินค้าตัวถัดไป
    setNextId(nextId + 1);
  };

  // --- 2. ฟังก์ชันจัดการการเปลี่ยนแปลงของ Input (Update Product) ---
  const handleInputChange = (
    id: number,
    field: keyof Product,
    value: string
  ) => {
    // ใช้ parseFloat สำหรับ price และ quantity เพราะต้องเป็นตัวเลข
    const parsedValue =
      field === "price" || field === "quantity"
        ? parseFloat(value) || 0 // ถ้าแปลงไม่ได้ให้เป็น 0
        : value;

    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, [field]: parsedValue } // อัปเดตเฉพาะ field ที่เปลี่ยนไป
          : p
      )
    );
  };

  // --- 3. ฟังก์ชันลบสินค้า (Delete Product) ---
  const handleDeleteProduct = (id: number) => {
    // กรองเอาสินค้าที่มี ID ตรงกันออกไป
    setProducts(products.filter((p) => p.id !== id));
  };

  // --- 4. การคำนวณยอดรวม (Calculate Total) ---
  const totalAmount = products.reduce((sum, p) => {
    // คำนวณยอดรวมของแต่ละรายการ (ราคารวม = ราคา * จำนวน)
    const itemTotal = (p.price || 0) * (p.quantity || 0);
    return sum + itemTotal;
  }, 0);
  
  // --- 5. แจ้งยอดรวมไปยัง Parent Component เมื่อมีการเปลี่ยนแปลง ---
  useEffect(() => {
    onTotalChange(totalAmount);
  }, [totalAmount, onTotalChange]);


  return (
    <div className="mt-2.5 ">
      <Card>
        <CardHeader className="flex justify-between items-center flex-row">
          <h2 className="text-xl font-semibold">รายการใบเสร็จ</h2>
          {/* ซ่อนปุ่ม "เพิ่มสินค้า" เมื่อพิมพ์ */}
          <CardAction className="print:hidden"> 
            <Button onClick={handleAddProduct}>+ เพิ่มสินค้า</Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          {/* Header Row สำหรับรายการสินค้า */}
          <div className="flex w-full p-2 font-bold border-b border-gray-300 hidden sm:flex">
            <div className="w-1/4">ชื่อสินค้า</div>
            <div className="w-1/6 text-right">ราคา</div>
            <div className="w-1/6 text-right">จำนวน</div>
            <div className="w-1/6 text-right">รวม</div>
            {/* ซ่อนคอลัมน์สำหรับปุ่มลบเมื่อพิมพ์ */}
            <div className="w-1/6 text-right print:hidden"></div> 
          </div>

          {/* แสดงรายการสินค้าทั้งหมด */}
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row sm:items-center sm:gap-2 border-b py-4 sm:py-2"
            >
              {/* ชื่อสินค้า */}
              <div className="w-full sm:w-1/4 grid gap-1 mb-2 sm:mb-0">
                <Label htmlFor={`name-${product.id}`} className="sm:hidden">
                  ชื่อสินค้า
                </Label>
                <Input
                  id={`name-${product.id}`}
                  type="text"
                  placeholder="ชื่อสินค้า"
                  value={product.name}
                  onChange={(e) =>
                    handleInputChange(product.id, "name", e.target.value)
                  }
                />
              </div>

              {/* ราคา */}
              <div className="w-full sm:w-1/6 grid gap-1 mb-2 sm:mb-0">
                <Label htmlFor={`price-${product.id}`} className="sm:hidden">
                  ราคา
                </Label>
                <Input
                  id={`price-${product.id}`}
                  type="text" // ใช้ text เพื่อควบคุมการป้อนข้อมูล
                  placeholder="ราคา"
                  value={product.price === 0 ? "" : product.price.toString()}
                  onChange={(e) =>
                    handleInputChange(product.id, "price", e.target.value)
                  }
                  className="text-right"
                />
              </div>

              {/* จำนวน */}
              <div className="w-full sm:w-1/6 grid gap-1 mb-2 sm:mb-0">
                <Label htmlFor={`quantity-${product.id}`} className="sm:hidden">
                  จำนวน
                </Label>
                <Input
                  id={`quantity-${product.id}`}
                  type="text" // ใช้ text เพื่อควบคุมการป้อนข้อมูล
                  placeholder="จำนวน"
                  value={
                    product.quantity === 0 ? "" : product.quantity.toString()
                  }
                  onChange={(e) =>
                    handleInputChange(product.id, "quantity", e.target.value)
                  }
                  className="text-right"
                />
              </div>

              {/* ราคารวม (คำนวณ) */}
              <div className="w-full sm:w-1/6 grid gap-1 mb-2 sm:mb-0">
                <Label className="sm:hidden">รวม</Label>
                <Input
                  disabled
                  type="text"
                  value={(
                    (product.price || 0) * (product.quantity || 0)
                  ).toFixed(2)}
                  className="text-right bg-gray-100"
                />
              </div>

              {/* ปุ่มลบ - ซ่อนเมื่อพิมพ์ */}
              <div className="w-full sm:w-1/6 grid gap-1 print:hidden"> 
                <Label className="sm:hidden">ลบ</Label>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  ลบ
                </Button>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              ยังไม่มีสินค้าในใบเสร็จ โปรดคลิก 'เพิ่มสินค้า'
            </p>
          )}
        </CardContent>

        {/* สรุปยอดรวม */}
        <div className="p-6 border-t">
          <div className="flex justify-end items-center text-2xl font-bold">
            <span className="mr-4">รวมทั้งสิ้น:</span>
            <span className="text-blue-600">{totalAmount.toFixed(2)} บาท</span>
          </div>
        </div>
      </Card>
    </div>
  );
}