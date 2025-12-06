import Receipt_page from "@/components/Receipt-ui/page";
import React from "react";

export default function page() {
  return (
    <div className="px-2 grid grid-cols-1 grid-rows-1 gap-2">
      <h1 className="font-serif text-2xl">Receipt</h1>
      <hr />
      <Receipt_page />
    </div>
  );
}
