let maxCouponsToClip = 20;

document.addEventListener("DOMContentLoaded", function () {
  const clippedButton = document.getElementById("clipped");
  if (clippedButton) {
    clippedButton.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs
          .sendMessage(tabs[0].id, { action: "clipIt" })
          .then((response) => {
            if (response && response.status) {
              console.log(response.status);
              console.log("Received response:", response);
            } else {
              console.log("No status received.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    });
  }

  // Unclip coupons button
  const unclipButton = document.getElementById("unclipped");
  if (unclipButton) {
    unclipButton.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs
          .sendMessage(tabs[0].id, { action: "unclipIt" })
          .then((response) => {
            if (response && response.status) {
              console.log(response.status);
              console.log("Received response:", response);
            } else {
              console.log("No status received.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    });
  }
});
