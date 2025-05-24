#!/bin/bash

# Bash script to run the advanced broker logo finder

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Check if Supabase environment variables are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "Error: Supabase environment variables are not set. Please check your .env file."
    exit 1
fi

# Run the advanced logo finder script
echo "Starting advanced broker logo finder..."
node scripts/find-broker-logos-advanced.js

# Check if the script ran successfully
if [ $? -eq 0 ]; then
    echo "Advanced broker logo finder completed successfully."
else
    echo "Error: Advanced broker logo finder failed."
    exit 1
fi
