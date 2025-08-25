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

      {/* Desktop Toggle Button */}
      <button
        aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`hidden lg:flex fixed top-4 ${isSidebarOpen ? 'lg:left-[25rem]' : 'lg:left-4'} z-50 h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-200`}
      >
        <span className="relative block w-5 h-4">
          <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all duration-300 ${isSidebarOpen ? 'top-2 rotate-45' : 'top-0 rotate-0'}`}></span>
          <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all duration-300 ${isSidebarOpen ? 'top-2 opacity-0' : 'top-2 opacity-100'}`}></span>
          <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all duration-300 ${isSidebarOpen ? 'top-2 -rotate-45' : 'top-4 rotate-0'}`}></span>
        </span>
      </button>

      {/* Sidebar - collapsible on both mobile and desktop */}
      <div className={`${isSidebarOpen ? 'fixed left-0 top-0 z-50 block lg:relative lg:block' : 'hidden lg:hidden'} w-80 lg:w-96 bg-gray-50 h-full overflow-y-auto border-r border-gray-200 lg:z-auto`}>
        <Sidebar />
      </div>

      {/* Preview Area */}
      <div className="flex-1 h-full overflow-y-auto">
        <PreviewPane />
      </div>
    </div>
  );
}
