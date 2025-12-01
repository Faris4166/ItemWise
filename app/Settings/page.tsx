import Settings_ui from "@/components/Settings-ui/page";
import React from "react";

export default function page() {
  return (
    <div className="w-full">
      <h1 className="font-serif text-2xl">Settings</h1>
      <hr className="border-white" />
      <Settings_ui />
    </div>
  );
}
