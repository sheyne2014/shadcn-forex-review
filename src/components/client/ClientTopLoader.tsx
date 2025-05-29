"use client";

import { useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";

export function ClientTopLoader({ showSpinner = false }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }
  
  return <NextTopLoader showSpinner={showSpinner} />;
}
