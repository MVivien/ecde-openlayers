!(function () {
  function e(t, n, r) {
    function o(s, a) {
      if (!n[s]) {
        if (!t[s]) {
          var u = 'function' == typeof require && require;
          if (!a && u) return u(s, !0);
          if (i) return i(s, !0);
          var l = new Error("Cannot find module '" + s + "'");
          throw ((l.code = 'MODULE_NOT_FOUND'), l);
        }
        var c = (n[s] = { exports: {} });
        t[s][0].call(
          c.exports,
          function (e) {
            var n = t[s][1][e];
            return o(n || e);
          },
          c,
          c.exports,
          e,
          t,
          n,
          r,
        );
      }
      return n[s].exports;
    }
    for (var i = 'function' == typeof require && require, s = 0; s < r.length; s++) o(r[s]);
    return o;
  }
  return e;
})()(
  {
    1: [
      function (e, t, n) {
        (function (e) {
          (function () {
            !(function (r) {
              function o(e) {
                throw new RangeError(O[e]);
              }
              function i(e, t) {
                for (var n = e.length, r = []; n--; ) r[n] = t(e[n]);
                return r;
              }
              function s(e, t) {
                var n = e.split('@'),
                  r = '';
                n.length > 1 && ((r = n[0] + '@'), (e = n[1])), (e = e.replace(L, '.'));
                var o = e.split('.'),
                  s = i(o, t).join('.');
                return r + s;
              }
              function a(e) {
                for (var t, n, r = [], o = 0, i = e.length; o < i; )
                  (t = e.charCodeAt(o++)),
                    t >= 55296 && t <= 56319 && o < i
                      ? ((n = e.charCodeAt(o++)),
                        56320 == (64512 & n)
                          ? r.push(((1023 & t) << 10) + (1023 & n) + 65536)
                          : (r.push(t), o--))
                      : r.push(t);
                return r;
              }
              function u(e) {
                return i(e, function (e) {
                  var t = '';
                  return (
                    e > 65535 &&
                      ((e -= 65536),
                      (t += P(((e >>> 10) & 1023) | 55296)),
                      (e = 56320 | (1023 & e))),
                    (t += P(e))
                  );
                }).join('');
              }
              function l(e) {
                return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : T;
              }
              function c(e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
              }
              function f(e, t, n) {
                var r = 0;
                for (e = n ? R(e / k) : e >> 1, e += R(e / t); e > (H * j) >> 1; r += T)
                  e = R(e / H);
                return R(r + ((H + 1) * e) / (e + A));
              }
              function p(e) {
                var t,
                  n,
                  r,
                  i,
                  s,
                  a,
                  c,
                  p,
                  h,
                  d,
                  g = [],
                  v = e.length,
                  m = 0,
                  y = S,
                  b = E;
                for (n = e.lastIndexOf(N), n < 0 && (n = 0), r = 0; r < n; ++r)
                  e.charCodeAt(r) >= 128 && o('not-basic'), g.push(e.charCodeAt(r));
                for (i = n > 0 ? n + 1 : 0; i < v; ) {
                  for (
                    s = m, a = 1, c = T;
                    i >= v && o('invalid-input'),
                      (p = l(e.charCodeAt(i++))),
                      (p >= T || p > R((w - m) / a)) && o('overflow'),
                      (m += p * a),
                      (h = c <= b ? C : c >= b + j ? j : c - b),
                      !(p < h);
                    c += T
                  )
                    (d = T - h), a > R(w / d) && o('overflow'), (a *= d);
                  (t = g.length + 1),
                    (b = f(m - s, t, 0 == s)),
                    R(m / t) > w - y && o('overflow'),
                    (y += R(m / t)),
                    (m %= t),
                    g.splice(m++, 0, y);
                }
                return u(g);
              }
              function h(e) {
                var t,
                  n,
                  r,
                  i,
                  s,
                  u,
                  l,
                  p,
                  h,
                  d,
                  g,
                  v,
                  m,
                  y,
                  b,
                  x = [];
                for (e = a(e), v = e.length, t = S, n = 0, s = E, u = 0; u < v; ++u)
                  (g = e[u]), g < 128 && x.push(P(g));
                for (r = i = x.length, i && x.push(N); r < v; ) {
                  for (l = w, u = 0; u < v; ++u) (g = e[u]), g >= t && g < l && (l = g);
                  for (
                    m = r + 1,
                      l - t > R((w - n) / m) && o('overflow'),
                      n += (l - t) * m,
                      t = l,
                      u = 0;
                    u < v;
                    ++u
                  )
                    if (((g = e[u]), g < t && ++n > w && o('overflow'), g == t)) {
                      for (
                        p = n, h = T;
                        (d = h <= s ? C : h >= s + j ? j : h - s), !(p < d);
                        h += T
                      )
                        (b = p - d), (y = T - d), x.push(P(c(d + (b % y), 0))), (p = R(b / y));
                      x.push(P(c(p, 0))), (s = f(n, m, r == i)), (n = 0), ++r;
                    }
                  ++n, ++t;
                }
                return x.join('');
              }
              function d(e) {
                return s(e, function (e) {
                  return q.test(e) ? p(e.slice(4).toLowerCase()) : e;
                });
              }
              function g(e) {
                return s(e, function (e) {
                  return D.test(e) ? 'xn--' + h(e) : e;
                });
              }
              var v = 'object' == typeof n && n && !n.nodeType && n,
                m = 'object' == typeof t && t && !t.nodeType && t,
                y = 'object' == typeof e && e;
              (y.global !== y && y.window !== y && y.self !== y) || (r = y);
              var b,
                x,
                w = 2147483647,
                T = 36,
                C = 1,
                j = 26,
                A = 38,
                k = 700,
                E = 72,
                S = 128,
                N = '-',
                q = /^xn--/,
                D = /[^\x20-\x7E]/,
                L = /[\x2E\u3002\uFF0E\uFF61]/g,
                O = {
                  overflow: 'Overflow: input needs wider integers to process',
                  'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                  'invalid-input': 'Invalid input',
                },
                H = T - C,
                R = Math.floor,
                P = String.fromCharCode;
              if (
                ((b = {
                  version: '1.4.1',
                  ucs2: { decode: a, encode: u },
                  decode: p,
                  encode: h,
                  toASCII: g,
                  toUnicode: d,
                }),
                'function' == typeof define && 'object' == typeof define.amd && define.amd)
              )
                define('punycode', function () {
                  return b;
                });
              else if (v && m)
                if (t.exports == v) m.exports = b;
                else for (x in b) b.hasOwnProperty(x) && (v[x] = b[x]);
              else r.punycode = b;
            })(this);
          }).call(this);
        }).call(
          this,
          'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : {},
        );
      },
      {},
    ],
    2: [
      function (e, t, n) {
        !(function (e, n) {
          'use strict';
          'object' == typeof t && 'object' == typeof t.exports
            ? (t.exports = e.document
                ? n(e, !0)
                : function (e) {
                    if (!e.document) throw new Error('jQuery requires a window with a document');
                    return n(e);
                  })
            : n(e);
        })('undefined' != typeof window ? window : this, function (e, t) {
          'use strict';
          function n(e, t, n) {
            n = n || we;
            var r,
              o,
              i = n.createElement('script');
            if (((i.text = e), t))
              for (r in Te)
                (o = t[r] || (t.getAttribute && t.getAttribute(r))), o && i.setAttribute(r, o);
            n.head.appendChild(i).parentNode.removeChild(i);
          }
          function r(e) {
            return null == e
              ? e + ''
              : 'object' == typeof e || 'function' == typeof e
              ? he[de.call(e)] || 'object'
              : typeof e;
          }
          function o(e) {
            var t = !!e && 'length' in e && e.length,
              n = r(e);
            return (
              !be(e) &&
              !xe(e) &&
              ('array' === n || 0 === t || ('number' == typeof t && t > 0 && t - 1 in e))
            );
          }
          function i(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
          }
          function s(e, t, n) {
            return be(t)
              ? je.grep(e, function (e, r) {
                  return !!t.call(e, r, e) !== n;
                })
              : t.nodeType
              ? je.grep(e, function (e) {
                  return (e === t) !== n;
                })
              : 'string' != typeof t
              ? je.grep(e, function (e) {
                  return pe.call(t, e) > -1 !== n;
                })
              : je.filter(t, e, n);
          }
          function a(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType; );
            return e;
          }
          function u(e) {
            var t = {};
            return (
              je.each(e.match(Re) || [], function (e, n) {
                t[n] = !0;
              }),
              t
            );
          }
          function l(e) {
            return e;
          }
          function c(e) {
            throw e;
          }
          function f(e, t, n, r) {
            var o;
            try {
              e && be((o = e.promise))
                ? o.call(e).done(t).fail(n)
                : e && be((o = e.then))
                ? o.call(e, t, n)
                : t.apply(void 0, [e].slice(r));
            } catch (e) {
              n.apply(void 0, [e]);
            }
          }
          function p() {
            we.removeEventListener('DOMContentLoaded', p),
              e.removeEventListener('load', p),
              je.ready();
          }
          function h(e, t) {
            return t.toUpperCase();
          }
          function d(e) {
            return e.replace(Fe, 'ms-').replace($e, h);
          }
          function g() {
            this.expando = je.expando + g.uid++;
          }
          function v(e) {
            return (
              'true' === e ||
              ('false' !== e &&
                ('null' === e ? null : e === +e + '' ? +e : Ue.test(e) ? JSON.parse(e) : e))
            );
          }
          function m(e, t, n) {
            var r;
            if (void 0 === n && 1 === e.nodeType)
              if (
                ((r = 'data-' + t.replace(ze, '-$&').toLowerCase()),
                (n = e.getAttribute(r)),
                'string' == typeof n)
              ) {
                try {
                  n = v(n);
                } catch (e) {}
                _e.set(e, t, n);
              } else n = void 0;
            return n;
          }
          function y(e, t, n, r) {
            var o,
              i,
              s = 20,
              a = r
                ? function () {
                    return r.cur();
                  }
                : function () {
                    return je.css(e, t, '');
                  },
              u = a(),
              l = (n && n[3]) || (je.cssNumber[t] ? '' : 'px'),
              c = e.nodeType && (je.cssNumber[t] || ('px' !== l && +u)) && Ve.exec(je.css(e, t));
            if (c && c[3] !== l) {
              for (u /= 2, l = l || c[3], c = +u || 1; s--; )
                je.style(e, t, c + l),
                  (1 - i) * (1 - (i = a() / u || 0.5)) <= 0 && (s = 0),
                  (c /= i);
              (c = 2 * c), je.style(e, t, c + l), (n = n || []);
            }
            return (
              n &&
                ((c = +c || +u || 0),
                (o = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
                r && ((r.unit = l), (r.start = c), (r.end = o))),
              o
            );
          }
          function b(e) {
            var t,
              n = e.ownerDocument,
              r = e.nodeName,
              o = Ze[r];
            return o
              ? o
              : ((t = n.body.appendChild(n.createElement(r))),
                (o = je.css(t, 'display')),
                t.parentNode.removeChild(t),
                'none' === o && (o = 'block'),
                (Ze[r] = o),
                o);
          }
          function x(e, t) {
            for (var n, r, o = [], i = 0, s = e.length; i < s; i++)
              (r = e[i]),
                r.style &&
                  ((n = r.style.display),
                  t
                    ? ('none' === n &&
                        ((o[i] = Be.get(r, 'display') || null), o[i] || (r.style.display = '')),
                      '' === r.style.display && Ke(r) && (o[i] = b(r)))
                    : 'none' !== n && ((o[i] = 'none'), Be.set(r, 'display', n)));
            for (i = 0; i < s; i++) null != o[i] && (e[i].style.display = o[i]);
            return e;
          }
          function w(e, t) {
            var n;
            return (
              (n =
                'undefined' != typeof e.getElementsByTagName
                  ? e.getElementsByTagName(t || '*')
                  : 'undefined' != typeof e.querySelectorAll
                  ? e.querySelectorAll(t || '*')
                  : []),
              void 0 === t || (t && i(e, t)) ? je.merge([e], n) : n
            );
          }
          function T(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
              Be.set(e[n], 'globalEval', !t || Be.get(t[n], 'globalEval'));
          }
          function C(e, t, n, o, i) {
            for (
              var s, a, u, l, c, f, p = t.createDocumentFragment(), h = [], d = 0, g = e.length;
              d < g;
              d++
            )
              if (((s = e[d]), s || 0 === s))
                if ('object' === r(s)) je.merge(h, s.nodeType ? [s] : s);
                else if (ot.test(s)) {
                  for (
                    a = a || p.appendChild(t.createElement('div')),
                      u = (tt.exec(s) || ['', ''])[1].toLowerCase(),
                      l = rt[u] || rt._default,
                      a.innerHTML = l[1] + je.htmlPrefilter(s) + l[2],
                      f = l[0];
                    f--;

                  )
                    a = a.lastChild;
                  je.merge(h, a.childNodes), (a = p.firstChild), (a.textContent = '');
                } else h.push(t.createTextNode(s));
            for (p.textContent = '', d = 0; (s = h[d++]); )
              if (o && je.inArray(s, o) > -1) i && i.push(s);
              else if (((c = Qe(s)), (a = w(p.appendChild(s), 'script')), c && T(a), n))
                for (f = 0; (s = a[f++]); ) nt.test(s.type || '') && n.push(s);
            return p;
          }
          function j() {
            return !0;
          }
          function A() {
            return !1;
          }
          function k(e, t) {
            return (e === E()) == ('focus' === t);
          }
          function E() {
            try {
              return we.activeElement;
            } catch (e) {}
          }
          function S(e, t, n, r, o, i) {
            var s, a;
            if ('object' == typeof t) {
              'string' != typeof n && ((r = r || n), (n = void 0));
              for (a in t) S(e, a, n, r, t[a], i);
              return e;
            }
            if (
              (null == r && null == o
                ? ((o = n), (r = n = void 0))
                : null == o &&
                  ('string' == typeof n
                    ? ((o = r), (r = void 0))
                    : ((o = r), (r = n), (n = void 0))),
              o === !1)
            )
              o = A;
            else if (!o) return e;
            return (
              1 === i &&
                ((s = o),
                (o = function (e) {
                  return je().off(e), s.apply(this, arguments);
                }),
                (o.guid = s.guid || (s.guid = je.guid++))),
              e.each(function () {
                je.event.add(this, t, o, r, n);
              })
            );
          }
          function N(e, t, n) {
            return n
              ? (Be.set(e, t, !1),
                void je.event.add(e, t, {
                  namespace: !1,
                  handler: function (e) {
                    var r,
                      o,
                      i = Be.get(this, t);
                    if (1 & e.isTrigger && this[t]) {
                      if (i.length) (je.event.special[t] || {}).delegateType && e.stopPropagation();
                      else if (
                        ((i = le.call(arguments)),
                        Be.set(this, t, i),
                        (r = n(this, t)),
                        this[t](),
                        (o = Be.get(this, t)),
                        i !== o || r ? Be.set(this, t, !1) : (o = {}),
                        i !== o)
                      )
                        return e.stopImmediatePropagation(), e.preventDefault(), o.value;
                    } else
                      i.length &&
                        (Be.set(this, t, {
                          value: je.event.trigger(
                            je.extend(i[0], je.Event.prototype),
                            i.slice(1),
                            this,
                          ),
                        }),
                        e.stopImmediatePropagation());
                  },
                }))
              : void (void 0 === Be.get(e, t) && je.event.add(e, t, j));
          }
          function q(e, t) {
            return i(e, 'table') && i(11 !== t.nodeType ? t : t.firstChild, 'tr')
              ? je(e).children('tbody')[0] || e
              : e;
          }
          function D(e) {
            return (e.type = (null !== e.getAttribute('type')) + '/' + e.type), e;
          }
          function L(e) {
            return (
              'true/' === (e.type || '').slice(0, 5)
                ? (e.type = e.type.slice(5))
                : e.removeAttribute('type'),
              e
            );
          }
          function O(e, t) {
            var n, r, o, i, s, a, u;
            if (1 === t.nodeType) {
              if (Be.hasData(e) && ((i = Be.get(e)), (u = i.events))) {
                Be.remove(t, 'handle events');
                for (o in u) for (n = 0, r = u[o].length; n < r; n++) je.event.add(t, o, u[o][n]);
              }
              _e.hasData(e) && ((s = _e.access(e)), (a = je.extend({}, s)), _e.set(t, a));
            }
          }
          function H(e, t) {
            var n = t.nodeName.toLowerCase();
            'input' === n && et.test(e.type)
              ? (t.checked = e.checked)
              : ('input' !== n && 'textarea' !== n) || (t.defaultValue = e.defaultValue);
          }
          function R(e, t, r, o) {
            t = ce(t);
            var i,
              s,
              a,
              u,
              l,
              c,
              f = 0,
              p = e.length,
              h = p - 1,
              d = t[0],
              g = be(d);
            if (g || (p > 1 && 'string' == typeof d && !ye.checkClone && lt.test(d)))
              return e.each(function (n) {
                var i = e.eq(n);
                g && (t[0] = d.call(this, n, i.html())), R(i, t, r, o);
              });
            if (
              p &&
              ((i = C(t, e[0].ownerDocument, !1, e, o)),
              (s = i.firstChild),
              1 === i.childNodes.length && (i = s),
              s || o)
            ) {
              for (a = je.map(w(i, 'script'), D), u = a.length; f < p; f++)
                (l = i),
                  f !== h && ((l = je.clone(l, !0, !0)), u && je.merge(a, w(l, 'script'))),
                  r.call(e[f], l, f);
              if (u)
                for (c = a[a.length - 1].ownerDocument, je.map(a, L), f = 0; f < u; f++)
                  (l = a[f]),
                    nt.test(l.type || '') &&
                      !Be.access(l, 'globalEval') &&
                      je.contains(c, l) &&
                      (l.src && 'module' !== (l.type || '').toLowerCase()
                        ? je._evalUrl &&
                          !l.noModule &&
                          je._evalUrl(l.src, { nonce: l.nonce || l.getAttribute('nonce') }, c)
                        : n(l.textContent.replace(ct, ''), l, c));
            }
            return e;
          }
          function P(e, t, n) {
            for (var r, o = t ? je.filter(t, e) : e, i = 0; null != (r = o[i]); i++)
              n || 1 !== r.nodeType || je.cleanData(w(r)),
                r.parentNode && (n && Qe(r) && T(w(r, 'script')), r.parentNode.removeChild(r));
            return e;
          }
          function I(e, t, n) {
            var r,
              o,
              i,
              s,
              a = e.style;
            return (
              (n = n || pt(e)),
              n &&
                ((s = n.getPropertyValue(t) || n[t]),
                '' !== s || Qe(e) || (s = je.style(e, t)),
                !ye.pixelBoxStyles() &&
                  ft.test(s) &&
                  dt.test(t) &&
                  ((r = a.width),
                  (o = a.minWidth),
                  (i = a.maxWidth),
                  (a.minWidth = a.maxWidth = a.width = s),
                  (s = n.width),
                  (a.width = r),
                  (a.minWidth = o),
                  (a.maxWidth = i))),
              void 0 !== s ? s + '' : s
            );
          }
          function M(e, t) {
            return {
              get: function () {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments);
              },
            };
          }
          function F(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = gt.length; n--; )
              if (((e = gt[n] + t), e in vt)) return e;
          }
          function $(e) {
            var t = je.cssProps[e] || mt[e];
            return t ? t : e in vt ? e : (mt[e] = F(e) || e);
          }
          function W(e, t, n) {
            var r = Ve.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || 'px') : t;
          }
          function B(e, t, n, r, o, i) {
            var s = 'width' === t ? 1 : 0,
              a = 0,
              u = 0;
            if (n === (r ? 'border' : 'content')) return 0;
            for (; s < 4; s += 2)
              'margin' === n && (u += je.css(e, n + Ge[s], !0, o)),
                r
                  ? ('content' === n && (u -= je.css(e, 'padding' + Ge[s], !0, o)),
                    'margin' !== n && (u -= je.css(e, 'border' + Ge[s] + 'Width', !0, o)))
                  : ((u += je.css(e, 'padding' + Ge[s], !0, o)),
                    'padding' !== n
                      ? (u += je.css(e, 'border' + Ge[s] + 'Width', !0, o))
                      : (a += je.css(e, 'border' + Ge[s] + 'Width', !0, o)));
            return (
              !r &&
                i >= 0 &&
                (u +=
                  Math.max(
                    0,
                    Math.ceil(e['offset' + t[0].toUpperCase() + t.slice(1)] - i - u - a - 0.5),
                  ) || 0),
              u
            );
          }
          function _(e, t, n) {
            var r = pt(e),
              o = !ye.boxSizingReliable() || n,
              s = o && 'border-box' === je.css(e, 'boxSizing', !1, r),
              a = s,
              u = I(e, t, r),
              l = 'offset' + t[0].toUpperCase() + t.slice(1);
            if (ft.test(u)) {
              if (!n) return u;
              u = 'auto';
            }
            return (
              ((!ye.boxSizingReliable() && s) ||
                (!ye.reliableTrDimensions() && i(e, 'tr')) ||
                'auto' === u ||
                (!parseFloat(u) && 'inline' === je.css(e, 'display', !1, r))) &&
                e.getClientRects().length &&
                ((s = 'border-box' === je.css(e, 'boxSizing', !1, r)),
                (a = l in e),
                a && (u = e[l])),
              (u = parseFloat(u) || 0),
              u + B(e, t, n || (s ? 'border' : 'content'), a, r, u) + 'px'
            );
          }
          function U(e, t, n, r, o) {
            return new U.prototype.init(e, t, n, r, o);
          }
          function z() {
            Ct &&
              (we.hidden === !1 && e.requestAnimationFrame
                ? e.requestAnimationFrame(z)
                : e.setTimeout(z, je.fx.interval),
              je.fx.tick());
          }
          function X() {
            return (
              e.setTimeout(function () {
                Tt = void 0;
              }),
              (Tt = Date.now())
            );
          }
          function V(e, t) {
            var n,
              r = 0,
              o = { height: e };
            for (t = t ? 1 : 0; r < 4; r += 2 - t)
              (n = Ge[r]), (o['margin' + n] = o['padding' + n] = e);
            return t && (o.opacity = o.width = e), o;
          }
          function G(e, t, n) {
            for (
              var r, o = (J.tweeners[t] || []).concat(J.tweeners['*']), i = 0, s = o.length;
              i < s;
              i++
            )
              if ((r = o[i].call(n, t, e))) return r;
          }
          function Y(e, t, n) {
            var r,
              o,
              i,
              s,
              a,
              u,
              l,
              c,
              f = 'width' in t || 'height' in t,
              p = this,
              h = {},
              d = e.style,
              g = e.nodeType && Ke(e),
              v = Be.get(e, 'fxshow');
            n.queue ||
              ((s = je._queueHooks(e, 'fx')),
              null == s.unqueued &&
                ((s.unqueued = 0),
                (a = s.empty.fire),
                (s.empty.fire = function () {
                  s.unqueued || a();
                })),
              s.unqueued++,
              p.always(function () {
                p.always(function () {
                  s.unqueued--, je.queue(e, 'fx').length || s.empty.fire();
                });
              }));
            for (r in t)
              if (((o = t[r]), jt.test(o))) {
                if ((delete t[r], (i = i || 'toggle' === o), o === (g ? 'hide' : 'show'))) {
                  if ('show' !== o || !v || void 0 === v[r]) continue;
                  g = !0;
                }
                h[r] = (v && v[r]) || je.style(e, r);
              }
            if (((u = !je.isEmptyObject(t)), u || !je.isEmptyObject(h))) {
              f &&
                1 === e.nodeType &&
                ((n.overflow = [d.overflow, d.overflowX, d.overflowY]),
                (l = v && v.display),
                null == l && (l = Be.get(e, 'display')),
                (c = je.css(e, 'display')),
                'none' === c &&
                  (l
                    ? (c = l)
                    : (x([e], !0), (l = e.style.display || l), (c = je.css(e, 'display')), x([e]))),
                ('inline' === c || ('inline-block' === c && null != l)) &&
                  'none' === je.css(e, 'float') &&
                  (u ||
                    (p.done(function () {
                      d.display = l;
                    }),
                    null == l && ((c = d.display), (l = 'none' === c ? '' : c))),
                  (d.display = 'inline-block'))),
                n.overflow &&
                  ((d.overflow = 'hidden'),
                  p.always(function () {
                    (d.overflow = n.overflow[0]),
                      (d.overflowX = n.overflow[1]),
                      (d.overflowY = n.overflow[2]);
                  })),
                (u = !1);
              for (r in h)
                u ||
                  (v
                    ? 'hidden' in v && (g = v.hidden)
                    : (v = Be.access(e, 'fxshow', { display: l })),
                  i && (v.hidden = !g),
                  g && x([e], !0),
                  p.done(function () {
                    g || x([e]), Be.remove(e, 'fxshow');
                    for (r in h) je.style(e, r, h[r]);
                  })),
                  (u = G(g ? v[r] : 0, r, p)),
                  r in v || ((v[r] = u.start), g && ((u.end = u.start), (u.start = 0)));
            }
          }
          function Q(e, t) {
            var n, r, o, i, s;
            for (n in e)
              if (
                ((r = d(n)),
                (o = t[r]),
                (i = e[n]),
                Array.isArray(i) && ((o = i[1]), (i = e[n] = i[0])),
                n !== r && ((e[r] = i), delete e[n]),
                (s = je.cssHooks[r]),
                s && 'expand' in s)
              ) {
                (i = s.expand(i)), delete e[r];
                for (n in i) n in e || ((e[n] = i[n]), (t[n] = o));
              } else t[r] = o;
          }
          function J(e, t, n) {
            var r,
              o,
              i = 0,
              s = J.prefilters.length,
              a = je.Deferred().always(function () {
                delete u.elem;
              }),
              u = function () {
                if (o) return !1;
                for (
                  var t = Tt || X(),
                    n = Math.max(0, l.startTime + l.duration - t),
                    r = n / l.duration || 0,
                    i = 1 - r,
                    s = 0,
                    u = l.tweens.length;
                  s < u;
                  s++
                )
                  l.tweens[s].run(i);
                return (
                  a.notifyWith(e, [l, i, n]),
                  i < 1 && u ? n : (u || a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l]), !1)
                );
              },
              l = a.promise({
                elem: e,
                props: je.extend({}, t),
                opts: je.extend(!0, { specialEasing: {}, easing: je.easing._default }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Tt || X(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                  var r = je.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                  return l.tweens.push(r), r;
                },
                stop: function (t) {
                  var n = 0,
                    r = t ? l.tweens.length : 0;
                  if (o) return this;
                  for (o = !0; n < r; n++) l.tweens[n].run(1);
                  return (
                    t
                      ? (a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l, t]))
                      : a.rejectWith(e, [l, t]),
                    this
                  );
                },
              }),
              c = l.props;
            for (Q(c, l.opts.specialEasing); i < s; i++)
              if ((r = J.prefilters[i].call(l, e, c, l.opts)))
                return (
                  be(r.stop) && (je._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r
                );
            return (
              je.map(c, G, l),
              be(l.opts.start) && l.opts.start.call(e, l),
              l
                .progress(l.opts.progress)
                .done(l.opts.done, l.opts.complete)
                .fail(l.opts.fail)
                .always(l.opts.always),
              je.fx.timer(je.extend(u, { elem: e, anim: l, queue: l.opts.queue })),
              l
            );
          }
          function K(e) {
            var t = e.match(Re) || [];
            return t.join(' ');
          }
          function Z(e) {
            return (e.getAttribute && e.getAttribute('class')) || '';
          }
          function ee(e) {
            return Array.isArray(e) ? e : 'string' == typeof e ? e.match(Re) || [] : [];
          }
          function te(e, t, n, o) {
            var i;
            if (Array.isArray(t))
              je.each(t, function (t, r) {
                n || Pt.test(e)
                  ? o(e, r)
                  : te(e + '[' + ('object' == typeof r && null != r ? t : '') + ']', r, n, o);
              });
            else if (n || 'object' !== r(t)) o(e, t);
            else for (i in t) te(e + '[' + i + ']', t[i], n, o);
          }
          function ne(e) {
            return function (t, n) {
              'string' != typeof t && ((n = t), (t = '*'));
              var r,
                o = 0,
                i = t.toLowerCase().match(Re) || [];
              if (be(n))
                for (; (r = i[o++]); )
                  '+' === r[0]
                    ? ((r = r.slice(1) || '*'), (e[r] = e[r] || []).unshift(n))
                    : (e[r] = e[r] || []).push(n);
            };
          }
          function re(e, t, n, r) {
            function o(a) {
              var u;
              return (
                (i[a] = !0),
                je.each(e[a] || [], function (e, a) {
                  var l = a(t, n, r);
                  return 'string' != typeof l || s || i[l]
                    ? s
                      ? !(u = l)
                      : void 0
                    : (t.dataTypes.unshift(l), o(l), !1);
                }),
                u
              );
            }
            var i = {},
              s = e === Gt;
            return o(t.dataTypes[0]) || (!i['*'] && o('*'));
          }
          function oe(e, t) {
            var n,
              r,
              o = je.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]);
            return r && je.extend(!0, e, r), e;
          }
          function ie(e, t, n) {
            for (var r, o, i, s, a = e.contents, u = e.dataTypes; '*' === u[0]; )
              u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader('Content-Type'));
            if (r)
              for (o in a)
                if (a[o] && a[o].test(r)) {
                  u.unshift(o);
                  break;
                }
            if (u[0] in n) i = u[0];
            else {
              for (o in n) {
                if (!u[0] || e.converters[o + ' ' + u[0]]) {
                  i = o;
                  break;
                }
                s || (s = o);
              }
              i = i || s;
            }
            if (i) return i !== u[0] && u.unshift(i), n[i];
          }
          function se(e, t, n, r) {
            var o,
              i,
              s,
              a,
              u,
              l = {},
              c = e.dataTypes.slice();
            if (c[1]) for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
            for (i = c.shift(); i; )
              if (
                (e.responseFields[i] && (n[e.responseFields[i]] = t),
                !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                (u = i),
                (i = c.shift()))
              )
                if ('*' === i) i = u;
                else if ('*' !== u && u !== i) {
                  if (((s = l[u + ' ' + i] || l['* ' + i]), !s))
                    for (o in l)
                      if (
                        ((a = o.split(' ')),
                        a[1] === i && (s = l[u + ' ' + a[0]] || l['* ' + a[0]]))
                      ) {
                        s === !0 ? (s = l[o]) : l[o] !== !0 && ((i = a[0]), c.unshift(a[1]));
                        break;
                      }
                  if (s !== !0)
                    if (s && e.throws) t = s(t);
                    else
                      try {
                        t = s(t);
                      } catch (e) {
                        return {
                          state: 'parsererror',
                          error: s ? e : 'No conversion from ' + u + ' to ' + i,
                        };
                      }
                }
            return { state: 'success', data: t };
          }
          var ae = [],
            ue = Object.getPrototypeOf,
            le = ae.slice,
            ce = ae.flat
              ? function (e) {
                  return ae.flat.call(e);
                }
              : function (e) {
                  return ae.concat.apply([], e);
                },
            fe = ae.push,
            pe = ae.indexOf,
            he = {},
            de = he.toString,
            ge = he.hasOwnProperty,
            ve = ge.toString,
            me = ve.call(Object),
            ye = {},
            be = function (e) {
              return 'function' == typeof e && 'number' != typeof e.nodeType;
            },
            xe = function (e) {
              return null != e && e === e.window;
            },
            we = e.document,
            Te = { type: !0, src: !0, nonce: !0, noModule: !0 },
            Ce = '3.5.1',
            je = function (e, t) {
              return new je.fn.init(e, t);
            };
          (je.fn = je.prototype =
            {
              jquery: Ce,
              constructor: je,
              length: 0,
              toArray: function () {
                return le.call(this);
              },
              get: function (e) {
                return null == e ? le.call(this) : e < 0 ? this[e + this.length] : this[e];
              },
              pushStack: function (e) {
                var t = je.merge(this.constructor(), e);
                return (t.prevObject = this), t;
              },
              each: function (e) {
                return je.each(this, e);
              },
              map: function (e) {
                return this.pushStack(
                  je.map(this, function (t, n) {
                    return e.call(t, n, t);
                  }),
                );
              },
              slice: function () {
                return this.pushStack(le.apply(this, arguments));
              },
              first: function () {
                return this.eq(0);
              },
              last: function () {
                return this.eq(-1);
              },
              even: function () {
                return this.pushStack(
                  je.grep(this, function (e, t) {
                    return (t + 1) % 2;
                  }),
                );
              },
              odd: function () {
                return this.pushStack(
                  je.grep(this, function (e, t) {
                    return t % 2;
                  }),
                );
              },
              eq: function (e) {
                var t = this.length,
                  n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
              },
              end: function () {
                return this.prevObject || this.constructor();
              },
              push: fe,
              sort: ae.sort,
              splice: ae.splice,
            }),
            (je.extend = je.fn.extend =
              function () {
                var e,
                  t,
                  n,
                  r,
                  o,
                  i,
                  s = arguments[0] || {},
                  a = 1,
                  u = arguments.length,
                  l = !1;
                for (
                  'boolean' == typeof s && ((l = s), (s = arguments[a] || {}), a++),
                    'object' == typeof s || be(s) || (s = {}),
                    a === u && ((s = this), a--);
                  a < u;
                  a++
                )
                  if (null != (e = arguments[a]))
                    for (t in e)
                      (r = e[t]),
                        '__proto__' !== t &&
                          s !== r &&
                          (l && r && (je.isPlainObject(r) || (o = Array.isArray(r)))
                            ? ((n = s[t]),
                              (i = o && !Array.isArray(n) ? [] : o || je.isPlainObject(n) ? n : {}),
                              (o = !1),
                              (s[t] = je.extend(l, i, r)))
                            : void 0 !== r && (s[t] = r));
                return s;
              }),
            je.extend({
              expando: 'jQuery' + (Ce + Math.random()).replace(/\D/g, ''),
              isReady: !0,
              error: function (e) {
                throw new Error(e);
              },
              noop: function () {},
              isPlainObject: function (e) {
                var t, n;
                return (
                  !(!e || '[object Object]' !== de.call(e)) &&
                  (!(t = ue(e)) ||
                    ((n = ge.call(t, 'constructor') && t.constructor),
                    'function' == typeof n && ve.call(n) === me))
                );
              },
              isEmptyObject: function (e) {
                var t;
                for (t in e) return !1;
                return !0;
              },
              globalEval: function (e, t, r) {
                n(e, { nonce: t && t.nonce }, r);
              },
              each: function (e, t) {
                var n,
                  r = 0;
                if (o(e)) for (n = e.length; r < n && t.call(e[r], r, e[r]) !== !1; r++);
                else for (r in e) if (t.call(e[r], r, e[r]) === !1) break;
                return e;
              },
              makeArray: function (e, t) {
                var n = t || [];
                return (
                  null != e &&
                    (o(Object(e)) ? je.merge(n, 'string' == typeof e ? [e] : e) : fe.call(n, e)),
                  n
                );
              },
              inArray: function (e, t, n) {
                return null == t ? -1 : pe.call(t, e, n);
              },
              merge: function (e, t) {
                for (var n = +t.length, r = 0, o = e.length; r < n; r++) e[o++] = t[r];
                return (e.length = o), e;
              },
              grep: function (e, t, n) {
                for (var r, o = [], i = 0, s = e.length, a = !n; i < s; i++)
                  (r = !t(e[i], i)), r !== a && o.push(e[i]);
                return o;
              },
              map: function (e, t, n) {
                var r,
                  i,
                  s = 0,
                  a = [];
                if (o(e))
                  for (r = e.length; s < r; s++) (i = t(e[s], s, n)), null != i && a.push(i);
                else for (s in e) (i = t(e[s], s, n)), null != i && a.push(i);
                return ce(a);
              },
              guid: 1,
              support: ye,
            }),
            'function' == typeof Symbol && (je.fn[Symbol.iterator] = ae[Symbol.iterator]),
            je.each(
              'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '),
              function (e, t) {
                he['[object ' + t + ']'] = t.toLowerCase();
              },
            );
          var Ae = (function (e) {
            function t(e, t, n, r) {
              var o,
                i,
                s,
                a,
                u,
                l,
                c,
                p = t && t.ownerDocument,
                d = t ? t.nodeType : 9;
              if (((n = n || []), 'string' != typeof e || !e || (1 !== d && 9 !== d && 11 !== d)))
                return n;
              if (!r && (L(t), (t = t || O), R)) {
                if (11 !== d && (u = be.exec(e)))
                  if ((o = u[1])) {
                    if (9 === d) {
                      if (!(s = t.getElementById(o))) return n;
                      if (s.id === o) return n.push(s), n;
                    } else if (p && (s = p.getElementById(o)) && F(t, s) && s.id === o)
                      return n.push(s), n;
                  } else {
                    if (u[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
                    if ((o = u[3]) && T.getElementsByClassName && t.getElementsByClassName)
                      return Z.apply(n, t.getElementsByClassName(o)), n;
                  }
                if (
                  T.qsa &&
                  !V[e + ' '] &&
                  (!P || !P.test(e)) &&
                  (1 !== d || 'object' !== t.nodeName.toLowerCase())
                ) {
                  if (((c = e), (p = t), 1 === d && (fe.test(e) || ce.test(e)))) {
                    for (
                      p = (xe.test(e) && f(t.parentNode)) || t,
                        (p === t && T.scope) ||
                          ((a = t.getAttribute('id'))
                            ? (a = a.replace(Ce, je))
                            : t.setAttribute('id', (a = $))),
                        l = k(e),
                        i = l.length;
                      i--;

                    )
                      l[i] = (a ? '#' + a : ':scope') + ' ' + h(l[i]);
                    c = l.join(',');
                  }
                  try {
                    return Z.apply(n, p.querySelectorAll(c)), n;
                  } catch (t) {
                    V(e, !0);
                  } finally {
                    a === $ && t.removeAttribute('id');
                  }
                }
              }
              return S(e.replace(ue, '$1'), t, n, r);
            }
            function n() {
              function e(n, r) {
                return t.push(n + ' ') > C.cacheLength && delete e[t.shift()], (e[n + ' '] = r);
              }
              var t = [];
              return e;
            }
            function r(e) {
              return (e[$] = !0), e;
            }
            function o(e) {
              var t = O.createElement('fieldset');
              try {
                return !!e(t);
              } catch (e) {
                return !1;
              } finally {
                t.parentNode && t.parentNode.removeChild(t), (t = null);
              }
            }
            function i(e, t) {
              for (var n = e.split('|'), r = n.length; r--; ) C.attrHandle[n[r]] = t;
            }
            function s(e, t) {
              var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
              if (r) return r;
              if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
              return e ? 1 : -1;
            }
            function a(e) {
              return function (t) {
                var n = t.nodeName.toLowerCase();
                return 'input' === n && t.type === e;
              };
            }
            function u(e) {
              return function (t) {
                var n = t.nodeName.toLowerCase();
                return ('input' === n || 'button' === n) && t.type === e;
              };
            }
            function l(e) {
              return function (t) {
                return 'form' in t
                  ? t.parentNode && t.disabled === !1
                    ? 'label' in t
                      ? 'label' in t.parentNode
                        ? t.parentNode.disabled === e
                        : t.disabled === e
                      : t.isDisabled === e || (t.isDisabled !== !e && ke(t) === e)
                    : t.disabled === e
                  : 'label' in t && t.disabled === e;
              };
            }
            function c(e) {
              return r(function (t) {
                return (
                  (t = +t),
                  r(function (n, r) {
                    for (var o, i = e([], n.length, t), s = i.length; s--; )
                      n[(o = i[s])] && (n[o] = !(r[o] = n[o]));
                  })
                );
              });
            }
            function f(e) {
              return e && 'undefined' != typeof e.getElementsByTagName && e;
            }
            function p() {}
            function h(e) {
              for (var t = 0, n = e.length, r = ''; t < n; t++) r += e[t].value;
              return r;
            }
            function d(e, t, n) {
              var r = t.dir,
                o = t.next,
                i = o || r,
                s = n && 'parentNode' === i,
                a = _++;
              return t.first
                ? function (t, n, o) {
                    for (; (t = t[r]); ) if (1 === t.nodeType || s) return e(t, n, o);
                    return !1;
                  }
                : function (t, n, u) {
                    var l,
                      c,
                      f,
                      p = [B, a];
                    if (u) {
                      for (; (t = t[r]); ) if ((1 === t.nodeType || s) && e(t, n, u)) return !0;
                    } else
                      for (; (t = t[r]); )
                        if (1 === t.nodeType || s)
                          if (
                            ((f = t[$] || (t[$] = {})),
                            (c = f[t.uniqueID] || (f[t.uniqueID] = {})),
                            o && o === t.nodeName.toLowerCase())
                          )
                            t = t[r] || t;
                          else {
                            if ((l = c[i]) && l[0] === B && l[1] === a) return (p[2] = l[2]);
                            if (((c[i] = p), (p[2] = e(t, n, u)))) return !0;
                          }
                    return !1;
                  };
            }
            function g(e) {
              return e.length > 1
                ? function (t, n, r) {
                    for (var o = e.length; o--; ) if (!e[o](t, n, r)) return !1;
                    return !0;
                  }
                : e[0];
            }
            function v(e, n, r) {
              for (var o = 0, i = n.length; o < i; o++) t(e, n[o], r);
              return r;
            }
            function m(e, t, n, r, o) {
              for (var i, s = [], a = 0, u = e.length, l = null != t; a < u; a++)
                (i = e[a]) && ((n && !n(i, r, o)) || (s.push(i), l && t.push(a)));
              return s;
            }
            function y(e, t, n, o, i, s) {
              return (
                o && !o[$] && (o = y(o)),
                i && !i[$] && (i = y(i, s)),
                r(function (r, s, a, u) {
                  var l,
                    c,
                    f,
                    p = [],
                    h = [],
                    d = s.length,
                    g = r || v(t || '*', a.nodeType ? [a] : a, []),
                    y = !e || (!r && t) ? g : m(g, p, e, a, u),
                    b = n ? (i || (r ? e : d || o) ? [] : s) : y;
                  if ((n && n(y, b, a, u), o))
                    for (l = m(b, h), o(l, [], a, u), c = l.length; c--; )
                      (f = l[c]) && (b[h[c]] = !(y[h[c]] = f));
                  if (r) {
                    if (i || e) {
                      if (i) {
                        for (l = [], c = b.length; c--; ) (f = b[c]) && l.push((y[c] = f));
                        i(null, (b = []), l, u);
                      }
                      for (c = b.length; c--; )
                        (f = b[c]) && (l = i ? te(r, f) : p[c]) > -1 && (r[l] = !(s[l] = f));
                    }
                  } else
                    (b = m(b === s ? b.splice(d, b.length) : b)),
                      i ? i(null, s, b, u) : Z.apply(s, b);
                })
              );
            }
            function b(e) {
              for (
                var t,
                  n,
                  r,
                  o = e.length,
                  i = C.relative[e[0].type],
                  s = i || C.relative[' '],
                  a = i ? 1 : 0,
                  u = d(
                    function (e) {
                      return e === t;
                    },
                    s,
                    !0,
                  ),
                  l = d(
                    function (e) {
                      return te(t, e) > -1;
                    },
                    s,
                    !0,
                  ),
                  c = [
                    function (e, n, r) {
                      var o =
                        (!i && (r || n !== N)) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                      return (t = null), o;
                    },
                  ];
                a < o;
                a++
              )
                if ((n = C.relative[e[a].type])) c = [d(g(c), n)];
                else {
                  if (((n = C.filter[e[a].type].apply(null, e[a].matches)), n[$])) {
                    for (r = ++a; r < o && !C.relative[e[r].type]; r++);
                    return y(
                      a > 1 && g(c),
                      a > 1 &&
                        h(
                          e.slice(0, a - 1).concat({ value: ' ' === e[a - 2].type ? '*' : '' }),
                        ).replace(ue, '$1'),
                      n,
                      a < r && b(e.slice(a, r)),
                      r < o && b((e = e.slice(r))),
                      r < o && h(e),
                    );
                  }
                  c.push(n);
                }
              return g(c);
            }
            function x(e, n) {
              var o = n.length > 0,
                i = e.length > 0,
                s = function (r, s, a, u, l) {
                  var c,
                    f,
                    p,
                    h = 0,
                    d = '0',
                    g = r && [],
                    v = [],
                    y = N,
                    b = r || (i && C.find.TAG('*', l)),
                    x = (B += null == y ? 1 : Math.random() || 0.1),
                    w = b.length;
                  for (l && (N = s == O || s || l); d !== w && null != (c = b[d]); d++) {
                    if (i && c) {
                      for (f = 0, s || c.ownerDocument == O || (L(c), (a = !R)); (p = e[f++]); )
                        if (p(c, s || O, a)) {
                          u.push(c);
                          break;
                        }
                      l && (B = x);
                    }
                    o && ((c = !p && c) && h--, r && g.push(c));
                  }
                  if (((h += d), o && d !== h)) {
                    for (f = 0; (p = n[f++]); ) p(g, v, s, a);
                    if (r) {
                      if (h > 0) for (; d--; ) g[d] || v[d] || (v[d] = J.call(u));
                      v = m(v);
                    }
                    Z.apply(u, v), l && !r && v.length > 0 && h + n.length > 1 && t.uniqueSort(u);
                  }
                  return l && ((B = x), (N = y)), g;
                };
              return o ? r(s) : s;
            }
            var w,
              T,
              C,
              j,
              A,
              k,
              E,
              S,
              N,
              q,
              D,
              L,
              O,
              H,
              R,
              P,
              I,
              M,
              F,
              $ = 'sizzle' + 1 * new Date(),
              W = e.document,
              B = 0,
              _ = 0,
              U = n(),
              z = n(),
              X = n(),
              V = n(),
              G = function (e, t) {
                return e === t && (D = !0), 0;
              },
              Y = {}.hasOwnProperty,
              Q = [],
              J = Q.pop,
              K = Q.push,
              Z = Q.push,
              ee = Q.slice,
              te = function (e, t) {
                for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
                return -1;
              },
              ne =
                'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
              re = '[\\x20\\t\\r\\n\\f]',
              oe = '(?:\\\\[\\da-fA-F]{1,6}' + re + '?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+',
              ie =
                '\\[' +
                re +
                '*(' +
                oe +
                ')(?:' +
                re +
                '*([*^$|!~]?=)' +
                re +
                '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
                oe +
                '))|)' +
                re +
                '*\\]',
              se =
                ':(' +
                oe +
                ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
                ie +
                ')*)|.*)\\)|)',
              ae = new RegExp(re + '+', 'g'),
              ue = new RegExp('^' + re + '+|((?:^|[^\\\\])(?:\\\\.)*)' + re + '+$', 'g'),
              le = new RegExp('^' + re + '*,' + re + '*'),
              ce = new RegExp('^' + re + '*([>+~]|' + re + ')' + re + '*'),
              fe = new RegExp(re + '|>'),
              pe = new RegExp(se),
              he = new RegExp('^' + oe + '$'),
              de = {
                ID: new RegExp('^#(' + oe + ')'),
                CLASS: new RegExp('^\\.(' + oe + ')'),
                TAG: new RegExp('^(' + oe + '|[*])'),
                ATTR: new RegExp('^' + ie),
                PSEUDO: new RegExp('^' + se),
                CHILD: new RegExp(
                  '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
                    re +
                    '*(even|odd|(([+-]|)(\\d*)n|)' +
                    re +
                    '*(?:([+-]|)' +
                    re +
                    '*(\\d+)|))' +
                    re +
                    '*\\)|)',
                  'i',
                ),
                bool: new RegExp('^(?:' + ne + ')$', 'i'),
                needsContext: new RegExp(
                  '^' +
                    re +
                    '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
                    re +
                    '*((?:-\\d)?\\d*)' +
                    re +
                    '*\\)|)(?=[^-]|$)',
                  'i',
                ),
              },
              ge = /HTML$/i,
              ve = /^(?:input|select|textarea|button)$/i,
              me = /^h\d$/i,
              ye = /^[^{]+\{\s*\[native \w/,
              be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              xe = /[+~]/,
              we = new RegExp('\\\\[\\da-fA-F]{1,6}' + re + '?|\\\\([^\\r\\n\\f])', 'g'),
              Te = function (e, t) {
                var n = '0x' + e.slice(1) - 65536;
                return t
                  ? t
                  : n < 0
                  ? String.fromCharCode(n + 65536)
                  : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
              },
              Ce = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
              je = function (e, t) {
                return t
                  ? '\0' === e
                    ? '�'
                    : e.slice(0, -1) + '\\' + e.charCodeAt(e.length - 1).toString(16) + ' '
                  : '\\' + e;
              },
              Ae = function () {
                L();
              },
              ke = d(
                function (e) {
                  return e.disabled === !0 && 'fieldset' === e.nodeName.toLowerCase();
                },
                { dir: 'parentNode', next: 'legend' },
              );
            try {
              Z.apply((Q = ee.call(W.childNodes)), W.childNodes), Q[W.childNodes.length].nodeType;
            } catch (e) {
              Z = {
                apply: Q.length
                  ? function (e, t) {
                      K.apply(e, ee.call(t));
                    }
                  : function (e, t) {
                      for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                      e.length = n - 1;
                    },
              };
            }
            (T = t.support = {}),
              (A = t.isXML =
                function (e) {
                  var t = e.namespaceURI,
                    n = (e.ownerDocument || e).documentElement;
                  return !ge.test(t || (n && n.nodeName) || 'HTML');
                }),
              (L = t.setDocument =
                function (e) {
                  var t,
                    n,
                    r = e ? e.ownerDocument || e : W;
                  return r != O && 9 === r.nodeType && r.documentElement
                    ? ((O = r),
                      (H = O.documentElement),
                      (R = !A(O)),
                      W != O &&
                        (n = O.defaultView) &&
                        n.top !== n &&
                        (n.addEventListener
                          ? n.addEventListener('unload', Ae, !1)
                          : n.attachEvent && n.attachEvent('onunload', Ae)),
                      (T.scope = o(function (e) {
                        return (
                          H.appendChild(e).appendChild(O.createElement('div')),
                          'undefined' != typeof e.querySelectorAll &&
                            !e.querySelectorAll(':scope fieldset div').length
                        );
                      })),
                      (T.attributes = o(function (e) {
                        return (e.className = 'i'), !e.getAttribute('className');
                      })),
                      (T.getElementsByTagName = o(function (e) {
                        return (
                          e.appendChild(O.createComment('')), !e.getElementsByTagName('*').length
                        );
                      })),
                      (T.getElementsByClassName = ye.test(O.getElementsByClassName)),
                      (T.getById = o(function (e) {
                        return (
                          (H.appendChild(e).id = $),
                          !O.getElementsByName || !O.getElementsByName($).length
                        );
                      })),
                      T.getById
                        ? ((C.filter.ID = function (e) {
                            var t = e.replace(we, Te);
                            return function (e) {
                              return e.getAttribute('id') === t;
                            };
                          }),
                          (C.find.ID = function (e, t) {
                            if ('undefined' != typeof t.getElementById && R) {
                              var n = t.getElementById(e);
                              return n ? [n] : [];
                            }
                          }))
                        : ((C.filter.ID = function (e) {
                            var t = e.replace(we, Te);
                            return function (e) {
                              var n =
                                'undefined' != typeof e.getAttributeNode &&
                                e.getAttributeNode('id');
                              return n && n.value === t;
                            };
                          }),
                          (C.find.ID = function (e, t) {
                            if ('undefined' != typeof t.getElementById && R) {
                              var n,
                                r,
                                o,
                                i = t.getElementById(e);
                              if (i) {
                                if (((n = i.getAttributeNode('id')), n && n.value === e))
                                  return [i];
                                for (o = t.getElementsByName(e), r = 0; (i = o[r++]); )
                                  if (((n = i.getAttributeNode('id')), n && n.value === e))
                                    return [i];
                              }
                              return [];
                            }
                          })),
                      (C.find.TAG = T.getElementsByTagName
                        ? function (e, t) {
                            return 'undefined' != typeof t.getElementsByTagName
                              ? t.getElementsByTagName(e)
                              : T.qsa
                              ? t.querySelectorAll(e)
                              : void 0;
                          }
                        : function (e, t) {
                            var n,
                              r = [],
                              o = 0,
                              i = t.getElementsByTagName(e);
                            if ('*' === e) {
                              for (; (n = i[o++]); ) 1 === n.nodeType && r.push(n);
                              return r;
                            }
                            return i;
                          }),
                      (C.find.CLASS =
                        T.getElementsByClassName &&
                        function (e, t) {
                          if ('undefined' != typeof t.getElementsByClassName && R)
                            return t.getElementsByClassName(e);
                        }),
                      (I = []),
                      (P = []),
                      (T.qsa = ye.test(O.querySelectorAll)) &&
                        (o(function (e) {
                          var t;
                          (H.appendChild(e).innerHTML =
                            "<a id='" +
                            $ +
                            "'></a><select id='" +
                            $ +
                            "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                            e.querySelectorAll("[msallowcapture^='']").length &&
                              P.push('[*^$]=' + re + '*(?:\'\'|"")'),
                            e.querySelectorAll('[selected]').length ||
                              P.push('\\[' + re + '*(?:value|' + ne + ')'),
                            e.querySelectorAll('[id~=' + $ + '-]').length || P.push('~='),
                            (t = O.createElement('input')),
                            t.setAttribute('name', ''),
                            e.appendChild(t),
                            e.querySelectorAll("[name='']").length ||
                              P.push('\\[' + re + '*name' + re + '*=' + re + '*(?:\'\'|"")'),
                            e.querySelectorAll(':checked').length || P.push(':checked'),
                            e.querySelectorAll('a#' + $ + '+*').length || P.push('.#.+[+~]'),
                            e.querySelectorAll('\\\f'),
                            P.push('[\\r\\n\\f]');
                        }),
                        o(function (e) {
                          e.innerHTML =
                            "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                          var t = O.createElement('input');
                          t.setAttribute('type', 'hidden'),
                            e.appendChild(t).setAttribute('name', 'D'),
                            e.querySelectorAll('[name=d]').length &&
                              P.push('name' + re + '*[*^$|!~]?='),
                            2 !== e.querySelectorAll(':enabled').length &&
                              P.push(':enabled', ':disabled'),
                            (H.appendChild(e).disabled = !0),
                            2 !== e.querySelectorAll(':disabled').length &&
                              P.push(':enabled', ':disabled'),
                            e.querySelectorAll('*,:x'),
                            P.push(',.*:');
                        })),
                      (T.matchesSelector = ye.test(
                        (M =
                          H.matches ||
                          H.webkitMatchesSelector ||
                          H.mozMatchesSelector ||
                          H.oMatchesSelector ||
                          H.msMatchesSelector),
                      )) &&
                        o(function (e) {
                          (T.disconnectedMatch = M.call(e, '*')),
                            M.call(e, "[s!='']:x"),
                            I.push('!=', se);
                        }),
                      (P = P.length && new RegExp(P.join('|'))),
                      (I = I.length && new RegExp(I.join('|'))),
                      (t = ye.test(H.compareDocumentPosition)),
                      (F =
                        t || ye.test(H.contains)
                          ? function (e, t) {
                              var n = 9 === e.nodeType ? e.documentElement : e,
                                r = t && t.parentNode;
                              return (
                                e === r ||
                                !(
                                  !r ||
                                  1 !== r.nodeType ||
                                  !(n.contains
                                    ? n.contains(r)
                                    : e.compareDocumentPosition &&
                                      16 & e.compareDocumentPosition(r))
                                )
                              );
                            }
                          : function (e, t) {
                              if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                              return !1;
                            }),
                      (G = t
                        ? function (e, t) {
                            if (e === t) return (D = !0), 0;
                            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                            return n
                              ? n
                              : ((n =
                                  (e.ownerDocument || e) == (t.ownerDocument || t)
                                    ? e.compareDocumentPosition(t)
                                    : 1),
                                1 & n || (!T.sortDetached && t.compareDocumentPosition(e) === n)
                                  ? e == O || (e.ownerDocument == W && F(W, e))
                                    ? -1
                                    : t == O || (t.ownerDocument == W && F(W, t))
                                    ? 1
                                    : q
                                    ? te(q, e) - te(q, t)
                                    : 0
                                  : 4 & n
                                  ? -1
                                  : 1);
                          }
                        : function (e, t) {
                            if (e === t) return (D = !0), 0;
                            var n,
                              r = 0,
                              o = e.parentNode,
                              i = t.parentNode,
                              a = [e],
                              u = [t];
                            if (!o || !i)
                              return e == O
                                ? -1
                                : t == O
                                ? 1
                                : o
                                ? -1
                                : i
                                ? 1
                                : q
                                ? te(q, e) - te(q, t)
                                : 0;
                            if (o === i) return s(e, t);
                            for (n = e; (n = n.parentNode); ) a.unshift(n);
                            for (n = t; (n = n.parentNode); ) u.unshift(n);
                            for (; a[r] === u[r]; ) r++;
                            return r ? s(a[r], u[r]) : a[r] == W ? -1 : u[r] == W ? 1 : 0;
                          }),
                      O)
                    : O;
                }),
              (t.matches = function (e, n) {
                return t(e, null, null, n);
              }),
              (t.matchesSelector = function (e, n) {
                if (
                  (L(e),
                  T.matchesSelector && R && !V[n + ' '] && (!I || !I.test(n)) && (!P || !P.test(n)))
                )
                  try {
                    var r = M.call(e, n);
                    if (r || T.disconnectedMatch || (e.document && 11 !== e.document.nodeType))
                      return r;
                  } catch (e) {
                    V(n, !0);
                  }
                return t(n, O, null, [e]).length > 0;
              }),
              (t.contains = function (e, t) {
                return (e.ownerDocument || e) != O && L(e), F(e, t);
              }),
              (t.attr = function (e, t) {
                (e.ownerDocument || e) != O && L(e);
                var n = C.attrHandle[t.toLowerCase()],
                  r = n && Y.call(C.attrHandle, t.toLowerCase()) ? n(e, t, !R) : void 0;
                return void 0 !== r
                  ? r
                  : T.attributes || !R
                  ? e.getAttribute(t)
                  : (r = e.getAttributeNode(t)) && r.specified
                  ? r.value
                  : null;
              }),
              (t.escape = function (e) {
                return (e + '').replace(Ce, je);
              }),
              (t.error = function (e) {
                throw new Error('Syntax error, unrecognized expression: ' + e);
              }),
              (t.uniqueSort = function (e) {
                var t,
                  n = [],
                  r = 0,
                  o = 0;
                if (((D = !T.detectDuplicates), (q = !T.sortStable && e.slice(0)), e.sort(G), D)) {
                  for (; (t = e[o++]); ) t === e[o] && (r = n.push(o));
                  for (; r--; ) e.splice(n[r], 1);
                }
                return (q = null), e;
              }),
              (j = t.getText =
                function (e) {
                  var t,
                    n = '',
                    r = 0,
                    o = e.nodeType;
                  if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                      if ('string' == typeof e.textContent) return e.textContent;
                      for (e = e.firstChild; e; e = e.nextSibling) n += j(e);
                    } else if (3 === o || 4 === o) return e.nodeValue;
                  } else for (; (t = e[r++]); ) n += j(t);
                  return n;
                }),
              (C = t.selectors =
                {
                  cacheLength: 50,
                  createPseudo: r,
                  match: de,
                  attrHandle: {},
                  find: {},
                  relative: {
                    '>': { dir: 'parentNode', first: !0 },
                    ' ': { dir: 'parentNode' },
                    '+': { dir: 'previousSibling', first: !0 },
                    '~': { dir: 'previousSibling' },
                  },
                  preFilter: {
                    ATTR: function (e) {
                      return (
                        (e[1] = e[1].replace(we, Te)),
                        (e[3] = (e[3] || e[4] || e[5] || '').replace(we, Te)),
                        '~=' === e[2] && (e[3] = ' ' + e[3] + ' '),
                        e.slice(0, 4)
                      );
                    },
                    CHILD: function (e) {
                      return (
                        (e[1] = e[1].toLowerCase()),
                        'nth' === e[1].slice(0, 3)
                          ? (e[3] || t.error(e[0]),
                            (e[4] = +(e[4]
                              ? e[5] + (e[6] || 1)
                              : 2 * ('even' === e[3] || 'odd' === e[3]))),
                            (e[5] = +(e[7] + e[8] || 'odd' === e[3])))
                          : e[3] && t.error(e[0]),
                        e
                      );
                    },
                    PSEUDO: function (e) {
                      var t,
                        n = !e[6] && e[2];
                      return de.CHILD.test(e[0])
                        ? null
                        : (e[3]
                            ? (e[2] = e[4] || e[5] || '')
                            : n &&
                              pe.test(n) &&
                              (t = k(n, !0)) &&
                              (t = n.indexOf(')', n.length - t) - n.length) &&
                              ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                          e.slice(0, 3));
                    },
                  },
                  filter: {
                    TAG: function (e) {
                      var t = e.replace(we, Te).toLowerCase();
                      return '*' === e
                        ? function () {
                            return !0;
                          }
                        : function (e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t;
                          };
                    },
                    CLASS: function (e) {
                      var t = U[e + ' '];
                      return (
                        t ||
                        ((t = new RegExp('(^|' + re + ')' + e + '(' + re + '|$)')) &&
                          U(e, function (e) {
                            return t.test(
                              ('string' == typeof e.className && e.className) ||
                                ('undefined' != typeof e.getAttribute && e.getAttribute('class')) ||
                                '',
                            );
                          }))
                      );
                    },
                    ATTR: function (e, n, r) {
                      return function (o) {
                        var i = t.attr(o, e);
                        return null == i
                          ? '!=' === n
                          : !n ||
                              ((i += ''),
                              '=' === n
                                ? i === r
                                : '!=' === n
                                ? i !== r
                                : '^=' === n
                                ? r && 0 === i.indexOf(r)
                                : '*=' === n
                                ? r && i.indexOf(r) > -1
                                : '$=' === n
                                ? r && i.slice(-r.length) === r
                                : '~=' === n
                                ? (' ' + i.replace(ae, ' ') + ' ').indexOf(r) > -1
                                : '|=' === n && (i === r || i.slice(0, r.length + 1) === r + '-'));
                      };
                    },
                    CHILD: function (e, t, n, r, o) {
                      var i = 'nth' !== e.slice(0, 3),
                        s = 'last' !== e.slice(-4),
                        a = 'of-type' === t;
                      return 1 === r && 0 === o
                        ? function (e) {
                            return !!e.parentNode;
                          }
                        : function (t, n, u) {
                            var l,
                              c,
                              f,
                              p,
                              h,
                              d,
                              g = i !== s ? 'nextSibling' : 'previousSibling',
                              v = t.parentNode,
                              m = a && t.nodeName.toLowerCase(),
                              y = !u && !a,
                              b = !1;
                            if (v) {
                              if (i) {
                                for (; g; ) {
                                  for (p = t; (p = p[g]); )
                                    if (a ? p.nodeName.toLowerCase() === m : 1 === p.nodeType)
                                      return !1;
                                  d = g = 'only' === e && !d && 'nextSibling';
                                }
                                return !0;
                              }
                              if (((d = [s ? v.firstChild : v.lastChild]), s && y)) {
                                for (
                                  p = v,
                                    f = p[$] || (p[$] = {}),
                                    c = f[p.uniqueID] || (f[p.uniqueID] = {}),
                                    l = c[e] || [],
                                    h = l[0] === B && l[1],
                                    b = h && l[2],
                                    p = h && v.childNodes[h];
                                  (p = (++h && p && p[g]) || (b = h = 0) || d.pop());

                                )
                                  if (1 === p.nodeType && ++b && p === t) {
                                    c[e] = [B, h, b];
                                    break;
                                  }
                              } else if (
                                (y &&
                                  ((p = t),
                                  (f = p[$] || (p[$] = {})),
                                  (c = f[p.uniqueID] || (f[p.uniqueID] = {})),
                                  (l = c[e] || []),
                                  (h = l[0] === B && l[1]),
                                  (b = h)),
                                b === !1)
                              )
                                for (
                                  ;
                                  (p = (++h && p && p[g]) || (b = h = 0) || d.pop()) &&
                                  ((a ? p.nodeName.toLowerCase() !== m : 1 !== p.nodeType) ||
                                    !++b ||
                                    (y &&
                                      ((f = p[$] || (p[$] = {})),
                                      (c = f[p.uniqueID] || (f[p.uniqueID] = {})),
                                      (c[e] = [B, b])),
                                    p !== t));

                                );
                              return (b -= o), b === r || (b % r === 0 && b / r >= 0);
                            }
                          };
                    },
                    PSEUDO: function (e, n) {
                      var o,
                        i =
                          C.pseudos[e] ||
                          C.setFilters[e.toLowerCase()] ||
                          t.error('unsupported pseudo: ' + e);
                      return i[$]
                        ? i(n)
                        : i.length > 1
                        ? ((o = [e, e, '', n]),
                          C.setFilters.hasOwnProperty(e.toLowerCase())
                            ? r(function (e, t) {
                                for (var r, o = i(e, n), s = o.length; s--; )
                                  (r = te(e, o[s])), (e[r] = !(t[r] = o[s]));
                              })
                            : function (e) {
                                return i(e, 0, o);
                              })
                        : i;
                    },
                  },
                  pseudos: {
                    not: r(function (e) {
                      var t = [],
                        n = [],
                        o = E(e.replace(ue, '$1'));
                      return o[$]
                        ? r(function (e, t, n, r) {
                            for (var i, s = o(e, null, r, []), a = e.length; a--; )
                              (i = s[a]) && (e[a] = !(t[a] = i));
                          })
                        : function (e, r, i) {
                            return (t[0] = e), o(t, null, i, n), (t[0] = null), !n.pop();
                          };
                    }),
                    has: r(function (e) {
                      return function (n) {
                        return t(e, n).length > 0;
                      };
                    }),
                    contains: r(function (e) {
                      return (
                        (e = e.replace(we, Te)),
                        function (t) {
                          return (t.textContent || j(t)).indexOf(e) > -1;
                        }
                      );
                    }),
                    lang: r(function (e) {
                      return (
                        he.test(e || '') || t.error('unsupported lang: ' + e),
                        (e = e.replace(we, Te).toLowerCase()),
                        function (t) {
                          var n;
                          do
                            if (
                              (n = R
                                ? t.lang
                                : t.getAttribute('xml:lang') || t.getAttribute('lang'))
                            )
                              return (n = n.toLowerCase()), n === e || 0 === n.indexOf(e + '-');
                          while ((t = t.parentNode) && 1 === t.nodeType);
                          return !1;
                        }
                      );
                    }),
                    target: function (t) {
                      var n = e.location && e.location.hash;
                      return n && n.slice(1) === t.id;
                    },
                    root: function (e) {
                      return e === H;
                    },
                    focus: function (e) {
                      return (
                        e === O.activeElement &&
                        (!O.hasFocus || O.hasFocus()) &&
                        !!(e.type || e.href || ~e.tabIndex)
                      );
                    },
                    enabled: l(!1),
                    disabled: l(!0),
                    checked: function (e) {
                      var t = e.nodeName.toLowerCase();
                      return ('input' === t && !!e.checked) || ('option' === t && !!e.selected);
                    },
                    selected: function (e) {
                      return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
                    },
                    empty: function (e) {
                      for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                      return !0;
                    },
                    parent: function (e) {
                      return !C.pseudos.empty(e);
                    },
                    header: function (e) {
                      return me.test(e.nodeName);
                    },
                    input: function (e) {
                      return ve.test(e.nodeName);
                    },
                    button: function (e) {
                      var t = e.nodeName.toLowerCase();
                      return ('input' === t && 'button' === e.type) || 'button' === t;
                    },
                    text: function (e) {
                      var t;
                      return (
                        'input' === e.nodeName.toLowerCase() &&
                        'text' === e.type &&
                        (null == (t = e.getAttribute('type')) || 'text' === t.toLowerCase())
                      );
                    },
                    first: c(function () {
                      return [0];
                    }),
                    last: c(function (e, t) {
                      return [t - 1];
                    }),
                    eq: c(function (e, t, n) {
                      return [n < 0 ? n + t : n];
                    }),
                    even: c(function (e, t) {
                      for (var n = 0; n < t; n += 2) e.push(n);
                      return e;
                    }),
                    odd: c(function (e, t) {
                      for (var n = 1; n < t; n += 2) e.push(n);
                      return e;
                    }),
                    lt: c(function (e, t, n) {
                      for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0; ) e.push(r);
                      return e;
                    }),
                    gt: c(function (e, t, n) {
                      for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
                      return e;
                    }),
                  },
                }),
              (C.pseudos.nth = C.pseudos.eq);
            for (w in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
              C.pseudos[w] = a(w);
            for (w in { submit: !0, reset: !0 }) C.pseudos[w] = u(w);
            return (
              (p.prototype = C.filters = C.pseudos),
              (C.setFilters = new p()),
              (k = t.tokenize =
                function (e, n) {
                  var r,
                    o,
                    i,
                    s,
                    a,
                    u,
                    l,
                    c = z[e + ' '];
                  if (c) return n ? 0 : c.slice(0);
                  for (a = e, u = [], l = C.preFilter; a; ) {
                    (r && !(o = le.exec(a))) ||
                      (o && (a = a.slice(o[0].length) || a), u.push((i = []))),
                      (r = !1),
                      (o = ce.exec(a)) &&
                        ((r = o.shift()),
                        i.push({ value: r, type: o[0].replace(ue, ' ') }),
                        (a = a.slice(r.length)));
                    for (s in C.filter)
                      !(o = de[s].exec(a)) ||
                        (l[s] && !(o = l[s](o))) ||
                        ((r = o.shift()),
                        i.push({ value: r, type: s, matches: o }),
                        (a = a.slice(r.length)));
                    if (!r) break;
                  }
                  return n ? a.length : a ? t.error(e) : z(e, u).slice(0);
                }),
              (E = t.compile =
                function (e, t) {
                  var n,
                    r = [],
                    o = [],
                    i = X[e + ' '];
                  if (!i) {
                    for (t || (t = k(e)), n = t.length; n--; )
                      (i = b(t[n])), i[$] ? r.push(i) : o.push(i);
                    (i = X(e, x(o, r))), (i.selector = e);
                  }
                  return i;
                }),
              (S = t.select =
                function (e, t, n, r) {
                  var o,
                    i,
                    s,
                    a,
                    u,
                    l = 'function' == typeof e && e,
                    c = !r && k((e = l.selector || e));
                  if (((n = n || []), 1 === c.length)) {
                    if (
                      ((i = c[0] = c[0].slice(0)),
                      i.length > 2 &&
                        'ID' === (s = i[0]).type &&
                        9 === t.nodeType &&
                        R &&
                        C.relative[i[1].type])
                    ) {
                      if (((t = (C.find.ID(s.matches[0].replace(we, Te), t) || [])[0]), !t))
                        return n;
                      l && (t = t.parentNode), (e = e.slice(i.shift().value.length));
                    }
                    for (
                      o = de.needsContext.test(e) ? 0 : i.length;
                      o-- && ((s = i[o]), !C.relative[(a = s.type)]);

                    )
                      if (
                        (u = C.find[a]) &&
                        (r = u(
                          s.matches[0].replace(we, Te),
                          (xe.test(i[0].type) && f(t.parentNode)) || t,
                        ))
                      ) {
                        if ((i.splice(o, 1), (e = r.length && h(i)), !e)) return Z.apply(n, r), n;
                        break;
                      }
                  }
                  return (l || E(e, c))(r, t, !R, n, !t || (xe.test(e) && f(t.parentNode)) || t), n;
                }),
              (T.sortStable = $.split('').sort(G).join('') === $),
              (T.detectDuplicates = !!D),
              L(),
              (T.sortDetached = o(function (e) {
                return 1 & e.compareDocumentPosition(O.createElement('fieldset'));
              })),
              o(function (e) {
                return (
                  (e.innerHTML = "<a href='#'></a>"), '#' === e.firstChild.getAttribute('href')
                );
              }) ||
                i('type|href|height|width', function (e, t, n) {
                  if (!n) return e.getAttribute(t, 'type' === t.toLowerCase() ? 1 : 2);
                }),
              (T.attributes &&
                o(function (e) {
                  return (
                    (e.innerHTML = '<input/>'),
                    e.firstChild.setAttribute('value', ''),
                    '' === e.firstChild.getAttribute('value')
                  );
                })) ||
                i('value', function (e, t, n) {
                  if (!n && 'input' === e.nodeName.toLowerCase()) return e.defaultValue;
                }),
              o(function (e) {
                return null == e.getAttribute('disabled');
              }) ||
                i(ne, function (e, t, n) {
                  var r;
                  if (!n)
                    return e[t] === !0
                      ? t.toLowerCase()
                      : (r = e.getAttributeNode(t)) && r.specified
                      ? r.value
                      : null;
                }),
              t
            );
          })(e);
          (je.find = Ae),
            (je.expr = Ae.selectors),
            (je.expr[':'] = je.expr.pseudos),
            (je.uniqueSort = je.unique = Ae.uniqueSort),
            (je.text = Ae.getText),
            (je.isXMLDoc = Ae.isXML),
            (je.contains = Ae.contains),
            (je.escapeSelector = Ae.escape);
          var ke = function (e, t, n) {
              for (var r = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                if (1 === e.nodeType) {
                  if (o && je(e).is(n)) break;
                  r.push(e);
                }
              return r;
            },
            Ee = function (e, t) {
              for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
              return n;
            },
            Se = je.expr.match.needsContext,
            Ne = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
          (je.filter = function (e, t, n) {
            var r = t[0];
            return (
              n && (e = ':not(' + e + ')'),
              1 === t.length && 1 === r.nodeType
                ? je.find.matchesSelector(r, e)
                  ? [r]
                  : []
                : je.find.matches(
                    e,
                    je.grep(t, function (e) {
                      return 1 === e.nodeType;
                    }),
                  )
            );
          }),
            je.fn.extend({
              find: function (e) {
                var t,
                  n,
                  r = this.length,
                  o = this;
                if ('string' != typeof e)
                  return this.pushStack(
                    je(e).filter(function () {
                      for (t = 0; t < r; t++) if (je.contains(o[t], this)) return !0;
                    }),
                  );
                for (n = this.pushStack([]), t = 0; t < r; t++) je.find(e, o[t], n);
                return r > 1 ? je.uniqueSort(n) : n;
              },
              filter: function (e) {
                return this.pushStack(s(this, e || [], !1));
              },
              not: function (e) {
                return this.pushStack(s(this, e || [], !0));
              },
              is: function (e) {
                return !!s(this, 'string' == typeof e && Se.test(e) ? je(e) : e || [], !1).length;
              },
            });
          var qe,
            De = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
            Le = (je.fn.init = function (e, t, n) {
              var r, o;
              if (!e) return this;
              if (((n = n || qe), 'string' == typeof e)) {
                if (
                  ((r =
                    '<' === e[0] && '>' === e[e.length - 1] && e.length >= 3
                      ? [null, e, null]
                      : De.exec(e)),
                  !r || (!r[1] && t))
                )
                  return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                  if (
                    ((t = t instanceof je ? t[0] : t),
                    je.merge(
                      this,
                      je.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : we, !0),
                    ),
                    Ne.test(r[1]) && je.isPlainObject(t))
                  )
                    for (r in t) be(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                  return this;
                }
                return (o = we.getElementById(r[2])), o && ((this[0] = o), (this.length = 1)), this;
              }
              return e.nodeType
                ? ((this[0] = e), (this.length = 1), this)
                : be(e)
                ? void 0 !== n.ready
                  ? n.ready(e)
                  : e(je)
                : je.makeArray(e, this);
            });
          (Le.prototype = je.fn), (qe = je(we));
          var Oe = /^(?:parents|prev(?:Until|All))/,
            He = { children: !0, contents: !0, next: !0, prev: !0 };
          je.fn.extend({
            has: function (e) {
              var t = je(e, this),
                n = t.length;
              return this.filter(function () {
                for (var e = 0; e < n; e++) if (je.contains(this, t[e])) return !0;
              });
            },
            closest: function (e, t) {
              var n,
                r = 0,
                o = this.length,
                i = [],
                s = 'string' != typeof e && je(e);
              if (!Se.test(e))
                for (; r < o; r++)
                  for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (
                      n.nodeType < 11 &&
                      (s ? s.index(n) > -1 : 1 === n.nodeType && je.find.matchesSelector(n, e))
                    ) {
                      i.push(n);
                      break;
                    }
              return this.pushStack(i.length > 1 ? je.uniqueSort(i) : i);
            },
            index: function (e) {
              return e
                ? 'string' == typeof e
                  ? pe.call(je(e), this[0])
                  : pe.call(this, e.jquery ? e[0] : e)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
            },
            add: function (e, t) {
              return this.pushStack(je.uniqueSort(je.merge(this.get(), je(e, t))));
            },
            addBack: function (e) {
              return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
            },
          }),
            je.each(
              {
                parent: function (e) {
                  var t = e.parentNode;
                  return t && 11 !== t.nodeType ? t : null;
                },
                parents: function (e) {
                  return ke(e, 'parentNode');
                },
                parentsUntil: function (e, t, n) {
                  return ke(e, 'parentNode', n);
                },
                next: function (e) {
                  return a(e, 'nextSibling');
                },
                prev: function (e) {
                  return a(e, 'previousSibling');
                },
                nextAll: function (e) {
                  return ke(e, 'nextSibling');
                },
                prevAll: function (e) {
                  return ke(e, 'previousSibling');
                },
                nextUntil: function (e, t, n) {
                  return ke(e, 'nextSibling', n);
                },
                prevUntil: function (e, t, n) {
                  return ke(e, 'previousSibling', n);
                },
                siblings: function (e) {
                  return Ee((e.parentNode || {}).firstChild, e);
                },
                children: function (e) {
                  return Ee(e.firstChild);
                },
                contents: function (e) {
                  return null != e.contentDocument && ue(e.contentDocument)
                    ? e.contentDocument
                    : (i(e, 'template') && (e = e.content || e), je.merge([], e.childNodes));
                },
              },
              function (e, t) {
                je.fn[e] = function (n, r) {
                  var o = je.map(this, t, n);
                  return (
                    'Until' !== e.slice(-5) && (r = n),
                    r && 'string' == typeof r && (o = je.filter(r, o)),
                    this.length > 1 && (He[e] || je.uniqueSort(o), Oe.test(e) && o.reverse()),
                    this.pushStack(o)
                  );
                };
              },
            );
          var Re = /[^\x20\t\r\n\f]+/g;
          (je.Callbacks = function (e) {
            e = 'string' == typeof e ? u(e) : je.extend({}, e);
            var t,
              n,
              o,
              i,
              s = [],
              a = [],
              l = -1,
              c = function () {
                for (i = i || e.once, o = t = !0; a.length; l = -1)
                  for (n = a.shift(); ++l < s.length; )
                    s[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && ((l = s.length), (n = !1));
                e.memory || (n = !1), (t = !1), i && (s = n ? [] : '');
              },
              f = {
                add: function () {
                  return (
                    s &&
                      (n && !t && ((l = s.length - 1), a.push(n)),
                      (function t(n) {
                        je.each(n, function (n, o) {
                          be(o)
                            ? (e.unique && f.has(o)) || s.push(o)
                            : o && o.length && 'string' !== r(o) && t(o);
                        });
                      })(arguments),
                      n && !t && c()),
                    this
                  );
                },
                remove: function () {
                  return (
                    je.each(arguments, function (e, t) {
                      for (var n; (n = je.inArray(t, s, n)) > -1; ) s.splice(n, 1), n <= l && l--;
                    }),
                    this
                  );
                },
                has: function (e) {
                  return e ? je.inArray(e, s) > -1 : s.length > 0;
                },
                empty: function () {
                  return s && (s = []), this;
                },
                disable: function () {
                  return (i = a = []), (s = n = ''), this;
                },
                disabled: function () {
                  return !s;
                },
                lock: function () {
                  return (i = a = []), n || t || (s = n = ''), this;
                },
                locked: function () {
                  return !!i;
                },
                fireWith: function (e, n) {
                  return (
                    i || ((n = n || []), (n = [e, n.slice ? n.slice() : n]), a.push(n), t || c()),
                    this
                  );
                },
                fire: function () {
                  return f.fireWith(this, arguments), this;
                },
                fired: function () {
                  return !!o;
                },
              };
            return f;
          }),
            je.extend({
              Deferred: function (t) {
                var n = [
                    ['notify', 'progress', je.Callbacks('memory'), je.Callbacks('memory'), 2],
                    [
                      'resolve',
                      'done',
                      je.Callbacks('once memory'),
                      je.Callbacks('once memory'),
                      0,
                      'resolved',
                    ],
                    [
                      'reject',
                      'fail',
                      je.Callbacks('once memory'),
                      je.Callbacks('once memory'),
                      1,
                      'rejected',
                    ],
                  ],
                  r = 'pending',
                  o = {
                    state: function () {
                      return r;
                    },
                    always: function () {
                      return i.done(arguments).fail(arguments), this;
                    },
                    catch: function (e) {
                      return o.then(null, e);
                    },
                    pipe: function () {
                      var e = arguments;
                      return je
                        .Deferred(function (t) {
                          je.each(n, function (n, r) {
                            var o = be(e[r[4]]) && e[r[4]];
                            i[r[1]](function () {
                              var e = o && o.apply(this, arguments);
                              e && be(e.promise)
                                ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject)
                                : t[r[0] + 'With'](this, o ? [e] : arguments);
                            });
                          }),
                            (e = null);
                        })
                        .promise();
                    },
                    then: function (t, r, o) {
                      function i(t, n, r, o) {
                        return function () {
                          var a = this,
                            u = arguments,
                            f = function () {
                              var e, f;
                              if (!(t < s)) {
                                if (((e = r.apply(a, u)), e === n.promise()))
                                  throw new TypeError('Thenable self-resolution');
                                (f =
                                  e && ('object' == typeof e || 'function' == typeof e) && e.then),
                                  be(f)
                                    ? o
                                      ? f.call(e, i(s, n, l, o), i(s, n, c, o))
                                      : (s++,
                                        f.call(
                                          e,
                                          i(s, n, l, o),
                                          i(s, n, c, o),
                                          i(s, n, l, n.notifyWith),
                                        ))
                                    : (r !== l && ((a = void 0), (u = [e])),
                                      (o || n.resolveWith)(a, u));
                              }
                            },
                            p = o
                              ? f
                              : function () {
                                  try {
                                    f();
                                  } catch (e) {
                                    je.Deferred.exceptionHook &&
                                      je.Deferred.exceptionHook(e, p.stackTrace),
                                      t + 1 >= s &&
                                        (r !== c && ((a = void 0), (u = [e])), n.rejectWith(a, u));
                                  }
                                };
                          t
                            ? p()
                            : (je.Deferred.getStackHook &&
                                (p.stackTrace = je.Deferred.getStackHook()),
                              e.setTimeout(p));
                        };
                      }
                      var s = 0;
                      return je
                        .Deferred(function (e) {
                          n[0][3].add(i(0, e, be(o) ? o : l, e.notifyWith)),
                            n[1][3].add(i(0, e, be(t) ? t : l)),
                            n[2][3].add(i(0, e, be(r) ? r : c));
                        })
                        .promise();
                    },
                    promise: function (e) {
                      return null != e ? je.extend(e, o) : o;
                    },
                  },
                  i = {};
                return (
                  je.each(n, function (e, t) {
                    var s = t[2],
                      a = t[5];
                    (o[t[1]] = s.add),
                      a &&
                        s.add(
                          function () {
                            r = a;
                          },
                          n[3 - e][2].disable,
                          n[3 - e][3].disable,
                          n[0][2].lock,
                          n[0][3].lock,
                        ),
                      s.add(t[3].fire),
                      (i[t[0]] = function () {
                        return i[t[0] + 'With'](this === i ? void 0 : this, arguments), this;
                      }),
                      (i[t[0] + 'With'] = s.fireWith);
                  }),
                  o.promise(i),
                  t && t.call(i, i),
                  i
                );
              },
              when: function (e) {
                var t = arguments.length,
                  n = t,
                  r = Array(n),
                  o = le.call(arguments),
                  i = je.Deferred(),
                  s = function (e) {
                    return function (n) {
                      (r[e] = this),
                        (o[e] = arguments.length > 1 ? le.call(arguments) : n),
                        --t || i.resolveWith(r, o);
                    };
                  };
                if (
                  t <= 1 &&
                  (f(e, i.done(s(n)).resolve, i.reject, !t),
                  'pending' === i.state() || be(o[n] && o[n].then))
                )
                  return i.then();
                for (; n--; ) f(o[n], s(n), i.reject);
                return i.promise();
              },
            });
          var Pe = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
          (je.Deferred.exceptionHook = function (t, n) {
            e.console &&
              e.console.warn &&
              t &&
              Pe.test(t.name) &&
              e.console.warn('jQuery.Deferred exception: ' + t.message, t.stack, n);
          }),
            (je.readyException = function (t) {
              e.setTimeout(function () {
                throw t;
              });
            });
          var Ie = je.Deferred();
          (je.fn.ready = function (e) {
            return (
              Ie.then(e).catch(function (e) {
                je.readyException(e);
              }),
              this
            );
          }),
            je.extend({
              isReady: !1,
              readyWait: 1,
              ready: function (e) {
                (e === !0 ? --je.readyWait : je.isReady) ||
                  ((je.isReady = !0), (e !== !0 && --je.readyWait > 0) || Ie.resolveWith(we, [je]));
              },
            }),
            (je.ready.then = Ie.then),
            'complete' === we.readyState ||
            ('loading' !== we.readyState && !we.documentElement.doScroll)
              ? e.setTimeout(je.ready)
              : (we.addEventListener('DOMContentLoaded', p), e.addEventListener('load', p));
          var Me = function (e, t, n, o, i, s, a) {
              var u = 0,
                l = e.length,
                c = null == n;
              if ('object' === r(n)) {
                i = !0;
                for (u in n) Me(e, t, u, n[u], !0, s, a);
              } else if (
                void 0 !== o &&
                ((i = !0),
                be(o) || (a = !0),
                c &&
                  (a
                    ? (t.call(e, o), (t = null))
                    : ((c = t),
                      (t = function (e, t, n) {
                        return c.call(je(e), n);
                      }))),
                t)
              )
                for (; u < l; u++) t(e[u], n, a ? o : o.call(e[u], u, t(e[u], n)));
              return i ? e : c ? t.call(e) : l ? t(e[0], n) : s;
            },
            Fe = /^-ms-/,
            $e = /-([a-z])/g,
            We = function (e) {
              return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
            };
          (g.uid = 1),
            (g.prototype = {
              cache: function (e) {
                var t = e[this.expando];
                return (
                  t ||
                    ((t = {}),
                    We(e) &&
                      (e.nodeType
                        ? (e[this.expando] = t)
                        : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))),
                  t
                );
              },
              set: function (e, t, n) {
                var r,
                  o = this.cache(e);
                if ('string' == typeof t) o[d(t)] = n;
                else for (r in t) o[d(r)] = t[r];
                return o;
              },
              get: function (e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][d(t)];
              },
              access: function (e, t, n) {
                return void 0 === t || (t && 'string' == typeof t && void 0 === n)
                  ? this.get(e, t)
                  : (this.set(e, t, n), void 0 !== n ? n : t);
              },
              remove: function (e, t) {
                var n,
                  r = e[this.expando];
                if (void 0 !== r) {
                  if (void 0 !== t) {
                    Array.isArray(t)
                      ? (t = t.map(d))
                      : ((t = d(t)), (t = t in r ? [t] : t.match(Re) || [])),
                      (n = t.length);
                    for (; n--; ) delete r[t[n]];
                  }
                  (void 0 === t || je.isEmptyObject(r)) &&
                    (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
                }
              },
              hasData: function (e) {
                var t = e[this.expando];
                return void 0 !== t && !je.isEmptyObject(t);
              },
            });
          var Be = new g(),
            _e = new g(),
            Ue = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            ze = /[A-Z]/g;
          je.extend({
            hasData: function (e) {
              return _e.hasData(e) || Be.hasData(e);
            },
            data: function (e, t, n) {
              return _e.access(e, t, n);
            },
            removeData: function (e, t) {
              _e.remove(e, t);
            },
            _data: function (e, t, n) {
              return Be.access(e, t, n);
            },
            _removeData: function (e, t) {
              Be.remove(e, t);
            },
          }),
            je.fn.extend({
              data: function (e, t) {
                var n,
                  r,
                  o,
                  i = this[0],
                  s = i && i.attributes;
                if (void 0 === e) {
                  if (
                    this.length &&
                    ((o = _e.get(i)), 1 === i.nodeType && !Be.get(i, 'hasDataAttrs'))
                  ) {
                    for (n = s.length; n--; )
                      s[n] &&
                        ((r = s[n].name),
                        0 === r.indexOf('data-') && ((r = d(r.slice(5))), m(i, r, o[r])));
                    Be.set(i, 'hasDataAttrs', !0);
                  }
                  return o;
                }
                return 'object' == typeof e
                  ? this.each(function () {
                      _e.set(this, e);
                    })
                  : Me(
                      this,
                      function (t) {
                        var n;
                        if (i && void 0 === t) {
                          if (((n = _e.get(i, e)), void 0 !== n)) return n;
                          if (((n = m(i, e)), void 0 !== n)) return n;
                        } else
                          this.each(function () {
                            _e.set(this, e, t);
                          });
                      },
                      null,
                      t,
                      arguments.length > 1,
                      null,
                      !0,
                    );
              },
              removeData: function (e) {
                return this.each(function () {
                  _e.remove(this, e);
                });
              },
            }),
            je.extend({
              queue: function (e, t, n) {
                var r;
                if (e)
                  return (
                    (t = (t || 'fx') + 'queue'),
                    (r = Be.get(e, t)),
                    n &&
                      (!r || Array.isArray(n) ? (r = Be.access(e, t, je.makeArray(n))) : r.push(n)),
                    r || []
                  );
              },
              dequeue: function (e, t) {
                t = t || 'fx';
                var n = je.queue(e, t),
                  r = n.length,
                  o = n.shift(),
                  i = je._queueHooks(e, t),
                  s = function () {
                    je.dequeue(e, t);
                  };
                'inprogress' === o && ((o = n.shift()), r--),
                  o && ('fx' === t && n.unshift('inprogress'), delete i.stop, o.call(e, s, i)),
                  !r && i && i.empty.fire();
              },
              _queueHooks: function (e, t) {
                var n = t + 'queueHooks';
                return (
                  Be.get(e, n) ||
                  Be.access(e, n, {
                    empty: je.Callbacks('once memory').add(function () {
                      Be.remove(e, [t + 'queue', n]);
                    }),
                  })
                );
              },
            }),
            je.fn.extend({
              queue: function (e, t) {
                var n = 2;
                return (
                  'string' != typeof e && ((t = e), (e = 'fx'), n--),
                  arguments.length < n
                    ? je.queue(this[0], e)
                    : void 0 === t
                    ? this
                    : this.each(function () {
                        var n = je.queue(this, e, t);
                        je._queueHooks(this, e),
                          'fx' === e && 'inprogress' !== n[0] && je.dequeue(this, e);
                      })
                );
              },
              dequeue: function (e) {
                return this.each(function () {
                  je.dequeue(this, e);
                });
              },
              clearQueue: function (e) {
                return this.queue(e || 'fx', []);
              },
              promise: function (e, t) {
                var n,
                  r = 1,
                  o = je.Deferred(),
                  i = this,
                  s = this.length,
                  a = function () {
                    --r || o.resolveWith(i, [i]);
                  };
                for ('string' != typeof e && ((t = e), (e = void 0)), e = e || 'fx'; s--; )
                  (n = Be.get(i[s], e + 'queueHooks')), n && n.empty && (r++, n.empty.add(a));
                return a(), o.promise(t);
              },
            });
          var Xe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Ve = new RegExp('^(?:([+-])=|)(' + Xe + ')([a-z%]*)$', 'i'),
            Ge = ['Top', 'Right', 'Bottom', 'Left'],
            Ye = we.documentElement,
            Qe = function (e) {
              return je.contains(e.ownerDocument, e);
            },
            Je = { composed: !0 };
          Ye.getRootNode &&
            (Qe = function (e) {
              return je.contains(e.ownerDocument, e) || e.getRootNode(Je) === e.ownerDocument;
            });
          var Ke = function (e, t) {
              return (
                (e = t || e),
                'none' === e.style.display ||
                  ('' === e.style.display && Qe(e) && 'none' === je.css(e, 'display'))
              );
            },
            Ze = {};
          je.fn.extend({
            show: function () {
              return x(this, !0);
            },
            hide: function () {
              return x(this);
            },
            toggle: function (e) {
              return 'boolean' == typeof e
                ? e
                  ? this.show()
                  : this.hide()
                : this.each(function () {
                    Ke(this) ? je(this).show() : je(this).hide();
                  });
            },
          });
          var et = /^(?:checkbox|radio)$/i,
            tt = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            nt = /^$|^module$|\/(?:java|ecma)script/i;
          !(function () {
            var e = we.createDocumentFragment(),
              t = e.appendChild(we.createElement('div')),
              n = we.createElement('input');
            n.setAttribute('type', 'radio'),
              n.setAttribute('checked', 'checked'),
              n.setAttribute('name', 't'),
              t.appendChild(n),
              (ye.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked),
              (t.innerHTML = '<textarea>x</textarea>'),
              (ye.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue),
              (t.innerHTML = '<option></option>'),
              (ye.option = !!t.lastChild);
          })();
          var rt = {
            thead: [1, '<table>', '</table>'],
            col: [2, '<table><colgroup>', '</colgroup></table>'],
            tr: [2, '<table><tbody>', '</tbody></table>'],
            td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
            _default: [0, '', ''],
          };
          (rt.tbody = rt.tfoot = rt.colgroup = rt.caption = rt.thead),
            (rt.th = rt.td),
            ye.option ||
              (rt.optgroup = rt.option = [1, "<select multiple='multiple'>", '</select>']);
          var ot = /<|&#?\w+;/,
            it = /^key/,
            st = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            at = /^([^.]*)(?:\.(.+)|)/;
          (je.event = {
            global: {},
            add: function (e, t, n, r, o) {
              var i,
                s,
                a,
                u,
                l,
                c,
                f,
                p,
                h,
                d,
                g,
                v = Be.get(e);
              if (We(e))
                for (
                  n.handler && ((i = n), (n = i.handler), (o = i.selector)),
                    o && je.find.matchesSelector(Ye, o),
                    n.guid || (n.guid = je.guid++),
                    (u = v.events) || (u = v.events = Object.create(null)),
                    (s = v.handle) ||
                      (s = v.handle =
                        function (t) {
                          return 'undefined' != typeof je && je.event.triggered !== t.type
                            ? je.event.dispatch.apply(e, arguments)
                            : void 0;
                        }),
                    t = (t || '').match(Re) || [''],
                    l = t.length;
                  l--;

                )
                  (a = at.exec(t[l]) || []),
                    (h = g = a[1]),
                    (d = (a[2] || '').split('.').sort()),
                    h &&
                      ((f = je.event.special[h] || {}),
                      (h = (o ? f.delegateType : f.bindType) || h),
                      (f = je.event.special[h] || {}),
                      (c = je.extend(
                        {
                          type: h,
                          origType: g,
                          data: r,
                          handler: n,
                          guid: n.guid,
                          selector: o,
                          needsContext: o && je.expr.match.needsContext.test(o),
                          namespace: d.join('.'),
                        },
                        i,
                      )),
                      (p = u[h]) ||
                        ((p = u[h] = []),
                        (p.delegateCount = 0),
                        (f.setup && f.setup.call(e, r, d, s) !== !1) ||
                          (e.addEventListener && e.addEventListener(h, s))),
                      f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)),
                      o ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                      (je.event.global[h] = !0));
            },
            remove: function (e, t, n, r, o) {
              var i,
                s,
                a,
                u,
                l,
                c,
                f,
                p,
                h,
                d,
                g,
                v = Be.hasData(e) && Be.get(e);
              if (v && (u = v.events)) {
                for (t = (t || '').match(Re) || [''], l = t.length; l--; )
                  if (
                    ((a = at.exec(t[l]) || []),
                    (h = g = a[1]),
                    (d = (a[2] || '').split('.').sort()),
                    h)
                  ) {
                    for (
                      f = je.event.special[h] || {},
                        h = (r ? f.delegateType : f.bindType) || h,
                        p = u[h] || [],
                        a = a[2] && new RegExp('(^|\\.)' + d.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                        s = i = p.length;
                      i--;

                    )
                      (c = p[i]),
                        (!o && g !== c.origType) ||
                          (n && n.guid !== c.guid) ||
                          (a && !a.test(c.namespace)) ||
                          (r && r !== c.selector && ('**' !== r || !c.selector)) ||
                          (p.splice(i, 1),
                          c.selector && p.delegateCount--,
                          f.remove && f.remove.call(e, c));
                    s &&
                      !p.length &&
                      ((f.teardown && f.teardown.call(e, d, v.handle) !== !1) ||
                        je.removeEvent(e, h, v.handle),
                      delete u[h]);
                  } else for (h in u) je.event.remove(e, h + t[l], n, r, !0);
                je.isEmptyObject(u) && Be.remove(e, 'handle events');
              }
            },
            dispatch: function (e) {
              var t,
                n,
                r,
                o,
                i,
                s,
                a = new Array(arguments.length),
                u = je.event.fix(e),
                l = (Be.get(this, 'events') || Object.create(null))[u.type] || [],
                c = je.event.special[u.type] || {};
              for (a[0] = u, t = 1; t < arguments.length; t++) a[t] = arguments[t];
              if (
                ((u.delegateTarget = this), !c.preDispatch || c.preDispatch.call(this, u) !== !1)
              ) {
                for (
                  s = je.event.handlers.call(this, u, l), t = 0;
                  (o = s[t++]) && !u.isPropagationStopped();

                )
                  for (
                    u.currentTarget = o.elem, n = 0;
                    (i = o.handlers[n++]) && !u.isImmediatePropagationStopped();

                  )
                    (u.rnamespace && i.namespace !== !1 && !u.rnamespace.test(i.namespace)) ||
                      ((u.handleObj = i),
                      (u.data = i.data),
                      (r = ((je.event.special[i.origType] || {}).handle || i.handler).apply(
                        o.elem,
                        a,
                      )),
                      void 0 !== r &&
                        (u.result = r) === !1 &&
                        (u.preventDefault(), u.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, u), u.result;
              }
            },
            handlers: function (e, t) {
              var n,
                r,
                o,
                i,
                s,
                a = [],
                u = t.delegateCount,
                l = e.target;
              if (u && l.nodeType && !('click' === e.type && e.button >= 1))
                for (; l !== this; l = l.parentNode || this)
                  if (1 === l.nodeType && ('click' !== e.type || l.disabled !== !0)) {
                    for (i = [], s = {}, n = 0; n < u; n++)
                      (r = t[n]),
                        (o = r.selector + ' '),
                        void 0 === s[o] &&
                          (s[o] = r.needsContext
                            ? je(o, this).index(l) > -1
                            : je.find(o, this, null, [l]).length),
                        s[o] && i.push(r);
                    i.length && a.push({ elem: l, handlers: i });
                  }
              return (l = this), u < t.length && a.push({ elem: l, handlers: t.slice(u) }), a;
            },
            addProp: function (e, t) {
              Object.defineProperty(je.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: be(t)
                  ? function () {
                      if (this.originalEvent) return t(this.originalEvent);
                    }
                  : function () {
                      if (this.originalEvent) return this.originalEvent[e];
                    },
                set: function (t) {
                  Object.defineProperty(this, e, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: t,
                  });
                },
              });
            },
            fix: function (e) {
              return e[je.expando] ? e : new je.Event(e);
            },
            special: {
              load: { noBubble: !0 },
              click: {
                setup: function (e) {
                  var t = this || e;
                  return et.test(t.type) && t.click && i(t, 'input') && N(t, 'click', j), !1;
                },
                trigger: function (e) {
                  var t = this || e;
                  return et.test(t.type) && t.click && i(t, 'input') && N(t, 'click'), !0;
                },
                _default: function (e) {
                  var t = e.target;
                  return (
                    (et.test(t.type) && t.click && i(t, 'input') && Be.get(t, 'click')) || i(t, 'a')
                  );
                },
              },
              beforeunload: {
                postDispatch: function (e) {
                  void 0 !== e.result &&
                    e.originalEvent &&
                    (e.originalEvent.returnValue = e.result);
                },
              },
            },
          }),
            (je.removeEvent = function (e, t, n) {
              e.removeEventListener && e.removeEventListener(t, n);
            }),
            (je.Event = function (e, t) {
              return this instanceof je.Event
                ? (e && e.type
                    ? ((this.originalEvent = e),
                      (this.type = e.type),
                      (this.isDefaultPrevented =
                        e.defaultPrevented ||
                        (void 0 === e.defaultPrevented && e.returnValue === !1)
                          ? j
                          : A),
                      (this.target =
                        e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target),
                      (this.currentTarget = e.currentTarget),
                      (this.relatedTarget = e.relatedTarget))
                    : (this.type = e),
                  t && je.extend(this, t),
                  (this.timeStamp = (e && e.timeStamp) || Date.now()),
                  void (this[je.expando] = !0))
                : new je.Event(e, t);
            }),
            (je.Event.prototype = {
              constructor: je.Event,
              isDefaultPrevented: A,
              isPropagationStopped: A,
              isImmediatePropagationStopped: A,
              isSimulated: !1,
              preventDefault: function () {
                var e = this.originalEvent;
                (this.isDefaultPrevented = j), e && !this.isSimulated && e.preventDefault();
              },
              stopPropagation: function () {
                var e = this.originalEvent;
                (this.isPropagationStopped = j), e && !this.isSimulated && e.stopPropagation();
              },
              stopImmediatePropagation: function () {
                var e = this.originalEvent;
                (this.isImmediatePropagationStopped = j),
                  e && !this.isSimulated && e.stopImmediatePropagation(),
                  this.stopPropagation();
              },
            }),
            je.each(
              {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function (e) {
                  var t = e.button;
                  return null == e.which && it.test(e.type)
                    ? null != e.charCode
                      ? e.charCode
                      : e.keyCode
                    : !e.which && void 0 !== t && st.test(e.type)
                    ? 1 & t
                      ? 1
                      : 2 & t
                      ? 3
                      : 4 & t
                      ? 2
                      : 0
                    : e.which;
                },
              },
              je.event.addProp,
            ),
            je.each({ focus: 'focusin', blur: 'focusout' }, function (e, t) {
              je.event.special[e] = {
                setup: function () {
                  return N(this, e, k), !1;
                },
                trigger: function () {
                  return N(this, e), !0;
                },
                delegateType: t,
              };
            }),
            je.each(
              {
                mouseenter: 'mouseover',
                mouseleave: 'mouseout',
                pointerenter: 'pointerover',
                pointerleave: 'pointerout',
              },
              function (e, t) {
                je.event.special[e] = {
                  delegateType: t,
                  bindType: t,
                  handle: function (e) {
                    var n,
                      r = this,
                      o = e.relatedTarget,
                      i = e.handleObj;
                    return (
                      (o && (o === r || je.contains(r, o))) ||
                        ((e.type = i.origType),
                        (n = i.handler.apply(this, arguments)),
                        (e.type = t)),
                      n
                    );
                  },
                };
              },
            ),
            je.fn.extend({
              on: function (e, t, n, r) {
                return S(this, e, t, n, r);
              },
              one: function (e, t, n, r) {
                return S(this, e, t, n, r, 1);
              },
              off: function (e, t, n) {
                var r, o;
                if (e && e.preventDefault && e.handleObj)
                  return (
                    (r = e.handleObj),
                    je(e.delegateTarget).off(
                      r.namespace ? r.origType + '.' + r.namespace : r.origType,
                      r.selector,
                      r.handler,
                    ),
                    this
                  );
                if ('object' == typeof e) {
                  for (o in e) this.off(o, t, e[o]);
                  return this;
                }
                return (
                  (t !== !1 && 'function' != typeof t) || ((n = t), (t = void 0)),
                  n === !1 && (n = A),
                  this.each(function () {
                    je.event.remove(this, e, n, t);
                  })
                );
              },
            });
          var ut = /<script|<style|<link/i,
            lt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            ct = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
          je.extend({
            htmlPrefilter: function (e) {
              return e;
            },
            clone: function (e, t, n) {
              var r,
                o,
                i,
                s,
                a = e.cloneNode(!0),
                u = Qe(e);
              if (!(ye.noCloneChecked || (1 !== e.nodeType && 11 !== e.nodeType) || je.isXMLDoc(e)))
                for (s = w(a), i = w(e), r = 0, o = i.length; r < o; r++) H(i[r], s[r]);
              if (t)
                if (n)
                  for (i = i || w(e), s = s || w(a), r = 0, o = i.length; r < o; r++) O(i[r], s[r]);
                else O(e, a);
              return (s = w(a, 'script')), s.length > 0 && T(s, !u && w(e, 'script')), a;
            },
            cleanData: function (e) {
              for (var t, n, r, o = je.event.special, i = 0; void 0 !== (n = e[i]); i++)
                if (We(n)) {
                  if ((t = n[Be.expando])) {
                    if (t.events)
                      for (r in t.events)
                        o[r] ? je.event.remove(n, r) : je.removeEvent(n, r, t.handle);
                    n[Be.expando] = void 0;
                  }
                  n[_e.expando] && (n[_e.expando] = void 0);
                }
            },
          }),
            je.fn.extend({
              detach: function (e) {
                return P(this, e, !0);
              },
              remove: function (e) {
                return P(this, e);
              },
              text: function (e) {
                return Me(
                  this,
                  function (e) {
                    return void 0 === e
                      ? je.text(this)
                      : this.empty().each(function () {
                          (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) ||
                            (this.textContent = e);
                        });
                  },
                  null,
                  e,
                  arguments.length,
                );
              },
              append: function () {
                return R(this, arguments, function (e) {
                  if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = q(this, e);
                    t.appendChild(e);
                  }
                });
              },
              prepend: function () {
                return R(this, arguments, function (e) {
                  if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = q(this, e);
                    t.insertBefore(e, t.firstChild);
                  }
                });
              },
              before: function () {
                return R(this, arguments, function (e) {
                  this.parentNode && this.parentNode.insertBefore(e, this);
                });
              },
              after: function () {
                return R(this, arguments, function (e) {
                  this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                });
              },
              empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++)
                  1 === e.nodeType && (je.cleanData(w(e, !1)), (e.textContent = ''));
                return this;
              },
              clone: function (e, t) {
                return (
                  (e = null != e && e),
                  (t = null == t ? e : t),
                  this.map(function () {
                    return je.clone(this, e, t);
                  })
                );
              },
              html: function (e) {
                return Me(
                  this,
                  function (e) {
                    var t = this[0] || {},
                      n = 0,
                      r = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if (
                      'string' == typeof e &&
                      !ut.test(e) &&
                      !rt[(tt.exec(e) || ['', ''])[1].toLowerCase()]
                    ) {
                      e = je.htmlPrefilter(e);
                      try {
                        for (; n < r; n++)
                          (t = this[n] || {}),
                            1 === t.nodeType && (je.cleanData(w(t, !1)), (t.innerHTML = e));
                        t = 0;
                      } catch (e) {}
                    }
                    t && this.empty().append(e);
                  },
                  null,
                  e,
                  arguments.length,
                );
              },
              replaceWith: function () {
                var e = [];
                return R(
                  this,
                  arguments,
                  function (t) {
                    var n = this.parentNode;
                    je.inArray(this, e) < 0 &&
                      (je.cleanData(w(this)), n && n.replaceChild(t, this));
                  },
                  e,
                );
              },
            }),
            je.each(
              {
                appendTo: 'append',
                prependTo: 'prepend',
                insertBefore: 'before',
                insertAfter: 'after',
                replaceAll: 'replaceWith',
              },
              function (e, t) {
                je.fn[e] = function (e) {
                  for (var n, r = [], o = je(e), i = o.length - 1, s = 0; s <= i; s++)
                    (n = s === i ? this : this.clone(!0)), je(o[s])[t](n), fe.apply(r, n.get());
                  return this.pushStack(r);
                };
              },
            );
          var ft = new RegExp('^(' + Xe + ')(?!px)[a-z%]+$', 'i'),
            pt = function (t) {
              var n = t.ownerDocument.defaultView;
              return (n && n.opener) || (n = e), n.getComputedStyle(t);
            },
            ht = function (e, t, n) {
              var r,
                o,
                i = {};
              for (o in t) (i[o] = e.style[o]), (e.style[o] = t[o]);
              r = n.call(e);
              for (o in t) e.style[o] = i[o];
              return r;
            },
            dt = new RegExp(Ge.join('|'), 'i');
          !(function () {
            function t() {
              if (c) {
                (l.style.cssText =
                  'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
                  (c.style.cssText =
                    'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
                  Ye.appendChild(l).appendChild(c);
                var t = e.getComputedStyle(c);
                (r = '1%' !== t.top),
                  (u = 12 === n(t.marginLeft)),
                  (c.style.right = '60%'),
                  (s = 36 === n(t.right)),
                  (o = 36 === n(t.width)),
                  (c.style.position = 'absolute'),
                  (i = 12 === n(c.offsetWidth / 3)),
                  Ye.removeChild(l),
                  (c = null);
              }
            }
            function n(e) {
              return Math.round(parseFloat(e));
            }
            var r,
              o,
              i,
              s,
              a,
              u,
              l = we.createElement('div'),
              c = we.createElement('div');
            c.style &&
              ((c.style.backgroundClip = 'content-box'),
              (c.cloneNode(!0).style.backgroundClip = ''),
              (ye.clearCloneStyle = 'content-box' === c.style.backgroundClip),
              je.extend(ye, {
                boxSizingReliable: function () {
                  return t(), o;
                },
                pixelBoxStyles: function () {
                  return t(), s;
                },
                pixelPosition: function () {
                  return t(), r;
                },
                reliableMarginLeft: function () {
                  return t(), u;
                },
                scrollboxSize: function () {
                  return t(), i;
                },
                reliableTrDimensions: function () {
                  var t, n, r, o;
                  return (
                    null == a &&
                      ((t = we.createElement('table')),
                      (n = we.createElement('tr')),
                      (r = we.createElement('div')),
                      (t.style.cssText = 'position:absolute;left:-11111px'),
                      (n.style.height = '1px'),
                      (r.style.height = '9px'),
                      Ye.appendChild(t).appendChild(n).appendChild(r),
                      (o = e.getComputedStyle(n)),
                      (a = parseInt(o.height) > 3),
                      Ye.removeChild(t)),
                    a
                  );
                },
              }));
          })();
          var gt = ['Webkit', 'Moz', 'ms'],
            vt = we.createElement('div').style,
            mt = {},
            yt = /^(none|table(?!-c[ea]).+)/,
            bt = /^--/,
            xt = { position: 'absolute', visibility: 'hidden', display: 'block' },
            wt = { letterSpacing: '0', fontWeight: '400' };
          je.extend({
            cssHooks: {
              opacity: {
                get: function (e, t) {
                  if (t) {
                    var n = I(e, 'opacity');
                    return '' === n ? '1' : n;
                  }
                },
              },
            },
            cssNumber: {
              animationIterationCount: !0,
              columnCount: !0,
              fillOpacity: !0,
              flexGrow: !0,
              flexShrink: !0,
              fontWeight: !0,
              gridArea: !0,
              gridColumn: !0,
              gridColumnEnd: !0,
              gridColumnStart: !0,
              gridRow: !0,
              gridRowEnd: !0,
              gridRowStart: !0,
              lineHeight: !0,
              opacity: !0,
              order: !0,
              orphans: !0,
              widows: !0,
              zIndex: !0,
              zoom: !0,
            },
            cssProps: {},
            style: function (e, t, n, r) {
              if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o,
                  i,
                  s,
                  a = d(t),
                  u = bt.test(t),
                  l = e.style;
                return (
                  u || (t = $(a)),
                  (s = je.cssHooks[t] || je.cssHooks[a]),
                  void 0 === n
                    ? s && 'get' in s && void 0 !== (o = s.get(e, !1, r))
                      ? o
                      : l[t]
                    : ((i = typeof n),
                      'string' === i &&
                        (o = Ve.exec(n)) &&
                        o[1] &&
                        ((n = y(e, t, o)), (i = 'number')),
                      null != n &&
                        n === n &&
                        ('number' !== i || u || (n += (o && o[3]) || (je.cssNumber[a] ? '' : 'px')),
                        ye.clearCloneStyle ||
                          '' !== n ||
                          0 !== t.indexOf('background') ||
                          (l[t] = 'inherit'),
                        (s && 'set' in s && void 0 === (n = s.set(e, n, r))) ||
                          (u ? l.setProperty(t, n) : (l[t] = n))),
                      void 0)
                );
              }
            },
            css: function (e, t, n, r) {
              var o,
                i,
                s,
                a = d(t),
                u = bt.test(t);
              return (
                u || (t = $(a)),
                (s = je.cssHooks[t] || je.cssHooks[a]),
                s && 'get' in s && (o = s.get(e, !0, n)),
                void 0 === o && (o = I(e, t, r)),
                'normal' === o && t in wt && (o = wt[t]),
                '' === n || n ? ((i = parseFloat(o)), n === !0 || isFinite(i) ? i || 0 : o) : o
              );
            },
          }),
            je.each(['height', 'width'], function (e, t) {
              je.cssHooks[t] = {
                get: function (e, n, r) {
                  if (n)
                    return !yt.test(je.css(e, 'display')) ||
                      (e.getClientRects().length && e.getBoundingClientRect().width)
                      ? _(e, t, r)
                      : ht(e, xt, function () {
                          return _(e, t, r);
                        });
                },
                set: function (e, n, r) {
                  var o,
                    i = pt(e),
                    s = !ye.scrollboxSize() && 'absolute' === i.position,
                    a = s || r,
                    u = a && 'border-box' === je.css(e, 'boxSizing', !1, i),
                    l = r ? B(e, t, r, u, i) : 0;
                  return (
                    u &&
                      s &&
                      (l -= Math.ceil(
                        e['offset' + t[0].toUpperCase() + t.slice(1)] -
                          parseFloat(i[t]) -
                          B(e, t, 'border', !1, i) -
                          0.5,
                      )),
                    l &&
                      (o = Ve.exec(n)) &&
                      'px' !== (o[3] || 'px') &&
                      ((e.style[t] = n), (n = je.css(e, t))),
                    W(e, n, l)
                  );
                },
              };
            }),
            (je.cssHooks.marginLeft = M(ye.reliableMarginLeft, function (e, t) {
              if (t)
                return (
                  (parseFloat(I(e, 'marginLeft')) ||
                    e.getBoundingClientRect().left -
                      ht(e, { marginLeft: 0 }, function () {
                        return e.getBoundingClientRect().left;
                      })) + 'px'
                );
            })),
            je.each({ margin: '', padding: '', border: 'Width' }, function (e, t) {
              (je.cssHooks[e + t] = {
                expand: function (n) {
                  for (var r = 0, o = {}, i = 'string' == typeof n ? n.split(' ') : [n]; r < 4; r++)
                    o[e + Ge[r] + t] = i[r] || i[r - 2] || i[0];
                  return o;
                },
              }),
                'margin' !== e && (je.cssHooks[e + t].set = W);
            }),
            je.fn.extend({
              css: function (e, t) {
                return Me(
                  this,
                  function (e, t, n) {
                    var r,
                      o,
                      i = {},
                      s = 0;
                    if (Array.isArray(t)) {
                      for (r = pt(e), o = t.length; s < o; s++) i[t[s]] = je.css(e, t[s], !1, r);
                      return i;
                    }
                    return void 0 !== n ? je.style(e, t, n) : je.css(e, t);
                  },
                  e,
                  t,
                  arguments.length > 1,
                );
              },
            }),
            (je.Tween = U),
            (U.prototype = {
              constructor: U,
              init: function (e, t, n, r, o, i) {
                (this.elem = e),
                  (this.prop = n),
                  (this.easing = o || je.easing._default),
                  (this.options = t),
                  (this.start = this.now = this.cur()),
                  (this.end = r),
                  (this.unit = i || (je.cssNumber[n] ? '' : 'px'));
              },
              cur: function () {
                var e = U.propHooks[this.prop];
                return e && e.get ? e.get(this) : U.propHooks._default.get(this);
              },
              run: function (e) {
                var t,
                  n = U.propHooks[this.prop];
                return (
                  this.options.duration
                    ? (this.pos = t =
                        je.easing[this.easing](
                          e,
                          this.options.duration * e,
                          0,
                          1,
                          this.options.duration,
                        ))
                    : (this.pos = t = e),
                  (this.now = (this.end - this.start) * t + this.start),
                  this.options.step && this.options.step.call(this.elem, this.now, this),
                  n && n.set ? n.set(this) : U.propHooks._default.set(this),
                  this
                );
              },
            }),
            (U.prototype.init.prototype = U.prototype),
            (U.propHooks = {
              _default: {
                get: function (e) {
                  var t;
                  return 1 !== e.elem.nodeType ||
                    (null != e.elem[e.prop] && null == e.elem.style[e.prop])
                    ? e.elem[e.prop]
                    : ((t = je.css(e.elem, e.prop, '')), t && 'auto' !== t ? t : 0);
                },
                set: function (e) {
                  je.fx.step[e.prop]
                    ? je.fx.step[e.prop](e)
                    : 1 !== e.elem.nodeType ||
                      (!je.cssHooks[e.prop] && null == e.elem.style[$(e.prop)])
                    ? (e.elem[e.prop] = e.now)
                    : je.style(e.elem, e.prop, e.now + e.unit);
                },
              },
            }),
            (U.propHooks.scrollTop = U.propHooks.scrollLeft =
              {
                set: function (e) {
                  e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                },
              }),
            (je.easing = {
              linear: function (e) {
                return e;
              },
              swing: function (e) {
                return 0.5 - Math.cos(e * Math.PI) / 2;
              },
              _default: 'swing',
            }),
            (je.fx = U.prototype.init),
            (je.fx.step = {});
          var Tt,
            Ct,
            jt = /^(?:toggle|show|hide)$/,
            At = /queueHooks$/;
          (je.Animation = je.extend(J, {
            tweeners: {
              '*': [
                function (e, t) {
                  var n = this.createTween(e, t);
                  return y(n.elem, e, Ve.exec(t), n), n;
                },
              ],
            },
            tweener: function (e, t) {
              be(e) ? ((t = e), (e = ['*'])) : (e = e.match(Re));
              for (var n, r = 0, o = e.length; r < o; r++)
                (n = e[r]), (J.tweeners[n] = J.tweeners[n] || []), J.tweeners[n].unshift(t);
            },
            prefilters: [Y],
            prefilter: function (e, t) {
              t ? J.prefilters.unshift(e) : J.prefilters.push(e);
            },
          })),
            (je.speed = function (e, t, n) {
              var r =
                e && 'object' == typeof e
                  ? je.extend({}, e)
                  : {
                      complete: n || (!n && t) || (be(e) && e),
                      duration: e,
                      easing: (n && t) || (t && !be(t) && t),
                    };
              return (
                je.fx.off
                  ? (r.duration = 0)
                  : 'number' != typeof r.duration &&
                    (r.duration in je.fx.speeds
                      ? (r.duration = je.fx.speeds[r.duration])
                      : (r.duration = je.fx.speeds._default)),
                (null != r.queue && r.queue !== !0) || (r.queue = 'fx'),
                (r.old = r.complete),
                (r.complete = function () {
                  be(r.old) && r.old.call(this), r.queue && je.dequeue(this, r.queue);
                }),
                r
              );
            }),
            je.fn.extend({
              fadeTo: function (e, t, n, r) {
                return this.filter(Ke)
                  .css('opacity', 0)
                  .show()
                  .end()
                  .animate({ opacity: t }, e, n, r);
              },
              animate: function (e, t, n, r) {
                var o = je.isEmptyObject(e),
                  i = je.speed(t, n, r),
                  s = function () {
                    var t = J(this, je.extend({}, e), i);
                    (o || Be.get(this, 'finish')) && t.stop(!0);
                  };
                return (s.finish = s), o || i.queue === !1 ? this.each(s) : this.queue(i.queue, s);
              },
              stop: function (e, t, n) {
                var r = function (e) {
                  var t = e.stop;
                  delete e.stop, t(n);
                };
                return (
                  'string' != typeof e && ((n = t), (t = e), (e = void 0)),
                  t && this.queue(e || 'fx', []),
                  this.each(function () {
                    var t = !0,
                      o = null != e && e + 'queueHooks',
                      i = je.timers,
                      s = Be.get(this);
                    if (o) s[o] && s[o].stop && r(s[o]);
                    else for (o in s) s[o] && s[o].stop && At.test(o) && r(s[o]);
                    for (o = i.length; o--; )
                      i[o].elem !== this ||
                        (null != e && i[o].queue !== e) ||
                        (i[o].anim.stop(n), (t = !1), i.splice(o, 1));
                    (!t && n) || je.dequeue(this, e);
                  })
                );
              },
              finish: function (e) {
                return (
                  e !== !1 && (e = e || 'fx'),
                  this.each(function () {
                    var t,
                      n = Be.get(this),
                      r = n[e + 'queue'],
                      o = n[e + 'queueHooks'],
                      i = je.timers,
                      s = r ? r.length : 0;
                    for (
                      n.finish = !0,
                        je.queue(this, e, []),
                        o && o.stop && o.stop.call(this, !0),
                        t = i.length;
                      t--;

                    )
                      i[t].elem === this &&
                        i[t].queue === e &&
                        (i[t].anim.stop(!0), i.splice(t, 1));
                    for (t = 0; t < s; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish;
                  })
                );
              },
            }),
            je.each(['toggle', 'show', 'hide'], function (e, t) {
              var n = je.fn[t];
              je.fn[t] = function (e, r, o) {
                return null == e || 'boolean' == typeof e
                  ? n.apply(this, arguments)
                  : this.animate(V(t, !0), e, r, o);
              };
            }),
            je.each(
              {
                slideDown: V('show'),
                slideUp: V('hide'),
                slideToggle: V('toggle'),
                fadeIn: { opacity: 'show' },
                fadeOut: { opacity: 'hide' },
                fadeToggle: { opacity: 'toggle' },
              },
              function (e, t) {
                je.fn[e] = function (e, n, r) {
                  return this.animate(t, e, n, r);
                };
              },
            ),
            (je.timers = []),
            (je.fx.tick = function () {
              var e,
                t = 0,
                n = je.timers;
              for (Tt = Date.now(); t < n.length; t++)
                (e = n[t]), e() || n[t] !== e || n.splice(t--, 1);
              n.length || je.fx.stop(), (Tt = void 0);
            }),
            (je.fx.timer = function (e) {
              je.timers.push(e), je.fx.start();
            }),
            (je.fx.interval = 13),
            (je.fx.start = function () {
              Ct || ((Ct = !0), z());
            }),
            (je.fx.stop = function () {
              Ct = null;
            }),
            (je.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (je.fn.delay = function (t, n) {
              return (
                (t = je.fx ? je.fx.speeds[t] || t : t),
                (n = n || 'fx'),
                this.queue(n, function (n, r) {
                  var o = e.setTimeout(n, t);
                  r.stop = function () {
                    e.clearTimeout(o);
                  };
                })
              );
            }),
            (function () {
              var e = we.createElement('input'),
                t = we.createElement('select'),
                n = t.appendChild(we.createElement('option'));
              (e.type = 'checkbox'),
                (ye.checkOn = '' !== e.value),
                (ye.optSelected = n.selected),
                (e = we.createElement('input')),
                (e.value = 't'),
                (e.type = 'radio'),
                (ye.radioValue = 't' === e.value);
            })();
          var kt,
            Et = je.expr.attrHandle;
          je.fn.extend({
            attr: function (e, t) {
              return Me(this, je.attr, e, t, arguments.length > 1);
            },
            removeAttr: function (e) {
              return this.each(function () {
                je.removeAttr(this, e);
              });
            },
          }),
            je.extend({
              attr: function (e, t, n) {
                var r,
                  o,
                  i = e.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                  return 'undefined' == typeof e.getAttribute
                    ? je.prop(e, t, n)
                    : ((1 === i && je.isXMLDoc(e)) ||
                        (o =
                          je.attrHooks[t.toLowerCase()] ||
                          (je.expr.match.bool.test(t) ? kt : void 0)),
                      void 0 !== n
                        ? null === n
                          ? void je.removeAttr(e, t)
                          : o && 'set' in o && void 0 !== (r = o.set(e, n, t))
                          ? r
                          : (e.setAttribute(t, n + ''), n)
                        : o && 'get' in o && null !== (r = o.get(e, t))
                        ? r
                        : ((r = je.find.attr(e, t)), null == r ? void 0 : r));
              },
              attrHooks: {
                type: {
                  set: function (e, t) {
                    if (!ye.radioValue && 'radio' === t && i(e, 'input')) {
                      var n = e.value;
                      return e.setAttribute('type', t), n && (e.value = n), t;
                    }
                  },
                },
              },
              removeAttr: function (e, t) {
                var n,
                  r = 0,
                  o = t && t.match(Re);
                if (o && 1 === e.nodeType) for (; (n = o[r++]); ) e.removeAttribute(n);
              },
            }),
            (kt = {
              set: function (e, t, n) {
                return t === !1 ? je.removeAttr(e, n) : e.setAttribute(n, n), n;
              },
            }),
            je.each(je.expr.match.bool.source.match(/\w+/g), function (e, t) {
              var n = Et[t] || je.find.attr;
              Et[t] = function (e, t, r) {
                var o,
                  i,
                  s = t.toLowerCase();
                return (
                  r || ((i = Et[s]), (Et[s] = o), (o = null != n(e, t, r) ? s : null), (Et[s] = i)),
                  o
                );
              };
            });
          var St = /^(?:input|select|textarea|button)$/i,
            Nt = /^(?:a|area)$/i;
          je.fn.extend({
            prop: function (e, t) {
              return Me(this, je.prop, e, t, arguments.length > 1);
            },
            removeProp: function (e) {
              return this.each(function () {
                delete this[je.propFix[e] || e];
              });
            },
          }),
            je.extend({
              prop: function (e, t, n) {
                var r,
                  o,
                  i = e.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                  return (
                    (1 === i && je.isXMLDoc(e)) ||
                      ((t = je.propFix[t] || t), (o = je.propHooks[t])),
                    void 0 !== n
                      ? o && 'set' in o && void 0 !== (r = o.set(e, n, t))
                        ? r
                        : (e[t] = n)
                      : o && 'get' in o && null !== (r = o.get(e, t))
                      ? r
                      : e[t]
                  );
              },
              propHooks: {
                tabIndex: {
                  get: function (e) {
                    var t = je.find.attr(e, 'tabindex');
                    return t
                      ? parseInt(t, 10)
                      : St.test(e.nodeName) || (Nt.test(e.nodeName) && e.href)
                      ? 0
                      : -1;
                  },
                },
              },
              propFix: { for: 'htmlFor', class: 'className' },
            }),
            ye.optSelected ||
              (je.propHooks.selected = {
                get: function (e) {
                  var t = e.parentNode;
                  return t && t.parentNode && t.parentNode.selectedIndex, null;
                },
                set: function (e) {
                  var t = e.parentNode;
                  t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
                },
              }),
            je.each(
              [
                'tabIndex',
                'readOnly',
                'maxLength',
                'cellSpacing',
                'cellPadding',
                'rowSpan',
                'colSpan',
                'useMap',
                'frameBorder',
                'contentEditable',
              ],
              function () {
                je.propFix[this.toLowerCase()] = this;
              },
            ),
            je.fn.extend({
              addClass: function (e) {
                var t,
                  n,
                  r,
                  o,
                  i,
                  s,
                  a,
                  u = 0;
                if (be(e))
                  return this.each(function (t) {
                    je(this).addClass(e.call(this, t, Z(this)));
                  });
                if (((t = ee(e)), t.length))
                  for (; (n = this[u++]); )
                    if (((o = Z(n)), (r = 1 === n.nodeType && ' ' + K(o) + ' '))) {
                      for (s = 0; (i = t[s++]); ) r.indexOf(' ' + i + ' ') < 0 && (r += i + ' ');
                      (a = K(r)), o !== a && n.setAttribute('class', a);
                    }
                return this;
              },
              removeClass: function (e) {
                var t,
                  n,
                  r,
                  o,
                  i,
                  s,
                  a,
                  u = 0;
                if (be(e))
                  return this.each(function (t) {
                    je(this).removeClass(e.call(this, t, Z(this)));
                  });
                if (!arguments.length) return this.attr('class', '');
                if (((t = ee(e)), t.length))
                  for (; (n = this[u++]); )
                    if (((o = Z(n)), (r = 1 === n.nodeType && ' ' + K(o) + ' '))) {
                      for (s = 0; (i = t[s++]); )
                        for (; r.indexOf(' ' + i + ' ') > -1; ) r = r.replace(' ' + i + ' ', ' ');
                      (a = K(r)), o !== a && n.setAttribute('class', a);
                    }
                return this;
              },
              toggleClass: function (e, t) {
                var n = typeof e,
                  r = 'string' === n || Array.isArray(e);
                return 'boolean' == typeof t && r
                  ? t
                    ? this.addClass(e)
                    : this.removeClass(e)
                  : be(e)
                  ? this.each(function (n) {
                      je(this).toggleClass(e.call(this, n, Z(this), t), t);
                    })
                  : this.each(function () {
                      var t, o, i, s;
                      if (r)
                        for (o = 0, i = je(this), s = ee(e); (t = s[o++]); )
                          i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                      else
                        (void 0 !== e && 'boolean' !== n) ||
                          ((t = Z(this)),
                          t && Be.set(this, '__className__', t),
                          this.setAttribute &&
                            this.setAttribute(
                              'class',
                              t || e === !1 ? '' : Be.get(this, '__className__') || '',
                            ));
                    });
              },
              hasClass: function (e) {
                var t,
                  n,
                  r = 0;
                for (t = ' ' + e + ' '; (n = this[r++]); )
                  if (1 === n.nodeType && (' ' + K(Z(n)) + ' ').indexOf(t) > -1) return !0;
                return !1;
              },
            });
          var qt = /\r/g;
          je.fn.extend({
            val: function (e) {
              var t,
                n,
                r,
                o = this[0];
              {
                if (arguments.length)
                  return (
                    (r = be(e)),
                    this.each(function (n) {
                      var o;
                      1 === this.nodeType &&
                        ((o = r ? e.call(this, n, je(this).val()) : e),
                        null == o
                          ? (o = '')
                          : 'number' == typeof o
                          ? (o += '')
                          : Array.isArray(o) &&
                            (o = je.map(o, function (e) {
                              return null == e ? '' : e + '';
                            })),
                        (t = je.valHooks[this.type] || je.valHooks[this.nodeName.toLowerCase()]),
                        (t && 'set' in t && void 0 !== t.set(this, o, 'value')) ||
                          (this.value = o));
                    })
                  );
                if (o)
                  return (
                    (t = je.valHooks[o.type] || je.valHooks[o.nodeName.toLowerCase()]),
                    t && 'get' in t && void 0 !== (n = t.get(o, 'value'))
                      ? n
                      : ((n = o.value),
                        'string' == typeof n ? n.replace(qt, '') : null == n ? '' : n)
                  );
              }
            },
          }),
            je.extend({
              valHooks: {
                option: {
                  get: function (e) {
                    var t = je.find.attr(e, 'value');
                    return null != t ? t : K(je.text(e));
                  },
                },
                select: {
                  get: function (e) {
                    var t,
                      n,
                      r,
                      o = e.options,
                      s = e.selectedIndex,
                      a = 'select-one' === e.type,
                      u = a ? null : [],
                      l = a ? s + 1 : o.length;
                    for (r = s < 0 ? l : a ? s : 0; r < l; r++)
                      if (
                        ((n = o[r]),
                        (n.selected || r === s) &&
                          !n.disabled &&
                          (!n.parentNode.disabled || !i(n.parentNode, 'optgroup')))
                      ) {
                        if (((t = je(n).val()), a)) return t;
                        u.push(t);
                      }
                    return u;
                  },
                  set: function (e, t) {
                    for (var n, r, o = e.options, i = je.makeArray(t), s = o.length; s--; )
                      (r = o[s]),
                        (r.selected = je.inArray(je.valHooks.option.get(r), i) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), i;
                  },
                },
              },
            }),
            je.each(['radio', 'checkbox'], function () {
              (je.valHooks[this] = {
                set: function (e, t) {
                  if (Array.isArray(t)) return (e.checked = je.inArray(je(e).val(), t) > -1);
                },
              }),
                ye.checkOn ||
                  (je.valHooks[this].get = function (e) {
                    return null === e.getAttribute('value') ? 'on' : e.value;
                  });
            }),
            (ye.focusin = 'onfocusin' in e);
          var Dt = /^(?:focusinfocus|focusoutblur)$/,
            Lt = function (e) {
              e.stopPropagation();
            };
          je.extend(je.event, {
            trigger: function (t, n, r, o) {
              var i,
                s,
                a,
                u,
                l,
                c,
                f,
                p,
                h = [r || we],
                d = ge.call(t, 'type') ? t.type : t,
                g = ge.call(t, 'namespace') ? t.namespace.split('.') : [];
              if (
                ((s = p = a = r = r || we),
                3 !== r.nodeType &&
                  8 !== r.nodeType &&
                  !Dt.test(d + je.event.triggered) &&
                  (d.indexOf('.') > -1 && ((g = d.split('.')), (d = g.shift()), g.sort()),
                  (l = d.indexOf(':') < 0 && 'on' + d),
                  (t = t[je.expando] ? t : new je.Event(d, 'object' == typeof t && t)),
                  (t.isTrigger = o ? 2 : 3),
                  (t.namespace = g.join('.')),
                  (t.rnamespace = t.namespace
                    ? new RegExp('(^|\\.)' + g.join('\\.(?:.*\\.|)') + '(\\.|$)')
                    : null),
                  (t.result = void 0),
                  t.target || (t.target = r),
                  (n = null == n ? [t] : je.makeArray(n, [t])),
                  (f = je.event.special[d] || {}),
                  o || !f.trigger || f.trigger.apply(r, n) !== !1))
              ) {
                if (!o && !f.noBubble && !xe(r)) {
                  for (
                    u = f.delegateType || d, Dt.test(u + d) || (s = s.parentNode);
                    s;
                    s = s.parentNode
                  )
                    h.push(s), (a = s);
                  a === (r.ownerDocument || we) && h.push(a.defaultView || a.parentWindow || e);
                }
                for (i = 0; (s = h[i++]) && !t.isPropagationStopped(); )
                  (p = s),
                    (t.type = i > 1 ? u : f.bindType || d),
                    (c =
                      (Be.get(s, 'events') || Object.create(null))[t.type] && Be.get(s, 'handle')),
                    c && c.apply(s, n),
                    (c = l && s[l]),
                    c &&
                      c.apply &&
                      We(s) &&
                      ((t.result = c.apply(s, n)), t.result === !1 && t.preventDefault());
                return (
                  (t.type = d),
                  o ||
                    t.isDefaultPrevented() ||
                    (f._default && f._default.apply(h.pop(), n) !== !1) ||
                    !We(r) ||
                    (l &&
                      be(r[d]) &&
                      !xe(r) &&
                      ((a = r[l]),
                      a && (r[l] = null),
                      (je.event.triggered = d),
                      t.isPropagationStopped() && p.addEventListener(d, Lt),
                      r[d](),
                      t.isPropagationStopped() && p.removeEventListener(d, Lt),
                      (je.event.triggered = void 0),
                      a && (r[l] = a))),
                  t.result
                );
              }
            },
            simulate: function (e, t, n) {
              var r = je.extend(new je.Event(), n, { type: e, isSimulated: !0 });
              je.event.trigger(r, null, t);
            },
          }),
            je.fn.extend({
              trigger: function (e, t) {
                return this.each(function () {
                  je.event.trigger(e, t, this);
                });
              },
              triggerHandler: function (e, t) {
                var n = this[0];
                if (n) return je.event.trigger(e, t, n, !0);
              },
            }),
            ye.focusin ||
              je.each({ focus: 'focusin', blur: 'focusout' }, function (e, t) {
                var n = function (e) {
                  je.event.simulate(t, e.target, je.event.fix(e));
                };
                je.event.special[t] = {
                  setup: function () {
                    var r = this.ownerDocument || this.document || this,
                      o = Be.access(r, t);
                    o || r.addEventListener(e, n, !0), Be.access(r, t, (o || 0) + 1);
                  },
                  teardown: function () {
                    var r = this.ownerDocument || this.document || this,
                      o = Be.access(r, t) - 1;
                    o ? Be.access(r, t, o) : (r.removeEventListener(e, n, !0), Be.remove(r, t));
                  },
                };
              });
          var Ot = e.location,
            Ht = { guid: Date.now() },
            Rt = /\?/;
          je.parseXML = function (t) {
            var n;
            if (!t || 'string' != typeof t) return null;
            try {
              n = new e.DOMParser().parseFromString(t, 'text/xml');
            } catch (e) {
              n = void 0;
            }
            return (
              (n && !n.getElementsByTagName('parsererror').length) || je.error('Invalid XML: ' + t),
              n
            );
          };
          var Pt = /\[\]$/,
            It = /\r?\n/g,
            Mt = /^(?:submit|button|image|reset|file)$/i,
            Ft = /^(?:input|select|textarea|keygen)/i;
          (je.param = function (e, t) {
            var n,
              r = [],
              o = function (e, t) {
                var n = be(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + '=' + encodeURIComponent(null == n ? '' : n);
              };
            if (null == e) return '';
            if (Array.isArray(e) || (e.jquery && !je.isPlainObject(e)))
              je.each(e, function () {
                o(this.name, this.value);
              });
            else for (n in e) te(n, e[n], t, o);
            return r.join('&');
          }),
            je.fn.extend({
              serialize: function () {
                return je.param(this.serializeArray());
              },
              serializeArray: function () {
                return this.map(function () {
                  var e = je.prop(this, 'elements');
                  return e ? je.makeArray(e) : this;
                })
                  .filter(function () {
                    var e = this.type;
                    return (
                      this.name &&
                      !je(this).is(':disabled') &&
                      Ft.test(this.nodeName) &&
                      !Mt.test(e) &&
                      (this.checked || !et.test(e))
                    );
                  })
                  .map(function (e, t) {
                    var n = je(this).val();
                    return null == n
                      ? null
                      : Array.isArray(n)
                      ? je.map(n, function (e) {
                          return { name: t.name, value: e.replace(It, '\r\n') };
                        })
                      : { name: t.name, value: n.replace(It, '\r\n') };
                  })
                  .get();
              },
            });
          var $t = /%20/g,
            Wt = /#.*$/,
            Bt = /([?&])_=[^&]*/,
            _t = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Ut = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            zt = /^(?:GET|HEAD)$/,
            Xt = /^\/\//,
            Vt = {},
            Gt = {},
            Yt = '*/'.concat('*'),
            Qt = we.createElement('a');
          (Qt.href = Ot.href),
            je.extend({
              active: 0,
              lastModified: {},
              etag: {},
              ajaxSettings: {
                url: Ot.href,
                type: 'GET',
                isLocal: Ut.test(Ot.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                accepts: {
                  '*': Yt,
                  text: 'text/plain',
                  html: 'text/html',
                  xml: 'application/xml, text/xml',
                  json: 'application/json, text/javascript',
                },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: { xml: 'responseXML', text: 'responseText', json: 'responseJSON' },
                converters: {
                  '* text': String,
                  'text html': !0,
                  'text json': JSON.parse,
                  'text xml': je.parseXML,
                },
                flatOptions: { url: !0, context: !0 },
              },
              ajaxSetup: function (e, t) {
                return t ? oe(oe(e, je.ajaxSettings), t) : oe(je.ajaxSettings, e);
              },
              ajaxPrefilter: ne(Vt),
              ajaxTransport: ne(Gt),
              ajax: function (t, n) {
                function r(t, n, r, a) {
                  var l,
                    p,
                    h,
                    x,
                    w,
                    T = n;
                  c ||
                    ((c = !0),
                    u && e.clearTimeout(u),
                    (o = void 0),
                    (s = a || ''),
                    (C.readyState = t > 0 ? 4 : 0),
                    (l = (t >= 200 && t < 300) || 304 === t),
                    r && (x = ie(d, C, r)),
                    !l &&
                      je.inArray('script', d.dataTypes) > -1 &&
                      (d.converters['text script'] = function () {}),
                    (x = se(d, x, C, l)),
                    l
                      ? (d.ifModified &&
                          ((w = C.getResponseHeader('Last-Modified')),
                          w && (je.lastModified[i] = w),
                          (w = C.getResponseHeader('etag')),
                          w && (je.etag[i] = w)),
                        204 === t || 'HEAD' === d.type
                          ? (T = 'nocontent')
                          : 304 === t
                          ? (T = 'notmodified')
                          : ((T = x.state), (p = x.data), (h = x.error), (l = !h)))
                      : ((h = T), (!t && T) || ((T = 'error'), t < 0 && (t = 0))),
                    (C.status = t),
                    (C.statusText = (n || T) + ''),
                    l ? m.resolveWith(g, [p, T, C]) : m.rejectWith(g, [C, T, h]),
                    C.statusCode(b),
                    (b = void 0),
                    f && v.trigger(l ? 'ajaxSuccess' : 'ajaxError', [C, d, l ? p : h]),
                    y.fireWith(g, [C, T]),
                    f &&
                      (v.trigger('ajaxComplete', [C, d]),
                      --je.active || je.event.trigger('ajaxStop')));
                }
                'object' == typeof t && ((n = t), (t = void 0)), (n = n || {});
                var o,
                  i,
                  s,
                  a,
                  u,
                  l,
                  c,
                  f,
                  p,
                  h,
                  d = je.ajaxSetup({}, n),
                  g = d.context || d,
                  v = d.context && (g.nodeType || g.jquery) ? je(g) : je.event,
                  m = je.Deferred(),
                  y = je.Callbacks('once memory'),
                  b = d.statusCode || {},
                  x = {},
                  w = {},
                  T = 'canceled',
                  C = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                      var t;
                      if (c) {
                        if (!a)
                          for (a = {}; (t = _t.exec(s)); )
                            a[t[1].toLowerCase() + ' '] = (
                              a[t[1].toLowerCase() + ' '] || []
                            ).concat(t[2]);
                        t = a[e.toLowerCase() + ' '];
                      }
                      return null == t ? null : t.join(', ');
                    },
                    getAllResponseHeaders: function () {
                      return c ? s : null;
                    },
                    setRequestHeader: function (e, t) {
                      return (
                        null == c &&
                          ((e = w[e.toLowerCase()] = w[e.toLowerCase()] || e), (x[e] = t)),
                        this
                      );
                    },
                    overrideMimeType: function (e) {
                      return null == c && (d.mimeType = e), this;
                    },
                    statusCode: function (e) {
                      var t;
                      if (e)
                        if (c) C.always(e[C.status]);
                        else for (t in e) b[t] = [b[t], e[t]];
                      return this;
                    },
                    abort: function (e) {
                      var t = e || T;
                      return o && o.abort(t), r(0, t), this;
                    },
                  };
                if (
                  (m.promise(C),
                  (d.url = ((t || d.url || Ot.href) + '').replace(Xt, Ot.protocol + '//')),
                  (d.type = n.method || n.type || d.method || d.type),
                  (d.dataTypes = (d.dataType || '*').toLowerCase().match(Re) || ['']),
                  null == d.crossDomain)
                ) {
                  l = we.createElement('a');
                  try {
                    (l.href = d.url),
                      (l.href = l.href),
                      (d.crossDomain = Qt.protocol + '//' + Qt.host != l.protocol + '//' + l.host);
                  } catch (e) {
                    d.crossDomain = !0;
                  }
                }
                if (
                  (d.data &&
                    d.processData &&
                    'string' != typeof d.data &&
                    (d.data = je.param(d.data, d.traditional)),
                  re(Vt, d, n, C),
                  c)
                )
                  return C;
                (f = je.event && d.global),
                  f && 0 === je.active++ && je.event.trigger('ajaxStart'),
                  (d.type = d.type.toUpperCase()),
                  (d.hasContent = !zt.test(d.type)),
                  (i = d.url.replace(Wt, '')),
                  d.hasContent
                    ? d.data &&
                      d.processData &&
                      0 === (d.contentType || '').indexOf('application/x-www-form-urlencoded') &&
                      (d.data = d.data.replace($t, '+'))
                    : ((h = d.url.slice(i.length)),
                      d.data &&
                        (d.processData || 'string' == typeof d.data) &&
                        ((i += (Rt.test(i) ? '&' : '?') + d.data), delete d.data),
                      d.cache === !1 &&
                        ((i = i.replace(Bt, '$1')),
                        (h = (Rt.test(i) ? '&' : '?') + '_=' + Ht.guid++ + h)),
                      (d.url = i + h)),
                  d.ifModified &&
                    (je.lastModified[i] &&
                      C.setRequestHeader('If-Modified-Since', je.lastModified[i]),
                    je.etag[i] && C.setRequestHeader('If-None-Match', je.etag[i])),
                  ((d.data && d.hasContent && d.contentType !== !1) || n.contentType) &&
                    C.setRequestHeader('Content-Type', d.contentType),
                  C.setRequestHeader(
                    'Accept',
                    d.dataTypes[0] && d.accepts[d.dataTypes[0]]
                      ? d.accepts[d.dataTypes[0]] +
                          ('*' !== d.dataTypes[0] ? ', ' + Yt + '; q=0.01' : '')
                      : d.accepts['*'],
                  );
                for (p in d.headers) C.setRequestHeader(p, d.headers[p]);
                if (d.beforeSend && (d.beforeSend.call(g, C, d) === !1 || c)) return C.abort();
                if (
                  ((T = 'abort'),
                  y.add(d.complete),
                  C.done(d.success),
                  C.fail(d.error),
                  (o = re(Gt, d, n, C)))
                ) {
                  if (((C.readyState = 1), f && v.trigger('ajaxSend', [C, d]), c)) return C;
                  d.async &&
                    d.timeout > 0 &&
                    (u = e.setTimeout(function () {
                      C.abort('timeout');
                    }, d.timeout));
                  try {
                    (c = !1), o.send(x, r);
                  } catch (e) {
                    if (c) throw e;
                    r(-1, e);
                  }
                } else r(-1, 'No Transport');
                return C;
              },
              getJSON: function (e, t, n) {
                return je.get(e, t, n, 'json');
              },
              getScript: function (e, t) {
                return je.get(e, void 0, t, 'script');
              },
            }),
            je.each(['get', 'post'], function (e, t) {
              je[t] = function (e, n, r, o) {
                return (
                  be(n) && ((o = o || r), (r = n), (n = void 0)),
                  je.ajax(
                    je.extend(
                      { url: e, type: t, dataType: o, data: n, success: r },
                      je.isPlainObject(e) && e,
                    ),
                  )
                );
              };
            }),
            je.ajaxPrefilter(function (e) {
              var t;
              for (t in e.headers)
                'content-type' === t.toLowerCase() && (e.contentType = e.headers[t] || '');
            }),
            (je._evalUrl = function (e, t, n) {
              return je.ajax({
                url: e,
                type: 'GET',
                dataType: 'script',
                cache: !0,
                async: !1,
                global: !1,
                converters: { 'text script': function () {} },
                dataFilter: function (e) {
                  je.globalEval(e, t, n);
                },
              });
            }),
            je.fn.extend({
              wrapAll: function (e) {
                var t;
                return (
                  this[0] &&
                    (be(e) && (e = e.call(this[0])),
                    (t = je(e, this[0].ownerDocument).eq(0).clone(!0)),
                    this[0].parentNode && t.insertBefore(this[0]),
                    t
                      .map(function () {
                        for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                        return e;
                      })
                      .append(this)),
                  this
                );
              },
              wrapInner: function (e) {
                return be(e)
                  ? this.each(function (t) {
                      je(this).wrapInner(e.call(this, t));
                    })
                  : this.each(function () {
                      var t = je(this),
                        n = t.contents();
                      n.length ? n.wrapAll(e) : t.append(e);
                    });
              },
              wrap: function (e) {
                var t = be(e);
                return this.each(function (n) {
                  je(this).wrapAll(t ? e.call(this, n) : e);
                });
              },
              unwrap: function (e) {
                return (
                  this.parent(e)
                    .not('body')
                    .each(function () {
                      je(this).replaceWith(this.childNodes);
                    }),
                  this
                );
              },
            }),
            (je.expr.pseudos.hidden = function (e) {
              return !je.expr.pseudos.visible(e);
            }),
            (je.expr.pseudos.visible = function (e) {
              return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
            }),
            (je.ajaxSettings.xhr = function () {
              try {
                return new e.XMLHttpRequest();
              } catch (e) {}
            });
          var Jt = { 0: 200, 1223: 204 },
            Kt = je.ajaxSettings.xhr();
          (ye.cors = !!Kt && 'withCredentials' in Kt),
            (ye.ajax = Kt = !!Kt),
            je.ajaxTransport(function (t) {
              var n, r;
              if (ye.cors || (Kt && !t.crossDomain))
                return {
                  send: function (o, i) {
                    var s,
                      a = t.xhr();
                    if ((a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields))
                      for (s in t.xhrFields) a[s] = t.xhrFields[s];
                    t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType),
                      t.crossDomain ||
                        o['X-Requested-With'] ||
                        (o['X-Requested-With'] = 'XMLHttpRequest');
                    for (s in o) a.setRequestHeader(s, o[s]);
                    (n = function (e) {
                      return function () {
                        n &&
                          ((n =
                            r =
                            a.onload =
                            a.onerror =
                            a.onabort =
                            a.ontimeout =
                            a.onreadystatechange =
                              null),
                          'abort' === e
                            ? a.abort()
                            : 'error' === e
                            ? 'number' != typeof a.status
                              ? i(0, 'error')
                              : i(a.status, a.statusText)
                            : i(
                                Jt[a.status] || a.status,
                                a.statusText,
                                'text' !== (a.responseType || 'text') ||
                                  'string' != typeof a.responseText
                                  ? { binary: a.response }
                                  : { text: a.responseText },
                                a.getAllResponseHeaders(),
                              ));
                      };
                    }),
                      (a.onload = n()),
                      (r = a.onerror = a.ontimeout = n('error')),
                      void 0 !== a.onabort
                        ? (a.onabort = r)
                        : (a.onreadystatechange = function () {
                            4 === a.readyState &&
                              e.setTimeout(function () {
                                n && r();
                              });
                          }),
                      (n = n('abort'));
                    try {
                      a.send((t.hasContent && t.data) || null);
                    } catch (e) {
                      if (n) throw e;
                    }
                  },
                  abort: function () {
                    n && n();
                  },
                };
            }),
            je.ajaxPrefilter(function (e) {
              e.crossDomain && (e.contents.script = !1);
            }),
            je.ajaxSetup({
              accepts: {
                script:
                  'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
              },
              contents: { script: /\b(?:java|ecma)script\b/ },
              converters: {
                'text script': function (e) {
                  return je.globalEval(e), e;
                },
              },
            }),
            je.ajaxPrefilter('script', function (e) {
              void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = 'GET');
            }),
            je.ajaxTransport('script', function (e) {
              if (e.crossDomain || e.scriptAttrs) {
                var t, n;
                return {
                  send: function (r, o) {
                    (t = je('<script>')
                      .attr(e.scriptAttrs || {})
                      .prop({ charset: e.scriptCharset, src: e.url })
                      .on(
                        'load error',
                        (n = function (e) {
                          t.remove(), (n = null), e && o('error' === e.type ? 404 : 200, e.type);
                        }),
                      )),
                      we.head.appendChild(t[0]);
                  },
                  abort: function () {
                    n && n();
                  },
                };
              }
            });
          var Zt = [],
            en = /(=)\?(?=&|$)|\?\?/;
          je.ajaxSetup({
            jsonp: 'callback',
            jsonpCallback: function () {
              var e = Zt.pop() || je.expando + '_' + Ht.guid++;
              return (this[e] = !0), e;
            },
          }),
            je.ajaxPrefilter('json jsonp', function (t, n, r) {
              var o,
                i,
                s,
                a =
                  t.jsonp !== !1 &&
                  (en.test(t.url)
                    ? 'url'
                    : 'string' == typeof t.data &&
                      0 === (t.contentType || '').indexOf('application/x-www-form-urlencoded') &&
                      en.test(t.data) &&
                      'data');
              if (a || 'jsonp' === t.dataTypes[0])
                return (
                  (o = t.jsonpCallback = be(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                  a
                    ? (t[a] = t[a].replace(en, '$1' + o))
                    : t.jsonp !== !1 && (t.url += (Rt.test(t.url) ? '&' : '?') + t.jsonp + '=' + o),
                  (t.converters['script json'] = function () {
                    return s || je.error(o + ' was not called'), s[0];
                  }),
                  (t.dataTypes[0] = 'json'),
                  (i = e[o]),
                  (e[o] = function () {
                    s = arguments;
                  }),
                  r.always(function () {
                    void 0 === i ? je(e).removeProp(o) : (e[o] = i),
                      t[o] && ((t.jsonpCallback = n.jsonpCallback), Zt.push(o)),
                      s && be(i) && i(s[0]),
                      (s = i = void 0);
                  }),
                  'script'
                );
            }),
            (ye.createHTMLDocument = (function () {
              var e = we.implementation.createHTMLDocument('').body;
              return (e.innerHTML = '<form></form><form></form>'), 2 === e.childNodes.length;
            })()),
            (je.parseHTML = function (e, t, n) {
              if ('string' != typeof e) return [];
              'boolean' == typeof t && ((n = t), (t = !1));
              var r, o, i;
              return (
                t ||
                  (ye.createHTMLDocument
                    ? ((t = we.implementation.createHTMLDocument('')),
                      (r = t.createElement('base')),
                      (r.href = we.location.href),
                      t.head.appendChild(r))
                    : (t = we)),
                (o = Ne.exec(e)),
                (i = !n && []),
                o
                  ? [t.createElement(o[1])]
                  : ((o = C([e], t, i)),
                    i && i.length && je(i).remove(),
                    je.merge([], o.childNodes))
              );
            }),
            (je.fn.load = function (e, t, n) {
              var r,
                o,
                i,
                s = this,
                a = e.indexOf(' ');
              return (
                a > -1 && ((r = K(e.slice(a))), (e = e.slice(0, a))),
                be(t) ? ((n = t), (t = void 0)) : t && 'object' == typeof t && (o = 'POST'),
                s.length > 0 &&
                  je
                    .ajax({ url: e, type: o || 'GET', dataType: 'html', data: t })
                    .done(function (e) {
                      (i = arguments), s.html(r ? je('<div>').append(je.parseHTML(e)).find(r) : e);
                    })
                    .always(
                      n &&
                        function (e, t) {
                          s.each(function () {
                            n.apply(this, i || [e.responseText, t, e]);
                          });
                        },
                    ),
                this
              );
            }),
            (je.expr.pseudos.animated = function (e) {
              return je.grep(je.timers, function (t) {
                return e === t.elem;
              }).length;
            }),
            (je.offset = {
              setOffset: function (e, t, n) {
                var r,
                  o,
                  i,
                  s,
                  a,
                  u,
                  l,
                  c = je.css(e, 'position'),
                  f = je(e),
                  p = {};
                'static' === c && (e.style.position = 'relative'),
                  (a = f.offset()),
                  (i = je.css(e, 'top')),
                  (u = je.css(e, 'left')),
                  (l = ('absolute' === c || 'fixed' === c) && (i + u).indexOf('auto') > -1),
                  l
                    ? ((r = f.position()), (s = r.top), (o = r.left))
                    : ((s = parseFloat(i) || 0), (o = parseFloat(u) || 0)),
                  be(t) && (t = t.call(e, n, je.extend({}, a))),
                  null != t.top && (p.top = t.top - a.top + s),
                  null != t.left && (p.left = t.left - a.left + o),
                  'using' in t
                    ? t.using.call(e, p)
                    : ('number' == typeof p.top && (p.top += 'px'),
                      'number' == typeof p.left && (p.left += 'px'),
                      f.css(p));
              },
            }),
            je.fn.extend({
              offset: function (e) {
                if (arguments.length)
                  return void 0 === e
                    ? this
                    : this.each(function (t) {
                        je.offset.setOffset(this, e, t);
                      });
                var t,
                  n,
                  r = this[0];
                if (r)
                  return r.getClientRects().length
                    ? ((t = r.getBoundingClientRect()),
                      (n = r.ownerDocument.defaultView),
                      { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset })
                    : { top: 0, left: 0 };
              },
              position: function () {
                if (this[0]) {
                  var e,
                    t,
                    n,
                    r = this[0],
                    o = { top: 0, left: 0 };
                  if ('fixed' === je.css(r, 'position')) t = r.getBoundingClientRect();
                  else {
                    for (
                      t = this.offset(),
                        n = r.ownerDocument,
                        e = r.offsetParent || n.documentElement;
                      e &&
                      (e === n.body || e === n.documentElement) &&
                      'static' === je.css(e, 'position');

                    )
                      e = e.parentNode;
                    e &&
                      e !== r &&
                      1 === e.nodeType &&
                      ((o = je(e).offset()),
                      (o.top += je.css(e, 'borderTopWidth', !0)),
                      (o.left += je.css(e, 'borderLeftWidth', !0)));
                  }
                  return {
                    top: t.top - o.top - je.css(r, 'marginTop', !0),
                    left: t.left - o.left - je.css(r, 'marginLeft', !0),
                  };
                }
              },
              offsetParent: function () {
                return this.map(function () {
                  for (var e = this.offsetParent; e && 'static' === je.css(e, 'position'); )
                    e = e.offsetParent;
                  return e || Ye;
                });
              },
            }),
            je.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function (e, t) {
              var n = 'pageYOffset' === t;
              je.fn[e] = function (r) {
                return Me(
                  this,
                  function (e, r, o) {
                    var i;
                    return (
                      xe(e) ? (i = e) : 9 === e.nodeType && (i = e.defaultView),
                      void 0 === o
                        ? i
                          ? i[t]
                          : e[r]
                        : void (i
                            ? i.scrollTo(n ? i.pageXOffset : o, n ? o : i.pageYOffset)
                            : (e[r] = o))
                    );
                  },
                  e,
                  r,
                  arguments.length,
                );
              };
            }),
            je.each(['top', 'left'], function (e, t) {
              je.cssHooks[t] = M(ye.pixelPosition, function (e, n) {
                if (n) return (n = I(e, t)), ft.test(n) ? je(e).position()[t] + 'px' : n;
              });
            }),
            je.each({ Height: 'height', Width: 'width' }, function (e, t) {
              je.each({ padding: 'inner' + e, content: t, '': 'outer' + e }, function (n, r) {
                je.fn[r] = function (o, i) {
                  var s = arguments.length && (n || 'boolean' != typeof o),
                    a = n || (o === !0 || i === !0 ? 'margin' : 'border');
                  return Me(
                    this,
                    function (t, n, o) {
                      var i;
                      return xe(t)
                        ? 0 === r.indexOf('outer')
                          ? t['inner' + e]
                          : t.document.documentElement['client' + e]
                        : 9 === t.nodeType
                        ? ((i = t.documentElement),
                          Math.max(
                            t.body['scroll' + e],
                            i['scroll' + e],
                            t.body['offset' + e],
                            i['offset' + e],
                            i['client' + e],
                          ))
                        : void 0 === o
                        ? je.css(t, n, a)
                        : je.style(t, n, o, a);
                    },
                    t,
                    s ? o : void 0,
                    s,
                  );
                };
              });
            }),
            je.each(
              ['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'],
              function (e, t) {
                je.fn[t] = function (e) {
                  return this.on(t, e);
                };
              },
            ),
            je.fn.extend({
              bind: function (e, t, n) {
                return this.on(e, null, t, n);
              },
              unbind: function (e, t) {
                return this.off(e, null, t);
              },
              delegate: function (e, t, n, r) {
                return this.on(t, e, n, r);
              },
              undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, '**') : this.off(t, e || '**', n);
              },
              hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e);
              },
            }),
            je.each(
              'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
                ' ',
              ),
              function (e, t) {
                je.fn[t] = function (e, n) {
                  return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
                };
              },
            );
          var tn = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
          (je.proxy = function (e, t) {
            var n, r, o;
            if (('string' == typeof t && ((n = e[t]), (t = e), (e = n)), be(e)))
              return (
                (r = le.call(arguments, 2)),
                (o = function () {
                  return e.apply(t || this, r.concat(le.call(arguments)));
                }),
                (o.guid = e.guid = e.guid || je.guid++),
                o
              );
          }),
            (je.holdReady = function (e) {
              e ? je.readyWait++ : je.ready(!0);
            }),
            (je.isArray = Array.isArray),
            (je.parseJSON = JSON.parse),
            (je.nodeName = i),
            (je.isFunction = be),
            (je.isWindow = xe),
            (je.camelCase = d),
            (je.type = r),
            (je.now = Date.now),
            (je.isNumeric = function (e) {
              var t = je.type(e);
              return ('number' === t || 'string' === t) && !isNaN(e - parseFloat(e));
            }),
            (je.trim = function (e) {
              return null == e ? '' : (e + '').replace(tn, '');
            }),
            'function' == typeof define &&
              define.amd &&
              define('jquery', [], function () {
                return je;
              });
          var nn = e.jQuery,
            rn = e.$;
          return (
            (je.noConflict = function (t) {
              return e.$ === je && (e.$ = rn), t && e.jQuery === je && (e.jQuery = nn), je;
            }),
            'undefined' == typeof t && (e.jQuery = e.$ = je),
            je
          );
        });
      },
      {},
    ],
    3: [
      function (e, t, n) {
        (function (e) {
          (function () {
            function t(e, t) {
              for (var n = 0, r = e.length - 1; r >= 0; r--) {
                var o = e[r];
                '.' === o
                  ? e.splice(r, 1)
                  : '..' === o
                  ? (e.splice(r, 1), n++)
                  : n && (e.splice(r, 1), n--);
              }
              if (t) for (; n--; n) e.unshift('..');
              return e;
            }
            function r(e) {
              'string' != typeof e && (e += '');
              var t,
                n = 0,
                r = -1,
                o = !0;
              for (t = e.length - 1; t >= 0; --t)
                if (47 === e.charCodeAt(t)) {
                  if (!o) {
                    n = t + 1;
                    break;
                  }
                } else r === -1 && ((o = !1), (r = t + 1));
              return r === -1 ? '' : e.slice(n, r);
            }
            function o(e, t) {
              if (e.filter) return e.filter(t);
              for (var n = [], r = 0; r < e.length; r++) t(e[r], r, e) && n.push(e[r]);
              return n;
            }
            (n.resolve = function () {
              for (var n = '', r = !1, i = arguments.length - 1; i >= -1 && !r; i--) {
                var s = i >= 0 ? arguments[i] : e.cwd();
                if ('string' != typeof s)
                  throw new TypeError('Arguments to path.resolve must be strings');
                s && ((n = s + '/' + n), (r = '/' === s.charAt(0)));
              }
              return (
                (n = t(
                  o(n.split('/'), function (e) {
                    return !!e;
                  }),
                  !r,
                ).join('/')),
                (r ? '/' : '') + n || '.'
              );
            }),
              (n.normalize = function (e) {
                var r = n.isAbsolute(e),
                  s = '/' === i(e, -1);
                return (
                  (e = t(
                    o(e.split('/'), function (e) {
                      return !!e;
                    }),
                    !r,
                  ).join('/')),
                  e || r || (e = '.'),
                  e && s && (e += '/'),
                  (r ? '/' : '') + e
                );
              }),
              (n.isAbsolute = function (e) {
                return '/' === e.charAt(0);
              }),
              (n.join = function () {
                var e = Array.prototype.slice.call(arguments, 0);
                return n.normalize(
                  o(e, function (e, t) {
                    if ('string' != typeof e)
                      throw new TypeError('Arguments to path.join must be strings');
                    return e;
                  }).join('/'),
                );
              }),
              (n.relative = function (e, t) {
                function r(e) {
                  for (var t = 0; t < e.length && '' === e[t]; t++);
                  for (var n = e.length - 1; n >= 0 && '' === e[n]; n--);
                  return t > n ? [] : e.slice(t, n - t + 1);
                }
                (e = n.resolve(e).substr(1)), (t = n.resolve(t).substr(1));
                for (
                  var o = r(e.split('/')),
                    i = r(t.split('/')),
                    s = Math.min(o.length, i.length),
                    a = s,
                    u = 0;
                  u < s;
                  u++
                )
                  if (o[u] !== i[u]) {
                    a = u;
                    break;
                  }
                for (var l = [], u = a; u < o.length; u++) l.push('..');
                return (l = l.concat(i.slice(a))), l.join('/');
              }),
              (n.sep = '/'),
              (n.delimiter = ':'),
              (n.dirname = function (e) {
                if (('string' != typeof e && (e += ''), 0 === e.length)) return '.';
                for (
                  var t = e.charCodeAt(0), n = 47 === t, r = -1, o = !0, i = e.length - 1;
                  i >= 1;
                  --i
                )
                  if (((t = e.charCodeAt(i)), 47 === t)) {
                    if (!o) {
                      r = i;
                      break;
                    }
                  } else o = !1;
                return r === -1 ? (n ? '/' : '.') : n && 1 === r ? '/' : e.slice(0, r);
              }),
              (n.basename = function (e, t) {
                var n = r(e);
                return (
                  t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n
                );
              }),
              (n.extname = function (e) {
                'string' != typeof e && (e += '');
                for (var t = -1, n = 0, r = -1, o = !0, i = 0, s = e.length - 1; s >= 0; --s) {
                  var a = e.charCodeAt(s);
                  if (47 !== a)
                    r === -1 && ((o = !1), (r = s + 1)),
                      46 === a ? (t === -1 ? (t = s) : 1 !== i && (i = 1)) : t !== -1 && (i = -1);
                  else if (!o) {
                    n = s + 1;
                    break;
                  }
                }
                return t === -1 || r === -1 || 0 === i || (1 === i && t === r - 1 && t === n + 1)
                  ? ''
                  : e.slice(t, r);
              });
            var i =
              'b' === 'ab'.substr(-1)
                ? function (e, t, n) {
                    return e.substr(t, n);
                  }
                : function (e, t, n) {
                    return t < 0 && (t = e.length + t), e.substr(t, n);
                  };
          }).call(this);
        }).call(this, e('_process'));
      },
      { _process: 4 },
    ],
    4: [
      function (e, t, n) {
        function r() {
          throw new Error('setTimeout has not been defined');
        }
        function o() {
          throw new Error('clearTimeout has not been defined');
        }
        function i(e) {
          if (f === setTimeout) return setTimeout(e, 0);
          if ((f === r || !f) && setTimeout) return (f = setTimeout), setTimeout(e, 0);
          try {
            return f(e, 0);
          } catch (t) {
            try {
              return f.call(null, e, 0);
            } catch (t) {
              return f.call(this, e, 0);
            }
          }
        }
        function s(e) {
          if (p === clearTimeout) return clearTimeout(e);
          if ((p === o || !p) && clearTimeout) return (p = clearTimeout), clearTimeout(e);
          try {
            return p(e);
          } catch (t) {
            try {
              return p.call(null, e);
            } catch (t) {
              return p.call(this, e);
            }
          }
        }
        function a() {
          v && d && ((v = !1), d.length ? (g = d.concat(g)) : (m = -1), g.length && u());
        }
        function u() {
          if (!v) {
            var e = i(a);
            v = !0;
            for (var t = g.length; t; ) {
              for (d = g, g = []; ++m < t; ) d && d[m].run();
              (m = -1), (t = g.length);
            }
            (d = null), (v = !1), s(e);
          }
        }
        function l(e, t) {
          (this.fun = e), (this.array = t);
        }
        function c() {}
        var f,
          p,
          h = (t.exports = {});
        !(function () {
          try {
            f = 'function' == typeof setTimeout ? setTimeout : r;
          } catch (e) {
            f = r;
          }
          try {
            p = 'function' == typeof clearTimeout ? clearTimeout : o;
          } catch (e) {
            p = o;
          }
        })();
        var d,
          g = [],
          v = !1,
          m = -1;
        (h.nextTick = function (e) {
          var t = new Array(arguments.length - 1);
          if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
          g.push(new l(e, t)), 1 !== g.length || v || i(u);
        }),
          (l.prototype.run = function () {
            this.fun.apply(null, this.array);
          }),
          (h.title = 'browser'),
          (h.browser = !0),
          (h.env = {}),
          (h.argv = []),
          (h.version = ''),
          (h.versions = {}),
          (h.on = c),
          (h.addListener = c),
          (h.once = c),
          (h.off = c),
          (h.removeListener = c),
          (h.removeAllListeners = c),
          (h.emit = c),
          (h.prependListener = c),
          (h.prependOnceListener = c),
          (h.listeners = function (e) {
            return [];
          }),
          (h.binding = function (e) {
            throw new Error('process.binding is not supported');
          }),
          (h.cwd = function () {
            return '/';
          }),
          (h.chdir = function (e) {
            throw new Error('process.chdir is not supported');
          }),
          (h.umask = function () {
            return 0;
          });
      },
      {},
    ],
    5: [
      function (e, t, n) {
        'use strict';
        function r(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }
        t.exports = function (e, t, n, i) {
          (t = t || '&'), (n = n || '=');
          var s = {};
          if ('string' != typeof e || 0 === e.length) return s;
          var a = /\+/g;
          e = e.split(t);
          var u = 1e3;
          i && 'number' == typeof i.maxKeys && (u = i.maxKeys);
          var l = e.length;
          u > 0 && l > u && (l = u);
          for (var c = 0; c < l; ++c) {
            var f,
              p,
              h,
              d,
              g = e[c].replace(a, '%20'),
              v = g.indexOf(n);
            v >= 0 ? ((f = g.substr(0, v)), (p = g.substr(v + 1))) : ((f = g), (p = '')),
              (h = decodeURIComponent(f)),
              (d = decodeURIComponent(p)),
              r(s, h) ? (o(s[h]) ? s[h].push(d) : (s[h] = [s[h], d])) : (s[h] = d);
          }
          return s;
        };
        var o =
          Array.isArray ||
          function (e) {
            return '[object Array]' === Object.prototype.toString.call(e);
          };
      },
      {},
    ],
    6: [
      function (e, t, n) {
        'use strict';
        function r(e, t) {
          if (e.map) return e.map(t);
          for (var n = [], r = 0; r < e.length; r++) n.push(t(e[r], r));
          return n;
        }
        var o = function (e) {
          switch (typeof e) {
            case 'string':
              return e;
            case 'boolean':
              return e ? 'true' : 'false';
            case 'number':
              return isFinite(e) ? e : '';
            default:
              return '';
          }
        };
        t.exports = function (e, t, n, a) {
          return (
            (t = t || '&'),
            (n = n || '='),
            null === e && (e = void 0),
            'object' == typeof e
              ? r(s(e), function (s) {
                  var a = encodeURIComponent(o(s)) + n;
                  return i(e[s])
                    ? r(e[s], function (e) {
                        return a + encodeURIComponent(o(e));
                      }).join(t)
                    : a + encodeURIComponent(o(e[s]));
                }).join(t)
              : a
              ? encodeURIComponent(o(a)) + n + encodeURIComponent(o(e))
              : ''
          );
        };
        var i =
            Array.isArray ||
            function (e) {
              return '[object Array]' === Object.prototype.toString.call(e);
            },
          s =
            Object.keys ||
            function (e) {
              var t = [];
              for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
              return t;
            };
      },
      {},
    ],
    7: [
      function (e, t, n) {
        'use strict';
        (n.decode = n.parse = e('./decode')), (n.encode = n.stringify = e('./encode'));
      },
      { './decode': 5, './encode': 6 },
    ],
    8: [
      function (e, t, n) {
        'use strict';
        function r() {
          (this.protocol = null),
            (this.slashes = null),
            (this.auth = null),
            (this.host = null),
            (this.port = null),
            (this.hostname = null),
            (this.hash = null),
            (this.search = null),
            (this.query = null),
            (this.pathname = null),
            (this.path = null),
            (this.href = null);
        }
        function o(e, t, n) {
          if (e && l.isObject(e) && e instanceof r) return e;
          var o = new r();
          return o.parse(e, t, n), o;
        }
        function i(e) {
          return (
            l.isString(e) && (e = o(e)), e instanceof r ? e.format() : r.prototype.format.call(e)
          );
        }
        function s(e, t) {
          return o(e, !1, !0).resolve(t);
        }
        function a(e, t) {
          return e ? o(e, !1, !0).resolveObject(t) : t;
        }
        var u = e('punycode'),
          l = e('./util');
        (n.parse = o), (n.resolve = s), (n.resolveObject = a), (n.format = i), (n.Url = r);
        var c = /^([a-z0-9.+-]+:)/i,
          f = /:[0-9]*$/,
          p = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
          h = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
          d = ['{', '}', '|', '\\', '^', '`'].concat(h),
          g = ["'"].concat(d),
          v = ['%', '/', '?', ';', '#'].concat(g),
          m = ['/', '?', '#'],
          y = 255,
          b = /^[+a-z0-9A-Z_-]{0,63}$/,
          x = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          w = { javascript: !0, 'javascript:': !0 },
          T = { javascript: !0, 'javascript:': !0 },
          C = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            'http:': !0,
            'https:': !0,
            'ftp:': !0,
            'gopher:': !0,
            'file:': !0,
          },
          j = e('querystring');
        (r.prototype.parse = function (e, t, n) {
          if (!l.isString(e))
            throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
          var r = e.indexOf('?'),
            o = r !== -1 && r < e.indexOf('#') ? '?' : '#',
            i = e.split(o),
            s = /\\/g;
          (i[0] = i[0].replace(s, '/')), (e = i.join(o));
          var a = e;
          if (((a = a.trim()), !n && 1 === e.split('#').length)) {
            var f = p.exec(a);
            if (f)
              return (
                (this.path = a),
                (this.href = a),
                (this.pathname = f[1]),
                f[2]
                  ? ((this.search = f[2]),
                    t
                      ? (this.query = j.parse(this.search.substr(1)))
                      : (this.query = this.search.substr(1)))
                  : t && ((this.search = ''), (this.query = {})),
                this
              );
          }
          var h = c.exec(a);
          if (h) {
            h = h[0];
            var d = h.toLowerCase();
            (this.protocol = d), (a = a.substr(h.length));
          }
          if (n || h || a.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var A = '//' === a.substr(0, 2);
            !A || (h && T[h]) || ((a = a.substr(2)), (this.slashes = !0));
          }
          if (!T[h] && (A || (h && !C[h]))) {
            for (var k = -1, E = 0; E < m.length; E++) {
              var S = a.indexOf(m[E]);
              S !== -1 && (k === -1 || S < k) && (k = S);
            }
            var N, q;
            (q = k === -1 ? a.lastIndexOf('@') : a.lastIndexOf('@', k)),
              q !== -1 &&
                ((N = a.slice(0, q)), (a = a.slice(q + 1)), (this.auth = decodeURIComponent(N))),
              (k = -1);
            for (var E = 0; E < v.length; E++) {
              var S = a.indexOf(v[E]);
              S !== -1 && (k === -1 || S < k) && (k = S);
            }
            k === -1 && (k = a.length),
              (this.host = a.slice(0, k)),
              (a = a.slice(k)),
              this.parseHost(),
              (this.hostname = this.hostname || '');
            var D = '[' === this.hostname[0] && ']' === this.hostname[this.hostname.length - 1];
            if (!D)
              for (var L = this.hostname.split(/\./), E = 0, O = L.length; E < O; E++) {
                var H = L[E];
                if (H && !H.match(b)) {
                  for (var R = '', P = 0, I = H.length; P < I; P++)
                    R += H.charCodeAt(P) > 127 ? 'x' : H[P];
                  if (!R.match(b)) {
                    var M = L.slice(0, E),
                      F = L.slice(E + 1),
                      $ = H.match(x);
                    $ && (M.push($[1]), F.unshift($[2])),
                      F.length && (a = '/' + F.join('.') + a),
                      (this.hostname = M.join('.'));
                    break;
                  }
                }
              }
            this.hostname.length > y
              ? (this.hostname = '')
              : (this.hostname = this.hostname.toLowerCase()),
              D || (this.hostname = u.toASCII(this.hostname));
            var W = this.port ? ':' + this.port : '',
              B = this.hostname || '';
            (this.host = B + W),
              (this.href += this.host),
              D &&
                ((this.hostname = this.hostname.substr(1, this.hostname.length - 2)),
                '/' !== a[0] && (a = '/' + a));
          }
          if (!w[d])
            for (var E = 0, O = g.length; E < O; E++) {
              var _ = g[E];
              if (a.indexOf(_) !== -1) {
                var U = encodeURIComponent(_);
                U === _ && (U = escape(_)), (a = a.split(_).join(U));
              }
            }
          var z = a.indexOf('#');
          z !== -1 && ((this.hash = a.substr(z)), (a = a.slice(0, z)));
          var X = a.indexOf('?');
          if (
            (X !== -1
              ? ((this.search = a.substr(X)),
                (this.query = a.substr(X + 1)),
                t && (this.query = j.parse(this.query)),
                (a = a.slice(0, X)))
              : t && ((this.search = ''), (this.query = {})),
            a && (this.pathname = a),
            C[d] && this.hostname && !this.pathname && (this.pathname = '/'),
            this.pathname || this.search)
          ) {
            var W = this.pathname || '',
              V = this.search || '';
            this.path = W + V;
          }
          return (this.href = this.format()), this;
        }),
          (r.prototype.format = function () {
            var e = this.auth || '';
            e && ((e = encodeURIComponent(e)), (e = e.replace(/%3A/i, ':')), (e += '@'));
            var t = this.protocol || '',
              n = this.pathname || '',
              r = this.hash || '',
              o = !1,
              i = '';
            this.host
              ? (o = e + this.host)
              : this.hostname &&
                ((o =
                  e +
                  (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']')),
                this.port && (o += ':' + this.port)),
              this.query &&
                l.isObject(this.query) &&
                Object.keys(this.query).length &&
                (i = j.stringify(this.query));
            var s = this.search || (i && '?' + i) || '';
            return (
              t && ':' !== t.substr(-1) && (t += ':'),
              this.slashes || ((!t || C[t]) && o !== !1)
                ? ((o = '//' + (o || '')), n && '/' !== n.charAt(0) && (n = '/' + n))
                : o || (o = ''),
              r && '#' !== r.charAt(0) && (r = '#' + r),
              s && '?' !== s.charAt(0) && (s = '?' + s),
              (n = n.replace(/[?#]/g, function (e) {
                return encodeURIComponent(e);
              })),
              (s = s.replace('#', '%23')),
              t + o + n + s + r
            );
          }),
          (r.prototype.resolve = function (e) {
            return this.resolveObject(o(e, !1, !0)).format();
          }),
          (r.prototype.resolveObject = function (e) {
            if (l.isString(e)) {
              var t = new r();
              t.parse(e, !1, !0), (e = t);
            }
            for (var n = new r(), o = Object.keys(this), i = 0; i < o.length; i++) {
              var s = o[i];
              n[s] = this[s];
            }
            if (((n.hash = e.hash), '' === e.href)) return (n.href = n.format()), n;
            if (e.slashes && !e.protocol) {
              for (var a = Object.keys(e), u = 0; u < a.length; u++) {
                var c = a[u];
                'protocol' !== c && (n[c] = e[c]);
              }
              return (
                C[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = '/'),
                (n.href = n.format()),
                n
              );
            }
            if (e.protocol && e.protocol !== n.protocol) {
              if (!C[e.protocol]) {
                for (var f = Object.keys(e), p = 0; p < f.length; p++) {
                  var h = f[p];
                  n[h] = e[h];
                }
                return (n.href = n.format()), n;
              }
              if (((n.protocol = e.protocol), e.host || T[e.protocol])) n.pathname = e.pathname;
              else {
                for (var d = (e.pathname || '').split('/'); d.length && !(e.host = d.shift()); );
                e.host || (e.host = ''),
                  e.hostname || (e.hostname = ''),
                  '' !== d[0] && d.unshift(''),
                  d.length < 2 && d.unshift(''),
                  (n.pathname = d.join('/'));
              }
              if (
                ((n.search = e.search),
                (n.query = e.query),
                (n.host = e.host || ''),
                (n.auth = e.auth),
                (n.hostname = e.hostname || e.host),
                (n.port = e.port),
                n.pathname || n.search)
              ) {
                var g = n.pathname || '',
                  v = n.search || '';
                n.path = g + v;
              }
              return (n.slashes = n.slashes || e.slashes), (n.href = n.format()), n;
            }
            var m = n.pathname && '/' === n.pathname.charAt(0),
              y = e.host || (e.pathname && '/' === e.pathname.charAt(0)),
              b = y || m || (n.host && e.pathname),
              x = b,
              w = (n.pathname && n.pathname.split('/')) || [],
              d = (e.pathname && e.pathname.split('/')) || [],
              j = n.protocol && !C[n.protocol];
            if (
              (j &&
                ((n.hostname = ''),
                (n.port = null),
                n.host && ('' === w[0] ? (w[0] = n.host) : w.unshift(n.host)),
                (n.host = ''),
                e.protocol &&
                  ((e.hostname = null),
                  (e.port = null),
                  e.host && ('' === d[0] ? (d[0] = e.host) : d.unshift(e.host)),
                  (e.host = null)),
                (b = b && ('' === d[0] || '' === w[0]))),
              y)
            )
              (n.host = e.host || '' === e.host ? e.host : n.host),
                (n.hostname = e.hostname || '' === e.hostname ? e.hostname : n.hostname),
                (n.search = e.search),
                (n.query = e.query),
                (w = d);
            else if (d.length)
              w || (w = []), w.pop(), (w = w.concat(d)), (n.search = e.search), (n.query = e.query);
            else if (!l.isNullOrUndefined(e.search)) {
              if (j) {
                n.hostname = n.host = w.shift();
                var A = !!(n.host && n.host.indexOf('@') > 0) && n.host.split('@');
                A && ((n.auth = A.shift()), (n.host = n.hostname = A.shift()));
              }
              return (
                (n.search = e.search),
                (n.query = e.query),
                (l.isNull(n.pathname) && l.isNull(n.search)) ||
                  (n.path = (n.pathname ? n.pathname : '') + (n.search ? n.search : '')),
                (n.href = n.format()),
                n
              );
            }
            if (!w.length)
              return (
                (n.pathname = null),
                n.search ? (n.path = '/' + n.search) : (n.path = null),
                (n.href = n.format()),
                n
              );
            for (
              var k = w.slice(-1)[0],
                E = ((n.host || e.host || w.length > 1) && ('.' === k || '..' === k)) || '' === k,
                S = 0,
                N = w.length;
              N >= 0;
              N--
            )
              (k = w[N]),
                '.' === k
                  ? w.splice(N, 1)
                  : '..' === k
                  ? (w.splice(N, 1), S++)
                  : S && (w.splice(N, 1), S--);
            if (!b && !x) for (; S--; S) w.unshift('..');
            !b || '' === w[0] || (w[0] && '/' === w[0].charAt(0)) || w.unshift(''),
              E && '/' !== w.join('/').substr(-1) && w.push('');
            var q = '' === w[0] || (w[0] && '/' === w[0].charAt(0));
            if (j) {
              n.hostname = n.host = q ? '' : w.length ? w.shift() : '';
              var A = !!(n.host && n.host.indexOf('@') > 0) && n.host.split('@');
              A && ((n.auth = A.shift()), (n.host = n.hostname = A.shift()));
            }
            return (
              (b = b || (n.host && w.length)),
              b && !q && w.unshift(''),
              w.length ? (n.pathname = w.join('/')) : ((n.pathname = null), (n.path = null)),
              (l.isNull(n.pathname) && l.isNull(n.search)) ||
                (n.path = (n.pathname ? n.pathname : '') + (n.search ? n.search : '')),
              (n.auth = e.auth || n.auth),
              (n.slashes = n.slashes || e.slashes),
              (n.href = n.format()),
              n
            );
          }),
          (r.prototype.parseHost = function () {
            var e = this.host,
              t = f.exec(e);
            t &&
              ((t = t[0]),
              ':' !== t && (this.port = t.substr(1)),
              (e = e.substr(0, e.length - t.length))),
              e && (this.hostname = e);
          });
      },
      { './util': 9, punycode: 1, querystring: 7 },
    ],
    9: [
      function (e, t, n) {
        'use strict';
        t.exports = {
          isString: function (e) {
            return 'string' == typeof e;
          },
          isObject: function (e) {
            return 'object' == typeof e && null !== e;
          },
          isNull: function (e) {
            return null === e;
          },
          isNullOrUndefined: function (e) {
            return null == e;
          },
        };
      },
      {},
    ],
    10: [
      function (e, t, n) {
        var r = e('jquery');
        t.exports = r({});
      },
      { jquery: 2 },
    ],
    11: [
      function (e, t, n) {
        var r = e('jquery'),
          o = e('./events'),
          i = e('./storage'),
          s = e('./page'),
          a = !1,
          u = window.gitbook || [],
          l = {
            events: o,
            page: s,
            state: s.getState(),
            storage: i,
            push: function (e) {
              a ? e() : u.push(e);
            },
          },
          c = l,
          f = { gitbook: c, honkit: l, jquery: r };
        (window.gitbook = c),
          (window.honkit = l),
          (window.$ = r),
          (window.jQuery = r),
          (window.require = function (e, t) {
            (e = e.map(function (e) {
              if (((e = e.toLowerCase()), !f[e]))
                throw new Error('HonKit module ' + e + " doesn't exist");
              return f[e];
            })),
              t.apply(null, e);
          }),
          r(document).ready(function () {
            (a = !0),
              r.each(u, function (e, t) {
                t();
              });
          });
      },
      { './events': 10, './page': 12, './storage': 13, jquery: 2 },
    ],
    12: [
      function (e, t, n) {
        function r(e) {
          o(e),
            c || ((c = !0), l.trigger('start', e.config.pluginsConfig)),
            l.trigger('page.change');
        }
        function o(e) {
          (f.page = e.page),
            (f.file = e.file),
            (f.gitbook = e.gitbook),
            (f.config = e.config),
            (f.basePath = e.basePath),
            (f.book = e.book),
            (f.$book = s('.book')),
            (f.revision = f.gitbook.time),
            (f.level = f.page.level),
            (f.filepath = f.file.path),
            (f.chapterTitle = f.page.title),
            (f.innerLanguage = f.book.language || ''),
            (f.root = a
              .resolve(
                location.protocol + '//' + location.host,
                u.dirname(u.resolve(location.pathname.replace(/\/$/, '/index.html'), f.basePath)),
              )
              .replace(/\/?$/, '/')),
            (f.bookRoot = f.innerLanguage ? a.resolve(f.root, '..') : f.root);
        }
        function i() {
          return f;
        }
        var s = e('jquery'),
          a = e('url'),
          u = e('path'),
          l = e('./events'),
          c = !1,
          f = {};
        t.exports = { hasChanged: r, setState: o, getState: i };
      },
      { './events': 10, jquery: 2, path: 3, url: 8 },
    ],
    13: [
      function (e, t, n) {
        var r = '';
        t.exports = {
          setBaseKey: function (e) {
            r = e;
          },
          set: function (e, t) {
            e = r + ':' + e;
            try {
              localStorage[e] = JSON.stringify(t);
            } catch (e) {}
          },
          get: function (e, t) {
            var n;
            e = r + ':' + e;
            try {
              n = localStorage[e];
            } catch (e) {}
            if (void 0 === n) return t;
            try {
              var o = JSON.parse(n);
              return null == o ? t : o;
            } catch (e) {
              return n || t;
            }
          },
          remove: function (e) {
            e = r + ':' + e;
            try {
              localStorage.removeItem(e);
            } catch (e) {}
          },
        };
      },
      {},
    ],
  },
  {},
  [11],
);
