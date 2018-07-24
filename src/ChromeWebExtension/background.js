(function () {
  // Native messages port
  var port = null;
  // Message from native app
  function onNativeMessageReceived(message) {
    sendMessageToContentScript(message.message);
  }
  // Send message to native app
  function sendMessageToNativeApp(message) {
    port.postMessage({ message: message });
  }
  // Native app was disconnected
  function onDisconnected() {
    port = null;
  }
  // Messages from the content-script
  chrome.runtime.onMessage.addListener(function (request, sender) {
    // Try to connect to the native app, if not already connected
    if (port == null) {
      var hostName = "com.github.frederiksen.chromeplatformbridge";
      port = chrome.runtime.connectNative(hostName);
      port.onMessage.addListener(onNativeMessageReceived);
      port.onDisconnect.addListener(onDisconnected);
    }
    sendMessageToNativeApp(request.message);
  });
  // Send a message to content-script
  function sendMessageToContentScript(message) {
    chrome.tabs.query({
    }, function (tabs) {
      tabs.forEach(function (tab) {
        chrome.tabs.sendMessage(tab.id, { message: message });
      });
    });
  }
})();