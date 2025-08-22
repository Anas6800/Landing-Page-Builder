"use client";

import { BuilderState } from "@/context/BuilderContext";
import { useBuilder } from "@/context/BuilderContext";

interface AboutSectionProps {
  config?: BuilderState;
}

export default function AboutSection({ config }: AboutSectionProps) {
  // Use provided config or fall back to context
  const { config: contextConfig } = useBuilder();
  const finalConfig = config || contextConfig;
  const theme = finalConfig.theme === "light";

  const about = finalConfig.content?.about || {};
  const stats = about.stats || [
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-bold mb-4 ${theme ? "text-gray-900" : "text-white"}`}>
          {about.title || "About Us"}
        </h2>
        <div className={`w-16 h-1 mx-auto mb-6 ${theme ? "bg-blue-600" : "bg-blue-400"}`}></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h3 className={`text-2xl font-semibold ${theme ? "text-gray-800" : "text-gray-100"}`}>
            {about.subtitle || "We Create Amazing Digital Experiences"}
          </h3>
          <div className={`text-lg ${theme ? "text-gray-600" : "text-gray-300"}`}>
            {(about.description || "Our team builds stunning websites and apps.").split('\n').map((p: string, i: number) => (
              <p key={i} className="mb-4 last:mb-0">{p}</p>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${theme ? "bg-blue-50" : "bg-gray-800"}`}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat: { number: string; label: string }, i: number) => (
              <div key={i} className="text-center">
                <div className={`text-3xl font-bold mb-2 ${theme ? "text-blue-600" : "text-blue-400"}`}>
                  {stat.number}
                </div>
                <div className={`${theme ? "text-gray-600" : "text-gray-300"}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
