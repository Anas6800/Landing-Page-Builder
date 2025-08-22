"use client";

import { BuilderState } from "@/context/BuilderContext";
import { useBuilder } from "@/context/BuilderContext";

interface TestimonialsSectionProps {
  config?: BuilderState;
}

export default function TestimonialsSection({ config }: TestimonialsSectionProps) {
  // Use provided config or fall back to context
  const { config: contextConfig } = useBuilder();
  const finalConfig = config || contextConfig;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${
          finalConfig.theme === "light" ? "text-gray-900" : "text-white"
        }`}>
                     {finalConfig.content?.testimonials?.title || "What Our Clients Say"}
        </h2>
        <div className={`w-16 md:w-24 h-1 mx-auto mb-6 md:mb-8 ${
          finalConfig.theme === "light" ? "bg-blue-600" : "bg-blue-400"
        }`}></div>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
          finalConfig.theme === "light" ? "text-gray-600" : "text-gray-300"
        }`}>
                     {finalConfig.content?.testimonials?.subtitle || "Don't just take our word for it. Here's what our satisfied clients have to say about working with us."}
        </p>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                 {(finalConfig.content?.testimonials?.items || [
           {
             quote: "Working with this team was an absolute pleasure. They delivered exactly what we needed and more. The attention to detail and quality of work exceeded our expectations.",
             author: "Sarah Johnson",
             position: "CEO, TechStart Inc.",
             avatar: "👩‍💼"
           },
           {
             quote: "The website they built for us has significantly increased our online presence and customer engagement. Their expertise and professionalism are unmatched in the industry.",
             author: "Michael Chen",
             position: "Marketing Director, GrowthCo",
             avatar: "👨‍💼"
           },
           {
             quote: "From concept to launch, the entire process was smooth and transparent. They truly understand what makes a great user experience and delivered beyond our wildest dreams.",
             author: "Emily Rodriguez",
             position: "Founder, Creative Studio",
             avatar: "👩‍🎨"
           }
         ]).map((testimonial, index) => (
          <div
            key={index}
            className={`group p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
              finalConfig.theme === "light"
                ? "bg-white shadow-lg hover:shadow-xl border border-gray-100"
                : "bg-gray-800 shadow-lg hover:shadow-xl border border-gray-700"
            }`}
          >
            <div className="mb-6">
              <div className="text-3xl mb-4">💬</div>
              <p className={`italic text-lg leading-relaxed ${
                finalConfig.theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            
            <div className="flex items-center">
              <div className="text-2xl mr-4">{testimonial.avatar}</div>
              <div>
                <div className={`font-semibold ${
                  finalConfig.theme === "light" ? "text-gray-900" : "text-white"
                }`}>
                  {testimonial.author}
                </div>
                <div className={`text-sm ${
                  finalConfig.theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}>
                  {testimonial.position}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${
          finalConfig.theme === "light" 
            ? "bg-blue-50 text-blue-600" 
            : "bg-gray-700 text-blue-400"
        }`}>
        </div>
      </div>
    </section>
  );
}
  