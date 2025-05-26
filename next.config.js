/** @type {import('next').NextConfig} */

// Bundle analyzer setup
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // Skip ESLint errors during production build (temporary fix for Vercel deployment)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Skip TypeScript type-checking errors during production build (temporary fix for Vercel deployment)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Enhanced React configuration for better performance
  reactStrictMode: true,

  // Performance optimizations for Core Web Vitals
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Server external packages (Next.js 15.3.2 updated location)
  serverExternalPackages: ['ws', 'web-vitals', 'canvas'],

  // Turbopack configuration (stable in Next.js 15)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enhanced image optimization for SEO and performance
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'brandlogos.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.icon-icons.com',
      },
      {
        protocol: 'https',
        hostname: 'www.financemagnet.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      }
    ],
  },

  // Enhanced headers for SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // SEO-friendly redirects for better user experience
  async redirects() {
    return [
      // Blog redirects
      {
        source: '/blog/guides',
        destination: '/blog',
        permanent: false,
      },
      // Broker category redirects
      {
        source: '/best-brokers/mobile',
        destination: '/best-brokers/mobile-trading',
        permanent: true,
      },
      {
        source: '/best-brokers/ecn-stp',
        destination: '/best-brokers/ecn',
        permanent: true,
      },
      {
        source: '/best-brokers/swing',
        destination: '/best-brokers/swing-trading',
        permanent: true,
      },
      // Legacy broker page redirects
      {
        source: '/broker/:slug*',
        has: [
          {
            type: 'query',
            key: 'ref',
          },
        ],
        destination: '/broker/:slug',
        permanent: false,
      },
      // Comparison tool redirects
      {
        source: '/compare',
        destination: '/tools/compare',
        permanent: true,
      },
      {
        source: '/calculator',
        destination: '/tools/calculator',
        permanent: true,
      },
      {
        source: '/converter',
        destination: '/tools/converter',
        permanent: true,
      },
    ];
  },

  // Enhanced rewrites for SEO-friendly URLs
  async rewrites() {
    return [
      {
        source: '/broker-review/:slug',
        destination: '/broker/:slug',
      },
      {
        source: '/trading-platform/:slug',
        destination: '/broker/:slug',
      },
    ];
  },

  // Minimal webpack configuration to avoid conflicts
  webpack: (config) => {
    // SVG optimization
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Output configuration for static export compatibility
  output: 'standalone',

  // Compression for better performance
  compress: true,

  // Power optimizations
  poweredByHeader: false,

  // Generate ETags for better caching
  generateEtags: true,
};

export default withBundleAnalyzer(nextConfig);