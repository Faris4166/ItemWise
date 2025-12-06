import React from 'react'
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

export default function From_customer() {
  return (
    <div className="mt-2.5 w-full  mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>ข้อมูลลูกค้า</CardTitle>
          <CardDescription>
            ใส่ข้อมูลของลูกค้าและตรวจสอบ
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
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            บันทึกข้อมูล
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
