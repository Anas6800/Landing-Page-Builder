"use client";

import { BuilderState } from "@/context/BuilderContext";
import { useBuilder } from "@/context/BuilderContext";

interface ContactSectionProps {
  config?: BuilderState;
}

export default function ContactSection({ config }: ContactSectionProps) {
  // Use provided config or fall back to context
  const { config: contextConfig } = useBuilder();
  const finalConfig = config || contextConfig;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${
          finalConfig.theme === "light" ? "text-gray-900" : "text-white"
        }`}>
                     {finalConfig.content?.contact?.title || "Get In Touch"}
        </h2>
        <div className={`w-16 md:w-24 h-1 mx-auto mb-6 md:mb-8 ${
          finalConfig.theme === "light" ? "bg-blue-600" : "bg-blue-400"
        }`}></div>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
          finalConfig.theme === "light" ? "text-gray-600" : "text-gray-300"
        }`}>
                     {finalConfig.content?.contact?.subtitle || "Ready to start your next project? Let&apos;s discuss how we can help bring your vision to life."}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Form */}
        <div className={`p-6 md:p-8 rounded-2xl ${
          finalConfig.theme === "light"
            ? "bg-white shadow-lg border border-gray-100"
            : "bg-gray-800 shadow-lg border border-gray-700"
        }`}>
          <h3 className={`text-2xl font-bold mb-6 ${
            finalConfig.theme === "light" ? "text-gray-900" : "text-white"
          }`}>
            Send us a message
          </h3>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  finalConfig.theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}>
                  First Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    finalConfig.theme === "light"
                      ? "border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                      : "border-gray-600 focus:border-blue-400 bg-gray-700 text-white"
                  }`}
                  placeholder="John"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  finalConfig.theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}>
                  Last Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    finalConfig.theme === "light"
                      ? "border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                      : "border-gray-600 focus:border-blue-400 bg-gray-700 text-white"
                  }`}
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                finalConfig.theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}>
                Email Address
              </label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  finalConfig.theme === "light"
                    ? "border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                    : "border-gray-600 focus:border-blue-400 bg-gray-700 text-white"
                }`}
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                finalConfig.theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}>
                Message
              </label>
              <textarea
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                  finalConfig.theme === "light"
                    ? "border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                    : "border-gray-600 focus:border-blue-400 bg-gray-700 text-white"
                }`}
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
                finalConfig.theme === "light"
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                  : "bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
              }`}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className={`text-2xl font-bold mb-6 ${
              finalConfig.theme === "light" ? "text-gray-900" : "text-white"
            }`}>
              Contact Information
            </h3>
            <p className={`text-lg leading-relaxed ${
              finalConfig.theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}>
              We&apos;d love to hear from you. Reach out to us through any of these channels and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${
                finalConfig.theme === "light" ? "bg-blue-100" : "bg-blue-900"
              }`}>
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${
                  finalConfig.theme === "light" ? "text-gray-900" : "text-white"
                }`}>
                  Email
                </h4>
                                 <p className={`${
                   finalConfig.theme === "light" ? "text-gray-600" : "text-gray-300"
                 }`}>
                   {finalConfig.content?.contact?.email || "hello@example.com"}
                 </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${
                finalConfig.theme === "light" ? "bg-blue-100" : "bg-blue-900"
              }`}>
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${
                  finalConfig.theme === "light" ? "text-gray-900" : "text-white"
                }`}>
                  Phone
                </h4>
                                 <p className={`${
                   finalConfig.theme === "light" ? "text-gray-600" : "text-gray-300"
                 }`}>
                   {finalConfig.content?.contact?.phone || "+1 (555) 123-4567"}
                 </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${
                finalConfig.theme === "light" ? "bg-blue-100" : "bg-blue-900"
              }`}>
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${
                  finalConfig.theme === "light" ? "text-gray-900" : "text-white"
                }`}>
                  Office
                </h4>
                                 <p className={`${
                   finalConfig.theme === "light" ? "text-gray-600" : "text-gray-300"
                 }`}>
                   {(finalConfig.content?.contact?.address || "123 Business Street\nSuite 100\nCity, State 12345").split('\n').map((line, index) => (
                     <span key={index}>
                       {line}
                       {index < (finalConfig.content?.contact?.address || "123 Business Street\nSuite 100\nCity, State 12345").split('\n').length - 1 && <br />}
                     </span>
                   ))}
                 </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg ${
            finalConfig.theme === "light" ? "bg-blue-50" : "bg-gray-700"
          }`}>
            <h4 className={`font-semibold mb-2 ${
              finalConfig.theme === "light" ? "text-blue-900" : "text-blue-300"
            }`}>
              Business Hours
            </h4>
                         <p className={`text-sm ${
               finalConfig.theme === "light" ? "text-blue-700" : "text-blue-200"
             }`}>
               {(finalConfig.content?.contact?.hours || "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed").split('\n').map((line, index) => (
                 <span key={index}>
                   {line}
                   {index < (finalConfig.content?.contact?.hours || "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed").split('\n').length - 1 && <br />}
                 </span>
               ))}
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
