"use client";

import { useRef } from "react";
import { animate } from "animejs";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distanceX = (mouseX - centerX) * 0.2;
    const distanceY = (mouseY - centerY) * 0.2;

    animate(buttonRef.current, {
      translateX: distanceX,
      translateY: distanceY,
      duration: 150,
      easing: "easeOutQuad",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;

    animate(buttonRef.current, {
      translateX: 0,
      translateY: 0,
      duration: 300,
      easing: "easeOutElastic(1, .5)",
    });
  };

  const baseClasses = `inline-flex items-center justify-center transition-transform duration-200 ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}

      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={baseClasses}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}

    >
      {children}
    </button>
  );
}
