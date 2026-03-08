import { SectionHeader } from "./SectionHeader";
import { motion } from "motion/react";

interface ExperienceSectionProps {
  data: Array<{
    id: string;
    period: string;
    title: string;
    company: string;
    description: string;
    achievements: string[];
  }>;
}

export function ExperienceSection({ data }: ExperienceSectionProps) {
  return (
    <section className="px-6 py-32 max-w-6xl mx-auto">
      <SectionHeader
        id="experience"
        title="Experience"
        description="これまでの経歴と主な実績です"
      />
      <div className="space-y-16">
        {data.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12"
          >
            <div className="md:col-span-3">
              <p
                className="text-muted-foreground"
                style={{ fontSize: "var(--text-sm)" }}
              >
                {exp.period}
              </p>
            </div>
            <div className="md:col-span-9">
              <h3 className="mb-2">{exp.title}</h3>
              <h4 className="text-muted-foreground mb-6">{exp.company}</h4>
              <p className="text-muted-foreground leading-relaxed mb-6" style={{ lineHeight: "1.8" }}>
                {exp.description}
              </p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3"
                      style={{ fontSize: "var(--text-sm)" }}
                    >
                      <span className="text-muted-foreground mt-1">—</span>
                      <span className="text-muted-foreground flex-1">{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}