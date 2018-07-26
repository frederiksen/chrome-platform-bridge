function uniqueId() {
  return 'id-' + Math.random().toString(36).substr(2, 16);
};

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

function getResult(uniqueId, timeoutMS) {
  return new Promise((resolve, reject) => {

    var timeout = setTimeout(function(){ 
      this.console.log("timeout");
      window.removeEventListener("message", y);
      reject(Error("Timeout"));
    }, timeoutMS);

    var y = function (event) {
      if (event.source == window &&
        event.data.direction &&
        event.data.direction == "chrome-platform-bridge-from-content-script" && 
        JSON.parse(event.data.message).id == uniqueId) {
          clearTimeout(timeout);
          this.console.log(event.data.message);
          window.removeEventListener("message", y);
          var obj = JSON.parse(event.data.message);
          resolve(JSON.stringify(obj));
        }
      }
    window.addEventListener("message", y);

  });

}

class ChromePlatformBridge {
  constructor() {
  }

  async init() {
    await resolveAfter2Seconds();
    return true;
  }

  async invoke(obj, timeoutMS = 5000) {
    var id = uniqueId();
    obj.id = id;

    var t = JSON.stringify(obj)
    console.log(t);
    window.postMessage({
        direction: "chrome-platform-bridge-from-page-script",
        message: t
      },
      "*");

    var result = await getResult(id, timeoutMS);
    if (JSON.parse(result).Error) {
      throw Error(JSON.parse(result).Error);
    }
    return JSON.parse(result).Result;
  }
}