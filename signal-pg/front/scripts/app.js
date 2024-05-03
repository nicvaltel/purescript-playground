(() => {
  // output/Effect.Console/foreign.js
  var log = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/SigPG/index.js
  var run = /* @__PURE__ */ log("Salam!");

  // output/Main/index.js
  var main = function __do() {
    run();
    return log("\u{1F35D}")();
  };

  // <stdin>
  main();
})();
