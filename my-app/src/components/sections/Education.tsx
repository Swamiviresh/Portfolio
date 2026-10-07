"use client";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationProps {
  education: EducationItem[];
}

export default function Education({ education }: EducationProps) {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <AnimateOnScroll className="max-w-4xl mx-auto">
        <div data-animate className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-light mb-4">
            Education
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="space-y-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              data-animate
              className="bg-dark/50 border border-light/10 rounded-xl p-6 hover:border-accent/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-light">
                    {edu.institution}
                  </h3>
                  <p className="text-accent font-medium mt-1">
                    {edu.degree} in {edu.field}
                  </p>
                  <p className="text-sm text-light/50 mt-1">{edu.location}</p>
                  <p className="text-light/70 mt-3 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
                <span className="text-sm text-accent/80 font-medium whitespace-nowrap">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
