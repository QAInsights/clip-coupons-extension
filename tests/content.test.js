/**
 * @jest-environment jsdom
 */

// Import content.js functions directly
const contentFunctions = require('../content.js');
const { isUserLoggedIn, checkUrlAndUrlPath } = contentFunctions;

// Mock the showToast function to prevent DOM manipulation in tests
contentFunctions.showToast = jest.fn();

test('isUserLoggedIn should return false when "Sign In To Clip" button exists', () => {
  // Mock document.querySelectorAll to return a button with "Sign In To Clip" text
  document.querySelectorAll = jest.fn().mockReturnValue([
    { innerText: 'Sign In To Clip' }
  ]);
  
  // Call the function
  const result = isUserLoggedIn();
  
  // Verify the result
  expect(result).toBe(false);
});

test('isUserLoggedIn should return true when no "Sign In To Clip" button exists', () => {
  // Mock document.querySelectorAll to return buttons without "Sign In To Clip" text
  document.querySelectorAll = jest.fn().mockReturnValue([
    { innerText: 'Clip' },
    { innerText: 'Unclip' }
  ]);
  
  // Call the function
  const result = isUserLoggedIn();
  
  // Verify the result
  expect(result).toBe(true);
});

test('checkUrlAndUrlPath should return true for kroger.com with savings/coupons path', () => {
  // Set up a URL object for kroger.com/savings/coupons
  const url = {
    origin: 'https://www.kroger.com',
    pathname: '/savings/coupons'
  };
  
  // Call the function
  const result = checkUrlAndUrlPath(url);
  
  // Verify the result
  expect(result).toBe(true);
});
