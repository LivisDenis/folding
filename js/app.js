/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        i = t.dataset.da.trim().split(","),
        n = {};
      (n.element = t),
        (n.parent = t.parentNode),
        (n.destination = document.querySelector(i[0].trim())),
        (n.breakpoint = i[1] ? i[1].trim() : "767"),
        (n.place = i[2] ? i[2].trim() : "last"),
        (n.index = this.indexInParent(n.parent, n.element)),
        this.оbjects.push(n);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, i) {
          return Array.prototype.indexOf.call(i, e) === t;
        }
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const i = this.mediaQueries[t],
        n = String.prototype.split.call(i, ","),
        s = window.matchMedia(n[0]),
        r = n[1],
        o = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === r;
        });
      s.addListener(function () {
        e.mediaHandler(s, o);
      }),
        this.mediaHandler(s, o);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const i = t[e];
          (i.index = this.indexInParent(i.parent, i.element)),
            this.moveTo(i.place, i.element, i.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const i = t[e];
          i.element.classList.contains(this.daClassname) &&
            this.moveBack(i.parent, i.element, i.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, i) {
      t.classList.add(this.daClassname),
        "last" === e || e >= i.children.length
          ? i.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? i.children[e].insertAdjacentElement("beforebegin", t)
          : i.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, i) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[i]
          ? e.children[i].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const i = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(i, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  let t = !0,
    i = (e = 500) => {
      let i = document.querySelector("body");
      if (t) {
        let n = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < n.length; e++) {
            n[e].style.paddingRight = "0px";
          }
          (i.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    },
    n = (e = 500) => {
      let i = document.querySelector("body");
      if (t) {
        let n = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < n.length; e++) {
          n[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (i.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    };
  const s = { inputMaskModule: null, selectModule: null };
  let r = {
    getErrors(e) {
      let t = 0,
        i = e.querySelectorAll("*[data-required]");
      return (
        i.length &&
          i.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let t = e.querySelectorAll("input,textarea");
          for (let e = 0; e < t.length; e++) {
            const i = t[e];
            i.parentElement.classList.remove("_form-focus"),
              i.classList.remove("_form-focus"),
              r.removeError(i),
              (i.value = i.dataset.placeholder);
          }
          let i = e.querySelectorAll(".checkbox__input");
          if (i.length > 0)
            for (let e = 0; e < i.length; e++) {
              i[e].checked = !1;
            }
          if (s.selectModule) {
            let t = e.querySelectorAll(".select");
            if (t.length)
              for (let e = 0; e < t.length; e++) {
                const i = t[e].querySelector("select");
                s.selectModule.selectBuild(i);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function o(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function a(e) {
    return e instanceof o(e).Element || e instanceof Element;
  }
  function l(e) {
    return e instanceof o(e).HTMLElement || e instanceof HTMLElement;
  }
  function d(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof o(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var c = Math.max,
    u = Math.min,
    p = Math.round;
  function h(e, t) {
    void 0 === t && (t = !1);
    var i = e.getBoundingClientRect(),
      n = 1,
      s = 1;
    if (l(e) && t) {
      var r = e.offsetHeight,
        o = e.offsetWidth;
      o > 0 && (n = p(i.width) / o || 1), r > 0 && (s = p(i.height) / r || 1);
    }
    return {
      width: i.width / n,
      height: i.height / s,
      top: i.top / s,
      right: i.right / n,
      bottom: i.bottom / s,
      left: i.left / n,
      x: i.left / n,
      y: i.top / s,
    };
  }
  function f(e) {
    var t = o(e);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function g(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function m(e) {
    return ((a(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function v(e) {
    return h(m(e)).left + f(e).scrollLeft;
  }
  function y(e) {
    return o(e).getComputedStyle(e);
  }
  function b(e) {
    var t = y(e),
      i = t.overflow,
      n = t.overflowX,
      s = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(i + s + n);
  }
  function w(e, t, i) {
    void 0 === i && (i = !1);
    var n,
      s,
      r = l(t),
      a =
        l(t) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            i = p(t.width) / e.offsetWidth || 1,
            n = p(t.height) / e.offsetHeight || 1;
          return 1 !== i || 1 !== n;
        })(t),
      d = m(t),
      c = h(e, a),
      u = { scrollLeft: 0, scrollTop: 0 },
      y = { x: 0, y: 0 };
    return (
      (r || (!r && !i)) &&
        (("body" !== g(t) || b(d)) &&
          (u =
            (n = t) !== o(n) && l(n)
              ? { scrollLeft: (s = n).scrollLeft, scrollTop: s.scrollTop }
              : f(n)),
        l(t)
          ? (((y = h(t, !0)).x += t.clientLeft), (y.y += t.clientTop))
          : d && (y.x = v(d))),
      {
        x: c.left + u.scrollLeft - y.x,
        y: c.top + u.scrollTop - y.y,
        width: c.width,
        height: c.height,
      }
    );
  }
  function x(e) {
    var t = h(e),
      i = e.offsetWidth,
      n = e.offsetHeight;
    return (
      Math.abs(t.width - i) <= 1 && (i = t.width),
      Math.abs(t.height - n) <= 1 && (n = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: i, height: n }
    );
  }
  function T(e) {
    return "html" === g(e)
      ? e
      : e.assignedSlot || e.parentNode || (d(e) ? e.host : null) || m(e);
  }
  function C(e) {
    return ["html", "body", "#document"].indexOf(g(e)) >= 0
      ? e.ownerDocument.body
      : l(e) && b(e)
      ? e
      : C(T(e));
  }
  function S(e, t) {
    var i;
    void 0 === t && (t = []);
    var n = C(e),
      s = n === (null == (i = e.ownerDocument) ? void 0 : i.body),
      r = o(n),
      a = s ? [r].concat(r.visualViewport || [], b(n) ? n : []) : n,
      l = t.concat(a);
    return s ? l : l.concat(S(T(a)));
  }
  function E(e) {
    return ["table", "td", "th"].indexOf(g(e)) >= 0;
  }
  function O(e) {
    return l(e) && "fixed" !== y(e).position ? e.offsetParent : null;
  }
  function I(e) {
    for (var t = o(e), i = O(e); i && E(i) && "static" === y(i).position; )
      i = O(i);
    return i &&
      ("html" === g(i) || ("body" === g(i) && "static" === y(i).position))
      ? t
      : i ||
          (function (e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (
              -1 !== navigator.userAgent.indexOf("Trident") &&
              l(e) &&
              "fixed" === y(e).position
            )
              return null;
            for (var i = T(e); l(i) && ["html", "body"].indexOf(g(i)) < 0; ) {
              var n = y(i);
              if (
                "none" !== n.transform ||
                "none" !== n.perspective ||
                "paint" === n.contain ||
                -1 !== ["transform", "perspective"].indexOf(n.willChange) ||
                (t && "filter" === n.willChange) ||
                (t && n.filter && "none" !== n.filter)
              )
                return i;
              i = i.parentNode;
            }
            return null;
          })(e) ||
          t;
  }
  var L = "top",
    k = "bottom",
    M = "right",
    A = "left",
    P = "auto",
    D = [L, k, M, A],
    _ = "start",
    z = "end",
    $ = "viewport",
    B = "popper",
    G = D.reduce(function (e, t) {
      return e.concat([t + "-" + _, t + "-" + z]);
    }, []),
    N = [].concat(D, [P]).reduce(function (e, t) {
      return e.concat([t, t + "-" + _, t + "-" + z]);
    }, []),
    j = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function H(e) {
    var t = new Map(),
      i = new Set(),
      n = [];
    function s(e) {
      i.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!i.has(e)) {
              var n = t.get(e);
              n && s(n);
            }
          }),
        n.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        i.has(e.name) || s(e);
      }),
      n
    );
  }
  var V = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function F() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function W(e) {
    void 0 === e && (e = {});
    var t = e,
      i = t.defaultModifiers,
      n = void 0 === i ? [] : i,
      s = t.defaultOptions,
      r = void 0 === s ? V : s;
    return function (e, t, i) {
      void 0 === i && (i = r);
      var s,
        o,
        l = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, V, r),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        d = [],
        c = !1,
        u = {
          state: l,
          setOptions: function (i) {
            var s = "function" == typeof i ? i(l.options) : i;
            p(),
              (l.options = Object.assign({}, r, l.options, s)),
              (l.scrollParents = {
                reference: a(e)
                  ? S(e)
                  : e.contextElement
                  ? S(e.contextElement)
                  : [],
                popper: S(t),
              });
            var o = (function (e) {
              var t = H(e);
              return j.reduce(function (e, i) {
                return e.concat(
                  t.filter(function (e) {
                    return e.phase === i;
                  })
                );
              }, []);
            })(
              (function (e) {
                var t = e.reduce(function (e, t) {
                  var i = e[t.name];
                  return (
                    (e[t.name] = i
                      ? Object.assign({}, i, t, {
                          options: Object.assign({}, i.options, t.options),
                          data: Object.assign({}, i.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {});
                return Object.keys(t).map(function (e) {
                  return t[e];
                });
              })([].concat(n, l.options.modifiers))
            );
            return (
              (l.orderedModifiers = o.filter(function (e) {
                return e.enabled;
              })),
              l.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  i = e.options,
                  n = void 0 === i ? {} : i,
                  s = e.effect;
                if ("function" == typeof s) {
                  var r = s({ state: l, name: t, instance: u, options: n }),
                    o = function () {};
                  d.push(r || o);
                }
              }),
              u.update()
            );
          },
          forceUpdate: function () {
            if (!c) {
              var e = l.elements,
                t = e.reference,
                i = e.popper;
              if (F(t, i)) {
                (l.rects = {
                  reference: w(t, I(i), "fixed" === l.options.strategy),
                  popper: x(i),
                }),
                  (l.reset = !1),
                  (l.placement = l.options.placement),
                  l.orderedModifiers.forEach(function (e) {
                    return (l.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var n = 0; n < l.orderedModifiers.length; n++)
                  if (!0 !== l.reset) {
                    var s = l.orderedModifiers[n],
                      r = s.fn,
                      o = s.options,
                      a = void 0 === o ? {} : o,
                      d = s.name;
                    "function" == typeof r &&
                      (l =
                        r({ state: l, options: a, name: d, instance: u }) || l);
                  } else (l.reset = !1), (n = -1);
              }
            }
          },
          update:
            ((s = function () {
              return new Promise(function (e) {
                u.forceUpdate(), e(l);
              });
            }),
            function () {
              return (
                o ||
                  (o = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (o = void 0), e(s());
                    });
                  })),
                o
              );
            }),
          destroy: function () {
            p(), (c = !0);
          },
        };
      if (!F(e, t)) return u;
      function p() {
        d.forEach(function (e) {
          return e();
        }),
          (d = []);
      }
      return (
        u.setOptions(i).then(function (e) {
          !c && i.onFirstUpdate && i.onFirstUpdate(e);
        }),
        u
      );
    };
  }
  var R = { passive: !0 };
  const q = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: function (e) {
      var t = e.state,
        i = e.instance,
        n = e.options,
        s = n.scroll,
        r = void 0 === s || s,
        a = n.resize,
        l = void 0 === a || a,
        d = o(t.elements.popper),
        c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
      return (
        r &&
          c.forEach(function (e) {
            e.addEventListener("scroll", i.update, R);
          }),
        l && d.addEventListener("resize", i.update, R),
        function () {
          r &&
            c.forEach(function (e) {
              e.removeEventListener("scroll", i.update, R);
            }),
            l && d.removeEventListener("resize", i.update, R);
        }
      );
    },
    data: {},
  };
  function X(e) {
    return e.split("-")[0];
  }
  function Y(e) {
    return e.split("-")[1];
  }
  function U(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function K(e) {
    var t,
      i = e.reference,
      n = e.element,
      s = e.placement,
      r = s ? X(s) : null,
      o = s ? Y(s) : null,
      a = i.x + i.width / 2 - n.width / 2,
      l = i.y + i.height / 2 - n.height / 2;
    switch (r) {
      case L:
        t = { x: a, y: i.y - n.height };
        break;
      case k:
        t = { x: a, y: i.y + i.height };
        break;
      case M:
        t = { x: i.x + i.width, y: l };
        break;
      case A:
        t = { x: i.x - n.width, y: l };
        break;
      default:
        t = { x: i.x, y: i.y };
    }
    var d = r ? U(r) : null;
    if (null != d) {
      var c = "y" === d ? "height" : "width";
      switch (o) {
        case _:
          t[d] = t[d] - (i[c] / 2 - n[c] / 2);
          break;
        case z:
          t[d] = t[d] + (i[c] / 2 - n[c] / 2);
      }
    }
    return t;
  }
  var Q = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function J(e) {
    var t,
      i = e.popper,
      n = e.popperRect,
      s = e.placement,
      r = e.variation,
      a = e.offsets,
      l = e.position,
      d = e.gpuAcceleration,
      c = e.adaptive,
      u = e.roundOffsets,
      h = e.isFixed,
      f = a.x,
      g = void 0 === f ? 0 : f,
      v = a.y,
      b = void 0 === v ? 0 : v,
      w = "function" == typeof u ? u({ x: g, y: b }) : { x: g, y: b };
    (g = w.x), (b = w.y);
    var x = a.hasOwnProperty("x"),
      T = a.hasOwnProperty("y"),
      C = A,
      S = L,
      E = window;
    if (c) {
      var O = I(i),
        P = "clientHeight",
        D = "clientWidth";
      if (
        (O === o(i) &&
          "static" !== y((O = m(i))).position &&
          "absolute" === l &&
          ((P = "scrollHeight"), (D = "scrollWidth")),
        (O = O),
        s === L || ((s === A || s === M) && r === z))
      )
        (S = k),
          (b -=
            (h && E.visualViewport ? E.visualViewport.height : O[P]) -
            n.height),
          (b *= d ? 1 : -1);
      if (s === A || ((s === L || s === k) && r === z))
        (C = M),
          (g -=
            (h && E.visualViewport ? E.visualViewport.width : O[D]) - n.width),
          (g *= d ? 1 : -1);
    }
    var _,
      $ = Object.assign({ position: l }, c && Q),
      B =
        !0 === u
          ? (function (e) {
              var t = e.x,
                i = e.y,
                n = window.devicePixelRatio || 1;
              return { x: p(t * n) / n || 0, y: p(i * n) / n || 0 };
            })({ x: g, y: b })
          : { x: g, y: b };
    return (
      (g = B.x),
      (b = B.y),
      d
        ? Object.assign(
            {},
            $,
            (((_ = {})[S] = T ? "0" : ""),
            (_[C] = x ? "0" : ""),
            (_.transform =
              (E.devicePixelRatio || 1) <= 1
                ? "translate(" + g + "px, " + b + "px)"
                : "translate3d(" + g + "px, " + b + "px, 0)"),
            _)
          )
        : Object.assign(
            {},
            $,
            (((t = {})[S] = T ? b + "px" : ""),
            (t[C] = x ? g + "px" : ""),
            (t.transform = ""),
            t)
          )
    );
  }
  const Z = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var i = t.styles[e] || {},
          n = t.attributes[e] || {},
          s = t.elements[e];
        l(s) &&
          g(s) &&
          (Object.assign(s.style, i),
          Object.keys(n).forEach(function (e) {
            var t = n[e];
            !1 === t
              ? s.removeAttribute(e)
              : s.setAttribute(e, !0 === t ? "" : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        i = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, i.popper),
        (t.styles = i),
        t.elements.arrow && Object.assign(t.elements.arrow.style, i.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var n = t.elements[e],
              s = t.attributes[e] || {},
              r = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : i[e]
              ).reduce(function (e, t) {
                return (e[t] = ""), e;
              }, {});
            l(n) &&
              g(n) &&
              (Object.assign(n.style, r),
              Object.keys(s).forEach(function (e) {
                n.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  const ee = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: function (e) {
      var t = e.state,
        i = e.options,
        n = e.name,
        s = i.offset,
        r = void 0 === s ? [0, 0] : s,
        o = N.reduce(function (e, i) {
          return (
            (e[i] = (function (e, t, i) {
              var n = X(e),
                s = [A, L].indexOf(n) >= 0 ? -1 : 1,
                r =
                  "function" == typeof i
                    ? i(Object.assign({}, t, { placement: e }))
                    : i,
                o = r[0],
                a = r[1];
              return (
                (o = o || 0),
                (a = (a || 0) * s),
                [A, M].indexOf(n) >= 0 ? { x: a, y: o } : { x: o, y: a }
              );
            })(i, t.rects, r)),
            e
          );
        }, {}),
        a = o[t.placement],
        l = a.x,
        d = a.y;
      null != t.modifiersData.popperOffsets &&
        ((t.modifiersData.popperOffsets.x += l),
        (t.modifiersData.popperOffsets.y += d)),
        (t.modifiersData[n] = o);
    },
  };
  var te = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function ie(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return te[e];
    });
  }
  var ne = { start: "end", end: "start" };
  function se(e) {
    return e.replace(/start|end/g, function (e) {
      return ne[e];
    });
  }
  function re(e, t) {
    var i = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (i && d(i)) {
      var n = t;
      do {
        if (n && e.isSameNode(n)) return !0;
        n = n.parentNode || n.host;
      } while (n);
    }
    return !1;
  }
  function oe(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function ae(e, t) {
    return t === $
      ? oe(
          (function (e) {
            var t = o(e),
              i = m(e),
              n = t.visualViewport,
              s = i.clientWidth,
              r = i.clientHeight,
              a = 0,
              l = 0;
            return (
              n &&
                ((s = n.width),
                (r = n.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                  ((a = n.offsetLeft), (l = n.offsetTop))),
              { width: s, height: r, x: a + v(e), y: l }
            );
          })(e)
        )
      : a(t)
      ? (function (e) {
          var t = h(e);
          return (
            (t.top = t.top + e.clientTop),
            (t.left = t.left + e.clientLeft),
            (t.bottom = t.top + e.clientHeight),
            (t.right = t.left + e.clientWidth),
            (t.width = e.clientWidth),
            (t.height = e.clientHeight),
            (t.x = t.left),
            (t.y = t.top),
            t
          );
        })(t)
      : oe(
          (function (e) {
            var t,
              i = m(e),
              n = f(e),
              s = null == (t = e.ownerDocument) ? void 0 : t.body,
              r = c(
                i.scrollWidth,
                i.clientWidth,
                s ? s.scrollWidth : 0,
                s ? s.clientWidth : 0
              ),
              o = c(
                i.scrollHeight,
                i.clientHeight,
                s ? s.scrollHeight : 0,
                s ? s.clientHeight : 0
              ),
              a = -n.scrollLeft + v(e),
              l = -n.scrollTop;
            return (
              "rtl" === y(s || i).direction &&
                (a += c(i.clientWidth, s ? s.clientWidth : 0) - r),
              { width: r, height: o, x: a, y: l }
            );
          })(m(e))
        );
  }
  function le(e, t, i) {
    var n =
        "clippingParents" === t
          ? (function (e) {
              var t = S(T(e)),
                i =
                  ["absolute", "fixed"].indexOf(y(e).position) >= 0 && l(e)
                    ? I(e)
                    : e;
              return a(i)
                ? t.filter(function (e) {
                    return a(e) && re(e, i) && "body" !== g(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      s = [].concat(n, [i]),
      r = s[0],
      o = s.reduce(function (t, i) {
        var n = ae(e, i);
        return (
          (t.top = c(n.top, t.top)),
          (t.right = u(n.right, t.right)),
          (t.bottom = u(n.bottom, t.bottom)),
          (t.left = c(n.left, t.left)),
          t
        );
      }, ae(e, r));
    return (
      (o.width = o.right - o.left),
      (o.height = o.bottom - o.top),
      (o.x = o.left),
      (o.y = o.top),
      o
    );
  }
  function de(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function ce(e, t) {
    return t.reduce(function (t, i) {
      return (t[i] = e), t;
    }, {});
  }
  function ue(e, t) {
    void 0 === t && (t = {});
    var i = t,
      n = i.placement,
      s = void 0 === n ? e.placement : n,
      r = i.boundary,
      o = void 0 === r ? "clippingParents" : r,
      l = i.rootBoundary,
      d = void 0 === l ? $ : l,
      c = i.elementContext,
      u = void 0 === c ? B : c,
      p = i.altBoundary,
      f = void 0 !== p && p,
      g = i.padding,
      v = void 0 === g ? 0 : g,
      y = de("number" != typeof v ? v : ce(v, D)),
      b = u === B ? "reference" : B,
      w = e.rects.popper,
      x = e.elements[f ? b : u],
      T = le(a(x) ? x : x.contextElement || m(e.elements.popper), o, d),
      C = h(e.elements.reference),
      S = K({ reference: C, element: w, strategy: "absolute", placement: s }),
      E = oe(Object.assign({}, w, S)),
      O = u === B ? E : C,
      I = {
        top: T.top - O.top + y.top,
        bottom: O.bottom - T.bottom + y.bottom,
        left: T.left - O.left + y.left,
        right: O.right - T.right + y.right,
      },
      A = e.modifiersData.offset;
    if (u === B && A) {
      var P = A[s];
      Object.keys(I).forEach(function (e) {
        var t = [M, k].indexOf(e) >= 0 ? 1 : -1,
          i = [L, k].indexOf(e) >= 0 ? "y" : "x";
        I[e] += P[i] * t;
      });
    }
    return I;
  }
  function pe(e, t, i) {
    return c(e, u(t, i));
  }
  const he = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        i = e.options,
        n = e.name,
        s = i.mainAxis,
        r = void 0 === s || s,
        o = i.altAxis,
        a = void 0 !== o && o,
        l = i.boundary,
        d = i.rootBoundary,
        p = i.altBoundary,
        h = i.padding,
        f = i.tether,
        g = void 0 === f || f,
        m = i.tetherOffset,
        v = void 0 === m ? 0 : m,
        y = ue(t, { boundary: l, rootBoundary: d, padding: h, altBoundary: p }),
        b = X(t.placement),
        w = Y(t.placement),
        T = !w,
        C = U(b),
        S = "x" === C ? "y" : "x",
        E = t.modifiersData.popperOffsets,
        O = t.rects.reference,
        P = t.rects.popper,
        D =
          "function" == typeof v
            ? v(Object.assign({}, t.rects, { placement: t.placement }))
            : v,
        z =
          "number" == typeof D
            ? { mainAxis: D, altAxis: D }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, D),
        $ = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        B = { x: 0, y: 0 };
      if (E) {
        if (r) {
          var G,
            N = "y" === C ? L : A,
            j = "y" === C ? k : M,
            H = "y" === C ? "height" : "width",
            V = E[C],
            F = V + y[N],
            W = V - y[j],
            R = g ? -P[H] / 2 : 0,
            q = w === _ ? O[H] : P[H],
            K = w === _ ? -P[H] : -O[H],
            Q = t.elements.arrow,
            J = g && Q ? x(Q) : { width: 0, height: 0 },
            Z = t.modifiersData["arrow#persistent"]
              ? t.modifiersData["arrow#persistent"].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            ee = Z[N],
            te = Z[j],
            ie = pe(0, O[H], J[H]),
            ne = T
              ? O[H] / 2 - R - ie - ee - z.mainAxis
              : q - ie - ee - z.mainAxis,
            se = T
              ? -O[H] / 2 + R + ie + te + z.mainAxis
              : K + ie + te + z.mainAxis,
            re = t.elements.arrow && I(t.elements.arrow),
            oe = re ? ("y" === C ? re.clientTop || 0 : re.clientLeft || 0) : 0,
            ae = null != (G = null == $ ? void 0 : $[C]) ? G : 0,
            le = V + se - ae,
            de = pe(g ? u(F, V + ne - ae - oe) : F, V, g ? c(W, le) : W);
          (E[C] = de), (B[C] = de - V);
        }
        if (a) {
          var ce,
            he = "x" === C ? L : A,
            fe = "x" === C ? k : M,
            ge = E[S],
            me = "y" === S ? "height" : "width",
            ve = ge + y[he],
            ye = ge - y[fe],
            be = -1 !== [L, A].indexOf(b),
            we = null != (ce = null == $ ? void 0 : $[S]) ? ce : 0,
            xe = be ? ve : ge - O[me] - P[me] - we + z.altAxis,
            Te = be ? ge + O[me] + P[me] - we - z.altAxis : ye,
            Ce =
              g && be
                ? (function (e, t, i) {
                    var n = pe(e, t, i);
                    return n > i ? i : n;
                  })(xe, ge, Te)
                : pe(g ? xe : ve, ge, g ? Te : ye);
          (E[S] = Ce), (B[S] = Ce - ge);
        }
        t.modifiersData[n] = B;
      }
    },
    requiresIfExists: ["offset"],
  };
  const fe = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t,
        i = e.state,
        n = e.name,
        s = e.options,
        r = i.elements.arrow,
        o = i.modifiersData.popperOffsets,
        a = X(i.placement),
        l = U(a),
        d = [A, M].indexOf(a) >= 0 ? "height" : "width";
      if (r && o) {
        var c = (function (e, t) {
            return de(
              "number" !=
                typeof (e =
                  "function" == typeof e
                    ? e(Object.assign({}, t.rects, { placement: t.placement }))
                    : e)
                ? e
                : ce(e, D)
            );
          })(s.padding, i),
          u = x(r),
          p = "y" === l ? L : A,
          h = "y" === l ? k : M,
          f =
            i.rects.reference[d] +
            i.rects.reference[l] -
            o[l] -
            i.rects.popper[d],
          g = o[l] - i.rects.reference[l],
          m = I(r),
          v = m ? ("y" === l ? m.clientHeight || 0 : m.clientWidth || 0) : 0,
          y = f / 2 - g / 2,
          b = c[p],
          w = v - u[d] - c[h],
          T = v / 2 - u[d] / 2 + y,
          C = pe(b, T, w),
          S = l;
        i.modifiersData[n] = (((t = {})[S] = C), (t.centerOffset = C - T), t);
      }
    },
    effect: function (e) {
      var t = e.state,
        i = e.options.element,
        n = void 0 === i ? "[data-popper-arrow]" : i;
      null != n &&
        ("string" != typeof n || (n = t.elements.popper.querySelector(n))) &&
        re(t.elements.popper, n) &&
        (t.elements.arrow = n);
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function ge(e, t, i) {
    return (
      void 0 === i && (i = { x: 0, y: 0 }),
      {
        top: e.top - t.height - i.y,
        right: e.right - t.width + i.x,
        bottom: e.bottom - t.height + i.y,
        left: e.left - t.width - i.x,
      }
    );
  }
  function me(e) {
    return [L, M, k, A].some(function (t) {
      return e[t] >= 0;
    });
  }
  var ve = W({
      defaultModifiers: [
        q,
        {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              i = e.name;
            t.modifiersData[i] = K({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              i = e.options,
              n = i.gpuAcceleration,
              s = void 0 === n || n,
              r = i.adaptive,
              o = void 0 === r || r,
              a = i.roundOffsets,
              l = void 0 === a || a,
              d = {
                placement: X(t.placement),
                variation: Y(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: s,
                isFixed: "fixed" === t.options.strategy,
              };
            null != t.modifiersData.popperOffsets &&
              (t.styles.popper = Object.assign(
                {},
                t.styles.popper,
                J(
                  Object.assign({}, d, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: o,
                    roundOffsets: l,
                  })
                )
              )),
              null != t.modifiersData.arrow &&
                (t.styles.arrow = Object.assign(
                  {},
                  t.styles.arrow,
                  J(
                    Object.assign({}, d, {
                      offsets: t.modifiersData.arrow,
                      position: "absolute",
                      adaptive: !1,
                      roundOffsets: l,
                    })
                  )
                )),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement,
              }));
          },
          data: {},
        },
        Z,
        ee,
        {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              i = e.options,
              n = e.name;
            if (!t.modifiersData[n]._skip) {
              for (
                var s = i.mainAxis,
                  r = void 0 === s || s,
                  o = i.altAxis,
                  a = void 0 === o || o,
                  l = i.fallbackPlacements,
                  d = i.padding,
                  c = i.boundary,
                  u = i.rootBoundary,
                  p = i.altBoundary,
                  h = i.flipVariations,
                  f = void 0 === h || h,
                  g = i.allowedAutoPlacements,
                  m = t.options.placement,
                  v = X(m),
                  y =
                    l ||
                    (v === m || !f
                      ? [ie(m)]
                      : (function (e) {
                          if (X(e) === P) return [];
                          var t = ie(e);
                          return [se(e), t, se(t)];
                        })(m)),
                  b = [m].concat(y).reduce(function (e, i) {
                    return e.concat(
                      X(i) === P
                        ? (function (e, t) {
                            void 0 === t && (t = {});
                            var i = t,
                              n = i.placement,
                              s = i.boundary,
                              r = i.rootBoundary,
                              o = i.padding,
                              a = i.flipVariations,
                              l = i.allowedAutoPlacements,
                              d = void 0 === l ? N : l,
                              c = Y(n),
                              u = c
                                ? a
                                  ? G
                                  : G.filter(function (e) {
                                      return Y(e) === c;
                                    })
                                : D,
                              p = u.filter(function (e) {
                                return d.indexOf(e) >= 0;
                              });
                            0 === p.length && (p = u);
                            var h = p.reduce(function (t, i) {
                              return (
                                (t[i] = ue(e, {
                                  placement: i,
                                  boundary: s,
                                  rootBoundary: r,
                                  padding: o,
                                })[X(i)]),
                                t
                              );
                            }, {});
                            return Object.keys(h).sort(function (e, t) {
                              return h[e] - h[t];
                            });
                          })(t, {
                            placement: i,
                            boundary: c,
                            rootBoundary: u,
                            padding: d,
                            flipVariations: f,
                            allowedAutoPlacements: g,
                          })
                        : i
                    );
                  }, []),
                  w = t.rects.reference,
                  x = t.rects.popper,
                  T = new Map(),
                  C = !0,
                  S = b[0],
                  E = 0;
                E < b.length;
                E++
              ) {
                var O = b[E],
                  I = X(O),
                  z = Y(O) === _,
                  $ = [L, k].indexOf(I) >= 0,
                  B = $ ? "width" : "height",
                  j = ue(t, {
                    placement: O,
                    boundary: c,
                    rootBoundary: u,
                    altBoundary: p,
                    padding: d,
                  }),
                  H = $ ? (z ? M : A) : z ? k : L;
                w[B] > x[B] && (H = ie(H));
                var V = ie(H),
                  F = [];
                if (
                  (r && F.push(j[I] <= 0),
                  a && F.push(j[H] <= 0, j[V] <= 0),
                  F.every(function (e) {
                    return e;
                  }))
                ) {
                  (S = O), (C = !1);
                  break;
                }
                T.set(O, F);
              }
              if (C)
                for (
                  var W = function (e) {
                      var t = b.find(function (t) {
                        var i = T.get(t);
                        if (i)
                          return i.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (S = t), "break";
                    },
                    R = f ? 3 : 1;
                  R > 0;
                  R--
                ) {
                  if ("break" === W(R)) break;
                }
              t.placement !== S &&
                ((t.modifiersData[n]._skip = !0),
                (t.placement = S),
                (t.reset = !0));
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        },
        he,
        fe,
        {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              i = e.name,
              n = t.rects.reference,
              s = t.rects.popper,
              r = t.modifiersData.preventOverflow,
              o = ue(t, { elementContext: "reference" }),
              a = ue(t, { altBoundary: !0 }),
              l = ge(o, n),
              d = ge(a, s, r),
              c = me(l),
              u = me(d);
            (t.modifiersData[i] = {
              referenceClippingOffsets: l,
              popperEscapeOffsets: d,
              isReferenceHidden: c,
              hasPopperEscaped: u,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": c,
                "data-popper-escaped": u,
              }));
          },
        },
      ],
    }),
    ye = "tippy-content",
    be = "tippy-backdrop",
    we = "tippy-arrow",
    xe = "tippy-svg-arrow",
    Te = { passive: !0, capture: !0 },
    Ce = function () {
      return document.body;
    };
  function Se(e, t, i) {
    if (Array.isArray(e)) {
      var n = e[t];
      return null == n ? (Array.isArray(i) ? i[t] : i) : n;
    }
    return e;
  }
  function Ee(e, t) {
    var i = {}.toString.call(e);
    return 0 === i.indexOf("[object") && i.indexOf(t + "]") > -1;
  }
  function Oe(e, t) {
    return "function" == typeof e ? e.apply(void 0, t) : e;
  }
  function Ie(e, t) {
    return 0 === t
      ? e
      : function (n) {
          clearTimeout(i),
            (i = setTimeout(function () {
              e(n);
            }, t));
        };
    var i;
  }
  function Le(e) {
    return [].concat(e);
  }
  function ke(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function Me(e) {
    return e.split("-")[0];
  }
  function Ae(e) {
    return [].slice.call(e);
  }
  function Pe(e) {
    return Object.keys(e).reduce(function (t, i) {
      return void 0 !== e[i] && (t[i] = e[i]), t;
    }, {});
  }
  function De() {
    return document.createElement("div");
  }
  function _e(e) {
    return ["Element", "Fragment"].some(function (t) {
      return Ee(e, t);
    });
  }
  function ze(e) {
    return Ee(e, "MouseEvent");
  }
  function $e(e) {
    return !(!e || !e._tippy || e._tippy.reference !== e);
  }
  function Be(e) {
    return _e(e)
      ? [e]
      : (function (e) {
          return Ee(e, "NodeList");
        })(e)
      ? Ae(e)
      : Array.isArray(e)
      ? e
      : Ae(document.querySelectorAll(e));
  }
  function Ge(e, t) {
    e.forEach(function (e) {
      e && (e.style.transitionDuration = t + "ms");
    });
  }
  function Ne(e, t) {
    e.forEach(function (e) {
      e && e.setAttribute("data-state", t);
    });
  }
  function je(e) {
    var t,
      i = Le(e)[0];
    return null != i && null != (t = i.ownerDocument) && t.body
      ? i.ownerDocument
      : document;
  }
  function He(e, t, i) {
    var n = t + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
      e[n](t, i);
    });
  }
  function Ve(e, t) {
    for (var i = t; i; ) {
      var n;
      if (e.contains(i)) return !0;
      i =
        null == i.getRootNode || null == (n = i.getRootNode())
          ? void 0
          : n.host;
    }
    return !1;
  }
  var Fe = { isTouch: !1 },
    We = 0;
  function Re() {
    Fe.isTouch ||
      ((Fe.isTouch = !0),
      window.performance && document.addEventListener("mousemove", qe));
  }
  function qe() {
    var e = performance.now();
    e - We < 20 &&
      ((Fe.isTouch = !1), document.removeEventListener("mousemove", qe)),
      (We = e);
  }
  function Xe() {
    var e = document.activeElement;
    if ($e(e)) {
      var t = e._tippy;
      e.blur && !t.state.isVisible && e.blur();
    }
  }
  var Ye =
    !!("undefined" != typeof window && "undefined" != typeof document) &&
    !!window.msCrypto;
  var Ue = {
      animateFill: !1,
      followCursor: !1,
      inlinePositioning: !1,
      sticky: !1,
    },
    Ke = Object.assign(
      {
        appendTo: Ce,
        aria: { content: "auto", expanded: "auto" },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
      },
      Ue,
      {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999,
      }
    ),
    Qe = Object.keys(Ke);
  function Je(e) {
    var t = (e.plugins || []).reduce(function (t, i) {
      var n,
        s = i.name,
        r = i.defaultValue;
      s && (t[s] = void 0 !== e[s] ? e[s] : null != (n = Ke[s]) ? n : r);
      return t;
    }, {});
    return Object.assign({}, e, t);
  }
  function Ze(e, t) {
    var i = Object.assign(
      {},
      t,
      { content: Oe(t.content, [e]) },
      t.ignoreAttributes
        ? {}
        : (function (e, t) {
            return (
              t ? Object.keys(Je(Object.assign({}, Ke, { plugins: t }))) : Qe
            ).reduce(function (t, i) {
              var n = (e.getAttribute("data-tippy-" + i) || "").trim();
              if (!n) return t;
              if ("content" === i) t[i] = n;
              else
                try {
                  t[i] = JSON.parse(n);
                } catch (e) {
                  t[i] = n;
                }
              return t;
            }, {});
          })(e, t.plugins)
    );
    return (
      (i.aria = Object.assign({}, Ke.aria, i.aria)),
      (i.aria = {
        expanded: "auto" === i.aria.expanded ? t.interactive : i.aria.expanded,
        content:
          "auto" === i.aria.content
            ? t.interactive
              ? null
              : "describedby"
            : i.aria.content,
      }),
      i
    );
  }
  function et(e, t) {
    e.innerHTML = t;
  }
  function tt(e) {
    var t = De();
    return (
      !0 === e
        ? (t.className = we)
        : ((t.className = xe), _e(e) ? t.appendChild(e) : et(t, e)),
      t
    );
  }
  function it(e, t) {
    _e(t.content)
      ? (et(e, ""), e.appendChild(t.content))
      : "function" != typeof t.content &&
        (t.allowHTML ? et(e, t.content) : (e.textContent = t.content));
  }
  function nt(e) {
    var t = e.firstElementChild,
      i = Ae(t.children);
    return {
      box: t,
      content: i.find(function (e) {
        return e.classList.contains(ye);
      }),
      arrow: i.find(function (e) {
        return e.classList.contains(we) || e.classList.contains(xe);
      }),
      backdrop: i.find(function (e) {
        return e.classList.contains(be);
      }),
    };
  }
  function st(e) {
    var t = De(),
      i = De();
    (i.className = "tippy-box"),
      i.setAttribute("data-state", "hidden"),
      i.setAttribute("tabindex", "-1");
    var n = De();
    function s(i, n) {
      var s = nt(t),
        r = s.box,
        o = s.content,
        a = s.arrow;
      n.theme
        ? r.setAttribute("data-theme", n.theme)
        : r.removeAttribute("data-theme"),
        "string" == typeof n.animation
          ? r.setAttribute("data-animation", n.animation)
          : r.removeAttribute("data-animation"),
        n.inertia
          ? r.setAttribute("data-inertia", "")
          : r.removeAttribute("data-inertia"),
        (r.style.maxWidth =
          "number" == typeof n.maxWidth ? n.maxWidth + "px" : n.maxWidth),
        n.role ? r.setAttribute("role", n.role) : r.removeAttribute("role"),
        (i.content === n.content && i.allowHTML === n.allowHTML) ||
          it(o, e.props),
        n.arrow
          ? a
            ? i.arrow !== n.arrow &&
              (r.removeChild(a), r.appendChild(tt(n.arrow)))
            : r.appendChild(tt(n.arrow))
          : a && r.removeChild(a);
    }
    return (
      (n.className = ye),
      n.setAttribute("data-state", "hidden"),
      it(n, e.props),
      t.appendChild(i),
      i.appendChild(n),
      s(e.props, e.props),
      { popper: t, onUpdate: s }
    );
  }
  st.$$tippy = !0;
  var rt = 1,
    ot = [],
    at = [];
  function lt(e, t) {
    var i,
      n,
      s,
      r,
      o,
      a,
      l,
      d,
      c = Ze(e, Object.assign({}, Ke, Je(Pe(t)))),
      u = !1,
      p = !1,
      h = !1,
      f = !1,
      g = [],
      m = Ie(X, c.interactiveDebounce),
      v = rt++,
      y = (d = c.plugins).filter(function (e, t) {
        return d.indexOf(e) === t;
      }),
      b = {
        id: v,
        reference: e,
        popper: De(),
        popperInstance: null,
        props: c,
        state: {
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: y,
        clearDelayTimeouts: function () {
          clearTimeout(i), clearTimeout(n), cancelAnimationFrame(s);
        },
        setProps: function (t) {
          0;
          if (b.state.isDestroyed) return;
          D("onBeforeUpdate", [b, t]), R();
          var i = b.props,
            n = Ze(e, Object.assign({}, i, Pe(t), { ignoreAttributes: !0 }));
          (b.props = n),
            W(),
            i.interactiveDebounce !== n.interactiveDebounce &&
              ($(), (m = Ie(X, n.interactiveDebounce)));
          i.triggerTarget && !n.triggerTarget
            ? Le(i.triggerTarget).forEach(function (e) {
                e.removeAttribute("aria-expanded");
              })
            : n.triggerTarget && e.removeAttribute("aria-expanded");
          z(), P(), T && T(i, n);
          b.popperInstance &&
            (Q(),
            Z().forEach(function (e) {
              requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
            }));
          D("onAfterUpdate", [b, t]);
        },
        setContent: function (e) {
          b.setProps({ content: e });
        },
        show: function () {
          0;
          var e = b.state.isVisible,
            t = b.state.isDestroyed,
            i = !b.state.isEnabled,
            n = Fe.isTouch && !b.props.touch,
            s = Se(b.props.duration, 0, Ke.duration);
          if (e || t || i || n) return;
          if (L().hasAttribute("disabled")) return;
          if ((D("onShow", [b], !1), !1 === b.props.onShow(b))) return;
          (b.state.isVisible = !0), I() && (x.style.visibility = "visible");
          P(), j(), b.state.isMounted || (x.style.transition = "none");
          if (I()) {
            var r = M(),
              o = r.box,
              l = r.content;
            Ge([o, l], 0);
          }
          (a = function () {
            var e;
            if (b.state.isVisible && !f) {
              if (
                ((f = !0),
                x.offsetHeight,
                (x.style.transition = b.props.moveTransition),
                I() && b.props.animation)
              ) {
                var t = M(),
                  i = t.box,
                  n = t.content;
                Ge([i, n], s), Ne([i, n], "visible");
              }
              _(),
                z(),
                ke(at, b),
                null == (e = b.popperInstance) || e.forceUpdate(),
                D("onMount", [b]),
                b.props.animation &&
                  I() &&
                  (function (e, t) {
                    V(e, t);
                  })(s, function () {
                    (b.state.isShown = !0), D("onShown", [b]);
                  });
            }
          }),
            (function () {
              var e,
                t = b.props.appendTo,
                i = L();
              e =
                (b.props.interactive && t === Ce) || "parent" === t
                  ? i.parentNode
                  : Oe(t, [i]);
              e.contains(x) || e.appendChild(x);
              (b.state.isMounted = !0), Q(), !1;
            })();
        },
        hide: function () {
          0;
          var e = !b.state.isVisible,
            t = b.state.isDestroyed,
            i = !b.state.isEnabled,
            n = Se(b.props.duration, 1, Ke.duration);
          if (e || t || i) return;
          if ((D("onHide", [b], !1), !1 === b.props.onHide(b))) return;
          (b.state.isVisible = !1),
            (b.state.isShown = !1),
            (f = !1),
            (u = !1),
            I() && (x.style.visibility = "hidden");
          if (($(), H(), P(!0), I())) {
            var s = M(),
              r = s.box,
              o = s.content;
            b.props.animation && (Ge([r, o], n), Ne([r, o], "hidden"));
          }
          _(),
            z(),
            b.props.animation
              ? I() &&
                (function (e, t) {
                  V(e, function () {
                    !b.state.isVisible &&
                      x.parentNode &&
                      x.parentNode.contains(x) &&
                      t();
                  });
                })(n, b.unmount)
              : b.unmount();
        },
        hideWithInteractivity: function (e) {
          0;
          k().addEventListener("mousemove", m), ke(ot, m), m(e);
        },
        enable: function () {
          b.state.isEnabled = !0;
        },
        disable: function () {
          b.hide(), (b.state.isEnabled = !1);
        },
        unmount: function () {
          0;
          b.state.isVisible && b.hide();
          if (!b.state.isMounted) return;
          J(),
            Z().forEach(function (e) {
              e._tippy.unmount();
            }),
            x.parentNode && x.parentNode.removeChild(x);
          (at = at.filter(function (e) {
            return e !== b;
          })),
            (b.state.isMounted = !1),
            D("onHidden", [b]);
        },
        destroy: function () {
          0;
          if (b.state.isDestroyed) return;
          b.clearDelayTimeouts(),
            b.unmount(),
            R(),
            delete e._tippy,
            (b.state.isDestroyed = !0),
            D("onDestroy", [b]);
        },
      };
    if (!c.render) return b;
    var w = c.render(b),
      x = w.popper,
      T = w.onUpdate;
    x.setAttribute("data-tippy-root", ""),
      (x.id = "tippy-" + b.id),
      (b.popper = x),
      (e._tippy = b),
      (x._tippy = b);
    var C = y.map(function (e) {
        return e.fn(b);
      }),
      S = e.hasAttribute("aria-expanded");
    return (
      W(),
      z(),
      P(),
      D("onCreate", [b]),
      c.showOnCreate && ee(),
      x.addEventListener("mouseenter", function () {
        b.props.interactive && b.state.isVisible && b.clearDelayTimeouts();
      }),
      x.addEventListener("mouseleave", function () {
        b.props.interactive &&
          b.props.trigger.indexOf("mouseenter") >= 0 &&
          k().addEventListener("mousemove", m);
      }),
      b
    );
    function E() {
      var e = b.props.touch;
      return Array.isArray(e) ? e : [e, 0];
    }
    function O() {
      return "hold" === E()[0];
    }
    function I() {
      var e;
      return !(null == (e = b.props.render) || !e.$$tippy);
    }
    function L() {
      return l || e;
    }
    function k() {
      var e = L().parentNode;
      return e ? je(e) : document;
    }
    function M() {
      return nt(x);
    }
    function A(e) {
      return (b.state.isMounted && !b.state.isVisible) ||
        Fe.isTouch ||
        (r && "focus" === r.type)
        ? 0
        : Se(b.props.delay, e ? 0 : 1, Ke.delay);
    }
    function P(e) {
      void 0 === e && (e = !1),
        (x.style.pointerEvents = b.props.interactive && !e ? "" : "none"),
        (x.style.zIndex = "" + b.props.zIndex);
    }
    function D(e, t, i) {
      var n;
      (void 0 === i && (i = !0),
      C.forEach(function (i) {
        i[e] && i[e].apply(i, t);
      }),
      i) && (n = b.props)[e].apply(n, t);
    }
    function _() {
      var t = b.props.aria;
      if (t.content) {
        var i = "aria-" + t.content,
          n = x.id;
        Le(b.props.triggerTarget || e).forEach(function (e) {
          var t = e.getAttribute(i);
          if (b.state.isVisible) e.setAttribute(i, t ? t + " " + n : n);
          else {
            var s = t && t.replace(n, "").trim();
            s ? e.setAttribute(i, s) : e.removeAttribute(i);
          }
        });
      }
    }
    function z() {
      !S &&
        b.props.aria.expanded &&
        Le(b.props.triggerTarget || e).forEach(function (e) {
          b.props.interactive
            ? e.setAttribute(
                "aria-expanded",
                b.state.isVisible && e === L() ? "true" : "false"
              )
            : e.removeAttribute("aria-expanded");
        });
    }
    function $() {
      k().removeEventListener("mousemove", m),
        (ot = ot.filter(function (e) {
          return e !== m;
        }));
    }
    function B(t) {
      if (!Fe.isTouch || (!h && "mousedown" !== t.type)) {
        var i = (t.composedPath && t.composedPath()[0]) || t.target;
        if (!b.props.interactive || !Ve(x, i)) {
          if (
            Le(b.props.triggerTarget || e).some(function (e) {
              return Ve(e, i);
            })
          ) {
            if (Fe.isTouch) return;
            if (b.state.isVisible && b.props.trigger.indexOf("click") >= 0)
              return;
          } else D("onClickOutside", [b, t]);
          !0 === b.props.hideOnClick &&
            (b.clearDelayTimeouts(),
            b.hide(),
            (p = !0),
            setTimeout(function () {
              p = !1;
            }),
            b.state.isMounted || H());
        }
      }
    }
    function G() {
      h = !0;
    }
    function N() {
      h = !1;
    }
    function j() {
      var e = k();
      e.addEventListener("mousedown", B, !0),
        e.addEventListener("touchend", B, Te),
        e.addEventListener("touchstart", N, Te),
        e.addEventListener("touchmove", G, Te);
    }
    function H() {
      var e = k();
      e.removeEventListener("mousedown", B, !0),
        e.removeEventListener("touchend", B, Te),
        e.removeEventListener("touchstart", N, Te),
        e.removeEventListener("touchmove", G, Te);
    }
    function V(e, t) {
      var i = M().box;
      function n(e) {
        e.target === i && (He(i, "remove", n), t());
      }
      if (0 === e) return t();
      He(i, "remove", o), He(i, "add", n), (o = n);
    }
    function F(t, i, n) {
      void 0 === n && (n = !1),
        Le(b.props.triggerTarget || e).forEach(function (e) {
          e.addEventListener(t, i, n),
            g.push({ node: e, eventType: t, handler: i, options: n });
        });
    }
    function W() {
      O() &&
        (F("touchstart", q, { passive: !0 }),
        F("touchend", Y, { passive: !0 })),
        (function (e) {
          return e.split(/\s+/).filter(Boolean);
        })(b.props.trigger).forEach(function (e) {
          if ("manual" !== e)
            switch ((F(e, q), e)) {
              case "mouseenter":
                F("mouseleave", Y);
                break;
              case "focus":
                F(Ye ? "focusout" : "blur", U);
                break;
              case "focusin":
                F("focusout", U);
            }
        });
    }
    function R() {
      g.forEach(function (e) {
        var t = e.node,
          i = e.eventType,
          n = e.handler,
          s = e.options;
        t.removeEventListener(i, n, s);
      }),
        (g = []);
    }
    function q(e) {
      var t,
        i = !1;
      if (b.state.isEnabled && !K(e) && !p) {
        var n = "focus" === (null == (t = r) ? void 0 : t.type);
        (r = e),
          (l = e.currentTarget),
          z(),
          !b.state.isVisible &&
            ze(e) &&
            ot.forEach(function (t) {
              return t(e);
            }),
          "click" === e.type &&
          (b.props.trigger.indexOf("mouseenter") < 0 || u) &&
          !1 !== b.props.hideOnClick &&
          b.state.isVisible
            ? (i = !0)
            : ee(e),
          "click" === e.type && (u = !i),
          i && !n && te(e);
      }
    }
    function X(e) {
      var t = e.target,
        i = L().contains(t) || x.contains(t);
      if ("mousemove" !== e.type || !i) {
        var n = Z()
          .concat(x)
          .map(function (e) {
            var t,
              i = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
            return i
              ? {
                  popperRect: e.getBoundingClientRect(),
                  popperState: i,
                  props: c,
                }
              : null;
          })
          .filter(Boolean);
        (function (e, t) {
          var i = t.clientX,
            n = t.clientY;
          return e.every(function (e) {
            var t = e.popperRect,
              s = e.popperState,
              r = e.props.interactiveBorder,
              o = Me(s.placement),
              a = s.modifiersData.offset;
            if (!a) return !0;
            var l = "bottom" === o ? a.top.y : 0,
              d = "top" === o ? a.bottom.y : 0,
              c = "right" === o ? a.left.x : 0,
              u = "left" === o ? a.right.x : 0,
              p = t.top - n + l > r,
              h = n - t.bottom - d > r,
              f = t.left - i + c > r,
              g = i - t.right - u > r;
            return p || h || f || g;
          });
        })(n, e) && ($(), te(e));
      }
    }
    function Y(e) {
      K(e) ||
        (b.props.trigger.indexOf("click") >= 0 && u) ||
        (b.props.interactive ? b.hideWithInteractivity(e) : te(e));
    }
    function U(e) {
      (b.props.trigger.indexOf("focusin") < 0 && e.target !== L()) ||
        (b.props.interactive &&
          e.relatedTarget &&
          x.contains(e.relatedTarget)) ||
        te(e);
    }
    function K(e) {
      return !!Fe.isTouch && O() !== e.type.indexOf("touch") >= 0;
    }
    function Q() {
      J();
      var t = b.props,
        i = t.popperOptions,
        n = t.placement,
        s = t.offset,
        r = t.getReferenceClientRect,
        o = t.moveTransition,
        l = I() ? nt(x).arrow : null,
        d = r
          ? {
              getBoundingClientRect: r,
              contextElement: r.contextElement || L(),
            }
          : e,
        c = {
          name: "$$tippy",
          enabled: !0,
          phase: "beforeWrite",
          requires: ["computeStyles"],
          fn: function (e) {
            var t = e.state;
            if (I()) {
              var i = M().box;
              ["placement", "reference-hidden", "escaped"].forEach(function (
                e
              ) {
                "placement" === e
                  ? i.setAttribute("data-placement", t.placement)
                  : t.attributes.popper["data-popper-" + e]
                  ? i.setAttribute("data-" + e, "")
                  : i.removeAttribute("data-" + e);
              }),
                (t.attributes.popper = {});
            }
          },
        },
        u = [
          { name: "offset", options: { offset: s } },
          {
            name: "preventOverflow",
            options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
          },
          { name: "flip", options: { padding: 5 } },
          { name: "computeStyles", options: { adaptive: !o } },
          c,
        ];
      I() &&
        l &&
        u.push({ name: "arrow", options: { element: l, padding: 3 } }),
        u.push.apply(u, (null == i ? void 0 : i.modifiers) || []),
        (b.popperInstance = ve(
          d,
          x,
          Object.assign({}, i, { placement: n, onFirstUpdate: a, modifiers: u })
        ));
    }
    function J() {
      b.popperInstance &&
        (b.popperInstance.destroy(), (b.popperInstance = null));
    }
    function Z() {
      return Ae(x.querySelectorAll("[data-tippy-root]"));
    }
    function ee(e) {
      b.clearDelayTimeouts(), e && D("onTrigger", [b, e]), j();
      var t = A(!0),
        n = E(),
        s = n[0],
        r = n[1];
      Fe.isTouch && "hold" === s && r && (t = r),
        t
          ? (i = setTimeout(function () {
              b.show();
            }, t))
          : b.show();
    }
    function te(e) {
      if (
        (b.clearDelayTimeouts(), D("onUntrigger", [b, e]), b.state.isVisible)
      ) {
        if (
          !(
            b.props.trigger.indexOf("mouseenter") >= 0 &&
            b.props.trigger.indexOf("click") >= 0 &&
            ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
            u
          )
        ) {
          var t = A(!1);
          t
            ? (n = setTimeout(function () {
                b.state.isVisible && b.hide();
              }, t))
            : (s = requestAnimationFrame(function () {
                b.hide();
              }));
        }
      } else H();
    }
  }
  function dt(e, t) {
    void 0 === t && (t = {});
    var i = Ke.plugins.concat(t.plugins || []);
    document.addEventListener("touchstart", Re, Te),
      window.addEventListener("blur", Xe);
    var n = Object.assign({}, t, { plugins: i }),
      s = Be(e).reduce(function (e, t) {
        var i = t && lt(t, n);
        return i && e.push(i), e;
      }, []);
    return _e(e) ? s[0] : s;
  }
  (dt.defaultProps = Ke),
    (dt.setDefaultProps = function (e) {
      Object.keys(e).forEach(function (t) {
        Ke[t] = e[t];
      });
    }),
    (dt.currentInput = Fe);
  Object.assign({}, Z, {
    effect: function (e) {
      var t = e.state,
        i = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      Object.assign(t.elements.popper.style, i.popper),
        (t.styles = i),
        t.elements.arrow && Object.assign(t.elements.arrow.style, i.arrow);
    },
  });
  dt.setDefaultProps({ render: st });
  function ct(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function ut(e = {}, t = {}) {
    Object.keys(t).forEach((i) => {
      void 0 === e[i]
        ? (e[i] = t[i])
        : ct(t[i]) &&
          ct(e[i]) &&
          Object.keys(t[i]).length > 0 &&
          ut(e[i], t[i]);
    });
  }
  dt("[data-tippy-content]", {});
  const pt = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function ht() {
    const e = "undefined" != typeof document ? document : {};
    return ut(e, pt), e;
  }
  const ft = {
    document: pt,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function gt() {
    const e = "undefined" != typeof window ? window : {};
    return ut(e, ft), e;
  }
  class mt extends Array {
    constructor(e) {
      super(...(e || [])),
        (function (e) {
          const t = e.__proto__;
          Object.defineProperty(e, "__proto__", {
            get: () => t,
            set(e) {
              t.__proto__ = e;
            },
          });
        })(this);
    }
  }
  function vt(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...vt(e)) : t.push(e);
      }),
      t
    );
  }
  function yt(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function bt(e, t) {
    const i = gt(),
      n = ht();
    let s = [];
    if (!t && e instanceof mt) return e;
    if (!e) return new mt(s);
    if ("string" == typeof e) {
      const i = e.trim();
      if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
        let e = "div";
        0 === i.indexOf("<li") && (e = "ul"),
          0 === i.indexOf("<tr") && (e = "tbody"),
          (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (e = "tr"),
          0 === i.indexOf("<tbody") && (e = "table"),
          0 === i.indexOf("<option") && (e = "select");
        const t = n.createElement(e);
        t.innerHTML = i;
        for (let e = 0; e < t.childNodes.length; e += 1)
          s.push(t.childNodes[e]);
      } else
        s = (function (e, t) {
          if ("string" != typeof e) return [e];
          const i = [],
            n = t.querySelectorAll(e);
          for (let e = 0; e < n.length; e += 1) i.push(n[e]);
          return i;
        })(e.trim(), t || n);
    } else if (e.nodeType || e === i || e === n) s.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof mt) return e;
      s = e;
    }
    return new mt(
      (function (e) {
        const t = [];
        for (let i = 0; i < e.length; i += 1)
          -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t;
      })(s)
    );
  }
  bt.fn = mt.prototype;
  const wt = "resize scroll".split(" ");
  function xt(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          wt.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : bt(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  xt("click"),
    xt("blur"),
    xt("focus"),
    xt("focusin"),
    xt("focusout"),
    xt("keyup"),
    xt("keydown"),
    xt("keypress"),
    xt("submit"),
    xt("change"),
    xt("mousedown"),
    xt("mousemove"),
    xt("mouseup"),
    xt("mouseenter"),
    xt("mouseleave"),
    xt("mouseout"),
    xt("mouseover"),
    xt("touchstart"),
    xt("touchend"),
    xt("touchmove"),
    xt("resize"),
    xt("scroll");
  const Tt = {
    addClass: function (...e) {
      const t = vt(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = vt(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = vt(e.map((e) => e.split(" ")));
      return (
        yt(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = vt(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let i = 0; i < this.length; i += 1)
        if (2 === arguments.length) this[i].setAttribute(e, t);
        else
          for (const t in e) (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, i, n, s] = e;
      function r(e) {
        const t = e.target;
        if (!t) return;
        const s = e.target.dom7EventData || [];
        if ((s.indexOf(e) < 0 && s.unshift(e), bt(t).is(i))) n.apply(t, s);
        else {
          const e = bt(t).parents();
          for (let t = 0; t < e.length; t += 1)
            bt(e[t]).is(i) && n.apply(e[t], s);
        }
      }
      function o(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
      }
      "function" == typeof e[1] && (([t, n, s] = e), (i = void 0)),
        s || (s = !1);
      const a = t.split(" ");
      let l;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (i)
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: n, proxyListener: r }),
              t.addEventListener(e, r, s);
          }
        else
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: n, proxyListener: o }),
              t.addEventListener(e, o, s);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, i, n, s] = e;
      "function" == typeof e[1] && (([t, n, s] = e), (i = void 0)),
        s || (s = !1);
      const r = t.split(" ");
      for (let e = 0; e < r.length; e += 1) {
        const t = r[e];
        for (let e = 0; e < this.length; e += 1) {
          const r = this[e];
          let o;
          if (
            (!i && r.dom7Listeners
              ? (o = r.dom7Listeners[t])
              : i && r.dom7LiveListeners && (o = r.dom7LiveListeners[t]),
            o && o.length)
          )
            for (let e = o.length - 1; e >= 0; e -= 1) {
              const i = o[e];
              (n && i.listener === n) ||
              (n &&
                i.listener &&
                i.listener.dom7proxy &&
                i.listener.dom7proxy === n)
                ? (r.removeEventListener(t, i.proxyListener, s), o.splice(e, 1))
                : n ||
                  (r.removeEventListener(t, i.proxyListener, s),
                  o.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = gt(),
        i = e[0].split(" "),
        n = e[1];
      for (let s = 0; s < i.length; s += 1) {
        const r = i[s];
        for (let i = 0; i < this.length; i += 1) {
          const s = this[i];
          if (t.CustomEvent) {
            const i = new t.CustomEvent(r, {
              detail: n,
              bubbles: !0,
              cancelable: !0,
            });
            (s.dom7EventData = e.filter((e, t) => t > 0)),
              s.dispatchEvent(i),
              (s.dom7EventData = []),
              delete s.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function i(n) {
            n.target === this && (e.call(this, n), t.off("transitionend", i));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = gt();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = gt(),
          t = ht(),
          i = this[0],
          n = i.getBoundingClientRect(),
          s = t.body,
          r = i.clientTop || s.clientTop || 0,
          o = i.clientLeft || s.clientLeft || 0,
          a = i === e ? e.scrollY : i.scrollTop,
          l = i === e ? e.scrollX : i.scrollLeft;
        return { top: n.top + a - r, left: n.left + l - o };
      }
      return null;
    },
    css: function (e, t) {
      const i = gt();
      let n;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (n = 0; n < this.length; n += 1)
            for (const t in e) this[n].style[t] = e[t];
          return this;
        }
        if (this[0])
          return i.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (n = 0; n < this.length; n += 1) this[n].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, i) => {
            e.apply(t, [t, i]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = gt(),
        i = ht(),
        n = this[0];
      let s, r;
      if (!n || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (n.matches) return n.matches(e);
        if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
        if (n.msMatchesSelector) return n.msMatchesSelector(e);
        for (s = bt(e), r = 0; r < s.length; r += 1) if (s[r] === n) return !0;
        return !1;
      }
      if (e === i) return n === i;
      if (e === t) return n === t;
      if (e.nodeType || e instanceof mt) {
        for (s = e.nodeType ? [e] : e, r = 0; r < s.length; r += 1)
          if (s[r] === n) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return bt([]);
      if (e < 0) {
        const i = t + e;
        return bt(i < 0 ? [] : [this[i]]);
      }
      return bt([this[e]]);
    },
    append: function (...e) {
      let t;
      const i = ht();
      for (let n = 0; n < e.length; n += 1) {
        t = e[n];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const n = i.createElement("div");
            for (n.innerHTML = t; n.firstChild; )
              this[e].appendChild(n.firstChild);
          } else if (t instanceof mt)
            for (let i = 0; i < t.length; i += 1) this[e].appendChild(t[i]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = ht();
      let i, n;
      for (i = 0; i < this.length; i += 1)
        if ("string" == typeof e) {
          const s = t.createElement("div");
          for (s.innerHTML = e, n = s.childNodes.length - 1; n >= 0; n -= 1)
            this[i].insertBefore(s.childNodes[n], this[i].childNodes[0]);
        } else if (e instanceof mt)
          for (n = 0; n < e.length; n += 1)
            this[i].insertBefore(e[n], this[i].childNodes[0]);
        else this[i].insertBefore(e, this[i].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && bt(this[0].nextElementSibling).is(e)
            ? bt([this[0].nextElementSibling])
            : bt([])
          : this[0].nextElementSibling
          ? bt([this[0].nextElementSibling])
          : bt([])
        : bt([]);
    },
    nextAll: function (e) {
      const t = [];
      let i = this[0];
      if (!i) return bt([]);
      for (; i.nextElementSibling; ) {
        const n = i.nextElementSibling;
        e ? bt(n).is(e) && t.push(n) : t.push(n), (i = n);
      }
      return bt(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && bt(t.previousElementSibling).is(e)
            ? bt([t.previousElementSibling])
            : bt([])
          : t.previousElementSibling
          ? bt([t.previousElementSibling])
          : bt([]);
      }
      return bt([]);
    },
    prevAll: function (e) {
      const t = [];
      let i = this[0];
      if (!i) return bt([]);
      for (; i.previousElementSibling; ) {
        const n = i.previousElementSibling;
        e ? bt(n).is(e) && t.push(n) : t.push(n), (i = n);
      }
      return bt(t);
    },
    parent: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1)
        null !== this[i].parentNode &&
          (e
            ? bt(this[i].parentNode).is(e) && t.push(this[i].parentNode)
            : t.push(this[i].parentNode));
      return bt(t);
    },
    parents: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        let n = this[i].parentNode;
        for (; n; )
          e ? bt(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
      }
      return bt(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? bt([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        const n = this[i].querySelectorAll(e);
        for (let e = 0; e < n.length; e += 1) t.push(n[e]);
      }
      return bt(t);
    },
    children: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        const n = this[i].children;
        for (let i = 0; i < n.length; i += 1)
          (e && !bt(n[i]).is(e)) || t.push(n[i]);
      }
      return bt(t);
    },
    filter: function (e) {
      return bt(yt(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys(Tt).forEach((e) => {
    Object.defineProperty(bt.fn, e, { value: Tt[e], writable: !0 });
  });
  const Ct = bt;
  function St(e, t = 0) {
    return setTimeout(e, t);
  }
  function Et() {
    return Date.now();
  }
  function Ot(e, t = "x") {
    const i = gt();
    let n, s, r;
    const o = (function (e) {
      const t = gt();
      let i;
      return (
        t.getComputedStyle && (i = t.getComputedStyle(e, null)),
        !i && e.currentStyle && (i = e.currentStyle),
        i || (i = e.style),
        i
      );
    })(e);
    return (
      i.WebKitCSSMatrix
        ? ((s = o.transform || o.webkitTransform),
          s.split(",").length > 6 &&
            (s = s
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (r = new i.WebKitCSSMatrix("none" === s ? "" : s)))
        : ((r =
            o.MozTransform ||
            o.OTransform ||
            o.MsTransform ||
            o.msTransform ||
            o.transform ||
            o
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (n = r.toString().split(","))),
      "x" === t &&
        (s = i.WebKitCSSMatrix
          ? r.m41
          : 16 === n.length
          ? parseFloat(n[12])
          : parseFloat(n[4])),
      "y" === t &&
        (s = i.WebKitCSSMatrix
          ? r.m42
          : 16 === n.length
          ? parseFloat(n[13])
          : parseFloat(n[5])),
      s || 0
    );
  }
  function It(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function Lt(...e) {
    const t = Object(e[0]),
      i = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < e.length; s += 1) {
      const r = e[s];
      if (
        null != r &&
        ((n = r),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? n instanceof HTMLElement
          : n && (1 === n.nodeType || 11 === n.nodeType)))
      ) {
        const e = Object.keys(Object(r)).filter((e) => i.indexOf(e) < 0);
        for (let i = 0, n = e.length; i < n; i += 1) {
          const n = e[i],
            s = Object.getOwnPropertyDescriptor(r, n);
          void 0 !== s &&
            s.enumerable &&
            (It(t[n]) && It(r[n])
              ? r[n].__swiper__
                ? (t[n] = r[n])
                : Lt(t[n], r[n])
              : !It(t[n]) && It(r[n])
              ? ((t[n] = {}), r[n].__swiper__ ? (t[n] = r[n]) : Lt(t[n], r[n]))
              : (t[n] = r[n]));
        }
      }
    }
    var n;
    return t;
  }
  function kt(e, t, i) {
    e.style.setProperty(t, i);
  }
  function Mt({ swiper: e, targetPosition: t, side: i }) {
    const n = gt(),
      s = -e.translate;
    let r,
      o = null;
    const a = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      n.cancelAnimationFrame(e.cssModeFrameID);
    const l = t > s ? "next" : "prev",
      d = (e, t) => ("next" === l && e >= t) || ("prev" === l && e <= t),
      c = () => {
        (r = new Date().getTime()), null === o && (o = r);
        const l = Math.max(Math.min((r - o) / a, 1), 0),
          u = 0.5 - Math.cos(l * Math.PI) / 2;
        let p = s + u * (t - s);
        if ((d(p, t) && (p = t), e.wrapperEl.scrollTo({ [i]: p }), d(p, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [i]: p });
            }),
            void n.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = n.requestAnimationFrame(c);
      };
    c();
  }
  let At, Pt, Dt;
  function _t() {
    return (
      At ||
        (At = (function () {
          const e = gt(),
            t = ht();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const i = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, i);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      At
    );
  }
  function zt(e = {}) {
    return (
      Pt ||
        (Pt = (function ({ userAgent: e } = {}) {
          const t = _t(),
            i = gt(),
            n = i.navigator.platform,
            s = e || i.navigator.userAgent,
            r = { ios: !1, android: !1 },
            o = i.screen.width,
            a = i.screen.height,
            l = s.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = s.match(/(iPad).*OS\s([\d_]+)/);
          const c = s.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !d && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            p = "Win32" === n;
          let h = "MacIntel" === n;
          return (
            !d &&
              h &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${a}`) >= 0 &&
              ((d = s.match(/(Version)\/([\d.]+)/)),
              d || (d = [0, 1, "13_0_0"]),
              (h = !1)),
            l && !p && ((r.os = "android"), (r.android = !0)),
            (d || u || c) && ((r.os = "ios"), (r.ios = !0)),
            r
          );
        })(e)),
      Pt
    );
  }
  function $t() {
    return (
      Dt ||
        (Dt = (function () {
          const e = gt();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      Dt
    );
  }
  const Bt = {
    on(e, t, i) {
      const n = this;
      if ("function" != typeof t) return n;
      const s = i ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          n.eventsListeners[e] || (n.eventsListeners[e] = []),
            n.eventsListeners[e][s](t);
        }),
        n
      );
    },
    once(e, t, i) {
      const n = this;
      if ("function" != typeof t) return n;
      function s(...i) {
        n.off(e, s), s.__emitterProxy && delete s.__emitterProxy, t.apply(n, i);
      }
      return (s.__emitterProxy = t), n.on(e, s, i);
    },
    onAny(e, t) {
      const i = this;
      if ("function" != typeof e) return i;
      const n = t ? "unshift" : "push";
      return (
        i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[n](e), i
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsAnyListeners) return t;
      const i = t.eventsAnyListeners.indexOf(e);
      return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
    },
    off(e, t) {
      const i = this;
      return i.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (i.eventsListeners[e] = [])
              : i.eventsListeners[e] &&
                i.eventsListeners[e].forEach((n, s) => {
                  (n === t || (n.__emitterProxy && n.__emitterProxy === t)) &&
                    i.eventsListeners[e].splice(s, 1);
                });
          }),
          i)
        : i;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners) return t;
      let i, n, s;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((i = e[0]), (n = e.slice(1, e.length)), (s = t))
        : ((i = e[0].events), (n = e[0].data), (s = e[0].context || t)),
        n.unshift(s);
      return (
        (Array.isArray(i) ? i : i.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(s, [e, ...n]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(s, n);
              });
        }),
        t
      );
    },
  };
  const Gt = {
    updateSize: function () {
      const e = this;
      let t, i;
      const n = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : n[0].clientWidth),
        (i =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : n[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === i && e.isVertical()) ||
          ((t =
            t -
            parseInt(n.css("padding-left") || 0, 10) -
            parseInt(n.css("padding-right") || 0, 10)),
          (i =
            i -
            parseInt(n.css("padding-top") || 0, 10) -
            parseInt(n.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(i) && (i = 0),
          Object.assign(e, {
            width: t,
            height: i,
            size: e.isHorizontal() ? t : i,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function i(e, i) {
        return parseFloat(e.getPropertyValue(t(i)) || 0);
      }
      const n = e.params,
        { $wrapperEl: s, size: r, rtlTranslate: o, wrongRTL: a } = e,
        l = e.virtual && n.virtual.enabled,
        d = l ? e.virtual.slides.length : e.slides.length,
        c = s.children(`.${e.params.slideClass}`),
        u = l ? e.virtual.slides.length : c.length;
      let p = [];
      const h = [],
        f = [];
      let g = n.slidesOffsetBefore;
      "function" == typeof g && (g = n.slidesOffsetBefore.call(e));
      let m = n.slidesOffsetAfter;
      "function" == typeof m && (m = n.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        y = e.slidesGrid.length;
      let b = n.spaceBetween,
        w = -g,
        x = 0,
        T = 0;
      if (void 0 === r) return;
      "string" == typeof b &&
        b.indexOf("%") >= 0 &&
        (b = (parseFloat(b.replace("%", "")) / 100) * r),
        (e.virtualSize = -b),
        o
          ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        n.centeredSlides &&
          n.cssMode &&
          (kt(e.wrapperEl, "--swiper-centered-offset-before", ""),
          kt(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const C = n.grid && n.grid.rows > 1 && e.grid;
      let S;
      C && e.grid.initSlides(u);
      const E =
        "auto" === n.slidesPerView &&
        n.breakpoints &&
        Object.keys(n.breakpoints).filter(
          (e) => void 0 !== n.breakpoints[e].slidesPerView
        ).length > 0;
      for (let s = 0; s < u; s += 1) {
        S = 0;
        const o = c.eq(s);
        if (
          (C && e.grid.updateSlide(s, o, u, t), "none" !== o.css("display"))
        ) {
          if ("auto" === n.slidesPerView) {
            E && (c[s].style[t("width")] = "");
            const r = getComputedStyle(o[0]),
              a = o[0].style.transform,
              l = o[0].style.webkitTransform;
            if (
              (a && (o[0].style.transform = "none"),
              l && (o[0].style.webkitTransform = "none"),
              n.roundLengths)
            )
              S = e.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
            else {
              const e = i(r, "width"),
                t = i(r, "padding-left"),
                n = i(r, "padding-right"),
                s = i(r, "margin-left"),
                a = i(r, "margin-right"),
                l = r.getPropertyValue("box-sizing");
              if (l && "border-box" === l) S = e + s + a;
              else {
                const { clientWidth: i, offsetWidth: r } = o[0];
                S = e + t + n + s + a + (r - i);
              }
            }
            a && (o[0].style.transform = a),
              l && (o[0].style.webkitTransform = l),
              n.roundLengths && (S = Math.floor(S));
          } else
            (S = (r - (n.slidesPerView - 1) * b) / n.slidesPerView),
              n.roundLengths && (S = Math.floor(S)),
              c[s] && (c[s].style[t("width")] = `${S}px`);
          c[s] && (c[s].swiperSlideSize = S),
            f.push(S),
            n.centeredSlides
              ? ((w = w + S / 2 + x / 2 + b),
                0 === x && 0 !== s && (w = w - r / 2 - b),
                0 === s && (w = w - r / 2 - b),
                Math.abs(w) < 0.001 && (w = 0),
                n.roundLengths && (w = Math.floor(w)),
                T % n.slidesPerGroup == 0 && p.push(w),
                h.push(w))
              : (n.roundLengths && (w = Math.floor(w)),
                (T - Math.min(e.params.slidesPerGroupSkip, T)) %
                  e.params.slidesPerGroup ==
                  0 && p.push(w),
                h.push(w),
                (w = w + S + b)),
            (e.virtualSize += S + b),
            (x = S),
            (T += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + m),
        o &&
          a &&
          ("slide" === n.effect || "coverflow" === n.effect) &&
          s.css({ width: `${e.virtualSize + n.spaceBetween}px` }),
        n.setWrapperSize &&
          s.css({ [t("width")]: `${e.virtualSize + n.spaceBetween}px` }),
        C && e.grid.updateWrapperSize(S, p, t),
        !n.centeredSlides)
      ) {
        const t = [];
        for (let i = 0; i < p.length; i += 1) {
          let s = p[i];
          n.roundLengths && (s = Math.floor(s)),
            p[i] <= e.virtualSize - r && t.push(s);
        }
        (p = t),
          Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 &&
            p.push(e.virtualSize - r);
      }
      if ((0 === p.length && (p = [0]), 0 !== n.spaceBetween)) {
        const i = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        c.filter((e, t) => !n.cssMode || t !== c.length - 1).css({
          [i]: `${b}px`,
        });
      }
      if (n.centeredSlides && n.centeredSlidesBounds) {
        let e = 0;
        f.forEach((t) => {
          e += t + (n.spaceBetween ? n.spaceBetween : 0);
        }),
          (e -= n.spaceBetween);
        const t = e - r;
        p = p.map((e) => (e < 0 ? -g : e > t ? t + m : e));
      }
      if (n.centerInsufficientSlides) {
        let e = 0;
        if (
          (f.forEach((t) => {
            e += t + (n.spaceBetween ? n.spaceBetween : 0);
          }),
          (e -= n.spaceBetween),
          e < r)
        ) {
          const t = (r - e) / 2;
          p.forEach((e, i) => {
            p[i] = e - t;
          }),
            h.forEach((e, i) => {
              h[i] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: p,
          slidesGrid: h,
          slidesSizesGrid: f,
        }),
        n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
      ) {
        kt(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"),
          kt(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - f[f.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          i = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + i));
      }
      u !== d && e.emit("slidesLengthChange"),
        p.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== y && e.emit("slidesGridLengthChange"),
        n.watchSlidesProgress && e.updateSlidesOffset();
    },
    updateAutoHeight: function (e) {
      const t = this,
        i = [],
        n = t.virtual && t.params.virtual.enabled;
      let s,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const o = (e) =>
        n
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          t.visibleSlides.each((e) => {
            i.push(e);
          });
        else
          for (s = 0; s < Math.ceil(t.params.slidesPerView); s += 1) {
            const e = t.activeIndex + s;
            if (e > t.slides.length && !n) break;
            i.push(o(e));
          }
      else i.push(o(t.activeIndex));
      for (s = 0; s < i.length; s += 1)
        if (void 0 !== i[s]) {
          const e = i[s].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset = e.isHorizontal()
          ? t[i].offsetLeft
          : t[i].offsetTop;
    },
    updateSlidesProgress: function (e = (this && this.translate) || 0) {
      const t = this,
        i = t.params,
        { slides: n, rtlTranslate: s, snapGrid: r } = t;
      if (0 === n.length) return;
      void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
      let o = -e;
      s && (o = e),
        n.removeClass(i.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < n.length; e += 1) {
        const a = n[e];
        let l = a.swiperSlideOffset;
        i.cssMode && i.centeredSlides && (l -= n[0].swiperSlideOffset);
        const d =
            (o + (i.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + i.spaceBetween),
          c =
            (o - r[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + i.spaceBetween),
          u = -(o - l),
          p = u + t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (p > 1 && p <= t.size) ||
          (u <= 0 && p >= t.size)) &&
          (t.visibleSlides.push(a),
          t.visibleSlidesIndexes.push(e),
          n.eq(e).addClass(i.slideVisibleClass)),
          (a.progress = s ? -d : d),
          (a.originalProgress = s ? -c : c);
      }
      t.visibleSlides = Ct(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const i = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * i) || 0;
      }
      const i = t.params,
        n = t.maxTranslate() - t.minTranslate();
      let { progress: s, isBeginning: r, isEnd: o } = t;
      const a = r,
        l = o;
      0 === n
        ? ((s = 0), (r = !0), (o = !0))
        : ((s = (e - t.minTranslate()) / n), (r = s <= 0), (o = s >= 1)),
        Object.assign(t, { progress: s, isBeginning: r, isEnd: o }),
        (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !a && t.emit("reachBeginning toEdge"),
        o && !l && t.emit("reachEnd toEdge"),
        ((a && !r) || (l && !o)) && t.emit("fromEdge"),
        t.emit("progress", s);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: i,
          $wrapperEl: n,
          activeIndex: s,
          realIndex: r,
        } = e,
        o = e.virtual && i.virtual.enabled;
      let a;
      t.removeClass(
        `${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`
      ),
        (a = o
          ? e.$wrapperEl.find(
              `.${i.slideClass}[data-swiper-slide-index="${s}"]`
            )
          : t.eq(s)),
        a.addClass(i.slideActiveClass),
        i.loop &&
          (a.hasClass(i.slideDuplicateClass)
            ? n
                .children(
                  `.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                )
                .addClass(i.slideDuplicateActiveClass)
            : n
                .children(
                  `.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                )
                .addClass(i.slideDuplicateActiveClass));
      let l = a.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
      i.loop && 0 === l.length && ((l = t.eq(0)), l.addClass(i.slideNextClass));
      let d = a.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
      i.loop &&
        0 === d.length &&
        ((d = t.eq(-1)), d.addClass(i.slidePrevClass)),
        i.loop &&
          (l.hasClass(i.slideDuplicateClass)
            ? n
                .children(
                  `.${i.slideClass}:not(.${
                    i.slideDuplicateClass
                  })[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicateNextClass)
            : n
                .children(
                  `.${i.slideClass}.${
                    i.slideDuplicateClass
                  }[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicateNextClass),
          d.hasClass(i.slideDuplicateClass)
            ? n
                .children(
                  `.${i.slideClass}:not(.${
                    i.slideDuplicateClass
                  })[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicatePrevClass)
            : n
                .children(
                  `.${i.slideClass}.${
                    i.slideDuplicateClass
                  }[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        i = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: n,
          snapGrid: s,
          params: r,
          activeIndex: o,
          realIndex: a,
          snapIndex: l,
        } = t;
      let d,
        c = e;
      if (void 0 === c) {
        for (let e = 0; e < n.length; e += 1)
          void 0 !== n[e + 1]
            ? i >= n[e] && i < n[e + 1] - (n[e + 1] - n[e]) / 2
              ? (c = e)
              : i >= n[e] && i < n[e + 1] && (c = e + 1)
            : i >= n[e] && (c = e);
        r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
      }
      if (s.indexOf(i) >= 0) d = s.indexOf(i);
      else {
        const e = Math.min(r.slidesPerGroupSkip, c);
        d = e + Math.floor((c - e) / r.slidesPerGroup);
      }
      if ((d >= s.length && (d = s.length - 1), c === o))
        return void (d !== l && ((t.snapIndex = d), t.emit("snapIndexChange")));
      const u = parseInt(
        t.slides.eq(c).attr("data-swiper-slide-index") || c,
        10
      );
      Object.assign(t, {
        snapIndex: d,
        realIndex: u,
        previousIndex: o,
        activeIndex: c,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        a !== u && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        i = t.params,
        n = Ct(e).closest(`.${i.slideClass}`)[0];
      let s,
        r = !1;
      if (n)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === n) {
            (r = !0), (s = e);
            break;
          }
      if (!n || !r)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = n),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              Ct(n).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = s),
        i.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const Nt = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const { params: t, rtlTranslate: i, translate: n, $wrapperEl: s } = this;
      if (t.virtualTranslate) return i ? -n : n;
      if (t.cssMode) return n;
      let r = Ot(s[0], e);
      return i && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const i = this,
        {
          rtlTranslate: n,
          params: s,
          $wrapperEl: r,
          wrapperEl: o,
          progress: a,
        } = i;
      let l,
        d = 0,
        c = 0;
      i.isHorizontal() ? (d = n ? -e : e) : (c = e),
        s.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
        s.cssMode
          ? (o[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal()
              ? -d
              : -c)
          : s.virtualTranslate ||
            r.transform(`translate3d(${d}px, ${c}px, 0px)`),
        (i.previousTranslate = i.translate),
        (i.translate = i.isHorizontal() ? d : c);
      const u = i.maxTranslate() - i.minTranslate();
      (l = 0 === u ? 0 : (e - i.minTranslate()) / u),
        l !== a && i.updateProgress(e),
        i.emit("setTranslate", i.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, i = !0, n = !0, s) {
      const r = this,
        { params: o, wrapperEl: a } = r;
      if (r.animating && o.preventInteractionOnTransition) return !1;
      const l = r.minTranslate(),
        d = r.maxTranslate();
      let c;
      if (
        ((c = n && e > l ? l : n && e < d ? d : e),
        r.updateProgress(c),
        o.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!r.support.smoothScroll)
            return (
              Mt({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }),
              !0
            );
          a.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(c),
            i &&
              (r.emit("beforeTransitionStart", t, s), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(c),
            i &&
              (r.emit("beforeTransitionStart", t, s),
              r.emit("transitionStart")),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    i && r.emit("transitionEnd"));
                }),
              r.$wrapperEl[0].addEventListener(
                "transitionend",
                r.onTranslateToWrapperTransitionEnd
              ),
              r.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                r.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function jt({ swiper: e, runCallbacks: t, direction: i, step: n }) {
    const { activeIndex: s, previousIndex: r } = e;
    let o = i;
    if (
      (o || (o = s > r ? "next" : s < r ? "prev" : "reset"),
      e.emit(`transition${n}`),
      t && s !== r)
    ) {
      if ("reset" === o) return void e.emit(`slideResetTransition${n}`);
      e.emit(`slideChangeTransition${n}`),
        "next" === o
          ? e.emit(`slideNextTransition${n}`)
          : e.emit(`slidePrevTransition${n}`);
    }
  }
  const Ht = {
    slideTo: function (e = 0, t = this.params.speed, i = !0, n, s) {
      if ("number" != typeof e && "string" != typeof e)
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const r = this;
      let o = e;
      o < 0 && (o = 0);
      const {
        params: a,
        snapGrid: l,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: u,
        rtlTranslate: p,
        wrapperEl: h,
        enabled: f,
      } = r;
      if ((r.animating && a.preventInteractionOnTransition) || (!f && !n && !s))
        return !1;
      const g = Math.min(r.params.slidesPerGroupSkip, o);
      let m = g + Math.floor((o - g) / r.params.slidesPerGroup);
      m >= l.length && (m = l.length - 1),
        (u || a.initialSlide || 0) === (c || 0) &&
          i &&
          r.emit("beforeSlideChangeStart");
      const v = -l[m];
      if ((r.updateProgress(v), a.normalizeSlideIndex))
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            i = Math.floor(100 * d[e]),
            n = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= i && t < n - (n - i) / 2
              ? (o = e)
              : t >= i && t < n && (o = e + 1)
            : t >= i && (o = e);
        }
      if (r.initialized && o !== u) {
        if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
          return !1;
        if (
          !r.allowSlidePrev &&
          v > r.translate &&
          v > r.maxTranslate() &&
          (u || 0) !== o
        )
          return !1;
      }
      let y;
      if (
        ((y = o > u ? "next" : o < u ? "prev" : "reset"),
        (p && -v === r.translate) || (!p && v === r.translate))
      )
        return (
          r.updateActiveIndex(o),
          a.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== a.effect && r.setTranslate(v),
          "reset" !== y && (r.transitionStart(i, y), r.transitionEnd(i, y)),
          !1
        );
      if (a.cssMode) {
        const e = r.isHorizontal(),
          i = p ? v : -v;
        if (0 === t) {
          const t = r.virtual && r.params.virtual.enabled;
          t &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            (h[e ? "scrollLeft" : "scrollTop"] = i),
            t &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ""),
                  (r._swiperImmediateVirtual = !1);
              });
        } else {
          if (!r.support.smoothScroll)
            return (
              Mt({ swiper: r, targetPosition: i, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(v),
        r.updateActiveIndex(o),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, n),
        r.transitionStart(i, y),
        0 === t
          ? r.transitionEnd(i, y)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd
                  ),
                  r.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    r.onSlideToWrapperTransitionEnd
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(i, y));
              }),
            r.$wrapperEl[0].addEventListener(
              "transitionend",
              r.onSlideToWrapperTransitionEnd
            ),
            r.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              r.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e = 0, t = this.params.speed, i = !0, n) {
      const s = this;
      let r = e;
      return s.params.loop && (r += s.loopedSlides), s.slideTo(r, t, i, n);
    },
    slideNext: function (e = this.params.speed, t = !0, i) {
      const n = this,
        { animating: s, enabled: r, params: o } = n;
      if (!r) return n;
      let a = o.slidesPerGroup;
      "auto" === o.slidesPerView &&
        1 === o.slidesPerGroup &&
        o.slidesPerGroupAuto &&
        (a = Math.max(n.slidesPerViewDynamic("current", !0), 1));
      const l = n.activeIndex < o.slidesPerGroupSkip ? 1 : a;
      if (o.loop) {
        if (s && o.loopPreventsSlide) return !1;
        n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
      }
      return o.rewind && n.isEnd
        ? n.slideTo(0, e, t, i)
        : n.slideTo(n.activeIndex + l, e, t, i);
    },
    slidePrev: function (e = this.params.speed, t = !0, i) {
      const n = this,
        {
          params: s,
          animating: r,
          snapGrid: o,
          slidesGrid: a,
          rtlTranslate: l,
          enabled: d,
        } = n;
      if (!d) return n;
      if (s.loop) {
        if (r && s.loopPreventsSlide) return !1;
        n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
      }
      function c(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = c(l ? n.translate : -n.translate),
        p = o.map((e) => c(e));
      let h = o[p.indexOf(u) - 1];
      if (void 0 === h && s.cssMode) {
        let e;
        o.forEach((t, i) => {
          u >= t && (e = i);
        }),
          void 0 !== e && (h = o[e > 0 ? e - 1 : e]);
      }
      let f = 0;
      return (
        void 0 !== h &&
          ((f = a.indexOf(h)),
          f < 0 && (f = n.activeIndex - 1),
          "auto" === s.slidesPerView &&
            1 === s.slidesPerGroup &&
            s.slidesPerGroupAuto &&
            ((f = f - n.slidesPerViewDynamic("previous", !0) + 1),
            (f = Math.max(f, 0)))),
        s.rewind && n.isBeginning
          ? n.slideTo(n.slides.length - 1, e, t, i)
          : n.slideTo(f, e, t, i)
      );
    },
    slideReset: function (e = this.params.speed, t = !0, i) {
      return this.slideTo(this.activeIndex, e, t, i);
    },
    slideToClosest: function (e = this.params.speed, t = !0, i, n = 0.5) {
      const s = this;
      let r = s.activeIndex;
      const o = Math.min(s.params.slidesPerGroupSkip, r),
        a = o + Math.floor((r - o) / s.params.slidesPerGroup),
        l = s.rtlTranslate ? s.translate : -s.translate;
      if (l >= s.snapGrid[a]) {
        const e = s.snapGrid[a];
        l - e > (s.snapGrid[a + 1] - e) * n && (r += s.params.slidesPerGroup);
      } else {
        const e = s.snapGrid[a - 1];
        l - e <= (s.snapGrid[a] - e) * n && (r -= s.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, s.slidesGrid.length - 1)),
        s.slideTo(r, e, t, i)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: i } = e,
        n =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let s,
        r = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (s = parseInt(Ct(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? r < e.loopedSlides - n / 2 ||
              r > e.slides.length - e.loopedSlides + n / 2
              ? (e.loopFix(),
                (r = i
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                St(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - n
            ? (e.loopFix(),
              (r = i
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              St(() => {
                e.slideTo(r);
              }))
            : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  const Vt = {
    loopCreate: function () {
      const e = this,
        t = ht(),
        { params: i, $wrapperEl: n } = e,
        s = n.children().length > 0 ? Ct(n.children()[0].parentNode) : n;
      s.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
      let r = s.children(`.${i.slideClass}`);
      if (i.loopFillGroupWithBlank) {
        const e = i.slidesPerGroup - (r.length % i.slidesPerGroup);
        if (e !== i.slidesPerGroup) {
          for (let n = 0; n < e; n += 1) {
            const e = Ct(t.createElement("div")).addClass(
              `${i.slideClass} ${i.slideBlankClass}`
            );
            s.append(e);
          }
          r = s.children(`.${i.slideClass}`);
        }
      }
      "auto" !== i.slidesPerView ||
        i.loopedSlides ||
        (i.loopedSlides = r.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(i.loopedSlides || i.slidesPerView, 10)
        )),
        (e.loopedSlides += i.loopAdditionalSlides),
        e.loopedSlides > r.length && (e.loopedSlides = r.length);
      const o = [],
        a = [];
      r.each((t, i) => {
        const n = Ct(t);
        i < e.loopedSlides && a.push(t),
          i < r.length && i >= r.length - e.loopedSlides && o.push(t),
          n.attr("data-swiper-slide-index", i);
      });
      for (let e = 0; e < a.length; e += 1)
        s.append(Ct(a[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
      for (let e = o.length - 1; e >= 0; e -= 1)
        s.prepend(Ct(o[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: i,
        loopedSlides: n,
        allowSlidePrev: s,
        allowSlideNext: r,
        snapGrid: o,
        rtlTranslate: a,
      } = e;
      let l;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const d = -o[t] - e.getTranslate();
      if (t < n) {
        (l = i.length - 3 * n + t), (l += n);
        e.slideTo(l, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((a ? -e.translate : e.translate) - d);
      } else if (t >= i.length - n) {
        (l = -i.length + t + n), (l += n);
        e.slideTo(l, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((a ? -e.translate : e.translate) - d);
      }
      (e.allowSlidePrev = s), (e.allowSlideNext = r), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: i } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        i.removeAttr("data-swiper-slide-index");
    },
  };
  function Ft(e) {
    const t = this,
      i = ht(),
      n = gt(),
      s = t.touchEventsData,
      { params: r, touches: o, enabled: a } = t;
    if (!a) return;
    if (t.animating && r.preventInteractionOnTransition) return;
    !t.animating && r.cssMode && r.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let d = Ct(l.target);
    if ("wrapper" === r.touchEventsTarget && !d.closest(t.wrapperEl).length)
      return;
    if (
      ((s.isTouchEvent = "touchstart" === l.type),
      !s.isTouchEvent && "which" in l && 3 === l.which)
    )
      return;
    if (!s.isTouchEvent && "button" in l && l.button > 0) return;
    if (s.isTouched && s.isMoved) return;
    !!r.noSwipingClass &&
      "" !== r.noSwipingClass &&
      l.target &&
      l.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (d = Ct(e.path[0]));
    const c = r.noSwipingSelector
        ? r.noSwipingSelector
        : `.${r.noSwipingClass}`,
      u = !(!l.target || !l.target.shadowRoot);
    if (
      r.noSwiping &&
      (u
        ? (function (e, t = this) {
            return (function t(i) {
              return i && i !== ht() && i !== gt()
                ? (i.assignedSlot && (i = i.assignedSlot),
                  i.closest(e) || t(i.getRootNode().host))
                : null;
            })(t);
          })(c, l.target)
        : d.closest(c)[0])
    )
      return void (t.allowClick = !0);
    if (r.swipeHandler && !d.closest(r.swipeHandler)[0]) return;
    (o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
      (o.currentY =
        "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
    const p = o.currentX,
      h = o.currentY,
      f = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
      g = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
    if (f && (p <= g || p >= n.innerWidth - g)) {
      if ("prevent" !== f) return;
      e.preventDefault();
    }
    if (
      (Object.assign(s, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (o.startX = p),
      (o.startY = h),
      (s.touchStartTime = Et()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      r.threshold > 0 && (s.allowThresholdMove = !1),
      "touchstart" !== l.type)
    ) {
      let e = !0;
      d.is(s.focusableElements) && (e = !1),
        i.activeElement &&
          Ct(i.activeElement).is(s.focusableElements) &&
          i.activeElement !== d[0] &&
          i.activeElement.blur();
      const n = e && t.allowTouchMove && r.touchStartPreventDefault;
      (!r.touchStartForcePreventDefault && !n) ||
        d[0].isContentEditable ||
        l.preventDefault();
    }
    t.emit("touchStart", l);
  }
  function Wt(e) {
    const t = ht(),
      i = this,
      n = i.touchEventsData,
      { params: s, touches: r, rtlTranslate: o, enabled: a } = i;
    if (!a) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !n.isTouched))
      return void (
        n.startMoving &&
        n.isScrolling &&
        i.emit("touchMoveOpposite", l)
      );
    if (n.isTouchEvent && "touchmove" !== l.type) return;
    const d =
        "touchmove" === l.type &&
        l.targetTouches &&
        (l.targetTouches[0] || l.changedTouches[0]),
      c = "touchmove" === l.type ? d.pageX : l.pageX,
      u = "touchmove" === l.type ? d.pageY : l.pageY;
    if (l.preventedByNestedSwiper) return (r.startX = c), void (r.startY = u);
    if (!i.allowTouchMove)
      return (
        (i.allowClick = !1),
        void (
          n.isTouched &&
          (Object.assign(r, { startX: c, startY: u, currentX: c, currentY: u }),
          (n.touchStartTime = Et()))
        )
      );
    if (n.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
      if (i.isVertical()) {
        if (
          (u < r.startY && i.translate <= i.maxTranslate()) ||
          (u > r.startY && i.translate >= i.minTranslate())
        )
          return (n.isTouched = !1), void (n.isMoved = !1);
      } else if (
        (c < r.startX && i.translate <= i.maxTranslate()) ||
        (c > r.startX && i.translate >= i.minTranslate())
      )
        return;
    if (
      n.isTouchEvent &&
      t.activeElement &&
      l.target === t.activeElement &&
      Ct(l.target).is(n.focusableElements)
    )
      return (n.isMoved = !0), void (i.allowClick = !1);
    if (
      (n.allowTouchCallbacks && i.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (r.currentX = c), (r.currentY = u);
    const p = r.currentX - r.startX,
      h = r.currentY - r.startY;
    if (i.params.threshold && Math.sqrt(p ** 2 + h ** 2) < i.params.threshold)
      return;
    if (void 0 === n.isScrolling) {
      let e;
      (i.isHorizontal() && r.currentY === r.startY) ||
      (i.isVertical() && r.currentX === r.startX)
        ? (n.isScrolling = !1)
        : p * p + h * h >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(h), Math.abs(p))) / Math.PI),
          (n.isScrolling = i.isHorizontal()
            ? e > s.touchAngle
            : 90 - e > s.touchAngle));
    }
    if (
      (n.isScrolling && i.emit("touchMoveOpposite", l),
      void 0 === n.startMoving &&
        ((r.currentX === r.startX && r.currentY === r.startY) ||
          (n.startMoving = !0)),
      n.isScrolling)
    )
      return void (n.isTouched = !1);
    if (!n.startMoving) return;
    (i.allowClick = !1),
      !s.cssMode && l.cancelable && l.preventDefault(),
      s.touchMoveStopPropagation && !s.nested && l.stopPropagation(),
      n.isMoved ||
        (s.loop && !s.cssMode && i.loopFix(),
        (n.startTranslate = i.getTranslate()),
        i.setTransition(0),
        i.animating &&
          i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (n.allowMomentumBounce = !1),
        !s.grabCursor ||
          (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
          i.setGrabCursor(!0),
        i.emit("sliderFirstMove", l)),
      i.emit("sliderMove", l),
      (n.isMoved = !0);
    let f = i.isHorizontal() ? p : h;
    (r.diff = f),
      (f *= s.touchRatio),
      o && (f = -f),
      (i.swipeDirection = f > 0 ? "prev" : "next"),
      (n.currentTranslate = f + n.startTranslate);
    let g = !0,
      m = s.resistanceRatio;
    if (
      (s.touchReleaseOnEdges && (m = 0),
      f > 0 && n.currentTranslate > i.minTranslate()
        ? ((g = !1),
          s.resistance &&
            (n.currentTranslate =
              i.minTranslate() -
              1 +
              (-i.minTranslate() + n.startTranslate + f) ** m))
        : f < 0 &&
          n.currentTranslate < i.maxTranslate() &&
          ((g = !1),
          s.resistance &&
            (n.currentTranslate =
              i.maxTranslate() +
              1 -
              (i.maxTranslate() - n.startTranslate - f) ** m)),
      g && (l.preventedByNestedSwiper = !0),
      !i.allowSlideNext &&
        "next" === i.swipeDirection &&
        n.currentTranslate < n.startTranslate &&
        (n.currentTranslate = n.startTranslate),
      !i.allowSlidePrev &&
        "prev" === i.swipeDirection &&
        n.currentTranslate > n.startTranslate &&
        (n.currentTranslate = n.startTranslate),
      i.allowSlidePrev ||
        i.allowSlideNext ||
        (n.currentTranslate = n.startTranslate),
      s.threshold > 0)
    ) {
      if (!(Math.abs(f) > s.threshold || n.allowThresholdMove))
        return void (n.currentTranslate = n.startTranslate);
      if (!n.allowThresholdMove)
        return (
          (n.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (n.currentTranslate = n.startTranslate),
          void (r.diff = i.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY)
        );
    }
    s.followFinger &&
      !s.cssMode &&
      (((s.freeMode && s.freeMode.enabled && i.freeMode) ||
        s.watchSlidesProgress) &&
        (i.updateActiveIndex(), i.updateSlidesClasses()),
      i.params.freeMode &&
        s.freeMode.enabled &&
        i.freeMode &&
        i.freeMode.onTouchMove(),
      i.updateProgress(n.currentTranslate),
      i.setTranslate(n.currentTranslate));
  }
  function Rt(e) {
    const t = this,
      i = t.touchEventsData,
      { params: n, touches: s, rtlTranslate: r, slidesGrid: o, enabled: a } = t;
    if (!a) return;
    let l = e;
    if (
      (l.originalEvent && (l = l.originalEvent),
      i.allowTouchCallbacks && t.emit("touchEnd", l),
      (i.allowTouchCallbacks = !1),
      !i.isTouched)
    )
      return (
        i.isMoved && n.grabCursor && t.setGrabCursor(!1),
        (i.isMoved = !1),
        void (i.startMoving = !1)
      );
    n.grabCursor &&
      i.isMoved &&
      i.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const d = Et(),
      c = d - i.touchStartTime;
    if (t.allowClick) {
      const e = l.path || (l.composedPath && l.composedPath());
      t.updateClickedSlide((e && e[0]) || l.target),
        t.emit("tap click", l),
        c < 300 &&
          d - i.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", l);
    }
    if (
      ((i.lastClickTime = Et()),
      St(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !i.isTouched ||
        !i.isMoved ||
        !t.swipeDirection ||
        0 === s.diff ||
        i.currentTranslate === i.startTranslate)
    )
      return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
    let u;
    if (
      ((i.isTouched = !1),
      (i.isMoved = !1),
      (i.startMoving = !1),
      (u = n.followFinger
        ? r
          ? t.translate
          : -t.translate
        : -i.currentTranslate),
      n.cssMode)
    )
      return;
    if (t.params.freeMode && n.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: u });
    let p = 0,
      h = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
    ) {
      const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      void 0 !== o[e + t]
        ? u >= o[e] && u < o[e + t] && ((p = e), (h = o[e + t] - o[e]))
        : u >= o[e] && ((p = e), (h = o[o.length - 1] - o[o.length - 2]));
    }
    const f = (u - o[p]) / h,
      g = p < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (c > n.longSwipesMs) {
      if (!n.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (f >= n.longSwipesRatio ? t.slideTo(p + g) : t.slideTo(p)),
        "prev" === t.swipeDirection &&
          (f > 1 - n.longSwipesRatio ? t.slideTo(p + g) : t.slideTo(p));
    } else {
      if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
        ? l.target === t.navigation.nextEl
          ? t.slideTo(p + g)
          : t.slideTo(p)
        : ("next" === t.swipeDirection && t.slideTo(p + g),
          "prev" === t.swipeDirection && t.slideTo(p));
    }
  }
  function qt() {
    const e = this,
      { params: t, el: i } = e;
    if (i && 0 === i.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: n, allowSlidePrev: s, snapGrid: r } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = s),
      (e.allowSlideNext = n),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function Xt(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function Yt() {
    const e = this,
      { wrapperEl: t, rtlTranslate: i, enabled: n } = e;
    if (!n) return;
    let s;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      -0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (s = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      s !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let Ut = !1;
  function Kt() {}
  const Qt = (e, t) => {
    const i = ht(),
      {
        params: n,
        touchEvents: s,
        el: r,
        wrapperEl: o,
        device: a,
        support: l,
      } = e,
      d = !!n.nested,
      c = "on" === t ? "addEventListener" : "removeEventListener",
      u = t;
    if (l.touch) {
      const t = !(
        "touchstart" !== s.start ||
        !l.passiveListener ||
        !n.passiveListeners
      ) && { passive: !0, capture: !1 };
      r[c](s.start, e.onTouchStart, t),
        r[c](
          s.move,
          e.onTouchMove,
          l.passiveListener ? { passive: !1, capture: d } : d
        ),
        r[c](s.end, e.onTouchEnd, t),
        s.cancel && r[c](s.cancel, e.onTouchEnd, t);
    } else
      r[c](s.start, e.onTouchStart, !1),
        i[c](s.move, e.onTouchMove, d),
        i[c](s.end, e.onTouchEnd, !1);
    (n.preventClicks || n.preventClicksPropagation) &&
      r[c]("click", e.onClick, !0),
      n.cssMode && o[c]("scroll", e.onScroll),
      n.updateOnWindowResize
        ? e[u](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            qt,
            !0
          )
        : e[u]("observerUpdate", qt, !0);
  };
  const Jt = {
      attachEvents: function () {
        const e = this,
          t = ht(),
          { params: i, support: n } = e;
        (e.onTouchStart = Ft.bind(e)),
          (e.onTouchMove = Wt.bind(e)),
          (e.onTouchEnd = Rt.bind(e)),
          i.cssMode && (e.onScroll = Yt.bind(e)),
          (e.onClick = Xt.bind(e)),
          n.touch && !Ut && (t.addEventListener("touchstart", Kt), (Ut = !0)),
          Qt(e, "on");
      },
      detachEvents: function () {
        Qt(this, "off");
      },
    },
    Zt = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const ei = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: i,
          loopedSlides: n = 0,
          params: s,
          $el: r,
        } = e,
        o = s.breakpoints;
      if (!o || (o && 0 === Object.keys(o).length)) return;
      const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
      if (!a || e.currentBreakpoint === a) return;
      const l = (a in o ? o[a] : void 0) || e.originalParams,
        d = Zt(e, s),
        c = Zt(e, l),
        u = s.enabled;
      d && !c
        ? (r.removeClass(
            `${s.containerModifierClass}grid ${s.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !d &&
          c &&
          (r.addClass(`${s.containerModifierClass}grid`),
          ((l.grid.fill && "column" === l.grid.fill) ||
            (!l.grid.fill && "column" === s.grid.fill)) &&
            r.addClass(`${s.containerModifierClass}grid-column`),
          e.emitContainerClasses());
      const p = l.direction && l.direction !== s.direction,
        h = s.loop && (l.slidesPerView !== s.slidesPerView || p);
      p && i && e.changeDirection(), Lt(e.params, l);
      const f = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        u && !f ? e.disable() : !u && f && e.enable(),
        (e.currentBreakpoint = a),
        e.emit("_beforeBreakpoint", l),
        h &&
          i &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - n + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", l);
    },
    getBreakpoint: function (e, t = "window", i) {
      if (!e || ("container" === t && !i)) return;
      let n = !1;
      const s = gt(),
        r = "window" === t ? s.innerHeight : i.clientHeight,
        o = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: r * t, point: e };
          }
          return { value: e, point: e };
        });
      o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < o.length; e += 1) {
        const { point: r, value: a } = o[e];
        "window" === t
          ? s.matchMedia(`(min-width: ${a}px)`).matches && (n = r)
          : a <= i.clientWidth && (n = r);
      }
      return n || "max";
    },
  };
  const ti = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: i, rtl: n, $el: s, device: r, support: o } = e,
        a = (function (e, t) {
          const i = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((n) => {
                    e[n] && i.push(t + n);
                  })
                : "string" == typeof e && i.push(t + e);
            }),
            i
          );
        })(
          [
            "initialized",
            i.direction,
            { "pointer-events": !o.touch },
            { "free-mode": e.params.freeMode && i.freeMode.enabled },
            { autoheight: i.autoHeight },
            { rtl: n },
            { grid: i.grid && i.grid.rows > 1 },
            {
              "grid-column":
                i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
            },
            { android: r.android },
            { ios: r.ios },
            { "css-mode": i.cssMode },
            { centered: i.cssMode && i.centeredSlides },
          ],
          i.containerModifierClass
        );
      t.push(...a), s.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const ii = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function ni(e, t) {
    return function (i = {}) {
      const n = Object.keys(i)[0],
        s = i[n];
      "object" == typeof s && null !== s
        ? (["navigation", "pagination", "scrollbar"].indexOf(n) >= 0 &&
            !0 === e[n] &&
            (e[n] = { auto: !0 }),
          n in e && "enabled" in s
            ? (!0 === e[n] && (e[n] = { enabled: !0 }),
              "object" != typeof e[n] ||
                "enabled" in e[n] ||
                (e[n].enabled = !0),
              e[n] || (e[n] = { enabled: !1 }),
              Lt(t, i))
            : Lt(t, i))
        : Lt(t, i);
    };
  }
  const si = {
      eventsEmitter: Bt,
      update: Gt,
      translate: Nt,
      transition: {
        setTransition: function (e, t) {
          const i = this;
          i.params.cssMode || i.$wrapperEl.transition(e),
            i.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const i = this,
            { params: n } = i;
          n.cssMode ||
            (n.autoHeight && i.updateAutoHeight(),
            jt({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e = !0, t) {
          const i = this,
            { params: n } = i;
          (i.animating = !1),
            n.cssMode ||
              (i.setTransition(0),
              jt({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: Ht,
      loop: Vt,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const i =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (i.style.cursor = "move"),
            (i.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
            (i.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
            (i.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: Jt,
      breakpoints: ei,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: i } = e,
            { slidesOffsetBefore: n } = i;
          if (n) {
            const t = e.slides.length - 1,
              i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
            e.isLocked = e.size > i;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: ti,
      images: {
        loadImage: function (e, t, i, n, s, r) {
          const o = gt();
          let a;
          function l() {
            r && r();
          }
          Ct(e).parent("picture")[0] || (e.complete && s)
            ? l()
            : t
            ? ((a = new o.Image()),
              (a.onload = l),
              (a.onerror = l),
              n && (a.sizes = n),
              i && (a.srcset = i),
              t && (a.src = t))
            : l();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (let i = 0; i < e.imagesToLoad.length; i += 1) {
            const n = e.imagesToLoad[i];
            e.loadImage(
              n,
              n.currentSrc || n.getAttribute("src"),
              n.srcset || n.getAttribute("srcset"),
              n.sizes || n.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    ri = {};
  class oi {
    constructor(...e) {
      let t, i;
      if (
        (1 === e.length &&
        e[0].constructor &&
        "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
          ? (i = e[0])
          : ([t, i] = e),
        i || (i = {}),
        (i = Lt({}, i)),
        t && !i.el && (i.el = t),
        i.el && Ct(i.el).length > 1)
      ) {
        const e = [];
        return (
          Ct(i.el).each((t) => {
            const n = Lt({}, i, { el: t });
            e.push(new oi(n));
          }),
          e
        );
      }
      const n = this;
      (n.__swiper__ = !0),
        (n.support = _t()),
        (n.device = zt({ userAgent: i.userAgent })),
        (n.browser = $t()),
        (n.eventsListeners = {}),
        (n.eventsAnyListeners = []),
        (n.modules = [...n.__modules__]),
        i.modules && Array.isArray(i.modules) && n.modules.push(...i.modules);
      const s = {};
      n.modules.forEach((e) => {
        e({
          swiper: n,
          extendParams: ni(i, s),
          on: n.on.bind(n),
          once: n.once.bind(n),
          off: n.off.bind(n),
          emit: n.emit.bind(n),
        });
      });
      const r = Lt({}, ii, s);
      return (
        (n.params = Lt({}, r, ri, i)),
        (n.originalParams = Lt({}, n.params)),
        (n.passedParams = Lt({}, i)),
        n.params &&
          n.params.on &&
          Object.keys(n.params.on).forEach((e) => {
            n.on(e, n.params.on[e]);
          }),
        n.params && n.params.onAny && n.onAny(n.params.onAny),
        (n.$ = Ct),
        Object.assign(n, {
          enabled: n.params.enabled,
          el: t,
          classNames: [],
          slides: Ct(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === n.params.direction,
          isVertical: () => "vertical" === n.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: n.params.allowSlideNext,
          allowSlidePrev: n.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (n.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (n.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              n.support.touch || !n.params.simulateTouch
                ? n.touchEventsTouch
                : n.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: n.params.focusableElements,
            lastClickTime: Et(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: n.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        n.emit("_swiper"),
        n.params.init && n.init(),
        n
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const i = this;
      e = Math.min(Math.max(e, 0), 1);
      const n = i.minTranslate(),
        s = (i.maxTranslate() - n) * e + n;
      i.translateTo(s, void 0 === t ? 0 : t),
        i.updateActiveIndex(),
        i.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return e.className
        .split(" ")
        .filter(
          (e) =>
            0 === e.indexOf("swiper-slide") ||
            0 === e.indexOf(t.params.slideClass)
        )
        .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((i) => {
        const n = e.getSlideClasses(i);
        t.push({ slideEl: i, classNames: n }), e.emit("_slideClass", i, n);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: i,
        slides: n,
        slidesGrid: s,
        slidesSizesGrid: r,
        size: o,
        activeIndex: a,
      } = this;
      let l = 1;
      if (i.centeredSlides) {
        let e,
          t = n[a].swiperSlideSize;
        for (let i = a + 1; i < n.length; i += 1)
          n[i] &&
            !e &&
            ((t += n[i].swiperSlideSize), (l += 1), t > o && (e = !0));
        for (let i = a - 1; i >= 0; i -= 1)
          n[i] &&
            !e &&
            ((t += n[i].swiperSlideSize), (l += 1), t > o && (e = !0));
      } else if ("current" === e)
        for (let e = a + 1; e < n.length; e += 1) {
          (t ? s[e] + r[e] - s[a] < o : s[e] - s[a] < o) && (l += 1);
        }
      else
        for (let e = a - 1; e >= 0; e -= 1) {
          s[a] - s[e] < o && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: i } = e;
      function n() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let s;
      i.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (n(), e.params.autoHeight && e.updateAutoHeight())
          : ((s =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            s || n()),
        i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const i = this,
        n = i.params.direction;
      return (
        e || (e = "horizontal" === n ? "vertical" : "horizontal"),
        e === n ||
          ("horizontal" !== e && "vertical" !== e) ||
          (i.$el
            .removeClass(`${i.params.containerModifierClass}${n}`)
            .addClass(`${i.params.containerModifierClass}${e}`),
          i.emitContainerClasses(),
          (i.params.direction = e),
          i.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          i.emit("changeDirection"),
          t && i.update()),
        i
      );
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const i = Ct(e || t.params.el);
      if (!(e = i[0])) return !1;
      e.swiper = t;
      const n = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let s = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = Ct(e.shadowRoot.querySelector(n()));
          return (t.children = (e) => i.children(e)), t;
        }
        return i.children(n());
      })();
      if (0 === s.length && t.params.createElements) {
        const e = ht().createElement("div");
        (s = Ct(e)),
          (e.className = t.params.wrapperClass),
          i.append(e),
          i.children(`.${t.params.slideClass}`).each((e) => {
            s.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: i,
          el: e,
          $wrapperEl: s,
          wrapperEl: s[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
          wrongRTL: "-webkit-box" === s.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const i = this,
        { params: n, $el: s, $wrapperEl: r, slides: o } = i;
      return (
        void 0 === i.params ||
          i.destroyed ||
          (i.emit("beforeDestroy"),
          (i.initialized = !1),
          i.detachEvents(),
          n.loop && i.loopDestroy(),
          t &&
            (i.removeClasses(),
            s.removeAttr("style"),
            r.removeAttr("style"),
            o &&
              o.length &&
              o
                .removeClass(
                  [
                    n.slideVisibleClass,
                    n.slideActiveClass,
                    n.slideNextClass,
                    n.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          i.emit("destroy"),
          Object.keys(i.eventsListeners).forEach((e) => {
            i.off(e);
          }),
          !1 !== e &&
            ((i.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(i)),
          (i.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      Lt(ri, e);
    }
    static get extendedDefaults() {
      return ri;
    }
    static get defaults() {
      return ii;
    }
    static installModule(e) {
      oi.prototype.__modules__ || (oi.prototype.__modules__ = []);
      const t = oi.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => oi.installModule(e)), oi)
        : (oi.installModule(e), oi);
    }
  }
  Object.keys(si).forEach((e) => {
    Object.keys(si[e]).forEach((t) => {
      oi.prototype[t] = si[e][t];
    });
  }),
    oi.use([
      function ({ swiper: e, on: t, emit: i }) {
        const n = gt();
        let s = null;
        const r = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (i("beforeResize"), i("resize"));
          },
          o = () => {
            e && !e.destroyed && e.initialized && i("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== n.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((s = new ResizeObserver((t) => {
                const { width: i, height: n } = e;
                let s = i,
                  o = n;
                t.forEach(
                  ({ contentBoxSize: t, contentRect: i, target: n }) => {
                    (n && n !== e.el) ||
                      ((s = i ? i.width : (t[0] || t).inlineSize),
                      (o = i ? i.height : (t[0] || t).blockSize));
                  }
                ),
                  (s === i && o === n) || r();
              })),
              s.observe(e.el))
            : (n.addEventListener("resize", r),
              n.addEventListener("orientationchange", o));
        }),
          t("destroy", () => {
            s && s.unobserve && e.el && (s.unobserve(e.el), (s = null)),
              n.removeEventListener("resize", r),
              n.removeEventListener("orientationchange", o);
          });
      },
      function ({ swiper: e, extendParams: t, on: i, emit: n }) {
        const s = [],
          r = gt(),
          o = (e, t = {}) => {
            const i = new (r.MutationObserver || r.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void n("observerUpdate", e[0]);
                const t = function () {
                  n("observerUpdate", e[0]);
                };
                r.requestAnimationFrame
                  ? r.requestAnimationFrame(t)
                  : r.setTimeout(t, 0);
              }
            );
            i.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              s.push(i);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = e.$el.parents();
                for (let e = 0; e < t.length; e += 1) o(t[e]);
              }
              o(e.$el[0], { childList: e.params.observeSlideChildren }),
                o(e.$wrapperEl[0], { attributes: !1 });
            }
          }),
          i("destroy", () => {
            s.forEach((e) => {
              e.disconnect();
            }),
              s.splice(0, s.length);
          });
      },
    ]);
  const ai = oi;
  function li({ swiper: e, extendParams: t, on: i, emit: n }) {
    function s(t) {
      let i;
      return (
        t &&
          ((i = Ct(t)),
          e.params.uniqueNavElements &&
            "string" == typeof t &&
            i.length > 1 &&
            1 === e.$el.find(t).length &&
            (i = e.$el.find(t))),
        i
      );
    }
    function r(t, i) {
      const n = e.params.navigation;
      t &&
        t.length > 0 &&
        (t[i ? "addClass" : "removeClass"](n.disabledClass),
        t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = i),
        e.params.watchOverflow &&
          e.enabled &&
          t[e.isLocked ? "addClass" : "removeClass"](n.lockClass));
    }
    function o() {
      if (e.params.loop) return;
      const { $nextEl: t, $prevEl: i } = e.navigation;
      r(i, e.isBeginning && !e.params.rewind),
        r(t, e.isEnd && !e.params.rewind);
    }
    function a(t) {
      t.preventDefault(),
        (!e.isBeginning || e.params.loop || e.params.rewind) && e.slidePrev();
    }
    function l(t) {
      t.preventDefault(),
        (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
    }
    function d() {
      const t = e.params.navigation;
      if (
        ((e.params.navigation = (function (e, t, i, n) {
          const s = ht();
          return (
            e.params.createElements &&
              Object.keys(n).forEach((r) => {
                if (!i[r] && !0 === i.auto) {
                  let o = e.$el.children(`.${n[r]}`)[0];
                  o ||
                    ((o = s.createElement("div")),
                    (o.className = n[r]),
                    e.$el.append(o)),
                    (i[r] = o),
                    (t[r] = o);
                }
              }),
            i
          );
        })(e, e.originalParams.navigation, e.params.navigation, {
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev",
        })),
        !t.nextEl && !t.prevEl)
      )
        return;
      const i = s(t.nextEl),
        n = s(t.prevEl);
      i && i.length > 0 && i.on("click", l),
        n && n.length > 0 && n.on("click", a),
        Object.assign(e.navigation, {
          $nextEl: i,
          nextEl: i && i[0],
          $prevEl: n,
          prevEl: n && n[0],
        }),
        e.enabled ||
          (i && i.addClass(t.lockClass), n && n.addClass(t.lockClass));
    }
    function c() {
      const { $nextEl: t, $prevEl: i } = e.navigation;
      t &&
        t.length &&
        (t.off("click", l), t.removeClass(e.params.navigation.disabledClass)),
        i &&
          i.length &&
          (i.off("click", a), i.removeClass(e.params.navigation.disabledClass));
    }
    t({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
      },
    }),
      (e.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null,
      }),
      i("init", () => {
        d(), o();
      }),
      i("toEdge fromEdge lock unlock", () => {
        o();
      }),
      i("destroy", () => {
        c();
      }),
      i("enable disable", () => {
        const { $nextEl: t, $prevEl: i } = e.navigation;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.navigation.lockClass
          ),
          i &&
            i[e.enabled ? "removeClass" : "addClass"](
              e.params.navigation.lockClass
            );
      }),
      i("click", (t, i) => {
        const { $nextEl: s, $prevEl: r } = e.navigation,
          o = i.target;
        if (e.params.navigation.hideOnClick && !Ct(o).is(r) && !Ct(o).is(s)) {
          if (
            e.pagination &&
            e.params.pagination &&
            e.params.pagination.clickable &&
            (e.pagination.el === o || e.pagination.el.contains(o))
          )
            return;
          let t;
          s
            ? (t = s.hasClass(e.params.navigation.hiddenClass))
            : r && (t = r.hasClass(e.params.navigation.hiddenClass)),
            n(!0 === t ? "navigationShow" : "navigationHide"),
            s && s.toggleClass(e.params.navigation.hiddenClass),
            r && r.toggleClass(e.params.navigation.hiddenClass);
        }
      }),
      Object.assign(e.navigation, { update: o, init: d, destroy: c });
  }
  function di({ swiper: e, extendParams: t, on: i, emit: n }) {
    let s;
    function r() {
      const t = e.slides.eq(e.activeIndex);
      let i = e.params.autoplay.delay;
      t.attr("data-swiper-autoplay") &&
        (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
        clearTimeout(s),
        (s = St(() => {
          let t;
          e.params.autoplay.reverseDirection
            ? e.params.loop
              ? (e.loopFix(),
                (t = e.slidePrev(e.params.speed, !0, !0)),
                n("autoplay"))
              : e.isBeginning
              ? e.params.autoplay.stopOnLastSlide
                ? a()
                : ((t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0)),
                  n("autoplay"))
              : ((t = e.slidePrev(e.params.speed, !0, !0)), n("autoplay"))
            : e.params.loop
            ? (e.loopFix(),
              (t = e.slideNext(e.params.speed, !0, !0)),
              n("autoplay"))
            : e.isEnd
            ? e.params.autoplay.stopOnLastSlide
              ? a()
              : ((t = e.slideTo(0, e.params.speed, !0, !0)), n("autoplay"))
            : ((t = e.slideNext(e.params.speed, !0, !0)), n("autoplay")),
            ((e.params.cssMode && e.autoplay.running) || !1 === t) && r();
        }, i));
    }
    function o() {
      return (
        void 0 === s &&
        !e.autoplay.running &&
        ((e.autoplay.running = !0), n("autoplayStart"), r(), !0)
      );
    }
    function a() {
      return (
        !!e.autoplay.running &&
        void 0 !== s &&
        (s && (clearTimeout(s), (s = void 0)),
        (e.autoplay.running = !1),
        n("autoplayStop"),
        !0)
      );
    }
    function l(t) {
      e.autoplay.running &&
        (e.autoplay.paused ||
          (s && clearTimeout(s),
          (e.autoplay.paused = !0),
          0 !== t && e.params.autoplay.waitForTransition
            ? ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                e.$wrapperEl[0].addEventListener(t, c);
              })
            : ((e.autoplay.paused = !1), r())));
    }
    function d() {
      const t = ht();
      "hidden" === t.visibilityState && e.autoplay.running && l(),
        "visible" === t.visibilityState &&
          e.autoplay.paused &&
          (r(), (e.autoplay.paused = !1));
    }
    function c(t) {
      e &&
        !e.destroyed &&
        e.$wrapperEl &&
        t.target === e.$wrapperEl[0] &&
        (["transitionend", "webkitTransitionEnd"].forEach((t) => {
          e.$wrapperEl[0].removeEventListener(t, c);
        }),
        (e.autoplay.paused = !1),
        e.autoplay.running ? r() : a());
    }
    function u() {
      e.params.autoplay.disableOnInteraction ? a() : l(),
        ["transitionend", "webkitTransitionEnd"].forEach((t) => {
          e.$wrapperEl[0].removeEventListener(t, c);
        });
    }
    function p() {
      e.params.autoplay.disableOnInteraction || ((e.autoplay.paused = !1), r());
    }
    (e.autoplay = { running: !1, paused: !1 }),
      t({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      }),
      i("init", () => {
        if (e.params.autoplay.enabled) {
          o();
          ht().addEventListener("visibilitychange", d),
            e.params.autoplay.pauseOnMouseEnter &&
              (e.$el.on("mouseenter", u), e.$el.on("mouseleave", p));
        }
      }),
      i("beforeTransitionStart", (t, i, n) => {
        e.autoplay.running &&
          (n || !e.params.autoplay.disableOnInteraction
            ? e.autoplay.pause(i)
            : a());
      }),
      i("sliderFirstMove", () => {
        e.autoplay.running &&
          (e.params.autoplay.disableOnInteraction ? a() : l());
      }),
      i("touchEnd", () => {
        e.params.cssMode &&
          e.autoplay.paused &&
          !e.params.autoplay.disableOnInteraction &&
          r();
      }),
      i("destroy", () => {
        e.$el.off("mouseenter", u),
          e.$el.off("mouseleave", p),
          e.autoplay.running && a();
        ht().removeEventListener("visibilitychange", d);
      }),
      Object.assign(e.autoplay, { pause: l, run: r, start: o, stop: a });
  }
  function ci() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)'
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  window.addEventListener("load", function (e) {
    ci(),
      document.querySelector(".glass-partition__slider") &&
        new ai(".glass-partition__slider", {
          modules: [li],
          effect: "fade",
          autoplay: { delay: 3e3, disableOnInteraction: !1 },
          observer: !0,
          observeParents: !0,
          slidesPerView: 4,
          spaceBetween: 20,
          speed: 1200,
          navigation: {
            nextEl: ".about__more .more__item_next",
            prevEl: ".about__more .more__item_prev",
          },
          breakpoints: {
            320: { slidesPerView: 1.2 },
            370: { slidesPerView: 1.5 },
            479.98: { slidesPerView: 1.7 },
            650: { slidesPerView: 2.2 },
            768: { slidesPerView: 2.5 },
            992: { slidesPerView: 3.5 },
            1268: { slidesPerView: 4 },
          },
          on: {},
        }),
      document.querySelector(".areas-sliding__slider") &&
        new ai(".areas-sliding__slider", {
          modules: [li, di],
          effect: "fade",
          autoplay: {
            delay: 1e3,
            stopOnLastSlide: !1,
            disableOnInteraction: !1,
          },
          observer: !0,
          observeParents: !0,
          slidesPerView: 7.5,
          spaceBetween: 20,
          speed: 1200,
          loop: !0,
          navigation: {
            nextEl: ".about__more .more__item_next",
            prevEl: ".about__more .more__item_prev",
          },
          breakpoints: {
            320: { slidesPerView: 2.2 },
            370: { slidesPerView: 2.4 },
            580: { slidesPerView: 3.7 },
            750: { slidesPerView: 4.2 },
            991.98: { slidesPerView: 4.7, centeredSlides: !1 },
            1130: { slidesPerView: 5.5, centeredSlides: !0 },
            1350: { slidesPerView: 7.5 },
          },
          on: {},
        }),
      document.querySelector(".glass-partition__slider") &&
        new ai(".glass-partition__slider", {
          modules: [li],
          effect: "fade",
          autoplay: { delay: 3e3, disableOnInteraction: !1 },
          observer: !0,
          observeParents: !0,
          slidesPerView: 2.5,
          spaceBetween: 40,
          speed: 1200,
          infinite: !0,
          loop: !0,
          navigation: {
            nextEl: ".about__more .more__item_next",
            prevEl: ".about__more .more__item_prev",
          },
          breakpoints: {
            750: { spaceBetween: 20 },
            991.98: { spaceBetween: 40 },
          },
          on: {},
        });
  });
  let ui = !1;
  setTimeout(() => {
    if (ui) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  var pi = function () {
    return (
      (pi =
        Object.assign ||
        function (e) {
          for (var t, i = 1, n = arguments.length; i < n; i++)
            for (var s in (t = arguments[i]))
              Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
          return e;
        }),
      pi.apply(this, arguments)
    );
  };
  var hi = (function () {
    function e(e) {
      return (
        (this.cssVenderPrefixes = [
          "TransitionDuration",
          "TransitionTimingFunction",
          "Transform",
          "Transition",
        ]),
        (this.selector = this._getSelector(e)),
        (this.firstElement = this._getFirstEl()),
        this
      );
    }
    return (
      (e.generateUUID = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (e) {
            var t = (16 * Math.random()) | 0;
            return ("x" == e ? t : (3 & t) | 8).toString(16);
          }
        );
      }),
      (e.prototype._getSelector = function (e, t) {
        return (
          void 0 === t && (t = document),
          "string" != typeof e
            ? e
            : ((t = t || document),
              "#" === e.substring(0, 1)
                ? t.querySelector(e)
                : t.querySelectorAll(e))
        );
      }),
      (e.prototype._each = function (e) {
        return this.selector
          ? (void 0 !== this.selector.length
              ? [].forEach.call(this.selector, e)
              : e(this.selector, 0),
            this)
          : this;
      }),
      (e.prototype._setCssVendorPrefix = function (e, t, i) {
        var n = t.replace(/-([a-z])/gi, function (e, t) {
          return t.toUpperCase();
        });
        -1 !== this.cssVenderPrefixes.indexOf(n)
          ? ((e.style[n.charAt(0).toLowerCase() + n.slice(1)] = i),
            (e.style["webkit" + n] = i),
            (e.style["moz" + n] = i),
            (e.style["ms" + n] = i),
            (e.style["o" + n] = i))
          : (e.style[n] = i);
      }),
      (e.prototype._getFirstEl = function () {
        return this.selector && void 0 !== this.selector.length
          ? this.selector[0]
          : this.selector;
      }),
      (e.prototype.isEventMatched = function (e, t) {
        var i = t.split(".");
        return e
          .split(".")
          .filter(function (e) {
            return e;
          })
          .every(function (e) {
            return -1 !== i.indexOf(e);
          });
      }),
      (e.prototype.attr = function (e, t) {
        return void 0 === t
          ? this.firstElement
            ? this.firstElement.getAttribute(e)
            : ""
          : (this._each(function (i) {
              i.setAttribute(e, t);
            }),
            this);
      }),
      (e.prototype.find = function (e) {
        return fi(this._getSelector(e, this.selector));
      }),
      (e.prototype.first = function () {
        return this.selector && void 0 !== this.selector.length
          ? fi(this.selector[0])
          : fi(this.selector);
      }),
      (e.prototype.eq = function (e) {
        return fi(this.selector[e]);
      }),
      (e.prototype.parent = function () {
        return fi(this.selector.parentElement);
      }),
      (e.prototype.get = function () {
        return this._getFirstEl();
      }),
      (e.prototype.removeAttr = function (e) {
        var t = e.split(" ");
        return (
          this._each(function (e) {
            t.forEach(function (t) {
              return e.removeAttribute(t);
            });
          }),
          this
        );
      }),
      (e.prototype.wrap = function (e) {
        if (!this.firstElement) return this;
        var t = document.createElement("div");
        return (
          (t.className = e),
          this.firstElement.parentNode.insertBefore(t, this.firstElement),
          this.firstElement.parentNode.removeChild(this.firstElement),
          t.appendChild(this.firstElement),
          this
        );
      }),
      (e.prototype.addClass = function (e) {
        return (
          void 0 === e && (e = ""),
          this._each(function (t) {
            e.split(" ").forEach(function (e) {
              e && t.classList.add(e);
            });
          }),
          this
        );
      }),
      (e.prototype.removeClass = function (e) {
        return (
          this._each(function (t) {
            e.split(" ").forEach(function (e) {
              e && t.classList.remove(e);
            });
          }),
          this
        );
      }),
      (e.prototype.hasClass = function (e) {
        return !!this.firstElement && this.firstElement.classList.contains(e);
      }),
      (e.prototype.hasAttribute = function (e) {
        return !!this.firstElement && this.firstElement.hasAttribute(e);
      }),
      (e.prototype.toggleClass = function (e) {
        return this.firstElement
          ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this)
          : this;
      }),
      (e.prototype.css = function (e, t) {
        var i = this;
        return (
          this._each(function (n) {
            i._setCssVendorPrefix(n, e, t);
          }),
          this
        );
      }),
      (e.prototype.on = function (t, i) {
        var n = this;
        return this.selector
          ? (t.split(" ").forEach(function (t) {
              Array.isArray(e.eventListeners[t]) || (e.eventListeners[t] = []),
                e.eventListeners[t].push(i),
                n.selector.addEventListener(t.split(".")[0], i);
            }),
            this)
          : this;
      }),
      (e.prototype.once = function (e, t) {
        var i = this;
        return (
          this.on(e, function () {
            i.off(e), t(e);
          }),
          this
        );
      }),
      (e.prototype.off = function (t) {
        var i = this;
        return this.selector
          ? (Object.keys(e.eventListeners).forEach(function (n) {
              i.isEventMatched(t, n) &&
                (e.eventListeners[n].forEach(function (e) {
                  i.selector.removeEventListener(n.split(".")[0], e);
                }),
                (e.eventListeners[n] = []));
            }),
            this)
          : this;
      }),
      (e.prototype.trigger = function (e, t) {
        if (!this.firstElement) return this;
        var i = new CustomEvent(e.split(".")[0], { detail: t || null });
        return this.firstElement.dispatchEvent(i), this;
      }),
      (e.prototype.load = function (e) {
        var t = this;
        return (
          fetch(e).then(function (e) {
            t.selector.innerHTML = e;
          }),
          this
        );
      }),
      (e.prototype.html = function (e) {
        return void 0 === e
          ? this.firstElement
            ? this.firstElement.innerHTML
            : ""
          : (this._each(function (t) {
              t.innerHTML = e;
            }),
            this);
      }),
      (e.prototype.append = function (e) {
        return (
          this._each(function (t) {
            "string" == typeof e
              ? t.insertAdjacentHTML("beforeend", e)
              : t.appendChild(e);
          }),
          this
        );
      }),
      (e.prototype.prepend = function (e) {
        return (
          this._each(function (t) {
            t.insertAdjacentHTML("afterbegin", e);
          }),
          this
        );
      }),
      (e.prototype.remove = function () {
        return (
          this._each(function (e) {
            e.parentNode.removeChild(e);
          }),
          this
        );
      }),
      (e.prototype.empty = function () {
        return (
          this._each(function (e) {
            e.innerHTML = "";
          }),
          this
        );
      }),
      (e.prototype.scrollTop = function (e) {
        return void 0 !== e
          ? ((document.body.scrollTop = e),
            (document.documentElement.scrollTop = e),
            this)
          : window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;
      }),
      (e.prototype.scrollLeft = function (e) {
        return void 0 !== e
          ? ((document.body.scrollLeft = e),
            (document.documentElement.scrollLeft = e),
            this)
          : window.pageXOffset ||
              document.documentElement.scrollLeft ||
              document.body.scrollLeft ||
              0;
      }),
      (e.prototype.offset = function () {
        if (!this.firstElement) return { left: 0, top: 0 };
        var e = this.firstElement.getBoundingClientRect(),
          t = fi("body").style().marginLeft;
        return {
          left: e.left - parseFloat(t) + this.scrollLeft(),
          top: e.top + this.scrollTop(),
        };
      }),
      (e.prototype.style = function () {
        return this.firstElement
          ? this.firstElement.currentStyle ||
              window.getComputedStyle(this.firstElement)
          : {};
      }),
      (e.prototype.width = function () {
        var e = this.style();
        return (
          this.firstElement.clientWidth -
          parseFloat(e.paddingLeft) -
          parseFloat(e.paddingRight)
        );
      }),
      (e.prototype.height = function () {
        var e = this.style();
        return (
          this.firstElement.clientHeight -
          parseFloat(e.paddingTop) -
          parseFloat(e.paddingBottom)
        );
      }),
      (e.eventListeners = {}),
      e
    );
  })();
  function fi(e) {
    return (
      (function () {
        if ("function" == typeof window.CustomEvent) return !1;
        window.CustomEvent = function (e, t) {
          t = t || { bubbles: !1, cancelable: !1, detail: null };
          var i = document.createEvent("CustomEvent");
          return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
        };
      })(),
      Element.prototype.matches ||
        (Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector),
      new hi(e)
    );
  }
  var gi = [
    "src",
    "sources",
    "subHtml",
    "subHtmlUrl",
    "html",
    "video",
    "poster",
    "slideName",
    "responsive",
    "srcset",
    "sizes",
    "iframe",
    "downloadUrl",
    "download",
    "width",
    "facebookShareUrl",
    "tweetText",
    "iframeTitle",
    "twitterShareUrl",
    "pinterestShareUrl",
    "pinterestText",
    "fbHtml",
    "disqusIdentifier",
    "disqusUrl",
  ];
  function mi(e) {
    return "href" === e
      ? "src"
      : (e = (e =
          (e = e.replace("data-", "")).charAt(0).toLowerCase() +
          e.slice(1)).replace(/-([a-z])/g, function (e) {
          return e[1].toUpperCase();
        }));
  }
  var vi = function (e, t, i, n) {
      void 0 === i && (i = 0);
      var s = fi(e).attr("data-lg-size") || n;
      if (s) {
        var r = s.split(",");
        if (r[1])
          for (var o = window.innerWidth, a = 0; a < r.length; a++) {
            var l = r[a];
            if (parseInt(l.split("-")[2], 10) > o) {
              s = l;
              break;
            }
            a === r.length - 1 && (s = l);
          }
        var d = s.split("-"),
          c = parseInt(d[0], 10),
          u = parseInt(d[1], 10),
          p = t.width(),
          h = t.height() - i,
          f = Math.min(p, c),
          g = Math.min(h, u),
          m = Math.min(f / c, g / u);
        return { width: c * m, height: u * m };
      }
    },
    yi = function (e, t, i, n, s) {
      if (s) {
        var r = fi(e).find("img").first();
        if (r.get()) {
          var o = t.get().getBoundingClientRect(),
            a = o.width,
            l = t.height() - (i + n),
            d = r.width(),
            c = r.height(),
            u = r.style(),
            p =
              (a - d) / 2 -
              r.offset().left +
              (parseFloat(u.paddingLeft) || 0) +
              (parseFloat(u.borderLeft) || 0) +
              fi(window).scrollLeft() +
              o.left,
            h =
              (l - c) / 2 -
              r.offset().top +
              (parseFloat(u.paddingTop) || 0) +
              (parseFloat(u.borderTop) || 0) +
              fi(window).scrollTop() +
              i;
          return (
            "translate3d(" +
            (p *= -1) +
            "px, " +
            (h *= -1) +
            "px, 0) scale3d(" +
            d / s.width +
            ", " +
            c / s.height +
            ", 1)"
          );
        }
      }
    },
    bi = function (e, t, i, n, s, r) {
      return (
        '<div class="lg-video-cont lg-has-iframe" style="width:' +
        e +
        "; max-width:" +
        i +
        "; height: " +
        t +
        "; max-height:" +
        n +
        '">\n                    <iframe class="lg-object" frameborder="0" ' +
        (r ? 'title="' + r + '"' : "") +
        ' src="' +
        s +
        '"  allowfullscreen="true"></iframe>\n                </div>'
      );
    },
    wi = function (e, t, i, n, s, r) {
      var o =
          "<img " +
          i +
          " " +
          (n ? 'srcset="' + n + '"' : "") +
          "  " +
          (s ? 'sizes="' + s + '"' : "") +
          ' class="lg-object lg-image" data-index="' +
          e +
          '" src="' +
          t +
          '" />',
        a = "";
      r &&
        (a = ("string" == typeof r ? JSON.parse(r) : r).map(function (e) {
          var t = "";
          return (
            Object.keys(e).forEach(function (i) {
              t += " " + i + '="' + e[i] + '"';
            }),
            "<source " + t + "></source>"
          );
        }));
      return "" + a + o;
    },
    xi = function (e) {
      for (var t = [], i = [], n = "", s = 0; s < e.length; s++) {
        var r = e[s].split(" ");
        "" === r[0] && r.splice(0, 1), i.push(r[0]), t.push(r[1]);
      }
      for (var o = window.innerWidth, a = 0; a < t.length; a++)
        if (parseInt(t[a], 10) > o) {
          n = i[a];
          break;
        }
      return n;
    },
    Ti = function (e) {
      return !!e && !!e.complete && 0 !== e.naturalWidth;
    },
    Ci = function (e, t, i, n) {
      return (
        '<div class="lg-video-cont ' +
        (n && n.youtube
          ? "lg-has-youtube"
          : n && n.vimeo
          ? "lg-has-vimeo"
          : "lg-has-html5") +
        '" style="' +
        i +
        '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="Play video"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>Play video</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
        (t || "") +
        '\n            <img class="lg-object lg-video-poster" src="' +
        e +
        '" />\n        </div>'
      );
    },
    Si = function (e, t, i, n) {
      var s = [],
        r = (function () {
          for (var e = 0, t = 0, i = arguments.length; t < i; t++)
            e += arguments[t].length;
          var n = Array(e),
            s = 0;
          for (t = 0; t < i; t++)
            for (var r = arguments[t], o = 0, a = r.length; o < a; o++, s++)
              n[s] = r[o];
          return n;
        })(gi, t);
      return (
        [].forEach.call(e, function (e) {
          for (var t = {}, o = 0; o < e.attributes.length; o++) {
            var a = e.attributes[o];
            if (a.specified) {
              var l = mi(a.name),
                d = "";
              r.indexOf(l) > -1 && (d = l), d && (t[d] = a.value);
            }
          }
          var c = fi(e),
            u = c.find("img").first().attr("alt"),
            p = c.attr("title"),
            h = n ? c.attr(n) : c.find("img").first().attr("src");
          (t.thumb = h),
            i && !t.subHtml && (t.subHtml = p || u || ""),
            (t.alt = u || p || ""),
            s.push(t);
        }),
        s
      );
    },
    Ei = function () {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    Oi = function (e, t, i) {
      if (!e)
        return t
          ? { html5: !0 }
          : void console.error(
              "lightGallery :- data-src is not provided on slide item " +
                (i + 1) +
                ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
            );
      var n = e.match(
          /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
        ),
        s = e.match(
          /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
        ),
        r = e.match(
          /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
        );
      return n ? { youtube: n } : s ? { vimeo: s } : r ? { wistia: r } : void 0;
    },
    Ii = {
      mode: "lg-slide",
      easing: "ease",
      speed: 400,
      licenseKey: "0000-0000-000-0000",
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 300,
      container: "",
      startAnimationDuration: 400,
      zoomFromOrigin: !0,
      hideBarsDelay: 0,
      showBarsAfter: 1e4,
      slideDelay: 0,
      supportLegacyBrowser: !0,
      allowMediaOverlap: !1,
      videoMaxSize: "1280-720",
      loadYouTubePoster: !0,
      defaultCaptionHeight: 0,
      ariaLabelledby: "",
      ariaDescribedby: "",
      closable: !0,
      swipeToClose: !0,
      closeOnTap: !0,
      showCloseIcon: !0,
      showMaximizeIcon: !1,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      controls: !0,
      slideEndAnimation: !0,
      hideControlOnEnd: !1,
      mousewheel: !1,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 2,
      numberOfSlideItemsInDom: 10,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: 0,
      iframeWidth: "100%",
      iframeHeight: "100%",
      iframeMaxWidth: "100%",
      iframeMaxHeight: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      extraProps: [],
      exThumbImage: "",
      isMobile: void 0,
      mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
      plugins: [],
    },
    Li = "lgAfterAppendSlide",
    ki = "lgInit",
    Mi = "lgHasVideo",
    Ai = "lgContainerResize",
    Pi = "lgUpdateSlides",
    Di = "lgAfterAppendSubHtml",
    _i = "lgBeforeOpen",
    zi = "lgAfterOpen",
    $i = "lgSlideItemLoad",
    Bi = "lgBeforeSlide",
    Gi = "lgAfterSlide",
    Ni = "lgPosterClick",
    ji = "lgDragStart",
    Hi = "lgDragMove",
    Vi = "lgDragEnd",
    Fi = "lgBeforeNextSlide",
    Wi = "lgBeforePrevSlide",
    Ri = "lgBeforeClose",
    qi = "lgAfterClose",
    Xi = 0,
    Yi = (function () {
      function e(e, t) {
        if (
          ((this.lgOpened = !1),
          (this.index = 0),
          (this.plugins = []),
          (this.lGalleryOn = !1),
          (this.lgBusy = !1),
          (this.currentItemsInDom = []),
          (this.prevScrollTop = 0),
          (this.isDummyImageRemoved = !1),
          (this.dragOrSwipeEnabled = !1),
          (this.mediaContainerPosition = { top: 0, bottom: 0 }),
          !e)
        )
          return this;
        if (
          (Xi++,
          (this.lgId = Xi),
          (this.el = e),
          (this.LGel = fi(e)),
          this.generateSettings(t),
          this.buildModules(),
          this.settings.dynamic &&
            void 0 !== this.settings.dynamicEl &&
            !Array.isArray(this.settings.dynamicEl))
        )
          throw "When using dynamic mode, you must also define dynamicEl as an Array.";
        return (
          (this.galleryItems = this.getItems()),
          this.normalizeSettings(),
          this.init(),
          this.validateLicense(),
          this
        );
      }
      return (
        (e.prototype.generateSettings = function (e) {
          if (
            ((this.settings = pi(pi({}, Ii), e)),
            this.settings.isMobile &&
            "function" == typeof this.settings.isMobile
              ? this.settings.isMobile()
              : Ei())
          ) {
            var t = pi(
              pi({}, this.settings.mobileSettings),
              this.settings.mobileSettings
            );
            this.settings = pi(pi({}, this.settings), t);
          }
        }),
        (e.prototype.normalizeSettings = function () {
          this.settings.slideEndAnimation &&
            (this.settings.hideControlOnEnd = !1),
            this.settings.closable || (this.settings.swipeToClose = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            this.settings.dynamic && (this.zoomFromOrigin = !1),
            this.settings.container ||
              (this.settings.container = document.body),
            (this.settings.preload = Math.min(
              this.settings.preload,
              this.galleryItems.length
            ));
        }),
        (e.prototype.init = function () {
          var e = this;
          this.addSlideVideoInfo(this.galleryItems),
            this.buildStructure(),
            this.LGel.trigger(ki, { instance: this }),
            this.settings.keyPress && this.keyPress(),
            setTimeout(function () {
              e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
            }, 50),
            this.arrow(),
            this.settings.mousewheel && this.mousewheel(),
            this.settings.dynamic || this.openGalleryOnItemClick();
        }),
        (e.prototype.openGalleryOnItemClick = function () {
          for (
            var e = this,
              t = function (t) {
                var n = i.items[t],
                  s = fi(n),
                  r = hi.generateUUID();
                s.attr("data-lg-id", r).on(
                  "click.lgcustom-item-" + r,
                  function (i) {
                    i.preventDefault();
                    var s = e.settings.index || t;
                    e.openGallery(s, n);
                  }
                );
              },
              i = this,
              n = 0;
            n < this.items.length;
            n++
          )
            t(n);
        }),
        (e.prototype.buildModules = function () {
          var e = this;
          this.settings.plugins.forEach(function (t) {
            e.plugins.push(new t(e, fi));
          });
        }),
        (e.prototype.validateLicense = function () {
          this.settings.licenseKey
            ? "0000-0000-000-0000" === this.settings.licenseKey &&
              console.warn(
                "lightGallery: " +
                  this.settings.licenseKey +
                  " license key is not valid for production use"
              )
            : console.error("Please provide a valid license key");
        }),
        (e.prototype.getSlideItem = function (e) {
          return fi(this.getSlideItemId(e));
        }),
        (e.prototype.getSlideItemId = function (e) {
          return "#lg-item-" + this.lgId + "-" + e;
        }),
        (e.prototype.getIdName = function (e) {
          return e + "-" + this.lgId;
        }),
        (e.prototype.getElementById = function (e) {
          return fi("#" + this.getIdName(e));
        }),
        (e.prototype.manageSingleSlideClassName = function () {
          this.galleryItems.length < 2
            ? this.outer.addClass("lg-single-item")
            : this.outer.removeClass("lg-single-item");
        }),
        (e.prototype.buildStructure = function () {
          var e = this;
          if (!(this.$container && this.$container.get())) {
            var t = "",
              i = "";
            this.settings.controls &&
              (t =
                '<button type="button" id="' +
                this.getIdName("lg-prev") +
                '" aria-label="Previous slide" class="lg-prev lg-icon"> ' +
                this.settings.prevHtml +
                ' </button>\n                <button type="button" id="' +
                this.getIdName("lg-next") +
                '" aria-label="Next slide" class="lg-next lg-icon"> ' +
                this.settings.nextHtml +
                " </button>"),
              ".lg-item" !== this.settings.appendSubHtmlTo &&
                (i =
                  '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
            var n = "";
            this.settings.allowMediaOverlap && (n += "lg-media-overlap ");
            var s = this.settings.ariaLabelledby
                ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                : "",
              r = this.settings.ariaDescribedby
                ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                : "",
              o =
                "lg-container " +
                this.settings.addClass +
                " " +
                (document.body !== this.settings.container ? "lg-inline" : ""),
              a =
                this.settings.closable && this.settings.showCloseIcon
                  ? '<button type="button" aria-label="Close gallery" id="' +
                    this.getIdName("lg-close") +
                    '" class="lg-close lg-icon"></button>'
                  : "",
              l = this.settings.showMaximizeIcon
                ? '<button type="button" aria-label="Toggle maximize" id="' +
                  this.getIdName("lg-maximize") +
                  '" class="lg-maximize lg-icon"></button>'
                : "",
              d =
                '\n        <div class="' +
                o +
                '" id="' +
                this.getIdName("lg-container") +
                '" tabindex="-1" aria-modal="true" ' +
                s +
                " " +
                r +
                ' role="dialog"\n        >\n            <div id="' +
                this.getIdName("lg-backdrop") +
                '" class="lg-backdrop"></div>\n\n            <div id="' +
                this.getIdName("lg-outer") +
                '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                n +
                ' ">\n\n              <div id="' +
                this.getIdName("lg-content") +
                '" class="lg-content">\n                <div id="' +
                this.getIdName("lg-inner") +
                '" class="lg-inner">\n                </div>\n                ' +
                t +
                '\n              </div>\n                <div id="' +
                this.getIdName("lg-toolbar") +
                '" class="lg-toolbar lg-group">\n                    ' +
                l +
                "\n                    " +
                a +
                "\n                    </div>\n                    " +
                (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") +
                '\n                <div id="' +
                this.getIdName("lg-components") +
                '" class="lg-components">\n                    ' +
                (".lg-sub-html" === this.settings.appendSubHtmlTo ? i : "") +
                "\n                </div>\n            </div>\n        </div>\n        ";
            fi(this.settings.container).css("position", "relative").append(d),
              (this.outer = this.getElementById("lg-outer")),
              (this.$lgComponents = this.getElementById("lg-components")),
              (this.$backdrop = this.getElementById("lg-backdrop")),
              (this.$container = this.getElementById("lg-container")),
              (this.$inner = this.getElementById("lg-inner")),
              (this.$content = this.getElementById("lg-content")),
              (this.$toolbar = this.getElementById("lg-toolbar")),
              this.$backdrop.css(
                "transition-duration",
                this.settings.backdropDuration + "ms"
              );
            var c = this.settings.mode + " ";
            this.manageSingleSlideClassName(),
              this.settings.enableDrag && (c += "lg-grab "),
              this.outer.addClass(c),
              this.$inner.css(
                "transition-timing-function",
                this.settings.easing
              ),
              this.$inner.css(
                "transition-duration",
                this.settings.speed + "ms"
              ),
              this.settings.download &&
                this.$toolbar.append(
                  '<a id="' +
                    this.getIdName("lg-download") +
                    '" target="_blank" rel="noopener" aria-label="Download" download class="lg-download lg-icon"></a>'
                ),
              this.counter(),
              fi(window).on(
                "resize.lg.global" +
                  this.lgId +
                  " orientationchange.lg.global" +
                  this.lgId,
                function () {
                  e.refreshOnResize();
                }
              ),
              this.hideBars(),
              this.manageCloseGallery(),
              this.toggleMaximize(),
              this.initModules();
          }
        }),
        (e.prototype.refreshOnResize = function () {
          if (this.lgOpened) {
            var e = this.galleryItems[this.index].__slideVideoInfo;
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var t = this.mediaContainerPosition,
              i = t.top,
              n = t.bottom;
            if (
              ((this.currentImageSize = vi(
                this.items[this.index],
                this.outer,
                i + n,
                e && this.settings.videoMaxSize
              )),
              e && this.resizeVideoSlide(this.index, this.currentImageSize),
              this.zoomFromOrigin && !this.isDummyImageRemoved)
            ) {
              var s = this.getDummyImgStyles(this.currentImageSize);
              this.outer
                .find(".lg-current .lg-dummy-img")
                .first()
                .attr("style", s);
            }
            this.LGel.trigger(Ai);
          }
        }),
        (e.prototype.resizeVideoSlide = function (e, t) {
          var i = this.getVideoContStyle(t);
          this.getSlideItem(e).find(".lg-video-cont").attr("style", i);
        }),
        (e.prototype.updateSlides = function (e, t) {
          if (
            (this.index > e.length - 1 && (this.index = e.length - 1),
            1 === e.length && (this.index = 0),
            e.length)
          ) {
            var i = this.galleryItems[t].src;
            (this.galleryItems = e),
              this.updateControls(),
              this.$inner.empty(),
              (this.currentItemsInDom = []);
            var n = 0;
            this.galleryItems.some(function (e, t) {
              return e.src === i && ((n = t), !0);
            }),
              (this.currentItemsInDom = this.organizeSlideItems(n, -1)),
              this.loadContent(n, !0),
              this.getSlideItem(n).addClass("lg-current"),
              (this.index = n),
              this.updateCurrentCounter(n),
              this.LGel.trigger(Pi);
          } else this.closeGallery();
        }),
        (e.prototype.getItems = function () {
          if (((this.items = []), this.settings.dynamic))
            return this.settings.dynamicEl || [];
          if ("this" === this.settings.selector) this.items.push(this.el);
          else if (this.settings.selector)
            if ("string" == typeof this.settings.selector)
              if (this.settings.selectWithin) {
                var e = fi(this.settings.selectWithin);
                this.items = e.find(this.settings.selector).get();
              } else
                this.items = this.el.querySelectorAll(this.settings.selector);
            else this.items = this.settings.selector;
          else this.items = this.el.children;
          return Si(
            this.items,
            this.settings.extraProps,
            this.settings.getCaptionFromTitleOrAlt,
            this.settings.exThumbImage
          );
        }),
        (e.prototype.openGallery = function (e, t) {
          var i = this;
          if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
            (this.lgOpened = !0),
              this.outer.get().focus(),
              this.outer.removeClass("lg-hide-items"),
              this.$container.addClass("lg-show");
            var n = this.getItemsToBeInsertedToDom(e, e);
            this.currentItemsInDom = n;
            var s = "";
            n.forEach(function (e) {
              s = s + '<div id="' + e + '" class="lg-item"></div>';
            }),
              this.$inner.append(s),
              this.addHtml(e);
            var r = "";
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var o = this.mediaContainerPosition,
              a = o.top,
              l = o.bottom;
            this.settings.allowMediaOverlap ||
              this.setMediaContainerPosition(a, l);
            var d = this.galleryItems[e].__slideVideoInfo;
            this.zoomFromOrigin &&
              t &&
              ((this.currentImageSize = vi(
                t,
                this.outer,
                a + l,
                d && this.settings.videoMaxSize
              )),
              (r = yi(t, this.outer, a, l, this.currentImageSize))),
              (this.zoomFromOrigin && r) ||
                (this.outer.addClass(this.settings.startClass),
                this.getSlideItem(e).removeClass("lg-complete"));
            var c = this.settings.zoomFromOrigin
              ? 100
              : this.settings.backdropDuration;
            setTimeout(function () {
              i.outer.addClass("lg-components-open");
            }, c),
              (this.index = e),
              this.LGel.trigger(_i),
              this.getSlideItem(e).addClass("lg-current"),
              (this.lGalleryOn = !1),
              (this.prevScrollTop = fi(window).scrollTop()),
              setTimeout(function () {
                if (i.zoomFromOrigin && r) {
                  var t = i.getSlideItem(e);
                  t.css("transform", r),
                    setTimeout(function () {
                      t
                        .addClass("lg-start-progress lg-start-end-progress")
                        .css(
                          "transition-duration",
                          i.settings.startAnimationDuration + "ms"
                        ),
                        i.outer.addClass("lg-zoom-from-image");
                    }),
                    setTimeout(function () {
                      t.css("transform", "translate3d(0, 0, 0)");
                    }, 100);
                }
                setTimeout(function () {
                  i.$backdrop.addClass("in"),
                    i.$container.addClass("lg-show-in");
                }, 10),
                  (i.zoomFromOrigin && r) ||
                    setTimeout(function () {
                      i.outer.addClass("lg-visible");
                    }, i.settings.backdropDuration),
                  i.slide(e, !1, !1, !1),
                  i.LGel.trigger(zi);
              }),
              document.body === this.settings.container &&
                fi("html").addClass("lg-on");
          }
        }),
        (e.prototype.getMediaContainerPosition = function () {
          if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
          var e = this.$toolbar.get().clientHeight || 0,
            t = this.outer.find(".lg-components .lg-sub-html").get(),
            i =
              this.settings.defaultCaptionHeight || (t && t.clientHeight) || 0,
            n = this.outer.find(".lg-thumb-outer").get();
          return { top: e, bottom: (n ? n.clientHeight : 0) + i };
        }),
        (e.prototype.setMediaContainerPosition = function (e, t) {
          void 0 === e && (e = 0),
            void 0 === t && (t = 0),
            this.$content.css("top", e + "px").css("bottom", t + "px");
        }),
        (e.prototype.hideBars = function () {
          var e = this;
          setTimeout(function () {
            e.outer.removeClass("lg-hide-items"),
              e.settings.hideBarsDelay > 0 &&
                (e.outer.on("mousemove.lg click.lg touchstart.lg", function () {
                  e.outer.removeClass("lg-hide-items"),
                    clearTimeout(e.hideBarTimeout),
                    (e.hideBarTimeout = setTimeout(function () {
                      e.outer.addClass("lg-hide-items");
                    }, e.settings.hideBarsDelay));
                }),
                e.outer.trigger("mousemove.lg"));
          }, this.settings.showBarsAfter);
        }),
        (e.prototype.initPictureFill = function (e) {
          if (this.settings.supportLegacyBrowser)
            try {
              picturefill({ elements: [e.get()] });
            } catch (e) {
              console.warn(
                "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
              );
            }
        }),
        (e.prototype.counter = function () {
          if (this.settings.counter) {
            var e =
              '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
              this.getIdName("lg-counter-current") +
              '" class="lg-counter-current">' +
              (this.index + 1) +
              ' </span> /\n                <span id="' +
              this.getIdName("lg-counter-all") +
              '" class="lg-counter-all">' +
              this.galleryItems.length +
              " </span></div>";
            this.outer.find(this.settings.appendCounterTo).append(e);
          }
        }),
        (e.prototype.addHtml = function (e) {
          var t, i;
          if (
            (this.galleryItems[e].subHtmlUrl
              ? (i = this.galleryItems[e].subHtmlUrl)
              : (t = this.galleryItems[e].subHtml),
            !i)
          )
            if (t) {
              var n = t.substring(0, 1);
              ("." !== n && "#" !== n) ||
                (t =
                  this.settings.subHtmlSelectorRelative &&
                  !this.settings.dynamic
                    ? fi(this.items).eq(e).find(t).first().html()
                    : fi(t).first().html());
            } else t = "";
          if (".lg-item" !== this.settings.appendSubHtmlTo)
            i
              ? this.outer.find(".lg-sub-html").load(i)
              : this.outer.find(".lg-sub-html").html(t);
          else {
            var s = fi(this.getSlideItemId(e));
            i
              ? s.load(i)
              : s.append('<div class="lg-sub-html">' + t + "</div>");
          }
          null != t &&
            ("" === t
              ? this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
            this.LGel.trigger(Di, { index: e });
        }),
        (e.prototype.preload = function (e) {
          for (
            var t = 1;
            t <= this.settings.preload && !(t >= this.galleryItems.length - e);
            t++
          )
            this.loadContent(e + t, !1);
          for (var i = 1; i <= this.settings.preload && !(e - i < 0); i++)
            this.loadContent(e - i, !1);
        }),
        (e.prototype.getDummyImgStyles = function (e) {
          return e
            ? "width:" +
                e.width +
                "px;\n                margin-left: -" +
                e.width / 2 +
                "px;\n                margin-top: -" +
                e.height / 2 +
                "px;\n                height:" +
                e.height +
                "px"
            : "";
        }),
        (e.prototype.getVideoContStyle = function (e) {
          return e
            ? "width:" +
                e.width +
                "px;\n                height:" +
                e.height +
                "px"
            : "";
        }),
        (e.prototype.getDummyImageContent = function (e, t, i) {
          var n;
          if ((this.settings.dynamic || (n = fi(this.items).eq(t)), n)) {
            var s = void 0;
            if (
              !(s = this.settings.exThumbImage
                ? n.attr(this.settings.exThumbImage)
                : n.find("img").first().attr("src"))
            )
              return "";
            var r =
              "<img " +
              i +
              ' style="' +
              this.getDummyImgStyles(this.currentImageSize) +
              '" class="lg-dummy-img" src="' +
              s +
              '" />';
            return (
              e.addClass("lg-first-slide"),
              this.outer.addClass("lg-first-slide-loading"),
              r
            );
          }
          return "";
        }),
        (e.prototype.setImgMarkup = function (e, t, i) {
          var n = this.galleryItems[i],
            s = n.alt,
            r = n.srcset,
            o = n.sizes,
            a = n.sources,
            l = s ? 'alt="' + s + '"' : "",
            d =
              '<picture class="lg-img-wrap"> ' +
              (this.isFirstSlideWithZoomAnimation()
                ? this.getDummyImageContent(t, i, l)
                : wi(i, e, l, r, o, a)) +
              "</picture>";
          t.prepend(d);
        }),
        (e.prototype.onSlideObjectLoad = function (e, t, i, n) {
          var s = e.find(".lg-object").first();
          Ti(s.get()) || t
            ? i()
            : (s.on("load.lg error.lg", function () {
                i && i();
              }),
              s.on("error.lg", function () {
                n && n();
              }));
        }),
        (e.prototype.onLgObjectLoad = function (e, t, i, n, s, r) {
          var o = this;
          this.onSlideObjectLoad(
            e,
            r,
            function () {
              o.triggerSlideItemLoad(e, t, i, n, s);
            },
            function () {
              e.addClass("lg-complete lg-complete_"),
                e.html(
                  '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                );
            }
          );
        }),
        (e.prototype.triggerSlideItemLoad = function (e, t, i, n, s) {
          var r = this,
            o = this.galleryItems[t],
            a = s && "video" === this.getSlideType(o) && !o.poster ? n : 0;
          setTimeout(function () {
            e.addClass("lg-complete lg-complete_"),
              r.LGel.trigger($i, { index: t, delay: i || 0, isFirstSlide: s });
          }, a);
        }),
        (e.prototype.isFirstSlideWithZoomAnimation = function () {
          return !(
            this.lGalleryOn ||
            !this.zoomFromOrigin ||
            !this.currentImageSize
          );
        }),
        (e.prototype.addSlideVideoInfo = function (e) {
          var t = this;
          e.forEach(function (e, i) {
            (e.__slideVideoInfo = Oi(e.src, !!e.video, i)),
              e.__slideVideoInfo &&
                t.settings.loadYouTubePoster &&
                !e.poster &&
                e.__slideVideoInfo.youtube &&
                (e.poster =
                  "//img.youtube.com/vi/" +
                  e.__slideVideoInfo.youtube[1] +
                  "/maxresdefault.jpg");
          });
        }),
        (e.prototype.loadContent = function (e, t) {
          var i = this,
            n = this.galleryItems[e],
            s = fi(this.getSlideItemId(e)),
            r = n.poster,
            o = n.srcset,
            a = n.sizes,
            l = n.sources,
            d = n.src,
            c = n.video,
            u = c && "string" == typeof c ? JSON.parse(c) : c;
          if (n.responsive) {
            var p = n.responsive.split(",");
            d = xi(p) || d;
          }
          var h = n.__slideVideoInfo,
            f = "",
            g = !!n.iframe,
            m = !this.lGalleryOn,
            v = 0;
          if (
            (m &&
              (v =
                this.zoomFromOrigin && this.currentImageSize
                  ? this.settings.startAnimationDuration + 10
                  : this.settings.backdropDuration + 10),
            !s.hasClass("lg-loaded"))
          ) {
            if (h) {
              var y = this.mediaContainerPosition,
                b = y.top,
                w = y.bottom,
                x = vi(
                  this.items[e],
                  this.outer,
                  b + w,
                  h && this.settings.videoMaxSize
                );
              f = this.getVideoContStyle(x);
            }
            if (g) {
              var T = bi(
                this.settings.iframeWidth,
                this.settings.iframeHeight,
                this.settings.iframeMaxWidth,
                this.settings.iframeMaxHeight,
                d,
                n.iframeTitle
              );
              s.prepend(T);
            } else if (r) {
              var C = "";
              m &&
                this.zoomFromOrigin &&
                this.currentImageSize &&
                (C = this.getDummyImageContent(s, e, ""));
              T = Ci(r, C || "", f, h);
              s.prepend(T);
            } else if (h) {
              T = '<div class="lg-video-cont " style="' + f + '"></div>';
              s.prepend(T);
            } else if ((this.setImgMarkup(d, s, e), o || l)) {
              var S = s.find(".lg-object");
              this.initPictureFill(S);
            }
            (r || h) &&
              this.LGel.trigger(Mi, {
                index: e,
                src: d,
                html5Video: u,
                hasPoster: !!r,
              }),
              this.LGel.trigger(Li, { index: e }),
              this.lGalleryOn &&
                ".lg-item" === this.settings.appendSubHtmlTo &&
                this.addHtml(e);
          }
          var E = 0;
          v && !fi(document.body).hasClass("lg-from-hash") && (E = v),
            this.isFirstSlideWithZoomAnimation() &&
              (setTimeout(function () {
                s.removeClass(
                  "lg-start-end-progress lg-start-progress"
                ).removeAttr("style");
              }, this.settings.startAnimationDuration + 100),
              s.hasClass("lg-loaded") ||
                setTimeout(function () {
                  if (
                    "image" === i.getSlideType(n) &&
                    (s
                      .find(".lg-img-wrap")
                      .append(wi(e, d, "", o, a, n.sources)),
                    o || l)
                  ) {
                    var t = s.find(".lg-object");
                    i.initPictureFill(t);
                  }
                  ("image" === i.getSlideType(n) ||
                    ("video" === i.getSlideType(n) && r)) &&
                    (i.onLgObjectLoad(s, e, v, E, !0, !1),
                    i.onSlideObjectLoad(
                      s,
                      !(!h || !h.html5 || r),
                      function () {
                        i.loadContentOnFirstSlideLoad(e, s, E);
                      },
                      function () {
                        i.loadContentOnFirstSlideLoad(e, s, E);
                      }
                    ));
                }, this.settings.startAnimationDuration + 100)),
            s.addClass("lg-loaded"),
            (this.isFirstSlideWithZoomAnimation() &&
              ("video" !== this.getSlideType(n) || r)) ||
              this.onLgObjectLoad(s, e, v, E, m, !(!h || !h.html5 || r)),
            (this.zoomFromOrigin && this.currentImageSize) ||
              !s.hasClass("lg-complete_") ||
              this.lGalleryOn ||
              setTimeout(function () {
                s.addClass("lg-complete");
              }, this.settings.backdropDuration),
            (this.lGalleryOn = !0),
            !0 === t &&
              (s.hasClass("lg-complete_")
                ? this.preload(e)
                : s
                    .find(".lg-object")
                    .first()
                    .on("load.lg error.lg", function () {
                      i.preload(e);
                    }));
        }),
        (e.prototype.loadContentOnFirstSlideLoad = function (e, t, i) {
          var n = this;
          setTimeout(function () {
            t.find(".lg-dummy-img").remove(),
              t.removeClass("lg-first-slide"),
              n.outer.removeClass("lg-first-slide-loading"),
              (n.isDummyImageRemoved = !0),
              n.preload(e);
          }, i + 300);
        }),
        (e.prototype.getItemsToBeInsertedToDom = function (e, t, i) {
          var n = this;
          void 0 === i && (i = 0);
          var s = [],
            r = Math.max(i, 3);
          r = Math.min(r, this.galleryItems.length);
          var o = "lg-item-" + this.lgId + "-" + t;
          if (this.galleryItems.length <= 3)
            return (
              this.galleryItems.forEach(function (e, t) {
                s.push("lg-item-" + n.lgId + "-" + t);
              }),
              s
            );
          if (e < (this.galleryItems.length - 1) / 2) {
            for (var a = e; a > e - r / 2 && a >= 0; a--)
              s.push("lg-item-" + this.lgId + "-" + a);
            var l = s.length;
            for (a = 0; a < r - l; a++)
              s.push("lg-item-" + this.lgId + "-" + (e + a + 1));
          } else {
            for (a = e; a <= this.galleryItems.length - 1 && a < e + r / 2; a++)
              s.push("lg-item-" + this.lgId + "-" + a);
            for (l = s.length, a = 0; a < r - l; a++)
              s.push("lg-item-" + this.lgId + "-" + (e - a - 1));
          }
          return (
            this.settings.loop &&
              (e === this.galleryItems.length - 1
                ? s.push("lg-item-" + this.lgId + "-0")
                : 0 === e &&
                  s.push(
                    "lg-item-" +
                      this.lgId +
                      "-" +
                      (this.galleryItems.length - 1)
                  )),
            -1 === s.indexOf(o) && s.push("lg-item-" + this.lgId + "-" + t),
            s
          );
        }),
        (e.prototype.organizeSlideItems = function (e, t) {
          var i = this,
            n = this.getItemsToBeInsertedToDom(
              e,
              t,
              this.settings.numberOfSlideItemsInDom
            );
          return (
            n.forEach(function (e) {
              -1 === i.currentItemsInDom.indexOf(e) &&
                i.$inner.append('<div id="' + e + '" class="lg-item"></div>');
            }),
            this.currentItemsInDom.forEach(function (e) {
              -1 === n.indexOf(e) && fi("#" + e).remove();
            }),
            n
          );
        }),
        (e.prototype.getPreviousSlideIndex = function () {
          var e = 0;
          try {
            var t = this.outer.find(".lg-current").first().attr("id");
            e = parseInt(t.split("-")[3]) || 0;
          } catch (t) {
            e = 0;
          }
          return e;
        }),
        (e.prototype.setDownloadValue = function (e) {
          if (this.settings.download) {
            var t = this.galleryItems[e];
            if (!1 === t.downloadUrl || "false" === t.downloadUrl)
              this.outer.addClass("lg-hide-download");
            else {
              var i = this.getElementById("lg-download");
              this.outer.removeClass("lg-hide-download"),
                i.attr("href", t.downloadUrl || t.src),
                t.download && i.attr("download", t.download);
            }
          }
        }),
        (e.prototype.makeSlideAnimation = function (e, t, i) {
          var n = this;
          this.lGalleryOn && i.addClass("lg-slide-progress"),
            setTimeout(
              function () {
                n.outer.addClass("lg-no-trans"),
                  n.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-next-slide"),
                  "prev" === e
                    ? (t.addClass("lg-prev-slide"), i.addClass("lg-next-slide"))
                    : (t.addClass("lg-next-slide"),
                      i.addClass("lg-prev-slide")),
                  setTimeout(function () {
                    n.outer.find(".lg-item").removeClass("lg-current"),
                      t.addClass("lg-current"),
                      n.outer.removeClass("lg-no-trans");
                  }, 50);
              },
              this.lGalleryOn ? this.settings.slideDelay : 0
            );
        }),
        (e.prototype.slide = function (e, t, i, n) {
          var s = this,
            r = this.getPreviousSlideIndex();
          if (
            ((this.currentItemsInDom = this.organizeSlideItems(e, r)),
            !this.lGalleryOn || r !== e)
          ) {
            var o = this.galleryItems.length;
            if (!this.lgBusy) {
              this.settings.counter && this.updateCurrentCounter(e);
              var a = this.getSlideItem(e),
                l = this.getSlideItem(r),
                d = this.galleryItems[e],
                c = d.__slideVideoInfo;
              if (
                (this.outer.attr("data-lg-slide-type", this.getSlideType(d)),
                this.setDownloadValue(e),
                c)
              ) {
                var u = this.mediaContainerPosition,
                  p = u.top,
                  h = u.bottom,
                  f = vi(
                    this.items[e],
                    this.outer,
                    p + h,
                    c && this.settings.videoMaxSize
                  );
                this.resizeVideoSlide(e, f);
              }
              if (
                (this.LGel.trigger(Bi, {
                  prevIndex: r,
                  index: e,
                  fromTouch: !!t,
                  fromThumb: !!i,
                }),
                (this.lgBusy = !0),
                clearTimeout(this.hideBarTimeout),
                this.arrowDisable(e),
                n || (e < r ? (n = "prev") : e > r && (n = "next")),
                t)
              ) {
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-prev-slide lg-current lg-next-slide");
                var g = void 0,
                  m = void 0;
                o > 2
                  ? ((g = e - 1),
                    (m = e + 1),
                    ((0 === e && r === o - 1) || (e === o - 1 && 0 === r)) &&
                      ((m = 0), (g = o - 1)))
                  : ((g = 0), (m = 1)),
                  "prev" === n
                    ? this.getSlideItem(m).addClass("lg-next-slide")
                    : this.getSlideItem(g).addClass("lg-prev-slide"),
                  a.addClass("lg-current");
              } else this.makeSlideAnimation(n, a, l);
              this.lGalleryOn
                ? setTimeout(function () {
                    s.loadContent(e, !0),
                      ".lg-item" !== s.settings.appendSubHtmlTo && s.addHtml(e);
                  }, this.settings.speed +
                    50 +
                    (t ? 0 : this.settings.slideDelay))
                : this.loadContent(e, !0),
                setTimeout(function () {
                  (s.lgBusy = !1),
                    l.removeClass("lg-slide-progress"),
                    s.LGel.trigger(Gi, {
                      prevIndex: r,
                      index: e,
                      fromTouch: t,
                      fromThumb: i,
                    });
                }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                  (t ? 0 : this.settings.slideDelay));
            }
            this.index = e;
          }
        }),
        (e.prototype.updateCurrentCounter = function (e) {
          this.getElementById("lg-counter-current").html(e + 1 + "");
        }),
        (e.prototype.updateCounterTotal = function () {
          this.getElementById("lg-counter-all").html(
            this.galleryItems.length + ""
          );
        }),
        (e.prototype.getSlideType = function (e) {
          return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
        }),
        (e.prototype.touchMove = function (e, t, i) {
          var n = t.pageX - e.pageX,
            s = t.pageY - e.pageY,
            r = !1;
          if (
            (this.swipeDirection
              ? (r = !0)
              : Math.abs(n) > 15
              ? ((this.swipeDirection = "horizontal"), (r = !0))
              : Math.abs(s) > 15 &&
                ((this.swipeDirection = "vertical"), (r = !0)),
            r)
          ) {
            var o = this.getSlideItem(this.index);
            if ("horizontal" === this.swipeDirection) {
              null == i || i.preventDefault(),
                this.outer.addClass("lg-dragging"),
                this.setTranslate(o, n, 0);
              var a = o.get().offsetWidth,
                l = (15 * a) / 100 - Math.abs((10 * n) / 100);
              this.setTranslate(
                this.outer.find(".lg-prev-slide").first(),
                -a + n - l,
                0
              ),
                this.setTranslate(
                  this.outer.find(".lg-next-slide").first(),
                  a + n + l,
                  0
                );
            } else if (
              "vertical" === this.swipeDirection &&
              this.settings.swipeToClose
            ) {
              null == i || i.preventDefault(),
                this.$container.addClass("lg-dragging-vertical");
              var d = 1 - Math.abs(s) / window.innerHeight;
              this.$backdrop.css("opacity", d);
              var c = 1 - Math.abs(s) / (2 * window.innerWidth);
              this.setTranslate(o, 0, s, c, c),
                Math.abs(s) > 100 &&
                  this.outer
                    .addClass("lg-hide-items")
                    .removeClass("lg-components-open");
            }
          }
        }),
        (e.prototype.touchEnd = function (e, t, i) {
          var n,
            s = this;
          "lg-slide" !== this.settings.mode && this.outer.addClass("lg-slide"),
            setTimeout(function () {
              s.$container.removeClass("lg-dragging-vertical"),
                s.outer
                  .removeClass("lg-dragging lg-hide-items")
                  .addClass("lg-components-open");
              var r = !0;
              if ("horizontal" === s.swipeDirection) {
                n = e.pageX - t.pageX;
                var o = Math.abs(e.pageX - t.pageX);
                n < 0 && o > s.settings.swipeThreshold
                  ? (s.goToNextSlide(!0), (r = !1))
                  : n > 0 &&
                    o > s.settings.swipeThreshold &&
                    (s.goToPrevSlide(!0), (r = !1));
              } else if ("vertical" === s.swipeDirection) {
                if (
                  ((n = Math.abs(e.pageY - t.pageY)),
                  s.settings.closable && s.settings.swipeToClose && n > 100)
                )
                  return void s.closeGallery();
                s.$backdrop.css("opacity", 1);
              }
              if (
                (s.outer.find(".lg-item").removeAttr("style"),
                r && Math.abs(e.pageX - t.pageX) < 5)
              ) {
                var a = fi(i.target);
                s.isPosterElement(a) && s.LGel.trigger(Ni);
              }
              s.swipeDirection = void 0;
            }),
            setTimeout(function () {
              s.outer.hasClass("lg-dragging") ||
                "lg-slide" === s.settings.mode ||
                s.outer.removeClass("lg-slide");
            }, this.settings.speed + 100);
        }),
        (e.prototype.enableSwipe = function () {
          var e = this,
            t = {},
            i = {},
            n = !1,
            s = !1;
          this.settings.enableSwipe &&
            (this.$inner.on("touchstart.lg", function (i) {
              e.dragOrSwipeEnabled = !0;
              var n = e.getSlideItem(e.index);
              (!fi(i.target).hasClass("lg-item") &&
                !n.get().contains(i.target)) ||
                e.outer.hasClass("lg-zoomed") ||
                e.lgBusy ||
                1 !== i.targetTouches.length ||
                ((s = !0),
                (e.touchAction = "swipe"),
                e.manageSwipeClass(),
                (t = {
                  pageX: i.targetTouches[0].pageX,
                  pageY: i.targetTouches[0].pageY,
                }));
            }),
            this.$inner.on("touchmove.lg", function (r) {
              s &&
                "swipe" === e.touchAction &&
                1 === r.targetTouches.length &&
                ((i = {
                  pageX: r.targetTouches[0].pageX,
                  pageY: r.targetTouches[0].pageY,
                }),
                e.touchMove(t, i, r),
                (n = !0));
            }),
            this.$inner.on("touchend.lg", function (r) {
              if ("swipe" === e.touchAction) {
                if (n) (n = !1), e.touchEnd(i, t, r);
                else if (s) {
                  var o = fi(r.target);
                  e.isPosterElement(o) && e.LGel.trigger(Ni);
                }
                (e.touchAction = void 0), (s = !1);
              }
            }));
        }),
        (e.prototype.enableDrag = function () {
          var e = this,
            t = {},
            i = {},
            n = !1,
            s = !1;
          this.settings.enableDrag &&
            (this.outer.on("mousedown.lg", function (i) {
              e.dragOrSwipeEnabled = !0;
              var s = e.getSlideItem(e.index);
              (fi(i.target).hasClass("lg-item") ||
                s.get().contains(i.target)) &&
                (e.outer.hasClass("lg-zoomed") ||
                  e.lgBusy ||
                  (i.preventDefault(),
                  e.lgBusy ||
                    (e.manageSwipeClass(),
                    (t = { pageX: i.pageX, pageY: i.pageY }),
                    (n = !0),
                    (e.outer.get().scrollLeft += 1),
                    (e.outer.get().scrollLeft -= 1),
                    e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                    e.LGel.trigger(ji))));
            }),
            fi(window).on("mousemove.lg.global" + this.lgId, function (r) {
              n &&
                e.lgOpened &&
                ((s = !0),
                (i = { pageX: r.pageX, pageY: r.pageY }),
                e.touchMove(t, i),
                e.LGel.trigger(Hi));
            }),
            fi(window).on("mouseup.lg.global" + this.lgId, function (r) {
              if (e.lgOpened) {
                var o = fi(r.target);
                s
                  ? ((s = !1), e.touchEnd(i, t, r), e.LGel.trigger(Vi))
                  : e.isPosterElement(o) && e.LGel.trigger(Ni),
                  n &&
                    ((n = !1),
                    e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
              }
            }));
        }),
        (e.prototype.triggerPosterClick = function () {
          var e = this;
          this.$inner.on("click.lg", function (t) {
            !e.dragOrSwipeEnabled &&
              e.isPosterElement(fi(t.target)) &&
              e.LGel.trigger(Ni);
          });
        }),
        (e.prototype.manageSwipeClass = function () {
          var e = this.index + 1,
            t = this.index - 1;
          this.settings.loop &&
            this.galleryItems.length > 2 &&
            (0 === this.index
              ? (t = this.galleryItems.length - 1)
              : this.index === this.galleryItems.length - 1 && (e = 0)),
            this.outer
              .find(".lg-item")
              .removeClass("lg-next-slide lg-prev-slide"),
            t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
            this.getSlideItem(e).addClass("lg-next-slide");
        }),
        (e.prototype.goToNextSlide = function (e) {
          var t = this,
            i = this.settings.loop;
          e && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index + 1 < this.galleryItems.length
                ? (this.index++,
                  this.LGel.trigger(Fi, { index: this.index }),
                  this.slide(this.index, !!e, !1, "next"))
                : i
                ? ((this.index = 0),
                  this.LGel.trigger(Fi, { index: this.index }),
                  this.slide(this.index, !!e, !1, "next"))
                : this.settings.slideEndAnimation &&
                  !e &&
                  (this.outer.addClass("lg-right-end"),
                  setTimeout(function () {
                    t.outer.removeClass("lg-right-end");
                  }, 400)));
        }),
        (e.prototype.goToPrevSlide = function (e) {
          var t = this,
            i = this.settings.loop;
          e && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index > 0
                ? (this.index--,
                  this.LGel.trigger(Wi, { index: this.index, fromTouch: e }),
                  this.slide(this.index, !!e, !1, "prev"))
                : i
                ? ((this.index = this.galleryItems.length - 1),
                  this.LGel.trigger(Wi, { index: this.index, fromTouch: e }),
                  this.slide(this.index, !!e, !1, "prev"))
                : this.settings.slideEndAnimation &&
                  !e &&
                  (this.outer.addClass("lg-left-end"),
                  setTimeout(function () {
                    t.outer.removeClass("lg-left-end");
                  }, 400)));
        }),
        (e.prototype.keyPress = function () {
          var e = this;
          fi(window).on("keydown.lg.global" + this.lgId, function (t) {
            e.lgOpened &&
              !0 === e.settings.escKey &&
              27 === t.keyCode &&
              (t.preventDefault(),
              e.settings.allowMediaOverlap &&
              e.outer.hasClass("lg-can-toggle") &&
              e.outer.hasClass("lg-components-open")
                ? e.outer.removeClass("lg-components-open")
                : e.closeGallery()),
              e.lgOpened &&
                e.galleryItems.length > 1 &&
                (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()),
                39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()));
          });
        }),
        (e.prototype.arrow = function () {
          var e = this;
          this.getElementById("lg-prev").on("click.lg", function () {
            e.goToPrevSlide();
          }),
            this.getElementById("lg-next").on("click.lg", function () {
              e.goToNextSlide();
            });
        }),
        (e.prototype.arrowDisable = function (e) {
          if (!this.settings.loop && this.settings.hideControlOnEnd) {
            var t = this.getElementById("lg-prev"),
              i = this.getElementById("lg-next");
            e + 1 === this.galleryItems.length
              ? i.attr("disabled", "disabled").addClass("disabled")
              : i.removeAttr("disabled").removeClass("disabled"),
              0 === e
                ? t.attr("disabled", "disabled").addClass("disabled")
                : t.removeAttr("disabled").removeClass("disabled");
          }
        }),
        (e.prototype.setTranslate = function (e, t, i, n, s) {
          void 0 === n && (n = 1),
            void 0 === s && (s = 1),
            e.css(
              "transform",
              "translate3d(" +
                t +
                "px, " +
                i +
                "px, 0px) scale3d(" +
                n +
                ", " +
                s +
                ", 1)"
            );
        }),
        (e.prototype.mousewheel = function () {
          var e = this,
            t = 0;
          this.outer.on("wheel.lg", function (i) {
            if (i.deltaY && !(e.galleryItems.length < 2)) {
              i.preventDefault();
              var n = new Date().getTime();
              n - t < 1e3 ||
                ((t = n),
                i.deltaY > 0
                  ? e.goToNextSlide()
                  : i.deltaY < 0 && e.goToPrevSlide());
            }
          });
        }),
        (e.prototype.isSlideElement = function (e) {
          return (
            e.hasClass("lg-outer") ||
            e.hasClass("lg-item") ||
            e.hasClass("lg-img-wrap")
          );
        }),
        (e.prototype.isPosterElement = function (e) {
          var t = this.getSlideItem(this.index)
            .find(".lg-video-play-button")
            .get();
          return (
            e.hasClass("lg-video-poster") ||
            e.hasClass("lg-video-play-button") ||
            (t && t.contains(e.get()))
          );
        }),
        (e.prototype.toggleMaximize = function () {
          var e = this;
          this.getElementById("lg-maximize").on("click.lg", function () {
            e.$container.toggleClass("lg-inline"), e.refreshOnResize();
          });
        }),
        (e.prototype.invalidateItems = function () {
          for (var e = 0; e < this.items.length; e++) {
            var t = fi(this.items[e]);
            t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
          }
        }),
        (e.prototype.manageCloseGallery = function () {
          var e = this;
          if (this.settings.closable) {
            var t = !1;
            this.getElementById("lg-close").on("click.lg", function () {
              e.closeGallery();
            }),
              this.settings.closeOnTap &&
                (this.outer.on("mousedown.lg", function (i) {
                  var n = fi(i.target);
                  t = !!e.isSlideElement(n);
                }),
                this.outer.on("mousemove.lg", function () {
                  t = !1;
                }),
                this.outer.on("mouseup.lg", function (i) {
                  var n = fi(i.target);
                  e.isSlideElement(n) &&
                    t &&
                    (e.outer.hasClass("lg-dragging") || e.closeGallery());
                }));
          }
        }),
        (e.prototype.closeGallery = function (e) {
          var t = this;
          if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
          this.LGel.trigger(Ri), fi(window).scrollTop(this.prevScrollTop);
          var i,
            n = this.items[this.index];
          if (this.zoomFromOrigin && n) {
            var s = this.mediaContainerPosition,
              r = s.top,
              o = s.bottom,
              a = this.galleryItems[this.index],
              l = a.__slideVideoInfo,
              d = a.poster,
              c = vi(
                n,
                this.outer,
                r + o,
                l && d && this.settings.videoMaxSize
              );
            i = yi(n, this.outer, r, o, c);
          }
          this.zoomFromOrigin && i
            ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
              this.getSlideItem(this.index)
                .addClass("lg-start-end-progress")
                .css(
                  "transition-duration",
                  this.settings.startAnimationDuration + "ms"
                )
                .css("transform", i))
            : (this.outer.addClass("lg-hide-items"),
              this.outer.removeClass("lg-zoom-from-image")),
            this.destroyModules(),
            (this.lGalleryOn = !1),
            (this.isDummyImageRemoved = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            clearTimeout(this.hideBarTimeout),
            (this.hideBarTimeout = !1),
            fi("html").removeClass("lg-on"),
            this.outer.removeClass("lg-visible lg-components-open"),
            this.$backdrop.removeClass("in").css("opacity", 0);
          var u =
            this.zoomFromOrigin && i
              ? Math.max(
                  this.settings.startAnimationDuration,
                  this.settings.backdropDuration
                )
              : this.settings.backdropDuration;
          return (
            this.$container.removeClass("lg-show-in"),
            setTimeout(function () {
              t.zoomFromOrigin &&
                i &&
                t.outer.removeClass("lg-zoom-from-image"),
                t.$container.removeClass("lg-show"),
                t.$backdrop
                  .removeAttr("style")
                  .css(
                    "transition-duration",
                    t.settings.backdropDuration + "ms"
                  ),
                t.outer.removeClass("lg-closing " + t.settings.startClass),
                t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
                t.$inner.empty(),
                t.lgOpened && t.LGel.trigger(qi, { instance: t }),
                t.outer.get() && t.outer.get().blur(),
                (t.lgOpened = !1);
            }, u + 100),
            u + 100
          );
        }),
        (e.prototype.initModules = function () {
          this.plugins.forEach(function (e) {
            try {
              e.init();
            } catch (e) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly initiated"
              );
            }
          });
        }),
        (e.prototype.destroyModules = function (e) {
          this.plugins.forEach(function (t) {
            try {
              e ? t.destroy() : t.closeGallery && t.closeGallery();
            } catch (e) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly destroyed"
              );
            }
          });
        }),
        (e.prototype.refresh = function (e) {
          this.settings.dynamic || this.invalidateItems(),
            (this.galleryItems = e || this.getItems()),
            this.updateControls(),
            this.openGalleryOnItemClick(),
            this.LGel.trigger(Pi);
        }),
        (e.prototype.updateControls = function () {
          this.addSlideVideoInfo(this.galleryItems),
            this.updateCounterTotal(),
            this.manageSingleSlideClassName();
        }),
        (e.prototype.destroy = function () {
          var e = this,
            t = this.closeGallery(!0);
          return (
            setTimeout(function () {
              e.destroyModules(!0),
                e.settings.dynamic || e.invalidateItems(),
                fi(window).off(".lg.global" + e.lgId),
                e.LGel.off(".lg"),
                e.$container.remove();
            }, t),
            t
          );
        }),
        e
      );
    })();
  const Ui = function (e, t) {
      return new Yi(e, t);
    },
    Ki = document.querySelectorAll("[data-gallery]");
  Ki.length &&
    Ki.forEach((e) => {
      Ui(e, { licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E", speed: 500 });
    }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          t &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? i(e) : n(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            r.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && r.validateInput(t));
        });
    })(),
    document.addEventListener("click", function (e) {
      let t = e.target;
      if (t.closest('[class*="__viewpass"]')) {
        let e = t.classList.contains("active") ? "password" : "text";
        t.parentElement.querySelector("input").setAttribute("type", e),
          t.classList.toggle("active");
      }
    });
})();
