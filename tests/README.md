# Testing Documentation for Clip It! Extension

This directory contains the test files for the Clip It! Chrome extension. The tests are written using Jest and are designed to verify the functionality of the extension's components.

## Test Structure

The test suite is organized into the following files:

- **simple.test.js**: A basic test to verify that Jest is working correctly.
- **content.test.js**: Tests for the content script functions like `isUserLoggedIn` and `checkUrlAndUrlPath`.
- **background.test.js**: Tests for the background script, focusing on Chrome API interactions.
- **popup.test.js**: Tests for the popup UI functionality.
- **integration.test.js**: Simple integration tests to verify interactions between components.
- **setup.js**: Contains the Jest setup code, including mocks for the Chrome API.

## Running Tests

To run all tests:

```bash
npm test
```

To run a specific test file:

```bash
npm test -- tests/simple.test.js
```

## Testing Approach

The tests use a simplified approach with the following characteristics:

1. **Direct Imports**: Functions are imported directly from their source files.
2. **Mocked Chrome API**: The Chrome API is mocked using jest-chrome.
3. **DOM Simulation**: Tests run in a jsdom environment to simulate browser DOM.
4. **Isolated Tests**: Each test focuses on a specific piece of functionality.

## Mocking Strategy

- **Chrome API**: Mocked using jest-chrome to simulate browser extension behavior.
- **DOM Elements**: Mocked using Jest's built-in functions like `mockReturnValue`.
- **Event Handling**: Events are simulated by directly calling event handlers.

## Test Environment

The tests run in a jsdom environment, which simulates a browser environment in Node.js. This allows testing DOM manipulation without a real browser.

## Troubleshooting

If tests are failing, check the following:

1. Make sure all dependencies are installed: `npm install`
2. Verify that the Chrome API mocks in setup.js match what's being used in the code
3. Check for any DOM manipulation that might be causing issues
4. Ensure that async operations are properly handled

## Adding New Tests

When adding new tests:

1. Follow the existing pattern of simple, focused tests
2. Mock any external dependencies
3. Use the `@jest-environment jsdom` comment at the top of test files
4. Keep tests independent of each other
