(function (t, e) {
  typeof exports === 'object' && typeof module === 'object'
    ? (module.exports = e())
    : typeof define === 'function' && define.amd
    ? define([], e)
    : typeof exports === 'object'
    ? (exports.ShortcutButtonsPlugin = e())
    : (t.ShortcutButtonsPlugin = e());
})(
  window,
  () =>
    (function (t) {
      const e = {};
      function n(o) {
        if (e[o]) return e[o].exports;
        const r = (e[o] = { i: o, l: !1, exports: {} });
        return t[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
      }
      return (
        (n.m = t),
        (n.c = e),
        (n.d = function (t, e, o) {
          n.o(t, e) ||
            Object.defineProperty(t, e, {
              configurable: !1,
              enumerable: !0,
              get: o,
            });
        }),
        (n.r = function (t) {
          Object.defineProperty(t, '__esModule', { value: !0 });
        }),
        (n.n = function (t) {
          const e =
            t && t.__esModule
              ? function () {
                  return t.default;
                }
              : function () {
                  return t;
                };
          return n.d(e, 'a', e), e;
        }),
        (n.o = function (t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (n.p = ''),
        n((n.s = 0))
      );
    })([
      function (t, e, n) {
        Object.defineProperty(e, '__esModule', { value: !0 });
        const o = { theme: 'light' };
        e.ShortcutButtonsPlugin = function (t) {
          const e = { ...o, ...t };
          return (t) => {
            let n;
            function o(n) {
              n.stopPropagation(), n.preventDefault();
              const o = n.target;
              if (o.tagName.toLowerCase() !== 'button' || void 0 === e.onClick)
                return;
              const r = parseInt(o.dataset.index, 10);
              const c = Array.isArray(e.onClick) ? e.onClick : [e.onClick];
              for (const e of c) typeof e === 'function' && e(r, t);
            }
            return {
              onReady: () => {
                if (
                  ((n = document.createElement('div')).classList.add(
                    'shortcut-buttons-flatpickr-wrapper',
                    e.theme
                  ),
                  void 0 !== e.label && e.label.length)
                ) {
                  const t = document.createElement('div');
                  t.classList.add('shortcut-buttons-flatpickr-label'),
                    (t.textContent = e.label),
                    n.appendChild(t);
                }
                const r = document.createElement('div');
                r.classList.add('shortcut-buttons-flatpickr-buttons'),
                  (Array.isArray(e.button) ? e.button : [e.button]).forEach(
                    (t, e) => {
                      const n = document.createElement('button');
                      n.classList.add('shortcut-buttons-flatpickr-button'),
                        (n.textContent = t.label),
                        (n.dataset.index = String(e)),
                        r.appendChild(n);
                    }
                  ),
                  n.appendChild(r),
                  t.calendarContainer.appendChild(n),
                  n.addEventListener('click', o);
              },
              onDestroy: () => {
                n.removeEventListener('click', o), (n = void 0);
              },
            };
          };
        };
      },
    ]).ShortcutButtonsPlugin
);
