"use client";

import { useEffect, useRef, useState } from "react";
import { staggerSlideUp } from "@/lib/animations/presets";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

export default function AnimateOnScroll({
  children,
  className = "",
  staggerDelay = 100,
  threshold = 0.2,
}: AnimateOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const children = container.querySelectorAll("[data-animate]");
            if (children.length > 0) {
              staggerSlideUp(children as NodeListOf<HTMLElement>, staggerDelay).play();
            } else {
              staggerSlideUp([container], staggerDelay).play();
            }
            observer.unobserve(container);
          }
        });
      },
      { threshold }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [hasAnimated, staggerDelay, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
