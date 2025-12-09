import { jsxs as gt, jsx as v, Fragment as zt } from "react/jsx-runtime";
import { createContext as Se, useMemo as z, useState as ft, useContext as kt, useRef as rt, useCallback as I, useEffect as nt, Fragment as Ce, forwardRef as xe, useImperativeHandle as ge } from "react";
import { context as St, Locale as ye, Field as Le, Combo as Ye, DatePicker as Ne, TimePicker as Re, RichSelect as Ee, TwoState as je, Slider as He, Counter as Oe, Material as re, Willow as se, WillowDark as oe } from "@svar-ui/react-core";
import { en as Qt } from "@svar-ui/gantt-locales";
import { EventBusRouter as Ae } from "@svar-ui/lib-state";
import { normalizeDates as $e, grid as Ie, DataStore as We, defaultTaskTypes as Ge, defaultColumns as ze, defaultToolbarButtons as ie, handleAction as ve, isHandledAction as be, defaultMenuOptions as ce, defaultEditorItems as Fe } from "@svar-ui/gantt-store";
import { defaultColumns as hr, defaultEditorItems as mr, defaultMenuOptions as pr, defaultTaskTypes as wr, defaultToolbarButtons as xr, registerScaleUnit as gr } from "@svar-ui/gantt-store";
import { useWritableProp as Ft, useStore as tt, useStoreWithCounter as te, writable as Pe, useStoreLater as Ot } from "@svar-ui/lib-react";
import { hotkeys as ke } from "@svar-ui/grid-store";
import { locate as At, locateID as Xt, locateAttr as Ke, locale as ee, dateToString as Ve } from "@svar-ui/lib-dom";
import { Grid as Be, HeaderMenu as qe } from "@svar-ui/react-grid";
import { Toolbar as ae } from "@svar-ui/react-toolbar";
import { ContextMenu as Ue } from "@svar-ui/react-menu";
import { en as Me } from "@svar-ui/core-locales";
import { Editor as Xe, registerEditorItem as Wt } from "@svar-ui/react-editor";
import { registerEditorItem as $r } from "@svar-ui/react-editor";
const Ct = Se(null);
function Gt(n) {
  const r = n.getAttribute("data-id"), e = parseInt(r);
  return isNaN(e) || e.toString() != r ? r : e;
}
function Je(n, r, e) {
  const t = n.getBoundingClientRect(), l = r.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: t.top - l.top,
    left: t.left - l.left,
    dt: t.bottom - e.clientY,
    db: e.clientY - t.top
  };
}
function le(n) {
  return n && n.getAttribute("data-context-id");
}
const ue = 5;
function Qe(n, r) {
  let e, t, l, h, a, s, c, b, $;
  function T(M) {
    h = M.clientX, a = M.clientY, s = {
      ...Je(e, n, M),
      y: r.getTask(l).$y
    }, document.body.style.userSelect = "none";
  }
  function S(M) {
    e = At(M), le(e) && (l = Gt(e), $ = setTimeout(() => {
      b = !0, r && r.touchStart && r.touchStart(), T(M.touches[0]);
    }, 500), n.addEventListener("touchmove", U), n.addEventListener("contextmenu", x), window.addEventListener("touchend", V));
  }
  function x(M) {
    if (b || $)
      return M.preventDefault(), !1;
  }
  function N(M) {
    M.which === 1 && (e = At(M), le(e) && (l = Gt(e), n.addEventListener("mousemove", W), window.addEventListener("mouseup", D), T(M)));
  }
  function R(M) {
    n.removeEventListener("mousemove", W), n.removeEventListener("touchmove", U), document.body.removeEventListener("mouseup", D), document.body.removeEventListener("touchend", V), document.body.style.userSelect = "", M && (n.removeEventListener("mousedown", N), n.removeEventListener("touchstart", S));
  }
  function F(M) {
    const q = M.clientX - h, P = M.clientY - a;
    if (!t) {
      if (Math.abs(q) < ue && Math.abs(P) < ue || r && r.start && r.start({ id: l, e: M }) === !1)
        return;
      t = e.cloneNode(!0), t.style.pointerEvents = "none", t.classList.add("wx-reorder-task"), t.style.position = "absolute", t.style.left = s.left + "px", t.style.top = s.top + "px", e.style.visibility = "hidden", e.parentNode.insertBefore(t, e);
    }
    if (t) {
      const g = Math.round(Math.max(0, s.top + P));
      if (r && r.move && r.move({ id: l, top: g, detail: c }) === !1)
        return;
      const y = r.getTask(l), w = y.$y;
      if (!s.start && s.y == w) return H();
      s.start = !0, s.y = y.$y - 4, t.style.top = g + "px";
      const _ = document.elementFromPoint(
        M.clientX,
        M.clientY
      ), k = At(_);
      if (k && k !== e) {
        const d = Gt(k), i = k.getBoundingClientRect(), f = i.top + i.height / 2, o = M.clientY + s.db > f && k.nextElementSibling !== e, u = M.clientY - s.dt < f && k.previousElementSibling !== e;
        c?.after == d || c?.before == d ? c = null : o ? c = { id: l, after: d } : u && (c = { id: l, before: d });
      }
    }
  }
  function W(M) {
    F(M);
  }
  function U(M) {
    b ? (M.preventDefault(), F(M.touches[0])) : $ && (clearTimeout($), $ = null);
  }
  function V() {
    b = null, $ && (clearTimeout($), $ = null), H();
  }
  function D() {
    H();
  }
  function H() {
    e && (e.style.visibility = ""), t && (t.parentNode.removeChild(t), r && r.end && r.end({ id: l, top: s.top })), l = e = t = s = c = null, R();
  }
  return n.style.position !== "absolute" && (n.style.position = "relative"), n.addEventListener("mousedown", N), n.addEventListener("touchstart", S), {
    destroy() {
      R(!0);
    }
  };
}
function Ze({ row: n, column: r }) {
  function e(l, h) {
    return {
      justifyContent: h.align,
      paddingLeft: `${(l.$level - 1) * 20}px`
    };
  }
  const t = r && r._cell;
  return /* @__PURE__ */ gt("div", { className: "wx-pqc08MHU wx-content", style: e(n, r), children: [
    n.data || n.lazy ? /* @__PURE__ */ v(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${n.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ v("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ v("div", { className: "wx-pqc08MHU wx-text", children: t ? /* @__PURE__ */ v(t, { row: n, column: r }) : n.text })
  ] });
}
function de({ column: n, cell: r }) {
  const e = z(() => n.id, [n?.id]);
  return r || n.id == "add-task" ? /* @__PURE__ */ v("div", { style: { textAlign: n.align }, children: /* @__PURE__ */ v(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": e
    }
  ) }) : null;
}
function tn(n) {
  const { readonly: r, compactMode: e, width: t = 0, display: l = "all", columnWidth: h = 0, onTableAPIChange: a } = n, [s, c] = Ft(h), [b, $] = ft(), T = kt(St.i18n), S = z(() => T.getGroup("gantt"), [T]), x = kt(Ct), N = tt(x, "scrollTop"), R = tt(x, "cellHeight"), F = tt(x, "_scrollTask"), W = tt(x, "_selected"), U = tt(x, "area"), V = tt(x, "_tasks"), D = tt(x, "_scales"), H = tt(x, "columns"), M = tt(x, "_sort"), q = tt(x, "durationUnit"), P = rt(null), g = rt(!0), [y, w] = ft(null), _ = z(() => !V || !U ? [] : V.slice(U.start, U.end), [V, U]), k = I(
    (m, Y) => {
      if (Y === "add-task")
        x.exec(Y, {
          target: m,
          task: { text: S("New Task") },
          mode: "child",
          show: !0
        });
      else if (Y === "open-task") {
        const A = _.find((J) => J.id === m);
        (A?.data || A?.lazy) && x.exec(Y, { id: m, mode: !A.open });
      }
    },
    [_]
  ), d = I(
    (m) => {
      const Y = Xt(m), A = m.target.dataset.action;
      A && m.preventDefault(), Y ? A === "add-task" || A === "open-task" ? k(Y, A) : x.exec("select-task", {
        id: Y,
        toggle: m.ctrlKey || m.metaKey,
        range: m.shiftKey,
        show: !0
      }) : A === "add-task" && k(null, A);
    },
    [x, k]
  ), i = rt(null), f = rt(null), [o, u] = ft(0), [L, C] = ft(!1);
  nt(() => {
    const m = f.current;
    if (!m || typeof ResizeObserver > "u") return;
    const Y = () => u(m.clientWidth);
    Y();
    const A = new ResizeObserver(Y);
    return A.observe(m), () => A.disconnect();
  }, []);
  const O = rt(null), K = I(
    (m) => {
      const Y = m.id, { before: A, after: J } = m, dt = m.onMove;
      let ut = A || J, xt = A ? "before" : "after";
      if (dt) {
        if (xt === "after") {
          const Mt = x.getTask(ut);
          Mt.data?.length && Mt.open && (xt = "before", ut = Mt.data[0].id);
        }
        O.current = { id: Y, [xt]: ut };
      } else O.current = null;
      x.exec("move-task", {
        id: Y,
        mode: xt,
        target: ut,
        inProgress: dt
      });
    },
    [x]
  ), X = z(() => U?.from ?? 0, [U]), ct = z(() => D?.height ?? 0, [D]), E = z(() => !e && l !== "grid" ? (s ?? 0) > (t ?? 0) : (s ?? 0) > (o ?? 0), [e, l, s, t, o]), st = z(() => {
    const m = {};
    return E && l === "all" || l === "grid" && E ? m.width = s : l === "grid" && (m.width = "100%"), m;
  }, [E, l, s]), at = z(() => y && !_.find((m) => m.id === y.id) ? [..._, y] : _, [_, y]), j = z(() => {
    let m = (H || []).map((J) => {
      J = { ...J };
      const dt = J.header;
      if (typeof dt == "object") {
        const ut = dt.text && S(dt.text);
        J.header = { ...dt, text: ut };
      } else J.header = S(dt);
      return J;
    });
    const Y = m.findIndex((J) => J.id === "text"), A = m.findIndex((J) => J.id === "add-task");
    if (Y !== -1 && (m[Y].cell && (m[Y]._cell = m[Y].cell), m[Y].cell = Ze), A !== -1) {
      m[A].cell = m[A].cell || de;
      const J = m[A].header;
      if (typeof J != "object" && (m[A].header = { text: J }), m[A].header.cell = J.cell || de, r)
        m.splice(A, 1);
      else if (e) {
        const [dt] = m.splice(A, 1);
        m.unshift(dt);
      }
    }
    return m.length > 0 && (m[m.length - 1].resize = !1), m;
  }, [H, S, r, e]), B = z(() => l === "all" ? `${t}px` : l === "grid" ? "calc(100% - 4px)" : j.find((m) => m.id === "add-task") ? "50px" : "0", [l, t, j]), Q = z(() => {
    if (at && M?.length) {
      const m = {};
      return M.forEach(({ key: Y, order: A }, J) => {
        m[Y] = {
          order: A,
          ...M.length > 1 && { index: J }
        };
      }), m;
    }
    return {};
  }, [at, M]), ot = I(() => j.some((m) => m.flexgrow && !m.hidden), []), et = z(() => ot(), [ot, L]), wt = z(() => {
    let m = l === "chart" ? j.filter((A) => A.id === "add-task") : j;
    const Y = l === "all" ? t : o;
    if (!et) {
      let A = s, J = !1;
      if (j.some((dt) => dt.$width)) {
        let dt = 0;
        A = j.reduce((ut, xt) => (xt.hidden || (dt += xt.width, ut += xt.$width || xt.width), ut), 0), dt > A && A > Y && (J = !0);
      }
      if (J || A < Y) {
        let dt = 1;
        return J || (dt = (Y - 50) / (A - 50 || 1)), m.map((ut) => (ut.id !== "add-task" && !ut.hidden && (ut.$width || (ut.$width = ut.width), ut.width = ut.$width * dt), ut));
      }
    }
    return m;
  }, [l, j, et, s, t, o]), $t = I(
    (m) => {
      if (!ot()) {
        const Y = wt.reduce((A, J) => (m && J.$width && (J.$width = J.width), A + (J.hidden ? 0 : J.width)), 0);
        Y !== s && c(Y);
      }
      C(!0), C(!1);
    },
    [ot, wt, s, c]
  ), Dt = I(() => {
    j.filter((Y) => Y.flexgrow && !Y.hidden).length === 1 && j.forEach((Y) => {
      Y.$width && !Y.flexgrow && !Y.hidden && (Y.width = Y.$width);
    });
  }, []), Lt = I(
    (m) => {
      if (!r) {
        const Y = Xt(m), A = Ke(m, "data-col-id");
        !(A && j.find((dt) => dt.id == A))?.editor && Y && x.exec("show-editor", { id: Y });
      }
    },
    [x, r]
    // cols is defined later; relies on latest value at call time
  ), p = I(() => {
    g.current = !1;
  }, []), G = I(
    (m) => {
      g.current = !0, P.current = m.touches[0].clientY + (N ?? 0);
    },
    [N]
  ), it = I(
    (m) => {
      if (g.current) {
        const Y = (P.current ?? 0) - m.touches[0].clientY;
        return x.exec("scroll-chart", { top: Y }), m.preventDefault(), !1;
      }
    },
    [x]
  ), Z = z(
    () => Array.isArray(W) ? W.map((m) => m.id) : [],
    [W]
  );
  nt(() => {
    const m = () => p();
    return window.addEventListener("touchend", m), () => window.removeEventListener("touchend", m);
  }, [p]);
  const lt = I(() => {
    if (i.current && at !== null) {
      const m = i.current.querySelector(".wx-body");
      m && (m.style.top = -((N ?? 0) - (X ?? 0)) + "px");
    }
    f.current && (f.current.scrollTop = 0);
  }, [at, N, X]);
  nt(() => {
    i.current && lt();
  }, [N, X, lt]), nt(() => {
    const m = i.current;
    if (!m) return;
    const Y = m.querySelector(".wx-table-box .wx-body");
    if (!Y || typeof ResizeObserver > "u") return;
    const A = new ResizeObserver(() => {
      lt();
    });
    return A.observe(Y), () => {
      A.disconnect();
    };
  }, [wt, st, l, B, at, lt]), nt(() => {
    if (!F || !b) return;
    const { id: m } = F, Y = b.getState().focusCell;
    Y && Y.row !== m && i.current && i.current.contains(document.activeElement) && b.exec("focus-cell", {
      row: m,
      column: Y.column
    });
  }, [F, b]);
  const pt = I(
    ({ id: m }) => {
      if (r) return !1;
      x.getTask(m).open && x.exec("open-task", { id: m, mode: !1 });
      const Y = x.getState()._tasks.find((A) => A.id === m);
      if (w(Y || null), !Y) return !1;
    },
    [x, r]
  ), yt = I(
    ({ id: m, top: Y }) => {
      O.current ? K({ ...O.current, onMove: !1 }) : x.exec("drag-task", {
        id: m,
        top: Y + (X ?? 0),
        inProgress: !1
      }), w(null);
    },
    [x, K, X]
  ), vt = I(
    ({ id: m, top: Y, detail: A }) => {
      A && K({ ...A, onMove: !0 }), x.exec("drag-task", {
        id: m,
        top: Y + (X ?? 0),
        inProgress: !0
      });
    },
    [x, K, X]
  );
  nt(() => {
    const m = i.current;
    return m ? Qe(m, {
      start: pt,
      touchStart: p,
      end: yt,
      move: vt,
      getTask: x.getTask
    }).destroy : void 0;
  }, [x, pt, p, yt, vt]);
  const bt = I(
    (m) => {
      const { key: Y, isInput: A } = m;
      if (!A && (Y === "arrowup" || Y === "arrowdown"))
        return m.eventSource = "grid", x.exec("hotkey", m), !1;
      if (Y === "enter") {
        const J = b?.getState().focusCell;
        if (J) {
          const { row: dt, column: ut } = J;
          ut === "add-task" ? k(dt, "add-task") : ut === "text" && k(dt, "open-task");
        }
      }
    },
    [x, k, b]
  ), ht = rt(null), Et = () => {
    ht.current = {
      setTableAPI: $,
      handleHotkey: bt,
      sortVal: M,
      api: x,
      adjustColumns: Dt,
      setColumnWidth: $t,
      tasks: _,
      durationUnitVal: q,
      onTableAPIChange: a
    };
  };
  Et(), nt(() => {
    Et();
  }, [$, bt, M, x, Dt, $t, _, q, a]);
  const jt = I(
    (m) => {
      $(m), m.intercept("hotkey", (Y) => ht.current.handleHotkey(Y)), m.intercept("scroll", () => !1), m.intercept("select-row", () => !1), m.intercept("sort-rows", (Y) => {
        const A = ht.current.sortVal, { key: J, add: dt } = Y, ut = A ? A.find((Mt) => Mt.key === J) : null;
        let xt = "asc";
        return ut && (xt = !ut || ut.order === "asc" ? "desc" : "asc"), x.exec("sort-tasks", {
          key: J,
          order: xt,
          add: dt
        }), !1;
      }), m.on("resize-column", () => {
        ht.current.setColumnWidth(!0);
      }), m.on("hide-column", (Y) => {
        Y.mode || ht.current.adjustColumns(), ht.current.setColumnWidth();
      }), m.intercept("update-cell", (Y) => {
        const { id: A, column: J, value: dt } = Y, ut = ht.current.tasks.find((xt) => xt.id === A);
        if (ut) {
          const xt = { ...ut };
          let Mt = dt;
          Mt && !isNaN(Mt) && !(Mt instanceof Date) && (Mt *= 1), xt[J] = Mt, $e(xt, ht.current.durationUnitVal, !0, J), x.exec("update-task", {
            id: A,
            task: xt
          });
        }
        return !1;
      }), a && a(m);
    },
    []
  );
  return /* @__PURE__ */ v(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${B}` },
      ref: f,
      children: /* @__PURE__ */ v(
        "div",
        {
          ref: i,
          style: st,
          className: "wx-rHj6070p wx-table",
          onTouchStart: G,
          onTouchMove: it,
          onClick: d,
          onDoubleClick: Lt,
          children: /* @__PURE__ */ v(
            Be,
            {
              init: jt,
              sizes: {
                rowHeight: R,
                headerHeight: (ct ?? 0) - 1
              },
              rowStyle: (m) => m.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (m) => `wx-rHj6070p wx-text-${m.align}${m.id === "add-task" ? " wx-action" : ""}`,
              data: at,
              columns: wt,
              selectedRows: [...Z],
              sortMarks: Q
            }
          )
        }
      )
    }
  );
}
function en({ borders: n = "" }) {
  const r = kt(Ct), e = tt(r, "cellWidth"), t = tt(r, "cellHeight"), l = rt(null), [h, a] = ft("#e4e4e4");
  nt(() => {
    if (typeof getComputedStyle < "u" && l.current) {
      const c = getComputedStyle(l.current).getPropertyValue(
        "--wx-gantt-border"
      );
      a(c ? c.substring(c.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const s = {
    width: "100%",
    height: "100%",
    background: e != null && t != null ? `url(${Ie(e, t, h, n)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ v("div", { ref: l, style: s });
}
function nn(n) {
  const { readonly: r, taskTemplate: e } = n, t = kt(Ct), [l, h] = te(t, "_tasks"), [a, s] = te(t, "_links"), c = tt(t, "area"), b = tt(t, "_scales"), $ = tt(t, "taskTypes"), T = tt(t, "baselines"), S = tt(t, "_selected"), x = tt(t, "_scrollTask"), N = z(() => {
    if (!c || !Array.isArray(l)) return [];
    const p = c.start ?? 0, G = c.end ?? 0;
    return l.slice(p, G).map((it) => ({ ...it }));
  }, [h, c]), R = z(
    () => b.lengthUnitWidth,
    [b]
  ), F = rt(!1), [W, U] = ft(void 0), [V, D] = ft(null), H = rt(null), [M, q] = ft(void 0), P = rt(null), [g, y] = ft(0), w = rt(null), _ = z(() => {
    const p = w.current;
    return !!(S.length && p && p.contains(document.activeElement));
  }, [S, w.current]), k = z(() => _ && S[S.length - 1]?.id, [_, S]);
  nt(() => {
    if (x && _ && x) {
      const { id: p } = x, G = w.current?.querySelector(
        `.wx-bar[data-id='${p}']`
      );
      G && G.focus({ preventScroll: !0 });
    }
  }, [x]), nt(() => {
    const p = w.current;
    if (p && (y(p.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const G = new ResizeObserver((it) => {
        it[0] && y(it[0].contentRect.width);
      });
      return G.observe(p), () => G.disconnect();
    }
  }, [w.current]);
  const d = I(() => {
    document.body.style.userSelect = "none";
  }, []), i = I(() => {
    document.body.style.userSelect = "";
  }, []), f = I(
    (p, G, it) => {
      if (it || (it = t.getTask(Gt(p))), it.type === "milestone" || it.type == "summary") return "";
      const Z = p.getBoundingClientRect(), lt = (G.clientX - Z.left) / Z.width;
      let pt = 0.2 / (Z.width > 200 ? Z.width / 200 : 1);
      return lt < pt ? "start" : lt > 1 - pt ? "end" : "";
    },
    [t]
  ), o = I(
    (p, G) => {
      const { clientX: it } = G, Z = Gt(p), lt = t.getTask(Z), pt = G.target.classList;
      if (!r) {
        if (pt.contains("wx-progress-marker")) {
          const { progress: yt } = t.getTask(Z);
          H.current = {
            id: Z,
            x: it,
            progress: yt,
            dx: 0,
            node: p,
            marker: G.target
          }, G.target.classList.add("wx-progress-in-drag");
        } else {
          const yt = f(p, G, lt) || "move";
          D({
            id: Z,
            mode: yt,
            x: it,
            dx: 0,
            l: lt.$x,
            w: lt.$w
          });
        }
        d();
      }
    },
    [t, r, f, d]
  ), u = I(
    (p) => {
      if (p.button !== 0) return;
      const G = At(p);
      G && o(G, p);
    },
    [r, R, g, V, W]
  ), L = I(
    (p) => {
      const G = At(p);
      G && (P.current = setTimeout(() => {
        q(!0), o(G, p.touches[0]);
      }, 300));
    },
    [r]
  ), C = I(() => {
    if (H.current) {
      const { dx: p, id: G, marker: it, value: Z } = H.current;
      H.current = null, typeof Z < "u" && p && t.exec("update-task", { id: G, task: { progress: Z } }), it.classList.remove("wx-progress-in-drag"), F.current = !0, i();
    } else if (V) {
      const { id: p, mode: G, dx: it, l: Z, w: lt, start: pt } = V;
      if (D(null), pt) {
        const yt = Math.round(it / R);
        if (!yt)
          t.exec("drag-task", {
            id: p,
            width: lt,
            left: Z,
            inProgress: !1
          });
        else {
          let vt = {}, bt = t.getTask(p);
          G == "move" ? (vt.start = bt.start, vt.end = bt.end) : vt[G] = bt[G], t.exec("update-task", {
            id: p,
            task: vt,
            diff: yt
          });
        }
        F.current = !0;
      }
      i();
    }
  }, [t, i, V, R]), O = I(
    (p, G) => {
      const { clientX: it } = G;
      if (!r)
        if (H.current) {
          const { node: Z, x: lt, id: pt } = H.current, yt = H.current.dx = it - lt, vt = Math.round(yt / Z.offsetWidth * 100);
          let bt = H.current.progress + vt;
          H.current.value = bt = Math.min(
            Math.max(0, bt),
            100
          ), t.exec("update-task", {
            id: pt,
            task: { progress: bt },
            inProgress: !0
          });
        } else if (V) {
          const { mode: Z, l: lt, w: pt, x: yt, id: vt, start: bt } = V, ht = it - yt;
          if (!bt && Math.abs(ht) < 20 || Z === "start" && pt - ht < R || Z === "end" && pt + ht < R || Z == "move" && (ht < 0 && lt + ht < 0 || ht > 0 && lt + pt + ht > g))
            return;
          const Et = { ...V, dx: ht };
          let jt, m;
          Z === "start" ? (jt = lt + ht, m = pt - ht) : Z === "end" ? (jt = lt, m = pt + ht) : Z === "move" && (jt = lt + ht, m = pt);
          let Y = {
            id: vt,
            width: m,
            left: jt,
            inProgress: !0
          };
          t.exec("drag-task", Y);
          const A = t.getTask(vt);
          if (!Et.start && (Z == "move" && A.$x == lt || Z != "move" && A.$w == pt)) {
            F.current = !0, C();
            return;
          }
          Et.start = !0, D(Et);
        } else {
          const Z = At(p);
          if (Z) {
            const lt = f(Z, G);
            Z.style.cursor = lt && !r ? "col-resize" : "pointer";
          }
        }
    },
    [t, r, V, R, g, f]
  ), K = I(
    (p) => {
      O(p, p);
    },
    [O]
  ), X = I(
    (p) => {
      M ? (p.preventDefault(), O(p, p.touches[0])) : P.current && (clearTimeout(P.current), P.current = null);
    },
    [M, O]
  ), ct = I(() => {
    C();
  }, [C]), E = I(() => {
    q(null), P.current && (clearTimeout(P.current), P.current = null), C();
  }, [C]);
  nt(() => (window.addEventListener("mouseup", ct), () => {
    window.removeEventListener("mouseup", ct);
  }), [ct]);
  const st = I(
    (p) => {
      if (!r) {
        const G = Xt(p.target);
        G && !p.target.classList.contains("wx-link") && t.exec("show-editor", { id: G });
      }
    },
    [t, r]
  ), at = ["e2s", "s2s", "e2e", "s2e"], j = I(
    (p, G) => at[(p ? 1 : 0) + (G ? 0 : 2)],
    []
  ), B = I(
    (p, G) => {
      const it = W.id, Z = W.start;
      return p === it ? !0 : !!a.find((lt) => lt.target == p && lt.source == it && lt.type === j(Z, G));
    },
    [W, s, j]
  ), Q = I(() => {
    W && U(null);
  }, [W]), ot = I(
    (p) => {
      if (F.current) {
        F.current = !1;
        return;
      }
      const G = Xt(p.target);
      if (G) {
        const it = p.target.classList;
        if (it.contains("wx-link")) {
          const Z = it.contains("wx-left");
          if (!W) {
            U({ id: G, start: Z });
            return;
          }
          W.id !== G && !B(G, Z) && t.exec("add-link", {
            link: {
              source: W.id,
              target: G,
              type: j(W.start, Z)
            }
          });
        } else
          t.exec("select-task", {
            id: G,
            toggle: p.ctrlKey || p.metaKey,
            range: p.shiftKey
          });
      }
      Q();
    },
    [t, W, s]
  ), et = I((p) => ({
    left: `${p.$x}px`,
    top: `${p.$y}px`,
    width: `${p.$w}px`,
    height: `${p.$h}px`
  }), []), wt = I((p) => ({
    left: `${p.$x_base}px`,
    top: `${p.$y_base}px`,
    width: `${p.$w_base}px`,
    height: `${p.$h_base}px`
  }), []), $t = I(
    (p) => {
      if (M || P.current)
        return p.preventDefault(), !1;
    },
    [M]
  ), Dt = I(
    (p) => {
      let G = $.some((it) => p === it.id) ? p : "task";
      return G !== "task" && G !== "milestone" && G !== "summary" && (G = `task ${G}`), G;
    },
    [$]
  ), Lt = I(
    (p) => {
      t.exec(p.action, p.data);
    },
    [t]
  );
  return /* @__PURE__ */ v(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${N.length ? N[0].$h : 0}px` },
      ref: w,
      onContextMenu: $t,
      onMouseDown: u,
      onMouseMove: K,
      onTouchStart: L,
      onTouchMove: X,
      onTouchEnd: E,
      onClick: ot,
      onDoubleClick: st,
      onDragStart: (p) => (p.preventDefault(), !1),
      children: N.map((p) => {
        if (p.$skip && p.$skip_baseline) return null;
        const G = `wx-bar wx-${Dt(p.type)}` + (M && V && p.id === V.id ? " wx-touch" : "") + (W && W.id === p.id ? " wx-selected" : "") + (p.$reorder ? " wx-reorder-task" : ""), it = "wx-link wx-left" + (W ? " wx-visible" : "") + (!W || !B(p.id, !0) ? " wx-target" : "") + (W && W.id === p.id && W.start ? " wx-selected" : ""), Z = "wx-link wx-right" + (W ? " wx-visible" : "") + (!W || !B(p.id, !1) ? " wx-target" : "") + (W && W.id === p.id && !W.start ? " wx-selected" : "");
        return /* @__PURE__ */ gt(Ce, { children: [
          !p.$skip && /* @__PURE__ */ gt(
            "div",
            {
              className: "wx-GKbcLEGA " + G,
              style: et(p),
              "data-tooltip-id": p.id,
              "data-id": p.id,
              tabIndex: k === p.id ? 0 : -1,
              children: [
                r ? null : /* @__PURE__ */ v("div", { className: "wx-GKbcLEGA " + it, children: /* @__PURE__ */ v("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                p.type !== "milestone" ? /* @__PURE__ */ gt(zt, { children: [
                  p.progress ? /* @__PURE__ */ v("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ v(
                    "div",
                    {
                      className: "wx-GKbcLEGA wx-progress-percent",
                      style: { width: `${p.progress}%` }
                    }
                  ) }) : null,
                  r ? null : /* @__PURE__ */ v(
                    "div",
                    {
                      className: "wx-GKbcLEGA wx-progress-marker",
                      style: { left: `calc(${p.progress}% - 10px)` },
                      children: p.progress
                    }
                  ),
                  e ? /* @__PURE__ */ v(e, { data: p, api: t, onAction: Lt }) : /* @__PURE__ */ v("div", { className: "wx-GKbcLEGA wx-content", children: p.text || "" })
                ] }) : /* @__PURE__ */ gt(zt, { children: [
                  /* @__PURE__ */ v("div", { className: "wx-GKbcLEGA wx-content" }),
                  e ? /* @__PURE__ */ v(e, { data: p, api: t, onAction: Lt }) : /* @__PURE__ */ v("div", { className: "wx-GKbcLEGA wx-text-out", children: p.text })
                ] }),
                r ? null : /* @__PURE__ */ v("div", { className: "wx-GKbcLEGA " + Z, children: /* @__PURE__ */ v("div", { className: "wx-GKbcLEGA wx-inner" }) })
              ]
            }
          ),
          T && !p.$skip_baseline ? /* @__PURE__ */ v(
            "div",
            {
              className: "wx-GKbcLEGA wx-baseline" + (p.type === "milestone" ? " wx-milestone" : ""),
              style: wt(p)
            }
          ) : null
        ] }, p.id);
      })
    }
  );
}
function rn() {
  const n = kt(Ct), r = tt(n, "_links");
  return /* @__PURE__ */ v("svg", { className: "wx-dkx3NwEn wx-links", children: (r || []).map((e) => /* @__PURE__ */ v(
    "polyline",
    {
      className: "wx-dkx3NwEn wx-line",
      points: e.$p
    },
    e.id
  )) });
}
function ne(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Bt = { exports: {} }, sn = Bt.exports, fe;
function Te() {
  return fe || (fe = 1, (function(n, r) {
    (function(e, t) {
      n.exports = t();
    })(sn, (function() {
      var e = 1e3, t = 6e4, l = 36e5, h = "millisecond", a = "second", s = "minute", c = "hour", b = "day", $ = "week", T = "month", S = "quarter", x = "year", N = "date", R = "Invalid Date", F = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, W = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, U = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(d) {
        var i = ["th", "st", "nd", "rd"], f = d % 100;
        return "[" + d + (i[(f - 20) % 10] || i[f] || i[0]) + "]";
      } }, V = function(d, i, f) {
        var o = String(d);
        return !o || o.length >= i ? d : "" + Array(i + 1 - o.length).join(f) + d;
      }, D = { s: V, z: function(d) {
        var i = -d.utcOffset(), f = Math.abs(i), o = Math.floor(f / 60), u = f % 60;
        return (i <= 0 ? "+" : "-") + V(o, 2, "0") + ":" + V(u, 2, "0");
      }, m: function d(i, f) {
        if (i.date() < f.date()) return -d(f, i);
        var o = 12 * (f.year() - i.year()) + (f.month() - i.month()), u = i.clone().add(o, T), L = f - u < 0, C = i.clone().add(o + (L ? -1 : 1), T);
        return +(-(o + (f - u) / (L ? u - C : C - u)) || 0);
      }, a: function(d) {
        return d < 0 ? Math.ceil(d) || 0 : Math.floor(d);
      }, p: function(d) {
        return { M: T, y: x, w: $, d: b, D: N, h: c, m: s, s: a, ms: h, Q: S }[d] || String(d || "").toLowerCase().replace(/s$/, "");
      }, u: function(d) {
        return d === void 0;
      } }, H = "en", M = {};
      M[H] = U;
      var q = "$isDayjsObject", P = function(d) {
        return d instanceof _ || !(!d || !d[q]);
      }, g = function d(i, f, o) {
        var u;
        if (!i) return H;
        if (typeof i == "string") {
          var L = i.toLowerCase();
          M[L] && (u = L), f && (M[L] = f, u = L);
          var C = i.split("-");
          if (!u && C.length > 1) return d(C[0]);
        } else {
          var O = i.name;
          M[O] = i, u = O;
        }
        return !o && u && (H = u), u || !o && H;
      }, y = function(d, i) {
        if (P(d)) return d.clone();
        var f = typeof i == "object" ? i : {};
        return f.date = d, f.args = arguments, new _(f);
      }, w = D;
      w.l = g, w.i = P, w.w = function(d, i) {
        return y(d, { locale: i.$L, utc: i.$u, x: i.$x, $offset: i.$offset });
      };
      var _ = (function() {
        function d(f) {
          this.$L = g(f.locale, null, !0), this.parse(f), this.$x = this.$x || f.x || {}, this[q] = !0;
        }
        var i = d.prototype;
        return i.parse = function(f) {
          this.$d = (function(o) {
            var u = o.date, L = o.utc;
            if (u === null) return /* @__PURE__ */ new Date(NaN);
            if (w.u(u)) return /* @__PURE__ */ new Date();
            if (u instanceof Date) return new Date(u);
            if (typeof u == "string" && !/Z$/i.test(u)) {
              var C = u.match(F);
              if (C) {
                var O = C[2] - 1 || 0, K = (C[7] || "0").substring(0, 3);
                return L ? new Date(Date.UTC(C[1], O, C[3] || 1, C[4] || 0, C[5] || 0, C[6] || 0, K)) : new Date(C[1], O, C[3] || 1, C[4] || 0, C[5] || 0, C[6] || 0, K);
              }
            }
            return new Date(u);
          })(f), this.init();
        }, i.init = function() {
          var f = this.$d;
          this.$y = f.getFullYear(), this.$M = f.getMonth(), this.$D = f.getDate(), this.$W = f.getDay(), this.$H = f.getHours(), this.$m = f.getMinutes(), this.$s = f.getSeconds(), this.$ms = f.getMilliseconds();
        }, i.$utils = function() {
          return w;
        }, i.isValid = function() {
          return this.$d.toString() !== R;
        }, i.isSame = function(f, o) {
          var u = y(f);
          return this.startOf(o) <= u && u <= this.endOf(o);
        }, i.isAfter = function(f, o) {
          return y(f) < this.startOf(o);
        }, i.isBefore = function(f, o) {
          return this.endOf(o) < y(f);
        }, i.$g = function(f, o, u) {
          return w.u(f) ? this[o] : this.set(u, f);
        }, i.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, i.valueOf = function() {
          return this.$d.getTime();
        }, i.startOf = function(f, o) {
          var u = this, L = !!w.u(o) || o, C = w.p(f), O = function(B, Q) {
            var ot = w.w(u.$u ? Date.UTC(u.$y, Q, B) : new Date(u.$y, Q, B), u);
            return L ? ot : ot.endOf(b);
          }, K = function(B, Q) {
            return w.w(u.toDate()[B].apply(u.toDate("s"), (L ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Q)), u);
          }, X = this.$W, ct = this.$M, E = this.$D, st = "set" + (this.$u ? "UTC" : "");
          switch (C) {
            case x:
              return L ? O(1, 0) : O(31, 11);
            case T:
              return L ? O(1, ct) : O(0, ct + 1);
            case $:
              var at = this.$locale().weekStart || 0, j = (X < at ? X + 7 : X) - at;
              return O(L ? E - j : E + (6 - j), ct);
            case b:
            case N:
              return K(st + "Hours", 0);
            case c:
              return K(st + "Minutes", 1);
            case s:
              return K(st + "Seconds", 2);
            case a:
              return K(st + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, i.endOf = function(f) {
          return this.startOf(f, !1);
        }, i.$set = function(f, o) {
          var u, L = w.p(f), C = "set" + (this.$u ? "UTC" : ""), O = (u = {}, u[b] = C + "Date", u[N] = C + "Date", u[T] = C + "Month", u[x] = C + "FullYear", u[c] = C + "Hours", u[s] = C + "Minutes", u[a] = C + "Seconds", u[h] = C + "Milliseconds", u)[L], K = L === b ? this.$D + (o - this.$W) : o;
          if (L === T || L === x) {
            var X = this.clone().set(N, 1);
            X.$d[O](K), X.init(), this.$d = X.set(N, Math.min(this.$D, X.daysInMonth())).$d;
          } else O && this.$d[O](K);
          return this.init(), this;
        }, i.set = function(f, o) {
          return this.clone().$set(f, o);
        }, i.get = function(f) {
          return this[w.p(f)]();
        }, i.add = function(f, o) {
          var u, L = this;
          f = Number(f);
          var C = w.p(o), O = function(ct) {
            var E = y(L);
            return w.w(E.date(E.date() + Math.round(ct * f)), L);
          };
          if (C === T) return this.set(T, this.$M + f);
          if (C === x) return this.set(x, this.$y + f);
          if (C === b) return O(1);
          if (C === $) return O(7);
          var K = (u = {}, u[s] = t, u[c] = l, u[a] = e, u)[C] || 1, X = this.$d.getTime() + f * K;
          return w.w(X, this);
        }, i.subtract = function(f, o) {
          return this.add(-1 * f, o);
        }, i.format = function(f) {
          var o = this, u = this.$locale();
          if (!this.isValid()) return u.invalidDate || R;
          var L = f || "YYYY-MM-DDTHH:mm:ssZ", C = w.z(this), O = this.$H, K = this.$m, X = this.$M, ct = u.weekdays, E = u.months, st = u.meridiem, at = function(Q, ot, et, wt) {
            return Q && (Q[ot] || Q(o, L)) || et[ot].slice(0, wt);
          }, j = function(Q) {
            return w.s(O % 12 || 12, Q, "0");
          }, B = st || function(Q, ot, et) {
            var wt = Q < 12 ? "AM" : "PM";
            return et ? wt.toLowerCase() : wt;
          };
          return L.replace(W, (function(Q, ot) {
            return ot || (function(et) {
              switch (et) {
                case "YY":
                  return String(o.$y).slice(-2);
                case "YYYY":
                  return w.s(o.$y, 4, "0");
                case "M":
                  return X + 1;
                case "MM":
                  return w.s(X + 1, 2, "0");
                case "MMM":
                  return at(u.monthsShort, X, E, 3);
                case "MMMM":
                  return at(E, X);
                case "D":
                  return o.$D;
                case "DD":
                  return w.s(o.$D, 2, "0");
                case "d":
                  return String(o.$W);
                case "dd":
                  return at(u.weekdaysMin, o.$W, ct, 2);
                case "ddd":
                  return at(u.weekdaysShort, o.$W, ct, 3);
                case "dddd":
                  return ct[o.$W];
                case "H":
                  return String(O);
                case "HH":
                  return w.s(O, 2, "0");
                case "h":
                  return j(1);
                case "hh":
                  return j(2);
                case "a":
                  return B(O, K, !0);
                case "A":
                  return B(O, K, !1);
                case "m":
                  return String(K);
                case "mm":
                  return w.s(K, 2, "0");
                case "s":
                  return String(o.$s);
                case "ss":
                  return w.s(o.$s, 2, "0");
                case "SSS":
                  return w.s(o.$ms, 3, "0");
                case "Z":
                  return C;
              }
              return null;
            })(Q) || C.replace(":", "");
          }));
        }, i.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, i.diff = function(f, o, u) {
          var L, C = this, O = w.p(o), K = y(f), X = (K.utcOffset() - this.utcOffset()) * t, ct = this - K, E = function() {
            return w.m(C, K);
          };
          switch (O) {
            case x:
              L = E() / 12;
              break;
            case T:
              L = E();
              break;
            case S:
              L = E() / 3;
              break;
            case $:
              L = (ct - X) / 6048e5;
              break;
            case b:
              L = (ct - X) / 864e5;
              break;
            case c:
              L = ct / l;
              break;
            case s:
              L = ct / t;
              break;
            case a:
              L = ct / e;
              break;
            default:
              L = ct;
          }
          return u ? L : w.a(L);
        }, i.daysInMonth = function() {
          return this.endOf(T).$D;
        }, i.$locale = function() {
          return M[this.$L];
        }, i.locale = function(f, o) {
          if (!f) return this.$L;
          var u = this.clone(), L = g(f, o, !0);
          return L && (u.$L = L), u;
        }, i.clone = function() {
          return w.w(this.$d, this);
        }, i.toDate = function() {
          return new Date(this.valueOf());
        }, i.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, i.toISOString = function() {
          return this.$d.toISOString();
        }, i.toString = function() {
          return this.$d.toUTCString();
        }, d;
      })(), k = _.prototype;
      return y.prototype = k, [["$ms", h], ["$s", a], ["$m", s], ["$H", c], ["$W", b], ["$M", T], ["$y", x], ["$D", N]].forEach((function(d) {
        k[d[1]] = function(i) {
          return this.$g(i, d[0], d[1]);
        };
      })), y.extend = function(d, i) {
        return d.$i || (d(i, _, y), d.$i = !0), y;
      }, y.locale = g, y.isDayjs = P, y.unix = function(d) {
        return y(1e3 * d);
      }, y.en = M[H], y.Ls = M, y.p = {}, y;
    }));
  })(Bt)), Bt.exports;
}
var on = Te();
const Tt = /* @__PURE__ */ ne(on);
var qt = { exports: {} }, cn = qt.exports, he;
function an() {
  return he || (he = 1, (function(n, r) {
    (function(e, t) {
      n.exports = t(Te());
    })(cn, (function(e) {
      function t(a) {
        return a && typeof a == "object" && "default" in a ? a : { default: a };
      }
      var l = t(e), h = { name: "fa", weekdays: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysShort: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"), weekStart: 6, months: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), monthsShort: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), ordinal: function(a) {
        return a;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "در %s", past: "%s پیش", s: "چند ثانیه", m: "یک دقیقه", mm: "%d دقیقه", h: "یک ساعت", hh: "%d ساعت", d: "یک روز", dd: "%d روز", M: "یک ماه", MM: "%d ماه", y: "یک سال", yy: "%d سال" } };
      return l.default.locale(h, null, !0), h;
    }));
  })(qt)), qt.exports;
}
var ln = an();
const un = /* @__PURE__ */ ne(ln);
function dn(n, r, e) {
  let t = mt((n + mt(r - 8, 6) + 100100) * 1461, 4) + mt(153 * Rt(r + 9, 12) + 2, 5) + e - 34840408;
  return t = t - mt(mt(n + 100100 + mt(r - 8, 6), 100) * 3, 4) + 752, t;
}
const Pt = [
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
], _t = Math.floor;
function Rt(n, r) {
  return n - ~~(n / r) * r;
}
function mt(n, r) {
  return ~~(n / r);
}
function fn(n, r) {
  const e = Pt.length, t = n + 621;
  let l = -14, h = Pt[0], a, s, c;
  if (n < h || n >= Pt[e - 1]) throw new Error(`Invalid Jalaali year ${n}`);
  for (let T = 1; T < e && (a = Pt[T], s = a - h, !(n < a)); T += 1)
    l = l + mt(s, 33) * 8 + mt(Rt(s, 33), 4), h = a;
  c = n - h, l = l + mt(c, 33) * 8 + mt(Rt(c, 33) + 3, 4), Rt(s, 33) === 4 && s - c === 4 && (l += 1);
  const b = mt(t, 4) - mt((mt(t, 100) + 1) * 3, 4) - 150, $ = 20 + l - b;
  return {
    gy: t,
    march: $
  };
}
function hn(n, r, e) {
  const t = fn(n);
  return dn(t.gy, 3, t.march) + (r - 1) * 31 - mt(r, 7) * (r - 7) + e - 1;
}
function mn(n) {
  let r = 4 * n + 139361631;
  r = r + mt(mt(4 * n + 183187720, 146097) * 3, 4) * 4 - 3908;
  const e = mt(Rt(r, 1461), 4) * 5 + 308, t = mt(Rt(e, 153), 5) + 1, l = Rt(mt(e, 153), 12) + 1;
  return [
    mt(r, 1461) - 100100 + mt(8 - l, 6),
    l,
    t
  ];
}
function pn(n, r, e) {
  return mn(hn(n, r, e));
}
function wn(n, r, e) {
  const t = {
    year: n,
    month: r,
    day: e
  }, l = [
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
  let h;
  n <= 1600 ? (n -= 621, t.year = 0) : (n -= 1600, t.year = 979);
  const a = n > 2 ? n + 1 : n;
  return h = _t((a + 3) / 4) + 365 * n - _t((a + 99) / 100) - 80 + l[r - 1] + _t((a + 399) / 400) + e, t.year += 33 * _t(h / 12053), h %= 12053, t.year += 4 * _t(h / 1461), h %= 1461, h > 365 && (t.year += _t((h - 1) / 365), h = (h - 1) % 365), t.month = h < 186 ? 1 + _t(h / 31) : 7 + _t((h - 186) / 30), t.day = 1 + (h < 186 ? h % 31 : (h - 186) % 30), [
    t.year,
    t.month,
    t.day
  ];
}
var Kt = {
  J: (n, r, e) => wn(n, r, e),
  G: (n, r, e) => pn(n, r, e)
};
const xn = /^(\d{4})[-/]?(\d{1,2})[-/]?(\d{0,2})(.*)$/, gn = /\[.*?\]|jY{2,4}|jM{1,4}|jD{1,2}|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Zt = "date", Ht = "day", Yt = "month", Nt = "year", me = "week", yn = "YYYY-MM-DDTHH:mm:ssZ", $n = { jmonths: "فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند".split("_") }, vn = (n, r, e) => {
  const t = r.prototype, l = t.$utils(), h = (g) => g.$C === "jalali", a = l.prettyUnit || l.p, s = l.isUndefined || l.u, c = l.padStart || l.s, b = l.monthDiff || l.m, $ = l.absFloor || l.a, T = (g) => function(...y) {
    const w = g.bind(this)(...y);
    return w.$C = this.$C, w.isJalali() && w.InitJalali(), w;
  };
  t.startOf = T(t.startOf), t.endOf = T(t.endOf), t.add = T(t.add), t.subtract = T(t.subtract), t.set = T(t.set);
  const S = t.parse, x = t.init, N = t.startOf, R = t.$set, F = t.add, W = t.format, U = t.diff, V = t.year, D = t.month, H = t.date, M = t.daysInMonth, q = t.toArray;
  e.$C = "gregory", e.$fdow = 6, e.calendar = function(g) {
    return e.$C = g, e;
  }, t.calendar = function(g) {
    const y = this.clone();
    return y.$C = g, y.isJalali() && y.InitJalali(), y;
  }, t.isJalali = function() {
    return h(this);
  }, e.en.jmonths = "Farvardin_Ordibehesht_Khordaad_Tir_Mordaad_Shahrivar_Mehr_Aabaan_Aazar_Dey_Bahman_Esfand".split("_"), e.locale("fa", {
    ...un,
    ...$n
  }, !0);
  const P = function(g, y) {
    return e(g, {
      locale: y.$L,
      utc: y.$u,
      calendar: y.$C
    });
  };
  t.init = function(g = {}) {
    x.bind(this)(g), this.isJalali() && this.InitJalali();
  }, t.parse = function(g) {
    if (this.$C = g.calendar || this.$C || e.$C, g.jalali && typeof g.date == "string" && /.*[^Z]$/i.test(g.date)) {
      const y = g.date.match(xn);
      if (y) {
        const [w, _, k] = Kt.G(Number.parseInt(y[1], 10), Number.parseInt(y[2], 10), Number.parseInt(y[3] || 1, 10));
        g.date = `${w}-${_}-${k}${y[4] || ""}`;
      }
    }
    return S.bind(this)(g);
  }, t.InitJalali = function() {
    const [g, y, w] = Kt.J(this.$y, this.$M + 1, this.$D);
    this.$jy = g, this.$jM = y - 1, this.$jD = w;
  }, t.startOf = function(g, y) {
    if (!h(this)) return N.bind(this)(g, y);
    const w = s(y) ? !0 : y, _ = a(g), k = (i, f, o = this.$jy) => {
      const [u, L, C] = Kt.G(o, f + 1, i), O = P(new Date(u, L - 1, C), this);
      return (w ? O : O.endOf(Ht)).$set("hour", 1);
    }, d = (this.$W + (7 - e.$fdow)) % 7;
    switch (_) {
      case Nt:
        return w ? k(1, 0) : k(0, 0, this.$jy + 1);
      case Yt:
        return w ? k(1, this.$jM) : k(0, (this.$jM + 1) % 12, this.$jy + Math.floor((this.$jM + 1) / 12));
      case me:
        return w ? k(this.$jD - d, this.$jM) : k(this.$jD + (6 - d), this.$jM);
      default:
        return N.bind(this)(g, y);
    }
  }, t.$set = function(g, y) {
    if (!h(this)) return R.bind(this)(g, y);
    const w = a(g), _ = (k, d, i = this.$jy) => {
      const [f, o, u] = Kt.G(i, d + 1, k);
      return this.$d.setFullYear(f), this.$d.setMonth(o - 1), this.$d.setDate(u), this;
    };
    switch (w) {
      case Zt:
      case Ht:
        _(y, this.$jM);
        break;
      case Yt:
        _(this.$jD, y);
        break;
      case Nt:
        _(this.$jD, this.$jM, y);
        break;
      default:
        return R.bind(this)(g, y);
    }
    return this.init(), this;
  }, t.add = function(g, y) {
    if (!h(this)) return F.bind(this)(g, y);
    g = Number(g);
    const w = y && (y.length === 1 || y === "ms") ? y : a(y), _ = (k, d) => {
      const i = this.set(Zt, 1).set(k, d + g);
      return i.set(Zt, Math.min(this.$jD, i.daysInMonth()));
    };
    if (["M", Yt].includes(w)) {
      const k = this.$jM + g, d = k < 0 ? -Math.ceil(-k / 12) : Math.floor(k / 12), i = this.$jD, f = this.set(Ht, 1).add(d, Nt).set(Yt, k - d * 12);
      return f.set(Ht, Math.min(f.daysInMonth(), i));
    }
    if (["y", Nt].includes(w)) return _(Nt, this.$jy);
    if (["d", Ht].includes(w)) {
      const k = new Date(this.$d);
      return k.setDate(k.getDate() + g), P(k, this);
    }
    if (["w", me].includes(w)) {
      const k = new Date(this.$d);
      return k.setDate(k.getDate() + g * 7), P(k, this);
    }
    return F.bind(this)(g, y);
  }, t.format = function(g, y) {
    if (!h(this)) return W.bind(this)(g, y);
    const w = g || yn, _ = y || this.$locale(), { jmonths: k } = _;
    return w.replace(gn, (d) => {
      if (d.includes("[")) return d.replace(/\[|\]/g, "");
      switch (d) {
        case "YY":
          return String(this.$jy).slice(-2);
        case "YYYY":
          return String(this.$jy);
        case "M":
          return String(this.$jM + 1);
        case "MM":
          return c(this.$jM + 1, 2, "0");
        case "MMM":
          return k[this.$jM].slice(0, 3);
        case "MMMM":
          return k[this.$jM];
        case "D":
          return String(this.$jD);
        case "DD":
          return c(this.$jD, 2, "0");
        default:
          return W.bind(this)(d, y);
      }
    });
  }, t.diff = function(g, y, w) {
    if (!h(this)) return U.bind(this)(g, y, w);
    const _ = a(y), k = e(g);
    let d = b(this, k);
    switch (_) {
      case Nt:
        d /= 12;
        break;
      case Yt:
        break;
      default:
        return U.bind(this)(g, y, w);
    }
    return w ? d : $(d);
  }, t.$g = function(g, y, w) {
    return s(g) ? this[y] : this.set(w, g);
  }, t.year = function(g) {
    return h(this) ? this.$g(g, "$jy", Nt) : V.bind(this)(g);
  }, t.month = function(g) {
    return h(this) ? this.$g(g, "$jM", Yt) : D.bind(this)(g);
  }, t.date = function(g) {
    return h(this) ? this.$g(g, "$jD", Ht) : H.bind(this)(g);
  }, t.daysInMonth = function() {
    return h(this) ? this.endOf(Yt).$jD : M.bind(this)();
  }, q && (t.toArray = function() {
    return h(this) ? [
      this.$jy,
      this.$jM,
      this.$jD,
      this.$H,
      this.$m,
      this.$s,
      this.$ms
    ] : q.bind(this)();
  }), t.clone = function() {
    return P(this.toDate(), this);
  };
};
var bn = vn, Ut = { exports: {} }, kn = Ut.exports, pe;
function Mn() {
  return pe || (pe = 1, (function(n, r) {
    (function(e, t) {
      n.exports = t();
    })(kn, (function() {
      var e = "week", t = "year";
      return function(l, h, a) {
        var s = h.prototype;
        s.week = function(c) {
          if (c === void 0 && (c = null), c !== null) return this.add(7 * (c - this.week()), "day");
          var b = this.$locale().yearStart || 1;
          if (this.month() === 11 && this.date() > 25) {
            var $ = a(this).startOf(t).add(1, t).date(b), T = a(this).endOf(e);
            if ($.isBefore(T)) return 1;
          }
          var S = a(this).startOf(t).date(b).startOf(e).subtract(1, "millisecond"), x = this.diff(S, e, !0);
          return x < 0 ? a(this).startOf("week").week() : Math.ceil(x);
        }, s.weeks = function(c) {
          return c === void 0 && (c = null), this.week(c);
        };
      };
    }));
  })(Ut)), Ut.exports;
}
var Tn = Mn();
const Dn = /* @__PURE__ */ ne(Tn);
Tt.extend(bn);
Tt.extend(Dn);
const Jt = [
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
], De = ["بهار", "تابستان", "پاییز", "زمستان"];
function Vt(n, r, e, t) {
  const l = [];
  let h = null, a = 0, s = null;
  for (const c of n) {
    const b = Tt(c.date).calendar("jalali"), $ = r(b);
    h === null ? (h = $, s = c.date, a = c.width) : $ === h ? a += c.width : (l.push({
      width: a,
      value: e(s),
      date: s,
      css: "",
      unit: t
    }), h = $, s = c.date, a = c.width);
  }
  return h !== null && l.push({
    width: a,
    value: e(s),
    date: s,
    css: "",
    unit: t
  }), l;
}
function _n(n, r) {
  const e = Tt(n).calendar("jalali");
  switch (r) {
    case "year":
      return e.format("YYYY");
    case "quarter":
      return `${De[Math.floor(e.month() / 3)]} ${e.format("YYYY")}`;
    case "month":
      return `${Jt[e.month()]} ${e.format("YYYY")}`;
    case "sprint": {
      const t = Tt(n).calendar("jalali"), l = Jt[t.month()], a = t.date() <= 15, s = a ? 1 : 16, c = a ? 15 : t.endOf("month").date();
      return `${l} ${c} - ${s}`;
    }
    case "week":
      return `هفته ${e.week()}`;
    case "day":
      return e.format("D");
    case "hour":
      return e.format("HH:mm");
    default:
      return e.format("YYYY/MM/DD");
  }
}
function Sn({ highlightTime: n }) {
  const r = kt(Ct), e = tt(r, "_scales"), t = z(() => {
    if (!e) return [];
    const h = [...e.rows], a = {};
    h.forEach((c, b) => {
      const $ = c.cells?.[0]?.unit;
      $ && (a[$] = b);
    });
    let s = [];
    if (a.day !== void 0)
      s = h[a.day].cells;
    else {
      const c = Tt(e.start), b = Tt(e.end), $ = e.lengthUnitWidth || 100, T = [];
      let S = c;
      for (; S.isBefore(b) || S.isSame(b, "day"); )
        T.push({
          width: $,
          value: S.date(),
          date: S.toDate(),
          css: "",
          unit: "day"
        }), S = S.add(1, "day");
      s = T;
    }
    return a.year !== void 0 && (h[a.year] = {
      ...h[a.year],
      cells: Vt(
        s,
        (c) => c.year(),
        (c) => Tt(c).calendar("jalali").format("YYYY"),
        "year"
      )
    }), a.quarter !== void 0 && (h[a.quarter] = {
      ...h[a.quarter],
      cells: Vt(
        s,
        (c) => `${c.year()}-${Math.floor(c.month() / 3)}`,
        (c) => {
          const b = Tt(c).calendar("jalali");
          return `${De[Math.floor(b.month() / 3)]} ${b.format("YYYY")}`;
        },
        "quarter"
      )
    }), a.month !== void 0 && (h[a.month] = {
      ...h[a.month],
      cells: Vt(
        s,
        (c) => `${c.year()}-${c.month()}`,
        (c) => {
          const b = Tt(c).calendar("jalali");
          return `${Jt[b.month()]} ${b.format("YYYY")}`;
        },
        "month"
      )
    }), a.sprint !== void 0 && (h[a.sprint] = {
      ...h[a.sprint],
      cells: Vt(
        s,
        (c) => {
          const b = c.date() <= 15 ? 1 : 2;
          return `${c.year()}-${c.month()}-${b}`;
        },
        (c) => {
          const b = Tt(c).calendar("jalali"), $ = Jt[b.month()], T = b.date(), S = b.endOf("month").date();
          return T <= 15 ? `${$} 15 - 1` : `${$} ${S} - 16`;
        },
        "sprint"
      )
    }), h;
  }, [e]), l = {
    width: `${e?.width || 0}px`
  };
  return /* @__PURE__ */ v("div", { className: "wx-ZkvhDKir wx-scale", style: l, children: t.map((h, a) => /* @__PURE__ */ v(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${h.height}px` },
      children: h.cells.map((s, c) => {
        const b = n ? n(s.date, s.unit) : "", $ = ["wx-cell", s.css, b].filter(Boolean).join(" "), T = s.date instanceof Date ? _n(s.date, s.unit) : s.value;
        return /* @__PURE__ */ v(
          "div",
          {
            className: "wx-ZkvhDKir " + $,
            style: { width: `${s.width}px` },
            children: s.unit === "week" ? s.value : T
          },
          c
        );
      })
    },
    a
  )) });
}
function Cn(n) {
  const {
    readonly: r,
    fullWidth: e,
    fullHeight: t,
    taskTemplate: l,
    cellBorders: h,
    highlightTime: a
  } = n, s = kt(Ct), [c, b] = te(s, "_selected"), $ = tt(s, "scrollLeft"), T = tt(s, "scrollTop"), S = tt(s, "cellHeight"), x = tt(s, "cellWidth"), N = tt(s, "_scales"), R = tt(s, "_markers"), F = tt(s, "_scrollTask"), W = tt(s, "zoom"), [U, V] = ft(), D = rt(null), H = 1 + (N?.rows?.length || 0), M = z(() => {
    const o = [];
    return c && c.length && S && c.forEach((u) => {
      o.push({ height: `${S}px`, top: `${u.$y - 3}px` });
    }), o;
  }, [b, S]), q = z(
    () => Math.max(U || 0, t),
    [U, t]
  );
  nt(() => {
    const o = D.current;
    o && typeof T == "number" && (o.scrollTop = T);
  }, [T]);
  const P = () => {
    g();
  };
  function g(o) {
    const u = D.current;
    if (!u) return;
    const L = {};
    L.left = u.scrollLeft, s.exec("scroll-chart", L);
  }
  function y() {
    const o = D.current, L = Math.ceil((U || 0) / (S || 1)) + 1, C = Math.floor((o && o.scrollTop || 0) / (S || 1)), O = Math.max(0, C - H), K = C + L + H, X = O * (S || 0);
    s.exec("render-data", {
      start: O,
      end: K,
      from: X
    });
  }
  nt(() => {
    y();
  }, [U, T, $]);
  const w = I(
    (o) => {
      if (!o) return;
      const { id: u, mode: L } = o;
      if (L.toString().indexOf("x") < 0) return;
      const C = D.current;
      if (!C) return;
      const { clientWidth: O } = C, K = s.getTask(u);
      if (K.$x + K.$w < C.scrollLeft)
        s.exec("scroll-chart", { left: K.$x - (x || 0) }), C.scrollLeft = K.$x - (x || 0);
      else if (K.$x >= O + C.scrollLeft) {
        const X = O < K.$w ? x || 0 : K.$w;
        s.exec("scroll-chart", { left: K.$x - O + X }), C.scrollLeft = K.$x - O + X;
      }
    },
    [s, x, $]
  );
  nt(() => {
    w(F);
  }, [F]);
  function _(o) {
    if (W && (o.ctrlKey || o.metaKey)) {
      o.preventDefault();
      const u = D.current, L = -Math.sign(o.deltaY), C = o.clientX - (u ? u.getBoundingClientRect().left : 0);
      s.exec("zoom-scale", {
        dir: L,
        offset: C
      });
    }
  }
  function k(o) {
    const u = a(o.date, o.unit);
    return u ? {
      css: u,
      width: o.width
    } : null;
  }
  const d = z(() => N && (N.minUnit === "hour" || N.minUnit === "day") && a ? N.rows[N.rows.length - 1].cells.map(k) : null, [N, a]), i = I((o) => {
    o.eventSource = "chart", s.exec("hotkey", o);
  }, [s]);
  nt(() => {
    const o = D.current;
    if (!o) return;
    const u = () => V(o.clientHeight);
    u();
    const L = new ResizeObserver(() => u());
    return L.observe(o), () => {
      L.disconnect();
    };
  }, [D.current]);
  const f = rt(null);
  return nt(() => {
    const o = D.current;
    if (o && !f.current)
      return f.current = ke(o, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (u) => i(u)
      }), () => {
        f.current?.destroy(), f.current = null;
      };
  }, []), nt(() => {
    const o = D.current;
    if (!o) return;
    const u = _;
    return o.addEventListener("wheel", u), () => {
      o.removeEventListener("wheel", u);
    };
  }, [_]), /* @__PURE__ */ gt(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: D,
      onScroll: P,
      children: [
        /* @__PURE__ */ v(Sn, { highlightTime: a, scales: N }),
        R && R.length ? /* @__PURE__ */ v(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${q}px` },
            children: R.map((o, u) => /* @__PURE__ */ v(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${o.css || "wx-default"}`,
                style: { left: `${o.left}px` },
                children: /* @__PURE__ */ v("div", { className: "wx-mR7v2Xag wx-content", children: o.text })
              },
              u
            ))
          }
        ) : null,
        /* @__PURE__ */ gt(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${e}px`, height: `${q}px` },
            children: [
              d ? /* @__PURE__ */ v(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: d.map(
                    (o, u) => o ? /* @__PURE__ */ v(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + o.css,
                        style: {
                          width: `${o.width}px`,
                          left: `${u * o.width}px`
                        }
                      },
                      u
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ v(en, { borders: h }),
              c && c.length ? c.map(
                (o, u) => o.$y ? /* @__PURE__ */ v(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": o.id,
                    style: M[u]
                  },
                  o.id
                ) : null
              ) : null,
              /* @__PURE__ */ v(rn, {}),
              /* @__PURE__ */ v(nn, { readonly: r, taskTemplate: l })
            ]
          }
        )
      ]
    }
  );
}
function Ln(n) {
  const {
    position: r = "after",
    size: e = 4,
    dir: t = "x",
    minValue: l = 0,
    maxValue: h = 0,
    onMove: a,
    onDisplayChange: s,
    compactMode: c
  } = n, [b, $] = Ft(n.value ?? 0), [T, S] = Ft(n.display ?? "all");
  function x(w) {
    let _ = 0;
    r == "center" ? _ = e / 2 : r == "before" && (_ = e);
    const k = {
      size: [e + "px", "auto"],
      p: [w - _ + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (t != "x")
      for (let d in k) k[d] = k[d].reverse();
    return k;
  }
  const [N, R] = ft(!1), F = rt(0), W = rt();
  function U(w) {
    return t == "x" ? w.clientX : w.clientY;
  }
  const V = I((w) => {
    const _ = W.current + U(w) - F.current;
    (!l || l <= _) && (!h || h >= _) && ($(_), a(_));
  }, []), D = I(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", R(!1), window.removeEventListener("mousemove", V), window.removeEventListener("mouseup", D);
  }, [V]), H = z(
    () => T !== "all" ? "auto" : t == "x" ? "ew-resize" : "ns-resize",
    [T, t]
  ), M = I(
    (w) => {
      F.current = U(w), W.current = b, R(!0), document.body.style.cursor = H, document.body.style.userSelect = "none", window.addEventListener("mousemove", V), window.addEventListener("mouseup", D);
    },
    [H, V, D, b]
  );
  function q() {
    let w;
    c ? w = T === "chart" ? "grid" : "chart" : w = T === "all" ? "chart" : "all", S(w), s(w);
  }
  function P() {
    let w;
    c ? w = T === "grid" ? "chart" : "grid" : w = T === "all" ? "grid" : "all", S(w), s(w);
  }
  const g = z(() => x(b), [b, r, e, t]), y = [
    "wx-resizer",
    `wx-resizer-${t}`,
    `wx-resizer-display-${T}`,
    N ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ gt(
    "div",
    {
      className: "wx-pFykzMlT " + y,
      onMouseDown: M,
      style: { width: g.size[0], height: g.size[1], cursor: H },
      children: [
        /* @__PURE__ */ gt("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ v(
            "div",
            {
              className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left",
              children: /* @__PURE__ */ v(
                "i",
                {
                  className: "wx-pFykzMlT wxi-menu-left",
                  onClick: q
                }
              )
            }
          ),
          /* @__PURE__ */ v(
            "div",
            {
              className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right",
              children: /* @__PURE__ */ v(
                "i",
                {
                  className: "wx-pFykzMlT wxi-menu-right",
                  onClick: P
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ v("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const Yn = 650;
function _e(n) {
  let r;
  function e() {
    r = new ResizeObserver((l) => {
      for (let h of l)
        if (h.target === document.body) {
          let a = h.contentRect.width <= Yn;
          n(a);
        }
    }), r.observe(document.body);
  }
  function t() {
    r && (r.disconnect(), r = null);
  }
  return {
    observe: e,
    disconnect: t
  };
}
function Nn(n) {
  const {
    taskTemplate: r,
    readonly: e,
    cellBorders: t,
    highlightTime: l,
    onTableAPIChange: h
  } = n, a = kt(Ct), s = tt(a, "_tasks"), c = tt(a, "_scales"), b = tt(a, "cellHeight"), $ = tt(a, "columns"), T = tt(a, "_scrollTask"), [S, x] = ft(!1);
  let [N, R] = ft(0);
  const [F, W] = ft(void 0), [U, V] = ft(void 0), [D, H] = ft(void 0), [M, q] = ft("all"), P = rt(null), g = I(
    (E) => {
      x((st) => (E !== st && (E ? (P.current = M, M === "all" && q("grid")) : (!P.current || P.current === "all") && q("all")), E));
    },
    [M]
  );
  nt(() => {
    const E = _e(g);
    return E.observe(), () => {
      E.disconnect();
    };
  }, [g]);
  const y = z(() => {
    let E;
    return $.every((st) => st.width && !st.flexgrow) ? E = $.reduce((st, at) => st + parseInt(at.width), 0) : S && M === "chart" ? E = parseInt($.find((st) => st.id === "action")?.width) || 50 : E = 440, N = E, E;
  }, [$, S, M]);
  nt(() => {
    R(y);
  }, [y]);
  const w = z(
    () => (F ?? 0) - (D ?? 0),
    [F, D]
  ), _ = z(() => c.width, [c]), k = z(
    () => s.length * b,
    [s, b]
  ), d = z(
    () => c.height + k + w,
    [c, k, w]
  ), i = z(
    () => N + _,
    [N, _]
  ), f = rt(null), o = I(() => {
    Promise.resolve().then(() => {
      if ((F ?? 0) > (i ?? 0)) {
        const E = (F ?? 0) - N;
        a.exec("expand-scale", { minWidth: E });
      }
    });
  }, [F, i, N, a]);
  nt(() => {
    let E;
    return f.current && (E = new ResizeObserver(o), E.observe(f.current)), () => {
      E && E.disconnect();
    };
  }, [f.current, o]);
  const u = rt(null), L = rt(null), C = I(() => {
    const E = u.current;
    E && a.exec("scroll-chart", {
      top: E.scrollTop
    });
  }, [a]), O = rt({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  nt(() => {
    O.current = {
      rTasks: s,
      rScales: c,
      rCellHeight: b,
      scrollSize: w,
      ganttDiv: u.current,
      ganttHeight: U ?? 0
    };
  }, [s, c, b, w, U]);
  const K = I(
    (E) => {
      if (!E) return;
      const {
        rTasks: st,
        rScales: at,
        rCellHeight: j,
        scrollSize: B,
        ganttDiv: Q,
        ganttHeight: ot
      } = O.current;
      if (!Q) return;
      const { id: et } = E, wt = st.findIndex(($t) => $t.id === et);
      if (wt > -1) {
        const $t = ot - at.height, Dt = wt * j, Lt = Q.scrollTop;
        let p = null;
        Dt < Lt ? p = Dt : Dt + j > Lt + $t && (p = Dt - $t + j + B), p !== null && (a.exec("scroll-chart", { top: Math.max(p, 0) }), u.current.scrollTop = Math.max(p, 0));
      }
    },
    [a]
  );
  nt(() => {
    K(T);
  }, [T]), nt(() => {
    const E = u.current;
    if (!E) return;
    const st = () => {
      V(E.offsetHeight), W(E.offsetWidth);
    };
    st();
    const at = new ResizeObserver(st);
    return at.observe(E), () => at.disconnect();
  }, [u.current]), nt(() => {
    const E = L.current;
    if (!E) return;
    const st = () => {
      H(E.offsetWidth);
    };
    st();
    const at = new ResizeObserver(st);
    return at.observe(E), () => at.disconnect();
  }, [L.current]);
  const X = rt(null), ct = rt(null);
  return nt(() => {
    if (ct.current) return;
    const E = X.current;
    if (E)
      return ct.current = ke(E, {
        keys: {
          "ctrl+c": !0,
          "ctrl+v": !0,
          "ctrl+x": !0,
          "ctrl+d": !0,
          backspace: !0
        },
        exec: (st) => {
          st.isInput || a.exec("hotkey", st);
        }
      }), () => {
        ct.current?.destroy(), ct.current = null;
      };
  }, []), /* @__PURE__ */ v("div", { className: "wx-jlbQoHOz wx-gantt", ref: u, onScroll: C, children: /* @__PURE__ */ v(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: d, width: "100%" },
      ref: L,
      children: /* @__PURE__ */ v(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: U,
            width: D
          },
          children: /* @__PURE__ */ gt("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: X, children: [
            $.length ? /* @__PURE__ */ gt(zt, { children: [
              /* @__PURE__ */ v(
                tn,
                {
                  display: M,
                  compactMode: S,
                  columnWidth: y,
                  width: N,
                  readonly: e,
                  fullHeight: k,
                  onTableAPIChange: h
                }
              ),
              /* @__PURE__ */ v(
                Ln,
                {
                  value: N,
                  display: M,
                  compactMode: S,
                  minValue: "50",
                  maxValue: "800",
                  onMove: (E) => R(E),
                  onDisplayChange: (E) => q(E)
                }
              )
            ] }) : null,
            /* @__PURE__ */ v("div", { className: "wx-jlbQoHOz wx-content", ref: f, children: /* @__PURE__ */ v(
              Cn,
              {
                readonly: e,
                fullWidth: _,
                fullHeight: k,
                taskTemplate: r,
                cellBorders: t,
                highlightTime: l
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
const Rn = (n) => n.split("-").map((r) => r ? r.charAt(0).toUpperCase() + r.slice(1) : "").join(""), En = [
  { unit: "month", step: 1, format: "MMMM yyy" },
  { unit: "day", step: 1, format: "d" }
], er = xe(function({
  taskTemplate: r = null,
  markers: e = [],
  taskTypes: t = Ge,
  tasks: l = [],
  selected: h = [],
  activeTask: a = null,
  links: s = [],
  scales: c = En,
  columns: b = ze,
  start: $ = null,
  end: T = null,
  lengthUnit: S = "day",
  durationUnit: x = "day",
  cellWidth: N = 100,
  cellHeight: R = 38,
  scaleHeight: F = 36,
  readonly: W = !1,
  cellBorders: U = "full",
  zoom: V = !1,
  baselines: D = !1,
  highlightTime: H = null,
  init: M = null,
  autoScale: q = !0,
  unscheduledTasks: P = !1,
  ...g
}, y) {
  const w = rt();
  w.current = g;
  const _ = z(() => new We(Pe), []), k = z(() => _.in, [_]), d = rt(null);
  d.current === null && (d.current = new Ae((C, O) => {
    const K = "on" + Rn(C);
    w.current && w.current[K] && w.current[K](O);
  }), k.setNext(d.current));
  const [i, f] = ft(null), o = rt(null);
  o.current = i;
  const u = z(
    () => ({
      getState: _.getState.bind(_),
      getReactiveState: _.getReactive.bind(_),
      getStores: () => ({ data: _ }),
      exec: k.exec,
      setNext: (C) => (d.current = d.current.setNext(C), d.current),
      intercept: k.intercept.bind(k),
      on: k.on.bind(k),
      detach: k.detach.bind(k),
      getTask: _.getTask.bind(_),
      serialize: _.serialize.bind(_),
      getTable: (C) => C ? new Promise((O) => setTimeout(() => O(o.current), 1)) : o.current
    }),
    [_, k]
  );
  ge(
    y,
    () => ({
      ...u
    }),
    [u]
  );
  const L = rt(0);
  return nt(() => {
    L.current ? _.init({
      tasks: l,
      links: s,
      start: $,
      columns: b,
      end: T,
      lengthUnit: S,
      cellWidth: N,
      cellHeight: R,
      scaleHeight: F,
      scales: c,
      taskTypes: t,
      zoom: V,
      selected: h,
      activeTask: a,
      baselines: D,
      autoScale: q,
      unscheduledTasks: P,
      markers: e,
      durationUnit: x
    }) : M && M(u), L.current++;
  }, [
    l,
    s,
    $,
    b,
    T,
    S,
    N,
    R,
    F,
    c,
    t,
    V,
    h,
    a,
    D,
    q,
    P,
    e,
    x
  ]), L.current === 0 && _.init({
    tasks: l,
    links: s,
    start: $,
    columns: b,
    end: T,
    lengthUnit: S,
    cellWidth: N,
    cellHeight: R,
    scaleHeight: F,
    scales: c,
    taskTypes: t,
    zoom: V,
    selected: h,
    activeTask: a,
    baselines: D,
    autoScale: q,
    unscheduledTasks: P,
    markers: e,
    durationUnit: x
  }), /* @__PURE__ */ v(ye, { words: Qt, optional: !0, children: /* @__PURE__ */ v(Ct.Provider, { value: u, children: /* @__PURE__ */ v(
    Nn,
    {
      taskTemplate: r,
      readonly: W,
      cellBorders: U,
      highlightTime: H,
      onTableAPIChange: f
    }
  ) }) });
});
function jn({
  appearance: n = "primary",
  icon: r = "",
  onClick: e
}) {
  return /* @__PURE__ */ v("button", { className: `wx-TyZ1fHBj wx-button ${n}`, onClick: e, children: r ? /* @__PURE__ */ v("i", { className: `wx-TyZ1fHBj wx-button-icon ${r}` }) : null });
}
class Hn {
  constructor() {
    this.store = /* @__PURE__ */ new Map();
  }
  limit(r) {
    this._scope = r;
  }
  isActive() {
    return !this._scope || this._scope();
  }
  add(r, e) {
    this.store.set(r.toLowerCase().replace(/[ ]/g, ""), e);
  }
}
const It = [], On = {
  subscribe: (n) => {
    An();
    const r = new Hn();
    return It.push(r), n(r), () => {
      const e = It.findIndex((t) => t === r);
      e >= 0 && It.splice(e, 1);
    };
  }
};
var we = !1;
function An() {
  we || (we = !0, document.addEventListener("keydown", (n) => {
    if (It.length && (n.ctrlKey || n.altKey || n.metaKey || n.shiftKey || n.key.length > 1 || n.key === " ")) {
      const r = [];
      n.ctrlKey && r.push("ctrl"), n.altKey && r.push("alt"), n.metaKey && r.push("meta"), n.shiftKey && r.push("shift");
      let e = n.key.toLocaleLowerCase();
      n.key === " " && (e = "space"), r.push(e);
      const t = r.join("+");
      for (let l = It.length - 1; l >= 0; l--) {
        const h = It[l], a = h.store.get(t) || h.store.get(e), s = n.target.tagName;
        if (a && s !== "INPUT" && s !== "TEXTAREA" && h.isActive()) {
          a(n), n.preventDefault();
          return;
        }
      }
    }
  }));
}
function nr({ hotkey: n = null, children: r }) {
  const e = rt(null), [t, l] = ft(!1), h = rt(t);
  nt(() => {
    h.current = t;
  }, [t]);
  const a = rt(() => {
    const s = e.current, c = !h.current;
    c && s ? s.requestFullscreen() : h.current && document.exitFullscreen(), l(c);
  });
  return nt(() => {
    n && On.subscribe((s) => s.add(n, a.current));
  }, []), nt(() => {
    const s = () => {
      l(document.fullscreenElement === e.current);
    };
    return document.addEventListener("fullscreenchange", s), () => {
      document.removeEventListener("fullscreenchange", s);
    };
  }, []), /* @__PURE__ */ gt("div", { tabIndex: 0, className: "wx-KG2RkQhB wx-fullscreen", ref: e, children: [
    r,
    /* @__PURE__ */ v("div", { className: "wx-KG2RkQhB wx-fullscreen-icon", children: /* @__PURE__ */ v(
      jn,
      {
        appearance: "transparent",
        icon: `wxi-${t ? "collapse" : "expand"}`,
        onClick: () => a.current()
      }
    ) })
  ] });
}
function rr({
  api: n = null,
  items: r = [...ie]
}) {
  const e = kt(St.i18n), t = z(() => e || ee(Qt), [e]), l = z(() => t.getGroup("gantt"), [t]), h = Ot(n, "_selected"), a = Ot(n, "_tasks"), s = z(() => r.map((b) => {
    let $ = { ...b, disabled: !1 };
    return $.handler = be(ie, $.id) ? (T) => ve(n, T.id, null, l) : $.handler, $.text && ($.text = l($.text)), $.menuText && ($.menuText = l($.menuText)), $;
  }), [r, n, l]), c = z(() => n && h?.length ? s.map((b) => {
    if (!b.check) return b;
    const $ = h.some(
      (T) => !b.check(T, a)
    );
    return { ...b, disabled: $ };
  }) : [{ ...s[0], disabled: !1 }], [n, h, a, s]);
  return e ? /* @__PURE__ */ v(ae, { items: c }) : /* @__PURE__ */ v(St.i18n.Provider, { value: t, children: /* @__PURE__ */ v(ae, { items: c }) });
}
const sr = xe(function({
  options: r,
  api: e = null,
  resolver: t = null,
  filter: l = null,
  at: h = "point",
  children: a,
  onClick: s,
  css: c
}, b) {
  const $ = z(() => r ?? [...ce], [r]), [T] = Ft($), S = rt(null), x = rt(null), N = kt(St.i18n), R = z(() => N || ee({ ...Qt, ...Me }), [N]), F = z(() => R.getGroup("gantt"), [R]), W = Ot(e, "taskTypes"), U = Ot(e, "_tasks"), V = Ot(e, "selected"), D = Ot(e, "_selected");
  nt(() => {
    e && (e.on("scroll-chart", () => {
      S.current && S.current.show && S.current.show();
    }), e.on("drag-task", () => {
      S.current && S.current.show && S.current.show();
    }));
  }, [e]);
  function H(d) {
    return d.map((i) => (i = { ...i }, i.text && (i.text = F(i.text)), i.subtext && (i.subtext = F(i.subtext)), i.data && (i.data = H(i.data)), i));
  }
  function M() {
    const d = T.find((i) => i.id === "convert-task");
    return d && (d.data = [], (W || []).forEach((i) => {
      d.data.push(d.dataFactory(i));
    })), H(T);
  }
  const q = z(() => e ? M() : null, [e, T, W, F]), P = z(
    () => D && D.length ? D : [],
    [D]
  ), g = I(
    (d, i) => {
      let f = d ? e?.getTask(d) : null;
      if (t) {
        const o = t(d, i);
        f = o === !0 ? f : o;
      }
      return f && (x.current = f.id, (!Array.isArray(V) || !V.includes(f.id)) && e && e.exec && e.exec("select-task", { id: f.id })), f;
    },
    [e, t, V]
  ), y = I(
    (d) => {
      const i = d.action;
      i && (be(ce, i.id) && ve(e, i.id, x.current, F), s && s(d));
    },
    [e, F, s]
  ), w = I(
    (d, i) => {
      const f = P.length ? P : i ? [i] : [];
      let o = l ? l(d, i) : !0;
      if (d.check && o) {
        const u = f.some((L) => !d.check(L, U));
        d.css = u ? "wx-disabled" : "";
      }
      return o;
    },
    [l, P, U]
  );
  ge(b, () => ({
    show: (d, i) => {
      S.current && S.current.show && S.current.show(d, i);
    }
  }));
  const _ = I((d) => {
    S.current && S.current.show && S.current.show(d);
  }, []), k = /* @__PURE__ */ gt(zt, { children: [
    /* @__PURE__ */ v(
      Ue,
      {
        filter: w,
        options: q,
        dataKey: "id",
        resolver: g,
        onClick: y,
        at: h,
        ref: S,
        css: c
      }
    ),
    /* @__PURE__ */ v("span", { onContextMenu: _, "data-menu-ignore": "true", children: typeof a == "function" ? a() : a })
  ] });
  if (!N && St.i18n?.Provider) {
    const d = St.i18n.Provider;
    return /* @__PURE__ */ v(d, { value: R, children: k });
  }
  return k;
});
function In({ api: n, autoSave: r, onLinksChange: e }) {
  const l = kt(St.i18n).getGroup("gantt"), h = tt(n, "activeTask"), a = tt(n, "_links"), [s, c] = ft();
  function b() {
    if (h) {
      const x = a.filter((R) => R.target == h).map((R) => ({ link: R, task: n.getTask(R.source) })), N = a.filter((R) => R.source == h).map((R) => ({ link: R, task: n.getTask(R.target) }));
      return [
        { title: l("Predecessors"), data: x },
        { title: l("Successors"), data: N }
      ];
    }
  }
  nt(() => {
    c(b());
  }, [h, a]);
  const $ = z(
    () => [
      { id: "e2s", label: l("End-to-start") },
      { id: "s2s", label: l("Start-to-start") },
      { id: "e2e", label: l("End-to-end") },
      { id: "s2e", label: l("Start-to-end") }
    ],
    [l]
  );
  function T(x) {
    r ? n.exec("delete-link", { id: x }) : (c(
      (N) => (N || []).map((R) => ({
        ...R,
        data: R.data.filter((F) => F.link.id !== x)
      }))
    ), e && e({
      id: x,
      action: "delete-link",
      data: { id: x }
    }));
  }
  function S(x, N) {
    const R = x.value;
    r ? n.exec("update-link", {
      id: N,
      link: { type: R }
    }) : (c(
      (F) => (F || []).map((W) => ({
        ...W,
        data: W.data.map(
          (U) => U.link.id === N ? { ...U, link: { ...U.link, type: R } } : U
        )
      }))
    ), e && e({
      id: N,
      action: "update-link",
      data: {
        id: N,
        link: { type: R }
      }
    }));
  }
  return /* @__PURE__ */ v(zt, { children: (s || []).map(
    (x, N) => x.data.length ? /* @__PURE__ */ v("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ v(Le, { label: x.title, position: "top", children: /* @__PURE__ */ v("table", { children: /* @__PURE__ */ v("tbody", { children: x.data.map((R) => /* @__PURE__ */ gt("tr", { children: [
      /* @__PURE__ */ v("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ v("div", { className: "wx-j93aYGQf wx-task-name", children: R.task.text || "" }) }),
      /* @__PURE__ */ v("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ v("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ v(
        Ye,
        {
          value: R.link.type,
          placeholder: l("Select link type"),
          options: $,
          onChange: (F) => S(F, R.link.id),
          children: ({ option: F }) => F.label
        }
      ) }) }),
      /* @__PURE__ */ v("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ v(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => T(R.link.id),
          role: "button"
        }
      ) })
    ] }, R.link.id)) }) }) }) }, N) : null
  ) });
}
function Wn(n) {
  const { value: r, time: e, format: t, onchange: l, onChange: h, ...a } = n, s = h ?? l;
  function c(b) {
    const $ = new Date(b.value);
    $.setHours(r.getHours()), $.setMinutes(r.getMinutes()), s && s({ value: $ });
  }
  return /* @__PURE__ */ gt("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ v(
      Ne,
      {
        ...a,
        value: r,
        onChange: c,
        format: t,
        buttons: ["today"],
        clear: !1
      }
    ),
    e ? /* @__PURE__ */ v(Re, { value: r, onChange: s, format: t }) : null
  ] });
}
Wt("select", Ee);
Wt("date", Wn);
Wt("twostate", je);
Wt("slider", He);
Wt("counter", Oe);
Wt("links", In);
function or({
  api: n,
  items: r = Fe,
  css: e = "",
  layout: t = "default",
  readonly: l = !1,
  placement: h = "sidebar",
  bottomBar: a = !0,
  topBar: s = !0,
  autoSave: c = !0,
  focus: b = !1
}) {
  const $ = kt(St.i18n), T = z(() => $ || ee({ ...Qt, ...Me }), [$]), S = z(() => T.getGroup("gantt"), [T]), x = T.getRaw(), N = z(() => {
    const j = x.gantt?.dateFormat || x.formats?.dateFormat;
    return Ve(j, x.calendar);
  }, [x]), R = z(() => {
    if (s === !0 && !l) {
      const j = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: S("Delete"),
          id: "delete"
        }
      ];
      return c ? { items: j } : {
        items: [
          ...j,
          {
            comp: "button",
            type: "primary",
            text: S("Save"),
            id: "save"
          }
        ]
      };
    }
    return s;
  }, [s, l, c, S]), [F, W] = ft(!1), U = z(
    () => F ? "wx-full-screen" : "",
    [F]
  ), V = I((j) => {
    W(j);
  }, []);
  nt(() => {
    const j = _e(V);
    return j.observe(), () => {
      j.disconnect();
    };
  }, [V]);
  const D = tt(n, "_activeTask"), H = z(() => D?.id, [D]), M = tt(n, "durationUnit"), q = tt(n, "unscheduledTasks"), P = tt(n, "taskTypes"), [g, y] = Ft(D?.type), w = z(() => D?.unscheduled, [D]), [_, k] = ft({});
  nt(() => {
    k({});
  }, [H]);
  const d = z(() => g === "milestone", [g]), i = z(() => g === "summary", [g]);
  function f(j, B) {
    const Q = { start: 1, end: 1, duration: 1 };
    return j.map((ot) => {
      const et = { ...ot };
      if (ot.config && (et.config = { ...et.config }), et.comp === "links" && n && (et.api = n, et.autoSave = c, et.onLinksChange = C), et.comp === "select" && et.key === "type") {
        let wt = et.options ?? (P || []);
        et.options = wt.map(($t) => ({
          ...$t,
          label: S($t.label)
        }));
      }
      return et.comp === "slider" && et.key === "progress" && (et.labelTemplate = (wt) => `${S(et.label)} ${wt}%`), et.label && (et.label = S(et.label)), et.config?.placeholder && (et.config.placeholder = S(et.config.placeholder)), q && Q[et.key] && (B ? et.disabled = !0 : delete et.disabled), et;
    });
  }
  function o(j) {
    return j.filter(({ comp: B, key: Q, options: ot }) => {
      switch (B) {
        case "date":
          return (!d || Q !== "end" && Q !== "base_end") && !i;
        case "select":
          return ot.length > 1;
        case "twostate":
          return q && !i;
        case "counter":
          return !i && !d;
        case "slider":
          return !d;
        default:
          return !0;
      }
    });
  }
  const u = z(() => {
    const j = f(r, w);
    return o(j);
  }, [
    r,
    w,
    d,
    i,
    q,
    P,
    S,
    n,
    c
  ]), L = z(() => {
    if (l && D) {
      let j = {};
      return u.forEach(({ key: B, comp: Q }) => {
        if (Q !== "links") {
          const ot = D[B];
          Q === "date" && ot instanceof Date ? j[B] = N(ot) : Q === "slider" && B === "progress" ? j[B] = `${ot}%` : j[B] = ot;
        }
      }), j;
    }
    return D ? { ...D } : null;
  }, [l, D, u, N]);
  function C({ id: j, action: B, data: Q }) {
    k((ot) => ({
      ...ot,
      [j]: { action: B, data: Q }
    }));
  }
  const O = I(() => {
    for (let j in _) {
      const { action: B, data: Q } = _[j];
      n.exec(B, Q);
    }
  }, [n, _]), K = I(() => {
    n.exec("delete-task", { id: H });
  }, [n, H]), X = I(() => {
    n.exec("show-editor", { id: null });
  }, [n]), ct = I((j) => {
    const { item: B, changes: Q } = j;
    B.id === "delete" && K(), B.id === "save" && (Q.length ? X() : O()), B.comp && X();
  }, [n, H, c, O, K, X]), E = I((j, B) => (q && j.type === "summary" && (j.unscheduled = !1), $e(j, M, !0, B), j), [q, M]), st = I((j) => {
    let { update: B, key: Q, value: ot } = j;
    j.update = E({ ...B }, Q), c || Q === "type" && y(ot);
  }, [n, c]), at = I((j) => {
    let { values: B } = j;
    B = {
      ...B,
      unscheduled: q && B.unscheduled && B.type !== "summary"
    }, delete B.links, delete B.data, n.exec("update-task", {
      id: H,
      task: B
    }), c || O();
  }, [n, H, q, c, O]);
  return L ? /* @__PURE__ */ v(ye, { children: /* @__PURE__ */ v(
    Xe,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${U} ${e}`,
      items: u,
      values: L,
      topBar: R,
      bottomBar: a,
      placement: h,
      layout: t,
      readonly: l,
      autoSave: c,
      focus: b,
      onAction: ct,
      onSave: at,
      onChange: st
    }
  ) }) : null;
}
const ir = ({ children: n, columns: r = null, api: e }) => {
  const [t, l] = ft(null);
  return nt(() => {
    e && e.getTable(!0).then(l);
  }, [e]), /* @__PURE__ */ v(qe, { api: t, columns: r, children: n });
};
function cr(n) {
  const { api: r, content: e, children: t } = n, l = rt(null), h = rt(null), [a, s] = ft({}), [c, b] = ft(null), [$, T] = ft({});
  function S(D) {
    for (; D; ) {
      if (D.getAttribute) {
        const H = D.getAttribute("data-tooltip-id"), M = D.getAttribute("data-tooltip-at"), q = D.getAttribute("data-tooltip");
        if (H || q) return { id: H, tooltip: q, target: D, at: M };
      }
      D = D.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  nt(() => {
    const D = h.current;
    if (D && $ && ($.text || e)) {
      const H = D.getBoundingClientRect();
      let M = !1, q = $.left, P = $.top;
      H.right >= a.right && (q = a.width - H.width - 5, M = !0), H.bottom >= a.bottom && (P = $.top - (H.bottom - a.bottom + 2), M = !0), M && T((g) => g && { ...g, left: q, top: P });
    }
  }, [$, a, e]);
  const x = rt(null), N = 300, R = (D) => {
    clearTimeout(x.current), x.current = setTimeout(() => {
      D();
    }, N);
  };
  function F(D) {
    let { id: H, tooltip: M, target: q, at: P } = S(D.target);
    if (T(null), b(null), !M)
      if (H)
        M = U(H);
      else {
        clearTimeout(x.current);
        return;
      }
    const g = D.clientX;
    R(() => {
      H && b(W(V(H)));
      const y = q.getBoundingClientRect(), w = l.current, _ = w ? w.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let k, d;
      P === "left" ? (k = y.top + 5 - _.top, d = y.right + 5 - _.left) : (k = y.top + y.height - _.top, d = g - _.left), s(_), T({ top: k, left: d, text: M });
    });
  }
  function W(D) {
    return r?.getTask(V(D)) || null;
  }
  function U(D) {
    return W(D)?.text || "";
  }
  function V(D) {
    const H = parseInt(D);
    return isNaN(H) ? D : H;
  }
  return /* @__PURE__ */ gt(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: l,
      onMouseMove: F,
      children: [
        $ && ($.text || e) ? /* @__PURE__ */ v(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: h,
            style: { top: `${$.top}px`, left: `${$.left}px` },
            children: e ? /* @__PURE__ */ v(e, { data: c }) : $.text ? /* @__PURE__ */ v("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: $.text }) : null
          }
        ) : null,
        t
      ]
    }
  );
}
function ar({ fonts: n = !0, children: r }) {
  return r ? /* @__PURE__ */ v(re, { fonts: n, children: r() }) : /* @__PURE__ */ v(re, { fonts: n });
}
function lr({ fonts: n = !0, children: r }) {
  return r ? /* @__PURE__ */ v(se, { fonts: n, children: r }) : /* @__PURE__ */ v(se, { fonts: n });
}
function ur({ fonts: n = !0, children: r }) {
  return r ? /* @__PURE__ */ v(oe, { fonts: n, children: r }) : /* @__PURE__ */ v(oe, { fonts: n });
}
export {
  sr as ContextMenu,
  or as Editor,
  nr as Fullscreen,
  er as Gantt,
  ir as HeaderMenu,
  ar as Material,
  rr as Toolbar,
  cr as Tooltip,
  lr as Willow,
  ur as WillowDark,
  hr as defaultColumns,
  mr as defaultEditorItems,
  pr as defaultMenuOptions,
  wr as defaultTaskTypes,
  xr as defaultToolbarButtons,
  $r as registerEditorItem,
  gr as registerScaleUnit
};
