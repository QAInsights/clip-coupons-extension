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
