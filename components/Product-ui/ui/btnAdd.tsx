import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
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
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function BtnAdd() {
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">Add Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue="Pedro Duarte" />
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
                <Empty className="border border-dashed">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Upload />
                    </EmptyMedia>
                    <EmptyTitle>Cloud Storage Empty</EmptyTitle>
                    <EmptyDescription>
                      Upload files to your cloud storage to access them
                      anywhere.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Input
                      id="picture"
                      type="file"
                      name="picture"
                      accept=".jpg, .jpeg, .png, .svg"
                    />
                  </EmptyContent>
                </Empty>
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
    </div>
  );
}
