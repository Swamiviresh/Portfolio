# Viresh Swami — Portfolio Repository

This repository contains a personal portfolio website for **Viresh Swami**, a Software Developer and IoT enthusiast. The runnable Next.js application lives in **`my-app/`**; the repository root itself is not the npm application directory.

## Application highlights

- Animated hero and profile/about section
- Skills, experience and achievements, education, featured projects, and contact information
- Responsive UI with scroll and interaction animations
- Content-driven sections so profile, skills, education, achievements, and project cards can be edited in one data module

## Tech stack

- Next.js App Router 16, React 19, TypeScript
- Tailwind CSS 4
- Anime.js 4 for UI motion
- Supabase JavaScript/SSR libraries and Giscus integration are included in the application dependencies

## Run locally

Prerequisites: Node.js compatible with the installed Next.js version and npm.

```bash
cd my-app
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The sample environment file contains an optional `NEXT_PUBLIC_RESUME_URL`. Replace the example URL with a public resume PDF URL if you use that override; do not put private tokens in `NEXT_PUBLIC_*` variables because browser bundles can expose them.

## Useful commands

Run these from `my-app/`:

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Where to edit content

Most profile text and project-card data lives in `my-app/src/lib/utils/data.ts`. The page composition is in `my-app/src/app/page.tsx`; reusable section components are under `my-app/src/components/sections/`.

## Repository layout

- `my-app/` — application source, assets, and development docs
- `supabase/` — supporting Supabase project files
- `content/` — ancillary content checked into the repository

This repository is distinct from the newer motion portfolio repository `-Portfolio_Improved`.
