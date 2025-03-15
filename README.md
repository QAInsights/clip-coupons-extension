# Clip It! Chrome Extension

Clip It! is a Chrome extension that helps users automatically clip coupons on Kroger and its affiliated websites (King Soopers, City Market, and Smith's Food & Drug).

## Features

- Automatically clips coupons on Kroger and affiliated websites
- Configurable maximum number of coupons to clip
- Works on multiple Kroger-owned websites:
  - kroger.com
  - kingsoopers.com
  - citymarket.com
  - smithsfoodanddrug.com
- Badge indicator showing the number of coupons clipped

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/QAInsights/clip-coupons-extension.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top-right corner

4. Click "Load unpacked" and select the cloned repository folder

## Usage

1. Navigate to the coupons page on any supported website:
   - https://www.kroger.com/savings/coupons
   - https://www.kingsoopers.com/savings/coupons
   - https://www.citymarket.com/savings/coupons
   - https://www.smithsfoodanddrug.com/savings/coupons

2. Click the Clip It! extension icon in your browser toolbar

3. Adjust the maximum number of coupons to clip (default is 25)

4. Click "Clip Coupons" to start the automatic clipping process

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   ```

### Testing

The extension uses Jest for testing. Tests are located in the `tests` directory.

- **Simple Tests**: Basic tests to verify Jest functionality
- **Unit Tests**: Tests for individual components (content script, background script, popup)
- **Integration Tests**: Tests for interactions between components

For detailed testing documentation, see [tests/README.md](tests/README.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

NaveenKumar Namachivayam
