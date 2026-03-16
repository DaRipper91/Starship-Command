function dp(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, 'default')
    ? o.default
    : o;
}
function uv(o) {
  if (Object.prototype.hasOwnProperty.call(o, '__esModule')) return o;
  var u = o.default;
  if (typeof u == 'function') {
    var s = function c() {
      var d = !1;
      try {
        d = this instanceof c;
      } catch {}
      return d
        ? Reflect.construct(u, arguments, this.constructor)
        : u.apply(this, arguments);
    };
    s.prototype = u.prototype;
  } else s = {};
  return (
    Object.defineProperty(s, '__esModule', { value: !0 }),
    Object.keys(o).forEach(function (c) {
      var d = Object.getOwnPropertyDescriptor(o, c);
      Object.defineProperty(
        s,
        c,
        d.get
          ? d
          : {
              enumerable: !0,
              get: function () {
                return o[c];
              },
            },
      );
    }),
    s
  );
}
var _u = { exports: {} },
  ae = {},
  xc;
function pp() {
  if (xc) return ae;
  xc = 1;
  var o = Symbol.for('react.element'),
    u = Symbol.for('react.portal'),
    s = Symbol.for('react.fragment'),
    c = Symbol.for('react.strict_mode'),
    d = Symbol.for('react.profiler'),
    h = Symbol.for('react.provider'),
    y = Symbol.for('react.context'),
    m = Symbol.for('react.forward_ref'),
    S = Symbol.for('react.suspense'),
    E = Symbol.for('react.memo'),
    N = Symbol.for('react.lazy'),
    R = Symbol.iterator;
  function P(g) {
    return g === null || typeof g != 'object'
      ? null
      : ((g = (R && g[R]) || g['@@iterator']),
        typeof g == 'function' ? g : null);
  }
  var L = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    G = Object.assign,
    O = {};
  function I(g, D, q) {
    ((this.props = g),
      (this.context = D),
      (this.refs = O),
      (this.updater = q || L));
  }
  ((I.prototype.isReactComponent = {}),
    (I.prototype.setState = function (g, D) {
      if (typeof g != 'object' && typeof g != 'function' && g != null)
        throw Error(
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
        );
      this.updater.enqueueSetState(this, g, D, 'setState');
    }),
    (I.prototype.forceUpdate = function (g) {
      this.updater.enqueueForceUpdate(this, g, 'forceUpdate');
    }));
  function b() {}
  b.prototype = I.prototype;
  function Z(g, D, q) {
    ((this.props = g),
      (this.context = D),
      (this.refs = O),
      (this.updater = q || L));
  }
  var $ = (Z.prototype = new b());
  (($.constructor = Z), G($, I.prototype), ($.isPureReactComponent = !0));
  var Y = Array.isArray,
    oe = Object.prototype.hasOwnProperty,
    ee = { current: null },
    Q = { key: !0, ref: !0, __self: !0, __source: !0 };
  function te(g, D, q) {
    var re,
      ue = {},
      le = null,
      ye = null;
    if (D != null)
      for (re in (D.ref !== void 0 && (ye = D.ref),
      D.key !== void 0 && (le = '' + D.key),
      D))
        oe.call(D, re) && !Q.hasOwnProperty(re) && (ue[re] = D[re]);
    var se = arguments.length - 2;
    if (se === 1) ue.children = q;
    else if (1 < se) {
      for (var pe = Array(se), ie = 0; ie < se; ie++)
        pe[ie] = arguments[ie + 2];
      ue.children = pe;
    }
    if (g && g.defaultProps)
      for (re in ((se = g.defaultProps), se))
        ue[re] === void 0 && (ue[re] = se[re]);
    return {
      $$typeof: o,
      type: g,
      key: le,
      ref: ye,
      props: ue,
      _owner: ee.current,
    };
  }
  function ve(g, D) {
    return {
      $$typeof: o,
      type: g.type,
      key: D,
      ref: g.ref,
      props: g.props,
      _owner: g._owner,
    };
  }
  function me(g) {
    return typeof g == 'object' && g !== null && g.$$typeof === o;
  }
  function de(g) {
    var D = { '=': '=0', ':': '=2' };
    return (
      '$' +
      g.replace(/[=:]/g, function (q) {
        return D[q];
      })
    );
  }
  var Te = /\/+/g;
  function Se(g, D) {
    return typeof g == 'object' && g !== null && g.key != null
      ? de('' + g.key)
      : D.toString(36);
  }
  function Pe(g, D, q, re, ue) {
    var le = typeof g;
    (le === 'undefined' || le === 'boolean') && (g = null);
    var ye = !1;
    if (g === null) ye = !0;
    else
      switch (le) {
        case 'string':
        case 'number':
          ye = !0;
          break;
        case 'object':
          switch (g.$$typeof) {
            case o:
            case u:
              ye = !0;
          }
      }
    if (ye)
      return (
        (ye = g),
        (ue = ue(ye)),
        (g = re === '' ? '.' + Se(ye, 0) : re),
        Y(ue)
          ? ((q = ''),
            g != null && (q = g.replace(Te, '$&/') + '/'),
            Pe(ue, D, q, '', function (ie) {
              return ie;
            }))
          : ue != null &&
            (me(ue) &&
              (ue = ve(
                ue,
                q +
                  (!ue.key || (ye && ye.key === ue.key)
                    ? ''
                    : ('' + ue.key).replace(Te, '$&/') + '/') +
                  g,
              )),
            D.push(ue)),
        1
      );
    if (((ye = 0), (re = re === '' ? '.' : re + ':'), Y(g)))
      for (var se = 0; se < g.length; se++) {
        le = g[se];
        var pe = re + Se(le, se);
        ye += Pe(le, D, q, pe, ue);
      }
    else if (((pe = P(g)), typeof pe == 'function'))
      for (g = pe.call(g), se = 0; !(le = g.next()).done; )
        ((le = le.value),
          (pe = re + Se(le, se++)),
          (ye += Pe(le, D, q, pe, ue)));
    else if (le === 'object')
      throw (
        (D = String(g)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (D === '[object Object]'
              ? 'object with keys {' + Object.keys(g).join(', ') + '}'
              : D) +
            '). If you meant to render a collection of children, use an array instead.',
        )
      );
    return ye;
  }
  function Ke(g, D, q) {
    if (g == null) return g;
    var re = [],
      ue = 0;
    return (
      Pe(g, re, '', '', function (le) {
        return D.call(q, le, ue++);
      }),
      re
    );
  }
  function Ae(g) {
    if (g._status === -1) {
      var D = g._result;
      ((D = D()),
        D.then(
          function (q) {
            (g._status === 0 || g._status === -1) &&
              ((g._status = 1), (g._result = q));
          },
          function (q) {
            (g._status === 0 || g._status === -1) &&
              ((g._status = 2), (g._result = q));
          },
        ),
        g._status === -1 && ((g._status = 0), (g._result = D)));
    }
    if (g._status === 1) return g._result.default;
    throw g._result;
  }
  var ce = { current: null },
    A = { transition: null },
    W = {
      ReactCurrentDispatcher: ce,
      ReactCurrentBatchConfig: A,
      ReactCurrentOwner: ee,
    };
  function j() {
    throw Error('act(...) is not supported in production builds of React.');
  }
  return (
    (ae.Children = {
      map: Ke,
      forEach: function (g, D, q) {
        Ke(
          g,
          function () {
            D.apply(this, arguments);
          },
          q,
        );
      },
      count: function (g) {
        var D = 0;
        return (
          Ke(g, function () {
            D++;
          }),
          D
        );
      },
      toArray: function (g) {
        return (
          Ke(g, function (D) {
            return D;
          }) || []
        );
      },
      only: function (g) {
        if (!me(g))
          throw Error(
            'React.Children.only expected to receive a single React element child.',
          );
        return g;
      },
    }),
    (ae.Component = I),
    (ae.Fragment = s),
    (ae.Profiler = d),
    (ae.PureComponent = Z),
    (ae.StrictMode = c),
    (ae.Suspense = S),
    (ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W),
    (ae.act = j),
    (ae.cloneElement = function (g, D, q) {
      if (g == null)
        throw Error(
          'React.cloneElement(...): The argument must be a React element, but you passed ' +
            g +
            '.',
        );
      var re = G({}, g.props),
        ue = g.key,
        le = g.ref,
        ye = g._owner;
      if (D != null) {
        if (
          (D.ref !== void 0 && ((le = D.ref), (ye = ee.current)),
          D.key !== void 0 && (ue = '' + D.key),
          g.type && g.type.defaultProps)
        )
          var se = g.type.defaultProps;
        for (pe in D)
          oe.call(D, pe) &&
            !Q.hasOwnProperty(pe) &&
            (re[pe] = D[pe] === void 0 && se !== void 0 ? se[pe] : D[pe]);
      }
      var pe = arguments.length - 2;
      if (pe === 1) re.children = q;
      else if (1 < pe) {
        se = Array(pe);
        for (var ie = 0; ie < pe; ie++) se[ie] = arguments[ie + 2];
        re.children = se;
      }
      return {
        $$typeof: o,
        type: g.type,
        key: ue,
        ref: le,
        props: re,
        _owner: ye,
      };
    }),
    (ae.createContext = function (g) {
      return (
        (g = {
          $$typeof: y,
          _currentValue: g,
          _currentValue2: g,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (g.Provider = { $$typeof: h, _context: g }),
        (g.Consumer = g)
      );
    }),
    (ae.createElement = te),
    (ae.createFactory = function (g) {
      var D = te.bind(null, g);
      return ((D.type = g), D);
    }),
    (ae.createRef = function () {
      return { current: null };
    }),
    (ae.forwardRef = function (g) {
      return { $$typeof: m, render: g };
    }),
    (ae.isValidElement = me),
    (ae.lazy = function (g) {
      return { $$typeof: N, _payload: { _status: -1, _result: g }, _init: Ae };
    }),
    (ae.memo = function (g, D) {
      return { $$typeof: E, type: g, compare: D === void 0 ? null : D };
    }),
    (ae.startTransition = function (g) {
      var D = A.transition;
      A.transition = {};
      try {
        g();
      } finally {
        A.transition = D;
      }
    }),
    (ae.unstable_act = j),
    (ae.useCallback = function (g, D) {
      return ce.current.useCallback(g, D);
    }),
    (ae.useContext = function (g) {
      return ce.current.useContext(g);
    }),
    (ae.useDebugValue = function () {}),
    (ae.useDeferredValue = function (g) {
      return ce.current.useDeferredValue(g);
    }),
    (ae.useEffect = function (g, D) {
      return ce.current.useEffect(g, D);
    }),
    (ae.useId = function () {
      return ce.current.useId();
    }),
    (ae.useImperativeHandle = function (g, D, q) {
      return ce.current.useImperativeHandle(g, D, q);
    }),
    (ae.useInsertionEffect = function (g, D) {
      return ce.current.useInsertionEffect(g, D);
    }),
    (ae.useLayoutEffect = function (g, D) {
      return ce.current.useLayoutEffect(g, D);
    }),
    (ae.useMemo = function (g, D) {
      return ce.current.useMemo(g, D);
    }),
    (ae.useReducer = function (g, D, q) {
      return ce.current.useReducer(g, D, q);
    }),
    (ae.useRef = function (g) {
      return ce.current.useRef(g);
    }),
    (ae.useState = function (g) {
      return ce.current.useState(g);
    }),
    (ae.useSyncExternalStore = function (g, D, q) {
      return ce.current.useSyncExternalStore(g, D, q);
    }),
    (ae.useTransition = function () {
      return ce.current.useTransition();
    }),
    (ae.version = '18.3.1'),
    ae
  );
}
var Cc;
function Hc() {
  return (Cc || ((Cc = 1), (_u.exports = pp())), _u.exports);
}
var C = Hc();
const _e = dp(C);
var Tu = { exports: {} },
  pt = {},
  Pu = { exports: {} },
  zu = {};
var Ec;
function hp() {
  return (
    Ec ||
      ((Ec = 1),
      (function (o) {
        function u(A, W) {
          var j = A.length;
          A.push(W);
          e: for (; 0 < j; ) {
            var g = (j - 1) >>> 1,
              D = A[g];
            if (0 < d(D, W)) ((A[g] = W), (A[j] = D), (j = g));
            else break e;
          }
        }
        function s(A) {
          return A.length === 0 ? null : A[0];
        }
        function c(A) {
          if (A.length === 0) return null;
          var W = A[0],
            j = A.pop();
          if (j !== W) {
            A[0] = j;
            e: for (var g = 0, D = A.length, q = D >>> 1; g < q; ) {
              var re = 2 * (g + 1) - 1,
                ue = A[re],
                le = re + 1,
                ye = A[le];
              if (0 > d(ue, j))
                le < D && 0 > d(ye, ue)
                  ? ((A[g] = ye), (A[le] = j), (g = le))
                  : ((A[g] = ue), (A[re] = j), (g = re));
              else if (le < D && 0 > d(ye, j))
                ((A[g] = ye), (A[le] = j), (g = le));
              else break e;
            }
          }
          return W;
        }
        function d(A, W) {
          var j = A.sortIndex - W.sortIndex;
          return j !== 0 ? j : A.id - W.id;
        }
        if (
          typeof performance == 'object' &&
          typeof performance.now == 'function'
        ) {
          var h = performance;
          o.unstable_now = function () {
            return h.now();
          };
        } else {
          var y = Date,
            m = y.now();
          o.unstable_now = function () {
            return y.now() - m;
          };
        }
        var S = [],
          E = [],
          N = 1,
          R = null,
          P = 3,
          L = !1,
          G = !1,
          O = !1,
          I = typeof setTimeout == 'function' ? setTimeout : null,
          b = typeof clearTimeout == 'function' ? clearTimeout : null,
          Z = typeof setImmediate < 'u' ? setImmediate : null;
        typeof navigator < 'u' &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function $(A) {
          for (var W = s(E); W !== null; ) {
            if (W.callback === null) c(E);
            else if (W.startTime <= A)
              (c(E), (W.sortIndex = W.expirationTime), u(S, W));
            else break;
            W = s(E);
          }
        }
        function Y(A) {
          if (((O = !1), $(A), !G))
            if (s(S) !== null) ((G = !0), Ae(oe));
            else {
              var W = s(E);
              W !== null && ce(Y, W.startTime - A);
            }
        }
        function oe(A, W) {
          ((G = !1), O && ((O = !1), b(te), (te = -1)), (L = !0));
          var j = P;
          try {
            for (
              $(W), R = s(S);
              R !== null && (!(R.expirationTime > W) || (A && !de()));
            ) {
              var g = R.callback;
              if (typeof g == 'function') {
                ((R.callback = null), (P = R.priorityLevel));
                var D = g(R.expirationTime <= W);
                ((W = o.unstable_now()),
                  typeof D == 'function'
                    ? (R.callback = D)
                    : R === s(S) && c(S),
                  $(W));
              } else c(S);
              R = s(S);
            }
            if (R !== null) var q = !0;
            else {
              var re = s(E);
              (re !== null && ce(Y, re.startTime - W), (q = !1));
            }
            return q;
          } finally {
            ((R = null), (P = j), (L = !1));
          }
        }
        var ee = !1,
          Q = null,
          te = -1,
          ve = 5,
          me = -1;
        function de() {
          return !(o.unstable_now() - me < ve);
        }
        function Te() {
          if (Q !== null) {
            var A = o.unstable_now();
            me = A;
            var W = !0;
            try {
              W = Q(!0, A);
            } finally {
              W ? Se() : ((ee = !1), (Q = null));
            }
          } else ee = !1;
        }
        var Se;
        if (typeof Z == 'function')
          Se = function () {
            Z(Te);
          };
        else if (typeof MessageChannel < 'u') {
          var Pe = new MessageChannel(),
            Ke = Pe.port2;
          ((Pe.port1.onmessage = Te),
            (Se = function () {
              Ke.postMessage(null);
            }));
        } else
          Se = function () {
            I(Te, 0);
          };
        function Ae(A) {
          ((Q = A), ee || ((ee = !0), Se()));
        }
        function ce(A, W) {
          te = I(function () {
            A(o.unstable_now());
          }, W);
        }
        ((o.unstable_IdlePriority = 5),
          (o.unstable_ImmediatePriority = 1),
          (o.unstable_LowPriority = 4),
          (o.unstable_NormalPriority = 3),
          (o.unstable_Profiling = null),
          (o.unstable_UserBlockingPriority = 2),
          (o.unstable_cancelCallback = function (A) {
            A.callback = null;
          }),
          (o.unstable_continueExecution = function () {
            G || L || ((G = !0), Ae(oe));
          }),
          (o.unstable_forceFrameRate = function (A) {
            0 > A || 125 < A
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
                )
              : (ve = 0 < A ? Math.floor(1e3 / A) : 5);
          }),
          (o.unstable_getCurrentPriorityLevel = function () {
            return P;
          }),
          (o.unstable_getFirstCallbackNode = function () {
            return s(S);
          }),
          (o.unstable_next = function (A) {
            switch (P) {
              case 1:
              case 2:
              case 3:
                var W = 3;
                break;
              default:
                W = P;
            }
            var j = P;
            P = W;
            try {
              return A();
            } finally {
              P = j;
            }
          }),
          (o.unstable_pauseExecution = function () {}),
          (o.unstable_requestPaint = function () {}),
          (o.unstable_runWithPriority = function (A, W) {
            switch (A) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                A = 3;
            }
            var j = P;
            P = A;
            try {
              return W();
            } finally {
              P = j;
            }
          }),
          (o.unstable_scheduleCallback = function (A, W, j) {
            var g = o.unstable_now();
            switch (
              (typeof j == 'object' && j !== null
                ? ((j = j.delay),
                  (j = typeof j == 'number' && 0 < j ? g + j : g))
                : (j = g),
              A)
            ) {
              case 1:
                var D = -1;
                break;
              case 2:
                D = 250;
                break;
              case 5:
                D = 1073741823;
                break;
              case 4:
                D = 1e4;
                break;
              default:
                D = 5e3;
            }
            return (
              (D = j + D),
              (A = {
                id: N++,
                callback: W,
                priorityLevel: A,
                startTime: j,
                expirationTime: D,
                sortIndex: -1,
              }),
              j > g
                ? ((A.sortIndex = j),
                  u(E, A),
                  s(S) === null &&
                    A === s(E) &&
                    (O ? (b(te), (te = -1)) : (O = !0), ce(Y, j - g)))
                : ((A.sortIndex = D), u(S, A), G || L || ((G = !0), Ae(oe))),
              A
            );
          }),
          (o.unstable_shouldYield = de),
          (o.unstable_wrapCallback = function (A) {
            var W = P;
            return function () {
              var j = P;
              P = W;
              try {
                return A.apply(this, arguments);
              } finally {
                P = j;
              }
            };
          }));
      })(zu)),
    zu
  );
}
var Rc;
function vp() {
  return (Rc || ((Rc = 1), (Pu.exports = hp())), Pu.exports);
}
var Dc;
function gp() {
  if (Dc) return pt;
  Dc = 1;
  var o = Hc(),
    u = vp();
  function s(e) {
    for (
      var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += '&args[]=' + encodeURIComponent(arguments[n]);
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  var c = new Set(),
    d = {};
  function h(e, t) {
    (y(e, t), y(e + 'Capture', t));
  }
  function y(e, t) {
    for (d[e] = t, e = 0; e < t.length; e++) c.add(t[e]);
  }
  var m = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    S = Object.prototype.hasOwnProperty,
    E =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    N = {},
    R = {};
  function P(e) {
    return S.call(R, e)
      ? !0
      : S.call(N, e)
        ? !1
        : E.test(e)
          ? (R[e] = !0)
          : ((N[e] = !0), !1);
  }
  function L(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case 'function':
      case 'symbol':
        return !0;
      case 'boolean':
        return r
          ? !1
          : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== 'data-' && e !== 'aria-');
      default:
        return !1;
    }
  }
  function G(e, t, n, r) {
    if (t === null || typeof t > 'u' || L(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function O(e, t, n, r, l, i, a) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = r),
      (this.attributeNamespace = l),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = i),
      (this.removeEmptyString = a));
  }
  var I = {};
  ('children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (e) {
      I[e] = new O(e, 0, !1, e, null, !1, !1);
    }),
    [
      ['acceptCharset', 'accept-charset'],
      ['className', 'class'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
    ].forEach(function (e) {
      var t = e[0];
      I[t] = new O(t, 1, !1, e[1], null, !1, !1);
    }),
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(
      function (e) {
        I[e] = new O(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    ),
    [
      'autoReverse',
      'externalResourcesRequired',
      'focusable',
      'preserveAlpha',
    ].forEach(function (e) {
      I[e] = new O(e, 2, !1, e, null, !1, !1);
    }),
    'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
      .split(' ')
      .forEach(function (e) {
        I[e] = new O(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
      I[e] = new O(e, 3, !0, e, null, !1, !1);
    }),
    ['capture', 'download'].forEach(function (e) {
      I[e] = new O(e, 4, !1, e, null, !1, !1);
    }),
    ['cols', 'rows', 'size', 'span'].forEach(function (e) {
      I[e] = new O(e, 6, !1, e, null, !1, !1);
    }),
    ['rowSpan', 'start'].forEach(function (e) {
      I[e] = new O(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
  var b = /[\-:]([a-z])/g;
  function Z(e) {
    return e[1].toUpperCase();
  }
  ('accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (e) {
      var t = e.replace(b, Z);
      I[t] = new O(t, 1, !1, e, null, !1, !1);
    }),
    'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
      .split(' ')
      .forEach(function (e) {
        var t = e.replace(b, Z);
        I[t] = new O(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
      }),
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
      var t = e.replace(b, Z);
      I[t] = new O(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
    }),
    ['tabIndex', 'crossOrigin'].forEach(function (e) {
      I[e] = new O(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (I.xlinkHref = new O(
      'xlinkHref',
      1,
      !1,
      'xlink:href',
      'http://www.w3.org/1999/xlink',
      !0,
      !1,
    )),
    ['src', 'href', 'action', 'formAction'].forEach(function (e) {
      I[e] = new O(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
  function $(e, t, n, r) {
    var l = I.hasOwnProperty(t) ? I[t] : null;
    (l !== null
      ? l.type !== 0
      : r ||
        !(2 < t.length) ||
        (t[0] !== 'o' && t[0] !== 'O') ||
        (t[1] !== 'n' && t[1] !== 'N')) &&
      (G(t, n, l, r) && (n = null),
      r || l === null
        ? P(t) &&
          (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
        : l.mustUseProperty
          ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : '') : n)
          : ((t = l.attributeName),
            (r = l.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((l = l.type),
                (n = l === 3 || (l === 4 && n === !0) ? '' : '' + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var Y = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    oe = Symbol.for('react.element'),
    ee = Symbol.for('react.portal'),
    Q = Symbol.for('react.fragment'),
    te = Symbol.for('react.strict_mode'),
    ve = Symbol.for('react.profiler'),
    me = Symbol.for('react.provider'),
    de = Symbol.for('react.context'),
    Te = Symbol.for('react.forward_ref'),
    Se = Symbol.for('react.suspense'),
    Pe = Symbol.for('react.suspense_list'),
    Ke = Symbol.for('react.memo'),
    Ae = Symbol.for('react.lazy'),
    ce = Symbol.for('react.offscreen'),
    A = Symbol.iterator;
  function W(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (A && e[A]) || e['@@iterator']),
        typeof e == 'function' ? e : null);
  }
  var j = Object.assign,
    g;
  function D(e) {
    if (g === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        g = (t && t[1]) || '';
      }
    return (
      `
` +
      g +
      e
    );
  }
  var q = !1;
  function re(e, t) {
    if (!e || q) return '';
    q = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, 'props', {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == 'object' && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (x) {
            var r = x;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (x) {
            r = x;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (x) {
          r = x;
        }
        e();
      }
    } catch (x) {
      if (x && r && typeof x.stack == 'string') {
        for (
          var l = x.stack.split(`
`),
            i = r.stack.split(`
`),
            a = l.length - 1,
            f = i.length - 1;
          1 <= a && 0 <= f && l[a] !== i[f];
        )
          f--;
        for (; 1 <= a && 0 <= f; a--, f--)
          if (l[a] !== i[f]) {
            if (a !== 1 || f !== 1)
              do
                if ((a--, f--, 0 > f || l[a] !== i[f])) {
                  var p =
                    `
` + l[a].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      p.includes('<anonymous>') &&
                      (p = p.replace('<anonymous>', e.displayName)),
                    p
                  );
                }
              while (1 <= a && 0 <= f);
            break;
          }
      }
    } finally {
      ((q = !1), (Error.prepareStackTrace = n));
    }
    return (e = e ? e.displayName || e.name : '') ? D(e) : '';
  }
  function ue(e) {
    switch (e.tag) {
      case 5:
        return D(e.type);
      case 16:
        return D('Lazy');
      case 13:
        return D('Suspense');
      case 19:
        return D('SuspenseList');
      case 0:
      case 2:
      case 15:
        return ((e = re(e.type, !1)), e);
      case 11:
        return ((e = re(e.type.render, !1)), e);
      case 1:
        return ((e = re(e.type, !0)), e);
      default:
        return '';
    }
  }
  function le(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case Q:
        return 'Fragment';
      case ee:
        return 'Portal';
      case ve:
        return 'Profiler';
      case te:
        return 'StrictMode';
      case Se:
        return 'Suspense';
      case Pe:
        return 'SuspenseList';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case de:
          return (e.displayName || 'Context') + '.Consumer';
        case me:
          return (e._context.displayName || 'Context') + '.Provider';
        case Te:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case Ke:
          return (
            (t = e.displayName || null),
            t !== null ? t : le(e.type) || 'Memo'
          );
        case Ae:
          ((t = e._payload), (e = e._init));
          try {
            return le(e(t));
          } catch {}
      }
    return null;
  }
  function ye(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return 'Cache';
      case 9:
        return (t.displayName || 'Context') + '.Consumer';
      case 10:
        return (t._context.displayName || 'Context') + '.Provider';
      case 18:
        return 'DehydratedFragment';
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ''),
          t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
        );
      case 7:
        return 'Fragment';
      case 5:
        return t;
      case 4:
        return 'Portal';
      case 3:
        return 'Root';
      case 6:
        return 'Text';
      case 16:
        return le(t);
      case 8:
        return t === te ? 'StrictMode' : 'Mode';
      case 22:
        return 'Offscreen';
      case 12:
        return 'Profiler';
      case 21:
        return 'Scope';
      case 13:
        return 'Suspense';
      case 19:
        return 'SuspenseList';
      case 25:
        return 'TracingMarker';
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == 'function') return t.displayName || t.name || null;
        if (typeof t == 'string') return t;
    }
    return null;
  }
  function se(e) {
    switch (typeof e) {
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e;
      case 'object':
        return e;
      default:
        return '';
    }
  }
  function pe(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === 'input' &&
      (t === 'checkbox' || t === 'radio')
    );
  }
  function ie(e) {
    var t = pe(e) ? 'checked' : 'value',
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = '' + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var l = n.get,
        i = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (a) {
            ((r = '' + a), i.call(this, a));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (a) {
            r = '' + a;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function $t(e) {
    e._valueTracker || (e._valueTracker = ie(e));
  }
  function ht(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = '';
    return (
      e && (r = pe(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = r),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function _t(e) {
    if (
      ((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function vt(e, t) {
    var n = t.checked;
    return j({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function Jt(e, t) {
    var n = t.defaultValue == null ? '' : t.defaultValue,
      r = t.checked != null ? t.checked : t.defaultChecked;
    ((n = se(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          t.type === 'checkbox' || t.type === 'radio'
            ? t.checked != null
            : t.value != null,
      }));
  }
  function bt(e, t) {
    ((t = t.checked), t != null && $(e, 'checked', t, !1));
  }
  function Zn(e, t) {
    bt(e, t);
    var n = se(t.value),
      r = t.type;
    if (n != null)
      r === 'number'
        ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
        : e.value !== '' + n && (e.value = '' + n);
    else if (r === 'submit' || r === 'reset') {
      e.removeAttribute('value');
      return;
    }
    (t.hasOwnProperty('value')
      ? In(e, t.type, n)
      : t.hasOwnProperty('defaultValue') && In(e, t.type, se(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked));
  }
  function Rr(e, t, n) {
    if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
      var r = t.type;
      if (
        !(
          (r !== 'submit' && r !== 'reset') ||
          (t.value !== void 0 && t.value !== null)
        )
      )
        return;
      ((t = '' + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = e.name),
      n !== '' && (e.name = ''),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      n !== '' && (e.name = n));
  }
  function In(e, t, n) {
    (t !== 'number' || _t(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = '' + e._wrapperState.initialValue)
        : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
  }
  var ot = Array.isArray;
  function Tt(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var l = 0; l < n.length; l++) t['$' + n[l]] = !0;
      for (n = 0; n < e.length; n++)
        ((l = t.hasOwnProperty('$' + e[n].value)),
          e[n].selected !== l && (e[n].selected = l),
          l && r && (e[n].defaultSelected = !0));
    } else {
      for (n = '' + se(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          ((e[l].selected = !0), r && (e[l].defaultSelected = !0));
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function fn(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return j({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: '' + e._wrapperState.initialValue,
    });
  }
  function Dr(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(s(92));
        if (ot(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        t = n;
      }
      (t == null && (t = ''), (n = t));
    }
    e._wrapperState = { initialValue: se(n) };
  }
  function Nr(e, t) {
    var n = se(t.value),
      r = se(t.defaultValue);
    (n != null &&
      ((n = '' + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      r != null && (e.defaultValue = '' + r));
  }
  function Cl(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== '' &&
      t !== null &&
      (e.value = t);
  }
  function El(e) {
    switch (e) {
      case 'svg':
        return 'http://www.w3.org/2000/svg';
      case 'math':
        return 'http://www.w3.org/1998/Math/MathML';
      default:
        return 'http://www.w3.org/1999/xhtml';
    }
  }
  function Qt(e, t) {
    return e == null || e === 'http://www.w3.org/1999/xhtml'
      ? El(t)
      : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : e;
  }
  var Pt,
    dn = (function (e) {
      return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
        ? function (t, n, r, l) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, r, l);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
        e.innerHTML = t;
      else {
        for (
          Pt = Pt || document.createElement('div'),
            Pt.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
            t = Pt.firstChild;
          e.firstChild;
        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function pn(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var it = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    Rl = ['Webkit', 'ms', 'Moz', 'O'];
  Object.keys(it).forEach(function (e) {
    Rl.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (it[t] = it[e]));
    });
  });
  function Dl(e, t, n) {
    return t == null || typeof t == 'boolean' || t === ''
      ? ''
      : n || typeof t != 'number' || t === 0 || (it.hasOwnProperty(e) && it[e])
        ? ('' + t).trim()
        : t + 'px';
  }
  function Nl(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf('--') === 0,
          l = Dl(n, t[n], r);
        (n === 'float' && (n = 'cssFloat'),
          r ? e.setProperty(n, l) : (e[n] = l));
      }
  }
  var Mr = j(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function qn(e, t) {
    if (t) {
      if (Mr[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (
          typeof t.dangerouslySetInnerHTML != 'object' ||
          !('__html' in t.dangerouslySetInnerHTML)
        )
          throw Error(s(61));
      }
      if (t.style != null && typeof t.style != 'object') throw Error(s(62));
    }
  }
  function _r(e, t) {
    if (e.indexOf('-') === -1) return typeof t.is == 'string';
    switch (e) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var Jn = null;
  function Tr(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Pr = null,
    hn = null,
    Re = null;
  function Xe(e) {
    if ((e = qr(e))) {
      if (typeof Pr != 'function') throw Error(s(280));
      var t = e.stateNode;
      t && ((t = Yl(t)), Pr(e.stateNode, e.type, t));
    }
  }
  function Ye(e) {
    hn ? (Re ? Re.push(e) : (Re = [e])) : (hn = e);
  }
  function zt() {
    if (hn) {
      var e = hn,
        t = Re;
      if (((Re = hn = null), Xe(e), t)) for (e = 0; e < t.length; e++) Xe(t[e]);
    }
  }
  function tt(e, t) {
    return e(t);
  }
  function Ge() {}
  var ut = !1;
  function en(e, t, n) {
    if (ut) return e(t, n);
    ut = !0;
    try {
      return tt(e, t, n);
    } finally {
      ((ut = !1), (hn !== null || Re !== null) && (Ge(), zt()));
    }
  }
  function De(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Yl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ((r = !r.disabled) ||
          ((e = e.type),
          (r = !(
            e === 'button' ||
            e === 'input' ||
            e === 'select' ||
            e === 'textarea'
          ))),
          (e = !r));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != 'function') throw Error(s(231, t, typeof n));
    return n;
  }
  var St = !1;
  if (m)
    try {
      var Ze = {};
      (Object.defineProperty(Ze, 'passive', {
        get: function () {
          St = !0;
        },
      }),
        window.addEventListener('test', Ze, Ze),
        window.removeEventListener('test', Ze, Ze));
    } catch {
      St = !1;
    }
  function Lt(e, t, n, r, l, i, a, f, p) {
    var x = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, x);
    } catch (_) {
      this.onError(_);
    }
  }
  var Ot = !1,
    Kt = null,
    gt = !1,
    tn = null,
    zr = {
      onError: function (e) {
        ((Ot = !0), (Kt = e));
      },
    };
  function kf(e, t, n, r, l, i, a, f, p) {
    ((Ot = !1), (Kt = null), Lt.apply(zr, arguments));
  }
  function Sf(e, t, n, r, l, i, a, f, p) {
    if ((kf.apply(this, arguments), Ot)) {
      if (Ot) {
        var x = Kt;
        ((Ot = !1), (Kt = null));
      } else throw Error(s(198));
      gt || ((gt = !0), (tn = x));
    }
  }
  function An(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Qu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function Ku(e) {
    if (An(e) !== e) throw Error(s(188));
  }
  function xf(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = An(e)), t === null)) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var i = l.alternate;
      if (i === null) {
        if (((r = l.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === i.child) {
        for (i = l.child; i; ) {
          if (i === n) return (Ku(l), e);
          if (i === r) return (Ku(l), t);
          i = i.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== r.return) ((n = l), (r = i));
      else {
        for (var a = !1, f = l.child; f; ) {
          if (f === n) {
            ((a = !0), (n = l), (r = i));
            break;
          }
          if (f === r) {
            ((a = !0), (r = l), (n = i));
            break;
          }
          f = f.sibling;
        }
        if (!a) {
          for (f = i.child; f; ) {
            if (f === n) {
              ((a = !0), (n = i), (r = l));
              break;
            }
            if (f === r) {
              ((a = !0), (r = i), (n = l));
              break;
            }
            f = f.sibling;
          }
          if (!a) throw Error(s(189));
        }
      }
      if (n.alternate !== r) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function Xu(e) {
    return ((e = xf(e)), e !== null ? Yu(e) : null);
  }
  function Yu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Yu(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Gu = u.unstable_scheduleCallback,
    Zu = u.unstable_cancelCallback,
    Cf = u.unstable_shouldYield,
    Ef = u.unstable_requestPaint,
    Le = u.unstable_now,
    Rf = u.unstable_getCurrentPriorityLevel,
    Go = u.unstable_ImmediatePriority,
    qu = u.unstable_UserBlockingPriority,
    Ml = u.unstable_NormalPriority,
    Df = u.unstable_LowPriority,
    Ju = u.unstable_IdlePriority,
    _l = null,
    Xt = null;
  function Nf(e) {
    if (Xt && typeof Xt.onCommitFiberRoot == 'function')
      try {
        Xt.onCommitFiberRoot(_l, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var It = Math.clz32 ? Math.clz32 : Tf,
    Mf = Math.log,
    _f = Math.LN2;
  function Tf(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Mf(e) / _f) | 0)) | 0);
  }
  var Tl = 64,
    Pl = 4194304;
  function Lr(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function zl(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
      l = e.suspendedLanes,
      i = e.pingedLanes,
      a = n & 268435455;
    if (a !== 0) {
      var f = a & ~l;
      f !== 0 ? (r = Lr(f)) : ((i &= a), i !== 0 && (r = Lr(i)));
    } else ((a = n & ~l), a !== 0 ? (r = Lr(a)) : i !== 0 && (r = Lr(i)));
    if (r === 0) return 0;
    if (
      t !== 0 &&
      t !== r &&
      (t & l) === 0 &&
      ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
    )
      return t;
    if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= r; 0 < t; )
        ((n = 31 - It(t)), (l = 1 << n), (r |= e[n]), (t &= ~l));
    return r;
  }
  function Pf(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function zf(e, t) {
    for (
      var n = e.suspendedLanes,
        r = e.pingedLanes,
        l = e.expirationTimes,
        i = e.pendingLanes;
      0 < i;
    ) {
      var a = 31 - It(i),
        f = 1 << a,
        p = l[a];
      (p === -1
        ? ((f & n) === 0 || (f & r) !== 0) && (l[a] = Pf(f, t))
        : p <= t && (e.expiredLanes |= f),
        (i &= ~f));
    }
  }
  function Zo(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function bu() {
    var e = Tl;
    return ((Tl <<= 1), (Tl & 4194240) === 0 && (Tl = 64), e);
  }
  function qo(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Or(e, t, n) {
    ((e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - It(t)),
      (e[t] = n));
  }
  function Lf(e, t) {
    var n = e.pendingLanes & ~t;
    ((e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements));
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - It(n),
        i = 1 << l;
      ((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i));
    }
  }
  function Jo(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - It(n),
        l = 1 << r;
      ((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l));
    }
  }
  var we = 0;
  function es(e) {
    return (
      (e &= -e),
      1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var ts,
    bo,
    ns,
    rs,
    ls,
    ei = !1,
    Ll = [],
    vn = null,
    gn = null,
    yn = null,
    Ir = new Map(),
    Ar = new Map(),
    mn = [],
    Of =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
        ' ',
      );
  function os(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        vn = null;
        break;
      case 'dragenter':
      case 'dragleave':
        gn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        yn = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Ir.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Ar.delete(t.pointerId);
    }
  }
  function jr(e, t, n, r, l, i) {
    return e === null || e.nativeEvent !== i
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: i,
          targetContainers: [l],
        }),
        t !== null && ((t = qr(t)), t !== null && bo(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e);
  }
  function If(e, t, n, r, l) {
    switch (t) {
      case 'focusin':
        return ((vn = jr(vn, e, t, n, r, l)), !0);
      case 'dragenter':
        return ((gn = jr(gn, e, t, n, r, l)), !0);
      case 'mouseover':
        return ((yn = jr(yn, e, t, n, r, l)), !0);
      case 'pointerover':
        var i = l.pointerId;
        return (Ir.set(i, jr(Ir.get(i) || null, e, t, n, r, l)), !0);
      case 'gotpointercapture':
        return (
          (i = l.pointerId),
          Ar.set(i, jr(Ar.get(i) || null, e, t, n, r, l)),
          !0
        );
    }
    return !1;
  }
  function is(e) {
    var t = jn(e.target);
    if (t !== null) {
      var n = An(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = Qu(n)), t !== null)) {
            ((e.blockedOn = t),
              ls(e.priority, function () {
                ns(n);
              }));
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ol(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = ni(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        ((Jn = r), n.target.dispatchEvent(r), (Jn = null));
      } else return ((t = qr(n)), t !== null && bo(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function us(e, t, n) {
    Ol(e) && n.delete(t);
  }
  function Af() {
    ((ei = !1),
      vn !== null && Ol(vn) && (vn = null),
      gn !== null && Ol(gn) && (gn = null),
      yn !== null && Ol(yn) && (yn = null),
      Ir.forEach(us),
      Ar.forEach(us));
  }
  function Fr(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      ei ||
        ((ei = !0),
        u.unstable_scheduleCallback(u.unstable_NormalPriority, Af)));
  }
  function Ur(e) {
    function t(l) {
      return Fr(l, e);
    }
    if (0 < Ll.length) {
      Fr(Ll[0], e);
      for (var n = 1; n < Ll.length; n++) {
        var r = Ll[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      vn !== null && Fr(vn, e),
        gn !== null && Fr(gn, e),
        yn !== null && Fr(yn, e),
        Ir.forEach(t),
        Ar.forEach(t),
        n = 0;
      n < mn.length;
      n++
    )
      ((r = mn[n]), r.blockedOn === e && (r.blockedOn = null));
    for (; 0 < mn.length && ((n = mn[0]), n.blockedOn === null); )
      (is(n), n.blockedOn === null && mn.shift());
  }
  var bn = Y.ReactCurrentBatchConfig,
    Il = !0;
  function jf(e, t, n, r) {
    var l = we,
      i = bn.transition;
    bn.transition = null;
    try {
      ((we = 1), ti(e, t, n, r));
    } finally {
      ((we = l), (bn.transition = i));
    }
  }
  function Ff(e, t, n, r) {
    var l = we,
      i = bn.transition;
    bn.transition = null;
    try {
      ((we = 4), ti(e, t, n, r));
    } finally {
      ((we = l), (bn.transition = i));
    }
  }
  function ti(e, t, n, r) {
    if (Il) {
      var l = ni(e, t, n, r);
      if (l === null) (wi(e, t, r, Al, n), os(e, r));
      else if (If(l, e, t, n, r)) r.stopPropagation();
      else if ((os(e, r), t & 4 && -1 < Of.indexOf(e))) {
        for (; l !== null; ) {
          var i = qr(l);
          if (
            (i !== null && ts(i),
            (i = ni(e, t, n, r)),
            i === null && wi(e, t, r, Al, n),
            i === l)
          )
            break;
          l = i;
        }
        l !== null && r.stopPropagation();
      } else wi(e, t, r, null, n);
    }
  }
  var Al = null;
  function ni(e, t, n, r) {
    if (((Al = null), (e = Tr(r)), (e = jn(e)), e !== null))
      if (((t = An(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = Qu(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return ((Al = e), null);
  }
  function ss(e) {
    switch (e) {
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 1;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'toggle':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 4;
      case 'message':
        switch (Rf()) {
          case Go:
            return 1;
          case qu:
            return 4;
          case Ml:
          case Df:
            return 16;
          case Ju:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var wn = null,
    ri = null,
    jl = null;
  function as() {
    if (jl) return jl;
    var e,
      t = ri,
      n = t.length,
      r,
      l = 'value' in wn ? wn.value : wn.textContent,
      i = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var a = n - e;
    for (r = 1; r <= a && t[n - r] === l[i - r]; r++);
    return (jl = l.slice(e, 1 < r ? 1 - r : void 0));
  }
  function Fl(e) {
    var t = e.keyCode;
    return (
      'charCode' in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Ul() {
    return !0;
  }
  function cs() {
    return !1;
  }
  function yt(e) {
    function t(n, r, l, i, a) {
      ((this._reactName = n),
        (this._targetInst = l),
        (this.type = r),
        (this.nativeEvent = i),
        (this.target = a),
        (this.currentTarget = null));
      for (var f in e)
        e.hasOwnProperty(f) && ((n = e[f]), (this[f] = n ? n(i) : i[f]));
      return (
        (this.isDefaultPrevented = (
          i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
        )
          ? Ul
          : cs),
        (this.isPropagationStopped = cs),
        this
      );
    }
    return (
      j(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
            (this.isDefaultPrevented = Ul));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
            (this.isPropagationStopped = Ul));
        },
        persist: function () {},
        isPersistent: Ul,
      }),
      t
    );
  }
  var er = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    li = yt(er),
    Br = j({}, er, { view: 0, detail: 0 }),
    Uf = yt(Br),
    oi,
    ii,
    Vr,
    Bl = j({}, Br, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: si,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== Vr &&
              (Vr && e.type === 'mousemove'
                ? ((oi = e.screenX - Vr.screenX), (ii = e.screenY - Vr.screenY))
                : (ii = oi = 0),
              (Vr = e)),
            oi);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : ii;
      },
    }),
    fs = yt(Bl),
    Bf = j({}, Bl, { dataTransfer: 0 }),
    Vf = yt(Bf),
    Hf = j({}, Br, { relatedTarget: 0 }),
    ui = yt(Hf),
    Wf = j({}, er, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    $f = yt(Wf),
    Qf = j({}, er, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Kf = yt(Qf),
    Xf = j({}, er, { data: 0 }),
    ds = yt(Xf),
    Yf = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    Gf = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    Zf = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey',
    };
  function qf(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Zf[e])
        ? !!t[e]
        : !1;
  }
  function si() {
    return qf;
  }
  var Jf = j({}, Br, {
      key: function (e) {
        if (e.key) {
          var t = Yf[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Fl(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Gf[e.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: si,
      charCode: function (e) {
        return e.type === 'keypress' ? Fl(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Fl(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    bf = yt(Jf),
    ed = j({}, Bl, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    ps = yt(ed),
    td = j({}, Br, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: si,
    }),
    nd = yt(td),
    rd = j({}, er, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ld = yt(rd),
    od = j({}, Bl, {
      deltaX: function (e) {
        return 'deltaX' in e
          ? e.deltaX
          : 'wheelDeltaX' in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
            ? -e.wheelDeltaY
            : 'wheelDelta' in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    id = yt(od),
    ud = [9, 13, 27, 32],
    ai = m && 'CompositionEvent' in window,
    Hr = null;
  m && 'documentMode' in document && (Hr = document.documentMode);
  var sd = m && 'TextEvent' in window && !Hr,
    hs = m && (!ai || (Hr && 8 < Hr && 11 >= Hr)),
    vs = ' ',
    gs = !1;
  function ys(e, t) {
    switch (e) {
      case 'keyup':
        return ud.indexOf(t.keyCode) !== -1;
      case 'keydown':
        return t.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function ms(e) {
    return (
      (e = e.detail),
      typeof e == 'object' && 'data' in e ? e.data : null
    );
  }
  var tr = !1;
  function ad(e, t) {
    switch (e) {
      case 'compositionend':
        return ms(t);
      case 'keypress':
        return t.which !== 32 ? null : ((gs = !0), vs);
      case 'textInput':
        return ((e = t.data), e === vs && gs ? null : e);
      default:
        return null;
    }
  }
  function cd(e, t) {
    if (tr)
      return e === 'compositionend' || (!ai && ys(e, t))
        ? ((e = as()), (jl = ri = wn = null), (tr = !1), e)
        : null;
    switch (e) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case 'compositionend':
        return hs && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var fd = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function ws(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!fd[e.type] : t === 'textarea';
  }
  function ks(e, t, n, r) {
    (Ye(r),
      (t = Ql(t, 'onChange')),
      0 < t.length &&
        ((n = new li('onChange', 'change', null, n, r)),
        e.push({ event: n, listeners: t })));
  }
  var Wr = null,
    $r = null;
  function dd(e) {
    Fs(e, 0);
  }
  function Vl(e) {
    var t = ir(e);
    if (ht(t)) return e;
  }
  function pd(e, t) {
    if (e === 'change') return t;
  }
  var Ss = !1;
  if (m) {
    var ci;
    if (m) {
      var fi = 'oninput' in document;
      if (!fi) {
        var xs = document.createElement('div');
        (xs.setAttribute('oninput', 'return;'),
          (fi = typeof xs.oninput == 'function'));
      }
      ci = fi;
    } else ci = !1;
    Ss = ci && (!document.documentMode || 9 < document.documentMode);
  }
  function Cs() {
    Wr && (Wr.detachEvent('onpropertychange', Es), ($r = Wr = null));
  }
  function Es(e) {
    if (e.propertyName === 'value' && Vl($r)) {
      var t = [];
      (ks(t, $r, e, Tr(e)), en(dd, t));
    }
  }
  function hd(e, t, n) {
    e === 'focusin'
      ? (Cs(), (Wr = t), ($r = n), Wr.attachEvent('onpropertychange', Es))
      : e === 'focusout' && Cs();
  }
  function vd(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
      return Vl($r);
  }
  function gd(e, t) {
    if (e === 'click') return Vl(t);
  }
  function yd(e, t) {
    if (e === 'input' || e === 'change') return Vl(t);
  }
  function md(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var At = typeof Object.is == 'function' ? Object.is : md;
  function Qr(e, t) {
    if (At(e, t)) return !0;
    if (
      typeof e != 'object' ||
      e === null ||
      typeof t != 'object' ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!S.call(t, l) || !At(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Rs(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ds(e, t) {
    var n = Rs(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (((r = e + n.textContent.length), e <= t && r >= t))
          return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Rs(n);
    }
  }
  function Ns(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Ns(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Ms() {
    for (var e = window, t = _t(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == 'string';
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = _t(e.document);
    }
    return t;
  }
  function di(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        t === 'textarea' ||
        e.contentEditable === 'true')
    );
  }
  function wd(e) {
    var t = Ms(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (
      t !== n &&
      n &&
      n.ownerDocument &&
      Ns(n.ownerDocument.documentElement, n)
    ) {
      if (r !== null && di(n)) {
        if (
          ((t = r.start),
          (e = r.end),
          e === void 0 && (e = t),
          'selectionStart' in n)
        )
          ((n.selectionStart = t),
            (n.selectionEnd = Math.min(e, n.value.length)));
        else if (
          ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          var l = n.textContent.length,
            i = Math.min(r.start, l);
          ((r = r.end === void 0 ? i : Math.min(r.end, l)),
            !e.extend && i > r && ((l = r), (r = i), (i = l)),
            (l = Ds(n, i)));
          var a = Ds(n, r);
          l &&
            a &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== l.node ||
              e.anchorOffset !== l.offset ||
              e.focusNode !== a.node ||
              e.focusOffset !== a.offset) &&
            ((t = t.createRange()),
            t.setStart(l.node, l.offset),
            e.removeAllRanges(),
            i > r
              ? (e.addRange(t), e.extend(a.node, a.offset))
              : (t.setEnd(a.node, a.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; (e = e.parentNode); )
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
        ((e = t[n]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top));
    }
  }
  var kd = m && 'documentMode' in document && 11 >= document.documentMode,
    nr = null,
    pi = null,
    Kr = null,
    hi = !1;
  function _s(e, t, n) {
    var r =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    hi ||
      nr == null ||
      nr !== _t(r) ||
      ((r = nr),
      'selectionStart' in r && di(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (Kr && Qr(Kr, r)) ||
        ((Kr = r),
        (r = Ql(pi, 'onSelect')),
        0 < r.length &&
          ((t = new li('onSelect', 'select', null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = nr))));
  }
  function Hl(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n['Webkit' + e] = 'webkit' + t),
      (n['Moz' + e] = 'moz' + t),
      n
    );
  }
  var rr = {
      animationend: Hl('Animation', 'AnimationEnd'),
      animationiteration: Hl('Animation', 'AnimationIteration'),
      animationstart: Hl('Animation', 'AnimationStart'),
      transitionend: Hl('Transition', 'TransitionEnd'),
    },
    vi = {},
    Ts = {};
  m &&
    ((Ts = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete rr.animationend.animation,
      delete rr.animationiteration.animation,
      delete rr.animationstart.animation),
    'TransitionEvent' in window || delete rr.transitionend.transition);
  function Wl(e) {
    if (vi[e]) return vi[e];
    if (!rr[e]) return e;
    var t = rr[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Ts) return (vi[e] = t[n]);
    return e;
  }
  var Ps = Wl('animationend'),
    zs = Wl('animationiteration'),
    Ls = Wl('animationstart'),
    Os = Wl('transitionend'),
    Is = new Map(),
    As =
      'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' ',
      );
  function kn(e, t) {
    (Is.set(e, t), h(t, [e]));
  }
  for (var gi = 0; gi < As.length; gi++) {
    var yi = As[gi],
      Sd = yi.toLowerCase(),
      xd = yi[0].toUpperCase() + yi.slice(1);
    kn(Sd, 'on' + xd);
  }
  (kn(Ps, 'onAnimationEnd'),
    kn(zs, 'onAnimationIteration'),
    kn(Ls, 'onAnimationStart'),
    kn('dblclick', 'onDoubleClick'),
    kn('focusin', 'onFocus'),
    kn('focusout', 'onBlur'),
    kn(Os, 'onTransitionEnd'),
    y('onMouseEnter', ['mouseout', 'mouseover']),
    y('onMouseLeave', ['mouseout', 'mouseover']),
    y('onPointerEnter', ['pointerout', 'pointerover']),
    y('onPointerLeave', ['pointerout', 'pointerover']),
    h(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' ',
      ),
    ),
    h(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' ',
      ),
    ),
    h('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    h(
      'onCompositionEnd',
      'compositionend focusout keydown keypress keyup mousedown'.split(' '),
    ),
    h(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
    ),
    h(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
    ));
  var Xr =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' ',
      ),
    Cd = new Set(
      'cancel close invalid load scroll toggle'.split(' ').concat(Xr),
    );
  function js(e, t, n) {
    var r = e.type || 'unknown-event';
    ((e.currentTarget = n), Sf(r, t, void 0, e), (e.currentTarget = null));
  }
  function Fs(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        l = r.event;
      r = r.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var a = r.length - 1; 0 <= a; a--) {
            var f = r[a],
              p = f.instance,
              x = f.currentTarget;
            if (((f = f.listener), p !== i && l.isPropagationStopped()))
              break e;
            (js(l, f, x), (i = p));
          }
        else
          for (a = 0; a < r.length; a++) {
            if (
              ((f = r[a]),
              (p = f.instance),
              (x = f.currentTarget),
              (f = f.listener),
              p !== i && l.isPropagationStopped())
            )
              break e;
            (js(l, f, x), (i = p));
          }
      }
    }
    if (gt) throw ((e = tn), (gt = !1), (tn = null), e);
  }
  function xe(e, t) {
    var n = t[Ri];
    n === void 0 && (n = t[Ri] = new Set());
    var r = e + '__bubble';
    n.has(r) || (Us(t, e, 2, !1), n.add(r));
  }
  function mi(e, t, n) {
    var r = 0;
    (t && (r |= 4), Us(n, e, r, t));
  }
  var $l = '_reactListening' + Math.random().toString(36).slice(2);
  function Yr(e) {
    if (!e[$l]) {
      ((e[$l] = !0),
        c.forEach(function (n) {
          n !== 'selectionchange' && (Cd.has(n) || mi(n, !1, e), mi(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[$l] || ((t[$l] = !0), mi('selectionchange', !1, t));
    }
  }
  function Us(e, t, n, r) {
    switch (ss(t)) {
      case 1:
        var l = jf;
        break;
      case 4:
        l = Ff;
        break;
      default:
        l = ti;
    }
    ((n = l.bind(null, t, n, e)),
      (l = void 0),
      !St ||
        (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
        (l = !0),
      r
        ? l !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: l })
          : e.addEventListener(t, n, !0)
        : l !== void 0
          ? e.addEventListener(t, n, { passive: l })
          : e.addEventListener(t, n, !1));
  }
  function wi(e, t, n, r, l) {
    var i = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (;;) {
        if (r === null) return;
        var a = r.tag;
        if (a === 3 || a === 4) {
          var f = r.stateNode.containerInfo;
          if (f === l || (f.nodeType === 8 && f.parentNode === l)) break;
          if (a === 4)
            for (a = r.return; a !== null; ) {
              var p = a.tag;
              if (
                (p === 3 || p === 4) &&
                ((p = a.stateNode.containerInfo),
                p === l || (p.nodeType === 8 && p.parentNode === l))
              )
                return;
              a = a.return;
            }
          for (; f !== null; ) {
            if (((a = jn(f)), a === null)) return;
            if (((p = a.tag), p === 5 || p === 6)) {
              r = i = a;
              continue e;
            }
            f = f.parentNode;
          }
        }
        r = r.return;
      }
    en(function () {
      var x = i,
        _ = Tr(n),
        T = [];
      e: {
        var M = Is.get(e);
        if (M !== void 0) {
          var F = li,
            B = e;
          switch (e) {
            case 'keypress':
              if (Fl(n) === 0) break e;
            case 'keydown':
            case 'keyup':
              F = bf;
              break;
            case 'focusin':
              ((B = 'focus'), (F = ui));
              break;
            case 'focusout':
              ((B = 'blur'), (F = ui));
              break;
            case 'beforeblur':
            case 'afterblur':
              F = ui;
              break;
            case 'click':
              if (n.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              F = fs;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              F = Vf;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              F = nd;
              break;
            case Ps:
            case zs:
            case Ls:
              F = $f;
              break;
            case Os:
              F = ld;
              break;
            case 'scroll':
              F = Uf;
              break;
            case 'wheel':
              F = id;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              F = Kf;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              F = ps;
          }
          var V = (t & 4) !== 0,
            Oe = !V && e === 'scroll',
            w = V ? (M !== null ? M + 'Capture' : null) : M;
          V = [];
          for (var v = x, k; v !== null; ) {
            k = v;
            var z = k.stateNode;
            if (
              (k.tag === 5 &&
                z !== null &&
                ((k = z),
                w !== null &&
                  ((z = De(v, w)), z != null && V.push(Gr(v, z, k)))),
              Oe)
            )
              break;
            v = v.return;
          }
          0 < V.length &&
            ((M = new F(M, B, null, n, _)), T.push({ event: M, listeners: V }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((M = e === 'mouseover' || e === 'pointerover'),
            (F = e === 'mouseout' || e === 'pointerout'),
            M &&
              n !== Jn &&
              (B = n.relatedTarget || n.fromElement) &&
              (jn(B) || B[nn]))
          )
            break e;
          if (
            (F || M) &&
            ((M =
              _.window === _
                ? _
                : (M = _.ownerDocument)
                  ? M.defaultView || M.parentWindow
                  : window),
            F
              ? ((B = n.relatedTarget || n.toElement),
                (F = x),
                (B = B ? jn(B) : null),
                B !== null &&
                  ((Oe = An(B)), B !== Oe || (B.tag !== 5 && B.tag !== 6)) &&
                  (B = null))
              : ((F = null), (B = x)),
            F !== B)
          ) {
            if (
              ((V = fs),
              (z = 'onMouseLeave'),
              (w = 'onMouseEnter'),
              (v = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((V = ps),
                (z = 'onPointerLeave'),
                (w = 'onPointerEnter'),
                (v = 'pointer')),
              (Oe = F == null ? M : ir(F)),
              (k = B == null ? M : ir(B)),
              (M = new V(z, v + 'leave', F, n, _)),
              (M.target = Oe),
              (M.relatedTarget = k),
              (z = null),
              jn(_) === x &&
                ((V = new V(w, v + 'enter', B, n, _)),
                (V.target = k),
                (V.relatedTarget = Oe),
                (z = V)),
              (Oe = z),
              F && B)
            )
              t: {
                for (V = F, w = B, v = 0, k = V; k; k = lr(k)) v++;
                for (k = 0, z = w; z; z = lr(z)) k++;
                for (; 0 < v - k; ) ((V = lr(V)), v--);
                for (; 0 < k - v; ) ((w = lr(w)), k--);
                for (; v--; ) {
                  if (V === w || (w !== null && V === w.alternate)) break t;
                  ((V = lr(V)), (w = lr(w)));
                }
                V = null;
              }
            else V = null;
            (F !== null && Bs(T, M, F, V, !1),
              B !== null && Oe !== null && Bs(T, Oe, B, V, !0));
          }
        }
        e: {
          if (
            ((M = x ? ir(x) : window),
            (F = M.nodeName && M.nodeName.toLowerCase()),
            F === 'select' || (F === 'input' && M.type === 'file'))
          )
            var H = pd;
          else if (ws(M))
            if (Ss) H = yd;
            else {
              H = vd;
              var K = hd;
            }
          else
            (F = M.nodeName) &&
              F.toLowerCase() === 'input' &&
              (M.type === 'checkbox' || M.type === 'radio') &&
              (H = gd);
          if (H && (H = H(e, x))) {
            ks(T, H, n, _);
            break e;
          }
          (K && K(e, M, x),
            e === 'focusout' &&
              (K = M._wrapperState) &&
              K.controlled &&
              M.type === 'number' &&
              In(M, 'number', M.value));
        }
        switch (((K = x ? ir(x) : window), e)) {
          case 'focusin':
            (ws(K) || K.contentEditable === 'true') &&
              ((nr = K), (pi = x), (Kr = null));
            break;
          case 'focusout':
            Kr = pi = nr = null;
            break;
          case 'mousedown':
            hi = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((hi = !1), _s(T, n, _));
            break;
          case 'selectionchange':
            if (kd) break;
          case 'keydown':
          case 'keyup':
            _s(T, n, _);
        }
        var X;
        if (ai)
          e: {
            switch (e) {
              case 'compositionstart':
                var ne = 'onCompositionStart';
                break e;
              case 'compositionend':
                ne = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                ne = 'onCompositionUpdate';
                break e;
            }
            ne = void 0;
          }
        else
          tr
            ? ys(e, n) && (ne = 'onCompositionEnd')
            : e === 'keydown' &&
              n.keyCode === 229 &&
              (ne = 'onCompositionStart');
        (ne &&
          (hs &&
            n.locale !== 'ko' &&
            (tr || ne !== 'onCompositionStart'
              ? ne === 'onCompositionEnd' && tr && (X = as())
              : ((wn = _),
                (ri = 'value' in wn ? wn.value : wn.textContent),
                (tr = !0))),
          (K = Ql(x, ne)),
          0 < K.length &&
            ((ne = new ds(ne, e, null, n, _)),
            T.push({ event: ne, listeners: K }),
            X ? (ne.data = X) : ((X = ms(n)), X !== null && (ne.data = X)))),
          (X = sd ? ad(e, n) : cd(e, n)) &&
            ((x = Ql(x, 'onBeforeInput')),
            0 < x.length &&
              ((_ = new ds('onBeforeInput', 'beforeinput', null, n, _)),
              T.push({ event: _, listeners: x }),
              (_.data = X))));
      }
      Fs(T, t);
    });
  }
  function Gr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Ql(e, t) {
    for (var n = t + 'Capture', r = []; e !== null; ) {
      var l = e,
        i = l.stateNode;
      (l.tag === 5 &&
        i !== null &&
        ((l = i),
        (i = De(e, n)),
        i != null && r.unshift(Gr(e, i, l)),
        (i = De(e, t)),
        i != null && r.push(Gr(e, i, l))),
        (e = e.return));
    }
    return r;
  }
  function lr(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Bs(e, t, n, r, l) {
    for (var i = t._reactName, a = []; n !== null && n !== r; ) {
      var f = n,
        p = f.alternate,
        x = f.stateNode;
      if (p !== null && p === r) break;
      (f.tag === 5 &&
        x !== null &&
        ((f = x),
        l
          ? ((p = De(n, i)), p != null && a.unshift(Gr(n, p, f)))
          : l || ((p = De(n, i)), p != null && a.push(Gr(n, p, f)))),
        (n = n.return));
    }
    a.length !== 0 && e.push({ event: t, listeners: a });
  }
  var Ed = /\r\n?/g,
    Rd = /\u0000|\uFFFD/g;
  function Vs(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Ed,
        `
`,
      )
      .replace(Rd, '');
  }
  function Kl(e, t, n) {
    if (((t = Vs(t)), Vs(e) !== t && n)) throw Error(s(425));
  }
  function Xl() {}
  var ki = null,
    Si = null;
  function xi(e, t) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof t.children == 'string' ||
      typeof t.children == 'number' ||
      (typeof t.dangerouslySetInnerHTML == 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Ci = typeof setTimeout == 'function' ? setTimeout : void 0,
    Dd = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Hs = typeof Promise == 'function' ? Promise : void 0,
    Nd =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Hs < 'u'
          ? function (e) {
              return Hs.resolve(null).then(e).catch(Md);
            }
          : Ci;
  function Md(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Ei(e, t) {
    var n = t,
      r = 0;
    do {
      var l = n.nextSibling;
      if ((e.removeChild(n), l && l.nodeType === 8))
        if (((n = l.data), n === '/$')) {
          if (r === 0) {
            (e.removeChild(l), Ur(t));
            return;
          }
          r--;
        } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
      n = l;
    } while (n);
    Ur(t);
  }
  function Sn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
        if (t === '/$') return null;
      }
    }
    return e;
  }
  function Ws(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === '$' || n === '$!' || n === '$?') {
          if (t === 0) return e;
          t--;
        } else n === '/$' && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var or = Math.random().toString(36).slice(2),
    Yt = '__reactFiber$' + or,
    Zr = '__reactProps$' + or,
    nn = '__reactContainer$' + or,
    Ri = '__reactEvents$' + or,
    _d = '__reactListeners$' + or,
    Td = '__reactHandles$' + or;
  function jn(e) {
    var t = e[Yt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[nn] || n[Yt])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = Ws(e); e !== null; ) {
            if ((n = e[Yt])) return n;
            e = Ws(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function qr(e) {
    return (
      (e = e[Yt] || e[nn]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function ir(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Yl(e) {
    return e[Zr] || null;
  }
  var Di = [],
    ur = -1;
  function xn(e) {
    return { current: e };
  }
  function Ce(e) {
    0 > ur || ((e.current = Di[ur]), (Di[ur] = null), ur--);
  }
  function ke(e, t) {
    (ur++, (Di[ur] = e.current), (e.current = t));
  }
  var Cn = {},
    qe = xn(Cn),
    st = xn(!1),
    Fn = Cn;
  function sr(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Cn;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var l = {},
      i;
    for (i in n) l[i] = t[i];
    return (
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = l)),
      l
    );
  }
  function at(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function Gl() {
    (Ce(st), Ce(qe));
  }
  function $s(e, t, n) {
    if (qe.current !== Cn) throw Error(s(168));
    (ke(qe, t), ke(st, n));
  }
  function Qs(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
      return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(s(108, ye(e) || 'Unknown', l));
    return j({}, n, r);
  }
  function Zl(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        Cn),
      (Fn = qe.current),
      ke(qe, e),
      ke(st, st.current),
      !0
    );
  }
  function Ks(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(s(169));
    (n
      ? ((e = Qs(e, t, Fn)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        Ce(st),
        Ce(qe),
        ke(qe, e))
      : Ce(st),
      ke(st, n));
  }
  var rn = null,
    ql = !1,
    Ni = !1;
  function Xs(e) {
    rn === null ? (rn = [e]) : rn.push(e);
  }
  function Pd(e) {
    ((ql = !0), Xs(e));
  }
  function En() {
    if (!Ni && rn !== null) {
      Ni = !0;
      var e = 0,
        t = we;
      try {
        var n = rn;
        for (we = 1; e < n.length; e++) {
          var r = n[e];
          do r = r(!0);
          while (r !== null);
        }
        ((rn = null), (ql = !1));
      } catch (l) {
        throw (rn !== null && (rn = rn.slice(e + 1)), Gu(Go, En), l);
      } finally {
        ((we = t), (Ni = !1));
      }
    }
    return null;
  }
  var ar = [],
    cr = 0,
    Jl = null,
    bl = 0,
    xt = [],
    Ct = 0,
    Un = null,
    ln = 1,
    on = '';
  function Bn(e, t) {
    ((ar[cr++] = bl), (ar[cr++] = Jl), (Jl = e), (bl = t));
  }
  function Ys(e, t, n) {
    ((xt[Ct++] = ln), (xt[Ct++] = on), (xt[Ct++] = Un), (Un = e));
    var r = ln;
    e = on;
    var l = 32 - It(r) - 1;
    ((r &= ~(1 << l)), (n += 1));
    var i = 32 - It(t) + l;
    if (30 < i) {
      var a = l - (l % 5);
      ((i = (r & ((1 << a) - 1)).toString(32)),
        (r >>= a),
        (l -= a),
        (ln = (1 << (32 - It(t) + l)) | (n << l) | r),
        (on = i + e));
    } else ((ln = (1 << i) | (n << l) | r), (on = e));
  }
  function Mi(e) {
    e.return !== null && (Bn(e, 1), Ys(e, 1, 0));
  }
  function _i(e) {
    for (; e === Jl; )
      ((Jl = ar[--cr]), (ar[cr] = null), (bl = ar[--cr]), (ar[cr] = null));
    for (; e === Un; )
      ((Un = xt[--Ct]),
        (xt[Ct] = null),
        (on = xt[--Ct]),
        (xt[Ct] = null),
        (ln = xt[--Ct]),
        (xt[Ct] = null));
  }
  var mt = null,
    wt = null,
    Ee = !1,
    jt = null;
  function Gs(e, t) {
    var n = Nt(5, null, null, 0);
    ((n.elementType = 'DELETED'),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
  }
  function Zs(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t =
            t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (mt = e), (wt = Sn(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (mt = e), (wt = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = Un !== null ? { id: ln, overflow: on } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = Nt(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (mt = e),
              (wt = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Ti(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Pi(e) {
    if (Ee) {
      var t = wt;
      if (t) {
        var n = t;
        if (!Zs(e, t)) {
          if (Ti(e)) throw Error(s(418));
          t = Sn(n.nextSibling);
          var r = mt;
          t && Zs(e, t)
            ? Gs(r, n)
            : ((e.flags = (e.flags & -4097) | 2), (Ee = !1), (mt = e));
        }
      } else {
        if (Ti(e)) throw Error(s(418));
        ((e.flags = (e.flags & -4097) | 2), (Ee = !1), (mt = e));
      }
    }
  }
  function qs(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;
    )
      e = e.return;
    mt = e;
  }
  function eo(e) {
    if (e !== mt) return !1;
    if (!Ee) return (qs(e), (Ee = !0), !1);
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== 'head' && t !== 'body' && !xi(e.type, e.memoizedProps))),
      t && (t = wt))
    ) {
      if (Ti(e)) throw (Js(), Error(s(418)));
      for (; t; ) (Gs(e, t), (t = Sn(t.nextSibling)));
    }
    if ((qs(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === '/$') {
              if (t === 0) {
                wt = Sn(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
          }
          e = e.nextSibling;
        }
        wt = null;
      }
    } else wt = mt ? Sn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Js() {
    for (var e = wt; e; ) e = Sn(e.nextSibling);
  }
  function fr() {
    ((wt = mt = null), (Ee = !1));
  }
  function zi(e) {
    jt === null ? (jt = [e]) : jt.push(e);
  }
  var zd = Y.ReactCurrentBatchConfig;
  function Jr(e, t, n) {
    if (
      ((e = n.ref),
      e !== null && typeof e != 'function' && typeof e != 'object')
    ) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(s(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(s(147, e));
        var l = r,
          i = '' + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == 'function' &&
          t.ref._stringRef === i
          ? t.ref
          : ((t = function (a) {
              var f = l.refs;
              a === null ? delete f[i] : (f[i] = a);
            }),
            (t._stringRef = i),
            t);
      }
      if (typeof e != 'string') throw Error(s(284));
      if (!n._owner) throw Error(s(290, e));
    }
    return e;
  }
  function to(e, t) {
    throw (
      (e = Object.prototype.toString.call(t)),
      Error(
        s(
          31,
          e === '[object Object]'
            ? 'object with keys {' + Object.keys(t).join(', ') + '}'
            : e,
        ),
      )
    );
  }
  function bs(e) {
    var t = e._init;
    return t(e._payload);
  }
  function ea(e) {
    function t(w, v) {
      if (e) {
        var k = w.deletions;
        k === null ? ((w.deletions = [v]), (w.flags |= 16)) : k.push(v);
      }
    }
    function n(w, v) {
      if (!e) return null;
      for (; v !== null; ) (t(w, v), (v = v.sibling));
      return null;
    }
    function r(w, v) {
      for (w = new Map(); v !== null; )
        (v.key !== null ? w.set(v.key, v) : w.set(v.index, v), (v = v.sibling));
      return w;
    }
    function l(w, v) {
      return ((w = zn(w, v)), (w.index = 0), (w.sibling = null), w);
    }
    function i(w, v, k) {
      return (
        (w.index = k),
        e
          ? ((k = w.alternate),
            k !== null
              ? ((k = k.index), k < v ? ((w.flags |= 2), v) : k)
              : ((w.flags |= 2), v))
          : ((w.flags |= 1048576), v)
      );
    }
    function a(w) {
      return (e && w.alternate === null && (w.flags |= 2), w);
    }
    function f(w, v, k, z) {
      return v === null || v.tag !== 6
        ? ((v = Cu(k, w.mode, z)), (v.return = w), v)
        : ((v = l(v, k)), (v.return = w), v);
    }
    function p(w, v, k, z) {
      var H = k.type;
      return H === Q
        ? _(w, v, k.props.children, z, k.key)
        : v !== null &&
            (v.elementType === H ||
              (typeof H == 'object' &&
                H !== null &&
                H.$$typeof === Ae &&
                bs(H) === v.type))
          ? ((z = l(v, k.props)), (z.ref = Jr(w, v, k)), (z.return = w), z)
          : ((z = Do(k.type, k.key, k.props, null, w.mode, z)),
            (z.ref = Jr(w, v, k)),
            (z.return = w),
            z);
    }
    function x(w, v, k, z) {
      return v === null ||
        v.tag !== 4 ||
        v.stateNode.containerInfo !== k.containerInfo ||
        v.stateNode.implementation !== k.implementation
        ? ((v = Eu(k, w.mode, z)), (v.return = w), v)
        : ((v = l(v, k.children || [])), (v.return = w), v);
    }
    function _(w, v, k, z, H) {
      return v === null || v.tag !== 7
        ? ((v = Yn(k, w.mode, z, H)), (v.return = w), v)
        : ((v = l(v, k)), (v.return = w), v);
    }
    function T(w, v, k) {
      if ((typeof v == 'string' && v !== '') || typeof v == 'number')
        return ((v = Cu('' + v, w.mode, k)), (v.return = w), v);
      if (typeof v == 'object' && v !== null) {
        switch (v.$$typeof) {
          case oe:
            return (
              (k = Do(v.type, v.key, v.props, null, w.mode, k)),
              (k.ref = Jr(w, null, v)),
              (k.return = w),
              k
            );
          case ee:
            return ((v = Eu(v, w.mode, k)), (v.return = w), v);
          case Ae:
            var z = v._init;
            return T(w, z(v._payload), k);
        }
        if (ot(v) || W(v))
          return ((v = Yn(v, w.mode, k, null)), (v.return = w), v);
        to(w, v);
      }
      return null;
    }
    function M(w, v, k, z) {
      var H = v !== null ? v.key : null;
      if ((typeof k == 'string' && k !== '') || typeof k == 'number')
        return H !== null ? null : f(w, v, '' + k, z);
      if (typeof k == 'object' && k !== null) {
        switch (k.$$typeof) {
          case oe:
            return k.key === H ? p(w, v, k, z) : null;
          case ee:
            return k.key === H ? x(w, v, k, z) : null;
          case Ae:
            return ((H = k._init), M(w, v, H(k._payload), z));
        }
        if (ot(k) || W(k)) return H !== null ? null : _(w, v, k, z, null);
        to(w, k);
      }
      return null;
    }
    function F(w, v, k, z, H) {
      if ((typeof z == 'string' && z !== '') || typeof z == 'number')
        return ((w = w.get(k) || null), f(v, w, '' + z, H));
      if (typeof z == 'object' && z !== null) {
        switch (z.$$typeof) {
          case oe:
            return (
              (w = w.get(z.key === null ? k : z.key) || null),
              p(v, w, z, H)
            );
          case ee:
            return (
              (w = w.get(z.key === null ? k : z.key) || null),
              x(v, w, z, H)
            );
          case Ae:
            var K = z._init;
            return F(w, v, k, K(z._payload), H);
        }
        if (ot(z) || W(z)) return ((w = w.get(k) || null), _(v, w, z, H, null));
        to(v, z);
      }
      return null;
    }
    function B(w, v, k, z) {
      for (
        var H = null, K = null, X = v, ne = (v = 0), He = null;
        X !== null && ne < k.length;
        ne++
      ) {
        X.index > ne ? ((He = X), (X = null)) : (He = X.sibling);
        var ge = M(w, X, k[ne], z);
        if (ge === null) {
          X === null && (X = He);
          break;
        }
        (e && X && ge.alternate === null && t(w, X),
          (v = i(ge, v, ne)),
          K === null ? (H = ge) : (K.sibling = ge),
          (K = ge),
          (X = He));
      }
      if (ne === k.length) return (n(w, X), Ee && Bn(w, ne), H);
      if (X === null) {
        for (; ne < k.length; ne++)
          ((X = T(w, k[ne], z)),
            X !== null &&
              ((v = i(X, v, ne)),
              K === null ? (H = X) : (K.sibling = X),
              (K = X)));
        return (Ee && Bn(w, ne), H);
      }
      for (X = r(w, X); ne < k.length; ne++)
        ((He = F(X, w, ne, k[ne], z)),
          He !== null &&
            (e &&
              He.alternate !== null &&
              X.delete(He.key === null ? ne : He.key),
            (v = i(He, v, ne)),
            K === null ? (H = He) : (K.sibling = He),
            (K = He)));
      return (
        e &&
          X.forEach(function (Ln) {
            return t(w, Ln);
          }),
        Ee && Bn(w, ne),
        H
      );
    }
    function V(w, v, k, z) {
      var H = W(k);
      if (typeof H != 'function') throw Error(s(150));
      if (((k = H.call(k)), k == null)) throw Error(s(151));
      for (
        var K = (H = null), X = v, ne = (v = 0), He = null, ge = k.next();
        X !== null && !ge.done;
        ne++, ge = k.next()
      ) {
        X.index > ne ? ((He = X), (X = null)) : (He = X.sibling);
        var Ln = M(w, X, ge.value, z);
        if (Ln === null) {
          X === null && (X = He);
          break;
        }
        (e && X && Ln.alternate === null && t(w, X),
          (v = i(Ln, v, ne)),
          K === null ? (H = Ln) : (K.sibling = Ln),
          (K = Ln),
          (X = He));
      }
      if (ge.done) return (n(w, X), Ee && Bn(w, ne), H);
      if (X === null) {
        for (; !ge.done; ne++, ge = k.next())
          ((ge = T(w, ge.value, z)),
            ge !== null &&
              ((v = i(ge, v, ne)),
              K === null ? (H = ge) : (K.sibling = ge),
              (K = ge)));
        return (Ee && Bn(w, ne), H);
      }
      for (X = r(w, X); !ge.done; ne++, ge = k.next())
        ((ge = F(X, w, ne, ge.value, z)),
          ge !== null &&
            (e &&
              ge.alternate !== null &&
              X.delete(ge.key === null ? ne : ge.key),
            (v = i(ge, v, ne)),
            K === null ? (H = ge) : (K.sibling = ge),
            (K = ge)));
      return (
        e &&
          X.forEach(function (fp) {
            return t(w, fp);
          }),
        Ee && Bn(w, ne),
        H
      );
    }
    function Oe(w, v, k, z) {
      if (
        (typeof k == 'object' &&
          k !== null &&
          k.type === Q &&
          k.key === null &&
          (k = k.props.children),
        typeof k == 'object' && k !== null)
      ) {
        switch (k.$$typeof) {
          case oe:
            e: {
              for (var H = k.key, K = v; K !== null; ) {
                if (K.key === H) {
                  if (((H = k.type), H === Q)) {
                    if (K.tag === 7) {
                      (n(w, K.sibling),
                        (v = l(K, k.props.children)),
                        (v.return = w),
                        (w = v));
                      break e;
                    }
                  } else if (
                    K.elementType === H ||
                    (typeof H == 'object' &&
                      H !== null &&
                      H.$$typeof === Ae &&
                      bs(H) === K.type)
                  ) {
                    (n(w, K.sibling),
                      (v = l(K, k.props)),
                      (v.ref = Jr(w, K, k)),
                      (v.return = w),
                      (w = v));
                    break e;
                  }
                  n(w, K);
                  break;
                } else t(w, K);
                K = K.sibling;
              }
              k.type === Q
                ? ((v = Yn(k.props.children, w.mode, z, k.key)),
                  (v.return = w),
                  (w = v))
                : ((z = Do(k.type, k.key, k.props, null, w.mode, z)),
                  (z.ref = Jr(w, v, k)),
                  (z.return = w),
                  (w = z));
            }
            return a(w);
          case ee:
            e: {
              for (K = k.key; v !== null; ) {
                if (v.key === K)
                  if (
                    v.tag === 4 &&
                    v.stateNode.containerInfo === k.containerInfo &&
                    v.stateNode.implementation === k.implementation
                  ) {
                    (n(w, v.sibling),
                      (v = l(v, k.children || [])),
                      (v.return = w),
                      (w = v));
                    break e;
                  } else {
                    n(w, v);
                    break;
                  }
                else t(w, v);
                v = v.sibling;
              }
              ((v = Eu(k, w.mode, z)), (v.return = w), (w = v));
            }
            return a(w);
          case Ae:
            return ((K = k._init), Oe(w, v, K(k._payload), z));
        }
        if (ot(k)) return B(w, v, k, z);
        if (W(k)) return V(w, v, k, z);
        to(w, k);
      }
      return (typeof k == 'string' && k !== '') || typeof k == 'number'
        ? ((k = '' + k),
          v !== null && v.tag === 6
            ? (n(w, v.sibling), (v = l(v, k)), (v.return = w), (w = v))
            : (n(w, v), (v = Cu(k, w.mode, z)), (v.return = w), (w = v)),
          a(w))
        : n(w, v);
    }
    return Oe;
  }
  var dr = ea(!0),
    ta = ea(!1),
    no = xn(null),
    ro = null,
    pr = null,
    Li = null;
  function Oi() {
    Li = pr = ro = null;
  }
  function Ii(e) {
    var t = no.current;
    (Ce(no), (e._currentValue = t));
  }
  function Ai(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function hr(e, t) {
    ((ro = e),
      (Li = pr = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & t) !== 0 && (ct = !0), (e.firstContext = null)));
  }
  function Et(e) {
    var t = e._currentValue;
    if (Li !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), pr === null)) {
        if (ro === null) throw Error(s(308));
        ((pr = e), (ro.dependencies = { lanes: 0, firstContext: e }));
      } else pr = pr.next = e;
    return t;
  }
  var Vn = null;
  function ji(e) {
    Vn === null ? (Vn = [e]) : Vn.push(e);
  }
  function na(e, t, n, r) {
    var l = t.interleaved;
    return (
      l === null ? ((n.next = n), ji(t)) : ((n.next = l.next), (l.next = n)),
      (t.interleaved = n),
      un(e, r)
    );
  }
  function un(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      ((e.childLanes |= t),
        (n = e.alternate),
        n !== null && (n.childLanes |= t),
        (n = e),
        (e = e.return));
    return n.tag === 3 ? n.stateNode : null;
  }
  var Rn = !1;
  function Fi(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function ra(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        }));
  }
  function sn(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function Dn(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (he & 2) !== 0)) {
      var l = r.pending;
      return (
        l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
        (r.pending = t),
        un(e, n)
      );
    }
    return (
      (l = r.interleaved),
      l === null ? ((t.next = t), ji(r)) : ((t.next = l.next), (l.next = t)),
      (r.interleaved = t),
      un(e, n)
    );
  }
  function lo(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Jo(e, n));
    }
  }
  function la(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var l = null,
        i = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var a = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          };
          (i === null ? (l = i = a) : (i = i.next = a), (n = n.next));
        } while (n !== null);
        i === null ? (l = i = t) : (i = i.next = t);
      } else l = i = t;
      ((n = {
        baseState: r.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: i,
        shared: r.shared,
        effects: r.effects,
      }),
        (e.updateQueue = n));
      return;
    }
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  }
  function oo(e, t, n, r) {
    var l = e.updateQueue;
    Rn = !1;
    var i = l.firstBaseUpdate,
      a = l.lastBaseUpdate,
      f = l.shared.pending;
    if (f !== null) {
      l.shared.pending = null;
      var p = f,
        x = p.next;
      ((p.next = null), a === null ? (i = x) : (a.next = x), (a = p));
      var _ = e.alternate;
      _ !== null &&
        ((_ = _.updateQueue),
        (f = _.lastBaseUpdate),
        f !== a &&
          (f === null ? (_.firstBaseUpdate = x) : (f.next = x),
          (_.lastBaseUpdate = p)));
    }
    if (i !== null) {
      var T = l.baseState;
      ((a = 0), (_ = x = p = null), (f = i));
      do {
        var M = f.lane,
          F = f.eventTime;
        if ((r & M) === M) {
          _ !== null &&
            (_ = _.next =
              {
                eventTime: F,
                lane: 0,
                tag: f.tag,
                payload: f.payload,
                callback: f.callback,
                next: null,
              });
          e: {
            var B = e,
              V = f;
            switch (((M = t), (F = n), V.tag)) {
              case 1:
                if (((B = V.payload), typeof B == 'function')) {
                  T = B.call(F, T, M);
                  break e;
                }
                T = B;
                break e;
              case 3:
                B.flags = (B.flags & -65537) | 128;
              case 0:
                if (
                  ((B = V.payload),
                  (M = typeof B == 'function' ? B.call(F, T, M) : B),
                  M == null)
                )
                  break e;
                T = j({}, T, M);
                break e;
              case 2:
                Rn = !0;
            }
          }
          f.callback !== null &&
            f.lane !== 0 &&
            ((e.flags |= 64),
            (M = l.effects),
            M === null ? (l.effects = [f]) : M.push(f));
        } else
          ((F = {
            eventTime: F,
            lane: M,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null,
          }),
            _ === null ? ((x = _ = F), (p = T)) : (_ = _.next = F),
            (a |= M));
        if (((f = f.next), f === null)) {
          if (((f = l.shared.pending), f === null)) break;
          ((M = f),
            (f = M.next),
            (M.next = null),
            (l.lastBaseUpdate = M),
            (l.shared.pending = null));
        }
      } while (!0);
      if (
        (_ === null && (p = T),
        (l.baseState = p),
        (l.firstBaseUpdate = x),
        (l.lastBaseUpdate = _),
        (t = l.shared.interleaved),
        t !== null)
      ) {
        l = t;
        do ((a |= l.lane), (l = l.next));
        while (l !== t);
      } else i === null && (l.shared.lanes = 0);
      (($n |= a), (e.lanes = a), (e.memoizedState = T));
    }
  }
  function oa(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          l = r.callback;
        if (l !== null) {
          if (((r.callback = null), (r = n), typeof l != 'function'))
            throw Error(s(191, l));
          l.call(r);
        }
      }
  }
  var br = {},
    Gt = xn(br),
    el = xn(br),
    tl = xn(br);
  function Hn(e) {
    if (e === br) throw Error(s(174));
    return e;
  }
  function Ui(e, t) {
    switch ((ke(tl, t), ke(el, e), ke(Gt, br), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Qt(null, '');
        break;
      default:
        ((e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = Qt(t, e)));
    }
    (Ce(Gt), ke(Gt, t));
  }
  function vr() {
    (Ce(Gt), Ce(el), Ce(tl));
  }
  function ia(e) {
    Hn(tl.current);
    var t = Hn(Gt.current),
      n = Qt(t, e.type);
    t !== n && (ke(el, e), ke(Gt, n));
  }
  function Bi(e) {
    el.current === e && (Ce(Gt), Ce(el));
  }
  var Ne = xn(0);
  function io(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Vi = [];
  function Hi() {
    for (var e = 0; e < Vi.length; e++)
      Vi[e]._workInProgressVersionPrimary = null;
    Vi.length = 0;
  }
  var uo = Y.ReactCurrentDispatcher,
    Wi = Y.ReactCurrentBatchConfig,
    Wn = 0,
    Me = null,
    je = null,
    Be = null,
    so = !1,
    nl = !1,
    rl = 0,
    Ld = 0;
  function Je() {
    throw Error(s(321));
  }
  function $i(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!At(e[n], t[n])) return !1;
    return !0;
  }
  function Qi(e, t, n, r, l, i) {
    if (
      ((Wn = i),
      (Me = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (uo.current = e === null || e.memoizedState === null ? jd : Fd),
      (e = n(r, l)),
      nl)
    ) {
      i = 0;
      do {
        if (((nl = !1), (rl = 0), 25 <= i)) throw Error(s(301));
        ((i += 1),
          (Be = je = null),
          (t.updateQueue = null),
          (uo.current = Ud),
          (e = n(r, l)));
      } while (nl);
    }
    if (
      ((uo.current = fo),
      (t = je !== null && je.next !== null),
      (Wn = 0),
      (Be = je = Me = null),
      (so = !1),
      t)
    )
      throw Error(s(300));
    return e;
  }
  function Ki() {
    var e = rl !== 0;
    return ((rl = 0), e);
  }
  function Zt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Be === null ? (Me.memoizedState = Be = e) : (Be = Be.next = e), Be);
  }
  function Rt() {
    if (je === null) {
      var e = Me.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = je.next;
    var t = Be === null ? Me.memoizedState : Be.next;
    if (t !== null) ((Be = t), (je = e));
    else {
      if (e === null) throw Error(s(310));
      ((je = e),
        (e = {
          memoizedState: je.memoizedState,
          baseState: je.baseState,
          baseQueue: je.baseQueue,
          queue: je.queue,
          next: null,
        }),
        Be === null ? (Me.memoizedState = Be = e) : (Be = Be.next = e));
    }
    return Be;
  }
  function ll(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Xi(e) {
    var t = Rt(),
      n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = je,
      l = r.baseQueue,
      i = n.pending;
    if (i !== null) {
      if (l !== null) {
        var a = l.next;
        ((l.next = i.next), (i.next = a));
      }
      ((r.baseQueue = l = i), (n.pending = null));
    }
    if (l !== null) {
      ((i = l.next), (r = r.baseState));
      var f = (a = null),
        p = null,
        x = i;
      do {
        var _ = x.lane;
        if ((Wn & _) === _)
          (p !== null &&
            (p = p.next =
              {
                lane: 0,
                action: x.action,
                hasEagerState: x.hasEagerState,
                eagerState: x.eagerState,
                next: null,
              }),
            (r = x.hasEagerState ? x.eagerState : e(r, x.action)));
        else {
          var T = {
            lane: _,
            action: x.action,
            hasEagerState: x.hasEagerState,
            eagerState: x.eagerState,
            next: null,
          };
          (p === null ? ((f = p = T), (a = r)) : (p = p.next = T),
            (Me.lanes |= _),
            ($n |= _));
        }
        x = x.next;
      } while (x !== null && x !== i);
      (p === null ? (a = r) : (p.next = f),
        At(r, t.memoizedState) || (ct = !0),
        (t.memoizedState = r),
        (t.baseState = a),
        (t.baseQueue = p),
        (n.lastRenderedState = r));
    }
    if (((e = n.interleaved), e !== null)) {
      l = e;
      do ((i = l.lane), (Me.lanes |= i), ($n |= i), (l = l.next));
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Yi(e) {
    var t = Rt(),
      n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      l = n.pending,
      i = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var a = (l = l.next);
      do ((i = e(i, a.action)), (a = a.next));
      while (a !== l);
      (At(i, t.memoizedState) || (ct = !0),
        (t.memoizedState = i),
        t.baseQueue === null && (t.baseState = i),
        (n.lastRenderedState = i));
    }
    return [i, r];
  }
  function ua() {}
  function sa(e, t) {
    var n = Me,
      r = Rt(),
      l = t(),
      i = !At(r.memoizedState, l);
    if (
      (i && ((r.memoizedState = l), (ct = !0)),
      (r = r.queue),
      Gi(fa.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || i || (Be !== null && Be.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        ol(9, ca.bind(null, n, r, l, t), void 0, null),
        Ve === null)
      )
        throw Error(s(349));
      (Wn & 30) !== 0 || aa(n, t, l);
    }
    return l;
  }
  function aa(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = Me.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Me.updateQueue = t),
          (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function ca(e, t, n, r) {
    ((t.value = n), (t.getSnapshot = r), da(t) && pa(e));
  }
  function fa(e, t, n) {
    return n(function () {
      da(t) && pa(e);
    });
  }
  function da(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !At(e, n);
    } catch {
      return !0;
    }
  }
  function pa(e) {
    var t = un(e, 1);
    t !== null && Vt(t, e, 1, -1);
  }
  function ha(e) {
    var t = Zt();
    return (
      typeof e == 'function' && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ll,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = Ad.bind(null, Me, e)),
      [t.memoizedState, e]
    );
  }
  function ol(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      (t = Me.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Me.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
      e
    );
  }
  function va() {
    return Rt().memoizedState;
  }
  function ao(e, t, n, r) {
    var l = Zt();
    ((Me.flags |= e),
      (l.memoizedState = ol(1 | t, n, void 0, r === void 0 ? null : r)));
  }
  function co(e, t, n, r) {
    var l = Rt();
    r = r === void 0 ? null : r;
    var i = void 0;
    if (je !== null) {
      var a = je.memoizedState;
      if (((i = a.destroy), r !== null && $i(r, a.deps))) {
        l.memoizedState = ol(t, n, i, r);
        return;
      }
    }
    ((Me.flags |= e), (l.memoizedState = ol(1 | t, n, i, r)));
  }
  function ga(e, t) {
    return ao(8390656, 8, e, t);
  }
  function Gi(e, t) {
    return co(2048, 8, e, t);
  }
  function ya(e, t) {
    return co(4, 2, e, t);
  }
  function ma(e, t) {
    return co(4, 4, e, t);
  }
  function wa(e, t) {
    if (typeof t == 'function')
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function ka(e, t, n) {
    return (
      (n = n != null ? n.concat([e]) : null),
      co(4, 4, wa.bind(null, t, e), n)
    );
  }
  function Zi() {}
  function Sa(e, t) {
    var n = Rt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && $i(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function xa(e, t) {
    var n = Rt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && $i(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function Ca(e, t, n) {
    return (Wn & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (ct = !0)), (e.memoizedState = n))
      : (At(n, t) ||
          ((n = bu()), (Me.lanes |= n), ($n |= n), (e.baseState = !0)),
        t);
  }
  function Od(e, t) {
    var n = we;
    ((we = n !== 0 && 4 > n ? n : 4), e(!0));
    var r = Wi.transition;
    Wi.transition = {};
    try {
      (e(!1), t());
    } finally {
      ((we = n), (Wi.transition = r));
    }
  }
  function Ea() {
    return Rt().memoizedState;
  }
  function Id(e, t, n) {
    var r = Tn(e);
    if (
      ((n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ra(e))
    )
      Da(t, n);
    else if (((n = na(e, t, n, r)), n !== null)) {
      var l = rt();
      (Vt(n, e, r, l), Na(n, t, r));
    }
  }
  function Ad(e, t, n) {
    var r = Tn(e),
      l = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Ra(e)) Da(t, l);
    else {
      var i = e.alternate;
      if (
        e.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = t.lastRenderedReducer), i !== null)
      )
        try {
          var a = t.lastRenderedState,
            f = i(a, n);
          if (((l.hasEagerState = !0), (l.eagerState = f), At(f, a))) {
            var p = t.interleaved;
            (p === null
              ? ((l.next = l), ji(t))
              : ((l.next = p.next), (p.next = l)),
              (t.interleaved = l));
            return;
          }
        } catch {}
      ((n = na(e, t, l, r)),
        n !== null && ((l = rt()), Vt(n, e, r, l), Na(n, t, r)));
    }
  }
  function Ra(e) {
    var t = e.alternate;
    return e === Me || (t !== null && t === Me);
  }
  function Da(e, t) {
    nl = so = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t));
  }
  function Na(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Jo(e, n));
    }
  }
  var fo = {
      readContext: Et,
      useCallback: Je,
      useContext: Je,
      useEffect: Je,
      useImperativeHandle: Je,
      useInsertionEffect: Je,
      useLayoutEffect: Je,
      useMemo: Je,
      useReducer: Je,
      useRef: Je,
      useState: Je,
      useDebugValue: Je,
      useDeferredValue: Je,
      useTransition: Je,
      useMutableSource: Je,
      useSyncExternalStore: Je,
      useId: Je,
      unstable_isNewReconciler: !1,
    },
    jd = {
      readContext: Et,
      useCallback: function (e, t) {
        return ((Zt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Et,
      useEffect: ga,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = n != null ? n.concat([e]) : null),
          ao(4194308, 4, wa.bind(null, t, e), n)
        );
      },
      useLayoutEffect: function (e, t) {
        return ao(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return ao(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Zt();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, n) {
        var r = Zt();
        return (
          (t = n !== void 0 ? n(t) : t),
          (r.memoizedState = r.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (r.queue = e),
          (e = e.dispatch = Id.bind(null, Me, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Zt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: ha,
      useDebugValue: Zi,
      useDeferredValue: function (e) {
        return (Zt().memoizedState = e);
      },
      useTransition: function () {
        var e = ha(!1),
          t = e[0];
        return ((e = Od.bind(null, e[1])), (Zt().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = Me,
          l = Zt();
        if (Ee) {
          if (n === void 0) throw Error(s(407));
          n = n();
        } else {
          if (((n = t()), Ve === null)) throw Error(s(349));
          (Wn & 30) !== 0 || aa(r, t, n);
        }
        l.memoizedState = n;
        var i = { value: n, getSnapshot: t };
        return (
          (l.queue = i),
          ga(fa.bind(null, r, i, e), [e]),
          (r.flags |= 2048),
          ol(9, ca.bind(null, r, i, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = Zt(),
          t = Ve.identifierPrefix;
        if (Ee) {
          var n = on,
            r = ln;
          ((n = (r & ~(1 << (32 - It(r) - 1))).toString(32) + n),
            (t = ':' + t + 'R' + n),
            (n = rl++),
            0 < n && (t += 'H' + n.toString(32)),
            (t += ':'));
        } else ((n = Ld++), (t = ':' + t + 'r' + n.toString(32) + ':'));
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    Fd = {
      readContext: Et,
      useCallback: Sa,
      useContext: Et,
      useEffect: Gi,
      useImperativeHandle: ka,
      useInsertionEffect: ya,
      useLayoutEffect: ma,
      useMemo: xa,
      useReducer: Xi,
      useRef: va,
      useState: function () {
        return Xi(ll);
      },
      useDebugValue: Zi,
      useDeferredValue: function (e) {
        var t = Rt();
        return Ca(t, je.memoizedState, e);
      },
      useTransition: function () {
        var e = Xi(ll)[0],
          t = Rt().memoizedState;
        return [e, t];
      },
      useMutableSource: ua,
      useSyncExternalStore: sa,
      useId: Ea,
      unstable_isNewReconciler: !1,
    },
    Ud = {
      readContext: Et,
      useCallback: Sa,
      useContext: Et,
      useEffect: Gi,
      useImperativeHandle: ka,
      useInsertionEffect: ya,
      useLayoutEffect: ma,
      useMemo: xa,
      useReducer: Yi,
      useRef: va,
      useState: function () {
        return Yi(ll);
      },
      useDebugValue: Zi,
      useDeferredValue: function (e) {
        var t = Rt();
        return je === null ? (t.memoizedState = e) : Ca(t, je.memoizedState, e);
      },
      useTransition: function () {
        var e = Yi(ll)[0],
          t = Rt().memoizedState;
        return [e, t];
      },
      useMutableSource: ua,
      useSyncExternalStore: sa,
      useId: Ea,
      unstable_isNewReconciler: !1,
    };
  function Ft(e, t) {
    if (e && e.defaultProps) {
      ((t = j({}, t)), (e = e.defaultProps));
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function qi(e, t, n, r) {
    ((t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : j({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var po = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? An(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = rt(),
        l = Tn(e),
        i = sn(r, l);
      ((i.payload = t),
        n != null && (i.callback = n),
        (t = Dn(e, i, l)),
        t !== null && (Vt(t, e, l, r), lo(t, e, l)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = rt(),
        l = Tn(e),
        i = sn(r, l);
      ((i.tag = 1),
        (i.payload = t),
        n != null && (i.callback = n),
        (t = Dn(e, i, l)),
        t !== null && (Vt(t, e, l, r), lo(t, e, l)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = rt(),
        r = Tn(e),
        l = sn(n, r);
      ((l.tag = 2),
        t != null && (l.callback = t),
        (t = Dn(e, l, r)),
        t !== null && (Vt(t, e, r, n), lo(t, e, r)));
    },
  };
  function Ma(e, t, n, r, l, i, a) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(r, i, a)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Qr(n, r) || !Qr(l, i)
          : !0
    );
  }
  function _a(e, t, n) {
    var r = !1,
      l = Cn,
      i = t.contextType;
    return (
      typeof i == 'object' && i !== null
        ? (i = Et(i))
        : ((l = at(t) ? Fn : qe.current),
          (r = t.contextTypes),
          (i = (r = r != null) ? sr(e, l) : Cn)),
      (t = new t(n, i)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = po),
      (e.stateNode = t),
      (t._reactInternals = e),
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = l),
        (e.__reactInternalMemoizedMaskedChildContext = i)),
      t
    );
  }
  function Ta(e, t, n, r) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' &&
        t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && po.enqueueReplaceState(t, t.state, null));
  }
  function Ji(e, t, n, r) {
    var l = e.stateNode;
    ((l.props = n), (l.state = e.memoizedState), (l.refs = {}), Fi(e));
    var i = t.contextType;
    (typeof i == 'object' && i !== null
      ? (l.context = Et(i))
      : ((i = at(t) ? Fn : qe.current), (l.context = sr(e, i))),
      (l.state = e.memoizedState),
      (i = t.getDerivedStateFromProps),
      typeof i == 'function' && (qi(e, t, i, n), (l.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == 'function' ||
        typeof l.getSnapshotBeforeUpdate == 'function' ||
        (typeof l.UNSAFE_componentWillMount != 'function' &&
          typeof l.componentWillMount != 'function') ||
        ((t = l.state),
        typeof l.componentWillMount == 'function' && l.componentWillMount(),
        typeof l.UNSAFE_componentWillMount == 'function' &&
          l.UNSAFE_componentWillMount(),
        t !== l.state && po.enqueueReplaceState(l, l.state, null),
        oo(e, n, l, r),
        (l.state = e.memoizedState)),
      typeof l.componentDidMount == 'function' && (e.flags |= 4194308));
  }
  function gr(e, t) {
    try {
      var n = '',
        r = t;
      do ((n += ue(r)), (r = r.return));
      while (r);
      var l = n;
    } catch (i) {
      l =
        `
Error generating stack: ` +
        i.message +
        `
` +
        i.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function bi(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function eu(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var Bd = typeof WeakMap == 'function' ? WeakMap : Map;
  function Pa(e, t, n) {
    ((n = sn(-1, n)), (n.tag = 3), (n.payload = { element: null }));
    var r = t.value;
    return (
      (n.callback = function () {
        (ko || ((ko = !0), (vu = r)), eu(e, t));
      }),
      n
    );
  }
  function za(e, t, n) {
    ((n = sn(-1, n)), (n.tag = 3));
    var r = e.type.getDerivedStateFromError;
    if (typeof r == 'function') {
      var l = t.value;
      ((n.payload = function () {
        return r(l);
      }),
        (n.callback = function () {
          eu(e, t);
        }));
    }
    var i = e.stateNode;
    return (
      i !== null &&
        typeof i.componentDidCatch == 'function' &&
        (n.callback = function () {
          (eu(e, t),
            typeof r != 'function' &&
              (Mn === null ? (Mn = new Set([this])) : Mn.add(this)));
          var a = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: a !== null ? a : '',
          });
        }),
      n
    );
  }
  function La(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Bd();
      var l = new Set();
      r.set(t, l);
    } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)));
    l.has(n) || (l.add(n), (e = ep.bind(null, e, t, n)), t.then(e, e));
  }
  function Oa(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Ia(e, t, n, r, l) {
    return (e.mode & 1) === 0
      ? (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null
                ? (n.tag = 17)
                : ((t = sn(-1, 1)), (t.tag = 2), Dn(n, t, 1))),
            (n.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = l), e);
  }
  var Vd = Y.ReactCurrentOwner,
    ct = !1;
  function nt(e, t, n, r) {
    t.child = e === null ? ta(t, null, n, r) : dr(t, e.child, n, r);
  }
  function Aa(e, t, n, r, l) {
    n = n.render;
    var i = t.ref;
    return (
      hr(t, l),
      (r = Qi(e, t, n, r, i, l)),
      (n = Ki()),
      e !== null && !ct
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~l),
          an(e, t, l))
        : (Ee && n && Mi(t), (t.flags |= 1), nt(e, t, r, l), t.child)
    );
  }
  function ja(e, t, n, r, l) {
    if (e === null) {
      var i = n.type;
      return typeof i == 'function' &&
        !xu(i) &&
        i.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = i), Fa(e, t, i, r, l))
        : ((e = Do(n.type, null, r, t, t.mode, l)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((i = e.child), (e.lanes & l) === 0)) {
      var a = i.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Qr), n(a, r) && e.ref === t.ref)
      )
        return an(e, t, l);
    }
    return (
      (t.flags |= 1),
      (e = zn(i, r)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Fa(e, t, n, r, l) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (Qr(i, r) && e.ref === t.ref)
        if (((ct = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0))
          (e.flags & 131072) !== 0 && (ct = !0);
        else return ((t.lanes = e.lanes), an(e, t, l));
    }
    return tu(e, t, n, r, l);
  }
  function Ua(e, t, n) {
    var r = t.pendingProps,
      l = r.children,
      i = e !== null ? e.memoizedState : null;
    if (r.mode === 'hidden')
      if ((t.mode & 1) === 0)
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          ke(mr, kt),
          (kt |= n));
      else {
        if ((n & 1073741824) === 0)
          return (
            (e = i !== null ? i.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            ke(mr, kt),
            (kt |= e),
            null
          );
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (r = i !== null ? i.baseLanes : n),
          ke(mr, kt),
          (kt |= r));
      }
    else
      (i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
        ke(mr, kt),
        (kt |= r));
    return (nt(e, t, l, n), t.child);
  }
  function Ba(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function tu(e, t, n, r, l) {
    var i = at(n) ? Fn : qe.current;
    return (
      (i = sr(t, i)),
      hr(t, l),
      (n = Qi(e, t, n, r, i, l)),
      (r = Ki()),
      e !== null && !ct
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~l),
          an(e, t, l))
        : (Ee && r && Mi(t), (t.flags |= 1), nt(e, t, n, l), t.child)
    );
  }
  function Va(e, t, n, r, l) {
    if (at(n)) {
      var i = !0;
      Zl(t);
    } else i = !1;
    if ((hr(t, l), t.stateNode === null))
      (vo(e, t), _a(t, n, r), Ji(t, n, r, l), (r = !0));
    else if (e === null) {
      var a = t.stateNode,
        f = t.memoizedProps;
      a.props = f;
      var p = a.context,
        x = n.contextType;
      typeof x == 'object' && x !== null
        ? (x = Et(x))
        : ((x = at(n) ? Fn : qe.current), (x = sr(t, x)));
      var _ = n.getDerivedStateFromProps,
        T =
          typeof _ == 'function' ||
          typeof a.getSnapshotBeforeUpdate == 'function';
      (T ||
        (typeof a.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof a.componentWillReceiveProps != 'function') ||
        ((f !== r || p !== x) && Ta(t, a, r, x)),
        (Rn = !1));
      var M = t.memoizedState;
      ((a.state = M),
        oo(t, r, a, l),
        (p = t.memoizedState),
        f !== r || M !== p || st.current || Rn
          ? (typeof _ == 'function' && (qi(t, n, _, r), (p = t.memoizedState)),
            (f = Rn || Ma(t, n, f, r, M, p, x))
              ? (T ||
                  (typeof a.UNSAFE_componentWillMount != 'function' &&
                    typeof a.componentWillMount != 'function') ||
                  (typeof a.componentWillMount == 'function' &&
                    a.componentWillMount(),
                  typeof a.UNSAFE_componentWillMount == 'function' &&
                    a.UNSAFE_componentWillMount()),
                typeof a.componentDidMount == 'function' &&
                  (t.flags |= 4194308))
              : (typeof a.componentDidMount == 'function' &&
                  (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = p)),
            (a.props = r),
            (a.state = p),
            (a.context = x),
            (r = f))
          : (typeof a.componentDidMount == 'function' && (t.flags |= 4194308),
            (r = !1)));
    } else {
      ((a = t.stateNode),
        ra(e, t),
        (f = t.memoizedProps),
        (x = t.type === t.elementType ? f : Ft(t.type, f)),
        (a.props = x),
        (T = t.pendingProps),
        (M = a.context),
        (p = n.contextType),
        typeof p == 'object' && p !== null
          ? (p = Et(p))
          : ((p = at(n) ? Fn : qe.current), (p = sr(t, p))));
      var F = n.getDerivedStateFromProps;
      ((_ =
        typeof F == 'function' ||
        typeof a.getSnapshotBeforeUpdate == 'function') ||
        (typeof a.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof a.componentWillReceiveProps != 'function') ||
        ((f !== T || M !== p) && Ta(t, a, r, p)),
        (Rn = !1),
        (M = t.memoizedState),
        (a.state = M),
        oo(t, r, a, l));
      var B = t.memoizedState;
      f !== T || M !== B || st.current || Rn
        ? (typeof F == 'function' && (qi(t, n, F, r), (B = t.memoizedState)),
          (x = Rn || Ma(t, n, x, r, M, B, p) || !1)
            ? (_ ||
                (typeof a.UNSAFE_componentWillUpdate != 'function' &&
                  typeof a.componentWillUpdate != 'function') ||
                (typeof a.componentWillUpdate == 'function' &&
                  a.componentWillUpdate(r, B, p),
                typeof a.UNSAFE_componentWillUpdate == 'function' &&
                  a.UNSAFE_componentWillUpdate(r, B, p)),
              typeof a.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof a.getSnapshotBeforeUpdate == 'function' &&
                (t.flags |= 1024))
            : (typeof a.componentDidUpdate != 'function' ||
                (f === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 4),
              typeof a.getSnapshotBeforeUpdate != 'function' ||
                (f === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = B)),
          (a.props = r),
          (a.state = B),
          (a.context = p),
          (r = x))
        : (typeof a.componentDidUpdate != 'function' ||
            (f === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 4),
          typeof a.getSnapshotBeforeUpdate != 'function' ||
            (f === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return nu(e, t, n, r, i, l);
  }
  function nu(e, t, n, r, l, i) {
    Ba(e, t);
    var a = (t.flags & 128) !== 0;
    if (!r && !a) return (l && Ks(t, n, !1), an(e, t, i));
    ((r = t.stateNode), (Vd.current = t));
    var f =
      a && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
    return (
      (t.flags |= 1),
      e !== null && a
        ? ((t.child = dr(t, e.child, null, i)), (t.child = dr(t, null, f, i)))
        : nt(e, t, f, i),
      (t.memoizedState = r.state),
      l && Ks(t, n, !0),
      t.child
    );
  }
  function Ha(e) {
    var t = e.stateNode;
    (t.pendingContext
      ? $s(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && $s(e, t.context, !1),
      Ui(e, t.containerInfo));
  }
  function Wa(e, t, n, r, l) {
    return (fr(), zi(l), (t.flags |= 256), nt(e, t, n, r), t.child);
  }
  var ru = { dehydrated: null, treeContext: null, retryLane: 0 };
  function lu(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function $a(e, t, n) {
    var r = t.pendingProps,
      l = Ne.current,
      i = !1,
      a = (t.flags & 128) !== 0,
      f;
    if (
      ((f = a) ||
        (f = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
      f
        ? ((i = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (l |= 1),
      ke(Ne, l & 1),
      e === null)
    )
      return (
        Pi(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? ((t.mode & 1) === 0
              ? (t.lanes = 1)
              : e.data === '$!'
                ? (t.lanes = 8)
                : (t.lanes = 1073741824),
            null)
          : ((a = r.children),
            (e = r.fallback),
            i
              ? ((r = t.mode),
                (i = t.child),
                (a = { mode: 'hidden', children: a }),
                (r & 1) === 0 && i !== null
                  ? ((i.childLanes = 0), (i.pendingProps = a))
                  : (i = No(a, r, 0, null)),
                (e = Yn(e, r, n, null)),
                (i.return = t),
                (e.return = t),
                (i.sibling = e),
                (t.child = i),
                (t.child.memoizedState = lu(n)),
                (t.memoizedState = ru),
                e)
              : ou(t, a))
      );
    if (((l = e.memoizedState), l !== null && ((f = l.dehydrated), f !== null)))
      return Hd(e, t, a, r, f, l, n);
    if (i) {
      ((i = r.fallback), (a = t.mode), (l = e.child), (f = l.sibling));
      var p = { mode: 'hidden', children: r.children };
      return (
        (a & 1) === 0 && t.child !== l
          ? ((r = t.child),
            (r.childLanes = 0),
            (r.pendingProps = p),
            (t.deletions = null))
          : ((r = zn(l, p)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
        f !== null ? (i = zn(f, i)) : ((i = Yn(i, a, n, null)), (i.flags |= 2)),
        (i.return = t),
        (r.return = t),
        (r.sibling = i),
        (t.child = r),
        (r = i),
        (i = t.child),
        (a = e.child.memoizedState),
        (a =
          a === null
            ? lu(n)
            : {
                baseLanes: a.baseLanes | n,
                cachePool: null,
                transitions: a.transitions,
              }),
        (i.memoizedState = a),
        (i.childLanes = e.childLanes & ~n),
        (t.memoizedState = ru),
        r
      );
    }
    return (
      (i = e.child),
      (e = i.sibling),
      (r = zn(i, { mode: 'visible', children: r.children })),
      (t.mode & 1) === 0 && (r.lanes = n),
      (r.return = t),
      (r.sibling = null),
      e !== null &&
        ((n = t.deletions),
        n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = r),
      (t.memoizedState = null),
      r
    );
  }
  function ou(e, t) {
    return (
      (t = No({ mode: 'visible', children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function ho(e, t, n, r) {
    return (
      r !== null && zi(r),
      dr(t, e.child, null, n),
      (e = ou(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Hd(e, t, n, r, l, i, a) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (r = bi(Error(s(422)))), ho(e, t, a, r))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((i = r.fallback),
            (l = t.mode),
            (r = No({ mode: 'visible', children: r.children }, l, 0, null)),
            (i = Yn(i, l, a, null)),
            (i.flags |= 2),
            (r.return = t),
            (i.return = t),
            (r.sibling = i),
            (t.child = r),
            (t.mode & 1) !== 0 && dr(t, e.child, null, a),
            (t.child.memoizedState = lu(a)),
            (t.memoizedState = ru),
            i);
    if ((t.mode & 1) === 0) return ho(e, t, a, null);
    if (l.data === '$!') {
      if (((r = l.nextSibling && l.nextSibling.dataset), r)) var f = r.dgst;
      return (
        (r = f),
        (i = Error(s(419))),
        (r = bi(i, r, void 0)),
        ho(e, t, a, r)
      );
    }
    if (((f = (a & e.childLanes) !== 0), ct || f)) {
      if (((r = Ve), r !== null)) {
        switch (a & -a) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        ((l = (l & (r.suspendedLanes | a)) !== 0 ? 0 : l),
          l !== 0 &&
            l !== i.retryLane &&
            ((i.retryLane = l), un(e, l), Vt(r, e, l, -1)));
      }
      return (Su(), (r = bi(Error(s(421)))), ho(e, t, a, r));
    }
    return l.data === '$?'
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = tp.bind(null, e)),
        (l._reactRetry = t),
        null)
      : ((e = i.treeContext),
        (wt = Sn(l.nextSibling)),
        (mt = t),
        (Ee = !0),
        (jt = null),
        e !== null &&
          ((xt[Ct++] = ln),
          (xt[Ct++] = on),
          (xt[Ct++] = Un),
          (ln = e.id),
          (on = e.overflow),
          (Un = t)),
        (t = ou(t, r.children)),
        (t.flags |= 4096),
        t);
  }
  function Qa(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    (r !== null && (r.lanes |= t), Ai(e.return, t, n));
  }
  function iu(e, t, n, r, l) {
    var i = e.memoizedState;
    i === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: l,
        })
      : ((i.isBackwards = t),
        (i.rendering = null),
        (i.renderingStartTime = 0),
        (i.last = r),
        (i.tail = n),
        (i.tailMode = l));
  }
  function Ka(e, t, n) {
    var r = t.pendingProps,
      l = r.revealOrder,
      i = r.tail;
    if ((nt(e, t, r.children, n), (r = Ne.current), (r & 2) !== 0))
      ((r = (r & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Qa(e, n, t);
          else if (e.tag === 19) Qa(e, n, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      r &= 1;
    }
    if ((ke(Ne, r), (t.mode & 1) === 0)) t.memoizedState = null;
    else
      switch (l) {
        case 'forwards':
          for (n = t.child, l = null; n !== null; )
            ((e = n.alternate),
              e !== null && io(e) === null && (l = n),
              (n = n.sibling));
          ((n = l),
            n === null
              ? ((l = t.child), (t.child = null))
              : ((l = n.sibling), (n.sibling = null)),
            iu(t, !1, l, n, i));
          break;
        case 'backwards':
          for (n = null, l = t.child, t.child = null; l !== null; ) {
            if (((e = l.alternate), e !== null && io(e) === null)) {
              t.child = l;
              break;
            }
            ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
          }
          iu(t, !0, n, null, i);
          break;
        case 'together':
          iu(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function vo(e, t) {
    (t.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function an(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      ($n |= t.lanes),
      (n & t.childLanes) === 0)
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (
        e = t.child, n = zn(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (n = n.sibling = zn(e, e.pendingProps)),
          (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function Wd(e, t, n) {
    switch (t.tag) {
      case 3:
        (Ha(t), fr());
        break;
      case 5:
        ia(t);
        break;
      case 1:
        at(t.type) && Zl(t);
        break;
      case 4:
        Ui(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context,
          l = t.memoizedProps.value;
        (ke(no, r._currentValue), (r._currentValue = l));
        break;
      case 13:
        if (((r = t.memoizedState), r !== null))
          return r.dehydrated !== null
            ? (ke(Ne, Ne.current & 1), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? $a(e, t, n)
              : (ke(Ne, Ne.current & 1),
                (e = an(e, t, n)),
                e !== null ? e.sibling : null);
        ke(Ne, Ne.current & 1);
        break;
      case 19:
        if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (r) return Ka(e, t, n);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null &&
            ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          ke(Ne, Ne.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), Ua(e, t, n));
    }
    return an(e, t, n);
  }
  var Xa, uu, Ya, Ga;
  ((Xa = function (e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
  }),
    (uu = function () {}),
    (Ya = function (e, t, n, r) {
      var l = e.memoizedProps;
      if (l !== r) {
        ((e = t.stateNode), Hn(Gt.current));
        var i = null;
        switch (n) {
          case 'input':
            ((l = vt(e, l)), (r = vt(e, r)), (i = []));
            break;
          case 'select':
            ((l = j({}, l, { value: void 0 })),
              (r = j({}, r, { value: void 0 })),
              (i = []));
            break;
          case 'textarea':
            ((l = fn(e, l)), (r = fn(e, r)), (i = []));
            break;
          default:
            typeof l.onClick != 'function' &&
              typeof r.onClick == 'function' &&
              (e.onclick = Xl);
        }
        qn(n, r);
        var a;
        n = null;
        for (x in l)
          if (!r.hasOwnProperty(x) && l.hasOwnProperty(x) && l[x] != null)
            if (x === 'style') {
              var f = l[x];
              for (a in f) f.hasOwnProperty(a) && (n || (n = {}), (n[a] = ''));
            } else
              x !== 'dangerouslySetInnerHTML' &&
                x !== 'children' &&
                x !== 'suppressContentEditableWarning' &&
                x !== 'suppressHydrationWarning' &&
                x !== 'autoFocus' &&
                (d.hasOwnProperty(x)
                  ? i || (i = [])
                  : (i = i || []).push(x, null));
        for (x in r) {
          var p = r[x];
          if (
            ((f = l?.[x]),
            r.hasOwnProperty(x) && p !== f && (p != null || f != null))
          )
            if (x === 'style')
              if (f) {
                for (a in f)
                  !f.hasOwnProperty(a) ||
                    (p && p.hasOwnProperty(a)) ||
                    (n || (n = {}), (n[a] = ''));
                for (a in p)
                  p.hasOwnProperty(a) &&
                    f[a] !== p[a] &&
                    (n || (n = {}), (n[a] = p[a]));
              } else (n || (i || (i = []), i.push(x, n)), (n = p));
            else
              x === 'dangerouslySetInnerHTML'
                ? ((p = p ? p.__html : void 0),
                  (f = f ? f.__html : void 0),
                  p != null && f !== p && (i = i || []).push(x, p))
                : x === 'children'
                  ? (typeof p != 'string' && typeof p != 'number') ||
                    (i = i || []).push(x, '' + p)
                  : x !== 'suppressContentEditableWarning' &&
                    x !== 'suppressHydrationWarning' &&
                    (d.hasOwnProperty(x)
                      ? (p != null && x === 'onScroll' && xe('scroll', e),
                        i || f === p || (i = []))
                      : (i = i || []).push(x, p));
        }
        n && (i = i || []).push('style', n);
        var x = i;
        (t.updateQueue = x) && (t.flags |= 4);
      }
    }),
    (Ga = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    }));
  function il(e, t) {
    if (!Ee)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var n = null; t !== null; )
            (t.alternate !== null && (n = t), (t = t.sibling));
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case 'collapsed':
          n = e.tail;
          for (var r = null; n !== null; )
            (n.alternate !== null && (r = n), (n = n.sibling));
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function be(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var l = e.child; l !== null; )
        ((n |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags & 14680064),
          (r |= l.flags & 14680064),
          (l.return = e),
          (l = l.sibling));
    else
      for (l = e.child; l !== null; )
        ((n |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags),
          (r |= l.flags),
          (l.return = e),
          (l = l.sibling));
    return ((e.subtreeFlags |= r), (e.childLanes = n), t);
  }
  function $d(e, t, n) {
    var r = t.pendingProps;
    switch ((_i(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (be(t), null);
      case 1:
        return (at(t.type) && Gl(), be(t), null);
      case 3:
        return (
          (r = t.stateNode),
          vr(),
          Ce(st),
          Ce(qe),
          Hi(),
          r.pendingContext &&
            ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (eo(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), jt !== null && (mu(jt), (jt = null)))),
          uu(e, t),
          be(t),
          null
        );
      case 5:
        Bi(t);
        var l = Hn(tl.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          (Ya(e, t, n, r, l),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return (be(t), null);
          }
          if (((e = Hn(Gt.current)), eo(t))) {
            ((r = t.stateNode), (n = t.type));
            var i = t.memoizedProps;
            switch (((r[Yt] = t), (r[Zr] = i), (e = (t.mode & 1) !== 0), n)) {
              case 'dialog':
                (xe('cancel', r), xe('close', r));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                xe('load', r);
                break;
              case 'video':
              case 'audio':
                for (l = 0; l < Xr.length; l++) xe(Xr[l], r);
                break;
              case 'source':
                xe('error', r);
                break;
              case 'img':
              case 'image':
              case 'link':
                (xe('error', r), xe('load', r));
                break;
              case 'details':
                xe('toggle', r);
                break;
              case 'input':
                (Jt(r, i), xe('invalid', r));
                break;
              case 'select':
                ((r._wrapperState = { wasMultiple: !!i.multiple }),
                  xe('invalid', r));
                break;
              case 'textarea':
                (Dr(r, i), xe('invalid', r));
            }
            (qn(n, i), (l = null));
            for (var a in i)
              if (i.hasOwnProperty(a)) {
                var f = i[a];
                a === 'children'
                  ? typeof f == 'string'
                    ? r.textContent !== f &&
                      (i.suppressHydrationWarning !== !0 &&
                        Kl(r.textContent, f, e),
                      (l = ['children', f]))
                    : typeof f == 'number' &&
                      r.textContent !== '' + f &&
                      (i.suppressHydrationWarning !== !0 &&
                        Kl(r.textContent, f, e),
                      (l = ['children', '' + f]))
                  : d.hasOwnProperty(a) &&
                    f != null &&
                    a === 'onScroll' &&
                    xe('scroll', r);
              }
            switch (n) {
              case 'input':
                ($t(r), Rr(r, i, !0));
                break;
              case 'textarea':
                ($t(r), Cl(r));
                break;
              case 'select':
              case 'option':
                break;
              default:
                typeof i.onClick == 'function' && (r.onclick = Xl);
            }
            ((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4));
          } else {
            ((a = l.nodeType === 9 ? l : l.ownerDocument),
              e === 'http://www.w3.org/1999/xhtml' && (e = El(n)),
              e === 'http://www.w3.org/1999/xhtml'
                ? n === 'script'
                  ? ((e = a.createElement('div')),
                    (e.innerHTML = '<script><\/script>'),
                    (e = e.removeChild(e.firstChild)))
                  : typeof r.is == 'string'
                    ? (e = a.createElement(n, { is: r.is }))
                    : ((e = a.createElement(n)),
                      n === 'select' &&
                        ((a = e),
                        r.multiple
                          ? (a.multiple = !0)
                          : r.size && (a.size = r.size)))
                : (e = a.createElementNS(e, n)),
              (e[Yt] = t),
              (e[Zr] = r),
              Xa(e, t, !1, !1),
              (t.stateNode = e));
            e: {
              switch (((a = _r(n, r)), n)) {
                case 'dialog':
                  (xe('cancel', e), xe('close', e), (l = r));
                  break;
                case 'iframe':
                case 'object':
                case 'embed':
                  (xe('load', e), (l = r));
                  break;
                case 'video':
                case 'audio':
                  for (l = 0; l < Xr.length; l++) xe(Xr[l], e);
                  l = r;
                  break;
                case 'source':
                  (xe('error', e), (l = r));
                  break;
                case 'img':
                case 'image':
                case 'link':
                  (xe('error', e), xe('load', e), (l = r));
                  break;
                case 'details':
                  (xe('toggle', e), (l = r));
                  break;
                case 'input':
                  (Jt(e, r), (l = vt(e, r)), xe('invalid', e));
                  break;
                case 'option':
                  l = r;
                  break;
                case 'select':
                  ((e._wrapperState = { wasMultiple: !!r.multiple }),
                    (l = j({}, r, { value: void 0 })),
                    xe('invalid', e));
                  break;
                case 'textarea':
                  (Dr(e, r), (l = fn(e, r)), xe('invalid', e));
                  break;
                default:
                  l = r;
              }
              (qn(n, l), (f = l));
              for (i in f)
                if (f.hasOwnProperty(i)) {
                  var p = f[i];
                  i === 'style'
                    ? Nl(e, p)
                    : i === 'dangerouslySetInnerHTML'
                      ? ((p = p ? p.__html : void 0), p != null && dn(e, p))
                      : i === 'children'
                        ? typeof p == 'string'
                          ? (n !== 'textarea' || p !== '') && pn(e, p)
                          : typeof p == 'number' && pn(e, '' + p)
                        : i !== 'suppressContentEditableWarning' &&
                          i !== 'suppressHydrationWarning' &&
                          i !== 'autoFocus' &&
                          (d.hasOwnProperty(i)
                            ? p != null && i === 'onScroll' && xe('scroll', e)
                            : p != null && $(e, i, p, a));
                }
              switch (n) {
                case 'input':
                  ($t(e), Rr(e, r, !1));
                  break;
                case 'textarea':
                  ($t(e), Cl(e));
                  break;
                case 'option':
                  r.value != null && e.setAttribute('value', '' + se(r.value));
                  break;
                case 'select':
                  ((e.multiple = !!r.multiple),
                    (i = r.value),
                    i != null
                      ? Tt(e, !!r.multiple, i, !1)
                      : r.defaultValue != null &&
                        Tt(e, !!r.multiple, r.defaultValue, !0));
                  break;
                default:
                  typeof l.onClick == 'function' && (e.onclick = Xl);
              }
              switch (n) {
                case 'button':
                case 'input':
                case 'select':
                case 'textarea':
                  r = !!r.autoFocus;
                  break e;
                case 'img':
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return (be(t), null);
      case 6:
        if (e && t.stateNode != null) Ga(e, t, e.memoizedProps, r);
        else {
          if (typeof r != 'string' && t.stateNode === null) throw Error(s(166));
          if (((n = Hn(tl.current)), Hn(Gt.current), eo(t))) {
            if (
              ((r = t.stateNode),
              (n = t.memoizedProps),
              (r[Yt] = t),
              (i = r.nodeValue !== n) && ((e = mt), e !== null))
            )
              switch (e.tag) {
                case 3:
                  Kl(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Kl(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            i && (t.flags |= 4);
          } else
            ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
              (r[Yt] = t),
              (t.stateNode = r));
        }
        return (be(t), null);
      case 13:
        if (
          (Ce(Ne),
          (r = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (Ee && wt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
            (Js(), fr(), (t.flags |= 98560), (i = !1));
          else if (((i = eo(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!i) throw Error(s(318));
              if (
                ((i = t.memoizedState),
                (i = i !== null ? i.dehydrated : null),
                !i)
              )
                throw Error(s(317));
              i[Yt] = t;
            } else
              (fr(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (be(t), (i = !1));
          } else (jt !== null && (mu(jt), (jt = null)), (i = !0));
          if (!i) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            r !== (e !== null && e.memoizedState !== null) &&
              r &&
              ((t.child.flags |= 8192),
              (t.mode & 1) !== 0 &&
                (e === null || (Ne.current & 1) !== 0
                  ? Fe === 0 && (Fe = 3)
                  : Su())),
            t.updateQueue !== null && (t.flags |= 4),
            be(t),
            null);
      case 4:
        return (
          vr(),
          uu(e, t),
          e === null && Yr(t.stateNode.containerInfo),
          be(t),
          null
        );
      case 10:
        return (Ii(t.type._context), be(t), null);
      case 17:
        return (at(t.type) && Gl(), be(t), null);
      case 19:
        if ((Ce(Ne), (i = t.memoizedState), i === null)) return (be(t), null);
        if (((r = (t.flags & 128) !== 0), (a = i.rendering), a === null))
          if (r) il(i, !1);
          else {
            if (Fe !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((a = io(e)), a !== null)) {
                  for (
                    t.flags |= 128,
                      il(i, !1),
                      r = a.updateQueue,
                      r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      r = n,
                      n = t.child;
                    n !== null;
                  )
                    ((i = n),
                      (e = r),
                      (i.flags &= 14680066),
                      (a = i.alternate),
                      a === null
                        ? ((i.childLanes = 0),
                          (i.lanes = e),
                          (i.child = null),
                          (i.subtreeFlags = 0),
                          (i.memoizedProps = null),
                          (i.memoizedState = null),
                          (i.updateQueue = null),
                          (i.dependencies = null),
                          (i.stateNode = null))
                        : ((i.childLanes = a.childLanes),
                          (i.lanes = a.lanes),
                          (i.child = a.child),
                          (i.subtreeFlags = 0),
                          (i.deletions = null),
                          (i.memoizedProps = a.memoizedProps),
                          (i.memoizedState = a.memoizedState),
                          (i.updateQueue = a.updateQueue),
                          (i.type = a.type),
                          (e = a.dependencies),
                          (i.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (n = n.sibling));
                  return (ke(Ne, (Ne.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            i.tail !== null &&
              Le() > wr &&
              ((t.flags |= 128), (r = !0), il(i, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = io(a)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                il(i, !0),
                i.tail === null &&
                  i.tailMode === 'hidden' &&
                  !a.alternate &&
                  !Ee)
              )
                return (be(t), null);
            } else
              2 * Le() - i.renderingStartTime > wr &&
                n !== 1073741824 &&
                ((t.flags |= 128), (r = !0), il(i, !1), (t.lanes = 4194304));
          i.isBackwards
            ? ((a.sibling = t.child), (t.child = a))
            : ((n = i.last),
              n !== null ? (n.sibling = a) : (t.child = a),
              (i.last = a));
        }
        return i.tail !== null
          ? ((t = i.tail),
            (i.rendering = t),
            (i.tail = t.sibling),
            (i.renderingStartTime = Le()),
            (t.sibling = null),
            (n = Ne.current),
            ke(Ne, r ? (n & 1) | 2 : n & 1),
            t)
          : (be(t), null);
      case 22:
      case 23:
        return (
          ku(),
          (r = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
          r && (t.mode & 1) !== 0
            ? (kt & 1073741824) !== 0 &&
              (be(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : be(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Qd(e, t) {
    switch ((_i(t), t.tag)) {
      case 1:
        return (
          at(t.type) && Gl(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          vr(),
          Ce(st),
          Ce(qe),
          Hi(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 5:
        return (Bi(t), null);
      case 13:
        if (
          (Ce(Ne), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(s(340));
          fr();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (Ce(Ne), null);
      case 4:
        return (vr(), null);
      case 10:
        return (Ii(t.type._context), null);
      case 22:
      case 23:
        return (ku(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var go = !1,
    et = !1,
    Kd = typeof WeakSet == 'function' ? WeakSet : Set,
    U = null;
  function yr(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == 'function')
        try {
          n(null);
        } catch (r) {
          ze(e, t, r);
        }
      else n.current = null;
  }
  function su(e, t, n) {
    try {
      n();
    } catch (r) {
      ze(e, t, r);
    }
  }
  var Za = !1;
  function Xd(e, t) {
    if (((ki = Il), (e = Ms()), di(e))) {
      if ('selectionStart' in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var l = r.anchorOffset,
              i = r.focusNode;
            r = r.focusOffset;
            try {
              (n.nodeType, i.nodeType);
            } catch {
              n = null;
              break e;
            }
            var a = 0,
              f = -1,
              p = -1,
              x = 0,
              _ = 0,
              T = e,
              M = null;
            t: for (;;) {
              for (
                var F;
                T !== n || (l !== 0 && T.nodeType !== 3) || (f = a + l),
                  T !== i || (r !== 0 && T.nodeType !== 3) || (p = a + r),
                  T.nodeType === 3 && (a += T.nodeValue.length),
                  (F = T.firstChild) !== null;
              )
                ((M = T), (T = F));
              for (;;) {
                if (T === e) break t;
                if (
                  (M === n && ++x === l && (f = a),
                  M === i && ++_ === r && (p = a),
                  (F = T.nextSibling) !== null)
                )
                  break;
                ((T = M), (M = T.parentNode));
              }
              T = F;
            }
            n = f === -1 || p === -1 ? null : { start: f, end: p };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      Si = { focusedElem: e, selectionRange: n }, Il = !1, U = t;
      U !== null;
    )
      if (((t = U), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (U = e));
      else
        for (; U !== null; ) {
          t = U;
          try {
            var B = t.alternate;
            if ((t.flags & 1024) !== 0)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (B !== null) {
                    var V = B.memoizedProps,
                      Oe = B.memoizedState,
                      w = t.stateNode,
                      v = w.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? V : Ft(t.type, V),
                        Oe,
                      );
                    w.__reactInternalSnapshotBeforeUpdate = v;
                  }
                  break;
                case 3:
                  var k = t.stateNode.containerInfo;
                  k.nodeType === 1
                    ? (k.textContent = '')
                    : k.nodeType === 9 &&
                      k.documentElement &&
                      k.removeChild(k.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(s(163));
              }
          } catch (z) {
            ze(t, t.return, z);
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (U = e));
            break;
          }
          U = t.return;
        }
    return ((B = Za), (Za = !1), B);
  }
  function ul(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
      var l = (r = r.next);
      do {
        if ((l.tag & e) === e) {
          var i = l.destroy;
          ((l.destroy = void 0), i !== void 0 && su(t, n, i));
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function yo(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function au(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      (e.tag, (e = n), typeof t == 'function' ? t(e) : (t.current = e));
    }
  }
  function qa(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), qa(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[Yt],
          delete t[Zr],
          delete t[Ri],
          delete t[_d],
          delete t[Td])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function Ja(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function ba(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ja(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function cu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      ((e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Xl)));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (cu(e, t, n), e = e.sibling; e !== null; )
        (cu(e, t, n), (e = e.sibling));
  }
  function fu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (fu(e, t, n), e = e.sibling; e !== null; )
        (fu(e, t, n), (e = e.sibling));
  }
  var $e = null,
    Ut = !1;
  function Nn(e, t, n) {
    for (n = n.child; n !== null; ) (ec(e, t, n), (n = n.sibling));
  }
  function ec(e, t, n) {
    if (Xt && typeof Xt.onCommitFiberUnmount == 'function')
      try {
        Xt.onCommitFiberUnmount(_l, n);
      } catch {}
    switch (n.tag) {
      case 5:
        et || yr(n, t);
      case 6:
        var r = $e,
          l = Ut;
        (($e = null),
          Nn(e, t, n),
          ($e = r),
          (Ut = l),
          $e !== null &&
            (Ut
              ? ((e = $e),
                (n = n.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(n)
                  : e.removeChild(n))
              : $e.removeChild(n.stateNode)));
        break;
      case 18:
        $e !== null &&
          (Ut
            ? ((e = $e),
              (n = n.stateNode),
              e.nodeType === 8
                ? Ei(e.parentNode, n)
                : e.nodeType === 1 && Ei(e, n),
              Ur(e))
            : Ei($e, n.stateNode));
        break;
      case 4:
        ((r = $e),
          (l = Ut),
          ($e = n.stateNode.containerInfo),
          (Ut = !0),
          Nn(e, t, n),
          ($e = r),
          (Ut = l));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !et &&
          ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
        ) {
          l = r = r.next;
          do {
            var i = l,
              a = i.destroy;
            ((i = i.tag),
              a !== void 0 && ((i & 2) !== 0 || (i & 4) !== 0) && su(n, t, a),
              (l = l.next));
          } while (l !== r);
        }
        Nn(e, t, n);
        break;
      case 1:
        if (
          !et &&
          (yr(n, t),
          (r = n.stateNode),
          typeof r.componentWillUnmount == 'function')
        )
          try {
            ((r.props = n.memoizedProps),
              (r.state = n.memoizedState),
              r.componentWillUnmount());
          } catch (f) {
            ze(n, t, f);
          }
        Nn(e, t, n);
        break;
      case 21:
        Nn(e, t, n);
        break;
      case 22:
        n.mode & 1
          ? ((et = (r = et) || n.memoizedState !== null), Nn(e, t, n), (et = r))
          : Nn(e, t, n);
        break;
      default:
        Nn(e, t, n);
    }
  }
  function tc(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      (n === null && (n = e.stateNode = new Kd()),
        t.forEach(function (r) {
          var l = np.bind(null, e, r);
          n.has(r) || (n.add(r), r.then(l, l));
        }));
    }
  }
  function Bt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var l = n[r];
        try {
          var i = e,
            a = t,
            f = a;
          e: for (; f !== null; ) {
            switch (f.tag) {
              case 5:
                (($e = f.stateNode), (Ut = !1));
                break e;
              case 3:
                (($e = f.stateNode.containerInfo), (Ut = !0));
                break e;
              case 4:
                (($e = f.stateNode.containerInfo), (Ut = !0));
                break e;
            }
            f = f.return;
          }
          if ($e === null) throw Error(s(160));
          (ec(i, a, l), ($e = null), (Ut = !1));
          var p = l.alternate;
          (p !== null && (p.return = null), (l.return = null));
        } catch (x) {
          ze(l, t, x);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) (nc(t, e), (t = t.sibling));
  }
  function nc(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Bt(t, e), qt(e), r & 4)) {
          try {
            (ul(3, e, e.return), yo(3, e));
          } catch (V) {
            ze(e, e.return, V);
          }
          try {
            ul(5, e, e.return);
          } catch (V) {
            ze(e, e.return, V);
          }
        }
        break;
      case 1:
        (Bt(t, e), qt(e), r & 512 && n !== null && yr(n, n.return));
        break;
      case 5:
        if (
          (Bt(t, e),
          qt(e),
          r & 512 && n !== null && yr(n, n.return),
          e.flags & 32)
        ) {
          var l = e.stateNode;
          try {
            pn(l, '');
          } catch (V) {
            ze(e, e.return, V);
          }
        }
        if (r & 4 && ((l = e.stateNode), l != null)) {
          var i = e.memoizedProps,
            a = n !== null ? n.memoizedProps : i,
            f = e.type,
            p = e.updateQueue;
          if (((e.updateQueue = null), p !== null))
            try {
              (f === 'input' &&
                i.type === 'radio' &&
                i.name != null &&
                bt(l, i),
                _r(f, a));
              var x = _r(f, i);
              for (a = 0; a < p.length; a += 2) {
                var _ = p[a],
                  T = p[a + 1];
                _ === 'style'
                  ? Nl(l, T)
                  : _ === 'dangerouslySetInnerHTML'
                    ? dn(l, T)
                    : _ === 'children'
                      ? pn(l, T)
                      : $(l, _, T, x);
              }
              switch (f) {
                case 'input':
                  Zn(l, i);
                  break;
                case 'textarea':
                  Nr(l, i);
                  break;
                case 'select':
                  var M = l._wrapperState.wasMultiple;
                  l._wrapperState.wasMultiple = !!i.multiple;
                  var F = i.value;
                  F != null
                    ? Tt(l, !!i.multiple, F, !1)
                    : M !== !!i.multiple &&
                      (i.defaultValue != null
                        ? Tt(l, !!i.multiple, i.defaultValue, !0)
                        : Tt(l, !!i.multiple, i.multiple ? [] : '', !1));
              }
              l[Zr] = i;
            } catch (V) {
              ze(e, e.return, V);
            }
        }
        break;
      case 6:
        if ((Bt(t, e), qt(e), r & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          ((l = e.stateNode), (i = e.memoizedProps));
          try {
            l.nodeValue = i;
          } catch (V) {
            ze(e, e.return, V);
          }
        }
        break;
      case 3:
        if (
          (Bt(t, e), qt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Ur(t.containerInfo);
          } catch (V) {
            ze(e, e.return, V);
          }
        break;
      case 4:
        (Bt(t, e), qt(e));
        break;
      case 13:
        (Bt(t, e),
          qt(e),
          (l = e.child),
          l.flags & 8192 &&
            ((i = l.memoizedState !== null),
            (l.stateNode.isHidden = i),
            !i ||
              (l.alternate !== null && l.alternate.memoizedState !== null) ||
              (hu = Le())),
          r & 4 && tc(e));
        break;
      case 22:
        if (
          ((_ = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((et = (x = et) || _), Bt(t, e), (et = x)) : Bt(t, e),
          qt(e),
          r & 8192)
        ) {
          if (
            ((x = e.memoizedState !== null),
            (e.stateNode.isHidden = x) && !_ && (e.mode & 1) !== 0)
          )
            for (U = e, _ = e.child; _ !== null; ) {
              for (T = U = _; U !== null; ) {
                switch (((M = U), (F = M.child), M.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    ul(4, M, M.return);
                    break;
                  case 1:
                    yr(M, M.return);
                    var B = M.stateNode;
                    if (typeof B.componentWillUnmount == 'function') {
                      ((r = M), (n = M.return));
                      try {
                        ((t = r),
                          (B.props = t.memoizedProps),
                          (B.state = t.memoizedState),
                          B.componentWillUnmount());
                      } catch (V) {
                        ze(r, n, V);
                      }
                    }
                    break;
                  case 5:
                    yr(M, M.return);
                    break;
                  case 22:
                    if (M.memoizedState !== null) {
                      oc(T);
                      continue;
                    }
                }
                F !== null ? ((F.return = M), (U = F)) : oc(T);
              }
              _ = _.sibling;
            }
          e: for (_ = null, T = e; ; ) {
            if (T.tag === 5) {
              if (_ === null) {
                _ = T;
                try {
                  ((l = T.stateNode),
                    x
                      ? ((i = l.style),
                        typeof i.setProperty == 'function'
                          ? i.setProperty('display', 'none', 'important')
                          : (i.display = 'none'))
                      : ((f = T.stateNode),
                        (p = T.memoizedProps.style),
                        (a =
                          p != null && p.hasOwnProperty('display')
                            ? p.display
                            : null),
                        (f.style.display = Dl('display', a))));
                } catch (V) {
                  ze(e, e.return, V);
                }
              }
            } else if (T.tag === 6) {
              if (_ === null)
                try {
                  T.stateNode.nodeValue = x ? '' : T.memoizedProps;
                } catch (V) {
                  ze(e, e.return, V);
                }
            } else if (
              ((T.tag !== 22 && T.tag !== 23) ||
                T.memoizedState === null ||
                T === e) &&
              T.child !== null
            ) {
              ((T.child.return = T), (T = T.child));
              continue;
            }
            if (T === e) break e;
            for (; T.sibling === null; ) {
              if (T.return === null || T.return === e) break e;
              (_ === T && (_ = null), (T = T.return));
            }
            (_ === T && (_ = null),
              (T.sibling.return = T.return),
              (T = T.sibling));
          }
        }
        break;
      case 19:
        (Bt(t, e), qt(e), r & 4 && tc(e));
        break;
      case 21:
        break;
      default:
        (Bt(t, e), qt(e));
    }
  }
  function qt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Ja(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(s(160));
        }
        switch (r.tag) {
          case 5:
            var l = r.stateNode;
            r.flags & 32 && (pn(l, ''), (r.flags &= -33));
            var i = ba(e);
            fu(e, i, l);
            break;
          case 3:
          case 4:
            var a = r.stateNode.containerInfo,
              f = ba(e);
            cu(e, f, a);
            break;
          default:
            throw Error(s(161));
        }
      } catch (p) {
        ze(e, e.return, p);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Yd(e, t, n) {
    ((U = e), rc(e));
  }
  function rc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; U !== null; ) {
      var l = U,
        i = l.child;
      if (l.tag === 22 && r) {
        var a = l.memoizedState !== null || go;
        if (!a) {
          var f = l.alternate,
            p = (f !== null && f.memoizedState !== null) || et;
          f = go;
          var x = et;
          if (((go = a), (et = p) && !x))
            for (U = l; U !== null; )
              ((a = U),
                (p = a.child),
                a.tag === 22 && a.memoizedState !== null
                  ? ic(l)
                  : p !== null
                    ? ((p.return = a), (U = p))
                    : ic(l));
          for (; i !== null; ) ((U = i), rc(i), (i = i.sibling));
          ((U = l), (go = f), (et = x));
        }
        lc(e);
      } else
        (l.subtreeFlags & 8772) !== 0 && i !== null
          ? ((i.return = l), (U = i))
          : lc(e);
    }
  }
  function lc(e) {
    for (; U !== null; ) {
      var t = U;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                et || yo(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !et)
                  if (n === null) r.componentDidMount();
                  else {
                    var l =
                      t.elementType === t.type
                        ? n.memoizedProps
                        : Ft(t.type, n.memoizedProps);
                    r.componentDidUpdate(
                      l,
                      n.memoizedState,
                      r.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var i = t.updateQueue;
                i !== null && oa(t, i, r);
                break;
              case 3:
                var a = t.updateQueue;
                if (a !== null) {
                  if (((n = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  oa(t, a, n);
                }
                break;
              case 5:
                var f = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = f;
                  var p = t.memoizedProps;
                  switch (t.type) {
                    case 'button':
                    case 'input':
                    case 'select':
                    case 'textarea':
                      p.autoFocus && n.focus();
                      break;
                    case 'img':
                      p.src && (n.src = p.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var x = t.alternate;
                  if (x !== null) {
                    var _ = x.memoizedState;
                    if (_ !== null) {
                      var T = _.dehydrated;
                      T !== null && Ur(T);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(s(163));
            }
          et || (t.flags & 512 && au(t));
        } catch (M) {
          ze(t, t.return, M);
        }
      }
      if (t === e) {
        U = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        ((n.return = t.return), (U = n));
        break;
      }
      U = t.return;
    }
  }
  function oc(e) {
    for (; U !== null; ) {
      var t = U;
      if (t === e) {
        U = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        ((n.return = t.return), (U = n));
        break;
      }
      U = t.return;
    }
  }
  function ic(e) {
    for (; U !== null; ) {
      var t = U;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              yo(4, t);
            } catch (p) {
              ze(t, n, p);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == 'function') {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (p) {
                ze(t, l, p);
              }
            }
            var i = t.return;
            try {
              au(t);
            } catch (p) {
              ze(t, i, p);
            }
            break;
          case 5:
            var a = t.return;
            try {
              au(t);
            } catch (p) {
              ze(t, a, p);
            }
        }
      } catch (p) {
        ze(t, t.return, p);
      }
      if (t === e) {
        U = null;
        break;
      }
      var f = t.sibling;
      if (f !== null) {
        ((f.return = t.return), (U = f));
        break;
      }
      U = t.return;
    }
  }
  var Gd = Math.ceil,
    mo = Y.ReactCurrentDispatcher,
    du = Y.ReactCurrentOwner,
    Dt = Y.ReactCurrentBatchConfig,
    he = 0,
    Ve = null,
    Ie = null,
    Qe = 0,
    kt = 0,
    mr = xn(0),
    Fe = 0,
    sl = null,
    $n = 0,
    wo = 0,
    pu = 0,
    al = null,
    ft = null,
    hu = 0,
    wr = 1 / 0,
    cn = null,
    ko = !1,
    vu = null,
    Mn = null,
    So = !1,
    _n = null,
    xo = 0,
    cl = 0,
    gu = null,
    Co = -1,
    Eo = 0;
  function rt() {
    return (he & 6) !== 0 ? Le() : Co !== -1 ? Co : (Co = Le());
  }
  function Tn(e) {
    return (e.mode & 1) === 0
      ? 1
      : (he & 2) !== 0 && Qe !== 0
        ? Qe & -Qe
        : zd.transition !== null
          ? (Eo === 0 && (Eo = bu()), Eo)
          : ((e = we),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : ss(e.type))),
            e);
  }
  function Vt(e, t, n, r) {
    if (50 < cl) throw ((cl = 0), (gu = null), Error(s(185)));
    (Or(e, n, r),
      ((he & 2) === 0 || e !== Ve) &&
        (e === Ve && ((he & 2) === 0 && (wo |= n), Fe === 4 && Pn(e, Qe)),
        dt(e, r),
        n === 1 &&
          he === 0 &&
          (t.mode & 1) === 0 &&
          ((wr = Le() + 500), ql && En())));
  }
  function dt(e, t) {
    var n = e.callbackNode;
    zf(e, t);
    var r = zl(e, e === Ve ? Qe : 0);
    if (r === 0)
      (n !== null && Zu(n), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((n != null && Zu(n), t === 1))
        (e.tag === 0 ? Pd(sc.bind(null, e)) : Xs(sc.bind(null, e)),
          Nd(function () {
            (he & 6) === 0 && En();
          }),
          (n = null));
      else {
        switch (es(r)) {
          case 1:
            n = Go;
            break;
          case 4:
            n = qu;
            break;
          case 16:
            n = Ml;
            break;
          case 536870912:
            n = Ju;
            break;
          default:
            n = Ml;
        }
        n = gc(n, uc.bind(null, e));
      }
      ((e.callbackPriority = t), (e.callbackNode = n));
    }
  }
  function uc(e, t) {
    if (((Co = -1), (Eo = 0), (he & 6) !== 0)) throw Error(s(327));
    var n = e.callbackNode;
    if (kr() && e.callbackNode !== n) return null;
    var r = zl(e, e === Ve ? Qe : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = Ro(e, r);
    else {
      t = r;
      var l = he;
      he |= 2;
      var i = cc();
      (Ve !== e || Qe !== t) && ((cn = null), (wr = Le() + 500), Kn(e, t));
      do
        try {
          Jd();
          break;
        } catch (f) {
          ac(e, f);
        }
      while (!0);
      (Oi(),
        (mo.current = i),
        (he = l),
        Ie !== null ? (t = 0) : ((Ve = null), (Qe = 0), (t = Fe)));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((l = Zo(e)), l !== 0 && ((r = l), (t = yu(e, l)))),
        t === 1)
      )
        throw ((n = sl), Kn(e, 0), Pn(e, r), dt(e, Le()), n);
      if (t === 6) Pn(e, r);
      else {
        if (
          ((l = e.current.alternate),
          (r & 30) === 0 &&
            !Zd(l) &&
            ((t = Ro(e, r)),
            t === 2 && ((i = Zo(e)), i !== 0 && ((r = i), (t = yu(e, i)))),
            t === 1))
        )
          throw ((n = sl), Kn(e, 0), Pn(e, r), dt(e, Le()), n);
        switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            Xn(e, ft, cn);
            break;
          case 3:
            if (
              (Pn(e, r),
              (r & 130023424) === r && ((t = hu + 500 - Le()), 10 < t))
            ) {
              if (zl(e, 0) !== 0) break;
              if (((l = e.suspendedLanes), (l & r) !== r)) {
                (rt(), (e.pingedLanes |= e.suspendedLanes & l));
                break;
              }
              e.timeoutHandle = Ci(Xn.bind(null, e, ft, cn), t);
              break;
            }
            Xn(e, ft, cn);
            break;
          case 4:
            if ((Pn(e, r), (r & 4194240) === r)) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var a = 31 - It(r);
              ((i = 1 << a), (a = t[a]), a > l && (l = a), (r &= ~i));
            }
            if (
              ((r = l),
              (r = Le() - r),
              (r =
                (120 > r
                  ? 120
                  : 480 > r
                    ? 480
                    : 1080 > r
                      ? 1080
                      : 1920 > r
                        ? 1920
                        : 3e3 > r
                          ? 3e3
                          : 4320 > r
                            ? 4320
                            : 1960 * Gd(r / 1960)) - r),
              10 < r)
            ) {
              e.timeoutHandle = Ci(Xn.bind(null, e, ft, cn), r);
              break;
            }
            Xn(e, ft, cn);
            break;
          case 5:
            Xn(e, ft, cn);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return (dt(e, Le()), e.callbackNode === n ? uc.bind(null, e) : null);
  }
  function yu(e, t) {
    var n = al;
    return (
      e.current.memoizedState.isDehydrated && (Kn(e, t).flags |= 256),
      (e = Ro(e, t)),
      e !== 2 && ((t = ft), (ft = n), t !== null && mu(t)),
      e
    );
  }
  function mu(e) {
    ft === null ? (ft = e) : ft.push.apply(ft, e);
  }
  function Zd(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var r = 0; r < n.length; r++) {
            var l = n[r],
              i = l.getSnapshot;
            l = l.value;
            try {
              if (!At(i(), l)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        ((n.return = t), (t = n));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Pn(e, t) {
    for (
      t &= ~pu,
        t &= ~wo,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;
    ) {
      var n = 31 - It(t),
        r = 1 << n;
      ((e[n] = -1), (t &= ~r));
    }
  }
  function sc(e) {
    if ((he & 6) !== 0) throw Error(s(327));
    kr();
    var t = zl(e, 0);
    if ((t & 1) === 0) return (dt(e, Le()), null);
    var n = Ro(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Zo(e);
      r !== 0 && ((t = r), (n = yu(e, r)));
    }
    if (n === 1) throw ((n = sl), Kn(e, 0), Pn(e, t), dt(e, Le()), n);
    if (n === 6) throw Error(s(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      Xn(e, ft, cn),
      dt(e, Le()),
      null
    );
  }
  function wu(e, t) {
    var n = he;
    he |= 1;
    try {
      return e(t);
    } finally {
      ((he = n), he === 0 && ((wr = Le() + 500), ql && En()));
    }
  }
  function Qn(e) {
    _n !== null && _n.tag === 0 && (he & 6) === 0 && kr();
    var t = he;
    he |= 1;
    var n = Dt.transition,
      r = we;
    try {
      if (((Dt.transition = null), (we = 1), e)) return e();
    } finally {
      ((we = r), (Dt.transition = n), (he = t), (he & 6) === 0 && En());
    }
  }
  function ku() {
    ((kt = mr.current), Ce(mr));
  }
  function Kn(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), Dd(n)), Ie !== null))
      for (n = Ie.return; n !== null; ) {
        var r = n;
        switch ((_i(r), r.tag)) {
          case 1:
            ((r = r.type.childContextTypes), r != null && Gl());
            break;
          case 3:
            (vr(), Ce(st), Ce(qe), Hi());
            break;
          case 5:
            Bi(r);
            break;
          case 4:
            vr();
            break;
          case 13:
            Ce(Ne);
            break;
          case 19:
            Ce(Ne);
            break;
          case 10:
            Ii(r.type._context);
            break;
          case 22:
          case 23:
            ku();
        }
        n = n.return;
      }
    if (
      ((Ve = e),
      (Ie = e = zn(e.current, null)),
      (Qe = kt = t),
      (Fe = 0),
      (sl = null),
      (pu = wo = $n = 0),
      (ft = al = null),
      Vn !== null)
    ) {
      for (t = 0; t < Vn.length; t++)
        if (((n = Vn[t]), (r = n.interleaved), r !== null)) {
          n.interleaved = null;
          var l = r.next,
            i = n.pending;
          if (i !== null) {
            var a = i.next;
            ((i.next = l), (r.next = a));
          }
          n.pending = r;
        }
      Vn = null;
    }
    return e;
  }
  function ac(e, t) {
    do {
      var n = Ie;
      try {
        if ((Oi(), (uo.current = fo), so)) {
          for (var r = Me.memoizedState; r !== null; ) {
            var l = r.queue;
            (l !== null && (l.pending = null), (r = r.next));
          }
          so = !1;
        }
        if (
          ((Wn = 0),
          (Be = je = Me = null),
          (nl = !1),
          (rl = 0),
          (du.current = null),
          n === null || n.return === null)
        ) {
          ((Fe = 1), (sl = t), (Ie = null));
          break;
        }
        e: {
          var i = e,
            a = n.return,
            f = n,
            p = t;
          if (
            ((t = Qe),
            (f.flags |= 32768),
            p !== null && typeof p == 'object' && typeof p.then == 'function')
          ) {
            var x = p,
              _ = f,
              T = _.tag;
            if ((_.mode & 1) === 0 && (T === 0 || T === 11 || T === 15)) {
              var M = _.alternate;
              M
                ? ((_.updateQueue = M.updateQueue),
                  (_.memoizedState = M.memoizedState),
                  (_.lanes = M.lanes))
                : ((_.updateQueue = null), (_.memoizedState = null));
            }
            var F = Oa(a);
            if (F !== null) {
              ((F.flags &= -257),
                Ia(F, a, f, i, t),
                F.mode & 1 && La(i, x, t),
                (t = F),
                (p = x));
              var B = t.updateQueue;
              if (B === null) {
                var V = new Set();
                (V.add(p), (t.updateQueue = V));
              } else B.add(p);
              break e;
            } else {
              if ((t & 1) === 0) {
                (La(i, x, t), Su());
                break e;
              }
              p = Error(s(426));
            }
          } else if (Ee && f.mode & 1) {
            var Oe = Oa(a);
            if (Oe !== null) {
              ((Oe.flags & 65536) === 0 && (Oe.flags |= 256),
                Ia(Oe, a, f, i, t),
                zi(gr(p, f)));
              break e;
            }
          }
          ((i = p = gr(p, f)),
            Fe !== 4 && (Fe = 2),
            al === null ? (al = [i]) : al.push(i),
            (i = a));
          do {
            switch (i.tag) {
              case 3:
                ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                var w = Pa(i, p, t);
                la(i, w);
                break e;
              case 1:
                f = p;
                var v = i.type,
                  k = i.stateNode;
                if (
                  (i.flags & 128) === 0 &&
                  (typeof v.getDerivedStateFromError == 'function' ||
                    (k !== null &&
                      typeof k.componentDidCatch == 'function' &&
                      (Mn === null || !Mn.has(k))))
                ) {
                  ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                  var z = za(i, f, t);
                  la(i, z);
                  break e;
                }
            }
            i = i.return;
          } while (i !== null);
        }
        dc(n);
      } catch (H) {
        ((t = H), Ie === n && n !== null && (Ie = n = n.return));
        continue;
      }
      break;
    } while (!0);
  }
  function cc() {
    var e = mo.current;
    return ((mo.current = fo), e === null ? fo : e);
  }
  function Su() {
    ((Fe === 0 || Fe === 3 || Fe === 2) && (Fe = 4),
      Ve === null ||
        (($n & 268435455) === 0 && (wo & 268435455) === 0) ||
        Pn(Ve, Qe));
  }
  function Ro(e, t) {
    var n = he;
    he |= 2;
    var r = cc();
    (Ve !== e || Qe !== t) && ((cn = null), Kn(e, t));
    do
      try {
        qd();
        break;
      } catch (l) {
        ac(e, l);
      }
    while (!0);
    if ((Oi(), (he = n), (mo.current = r), Ie !== null)) throw Error(s(261));
    return ((Ve = null), (Qe = 0), Fe);
  }
  function qd() {
    for (; Ie !== null; ) fc(Ie);
  }
  function Jd() {
    for (; Ie !== null && !Cf(); ) fc(Ie);
  }
  function fc(e) {
    var t = vc(e.alternate, e, kt);
    ((e.memoizedProps = e.pendingProps),
      t === null ? dc(e) : (Ie = t),
      (du.current = null));
  }
  function dc(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), (t.flags & 32768) === 0)) {
        if (((n = $d(n, t, kt)), n !== null)) {
          Ie = n;
          return;
        }
      } else {
        if (((n = Qd(n, t)), n !== null)) {
          ((n.flags &= 32767), (Ie = n));
          return;
        }
        if (e !== null)
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((Fe = 6), (Ie = null));
          return;
        }
      }
      if (((t = t.sibling), t !== null)) {
        Ie = t;
        return;
      }
      Ie = t = e;
    } while (t !== null);
    Fe === 0 && (Fe = 5);
  }
  function Xn(e, t, n) {
    var r = we,
      l = Dt.transition;
    try {
      ((Dt.transition = null), (we = 1), bd(e, t, n, r));
    } finally {
      ((Dt.transition = l), (we = r));
    }
    return null;
  }
  function bd(e, t, n, r) {
    do kr();
    while (_n !== null);
    if ((he & 6) !== 0) throw Error(s(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
      throw Error(s(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var i = n.lanes | n.childLanes;
    if (
      (Lf(e, i),
      e === Ve && ((Ie = Ve = null), (Qe = 0)),
      ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
        So ||
        ((So = !0),
        gc(Ml, function () {
          return (kr(), null);
        })),
      (i = (n.flags & 15990) !== 0),
      (n.subtreeFlags & 15990) !== 0 || i)
    ) {
      ((i = Dt.transition), (Dt.transition = null));
      var a = we;
      we = 1;
      var f = he;
      ((he |= 4),
        (du.current = null),
        Xd(e, n),
        nc(n, e),
        wd(Si),
        (Il = !!ki),
        (Si = ki = null),
        (e.current = n),
        Yd(n),
        Ef(),
        (he = f),
        (we = a),
        (Dt.transition = i));
    } else e.current = n;
    if (
      (So && ((So = !1), (_n = e), (xo = l)),
      (i = e.pendingLanes),
      i === 0 && (Mn = null),
      Nf(n.stateNode),
      dt(e, Le()),
      t !== null)
    )
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }));
    if (ko) throw ((ko = !1), (e = vu), (vu = null), e);
    return (
      (xo & 1) !== 0 && e.tag !== 0 && kr(),
      (i = e.pendingLanes),
      (i & 1) !== 0 ? (e === gu ? cl++ : ((cl = 0), (gu = e))) : (cl = 0),
      En(),
      null
    );
  }
  function kr() {
    if (_n !== null) {
      var e = es(xo),
        t = Dt.transition,
        n = we;
      try {
        if (((Dt.transition = null), (we = 16 > e ? 16 : e), _n === null))
          var r = !1;
        else {
          if (((e = _n), (_n = null), (xo = 0), (he & 6) !== 0))
            throw Error(s(331));
          var l = he;
          for (he |= 4, U = e.current; U !== null; ) {
            var i = U,
              a = i.child;
            if ((U.flags & 16) !== 0) {
              var f = i.deletions;
              if (f !== null) {
                for (var p = 0; p < f.length; p++) {
                  var x = f[p];
                  for (U = x; U !== null; ) {
                    var _ = U;
                    switch (_.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ul(8, _, i);
                    }
                    var T = _.child;
                    if (T !== null) ((T.return = _), (U = T));
                    else
                      for (; U !== null; ) {
                        _ = U;
                        var M = _.sibling,
                          F = _.return;
                        if ((qa(_), _ === x)) {
                          U = null;
                          break;
                        }
                        if (M !== null) {
                          ((M.return = F), (U = M));
                          break;
                        }
                        U = F;
                      }
                  }
                }
                var B = i.alternate;
                if (B !== null) {
                  var V = B.child;
                  if (V !== null) {
                    B.child = null;
                    do {
                      var Oe = V.sibling;
                      ((V.sibling = null), (V = Oe));
                    } while (V !== null);
                  }
                }
                U = i;
              }
            }
            if ((i.subtreeFlags & 2064) !== 0 && a !== null)
              ((a.return = i), (U = a));
            else
              e: for (; U !== null; ) {
                if (((i = U), (i.flags & 2048) !== 0))
                  switch (i.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ul(9, i, i.return);
                  }
                var w = i.sibling;
                if (w !== null) {
                  ((w.return = i.return), (U = w));
                  break e;
                }
                U = i.return;
              }
          }
          var v = e.current;
          for (U = v; U !== null; ) {
            a = U;
            var k = a.child;
            if ((a.subtreeFlags & 2064) !== 0 && k !== null)
              ((k.return = a), (U = k));
            else
              e: for (a = v; U !== null; ) {
                if (((f = U), (f.flags & 2048) !== 0))
                  try {
                    switch (f.tag) {
                      case 0:
                      case 11:
                      case 15:
                        yo(9, f);
                    }
                  } catch (H) {
                    ze(f, f.return, H);
                  }
                if (f === a) {
                  U = null;
                  break e;
                }
                var z = f.sibling;
                if (z !== null) {
                  ((z.return = f.return), (U = z));
                  break e;
                }
                U = f.return;
              }
          }
          if (
            ((he = l),
            En(),
            Xt && typeof Xt.onPostCommitFiberRoot == 'function')
          )
            try {
              Xt.onPostCommitFiberRoot(_l, e);
            } catch {}
          r = !0;
        }
        return r;
      } finally {
        ((we = n), (Dt.transition = t));
      }
    }
    return !1;
  }
  function pc(e, t, n) {
    ((t = gr(n, t)),
      (t = Pa(e, t, 1)),
      (e = Dn(e, t, 1)),
      (t = rt()),
      e !== null && (Or(e, 1, t), dt(e, t)));
  }
  function ze(e, t, n) {
    if (e.tag === 3) pc(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          pc(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof r.componentDidCatch == 'function' &&
              (Mn === null || !Mn.has(r)))
          ) {
            ((e = gr(n, e)),
              (e = za(t, e, 1)),
              (t = Dn(t, e, 1)),
              (e = rt()),
              t !== null && (Or(t, 1, e), dt(t, e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function ep(e, t, n) {
    var r = e.pingCache;
    (r !== null && r.delete(t),
      (t = rt()),
      (e.pingedLanes |= e.suspendedLanes & n),
      Ve === e &&
        (Qe & n) === n &&
        (Fe === 4 || (Fe === 3 && (Qe & 130023424) === Qe && 500 > Le() - hu)
          ? Kn(e, 0)
          : (pu |= n)),
      dt(e, t));
  }
  function hc(e, t) {
    t === 0 &&
      ((e.mode & 1) === 0
        ? (t = 1)
        : ((t = Pl), (Pl <<= 1), (Pl & 130023424) === 0 && (Pl = 4194304)));
    var n = rt();
    ((e = un(e, t)), e !== null && (Or(e, t, n), dt(e, n)));
  }
  function tp(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), hc(e, n));
  }
  function np(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    (r !== null && r.delete(t), hc(e, n));
  }
  var vc;
  vc = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || st.current) ct = !0;
      else {
        if ((e.lanes & n) === 0 && (t.flags & 128) === 0)
          return ((ct = !1), Wd(e, t, n));
        ct = (e.flags & 131072) !== 0;
      }
    else ((ct = !1), Ee && (t.flags & 1048576) !== 0 && Ys(t, bl, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        (vo(e, t), (e = t.pendingProps));
        var l = sr(t, qe.current);
        (hr(t, n), (l = Qi(null, t, r, e, l, n)));
        var i = Ki();
        return (
          (t.flags |= 1),
          typeof l == 'object' &&
          l !== null &&
          typeof l.render == 'function' &&
          l.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              at(r) ? ((i = !0), Zl(t)) : (i = !1),
              (t.memoizedState =
                l.state !== null && l.state !== void 0 ? l.state : null),
              Fi(t),
              (l.updater = po),
              (t.stateNode = l),
              (l._reactInternals = t),
              Ji(t, r, e, n),
              (t = nu(null, t, r, !0, i, n)))
            : ((t.tag = 0), Ee && i && Mi(t), nt(null, t, l, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            (vo(e, t),
            (e = t.pendingProps),
            (l = r._init),
            (r = l(r._payload)),
            (t.type = r),
            (l = t.tag = lp(r)),
            (e = Ft(r, e)),
            l)
          ) {
            case 0:
              t = tu(null, t, r, e, n);
              break e;
            case 1:
              t = Va(null, t, r, e, n);
              break e;
            case 11:
              t = Aa(null, t, r, e, n);
              break e;
            case 14:
              t = ja(null, t, r, Ft(r.type, e), n);
              break e;
          }
          throw Error(s(306, r, ''));
        }
        return t;
      case 0:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : Ft(r, l)),
          tu(e, t, r, l, n)
        );
      case 1:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : Ft(r, l)),
          Va(e, t, r, l, n)
        );
      case 3:
        e: {
          if ((Ha(t), e === null)) throw Error(s(387));
          ((r = t.pendingProps),
            (i = t.memoizedState),
            (l = i.element),
            ra(e, t),
            oo(t, r, null, n));
          var a = t.memoizedState;
          if (((r = a.element), i.isDehydrated))
            if (
              ((i = {
                element: r,
                isDehydrated: !1,
                cache: a.cache,
                pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
                transitions: a.transitions,
              }),
              (t.updateQueue.baseState = i),
              (t.memoizedState = i),
              t.flags & 256)
            ) {
              ((l = gr(Error(s(423)), t)), (t = Wa(e, t, r, n, l)));
              break e;
            } else if (r !== l) {
              ((l = gr(Error(s(424)), t)), (t = Wa(e, t, r, n, l)));
              break e;
            } else
              for (
                wt = Sn(t.stateNode.containerInfo.firstChild),
                  mt = t,
                  Ee = !0,
                  jt = null,
                  n = ta(t, null, r, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if ((fr(), r === l)) {
              t = an(e, t, n);
              break e;
            }
            nt(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          ia(t),
          e === null && Pi(t),
          (r = t.type),
          (l = t.pendingProps),
          (i = e !== null ? e.memoizedProps : null),
          (a = l.children),
          xi(r, l) ? (a = null) : i !== null && xi(r, i) && (t.flags |= 32),
          Ba(e, t),
          nt(e, t, a, n),
          t.child
        );
      case 6:
        return (e === null && Pi(t), null);
      case 13:
        return $a(e, t, n);
      case 4:
        return (
          Ui(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = dr(t, null, r, n)) : nt(e, t, r, n),
          t.child
        );
      case 11:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : Ft(r, l)),
          Aa(e, t, r, l, n)
        );
      case 7:
        return (nt(e, t, t.pendingProps, n), t.child);
      case 8:
        return (nt(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (nt(e, t, t.pendingProps.children, n), t.child);
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (l = t.pendingProps),
            (i = t.memoizedProps),
            (a = l.value),
            ke(no, r._currentValue),
            (r._currentValue = a),
            i !== null)
          )
            if (At(i.value, a)) {
              if (i.children === l.children && !st.current) {
                t = an(e, t, n);
                break e;
              }
            } else
              for (i = t.child, i !== null && (i.return = t); i !== null; ) {
                var f = i.dependencies;
                if (f !== null) {
                  a = i.child;
                  for (var p = f.firstContext; p !== null; ) {
                    if (p.context === r) {
                      if (i.tag === 1) {
                        ((p = sn(-1, n & -n)), (p.tag = 2));
                        var x = i.updateQueue;
                        if (x !== null) {
                          x = x.shared;
                          var _ = x.pending;
                          (_ === null
                            ? (p.next = p)
                            : ((p.next = _.next), (_.next = p)),
                            (x.pending = p));
                        }
                      }
                      ((i.lanes |= n),
                        (p = i.alternate),
                        p !== null && (p.lanes |= n),
                        Ai(i.return, n, t),
                        (f.lanes |= n));
                      break;
                    }
                    p = p.next;
                  }
                } else if (i.tag === 10) a = i.type === t.type ? null : i.child;
                else if (i.tag === 18) {
                  if (((a = i.return), a === null)) throw Error(s(341));
                  ((a.lanes |= n),
                    (f = a.alternate),
                    f !== null && (f.lanes |= n),
                    Ai(a, n, t),
                    (a = i.sibling));
                } else a = i.child;
                if (a !== null) a.return = i;
                else
                  for (a = i; a !== null; ) {
                    if (a === t) {
                      a = null;
                      break;
                    }
                    if (((i = a.sibling), i !== null)) {
                      ((i.return = a.return), (a = i));
                      break;
                    }
                    a = a.return;
                  }
                i = a;
              }
          (nt(e, t, l.children, n), (t = t.child));
        }
        return t;
      case 9:
        return (
          (l = t.type),
          (r = t.pendingProps.children),
          hr(t, n),
          (l = Et(l)),
          (r = r(l)),
          (t.flags |= 1),
          nt(e, t, r, n),
          t.child
        );
      case 14:
        return (
          (r = t.type),
          (l = Ft(r, t.pendingProps)),
          (l = Ft(r.type, l)),
          ja(e, t, r, l, n)
        );
      case 15:
        return Fa(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : Ft(r, l)),
          vo(e, t),
          (t.tag = 1),
          at(r) ? ((e = !0), Zl(t)) : (e = !1),
          hr(t, n),
          _a(t, r, l),
          Ji(t, r, l, n),
          nu(null, t, r, !0, e, n)
        );
      case 19:
        return Ka(e, t, n);
      case 22:
        return Ua(e, t, n);
    }
    throw Error(s(156, t.tag));
  };
  function gc(e, t) {
    return Gu(e, t);
  }
  function rp(e, t, n, r) {
    ((this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Nt(e, t, n, r) {
    return new rp(e, t, n, r);
  }
  function xu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function lp(e) {
    if (typeof e == 'function') return xu(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === Te)) return 11;
      if (e === Ke) return 14;
    }
    return 2;
  }
  function zn(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = Nt(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 14680064),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function Do(e, t, n, r, l, i) {
    var a = 2;
    if (((r = e), typeof e == 'function')) xu(e) && (a = 1);
    else if (typeof e == 'string') a = 5;
    else
      e: switch (e) {
        case Q:
          return Yn(n.children, l, i, t);
        case te:
          ((a = 8), (l |= 8));
          break;
        case ve:
          return (
            (e = Nt(12, n, t, l | 2)),
            (e.elementType = ve),
            (e.lanes = i),
            e
          );
        case Se:
          return (
            (e = Nt(13, n, t, l)),
            (e.elementType = Se),
            (e.lanes = i),
            e
          );
        case Pe:
          return (
            (e = Nt(19, n, t, l)),
            (e.elementType = Pe),
            (e.lanes = i),
            e
          );
        case ce:
          return No(n, l, i, t);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case me:
                a = 10;
                break e;
              case de:
                a = 9;
                break e;
              case Te:
                a = 11;
                break e;
              case Ke:
                a = 14;
                break e;
              case Ae:
                ((a = 16), (r = null));
                break e;
            }
          throw Error(s(130, e == null ? e : typeof e, ''));
      }
    return (
      (t = Nt(a, n, t, l)),
      (t.elementType = e),
      (t.type = r),
      (t.lanes = i),
      t
    );
  }
  function Yn(e, t, n, r) {
    return ((e = Nt(7, e, r, t)), (e.lanes = n), e);
  }
  function No(e, t, n, r) {
    return (
      (e = Nt(22, e, r, t)),
      (e.elementType = ce),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function Cu(e, t, n) {
    return ((e = Nt(6, e, null, t)), (e.lanes = n), e);
  }
  function Eu(e, t, n) {
    return (
      (t = Nt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function op(e, t, n, r, l) {
    ((this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = qo(0)),
      (this.expirationTimes = qo(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = qo(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = l),
      (this.mutableSourceEagerHydrationData = null));
  }
  function Ru(e, t, n, r, l, i, a, f, p) {
    return (
      (e = new op(e, t, n, f, p)),
      t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
      (i = Nt(3, null, null, t)),
      (e.current = i),
      (i.stateNode = e),
      (i.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Fi(i),
      e
    );
  }
  function ip(e, t, n) {
    var r =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: ee,
      key: r == null ? null : '' + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function yc(e) {
    if (!e) return Cn;
    e = e._reactInternals;
    e: {
      if (An(e) !== e || e.tag !== 1) throw Error(s(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (at(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(s(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (at(n)) return Qs(e, n, t);
    }
    return t;
  }
  function mc(e, t, n, r, l, i, a, f, p) {
    return (
      (e = Ru(n, r, !0, e, l, i, a, f, p)),
      (e.context = yc(null)),
      (n = e.current),
      (r = rt()),
      (l = Tn(n)),
      (i = sn(r, l)),
      (i.callback = t ?? null),
      Dn(n, i, l),
      (e.current.lanes = l),
      Or(e, l, r),
      dt(e, r),
      e
    );
  }
  function Mo(e, t, n, r) {
    var l = t.current,
      i = rt(),
      a = Tn(l);
    return (
      (n = yc(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = sn(i, a)),
      (t.payload = { element: e }),
      (r = r === void 0 ? null : r),
      r !== null && (t.callback = r),
      (e = Dn(l, t, a)),
      e !== null && (Vt(e, l, a, i), lo(e, l, a)),
      a
    );
  }
  function _o(e) {
    return (
      (e = e.current),
      e.child ? (e.child.tag === 5, e.child.stateNode) : null
    );
  }
  function wc(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Du(e, t) {
    (wc(e, t), (e = e.alternate) && wc(e, t));
  }
  function up() {
    return null;
  }
  var kc =
    typeof reportError == 'function'
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Nu(e) {
    this._internalRoot = e;
  }
  ((To.prototype.render = Nu.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      Mo(e, t, null, null);
    }),
    (To.prototype.unmount = Nu.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Qn(function () {
            Mo(null, e, null, null);
          }),
            (t[nn] = null));
        }
      }));
  function To(e) {
    this._internalRoot = e;
  }
  To.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = rs();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < mn.length && t !== 0 && t < mn[n].priority; n++);
      (mn.splice(n, 0, e), n === 0 && is(e));
    }
  };
  function Mu(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function Po(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
    );
  }
  function Sc() {}
  function sp(e, t, n, r, l) {
    if (l) {
      if (typeof r == 'function') {
        var i = r;
        r = function () {
          var x = _o(a);
          i.call(x);
        };
      }
      var a = mc(t, r, e, 0, null, !1, !1, '', Sc);
      return (
        (e._reactRootContainer = a),
        (e[nn] = a.current),
        Yr(e.nodeType === 8 ? e.parentNode : e),
        Qn(),
        a
      );
    }
    for (; (l = e.lastChild); ) e.removeChild(l);
    if (typeof r == 'function') {
      var f = r;
      r = function () {
        var x = _o(p);
        f.call(x);
      };
    }
    var p = Ru(e, 0, !1, null, null, !1, !1, '', Sc);
    return (
      (e._reactRootContainer = p),
      (e[nn] = p.current),
      Yr(e.nodeType === 8 ? e.parentNode : e),
      Qn(function () {
        Mo(t, p, n, r);
      }),
      p
    );
  }
  function zo(e, t, n, r, l) {
    var i = n._reactRootContainer;
    if (i) {
      var a = i;
      if (typeof l == 'function') {
        var f = l;
        l = function () {
          var p = _o(a);
          f.call(p);
        };
      }
      Mo(t, a, e, l);
    } else a = sp(n, t, e, l, r);
    return _o(a);
  }
  ((ts = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Lr(t.pendingLanes);
          n !== 0 &&
            (Jo(t, n | 1),
            dt(t, Le()),
            (he & 6) === 0 && ((wr = Le() + 500), En()));
        }
        break;
      case 13:
        (Qn(function () {
          var r = un(e, 1);
          if (r !== null) {
            var l = rt();
            Vt(r, e, 1, l);
          }
        }),
          Du(e, 1));
    }
  }),
    (bo = function (e) {
      if (e.tag === 13) {
        var t = un(e, 134217728);
        if (t !== null) {
          var n = rt();
          Vt(t, e, 134217728, n);
        }
        Du(e, 134217728);
      }
    }),
    (ns = function (e) {
      if (e.tag === 13) {
        var t = Tn(e),
          n = un(e, t);
        if (n !== null) {
          var r = rt();
          Vt(n, e, t, r);
        }
        Du(e, t);
      }
    }),
    (rs = function () {
      return we;
    }),
    (ls = function (e, t) {
      var n = we;
      try {
        return ((we = e), t());
      } finally {
        we = n;
      }
    }),
    (Pr = function (e, t, n) {
      switch (t) {
        case 'input':
          if ((Zn(e, n), (t = n.name), n.type === 'radio' && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name=' + JSON.stringify('' + t) + '][type="radio"]',
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var l = Yl(r);
                if (!l) throw Error(s(90));
                (ht(r), Zn(r, l));
              }
            }
          }
          break;
        case 'textarea':
          Nr(e, n);
          break;
        case 'select':
          ((t = n.value), t != null && Tt(e, !!n.multiple, t, !1));
      }
    }),
    (tt = wu),
    (Ge = Qn));
  var ap = { usingClientEntryPoint: !1, Events: [qr, ir, Yl, Ye, zt, wu] },
    fl = {
      findFiberByHostInstance: jn,
      bundleType: 0,
      version: '18.3.1',
      rendererPackageName: 'react-dom',
    },
    cp = {
      bundleType: fl.bundleType,
      version: fl.version,
      rendererPackageName: fl.rendererPackageName,
      rendererConfig: fl.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: Y.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = Xu(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: fl.findFiberByHostInstance || up,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Lo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Lo.isDisabled && Lo.supportsFiber)
      try {
        ((_l = Lo.inject(cp)), (Xt = Lo));
      } catch {}
  }
  return (
    (pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ap),
    (pt.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Mu(t)) throw Error(s(200));
      return ip(e, t, null, n);
    }),
    (pt.createRoot = function (e, t) {
      if (!Mu(e)) throw Error(s(299));
      var n = !1,
        r = '',
        l = kc;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = Ru(e, 1, !1, null, null, n, !1, r, l)),
        (e[nn] = t.current),
        Yr(e.nodeType === 8 ? e.parentNode : e),
        new Nu(t)
      );
    }),
    (pt.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == 'function'
          ? Error(s(188))
          : ((e = Object.keys(e).join(',')), Error(s(268, e)));
      return ((e = Xu(t)), (e = e === null ? null : e.stateNode), e);
    }),
    (pt.flushSync = function (e) {
      return Qn(e);
    }),
    (pt.hydrate = function (e, t, n) {
      if (!Po(t)) throw Error(s(200));
      return zo(null, e, t, !0, n);
    }),
    (pt.hydrateRoot = function (e, t, n) {
      if (!Mu(e)) throw Error(s(405));
      var r = (n != null && n.hydratedSources) || null,
        l = !1,
        i = '',
        a = kc;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
        (t = mc(t, null, e, 1, n ?? null, l, !1, i, a)),
        (e[nn] = t.current),
        Yr(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          ((n = r[e]),
            (l = n._getVersion),
            (l = l(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, l])
              : t.mutableSourceEagerHydrationData.push(n, l));
      return new To(t);
    }),
    (pt.render = function (e, t, n) {
      if (!Po(t)) throw Error(s(200));
      return zo(null, e, t, !1, n);
    }),
    (pt.unmountComponentAtNode = function (e) {
      if (!Po(e)) throw Error(s(40));
      return e._reactRootContainer
        ? (Qn(function () {
            zo(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[nn] = null));
            });
          }),
          !0)
        : !1;
    }),
    (pt.unstable_batchedUpdates = wu),
    (pt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!Po(n)) throw Error(s(200));
      if (e == null || e._reactInternals === void 0) throw Error(s(38));
      return zo(e, t, n, !1, r);
    }),
    (pt.version = '18.3.1-next-f1338f8080-20240426'),
    pt
  );
}
var Nc;
function yp() {
  if (Nc) return Tu.exports;
  Nc = 1;
  function o() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
      } catch (u) {
        console.error(u);
      }
  }
  return (o(), (Tu.exports = gp()), Tu.exports);
}
var mp = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const wp = (o) =>
    o
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase()
      .trim(),
  J = (o, u) => {
    const s = C.forwardRef(
      (
        {
          color: c = 'currentColor',
          size: d = 24,
          strokeWidth: h = 2,
          absoluteStrokeWidth: y,
          className: m = '',
          children: S,
          ...E
        },
        N,
      ) =>
        C.createElement(
          'svg',
          {
            ref: N,
            ...mp,
            width: d,
            height: d,
            stroke: c,
            strokeWidth: y ? (Number(h) * 24) / Number(d) : h,
            className: ['lucide', `lucide-${wp(o)}`, m].join(' '),
            ...E,
          },
          [
            ...u.map(([R, P]) => C.createElement(R, P)),
            ...(Array.isArray(S) ? S : [S]),
          ],
        ),
    );
    return ((s.displayName = `${o}`), s);
  };
const sv = J('AlertCircle', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
  ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
]);
const av = J('AlertTriangle', [
  [
    'path',
    {
      d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z',
      key: 'c3ski4',
    },
  ],
  ['path', { d: 'M12 9v4', key: 'juzpu7' }],
  ['path', { d: 'M12 17h.01', key: 'p32p05' }],
]);
const cv = J('ArrowLeftRight', [
  ['path', { d: 'M8 3 4 7l4 4', key: '9rb6wj' }],
  ['path', { d: 'M4 7h16', key: '6tx8e3' }],
  ['path', { d: 'm16 21 4-4-4-4', key: 'siv7j2' }],
  ['path', { d: 'M20 17H4', key: 'h6l3hr' }],
]);
const fv = J('Bold', [
  ['path', { d: 'M14 12a4 4 0 0 0 0-8H6v8', key: 'v2sylx' }],
  ['path', { d: 'M15 20a4 4 0 0 0 0-8H6v8Z', key: '1ef5ya' }],
]);
const dv = J('Camera', [
  [
    'path',
    {
      d: 'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z',
      key: '1tc9qg',
    },
  ],
  ['circle', { cx: '12', cy: '13', r: '3', key: '1vg3eu' }],
]);
const pv = J('CheckCircle2', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
]);
const hv = J('CheckCircle', [
  ['path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14', key: 'g774vq' }],
  ['path', { d: 'm9 11 3 3L22 4', key: '1pflzl' }],
]);
const vv = J('Check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
const gv = J('ChevronDown', [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]]);
const yv = J('ChevronRight', [['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }]]);
const mv = J('ChevronUp', [['path', { d: 'm18 15-6-6-6 6', key: '153udz' }]]);
const wv = J('ClipboardPaste', [
  [
    'path',
    {
      d: 'M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z',
      key: '1pp7kr',
    },
  ],
  [
    'path',
    {
      d: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10',
      key: '2ik1ml',
    },
  ],
  ['path', { d: 'm17 10 4 4-4 4', key: 'vp2hj1' }],
]);
const kv = J('Clock', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['polyline', { points: '12 6 12 12 16 14', key: '68esgv' }],
]);
const Sv = J('Copy', [
  [
    'rect',
    {
      width: '14',
      height: '14',
      x: '8',
      y: '8',
      rx: '2',
      ry: '2',
      key: '17jyea',
    },
  ],
  [
    'path',
    {
      d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2',
      key: 'zix9uf',
    },
  ],
]);
const xv = J('Download', [
  ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
  ['polyline', { points: '7 10 12 15 17 10', key: '2ggqvy' }],
  ['line', { x1: '12', x2: '12', y1: '15', y2: '3', key: '1vk2je' }],
]);
const Cv = J('Eye', [
  [
    'path',
    { d: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z', key: 'rwhkz3' },
  ],
  ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
]);
const Ev = J('FileTerminal', [
  [
    'path',
    {
      d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z',
      key: '1rqfz7',
    },
  ],
  ['path', { d: 'M14 2v4a2 2 0 0 0 2 2h4', key: 'tnqrlb' }],
  ['path', { d: 'm8 16 2-2-2-2', key: '10vzyd' }],
  ['path', { d: 'M12 18h4', key: '1wd2n7' }],
]);
const Rv = J('Globe', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  [
    'path',
    { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', key: '13o1zl' },
  ],
  ['path', { d: 'M2 12h20', key: '9i4pu4' }],
]);
const Dv = J('GripVertical', [
  ['circle', { cx: '9', cy: '12', r: '1', key: '1vctgf' }],
  ['circle', { cx: '9', cy: '5', r: '1', key: 'hp0tcf' }],
  ['circle', { cx: '9', cy: '19', r: '1', key: 'fkjjf6' }],
  ['circle', { cx: '15', cy: '12', r: '1', key: '1tmaij' }],
  ['circle', { cx: '15', cy: '5', r: '1', key: '19l28e' }],
  ['circle', { cx: '15', cy: '19', r: '1', key: 'f4zoj3' }],
]);
const Nv = J('Image', [
  [
    'rect',
    {
      width: '18',
      height: '18',
      x: '3',
      y: '3',
      rx: '2',
      ry: '2',
      key: '1m3agn',
    },
  ],
  ['circle', { cx: '9', cy: '9', r: '2', key: 'af1f0g' }],
  ['path', { d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21', key: '1xmnt7' }],
]);
const Mv = J('Info', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['path', { d: 'M12 16v-4', key: '1dtifu' }],
  ['path', { d: 'M12 8h.01', key: 'e9boi3' }],
]);
const _v = J('Italic', [
  ['line', { x1: '19', x2: '10', y1: '4', y2: '4', key: '15jd3p' }],
  ['line', { x1: '14', x2: '5', y1: '20', y2: '20', key: 'bu0au3' }],
  ['line', { x1: '15', x2: '9', y1: '4', y2: '20', key: 'uljnxc' }],
]);
const Tv = J('Keyboard', [
  ['path', { d: 'M10 8h.01', key: '1r9ogq' }],
  ['path', { d: 'M12 12h.01', key: '1mp3jc' }],
  ['path', { d: 'M14 8h.01', key: '1primd' }],
  ['path', { d: 'M16 12h.01', key: '1l6xoz' }],
  ['path', { d: 'M18 8h.01', key: 'emo2bl' }],
  ['path', { d: 'M6 8h.01', key: 'x9i8wu' }],
  ['path', { d: 'M7 16h10', key: 'wp8him' }],
  ['path', { d: 'M8 12h.01', key: 'czm47f' }],
  [
    'rect',
    { x: '2', y: '4', width: '20', height: '16', rx: '2', key: 'izxlao' },
  ],
]);
const Pv = J('LayoutGrid', [
  ['rect', { width: '7', height: '7', x: '3', y: '3', rx: '1', key: '1g98yp' }],
  [
    'rect',
    { width: '7', height: '7', x: '14', y: '3', rx: '1', key: '6d4xhi' },
  ],
  [
    'rect',
    { width: '7', height: '7', x: '14', y: '14', rx: '1', key: 'nxv5o0' },
  ],
  [
    'rect',
    { width: '7', height: '7', x: '3', y: '14', rx: '1', key: '1bb6yr' },
  ],
]);
const zv = J('Lightbulb', [
  [
    'path',
    {
      d: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5',
      key: '1gvzjb',
    },
  ],
  ['path', { d: 'M9 18h6', key: 'x1upvd' }],
  ['path', { d: 'M10 22h4', key: 'ceow96' }],
]);
const Lv = J('Link', [
  [
    'path',
    {
      d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
      key: '1cjeqo',
    },
  ],
  [
    'path',
    {
      d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
      key: '19qd67',
    },
  ],
]);
const Ov = J('Loader2', [
  ['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }],
]);
const Iv = J('Menu', [
  ['line', { x1: '4', x2: '20', y1: '12', y2: '12', key: '1e0a9i' }],
  ['line', { x1: '4', x2: '20', y1: '6', y2: '6', key: '1owob3' }],
  ['line', { x1: '4', x2: '20', y1: '18', y2: '18', key: 'yk5zj1' }],
]);
const Av = J('Monitor', [
  [
    'rect',
    { width: '20', height: '14', x: '2', y: '3', rx: '2', key: '48i651' },
  ],
  ['line', { x1: '8', x2: '16', y1: '21', y2: '21', key: '1svkeh' }],
  ['line', { x1: '12', x2: '12', y1: '17', y2: '21', key: 'vw1qmm' }],
]);
const jv = J('PenTool', [
  ['path', { d: 'm12 19 7-7 3 3-7 7-3-3z', key: 'rklqx2' }],
  ['path', { d: 'm18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z', key: '1et58u' }],
  ['path', { d: 'm2 2 7.586 7.586', key: 'etlp93' }],
  ['circle', { cx: '11', cy: '11', r: '2', key: 'xmgehs' }],
]);
const Fv = J('Pipette', [
  ['path', { d: 'm2 22 1-1h3l9-9', key: '1sre89' }],
  ['path', { d: 'M3 21v-3l9-9', key: 'hpe2y6' }],
  [
    'path',
    {
      d: 'm15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z',
      key: '196du1',
    },
  ],
]);
const Uv = J('Play', [
  ['polygon', { points: '5 3 19 12 5 21 5 3', key: '191637' }],
]);
const Bv = J('Redo', [
  ['path', { d: 'M21 7v6h-6', key: '3ptur4' }],
  ['path', { d: 'M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7', key: '1kgawr' }],
]);
const Vv = J('Save', [
  [
    'path',
    {
      d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z',
      key: '1owoqh',
    },
  ],
  ['polyline', { points: '17 21 17 13 7 13 7 21', key: '1md35c' }],
  ['polyline', { points: '7 3 7 8 15 8', key: '8nz8an' }],
]);
const Hv = J('Search', [
  ['circle', { cx: '11', cy: '11', r: '8', key: '4ej97u' }],
  ['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
]);
const Wv = J('Settings', [
  [
    'path',
    {
      d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
      key: '1qme2f',
    },
  ],
  ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
]);
const $v = J('Share2', [
  ['circle', { cx: '18', cy: '5', r: '3', key: 'gq8acd' }],
  ['circle', { cx: '6', cy: '12', r: '3', key: 'w7nqdw' }],
  ['circle', { cx: '18', cy: '19', r: '3', key: '1xt0gg' }],
  [
    'line',
    { x1: '8.59', x2: '15.42', y1: '13.51', y2: '17.49', key: '47mynk' },
  ],
  ['line', { x1: '15.41', x2: '8.59', y1: '6.51', y2: '10.49', key: '1n3mei' }],
]);
const Qv = J('ShieldAlert', [
  [
    'path',
    {
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
      key: 'oel41y',
    },
  ],
  ['path', { d: 'M12 8v4', key: '1got3b' }],
  ['path', { d: 'M12 16h.01', key: '1drbdi' }],
]);
const Kv = J('Smartphone', [
  [
    'rect',
    {
      width: '14',
      height: '20',
      x: '5',
      y: '2',
      rx: '2',
      ry: '2',
      key: '1yt0o3',
    },
  ],
  ['path', { d: 'M12 18h.01', key: 'mhygvu' }],
]);
const Xv = J('Star', [
  [
    'polygon',
    {
      points:
        '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
      key: '8f66p6',
    },
  ],
]);
const Yv = J('Terminal', [
  ['polyline', { points: '4 17 10 11 4 5', key: 'akl6gq' }],
  ['line', { x1: '12', x2: '20', y1: '19', y2: '19', key: 'q2wloq' }],
]);
const Gv = J('Text', [
  ['path', { d: 'M17 6.1H3', key: 'wptmhv' }],
  ['path', { d: 'M21 12.1H3', key: '1j38uz' }],
  ['path', { d: 'M15.1 18H3', key: '1nb16a' }],
]);
const Zv = J('Trash2', [
  ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
  ['path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6', key: '4alrt4' }],
  ['path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2', key: 'v07s0e' }],
  ['line', { x1: '10', x2: '10', y1: '11', y2: '17', key: '1uufr5' }],
  ['line', { x1: '14', x2: '14', y1: '11', y2: '17', key: 'xtxkd' }],
]);
const qv = J('Type', [
  ['polyline', { points: '4 7 4 4 20 4 20 7', key: '1nosan' }],
  ['line', { x1: '9', x2: '15', y1: '20', y2: '20', key: 'swin9y' }],
  ['line', { x1: '12', x2: '12', y1: '4', y2: '20', key: '1tx1rr' }],
]);
const Jv = J('Underline', [
  ['path', { d: 'M6 4v6a6 6 0 0 0 12 0V4', key: '9kb039' }],
  ['line', { x1: '4', x2: '20', y1: '20', y2: '20', key: 'nun2al' }],
]);
const bv = J('Undo', [
  ['path', { d: 'M3 7v6h6', key: '1v2h90' }],
  ['path', { d: 'M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13', key: '1r6uu6' }],
]);
const eg = J('Upload', [
  ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
  ['polyline', { points: '17 8 12 3 7 8', key: 't8dd8p' }],
  ['line', { x1: '12', x2: '12', y1: '3', y2: '15', key: 'widbto' }],
]);
const tg = J('X', [
  ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
  ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
]);
const ng = J('Zap', [
  [
    'polygon',
    { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2', key: '45s27k' },
  ],
]);
var dl = yp();
function kp() {
  for (var o = arguments.length, u = new Array(o), s = 0; s < o; s++)
    u[s] = arguments[s];
  return C.useMemo(
    () => (c) => {
      u.forEach((d) => d(c));
    },
    u,
  );
}
const Wo =
  typeof window < 'u' &&
  typeof window.document < 'u' &&
  typeof window.document.createElement < 'u';
function xr(o) {
  const u = Object.prototype.toString.call(o);
  return u === '[object Window]' || u === '[object global]';
}
function Bu(o) {
  return 'nodeType' in o;
}
function lt(o) {
  var u, s;
  return o
    ? xr(o)
      ? o
      : Bu(o) &&
          (u = (s = o.ownerDocument) == null ? void 0 : s.defaultView) != null
        ? u
        : window
    : window;
}
function Vu(o) {
  const { Document: u } = lt(o);
  return o instanceof u;
}
function wl(o) {
  return xr(o) ? !1 : o instanceof lt(o).HTMLElement;
}
function Wc(o) {
  return o instanceof lt(o).SVGElement;
}
function Cr(o) {
  return o
    ? xr(o)
      ? o.document
      : Bu(o)
        ? Vu(o)
          ? o
          : wl(o) || Wc(o)
            ? o.ownerDocument
            : document
        : document
    : document;
}
const Ht = Wo ? C.useLayoutEffect : C.useEffect;
function $o(o) {
  const u = C.useRef(o);
  return (
    Ht(() => {
      u.current = o;
    }),
    C.useCallback(function () {
      for (var s = arguments.length, c = new Array(s), d = 0; d < s; d++)
        c[d] = arguments[d];
      return u.current == null ? void 0 : u.current(...c);
    }, [])
  );
}
function Sp() {
  const o = C.useRef(null),
    u = C.useCallback((c, d) => {
      o.current = setInterval(c, d);
    }, []),
    s = C.useCallback(() => {
      o.current !== null && (clearInterval(o.current), (o.current = null));
    }, []);
  return [u, s];
}
function gl(o, u) {
  u === void 0 && (u = [o]);
  const s = C.useRef(o);
  return (
    Ht(() => {
      s.current !== o && (s.current = o);
    }, u),
    s
  );
}
function kl(o, u) {
  const s = C.useRef();
  return C.useMemo(() => {
    const c = o(s.current);
    return ((s.current = c), c);
  }, [...u]);
}
function jo(o) {
  const u = $o(o),
    s = C.useRef(null),
    c = C.useCallback((d) => {
      (d !== s.current && u?.(d, s.current), (s.current = d));
    }, []);
  return [s, c];
}
function Fo(o) {
  const u = C.useRef();
  return (
    C.useEffect(() => {
      u.current = o;
    }, [o]),
    u.current
  );
}
let Lu = {};
function Sl(o, u) {
  return C.useMemo(() => {
    if (u) return u;
    const s = Lu[o] == null ? 0 : Lu[o] + 1;
    return ((Lu[o] = s), o + '-' + s);
  }, [o, u]);
}
function $c(o) {
  return function (u) {
    for (
      var s = arguments.length, c = new Array(s > 1 ? s - 1 : 0), d = 1;
      d < s;
      d++
    )
      c[d - 1] = arguments[d];
    return c.reduce(
      (h, y) => {
        const m = Object.entries(y);
        for (const [S, E] of m) {
          const N = h[S];
          N != null && (h[S] = N + o * E);
        }
        return h;
      },
      { ...u },
    );
  };
}
const Sr = $c(1),
  yl = $c(-1);
function xp(o) {
  return 'clientX' in o && 'clientY' in o;
}
function Qo(o) {
  if (!o) return !1;
  const { KeyboardEvent: u } = lt(o.target);
  return u && o instanceof u;
}
function Cp(o) {
  if (!o) return !1;
  const { TouchEvent: u } = lt(o.target);
  return u && o instanceof u;
}
function Uo(o) {
  if (Cp(o)) {
    if (o.touches && o.touches.length) {
      const { clientX: u, clientY: s } = o.touches[0];
      return { x: u, y: s };
    } else if (o.changedTouches && o.changedTouches.length) {
      const { clientX: u, clientY: s } = o.changedTouches[0];
      return { x: u, y: s };
    }
  }
  return xp(o) ? { x: o.clientX, y: o.clientY } : null;
}
const Gn = Object.freeze({
    Translate: {
      toString(o) {
        if (!o) return;
        const { x: u, y: s } = o;
        return (
          'translate3d(' +
          (u ? Math.round(u) : 0) +
          'px, ' +
          (s ? Math.round(s) : 0) +
          'px, 0)'
        );
      },
    },
    Scale: {
      toString(o) {
        if (!o) return;
        const { scaleX: u, scaleY: s } = o;
        return 'scaleX(' + u + ') scaleY(' + s + ')';
      },
    },
    Transform: {
      toString(o) {
        if (o)
          return [Gn.Translate.toString(o), Gn.Scale.toString(o)].join(' ');
      },
    },
    Transition: {
      toString(o) {
        let { property: u, duration: s, easing: c } = o;
        return u + ' ' + s + 'ms ' + c;
      },
    },
  }),
  Mc =
    'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]';
function Ep(o) {
  return o.matches(Mc) ? o : o.querySelector(Mc);
}
const Rp = { display: 'none' };
function Dp(o) {
  let { id: u, value: s } = o;
  return _e.createElement('div', { id: u, style: Rp }, s);
}
function Np(o) {
  let { id: u, announcement: s, ariaLiveType: c = 'assertive' } = o;
  const d = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(100%)',
    whiteSpace: 'nowrap',
  };
  return _e.createElement(
    'div',
    { id: u, style: d, role: 'status', 'aria-live': c, 'aria-atomic': !0 },
    s,
  );
}
function Mp() {
  const [o, u] = C.useState('');
  return {
    announce: C.useCallback((c) => {
      c != null && u(c);
    }, []),
    announcement: o,
  };
}
const Qc = C.createContext(null);
function _p(o) {
  const u = C.useContext(Qc);
  C.useEffect(() => {
    if (!u)
      throw new Error(
        'useDndMonitor must be used within a children of <DndContext>',
      );
    return u(o);
  }, [o, u]);
}
function Tp() {
  const [o] = C.useState(() => new Set()),
    u = C.useCallback((c) => (o.add(c), () => o.delete(c)), [o]);
  return [
    C.useCallback(
      (c) => {
        let { type: d, event: h } = c;
        o.forEach((y) => {
          var m;
          return (m = y[d]) == null ? void 0 : m.call(y, h);
        });
      },
      [o],
    ),
    u,
  ];
}
const Pp = {
    draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
  },
  zp = {
    onDragStart(o) {
      let { active: u } = o;
      return 'Picked up draggable item ' + u.id + '.';
    },
    onDragOver(o) {
      let { active: u, over: s } = o;
      return s
        ? 'Draggable item ' +
            u.id +
            ' was moved over droppable area ' +
            s.id +
            '.'
        : 'Draggable item ' + u.id + ' is no longer over a droppable area.';
    },
    onDragEnd(o) {
      let { active: u, over: s } = o;
      return s
        ? 'Draggable item ' + u.id + ' was dropped over droppable area ' + s.id
        : 'Draggable item ' + u.id + ' was dropped.';
    },
    onDragCancel(o) {
      let { active: u } = o;
      return 'Dragging was cancelled. Draggable item ' + u.id + ' was dropped.';
    },
  };
function Lp(o) {
  let {
    announcements: u = zp,
    container: s,
    hiddenTextDescribedById: c,
    screenReaderInstructions: d = Pp,
  } = o;
  const { announce: h, announcement: y } = Mp(),
    m = Sl('DndLiveRegion'),
    [S, E] = C.useState(!1);
  if (
    (C.useEffect(() => {
      E(!0);
    }, []),
    _p(
      C.useMemo(
        () => ({
          onDragStart(R) {
            let { active: P } = R;
            h(u.onDragStart({ active: P }));
          },
          onDragMove(R) {
            let { active: P, over: L } = R;
            u.onDragMove && h(u.onDragMove({ active: P, over: L }));
          },
          onDragOver(R) {
            let { active: P, over: L } = R;
            h(u.onDragOver({ active: P, over: L }));
          },
          onDragEnd(R) {
            let { active: P, over: L } = R;
            h(u.onDragEnd({ active: P, over: L }));
          },
          onDragCancel(R) {
            let { active: P, over: L } = R;
            h(u.onDragCancel({ active: P, over: L }));
          },
        }),
        [h, u],
      ),
    ),
    !S)
  )
    return null;
  const N = _e.createElement(
    _e.Fragment,
    null,
    _e.createElement(Dp, { id: c, value: d.draggable }),
    _e.createElement(Np, { id: m, announcement: y }),
  );
  return s ? dl.createPortal(N, s) : N;
}
var Ue;
(function (o) {
  ((o.DragStart = 'dragStart'),
    (o.DragMove = 'dragMove'),
    (o.DragEnd = 'dragEnd'),
    (o.DragCancel = 'dragCancel'),
    (o.DragOver = 'dragOver'),
    (o.RegisterDroppable = 'registerDroppable'),
    (o.SetDroppableDisabled = 'setDroppableDisabled'),
    (o.UnregisterDroppable = 'unregisterDroppable'));
})(Ue || (Ue = {}));
function Bo() {}
function rg(o, u) {
  return C.useMemo(() => ({ sensor: o, options: u ?? {} }), [o, u]);
}
function lg() {
  for (var o = arguments.length, u = new Array(o), s = 0; s < o; s++)
    u[s] = arguments[s];
  return C.useMemo(() => [...u].filter((c) => c != null), [...u]);
}
const Wt = Object.freeze({ x: 0, y: 0 });
function Kc(o, u) {
  return Math.sqrt(Math.pow(o.x - u.x, 2) + Math.pow(o.y - u.y, 2));
}
function Op(o, u) {
  const s = Uo(o);
  if (!s) return '0 0';
  const c = {
    x: ((s.x - u.left) / u.width) * 100,
    y: ((s.y - u.top) / u.height) * 100,
  };
  return c.x + '% ' + c.y + '%';
}
function Xc(o, u) {
  let {
      data: { value: s },
    } = o,
    {
      data: { value: c },
    } = u;
  return s - c;
}
function Ip(o, u) {
  let {
      data: { value: s },
    } = o,
    {
      data: { value: c },
    } = u;
  return c - s;
}
function _c(o) {
  let { left: u, top: s, height: c, width: d } = o;
  return [
    { x: u, y: s },
    { x: u + d, y: s },
    { x: u, y: s + c },
    { x: u + d, y: s + c },
  ];
}
function Yc(o, u) {
  if (!o || o.length === 0) return null;
  const [s] = o;
  return s[u];
}
function Tc(o, u, s) {
  return (
    u === void 0 && (u = o.left),
    s === void 0 && (s = o.top),
    { x: u + o.width * 0.5, y: s + o.height * 0.5 }
  );
}
const og = (o) => {
    let { collisionRect: u, droppableRects: s, droppableContainers: c } = o;
    const d = Tc(u, u.left, u.top),
      h = [];
    for (const y of c) {
      const { id: m } = y,
        S = s.get(m);
      if (S) {
        const E = Kc(Tc(S), d);
        h.push({ id: m, data: { droppableContainer: y, value: E } });
      }
    }
    return h.sort(Xc);
  },
  Ap = (o) => {
    let { collisionRect: u, droppableRects: s, droppableContainers: c } = o;
    const d = _c(u),
      h = [];
    for (const y of c) {
      const { id: m } = y,
        S = s.get(m);
      if (S) {
        const E = _c(S),
          N = d.reduce((P, L, G) => P + Kc(E[G], L), 0),
          R = Number((N / 4).toFixed(4));
        h.push({ id: m, data: { droppableContainer: y, value: R } });
      }
    }
    return h.sort(Xc);
  };
function jp(o, u) {
  const s = Math.max(u.top, o.top),
    c = Math.max(u.left, o.left),
    d = Math.min(u.left + u.width, o.left + o.width),
    h = Math.min(u.top + u.height, o.top + o.height),
    y = d - c,
    m = h - s;
  if (c < d && s < h) {
    const S = u.width * u.height,
      E = o.width * o.height,
      N = y * m,
      R = N / (S + E - N);
    return Number(R.toFixed(4));
  }
  return 0;
}
const Fp = (o) => {
  let { collisionRect: u, droppableRects: s, droppableContainers: c } = o;
  const d = [];
  for (const h of c) {
    const { id: y } = h,
      m = s.get(y);
    if (m) {
      const S = jp(m, u);
      S > 0 && d.push({ id: y, data: { droppableContainer: h, value: S } });
    }
  }
  return d.sort(Ip);
};
function Up(o, u, s) {
  return {
    ...o,
    scaleX: u && s ? u.width / s.width : 1,
    scaleY: u && s ? u.height / s.height : 1,
  };
}
function Gc(o, u) {
  return o && u ? { x: o.left - u.left, y: o.top - u.top } : Wt;
}
function Bp(o) {
  return function (s) {
    for (
      var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), h = 1;
      h < c;
      h++
    )
      d[h - 1] = arguments[h];
    return d.reduce(
      (y, m) => ({
        ...y,
        top: y.top + o * m.y,
        bottom: y.bottom + o * m.y,
        left: y.left + o * m.x,
        right: y.right + o * m.x,
      }),
      { ...s },
    );
  };
}
const Vp = Bp(1);
function Zc(o) {
  if (o.startsWith('matrix3d(')) {
    const u = o.slice(9, -1).split(/, /);
    return { x: +u[12], y: +u[13], scaleX: +u[0], scaleY: +u[5] };
  } else if (o.startsWith('matrix(')) {
    const u = o.slice(7, -1).split(/, /);
    return { x: +u[4], y: +u[5], scaleX: +u[0], scaleY: +u[3] };
  }
  return null;
}
function Hp(o, u, s) {
  const c = Zc(u);
  if (!c) return o;
  const { scaleX: d, scaleY: h, x: y, y: m } = c,
    S = o.left - y - (1 - d) * parseFloat(s),
    E = o.top - m - (1 - h) * parseFloat(s.slice(s.indexOf(' ') + 1)),
    N = d ? o.width / d : o.width,
    R = h ? o.height / h : o.height;
  return { width: N, height: R, top: E, right: S + N, bottom: E + R, left: S };
}
const Wp = { ignoreTransform: !1 };
function Er(o, u) {
  u === void 0 && (u = Wp);
  let s = o.getBoundingClientRect();
  if (u.ignoreTransform) {
    const { transform: E, transformOrigin: N } = lt(o).getComputedStyle(o);
    E && (s = Hp(s, E, N));
  }
  const { top: c, left: d, width: h, height: y, bottom: m, right: S } = s;
  return { top: c, left: d, width: h, height: y, bottom: m, right: S };
}
function Pc(o) {
  return Er(o, { ignoreTransform: !0 });
}
function $p(o) {
  const u = o.innerWidth,
    s = o.innerHeight;
  return { top: 0, left: 0, right: u, bottom: s, width: u, height: s };
}
function Qp(o, u) {
  return (
    u === void 0 && (u = lt(o).getComputedStyle(o)),
    u.position === 'fixed'
  );
}
function Kp(o, u) {
  u === void 0 && (u = lt(o).getComputedStyle(o));
  const s = /(auto|scroll|overlay)/;
  return ['overflow', 'overflowX', 'overflowY'].some((d) => {
    const h = u[d];
    return typeof h == 'string' ? s.test(h) : !1;
  });
}
function Ko(o, u) {
  const s = [];
  function c(d) {
    if ((u != null && s.length >= u) || !d) return s;
    if (Vu(d) && d.scrollingElement != null && !s.includes(d.scrollingElement))
      return (s.push(d.scrollingElement), s);
    if (!wl(d) || Wc(d) || s.includes(d)) return s;
    const h = lt(o).getComputedStyle(d);
    return (d !== o && Kp(d, h) && s.push(d), Qp(d, h) ? s : c(d.parentNode));
  }
  return o ? c(o) : s;
}
function qc(o) {
  const [u] = Ko(o, 1);
  return u ?? null;
}
function Ou(o) {
  return !Wo || !o
    ? null
    : xr(o)
      ? o
      : Bu(o)
        ? Vu(o) || o === Cr(o).scrollingElement
          ? window
          : wl(o)
            ? o
            : null
        : null;
}
function Jc(o) {
  return xr(o) ? o.scrollX : o.scrollLeft;
}
function bc(o) {
  return xr(o) ? o.scrollY : o.scrollTop;
}
function ju(o) {
  return { x: Jc(o), y: bc(o) };
}
var We;
(function (o) {
  ((o[(o.Forward = 1)] = 'Forward'), (o[(o.Backward = -1)] = 'Backward'));
})(We || (We = {}));
function ef(o) {
  return !Wo || !o ? !1 : o === document.scrollingElement;
}
function tf(o) {
  const u = { x: 0, y: 0 },
    s = ef(o)
      ? { height: window.innerHeight, width: window.innerWidth }
      : { height: o.clientHeight, width: o.clientWidth },
    c = { x: o.scrollWidth - s.width, y: o.scrollHeight - s.height },
    d = o.scrollTop <= u.y,
    h = o.scrollLeft <= u.x,
    y = o.scrollTop >= c.y,
    m = o.scrollLeft >= c.x;
  return {
    isTop: d,
    isLeft: h,
    isBottom: y,
    isRight: m,
    maxScroll: c,
    minScroll: u,
  };
}
const Xp = { x: 0.2, y: 0.2 };
function Yp(o, u, s, c, d) {
  let { top: h, left: y, right: m, bottom: S } = s;
  (c === void 0 && (c = 10), d === void 0 && (d = Xp));
  const { isTop: E, isBottom: N, isLeft: R, isRight: P } = tf(o),
    L = { x: 0, y: 0 },
    G = { x: 0, y: 0 },
    O = { height: u.height * d.y, width: u.width * d.x };
  return (
    !E && h <= u.top + O.height
      ? ((L.y = We.Backward),
        (G.y = c * Math.abs((u.top + O.height - h) / O.height)))
      : !N &&
        S >= u.bottom - O.height &&
        ((L.y = We.Forward),
        (G.y = c * Math.abs((u.bottom - O.height - S) / O.height))),
    !P && m >= u.right - O.width
      ? ((L.x = We.Forward),
        (G.x = c * Math.abs((u.right - O.width - m) / O.width)))
      : !R &&
        y <= u.left + O.width &&
        ((L.x = We.Backward),
        (G.x = c * Math.abs((u.left + O.width - y) / O.width))),
    { direction: L, speed: G }
  );
}
function Gp(o) {
  if (o === document.scrollingElement) {
    const { innerWidth: h, innerHeight: y } = window;
    return { top: 0, left: 0, right: h, bottom: y, width: h, height: y };
  }
  const { top: u, left: s, right: c, bottom: d } = o.getBoundingClientRect();
  return {
    top: u,
    left: s,
    right: c,
    bottom: d,
    width: o.clientWidth,
    height: o.clientHeight,
  };
}
function nf(o) {
  return o.reduce((u, s) => Sr(u, ju(s)), Wt);
}
function Zp(o) {
  return o.reduce((u, s) => u + Jc(s), 0);
}
function qp(o) {
  return o.reduce((u, s) => u + bc(s), 0);
}
function rf(o, u) {
  if ((u === void 0 && (u = Er), !o)) return;
  const { top: s, left: c, bottom: d, right: h } = u(o);
  qc(o) &&
    (d <= 0 || h <= 0 || s >= window.innerHeight || c >= window.innerWidth) &&
    o.scrollIntoView({ block: 'center', inline: 'center' });
}
const Jp = [
  ['x', ['left', 'right'], Zp],
  ['y', ['top', 'bottom'], qp],
];
class Hu {
  constructor(u, s) {
    ((this.rect = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.right = void 0),
      (this.left = void 0));
    const c = Ko(s),
      d = nf(c);
    ((this.rect = { ...u }), (this.width = u.width), (this.height = u.height));
    for (const [h, y, m] of Jp)
      for (const S of y)
        Object.defineProperty(this, S, {
          get: () => {
            const E = m(c),
              N = d[h] - E;
            return this.rect[S] + N;
          },
          enumerable: !0,
        });
    Object.defineProperty(this, 'rect', { enumerable: !1 });
  }
}
class pl {
  constructor(u) {
    ((this.target = void 0),
      (this.listeners = []),
      (this.removeAll = () => {
        this.listeners.forEach((s) => {
          var c;
          return (c = this.target) == null
            ? void 0
            : c.removeEventListener(...s);
        });
      }),
      (this.target = u));
  }
  add(u, s, c) {
    var d;
    ((d = this.target) == null || d.addEventListener(u, s, c),
      this.listeners.push([u, s, c]));
  }
}
function bp(o) {
  const { EventTarget: u } = lt(o);
  return o instanceof u ? o : Cr(o);
}
function Iu(o, u) {
  const s = Math.abs(o.x),
    c = Math.abs(o.y);
  return typeof u == 'number'
    ? Math.sqrt(s ** 2 + c ** 2) > u
    : 'x' in u && 'y' in u
      ? s > u.x && c > u.y
      : 'x' in u
        ? s > u.x
        : 'y' in u
          ? c > u.y
          : !1;
}
var Mt;
(function (o) {
  ((o.Click = 'click'),
    (o.DragStart = 'dragstart'),
    (o.Keydown = 'keydown'),
    (o.ContextMenu = 'contextmenu'),
    (o.Resize = 'resize'),
    (o.SelectionChange = 'selectionchange'),
    (o.VisibilityChange = 'visibilitychange'));
})(Mt || (Mt = {}));
function zc(o) {
  o.preventDefault();
}
function eh(o) {
  o.stopPropagation();
}
var fe;
(function (o) {
  ((o.Space = 'Space'),
    (o.Down = 'ArrowDown'),
    (o.Right = 'ArrowRight'),
    (o.Left = 'ArrowLeft'),
    (o.Up = 'ArrowUp'),
    (o.Esc = 'Escape'),
    (o.Enter = 'Enter'),
    (o.Tab = 'Tab'));
})(fe || (fe = {}));
const lf = {
    start: [fe.Space, fe.Enter],
    cancel: [fe.Esc],
    end: [fe.Space, fe.Enter, fe.Tab],
  },
  th = (o, u) => {
    let { currentCoordinates: s } = u;
    switch (o.code) {
      case fe.Right:
        return { ...s, x: s.x + 25 };
      case fe.Left:
        return { ...s, x: s.x - 25 };
      case fe.Down:
        return { ...s, y: s.y + 25 };
      case fe.Up:
        return { ...s, y: s.y - 25 };
    }
  };
class of {
  constructor(u) {
    ((this.props = void 0),
      (this.autoScrollEnabled = !1),
      (this.referenceCoordinates = void 0),
      (this.listeners = void 0),
      (this.windowListeners = void 0),
      (this.props = u));
    const {
      event: { target: s },
    } = u;
    ((this.props = u),
      (this.listeners = new pl(Cr(s))),
      (this.windowListeners = new pl(lt(s))),
      (this.handleKeyDown = this.handleKeyDown.bind(this)),
      (this.handleCancel = this.handleCancel.bind(this)),
      this.attach());
  }
  attach() {
    (this.handleStart(),
      this.windowListeners.add(Mt.Resize, this.handleCancel),
      this.windowListeners.add(Mt.VisibilityChange, this.handleCancel),
      setTimeout(() => this.listeners.add(Mt.Keydown, this.handleKeyDown)));
  }
  handleStart() {
    const { activeNode: u, onStart: s } = this.props,
      c = u.node.current;
    (c && rf(c), s(Wt));
  }
  handleKeyDown(u) {
    if (Qo(u)) {
      const { active: s, context: c, options: d } = this.props,
        {
          keyboardCodes: h = lf,
          coordinateGetter: y = th,
          scrollBehavior: m = 'smooth',
        } = d,
        { code: S } = u;
      if (h.end.includes(S)) {
        this.handleEnd(u);
        return;
      }
      if (h.cancel.includes(S)) {
        this.handleCancel(u);
        return;
      }
      const { collisionRect: E } = c.current,
        N = E ? { x: E.left, y: E.top } : Wt;
      this.referenceCoordinates || (this.referenceCoordinates = N);
      const R = y(u, { active: s, context: c.current, currentCoordinates: N });
      if (R) {
        const P = yl(R, N),
          L = { x: 0, y: 0 },
          { scrollableAncestors: G } = c.current;
        for (const O of G) {
          const I = u.code,
            {
              isTop: b,
              isRight: Z,
              isLeft: $,
              isBottom: Y,
              maxScroll: oe,
              minScroll: ee,
            } = tf(O),
            Q = Gp(O),
            te = {
              x: Math.min(
                I === fe.Right ? Q.right - Q.width / 2 : Q.right,
                Math.max(I === fe.Right ? Q.left : Q.left + Q.width / 2, R.x),
              ),
              y: Math.min(
                I === fe.Down ? Q.bottom - Q.height / 2 : Q.bottom,
                Math.max(I === fe.Down ? Q.top : Q.top + Q.height / 2, R.y),
              ),
            },
            ve = (I === fe.Right && !Z) || (I === fe.Left && !$),
            me = (I === fe.Down && !Y) || (I === fe.Up && !b);
          if (ve && te.x !== R.x) {
            const de = O.scrollLeft + P.x,
              Te =
                (I === fe.Right && de <= oe.x) || (I === fe.Left && de >= ee.x);
            if (Te && !P.y) {
              O.scrollTo({ left: de, behavior: m });
              return;
            }
            (Te
              ? (L.x = O.scrollLeft - de)
              : (L.x =
                  I === fe.Right ? O.scrollLeft - oe.x : O.scrollLeft - ee.x),
              L.x && O.scrollBy({ left: -L.x, behavior: m }));
            break;
          } else if (me && te.y !== R.y) {
            const de = O.scrollTop + P.y,
              Te = (I === fe.Down && de <= oe.y) || (I === fe.Up && de >= ee.y);
            if (Te && !P.x) {
              O.scrollTo({ top: de, behavior: m });
              return;
            }
            (Te
              ? (L.y = O.scrollTop - de)
              : (L.y = I === fe.Down ? O.scrollTop - oe.y : O.scrollTop - ee.y),
              L.y && O.scrollBy({ top: -L.y, behavior: m }));
            break;
          }
        }
        this.handleMove(u, Sr(yl(R, this.referenceCoordinates), L));
      }
    }
  }
  handleMove(u, s) {
    const { onMove: c } = this.props;
    (u.preventDefault(), c(s));
  }
  handleEnd(u) {
    const { onEnd: s } = this.props;
    (u.preventDefault(), this.detach(), s());
  }
  handleCancel(u) {
    const { onCancel: s } = this.props;
    (u.preventDefault(), this.detach(), s());
  }
  detach() {
    (this.listeners.removeAll(), this.windowListeners.removeAll());
  }
}
of.activators = [
  {
    eventName: 'onKeyDown',
    handler: (o, u, s) => {
      let { keyboardCodes: c = lf, onActivation: d } = u,
        { active: h } = s;
      const { code: y } = o.nativeEvent;
      if (c.start.includes(y)) {
        const m = h.activatorNode.current;
        return m && o.target !== m
          ? !1
          : (o.preventDefault(), d?.({ event: o.nativeEvent }), !0);
      }
      return !1;
    },
  },
];
function Lc(o) {
  return !!(o && 'distance' in o);
}
function Oc(o) {
  return !!(o && 'delay' in o);
}
class Wu {
  constructor(u, s, c) {
    var d;
    (c === void 0 && (c = bp(u.event.target)),
      (this.props = void 0),
      (this.events = void 0),
      (this.autoScrollEnabled = !0),
      (this.document = void 0),
      (this.activated = !1),
      (this.initialCoordinates = void 0),
      (this.timeoutId = null),
      (this.listeners = void 0),
      (this.documentListeners = void 0),
      (this.windowListeners = void 0),
      (this.props = u),
      (this.events = s));
    const { event: h } = u,
      { target: y } = h;
    ((this.props = u),
      (this.events = s),
      (this.document = Cr(y)),
      (this.documentListeners = new pl(this.document)),
      (this.listeners = new pl(c)),
      (this.windowListeners = new pl(lt(y))),
      (this.initialCoordinates = (d = Uo(h)) != null ? d : Wt),
      (this.handleStart = this.handleStart.bind(this)),
      (this.handleMove = this.handleMove.bind(this)),
      (this.handleEnd = this.handleEnd.bind(this)),
      (this.handleCancel = this.handleCancel.bind(this)),
      (this.handleKeydown = this.handleKeydown.bind(this)),
      (this.removeTextSelection = this.removeTextSelection.bind(this)),
      this.attach());
  }
  attach() {
    const {
      events: u,
      props: {
        options: { activationConstraint: s, bypassActivationConstraint: c },
      },
    } = this;
    if (
      (this.listeners.add(u.move.name, this.handleMove, { passive: !1 }),
      this.listeners.add(u.end.name, this.handleEnd),
      u.cancel && this.listeners.add(u.cancel.name, this.handleCancel),
      this.windowListeners.add(Mt.Resize, this.handleCancel),
      this.windowListeners.add(Mt.DragStart, zc),
      this.windowListeners.add(Mt.VisibilityChange, this.handleCancel),
      this.windowListeners.add(Mt.ContextMenu, zc),
      this.documentListeners.add(Mt.Keydown, this.handleKeydown),
      s)
    ) {
      if (
        c != null &&
        c({
          event: this.props.event,
          activeNode: this.props.activeNode,
          options: this.props.options,
        })
      )
        return this.handleStart();
      if (Oc(s)) {
        ((this.timeoutId = setTimeout(this.handleStart, s.delay)),
          this.handlePending(s));
        return;
      }
      if (Lc(s)) {
        this.handlePending(s);
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    (this.listeners.removeAll(),
      this.windowListeners.removeAll(),
      setTimeout(this.documentListeners.removeAll, 50),
      this.timeoutId !== null &&
        (clearTimeout(this.timeoutId), (this.timeoutId = null)));
  }
  handlePending(u, s) {
    const { active: c, onPending: d } = this.props;
    d(c, u, this.initialCoordinates, s);
  }
  handleStart() {
    const { initialCoordinates: u } = this,
      { onStart: s } = this.props;
    u &&
      ((this.activated = !0),
      this.documentListeners.add(Mt.Click, eh, { capture: !0 }),
      this.removeTextSelection(),
      this.documentListeners.add(Mt.SelectionChange, this.removeTextSelection),
      s(u));
  }
  handleMove(u) {
    var s;
    const { activated: c, initialCoordinates: d, props: h } = this,
      {
        onMove: y,
        options: { activationConstraint: m },
      } = h;
    if (!d) return;
    const S = (s = Uo(u)) != null ? s : Wt,
      E = yl(d, S);
    if (!c && m) {
      if (Lc(m)) {
        if (m.tolerance != null && Iu(E, m.tolerance))
          return this.handleCancel();
        if (Iu(E, m.distance)) return this.handleStart();
      }
      if (Oc(m) && Iu(E, m.tolerance)) return this.handleCancel();
      this.handlePending(m, E);
      return;
    }
    (u.cancelable && u.preventDefault(), y(S));
  }
  handleEnd() {
    const { onAbort: u, onEnd: s } = this.props;
    (this.detach(), this.activated || u(this.props.active), s());
  }
  handleCancel() {
    const { onAbort: u, onCancel: s } = this.props;
    (this.detach(), this.activated || u(this.props.active), s());
  }
  handleKeydown(u) {
    u.code === fe.Esc && this.handleCancel();
  }
  removeTextSelection() {
    var u;
    (u = this.document.getSelection()) == null || u.removeAllRanges();
  }
}
const nh = {
  cancel: { name: 'pointercancel' },
  move: { name: 'pointermove' },
  end: { name: 'pointerup' },
};
class uf extends Wu {
  constructor(u) {
    const { event: s } = u,
      c = Cr(s.target);
    super(u, nh, c);
  }
}
uf.activators = [
  {
    eventName: 'onPointerDown',
    handler: (o, u) => {
      let { nativeEvent: s } = o,
        { onActivation: c } = u;
      return !s.isPrimary || s.button !== 0 ? !1 : (c?.({ event: s }), !0);
    },
  },
];
const rh = { move: { name: 'mousemove' }, end: { name: 'mouseup' } };
var Fu;
(function (o) {
  o[(o.RightClick = 2)] = 'RightClick';
})(Fu || (Fu = {}));
class lh extends Wu {
  constructor(u) {
    super(u, rh, Cr(u.event.target));
  }
}
lh.activators = [
  {
    eventName: 'onMouseDown',
    handler: (o, u) => {
      let { nativeEvent: s } = o,
        { onActivation: c } = u;
      return s.button === Fu.RightClick ? !1 : (c?.({ event: s }), !0);
    },
  },
];
const Au = {
  cancel: { name: 'touchcancel' },
  move: { name: 'touchmove' },
  end: { name: 'touchend' },
};
class oh extends Wu {
  constructor(u) {
    super(u, Au);
  }
  static setup() {
    return (
      window.addEventListener(Au.move.name, u, { capture: !1, passive: !1 }),
      function () {
        window.removeEventListener(Au.move.name, u);
      }
    );
    function u() {}
  }
}
oh.activators = [
  {
    eventName: 'onTouchStart',
    handler: (o, u) => {
      let { nativeEvent: s } = o,
        { onActivation: c } = u;
      const { touches: d } = s;
      return d.length > 1 ? !1 : (c?.({ event: s }), !0);
    },
  },
];
var hl;
(function (o) {
  ((o[(o.Pointer = 0)] = 'Pointer'),
    (o[(o.DraggableRect = 1)] = 'DraggableRect'));
})(hl || (hl = {}));
var Vo;
(function (o) {
  ((o[(o.TreeOrder = 0)] = 'TreeOrder'),
    (o[(o.ReversedTreeOrder = 1)] = 'ReversedTreeOrder'));
})(Vo || (Vo = {}));
function ih(o) {
  let {
    acceleration: u,
    activator: s = hl.Pointer,
    canScroll: c,
    draggingRect: d,
    enabled: h,
    interval: y = 5,
    order: m = Vo.TreeOrder,
    pointerCoordinates: S,
    scrollableAncestors: E,
    scrollableAncestorRects: N,
    delta: R,
    threshold: P,
  } = o;
  const L = sh({ delta: R, disabled: !h }),
    [G, O] = Sp(),
    I = C.useRef({ x: 0, y: 0 }),
    b = C.useRef({ x: 0, y: 0 }),
    Z = C.useMemo(() => {
      switch (s) {
        case hl.Pointer:
          return S ? { top: S.y, bottom: S.y, left: S.x, right: S.x } : null;
        case hl.DraggableRect:
          return d;
      }
    }, [s, d, S]),
    $ = C.useRef(null),
    Y = C.useCallback(() => {
      const ee = $.current;
      if (!ee) return;
      const Q = I.current.x * b.current.x,
        te = I.current.y * b.current.y;
      ee.scrollBy(Q, te);
    }, []),
    oe = C.useMemo(() => (m === Vo.TreeOrder ? [...E].reverse() : E), [m, E]);
  C.useEffect(() => {
    if (!h || !E.length || !Z) {
      O();
      return;
    }
    for (const ee of oe) {
      if (c?.(ee) === !1) continue;
      const Q = E.indexOf(ee),
        te = N[Q];
      if (!te) continue;
      const { direction: ve, speed: me } = Yp(ee, te, Z, u, P);
      for (const de of ['x', 'y'])
        L[de][ve[de]] || ((me[de] = 0), (ve[de] = 0));
      if (me.x > 0 || me.y > 0) {
        (O(), ($.current = ee), G(Y, y), (I.current = me), (b.current = ve));
        return;
      }
    }
    ((I.current = { x: 0, y: 0 }), (b.current = { x: 0, y: 0 }), O());
  }, [
    u,
    Y,
    c,
    O,
    h,
    y,
    JSON.stringify(Z),
    JSON.stringify(L),
    G,
    E,
    oe,
    N,
    JSON.stringify(P),
  ]);
}
const uh = {
  x: { [We.Backward]: !1, [We.Forward]: !1 },
  y: { [We.Backward]: !1, [We.Forward]: !1 },
};
function sh(o) {
  let { delta: u, disabled: s } = o;
  const c = Fo(u);
  return kl(
    (d) => {
      if (s || !c || !d) return uh;
      const h = { x: Math.sign(u.x - c.x), y: Math.sign(u.y - c.y) };
      return {
        x: {
          [We.Backward]: d.x[We.Backward] || h.x === -1,
          [We.Forward]: d.x[We.Forward] || h.x === 1,
        },
        y: {
          [We.Backward]: d.y[We.Backward] || h.y === -1,
          [We.Forward]: d.y[We.Forward] || h.y === 1,
        },
      };
    },
    [s, u, c],
  );
}
function ah(o, u) {
  const s = u != null ? o.get(u) : void 0,
    c = s ? s.node.current : null;
  return kl(
    (d) => {
      var h;
      return u == null ? null : (h = c ?? d) != null ? h : null;
    },
    [c, u],
  );
}
function ch(o, u) {
  return C.useMemo(
    () =>
      o.reduce((s, c) => {
        const { sensor: d } = c,
          h = d.activators.map((y) => ({
            eventName: y.eventName,
            handler: u(y.handler, c),
          }));
        return [...s, ...h];
      }, []),
    [o, u],
  );
}
var ml;
(function (o) {
  ((o[(o.Always = 0)] = 'Always'),
    (o[(o.BeforeDragging = 1)] = 'BeforeDragging'),
    (o[(o.WhileDragging = 2)] = 'WhileDragging'));
})(ml || (ml = {}));
var Uu;
(function (o) {
  o.Optimized = 'optimized';
})(Uu || (Uu = {}));
const Ic = new Map();
function fh(o, u) {
  let { dragging: s, dependencies: c, config: d } = u;
  const [h, y] = C.useState(null),
    { frequency: m, measure: S, strategy: E } = d,
    N = C.useRef(o),
    R = I(),
    P = gl(R),
    L = C.useCallback(
      function (b) {
        (b === void 0 && (b = []),
          !P.current &&
            y((Z) =>
              Z === null ? b : Z.concat(b.filter(($) => !Z.includes($))),
            ));
      },
      [P],
    ),
    G = C.useRef(null),
    O = kl(
      (b) => {
        if (R && !s) return Ic;
        if (!b || b === Ic || N.current !== o || h != null) {
          const Z = new Map();
          for (let $ of o) {
            if (!$) continue;
            if (h && h.length > 0 && !h.includes($.id) && $.rect.current) {
              Z.set($.id, $.rect.current);
              continue;
            }
            const Y = $.node.current,
              oe = Y ? new Hu(S(Y), Y) : null;
            (($.rect.current = oe), oe && Z.set($.id, oe));
          }
          return Z;
        }
        return b;
      },
      [o, h, s, R, S],
    );
  return (
    C.useEffect(() => {
      N.current = o;
    }, [o]),
    C.useEffect(() => {
      R || L();
    }, [s, R]),
    C.useEffect(() => {
      h && h.length > 0 && y(null);
    }, [JSON.stringify(h)]),
    C.useEffect(() => {
      R ||
        typeof m != 'number' ||
        G.current !== null ||
        (G.current = setTimeout(() => {
          (L(), (G.current = null));
        }, m));
    }, [m, R, L, ...c]),
    {
      droppableRects: O,
      measureDroppableContainers: L,
      measuringScheduled: h != null,
    }
  );
  function I() {
    switch (E) {
      case ml.Always:
        return !1;
      case ml.BeforeDragging:
        return s;
      default:
        return !s;
    }
  }
}
function $u(o, u) {
  return kl(
    (s) => (o ? s || (typeof u == 'function' ? u(o) : o) : null),
    [u, o],
  );
}
function dh(o, u) {
  return $u(o, u);
}
function ph(o) {
  let { callback: u, disabled: s } = o;
  const c = $o(u),
    d = C.useMemo(() => {
      if (s || typeof window > 'u' || typeof window.MutationObserver > 'u')
        return;
      const { MutationObserver: h } = window;
      return new h(c);
    }, [c, s]);
  return (C.useEffect(() => () => d?.disconnect(), [d]), d);
}
function Xo(o) {
  let { callback: u, disabled: s } = o;
  const c = $o(u),
    d = C.useMemo(() => {
      if (s || typeof window > 'u' || typeof window.ResizeObserver > 'u')
        return;
      const { ResizeObserver: h } = window;
      return new h(c);
    }, [s]);
  return (C.useEffect(() => () => d?.disconnect(), [d]), d);
}
function hh(o) {
  return new Hu(Er(o), o);
}
function Ac(o, u, s) {
  u === void 0 && (u = hh);
  const [c, d] = C.useState(null);
  function h() {
    d((S) => {
      if (!o) return null;
      if (o.isConnected === !1) {
        var E;
        return (E = S ?? s) != null ? E : null;
      }
      const N = u(o);
      return JSON.stringify(S) === JSON.stringify(N) ? S : N;
    });
  }
  const y = ph({
      callback(S) {
        if (o)
          for (const E of S) {
            const { type: N, target: R } = E;
            if (
              N === 'childList' &&
              R instanceof HTMLElement &&
              R.contains(o)
            ) {
              h();
              break;
            }
          }
      },
    }),
    m = Xo({ callback: h });
  return (
    Ht(() => {
      (h(),
        o
          ? (m?.observe(o),
            y?.observe(document.body, { childList: !0, subtree: !0 }))
          : (m?.disconnect(), y?.disconnect()));
    }, [o]),
    c
  );
}
function vh(o) {
  const u = $u(o);
  return Gc(o, u);
}
const jc = [];
function gh(o) {
  const u = C.useRef(o),
    s = kl(
      (c) =>
        o
          ? c &&
            c !== jc &&
            o &&
            u.current &&
            o.parentNode === u.current.parentNode
            ? c
            : Ko(o)
          : jc,
      [o],
    );
  return (
    C.useEffect(() => {
      u.current = o;
    }, [o]),
    s
  );
}
function yh(o) {
  const [u, s] = C.useState(null),
    c = C.useRef(o),
    d = C.useCallback((h) => {
      const y = Ou(h.target);
      y && s((m) => (m ? (m.set(y, ju(y)), new Map(m)) : null));
    }, []);
  return (
    C.useEffect(() => {
      const h = c.current;
      if (o !== h) {
        y(h);
        const m = o
          .map((S) => {
            const E = Ou(S);
            return E
              ? (E.addEventListener('scroll', d, { passive: !0 }), [E, ju(E)])
              : null;
          })
          .filter((S) => S != null);
        (s(m.length ? new Map(m) : null), (c.current = o));
      }
      return () => {
        (y(o), y(h));
      };
      function y(m) {
        m.forEach((S) => {
          const E = Ou(S);
          E?.removeEventListener('scroll', d);
        });
      }
    }, [d, o]),
    C.useMemo(
      () =>
        o.length
          ? u
            ? Array.from(u.values()).reduce((h, y) => Sr(h, y), Wt)
            : nf(o)
          : Wt,
      [o, u],
    )
  );
}
function Fc(o, u) {
  u === void 0 && (u = []);
  const s = C.useRef(null);
  return (
    C.useEffect(() => {
      s.current = null;
    }, u),
    C.useEffect(() => {
      const c = o !== Wt;
      (c && !s.current && (s.current = o),
        !c && s.current && (s.current = null));
    }, [o]),
    s.current ? yl(o, s.current) : Wt
  );
}
function mh(o) {
  C.useEffect(
    () => {
      if (!Wo) return;
      const u = o.map((s) => {
        let { sensor: c } = s;
        return c.setup == null ? void 0 : c.setup();
      });
      return () => {
        for (const s of u) s?.();
      };
    },
    o.map((u) => {
      let { sensor: s } = u;
      return s;
    }),
  );
}
function wh(o, u) {
  return C.useMemo(
    () =>
      o.reduce((s, c) => {
        let { eventName: d, handler: h } = c;
        return (
          (s[d] = (y) => {
            h(y, u);
          }),
          s
        );
      }, {}),
    [o, u],
  );
}
function sf(o) {
  return C.useMemo(() => (o ? $p(o) : null), [o]);
}
const Uc = [];
function kh(o, u) {
  u === void 0 && (u = Er);
  const [s] = o,
    c = sf(s ? lt(s) : null),
    [d, h] = C.useState(Uc);
  function y() {
    h(() => (o.length ? o.map((S) => (ef(S) ? c : new Hu(u(S), S))) : Uc));
  }
  const m = Xo({ callback: y });
  return (
    Ht(() => {
      (m?.disconnect(), y(), o.forEach((S) => m?.observe(S)));
    }, [o]),
    d
  );
}
function af(o) {
  if (!o) return null;
  if (o.children.length > 1) return o;
  const u = o.children[0];
  return wl(u) ? u : o;
}
function Sh(o) {
  let { measure: u } = o;
  const [s, c] = C.useState(null),
    d = C.useCallback(
      (E) => {
        for (const { target: N } of E)
          if (wl(N)) {
            c((R) => {
              const P = u(N);
              return R ? { ...R, width: P.width, height: P.height } : P;
            });
            break;
          }
      },
      [u],
    ),
    h = Xo({ callback: d }),
    y = C.useCallback(
      (E) => {
        const N = af(E);
        (h?.disconnect(), N && h?.observe(N), c(N ? u(N) : null));
      },
      [u, h],
    ),
    [m, S] = jo(y);
  return C.useMemo(() => ({ nodeRef: m, rect: s, setRef: S }), [s, m, S]);
}
const xh = [
    { sensor: uf, options: {} },
    { sensor: of, options: {} },
  ],
  Ch = { current: {} },
  Ao = {
    draggable: { measure: Pc },
    droppable: {
      measure: Pc,
      strategy: ml.WhileDragging,
      frequency: Uu.Optimized,
    },
    dragOverlay: { measure: Er },
  };
class vl extends Map {
  get(u) {
    var s;
    return u != null && (s = super.get(u)) != null ? s : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((u) => {
      let { disabled: s } = u;
      return !s;
    });
  }
  getNodeFor(u) {
    var s, c;
    return (s = (c = this.get(u)) == null ? void 0 : c.node.current) != null
      ? s
      : void 0;
  }
}
const Eh = {
    activatorEvent: null,
    active: null,
    activeNode: null,
    activeNodeRect: null,
    collisions: null,
    containerNodeRect: null,
    draggableNodes: new Map(),
    droppableRects: new Map(),
    droppableContainers: new vl(),
    over: null,
    dragOverlay: { nodeRef: { current: null }, rect: null, setRef: Bo },
    scrollableAncestors: [],
    scrollableAncestorRects: [],
    measuringConfiguration: Ao,
    measureDroppableContainers: Bo,
    windowRect: null,
    measuringScheduled: !1,
  },
  cf = {
    activatorEvent: null,
    activators: [],
    active: null,
    activeNodeRect: null,
    ariaDescribedById: { draggable: '' },
    dispatch: Bo,
    draggableNodes: new Map(),
    over: null,
    measureDroppableContainers: Bo,
  },
  xl = C.createContext(cf),
  ff = C.createContext(Eh);
function Rh() {
  return {
    draggable: {
      active: null,
      initialCoordinates: { x: 0, y: 0 },
      nodes: new Map(),
      translate: { x: 0, y: 0 },
    },
    droppable: { containers: new vl() },
  };
}
function Dh(o, u) {
  switch (u.type) {
    case Ue.DragStart:
      return {
        ...o,
        draggable: {
          ...o.draggable,
          initialCoordinates: u.initialCoordinates,
          active: u.active,
        },
      };
    case Ue.DragMove:
      return o.draggable.active == null
        ? o
        : {
            ...o,
            draggable: {
              ...o.draggable,
              translate: {
                x: u.coordinates.x - o.draggable.initialCoordinates.x,
                y: u.coordinates.y - o.draggable.initialCoordinates.y,
              },
            },
          };
    case Ue.DragEnd:
    case Ue.DragCancel:
      return {
        ...o,
        draggable: {
          ...o.draggable,
          active: null,
          initialCoordinates: { x: 0, y: 0 },
          translate: { x: 0, y: 0 },
        },
      };
    case Ue.RegisterDroppable: {
      const { element: s } = u,
        { id: c } = s,
        d = new vl(o.droppable.containers);
      return (
        d.set(c, s),
        { ...o, droppable: { ...o.droppable, containers: d } }
      );
    }
    case Ue.SetDroppableDisabled: {
      const { id: s, key: c, disabled: d } = u,
        h = o.droppable.containers.get(s);
      if (!h || c !== h.key) return o;
      const y = new vl(o.droppable.containers);
      return (
        y.set(s, { ...h, disabled: d }),
        { ...o, droppable: { ...o.droppable, containers: y } }
      );
    }
    case Ue.UnregisterDroppable: {
      const { id: s, key: c } = u,
        d = o.droppable.containers.get(s);
      if (!d || c !== d.key) return o;
      const h = new vl(o.droppable.containers);
      return (
        h.delete(s),
        { ...o, droppable: { ...o.droppable, containers: h } }
      );
    }
    default:
      return o;
  }
}
function Nh(o) {
  let { disabled: u } = o;
  const { active: s, activatorEvent: c, draggableNodes: d } = C.useContext(xl),
    h = Fo(c),
    y = Fo(s?.id);
  return (
    C.useEffect(() => {
      if (!u && !c && h && y != null) {
        if (!Qo(h) || document.activeElement === h.target) return;
        const m = d.get(y);
        if (!m) return;
        const { activatorNode: S, node: E } = m;
        if (!S.current && !E.current) return;
        requestAnimationFrame(() => {
          for (const N of [S.current, E.current]) {
            if (!N) continue;
            const R = Ep(N);
            if (R) {
              R.focus();
              break;
            }
          }
        });
      }
    }, [c, u, d, y, h]),
    null
  );
}
function df(o, u) {
  let { transform: s, ...c } = u;
  return o != null && o.length
    ? o.reduce((d, h) => h({ transform: d, ...c }), s)
    : s;
}
function Mh(o) {
  return C.useMemo(
    () => ({
      draggable: { ...Ao.draggable, ...o?.draggable },
      droppable: { ...Ao.droppable, ...o?.droppable },
      dragOverlay: { ...Ao.dragOverlay, ...o?.dragOverlay },
    }),
    [o?.draggable, o?.droppable, o?.dragOverlay],
  );
}
function _h(o) {
  let { activeNode: u, measure: s, initialRect: c, config: d = !0 } = o;
  const h = C.useRef(!1),
    { x: y, y: m } = typeof d == 'boolean' ? { x: d, y: d } : d;
  Ht(() => {
    if ((!y && !m) || !u) {
      h.current = !1;
      return;
    }
    if (h.current || !c) return;
    const E = u?.node.current;
    if (!E || E.isConnected === !1) return;
    const N = s(E),
      R = Gc(N, c);
    if (
      (y || (R.x = 0),
      m || (R.y = 0),
      (h.current = !0),
      Math.abs(R.x) > 0 || Math.abs(R.y) > 0)
    ) {
      const P = qc(E);
      P && P.scrollBy({ top: R.y, left: R.x });
    }
  }, [u, y, m, c, s]);
}
const Yo = C.createContext({ ...Wt, scaleX: 1, scaleY: 1 });
var On;
(function (o) {
  ((o[(o.Uninitialized = 0)] = 'Uninitialized'),
    (o[(o.Initializing = 1)] = 'Initializing'),
    (o[(o.Initialized = 2)] = 'Initialized'));
})(On || (On = {}));
const ig = C.memo(function (u) {
    var s, c, d, h;
    let {
      id: y,
      accessibility: m,
      autoScroll: S = !0,
      children: E,
      sensors: N = xh,
      collisionDetection: R = Fp,
      measuring: P,
      modifiers: L,
      ...G
    } = u;
    const O = C.useReducer(Dh, void 0, Rh),
      [I, b] = O,
      [Z, $] = Tp(),
      [Y, oe] = C.useState(On.Uninitialized),
      ee = Y === On.Initialized,
      {
        draggable: { active: Q, nodes: te, translate: ve },
        droppable: { containers: me },
      } = I,
      de = Q != null ? te.get(Q) : null,
      Te = C.useRef({ initial: null, translated: null }),
      Se = C.useMemo(() => {
        var Re;
        return Q != null
          ? { id: Q, data: (Re = de?.data) != null ? Re : Ch, rect: Te }
          : null;
      }, [Q, de]),
      Pe = C.useRef(null),
      [Ke, Ae] = C.useState(null),
      [ce, A] = C.useState(null),
      W = gl(G, Object.values(G)),
      j = Sl('DndDescribedBy', y),
      g = C.useMemo(() => me.getEnabled(), [me]),
      D = Mh(P),
      {
        droppableRects: q,
        measureDroppableContainers: re,
        measuringScheduled: ue,
      } = fh(g, {
        dragging: ee,
        dependencies: [ve.x, ve.y],
        config: D.droppable,
      }),
      le = ah(te, Q),
      ye = C.useMemo(() => (ce ? Uo(ce) : null), [ce]),
      se = hn(),
      pe = dh(le, D.draggable.measure);
    _h({
      activeNode: Q != null ? te.get(Q) : null,
      config: se.layoutShiftCompensation,
      initialRect: pe,
      measure: D.draggable.measure,
    });
    const ie = Ac(le, D.draggable.measure, pe),
      $t = Ac(le ? le.parentElement : null),
      ht = C.useRef({
        activatorEvent: null,
        active: null,
        activeNode: le,
        collisionRect: null,
        collisions: null,
        droppableRects: q,
        draggableNodes: te,
        draggingNode: null,
        draggingNodeRect: null,
        droppableContainers: me,
        over: null,
        scrollableAncestors: [],
        scrollAdjustedTranslate: null,
      }),
      _t = me.getNodeFor((s = ht.current.over) == null ? void 0 : s.id),
      vt = Sh({ measure: D.dragOverlay.measure }),
      Jt = (c = vt.nodeRef.current) != null ? c : le,
      bt = ee ? ((d = vt.rect) != null ? d : ie) : null,
      Zn = !!(vt.nodeRef.current && vt.rect),
      Rr = vh(Zn ? null : ie),
      In = sf(Jt ? lt(Jt) : null),
      ot = gh(ee ? (_t ?? le) : null),
      Tt = kh(ot),
      fn = df(L, {
        transform: { x: ve.x - Rr.x, y: ve.y - Rr.y, scaleX: 1, scaleY: 1 },
        activatorEvent: ce,
        active: Se,
        activeNodeRect: ie,
        containerNodeRect: $t,
        draggingNodeRect: bt,
        over: ht.current.over,
        overlayNodeRect: vt.rect,
        scrollableAncestors: ot,
        scrollableAncestorRects: Tt,
        windowRect: In,
      }),
      Dr = ye ? Sr(ye, ve) : null,
      Nr = yh(ot),
      Cl = Fc(Nr),
      El = Fc(Nr, [ie]),
      Qt = Sr(fn, Cl),
      Pt = bt ? Vp(bt, fn) : null,
      dn =
        Se && Pt
          ? R({
              active: Se,
              collisionRect: Pt,
              droppableRects: q,
              droppableContainers: g,
              pointerCoordinates: Dr,
            })
          : null,
      pn = Yc(dn, 'id'),
      [it, Rl] = C.useState(null),
      Dl = Zn ? fn : Sr(fn, El),
      Nl = Up(Dl, (h = it?.rect) != null ? h : null, ie),
      Mr = C.useRef(null),
      qn = C.useCallback(
        (Re, Xe) => {
          let { sensor: Ye, options: zt } = Xe;
          if (Pe.current == null) return;
          const tt = te.get(Pe.current);
          if (!tt) return;
          const Ge = Re.nativeEvent,
            ut = new Ye({
              active: Pe.current,
              activeNode: tt,
              event: Ge,
              options: zt,
              context: ht,
              onAbort(De) {
                if (!te.get(De)) return;
                const { onDragAbort: Ze } = W.current,
                  Lt = { id: De };
                (Ze?.(Lt), Z({ type: 'onDragAbort', event: Lt }));
              },
              onPending(De, St, Ze, Lt) {
                if (!te.get(De)) return;
                const { onDragPending: Kt } = W.current,
                  gt = {
                    id: De,
                    constraint: St,
                    initialCoordinates: Ze,
                    offset: Lt,
                  };
                (Kt?.(gt), Z({ type: 'onDragPending', event: gt }));
              },
              onStart(De) {
                const St = Pe.current;
                if (St == null) return;
                const Ze = te.get(St);
                if (!Ze) return;
                const { onDragStart: Lt } = W.current,
                  Ot = {
                    activatorEvent: Ge,
                    active: { id: St, data: Ze.data, rect: Te },
                  };
                dl.unstable_batchedUpdates(() => {
                  (Lt?.(Ot),
                    oe(On.Initializing),
                    b({
                      type: Ue.DragStart,
                      initialCoordinates: De,
                      active: St,
                    }),
                    Z({ type: 'onDragStart', event: Ot }),
                    Ae(Mr.current),
                    A(Ge));
                });
              },
              onMove(De) {
                b({ type: Ue.DragMove, coordinates: De });
              },
              onEnd: en(Ue.DragEnd),
              onCancel: en(Ue.DragCancel),
            });
          Mr.current = ut;
          function en(De) {
            return async function () {
              const {
                active: Ze,
                collisions: Lt,
                over: Ot,
                scrollAdjustedTranslate: Kt,
              } = ht.current;
              let gt = null;
              if (Ze && Kt) {
                const { cancelDrop: tn } = W.current;
                ((gt = {
                  activatorEvent: Ge,
                  active: Ze,
                  collisions: Lt,
                  delta: Kt,
                  over: Ot,
                }),
                  De === Ue.DragEnd &&
                    typeof tn == 'function' &&
                    (await Promise.resolve(tn(gt))) &&
                    (De = Ue.DragCancel));
              }
              ((Pe.current = null),
                dl.unstable_batchedUpdates(() => {
                  (b({ type: De }),
                    oe(On.Uninitialized),
                    Rl(null),
                    Ae(null),
                    A(null),
                    (Mr.current = null));
                  const tn = De === Ue.DragEnd ? 'onDragEnd' : 'onDragCancel';
                  if (gt) {
                    const zr = W.current[tn];
                    (zr?.(gt), Z({ type: tn, event: gt }));
                  }
                }));
            };
          }
        },
        [te],
      ),
      _r = C.useCallback(
        (Re, Xe) => (Ye, zt) => {
          const tt = Ye.nativeEvent,
            Ge = te.get(zt);
          if (Pe.current !== null || !Ge || tt.dndKit || tt.defaultPrevented)
            return;
          const ut = { active: Ge };
          Re(Ye, Xe.options, ut) === !0 &&
            ((tt.dndKit = { capturedBy: Xe.sensor }),
            (Pe.current = zt),
            qn(Ye, Xe));
        },
        [te, qn],
      ),
      Jn = ch(N, _r);
    (mh(N),
      Ht(() => {
        ie && Y === On.Initializing && oe(On.Initialized);
      }, [ie, Y]),
      C.useEffect(() => {
        const { onDragMove: Re } = W.current,
          {
            active: Xe,
            activatorEvent: Ye,
            collisions: zt,
            over: tt,
          } = ht.current;
        if (!Xe || !Ye) return;
        const Ge = {
          active: Xe,
          activatorEvent: Ye,
          collisions: zt,
          delta: { x: Qt.x, y: Qt.y },
          over: tt,
        };
        dl.unstable_batchedUpdates(() => {
          (Re?.(Ge), Z({ type: 'onDragMove', event: Ge }));
        });
      }, [Qt.x, Qt.y]),
      C.useEffect(() => {
        const {
          active: Re,
          activatorEvent: Xe,
          collisions: Ye,
          droppableContainers: zt,
          scrollAdjustedTranslate: tt,
        } = ht.current;
        if (!Re || Pe.current == null || !Xe || !tt) return;
        const { onDragOver: Ge } = W.current,
          ut = zt.get(pn),
          en =
            ut && ut.rect.current
              ? {
                  id: ut.id,
                  rect: ut.rect.current,
                  data: ut.data,
                  disabled: ut.disabled,
                }
              : null,
          De = {
            active: Re,
            activatorEvent: Xe,
            collisions: Ye,
            delta: { x: tt.x, y: tt.y },
            over: en,
          };
        dl.unstable_batchedUpdates(() => {
          (Rl(en), Ge?.(De), Z({ type: 'onDragOver', event: De }));
        });
      }, [pn]),
      Ht(() => {
        ((ht.current = {
          activatorEvent: ce,
          active: Se,
          activeNode: le,
          collisionRect: Pt,
          collisions: dn,
          droppableRects: q,
          draggableNodes: te,
          draggingNode: Jt,
          draggingNodeRect: bt,
          droppableContainers: me,
          over: it,
          scrollableAncestors: ot,
          scrollAdjustedTranslate: Qt,
        }),
          (Te.current = { initial: bt, translated: Pt }));
      }, [Se, le, dn, Pt, te, Jt, bt, q, me, it, ot, Qt]),
      ih({
        ...se,
        delta: ve,
        draggingRect: Pt,
        pointerCoordinates: Dr,
        scrollableAncestors: ot,
        scrollableAncestorRects: Tt,
      }));
    const Tr = C.useMemo(
        () => ({
          active: Se,
          activeNode: le,
          activeNodeRect: ie,
          activatorEvent: ce,
          collisions: dn,
          containerNodeRect: $t,
          dragOverlay: vt,
          draggableNodes: te,
          droppableContainers: me,
          droppableRects: q,
          over: it,
          measureDroppableContainers: re,
          scrollableAncestors: ot,
          scrollableAncestorRects: Tt,
          measuringConfiguration: D,
          measuringScheduled: ue,
          windowRect: In,
        }),
        [Se, le, ie, ce, dn, $t, vt, te, me, q, it, re, ot, Tt, D, ue, In],
      ),
      Pr = C.useMemo(
        () => ({
          activatorEvent: ce,
          activators: Jn,
          active: Se,
          activeNodeRect: ie,
          ariaDescribedById: { draggable: j },
          dispatch: b,
          draggableNodes: te,
          over: it,
          measureDroppableContainers: re,
        }),
        [ce, Jn, Se, ie, b, j, te, it, re],
      );
    return _e.createElement(
      Qc.Provider,
      { value: $ },
      _e.createElement(
        xl.Provider,
        { value: Pr },
        _e.createElement(
          ff.Provider,
          { value: Tr },
          _e.createElement(Yo.Provider, { value: Nl }, E),
        ),
        _e.createElement(Nh, { disabled: m?.restoreFocus === !1 }),
      ),
      _e.createElement(Lp, { ...m, hiddenTextDescribedById: j }),
    );
    function hn() {
      const Re = Ke?.autoScrollEnabled === !1,
        Xe = typeof S == 'object' ? S.enabled === !1 : S === !1,
        Ye = ee && !Re && !Xe;
      return typeof S == 'object' ? { ...S, enabled: Ye } : { enabled: Ye };
    }
  }),
  Th = C.createContext(null),
  Bc = 'button',
  Ph = 'Draggable';
function zh(o) {
  let { id: u, data: s, disabled: c = !1, attributes: d } = o;
  const h = Sl(Ph),
    {
      activators: y,
      activatorEvent: m,
      active: S,
      activeNodeRect: E,
      ariaDescribedById: N,
      draggableNodes: R,
      over: P,
    } = C.useContext(xl),
    {
      role: L = Bc,
      roleDescription: G = 'draggable',
      tabIndex: O = 0,
    } = d ?? {},
    I = S?.id === u,
    b = C.useContext(I ? Yo : Th),
    [Z, $] = jo(),
    [Y, oe] = jo(),
    ee = wh(y, u),
    Q = gl(s);
  Ht(
    () => (
      R.set(u, { id: u, key: h, node: Z, activatorNode: Y, data: Q }),
      () => {
        const ve = R.get(u);
        ve && ve.key === h && R.delete(u);
      }
    ),
    [R, u],
  );
  const te = C.useMemo(
    () => ({
      role: L,
      tabIndex: O,
      'aria-disabled': c,
      'aria-pressed': I && L === Bc ? !0 : void 0,
      'aria-roledescription': G,
      'aria-describedby': N.draggable,
    }),
    [c, L, O, I, G, N.draggable],
  );
  return {
    active: S,
    activatorEvent: m,
    activeNodeRect: E,
    attributes: te,
    isDragging: I,
    listeners: c ? void 0 : ee,
    node: Z,
    over: P,
    setNodeRef: $,
    setActivatorNodeRef: oe,
    transform: b,
  };
}
function pf() {
  return C.useContext(ff);
}
const Lh = 'Droppable',
  Oh = { timeout: 25 };
function Ih(o) {
  let { data: u, disabled: s = !1, id: c, resizeObserverConfig: d } = o;
  const h = Sl(Lh),
    {
      active: y,
      dispatch: m,
      over: S,
      measureDroppableContainers: E,
    } = C.useContext(xl),
    N = C.useRef({ disabled: s }),
    R = C.useRef(!1),
    P = C.useRef(null),
    L = C.useRef(null),
    { disabled: G, updateMeasurementsFor: O, timeout: I } = { ...Oh, ...d },
    b = gl(O ?? c),
    Z = C.useCallback(() => {
      if (!R.current) {
        R.current = !0;
        return;
      }
      (L.current != null && clearTimeout(L.current),
        (L.current = setTimeout(() => {
          (E(Array.isArray(b.current) ? b.current : [b.current]),
            (L.current = null));
        }, I)));
    }, [I]),
    $ = Xo({ callback: Z, disabled: G || !y }),
    Y = C.useCallback(
      (te, ve) => {
        $ && (ve && ($.unobserve(ve), (R.current = !1)), te && $.observe(te));
      },
      [$],
    ),
    [oe, ee] = jo(Y),
    Q = gl(u);
  return (
    C.useEffect(() => {
      !$ ||
        !oe.current ||
        ($.disconnect(), (R.current = !1), $.observe(oe.current));
    }, [oe, $]),
    C.useEffect(
      () => (
        m({
          type: Ue.RegisterDroppable,
          element: { id: c, key: h, disabled: s, node: oe, rect: P, data: Q },
        }),
        () => m({ type: Ue.UnregisterDroppable, key: h, id: c })
      ),
      [c],
    ),
    C.useEffect(() => {
      s !== N.current.disabled &&
        (m({ type: Ue.SetDroppableDisabled, id: c, key: h, disabled: s }),
        (N.current.disabled = s));
    }, [c, h, s, m]),
    {
      active: y,
      rect: P,
      isOver: S?.id === c,
      node: oe,
      over: S,
      setNodeRef: ee,
    }
  );
}
function Ah(o) {
  let { animation: u, children: s } = o;
  const [c, d] = C.useState(null),
    [h, y] = C.useState(null),
    m = Fo(s);
  return (
    !s && !c && m && d(m),
    Ht(() => {
      if (!h) return;
      const S = c?.key,
        E = c?.props.id;
      if (S == null || E == null) {
        d(null);
        return;
      }
      Promise.resolve(u(E, h)).then(() => {
        d(null);
      });
    }, [u, c, h]),
    _e.createElement(
      _e.Fragment,
      null,
      s,
      c ? C.cloneElement(c, { ref: y }) : null,
    )
  );
}
const jh = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
function Fh(o) {
  let { children: u } = o;
  return _e.createElement(
    xl.Provider,
    { value: cf },
    _e.createElement(Yo.Provider, { value: jh }, u),
  );
}
const Uh = { position: 'fixed', touchAction: 'none' },
  Bh = (o) => (Qo(o) ? 'transform 250ms ease' : void 0),
  Vh = C.forwardRef((o, u) => {
    let {
      as: s,
      activatorEvent: c,
      adjustScale: d,
      children: h,
      className: y,
      rect: m,
      style: S,
      transform: E,
      transition: N = Bh,
    } = o;
    if (!m) return null;
    const R = d ? E : { ...E, scaleX: 1, scaleY: 1 },
      P = {
        ...Uh,
        width: m.width,
        height: m.height,
        top: m.top,
        left: m.left,
        transform: Gn.Transform.toString(R),
        transformOrigin: d && c ? Op(c, m) : void 0,
        transition: typeof N == 'function' ? N(c) : N,
        ...S,
      };
    return _e.createElement(s, { className: y, style: P, ref: u }, h);
  }),
  Hh = (o) => (u) => {
    let { active: s, dragOverlay: c } = u;
    const d = {},
      { styles: h, className: y } = o;
    if (h != null && h.active)
      for (const [m, S] of Object.entries(h.active))
        S !== void 0 &&
          ((d[m] = s.node.style.getPropertyValue(m)),
          s.node.style.setProperty(m, S));
    if (h != null && h.dragOverlay)
      for (const [m, S] of Object.entries(h.dragOverlay))
        S !== void 0 && c.node.style.setProperty(m, S);
    return (
      y != null && y.active && s.node.classList.add(y.active),
      y != null && y.dragOverlay && c.node.classList.add(y.dragOverlay),
      function () {
        for (const [S, E] of Object.entries(d)) s.node.style.setProperty(S, E);
        y != null && y.active && s.node.classList.remove(y.active);
      }
    );
  },
  Wh = (o) => {
    let {
      transform: { initial: u, final: s },
    } = o;
    return [
      { transform: Gn.Transform.toString(u) },
      { transform: Gn.Transform.toString(s) },
    ];
  },
  $h = {
    duration: 250,
    easing: 'ease',
    keyframes: Wh,
    sideEffects: Hh({ styles: { active: { opacity: '0' } } }),
  };
function Qh(o) {
  let {
    config: u,
    draggableNodes: s,
    droppableContainers: c,
    measuringConfiguration: d,
  } = o;
  return $o((h, y) => {
    if (u === null) return;
    const m = s.get(h);
    if (!m) return;
    const S = m.node.current;
    if (!S) return;
    const E = af(y);
    if (!E) return;
    const { transform: N } = lt(y).getComputedStyle(y),
      R = Zc(N);
    if (!R) return;
    const P = typeof u == 'function' ? u : Kh(u);
    return (
      rf(S, d.draggable.measure),
      P({
        active: { id: h, data: m.data, node: S, rect: d.draggable.measure(S) },
        draggableNodes: s,
        dragOverlay: { node: y, rect: d.dragOverlay.measure(E) },
        droppableContainers: c,
        measuringConfiguration: d,
        transform: R,
      })
    );
  });
}
function Kh(o) {
  const {
    duration: u,
    easing: s,
    sideEffects: c,
    keyframes: d,
  } = { ...$h, ...o };
  return (h) => {
    let { active: y, dragOverlay: m, transform: S, ...E } = h;
    if (!u) return;
    const N = { x: m.rect.left - y.rect.left, y: m.rect.top - y.rect.top },
      R = {
        scaleX: S.scaleX !== 1 ? (y.rect.width * S.scaleX) / m.rect.width : 1,
        scaleY: S.scaleY !== 1 ? (y.rect.height * S.scaleY) / m.rect.height : 1,
      },
      P = { x: S.x - N.x, y: S.y - N.y, ...R },
      L = d({
        ...E,
        active: y,
        dragOverlay: m,
        transform: { initial: S, final: P },
      }),
      [G] = L,
      O = L[L.length - 1];
    if (JSON.stringify(G) === JSON.stringify(O)) return;
    const I = c?.({ active: y, dragOverlay: m, ...E }),
      b = m.node.animate(L, { duration: u, easing: s, fill: 'forwards' });
    return new Promise((Z) => {
      b.onfinish = () => {
        (I?.(), Z());
      };
    });
  };
}
let Vc = 0;
function Xh(o) {
  return C.useMemo(() => {
    if (o != null) return (Vc++, Vc);
  }, [o]);
}
const ug = _e.memo((o) => {
  let {
    adjustScale: u = !1,
    children: s,
    dropAnimation: c,
    style: d,
    transition: h,
    modifiers: y,
    wrapperElement: m = 'div',
    className: S,
    zIndex: E = 999,
  } = o;
  const {
      activatorEvent: N,
      active: R,
      activeNodeRect: P,
      containerNodeRect: L,
      draggableNodes: G,
      droppableContainers: O,
      dragOverlay: I,
      over: b,
      measuringConfiguration: Z,
      scrollableAncestors: $,
      scrollableAncestorRects: Y,
      windowRect: oe,
    } = pf(),
    ee = C.useContext(Yo),
    Q = Xh(R?.id),
    te = df(y, {
      activatorEvent: N,
      active: R,
      activeNodeRect: P,
      containerNodeRect: L,
      draggingNodeRect: I.rect,
      over: b,
      overlayNodeRect: I.rect,
      scrollableAncestors: $,
      scrollableAncestorRects: Y,
      transform: ee,
      windowRect: oe,
    }),
    ve = $u(P),
    me = Qh({
      config: c,
      draggableNodes: G,
      droppableContainers: O,
      measuringConfiguration: Z,
    }),
    de = ve ? I.setRef : void 0;
  return _e.createElement(
    Fh,
    null,
    _e.createElement(
      Ah,
      { animation: me },
      R && Q
        ? _e.createElement(
            Vh,
            {
              key: Q,
              id: R.id,
              ref: de,
              as: m,
              activatorEvent: N,
              adjustScale: u,
              className: S,
              transition: h,
              rect: ve,
              style: { zIndex: E, ...d },
              transform: te,
            },
            s,
          )
        : null,
    ),
  );
});
function hf(o, u, s) {
  const c = o.slice();
  return (c.splice(s < 0 ? c.length + s : s, 0, c.splice(u, 1)[0]), c);
}
function Yh(o, u) {
  return o.reduce((s, c, d) => {
    const h = u.get(c);
    return (h && (s[d] = h), s);
  }, Array(o.length));
}
function Oo(o) {
  return o !== null && o >= 0;
}
function Gh(o, u) {
  if (o === u) return !0;
  if (o.length !== u.length) return !1;
  for (let s = 0; s < o.length; s++) if (o[s] !== u[s]) return !1;
  return !0;
}
function Zh(o) {
  return typeof o == 'boolean' ? { draggable: o, droppable: o } : o;
}
const vf = (o) => {
    let { rects: u, activeIndex: s, overIndex: c, index: d } = o;
    const h = hf(u, c, s),
      y = u[d],
      m = h[d];
    return !m || !y
      ? null
      : {
          x: m.left - y.left,
          y: m.top - y.top,
          scaleX: m.width / y.width,
          scaleY: m.height / y.height,
        };
  },
  Io = { scaleX: 1, scaleY: 1 },
  sg = (o) => {
    var u;
    let {
      activeIndex: s,
      activeNodeRect: c,
      index: d,
      rects: h,
      overIndex: y,
    } = o;
    const m = (u = h[s]) != null ? u : c;
    if (!m) return null;
    if (d === s) {
      const E = h[y];
      return E
        ? {
            x: 0,
            y: s < y ? E.top + E.height - (m.top + m.height) : E.top - m.top,
            ...Io,
          }
        : null;
    }
    const S = qh(h, d, s);
    return d > s && d <= y
      ? { x: 0, y: -m.height - S, ...Io }
      : d < s && d >= y
        ? { x: 0, y: m.height + S, ...Io }
        : { x: 0, y: 0, ...Io };
  };
function qh(o, u, s) {
  const c = o[u],
    d = o[u - 1],
    h = o[u + 1];
  return c
    ? s < u
      ? d
        ? c.top - (d.top + d.height)
        : h
          ? h.top - (c.top + c.height)
          : 0
      : h
        ? h.top - (c.top + c.height)
        : d
          ? c.top - (d.top + d.height)
          : 0
    : 0;
}
const gf = 'Sortable',
  yf = _e.createContext({
    activeIndex: -1,
    containerId: gf,
    disableTransforms: !1,
    items: [],
    overIndex: -1,
    useDragOverlay: !1,
    sortedRects: [],
    strategy: vf,
    disabled: { draggable: !1, droppable: !1 },
  });
function ag(o) {
  let { children: u, id: s, items: c, strategy: d = vf, disabled: h = !1 } = o;
  const {
      active: y,
      dragOverlay: m,
      droppableRects: S,
      over: E,
      measureDroppableContainers: N,
    } = pf(),
    R = Sl(gf, s),
    P = m.rect !== null,
    L = C.useMemo(
      () => c.map((ee) => (typeof ee == 'object' && 'id' in ee ? ee.id : ee)),
      [c],
    ),
    G = y != null,
    O = y ? L.indexOf(y.id) : -1,
    I = E ? L.indexOf(E.id) : -1,
    b = C.useRef(L),
    Z = !Gh(L, b.current),
    $ = (I !== -1 && O === -1) || Z,
    Y = Zh(h);
  (Ht(() => {
    Z && G && N(L);
  }, [Z, L, G, N]),
    C.useEffect(() => {
      b.current = L;
    }, [L]));
  const oe = C.useMemo(
    () => ({
      activeIndex: O,
      containerId: R,
      disabled: Y,
      disableTransforms: $,
      items: L,
      overIndex: I,
      useDragOverlay: P,
      sortedRects: Yh(L, S),
      strategy: d,
    }),
    [O, R, Y.draggable, Y.droppable, $, L, I, S, P, d],
  );
  return _e.createElement(yf.Provider, { value: oe }, u);
}
const Jh = (o) => {
    let { id: u, items: s, activeIndex: c, overIndex: d } = o;
    return hf(s, c, d).indexOf(u);
  },
  bh = (o) => {
    let {
      containerId: u,
      isSorting: s,
      wasDragging: c,
      index: d,
      items: h,
      newIndex: y,
      previousItems: m,
      previousContainerId: S,
      transition: E,
    } = o;
    return !E || !c || (m !== h && d === y) ? !1 : s ? !0 : y !== d && u === S;
  },
  ev = { duration: 200, easing: 'ease' },
  mf = 'transform',
  tv = Gn.Transition.toString({ property: mf, duration: 0, easing: 'linear' }),
  nv = { roleDescription: 'sortable' };
function rv(o) {
  let { disabled: u, index: s, node: c, rect: d } = o;
  const [h, y] = C.useState(null),
    m = C.useRef(s);
  return (
    Ht(() => {
      if (!u && s !== m.current && c.current) {
        const S = d.current;
        if (S) {
          const E = Er(c.current, { ignoreTransform: !0 }),
            N = {
              x: S.left - E.left,
              y: S.top - E.top,
              scaleX: S.width / E.width,
              scaleY: S.height / E.height,
            };
          (N.x || N.y) && y(N);
        }
      }
      s !== m.current && (m.current = s);
    }, [u, s, c, d]),
    C.useEffect(() => {
      h && y(null);
    }, [h]),
    h
  );
}
function cg(o) {
  let {
    animateLayoutChanges: u = bh,
    attributes: s,
    disabled: c,
    data: d,
    getNewIndex: h = Jh,
    id: y,
    strategy: m,
    resizeObserverConfig: S,
    transition: E = ev,
  } = o;
  const {
      items: N,
      containerId: R,
      activeIndex: P,
      disabled: L,
      disableTransforms: G,
      sortedRects: O,
      overIndex: I,
      useDragOverlay: b,
      strategy: Z,
    } = C.useContext(yf),
    $ = lv(c, L),
    Y = N.indexOf(y),
    oe = C.useMemo(
      () => ({ sortable: { containerId: R, index: Y, items: N }, ...d }),
      [R, d, Y, N],
    ),
    ee = C.useMemo(() => N.slice(N.indexOf(y)), [N, y]),
    {
      rect: Q,
      node: te,
      isOver: ve,
      setNodeRef: me,
    } = Ih({
      id: y,
      data: oe,
      disabled: $.droppable,
      resizeObserverConfig: { updateMeasurementsFor: ee, ...S },
    }),
    {
      active: de,
      activatorEvent: Te,
      activeNodeRect: Se,
      attributes: Pe,
      setNodeRef: Ke,
      listeners: Ae,
      isDragging: ce,
      over: A,
      setActivatorNodeRef: W,
      transform: j,
    } = zh({
      id: y,
      data: oe,
      attributes: { ...nv, ...s },
      disabled: $.draggable,
    }),
    g = kp(me, Ke),
    D = !!de,
    q = D && !G && Oo(P) && Oo(I),
    re = !b && ce,
    ue = re && q ? j : null,
    ye = q
      ? (ue ??
        (m ?? Z)({
          rects: O,
          activeNodeRect: Se,
          activeIndex: P,
          overIndex: I,
          index: Y,
        }))
      : null,
    se =
      Oo(P) && Oo(I) ? h({ id: y, items: N, activeIndex: P, overIndex: I }) : Y,
    pe = de?.id,
    ie = C.useRef({ activeId: pe, items: N, newIndex: se, containerId: R }),
    $t = N !== ie.current.items,
    ht = u({
      active: de,
      containerId: R,
      isDragging: ce,
      isSorting: D,
      id: y,
      index: Y,
      items: N,
      newIndex: ie.current.newIndex,
      previousItems: ie.current.items,
      previousContainerId: ie.current.containerId,
      transition: E,
      wasDragging: ie.current.activeId != null,
    }),
    _t = rv({ disabled: !ht, index: Y, node: te, rect: Q });
  return (
    C.useEffect(() => {
      (D && ie.current.newIndex !== se && (ie.current.newIndex = se),
        R !== ie.current.containerId && (ie.current.containerId = R),
        N !== ie.current.items && (ie.current.items = N));
    }, [D, se, R, N]),
    C.useEffect(() => {
      if (pe === ie.current.activeId) return;
      if (pe && !ie.current.activeId) {
        ie.current.activeId = pe;
        return;
      }
      const Jt = setTimeout(() => {
        ie.current.activeId = pe;
      }, 50);
      return () => clearTimeout(Jt);
    }, [pe]),
    {
      active: de,
      activeIndex: P,
      attributes: Pe,
      data: oe,
      rect: Q,
      index: Y,
      newIndex: se,
      items: N,
      isOver: ve,
      isSorting: D,
      isDragging: ce,
      listeners: Ae,
      node: te,
      overIndex: I,
      over: A,
      setNodeRef: g,
      setActivatorNodeRef: W,
      setDroppableNodeRef: me,
      setDraggableNodeRef: Ke,
      transform: _t ?? ye,
      transition: vt(),
    }
  );
  function vt() {
    if (_t || ($t && ie.current.newIndex === Y)) return tv;
    if (!((re && !Qo(Te)) || !E) && (D || ht))
      return Gn.Transition.toString({ ...E, property: mf });
  }
}
function lv(o, u) {
  var s, c;
  return typeof o == 'boolean'
    ? { draggable: o, droppable: !1 }
    : {
        draggable: (s = o?.draggable) != null ? s : u.draggable,
        droppable: (c = o?.droppable) != null ? c : u.droppable,
      };
}
function Ho(o) {
  if (!o) return !1;
  const u = o.data.current;
  return !!(
    u &&
    'sortable' in u &&
    typeof u.sortable == 'object' &&
    'containerId' in u.sortable &&
    'items' in u.sortable &&
    'index' in u.sortable
  );
}
const ov = [fe.Down, fe.Right, fe.Up, fe.Left],
  fg = (o, u) => {
    let {
      context: {
        active: s,
        collisionRect: c,
        droppableRects: d,
        droppableContainers: h,
        over: y,
        scrollableAncestors: m,
      },
    } = u;
    if (ov.includes(o.code)) {
      if ((o.preventDefault(), !s || !c)) return;
      const S = [];
      h.getEnabled().forEach((R) => {
        if (!R || (R != null && R.disabled)) return;
        const P = d.get(R.id);
        if (P)
          switch (o.code) {
            case fe.Down:
              c.top < P.top && S.push(R);
              break;
            case fe.Up:
              c.top > P.top && S.push(R);
              break;
            case fe.Left:
              c.left > P.left && S.push(R);
              break;
            case fe.Right:
              c.left < P.left && S.push(R);
              break;
          }
      });
      const E = Ap({
        collisionRect: c,
        droppableRects: d,
        droppableContainers: S,
      });
      let N = Yc(E, 'id');
      if ((N === y?.id && E.length > 1 && (N = E[1].id), N != null)) {
        const R = h.get(s.id),
          P = h.get(N),
          L = P ? d.get(P.id) : null,
          G = P?.node.current;
        if (G && L && R && P) {
          const I = Ko(G).some((ee, Q) => m[Q] !== ee),
            b = wf(R, P),
            Z = iv(R, P),
            $ =
              I || !b
                ? { x: 0, y: 0 }
                : {
                    x: Z ? c.width - L.width : 0,
                    y: Z ? c.height - L.height : 0,
                  },
            Y = { x: L.left, y: L.top };
          return $.x && $.y ? Y : yl(Y, $);
        }
      }
    }
  };
function wf(o, u) {
  return !Ho(o) || !Ho(u)
    ? !1
    : o.data.current.sortable.containerId ===
        u.data.current.sortable.containerId;
}
function iv(o, u) {
  return !Ho(o) || !Ho(u) || !wf(o, u)
    ? !1
    : o.data.current.sortable.index < u.data.current.sortable.index;
}
export {
  mv as $,
  sv as A,
  fv as B,
  hv as C,
  xv as D,
  sg as E,
  Ev as F,
  ug as G,
  Dv as H,
  Mv as I,
  hf as J,
  fg as K,
  Ov as L,
  of as M,
  uf as N,
  cg as O,
  Fv as P,
  Gn as Q,
  _e as R,
  Hv as S,
  Yv as T,
  eg as U,
  Xv as V,
  zv as W,
  tg as X,
  Cv as Y,
  ng as Z,
  Qv as _,
  dp as a,
  qv as a0,
  Uv as a1,
  kv as a2,
  Zv as a3,
  yv as a4,
  pv as a5,
  Iv as a6,
  Tv as a7,
  Kv as a8,
  Av as a9,
  bv as aa,
  Bv as ab,
  Vv as ac,
  Rv as ad,
  yp as b,
  C as c,
  cv as d,
  dv as e,
  av as f,
  uv as g,
  Sv as h,
  $v as i,
  Lv as j,
  wv as k,
  gv as l,
  vv as m,
  _v as n,
  Jv as o,
  Gv as p,
  Pv as q,
  Hc as r,
  jv as s,
  Wv as t,
  Nv as u,
  lg as v,
  rg as w,
  ig as x,
  og as y,
  ag as z,
};
