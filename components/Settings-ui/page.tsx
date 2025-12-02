import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Bank from "./ui/bank";
import PromptPay from "./ui/PromptPay";

export default function Settings_ui() {
  return (
    <div className="mt-2.5 w-full  mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>ข้อมูลส่วนตัวและการติดต่อ</CardTitle>
          <CardDescription>
            กรุณาป้อนข้อมูลชื่อ-นามสกุล เบอร์โทรศัพท์
            และที่อยู่เพื่ออัปเดตบัญชีของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            {/* ส่วนที่ 1: ชื่อ และ นามสกุล (2 คอลัมน์บนหน้าจอขนาดกลางขึ้นไป) */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">ชื่อ</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="ชื่อจริงของคุณ"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">นามสกุล</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="นามสกุลของคุณ"
                  required
                />
              </div>
            </div>

            {/* ส่วนที่ 2: เบอร์โทรศัพท์ และ อีเมล (2 คอลัมน์) */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                <Input
                  id="phone"
                  type="number"
                  placeholder="08X-XXX-XXXX"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">ที่อยู่</Label>
              <Textarea
                placeholder="Type your message here."
                id="address"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bank">Bank</Label>
              <Bank />
              <Label htmlFor="number_Bank">number Bank</Label>
              <Input type="number" id="number_Bank" placeholder="number Bank" />{" "}
            </div>
            <div className="grid gap-2">
              <PromptPay />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            บันทึกข้อมูล
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
