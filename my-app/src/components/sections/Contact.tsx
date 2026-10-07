"use client";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface ContactProps {
  email: string;
  phone: string;
  socialLinks: Record<string, string>;
}

const socialIcons: Record<string, string> = {
  GitHub: "GitHub",
  LinkedIn: "LinkedIn",
  Twitter: "X",
  Portfolio: "Portfolio",
};

export default function Contact({ email, phone, socialLinks }: ContactProps) {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <AnimateOnScroll className="max-w-4xl mx-auto">
        <div data-animate className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-light mb-4">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div data-animate className="bg-dark/50 border border-light/10 rounded-xl p-8 md:p-12">
          <p className="text-light/70 text-center text-lg mb-8 max-w-xl mx-auto">
            I&apos;m always interested in hearing about new projects and opportunities.
            Feel free to reach out if you&apos;d like to connect or discuss potential collaboration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-light hover:text-accent transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-lg">{email}</span>
            </a>

            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-light hover:text-accent transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-lg">{phone}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {Object.entries(socialLinks).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                <span>{socialIcons[name] || name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
