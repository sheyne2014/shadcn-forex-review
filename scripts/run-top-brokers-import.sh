#!/bin/bash

# Bash script to run the top 100 brokers import

echo "Starting top 100 brokers import process..."

# Check if dependencies are installed
if [ ! -d "node_modules/@modelcontextprotocol/sdk" ] || [ ! -d "node_modules/@supabase/supabase-js" ]; then
  echo "Installing required dependencies..."
  npm install @modelcontextprotocol/sdk @supabase/supabase-js dotenv
fi

# Run the import
echo "Running top brokers import script..."
node scripts/import-top-brokers.js

echo "Import process completed. Check the output above for results." 