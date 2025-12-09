import { jsx as p, jsxs as U, Fragment as we } from "react/jsx-runtime";
import ei, { useState as K, useEffect as B, useRef as V, createContext as Xt, useContext as pe, useMemo as T, useCallback as P, forwardRef as vt, useImperativeHandle as bt, Fragment as Os } from "react";
import { createPortal as ti } from "react-dom";
function ze(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function Xn(t, e = "data-id") {
  const n = ze(t, e);
  return n ? n.getAttribute(e) : null;
}
function qt(t, e = "data-id") {
  const n = ze(t, e);
  return n ? Ot(n.getAttribute(e)) : null;
}
function Ot(t) {
  if (typeof t == "string") {
    const e = t * 1;
    if (!isNaN(e)) return e;
  }
  return t;
}
function ni() {
  return {
    detect: () => !0,
    addEvent: function(t, e, n) {
      return t.addEventListener(e, n), () => t.removeEventListener(e, n);
    },
    addGlobalEvent: function(t, e) {
      return document.addEventListener(t, e), () => document.removeEventListener(t, e);
    },
    getTopNode: function() {
      return window.document.body;
    }
  };
}
var Ye = ni();
function fr(t) {
  Object.assign(Ye, t);
}
function Ir(t, e, n) {
  function r(s) {
    const o = ze(s);
    if (!o) return;
    const i = Ot(o.dataset.id);
    if (typeof e == "function") return e(i, s);
    let a, l = s.target;
    for (; l != o; ) {
      if (a = l.dataset ? l.dataset.action : null, a && e[a]) {
        e[a](i, s);
        return;
      }
      l = l.parentNode;
    }
    e[n] && e[n](i, s);
  }
  Ye.addEvent(t, n, r);
}
function Ls(t, e) {
  Ir(t, e, "click"), e.dblclick && Ir(t, e.dblclick, "dblclick");
}
function ri(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n] === e) {
      t.splice(n, 1);
      break;
    }
}
var Is = /* @__PURE__ */ new Date(), bn = !1, cn = [], pt = [], Hr = (t) => {
  if (bn) {
    bn = !1;
    return;
  }
  for (let e = pt.length - 1; e >= 0; e--) {
    const { node: n, date: r, props: s } = pt[e];
    if (!(r > Is) && !n.contains(t.target) && n !== t.target && (s.callback && s.callback(t), s.modal || t.defaultPrevented))
      break;
  }
}, si = (t) => {
  Is = /* @__PURE__ */ new Date(), bn = !0;
  for (let e = pt.length - 1; e >= 0; e--) {
    const { node: n } = pt[e];
    if (!n.contains(t.target) && n !== t.target) {
      bn = !1;
      break;
    }
  }
};
function Jt(t, e) {
  cn.length || (cn = [
    Ye.addGlobalEvent("click", Hr, t),
    Ye.addGlobalEvent("contextmenu", Hr, t),
    Ye.addGlobalEvent("mousedown", si, t)
  ]), typeof e != "object" && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return pt.push(n), {
    destroy() {
      ri(pt, n), pt.length || (cn.forEach((r) => r()), cn = []);
    }
  };
}
var oi = (t) => t.indexOf("bottom") !== -1, ii = (t) => t.indexOf("left") !== -1, Wr = (t) => t.indexOf("right") !== -1, ai = (t) => t.indexOf("top") !== -1, Pr = (t) => t.indexOf("fit") !== -1, Yr = (t) => t.indexOf("overlap") !== -1, li = (t) => t.indexOf("center") !== -1;
function ci(t, e) {
  let n = 0;
  const r = Ye.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (n = parseInt(getComputedStyle(t).zIndex) || 0), t = t.parentNode, t === e) break;
  }
  return n;
}
var We, st, Yt, Je;
function ui(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  We = r, st = s, Yt = "auto";
  let o = 0, i = 0;
  const a = di(t), l = Yr(n) ? Ye.getTopNode(t) : a;
  if (!a) return null;
  const c = a.getBoundingClientRect(), u = t.getBoundingClientRect(), d = l.getBoundingClientRect();
  if (e) {
    const g = ci(e, a);
    o = Math.max(g + 1, 20);
  }
  if (e) {
    if (Je = e.getBoundingClientRect(), Pr(n) && (Yt = Je.width + "px"), n !== "point")
      if (li(n))
        Pr(n) ? We = 0 : (We = d.width / 2, i = 1), st = (d.height - u.height) / 2;
      else {
        const g = Yr(n) ? 0 : 1;
        We = Wr(n) ? Je.right + g : Je.left - g, st = oi(n) ? Je.bottom + 1 : Je.top;
      }
  } else Je = { left: r, right: r, top: s, bottom: s };
  ii(n) && (We = Je.left, i = 2), ai(n) && (st = Je.top - u.height);
  const h = st + u.height - d.bottom;
  return h > 0 && (st -= h), We + u.width - d.right > 0 && (Wr(n) ? i = 2 : We = d.right - u.width), i && (We = Math.round(We - u.width * i / 2)), We < 0 && (n !== "left" ? We = 0 : We = Je.right), We += l.scrollLeft - c.left, st += l.scrollTop - c.top, Yt = Yt || "auto", { x: We, y: st, z: o, width: Yt };
}
function di(t) {
  const e = Ye.getTopNode(t);
  for (t && (t = t.parentElement); t; ) {
    const n = getComputedStyle(t).position;
    if (t === e || n === "relative" || n === "absolute" || n === "fixed")
      return t;
    t = t.parentNode;
  }
  return null;
}
var zr = (/* @__PURE__ */ new Date()).valueOf();
function et() {
  return zr += 1, zr;
}
function Pe(t) {
  return t < 10 ? "0" + t : t.toString();
}
function hi(t) {
  const e = Pe(t);
  return e.length == 2 ? "0" + e : e;
}
function Hs(t) {
  const e = Math.floor(t / 11) * 11;
  return {
    start: e,
    end: e + 11
  };
}
function fi(t) {
  let e = t.getDay();
  e === 0 && (e = 7);
  const n = new Date(t.valueOf());
  n.setDate(t.getDate() + (4 - e));
  const r = n.getFullYear(), s = Math.floor(
    (n.getTime() - new Date(r, 0, 1).getTime()) / 864e5
  );
  return 1 + Math.floor(s / 7);
}
var Fr = ["", ""];
function mi(t, e, n) {
  switch (t) {
    case "%d":
      return Pe(e.getDate());
    case "%m":
      return Pe(e.getMonth() + 1);
    case "%j":
      return e.getDate();
    case "%n":
      return e.getMonth() + 1;
    case "%y":
      return Pe(e.getFullYear() % 100);
    case "%Y":
      return e.getFullYear();
    case "%D":
      return n.dayShort[e.getDay()];
    case "%l":
      return n.dayFull[e.getDay()];
    case "%M":
      return n.monthShort[e.getMonth()];
    case "%F":
      return n.monthFull[e.getMonth()];
    case "%h":
      return Pe((e.getHours() + 11) % 12 + 1);
    case "%g":
      return (e.getHours() + 11) % 12 + 1;
    case "%G":
      return e.getHours();
    case "%H":
      return Pe(e.getHours());
    case "%i":
      return Pe(e.getMinutes());
    case "%a":
      return ((e.getHours() > 11 ? n.pm : n.am) || Fr)[0];
    case "%A":
      return ((e.getHours() > 11 ? n.pm : n.am) || Fr)[1];
    case "%s":
      return Pe(e.getSeconds());
    case "%S":
      return hi(e.getMilliseconds());
    case "%W":
      return Pe(fi(e));
    case "%c": {
      let r = e.getFullYear() + "";
      return r += "-" + Pe(e.getMonth() + 1), r += "-" + Pe(e.getDate()), r += "T", r += Pe(e.getHours()), r += ":" + Pe(e.getMinutes()), r += ":" + Pe(e.getSeconds()), r;
    }
    default:
      return t;
  }
}
var pi = /%[a-zA-Z]/g;
function Tt(t, e) {
  return typeof t == "function" ? t : function(n) {
    return n ? (n.getMonth || (n = new Date(n)), t.replace(
      pi,
      (r) => mi(r, n, e)
    )) : "";
  };
}
function jr(t) {
  return t && typeof t == "object" && !Array.isArray(t);
}
function Jn(t, e) {
  for (const n in e) {
    const r = e[n];
    jr(t[n]) && jr(r) ? t[n] = Jn(
      { ...t[n] },
      e[n]
    ) : t[n] = e[n];
  }
  return t;
}
function Lt(t) {
  return {
    getGroup(e) {
      const n = t[e];
      return (r) => n && n[r] || r;
    },
    getRaw() {
      return t;
    },
    extend(e, n) {
      if (!e) return this;
      let r;
      return n ? r = Jn({ ...e }, t) : r = Jn({ ...t }, e), Lt(r);
    }
  };
}
function Me(t) {
  const [e, n] = K(t), r = V(t);
  return B(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function gi(t, e, n) {
  const [r, s] = K(() => e);
  return t || console.warn(`Writable ${n} is not defined`), B(() => t ? t.subscribe((i) => {
    s(() => i);
  }) : void 0, [t]), r;
}
function re(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return gi(r[e], n[e], e);
}
function mt(t, e) {
  const [n, r] = K(() => null);
  return B(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((a) => r(() => a)) : void 0;
  }, [t, e]), n;
}
function wi(t, e) {
  const n = V(e);
  n.current = e;
  const [r, s] = K(1);
  return B(() => t.subscribe((i) => {
    n.current = i, s((a) => a + 1);
  }), [t]), [n.current, r];
}
function kn(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return wi(r[e], n[e]);
}
function mr(t, e) {
  return typeof t == "function" ? typeof e == "object" ? t(e) : t() : t;
}
function Ws(t) {
  const e = {};
  return t.split(";").forEach((n) => {
    const [r, s] = n.split(":");
    if (s) {
      let o = r.trim();
      o.indexOf("-") && (o = o.replace(/-([a-z])/g, (i, a) => a.toUpperCase())), e[o] = s.trim();
    }
  }), e;
}
function Ps(t) {
  let e = t, n = [];
  return {
    subscribe: (a) => {
      n.push(a), a(e);
    },
    unsubscribe: (a) => {
      n = n.filter((l) => l !== a);
    },
    set: (a) => {
      e = a, n.forEach((l) => l(e));
    },
    update: (a) => {
      e = a(e), n.forEach((l) => l(e));
    }
  };
}
function Vr(t, e, n) {
  function r(s) {
    const o = ze(s);
    if (!o) return;
    const i = Ot(o.dataset.id);
    if (typeof e == "function") return e(i, s);
    let a, l = s.target;
    for (; l != o; ) {
      if (a = l.dataset ? l.dataset.action : null, a && e[a]) {
        e[a](i, s);
        return;
      }
      l = l.parentNode;
    }
    e[n] && e[n](i, s);
  }
  return Ye.addEvent(t, n, r);
}
function xi(t, e) {
  const n = [Vr(t, e, "click")];
  return e.dblclick && n.push(Vr(t, e.dblclick, "dblclick")), () => {
    n.forEach((r) => r());
  };
}
const yi = "en-US", vi = {
  monthFull: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  dayFull: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  hours: "Hours",
  minutes: "Minutes",
  done: "Done",
  clear: "Clear",
  today: "Today",
  am: ["am", "AM"],
  pm: ["pm", "PM"],
  weekStart: 0,
  clockFormat: 24
}, bi = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, ki = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, Tn = {
  core: bi,
  calendar: vi,
  formats: ki,
  lang: yi
};
function $i({
  value: t = "",
  id: e = et(),
  placeholder: n = "",
  title: r = "",
  disabled: s = !1,
  error: o = !1,
  readonly: i = !1,
  onChange: a
}) {
  const [l, c] = Me(t), u = P(
    (f) => {
      const g = f.target.value;
      c(g), a && a({ value: g, input: !0 });
    },
    [a]
  ), d = P(
    (f) => {
      const g = f.target.value;
      c(g), a && a({ value: g });
    },
    [a]
  ), h = V(null);
  return B(() => {
    const f = d, g = h.current;
    return g.addEventListener("change", f), () => {
      g && g.removeEventListener("change", f);
    };
  }, [d]), /* @__PURE__ */ p(
    "textarea",
    {
      className: `wx-3yFVAC wx-textarea ${o ? "wx-error" : ""}`,
      id: e,
      disabled: s,
      placeholder: n,
      readOnly: i,
      title: r,
      value: l,
      onInput: u,
      ref: h
    }
  );
}
function gt({
  type: t = "",
  css: e = "",
  icon: n = "",
  disabled: r = !1,
  title: s = "",
  text: o = "",
  children: i,
  onClick: a
}) {
  const l = T(() => {
    let u = t ? t.split(" ").filter((d) => d !== "").map((d) => "wx-" + d).join(" ") : "";
    return e + (e ? " " : "") + u;
  }, [t, e]), c = (u) => {
    a && a(u);
  };
  return /* @__PURE__ */ U(
    "button",
    {
      title: s,
      className: `wx-2ZWgb4 wx-button ${l} ${n && !i ? "wx-icon" : ""}`,
      disabled: r,
      onClick: c,
      children: [
        n && /* @__PURE__ */ p("i", { className: "wx-2ZWgb4 " + n }),
        i || o || " "
      ]
    }
  );
}
function Si({
  id: t = et(),
  label: e = "",
  inputValue: n = "",
  value: r = !1,
  onChange: s,
  disabled: o = !1
}) {
  const [i, a] = Me(r);
  return /* @__PURE__ */ U("div", { className: "wx-2IvefP wx-checkbox", children: [
    /* @__PURE__ */ p(
      "input",
      {
        type: "checkbox",
        id: t,
        disabled: o,
        className: "wx-2IvefP wx-check",
        checked: i,
        value: n,
        onChange: ({ target: l }) => {
          const c = l.checked;
          a(c), s && s({ value: c, inputValue: n });
        }
      }
    ),
    /* @__PURE__ */ U("label", { htmlFor: t, className: "wx-2IvefP wx-label", children: [
      /* @__PURE__ */ p("span", { className: "wx-2IvefP wx-before" }),
      e && /* @__PURE__ */ p("span", { className: "wx-2IvefP wx-after", children: e })
    ] })
  ] });
}
function It({
  position: t = "bottom",
  align: e = "start",
  autoFit: n = !0,
  onCancel: r,
  width: s = "100%",
  children: o
}) {
  const i = V(null), [a, l] = K(t), [c, u] = K(e);
  return B(() => {
    l(t);
  }, [t]), B(() => {
    u(e);
  }, [e]), B(() => {
    if (n) {
      const d = i.current;
      if (d) {
        const h = d.getBoundingClientRect(), f = Ye.getTopNode(d).getBoundingClientRect();
        h.right >= f.right && u("end"), h.bottom >= f.bottom && l("top");
      }
    }
  }, [n, c, a]), B(() => {
    const d = (h) => {
      r && r(h);
    };
    if (i.current)
      return Jt(i.current, d).destroy;
  }, [r]), /* @__PURE__ */ p(
    "div",
    {
      ref: i,
      className: `wx-32GZ52 wx-dropdown wx-${a}-${c}`,
      style: { width: s },
      children: o
    }
  );
}
const Zt = Xt("willow"), _i = Xt({}), Ge = Xt(null), Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  helpers: _i,
  i18n: Ge,
  theme: Zt
}, Symbol.toStringTag, { value: "Module" }));
function en() {
  return Lt(Tn);
}
function Ci() {
  let t = null, e = !1, n, r, s, o;
  const i = (u, d, h, f) => {
    n = u, r = d, s = h, o = f;
  }, a = (u) => {
    t = u, e = t !== null, s(t);
  }, l = (u, d) => {
    if (u !== null && n) {
      const h = n.querySelectorAll(".wx-list > .wx-item")[u];
      h && (h.scrollIntoView({ block: "nearest" }), d && d.preventDefault());
    }
  }, c = (u, d) => {
    const h = u === null ? null : Math.max(0, Math.min(t + u, r.length - 1));
    h !== t && (a(h), n ? l(h, d) : requestAnimationFrame(() => l(h, d)));
  };
  return { move: (u) => {
    const d = qt(u), h = r.findIndex((f) => f.id == d);
    h !== t && a(h);
  }, keydown: (u, d) => {
    switch (u.code) {
      case "Enter":
        e ? o() : a(0);
        break;
      case "Space":
        e || a(0);
        break;
      case "Escape":
        s(t = null);
        break;
      case "Tab":
        s(t = null);
        break;
      case "ArrowDown":
        c(e ? 1 : d || 0, u);
        break;
      case "ArrowUp":
        c(e ? -1 : d || 0, u);
        break;
    }
  }, init: i, navigate: c };
}
function En({
  items: t = [],
  children: e,
  onSelect: n,
  onReady: r
}) {
  const s = V(), o = V(Ci()), [i, a] = K(null), l = V(i), c = (pe(Ge) || en()).getGroup("core"), u = (d) => {
    d && d.stopPropagation(), n && n({ id: t[l.current]?.id });
  };
  return B(() => {
    o.current.init(
      s.current,
      t,
      (d) => {
        a(d), l.current = d;
      },
      u
    );
  }, [t, !!s.current]), B(() => {
    r && r(o.current);
  }, []), i === null ? null : /* @__PURE__ */ p(It, { onCancel: () => o.current.navigate(null), children: /* @__PURE__ */ p(
    "div",
    {
      className: "wx-233fr7 wx-list",
      ref: s,
      onClick: u,
      onMouseMove: o.current.move,
      children: t.length ? t.map((d, h) => /* @__PURE__ */ p(
        "div",
        {
          className: `wx-233fr7 wx-item ${h === i ? "wx-focus" : ""}`,
          "data-id": d.id,
          children: e ? mr(e, { option: d }) : d.label
        },
        d.id
      )) : /* @__PURE__ */ p("div", { className: "wx-233fr7 wx-no-data", children: c("No data") })
    }
  ) });
}
function Mi({
  value: t = "",
  onValueChange: e,
  id: n = et(),
  options: r = [],
  textOptions: s = null,
  textField: o = "label",
  placeholder: i = "",
  title: a = "",
  disabled: l = !1,
  error: c = !1,
  clear: u = !1,
  children: d,
  onChange: h
}) {
  const f = V(null), g = V(null), [m, x] = Me(t), [w, y] = K(!1), [$, v] = K(""), C = V(null), [D, E] = K(!1), I = T(() => {
    if (w) return $;
    if (m || m === 0) {
      const j = (s || r).find((H) => H.id === m);
      if (j) return j[o];
    }
    return "";
  }, [w, $, m, s, r, o]), _ = T(() => !I || !w ? r : r.filter(
    (j) => j[o].toLowerCase().includes(I.toLowerCase())
  ), [I, w, r, o]), k = P(
    () => _.findIndex((j) => j.id === m),
    [_, m]
  ), b = P((j) => {
    f.current = j.navigate, g.current = j.keydown;
  }, []), L = P(
    (j, H) => {
      if (j || j === 0) {
        let O = r.find((q) => q.id === j);
        if (y(!1), H && f.current(null), O && m !== O.id) {
          const q = O.id;
          x(q), e && e(q), h && h({ value: q });
        }
      }
      !D && H && C.current.focus();
    },
    [r, m, D, e, h]
  ), W = P(
    ({ id: j }) => {
      L(j, !0);
    },
    [L]
  ), S = P(
    (j) => {
      j && j.stopPropagation(), x(""), y(!1), e && e(""), h && h({ value: "" });
    },
    [e, h]
  ), M = P(
    (j) => {
      if (!r.length) return;
      if (j === "" && u) {
        S();
        return;
      }
      let H = r.find((q) => q[o] === j);
      H || (H = r.find(
        (q) => q[o].toLowerCase().includes(j.toLowerCase())
      ));
      const O = H ? H.id : m || r[0].id;
      L(O, !1);
    },
    [r, o, u, m, L, S]
  ), R = P(() => {
    v(C.current.value), y(!0), _.length ? f.current(0) : f.current(null);
  }, [_.length, f]), N = P(() => {
    E(!0);
  }, []), A = P(() => {
    E(!1), setTimeout(() => {
      D || M(I);
    }, 200);
  }, [D, M, I]);
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => f.current(k()),
      onKeyDown: (j) => g.current(j, k()),
      title: a,
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            className: "wx-1j11Jk wx-input " + (c ? "wx-error" : ""),
            id: n,
            ref: C,
            value: I,
            disabled: l,
            placeholder: i,
            onFocus: N,
            onBlur: A,
            onInput: R
          }
        ),
        u && !l && m ? /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: S }) : /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !l && /* @__PURE__ */ p(En, { items: _, onReady: b, onSelect: W, children: ({ option: j }) => /* @__PURE__ */ p(we, { children: d ? d({ option: j }) : j[o] }) })
      ]
    }
  );
}
function Rn({
  value: t = "",
  id: e = et(),
  readonly: n = !1,
  focus: r = !1,
  select: s = !1,
  type: o = "text",
  placeholder: i = "",
  disabled: a = !1,
  error: l = !1,
  inputStyle: c = {},
  title: u = "",
  css: d = "",
  icon: h = "",
  clear: f = !1,
  onChange: g
}) {
  const [m, x] = Me(t), w = V(null), y = T(
    () => h && d.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + d : d,
    [h, d]
  ), $ = T(
    () => h && d.indexOf("wx-icon-left") !== -1,
    [h, d]
  );
  B(() => {
    const I = setTimeout(() => {
      r && w.current && w.current.focus(), s && w.current && w.current.select();
    }, 1);
    return () => clearTimeout(I);
  }, [r, s]);
  const v = P(
    (I) => {
      const _ = I.target.value;
      x(_), g && g({ value: _, input: !0 });
    },
    [g]
  ), C = P(
    (I) => g && g({ value: I.target.value }),
    [g]
  );
  function D(I) {
    I.stopPropagation(), x(""), g && g({ value: "" });
  }
  let E = o;
  return o !== "password" && o !== "number" && (E = "text"), B(() => {
    const I = C, _ = w.current;
    return _.addEventListener("change", I), () => {
      _ && _.removeEventListener("change", I);
    };
  }, [C]), /* @__PURE__ */ U(
    "div",
    {
      className: `wx-hQ64J4 wx-text ${y} ${l ? "wx-error" : ""} ${a ? "wx-disabled" : ""} ${f ? "wx-clear" : ""}`,
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            className: "wx-hQ64J4 wx-input",
            ref: w,
            id: e,
            readOnly: n,
            disabled: a,
            placeholder: i,
            type: E,
            style: c,
            title: u,
            value: m,
            onInput: v
          }
        ),
        f && !a && m ? /* @__PURE__ */ U(we, { children: [
          /* @__PURE__ */ p("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: D }),
          $ && /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` })
        ] }) : h ? /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` }) : null
      ]
    }
  );
}
function Di({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = pe(Ge).getRaw(), i = t.getFullYear(), a = T(() => {
    switch (e) {
      case "month":
        return Tt(o.monthYearFormat, s)(t);
      case "year":
        return Tt(o.yearFormat, s)(t);
      case "duodecade": {
        const { start: c, end: u } = Hs(i), d = Tt(o.yearFormat, s);
        return `${d(new Date(c, 0, 1))} - ${d(new Date(u, 11, 31))}`;
      }
      default:
        return "";
    }
  }, [t, e, i, s, o]);
  function l() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ U("div", { className: "wx-8HQVQV wx-header", children: [
    n !== "right" ? /* @__PURE__ */ p(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-left",
        onClick: () => r && r({ diff: -1, type: e })
      }
    ) : /* @__PURE__ */ p("span", { className: "wx-8HQVQV wx-spacer" }),
    /* @__PURE__ */ p("span", { className: "wx-8HQVQV wx-label", onClick: l, children: a }),
    n !== "left" ? /* @__PURE__ */ p(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-right",
        onClick: () => r && r({ diff: 1, type: e })
      }
    ) : /* @__PURE__ */ p("span", { className: "wx-8HQVQV wx-spacer" })
  ] });
}
function pr({ onClick: t, children: e }) {
  return /* @__PURE__ */ p("button", { className: "wx-3s8W4d wx-button", onClick: t, children: e });
}
function Ni({
  value: t,
  current: e,
  part: n = "",
  markers: r = null,
  onCancel: s,
  onChange: o
}) {
  const i = (pe(Ge) || en()).getRaw().calendar, a = (i.weekStart || 7) % 7, l = i.dayShort.slice(a).concat(i.dayShort.slice(0, a)), c = (v, C, D) => new Date(
    v.getFullYear(),
    v.getMonth() + (C || 0),
    v.getDate() + (D || 0)
  );
  let u = n !== "normal";
  function d(v) {
    const C = v.getDay();
    return C === 0 || C === 6;
  }
  function h() {
    const v = c(e, 0, 1 - e.getDate());
    return v.setDate(v.getDate() - (v.getDay() - (a - 7)) % 7), v;
  }
  function f() {
    const v = c(e, 1, -e.getDate());
    return v.setDate(v.getDate() + (6 - v.getDay() + a) % 7), v;
  }
  const g = V(0);
  function m(v, C) {
    C.timeStamp !== g.current && (g.current = C.timeStamp, C.stopPropagation(), o && o(new Date(new Date(v))), s && s());
  }
  const x = T(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), w = T(() => {
    const v = h(), C = f(), D = e.getMonth();
    let E = [];
    for (let I = v; I <= C; I.setDate(I.getDate() + 1)) {
      const _ = {
        day: I.getDate(),
        in: I.getMonth() === D,
        date: I.valueOf()
      };
      let k = "";
      if (k += _.in ? "" : " wx-inactive", k += x.indexOf(_.date) > -1 ? " wx-selected" : "", u) {
        const b = _.date == x[0], L = _.date == x[1];
        b && !L ? k += " wx-left" : L && !b && (k += " wx-right"), _.date > x[0] && _.date < x[1] && (k += " wx-inrange");
      }
      if (k += d(I) ? " wx-weekend" : "", r) {
        const b = r(I);
        b && (k += " " + b);
      }
      E.push({ ..._, css: k });
    }
    return E;
  }, [e, x, u, r]), y = V(null);
  let $ = V({});
  return $.current.click = m, B(() => {
    Ls(y.current, $.current);
  }, []), /* @__PURE__ */ U("div", { children: [
    /* @__PURE__ */ p("div", { className: "wx-398RBS wx-weekdays", children: l.map((v) => /* @__PURE__ */ p("div", { className: "wx-398RBS wx-weekday", children: v }, v)) }),
    /* @__PURE__ */ p("div", { className: "wx-398RBS wx-days", ref: y, children: w.map((v) => /* @__PURE__ */ p(
      "div",
      {
        className: `wx-398RBS wx-day ${v.css} ${v.in ? "" : "wx-out"}`,
        "data-id": v.date,
        children: v.day
      },
      v.date
    )) })
  ] });
}
function Ti({
  value: t,
  current: e,
  part: n,
  onCancel: r,
  onChange: s,
  onShift: o
}) {
  const [i, a] = Me(t || /* @__PURE__ */ new Date()), [l, c] = Me(e || /* @__PURE__ */ new Date()), u = pe(Ge).getRaw().calendar, d = u.monthShort || [], h = T(() => l.getMonth(), [l]), f = P(
    (x, w) => {
      if (x != null) {
        w.stopPropagation();
        const y = new Date(l);
        y.setMonth(x), c(y), o && o({ current: y });
      }
      n === "normal" && a(new Date(l)), r && r();
    },
    [l, n, o, r]
  ), g = P(() => {
    const x = new Date(Ys(i, n) || l);
    x.setMonth(l.getMonth()), x.setFullYear(l.getFullYear()), s && s(x);
  }, [i, l, n, s]), m = P(
    (x) => {
      const w = x.target.closest("[data-id]");
      if (w) {
        const y = parseInt(w.getAttribute("data-id"), 10);
        f(y, x);
      }
    },
    [f]
  );
  return /* @__PURE__ */ U(we, { children: [
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-months", onClick: m, children: d.map((x, w) => /* @__PURE__ */ p(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (h === w ? " wx-current" : ""),
        "data-id": w,
        children: x
      },
      w
    )) }),
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ p(pr, { onClick: g, children: u.done }) })
  ] });
}
const Fn = "wx-1XEF33", Ei = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const i = pe(Ge).getRaw().calendar, [a, l] = Me(e), [c, u] = Me(t), d = T(() => a.getFullYear(), [a]), h = T(() => {
    const { start: w, end: y } = Hs(d), $ = [];
    for (let v = w; v <= y; ++v)
      $.push(v);
    return $;
  }, [d]), f = {
    click: g
  };
  function g(w, y) {
    if (w) {
      y.stopPropagation();
      const $ = new Date(a);
      $.setFullYear(w), l($), s && s({ current: $ });
    }
    o === "normal" && u(new Date(a)), n && n();
  }
  function m() {
    const w = new Date(Ys(c, o) || a);
    w.setFullYear(a.getFullYear()), r && r(w);
  }
  const x = V(null);
  return B(() => {
    x.current && Ls(x.current, f);
  }, []), /* @__PURE__ */ U(we, { children: [
    /* @__PURE__ */ p("div", { className: Fn + " wx-years", ref: x, children: h.map((w, y) => /* @__PURE__ */ p(
      "div",
      {
        className: Fn + ` wx-year ${d == w ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": w,
        children: w
      },
      y
    )) }),
    /* @__PURE__ */ p("div", { className: Fn + " wx-buttons", children: /* @__PURE__ */ p(pr, { onClick: m, children: i.done }) })
  ] });
}, Gr = {
  month: {
    component: Ni,
    next: Ai,
    prev: Ri
  },
  year: {
    component: Ti,
    next: Li,
    prev: Oi
  },
  duodecade: {
    component: Ei,
    next: Hi,
    prev: Ii
  }
};
function Ri(t) {
  return t = new Date(t), t.setMonth(t.getMonth() - 1), t;
}
function Ai(t) {
  return t = new Date(t), t.setMonth(t.getMonth() + 1), t;
}
function Oi(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 1), t;
}
function Li(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 1), t;
}
function Ii(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 10), t;
}
function Hi(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 10), t;
}
function Ys(t, e) {
  let n;
  if (e === "normal") n = t;
  else {
    const { start: r, end: s } = t;
    e === "left" ? n = r : e == "right" ? n = s : n = r && s;
  }
  return n;
}
const Wi = ["clear", "today"];
function Pi(t) {
  if (t === "done") return -1;
  if (t === "clear") return null;
  if (t === "today") return /* @__PURE__ */ new Date();
}
function Yi({
  value: t,
  current: e,
  onCurrentChange: n,
  part: r = "normal",
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: a
}) {
  const l = pe(Ge).getGroup("calendar"), [c, u] = K("month"), d = Array.isArray(o) ? o : o ? Wi : [], h = (w, y) => {
    w.preventDefault(), a && a({ value: y });
  }, f = () => {
    c === "duodecade" ? u("year") : c === "year" && u("month");
  }, g = (w) => {
    const { diff: y, current: $ } = w;
    if (y === 0) {
      c === "month" ? u("year") : c === "year" && u("duodecade");
      return;
    }
    if (y) {
      const v = Gr[c];
      n(y > 0 ? v.next(e) : v.prev(e));
    } else $ && n($);
    i && i();
  }, m = (w) => {
    u("month"), a && a({ select: !0, value: w });
  }, x = T(() => Gr[c].component, [c]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ U("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ p(Di, { date: e, part: r, type: c, onShift: g }),
        /* @__PURE__ */ U("div", { children: [
          /* @__PURE__ */ p(
            x,
            {
              value: t,
              current: e,
              onCurrentChange: n,
              part: r,
              markers: s,
              onCancel: f,
              onChange: m,
              onShift: g
            }
          ),
          c === "month" && d.length > 0 && /* @__PURE__ */ p("div", { className: "wx-2Gr4AS wx-buttons", children: d.map((w) => /* @__PURE__ */ p("div", { className: "wx-2Gr4AS wx-button-item", children: /* @__PURE__ */ p(
            pr,
            {
              onClick: (y) => h(y, Pi(w)),
              children: l(w)
            }
          ) }, w)) })
        ] })
      ] })
    }
  );
}
function tn(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = pe(Ge);
  const o = T(() => {
    let i = s;
    return (!i || !i.extend) && (i = Lt(Tn)), e !== null && (i = i.extend(e, n)), i;
  }, [e, n, s]);
  return /* @__PURE__ */ p(Ge.Provider, { value: o, children: r });
}
function Br(t, e, n, r) {
  if (!t || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), n(s);
  } else if (t.getDate() !== 1) {
    const s = new Date(t);
    s.setDate(1), n(s);
  }
}
const zi = ["clear", "today"];
function zs({
  value: t,
  current: e,
  markers: n = null,
  buttons: r = zi,
  onChange: s
}) {
  const [o, i] = Me(t), [a, l] = Me(e);
  B(() => {
    Br(a, o, l, !1);
  }, [o, a]);
  const c = P(
    (d) => {
      const h = d.value;
      h ? (i(new Date(h)), Br(a, new Date(h), l, !0)) : i(null), s && s({ value: h ? new Date(h) : null });
    },
    [s, a]
  ), u = P(
    (d) => {
      l(d);
    },
    [l]
  );
  return a ? /* @__PURE__ */ p(tn, { children: /* @__PURE__ */ p(
    Yi,
    {
      value: o,
      current: a,
      markers: n,
      buttons: r,
      onChange: c,
      onCurrentChange: u
    }
  ) }) : null;
}
const Fi = ["clear", "today"];
function ji({
  value: t,
  id: e = et(),
  disabled: n = !1,
  error: r = !1,
  width: s = "unset",
  align: o = "start",
  placeholder: i = "",
  format: a = "",
  buttons: l = Fi,
  css: c = "",
  title: u = "",
  editable: d = !1,
  clear: h = !1,
  onChange: f
}) {
  const { calendar: g, formats: m } = (pe(Ge) || en()).getRaw(), x = a || m?.dateFormat;
  let w = typeof x == "function" ? x : Tt(x, g);
  const [y, $] = K(t), [v, C] = K(!1);
  B(() => {
    $(t);
  }, [t]);
  function D() {
    C(!1);
  }
  function E(k) {
    const b = k === y || k && y && k.valueOf() === y.valueOf() || !k && !y;
    $(k), b || f && f({ value: k }), setTimeout(D, 1);
  }
  const I = T(
    () => y ? w(y) : "",
    [y, w]
  );
  function _({ value: k, input: b }) {
    if (!d && !h || b) return;
    let L = typeof d == "function" ? d(k) : k ? new Date(k) : null;
    L = isNaN(L) ? y || null : L || null, E(L);
  }
  return B(() => {
    const k = D;
    return window.addEventListener("scroll", k), () => window.removeEventListener("scroll", k);
  }, []), /* @__PURE__ */ U("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => C(!0), children: [
    /* @__PURE__ */ p(
      Rn,
      {
        css: c,
        title: u,
        value: I,
        id: e,
        readonly: !d,
        disabled: n,
        error: r,
        placeholder: i,
        onInput: D,
        onChange: _,
        icon: "wxi-calendar",
        inputStyle: {
          cursor: "pointer",
          width: "100%",
          paddingRight: "calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)"
        },
        clear: h
      }
    ),
    v && !n && /* @__PURE__ */ p(
      It,
      {
        onCancel: D,
        width: s,
        align: o,
        autoFit: !!o,
        children: /* @__PURE__ */ p(
          zs,
          {
            buttons: l,
            value: y,
            onChange: (k) => E(k.value)
          }
        )
      }
    )
  ] });
}
function Fs({
  value: t = "",
  options: e = [],
  textOptions: n = null,
  placeholder: r = "",
  disabled: s = !1,
  error: o = !1,
  title: i = "",
  textField: a = "label",
  clear: l = !1,
  children: c,
  onChange: u
}) {
  const d = V(null), h = V(null);
  let [f, g] = Me(t);
  function m(v) {
    d.current = v.navigate, h.current = v.keydown;
  }
  const x = T(() => f || f === 0 ? (n || e).find((v) => v.id === f) : null, [f, n, e]), w = P(
    ({ id: v }) => {
      (v || v === 0) && (g(v), d.current(null), u && u({ value: v }));
    },
    [g, u]
  ), y = P(
    (v) => {
      v.stopPropagation(), g(""), u && u({ value: "" });
    },
    [g, u]
  ), $ = P(() => e.findIndex((v) => v.id === f), [e, f]);
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-2YgblL wx-richselect ${o ? "wx-2YgblL wx-error" : ""} ${s ? "wx-2YgblL wx-disabled" : ""} ${c ? "" : "wx-2YgblL wx-nowrap"}`,
      title: i,
      onClick: () => d.current($()),
      onKeyDown: (v) => h.current(v, $()),
      tabIndex: 0,
      children: [
        /* @__PURE__ */ p("div", { className: "wx-2YgblL wx-label", children: x ? c ? c(x) : x[a] : r ? /* @__PURE__ */ p("span", { className: "wx-2YgblL wx-placeholder", children: r }) : " " }),
        l && !s && f ? /* @__PURE__ */ p("i", { className: "wx-2YgblL wx-icon wxi-close", onClick: y }) : /* @__PURE__ */ p("i", { className: "wx-2YgblL wx-icon wxi-angle-down" }),
        !s && /* @__PURE__ */ p(En, { items: e, onReady: m, onSelect: w, children: ({ option: v }) => c ? c(v) : v[a] })
      ]
    }
  );
}
function Zn({
  id: t = et(),
  label: e = "",
  css: n = "",
  min: r = 0,
  max: s = 100,
  value: o = 0,
  step: i = 1,
  title: a = "",
  disabled: l = !1,
  onChange: c
}) {
  const [u, d] = Me(o), h = V({ value: u, input: u }), f = T(
    () => (u - r) / (s - r) * 100 + "%",
    [u, r, s]
  ), g = T(() => l ? "" : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${f}, var(--wx-slider-background) ${f} 100%)`, [l, f]);
  function m({ target: y }) {
    const $ = y.value * 1;
    d($), c && c({
      value: $,
      previous: h.current.input,
      input: !0
    }), h.current.input = $;
  }
  function x({ target: y }) {
    const $ = y.value * 1;
    d($), c && c({ value: $, previous: h.current.value }), h.current.value = $;
  }
  B(() => {
    d(o);
  }, [o]);
  const w = V(null);
  return B(() => {
    if (w.current)
      return w.current.addEventListener("change", x), () => {
        w.current && w.current.removeEventListener("change", x);
      };
  }, [w, x]), /* @__PURE__ */ U("div", { className: `wx-2EDJ8G wx-slider ${n}`, title: a, children: [
    e && /* @__PURE__ */ p("label", { className: "wx-2EDJ8G wx-label", htmlFor: t, children: e }),
    /* @__PURE__ */ p("div", { className: "wx-2EDJ8G wx-inner", children: /* @__PURE__ */ p(
      "input",
      {
        id: t,
        className: "wx-2EDJ8G wx-input",
        type: "range",
        min: r,
        max: s,
        step: i,
        disabled: l,
        value: u,
        onInput: m,
        style: { background: g },
        ref: w
      }
    ) })
  ] });
}
const Vi = ({
  id: t = et(),
  value: e = 0,
  step: n = 1,
  min: r = 0,
  max: s = 1 / 0,
  error: o = !1,
  disabled: i = !1,
  readonly: a = !1,
  onChange: l
}) => {
  const [c, u] = Me(e), d = P(() => {
    if (a || c <= r) return;
    const m = c - n;
    u(m), l && l({ value: m });
  }, [c, a, r, n, l]), h = P(() => {
    if (a || c >= s) return;
    const m = c + n;
    u(m), l && l({ value: m });
  }, [c, a, s, n, l]), f = P(() => {
    if (!a) {
      const m = Math.round(Math.min(s, Math.max(c, r)) / n) * n, x = isNaN(m) ? Math.max(r, 0) : m;
      u(x), l && l({ value: x });
    }
  }, [a, c, s, r, n, l]), g = P(
    (m) => {
      const x = m.target.value * 1;
      u(x), l && l({ value: x, input: !0 });
    },
    [l]
  );
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-22t21n wx-counter ${i ? "wx-disabled" : ""} ${a ? "wx-readonly" : ""} ${o ? "wx-error" : ""}`,
      children: [
        /* @__PURE__ */ p(
          "button",
          {
            "aria-label": "-",
            className: "wx-22t21n wx-btn wx-btn-dec",
            disabled: i,
            onClick: d,
            children: /* @__PURE__ */ p(
              "svg",
              {
                className: "wx-22t21n wx-dec",
                width: "12",
                height: "2",
                viewBox: "0 0 12 2",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ p("path", { d: "M11.2501 1.74994H0.750092V0.249939H11.2501V1.74994Z" })
              }
            )
          }
        ),
        /* @__PURE__ */ p(
          "input",
          {
            id: t,
            type: "text",
            className: "wx-22t21n wx-input",
            disabled: i,
            readOnly: a,
            required: !0,
            value: c,
            onBlur: f,
            onInput: g
          }
        ),
        /* @__PURE__ */ p(
          "button",
          {
            "aria-label": "-",
            className: "wx-22t21n wx-btn wx-btn-inc",
            disabled: i,
            onClick: h,
            children: /* @__PURE__ */ p(
              "svg",
              {
                className: "wx-22t21n wx-inc",
                width: "12",
                height: "12",
                viewBox: "0 0 12 12",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: `M11.2501
								6.74994H6.75009V11.2499H5.25009V6.74994H0.750092V5.24994H5.25009V0.749939H6.75009V5.24994H11.2501V6.74994Z`
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
};
function Gi({ notice: t = {} }) {
  function e() {
    t.remove && t.remove();
  }
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-11sNg5 wx-notice wx-${t.type ? t.type : ""}`,
      role: "status",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ p("div", { className: "wx-11sNg5 wx-text", children: t.text }),
        /* @__PURE__ */ p("div", { className: "wx-11sNg5 wx-button", children: /* @__PURE__ */ p("i", { className: "wx-11sNg5 wxi-close", onClick: e }) })
      ]
    }
  );
}
function Bi({ data: t = [] }) {
  return /* @__PURE__ */ p("div", { className: "wx-3nwoO9 wx-notices", children: t.map((e) => /* @__PURE__ */ p(Gi, { notice: e }, e.id)) });
}
function qi({
  title: t = "",
  buttons: e = ["cancel", "ok"],
  header: n,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i
}) {
  const a = (pe(Ge) || en()).getGroup("core"), l = V(null);
  B(() => {
    l.current?.focus();
  }, []);
  function c(d) {
    switch (d.code) {
      case "Enter": {
        const h = d.target.tagName;
        if (h === "TEXTAREA" || h === "BUTTON") return;
        o && o({ event: d });
        break;
      }
      case "Escape":
        i && i({ event: d });
        break;
    }
  }
  function u(d, h) {
    const f = { event: d, button: h };
    h === "cancel" ? i && i(f) : o && o(f);
  }
  return /* @__PURE__ */ p(
    "div",
    {
      className: "wx-1FxkZa wx-modal",
      ref: l,
      tabIndex: 0,
      onKeyDown: c,
      children: /* @__PURE__ */ U("div", { className: "wx-1FxkZa wx-window", children: [
        n || (t ? /* @__PURE__ */ p("div", { className: "wx-1FxkZa wx-header", children: t }) : null),
        /* @__PURE__ */ p("div", { children: r }),
        s || e && /* @__PURE__ */ p("div", { className: "wx-1FxkZa wx-buttons", children: e.map((d) => /* @__PURE__ */ p("div", { className: "wx-1FxkZa wx-button", children: /* @__PURE__ */ p(
          gt,
          {
            type: `block ${d === "ok" ? "primary" : "secondary"}`,
            onClick: (h) => u(h, d),
            children: a(d)
          }
        ) }, d)) })
      ] })
    }
  );
}
function Ki({ children: t }, e) {
  const [n, r] = K(null), [s, o] = K([]);
  return bt(
    e,
    () => ({
      showModal: (i) => {
        const a = { ...i };
        return r(a), new Promise((l, c) => {
          a.resolve = (u) => {
            r(null), l(u);
          }, a.reject = (u) => {
            r(null), c(u);
          };
        });
      },
      showNotice: (i) => {
        i = { ...i }, i.id = i.id || et(), i.remove = () => o((a) => a.filter((l) => l.id !== i.id)), i.expire != -1 && setTimeout(i.remove, i.expire || 5100), o((a) => [...a, i]);
      }
    }),
    []
  ), /* @__PURE__ */ U(we, { children: [
    t,
    n && /* @__PURE__ */ p(
      qi,
      {
        title: n.title,
        buttons: n.buttons,
        onConfirm: n.resolve,
        onCancel: n.reject,
        children: n.message
      }
    ),
    /* @__PURE__ */ p(Bi, { data: s })
  ] });
}
vt(Ki);
function Kt({
  label: t = "",
  position: e = "",
  css: n = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: i
}) {
  const a = T(() => et(), []);
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-2oVUvC wx-field wx-${e} ${n} ${r ? "wx-error" : ""} ${o ? "wx-required" : ""}`.trim(),
      children: [
        t && /* @__PURE__ */ p("label", { className: "wx-2oVUvC wx-label", htmlFor: a, children: t }),
        /* @__PURE__ */ p("div", { className: `wx-2oVUvC wx-field-control wx-${s}`, children: mr(i, { id: a }) })
      ]
    }
  );
}
const js = ({
  value: t = !1,
  type: e = "",
  icon: n = "",
  disabled: r = !1,
  iconActive: s = "",
  onClick: o,
  title: i = "",
  css: a = "",
  text: l = "",
  textActive: c = "",
  children: u,
  active: d,
  onChange: h
}) => {
  const [f, g] = Me(t), m = T(() => (f ? "pressed" : "") + (e ? " " + e : ""), [f, e]), x = P(
    (w) => {
      let y = !f;
      o && o(w), w.defaultPrevented || (g(y), h && h({ value: y }));
    },
    [f, o, h]
  );
  return f && d ? /* @__PURE__ */ p(
    gt,
    {
      title: i,
      text: f && c || l,
      css: a,
      type: m,
      icon: f && s || n,
      onClick: x,
      disabled: r,
      children: mr(d, { value: f })
    }
  ) : u ? /* @__PURE__ */ p(
    gt,
    {
      title: i,
      text: f && c || l,
      css: a,
      type: m,
      icon: f && s || n,
      onClick: x,
      disabled: r,
      children: u
    }
  ) : /* @__PURE__ */ p(
    gt,
    {
      title: i,
      text: f && c || l,
      css: a,
      type: m,
      icon: f && s || n,
      onClick: x,
      disabled: r
    }
  );
}, qr = new Date(0, 0, 0, 0, 0);
function Ui({
  value: t = qr,
  id: e,
  title: n = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: i = "",
  onChange: a
}) {
  let [l, c] = Me(t);
  const { calendar: u, formats: d } = (pe(Ge) || en()).getRaw(), h = u.clockFormat == 12, f = 23, g = 59, m = T(() => {
    const O = i || d?.timeFormat;
    return typeof O == "function" ? O : Tt(O, u);
  }, [i, d, u]), x = T(() => m(new Date(0, 0, 0, 1)).indexOf("01") != -1, [m]), w = (O, q) => (O < 10 && q ? `0${O}` : `${O}`).slice(-2), y = (O) => w(O, !0), $ = (O) => `${O}`.replace(/[^\d]/g, "") || 0, v = (O) => h && (O = O % 12, O === 0) ? "12" : w(O, x), C = P((O, q) => (O = $(O), Math.min(O, q)), []), [D, E] = K(null), I = l || qr, _ = C(I.getHours(), f), k = C(I.getMinutes(), g), b = _ > 12, L = v(_), W = y(k), S = T(
    () => m(new Date(0, 0, 0, _, k)),
    [_, k, m]
  ), M = P(() => {
    E(!0);
  }, []), R = P(() => {
    const O = new Date(I);
    O.setHours(O.getHours() + (b ? -12 : 12)), c(O), a && a({ value: O });
  }, [I, b, a]), N = P(
    ({ value: O }) => {
      if (I.getHours() === O) return;
      const q = new Date(I);
      q.setHours(O), c(q), a && a({ value: q });
    },
    [I, a]
  ), A = P(
    ({ value: O }) => {
      if (I.getMinutes() === O) return;
      const q = new Date(I);
      q.setMinutes(O), c(q), a && a({ value: q });
    },
    [I, a]
  ), j = P(
    (O) => (O = C(O, f), h && (O = O * 1, O === 12 && (O = 0), b && (O += 12)), O),
    [C, h, b]
  ), H = P(() => {
    E(null);
  }, []);
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : M,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ p(
          Rn,
          {
            id: e,
            css: r,
            title: n,
            value: S,
            readonly: !0,
            disabled: s,
            error: o,
            icon: "wxi-clock",
            inputStyle: {
              cursor: "pointer",
              width: "100%",
              paddingRight: "calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)"
            }
          }
        ),
        D && !s && /* @__PURE__ */ p(It, { onCancel: H, width: "unset", children: /* @__PURE__ */ U("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ U("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: L,
                onChange: (O) => {
                  const q = j(O.target.value);
                  N({ value: q });
                }
              }
            ),
            /* @__PURE__ */ p("div", { className: "wx-7f497i wx-separator", children: ":" }),
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: W,
                onChange: (O) => {
                  const q = C(O.target.value, g);
                  A({ value: q });
                }
              }
            ),
            h && /* @__PURE__ */ p(
              js,
              {
                value: b,
                onClick: R,
                active: () => /* @__PURE__ */ p("span", { children: "pm" }),
                children: /* @__PURE__ */ p("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ p(Kt, { width: "unset", children: /* @__PURE__ */ p(
            Zn,
            {
              label: u.hours,
              value: _,
              onChange: N,
              max: f
            }
          ) }),
          /* @__PURE__ */ p(Kt, { width: "unset", children: /* @__PURE__ */ p(
            Zn,
            {
              label: u.minutes,
              value: k,
              onChange: A,
              max: g
            }
          ) })
        ] }) })
      ]
    }
  );
}
function Qi({ children: t }) {
  return /* @__PURE__ */ p("div", { className: "wx-KgpO9N wx-modal", children: /* @__PURE__ */ p("div", { className: "wx-KgpO9N wx-window", children: t }) });
}
function Xi({ position: t = "right", children: e, onCancel: n }) {
  const r = V(null);
  return B(() => Jt(r.current, n).destroy, []), /* @__PURE__ */ p("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function Vs({ theme: t = "", target: e, children: n }) {
  const r = V(null), s = V(null), [o, i] = K(null);
  r.current || (r.current = document.createElement("div"));
  const a = pe(Zt);
  return B(() => {
    i(
      e || Ji(s.current) || Ye.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ U(we, { children: [
    /* @__PURE__ */ p("span", { ref: s, style: { display: "none" } }),
    s.current && o ? ti(
      /* @__PURE__ */ p(
        "div",
        {
          className: `wx-3ZWsT0 wx-${t || a}-theme`,
          children: n
        }
      ),
      o
    ) : null
  ] });
}
function Ji(t) {
  const e = Ye.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function Zi() {
  return /* @__PURE__ */ p(we, {});
}
function Kr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(Zt.Provider, { value: "material", children: /* @__PURE__ */ U(we, { children: [
    n && /* @__PURE__ */ p("div", { className: "wx-material-theme", children: n }),
    e && /* @__PURE__ */ U(we, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.webix.com",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(Zi, {}),
      /* @__PURE__ */ p(
        "link",
        {
          rel: "stylesheet",
          href: "https://webix.io/dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
function Gs() {
  return /* @__PURE__ */ p(we, {});
}
function Ur(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(Zt.Provider, { value: "willow", children: /* @__PURE__ */ U(we, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-willow-theme", children: n }),
    e && /* @__PURE__ */ U(we, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.webix.com",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(Gs, {}),
      /* @__PURE__ */ p(
        "link",
        {
          rel: "stylesheet",
          href: "https://webix.io/dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
function Qr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(Zt.Provider, { value: "willow-dark", children: /* @__PURE__ */ U(we, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ U(we, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.webix.com",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(Gs, {}),
      /* @__PURE__ */ p(
        "link",
        {
          rel: "stylesheet",
          href: "https://webix.io/dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
fr(Ye);
const An = {
  gantt: {
    // Header / sidebar
    "Task name": "Task name",
    "Start date": "Start date",
    "Add task": "Add task",
    Duration: "Duration",
    Task: "Task",
    Milestone: "Milestone",
    "Summary task": "Summary task",
    // Sidebar
    Save: "Save",
    Delete: "Delete",
    Name: "Name",
    Description: "Description",
    "Select type": "Select type",
    Type: "Type",
    "End date": "End date",
    Progress: "Progress",
    Predecessors: "Predecessors",
    Successors: "Successors",
    "Add task name": "Add task name",
    "Add description": "Add description",
    "Select link type": "Select link type",
    "End-to-start": "End-to-start",
    "Start-to-start": "Start-to-start",
    "End-to-end": "End-to-end",
    "Start-to-end": "Start-to-end",
    // Context menu / toolbar
    Add: "Add",
    "Child task": "Child task",
    "Task above": "Task above",
    "Task below": "Task below",
    "Convert to": "Convert to",
    Edit: "Edit",
    Cut: "Cut",
    Copy: "Copy",
    Paste: "Paste",
    Move: "Move",
    Up: "Up",
    Down: "Down",
    Indent: "Indent",
    Outdent: "Outdent",
    "Split task": "Split task",
    // Toolbar
    "New task": "New task",
    "Move up": "Move up",
    "Move down": "Move down"
  }
};
var ea = (/* @__PURE__ */ new Date()).valueOf(), ta = () => ea++;
function na(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n], s = e[n];
    if (!On(r, s)) return !1;
  }
  return !0;
}
function On(t, e) {
  if (typeof t == "number" || typeof t == "string" || typeof t == "boolean" || t === null) return t === e;
  if (typeof t != typeof e || (t === null || e === null) && t !== e || t instanceof Date && e instanceof Date && t.getTime() !== e.getTime())
    return !1;
  if (typeof t == "object")
    if (Array.isArray(t) && Array.isArray(e)) {
      if (t.length !== e.length) return !1;
      for (let r = t.length - 1; r >= 0; r--)
        if (!On(t[r], e[r])) return !1;
      return !0;
    } else
      return na(t, e);
  return t === e;
}
function $n(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map($n);
  const e = {};
  for (const n in t)
    e[n] = $n(t[n]);
  return e;
}
var Bs = class {
  constructor(t) {
    this._nextHandler = null, this._dispatch = t, this.exec = this.exec.bind(this);
  }
  async exec(t, e) {
    return this._dispatch(t, e), this._nextHandler && await this._nextHandler.exec(t, e), e;
  }
  setNext(t) {
    return this._nextHandler = t;
  }
}, qs = (/* @__PURE__ */ new Date()).valueOf(), ra = () => qs++;
function Ks() {
  return "temp://" + qs++;
}
var Xr = class {
  constructor(t) {
    this._data = t, this._pool = /* @__PURE__ */ new Map();
    for (let e = 0; e < t.length; e++) {
      const n = t[e];
      this._pool.set(n.id, n);
    }
  }
  add(t) {
    t = { id: ra(), ...t }, this._data.push(t), this._pool.set(t.id, t);
  }
  update(t, e) {
    const n = this._data.findIndex((s) => s.id == t), r = { ...this._data[n], ...e };
    this._data[n] = r, this._pool.set(r.id, r);
  }
  remove(t) {
    this._data = this._data.filter((e) => e.id != t), this._pool.delete(t);
  }
  filter(t) {
    this._data = this._data.filter((e) => {
      const n = t(e);
      return n || this._pool.delete(e.id), n;
    });
  }
  byId(t) {
    return this._pool.get(t);
  }
  map(t) {
    return this._data.map(t);
  }
  forEach(t) {
    this._data.forEach(t);
  }
}, sa = class {
  constructor(e) {
    const n = { id: 0, $level: 0, data: [], parent: null }, r = /* @__PURE__ */ new Map();
    r.set(0, n), this._pool = r, e && e.length && this.parse(e, 0);
  }
  parse(e, n) {
    const r = this._pool;
    for (let o = 0; o < e.length; o++) {
      const i = e[o];
      i.parent = i.parent || n, i.data = null, r.set(i.id, i);
    }
    for (let o = 0; o < e.length; o++) {
      const i = e[o], a = r.get(i.parent);
      a && (a.data || (a.data = []), a.data.push(i));
    }
    const s = r.get(n);
    this.setLevel(s, s.$level + 1, !1);
  }
  add(e, n) {
    const r = this._pool.get(e.parent || 0);
    e.$level = r.$level + 1, this._pool.set(e.id, e), r.data ? n === -1 ? r.data = [...r.data, e] : Jr(r, n, e) : r.data = [e];
  }
  addAfter(e, n) {
    if (!n) return this.add(e, -1);
    const r = this.byId(n), s = this.byId(r.parent), o = un(s, r.id) + 1;
    e.parent = s.id, e.$level = s.$level + 1, this.add(e, o);
  }
  remove(e) {
    const n = this._pool.get(e);
    this._remove(n);
    const r = this._pool.get(n.parent);
    r.data = r.data.filter((s) => s.id != e), this._clearBranch(r);
  }
  _remove(e) {
    e.data && e.data.forEach((n) => this._remove(n)), this._pool.delete(e.id);
  }
  update(e, n) {
    let r = this._pool.get(e);
    const s = this._pool.get(r.parent), o = un(s, r.id);
    r = { ...r, ...n }, s && o >= 0 && (s.data[o] = r, s.data = [...s.data]), this._pool.set(r.id, r);
  }
  move(e, n, r) {
    const s = this._pool.get(e), o = n === "child", i = this._pool.get(r), a = i.$level + (o ? 1 : 0);
    if (!s || !i) return;
    const l = this._pool.get(s.parent), c = o ? i : this._pool.get(i.parent);
    c.data || (c.data = []);
    const u = un(l, s.id);
    oa(l, u);
    const d = o ? c.data.length : un(c, i.id) + (n === "after" ? 1 : 0);
    if (Jr(c, d, s), l.id === c.id && u === d) return null;
    s.parent = c.id, s.$level !== a && (s.$level = a, this.setLevel(s, a + 1, !0)), this.update(s.id, s), this._clearBranch(l);
  }
  _clearBranch(e) {
    e.data && !e.data.length && (e.open && delete e.open, this.update(e.id, { data: null }));
  }
  toArray() {
    const e = [], n = this._pool.get(0).data;
    return n && Us(n, e), e;
  }
  byId(e) {
    return this._pool.get(e);
  }
  getBranch(e) {
    return this._pool.get(e).data;
  }
  forEach(e) {
    this._pool.forEach((n, r) => {
      r !== 0 && e(n);
    });
  }
  eachChild(e, n) {
    const r = this.byId(n);
    !r || !r.data || r.data.forEach((s, o) => {
      e(this.byId(s.id), o), this.eachChild(e, s.id);
    });
  }
  setLevel(e, n, r) {
    e.data && (e.data = e.data.map((s) => (r && (s = { ...s }, this._pool.set(s.id, s)), s.$level = n, s.data && this.setLevel(s, n + 1, r), s)));
  }
};
function Us(t, e) {
  t.forEach((n) => {
    e.push(n), n.open === !0 && Us(n.data, e);
  });
}
function oa(t, e) {
  const n = [...t.data];
  n.splice(e, 1), t.data = n;
}
function Jr(t, e, n) {
  const r = [...t.data];
  r.splice(e, 0, n), t.data = r;
}
function un(t, e) {
  return t?.data.findIndex((n) => n.id === e);
}
var Qs = 2, ia = class {
  constructor(e) {
    e && (this._writable = e.writable, this._async = e.async), this._values = {}, this._state = {};
  }
  setState(e, n = 0) {
    const r = {};
    return this._wrapProperties(e, this._state, this._values, "", r, n), r;
  }
  getState() {
    return this._values;
  }
  getReactive() {
    return this._state;
  }
  _wrapProperties(e, n, r, s, o, i) {
    for (const a in e) {
      const l = n[a], c = r[a], u = e[a];
      if (l && (c === u && typeof u != "object" || u instanceof Date && c instanceof Date && c.getTime() === u.getTime())) continue;
      const d = s + (s ? "." : "") + a;
      l ? (l.__parse(u, d, o, i) && (r[a] = u), i & Qs ? o[d] = l.__trigger : l.__trigger()) : (u && u.__reactive ? n[a] = this._wrapNested(u, u, d, o) : n[a] = this._wrapWritable(u), r[a] = u), o[d] = o[d] || null;
    }
  }
  _wrapNested(e, n, r, s) {
    const o = this._wrapWritable(e);
    return this._wrapProperties(e, o, n, r, s, 0), o.__parse = (i, a, l, c) => (this._wrapProperties(i, o, n, a, l, c), !1), o;
  }
  _wrapWritable(e) {
    const n = [], r = function() {
      for (let s = 0; s < n.length; s++) n[s](e);
    };
    return { subscribe: (s) => (n.push(s), this._async ? setTimeout(s, 1, e) : s(e), () => {
      const o = n.indexOf(s);
      o >= 0 && n.splice(o, 1);
    }), __trigger: () => {
      n.length && (this._async ? setTimeout(r, 1) : r());
    }, __parse: function(s) {
      return e = s, !0;
    } };
  }
}, aa = class {
  constructor(e, n, r, s) {
    typeof e == "function" ? this._setter = e : this._setter = e.setState.bind(e), this._routes = n, this._parsers = r, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((o) => {
      o.in.forEach((i) => {
        const a = this._triggers.get(i) || [];
        a.push(o), this._triggers.set(i, a);
      }), o.out.forEach((i) => {
        const a = this._sources.get(i) || {};
        o.in.forEach((l) => a[l] = !0), this._sources.set(i, a);
      });
    }), this._routes.forEach((o) => {
      o.length = Math.max(...o.in.map((i) => Xs(i, this._sources, 1)));
    }), this._bus = s;
  }
  init(e) {
    const n = {};
    for (const r in e) if (this._prev[r] !== e[r]) {
      const s = this._parsers[r];
      n[r] = s ? s(e[r]) : e[r];
    }
    this._prev = this._prev ? { ...this._prev, ...e } : { ...e }, this.setState(n), this._bus && this._bus.exec("init-state", n);
  }
  setStateAsync(e) {
    const n = this._setter(e, Qs);
    return this._async ? Object.assign(this._async.signals, n) : this._async = { signals: n, timer: setTimeout(this._applyState.bind(this), 1) }, n;
  }
  _applyState() {
    const e = this._async;
    if (e) {
      this._async = null, this._triggerUpdates(e.signals, []);
      for (const n in e.signals) {
        const r = e.signals[n];
        r && r();
      }
    }
  }
  setState(e, n = []) {
    const r = this._setter(e);
    return this._triggerUpdates(r, n), r;
  }
  _triggerUpdates(e, n) {
    const r = Object.keys(e), s = !n.length;
    n = n || [];
    for (let o = 0; o < r.length; o++) {
      const i = r[o], a = this._triggers.get(i);
      a && a.forEach((l) => {
        n.indexOf(l) == -1 && n.push(l);
      });
    }
    s && this._execNext(n);
  }
  _execNext(e) {
    for (; e.length; ) {
      e.sort((r, s) => r.length < s.length ? 1 : -1);
      const n = e[e.length - 1];
      e.splice(e.length - 1), n.exec(e);
    }
  }
};
function Xs(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => Xs(o, e, n + 1));
  return Math.max(...s);
}
var la = class {
  constructor() {
    this._nextHandler = null, this._handlers = {}, this._tag = /* @__PURE__ */ new WeakMap(), this.exec = this.exec.bind(this);
  }
  on(e, n, r) {
    let s = this._handlers[e];
    s ? r && r.intercept ? s.unshift(n) : s.push(n) : s = this._handlers[e] = [n], r && r.tag && this._tag.set(n, r.tag);
  }
  intercept(e, n, r) {
    this.on(e, n, { ...r, intercept: !0 });
  }
  detach(e) {
    for (const n in this._handlers) {
      const r = this._handlers[n];
      for (let s = r.length - 1; s >= 0; s--) this._tag.get(r[s]) === e && r.splice(s, 1);
    }
  }
  async exec(e, n) {
    const r = this._handlers[e];
    if (r) for (let s = 0; s < r.length; s++) {
      const o = r[s](n);
      if (o === !1 || o && o.then && await o === !1) return;
    }
    return this._nextHandler && await this._nextHandler.exec(e, n), n;
  }
  setNext(e) {
    return this._nextHandler = e;
  }
};
function ca(t, e) {
  return typeof t == "string" ? t.localeCompare(e, void 0, { numeric: !0 }) : typeof t == "object" ? t.getTime() - e.getTime() : (t ?? 0) - (e ?? 0);
}
function ua(t, e) {
  return typeof t == "string" ? -t.localeCompare(e, void 0, { numeric: !0 }) : typeof e == "object" ? e.getTime() - t.getTime() : (e ?? 0) - (t ?? 0);
}
function da({ key: t, order: e }) {
  const n = e === "asc" ? ca : ua;
  return (r, s) => n(r[t], s[t]);
}
function ha(t) {
  if (!t || !t.length) return;
  const e = t.map((n) => da(n));
  return t.length === 1 ? e[0] : function(n, r) {
    for (let s = 0; s < e.length; s++) {
      const o = e[s](n, r);
      if (o !== 0) return o;
    }
    return 0;
  };
}
function fa(t, e) {
  return t.sort(ha(e));
}
function le(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function Be(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function Ln(t, e) {
  const n = le(t);
  return isNaN(e) ? Be(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function gr(t, e) {
  const n = le(t);
  if (isNaN(e)) return Be(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = Be(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function Js(t, e) {
  const n = +le(t);
  return Be(t, n + e);
}
const In = 6048e5, ma = 864e5, Zs = 6e4, eo = 36e5;
function pa(t, e) {
  return Js(t, e * eo);
}
let ga = {};
function Hn() {
  return ga;
}
function at(t, e) {
  const n = Hn(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = le(t), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function Rt(t) {
  return at(t, { weekStartsOn: 1 });
}
function to(t) {
  const e = le(t), n = e.getFullYear(), r = Be(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Rt(r), o = Be(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = Rt(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
}
function xt(t) {
  const e = le(t);
  return e.setHours(0, 0, 0, 0), e;
}
function Sn(t) {
  const e = le(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function wr(t, e) {
  const n = xt(t), r = xt(e), s = +n - Sn(n), o = +r - Sn(r);
  return Math.round((s - o) / ma);
}
function er(t) {
  const e = to(t), n = Be(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Rt(n);
}
function wa(t, e) {
  return Js(t, e * Zs);
}
function xa(t, e) {
  const n = e * 3;
  return gr(t, n);
}
function no(t, e) {
  const n = e * 7;
  return Ln(t, n);
}
function ya(t, e) {
  return gr(t, e * 12);
}
function Gt(t, e) {
  const n = le(t), r = le(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function va(t, e) {
  const n = xt(t), r = xt(e);
  return +n == +r;
}
function ba(t) {
  return t instanceof Date || typeof t == "object" && Object.prototype.toString.call(t) === "[object Date]";
}
function ka(t) {
  if (!ba(t) && typeof t != "number") return !1;
  const e = le(t);
  return !isNaN(Number(e));
}
function xr(t, e) {
  const n = Rt(t), r = Rt(e), s = +n - Sn(n), o = +r - Sn(r);
  return Math.round((s - o) / In);
}
function $a(t, e) {
  const n = le(t), r = le(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function Sa(t, e) {
  const n = le(t), r = le(e);
  return n.getFullYear() - r.getFullYear();
}
function yr(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function ro(t, e) {
  return +le(t) - +le(e);
}
function _a(t, e, n) {
  const r = ro(t, e) / eo;
  return yr(n?.roundingMethod)(r);
}
function Ca(t, e, n) {
  const r = ro(t, e) / Zs;
  return yr(n?.roundingMethod)(r);
}
function so(t) {
  const e = le(t);
  return e.setHours(23, 59, 59, 999), e;
}
function vr(t) {
  const e = le(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function Ma(t) {
  const e = le(t);
  return +so(e) == +vr(e);
}
function oo(t, e) {
  const n = le(t), r = le(e), s = Gt(n, r), o = Math.abs($a(n, r));
  let i;
  if (o < 1) i = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let a = Gt(n, r) === -s;
    Ma(le(t)) && o === 1 && Gt(t, r) === 1 && (a = !1), i = s * (o - Number(a));
  }
  return i === 0 ? 0 : i;
}
function Da(t, e, n) {
  const r = oo(t, e) / 3;
  return yr(n?.roundingMethod)(r);
}
function Na(t, e) {
  const n = le(t), r = le(e), s = Gt(n, r), o = Math.abs(Sa(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const i = Gt(n, r) === -s, a = s * (o - +i);
  return a === 0 ? 0 : a;
}
function Ut(t) {
  const e = le(t), n = e.getMonth(), r = n - n % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function io(t) {
  const e = le(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function Ta(t) {
  const e = le(t), n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function ao(t) {
  const e = le(t), n = Be(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Ea(t) {
  const e = le(t);
  return e.setMinutes(59, 59, 999), e;
}
function Ra(t, e) {
  const n = e?.weekStartsOn, r = le(t), s = r.getDay(), o = (s < n ? -7 : 0) + 6 - (s - n);
  return r.setDate(r.getDate() + o), r.setHours(23, 59, 59, 999), r;
}
function br(t) {
  const e = le(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
const Aa = { lessThanXSeconds: { one: "less than a second", other: "less than {{count}} seconds" }, xSeconds: { one: "1 second", other: "{{count}} seconds" }, halfAMinute: "half a minute", lessThanXMinutes: { one: "less than a minute", other: "less than {{count}} minutes" }, xMinutes: { one: "1 minute", other: "{{count}} minutes" }, aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" }, xHours: { one: "1 hour", other: "{{count}} hours" }, xDays: { one: "1 day", other: "{{count}} days" }, aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" }, xWeeks: { one: "1 week", other: "{{count}} weeks" }, aboutXMonths: { one: "about 1 month", other: "about {{count}} months" }, xMonths: { one: "1 month", other: "{{count}} months" }, aboutXYears: { one: "about 1 year", other: "about {{count}} years" }, xYears: { one: "1 year", other: "{{count}} years" }, overXYears: { one: "over 1 year", other: "over {{count}} years" }, almostXYears: { one: "almost 1 year", other: "almost {{count}} years" } }, Oa = (t, e, n) => {
  let r;
  const s = Aa[t];
  return typeof s == "string" ? r = s : e === 1 ? r = s.one : r = s.other.replace("{{count}}", e.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function jn(t) {
  return (e = {}) => {
    const n = e.width ? String(e.width) : t.defaultWidth;
    return t.formats[n] || t.formats[t.defaultWidth];
  };
}
const La = { full: "EEEE, MMMM do, y", long: "MMMM do, y", medium: "MMM d, y", short: "MM/dd/yyyy" }, Ia = { full: "h:mm:ss a zzzz", long: "h:mm:ss a z", medium: "h:mm:ss a", short: "h:mm a" }, Ha = { full: "{{date}} 'at' {{time}}", long: "{{date}} 'at' {{time}}", medium: "{{date}}, {{time}}", short: "{{date}}, {{time}}" }, Wa = { date: jn({ formats: La, defaultWidth: "full" }), time: jn({ formats: Ia, defaultWidth: "full" }), dateTime: jn({ formats: Ha, defaultWidth: "full" }) }, Pa = { lastWeek: "'last' eeee 'at' p", yesterday: "'yesterday at' p", today: "'today at' p", tomorrow: "'tomorrow at' p", nextWeek: "eeee 'at' p", other: "P" }, Ya = (t, e, n, r) => Pa[t];
function zt(t) {
  return (e, n) => {
    const r = n?.context ? String(n.context) : "standalone";
    let s;
    if (r === "formatting" && t.formattingValues) {
      const i = t.defaultFormattingWidth || t.defaultWidth, a = n?.width ? String(n.width) : i;
      s = t.formattingValues[a] || t.formattingValues[i];
    } else {
      const i = t.defaultWidth, a = n?.width ? String(n.width) : t.defaultWidth;
      s = t.values[a] || t.values[i];
    }
    const o = t.argumentCallback ? t.argumentCallback(e) : e;
    return s[o];
  };
}
const za = { narrow: ["B", "A"], abbreviated: ["BC", "AD"], wide: ["Before Christ", "Anno Domini"] }, Fa = { narrow: ["1", "2", "3", "4"], abbreviated: ["Q1", "Q2", "Q3", "Q4"], wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"] }, ja = { narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }, Va = { narrow: ["S", "M", "T", "W", "T", "F", "S"], short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }, Ga = { narrow: { am: "a", pm: "p", midnight: "mi", noon: "n", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" }, abbreviated: { am: "AM", pm: "PM", midnight: "midnight", noon: "noon", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" }, wide: { am: "a.m.", pm: "p.m.", midnight: "midnight", noon: "noon", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" } }, Ba = { narrow: { am: "a", pm: "p", midnight: "mi", noon: "n", morning: "in the morning", afternoon: "in the afternoon", evening: "in the evening", night: "at night" }, abbreviated: { am: "AM", pm: "PM", midnight: "midnight", noon: "noon", morning: "in the morning", afternoon: "in the afternoon", evening: "in the evening", night: "at night" }, wide: { am: "a.m.", pm: "p.m.", midnight: "midnight", noon: "noon", morning: "in the morning", afternoon: "in the afternoon", evening: "in the evening", night: "at night" } }, qa = (t, e) => {
  const n = Number(t), r = n % 100;
  if (r > 20 || r < 10) switch (r % 10) {
    case 1:
      return n + "st";
    case 2:
      return n + "nd";
    case 3:
      return n + "rd";
  }
  return n + "th";
}, Ka = { ordinalNumber: qa, era: zt({ values: za, defaultWidth: "wide" }), quarter: zt({ values: Fa, defaultWidth: "wide", argumentCallback: (t) => t - 1 }), month: zt({ values: ja, defaultWidth: "wide" }), day: zt({ values: Va, defaultWidth: "wide" }), dayPeriod: zt({ values: Ga, defaultWidth: "wide", formattingValues: Ba, defaultFormattingWidth: "wide" }) };
function Ft(t) {
  return (e, n = {}) => {
    const r = n.width, s = r && t.matchPatterns[r] || t.matchPatterns[t.defaultMatchWidth], o = e.match(s);
    if (!o) return null;
    const i = o[0], a = r && t.parsePatterns[r] || t.parsePatterns[t.defaultParseWidth], l = Array.isArray(a) ? Qa(a, (d) => d.test(i)) : Ua(a, (d) => d.test(i));
    let c;
    c = t.valueCallback ? t.valueCallback(l) : l, c = n.valueCallback ? n.valueCallback(c) : c;
    const u = e.slice(i.length);
    return { value: c, rest: u };
  };
}
function Ua(t, e) {
  for (const n in t) if (Object.prototype.hasOwnProperty.call(t, n) && e(t[n])) return n;
}
function Qa(t, e) {
  for (let n = 0; n < t.length; n++) if (e(t[n])) return n;
}
function Xa(t) {
  return (e, n = {}) => {
    const r = e.match(t.matchPattern);
    if (!r) return null;
    const s = r[0], o = e.match(t.parsePattern);
    if (!o) return null;
    let i = t.valueCallback ? t.valueCallback(o[0]) : o[0];
    i = n.valueCallback ? n.valueCallback(i) : i;
    const a = e.slice(s.length);
    return { value: i, rest: a };
  };
}
const Ja = /^(\d+)(th|st|nd|rd)?/i, Za = /\d+/i, el = { narrow: /^(b|a)/i, abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i, wide: /^(before christ|before common era|anno domini|common era)/i }, tl = { any: [/^b/i, /^(a|c)/i] }, nl = { narrow: /^[1234]/i, abbreviated: /^q[1234]/i, wide: /^[1234](th|st|nd|rd)? quarter/i }, rl = { any: [/1/i, /2/i, /3/i, /4/i] }, sl = { narrow: /^[jfmasond]/i, abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i, wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i }, ol = { narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i], any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i] }, il = { narrow: /^[smtwf]/i, short: /^(su|mo|tu|we|th|fr|sa)/i, abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i, wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i }, al = { narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i], any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i] }, ll = { narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i, any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i }, cl = { any: { am: /^a/i, pm: /^p/i, midnight: /^mi/i, noon: /^no/i, morning: /morning/i, afternoon: /afternoon/i, evening: /evening/i, night: /night/i } }, ul = { ordinalNumber: Xa({ matchPattern: Ja, parsePattern: Za, valueCallback: (t) => parseInt(t, 10) }), era: Ft({ matchPatterns: el, defaultMatchWidth: "wide", parsePatterns: tl, defaultParseWidth: "any" }), quarter: Ft({ matchPatterns: nl, defaultMatchWidth: "wide", parsePatterns: rl, defaultParseWidth: "any", valueCallback: (t) => t + 1 }), month: Ft({ matchPatterns: sl, defaultMatchWidth: "wide", parsePatterns: ol, defaultParseWidth: "any" }), day: Ft({ matchPatterns: il, defaultMatchWidth: "wide", parsePatterns: al, defaultParseWidth: "any" }), dayPeriod: Ft({ matchPatterns: ll, defaultMatchWidth: "any", parsePatterns: cl, defaultParseWidth: "any" }) }, dl = { code: "en-US", formatDistance: Oa, formatLong: Wa, formatRelative: Ya, localize: Ka, match: ul, options: { weekStartsOn: 0, firstWeekContainsDate: 1 } };
function hl(t) {
  const e = le(t);
  return wr(e, ao(e)) + 1;
}
function fl(t) {
  const e = le(t), n = +Rt(e) - +er(e);
  return Math.round(n / In) + 1;
}
function lo(t, e) {
  const n = le(t), r = n.getFullYear(), s = Hn(), o = e?.firstWeekContainsDate ?? e?.locale?.options?.firstWeekContainsDate ?? s.firstWeekContainsDate ?? s.locale?.options?.firstWeekContainsDate ?? 1, i = Be(t, 0);
  i.setFullYear(r + 1, 0, o), i.setHours(0, 0, 0, 0);
  const a = at(i, e), l = Be(t, 0);
  l.setFullYear(r, 0, o), l.setHours(0, 0, 0, 0);
  const c = at(l, e);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= c.getTime() ? r : r - 1;
}
function ml(t, e) {
  const n = Hn(), r = e?.firstWeekContainsDate ?? e?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, s = lo(t, e), o = Be(t, 0);
  return o.setFullYear(s, 0, r), o.setHours(0, 0, 0, 0), at(o, e);
}
function pl(t, e) {
  const n = le(t), r = +at(n, e) - +ml(n, e);
  return Math.round(r / In) + 1;
}
function $e(t, e) {
  const n = t < 0 ? "-" : "", r = Math.abs(t).toString().padStart(e, "0");
  return n + r;
}
const ot = { y(t, e) {
  const n = t.getFullYear(), r = n > 0 ? n : 1 - n;
  return $e(e === "yy" ? r % 100 : r, e.length);
}, M(t, e) {
  const n = t.getMonth();
  return e === "M" ? String(n + 1) : $e(n + 1, 2);
}, d(t, e) {
  return $e(t.getDate(), e.length);
}, a(t, e) {
  const n = t.getHours() / 12 >= 1 ? "pm" : "am";
  switch (e) {
    case "a":
    case "aa":
      return n.toUpperCase();
    case "aaa":
      return n;
    case "aaaaa":
      return n[0];
    case "aaaa":
    default:
      return n === "am" ? "a.m." : "p.m.";
  }
}, h(t, e) {
  return $e(t.getHours() % 12 || 12, e.length);
}, H(t, e) {
  return $e(t.getHours(), e.length);
}, m(t, e) {
  return $e(t.getMinutes(), e.length);
}, s(t, e) {
  return $e(t.getSeconds(), e.length);
}, S(t, e) {
  const n = e.length, r = t.getMilliseconds(), s = Math.trunc(r * Math.pow(10, n - 3));
  return $e(s, e.length);
} }, _t = { midnight: "midnight", noon: "noon", morning: "morning", afternoon: "afternoon", evening: "evening", night: "night" }, Zr = { G: function(t, e, n) {
  const r = t.getFullYear() > 0 ? 1 : 0;
  switch (e) {
    case "G":
    case "GG":
    case "GGG":
      return n.era(r, { width: "abbreviated" });
    case "GGGGG":
      return n.era(r, { width: "narrow" });
    case "GGGG":
    default:
      return n.era(r, { width: "wide" });
  }
}, y: function(t, e, n) {
  if (e === "yo") {
    const r = t.getFullYear(), s = r > 0 ? r : 1 - r;
    return n.ordinalNumber(s, { unit: "year" });
  }
  return ot.y(t, e);
}, Y: function(t, e, n, r) {
  const s = lo(t, r), o = s > 0 ? s : 1 - s;
  if (e === "YY") {
    const i = o % 100;
    return $e(i, 2);
  }
  return e === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : $e(o, e.length);
}, R: function(t, e) {
  const n = to(t);
  return $e(n, e.length);
}, u: function(t, e) {
  const n = t.getFullYear();
  return $e(n, e.length);
}, Q: function(t, e, n) {
  const r = Math.ceil((t.getMonth() + 1) / 3);
  switch (e) {
    case "Q":
      return String(r);
    case "QQ":
      return $e(r, 2);
    case "Qo":
      return n.ordinalNumber(r, { unit: "quarter" });
    case "QQQ":
      return n.quarter(r, { width: "abbreviated", context: "formatting" });
    case "QQQQQ":
      return n.quarter(r, { width: "narrow", context: "formatting" });
    case "QQQQ":
    default:
      return n.quarter(r, { width: "wide", context: "formatting" });
  }
}, q: function(t, e, n) {
  const r = Math.ceil((t.getMonth() + 1) / 3);
  switch (e) {
    case "q":
      return String(r);
    case "qq":
      return $e(r, 2);
    case "qo":
      return n.ordinalNumber(r, { unit: "quarter" });
    case "qqq":
      return n.quarter(r, { width: "abbreviated", context: "standalone" });
    case "qqqqq":
      return n.quarter(r, { width: "narrow", context: "standalone" });
    case "qqqq":
    default:
      return n.quarter(r, { width: "wide", context: "standalone" });
  }
}, M: function(t, e, n) {
  const r = t.getMonth();
  switch (e) {
    case "M":
    case "MM":
      return ot.M(t, e);
    case "Mo":
      return n.ordinalNumber(r + 1, { unit: "month" });
    case "MMM":
      return n.month(r, { width: "abbreviated", context: "formatting" });
    case "MMMMM":
      return n.month(r, { width: "narrow", context: "formatting" });
    case "MMMM":
    default:
      return n.month(r, { width: "wide", context: "formatting" });
  }
}, L: function(t, e, n) {
  const r = t.getMonth();
  switch (e) {
    case "L":
      return String(r + 1);
    case "LL":
      return $e(r + 1, 2);
    case "Lo":
      return n.ordinalNumber(r + 1, { unit: "month" });
    case "LLL":
      return n.month(r, { width: "abbreviated", context: "standalone" });
    case "LLLLL":
      return n.month(r, { width: "narrow", context: "standalone" });
    case "LLLL":
    default:
      return n.month(r, { width: "wide", context: "standalone" });
  }
}, w: function(t, e, n, r) {
  const s = pl(t, r);
  return e === "wo" ? n.ordinalNumber(s, { unit: "week" }) : $e(s, e.length);
}, I: function(t, e, n) {
  const r = fl(t);
  return e === "Io" ? n.ordinalNumber(r, { unit: "week" }) : $e(r, e.length);
}, d: function(t, e, n) {
  return e === "do" ? n.ordinalNumber(t.getDate(), { unit: "date" }) : ot.d(t, e);
}, D: function(t, e, n) {
  const r = hl(t);
  return e === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : $e(r, e.length);
}, E: function(t, e, n) {
  const r = t.getDay();
  switch (e) {
    case "E":
    case "EE":
    case "EEE":
      return n.day(r, { width: "abbreviated", context: "formatting" });
    case "EEEEE":
      return n.day(r, { width: "narrow", context: "formatting" });
    case "EEEEEE":
      return n.day(r, { width: "short", context: "formatting" });
    case "EEEE":
    default:
      return n.day(r, { width: "wide", context: "formatting" });
  }
}, e: function(t, e, n, r) {
  const s = t.getDay(), o = (s - r.weekStartsOn + 8) % 7 || 7;
  switch (e) {
    case "e":
      return String(o);
    case "ee":
      return $e(o, 2);
    case "eo":
      return n.ordinalNumber(o, { unit: "day" });
    case "eee":
      return n.day(s, { width: "abbreviated", context: "formatting" });
    case "eeeee":
      return n.day(s, { width: "narrow", context: "formatting" });
    case "eeeeee":
      return n.day(s, { width: "short", context: "formatting" });
    case "eeee":
    default:
      return n.day(s, { width: "wide", context: "formatting" });
  }
}, c: function(t, e, n, r) {
  const s = t.getDay(), o = (s - r.weekStartsOn + 8) % 7 || 7;
  switch (e) {
    case "c":
      return String(o);
    case "cc":
      return $e(o, e.length);
    case "co":
      return n.ordinalNumber(o, { unit: "day" });
    case "ccc":
      return n.day(s, { width: "abbreviated", context: "standalone" });
    case "ccccc":
      return n.day(s, { width: "narrow", context: "standalone" });
    case "cccccc":
      return n.day(s, { width: "short", context: "standalone" });
    case "cccc":
    default:
      return n.day(s, { width: "wide", context: "standalone" });
  }
}, i: function(t, e, n) {
  const r = t.getDay(), s = r === 0 ? 7 : r;
  switch (e) {
    case "i":
      return String(s);
    case "ii":
      return $e(s, e.length);
    case "io":
      return n.ordinalNumber(s, { unit: "day" });
    case "iii":
      return n.day(r, { width: "abbreviated", context: "formatting" });
    case "iiiii":
      return n.day(r, { width: "narrow", context: "formatting" });
    case "iiiiii":
      return n.day(r, { width: "short", context: "formatting" });
    case "iiii":
    default:
      return n.day(r, { width: "wide", context: "formatting" });
  }
}, a: function(t, e, n) {
  const r = t.getHours() / 12 >= 1 ? "pm" : "am";
  switch (e) {
    case "a":
    case "aa":
      return n.dayPeriod(r, { width: "abbreviated", context: "formatting" });
    case "aaa":
      return n.dayPeriod(r, { width: "abbreviated", context: "formatting" }).toLowerCase();
    case "aaaaa":
      return n.dayPeriod(r, { width: "narrow", context: "formatting" });
    case "aaaa":
    default:
      return n.dayPeriod(r, { width: "wide", context: "formatting" });
  }
}, b: function(t, e, n) {
  const r = t.getHours();
  let s;
  switch (r === 12 ? s = _t.noon : r === 0 ? s = _t.midnight : s = r / 12 >= 1 ? "pm" : "am", e) {
    case "b":
    case "bb":
      return n.dayPeriod(s, { width: "abbreviated", context: "formatting" });
    case "bbb":
      return n.dayPeriod(s, { width: "abbreviated", context: "formatting" }).toLowerCase();
    case "bbbbb":
      return n.dayPeriod(s, { width: "narrow", context: "formatting" });
    case "bbbb":
    default:
      return n.dayPeriod(s, { width: "wide", context: "formatting" });
  }
}, B: function(t, e, n) {
  const r = t.getHours();
  let s;
  switch (r >= 17 ? s = _t.evening : r >= 12 ? s = _t.afternoon : r >= 4 ? s = _t.morning : s = _t.night, e) {
    case "B":
    case "BB":
    case "BBB":
      return n.dayPeriod(s, { width: "abbreviated", context: "formatting" });
    case "BBBBB":
      return n.dayPeriod(s, { width: "narrow", context: "formatting" });
    case "BBBB":
    default:
      return n.dayPeriod(s, { width: "wide", context: "formatting" });
  }
}, h: function(t, e, n) {
  if (e === "ho") {
    let r = t.getHours() % 12;
    return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
  }
  return ot.h(t, e);
}, H: function(t, e, n) {
  return e === "Ho" ? n.ordinalNumber(t.getHours(), { unit: "hour" }) : ot.H(t, e);
}, K: function(t, e, n) {
  const r = t.getHours() % 12;
  return e === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : $e(r, e.length);
}, k: function(t, e, n) {
  let r = t.getHours();
  return r === 0 && (r = 24), e === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : $e(r, e.length);
}, m: function(t, e, n) {
  return e === "mo" ? n.ordinalNumber(t.getMinutes(), { unit: "minute" }) : ot.m(t, e);
}, s: function(t, e, n) {
  return e === "so" ? n.ordinalNumber(t.getSeconds(), { unit: "second" }) : ot.s(t, e);
}, S: function(t, e) {
  return ot.S(t, e);
}, X: function(t, e, n) {
  const r = t.getTimezoneOffset();
  if (r === 0) return "Z";
  switch (e) {
    case "X":
      return ts(r);
    case "XXXX":
    case "XX":
      return ft(r);
    case "XXXXX":
    case "XXX":
    default:
      return ft(r, ":");
  }
}, x: function(t, e, n) {
  const r = t.getTimezoneOffset();
  switch (e) {
    case "x":
      return ts(r);
    case "xxxx":
    case "xx":
      return ft(r);
    case "xxxxx":
    case "xxx":
    default:
      return ft(r, ":");
  }
}, O: function(t, e, n) {
  const r = t.getTimezoneOffset();
  switch (e) {
    case "O":
    case "OO":
    case "OOO":
      return "GMT" + es(r, ":");
    case "OOOO":
    default:
      return "GMT" + ft(r, ":");
  }
}, z: function(t, e, n) {
  const r = t.getTimezoneOffset();
  switch (e) {
    case "z":
    case "zz":
    case "zzz":
      return "GMT" + es(r, ":");
    case "zzzz":
    default:
      return "GMT" + ft(r, ":");
  }
}, t: function(t, e, n) {
  const r = Math.trunc(t.getTime() / 1e3);
  return $e(r, e.length);
}, T: function(t, e, n) {
  const r = t.getTime();
  return $e(r, e.length);
} };
function es(t, e = "") {
  const n = t > 0 ? "-" : "+", r = Math.abs(t), s = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(s) : n + String(s) + e + $e(o, 2);
}
function ts(t, e) {
  return t % 60 === 0 ? (t > 0 ? "-" : "+") + $e(Math.abs(t) / 60, 2) : ft(t, e);
}
function ft(t, e = "") {
  const n = t > 0 ? "-" : "+", r = Math.abs(t), s = $e(Math.trunc(r / 60), 2), o = $e(r % 60, 2);
  return n + s + e + o;
}
const ns = (t, e) => {
  switch (t) {
    case "P":
      return e.date({ width: "short" });
    case "PP":
      return e.date({ width: "medium" });
    case "PPP":
      return e.date({ width: "long" });
    case "PPPP":
    default:
      return e.date({ width: "full" });
  }
}, co = (t, e) => {
  switch (t) {
    case "p":
      return e.time({ width: "short" });
    case "pp":
      return e.time({ width: "medium" });
    case "ppp":
      return e.time({ width: "long" });
    case "pppp":
    default:
      return e.time({ width: "full" });
  }
}, gl = (t, e) => {
  const n = t.match(/(P+)(p+)?/) || [], r = n[1], s = n[2];
  if (!s) return ns(t, e);
  let o;
  switch (r) {
    case "P":
      o = e.dateTime({ width: "short" });
      break;
    case "PP":
      o = e.dateTime({ width: "medium" });
      break;
    case "PPP":
      o = e.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      o = e.dateTime({ width: "full" });
      break;
  }
  return o.replace("{{date}}", ns(r, e)).replace("{{time}}", co(s, e));
}, wl = { p: co, P: gl }, xl = /^D+$/, yl = /^Y+$/, vl = ["D", "DD", "YY", "YYYY"];
function bl(t) {
  return xl.test(t);
}
function kl(t) {
  return yl.test(t);
}
function $l(t, e, n) {
  const r = Sl(t, e, n);
  if (console.warn(r), vl.includes(t)) throw new RangeError(r);
}
function Sl(t, e, n) {
  const r = t[0] === "Y" ? "years" : "days of the month";
  return `Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const _l = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Cl = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ml = /^'([^]*?)'?$/, Dl = /''/g, Nl = /[a-zA-Z]/;
function tr(t, e, n) {
  const r = Hn(), s = n?.locale ?? r.locale ?? dl, o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = le(t);
  if (!ka(a)) throw new RangeError("Invalid time value");
  let l = e.match(Cl).map((u) => {
    const d = u[0];
    if (d === "p" || d === "P") {
      const h = wl[d];
      return h(u, s.formatLong);
    }
    return u;
  }).join("").match(_l).map((u) => {
    if (u === "''") return { isToken: !1, value: "'" };
    const d = u[0];
    if (d === "'") return { isToken: !1, value: Tl(u) };
    if (Zr[d]) return { isToken: !0, value: u };
    if (d.match(Nl)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + d + "`");
    return { isToken: !1, value: u };
  });
  s.localize.preprocessor && (l = s.localize.preprocessor(a, l));
  const c = { firstWeekContainsDate: o, weekStartsOn: i, locale: s };
  return l.map((u) => {
    if (!u.isToken) return u.value;
    const d = u.value;
    (!n?.useAdditionalWeekYearTokens && kl(d) || !n?.useAdditionalDayOfYearTokens && bl(d)) && $l(d, e, String(t));
    const h = Zr[d[0]];
    return h(a, d, s.localize, c);
  }).join("");
}
function Tl(t) {
  const e = t.match(Ml);
  return e ? e[1].replace(Dl, "'") : t;
}
function uo(t) {
  const e = le(t), n = e.getFullYear(), r = e.getMonth(), s = Be(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function El(t) {
  const e = le(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function ho(t) {
  const e = le(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : El(e) ? 366 : 365;
}
function Rl(t) {
  const e = er(t), n = +er(no(e, 60)) - +e;
  return Math.round(n / In);
}
function Mt(t, e) {
  const n = le(t), r = le(e);
  return +n == +r;
}
function Al(t) {
  const e = le(t);
  return e.setMinutes(0, 0, 0), e;
}
function Ol(t, e, n) {
  const r = at(t, n), s = at(e, n);
  return +r == +s;
}
function Ll(t, e) {
  const n = le(t), r = le(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function Il(t, e) {
  const n = Ut(t), r = Ut(e);
  return +n == +r;
}
function Hl(t, e) {
  const n = le(t), r = le(e);
  return n.getFullYear() === r.getFullYear();
}
const nr = 8, fo = 4, Wl = 3, rs = 7, Pl = nr + fo;
function mo(t, e) {
  (t.open || t.type != "summary") && t.data?.forEach((n) => {
    n.$x += e, mo(n, e);
  });
}
function rr(t, e, n, r) {
  const s = t.getSummaryId(e.id);
  if (s) {
    const o = t.byId(s), i = { xMin: 1 / 0, xMax: 0 };
    po(o, i, n, r), o.$x = i.xMin, o.$w = i.xMax - i.xMin, rr(t, o, n, r);
  }
}
function po(t, e, n, r) {
  const { lengthUnit: s, start: o } = n;
  t.data?.forEach((i) => {
    if (!i.unscheduled) {
      typeof i.$x > "u" && (i.$x = Math.round(n.diff(i.start, o, s) * r), i.$w = Math.round(n.diff(i.end, i.start, s, !0) * r));
      const a = i.type === "milestone" && i.$h ? i.$h / 2 : 0;
      e.xMin > i.$x && (e.xMin = i.$x + a);
      const l = i.$x + i.$w - a;
      e.xMax < l && (e.xMax = l);
    }
    i.type !== "summary" && po(i, e, n, r);
  });
}
function kr(t, e) {
  let n;
  e && (n = e.filter((s) => s.parent == t.id));
  const r = { data: n, ...t };
  if (r.data?.length) r.data.forEach((s) => {
    if (s.unscheduled && !s.data) return;
    (e || s.type != "summary" && s.data) && (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }), s = kr(s, e)), s.start && (!r.start || r.start > s.start) && (r.start = new Date(s.start));
    const o = s.type === "milestone" ? s.start : s.end;
    o && (!r.end || r.end < o) && (r.end = new Date(o));
  });
  else if (t.type === "summary") throw Error("Summary tasks must have start and end dates if they have no subtasks");
  return r;
}
function Yl(t, e, n, r, s, o) {
  return ss(t, e, n, r, s, o, !1), o && ss(t, e, n, r, s, o, !0), t;
}
function ss(t, e, n, r, s, o, i) {
  const { start: a, end: l, lengthUnit: c, diff: u } = s, d = (i ? "base_" : "") + "start", h = (i ? "base_" : "") + "end", f = "$x" + (i ? "_base" : ""), g = "$y" + (i ? "_base" : ""), m = "$w" + (i ? "_base" : ""), x = "$h" + (i ? "_base" : ""), w = "$skip" + (i ? "_baseline" : "");
  let y = t[d], $ = t[h];
  if (i && !y) {
    t[w] = !0;
    return;
  }
  t[d] < a && (t[h] < a || Mt(t[h], a)) ? y = $ = a : t[d] > l && (y = $ = l), t[f] = Math.round(u(y, a, c) * n), t[g] = i ? t.$y + t.$h + fo : r * e + Wl, t[m] = Math.round(u($, y, c, !0) * n), t[x] = i ? nr : o ? r - rs - Pl : r - rs, t.type === "milestone" && (t[f] = t[f] - t.$h / 2, t[m] = t.$h, i && (t[g] = t.$y + nr, t[m] = t[x] = t.$h)), t.unscheduled && !i ? t.$skip = !0 : t[w] = Mt(y, $);
}
class zl extends sa {
  _sort;
  constructor(e) {
    super(), this.parse(e, 0);
  }
  parse(e, n) {
    if (!e || !e.length) return;
    const r = e.map((s) => this.normalizeTask(s, e));
    super.parse(r, n), this._sort && this.sortBranch(this._sort, n);
  }
  getBranch(e) {
    const n = this._pool.get(e);
    return this._pool.get(n.parent || 0).data;
  }
  contains(e, n) {
    const r = this._pool.get(e).data;
    let s = !1;
    if (r) for (let o = 0; o < r.length; o++) {
      if (r[o].id === n) {
        s = !0;
        break;
      }
      if (r[o].data && (s = this.contains(r[o].id, n), s)) break;
    }
    return s;
  }
  getIndexById(e) {
    return this.getBranch(e).findIndex((n) => n.id === e);
  }
  add(e, n) {
    const r = this.normalizeTask(e);
    return super.add(r, n), r;
  }
  copy(e, n, r) {
    const s = this.add({ ...e, id: null, data: null, parent: n }, r);
    let o = [[e.id, s.id]];
    return e.data?.forEach((i, a) => {
      const l = this.copy(i, s.id, a);
      o = o.concat(l);
    }), o;
  }
  normalizeTask(e, n) {
    const r = e.id || Ks(), s = e.parent || 0, o = e.text || "", i = e.type || "task", a = e.progress || 0, l = e.details || "", c = { ...e, id: r, text: o, parent: s, progress: a, type: i, details: l };
    if (c.type === "summary" && !(c.start && c.end)) {
      const { start: u, end: d } = kr({ ...c }, n);
      c.start = u, c.end = d;
    }
    return c;
  }
  getSummaryId(e) {
    const n = this._pool.get(e);
    if (!n.parent) return null;
    const r = this._pool.get(n.parent);
    return r.type === "summary" ? r.id : this.getSummaryId(r.id);
  }
  sort(e) {
    this._sort = e, e && this.sortBranch(e, 0);
  }
  sortBranch(e, n) {
    const r = this._pool.get(n || 0).data;
    r && (fa(r, e), r.forEach((s) => {
      this.sortBranch(e, s.id);
    }));
  }
  serialize() {
    const e = [], n = this._pool.get(0).data;
    return n && go(n, e), e;
  }
}
function go(t, e) {
  t.forEach((n) => {
    e.push(n), n.data && go(n.data, e);
  });
}
const sr = { year: Na, quarter: Da, month: oo, week: xr, day: wr, hour: _a, minute: Ca }, lt = { year: { quarter: 4, month: 12, week: Rl, day: Fl, hour: jl }, quarter: { month: 3, week: Vl, day: wo, hour: Gl }, month: { week: Bl, day: ql, hour: Kl }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Fl(t) {
  return t ? ho(t) : 365;
}
function jl(t) {
  return ho(t) * 24;
}
function Vl(t) {
  const e = Ut(t), n = Ln(xt(br(t)), 1);
  return xr(n, e);
}
function wo(t) {
  if (t) {
    const e = Ut(t), n = br(t);
    return wr(n, e) + 1;
  }
  return 91;
}
function Gl(t) {
  return wo(t) * 24;
}
function Bl(t) {
  if (t) {
    const e = io(t), n = Ln(xt(vr(t)), 1);
    return xr(n, e);
  }
  return 5;
}
function ql(t) {
  return t ? uo(t) : 30;
}
function Kl(t) {
  return uo(t) * 24;
}
function _n(t, e, n) {
  const r = lt[t][e];
  return r ? typeof r == "number" ? r : r(n) : 1;
}
function Ul(t, e) {
  return t === e || !!(lt[t] && lt[t][e]);
}
const Cn = { year: ya, quarter: xa, month: gr, week: no, day: Ln, hour: pa, minute: wa };
function $r(t) {
  return (e, n, r, s) => !lt[t][r] || typeof lt[t][r] == "number" || vo(t, e, n) ? Vt(t, e, n, r, s) : Ql(e, n, t, r, s);
}
function Vt(t, e, n, r, s) {
  const o = r || t;
  let i = n, a = e;
  if (s && (i = nt(o, n), a = nt(o, e), a < e && (a = Ze(o)(a, 1))), t !== o) {
    const l = sr[o](a, i), c = _n(t, o, n);
    return l / c;
  } else return sr[o](a, i);
}
function Ql(t, e, n, r, s) {
  let o = 0;
  const i = nt(n, e);
  if (e > i) {
    const l = Cn[n](i, 1);
    o = Vt(n, l, e, r), e = l;
  }
  let a = 0;
  return vo(n, e, t) || (a = Vt(n, nt(n, t), e), e = Cn[n](e, a)), a += o + Vt(n, t, e, r), !a && s && (a = Vt(n, t, e, r, s)), a;
}
function Ze(t) {
  return Cn[t];
}
const xo = { year: ao, quarter: Ut, month: io, week: (t) => at(t, { weekStartsOn: 1 }), day: xt, hour: Al };
function nt(t, e) {
  const n = xo[t];
  return n ? n(e) : new Date(e);
}
const Xl = { year: Ta, quarter: br, month: vr, week: (t) => Ra(t, { weekStartsOn: 1 }), day: so, hour: Ea }, yo = { year: Hl, quarter: Il, month: Ll, week: (t, e) => Ol(t, e, { weekStartsOn: 1 }), day: va };
function vo(t, e, n) {
  const r = yo[t];
  return r ? r(e, n) : !1;
}
const Jl = { start: xo, end: Xl, add: Cn, isSame: yo, diff: sr, smallerCount: lt }, os = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function Zl(t, e) {
  for (const n in e) {
    if (n === "smallerCount") {
      const r = Object.keys(e[n]).sort((a, l) => Ue.indexOf(a) - Ue.indexOf(l)).shift();
      let s = Ue.indexOf(r);
      const o = e[n][r], i = os(o);
      for (let a = s - 1; a >= 0; a--) {
        const l = Ue[a], c = os(lt[l][r]);
        if (i <= c) break;
        s = a;
      }
      Ue.splice(s, 0, t);
    }
    if (n === "biggerCount") for (const r in e[n]) lt[r][t] = e[n][r];
    else Jl[n][t] = e[n];
  }
}
function At(t) {
  const e = /* @__PURE__ */ new Date();
  return t.map((n) => ({ item: n, len: Ze(n.unit)(e, 1) })).sort((n, r) => n.len < r.len ? -1 : 1)[0].item;
}
const Ue = ["year", "quarter", "month", "week", "day", "hour"], dn = { year: "yyyy", quarter: "QQQ", month: "MMM", week: "w", day: "MMM d", hour: "HH:mm" }, or = 50, ir = 300;
function ec(t, e, n, r, s) {
  let o = t, i = e, a = !1, l = !1;
  s && s.forEach((u) => {
    (!t || n) && (!o || u.start <= o) && (o = u.start, a = !0);
    const d = u.type === "milestone" ? u.start : u.end;
    (!e || n) && (!i || d >= i) && (i = d, l = !0);
  });
  const c = Ze(r || "day");
  return o ? a && (o = c(o, -1)) : i ? o = c(i, -30) : o = /* @__PURE__ */ new Date(), i ? l && (i = c(i, 1)) : i = c(o, 30), { _start: o, _end: i };
}
function tc(t, e, n, r, s, o) {
  const i = At(o).unit, a = $r(i), l = a(e, t, "", !0), c = nt(i, e);
  t = nt(i, t), e = c < e ? Ze(i)(c, 1) : c;
  const u = l * r, d = s * o.length, h = o.map((g) => {
    const m = [], x = Ze(g.unit);
    let w = nt(g.unit, t);
    for (; w < e; ) {
      let y = x(w, g.step);
      w < t && (w = t), y > e && (y = e);
      const $ = a(y, w, "", !0) * r, v = typeof g.format == "function" ? g.format(w, y) : tr(w, g.format, { firstWeekContainsDate: 4, weekStartsOn: 1 });
      let C = "";
      g.css && (C += typeof g.css == "function" ? g.css(w) : g.css), m.push({ width: $, value: v, date: w, css: C, unit: g.unit }), w = y;
    }
    return { cells: m, add: x, height: s };
  });
  let f = r;
  return i !== n && (f = Math.round(f / _n(i, n)) || 1), { rows: h, width: u, height: d, diff: a, start: t, end: e, lengthUnit: n, minUnit: i, lengthUnitWidth: f };
}
function nc(t, e, n) {
  const r = typeof t == "boolean" ? {} : t, s = Ue.indexOf(At(e).unit);
  if (typeof r.level > "u" && (r.level = s), r.levels) r.levels.forEach((a) => {
    a.minCellWidth || (a.minCellWidth = hn(r.minCellWidth, or)), a.maxCellWidth || (a.maxCellWidth = hn(r.maxCellWidth, ir));
  });
  else {
    const a = [], l = e.length || 1, c = hn(r.minCellWidth, or), u = hn(r.maxCellWidth, ir);
    e.forEach((d) => {
      d.format && !dn[d.unit] && (dn[d.unit] = d.format);
    }), Ue.forEach((d, h) => {
      if (h === s) a.push({ minCellWidth: c, maxCellWidth: u, scales: e });
      else {
        const f = [];
        if (h) for (let g = l - 1; g > 0; g--) {
          const m = Ue[h - g];
          m && f.push({ unit: m, step: 1, format: dn[m] });
        }
        f.push({ unit: d, step: 1, format: dn[d] }), a.push({ minCellWidth: c, maxCellWidth: u, scales: f });
      }
    }), r.levels = a;
  }
  r.levels[r.level] || (r.level = 0);
  const o = r.levels[r.level], i = Math.min(Math.max(n, o.minCellWidth), o.maxCellWidth);
  return { _zoom: r, scales: o.scales, cellWidth: i };
}
function rc(t, e, n, r, s, o, i) {
  t.level = n;
  let a;
  const l = r.scales || r, c = At(l).unit, u = sc(c, s);
  if (e === -1) {
    const f = _n(c, s);
    a = i * f;
  } else {
    const f = _n(At(o).unit, c);
    a = Math.round(i / f);
  }
  const d = r.minCellWidth ?? or, h = r.maxCellWidth ?? ir;
  return { scales: l, cellWidth: Math.min(h, Math.max(d, a)), lengthUnit: u, zoom: t };
}
function sc(t, e) {
  const n = Ue.indexOf(t), r = Ue.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : Ue[r];
}
function hn(t, e) {
  return t ?? e;
}
const Vn = 20, oc = function(t, e, n, r, s) {
  const o = Math.round(r / 2) - 3;
  if (!e || !n || !e.$y || !n.$y || e.$skip || n.$skip) return t.$p = "", t;
  let i = !1, a = !1;
  switch (t.type) {
    case "e2s":
      a = !0;
      break;
    case "s2s":
      i = !0, a = !0;
      break;
    case "s2e":
      i = !0;
      break;
  }
  const l = i ? e.$x : e.$x + e.$w, c = s ? e.$y - 7 : e.$y, u = a ? n.$x : n.$x + n.$w, d = s ? n.$y - 7 : n.$y;
  if (l !== u || c !== d) {
    const h = ic(l, c + o, u, d + o, i, a, r / 2, s), f = ac(u, d + o, a);
    t.$p = `${h},${f}`;
  }
  return t;
};
function ic(t, e, n, r, s, o, i, a) {
  const l = Vn * (s ? -1 : 1), c = Vn * (o ? -1 : 1), u = t + l, d = n + c, h = [t, e, u, e, 0, 0, 0, 0, d, r, n, r], f = d - u;
  let g = r - e;
  const m = o === s;
  return m || (d <= t + Vn - 2 && o || d > t && !o) && (g = a ? g - i + 6 : g - i), m && o && u > d || m && !o && u < d ? (h[4] = h[2] + f, h[5] = h[3], h[6] = h[4], h[7] = h[5] + g) : (h[4] = h[2], h[5] = h[3] + g, h[6] = h[4] + f, h[7] = h[5]), h.join(",");
}
function ac(t, e, n) {
  return n ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}` : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
const bo = ["start", "end", "duration"];
function lc(t, e) {
  const { type: n, unscheduled: r } = t;
  return r || n === "summary" ? !bo.includes(e) : n === "milestone" ? !["end", "duration"].includes(e) : !0;
}
function cc(t, e) {
  return typeof e == "function" ? e : bo.includes(t) ? (typeof e == "string" && (e = { type: e, config: {} }), e.config || (e.config = {}), e.type === "datepicker" && (e.config.buttons = ["today"]), (n, r) => lc(n, r.id) ? e : null) : e;
}
function uc(t) {
  return !t || !t.length ? [] : t.map((e) => {
    const n = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120);
    let i = e.template;
    if (!i) switch (e.id) {
      case "start":
        i = (l) => tr(l, "dd-MM-yyyy");
        break;
      case "end":
        i = (l) => l ? tr(l, "dd-MM-yyyy") : "-";
        break;
    }
    const a = e.editor && cc(e.id, e.editor);
    return { width: o, align: n, header: e.header, id: e.id, template: i, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...a && { editor: a }, ...e.options && { options: e.options } };
  });
}
const ko = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function dc() {
  let t = !0;
  return t = !1, t;
}
function Dt(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(), i = s.length, a = !i && e === "add-task", l = ["edit-task", "paste-task"], c = ["copy-task", "cut-task"], u = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["indent-task:add", "move-task:down", "move-task:up"], h = { "indent-task:remove": 2 }, f = { parent: d.includes(e), level: h[e] };
  if (n = n || (i ? s[s.length - 1] : null), !(!n && !a)) {
    if (e !== "paste-task" && (t._temp = null), l.includes(e) || a || s.length === 1) is(t, e, n, r);
    else if (i) {
      const g = c.includes(e) ? s : hc(s, o, f);
      u.includes(e) && g.reverse(), g.forEach((m) => is(t, e, m, r));
    }
  }
}
function hc(t, e, n) {
  let r = t.map((s) => {
    const o = e.byId(s);
    return { id: s, level: o.$level, parent: o.parent, index: e.getIndexById(s) };
  });
  return (n.parent || n.level) && (r = r.filter((s) => n.level && s.level <= n.level || !t.includes(s.parent))), r.sort((s, o) => s.level - o.level || s.index - o.index), r.map((s) => s.id);
}
function is(t, e, n, r) {
  const s = t.exec ? t.exec : t.in.exec;
  let o = e.split(":")[0], i = e.split(":")[1], a = { id: n }, l = {};
  if (o == "copy-task" || o == "cut-task") {
    t._temp || (t._temp = []), t._temp.push({ id: n, cut: o == "cut-task" });
    return;
  } else if (o == "paste-task") {
    t._temp && t._temp.length && (t._temp.forEach((c) => {
      s(c.cut ? "move-task" : "copy-task", { id: c.id, target: n, mode: "after" });
    }), t._temp = null);
    return;
  } else o === "add-task" ? (l = { task: { type: "task", text: r("New Task") }, target: n }, a = {}) : o === "edit-task" ? o = "show-editor" : o === "convert-task" ? (o = "update-task", l = { task: { type: i } }, i = void 0) : o === "indent-task" && (i = i === "add");
  typeof i < "u" && (l = { mode: i, ...l }), a = { ...a, ...l }, s(o, a);
}
function Sr(t, e) {
  return t.some((n) => n.data ? Sr(n.data, e) : n.id === e);
}
const fc = (t) => Ze(t), mc = (t) => $r(t);
function as(t, e, n) {
  ls(t, e), t.base_start && ls(t, e, !0), Qt(e, n);
}
function Qt(t, e, n, r) {
  t.unscheduled || (n && pc(t, r), cs(t, e)), t.base_start && cs(t, e, !0);
}
function ls(t, e, n = !1) {
  e.type = e.type || t.type;
  const [r, s, o] = $o(n);
  e.type !== "milestone" ? (t[s] && e[r] || (e[r] = t[r]), e[r] && !(e[o] || e[s]) ? (e[s] = t[s] > e[r] ? t[s] : null, e[s] || (e[o] = 1)) : e[s] && !(e[o] || e[r]) ? (e[r] = t[r] < e[s] ? t[r] : e[s], e[r] === e[s] && (e[o] = 1, delete e[s])) : e[o] && !(e[r] || e[s]) && (e[r] = t[r])) : (e[s] && delete e[s], t[s] && delete t[s]);
}
function cs(t, e = "day", n) {
  const [r, s, o] = $o(n);
  t.type === "milestone" ? t[o] = 0 : t[r] && (t[o] ? t[s] || (t[s] = fc(e)(t[r], t[o])) : t[s] ? t[o] = mc(e)(t[s], t[r]) : (t[s] = t[r], t[o] = 0));
}
function $o(t) {
  return t ? ["base_start", "base_end", "base_duration"] : ["start", "end", "duration"];
}
function pc(t, e) {
  e === "duration" && (t.end = null), t.start && t.end && (t.start >= t.end ? t.end = null : t.duration = null), t.base_start && t.base_end && (t.base_start >= t.base_end ? t.base_end = null : t.base_duration = null);
}
class gc extends ia {
  in;
  _router;
  constructor(e) {
    super({ writable: e, async: !1 }), this._router = new aa(super.setState.bind(this), [{ in: ["tasks", "start", "end", "scales", "autoScale"], out: ["_start", "_end"], exec: (s) => {
      const { _end: o, _start: i, start: a, end: l, tasks: c, scales: u, autoScale: d } = this.getState();
      if (!a || !l || d) {
        const h = At(u).unit, f = ec(a, l, d, h, c);
        (f._end != o || f._start != i) && this.setState(f, s);
      } else this.setState({ _start: a, _end: l }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: i } = o;
      const { _start: a, _end: l, cellWidth: c, scaleHeight: u, scales: d } = o, h = At(d).unit;
      Ul(h, i) || (i = h);
      const f = tc(a, l, i, c, u, d);
      this.setState({ _scales: f }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: i, tasks: a, _scales: l, baselines: c } = this.getState(), u = a.toArray().map((d, h) => Yl(d, h, o, i, l, c));
      this.setState({ _tasks: u }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: i, cellHeight: a, baselines: l } = this.getState(), c = i.map((u) => {
        const d = o.byId(u.source), h = o.byId(u.target);
        return oc(u, d, h, a, l);
      }).filter((u) => u !== null);
      this.setState({ _links: c }, s);
    } }, { in: ["tasks", "activeTask"], out: ["_activeTask"], exec: (s) => {
      const { tasks: o, activeTask: i } = this.getState();
      this.setState({ _activeTask: o.byId(i) || null }, s);
    } }, { in: ["tasks", "selected"], out: ["_selected"], exec: (s) => {
      const { tasks: o, selected: i } = this.getState(), a = i.map((l) => o.byId(l)).filter((l) => !!l);
      this.setState({ _selected: a }, s);
    } }, { in: ["start", "end"], out: ["cellWidth"], exec: (s) => {
      const { _cellWidth: o, cellWidth: i } = this.getState();
      o != i && this.setState({ cellWidth: o }, s);
    } }, { in: ["markers", "_scales", "cellWidth"], out: ["_markers"], exec: (s) => {
      const { markers: o, _scales: i, cellWidth: a } = this.getState(), { start: l, diff: c } = i, u = o.map((d) => (d.left = c(d.start, l) * a, d));
      this.setState({ _markers: u }, s);
    } }], { tasks: (s) => new zl(s), links: (s) => new Xr(s), columns: (s) => uc(s) });
    const n = this.in = new la();
    n.on("show-editor", ({ id: s }) => {
      this.setStateAsync({ activeTask: s });
    }), n.on("select-task", ({ id: s, toggle: o, range: i, show: a }) => {
      const { selected: l, _tasks: c, activeTask: u } = this.getState();
      let d = !1, h;
      if (l.length && (o || i)) {
        const g = [...l];
        if (i) {
          const m = g[g.length - 1], x = c.findIndex((C) => C.id == m), w = c.findIndex((C) => C.id == s), y = Math.min(x, w), $ = Math.max(x, w) + 1, v = c.slice(y, $).map((C) => C.id);
          x > w && v.reverse(), v.forEach((C) => {
            g.includes(C) || g.push(C);
          });
        } else if (o) {
          const m = g.findIndex((x) => x == s);
          m === -1 ? g.push(s) : (d = !0, g.splice(m, 1));
        }
        h = g;
      } else h = [s];
      const f = { selected: h };
      a && h.length && (f._scrollTask = { id: h[0], mode: a }), this.setStateAsync(f), !d && u && u != s && n.exec("show-editor", { id: s });
    }), n.on("delete-link", ({ id: s }) => {
      const { links: o } = this.getState();
      o.remove(s), this.setStateAsync({ links: o });
    }), n.on("update-link", (s) => {
      const { links: o } = this.getState(), { id: i, link: a } = s;
      o.update(i, a), this.setStateAsync({ links: o }), s.link = o.byId(i);
    }), n.on("add-link", (s) => {
      const { link: o } = s, { links: i } = this.getState();
      !o.source || !o.target || (o.type || (o.type = "e2s"), o.id = o.id || Ks(), i.add(o), this.setStateAsync({ links: i }), s.id = o.id, s.link = i.byId(o.id));
    });
    let r = null;
    n.on("move-task", (s) => {
      const { tasks: o } = this.getState();
      let { mode: i, target: a } = s;
      const { id: l, inProgress: c } = s, u = o.byId(l);
      if (typeof c > "u" ? s.source = u.parent : s.source = r = r ?? u.parent, c === !1) {
        o.update(u.id, { $reorder: !1 }), this.setState({ tasks: o }), r = null;
        return;
      }
      if (a === l || o.contains(l, a)) {
        s.skipProvider = !0;
        return;
      }
      if (i === "up" || i === "down") {
        const d = o.getBranch(l);
        let h = o.getIndexById(l);
        if (i === "up") {
          const f = u.parent === 0;
          if (h === 0 && f) {
            s.skipProvider = !0;
            return;
          }
          h -= 1, i = "before";
        } else if (i === "down") {
          const f = h === d.length - 1, g = u.parent === 0;
          if (f && g) {
            s.skipProvider = !0;
            return;
          }
          h += 1, i = "after";
        }
        if (a = d[h] && d[h].id || u.parent, a) {
          const f = o.getBranch(a);
          let g = o.getIndexById(a), m = f[g];
          if (m.data) {
            if (i === "before") {
              if (m.parent === u.parent) {
                for (; m.data; ) m.open || n.exec("open-task", { id: m.id, mode: !0 }), m = m.data[m.data.length - 1];
                a = m.id;
              }
            } else if (i === "after") {
              let y;
              m.parent === u.parent ? (y = m, m = m.data[0], a = m.id, i = "before") : f.length - 1 !== g && (y = m, g += 1, m = f[g], u.$level > m.$level && m.data ? (y = m, m = m.data[0], a = m.id, i = "before") : a = m.id), y && !y.open && n.exec("open-task", { id: y.id, mode: !0 });
            }
          }
          const x = o.getSummaryId(u.id);
          o.move(l, i, a);
          const w = o.getSummaryId(l);
          x != w && (x && this.resetSummaryDates(x, "move-task"), w && this.resetSummaryDates(w, "move-task"));
        }
      } else {
        const d = o.byId(a);
        let h = d, f = !1;
        for (; h.$level > u.$level; ) h = o.byId(h.parent), h.id === l && (f = !0);
        if (f) return;
        const g = o.getSummaryId(u.id);
        if (o.move(l, i, a), i == "child") {
          let x = d;
          for (; x.id !== 0 && !x.open; ) n.exec("open-task", { id: x.id, mode: !0 }), x = o.byId(x.parent);
        }
        const m = o.getSummaryId(l);
        g != m && (g && this.resetSummaryDates(g, "move-task"), m && this.resetSummaryDates(m, "move-task"));
      }
      c ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }), s.target = a, s.mode = i;
    }), n.on("drag-task", (s) => {
      const { id: o, width: i, left: a, top: l, inProgress: c } = s, u = this.getState(), { tasks: d, _tasks: h, _selected: f, _scales: g, cellWidth: m } = u, x = { _tasks: h, _selected: f }, w = d.byId(o);
      typeof i < "u" && (w.$w = i, rr(d, w, g, m)), typeof a < "u" && (w.type === "summary" && mo(w, a - w.$x), w.$x = a, rr(d, w, g, m)), typeof l < "u" && (w.$y = l + 4, w.$reorder = c), typeof i < "u" && (w.$w = i), typeof a < "u" && (w.$x = a), typeof l < "u" && (w.$y = l + 4, w.$reorder = c), this.setState(x);
    }), n.on("update-task", (s) => {
      const { id: o, task: i, eventSource: a } = s;
      let l = s.diff;
      const { tasks: c, _scales: u, durationUnit: d } = this.getState(), h = c.byId(o);
      if (a === "add-task" || a === "copy-task" || a === "move-task" || a === "update-task" || a === "delete-task") {
        as(h, i, d), c.update(o, i);
        return;
      }
      const f = u.lengthUnit, g = Ze(f), m = $r(f);
      if (l && (i.start && (i.start = g(i.start, l)), i.end && (i.end = g(i.end, l))), i.start && i.end) {
        if ((!Mt(i.start, h.start) || !Mt(i.end, h.end)) && h.type === "summary" && (!i.type || i.type === "summary") && h.data?.length) {
          if (!l && (l = m(i.start, h.start), m(i.end, h.end) !== l)) return;
          this.moveSummaryKids(h, (w) => g(w, l), "update-task");
        }
      } else if (h.type == "summary" && (i.start && !i.end || i.end && !i.start || i.duration)) return;
      as(h, i, d), c.update(o, i), i.type === "summary" && h.type !== "summary" && this.resetSummaryDates(o, "update-task");
      const x = c.getSummaryId(o);
      x && this.resetSummaryDates(x, "update-task"), this.setStateAsync({ tasks: c }), s.task = c.byId(o);
    }), n.on("add-task", (s) => {
      const { tasks: o, _scales: i, baselines: a, unscheduledTasks: l, durationUnit: c } = this.getState(), { target: u, mode: d, task: h, show: f } = s;
      h.unscheduled = l;
      let g = -1, m, x;
      if (u ? (x = o.byId(u), d == "child" ? (m = x, h.parent = m.id) : (x.parent !== null && (m = o.byId(x.parent), h.parent = m.id), g = o.getIndexById(u), d == "after" && (g += 1))) : h.parent && (m = o.byId(h.parent)), !h.start) {
        if (m?.start) h.start = new Date(m.start.valueOf());
        else if (x) h.start = new Date(x.start.valueOf());
        else {
          const $ = o.getBranch(0);
          let v;
          if ($?.length) {
            const C = $[$.length - 1];
            if (!C.$skip) {
              const D = new Date(C.start.valueOf());
              i.start <= D && (v = D);
            }
          }
          h.start = v || Ze(c)(i.start, 1);
        }
        h.duration = 1, a && (h.base_start = h.start, h.base_duration = h.duration);
      }
      Qt(h, c);
      const w = o.add(h, g);
      if (m) for (; m && m.id; ) n.exec("open-task", { id: m.id, mode: !0 }), m = o.byId(m.parent);
      s.id = w.id;
      const y = o.getSummaryId(w.id);
      y && this.resetSummaryDates(y, "add-task"), this.setStateAsync({ tasks: o }), n.exec("select-task", { id: w.id, show: f || !1 }), s.id = w.id, s.task = w;
    }), n.on("delete-task", (s) => {
      const { id: o } = s, { tasks: i, links: a, selected: l } = this.getState();
      s.source = i.byId(o).parent;
      const c = i.getSummaryId(o), u = [o];
      i.eachChild((h) => u.push(h.id), o), a.filter((h) => !(u.includes(h.source) || u.includes(h.target)));
      const d = { tasks: i, links: a };
      l.includes(o) && (d.selected = l.filter((h) => h !== o)), i.remove(o), c && this.resetSummaryDates(c, "delete-task"), this.setStateAsync(d);
    }), n.on("indent-task", ({ id: s, mode: o }) => {
      const { tasks: i } = this.getState();
      if (o) {
        const a = i.getBranch(s)[i.getIndexById(s) - 1];
        a && n.exec("move-task", { id: s, mode: "child", target: a.id });
      } else {
        const a = i.byId(s), l = i.byId(a.parent);
        l && l.parent !== null && n.exec("move-task", { id: s, mode: "after", target: a.parent });
      }
    }), n.on("copy-task", (s) => {
      const { id: o, target: i, mode: a, eventSource: l } = s;
      if (l === "copy-task") return;
      const { tasks: c, links: u } = this.getState();
      if (c.contains(o, i)) {
        s.skipProvider = !0;
        return;
      }
      const d = c.getSummaryId(o), h = c.getSummaryId(i);
      let f = c.getIndexById(i);
      a == "before" && (f -= 1);
      const g = c.byId(o), m = c.copy(g, c.byId(i).parent, f + 1);
      s.source = s.id, s.id = m[0][1], g.lazy && (s.lazy = !0), d != h && h && this.resetSummaryDates(h, "copy-task");
      let x = [];
      for (let w = 1; w < m.length; w++) {
        const [y, $] = m[w];
        u.forEach((v) => {
          if (v.source === y) {
            const C = { ...v };
            delete C.target, x.push({ ...C, source: $ });
          } else if (v.target === y) {
            const C = { ...v };
            delete C.source, x.push({ ...C, target: $ });
          }
        });
      }
      x = x.reduce((w, y) => {
        const $ = w.findIndex((v) => v.id === y.id);
        return $ > -1 ? w[$] = { ...w[$], ...y } : w.push(y), w;
      }, []);
      for (let w = 1; w < m.length; w++) {
        const [y, $] = m[w], v = c.byId($);
        n.exec("copy-task", { source: y, id: $, lazy: !!v.lazy, eventSource: "copy-task", target: v.parent, mode: "child" });
      }
      x.forEach((w) => {
        n.exec("add-link", { link: { source: w.source, target: w.target, type: w.type } });
      }), this.setStateAsync({ tasks: c });
    }), n.on("open-task", ({ id: s, mode: o }) => {
      const { tasks: i } = this.getState(), a = i.byId(s);
      a.lazy ? n.exec("request-data", { id: a.id }) : (i.toArray().forEach((l) => l.$y = 0), i.update(s, { open: o }), this.setState({ tasks: i }));
    }), n.on("scroll-chart", ({ left: s, top: o }) => {
      if (!isNaN(s)) {
        const i = this.calcScaleDate(s);
        this.setState({ scrollLeft: s, _scaleDate: i });
      }
      isNaN(o) || this.setState({ scrollTop: o });
    }), n.on("render-data", (s) => {
      this.setState({ area: s });
    }), n.on("provide-data", (s) => {
      const { tasks: o, links: i } = this.getState(), a = o.byId(s.id);
      a.lazy ? (a.lazy = !1, a.open = !0) : a.data = [], o.parse(s.data.tasks, s.id), this.setStateAsync({ tasks: o, links: new Xr(i.map((l) => l).concat(s.data.links)) });
    }), n.on("zoom-scale", ({ dir: s, offset: o }) => {
      const { zoom: i, cellWidth: a, _cellWidth: l, scrollLeft: c } = this.getState(), u = o + c, d = this.calcScaleDate(u);
      let h = a;
      s < 0 && (h = l || a);
      const f = h + s * 50, g = i.levels[i.level], m = s < 0 && a > g.maxCellWidth;
      if (f < g.minCellWidth || f > g.maxCellWidth || m) {
        if (!this.changeScale(i, s)) return;
      } else this.setState({ cellWidth: f, _cellWidth: f });
      const { _scales: x, _start: w, cellWidth: y } = this.getState(), $ = nt(x.minUnit, w), v = x.diff(d, $, "hour");
      typeof o > "u" && (o = y);
      let C = Math.round(v * y) - o;
      C < 0 && (C = 0), this.setState({ scrollLeft: C, _scaleDate: d, _zoomOffset: o });
    }), n.on("expand-scale", ({ minWidth: s }) => {
      const { _start: o, _scales: i, start: a, end: l, _end: c, cellWidth: u, _scaleDate: d, _zoomOffset: h } = this.getState(), f = Ze(i.minUnit);
      let g = i.width;
      if (a && l) {
        if (g < s && g) {
          const $ = s / g;
          this.setState({ cellWidth: u * $ });
        }
        return !0;
      }
      let m = 0;
      for (; g < s; ) g += u, m++;
      const x = m ? l ? -m : -1 : 0, w = a || f(o, x);
      let y = 0;
      if (d) {
        const $ = i.diff(d, w, "hour");
        y = Math.max(0, Math.round($ * u) - (h || 0));
      }
      this.setState({ _start: w, _end: l || f(c, m), scrollLeft: y });
    }), n.on("sort-tasks", ({ key: s, order: o, add: i }) => {
      const a = this.getState(), { tasks: l } = a;
      let c = a._sort;
      const u = { key: s, order: o };
      let d = c?.length || 0;
      d && i ? (c.forEach((h, f) => {
        h.key === s && (d = f);
      }), c[d] = u) : c = [u], l.sort(c), this.setState({ _sort: c, tasks: l });
    }), n.on("hotkey", ({ key: s, event: o, eventSource: i }) => {
      switch (s) {
        case "arrowup":
        case "arrowdown": {
          const { selected: a, _tasks: l } = this.getState();
          o.preventDefault();
          const c = a.length;
          let u;
          if (s === "arrowup" ? u = c ? this.getPrevRow(a[c - 1])?.id : l[l.length - 1]?.id : u = c ? this.getNextRow(a[c - 1])?.id : l[0]?.id, u) {
            const d = i === "chart" ? "xy" : !0;
            this.in.exec("select-task", { id: u, show: d });
          }
          break;
        }
        case "ctrl+c": {
          Dt(this, "copy-task", null, null);
          break;
        }
        case "ctrl+x": {
          Dt(this, "cut-task", null, null);
          break;
        }
        case "ctrl+v": {
          Dt(this, "paste-task", null, null);
          break;
        }
        case "ctrl+d":
        case "backspace": {
          o.preventDefault(), Dt(this, "delete-task", null, null);
          break;
        }
      }
    });
  }
  init(e) {
    const n = this.getState().area ? {} : { scrollLeft: 0, scrollTop: 0, area: { from: 0, start: 0, end: 0 } };
    if (e.cellWidth && (e._cellWidth = e.cellWidth), e._sort = null, dc() && (e.unscheduledTasks = !1, e.baselines = !1, e.markers = []), Array.isArray(e.tasks) && e.tasks.forEach((r) => Qt(r, e.durationUnit)), this._router.init({ _scrollTask: null, selected: [], markers: [], autoScale: !0, durationUnit: "day", ...n, ...e }), e.zoom) {
      const r = nc(e.zoom, e.scales, e.cellWidth);
      this.setState({ zoom: r._zoom, cellWidth: r.cellWidth, _cellWidth: r.cellWidth, scales: r.scales });
    }
  }
  setState(e, n) {
    return this._router.setState(e, n);
  }
  setStateAsync(e) {
    this._router.setStateAsync(e);
  }
  getTask(e) {
    const { tasks: n } = this.getState();
    return n.byId(e);
  }
  serialize() {
    const { tasks: e } = this.getState();
    return e.serialize();
  }
  changeScale(e, n) {
    const r = e.level + n, s = e.levels[r];
    if (s) {
      const { cellWidth: o, scales: i, _scales: a } = this.getState(), l = rc(e, n, r, s, a.lengthUnit, i, o);
      return l._cellWidth = l.cellWidth, this.setState(l), !0;
    }
    return !1;
  }
  isScheduled(e) {
    return this.getState().unscheduledTasks ? e.some((n) => !n.unscheduled || n.data && this.isScheduled(n.data)) : !0;
  }
  resetSummaryDates(e, n) {
    const { tasks: r } = this.getState(), s = r.byId(e), o = s.data;
    if (o?.length && this.isScheduled(o)) {
      const i = kr({ ...s, start: void 0, end: void 0, duration: void 0 });
      if (!Mt(s.start, i.start) || !Mt(s.end, i.end)) {
        this.in.exec("update-task", { id: e, task: i, eventSource: n });
        const a = r.getSummaryId(e);
        a && this.resetSummaryDates(a, n);
      }
    }
  }
  moveSummaryKids(e, n, r) {
    const { tasks: s } = this.getState();
    e.data.forEach((o) => {
      const i = { ...s.byId(o.id), start: n(o.start) };
      i.type !== "milestone" && (i.end = n(o.end)), delete i.id, this.in.exec("update-task", { id: o.id, task: i, eventSource: r }), o.data?.length && this.moveSummaryKids(o, n, r);
    });
  }
  calcScaleDate(e) {
    const { _scales: n, _start: r } = this.getState(), s = n.lengthUnit === "day" ? n.lengthUnitWidth / 24 : n.lengthUnitWidth;
    return Ze("hour")(nt(n.minUnit, r), Math.floor(e / s));
  }
  getNextRow(e) {
    const n = this.getState()._tasks, r = n.findIndex((s) => s.id == e);
    return n[r + 1];
  }
  getPrevRow(e) {
    const n = this.getState()._tasks, r = n.findIndex((s) => s.id == e);
    return n[r - 1];
  }
}
function wc(t, e, n, r) {
  if (typeof document > "u") return "";
  const s = document.createElement("canvas");
  {
    const o = xc(s, t, e, 1, n);
    yc(o, r, 0, t, 0, e);
  }
  return s.toDataURL();
}
function xc(t, e, n, r, s) {
  t.setAttribute("width", (e * r).toString()), t.setAttribute("height", (n * r).toString());
  const o = t.getContext("2d");
  return o.translate(-0.5, -0.5), o.strokeStyle = s, o;
}
function yc(t, e, n, r, s, o) {
  t.beginPath(), t.moveTo(r, s), t.lineTo(r, o), e === "full" && t.lineTo(n, o), t.stroke();
}
function _r(t) {
  return t.map((e) => {
    switch (e.data && _r(e.data), e.id) {
      case "add-task:before":
      case "move-task:up":
        e.check = (n, r) => !bc(n, r);
        break;
      case "move-task:down":
        e.check = (n, r) => !kc(n, r);
        break;
      case "indent-task:add":
        e.check = (n, r) => $c(n, r) !== n.parent;
        break;
      case "indent-task:remove":
        e.check = (n) => !vc(n);
        break;
    }
    return e;
  });
}
function vc(t) {
  return t.parent === 0;
}
function bc(t, e) {
  return e[0]?.id === t.id;
}
function kc(t, e) {
  return e[e.length - 1]?.id === t.id;
}
function $c(t, e) {
  const n = e.findIndex((r) => r.id === t.id);
  return e[n - 1]?.id ?? t.parent;
}
const Sc = (t) => (e) => e.type !== t, ar = _r([{ id: "add-task", text: "Add", icon: "wxi-plus", data: [{ id: "add-task:child", text: "Child task" }, { id: "add-task:before", text: "Task above" }, { id: "add-task:after", text: "Task below" }] }, { type: "separator" }, { id: "convert-task", text: "Convert to", icon: "wxi-swap-horizontal", dataFactory: (t) => ({ id: `convert-task:${t.id}`, text: `${t.label}`, check: Sc(t.id) }) }, { id: "edit-task", text: "Edit", icon: "wxi-edit", subtext: "Ctrl+E" }, { id: "cut-task", text: "Cut", icon: "wxi-content-cut", subtext: "Ctrl+X" }, { id: "copy-task", text: "Copy", icon: "wxi-content-copy", subtext: "Ctrl+C" }, { id: "paste-task", text: "Paste", icon: "wxi-content-paste", subtext: "Ctrl+V" }, { id: "move-task", text: "Move", icon: "wxi-swap-vertical", data: [{ id: "move-task:up", text: "Up" }, { id: "move-task:down", text: "Down" }] }, { type: "separator" }, { id: "indent-task:add", text: "Indent", icon: "wxi-indent" }, { id: "indent-task:remove", text: "Outdent", icon: "wxi-unindent" }, { type: "separator" }, { id: "delete-task", icon: "wxi-delete", text: "Delete", subtext: "Ctrl+D / BS" }]), lr = _r([{ id: "add-task", comp: "button", icon: "wxi-plus", text: "New task", type: "primary" }, { id: "edit-task", comp: "icon", icon: "wxi-edit", menuText: "Edit", text: "Ctrl+E" }, { id: "delete-task", comp: "icon", icon: "wxi-delete", menuText: "Delete", text: "Ctrl+D, Backspace" }, { comp: "separator" }, { id: "move-task:up", comp: "icon", icon: "wxi-angle-up", menuText: "Move up" }, { id: "move-task:down", comp: "icon", icon: "wxi-angle-down", menuText: "Move down" }, { comp: "separator" }, { id: "copy-task", comp: "icon", icon: "wxi-content-copy", menuText: "Copy", text: "Ctrl+V" }, { id: "cut-task", comp: "icon", icon: "wxi-content-cut", menuText: "Cut", text: "Ctrl+X" }, { id: "paste-task", comp: "icon", icon: "wxi-content-paste", menuText: "Paste", text: "Ctrl+V" }, { comp: "separator" }, { id: "indent-task:add", comp: "icon", icon: "wxi-indent", menuText: "Indent" }, { id: "indent-task:remove", comp: "icon", icon: "wxi-unindent", menuText: "Outdent" }]), So = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type" }, { key: "start", comp: "date", label: "Start date" }, { key: "end", comp: "date", label: "End date" }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 } }, { key: "unscheduled", comp: "twostate", label: "", config: { value: !0, text: "Unschedule", textActive: "Schedule" } }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 } }, { key: "links", comp: "links", label: "" }], _o = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], ct = Xt(null);
(/* @__PURE__ */ new Date()).valueOf();
function _c(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n], s = e[n];
    if (!nn(r, s)) return !1;
  }
  return !0;
}
function nn(t, e) {
  if (typeof t == "number" || typeof t == "string" || typeof t == "boolean" || t === null) return t === e;
  if (typeof t != typeof e || (t === null || e === null) && t !== e || t instanceof Date && e instanceof Date && t.getTime() !== e.getTime()) return !1;
  if (typeof t == "object") if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    for (let n = t.length - 1; n >= 0; n--) if (!nn(t[n], e[n])) return !1;
    return !0;
  } else return _c(t, e);
  return t === e;
}
function cr(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(cr);
  const e = {};
  for (const n in t) e[n] = cr(t[n]);
  return e;
}
var Co = 2, Cc = class {
  constructor(e) {
    e && (this._writable = e.writable, this._async = e.async), this._values = {}, this._state = {};
  }
  setState(e, n = 0) {
    const r = {};
    return this._wrapProperties(e, this._state, this._values, "", r, n), r;
  }
  getState() {
    return this._values;
  }
  getReactive() {
    return this._state;
  }
  _wrapProperties(e, n, r, s, o, i) {
    for (const a in e) {
      const l = n[a], c = r[a], u = e[a];
      if (l && (c === u && typeof u != "object" || u instanceof Date && c instanceof Date && c.getTime() === u.getTime())) continue;
      const d = s + (s ? "." : "") + a;
      l ? (l.__parse(u, d, o, i) && (r[a] = u), i & Co ? o[d] = l.__trigger : l.__trigger()) : (u && u.__reactive ? n[a] = this._wrapNested(u, u, d, o) : n[a] = this._wrapWritable(u), r[a] = u), o[d] = o[d] || null;
    }
  }
  _wrapNested(e, n, r, s) {
    const o = this._wrapWritable(e);
    return this._wrapProperties(e, o, n, r, s, 0), o.__parse = (i, a, l, c) => (this._wrapProperties(i, o, n, a, l, c), !1), o;
  }
  _wrapWritable(e) {
    const n = [], r = function() {
      for (let s = 0; s < n.length; s++) n[s](e);
    };
    return { subscribe: (s) => (n.push(s), this._async ? setTimeout(s, 1, e) : s(e), () => {
      const o = n.indexOf(s);
      o >= 0 && n.splice(o, 1);
    }), __trigger: () => {
      n.length && (this._async ? setTimeout(r, 1) : r());
    }, __parse: function(s) {
      return e = s, !0;
    } };
  }
}, Mc = class {
  constructor(t, e, n, r) {
    typeof t == "function" ? this._setter = t : this._setter = t.setState.bind(t), this._routes = e, this._parsers = n, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((s) => {
      s.in.forEach((o) => {
        const i = this._triggers.get(o) || [];
        i.push(s), this._triggers.set(o, i);
      }), s.out.forEach((o) => {
        const i = this._sources.get(o) || {};
        s.in.forEach((a) => i[a] = !0), this._sources.set(o, i);
      });
    }), this._routes.forEach((s) => {
      s.length = Math.max(...s.in.map((o) => Mo(o, this._sources, 1)));
    }), this._bus = r;
  }
  init(t) {
    const e = {};
    for (const n in t) if (this._prev[n] !== t[n]) {
      const r = this._parsers[n];
      e[n] = r ? r(t[n]) : t[n];
    }
    this._prev = this._prev ? { ...this._prev, ...t } : { ...t }, this.setState(e), this._bus && this._bus.exec("init-state", e);
  }
  setStateAsync(t) {
    const e = this._setter(t, Co);
    return this._async ? Object.assign(this._async.signals, e) : this._async = { signals: e, timer: setTimeout(this._applyState.bind(this), 1) }, e;
  }
  _applyState() {
    const t = this._async;
    if (t) {
      this._async = null, this._triggerUpdates(t.signals, []);
      for (const e in t.signals) {
        const n = t.signals[e];
        n && n();
      }
    }
  }
  setState(t, e = []) {
    const n = this._setter(t);
    return this._triggerUpdates(n, e), n;
  }
  _triggerUpdates(t, e) {
    const n = Object.keys(t), r = !e.length;
    e = e || [];
    for (let s = 0; s < n.length; s++) {
      const o = n[s], i = this._triggers.get(o);
      i && i.forEach((a) => {
        e.indexOf(a) == -1 && e.push(a);
      });
    }
    r && this._execNext(e);
  }
  _execNext(t) {
    for (; t.length; ) {
      t.sort((n, r) => n.length < r.length ? 1 : -1);
      const e = t[t.length - 1];
      t.splice(t.length - 1), e.exec(t);
    }
  }
};
function Mo(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => Mo(o, e, n + 1));
  return Math.max(...s);
}
var Dc = class {
  constructor() {
    this._nextHandler = null, this._handlers = {}, this._tag = /* @__PURE__ */ new WeakMap(), this.exec = this.exec.bind(this);
  }
  on(e, n, r) {
    let s = this._handlers[e];
    s ? r && r.intercept ? s.unshift(n) : s.push(n) : s = this._handlers[e] = [n], r && r.tag && this._tag.set(n, r.tag);
  }
  intercept(e, n, r) {
    this.on(e, n, { ...r, intercept: !0 });
  }
  detach(e) {
    for (const n in this._handlers) {
      const r = this._handlers[n];
      for (let s = r.length - 1; s >= 0; s--) this._tag.get(r[s]) === e && r.splice(s, 1);
    }
  }
  async exec(e, n) {
    const r = this._handlers[e];
    if (r) for (let s = 0; s < r.length; s++) {
      const o = r[s](n);
      if (o === !1 || o && o.then && await o === !1) return;
    }
    return this._nextHandler && await this._nextHandler.exec(e, n), n;
  }
  setNext(e) {
    return this._nextHandler = e;
  }
};
function Nc(t) {
  return (e) => e[t];
}
function Tc(t) {
  return (e, n) => e[t] = n;
}
function yt(t, e) {
  return (e.getter || Nc(e.id))(t);
}
function us(t, e, n) {
  return (e.setter || Tc(e.id))(t, n);
}
function ds(t, e) {
  const n = document.createElement("a");
  n.href = URL.createObjectURL(t), n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
function Ht(t, e) {
  let n = yt(t, e) ?? "";
  return e.template && (n = e.template(n, t, e)), e.optionsMap && (Array.isArray(n) ? n = n.map((r) => e.optionsMap.get(r)) : n = e.optionsMap.get(n)), typeof n > "u" ? "" : n + "";
}
function Ec(t, e) {
  const n = /\n|"|;|,/;
  let r = "";
  const s = e.rows || `
`, o = e.cols || "	", i = t._columns, a = t.flatData;
  e.header !== !1 && i[0].header && (r = hs("header", i, r, o, s));
  for (let l = 0; l < a.length; l++) {
    const c = [];
    for (let u = 0; u < i.length; u++) {
      let d = Ht(a[l], i[u]);
      n.test(d) && (d = '"' + d.replace(/"/g, '""') + '"'), c.push(d);
    }
    r += (r ? s : "") + c.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = hs("footer", i, r, o, s)), r;
}
function hs(t, e, n, r, s) {
  const o = /\n|"|;|,/;
  for (let i = 0; i < e[0][t].length; i++) {
    const a = [];
    for (let l = 0; l < e.length; l++) {
      let c = (e[l][t][i].text || "") + "";
      o.test(c) && (c = '"' + c.replace(/"/g, '""') + '"'), a.push(c);
    }
    n += (n ? s : "") + a.join(r);
  }
  return n;
}
function Rc(t, e, n) {
  const r = [], s = [], o = [];
  let i = [];
  const a = t._columns, l = t.flatData, c = t._sizes;
  for (const d of a) o.push({ width: d.flexgrow ? c.columnWidth : d.width });
  let u = 0;
  e.header !== !1 && a[0].header && (fs("header", a, r, s, u, e, n), i = i.concat(c.headerRowHeights.map((d) => ({ height: d }))), u += a[0].header.length);
  for (let d = 0; d < l.length; d++) {
    const h = [];
    for (let f = 0; f < a.length; f++) {
      const g = l[d], m = a[f], x = yt(g, m) ?? "";
      let w = Ht(g, m), y;
      e.cellStyle && (y = e.cellStyle(x, g, m)), e.cellTemplate && (w = e.cellTemplate(x, g, m) ?? w);
      const $ = Do(w, 2, y, n);
      h.push($);
    }
    r.push(h), i.push({ height: c.rowHeight });
  }
  return u += l.length, e.footer !== !1 && a[0].footer && (fs("footer", a, r, s, u, e, n), i = i.concat(c.footerRowHeights.map((d) => ({ height: d })))), { cells: r, merged: s, rowSizes: i, colSizes: o, styles: n };
}
function fs(t, e, n, r, s, o, i) {
  for (let a = 0; a < e[0][t].length; a++) {
    const l = [];
    for (let c = 0; c < e.length; c++) {
      const u = e[c][t][a], d = u.colspan ? u.colspan - 1 : 0, h = u.rowspan ? u.rowspan - 1 : 0;
      (d || h) && r.push({ from: { row: a + s, column: c }, to: { row: a + s + h, column: c + d } });
      let f = u.text ?? "", g;
      o.headerCellStyle && (g = o.headerCellStyle(f, u, e[c], t)), o.headerCellTemplate && (f = o.headerCellTemplate(f, u, e[c], t) ?? f);
      let m;
      t == "header" ? a == e[0][t].length - 1 ? m = 1 : m = 0 : a ? m = 4 : m = 3;
      const x = Do(f, m, g, i);
      l.push(x);
    }
    n.push(l);
  }
}
function Do(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = Oc(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((i) => nn(i, n));
    o < 0 ? (r.push(n), s = r.length - 1) : s = o;
  }
  return { v: t + "", s };
}
function Ac(t) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, n = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, r = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, o = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, i = e[t], a = "0.5px solid " + o[t], l = { verticalAlign: "center", align: "left" }, c = { fontWeight: "bold", color: i, background: r[t], ...l, borderBottom: a, borderRight: a };
  return { cell: { color: i, background: n[t], borderBottom: s[t], borderRight: s[t], ...l }, header: { ...c }, footer: { ...c } };
}
function Oc(t) {
  return t ? 25569 + (t.getTime() - t.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const Lc = "portrait", Ic = 100, Hc = "a4", Wc = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function Pc(t, e) {
  const n = [];
  let r = [], s = 0;
  const o = t.filter((a) => !a.hidden), i = Yc(e);
  return o.forEach((a, l) => {
    s + a.width <= i ? (s += a.width, r.push(a)) : (r.length && n.push(r), r = [a], s = a.width), l === o.length - 1 && r.length && n.push(r);
  }), n;
}
function ms(t, e, n) {
  const r = [];
  return t.forEach((s, o) => {
    const i = s[e];
    for (let a = 0; a < n.length; a++) {
      r[a] || (r[a] = []);
      const l = { ...i[a] };
      if (r[a][o] !== null) {
        if (!o && !l.rowspan && !l.colspan) {
          let c = 1, u = t[o + c][e][a], d = l.width;
          for (; !u.rowspan && !u.colspan; ) c++, u = t[o + c][e][a], d += u.width;
          l.colspan = c, l.width = d, l.height = n[a];
        }
        if (r[a].push(l), !l.collapsed && l.colspan > 1) {
          let c = l.colspan - 1;
          if (l.colspan + o > t.length) {
            const u = l.colspan - (l.colspan + o - t.length);
            l.colspan = u, l.width = t.slice(o, o + c + 1).reduce((d, h) => d + h.width, 0), u > 1 && (c = u - 1);
          }
          for (let u = 0; u < c; u++) r[a].push(null);
        }
        if (l.rowspan > 1) {
          const c = l.rowspan;
          for (let u = 1; u < c; u++) r[a + u] || (r[a + u] = []), r[a + u].push(null);
        }
      }
    }
    if (s.collapsed) for (let a = 0; a < r.length; a++) {
      const l = r[a], c = l[o];
      if (c && c.collapsed) {
        if (l[o] = null, !a) break;
      } else {
        const u = c || l.findLast((d) => d?.colspan >= 1);
        u && (u.colspan = u.colspan - 1, u.width = u.width - s.width);
      }
    }
  }), r.map((s) => s.filter((o) => o && o.colspan !== 0));
}
function Yc(t) {
  const { mode: e, ppi: n, paper: r } = t, { width: s, height: o } = Wc[r];
  return zc(e === "portrait" ? s : o, n);
}
function zc(t, e) {
  return t * e;
}
function Fc(t = {}) {
  const { mode: e, ppi: n, paper: r } = t;
  return { mode: e || Lc, ppi: n || Ic, paper: r || Hc };
}
function No(t, e) {
  return t.flexgrow ? `min-width:${e}px;width:auto` : `width:${t.width}px; max-width:${t.width}px; height:${t.height}px`;
}
function jc(t, e, n) {
  let r = t[n.id];
  if (n.filter.type === "richselect" && r) {
    const s = n.filter.config?.options || e.find(({ id: o }) => o == n.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? "";
}
const ps = ["resize-column", "hide-column", "update-cell"], Vc = ["delete-row", "update-row", "update-cell"], Gc = ["move-item"], Bc = ["resize-column", "move-item"];
class qc {
  undo = [];
  redo = [];
  progress = {};
  in;
  getState;
  setState;
  _previousValues = {};
  constructor(e, n, r) {
    this.in = e, this.getState = n, this.setState = r, this.setHandlers(), this.resetStateHistory();
  }
  getHandlers() {
    return { "add-row": { handler: (e) => ({ action: "delete-row", data: { id: e.id }, source: { action: "add-row", data: e } }) }, "delete-row": { handler: (e) => {
      const { id: n } = e, { data: r } = this.getPrev(), s = r.findIndex((o) => o.id == n);
      return { action: "add-row", data: { id: n, row: r[s], before: s < r.length - 1 ? r[s + 1].id : void 0 }, source: { action: "delete-row", data: e } };
    } }, "update-cell": { handler: (e) => {
      const { id: n, column: r } = e, s = this.getRow(n), o = this.getColumn(r), i = yt(s, o);
      return nn(i, e.value) ? null : { action: "update-cell", data: { id: n, column: r, value: i }, source: { action: "update-cell", data: e } };
    } }, "update-row": { handler: (e) => {
      const { id: n } = e, r = this.getRow(n);
      return { action: "update-row", data: { id: n, row: r }, source: { action: "update-row", data: e } };
    } }, "resize-column": { handler: (e) => {
      const { id: n, width: r } = e, s = this.getColumn(n), { _sizes: o } = this.getState();
      return { action: "resize-column", data: { id: n, width: s.width ?? o.columnWidth }, source: { action: "resize-column", data: { id: n, width: r } } };
    } }, "hide-column": { handler: (e) => {
      const { id: n } = e, r = this.getColumn(n);
      return { action: "hide-column", data: { id: n, mode: r.hidden }, source: { action: "hide-column", data: e } };
    } }, "collapse-column": { handler: (e) => {
      const { id: n, row: r, mode: s } = e;
      return { action: "collapse-column", data: { id: n, row: r, mode: typeof s == "boolean" ? !s : s }, source: { action: "collapse-column", data: e } };
    } }, "move-item": { handler: (e) => {
      const { id: n, target: r, mode: s } = e, { flatData: o } = this.getPrev(), i = o.findIndex((a) => a.id == n);
      return { action: "move-item", data: { id: n, target: o[i + (i ? -1 : 1)].id, mode: i ? "after" : "before" }, source: { action: "move-item", data: { id: n, target: r, mode: s } } };
    } }, "open-row": { handler: (e) => {
      const { id: n, nested: r } = e;
      return { action: "close-row", data: { id: n, nested: r }, source: { action: "open-row", data: e } };
    } }, "close-row": { handler: (e) => {
      const { id: n, nested: r } = e;
      return { action: "open-row", data: { id: n, nested: r }, source: { action: "close-row", data: e } };
    } } };
  }
  resetHistory() {
    this.undo = [], this.redo = [], this.progress = {}, this.resetStateHistory();
  }
  getPrev() {
    return this._previousValues;
  }
  setHandlers() {
    const e = this.getHandlers();
    for (const n in e) this.in.intercept(n, (r) => {
      if (!(r.eventSource === "undo" || r.eventSource === "redo" || r.skipUndo)) {
        if (Bc.includes(n)) {
          (r.inProgress && !this.progress[n] || typeof r.inProgress != "boolean") && (Gc.includes(n) && this.setPrev("flatData"), ps.includes(n) && this.setPrev("columns")), this.progress[n] = r.inProgress;
          return;
        }
        Vc.includes(n) && this.setPrev("data"), ps.includes(n) && this.setPrev("columns");
      }
    }), this.in.on(n, (r) => {
      if (r.eventSource === "undo" || r.eventSource === "redo" || r.skipUndo || r.inProgress) return;
      const s = e[n].handler(r);
      s && this.addToHistory(s);
    });
  }
  setPrev(e) {
    this._previousValues[e] = cr(this.getState()[e]);
  }
  addToHistory(e) {
    this.undo.push(e), this.redo = [], this.setStateHistory();
  }
  handleUndo() {
    if (!this.undo.length) return;
    const e = this.undo.pop();
    this.redo.push({ ...e.source, source: e }), this.in.exec(e.action, { ...e.data, eventSource: "undo" }), this.setStateHistory();
  }
  handleRedo() {
    if (!this.redo.length) return;
    const e = this.redo.pop();
    this.undo.push({ ...e.source, source: e }), this.in.exec(e.action, { ...e.data, eventSource: "redo" }), this.setStateHistory();
  }
  resetStateHistory() {
    this.setState({ history: { undo: 0, redo: 0 } });
  }
  setStateHistory() {
    this.setState({ history: { undo: this.undo.length, redo: this.redo.length } });
  }
  getRow(e) {
    const { data: n } = this.getPrev();
    return this.getState().tree ? this.getTreeRow(n, e) : n.find((r) => r.id == e);
  }
  getTreeRow(e, n) {
    for (let r = 0; r < e.length; r++) {
      if (e[r].id == n) return e[r];
      if (e[r].data) {
        const s = this.getTreeRow(e[r].data, n);
        if (s) return s;
      }
    }
    return null;
  }
  getColumn(e) {
    const { columns: n } = this.getPrev();
    return n.find((r) => r.id == e);
  }
}
function Cr() {
  let t = !0;
  return t = !1, t;
}
function To(t, e) {
  return typeof t > "u" || t === null ? -1 : typeof e > "u" || e === null ? 1 : t === e ? 0 : t > e ? 1 : -1;
}
function Kc(t, e) {
  return -To(t, e);
}
function Uc(t, e) {
  const n = t === "asc" ? To : Kc;
  return function(r, s) {
    return n(yt(r, e), yt(s, e));
  };
}
function Qc(t, e) {
  if (!t || !t.length) return;
  const n = t.map((r) => Uc(r.order, e.find((s) => s.id == r.key)));
  return t.length === 1 ? n[0] : function(r, s) {
    for (let o = 0; o < n.length; o++) {
      const i = n[o](r, s);
      if (i !== 0) return i;
    }
    return 0;
  };
}
const fn = 28, Xc = 20;
function Jc() {
  if (typeof document > "u") return "willow";
  const t = document.querySelector('[class^="wx"][class$="theme"]');
  return t ? t.className.substring(3, t.className.length - 6) : "willow";
}
function Mn(t, e, n, r, s) {
  const o = document.createElement("div"), i = document.createElement("div"), a = document.body;
  s = s ? `${s}px` : "auto";
  let l, c;
  i.className = e, o.classList.add(`wx-${n}-theme`), o.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`, o.appendChild(i), a.appendChild(o), typeof t != "object" && (t = [t]);
  for (let u = 0; u < t.length; u++) {
    i.innerText = t[u] + "";
    const d = o.getBoundingClientRect(), h = Math.ceil(d.width) + (r && r.length ? r[u] : 0), f = Math.ceil(d.height);
    l = Math.max(l || 0, h), c = Math.max(c || 0, f);
  }
  return o.remove(), { width: l, height: c };
}
function gs(t, e, n, r, s) {
  const o = [];
  for (let i = 0; i < t.length; i++) {
    const a = t[i][e], l = a.length;
    for (let c = 0; c < l; c++) {
      const { text: u, vertical: d, collapsed: h, rowspan: f, css: g } = a[c];
      if (!u) {
        o[c] = Math.max(o[c] || 0, r);
        continue;
      }
      let m = 0;
      if (d && !h) {
        let x = `wx-measure-cell-${e}`;
        if (x += g ? ` ${g}` : "", m = Mn(u, x, s).width, (f > 1 || !a[c + 1]) && n > c + 1) {
          const w = f || n - c, y = o.slice(c, c + w).reduce(($, v) => $ + v, 0);
          if (y < m) {
            const $ = Math.ceil((m - y) / w);
            for (let v = c; v < c + w; v++) o[v] = (o[v] || r) + $;
          }
          continue;
        }
      }
      o[c] = Math.max(o[c] || r, m);
    }
  }
  return o;
}
function Zc(t, e, n) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += t.css ? ` ${t.css}` : "";
  for (let i = 0; i < e.length; i++) {
    const a = e[i], l = Ht(a, t);
    l && (r.push(l), t.treetoggle ? s.push(e[i].$level * fn + (e[i].$count ? fn : 0) + (t.draggable ? fn : 0)) : t.draggable && s.push(fn));
  }
  return Mn(r, o, n, s).width;
}
function eu(t, e) {
  const n = "wx-measure-cell-header", r = t.sort ? Xc : 0;
  let s = t.header;
  if (typeof s == "string") return Mn(s, n, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const a = s[i], l = typeof a == "string" ? a : a.text, c = n + (typeof a == "string" ? "" : ` ${a.css}`);
    let u = Mn(l, c, e).width;
    i === s.length - 1 && (u += r), o = Math.max(o || 0, u);
  }
  return o;
}
const tu = { text: (t, e) => t ? t.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e, richselect: (t, e) => typeof e != "number" && !e ? !0 : t == e };
function nu(t) {
  return tu[t];
}
class ru extends Cc {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const n = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new Mc(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: o, sizes: i, _skin: a } = this.getState(), l = this.copyColumns(o), c = l.reduce((h, f) => Math.max(f.header.length, h), 0), u = l.reduce((h, f) => Math.max(f.footer.length, h), 0);
      l.forEach(this.setCollapsibleColumns);
      const d = this.normalizeSizes(l, i, c, u, a);
      l.forEach((h, f) => {
        this.normalizeColumns(l, f, "header", c, d), this.normalizeColumns(l, f, "footer", u, d);
      }), this.setState({ _columns: l, _sizes: d }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData"], exec: (s) => {
      const { data: o, tree: i, _filterIds: a } = this.getState(), l = i ? this.flattenRows(o, [], a) : o.filter((c) => !a || a.includes(c.id));
      this.setState({ flatData: l }, s);
    } }], { sizes: (s) => ({ ...n, ...s }) });
    const r = this.in = new Dc();
    r.on("close-editor", ({ ignore: s }) => {
      const { editor: o } = this.getState();
      o && (s || r.exec("update-cell", o), this.setState({ editor: null }));
    }), r.on("open-editor", ({ id: s, column: o }) => {
      let i = this.getState().editor;
      i && r.exec("close-editor", {});
      const a = this.getRow(s), l = o ? this.getColumn(o) : this.getNextEditor(a);
      if (l?.editor) {
        let c = l.editor;
        if (typeof c == "function" && (c = c(a, l)), !c) return;
        i = { column: l.id, id: s, value: yt(a, l) ?? "", renderedValue: Ht(a, l) }, typeof c == "object" && c.config && (i.config = c.config, c.config.options && (i.options = c.config.options)), l.options && !i.options && (i.options = l.options), this.setState({ editor: i });
      }
    }), r.on("editor", ({ value: s }) => {
      const o = this.getState().editor;
      o && (o.value = s, this.setState({ editor: o }));
    }), r.on("add-row", (s) => {
      const o = this.getState();
      let { data: i } = o;
      const { select: a, _filterIds: l } = o, { row: c, before: u, after: d, select: h } = s;
      if (s.id = c.id = s.id || c.id || Gn(), u || d) {
        const g = u || d, m = i.findIndex((x) => x.id === g);
        i.splice(m + (d ? 1 : 0), 0, s.row), i = [...i];
      } else i = [...i, s.row];
      const f = { data: i };
      l && (f._filterIds = [...l, s.id]), this.setState(f), !(typeof h == "boolean" && !h) && (h || a) && r.exec("select-row", { id: c.id, show: !0 });
    }), r.on("delete-row", (s) => {
      const { data: o, selectedRows: i, focusCell: a } = this.getState(), { id: l } = s, c = { data: o.filter((u) => u.id !== l) };
      this.isSelected(l) && (c.selectedRows = i.filter((u) => u !== l)), this.setState(c), a?.row === l && this.in.exec("focus-cell", { eventSource: "delete-row" });
    }), r.on("update-cell", (s) => {
      const o = this.getState();
      let { data: i } = o;
      i = [...i];
      const { tree: a } = o, { id: l, column: c, value: u } = s, d = this.getColumn(c);
      if (a) {
        const h = { ...this._branches[l] };
        us(h, d, u);
        const f = this.updateTreeRow(h);
        h.$parent === 0 && (i = f);
      } else {
        const h = i.findIndex((g) => g.id == l), f = { ...i[h] };
        us(f, d, u), i[h] = f;
      }
      this.setState({ data: i });
    }), r.on("update-row", (s) => {
      let { data: o } = this.getState();
      const { id: i, row: a } = s, l = o.findIndex((c) => c.id == i);
      o = [...o], o[l] = { ...o[l], ...a }, this.setState({ data: o });
    }), r.on("select-row", ({ id: s, toggle: o, range: i, mode: a, show: l, column: c }) => {
      const u = this.getState(), { focusCell: d } = u;
      let { selectedRows: h } = u;
      if (h.length || (i = o = !1), i) {
        const { data: f } = this.getState();
        let g = f.findIndex((x) => x.id == h[h.length - 1]), m = f.findIndex((x) => x.id == s);
        g > m && ([g, m] = [m, g]), f.slice(g, m + 1).forEach((x) => {
          h.indexOf(x.id) === -1 && h.push(x.id);
        });
      } else if (o && this.isSelected(s)) {
        if (a === !0) return;
        h = h.filter((f) => f !== s);
      } else if (o) {
        if (a === !1) return;
        h.push(s);
      } else h = [s];
      this.setState({ selectedRows: h }), d?.row !== s && this.in.exec("focus-cell", { eventSource: "select-row" }), l && this.in.exec("scroll", { row: s, column: c });
    }), this.in.on("focus-cell", (s) => {
      const { row: o, column: i, eventSource: a } = s, { _columns: l, split: c } = this.getState();
      o && i ? (this.setState({ focusCell: { row: o, column: i } }), a !== "click" && ((!c.left || l.findIndex((u) => u.id == s.column) >= c.left) && (!c.right || l.findIndex((u) => u.id == s.column) < l.length - c.right) ? this.in.exec("scroll", { row: o, column: i }) : this.in.exec("scroll", { row: o }))) : this.setState({ focusCell: null });
    }), r.on("resize-column", (s) => {
      const { id: o, auto: i, maxRows: a, inProgress: l } = s;
      if (l === !1) return;
      let c = s.width || 0;
      const u = [...this.getState().columns], d = u.find((h) => h.id == o);
      if (i) {
        if (i == "data" || i === !0) {
          const { flatData: h, _skin: f } = this.getState();
          let g = h.length;
          a && (g = Math.min(a, g));
          const m = h.slice(0, g);
          c = Zc(d, m, f);
        }
        if (i == "header" || i === !0) {
          const { _skin: h } = this.getState();
          c = Math.max(eu(d, h), c);
        }
      }
      d.width = Math.max(17, c), delete d.flexgrow, this.setState({ columns: u });
    }), r.on("hide-column", (s) => {
      const { id: o, mode: i } = s, a = [...this.getState().columns], l = a.find((u) => u.id == o), c = a.reduce((u, d) => u + (d.hidden ? 0 : 1), 0);
      !i || c > 1 ? (l.hidden = !l.hidden, this.setState({ columns: a })) : s.skipUndo = !0;
    }), r.on("sort-rows", (s) => {
      const { key: o, add: i } = s;
      let { order: a = "asc" } = s;
      const l = this.getState();
      let c = l.sortMarks;
      const { columns: u, data: d, tree: h } = l, f = Object.keys(c), g = f.length;
      c[o] && (a = c[o].order === "asc" ? "desc" : "asc"), !i || !g || g === 1 && c[o] ? c = { [o]: { order: a } } : (g === 1 && (c[f[0]] = { ...c[f[0]], index: 0 }), c = { ...c, [o]: { order: a, index: c[o]?.index ?? g } });
      const m = Object.keys(c).sort((w, y) => c[w].index - c[y].index).map((w) => ({ key: w, order: c[w].order }));
      this.setState({ sortMarks: c });
      const x = Qc(m, u);
      if (x) {
        const w = [...d];
        h ? this.sortTree(w, x) : w.sort(x), this.setState({ data: w });
      }
    }), r.on("filter-rows", (s) => {
      const { value: o, key: i, filter: a } = s;
      if (!Object.keys(s).length) {
        this.setState({ filterValues: {}, _filterIds: null });
        return;
      }
      const l = this.getState(), { data: c, tree: u } = l;
      let d = l.filterValues;
      const h = {};
      i && (d = { ...d, [i]: o }, h.filterValues = d);
      const f = a ?? this.createFilter(d);
      let g = [];
      u ? g = this.filterTree(c, f, g) : c.forEach((m) => {
        f(m) && g.push(m.id);
      }), h._filterIds = g, this.setState(h);
    }), r.on("collapse-column", (s) => {
      const { id: o, row: i, mode: a } = s, l = [...this.getState().columns], c = this.getColumn(o).header, u = Array.isArray(c) ? c[i] : c;
      typeof u == "object" && (u.collapsed = a ?? !u.collapsed, this.setState({ columns: l }));
    }), r.on("move-item", (s) => {
      const { id: o, target: i, mode: a = "after", inProgress: l } = s, { data: c, flatData: u, tree: d } = this.getState(), h = u.findIndex((m) => m.id == o), f = u.findIndex((m) => m.id == i);
      if (h === -1 || f === -1 || l === !1) return;
      let g;
      d ? g = this.moveItem(o, i, c, a) : g = this.moveItem(o, i, c, a), this.setState({ data: d ? this.normalizeTreeRows(g) : g });
    }), r.on("open-row", (s) => {
      const { id: o, nested: i } = s;
      this.toggleBranch(o, !0, i);
    }), r.on("close-row", (s) => {
      const { id: o, nested: i } = s;
      this.toggleBranch(o, !1, i);
    }), r.on("export", (s) => new Promise((o, i) => {
      const a = s.options || {}, l = `${a.fileName || "data"}.${a.format}`;
      if (a.format == "csv") {
        const c = Ec(this.getState(), a);
        a.download !== !1 ? ds(new Blob(["\uFEFF" + c], { type: "text/csv" }), l) : s.result = c, o(!0);
      } else if (a.format == "xlsx") {
        let c = a.styles;
        !c && c !== !1 && (c = Ac(this.getState()._skin));
        const u = c, d = u ? [{ ...u.header }, { ...u.lastHeaderCell || u.header }, { ...u.cell }, { ...u.firstFooterCell || u.footer }, { ...u.footer }] : Array(5).fill({}), { cells: h, merged: f, rowSizes: g, colSizes: m, styles: x } = Rc(this.getState(), a, d), w = a.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(w).then((y) => {
          y.onmessage = ($) => {
            if ($.data.type == "ready") {
              const v = $.data.blob;
              a.download !== !1 ? ds(v, l) : s.result = v, o(!0);
            }
          }, y.postMessage({ type: "convert", data: { data: [{ name: a.sheetName || "data", cells: h, cols: m, rows: g, merged: f }], styles: x } });
        });
      } else i();
    })), r.on("hotkey", ({ key: s, event: o, isInput: i }) => {
      switch (s) {
        case "arrowup": {
          const { flatData: a, focusCell: l, select: c } = this.getState();
          if (o.preventDefault(), i) return;
          const u = l ? l.column : this._getFirstVisibleColumn()?.id, d = l ? this.getPrevRow(l.row)?.id : a[a.length - 1]?.id;
          u && d && (this.in.exec("focus-cell", { row: d, column: u, eventSource: "key" }), c && this.in.exec("select-row", { id: d }));
          break;
        }
        case "arrowdown": {
          const { flatData: a, focusCell: l, select: c } = this.getState();
          if (o.preventDefault(), i) return;
          const u = l ? l.column : this._getFirstVisibleColumn()?.id, d = l ? this.getNextRow(l.row)?.id : a[0]?.id;
          u && d && (this.in.exec("focus-cell", { row: d, column: u, eventSource: "key" }), c && this.in.exec("select-row", { id: d }));
          break;
        }
        case "arrowright": {
          const { focusCell: a } = this.getState();
          if (i) return;
          if (o.preventDefault(), a) {
            const l = this.getNextColumn(a.column, !0)?.id;
            l && this.in.exec("focus-cell", { row: a.row, column: l, eventSource: "key" });
          }
          break;
        }
        case "arrowleft": {
          const { focusCell: a } = this.getState();
          if (i) return;
          if (o.preventDefault(), a) {
            const l = this.getPrevColumn(a.column, !0)?.id;
            l && this.in.exec("focus-cell", { row: a.row, column: l, eventSource: "key" });
          }
          break;
        }
        case "tab": {
          const { editor: a, focusCell: l, select: c } = this.getState();
          if (a) {
            o.preventDefault();
            const u = a.column;
            let d = a.id, h = this.getNextEditor(this.getRow(d), this.getColumn(u));
            if (!h) {
              const f = this.getNextRow(d);
              f && (d = f.id, h = this.getNextEditor(f));
            }
            h && (this.in.exec("open-editor", { id: d, column: h.id }), this.in.exec("focus-cell", { row: d, column: h.id, eventSource: "key" }), c && !this.isSelected(d) && this.in.exec("select-row", { id: d }));
          } else l && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "shift+tab": {
          const { editor: a, focusCell: l, select: c } = this.getState();
          if (a) {
            o.preventDefault();
            const u = a.column;
            let d = a.id, h = this.getPrevEditor(this.getRow(d), this.getColumn(u));
            if (!h) {
              const f = this.getPrevRow(d);
              f && (d = f.id, h = this.getPrevEditor(f));
            }
            h && (this.in.exec("open-editor", { id: d, column: h.id }), this.in.exec("focus-cell", { row: d, column: h.id, eventSource: "key" }), c && !this.isSelected(d) && this.in.exec("select-row", { id: d }));
          } else l && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "escape": {
          const { editor: a } = this.getState();
          a && (this.in.exec("close-editor", { ignore: !0 }), this.in.exec("focus-cell", { row: a.id, column: a.column, eventSource: "key" }));
          break;
        }
        case "f2": {
          const { editor: a, focusCell: l } = this.getState();
          !a && l && this.in.exec("open-editor", { id: l.row, column: l.column });
          break;
        }
        case "enter": {
          const { focusCell: a, tree: l } = this.getState();
          if (!i && l && a && this.getColumn(a.column).treetoggle) {
            const c = this.getRow(a.row);
            if (!c.data) return;
            this.in.exec(c.open ? "close-row" : "open-row", { id: a.row, nested: !0 });
          }
          break;
        }
        case "home": {
          const { editor: a, focusCell: l } = this.getState();
          if (!a && l) {
            o.preventDefault();
            const c = this._getFirstVisibleColumn()?.id;
            this.in.exec("focus-cell", { row: l.row, column: c, eventSource: "key" });
          }
          break;
        }
        case "ctrl+home": {
          const { editor: a, focusCell: l, flatData: c, select: u } = this.getState();
          if (!a && l) {
            o.preventDefault();
            const d = c[0]?.id, h = this._getFirstVisibleColumn()?.id;
            d && h && (this.in.exec("focus-cell", { row: d, column: h, eventSource: "key" }), u && !this.isSelected(d) && this.in.exec("select-row", { id: d }));
          }
          break;
        }
        case "end": {
          const { editor: a, focusCell: l } = this.getState();
          if (!a && l) {
            o.preventDefault();
            const c = this._getLastVisibleColumn()?.id, u = l.row;
            this.in.exec("focus-cell", { row: u, column: c, eventSource: "key" });
          }
          break;
        }
        case "ctrl+end": {
          const { editor: a, focusCell: l, flatData: c, select: u } = this.getState();
          if (!a && l) {
            o.preventDefault();
            const d = c.at(-1).id, h = this._getLastVisibleColumn()?.id;
            d && h && (this.in.exec("focus-cell", { row: d, column: h, eventSource: "key" }), u && !this.isSelected(d) && this.in.exec("select-row", { id: d }));
          }
          break;
        }
        case "ctrl+z": {
          this.in.exec("undo", {});
          break;
        }
        case "ctrl+y": {
          this.in.exec("redo", {});
          break;
        }
      }
    }), r.on("scroll", (s) => {
      const { _columns: o, split: i, _sizes: a, flatData: l, dynamic: c } = this.getState();
      let u = -1, d = -1, h = 0;
      if (s.column) {
        u = 0;
        const f = o.findIndex((g) => g.id == s.column);
        h = o[f].width;
        for (let g = i.left ?? 0; g < f; g++) {
          const m = o[g];
          m.hidden || (u += m.width);
        }
      }
      if (s.row && !c) {
        const f = l.findIndex((g) => g.id === s.row);
        f >= 0 && (d = a.rowHeight * f);
      }
      this.setState({ scroll: { top: d, left: u, width: h, height: a.rowHeight } });
    }), r.on("print", (s) => {
      const o = Fc(s);
      this.setState({ _print: o }), this.setStateAsync({ _print: null });
    }), r.on("undo", () => {
      this._historyManager?.handleUndo();
    }), r.on("redo", () => {
      this._historyManager?.handleRedo();
    }), this.initOnce();
  }
  getXlsxWorker(e) {
    if (!this._xlsxWorker) {
      const n = window.URL.createObjectURL(new Blob([`importScripts('${e}');`], { type: "text/javascript" }));
      this._xlsxWorker = new Promise((r) => {
        const s = new Worker(n);
        s.addEventListener("message", (o) => {
          o.data.type === "init" && r(s);
        });
      });
    }
    return this._xlsxWorker;
  }
  initOnce() {
    const e = { sortMarks: {}, _filterIds: null, data: [], filterValues: {}, scroll: null, editor: null, focusCell: null, _print: null, history: { undo: 0, redo: 0 } };
    this._router.init(e);
  }
  init(e) {
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = Jc()), e.columns && e.columns.forEach((n) => {
      n.options && (n.optionsMap = new Map(n.options.map((r) => [r.id, r.label])));
    }), nn(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {} }), this._historyManager && this._historyManager.resetHistory()), Cr() && (e.tree && (e.undo = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new qc(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
  }
  setState(e, n) {
    return this._router.setState(e, n);
  }
  setStateAsync(e) {
    this._router.setStateAsync(e);
  }
  getRow(e) {
    const { tree: n } = this.getState();
    return n ? this._branches[e] : this.getState().data.find((r) => r.id == e);
  }
  getRowIndex(e, n) {
    return n || (n = this.getState().flatData), n.findIndex((r) => r.id == e);
  }
  getNextRow(e) {
    const n = this.getState().flatData, r = this.getRowIndex(e, n);
    return n[r + 1];
  }
  getPrevRow(e) {
    const n = this.getState().flatData, r = this.getRowIndex(e, n);
    return n[r - 1];
  }
  getColumn(e) {
    return this.getState().columns.find((n) => n.id == e);
  }
  getNextColumn(e, n) {
    const r = this.getState()._columns, s = r.findIndex((o) => o.id == e);
    return n ? this._getFirstVisibleColumn(s + 1) : r[s + 1];
  }
  getPrevColumn(e, n) {
    const r = this.getState()._columns, s = r.findIndex((o) => o.id == e);
    return n ? this._getLastVisibleColumn(s - 1) : r[s - 1];
  }
  _getFirstVisibleColumn(e) {
    const n = this.getState()._columns;
    let r = e ?? 0;
    for (; r < n.length && (n[r]?.hidden || n[r]?.collapsed); ) r++;
    return n[r];
  }
  _getLastVisibleColumn(e) {
    const n = this.getState()._columns;
    let r = e ?? n.length - 1;
    for (; r < n.length && (n[r]?.hidden || n[r]?.collapsed); ) r--;
    return n[r];
  }
  isCellEditable(e, n) {
    const { editor: r, hidden: s } = n;
    return !r || s ? !1 : typeof r == "function" ? r(e, n) : !0;
  }
  getNextEditor(e, n) {
    let r = this.getState().columns;
    if (n) {
      const s = r.findIndex((o) => o.id == n.id);
      r = r.slice(s + 1);
    }
    return r.find((s) => this.isCellEditable(e, s));
  }
  getPrevEditor(e, n) {
    let r = this.getState().columns;
    if (n) {
      const s = r.findLastIndex((o) => o.id == n.id);
      r = r.slice(0, s);
    }
    return r.findLast((s) => this.isCellEditable(e, s));
  }
  toggleBranch(e, n, r) {
    let s = this._branches[e], { data: o } = this.getState();
    if (o = [...o], e !== 0) {
      s = { ...s, open: n };
      const i = this.updateTreeRow(s);
      s.$parent === 0 && (o = i);
    }
    r && s.data?.length && s.data.forEach((i) => {
      const a = this.toggleKids(i, n, r);
      e === 0 && (o = a);
    }), this.setState({ data: o });
  }
  toggleKids(e, n, r) {
    e = { ...e, open: n };
    const s = this.updateTreeRow(e);
    return r && e.data?.length && e.data.forEach((o) => {
      this.toggleKids(o, n, r);
    }), s;
  }
  updateTreeRow(e) {
    const n = e.id;
    this._branches[n] = e;
    const r = this._branches[e.$parent], s = r.data.findIndex((o) => o.id == n);
    return r.data = [...r.data], r.data[s] = e, r.data;
  }
  isSelected(e) {
    return this.getState().selectedRows.indexOf(e) !== -1;
  }
  findAndRemove(e, n) {
    for (let r = 0; r < e.length; r++) {
      if (e[r].id == n) return e.splice(r, 1)[0];
      if (e[r].data) {
        const s = [...e[r].data], o = this.findAndRemove(s, n);
        if (o) return e[r] = { ...e[r], data: s }, o;
      }
    }
    return null;
  }
  insertItem(e, n, r, s) {
    for (let o = 0; o < e.length; o++) {
      if (e[o].id == n) {
        const i = e[o], a = s === "before" ? o : o + 1;
        if (i.data) {
          if (s === "before") {
            const l = o > 0 ? e[o - 1] : null;
            return l?.data && l.open ? e[o - 1] = { ...l, data: [...l.data, r] } : e.splice(a, 0, r), !0;
          } else if (i.open) return e[o] = { ...i, data: [r, ...i.data] }, !0;
        }
        return e.splice(a, 0, r), !0;
      }
      if (e[o].data && (e[o] = { ...e[o], data: [...e[o].data] }, this.insertItem(e[o].data, n, r, s))) return !0;
    }
    return !1;
  }
  moveItem(e, n, r, s) {
    const o = [...r], i = this.findAndRemove(o, e);
    return this.insertItem(o, n, i, s), o;
  }
  copyColumns(e) {
    const n = [];
    return e.forEach((r) => {
      const s = { ...r };
      this.copyHeaderFooter(s, "header"), this.copyHeaderFooter(s, "footer"), n.push(s);
    }), n;
  }
  copyHeaderFooter(e, n) {
    let r = e[n];
    r = Array.isArray(r) ? [...r] : [r], r.forEach((s, o) => {
      r[o] = typeof s == "string" ? { text: s } : { ...s };
    }), e[n] = r;
  }
  setCollapsibleColumns(e, n, r) {
    let s = e.header;
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      if (i.collapsible && i.collapsed) {
        if (i.collapsible !== "first") {
          e.collapsed = !0, e.width = 36, i.vertical = !0;
          const l = s.length - o;
          s = s.slice(0, o + 1), s[o].rowspan = l;
        }
        const a = i.colspan;
        if (a) {
          const l = s[o + 1];
          let c = 1;
          l && l.colspan && !l.collapsed && (c = l.colspan);
          for (let u = c; u < a; u++) {
            const d = r[n + u];
            d && (d.hidden = !0);
          }
        }
      }
    }
  }
  normalizeColumns(e, n, r, s, o) {
    const i = e[n];
    i.width || (i.width = i.flexgrow ? 17 : o.columnWidth), i._colindex = n + 1;
    const a = i[r], l = o[`${r}RowHeights`];
    for (let c = 0; c < s; c++) {
      const u = a[c];
      u.id = i.id, c === a.length - 1 && (u.rowspan = u.rowspan ? Math.min(u.rowspan, s - c) : s - c);
      for (let d = 1; d < u.rowspan; d++) {
        a.splice(c + d, 0, { _hidden: !0 });
        for (let h = 1; h < u.colspan; h++) e[n + h][r].splice(c + d, 0, {});
      }
      if (u.rowspan) {
        const d = (u.rowspan === s ? l : l.slice(c, u.rowspan + c)).reduce((h, f) => h + f, 0);
        u.height = d, c + u.rowspan != s && u.height--;
      }
      if (u.colspan) {
        let d = i.width, h = i.flexgrow || 0;
        const f = u.colspan;
        for (let g = 1; g < f; g++) {
          const m = e[n + g];
          m && (m.hidden ? u.colspan -= 1 : m.flexgrow ? h += m.flexgrow : d += m.width || o.columnWidth), h ? u.flexgrow = h : u.width = d;
        }
      } else u.width = i.width, u.flexgrow = i.flexgrow;
      r === "header" && u.filter && typeof u.filter == "string" && (u.filter = { type: u.filter });
    }
    a.length > s && (a.length = s), i[r] = a;
  }
  normalizeRows(e) {
    return e.forEach((n) => {
      n.id || (n.id = Gn());
    }), e;
  }
  normalizeTreeRows(e, n, r) {
    return e.forEach((s) => {
      s.id || (s.id = Gn()), s.$level = n || 0, s.$parent = r || 0, this._branches[s.id] = s, s.data && (s.data.length ? (s.$count = s.data.length, this.normalizeTreeRows(s.data, s.$level + 1, s.id)) : (delete s.data, delete s.$count, delete s.open));
    }), e;
  }
  sortTree(e, n) {
    e.sort(n), e.forEach((r) => {
      r.data && this.sortTree(r.data, n);
    });
  }
  filterTree(e, n, r) {
    return e.forEach((s) => {
      n(s) && r.push(s.id), s.data && this.filterTree(s.data, n, r);
    }), r;
  }
  flattenRows(e, n, r) {
    const s = n;
    return e.forEach((o) => {
      (!r || r.includes(o.id)) && s.push(o), o.data?.length && o.open !== !1 && this.flattenRows(o.data, s, r);
    }), s;
  }
  createFilter(e) {
    const { _columns: n } = this.getState(), r = [];
    for (const s in e) {
      const { config: o, type: i } = n.find((l) => l.id == s).header.find((l) => l.filter).filter, a = e[s];
      r.push((l) => o?.handler ? o.handler(l[s], a) : nu(i)(l[s], a));
    }
    return (s) => {
      for (let o = 0; o < r.length; o++) if (!r[o](s)) return !1;
      return !0;
    };
  }
  normalizeSizes(e, n, r, s, o) {
    const i = gs(e, "header", r, n.headerHeight, o), a = gs(e, "footer", s, n.footerHeight, o), l = i.reduce((u, d) => u + d, 0), c = a.reduce((u, d) => u + d, 0);
    return { ...n, headerRowHeights: i, footerRowHeights: a, headerHeight: l, footerHeight: c };
  }
}
let su = (/* @__PURE__ */ new Date()).valueOf();
function Gn() {
  return "temp://" + su++;
}
function ou(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
function Mr(t, { keys: e, exec: n }) {
  for (const s in e) {
    const o = s.toLowerCase().replace(/ /g, "");
    o !== s && (e[o] = e[s]);
  }
  function r(s) {
    let o = s.code.replace("Key", "").toLowerCase();
    o === " " && (o = "space");
    const i = `${s.ctrlKey || s.metaKey ? "ctrl+" : ""}${s.shiftKey ? "shift+" : ""}${s.altKey ? "alt+" : ""}${o.replace(/^key/, "")}`, a = e[i];
    if (typeof a < "u") {
      const l = s.target.tagName === "INPUT" || s.target.tagName === "TEXTAREA" || ou(s.target, "data-header-id")?.classList.contains("wx-filter") || !!s.target.closest(".wx-cell.wx-editor");
      typeof a == "function" ? a({ key: i, event: s, node: t, isInput: l }) : a && n({ key: i, event: s, node: t, isInput: l });
    }
  }
  return t.addEventListener("keydown", r), { destroy: () => {
    t.removeEventListener("keydown", r);
  } };
}
function iu(t, e) {
  let n = null;
  e.scroll.subscribe((r) => {
    if (!r || r === n) return;
    n = r;
    const { left: s, top: o, height: i, width: a } = r, l = e.getHeight(), c = e.getWidth(), u = e.getScrollMargin();
    if (o >= 0) {
      const d = t.scrollTop;
      o < d ? t.scrollTop = o : o + i > d + l && (t.scrollTop = o - l + i);
    }
    if (s >= 0) {
      const d = t.scrollLeft;
      s < d ? t.scrollLeft = s : s + a > d + c - u && (t.scrollLeft = s - c + a + u);
    }
  });
}
function Bt(t) {
  const e = t.getAttribute("data-id"), n = parseInt(e);
  return isNaN(n) || n.toString() != e ? e : n;
}
function au(t, e, n) {
  const r = t.getBoundingClientRect(), s = e.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - n.clientY,
    db: n.clientY - r.top
  };
}
function ws(t) {
  return t && t.getAttribute("data-context-id");
}
const xs = 5;
function lu(t, e) {
  let n, r, s, o, i, a, l, c, u;
  function d(D) {
    o = D.clientX, i = D.clientY, a = {
      ...au(n, t, D),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function h(D) {
    n = ze(D), ws(n) && (s = Bt(n), u = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), d(D.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", f), window.addEventListener("touchend", $));
  }
  function f(D) {
    if (c || u)
      return D.preventDefault(), !1;
  }
  function g(D) {
    D.which === 1 && (n = ze(D), ws(n) && (s = Bt(n), t.addEventListener("mousemove", w), window.addEventListener("mouseup", v), d(D)));
  }
  function m(D) {
    t.removeEventListener("mousemove", w), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", v), document.body.removeEventListener("touchend", $), document.body.style.userSelect = "", D && (t.removeEventListener("mousedown", g), t.removeEventListener("touchstart", h));
  }
  function x(D) {
    const E = D.clientX - o, I = D.clientY - i;
    if (!r) {
      if (Math.abs(E) < xs && Math.abs(I) < xs || e && e.start && e.start({ id: s, e: D }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = a.left + "px", r.style.top = a.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const _ = Math.round(Math.max(0, a.top + I));
      if (e && e.move && e.move({ id: s, top: _, detail: l }) === !1)
        return;
      const k = e.getTask(s), b = k.$y;
      if (!a.start && a.y == b) return C();
      a.start = !0, a.y = k.$y - 4, r.style.top = _ + "px";
      const L = document.elementFromPoint(
        D.clientX,
        D.clientY
      ), W = ze(L);
      if (W && W !== n) {
        const S = Bt(W), M = W.getBoundingClientRect(), R = M.top + M.height / 2, N = D.clientY + a.db > R && W.nextElementSibling !== n, A = D.clientY - a.dt < R && W.previousElementSibling !== n;
        l?.after == S || l?.before == S ? l = null : N ? l = { id: s, after: S } : A && (l = { id: s, before: S });
      }
    }
  }
  function w(D) {
    x(D);
  }
  function y(D) {
    c ? (D.preventDefault(), x(D.touches[0])) : u && (clearTimeout(u), u = null);
  }
  function $() {
    c = null, u && (clearTimeout(u), u = null), C();
  }
  function v() {
    C();
  }
  function C() {
    n && (n.style.visibility = ""), r && (r.parentNode.removeChild(r), e && e.end && e.end({ id: s, top: a.top })), s = n = r = a = l = null, m();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", g), t.addEventListener("touchstart", h), {
    destroy() {
      m(!0);
    }
  };
}
const cu = {
  grid: {
    "Add before": "Add before",
    "Add after": "Add after",
    Copy: "Copy",
    Delete: "Delete"
  }
};
function Eo(t, e) {
  return t.map((n) => {
    const r = e(n);
    return n.data && n.data.length && (r.data = Eo(n.data, e)), r;
  });
}
function Ro(t, e) {
  const n = [];
  return t.forEach((r) => {
    if (r.data) {
      const s = Ro(r.data, e);
      s.length && n.push({ ...r, data: s });
    } else
      e(r) && n.push(r);
  }), n;
}
let uu = 1;
function du(t) {
  return Eo(t, (e) => {
    const n = { ...e, id: e.id || uu++ };
    return n.type && (n.comp = n.type), n;
  });
}
const Ao = {};
function hu(t) {
  return Ao[t] || t;
}
function fu(t, e) {
  Ao[t] = e;
}
function mu({ onClick: t, onShow: e, option: n }) {
  const r = V(null), s = P(() => {
    e(n.data ? n.id : !1, r.current);
  }, [e, n]), o = T(() => n && n.comp ? hu(n.comp) : null, [n]);
  return /* @__PURE__ */ U(
    "div",
    {
      ref: r,
      className: `wx-cDCz9rZQ wx-option ${n.css || ""}`,
      "data-id": n.id,
      onMouseEnter: s,
      onClick: t,
      children: [
        n.icon ? /* @__PURE__ */ p("i", { className: `wx-cDCz9rZQ wx-icon ${n.icon}` }) : null,
        n.comp ? o ? /* @__PURE__ */ p(o, { item: n, option: n }) : null : /* @__PURE__ */ U("span", { className: "wx-cDCz9rZQ wx-value", children: [
          " ",
          n.text,
          " "
        ] }),
        n.subtext ? /* @__PURE__ */ p("span", { className: "wx-cDCz9rZQ wx-subtext", children: n.subtext }) : null,
        n.data ? /* @__PURE__ */ p("i", { className: "wx-cDCz9rZQ wx-sub-icon wxi-angle-right" }) : null
      ]
    }
  );
}
function Dr({
  options: t,
  left: e = 0,
  top: n = 0,
  at: r = "bottom",
  parent: s = null,
  mount: o = null,
  context: i = null,
  css: a = "",
  onClick: l
}) {
  const [c, u] = K(-1e4), [d, h] = K(-1e4), [f, g] = K(20), [m, x] = K(), w = V(null), [y, $] = K(!1), [v, C] = K(null), D = P(() => {
    const b = ui(w.current, s, r, e, n);
    b && (u(b.x), h(b.y), g(b.z), x(b.width));
  }, [s, r, e, n]);
  B(() => {
    o && o(D);
  }, []);
  const E = P(() => {
    $(!1);
  }, []), I = P(() => {
    l && l({ action: null, option: null });
  }, [l]), _ = P((b, L) => {
    $(b), C(L);
  }, []), k = T(() => du(t), [t]);
  return B(() => {
    D();
  }, [s, D]), B(() => {
    if (w.current)
      return Jt(w.current, { callback: I, modal: !0 }).destroy;
  }, [I]), /* @__PURE__ */ p(
    "div",
    {
      ref: w,
      "data-wx-menu": "true",
      className: `wx-XMmAGqVx wx-menu ${a}`,
      style: {
        position: "absolute",
        top: d + "px",
        left: c + "px",
        width: m,
        zIndex: f
      },
      onMouseLeave: E,
      children: k.map((b) => /* @__PURE__ */ U(Os, { children: [
        b.comp === "separator" ? /* @__PURE__ */ p("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ p(
          mu,
          {
            option: b,
            onShow: _,
            onClick: (L) => {
              if (!b.data && !L.defaultPrevented) {
                const W = { context: i, action: b, option: b, event: L };
                b.handler && b.handler(W), l && l(W), L.stopPropagation();
              }
            }
          }
        ),
        b.data && y === b.id ? /* @__PURE__ */ p(
          Dr,
          {
            css: a,
            options: b.data,
            at: "right-overlap",
            parent: v,
            context: i,
            onClick: l
          }
        ) : null
      ] }, b.id))
    }
  );
}
const pu = vt(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: a = "",
    children: l,
    onClick: c
  } = t, [u, d] = K(null), [h, f] = K(null), [g, m] = K(0), [x, w] = K(0), y = T(() => u !== null && i ? Ro(n, (D) => i(D, u)) : n, [u, i, n]), $ = P(
    (D) => {
      f(null), c && c(D);
    },
    [c]
  ), v = P((D, E) => {
    let I = null;
    for (; D && D.dataset && !I; )
      I = D.dataset[E], D = D.parentNode;
    return I ? Ot(I) : null;
  }, []), C = P(
    (D, E) => {
      if (!D) {
        f(null);
        return;
      }
      if (D.defaultPrevented) return;
      const I = D.target;
      if (I && I.dataset && I.dataset.menuIgnore) return;
      m(D.clientX + 1), w(D.clientY + 1);
      let _ = typeof E < "u" ? E : v(I, o);
      s && (_ = s(_, D), !_) || (d(_), f(I), D.preventDefault());
    },
    [o, v, s]
  );
  return bt(e, () => ({ show: C }), [C]), /* @__PURE__ */ U(we, { children: [
    l ? /* @__PURE__ */ p("span", { onClick: C, "data-menu-ignore": "true", children: typeof l == "function" ? l() : l }) : null,
    h ? /* @__PURE__ */ p(Vs, { children: /* @__PURE__ */ p(
      Dr,
      {
        css: a,
        at: r,
        top: x,
        left: g,
        parent: h,
        context: u,
        onClick: $,
        options: y
      },
      h
    ) }) : null
  ] });
});
vt(function(t, e) {
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: i } = t, [a, l] = K(null);
  function c(g) {
    l(null), i && i(g);
  }
  const u = P((g) => {
    l(g.target), g.preventDefault();
  }, []);
  bt(e, () => ({ show: u }), [u]);
  function d(g) {
    let m = g.target;
    for (; !m.dataset.menuIgnore; )
      l(m), m = m.parentNode;
  }
  const h = V(0), f = V(a);
  return B(() => {
    f.current !== a && (h.current += 1, f.current = a);
  }, [a]), /* @__PURE__ */ U(we, { children: [
    /* @__PURE__ */ p("span", { onClick: d, "data-menu-ignore": "true", children: o }),
    a ? /* @__PURE__ */ p(Vs, { children: /* @__PURE__ */ p(
      Dr,
      {
        css: s,
        at: r,
        parent: a,
        options: n,
        onClick: c
      },
      h.current
    ) }) : null
  ] });
});
const Oo = vt(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: a = "",
    children: l
  } = t, c = t.onClick ?? t.onclick, u = V(null), d = P((h, f) => {
    u.current.show(h, f);
  }, []);
  return bt(
    e,
    () => ({
      show: d
    }),
    [d]
  ), /* @__PURE__ */ U(we, { children: [
    l ? /* @__PURE__ */ p("span", { onContextMenu: d, "data-menu-ignore": "true", children: l }) : null,
    /* @__PURE__ */ p(
      pu,
      {
        css: a,
        at: r,
        options: n,
        resolver: s,
        dataKey: o,
        filter: i,
        ref: u,
        onClick: c
      }
    )
  ] });
});
var gu = Array.isArray, wu = Object.defineProperty;
function xu(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
var ys = globalThis.process?.env?.NODE_ENV, Lo = ys && !ys.toLowerCase().startsWith("prod");
function yu(t) {
  if (Lo) {
    const e = new Error(`rune_outside_svelte
The \`${t}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`);
    throw e.name = "Svelte error", e;
  } else
    throw new Error("https://svelte.dev/e/rune_outside_svelte");
}
var Nt = [];
function vu() {
  var t = Nt;
  Nt = [], xu(t);
}
function bu(t) {
  if (Nt.length === 0) {
    var e = Nt;
    queueMicrotask(() => {
      e === Nt && vu();
    });
  }
  Nt.push(t);
}
function ku(t) {
  try {
    return t();
  } finally {
  }
}
function $u(t, e, n, r = {}) {
  function s(o) {
    if (r.capture || _u.call(e, o), !o.cancelBubble)
      return ku(() => n?.call(this, o));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? bu(() => {
    e.addEventListener(t, s, r);
  }) : e.addEventListener(t, s, r), s;
}
function Su(t, e, n, r = {}) {
  var s = $u(e, t, n, r);
  return () => {
    t.removeEventListener(e, s, r);
  };
}
var vs = null;
function _u(t) {
  var e = this, n = (
    /** @type {Node} */
    e.ownerDocument
  ), r = t.type, s = t.composedPath?.() || [], o = (
    /** @type {null | Element} */
    s[0] || t.target
  );
  vs = t;
  var i = 0, a = vs === t && t.__root;
  if (a) {
    var l = s.indexOf(a);
    if (l !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t.__root = e;
      return;
    }
    var c = s.indexOf(e);
    if (c === -1)
      return;
    l <= c && (i = l);
  }
  if (o = /** @type {Element} */
  s[i] || t.target, o !== e) {
    wu(t, "currentTarget", {
      configurable: !0,
      get() {
        return o || n;
      }
    });
    try {
      for (var u, d = []; o !== null; ) {
        var h = o.assignedSlot || o.parentNode || /** @type {any} */
        o.host || null;
        try {
          var f = o["__" + r];
          if (f != null && (!/** @type {any} */
          o.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === o))
            if (gu(f)) {
              var [g, ...m] = f;
              g.apply(o, [t, ...m]);
            } else
              f.call(o, t);
        } catch (x) {
          u ? d.push(x) : u = x;
        }
        if (t.cancelBubble || h === e || h === null)
          break;
        o = h;
      }
      if (u) {
        for (let x of d)
          queueMicrotask(() => {
            throw x;
          });
        throw u;
      }
    } finally {
      t.__root = e, delete t.currentTarget;
    }
  }
}
if (Lo) {
  let t = function(e) {
    if (!(e in globalThis)) {
      let n;
      Object.defineProperty(globalThis, e, {
        configurable: !0,
        // eslint-disable-next-line getter-return
        get: () => {
          if (n !== void 0)
            return n;
          yu(e);
        },
        set: (r) => {
          n = r;
        }
      });
    }
  };
  t("$state"), t("$effect"), t("$derived"), t("$inspect"), t("$props"), t("$bindable");
}
var Cu = {
  addEvent: Su
};
const je = Xt(null);
function Mu(t, e) {
  const n = new ResizeObserver((r) => {
    requestAnimationFrame(() => e(r[0].contentRect));
  });
  return n.observe(t.parentNode), {
    destroy() {
      n.disconnect();
    }
  };
}
const bs = 5, Du = 700;
function Nu(t) {
  return Ot(t.getAttribute("data-id"));
}
function wn(t) {
  const e = t.getBoundingClientRect(), n = document.body, r = e.top + n.scrollTop - n.clientTop || 0, s = e.left + n.scrollLeft - n.clientLeft || 0;
  return {
    y: Math.round(r),
    x: Math.round(s),
    width: t.offsetWidth,
    height: t.offsetHeight
  };
}
function ur(t, e) {
  const n = wn(e);
  return { x: t.clientX - n.x, y: t.clientY - n.y };
}
function Tu(t, e) {
  const n = e.current;
  let r = null, s, o, i = !1, a = !1;
  const l = document.createElement("DIV");
  l.className = "wx-drag-zone", l.setAttribute("tabindex", -1);
  function c() {
    clearTimeout(s), s = null;
  }
  function u(E) {
    const I = ze(E);
    I && (r = {
      container: l,
      sourceNode: E.target,
      from: Nu(I),
      pos: ur(E, t)
    }, o = r.pos, d(E));
  }
  function d(E) {
    if (!r) return;
    const I = r.pos = ur(E, t);
    if (!i) {
      if (!a && !E?.target?.getAttribute("draggable-data") && Math.abs(o.x - I.x) < bs && Math.abs(o.y - I.y) < bs)
        return;
      if (C(E) === !1) return D();
    }
    if (a) {
      const _ = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, k = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        E.pageX - _,
        E.pageY - k
      );
    } else r.targetNode = E.target;
    n.move && n.move(E, r), l.style.left = -(r.offset ? r.offset.x : 0) + "px", l.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + "px";
  }
  function h(E) {
    l.parentNode && l.parentNode.removeChild(l), l.innerHTML = "", i && n.end && n.end(E, r), r = o = null, D();
  }
  function f(E) {
    n.getReorder && !n.getReorder() || E.button === 0 && (v(E), window.addEventListener("mousemove", g), window.addEventListener("mouseup", m), u(E));
  }
  function g(E) {
    d(E);
  }
  function m(E) {
    h(E);
  }
  function x(E) {
    if (n.getReorder && !n.getReorder()) return;
    s = setTimeout(() => {
      a = !0, u(E.touches[0]);
    }, Du), v(E);
    function I() {
      s && c(), E.target.removeEventListener("touchmove", w), E.target.removeEventListener("touchend", I), h(E);
    }
    E.target.addEventListener("touchmove", w), E.target.addEventListener("touchend", I), t.addEventListener("contextmenu", y);
  }
  function w(E) {
    i ? (E.preventDefault(), d(E.touches[0])) : s && c();
  }
  function y(E) {
    if (i || s)
      return E.preventDefault(), !1;
  }
  function $(E) {
    E.preventDefault();
  }
  function v(E) {
    if (!n.getDraggableInfo) return;
    const { hasDraggable: I } = n.getDraggableInfo();
    (!I || E.target.getAttribute("draggable-data")) && (document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }
  function C(E) {
    if (i = !0, n.start) {
      if (n.start(E, r) === !1) return !1;
      t.appendChild(l), document.body.style.cursor = "move";
    }
  }
  function D(E) {
    i = a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.body.style.webkitUserSelect = "", window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", m), E && (t.removeEventListener("mousedown", f), t.removeEventListener("touchstart", x), t.removeEventListener("dragstart", $));
  }
  return t.addEventListener("mousedown", f), t.addEventListener("touchstart", x), t.addEventListener("dragstart", $), {
    destroy() {
      D(!0);
    }
  };
}
const Eu = 4e-3;
function Ru() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1
  };
}
function Au(t, e, n, r) {
  const { node: s, left: o, top: i, bottom: a, sense: l, xScroll: c, yScroll: u } = r, d = ur(t, s);
  n.scrollState || (n.scrollState = Ru());
  let h = 0, f = 0;
  d.x < o + l ? h = -1 : d.x > e.width - l && (h = 1), d.y < i + Math.round(l / 2) ? f = -1 : d.y > e.height - a - Math.round(l / 2) && (f = 1), (n.scrollState.dirX !== h || n.scrollState.dirY !== f) && (Io(n), n.scrollState.dirX = h, n.scrollState.dirY = f), (c && n.scrollState.dirX !== 0 || u && n.scrollState.dirY !== 0) && Ou(n, r, {
    x: n.scrollState.dirX,
    y: n.scrollState.dirY
  });
}
function Ou(t, e, n) {
  t.autoScrollTimer || (t.autoScrollTimer = setTimeout(() => {
    t.activeAutoScroll = setInterval(
      Lu,
      15,
      t,
      e,
      n
    );
  }, 250));
}
function Io(t) {
  t.scrollSpeedFactor = 1, t.autoScrollTimer && (t.autoScrollTimer = clearTimeout(t.autoScrollTimer), t.activeAutoScroll = clearInterval(t.activeAutoScroll));
}
function Lu(t, e, n) {
  const { x: r, y: s } = n;
  t.scrollSpeedFactor += Eu, r !== 0 && Hu(t, e, r), s !== 0 && Iu(t, e, s);
}
function Iu(t, e, n) {
  const r = e.node.scrollTop;
  Ho(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollTop",
    e
  );
}
function Hu(t, e, n) {
  const r = e.node.scrollLeft;
  Ho(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollLeft",
    e
  );
}
function Ho(t, e, n) {
  n.node[e] = t;
}
function Wu(t) {
  return {
    tab: !0,
    "shift+tab": !0,
    arrowup: !0,
    arrowdown: !0,
    arrowright: !0,
    arrowleft: !0,
    enter: !0,
    escape: !0,
    f2: !0,
    home: !0,
    end: !0,
    "ctrl+home": !0,
    "ctrl+end": !0,
    "ctrl+z": t.undo,
    "ctrl+y": t.undo
  };
}
function Wn(t, e, n, r, s, o) {
  const i = {};
  return t && (i.width = `${t}px`, i.minWidth = `${t}px`), e && (i.flexGrow = e), o && (i.height = `${o}px`), n && (i.position = "sticky", n.left && (i.left = `${r}px`), n.right && (i.right = `${s}px`)), i;
}
function Wo(t, e, n) {
  let r = "";
  if (t.fixed)
    for (const s in t.fixed)
      r += t.fixed[s] === -1 ? "wx-shadow " : "wx-fixed ";
  return r += e.rowspan > 1 ? "wx-rowspan " : "", r += e.colspan > 1 ? "wx-colspan " : "", r += e.vertical ? "wx-vertical " : "", r += n ? n(t) + " " : "", r;
}
function Pu(t) {
  const {
    row: e,
    column: n,
    cellStyle: r = null,
    columnStyle: s = null,
    children: o,
    reorder: i
  } = t, [a, l] = Me(t.focusable), c = pe(je), u = re(c, "focusCell"), d = T(
    () => Wn(
      n.width,
      n.flexgrow,
      n.fixed,
      n.left,
      n.right
    ),
    [n.width, n.flexgrow, n.fixed, n.left, n.right]
  );
  function h($, v) {
    let C = "wx-cell";
    return C += n.fixed ? " " + (n.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", C += $ ? " " + $(n) : "", C += v ? " " + v(e, n) : "", C += n.treetoggle ? " wx-tree-cell" : "", C;
  }
  const f = T(
    () => h(s, r),
    [s, r, n, e]
  ), g = T(() => typeof n.draggable == "function" ? n.draggable(e, n) !== !1 : n.draggable, [n, e]), m = V(null);
  B(() => {
    const $ = u?.row === e.id && u?.column === n.id;
    m.current && a && $ && m.current.focus();
  }, [u, a, e.id, n.id]);
  const x = P(() => {
    a && !u && c.exec("focus-cell", {
      row: e.id,
      column: n.id,
      eventSource: "focus"
    });
  }, [c, a, u, e.id, n.id]);
  B(() => () => {
    a && u && (c.exec("focus-cell", { eventSource: "destroy" }), l(!1));
  }, [c, l]);
  const w = T(() => {
    const $ = n.fixed && n.fixed.left === -1 || n.fixed.right === -1, v = n.fixed && n.fixed.right;
    return [
      f,
      $ ? "wx-shadow" : "",
      v ? "wx-fixed-right" : ""
    ].filter(Boolean).join(" ");
  }, [f, n]), y = n.cell;
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-TSCaXsGV " + w,
      ref: m,
      onFocus: x,
      style: d,
      "data-row-id": e.id,
      "data-col-id": n.id,
      tabIndex: a ? "0" : "-1",
      role: "gridcell",
      "aria-colindex": n._colindex,
      "aria-readonly": n.editor ? void 0 : !0,
      children: [
        i && n.draggable ? g ? /* @__PURE__ */ p(
          "i",
          {
            "draggable-data": "true",
            className: "wx-TSCaXsGV wx-draggable wxi-drag"
          }
        ) : /* @__PURE__ */ p("i", { className: "wx-TSCaXsGV wx-draggable-stub" }) : null,
        n.treetoggle ? /* @__PURE__ */ U(we, { children: [
          /* @__PURE__ */ p("span", { style: { marginLeft: `${e.$level * 28}px` } }),
          e.$count ? /* @__PURE__ */ p(
            "i",
            {
              "data-action": "toggle-row",
              className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? "down" : "right"}`
            }
          ) : null
        ] }) : null,
        y ? /* @__PURE__ */ p(
          y,
          {
            api: c,
            row: e,
            column: n,
            onAction: ({ action: $, data: v }) => c.exec($, v)
          }
        ) : o ? o() : Ht(e, n)
      ]
    }
  );
}
function ks(t, e) {
  let n, r;
  function s(a) {
    n = a.clientX, t.style.opacity = 1, document.body.style.cursor = "ew-resize", document.body.style.userSelect = "none", window.addEventListener("mousemove", o), window.addEventListener("mouseup", i), e && e.down && e.down(t);
  }
  function o(a) {
    r = a.clientX - n, e && e.move && e.move(r);
  }
  function i() {
    t.style.opacity = "", document.body.style.cursor = "", document.body.style.userSelect = "", e && e.up && e.up(r), window.removeEventListener("mousemove", o), window.removeEventListener("mouseup", i);
  }
  return t.addEventListener("mousedown", s), {
    destroy() {
      t.removeEventListener("mousedown", s);
    }
  };
}
function Yu({ filter: t, column: e, action: n, filterValue: r }) {
  function s({ value: o }) {
    n({ value: o, key: e.id });
  }
  return /* @__PURE__ */ p(
    Rn,
    {
      ...t.config ?? {},
      value: r,
      onChange: s
    }
  );
}
function zu({ filter: t, column: e, action: n, filterValue: r }) {
  const s = pe(je), o = re(s, "flatData"), i = T(
    () => t?.config?.options || e?.options || l(),
    [t, e, o]
  ), a = T(() => t?.config?.template, [t]);
  function l() {
    const d = [];
    return o.forEach((h) => {
      const f = yt(h, e);
      d.includes(f) || d.push(f);
    }), d.map((h) => ({ id: h, label: h }));
  }
  function c({ value: d }) {
    n({ value: d, key: e.id });
  }
  function u(d) {
    d.key !== "Tab" && d.preventDefault();
  }
  return /* @__PURE__ */ p("div", { style: { width: "100%" }, onKeyDown: u, children: /* @__PURE__ */ p(
    Fs,
    {
      placeholder: "",
      clear: !0,
      ...t?.config ?? {},
      options: i,
      value: r,
      onChange: c,
      children: (d) => a ? a(d) : d.label
    }
  ) });
}
const Fu = {
  text: Yu,
  richselect: zu
};
function ju({ filter: t, column: e }) {
  const n = pe(je), r = re(n, "filterValues");
  function s(i) {
    n.exec("filter-rows", i);
  }
  const o = T(() => Fu[t.type], [t.type]);
  return /* @__PURE__ */ p(
    o,
    {
      filter: t,
      column: e,
      action: s,
      filterValue: r[e.id]
    }
  );
}
function Vu(t) {
  const {
    cell: e,
    column: n,
    row: r,
    lastRow: s,
    sortRow: o,
    columnStyle: i,
    bodyHeight: a,
    hasSplit: l
  } = t, c = pe(je), u = re(c, "sortMarks"), d = T(() => u ? u[n.id] : void 0, [u, n.id]), h = V(), f = P(
    (S) => {
      h.current = e.flexgrow ? S.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), g = P(
    (S, M) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (h.current || 0) + S),
        inProgress: M
      });
    },
    [c, e.id]
  ), m = P((S) => g(S, !0), [g]), x = P((S) => g(S, !1), [g]), w = P(
    (S) => {
      !n.sort || e.filter || c.exec("sort-rows", { key: e.id, add: S.ctrlKey });
    },
    [c, e.id, e.filter, n.sort]
  ), y = P(
    (S) => {
      S && S.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), $ = P(
    (S) => {
      S.key === "Enter" && y();
    },
    [y]
  ), v = P(
    (S) => {
      S.key === "Enter" && !e.filter && w(S);
    },
    [w, e.filter]
  ), C = T(
    () => e.collapsed && n.collapsed,
    [e.collapsed, n.collapsed]
  ), D = T(
    () => C && !l && e.collapsible !== "header",
    [C, l, e.collapsible]
  ), E = T(
    () => D ? { top: -a / 2, position: "absolute" } : {},
    [D, a]
  ), I = T(
    () => Wn(
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right ?? n.right,
      e.height + (C && D ? a : 0)
    ),
    [
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right,
      n.right,
      e.height,
      C,
      D,
      a
    ]
  ), _ = T(
    () => Wo(n, e, i),
    [n, e, i]
  ), k = P(() => Object.fromEntries(
    Object.entries(e).filter(([S]) => S !== "cell")
  ), [e]), b = `wx-cell ${_} ${e.css || ""} wx-collapsed`, L = [
    "wx-cell",
    _,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), W = V(null);
  return B(() => {
    const S = W.current;
    if (!S) return;
    const M = ks(S, { down: f, move: m, up: x });
    return () => {
      typeof M == "function" && M();
    };
  }, [f, m, x, ks]), C ? /* @__PURE__ */ p(
    "div",
    {
      className: "wx-RsQD74qC " + b,
      style: I,
      role: "button",
      "aria-label": `Expand column ${e.text || ""}`,
      "aria-expanded": !e.collapsed,
      tabIndex: 0,
      onKeyDown: $,
      onClick: y,
      "data-header-id": n.id,
      children: /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-text", style: E, children: e.text || "" })
    }
  ) : /* @__PURE__ */ U(
    "div",
    {
      className: "wx-RsQD74qC " + L,
      style: I,
      onClick: w,
      "data-header-id": n.id,
      tabIndex: !e._hidden && n.sort && !e.filter ? 0 : void 0,
      role: "columnheader",
      "aria-colindex": e._colindex,
      "aria-colspan": e.colspan > 1 ? e.colspan : void 0,
      "aria-rowspan": e.rowspan > 1 ? e.rowspan : void 0,
      "aria-sort": !d?.order || e.filter ? "none" : d?.order === "asc" ? "ascending" : "descending",
      onKeyDown: v,
      children: [
        e.collapsible ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-RsQD74qC wx-collapse",
            role: "button",
            "aria-label": e.collapsed ? "Expand column" : "Collapse column",
            "aria-expanded": !e.collapsed,
            tabIndex: 0,
            onKeyDown: $,
            onClick: y,
            children: /* @__PURE__ */ p(
              "i",
              {
                className: `wx-RsQD74qC wxi-angle-${e.collapsed ? "down" : "right"}`
              }
            )
          }
        ) : null,
        e.cell ? (() => {
          const S = e.cell;
          return /* @__PURE__ */ p(
            S,
            {
              api: c,
              cell: k(),
              column: n,
              row: r,
              onAction: ({ action: M, data: R }) => c.exec(M, R)
            }
          );
        })() : e.filter ? /* @__PURE__ */ p(ju, { filter: e.filter, column: n }) : /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-text", children: e.text || "" }),
        n.resize && s && !e._hidden ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-RsQD74qC wx-grip",
            role: "presentation",
            "aria-label": "Resize column",
            ref: W,
            onClick: (S) => S.stopPropagation(),
            children: /* @__PURE__ */ p("div", {})
          }
        ) : null,
        o ? /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-sort", children: d ? /* @__PURE__ */ U(we, { children: [
          typeof d.index < "u" ? /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-order", children: d.index + 1 }) : null,
          /* @__PURE__ */ p(
            "i",
            {
              className: `wx-RsQD74qC wxi-arrow-${d.order === "asc" ? "up" : "down"}`
            }
          )
        ] }) : null }) : null
      ]
    }
  );
}
function Gu({ cell: t, column: e, row: n, columnStyle: r }) {
  const s = pe(je), o = T(
    () => Wn(
      t?.width,
      t?.flexgrow,
      e?.fixed,
      e?.left,
      t?.right ?? e?.right,
      t?.height
    ),
    [
      t?.width,
      t?.flexgrow,
      e?.fixed,
      e?.left,
      t?.right,
      e?.right,
      t?.height
    ]
  ), i = T(
    () => Wo(e, t, r),
    [e, t, r]
  ), a = P(() => Object.fromEntries(
    Object.entries(t || {}).filter(([c]) => c !== "cell")
  ), [t]), l = `wx-6Sdi3Dfd wx-cell ${i || ""} ${t?.css || ""}` + (e?.fixed && e?.fixed.right ? " wx-fixed-right" : "");
  return /* @__PURE__ */ p("div", { className: l, style: o, children: !e?.collapsed && !t?.collapsed ? t?.cell ? ei.createElement(t.cell, {
    api: s,
    cell: a(),
    column: e,
    row: n,
    onAction: ({ action: c, data: u }) => s.exec(c, u)
  }) : /* @__PURE__ */ p("div", { className: "wx-6Sdi3Dfd wx-text", children: t?.text || "" }) : null });
}
function $s({
  deltaLeft: t,
  contentWidth: e,
  columns: n,
  type: r = "header",
  columnStyle: s,
  bodyHeight: o
}) {
  const i = pe(je), a = re(i, "_sizes"), l = re(i, "split"), c = T(() => a?.[`${r}RowHeights`], [a, r]), u = T(() => {
    let m = [];
    if (n && n.length) {
      const x = n[0][r].length;
      for (let w = 0; w < x; w++) {
        let y = 0;
        m.push([]), n.forEach(($, v) => {
          const C = { ...$[r][w] };
          if (y || m[w].push(C), C.colspan > 1) {
            if (y = C.colspan - 1, !Cr() && $.right) {
              let D = $.right;
              for (let E = 1; E < C.colspan; E++)
                D -= n[v + E].width;
              C.right = D;
            }
          } else y && y--;
        });
      }
    }
    return m;
  }, [n, r]), d = T(() => l?.left || l?.right, [l]);
  function h(m) {
    return n.find((x) => x.id === m);
  }
  function f(m, x) {
    let w = x;
    return m.rowspan && (w += m.rowspan - 1), w === u.length - 1;
  }
  function g(m, x, w) {
    if (!w.sort) return !1;
    for (let y = u.length - 1; y >= 0; y--) {
      const $ = w.header[y];
      if (!$.filter && !$._hidden) return x === y;
    }
    return f(m, x);
  }
  return /* @__PURE__ */ p(
    "div",
    {
      className: `wx-sAsPVaUK wx-${r}`,
      style: { paddingLeft: `${t}px`, width: `${e}px` },
      role: "rowgroup",
      children: u.map((m, x) => /* @__PURE__ */ p(
        "div",
        {
          className: r === "header" ? "wx-sAsPVaUK wx-h-row" : "wx-sAsPVaUK wx-f-row",
          style: { height: `${c?.[x]}px`, display: "flex" },
          role: "row",
          children: m.map((w) => {
            const y = h(w.id);
            return r === "header" ? /* @__PURE__ */ p(
              Vu,
              {
                cell: w,
                columnStyle: s,
                column: y,
                row: x,
                lastRow: f(w, x),
                bodyHeight: o,
                sortRow: g(w, x, y),
                hasSplit: d
              },
              w.id
            ) : /* @__PURE__ */ p(
              Gu,
              {
                cell: w,
                columnStyle: s,
                column: h(w.id),
                row: x
              },
              w.id
            );
          })
        },
        x
      ))
    }
  );
}
function Bu({ overlay: t }) {
  const e = pe(je);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ p("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ p(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function qu(t) {
  const { actions: e, editor: n } = t, [r, s] = K(n?.value || ""), o = V(null);
  B(() => {
    o.current && o.current.focus();
  }, []);
  function i() {
    o.current && (s(o.current.value), e.updateValue(o.current.value));
  }
  function a({ key: l }) {
    l === "Enter" && e.save();
  }
  return /* @__PURE__ */ p(
    "input",
    {
      className: "wx-e7Ao5ejY wx-text",
      onInput: i,
      onKeyDown: a,
      ref: o,
      type: "text",
      value: r
    }
  );
}
function Ku({ actions: t, editor: e, onAction: n }) {
  const [r, s] = K(e?.value), [o, i] = K(e?.renderedValue), [a, l] = K(e?.options || []), c = T(() => e?.config?.template, [e]), u = T(() => e?.config?.cell, [e]), d = T(() => (a || []).findIndex((y) => y.id === r), [a, r]), h = V(null), f = V(null), g = P(
    (y) => {
      h.current = y.navigate, f.current = y.keydown, h.current(d);
    },
    [d, h]
  ), m = P(
    (y) => {
      const $ = y?.target?.value ?? "";
      i($);
      const v = $ ? (e?.options || []).filter(
        (C) => (C.label || "").toLowerCase().includes($.toLowerCase())
      ) : e?.options || [];
      l(v), v.length ? h.current(-1 / 0) : h.current(null);
    },
    [e]
  ), x = V(null);
  B(() => {
    x.current && x.current.focus();
  }, []), B(() => {
    s(e?.value), i(e?.renderedValue), l(e?.options || []);
  }, [e]);
  const w = P(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ U(we, { children: [
    /* @__PURE__ */ p(
      "input",
      {
        className: "wx-0UYfSd1x wx-input",
        ref: x,
        value: o ?? "",
        onChange: m,
        onKeyDown: (y) => f.current ? f.current(y, d) : void 0
      }
    ),
    /* @__PURE__ */ p(
      En,
      {
        items: a,
        onReady: g,
        onSelect: w,
        children: ({ option: y }) => c ? c(y) : u ? /* @__PURE__ */ p(u, { data: y, onAction: n }) : y.label
      }
    )
  ] });
}
function Uu({ actions: t, editor: e, onAction: n }) {
  const [r] = K(() => e.value || /* @__PURE__ */ new Date()), [s] = K(() => e.config?.template), [o] = K(() => e.config?.cell);
  function i({ value: l }) {
    t.updateValue(l), t.save();
  }
  const a = V(null);
  return B(() => {
    a.current && a.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ U(we, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        className: "wx-lNWNYUb6 wx-value",
        ref: a,
        tabIndex: 0,
        onClick: () => t.cancel(),
        onKeyDown: (l) => l.preventDefault(),
        children: s ? s(r) : o ? /* @__PURE__ */ p(o, { data: e.value, onAction: n }) : /* @__PURE__ */ p("span", { className: "wx-lNWNYUb6 wx-text", children: e.renderedValue })
      }
    ),
    /* @__PURE__ */ p(It, { width: "auto", children: /* @__PURE__ */ p(
      zs,
      {
        value: r,
        onChange: i,
        buttons: e.config?.buttons
      }
    ) })
  ] });
}
function Qu(t) {
  const { actions: e, editor: n } = t, r = t.onAction ?? t.onaction, s = n.config || {}, [o] = K(
    n.options.find((m) => m.id === n.value)
  ), [i] = K(n.value), [a] = K(n.options), l = T(
    () => a.findIndex((m) => m.id === i),
    [a, i]
  );
  function c({ id: m }) {
    e.updateValue(m), e.save();
  }
  let u;
  const [d, h] = K();
  function f(m) {
    u = m.navigate, h(() => m.keydown), u(l);
  }
  const g = V(null);
  return B(() => {
    g.current && g.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ U(we, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        ref: g,
        className: "wx-ywGRk611 wx-value",
        tabIndex: 0,
        onClick: () => e.cancel(),
        onKeyDown: (m) => {
          d(m, l), m.preventDefault();
        },
        children: s.template ? s.template(o) : s.cell ? (() => {
          const m = s.cell;
          return /* @__PURE__ */ p(m, { data: o, onAction: r });
        })() : /* @__PURE__ */ p("span", { className: "wx-ywGRk611 wx-text", children: n.renderedValue })
      }
    ),
    /* @__PURE__ */ p(En, { items: a, onReady: f, onSelect: c, children: ({ option: m }) => s.template ? s.template(m) : s.cell ? (() => {
      const x = s.cell;
      return /* @__PURE__ */ p(x, { data: m, onAction: r });
    })() : m.label })
  ] });
}
const Xu = {
  text: qu,
  combo: Ku,
  datepicker: Uu,
  richselect: Qu
};
function Ju({ column: t, row: e }) {
  const n = pe(je), r = re(n, "editor"), s = P(
    (g, m) => {
      n.exec("close-editor", { ignore: g }), m && n.exec("focus-cell", {
        ...m,
        eventSource: "click"
      });
    },
    [n]
  ), o = P(
    (g) => {
      const m = g ? null : { row: r?.id, column: r?.column };
      s(!1, m);
    },
    [r, s]
  ), i = P(() => {
    s(!0, { row: r?.id, column: r?.column });
  }, [r, s]), a = P(
    (g) => {
      n.exec("editor", { value: g });
    },
    [n]
  ), l = P(
    (g) => {
      g.key === "Enter" && r && i();
    },
    [r, i]
  ), c = T(
    () => Wn(
      t.width,
      t.flexgrow,
      t.fixed,
      t.left,
      t.right
    ),
    [t.width, t.flexgrow, t.fixed, t.left, t.right]
  ), u = T(() => {
    let g = t.editor;
    typeof g == "function" && (g = g(e, t));
    let m = typeof g == "string" ? g : g.type;
    return Xu[m];
  }, [t, e]), d = V(null);
  B(() => {
    if (!d.current) return;
    const g = Jt(d.current, () => o(!0));
    return () => {
      typeof g == "function" && g();
    };
  }, [o]), B(() => {
    d.current && typeof c == "string" && d.current.setAttribute("style", c);
  }, [c]);
  const h = typeof e.$parent < "u" ? "gridcell" : "cell", f = typeof e.$parent < "u" ? !t.editor : void 0;
  return /* @__PURE__ */ p(
    "div",
    {
      className: "wx-8l724t2g wx-cell wx-editor",
      ref: d,
      style: typeof c == "object" && c !== null ? c : void 0,
      role: h,
      "aria-readonly": f,
      tabIndex: -1,
      onClick: (g) => g.stopPropagation(),
      onDoubleClick: (g) => g.stopPropagation(),
      onKeyDown: l,
      children: u ? /* @__PURE__ */ p(
        u,
        {
          editor: r,
          actions: { save: o, cancel: i, updateValue: a },
          onAction: ({ action: g, data: m }) => n.exec(g, m)
        }
      ) : null
    }
  );
}
function Ss(t) {
  const { columns: e, type: n, columnStyle: r } = t, s = pe(je), { filterValues: o, _columns: i, _sizes: a } = s.getState();
  function l(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ p(we, { children: e.map((c, u) => /* @__PURE__ */ p("tr", { children: c.map((d) => {
    const h = i.find((m) => m.id == d.id), f = `wx-print-cell-${n}${l(h)}${d.filter ? " wx-print-cell-filter" : ""}${d.vertical ? " wx-vertical" : ""}`, g = d.cell;
    return /* @__PURE__ */ p(
      "th",
      {
        style: Ws(No(d, a.columnWidth)),
        className: "wx-Gy81xq2u " + f,
        rowSpan: d.rowspan,
        colSpan: d.colspan,
        children: g ? /* @__PURE__ */ p(
          g,
          {
            api: s,
            cell: Object.fromEntries(
              Object.entries(d).filter(([m]) => m !== "cell")
            ),
            column: h,
            row: u
          }
        ) : d.filter ? /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-print-filter", children: jc(o, i, d) }) : /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-text", children: d.text ?? "" })
      },
      d.id
    );
  }) }, u)) });
}
function Zu(t) {
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: i, reorder: a } = t, l = pe(je), { flatData: c, _sizes: u } = l.getState(), d = o && ms(e, "header", u.headerRowHeights), h = i && ms(e, "footer", u.footerRowHeights);
  function f(m, x) {
    let w = "";
    return w += r ? " " + r(x) : "", w += s ? " " + s(m, x) : "", w;
  }
  function g(m, x) {
    return typeof x.draggable == "function" ? x.draggable(m, x) !== !1 : x.draggable;
  }
  return /* @__PURE__ */ U(
    "table",
    {
      className: `wx-8NTMLH0z wx-print-grid ${e.some((m) => m.flexgrow) ? "wx-flex-columns" : ""}`,
      children: [
        o ? /* @__PURE__ */ p("thead", { children: /* @__PURE__ */ p(
          Ss,
          {
            columns: d,
            type: "header",
            columnStyle: r
          }
        ) }) : null,
        /* @__PURE__ */ p("tbody", { children: c.map((m, x) => /* @__PURE__ */ p(
          "tr",
          {
            className: "wx-8NTMLH0z wx-row" + (n ? " " + n(m) : ""),
            children: e.map(
              (w) => w.collapsed ? null : /* @__PURE__ */ U(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${f(m, w)}`,
                  style: Ws(
                    No(w, u.columnWidth)
                  ),
                  children: [
                    a && w.draggable ? /* @__PURE__ */ p("span", { className: "wx-8NTMLH0z wx-print-draggable", children: g(m, w) ? /* @__PURE__ */ p("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    w.treetoggle ? /* @__PURE__ */ U(we, { children: [
                      /* @__PURE__ */ p(
                        "span",
                        {
                          style: { marginLeft: m.$level * 28 + "px" }
                        }
                      ),
                      m.$count ? /* @__PURE__ */ p(
                        "i",
                        {
                          className: `wx-8NTMLH0z wx-print-grid-tree-toggle wxi-menu-${m.open !== !1 ? "down" : "right"}`
                        }
                      ) : null
                    ] }) : null,
                    w.cell ? (() => {
                      const y = w.cell;
                      return /* @__PURE__ */ p(y, { api: l, row: m, column: w });
                    })() : /* @__PURE__ */ p("span", { children: Ht(m, w) })
                  ]
                },
                w.id
              )
            )
          },
          x
        )) }),
        i ? /* @__PURE__ */ p("tfoot", { children: /* @__PURE__ */ p(
          Ss,
          {
            columns: h,
            type: "footer",
            columnStyle: r
          }
        ) }) : null
      ]
    }
  );
}
function ed(t) {
  const { config: e, ...n } = t, r = pe(je), { _skin: s, _columns: o } = r.getState(), i = T(() => Pc(o, e), []), a = V(null);
  return B(() => {
    const l = document.body;
    l.classList.add("wx-print");
    const c = a.current;
    if (!c) return;
    const u = c.cloneNode(!0);
    l.appendChild(u);
    const d = `@media print { @page { size: ${e.paper} ${e.mode}; }`, h = document.createElement("style");
    h.setAttribute("type", "text/css"), h.setAttribute("media", "print"), document.getElementsByTagName("head")[0].appendChild(h), h.appendChild(document.createTextNode(d)), window.print(), h.remove(), l.classList.remove("wx-print"), u.remove();
  }, []), /* @__PURE__ */ p(
    "div",
    {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: a,
      children: i.map((l, c) => /* @__PURE__ */ p("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ p(Zu, { columns: l, ...n }) }, c))
    }
  );
}
function td(t) {
  const {
    header: e,
    footer: n,
    overlay: r,
    multiselect: s,
    reorder: o,
    onreorder: i,
    rowStyle: a,
    columnStyle: l,
    cellStyle: c,
    autoRowHeight: u,
    resize: d,
    clientWidth: h,
    clientHeight: f,
    responsiveLevel: g
  } = t, m = pe(je), x = re(m, "dynamic"), w = re(m, "_columns"), y = re(m, "flatData"), $ = re(m, "split"), v = re(m, "_sizes"), [C, D] = kn(m, "selectedRows"), E = re(m, "select"), I = re(m, "editor"), _ = re(m, "tree"), k = re(m, "focusCell"), b = re(m, "_print"), L = re(m, "undo"), [W, S] = K(0);
  B(() => {
    S(Uo());
  }, []);
  const [M, R] = K(0), [N, A] = K(0), j = T(() => (w || []).some((Y) => !Y.hidden && Y.flexgrow), [w]), H = T(() => v?.rowHeight || 0, [v]), O = V(null), [q, Q] = K(null), [ce, Z] = K(null), ie = T(() => {
    let Y = [], J = 0;
    return $ && $.left && (Y = (w || []).slice(0, $.left).filter((ae) => !ae.hidden).map((ae) => ({ ...ae })), Y.forEach((ae) => {
      ae.fixed = { left: 1 }, ae.left = J, J += ae.width;
    }), Y.length && (Y[Y.length - 1].fixed = { left: -1 })), { columns: Y, width: J };
  }, [$, w]), ue = T(() => {
    let Y = [], J = 0;
    if ($ && $.right) {
      Y = (w || []).slice($.right * -1).filter((ae) => !ae.hidden).map((ae) => ({ ...ae }));
      for (let ae = Y.length - 1; ae >= 0; ae--) {
        const ve = Y[ae];
        ve.fixed = { right: 1 }, ve.right = J, J += ve.width;
      }
      Y.length && (Y[0].fixed = { right: -1 });
    }
    return { columns: Y, width: J };
  }, [$, w]), G = T(() => {
    const Y = (w || []).slice($?.left || 0, (w || []).length - ($?.right ?? 0)).filter((J) => !J.hidden);
    return Y.forEach((J) => {
      J.fixed = 0;
    }), Y;
  }, [w, $]), ee = T(() => (w || []).reduce((Y, J) => (J.hidden || (Y += J.width), Y), 0), [w]), se = 1;
  function fe(Y, J, ae) {
    let ve = J, Te = Y;
    if (G.length) {
      let Se = G.length;
      for (let me = Y; me >= 0; me--)
        G[me][ae].forEach((Ie) => {
          Ie.colspan > 1 && me > Y - Ie.colspan && me < Se && (Se = me);
        });
      if (Se !== G.length && Se < Y) {
        for (let me = Se; me < Y; me++)
          ve -= G[me].width;
        Te = Se;
      }
    }
    return { index: Te, delta: ve };
  }
  const oe = T(() => {
    let Y, J, ae;
    const ve = M, Te = M + (h || 0);
    let Se = 0, me = 0, Ie = 0, tt = 0;
    G.forEach((ut, St) => {
      ve > Ie && (Se = St, tt = Ie), Ie = Ie + ut.width, Te > Ie && (me = St + se);
    });
    const rt = { header: 0, footer: 0 };
    for (let ut = me; ut >= Se; ut--)
      ["header", "footer"].forEach((St) => {
        G[ut] && G[ut][St].forEach((Zo) => {
          const zn = Zo.colspan;
          if (zn && zn > 1) {
            const Lr = zn - (me - ut + 1);
            Lr > 0 && (rt[St] = Math.max(rt[St], Lr));
          }
        });
      });
    const $t = fe(Se, tt, "header"), on = fe(Se, tt, "footer"), Pt = $t.delta, an = $t.index, ln = on.delta, Yn = on.index;
    return j && ee > (h || 0) ? Y = J = ae = [...ie.columns, ...G, ...ue.columns] : (Y = [
      ...ie.columns,
      ...G.slice(Se, me + 1),
      ...ue.columns
    ], J = [
      ...ie.columns,
      ...G.slice(an, me + rt.header + 1),
      ...ue.columns
    ], ae = [
      ...ie.columns,
      ...G.slice(Yn, me + rt.footer + 1),
      ...ue.columns
    ]), {
      data: Y || [],
      header: J || [],
      footer: ae || [],
      d: tt,
      df: ln,
      dh: Pt
    };
  }, [
    G,
    ie,
    ue,
    M,
    h,
    j,
    ee
  ]), _e = T(
    () => e && v?.headerHeight || 0,
    [e, v]
  ), Ae = T(
    () => n && v?.footerHeight || 0,
    [n, v]
  ), Le = T(() => h && f ? ee >= h : !1, [h, f, ee]), Ve = T(() => (f || 0) - _e - Ae - (Le ? W : 0), [f, _e, Ae, Le, W]), F = T(() => Math.ceil((Ve || 0) / (H || 1)) + 1, [Ve, H]), ne = V([]), [ge, he] = K(0), [xe, Ee] = K(void 0), Ce = T(() => {
    let Y = 0, J = 0;
    if (u) {
      let Te = N;
      for (; Te > 0; )
        Te -= ne.current[Y] || H, Y++;
      J = N - Te;
      for (let Se = Math.max(0, Y - 2 - 1); Se < Y; Se++)
        J -= ne.current[Y - Se] || H;
      Y = Math.max(0, Y - 2);
    } else
      Y = Math.floor(N / (H || 1)), Y = Math.max(0, Y - 2), J = Y * (H || 0);
    const ae = x ? x.rowCount : (y || []).length, ve = Math.min(ae, Y + (F || 0) + 2);
    return { d: J, start: Y, end: ve };
  }, [u, N, H, x, y, F]), He = T(() => {
    const Y = x ? x.rowCount : (y || []).length, J = Y * (H || 0);
    return u ? ge + Ce.d + (Y - (xe || 0)) * (H || 0) : J;
  }, [
    x,
    y,
    H,
    u,
    ge,
    Ce.d,
    xe
  ]), De = T(() => h && f ? He + _e + Ae >= f - (ee >= (h || 0) ? W : 0) : !1, [
    h,
    f,
    He,
    _e,
    Ae,
    ee,
    W
  ]), be = T(() => j && ee <= (h || 0) ? (h || 0) - 0 - (De ? W : 0) : ee, [j, ee, h, De, W, Le]), Qe = T(() => j && ee <= (h || 0) ? h || 0 : be < (h || 0) ? ee + (De ? W : 0) : -1, [j, ee, h, be, De, W]), Xe = V({});
  B(() => {
    if (x && (Xe.current.start !== Ce.start || Xe.current.end !== Ce.end)) {
      const { start: Y, end: J } = Ce;
      Xe.current = { start: Y, end: J }, m && m.exec && m.exec("request-data", { row: { start: Y, end: J } });
    }
  }, [x, Ce, m]);
  const z = T(() => x ? y || [] : (y || []).slice(Ce.start, Ce.end), [x, y, Ce]), X = T(() => (C || []).filter(
    (Y) => (z || []).some((J) => J.id === Y)
  ), [D, z]), te = T(() => Ce.start, [Ce.start]), de = P((Y) => {
    A(Y.target.scrollTop), R(Y.target.scrollLeft);
  }, []), ke = P((Y) => {
    Y.shiftKey && Y.preventDefault(), O.current && O.current.focus && O.current.focus();
  }, []), ye = P(() => !!(w || []).find((Y) => !!Y.draggable), [w]), Ne = V(null), Oe = V(null), Go = V({
    dblclick: (Y, J) => {
      const ae = { id: Y, column: Xn(J, "data-col-id") };
      m.exec("open-editor", ae);
    },
    click: (Y, J) => {
      if (Ne.current) return;
      const ae = Xn(J, "data-col-id"), ve = m.getState().focusCell;
      if ((!ve || ve.row !== Y || ve.column !== ae) && m.exec("focus-cell", { row: Y, column: ae, eventSource: "click" }), E === !1) return;
      const Te = s && J.ctrlKey, Se = s && J.shiftKey, me = m.getState().selectedRows;
      (me.length !== 1 || me[0] !== Y) && E && m.exec("select-row", { id: Y, toggle: Te, range: Se });
    },
    "toggle-row": (Y) => {
      const J = m.getRow(Y);
      m.exec(J.open !== !1 ? "close-row" : "open-row", { id: Y });
    },
    "ignore-click": () => !1
  }), rn = T(() => ({
    top: _e,
    bottom: Ae,
    left: ie.width,
    xScroll: Le,
    yScroll: De,
    sense: u && ce ? ce.offsetHeight : Math.max(v?.rowHeight || 0, 40),
    node: O.current && O.current.firstElementChild
  }), [
    _e,
    Ae,
    ie.width,
    Le,
    De,
    u,
    ce,
    v
  ]);
  function Bo(Y, J) {
    const { container: ae, sourceNode: ve, from: Te } = J;
    if (ye() && !ve.getAttribute("draggable-data"))
      return !1;
    Q(Te), m.getRow(Te).open && m.exec("close-row", { id: Te, nested: !0 });
    const Se = ze(ve, "data-id"), me = Se.cloneNode(!0);
    me.classList.remove("wx-selected"), me.querySelectorAll("[tabindex]").forEach(($t) => $t.setAttribute("tabindex", "-1")), ae.appendChild(me), Z(me);
    const Ie = M - oe.d, tt = De ? W : 0;
    ae.style.width = Math.min(
      (h || 0) - tt,
      j && ee <= (h || 0) ? be : be - tt
    ) + Ie + "px";
    const rt = wn(Se);
    J.offset = {
      x: Ie,
      y: -Math.round(rt.height / 2)
    }, Oe.current || (Oe.current = Y.clientY);
  }
  function qo(Y, J) {
    const { from: ae } = J, ve = J.pos, Te = wn(O.current);
    ve.x = Te.x;
    const Se = rn.top;
    if (ve.y < Se) ve.y = Se;
    else {
      const me = Te.height - (Le && W > 0 ? W : Math.round(rn.sense / 2)) - rn.bottom;
      ve.y > me && (ve.y = me);
    }
    if (O.current.contains(J.targetNode)) {
      const me = ze(J.targetNode, "data-id"), Ie = Ot(me?.getAttribute("data-id"));
      if (Ie && Ie !== ae) {
        J.to = Ie;
        const tt = u ? ce?.offsetHeight : v?.rowHeight;
        if (N === 0 || ve.y > Se + tt - 1) {
          const rt = me.getBoundingClientRect(), $t = wn(ce).y, on = rt.y, Pt = $t > on ? -1 : 1, an = Pt === 1 ? "after" : "before", ln = Math.abs(m.getRowIndex(ae) - m.getRowIndex(Ie)), Yn = ln !== 1 ? an === "before" ? "after" : "before" : an;
          if (ln === 1 && (Pt === -1 && Y.clientY > Oe.current || Pt === 1 && Y.clientY < Oe.current))
            return;
          Oe.current = Y.clientY, m.exec("move-item", {
            id: ae,
            target: Ie,
            mode: Yn,
            inProgress: !0
          });
        }
      }
      i && i({ event: Y, context: J });
    }
    Au(Y, Te, J, rn);
  }
  function Ko(Y, J) {
    const { from: ae, to: ve } = J;
    m.exec("move-item", {
      id: ae,
      target: ve,
      inProgress: !1
    }), Ne.current = setTimeout(() => {
      Ne.current = 0;
    }, 1), Q(null), Z(null), Oe.current = null, Io(J);
  }
  function Uo() {
    const Y = document.createElement("div");
    Y.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(Y);
    const J = Y.offsetWidth - Y.clientWidth;
    return document.body.removeChild(Y), J;
  }
  const Qo = T(() => Qe > 0 ? { width: `${Qe}px` } : void 0, [Qe]), Er = V(null);
  function Xo() {
    Promise.resolve().then(() => {
      let Y = 0, J = te;
      const ae = Er.current;
      ae && (Array.from(ae.children).forEach((ve, Te) => {
        ne.current[te + Te] = ve.offsetHeight, Y += ve.offsetHeight, J++;
      }), he(Y), Ee(J));
    });
  }
  B(() => {
    z && u && Xo();
  }, [z, u, te]);
  let [kt, Pn] = K();
  B(() => {
    if (k && (!E || !X.length || X.includes(k.row)))
      Pn({ ...k });
    else if (z.length && oe.data.length) {
      if (!kt || X.length && !X.includes(kt.row) || z.findIndex((Y) => Y.id == kt.row) === -1 || oe.data.findIndex(
        (Y) => Y.id == kt.column && !Y.collapsed
      ) === -1) {
        const Y = X[0] || z[0].id, J = oe.data.findIndex((ae) => !ae.collapsed);
        Pn(J !== -1 ? { row: Y, column: oe.data[J].id } : null);
      }
    } else Pn(null);
  }, [k]);
  const Rr = V(null);
  B(() => {
    const Y = O.current;
    if (!Y) return;
    const J = Mu(Y, d);
    return () => {
      typeof J == "function" && J();
    };
  }, [d]);
  const Ar = V({});
  Object.assign(Ar.current, {
    start: Bo,
    move: qo,
    end: Ko,
    getReorder: () => o,
    getDraggableInfo: () => ({ hasDraggable: ye() })
  }), B(() => {
    const Y = O.current;
    return Y ? Tu(Y, Ar).destroy : void 0;
  }, [o, O.current]), B(() => {
    const Y = O.current;
    return Y ? Mr(Y, {
      keys: Wu({ undo: L }),
      exec: (J) => m.exec("hotkey", J)
    }).destroy : void 0;
  }, [m, L]);
  const sn = V({
    scroll: m.getReactiveState().scroll
  });
  sn.current.getWidth = () => (h || 0) - (De ? W : 0), sn.current.getHeight = () => Ve, sn.current.getScrollMargin = () => ie.width + ue.width, B(() => {
    iu(Rr.current, sn.current);
  }, []);
  const Or = V(null);
  B(() => {
    const Y = Or.current;
    if (!Y) return;
    const J = [];
    return J.push(
      Jt(Y, () => m.exec("focus-cell", { eventSource: "click" })).destroy
    ), J.push(xi(Y, Go.current)), () => J.forEach((ae) => ae());
  }, []);
  const Jo = `wx-grid ${g ? `wx-responsive-${g}` : ""}`;
  return /* @__PURE__ */ U(we, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        className: "wx-4VuBwK2D " + Jo,
        style: {
          "--header-height": `${_e}px`,
          "--footer-height": `${Ae}px`,
          "--split-left-width": `${ie.width}px`,
          "--split-right-width": `${ue.width}px`
        },
        children: /* @__PURE__ */ p(
          "div",
          {
            ref: O,
            className: "wx-4VuBwK2D wx-table-box",
            style: Qo,
            role: _ ? "treegrid" : "grid",
            "aria-colcount": oe.data.length,
            "aria-rowcount": z.length,
            "aria-multiselectable": _ && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ U(
              "div",
              {
                ref: Rr,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: Le ? "scroll" : "hidden",
                  overflowY: De ? "scroll" : "hidden"
                },
                onScroll: de,
                children: [
                  e ? /* @__PURE__ */ p("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ p(
                    $s,
                    {
                      contentWidth: be,
                      deltaLeft: oe.dh,
                      columns: oe.header,
                      columnStyle: l,
                      bodyHeight: Ve - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ U(
                    "div",
                    {
                      ref: Or,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${be}px`, height: `${He}px` },
                      onMouseDown: (Y) => ke(Y),
                      children: [
                        r ? /* @__PURE__ */ p(Bu, { overlay: r }) : null,
                        /* @__PURE__ */ p(
                          "div",
                          {
                            ref: Er,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${Ce.d}px`,
                              paddingLeft: `${oe.d}px`
                            },
                            children: z.map((Y, J) => {
                              const ae = C.indexOf(Y.id) !== -1, ve = q === Y.id, Te = "wx-row" + (u ? " wx-autoheight" : "") + (a ? " " + a(Y) : "") + (ae ? " wx-selected" : "") + (ve ? " wx-inactive" : ""), Se = u ? { minHeight: `${H}px` } : { height: `${H}px` };
                              return /* @__PURE__ */ p(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + Te,
                                  "data-id": Y.id,
                                  "data-context-id": Y.id,
                                  style: Se,
                                  role: "row",
                                  "aria-rowindex": J,
                                  "aria-expanded": Y.open,
                                  "aria-level": _ ? Y.$level + 1 : void 0,
                                  "aria-selected": _ ? ae : void 0,
                                  tabIndex: -1,
                                  children: oe.data.map((me) => me.collapsed ? /* @__PURE__ */ p(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    me.id
                                  ) : I?.id === Y.id && I.column == me.id ? /* @__PURE__ */ p(Ju, { row: Y, column: me }, me.id) : /* @__PURE__ */ p(
                                    Pu,
                                    {
                                      row: Y,
                                      column: me,
                                      columnStyle: l,
                                      cellStyle: c,
                                      reorder: o,
                                      focusable: kt?.row === Y.id && kt?.column == me.id
                                    },
                                    me.id
                                  ))
                                },
                                Y.id
                              );
                            })
                          }
                        )
                      ]
                    }
                  ),
                  n && (y || []).length ? /* @__PURE__ */ p(
                    $s,
                    {
                      type: "footer",
                      contentWidth: be,
                      deltaLeft: oe.df,
                      columns: oe.footer,
                      columnStyle: l
                    }
                  ) : null
                ]
              }
            )
          }
        )
      }
    ),
    b ? /* @__PURE__ */ p(
      ed,
      {
        config: b,
        rowStyle: a,
        columnStyle: l,
        cellStyle: c,
        header: e,
        footer: n,
        reorder: o
      }
    ) : null
  ] });
}
const nd = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), rd = vt(function({
  data: t = [],
  columns: e = [],
  rowStyle: n = null,
  columnStyle: r = null,
  cellStyle: s = null,
  selectedRows: o,
  select: i = !0,
  multiselect: a = !1,
  header: l = !0,
  footer: c = !1,
  dynamic: u = null,
  overlay: d = null,
  reorder: h = !1,
  onReorder: f = null,
  autoRowHeight: g = !1,
  sizes: m,
  split: x,
  tree: w = !1,
  autoConfig: y = !1,
  init: $ = null,
  responsive: v = null,
  sortMarks: C,
  undo: D = !1,
  ...E
}, I) {
  const _ = V();
  _.current = E;
  const k = T(() => new ru(Ps), []), b = T(() => k.in, [k]), L = V(null);
  L.current === null && (L.current = new Bs((G, ee) => {
    const se = "on" + nd(G);
    _.current && _.current[se] && _.current[se](ee);
  }), b.setNext(L.current));
  const W = T(
    () => ({
      getState: k.getState.bind(k),
      getReactiveState: k.getReactive.bind(k),
      getStores: () => ({ data: k }),
      exec: b.exec,
      setNext: (G) => (L.current = L.current.setNext(G), L.current),
      intercept: b.intercept.bind(b),
      on: b.on.bind(b),
      detach: b.detach.bind(b),
      getRow: k.getRow.bind(k),
      getRowIndex: k.getRowIndex.bind(k),
      getColumn: k.getColumn.bind(k)
    }),
    [k, b]
  ), [S, M] = K(0), [R, N] = K(0), [A, j] = K(null), [H, O] = K(null), q = T(() => {
    if (y && !e.length && t.length) {
      const G = t[0], ee = [];
      for (let se in G)
        if (se !== "id" && se[0] !== "$") {
          let fe = {
            id: se,
            header: se[0].toUpperCase() + se.slice(1)
          };
          typeof y == "object" && (fe = { ...fe, ...y }), ee.push(fe);
        }
      return ee;
    }
    return (H && H.columns) ?? e;
  }, [y, e, t, H]), Q = T(
    () => (H && H.sizes) ?? m,
    [H, m]
  ), ce = P(
    (G) => {
      if (M(G.width), N(G.height), v) {
        const ee = Object.keys(v).map(Number).sort((se, fe) => se - fe).find((se) => G.width <= se) ?? null;
        ee !== A && (O(v[ee]), j(ee));
      }
    },
    [v, A]
  ), Z = T(() => {
    let G = !w;
    return Cr() || (G = !0), G ? h : !1;
  }, [w, h]), ie = pe(Fe.theme), ue = V(0);
  return B(() => {
    if (!ue.current)
      $ && $(W);
    else {
      const G = k.getState();
      k.init({
        data: t,
        columns: q,
        split: x || G.split,
        sizes: Q || G.sizes,
        selectedRows: o || G.selectedRows,
        dynamic: u,
        tree: w,
        sortMarks: C || G.sortMarks,
        undo: D,
        _skin: ie,
        _select: i
      });
    }
    ue.current++;
  }, [
    k,
    t,
    q,
    x,
    Q,
    o,
    u,
    w,
    C,
    D,
    ie,
    i,
    $,
    W
  ]), ue.current === 0 && k.init({
    data: t,
    columns: q,
    split: x || { left: 0 },
    sizes: Q || {},
    selectedRows: o || [],
    dynamic: u,
    tree: w,
    sortMarks: C || {},
    undo: D,
    _skin: ie,
    select: i
  }), bt(
    I,
    () => ({
      ...W
    }),
    [W]
  ), /* @__PURE__ */ p(je.Provider, { value: W, children: /* @__PURE__ */ p(tn, { words: cu, optional: !0, children: /* @__PURE__ */ p(
    td,
    {
      header: l,
      footer: c,
      overlay: d,
      rowStyle: n,
      columnStyle: r,
      cellStyle: s,
      reorder: Z,
      onReorder: f,
      multiselect: a,
      autoRowHeight: g,
      clientWidth: S,
      clientHeight: R,
      responsiveLevel: A,
      resize: ce
    }
  ) }) });
});
function sd({ item: t }) {
  return /* @__PURE__ */ U(
    "div",
    {
      tabIndex: -1,
      role: "menuitem",
      "aria-label": t.hidden ? `Show ${t.text} column` : `Hide ${t.text} column`,
      children: [
        /* @__PURE__ */ p(
          "div",
          {
            className: "wx-v13lZxja wx-icon" + (t.hidden ? " wx-hidden" : ""),
            children: /* @__PURE__ */ p("i", { className: "wx-v13lZxja wxi-eye" })
          }
        ),
        /* @__PURE__ */ p("span", { children: t.text })
      ]
    }
  );
}
function od({ columns: t = null, api: e, children: n }) {
  B(() => {
    fu("table-header", sd);
  }, []);
  function r(l) {
    for (let c = l.header.length - 1; c >= 0; c--) {
      const u = l.header[c].text;
      if (u) return u;
    }
    return l.id;
  }
  function s(l) {
    const c = l.action;
    c && e.exec("hide-column", { id: c.id, mode: !c.hidden });
  }
  function o(l) {
    return l;
  }
  const i = mt(e, "_columns"), a = T(() => {
    if (e) {
      const l = Array.isArray(i) ? i : [];
      return (t ? l.filter((c) => t[c.id]) : l).map((c) => {
        const u = r(c);
        return {
          id: c.id,
          text: u,
          type: "table-header",
          hidden: c.hidden
        };
      });
    } else
      return [];
  }, [e, t, i]);
  return /* @__PURE__ */ p(
    Oo,
    {
      dataKey: "headerId",
      options: a,
      onClick: s,
      at: "point",
      resolver: o,
      children: typeof n == "function" ? n() : n
    }
  );
}
fr(Cu);
function id({ row: t, column: e }) {
  function n(s, o) {
    return {
      justifyContent: o.align,
      paddingLeft: `${(s.$level - 1) * 20}px`
    };
  }
  const r = e && e._cell;
  return /* @__PURE__ */ U("div", { className: "wx-pqc08MHU wx-content", style: n(t, e), children: [
    t.data || t.lazy ? /* @__PURE__ */ p(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ p("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ p("div", { className: "wx-pqc08MHU wx-text", children: r ? /* @__PURE__ */ p(r, { row: t, column: e }) : t.text })
  ] });
}
function _s({ column: t, cell: e }) {
  const n = T(() => t.id, [t?.id]);
  return e || t.id == "add-task" ? /* @__PURE__ */ p("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ p(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": n
    }
  ) }) : null;
}
function ad(t) {
  const { readonly: e, compactMode: n, width: r = 0, display: s = "all", columnWidth: o = 0, onTableAPIChange: i } = t, [a, l] = Me(o), [c, u] = K(), d = pe(Fe.i18n), h = T(() => d.getGroup("gantt"), [d]), f = pe(ct), g = re(f, "scrollTop"), m = re(f, "cellHeight"), x = re(f, "_scrollTask"), w = re(f, "_selected"), y = re(f, "area"), $ = re(f, "_tasks"), v = re(f, "_scales"), C = re(f, "columns"), D = re(f, "_sort"), E = re(f, "durationUnit"), I = V(null), _ = V(!0), [k, b] = K(null), L = T(() => !$ || !y ? [] : $.slice(y.start, y.end), [$, y]), W = P(
    (z, X) => {
      if (X === "add-task")
        f.exec(X, {
          target: z,
          task: { text: h("New Task") },
          mode: "child",
          show: !0
        });
      else if (X === "open-task") {
        const te = L.find((de) => de.id === z);
        (te?.data || te?.lazy) && f.exec(X, { id: z, mode: !te.open });
      }
    },
    [L]
  ), S = P(
    (z) => {
      const X = qt(z), te = z.target.dataset.action;
      te && z.preventDefault(), X ? te === "add-task" || te === "open-task" ? W(X, te) : f.exec("select-task", {
        id: X,
        toggle: z.ctrlKey || z.metaKey,
        range: z.shiftKey,
        show: !0
      }) : te === "add-task" && W(null, te);
    },
    [f, W]
  ), M = V(null), R = V(null), [N, A] = K(0), [j, H] = K(!1);
  B(() => {
    const z = R.current;
    if (!z || typeof ResizeObserver > "u") return;
    const X = () => A(z.clientWidth);
    X();
    const te = new ResizeObserver(X);
    return te.observe(z), () => te.disconnect();
  }, []);
  const O = V(null), q = P(
    (z) => {
      const X = z.id, { before: te, after: de } = z, ke = z.onMove;
      let ye = te || de, Ne = te ? "before" : "after";
      if (ke) {
        if (Ne === "after") {
          const Oe = f.getTask(ye);
          Oe.data?.length && Oe.open && (Ne = "before", ye = Oe.data[0].id);
        }
        O.current = { id: X, [Ne]: ye };
      } else O.current = null;
      f.exec("move-task", {
        id: X,
        mode: Ne,
        target: ye,
        inProgress: ke
      });
    },
    [f]
  ), Q = T(() => y?.from ?? 0, [y]), ce = T(() => v?.height ?? 0, [v]), Z = T(() => !n && s !== "grid" ? (a ?? 0) > (r ?? 0) : (a ?? 0) > (N ?? 0), [n, s, a, r, N]), ie = T(() => {
    const z = {};
    return Z && s === "all" || s === "grid" && Z ? z.width = a : s === "grid" && (z.width = "100%"), z;
  }, [Z, s, a]), ue = T(() => k && !L.find((z) => z.id === k.id) ? [...L, k] : L, [L, k]), G = T(() => {
    let z = (C || []).map((de) => {
      de = { ...de };
      const ke = de.header;
      if (typeof ke == "object") {
        const ye = ke.text && h(ke.text);
        de.header = { ...ke, text: ye };
      } else de.header = h(ke);
      return de;
    });
    const X = z.findIndex((de) => de.id === "text"), te = z.findIndex((de) => de.id === "add-task");
    if (X !== -1 && (z[X].cell && (z[X]._cell = z[X].cell), z[X].cell = id), te !== -1) {
      z[te].cell = z[te].cell || _s;
      const de = z[te].header;
      if (typeof de != "object" && (z[te].header = { text: de }), z[te].header.cell = de.cell || _s, e)
        z.splice(te, 1);
      else if (n) {
        const [ke] = z.splice(te, 1);
        z.unshift(ke);
      }
    }
    return z.length > 0 && (z[z.length - 1].resize = !1), z;
  }, [C, h, e, n]), ee = T(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : G.find((z) => z.id === "add-task") ? "50px" : "0", [s, r, G]), se = T(() => {
    if (ue && D?.length) {
      const z = {};
      return D.forEach(({ key: X, order: te }, de) => {
        z[X] = {
          order: te,
          ...D.length > 1 && { index: de }
        };
      }), z;
    }
    return {};
  }, [ue, D]), fe = P(() => G.some((z) => z.flexgrow && !z.hidden), []), oe = T(() => fe(), [fe, j]), _e = T(() => {
    let z = s === "chart" ? G.filter((te) => te.id === "add-task") : G;
    const X = s === "all" ? r : N;
    if (!oe) {
      let te = a, de = !1;
      if (G.some((ke) => ke.$width)) {
        let ke = 0;
        te = G.reduce((ye, Ne) => (Ne.hidden || (ke += Ne.width, ye += Ne.$width || Ne.width), ye), 0), ke > te && te > X && (de = !0);
      }
      if (de || te < X) {
        let ke = 1;
        return de || (ke = (X - 50) / (te - 50 || 1)), z.map((ye) => (ye.id !== "add-task" && !ye.hidden && (ye.$width || (ye.$width = ye.width), ye.width = ye.$width * ke), ye));
      }
    }
    return z;
  }, [s, G, oe, a, r, N]), Ae = P(
    (z) => {
      if (!fe()) {
        const X = _e.reduce((te, de) => (z && de.$width && (de.$width = de.width), te + (de.hidden ? 0 : de.width)), 0);
        X !== a && l(X);
      }
      H(!0), H(!1);
    },
    [fe, _e, a, l]
  ), Le = P(() => {
    G.filter((X) => X.flexgrow && !X.hidden).length === 1 && G.forEach((X) => {
      X.$width && !X.flexgrow && !X.hidden && (X.width = X.$width);
    });
  }, []), Ve = P(
    (z) => {
      if (!e) {
        const X = qt(z), te = Xn(z, "data-col-id");
        !(te && G.find((ke) => ke.id == te))?.editor && X && f.exec("show-editor", { id: X });
      }
    },
    [f, e]
    // cols is defined later; relies on latest value at call time
  ), F = P(() => {
    _.current = !1;
  }, []), ne = P(
    (z) => {
      _.current = !0, I.current = z.touches[0].clientY + (g ?? 0);
    },
    [g]
  ), ge = P(
    (z) => {
      if (_.current) {
        const X = (I.current ?? 0) - z.touches[0].clientY;
        return f.exec("scroll-chart", { top: X }), z.preventDefault(), !1;
      }
    },
    [f]
  ), he = T(
    () => Array.isArray(w) ? w.map((z) => z.id) : [],
    [w]
  );
  B(() => {
    const z = () => F();
    return window.addEventListener("touchend", z), () => window.removeEventListener("touchend", z);
  }, [F]);
  const xe = P(() => {
    if (M.current && ue !== null) {
      const z = M.current.querySelector(".wx-body");
      z && (z.style.top = -((g ?? 0) - (Q ?? 0)) + "px");
    }
    R.current && (R.current.scrollTop = 0);
  }, [ue, g, Q]);
  B(() => {
    M.current && xe();
  }, [g, Q, xe]), B(() => {
    const z = M.current;
    if (!z) return;
    const X = z.querySelector(".wx-table-box .wx-body");
    if (!X || typeof ResizeObserver > "u") return;
    const te = new ResizeObserver(() => {
      xe();
    });
    return te.observe(X), () => {
      te.disconnect();
    };
  }, [_e, ie, s, ee, ue, xe]), B(() => {
    if (!x || !c) return;
    const { id: z } = x, X = c.getState().focusCell;
    X && X.row !== z && M.current && M.current.contains(document.activeElement) && c.exec("focus-cell", {
      row: z,
      column: X.column
    });
  }, [x, c]);
  const Ee = P(
    ({ id: z }) => {
      if (e) return !1;
      f.getTask(z).open && f.exec("open-task", { id: z, mode: !1 });
      const X = f.getState()._tasks.find((te) => te.id === z);
      if (b(X || null), !X) return !1;
    },
    [f, e]
  ), Ce = P(
    ({ id: z, top: X }) => {
      O.current ? q({ ...O.current, onMove: !1 }) : f.exec("drag-task", {
        id: z,
        top: X + (Q ?? 0),
        inProgress: !1
      }), b(null);
    },
    [f, q, Q]
  ), He = P(
    ({ id: z, top: X, detail: te }) => {
      te && q({ ...te, onMove: !0 }), f.exec("drag-task", {
        id: z,
        top: X + (Q ?? 0),
        inProgress: !0
      });
    },
    [f, q, Q]
  );
  B(() => {
    const z = M.current;
    return z ? lu(z, {
      start: Ee,
      touchStart: F,
      end: Ce,
      move: He,
      getTask: f.getTask
    }).destroy : void 0;
  }, [f, Ee, F, Ce, He]);
  const De = P(
    (z) => {
      const { key: X, isInput: te } = z;
      if (!te && (X === "arrowup" || X === "arrowdown"))
        return z.eventSource = "grid", f.exec("hotkey", z), !1;
      if (X === "enter") {
        const de = c?.getState().focusCell;
        if (de) {
          const { row: ke, column: ye } = de;
          ye === "add-task" ? W(ke, "add-task") : ye === "text" && W(ke, "open-task");
        }
      }
    },
    [f, W, c]
  ), be = V(null), Qe = () => {
    be.current = {
      setTableAPI: u,
      handleHotkey: De,
      sortVal: D,
      api: f,
      adjustColumns: Le,
      setColumnWidth: Ae,
      tasks: L,
      durationUnitVal: E,
      onTableAPIChange: i
    };
  };
  Qe(), B(() => {
    Qe();
  }, [u, De, D, f, Le, Ae, L, E, i]);
  const Xe = P(
    (z) => {
      u(z), z.intercept("hotkey", (X) => be.current.handleHotkey(X)), z.intercept("scroll", () => !1), z.intercept("select-row", () => !1), z.intercept("sort-rows", (X) => {
        const te = be.current.sortVal, { key: de, add: ke } = X, ye = te ? te.find((Oe) => Oe.key === de) : null;
        let Ne = "asc";
        return ye && (Ne = !ye || ye.order === "asc" ? "desc" : "asc"), f.exec("sort-tasks", {
          key: de,
          order: Ne,
          add: ke
        }), !1;
      }), z.on("resize-column", () => {
        be.current.setColumnWidth(!0);
      }), z.on("hide-column", (X) => {
        X.mode || be.current.adjustColumns(), be.current.setColumnWidth();
      }), z.intercept("update-cell", (X) => {
        const { id: te, column: de, value: ke } = X, ye = be.current.tasks.find((Ne) => Ne.id === te);
        if (ye) {
          const Ne = { ...ye };
          let Oe = ke;
          Oe && !isNaN(Oe) && !(Oe instanceof Date) && (Oe *= 1), Ne[de] = Oe, Qt(Ne, be.current.durationUnitVal, !0, de), f.exec("update-task", {
            id: te,
            task: Ne
          });
        }
        return !1;
      }), i && i(z);
    },
    []
  );
  return /* @__PURE__ */ p(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${ee}` },
      ref: R,
      children: /* @__PURE__ */ p(
        "div",
        {
          ref: M,
          style: ie,
          className: "wx-rHj6070p wx-table",
          onTouchStart: ne,
          onTouchMove: ge,
          onClick: S,
          onDoubleClick: Ve,
          children: /* @__PURE__ */ p(
            rd,
            {
              init: Xe,
              sizes: {
                rowHeight: m,
                headerHeight: (ce ?? 0) - 1
              },
              rowStyle: (z) => z.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (z) => `wx-rHj6070p wx-text-${z.align}${z.id === "add-task" ? " wx-action" : ""}`,
              data: ue,
              columns: _e,
              selectedRows: [...he],
              sortMarks: se
            }
          )
        }
      )
    }
  );
}
function ld({ borders: t = "" }) {
  const e = pe(ct), n = re(e, "cellWidth"), r = re(e, "cellHeight"), s = V(null), [o, i] = K("#e4e4e4");
  B(() => {
    if (typeof getComputedStyle < "u" && s.current) {
      const l = getComputedStyle(s.current).getPropertyValue(
        "--wx-gantt-border"
      );
      i(l ? l.substring(l.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const a = {
    width: "100%",
    height: "100%",
    background: n != null && r != null ? `url(${wc(n, r, o, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ p("div", { ref: s, style: a });
}
function cd(t) {
  const { readonly: e, taskTemplate: n } = t, r = pe(ct), [s, o] = kn(r, "_tasks"), [i, a] = kn(r, "_links"), l = re(r, "area"), c = re(r, "_scales"), u = re(r, "taskTypes"), d = re(r, "baselines"), h = re(r, "_selected"), f = re(r, "_scrollTask"), g = T(() => {
    if (!l || !Array.isArray(s)) return [];
    const F = l.start ?? 0, ne = l.end ?? 0;
    return s.slice(F, ne).map((ge) => ({ ...ge }));
  }, [o, l]), m = T(
    () => c.lengthUnitWidth,
    [c]
  ), x = V(!1), [w, y] = K(void 0), [$, v] = K(null), C = V(null), [D, E] = K(void 0), I = V(null), [_, k] = K(0), b = V(null), L = T(() => {
    const F = b.current;
    return !!(h.length && F && F.contains(document.activeElement));
  }, [h, b.current]), W = T(() => L && h[h.length - 1]?.id, [L, h]);
  B(() => {
    if (f && L && f) {
      const { id: F } = f, ne = b.current?.querySelector(
        `.wx-bar[data-id='${F}']`
      );
      ne && ne.focus({ preventScroll: !0 });
    }
  }, [f]), B(() => {
    const F = b.current;
    if (F && (k(F.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const ne = new ResizeObserver((ge) => {
        ge[0] && k(ge[0].contentRect.width);
      });
      return ne.observe(F), () => ne.disconnect();
    }
  }, [b.current]);
  const S = P(() => {
    document.body.style.userSelect = "none";
  }, []), M = P(() => {
    document.body.style.userSelect = "";
  }, []), R = P(
    (F, ne, ge) => {
      if (ge || (ge = r.getTask(Bt(F))), ge.type === "milestone" || ge.type == "summary") return "";
      const he = F.getBoundingClientRect(), xe = (ne.clientX - he.left) / he.width;
      let Ee = 0.2 / (he.width > 200 ? he.width / 200 : 1);
      return xe < Ee ? "start" : xe > 1 - Ee ? "end" : "";
    },
    [r]
  ), N = P(
    (F, ne) => {
      const { clientX: ge } = ne, he = Bt(F), xe = r.getTask(he), Ee = ne.target.classList;
      if (!e) {
        if (Ee.contains("wx-progress-marker")) {
          const { progress: Ce } = r.getTask(he);
          C.current = {
            id: he,
            x: ge,
            progress: Ce,
            dx: 0,
            node: F,
            marker: ne.target
          }, ne.target.classList.add("wx-progress-in-drag");
        } else {
          const Ce = R(F, ne, xe) || "move";
          v({
            id: he,
            mode: Ce,
            x: ge,
            dx: 0,
            l: xe.$x,
            w: xe.$w
          });
        }
        S();
      }
    },
    [r, e, R, S]
  ), A = P(
    (F) => {
      if (F.button !== 0) return;
      const ne = ze(F);
      ne && N(ne, F);
    },
    [e, m, _, $, w]
  ), j = P(
    (F) => {
      const ne = ze(F);
      ne && (I.current = setTimeout(() => {
        E(!0), N(ne, F.touches[0]);
      }, 300));
    },
    [e]
  ), H = P(() => {
    if (C.current) {
      const { dx: F, id: ne, marker: ge, value: he } = C.current;
      C.current = null, typeof he < "u" && F && r.exec("update-task", { id: ne, task: { progress: he } }), ge.classList.remove("wx-progress-in-drag"), x.current = !0, M();
    } else if ($) {
      const { id: F, mode: ne, dx: ge, l: he, w: xe, start: Ee } = $;
      if (v(null), Ee) {
        const Ce = Math.round(ge / m);
        if (!Ce)
          r.exec("drag-task", {
            id: F,
            width: xe,
            left: he,
            inProgress: !1
          });
        else {
          let He = {}, De = r.getTask(F);
          ne == "move" ? (He.start = De.start, He.end = De.end) : He[ne] = De[ne], r.exec("update-task", {
            id: F,
            task: He,
            diff: Ce
          });
        }
        x.current = !0;
      }
      M();
    }
  }, [r, M, $, m]), O = P(
    (F, ne) => {
      const { clientX: ge } = ne;
      if (!e)
        if (C.current) {
          const { node: he, x: xe, id: Ee } = C.current, Ce = C.current.dx = ge - xe, He = Math.round(Ce / he.offsetWidth * 100);
          let De = C.current.progress + He;
          C.current.value = De = Math.min(
            Math.max(0, De),
            100
          ), r.exec("update-task", {
            id: Ee,
            task: { progress: De },
            inProgress: !0
          });
        } else if ($) {
          const { mode: he, l: xe, w: Ee, x: Ce, id: He, start: De } = $, be = ge - Ce;
          if (!De && Math.abs(be) < 20 || he === "start" && Ee - be < m || he === "end" && Ee + be < m || he == "move" && (be < 0 && xe + be < 0 || be > 0 && xe + Ee + be > _))
            return;
          const Qe = { ...$, dx: be };
          let Xe, z;
          he === "start" ? (Xe = xe + be, z = Ee - be) : he === "end" ? (Xe = xe, z = Ee + be) : he === "move" && (Xe = xe + be, z = Ee);
          let X = {
            id: He,
            width: z,
            left: Xe,
            inProgress: !0
          };
          r.exec("drag-task", X);
          const te = r.getTask(He);
          if (!Qe.start && (he == "move" && te.$x == xe || he != "move" && te.$w == Ee)) {
            x.current = !0, H();
            return;
          }
          Qe.start = !0, v(Qe);
        } else {
          const he = ze(F);
          if (he) {
            const xe = R(he, ne);
            he.style.cursor = xe && !e ? "col-resize" : "pointer";
          }
        }
    },
    [r, e, $, m, _, R]
  ), q = P(
    (F) => {
      O(F, F);
    },
    [O]
  ), Q = P(
    (F) => {
      D ? (F.preventDefault(), O(F, F.touches[0])) : I.current && (clearTimeout(I.current), I.current = null);
    },
    [D, O]
  ), ce = P(() => {
    H();
  }, [H]), Z = P(() => {
    E(null), I.current && (clearTimeout(I.current), I.current = null), H();
  }, [H]);
  B(() => (window.addEventListener("mouseup", ce), () => {
    window.removeEventListener("mouseup", ce);
  }), [ce]);
  const ie = P(
    (F) => {
      if (!e) {
        const ne = qt(F.target);
        ne && !F.target.classList.contains("wx-link") && r.exec("show-editor", { id: ne });
      }
    },
    [r, e]
  ), ue = ["e2s", "s2s", "e2e", "s2e"], G = P(
    (F, ne) => ue[(F ? 1 : 0) + (ne ? 0 : 2)],
    []
  ), ee = P(
    (F, ne) => {
      const ge = w.id, he = w.start;
      return F === ge ? !0 : !!i.find((xe) => xe.target == F && xe.source == ge && xe.type === G(he, ne));
    },
    [w, a, G]
  ), se = P(() => {
    w && y(null);
  }, [w]), fe = P(
    (F) => {
      if (x.current) {
        x.current = !1;
        return;
      }
      const ne = qt(F.target);
      if (ne) {
        const ge = F.target.classList;
        if (ge.contains("wx-link")) {
          const he = ge.contains("wx-left");
          if (!w) {
            y({ id: ne, start: he });
            return;
          }
          w.id !== ne && !ee(ne, he) && r.exec("add-link", {
            link: {
              source: w.id,
              target: ne,
              type: G(w.start, he)
            }
          });
        } else
          r.exec("select-task", {
            id: ne,
            toggle: F.ctrlKey || F.metaKey,
            range: F.shiftKey
          });
      }
      se();
    },
    [r, w, a]
  ), oe = P((F) => ({
    left: `${F.$x}px`,
    top: `${F.$y}px`,
    width: `${F.$w}px`,
    height: `${F.$h}px`
  }), []), _e = P((F) => ({
    left: `${F.$x_base}px`,
    top: `${F.$y_base}px`,
    width: `${F.$w_base}px`,
    height: `${F.$h_base}px`
  }), []), Ae = P(
    (F) => {
      if (D || I.current)
        return F.preventDefault(), !1;
    },
    [D]
  ), Le = P(
    (F) => {
      let ne = u.some((ge) => F === ge.id) ? F : "task";
      return ne !== "task" && ne !== "milestone" && ne !== "summary" && (ne = `task ${ne}`), ne;
    },
    [u]
  ), Ve = P(
    (F) => {
      r.exec(F.action, F.data);
    },
    [r]
  );
  return /* @__PURE__ */ p(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${g.length ? g[0].$h : 0}px` },
      ref: b,
      onContextMenu: Ae,
      onMouseDown: A,
      onMouseMove: q,
      onTouchStart: j,
      onTouchMove: Q,
      onTouchEnd: Z,
      onClick: fe,
      onDoubleClick: ie,
      onDragStart: (F) => (F.preventDefault(), !1),
      children: g.map((F) => {
        if (F.$skip && F.$skip_baseline) return null;
        const ne = `wx-bar wx-${Le(F.type)}` + (D && $ && F.id === $.id ? " wx-touch" : "") + (w && w.id === F.id ? " wx-selected" : "") + (F.$reorder ? " wx-reorder-task" : ""), ge = "wx-link wx-left" + (w ? " wx-visible" : "") + (!w || !ee(F.id, !0) ? " wx-target" : "") + (w && w.id === F.id && w.start ? " wx-selected" : ""), he = "wx-link wx-right" + (w ? " wx-visible" : "") + (!w || !ee(F.id, !1) ? " wx-target" : "") + (w && w.id === F.id && !w.start ? " wx-selected" : "");
        return /* @__PURE__ */ U(Os, { children: [
          !F.$skip && /* @__PURE__ */ U(
            "div",
            {
              className: "wx-GKbcLEGA " + ne,
              style: oe(F),
              "data-tooltip-id": F.id,
              "data-id": F.id,
              tabIndex: W === F.id ? 0 : -1,
              children: [
                e ? null : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + ge, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                F.type !== "milestone" ? /* @__PURE__ */ U(we, { children: [
                  F.progress ? /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ p(
                    "div",
                    {
                      className: "wx-GKbcLEGA wx-progress-percent",
                      style: { width: `${F.progress}%` }
                    }
                  ) }) : null,
                  e ? null : /* @__PURE__ */ p(
                    "div",
                    {
                      className: "wx-GKbcLEGA wx-progress-marker",
                      style: { left: `calc(${F.progress}% - 10px)` },
                      children: F.progress
                    }
                  ),
                  n ? /* @__PURE__ */ p(n, { data: F, api: r, onAction: Ve }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: F.text || "" })
                ] }) : /* @__PURE__ */ U(we, { children: [
                  /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content" }),
                  n ? /* @__PURE__ */ p(n, { data: F, api: r, onAction: Ve }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-text-out", children: F.text })
                ] }),
                e ? null : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + he, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) })
              ]
            }
          ),
          d && !F.$skip_baseline ? /* @__PURE__ */ p(
            "div",
            {
              className: "wx-GKbcLEGA wx-baseline" + (F.type === "milestone" ? " wx-milestone" : ""),
              style: _e(F)
            }
          ) : null
        ] }, F.id);
      })
    }
  );
}
function ud() {
  const t = pe(ct), e = re(t, "_links");
  return /* @__PURE__ */ p("svg", { className: "wx-dkx3NwEn wx-links", children: (e || []).map((n) => /* @__PURE__ */ p(
    "polyline",
    {
      className: "wx-dkx3NwEn wx-line",
      points: n.$p
    },
    n.id
  )) });
}
function Nr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var xn = { exports: {} }, dd = xn.exports, Cs;
function Po() {
  return Cs || (Cs = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(dd, (function() {
      var n = 1e3, r = 6e4, s = 36e5, o = "millisecond", i = "second", a = "minute", l = "hour", c = "day", u = "week", d = "month", h = "quarter", f = "year", g = "date", m = "Invalid Date", x = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, w = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, y = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(S) {
        var M = ["th", "st", "nd", "rd"], R = S % 100;
        return "[" + S + (M[(R - 20) % 10] || M[R] || M[0]) + "]";
      } }, $ = function(S, M, R) {
        var N = String(S);
        return !N || N.length >= M ? S : "" + Array(M + 1 - N.length).join(R) + S;
      }, v = { s: $, z: function(S) {
        var M = -S.utcOffset(), R = Math.abs(M), N = Math.floor(R / 60), A = R % 60;
        return (M <= 0 ? "+" : "-") + $(N, 2, "0") + ":" + $(A, 2, "0");
      }, m: function S(M, R) {
        if (M.date() < R.date()) return -S(R, M);
        var N = 12 * (R.year() - M.year()) + (R.month() - M.month()), A = M.clone().add(N, d), j = R - A < 0, H = M.clone().add(N + (j ? -1 : 1), d);
        return +(-(N + (R - A) / (j ? A - H : H - A)) || 0);
      }, a: function(S) {
        return S < 0 ? Math.ceil(S) || 0 : Math.floor(S);
      }, p: function(S) {
        return { M: d, y: f, w: u, d: c, D: g, h: l, m: a, s: i, ms: o, Q: h }[S] || String(S || "").toLowerCase().replace(/s$/, "");
      }, u: function(S) {
        return S === void 0;
      } }, C = "en", D = {};
      D[C] = y;
      var E = "$isDayjsObject", I = function(S) {
        return S instanceof L || !(!S || !S[E]);
      }, _ = function S(M, R, N) {
        var A;
        if (!M) return C;
        if (typeof M == "string") {
          var j = M.toLowerCase();
          D[j] && (A = j), R && (D[j] = R, A = j);
          var H = M.split("-");
          if (!A && H.length > 1) return S(H[0]);
        } else {
          var O = M.name;
          D[O] = M, A = O;
        }
        return !N && A && (C = A), A || !N && C;
      }, k = function(S, M) {
        if (I(S)) return S.clone();
        var R = typeof M == "object" ? M : {};
        return R.date = S, R.args = arguments, new L(R);
      }, b = v;
      b.l = _, b.i = I, b.w = function(S, M) {
        return k(S, { locale: M.$L, utc: M.$u, x: M.$x, $offset: M.$offset });
      };
      var L = (function() {
        function S(R) {
          this.$L = _(R.locale, null, !0), this.parse(R), this.$x = this.$x || R.x || {}, this[E] = !0;
        }
        var M = S.prototype;
        return M.parse = function(R) {
          this.$d = (function(N) {
            var A = N.date, j = N.utc;
            if (A === null) return /* @__PURE__ */ new Date(NaN);
            if (b.u(A)) return /* @__PURE__ */ new Date();
            if (A instanceof Date) return new Date(A);
            if (typeof A == "string" && !/Z$/i.test(A)) {
              var H = A.match(x);
              if (H) {
                var O = H[2] - 1 || 0, q = (H[7] || "0").substring(0, 3);
                return j ? new Date(Date.UTC(H[1], O, H[3] || 1, H[4] || 0, H[5] || 0, H[6] || 0, q)) : new Date(H[1], O, H[3] || 1, H[4] || 0, H[5] || 0, H[6] || 0, q);
              }
            }
            return new Date(A);
          })(R), this.init();
        }, M.init = function() {
          var R = this.$d;
          this.$y = R.getFullYear(), this.$M = R.getMonth(), this.$D = R.getDate(), this.$W = R.getDay(), this.$H = R.getHours(), this.$m = R.getMinutes(), this.$s = R.getSeconds(), this.$ms = R.getMilliseconds();
        }, M.$utils = function() {
          return b;
        }, M.isValid = function() {
          return this.$d.toString() !== m;
        }, M.isSame = function(R, N) {
          var A = k(R);
          return this.startOf(N) <= A && A <= this.endOf(N);
        }, M.isAfter = function(R, N) {
          return k(R) < this.startOf(N);
        }, M.isBefore = function(R, N) {
          return this.endOf(N) < k(R);
        }, M.$g = function(R, N, A) {
          return b.u(R) ? this[N] : this.set(A, R);
        }, M.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, M.valueOf = function() {
          return this.$d.getTime();
        }, M.startOf = function(R, N) {
          var A = this, j = !!b.u(N) || N, H = b.p(R), O = function(ee, se) {
            var fe = b.w(A.$u ? Date.UTC(A.$y, se, ee) : new Date(A.$y, se, ee), A);
            return j ? fe : fe.endOf(c);
          }, q = function(ee, se) {
            return b.w(A.toDate()[ee].apply(A.toDate("s"), (j ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(se)), A);
          }, Q = this.$W, ce = this.$M, Z = this.$D, ie = "set" + (this.$u ? "UTC" : "");
          switch (H) {
            case f:
              return j ? O(1, 0) : O(31, 11);
            case d:
              return j ? O(1, ce) : O(0, ce + 1);
            case u:
              var ue = this.$locale().weekStart || 0, G = (Q < ue ? Q + 7 : Q) - ue;
              return O(j ? Z - G : Z + (6 - G), ce);
            case c:
            case g:
              return q(ie + "Hours", 0);
            case l:
              return q(ie + "Minutes", 1);
            case a:
              return q(ie + "Seconds", 2);
            case i:
              return q(ie + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, M.endOf = function(R) {
          return this.startOf(R, !1);
        }, M.$set = function(R, N) {
          var A, j = b.p(R), H = "set" + (this.$u ? "UTC" : ""), O = (A = {}, A[c] = H + "Date", A[g] = H + "Date", A[d] = H + "Month", A[f] = H + "FullYear", A[l] = H + "Hours", A[a] = H + "Minutes", A[i] = H + "Seconds", A[o] = H + "Milliseconds", A)[j], q = j === c ? this.$D + (N - this.$W) : N;
          if (j === d || j === f) {
            var Q = this.clone().set(g, 1);
            Q.$d[O](q), Q.init(), this.$d = Q.set(g, Math.min(this.$D, Q.daysInMonth())).$d;
          } else O && this.$d[O](q);
          return this.init(), this;
        }, M.set = function(R, N) {
          return this.clone().$set(R, N);
        }, M.get = function(R) {
          return this[b.p(R)]();
        }, M.add = function(R, N) {
          var A, j = this;
          R = Number(R);
          var H = b.p(N), O = function(ce) {
            var Z = k(j);
            return b.w(Z.date(Z.date() + Math.round(ce * R)), j);
          };
          if (H === d) return this.set(d, this.$M + R);
          if (H === f) return this.set(f, this.$y + R);
          if (H === c) return O(1);
          if (H === u) return O(7);
          var q = (A = {}, A[a] = r, A[l] = s, A[i] = n, A)[H] || 1, Q = this.$d.getTime() + R * q;
          return b.w(Q, this);
        }, M.subtract = function(R, N) {
          return this.add(-1 * R, N);
        }, M.format = function(R) {
          var N = this, A = this.$locale();
          if (!this.isValid()) return A.invalidDate || m;
          var j = R || "YYYY-MM-DDTHH:mm:ssZ", H = b.z(this), O = this.$H, q = this.$m, Q = this.$M, ce = A.weekdays, Z = A.months, ie = A.meridiem, ue = function(se, fe, oe, _e) {
            return se && (se[fe] || se(N, j)) || oe[fe].slice(0, _e);
          }, G = function(se) {
            return b.s(O % 12 || 12, se, "0");
          }, ee = ie || function(se, fe, oe) {
            var _e = se < 12 ? "AM" : "PM";
            return oe ? _e.toLowerCase() : _e;
          };
          return j.replace(w, (function(se, fe) {
            return fe || (function(oe) {
              switch (oe) {
                case "YY":
                  return String(N.$y).slice(-2);
                case "YYYY":
                  return b.s(N.$y, 4, "0");
                case "M":
                  return Q + 1;
                case "MM":
                  return b.s(Q + 1, 2, "0");
                case "MMM":
                  return ue(A.monthsShort, Q, Z, 3);
                case "MMMM":
                  return ue(Z, Q);
                case "D":
                  return N.$D;
                case "DD":
                  return b.s(N.$D, 2, "0");
                case "d":
                  return String(N.$W);
                case "dd":
                  return ue(A.weekdaysMin, N.$W, ce, 2);
                case "ddd":
                  return ue(A.weekdaysShort, N.$W, ce, 3);
                case "dddd":
                  return ce[N.$W];
                case "H":
                  return String(O);
                case "HH":
                  return b.s(O, 2, "0");
                case "h":
                  return G(1);
                case "hh":
                  return G(2);
                case "a":
                  return ee(O, q, !0);
                case "A":
                  return ee(O, q, !1);
                case "m":
                  return String(q);
                case "mm":
                  return b.s(q, 2, "0");
                case "s":
                  return String(N.$s);
                case "ss":
                  return b.s(N.$s, 2, "0");
                case "SSS":
                  return b.s(N.$ms, 3, "0");
                case "Z":
                  return H;
              }
              return null;
            })(se) || H.replace(":", "");
          }));
        }, M.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, M.diff = function(R, N, A) {
          var j, H = this, O = b.p(N), q = k(R), Q = (q.utcOffset() - this.utcOffset()) * r, ce = this - q, Z = function() {
            return b.m(H, q);
          };
          switch (O) {
            case f:
              j = Z() / 12;
              break;
            case d:
              j = Z();
              break;
            case h:
              j = Z() / 3;
              break;
            case u:
              j = (ce - Q) / 6048e5;
              break;
            case c:
              j = (ce - Q) / 864e5;
              break;
            case l:
              j = ce / s;
              break;
            case a:
              j = ce / r;
              break;
            case i:
              j = ce / n;
              break;
            default:
              j = ce;
          }
          return A ? j : b.a(j);
        }, M.daysInMonth = function() {
          return this.endOf(d).$D;
        }, M.$locale = function() {
          return D[this.$L];
        }, M.locale = function(R, N) {
          if (!R) return this.$L;
          var A = this.clone(), j = _(R, N, !0);
          return j && (A.$L = j), A;
        }, M.clone = function() {
          return b.w(this.$d, this);
        }, M.toDate = function() {
          return new Date(this.valueOf());
        }, M.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, M.toISOString = function() {
          return this.$d.toISOString();
        }, M.toString = function() {
          return this.$d.toUTCString();
        }, S;
      })(), W = L.prototype;
      return k.prototype = W, [["$ms", o], ["$s", i], ["$m", a], ["$H", l], ["$W", c], ["$M", d], ["$y", f], ["$D", g]].forEach((function(S) {
        W[S[1]] = function(M) {
          return this.$g(M, S[0], S[1]);
        };
      })), k.extend = function(S, M) {
        return S.$i || (S(M, L, k), S.$i = !0), k;
      }, k.locale = _, k.isDayjs = I, k.unix = function(S) {
        return k(1e3 * S);
      }, k.en = D[C], k.Ls = D, k.p = {}, k;
    }));
  })(xn)), xn.exports;
}
var hd = Po();
const Ke = /* @__PURE__ */ Nr(hd);
var yn = { exports: {} }, fd = yn.exports, Ms;
function md() {
  return Ms || (Ms = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r(Po());
    })(fd, (function(n) {
      function r(i) {
        return i && typeof i == "object" && "default" in i ? i : { default: i };
      }
      var s = r(n), o = { name: "fa", weekdays: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysShort: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"), weekStart: 6, months: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), monthsShort: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), ordinal: function(i) {
        return i;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "در %s", past: "%s پیش", s: "چند ثانیه", m: "یک دقیقه", mm: "%d دقیقه", h: "یک ساعت", hh: "%d ساعت", d: "یک روز", dd: "%d روز", M: "یک ماه", MM: "%d ماه", y: "یک سال", yy: "%d سال" } };
      return s.default.locale(o, null, !0), o;
    }));
  })(yn)), yn.exports;
}
var pd = md();
const gd = /* @__PURE__ */ Nr(pd);
function wd(t, e, n) {
  let r = Re((t + Re(e - 8, 6) + 100100) * 1461, 4) + Re(153 * wt(e + 9, 12) + 2, 5) + n - 34840408;
  return r = r - Re(Re(t + 100100 + Re(e - 8, 6), 100) * 3, 4) + 752, r;
}
const mn = [
  -61,
  9,
  38,
  199,
  426,
  686,
  756,
  818,
  1111,
  1181,
  1210,
  1635,
  2060,
  2097,
  2192,
  2262,
  2324,
  2394,
  2456,
  3178
], it = Math.floor;
function wt(t, e) {
  return t - ~~(t / e) * e;
}
function Re(t, e) {
  return ~~(t / e);
}
function xd(t, e) {
  const n = mn.length, r = t + 621;
  let s = -14, o = mn[0], i, a, l;
  if (t < o || t >= mn[n - 1]) throw new Error(`Invalid Jalaali year ${t}`);
  for (let d = 1; d < n && (i = mn[d], a = i - o, !(t < i)); d += 1)
    s = s + Re(a, 33) * 8 + Re(wt(a, 33), 4), o = i;
  l = t - o, s = s + Re(l, 33) * 8 + Re(wt(l, 33) + 3, 4), wt(a, 33) === 4 && a - l === 4 && (s += 1);
  const c = Re(r, 4) - Re((Re(r, 100) + 1) * 3, 4) - 150, u = 20 + s - c;
  return {
    gy: r,
    march: u
  };
}
function yd(t, e, n) {
  const r = xd(t);
  return wd(r.gy, 3, r.march) + (e - 1) * 31 - Re(e, 7) * (e - 7) + n - 1;
}
function vd(t) {
  let e = 4 * t + 139361631;
  e = e + Re(Re(4 * t + 183187720, 146097) * 3, 4) * 4 - 3908;
  const n = Re(wt(e, 1461), 4) * 5 + 308, r = Re(wt(n, 153), 5) + 1, s = wt(Re(n, 153), 12) + 1;
  return [
    Re(e, 1461) - 100100 + Re(8 - s, 6),
    s,
    r
  ];
}
function bd(t, e, n) {
  return vd(yd(t, e, n));
}
function kd(t, e, n) {
  const r = {
    year: t,
    month: e,
    day: n
  }, s = [
    0,
    31,
    59,
    90,
    120,
    151,
    181,
    212,
    243,
    273,
    304,
    334
  ];
  let o;
  t <= 1600 ? (t -= 621, r.year = 0) : (t -= 1600, r.year = 979);
  const i = t > 2 ? t + 1 : t;
  return o = it((i + 3) / 4) + 365 * t - it((i + 99) / 100) - 80 + s[e - 1] + it((i + 399) / 400) + n, r.year += 33 * it(o / 12053), o %= 12053, r.year += 4 * it(o / 1461), o %= 1461, o > 365 && (r.year += it((o - 1) / 365), o = (o - 1) % 365), r.month = o < 186 ? 1 + it(o / 31) : 7 + it((o - 186) / 30), r.day = 1 + (o < 186 ? o % 31 : (o - 186) % 30), [
    r.year,
    r.month,
    r.day
  ];
}
var pn = {
  J: (t, e, n) => kd(t, e, n),
  G: (t, e, n) => bd(t, e, n)
};
const $d = /^(\d{4})[-/]?(\d{1,2})[-/]?(\d{0,2})(.*)$/, Sd = /\[.*?\]|jY{2,4}|jM{1,4}|jD{1,2}|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Bn = "date", Ct = "day", dt = "month", ht = "year", Ds = "week", _d = "YYYY-MM-DDTHH:mm:ssZ", Cd = { jmonths: "فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند".split("_") }, Md = (t, e, n) => {
  const r = e.prototype, s = r.$utils(), o = (_) => _.$C === "jalali", i = s.prettyUnit || s.p, a = s.isUndefined || s.u, l = s.padStart || s.s, c = s.monthDiff || s.m, u = s.absFloor || s.a, d = (_) => function(...k) {
    const b = _.bind(this)(...k);
    return b.$C = this.$C, b.isJalali() && b.InitJalali(), b;
  };
  r.startOf = d(r.startOf), r.endOf = d(r.endOf), r.add = d(r.add), r.subtract = d(r.subtract), r.set = d(r.set);
  const h = r.parse, f = r.init, g = r.startOf, m = r.$set, x = r.add, w = r.format, y = r.diff, $ = r.year, v = r.month, C = r.date, D = r.daysInMonth, E = r.toArray;
  n.$C = "gregory", n.$fdow = 6, n.calendar = function(_) {
    return n.$C = _, n;
  }, r.calendar = function(_) {
    const k = this.clone();
    return k.$C = _, k.isJalali() && k.InitJalali(), k;
  }, r.isJalali = function() {
    return o(this);
  }, n.en.jmonths = "Farvardin_Ordibehesht_Khordaad_Tir_Mordaad_Shahrivar_Mehr_Aabaan_Aazar_Dey_Bahman_Esfand".split("_"), n.locale("fa", {
    ...gd,
    ...Cd
  }, !0);
  const I = function(_, k) {
    return n(_, {
      locale: k.$L,
      utc: k.$u,
      calendar: k.$C
    });
  };
  r.init = function(_ = {}) {
    f.bind(this)(_), this.isJalali() && this.InitJalali();
  }, r.parse = function(_) {
    if (this.$C = _.calendar || this.$C || n.$C, _.jalali && typeof _.date == "string" && /.*[^Z]$/i.test(_.date)) {
      const k = _.date.match($d);
      if (k) {
        const [b, L, W] = pn.G(Number.parseInt(k[1], 10), Number.parseInt(k[2], 10), Number.parseInt(k[3] || 1, 10));
        _.date = `${b}-${L}-${W}${k[4] || ""}`;
      }
    }
    return h.bind(this)(_);
  }, r.InitJalali = function() {
    const [_, k, b] = pn.J(this.$y, this.$M + 1, this.$D);
    this.$jy = _, this.$jM = k - 1, this.$jD = b;
  }, r.startOf = function(_, k) {
    if (!o(this)) return g.bind(this)(_, k);
    const b = a(k) ? !0 : k, L = i(_), W = (M, R, N = this.$jy) => {
      const [A, j, H] = pn.G(N, R + 1, M), O = I(new Date(A, j - 1, H), this);
      return (b ? O : O.endOf(Ct)).$set("hour", 1);
    }, S = (this.$W + (7 - n.$fdow)) % 7;
    switch (L) {
      case ht:
        return b ? W(1, 0) : W(0, 0, this.$jy + 1);
      case dt:
        return b ? W(1, this.$jM) : W(0, (this.$jM + 1) % 12, this.$jy + Math.floor((this.$jM + 1) / 12));
      case Ds:
        return b ? W(this.$jD - S, this.$jM) : W(this.$jD + (6 - S), this.$jM);
      default:
        return g.bind(this)(_, k);
    }
  }, r.$set = function(_, k) {
    if (!o(this)) return m.bind(this)(_, k);
    const b = i(_), L = (W, S, M = this.$jy) => {
      const [R, N, A] = pn.G(M, S + 1, W);
      return this.$d.setFullYear(R), this.$d.setMonth(N - 1), this.$d.setDate(A), this;
    };
    switch (b) {
      case Bn:
      case Ct:
        L(k, this.$jM);
        break;
      case dt:
        L(this.$jD, k);
        break;
      case ht:
        L(this.$jD, this.$jM, k);
        break;
      default:
        return m.bind(this)(_, k);
    }
    return this.init(), this;
  }, r.add = function(_, k) {
    if (!o(this)) return x.bind(this)(_, k);
    _ = Number(_);
    const b = k && (k.length === 1 || k === "ms") ? k : i(k), L = (W, S) => {
      const M = this.set(Bn, 1).set(W, S + _);
      return M.set(Bn, Math.min(this.$jD, M.daysInMonth()));
    };
    if (["M", dt].includes(b)) {
      const W = this.$jM + _, S = W < 0 ? -Math.ceil(-W / 12) : Math.floor(W / 12), M = this.$jD, R = this.set(Ct, 1).add(S, ht).set(dt, W - S * 12);
      return R.set(Ct, Math.min(R.daysInMonth(), M));
    }
    if (["y", ht].includes(b)) return L(ht, this.$jy);
    if (["d", Ct].includes(b)) {
      const W = new Date(this.$d);
      return W.setDate(W.getDate() + _), I(W, this);
    }
    if (["w", Ds].includes(b)) {
      const W = new Date(this.$d);
      return W.setDate(W.getDate() + _ * 7), I(W, this);
    }
    return x.bind(this)(_, k);
  }, r.format = function(_, k) {
    if (!o(this)) return w.bind(this)(_, k);
    const b = _ || _d, L = k || this.$locale(), { jmonths: W } = L;
    return b.replace(Sd, (S) => {
      if (S.includes("[")) return S.replace(/\[|\]/g, "");
      switch (S) {
        case "YY":
          return String(this.$jy).slice(-2);
        case "YYYY":
          return String(this.$jy);
        case "M":
          return String(this.$jM + 1);
        case "MM":
          return l(this.$jM + 1, 2, "0");
        case "MMM":
          return W[this.$jM].slice(0, 3);
        case "MMMM":
          return W[this.$jM];
        case "D":
          return String(this.$jD);
        case "DD":
          return l(this.$jD, 2, "0");
        default:
          return w.bind(this)(S, k);
      }
    });
  }, r.diff = function(_, k, b) {
    if (!o(this)) return y.bind(this)(_, k, b);
    const L = i(k), W = n(_);
    let S = c(this, W);
    switch (L) {
      case ht:
        S /= 12;
        break;
      case dt:
        break;
      default:
        return y.bind(this)(_, k, b);
    }
    return b ? S : u(S);
  }, r.$g = function(_, k, b) {
    return a(_) ? this[k] : this.set(b, _);
  }, r.year = function(_) {
    return o(this) ? this.$g(_, "$jy", ht) : $.bind(this)(_);
  }, r.month = function(_) {
    return o(this) ? this.$g(_, "$jM", dt) : v.bind(this)(_);
  }, r.date = function(_) {
    return o(this) ? this.$g(_, "$jD", Ct) : C.bind(this)(_);
  }, r.daysInMonth = function() {
    return o(this) ? this.endOf(dt).$jD : D.bind(this)();
  }, E && (r.toArray = function() {
    return o(this) ? [
      this.$jy,
      this.$jM,
      this.$jD,
      this.$H,
      this.$m,
      this.$s,
      this.$ms
    ] : E.bind(this)();
  }), r.clone = function() {
    return I(this.toDate(), this);
  };
};
var Dd = Md, vn = { exports: {} }, Nd = vn.exports, Ns;
function Td() {
  return Ns || (Ns = 1, (function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(Nd, (function() {
      var n = "week", r = "year";
      return function(s, o, i) {
        var a = o.prototype;
        a.week = function(l) {
          if (l === void 0 && (l = null), l !== null) return this.add(7 * (l - this.week()), "day");
          var c = this.$locale().yearStart || 1;
          if (this.month() === 11 && this.date() > 25) {
            var u = i(this).startOf(r).add(1, r).date(c), d = i(this).endOf(n);
            if (u.isBefore(d)) return 1;
          }
          var h = i(this).startOf(r).date(c).startOf(n).subtract(1, "millisecond"), f = this.diff(h, n, !0);
          return f < 0 ? i(this).startOf("week").week() : Math.ceil(f);
        }, a.weeks = function(l) {
          return l === void 0 && (l = null), this.week(l);
        };
      };
    }));
  })(vn)), vn.exports;
}
var Ed = Td();
const Rd = /* @__PURE__ */ Nr(Ed);
Ke.extend(Dd);
Ke.extend(Rd);
const Dn = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند"
], Yo = ["بهار", "تابستان", "پاییز", "زمستان"];
function gn(t, e, n, r) {
  const s = [];
  let o = null, i = 0, a = null;
  for (const l of t) {
    const c = Ke(l.date).calendar("jalali"), u = e(c);
    o === null ? (o = u, a = l.date, i = l.width) : u === o ? i += l.width : (s.push({
      width: i,
      value: n(a),
      date: a,
      css: "",
      unit: r
    }), o = u, a = l.date, i = l.width);
  }
  return o !== null && s.push({
    width: i,
    value: n(a),
    date: a,
    css: "",
    unit: r
  }), s;
}
function Ad(t, e) {
  const n = Ke(t).calendar("jalali");
  switch (e) {
    case "year":
      return n.format("YYYY");
    case "quarter":
      return `${Yo[Math.floor(n.month() / 3)]} ${n.format("YYYY")}`;
    case "month":
      return `${Dn[n.month()]} ${n.format("YYYY")}`;
    case "sprint": {
      const r = Ke(t).calendar("jalali"), s = Dn[r.month()], i = r.date() <= 15, a = i ? 1 : 16, l = i ? 15 : r.endOf("month").date();
      return `${s} ${l} - ${a}`;
    }
    case "week":
      return `هفته ${n.week()}`;
    case "day":
      return n.format("D");
    case "hour":
      return n.format("HH:mm");
    default:
      return n.format("YYYY/MM/DD");
  }
}
function Od({ highlightTime: t }) {
  const e = pe(ct), n = re(e, "_scales"), r = T(() => {
    if (console.log("useMemo executed", n), !n) return [];
    const o = [...n.rows], i = {};
    o.forEach((l, c) => {
      const u = l.cells?.[0]?.unit;
      u && (i[u] = c);
    });
    let a = [];
    if (i.day !== void 0)
      a = o[i.day].cells;
    else {
      const l = Ke(n.start), c = Ke(n.end), u = n.lengthUnitWidth || 100, d = [];
      let h = l;
      for (; h.isBefore(c) || h.isSame(c, "day"); )
        d.push({
          width: u,
          value: h.date(),
          date: h.toDate(),
          css: "",
          unit: "day"
        }), h = h.add(1, "day");
      a = d;
    }
    return i.year !== void 0 && (o[i.year] = {
      ...o[i.year],
      cells: gn(
        a,
        (l) => l.year(),
        (l) => Ke(l).calendar("jalali").format("YYYY"),
        "year"
      )
    }), i.quarter !== void 0 && (o[i.quarter] = {
      ...o[i.quarter],
      cells: gn(
        a,
        (l) => `${l.year()}-${Math.floor(l.month() / 3)}`,
        (l) => {
          const c = Ke(l).calendar("jalali");
          return `${Yo[Math.floor(c.month() / 3)]} ${c.format("YYYY")}`;
        },
        "quarter"
      )
    }), i.month !== void 0 && (o[i.month] = {
      ...o[i.month],
      cells: gn(
        a,
        (l) => `${l.year()}-${l.month()}`,
        (l) => {
          const c = Ke(l).calendar("jalali");
          return `${Dn[c.month()]} ${c.format("YYYY")}`;
        },
        "month"
      )
    }), i.sprint !== void 0 && (o[i.sprint] = {
      ...o[i.sprint],
      cells: gn(
        a,
        (l) => {
          const c = l.date() <= 15 ? 1 : 2;
          return `${l.year()}-${l.month()}-${c}`;
        },
        (l) => {
          const c = Ke(l).calendar("jalali"), u = Dn[c.month()], d = c.date(), h = c.endOf("month").date();
          return d <= 15 ? `${u} 15 - 1` : `${u} ${h} - 16`;
        },
        "sprint"
      )
    }), o;
  }, [n]), s = {
    width: `${n?.width || 0}px`
  };
  return /* @__PURE__ */ p("div", { className: "wx-ZkvhDKir wx-scale", style: s, children: r.map((o, i) => /* @__PURE__ */ p(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: o.cells.map((a, l) => {
        const c = t ? t(a.date, a.unit) : "", u = ["wx-cell", a.css, c].filter(Boolean).join(" "), d = a.date instanceof Date ? Ad(a.date, a.unit) : a.value;
        return /* @__PURE__ */ p(
          "div",
          {
            className: "wx-ZkvhDKir " + u,
            style: { width: `${a.width}px` },
            children: a.unit === "week" ? a.value : d
          },
          l
        );
      })
    },
    i
  )) });
}
function Ld(t) {
  const {
    readonly: e,
    fullWidth: n,
    fullHeight: r,
    taskTemplate: s,
    cellBorders: o,
    highlightTime: i
  } = t, a = pe(ct), [l, c] = kn(a, "_selected"), u = re(a, "scrollLeft"), d = re(a, "scrollTop"), h = re(a, "cellHeight"), f = re(a, "cellWidth"), g = re(a, "_scales"), m = re(a, "_markers"), x = re(a, "_scrollTask"), w = re(a, "zoom"), [y, $] = K(), v = V(null), C = 1 + (g?.rows?.length || 0), D = T(() => {
    const N = [];
    return l && l.length && h && l.forEach((A) => {
      N.push({ height: `${h}px`, top: `${A.$y - 3}px` });
    }), N;
  }, [c, h]), E = T(
    () => Math.max(y || 0, r),
    [y, r]
  );
  B(() => {
    const N = v.current;
    N && typeof d == "number" && (N.scrollTop = d);
  }, [d]);
  const I = () => {
    _();
  };
  function _(N) {
    const A = v.current;
    if (!A) return;
    const j = {};
    j.left = A.scrollLeft, a.exec("scroll-chart", j);
  }
  function k() {
    const N = v.current, j = Math.ceil((y || 0) / (h || 1)) + 1, H = Math.floor((N && N.scrollTop || 0) / (h || 1)), O = Math.max(0, H - C), q = H + j + C, Q = O * (h || 0);
    a.exec("render-data", {
      start: O,
      end: q,
      from: Q
    });
  }
  B(() => {
    k();
  }, [y, d, u]);
  const b = P(
    (N) => {
      if (!N) return;
      const { id: A, mode: j } = N;
      if (j.toString().indexOf("x") < 0) return;
      const H = v.current;
      if (!H) return;
      const { clientWidth: O } = H, q = a.getTask(A);
      if (q.$x + q.$w < H.scrollLeft)
        a.exec("scroll-chart", { left: q.$x - (f || 0) }), H.scrollLeft = q.$x - (f || 0);
      else if (q.$x >= O + H.scrollLeft) {
        const Q = O < q.$w ? f || 0 : q.$w;
        a.exec("scroll-chart", { left: q.$x - O + Q }), H.scrollLeft = q.$x - O + Q;
      }
    },
    [a, f, u]
  );
  B(() => {
    b(x);
  }, [x]);
  function L(N) {
    if (w && (N.ctrlKey || N.metaKey)) {
      N.preventDefault();
      const A = v.current, j = -Math.sign(N.deltaY), H = N.clientX - (A ? A.getBoundingClientRect().left : 0);
      a.exec("zoom-scale", {
        dir: j,
        offset: H
      });
    }
  }
  function W(N) {
    const A = i(N.date, N.unit);
    return A ? {
      css: A,
      width: N.width
    } : null;
  }
  const S = T(() => g && (g.minUnit === "hour" || g.minUnit === "day") && i ? g.rows[g.rows.length - 1].cells.map(W) : null, [g, i]), M = P((N) => {
    N.eventSource = "chart", a.exec("hotkey", N);
  }, [a]);
  B(() => {
    const N = v.current;
    if (!N) return;
    const A = () => $(N.clientHeight);
    A();
    const j = new ResizeObserver(() => A());
    return j.observe(N), () => {
      j.disconnect();
    };
  }, [v.current]);
  const R = V(null);
  return B(() => {
    const N = v.current;
    if (N && !R.current)
      return R.current = Mr(N, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (A) => M(A)
      }), () => {
        R.current?.destroy(), R.current = null;
      };
  }, []), B(() => {
    const N = v.current;
    if (!N) return;
    const A = L;
    return N.addEventListener("wheel", A), () => {
      N.removeEventListener("wheel", A);
    };
  }, [L]), /* @__PURE__ */ U(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: v,
      onScroll: I,
      children: [
        /* @__PURE__ */ p(Od, { highlightTime: i, scales: g }),
        m && m.length ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${E}px` },
            children: m.map((N, A) => /* @__PURE__ */ p(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${N.css || "wx-default"}`,
                style: { left: `${N.left}px` },
                children: /* @__PURE__ */ p("div", { className: "wx-mR7v2Xag wx-content", children: N.text })
              },
              A
            ))
          }
        ) : null,
        /* @__PURE__ */ U(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${n}px`, height: `${E}px` },
            children: [
              S ? /* @__PURE__ */ p(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: S.map(
                    (N, A) => N ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + N.css,
                        style: {
                          width: `${N.width}px`,
                          left: `${A * N.width}px`
                        }
                      },
                      A
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ p(ld, { borders: o }),
              l && l.length ? l.map(
                (N, A) => N.$y ? /* @__PURE__ */ p(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": N.id,
                    style: D[A]
                  },
                  N.id
                ) : null
              ) : null,
              /* @__PURE__ */ p(ud, {}),
              /* @__PURE__ */ p(cd, { readonly: e, taskTemplate: s })
            ]
          }
        )
      ]
    }
  );
}
function Id(t) {
  const {
    position: e = "after",
    size: n = 4,
    dir: r = "x",
    minValue: s = 0,
    maxValue: o = 0,
    onMove: i,
    onDisplayChange: a,
    compactMode: l
  } = t, [c, u] = Me(t.value ?? 0), [d, h] = Me(t.display ?? "all");
  function f(b) {
    let L = 0;
    e == "center" ? L = n / 2 : e == "before" && (L = n);
    const W = {
      size: [n + "px", "auto"],
      p: [b - L + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let S in W) W[S] = W[S].reverse();
    return W;
  }
  const [g, m] = K(!1), x = V(0), w = V();
  function y(b) {
    return r == "x" ? b.clientX : b.clientY;
  }
  const $ = P((b) => {
    const L = w.current + y(b) - x.current;
    (!s || s <= L) && (!o || o >= L) && (u(L), i(L));
  }, []), v = P(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", m(!1), window.removeEventListener("mousemove", $), window.removeEventListener("mouseup", v);
  }, [$]), C = T(
    () => d !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [d, r]
  ), D = P(
    (b) => {
      x.current = y(b), w.current = c, m(!0), document.body.style.cursor = C, document.body.style.userSelect = "none", window.addEventListener("mousemove", $), window.addEventListener("mouseup", v);
    },
    [C, $, v, c]
  );
  function E() {
    let b;
    l ? b = d === "chart" ? "grid" : "chart" : b = d === "all" ? "chart" : "all", h(b), a(b);
  }
  function I() {
    let b;
    l ? b = d === "grid" ? "chart" : "grid" : b = d === "all" ? "grid" : "all", h(b), a(b);
  }
  const _ = T(() => f(c), [c, e, n, r]), k = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${d}`,
    g ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-pFykzMlT " + k,
      onMouseDown: D,
      style: { width: _.size[0], height: _.size[1], cursor: C },
      children: [
        /* @__PURE__ */ U("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ p(
            "div",
            {
              className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left",
              children: /* @__PURE__ */ p(
                "i",
                {
                  className: "wx-pFykzMlT wxi-menu-left",
                  onClick: E
                }
              )
            }
          ),
          /* @__PURE__ */ p(
            "div",
            {
              className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right",
              children: /* @__PURE__ */ p(
                "i",
                {
                  className: "wx-pFykzMlT wxi-menu-right",
                  onClick: I
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const Hd = 650;
function zo(t) {
  let e;
  function n() {
    e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= Hd;
          t(i);
        }
    }), e.observe(document.body);
  }
  function r() {
    e && (e.disconnect(), e = null);
  }
  return {
    observe: n,
    disconnect: r
  };
}
function Wd(t) {
  const {
    taskTemplate: e,
    readonly: n,
    cellBorders: r,
    highlightTime: s,
    onTableAPIChange: o
  } = t, i = pe(ct), a = re(i, "_tasks"), l = re(i, "_scales"), c = re(i, "cellHeight"), u = re(i, "columns"), d = re(i, "_scrollTask"), [h, f] = K(!1);
  let [g, m] = K(0);
  const [x, w] = K(void 0), [y, $] = K(void 0), [v, C] = K(void 0), [D, E] = K("all"), I = V(null), _ = P(
    (Z) => {
      f((ie) => (Z !== ie && (Z ? (I.current = D, D === "all" && E("grid")) : (!I.current || I.current === "all") && E("all")), Z));
    },
    [D]
  );
  B(() => {
    const Z = zo(_);
    return Z.observe(), () => {
      Z.disconnect();
    };
  }, [_]);
  const k = T(() => {
    let Z;
    return u.every((ie) => ie.width && !ie.flexgrow) ? Z = u.reduce((ie, ue) => ie + parseInt(ue.width), 0) : h && D === "chart" ? Z = parseInt(u.find((ie) => ie.id === "action")?.width) || 50 : Z = 440, g = Z, Z;
  }, [u, h, D]);
  B(() => {
    m(k);
  }, [k]);
  const b = T(
    () => (x ?? 0) - (v ?? 0),
    [x, v]
  ), L = T(() => l.width, [l]), W = T(
    () => a.length * c,
    [a, c]
  ), S = T(
    () => l.height + W + b,
    [l, W, b]
  ), M = T(
    () => g + L,
    [g, L]
  ), R = V(null), N = P(() => {
    Promise.resolve().then(() => {
      if ((x ?? 0) > (M ?? 0)) {
        const Z = (x ?? 0) - g;
        i.exec("expand-scale", { minWidth: Z });
      }
    });
  }, [x, M, g, i]);
  B(() => {
    let Z;
    return R.current && (Z = new ResizeObserver(N), Z.observe(R.current)), () => {
      Z && Z.disconnect();
    };
  }, [R.current, N]);
  const A = V(null), j = V(null), H = P(() => {
    const Z = A.current;
    Z && i.exec("scroll-chart", {
      top: Z.scrollTop
    });
  }, [i]), O = V({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  B(() => {
    O.current = {
      rTasks: a,
      rScales: l,
      rCellHeight: c,
      scrollSize: b,
      ganttDiv: A.current,
      ganttHeight: y ?? 0
    };
  }, [a, l, c, b, y]);
  const q = P(
    (Z) => {
      if (!Z) return;
      const {
        rTasks: ie,
        rScales: ue,
        rCellHeight: G,
        scrollSize: ee,
        ganttDiv: se,
        ganttHeight: fe
      } = O.current;
      if (!se) return;
      const { id: oe } = Z, _e = ie.findIndex((Ae) => Ae.id === oe);
      if (_e > -1) {
        const Ae = fe - ue.height, Le = _e * G, Ve = se.scrollTop;
        let F = null;
        Le < Ve ? F = Le : Le + G > Ve + Ae && (F = Le - Ae + G + ee), F !== null && (i.exec("scroll-chart", { top: Math.max(F, 0) }), A.current.scrollTop = Math.max(F, 0));
      }
    },
    [i]
  );
  B(() => {
    q(d);
  }, [d]), B(() => {
    const Z = A.current;
    if (!Z) return;
    const ie = () => {
      $(Z.offsetHeight), w(Z.offsetWidth);
    };
    ie();
    const ue = new ResizeObserver(ie);
    return ue.observe(Z), () => ue.disconnect();
  }, [A.current]), B(() => {
    const Z = j.current;
    if (!Z) return;
    const ie = () => {
      C(Z.offsetWidth);
    };
    ie();
    const ue = new ResizeObserver(ie);
    return ue.observe(Z), () => ue.disconnect();
  }, [j.current]);
  const Q = V(null), ce = V(null);
  return B(() => {
    if (ce.current) return;
    const Z = Q.current;
    if (Z)
      return ce.current = Mr(Z, {
        keys: {
          "ctrl+c": !0,
          "ctrl+v": !0,
          "ctrl+x": !0,
          "ctrl+d": !0,
          backspace: !0
        },
        exec: (ie) => {
          ie.isInput || i.exec("hotkey", ie);
        }
      }), () => {
        ce.current?.destroy(), ce.current = null;
      };
  }, []), /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-gantt", ref: A, onScroll: H, children: /* @__PURE__ */ p(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: S, width: "100%" },
      ref: j,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: y,
            width: v
          },
          children: /* @__PURE__ */ U("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: Q, children: [
            u.length ? /* @__PURE__ */ U(we, { children: [
              /* @__PURE__ */ p(
                ad,
                {
                  display: D,
                  compactMode: h,
                  columnWidth: k,
                  width: g,
                  readonly: n,
                  fullHeight: W,
                  onTableAPIChange: o
                }
              ),
              /* @__PURE__ */ p(
                Id,
                {
                  value: g,
                  display: D,
                  compactMode: h,
                  minValue: "50",
                  maxValue: "800",
                  onMove: (Z) => m(Z),
                  onDisplayChange: (Z) => E(Z)
                }
              )
            ] }) : null,
            /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-content", ref: R, children: /* @__PURE__ */ p(
              Ld,
              {
                readonly: n,
                fullWidth: L,
                fullHeight: W,
                taskTemplate: e,
                cellBorders: r,
                highlightTime: s
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
const Pd = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Yd = [
  { unit: "month", step: 1, format: "MMMM yyy" },
  { unit: "day", step: 1, format: "d" }
], zd = vt(function({
  taskTemplate: e = null,
  markers: n = [],
  taskTypes: r = _o,
  tasks: s = [],
  selected: o = [],
  activeTask: i = null,
  links: a = [],
  scales: l = Yd,
  columns: c = ko,
  start: u = null,
  end: d = null,
  lengthUnit: h = "day",
  durationUnit: f = "day",
  cellWidth: g = 100,
  cellHeight: m = 38,
  scaleHeight: x = 36,
  readonly: w = !1,
  cellBorders: y = "full",
  zoom: $ = !1,
  baselines: v = !1,
  highlightTime: C = null,
  init: D = null,
  autoScale: E = !0,
  unscheduledTasks: I = !1,
  ..._
}, k) {
  const b = V();
  b.current = _;
  const L = T(() => new gc(Ps), []), W = T(() => L.in, [L]), S = V(null);
  S.current === null && (S.current = new Bs((H, O) => {
    const q = "on" + Pd(H);
    b.current && b.current[q] && b.current[q](O);
  }), W.setNext(S.current));
  const [M, R] = K(null), N = V(null);
  N.current = M;
  const A = T(
    () => ({
      getState: L.getState.bind(L),
      getReactiveState: L.getReactive.bind(L),
      getStores: () => ({ data: L }),
      exec: W.exec,
      setNext: (H) => (S.current = S.current.setNext(H), S.current),
      intercept: W.intercept.bind(W),
      on: W.on.bind(W),
      detach: W.detach.bind(W),
      getTask: L.getTask.bind(L),
      serialize: L.serialize.bind(L),
      getTable: (H) => H ? new Promise((O) => setTimeout(() => O(N.current), 1)) : N.current
    }),
    [L, W]
  );
  bt(
    k,
    () => ({
      ...A
    }),
    [A]
  );
  const j = V(0);
  return B(() => {
    j.current ? L.init({
      tasks: s,
      links: a,
      start: u,
      columns: c,
      end: d,
      lengthUnit: h,
      cellWidth: g,
      cellHeight: m,
      scaleHeight: x,
      scales: l,
      taskTypes: r,
      zoom: $,
      selected: o,
      activeTask: i,
      baselines: v,
      autoScale: E,
      unscheduledTasks: I,
      markers: n,
      durationUnit: f
    }) : D && D(A), j.current++;
  }, [
    s,
    a,
    u,
    c,
    d,
    h,
    g,
    m,
    x,
    l,
    r,
    $,
    o,
    i,
    v,
    E,
    I,
    n,
    f
  ]), j.current === 0 && L.init({
    tasks: s,
    links: a,
    start: u,
    columns: c,
    end: d,
    lengthUnit: h,
    cellWidth: g,
    cellHeight: m,
    scaleHeight: x,
    scales: l,
    taskTypes: r,
    zoom: $,
    selected: o,
    activeTask: i,
    baselines: v,
    autoScale: E,
    unscheduledTasks: I,
    markers: n,
    durationUnit: f
  }), /* @__PURE__ */ p(tn, { words: An, optional: !0, children: /* @__PURE__ */ p(ct.Provider, { value: A, children: /* @__PURE__ */ p(
    Wd,
    {
      taskTemplate: e,
      readonly: w,
      cellBorders: y,
      highlightTime: C,
      onTableAPIChange: R
    }
  ) }) });
});
function Fd({
  appearance: t = "primary",
  icon: e = "",
  onClick: n
}) {
  return /* @__PURE__ */ p("button", { className: `wx-TyZ1fHBj wx-button ${t}`, onClick: n, children: e ? /* @__PURE__ */ p("i", { className: `wx-TyZ1fHBj wx-button-icon ${e}` }) : null });
}
class jd {
  constructor() {
    this.store = /* @__PURE__ */ new Map();
  }
  limit(e) {
    this._scope = e;
  }
  isActive() {
    return !this._scope || this._scope();
  }
  add(e, n) {
    this.store.set(e.toLowerCase().replace(/[ ]/g, ""), n);
  }
}
const Et = [], Vd = {
  subscribe: (t) => {
    Gd();
    const e = new jd();
    return Et.push(e), t(e), () => {
      const n = Et.findIndex((r) => r === e);
      n >= 0 && Et.splice(n, 1);
    };
  }
};
var Ts = !1;
function Gd() {
  Ts || (Ts = !0, document.addEventListener("keydown", (t) => {
    if (Et.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.key.toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = Et.length - 1; s >= 0; s--) {
        const o = Et[s], i = o.store.get(r) || o.store.get(n), a = t.target.tagName;
        if (i && a !== "INPUT" && a !== "TEXTAREA" && o.isActive()) {
          i(t), t.preventDefault();
          return;
        }
      }
    }
  }));
}
function Bd({ hotkey: t = null, children: e }) {
  const n = V(null), [r, s] = K(!1), o = V(r);
  B(() => {
    o.current = r;
  }, [r]);
  const i = V(() => {
    const a = n.current, l = !o.current;
    l && a ? a.requestFullscreen() : o.current && document.exitFullscreen(), s(l);
  });
  return B(() => {
    t && Vd.subscribe((a) => a.add(t, i.current));
  }, []), B(() => {
    const a = () => {
      s(document.fullscreenElement === n.current);
    };
    return document.addEventListener("fullscreenchange", a), () => {
      document.removeEventListener("fullscreenchange", a);
    };
  }, []), /* @__PURE__ */ U("div", { tabIndex: 0, className: "wx-KG2RkQhB wx-fullscreen", ref: n, children: [
    e,
    /* @__PURE__ */ p("div", { className: "wx-KG2RkQhB wx-fullscreen-icon", children: /* @__PURE__ */ p(
      Fd,
      {
        appearance: "transparent",
        icon: `wxi-${r ? "collapse" : "expand"}`,
        onClick: () => i.current()
      }
    ) })
  ] });
}
const Fo = {};
function qd(t) {
  return Fo[t] || t;
}
function Wt(t, e) {
  Fo[t] = e;
}
function jo({ menu: t = !1 }) {
  return /* @__PURE__ */ p("div", { className: `wx-z1qpqrvg wx-separator${t ? "-menu" : ""}`, children: " " });
}
function Vo() {
  return /* @__PURE__ */ p("div", { className: "wx-1IhFzpJV wx-spacer" });
}
const Kd = ({ key: t, text: e, ...n }) => n;
function Tr(t) {
  const { item: e = {}, menu: n = !1, values: r, onClick: s, onChange: o } = t, i = T(
    () => qd(e.comp || "label"),
    [e]
  ), a = P(() => {
    e && e.handler && e.handler(e), s && s({ item: e });
  }, [e, s]), l = T(() => e && e.key && r ? r[e.key] : void 0, [e, r]), c = P(
    ({ value: d }) => {
      e && e.handler && e.handler(e, d), o && o({ value: d, item: e });
    },
    [e, o]
  ), u = T(() => n ? e ? e.menuText || e.text : void 0 : e ? e.text : void 0, [n, e]);
  if (e && e.comp == "spacer")
    return /* @__PURE__ */ p(Vo, {});
  if (e && e.comp == "separator")
    return /* @__PURE__ */ p(jo, { menu: n });
  {
    const d = i, h = [
      "wx-tb-element",
      e && e.css ? e.css : "",
      e && e.spacer ? "wx-spacer" : "",
      n ? "wx-menu" : ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ p(
      "div",
      {
        className: "wx-KVAsgMam " + h,
        "data-id": e ? e.id : void 0,
        children: /* @__PURE__ */ p(
          d,
          {
            value: l,
            onChange: c,
            onClick: a,
            text: u,
            menu: n,
            ...Kd(e)
          }
        )
      }
    );
  }
}
function Nn({
  item: t,
  values: e = null,
  menu: n = !1,
  onChange: r,
  onClick: s
}) {
  const [o, i] = K(!0), a = () => i(!0), l = () => i(!1), c = (d) => {
    a(), s && s(d);
  }, u = [
    "wx-wSVFAGym",
    "wx-tb-group",
    t.css || "",
    t.layout == "column" ? "wx-column" : "",
    t.collapsed && !n ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: u, children: t.collapsed && !n ? /* @__PURE__ */ U(we, { children: [
    /* @__PURE__ */ U("div", { className: "wx-wSVFAGym wx-collapsed", onClick: l, children: [
      t.icon ? /* @__PURE__ */ p("i", { className: `wx-wSVFAGym icon ${t.icon}` }) : null,
      t.text ? /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-label-text", children: t.text }) : null,
      t.text && !t.icon ? /* @__PURE__ */ p("i", { className: "wx-wSVFAGym wx-label-arrow wxi-angle-down" }) : null
    ] }),
    o ? null : /* @__PURE__ */ p(It, { width: "", oncancel: a, children: /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-drop-group", children: /* @__PURE__ */ p(
      Nn,
      {
        item: { ...t, text: "", collapsed: !1 },
        values: e,
        menu: n,
        onChange: r,
        onClick: c
      }
    ) }) })
  ] }) : /* @__PURE__ */ U(we, { children: [
    /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-tb-body", children: t.items.map(
      (d, h) => d.items ? /* @__PURE__ */ p(
        Nn,
        {
          item: d,
          values: e,
          onClick: c,
          onChange: r
        },
        d.id || h
      ) : /* @__PURE__ */ p(
        Tr,
        {
          item: d,
          values: e,
          onClick: c,
          onChange: r
        },
        d.id || h
      )
    ) }),
    t.text ? /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-label", children: t.text }) : null
  ] }) });
}
function Ud({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [i, a] = K(void 0), l = V(null);
  function c() {
    a(null);
  }
  function u() {
    a(!0);
  }
  function d(h) {
    c(), s && s(h);
  }
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-Yo6BuX0p wx-menu ${e || ""}`,
      ref: l,
      "data-id": "$menu",
      children: [
        /* @__PURE__ */ p(gt, { icon: "wxi-dots-h", onClick: u }),
        i ? /* @__PURE__ */ p(It, { width: `${r}px`, onCancel: c, children: /* @__PURE__ */ p("div", { className: "wx-Yo6BuX0p wx-drop-menu", children: t.map(
          (h, f) => h.items ? /* @__PURE__ */ p(
            Nn,
            {
              item: h,
              values: n,
              menu: !0,
              onClick: d,
              onChange: o
            },
            h.id || f
          ) : /* @__PURE__ */ p(
            Tr,
            {
              item: h,
              values: n,
              menu: !0,
              onClick: d,
              onChange: o
            },
            h.id || f
          )
        ) }) }) : null
      ]
    }
  );
}
function Qd(t) {
  return t.forEach((e) => {
    e.id || (e.id = et());
  }), t;
}
function dr(t) {
  const {
    items: e,
    menuCss: n = "",
    css: r = "",
    values: s,
    overflow: o = "menu",
    onClick: i,
    onChange: a
  } = t, [l, c] = Me(e || []), [u, d] = Me(s || null), h = T(() => Qd(l), [l]), f = V(null), g = V(-1), [m, x] = K([]), w = V(h);
  B(() => {
    w.current = h;
  }, [l]);
  const y = V(o);
  B(() => {
    y.current = o;
  }, [o]);
  const $ = V(m);
  B(() => {
    $.current = m;
  }, [m]);
  const v = V(!1);
  function C(k) {
    u && (u[k.item.key] = k.value, d({ ...u })), a && a(k);
  }
  function D() {
    const k = f.current;
    if (!k) return 0;
    const b = k.children, L = w.current || [];
    let W = 0;
    for (let S = 0; S < L.length; S++)
      L[S].comp !== "spacer" && (W += b[S].clientWidth, L[S].comp === "separator" && (W += 8));
    return W;
  }
  function E() {
    const k = f.current, b = w.current || [];
    if (k) {
      for (let L = b.length - 1; L >= 0; L--)
        if (b[L].items && !b[L].collapsed) {
          b[L].collapsed = !0, b[L].$width = k.children[L].offsetWidth, v.current = !0, c([...b]);
          return;
        }
    }
  }
  function I(k) {
    const b = f.current, L = w.current || [];
    if (b) {
      for (let W = 0; W < L.length; W++)
        if (L[W].collapsed && L[W].$width) {
          L[W].$width - b.children[W].offsetWidth < k + 10 && (L[W].collapsed = !1, v.current = !0), c([...L]);
          return;
        }
    }
  }
  function _() {
    const k = f.current;
    if (!k) return;
    const b = w.current || [], L = y.current;
    if (L === "wrap") return;
    const W = k.clientWidth;
    if (k.scrollWidth > W) {
      if (L === "collapse") return E();
      const S = k.children;
      let M = 0;
      for (let R = 0; R < b.length; R++) {
        if (M += S[R].clientWidth, b[R].comp === "separator" && (M += 8), M > W - 40) {
          if (g.current === R) return;
          g.current = R;
          const N = [];
          for (let A = R; A < b.length; A++)
            N.push(b[A]), S[A].style.visibility = "hidden";
          R > 0 && b[R - 1].comp === "separator" && (S[R - 1].style.visibility = "hidden"), x(N);
          break;
        }
        S[R].style.visibility = "";
      }
    } else {
      const S = W - D();
      if (S <= 0) return;
      if (L === "collapse") return I(S);
      if (($.current || []).length) {
        g.current = null;
        const M = k.children;
        for (let R = 0; R < b.length; R++)
          M[R].style.visibility = "";
        x([]);
      }
    }
  }
  return B(() => {
    v.current && (v.current = !1, _());
  }, [l]), B(() => {
    const k = new ResizeObserver(() => _());
    return f.current && k.observe(f.current), () => {
      k.disconnect();
    };
  }, []), /* @__PURE__ */ U(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: f,
      children: [
        h.map(
          (k) => k.items ? /* @__PURE__ */ p(
            Nn,
            {
              item: k,
              values: u,
              onClick: i,
              onChange: C
            },
            k.id
          ) : /* @__PURE__ */ p(
            Tr,
            {
              item: k,
              values: u,
              onClick: i,
              onChange: C
            },
            k.id
          )
        ),
        !!m.length && /* @__PURE__ */ p(
          Ud,
          {
            items: m,
            css: n,
            values: u,
            onClick: i,
            onChange: C
          }
        )
      ]
    }
  );
}
function Xd(t) {
  const { icon: e, text: n = "", css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ U("div", { className: "wx-HXpG4gnx wx-item", onClick: a, children: [
    /* @__PURE__ */ p("i", { className: `wx-HXpG4gnx ${e || "wxi-empty"} ${r || ""}` }),
    n
  ] }) : /* @__PURE__ */ p(
    gt,
    {
      icon: e,
      type: s,
      css: r,
      text: n,
      disabled: o,
      onClick: a
    }
  );
}
function Jd(t) {
  const { text: e, value: n, children: r } = t;
  return r ? /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: r() }) : /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: n || e });
}
function Zd(t) {
  const { icon: e, text: n, css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ U("div", { className: "wx-3cuSqONJ wx-item", onClick: a, children: [
    e ? /* @__PURE__ */ p("i", { className: `wx-3cuSqONJ ${e || ""} ${r || ""}` }) : null,
    n
  ] }) : /* @__PURE__ */ p(
    gt,
    {
      icon: e,
      type: s,
      css: r,
      title: n,
      disabled: o,
      onClick: a
    }
  );
}
function eh({ id: t = "", text: e = "", css: n = "", icon: r = "", onClick: s }) {
  function o() {
    s && s({ id: t });
  }
  return /* @__PURE__ */ U("div", { className: `wx-U0Bx7pIR wx-label ${n}`, onClick: o, children: [
    r ? /* @__PURE__ */ p("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
Wt("button", Xd);
Wt("separator", jo);
Wt("spacer", Vo);
Wt("label", Jd);
Wt("item", eh);
Wt("icon", Zd);
function th({
  api: t = null,
  items: e = [...lr]
}) {
  const n = pe(Fe.i18n), r = T(() => n || Lt(An), [n]), s = T(() => r.getGroup("gantt"), [r]), o = mt(t, "_selected"), i = mt(t, "_tasks"), a = T(() => e.map((c) => {
    let u = { ...c, disabled: !1 };
    return u.handler = Sr(lr, u.id) ? (d) => Dt(t, d.id, null, s) : u.handler, u.text && (u.text = s(u.text)), u.menuText && (u.menuText = s(u.menuText)), u;
  }), [e, t, s]), l = T(() => t && o?.length ? a.map((c) => {
    if (!c.check) return c;
    const u = o.some(
      (d) => !c.check(d, i)
    );
    return { ...c, disabled: u };
  }) : [{ ...a[0], disabled: !1 }], [t, o, i, a]);
  return n ? /* @__PURE__ */ p(dr, { items: l }) : /* @__PURE__ */ p(Fe.i18n.Provider, { value: r, children: /* @__PURE__ */ p(dr, { items: l }) });
}
const nh = vt(function({
  options: e,
  api: n = null,
  resolver: r = null,
  filter: s = null,
  at: o = "point",
  children: i,
  onClick: a,
  css: l
}, c) {
  const u = T(() => e ?? [...ar], [e]), [d] = Me(u), h = V(null), f = V(null), g = pe(Fe.i18n), m = T(() => g || Lt({ ...An, ...Tn }), [g]), x = T(() => m.getGroup("gantt"), [m]), w = mt(n, "taskTypes"), y = mt(n, "_tasks"), $ = mt(n, "selected"), v = mt(n, "_selected");
  B(() => {
    n && (n.on("scroll-chart", () => {
      h.current && h.current.show && h.current.show();
    }), n.on("drag-task", () => {
      h.current && h.current.show && h.current.show();
    }));
  }, [n]);
  function C(S) {
    return S.map((M) => (M = { ...M }, M.text && (M.text = x(M.text)), M.subtext && (M.subtext = x(M.subtext)), M.data && (M.data = C(M.data)), M));
  }
  function D() {
    const S = d.find((M) => M.id === "convert-task");
    return S && (S.data = [], (w || []).forEach((M) => {
      S.data.push(S.dataFactory(M));
    })), C(d);
  }
  const E = T(() => n ? D() : null, [n, d, w, x]), I = T(
    () => v && v.length ? v : [],
    [v]
  ), _ = P(
    (S, M) => {
      let R = S ? n?.getTask(S) : null;
      if (r) {
        const N = r(S, M);
        R = N === !0 ? R : N;
      }
      return R && (f.current = R.id, (!Array.isArray($) || !$.includes(R.id)) && n && n.exec && n.exec("select-task", { id: R.id })), R;
    },
    [n, r, $]
  ), k = P(
    (S) => {
      const M = S.action;
      M && (Sr(ar, M.id) && Dt(n, M.id, f.current, x), a && a(S));
    },
    [n, x, a]
  ), b = P(
    (S, M) => {
      const R = I.length ? I : M ? [M] : [];
      let N = s ? s(S, M) : !0;
      if (S.check && N) {
        const A = R.some((j) => !S.check(j, y));
        S.css = A ? "wx-disabled" : "";
      }
      return N;
    },
    [s, I, y]
  );
  bt(c, () => ({
    show: (S, M) => {
      h.current && h.current.show && h.current.show(S, M);
    }
  }));
  const L = P((S) => {
    h.current && h.current.show && h.current.show(S);
  }, []), W = /* @__PURE__ */ U(we, { children: [
    /* @__PURE__ */ p(
      Oo,
      {
        filter: b,
        options: E,
        dataKey: "id",
        resolver: _,
        onClick: k,
        at: o,
        ref: h,
        css: l
      }
    ),
    /* @__PURE__ */ p("span", { onContextMenu: L, "data-menu-ignore": "true", children: typeof i == "function" ? i() : i })
  ] });
  if (!g && Fe.i18n?.Provider) {
    const S = Fe.i18n.Provider;
    return /* @__PURE__ */ p(S, { value: m, children: W });
  }
  return W;
}), hr = {};
function Es(t) {
  return typeof t < "u" ? hr[t] || t : hr.text;
}
function qe(t, e) {
  hr[t] = e;
}
const rh = {
  editor: {}
};
function qn(t) {
  const {
    editors: e,
    data: n,
    css: r = "",
    errors: s,
    focus: o = !1,
    onClick: i,
    children: a,
    onChange: l
  } = t, c = V(null);
  B(() => {
    if (o) {
      const f = document.activeElement;
      if (f && c.current && c.current.contains(f)) return;
      const g = c.current ? c.current.querySelector(
        "input:not([disabled]), textarea:not([disabled]), select:not([disabled])"
      ) : null;
      g && setTimeout(() => {
        typeof g.select == "function" && g.select(), typeof g.focus == "function" && g.focus();
      }, 300);
    }
  }, []);
  const u = pe(Fe.i18n), d = T(() => u.getGroup("editor"), [u]), h = T(
    () => e.config[0].comp === "readonly" && e.config.every((f) => !Object.keys(n).includes(f.key)),
    [e, n]
  );
  return /* @__PURE__ */ U("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
    a,
    h ? /* @__PURE__ */ p("div", { className: "wx-s2aE1xdZ wx-overlay", children: d("No data") }) : null,
    e.config.map((f) => {
      if (!f.hidden) {
        const { key: g, onChange: m, ...x } = f;
        if (f.comp === "readonly" || f.comp === "section") {
          const w = Es(f.comp);
          return /* @__PURE__ */ p(
            w,
            {
              fieldKey: g,
              label: f.label,
              value: n[g],
              ...x,
              onClick: i
            },
            g
          );
        } else {
          const w = Es(f.comp);
          return /* @__PURE__ */ U("div", { children: [
            /* @__PURE__ */ p(
              Kt,
              {
                label: f.labelTemplate ? f.labelTemplate(n[g]) : f.label ?? "",
                required: f.required,
                children: ({ id: y }) => /* @__PURE__ */ p(
                  w,
                  {
                    fieldKey: g,
                    ...x,
                    onChange: m || (($) => {
                      l && l({
                        value: $.value,
                        key: g,
                        input: $.input
                      });
                    }),
                    id: y,
                    label: void 0,
                    error: s && s[g],
                    value: n[g]
                  },
                  g
                )
              }
            ),
            s && s[g] && f.validationMessage ? /* @__PURE__ */ p("div", { className: "wx-s2aE1xdZ wx-message", children: f.validationMessage }) : null
          ] }, g);
        }
      }
      return null;
    })
  ] });
}
function sh(t) {
  if (typeof t == "string" && t.includes(".")) {
    const e = t.split(".");
    return (n) => {
      let r = n;
      return e.forEach((s) => {
        r = r[s];
      }), r;
    };
  }
  return (e) => e[t];
}
function oh(t) {
  if (typeof t == "string" && t.includes(".")) {
    const e = t.split(".");
    return (n, r) => {
      let s = n;
      e.forEach((o, i) => {
        i === e.length - 1 ? s[o] = r : s = s[o];
      });
    };
  }
  return (e, n) => e[t] = n;
}
function ih(t) {
  const e = t.map((i) => {
    const a = { ...i };
    return i.config && Object.assign(a, i.config), a.key = i.key || ta(), a.setter = i.setter || oh(i.key), a.getter = i.getter || sh(i.key), a;
  }), n = (i) => {
    const a = {};
    return e.forEach((l) => {
      l.comp !== "section" && (l.getter ? a[l.key] = l.getter(i) : a[l.key] = i[l.key]);
    }), a;
  }, r = (i, a, l) => ((l.length ? l.map((c) => e.find((u) => u.key === c)) : e).forEach((c) => {
    c.setter ? c.setter(i, a[c.key]) : i[c.key] = a[c.key];
  }), i), s = (i, a) => {
    const l = n(i), c = [];
    return e.forEach((u) => {
      const d = l[u.key], h = a[u.key];
      !On(d, h) && (d !== void 0 || h) && c.push(u.key);
    }), c;
  }, o = (i, a, l) => {
    let c = 0;
    const u = {};
    return (a?.length ? a.map((d) => e.find((h) => h.key === d)) : e).forEach((d) => {
      d.required && !i[d.key] ? (u[d.key] = {
        errorType: "required"
      }, d.validationMessage = d.validationMessage ?? l("This field is required"), c++) : d.validation && !d.validation(i[d.key]) && (u[d.key] = {
        errorType: "validation"
      }, d.validationMessage = d.validationMessage ?? l("Invalid value"), c++);
    }), c > 0 ? u : null;
  };
  return {
    config: e.filter((i) => i.comp !== "hidden"),
    getValues: n,
    setValues: r,
    diff: s,
    validateValues: o
  };
}
function ah({
  values: t,
  items: e,
  css: n,
  activeBatch: r,
  autoSave: s,
  focus: o,
  readonly: i,
  topBar: a = !0,
  bottomBar: l = !0,
  layout: c = "default",
  placement: u = "inline",
  view: d,
  children: h,
  onChange: f,
  onSave: g,
  onAction: m,
  onValidation: x
}) {
  const w = pe(Fe.i18n).getGroup("editor"), [y, $] = Me(t), [v, C] = K(null), D = T(() => {
    const H = ih(e);
    v && H.config.forEach((Q) => {
      Q.comp === "section" && Q.key === v && (Q.sectionMode === "accordion" ? Q.activeSection || (H.config.forEach((ce) => {
        ce.comp === "section" && ce.key !== Q.key && (ce.activeSection = !1);
      }), Q.activeSection = !0) : Q.activeSection = !Q.activeSection);
    });
    let O = /* @__PURE__ */ new Set(), q = null;
    return H.config.forEach((Q) => {
      Q.sectionMode === "exclusive" && Q.activeSection && (q = Q.key), Q.activeSection && O.add(Q.key);
    }), H.config.forEach((Q) => {
      Q.hidden = Q.hidden || r && r !== Q.batch || q && Q.key != q && Q.section !== q || Q.section && !O.has(Q.section);
    }), i ? {
      ...H,
      config: H.config.map((Q) => ({ ...Q, comp: "readonly" })),
      diff: () => []
    } : H;
  }, [e, v, r, i]), [E, I] = K({}), [_, k] = K({});
  B(() => {
    y !== void 0 && (I($n(y)), k($n(y)));
  }, [y]);
  const b = y, [L, W] = K([]);
  B(() => {
    y && W([]);
  }, [y]);
  function S(H) {
    return [...new Set(H)];
  }
  function M(H) {
    const O = D.validateValues(E, H, w);
    return On(O, b.errors) || x && x({ errors: O, values: E }), O;
  }
  function R(H, O) {
    if (s && !b.errors) {
      const q = D.setValues(y, O ?? _, H);
      $(q), g && g({ changes: H, values: q });
    } else
      W(H);
  }
  function N({ value: H, key: O, input: q }) {
    let Q = { ..._ || {}, [O]: H };
    const ce = {
      key: O,
      value: H,
      update: Q
    };
    if (q && (ce.input = q), f && f(ce), !y) return;
    Q = ce.update, k(Q);
    const Z = D.diff(y, Q), ie = D.setValues(
      { ...E || {} },
      Q,
      S([...Z, O])
    );
    if (I(ie), Z.length) {
      const ue = s ? [] : S([...Z, ...Object.keys(b.errors ?? {}), O]);
      b.errors = M(ue), R(Z, Q);
    } else {
      const ue = Object.keys(b.errors ?? {});
      ue.length && (b.errors = M(ue)), W([]);
    }
  }
  function A() {
    if (L.length && (s || (b.errors = M()), !b.errors)) {
      g && g({
        changes: L,
        values: E
      });
      const H = D.setValues(y, _, L);
      $(H), W([]), $({ ...E });
    }
  }
  function j({ item: H }) {
    H.id === "save" ? A() : H.id === "toggle-section" && C(H.key), m && m({ item: H, values: E, changes: L });
  }
  return /* @__PURE__ */ p(
    d,
    {
      topBar: a,
      bottomBar: l,
      placement: u,
      layout: c,
      readonly: i,
      autoSave: s,
      css: n,
      data: _,
      editors: D,
      focus: o,
      errors: b.errors,
      onClick: j,
      onKeyDown: j,
      onChange: N,
      children: h
    }
  );
}
function lh(t, { keys: e, action: n }) {
  function r(s) {
    let o = s.code.replace("Key", "").toLowerCase();
    const i = `${s.ctrlKey || s.metaKey ? "ctrl+" : ""}${o}`, a = e[i];
    if (!a) return;
    const l = s.target.closest(".wx-combo") || s.target.closest(".wx-multicombo") || s.target.closest(".wx-richselect");
    l && l.querySelector(".wx-list") || (s.preventDefault(), n(a));
  }
  return t.addEventListener("keydown", r), {
    destroy: () => {
      t.removeEventListener("keydown", r);
    }
  };
}
function ch(t) {
  const { editors: e, data: n, layout: r, errors: s, focus: o, onClick: i, onChange: a } = t, l = T(() => {
    let c = [];
    if (r === "columns" && (c = [
      { ...e, config: [] },
      { ...e, config: [] }
    ], e.config.forEach((u) => {
      const d = u.column === "left" ? 0 : 1;
      c[d].config.push(u);
    }), c[0].config.length)) {
      const u = c[0].config[0];
      u.comp === "text" && (c[0][0] = {
        ...u,
        css: "title",
        label: ""
      });
    }
    return c;
  }, [r, e]);
  return r === "columns" ? /* @__PURE__ */ U("div", { className: "wx-bNrSbszs wx-cols", children: [
    /* @__PURE__ */ p("div", { className: "wx-bNrSbszs wx-left", children: /* @__PURE__ */ p(
      qn,
      {
        editors: l[0],
        data: n,
        errors: s,
        onClick: i,
        onChange: a
      }
    ) }),
    /* @__PURE__ */ p("div", { className: "wx-bNrSbszs wx-right", children: /* @__PURE__ */ p(
      qn,
      {
        editors: l[1],
        data: n,
        focus: o,
        errors: s,
        onClick: i,
        onChange: a
      }
    ) })
  ] }) : /* @__PURE__ */ p(
    qn,
    {
      editors: e,
      data: n,
      focus: o,
      errors: s,
      onClick: i,
      onChange: a
    }
  );
}
function Rs({
  items: t,
  values: e = null,
  top: n = !0,
  onClick: r,
  onChange: s
}) {
  const o = P(
    ({ item: i, value: a }) => {
      s && s({ key: i.key, value: a });
    },
    [s]
  );
  return t.length ? /* @__PURE__ */ p(
    "div",
    {
      className: `wx-66OW1j0R wx-editor-toolbar ${n ? "wx-topbar" : "wx-bottom"}`,
      children: /* @__PURE__ */ p(
        dr,
        {
          items: t,
          values: e,
          onClick: r,
          onChange: o
        }
      )
    }
  ) : null;
}
const jt = () => ({ comp: "spacer" }), Kn = (t) => ({
  comp: "button",
  text: t("Cancel"),
  id: "cancel"
}), Un = (t) => ({
  type: "primary",
  comp: "button",
  text: t("Save"),
  id: "save"
}), As = () => ({
  comp: "icon",
  icon: "wxi-close",
  id: "close"
});
function Qn(t) {
  const {
    data: e,
    editors: n,
    focus: r,
    css: s,
    topBar: o,
    bottomBar: i,
    layout: a,
    placement: l,
    errors: c,
    readonly: u,
    autoSave: d,
    children: h,
    onClick: f,
    onKeyDown: g,
    onChange: m
  } = t, x = pe(Fe.i18n), w = T(() => x.getGroup("editor"), [x]), y = T(
    () => o === !0 && i === !0,
    [o, i]
  ), $ = T(() => {
    let E = o && o.items ? o.items.map((I) => ({ ...I })) : [];
    return y && (u ? E = [jt(), As()] : (d ? E = [jt(), As()] : l !== "modal" && (E = [jt(), Kn(w), Un(w)]), a === "columns" && !E.length && (E = [jt(), Un(w), Kn(w)]))), E;
  }, [o, y, u, d, l, a, w]), v = T(() => {
    let E = i && i.items ? i.items.map((I) => ({ ...I })) : [];
    return y && (u || (l === "modal" && !d && (E = [jt(), Un(w), Kn(w)]), a === "columns" && $.length && (E = []))), E;
  }, [i, y, u, l, d, a, $, w]), C = T(() => [...$, ...v], [$, v]), D = V(null);
  return B(() => {
    const E = D.current;
    if (!E) return;
    const I = lh(E, {
      keys: {
        "ctrl+s": C.find((_) => _.id === "save"),
        escape: C.find((_) => _.id === "cancel" || _.id === "close"),
        "ctrl+d": C.find((_) => _.id === "delete")
      },
      action: (_) => {
        g && g({ item: _ });
      }
    });
    return () => {
      typeof I == "function" && I();
    };
  }, [C, g]), /* @__PURE__ */ U("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: D, children: [
    /* @__PURE__ */ p(
      Rs,
      {
        ...o && typeof o == "object" ? o : {},
        items: $,
        values: e,
        onClick: f,
        onChange: m
      }
    ),
    /* @__PURE__ */ U(
      "div",
      {
        className: `wx-85HDaNoA wx-content${a === "columns" ? " wx-layout-columns" : ""}`,
        children: [
          h,
          /* @__PURE__ */ p(
            ch,
            {
              editors: n,
              layout: a,
              data: e,
              focus: r,
              errors: c,
              onClick: f,
              onChange: m
            }
          ),
          /* @__PURE__ */ p(
            Rs,
            {
              ...i && typeof i == "object" ? i : {},
              items: v,
              values: e,
              top: !1,
              onClick: f,
              onChange: m
            }
          )
        ]
      }
    )
  ] });
}
function uh(t) {
  const { css: e, onClick: n, placement: r, ...s } = t;
  function o() {
    n && n({ item: { id: "close" } });
  }
  return r === "modal" ? /* @__PURE__ */ p(Qi, { children: /* @__PURE__ */ p(
    Qn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : r === "sidebar" ? /* @__PURE__ */ p(Xi, { onCancel: o, children: /* @__PURE__ */ p(
    Qn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : /* @__PURE__ */ p(
    Qn,
    {
      css: `wx-inline-form ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  );
}
function dh(t) {
  const {
    values: e = {},
    items: n = [],
    css: r = "",
    activeBatch: s = null,
    topBar: o = !0,
    bottomBar: i = !0,
    focus: a = !1,
    autoSave: l = !1,
    layout: c = "default",
    readonly: u = !1,
    placement: d = "inline",
    children: h,
    ...f
  } = t, g = Object.keys(f).reduce((m, x) => {
    if (/^on[a-z]/.test(x)) {
      const w = "on" + x.charAt(2).toUpperCase() + x.slice(3);
      w in f ? m[x] = f[x] : m[w] = f[x];
    } else
      m[x] = f[x];
    return m;
  }, {});
  return /* @__PURE__ */ p(tn, { words: rh, optional: !0, children: /* @__PURE__ */ p(
    ah,
    {
      view: uh,
      values: e,
      items: n,
      css: r,
      activeBatch: s,
      topBar: o,
      bottomBar: i,
      focus: a,
      autoSave: l,
      layout: c,
      readonly: u,
      placement: d,
      ...g,
      children: h
    }
  ) });
}
function hh({ value: t, options: e, label: n }) {
  const r = pe(Fe.i18n).getGroup("editor"), s = T(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const i = e.find((a) => a.id === t);
      i && (o = i.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ p(Kt, { label: n, children: s }) : null;
}
function fh({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-OmgQq65I wx-section${n ? " wx-section-active" : ""}`,
      onClick: () => r && r({
        item: { id: "toggle-section", key: n ? null : t }
      }),
      children: [
        /* @__PURE__ */ p("h3", { children: e }),
        /* @__PURE__ */ p(
          "i",
          {
            className: `wx-OmgQq65I wxi-angle-${n ? "down" : "right"} wx-icon`
          }
        )
      ]
    }
  );
}
qe("text", Rn);
qe("textarea", $i);
qe("checkbox", Si);
qe("readonly", hh);
qe("section", fh);
fr(Ye);
function mh({ api: t, autoSave: e, onLinksChange: n }) {
  const s = pe(Fe.i18n).getGroup("gantt"), o = re(t, "activeTask"), i = re(t, "_links"), [a, l] = K();
  function c() {
    if (o) {
      const f = i.filter((m) => m.target == o).map((m) => ({ link: m, task: t.getTask(m.source) })), g = i.filter((m) => m.source == o).map((m) => ({ link: m, task: t.getTask(m.target) }));
      return [
        { title: s("Predecessors"), data: f },
        { title: s("Successors"), data: g }
      ];
    }
  }
  B(() => {
    l(c());
  }, [o, i]);
  const u = T(
    () => [
      { id: "e2s", label: s("End-to-start") },
      { id: "s2s", label: s("Start-to-start") },
      { id: "e2e", label: s("End-to-end") },
      { id: "s2e", label: s("Start-to-end") }
    ],
    [s]
  );
  function d(f) {
    e ? t.exec("delete-link", { id: f }) : (l(
      (g) => (g || []).map((m) => ({
        ...m,
        data: m.data.filter((x) => x.link.id !== f)
      }))
    ), n && n({
      id: f,
      action: "delete-link",
      data: { id: f }
    }));
  }
  function h(f, g) {
    const m = f.value;
    e ? t.exec("update-link", {
      id: g,
      link: { type: m }
    }) : (l(
      (x) => (x || []).map((w) => ({
        ...w,
        data: w.data.map(
          (y) => y.link.id === g ? { ...y, link: { ...y.link, type: m } } : y
        )
      }))
    ), n && n({
      id: g,
      action: "update-link",
      data: {
        id: g,
        link: { type: m }
      }
    }));
  }
  return /* @__PURE__ */ p(we, { children: (a || []).map(
    (f, g) => f.data.length ? /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ p(Kt, { label: f.title, position: "top", children: /* @__PURE__ */ p("table", { children: /* @__PURE__ */ p("tbody", { children: f.data.map((m) => /* @__PURE__ */ U("tr", { children: [
      /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-task-name", children: m.task.text || "" }) }),
      /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ p(
        Mi,
        {
          value: m.link.type,
          placeholder: s("Select link type"),
          options: u,
          onChange: (x) => h(x, m.link.id),
          children: ({ option: x }) => x.label
        }
      ) }) }),
      /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ p(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => d(m.link.id),
          role: "button"
        }
      ) })
    ] }, m.link.id)) }) }) }) }, g) : null
  ) });
}
function ph(t) {
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...i } = t, a = o ?? s;
  function l(c) {
    const u = new Date(c.value);
    u.setHours(e.getHours()), u.setMinutes(e.getMinutes()), a && a({ value: u });
  }
  return /* @__PURE__ */ U("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ p(
      ji,
      {
        ...i,
        value: e,
        onChange: l,
        format: r,
        buttons: ["today"],
        clear: !1
      }
    ),
    n ? /* @__PURE__ */ p(Ui, { value: e, onChange: a, format: r }) : null
  ] });
}
qe("select", Fs);
qe("date", ph);
qe("twostate", js);
qe("slider", Zn);
qe("counter", Vi);
qe("links", mh);
function gh({
  api: t,
  items: e = So,
  css: n = "",
  layout: r = "default",
  readonly: s = !1,
  placement: o = "sidebar",
  bottomBar: i = !0,
  topBar: a = !0,
  autoSave: l = !0,
  focus: c = !1
}) {
  const u = pe(Fe.i18n), d = T(() => u || Lt({ ...An, ...Tn }), [u]), h = T(() => d.getGroup("gantt"), [d]), f = d.getRaw(), g = T(() => {
    const G = f.gantt?.dateFormat || f.formats?.dateFormat;
    return Tt(G, f.calendar);
  }, [f]), m = T(() => {
    if (a === !0 && !s) {
      const G = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: h("Delete"),
          id: "delete"
        }
      ];
      return l ? { items: G } : {
        items: [
          ...G,
          {
            comp: "button",
            type: "primary",
            text: h("Save"),
            id: "save"
          }
        ]
      };
    }
    return a;
  }, [a, s, l, h]), [x, w] = K(!1), y = T(
    () => x ? "wx-full-screen" : "",
    [x]
  ), $ = P((G) => {
    w(G);
  }, []);
  B(() => {
    const G = zo($);
    return G.observe(), () => {
      G.disconnect();
    };
  }, [$]);
  const v = re(t, "_activeTask"), C = T(() => v?.id, [v]), D = re(t, "durationUnit"), E = re(t, "unscheduledTasks"), I = re(t, "taskTypes"), [_, k] = Me(v?.type), b = T(() => v?.unscheduled, [v]), [L, W] = K({});
  B(() => {
    W({});
  }, [C]);
  const S = T(() => _ === "milestone", [_]), M = T(() => _ === "summary", [_]);
  function R(G, ee) {
    const se = { start: 1, end: 1, duration: 1 };
    return G.map((fe) => {
      const oe = { ...fe };
      if (fe.config && (oe.config = { ...oe.config }), oe.comp === "links" && t && (oe.api = t, oe.autoSave = l, oe.onLinksChange = H), oe.comp === "select" && oe.key === "type") {
        let _e = oe.options ?? (I || []);
        oe.options = _e.map((Ae) => ({
          ...Ae,
          label: h(Ae.label)
        }));
      }
      return oe.comp === "slider" && oe.key === "progress" && (oe.labelTemplate = (_e) => `${h(oe.label)} ${_e}%`), oe.label && (oe.label = h(oe.label)), oe.config?.placeholder && (oe.config.placeholder = h(oe.config.placeholder)), E && se[oe.key] && (ee ? oe.disabled = !0 : delete oe.disabled), oe;
    });
  }
  function N(G) {
    return G.filter(({ comp: ee, key: se, options: fe }) => {
      switch (ee) {
        case "date":
          return (!S || se !== "end" && se !== "base_end") && !M;
        case "select":
          return fe.length > 1;
        case "twostate":
          return E && !M;
        case "counter":
          return !M && !S;
        case "slider":
          return !S;
        default:
          return !0;
      }
    });
  }
  const A = T(() => {
    const G = R(e, b);
    return N(G);
  }, [
    e,
    b,
    S,
    M,
    E,
    I,
    h,
    t,
    l
  ]), j = T(() => {
    if (s && v) {
      let G = {};
      return A.forEach(({ key: ee, comp: se }) => {
        if (se !== "links") {
          const fe = v[ee];
          se === "date" && fe instanceof Date ? G[ee] = g(fe) : se === "slider" && ee === "progress" ? G[ee] = `${fe}%` : G[ee] = fe;
        }
      }), G;
    }
    return v ? { ...v } : null;
  }, [s, v, A, g]);
  function H({ id: G, action: ee, data: se }) {
    W((fe) => ({
      ...fe,
      [G]: { action: ee, data: se }
    }));
  }
  const O = P(() => {
    for (let G in L) {
      const { action: ee, data: se } = L[G];
      t.exec(ee, se);
    }
  }, [t, L]), q = P(() => {
    t.exec("delete-task", { id: C });
  }, [t, C]), Q = P(() => {
    t.exec("show-editor", { id: null });
  }, [t]), ce = P((G) => {
    const { item: ee, changes: se } = G;
    ee.id === "delete" && q(), ee.id === "save" && (se.length ? Q() : O()), ee.comp && Q();
  }, [t, C, l, O, q, Q]), Z = P((G, ee) => (E && G.type === "summary" && (G.unscheduled = !1), Qt(G, D, !0, ee), G), [E, D]), ie = P((G) => {
    let { update: ee, key: se, value: fe } = G;
    G.update = Z({ ...ee }, se), l || se === "type" && k(fe);
  }, [t, l]), ue = P((G) => {
    let { values: ee } = G;
    ee = {
      ...ee,
      unscheduled: E && ee.unscheduled && ee.type !== "summary"
    }, delete ee.links, delete ee.data, t.exec("update-task", {
      id: C,
      task: ee
    }), l || O();
  }, [t, C, E, l, O]);
  return j ? /* @__PURE__ */ p(tn, { children: /* @__PURE__ */ p(
    dh,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${y} ${n}`,
      items: A,
      values: j,
      topBar: m,
      bottomBar: i,
      placement: o,
      layout: r,
      readonly: s,
      autoSave: l,
      focus: c,
      onAction: ce,
      onSave: ue,
      onChange: ie
    }
  ) }) : null;
}
const wh = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = K(null);
  return B(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ p(od, { api: r, columns: e, children: t });
};
function xh(t) {
  const { api: e, content: n, children: r } = t, s = V(null), o = V(null), [i, a] = K({}), [l, c] = K(null), [u, d] = K({});
  function h(v) {
    for (; v; ) {
      if (v.getAttribute) {
        const C = v.getAttribute("data-tooltip-id"), D = v.getAttribute("data-tooltip-at"), E = v.getAttribute("data-tooltip");
        if (C || E) return { id: C, tooltip: E, target: v, at: D };
      }
      v = v.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  B(() => {
    const v = o.current;
    if (v && u && (u.text || n)) {
      const C = v.getBoundingClientRect();
      let D = !1, E = u.left, I = u.top;
      C.right >= i.right && (E = i.width - C.width - 5, D = !0), C.bottom >= i.bottom && (I = u.top - (C.bottom - i.bottom + 2), D = !0), D && d((_) => _ && { ..._, left: E, top: I });
    }
  }, [u, i, n]);
  const f = V(null), g = 300, m = (v) => {
    clearTimeout(f.current), f.current = setTimeout(() => {
      v();
    }, g);
  };
  function x(v) {
    let { id: C, tooltip: D, target: E, at: I } = h(v.target);
    if (d(null), c(null), !D)
      if (C)
        D = y(C);
      else {
        clearTimeout(f.current);
        return;
      }
    const _ = v.clientX;
    m(() => {
      C && c(w($(C)));
      const k = E.getBoundingClientRect(), b = s.current, L = b ? b.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let W, S;
      I === "left" ? (W = k.top + 5 - L.top, S = k.right + 5 - L.left) : (W = k.top + k.height - L.top, S = _ - L.left), a(L), d({ top: W, left: S, text: D });
    });
  }
  function w(v) {
    return e?.getTask($(v)) || null;
  }
  function y(v) {
    return w(v)?.text || "";
  }
  function $(v) {
    const C = parseInt(v);
    return isNaN(C) ? v : C;
  }
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: s,
      onMouseMove: x,
      children: [
        u && (u.text || n) ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: o,
            style: { top: `${u.top}px`, left: `${u.left}px` },
            children: n ? /* @__PURE__ */ p(n, { data: l }) : u.text ? /* @__PURE__ */ p("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: u.text }) : null
          }
        ) : null,
        r
      ]
    }
  );
}
function yh({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Kr, { fonts: t, children: e() }) : /* @__PURE__ */ p(Kr, { fonts: t });
}
function vh({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Ur, { fonts: t, children: e }) : /* @__PURE__ */ p(Ur, { fonts: t });
}
function bh({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Qr, { fonts: t, children: e }) : /* @__PURE__ */ p(Qr, { fonts: t });
}
const Eh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContextMenu: nh,
  Editor: gh,
  Fullscreen: Bd,
  Gantt: zd,
  HeaderMenu: wh,
  Material: yh,
  Toolbar: th,
  Tooltip: xh,
  Willow: vh,
  WillowDark: bh,
  defaultColumns: ko,
  defaultEditorItems: So,
  defaultMenuOptions: ar,
  defaultTaskTypes: _o,
  defaultToolbarButtons: lr,
  registerEditorItem: qe,
  registerScaleUnit: Zl
}, Symbol.toStringTag, { value: "Module" }));
export {
  Eh as default
};
