document.addEventListener("DOMContentLoaded", function () {
  // Get the maxCouponsToClip value from the background script
  chrome.storage.local.get("maxCouponsToClip", function (result) {
    if (result.maxCouponsToClip) {
      document.getElementById("currentValue").innerText =
        result.maxCouponsToClip;
      document.getElementById("rangeInput").value = result.maxCouponsToClip;
    }
  });

  const clippedButton = document.getElementById("clipped");
  if (clippedButton) {
    clippedButton.addEventListener("click", function () {
      chrome.storage.local.get("maxCouponsToClip", function (result) {
        if (result.maxCouponsToClip) {
          document.getElementById("currentValue").innerText =
            result.maxCouponsToClip;
          console.log("maxCouponsToClip:", result.maxCouponsToClip);
          let maxCouponsToClip = result.maxCouponsToClip;
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs
                .sendMessage(tabs[0].id, {
                  action: "clipIt",
                  maxCouponsToClip: maxCouponsToClip,
                })
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
            }
          );
        }

        // Close the popup
        window.close();
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

      // Close the popup
      window.close();
    });
  }

  // Clip only free coupons button
  const clippedFreeButton = document.getElementById("clippedFree");
  if (clippedFreeButton) {
    clippedFreeButton.addEventListener("click", function () {
      console.log("clippedFreeButton clicked");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs
          .sendMessage(tabs[0].id, {
            action: "clipFreeIt",
          })
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
      // Close the popup
      window.close();
    });
  }

  // Update the maxCouponsToClip value when the range input changes
  const rangeInput = document.getElementById("rangeInput");
  if (rangeInput) {
    rangeInput.addEventListener("input", function () {
      document.getElementById("currentValue").innerText = this.value;
      chrome.storage.local.set({ maxCouponsToClip: parseInt(this.value) });
    });
  }
});

// Function to initialize the popup with stored values
function initializePopup() {
  chrome.storage.local.get("maxCouponsToClip", function (result) {
    if (result.maxCouponsToClip) {
      const currentValueElement = document.getElementById("currentValue");
      const rangeInputElement = document.getElementById("rangeInput");
      
      if (currentValueElement) {
        currentValueElement.innerText = result.maxCouponsToClip;
      }
      
      if (rangeInputElement) {
        rangeInputElement.value = result.maxCouponsToClip;
      }
    }
  });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializePopup
  };
}
