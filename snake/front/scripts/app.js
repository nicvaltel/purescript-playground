(() => {
  // output/Effect.Console/foreign.js
  var log = function(s) {
    return function() {
      console.log(s);
    };
  };

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

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorArray = {
    map: arrayMap
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
    var apply4 = apply(dictApplicative.Apply0());
    var pure1 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply4(pure1(f))(a);
      };
    };
  };

  // output/Control.Bind/index.js
  var bind = function(dict) {
    return dict.bind;
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count, value) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value);
  };
  var replicatePolyfill = function(count, value) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons2(head5, tail2) {
      this.head = head5;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head5) {
      return function(tail2) {
        return new Cons2(head5, tail2);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr2, xs) {
      return listToArray(foldr2(curryCons)(emptyList)(xs));
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty2, next, xs) {
    return xs.length === 0 ? empty2({}) : next(xs[0])(xs.slice(1));
  };
  var indexImpl = function(just, nothing, xs, i) {
    return i < 0 || i >= xs.length ? nothing : just(xs[i]);
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from + (to - from >> 1);
      if (mid - from > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from;
      j = mid;
      k = from;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2, fromOrdering, xs) {
      var out;
      if (xs.length < 2)
        return xs;
      out = xs.slice(0);
      mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
      return out;
    };
  }();
  var sliceImpl = function(s, e, l) {
    return l.slice(s, e);
  };
  var unsafeIndexImpl = function(xs, n) {
    return xs[n];
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind3 = bind(dictMonad.Bind1());
    var pure3 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind3(f)(function(f$prime) {
          return bind3(a)(function(a$prime) {
            return pure3(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq4) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq4 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;

  // output/Data.Eq/index.js
  var eqInt = {
    eq: eqIntImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var notEq = function(dictEq) {
    var eq32 = eq(dictEq);
    return function(x) {
      return function(y) {
        return eq2(eq32(x)(y))(false);
      };
    };
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };
  var numAdd = function(n1) {
    return function(n2) {
      return n1 + n2;
    };
  };
  var numMul = function(n1) {
    return function(n2) {
      return n1 * n2;
    };
  };

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringNumber = {
    add: numAdd,
    zero: 0,
    mul: numMul,
    one: 1
  };
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };
  var one = function(dict) {
    return dict.one;
  };
  var mul = function(dict) {
    return dict.mul;
  };
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ring/index.js
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };

  // output/Data.Ord/index.js
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
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
  var fromMaybe = function(a) {
    return maybe(a)(identity2);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
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

  // output/Effect/index.js
  var $runtime_lazy = function(name2, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
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
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);

  // output/Data.Array.ST/foreign.js
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from + (to - from >> 1);
      if (mid - from > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from;
      j = mid;
      k = from;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2, fromOrdering, xs) {
      if (xs.length < 2)
        return xs;
      mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
      return xs;
    };
  }();

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b) {
    return !b;
  };

  // output/Data.HeytingAlgebra/index.js
  var not = function(dict) {
    return dict.not;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a) {
      return function(b) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var uncurry = function(f) {
    return function(v) {
      return f(v.value0)(v.value1);
    };
  };
  var semiringTuple = function(dictSemiring) {
    var add4 = add(dictSemiring);
    var one2 = one(dictSemiring);
    var mul3 = mul(dictSemiring);
    var zero2 = zero(dictSemiring);
    return function(dictSemiring1) {
      var add1 = add(dictSemiring1);
      var mul1 = mul(dictSemiring1);
      return {
        add: function(v) {
          return function(v1) {
            return new Tuple(add4(v.value0)(v1.value0), add1(v.value1)(v1.value1));
          };
        },
        one: new Tuple(one2, one(dictSemiring1)),
        mul: function(v) {
          return function(v1) {
            return new Tuple(mul3(v.value0)(v1.value0), mul1(v.value1)(v1.value1));
          };
        },
        zero: new Tuple(zero2, zero(dictSemiring1))
      };
    };
  };
  var fst = function(v) {
    return v.value0;
  };
  var eqTuple = function(dictEq) {
    var eq4 = eq(dictEq);
    return function(dictEq1) {
      var eq12 = eq(dictEq1);
      return {
        eq: function(x) {
          return function(y) {
            return eq4(x.value0)(y.value0) && eq12(x.value1)(y.value1);
          };
        }
      };
    };
  };

  // output/Data.Monoid.Disj/index.js
  var Disj = function(x) {
    return x;
  };
  var semigroupDisj = function(dictHeytingAlgebra) {
    var disj2 = disj(dictHeytingAlgebra);
    return {
      append: function(v) {
        return function(v1) {
          return disj2(v)(v1);
        };
      }
    };
  };
  var monoidDisj = function(dictHeytingAlgebra) {
    var semigroupDisj1 = semigroupDisj(dictHeytingAlgebra);
    return {
      mempty: ff(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupDisj1;
      }
    };
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v) {
            return coerce2;
          };
        };
      };
    };
  };

  // output/Data.Foldable/index.js
  var alaF2 = /* @__PURE__ */ alaF()()()();
  var foldr = function(dict) {
    return dict.foldr;
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr2 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append3 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldr2(function(x) {
          return function(acc) {
            return append3(f(x))(acc);
          };
        })(mempty2);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var any = function(dictFoldable) {
    var foldMap2 = foldMap(dictFoldable);
    return function(dictHeytingAlgebra) {
      return alaF2(Disj)(foldMap2(monoidDisj(dictHeytingAlgebra)));
    };
  };
  var elem = function(dictFoldable) {
    var any1 = any(dictFoldable)(heytingAlgebraBoolean);
    return function(dictEq) {
      var $462 = eq(dictEq);
      return function($463) {
        return any1($462($463));
      };
    };
  };
  var notElem = function(dictFoldable) {
    var elem1 = elem(dictFoldable);
    return function(dictEq) {
      var elem22 = elem1(dictEq);
      return function(x) {
        var $464 = elem22(x);
        return function($465) {
          return !$464($465);
        };
      };
    };
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn2 = function(fn) {
    return function(a) {
      return function(b) {
        return fn(a, b);
      };
    };
  };
  var runFn3 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return fn(a, b, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return fn(a, b, c, d);
          };
        };
      };
    };
  };

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
    return function(apply4) {
      return function(map6) {
        return function(pure3) {
          return function(f) {
            return function(array) {
              function go(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure3([]);
                  case 1:
                    return map6(array1)(f(array[bot]));
                  case 2:
                    return apply4(map6(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply4(apply4(map6(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply4(map6(concat2)(go(bot, pivot)))(go(pivot, top3));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse2 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse2(dictApplicative)(identity3);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var $$for = function(dictApplicative) {
    return function(dictTraversable) {
      var traverse2 = traverse(dictTraversable)(dictApplicative);
      return function(x) {
        return function(f) {
          return traverse2(f)(x);
        };
      };
    };
  };

  // output/Data.Array/index.js
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var unsafeIndex = function() {
    return runFn2(unsafeIndexImpl);
  };
  var uncons = /* @__PURE__ */ function() {
    return runFn3(unconsImpl)($$const(Nothing.value))(function(x) {
      return function(xs) {
        return new Just({
          head: x,
          tail: xs
        });
      };
    });
  }();
  var slice = /* @__PURE__ */ runFn3(sliceImpl);
  var index = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
  };
  var cons = function(x) {
    return function(xs) {
      return append2([x])(xs);
    };
  };

  // output/Data.Array.Partial/index.js
  var unsafeIndex2 = /* @__PURE__ */ unsafeIndex();
  var head = function() {
    return function(xs) {
      return unsafeIndex2(xs)(0);
    };
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var floor = Math.floor;
  var remainder = function(n) {
    return function(m) {
      return n % m;
    };
  };

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var floor2 = function($39) {
    return unsafeClamp(floor($39));
  };

  // output/Graphics.Canvas/foreign.js
  function getCanvasElementByIdImpl(id, Just2, Nothing2) {
    return function() {
      var el = document.getElementById(id);
      if (el && el instanceof HTMLCanvasElement) {
        return Just2(el);
      } else {
        return Nothing2;
      }
    };
  }
  function getContext2D(c) {
    return function() {
      return c.getContext("2d");
    };
  }
  function setFillStyle(ctx) {
    return function(style) {
      return function() {
        ctx.fillStyle = style;
      };
    };
  }
  function beginPath(ctx) {
    return function() {
      ctx.beginPath();
    };
  }
  function fill(ctx) {
    return function() {
      ctx.fill();
    };
  }
  function rect(ctx) {
    return function(r) {
      return function() {
        ctx.rect(r.x, r.y, r.width, r.height);
      };
    };
  }

  // output/Graphics.Canvas/index.js
  var getCanvasElementById = function(elId) {
    return getCanvasElementByIdImpl(elId, Just.create, Nothing.value);
  };
  var fillPath = function(ctx) {
    return function(path) {
      return function __do3() {
        beginPath(ctx)();
        var a = path();
        fill(ctx)();
        return a;
      };
    };
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
  function applySig(fun) {
    return function(sig) {
      var out = make(fun.get()(sig.get()));
      var produce = function() {
        out.set(fun.get()(sig.get()));
      };
      fun.subscribe(produce);
      sig.subscribe(produce);
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
  function runSignal(sig) {
    return function() {
      sig.subscribe(function(val) {
        val();
      });
      return {};
    };
  }

  // output/Signal/index.js
  var squigglyMap = function(dictFunctor) {
    return map(dictFunctor);
  };
  var squigglyApply = function(dictApply) {
    return apply(dictApply);
  };
  var functorSignal = {
    map: mapSig
  };
  var squigglyMap1 = /* @__PURE__ */ squigglyMap(functorSignal);
  var applySignal = {
    apply: applySig,
    Functor0: function() {
      return functorSignal;
    }
  };
  var squigglyApply1 = /* @__PURE__ */ squigglyApply(applySignal);
  var map4 = function(f) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return squigglyApply1(squigglyApply1(squigglyApply1(squigglyMap1(f)(a))(b))(c))(d);
          };
        };
      };
    };
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
  var second = 1e3;
  var every = /* @__PURE__ */ everyP(constant);

  // output/Signal.DOM/index.js
  var keyPressed = /* @__PURE__ */ keyPressedP(constant);

  // output/Effect.Random/foreign.js
  var random = Math.random;

  // output/Effect.Random/index.js
  var randomInt = function(low) {
    return function(high) {
      return function __do3() {
        var n = random();
        var asNumber = (toNumber(high) - toNumber(low) + 1) * n + toNumber(low);
        return floor2(asNumber);
      };
    };
  };

  // output/Random.LCG/index.js
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unSeed = function(v) {
    return v;
  };
  var seedMin = 1;
  var lcgM = 2147483647;
  var seedMax = /* @__PURE__ */ function() {
    return lcgM - 1 | 0;
  }();
  var mkSeed = function(x) {
    var ensureBetween = function(min3) {
      return function(max3) {
        return function(n) {
          var rangeSize = max3 - min3 | 0;
          var n$prime = mod2(n)(rangeSize);
          var $25 = n$prime < min3;
          if ($25) {
            return n$prime + max3 | 0;
          }
          ;
          return n$prime;
        };
      };
    };
    return ensureBetween(seedMin)(seedMax)(x);
  };
  var randomSeed = /* @__PURE__ */ map(functorEffect)(mkSeed)(/* @__PURE__ */ randomInt(seedMin)(seedMax));
  var lcgC = 0;
  var lcgA = 48271;
  var lcgPerturb = function(d) {
    return function(v) {
      return fromJust2(fromNumber(remainder(toNumber(lcgA) * toNumber(v) + toNumber(d))(toNumber(lcgM))));
    };
  };
  var lcgNext = /* @__PURE__ */ lcgPerturb(lcgC);

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };

  // output/Control.Monad.State.Trans/index.js
  var functorStateT = function(dictFunctor) {
    var map6 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(s) {
            return map6(function(v1) {
              return new Tuple(f(v1.value0), v1.value1);
            })(v(s));
          };
        };
      }
    };
  };
  var monadStateT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeStateT(dictMonad);
      },
      Bind1: function() {
        return bindStateT(dictMonad);
      }
    };
  };
  var bindStateT = function(dictMonad) {
    var bind3 = bind(dictMonad.Bind1());
    return {
      bind: function(v) {
        return function(f) {
          return function(s) {
            return bind3(v(s))(function(v1) {
              var v3 = f(v1.value0);
              return v3(v1.value1);
            });
          };
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var applyStateT = function(dictMonad) {
    var functorStateT1 = functorStateT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadStateT(dictMonad)),
      Functor0: function() {
        return functorStateT1;
      }
    };
  };
  var applicativeStateT = function(dictMonad) {
    var pure3 = pure(dictMonad.Applicative0());
    return {
      pure: function(a) {
        return function(s) {
          return pure3(new Tuple(a, s));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    var pure3 = pure(dictMonad.Applicative0());
    var monadStateT1 = monadStateT(dictMonad);
    return {
      state: function(f) {
        return function($200) {
          return pure3(f($200));
        };
      },
      Monad0: function() {
        return monadStateT1;
      }
    };
  };

  // output/Control.Monad.State/index.js
  var unwrap3 = /* @__PURE__ */ unwrap();
  var runState = function(v) {
    return function($18) {
      return unwrap3(v($18));
    };
  };
  var evalState = function(v) {
    return function(s) {
      var v1 = v(s);
      return v1.value0;
    };
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head5, tail2) {
      this.head = head5;
      this.tail = tail2;
    };
    function finalCell(head5) {
      return new ConsCell(head5, emptyList);
    }
    function consList(x) {
      return function(xs) {
        return new ConsCell(x, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply4, map6, f) {
      var buildFrom = function(x, ys) {
        return apply4(map6(consList)(f(x)))(ys);
      };
      var go = function(acc, currentLen, xs) {
        if (currentLen === 0) {
          return acc;
        } else {
          var last2 = xs[currentLen - 1];
          return new Cont(function() {
            var built = go(buildFrom(last2, acc), currentLen - 1, xs);
            return built;
          });
        }
      };
      return function(array) {
        var acc = map6(finalCell)(f(array[array.length - 1]));
        var result = go(acc, array.length - 1, array);
        while (result instanceof Cont) {
          result = result.fn();
        }
        return map6(listToArray)(result);
      };
    };
  }();

  // output/Test.QuickCheck.Gen/index.js
  var monadStateStateT2 = /* @__PURE__ */ monadStateStateT(monadIdentity);
  var state2 = /* @__PURE__ */ state(monadStateStateT2);
  var bindStateT2 = /* @__PURE__ */ bindStateT(monadIdentity);
  var functorStateT2 = /* @__PURE__ */ functorStateT(functorIdentity);
  var mul2 = /* @__PURE__ */ mul(semiringNumber);
  var add2 = /* @__PURE__ */ add(semiringNumber);
  var unGen = function(v) {
    return v;
  };
  var runGen = function($103) {
    return runState(unGen($103));
  };
  var monadGen = /* @__PURE__ */ monadStateT(monadIdentity);
  var lcgStep = /* @__PURE__ */ function() {
    var f = function(s) {
      return new Tuple(unSeed(s.newSeed), function() {
        var $94 = {};
        for (var $95 in s) {
          if ({}.hasOwnProperty.call(s, $95)) {
            $94[$95] = s[$95];
          }
          ;
        }
        ;
        $94.newSeed = lcgNext(s.newSeed);
        return $94;
      }());
    };
    return state2(f);
  }();
  var functorGen = functorStateT2;
  var map2 = /* @__PURE__ */ map(functorGen);
  var evalGen = function($104) {
    return evalState(unGen($104));
  };
  var bindGen = bindStateT2;
  var applyGen = /* @__PURE__ */ applyStateT(monadIdentity);
  var apply2 = /* @__PURE__ */ apply(applyGen);
  var chooseInt$prime = function(a) {
    return function(b) {
      var numB = toNumber(b);
      var numA = toNumber(a);
      var clamp = function(x) {
        return numA + remainder(x)(numB - numA + 1);
      };
      var choose31BitPosNumber = map2(toNumber)(lcgStep);
      var choose32BitPosNumber = apply2(map2(add2)(choose31BitPosNumber))(map2(mul2(2))(choose31BitPosNumber));
      return map2(function($109) {
        return floor2(clamp($109));
      })(choose32BitPosNumber);
    };
  };
  var chooseInt = function(a) {
    return function(b) {
      var $101 = a <= b;
      if ($101) {
        return chooseInt$prime(a)(b);
      }
      ;
      return chooseInt$prime(b)(a);
    };
  };
  var applicativeGen = /* @__PURE__ */ applicativeStateT(monadIdentity);

  // output/SignalM/index.js
  var map3 = /* @__PURE__ */ map(functorSignal);
  var foldpM = function(run3) {
    return function(st$prime) {
      return function(f) {
        return function(st) {
          return function(sig) {
            return map3(fst)(foldp(function(xa) {
              return function(v) {
                return uncurry(run3)(new Tuple(f(xa)(v.value0), v.value1));
              };
            })(new Tuple(st, st$prime))(sig));
          };
        };
      };
    };
  };
  var foldpR$prime = /* @__PURE__ */ foldpM(runGen);
  var foldpR = function(f) {
    return function(st) {
      return function(sig) {
        return function __do3() {
          var seed = randomSeed();
          return foldpR$prime({
            newSeed: seed,
            size: 536870911
          })(f)(st)(sig);
        };
      };
    };
  };
  var evalGenD = function(g) {
    return function __do3() {
      var seed = randomSeed();
      return evalGen(g)({
        newSeed: seed,
        size: 536870911
      });
    };
  };

  // output/Snake/index.js
  var bind2 = /* @__PURE__ */ bind(bindGen);
  var pure2 = /* @__PURE__ */ pure(applicativeGen);
  var eqTuple2 = /* @__PURE__ */ eqTuple(eqInt)(eqInt);
  var notEq2 = /* @__PURE__ */ notEq(eqTuple2);
  var apply3 = /* @__PURE__ */ apply(applyEffect);
  var map5 = /* @__PURE__ */ map(functorEffect);
  var elem3 = /* @__PURE__ */ elem(foldableArray)(eqTuple2);
  var add3 = /* @__PURE__ */ add(/* @__PURE__ */ semiringTuple(semiringInt)(semiringInt));
  var head4 = /* @__PURE__ */ head();
  var eq3 = /* @__PURE__ */ eq(eqTuple2);
  var notElem3 = /* @__PURE__ */ notElem(foldableArray)(eqTuple2);
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$for2 = /* @__PURE__ */ $$for(applicativeEffect)(traversableArray);
  var map1 = /* @__PURE__ */ map(functorSignal);
  var white = "#FFFFFF";
  var untilM = function(dictMonad) {
    var bind22 = bind(dictMonad.Bind1());
    var pure1 = pure(dictMonad.Applicative0());
    return function(cond) {
      return function(ma) {
        return bind22(ma)(function(x) {
          var $49 = cond(x);
          if ($49) {
            return pure1(x);
          }
          ;
          return untilM(dictMonad)(cond)(ma);
        });
      };
    };
  };
  var untilM1 = /* @__PURE__ */ untilM(monadGen);
  var square = function(size) {
    return function(x) {
      return function(y) {
        return {
          x: toNumber(size * x | 0),
          y: toNumber(size * y | 0),
          width: toNumber(size),
          height: toNumber(size)
        };
      };
    };
  };
  var snakeColor = white;
  var red = "#FF0000";
  var randomPoint = function(xmax) {
    return function(ymax) {
      return bind2(chooseInt(1)(xmax))(function(x) {
        return bind2(chooseInt(1)(ymax))(function(y) {
          return pure2(new Tuple(x, y));
        });
      });
    };
  };
  var mouseColor = red;
  var init$prime = /* @__PURE__ */ bind2(/* @__PURE__ */ untilM1(function(p) {
    return notEq2(p)(new Tuple(1, 1));
  })(/* @__PURE__ */ randomPoint(25)(25)))(function(ms) {
    return pure2({
      xd: 25,
      yd: 25,
      size: 10,
      mouse: ms,
      snake: [new Tuple(1, 1)],
      dir: new Tuple(1, 0),
      alive: true,
      prev: Nothing.value
    });
  });
  var init2 = /* @__PURE__ */ evalGenD(init$prime);
  var inBounds = function(v) {
    return function(m) {
      return v.value0 > 0 && (v.value1 > 0 && (v.value0 <= m.xd && v.value1 <= m.yd));
    };
  };
  var ifs = function($copy_li) {
    return function($copy_z) {
      var $tco_var_li = $copy_li;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(li, z) {
        var v = uncons(li);
        if (v instanceof Just) {
          if (v.value0.head.value0) {
            $tco_done = true;
            return v.value0.head.value1;
          }
          ;
          $tco_var_li = v.value0.tail;
          $copy_z = z;
          return;
        }
        ;
        if (v instanceof Nothing) {
          $tco_done = true;
          return z;
        }
        ;
        throw new Error("Failed pattern match at Snake (line 190, column 12 - line 192, column 34): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_li, $copy_z);
      }
      ;
      return $tco_result;
    };
  };
  var inputDir = /* @__PURE__ */ function() {
    var f = function(l) {
      return function(u) {
        return function(d) {
          return function(r) {
            return ifs([new Tuple(l, new Tuple(-1 | 0, 0)), new Tuple(u, new Tuple(0, -1 | 0)), new Tuple(d, new Tuple(0, 1)), new Tuple(r, new Tuple(1, 0))])(new Tuple(0, 0));
          };
        };
      };
    };
    return apply3(apply3(apply3(map5(map4(f))(keyPressed(37)))(keyPressed(38)))(keyPressed(40)))(keyPressed(39));
  }();
  var green = "#008000";
  var wallColor = green;
  var fps = function(freq) {
    return every(second / freq);
  };
  var input = /* @__PURE__ */ map5(/* @__PURE__ */ sampleOn(/* @__PURE__ */ fps(20)))(inputDir);
  var colorSquare = function(size) {
    return function(v) {
      return function(color) {
        return function(ctx) {
          return function __do3() {
            setFillStyle(ctx)(color)();
            return fillPath(ctx)(rect(ctx)(square(size)(v.value0)(v.value1)))();
          };
        };
      };
    };
  };
  var checkOK = function(pt) {
    return function(m) {
      return m.alive && (inBounds(pt)(m) && !elem3(pt)(m.snake));
    };
  };
  var body = function(li) {
    return slice(0)(length(li) - 1 | 0)(li);
  };
  var step = function() {
    return function(dir) {
      return function(m) {
        var d = function() {
          var $67 = notEq2(dir)(new Tuple(0, 0));
          if ($67) {
            return dir;
          }
          ;
          return m.dir;
        }();
        var hd = add3(head4(m.snake))(d);
        var $68 = checkOK(hd)(m);
        if ($68) {
          var $69 = eq3(hd)(m.mouse);
          if ($69) {
            return bind2(untilM1(function(pt) {
              return notElem3(pt)(m.snake) && notEq2(pt)(hd);
            })(randomPoint(m.xd)(m.yd)))(function(newMouse) {
              return pure2({
                snake: cons(hd)(m.snake),
                mouse: newMouse,
                dir: d,
                prev: Nothing.value,
                alive: m.alive,
                size: m.size,
                xd: m.xd,
                yd: m.yd
              });
            });
          }
          ;
          return pure2({
            snake: cons(hd)(body(m.snake)),
            dir: d,
            prev: last(m.snake),
            alive: m.alive,
            mouse: m.mouse,
            size: m.size,
            xd: m.xd,
            yd: m.yd
          });
        }
        ;
        return pure2({
          alive: false,
          prev: Nothing.value,
          dir: m.dir,
          mouse: m.mouse,
          size: m.size,
          snake: m.snake,
          xd: m.xd,
          yd: m.yd
        });
      };
    };
  };
  var step1 = /* @__PURE__ */ step();
  var black = "#000000";
  var bgColor = black;
  var render = function() {
    return function(m) {
      return $$void2(function __do3() {
        var v = getCanvasElementById("gameBoard")();
        if (v instanceof Just) {
          var ctx = getContext2D(v.value0)();
          setFillStyle(ctx)(wallColor)();
          fillPath(ctx)(rect(ctx)({
            x: 0,
            y: 0,
            width: toNumber(m.size * (m.xd + 2 | 0) | 0),
            height: toNumber(m.size * (m.yd + 2 | 0) | 0)
          }))();
          setFillStyle(ctx)(bgColor)();
          fillPath(ctx)(rect(ctx)({
            x: toNumber(m.size),
            y: toNumber(m.size),
            width: toNumber(m.size * m.xd | 0),
            height: toNumber(m.size * m.yd | 0)
          }))();
          $$for2(m.snake)(function(x) {
            return colorSquare(m.size)(x)(snakeColor)(ctx);
          })();
          return colorSquare(m.size)(m.mouse)(mouseColor)(ctx)();
        }
        ;
        throw new Error("Failed pattern match at Snake (line 123, column 9 - line 123, column 56): " + [v.constructor.name]);
      });
    };
  };
  var render1 = /* @__PURE__ */ render();
  var renderStep = function() {
    return function(m) {
      return $$void2(function __do3() {
        var v = getCanvasElementById("gameBoard")();
        if (v instanceof Just) {
          var ctx = getContext2D(v.value0)();
          colorSquare(m.size)(head4(m.snake))(snakeColor)(ctx)();
          if (m.prev instanceof Nothing) {
            return colorSquare(m.size)(m.mouse)(mouseColor)(ctx)();
          }
          ;
          if (m.prev instanceof Just) {
            return colorSquare(m.size)(m.prev.value0)(bgColor)(ctx)();
          }
          ;
          throw new Error("Failed pattern match at Snake (line 111, column 9 - line 113, column 55): " + [m.prev.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Snake (line 108, column 9 - line 108, column 56): " + [v.constructor.name]);
      });
    };
  };
  var renderStep1 = /* @__PURE__ */ renderStep();
  var main = function __do() {
    var gameStart = init2();
    render1(gameStart)();
    var dirSignal = input();
    var game = foldpR(step1)(gameStart)(dirSignal)();
    return runSignal(map1(renderStep1)(game))();
  };

  // output/Main/index.js
  var main2 = function __do2() {
    log("\u{1F35D}")();
    return main();
  };

  // <stdin>
  main2();
})();
