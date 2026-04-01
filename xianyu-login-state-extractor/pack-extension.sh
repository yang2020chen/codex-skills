#!/bin/sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname "$0")" && pwd)"
DIST_DIR="$ROOT_DIR/dist"
PACKAGE_NAME="xianyu-login-state-extractor"

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR/$PACKAGE_NAME"

cp "$ROOT_DIR"/manifest.json "$DIST_DIR/$PACKAGE_NAME"/
cp "$ROOT_DIR"/background.js "$DIST_DIR/$PACKAGE_NAME"/
cp "$ROOT_DIR"/popup.html "$DIST_DIR/$PACKAGE_NAME"/
cp "$ROOT_DIR"/popup.js "$DIST_DIR/$PACKAGE_NAME"/
cp "$ROOT_DIR"/privacy-policy.html "$DIST_DIR/$PACKAGE_NAME"/
cp "$ROOT_DIR"/README.md "$DIST_DIR/$PACKAGE_NAME"/
cp "$ROOT_DIR"/LICENSE "$DIST_DIR/$PACKAGE_NAME"/
cp "$ROOT_DIR"/CHANGELOG.md "$DIST_DIR/$PACKAGE_NAME"/

if [ -d "$ROOT_DIR/icons" ]; then
  cp -R "$ROOT_DIR/icons" "$DIST_DIR/$PACKAGE_NAME"/
fi

cd "$DIST_DIR"
zip -qr "${PACKAGE_NAME}.zip" "$PACKAGE_NAME"
echo "Packed: $DIST_DIR/${PACKAGE_NAME}.zip"
