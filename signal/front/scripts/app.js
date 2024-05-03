(() => {
  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };

  // output/Control.Apply/index.js
  var apply = function(dict) {
    return dict.apply;
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure1 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply2(pure1(f))(a);
      };
    };
  };

  // output/Control.Bind/index.js
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label4) {
    return function(rec) {
      return rec[label4];
    };
  };

  // output/Data.Eq/index.js
  var eqRowNil = {
    eqRecord: function(v) {
      return function(v1) {
        return function(v2) {
          return true;
        };
      };
    }
  };
  var eqRecord = function(dict) {
    return dict.eqRecord;
  };
  var eqRec = function() {
    return function(dictEqRecord) {
      return {
        eq: eqRecord(dictEqRecord)($$Proxy.value)
      };
    };
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eqRowCons = function(dictEqRecord) {
    var eqRecord1 = eqRecord(dictEqRecord);
    return function() {
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        return function(dictEq) {
          var eq3 = eq(dictEq);
          return {
            eqRecord: function(v) {
              return function(ra) {
                return function(rb) {
                  var tail = eqRecord1($$Proxy.value)(ra)(rb);
                  var key = reflectSymbol2($$Proxy.value);
                  var get2 = unsafeGet(key);
                  return eq3(get2(ra))(get2(rb)) && tail;
                };
              };
            }
          };
        };
      };
    };
  };

  // output/Data.Semigroup/index.js
  var append = function(dict) {
    return dict.append;
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };

  // output/Data.Show/index.js
  var showRecordFields = function(dict) {
    return dict.showRecordFields;
  };
  var showRecord = function() {
    return function() {
      return function(dictShowRecordFields) {
        var showRecordFields1 = showRecordFields(dictShowRecordFields);
        return {
          show: function(record) {
            return "{" + (showRecordFields1($$Proxy.value)(record) + "}");
          }
        };
      };
    };
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };
  var showRecordFieldsCons = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function(dictShowRecordFields) {
      var showRecordFields1 = showRecordFields(dictShowRecordFields);
      return function(dictShow) {
        var show1 = show(dictShow);
        return {
          showRecordFields: function(v) {
            return function(record) {
              var tail = showRecordFields1($$Proxy.value)(record);
              var key = reflectSymbol2($$Proxy.value);
              var focus2 = unsafeGet(key)(record);
              return " " + (key + (": " + (show1(focus2) + ("," + tail))));
            };
          }
        };
      };
    };
  };
  var showRecordFieldsConsNil = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function(dictShow) {
      var show1 = show(dictShow);
      return {
        showRecordFields: function(v) {
          return function(record) {
            var key = reflectSymbol2($$Proxy.value);
            var focus2 = unsafeGet(key)(record);
            return " " + (key + (": " + (show1(focus2) + " ")));
          };
        }
      };
    };
  };

  // output/Data.Maybe/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var fromMaybe = function(a) {
    return maybe(a)(identity2);
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind2 = bind(dictMonad.Bind1());
    var pure3 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind2(f)(function(f$prime) {
          return bind2(a)(function(a$prime) {
            return pure3(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init();
      state2 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
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
  function merge(sig1) {
    return function(sig2) {
      var out = make(sig1.get());
      sig2.subscribe(out.set);
      sig1.subscribe(out.set);
      return out;
    };
  }
  function foldp(fun) {
    return function(seed) {
      return function(sig) {
        var acc = seed;
        var out = make(acc);
        sig.subscribe(function(val) {
          acc = fun(val)(acc);
          out.set(acc);
        });
        return out;
      };
    };
  }
  function sampleOn(sig1) {
    return function(sig2) {
      var out = make(sig2.get());
      sig1.subscribe(function() {
        out.set(sig2.get());
      });
      return out;
    };
  }
  function dropRepeatsImpl(eq2) {
    return function(sig) {
      var val = sig.get();
      var out = make(val);
      sig.subscribe(function(newval) {
        var areEqual = eq2(val)(newval);
        if (!areEqual) {
          val = newval;
          out.set(val);
        }
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
  function filter(fn) {
    return function(seed) {
      return function(sig) {
        var out = make(fn(sig.get()) ? sig.get() : seed);
        sig.subscribe(function(val) {
          if (fn(val))
            out.set(val);
        });
        return out;
      };
    };
  }

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Signal/index.js
  var semigroupSignal = {
    append: merge
  };
  var functorSignal = {
    map: mapSig
  };
  var map2 = /* @__PURE__ */ map(functorSignal);
  var filterMap = function(f) {
    return function(def) {
      return function(sig) {
        return map2(fromMaybe(def))(filter(isJust)(new Just(def))(map2(f)(sig)));
      };
    };
  };
  var dropRepeats = function(dictEq) {
    return dropRepeatsImpl(eq(dictEq));
  };

  // output/Signal.DOM/foreign.js
  function keyPressedP(constant2) {
    return function(keyCode) {
      return function() {
        var out = constant2(false);
        window.addEventListener("keydown", function(e) {
          if (e.keyCode === keyCode)
            out.set(true);
        });
        window.addEventListener("keyup", function(e) {
          if (e.keyCode === keyCode)
            out.set(false);
        });
        return out;
      };
    };
  }
  function animationFrameP(constant2) {
    return function(now2) {
      return function() {
        var requestAnimFrame, cancelAnimFrame;
        if (window.requestAnimationFrame) {
          requestAnimFrame = window.requestAnimationFrame;
          cancelAnimFrame = window.cancelAnimationFrame;
        } else if (window.mozRequestAnimationFrame) {
          requestAnimFrame = window.mozRequestAnimationFrame;
          cancelAnimFrame = window.mozCancelAnimationFrame;
        } else if (window.webkitRequestAnimationFrame) {
          requestAnimFrame = window.webkitRequestAnimationFrame;
          cancelAnimFrame = window.webkitCancelAnimationFrame;
        } else if (window.msRequestAnimationFrame) {
          requestAnimFrame = window.msRequestAnimationFrame;
          cancelAnimFrame = window.msCancelAnimationFrame;
        } else if (window.oRequestAnimationFrame) {
          requestAnimFrame = window.oRequestAnimationFrame;
          cancelAnimFrame = window.oCancelAnimationFrame;
        } else {
          requestAnimFrame = function(cb) {
            setTimeout(function() {
              cb(now2());
            }, 1e3 / 60);
          };
          cancelAnimFrame = window.clearTimeout;
        }
        var out = constant2(now2());
        requestAnimFrame(function tick(t) {
          out.set(t);
          requestAnimFrame(tick);
        });
        return out;
      };
    };
  }

  // output/Signal.Time/foreign.js
  function now() {
    var perf = typeof performance !== "undefined" ? performance : null, proc = typeof process !== "undefined" ? process : null;
    return (perf && (perf.now || perf.webkitNow || perf.msNow || perf.oNow || perf.mozNow) || proc && proc.hrtime && function() {
      var t = proc.hrtime();
      return (t[0] * 1e9 + t[1]) / 1e6;
    } || Date.now).call(perf);
  }
  function everyP(constant2) {
    return function(t) {
      var out = constant2(now());
      setInterval(function() {
        out.set(now());
      }, t);
      return out;
    };
  }

  // output/Signal.Time/index.js
  var every = /* @__PURE__ */ everyP(constant);

  // output/Signal.DOM/index.js
  var keyPressed = /* @__PURE__ */ keyPressedP(constant);
  var animationFrame = /* @__PURE__ */ animationFrameP(constant)(now);

  // output/Web.DOM.Document/foreign.js
  var getEffProp = function(name15) {
    return function(doc) {
      return function() {
        return doc[name15];
      };
    };
  };
  var url = getEffProp("URL");
  var documentURI = getEffProp("documentURI");
  var origin = getEffProp("origin");
  var compatMode = getEffProp("compatMode");
  var characterSet = getEffProp("characterSet");
  var contentType = getEffProp("contentType");
  var _documentElement = getEffProp("documentElement");
  function createElement(localName2) {
    return function(doc) {
      return function() {
        return doc.createElement(localName2);
      };
    };
  }

  // output/Data.Nullable/foreign.js
  function nullable(a, r, f) {
    return a == null ? r : f(a);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name15) {
    return function(doctype) {
      return doctype[name15];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp2 = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var children = getEffProp2("children");
  var _firstElementChild = getEffProp2("firstElementChild");
  var _lastElementChild = getEffProp2("lastElementChild");
  var childElementCount = getEffProp2("childElementCount");

  // output/Web.DOM.Element/index.js
  var toNode = unsafeCoerce2;

  // output/Web.DOM.Node/foreign.js
  var getEffProp3 = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var baseURI = getEffProp3("baseURI");
  var _ownerDocument = getEffProp3("ownerDocument");
  var _parentNode = getEffProp3("parentNode");
  var _parentElement = getEffProp3("parentElement");
  var childNodes = getEffProp3("childNodes");
  var _firstChild = getEffProp3("firstChild");
  var _lastChild = getEffProp3("lastChild");
  var _previousSibling = getEffProp3("previousSibling");
  var _nextSibling = getEffProp3("nextSibling");
  var _nodeValue = getEffProp3("nodeValue");
  var textContent = getEffProp3("textContent");
  function setTextContent(value12) {
    return function(node) {
      return function() {
        node.textContent = value12;
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map5) {
        return function(pure3) {
          return function(f) {
            return function(array) {
              function go2(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure3([]);
                  case 1:
                    return map5(array1)(f(array[bot]));
                  case 2:
                    return apply2(map5(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map5(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map5(concat2)(go2(bot, pivot)))(go2(pivot, top2));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _body(doc) {
    return doc.body;
  }

  // output/Web.HTML.HTMLDocument/index.js
  var map3 = /* @__PURE__ */ map(functorEffect);
  var toDocument = unsafeCoerce2;
  var body = function(doc) {
    return map3(toMaybe)(function() {
      return _body(doc);
    });
  };

  // output/Web.HTML.HTMLElement/index.js
  var toNode2 = unsafeCoerce2;

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Main/index.js
  var directionIsSymbol = {
    reflectSymbol: function() {
      return "direction";
    }
  };
  var posIsSymbol = {
    reflectSymbol: function() {
      return "pos";
    }
  };
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var map4 = /* @__PURE__ */ map(functorSignal);
  var append2 = /* @__PURE__ */ append(semigroupSignal);
  var Left2 = /* @__PURE__ */ function() {
    function Left3() {
    }
    ;
    Left3.value = new Left3();
    return Left3;
  }();
  var Right2 = /* @__PURE__ */ function() {
    function Right3() {
    }
    ;
    Right3.value = new Right3();
    return Right3;
  }();
  var Tick = /* @__PURE__ */ function() {
    function Tick2() {
    }
    ;
    Tick2.value = new Tick2();
    return Tick2;
  }();
  var SetDir = /* @__PURE__ */ function() {
    function SetDir2(value0) {
      this.value0 = value0;
    }
    ;
    SetDir2.create = function(value0) {
      return new SetDir2(value0);
    };
    return SetDir2;
  }();
  var update = function(v) {
    return function(v1) {
      if (v instanceof SetDir) {
        return {
          direction: v.value0,
          pos: v1.pos
        };
      }
      ;
      if (v instanceof Tick) {
        var step2 = function(v2) {
          if (v2 instanceof Left2) {
            return -1 | 0;
          }
          ;
          if (v2 instanceof Right2) {
            return 1;
          }
          ;
          throw new Error("Failed pattern match at Main (line 41, column 5 - line 41, column 29): " + [v2.constructor.name]);
        };
        return {
          direction: v1.direction,
          pos: v1.pos + step2(v1.direction) | 0
        };
      }
      ;
      throw new Error("Failed pattern match at Main (line 37, column 1 - line 37, column 35): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var sigTicks = /* @__PURE__ */ function() {
    return sampleOn(every(200))(constant(Tick.value));
  }();
  var showDir = {
    show: function(v) {
      if (v instanceof Left2) {
        return "Left";
      }
      ;
      if (v instanceof Right2) {
        return "Right";
      }
      ;
      throw new Error("Failed pattern match at Main (line 27, column 1 - line 29, column 23): " + [v.constructor.name]);
    }
  };
  var show2 = /* @__PURE__ */ show(/* @__PURE__ */ showRecord()()(/* @__PURE__ */ showRecordFieldsCons(directionIsSymbol)(/* @__PURE__ */ showRecordFieldsConsNil(posIsSymbol)(showInt))(showDir)));
  var render = function(node) {
    return function(model) {
      return setTextContent(show2(model))(node);
    };
  };
  var initialState = /* @__PURE__ */ function() {
    return {
      pos: 0,
      direction: Right2.value
    };
  }();
  var getRenderNode = function __do() {
    var htmlDoc = bindFlipped2(document2)(windowImpl)();
    var body2 = bindFlipped2(maybe($$throw("Could not find body element"))(pure2))(body(htmlDoc))();
    var doc = toDocument(htmlDoc);
    var p1Elem = createElement("p")(doc)();
    var p2Elem = createElement("p")(doc)();
    var p2Node = toNode(p2Elem);
    var p1Node = toNode(p1Elem);
    var bodyNode = toNode2(body2);
    setTextContent("Click on page, then press Left or Right arrow keys")(p1Node)();
    $$void2(appendChild(p1Node)(bodyNode))();
    $$void2(appendChild(p2Node)(bodyNode))();
    return p2Node;
  };
  var fromBool = function(v) {
    return function(v1) {
      if (v1) {
        return new Just(v);
      }
      ;
      if (!v1) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Main (line 76, column 1 - line 76, column 46): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var mapKey = function(direction) {
    return function(sig) {
      return filterMap(fromBool(direction))(initialState.direction)(sig);
    };
  };
  var sigArrowsEff = function __do2() {
    var left = keyPressed(37)();
    var right = keyPressed(39)();
    return map4(SetDir.create)(append2(mapKey(Left2.value)(left))(mapKey(Right2.value)(right)));
  };
  var sigActionEff = function __do3() {
    var sigArrows = sigArrowsEff();
    return merge(sigArrows)(sigTicks);
  };
  var eqDir = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Left2 && y instanceof Left2) {
          return true;
        }
        ;
        if (x instanceof Right2 && y instanceof Right2) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var dropRepeats2 = /* @__PURE__ */ dropRepeats(/* @__PURE__ */ eqRec()(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(eqRowNil)()(posIsSymbol)(eqInt))()(directionIsSymbol)(eqDir)));
  var main = function __do4() {
    var node = getRenderNode();
    var sigAction = sigActionEff();
    var sigFrame = animationFrame();
    var sigState = foldp(update)(initialState)(sigAction);
    var sigStateAtFrame = sampleOn(sigFrame)(sigState);
    var sigStateAtFrameDedup = dropRepeats2(sigStateAtFrame);
    return runSignal(map4(render(node))(sigStateAtFrameDedup))();
  };

  // <stdin>
  main();
})();
