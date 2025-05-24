'use client';

import React, { ReactNode } from 'react';
import { Context7Provider } from '@/components/Context7Provider';
import { Context7Config } from '@/lib/context7';
import { ensureContext7Config } from '@/lib/context7-config';

interface BrokerDetailClientWrapperProps {
  children: ReactNode;
  seoConfig?: Context7Config;
}

export function BrokerDetailClientWrapper({ children, seoConfig }: BrokerDetailClientWrapperProps) {
  // Ensure we have a valid configuration
  const validConfig = ensureContext7Config(seoConfig);
  
  return (
    <Context7Provider config={validConfig}>
      {children}
    </Context7Provider>
  );
}
