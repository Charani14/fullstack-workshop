#!/bin/bash

# Check if directory argument is provided
if [ -z "$1" ]; then
  echo "Usage: ./file-organizer.sh /path/to/directory"
  exit 1
fi

TARGET_DIR="$1"

# Check if directory exists
if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Directory does not exist."
  exit 1
fi

declare -A file_count

# Loop through files in the directory
for file in "$TARGET_DIR"/*; do
  # Skip if it's not a regular file
  [ -f "$file" ] || continue

  filename=$(basename "$file")

  # Extract extension
  extension="${filename##*.}"

  # Handle files with no extension
  if [ "$filename" = "$extension" ]; then
    extension="no_extension"
  fi

  # Create directory for extension if it doesn't exist
  mkdir -p "$TARGET_DIR/$extension"

  # Move file
  mv "$file" "$TARGET_DIR/$extension/"

  # Count files
  ((file_count["$extension"]++))
done

# Print summary
for ext in "${!file_count[@]}"; do
  echo "Organized ${file_count[$ext]} .$ext files"
done
