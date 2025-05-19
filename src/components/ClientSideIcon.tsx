"use client";

import { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { ComponentType } from 'react';

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

  // Filter out non-component exports from LucideIcons
  const iconComponents = Object.entries(LucideIcons).reduce((acc, [key, value]) => {
    // Check if it's a valid component (function or object with render method)
    if (typeof value === 'function' && key !== 'createLucideIcon') {
      acc[key] = value as ComponentType<any>;
    }
    return acc;
  }, {} as Record<string, ComponentType<any>>);

  // Get the icon component by name
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  return <IconComponent className={className} />;
}
