import { SectionHeader } from "./SectionHeader";
import { motion } from "motion/react";
import {
  Code,
  Database,
  Cloud,
  Smartphone,
  Palette,
  GitBranch,
  Terminal,
  Award,
  Trophy,
  CheckCircle,
} from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  items: string[];
}

interface SkillsSectionProps {
  data: {
    skills: SkillCategory[];
    certifications: Array<{
      id: string;
      name: string;
      issuer: string;
      date: string;
    }>;
    achievements: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  code: Code,
  database: Database,
  cloud: Cloud,
  smartphone: Smartphone,
  palette: Palette,
  gitBranch: GitBranch,
  terminal: Terminal,
  award: Award,
  trophy: Trophy,
  checkCircle: CheckCircle,
};

export function SkillsSection({ data }: SkillsSectionProps) {
  return (
    <section className="px-6 md:px-12 py-24 md:py-48 max-w-7xl mx-auto">
      <SectionHeader
        id="skills"
        title="Skills & Expertise"
        description="技術スキル、保有資格、および実績の一覧"
      />

      {/* Skills Grid */}
      {data.skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:mb-48"
        >
          <h3 className="mb-12 md:mb-16">技術スタック</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.skills.map((category, index) => {
              const Icon = iconMap[category.icon] || Code;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-background rounded-lg p-6 border border-border hover:border-foreground/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-10 h-10 rounded-lg ${category.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${category.iconColor}`} />
                    </div>
                    <h4 className="text-base font-medium">{category.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-foreground/30 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:mb-48"
        >
          <h3 className="mb-12 md:mb-16">保有資格</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-lg p-6 border border-border hover:border-foreground/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-medium mb-2">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="mb-12 md:mb-16">実績・受賞歴</h3>
          <div className="space-y-6">
            {data.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-lg p-6 border border-border hover:border-foreground/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base md:text-lg font-medium mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
