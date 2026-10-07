# Viresh Swami - Portfolio

Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Live Site
[Viresh Swami Portfolio](https://your-domain.vercel.app)

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** anime.js v4
- **Icons:** Lucide React

## Sections
1. Hero with animated name reveal
2. About with social links
3. Skills grouped by category
4. Experience (Achievements & Certifications)
5. Education
6. Featured Projects
7. Contact

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Updating Content

All content is stored in `src/lib/utils/data.ts`. Edit this file to update:
- Profile information (name, bio, email, location)
- Skills
- Experience/Achievements
- Education
- Projects

## Resume
Resume PDF is hosted on Supabase Storage:
https://nlmmbqpnshyrovulfmhm.supabase.co/storage/v1/object/public/resume/Resume.pdf

## Deployment
Deployed on Vercel. Push to main branch triggers automatic deployment.
