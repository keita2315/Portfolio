import { Github, Mail, Copy, Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface ContactSectionProps {
  data: {
    email: string;
    email2: string;
    github: string;
    twitter: string;
  };
}

export function ContactSection({ data }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = async (email: string, label: string) => {
    try {
      // Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      
      setCopiedEmail(email);
      toast.success(`${label}をコピーしました`, {
        duration: 2000,
      });
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("コピーに失敗しました");
    }
  };

  const contacts = {
    github: {
      id: "github",
      label: "GitHub",
      value: data.github.replace("https://github.com/", "@"),
      href: data.github,
      icon: Github,
      iconBg: "bg-gray-100 dark:bg-gray-800",
      iconColor: "text-gray-700 dark:text-gray-300",
    },
    email1: {
      id: "email",
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
      icon: Mail,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    email2: {
      id: "email2",
      label: "Email（大学用）",
      value: data.email2,
      href: `mailto:${data.email2}`,
      icon: Mail,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
  };

  return (
    <section className="px-6 md:px-12 py-24 md:py-48 max-w-7xl mx-auto">
      <motion.div
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4 md:space-y-6 mb-16 md:mb-24 scroll-mt-32"
      >
        <h2>Contact</h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
          ご質問などがありましたら、お気軽にご連絡ください。 多くの方との交流を楽しみにしています！
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-secondary/30 rounded-lg p-6 md:p-12 space-y-8 md:space-y-12">
          {/* Contact Cards Grid */}
          <div className="space-y-6">
            {/* GitHub - 1行目中央 */}
            <div className="flex justify-center">
              <motion.a
                href={contacts.github.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group bg-background rounded-lg p-5 md:p-6 border border-border hover:border-foreground/20 hover:shadow-md transition-all duration-300 w-full md:w-[calc(50%-12px)]"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${contacts.github.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Github className={`w-5 h-5 md:w-6 md:h-6 ${contacts.github.iconColor}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm md:text-base font-medium mb-1">
                      {contacts.github.label}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      {contacts.github.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Email 2つ - 2行目 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[contacts.email1, contacts.email2].map((contact, index) => {
                const Icon = contact.icon;
                const isCopied = copiedEmail === contact.value;
                return (
                  <motion.button
                    key={contact.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopyEmail(contact.value, contact.label);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className="group bg-background rounded-lg p-5 md:p-6 border border-border hover:border-foreground/20 hover:shadow-md transition-all duration-300 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${contact.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${contact.iconColor}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm md:text-base font-medium mb-1">
                          {contact.label}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">
                          {contact.value}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        {isCopied ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}