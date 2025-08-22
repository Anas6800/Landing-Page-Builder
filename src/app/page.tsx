"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Personalized Landing Page Generator</h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Create your own landing page in minutes. Customize theme, layout, fonts,
        and content — all with a live preview.
      </p>
      <Link
        href="/builder"
        className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
      >
        🚀 Create Your Landing Page
      </Link>
    </main>
  );
}