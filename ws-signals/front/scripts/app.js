(() => {
  // output/Effect.Console/foreign.js
  var log = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/Data.Show/foreign.js
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      // eslint-disable-line no-control-regex
      function(c, i) {
        switch (c) {
          case '"':
          case "\\":
            return "\\" + c;
          case "\x07":
            return "\\a";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "	":
            return "\\t";
          case "\v":
            return "\\v";
        }
        var k = i + 1;
        var empty2 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty2;
      }
    ) + '"';
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/WSSignalChan/foreign.js
  var _wsocket = function(url) {
    return function() {
      return new WebSocket(url);
    };
  };
  var _addEventListenerConnectionIsOpen = function(socket) {
    return function() {
      socket.addEventListener("open", (event) => {
        console.log("WebSocket connection opened:", event);
      });
    };
  };
  var _addEventListenerMessageRecieved = function(socket) {
    return function(signalFunc) {
      return function() {
        socket.addEventListener("message", (event) => {
          signalFunc(event.data)();
        });
      };
    };
  };
  var _addEventListenerConnectionIsClose = function(socket) {
    return function() {
      socket.addEventListener("close", (event) => {
        console.log("WebSocket connection closed:", event);
      });
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };

  // output/Signal/foreign.js
  function make(initial) {
    var subs = [];
    var val = initial;
    var sig = {
      subscribe: function(sub2) {
        subs.push(sub2);
        sub2(val);
      },
      get: function() {
        return val;
      },
      set: function(newval) {
        val = newval;
        subs.forEach(function(sub2) {
          sub2(newval);
        });
      }
    };
    return sig;
  }
  var constant = make;
  function mapSig(fun) {
    return function(sig) {
      var out = make(fun(sig.get()));
      sig.subscribe(function(val) {
        out.set(fun(val));
      });
      return out;
    };
  }
  function runSignal(sig) {
    return function() {
      sig.subscribe(function(val) {
        val();
      });
      return {};
    };
  }

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Signal/index.js
  var functorSignal = {
    map: mapSig
  };

  // output/Signal.Channel/foreign.js
  function channelP(constant2) {
    return function(v) {
      return function() {
        return constant2(v);
      };
    };
  }
  function sendP(chan) {
    return function(v) {
      return function() {
        chan.set(v);
      };
    };
  }
  function subscribe(chan) {
    return chan;
  }

  // output/Signal.Channel/index.js
  var send = sendP;
  var channel = /* @__PURE__ */ channelP(constant);

  // output/WSSignalChan/index.js
  var map2 = /* @__PURE__ */ map(functorSignal);
  var addListenerWSMessageToSignal = function(socket) {
    return function __do2() {
      var chan = channel("")();
      _addEventListenerMessageRecieved(socket)(function(msg) {
        return send(chan)(msg);
      })();
      return subscribe(chan);
    };
  };
  var initWSSignal = function(url) {
    return function __do2() {
      var socket = _wsocket(url)();
      _addEventListenerConnectionIsOpen(socket)();
      _addEventListenerConnectionIsClose(socket)();
      return addListenerWSMessageToSignal(socket)();
    };
  };
  var exampleOfUsageWSSignalChan = /* @__PURE__ */ function() {
    var renderTickAction = function(dictShow) {
      var show2 = show(dictShow);
      return function(a) {
        return log("RECIEVED :" + show2(a));
      };
    };
    var renderTickAction1 = renderTickAction(showString);
    return function __do2() {
      var messageSignal = initWSSignal("ws://95.140.155.123:1234/ws")();
      runSignal(map2(renderTickAction1)(messageSignal))();
      return unit;
    };
  }();

  // output/Main/index.js
  var main = function __do() {
    log("\u{1F35D}")();
    return exampleOfUsageWSSignalChan();
  };

  // <stdin>
  main();
})();
