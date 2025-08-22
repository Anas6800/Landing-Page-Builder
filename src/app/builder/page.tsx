"use client";

import Sidebar from "@/components/SideControls";
import PreviewPane from "@/components/PreviewPane";

export default function BuilderPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <PreviewPane />
      </div>
    </div>
  );
}
