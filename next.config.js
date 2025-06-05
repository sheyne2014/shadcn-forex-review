/** @type {import('next').NextConfig} */

const nextConfig = {
  // Re-enable checks after fixing issues
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Re-enable TypeScript checks after fixing issues
  typescript: {
    ignoreBuildErrors: false,
  },

  // Enhanced React configuration for better performance and stability
  reactStrictMode: true,

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Performance optimizations (swcMinify is enabled by default in Next.js 15)

  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
    ],
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
      },
      {
        protocol: 'https',
        hostname: 'altcoinsbox.com',
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
      // Legacy broker page redirects - redirect old /brokers/[slug] to /broker/[slug]
      {
        source: '/brokers/:slug',
        destination: '/broker/:slug',
        permanent: true,
      },
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

  // Enhanced webpack configuration for better module resolution
  webpack: (config, { isServer }) => {
    // SVG optimization
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Improved module resolution for React 19 and Next.js 15 compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
    };

    // Better handling of ES modules
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };

    // Optimize module resolution
    config.resolve.symlinks = false;

    // Better handling of client/server boundaries
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

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

export default nextConfig;