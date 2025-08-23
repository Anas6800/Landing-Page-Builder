"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type BuilderState = {
  theme: "light" | "dark" | "gradient";
  font: "sans" | "serif" | "mono";
  layout: "centered" | "left-image" | "full-width";
      hero: {
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink?: string;
      stats?: Array<{ value: string; label: string }>;
    };
  sections: {
    about: boolean;
    services: boolean;
    testimonials: boolean;
    contact: boolean;
  };
  content?: {
    about?: {
      title?: string;
      subtitle?: string;
      description?: string;
      stats?: Array<{ number: string; label: string }>;
    };
    services?: {
      title?: string;
      subtitle?: string;
      items?: Array<{
        icon: string;
        title: string;
        description: string;
        features: string[];
      }>;
    };
    testimonials?: {
      title?: string;
      subtitle?: string;
      items?: Array<{
        quote: string;
        author: string;
        position: string;
        avatar: string;
      }>;
    };
    contact?: {
      title?: string;
      subtitle?: string;
      email?: string;
      phone?: string;
      address?: string;
      hours?: string;
      showForm?: boolean;
    };
  };
  images: {
    logo?: string;
    heroImage?: string;
  };
};

const initialState: BuilderState = {
  theme: "light",
  font: "sans",
  layout: "centered",
  hero: {
    title: "Welcome to My Hero Section",
    subtitle: "Built with Next.js + Tailwind",
    ctaText: "Get Started",
    ctaLink: "#",
    stats: [
      { value: "10K+", label: "Happy Users" },
      { value: "99%", label: "Satisfaction" },
      { value: "24/7", label: "Support" },
    ],
  },
  sections: {
    about: true,
    services: true,
    testimonials: false,
    contact: false,
  },
  content: {
    about: {
      title: "About Us",
      subtitle: "We Create Amazing Digital Experiences",
      description:
        "Our team of passionate designers and developers work together to build stunning websites and applications that deliver exceptional user experiences.",
    },
    services: {
      title: "Our Services",
      subtitle: "We offer comprehensive digital solutions to help your business grow and succeed online.",
      items: [
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
      ]
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Don't just take our word for it. Here's what our satisfied clients have to say about working with us.",
      items: [
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
      ]
    },
    contact: {
      title: "Get In Touch",
      subtitle: "We'd love to hear from you",
      email: "hello@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business Street, City, Country",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      showForm: true,
    },
  },
  images: {
    logo: "",
    heroImage: "",
  },
};

type Ctx = {
  config: BuilderState;
  setConfig: React.Dispatch<React.SetStateAction<BuilderState>>;
};

const BuilderContext = createContext<Ctx | undefined>(undefined);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<BuilderState>(initialState);
  return (
    <BuilderContext.Provider value={{ config, setConfig }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used inside BuilderProvider");
  return ctx;
}
