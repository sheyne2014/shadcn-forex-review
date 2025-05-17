#!/bin/bash

# Bash script to run the broker import

echo "Starting broker import process..."

# Check if dependencies are installed
if [ ! -d "node_modules/@modelcontextprotocol/sdk" ] || [ ! -d "node_modules/@smithery/sdk" ]; then
  echo "Installing required dependencies..."
  npm install @modelcontextprotocol/sdk @smithery/sdk
fi

# Run the import
echo "Running broker import script..."
npx ts-node -r tsconfig-paths/register scripts/import-brokers.ts

echo "Import process completed. Check the output above for results." 