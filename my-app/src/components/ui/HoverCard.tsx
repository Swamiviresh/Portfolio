"use client";

import { useRef } from "react";
import { animate } from "animejs";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function HoverCard({ children, className = "" }: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    
    animate(cardRef.current, {
      translateY: -8,
      scale: 1.02,
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    animate(cardRef.current, {
      translateY: 0,
      scale: 1,
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/10 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
