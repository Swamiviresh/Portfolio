# Anime.js v4 Quick Reference

## Installation

```bash
npm install animejs
```

## Core Imports (Named Only)

```javascript
// v4 uses named exports only
import { 
  animate, stagger, createTimeline, createScope, onScroll, 
  splitText, createDrawable, eases, utils
} from 'animejs';

// Standalone modules (tree-shakeable)
import { animate } from 'animejs/animation';
import { createTimeline } from 'animejs/timeline';
import { stagger } from 'animejs/utils';

// NEVER: import anime from 'animejs'  // ❌ NO DEFAULT EXPORT
```

---

## animate(target, params)

```javascript
const animation = animate('.square', {
  x: 100,
  y: [-50, 50],
  rotate: { from: -180 },
  scale: { from: 0, to: 1 },
  opacity: [0, 1],
  duration: 1000,
  delay: stagger(100),
  loop: true,
  alternate: true,
  ease: 'inOutQuad',
  onComplete: () => {}
});

animation.play(); pause(); reverse(); restart(); 
seek(500); complete(); revert();
```

---

## stagger(value, options)

```javascript
animate('.square', { 
  x: 100, 
  delay: stagger(50, { grid: [5, 5], from: 'center' })
});

// Timeline position
tl.add('.square', { y: -20 }, stagger(100));
```

---

## createTimeline(params)

```javascript
const tl = createTimeline({
  defaults: { duration: 750, ease: 'inOutQuad' }
});

.add('.sq', { x: 100 })           // at end
.add('.cir', { x: 50 }, '+=200')  // 200ms after prev
.add('.tri', { y: 50 }, '-=500')  // 500ms before prev
.add('.box', { y: 20 }, 500)      // at 500ms absolute
.add('.star', {}, '<')             // same start

// Control
.play(); .pause(); .reverse(); .seek(1500); .revert();
```

---

## onScroll(params) - Scroll Observer

```javascript
// Trigger once
animate('.section', { opacity: [0, 1], autoplay: onScroll() });

// Scroll scrubbing
animate('.section', {
  y: { from: 100, to: 0 },
  autoplay: onScroll({ sync: true })
});

// With thresholds
onScroll({
  target: '.section',
  enter: 'top bottom',
  leave: 'bottom top',
  onEnter: () => {},
  onUpdate: (self) => {}
})
```

---

## splitText(target, options)

```javascript
const { chars, words, lines } = splitText('h2', {
  chars: true, words: false, lines: false,
  class: 'char', wrap: 'span',
  accessible: true
});

animate(chars, {
  y: [-20, 0], opacity: [0, 1],
  delay: stagger(30), ease: 'outExpo'
});

// Cleanup
split.revert();
```

---

## createScope(params) - React Cleanup

```javascript
const scope = createScope({
  root: containerRef.current,
  mediaQueries: { 
    reduceMotion: '(prefers-reduced-motion: reduce)' 
  }
}).add(self => {
  if (self.matches.reduceMotion) return;
  animate('.card', { opacity: [0, 1] });
});

// Cleanup
scope.revert();
```

### React Pattern

```jsx
useEffect(() => {
  const scope = createScope({ root: containerRef.current })
    .add(() => animate('.card', { opacity: [0, 1] }));
  return () => scope.revert();
}, []);
```

---

## SVG Line Drawing

```javascript
import { createDrawable } from 'animejs';

const drawable = createDrawable('path');
animate(drawable, { draw: ['0 0', '0 1', '1 1'] });
```

---

## Easings (v4 Format)

```javascript
// String: NO 'ease' prefix
'inQuad' 'outQuad' 'inOutQuad'
'inExpo' 'outExpo' 'inOutExpo'
'inCirc' 'outCirc' 'inOutCirc'
'inBack' 'outBack' 'inOutBack'
'inBounce' 'outBounce' 'inOutBounce'

// Function
import { cubicBezier, spring } from 'animejs';
ease: cubicBezier(0.7, 0.1, 0.5, 0.9)
ease: spring({ stiffness: 100, damping: 10 })
ease: eases.in(3)  // custom strength
```

---

## V3 → V4: Common Mistakes

| WRONG (v3) | CORRECT (v4) |
|------------|--------------|
| `import anime from 'animejs'` | `import { animate } from 'animejs'` |
| `anime({ targets: '.el' })` | `animate('.el', {})` |
| `anime.timeline()` | `createTimeline()` |
| `translateX` / `translateY` | `x` / `y` |
| `easing: 'easeOutExpo'` | `ease: 'outExpo'` |
| `tl.add({ targets })` | `tl.add('.target', {})` |
| `anime.set()` / `stagger()` | `utils.set()` / `stagger()` imports |
| `anime.random()` | `utils.random()` |
| `animation.finished.then()` | `animation.then()` |
| No built-in cleanup | Use `revert()` or `createScope` |

Key Gotchas:
1. No default export - use named imports
2. Transforms are individual: x, y, rotate, scale
3. Ease names lost the 'ease' prefix
4. Timeline `.add()` takes target as first arg
5. Always cleanup with revert() or createScope

Resources: https://animejs.com/documentation
