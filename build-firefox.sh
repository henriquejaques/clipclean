#!/bin/bash
set -euo pipefail

out="build/firefox"
rm -rf "$out"
mkdir -p "$out"

cp manifest.firefox.json "$out/manifest.json"
cp popup.html popup.js content.js background.js LICENSE PRIVACY.md README.md CHANGELOG.md "$out/"
cp -r icons "$out/"

(cd "$out" && zip -r - .) > clipclean-firefox.zip
echo "build/firefox/ ready - clipclean-firefox.zip created"
