#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
DIST_DIR="$ROOT_DIR/dist"
ZIP_PATH="$DIST_DIR/tiny-yt-1.0.0.zip"

mkdir -p "$DIST_DIR"
rm -f "$ZIP_PATH"

cd "$ROOT_DIR"

zip -r "$ZIP_PATH" \
  manifest.json \
  background.js \
  icons \
  README.md \
  PRIVACY.md \
  STORE_LISTING.md

echo "Built $ZIP_PATH"
