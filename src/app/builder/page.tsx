"use client";

import { useState } from "react";
import Sidebar from "@/components/SideControls";
import PreviewPane from "@/components/PreviewPane";

export default function BuilderPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Mobile Header with Toggle */}
      <div className="lg:hidden bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">🎨 Landing Page Builder</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          {isSidebarOpen ? "✕" : "⚙️"}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile by default, always visible on desktop */}
      <div className={`${isSidebarOpen ? 'fixed lg:relative' : 'hidden'} lg:block w-80 lg:w-96 bg-gray-50 h-full overflow-y-auto border-r border-gray-200 z-50 lg:z-auto left-0 top-0 lg:left-auto lg:top-auto`}>
        <Sidebar />
      </div>

      {/* Preview Area */}
      <div className="flex-1 h-full overflow-y-auto">
        <PreviewPane />
      </div>
    </div>
  );
}
