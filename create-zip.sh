#!/bin/bash

###############################################################################
# WordPress Plugin ZIP Creator (twork-builder)
#
# Usage: ./create-zip.sh
# Output: ./twork-builder-<version>.zip
###############################################################################

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PLUGIN_DIR="$SCRIPT_DIR"
PARENT_DIR="$(dirname "$PLUGIN_DIR")"
PLUGIN_NAME="$(basename "$PLUGIN_DIR")"
PLUGIN_SLUG="twork-builder"

VERSION="$(grep -E "^\s*\*\s*Version:" "$PLUGIN_DIR/twork-builder.php" | head -1 | sed -E 's/.*Version:[[:space:]]*//' | tr -d '[:space:]')"
ZIP_FILE="$PLUGIN_DIR/${PLUGIN_SLUG}-${VERSION}.zip"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() { echo -e "${BLUE}ℹ${NC} $1"; }
print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_error() { echo -e "${RED}✗${NC} $1"; }

if [ ! -f "$PLUGIN_DIR/twork-builder.php" ]; then
	print_error "twork-builder.php not found. Are you in the plugin directory?"
	exit 1
fi

if [ ! -d "$PLUGIN_DIR/build" ]; then
	print_warning "Build directory not found. Run 'npm run build' first."
	exit 1
fi

print_info "Creating ZIP for ${PLUGIN_SLUG} v${VERSION}..."

# Remove stale webpack image artifacts (no longer bundled).
find "$PLUGIN_DIR/build/images" -type f \( -name '*.png' -o -name '*.webp' \) -delete 2>/dev/null || true

rm -f "$ZIP_FILE"
cd "$PARENT_DIR"

# Production-only: plugin PHP + compiled blocks + PHP includes + frontend assets.
# -X strips macOS extra attrs (UID/GID) that inflate zip ~100KB+.
# -D omits directory entries (~40–50KB) — needed to stay under WP 2MB upload.
# Trimmed for WP 2MB upload: kit preview PNGs, unused shape PNGs, FA brands, editor RTL CSS.
# Kit apply still ships templates/kits/*.json + block-defaults; admin uses preview fallback.
# assets/images/*.png are unused decorative leftovers (keep icons/*.svg).
zip -X -D -9 -r "$ZIP_FILE" \
	"$PLUGIN_NAME/twork-builder.php" \
	"$PLUGIN_NAME/readme.txt" \
	"$PLUGIN_NAME/build" \
	"$PLUGIN_NAME/includes" \
	"$PLUGIN_NAME/assets" \
	"$PLUGIN_NAME/languages" \
	"$PLUGIN_NAME/templates" \
	-x '*.md' \
	-x '*.zip' \
	-x '*.scss' \
	-x '*.map' \
	-x '*style-index-rtl.css' \
	-x '*index-rtl.css' \
	-x '*/.backup-manual-blocks/*' \
	-x '*/src/*' \
	-x '*/node_modules/*' \
	-x '*/.venv*' \
	-x '*/.ai/*' \
	-x '*/.cursor/*' \
	-x '*/assets/wporg/*' \
	-x '*/assets/ipd-consent/*' \
	-x '*/assets/templates/*' \
	-x '*/assets/images/*.png' \
	-x '*/shweghee/*' \
	-x '*/scripts/*' \
	-x '*/dist/*' \
	-x '*/assets/vendor/fontawesome/webfonts/fa-regular-400.woff2' \
	-x '*/assets/vendor/fontawesome/webfonts/fa-v4compatibility.woff2' \
	-x '*/assets/vendor/fontawesome/webfonts/fa-brands-400.woff2' \
	> /dev/null

SIZE=$(du -h "$ZIP_FILE" | cut -f1)
BYTES=$(stat -f%z "$ZIP_FILE" 2>/dev/null || stat -c%s "$ZIP_FILE")
COUNT=$(unzip -l "$ZIP_FILE" | tail -1 | awk '{print $2}')

print_success "ZIP: $ZIP_FILE"
print_info "Size: $SIZE ($BYTES bytes)"
print_info "Files: $COUNT"

if [ "$BYTES" -gt 2000000 ]; then
	print_warning "Still over 2MB WordPress default upload limit (2000000 bytes)."
	exit 1
else
	print_success "OK: Under 2MB upload limit ($BYTES / 2000000 bytes)."
fi
