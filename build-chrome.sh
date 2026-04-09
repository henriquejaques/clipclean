#!/bin/bash
set -euo pipefail

out="build/chrome"
rm -rf "$out"
mkdir -p "$out"

cp manifest.chrome.json "$out/manifest.json"
cp popup.html popup.js content.js background.js LICENSE PRIVACY.md README.md CHANGELOG.md "$out/"
cp -r icons "$out/"

(cd "$out" && zip -r - .) > clipclean-chrome.zip
echo "build/chrome/ ready - clipclean-chrome.zip created"
