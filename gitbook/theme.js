!(function () {
  function e(t, n, r) {
    function o(a, s) {
      if (!n[a]) {
        if (!t[a]) {
          var u = 'function' == typeof require && require;
          if (!s && u) return u(a, !0);
          if (i) return i(a, !0);
          var l = new Error("Cannot find module '" + a + "'");
          throw ((l.code = 'MODULE_NOT_FOUND'), l);
        }
        var c = (n[a] = { exports: {} });
        t[a][0].call(
          c.exports,
          function (e) {
            var n = t[a][1][e];
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
      return n[a].exports;
    }
    for (var i = 'function' == typeof require && require, a = 0; a < r.length; a++) o(r[a]);
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
                throw new RangeError(L[e]);
              }
              function i(e, t) {
                for (var n = e.length, r = []; n--; ) r[n] = t(e[n]);
                return r;
              }
              function a(e, t) {
                var n = e.split('@'),
                  r = '';
                n.length > 1 && ((r = n[0] + '@'), (e = n[1])), (e = e.replace(O, '.'));
                var o = e.split('.'),
                  a = i(o, t).join('.');
                return r + a;
              }
              function s(e) {
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
                      (t += R(((e >>> 10) & 1023) | 55296)),
                      (e = 56320 | (1023 & e))),
                    (t += R(e))
                  );
                }).join('');
              }
              function l(e) {
                return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : C;
              }
              function c(e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
              }
              function f(e, t, n) {
                var r = 0;
                for (e = n ? P(e / E) : e >> 1, e += P(e / t); e > (H * k) >> 1; r += C)
                  e = P(e / H);
                return P(r + ((H + 1) * e) / (e + j));
              }
              function p(e) {
                var t,
                  n,
                  r,
                  i,
                  a,
                  s,
                  c,
                  p,
                  d,
                  h,
                  g = [],
                  v = e.length,
                  m = 0,
                  y = A,
                  b = S;
                for (n = e.lastIndexOf(N), n < 0 && (n = 0), r = 0; r < n; ++r)
                  e.charCodeAt(r) >= 128 && o('not-basic'), g.push(e.charCodeAt(r));
                for (i = n > 0 ? n + 1 : 0; i < v; ) {
                  for (
                    a = m, s = 1, c = C;
                    i >= v && o('invalid-input'),
                      (p = l(e.charCodeAt(i++))),
                      (p >= C || p > P((w - m) / s)) && o('overflow'),
                      (m += p * s),
                      (d = c <= b ? T : c >= b + k ? k : c - b),
                      !(p < d);
                    c += C
                  )
                    (h = C - d), s > P(w / h) && o('overflow'), (s *= h);
                  (t = g.length + 1),
                    (b = f(m - a, t, 0 == a)),
                    P(m / t) > w - y && o('overflow'),
                    (y += P(m / t)),
                    (m %= t),
                    g.splice(m++, 0, y);
                }
                return u(g);
              }
              function d(e) {
                var t,
                  n,
                  r,
                  i,
                  a,
                  u,
                  l,
                  p,
                  d,
                  h,
                  g,
                  v,
                  m,
                  y,
                  b,
                  x = [];
                for (e = s(e), v = e.length, t = A, n = 0, a = S, u = 0; u < v; ++u)
                  (g = e[u]), g < 128 && x.push(R(g));
                for (r = i = x.length, i && x.push(N); r < v; ) {
                  for (l = w, u = 0; u < v; ++u) (g = e[u]), g >= t && g < l && (l = g);
                  for (
                    m = r + 1,
                      l - t > P((w - n) / m) && o('overflow'),
                      n += (l - t) * m,
                      t = l,
                      u = 0;
                    u < v;
                    ++u
                  )
                    if (((g = e[u]), g < t && ++n > w && o('overflow'), g == t)) {
                      for (
                        p = n, d = C;
                        (h = d <= a ? T : d >= a + k ? k : d - a), !(p < h);
                        d += C
                      )
                        (b = p - h), (y = C - h), x.push(R(c(h + (b % y), 0))), (p = P(b / y));
                      x.push(R(c(p, 0))), (a = f(n, m, r == i)), (n = 0), ++r;
                    }
                  ++n, ++t;
                }
                return x.join('');
              }
              function h(e) {
                return a(e, function (e) {
                  return q.test(e) ? p(e.slice(4).toLowerCase()) : e;
                });
              }
              function g(e) {
                return a(e, function (e) {
                  return D.test(e) ? 'xn--' + d(e) : e;
                });
              }
              var v = 'object' == typeof n && n && !n.nodeType && n,
                m = 'object' == typeof t && t && !t.nodeType && t,
                y = 'object' == typeof e && e;
              (y.global !== y && y.window !== y && y.self !== y) || (r = y);
              var b,
                x,
                w = 2147483647,
                C = 36,
                T = 1,
                k = 26,
                j = 38,
                E = 700,
                S = 72,
                A = 128,
                N = '-',
                q = /^xn--/,
                D = /[^\x20-\x7E]/,
                O = /[\x2E\u3002\uFF0E\uFF61]/g,
                L = {
                  overflow: 'Overflow: input needs wider integers to process',
                  'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                  'invalid-input': 'Invalid input',
                },
                H = C - T,
                P = Math.floor,
                R = String.fromCharCode;
              if (
                ((b = {
                  version: '1.4.1',
                  ucs2: { decode: s, encode: u },
                  decode: p,
                  encode: d,
                  toASCII: g,
                  toUnicode: h,
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
              for (r in Ce)
                (o = t[r] || (t.getAttribute && t.getAttribute(r))), o && i.setAttribute(r, o);
            n.head.appendChild(i).parentNode.removeChild(i);
          }
          function r(e) {
            return null == e
              ? e + ''
              : 'object' == typeof e || 'function' == typeof e
              ? de[he.call(e)] || 'object'
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
          function a(e, t, n) {
            return be(t)
              ? ke.grep(e, function (e, r) {
                  return !!t.call(e, r, e) !== n;
                })
              : t.nodeType
              ? ke.grep(e, function (e) {
                  return (e === t) !== n;
                })
              : 'string' != typeof t
              ? ke.grep(e, function (e) {
                  return pe.call(t, e) > -1 !== n;
                })
              : ke.filter(t, e, n);
          }
          function s(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType; );
            return e;
          }
          function u(e) {
            var t = {};
            return (
              ke.each(e.match(Pe) || [], function (e, n) {
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
              ke.ready();
          }
          function d(e, t) {
            return t.toUpperCase();
          }
          function h(e) {
            return e.replace(_e, 'ms-').replace($e, d);
          }
          function g() {
            this.expando = ke.expando + g.uid++;
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
                We.set(e, t, n);
              } else n = void 0;
            return n;
          }
          function y(e, t, n, r) {
            var o,
              i,
              a = 20,
              s = r
                ? function () {
                    return r.cur();
                  }
                : function () {
                    return ke.css(e, t, '');
                  },
              u = s(),
              l = (n && n[3]) || (ke.cssNumber[t] ? '' : 'px'),
              c = e.nodeType && (ke.cssNumber[t] || ('px' !== l && +u)) && Ke.exec(ke.css(e, t));
            if (c && c[3] !== l) {
              for (u /= 2, l = l || c[3], c = +u || 1; a--; )
                ke.style(e, t, c + l),
                  (1 - i) * (1 - (i = s() / u || 0.5)) <= 0 && (a = 0),
                  (c /= i);
              (c = 2 * c), ke.style(e, t, c + l), (n = n || []);
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
                (o = ke.css(t, 'display')),
                t.parentNode.removeChild(t),
                'none' === o && (o = 'block'),
                (Ze[r] = o),
                o);
          }
          function x(e, t) {
            for (var n, r, o = [], i = 0, a = e.length; i < a; i++)
              (r = e[i]),
                r.style &&
                  ((n = r.style.display),
                  t
                    ? ('none' === n &&
                        ((o[i] = Be.get(r, 'display') || null), o[i] || (r.style.display = '')),
                      '' === r.style.display && Je(r) && (o[i] = b(r)))
                    : 'none' !== n && ((o[i] = 'none'), Be.set(r, 'display', n)));
            for (i = 0; i < a; i++) null != o[i] && (e[i].style.display = o[i]);
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
              void 0 === t || (t && i(e, t)) ? ke.merge([e], n) : n
            );
          }
          function C(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
              Be.set(e[n], 'globalEval', !t || Be.get(t[n], 'globalEval'));
          }
          function T(e, t, n, o, i) {
            for (
              var a, s, u, l, c, f, p = t.createDocumentFragment(), d = [], h = 0, g = e.length;
              h < g;
              h++
            )
              if (((a = e[h]), a || 0 === a))
                if ('object' === r(a)) ke.merge(d, a.nodeType ? [a] : a);
                else if (ot.test(a)) {
                  for (
                    s = s || p.appendChild(t.createElement('div')),
                      u = (tt.exec(a) || ['', ''])[1].toLowerCase(),
                      l = rt[u] || rt._default,
                      s.innerHTML = l[1] + ke.htmlPrefilter(a) + l[2],
                      f = l[0];
                    f--;

                  )
                    s = s.lastChild;
                  ke.merge(d, s.childNodes), (s = p.firstChild), (s.textContent = '');
                } else d.push(t.createTextNode(a));
            for (p.textContent = '', h = 0; (a = d[h++]); )
              if (o && ke.inArray(a, o) > -1) i && i.push(a);
              else if (((c = Ye(a)), (s = w(p.appendChild(a), 'script')), c && C(s), n))
                for (f = 0; (a = s[f++]); ) nt.test(a.type || '') && n.push(a);
            return p;
          }
          function k() {
            return !0;
          }
          function j() {
            return !1;
          }
          function E(e, t) {
            return (e === S()) == ('focus' === t);
          }
          function S() {
            try {
              return we.activeElement;
            } catch (e) {}
          }
          function A(e, t, n, r, o, i) {
            var a, s;
            if ('object' == typeof t) {
              'string' != typeof n && ((r = r || n), (n = void 0));
              for (s in t) A(e, s, n, r, t[s], i);
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
              o = j;
            else if (!o) return e;
            return (
              1 === i &&
                ((a = o),
                (o = function (e) {
                  return ke().off(e), a.apply(this, arguments);
                }),
                (o.guid = a.guid || (a.guid = ke.guid++))),
              e.each(function () {
                ke.event.add(this, t, o, r, n);
              })
            );
          }
          function N(e, t, n) {
            return n
              ? (Be.set(e, t, !1),
                void ke.event.add(e, t, {
                  namespace: !1,
                  handler: function (e) {
                    var r,
                      o,
                      i = Be.get(this, t);
                    if (1 & e.isTrigger && this[t]) {
                      if (i.length) (ke.event.special[t] || {}).delegateType && e.stopPropagation();
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
                          value: ke.event.trigger(
                            ke.extend(i[0], ke.Event.prototype),
                            i.slice(1),
                            this,
                          ),
                        }),
                        e.stopImmediatePropagation());
                  },
                }))
              : void (void 0 === Be.get(e, t) && ke.event.add(e, t, k));
          }
          function q(e, t) {
            return i(e, 'table') && i(11 !== t.nodeType ? t : t.firstChild, 'tr')
              ? ke(e).children('tbody')[0] || e
              : e;
          }
          function D(e) {
            return (e.type = (null !== e.getAttribute('type')) + '/' + e.type), e;
          }
          function O(e) {
            return (
              'true/' === (e.type || '').slice(0, 5)
                ? (e.type = e.type.slice(5))
                : e.removeAttribute('type'),
              e
            );
          }
          function L(e, t) {
            var n, r, o, i, a, s, u;
            if (1 === t.nodeType) {
              if (Be.hasData(e) && ((i = Be.get(e)), (u = i.events))) {
                Be.remove(t, 'handle events');
                for (o in u) for (n = 0, r = u[o].length; n < r; n++) ke.event.add(t, o, u[o][n]);
              }
              We.hasData(e) && ((a = We.access(e)), (s = ke.extend({}, a)), We.set(t, s));
            }
          }
          function H(e, t) {
            var n = t.nodeName.toLowerCase();
            'input' === n && et.test(e.type)
              ? (t.checked = e.checked)
              : ('input' !== n && 'textarea' !== n) || (t.defaultValue = e.defaultValue);
          }
          function P(e, t, r, o) {
            t = ce(t);
            var i,
              a,
              s,
              u,
              l,
              c,
              f = 0,
              p = e.length,
              d = p - 1,
              h = t[0],
              g = be(h);
            if (g || (p > 1 && 'string' == typeof h && !ye.checkClone && lt.test(h)))
              return e.each(function (n) {
                var i = e.eq(n);
                g && (t[0] = h.call(this, n, i.html())), P(i, t, r, o);
              });
            if (
              p &&
              ((i = T(t, e[0].ownerDocument, !1, e, o)),
              (a = i.firstChild),
              1 === i.childNodes.length && (i = a),
              a || o)
            ) {
              for (s = ke.map(w(i, 'script'), D), u = s.length; f < p; f++)
                (l = i),
                  f !== d && ((l = ke.clone(l, !0, !0)), u && ke.merge(s, w(l, 'script'))),
                  r.call(e[f], l, f);
              if (u)
                for (c = s[s.length - 1].ownerDocument, ke.map(s, O), f = 0; f < u; f++)
                  (l = s[f]),
                    nt.test(l.type || '') &&
                      !Be.access(l, 'globalEval') &&
                      ke.contains(c, l) &&
                      (l.src && 'module' !== (l.type || '').toLowerCase()
                        ? ke._evalUrl &&
                          !l.noModule &&
                          ke._evalUrl(l.src, { nonce: l.nonce || l.getAttribute('nonce') }, c)
                        : n(l.textContent.replace(ct, ''), l, c));
            }
            return e;
          }
          function R(e, t, n) {
            for (var r, o = t ? ke.filter(t, e) : e, i = 0; null != (r = o[i]); i++)
              n || 1 !== r.nodeType || ke.cleanData(w(r)),
                r.parentNode && (n && Ye(r) && C(w(r, 'script')), r.parentNode.removeChild(r));
            return e;
          }
          function I(e, t, n) {
            var r,
              o,
              i,
              a,
              s = e.style;
            return (
              (n = n || pt(e)),
              n &&
                ((a = n.getPropertyValue(t) || n[t]),
                '' !== a || Ye(e) || (a = ke.style(e, t)),
                !ye.pixelBoxStyles() &&
                  ft.test(a) &&
                  ht.test(t) &&
                  ((r = s.width),
                  (o = s.minWidth),
                  (i = s.maxWidth),
                  (s.minWidth = s.maxWidth = s.width = a),
                  (a = n.width),
                  (s.width = r),
                  (s.minWidth = o),
                  (s.maxWidth = i))),
              void 0 !== a ? a + '' : a
            );
          }
          function M(e, t) {
            return {
              get: function () {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments);
              },
            };
          }
          function _(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = gt.length; n--; )
              if (((e = gt[n] + t), e in vt)) return e;
          }
          function $(e) {
            var t = ke.cssProps[e] || mt[e];
            return t ? t : e in vt ? e : (mt[e] = _(e) || e);
          }
          function F(e, t, n) {
            var r = Ke.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || 'px') : t;
          }
          function B(e, t, n, r, o, i) {
            var a = 'width' === t ? 1 : 0,
              s = 0,
              u = 0;
            if (n === (r ? 'border' : 'content')) return 0;
            for (; a < 4; a += 2)
              'margin' === n && (u += ke.css(e, n + Ve[a], !0, o)),
                r
                  ? ('content' === n && (u -= ke.css(e, 'padding' + Ve[a], !0, o)),
                    'margin' !== n && (u -= ke.css(e, 'border' + Ve[a] + 'Width', !0, o)))
                  : ((u += ke.css(e, 'padding' + Ve[a], !0, o)),
                    'padding' !== n
                      ? (u += ke.css(e, 'border' + Ve[a] + 'Width', !0, o))
                      : (s += ke.css(e, 'border' + Ve[a] + 'Width', !0, o)));
            return (
              !r &&
                i >= 0 &&
                (u +=
                  Math.max(
                    0,
                    Math.ceil(e['offset' + t[0].toUpperCase() + t.slice(1)] - i - u - s - 0.5),
                  ) || 0),
              u
            );
          }
          function W(e, t, n) {
            var r = pt(e),
              o = !ye.boxSizingReliable() || n,
              a = o && 'border-box' === ke.css(e, 'boxSizing', !1, r),
              s = a,
              u = I(e, t, r),
              l = 'offset' + t[0].toUpperCase() + t.slice(1);
            if (ft.test(u)) {
              if (!n) return u;
              u = 'auto';
            }
            return (
              ((!ye.boxSizingReliable() && a) ||
                (!ye.reliableTrDimensions() && i(e, 'tr')) ||
                'auto' === u ||
                (!parseFloat(u) && 'inline' === ke.css(e, 'display', !1, r))) &&
                e.getClientRects().length &&
                ((a = 'border-box' === ke.css(e, 'boxSizing', !1, r)),
                (s = l in e),
                s && (u = e[l])),
              (u = parseFloat(u) || 0),
              u + B(e, t, n || (a ? 'border' : 'content'), s, r, u) + 'px'
            );
          }
          function U(e, t, n, r, o) {
            return new U.prototype.init(e, t, n, r, o);
          }
          function z() {
            Tt &&
              (we.hidden === !1 && e.requestAnimationFrame
                ? e.requestAnimationFrame(z)
                : e.setTimeout(z, ke.fx.interval),
              ke.fx.tick());
          }
          function X() {
            return (
              e.setTimeout(function () {
                Ct = void 0;
              }),
              (Ct = Date.now())
            );
          }
          function K(e, t) {
            var n,
              r = 0,
              o = { height: e };
            for (t = t ? 1 : 0; r < 4; r += 2 - t)
              (n = Ve[r]), (o['margin' + n] = o['padding' + n] = e);
            return t && (o.opacity = o.width = e), o;
          }
          function V(e, t, n) {
            for (
              var r, o = (Q.tweeners[t] || []).concat(Q.tweeners['*']), i = 0, a = o.length;
              i < a;
              i++
            )
              if ((r = o[i].call(n, t, e))) return r;
          }
          function G(e, t, n) {
            var r,
              o,
              i,
              a,
              s,
              u,
              l,
              c,
              f = 'width' in t || 'height' in t,
              p = this,
              d = {},
              h = e.style,
              g = e.nodeType && Je(e),
              v = Be.get(e, 'fxshow');
            n.queue ||
              ((a = ke._queueHooks(e, 'fx')),
              null == a.unqueued &&
                ((a.unqueued = 0),
                (s = a.empty.fire),
                (a.empty.fire = function () {
                  a.unqueued || s();
                })),
              a.unqueued++,
              p.always(function () {
                p.always(function () {
                  a.unqueued--, ke.queue(e, 'fx').length || a.empty.fire();
                });
              }));
            for (r in t)
              if (((o = t[r]), kt.test(o))) {
                if ((delete t[r], (i = i || 'toggle' === o), o === (g ? 'hide' : 'show'))) {
                  if ('show' !== o || !v || void 0 === v[r]) continue;
                  g = !0;
                }
                d[r] = (v && v[r]) || ke.style(e, r);
              }
            if (((u = !ke.isEmptyObject(t)), u || !ke.isEmptyObject(d))) {
              f &&
                1 === e.nodeType &&
                ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                (l = v && v.display),
                null == l && (l = Be.get(e, 'display')),
                (c = ke.css(e, 'display')),
                'none' === c &&
                  (l
                    ? (c = l)
                    : (x([e], !0), (l = e.style.display || l), (c = ke.css(e, 'display')), x([e]))),
                ('inline' === c || ('inline-block' === c && null != l)) &&
                  'none' === ke.css(e, 'float') &&
                  (u ||
                    (p.done(function () {
                      h.display = l;
                    }),
                    null == l && ((c = h.display), (l = 'none' === c ? '' : c))),
                  (h.display = 'inline-block'))),
                n.overflow &&
                  ((h.overflow = 'hidden'),
                  p.always(function () {
                    (h.overflow = n.overflow[0]),
                      (h.overflowX = n.overflow[1]),
                      (h.overflowY = n.overflow[2]);
                  })),
                (u = !1);
              for (r in d)
                u ||
                  (v
                    ? 'hidden' in v && (g = v.hidden)
                    : (v = Be.access(e, 'fxshow', { display: l })),
                  i && (v.hidden = !g),
                  g && x([e], !0),
                  p.done(function () {
                    g || x([e]), Be.remove(e, 'fxshow');
                    for (r in d) ke.style(e, r, d[r]);
                  })),
                  (u = V(g ? v[r] : 0, r, p)),
                  r in v || ((v[r] = u.start), g && ((u.end = u.start), (u.start = 0)));
            }
          }
          function Y(e, t) {
            var n, r, o, i, a;
            for (n in e)
              if (
                ((r = h(n)),
                (o = t[r]),
                (i = e[n]),
                Array.isArray(i) && ((o = i[1]), (i = e[n] = i[0])),
                n !== r && ((e[r] = i), delete e[n]),
                (a = ke.cssHooks[r]),
                a && 'expand' in a)
              ) {
                (i = a.expand(i)), delete e[r];
                for (n in i) n in e || ((e[n] = i[n]), (t[n] = o));
              } else t[r] = o;
          }
          function Q(e, t, n) {
            var r,
              o,
              i = 0,
              a = Q.prefilters.length,
              s = ke.Deferred().always(function () {
                delete u.elem;
              }),
              u = function () {
                if (o) return !1;
                for (
                  var t = Ct || X(),
                    n = Math.max(0, l.startTime + l.duration - t),
                    r = n / l.duration || 0,
                    i = 1 - r,
                    a = 0,
                    u = l.tweens.length;
                  a < u;
                  a++
                )
                  l.tweens[a].run(i);
                return (
                  s.notifyWith(e, [l, i, n]),
                  i < 1 && u ? n : (u || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1)
                );
              },
              l = s.promise({
                elem: e,
                props: ke.extend({}, t),
                opts: ke.extend(!0, { specialEasing: {}, easing: ke.easing._default }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Ct || X(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                  var r = ke.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                  return l.tweens.push(r), r;
                },
                stop: function (t) {
                  var n = 0,
                    r = t ? l.tweens.length : 0;
                  if (o) return this;
                  for (o = !0; n < r; n++) l.tweens[n].run(1);
                  return (
                    t
                      ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t]))
                      : s.rejectWith(e, [l, t]),
                    this
                  );
                },
              }),
              c = l.props;
            for (Y(c, l.opts.specialEasing); i < a; i++)
              if ((r = Q.prefilters[i].call(l, e, c, l.opts)))
                return (
                  be(r.stop) && (ke._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r
                );
            return (
              ke.map(c, V, l),
              be(l.opts.start) && l.opts.start.call(e, l),
              l
                .progress(l.opts.progress)
                .done(l.opts.done, l.opts.complete)
                .fail(l.opts.fail)
                .always(l.opts.always),
              ke.fx.timer(ke.extend(u, { elem: e, anim: l, queue: l.opts.queue })),
              l
            );
          }
          function J(e) {
            var t = e.match(Pe) || [];
            return t.join(' ');
          }
          function Z(e) {
            return (e.getAttribute && e.getAttribute('class')) || '';
          }
          function ee(e) {
            return Array.isArray(e) ? e : 'string' == typeof e ? e.match(Pe) || [] : [];
          }
          function te(e, t, n, o) {
            var i;
            if (Array.isArray(t))
              ke.each(t, function (t, r) {
                n || Rt.test(e)
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
                i = t.toLowerCase().match(Pe) || [];
              if (be(n))
                for (; (r = i[o++]); )
                  '+' === r[0]
                    ? ((r = r.slice(1) || '*'), (e[r] = e[r] || []).unshift(n))
                    : (e[r] = e[r] || []).push(n);
            };
          }
          function re(e, t, n, r) {
            function o(s) {
              var u;
              return (
                (i[s] = !0),
                ke.each(e[s] || [], function (e, s) {
                  var l = s(t, n, r);
                  return 'string' != typeof l || a || i[l]
                    ? a
                      ? !(u = l)
                      : void 0
                    : (t.dataTypes.unshift(l), o(l), !1);
                }),
                u
              );
            }
            var i = {},
              a = e === Vt;
            return o(t.dataTypes[0]) || (!i['*'] && o('*'));
          }
          function oe(e, t) {
            var n,
              r,
              o = ke.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]);
            return r && ke.extend(!0, e, r), e;
          }
          function ie(e, t, n) {
            for (var r, o, i, a, s = e.contents, u = e.dataTypes; '*' === u[0]; )
              u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader('Content-Type'));
            if (r)
              for (o in s)
                if (s[o] && s[o].test(r)) {
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
                a || (a = o);
              }
              i = i || a;
            }
            if (i) return i !== u[0] && u.unshift(i), n[i];
          }
          function ae(e, t, n, r) {
            var o,
              i,
              a,
              s,
              u,
              l = {},
              c = e.dataTypes.slice();
            if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
            for (i = c.shift(); i; )
              if (
                (e.responseFields[i] && (n[e.responseFields[i]] = t),
                !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                (u = i),
                (i = c.shift()))
              )
                if ('*' === i) i = u;
                else if ('*' !== u && u !== i) {
                  if (((a = l[u + ' ' + i] || l['* ' + i]), !a))
                    for (o in l)
                      if (
                        ((s = o.split(' ')),
                        s[1] === i && (a = l[u + ' ' + s[0]] || l['* ' + s[0]]))
                      ) {
                        a === !0 ? (a = l[o]) : l[o] !== !0 && ((i = s[0]), c.unshift(s[1]));
                        break;
                      }
                  if (a !== !0)
                    if (a && e.throws) t = a(t);
                    else
                      try {
                        t = a(t);
                      } catch (e) {
                        return {
                          state: 'parsererror',
                          error: a ? e : 'No conversion from ' + u + ' to ' + i,
                        };
                      }
                }
            return { state: 'success', data: t };
          }
          var se = [],
            ue = Object.getPrototypeOf,
            le = se.slice,
            ce = se.flat
              ? function (e) {
                  return se.flat.call(e);
                }
              : function (e) {
                  return se.concat.apply([], e);
                },
            fe = se.push,
            pe = se.indexOf,
            de = {},
            he = de.toString,
            ge = de.hasOwnProperty,
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
            Ce = { type: !0, src: !0, nonce: !0, noModule: !0 },
            Te = '3.5.1',
            ke = function (e, t) {
              return new ke.fn.init(e, t);
            };
          (ke.fn = ke.prototype =
            {
              jquery: Te,
              constructor: ke,
              length: 0,
              toArray: function () {
                return le.call(this);
              },
              get: function (e) {
                return null == e ? le.call(this) : e < 0 ? this[e + this.length] : this[e];
              },
              pushStack: function (e) {
                var t = ke.merge(this.constructor(), e);
                return (t.prevObject = this), t;
              },
              each: function (e) {
                return ke.each(this, e);
              },
              map: function (e) {
                return this.pushStack(
                  ke.map(this, function (t, n) {
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
                  ke.grep(this, function (e, t) {
                    return (t + 1) % 2;
                  }),
                );
              },
              odd: function () {
                return this.pushStack(
                  ke.grep(this, function (e, t) {
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
              sort: se.sort,
              splice: se.splice,
            }),
            (ke.extend = ke.fn.extend =
              function () {
                var e,
                  t,
                  n,
                  r,
                  o,
                  i,
                  a = arguments[0] || {},
                  s = 1,
                  u = arguments.length,
                  l = !1;
                for (
                  'boolean' == typeof a && ((l = a), (a = arguments[s] || {}), s++),
                    'object' == typeof a || be(a) || (a = {}),
                    s === u && ((a = this), s--);
                  s < u;
                  s++
                )
                  if (null != (e = arguments[s]))
                    for (t in e)
                      (r = e[t]),
                        '__proto__' !== t &&
                          a !== r &&
                          (l && r && (ke.isPlainObject(r) || (o = Array.isArray(r)))
                            ? ((n = a[t]),
                              (i = o && !Array.isArray(n) ? [] : o || ke.isPlainObject(n) ? n : {}),
                              (o = !1),
                              (a[t] = ke.extend(l, i, r)))
                            : void 0 !== r && (a[t] = r));
                return a;
              }),
            ke.extend({
              expando: 'jQuery' + (Te + Math.random()).replace(/\D/g, ''),
              isReady: !0,
              error: function (e) {
                throw new Error(e);
              },
              noop: function () {},
              isPlainObject: function (e) {
                var t, n;
                return (
                  !(!e || '[object Object]' !== he.call(e)) &&
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
                    (o(Object(e)) ? ke.merge(n, 'string' == typeof e ? [e] : e) : fe.call(n, e)),
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
                for (var r, o = [], i = 0, a = e.length, s = !n; i < a; i++)
                  (r = !t(e[i], i)), r !== s && o.push(e[i]);
                return o;
              },
              map: function (e, t, n) {
                var r,
                  i,
                  a = 0,
                  s = [];
                if (o(e))
                  for (r = e.length; a < r; a++) (i = t(e[a], a, n)), null != i && s.push(i);
                else for (a in e) (i = t(e[a], a, n)), null != i && s.push(i);
                return ce(s);
              },
              guid: 1,
              support: ye,
            }),
            'function' == typeof Symbol && (ke.fn[Symbol.iterator] = se[Symbol.iterator]),
            ke.each(
              'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '),
              function (e, t) {
                de['[object ' + t + ']'] = t.toLowerCase();
              },
            );
          var je = (function (e) {
            function t(e, t, n, r) {
              var o,
                i,
                a,
                s,
                u,
                l,
                c,
                p = t && t.ownerDocument,
                h = t ? t.nodeType : 9;
              if (((n = n || []), 'string' != typeof e || !e || (1 !== h && 9 !== h && 11 !== h)))
                return n;
              if (!r && (O(t), (t = t || L), P)) {
                if (11 !== h && (u = be.exec(e)))
                  if ((o = u[1])) {
                    if (9 === h) {
                      if (!(a = t.getElementById(o))) return n;
                      if (a.id === o) return n.push(a), n;
                    } else if (p && (a = p.getElementById(o)) && _(t, a) && a.id === o)
                      return n.push(a), n;
                  } else {
                    if (u[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
                    if ((o = u[3]) && C.getElementsByClassName && t.getElementsByClassName)
                      return Z.apply(n, t.getElementsByClassName(o)), n;
                  }
                if (
                  C.qsa &&
                  !K[e + ' '] &&
                  (!R || !R.test(e)) &&
                  (1 !== h || 'object' !== t.nodeName.toLowerCase())
                ) {
                  if (((c = e), (p = t), 1 === h && (fe.test(e) || ce.test(e)))) {
                    for (
                      p = (xe.test(e) && f(t.parentNode)) || t,
                        (p === t && C.scope) ||
                          ((s = t.getAttribute('id'))
                            ? (s = s.replace(Te, ke))
                            : t.setAttribute('id', (s = $))),
                        l = E(e),
                        i = l.length;
                      i--;

                    )
                      l[i] = (s ? '#' + s : ':scope') + ' ' + d(l[i]);
                    c = l.join(',');
                  }
                  try {
                    return Z.apply(n, p.querySelectorAll(c)), n;
                  } catch (t) {
                    K(e, !0);
                  } finally {
                    s === $ && t.removeAttribute('id');
                  }
                }
              }
              return A(e.replace(ue, '$1'), t, n, r);
            }
            function n() {
              function e(n, r) {
                return t.push(n + ' ') > T.cacheLength && delete e[t.shift()], (e[n + ' '] = r);
              }
              var t = [];
              return e;
            }
            function r(e) {
              return (e[$] = !0), e;
            }
            function o(e) {
              var t = L.createElement('fieldset');
              try {
                return !!e(t);
              } catch (e) {
                return !1;
              } finally {
                t.parentNode && t.parentNode.removeChild(t), (t = null);
              }
            }
            function i(e, t) {
              for (var n = e.split('|'), r = n.length; r--; ) T.attrHandle[n[r]] = t;
            }
            function a(e, t) {
              var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
              if (r) return r;
              if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
              return e ? 1 : -1;
            }
            function s(e) {
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
                      : t.isDisabled === e || (t.isDisabled !== !e && Ee(t) === e)
                    : t.disabled === e
                  : 'label' in t && t.disabled === e;
              };
            }
            function c(e) {
              return r(function (t) {
                return (
                  (t = +t),
                  r(function (n, r) {
                    for (var o, i = e([], n.length, t), a = i.length; a--; )
                      n[(o = i[a])] && (n[o] = !(r[o] = n[o]));
                  })
                );
              });
            }
            function f(e) {
              return e && 'undefined' != typeof e.getElementsByTagName && e;
            }
            function p() {}
            function d(e) {
              for (var t = 0, n = e.length, r = ''; t < n; t++) r += e[t].value;
              return r;
            }
            function h(e, t, n) {
              var r = t.dir,
                o = t.next,
                i = o || r,
                a = n && 'parentNode' === i,
                s = W++;
              return t.first
                ? function (t, n, o) {
                    for (; (t = t[r]); ) if (1 === t.nodeType || a) return e(t, n, o);
                    return !1;
                  }
                : function (t, n, u) {
                    var l,
                      c,
                      f,
                      p = [B, s];
                    if (u) {
                      for (; (t = t[r]); ) if ((1 === t.nodeType || a) && e(t, n, u)) return !0;
                    } else
                      for (; (t = t[r]); )
                        if (1 === t.nodeType || a)
                          if (
                            ((f = t[$] || (t[$] = {})),
                            (c = f[t.uniqueID] || (f[t.uniqueID] = {})),
                            o && o === t.nodeName.toLowerCase())
                          )
                            t = t[r] || t;
                          else {
                            if ((l = c[i]) && l[0] === B && l[1] === s) return (p[2] = l[2]);
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
              for (var i, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
                (i = e[s]) && ((n && !n(i, r, o)) || (a.push(i), l && t.push(s)));
              return a;
            }
            function y(e, t, n, o, i, a) {
              return (
                o && !o[$] && (o = y(o)),
                i && !i[$] && (i = y(i, a)),
                r(function (r, a, s, u) {
                  var l,
                    c,
                    f,
                    p = [],
                    d = [],
                    h = a.length,
                    g = r || v(t || '*', s.nodeType ? [s] : s, []),
                    y = !e || (!r && t) ? g : m(g, p, e, s, u),
                    b = n ? (i || (r ? e : h || o) ? [] : a) : y;
                  if ((n && n(y, b, s, u), o))
                    for (l = m(b, d), o(l, [], s, u), c = l.length; c--; )
                      (f = l[c]) && (b[d[c]] = !(y[d[c]] = f));
                  if (r) {
                    if (i || e) {
                      if (i) {
                        for (l = [], c = b.length; c--; ) (f = b[c]) && l.push((y[c] = f));
                        i(null, (b = []), l, u);
                      }
                      for (c = b.length; c--; )
                        (f = b[c]) && (l = i ? te(r, f) : p[c]) > -1 && (r[l] = !(a[l] = f));
                    }
                  } else
                    (b = m(b === a ? b.splice(h, b.length) : b)),
                      i ? i(null, a, b, u) : Z.apply(a, b);
                })
              );
            }
            function b(e) {
              for (
                var t,
                  n,
                  r,
                  o = e.length,
                  i = T.relative[e[0].type],
                  a = i || T.relative[' '],
                  s = i ? 1 : 0,
                  u = h(
                    function (e) {
                      return e === t;
                    },
                    a,
                    !0,
                  ),
                  l = h(
                    function (e) {
                      return te(t, e) > -1;
                    },
                    a,
                    !0,
                  ),
                  c = [
                    function (e, n, r) {
                      var o =
                        (!i && (r || n !== N)) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                      return (t = null), o;
                    },
                  ];
                s < o;
                s++
              )
                if ((n = T.relative[e[s].type])) c = [h(g(c), n)];
                else {
                  if (((n = T.filter[e[s].type].apply(null, e[s].matches)), n[$])) {
                    for (r = ++s; r < o && !T.relative[e[r].type]; r++);
                    return y(
                      s > 1 && g(c),
                      s > 1 &&
                        d(
                          e.slice(0, s - 1).concat({ value: ' ' === e[s - 2].type ? '*' : '' }),
                        ).replace(ue, '$1'),
                      n,
                      s < r && b(e.slice(s, r)),
                      r < o && b((e = e.slice(r))),
                      r < o && d(e),
                    );
                  }
                  c.push(n);
                }
              return g(c);
            }
            function x(e, n) {
              var o = n.length > 0,
                i = e.length > 0,
                a = function (r, a, s, u, l) {
                  var c,
                    f,
                    p,
                    d = 0,
                    h = '0',
                    g = r && [],
                    v = [],
                    y = N,
                    b = r || (i && T.find.TAG('*', l)),
                    x = (B += null == y ? 1 : Math.random() || 0.1),
                    w = b.length;
                  for (l && (N = a == L || a || l); h !== w && null != (c = b[h]); h++) {
                    if (i && c) {
                      for (f = 0, a || c.ownerDocument == L || (O(c), (s = !P)); (p = e[f++]); )
                        if (p(c, a || L, s)) {
                          u.push(c);
                          break;
                        }
                      l && (B = x);
                    }
                    o && ((c = !p && c) && d--, r && g.push(c));
                  }
                  if (((d += h), o && h !== d)) {
                    for (f = 0; (p = n[f++]); ) p(g, v, a, s);
                    if (r) {
                      if (d > 0) for (; h--; ) g[h] || v[h] || (v[h] = Q.call(u));
                      v = m(v);
                    }
                    Z.apply(u, v), l && !r && v.length > 0 && d + n.length > 1 && t.uniqueSort(u);
                  }
                  return l && ((B = x), (N = y)), g;
                };
              return o ? r(a) : a;
            }
            var w,
              C,
              T,
              k,
              j,
              E,
              S,
              A,
              N,
              q,
              D,
              O,
              L,
              H,
              P,
              R,
              I,
              M,
              _,
              $ = 'sizzle' + 1 * new Date(),
              F = e.document,
              B = 0,
              W = 0,
              U = n(),
              z = n(),
              X = n(),
              K = n(),
              V = function (e, t) {
                return e === t && (D = !0), 0;
              },
              G = {}.hasOwnProperty,
              Y = [],
              Q = Y.pop,
              J = Y.push,
              Z = Y.push,
              ee = Y.slice,
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
              ae =
                ':(' +
                oe +
                ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
                ie +
                ')*)|.*)\\)|)',
              se = new RegExp(re + '+', 'g'),
              ue = new RegExp('^' + re + '+|((?:^|[^\\\\])(?:\\\\.)*)' + re + '+$', 'g'),
              le = new RegExp('^' + re + '*,' + re + '*'),
              ce = new RegExp('^' + re + '*([>+~]|' + re + ')' + re + '*'),
              fe = new RegExp(re + '|>'),
              pe = new RegExp(ae),
              de = new RegExp('^' + oe + '$'),
              he = {
                ID: new RegExp('^#(' + oe + ')'),
                CLASS: new RegExp('^\\.(' + oe + ')'),
                TAG: new RegExp('^(' + oe + '|[*])'),
                ATTR: new RegExp('^' + ie),
                PSEUDO: new RegExp('^' + ae),
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
              Ce = function (e, t) {
                var n = '0x' + e.slice(1) - 65536;
                return t
                  ? t
                  : n < 0
                  ? String.fromCharCode(n + 65536)
                  : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
              },
              Te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
              ke = function (e, t) {
                return t
                  ? '\0' === e
                    ? '�'
                    : e.slice(0, -1) + '\\' + e.charCodeAt(e.length - 1).toString(16) + ' '
                  : '\\' + e;
              },
              je = function () {
                O();
              },
              Ee = h(
                function (e) {
                  return e.disabled === !0 && 'fieldset' === e.nodeName.toLowerCase();
                },
                { dir: 'parentNode', next: 'legend' },
              );
            try {
              Z.apply((Y = ee.call(F.childNodes)), F.childNodes), Y[F.childNodes.length].nodeType;
            } catch (e) {
              Z = {
                apply: Y.length
                  ? function (e, t) {
                      J.apply(e, ee.call(t));
                    }
                  : function (e, t) {
                      for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                      e.length = n - 1;
                    },
              };
            }
            (C = t.support = {}),
              (j = t.isXML =
                function (e) {
                  var t = e.namespaceURI,
                    n = (e.ownerDocument || e).documentElement;
                  return !ge.test(t || (n && n.nodeName) || 'HTML');
                }),
              (O = t.setDocument =
                function (e) {
                  var t,
                    n,
                    r = e ? e.ownerDocument || e : F;
                  return r != L && 9 === r.nodeType && r.documentElement
                    ? ((L = r),
                      (H = L.documentElement),
                      (P = !j(L)),
                      F != L &&
                        (n = L.defaultView) &&
                        n.top !== n &&
                        (n.addEventListener
                          ? n.addEventListener('unload', je, !1)
                          : n.attachEvent && n.attachEvent('onunload', je)),
                      (C.scope = o(function (e) {
                        return (
                          H.appendChild(e).appendChild(L.createElement('div')),
                          'undefined' != typeof e.querySelectorAll &&
                            !e.querySelectorAll(':scope fieldset div').length
                        );
                      })),
                      (C.attributes = o(function (e) {
                        return (e.className = 'i'), !e.getAttribute('className');
                      })),
                      (C.getElementsByTagName = o(function (e) {
                        return (
                          e.appendChild(L.createComment('')), !e.getElementsByTagName('*').length
                        );
                      })),
                      (C.getElementsByClassName = ye.test(L.getElementsByClassName)),
                      (C.getById = o(function (e) {
                        return (
                          (H.appendChild(e).id = $),
                          !L.getElementsByName || !L.getElementsByName($).length
                        );
                      })),
                      C.getById
                        ? ((T.filter.ID = function (e) {
                            var t = e.replace(we, Ce);
                            return function (e) {
                              return e.getAttribute('id') === t;
                            };
                          }),
                          (T.find.ID = function (e, t) {
                            if ('undefined' != typeof t.getElementById && P) {
                              var n = t.getElementById(e);
                              return n ? [n] : [];
                            }
                          }))
                        : ((T.filter.ID = function (e) {
                            var t = e.replace(we, Ce);
                            return function (e) {
                              var n =
                                'undefined' != typeof e.getAttributeNode &&
                                e.getAttributeNode('id');
                              return n && n.value === t;
                            };
                          }),
                          (T.find.ID = function (e, t) {
                            if ('undefined' != typeof t.getElementById && P) {
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
                      (T.find.TAG = C.getElementsByTagName
                        ? function (e, t) {
                            return 'undefined' != typeof t.getElementsByTagName
                              ? t.getElementsByTagName(e)
                              : C.qsa
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
                      (T.find.CLASS =
                        C.getElementsByClassName &&
                        function (e, t) {
                          if ('undefined' != typeof t.getElementsByClassName && P)
                            return t.getElementsByClassName(e);
                        }),
                      (I = []),
                      (R = []),
                      (C.qsa = ye.test(L.querySelectorAll)) &&
                        (o(function (e) {
                          var t;
                          (H.appendChild(e).innerHTML =
                            "<a id='" +
                            $ +
                            "'></a><select id='" +
                            $ +
                            "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                            e.querySelectorAll("[msallowcapture^='']").length &&
                              R.push('[*^$]=' + re + '*(?:\'\'|"")'),
                            e.querySelectorAll('[selected]').length ||
                              R.push('\\[' + re + '*(?:value|' + ne + ')'),
                            e.querySelectorAll('[id~=' + $ + '-]').length || R.push('~='),
                            (t = L.createElement('input')),
                            t.setAttribute('name', ''),
                            e.appendChild(t),
                            e.querySelectorAll("[name='']").length ||
                              R.push('\\[' + re + '*name' + re + '*=' + re + '*(?:\'\'|"")'),
                            e.querySelectorAll(':checked').length || R.push(':checked'),
                            e.querySelectorAll('a#' + $ + '+*').length || R.push('.#.+[+~]'),
                            e.querySelectorAll('\\\f'),
                            R.push('[\\r\\n\\f]');
                        }),
                        o(function (e) {
                          e.innerHTML =
                            "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                          var t = L.createElement('input');
                          t.setAttribute('type', 'hidden'),
                            e.appendChild(t).setAttribute('name', 'D'),
                            e.querySelectorAll('[name=d]').length &&
                              R.push('name' + re + '*[*^$|!~]?='),
                            2 !== e.querySelectorAll(':enabled').length &&
                              R.push(':enabled', ':disabled'),
                            (H.appendChild(e).disabled = !0),
                            2 !== e.querySelectorAll(':disabled').length &&
                              R.push(':enabled', ':disabled'),
                            e.querySelectorAll('*,:x'),
                            R.push(',.*:');
                        })),
                      (C.matchesSelector = ye.test(
                        (M =
                          H.matches ||
                          H.webkitMatchesSelector ||
                          H.mozMatchesSelector ||
                          H.oMatchesSelector ||
                          H.msMatchesSelector),
                      )) &&
                        o(function (e) {
                          (C.disconnectedMatch = M.call(e, '*')),
                            M.call(e, "[s!='']:x"),
                            I.push('!=', ae);
                        }),
                      (R = R.length && new RegExp(R.join('|'))),
                      (I = I.length && new RegExp(I.join('|'))),
                      (t = ye.test(H.compareDocumentPosition)),
                      (_ =
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
                      (V = t
                        ? function (e, t) {
                            if (e === t) return (D = !0), 0;
                            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                            return n
                              ? n
                              : ((n =
                                  (e.ownerDocument || e) == (t.ownerDocument || t)
                                    ? e.compareDocumentPosition(t)
                                    : 1),
                                1 & n || (!C.sortDetached && t.compareDocumentPosition(e) === n)
                                  ? e == L || (e.ownerDocument == F && _(F, e))
                                    ? -1
                                    : t == L || (t.ownerDocument == F && _(F, t))
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
                              s = [e],
                              u = [t];
                            if (!o || !i)
                              return e == L
                                ? -1
                                : t == L
                                ? 1
                                : o
                                ? -1
                                : i
                                ? 1
                                : q
                                ? te(q, e) - te(q, t)
                                : 0;
                            if (o === i) return a(e, t);
                            for (n = e; (n = n.parentNode); ) s.unshift(n);
                            for (n = t; (n = n.parentNode); ) u.unshift(n);
                            for (; s[r] === u[r]; ) r++;
                            return r ? a(s[r], u[r]) : s[r] == F ? -1 : u[r] == F ? 1 : 0;
                          }),
                      L)
                    : L;
                }),
              (t.matches = function (e, n) {
                return t(e, null, null, n);
              }),
              (t.matchesSelector = function (e, n) {
                if (
                  (O(e),
                  C.matchesSelector && P && !K[n + ' '] && (!I || !I.test(n)) && (!R || !R.test(n)))
                )
                  try {
                    var r = M.call(e, n);
                    if (r || C.disconnectedMatch || (e.document && 11 !== e.document.nodeType))
                      return r;
                  } catch (e) {
                    K(n, !0);
                  }
                return t(n, L, null, [e]).length > 0;
              }),
              (t.contains = function (e, t) {
                return (e.ownerDocument || e) != L && O(e), _(e, t);
              }),
              (t.attr = function (e, t) {
                (e.ownerDocument || e) != L && O(e);
                var n = T.attrHandle[t.toLowerCase()],
                  r = n && G.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !P) : void 0;
                return void 0 !== r
                  ? r
                  : C.attributes || !P
                  ? e.getAttribute(t)
                  : (r = e.getAttributeNode(t)) && r.specified
                  ? r.value
                  : null;
              }),
              (t.escape = function (e) {
                return (e + '').replace(Te, ke);
              }),
              (t.error = function (e) {
                throw new Error('Syntax error, unrecognized expression: ' + e);
              }),
              (t.uniqueSort = function (e) {
                var t,
                  n = [],
                  r = 0,
                  o = 0;
                if (((D = !C.detectDuplicates), (q = !C.sortStable && e.slice(0)), e.sort(V), D)) {
                  for (; (t = e[o++]); ) t === e[o] && (r = n.push(o));
                  for (; r--; ) e.splice(n[r], 1);
                }
                return (q = null), e;
              }),
              (k = t.getText =
                function (e) {
                  var t,
                    n = '',
                    r = 0,
                    o = e.nodeType;
                  if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                      if ('string' == typeof e.textContent) return e.textContent;
                      for (e = e.firstChild; e; e = e.nextSibling) n += k(e);
                    } else if (3 === o || 4 === o) return e.nodeValue;
                  } else for (; (t = e[r++]); ) n += k(t);
                  return n;
                }),
              (T = t.selectors =
                {
                  cacheLength: 50,
                  createPseudo: r,
                  match: he,
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
                        (e[1] = e[1].replace(we, Ce)),
                        (e[3] = (e[3] || e[4] || e[5] || '').replace(we, Ce)),
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
                      return he.CHILD.test(e[0])
                        ? null
                        : (e[3]
                            ? (e[2] = e[4] || e[5] || '')
                            : n &&
                              pe.test(n) &&
                              (t = E(n, !0)) &&
                              (t = n.indexOf(')', n.length - t) - n.length) &&
                              ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                          e.slice(0, 3));
                    },
                  },
                  filter: {
                    TAG: function (e) {
                      var t = e.replace(we, Ce).toLowerCase();
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
                                ? (' ' + i.replace(se, ' ') + ' ').indexOf(r) > -1
                                : '|=' === n && (i === r || i.slice(0, r.length + 1) === r + '-'));
                      };
                    },
                    CHILD: function (e, t, n, r, o) {
                      var i = 'nth' !== e.slice(0, 3),
                        a = 'last' !== e.slice(-4),
                        s = 'of-type' === t;
                      return 1 === r && 0 === o
                        ? function (e) {
                            return !!e.parentNode;
                          }
                        : function (t, n, u) {
                            var l,
                              c,
                              f,
                              p,
                              d,
                              h,
                              g = i !== a ? 'nextSibling' : 'previousSibling',
                              v = t.parentNode,
                              m = s && t.nodeName.toLowerCase(),
                              y = !u && !s,
                              b = !1;
                            if (v) {
                              if (i) {
                                for (; g; ) {
                                  for (p = t; (p = p[g]); )
                                    if (s ? p.nodeName.toLowerCase() === m : 1 === p.nodeType)
                                      return !1;
                                  h = g = 'only' === e && !h && 'nextSibling';
                                }
                                return !0;
                              }
                              if (((h = [a ? v.firstChild : v.lastChild]), a && y)) {
                                for (
                                  p = v,
                                    f = p[$] || (p[$] = {}),
                                    c = f[p.uniqueID] || (f[p.uniqueID] = {}),
                                    l = c[e] || [],
                                    d = l[0] === B && l[1],
                                    b = d && l[2],
                                    p = d && v.childNodes[d];
                                  (p = (++d && p && p[g]) || (b = d = 0) || h.pop());

                                )
                                  if (1 === p.nodeType && ++b && p === t) {
                                    c[e] = [B, d, b];
                                    break;
                                  }
                              } else if (
                                (y &&
                                  ((p = t),
                                  (f = p[$] || (p[$] = {})),
                                  (c = f[p.uniqueID] || (f[p.uniqueID] = {})),
                                  (l = c[e] || []),
                                  (d = l[0] === B && l[1]),
                                  (b = d)),
                                b === !1)
                              )
                                for (
                                  ;
                                  (p = (++d && p && p[g]) || (b = d = 0) || h.pop()) &&
                                  ((s ? p.nodeName.toLowerCase() !== m : 1 !== p.nodeType) ||
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
                          T.pseudos[e] ||
                          T.setFilters[e.toLowerCase()] ||
                          t.error('unsupported pseudo: ' + e);
                      return i[$]
                        ? i(n)
                        : i.length > 1
                        ? ((o = [e, e, '', n]),
                          T.setFilters.hasOwnProperty(e.toLowerCase())
                            ? r(function (e, t) {
                                for (var r, o = i(e, n), a = o.length; a--; )
                                  (r = te(e, o[a])), (e[r] = !(t[r] = o[a]));
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
                        o = S(e.replace(ue, '$1'));
                      return o[$]
                        ? r(function (e, t, n, r) {
                            for (var i, a = o(e, null, r, []), s = e.length; s--; )
                              (i = a[s]) && (e[s] = !(t[s] = i));
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
                        (e = e.replace(we, Ce)),
                        function (t) {
                          return (t.textContent || k(t)).indexOf(e) > -1;
                        }
                      );
                    }),
                    lang: r(function (e) {
                      return (
                        de.test(e || '') || t.error('unsupported lang: ' + e),
                        (e = e.replace(we, Ce).toLowerCase()),
                        function (t) {
                          var n;
                          do
                            if (
                              (n = P
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
                        e === L.activeElement &&
                        (!L.hasFocus || L.hasFocus()) &&
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
                      return !T.pseudos.empty(e);
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
              (T.pseudos.nth = T.pseudos.eq);
            for (w in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
              T.pseudos[w] = s(w);
            for (w in { submit: !0, reset: !0 }) T.pseudos[w] = u(w);
            return (
              (p.prototype = T.filters = T.pseudos),
              (T.setFilters = new p()),
              (E = t.tokenize =
                function (e, n) {
                  var r,
                    o,
                    i,
                    a,
                    s,
                    u,
                    l,
                    c = z[e + ' '];
                  if (c) return n ? 0 : c.slice(0);
                  for (s = e, u = [], l = T.preFilter; s; ) {
                    (r && !(o = le.exec(s))) ||
                      (o && (s = s.slice(o[0].length) || s), u.push((i = []))),
                      (r = !1),
                      (o = ce.exec(s)) &&
                        ((r = o.shift()),
                        i.push({ value: r, type: o[0].replace(ue, ' ') }),
                        (s = s.slice(r.length)));
                    for (a in T.filter)
                      !(o = he[a].exec(s)) ||
                        (l[a] && !(o = l[a](o))) ||
                        ((r = o.shift()),
                        i.push({ value: r, type: a, matches: o }),
                        (s = s.slice(r.length)));
                    if (!r) break;
                  }
                  return n ? s.length : s ? t.error(e) : z(e, u).slice(0);
                }),
              (S = t.compile =
                function (e, t) {
                  var n,
                    r = [],
                    o = [],
                    i = X[e + ' '];
                  if (!i) {
                    for (t || (t = E(e)), n = t.length; n--; )
                      (i = b(t[n])), i[$] ? r.push(i) : o.push(i);
                    (i = X(e, x(o, r))), (i.selector = e);
                  }
                  return i;
                }),
              (A = t.select =
                function (e, t, n, r) {
                  var o,
                    i,
                    a,
                    s,
                    u,
                    l = 'function' == typeof e && e,
                    c = !r && E((e = l.selector || e));
                  if (((n = n || []), 1 === c.length)) {
                    if (
                      ((i = c[0] = c[0].slice(0)),
                      i.length > 2 &&
                        'ID' === (a = i[0]).type &&
                        9 === t.nodeType &&
                        P &&
                        T.relative[i[1].type])
                    ) {
                      if (((t = (T.find.ID(a.matches[0].replace(we, Ce), t) || [])[0]), !t))
                        return n;
                      l && (t = t.parentNode), (e = e.slice(i.shift().value.length));
                    }
                    for (
                      o = he.needsContext.test(e) ? 0 : i.length;
                      o-- && ((a = i[o]), !T.relative[(s = a.type)]);

                    )
                      if (
                        (u = T.find[s]) &&
                        (r = u(
                          a.matches[0].replace(we, Ce),
                          (xe.test(i[0].type) && f(t.parentNode)) || t,
                        ))
                      ) {
                        if ((i.splice(o, 1), (e = r.length && d(i)), !e)) return Z.apply(n, r), n;
                        break;
                      }
                  }
                  return (l || S(e, c))(r, t, !P, n, !t || (xe.test(e) && f(t.parentNode)) || t), n;
                }),
              (C.sortStable = $.split('').sort(V).join('') === $),
              (C.detectDuplicates = !!D),
              O(),
              (C.sortDetached = o(function (e) {
                return 1 & e.compareDocumentPosition(L.createElement('fieldset'));
              })),
              o(function (e) {
                return (
                  (e.innerHTML = "<a href='#'></a>"), '#' === e.firstChild.getAttribute('href')
                );
              }) ||
                i('type|href|height|width', function (e, t, n) {
                  if (!n) return e.getAttribute(t, 'type' === t.toLowerCase() ? 1 : 2);
                }),
              (C.attributes &&
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
          (ke.find = je),
            (ke.expr = je.selectors),
            (ke.expr[':'] = ke.expr.pseudos),
            (ke.uniqueSort = ke.unique = je.uniqueSort),
            (ke.text = je.getText),
            (ke.isXMLDoc = je.isXML),
            (ke.contains = je.contains),
            (ke.escapeSelector = je.escape);
          var Ee = function (e, t, n) {
              for (var r = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                if (1 === e.nodeType) {
                  if (o && ke(e).is(n)) break;
                  r.push(e);
                }
              return r;
            },
            Se = function (e, t) {
              for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
              return n;
            },
            Ae = ke.expr.match.needsContext,
            Ne = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
          (ke.filter = function (e, t, n) {
            var r = t[0];
            return (
              n && (e = ':not(' + e + ')'),
              1 === t.length && 1 === r.nodeType
                ? ke.find.matchesSelector(r, e)
                  ? [r]
                  : []
                : ke.find.matches(
                    e,
                    ke.grep(t, function (e) {
                      return 1 === e.nodeType;
                    }),
                  )
            );
          }),
            ke.fn.extend({
              find: function (e) {
                var t,
                  n,
                  r = this.length,
                  o = this;
                if ('string' != typeof e)
                  return this.pushStack(
                    ke(e).filter(function () {
                      for (t = 0; t < r; t++) if (ke.contains(o[t], this)) return !0;
                    }),
                  );
                for (n = this.pushStack([]), t = 0; t < r; t++) ke.find(e, o[t], n);
                return r > 1 ? ke.uniqueSort(n) : n;
              },
              filter: function (e) {
                return this.pushStack(a(this, e || [], !1));
              },
              not: function (e) {
                return this.pushStack(a(this, e || [], !0));
              },
              is: function (e) {
                return !!a(this, 'string' == typeof e && Ae.test(e) ? ke(e) : e || [], !1).length;
              },
            });
          var qe,
            De = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
            Oe = (ke.fn.init = function (e, t, n) {
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
                    ((t = t instanceof ke ? t[0] : t),
                    ke.merge(
                      this,
                      ke.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : we, !0),
                    ),
                    Ne.test(r[1]) && ke.isPlainObject(t))
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
                  : e(ke)
                : ke.makeArray(e, this);
            });
          (Oe.prototype = ke.fn), (qe = ke(we));
          var Le = /^(?:parents|prev(?:Until|All))/,
            He = { children: !0, contents: !0, next: !0, prev: !0 };
          ke.fn.extend({
            has: function (e) {
              var t = ke(e, this),
                n = t.length;
              return this.filter(function () {
                for (var e = 0; e < n; e++) if (ke.contains(this, t[e])) return !0;
              });
            },
            closest: function (e, t) {
              var n,
                r = 0,
                o = this.length,
                i = [],
                a = 'string' != typeof e && ke(e);
              if (!Ae.test(e))
                for (; r < o; r++)
                  for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (
                      n.nodeType < 11 &&
                      (a ? a.index(n) > -1 : 1 === n.nodeType && ke.find.matchesSelector(n, e))
                    ) {
                      i.push(n);
                      break;
                    }
              return this.pushStack(i.length > 1 ? ke.uniqueSort(i) : i);
            },
            index: function (e) {
              return e
                ? 'string' == typeof e
                  ? pe.call(ke(e), this[0])
                  : pe.call(this, e.jquery ? e[0] : e)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
            },
            add: function (e, t) {
              return this.pushStack(ke.uniqueSort(ke.merge(this.get(), ke(e, t))));
            },
            addBack: function (e) {
              return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
            },
          }),
            ke.each(
              {
                parent: function (e) {
                  var t = e.parentNode;
                  return t && 11 !== t.nodeType ? t : null;
                },
                parents: function (e) {
                  return Ee(e, 'parentNode');
                },
                parentsUntil: function (e, t, n) {
                  return Ee(e, 'parentNode', n);
                },
                next: function (e) {
                  return s(e, 'nextSibling');
                },
                prev: function (e) {
                  return s(e, 'previousSibling');
                },
                nextAll: function (e) {
                  return Ee(e, 'nextSibling');
                },
                prevAll: function (e) {
                  return Ee(e, 'previousSibling');
                },
                nextUntil: function (e, t, n) {
                  return Ee(e, 'nextSibling', n);
                },
                prevUntil: function (e, t, n) {
                  return Ee(e, 'previousSibling', n);
                },
                siblings: function (e) {
                  return Se((e.parentNode || {}).firstChild, e);
                },
                children: function (e) {
                  return Se(e.firstChild);
                },
                contents: function (e) {
                  return null != e.contentDocument && ue(e.contentDocument)
                    ? e.contentDocument
                    : (i(e, 'template') && (e = e.content || e), ke.merge([], e.childNodes));
                },
              },
              function (e, t) {
                ke.fn[e] = function (n, r) {
                  var o = ke.map(this, t, n);
                  return (
                    'Until' !== e.slice(-5) && (r = n),
                    r && 'string' == typeof r && (o = ke.filter(r, o)),
                    this.length > 1 && (He[e] || ke.uniqueSort(o), Le.test(e) && o.reverse()),
                    this.pushStack(o)
                  );
                };
              },
            );
          var Pe = /[^\x20\t\r\n\f]+/g;
          (ke.Callbacks = function (e) {
            e = 'string' == typeof e ? u(e) : ke.extend({}, e);
            var t,
              n,
              o,
              i,
              a = [],
              s = [],
              l = -1,
              c = function () {
                for (i = i || e.once, o = t = !0; s.length; l = -1)
                  for (n = s.shift(); ++l < a.length; )
                    a[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && ((l = a.length), (n = !1));
                e.memory || (n = !1), (t = !1), i && (a = n ? [] : '');
              },
              f = {
                add: function () {
                  return (
                    a &&
                      (n && !t && ((l = a.length - 1), s.push(n)),
                      (function t(n) {
                        ke.each(n, function (n, o) {
                          be(o)
                            ? (e.unique && f.has(o)) || a.push(o)
                            : o && o.length && 'string' !== r(o) && t(o);
                        });
                      })(arguments),
                      n && !t && c()),
                    this
                  );
                },
                remove: function () {
                  return (
                    ke.each(arguments, function (e, t) {
                      for (var n; (n = ke.inArray(t, a, n)) > -1; ) a.splice(n, 1), n <= l && l--;
                    }),
                    this
                  );
                },
                has: function (e) {
                  return e ? ke.inArray(e, a) > -1 : a.length > 0;
                },
                empty: function () {
                  return a && (a = []), this;
                },
                disable: function () {
                  return (i = s = []), (a = n = ''), this;
                },
                disabled: function () {
                  return !a;
                },
                lock: function () {
                  return (i = s = []), n || t || (a = n = ''), this;
                },
                locked: function () {
                  return !!i;
                },
                fireWith: function (e, n) {
                  return (
                    i || ((n = n || []), (n = [e, n.slice ? n.slice() : n]), s.push(n), t || c()),
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
            ke.extend({
              Deferred: function (t) {
                var n = [
                    ['notify', 'progress', ke.Callbacks('memory'), ke.Callbacks('memory'), 2],
                    [
                      'resolve',
                      'done',
                      ke.Callbacks('once memory'),
                      ke.Callbacks('once memory'),
                      0,
                      'resolved',
                    ],
                    [
                      'reject',
                      'fail',
                      ke.Callbacks('once memory'),
                      ke.Callbacks('once memory'),
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
                      return ke
                        .Deferred(function (t) {
                          ke.each(n, function (n, r) {
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
                          var s = this,
                            u = arguments,
                            f = function () {
                              var e, f;
                              if (!(t < a)) {
                                if (((e = r.apply(s, u)), e === n.promise()))
                                  throw new TypeError('Thenable self-resolution');
                                (f =
                                  e && ('object' == typeof e || 'function' == typeof e) && e.then),
                                  be(f)
                                    ? o
                                      ? f.call(e, i(a, n, l, o), i(a, n, c, o))
                                      : (a++,
                                        f.call(
                                          e,
                                          i(a, n, l, o),
                                          i(a, n, c, o),
                                          i(a, n, l, n.notifyWith),
                                        ))
                                    : (r !== l && ((s = void 0), (u = [e])),
                                      (o || n.resolveWith)(s, u));
                              }
                            },
                            p = o
                              ? f
                              : function () {
                                  try {
                                    f();
                                  } catch (e) {
                                    ke.Deferred.exceptionHook &&
                                      ke.Deferred.exceptionHook(e, p.stackTrace),
                                      t + 1 >= a &&
                                        (r !== c && ((s = void 0), (u = [e])), n.rejectWith(s, u));
                                  }
                                };
                          t
                            ? p()
                            : (ke.Deferred.getStackHook &&
                                (p.stackTrace = ke.Deferred.getStackHook()),
                              e.setTimeout(p));
                        };
                      }
                      var a = 0;
                      return ke
                        .Deferred(function (e) {
                          n[0][3].add(i(0, e, be(o) ? o : l, e.notifyWith)),
                            n[1][3].add(i(0, e, be(t) ? t : l)),
                            n[2][3].add(i(0, e, be(r) ? r : c));
                        })
                        .promise();
                    },
                    promise: function (e) {
                      return null != e ? ke.extend(e, o) : o;
                    },
                  },
                  i = {};
                return (
                  ke.each(n, function (e, t) {
                    var a = t[2],
                      s = t[5];
                    (o[t[1]] = a.add),
                      s &&
                        a.add(
                          function () {
                            r = s;
                          },
                          n[3 - e][2].disable,
                          n[3 - e][3].disable,
                          n[0][2].lock,
                          n[0][3].lock,
                        ),
                      a.add(t[3].fire),
                      (i[t[0]] = function () {
                        return i[t[0] + 'With'](this === i ? void 0 : this, arguments), this;
                      }),
                      (i[t[0] + 'With'] = a.fireWith);
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
                  i = ke.Deferred(),
                  a = function (e) {
                    return function (n) {
                      (r[e] = this),
                        (o[e] = arguments.length > 1 ? le.call(arguments) : n),
                        --t || i.resolveWith(r, o);
                    };
                  };
                if (
                  t <= 1 &&
                  (f(e, i.done(a(n)).resolve, i.reject, !t),
                  'pending' === i.state() || be(o[n] && o[n].then))
                )
                  return i.then();
                for (; n--; ) f(o[n], a(n), i.reject);
                return i.promise();
              },
            });
          var Re = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
          (ke.Deferred.exceptionHook = function (t, n) {
            e.console &&
              e.console.warn &&
              t &&
              Re.test(t.name) &&
              e.console.warn('jQuery.Deferred exception: ' + t.message, t.stack, n);
          }),
            (ke.readyException = function (t) {
              e.setTimeout(function () {
                throw t;
              });
            });
          var Ie = ke.Deferred();
          (ke.fn.ready = function (e) {
            return (
              Ie.then(e).catch(function (e) {
                ke.readyException(e);
              }),
              this
            );
          }),
            ke.extend({
              isReady: !1,
              readyWait: 1,
              ready: function (e) {
                (e === !0 ? --ke.readyWait : ke.isReady) ||
                  ((ke.isReady = !0), (e !== !0 && --ke.readyWait > 0) || Ie.resolveWith(we, [ke]));
              },
            }),
            (ke.ready.then = Ie.then),
            'complete' === we.readyState ||
            ('loading' !== we.readyState && !we.documentElement.doScroll)
              ? e.setTimeout(ke.ready)
              : (we.addEventListener('DOMContentLoaded', p), e.addEventListener('load', p));
          var Me = function (e, t, n, o, i, a, s) {
              var u = 0,
                l = e.length,
                c = null == n;
              if ('object' === r(n)) {
                i = !0;
                for (u in n) Me(e, t, u, n[u], !0, a, s);
              } else if (
                void 0 !== o &&
                ((i = !0),
                be(o) || (s = !0),
                c &&
                  (s
                    ? (t.call(e, o), (t = null))
                    : ((c = t),
                      (t = function (e, t, n) {
                        return c.call(ke(e), n);
                      }))),
                t)
              )
                for (; u < l; u++) t(e[u], n, s ? o : o.call(e[u], u, t(e[u], n)));
              return i ? e : c ? t.call(e) : l ? t(e[0], n) : a;
            },
            _e = /^-ms-/,
            $e = /-([a-z])/g,
            Fe = function (e) {
              return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
            };
          (g.uid = 1),
            (g.prototype = {
              cache: function (e) {
                var t = e[this.expando];
                return (
                  t ||
                    ((t = {}),
                    Fe(e) &&
                      (e.nodeType
                        ? (e[this.expando] = t)
                        : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))),
                  t
                );
              },
              set: function (e, t, n) {
                var r,
                  o = this.cache(e);
                if ('string' == typeof t) o[h(t)] = n;
                else for (r in t) o[h(r)] = t[r];
                return o;
              },
              get: function (e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][h(t)];
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
                      ? (t = t.map(h))
                      : ((t = h(t)), (t = t in r ? [t] : t.match(Pe) || [])),
                      (n = t.length);
                    for (; n--; ) delete r[t[n]];
                  }
                  (void 0 === t || ke.isEmptyObject(r)) &&
                    (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
                }
              },
              hasData: function (e) {
                var t = e[this.expando];
                return void 0 !== t && !ke.isEmptyObject(t);
              },
            });
          var Be = new g(),
            We = new g(),
            Ue = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            ze = /[A-Z]/g;
          ke.extend({
            hasData: function (e) {
              return We.hasData(e) || Be.hasData(e);
            },
            data: function (e, t, n) {
              return We.access(e, t, n);
            },
            removeData: function (e, t) {
              We.remove(e, t);
            },
            _data: function (e, t, n) {
              return Be.access(e, t, n);
            },
            _removeData: function (e, t) {
              Be.remove(e, t);
            },
          }),
            ke.fn.extend({
              data: function (e, t) {
                var n,
                  r,
                  o,
                  i = this[0],
                  a = i && i.attributes;
                if (void 0 === e) {
                  if (
                    this.length &&
                    ((o = We.get(i)), 1 === i.nodeType && !Be.get(i, 'hasDataAttrs'))
                  ) {
                    for (n = a.length; n--; )
                      a[n] &&
                        ((r = a[n].name),
                        0 === r.indexOf('data-') && ((r = h(r.slice(5))), m(i, r, o[r])));
                    Be.set(i, 'hasDataAttrs', !0);
                  }
                  return o;
                }
                return 'object' == typeof e
                  ? this.each(function () {
                      We.set(this, e);
                    })
                  : Me(
                      this,
                      function (t) {
                        var n;
                        if (i && void 0 === t) {
                          if (((n = We.get(i, e)), void 0 !== n)) return n;
                          if (((n = m(i, e)), void 0 !== n)) return n;
                        } else
                          this.each(function () {
                            We.set(this, e, t);
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
                  We.remove(this, e);
                });
              },
            }),
            ke.extend({
              queue: function (e, t, n) {
                var r;
                if (e)
                  return (
                    (t = (t || 'fx') + 'queue'),
                    (r = Be.get(e, t)),
                    n &&
                      (!r || Array.isArray(n) ? (r = Be.access(e, t, ke.makeArray(n))) : r.push(n)),
                    r || []
                  );
              },
              dequeue: function (e, t) {
                t = t || 'fx';
                var n = ke.queue(e, t),
                  r = n.length,
                  o = n.shift(),
                  i = ke._queueHooks(e, t),
                  a = function () {
                    ke.dequeue(e, t);
                  };
                'inprogress' === o && ((o = n.shift()), r--),
                  o && ('fx' === t && n.unshift('inprogress'), delete i.stop, o.call(e, a, i)),
                  !r && i && i.empty.fire();
              },
              _queueHooks: function (e, t) {
                var n = t + 'queueHooks';
                return (
                  Be.get(e, n) ||
                  Be.access(e, n, {
                    empty: ke.Callbacks('once memory').add(function () {
                      Be.remove(e, [t + 'queue', n]);
                    }),
                  })
                );
              },
            }),
            ke.fn.extend({
              queue: function (e, t) {
                var n = 2;
                return (
                  'string' != typeof e && ((t = e), (e = 'fx'), n--),
                  arguments.length < n
                    ? ke.queue(this[0], e)
                    : void 0 === t
                    ? this
                    : this.each(function () {
                        var n = ke.queue(this, e, t);
                        ke._queueHooks(this, e),
                          'fx' === e && 'inprogress' !== n[0] && ke.dequeue(this, e);
                      })
                );
              },
              dequeue: function (e) {
                return this.each(function () {
                  ke.dequeue(this, e);
                });
              },
              clearQueue: function (e) {
                return this.queue(e || 'fx', []);
              },
              promise: function (e, t) {
                var n,
                  r = 1,
                  o = ke.Deferred(),
                  i = this,
                  a = this.length,
                  s = function () {
                    --r || o.resolveWith(i, [i]);
                  };
                for ('string' != typeof e && ((t = e), (e = void 0)), e = e || 'fx'; a--; )
                  (n = Be.get(i[a], e + 'queueHooks')), n && n.empty && (r++, n.empty.add(s));
                return s(), o.promise(t);
              },
            });
          var Xe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Ke = new RegExp('^(?:([+-])=|)(' + Xe + ')([a-z%]*)$', 'i'),
            Ve = ['Top', 'Right', 'Bottom', 'Left'],
            Ge = we.documentElement,
            Ye = function (e) {
              return ke.contains(e.ownerDocument, e);
            },
            Qe = { composed: !0 };
          Ge.getRootNode &&
            (Ye = function (e) {
              return ke.contains(e.ownerDocument, e) || e.getRootNode(Qe) === e.ownerDocument;
            });
          var Je = function (e, t) {
              return (
                (e = t || e),
                'none' === e.style.display ||
                  ('' === e.style.display && Ye(e) && 'none' === ke.css(e, 'display'))
              );
            },
            Ze = {};
          ke.fn.extend({
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
                    Je(this) ? ke(this).show() : ke(this).hide();
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
            at = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            st = /^([^.]*)(?:\.(.+)|)/;
          (ke.event = {
            global: {},
            add: function (e, t, n, r, o) {
              var i,
                a,
                s,
                u,
                l,
                c,
                f,
                p,
                d,
                h,
                g,
                v = Be.get(e);
              if (Fe(e))
                for (
                  n.handler && ((i = n), (n = i.handler), (o = i.selector)),
                    o && ke.find.matchesSelector(Ge, o),
                    n.guid || (n.guid = ke.guid++),
                    (u = v.events) || (u = v.events = Object.create(null)),
                    (a = v.handle) ||
                      (a = v.handle =
                        function (t) {
                          return 'undefined' != typeof ke && ke.event.triggered !== t.type
                            ? ke.event.dispatch.apply(e, arguments)
                            : void 0;
                        }),
                    t = (t || '').match(Pe) || [''],
                    l = t.length;
                  l--;

                )
                  (s = st.exec(t[l]) || []),
                    (d = g = s[1]),
                    (h = (s[2] || '').split('.').sort()),
                    d &&
                      ((f = ke.event.special[d] || {}),
                      (d = (o ? f.delegateType : f.bindType) || d),
                      (f = ke.event.special[d] || {}),
                      (c = ke.extend(
                        {
                          type: d,
                          origType: g,
                          data: r,
                          handler: n,
                          guid: n.guid,
                          selector: o,
                          needsContext: o && ke.expr.match.needsContext.test(o),
                          namespace: h.join('.'),
                        },
                        i,
                      )),
                      (p = u[d]) ||
                        ((p = u[d] = []),
                        (p.delegateCount = 0),
                        (f.setup && f.setup.call(e, r, h, a) !== !1) ||
                          (e.addEventListener && e.addEventListener(d, a))),
                      f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)),
                      o ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                      (ke.event.global[d] = !0));
            },
            remove: function (e, t, n, r, o) {
              var i,
                a,
                s,
                u,
                l,
                c,
                f,
                p,
                d,
                h,
                g,
                v = Be.hasData(e) && Be.get(e);
              if (v && (u = v.events)) {
                for (t = (t || '').match(Pe) || [''], l = t.length; l--; )
                  if (
                    ((s = st.exec(t[l]) || []),
                    (d = g = s[1]),
                    (h = (s[2] || '').split('.').sort()),
                    d)
                  ) {
                    for (
                      f = ke.event.special[d] || {},
                        d = (r ? f.delegateType : f.bindType) || d,
                        p = u[d] || [],
                        s = s[2] && new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                        a = i = p.length;
                      i--;

                    )
                      (c = p[i]),
                        (!o && g !== c.origType) ||
                          (n && n.guid !== c.guid) ||
                          (s && !s.test(c.namespace)) ||
                          (r && r !== c.selector && ('**' !== r || !c.selector)) ||
                          (p.splice(i, 1),
                          c.selector && p.delegateCount--,
                          f.remove && f.remove.call(e, c));
                    a &&
                      !p.length &&
                      ((f.teardown && f.teardown.call(e, h, v.handle) !== !1) ||
                        ke.removeEvent(e, d, v.handle),
                      delete u[d]);
                  } else for (d in u) ke.event.remove(e, d + t[l], n, r, !0);
                ke.isEmptyObject(u) && Be.remove(e, 'handle events');
              }
            },
            dispatch: function (e) {
              var t,
                n,
                r,
                o,
                i,
                a,
                s = new Array(arguments.length),
                u = ke.event.fix(e),
                l = (Be.get(this, 'events') || Object.create(null))[u.type] || [],
                c = ke.event.special[u.type] || {};
              for (s[0] = u, t = 1; t < arguments.length; t++) s[t] = arguments[t];
              if (
                ((u.delegateTarget = this), !c.preDispatch || c.preDispatch.call(this, u) !== !1)
              ) {
                for (
                  a = ke.event.handlers.call(this, u, l), t = 0;
                  (o = a[t++]) && !u.isPropagationStopped();

                )
                  for (
                    u.currentTarget = o.elem, n = 0;
                    (i = o.handlers[n++]) && !u.isImmediatePropagationStopped();

                  )
                    (u.rnamespace && i.namespace !== !1 && !u.rnamespace.test(i.namespace)) ||
                      ((u.handleObj = i),
                      (u.data = i.data),
                      (r = ((ke.event.special[i.origType] || {}).handle || i.handler).apply(
                        o.elem,
                        s,
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
                a,
                s = [],
                u = t.delegateCount,
                l = e.target;
              if (u && l.nodeType && !('click' === e.type && e.button >= 1))
                for (; l !== this; l = l.parentNode || this)
                  if (1 === l.nodeType && ('click' !== e.type || l.disabled !== !0)) {
                    for (i = [], a = {}, n = 0; n < u; n++)
                      (r = t[n]),
                        (o = r.selector + ' '),
                        void 0 === a[o] &&
                          (a[o] = r.needsContext
                            ? ke(o, this).index(l) > -1
                            : ke.find(o, this, null, [l]).length),
                        a[o] && i.push(r);
                    i.length && s.push({ elem: l, handlers: i });
                  }
              return (l = this), u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s;
            },
            addProp: function (e, t) {
              Object.defineProperty(ke.Event.prototype, e, {
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
              return e[ke.expando] ? e : new ke.Event(e);
            },
            special: {
              load: { noBubble: !0 },
              click: {
                setup: function (e) {
                  var t = this || e;
                  return et.test(t.type) && t.click && i(t, 'input') && N(t, 'click', k), !1;
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
            (ke.removeEvent = function (e, t, n) {
              e.removeEventListener && e.removeEventListener(t, n);
            }),
            (ke.Event = function (e, t) {
              return this instanceof ke.Event
                ? (e && e.type
                    ? ((this.originalEvent = e),
                      (this.type = e.type),
                      (this.isDefaultPrevented =
                        e.defaultPrevented ||
                        (void 0 === e.defaultPrevented && e.returnValue === !1)
                          ? k
                          : j),
                      (this.target =
                        e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target),
                      (this.currentTarget = e.currentTarget),
                      (this.relatedTarget = e.relatedTarget))
                    : (this.type = e),
                  t && ke.extend(this, t),
                  (this.timeStamp = (e && e.timeStamp) || Date.now()),
                  void (this[ke.expando] = !0))
                : new ke.Event(e, t);
            }),
            (ke.Event.prototype = {
              constructor: ke.Event,
              isDefaultPrevented: j,
              isPropagationStopped: j,
              isImmediatePropagationStopped: j,
              isSimulated: !1,
              preventDefault: function () {
                var e = this.originalEvent;
                (this.isDefaultPrevented = k), e && !this.isSimulated && e.preventDefault();
              },
              stopPropagation: function () {
                var e = this.originalEvent;
                (this.isPropagationStopped = k), e && !this.isSimulated && e.stopPropagation();
              },
              stopImmediatePropagation: function () {
                var e = this.originalEvent;
                (this.isImmediatePropagationStopped = k),
                  e && !this.isSimulated && e.stopImmediatePropagation(),
                  this.stopPropagation();
              },
            }),
            ke.each(
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
                    : !e.which && void 0 !== t && at.test(e.type)
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
              ke.event.addProp,
            ),
            ke.each({ focus: 'focusin', blur: 'focusout' }, function (e, t) {
              ke.event.special[e] = {
                setup: function () {
                  return N(this, e, E), !1;
                },
                trigger: function () {
                  return N(this, e), !0;
                },
                delegateType: t,
              };
            }),
            ke.each(
              {
                mouseenter: 'mouseover',
                mouseleave: 'mouseout',
                pointerenter: 'pointerover',
                pointerleave: 'pointerout',
              },
              function (e, t) {
                ke.event.special[e] = {
                  delegateType: t,
                  bindType: t,
                  handle: function (e) {
                    var n,
                      r = this,
                      o = e.relatedTarget,
                      i = e.handleObj;
                    return (
                      (o && (o === r || ke.contains(r, o))) ||
                        ((e.type = i.origType),
                        (n = i.handler.apply(this, arguments)),
                        (e.type = t)),
                      n
                    );
                  },
                };
              },
            ),
            ke.fn.extend({
              on: function (e, t, n, r) {
                return A(this, e, t, n, r);
              },
              one: function (e, t, n, r) {
                return A(this, e, t, n, r, 1);
              },
              off: function (e, t, n) {
                var r, o;
                if (e && e.preventDefault && e.handleObj)
                  return (
                    (r = e.handleObj),
                    ke(e.delegateTarget).off(
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
                  n === !1 && (n = j),
                  this.each(function () {
                    ke.event.remove(this, e, n, t);
                  })
                );
              },
            });
          var ut = /<script|<style|<link/i,
            lt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            ct = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
          ke.extend({
            htmlPrefilter: function (e) {
              return e;
            },
            clone: function (e, t, n) {
              var r,
                o,
                i,
                a,
                s = e.cloneNode(!0),
                u = Ye(e);
              if (!(ye.noCloneChecked || (1 !== e.nodeType && 11 !== e.nodeType) || ke.isXMLDoc(e)))
                for (a = w(s), i = w(e), r = 0, o = i.length; r < o; r++) H(i[r], a[r]);
              if (t)
                if (n)
                  for (i = i || w(e), a = a || w(s), r = 0, o = i.length; r < o; r++) L(i[r], a[r]);
                else L(e, s);
              return (a = w(s, 'script')), a.length > 0 && C(a, !u && w(e, 'script')), s;
            },
            cleanData: function (e) {
              for (var t, n, r, o = ke.event.special, i = 0; void 0 !== (n = e[i]); i++)
                if (Fe(n)) {
                  if ((t = n[Be.expando])) {
                    if (t.events)
                      for (r in t.events)
                        o[r] ? ke.event.remove(n, r) : ke.removeEvent(n, r, t.handle);
                    n[Be.expando] = void 0;
                  }
                  n[We.expando] && (n[We.expando] = void 0);
                }
            },
          }),
            ke.fn.extend({
              detach: function (e) {
                return R(this, e, !0);
              },
              remove: function (e) {
                return R(this, e);
              },
              text: function (e) {
                return Me(
                  this,
                  function (e) {
                    return void 0 === e
                      ? ke.text(this)
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
                return P(this, arguments, function (e) {
                  if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = q(this, e);
                    t.appendChild(e);
                  }
                });
              },
              prepend: function () {
                return P(this, arguments, function (e) {
                  if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = q(this, e);
                    t.insertBefore(e, t.firstChild);
                  }
                });
              },
              before: function () {
                return P(this, arguments, function (e) {
                  this.parentNode && this.parentNode.insertBefore(e, this);
                });
              },
              after: function () {
                return P(this, arguments, function (e) {
                  this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                });
              },
              empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++)
                  1 === e.nodeType && (ke.cleanData(w(e, !1)), (e.textContent = ''));
                return this;
              },
              clone: function (e, t) {
                return (
                  (e = null != e && e),
                  (t = null == t ? e : t),
                  this.map(function () {
                    return ke.clone(this, e, t);
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
                      e = ke.htmlPrefilter(e);
                      try {
                        for (; n < r; n++)
                          (t = this[n] || {}),
                            1 === t.nodeType && (ke.cleanData(w(t, !1)), (t.innerHTML = e));
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
                return P(
                  this,
                  arguments,
                  function (t) {
                    var n = this.parentNode;
                    ke.inArray(this, e) < 0 &&
                      (ke.cleanData(w(this)), n && n.replaceChild(t, this));
                  },
                  e,
                );
              },
            }),
            ke.each(
              {
                appendTo: 'append',
                prependTo: 'prepend',
                insertBefore: 'before',
                insertAfter: 'after',
                replaceAll: 'replaceWith',
              },
              function (e, t) {
                ke.fn[e] = function (e) {
                  for (var n, r = [], o = ke(e), i = o.length - 1, a = 0; a <= i; a++)
                    (n = a === i ? this : this.clone(!0)), ke(o[a])[t](n), fe.apply(r, n.get());
                  return this.pushStack(r);
                };
              },
            );
          var ft = new RegExp('^(' + Xe + ')(?!px)[a-z%]+$', 'i'),
            pt = function (t) {
              var n = t.ownerDocument.defaultView;
              return (n && n.opener) || (n = e), n.getComputedStyle(t);
            },
            dt = function (e, t, n) {
              var r,
                o,
                i = {};
              for (o in t) (i[o] = e.style[o]), (e.style[o] = t[o]);
              r = n.call(e);
              for (o in t) e.style[o] = i[o];
              return r;
            },
            ht = new RegExp(Ve.join('|'), 'i');
          !(function () {
            function t() {
              if (c) {
                (l.style.cssText =
                  'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
                  (c.style.cssText =
                    'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
                  Ge.appendChild(l).appendChild(c);
                var t = e.getComputedStyle(c);
                (r = '1%' !== t.top),
                  (u = 12 === n(t.marginLeft)),
                  (c.style.right = '60%'),
                  (a = 36 === n(t.right)),
                  (o = 36 === n(t.width)),
                  (c.style.position = 'absolute'),
                  (i = 12 === n(c.offsetWidth / 3)),
                  Ge.removeChild(l),
                  (c = null);
              }
            }
            function n(e) {
              return Math.round(parseFloat(e));
            }
            var r,
              o,
              i,
              a,
              s,
              u,
              l = we.createElement('div'),
              c = we.createElement('div');
            c.style &&
              ((c.style.backgroundClip = 'content-box'),
              (c.cloneNode(!0).style.backgroundClip = ''),
              (ye.clearCloneStyle = 'content-box' === c.style.backgroundClip),
              ke.extend(ye, {
                boxSizingReliable: function () {
                  return t(), o;
                },
                pixelBoxStyles: function () {
                  return t(), a;
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
                    null == s &&
                      ((t = we.createElement('table')),
                      (n = we.createElement('tr')),
                      (r = we.createElement('div')),
                      (t.style.cssText = 'position:absolute;left:-11111px'),
                      (n.style.height = '1px'),
                      (r.style.height = '9px'),
                      Ge.appendChild(t).appendChild(n).appendChild(r),
                      (o = e.getComputedStyle(n)),
                      (s = parseInt(o.height) > 3),
                      Ge.removeChild(t)),
                    s
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
          ke.extend({
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
                  a,
                  s = h(t),
                  u = bt.test(t),
                  l = e.style;
                return (
                  u || (t = $(s)),
                  (a = ke.cssHooks[t] || ke.cssHooks[s]),
                  void 0 === n
                    ? a && 'get' in a && void 0 !== (o = a.get(e, !1, r))
                      ? o
                      : l[t]
                    : ((i = typeof n),
                      'string' === i &&
                        (o = Ke.exec(n)) &&
                        o[1] &&
                        ((n = y(e, t, o)), (i = 'number')),
                      null != n &&
                        n === n &&
                        ('number' !== i || u || (n += (o && o[3]) || (ke.cssNumber[s] ? '' : 'px')),
                        ye.clearCloneStyle ||
                          '' !== n ||
                          0 !== t.indexOf('background') ||
                          (l[t] = 'inherit'),
                        (a && 'set' in a && void 0 === (n = a.set(e, n, r))) ||
                          (u ? l.setProperty(t, n) : (l[t] = n))),
                      void 0)
                );
              }
            },
            css: function (e, t, n, r) {
              var o,
                i,
                a,
                s = h(t),
                u = bt.test(t);
              return (
                u || (t = $(s)),
                (a = ke.cssHooks[t] || ke.cssHooks[s]),
                a && 'get' in a && (o = a.get(e, !0, n)),
                void 0 === o && (o = I(e, t, r)),
                'normal' === o && t in wt && (o = wt[t]),
                '' === n || n ? ((i = parseFloat(o)), n === !0 || isFinite(i) ? i || 0 : o) : o
              );
            },
          }),
            ke.each(['height', 'width'], function (e, t) {
              ke.cssHooks[t] = {
                get: function (e, n, r) {
                  if (n)
                    return !yt.test(ke.css(e, 'display')) ||
                      (e.getClientRects().length && e.getBoundingClientRect().width)
                      ? W(e, t, r)
                      : dt(e, xt, function () {
                          return W(e, t, r);
                        });
                },
                set: function (e, n, r) {
                  var o,
                    i = pt(e),
                    a = !ye.scrollboxSize() && 'absolute' === i.position,
                    s = a || r,
                    u = s && 'border-box' === ke.css(e, 'boxSizing', !1, i),
                    l = r ? B(e, t, r, u, i) : 0;
                  return (
                    u &&
                      a &&
                      (l -= Math.ceil(
                        e['offset' + t[0].toUpperCase() + t.slice(1)] -
                          parseFloat(i[t]) -
                          B(e, t, 'border', !1, i) -
                          0.5,
                      )),
                    l &&
                      (o = Ke.exec(n)) &&
                      'px' !== (o[3] || 'px') &&
                      ((e.style[t] = n), (n = ke.css(e, t))),
                    F(e, n, l)
                  );
                },
              };
            }),
            (ke.cssHooks.marginLeft = M(ye.reliableMarginLeft, function (e, t) {
              if (t)
                return (
                  (parseFloat(I(e, 'marginLeft')) ||
                    e.getBoundingClientRect().left -
                      dt(e, { marginLeft: 0 }, function () {
                        return e.getBoundingClientRect().left;
                      })) + 'px'
                );
            })),
            ke.each({ margin: '', padding: '', border: 'Width' }, function (e, t) {
              (ke.cssHooks[e + t] = {
                expand: function (n) {
                  for (var r = 0, o = {}, i = 'string' == typeof n ? n.split(' ') : [n]; r < 4; r++)
                    o[e + Ve[r] + t] = i[r] || i[r - 2] || i[0];
                  return o;
                },
              }),
                'margin' !== e && (ke.cssHooks[e + t].set = F);
            }),
            ke.fn.extend({
              css: function (e, t) {
                return Me(
                  this,
                  function (e, t, n) {
                    var r,
                      o,
                      i = {},
                      a = 0;
                    if (Array.isArray(t)) {
                      for (r = pt(e), o = t.length; a < o; a++) i[t[a]] = ke.css(e, t[a], !1, r);
                      return i;
                    }
                    return void 0 !== n ? ke.style(e, t, n) : ke.css(e, t);
                  },
                  e,
                  t,
                  arguments.length > 1,
                );
              },
            }),
            (ke.Tween = U),
            (U.prototype = {
              constructor: U,
              init: function (e, t, n, r, o, i) {
                (this.elem = e),
                  (this.prop = n),
                  (this.easing = o || ke.easing._default),
                  (this.options = t),
                  (this.start = this.now = this.cur()),
                  (this.end = r),
                  (this.unit = i || (ke.cssNumber[n] ? '' : 'px'));
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
                        ke.easing[this.easing](
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
                    : ((t = ke.css(e.elem, e.prop, '')), t && 'auto' !== t ? t : 0);
                },
                set: function (e) {
                  ke.fx.step[e.prop]
                    ? ke.fx.step[e.prop](e)
                    : 1 !== e.elem.nodeType ||
                      (!ke.cssHooks[e.prop] && null == e.elem.style[$(e.prop)])
                    ? (e.elem[e.prop] = e.now)
                    : ke.style(e.elem, e.prop, e.now + e.unit);
                },
              },
            }),
            (U.propHooks.scrollTop = U.propHooks.scrollLeft =
              {
                set: function (e) {
                  e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                },
              }),
            (ke.easing = {
              linear: function (e) {
                return e;
              },
              swing: function (e) {
                return 0.5 - Math.cos(e * Math.PI) / 2;
              },
              _default: 'swing',
            }),
            (ke.fx = U.prototype.init),
            (ke.fx.step = {});
          var Ct,
            Tt,
            kt = /^(?:toggle|show|hide)$/,
            jt = /queueHooks$/;
          (ke.Animation = ke.extend(Q, {
            tweeners: {
              '*': [
                function (e, t) {
                  var n = this.createTween(e, t);
                  return y(n.elem, e, Ke.exec(t), n), n;
                },
              ],
            },
            tweener: function (e, t) {
              be(e) ? ((t = e), (e = ['*'])) : (e = e.match(Pe));
              for (var n, r = 0, o = e.length; r < o; r++)
                (n = e[r]), (Q.tweeners[n] = Q.tweeners[n] || []), Q.tweeners[n].unshift(t);
            },
            prefilters: [G],
            prefilter: function (e, t) {
              t ? Q.prefilters.unshift(e) : Q.prefilters.push(e);
            },
          })),
            (ke.speed = function (e, t, n) {
              var r =
                e && 'object' == typeof e
                  ? ke.extend({}, e)
                  : {
                      complete: n || (!n && t) || (be(e) && e),
                      duration: e,
                      easing: (n && t) || (t && !be(t) && t),
                    };
              return (
                ke.fx.off
                  ? (r.duration = 0)
                  : 'number' != typeof r.duration &&
                    (r.duration in ke.fx.speeds
                      ? (r.duration = ke.fx.speeds[r.duration])
                      : (r.duration = ke.fx.speeds._default)),
                (null != r.queue && r.queue !== !0) || (r.queue = 'fx'),
                (r.old = r.complete),
                (r.complete = function () {
                  be(r.old) && r.old.call(this), r.queue && ke.dequeue(this, r.queue);
                }),
                r
              );
            }),
            ke.fn.extend({
              fadeTo: function (e, t, n, r) {
                return this.filter(Je)
                  .css('opacity', 0)
                  .show()
                  .end()
                  .animate({ opacity: t }, e, n, r);
              },
              animate: function (e, t, n, r) {
                var o = ke.isEmptyObject(e),
                  i = ke.speed(t, n, r),
                  a = function () {
                    var t = Q(this, ke.extend({}, e), i);
                    (o || Be.get(this, 'finish')) && t.stop(!0);
                  };
                return (a.finish = a), o || i.queue === !1 ? this.each(a) : this.queue(i.queue, a);
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
                      i = ke.timers,
                      a = Be.get(this);
                    if (o) a[o] && a[o].stop && r(a[o]);
                    else for (o in a) a[o] && a[o].stop && jt.test(o) && r(a[o]);
                    for (o = i.length; o--; )
                      i[o].elem !== this ||
                        (null != e && i[o].queue !== e) ||
                        (i[o].anim.stop(n), (t = !1), i.splice(o, 1));
                    (!t && n) || ke.dequeue(this, e);
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
                      i = ke.timers,
                      a = r ? r.length : 0;
                    for (
                      n.finish = !0,
                        ke.queue(this, e, []),
                        o && o.stop && o.stop.call(this, !0),
                        t = i.length;
                      t--;

                    )
                      i[t].elem === this &&
                        i[t].queue === e &&
                        (i[t].anim.stop(!0), i.splice(t, 1));
                    for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish;
                  })
                );
              },
            }),
            ke.each(['toggle', 'show', 'hide'], function (e, t) {
              var n = ke.fn[t];
              ke.fn[t] = function (e, r, o) {
                return null == e || 'boolean' == typeof e
                  ? n.apply(this, arguments)
                  : this.animate(K(t, !0), e, r, o);
              };
            }),
            ke.each(
              {
                slideDown: K('show'),
                slideUp: K('hide'),
                slideToggle: K('toggle'),
                fadeIn: { opacity: 'show' },
                fadeOut: { opacity: 'hide' },
                fadeToggle: { opacity: 'toggle' },
              },
              function (e, t) {
                ke.fn[e] = function (e, n, r) {
                  return this.animate(t, e, n, r);
                };
              },
            ),
            (ke.timers = []),
            (ke.fx.tick = function () {
              var e,
                t = 0,
                n = ke.timers;
              for (Ct = Date.now(); t < n.length; t++)
                (e = n[t]), e() || n[t] !== e || n.splice(t--, 1);
              n.length || ke.fx.stop(), (Ct = void 0);
            }),
            (ke.fx.timer = function (e) {
              ke.timers.push(e), ke.fx.start();
            }),
            (ke.fx.interval = 13),
            (ke.fx.start = function () {
              Tt || ((Tt = !0), z());
            }),
            (ke.fx.stop = function () {
              Tt = null;
            }),
            (ke.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (ke.fn.delay = function (t, n) {
              return (
                (t = ke.fx ? ke.fx.speeds[t] || t : t),
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
          var Et,
            St = ke.expr.attrHandle;
          ke.fn.extend({
            attr: function (e, t) {
              return Me(this, ke.attr, e, t, arguments.length > 1);
            },
            removeAttr: function (e) {
              return this.each(function () {
                ke.removeAttr(this, e);
              });
            },
          }),
            ke.extend({
              attr: function (e, t, n) {
                var r,
                  o,
                  i = e.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                  return 'undefined' == typeof e.getAttribute
                    ? ke.prop(e, t, n)
                    : ((1 === i && ke.isXMLDoc(e)) ||
                        (o =
                          ke.attrHooks[t.toLowerCase()] ||
                          (ke.expr.match.bool.test(t) ? Et : void 0)),
                      void 0 !== n
                        ? null === n
                          ? void ke.removeAttr(e, t)
                          : o && 'set' in o && void 0 !== (r = o.set(e, n, t))
                          ? r
                          : (e.setAttribute(t, n + ''), n)
                        : o && 'get' in o && null !== (r = o.get(e, t))
                        ? r
                        : ((r = ke.find.attr(e, t)), null == r ? void 0 : r));
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
                  o = t && t.match(Pe);
                if (o && 1 === e.nodeType) for (; (n = o[r++]); ) e.removeAttribute(n);
              },
            }),
            (Et = {
              set: function (e, t, n) {
                return t === !1 ? ke.removeAttr(e, n) : e.setAttribute(n, n), n;
              },
            }),
            ke.each(ke.expr.match.bool.source.match(/\w+/g), function (e, t) {
              var n = St[t] || ke.find.attr;
              St[t] = function (e, t, r) {
                var o,
                  i,
                  a = t.toLowerCase();
                return (
                  r || ((i = St[a]), (St[a] = o), (o = null != n(e, t, r) ? a : null), (St[a] = i)),
                  o
                );
              };
            });
          var At = /^(?:input|select|textarea|button)$/i,
            Nt = /^(?:a|area)$/i;
          ke.fn.extend({
            prop: function (e, t) {
              return Me(this, ke.prop, e, t, arguments.length > 1);
            },
            removeProp: function (e) {
              return this.each(function () {
                delete this[ke.propFix[e] || e];
              });
            },
          }),
            ke.extend({
              prop: function (e, t, n) {
                var r,
                  o,
                  i = e.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                  return (
                    (1 === i && ke.isXMLDoc(e)) ||
                      ((t = ke.propFix[t] || t), (o = ke.propHooks[t])),
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
                    var t = ke.find.attr(e, 'tabindex');
                    return t
                      ? parseInt(t, 10)
                      : At.test(e.nodeName) || (Nt.test(e.nodeName) && e.href)
                      ? 0
                      : -1;
                  },
                },
              },
              propFix: { for: 'htmlFor', class: 'className' },
            }),
            ye.optSelected ||
              (ke.propHooks.selected = {
                get: function (e) {
                  var t = e.parentNode;
                  return t && t.parentNode && t.parentNode.selectedIndex, null;
                },
                set: function (e) {
                  var t = e.parentNode;
                  t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
                },
              }),
            ke.each(
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
                ke.propFix[this.toLowerCase()] = this;
              },
            ),
            ke.fn.extend({
              addClass: function (e) {
                var t,
                  n,
                  r,
                  o,
                  i,
                  a,
                  s,
                  u = 0;
                if (be(e))
                  return this.each(function (t) {
                    ke(this).addClass(e.call(this, t, Z(this)));
                  });
                if (((t = ee(e)), t.length))
                  for (; (n = this[u++]); )
                    if (((o = Z(n)), (r = 1 === n.nodeType && ' ' + J(o) + ' '))) {
                      for (a = 0; (i = t[a++]); ) r.indexOf(' ' + i + ' ') < 0 && (r += i + ' ');
                      (s = J(r)), o !== s && n.setAttribute('class', s);
                    }
                return this;
              },
              removeClass: function (e) {
                var t,
                  n,
                  r,
                  o,
                  i,
                  a,
                  s,
                  u = 0;
                if (be(e))
                  return this.each(function (t) {
                    ke(this).removeClass(e.call(this, t, Z(this)));
                  });
                if (!arguments.length) return this.attr('class', '');
                if (((t = ee(e)), t.length))
                  for (; (n = this[u++]); )
                    if (((o = Z(n)), (r = 1 === n.nodeType && ' ' + J(o) + ' '))) {
                      for (a = 0; (i = t[a++]); )
                        for (; r.indexOf(' ' + i + ' ') > -1; ) r = r.replace(' ' + i + ' ', ' ');
                      (s = J(r)), o !== s && n.setAttribute('class', s);
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
                      ke(this).toggleClass(e.call(this, n, Z(this), t), t);
                    })
                  : this.each(function () {
                      var t, o, i, a;
                      if (r)
                        for (o = 0, i = ke(this), a = ee(e); (t = a[o++]); )
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
                  if (1 === n.nodeType && (' ' + J(Z(n)) + ' ').indexOf(t) > -1) return !0;
                return !1;
              },
            });
          var qt = /\r/g;
          ke.fn.extend({
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
                        ((o = r ? e.call(this, n, ke(this).val()) : e),
                        null == o
                          ? (o = '')
                          : 'number' == typeof o
                          ? (o += '')
                          : Array.isArray(o) &&
                            (o = ke.map(o, function (e) {
                              return null == e ? '' : e + '';
                            })),
                        (t = ke.valHooks[this.type] || ke.valHooks[this.nodeName.toLowerCase()]),
                        (t && 'set' in t && void 0 !== t.set(this, o, 'value')) ||
                          (this.value = o));
                    })
                  );
                if (o)
                  return (
                    (t = ke.valHooks[o.type] || ke.valHooks[o.nodeName.toLowerCase()]),
                    t && 'get' in t && void 0 !== (n = t.get(o, 'value'))
                      ? n
                      : ((n = o.value),
                        'string' == typeof n ? n.replace(qt, '') : null == n ? '' : n)
                  );
              }
            },
          }),
            ke.extend({
              valHooks: {
                option: {
                  get: function (e) {
                    var t = ke.find.attr(e, 'value');
                    return null != t ? t : J(ke.text(e));
                  },
                },
                select: {
                  get: function (e) {
                    var t,
                      n,
                      r,
                      o = e.options,
                      a = e.selectedIndex,
                      s = 'select-one' === e.type,
                      u = s ? null : [],
                      l = s ? a + 1 : o.length;
                    for (r = a < 0 ? l : s ? a : 0; r < l; r++)
                      if (
                        ((n = o[r]),
                        (n.selected || r === a) &&
                          !n.disabled &&
                          (!n.parentNode.disabled || !i(n.parentNode, 'optgroup')))
                      ) {
                        if (((t = ke(n).val()), s)) return t;
                        u.push(t);
                      }
                    return u;
                  },
                  set: function (e, t) {
                    for (var n, r, o = e.options, i = ke.makeArray(t), a = o.length; a--; )
                      (r = o[a]),
                        (r.selected = ke.inArray(ke.valHooks.option.get(r), i) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), i;
                  },
                },
              },
            }),
            ke.each(['radio', 'checkbox'], function () {
              (ke.valHooks[this] = {
                set: function (e, t) {
                  if (Array.isArray(t)) return (e.checked = ke.inArray(ke(e).val(), t) > -1);
                },
              }),
                ye.checkOn ||
                  (ke.valHooks[this].get = function (e) {
                    return null === e.getAttribute('value') ? 'on' : e.value;
                  });
            }),
            (ye.focusin = 'onfocusin' in e);
          var Dt = /^(?:focusinfocus|focusoutblur)$/,
            Ot = function (e) {
              e.stopPropagation();
            };
          ke.extend(ke.event, {
            trigger: function (t, n, r, o) {
              var i,
                a,
                s,
                u,
                l,
                c,
                f,
                p,
                d = [r || we],
                h = ge.call(t, 'type') ? t.type : t,
                g = ge.call(t, 'namespace') ? t.namespace.split('.') : [];
              if (
                ((a = p = s = r = r || we),
                3 !== r.nodeType &&
                  8 !== r.nodeType &&
                  !Dt.test(h + ke.event.triggered) &&
                  (h.indexOf('.') > -1 && ((g = h.split('.')), (h = g.shift()), g.sort()),
                  (l = h.indexOf(':') < 0 && 'on' + h),
                  (t = t[ke.expando] ? t : new ke.Event(h, 'object' == typeof t && t)),
                  (t.isTrigger = o ? 2 : 3),
                  (t.namespace = g.join('.')),
                  (t.rnamespace = t.namespace
                    ? new RegExp('(^|\\.)' + g.join('\\.(?:.*\\.|)') + '(\\.|$)')
                    : null),
                  (t.result = void 0),
                  t.target || (t.target = r),
                  (n = null == n ? [t] : ke.makeArray(n, [t])),
                  (f = ke.event.special[h] || {}),
                  o || !f.trigger || f.trigger.apply(r, n) !== !1))
              ) {
                if (!o && !f.noBubble && !xe(r)) {
                  for (
                    u = f.delegateType || h, Dt.test(u + h) || (a = a.parentNode);
                    a;
                    a = a.parentNode
                  )
                    d.push(a), (s = a);
                  s === (r.ownerDocument || we) && d.push(s.defaultView || s.parentWindow || e);
                }
                for (i = 0; (a = d[i++]) && !t.isPropagationStopped(); )
                  (p = a),
                    (t.type = i > 1 ? u : f.bindType || h),
                    (c =
                      (Be.get(a, 'events') || Object.create(null))[t.type] && Be.get(a, 'handle')),
                    c && c.apply(a, n),
                    (c = l && a[l]),
                    c &&
                      c.apply &&
                      Fe(a) &&
                      ((t.result = c.apply(a, n)), t.result === !1 && t.preventDefault());
                return (
                  (t.type = h),
                  o ||
                    t.isDefaultPrevented() ||
                    (f._default && f._default.apply(d.pop(), n) !== !1) ||
                    !Fe(r) ||
                    (l &&
                      be(r[h]) &&
                      !xe(r) &&
                      ((s = r[l]),
                      s && (r[l] = null),
                      (ke.event.triggered = h),
                      t.isPropagationStopped() && p.addEventListener(h, Ot),
                      r[h](),
                      t.isPropagationStopped() && p.removeEventListener(h, Ot),
                      (ke.event.triggered = void 0),
                      s && (r[l] = s))),
                  t.result
                );
              }
            },
            simulate: function (e, t, n) {
              var r = ke.extend(new ke.Event(), n, { type: e, isSimulated: !0 });
              ke.event.trigger(r, null, t);
            },
          }),
            ke.fn.extend({
              trigger: function (e, t) {
                return this.each(function () {
                  ke.event.trigger(e, t, this);
                });
              },
              triggerHandler: function (e, t) {
                var n = this[0];
                if (n) return ke.event.trigger(e, t, n, !0);
              },
            }),
            ye.focusin ||
              ke.each({ focus: 'focusin', blur: 'focusout' }, function (e, t) {
                var n = function (e) {
                  ke.event.simulate(t, e.target, ke.event.fix(e));
                };
                ke.event.special[t] = {
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
          var Lt = e.location,
            Ht = { guid: Date.now() },
            Pt = /\?/;
          ke.parseXML = function (t) {
            var n;
            if (!t || 'string' != typeof t) return null;
            try {
              n = new e.DOMParser().parseFromString(t, 'text/xml');
            } catch (e) {
              n = void 0;
            }
            return (
              (n && !n.getElementsByTagName('parsererror').length) || ke.error('Invalid XML: ' + t),
              n
            );
          };
          var Rt = /\[\]$/,
            It = /\r?\n/g,
            Mt = /^(?:submit|button|image|reset|file)$/i,
            _t = /^(?:input|select|textarea|keygen)/i;
          (ke.param = function (e, t) {
            var n,
              r = [],
              o = function (e, t) {
                var n = be(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + '=' + encodeURIComponent(null == n ? '' : n);
              };
            if (null == e) return '';
            if (Array.isArray(e) || (e.jquery && !ke.isPlainObject(e)))
              ke.each(e, function () {
                o(this.name, this.value);
              });
            else for (n in e) te(n, e[n], t, o);
            return r.join('&');
          }),
            ke.fn.extend({
              serialize: function () {
                return ke.param(this.serializeArray());
              },
              serializeArray: function () {
                return this.map(function () {
                  var e = ke.prop(this, 'elements');
                  return e ? ke.makeArray(e) : this;
                })
                  .filter(function () {
                    var e = this.type;
                    return (
                      this.name &&
                      !ke(this).is(':disabled') &&
                      _t.test(this.nodeName) &&
                      !Mt.test(e) &&
                      (this.checked || !et.test(e))
                    );
                  })
                  .map(function (e, t) {
                    var n = ke(this).val();
                    return null == n
                      ? null
                      : Array.isArray(n)
                      ? ke.map(n, function (e) {
                          return { name: t.name, value: e.replace(It, '\r\n') };
                        })
                      : { name: t.name, value: n.replace(It, '\r\n') };
                  })
                  .get();
              },
            });
          var $t = /%20/g,
            Ft = /#.*$/,
            Bt = /([?&])_=[^&]*/,
            Wt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Ut = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            zt = /^(?:GET|HEAD)$/,
            Xt = /^\/\//,
            Kt = {},
            Vt = {},
            Gt = '*/'.concat('*'),
            Yt = we.createElement('a');
          (Yt.href = Lt.href),
            ke.extend({
              active: 0,
              lastModified: {},
              etag: {},
              ajaxSettings: {
                url: Lt.href,
                type: 'GET',
                isLocal: Ut.test(Lt.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                accepts: {
                  '*': Gt,
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
                  'text xml': ke.parseXML,
                },
                flatOptions: { url: !0, context: !0 },
              },
              ajaxSetup: function (e, t) {
                return t ? oe(oe(e, ke.ajaxSettings), t) : oe(ke.ajaxSettings, e);
              },
              ajaxPrefilter: ne(Kt),
              ajaxTransport: ne(Vt),
              ajax: function (t, n) {
                function r(t, n, r, s) {
                  var l,
                    p,
                    d,
                    x,
                    w,
                    C = n;
                  c ||
                    ((c = !0),
                    u && e.clearTimeout(u),
                    (o = void 0),
                    (a = s || ''),
                    (T.readyState = t > 0 ? 4 : 0),
                    (l = (t >= 200 && t < 300) || 304 === t),
                    r && (x = ie(h, T, r)),
                    !l &&
                      ke.inArray('script', h.dataTypes) > -1 &&
                      (h.converters['text script'] = function () {}),
                    (x = ae(h, x, T, l)),
                    l
                      ? (h.ifModified &&
                          ((w = T.getResponseHeader('Last-Modified')),
                          w && (ke.lastModified[i] = w),
                          (w = T.getResponseHeader('etag')),
                          w && (ke.etag[i] = w)),
                        204 === t || 'HEAD' === h.type
                          ? (C = 'nocontent')
                          : 304 === t
                          ? (C = 'notmodified')
                          : ((C = x.state), (p = x.data), (d = x.error), (l = !d)))
                      : ((d = C), (!t && C) || ((C = 'error'), t < 0 && (t = 0))),
                    (T.status = t),
                    (T.statusText = (n || C) + ''),
                    l ? m.resolveWith(g, [p, C, T]) : m.rejectWith(g, [T, C, d]),
                    T.statusCode(b),
                    (b = void 0),
                    f && v.trigger(l ? 'ajaxSuccess' : 'ajaxError', [T, h, l ? p : d]),
                    y.fireWith(g, [T, C]),
                    f &&
                      (v.trigger('ajaxComplete', [T, h]),
                      --ke.active || ke.event.trigger('ajaxStop')));
                }
                'object' == typeof t && ((n = t), (t = void 0)), (n = n || {});
                var o,
                  i,
                  a,
                  s,
                  u,
                  l,
                  c,
                  f,
                  p,
                  d,
                  h = ke.ajaxSetup({}, n),
                  g = h.context || h,
                  v = h.context && (g.nodeType || g.jquery) ? ke(g) : ke.event,
                  m = ke.Deferred(),
                  y = ke.Callbacks('once memory'),
                  b = h.statusCode || {},
                  x = {},
                  w = {},
                  C = 'canceled',
                  T = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                      var t;
                      if (c) {
                        if (!s)
                          for (s = {}; (t = Wt.exec(a)); )
                            s[t[1].toLowerCase() + ' '] = (
                              s[t[1].toLowerCase() + ' '] || []
                            ).concat(t[2]);
                        t = s[e.toLowerCase() + ' '];
                      }
                      return null == t ? null : t.join(', ');
                    },
                    getAllResponseHeaders: function () {
                      return c ? a : null;
                    },
                    setRequestHeader: function (e, t) {
                      return (
                        null == c &&
                          ((e = w[e.toLowerCase()] = w[e.toLowerCase()] || e), (x[e] = t)),
                        this
                      );
                    },
                    overrideMimeType: function (e) {
                      return null == c && (h.mimeType = e), this;
                    },
                    statusCode: function (e) {
                      var t;
                      if (e)
                        if (c) T.always(e[T.status]);
                        else for (t in e) b[t] = [b[t], e[t]];
                      return this;
                    },
                    abort: function (e) {
                      var t = e || C;
                      return o && o.abort(t), r(0, t), this;
                    },
                  };
                if (
                  (m.promise(T),
                  (h.url = ((t || h.url || Lt.href) + '').replace(Xt, Lt.protocol + '//')),
                  (h.type = n.method || n.type || h.method || h.type),
                  (h.dataTypes = (h.dataType || '*').toLowerCase().match(Pe) || ['']),
                  null == h.crossDomain)
                ) {
                  l = we.createElement('a');
                  try {
                    (l.href = h.url),
                      (l.href = l.href),
                      (h.crossDomain = Yt.protocol + '//' + Yt.host != l.protocol + '//' + l.host);
                  } catch (e) {
                    h.crossDomain = !0;
                  }
                }
                if (
                  (h.data &&
                    h.processData &&
                    'string' != typeof h.data &&
                    (h.data = ke.param(h.data, h.traditional)),
                  re(Kt, h, n, T),
                  c)
                )
                  return T;
                (f = ke.event && h.global),
                  f && 0 === ke.active++ && ke.event.trigger('ajaxStart'),
                  (h.type = h.type.toUpperCase()),
                  (h.hasContent = !zt.test(h.type)),
                  (i = h.url.replace(Ft, '')),
                  h.hasContent
                    ? h.data &&
                      h.processData &&
                      0 === (h.contentType || '').indexOf('application/x-www-form-urlencoded') &&
                      (h.data = h.data.replace($t, '+'))
                    : ((d = h.url.slice(i.length)),
                      h.data &&
                        (h.processData || 'string' == typeof h.data) &&
                        ((i += (Pt.test(i) ? '&' : '?') + h.data), delete h.data),
                      h.cache === !1 &&
                        ((i = i.replace(Bt, '$1')),
                        (d = (Pt.test(i) ? '&' : '?') + '_=' + Ht.guid++ + d)),
                      (h.url = i + d)),
                  h.ifModified &&
                    (ke.lastModified[i] &&
                      T.setRequestHeader('If-Modified-Since', ke.lastModified[i]),
                    ke.etag[i] && T.setRequestHeader('If-None-Match', ke.etag[i])),
                  ((h.data && h.hasContent && h.contentType !== !1) || n.contentType) &&
                    T.setRequestHeader('Content-Type', h.contentType),
                  T.setRequestHeader(
                    'Accept',
                    h.dataTypes[0] && h.accepts[h.dataTypes[0]]
                      ? h.accepts[h.dataTypes[0]] +
                          ('*' !== h.dataTypes[0] ? ', ' + Gt + '; q=0.01' : '')
                      : h.accepts['*'],
                  );
                for (p in h.headers) T.setRequestHeader(p, h.headers[p]);
                if (h.beforeSend && (h.beforeSend.call(g, T, h) === !1 || c)) return T.abort();
                if (
                  ((C = 'abort'),
                  y.add(h.complete),
                  T.done(h.success),
                  T.fail(h.error),
                  (o = re(Vt, h, n, T)))
                ) {
                  if (((T.readyState = 1), f && v.trigger('ajaxSend', [T, h]), c)) return T;
                  h.async &&
                    h.timeout > 0 &&
                    (u = e.setTimeout(function () {
                      T.abort('timeout');
                    }, h.timeout));
                  try {
                    (c = !1), o.send(x, r);
                  } catch (e) {
                    if (c) throw e;
                    r(-1, e);
                  }
                } else r(-1, 'No Transport');
                return T;
              },
              getJSON: function (e, t, n) {
                return ke.get(e, t, n, 'json');
              },
              getScript: function (e, t) {
                return ke.get(e, void 0, t, 'script');
              },
            }),
            ke.each(['get', 'post'], function (e, t) {
              ke[t] = function (e, n, r, o) {
                return (
                  be(n) && ((o = o || r), (r = n), (n = void 0)),
                  ke.ajax(
                    ke.extend(
                      { url: e, type: t, dataType: o, data: n, success: r },
                      ke.isPlainObject(e) && e,
                    ),
                  )
                );
              };
            }),
            ke.ajaxPrefilter(function (e) {
              var t;
              for (t in e.headers)
                'content-type' === t.toLowerCase() && (e.contentType = e.headers[t] || '');
            }),
            (ke._evalUrl = function (e, t, n) {
              return ke.ajax({
                url: e,
                type: 'GET',
                dataType: 'script',
                cache: !0,
                async: !1,
                global: !1,
                converters: { 'text script': function () {} },
                dataFilter: function (e) {
                  ke.globalEval(e, t, n);
                },
              });
            }),
            ke.fn.extend({
              wrapAll: function (e) {
                var t;
                return (
                  this[0] &&
                    (be(e) && (e = e.call(this[0])),
                    (t = ke(e, this[0].ownerDocument).eq(0).clone(!0)),
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
                      ke(this).wrapInner(e.call(this, t));
                    })
                  : this.each(function () {
                      var t = ke(this),
                        n = t.contents();
                      n.length ? n.wrapAll(e) : t.append(e);
                    });
              },
              wrap: function (e) {
                var t = be(e);
                return this.each(function (n) {
                  ke(this).wrapAll(t ? e.call(this, n) : e);
                });
              },
              unwrap: function (e) {
                return (
                  this.parent(e)
                    .not('body')
                    .each(function () {
                      ke(this).replaceWith(this.childNodes);
                    }),
                  this
                );
              },
            }),
            (ke.expr.pseudos.hidden = function (e) {
              return !ke.expr.pseudos.visible(e);
            }),
            (ke.expr.pseudos.visible = function (e) {
              return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
            }),
            (ke.ajaxSettings.xhr = function () {
              try {
                return new e.XMLHttpRequest();
              } catch (e) {}
            });
          var Qt = { 0: 200, 1223: 204 },
            Jt = ke.ajaxSettings.xhr();
          (ye.cors = !!Jt && 'withCredentials' in Jt),
            (ye.ajax = Jt = !!Jt),
            ke.ajaxTransport(function (t) {
              var n, r;
              if (ye.cors || (Jt && !t.crossDomain))
                return {
                  send: function (o, i) {
                    var a,
                      s = t.xhr();
                    if ((s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields))
                      for (a in t.xhrFields) s[a] = t.xhrFields[a];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType),
                      t.crossDomain ||
                        o['X-Requested-With'] ||
                        (o['X-Requested-With'] = 'XMLHttpRequest');
                    for (a in o) s.setRequestHeader(a, o[a]);
                    (n = function (e) {
                      return function () {
                        n &&
                          ((n =
                            r =
                            s.onload =
                            s.onerror =
                            s.onabort =
                            s.ontimeout =
                            s.onreadystatechange =
                              null),
                          'abort' === e
                            ? s.abort()
                            : 'error' === e
                            ? 'number' != typeof s.status
                              ? i(0, 'error')
                              : i(s.status, s.statusText)
                            : i(
                                Qt[s.status] || s.status,
                                s.statusText,
                                'text' !== (s.responseType || 'text') ||
                                  'string' != typeof s.responseText
                                  ? { binary: s.response }
                                  : { text: s.responseText },
                                s.getAllResponseHeaders(),
                              ));
                      };
                    }),
                      (s.onload = n()),
                      (r = s.onerror = s.ontimeout = n('error')),
                      void 0 !== s.onabort
                        ? (s.onabort = r)
                        : (s.onreadystatechange = function () {
                            4 === s.readyState &&
                              e.setTimeout(function () {
                                n && r();
                              });
                          }),
                      (n = n('abort'));
                    try {
                      s.send((t.hasContent && t.data) || null);
                    } catch (e) {
                      if (n) throw e;
                    }
                  },
                  abort: function () {
                    n && n();
                  },
                };
            }),
            ke.ajaxPrefilter(function (e) {
              e.crossDomain && (e.contents.script = !1);
            }),
            ke.ajaxSetup({
              accepts: {
                script:
                  'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
              },
              contents: { script: /\b(?:java|ecma)script\b/ },
              converters: {
                'text script': function (e) {
                  return ke.globalEval(e), e;
                },
              },
            }),
            ke.ajaxPrefilter('script', function (e) {
              void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = 'GET');
            }),
            ke.ajaxTransport('script', function (e) {
              if (e.crossDomain || e.scriptAttrs) {
                var t, n;
                return {
                  send: function (r, o) {
                    (t = ke('<script>')
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
          ke.ajaxSetup({
            jsonp: 'callback',
            jsonpCallback: function () {
              var e = Zt.pop() || ke.expando + '_' + Ht.guid++;
              return (this[e] = !0), e;
            },
          }),
            ke.ajaxPrefilter('json jsonp', function (t, n, r) {
              var o,
                i,
                a,
                s =
                  t.jsonp !== !1 &&
                  (en.test(t.url)
                    ? 'url'
                    : 'string' == typeof t.data &&
                      0 === (t.contentType || '').indexOf('application/x-www-form-urlencoded') &&
                      en.test(t.data) &&
                      'data');
              if (s || 'jsonp' === t.dataTypes[0])
                return (
                  (o = t.jsonpCallback = be(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                  s
                    ? (t[s] = t[s].replace(en, '$1' + o))
                    : t.jsonp !== !1 && (t.url += (Pt.test(t.url) ? '&' : '?') + t.jsonp + '=' + o),
                  (t.converters['script json'] = function () {
                    return a || ke.error(o + ' was not called'), a[0];
                  }),
                  (t.dataTypes[0] = 'json'),
                  (i = e[o]),
                  (e[o] = function () {
                    a = arguments;
                  }),
                  r.always(function () {
                    void 0 === i ? ke(e).removeProp(o) : (e[o] = i),
                      t[o] && ((t.jsonpCallback = n.jsonpCallback), Zt.push(o)),
                      a && be(i) && i(a[0]),
                      (a = i = void 0);
                  }),
                  'script'
                );
            }),
            (ye.createHTMLDocument = (function () {
              var e = we.implementation.createHTMLDocument('').body;
              return (e.innerHTML = '<form></form><form></form>'), 2 === e.childNodes.length;
            })()),
            (ke.parseHTML = function (e, t, n) {
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
                  : ((o = T([e], t, i)),
                    i && i.length && ke(i).remove(),
                    ke.merge([], o.childNodes))
              );
            }),
            (ke.fn.load = function (e, t, n) {
              var r,
                o,
                i,
                a = this,
                s = e.indexOf(' ');
              return (
                s > -1 && ((r = J(e.slice(s))), (e = e.slice(0, s))),
                be(t) ? ((n = t), (t = void 0)) : t && 'object' == typeof t && (o = 'POST'),
                a.length > 0 &&
                  ke
                    .ajax({ url: e, type: o || 'GET', dataType: 'html', data: t })
                    .done(function (e) {
                      (i = arguments), a.html(r ? ke('<div>').append(ke.parseHTML(e)).find(r) : e);
                    })
                    .always(
                      n &&
                        function (e, t) {
                          a.each(function () {
                            n.apply(this, i || [e.responseText, t, e]);
                          });
                        },
                    ),
                this
              );
            }),
            (ke.expr.pseudos.animated = function (e) {
              return ke.grep(ke.timers, function (t) {
                return e === t.elem;
              }).length;
            }),
            (ke.offset = {
              setOffset: function (e, t, n) {
                var r,
                  o,
                  i,
                  a,
                  s,
                  u,
                  l,
                  c = ke.css(e, 'position'),
                  f = ke(e),
                  p = {};
                'static' === c && (e.style.position = 'relative'),
                  (s = f.offset()),
                  (i = ke.css(e, 'top')),
                  (u = ke.css(e, 'left')),
                  (l = ('absolute' === c || 'fixed' === c) && (i + u).indexOf('auto') > -1),
                  l
                    ? ((r = f.position()), (a = r.top), (o = r.left))
                    : ((a = parseFloat(i) || 0), (o = parseFloat(u) || 0)),
                  be(t) && (t = t.call(e, n, ke.extend({}, s))),
                  null != t.top && (p.top = t.top - s.top + a),
                  null != t.left && (p.left = t.left - s.left + o),
                  'using' in t
                    ? t.using.call(e, p)
                    : ('number' == typeof p.top && (p.top += 'px'),
                      'number' == typeof p.left && (p.left += 'px'),
                      f.css(p));
              },
            }),
            ke.fn.extend({
              offset: function (e) {
                if (arguments.length)
                  return void 0 === e
                    ? this
                    : this.each(function (t) {
                        ke.offset.setOffset(this, e, t);
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
                  if ('fixed' === ke.css(r, 'position')) t = r.getBoundingClientRect();
                  else {
                    for (
                      t = this.offset(),
                        n = r.ownerDocument,
                        e = r.offsetParent || n.documentElement;
                      e &&
                      (e === n.body || e === n.documentElement) &&
                      'static' === ke.css(e, 'position');

                    )
                      e = e.parentNode;
                    e &&
                      e !== r &&
                      1 === e.nodeType &&
                      ((o = ke(e).offset()),
                      (o.top += ke.css(e, 'borderTopWidth', !0)),
                      (o.left += ke.css(e, 'borderLeftWidth', !0)));
                  }
                  return {
                    top: t.top - o.top - ke.css(r, 'marginTop', !0),
                    left: t.left - o.left - ke.css(r, 'marginLeft', !0),
                  };
                }
              },
              offsetParent: function () {
                return this.map(function () {
                  for (var e = this.offsetParent; e && 'static' === ke.css(e, 'position'); )
                    e = e.offsetParent;
                  return e || Ge;
                });
              },
            }),
            ke.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function (e, t) {
              var n = 'pageYOffset' === t;
              ke.fn[e] = function (r) {
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
            ke.each(['top', 'left'], function (e, t) {
              ke.cssHooks[t] = M(ye.pixelPosition, function (e, n) {
                if (n) return (n = I(e, t)), ft.test(n) ? ke(e).position()[t] + 'px' : n;
              });
            }),
            ke.each({ Height: 'height', Width: 'width' }, function (e, t) {
              ke.each({ padding: 'inner' + e, content: t, '': 'outer' + e }, function (n, r) {
                ke.fn[r] = function (o, i) {
                  var a = arguments.length && (n || 'boolean' != typeof o),
                    s = n || (o === !0 || i === !0 ? 'margin' : 'border');
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
                        ? ke.css(t, n, s)
                        : ke.style(t, n, o, s);
                    },
                    t,
                    a ? o : void 0,
                    a,
                  );
                };
              });
            }),
            ke.each(
              ['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'],
              function (e, t) {
                ke.fn[t] = function (e) {
                  return this.on(t, e);
                };
              },
            ),
            ke.fn.extend({
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
            ke.each(
              'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
                ' ',
              ),
              function (e, t) {
                ke.fn[t] = function (e, n) {
                  return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
                };
              },
            );
          var tn = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
          (ke.proxy = function (e, t) {
            var n, r, o;
            if (('string' == typeof t && ((n = e[t]), (t = e), (e = n)), be(e)))
              return (
                (r = le.call(arguments, 2)),
                (o = function () {
                  return e.apply(t || this, r.concat(le.call(arguments)));
                }),
                (o.guid = e.guid = e.guid || ke.guid++),
                o
              );
          }),
            (ke.holdReady = function (e) {
              e ? ke.readyWait++ : ke.ready(!0);
            }),
            (ke.isArray = Array.isArray),
            (ke.parseJSON = JSON.parse),
            (ke.nodeName = i),
            (ke.isFunction = be),
            (ke.isWindow = xe),
            (ke.camelCase = h),
            (ke.type = r),
            (ke.now = Date.now),
            (ke.isNumeric = function (e) {
              var t = ke.type(e);
              return ('number' === t || 'string' === t) && !isNaN(e - parseFloat(e));
            }),
            (ke.trim = function (e) {
              return null == e ? '' : (e + '').replace(tn, '');
            }),
            'function' == typeof define &&
              define.amd &&
              define('jquery', [], function () {
                return ke;
              });
          var nn = e.jQuery,
            rn = e.$;
          return (
            (ke.noConflict = function (t) {
              return e.$ === ke && (e.$ = rn), t && e.jQuery === ke && (e.jQuery = nn), ke;
            }),
            'undefined' == typeof t && (e.jQuery = e.$ = ke),
            ke
          );
        });
      },
      {},
    ],
    3: [
      function (e, t, n) {
        !(function (e, n, r) {
          function o(e, t, n) {
            return e.addEventListener
              ? void e.addEventListener(t, n, !1)
              : void e.attachEvent('on' + t, n);
          }
          function i(e) {
            if ('keypress' == e.type) {
              var t = String.fromCharCode(e.which);
              return e.shiftKey || (t = t.toLowerCase()), t;
            }
            return y[e.which]
              ? y[e.which]
              : b[e.which]
              ? b[e.which]
              : String.fromCharCode(e.which).toLowerCase();
          }
          function a(e, t) {
            return e.sort().join(',') === t.sort().join(',');
          }
          function s(e) {
            var t = [];
            return (
              e.shiftKey && t.push('shift'),
              e.altKey && t.push('alt'),
              e.ctrlKey && t.push('ctrl'),
              e.metaKey && t.push('meta'),
              t
            );
          }
          function u(e) {
            return e.preventDefault ? void e.preventDefault() : void (e.returnValue = !1);
          }
          function l(e) {
            return e.stopPropagation ? void e.stopPropagation() : void (e.cancelBubble = !0);
          }
          function c(e) {
            return 'shift' == e || 'ctrl' == e || 'alt' == e || 'meta' == e;
          }
          function f() {
            if (!m) {
              m = {};
              for (var e in y) (e > 95 && e < 112) || (y.hasOwnProperty(e) && (m[y[e]] = e));
            }
            return m;
          }
          function p(e, t, n) {
            return (
              n || (n = f()[e] ? 'keydown' : 'keypress'),
              'keypress' == n && t.length && (n = 'keydown'),
              n
            );
          }
          function d(e) {
            return '+' === e ? ['+'] : ((e = e.replace(/\+{2}/g, '+plus')), e.split('+'));
          }
          function h(e, t) {
            var n,
              r,
              o,
              i = [];
            for (n = d(e), o = 0; o < n.length; ++o)
              (r = n[o]),
                w[r] && (r = w[r]),
                t && 'keypress' != t && x[r] && ((r = x[r]), i.push('shift')),
                c(r) && i.push(r);
            return (t = p(r, i, t)), { key: r, modifiers: i, action: t };
          }
          function g(e, t) {
            return null !== e && e !== n && (e === t || g(e.parentNode, t));
          }
          function v(e) {
            function t(e) {
              e = e || {};
              var t,
                n = !1;
              for (t in x) e[t] ? (n = !0) : (x[t] = 0);
              n || (T = !1);
            }
            function r(e, t, n, r, o, i) {
              var s,
                u,
                l = [],
                f = n.type;
              if (!y._callbacks[e]) return [];
              for ('keyup' == f && c(e) && (t = [e]), s = 0; s < y._callbacks[e].length; ++s)
                if (
                  ((u = y._callbacks[e][s]),
                  (r || !u.seq || x[u.seq] == u.level) &&
                    f == u.action &&
                    (('keypress' == f && !n.metaKey && !n.ctrlKey) || a(t, u.modifiers)))
                ) {
                  var p = !r && u.combo == o,
                    d = r && u.seq == r && u.level == i;
                  (p || d) && y._callbacks[e].splice(s, 1), l.push(u);
                }
              return l;
            }
            function f(e, t, n, r) {
              y.stopCallback(t, t.target || t.srcElement, n, r) || (e(t, n) === !1 && (u(t), l(t)));
            }
            function p(e) {
              'number' != typeof e.which && (e.which = e.keyCode);
              var t = i(e);
              if (t)
                return 'keyup' == e.type && w === t ? void (w = !1) : void y.handleKey(t, s(e), e);
            }
            function d() {
              clearTimeout(b), (b = setTimeout(t, 1e3));
            }
            function g(e, n, r, o) {
              function a(t) {
                return function () {
                  (T = t), ++x[e], d();
                };
              }
              function s(n) {
                f(r, n, e), 'keyup' !== o && (w = i(n)), setTimeout(t, 10);
              }
              x[e] = 0;
              for (var u = 0; u < n.length; ++u) {
                var l = u + 1 === n.length,
                  c = l ? s : a(o || h(n[u + 1]).action);
                m(n[u], c, o, e, u);
              }
            }
            function m(e, t, n, o, i) {
              (y._directMap[e + ':' + n] = t), (e = e.replace(/\s+/g, ' '));
              var a,
                s = e.split(' ');
              return s.length > 1
                ? void g(e, s, t, n)
                : ((a = h(e, n)),
                  (y._callbacks[a.key] = y._callbacks[a.key] || []),
                  r(
                    a.key,
                    a.modifiers,
                    {
                      type: a.action,
                    },
                    o,
                    e,
                    i,
                  ),
                  void y._callbacks[a.key][o ? 'unshift' : 'push']({
                    callback: t,
                    modifiers: a.modifiers,
                    action: a.action,
                    seq: o,
                    level: i,
                    combo: e,
                  }));
            }
            var y = this;
            if (((e = e || n), !(y instanceof v))) return new v(e);
            (y.target = e), (y._callbacks = {}), (y._directMap = {});
            var b,
              x = {},
              w = !1,
              C = !1,
              T = !1;
            (y._handleKey = function (e, n, o) {
              var i,
                a = r(e, n, o),
                s = {},
                u = 0,
                l = !1;
              for (i = 0; i < a.length; ++i) a[i].seq && (u = Math.max(u, a[i].level));
              for (i = 0; i < a.length; ++i)
                if (a[i].seq) {
                  if (a[i].level != u) continue;
                  (l = !0), (s[a[i].seq] = 1), f(a[i].callback, o, a[i].combo, a[i].seq);
                } else l || f(a[i].callback, o, a[i].combo);
              var p = 'keypress' == o.type && C;
              o.type != T || c(e) || p || t(s), (C = l && 'keydown' == o.type);
            }),
              (y._bindMultiple = function (e, t, n) {
                for (var r = 0; r < e.length; ++r) m(e[r], t, n);
              }),
              o(e, 'keypress', p),
              o(e, 'keydown', p),
              o(e, 'keyup', p);
          }
          if (e) {
            for (
              var m,
                y = {
                  8: 'backspace',
                  9: 'tab',
                  13: 'enter',
                  16: 'shift',
                  17: 'ctrl',
                  18: 'alt',
                  20: 'capslock',
                  27: 'esc',
                  32: 'space',
                  33: 'pageup',
                  34: 'pagedown',
                  35: 'end',
                  36: 'home',
                  37: 'left',
                  38: 'up',
                  39: 'right',
                  40: 'down',
                  45: 'ins',
                  46: 'del',
                  91: 'meta',
                  93: 'meta',
                  224: 'meta',
                },
                b = {
                  106: '*',
                  107: '+',
                  109: '-',
                  110: '.',
                  111: '/',
                  186: ';',
                  187: '=',
                  188: ',',
                  189: '-',
                  190: '.',
                  191: '/',
                  192: '`',
                  219: '[',
                  220: '\\',
                  221: ']',
                  222: "'",
                },
                x = {
                  '~': '`',
                  '!': '1',
                  '@': '2',
                  '#': '3',
                  $: '4',
                  '%': '5',
                  '^': '6',
                  '&': '7',
                  '*': '8',
                  '(': '9',
                  ')': '0',
                  _: '-',
                  '+': '=',
                  ':': ';',
                  '"': "'",
                  '<': ',',
                  '>': '.',
                  '?': '/',
                  '|': '\\',
                },
                w = {
                  option: 'alt',
                  command: 'meta',
                  return: 'enter',
                  escape: 'esc',
                  plus: '+',
                  mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl',
                },
                C = 1;
              C < 20;
              ++C
            )
              y[111 + C] = 'f' + C;
            for (C = 0; C <= 9; ++C) y[C + 96] = C;
            (v.prototype.bind = function (e, t, n) {
              var r = this;
              return (e = e instanceof Array ? e : [e]), r._bindMultiple.call(r, e, t, n), r;
            }),
              (v.prototype.unbind = function (e, t) {
                var n = this;
                return n.bind.call(n, e, function () {}, t);
              }),
              (v.prototype.trigger = function (e, t) {
                var n = this;
                return n._directMap[e + ':' + t] && n._directMap[e + ':' + t]({}, e), n;
              }),
              (v.prototype.reset = function () {
                var e = this;
                return (e._callbacks = {}), (e._directMap = {}), e;
              }),
              (v.prototype.stopCallback = function (e, t) {
                var n = this;
                return (
                  !((' ' + t.className + ' ').indexOf(' mousetrap ') > -1) &&
                  !g(t, n.target) &&
                  ('INPUT' == t.tagName ||
                    'SELECT' == t.tagName ||
                    'TEXTAREA' == t.tagName ||
                    t.isContentEditable)
                );
              }),
              (v.prototype.handleKey = function () {
                var e = this;
                return e._handleKey.apply(e, arguments);
              }),
              (v.addKeycodes = function (e) {
                for (var t in e) e.hasOwnProperty(t) && (y[t] = e[t]);
                m = null;
              }),
              (v.init = function () {
                var e = v(n);
                for (var t in e)
                  '_' !== t.charAt(0) &&
                    (v[t] = (function (t) {
                      return function () {
                        return e[t].apply(e, arguments);
                      };
                    })(t));
              }),
              v.init(),
              (e.Mousetrap = v),
              'undefined' != typeof t && t.exports && (t.exports = v),
              'function' == typeof define &&
                define.amd &&
                define(function () {
                  return v;
                });
          }
        })(
          'undefined' != typeof window ? window : null,
          'undefined' != typeof window ? document : null,
        );
      },
      {},
    ],
    4: [
      function (e, t, n) {
        'use strict';
        function r(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }
        t.exports = function (e, t, n, i) {
          (t = t || '&'), (n = n || '=');
          var a = {};
          if ('string' != typeof e || 0 === e.length) return a;
          var s = /\+/g;
          e = e.split(t);
          var u = 1e3;
          i && 'number' == typeof i.maxKeys && (u = i.maxKeys);
          var l = e.length;
          u > 0 && l > u && (l = u);
          for (var c = 0; c < l; ++c) {
            var f,
              p,
              d,
              h,
              g = e[c].replace(s, '%20'),
              v = g.indexOf(n);
            v >= 0 ? ((f = g.substr(0, v)), (p = g.substr(v + 1))) : ((f = g), (p = '')),
              (d = decodeURIComponent(f)),
              (h = decodeURIComponent(p)),
              r(a, d) ? (o(a[d]) ? a[d].push(h) : (a[d] = [a[d], h])) : (a[d] = h);
          }
          return a;
        };
        var o =
          Array.isArray ||
          function (e) {
            return '[object Array]' === Object.prototype.toString.call(e);
          };
      },
      {},
    ],
    5: [
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
        t.exports = function (e, t, n, s) {
          return (
            (t = t || '&'),
            (n = n || '='),
            null === e && (e = void 0),
            'object' == typeof e
              ? r(a(e), function (a) {
                  var s = encodeURIComponent(o(a)) + n;
                  return i(e[a])
                    ? r(e[a], function (e) {
                        return s + encodeURIComponent(o(e));
                      }).join(t)
                    : s + encodeURIComponent(o(e[a]));
                }).join(t)
              : s
              ? encodeURIComponent(o(s)) + n + encodeURIComponent(o(e))
              : ''
          );
        };
        var i =
            Array.isArray ||
            function (e) {
              return '[object Array]' === Object.prototype.toString.call(e);
            },
          a =
            Object.keys ||
            function (e) {
              var t = [];
              for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
              return t;
            };
      },
      {},
    ],
    6: [
      function (e, t, n) {
        'use strict';
        (n.decode = n.parse = e('./decode')), (n.encode = n.stringify = e('./encode'));
      },
      { './decode': 4, './encode': 5 },
    ],
    7: [
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
        function a(e, t) {
          return o(e, !1, !0).resolve(t);
        }
        function s(e, t) {
          return e ? o(e, !1, !0).resolveObject(t) : t;
        }
        var u = e('punycode'),
          l = e('./util');
        (n.parse = o), (n.resolve = a), (n.resolveObject = s), (n.format = i), (n.Url = r);
        var c = /^([a-z0-9.+-]+:)/i,
          f = /:[0-9]*$/,
          p = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
          d = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
          h = ['{', '}', '|', '\\', '^', '`'].concat(d),
          g = ["'"].concat(h),
          v = ['%', '/', '?', ';', '#'].concat(g),
          m = ['/', '?', '#'],
          y = 255,
          b = /^[+a-z0-9A-Z_-]{0,63}$/,
          x = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          w = { javascript: !0, 'javascript:': !0 },
          C = { javascript: !0, 'javascript:': !0 },
          T = {
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
          k = e('querystring');
        (r.prototype.parse = function (e, t, n) {
          if (!l.isString(e))
            throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
          var r = e.indexOf('?'),
            o = r !== -1 && r < e.indexOf('#') ? '?' : '#',
            i = e.split(o),
            a = /\\/g;
          (i[0] = i[0].replace(a, '/')), (e = i.join(o));
          var s = e;
          if (((s = s.trim()), !n && 1 === e.split('#').length)) {
            var f = p.exec(s);
            if (f)
              return (
                (this.path = s),
                (this.href = s),
                (this.pathname = f[1]),
                f[2]
                  ? ((this.search = f[2]),
                    t
                      ? (this.query = k.parse(this.search.substr(1)))
                      : (this.query = this.search.substr(1)))
                  : t && ((this.search = ''), (this.query = {})),
                this
              );
          }
          var d = c.exec(s);
          if (d) {
            d = d[0];
            var h = d.toLowerCase();
            (this.protocol = h), (s = s.substr(d.length));
          }
          if (n || d || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var j = '//' === s.substr(0, 2);
            !j || (d && C[d]) || ((s = s.substr(2)), (this.slashes = !0));
          }
          if (!C[d] && (j || (d && !T[d]))) {
            for (var E = -1, S = 0; S < m.length; S++) {
              var A = s.indexOf(m[S]);
              A !== -1 && (E === -1 || A < E) && (E = A);
            }
            var N, q;
            (q = E === -1 ? s.lastIndexOf('@') : s.lastIndexOf('@', E)),
              q !== -1 &&
                ((N = s.slice(0, q)), (s = s.slice(q + 1)), (this.auth = decodeURIComponent(N))),
              (E = -1);
            for (var S = 0; S < v.length; S++) {
              var A = s.indexOf(v[S]);
              A !== -1 && (E === -1 || A < E) && (E = A);
            }
            E === -1 && (E = s.length),
              (this.host = s.slice(0, E)),
              (s = s.slice(E)),
              this.parseHost(),
              (this.hostname = this.hostname || '');
            var D = '[' === this.hostname[0] && ']' === this.hostname[this.hostname.length - 1];
            if (!D)
              for (var O = this.hostname.split(/\./), S = 0, L = O.length; S < L; S++) {
                var H = O[S];
                if (H && !H.match(b)) {
                  for (var P = '', R = 0, I = H.length; R < I; R++)
                    P += H.charCodeAt(R) > 127 ? 'x' : H[R];
                  if (!P.match(b)) {
                    var M = O.slice(0, S),
                      _ = O.slice(S + 1),
                      $ = H.match(x);
                    $ && (M.push($[1]), _.unshift($[2])),
                      _.length && (s = '/' + _.join('.') + s),
                      (this.hostname = M.join('.'));
                    break;
                  }
                }
              }
            this.hostname.length > y
              ? (this.hostname = '')
              : (this.hostname = this.hostname.toLowerCase()),
              D || (this.hostname = u.toASCII(this.hostname));
            var F = this.port ? ':' + this.port : '',
              B = this.hostname || '';
            (this.host = B + F),
              (this.href += this.host),
              D &&
                ((this.hostname = this.hostname.substr(1, this.hostname.length - 2)),
                '/' !== s[0] && (s = '/' + s));
          }
          if (!w[h])
            for (var S = 0, L = g.length; S < L; S++) {
              var W = g[S];
              if (s.indexOf(W) !== -1) {
                var U = encodeURIComponent(W);
                U === W && (U = escape(W)), (s = s.split(W).join(U));
              }
            }
          var z = s.indexOf('#');
          z !== -1 && ((this.hash = s.substr(z)), (s = s.slice(0, z)));
          var X = s.indexOf('?');
          if (
            (X !== -1
              ? ((this.search = s.substr(X)),
                (this.query = s.substr(X + 1)),
                t && (this.query = k.parse(this.query)),
                (s = s.slice(0, X)))
              : t && ((this.search = ''), (this.query = {})),
            s && (this.pathname = s),
            T[h] && this.hostname && !this.pathname && (this.pathname = '/'),
            this.pathname || this.search)
          ) {
            var F = this.pathname || '',
              K = this.search || '';
            this.path = F + K;
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
                (i = k.stringify(this.query));
            var a = this.search || (i && '?' + i) || '';
            return (
              t && ':' !== t.substr(-1) && (t += ':'),
              this.slashes || ((!t || T[t]) && o !== !1)
                ? ((o = '//' + (o || '')), n && '/' !== n.charAt(0) && (n = '/' + n))
                : o || (o = ''),
              r && '#' !== r.charAt(0) && (r = '#' + r),
              a && '?' !== a.charAt(0) && (a = '?' + a),
              (n = n.replace(/[?#]/g, function (e) {
                return encodeURIComponent(e);
              })),
              (a = a.replace('#', '%23')),
              t + o + n + a + r
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
              var a = o[i];
              n[a] = this[a];
            }
            if (((n.hash = e.hash), '' === e.href)) return (n.href = n.format()), n;
            if (e.slashes && !e.protocol) {
              for (var s = Object.keys(e), u = 0; u < s.length; u++) {
                var c = s[u];
                'protocol' !== c && (n[c] = e[c]);
              }
              return (
                T[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = '/'),
                (n.href = n.format()),
                n
              );
            }
            if (e.protocol && e.protocol !== n.protocol) {
              if (!T[e.protocol]) {
                for (var f = Object.keys(e), p = 0; p < f.length; p++) {
                  var d = f[p];
                  n[d] = e[d];
                }
                return (n.href = n.format()), n;
              }
              if (((n.protocol = e.protocol), e.host || C[e.protocol])) n.pathname = e.pathname;
              else {
                for (var h = (e.pathname || '').split('/'); h.length && !(e.host = h.shift()); );
                e.host || (e.host = ''),
                  e.hostname || (e.hostname = ''),
                  '' !== h[0] && h.unshift(''),
                  h.length < 2 && h.unshift(''),
                  (n.pathname = h.join('/'));
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
              h = (e.pathname && e.pathname.split('/')) || [],
              k = n.protocol && !T[n.protocol];
            if (
              (k &&
                ((n.hostname = ''),
                (n.port = null),
                n.host && ('' === w[0] ? (w[0] = n.host) : w.unshift(n.host)),
                (n.host = ''),
                e.protocol &&
                  ((e.hostname = null),
                  (e.port = null),
                  e.host && ('' === h[0] ? (h[0] = e.host) : h.unshift(e.host)),
                  (e.host = null)),
                (b = b && ('' === h[0] || '' === w[0]))),
              y)
            )
              (n.host = e.host || '' === e.host ? e.host : n.host),
                (n.hostname = e.hostname || '' === e.hostname ? e.hostname : n.hostname),
                (n.search = e.search),
                (n.query = e.query),
                (w = h);
            else if (h.length)
              w || (w = []), w.pop(), (w = w.concat(h)), (n.search = e.search), (n.query = e.query);
            else if (!l.isNullOrUndefined(e.search)) {
              if (k) {
                n.hostname = n.host = w.shift();
                var j = !!(n.host && n.host.indexOf('@') > 0) && n.host.split('@');
                j && ((n.auth = j.shift()), (n.host = n.hostname = j.shift()));
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
              var E = w.slice(-1)[0],
                S = ((n.host || e.host || w.length > 1) && ('.' === E || '..' === E)) || '' === E,
                A = 0,
                N = w.length;
              N >= 0;
              N--
            )
              (E = w[N]),
                '.' === E
                  ? w.splice(N, 1)
                  : '..' === E
                  ? (w.splice(N, 1), A++)
                  : A && (w.splice(N, 1), A--);
            if (!b && !x) for (; A--; A) w.unshift('..');
            !b || '' === w[0] || (w[0] && '/' === w[0].charAt(0)) || w.unshift(''),
              S && '/' !== w.join('/').substr(-1) && w.push('');
            var q = '' === w[0] || (w[0] && '/' === w[0].charAt(0));
            if (k) {
              n.hostname = n.host = q ? '' : w.length ? w.shift() : '';
              var j = !!(n.host && n.host.indexOf('@') > 0) && n.host.split('@');
              j && ((n.auth = j.shift()), (n.host = n.hostname = j.shift()));
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
      { './util': 8, punycode: 1, querystring: 6 },
    ],
    8: [
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
    9: [
      function (e, t, n) {
        function r(e) {
          var t = a(e.currentTarget).parent().find('.dropdown-menu');
          t.toggleClass('open'), e.stopPropagation(), e.preventDefault();
        }
        function o(e) {
          a('.dropdown-menu').removeClass('open');
        }
        function i() {
          a(document).on('click', '.toggle-dropdown', r),
            a(document).on('click', '.dropdown-menu', function (e) {
              e.stopPropagation();
            }),
            a(document).on('click', o);
        }
        var a = e('jquery');
        t.exports = { init: i };
      },
      { jquery: 2 },
    ],
    10: [
      function (e, t, n) {
        function r() {
          s.init(),
            i.init(),
            o.init(),
            a.init(),
            u.createButton({
              index: 0,
              icon: 'fa fa-align-justify',
              onClick: function (e) {
                e.preventDefault(), s.toggle();
              },
            });
        }
        var o = e('./dropdown'),
          i = e('./keyboard'),
          a = e('./navigation'),
          s = e('./sidebar'),
          u = e('./toolbar'),
          l = window.gitbook;
        l.events.on('start', r),
          (l.keyboard = i),
          (l.navigation = a),
          (l.sidebar = s),
          (l.toolbar = u);
      },
      { './dropdown': 9, './keyboard': 11, './navigation': 13, './sidebar': 15, './toolbar': 16 },
    ],
    11: [
      function (e, t, n) {
        function r(e, t) {
          i.bind(e, function (e) {
            return t(), !1;
          });
        }
        function o() {
          r(['right'], function (e) {
            a.goNext();
          }),
            r(['left'], function (e) {
              a.goPrev();
            }),
            r(['s'], function (e) {
              s.toggle();
            });
        }
        var i = e('mousetrap'),
          a = e('./navigation'),
          s = e('./sidebar');
        t.exports = { init: o, bind: r };
      },
      { './navigation': 13, './sidebar': 15, mousetrap: 3 },
    ],
    12: [
      function (e, t, n) {
        function r(e) {
          return (
            o.state.$book.addClass('is-loading'),
            e.always(function () {
              o.state.$book.removeClass('is-loading');
            }),
            e
          );
        }
        var o = window.gitbook;
        t.exports = { show: r };
      },
      {},
    ],
    13: [
      function (e, t, n) {
        function r() {
          return T(E.isSmallScreen() ? '.book-body' : '.body-inner');
        }
        function o(e) {
          var t = r(),
            n = 0;
          i(e) &&
            (e && (n = u(e)),
            t.unbind('scroll'),
            t.animate({ scrollTop: n }, 800, 'swing', function () {
              t.scroll(f);
            }),
            l(null, e));
        }
        function i(e) {
          var t = r(),
            n = t.find(e);
          return !!n.length;
        }
        function a(e) {
          return 0 === e.length;
        }
        function s(e, t) {
          return e.length > 0 && e.filter(t).length > 0;
        }
        function u(e) {
          var t = r(),
            n = t.find('.page-inner'),
            o = t.find(e),
            i = o.offsetParent(),
            u = 0;
          if (s([t, n, o, i], a)) return 0;
          u = o.position().top;
          for (var l = 10, c = 0; c < l && !i.is(n) && !i.is(i.offsetParent()); c++)
            (o = i), (u += o.position().top), (i = o.offsetParent());
          return Math.floor(u);
        }
        function l(e, t) {
          if (
            (e || t || (e = w.first()),
            t &&
              (e =
                w.length > 1
                  ? w
                      .filter(function () {
                        var e = c(T(this));
                        return e == t;
                      })
                      .first()
                  : w.first()),
            !e.is(C))
          ) {
            (C = e), w.removeClass('active'), e.addClass('active'), (t = c(e));
            var n = window.location.pathname + window.location.hash,
              r = window.location.pathname + t;
            r != n && history.replaceState({ path: r }, null, r);
          }
        }
        function c(e) {
          var t = e.children('a'),
            n = t.attr('href').split('#')[1];
          return n && (n = '#' + n), n ? n : '';
        }
        function f() {
          var e = r(),
            t = e.scrollTop(),
            n = e.prop('scrollHeight'),
            o = e.prop('clientHeight'),
            i = w.length,
            a = null;
          T(w.get().reverse()).each(function (e) {
            var n,
              r = c(T(this));
            r && !a && ((n = u(r)), t >= n && (a = T(this))), e != i - 1 || a || (a = T(this));
          }),
            a || t || (a = w.first()),
            t && n - t == o && (a = w.last()),
            l(a);
        }
        function p(e, t) {
          var n = k.parse(N),
            r = k.resolve(window.location.pathname, e),
            i = k.parse(r),
            a = i.hash,
            s = i.pathname !== n.pathname,
            u = Boolean(i.hostname);
          if (!A || u) return void (location.href = e);
          if (!s) return t && history.pushState({ path: r }, null, r), o(a);
          N = r;
          var l = T.Deferred(function (e) {
            T.ajax({
              type: 'GET',
              url: r,
              cache: !0,
              headers: { 'Access-Control-Expose-Headers': 'X-Current-Location' },
              success: function (n, i, s) {
                var u = s.getResponseHeader('X-Current-Location') || r;
                n = n
                  .replace(/<(\/?)(html)([^>]*)>/i, function (e, t, n, r) {
                    return '<' + t + 'div' + (t ? '' : ' data-element="' + n + '"') + r + '>';
                  })
                  .replace(/<(\/?)(head)([^>]*)>/i, function (e, t, n, r) {
                    return '<' + t + 'div' + (t ? '' : ' data-element="' + n + '"') + r + '>';
                  })
                  .replace(/<(\/?)(body)([^>]*)>/i, function (e, t, n, r) {
                    return '<' + t + 'div' + (t ? '' : ' data-element="' + n + '"') + r + '>';
                  });
                var l,
                  c = T(n),
                  f = c.find('.book');
                if (0 === f.length) {
                  var p = new Error('Invalid gitbook page, redirecting...');
                  return e.reject(p);
                }
                t && history.pushState({ path: u }, null, u),
                  (c = T(n)),
                  (l = c.find('[data-element=head]')),
                  (f = c.find('.book')),
                  (document.title = l.find('title').text());
                var d = T('head');
                d.find('link[rel=prev]').remove(),
                  d.find('link[rel=next]').remove(),
                  d.append(l.find('link[rel=prev]')),
                  d.append(l.find('link[rel=next]'));
                var g = T('.book').attr('class'),
                  v = T('.book-summary').scrollTop();
                f.toggleClass('with-summary', T('.book').hasClass('with-summary')),
                  T('.book').replaceWith(f),
                  T('.book').attr('class', g),
                  T('.book-summary').scrollTop(v),
                  (S.state.$book = T('.book')),
                  h(!a),
                  a && o(a),
                  e.resolve();
              },
            });
          }).promise();
          return j.show(
            l.fail(function (e) {
              console.log(e);
            }),
          );
        }
        function d() {
          var e, t;
          (e = parseInt(T('.body-inner').css('width'), 10)),
            (t = parseInt(T('.page-wrapper').css('width'), 10)),
            T('.navigation-next').css('margin-right', e - t + 'px');
          var n = r();
          n.unbind('scroll'), n.scroll(f);
        }
        function h(e) {
          var t = T('.book-body'),
            n = t.find('.body-inner'),
            o = n.find('.page-wrapper');
          d(), o && o[0] && o[0].focus({ preventScroll: !0 });
          var i = r();
          e && i.scrollTop(0),
            (w = T('.book-summary .summary .chapter').filter(function () {
              var e = T(this).children('a'),
                t = null;
              if (!e.length) return !1;
              t = e.attr('href').split('#')[0];
              var n = k.resolve(window.location.pathname, t);
              return window.location.pathname == n;
            })),
            w.length > 1 ? i.scroll(f) : (C = w.first());
        }
        function g(e) {
          return 0 === e.button;
        }
        function v(e) {
          return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
        }
        function m(e) {
          var t = T(this),
            n = t.attr('target');
          if (!v(e) && g(e) && !n) {
            e.stopPropagation(), e.preventDefault();
            var r = t.attr('href');
            r && p(r, !0);
          }
        }
        function y() {
          var e = T('.navigation-next').attr('href');
          e && p(e, !0);
        }
        function b() {
          var e = T('.navigation-prev').attr('href');
          e && p(e, !0);
        }
        function x() {
          T.ajaxSetup({ cache: !1 }),
            history.replaceState({ path: window.location.href }, ''),
            (window.onpopstate = function (e) {
              if (null !== e.state) return p(e.state.path, !1);
            }),
            T(document).on('click', '.navigation-prev', m),
            T(document).on('click', '.navigation-next', m),
            T(document).on('click', '.summary [data-path] a', m),
            T(document).on('click', '.page-inner a', m),
            T(window).resize(d),
            h(!1);
        }
        var w,
          C,
          T = e('jquery'),
          k = e('url'),
          j = e('./loading'),
          E = e('./platform'),
          S = window.gitbook,
          A = 'undefined' != typeof history.pushState,
          N = location.href;
        t.exports = { init: x, goNext: y, goPrev: b };
      },
      { './loading': 12, './platform': 14, jquery: 2, url: 7 },
    ],
    14: [
      function (e, t, n) {
        var r = e('jquery');
        t.exports = {
          isMobile: function () {
            return r(document).width() <= 600;
          },
          isSmallScreen: function () {
            return r(document).width() <= 1240;
          },
        };
      },
      { jquery: 2 },
    ],
    15: [
      function (e, t, n) {
        function r(e, t) {
          (null != l.state && o() == e) ||
            (null == t && (t = !0),
            l.state.$book.toggleClass('without-animation', !t),
            l.state.$book.toggleClass('with-summary', e),
            l.storage.set('sidebar', o()));
        }
        function o() {
          return l.state.$book.hasClass('with-summary');
        }
        function i() {
          s(document).on('click', '.book-summary li.chapter a', function (e) {
            u.isMobile() && r(!1, !1);
          });
        }
        function a(e) {
          var t = s('.book-summary');
          t.find('li').each(function () {
            var t = s(this).data('path'),
              n = null == e || e.indexOf(t) !== -1;
            s(this).toggle(n), n && s(this).parents('li').show();
          });
        }
        var s = e('jquery'),
          u = e('./platform'),
          l = window.gitbook;
        t.exports = { init: i, isOpen: o, toggle: r, filter: a };
      },
      { './platform': 14, jquery: 2 },
    ],
    16: [
      function (e, t, n) {
        function r() {
          return 'btn-' + g++;
        }
        function o(e, t, n, r) {
          var o = e.children(t).length;
          n < 0 && (n = Math.max(0, o + 1 + n)),
            e.append(r),
            n < o && e.children(t).eq(n).before(e.children(t).last());
        }
        function i(e) {
          e.preventDefault();
        }
        function a(e) {
          var t = p('<div>', {
            class: 'dropdown-menu',
            html: '<div class="dropdown-caret"><span class="caret-outer"></span><span class="caret-inner"></span></div>',
          });
          if ('string' == typeof e) t.append(e);
          else {
            var n = e.map(function (e) {
              return p.isArray(e) ? e : [e];
            });
            n.forEach(function (e) {
              var n = p('<div>', { class: 'buttons' }),
                r = 'size-' + e.length;
              e.forEach(function (e) {
                e = p.extend({ text: '', className: '', onClick: i }, e || {});
                var t = p('<button>', { class: 'button ' + r + ' ' + e.className, text: e.text });
                t.click(e.onClick), n.append(t);
              }),
                t.append(n);
            });
          }
          return t;
        }
        function s(e) {
          return (
            (e = p.extend(
              {
                label: '',
                icon: '',
                text: '',
                position: 'left',
                className: '',
                onClick: i,
                dropdown: null,
                index: null,
                id: r(),
              },
              e || {},
            )),
            h.push(e),
            u(e),
            e.id
          );
        }
        function u(e) {
          var t,
            n = p('.book-header'),
            r = n.find('h1'),
            i = 'pull-' + e.position,
            s = p('<a>', {
              class: 'btn',
              text: e.text ? ' ' + e.text : '',
              'aria-label': e.label,
              href: '#',
            });
          if (
            (s.click(e.onClick), e.icon && p('<i>', { class: e.icon }).prependTo(s), e.dropdown)
          ) {
            var u = p('<div>', { class: 'dropdown ' + i + ' ' + e.className });
            s.addClass('toggle-dropdown'), u.append(s);
            var l = a(e.dropdown);
            l.addClass('dropdown-' + ('right' == e.position ? 'left' : 'right')),
              u.append(l),
              (t = u);
          } else s.addClass(i), s.addClass(e.className), (t = s);
          t.addClass('js-toolbar-action'),
            p.isNumeric(e.index) && e.index >= 0
              ? o(n, '.btn, .dropdown, h1', e.index, t)
              : t.insertBefore(r);
        }
        function l() {
          p('.js-toolbar-action').remove(), h.forEach(u);
        }
        function c(e) {
          (h = p.grep(h, function (t) {
            return t.id != e;
          })),
            l();
        }
        function f(e) {
          (h = p.grep(h, function (t) {
            return e.indexOf(t.id) == -1;
          })),
            l();
        }
        var p = e('jquery'),
          d = window.gitbook,
          h = [],
          g = 0;
        d.events.on('page.change', function () {
          l();
        }),
          (t.exports = { createButton: s, removeButton: c, removeButtons: f });
      },
      { jquery: 2 },
    ],
  },
  {},
  [10],
);
