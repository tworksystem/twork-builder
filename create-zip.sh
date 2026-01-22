#!/bin/bash

###############################################################################
# Professional WordPress Plugin ZIP Creator
# 
# Creates a production-ready ZIP file for WordPress plugin installation.
# This script should be run from the plugin directory.
#
# Usage: ./create-zip.sh
# Output: ../twork-builder.zip
###############################################################################

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PLUGIN_DIR="$SCRIPT_DIR"
PARENT_DIR="$(dirname "$PLUGIN_DIR")"
ZIP_FILE="$PARENT_DIR/twork-builder.zip"
PLUGIN_NAME="twork-builder"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Validate we're in the right directory
if [ ! -f "$PLUGIN_DIR/twork-builder.php" ]; then
    print_error "twork-builder.php not found. Are you in the plugin directory?"
    exit 1
fi

if [ ! -d "$PLUGIN_DIR/build" ]; then
    print_warning "Build directory not found. Run 'npm run build' first."
    exit 1
fi

print_info "Creating ZIP file for WordPress plugin..."

# Remove old ZIP if exists
if [ -f "$ZIP_FILE" ]; then
    rm "$ZIP_FILE"
    print_info "Removed existing ZIP file"
fi

# Change to parent directory for zip creation
cd "$PARENT_DIR"

# Verify plugin directory exists
if [ ! -d "$PLUGIN_NAME" ]; then
    print_error "Plugin directory '$PLUGIN_NAME' not found in parent directory"
    exit 1
fi

# Create ZIP with comprehensive exclusions
# Using explicit paths to avoid pattern matching issues
if zip -r "$ZIP_FILE" "$PLUGIN_NAME/" \
  -x "$PLUGIN_NAME/.git/*" \
  -x "$PLUGIN_NAME/.gitignore" \
  -x "$PLUGIN_NAME/.gitattributes" \
  -x "$PLUGIN_NAME/.git/*" \
  -x "$PLUGIN_NAME/node_modules/*" \
  -x "$PLUGIN_NAME/node_modules/**/*" \
  -x "$PLUGIN_NAME/.DS_Store" \
  -x "$PLUGIN_NAME/**/*.DS_Store" \
  -x "$PLUGIN_NAME/**/.DS_Store" \
  -x "$PLUGIN_NAME/**/*.log" \
  -x "$PLUGIN_NAME/**/*.scss" \
  -x "$PLUGIN_NAME/**/*.map" \
  -x "$PLUGIN_NAME/.env" \
  -x "$PLUGIN_NAME/.env.*" \
  -x "$PLUGIN_NAME/package.json" \
  -x "$PLUGIN_NAME/package-lock.json" \
  -x "$PLUGIN_NAME/yarn.lock" \
  -x "$PLUGIN_NAME/composer.json" \
  -x "$PLUGIN_NAME/composer.lock" \
  -x "$PLUGIN_NAME/README.md" \
  -x "$PLUGIN_NAME/CHANGELOG.md" \
  -x "$PLUGIN_NAME/LICENSE*" \
  -x "$PLUGIN_NAME/tests/*" \
  -x "$PLUGIN_NAME/tests/**/*" \
  -x "$PLUGIN_NAME/phpunit.xml" \
  -x "$PLUGIN_NAME/phpcs.xml" \
  -x "$PLUGIN_NAME/webpack.config.js" \
  -x "$PLUGIN_NAME/babel.config.js" \
  -x "$PLUGIN_NAME/tsconfig.json" \
  -x "$PLUGIN_NAME/tsconfig*.json" \
  -x "$PLUGIN_NAME/.eslintrc*" \
  -x "$PLUGIN_NAME/.prettierrc*" \
  -x "$PLUGIN_NAME/.editorconfig" \
  -x "$PLUGIN_NAME/npm-debug.log*" \
  -x "$PLUGIN_NAME/yarn-debug.log*" \
  -x "$PLUGIN_NAME/yarn-error.log*" \
  -x "$PLUGIN_NAME/src/*" \
  -x "$PLUGIN_NAME/src/**/*" \
  -x "$PLUGIN_NAME/.wp-env.json" \
  -x "$PLUGIN_NAME/zip-plugin.sh" \
  -x "$PLUGIN_NAME/create-zip.sh" \
  > /dev/null 2>&1; then
    
    if [ -f "$ZIP_FILE" ]; then
        ZIP_SIZE=$(du -h "$ZIP_FILE" | cut -f1)
        FILE_COUNT=$(unzip -l "$ZIP_FILE" 2>/dev/null | tail -1 | awk '{print $2}' || echo "N/A")
        
        print_success "ZIP file created successfully"
        echo -e "  ${BLUE}Location:${NC} $ZIP_FILE"
        echo -e "  ${BLUE}Size:${NC} $ZIP_SIZE"
        if [ "$FILE_COUNT" != "N/A" ]; then
            echo -e "  ${BLUE}Files:${NC} $FILE_COUNT"
        fi
        echo ""
        print_success "Ready for WordPress upload!"
        echo "  Upload via: WordPress Admin → Plugins → Add New → Upload Plugin"
        exit 0
    else
        print_error "ZIP file was not created"
        exit 1
    fi
else
    print_error "Failed to create ZIP file"
    exit 1
fi
