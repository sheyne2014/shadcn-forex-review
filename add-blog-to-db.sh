#!/bin/bash

BLOG_FILE="$1"

echo "Adding blog post to Supabase database..."

if [ -n "$BLOG_FILE" ]; then
  echo "Using file: $BLOG_FILE"
  npm run add-blog-post "$BLOG_FILE"
else
  echo "No file specified, using default blog post"
  npm run add-blog-post
fi

if [ $? -eq 0 ]; then
  echo "Blog post successfully added to database!"
else
  echo "Failed to add blog post to database. Check the error message above."
  exit 1
fi 