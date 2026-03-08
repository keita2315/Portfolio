import { cn } from "./ui/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-sm transition-colors",
        variant === "default" &&
          "bg-secondary text-secondary-foreground",
        variant === "outline" &&
          "border border-border bg-transparent text-foreground",
        className
      )}
      style={{ fontSize: "var(--text-xs)" }}
    >
      {children}
    </span>
  );
}
