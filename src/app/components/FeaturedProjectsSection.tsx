import { SectionHeader } from "./SectionHeader";
import { motion } from "motion/react";
import { Github } from "lucide-react";

interface FeaturedProjectsSectionProps {
  data: Array<{
    id: string;
    title: string;
    description: string;
    tags: string[];
    metrics: string;
    imageUrl: string;
    githubUrl: string;
  }>;
}

export function FeaturedProjectsSection({
  data,
}: FeaturedProjectsSectionProps) {
  return (
    <section className="px-6 md:px-12 py-24 md:py-48 max-w-7xl mx-auto">
      <SectionHeader
        id="projects"
        title="Projects"
        description="これまで取り組んだ主要プロジェクト"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {data.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  metrics: string;
  imageUrl: string;
  githubUrl: string;
}

function ProjectCard({
  id,
  title,
  description,
  tags,
  metrics,
  imageUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="space-y-8">
        {imageUrl && (
          <div className="aspect-[16/9] bg-secondary overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        )}
        <div className="space-y-6 pt-4">
          <h3 className="group-hover:text-muted-foreground transition-colors">
            {title}
          </h3>
          <p
            className="text-muted-foreground leading-relaxed max-w-4xl text-lg"
          >
            {description}
          </p>
          {metrics && (
            <p className="text-foreground text-base">
              {metrics}
            </p>
          )}
          <div className="flex flex-wrap gap-4 pt-4">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-muted-foreground border-b border-border text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="inline-block mr-2" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}