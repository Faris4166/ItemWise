import React from "react";
import Image from "next/image";
import { Ellipsis } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export default function ProductCard() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4">
      <Card>
        <CardHeader className="justify-center items-start">
          <Image
            src="/oli.jpg"
            width={250}
            height={250}
            alt=""
            className="min-w-[250px] min-h-[250px] object-cover "
          />
        </CardHeader>
        <CardHeader>
          <CardTitle>
            ชื่อสินค้า
          </CardTitle>
          <CardDescription>
            <h1>จำนวนคงเหลือ 5 ชิ้น</h1>
          </CardDescription>
          <CardDescription>
            <p className="red">500 ฿</p>
          </CardDescription>
          <CardAction>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Ellipsis />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue="Pedro Duarte"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="price">Price</Label>
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>฿</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput placeholder="0.00" type="number" />
                        <InputGroupAddon align="inline-end">
                          <InputGroupText>THB</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        defaultValue="10"
                        type="number"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="picture">Picture</Label>
                      <Input id="picture" type="file" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
