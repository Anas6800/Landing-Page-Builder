"use client";

import { useState } from "react";
import { useBuilder } from "@/context/BuilderContext";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { config } = useBuilder();
  const [isExporting, setIsExporting] = useState(false);

  const saveToLocalStorage = () => {
    const savedConfigs = JSON.parse(localStorage.getItem("landingPageConfigs") || "[]");
    const newConfig = {
      id: Date.now().toString(),
      config,
      createdAt: new Date().toISOString(),
    };
    savedConfigs.push(newConfig);
    localStorage.setItem("landingPageConfigs", JSON.stringify(savedConfigs));
    alert("Configuration saved to local storage!");
  };

  const exportAsHTML = async () => {
    setIsExporting(true);
    try {
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.hero.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: ${config.font === "serif" ? "Georgia, serif" : config.font === "mono" ? "monospace" : "system-ui, sans-serif"}; }
    </style>
</head>
<body class="${config.theme === "light" ? "bg-white text-gray-900" : config.theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white"}">
    <div class="min-h-screen p-10 flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold mb-4">${config.hero.title}</h1>
        <p class="text-lg mb-6">${config.hero.subtitle}</p>
        <a href="${config.hero.ctaLink}" class="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
          config.theme === "light"
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
            : config.theme === "dark"
            ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
            : "bg-white text-purple-600 hover:bg-gray-100 shadow-xl"
        }">
            ${config.hero.ctaText}
        </a>
    </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "landing-page.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const generatePreviewLink = () => {
    const configId = Date.now().toString();
    const savedConfigs = JSON.parse(localStorage.getItem("landingPageConfigs") || "[]");
    const newConfig = {
      id: configId,
      config,
      createdAt: new Date().toISOString(),
    };
    savedConfigs.push(newConfig);
    localStorage.setItem("landingPageConfigs", JSON.stringify(savedConfigs));
    
    const previewUrl = `${window.location.origin}/preview/${configId}`;
    navigator.clipboard.writeText(previewUrl);
    alert("Preview link copied to clipboard!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6">Export Options</h2>
        
        <div className="space-y-4">
          <button
            onClick={saveToLocalStorage}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            💾 Save to Local Storage
          </button>
          
          <button
            onClick={exportAsHTML}
            disabled={isExporting}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isExporting ? "Exporting..." : "📄 Export as HTML"}
          </button>
          
          <button
            onClick={generatePreviewLink}
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            🔗 Generate Preview Link
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-6 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
