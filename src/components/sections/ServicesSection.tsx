"use client";

import { BuilderState } from "@/context/BuilderContext";
import { useBuilder } from "@/context/BuilderContext";

interface ServicesSectionProps {
  config?: BuilderState;
}

export default function ServicesSection({ config }: ServicesSectionProps) {
  // Use provided config or fall back to context
  const { config: contextConfig } = useBuilder();
  const finalConfig = config || contextConfig;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${
          finalConfig.theme === "light" ? "text-gray-900" : "text-white"
        }`}>
                     {finalConfig.content?.services?.title || "Our Services"}
        </h2>
        <div className={`w-16 md:w-24 h-1 mx-auto mb-6 md:mb-8 ${
          finalConfig.theme === "light" ? "bg-blue-600" : "bg-blue-400"
        }`}></div>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
          finalConfig.theme === "light" ? "text-gray-600" : "text-gray-300"
        }`}>
                     {finalConfig.content?.services?.subtitle || "We offer comprehensive digital solutions to help your business grow and succeed online."}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                 {(finalConfig.content?.services?.items || [
           {
             icon: "🎨",
             title: "Web Design",
             description: "Beautiful, responsive websites that captivate your audience and drive conversions.",
             features: ["UI/UX Design", "Responsive Layout", "Brand Integration"]
           },
           {
             icon: "⚡",
             title: "Web Development",
             description: "Custom web applications built with modern technologies and best practices.",
             features: ["Frontend Development", "Backend Systems", "API Integration"]
           },
           {
             icon: "📱",
             title: "Mobile Apps",
             description: "Native and cross-platform mobile applications for iOS and Android.",
             features: ["Native Development", "Cross-platform", "App Store Optimization"]
           },
           {
             icon: "🔧",
             title: "Maintenance",
             description: "Ongoing support and maintenance to keep your digital products running smoothly.",
             features: ["Regular Updates", "Security Monitoring", "Performance Optimization"]
           }
         ]).map((service, index) => (
          <div
            key={index}
            className={`group p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
              finalConfig.theme === "light"
                ? "bg-white shadow-lg hover:shadow-xl border border-gray-100"
                : "bg-gray-800 shadow-lg hover:shadow-xl border border-gray-700"
            }`}
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className={`text-xl font-bold mb-4 ${
              finalConfig.theme === "light" ? "text-gray-900" : "text-white"
            }`}>
              {service.title}
            </h3>
            <p className={`text-sm mb-6 leading-relaxed ${
              finalConfig.theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}>
              {service.description}
            </p>
            <ul className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className={`flex items-center text-sm ${
                  finalConfig.theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}>
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    finalConfig.theme === "light" ? "bg-blue-500" : "bg-blue-400"
                  }`}></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
  