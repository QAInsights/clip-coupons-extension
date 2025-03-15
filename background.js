chrome.runtime.onInstalled.addListener(() => {
  console.log("extension installed");

  // Set the default maxCouponsToClip value to 25
  chrome.storage.local.set({ maxCouponsToClip: 25 });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setBadgeText") {
    chrome.action.setBadgeText({ text: request.text });
    chrome.action.setBadgeBackgroundColor({ color: "#9688F1" });
  }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // We don't have any explicit functions to export, but we can export an empty object
    // to ensure the module can be required in tests
  };
}
