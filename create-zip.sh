#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PLUGIN_DIR="$SCRIPT_DIR"
PARENT_DIR="$(dirname "$PLUGIN_DIR")"
PLUGIN_NAME="$(basename "$PLUGIN_DIR")"
VERSION="$(grep -E "^\s*\*\s*Version:" "$PLUGIN_DIR/twork-builder.php" | head -1 | sed -E 's/.*Version:[[:space:]]*//' | tr -d '[:space:]')"
ZIP_FILE="$PLUGIN_DIR/${PLUGIN_NAME}-${VERSION}.zip"

if [ ! -f "$PLUGIN_DIR/twork-builder.php" ]; then
	echo "twork-builder.php not found."
	exit 1
fi

if [ ! -d "$PLUGIN_DIR/build" ]; then
	echo "build/ missing. Run npm run build first."
	exit 1
fi

# Remove stale webpack image artifacts (no longer bundled).
find "$PLUGIN_DIR/build/images" -type f \( -name '*.png' -o -name '*.webp' \) -delete 2>/dev/null || true

rm -f "$ZIP_FILE"
cd "$PARENT_DIR"

# Production-only: plugin PHP + compiled blocks + PHP includes + frontend assets.
zip -9 -r "$ZIP_FILE" \
	"$PLUGIN_NAME/twork-builder.php" \
	"$PLUGIN_NAME/build" \
	"$PLUGIN_NAME/includes" \
	"$PLUGIN_NAME/assets" \
	-x "*.html" \
	-x "*.md" \
	-x "*.zip" \
	-x "*.scss" \
	-x "*.map" \
	-x "*.png" \
	-x "*style-index-rtl.css" \
	-x "*/.backup-manual-blocks/*" \
	-x "*/src/*" \
	-x "*/node_modules/*" \
	-x "*/.venv-pdf/*" \
	-x "*/assets/vendor/fontawesome/webfonts/fa-regular-400.woff2" \
	-x "*/assets/vendor/fontawesome/webfonts/fa-v4compatibility.woff2" \
	> /dev/null

SIZE=$(du -h "$ZIP_FILE" | cut -f1)
BYTES=$(stat -f%z "$ZIP_FILE" 2>/dev/null || stat -c%s "$ZIP_FILE")
COUNT=$(unzip -l "$ZIP_FILE" | tail -1 | awk '{print $2}')

echo "ZIP: $ZIP_FILE"
echo "Size: $SIZE ($BYTES bytes)"
echo "Files: $COUNT"

if [ "$BYTES" -gt 2000000 ]; then
	echo "WARNING: Still over 2MB WordPress default upload limit (2000000 bytes)."
else
	echo "OK: Under 2MB upload limit ($BYTES / 2000000 bytes)."
fi
