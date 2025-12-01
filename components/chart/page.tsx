import React from "react";
import { ChartAreaInteractive } from "./UI/area-chart";
import { ChartLineDefault } from "./UI/Line-Chart";
import { ChartPieInteractive } from "./UI/PieChart-Interactive";
import { ChartBarHorizontal } from "./UI/chart-bar-horizontal";

export default function ChartUi() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <ChartLineDefault />
        <ChartPieInteractive />
        <ChartBarHorizontal />
      </div>
      <ChartAreaInteractive />
    </div>
  );
}
