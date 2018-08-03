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
function getReturnObject(uniqueId, timeoutMS) {
  return new Promise((resolve, reject) => {
    let timeout = setTimeout(function(){ 
      this.console.log("timeout");
      window.removeEventListener("message", y);
      reject(Error("Timeout"));
    }, timeoutMS);
    let y = function (event) {
      if (event.source === window &&
        event.data.direction &&
        event.data.direction === "chrome-platform-bridge-from-content-script" && 
        JSON.parse(event.data.message).id === uniqueId) {
          clearTimeout(timeout);
          this.console.log(event.data.message);
          window.removeEventListener("message", y);
          const obj = JSON.parse(event.data.message);
          resolve(JSON.stringify(obj));
        }
      }
    window.addEventListener("message", y);
  });
}
class ChromePlatformBridge {
  constructor() {
  }
  uniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
  };
  requestedHostVersion() {
    return "1.0.0";
  }
  async systemCheck() {
    try {
      const bridge = new ChromePlatformBridge();
      const result = await bridge.invoke({method:"systemCheck"});
    }
    catch(err) {
      return false;
    }
    return true;
  }
  async invoke(obj, timeoutMS = 5000) {
    const id = this.uniqueId();
    obj.id=id;
    obj.requestedHostVersion=requestedHostVersion();
    const objStringified = JSON.stringify(obj)
    console.log(objStringified);
    window.postMessage({
        direction: "chrome-platform-bridge-from-page-script",
        message: objStringified
      },
      "*");
    const result = await getReturnObject(id, timeoutMS);
    const err = JSON.parse(result).Error;
    if (err) {
      throw Error(err);
    }
    return JSON.parse(result).Result;
  }
}