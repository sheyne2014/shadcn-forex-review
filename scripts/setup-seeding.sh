#!/bin/bash

# Setup script for database seeding dependencies

echo "Installing dependencies for database seeding..."

# Install required packages
npm install -D typescript ts-node tsconfig-paths
npm install @modelcontextprotocol/sdk @smithery/sdk

# Check if .env.local exists and contains required variables
if [ -f ".env.local" ]; then
  echo "Checking .env.local for required variables..."
  
  # Check for Supabase variables
  if ! grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local || ! grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
    echo "⚠️  Warning: Supabase environment variables missing in .env.local"
  else
    echo "✅ Supabase environment variables found"
  fi
  
  # Check for MCP API key
  if ! grep -q "MCP_API_KEY" .env.local; then
    echo "⚠️  Warning: MCP_API_KEY missing in .env.local"
  else
    echo "✅ MCP API key found"
  fi
else
  echo "⚠️  Warning: .env.local file not found. Create this file with required environment variables."
fi

# Verify that MCP is properly configured
if [ -f "mcp.json" ]; then
  echo "✅ MCP configuration found in mcp.json"
else
  echo "⚠️  Warning: mcp.json not found. Running MCP tools may fail."
fi

echo "Setup complete! Now you can run the seed script with:"
echo "npx ts-node -r tsconfig-paths/register scripts/seed.ts" 