import { useEffect, useState } from "react";
import { NavItem } from "./NavItem";
import { ThemeToggle } from "./ThemeToggle";
import { Edit } from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#research", label: "Research" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

interface HeaderProps {
  onEditClick: () => void;
  name: string;
  isEditMode: boolean;
}

export function Header({ onEditClick, name, isEditMode }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // 現在のセクションを検出
      const sections = navItems.map((item) => item.href.slice(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black text-white border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-12 py-10">
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="tracking-tight hover:opacity-60 transition-opacity text-2xl text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em" }}
          >
            Keitatsu Suzuki / Portfolio
          </a>
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                active={activeSection === item.href.slice(1)}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </NavItem>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            {isEditMode && (
              <button
                onClick={onEditClick}
                className="p-2 hover:opacity-60 transition-opacity text-white"
                aria-label="編集"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
}