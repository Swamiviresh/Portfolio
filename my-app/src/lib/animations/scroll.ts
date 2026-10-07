import { createScope } from "animejs";
import { useEffect, useRef } from "react";

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: number | string;
  end?: number | string;
  scrub?: boolean | number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnimationCallback = () => any;

export function useScrollAnimation(
  animationConfig: AnimationCallback | null,
  _options: ScrollAnimationOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scopeRef = useRef<any | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !animationConfig) return;

    scopeRef.current = createScope({}).add(() => {
      // Simplified approach - just create the animation
      // Complex scroll-sync is better handled with IntersectionObserver for this use case
      animationConfig?.();
    });

    return () => {
      scopeRef.current?.revert();
    };
  }, [animationConfig]);

  return scopeRef;
}

// Scroll-trigger reveal animation
export function scrollReveal(
  element: HTMLElement | null,
  onEnter?: () => void,
  threshold: number = 0.2
) {
  if (!element || typeof window === "undefined") return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onEnter?.();
          observer.unobserve(element);
        }
      });
    },
    { threshold }
  );

  observer.observe(element);

  return () => observer.disconnect();
}
