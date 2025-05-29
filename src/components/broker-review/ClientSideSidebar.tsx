"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { ReviewSidebar } from "./ReviewSidebar";

interface ClientSideSidebarProps {
  sections: string[];
}

export function ClientSideSidebar({ sections }: ClientSideSidebarProps) {
  const activeSection = useActiveSection(sections);
  
  return <ReviewSidebar activeSection={activeSection} />;
}
