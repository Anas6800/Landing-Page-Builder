"use client";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import ContactSection from "./sections/ContactSection";
import { useBuilder } from "@/context/BuilderContext";

export default function PreviewPane() {
  const { config } = useBuilder();

  const getThemeClasses = () => {
    switch (config.theme) {
      case "light":
        return "bg-white";
      case "dark":
        return "bg-gray-900";
      case "gradient":
        return "bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600";
      default:
        return "bg-white";
    }
  };

  const getFontClasses = () => {
    switch (config.font) {
      case "serif":
        return "font-serif";
      case "mono":
        return "font-mono";
      default:
        return "font-sans";
    }
  };

    const renderHeroContent = () => {
    const content = (
      <>


        {/* Main Title */}
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${
          config.theme === "light" ? "text-gray-900" : "text-white"
        }`}>
          {config.hero.title}
        </h1>

        {/* Subtitle */}
        <p className={`text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed ${
          config.theme === "light" ? "text-gray-600" : "text-gray-300"
        }`}>
          {config.hero.subtitle}
        </p>

                 {/* CTA Buttons */}
         <div className="flex flex-col sm:flex-row gap-4 items-center">
           <a
             href={config.hero.ctaLink}
             className={`group relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 ${
               config.theme === "light"
                 ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                 : config.theme === "dark"
                 ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl"
                 : "bg-white text-purple-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl"
             }`}
           >
             <span className="relative z-10">{config.hero.ctaText}</span>
             <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
               config.theme === "light"
                 ? "bg-gradient-to-r from-blue-700 to-blue-800"
                 : config.theme === "dark"
                 ? "bg-gradient-to-r from-blue-600 to-blue-700"
                 : "bg-gradient-to-r from-gray-50 to-gray-100"
             }`}></div>
           </a>
           
           {/* Secondary button functionality - will be re-enabled after deployment */}
           
           {config.hero.secondaryCtaText && config.hero.secondaryCtaLink && (
             <a
               href={config.hero.secondaryCtaLink}
               className={`group relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                 config.theme === "light"
                   ? "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                   : config.theme === "dark"
                   ? "bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900"
                   : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600"
               }`}
             >
               <span className="relative z-10">{config.hero.secondaryCtaText}</span>
             </a>
           )}
          
         </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="text-center">
          </div>
          </div>
      </>
    );

    switch (config.layout) {
      case "centered":
        return (
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
            {content}
          </div>
        );
      case "left-image":
        return (
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              {content}
            </div>
            <div className="order-1 lg:order-2">
              {config.images.heroImage ? (
                <div className="relative group">
                  <div className={`absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200`}></div>
                  <img 
                    src={config.images.heroImage} 
                    alt="Hero" 
                    className="relative w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className={`relative group w-full h-80 lg:h-96 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden ${
                  config.theme === "light" 
                    ? "bg-gradient-to-br from-blue-50 to-indigo-100" 
                    : "bg-gradient-to-br from-gray-800 to-gray-700"
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl`}></div>
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <span className={`text-xl font-medium ${
                      config.theme === "light" ? "text-gray-600" : "text-gray-300"
                    }`}>
                      Add Your Hero Image
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "full-width":
        return (
          <div className="w-full text-center max-w-6xl mx-auto">
            {content}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
            {content}
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${getThemeClasses()} ${getFontClasses()}`}>
      {/* Hero Section */}
      <div className={`min-h-screen p-6 md:p-10 lg:p-16 relative overflow-hidden ${
        config.layout === "centered" ? "flex flex-col items-center justify-center" :
        config.layout === "full-width" ? "flex flex-col items-center justify-center" :
        "flex flex-col justify-center"
      }`}>
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            config.theme === "light" 
              ? "bg-blue-400" 
              : config.theme === "dark"
              ? "bg-blue-600"
              : "bg-white/20"
          }`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            config.theme === "light" 
              ? "bg-purple-400" 
              : config.theme === "dark"
              ? "bg-purple-600"
              : "bg-white/20"
          }`}></div>
        </div>
        
        <div className="relative z-10">
          {renderHeroContent()}
        </div>
      </div>

      {/* Sections Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {config.sections.about && <AboutSection />}
          {config.sections.services && <ServicesSection />}
          {config.sections.testimonials && <TestimonialsSection />}
          {config.sections.contact && <ContactSection />}
        </div>
      </div>
    </div>
  );
}
