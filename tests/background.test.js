/**
 * @jest-environment jsdom
 */

// Load the background script to set up event listeners
require('../background.js');

test('should initialize extension and set default coupon limit', () => {
  // Trigger the onInstalled listener
  const callback = chrome.runtime.onInstalled.addListener.mock.calls[0][0];
  if (callback) callback();

  // Check if the storage was set with the default value
  expect(chrome.storage.local.set).toHaveBeenCalledWith({ maxCouponsToClip: 25 });
});

test('should handle setBadgeText action and update badge', () => {
  // Trigger the onMessage listener
  const callback = chrome.runtime.onMessage.addListener.mock.calls[0][0];
  if (callback) {
    callback({ action: 'setBadgeText', text: '10' });
  }

  // Check if the badge text was set correctly
  expect(chrome.action.setBadgeText).toHaveBeenCalledWith({ text: '10' });
  expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: '#9688F1' });
});
