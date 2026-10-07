"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, createScope } from "animejs";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default function Experience({ experience }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Title animation
            const title = entry.target.querySelector("[data-experience-title]");
            if (title) {
              animate(title, {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                easing: "easeOutCubic",
              });
            }

            // Timeline line animation (draw in)
            const timelineLine = entry.target.querySelector("[data-timeline-line]");
            if (timelineLine) {
              animate(timelineLine, {
                scaleY: [0, 1],
                transformOrigin: "top",
                duration: 1200,
                delay: 300,
                easing: "easeOutCubic",
              });
            }

            // Timeline dots stagger
            const dots = entry.target.querySelectorAll("[data-timeline-dot]");
            animate(dots, {
              scale: [0, 1],
              opacity: [0, 1],
              duration: 400,
              delay: stagger(200, { start: 500 }),
              easing: "easeOutElastic(1, .6)",
            });

            // Experience cards stagger from alternating sides
            const cards = entry.target.querySelectorAll("[data-experience-card]");
            cards.forEach((card, index) => {
              const isLeft = index % 2 !== 0;
              animate(card, {
                opacity: [0, 1],
                translateX: [isLeft ? -40 : 40, 0],
                translateY: [20, 0],
                duration: 700,
                delay: 600 + index * 150,
                easing: "easeOutCubic",
              });
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, entering: boolean) => {
    const card = e.currentTarget;
    
    createScope({ root: card }).add(() => {
      animate(card, {
        borderColor: entering 
          ? "rgba(104, 186, 127, 0.5)"  // accent/50
          : "rgba(255, 255, 255, 0.1)", // light/10
        translateX: entering ? 4 : 0,
        duration: 300,
        easing: "easeOutCubic",
      });
    });
  };

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div data-experience-title className="text-center mb-12 opacity-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-light mb-4">
            Experience
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div data-timeline-line className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-accent/30 md:-translate-x-1/2 origin-top opacity-0" />

          <div className="space-y-8">
            {experience.map((job, index) => (
              <div
                key={job.id}
                data-experience-item
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div 
                  data-timeline-dot 
                  className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-dark -translate-x-1.5 md:-translate-x-1/2 mt-2 z-10 opacity-0"
                />

                {/* Content */}
                <div className="ml-8 md:ml-0 md:w-1/2 md:px-8">
                  <div 
                    data-experience-card
                    className="bg-dark/50 border border-light/10 rounded-xl p-6 opacity-0"
                    onMouseEnter={(e) => handleCardHover(e, true)}
                    onMouseLeave={(e) => handleCardHover(e, false)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-light">
                        {job.role}
                      </h3>
                      <span className="text-sm text-accent font-medium">
                        {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                      </span>
                    </div>
                    <p className="text-accent/80 font-medium mb-1">
                      {job.company}
                    </p>
                    <p className="text-sm text-light/50 mb-3">{job.location}</p>
                    <p className="text-light/70 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
