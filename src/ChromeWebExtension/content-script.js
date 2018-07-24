(function () {
  // From page script
  window.addEventListener("message", function (event) {
    if (event.source == window &&
        event.data.direction &&
        event.data.direction == "chrome-platform-bridge-from-page-script") {
      chrome.runtime.sendMessage({ message: event.data.message });
    }
  });
  // From background script
  chrome.runtime.onMessage.addListener(
	  function (request, sender) {
	    if (request.message) {
	      window.postMessage({
	        direction: "chrome-platform-bridge-from-content-script",
	        message: request.message
	      },
          "*");
	    }
	  });
})();