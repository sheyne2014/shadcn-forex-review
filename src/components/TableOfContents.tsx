"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  contentSelector?: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
  active?: boolean;
}

export function TableOfContents({ contentSelector = ".mdx-content" }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings from the content
  useEffect(() => {
    const content = document.querySelector(contentSelector);
    if (!content) return;

    // Find all h2 and h3 elements
    const headingElements = content.querySelectorAll("h2, h3");
    
    const items: TOCItem[] = Array.from(headingElements)
      .filter(el => el.id) // Filter out headings without IDs
      .map(el => ({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
        active: false
      }));
    
    setHeadings(items);
  }, [contentSelector]);

  // Track active heading during scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
        threshold: 0
      }
    );

    // Observe all heading elements
    const headingElements = document.querySelectorAll("h2[id], h3[id]");
    headingElements.forEach(el => observer.observe(el));

    return () => {
      headingElements.forEach(el => observer.unobserve(el));
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <div className="not-prose sticky top-20 max-h-[calc(100vh-5rem)] overflow-auto p-4 bg-card/50 border rounded-lg shadow-sm">
      <h4 className="text-base font-semibold mb-4">Table of Contents</h4>
      <nav>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li 
              key={heading.id} 
              className={cn(
                heading.level === 3 && "ml-4",
                "transition-colors"
              )}
            >
              <a 
                href={`#${heading.id}`}
                className={cn(
                  "block hover:text-primary py-1 transition-colors border-l-2",
                  activeId === heading.id
                    ? "text-primary border-primary font-medium"
                    : "text-muted-foreground border-transparent",
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 