# Building and Packaging "Clip It!" Extension

## Issue Resolution: Manifest V3 Violation

This document provides instructions for properly building and packaging the "Clip It!" Chrome extension to comply with Manifest V3 requirements.

## Violation Details

**Violation Reference ID**: Blue Argon

**Issue**: Including remotely hosted code in a Manifest V3 item.

**Violating Content**: 
```
node_modules/sprintf-js/demo/angular.html: <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-rc.3/angular.min.js"></script>
```

## Solution

The violation occurs because the `node_modules` directory is being included when packaging the extension for submission to the Chrome Web Store. This directory contains the `sprintf-js` package with a demo file that references an external Angular script, which violates Manifest V3's prohibition on remotely hosted code.

## Build Instructions

1. **Use the build script**:
   ```bash
   npm run build
   ```

   This will:
   - Create a `dist` directory with only the necessary files
   - Package these files into a ZIP file (`clip-it-extension.zip`)
   - Exclude the `node_modules` directory and other unnecessary files

2. **Submit the generated ZIP file** to the Chrome Web Store.

## Manual Packaging (Alternative)

If you prefer to manually package the extension:

1. Create a new directory for the package
2. Copy only the required files:
   ```bash
   mkdir -p package
   cp -r manifest.json background.js content.js popup.html popup.js icon.png icon.svg style img package/
   ```
3. Create a ZIP file from this directory
   ```bash
   cd package
   zip -r ../clip-it-extension.zip *
   ```

## Important Notes

- Never include the `node_modules` directory in your extension package
- Always verify your package contents before submission
- Test the packaged extension locally before uploading to the Chrome Web Store
