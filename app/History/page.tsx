import { ReceiptsTable } from "@/components/History-ui/page";
import React from "react";

export default function page() {
  return (
    <div className="px-2">
      <h1 className="font-serif text-2xl">History</h1>
      <hr className="border-white" />
      <ReceiptsTable />
    </div>
  );
}
