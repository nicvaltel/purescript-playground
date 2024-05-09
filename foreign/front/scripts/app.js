(() => {
  // output/Effect.Console/foreign.js
  var log = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/TestURI/foreign.js
  var _wsocket = function(url) {
    return function() {
      return new WebSocket(url);
    };
  };
  var _addEventListener1 = function(socket) {
    return function() {
      socket.addEventListener("open", (event) => {
        console.log("WebSocket connection opened:", event);
      });
    };
  };
  var _addEventListener2 = function(socket) {
    return function() {
      socket.addEventListener("message", (event) => {
        const message = event.data;
        console.log("Received message:", message);
      });
    };
  };
  var _addEventListener3 = function(socket) {
    return function() {
      socket.addEventListener("close", (event) => {
        console.log("WebSocket connection closed:", event);
      });
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/TestURI/index.js
  var main = function __do() {
    var socket = _wsocket("ws://95.140.155.123:1234/ws")();
    _addEventListener1(socket)();
    _addEventListener2(socket)();
    _addEventListener3(socket)();
    return unit;
  };

  // output/Main/index.js
  var main2 = function __do2() {
    log("\u{1F35D}")();
    return main();
  };

  // <stdin>
  main2();
})();
