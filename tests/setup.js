// Import jest-chrome
const chrome = require('jest-chrome');

// Add chrome to global
global.chrome = chrome;

// Mock Chrome API
chrome.storage = {
  local: {
    get: jest.fn((key, callback) => {
      callback({ maxCouponsToClip: 25 });
    }),
    set: jest.fn((items, callback) => {
      if (callback) callback();
    })
  }
};

chrome.runtime = {
  sendMessage: jest.fn(),
  onMessage: {
    addListener: jest.fn()
  },
  onInstalled: {
    addListener: jest.fn()
  }
};

chrome.tabs = {
  query: jest.fn((queryInfo, callback) => {
    callback([{ id: 1 }]);
  }),
  sendMessage: jest.fn()
};

chrome.action = {
  setBadgeText: jest.fn(),
  setBadgeBackgroundColor: jest.fn()
};

// Set up document.body
document.body.innerHTML = '';

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'https://www.kroger.com/savings/coupons',
    origin: 'https://www.kroger.com',
    pathname: '/savings/coupons'
  },
  writable: true
});
