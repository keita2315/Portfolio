import { cn } from "./ui/utils";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function NavItem({ href, children, active, onClick }: NavItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "transition-all duration-300 relative py-1 text-base",
        active
          ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-white"
          : "text-white/60 hover:text-white"
      )}
    >
      {children}
    </a>
  );
}