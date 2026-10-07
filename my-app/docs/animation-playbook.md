# Animation Playbook: Portfolio Site Best Practices

Notes on how well-made animated portfolio sites are architected.

---

## Principles

### Performance
- Animate only `transform` (translate, scale, rotate) and `opacity`
- These properties avoid layout thrashing and don't trigger paint/composite
- Never animate width, height, top, left, margin, padding during scroll
- Use `will-change: transform` sparingly on elements about to animate

### Motion Design
- **Hero intro**: Immediate impact, builds anticipation
- **Reveal animations**: Elements enter viewport with purpose
- **Staggered elements**: Related elements animate in sequence, not all at once
- **Parallax**: Subtle depth through layered scroll speeds (max 20% speed diff)
- **Micro-interactions**: Hover states provide immediate feedback
- **Progress indicators**: Scroll progress bars reward continued engagement

### Timing Guidelines
| Animation Type | Duration | Easing |
|---------------|----------|--------|
| Hero elements | 600-1200ms | outExpo |
| Scroll reveals | 400-600ms | outQuad |
| Hover states | 150-250ms | inOutQuad |
| Stagger delay | 50-100ms per item | - |
| Page transitions | 300-500ms | inOutCubic |

### Choreography
- **Hero sequence**: Background → Primary content → Secondary elements
- **Section scroll**: Use onScroll with staggered children
- **Cards**: Stagger with delay by index, animate y + opacity
- **Text**: Split character reveals build drama in headlines only

---

## Architecture Patterns

### 1. Component Animation Hook

```typescript
// useAnimation.ts - Centralized animation setup
export function useScopedAnimation(
  callback: (scope: Scope) => void,
  deps: DependencyList = []
) {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const scope = createScope({ root: containerRef.current })
      .add(callback);
    return () => scope.revert();
  }, deps);
  
  return containerRef;
}
```

From anime.js v4 docs: createScope for cleanup.

### 2. Reduced Motion First

Always check before triggering motion:

```typescript
const prefersReducedMotion = 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// In anime: use mediaQueries in createScope
```

From WCAG and general accessibility knowledge.

### 3. Animation Controller Pattern

```typescript
// Expose play/pause/seek for parent control
useImperativeHandle(ref, () => ({
  play: () => animation?.play(),
  seek: (p: number) => animation?.seek(p)
}));
```

### 4. Scroll Progress with RAF

```typescript
// Store progress value, animate on tick
const progress = { value: 0 };

useScroll(({ scrollYProgress }) => {
  progress.value = scrollYProgress;
});

// In animation loop, map progress to animation time
```

---

## Portfolio-Specific Patterns

### Hero Intro Sequence

```typescript
const tl = createTimeline({ autoplay: false });

// Step 1: Background fade
tl.add('.bg', { opacity: [0, 1] }, 0);

// Step 2: Headline split-text reveal
tl.add(chars, { 
  y: ['1em', 0], 
  opacity: [0, 1],
  delay: stagger(30)
}, 200);

// Step 3: Subtitle fade up
tl.add('.subtitle', { y: [20, 0], opacity: [0, 1] }, '-=400');

// Step 4: CTA buttons stagger
tl.add('.cta-btn', { 
  y: [20, 0], 
  opacity: [0, 1],
  delay: stagger(100)
}, '-=300');

// Trigger
tl.play();
```

From anime.js v4 docs: timeline with stagger.

### Scroll-Triggered Sections

```typescript
// Each section animates independently
animate('.section-card', {
  y: [60, 0],
  opacity: [0, 1],
  autoplay: onScroll({
    enter: 'top 80%',
    once: true
  })
});
```

From anime.js v4 docs: onScroll observer.

### Skills Grid Stagger

```typescript
animate('.skill-badge', {
  scale: { from: 0, to: 1 },
  opacity: [0, 1],
  delay: stagger(50, { 
    grid: [4, 'auto'], 
    from: 'center' 
  })
});
```

From anime.js v4 docs: stagger with grid.

### Scroll Progress Bar

```typescript
const progressBar = document.querySelector('.progress');

animate(progressBar, {
  scaleX: { from: 0, to: 1 },
  transformOrigin: 'left',
  autoplay: onScroll({ sync: true })
});
```

---

## Code Organization

```
app/
  animations/
    useScopedAnimation.ts    # React integration hook
    hero.ts                  # Hero animation definitions
    reveals.ts               # Scroll reveal presets
  components/
    HeroSection.tsx          # Uses hero animations
    CardGrid.tsx             # Uses reveal animations
```

---

## References
- anime.js v4 docs: https://animejs.com/documentation
- Web Animations API spec
- Creating a UI Animation Library - animation patterns
- Val Head's Animation Handbook - timing principles
