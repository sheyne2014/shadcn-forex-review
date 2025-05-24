# Broker Logo Finder

This directory contains scripts to find and download official logos for brokers in the database.

## Overview

The broker logo finder scripts use various methods to find and download official logos for brokers:

1. **Basic Logo Finder** (`find-missing-broker-logos.js`): Uses Google Images to search for broker logos.
2. **Advanced Logo Finder** (`find-broker-logos-advanced.js`): Uses multiple methods to find logos:
   - Clearbit API
   - Broker's official website
   - Google Images

## Prerequisites

Before running the scripts, make sure you have:

1. Node.js installed
2. Supabase credentials in your `.env` file
3. MCP (Model Context Protocol) tools installed

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Running the Scripts

### Using npm scripts

```bash
# Run the basic logo finder
npm run find-broker-logos

# Run the advanced logo finder
npm run find-broker-logos-advanced
```

### Using PowerShell scripts

```powershell
# Run the basic logo finder
.\scripts\run-logo-finder.ps1

# Run the advanced logo finder
.\scripts\run-logo-finder-advanced.ps1
```

### Using Bash scripts

```bash
# Run the basic logo finder
bash scripts/run-logo-finder.sh

# Run the advanced logo finder
bash scripts/run-logo-finder-advanced.sh
```

## How It Works

### Basic Logo Finder

1. Fetches all brokers from the database
2. Filters out brokers that already have valid logos
3. For each broker without a logo:
   - Searches Google Images for the broker's logo
   - Downloads the first relevant image
   - Updates the broker's record in the database

### Advanced Logo Finder

1. Fetches all brokers from the database
2. Filters out brokers that already have valid logos
3. For each broker without a logo, tries the following methods in order:
   - **Clearbit API**: Tries to get the logo from Clearbit using various domain variations
   - **Broker's Website**: Navigates to the broker's website and looks for logo images
   - **Google Images**: Searches Google Images for the broker's logo
4. Updates the broker's record in the database with the first successful logo

## Results

The scripts save results to JSON files in the `broker-logos` directory:

- `logo-results.json`: Results from the basic logo finder
- `logo-results-advanced.json`: Results from the advanced logo finder

These files contain information about each broker processed, including:
- Broker name and ID
- Status (success or error)
- Logo URL (if found)
- Source of the logo (for the advanced finder)

## Troubleshooting

If you encounter issues:

1. **Puppeteer Connection Issues**: Make sure the Puppeteer MCP server is running
2. **Database Connection Issues**: Check your Supabase credentials
3. **Permission Issues**: Make sure the script has permission to write to the `public/images/brokers` directory

## Customization

You can customize the scripts by modifying:

- The logo search methods
- The directory where logos are saved
- The domain variations to try
- The criteria for identifying logo images

## License

This project is licensed under the same license as the main project.
