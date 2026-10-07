"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, createScope } from "animejs";

interface SkillCategory {
  category: string;
  items: string[];
}

interface SkillsProps {
  skills: SkillCategory[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnimeInstance = any;

export default function Skills({ skills }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scopeRef = useRef<AnimeInstance | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Use IntersectionObserver for scroll trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Title animation
            const title = entry.target.querySelector("[data-skills-title]");
            if (title) {
              animate(title, {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                easing: "easeOutCubic",
              });
            }

            // Cards stagger animation
            const cards = entry.target.querySelectorAll("[data-skill-card]");
            animate(cards, {
              opacity: [0, 1],
              translateY: [40, 0],
              scale: [0.95, 1],
              duration: 600,
              delay: stagger(150, { start: 200 }),
              easing: "easeOutCubic",
            });

            // Skill tags stagger
            const tags = entry.target.querySelectorAll("[data-skill-tag]");
            animate(tags, {
              opacity: [0, 1],
              scale: [0.8, 1],
              duration: 400,
              delay: stagger(50, { start: 600 }),
              easing: "easeOutQuad",
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

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, entering: boolean) => {
    const card = e.currentTarget;
    
    scopeRef.current = createScope({ root: card }).add(() => {
      if (entering) {
        animate(card, {
          translateY: -8,
          scale: 1.02,
          borderColor: "rgba(104, 186, 127, 0.5)", // accent/50
          duration: 300,
          easing: "easeOutQuad",
        });
      } else {
        animate(card, {
          translateY: 0,
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.1)", // light/10
          duration: 300,
          easing: "easeOutQuad",
        });
      }
    });
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div data-skills-title className="text-center mb-12 opacity-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-light mb-4">
            Skills & Technologies
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((category) => (
            <div
              key={category.category}
              data-skill-card
              className="bg-dark/50 border border-light/10 rounded-xl p-6 opacity-0 cursor-default"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <h3 className="text-xl font-semibold text-accent mb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    data-skill-tag
                    className="px-3 py-1 rounded-full bg-primary/20 text-light/90 text-sm border border-primary/30 opacity-0 hover:bg-primary/40 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
