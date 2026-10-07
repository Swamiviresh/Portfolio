import { animate, stagger } from "animejs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnimationResult = any;

// Animation presets using anime.js v4
// Using any type since anime.js v4 types are complex and not fully exported

export const fadeIn = (
  element: HTMLElement | null,
  delay: number = 0
): AnimationResult | null => {
  if (!element) return null;
  return animate(element, {
    opacity: [0, 1],
    duration: 600,
    delay,
    easing: "easeOutQuad",
  });
};

export const slideUp = (
  element: HTMLElement | null,
  delay: number = 0
): AnimationResult | null => {
  if (!element) return null;
  return animate(element, {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    delay,
    easing: "easeOutQuad",
  });
};

export const staggerFadeIn = (
  elements: HTMLElement[] | Element[] | NodeListOf<Element>,
  staggerDelay: number = 100
): AnimationResult => {
  return animate(elements, {
    opacity: [0, 1],
    duration: 600,
    delay: stagger(staggerDelay),
    easing: "easeOutQuad",
  });
};

export const staggerSlideUp = (
  elements: HTMLElement[] | Element[] | NodeListOf<Element>,
  staggerDelay: number = 100
): AnimationResult => {
  return animate(elements, {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    delay: stagger(staggerDelay),
    easing: "easeOutQuad",
  });
};

export const heroTextReveal = (
  elements: HTMLElement[] | Element[] | NodeListOf<Element>
): AnimationResult => {
  return animate(elements, {
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 800,
    delay: stagger(150),
    easing: "easeOutExpo",
  });
};

export const skillBarGrow = (
  element: HTMLElement | null,
  width: string
): AnimationResult | null => {
  if (!element) return null;
  return animate(element, {
    width: ["0%", width],
    duration: 1000,
    easing: "easeOutCubic",
  });
};
