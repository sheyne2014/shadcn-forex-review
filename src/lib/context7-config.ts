import { Context7Config } from "./context7";
import { siteConfig } from "@/config/site";

// Default Context7 configuration to prevent "configuration not set" errors
export const defaultContext7Config: Context7Config = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ['broker', 'forex', 'trading', 'review', 'comparison'],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    type: "website",
  },
  twitter: {
    cardType: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  canonical: siteConfig.url,
};

// Helper function to ensure a valid Context7 configuration
export function ensureContext7Config(config?: Partial<Context7Config>): Context7Config {
  if (!config) return defaultContext7Config;
  
  return {
    ...defaultContext7Config,
    ...config,
    openGraph: {
      ...defaultContext7Config.openGraph,
      ...config.openGraph,
    },
    twitter: {
      ...defaultContext7Config.twitter,
      ...config.twitter,
    },
  };
} 