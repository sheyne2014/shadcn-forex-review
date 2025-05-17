"use client";

import { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

interface ClientSideIconProps {
  name: string;
  className?: string;
}

export function ClientSideIcon({ name, className }: ClientSideIconProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Get the icon component by name from the Lucide icons
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<any>>)[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  return <IconComponent className={className} />;
}
