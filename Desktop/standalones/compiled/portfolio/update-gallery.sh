#!/bin/bash
# Regenerate gallery manifest from Pictures/Photography folder
# Updates both gallery-manifest.json AND the inline array in portfolio.html
# Run after adding/removing photos:  bash update-gallery.sh

DIR="$(cd "$(dirname "$0")" && pwd)"
PHOTO_DIR="$DIR/Pictures/Photography"
JSON_OUT="$DIR/gallery-manifest.json"
HTML="$DIR/portfolio.html"

files=()
for ext in jpg JPG jpeg JPEG png PNG webp WEBP; do
  for f in "$PHOTO_DIR"/*."$ext"; do
    [ -f "$f" ] && files+=("$(basename "$f")")
  done
done

# Build JSON string
json='['
for i in "${!files[@]}"; do
  [ "$i" -gt 0 ] && json+=','
  json+="\"${files[$i]}\""
done
json+=']'

# Write JSON file
echo "$json" > "$JSON_OUT"

# Update inline manifest in portfolio.html
sed -i "s|const GALLERY_IMAGES = \[.*\];|const GALLERY_IMAGES = $json;|" "$HTML"

echo "Updated gallery with ${#files[@]} images"
echo "  -> $JSON_OUT"
echo "  -> $HTML (inline GALLERY_IMAGES)"
