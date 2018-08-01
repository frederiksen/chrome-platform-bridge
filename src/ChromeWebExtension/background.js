/*
MIT License

Copyright (c) 2018 Morten Frederiksen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function () {
  // Native messages port
  let port=null;
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
    port=null;
  }
  // Messages from the content-script
  chrome.runtime.onMessage.addListener(function (request, sender) {
    // Try to connect to the native app, if not already connected
    if (port===null) {
      port=chrome.runtime.connectNative("com.github.frederiksen.chromeplatformbridge");
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