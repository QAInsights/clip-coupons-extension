function isUserLoggedIn() {
  // Get the button element
  const buttons = document.querySelectorAll("button");
  let isUserLoggedIn = true;

  buttons.forEach((button) => {
    if (button.innerText === "Sign In To Clip") {
      console.log("Please sign in to clip coupons.");
      isUserLoggedIn = false;
    }
  });

  return isUserLoggedIn;
}

function isMaxClippedCouponsReached() {
  const clippedCoupons = document.getElementsByClassName(
    "DashboardTile--title"
  );

  return Array.from(clippedCoupons).some((clippedCoupon) => {
    if (clippedCoupon.innerText === "Coupons Clipped") {
      const nextElement = clippedCoupon.nextElementSibling;
      if (nextElement && nextElement.innerText === "200") {
        console.log(
          "Maximum number of coupons already clipped. Please unclip some coupons and try again."
        );
        showToast(
          "Maximum number of coupons already clipped. Please unclip some coupons and try again.",
          1000
        );
        return true;
      }
    }
    return false;
  });
}

function checkUrlAndUrlPath(url) {
  if (
    url.origin.includes("kroger.com") &&
    (url.pathname.includes("savings") || url.pathname.includes("coupons"))
  ) {
    return true;
  }

  showToast(
    "Please navigate to the Savings or Coupons page and try again.",
    1000
  );

  return false;
}

let counter = 0;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "clipIt") {
    console.log("Received clipIt action");
    const url = new URL(window.location.href);

    if (checkUrlAndUrlPath(url)) {
      // Check if the user is logged in
      if (!isUserLoggedIn()) {
        showToast("Please sign in to clip coupons.", 1000);
        return;
      }
      if (!isMaxClippedCouponsReached()) {
        // Clip all the coupons
        const coupons = document.querySelectorAll("button");

        // Set the maxCouponsToClip variable to the value passed from the background script
        let maxCouponsToClip = request.maxCouponsToClip;

        console.log("maxCouponsToClip:", maxCouponsToClip);

        // Loop through the maximum number of coupons to clip
        coupons.forEach((coupon) => {
          if (counter >= maxCouponsToClip) {
            return; // Exit the loop if the counter reaches the maximum limit
          }

          if (coupon.innerText === "Clip") {
            // Increment the counter
            counter++;
            // Add a delay of 500 milliseconds
            setTimeout(() => {
              coupon.click();
              // Check for the coupons clipped or not
              const clippedCoupons = document.querySelectorAll("button");
              clippedCoupons.forEach((clippedCoupon) => {
                if (clippedCoupon.innerText === "Unclip") {
                  console.log("Coupon clipped");
                }
              });
            }, 1000);
          }
        });
      }

      counter = 0;

      return;
    }
  }

  // Unclip coupons button
  if (request.action === "unclipIt") {
    // Check if the URL contains kroger.com
    const url = new URL(window.location.href);
    if (checkUrlAndUrlPath(url)) {
      // Execute the function
      if (isUserLoggedIn()) {
        // Unclip all the coupons
        const coupons = document.querySelectorAll("button");

        coupons.forEach((coupon) => {
          if (coupon.innerText === "Unclip") {
            // Add a delay of 500 milliseconds
            setTimeout(() => {
              console.log("Delayed unclipping");
              coupon.click();
            }, 1000);
          }
        });

        // Check for the coupons clipped or not
        const clippedCoupons = document.querySelectorAll("button");
        clippedCoupons.forEach((clippedCoupon) => {
          if (clippedCoupon.innerText === "Clip") {
            console.log("Coupon unclipped");
          }
        });
      }
    }
  }

  // Clip only free coupons button
  if (request.action === "clipFreeIt") {
    // Check if the URL contains kroger.com
    const url = new URL(window.location.href);
    if (checkUrlAndUrlPath(url)) {
      // Execute the function
      if (isUserLoggedIn()) {
        // Clip all the free coupons
        const buttons = Array.from(document.querySelectorAll("button")).filter(
          (button) => {
            const ariaLabel = button.getAttribute("aria-label");
            return ariaLabel && /\bfree\b/i.test(ariaLabel);
          }
        );

        buttons.forEach((button) => {
          if (button.innerText === "Clip") {
            // Add a delay of 500 milliseconds
            setTimeout(() => {
              button.click();
            }, 1000);
          }
        });
      }
    }
  }
  return;
});

function showToast(message, timeOut) {
  // Create toast element
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  // Append toast to body
  document.body.appendChild(toast);

  // Show the toast
  setTimeout(() => {
    toast.className = "toast show";
  }, timeOut);

  // Hide the toast after 3.5 seconds
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
    // Remove the toast from the DOM
    setTimeout(() => {
      document.body.removeChild(toast);
    }, timeOut);
  }, 3500);
}
