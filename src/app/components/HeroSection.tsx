import { Github, Mail, Twitter } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  data: {
    name: string;
    nameEn: string;
    title: string;
    catchphrase: string;
    email: string;
    email2: string;
    github: string;
    twitter: string;
    heroImage: string;
  };
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section id="hero" className="min-h-screen flex items-center px-6 md:px-12 py-24 md:py-48">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 md:space-y-16"
          >
            <div className="space-y-4 md:space-y-8">
              <h1 className="text-6xl md:text-[8rem]" style={{ lineHeight: "0.9" }}>
                {data.nameEn}
              </h1>
              <p className="text-muted-foreground max-w-3xl text-lg md:text-xl">
                {data.title}
              </p>
            </div>

            <p className="text-muted-foreground max-w-3xl leading-relaxed text-base md:text-lg">
              {data.catchphrase}
            </p>

            <div className="flex flex-wrap items-center gap-6 md:gap-10 pt-6 md:pt-12">
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="border-b border-transparent group-hover:border-foreground transition-colors text-base">
                    GitHub
                  </span>
                </a>
              )}
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-foreground text-background px-6 md:px-8 py-3 md:py-4 rounded-md hover:opacity-80 transition-opacity text-sm md:text-base font-medium"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                Contact
              </a>
            </div>
          </motion.div>

          {data.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square rounded-lg overflow-hidden shadow-2xl"
            >
              <img
                src={data.heroImage}
                alt={data.nameEn}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}