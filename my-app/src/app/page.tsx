import {
  Hero,
  About,
  Skills,
  Experience,
  Education,
  Projects,
  Contact,
} from "@/components/sections";
import { ScrollProgress } from "@/components/ui";
import { profile, skills, experience, education, projects } from "@/lib/utils/data";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero
        name={profile.name}
        headline={profile.headline}
        email={profile.email}
      />

      <About
        bio={profile.bio}
        phone={profile.phone}
        location={profile.location}
        socialLinks={profile.socialLinks}
      />

      <Skills skills={skills} />

      <Experience experience={experience} />

      <Education education={education} />

      <Projects projects={projects} />

      <Contact
        email={profile.email}
        phone={profile.phone}
        socialLinks={profile.socialLinks}
      />
    </>
  );
}


