#!/bin/bash

###############################################################################
# Professional WordPress Plugin ZIP Creator
# 
# This script builds the plugin and creates a production-ready ZIP file
# suitable for WordPress plugin installation.
#
# Usage: ./zip-plugin.sh
# Output: ../twork-builder.zip
###############################################################################

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${GREEN}=== Twork Builder Plugin ZIP Creator ===${NC}\n"

# Step 1: Build the plugin
echo -e "${YELLOW}Step 1: Building plugin...${NC}"
if npm run build; then
    echo -e "${GREEN}✓ Build completed successfully${NC}\n"
else
    echo -e "${RED}✗ Build failed. Please fix errors and try again.${NC}"
    exit 1
fi

# Step 2: Create ZIP file using the dedicated script
echo -e "${YELLOW}Step 2: Creating ZIP file...${NC}"
if ./create-zip.sh; then
    echo ""
    echo -e "${GREEN}=== Complete! ===${NC}"
else
    echo -e "${RED}✗ ZIP creation failed${NC}"
    exit 1
fi
