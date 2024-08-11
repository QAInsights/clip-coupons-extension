chrome.runtime.onInstalled.addListener(() => {
  console.log("extension installed");

  // Set the default maxCouponsToClip value to 25
  chrome.storage.local.set({ maxCouponsToClip: 25 });
});
