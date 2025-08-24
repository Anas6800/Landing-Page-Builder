"use client";

import { useState } from "react";
import { useBuilder } from "@/context/BuilderContext";
import ExportModal from "./ExportModal";
import Link from "next/link";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-2 lg:px-4 py-2 lg:py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left font-medium transition-colors"
      >
        <span className="text-xs lg:text-base">{title}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-2 lg:p-4 space-y-2 lg:space-y-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { config, setConfig } = useBuilder();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <div className="w-full bg-gray-50 h-full overflow-y-auto border-r border-gray-200">
      <div className="p-3 lg:p-6 space-y-3 lg:space-y-6">
        {/* Header - Hidden on mobile since we have a mobile header */}
        <div className="hidden lg:block text-center pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">🎨 Landing Page Builder</h2>
          <p className="text-sm text-gray-600 mt-1">Customize every aspect of your page</p>
        </div>

        {/* Hero Section */}
        <CollapsibleSection title="🚀 Hero Section" defaultOpen={true}>
          <div className="space-y-2 lg:space-y-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Hero Title</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={config.hero.title}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, title: e.target.value },
                  }))
                }
                placeholder="Enter your main headline"
              />
            </div>

            <div>
              <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Hero Subtitle</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={config.hero.subtitle}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, subtitle: e.target.value },
                  }))
                }
                placeholder="Enter your subtitle or description"
                rows={2}
              />
            </div>

                 <div>
                <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Primary Button Text</label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={config.hero.ctaText}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, ctaText: e.target.value },
                    }))
                  }
                  placeholder="Get Started"
                />
              </div>

              <div>
                <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Primary Button Link</label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={config.hero.ctaLink}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, ctaLink: e.target.value },
                    }))
                  }
                  placeholder="https://youtube.com or mailto:hello@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">External links (starting with http) will open in a new tab</p>
              </div>

              <div>
               <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Hero Image URL</label>
               <input
                 className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                 value={config.images.heroImage}
                 onChange={(e) =>
                   setConfig((prev) => ({
                     ...prev,
                     images: { ...prev.images, heroImage: e.target.value },
                   }))
                 }
                 placeholder="https://example.com/image.jpg"
               />
               <p className="text-xs text-gray-500 mt-1">Leave empty to use placeholder</p>
             </div>
          </div>
        </CollapsibleSection>

        {/* Design & Layout */}
        <CollapsibleSection title="🎨 Design & Layout">
          <div className="space-y-2 lg:space-y-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Theme</label>
              <select
                value={config.theme}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, theme: e.target.value as "light" | "dark" | "gradient" }))
                }
                className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="light">Light Theme</option>
                <option value="dark">Dark Theme</option>
                <option value="gradient">Gradient Theme</option>
              </select>
            </div>

            <div>
              <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Layout Style</label>
              <select
                value={config.layout}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, layout: e.target.value as "centered" | "left-image" | "full-width" }))
                }
                className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="centered">Centered Hero</option>
                <option value="left-image">Left Text + Right Image</option>
                <option value="full-width">Full-width Banner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Font Family</label>
              <select
                value={config.font}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    font: e.target.value as "sans" | "serif" | "mono",
                  }))
                }
                className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sans">Sans Serif (Modern)</option>
                <option value="serif">Serif (Classic)</option>
                <option value="mono">Monospace (Technical)</option>
              </select>
            </div>
          </div>
        </CollapsibleSection>

        {/* Content Sections */}
        <CollapsibleSection title="📄 Content Sections">
          <div className="space-y-2 lg:space-y-3">
            <div className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-xs lg:text-sm text-gray-800">About Section</div>
                <div className="text-xs lg:text-sm text-gray-600">Company information and stats</div>
              </div>
              <input
                type="checkbox"
                checked={config.sections.about}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    sections: { ...prev.sections, about: e.target.checked },
                  }))
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-xs lg:text-sm text-gray-800">Services Section</div>
                <div className="text-xs lg:text-sm text-gray-600">What you offer to clients</div>
              </div>
              <input
                type="checkbox"
                checked={config.sections.services}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    sections: { ...prev.sections, services: e.target.checked },
                  }))
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-xs lg:text-sm text-gray-800">Testimonials Section</div>
                <div className="text-xs lg:text-sm text-gray-600">Customer reviews and feedback</div>
              </div>
              <input
                type="checkbox"
                checked={config.sections.testimonials}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    sections: { ...prev.sections, testimonials: e.target.checked },
                  }))
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-xs lg:text-sm text-gray-800">Contact Section</div>
                <div className="text-xs lg:text-sm text-gray-600">Contact form and information</div>
              </div>
              <input
                type="checkbox"
                checked={config.sections.contact}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    sections: { ...prev.sections, contact: e.target.checked },
                  }))
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </CollapsibleSection>

        {config.sections.about && (
  <CollapsibleSection title="📝 About Section">
    <div className="space-y-2 lg:space-y-4">
      <div>
        <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Title</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={config.content?.about?.title || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              content: {
                ...prev.content,
                about: { ...prev.content?.about, title: e.target.value },
              },
            }))
          }
          placeholder="About Us"
        />
      </div>

      <div>
        <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Subtitle</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={config.content?.about?.subtitle || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              content: {
                ...prev.content,
                about: { ...prev.content?.about, subtitle: e.target.value },
              },
            }))
          }
          placeholder="We Create Amazing Digital Experiences"
        />
      </div>

      <div>
        <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Description</label>
        <textarea
          rows={2}
          className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={config.content?.about?.description || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              content: {
                ...prev.content,
                about: { ...prev.content?.about, description: e.target.value },
              },
            }))
          }
          placeholder="Write something about your company..."
        />
      </div>

      <div>
        <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Stats</label>
        <div className="space-y-2 lg:space-y-3">
          {(config.content?.about?.stats || [
            { number: "500+", label: "Projects Completed" },
            { number: "50+", label: "Happy Clients" },
            { number: "5+", label: "Years Experience" },
            { number: "24/7", label: "Support" }
          ]).map((stat, index) => (
            <div key={index} className="flex gap-2">
              <input
                className="flex-1 border border-gray-300 rounded-lg p-2 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={stat.number}
                onChange={(e) => {
                  const newStats = [...(config.content?.about?.stats || [
                    { number: "500+", label: "Projects Completed" },
                    { number: "50+", label: "Happy Clients" },
                    { number: "5+", label: "Years Experience" },
                    { number: "24/7", label: "Support" }
                  ])];
                  newStats[index] = { ...newStats[index], number: e.target.value };
                  setConfig((prev) => ({
                    ...prev,
                    content: {
                      ...prev.content,
                      about: { ...prev.content?.about, stats: newStats },
                    },
                  }));
                }}
                placeholder="500+"
              />
              <input
                className="flex-1 border border-gray-300 rounded-lg p-2 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={stat.label}
                onChange={(e) => {
                  const newStats = [...(config.content?.about?.stats || [
                    { number: "500+", label: "Projects Completed" },
                    { number: "50+", label: "Happy Clients" },
                    { number: "5+", label: "Years Experience" },
                    { number: "24/7", label: "Support" }
                  ])];
                  newStats[index] = { ...newStats[index], label: e.target.value };
                  setConfig((prev) => ({
                    ...prev,
                    content: {
                      ...prev.content,
                      about: { ...prev.content?.about, stats: newStats },
                    },
                  }));
                }}
                placeholder="Projects Completed"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </CollapsibleSection>
)}

{/* Services Section Content */}
{config.sections.services && (
  <CollapsibleSection title="⚡ Services Section Content">
    <div className="space-y-2 lg:space-y-4">
      <div>
        <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Section Title</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm"
          value={config.content?.services?.title || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              content: { 
                ...prev.content, 
                services: { 
                  ...prev.content?.services, 
                  title: e.target.value 
                } 
              }
            }))
          }
          placeholder="Our Services"
        />
      </div>

      <div>
        <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Section Subtitle</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm"
          value={config.content?.services?.subtitle || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              content: { 
                ...prev.content, 
                services: { 
                  ...prev.content?.services, 
                  subtitle: e.target.value 
                } 
              }
            }))
          }
          placeholder="We offer comprehensive digital solutions..."
        />
      </div>

      <div>
        <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Service Cards</label>
        <div className="space-y-2 lg:space-y-4">
          {(config.content?.services?.items || []).map((service, index) => (
            <div key={index} className="p-2 lg:p-3 border border-gray-200 rounded-lg space-y-2 lg:space-y-3">
              <div className="flex gap-2">
                <input
                  className="w-12 lg:w-16 border border-gray-300 rounded-lg p-2 text-xs lg:text-sm"
                  value={service.icon}
                  onChange={(e) => {
                    const newItems = [...(config.content?.services?.items || [])];
                    newItems[index] = { ...service, icon: e.target.value };
                    setConfig((prev) => ({
                      ...prev,
                      content: { 
                        ...prev.content, 
                        services: { 
                          ...prev.content?.services, 
                          items: newItems 
                        } 
                      }
                    }));
                  }}
                  placeholder="🎨"
                />
                <input
                  className="flex-1 border border-gray-300 rounded-lg p-2 text-xs lg:text-sm"
                  value={service.title}
                  onChange={(e) => {
                    const newItems = [...(config.content?.services?.items || [])];
                    newItems[index] = { ...service, title: e.target.value };
                    setConfig((prev) => ({
                      ...prev,
                      content: { 
                        ...prev.content, 
                        services: { 
                          ...prev.content?.services, 
                          items: newItems 
                        } 
                      }
                    }));
                  }}
                  placeholder="Service Title"
                />
              </div>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 text-xs lg:text-sm"
                value={service.description}
                onChange={(e) => {
                  const newItems = [...(config.content?.services?.items || [])];
                  newItems[index] = { ...service, description: e.target.value };
                  setConfig((prev) => ({
                    ...prev,
                    content: { 
                      ...prev.content, 
                      services: { 
                        ...prev.content?.services, 
                        items: newItems 
                      } 
                    }
                  }));
                }}
                placeholder="Service description..."
                rows={2}
              />
              <div>
                <label className="block text-xs lg:text-sm font-medium mb-1">Features</label>
                {service.features.map((feature, fIndex) => (
                  <input
                    key={fIndex}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs lg:text-sm mb-1"
                    value={feature}
                    onChange={(e) => {
                      const newItems = [...(config.content?.services?.items || [])];
                      const newFeatures = [...newItems[index].features];
                      newFeatures[fIndex] = e.target.value;
                      newItems[index] = { ...service, features: newFeatures };
                      setConfig((prev) => ({
                        ...prev,
                        content: { 
                          ...prev.content, 
                          services: { 
                            ...prev.content?.services, 
                            items: newItems 
                          } 
                        }
                      }));
                    }}
                    placeholder="Feature"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </CollapsibleSection>
)}

        
{config.sections.testimonials && (
  <CollapsibleSection title="💬 Testimonials Section Content">
    <div className="space-y-2 lg:space-y-4">
      {/* Title */}
      <div>
        <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Section Title</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={config.content?.testimonials?.title || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              content: {
                ...prev.content,
                testimonials: {
                  ...prev.content?.testimonials,
                  title: e.target.value
                }
              }
            }))
          }
          placeholder="What Our Clients Say"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Section Subtitle</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={config.content?.testimonials?.subtitle || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              content: {
                ...prev.content,
                testimonials: {
                  ...prev.content?.testimonials,
                  subtitle: e.target.value
                }
              }
            }))
          }
          placeholder="Don't just take our word for it..."
        />
      </div>

      {/* Testimonial Items */}
      <div>
        <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Testimonial Items</label>
        <div className="space-y-2 lg:space-y-4">
          {config.content?.testimonials?.items?.map((item, index) => (
            <div key={index} className="p-2 lg:p-3 border border-gray-200 rounded-lg space-y-2 lg:space-y-3">
              <div className="flex gap-2">
                <input
                  className="w-12 lg:w-16 border border-gray-300 rounded-lg p-2 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={item.avatar}
                  onChange={(e) => {
                    const newItems = [...(config.content?.testimonials?.items || [])];
                    newItems[index] = { ...item, avatar: e.target.value };
                    setConfig((prev) => ({
                      ...prev,
                      content: { 
                        ...prev.content, 
                        testimonials: { ...prev.content?.testimonials, items: newItems } 
                      }
                    }));
                  }}
                  placeholder="👩‍💼"
                />
                <input
                  className="flex-1 border border-gray-300 rounded-lg p-2 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={item.author}
                  onChange={(e) => {
                    const newItems = [...(config.content?.testimonials?.items || [])];
                    newItems[index] = { ...item, author: e.target.value };
                    setConfig((prev) => ({
                      ...prev,
                      content: { 
                        ...prev.content, 
                        testimonials: { ...prev.content?.testimonials, items: newItems } 
                      }
                    }));
                  }}
                  placeholder="Author Name"
                />
              </div>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={item.position}
                onChange={(e) => {
                  const newItems = [...(config.content?.testimonials?.items || [])];
                  newItems[index] = { ...item, position: e.target.value };
                  setConfig((prev) => ({
                    ...prev,
                    content: { 
                      ...prev.content, 
                      testimonials: { ...prev.content?.testimonials, items: newItems } 
                    }
                  }));
                }}
                placeholder="Position / Company"
              />
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={item.quote}
                onChange={(e) => {
                  const newItems = [...(config.content?.testimonials?.items || [])];
                  newItems[index] = { ...item, quote: e.target.value };
                  setConfig((prev) => ({
                    ...prev,
                    content: { 
                      ...prev.content, 
                      testimonials: { ...prev.content?.testimonials, items: newItems } 
                    }
                  }));
                }}
                placeholder="Testimonial quote..."
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </CollapsibleSection>
)}

        {/* Contact Section Content */}
        {config.sections.contact && (
          <CollapsibleSection title="📞 Contact Section Content">
            <div className="space-y-2 lg:space-y-4">
              <div>
                <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Section Title</label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={config.content?.contact?.title || ""}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      content: { 
                        ...prev.content, 
                        contact: { 
                          ...prev.content?.contact, 
                          title: e.target.value 
                        } 
                      }
                    }))
                  }
                  placeholder="Get In Touch"
                />
              </div>

              <div>
                <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Section Subtitle</label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={config.content?.contact?.subtitle || ""}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      content: { 
                        ...prev.content, 
                        contact: { 
                          ...prev.content?.contact, 
                          subtitle: e.target.value 
                        } 
                      }
                    }))
                  }
                  placeholder="Ready to start your next project?"
                />
              </div>

              <div className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-xs lg:text-sm text-gray-800">Contact Form</div>
                  <div className="text-xs lg:text-sm text-gray-600">Show &ldquo;Send us a message&rdquo; form</div>
                </div>
                <input
                  type="checkbox"
                  checked={config.content?.contact?.showForm !== false}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      content: { 
                        ...prev.content, 
                        contact: { 
                          ...prev.content?.contact, 
                          showForm: e.target.checked 
                        } 
                      }
                    }))
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Email Address</label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={config.content?.contact?.email || ""}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      content: { 
                        ...prev.content, 
                        contact: { 
                          ...prev.content?.contact, 
                          email: e.target.value 
                        } 
                      }
                    }))
                  }
                  placeholder="hello@example.com"
                />
              </div>

              <div>
                <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Phone Number</label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={config.content?.contact?.phone || ""}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      content: { 
                        ...prev.content, 
                        contact: { 
                          ...prev.content?.contact, 
                          phone: e.target.value 
                        } 
                      }
                    }))
                  }
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Office Address</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={config.content?.contact?.address || ""}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      content: { 
                        ...prev.content, 
                        contact: { 
                          ...prev.content?.contact, 
                          address: e.target.value 
                        } 
                      }
                    }))
                  }
                  placeholder="123 Business Street..."
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Business Hours</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={config.content?.contact?.hours || ""}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      content: { 
                        ...prev.content, 
                        contact: { 
                          ...prev.content?.contact, 
                          hours: e.target.value 
                        } 
                      }
                    }))
                  }
                  placeholder="Monday - Friday: 9:00 AM - 6:00 PM..."
                  rows={2}
                />
              </div>
            </div>
          </CollapsibleSection>
        )}

        {/* Advanced Settings */}
        <CollapsibleSection title="⚙️ Advanced Settings">
          <div className="space-y-2 lg:space-y-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium mb-1 lg:mb-2 text-gray-700">Logo URL (Optional)</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 lg:p-3 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={config.images.logo}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    images: { ...prev.images, logo: e.target.value },
                  }))
                }
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* Export Section */}
        <div className="pt-4 lg:pt-6 border-t border-gray-200">
          <div className="space-y-3">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="w-full py-3 lg:py-4 px-4 lg:px-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base"
            >
              🚀 Export & Save Landing Page
            </button>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Your changes are saved automatically
              </p>
            </div>
          </div>
        </div>

        <ExportModal 
          isOpen={isExportModalOpen} 
          onClose={() => setIsExportModalOpen(false)} 
        />
         <button
              onClick={() => window.location.href = "/"}
              className="w-full py-3 lg:py-4 px-4 lg:px-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base"
            >
              Back to Home
            </button>
    </div>
      </div>
     
  );
}