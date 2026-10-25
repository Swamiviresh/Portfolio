# Viresh Swami — Portfolio Application

The personal portfolio site for **Viresh Swami**, a Software Developer and IoT enthusiast, built with Next.js, TypeScript, Tailwind CSS, and Anime.js.

## Sections

1. Animated hero and introduction
2. About and social links
3. Skills
4. Experience, achievements, and certifications
5. Education
6. Featured projects
7. Contact information

## Tech stack

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS 4
- Anime.js 4 for motion and interaction
- Supabase JavaScript/SSR libraries and Giscus are included in the dependency set
- React Markdown with sanitization for Markdown rendering

## Development

Run commands from the `my-app/` directory (the app directory):

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The sample `.env.example` contains an optional `NEXT_PUBLIC_RESUME_URL`. Replace its placeholder with a public resume PDF URL if you use the override. Never place private credentials in `NEXT_PUBLIC_*` variables because they can be exposed in browser code.

## Useful commands

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Updating content

Most profile information, skills, experience/achievements, education, and project-card data lives in `src/lib/utils/data.ts`. The home page composes the page from section components under `src/components/sections/`.

Animation notes and other development references are in `docs/`.

## Deployment

The application is designed to be deployed as a Next.js site. Configure any optional integrations and the resume URL in the hosting environment, and verify the deployment project's root directory is set to `my-app` when deploying from the repository root.
