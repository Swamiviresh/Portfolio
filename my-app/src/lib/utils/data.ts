// Static portfolio data for Viresh Swami
// Based on resume: https://nlmmbqpnshyrovulfmhm.supabase.co/storage/v1/object/public/resume/Resume.pdf

export const profile = {
  name: "Viresh Swami",
  headline: "Software Developer & IoT Enthusiast",
  bio: "Passionate software developer with hands-on experience building real-time multiplayer applications, IoT-integrated web solutions, and full-stack projects. Currently pursuing Bachelor of Engineering in Information Science & Engineering at Siddaganga Institute of Technology. Skilled in Python, HTML, CSS, Git, and modern web technologies.",
  email: "swamiviresh2007@email.com",
  phone: "+91 9890659693",
  location: "Bengaluru, Karnataka, India",
  socialLinks: {
    GitHub: "https://github.com/Swamiviresh",
    LinkedIn: "#",
    Email: "mailto:swamiviresh2007@email.com",
  },
};

export const skills = [
  {
    category: "Languages",
    items: ["Python", "HTML", "CSS"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "Render", "Namecheap", "VS Code", "Claude Code", "Cursor"],
  },
];

export const experience = [
  {
    id: "1",
    company: "CORSIT - Siddaganga Institute of Technology",
    role: "1st Place Winner - Robotics Workshop '26",
    location: "Tumkur, Karnataka",
    description:
      "Secured 1st Place in the Robotics Workshop '26 (ROBOCOR '26) organized by CORSIT club. Recognized for outstanding performance, innovation, and technical excellence. Certificate signed by Dr. S. V. Dinesh (Principal) and Dr. H. S. Shridhar (Club Mentor). Also participated in Arcane Quiz competition.",
    startDate: "April 2026",
    endDate: "April 2026",
    current: false,
  },
];

export const education = [
  {
    id: "1",
    institution: "Siddaganga Institute of Technology",
    degree: "Bachelor of Engineering",
    field: "Information Science & Engineering",
    location: "Tumkur, Karnataka",
    startDate: "2025",
    endDate: "2029",
    description: "Affiliated to Visvesvaraya Technological University (VTU), Belgaum. CGPA: 7.93 (1st Year).",
  },
  {
    id: "2",
    institution: "Sri Chaitanya Educational Institute",
    degree: "Senior Secondary (12th)",
    field: "Science Stream",
    location: "Pune, Maharashtra",
    startDate: "2023",
    endDate: "2024",
    description: "Percentage: 67.83% (12th).",
  },
  {
    id: "3",
    institution: "Podar International School",
    degree: "Secondary Education (1st - 10th)",
    field: "",
    location: "Latur",
    startDate: "2014",
    endDate: "2023",
    description: "Percentage: 92.16% (10th).",
  },
];

export const projects = [
  {
    id: "1",
    title: "Aviator Crash Game",
    description:
      "A real-time multiplayer crash gambling game inspired by popular aviator-style games. Features Canvas 2D animation for plane drawing, optimistic cashout UI, and cancel-bet flow. Migrated from local SQLite to Turso cloud SQLite using @libsql/client to resolve data loss issues on Render's ephemeral filesystem.",
    techStack: ["React", "Node.js", "Express", "Socket.io", "Turso"],
    link: null,
    github: "https://github.com/Swamiviresh",
    image: "/images/aviator-game.png",
  },
  {
    id: "2",
    title: "Smart Parking Web App",
    description:
      "IoT-integrated academic project deployed at smartparking.live with multi-level parking management, time-based slot booking, slot selection, and disability accommodation. Migrated database from local SQLite to Turso cloud for reliable persistent storage. Collaborated with a 6-member cross-disciplinary team on an approx. ₹8,000 budget.",
    techStack: ["React", "Vite", "Tailwind", "Node.js", "Turso"],
    link: "https://smartparking.live",
    github: "https://github.com/Swamiviresh",
    image: "/images/smart-parking.png",
  },
  {
    id: "3",
    title: "Finwise Money Tracker",
    description:
      "A personal finance tracking web application built with TypeScript and React. Manage and visualize income/expenses with type safety and component reusability.",
    techStack: ["TypeScript", "React"],
    link: null,
    github: "https://github.com/Swamiviresh/Trackifymoney1",
    image: "/images/finwise-money-tracker.png",
  },
  {
    id: "4",
    title: "File Format Converter",
    description:
      "A browser-based file conversion utility with safe environment variable handling and comprehensive error states. Demonstrates understanding of web APIs and client-side file processing.",
    techStack: ["TypeScript", "React"],
    link: null,
    github: "https://github.com/Swamiviresh/Convert",
    image: "/images/File converter.PNG",
  },
];

// Resume PDF URL from Supabase Storage
export const resumeUrl = "https://nlmmbqpnshyrovulfmhm.supabase.co/storage/v1/object/public/resume/Resume.pdf";
