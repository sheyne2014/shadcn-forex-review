# Vercel Deployment Guide

This document provides instructions for deploying the BrokerAnalysis platform to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- Your project pushed to a GitHub repository
- Supabase project with necessary tables and configuration

## Deployment Steps

### 1. Connect Your Repository to Vercel

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Select your GitHub repository (shadcn-forex-review)
4. Configure the project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next

### 2. Configure Environment Variables

Add the following environment variables in the Vercel project settings:

```
# Required Variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=your_vercel_deployment_url

# API Keys
MCP_API_KEY=your_mcp_api_key
BRAVE_SEARCH_API_KEY=your_brave_search_api_key
EXA_API_KEY=your_exa_api_key

# Image API Keys
PEXELS_API_KEY=your_pexels_api_key
PIXABAY_API_KEY=your_pixabay_api_key
UNSPLASH_API_KEY=your_unsplash_api_key

# SEO Verification
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code
NEXT_PUBLIC_BING_VERIFICATION=your_bing_verification_code
NEXT_PUBLIC_YANDEX_VERIFICATION=your_yandex_verification_code
```

### 3. Deploy Your Project

1. Click "Deploy" to start the deployment process
2. Vercel will build and deploy your application
3. Once complete, you'll receive a deployment URL

### 4. Custom Domain Setup (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain and follow the verification steps

## Troubleshooting

### Build Failures

If your build fails, check the following:

1. Ensure all dependencies are correctly listed in package.json
2. Check that all required environment variables are set
3. Review the build logs for specific errors

### Runtime Errors

If your application deploys but doesn't work correctly:

1. Check browser console for JavaScript errors
2. Verify environment variables are correctly set
3. Ensure Supabase connection is working properly

## Continuous Deployment

Vercel automatically deploys when you push changes to your repository. You can configure deployment settings in your project settings:

1. Go to your project settings
2. Navigate to "Git"
3. Configure branch deployments and preview deployments as needed

## Monitoring and Analytics

Vercel provides built-in analytics and monitoring:

1. Go to your project dashboard
2. Navigate to "Analytics" to view performance metrics
3. Check "Logs" for runtime errors and issues

## Support

If you encounter issues with your Vercel deployment, refer to:

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)
