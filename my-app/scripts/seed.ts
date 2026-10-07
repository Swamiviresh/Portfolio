// Seeding script for Supabase database
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error("Error: Missing SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function seed() {
  console.log("Starting seed...");
  
  // Profile
  await supabase.from("profile").upsert({
    name: "Viresh Swami",
    headline: "Full Stack Developer",
    bio: "Passionate software engineer.",
    email: "swamiviresh2007@gmail.com",
    phone: "+91 9890659693",
    location: "Bengaluru, India",
    social_links: { GitHub: "https://github.com/Swamiviresh" },
  }, { onConflict: "email" });
  console.log("Profile seeded");
  
  // Skills
  const skills = [
    { name: "Python", category: "Languages", order: 0 },
    { name: "JavaScript", category: "Languages", order: 1 },
    { name: "TypeScript", category: "Languages", order: 2 },
    { name: "React", category: "Frontend", order: 3 },
    { name: "Vite", category: "Frontend", order: 4 },
    { name: "Tailwind CSS", category: "Frontend", order: 5 },
    { name: "Node.js", category: "Backend", order: 6 },
    { name: "Express.js", category: "Backend", order: 7 },
    { name: "Socket.io", category: "Backend", order: 8 },
    { name: "SQLite", category: "Databases", order: 9 },
    { name: "Turso", category: "Databases", order: 10 },
  ];
  await supabase.from("skills").upsert(skills, { onConflict: "name" });
  console.log(`Skills seeded (${skills.length})`);

  // Experience
  await supabase.from("experience").upsert({
    company: "Academic Projects",
    role: "Full Stack Developer",
    description: "Developed Aviator Game, Smart Parking, and Finwise.",
    start_date: "2024",
    end_date: null,
    location: "SIT Tumkur",
    order: 0,
  });
  console.log("Experience seeded");

  // Education
  await supabase.from("education").upsert({
    institution: "Siddaganga Institute of Technology",
    degree: "Bachelor of Engineering",
    field: "Information Science",
    start_date: "2024",
    end_date: "2028",
    location: "Tumkur, Karnataka",
    description: "VTU Affiliated",
    order: 0,
  });
  console.log("Education seeded");

  // Projects
  const projects = [
    { title: "Aviator Crash Game", description: "Real-time game with Canvas 2D.", tech_stack: ["React", "Node.js", "Socket.io"], link: null, github: "https://github.com/Swamiviresh", order: 0 },
    { title: "Smart Parking", description: "IoT parking at smartparking.live.", tech_stack: ["React", "Vite", "Turso"], link: "https://smartparking.live", github: "https://github.com/Swamiviresh", order: 1 },
    { title: "Finwise Tracker", description: "Finance tracking app.", tech_stack: ["TypeScript", "React"], link: null, github: "https://github.com/Swamiviresh/Trackifymoney1", order: 2 },
  ];
  await supabase.from("projects").upsert(projects);
  console.log(`Projects seeded (${projects.length})`);

  // Blog posts
  const blogs = [
    { title: "Migrating to Turso", slug: "migrating-turso", excerpt: "From SQLite to cloud.", content: "Article content here...", status: "published", published_at: "2025-12-01" },
    { title: "Socket.io Guide", slug: "socketio-guide", excerpt: "Real-time apps.", content: "Article content here...", status: "published", published_at: "2025-11-01" },
  ];
  await supabase.from("blog_posts").upsert(blogs, { onConflict: "slug" });
  console.log(`Blog posts seeded (${blogs.length})`);

  // Resume
  await supabase.from("resume").upsert({ file_url: "/resume.pdf" });
  console.log("Resume seeded");

  console.log("\n✅ All done!");
}

seed().catch(console.error);
