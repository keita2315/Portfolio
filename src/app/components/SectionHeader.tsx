interface SectionHeaderProps {
  title: string;
  description?: string;
  id: string;
}

export function SectionHeader({ title, description, id }: SectionHeaderProps) {
  return (
    <div id={id} className="mb-32 scroll-mt-32">
      <h2 className="mb-10">{title}</h2>
      {description && (
        <p className="text-muted-foreground max-w-3xl" style={{ fontSize: "2rem", lineHeight: "1.3" }}>
          {description}
        </p>
      )}
    </div>
  );
}