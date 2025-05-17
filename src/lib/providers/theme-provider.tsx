"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // We'll render the entire application immediately
  // The suppressHydrationWarning is set on the html element in layout.tsx
  // which will handle any hydration mismatches that may occur
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
