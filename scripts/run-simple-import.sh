#!/bin/bash

# Bash script to run the simplified broker import

echo "Starting simplified broker import process..."

# Check if dependencies are installed
if [ ! -d "node_modules/dotenv" ] || [ ! -d "node_modules/@supabase/supabase-js" ]; then
  echo "Installing required dependencies..."
  npm install dotenv @supabase/supabase-js
fi

# Run the import
echo "Running simplified broker import script..."
node scripts/import-simple.js

echo "Import process completed. Check the output above for results." 