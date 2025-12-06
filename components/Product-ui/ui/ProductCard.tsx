import React from "react";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Btn_edit from "./btnedit";

export default function ProductCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="w-full h-full">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image
            src="/demo-1.jpg"
            width={250}
            height={250}
            alt=""
            className=""
            id=""
          />
        </div>
        <CardHeader>
          <CardTitle id="name">Name</CardTitle>
          <CardDescription id="quantity">จำนวนเหลือ 50 ชิ้น</CardDescription>
          <CardAction>
            <Btn_edit />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p id="price"> 20 ฿</p>
        </CardContent>
      </Card>
    </div>
  );
}
