"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface HeroProps {
  name: string;
  headline: string;
  email?: string;
}

export default function Hero({ name, headline, email }: HeroProps) {
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL;
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate greeting with slide up
    const greeting = containerRef.current.querySelector("[data-hero-greet]");
    if (greeting) {
      animate(greeting, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 200,
        easing: "easeOutCubic",
      });
    }

    // Animate name with character stagger (split text effect)
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".hero-char");
      animate(chars, {
        opacity: [0, 1],
        translateY: [40, 0],
        rotateX: [-90, 0],
        duration: 600,
        delay: stagger(50, { start: 500 }),
        easing: "easeOutCubic",
      });
    }

    // Animate headline with slide up
    const headlineEl = containerRef.current.querySelector("[data-hero-headline]");
    if (headlineEl) {
      animate(headlineEl, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 1200,
        easing: "easeOutCubic",
      });
    }

    // Animate buttons with stagger
    const buttons = containerRef.current.querySelectorAll("[data-hero-btn]");
    animate(buttons, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.9, 1],
      duration: 600,
      delay: stagger(100, { start: 1600 }),
      easing: "easeOutElastic(1, .75)",
    });

    // Animate email with fade
    const emailEl = containerRef.current.querySelector("[data-hero-email]");
    if (emailEl) {
      animate(emailEl, {
        opacity: [0, 1],
        duration: 600,
        delay: 2000,
        easing: "easeOutQuad",
      });
    }
  }, [name]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.getAttribute("href") || "");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  // Split name into characters for animation
  const renderName = () => {
    return name.split("").map((char, index) => {
      if (char === " ") {
        return (
          <span key={index} className="hero-char inline-block opacity-0">
            &nbsp;
          </span>
        );
      }
      return (
        <span key={index} className="hero-char inline-block opacity-0" style={{ perspective: "1000px" }}>
          {char}
        </span>
      );
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p
          data-hero-greet
          className="text-accent font-medium mb-4 text-lg opacity-0"
        >
          Hi, I&apos;m
        </p>
        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-light mb-6"
          style={{ perspective: "1000px" }}
        >
          {renderName()}
        </h1>
        <p
          data-hero-headline
          className="text-xl sm:text-2xl text-light/80 mb-10 max-w-2xl mx-auto opacity-0"
        >
          {headline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={handleClick}
            data-hero-btn
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 opacity-0"
          >
            Get In Touch
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-hero-btn
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-accent text-accent font-medium hover:bg-accent hover:text-dark transition-all duration-300 opacity-0"
            >
              Download Resume
            </a>
          )}
        </div>
        {email && (
          <a
            data-hero-email
            href={`mailto:${email}`}
            className="inline-block mt-10 text-light/60 hover:text-accent transition-colors duration-300 opacity-0"
          >
            {email}
          </a>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50">
        <div className="w-6 h-10 border-2 border-light/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
