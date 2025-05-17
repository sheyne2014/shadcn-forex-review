# Broker Import Scripts

This directory contains scripts for importing broker data into the Supabase database.

## Available Scripts

### Top 100 Brokers Import

Imports top 100 brokers across various categories (forex, stocks, ETFs, crypto, options, futures, CFDs, bonds).

**Requirements:**
- Valid `.env.local` file with:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `MCP_API_KEY` (for web scraping)

**Running the script:**

Windows:
```
.\scripts\run-top-brokers-import.ps1
```

Mac/Linux:
```
./scripts/run-top-brokers-import.sh
```

### Forex Brokers Import

Imports a hardcoded list of forex brokers.

**Requirements:**
- Valid `.env.local` file with:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

**Running the script:**

Windows:
```
.\scripts\run-import.ps1
```

Mac/Linux:
```
./scripts/run-broker-import.sh
```

### Simplified Broker Import

For users experiencing issues with MCP tools, this is a simpler version that uses hardcoded data.

**Requirements:**
- Valid `.env.local` file with:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

**Running the script:**

Windows:
```
.\scripts\run-simple-import.ps1
```

Mac/Linux:
```
./scripts/run-simple-import.sh
```

## How the Scripts Work

1. The scripts first check if categories exist in the database. If not, they create them.
2. Then they fetch broker data from various sources using web scraping.
3. For each broker, they collect:
   - Name
   - Website
   - Logo URL
   - Rating
   - Min deposit
   - Regulations
   - Trading fees
   - Country
   - Supported assets
4. Finally, they import this data into the Supabase database and link brokers to categories.

## Troubleshooting

If you encounter problems:

1. Make sure your `.env.local` file has the correct credentials
2. Check that you have internet access for web scraping
3. Make sure Supabase is accessible
4. Check the Row-Level Security (RLS) policies are allowing the operations 

# Blog Import Scripts

This directory contains scripts to help you import and manage blog posts in your Supabase database.

## Prerequisites

Before running these scripts, make sure you have:

1. Node.js installed (v14 or higher)
2. Your Supabase URL and Anon Key available in environment variables
3. MDX blog posts in the `src/app/blog` directory

## Environment Setup

Create a `.env` file in the `scripts` directory with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Install Dependencies

Run the following command to install required packages:

```bash
cd scripts
npm install
```

## Available Scripts

### 1. Update MDX Frontmatter

This script adds or updates the frontmatter in your MDX blog post files to ensure they have all required metadata fields.

```bash
node update-mdx-frontmatter.js
```

This will:
- Generate title if missing
- Add publication date
- Create excerpts
- Assign categories
- Extract tags
- Calculate reading time
- Add placeholder images if missing

### 2. Create Blog Categories

This script ensures all required blog categories exist in your Supabase database.

```bash
node create-blog-categories.js
```

### 3. Import Blog Posts

This script reads the MDX files and imports them into your Supabase database.

```bash
node import-blog-posts.js
```

## Workflow

The recommended workflow for importing blog posts is:

1. First, create the necessary categories:
   ```bash
   node create-blog-categories.js
   ```

2. Update the frontmatter in your MDX files:
   ```bash
   node update-mdx-frontmatter.js
   ```

3. Import the blog posts into Supabase:
   ```bash
   node import-blog-posts.js
   ```

## Blog Post Requirements

Each blog post should have the following frontmatter fields:

```yaml
---
title: "Your Blog Post Title"
date: "2025-01-15T12:00:00Z"
excerpt: "A brief summary of your blog post content"
category: "forex"
tags: ["forex", "trading", "analysis"]
readingTime: 8
image: "https://example.com/your-image.jpg"
---
```

If any fields are missing, the scripts will try to generate appropriate values 