"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useBuilder } from "@/context/BuilderContext";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { config } = useBuilder();
  const [isExporting, setIsExporting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!isOpen || !mounted) return null;

  const saveToLocalStorage = () => {
    const savedConfigs = JSON.parse(localStorage.getItem("landingPageConfigs") || "[]");
    const newConfig = { id: Date.now().toString(), config, createdAt: new Date().toISOString() };
    savedConfigs.push(newConfig);
    localStorage.setItem("landingPageConfigs", JSON.stringify(savedConfigs));
    alert("Configuration saved to local storage!");
  };

  const exportAsHTML = async () => {
    setIsExporting(true);
    try {
      const hero = config.hero || {};
      const about = config.content?.about;
      const services = config.content?.services;
      const testimonials = config.content?.testimonials;
      const contact = config.content?.contact;
  
      // Get theme classes
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

      const getTextColor = (light: string, dark: string) => {
        if (config.theme === "light") return light;
        if (config.theme === "dark") return dark;
        if (config.theme === "gradient") return "text-white";
        return light;
      };

      const getBgColor = (light: string, dark: string) => {
        if (config.theme === "light") return light;
        if (config.theme === "dark") return dark;
        if (config.theme === "gradient") return "bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600";
        return light;
      };

      // Render hero content based on layout
      const renderHeroContent = () => {
        const content = `
          ${config.images.logo ? `
          <div class="mb-8 flex justify-center">
            <img src="${config.images.logo}" alt="Logo" class="h-12 md:h-16 lg:h-20 object-contain" />
          </div>
          ` : ''}
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${getTextColor("text-gray-900", "text-white")}">
            ${hero.title || "Welcome to My Hero Section"}
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed ${getTextColor("text-gray-600", "text-gray-300")}">
            ${hero.subtitle || "Built with Next.js + Tailwind"}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <a href="${hero.ctaLink || "#"}" ${(hero.ctaLink && (hero.ctaLink.startsWith('http') || hero.ctaLink.startsWith('mailto:'))) ? 'target="_blank" rel="noopener noreferrer"' : 'target="_self"'} class="group relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 ${
              config.theme === "light"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                : config.theme === "dark"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl"
                : "bg-white text-purple-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl"
            }">
              <span class="relative z-10">${hero.ctaText || "Get Started"}</span>
              <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        config.theme === "light"
                  ? "bg-gradient-to-r from-blue-700 to-blue-800"
          : config.theme === "dark"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700"
                  : "bg-gradient-to-r from-gray-50 to-gray-100"
              }"></div>
            </a>
          </div>
        `;

        switch (config.layout) {
          case "centered":
            return `<div class="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">${content}</div>`;
          case "left-image":
            const imageSection = config.images.heroImage 
              ? `<div class="order-1 lg:order-2">
                  <div class="relative group">
                    <div class="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                    <img src="${config.images.heroImage}" alt="Hero" class="relative w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>`
              : `<div class="order-1 lg:order-2">
                  <div class="relative group w-full h-80 lg:h-96 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden ${getBgColor("bg-gradient-to-br from-blue-50 to-indigo-100", "bg-gradient-to-br from-gray-800 to-gray-700")}">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl"></div>
                    <div class="relative z-10 text-center">
                      <div class="text-6xl mb-4">🎨</div>
                      <span class="text-xl font-medium ${getTextColor("text-gray-600", "text-gray-300")}">Add Your Hero Image</span>
                    </div>
                  </div>
                </div>`;
            return `<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div class="order-2 lg:order-1">${content}</div>
              ${imageSection}
            </div>`;
          case "full-width":
            return `<div class="flex flex-col items-center justify-center w-full text-center">${content}</div>`;
          default:
            return `<div class="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">${content}</div>`;
        }
      };

      // Render sections
      const renderAboutSection = () => {
        if (!config.sections.about) return "";
        const stats = about?.stats || [
          { number: "500+", label: "Projects Completed" },
          { number: "50+", label: "Happy Clients" },
          { number: "5+", label: "Years Experience" },
          { number: "24/7", label: "Support" }
        ];
        
        return `
          <section class="py-12">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold mb-4 ${getTextColor("text-gray-900", "text-white")}">
                ${about?.title || "About Us"}
              </h2>
              <div class="w-16 h-1 mx-auto mb-6 ${config.theme === "light" ? "bg-blue-600" : "bg-blue-400"}"></div>
            </div>
            <div class="grid lg:grid-cols-2 gap-8 items-center">
              <div class="space-y-6">
                <h3 class="text-2xl font-semibold ${getTextColor("text-gray-800", "text-gray-100")}">
                  ${about?.subtitle || "We Create Amazing Digital Experiences"}
                </h3>
                <div class="text-lg ${getTextColor("text-gray-600", "text-gray-300")}">
                  ${(about?.description || "Our team builds stunning websites and apps.").split('\n').map((p: string) => `<p class="mb-4 last:mb-0">${p}</p>`).join('')}
                </div>
              </div>
              <div class="p-6 rounded-2xl ${config.theme === "light" ? "bg-blue-50" : "bg-gray-800"}">
                <div class="grid grid-cols-2 gap-4">
                  ${stats.map((stat: { number: string; label: string }) => `
                    <div class="text-center">
                      <div class="text-3xl font-bold mb-2 ${config.theme === "light" ? "text-blue-600" : "text-blue-400"}">${stat.number}</div>
                      <div class="${getTextColor("text-gray-600", "text-gray-300")}">${stat.label}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </section>
        `;
      };

      const renderServicesSection = () => {
        if (!config.sections.services) return "";
        const servicesItems = services?.items || [
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
        ];

        return `
          <section class="py-12 md:py-16 lg:py-20">
            <div class="text-center mb-12 md:mb-16">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${getTextColor("text-gray-900", "text-white")}">
                ${services?.title || "Our Services"}
              </h2>
              <div class="w-16 md:w-24 h-1 mx-auto mb-6 md:mb-8 ${config.theme === "light" ? "bg-blue-600" : "bg-blue-400"}"></div>
              <p class="text-lg md:text-xl max-w-2xl mx-auto ${getTextColor("text-gray-600", "text-gray-300")}">
                ${services?.subtitle || "We offer comprehensive digital solutions to help your business grow and succeed online."}
              </p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              ${servicesItems.map((service: { icon: string; title: string; description: string; features: string[] }) => `
                <div class="group p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  config.theme === "light"
                    ? "bg-white shadow-lg hover:shadow-xl border border-gray-100"
                    : "bg-gray-800 shadow-lg hover:shadow-xl border border-gray-700"
                }">
                  <div class="text-4xl mb-4">${service.icon}</div>
                  <h3 class="text-xl font-bold mb-4 ${getTextColor("text-gray-900", "text-white")}">${service.title}</h3>
                  <p class="text-sm mb-6 leading-relaxed ${getTextColor("text-gray-600", "text-gray-300")}">${service.description}</p>
                  <ul class="space-y-2">
                    ${service.features.map((feature: string) => `
                      <li class="flex items-center text-sm ${getTextColor("text-gray-500", "text-gray-400")}">
                        <span class="w-2 h-2 rounded-full mr-3 ${config.theme === "light" ? "bg-blue-500" : "bg-blue-400"}"></span>
                        ${feature}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </section>
        `;
      };

      const renderTestimonialsSection = () => {
        if (!config.sections.testimonials) return "";
        const testimonialsItems = testimonials?.items || [
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
        ];

        return `
          <section class="py-12 md:py-16 lg:py-20">
            <div class="text-center mb-12 md:mb-16">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${getTextColor("text-gray-900", "text-white")}">
                ${testimonials?.title || "What Our Clients Say"}
              </h2>
              <div class="w-16 md:w-24 h-1 mx-auto mb-6 md:mb-8 ${config.theme === "light" ? "bg-blue-600" : "bg-blue-400"}"></div>
              <p class="text-lg md:text-xl max-w-2xl mx-auto ${getTextColor("text-gray-600", "text-gray-300")}">
                ${testimonials?.subtitle || "Don't just take our word for it. Here's what our satisfied clients have to say about working with us."}
              </p>
            </div>
            <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              ${testimonialsItems.map((testimonial: { quote: string; author: string; position: string; avatar: string }) => `
                <div class="group p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  config.theme === "light"
                    ? "bg-white shadow-lg hover:shadow-xl border border-gray-100"
                    : "bg-gray-800 shadow-lg hover:shadow-xl border border-gray-700"
                }">
                  <div class="mb-6">
                    <div class="text-3xl mb-4">💬</div>
                    <p class="italic text-lg leading-relaxed ${getTextColor("text-gray-700", "text-gray-300")}">
                      &ldquo;${testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div class="flex items-center">
                    <div class="text-2xl mr-4">${testimonial.avatar}</div>
                    <div>
                      <div class="font-semibold ${getTextColor("text-gray-900", "text-white")}">${testimonial.author}</div>
                      <div class="text-sm ${getTextColor("text-gray-500", "text-gray-400")}">${testimonial.position}</div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        `;
      };

      const renderContactSection = () => {
        if (!config.sections.contact) return "";
        
        return `
          <section class="py-12 md:py-16 lg:py-20">
            <div class="text-center mb-12 md:mb-16">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${getTextColor("text-gray-900", "text-white")}">
                ${contact?.title || "Get In Touch"}
              </h2>
              <div class="w-16 md:w-24 h-1 mx-auto mb-6 md:mb-8 ${config.theme === "light" ? "bg-blue-600" : "bg-blue-400"}"></div>
              <p class="text-lg md:text-xl max-w-2xl mx-auto ${getTextColor("text-gray-600", "text-gray-300")}">
                ${contact?.subtitle || "Ready to start your next project? Let's discuss how we can help bring your vision to life."}
              </p>
            </div>
            <div class="grid ${contact?.showForm !== false ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8 md:gap-12">
              ${contact?.showForm !== false ? `
              <div class="p-6 md:p-8 rounded-2xl ${
                config.theme === "light"
                  ? "bg-white shadow-lg border border-gray-100"
                  : "bg-gray-800 shadow-lg border border-gray-700"
              }">
                <h3 class="text-2xl font-bold mb-6 ${getTextColor("text-gray-900", "text-white")}">Send us a message</h3>
                <form class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium mb-2 ${getTextColor("text-gray-700", "text-gray-300")}">First Name</label>
                      <input type="text" class="w-full px-4 py-3 rounded-lg border transition-colors ${
                        config.theme === "light"
                          ? "border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                          : "border-gray-600 focus:border-blue-400 bg-gray-700 text-white"
                      }" placeholder="John" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2 ${getTextColor("text-gray-700", "text-gray-300")}">Last Name</label>
                      <input type="text" class="w-full px-4 py-3 rounded-lg border transition-colors ${
                        config.theme === "light"
                          ? "border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                          : "border-gray-600 focus:border-blue-400 bg-gray-700 text-white"
                      }" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 ${getTextColor("text-gray-700", "text-gray-300")}">Email Address</label>
                    <input type="email" class="w-full px-4 py-3 rounded-lg border transition-colors ${
                      config.theme === "light"
                        ? "border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                        : "border-gray-600 focus:border-blue-400 bg-gray-700 text-white"
                    }" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 ${getTextColor("text-gray-700", "text-gray-300")}">Message</label>
                    <textarea rows="4" class="w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                      config.theme === "light"
                        ? "border-gray-300 focus:border-blue-500 bg-white text-gray-900"
                        : "border-gray-600 focus:border-blue-400 bg-gray-700 text-white"
                    }" placeholder="Tell us about your project..."></textarea>
                  </div>
                  <button type="submit" class="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
                    config.theme === "light"
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                      : "bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
                  }">Send Message</button>
                </form>
              </div>
              ` : ''}
              <div class="space-y-8">
                <div>
                  <h3 class="text-2xl font-bold mb-6 ${getTextColor("text-gray-900", "text-white")}">Contact Information</h3>
                  <p class="text-lg leading-relaxed ${getTextColor("text-gray-600", "text-gray-300")}">
                    We'd love to hear from you. Reach out to us through any of these channels and we'll get back to you as soon as possible.
                  </p>
                </div>
                <div class="space-y-6">
                  <div class="flex items-start space-x-4">
                    <div class="p-3 rounded-lg ${config.theme === "light" ? "bg-blue-100" : "bg-blue-900"}">
                      <span class="text-2xl">📧</span>
                    </div>
                    <div>
                      <h4 class="font-semibold mb-1 ${getTextColor("text-gray-900", "text-white")}">Email</h4>
                      <p class="${getTextColor("text-gray-600", "text-gray-300")}">${contact?.email || "hello@example.com"}</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-4">
                    <div class="p-3 rounded-lg ${config.theme === "light" ? "bg-blue-100" : "bg-blue-900"}">
                      <span class="text-2xl">📞</span>
                    </div>
                    <div>
                      <h4 class="font-semibold mb-1 ${getTextColor("text-gray-900", "text-white")}">Phone</h4>
                      <p class="${getTextColor("text-gray-600", "text-gray-300")}">${contact?.phone || "+1 (555) 123-4567"}</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-4">
                    <div class="p-3 rounded-lg ${config.theme === "light" ? "bg-blue-100" : "bg-blue-900"}">
                      <span class="text-2xl">📍</span>
                    </div>
                    <div>
                      <h4 class="font-semibold mb-1 ${getTextColor("text-gray-900", "text-white")}">Office</h4>
                      <p class="${getTextColor("text-gray-600", "text-gray-300")}">${(contact?.address || "123 Business Street\nSuite 100\nCity, State 12345").split('\n').map((line: string) => `<span>${line}<br /></span>`).join('')}</p>
                    </div>
                  </div>
                </div>
                <div class="p-6 rounded-lg ${config.theme === "light" ? "bg-blue-50" : "bg-gray-700"}">
                  <h4 class="font-semibold mb-2 ${config.theme === "light" ? "text-blue-900" : "text-blue-300"}">Business Hours</h4>
                  <p class="text-sm ${config.theme === "light" ? "text-blue-700" : "text-blue-200"}">${(contact?.hours || "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed").split('\n').map((line: string) => `<span>${line}<br /></span>`).join('')}</p>
                </div>
              </div>
            </div>
          </section>
        `;
      };
  
      const htmlContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${hero.title || "Landing Page"}</title>
    <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .group:hover .group-hover\\:scale-105 { transform: scale(1.05); }
    .group:hover .group-hover\\:shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
    .group:hover .group-hover\\:shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
    .group:hover .group-hover\\:opacity-30 { opacity: 0.3; }
    .group:hover .group-hover\\:opacity-100 { opacity: 1; }
    .hover\\:scale-105:hover { transform: scale(1.05); }
    .hover\\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
    .hover\\:shadow-2xl:hover { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
    .transition-all { transition: all 0.3s ease; }
    .transition-transform { transition: transform 0.3s ease; }
    .transition-opacity { transition: opacity 0.3s ease; }
    .duration-300 { transition-duration: 300ms; }
    .duration-500 { transition-duration: 500ms; }
    .duration-1000 { transition-duration: 1000ms; }
  </style>
  </head>
<body class="${getThemeClasses()} ${getFontClasses()} transition-all duration-300">
    <!-- HERO SECTION -->
  <div class="min-h-screen p-6 md:p-10 lg:p-16 relative overflow-hidden ${
    config.layout === "centered" || config.layout === "full-width" ? "flex flex-col items-center justify-center" : "flex flex-col justify-center"
  }">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${getBgColor("bg-blue-400", "bg-blue-600")}"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${getBgColor("bg-purple-400", "bg-purple-600")}"></div>
      </div>
    
    <div class="relative z-10">
      ${renderHeroContent()}
    </div>
  </div>

  <!-- SECTIONS CONTAINER -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="space-y-16 md:space-y-24 lg:space-y-32">
      ${renderAboutSection()}
      ${renderServicesSection()}
      ${renderTestimonialsSection()}
      ${renderContactSection()}
            </div>
            </div>

  <footer class="p-6 text-center ${config.theme === "light" ? "bg-gray-100" : "bg-gray-900"} mt-12">
      &copy; ${new Date().getFullYear()} Landing Page Builder
    </footer>
  </body>
  </html>`;
  
      const blob = new Blob([htmlContent], { type: "text/html" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "landing-page.html";
      link.click();
    } catch (err) {
      console.error(err);
      alert("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const generatePreviewLink = () => {
    const configId = Date.now().toString();
    const savedConfigs = JSON.parse(localStorage.getItem("landingPageConfigs") || "[]");
    savedConfigs.push({ id: configId, config, createdAt: new Date().toISOString() });
    localStorage.setItem("landingPageConfigs", JSON.stringify(savedConfigs));
    const previewUrl = `${window.location.origin}/preview/${configId}`;
    navigator.clipboard.writeText(previewUrl);
    alert("Preview link copied to clipboard!");
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg p-6 lg:p-8 max-w-md w-full mx-4 relative z-[10000] shadow-xl">
        <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Export Options</h2>
        <div className="space-y-3 lg:space-y-4">
          <button onClick={saveToLocalStorage} className="w-full py-3 lg:py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base">
            💾 Save to Local Storage
          </button>
          <button onClick={exportAsHTML} disabled={isExporting} className="w-full py-3 lg:py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm lg:text-base">
            {isExporting ? "Exporting..." : "📄 Export as HTML"}
          </button>
          <button onClick={generatePreviewLink} className="w-full py-3 lg:py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm lg:text-base">
            🔗 Generate Preview Link
          </button>
        </div>
        <button onClick={onClose} className="w-full mt-4 lg:mt-6 py-2 lg:py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm lg:text-base">
          Close
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
