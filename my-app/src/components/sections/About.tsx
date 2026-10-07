"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, createScope } from "animejs";

interface AboutProps {
  bio: string;
  phone: string;
  location: string;
  socialLinks: Record<string, string>;
}

const socialIcons: Record<string, string> = {
  GitHub: "GitHub",
  LinkedIn: "LinkedIn",
  Twitter: "X",
  Portfolio: "Portfolio",
};

export default function About({ bio, phone, location, socialLinks }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Title animation
            const title = entry.target.querySelector("[data-about-title]");
            if (title) {
              animate(title, {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                easing: "easeOutCubic",
              });
            }

            // Bio text animation
            const bioEl = entry.target.querySelector("[data-about-bio]");
            if (bioEl) {
              animate(bioEl, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800,
                delay: 200,
                easing: "easeOutCubic",
              });
            }

            // Info items stagger
            const infoItems = entry.target.querySelectorAll("[data-about-info]");
            animate(infoItems, {
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 600,
              delay: stagger(100, { start: 400 }),
              easing: "easeOutCubic",
            });

            // Social links stagger with elastic effect
            const socialLinksEl = entry.target.querySelectorAll("[data-social-link]");
            animate(socialLinksEl, {
              opacity: [0, 1],
              scale: [0.8, 1],
              duration: 500,
              delay: stagger(80, { start: 600 }),
              easing: "easeOutElastic(1, .65)",
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>, entering: boolean) => {
    const link = e.currentTarget;
    
    createScope({ root: link }).add(() => {
      animate(link, {
        scale: entering ? 1.05 : 1,
        borderColor: entering 
          ? "rgba(104, 186, 127, 0.8)"  // accent/80
          : "rgba(255, 255, 255, 0.2)", // light/20
        duration: 200,
        easing: "easeOutQuad",
      });
    });
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div data-about-title className="text-center mb-12 opacity-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-light mb-4">
            About Me
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div data-about-bio className="prose prose-lg max-w-none opacity-0">
          <p className="text-light/80 text-lg leading-relaxed text-center">
            {bio}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-light/60">
          <div data-about-info className="flex items-center gap-2 opacity-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
          <div data-about-info className="flex items-center gap-2 opacity-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{phone}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {Object.entries(socialLinks).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              data-social-link
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-light/20 text-light/80 hover:text-accent transition-colors duration-200 opacity-0"
              onMouseEnter={(e) => handleSocialHover(e, true)}
              onMouseLeave={(e) => handleSocialHover(e, false)}
            >
              <span>{socialIcons[name] || name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
