#!/usr/bin/env bash
set -euo pipefail
# Obtain fresh source asset URLs from Figma get_design_context for node 5:2.
# Arguments are the 39027.png landscape and a8f3e.png card source URLs.
if [ "$#" -ne 2 ]; then
  echo 'Usage: bash scripts/download-assets.sh LANDSCAPE_URL IDENTITY_URL' >&2
  exit 1
fi
mkdir -p public/assets
curl --fail --location --retry 2 "$1" -o public/assets/landscape.png
curl --fail --location --retry 2 "$2" -o public/assets/identity.png
