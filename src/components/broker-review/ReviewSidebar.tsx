"use client";

import { cn } from "@/lib/utils";

interface ReviewSidebarProps {
  activeSection: string;
}

export function ReviewSidebar({ activeSection }: ReviewSidebarProps) {
  const sections = [
    { id: "trading-conditions", label: "Trading Conditions" },
    { id: "social-trading", label: "Social Trading" },
    { id: "platforms", label: "Platforms & Tools" },
    { id: "accounts", label: "Account Types" },
    { id: "regulation", label: "Regulation & Security" },
    { id: "education", label: "Education" },
    { id: "support", label: "Customer Support" },
    { id: "reviews", label: "Reviews" },
    { id: "analysis", label: "Analysis" },
    { id: "faq", label: "FAQ" }
  ];

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hidden lg:block sticky top-24 w-64 h-[calc(100vh-6rem)] overflow-y-auto">
      <nav className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={cn(
              "w-full text-left px-4 py-2 text-sm rounded-lg transition-colors",
              activeSection === section.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </div>
  );
}