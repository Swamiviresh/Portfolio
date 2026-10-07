"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface SplitTextProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  animate?: boolean;
  delay?: number;
}

export default function SplitText({
  children,
  className = "",
  tag: Tag = "span",
  animate: shouldAnimate = true,
  delay = 0,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!shouldAnimate || !containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".char");
    if (!chars.length) return;

    // Set initial opacity to 0 for animation
    chars.forEach((char) => {
      (char as HTMLElement).style.opacity = "0";
    });

    // Animate characters with stagger
    animate(chars, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: stagger(30, { start: delay }),
      easing: "easeOutCubic",
    });
  }, [shouldAnimate, delay]);

  // Split text into characters, preserving spaces
  const renderChars = () => {
    const text = children;
    return text.split("").map((char, index) => {
      if (char === " ") {
        return <span key={index} className="char inline-block">&nbsp;</span>;
      }
      return (
        <span key={index} className="char inline-block opacity-0">
          {char}
        </span>
      );
    });
  };

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>
      {renderChars()}
    </Tag>
  );
}
