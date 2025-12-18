"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Bank from "./ui/bank";
import PromptPay from "./ui/PromptPay";

export default function Settings_ui() {
  // สร้าง State สำหรับเก็บข้อมูลจาก Form ทั้งหมด
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    shopName: "",
    address: "",
    bankNumber: "",
  });

  // ดึงข้อมูลเดิมจาก Backend เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          // อัปเดต State ด้วยข้อมูลที่ดึงมา (ถ้ามี)
          setFormData((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงใน Input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ฟังก์ชันสำหรับส่งข้อมูลไปบันทึกที่ Backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("บันทึกข้อมูลสำเร็จ!");
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="mt-2.5 w-full mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>ข้อมูลส่วนตัวและการติดต่อ</CardTitle>
          <CardDescription>
            กรุณาป้อนข้อมูลชื่อ-นามสกุล เบอร์โทรศัพท์
            และที่อยู่เพื่ออัปเดตบัญชีของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="settings-form" onSubmit={handleSubmit} className="grid gap-4">
            {/* ส่วนที่ 1: ชื่อ และ นามสกุล */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">ชื่อ</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="ชื่อจริงของคุณ"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">นามสกุล</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="นามสกุลของคุณ"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* ส่วนที่ 2: เบอร์โทรศัพท์ และ อีเมล */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                <Input
                  id="phone"
                  type="text" // เปลี่ยนเป็น text เพื่อรองรับเลข 0 นำหน้า
                  placeholder="08X-XXX-XXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="shopName">ชื่อร้าน</Label>
                <Input
                  id="shopName"
                  type="text"
                  placeholder="ร้านไก่ทอดหาดใหญ่"
                  value={formData.shopName}
                  onChange={handleChange}
                  required
                />
              </div>
              <Label htmlFor="address">ที่อยู่</Label>
              <Textarea
                id="address"
                placeholder="ป้อนที่อยู่ของคุณที่นี่"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bank">ธนาคาร</Label>
              <Bank />
              <Label htmlFor="bankNumber">เลขบัญชีธนาคาร</Label>
              <Input
                id="bankNumber"
                type="text"
                placeholder="เลขบัญชีธนาคาร"
                value={formData.bankNumber}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <PromptPay />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="settings-form" className="w-full">
            บันทึกข้อมูล
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}