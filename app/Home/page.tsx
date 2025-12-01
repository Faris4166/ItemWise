import ChartUi from "@/components/chart/page";
import React from "react";


export default function page() {
  return (
    <div className="px-2.5 grid grid-cols-1 grid-rows-1 gap-2">
      <h1 className="font-serif text-2xl">Home</h1>
      <hr />
      <ChartUi />
    </div>
  );
}
