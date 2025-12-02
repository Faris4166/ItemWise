import React from "react";

import { AppWindowIcon, CodeIcon } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";

export default function PromptPay() {
  return (
    <div>
      <Tabs defaultValue="number-Phone-PromptPay">
        <TabsList>
          <TabsTrigger value="number-Phone-PromptPay">Number Phone</TabsTrigger>
          <TabsTrigger value="number-ID-PromptPay">Number ID</TabsTrigger>
        </TabsList>
        <TabsContent value="number-Phone-PromptPay">
          <Card>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name-PromptPay">Name</Label>
                <Input id="Name-PromptPay" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="number-PromptPay">Number Phone</Label>
                <Input
                  id="number-Phone-PromptPay"
                  defaultValue="0650188390"
                  type="number"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="number-ID-PromptPay">
          <Card>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name-PromptPay">Name</Label>
                <Input id="Name-PromptPay" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="number-ID-PromptPay">Number ID </Label>
                <Input
                  id="number-ID-PromptPay"
                  defaultValue="0123456789"
                  type="number"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
