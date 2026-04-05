#!/bin/bash
set -euo pipefail
zip -r clipclean.zip manifest.json popup.* content.js background.js icons/ LICENSE PRIVACY.md README.md CHANGELOG.md -x "*.git*" ".plan/*" ".opencode/*" "node_modules/*"
echo "clipclean.zip ready for AMO"
