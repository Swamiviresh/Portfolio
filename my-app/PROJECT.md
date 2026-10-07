# Viresh Swami - Static Portfolio Website

**Version Control**: User handles git manually. Do not commit or push.

## Overview
A one-page static portfolio generated from hardcoded resume content. No database, no admin panel - simple and fast.

## Product Requirements
- One-page portfolio with static content from `src/lib/utils/data.ts`
- Download Resume button (links to Supabase Storage PDF)
- No blog (removed per request)
- No contact form - just email/phone links
- Contact section shows: email (mailto), phone, location, social links

## Sections
1. Hero - Animated name reveal with download resume button
2. About - Bio, location, contact info, social links
3. Skills - Grouped by category
4. Experience - Achievements, certifications, competitions
5. Education - Academic background
6. Projects - Featured work with descriptions and tech stack
7. Contact - Email, phone, social links
8. Footer

## Design

### Color Palette (CSS Variables + Tailwind Tokens)
| Token | Value | Usage |
|-------|-------|-------|
| primary | #2E6F40 | Buttons, cards |
| light | #CFFFDC | Text, light surfaces |
| accent | #68BA7F | Highlights, links |
| dark | #253D2C | Page background |

- Dark theme by default
- NEVER put #2E6F40 text on #253D2C (very low contrast)
- Meet WCAG AA contrast standards
- Responsive from 360px wide
- Semantic HTML
- Visible keyboard focus

## Motion (anime.js v4)
- Hero intro timeline with split-text name animation
- Scroll-triggered section reveals using IntersectionObserver
- Staggered cards entrance animations
- Timeline line drawing for Experience section
- Subtle hover micro-interactions on cards and buttons
- Scroll progress bar
- Animate transform and opacity only
- Clean up animations with createScope/revert in React
- Honor prefers-reduced-motion
- Avoid layout shift

## Stack
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS
- animejs v4 (animation library)
- Lucide React (icons)

Deploy on Vercel Hobby.

## Data Structure

Static data file: `src/lib/utils/data.ts`

```typescript
export const profile = {
  name: "Viresh Swami",
  headline: "...",
  bio: "...",
  email: "...",
  phone: "...",
  location: "...",
  socialLinks: { GitHub: "...", LinkedIn: "...", Email: "..." }
};

export const skills = [
  { category: "Languages", items: [...] },
  { category: "Tools & Platforms", items: [...] }
];

export const experience = [
  { id, company, role, location, description, startDate, endDate, current }
];

export const education = [
  { id, institution, degree, field, location, startDate, endDate, description }
];

export const projects = [
  { id, title, description, techStack, link, github, image }
];

export const resumeUrl = "https://...";
```

## Resume Storage
Resume PDF is hosted on Supabase Storage:
https://nlmmbqpnshyrovulfmhm.supabase.co/storage/v1/object/public/resume/Resume.pdf

## Environment Variables
Minimal - only needed for resume URL if you want to make it configurable:
```
NEXT_PUBLIC_RESUME_URL=https://... (optional, falls back to hardcoded URL)
```

## Quality Bar
- Lighthouse 90+ (Performance, Accessibility, Best Practices, SEO)
- No console errors
- Works without JavaScript where reasonable

---

## Completed Stages

- [x] **Stage 1: Scaffold** - Next.js, Tailwind, dependencies, dev server runs
- [x] **Stage 2: Public UI** - All sections from seed content
- [x] **Stage 3: Animations** - anime.js v4 scroll reveals, hero animation, staggered cards, hover effects
- [x] **Stage 4: Final** - Static content only, removed admin/database features, simplified architecture

## Status
**COMPLETE** - Static portfolio ready for deployment.
