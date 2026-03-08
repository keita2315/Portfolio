import { ArrowUpRight, Github } from "lucide-react";
import { Tag } from "./Tag";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  metrics?: string;
  imageUrl?: string;
  githubUrl?: string;
  onClick?: () => void;
}

export function ProjectCard({
  title,
  description,
  tags,
  metrics,
  imageUrl,
  githubUrl,
  onClick,
}: ProjectCardProps) {
  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (githubUrl) {
      window.open(githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="group bg-card border border-border rounded-lg overflow-hidden hover:border-foreground transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {imageUrl && (
        <div className="aspect-video bg-muted overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3>{title}</h3>
          <div className="flex items-center gap-2">
            {githubUrl && (
              <button
                onClick={handleGithubClick}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </button>
            )}
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
        </div>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        {metrics && (
          <p
            className="text-foreground mb-4"
            style={{ fontSize: "var(--text-sm)" }}
          >
            {metrics}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag key={index} variant="outline">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}