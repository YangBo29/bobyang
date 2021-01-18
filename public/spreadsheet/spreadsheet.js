/*eslint-disable*/
!(function(t) {
    var e = {};
    function n(r) {
        if (e[r]) return e[r].exports;
        var i = (e[r] = { i: r, l: !1, exports: {} });
        return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    (n.m = t),
        (n.c = e),
        (n.d = function(t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
        }),
        (n.r = function(t) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
                Object.defineProperty(t, '__esModule', { value: !0 });
        }),
        (n.t = function(t, e) {
            if ((1 & e && (t = n(t)), 8 & e)) return t;
            if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
            var r = Object.create(null);
            if (
                (n.r(r),
                Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
                2 & e && 'string' != typeof t)
            )
                for (var i in t)
                    n.d(
                        r,
                        i,
                        function(e) {
                            return t[e];
                        }.bind(null, i),
                    );
            return r;
        }),
        (n.n = function(t) {
            var e =
                t && t.__esModule
                    ? function() {
                          return t.default;
                      }
                    : function() {
                          return t;
                      };
            return n.d(e, 'a', e), e;
        }),
        (n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (n.p = ''),
        n((n.s = 2));
})([
    function(t, e) {},
    function(t, e, n) {},
    function(t, e, n) {
        'use strict';
        function r(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return i(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return i(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function i(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function a(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        n.r(e),
            n.d(e, 'spreadsheet', function() {
                return Lu;
            });
        var c = (function() {
                function t(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '';
                    o(this, t),
                        'string' == typeof e
                            ? ((this.el = document.createElement(e)), (this.el.className = n))
                            : (this.el = e),
                        (this.data = {});
                }
                var e, n, i;
                return (
                    (e = t),
                    (n = [
                        {
                            key: 'data',
                            value: function(t, e) {
                                return void 0 !== e ? ((this.data[t] = e), this) : this.data[t];
                            },
                        },
                        {
                            key: 'on',
                            value: function(t, e) {
                                var n = r(t.split('.')),
                                    i = n[0],
                                    o = n.slice(1),
                                    a = i;
                                return (
                                    'mousewheel' === a &&
                                        /Firefox/i.test(window.navigator.userAgent) &&
                                        (a = 'DOMMouseScroll'),
                                    this.el.addEventListener(a, function(t) {
                                        e(t);
                                        for (var n = 0; n < o.length; n += 1) {
                                            var r = o[n];
                                            if ('left' === r && 0 !== t.button) return;
                                            if ('right' === r && 2 !== t.button) return;
                                            'stop' === r && t.stopPropagation();
                                        }
                                    }),
                                    this
                                );
                            },
                        },
                        {
                            key: 'offset',
                            value: function(t) {
                                var e = this;
                                if (void 0 !== t)
                                    return (
                                        Object.keys(t).forEach(function(n) {
                                            e.css(n, ''.concat(t[n], 'px'));
                                        }),
                                        this
                                    );
                                var n = this.el;
                                return {
                                    top: n.offsetTop,
                                    left: n.offsetLeft,
                                    height: n.offsetHeight,
                                    width: n.offsetWidth,
                                };
                            },
                        },
                        {
                            key: 'scroll',
                            value: function(t) {
                                var e = this.el;
                                return (
                                    void 0 !== t &&
                                        (void 0 !== t.left && (e.scrollLeft = t.left),
                                        void 0 !== t.top && (e.scrollTop = t.top)),
                                    { left: e.scrollLeft, top: e.scrollTop }
                                );
                            },
                        },
                        {
                            key: 'box',
                            value: function() {
                                return this.el.getBoundingClientRect();
                            },
                        },
                        {
                            key: 'parent',
                            value: function() {
                                return new t(this.el.parentNode);
                            },
                        },
                        {
                            key: 'children',
                            value: function() {
                                for (
                                    var t = this, e = arguments.length, n = new Array(e), r = 0;
                                    r < e;
                                    r++
                                )
                                    n[r] = arguments[r];
                                return 0 === arguments.length
                                    ? this.el.childNodes
                                    : (n.forEach(function(e) {
                                          return t.child(e);
                                      }),
                                      this);
                            },
                        },
                        {
                            key: 'removeChild',
                            value: function(t) {
                                this.el.removeChild(t);
                            },
                        },
                        {
                            key: 'child',
                            value: function(e) {
                                var n = e;
                                return (
                                    'string' == typeof e
                                        ? (n = document.createTextNode(e))
                                        : e instanceof t && (n = e.el),
                                    this.el.appendChild(n),
                                    this
                                );
                            },
                        },
                        {
                            key: 'contains',
                            value: function(t) {
                                return this.el.contains(t);
                            },
                        },
                        {
                            key: 'className',
                            value: function(t) {
                                return void 0 !== t
                                    ? ((this.el.className = t), this)
                                    : this.el.className;
                            },
                        },
                        {
                            key: 'addClass',
                            value: function(t) {
                                return this.el.classList.add(t), this;
                            },
                        },
                        {
                            key: 'hasClass',
                            value: function(t) {
                                return this.el.classList.contains(t);
                            },
                        },
                        {
                            key: 'removeClass',
                            value: function(t) {
                                return this.el.classList.remove(t), this;
                            },
                        },
                        {
                            key: 'toggle',
                            value: function() {
                                var t =
                                    arguments.length > 0 && void 0 !== arguments[0]
                                        ? arguments[0]
                                        : 'active';
                                return this.toggleClass(t);
                            },
                        },
                        {
                            key: 'toggleClass',
                            value: function(t) {
                                return this.el.classList.toggle(t);
                            },
                        },
                        {
                            key: 'active',
                            value: function() {
                                var t =
                                        !(arguments.length > 0 && void 0 !== arguments[0]) ||
                                        arguments[0],
                                    e =
                                        arguments.length > 1 && void 0 !== arguments[1]
                                            ? arguments[1]
                                            : 'active';
                                return t ? this.addClass(e) : this.removeClass(e), this;
                            },
                        },
                        {
                            key: 'checked',
                            value: function() {
                                var t =
                                    !(arguments.length > 0 && void 0 !== arguments[0]) ||
                                    arguments[0];
                                return this.active(t, 'checked'), this;
                            },
                        },
                        {
                            key: 'disabled',
                            value: function() {
                                var t =
                                    !(arguments.length > 0 && void 0 !== arguments[0]) ||
                                    arguments[0];
                                return (
                                    t ? this.addClass('disabled') : this.removeClass('disabled'),
                                    this
                                );
                            },
                        },
                        {
                            key: 'attr',
                            value: function(t, e) {
                                var n = this;
                                if (void 0 !== e) this.el.setAttribute(t, e);
                                else {
                                    if ('string' == typeof t) return this.el.getAttribute(t);
                                    Object.keys(t).forEach(function(e) {
                                        n.el.setAttribute(e, t[e]);
                                    });
                                }
                                return this;
                            },
                        },
                        {
                            key: 'removeAttr',
                            value: function(t) {
                                return this.el.removeAttribute(t), this;
                            },
                        },
                        {
                            key: 'html',
                            value: function(t) {
                                return void 0 !== t
                                    ? ((this.el.innerHTML = t), this)
                                    : this.el.innerHTML;
                            },
                        },
                        {
                            key: 'val',
                            value: function(t) {
                                return void 0 !== t ? ((this.el.value = t), this) : this.el.value;
                            },
                        },
                        {
                            key: 'focus',
                            value: function() {
                                this.el.focus();
                            },
                        },
                        {
                            key: 'cssRemoveKeys',
                            value: function() {
                                for (
                                    var t = this, e = arguments.length, n = new Array(e), r = 0;
                                    r < e;
                                    r++
                                )
                                    n[r] = arguments[r];
                                return (
                                    n.forEach(function(e) {
                                        return t.el.style.removeProperty(e);
                                    }),
                                    this
                                );
                            },
                        },
                        {
                            key: 'css',
                            value: function(t, e) {
                                var n = this;
                                return void 0 === e && 'string' != typeof t
                                    ? (Object.keys(t).forEach(function(e) {
                                          n.el.style[e] = t[e];
                                      }),
                                      this)
                                    : void 0 !== e
                                    ? ((this.el.style[t] = e), this)
                                    : this.el.style[t];
                            },
                        },
                        {
                            key: 'computedStyle',
                            value: function() {
                                return window.getComputedStyle(this.el, null);
                            },
                        },
                        {
                            key: 'show',
                            value: function() {
                                return this.css('display', 'block'), this;
                            },
                        },
                        {
                            key: 'hide',
                            value: function() {
                                return this.css('display', 'none'), this;
                            },
                        },
                    ]) && a(e.prototype, n),
                    i && a(e, i),
                    t
                );
            })(),
            l = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '';
                return new c(t, e);
            };
        n(0);
        function u(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return s(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return s(t, e);
                })(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function s(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        var f = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
        ];
        function h(t) {
            for (var e = '', n = t; n >= f.length; )
                (n /= f.length), (n -= 1), (e += f[parseInt(n, 10) % f.length]);
            return (e += f[t % f.length]);
        }
        function y(t) {
            for (var e = 0, n = 0; n < t.length - 1; n += 1) {
                var r = t.charCodeAt(n) - 65,
                    i = t.length - 1 - n;
                e += Math.pow(f.length, i) + f.length * r;
            }
            return (e += t.charCodeAt(t.length - 1) - 65);
        }
        function p(t) {
            for (var e = '', n = '', r = 0; r < t.length; r += 1)
                t.charAt(r) >= '0' && t.charAt(r) <= '9' ? (n += t.charAt(r)) : (e += t.charAt(r));
            return [y(e), parseInt(n, 10) - 1];
        }
        function d(t, e) {
            return ''.concat(h(t)).concat(e + 1);
        }
        function v(t, e, n) {
            var r =
                arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : function() {
                          return !0;
                      };
            if (0 === e && 0 === n) return t;
            var i = p(t),
                o = u(i, 2),
                a = o[0],
                c = o[1];
            return r(a, c) ? d(a + e, c + n) : t;
        }
        function b(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return m(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return m(t, e);
                })(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function m(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function g(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function w(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var k = (function() {
            function t(e, n, r, i) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                    a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                g(this, t),
                    (this.sri = e),
                    (this.sci = n),
                    (this.eri = r),
                    (this.eci = i),
                    (this.w = o),
                    (this.h = a);
            }
            var e, n, r;
            return (
                (e = t),
                (r = [
                    {
                        key: 'valueOf',
                        value: function(e) {
                            var n = e.split(':'),
                                r = b(p(n[0]), 2),
                                i = r[0],
                                o = r[1],
                                a = o,
                                c = i;
                            if (n.length > 1) {
                                var l = b(p(n[1]), 2);
                                (c = l[0]), (a = l[1]);
                            }
                            return new t(o, i, a, c);
                        },
                    },
                ]),
                (n = [
                    {
                        key: 'set',
                        value: function(t, e, n, r) {
                            (this.sri = t), (this.sci = e), (this.eri = n), (this.eci = r);
                        },
                    },
                    {
                        key: 'multiple',
                        value: function() {
                            return this.eri - this.sri > 0 || this.eci - this.sci > 0;
                        },
                    },
                    {
                        key: 'includes',
                        value: function() {
                            for (
                                var t = 0, e = 0, n = arguments.length, r = new Array(n), i = 0;
                                i < n;
                                i++
                            )
                                r[i] = arguments[i];
                            if (1 === r.length) {
                                var o = p(r[0]),
                                    a = b(o, 2);
                                (e = a[0]), (t = a[1]);
                            } else 2 === r.length && ((t = r[0]), (e = r[1]));
                            var c = this.sri,
                                l = this.sci,
                                u = this.eri,
                                s = this.eci;
                            return c <= t && t <= u && l <= e && e <= s;
                        },
                    },
                    {
                        key: 'each',
                        value: function(t) {
                            for (
                                var e =
                                        arguments.length > 1 && void 0 !== arguments[1]
                                            ? arguments[1]
                                            : function() {
                                                  return !0;
                                              },
                                    n = this.sri,
                                    r = this.sci,
                                    i = this.eri,
                                    o = this.eci,
                                    a = n;
                                a <= i;
                                a += 1
                            )
                                if (e(a)) for (var c = r; c <= o; c += 1) t(a, c);
                        },
                    },
                    {
                        key: 'contains',
                        value: function(t) {
                            return (
                                this.sri <= t.sri &&
                                this.sci <= t.sci &&
                                this.eri >= t.eri &&
                                this.eci >= t.eci
                            );
                        },
                    },
                    {
                        key: 'within',
                        value: function(t) {
                            return (
                                this.sri >= t.sri &&
                                this.sci >= t.sci &&
                                this.eri <= t.eri &&
                                this.eci <= t.eci
                            );
                        },
                    },
                    {
                        key: 'disjoint',
                        value: function(t) {
                            return (
                                this.sri > t.eri ||
                                this.sci > t.eci ||
                                t.sri > this.eri ||
                                t.sci > this.eci
                            );
                        },
                    },
                    {
                        key: 'intersects',
                        value: function(t) {
                            return (
                                this.sri <= t.eri &&
                                this.sci <= t.eci &&
                                t.sri <= this.eri &&
                                t.sci <= this.eci
                            );
                        },
                    },
                    {
                        key: 'union',
                        value: function(e) {
                            var n = this.sri,
                                r = this.sci,
                                i = this.eri,
                                o = this.eci;
                            return new t(
                                e.sri < n ? e.sri : n,
                                e.sci < r ? e.sci : r,
                                e.eri > i ? e.eri : i,
                                e.eci > o ? e.eci : o,
                            );
                        },
                    },
                    {
                        key: 'difference',
                        value: function(e) {
                            var n = [],
                                r = function(e, r, i, o) {
                                    n.push(new t(e, r, i, o));
                                },
                                i = this.sri,
                                o = this.sci,
                                a = this.eri,
                                c = this.eci,
                                l = e.sri - i,
                                u = e.sci - o,
                                s = a - e.eri,
                                f = c - e.eci;
                            return (
                                l > 0
                                    ? (r(i, o, e.sri - 1, c),
                                      s > 0
                                          ? (r(e.eri + 1, o, a, c),
                                            u > 0 && r(e.sri, o, e.eri, e.sci - 1),
                                            f > 0 && r(e.sri, e.eci + 1, e.eri, c))
                                          : (u > 0 && r(e.sri, o, a, e.sci - 1),
                                            f > 0 && r(e.sri, e.eci + 1, a, c)))
                                    : s > 0 &&
                                      (r(e.eri + 1, o, a, c),
                                      u > 0 && r(i, o, e.eri, e.sci - 1),
                                      f > 0 && r(i, e.eci + 1, e.eri, c)),
                                u > 0
                                    ? (r(i, o, a, e.sci - 1),
                                      f > 0
                                          ? (r(i, e.eri + 1, a, c),
                                            l > 0 && r(i, e.sci, e.sri - 1, e.eci),
                                            s > 0 && r(e.sri + 1, e.sci, a, e.eci))
                                          : (l > 0 && r(i, e.sci, e.sri - 1, c),
                                            s > 0 && r(e.sri + 1, e.sci, a, c)))
                                    : f > 0 &&
                                      (r(a, e.eci + 1, a, c),
                                      l > 0 && r(i, o, e.sri - 1, e.eci),
                                      s > 0 && r(e.eri + 1, o, a, e.eci)),
                                n
                            );
                        },
                    },
                    {
                        key: 'size',
                        value: function() {
                            return [this.eri - this.sri + 1, this.eci - this.sci + 1];
                        },
                    },
                    {
                        key: 'toString',
                        value: function() {
                            var t = this.sri,
                                e = this.sci,
                                n = this.eri,
                                r = this.eci,
                                i = d(e, t);
                            return this.multiple() && (i = ''.concat(i, ':').concat(d(r, n))), i;
                        },
                    },
                    {
                        key: 'clone',
                        value: function() {
                            return new t(this.sri, this.sci, this.eri, this.eci, this.w, this.h);
                        },
                    },
                    {
                        key: 'equals',
                        value: function(t) {
                            return (
                                this.eri === t.eri &&
                                this.eci === t.eci &&
                                this.sri === t.sri &&
                                this.sci === t.sci
                            );
                        },
                    },
                ]) && w(e.prototype, n),
                r && w(e, r),
                t
            );
        })();
        function S(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var O = (function() {
            function t() {
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.range = new k(0, 0, 0, 0)),
                    (this.ri = 0),
                    (this.ci = 0);
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'multiple',
                        value: function() {
                            return this.range.multiple();
                        },
                    },
                    {
                        key: 'setIndexes',
                        value: function(t, e) {
                            (this.ri = t), (this.ci = e);
                        },
                    },
                    {
                        key: 'size',
                        value: function() {
                            return this.range.size();
                        },
                    },
                ]) && S(e.prototype, n),
                r && S(e, r),
                t
            );
        })();
        var x = function t() {
            !(function(t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            })(this, t),
                (this.x = 0),
                (this.y = 0),
                (this.ri = 0),
                (this.ci = 0);
        };
        function j(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var E = (function() {
            function t() {
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.undoItems = []),
                    (this.redoItems = []);
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'add',
                        value: function(t) {
                            this.undoItems.push(JSON.stringify(t)), (this.redoItems = []);
                        },
                    },
                    {
                        key: 'canUndo',
                        value: function() {
                            return this.undoItems.length > 0;
                        },
                    },
                    {
                        key: 'canRedo',
                        value: function() {
                            return this.redoItems.length > 0;
                        },
                    },
                    {
                        key: 'undo',
                        value: function(t, e) {
                            var n = this.undoItems,
                                r = this.redoItems;
                            this.canUndo() && (r.push(JSON.stringify(t)), e(JSON.parse(n.pop())));
                        },
                    },
                    {
                        key: 'redo',
                        value: function(t, e) {
                            var n = this.undoItems,
                                r = this.redoItems;
                            this.canRedo() && (n.push(JSON.stringify(t)), e(JSON.parse(r.pop())));
                        },
                    },
                ]) && j(e.prototype, n),
                r && j(e, r),
                t
            );
        })();
        function R(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var _ = (function() {
            function t() {
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.range = null),
                    (this.state = 'clear');
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'copy',
                        value: function(t) {
                            return (this.range = t), (this.state = 'copy'), this;
                        },
                    },
                    {
                        key: 'cut',
                        value: function(t) {
                            return (this.range = t), (this.state = 'cut'), this;
                        },
                    },
                    {
                        key: 'isCopy',
                        value: function() {
                            return 'copy' === this.state;
                        },
                    },
                    {
                        key: 'isCut',
                        value: function() {
                            return 'cut' === this.state;
                        },
                    },
                    {
                        key: 'isClear',
                        value: function() {
                            return 'clear' === this.state;
                        },
                    },
                    {
                        key: 'clear',
                        value: function() {
                            (this.range = null), (this.state = 'clear');
                        },
                    },
                ]) && R(e.prototype, n),
                r && R(e, r),
                t
            );
        })();
        function C(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function A(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function P(t, e, n) {
            return e && A(t.prototype, e), n && A(t, n), t;
        }
        var T = (function() {
                function t(e, n, r) {
                    C(this, t), (this.ci = e), (this.operator = n), (this.value = r);
                }
                return (
                    P(t, [
                        {
                            key: 'set',
                            value: function(t, e) {
                                (this.operator = t), (this.value = e);
                            },
                        },
                        {
                            key: 'includes',
                            value: function(t) {
                                var e = this.operator,
                                    n = this.value;
                                return 'all' === e || ('in' === e && n.includes(t));
                            },
                        },
                        {
                            key: 'vlength',
                            value: function() {
                                var t = this.operator,
                                    e = this.value;
                                return 'in' === t ? e.length : 0;
                            },
                        },
                        {
                            key: 'getData',
                            value: function() {
                                return { ci: this.ci, operator: this.operator, value: this.value };
                            },
                        },
                    ]),
                    t
                );
            })(),
            I = (function() {
                function t(e, n) {
                    C(this, t), (this.ci = e), (this.order = n);
                }
                return (
                    P(t, [
                        {
                            key: 'asc',
                            value: function() {
                                return 'asc' === this.order;
                            },
                        },
                        {
                            key: 'desc',
                            value: function() {
                                return 'desc' === this.order;
                            },
                        },
                    ]),
                    t
                );
            })(),
            D = (function() {
                function t() {
                    C(this, t), (this.ref = null), (this.filters = []), (this.sort = null);
                }
                return (
                    P(t, [
                        {
                            key: 'setData',
                            value: function(t) {
                                var e = t.ref,
                                    n = t.filters,
                                    r = t.sort;
                                null != e &&
                                    ((this.ref = e),
                                    (this.filters = n.map(function(t) {
                                        return new T(t.ci, t.operator, t.value);
                                    })),
                                    r && (this.sort = new I(r.ci, r.order)));
                            },
                        },
                        {
                            key: 'getData',
                            value: function() {
                                if (this.active()) {
                                    var t = this.ref,
                                        e = this.filters,
                                        n = this.sort;
                                    return {
                                        ref: t,
                                        filters: e.map(function(t) {
                                            return t.getData();
                                        }),
                                        sort: n,
                                    };
                                }
                                return {};
                            },
                        },
                        {
                            key: 'addFilter',
                            value: function(t, e, n) {
                                var r = this.getFilter(t);
                                null == r ? this.filters.push(new T(t, e, n)) : r.set(e, n);
                            },
                        },
                        {
                            key: 'setSort',
                            value: function(t, e) {
                                this.sort = e ? new I(t, e) : null;
                            },
                        },
                        {
                            key: 'includes',
                            value: function(t, e) {
                                return !!this.active() && this.hrange().includes(t, e);
                            },
                        },
                        {
                            key: 'getSort',
                            value: function(t) {
                                var e = this.sort;
                                return e && e.ci === t ? e : null;
                            },
                        },
                        {
                            key: 'getFilter',
                            value: function(t) {
                                for (var e = this.filters, n = 0; n < e.length; n += 1)
                                    if (e[n].ci === t) return e[n];
                                return null;
                            },
                        },
                        {
                            key: 'filteredRows',
                            value: function(t) {
                                var e = new Set(),
                                    n = new Set();
                                if (this.active())
                                    for (
                                        var r = this.range(),
                                            i = r.sri,
                                            o = r.eri,
                                            a = this.filters,
                                            c = i + 1;
                                        c <= o;
                                        c += 1
                                    )
                                        for (var l = 0; l < a.length; l += 1) {
                                            var u = a[l],
                                                s = t(c, u.ci),
                                                f = s ? s.text : '';
                                            if (!u.includes(f)) {
                                                e.add(c);
                                                break;
                                            }
                                            n.add(c);
                                        }
                                return { rset: e, fset: n };
                            },
                        },
                        {
                            key: 'items',
                            value: function(t, e) {
                                var n = {};
                                if (this.active())
                                    for (
                                        var r = this.range(), i = r.sri, o = r.eri, a = i + 1;
                                        a <= o;
                                        a += 1
                                    ) {
                                        var c = e(a, t);
                                        if (null === c || /^\s*$/.test(c.text))
                                            n[''] = (n[''] || 0) + 1;
                                        else {
                                            var l = c.text,
                                                u = (n[l] || 0) + 1;
                                            n[l] = u;
                                        }
                                    }
                                return n;
                            },
                        },
                        {
                            key: 'range',
                            value: function() {
                                return k.valueOf(this.ref);
                            },
                        },
                        {
                            key: 'hrange',
                            value: function() {
                                var t = this.range();
                                return (t.eri = t.sri), t;
                            },
                        },
                        {
                            key: 'clear',
                            value: function() {
                                (this.ref = null), (this.filters = []), (this.sort = null);
                            },
                        },
                        {
                            key: 'active',
                            value: function() {
                                return null !== this.ref;
                            },
                        },
                    ]),
                    t
                );
            })();
        function z(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function M(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var H = (function() {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                z(this, t), (this._ = e);
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'forEach',
                        value: function(t) {
                            this._.forEach(t);
                        },
                    },
                    {
                        key: 'deleteWithin',
                        value: function(t) {
                            this._ = this._.filter(function(e) {
                                return !e.within(t);
                            });
                        },
                    },
                    {
                        key: 'getFirstIncludes',
                        value: function(t, e) {
                            for (var n = 0; n < this._.length; n += 1) {
                                var r = this._[n];
                                if (r.includes(t, e)) return r;
                            }
                            return null;
                        },
                    },
                    {
                        key: 'filterIntersects',
                        value: function(e) {
                            return new t(
                                this._.filter(function(t) {
                                    return t.intersects(e);
                                }),
                            );
                        },
                    },
                    {
                        key: 'intersects',
                        value: function(t) {
                            for (var e = 0; e < this._.length; e += 1)
                                if (this._[e].intersects(t)) return !0;
                            return !1;
                        },
                    },
                    {
                        key: 'union',
                        value: function(t) {
                            var e = t;
                            return (
                                this._.forEach(function(t) {
                                    t.intersects(e) && (e = t.union(e));
                                }),
                                e
                            );
                        },
                    },
                    {
                        key: 'add',
                        value: function(t) {
                            this.deleteWithin(t), this._.push(t);
                        },
                    },
                    {
                        key: 'shift',
                        value: function(t, e, n, r) {
                            this._.forEach(function(i) {
                                var o = i.sri,
                                    a = i.sci,
                                    c = i.eri,
                                    l = i.eci,
                                    u = i;
                                'row' === t
                                    ? o >= e
                                        ? ((u.sri += n), (u.eri += n))
                                        : o < e && e <= c && ((u.eri += n), r(o, a, n, 0))
                                    : 'column' === t &&
                                      (a >= e
                                          ? ((u.sci += n), (u.eci += n))
                                          : a < e && e <= l && ((u.eci += n), r(o, a, 0, n)));
                            });
                        },
                    },
                    {
                        key: 'move',
                        value: function(t, e, n) {
                            this._.forEach(function(r) {
                                var i = r;
                                i.within(t) &&
                                    ((i.eri += e), (i.sri += e), (i.sci += n), (i.eci += n));
                            });
                        },
                    },
                    {
                        key: 'setData',
                        value: function(t) {
                            return (
                                (this._ = t.map(function(t) {
                                    return k.valueOf(t);
                                })),
                                this
                            );
                        },
                    },
                    {
                        key: 'getData',
                        value: function() {
                            return this._.map(function(t) {
                                return t.toString();
                            });
                        },
                    },
                ]) && M(e.prototype, n),
                r && M(e, r),
                t
            );
        })();
        var N = function t() {
            for (
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = arguments.length,
                    r = new Array(n > 1 ? n - 1 : 0),
                    i = 1;
                i < n;
                i++
            )
                r[i - 1] = arguments[i];
            return (
                r.forEach(function(n) {
                    Object.keys(n).forEach(function(r) {
                        var i = n[r];
                        'string' == typeof i || 'number' == typeof i || 'boolean' == typeof i
                            ? (e[r] = i)
                            : 'function' != typeof i && !Array.isArray(i) && i instanceof Object
                            ? ((e[r] = e[r] || {}), t(e[r], i))
                            : (e[r] = i);
                    });
                }),
                e
            );
        };
        function F(t) {
            for (var e = ''.concat(t), n = 0, r = !1, i = 0; i < e.length; i += 1)
                !0 === r && (n += 1), '.' === e.charAt(i) && (r = !0);
            return n;
        }
        function W(t, e, n) {
            if (Number.isNaN(e) || Number.isNaN(n)) return e + t + n;
            var r = F(e),
                i = F(n),
                o = Number(e),
                a = Number(n),
                c = 0;
            if ('-' === t) c = o - a;
            else if ('+' === t) c = o + a;
            else if ('*' === t) c = o * a;
            else if ('/' === t) return F((c = o / a)) > 5 ? c.toFixed(2) : c;
            return c.toFixed(Math.max(r, i));
        }
        var V = {
            cloneDeep: function(t) {
                return JSON.parse(JSON.stringify(t));
            },
            merge: function() {
                for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
                    e[n] = arguments[n];
                return N.apply(void 0, [{}].concat(e));
            },
            equals: function t(e, n) {
                var r = Object.keys(e);
                if (r.length !== Object.keys(n).length) return !1;
                for (var i = 0; i < r.length; i += 1) {
                    var o = r[i],
                        a = e[o],
                        c = n[o];
                    if (void 0 === c) return !1;
                    if ('string' == typeof a || 'number' == typeof a || 'boolean' == typeof a) {
                        if (a !== c) return !1;
                    } else if (Array.isArray(a)) {
                        if (a.length !== c.length) return !1;
                        for (var l = 0; l < a.length; l += 1) if (!t(a[l], c[l])) return !1;
                    } else if (
                        'function' != typeof a &&
                        !Array.isArray(a) &&
                        a instanceof Object &&
                        !t(a, c)
                    )
                        return !1;
                }
                return !0;
            },
            arrayEquals: function(t, e) {
                if (t.length !== e.length) return !1;
                for (var n = 0; n < t.length; n += 1) if (t[n] !== e[n]) return !1;
                return !0;
            },
            sum: function(t) {
                var e =
                        arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : function(t) {
                                  return t;
                              },
                    n = 0,
                    r = 0;
                return (
                    Object.keys(t).forEach(function(i) {
                        (n += e(t[i], i)), (r += 1);
                    }),
                    [n, r]
                );
            },
            rangeEach: function(t, e, n) {
                for (var r = t; r < e; r += 1) n(r);
            },
            rangeSum: function(t, e, n) {
                for (var r = 0, i = t; i < e; i += 1) r += n(i);
                return r;
            },
            rangeReduceIf: function(t, e, n, r, i, o) {
                for (var a = n, c = r, l = t; l < e && !(a > i); l += 1) a += c = o(l);
                return [l, a - c, c];
            },
            deleteProperty: function(t, e) {
                var n = t[''.concat(e)];
                return delete t[''.concat(e)], n;
            },
            numberCalc: W,
        };
        function q(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return U(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return U(t, e);
                })(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function U(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function $(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var B = (function() {
            function t(e) {
                var n = e.len,
                    r = e.height;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this._ = {}),
                    (this.len = n),
                    (this.height = r);
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'getHeight',
                        value: function(t) {
                            if (this.isHide(t)) return 0;
                            var e = this.get(t);
                            return e && e.height ? e.height : this.height;
                        },
                    },
                    {
                        key: 'setHeight',
                        value: function(t, e) {
                            this.getOrNew(t).height = e;
                        },
                    },
                    {
                        key: 'unhide',
                        value: function(t) {
                            for (var e = t; e > 0 && ((e -= 1), this.isHide(e)); )
                                this.setHide(e, !1);
                        },
                    },
                    {
                        key: 'isHide',
                        value: function(t) {
                            var e = this.get(t);
                            return e && e.hide;
                        },
                    },
                    {
                        key: 'setHide',
                        value: function(t, e) {
                            var n = this.getOrNew(t);
                            !0 === e ? (n.hide = !0) : delete n.hide;
                        },
                    },
                    {
                        key: 'setStyle',
                        value: function(t, e) {
                            this.getOrNew(t).style = e;
                        },
                    },
                    {
                        key: 'sumHeight',
                        value: function(t, e, n) {
                            var r = this;
                            return V.rangeSum(t, e, function(t) {
                                return n && n.has(t) ? 0 : r.getHeight(t);
                            });
                        },
                    },
                    {
                        key: 'totalHeight',
                        value: function() {
                            return this.sumHeight(0, this.len);
                        },
                    },
                    {
                        key: 'get',
                        value: function(t) {
                            return this._[t];
                        },
                    },
                    {
                        key: 'getOrNew',
                        value: function(t) {
                            return (this._[t] = this._[t] || { cells: {} }), this._[t];
                        },
                    },
                    {
                        key: 'getCell',
                        value: function(t, e) {
                            var n = this.get(t);
                            return void 0 !== n && void 0 !== n.cells && void 0 !== n.cells[e]
                                ? n.cells[e]
                                : null;
                        },
                    },
                    {
                        key: 'getCellMerge',
                        value: function(t, e) {
                            var n = this.getCell(t, e);
                            return n && n.merge ? n.merge : [0, 0];
                        },
                    },
                    {
                        key: 'getCellOrNew',
                        value: function(t, e) {
                            var n = this.getOrNew(t);
                            return (n.cells[e] = n.cells[e] || {}), n.cells[e];
                        },
                    },
                    {
                        key: 'setCell',
                        value: function(t, e, n) {
                            var r =
                                    arguments.length > 3 && void 0 !== arguments[3]
                                        ? arguments[3]
                                        : 'all',
                                i = this.getOrNew(t);
                            'all' === r
                                ? (i.cells[e] = n)
                                : 'text' === r
                                ? ((i.cells[e] = i.cells[e] || {}), (i.cells[e].text = n.text))
                                : 'format' === r &&
                                  ((i.cells[e] = i.cells[e] || {}),
                                  (i.cells[e].style = n.style),
                                  n.merge && (i.cells[e].merge = n.merge));
                        },
                    },
                    {
                        key: 'setCellText',
                        value: function(t, e, n) {
                            this.getCellOrNew(t, e).text = n;
                        },
                    },
                    {
                        key: 'copyPaste',
                        value: function(t, e, n) {
                            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                                i =
                                    arguments.length > 4 && void 0 !== arguments[4]
                                        ? arguments[4]
                                        : function() {},
                                o = t.sri,
                                a = t.sci,
                                c = t.eri,
                                l = t.eci,
                                u = e.sri,
                                s = e.sci,
                                f = e.eri,
                                h = e.eci,
                                y = t.size(),
                                p = q(y, 2),
                                d = p[0],
                                b = p[1],
                                m = e.size(),
                                g = q(m, 2),
                                w = g[0],
                                k = g[1],
                                S = !0,
                                O = 0;
                            (f < o || h < a) && ((S = !1), (O = f < o ? w : k));
                            for (var x = o; x <= c; x += 1)
                                if (this._[x])
                                    for (var j = a; j <= l; j += 1)
                                        if (this._[x].cells && this._[x].cells[j])
                                            for (var E = u; E <= f; E += d)
                                                for (var R = s; R <= h; R += b) {
                                                    var _ = E + (x - o),
                                                        C = R + (j - a),
                                                        A = V.cloneDeep(this._[x].cells[j]);
                                                    r &&
                                                        A &&
                                                        A.text &&
                                                        A.text.length > 0 &&
                                                        (function() {
                                                            var t = A.text,
                                                                e = R - s + (E - u) + 2;
                                                            if ((S || (e -= O + 1), '=' === t[0]))
                                                                A.text = t.replace(
                                                                    /[a-zA-Z]{1,3}\d+/g,
                                                                    function(t) {
                                                                        var n = 0,
                                                                            r = 0;
                                                                        return (
                                                                            o === u
                                                                                ? (n = e - 1)
                                                                                : (r = e - 1),
                                                                            /^\d+$/.test(t)
                                                                                ? t
                                                                                : v(t, n, r)
                                                                        );
                                                                    },
                                                                );
                                                            else if (
                                                                (d <= 1 &&
                                                                    b > 1 &&
                                                                    (u > c || f < o)) ||
                                                                (b <= 1 &&
                                                                    d > 1 &&
                                                                    (s > l || h < a)) ||
                                                                (d <= 1 && b <= 1)
                                                            ) {
                                                                var n = /[\\.\d]+$/.exec(t);
                                                                if (null !== n) {
                                                                    var r = Number(n[0]) + e - 1;
                                                                    A.text =
                                                                        t.substring(0, n.index) + r;
                                                                }
                                                            }
                                                        })(),
                                                        this.setCell(_, C, A, n),
                                                        i(_, C, A);
                                                }
                        },
                    },
                    {
                        key: 'cutPaste',
                        value: function(t, e) {
                            var n = this,
                                r = {};
                            this.each(function(i) {
                                n.eachCells(i, function(o) {
                                    var a = parseInt(i, 10),
                                        c = parseInt(o, 10);
                                    t.includes(i, o) &&
                                        ((a = e.sri + (a - t.sri)), (c = e.sci + (c - t.sci))),
                                        (r[a] = r[a] || { cells: {} }),
                                        (r[a].cells[c] = n._[i].cells[o]);
                                });
                            }),
                                (this._ = r);
                        },
                    },
                    {
                        key: 'paste',
                        value: function(t, e) {
                            var n = this;
                            if (!(t.length <= 0)) {
                                var r = e.sri,
                                    i = e.sci;
                                t.forEach(function(t, e) {
                                    var o = r + e;
                                    t.forEach(function(t, e) {
                                        var r = i + e;
                                        n.setCellText(o, r, t);
                                    });
                                });
                            }
                        },
                    },
                    {
                        key: 'insert',
                        value: function(t) {
                            var e = this,
                                n =
                                    arguments.length > 1 && void 0 !== arguments[1]
                                        ? arguments[1]
                                        : 1,
                                r = {};
                            this.each(function(i, o) {
                                var a = parseInt(i, 10);
                                a >= t &&
                                    ((a += n),
                                    e.eachCells(i, function(e, r) {
                                        r.text &&
                                            '=' === r.text[0] &&
                                            (r.text = r.text.replace(/[a-zA-Z]{1,3}\d+/g, function(
                                                e,
                                            ) {
                                                return v(e, 0, n, function(e, n) {
                                                    return n >= t;
                                                });
                                            }));
                                    })),
                                    (r[a] = o);
                            }),
                                (this._ = r),
                                (this.len += n);
                        },
                    },
                    {
                        key: 'delete',
                        value: function(t, e) {
                            var n = this,
                                r = e - t + 1,
                                i = {};
                            this.each(function(o, a) {
                                var c = parseInt(o, 10);
                                c < t
                                    ? (i[c] = a)
                                    : o > e &&
                                      ((i[c - r] = a),
                                      n.eachCells(o, function(t, n) {
                                          n.text &&
                                              '=' === n.text[0] &&
                                              (n.text = n.text.replace(
                                                  /[a-zA-Z]{1,3}\d+/g,
                                                  function(t) {
                                                      return v(t, 0, -r, function(t, n) {
                                                          return n > e;
                                                      });
                                                  },
                                              ));
                                      }));
                            }),
                                (this._ = i),
                                (this.len -= r);
                        },
                    },
                    {
                        key: 'insertColumn',
                        value: function(t) {
                            var e = this,
                                n =
                                    arguments.length > 1 && void 0 !== arguments[1]
                                        ? arguments[1]
                                        : 1;
                            this.each(function(r, i) {
                                var o = {};
                                e.eachCells(r, function(e, r) {
                                    var i = parseInt(e, 10);
                                    i >= t &&
                                        ((i += n),
                                        r.text &&
                                            '=' === r.text[0] &&
                                            (r.text = r.text.replace(/[a-zA-Z]{1,3}\d+/g, function(
                                                e,
                                            ) {
                                                return v(e, n, 0, function(e) {
                                                    return e >= t;
                                                });
                                            }))),
                                        (o[i] = r);
                                }),
                                    (i.cells = o);
                            });
                        },
                    },
                    {
                        key: 'deleteColumn',
                        value: function(t, e) {
                            var n = this,
                                r = e - t + 1;
                            this.each(function(i, o) {
                                var a = {};
                                n.eachCells(i, function(n, i) {
                                    var o = parseInt(n, 10);
                                    o < t
                                        ? (a[o] = i)
                                        : o > e &&
                                          ((a[o - r] = i),
                                          i.text &&
                                              '=' === i.text[0] &&
                                              (i.text = i.text.replace(
                                                  /[a-zA-Z]{1,3}\d+/g,
                                                  function(t) {
                                                      return v(t, -r, 0, function(t) {
                                                          return t > e;
                                                      });
                                                  },
                                              )));
                                }),
                                    (o.cells = a);
                            });
                        },
                    },
                    {
                        key: 'deleteCells',
                        value: function(t) {
                            var e = this,
                                n =
                                    arguments.length > 1 && void 0 !== arguments[1]
                                        ? arguments[1]
                                        : 'all';
                            t.each(function(t, r) {
                                e.deleteCell(t, r, n);
                            });
                        },
                    },
                    {
                        key: 'deleteCell',
                        value: function(t, e) {
                            var n =
                                    arguments.length > 2 && void 0 !== arguments[2]
                                        ? arguments[2]
                                        : 'all',
                                r = this.get(t);
                            if (null !== r) {
                                var i = this.getCell(t, e);
                                null !== i &&
                                    ('all' === n
                                        ? delete r.cells[e]
                                        : 'text' === n
                                        ? (i.text && delete i.text, i.value && delete i.value)
                                        : 'format' === n
                                        ? (void 0 !== i.style && delete i.style,
                                          i.merge && delete i.merge)
                                        : 'merge' === n && i.merge && delete i.merge);
                            }
                        },
                    },
                    {
                        key: 'maxCell',
                        value: function() {
                            var t = Object.keys(this._),
                                e = t[t.length - 1],
                                n = this._[e];
                            if (n) {
                                var r = n.cells,
                                    i = Object.keys(r),
                                    o = i[i.length - 1];
                                return [parseInt(e, 10), parseInt(o, 10)];
                            }
                            return [0, 0];
                        },
                    },
                    {
                        key: 'each',
                        value: function(t) {
                            Object.entries(this._).forEach(function(e) {
                                var n = q(e, 2),
                                    r = n[0],
                                    i = n[1];
                                t(r, i);
                            });
                        },
                    },
                    {
                        key: 'eachCells',
                        value: function(t, e) {
                            this._[t] &&
                                this._[t].cells &&
                                Object.entries(this._[t].cells).forEach(function(t) {
                                    var n = q(t, 2),
                                        r = n[0],
                                        i = n[1];
                                    e(r, i);
                                });
                        },
                    },
                    {
                        key: 'setData',
                        value: function(t) {
                            t.len && ((this.len = t.len), delete t.len), (this._ = t);
                        },
                    },
                    {
                        key: 'getData',
                        value: function() {
                            var t = this.len;
                            return Object.assign({ len: t }, this._);
                        },
                    },
                ]) && $(e.prototype, n),
                r && $(e, r),
                t
            );
        })();
        function L(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var X = (function() {
            function t(e) {
                var n = e.len,
                    r = e.width,
                    i = e.indexWidth,
                    o = e.minWidth;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this._ = {}),
                    (this.len = n),
                    (this.width = r),
                    (this.indexWidth = i),
                    (this.minWidth = o);
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'setData',
                        value: function(t) {
                            t.len && ((this.len = t.len), delete t.len), (this._ = t);
                        },
                    },
                    {
                        key: 'getData',
                        value: function() {
                            var t = this.len;
                            return Object.assign({ len: t }, this._);
                        },
                    },
                    {
                        key: 'getWidth',
                        value: function(t) {
                            if (this.isHide(t)) return 0;
                            var e = this._[t];
                            return e && e.width ? e.width : this.width;
                        },
                    },
                    {
                        key: 'getOrNew',
                        value: function(t) {
                            return (this._[t] = this._[t] || {}), this._[t];
                        },
                    },
                    {
                        key: 'setWidth',
                        value: function(t, e) {
                            this.getOrNew(t).width = e;
                        },
                    },
                    {
                        key: 'unhide',
                        value: function(t) {
                            for (var e = t; e > 0 && ((e -= 1), this.isHide(e)); )
                                this.setHide(e, !1);
                        },
                    },
                    {
                        key: 'isHide',
                        value: function(t) {
                            var e = this._[t];
                            return e && e.hide;
                        },
                    },
                    {
                        key: 'setHide',
                        value: function(t, e) {
                            var n = this.getOrNew(t);
                            !0 === e ? (n.hide = !0) : delete n.hide;
                        },
                    },
                    {
                        key: 'setStyle',
                        value: function(t, e) {
                            this.getOrNew(t).style = e;
                        },
                    },
                    {
                        key: 'sumWidth',
                        value: function(t, e) {
                            var n = this;
                            return V.rangeSum(t, e, function(t) {
                                return n.getWidth(t);
                            });
                        },
                    },
                    {
                        key: 'totalWidth',
                        value: function() {
                            return this.sumWidth(0, this.len);
                        },
                    },
                ]) && L(e.prototype, n),
                r && L(e, r),
                t
            );
        })();
        function Z(t, e) {
            var n;
            if ('undefined' == typeof Symbol || null == t[Symbol.iterator]) {
                if (
                    Array.isArray(t) ||
                    (n = (function(t, e) {
                        if (!t) return;
                        if ('string' == typeof t) return Y(t, e);
                        var n = Object.prototype.toString.call(t).slice(8, -1);
                        'Object' === n && t.constructor && (n = t.constructor.name);
                        if ('Map' === n || 'Set' === n) return Array.from(t);
                        if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                            return Y(t, e);
                    })(t)) ||
                    (e && t && 'number' == typeof t.length)
                ) {
                    n && (t = n);
                    var r = 0,
                        i = function() {};
                    return {
                        s: i,
                        n: function() {
                            return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
                        },
                        e: function(t) {
                            throw t;
                        },
                        f: i,
                    };
                }
                throw new TypeError(
                    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                );
            }
            var o,
                a = !0,
                c = !1;
            return {
                s: function() {
                    n = t[Symbol.iterator]();
                },
                n: function() {
                    var t = n.next();
                    return (a = t.done), t;
                },
                e: function(t) {
                    (c = !0), (o = t);
                },
                f: function() {
                    try {
                        a || null == n.return || n.return();
                    } finally {
                        if (c) throw o;
                    }
                },
            };
        }
        function Y(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        var K = ['en', 'zh-cn', 'de'],
            J = {
                en: {
                    toolbar: {
                        undo: 'Undo',
                        redo: 'Redo',
                        print: 'Print',
                        paintformat: 'Paint format',
                        clearformat: 'Clear format',
                        format: 'Format',
                        fontName: 'Font',
                        fontSize: 'Font size',
                        fontBold: 'Font bold',
                        fontItalic: 'Font italic',
                        underline: 'Underline',
                        strike: 'Strike',
                        color: 'Text color',
                        bgcolor: 'Fill color',
                        border: 'Borders',
                        merge: 'Merge cells',
                        align: 'Horizontal align',
                        valign: 'Vertical align',
                        textwrap: 'Text wrapping',
                        freeze: 'Freeze cell',
                        autofilter: 'Filter',
                        formula: 'Functions',
                        more: 'More',
                    },
                    contextmenu: {
                        copy: 'Copy',
                        cut: 'Cut',
                        paste: 'Paste',
                        pasteValue: 'Paste values only',
                        pasteFormat: 'Paste format only',
                        hide: 'Hide',
                        insertRow: 'Insert row',
                        insertColumn: 'Insert column',
                        deleteSheet: 'Delete',
                        deleteRow: 'Delete row',
                        deleteColumn: 'Delete column',
                        deleteCell: 'Delete cell',
                        deleteCellText: 'Delete cell text',
                        validation: 'Data validations',
                        cellprintable: 'Enable export',
                        cellnonprintable: 'Disable export',
                        celleditable: 'Enable editing',
                        cellnoneditable: 'Disable editing',
                    },
                    print: {
                        size: 'Paper size',
                        orientation: 'Page orientation',
                        orientations: ['Landscape', 'Portrait'],
                    },
                    format: {
                        normal: 'Normal',
                        text: 'Plain Text',
                        number: 'Number',
                        percent: 'Percent',
                        rmb: 'RMB',
                        usd: 'USD',
                        eur: 'EUR',
                        date: 'Date',
                        time: 'Time',
                        datetime: 'Date time',
                        duration: 'Duration',
                    },
                    formula: {
                        sum: 'Sum',
                        average: 'Average',
                        max: 'Max',
                        min: 'Min',
                        _if: 'IF',
                        and: 'AND',
                        or: 'OR',
                        concat: 'Concat',
                    },
                    validation: {
                        required: 'it must be required',
                        notMatch: 'it not match its validation rule',
                        between: 'it is between {} and {}',
                        notBetween: 'it is not between {} and {}',
                        notIn: 'it is not in list',
                        equal: 'it equal to {}',
                        notEqual: 'it not equal to {}',
                        lessThan: 'it less than {}',
                        lessThanEqual: 'it less than or equal to {}',
                        greaterThan: 'it greater than {}',
                        greaterThanEqual: 'it greater than or equal to {}',
                    },
                    error: { pasteForMergedCell: 'Unable to do this for merged cells' },
                    calendar: {
                        weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        months: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                    },
                    button: {
                        next: 'Next',
                        cancel: 'Cancel',
                        remove: 'Remove',
                        save: 'Save',
                        ok: 'OK',
                    },
                    sort: { desc: 'Sort Z -> A', asc: 'Sort A -> Z' },
                    filter: { empty: 'empty' },
                    dataValidation: {
                        mode: 'Mode',
                        range: 'Cell Range',
                        criteria: 'Criteria',
                        modeType: { cell: 'Cell', column: 'Colun', row: 'Row' },
                        type: {
                            list: 'List',
                            number: 'Number',
                            date: 'Date',
                            phone: 'Phone',
                            email: 'Email',
                        },
                        operator: {
                            be: 'between',
                            nbe: 'not betwwen',
                            lt: 'less than',
                            lte: 'less than or equal to',
                            gt: 'greater than',
                            gte: 'greater than or equal to',
                            eq: 'equal to',
                            neq: 'not equal to',
                        },
                    },
                },
                'zh-cn': {
                    toolbar: {
                        undo: '撤销',
                        redo: '恢复',
                        print: '打印',
                        paintformat: '格式刷',
                        clearformat: '清除格式',
                        format: '数据格式',
                        fontName: '字体',
                        fontSize: '字号',
                        fontBold: '加粗',
                        fontItalic: '倾斜',
                        underline: '下划线',
                        strike: '删除线',
                        color: '字体颜色',
                        bgcolor: '填充颜色',
                        border: '边框',
                        merge: '合并单元格',
                        align: '水平对齐',
                        valign: '垂直对齐',
                        textwrap: '自动换行',
                        freeze: '冻结',
                        autofilter: '自动筛选',
                        formula: '函数',
                        more: '更多',
                    },
                    contextmenu: {
                        copy: '复制',
                        cut: '剪切',
                        paste: '粘贴',
                        pasteValue: '粘贴数据',
                        pasteFormat: '粘贴格式',
                        hide: '隐藏',
                        insertRow: '插入行',
                        insertColumn: '插入列',
                        deleteSheet: '删除',
                        deleteRow: '删除行',
                        deleteColumn: '删除列',
                        deleteCell: '删除',
                        deleteCellText: '删除数据',
                        validation: '数据验证',
                        cellprintable: '可打印',
                        cellnonprintable: '不可打印',
                        celleditable: '可编辑',
                        cellnoneditable: '不可编辑',
                    },
                    print: {
                        size: '纸张大小',
                        orientation: '方向',
                        orientations: ['横向', '纵向'],
                    },
                    format: {
                        normal: '正常',
                        text: '文本',
                        number: '数值',
                        percent: '百分比',
                        rmb: '人民币',
                        usd: '美元',
                        eur: '欧元',
                        date: '短日期',
                        time: '时间',
                        datetime: '长日期',
                        duration: '持续时间',
                    },
                    formula: {
                        sum: '求和',
                        average: '求平均值',
                        max: '求最大值',
                        min: '求最小值',
                        concat: '字符拼接',
                        _if: '条件判断',
                        and: '和',
                        or: '或',
                    },
                    validation: {
                        required: '此值必填',
                        notMatch: '此值不匹配验证规则',
                        between: '此值应在 {} 和 {} 之间',
                        notBetween: '此值不应在 {} 和 {} 之间',
                        notIn: '此值不在列表中',
                        equal: '此值应该等于 {}',
                        notEqual: '此值不应该等于 {}',
                        lessThan: '此值应该小于 {}',
                        lessThanEqual: '此值应该小于等于 {}',
                        greaterThan: '此值应该大于 {}',
                        greaterThanEqual: '此值应该大于等于 {}',
                    },
                    error: { pasteForMergedCell: '无法对合并的单元格执行此操作' },
                    calendar: {
                        weeks: ['日', '一', '二', '三', '四', '五', '六'],
                        months: [
                            '一月',
                            '二月',
                            '三月',
                            '四月',
                            '五月',
                            '六月',
                            '七月',
                            '八月',
                            '九月',
                            '十月',
                            '十一月',
                            '十二月',
                        ],
                    },
                    button: {
                        next: '下一步',
                        cancel: '取消',
                        remove: '删除',
                        save: '保存',
                        ok: '确认',
                    },
                    sort: { desc: '降序', asc: '升序' },
                    filter: { empty: '空白' },
                    dataValidation: {
                        mode: '模式',
                        range: '单元区间',
                        criteria: '条件',
                        modeType: { cell: '单元格', column: '列模式', row: '行模式' },
                        type: {
                            list: '列表',
                            number: '数字',
                            date: '日期',
                            phone: '手机号',
                            email: '电子邮件',
                        },
                        operator: {
                            be: '在区间',
                            nbe: '不在区间',
                            lt: '小于',
                            lte: '小于等于',
                            gt: '大于',
                            gte: '大于等于',
                            eq: '等于',
                            neq: '不等于',
                        },
                    },
                },
                de: {
                    toolbar: {
                        undo: 'Rückgängig machen',
                        redo: 'Wiederherstellen',
                        paintformat: 'Format kopieren/einfügen',
                        clearformat: 'Format löschen',
                        format: 'Format',
                        font: 'Schriftart',
                        fontSize: 'Schriftgrad',
                        fontBold: 'Fett',
                        fontItalic: 'Kursiv',
                        underline: 'Betonen',
                        strike: 'Streichen',
                        textColor: 'Text Farbe',
                        fillColor: 'Füllung Farbe',
                        border: 'Umrandung',
                        merge: 'Zellen verbinden',
                        align: 'Waagrechte Ausrichtung',
                        valign: 'Vertikale uitlijning',
                        textwrap: 'Textumbruch',
                        freeze: 'Zelle sperren',
                        formula: 'Funktionen',
                        more: 'Mehr',
                    },
                    contextmenu: {
                        copy: 'Kopieren',
                        cut: 'Ausschneiden',
                        paste: 'Einfügen',
                        pasteValue: 'Nur Werte einfügen',
                        pasteFormat: 'Nur Format einfügen',
                        insertRow: 'Zeile einfügen',
                        insertColumn: 'Spalte einfügen',
                        deleteRow: 'Zeile löschen',
                        deleteColumn: 'Spalte löschen',
                        deleteCell: 'Zelle löschen',
                        deleteCellText: 'Zellentext löschen',
                    },
                    format: {
                        normal: 'Regulär',
                        text: 'Text',
                        number: 'Nummer',
                        percent: 'Prozent',
                        rmb: 'RMB',
                        usd: 'USD',
                        date: 'Datum',
                        time: 'Termin',
                        datetime: 'Datum Termin',
                        duration: 'Dauer',
                    },
                    formula: {
                        sum: 'Summe',
                        average: 'Durchschnittliche',
                        max: 'Max',
                        min: 'Min',
                        concat: 'Concat',
                    },
                },
            };
        function G(t, e) {
            if (e) {
                var n,
                    r = Z(K);
                try {
                    for (r.s(); !(n = r.n()).done; ) {
                        var i = n.value;
                        if (!e[i]) break;
                        for (
                            var o = e[i], a = t.match(/(?:\\.|[^.])+/g), c = 0;
                            c < a.length;
                            c += 1
                        ) {
                            var l = o[a[c]];
                            if (!l) break;
                            if (c === a.length - 1) return l;
                            o = l;
                        }
                    }
                } catch (t) {
                    r.e(t);
                } finally {
                    r.f();
                }
            }
        }
        function Q(t) {
            var e = G(t, J);
            return (
                !e &&
                    window &&
                    window.x_spreadsheet &&
                    window.x_spreadsheet.$messages &&
                    (e = G(t, window.x_spreadsheet.$messages)),
                e || ''
            );
        }
        function tt(t) {
            return function() {
                return Q(t);
            };
        }
        function et(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            console.log(t, e, n), n ? (K = [t]) : K.unshift(t), e && (J[t] = e);
        }
        function nt(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return rt(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return rt(t, e);
                })(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function rt(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function it(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var ot = { phone: /^[1-9]\d{10}$/, email: /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/ };
        function at(t, e) {
            var n = '';
            if (!t) {
                for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++)
                    i[o - 2] = arguments[o];
                n = Q.apply(void 0, ['validation.'.concat(e)].concat(i));
            }
            return [t, n];
        }
        var ct = (function() {
            function t(e, n, r, i) {
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.required = n),
                    (this.value = r),
                    (this.type = e),
                    (this.operator = i),
                    (this.message = '');
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'parseValue',
                        value: function(t) {
                            var e = this.type;
                            return 'date' === e ? new Date(t) : 'number' === e ? Number(t) : t;
                        },
                    },
                    {
                        key: 'equals',
                        value: function(t) {
                            var e =
                                this.type === t.type &&
                                this.required === t.required &&
                                this.operator === t.operator;
                            return (
                                e &&
                                    (e = Array.isArray(this.value)
                                        ? V.arrayEquals(this.value, t.value)
                                        : this.value === t.value),
                                e
                            );
                        },
                    },
                    {
                        key: 'values',
                        value: function() {
                            return this.value.split(',');
                        },
                    },
                    {
                        key: 'validate',
                        value: function(t) {
                            var e = this.required,
                                n = this.operator,
                                r = this.value,
                                i = this.type;
                            if (e && /^\s*$/.test(t)) return at(!1, 'required');
                            if (/^\s*$/.test(t)) return [!0];
                            if (ot[i] && !ot[i].test(t)) return at(!1, 'notMatch');
                            if ('list' === i) return at(this.values().includes(t), 'notIn');
                            if (n) {
                                var o = this.parseValue(t);
                                if ('be' === n) {
                                    var a = nt(r, 2),
                                        c = a[0],
                                        l = a[1];
                                    return at(
                                        o >= this.parseValue(c) && o <= this.parseValue(l),
                                        'between',
                                        c,
                                        l,
                                    );
                                }
                                if ('nbe' === n) {
                                    var u = nt(r, 2),
                                        s = u[0],
                                        f = u[1];
                                    return at(
                                        o < this.parseValue(s) || o > this.parseValue(f),
                                        'notBetween',
                                        s,
                                        f,
                                    );
                                }
                                if ('eq' === n) return at(o === this.parseValue(r), 'equal', r);
                                if ('neq' === n) return at(o !== this.parseValue(r), 'notEqual', r);
                                if ('lt' === n) return at(o < this.parseValue(r), 'lessThan', r);
                                if ('lte' === n)
                                    return at(o <= this.parseValue(r), 'lessThanEqual', r);
                                if ('gt' === n) return at(o > this.parseValue(r), 'greaterThan', r);
                                if ('gte' === n)
                                    return at(o >= this.parseValue(r), 'greaterThanEqual', r);
                            }
                            return [!0];
                        },
                    },
                ]) && it(e.prototype, n),
                r && it(e, r),
                t
            );
        })();
        function lt(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return ut(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return ut(t, e);
                })(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function ut(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function st(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function ft(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function ht(t, e, n) {
            return e && ft(t.prototype, e), n && ft(t, n), t;
        }
        var yt = (function() {
                function t(e, n, r) {
                    st(this, t), (this.refs = n), (this.mode = e), (this.validator = r);
                }
                return (
                    ht(
                        t,
                        [
                            {
                                key: 'includes',
                                value: function(t, e) {
                                    for (var n = this.refs, r = 0; r < n.length; r += 1) {
                                        if (k.valueOf(n[r]).includes(t, e)) return !0;
                                    }
                                    return !1;
                                },
                            },
                            {
                                key: 'addRef',
                                value: function(t) {
                                    this.remove(k.valueOf(t)), this.refs.push(t);
                                },
                            },
                            {
                                key: 'remove',
                                value: function(t) {
                                    var e = [];
                                    this.refs.forEach(function(n) {
                                        var r = k.valueOf(n);
                                        r.intersects(t)
                                            ? r.difference(t).forEach(function(t) {
                                                  return e.push(t.toString());
                                              })
                                            : e.push(n);
                                    }),
                                        (this.refs = e);
                                },
                            },
                            {
                                key: 'getData',
                                value: function() {
                                    var t = this.refs,
                                        e = this.mode,
                                        n = this.validator;
                                    return {
                                        refs: t,
                                        mode: e,
                                        type: n.type,
                                        required: n.required,
                                        operator: n.operator,
                                        value: n.value,
                                    };
                                },
                            },
                        ],
                        [
                            {
                                key: 'valueOf',
                                value: function(e) {
                                    var n = e.refs,
                                        r = e.mode,
                                        i = e.type,
                                        o = e.required,
                                        a = e.operator,
                                        c = e.value;
                                    return new t(r, n, new ct(i, o, c, a));
                                },
                            },
                        ],
                    ),
                    t
                );
            })(),
            pt = (function() {
                function t() {
                    st(this, t), (this._ = []), (this.errors = new Map());
                }
                return (
                    ht(t, [
                        {
                            key: 'getError',
                            value: function(t, e) {
                                return this.errors.get(''.concat(t, '_').concat(e));
                            },
                        },
                        {
                            key: 'validate',
                            value: function(t, e, n) {
                                var r = this.get(t, e),
                                    i = ''.concat(t, '_').concat(e),
                                    o = this.errors;
                                if (null !== r) {
                                    var a = lt(r.validator.validate(n), 2),
                                        c = a[0],
                                        l = a[1];
                                    c ? o.delete(i) : o.set(i, l);
                                } else o.delete(i);
                                return !0;
                            },
                        },
                        {
                            key: 'add',
                            value: function(t, e, n) {
                                var r = n.type,
                                    i = n.required,
                                    o = n.value,
                                    a = n.operator,
                                    c = new ct(r, i, o, a),
                                    l = this.getByValidator(c);
                                null !== l ? l.addRef(e) : this._.push(new yt(t, [e], c));
                            },
                        },
                        {
                            key: 'getByValidator',
                            value: function(t) {
                                for (var e = 0; e < this._.length; e += 1) {
                                    var n = this._[e];
                                    if (n.validator.equals(t)) return n;
                                }
                                return null;
                            },
                        },
                        {
                            key: 'get',
                            value: function(t, e) {
                                for (var n = 0; n < this._.length; n += 1) {
                                    var r = this._[n];
                                    if (r.includes(t, e)) return r;
                                }
                                return null;
                            },
                        },
                        {
                            key: 'remove',
                            value: function(t) {
                                this.each(function(e) {
                                    e.remove(t);
                                });
                            },
                        },
                        {
                            key: 'each',
                            value: function(t) {
                                this._.forEach(function(e) {
                                    return t(e);
                                });
                            },
                        },
                        {
                            key: 'getData',
                            value: function() {
                                return this._.filter(function(t) {
                                    return t.refs.length > 0;
                                }).map(function(t) {
                                    return t.getData();
                                });
                            },
                        },
                        {
                            key: 'setData',
                            value: function(t) {
                                this._ = t.map(function(t) {
                                    return yt.valueOf(t);
                                });
                            },
                        },
                    ]),
                    t
                );
            })();
        function dt(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return gt(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                mt(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function vt(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function bt(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                mt(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function mt(t, e) {
            if (t) {
                if ('string' == typeof t) return gt(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return (
                    'Object' === n && t.constructor && (n = t.constructor.name),
                    'Map' === n || 'Set' === n
                        ? Array.from(t)
                        : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                        ? gt(t, e)
                        : void 0
                );
            }
        }
        function gt(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        var wt = {
            mode: 'edit',
            view: {
                height: function() {
                    return document.documentElement.clientHeight;
                },
                width: function() {
                    return document.documentElement.clientWidth;
                },
            },
            showGrid: !0,
            showToolbar: !0,
            showContextmenu: !0,
            row: { len: 100, height: 25 },
            col: { len: 26, width: 100, indexWidth: 60, minWidth: 60 },
            style: {
                bgcolor: '#151619',
                align: 'left',
                valign: 'middle',
                textwrap: !1,
                strike: !1,
                underline: !1,
                color: '#fff',
                font: { name: 'Arial', size: 10, bold: !1, italic: !1 },
                format: 'normal',
            },
        };
        function kt(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {},
                r = this.merges,
                i = e.clone(),
                o = t.size(),
                a = bt(o, 2),
                c = a[0],
                l = a[1],
                u = e.size(),
                s = bt(u, 2),
                f = s[0],
                h = s[1];
            return (
                c > f && (i.eri = e.sri + c - 1),
                l > h && (i.eci = e.sci + l - 1),
                !r.intersects(i) || (n(Q('error.pasteForMergedCell')), !1)
            );
        }
        function St(t, e, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                i = this.rows,
                o = this.merges;
            ('all' !== n && 'format' !== n) || (i.deleteCells(e, n), o.deleteWithin(e)),
                i.copyPaste(t, e, n, r, function(t, e, n) {
                    if (n && n.merge) {
                        var r = bt(n.merge, 2),
                            i = r[0],
                            a = r[1];
                        if (i <= 0 && a <= 0) return;
                        o.add(new k(t, e, t + i, e + a));
                    }
                });
        }
        function Ot(t, e) {
            var n = this.clipboard,
                r = this.rows,
                i = this.merges;
            r.cutPaste(t, e), i.move(t, e.sri - t.sri, e.sci - t.sci), n.clear();
        }
        function xt(t, e, n) {
            var r = this.styles,
                i = this.rows.getCellOrNew(t, e),
                o = {};
            void 0 !== i.style && (o = V.cloneDeep(r[i.style])),
                (o = V.merge(o, { border: n })),
                (i.style = this.addStyle(o));
        }
        function jt(t) {
            var e = this,
                n = t.mode,
                r = t.style,
                i = t.color,
                o = this.styles,
                a = this.selector,
                c = this.rows,
                l = a.range,
                u = l.sri,
                s = l.sci,
                f = l.eri,
                h = l.eci,
                y = !this.isSignleSelected();
            if (y || ('inside' !== n && 'horizontal' !== n && 'vertical' !== n))
                if ('outside' !== n || y) {
                    if ('none' === n)
                        a.range.each(function(t, n) {
                            var r = c.getCell(t, n);
                            if (r && void 0 !== r.style) {
                                var i = V.cloneDeep(o[r.style]);
                                delete i.border, (r.style = e.addStyle(i));
                            }
                        });
                    else if (
                        'all' === n ||
                        'inside' === n ||
                        'outside' === n ||
                        'horizontal' === n ||
                        'vertical' === n
                    )
                        !(function() {
                            for (var t = [], o = u; o <= f; o += 1)
                                for (var a = s; a <= h; a += 1) {
                                    for (var l = [], p = 0; p < t.length; p += 1) {
                                        var d = bt(t[p], 4),
                                            v = d[0],
                                            b = d[1],
                                            m = d[2],
                                            g = d[3];
                                        if (
                                            (o === v + m + 1 && l.push(p),
                                            v <= o && o <= v + m && a === b)
                                        ) {
                                            a += g + 1;
                                            break;
                                        }
                                    }
                                    if (
                                        (l.forEach(function(e) {
                                            return t.splice(e, 1);
                                        }),
                                        a > h)
                                    )
                                        break;
                                    var w = c.getCell(o, a),
                                        k = 0,
                                        S = 0;
                                    if (w && w.merge) {
                                        var O = bt(w.merge, 2);
                                        (k = O[0]), (S = O[1]), t.push([o, a, k, S]);
                                    }
                                    var x = k > 0 && o + k === f,
                                        j = S > 0 && a + S === h,
                                        E = {};
                                    'all' === n
                                        ? (E = {
                                              bottom: [r, i],
                                              top: [r, i],
                                              left: [r, i],
                                              right: [r, i],
                                          })
                                        : 'inside' === n
                                        ? (!j && a < h && (E.right = [r, i]),
                                          !x && o < f && (E.bottom = [r, i]))
                                        : 'horizontal' === n
                                        ? !x && o < f && (E.bottom = [r, i])
                                        : 'vertical' === n
                                        ? !j && a < h && (E.right = [r, i])
                                        : 'outside' === n &&
                                          y &&
                                          (u === o && (E.top = [r, i]),
                                          (x || f === o) && (E.bottom = [r, i]),
                                          s === a && (E.left = [r, i]),
                                          (j || h === a) && (E.right = [r, i])),
                                        Object.keys(E).length > 0 && xt.call(e, o, a, E),
                                        (a += S);
                                }
                        })();
                    else if ('top' === n || 'bottom' === n)
                        for (var p = s; p <= h; p += 1)
                            'top' === n &&
                                (xt.call(this, u, p, { top: [r, i] }),
                                (p += c.getCellMerge(u, p)[1])),
                                'bottom' === n &&
                                    (xt.call(this, f, p, { bottom: [r, i] }),
                                    (p += c.getCellMerge(f, p)[1]));
                    else if ('left' === n || 'right' === n)
                        for (var d = u; d <= f; d += 1)
                            'left' === n &&
                                (xt.call(this, d, s, { left: [r, i] }),
                                (d += c.getCellMerge(d, s)[0])),
                                'right' === n &&
                                    (xt.call(this, d, h, { right: [r, i] }),
                                    (d += c.getCellMerge(d, h)[0]));
                } else
                    xt.call(this, u, s, {
                        top: [r, i],
                        bottom: [r, i],
                        left: [r, i],
                        right: [r, i],
                    });
        }
        function Et(t, e) {
            var n = this.rows,
                r = this.freezeTotalHeight(),
                i = n.height;
            r + n.height < t && (i -= e);
            for (
                var o = this.exceptRowSet, a = 0, c = i, l = n.height;
                a < n.len && !(c > t);
                a += 1
            )
                o.has(a) || (c += l = n.getHeight(a));
            return (c -= l) <= 0 ? { ri: -1, top: 0, height: l } : { ri: a - 1, top: c, height: l };
        }
        function Rt(t, e) {
            var n = this.cols,
                r = this.freezeTotalWidth(),
                i = n.indexWidth;
            r + n.indexWidth < t && (i -= e);
            var o = bt(
                    V.rangeReduceIf(0, n.len, i, n.indexWidth, t, function(t) {
                        return n.getWidth(t);
                    }),
                    3,
                ),
                a = o[0],
                c = o[1],
                l = o[2];
            return c <= 0
                ? { ci: -1, left: 0, width: n.indexWidth }
                : { ci: a - 1, left: c, width: l };
        }
        var _t = (function() {
            function t(e, n) {
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.settings = V.merge(wt, n || {})),
                    (this.name = e || 'sheet'),
                    (this.freeze = [0, 0]),
                    (this.styles = []),
                    (this.merges = new H()),
                    (this.rows = new B(this.settings.row)),
                    (this.cols = new X(this.settings.col)),
                    (this.validations = new pt()),
                    (this.hyperlinks = {}),
                    (this.comments = {}),
                    (this.selector = new O()),
                    (this.scroll = new x()),
                    (this.history = new E()),
                    (this.clipboard = new _()),
                    (this.autoFilter = new D()),
                    (this.change = function() {}),
                    (this.exceptRowSet = new Set()),
                    (this.sortedRowMap = new Map()),
                    (this.unsortedRowMap = new Map());
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'addValidation',
                        value: function(t, e, n) {
                            var r = this;
                            this.changeData(function() {
                                r.validations.add(t, e, n);
                            });
                        },
                    },
                    {
                        key: 'removeValidation',
                        value: function() {
                            var t = this,
                                e = this.selector.range;
                            this.changeData(function() {
                                t.validations.remove(e);
                            });
                        },
                    },
                    {
                        key: 'getSelectedValidator',
                        value: function() {
                            var t = this.selector,
                                e = t.ri,
                                n = t.ci,
                                r = this.validations.get(e, n);
                            return r ? r.validator : null;
                        },
                    },
                    {
                        key: 'getSelectedValidation',
                        value: function() {
                            var t = this.selector,
                                e = t.ri,
                                n = t.ci,
                                r = t.range,
                                i = this.validations.get(e, n),
                                o = { ref: r.toString() };
                            return (
                                null !== i && ((o.mode = i.mode), (o.validator = i.validator)), o
                            );
                        },
                    },
                    {
                        key: 'canUndo',
                        value: function() {
                            return this.history.canUndo();
                        },
                    },
                    {
                        key: 'canRedo',
                        value: function() {
                            return this.history.canRedo();
                        },
                    },
                    {
                        key: 'undo',
                        value: function() {
                            var t = this;
                            this.history.undo(this.getData(), function(e) {
                                t.setData(e);
                            });
                        },
                    },
                    {
                        key: 'redo',
                        value: function() {
                            var t = this;
                            this.history.redo(this.getData(), function(e) {
                                t.setData(e);
                            });
                        },
                    },
                    {
                        key: 'copy',
                        value: function() {
                            this.clipboard.copy(this.selector.range);
                        },
                    },
                    {
                        key: 'cut',
                        value: function() {
                            this.clipboard.cut(this.selector.range);
                        },
                    },
                    {
                        key: 'paste',
                        value: function() {
                            var t = this,
                                e =
                                    arguments.length > 0 && void 0 !== arguments[0]
                                        ? arguments[0]
                                        : 'all',
                                n =
                                    arguments.length > 1 && void 0 !== arguments[1]
                                        ? arguments[1]
                                        : function() {},
                                r = this.clipboard,
                                i = this.selector;
                            return (
                                !r.isClear() &&
                                !!kt.call(this, r.range, i.range, n) &&
                                (this.changeData(function() {
                                    r.isCopy()
                                        ? St.call(t, r.range, i.range, e)
                                        : r.isCut() && Ot.call(t, r.range, i.range);
                                }),
                                !0)
                            );
                        },
                    },
                    {
                        key: 'pasteFromText',
                        value: function(t) {
                            var e = t.split('\r\n').map(function(t) {
                                return t.replace(/"/g, '').split('\t');
                            });
                            e.length > 0 && (e.length -= 1);
                            var n = this.rows,
                                r = this.selector;
                            this.changeData(function() {
                                n.paste(e, r.range);
                            });
                        },
                    },
                    {
                        key: 'autofill',
                        value: function(t, e) {
                            var n = this,
                                r =
                                    arguments.length > 2 && void 0 !== arguments[2]
                                        ? arguments[2]
                                        : function() {},
                                i = this.selector.range;
                            return (
                                !!kt.call(this, i, t, r) &&
                                (this.changeData(function() {
                                    St.call(n, i, t, e, !0);
                                }),
                                !0)
                            );
                        },
                    },
                    {
                        key: 'clearClipboard',
                        value: function() {
                            this.clipboard.clear();
                        },
                    },
                    {
                        key: 'calSelectedRangeByEnd',
                        value: function(t, e) {
                            var n = this.selector,
                                r = this.rows,
                                i = this.cols,
                                o = this.merges,
                                a = n.range,
                                c = a.sri,
                                l = a.sci,
                                u = a.eri,
                                s = a.eci,
                                f = n.ri,
                                h = n.ci,
                                y = t,
                                p = e;
                            return (
                                t < 0 && (y = r.len - 1),
                                e < 0 && (p = i.len - 1),
                                y > f ? ((c = f), (u = y)) : ((c = y), (u = f)),
                                p > h ? ((l = h), (s = p)) : ((l = p), (s = h)),
                                (n.range = o.union(new k(c, l, u, s))),
                                (n.range = o.union(n.range)),
                                n.range
                            );
                        },
                    },
                    {
                        key: 'calSelectedRangeByStart',
                        value: function(t, e) {
                            var n = this.selector,
                                r = this.rows,
                                i = this.cols,
                                o = this.merges.getFirstIncludes(t, e);
                            return (
                                null === o &&
                                    ((o = new k(t, e, t, e)),
                                    -1 === t && ((o.sri = 0), (o.eri = r.len - 1)),
                                    -1 === e && ((o.sci = 0), (o.eci = i.len - 1))),
                                (n.range = o),
                                o
                            );
                        },
                    },
                    {
                        key: 'setSelectedCellAttr',
                        value: function(t, e) {
                            var n = this;
                            this.changeData(function() {
                                var r = n.selector,
                                    i = n.styles,
                                    o = n.rows;
                                if ('merge' === t) e ? n.merge() : n.unmerge();
                                else if ('border' === t) jt.call(n, e);
                                else if ('formula' === t) {
                                    var a = r.ri,
                                        c = r.ci,
                                        l = r.range;
                                    if (r.multiple()) {
                                        var u = bt(r.size(), 2),
                                            s = u[0],
                                            f = u[1],
                                            h = l.sri,
                                            y = l.sci,
                                            p = l.eri,
                                            v = l.eci;
                                        if (s > 1)
                                            for (var b = y; b <= v; b += 1)
                                                o.getCellOrNew(p + 1, b).text = '='
                                                    .concat(e, '(')
                                                    .concat(d(b, h), ':')
                                                    .concat(d(b, p), ')');
                                        else
                                            f > 1 &&
                                                (o.getCellOrNew(a, v + 1).text = '='
                                                    .concat(e, '(')
                                                    .concat(d(y, a), ':')
                                                    .concat(d(v, a), ')'));
                                    } else o.getCellOrNew(a, c).text = '='.concat(e, '()');
                                } else
                                    r.range.each(function(r, a) {
                                        var c = o.getCellOrNew(r, a),
                                            l = {};
                                        if (
                                            (void 0 !== c.style && (l = V.cloneDeep(i[c.style])),
                                            'format' === t)
                                        )
                                            (l.format = e), (c.style = n.addStyle(l));
                                        else if (
                                            'font-bold' === t ||
                                            'font-italic' === t ||
                                            'font-name' === t ||
                                            'font-size' === t
                                        ) {
                                            var u = {};
                                            (u[t.split('-')[1]] = e),
                                                (l.font = Object.assign(l.font || {}, u)),
                                                (c.style = n.addStyle(l));
                                        } else
                                            'strike' === t ||
                                            'textwrap' === t ||
                                            'underline' === t ||
                                            'align' === t ||
                                            'valign' === t ||
                                            'color' === t ||
                                            'bgcolor' === t
                                                ? ((l[t] = e), (c.style = n.addStyle(l)))
                                                : (c[t] = e);
                                    });
                            });
                        },
                    },
                    {
                        key: 'setSelectedCellText',
                        value: function(t) {
                            var e =
                                    arguments.length > 1 && void 0 !== arguments[1]
                                        ? arguments[1]
                                        : 'input',
                                n = this.autoFilter,
                                r = this.selector,
                                i = this.rows,
                                o = r.ri,
                                a = r.ci,
                                c = o;
                            this.unsortedRowMap.has(o) && (c = this.unsortedRowMap.get(o));
                            var l = i.getCell(c, a),
                                u = l ? l.text : '';
                            if ((this.setCellText(c, a, t, e), n.active())) {
                                var s = n.getFilter(a);
                                if (s) {
                                    var f = s.value.findIndex(function(t) {
                                        return t === u;
                                    });
                                    f >= 0 && s.value.splice(f, 1, t);
                                }
                            }
                        },
                    },
                    {
                        key: 'getSelectedCell',
                        value: function() {
                            var t = this.selector,
                                e = t.ri,
                                n = t.ci,
                                r = e;
                            return (
                                this.unsortedRowMap.has(e) && (r = this.unsortedRowMap.get(e)),
                                this.rows.getCell(r, n)
                            );
                        },
                    },
                    {
                        key: 'xyInSelectedRect',
                        value: function(t, e) {
                            var n = this.getSelectedRect(),
                                r = n.left,
                                i = n.top,
                                o = n.width,
                                a = n.height,
                                c = t - this.cols.indexWidth,
                                l = e - this.rows.height;
                            return c > r && c < r + o && l > i && l < i + a;
                        },
                    },
                    {
                        key: 'getSelectedRect',
                        value: function() {
                            return this.getRect(this.selector.range);
                        },
                    },
                    {
                        key: 'getClipboardRect',
                        value: function() {
                            var t = this.clipboard;
                            return t.isClear() ? { left: -100, top: -100 } : this.getRect(t.range);
                        },
                    },
                    {
                        key: 'getRect',
                        value: function(t) {
                            var e = this.scroll,
                                n = this.rows,
                                r = this.cols,
                                i = this.exceptRowSet,
                                o = t.sri,
                                a = t.sci,
                                c = t.eri,
                                l = t.eci;
                            if (o < 0 && a < 0) return { left: 0, l: 0, top: 0, t: 0, scroll: e };
                            var u = r.sumWidth(0, a),
                                s = n.sumHeight(0, o, i),
                                f = n.sumHeight(o, c + 1, i),
                                h = r.sumWidth(a, l + 1),
                                y = u - e.x,
                                p = s - e.y,
                                d = this.freezeTotalHeight(),
                                v = this.freezeTotalWidth();
                            return (
                                v > 0 && v > u && (y = u),
                                d > 0 && d > s && (p = s),
                                { l: u, t: s, left: y, top: p, height: f, width: h, scroll: e }
                            );
                        },
                    },
                    {
                        key: 'getCellRectByXY',
                        value: function(t, e) {
                            var n = this.scroll,
                                r = this.merges,
                                i = this.rows,
                                o = this.cols,
                                a = Et.call(this, e, n.y),
                                c = a.ri,
                                l = a.top,
                                u = a.height,
                                s = Rt.call(this, t, n.x),
                                f = s.ci,
                                h = s.left,
                                y = s.width;
                            if (
                                (-1 === f && (y = o.totalWidth()),
                                -1 === c && (u = i.totalHeight()),
                                c >= 0 || f >= 0)
                            ) {
                                var p = r.getFirstIncludes(c, f);
                                if (p) {
                                    (c = p.sri), (f = p.sci);
                                    var d = this.cellRect(c, f);
                                    (h = d.left), (l = d.top), (y = d.width), (u = d.height);
                                }
                            }
                            return { ri: c, ci: f, left: h, top: l, width: y, height: u };
                        },
                    },
                    {
                        key: 'isSignleSelected',
                        value: function() {
                            var t = this.selector.range,
                                e = t.sri,
                                n = t.sci,
                                r = t.eri,
                                i = t.eci,
                                o = this.getCell(e, n);
                            if (o && o.merge) {
                                var a = bt(o.merge, 2),
                                    c = a[0],
                                    l = a[1];
                                if (e + c === r && n + l === i) return !0;
                            }
                            return !this.selector.multiple();
                        },
                    },
                    {
                        key: 'canUnmerge',
                        value: function() {
                            var t = this.selector.range,
                                e = t.sri,
                                n = t.sci,
                                r = t.eri,
                                i = t.eci,
                                o = this.getCell(e, n);
                            if (o && o.merge) {
                                var a = bt(o.merge, 2),
                                    c = a[0],
                                    l = a[1];
                                if (e + c === r && n + l === i) return !0;
                            }
                            return !1;
                        },
                    },
                    {
                        key: 'merge',
                        value: function() {
                            var t = this,
                                e = this.selector,
                                n = this.rows;
                            if (!this.isSignleSelected()) {
                                var r = bt(e.size(), 2),
                                    i = r[0],
                                    o = r[1];
                                if (i > 1 || o > 1) {
                                    var a = e.range,
                                        c = a.sri,
                                        l = a.sci;
                                    this.changeData(function() {
                                        var r = n.getCellOrNew(c, l);
                                        (r.merge = [i - 1, o - 1]),
                                            t.merges.add(e.range),
                                            t.rows.deleteCells(e.range),
                                            t.rows.setCell(c, l, r);
                                    });
                                }
                            }
                        },
                    },
                    {
                        key: 'unmerge',
                        value: function() {
                            var t = this,
                                e = this.selector;
                            if (this.isSignleSelected()) {
                                var n = e.range,
                                    r = n.sri,
                                    i = n.sci;
                                this.changeData(function() {
                                    t.rows.deleteCell(r, i, 'merge'),
                                        t.merges.deleteWithin(e.range);
                                });
                            }
                        },
                    },
                    {
                        key: 'canAutofilter',
                        value: function() {
                            return !this.autoFilter.active();
                        },
                    },
                    {
                        key: 'autofilter',
                        value: function() {
                            var t = this,
                                e = this.autoFilter,
                                n = this.selector;
                            this.changeData(function() {
                                e.active()
                                    ? (e.clear(),
                                      (t.exceptRowSet = new Set()),
                                      (t.sortedRowMap = new Map()),
                                      (t.unsortedRowMap = new Map()))
                                    : (e.ref = n.range.toString());
                            });
                        },
                    },
                    {
                        key: 'setAutoFilter',
                        value: function(t, e, n, r) {
                            var i = this.autoFilter;
                            i.addFilter(t, n, r), i.setSort(t, e), this.resetAutoFilter();
                        },
                    },
                    {
                        key: 'resetAutoFilter',
                        value: function() {
                            var t = this,
                                e = this.autoFilter,
                                n = this.rows;
                            if (e.active()) {
                                var r = e.sort,
                                    i = e.filteredRows(function(t, e) {
                                        return n.getCell(t, e);
                                    }),
                                    o = i.rset,
                                    a = i.fset,
                                    c = Array.from(a),
                                    l = Array.from(a);
                                r &&
                                    c.sort(function(t, e) {
                                        return 'asc' === r.order
                                            ? t - e
                                            : 'desc' === r.order
                                            ? e - t
                                            : 0;
                                    }),
                                    (this.exceptRowSet = o),
                                    (this.sortedRowMap = new Map()),
                                    (this.unsortedRowMap = new Map()),
                                    c.forEach(function(e, n) {
                                        t.sortedRowMap.set(l[n], e), t.unsortedRowMap.set(e, l[n]);
                                    });
                            }
                        },
                    },
                    {
                        key: 'deleteCell',
                        value: function() {
                            var t = this,
                                e =
                                    arguments.length > 0 && void 0 !== arguments[0]
                                        ? arguments[0]
                                        : 'all',
                                n = this.selector;
                            this.changeData(function() {
                                t.rows.deleteCells(n.range, e),
                                    ('all' !== e && 'format' !== e) ||
                                        t.merges.deleteWithin(n.range);
                            });
                        },
                    },
                    {
                        key: 'insert',
                        value: function(t) {
                            var e = this,
                                n =
                                    arguments.length > 1 && void 0 !== arguments[1]
                                        ? arguments[1]
                                        : 1;
                            this.changeData(function() {
                                var r = e.selector.range,
                                    i = r.sri,
                                    o = r.sci,
                                    a = e.rows,
                                    c = e.merges,
                                    l = e.cols,
                                    u = i;
                                'row' === t
                                    ? a.insert(i, n)
                                    : 'column' === t &&
                                      (a.insertColumn(o, n), (u = o), (l.len += 1)),
                                    c.shift(t, u, n, function(t, e, n, r) {
                                        var i = a.getCell(t, e);
                                        (i.merge[0] += n), (i.merge[1] += r);
                                    });
                            });
                        },
                    },
                    {
                        key: 'delete',
                        value: function(t) {
                            var e = this;
                            this.changeData(function() {
                                var n = e.rows,
                                    r = e.merges,
                                    i = e.selector,
                                    o = e.cols,
                                    a = i.range,
                                    c = i.range,
                                    l = c.sri,
                                    u = c.sci,
                                    s = c.eri,
                                    f = c.eci,
                                    h = bt(i.range.size(), 2),
                                    y = h[0],
                                    p = h[1],
                                    d = l,
                                    v = y;
                                'row' === t
                                    ? n.delete(l, s)
                                    : 'column' === t &&
                                      (n.deleteColumn(u, f), (d = a.sci), (v = p), (o.len -= 1)),
                                    r.shift(t, d, -v, function(t, e, r, i) {
                                        var o = n.getCell(t, e);
                                        (o.merge[0] += r),
                                            (o.merge[1] += i),
                                            0 === o.merge[0] && 0 === o.merge[1] && delete o.merge;
                                    });
                            });
                        },
                    },
                    {
                        key: 'scrollx',
                        value: function(t, e) {
                            var n = this.scroll,
                                r = this.freeze,
                                i = this.cols,
                                o = bt(r, 2)[1],
                                a = bt(
                                    V.rangeReduceIf(o, i.len, 0, 0, t, function(t) {
                                        return i.getWidth(t);
                                    }),
                                    3,
                                ),
                                c = a[0],
                                l = a[1],
                                u = a[2],
                                s = l;
                            t > 0 && (s += u),
                                n.x !== s && ((n.ci = t > 0 ? c : 0), (n.x = s), e());
                        },
                    },
                    {
                        key: 'scrolly',
                        value: function(t, e) {
                            var n = this.scroll,
                                r = this.freeze,
                                i = this.rows,
                                o = bt(r, 1)[0],
                                a = bt(
                                    V.rangeReduceIf(o, i.len, 0, 0, t, function(t) {
                                        return i.getHeight(t);
                                    }),
                                    3,
                                ),
                                c = a[0],
                                l = a[1],
                                u = a[2],
                                s = l;
                            t > 0 && (s += u),
                                n.y !== s && ((n.ri = t > 0 ? c : 0), (n.y = s), e());
                        },
                    },
                    {
                        key: 'cellRect',
                        value: function(t, e) {
                            var n = this.rows,
                                r = this.cols,
                                i = r.sumWidth(0, e),
                                o = n.sumHeight(0, t),
                                a = n.getCell(t, e),
                                c = r.getWidth(e),
                                l = n.getHeight(t);
                            if (null !== a && a.merge) {
                                var u = bt(a.merge, 2),
                                    s = u[0],
                                    f = u[1];
                                if (s > 0) for (var h = 1; h <= s; h += 1) l += n.getHeight(t + h);
                                if (f > 0) for (var y = 1; y <= f; y += 1) c += r.getWidth(e + y);
                            }
                            return { left: i, top: o, width: c, height: l, cell: a };
                        },
                    },
                    {
                        key: 'getCell',
                        value: function(t, e) {
                            return this.rows.getCell(t, e);
                        },
                    },
                    {
                        key: 'getCellTextOrDefault',
                        value: function(t, e) {
                            var n = this.getCell(t, e);
                            return n && n.text ? n.text : '';
                        },
                    },
                    {
                        key: 'getCellStyle',
                        value: function(t, e) {
                            var n = this.getCell(t, e);
                            return n && void 0 !== n.style ? this.styles[n.style] : null;
                        },
                    },
                    {
                        key: 'getCellStyleOrDefault',
                        value: function(t, e) {
                            var n = this.styles,
                                r = this.rows.getCell(t, e),
                                i = r && void 0 !== r.style ? n[r.style] : {};
                            return V.merge(this.defaultStyle(), i);
                        },
                    },
                    {
                        key: 'getSelectedCellStyle',
                        value: function() {
                            var t = this.selector,
                                e = t.ri,
                                n = t.ci;
                            return this.getCellStyleOrDefault(e, n);
                        },
                    },
                    {
                        key: 'setCellText',
                        value: function(t, e, n, r) {
                            var i = this.rows,
                                o = this.history,
                                a = this.validations;
                            'finished' === r
                                ? (i.setCellText(t, e, ''),
                                  o.add(this.getData()),
                                  i.setCellText(t, e, n))
                                : (i.setCellText(t, e, n), this.change(this.getData())),
                                a.validate(t, e, n);
                        },
                    },
                    {
                        key: 'freezeIsActive',
                        value: function() {
                            var t = bt(this.freeze, 2),
                                e = t[0],
                                n = t[1];
                            return e > 0 || n > 0;
                        },
                    },
                    {
                        key: 'setFreeze',
                        value: function(t, e) {
                            var n = this;
                            this.changeData(function() {
                                n.freeze = [t, e];
                            });
                        },
                    },
                    {
                        key: 'freezeTotalWidth',
                        value: function() {
                            return this.cols.sumWidth(0, this.freeze[1]);
                        },
                    },
                    {
                        key: 'freezeTotalHeight',
                        value: function() {
                            return this.rows.sumHeight(0, this.freeze[0]);
                        },
                    },
                    {
                        key: 'setRowHeight',
                        value: function(t, e) {
                            var n = this;
                            this.changeData(function() {
                                n.rows.setHeight(t, e);
                            });
                        },
                    },
                    {
                        key: 'setColWidth',
                        value: function(t, e) {
                            var n = this;
                            this.changeData(function() {
                                n.cols.setWidth(t, e);
                            });
                        },
                    },
                    {
                        key: 'viewHeight',
                        value: function() {
                            var t = this.settings,
                                e = t.view,
                                n = t.showToolbar,
                                r = e.height();
                            return (r -= 41), n && (r -= 41), r;
                        },
                    },
                    {
                        key: 'viewWidth',
                        value: function() {
                            return this.settings.view.width();
                        },
                    },
                    {
                        key: 'freezeViewRange',
                        value: function() {
                            var t = bt(this.freeze, 2),
                                e = t[0],
                                n = t[1];
                            return new k(
                                0,
                                0,
                                e - 1,
                                n - 1,
                                this.freezeTotalWidth(),
                                this.freezeTotalHeight(),
                            );
                        },
                    },
                    {
                        key: 'contentRange',
                        value: function() {
                            var t = this.rows,
                                e = this.cols,
                                n = bt(t.maxCell(), 2),
                                r = n[0],
                                i = n[1],
                                o = t.sumHeight(0, r + 1),
                                a = e.sumWidth(0, i + 1);
                            return new k(0, 0, r, i, a, o);
                        },
                    },
                    {
                        key: 'exceptRowTotalHeight',
                        value: function(t, e) {
                            var n = this.exceptRowSet,
                                r = this.rows,
                                i = Array.from(n),
                                o = 0;
                            return (
                                i.forEach(function(n) {
                                    if (n < t || n > e) {
                                        var i = r.getHeight(n);
                                        o += i;
                                    }
                                }),
                                o
                            );
                        },
                    },
                    {
                        key: 'viewRange',
                        value: function() {
                            var t = this.scroll,
                                e = this.rows,
                                n = this.cols,
                                r = this.freeze,
                                i = this.exceptRowSet,
                                o = t.ri,
                                a = t.ci;
                            o <= 0 && (o = bt(r, 1)[0]), a <= 0 && (a = bt(r, 2)[1]);
                            for (
                                var c = 0, l = 0, u = [e.len, n.len], s = u[0], f = u[1], h = o;
                                h < e.len &&
                                (i.has(h) || ((l += e.getHeight(h)), (s = h)),
                                !(l > this.viewHeight()));
                                h += 1
                            );
                            for (
                                var y = a;
                                y < n.len && ((f = y), !((c += n.getWidth(y)) > this.viewWidth()));
                                y += 1
                            );
                            return new k(o, a, s, f, c, l);
                        },
                    },
                    {
                        key: 'eachMergesInView',
                        value: function(t, e) {
                            this.merges.filterIntersects(t).forEach(function(t) {
                                return e(t);
                            });
                        },
                    },
                    {
                        key: 'hideRowsOrCols',
                        value: function() {
                            var t = this.rows,
                                e = this.cols,
                                n = this.selector,
                                r = bt(n.size(), 2),
                                i = r[0],
                                o = r[1],
                                a = n.range,
                                c = a.sri,
                                l = a.sci,
                                u = a.eri,
                                s = a.eci;
                            if (i === t.len) for (var f = l; f <= s; f += 1) e.setHide(f, !0);
                            else if (o === e.len) for (var h = c; h <= u; h += 1) t.setHide(h, !0);
                        },
                    },
                    {
                        key: 'unhideRowsOrCols',
                        value: function(t, e) {
                            this[''.concat(t, 's')].unhide(e);
                        },
                    },
                    {
                        key: 'rowEach',
                        value: function(t, e, n) {
                            for (
                                var r = 0,
                                    i = this.rows,
                                    o = this.exceptRowSet,
                                    a = dt(o),
                                    c = 0,
                                    l = 0;
                                l < a.length;
                                l += 1
                            )
                                a[l] < t && (c += 1);
                            for (var u = t + c; u <= e + c; u += 1)
                                if (o.has(u)) c += 1;
                                else {
                                    var s = i.getHeight(u);
                                    if (s > 0 && (n(u, r, s), (r += s) > this.viewHeight())) break;
                                }
                        },
                    },
                    {
                        key: 'colEach',
                        value: function(t, e, n) {
                            for (var r = 0, i = this.cols, o = t; o <= e; o += 1) {
                                var a = i.getWidth(o);
                                if (a > 0 && (n(o, r, a), (r += a) > this.viewWidth())) break;
                            }
                        },
                    },
                    {
                        key: 'defaultStyle',
                        value: function() {
                            return this.settings.style;
                        },
                    },
                    {
                        key: 'addStyle',
                        value: function(t) {
                            for (var e = this.styles, n = 0; n < e.length; n += 1) {
                                var r = e[n];
                                if (V.equals(r, t)) return n;
                            }
                            return e.push(t), e.length - 1;
                        },
                    },
                    {
                        key: 'changeData',
                        value: function(t) {
                            this.history.add(this.getData()), t(), this.change(this.getData());
                        },
                    },
                    {
                        key: 'setData',
                        value: function(t) {
                            var e = this;
                            return (
                                Object.keys(t).forEach(function(n) {
                                    if (
                                        'merges' === n ||
                                        'rows' === n ||
                                        'cols' === n ||
                                        'validations' === n
                                    )
                                        e[n].setData(t[n]);
                                    else if ('freeze' === n) {
                                        var r = bt(p(t[n]), 2),
                                            i = r[0],
                                            o = r[1];
                                        e.freeze = [o, i];
                                    } else
                                        'autofilter' === n
                                            ? e.autoFilter.setData(t[n])
                                            : void 0 !== t[n] && (e[n] = t[n]);
                                }),
                                this
                            );
                        },
                    },
                    {
                        key: 'getData',
                        value: function() {
                            var t = this.name,
                                e = this.freeze,
                                n = this.styles,
                                r = this.merges,
                                i = this.rows,
                                o = this.cols,
                                a = this.validations,
                                c = this.autoFilter;
                            return {
                                name: t,
                                freeze: d(e[1], e[0]),
                                styles: n,
                                merges: r.getData(),
                                rows: i.getData(),
                                cols: o.getData(),
                                validations: a.getData(),
                                autofilter: c.getData(),
                            };
                        },
                    },
                ]) && vt(e.prototype, n),
                r && vt(e, r),
                t
            );
        })();
        function Ct(t, e, n) {
            t.addEventListener(e, n);
        }
        function At(t, e, n) {
            t.removeEventListener(e, n);
        }
        function Pt(t) {
            t.xclickoutside &&
                (At(window.document.body, 'click', t.xclickoutside), delete t.xclickoutside);
        }
        function Tt(t, e) {
            (t.xclickoutside = function(n) {
                2 === n.detail || t.contains(n.target) || (e ? e(t) : (t.hide(), Pt(t)));
            }),
                Ct(window.document.body, 'click', t.xclickoutside);
        }
        function It(t, e, n) {
            Ct(t, 'mousemove', e),
                (t.xEvtUp = function(r) {
                    At(t, 'mousemove', e), At(t, 'mouseup', t.xEvtUp), n(r);
                }),
                Ct(t, 'mouseup', t.xEvtUp);
        }
        function Dt(t, e, n, r) {
            Math.abs(t) > Math.abs(e)
                ? r(t > 0 ? 'right' : 'left', t, n)
                : r(e > 0 ? 'down' : 'up', e, n);
        }
        var zt = 'gqy-spreadsheet';
        window.devicePixelRatio;
        function Mt(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function Ht(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var Nt = (function() {
            function t() {
                var e = this,
                    n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    r = arguments.length > 1 ? arguments[1] : void 0;
                Mt(this, t),
                    (this.moving = !1),
                    (this.vertical = n),
                    (this.el = l(
                        'div',
                        ''.concat(zt, '-resizer ').concat(n ? 'vertical' : 'horizontal'),
                    )
                        .children(
                            (this.unhideHoverEl = l('div', ''.concat(zt, '-resizer-hover'))
                                .on('dblclick.stop', function(t) {
                                    return e.mousedblclickHandler(t);
                                })
                                .css('position', 'absolute')
                                .hide()),
                            (this.hoverEl = l('div', ''.concat(zt, '-resizer-hover')).on(
                                'mousedown.stop',
                                function(t) {
                                    return e.mousedownHandler(t);
                                },
                            )),
                            (this.lineEl = l('div', ''.concat(zt, '-resizer-line')).hide()),
                        )
                        .hide()),
                    (this.cRect = null),
                    (this.finishedFn = null),
                    (this.minDistance = r),
                    (this.unhideFn = function() {});
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'showUnhide',
                        value: function(t) {
                            (this.unhideIndex = t), this.unhideHoverEl.show();
                        },
                    },
                    {
                        key: 'hideUnhide',
                        value: function() {
                            this.unhideHoverEl.hide();
                        },
                    },
                    {
                        key: 'show',
                        value: function(t, e) {
                            var n = this.moving,
                                r = this.vertical,
                                i = this.hoverEl,
                                o = this.lineEl,
                                a = this.el,
                                c = this.unhideHoverEl;
                            if (!n) {
                                this.cRect = t;
                                var l = t.left,
                                    u = t.top,
                                    s = t.width,
                                    f = t.height;
                                a
                                    .offset({ left: r ? l + s - 5 : l, top: r ? u : u + f - 5 })
                                    .show(),
                                    i.offset({ width: r ? 5 : s, height: r ? f : 5 }),
                                    o.offset({ width: r ? 0 : e.width, height: r ? e.height : 0 }),
                                    c.offset({
                                        left: r ? 5 - s : l,
                                        top: r ? u : 5 - f,
                                        width: r ? 5 : s,
                                        height: r ? f : 5,
                                    });
                            }
                        },
                    },
                    {
                        key: 'hide',
                        value: function() {
                            this.el.offset({ left: 0, top: 0 }).hide(), this.hideUnhide();
                        },
                    },
                    {
                        key: 'mousedblclickHandler',
                        value: function() {
                            this.unhideIndex && this.unhideFn(this.unhideIndex);
                        },
                    },
                    {
                        key: 'mousedownHandler',
                        value: function(t) {
                            var e = this,
                                n = t,
                                r = this.el,
                                i = this.lineEl,
                                o = this.cRect,
                                a = this.vertical,
                                c = this.minDistance,
                                l = a ? o.width : o.height;
                            i.show(),
                                It(
                                    window,
                                    function(t) {
                                        (e.moving = !0),
                                            null !== n &&
                                                1 === t.buttons &&
                                                (a
                                                    ? (l += t.movementX) > c &&
                                                      r.css('left', ''.concat(o.left + l, 'px'))
                                                    : (l += t.movementY) > c &&
                                                      r.css('top', ''.concat(o.top + l, 'px')),
                                                (n = t));
                                    },
                                    function() {
                                        (n = null),
                                            i.hide(),
                                            (e.moving = !1),
                                            e.hide(),
                                            e.finishedFn && (l < c && (l = c), e.finishedFn(o, l));
                                    },
                                );
                        },
                    },
                ]) && Ht(e.prototype, n),
                r && Ht(e, r),
                t
            );
        })();
        function Ft(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var Wt = (function() {
            function t(e) {
                var n = this;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.vertical = e),
                    (this.moveFn = null),
                    (this.el = l(
                        'div',
                        ''.concat(zt, '-scrollbar ').concat(e ? 'vertical' : 'horizontal'),
                    )
                        .child((this.contentEl = l('div', '')))
                        .on('mousemove.stop', function() {})
                        .on('scroll.stop', function(t) {
                            var e = t.target,
                                r = e.scrollTop,
                                i = e.scrollLeft;
                            n.moveFn && n.moveFn(n.vertical ? r : i, t);
                        }));
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'move',
                        value: function(t) {
                            return this.el.scroll(t), this;
                        },
                    },
                    {
                        key: 'scroll',
                        value: function() {
                            return this.el.scroll();
                        },
                    },
                    {
                        key: 'set',
                        value: function(t, e) {
                            var n = t - 1;
                            if (e > n) {
                                var r = this.vertical ? 'height' : 'width';
                                this.el.css(r, ''.concat(n - 15, 'px')).show(),
                                    this.contentEl
                                        .css(this.vertical ? 'width' : 'height', '1px')
                                        .css(r, ''.concat(e, 'px'));
                            } else this.el.hide();
                            return this;
                        },
                    },
                ]) && Ft(e.prototype, n),
                r && Ft(e, r),
                t
            );
        })();
        function Vt(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function qt(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Ut(t, e, n) {
            return e && qt(t.prototype, e), n && qt(t, n), t;
        }
        var $t = 21,
            Bt = (function() {
                function t() {
                    var e = this,
                        n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    Vt(this, t),
                        (this.useHideInput = n),
                        (this.inputChange = function() {}),
                        (this.cornerEl = l('div', ''.concat(zt, '-selector-corner'))),
                        (this.areaEl = l('div', ''.concat(zt, '-selector-area'))
                            .child(this.cornerEl)
                            .hide()),
                        (this.clipboardEl = l('div', ''.concat(zt, '-selector-clipboard')).hide()),
                        (this.autofillEl = l('div', ''.concat(zt, '-selector-autofill')).hide()),
                        (this.el = l('div', ''.concat(zt, '-selector'))
                            .css('z-index', ''.concat($t))
                            .children(this.areaEl, this.clipboardEl, this.autofillEl)
                            .hide()),
                        n &&
                            ((this.hideInput = l('input', '').on('compositionend', function(t) {
                                e.inputChange(t.target.value);
                            })),
                            this.el.child(
                                (this.hideInputDiv = l('div', 'hide-input').child(this.hideInput)),
                            ),
                            this.el.child(
                                (this.hideInputDiv = l('div', 'hide-input').child(this.hideInput)),
                            )),
                        ($t += 1);
                }
                return (
                    Ut(t, [
                        {
                            key: 'setOffset',
                            value: function(t) {
                                return this.el.offset(t).show(), this;
                            },
                        },
                        {
                            key: 'hide',
                            value: function() {
                                return this.el.hide(), this;
                            },
                        },
                        {
                            key: 'setAreaOffset',
                            value: function(t) {
                                var e = t.left,
                                    n = t.top,
                                    r = {
                                        width: t.width - 3 + 0.8,
                                        height: t.height - 3 + 0.8,
                                        left: e - 0.8,
                                        top: n - 0.8,
                                    };
                                this.areaEl.offset(r).show(),
                                    this.useHideInput &&
                                        (this.hideInputDiv.offset(r),
                                        this.hideInput.val('').focus());
                            },
                        },
                        {
                            key: 'setClipboardOffset',
                            value: function(t) {
                                var e = t.left,
                                    n = t.top,
                                    r = t.width,
                                    i = t.height;
                                this.clipboardEl.offset({
                                    left: e,
                                    top: n,
                                    width: r - 5,
                                    height: i - 5,
                                });
                            },
                        },
                        {
                            key: 'showAutofill',
                            value: function(t) {
                                var e = t.left,
                                    n = t.top,
                                    r = t.width,
                                    i = t.height;
                                this.autofillEl
                                    .offset({ width: r - 3, height: i - 3, left: e, top: n })
                                    .show();
                            },
                        },
                        {
                            key: 'hideAutofill',
                            value: function() {
                                this.autofillEl.hide();
                            },
                        },
                        {
                            key: 'showClipboard',
                            value: function() {
                                this.clipboardEl.show();
                            },
                        },
                        {
                            key: 'hideClipboard',
                            value: function() {
                                this.clipboardEl.hide();
                            },
                        },
                    ]),
                    t
                );
            })();
        function Lt(t) {
            var e = this.data,
                n = t.left,
                r = t.top,
                i = t.width,
                o = t.height,
                a = t.scroll,
                c = t.l,
                l = t.t,
                u = e.freezeTotalWidth(),
                s = e.freezeTotalHeight(),
                f = n - u;
            u > c && (f -= a.x);
            var h = r - s;
            return s > l && (h -= a.y), { left: f, top: h, width: i, height: o };
        }
        function Xt(t) {
            var e = this.data,
                n = t.left,
                r = t.width,
                i = t.height,
                o = t.l,
                a = t.t,
                c = t.scroll,
                l = e.freezeTotalWidth(),
                u = n - l;
            return l > o && (u -= c.x), { left: u, top: a, width: r, height: i };
        }
        function Zt(t) {
            var e = this.data,
                n = t.top,
                r = t.width,
                i = t.height,
                o = t.l,
                a = t.t,
                c = t.scroll,
                l = e.freezeTotalHeight(),
                u = n - l;
            return l > a && (u -= c.y), { left: o, top: u, width: r, height: i };
        }
        function Yt(t) {
            this.br.setAreaOffset(Lt.call(this, t));
        }
        function Kt(t) {
            this.tl.setAreaOffset(t);
        }
        function Jt(t) {
            this.t.setAreaOffset(Xt.call(this, t));
        }
        function Gt(t) {
            this.l.setAreaOffset(Zt.call(this, t));
        }
        function Qt(t) {
            this.l.setClipboardOffset(Zt.call(this, t));
        }
        function te(t) {
            this.br.setClipboardOffset(Lt.call(this, t));
        }
        function ee(t) {
            this.tl.setClipboardOffset(t);
        }
        function ne(t) {
            this.t.setClipboardOffset(Xt.call(this, t));
        }
        function re(t) {
            Yt.call(this, t), Kt.call(this, t), Jt.call(this, t), Gt.call(this, t);
        }
        function ie(t) {
            te.call(this, t), ee.call(this, t), ne.call(this, t), Qt.call(this, t);
        }
        var oe = (function() {
            function t(e) {
                var n = this;
                Vt(this, t),
                    (this.inputChange = function() {}),
                    (this.data = e),
                    (this.br = new Bt(!0)),
                    (this.t = new Bt()),
                    (this.l = new Bt()),
                    (this.tl = new Bt()),
                    (this.br.inputChange = function(t) {
                        n.inputChange(t);
                    }),
                    this.br.el.show(),
                    (this.offset = null),
                    (this.areaOffset = null),
                    (this.indexes = null),
                    (this.range = null),
                    (this.arange = null),
                    (this.el = l('div', ''.concat(zt, '-selectors'))
                        .children(this.tl.el, this.t.el, this.l.el, this.br.el)
                        .hide()),
                    (this.lastri = -1),
                    (this.lastci = -1),
                    ($t += 1);
            }
            return (
                Ut(t, [
                    {
                        key: 'resetData',
                        value: function(t) {
                            (this.data = t),
                                (this.range = t.selector.range),
                                this.resetAreaOffset();
                        },
                    },
                    {
                        key: 'hide',
                        value: function() {
                            this.el.hide();
                        },
                    },
                    {
                        key: 'resetOffset',
                        value: function() {
                            var t = this.data,
                                e = this.tl,
                                n = this.t,
                                r = this.l,
                                i = this.br,
                                o = t.freezeTotalHeight(),
                                a = t.freezeTotalWidth();
                            o > 0 || a > 0
                                ? (e.setOffset({ width: a, height: o }),
                                  n.setOffset({ left: a, height: o }),
                                  r.setOffset({ top: o, width: a }),
                                  i.setOffset({ left: a, top: o }))
                                : (e.hide(), n.hide(), r.hide(), i.setOffset({ left: 0, top: 0 }));
                        },
                    },
                    {
                        key: 'resetAreaOffset',
                        value: function() {
                            var t = this.data.getSelectedRect(),
                                e = this.data.getClipboardRect();
                            re.call(this, t), ie.call(this, e), this.resetOffset();
                        },
                    },
                    {
                        key: 'resetBRTAreaOffset',
                        value: function() {
                            var t = this.data.getSelectedRect(),
                                e = this.data.getClipboardRect();
                            Yt.call(this, t),
                                Jt.call(this, t),
                                te.call(this, e),
                                ne.call(this, e),
                                this.resetOffset();
                        },
                    },
                    {
                        key: 'resetBRLAreaOffset',
                        value: function() {
                            var t = this.data.getSelectedRect(),
                                e = this.data.getClipboardRect();
                            Yt.call(this, t),
                                Gt.call(this, t),
                                te.call(this, e),
                                Qt.call(this, e),
                                this.resetOffset();
                        },
                    },
                    {
                        key: 'set',
                        value: function(t, e) {
                            var n =
                                    !(arguments.length > 2 && void 0 !== arguments[2]) ||
                                    arguments[2],
                                r = this.data,
                                i = r.calSelectedRangeByStart(t, e),
                                o = i.sri,
                                a = i.sci;
                            if (n) {
                                var c = t,
                                    l = e;
                                t < 0 && (c = 0),
                                    e < 0 && (l = 0),
                                    r.selector.setIndexes(c, l),
                                    (this.indexes = [c, l]);
                            }
                            (this.moveIndexes = [o, a]),
                                (this.range = i),
                                this.resetAreaOffset(),
                                this.el.show();
                        },
                    },
                    {
                        key: 'setEnd',
                        value: function(t, e) {
                            var n =
                                    !(arguments.length > 2 && void 0 !== arguments[2]) ||
                                    arguments[2],
                                r = this.data,
                                i = this.lastri,
                                o = this.lastci;
                            if (n) {
                                if (t === i && e === o) return;
                                (this.lastri = t), (this.lastci = e);
                            }
                            (this.range = r.calSelectedRangeByEnd(t, e)),
                                re.call(this, this.data.getSelectedRect());
                        },
                    },
                    {
                        key: 'reset',
                        value: function() {
                            var t = this.data.selector.range,
                                e = t.eri,
                                n = t.eci;
                            this.setEnd(e, n);
                        },
                    },
                    {
                        key: 'showAutofill',
                        value: function(t, e) {
                            if (-1 !== t || -1 !== e) {
                                var n = this.range,
                                    r = n.sri,
                                    i = n.sci,
                                    o = n.eri,
                                    a = n.eci,
                                    c = t,
                                    l = e,
                                    u = r - t,
                                    s = o - t,
                                    f = a - e;
                                if (i - e > 0) this.arange = new k(r, l, o, i - 1);
                                else if (u > 0) this.arange = new k(c, i, r - 1, a);
                                else if (f < 0) this.arange = new k(r, a + 1, o, l);
                                else {
                                    if (!(s < 0)) return void (this.arange = null);
                                    this.arange = new k(o + 1, i, c, a);
                                }
                                if (null !== this.arange) {
                                    var h = this.data.getRect(this.arange);
                                    (h.width += 2), (h.height += 2);
                                    var y = this.br,
                                        p = this.l,
                                        d = this.t,
                                        v = this.tl;
                                    y.showAutofill(Lt.call(this, h)),
                                        p.showAutofill(Zt.call(this, h)),
                                        d.showAutofill(Xt.call(this, h)),
                                        v.showAutofill(h);
                                }
                            }
                        },
                    },
                    {
                        key: 'hideAutofill',
                        value: function() {
                            var t = this;
                            ['br', 'l', 't', 'tl'].forEach(function(e) {
                                t[e].hideAutofill();
                            });
                        },
                    },
                    {
                        key: 'showClipboard',
                        value: function() {
                            var t = this,
                                e = this.data.getClipboardRect();
                            ie.call(this, e),
                                ['br', 'l', 't', 'tl'].forEach(function(e) {
                                    t[e].showClipboard();
                                });
                        },
                    },
                    {
                        key: 'hideClipboard',
                        value: function() {
                            var t = this;
                            ['br', 'l', 't', 'tl'].forEach(function(e) {
                                t[e].hideClipboard();
                            });
                        },
                    },
                ]),
                t
            );
        })();
        function ae(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return ce(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return ce(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return ce(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function ce(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function le(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function ue(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function se(t) {
            t.preventDefault(), t.stopPropagation();
            var e = this.filterItems;
            e.length <= 0 ||
                (this.itemIndex >= 0 && e[this.itemIndex].toggle(),
                (this.itemIndex -= 1),
                this.itemIndex < 0 && (this.itemIndex = e.length - 1),
                e[this.itemIndex].toggle());
        }
        function fe(t) {
            t.stopPropagation();
            var e = this.filterItems;
            e.length <= 0 ||
                (this.itemIndex >= 0 && e[this.itemIndex].toggle(),
                (this.itemIndex += 1),
                this.itemIndex > e.length - 1 && (this.itemIndex = 0),
                e[this.itemIndex].toggle());
        }
        function he(t) {
            t.preventDefault();
            var e = this.filterItems;
            e.length <= 0 ||
                (t.stopPropagation(),
                this.itemIndex < 0 && (this.itemIndex = 0),
                e[this.itemIndex].el.click(),
                this.hide());
        }
        function ye(t) {
            var e = t.keyCode;
            switch ((t.ctrlKey && t.stopPropagation(), e)) {
                case 37:
                    t.stopPropagation();
                    break;
                case 38:
                    se.call(this, t);
                    break;
                case 39:
                    t.stopPropagation();
                    break;
                case 40:
                    fe.call(this, t);
                    break;
                case 13:
                case 9:
                    he.call(this, t);
                    break;
                default:
                    t.stopPropagation();
            }
        }
        var pe = (function() {
            function t(e, n) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '200px';
                le(this, t),
                    (this.filterItems = []),
                    (this.items = e),
                    (this.el = l('div', ''.concat(zt, '-suggest'))
                        .css('width', r)
                        .hide()),
                    (this.itemClick = n),
                    (this.itemIndex = -1);
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'setOffset',
                        value: function(t) {
                            this.el.cssRemoveKeys('top', 'bottom').offset(t);
                        },
                    },
                    {
                        key: 'hide',
                        value: function() {
                            var t = this.el;
                            (this.filterItems = []),
                                (this.itemIndex = -1),
                                t.hide(),
                                Pt(this.el.parent());
                        },
                    },
                    {
                        key: 'setItems',
                        value: function(t) {
                            this.items = t;
                        },
                    },
                    {
                        key: 'search',
                        value: function(t) {
                            var e,
                                n = this,
                                r = this.items;
                            if (
                                (/^\s*$/.test(t) ||
                                    (r = r.filter(function(e) {
                                        return (e.key || e).startsWith(t.toUpperCase());
                                    })),
                                (r = r.map(function(t) {
                                    var e = t.title;
                                    e ? 'function' == typeof e && (e = e()) : (e = t);
                                    var r = l('div', ''.concat(zt, '-item'))
                                        .child(e)
                                        .on('click.stop', function() {
                                            n.itemClick(t), n.hide();
                                        });
                                    return t.label && r.child(l('div', 'label').html(t.label)), r;
                                })),
                                (this.filterItems = r),
                                !(r.length <= 0))
                            ) {
                                var i = this.el;
                                (e = i.html('')).children.apply(e, ae(r)).show(),
                                    Tt(i.parent(), function() {
                                        n.hide();
                                    });
                            }
                        },
                    },
                    {
                        key: 'bindInputEvents',
                        value: function(t) {
                            var e = this;
                            t.on('keydown', function(t) {
                                return ye.call(e, t);
                            });
                        },
                    },
                ]) && ue(e.prototype, n),
                r && ue(e, r),
                t
            );
        })();
        function de(t) {
            return (de =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function ve(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function be(t, e) {
            return (be =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function me(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = we(t);
                if (e) {
                    var i = we(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return ge(this, n);
            };
        }
        function ge(t, e) {
            return !e || ('object' !== de(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function we(t) {
            return (we = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var ke = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && be(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = me(o);
            function o(t) {
                var e;
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    ((e = i.call(this, 'div', ''.concat(zt, '-icon'))).iconNameEl = l(
                        'div',
                        ''.concat(zt, '-icon-img ').concat(t),
                    )),
                    e.child(e.iconNameEl),
                    e
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'setName',
                        value: function(t) {
                            this.iconNameEl.className(''.concat(zt, '-icon-img ').concat(t));
                        },
                    },
                ]) && ve(e.prototype, n),
                r && ve(e, r),
                o
            );
        })(c);
        function Se(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Oe(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return xe(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return xe(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return xe(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function xe(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function je() {
            var t = this.inputText;
            if (!/^\s*$/.test(t)) {
                var e = this.textlineEl,
                    n = this.textEl,
                    r = this.areaOffset,
                    i = t.split('\n'),
                    o = Math.max.apply(
                        Math,
                        Oe(
                            i.map(function(t) {
                                return t.length;
                            }),
                        ),
                    ),
                    a = e.offset().width / t.length,
                    c = (o + 1) * a + 5,
                    l = this.viewFn().width - r.left - a,
                    u = i.length;
                if (c > r.width) {
                    var s = c;
                    c > l && ((s = l), (u += parseInt(c / l, 10)), (u += c % l > 0 ? 1 : 0)),
                        n.css('width', ''.concat(s, 'px'));
                }
                (u *= this.rowHeight) > r.height && n.css('height', ''.concat(u, 'px'));
            }
        }
        function Ee(t, e) {
            var n = t.target,
                r = n.value,
                i = n.selectionEnd,
                o = ''
                    .concat(r.slice(0, i))
                    .concat(e)
                    .concat(r.slice(i));
            (n.value = o),
                n.setSelectionRange(i + 1, i + 1),
                (this.inputText = o),
                this.textlineEl.html(o),
                je.call(this);
        }
        function Re(t) {
            var e = t.keyCode,
                n = t.altKey;
            13 !== e && 9 !== e && t.stopPropagation(),
                13 === e && n && (Ee.call(this, t, '\n'), t.stopPropagation()),
                13 !== e || n || t.preventDefault();
        }
        function _e(t) {
            var e = t.target.value,
                n = this.suggest,
                r = this.textlineEl,
                i = this.validator,
                o = this.cell;
            if (null !== o)
                if (('editable' in o && !0 === o.editable) || void 0 === o.editable) {
                    if (((this.inputText = e), i)) 'list' === i.type ? n.search(e) : n.hide();
                    else {
                        var a = e.lastIndexOf('=');
                        -1 !== a ? n.search(e.substring(a + 1)) : n.hide();
                    }
                    r.html(e), je.call(this), this.change('input', e);
                } else t.target.value = '';
            else {
                if (((this.inputText = e), i)) 'list' === i.type ? n.search(e) : n.hide();
                else {
                    var c = e.lastIndexOf('=');
                    -1 !== c ? n.search(e.substring(c + 1)) : n.hide();
                }
                r.html(e), je.call(this), this.change('input', e);
            }
        }
        function Ce(t) {
            var e = this.textEl.el;
            setTimeout(function() {
                e.focus(), e.setSelectionRange(t, t);
            }, 0);
        }
        function Ae(t, e) {
            var n = this.textEl,
                r = this.textlineEl;
            n.el.blur(), n.val(t), r.html(t), Ce.call(this, e);
        }
        function Pe(t) {
            var e = this.inputText,
                n = this.validator,
                r = 0;
            if (n && 'list' === n.type) (this.inputText = t), (r = this.inputText.length);
            else {
                var i = e.lastIndexOf('='),
                    o = e.substring(0, i + 1),
                    a = e.substring(i + 1);
                (a = -1 !== a.indexOf(')') ? a.substring(a.indexOf(')')) : ''),
                    (this.inputText = ''.concat(o + t.key, '(')),
                    (r = this.inputText.length),
                    (this.inputText += ')'.concat(a));
            }
            Ae.call(this, this.inputText, r);
        }
        function Te() {
            this.suggest.setItems(this.formulas);
        }
        var Ie = (function() {
            function t(e, n, r) {
                var i = this;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.viewFn = n),
                    (this.rowHeight = r),
                    (this.formulas = e),
                    (this.suggest = new pe(e, function(t) {
                        Pe.call(i, t);
                    })),
                    (this.areaEl = l('div', ''.concat(zt, '-editor-area'))
                        .children(
                            (this.textEl = l('textarea', '')
                                .on('input', function(t) {
                                    return _e.call(i, t);
                                })
                                .on('paste.stop', function() {})
                                .on('keydown', function(t) {
                                    return Re.call(i, t);
                                })),
                            (this.textlineEl = l('div', 'textline')),
                            this.suggest.el,
                        )
                        .on('mousemove.stop', function() {})
                        .on('mousedown.stop', function() {})),
                    (this.el = l('div', ''.concat(zt, '-editor'))
                        .child(this.areaEl)
                        .hide()),
                    this.suggest.bindInputEvents(this.textEl),
                    (this.areaOffset = null),
                    (this.freeze = { w: 0, h: 0 }),
                    (this.cell = null),
                    (this.inputText = ''),
                    (this.change = function() {});
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'setFreezeLengths',
                        value: function(t, e) {
                            (this.freeze.w = t), (this.freeze.h = e);
                        },
                    },
                    {
                        key: 'clear',
                        value: function() {
                            '' !== this.inputText && this.change('finished', this.inputText),
                                (this.cell = null),
                                (this.areaOffset = null),
                                (this.inputText = ''),
                                this.el.hide(),
                                this.textEl.val(''),
                                this.textlineEl.html(''),
                                Te.call(this);
                        },
                    },
                    {
                        key: 'setOffset',
                        value: function(t) {
                            var e =
                                    arguments.length > 1 && void 0 !== arguments[1]
                                        ? arguments[1]
                                        : 'top',
                                n = this.textEl,
                                r = this.areaEl,
                                i = this.suggest,
                                o = this.freeze,
                                a = this.el;
                            if (t) {
                                this.areaOffset = t;
                                var c = t.left,
                                    l = t.top,
                                    u = t.width,
                                    s = t.height,
                                    f = t.l,
                                    h = t.t,
                                    y = { left: 0, top: 0 };
                                (o.w > f && o.h > h) ||
                                    (o.w < f && o.h < h
                                        ? ((y.left = o.w), (y.top = o.h))
                                        : o.w > f
                                        ? (y.top = o.h)
                                        : o.h > h && (y.left = o.w)),
                                    a.offset(y),
                                    r.offset({ left: c - y.left - 0.8, top: l - y.top - 0.8 }),
                                    n.offset({ width: u - 9 + 0.8, height: s - 3 + 0.8 });
                                var p = { left: 0 };
                                (p[e] = s), i.setOffset(p), i.hide();
                            }
                        },
                    },
                    {
                        key: 'setCell',
                        value: function(t, e) {
                            var n = this.el,
                                r = this.datepicker,
                                i = this.suggest;
                            n.show(), (this.cell = t);
                            var o = (t && t.text) || '';
                            if ((this.setText(o), (this.validator = e), e)) {
                                var a = e.type;
                                'date' === a && (r.show(), /^\s*$/.test(o) || r.setValue(o)),
                                    'list' === a && (i.setItems(e.values()), i.search(''));
                            }
                        },
                    },
                    {
                        key: 'setText',
                        value: function(t) {
                            (this.inputText = t), Ae.call(this, t, t.length), je.call(this);
                        },
                    },
                ]) && Se(e.prototype, n),
                r && Se(e, r),
                t
            );
        })();
        function De(t) {
            return (De =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function ze(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function Me(t, e) {
            return (Me =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function He(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Fe(t);
                if (e) {
                    var i = Fe(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Ne(this, n);
            };
        }
        function Ne(t, e) {
            return !e || ('object' !== De(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Fe(t) {
            return (Fe = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var We = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Me(t, e);
            })(n, t);
            var e = He(n);
            function n(t) {
                var r,
                    i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '';
                return (
                    ze(this, n),
                    (r = e.call(this, 'div', ''.concat(zt, '-button ').concat(i))).child(
                        Q('button.'.concat(t)),
                    ),
                    r
                );
            }
            return n;
        })(c);
        function Ve(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return $e(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                Ue(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function qe(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                Ue(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function Ue(t, e) {
            if (t) {
                if ('string' == typeof t) return $e(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return (
                    'Object' === n && t.constructor && (n = t.constructor.name),
                    'Map' === n || 'Set' === n
                        ? Array.from(t)
                        : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                        ? $e(t, e)
                        : void 0
                );
            }
        }
        function $e(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function Be(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function Le(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Xe(t, e, n) {
            return e && Le(t.prototype, e), n && Le(t, n), t;
        }
        function Ze() {
            return window.devicePixelRatio || 1;
        }
        function Ye() {
            return Ze() - 0.5;
        }
        function Ke(t) {
            return parseInt(t * Ze(), 10);
        }
        function Je(t) {
            var e = Ke(t);
            return e > 0 ? e - 0.5 : 0.5;
        }
        var Ge = (function() {
            function t(e, n, r, i) {
                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0;
                Be(this, t),
                    (this.x = e),
                    (this.y = n),
                    (this.width = r),
                    (this.height = i),
                    (this.padding = o),
                    (this.bgcolor = '#ffffff'),
                    (this.borderTop = null),
                    (this.borderRight = null),
                    (this.borderBottom = null),
                    (this.borderLeft = null);
            }
            return (
                Xe(t, [
                    {
                        key: 'setBorders',
                        value: function(t) {
                            var e = t.top,
                                n = t.bottom,
                                r = t.left,
                                i = t.right;
                            e && (this.borderTop = e),
                                i && (this.borderRight = i),
                                n && (this.borderBottom = n),
                                r && (this.borderLeft = r);
                        },
                    },
                    {
                        key: 'innerWidth',
                        value: function() {
                            return this.width - 2 * this.padding - 2;
                        },
                    },
                    {
                        key: 'innerHeight',
                        value: function() {
                            return this.height - 2 * this.padding - 2;
                        },
                    },
                    {
                        key: 'textx',
                        value: function(t) {
                            var e = this.width,
                                n = this.padding,
                                r = this.x;
                            return (
                                'left' === t
                                    ? (r += n)
                                    : 'center' === t
                                    ? (r += e / 2)
                                    : 'right' === t && (r += e - n),
                                r
                            );
                        },
                    },
                    {
                        key: 'texty',
                        value: function(t, e) {
                            var n = this.height,
                                r = this.padding,
                                i = this.y;
                            return (
                                'top' === t
                                    ? (i += r)
                                    : 'middle' === t
                                    ? (i += n / 2 - e / 2)
                                    : 'bottom' === t && (i += n - r - e),
                                i
                            );
                        },
                    },
                    {
                        key: 'topxys',
                        value: function() {
                            var t = this.x,
                                e = this.y;
                            return [
                                [t, e],
                                [t + this.width, e],
                            ];
                        },
                    },
                    {
                        key: 'rightxys',
                        value: function() {
                            var t = this.x,
                                e = this.y,
                                n = this.width;
                            return [
                                [t + n, e],
                                [t + n, e + this.height],
                            ];
                        },
                    },
                    {
                        key: 'bottomxys',
                        value: function() {
                            var t = this.x,
                                e = this.y,
                                n = this.width,
                                r = this.height;
                            return [
                                [t, e + r],
                                [t + n, e + r],
                            ];
                        },
                    },
                    {
                        key: 'leftxys',
                        value: function() {
                            var t = this.x,
                                e = this.y;
                            return [
                                [t, e],
                                [t, e + this.height],
                            ];
                        },
                    },
                ]),
                t
            );
        })();
        function Qe(t, e, n, r, i, o, a) {
            var c = { x: 0, y: 0 };
            'underline' === t
                ? (c.y = 'bottom' === i ? 0 : 'top' === i ? -(o + 2) : -o / 2)
                : 'strike' === t &&
                  ('bottom' === i ? (c.y = o / 2) : 'top' === i && (c.y = -(o / 2 + 2))),
                'center' === r ? (c.x = a / 2) : 'right' === r && (c.x = a),
                this.line([e - c.x, n - c.y], [e - c.x + a, n - c.y]);
        }
        var tn = (function() {
                function t(e, n, r) {
                    Be(this, t),
                        (this.el = e),
                        (this.ctx = e.getContext('2d')),
                        this.resize(n, r),
                        this.ctx.scale(Ze(), Ze());
                }
                return (
                    Xe(t, [
                        {
                            key: 'resize',
                            value: function(t, e) {
                                (this.el.style.width = ''.concat(t, 'px')),
                                    (this.el.style.height = ''.concat(e, 'px')),
                                    (this.el.width = Ke(t)),
                                    (this.el.height = Ke(e));
                            },
                        },
                        {
                            key: 'clear',
                            value: function() {
                                var t = this.el,
                                    e = t.width,
                                    n = t.height;
                                return this.ctx.clearRect(0, 0, e, n), this;
                            },
                        },
                        {
                            key: 'attr',
                            value: function(t) {
                                return Object.assign(this.ctx, t), this;
                            },
                        },
                        {
                            key: 'save',
                            value: function() {
                                return this.ctx.save(), this.ctx.beginPath(), this;
                            },
                        },
                        {
                            key: 'restore',
                            value: function() {
                                return this.ctx.restore(), this;
                            },
                        },
                        {
                            key: 'beginPath',
                            value: function() {
                                return this.ctx.beginPath(), this;
                            },
                        },
                        {
                            key: 'translate',
                            value: function(t, e) {
                                return this.ctx.translate(Ke(t), Ke(e)), this;
                            },
                        },
                        {
                            key: 'scale',
                            value: function(t, e) {
                                return this.ctx.scale(t, e), this;
                            },
                        },
                        {
                            key: 'clearRect',
                            value: function(t, e, n, r) {
                                return this.ctx.clearRect(t, e, n, r), this;
                            },
                        },
                        {
                            key: 'fillRect',
                            value: function(t, e, n, r) {
                                return (
                                    this.ctx.fillRect(Ke(t) - 0.5, Ke(e) - 0.5, Ke(n), Ke(r)), this
                                );
                            },
                        },
                        {
                            key: 'fillText',
                            value: function(t, e, n) {
                                return this.ctx.fillText(t, Ke(e), Ke(n)), this;
                            },
                        },
                        {
                            key: 'text',
                            value: function(t, e) {
                                var n = this,
                                    r =
                                        arguments.length > 2 && void 0 !== arguments[2]
                                            ? arguments[2]
                                            : {},
                                    i =
                                        !(arguments.length > 3 && void 0 !== arguments[3]) ||
                                        arguments[3],
                                    o = this.ctx,
                                    a = r.align,
                                    c = r.valign,
                                    l = r.font,
                                    u = r.color,
                                    s = r.strike,
                                    f = r.underline,
                                    h = e.textx(a);
                                o.save(),
                                    o.beginPath(),
                                    this.attr({
                                        textAlign: a,
                                        textBaseline: c,
                                        font: ''
                                            .concat(l.italic ? 'italic' : '', ' ')
                                            .concat(l.bold ? 'bold' : '', ' ')
                                            .concat(Ke(l.size), 'px ')
                                            .concat(l.name),
                                        fillStyle: u,
                                        strokeStyle: u,
                                    });
                                var y = ''.concat(t).split('\n'),
                                    p = e.innerWidth(),
                                    d = [];
                                y.forEach(function(t) {
                                    var e = o.measureText(t).width;
                                    if (i && e > Ke(p)) {
                                        for (
                                            var n = { w: 0, len: 0, start: 0 }, r = 0;
                                            r < t.length;
                                            r += 1
                                        )
                                            n.w >= Ke(p) &&
                                                (d.push(t.substr(n.start, n.len)),
                                                (n = { w: 0, len: 0, start: r })),
                                                (n.len += 1),
                                                (n.w += o.measureText(t[r]).width + 1);
                                        n.len > 0 && d.push(t.substr(n.start, n.len));
                                    } else d.push(t);
                                });
                                var v = (d.length - 1) * (l.size + 2),
                                    b = e.texty(c, v);
                                return (
                                    d.forEach(function(t) {
                                        var e = o.measureText(t).width;
                                        n.fillText(t, h, b),
                                            s && Qe.call(n, 'strike', h, b, a, c, l.size, e),
                                            f && Qe.call(n, 'underline', h, b, a, c, l.size, e),
                                            (b += l.size + 2);
                                    }),
                                    o.restore(),
                                    this
                                );
                            },
                        },
                        {
                            key: 'border',
                            value: function(t, e) {
                                var n = this.ctx;
                                return (
                                    (n.lineWidth = Ye),
                                    (n.strokeStyle = e),
                                    'medium' === t
                                        ? (n.lineWidth = Ke(2) - 0.5)
                                        : 'thick' === t
                                        ? (n.lineWidth = Ke(3))
                                        : 'dashed' === t
                                        ? n.setLineDash([Ke(3), Ke(2)])
                                        : 'dotted' === t
                                        ? n.setLineDash([Ke(1), Ke(1)])
                                        : 'double' === t && n.setLineDash([Ke(2), 0]),
                                    this
                                );
                            },
                        },
                        {
                            key: 'line',
                            value: function() {
                                var t = this.ctx;
                                if (arguments.length > 1) {
                                    t.beginPath();
                                    var e = arguments.length <= 0 ? void 0 : arguments[0],
                                        n = qe(e, 2),
                                        r = n[0],
                                        i = n[1];
                                    t.moveTo(Je(r), Je(i));
                                    for (var o = 1; o < arguments.length; o += 1) {
                                        var a =
                                                o < 0 || arguments.length <= o
                                                    ? void 0
                                                    : arguments[o],
                                            c = qe(a, 2),
                                            l = c[0],
                                            u = c[1];
                                        t.lineTo(Je(l), Je(u));
                                    }
                                    t.stroke();
                                }
                                return this;
                            },
                        },
                        {
                            key: 'strokeBorders',
                            value: function(t) {
                                var e = this.ctx;
                                e.save();
                                var n = t.borderTop,
                                    r = t.borderRight,
                                    i = t.borderBottom,
                                    o = t.borderLeft;
                                n &&
                                    (this.border.apply(this, Ve(n)),
                                    this.line.apply(this, Ve(t.topxys()))),
                                    r &&
                                        (this.border.apply(this, Ve(r)),
                                        this.line.apply(this, Ve(t.rightxys()))),
                                    i &&
                                        (this.border.apply(this, Ve(i)),
                                        this.line.apply(this, Ve(t.bottomxys()))),
                                    o &&
                                        (this.border.apply(this, Ve(o)),
                                        this.line.apply(this, Ve(t.leftxys()))),
                                    e.restore();
                            },
                        },
                        {
                            key: 'dropdown',
                            value: function(t) {
                                var e = this.ctx,
                                    n = t.x,
                                    r = t.y,
                                    i = n + t.width - 15,
                                    o = r + t.height - 15;
                                e.save(),
                                    e.beginPath(),
                                    e.moveTo(Ke(i), Ke(o)),
                                    e.lineTo(Ke(i + 8), Ke(o)),
                                    e.lineTo(Ke(i + 4), Ke(o + 6)),
                                    e.closePath(),
                                    (e.fillStyle = 'rgba(0, 0, 0, .45)'),
                                    e.fill(),
                                    e.restore();
                            },
                        },
                        {
                            key: 'error',
                            value: function(t) {
                                var e = this.ctx,
                                    n = t.x,
                                    r = t.y,
                                    i = n + t.width - 1;
                                e.save(),
                                    e.beginPath(),
                                    e.moveTo(Ke(i - 8), Ke(r - 1)),
                                    e.lineTo(Ke(i), Ke(r - 1)),
                                    e.lineTo(Ke(i), Ke(r + 8)),
                                    e.closePath(),
                                    (e.fillStyle = 'rgba(255, 0, 0, 1)'),
                                    e.fill(),
                                    e.restore();
                            },
                        },
                        {
                            key: 'frozen',
                            value: function(t) {
                                var e = this.ctx,
                                    n = t.x,
                                    r = t.y,
                                    i = n + t.width - 1;
                                e.save(),
                                    e.beginPath(),
                                    e.moveTo(Ke(i - 8), Ke(r - 1)),
                                    e.lineTo(Ke(i), Ke(r - 1)),
                                    e.lineTo(Ke(i), Ke(r + 8)),
                                    e.closePath(),
                                    (e.fillStyle = 'rgba(0, 255, 0, .85)'),
                                    e.fill(),
                                    e.restore();
                            },
                        },
                        {
                            key: 'rect',
                            value: function(t, e) {
                                var n = this.ctx,
                                    r = t.x,
                                    i = t.y,
                                    o = t.width,
                                    a = t.height,
                                    c = t.bgcolor;
                                n.save(),
                                    n.beginPath(),
                                    (n.fillStyle = c || '#fff'),
                                    n.rect(Je(r + 1), Je(i + 1), Ke(o - 2), Ke(a - 2)),
                                    n.clip(),
                                    n.fill(),
                                    e(),
                                    n.restore();
                            },
                        },
                    ]),
                    t
                );
            })(),
            en = [
                { key: 'Arial', title: 'Arial' },
                { key: 'Helvetica', title: 'Helvetica' },
                { key: 'Source Sans Pro', title: 'Source Sans Pro' },
                { key: 'Comic Sans MS', title: 'Comic Sans MS' },
                { key: 'Courier New', title: 'Courier New' },
                { key: 'Verdana', title: 'Verdana' },
                { key: 'Lato', title: 'Lato' },
            ],
            nn = [
                { pt: 7.5, px: 10 },
                { pt: 8, px: 11 },
                { pt: 9, px: 12 },
                { pt: 10, px: 13 },
                { pt: 10.5, px: 14 },
                { pt: 11, px: 15 },
                { pt: 12, px: 16 },
                { pt: 14, px: 18.7 },
                { pt: 15, px: 20 },
                { pt: 16, px: 21.3 },
                { pt: 18, px: 24 },
                { pt: 22, px: 29.3 },
                { pt: 24, px: 32 },
                { pt: 26, px: 34.7 },
                { pt: 36, px: 48 },
                { pt: 42, px: 56 },
            ];
        function rn(t) {
            for (var e = 0; e < nn.length; e += 1) {
                var n = nn[e];
                if (n.pt === t) return n.px;
            }
            return t;
        }
        function on(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return an(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return an(t, e);
                })(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function an(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        var cn = function(t) {
                for (
                    var e = [], n = [], r = [], i = 0, o = '', a = 1, c = '', l = 0;
                    l < t.length;
                    l += 1
                ) {
                    var u = t.charAt(l);
                    if (' ' !== u) {
                        if (u >= 'a' && u <= 'z') r.push(u.toUpperCase());
                        else if ((u >= '0' && u <= '9') || (u >= 'A' && u <= 'Z') || '.' === u)
                            r.push(u);
                        else if ('"' === u) {
                            for (l += 1; '"' !== t.charAt(l); ) r.push(t.charAt(l)), (l += 1);
                            n.push('"'.concat(r.join(''))), (r = []);
                        } else if ('-' === u && /[+\-*/,(]/.test(c)) r.push(u);
                        else {
                            if (('(' !== u && r.length > 0 && n.push(r.join('')), ')' === u)) {
                                var s = e.pop();
                                if (2 === i)
                                    try {
                                        for (
                                            var f = on(p(n.pop()), 2),
                                                h = f[0],
                                                y = f[1],
                                                v = on(p(n.pop()), 2),
                                                b = v[0],
                                                m = v[1],
                                                g = 0,
                                                w = b;
                                            w <= h;
                                            w += 1
                                        )
                                            for (var k = m; k <= y; k += 1)
                                                n.push(d(w, k)), (g += 1);
                                        n.push([s, g]);
                                    } catch (t) {}
                                else if (1 === i || 3 === i)
                                    3 === i && n.push(o), n.push([s, a]), (a = 1);
                                else
                                    for (; '(' !== s && (n.push(s), !(e.length <= 0)); )
                                        s = e.pop();
                                i = 0;
                            } else if ('=' === u || '>' === u || '<' === u) {
                                var S = t.charAt(l + 1);
                                (o = u), ('=' !== S && '-' !== S) || ((o += S), (l += 1)), (i = 3);
                            } else if (':' === u) i = 2;
                            else if (',' === u) 3 === i && n.push(o), (i = 1), (a += 1);
                            else if ('(' === u && r.length > 0) e.push(r.join(''));
                            else {
                                if (e.length > 0 && ('+' === u || '-' === u)) {
                                    var O = e[e.length - 1];
                                    if (('(' !== O && n.push(e.pop()), '*' === O || '/' === O))
                                        for (; e.length > 0 && '(' !== (O = e[e.length - 1]); )
                                            n.push(e.pop());
                                } else if (e.length > 0) {
                                    var x = e[e.length - 1];
                                    ('*' !== x && '/' !== x) || n.push(e.pop());
                                }
                                e.push(u);
                            }
                            r = [];
                        }
                        c = u;
                    }
                }
                for (r.length > 0 && n.push(r.join('')); e.length > 0; ) n.push(e.pop());
                return n;
            },
            ln = function(t, e) {
                var n = on(t, 1)[0],
                    r = t;
                if ('"' === n) return t.substring(1);
                var i = 1;
                if (('-' === n && ((r = t.substring(1)), (i = -1)), r[0] >= '0' && r[0] <= '9'))
                    return i * Number(r);
                var o = on(p(r), 2);
                return i * e(o[0], o[1]);
            },
            un = function(t, e, n, r) {
                for (var i = [], o = 0; o < t.length; o += 1) {
                    var a = t[o],
                        c = a[0];
                    if ('+' === a) {
                        var l = i.pop();
                        i.push(W('+', i.pop(), l));
                    } else if ('-' === a)
                        if (1 === i.length) {
                            var u = i.pop();
                            i.push(W('*', u, -1));
                        } else {
                            var s = i.pop();
                            i.push(W('-', i.pop(), s));
                        }
                    else if ('*' === a) i.push(W('*', i.pop(), i.pop()));
                    else if ('/' === a) {
                        var f = i.pop();
                        i.push(W('/', i.pop(), f));
                    } else if ('=' === c || '>' === c || '<' === c) {
                        var h = i.pop();
                        Number.isNaN(h) || (h = Number(h));
                        var y = i.pop();
                        Number.isNaN(y) || (y = Number(y));
                        var p = !1;
                        '=' === c
                            ? (p = y === h)
                            : '>' === a
                            ? (p = y > h)
                            : '>=' === a
                            ? (p = y >= h)
                            : '<' === a
                            ? (p = y < h)
                            : '<=' === a && (p = y <= h),
                            i.push(p);
                    } else if (Array.isArray(a)) {
                        for (var d = on(a, 2), v = d[0], b = d[1], m = [], g = 0; g < b; g += 1)
                            m.push(i.pop());
                        i.push(e[v].render(m.reverse()));
                    } else {
                        if (r.includes(a)) return 0;
                        ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) && r.push(a),
                            i.push(ln(a, n)),
                            r.pop();
                    }
                }
                return i[0];
            },
            sn = function t(e, n, r) {
                var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
                if ('=' === e[0]) {
                    var o = cn(e.substring(1));
                    return o.length <= 0
                        ? e
                        : un(
                              o,
                              n,
                              function(e, o) {
                                  return t(r(e, o), n, r, i);
                              },
                              i,
                          );
                }
                return e;
            };
        function fn(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                yn(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function hn(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return pn(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                yn(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function yn(t, e) {
            if (t) {
                if ('string' == typeof t) return pn(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return (
                    'Object' === n && t.constructor && (n = t.constructor.name),
                    'Map' === n || 'Set' === n
                        ? Array.from(t)
                        : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                        ? pn(t, e)
                        : void 0
                );
            }
        }
        function pn(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        var dn = [
                {
                    key: 'SUM',
                    title: tt('formula.sum'),
                    render: function(t) {
                        return t.reduce(function(t, e) {
                            return W('+', t, e);
                        }, 0);
                    },
                },
                {
                    key: 'AVERAGE',
                    title: tt('formula.average'),
                    render: function(t) {
                        return (
                            t.reduce(function(t, e) {
                                return Number(t) + Number(e);
                            }, 0) / t.length
                        );
                    },
                },
                {
                    key: 'MAX',
                    title: tt('formula.max'),
                    render: function(t) {
                        return Math.max.apply(
                            Math,
                            hn(
                                t.map(function(t) {
                                    return Number(t);
                                }),
                            ),
                        );
                    },
                },
                {
                    key: 'MIN',
                    title: tt('formula.min'),
                    render: function(t) {
                        return Math.min.apply(
                            Math,
                            hn(
                                t.map(function(t) {
                                    return Number(t);
                                }),
                            ),
                        );
                    },
                },
                {
                    key: 'IF',
                    title: tt('formula._if'),
                    render: function(t) {
                        var e = fn(t, 3),
                            n = e[0],
                            r = e[1],
                            i = e[2];
                        return n ? r : i;
                    },
                },
                {
                    key: 'AND',
                    title: tt('formula.and'),
                    render: function(t) {
                        return t.every(function(t) {
                            return t;
                        });
                    },
                },
                {
                    key: 'OR',
                    title: tt('formula.or'),
                    render: function(t) {
                        return t.some(function(t) {
                            return t;
                        });
                    },
                },
                {
                    key: 'CONCAT',
                    title: tt('formula.concat'),
                    render: function(t) {
                        return t.join('');
                    },
                },
            ],
            vn = dn,
            bn = {};
        function mn(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return kn(t);
                })(t) ||
                Sn(t) ||
                wn(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function gn(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                Sn(t) ||
                wn(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function wn(t, e) {
            if (t) {
                if ('string' == typeof t) return kn(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return (
                    'Object' === n && t.constructor && (n = t.constructor.name),
                    'Map' === n || 'Set' === n
                        ? Array.from(t)
                        : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                        ? kn(t, e)
                        : void 0
                );
            }
        }
        function kn(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function Sn(t) {
            if ('undefined' != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
        }
        dn.forEach(function(t) {
            bn[t.key] = t;
        });
        var On = function(t) {
                return t;
            },
            xn = function(t) {
                if (/^(-?\d*.?\d*)$/.test(t)) {
                    var e = gn(
                            Number(t)
                                .toFixed(2)
                                .toString()
                                .split('\\.'),
                        ),
                        n = e[0],
                        r = e.slice(1);
                    return [n.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')].concat(mn(r));
                }
                return t;
            },
            jn = [
                { key: 'normal', title: tt('format.normal'), type: 'string', render: On },
                { key: 'text', title: tt('format.text'), type: 'string', render: On },
                {
                    key: 'number',
                    title: tt('format.number'),
                    type: 'number',
                    label: '1,000.12',
                    render: xn,
                },
                {
                    key: 'percent',
                    title: tt('format.percent'),
                    type: 'number',
                    label: '10.12%',
                    render: function(t) {
                        return ''.concat(t, '%');
                    },
                },
                {
                    key: 'rmb',
                    title: tt('format.rmb'),
                    type: 'number',
                    label: '￥10.00',
                    render: function(t) {
                        return '￥'.concat(xn(t));
                    },
                },
                {
                    key: 'usd',
                    title: tt('format.usd'),
                    type: 'number',
                    label: '$10.00',
                    render: function(t) {
                        return '$'.concat(xn(t));
                    },
                },
                {
                    key: 'eur',
                    title: tt('format.eur'),
                    type: 'number',
                    label: '€10.00',
                    render: function(t) {
                        return '€'.concat(xn(t));
                    },
                },
                {
                    key: 'date',
                    title: tt('format.date'),
                    type: 'date',
                    label: '26/09/2008',
                    render: On,
                },
                {
                    key: 'time',
                    title: tt('format.time'),
                    type: 'date',
                    label: '15:59:00',
                    render: On,
                },
                {
                    key: 'datetime',
                    title: tt('format.datetime'),
                    type: 'date',
                    label: '26/09/2008 15:59:00',
                    render: On,
                },
                {
                    key: 'duration',
                    title: tt('format.duration'),
                    type: 'date',
                    label: '24:01:00',
                    render: On,
                },
            ],
            En = {};
        function Rn(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return _n(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return _n(t, e);
                })(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function _n(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function Cn(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        jn.forEach(function(t) {
            En[t.key] = t;
        });
        var An = { fillStyle: '#2d333e' },
            Pn = { fillStyle: '#151619', lineWidth: Ye, strokeStyle: '#212530' };
        function Tn(t, e, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                i = t.cellRect(e, n),
                o = i.left,
                a = i.top,
                c = i.width,
                l = i.height;
            return new Ge(o, a + r, c, l, 5);
        }
        function In(t, e, n, r) {
            var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                o = e.sortedRowMap,
                a = e.rows,
                c = e.cols;
            if (!a.isHide(n) && !c.isHide(r)) {
                var l = n;
                o.has(n) && (l = o.get(n));
                var u = e.getCell(l, r);
                if (null !== u) {
                    var s = !1;
                    'editable' in u && !1 === u.editable && (s = !0);
                    var f = e.getCellStyleOrDefault(l, r),
                        h = Tn(e, n, r, i);
                    (h.bgcolor = f.bgcolor),
                        void 0 !== f.border && (h.setBorders(f.border), t.strokeBorders(h)),
                        t.rect(h, function() {
                            var i = '';
                            (i = e.settings.evalPaused
                                ? u.text || ''
                                : sn(u.text || '', bn, function(t, n) {
                                      return e.getCellTextOrDefault(n, t);
                                  })),
                                f.format && (i = En[f.format].render(i));
                            var o = Object.assign({}, f.font);
                            (o.size = rn(o.size)),
                                t.text(
                                    i,
                                    h,
                                    {
                                        align: f.align,
                                        valign: f.valign,
                                        font: o,
                                        color: f.color,
                                        strike: f.strike,
                                        underline: f.underline,
                                    },
                                    f.textwrap,
                                ),
                                e.validations.getError(n, r) && t.error(h),
                                s && t.frozen(h);
                        });
                }
            }
        }
        function Dn(t) {
            var e = this.data,
                n = this.draw;
            if (t) {
                var r = e.autoFilter;
                if (!r.active()) return;
                var i = r.hrange();
                t.intersects(i) &&
                    i.each(function(t, r) {
                        var i = Tn(e, t, r);
                        n.dropdown(i);
                    });
            }
        }
        function zn(t, e, n, r, i) {
            var o = this.draw,
                a = this.data;
            o.save(), o.translate(e, n).translate(r, i);
            var c = a.exceptRowSet,
                l = a.exceptRowTotalHeight(t.sri, t.eri);
            o.save(),
                o.translate(0, -l),
                t.each(
                    function(t, e) {
                        In(o, a, t, e);
                    },
                    function(t) {
                        return (function(t) {
                            var e = c.has(t);
                            if (e) {
                                var n = a.rows.getHeight(t);
                                o.translate(0, -n);
                            }
                            return !e;
                        })(t);
                    },
                ),
                o.restore();
            var u = new Set();
            o.save(),
                o.translate(0, -l),
                a.eachMergesInView(t, function(t) {
                    var e = t.sri,
                        n = t.sci,
                        r = t.eri;
                    if (c.has(e)) {
                        if (!u.has(e)) {
                            u.add(e);
                            var i = a.rows.sumHeight(e, r + 1);
                            o.translate(0, -i);
                        }
                    } else In(o, a, e, n);
                }),
                o.restore(),
                Dn.call(this, t),
                o.restore();
        }
        function Mn(t, e, n, r) {
            var i = this.draw;
            i.save(), i.attr({ fillStyle: '#0072ce' }).fillRect(t, e, n, r), i.restore();
        }
        function Hn(t, e, n, r, i, o) {
            var a = this,
                c = this.draw,
                l = this.data,
                u = e.h,
                s = e.w,
                f = o + r,
                y = i + n;
            c.save(),
                c.attr(An),
                ('all' !== t && 'left' !== t) || c.fillRect(0, f, n, u),
                ('all' !== t && 'top' !== t) || c.fillRect(y, 0, s, r);
            var p = l.selector.range,
                d = p.sri,
                v = p.sci,
                b = p.eri,
                m = p.eci;
            c.attr({
                textAlign: 'center',
                textBaseline: 'middle',
                font: '400 '.concat(Ke(12), 'px Source Sans Pro'),
                fillStyle: '#fff',
                lineWidth: Ye(),
                strokeStyle: '#212530',
            }),
                ('all' !== t && 'left' !== t) ||
                    (l.rowEach(e.sri, e.eri, function(t, e, r) {
                        var i = f + e,
                            o = t;
                        c.line([0, i], [n, i]),
                            d <= o && o < b + 1 && Mn.call(a, 0, i, n, r),
                            c.fillText(o + 1, n / 2, i + r / 2),
                            t > 0 &&
                                l.rows.isHide(t - 1) &&
                                (c.save(),
                                c.attr({ strokeStyle: '#c6c6c6' }),
                                c.line([5, i + 5], [n - 5, i + 5]),
                                c.restore());
                    }),
                    c.line([0, u + f], [n, u + f]),
                    c.line([n, f], [n, u + f])),
                ('all' !== t && 'top' !== t) ||
                    (l.colEach(e.sci, e.eci, function(t, e, n) {
                        var i = y + e,
                            o = t;
                        c.line([i, 0], [i, r]),
                            v <= o && o < m + 1 && Mn.call(a, i, 0, n, r),
                            c.fillText(h(o), i + n / 2, r / 2),
                            t > 0 &&
                                l.cols.isHide(t - 1) &&
                                (c.save(),
                                c.attr({ strokeStyle: '#c6c6c6' }),
                                c.line([i + 5, 5], [i + 5, r - 5]),
                                c.restore());
                    }),
                    c.line([s + y, 0], [s + y, r]),
                    c.line([0, r], [s + y, r])),
                c.restore();
        }
        function Nn(t, e) {
            var n = this.draw;
            n.save(), n.attr({ fillStyle: '#2d333e' }).fillRect(0, 0, t, e), n.restore();
        }
        function Fn(t, e, n, r, i) {
            var o = t.sri,
                a = t.sci,
                c = t.eri,
                l = t.eci,
                u = t.w,
                s = t.h,
                f = this.draw,
                h = this.data,
                y = h.settings;
            f.save(),
                f.attr(Pn).translate(e + r, n + i),
                f.clearRect(0, 0, u, s),
                y.showGrid
                    ? (h.rowEach(o, c, function(t, e, n) {
                          t !== o && f.line([0, e], [u, e]),
                              t === c && f.line([0, e + n], [u, e + n]);
                      }),
                      h.colEach(a, l, function(t, e, n) {
                          t !== a && f.line([e, 0], [e, s]),
                              t === l && f.line([e + n, 0], [e + n, s]);
                      }),
                      f.restore())
                    : f.restore();
        }
        function Wn(t, e, n, r) {
            var i = this.draw,
                o = this.data,
                a = o.viewWidth() - t,
                c = o.viewHeight() - e;
            i
                .save()
                .translate(t, e)
                .attr({ strokeStyle: 'rgba(75, 137, 255, .6)' }),
                i.line([0, r], [a, r]),
                i.line([n, 0], [n, c]),
                i.restore();
        }
        var Vn = (function() {
            function t(e, n) {
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.el = e),
                    (this.draw = new tn(e, n.viewWidth(), n.viewHeight())),
                    (this.data = n);
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'resetData',
                        value: function(t) {
                            (this.data = t), this.render();
                        },
                    },
                    {
                        key: 'render',
                        value: function() {
                            var t = this.data,
                                e = t.rows,
                                n = t.cols.indexWidth,
                                r = e.height;
                            this.draw.resize(t.viewWidth(), t.viewHeight()), this.clear();
                            var i = t.viewRange(),
                                o = t.freezeTotalWidth(),
                                a = t.freezeTotalHeight(),
                                c = t.scroll,
                                l = c.x,
                                u = c.y;
                            Fn.call(this, i, n, r, o, a),
                                zn.call(this, i, n, r, -l, -u),
                                Hn.call(this, 'all', i, n, r, o, a),
                                Nn.call(this, n, r);
                            var s = Rn(t.freeze, 2),
                                f = s[0],
                                h = s[1];
                            if (f > 0 || h > 0) {
                                if (f > 0) {
                                    var y = i.clone();
                                    (y.sri = 0),
                                        (y.eri = f - 1),
                                        (y.h = a),
                                        Fn.call(this, y, n, r, o, 0),
                                        zn.call(this, y, n, r, -l, 0),
                                        Hn.call(this, 'top', y, n, r, o, 0);
                                }
                                if (h > 0) {
                                    var p = i.clone();
                                    (p.sci = 0),
                                        (p.eci = h - 1),
                                        (p.w = o),
                                        Fn.call(this, p, n, r, 0, a),
                                        Hn.call(this, 'left', p, n, r, 0, a),
                                        zn.call(this, p, n, r, 0, -u);
                                }
                                var d = t.freezeViewRange();
                                Fn.call(this, d, n, r, 0, 0),
                                    Hn.call(this, 'all', d, n, r, 0, 0),
                                    zn.call(this, d, n, r, 0, 0),
                                    Wn.call(this, n, r, o, a);
                            }
                        },
                    },
                    {
                        key: 'clear',
                        value: function() {
                            this.draw.clear();
                        },
                    },
                ]) && Cn(e.prototype, n),
                r && Cn(e, r),
                t
            );
        })();
        function qn(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return Un(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return Un(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return Un(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function Un(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function $n(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var Bn = [
                ['A3', 11.69, 16.54],
                ['A4', 8.27, 11.69],
                ['A5', 5.83, 8.27],
                ['B4', 9.84, 13.9],
                ['B5', 6.93, 9.84],
            ],
            Ln = ['landscape', 'portrait'];
        function Xn(t) {
            return parseInt(96 * t, 10);
        }
        function Zn(t) {
            'cancel' === t ? this.el.hide() : this.toPrint();
        }
        function Yn(t) {
            var e = this.paper,
                n = t.target.value,
                r = Bn[n];
            (e.w = Xn(r[1])), (e.h = Xn(r[2])), this.preview();
        }
        function Kn(t) {
            var e = this.paper,
                n = t.target.value,
                r = Ln[n];
            (e.orientation = r), this.preview();
        }
        var Jn = (function() {
            function t(e) {
                var n, r;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.paper = {
                        w: Xn(Bn[0][1]),
                        h: Xn(Bn[0][2]),
                        padding: 50,
                        orientation: Ln[0],
                        get width() {
                            return 'landscape' === this.orientation ? this.h : this.w;
                        },
                        get height() {
                            return 'landscape' === this.orientation ? this.w : this.h;
                        },
                    }),
                    (this.data = e),
                    (this.el = l('div', ''.concat(zt, '-print'))
                        .children(
                            l('div', ''.concat(zt, '-print-bar')).children(
                                l('div', '-title').child('Print settings'),
                                l('div', '-right').children(
                                    l('div', ''.concat(zt, '-buttons')).children(
                                        new We('cancel').on('click', Zn.bind(this, 'cancel')),
                                        new We('next', 'primary').on(
                                            'click',
                                            Zn.bind(this, 'next'),
                                        ),
                                    ),
                                ),
                            ),
                            l('div', ''.concat(zt, '-print-content')).children(
                                (this.contentEl = l('div', '-content')),
                                l('div', '-sider').child(
                                    l('form', '').children(
                                        l('fieldset', '').children(
                                            l('label', '').child(''.concat(Q('print.size'))),
                                            (n = l('select', '')).children
                                                .apply(
                                                    n,
                                                    qn(
                                                        Bn.map(function(t, e) {
                                                            return l('option', '')
                                                                .attr('value', e)
                                                                .child(
                                                                    ''
                                                                        .concat(t[0], ' ( ')
                                                                        .concat(t[1], "''x")
                                                                        .concat(t[2], "'' )"),
                                                                );
                                                        }),
                                                    ),
                                                )
                                                .on('change', Yn.bind(this)),
                                        ),
                                        l('fieldset', '').children(
                                            l('label', '').child(''.concat(Q('print.orientation'))),
                                            (r = l('select', '')).children
                                                .apply(
                                                    r,
                                                    qn(
                                                        Ln.map(function(t, e) {
                                                            return l('option', '')
                                                                .attr('value', e)
                                                                .child(
                                                                    ''.concat(
                                                                        Q('print.orientations')[e],
                                                                    ),
                                                                );
                                                        }),
                                                    ),
                                                )
                                                .on('change', Kn.bind(this)),
                                        ),
                                    ),
                                ),
                            ),
                        )
                        .hide());
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'resetData',
                        value: function(t) {
                            this.data = t;
                        },
                    },
                    {
                        key: 'preview',
                        value: function() {
                            var t = this,
                                e = this.data,
                                n = this.paper,
                                r = n.width,
                                i = n.height,
                                o = n.padding,
                                a = r - 2 * o,
                                c = i - 2 * o,
                                u = e.contentRange(),
                                s = parseInt(u.h / c, 10) + 1,
                                f = a / u.w,
                                h = o,
                                y = o;
                            f > 1 && (h += (a - u.w) / 2);
                            var p = 0,
                                d = 0;
                            this.contentEl.html(''), (this.canvases = []);
                            for (
                                var v = { sri: 0, sci: 0, eri: 0, eci: 0 },
                                    b = function(n) {
                                        var o = 0,
                                            a = 0,
                                            s = l('div', ''.concat(zt, '-canvas-card')),
                                            b = l('canvas', ''.concat(zt, '-canvas'));
                                        t.canvases.push(b.el);
                                        var m = new tn(b.el, r, i);
                                        for (
                                            m.save(), m.translate(h, y), f < 1 && m.scale(f, f);
                                            p <= u.eri;
                                            p += 1
                                        ) {
                                            var g = e.rows.getHeight(p);
                                            if (!((o += g) < c)) {
                                                a = -(o - g);
                                                break;
                                            }
                                            for (var w = 0; w <= u.eci; w += 1)
                                                In(m, e, p, w, d), (v.eci = w);
                                        }
                                        (v.eri = p),
                                            m.restore(),
                                            m.save(),
                                            m.translate(h, y),
                                            f < 1 && m.scale(f, f);
                                        var k = d;
                                        e.eachMergesInView(v, function(t) {
                                            var n = t.sri,
                                                r = t.sci;
                                            In(m, e, n, r, k);
                                        }),
                                            m.restore(),
                                            (v.sri = v.eri),
                                            (v.sci = v.eci),
                                            (d += a),
                                            t.contentEl.child(
                                                l(
                                                    'div',
                                                    ''.concat(zt, '-canvas-card-wraper'),
                                                ).child(s.child(b)),
                                            );
                                    },
                                    m = 0;
                                m < s;
                                m += 1
                            )
                                b();
                            this.el.show();
                        },
                    },
                    {
                        key: 'toPrint',
                        value: function() {
                            this.el.hide();
                            var t = this.paper,
                                e = l('iframe', '').hide().el;
                            window.document.body.appendChild(e);
                            var n = e.contentWindow,
                                r = n.document,
                                i = document.createElement('style');
                            (i.innerHTML = '\n      @page { size: '
                                .concat(t.width, 'px ')
                                .concat(
                                    t.height,
                                    'px; };\n      canvas {\n        page-break-before: auto;        \n        page-break-after: always;\n        image-rendering: pixelated;\n      };\n    ',
                                )),
                                r.head.appendChild(i),
                                this.canvases.forEach(function(t) {
                                    var e = t.cloneNode(!1);
                                    e.getContext('2d').drawImage(t, 0, 0), r.body.appendChild(e);
                                }),
                                n.print();
                        },
                    },
                ]) && $n(e.prototype, n),
                r && $n(e, r),
                t
            );
        })();
        function Gn(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return Qn(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return Qn(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return Qn(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function Qn(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function tr(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function er(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var nr = [
            { key: 'copy', title: tt('contextmenu.copy'), label: 'Ctrl+C' },
            { key: 'cut', title: tt('contextmenu.cut'), label: 'Ctrl+X' },
            { key: 'paste', title: tt('contextmenu.paste'), label: 'Ctrl+V' },
            { key: 'divider' },
            { key: 'insert-row', title: tt('contextmenu.insertRow') },
            { key: 'insert-column', title: tt('contextmenu.insertColumn') },
            { key: 'divider' },
            { key: 'delete-row', title: tt('contextmenu.deleteRow') },
            { key: 'delete-column', title: tt('contextmenu.deleteColumn') },
            { key: 'delete-cell-text', title: tt('contextmenu.deleteCellText') },
        ];
        function rr(t) {
            var e = this;
            return 'divider' === t.key
                ? l('div', ''.concat(zt, '-item divider'))
                : l('div', ''.concat(zt, '-item'))
                      .on('click', function() {
                          e.itemClick(t.key), e.hide();
                      })
                      .children(t.title(), l('div', 'label').child(t.label || ''));
        }
        function ir() {
            var t = this;
            return nr.map(function(e) {
                return rr.call(t, e);
            });
        }
        var or = (function() {
            function t(e) {
                var n,
                    r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                tr(this, t),
                    (this.menuItems = ir.call(this)),
                    (this.el = (n = l('div', ''.concat(zt, '-contextmenu'))).children
                        .apply(n, Gn(this.menuItems))
                        .hide()),
                    (this.viewFn = e),
                    (this.itemClick = function() {}),
                    (this.isHide = r),
                    this.setMode('range');
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'setMode',
                        value: function(t) {
                            var e = this.menuItems[12];
                            e && ('row-col' === t ? e.show() : e.hide());
                        },
                    },
                    {
                        key: 'hide',
                        value: function() {
                            var t = this.el;
                            t.hide(), Pt(t);
                        },
                    },
                    {
                        key: 'setPosition',
                        value: function(t, e) {
                            if (!this.isHide) {
                                var n = this.el,
                                    r = n.show().offset().width,
                                    i = this.viewFn(),
                                    o = i.height / 2,
                                    a = t;
                                i.width - t <= r && (a -= r),
                                    n.css('left', ''.concat(a, 'px')),
                                    e > o
                                        ? n
                                              .css('bottom', ''.concat(i.height - e, 'px'))
                                              .css('max-height', ''.concat(e, 'px'))
                                              .css('top', 'auto')
                                        : n
                                              .css('top', ''.concat(e, 'px'))
                                              .css('max-height', ''.concat(i.height - e, 'px'))
                                              .css('bottom', 'auto'),
                                    Tt(n);
                            }
                        },
                    },
                ]) && er(e.prototype, n),
                r && er(e, r),
                t
            );
        })();
        function ar(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var cr = (function() {
            function t(e, n, r) {
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.tip = Q(
                        'toolbar.'.concat(
                            e.replace(/-[a-z]/g, function(t) {
                                return t[1].toUpperCase();
                            }),
                        ),
                    )),
                    n && (this.tip += ' ('.concat(n, ')')),
                    (this.tag = e),
                    (this.shortcut = n),
                    (this.value = r),
                    (this.el = this.element()),
                    (this.change = function() {});
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'element',
                        value: function() {
                            var t = this.tip;
                            return l('div', ''.concat(zt, '-toolbar-btn'))
                                .on('mouseenter', function(e) {
                                    !(function(t, e) {
                                        if (!e.classList.contains('active')) {
                                            var n = e.getBoundingClientRect(),
                                                r = n.left,
                                                i = n.top,
                                                o = n.width,
                                                a = n.height,
                                                c = l('div', ''.concat(zt, '-tooltip'))
                                                    .html(t)
                                                    .show();
                                            document.body.appendChild(c.el);
                                            var u = c.box();
                                            c
                                                .css(
                                                    'left',
                                                    ''.concat(r + o / 2 - u.width / 2, 'px'),
                                                )
                                                .css('top', ''.concat(i + a + 2, 'px')),
                                                Ct(e, 'mouseleave', function() {
                                                    document.body.contains(c.el) &&
                                                        document.body.removeChild(c.el);
                                                }),
                                                Ct(e, 'click', function() {
                                                    document.body.contains(c.el) &&
                                                        document.body.removeChild(c.el);
                                                });
                                        }
                                    })(t, e.target);
                                })
                                .attr('data-tooltip', t);
                        },
                    },
                    { key: 'setState', value: function() {} },
                ]) && ar(e.prototype, n),
                r && ar(e, r),
                t
            );
        })();
        function lr(t) {
            return (lr =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function ur(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function sr(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function fr(t, e, n) {
            return (fr =
                'undefined' != typeof Reflect && Reflect.get
                    ? Reflect.get
                    : function(t, e, n) {
                          var r = (function(t, e) {
                              for (
                                  ;
                                  !Object.prototype.hasOwnProperty.call(t, e) &&
                                  null !== (t = dr(t));

                              );
                              return t;
                          })(t, e);
                          if (r) {
                              var i = Object.getOwnPropertyDescriptor(r, e);
                              return i.get ? i.get.call(n) : i.value;
                          }
                      })(t, e, n || t);
        }
        function hr(t, e) {
            return (hr =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function yr(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = dr(t);
                if (e) {
                    var i = dr(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return pr(this, n);
            };
        }
        function pr(t, e) {
            return !e || ('object' !== lr(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function dr(t) {
            return (dr = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var vr = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && hr(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = yr(o);
            function o() {
                return ur(this, o), i.apply(this, arguments);
            }
            return (
                (e = o),
                (n = [
                    { key: 'dropdown', value: function() {} },
                    {
                        key: 'getValue',
                        value: function(t) {
                            return t;
                        },
                    },
                    {
                        key: 'element',
                        value: function() {
                            var t = this,
                                e = this.tag;
                            return (
                                (this.dd = this.dropdown()),
                                (this.dd.change = function(n) {
                                    return t.change(e, t.getValue(n));
                                }),
                                fr(dr(o.prototype), 'element', this)
                                    .call(this)
                                    .child(this.dd)
                            );
                        },
                    },
                    {
                        key: 'setState',
                        value: function(t) {
                            t && ((this.value = t), this.dd.setTitle(t));
                        },
                    },
                ]) && sr(e.prototype, n),
                r && sr(e, r),
                o
            );
        })(cr);
        function br(t) {
            return (br =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function mr(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function gr(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function wr(t, e) {
            return (wr =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function kr(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Or(t);
                if (e) {
                    var i = Or(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Sr(this, n);
            };
        }
        function Sr(t, e) {
            return !e || ('object' !== br(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Or(t) {
            return (Or = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var xr = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && wr(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = kr(o);
            function o(t, e, n, r) {
                var a, c;
                mr(this, o),
                    ((c = i.call(this, 'div', ''.concat(zt, '-dropdown ').concat(r))).title = t),
                    (c.change = function() {}),
                    (c.headerClick = function() {}),
                    'string' == typeof t
                        ? (c.title = l('div', ''.concat(zt, '-dropdown-title')).child(t))
                        : n && c.title.addClass('arrow-left'),
                    (c.contentEl = l('div', ''.concat(zt, '-dropdown-content'))
                        .css('width', e)
                        .hide());
                for (var u = arguments.length, s = new Array(u > 4 ? u - 4 : 0), f = 4; f < u; f++)
                    s[f - 4] = arguments[f];
                return (
                    (a = c).setContentChildren.apply(a, s),
                    (c.headerEl = l('div', ''.concat(zt, '-dropdown-header'))),
                    c.headerEl
                        .on('click', function() {
                            'block' !== c.contentEl.css('display') ? c.show() : c.hide();
                        })
                        .children(
                            c.title,
                            n
                                ? l('div', ''.concat(zt, '-icon arrow-right')).child(
                                      l('div', ''.concat(zt, '-icon-img arrow-down')),
                                  )
                                : '',
                        ),
                    c.children(c.headerEl, c.contentEl),
                    c
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'setContentChildren',
                        value: function() {
                            var t;
                            this.contentEl.html(''),
                                arguments.length > 0 &&
                                    (t = this.contentEl).children.apply(t, arguments);
                        },
                    },
                    {
                        key: 'setTitle',
                        value: function(t) {
                            this.title.html(t), this.hide();
                        },
                    },
                    {
                        key: 'show',
                        value: function() {
                            var t = this;
                            this.contentEl.show(),
                                this.parent().active(),
                                Tt(this.parent(), function() {
                                    t.hide();
                                });
                        },
                    },
                    {
                        key: 'hide',
                        value: function() {
                            this.parent().active(!1), this.contentEl.hide(), Pt(this.parent());
                        },
                    },
                ]) && gr(e.prototype, n),
                r && gr(e, r),
                o
            );
        })(c);
        function jr(t) {
            return (jr =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Er(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return Rr(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return Rr(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return Rr(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function Rr(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function _r(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Cr(t, e) {
            return (Cr =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Ar(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Tr(t);
                if (e) {
                    var i = Tr(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Pr(this, n);
            };
        }
        function Pr(t, e) {
            return !e || ('object' !== jr(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Tr(t) {
            return (Tr = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Ir = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Cr(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = Ar(o);
            function o(t, e) {
                var n;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, o);
                var r = new ke('align-'.concat(e)),
                    a = t.map(function(t) {
                        return ((e = 'align-'.concat(t)),
                        l('div', ''.concat(zt, '-item')).child(new ke(e))).on('click', function() {
                            n.setTitle(t), n.change(t);
                        });
                        var e;
                    });
                return (n = i.call.apply(i, [this, r, 'auto', !0, 'bottom-left'].concat(Er(a))));
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'setTitle',
                        value: function(t) {
                            this.title.setName('align-'.concat(t)), this.hide();
                        },
                    },
                ]) && _r(e.prototype, n),
                r && _r(e, r),
                o
            );
        })(xr);
        function Dr(t) {
            return (Dr =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function zr(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Mr(t, e) {
            return (Mr =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Hr(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Fr(t);
                if (e) {
                    var i = Fr(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Nr(this, n);
            };
        }
        function Nr(t, e) {
            return !e || ('object' !== Dr(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Fr(t) {
            return (Fr = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Wr = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Mr(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = Hr(o);
            function o(t) {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'align', '', t)
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'dropdown',
                        value: function() {
                            var t = this.value;
                            return new Ir(['left', 'center', 'right'], t);
                        },
                    },
                ]) && zr(e.prototype, n),
                r && zr(e, r),
                o
            );
        })(vr);
        function Vr(t) {
            return (Vr =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function qr(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Ur(t, e) {
            return (Ur =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function $r(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Lr(t);
                if (e) {
                    var i = Lr(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Br(this, n);
            };
        }
        function Br(t, e) {
            return !e || ('object' !== Vr(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Lr(t) {
            return (Lr = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Xr = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Ur(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = $r(o);
            function o(t) {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'valign', '', t)
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'dropdown',
                        value: function() {
                            var t = this.value;
                            return new Ir(['top', 'middle', 'bottom'], t);
                        },
                    },
                ]) && qr(e.prototype, n),
                r && qr(e, r),
                o
            );
        })(vr);
        function Zr(t) {
            return (Zr =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Yr(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function Kr(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Jr(t, e, n) {
            return (Jr =
                'undefined' != typeof Reflect && Reflect.get
                    ? Reflect.get
                    : function(t, e, n) {
                          var r = (function(t, e) {
                              for (
                                  ;
                                  !Object.prototype.hasOwnProperty.call(t, e) &&
                                  null !== (t = ei(t));

                              );
                              return t;
                          })(t, e);
                          if (r) {
                              var i = Object.getOwnPropertyDescriptor(r, e);
                              return i.get ? i.get.call(n) : i.value;
                          }
                      })(t, e, n || t);
        }
        function Gr(t, e) {
            return (Gr =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Qr(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = ei(t);
                if (e) {
                    var i = ei(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return ti(this, n);
            };
        }
        function ti(t, e) {
            return !e || ('object' !== Zr(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function ei(t) {
            return (ei = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var ni = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Gr(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = Qr(o);
            function o() {
                return Yr(this, o), i.apply(this, arguments);
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'element',
                        value: function() {
                            var t = this,
                                e = this.tag;
                            return Jr(ei(o.prototype), 'element', this)
                                .call(this)
                                .child(new ke(e))
                                .on('click', function() {
                                    return t.click();
                                });
                        },
                    },
                    {
                        key: 'click',
                        value: function() {
                            this.change(this.tag, this.toggle());
                        },
                    },
                    {
                        key: 'setState',
                        value: function(t) {
                            this.el.active(t);
                        },
                    },
                    {
                        key: 'toggle',
                        value: function() {
                            return this.el.toggle();
                        },
                    },
                    {
                        key: 'active',
                        value: function() {
                            return this.el.hasClass('active');
                        },
                    },
                ]) && Kr(e.prototype, n),
                r && Kr(e, r),
                o
            );
        })(cr);
        function ri(t) {
            return (ri =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function ii(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function oi(t, e) {
            return (oi =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function ai(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = li(t);
                if (e) {
                    var i = li(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return ci(this, n);
            };
        }
        function ci(t, e) {
            return !e || ('object' !== ri(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function li(t) {
            return (li = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var ui = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && oi(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = ai(o);
            function o() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'autofilter')
                );
            }
            return (
                (e = o),
                (n = [{ key: 'setState', value: function() {} }]) && ii(e.prototype, n),
                r && ii(e, r),
                o
            );
        })(ni);
        function si(t) {
            return (si =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function fi(t, e) {
            return (fi =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function hi(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = pi(t);
                if (e) {
                    var i = pi(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return yi(this, n);
            };
        }
        function yi(t, e) {
            return !e || ('object' !== si(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function pi(t) {
            return (pi = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var di = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && fi(t, e);
            })(n, t);
            var e = hi(n);
            function n() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, n),
                    e.call(this, 'font-bold', 'Ctrl+B')
                );
            }
            return n;
        })(ni);
        function vi(t) {
            return (vi =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function bi(t, e) {
            return (bi =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function mi(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = wi(t);
                if (e) {
                    var i = wi(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return gi(this, n);
            };
        }
        function gi(t, e) {
            return !e || ('object' !== vi(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function wi(t) {
            return (wi = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var ki = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && bi(t, e);
            })(n, t);
            var e = mi(n);
            function n() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, n),
                    e.call(this, 'font-italic', 'Ctrl+I')
                );
            }
            return n;
        })(ni);
        function Si(t) {
            return (Si =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Oi(t, e) {
            return (Oi =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function xi(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Ei(t);
                if (e) {
                    var i = Ei(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return ji(this, n);
            };
        }
        function ji(t, e) {
            return !e || ('object' !== Si(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Ei(t) {
            return (Ei = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Ri = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Oi(t, e);
            })(n, t);
            var e = xi(n);
            function n() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, n),
                    e.call(this, 'strike', 'Ctrl+U')
                );
            }
            return n;
        })(ni);
        function _i(t) {
            return (_i =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Ci(t, e) {
            return (Ci =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Ai(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Ti(t);
                if (e) {
                    var i = Ti(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Pi(this, n);
            };
        }
        function Pi(t, e) {
            return !e || ('object' !== _i(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Ti(t) {
            return (Ti = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Ii = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Ci(t, e);
            })(n, t);
            var e = Ai(n);
            function n() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, n),
                    e.call(this, 'underline', 'Ctrl+U')
                );
            }
            return n;
        })(ni);
        function Di(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return zi(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return zi(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return zi(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function zi(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        var Mi = [
                '#ffffff',
                '#000100',
                '#e7e5e6',
                '#445569',
                '#5b9cd6',
                '#ed7d31',
                '#a5a5a5',
                '#ffc001',
                '#4371c6',
                '#71ae47',
            ],
            Hi = [
                [
                    '#f2f2f2',
                    '#7f7f7f',
                    '#d0cecf',
                    '#d5dce4',
                    '#deeaf6',
                    '#fce5d5',
                    '#ededed',
                    '#fff2cd',
                    '#d9e2f3',
                    '#e3efd9',
                ],
                [
                    '#d8d8d8',
                    '#595959',
                    '#afabac',
                    '#adb8ca',
                    '#bdd7ee',
                    '#f7ccac',
                    '#dbdbdb',
                    '#ffe59a',
                    '#b3c6e7',
                    '#c5e0b3',
                ],
                [
                    '#bfbfbf',
                    '#3f3f3f',
                    '#756f6f',
                    '#8596b0',
                    '#9cc2e6',
                    '#f4b184',
                    '#c9c9c9',
                    '#fed964',
                    '#8eaada',
                    '#a7d08c',
                ],
                [
                    '#a5a5a5',
                    '#262626',
                    '#3a3839',
                    '#333f4f',
                    '#2e75b5',
                    '#c45a10',
                    '#7b7b7b',
                    '#bf8e01',
                    '#2f5596',
                    '#538136',
                ],
                [
                    '#7f7f7f',
                    '#0c0c0c',
                    '#171516',
                    '#222a35',
                    '#1f4e7a',
                    '#843c0a',
                    '#525252',
                    '#7e6000',
                    '#203864',
                    '#365624',
                ],
            ],
            Ni = [
                '#c00000',
                '#fe0000',
                '#fdc101',
                '#ffff01',
                '#93d051',
                '#00b04e',
                '#01b0f1',
                '#0170c1',
                '#012060',
                '#7030a0',
            ];
        function Fi(t) {
            var e = this;
            return l('td', '').child(
                l('div', ''.concat(zt, '-color-palette-cell'))
                    .on('click.stop', function() {
                        return e.change(t);
                    })
                    .css('background-color', t),
            );
        }
        var Wi = function t() {
            var e,
                n,
                r,
                i = this;
            !(function(t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            })(this, t),
                (this.el = l('div', ''.concat(zt, '-color-palette'))),
                (this.change = function() {});
            var o = l('table', '').children(
                (e = l('tbody', '')).children.apply(
                    e,
                    [
                        (n = l('tr', ''.concat(zt, '-theme-color-placeholders'))).children.apply(
                            n,
                            Di(
                                Mi.map(function(t) {
                                    return Fi.call(i, t);
                                }),
                            ),
                        ),
                    ].concat(
                        Di(
                            Hi.map(function(t) {
                                var e;
                                return (e = l('tr', ''.concat(zt, '-theme-colors'))).children.apply(
                                    e,
                                    Di(
                                        t.map(function(t) {
                                            return Fi.call(i, t);
                                        }),
                                    ),
                                );
                            }),
                        ),
                        [
                            (r = l('tr', ''.concat(zt, '-standard-colors'))).children.apply(
                                r,
                                Di(
                                    Ni.map(function(t) {
                                        return Fi.call(i, t);
                                    }),
                                ),
                            ),
                        ],
                    ),
                ),
            );
            this.el.child(o);
        };
        function Vi(t) {
            return (Vi =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function qi(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Ui(t, e) {
            return (Ui =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function $i(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Li(t);
                if (e) {
                    var i = Li(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Bi(this, n);
            };
        }
        function Bi(t, e) {
            return !e || ('object' !== Vi(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Li(t) {
            return (Li = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Xi = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Ui(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = $i(o);
            function o(t, e) {
                var n;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, o);
                var r = new ke(t)
                        .css('height', '16px')
                        .css('border-bottom', '3px solid '.concat(e)),
                    a = new Wi();
                return (
                    (a.change = function(t) {
                        n.setTitle(t), n.change(t);
                    }),
                    (n = i.call(this, r, 'auto', !1, 'bottom-left', a.el))
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'setTitle',
                        value: function(t) {
                            this.title.css('border-color', t), this.hide();
                        },
                    },
                ]) && qi(e.prototype, n),
                r && qi(e, r),
                o
            );
        })(xr);
        function Zi(t) {
            return (Zi =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Yi(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return Ki(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return Ki(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return Ki(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function Ki(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function Ji(t, e) {
            return (Ji =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Gi(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = to(t);
                if (e) {
                    var i = to(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Qi(this, n);
            };
        }
        function Qi(t, e) {
            return !e || ('object' !== Zi(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function to(t) {
            return (to = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var eo = [
                [
                    'thin',
                    '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" style="user-select: none;"></line></svg>',
                ],
                [
                    'medium',
                    '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="2" style="user-select: none;"><line x1="0" y1="1.0" x2="50" y2="1.0" stroke-width="2" stroke="black" style="user-select: none;"></line></svg>',
                ],
                [
                    'thick',
                    '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="3" style="user-select: none;"><line x1="0" y1="1.5" x2="50" y2="1.5" stroke-width="3" stroke="black" style="user-select: none;"></line></svg>',
                ],
                [
                    'dashed',
                    '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="2" style="user-select: none;"></line></svg>',
                ],
                [
                    'dotted',
                    '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="1" style="user-select: none;"></line></svg>',
                ],
            ],
            no = (function(t) {
                !(function(t, e) {
                    if ('function' != typeof e && null !== e)
                        throw new TypeError('Super expression must either be null or a function');
                    (t.prototype = Object.create(e && e.prototype, {
                        constructor: { value: t, writable: !0, configurable: !0 },
                    })),
                        e && Ji(t, e);
                })(n, t);
                var e = Gi(n);
                function n(t) {
                    var r;
                    !(function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, n);
                    var i = new ke('line-type'),
                        o = 0,
                        a = eo.map(function(e, n) {
                            return l(
                                'div',
                                ''.concat(zt, '-item state ').concat(t === e[0] ? 'checked' : ''),
                            )
                                .on('click', function() {
                                    a[o].toggle('checked'),
                                        a[n].toggle('checked'),
                                        (o = n),
                                        r.hide(),
                                        r.change(e);
                                })
                                .child(l('div', ''.concat(zt, '-line-type')).html(e[1]));
                        });
                    return (r = e.call.apply(
                        e,
                        [this, i, 'auto', !1, 'bottom-left'].concat(Yi(a)),
                    ));
                }
                return n;
            })(xr);
        function ro(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return ao(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                oo(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function io(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                oo(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function oo(t, e) {
            if (t) {
                if ('string' == typeof t) return ao(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return (
                    'Object' === n && t.constructor && (n = t.constructor.name),
                    'Map' === n || 'Set' === n
                        ? Array.from(t)
                        : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                        ? ao(t, e)
                        : void 0
                );
            }
        }
        function ao(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function co() {
            var t;
            return l('table', '').child((t = l('tbody', '')).children.apply(t, arguments));
        }
        function lo(t) {
            var e = this;
            return l('td', '').child(
                l('div', ''.concat(zt, '-border-palette-cell'))
                    .child(new ke('border-'.concat(t)))
                    .on('click', function() {
                        e.mode = t;
                        var n = e.mode,
                            r = e.style,
                            i = e.color;
                        e.change({ mode: n, style: r, color: i });
                    }),
            );
        }
        var uo = function t() {
            var e,
                n,
                r = this;
            !(function(t, e) {
                if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            })(this, t),
                (this.color = '#000'),
                (this.style = 'thin'),
                (this.mode = 'all'),
                (this.change = function() {}),
                (this.ddColor = new Xi('line-color', this.color)),
                (this.ddColor.change = function(t) {
                    r.color = t;
                }),
                (this.ddType = new no(this.style)),
                (this.ddType.change = function(t) {
                    var e = io(t, 1)[0];
                    r.style = e;
                }),
                (this.el = l('div', ''.concat(zt, '-border-palette')));
            var i = co(
                l('tr', '').children(
                    l('td', ''.concat(zt, '-border-palette-left')).child(
                        co(
                            (e = l('tr', '')).children.apply(
                                e,
                                ro(
                                    ['all', 'inside', 'horizontal', 'vertical', 'outside'].map(
                                        function(t) {
                                            return lo.call(r, t);
                                        },
                                    ),
                                ),
                            ),
                            (n = l('tr', '')).children.apply(
                                n,
                                ro(
                                    ['left', 'top', 'right', 'bottom', 'none'].map(function(t) {
                                        return lo.call(r, t);
                                    }),
                                ),
                            ),
                        ),
                    ),
                    l('td', ''.concat(zt, '-border-palette-right')).children(
                        l('div', ''.concat(zt, '-toolbar-btn')).child(this.ddColor.el),
                        l('div', ''.concat(zt, '-toolbar-btn')).child(this.ddType.el),
                    ),
                ),
            );
            this.el.child(i);
        };
        function so(t) {
            return (so =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function fo(t, e) {
            return (fo =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function ho(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = po(t);
                if (e) {
                    var i = po(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return yo(this, n);
            };
        }
        function yo(t, e) {
            return !e || ('object' !== so(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function po(t) {
            return (po = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var vo = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && fo(t, e);
            })(n, t);
            var e = ho(n);
            function n() {
                var t;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, n);
                var r = new ke('border-all'),
                    i = new uo();
                return (
                    (i.change = function(e) {
                        t.change(e), t.hide();
                    }),
                    (t = e.call(this, r, 'auto', !1, 'bottom-left', i.el))
                );
            }
            return n;
        })(xr);
        function bo(t) {
            return (bo =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function mo(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function go(t, e) {
            return (go =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function wo(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = So(t);
                if (e) {
                    var i = So(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return ko(this, n);
            };
        }
        function ko(t, e) {
            return !e || ('object' !== bo(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function So(t) {
            return (So = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Oo = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && go(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = wo(o);
            function o() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'border')
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'dropdown',
                        value: function() {
                            return new vo();
                        },
                    },
                ]) && mo(e.prototype, n),
                r && mo(e, r),
                o
            );
        })(vr);
        function xo(t) {
            return (xo =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function jo(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function Eo(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Ro(t, e, n) {
            return (Ro =
                'undefined' != typeof Reflect && Reflect.get
                    ? Reflect.get
                    : function(t, e, n) {
                          var r = (function(t, e) {
                              for (
                                  ;
                                  !Object.prototype.hasOwnProperty.call(t, e) &&
                                  null !== (t = Po(t));

                              );
                              return t;
                          })(t, e);
                          if (r) {
                              var i = Object.getOwnPropertyDescriptor(r, e);
                              return i.get ? i.get.call(n) : i.value;
                          }
                      })(t, e, n || t);
        }
        function _o(t, e) {
            return (_o =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Co(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Po(t);
                if (e) {
                    var i = Po(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Ao(this, n);
            };
        }
        function Ao(t, e) {
            return !e || ('object' !== xo(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Po(t) {
            return (Po = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var To = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && _o(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = Co(o);
            function o() {
                return jo(this, o), i.apply(this, arguments);
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'element',
                        value: function() {
                            var t = this;
                            return Ro(Po(o.prototype), 'element', this)
                                .call(this)
                                .child(new ke(this.tag))
                                .on('click', function() {
                                    return t.change(t.tag);
                                });
                        },
                    },
                    {
                        key: 'setState',
                        value: function(t) {
                            this.el.disabled(t);
                        },
                    },
                ]) && Eo(e.prototype, n),
                r && Eo(e, r),
                o
            );
        })(cr);
        function Io(t) {
            return (Io =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Do(t, e) {
            return (Do =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function zo(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Ho(t);
                if (e) {
                    var i = Ho(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Mo(this, n);
            };
        }
        function Mo(t, e) {
            return !e || ('object' !== Io(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Ho(t) {
            return (Ho = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var No = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Do(t, e);
            })(n, t);
            var e = zo(n);
            function n() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, n),
                    e.call(this, 'clearformat')
                );
            }
            return n;
        })(To);
        function Fo(t) {
            return (Fo =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Wo(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Vo(t, e) {
            return (Vo =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function qo(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = $o(t);
                if (e) {
                    var i = $o(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Uo(this, n);
            };
        }
        function Uo(t, e) {
            return !e || ('object' !== Fo(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function $o(t) {
            return ($o = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Bo = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Vo(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = qo(o);
            function o() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'paintformat')
                );
            }
            return (
                (e = o),
                (n = [{ key: 'setState', value: function() {} }]) && Wo(e.prototype, n),
                r && Wo(e, r),
                o
            );
        })(ni);
        function Lo(t) {
            return (Lo =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Xo(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Zo(t, e) {
            return (Zo =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Yo(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Jo(t);
                if (e) {
                    var i = Jo(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Ko(this, n);
            };
        }
        function Ko(t, e) {
            return !e || ('object' !== Lo(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Jo(t) {
            return (Jo = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Go = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Zo(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = Yo(o);
            function o(t) {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'color', void 0, t)
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'dropdown',
                        value: function() {
                            var t = this.tag,
                                e = this.value;
                            return new Xi(t, e);
                        },
                    },
                ]) && Xo(e.prototype, n),
                r && Xo(e, r),
                o
            );
        })(vr);
        function Qo(t) {
            return (Qo =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function ta(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function ea(t, e) {
            return (ea =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function na(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = ia(t);
                if (e) {
                    var i = ia(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return ra(this, n);
            };
        }
        function ra(t, e) {
            return !e || ('object' !== Qo(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function ia(t) {
            return (ia = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var oa = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && ea(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = na(o);
            function o(t) {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'bgcolor', void 0, t)
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'dropdown',
                        value: function() {
                            var t = this.tag,
                                e = this.value;
                            return new Xi(t, e);
                        },
                    },
                ]) && ta(e.prototype, n),
                r && ta(e, r),
                o
            );
        })(vr);
        function aa(t) {
            return (aa =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function ca(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return la(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return la(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return la(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function la(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function ua(t, e) {
            return (ua =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function sa(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = ha(t);
                if (e) {
                    var i = ha(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return fa(this, n);
            };
        }
        function fa(t, e) {
            return !e || ('object' !== aa(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function ha(t) {
            return (ha = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var ya = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && ua(t, e);
            })(n, t);
            var e = sa(n);
            function n() {
                var t;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, n);
                var r = nn.map(function(e) {
                    return l('div', ''.concat(zt, '-item'))
                        .on('click', function() {
                            t.setTitle(''.concat(e.pt)), t.change(e);
                        })
                        .child(''.concat(e.pt));
                });
                return (t = e.call.apply(e, [this, '10', '60px', !0, 'bottom-left'].concat(ca(r))));
            }
            return n;
        })(xr);
        function pa(t) {
            return (pa =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function da(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function va(t, e) {
            return (va =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function ba(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = ga(t);
                if (e) {
                    var i = ga(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return ma(this, n);
            };
        }
        function ma(t, e) {
            return !e || ('object' !== pa(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function ga(t) {
            return (ga = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var wa = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && va(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = ba(o);
            function o() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'font-size')
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'getValue',
                        value: function(t) {
                            return t.pt;
                        },
                    },
                    {
                        key: 'dropdown',
                        value: function() {
                            return new ya();
                        },
                    },
                ]) && da(e.prototype, n),
                r && da(e, r),
                o
            );
        })(vr);
        function ka(t) {
            return (ka =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Sa(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return Oa(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return Oa(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return Oa(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function Oa(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function xa(t, e) {
            return (xa =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function ja(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Ra(t);
                if (e) {
                    var i = Ra(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Ea(this, n);
            };
        }
        function Ea(t, e) {
            return !e || ('object' !== ka(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Ra(t) {
            return (Ra = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var _a = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && xa(t, e);
            })(n, t);
            var e = ja(n);
            function n() {
                var t;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, n);
                var r = en.map(function(e) {
                    return l('div', ''.concat(zt, '-item'))
                        .on('click', function() {
                            t.setTitle(e.title), t.change(e);
                        })
                        .child(e.title);
                });
                return (t = e.call.apply(
                    e,
                    [this, en[0].title, '160px', !0, 'bottom-left'].concat(Sa(r)),
                ));
            }
            return n;
        })(xr);
        function Ca(t) {
            return (Ca =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Aa(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Pa(t, e) {
            return (Pa =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Ta(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Da(t);
                if (e) {
                    var i = Da(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Ia(this, n);
            };
        }
        function Ia(t, e) {
            return !e || ('object' !== Ca(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Da(t) {
            return (Da = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var za = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Pa(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = Ta(o);
            function o() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'font-name')
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'getValue',
                        value: function(t) {
                            return t.key;
                        },
                    },
                    {
                        key: 'dropdown',
                        value: function() {
                            return new _a();
                        },
                    },
                ]) && Aa(e.prototype, n),
                r && Aa(e, r),
                o
            );
        })(vr);
        function Ma(t) {
            return (Ma =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Ha(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return Na(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return Na(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return Na(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function Na(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function Fa(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Wa(t, e) {
            return (Wa =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Va(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Ua(t);
                if (e) {
                    var i = Ua(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return qa(this, n);
            };
        }
        function qa(t, e) {
            return !e || ('object' !== Ma(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Ua(t) {
            return (Ua = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var $a = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Wa(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = Va(o);
            function o() {
                var t;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, o);
                var e = jn.slice(0);
                return (
                    e.splice(2, 0, { key: 'divider' }),
                    e.splice(8, 0, { key: 'divider' }),
                    (e = e.map(function(e) {
                        var n = l('div', ''.concat(zt, '-item'));
                        return (
                            'divider' === e.key
                                ? n.addClass('divider')
                                : (n.child(e.title()).on('click', function() {
                                      t.setTitle(e.title()), t.change(e);
                                  }),
                                  e.label && n.child(l('div', 'label').html(e.label))),
                            n
                        );
                    })),
                    (t = i.call.apply(
                        i,
                        [this, 'Normal', '220px', !0, 'bottom-left'].concat(Ha(e)),
                    ))
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'setTitle',
                        value: function(t) {
                            for (var e = 0; e < jn.length; e += 1)
                                jn[e].key === t && this.title.html(jn[e].title());
                            this.hide();
                        },
                    },
                ]) && Fa(e.prototype, n),
                r && Fa(e, r),
                o
            );
        })(xr);
        function Ba(t) {
            return (Ba =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function La(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Xa(t, e) {
            return (Xa =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Za(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Ka(t);
                if (e) {
                    var i = Ka(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Ya(this, n);
            };
        }
        function Ya(t, e) {
            return !e || ('object' !== Ba(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Ka(t) {
            return (Ka = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Ja = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Xa(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = Za(o);
            function o() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'format')
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'getValue',
                        value: function(t) {
                            return t.key;
                        },
                    },
                    {
                        key: 'dropdown',
                        value: function() {
                            return new $a();
                        },
                    },
                ]) && La(e.prototype, n),
                r && La(e, r),
                o
            );
        })(vr);
        function Ga(t) {
            return (Ga =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Qa(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return tc(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return tc(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return tc(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function tc(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function ec(t, e) {
            return (ec =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function nc(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = ic(t);
                if (e) {
                    var i = ic(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return rc(this, n);
            };
        }
        function rc(t, e) {
            return !e || ('object' !== Ga(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function ic(t) {
            return (ic = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var oc = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && ec(t, e);
            })(n, t);
            var e = nc(n);
            function n() {
                var t;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, n);
                var r = dn.map(function(e) {
                    return l('div', ''.concat(zt, '-item'))
                        .on('click', function() {
                            t.hide(), t.change(e);
                        })
                        .child(e.key);
                });
                return (t = e.call.apply(
                    e,
                    [this, new ke('formula'), '180px', !0, 'bottom-left'].concat(Qa(r)),
                ));
            }
            return n;
        })(xr);
        function ac(t) {
            return (ac =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function cc(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function lc(t, e) {
            return (lc =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function uc(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = fc(t);
                if (e) {
                    var i = fc(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return sc(this, n);
            };
        }
        function sc(t, e) {
            return !e || ('object' !== ac(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function fc(t) {
            return (fc = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var hc = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && lc(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = uc(o);
            function o() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'formula')
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'getValue',
                        value: function(t) {
                            return t.key;
                        },
                    },
                    {
                        key: 'dropdown',
                        value: function() {
                            return new oc();
                        },
                    },
                ]) && cc(e.prototype, n),
                r && cc(e, r),
                o
            );
        })(vr);
        function yc(t) {
            return (yc =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function pc(t, e) {
            return (pc =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function dc(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = bc(t);
                if (e) {
                    var i = bc(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return vc(this, n);
            };
        }
        function vc(t, e) {
            return !e || ('object' !== yc(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function bc(t) {
            return (bc = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var mc = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && pc(t, e);
            })(n, t);
            var e = dc(n);
            function n() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, n),
                    e.call(this, 'freeze')
                );
            }
            return n;
        })(ni);
        function gc(t) {
            return (gc =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function wc(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function kc(t, e) {
            return (kc =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Sc(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = xc(t);
                if (e) {
                    var i = xc(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Oc(this, n);
            };
        }
        function Oc(t, e) {
            return !e || ('object' !== gc(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function xc(t) {
            return (xc = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var jc = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && kc(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = Sc(o);
            function o() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, o),
                    i.call(this, 'merge')
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'setState',
                        value: function(t, e) {
                            this.el.active(t).disabled(e);
                        },
                    },
                ]) && wc(e.prototype, n),
                r && wc(e, r),
                o
            );
        })(ni);
        function Ec(t) {
            return (Ec =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Rc(t, e) {
            return (Rc =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function _c(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Ac(t);
                if (e) {
                    var i = Ac(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Cc(this, n);
            };
        }
        function Cc(t, e) {
            return !e || ('object' !== Ec(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Ac(t) {
            return (Ac = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Pc = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Rc(t, e);
            })(n, t);
            var e = _c(n);
            function n() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, n),
                    e.call(this, 'redo', 'Ctrl+Y')
                );
            }
            return n;
        })(To);
        function Tc(t) {
            return (Tc =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Ic(t, e) {
            return (Ic =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Dc(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Mc(t);
                if (e) {
                    var i = Mc(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return zc(this, n);
            };
        }
        function zc(t, e) {
            return !e || ('object' !== Tc(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Mc(t) {
            return (Mc = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Hc = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Ic(t, e);
            })(n, t);
            var e = Dc(n);
            function n() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, n),
                    e.call(this, 'undo', 'Ctrl+Z')
                );
            }
            return n;
        })(To);
        function Nc(t) {
            return (Nc =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Fc(t, e) {
            return (Fc =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Wc(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = qc(t);
                if (e) {
                    var i = qc(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Vc(this, n);
            };
        }
        function Vc(t, e) {
            return !e || ('object' !== Nc(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function qc(t) {
            return (qc = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Uc = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Fc(t, e);
            })(n, t);
            var e = Wc(n);
            function n() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, n),
                    e.call(this, 'print', 'Ctrl+P')
                );
            }
            return n;
        })(To);
        function $c(t) {
            return ($c =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Bc(t, e) {
            return (Bc =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Lc(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Zc(t);
                if (e) {
                    var i = Zc(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Xc(this, n);
            };
        }
        function Xc(t, e) {
            return !e || ('object' !== $c(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Zc(t) {
            return (Zc = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Yc = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Bc(t, e);
            })(n, t);
            var e = Lc(n);
            function n() {
                return (
                    (function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, n),
                    e.call(this, 'textwrap')
                );
            }
            return n;
        })(ni);
        function Kc(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Jc(t) {
            return (Jc =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function Gc(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function Qc(t, e) {
            if ('function' != typeof e && null !== e)
                throw new TypeError('Super expression must either be null or a function');
            (t.prototype = Object.create(e && e.prototype, {
                constructor: { value: t, writable: !0, configurable: !0 },
            })),
                e && tl(t, e);
        }
        function tl(t, e) {
            return (tl =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function el(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = rl(t);
                if (e) {
                    var i = rl(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return nl(this, n);
            };
        }
        function nl(t, e) {
            return !e || ('object' !== Jc(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function rl(t) {
            return (rl = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var il = (function(t) {
                Qc(n, t);
                var e = el(n);
                function n() {
                    var t;
                    Gc(this, n);
                    var r = new ke('ellipsis'),
                        i = l('div', ''.concat(zt, '-toolbar-more'));
                    return (
                        ((t = e.call(this, r, 'auto', !1, 'bottom-right', i)).moreBtns = i),
                        t.contentEl.css('max-width', '420px'),
                        t
                    );
                }
                return n;
            })(xr),
            ol = (function(t) {
                Qc(o, t);
                var e,
                    n,
                    r,
                    i = el(o);
                function o() {
                    var t;
                    return Gc(this, o), (t = i.call(this, 'more')).el.hide(), t;
                }
                return (
                    (e = o),
                    (n = [
                        {
                            key: 'dropdown',
                            value: function() {
                                return new il();
                            },
                        },
                        {
                            key: 'show',
                            value: function() {
                                this.el.show();
                            },
                        },
                        {
                            key: 'hide',
                            value: function() {
                                this.el.hide();
                            },
                        },
                    ]) && Kc(e.prototype, n),
                    r && Kc(e, r),
                    o
                );
            })(vr);
        function al(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function cl(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function ll(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return ul(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return ul(t, e);
                })(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function ul(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function sl() {
            return l('div', ''.concat(zt, '-toolbar-divider'));
        }
        function fl() {
            var t = this;
            (this.btns2 = []),
                this.items.forEach(function(e) {
                    if (Array.isArray(e))
                        e.forEach(function(e) {
                            var n = e.el,
                                r = n.box(),
                                i = n.computedStyle(),
                                o = i.marginLeft,
                                a = i.marginRight;
                            t.btns2.push([n, r.width + parseInt(o, 10) + parseInt(a, 10)]);
                        });
                    else {
                        var n = e.box(),
                            r = e.computedStyle(),
                            i = r.marginLeft,
                            o = r.marginRight;
                        t.btns2.push([e, n.width + parseInt(i, 10) + parseInt(o, 10)]);
                    }
                });
        }
        function hl() {
            var t,
                e,
                n = this.el,
                r = this.btns,
                i = this.moreEl,
                o = this.btns2,
                a = i.dd,
                c = a.moreBtns,
                l = a.contentEl;
            n.css('width', ''.concat(this.widthFn() - 60, 'px'));
            var u = n.box(),
                s = 160,
                f = 12,
                h = [],
                y = [];
            o.forEach(function(t, e) {
                var n = ll(t, 2),
                    r = n[0],
                    i = n[1];
                (s += i), e === o.length - 1 || s < u.width ? h.push(r) : ((f += i), y.push(r));
            }),
                (t = r.html('')).children.apply(t, h),
                (e = c.html('')).children.apply(e, y),
                l.css('width', ''.concat(f, 'px')),
                y.length > 0 ? i.show() : i.hide();
        }
        var yl = (function() {
            function t(e, n) {
                var r = this,
                    i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                al(this, t),
                    (this.data = e),
                    (this.change = function() {}),
                    (this.widthFn = n),
                    (this.isHide = i);
                var o = e.defaultStyle();
                (this.items = [
                    [
                        (this.undoEl = new Hc()),
                        (this.redoEl = new Pc()),
                        new Uc(),
                        (this.paintformatEl = new Bo()),
                        (this.clearformatEl = new No()),
                    ],
                    sl(),
                    [(this.formatEl = new Ja())],
                    sl(),
                    [(this.fontEl = new za()), (this.fontSizeEl = new wa())],
                    sl(),
                    [
                        (this.boldEl = new di()),
                        (this.italicEl = new ki()),
                        (this.underlineEl = new Ii()),
                        (this.strikeEl = new Ri()),
                        (this.textColorEl = new Go(o.color)),
                    ],
                    sl(),
                    [
                        (this.fillColorEl = new oa(o.bgcolor)),
                        (this.borderEl = new Oo()),
                        (this.mergeEl = new jc()),
                    ],
                    sl(),
                    [
                        (this.alignEl = new Wr(o.align)),
                        (this.valignEl = new Xr(o.valign)),
                        (this.textwrapEl = new Yc()),
                    ],
                    sl(),
                    [
                        (this.freezeEl = new mc()),
                        (this.autofilterEl = new ui()),
                        (this.formulaEl = new hc()),
                        (this.moreEl = new ol()),
                    ],
                ]),
                    (this.el = l('div', ''.concat(zt, '-toolbar'))),
                    (this.btns = l('div', ''.concat(zt, '-toolbar-btns'))),
                    this.items.forEach(function(t) {
                        Array.isArray(t)
                            ? t.forEach(function(t) {
                                  r.btns.child(t.el),
                                      (t.change = function() {
                                          r.change.apply(r, arguments);
                                      });
                              })
                            : r.btns.child(t.el);
                    }),
                    this.el.child(this.btns),
                    i
                        ? this.el.hide()
                        : (this.reset(),
                          setTimeout(function() {
                              fl.call(r), hl.call(r);
                          }, 0),
                          Ct(window, 'resize', function() {
                              hl.call(r);
                          }));
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'paintformatActive',
                        value: function() {
                            return this.paintformatEl.active();
                        },
                    },
                    {
                        key: 'paintformatToggle',
                        value: function() {
                            this.paintformatEl.toggle();
                        },
                    },
                    {
                        key: 'trigger',
                        value: function(t) {
                            this[''.concat(t, 'El')].click();
                        },
                    },
                    {
                        key: 'resetData',
                        value: function(t) {
                            (this.data = t), this.reset();
                        },
                    },
                    {
                        key: 'reset',
                        value: function() {
                            if (!this.isHide) {
                                var t = this.data,
                                    e = t.getSelectedCellStyle();
                                this.undoEl.setState(!t.canUndo()),
                                    this.redoEl.setState(!t.canRedo()),
                                    this.mergeEl.setState(t.canUnmerge(), !t.selector.multiple()),
                                    this.autofilterEl.setState(!t.canAutofilter());
                                var n = e.font,
                                    r = e.format;
                                this.formatEl.setState(r),
                                    this.fontEl.setState(n.name),
                                    this.fontSizeEl.setState(n.size),
                                    this.boldEl.setState(n.bold),
                                    this.italicEl.setState(n.italic),
                                    this.underlineEl.setState(e.underline),
                                    this.strikeEl.setState(e.strike),
                                    this.textColorEl.setState(e.color),
                                    this.fillColorEl.setState(e.bgcolor),
                                    this.alignEl.setState(e.align),
                                    this.valignEl.setState(e.valign),
                                    this.textwrapEl.setState(e.textwrap),
                                    this.freezeEl.setState(t.freezeIsActive());
                            }
                        },
                    },
                ]) && cl(e.prototype, n),
                r && cl(e, r),
                t
            );
        })();
        function pl(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return dl(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return dl(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return dl(t, e);
                })(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function dl(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function vl(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function bl(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var ml = (function() {
            function t(e, n) {
                var r,
                    i = this,
                    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '600px';
                vl(this, t),
                    (this.title = e),
                    (this.el = l('div', ''.concat(zt, '-modal'))
                        .css('width', o)
                        .children(
                            l('div', ''.concat(zt, '-modal-header')).children(
                                new ke('close').on('click.stop', function() {
                                    return i.hide();
                                }),
                                this.title,
                            ),
                            (r = l('div', ''.concat(zt, '-modal-content'))).children.apply(
                                r,
                                pl(n),
                            ),
                        )
                        .hide());
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'show',
                        value: function() {
                            var t = this;
                            (this.dimmer = l('div', ''.concat(zt, '-dimmer active'))),
                                document.body.appendChild(this.dimmer.el);
                            var e = this.el.show().box(),
                                n = e.width,
                                r = e.height,
                                i = document.documentElement,
                                o = i.clientHeight,
                                a = i.clientWidth;
                            this.el.offset({ left: (a - n) / 2, top: (o - r) / 3 }),
                                (window.xkeydownEsc = function(e) {
                                    27 === e.keyCode && t.hide();
                                }),
                                Ct(window, 'keydown', window.xkeydownEsc);
                        },
                    },
                    {
                        key: 'hide',
                        value: function() {
                            this.el.hide(),
                                document.body.removeChild(this.dimmer.el),
                                At(window, 'keydown', window.xkeydownEsc),
                                delete window.xkeydownEsc;
                        },
                    },
                ]) && bl(e.prototype, n),
                r && bl(e, r),
                t
            );
        })();
        function gl(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var wl = (function() {
            function t(e, n) {
                var r = this;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.vchange = function() {}),
                    (this.el = l('div', ''.concat(zt, '-form-input'))),
                    (this.input = l('input', '')
                        .css('width', e)
                        .on('input', function(t) {
                            return r.vchange(t);
                        })
                        .attr('placeholder', n)),
                    this.el.child(this.input);
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'focus',
                        value: function() {
                            var t = this;
                            setTimeout(function() {
                                t.input.el.focus();
                            }, 10);
                        },
                    },
                    {
                        key: 'hint',
                        value: function(t) {
                            this.input.attr('placeholder', t);
                        },
                    },
                    {
                        key: 'val',
                        value: function(t) {
                            return this.input.val(t);
                        },
                    },
                ]) && gl(e.prototype, n),
                r && gl(e, r),
                t
            );
        })();
        function kl(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function Sl(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var Ol = (function() {
            function t(e, n, r) {
                var i = this,
                    o =
                        arguments.length > 3 && void 0 !== arguments[3]
                            ? arguments[3]
                            : function(t) {
                                  return t;
                              },
                    a =
                        arguments.length > 4 && void 0 !== arguments[4]
                            ? arguments[4]
                            : function() {};
                kl(this, t),
                    (this.key = e),
                    (this.getTitle = o),
                    (this.vchange = function() {}),
                    (this.el = l('div', ''.concat(zt, '-form-select'))),
                    (this.suggest = new pe(
                        n.map(function(t) {
                            return { key: t, title: i.getTitle(t) };
                        }),
                        function(t) {
                            i.itemClick(t.key), a(t.key), i.vchange(t.key);
                        },
                        r,
                        this.el,
                    )),
                    this.el
                        .children(
                            (this.itemEl = l('div', 'input-text').html(this.getTitle(e))),
                            this.suggest.el,
                        )
                        .on('click', function() {
                            return i.show();
                        });
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'show',
                        value: function() {
                            this.suggest.search('');
                        },
                    },
                    {
                        key: 'itemClick',
                        value: function(t) {
                            (this.key = t), this.itemEl.html(this.getTitle(t));
                        },
                    },
                    {
                        key: 'val',
                        value: function(t) {
                            return void 0 !== t
                                ? ((this.key = t), this.itemEl.html(this.getTitle(t)), this)
                                : this.key;
                        },
                    },
                ]) && Sl(e.prototype, n),
                r && Sl(e, r),
                t
            );
        })();
        function xl(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var jl = { number: /(^\d+$)|(^\d+(\.\d{0,4})?$)/, date: /^\d{4}-\d{1,2}-\d{1,2}$/ },
            El = (function() {
                function t(e, n, r, i) {
                    var o = this;
                    !(function(t, e) {
                        if (!(t instanceof e))
                            throw new TypeError('Cannot call a class as a function');
                    })(this, t),
                        (this.label = ''),
                        (this.rule = n),
                        r &&
                            (this.label = l('label', 'label')
                                .css('width', ''.concat(i, 'px'))
                                .html(r)),
                        (this.tip = l('div', 'tip')
                            .child('tip')
                            .hide()),
                        (this.input = e),
                        (this.input.vchange = function() {
                            return o.validate();
                        }),
                        (this.el = l('div', ''.concat(zt, '-form-field')).children(
                            this.label,
                            e.el,
                            this.tip,
                        ));
                }
                var e, n, r;
                return (
                    (e = t),
                    (n = [
                        {
                            key: 'isShow',
                            value: function() {
                                return 'none' !== this.el.css('display');
                            },
                        },
                        {
                            key: 'show',
                            value: function() {
                                this.el.show();
                            },
                        },
                        {
                            key: 'hide',
                            value: function() {
                                return this.el.hide(), this;
                            },
                        },
                        {
                            key: 'val',
                            value: function(t) {
                                return this.input.val(t);
                            },
                        },
                        {
                            key: 'hint',
                            value: function(t) {
                                this.input.hint(t);
                            },
                        },
                        {
                            key: 'validate',
                            value: function() {
                                var t = this.input,
                                    e = this.rule,
                                    n = this.tip,
                                    r = this.el,
                                    i = t.val();
                                return e.required && /^\s*$/.test(i)
                                    ? (n.html(Q('validation.required')), r.addClass('error'), !1)
                                    : (!e.type && !e.pattern) || (e.pattern || jl[e.type]).test(i)
                                    ? (r.removeClass('error'), !0)
                                    : (n.html(Q('validation.notMatch')), r.addClass('error'), !1);
                            },
                        },
                    ]) && xl(e.prototype, n),
                    r && xl(e, r),
                    t
                );
            })();
        function Rl(t) {
            return (Rl =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function _l(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Cl(t, e) {
            return (Cl =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Al(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Tl(t);
                if (e) {
                    var i = Tl(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Pl(this, n);
            };
        }
        function Pl(t, e) {
            return !e || ('object' !== Rl(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Tl(t) {
            return (Tl = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var Il = (function(t) {
            !(function(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Super expression must either be null or a function');
                (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                    e && Cl(t, e);
            })(o, t);
            var e,
                n,
                r,
                i = Al(o);
            function o() {
                var t;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, o);
                var e = new El(
                        new Ol('cell', ['cell'], '100%', function(t) {
                            return Q('dataValidation.modeType.'.concat(t));
                        }),
                        { required: !0 },
                        ''.concat(Q('dataValidation.range'), ':'),
                        100,
                    ),
                    n = new El(new wl('120px', 'E3 or E3:F12'), {
                        required: !0,
                        pattern: /^([A-Z]{1,2}[1-9]\d*)(:[A-Z]{1,2}[1-9]\d*)?$/,
                    }),
                    r = new El(
                        new Ol(
                            'list',
                            ['list', 'number', 'date', 'phone', 'email'],
                            '100%',
                            function(t) {
                                return Q('dataValidation.type.'.concat(t));
                            },
                            function(e) {
                                return t.criteriaSelected(e);
                            },
                        ),
                        { required: !0 },
                        ''.concat(Q('dataValidation.criteria'), ':'),
                        100,
                    ),
                    a = new El(
                        new Ol(
                            'be',
                            ['be', 'nbe', 'eq', 'neq', 'lt', 'lte', 'gt', 'gte'],
                            '160px',
                            function(t) {
                                return Q('dataValidation.operator.'.concat(t));
                            },
                            function(e) {
                                return t.criteriaOperatorSelected(e);
                            },
                        ),
                        { required: !0 },
                    ).hide(),
                    c = new El(new wl('70px', '10'), { required: !0 }).hide(),
                    u = new El(new wl('70px', '100'), { required: !0, type: 'number' }).hide(),
                    s = new El(new wl('120px', 'a,b,c'), { required: !0 }),
                    f = new El(new wl('70px', '10'), { required: !0, type: 'number' }).hide();
                return (
                    ((t = i.call(this, Q('contextmenu.validation'), [
                        l('div', ''.concat(zt, '-form-fields')).children(e.el, n.el),
                        l('div', ''.concat(zt, '-form-fields')).children(
                            r.el,
                            a.el,
                            c.el,
                            u.el,
                            f.el,
                            s.el,
                        ),
                        l('div', ''.concat(zt, '-buttons')).children(
                            new We('cancel').on('click', function() {
                                return t.btnClick('cancel');
                            }),
                            new We('remove').on('click', function() {
                                return t.btnClick('remove');
                            }),
                            new We('save', 'primary').on('click', function() {
                                return t.btnClick('save');
                            }),
                        ),
                    ])).mf = e),
                    (t.rf = n),
                    (t.cf = r),
                    (t.of = a),
                    (t.minvf = c),
                    (t.maxvf = u),
                    (t.vf = f),
                    (t.svf = s),
                    (t.change = function() {}),
                    t
                );
            }
            return (
                (e = o),
                (n = [
                    {
                        key: 'showVf',
                        value: function(t) {
                            var e = 'date' === t ? '2018-11-12' : '10',
                                n = this.vf;
                            n.input.hint(e), n.show();
                        },
                    },
                    {
                        key: 'criteriaSelected',
                        value: function(t) {
                            var e = this.of,
                                n = this.minvf,
                                r = this.maxvf,
                                i = this.vf,
                                o = this.svf;
                            'date' === t || 'number' === t
                                ? (e.show(),
                                  (n.rule.type = t),
                                  (r.rule.type = t),
                                  'date' === t
                                      ? (n.hint('2018-11-12'), r.hint('2019-11-12'))
                                      : (n.hint('10'), r.hint('100')),
                                  n.show(),
                                  r.show(),
                                  i.hide(),
                                  o.hide())
                                : ('list' === t ? o.show() : o.hide(),
                                  i.hide(),
                                  e.hide(),
                                  n.hide(),
                                  r.hide());
                        },
                    },
                    {
                        key: 'criteriaOperatorSelected',
                        value: function(t) {
                            if (t) {
                                var e = this.minvf,
                                    n = this.maxvf,
                                    r = this.vf;
                                if ('be' === t || 'nbe' === t) e.show(), n.show(), r.hide();
                                else {
                                    var i = this.cf.val();
                                    (r.rule.type = i),
                                        'date' === i ? r.hint('2018-11-12') : r.hint('10'),
                                        r.show(),
                                        e.hide(),
                                        n.hide();
                                }
                            }
                        },
                    },
                    {
                        key: 'btnClick',
                        value: function(t) {
                            if ('cancel' === t) this.hide();
                            else if ('remove' === t) this.change('remove'), this.hide();
                            else if ('save' === t) {
                                for (
                                    var e = ['mf', 'rf', 'cf', 'of', 'svf', 'vf', 'minvf', 'maxvf'],
                                        n = 0;
                                    n < e.length;
                                    n += 1
                                ) {
                                    var r = this[e[n]];
                                    if (r.isShow() && !r.validate()) return;
                                }
                                var i = this.mf.val(),
                                    o = this.rf.val(),
                                    a = this.cf.val(),
                                    c = this.of.val(),
                                    l = this.svf.val();
                                ('number' !== a && 'date' !== a) ||
                                    (l =
                                        'be' === c || 'nbe' === c
                                            ? [this.minvf.val(), this.maxvf.val()]
                                            : this.vf.val()),
                                    this.change('save', i, o, {
                                        type: a,
                                        operator: c,
                                        required: !1,
                                        value: l,
                                    }),
                                    this.hide();
                            }
                        },
                    },
                    {
                        key: 'setValue',
                        value: function(t) {
                            if (t) {
                                var e = this.mf,
                                    n = this.rf,
                                    r = this.cf,
                                    i = this.of,
                                    o = this.svf,
                                    a = this.vf,
                                    c = this.minvf,
                                    l = this.maxvf,
                                    u = t.mode,
                                    s = t.ref,
                                    f = t.validator || { type: 'list' },
                                    h = f.type,
                                    y = f.operator,
                                    p = f.value;
                                e.val(u || 'cell'),
                                    n.val(s),
                                    r.val(h),
                                    i.val(y),
                                    Array.isArray(p)
                                        ? (c.val(p[0]), l.val(p[1]))
                                        : (o.val(p || ''), a.val(p || '')),
                                    this.criteriaSelected(h),
                                    this.criteriaOperatorSelected(y);
                            }
                            this.show();
                        },
                    },
                ]) && _l(e.prototype, n),
                r && _l(e, r),
                o
            );
        })(ml);
        function Dl(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function zl(t) {
            return l('div', ''.concat(zt, '-item ').concat(t));
        }
        function Ml(t) {
            var e = this;
            return zl('state')
                .child(Q('sort.'.concat(t)))
                .on('click.stop', function() {
                    return e.itemClick(t);
                });
        }
        function Hl(t) {
            var e = this,
                n = this.filterbEl,
                r = this.filterValues;
            n.html(''),
                Object.keys(t).forEach(function(i, o) {
                    var a = t[i],
                        c = r.includes(i) ? 'checked' : '';
                    n.child(
                        l('div', ''.concat(zt, '-item state ').concat(c))
                            .on('click.stop', function() {
                                return e.filterClick(o, i);
                            })
                            .children(
                                '' === i ? Q('filter.empty') : i,
                                l('div', 'label').html('('.concat(a, ')')),
                            ),
                    );
                });
        }
        function Nl() {
            var t = this.filterhEl,
                e = this.filterValues,
                n = this.values;
            t.html(''.concat(e.length, ' / ').concat(n.length)), t.checked(e.length === n.length);
        }
        var Fl = (function() {
            function t() {
                var e = this;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.filterbEl = l('div', ''.concat(zt, '-body'))),
                    (this.filterhEl = l('div', ''.concat(zt, '-header state')).on(
                        'click.stop',
                        function() {
                            return e.filterClick(0, 'all');
                        },
                    )),
                    (this.el = l('div', ''.concat(zt, '-sort-filter'))
                        .children(
                            (this.sortAscEl = Ml.call(this, 'asc')),
                            (this.sortDescEl = Ml.call(this, 'desc')),
                            zl('divider'),
                            l('div', ''.concat(zt, '-filter')).children(
                                this.filterhEl,
                                this.filterbEl,
                            ),
                            l('div', ''.concat(zt, '-buttons')).children(
                                new We('cancel').on('click', function() {
                                    return e.btnClick('cancel');
                                }),
                                new We('ok', 'primary').on('click', function() {
                                    return e.btnClick('ok');
                                }),
                            ),
                        )
                        .hide()),
                    (this.ci = null),
                    (this.sortDesc = null),
                    (this.values = null),
                    (this.filterValues = []);
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'btnClick',
                        value: function(t) {
                            if ('ok' === t) {
                                var e = this.ci,
                                    n = this.sort,
                                    r = this.filterValues;
                                this.ok && this.ok(e, n, 'in', r);
                            }
                            this.hide();
                        },
                    },
                    {
                        key: 'itemClick',
                        value: function(t) {
                            this.sort = t;
                            var e = this.sortAscEl,
                                n = this.sortDescEl;
                            e.checked('asc' === t), n.checked('desc' === t);
                        },
                    },
                    {
                        key: 'filterClick',
                        value: function(t, e) {
                            var n = this.filterbEl,
                                r = this.filterValues,
                                i = this.values,
                                o = n.children();
                            'all' === e
                                ? o.length === r.length
                                    ? ((this.filterValues = []),
                                      o.forEach(function(t) {
                                          return l(t).checked(!1);
                                      }))
                                    : ((this.filterValues = Array.from(i)),
                                      o.forEach(function(t) {
                                          return l(t).checked(!0);
                                      }))
                                : l(o[t]).toggle('checked')
                                ? r.push(e)
                                : r.splice(
                                      r.findIndex(function(t) {
                                          return t === e;
                                      }),
                                      1,
                                  ),
                                Nl.call(this);
                        },
                    },
                    {
                        key: 'set',
                        value: function(t, e, n, r) {
                            this.ci = t;
                            var i = this.sortAscEl,
                                o = this.sortDescEl;
                            null !== r
                                ? ((this.sort = r.order), i.checked(r.asc()), o.checked(r.desc()))
                                : ((this.sortDesc = null), i.checked(!1), o.checked(!1)),
                                (this.values = Object.keys(e)),
                                (this.filterValues = n ? Array.from(n.value) : Object.keys(e)),
                                Hl.call(this, e, n),
                                Nl.call(this);
                        },
                    },
                    {
                        key: 'setOffset',
                        value: function(t) {
                            var e = this;
                            this.el.offset(t).show();
                            var n = 1;
                            Tt(this.el, function() {
                                n <= 0 && e.hide(), (n -= 1);
                            });
                        },
                    },
                    {
                        key: 'show',
                        value: function() {
                            this.el.show();
                        },
                    },
                    {
                        key: 'hide',
                        value: function() {
                            this.el.hide(), Pt(this.el);
                        },
                    },
                ]) && Dl(e.prototype, n),
                r && Dl(e, r),
                t
            );
        })();
        function Wl(t, e) {
            var n = l('div', ''.concat(zt, '-toast')),
                r = l('div', ''.concat(zt, '-dimmer active'));
            n.children(
                l('div', ''.concat(zt, '-toast-header')).children(
                    new ke('close').on('click.stop', function() {
                        return (
                            document.body.removeChild(n.el), void document.body.removeChild(r.el)
                        );
                    }),
                    t,
                ),
                l('div', ''.concat(zt, '-toast-content')).html(e),
            ),
                document.body.appendChild(n.el),
                document.body.appendChild(r.el);
            var i = n.box(),
                o = i.width,
                a = i.height,
                c = document.documentElement,
                u = c.clientHeight,
                s = c.clientWidth;
            n.offset({ left: (s - o) / 2, top: (u - a) / 3 });
        }
        function Vl(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function ql(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return Ul(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return Ul(t, e);
                })(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function Ul(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function $l(t, e) {
            var n,
                r = this;
            return function() {
                for (var i = r, o = arguments.length, a = new Array(o), c = 0; c < o; c++)
                    a[c] = arguments[c];
                var l = a;
                n ||
                    (n = setTimeout(function() {
                        (n = null), t.apply(i, l);
                    }, e));
            };
        }
        function Bl() {
            var t = this.data,
                e = this.verticalScrollbar,
                n = this.horizontalScrollbar,
                r = t.getSelectedRect(),
                i = r.l,
                o = r.t,
                a = r.left,
                c = r.top,
                l = r.width,
                u = r.height,
                s = this.getTableOffset();
            if (Math.abs(a) + l > s.width) n.move({ left: i + l - s.width });
            else {
                var f = t.freezeTotalWidth();
                a < f && n.move({ left: i - 1 - f });
            }
            if (Math.abs(c) + u > s.height) e.move({ top: o + u - s.height - 1 });
            else {
                var h = t.freezeTotalHeight();
                c < h && e.move({ top: o - 1 - h });
            }
        }
        function Ll(t, e, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            if (-1 !== e || -1 !== n) {
                var o = this.table,
                    a = this.selector,
                    c = this.toolbar,
                    l = this.data,
                    u = this.contextMenu;
                u.setMode(-1 === e || -1 === n ? 'row-col' : 'range');
                var s = l.getCell(e, n);
                t
                    ? (a.setEnd(e, n, i), this.trigger('cells-selected', s, a.range))
                    : (a.set(e, n, r), this.trigger('cell-selected', s, e, n)),
                    c.reset(),
                    o.render();
            }
        }
        function Xl(t, e) {
            var n = this.selector,
                r = this.data,
                i = r.rows,
                o = r.cols,
                a = ql(n.indexes, 2),
                c = a[0],
                l = a[1],
                u = n.range,
                s = u.eri,
                f = u.eci;
            if (t) {
                var h = ql(n.moveIndexes, 2);
                (c = h[0]), (l = h[1]);
            }
            'left' === e
                ? l > 0 && (l -= 1)
                : 'right' === e
                ? (f !== l && (l = f), l < o.len - 1 && (l += 1))
                : 'up' === e
                ? c > 0 && (c -= 1)
                : 'down' === e
                ? (s !== c && (c = s), c < i.len - 1 && (c += 1))
                : 'row-first' === e
                ? (l = 0)
                : 'row-last' === e
                ? (l = o.len - 1)
                : 'col-first' === e
                ? (c = 0)
                : 'col-last' === e && (c = i.len - 1),
                t && (n.moveIndexes = [c, l]),
                Ll.call(this, t, c, l),
                Bl.call(this);
        }
        function Zl(t) {
            if (0 === t.buttons && t.target.className !== ''.concat(zt, '-resizer-hover')) {
                var e = t.offsetX,
                    n = t.offsetY,
                    r = this.rowResizer,
                    i = this.colResizer,
                    o = this.tableEl,
                    a = this.data,
                    c = a.rows,
                    l = a.cols;
                if (e > l.indexWidth && n > c.height) return r.hide(), void i.hide();
                var u = o.box(),
                    s = a.getCellRectByXY(t.offsetX, t.offsetY);
                s.ri >= 0 && -1 === s.ci
                    ? ((s.width = l.indexWidth),
                      r.show(s, { width: u.width }),
                      c.isHide(s.ri - 1) ? r.showUnhide(s.ri) : r.hideUnhide())
                    : r.hide(),
                    -1 === s.ri && s.ci >= 0
                        ? ((s.height = c.height),
                          i.show(s, { height: u.height }),
                          l.isHide(s.ci - 1) ? i.showUnhide(s.ci) : i.hideUnhide())
                        : i.hide();
            }
        }
        var Yl = 3;
        function Kl(t) {
            if (!((Yl -= 1) > 0)) {
                Yl = 3;
                var e = this.verticalScrollbar,
                    n = this.horizontalScrollbar,
                    r = this.data,
                    i = e.scroll().top,
                    o = n.scroll().left,
                    a = r.rows,
                    c = r.cols,
                    l = t.deltaY,
                    u = t.deltaX,
                    s = function(t, e) {
                        var n = t,
                            r = 0;
                        do {
                            (r = e(n)), (n += 1);
                        } while (r <= 0);
                        return r;
                    },
                    f = function(t) {
                        if (t > 0) {
                            var n = r.scroll.ri + 1;
                            if (n < a.len) {
                                var o = s(n, function(t) {
                                    return a.getHeight(t);
                                });
                                e.move({ top: i + o - 1 });
                            }
                        } else {
                            var c = r.scroll.ri - 1;
                            if (c >= 0) {
                                var l = s(c, function(t) {
                                    return a.getHeight(t);
                                });
                                e.move({ top: 0 === c ? 0 : i - l });
                            }
                        }
                    },
                    h = Math.abs(l),
                    y = Math.abs(u),
                    p = Math.max(h, y);
                /Firefox/i.test(window.navigator.userAgent) && $l(f(t.detail), 50),
                    p === y &&
                        $l(
                            (function(t) {
                                if (t > 0) {
                                    var e = r.scroll.ci + 1;
                                    if (e < c.len) {
                                        var i = s(e, function(t) {
                                            return c.getWidth(t);
                                        });
                                        n.move({ left: o + i - 1 });
                                    }
                                } else {
                                    var a = r.scroll.ci - 1;
                                    if (a >= 0) {
                                        var l = s(a, function(t) {
                                            return c.getWidth(t);
                                        });
                                        n.move({ left: 0 === a ? 0 : o - l });
                                    }
                                }
                            })(u),
                            50,
                        ),
                    p === h && $l(f(l), 50);
            }
        }
        function Jl(t, e) {
            var n = this.verticalScrollbar,
                r = this.horizontalScrollbar,
                i = n.scroll().top,
                o = r.scroll().left;
            'left' === t || 'right' === t
                ? r.move({ left: o - e })
                : ('up' !== t && 'down' !== t) || n.move({ top: i - e });
        }
        function Gl() {
            var t = this.data,
                e = this.verticalScrollbar,
                n = this.getTableOffset().height,
                r = t.exceptRowTotalHeight(0, -1);
            e.set(n, t.rows.totalHeight() - r);
        }
        function Ql() {
            var t = this.data,
                e = this.horizontalScrollbar,
                n = this.getTableOffset().width;
            t && e.set(n, t.cols.totalWidth());
        }
        function tu() {
            var t = this.selector,
                e = this.data,
                n = this.editor,
                r = ql(e.freeze, 2),
                i = r[0],
                o = r[1];
            if (i > 0 || o > 0) {
                var a = e.freezeTotalWidth(),
                    c = e.freezeTotalHeight();
                n.setFreezeLengths(a, c);
            }
            t.resetAreaOffset();
        }
        function eu() {
            var t = this.tableEl,
                e = this.overlayerEl,
                n = this.overlayerCEl,
                r = this.table,
                i = this.toolbar,
                o = this.selector,
                a = this.el,
                c = this.getTableOffset(),
                l = this.getRect();
            t.attr(l),
                e.offset(l),
                n.offset(c),
                a.css('width', ''.concat(l.width, 'px')),
                Gl.call(this),
                Ql.call(this),
                tu.call(this),
                r.render(),
                i.reset(),
                o.reset();
        }
        function nu() {
            var t = this.data,
                e = this.selector;
            t.clearClipboard(), e.hideClipboard();
        }
        function ru() {
            var t = this.data,
                e = this.selector;
            t.copy(), e.showClipboard();
        }
        function iu() {
            var t = this.data,
                e = this.selector;
            t.cut(), e.showClipboard();
        }
        function ou(t, e) {
            var n = this.data;
            if ('read' !== n.settings.mode)
                if (
                    n.paste(t, function(t) {
                        return Wl('Tip', t);
                    })
                )
                    eu.call(this);
                else if (e) {
                    var r = e.clipboardData.getData('text/plain');
                    this.data.pasteFromText(r), eu.call(this);
                }
        }
        function au() {
            this.data.hideRowsOrCols(), eu.call(this);
        }
        function cu(t, e) {
            this.data.unhideRowsOrCols(t, e), eu.call(this);
        }
        function lu() {
            this.data.autofilter(), eu.call(this);
        }
        function uu() {
            var t = this.toolbar;
            t.paintformatActive() &&
                (ou.call(this, 'format'), nu.call(this), t.paintformatToggle());
        }
        function su(t) {
            var e = this,
                n = this.selector,
                r = this.data,
                i = this.table,
                o = this.sortFilter,
                a = t.offsetX,
                c = t.offsetY,
                l = t.target.className === ''.concat(zt, '-selector-corner'),
                u = r.getCellRectByXY(a, c),
                s = u.left,
                f = u.top,
                h = u.width,
                y = u.height,
                p = u.ri,
                d = u.ci,
                v = r.autoFilter;
            if (v.includes(p, d) && s + h - 20 < a && f + y - 20 < c) {
                var b = v.items(d, function(t, e) {
                    return r.rows.getCell(t, e);
                });
                return (
                    o.hide(),
                    o.set(d, b, v.getFilter(d), v.getSort(d)),
                    void o.setOffset({ left: s, top: f + y + 2 })
                );
            }
            t.shiftKey ||
                (l ? n.showAutofill(p, d) : Ll.call(this, !1, p, d),
                It(
                    window,
                    function(t) {
                        var i = r.getCellRectByXY(t.offsetX, t.offsetY);
                        (p = i.ri),
                            (d = i.ci),
                            l
                                ? n.showAutofill(p, d)
                                : 1 !== t.buttons || t.shiftKey || Ll.call(e, !0, p, d, !0, !0);
                    },
                    function() {
                        l &&
                            n.arange &&
                            'read' !== r.settings.mode &&
                            r.autofill(n.arange, 'all', function(t) {
                                return Wl('Tip', t);
                            }) &&
                            i.render(),
                            n.hideAutofill(),
                            uu.call(e);
                    },
                )),
                l || 1 !== t.buttons || (t.shiftKey && Ll.call(this, !0, p, d));
        }
        function fu() {
            var t = this.editor,
                e = this.data.getSelectedRect(),
                n = this.getTableOffset(),
                r = 'top';
            e.top > n.height / 2 && (r = 'bottom'), t.setOffset(e, r);
        }
        function hu() {
            var t = this.editor,
                e = this.data;
            'read' !== e.settings.mode &&
                (fu.call(this),
                t.setCell(e.getSelectedCell(), e.getSelectedValidator()),
                nu.call(this));
        }
        function yu(t) {
            var e = this,
                n = this.data,
                r = this.table,
                i = this.selector;
            n.scrolly(t, function() {
                i.resetBRLAreaOffset(), fu.call(e), r.render();
            });
        }
        function pu(t) {
            var e = this,
                n = this.data,
                r = this.table,
                i = this.selector;
            n.scrollx(t, function() {
                i.resetBRTAreaOffset(), fu.call(e), r.render();
            });
        }
        function du(t, e) {
            var n = t.ri,
                r = this.table,
                i = this.selector;
            this.data.rows.setHeight(n, e),
                r.render(),
                i.resetAreaOffset(),
                Gl.call(this),
                fu.call(this);
        }
        function vu(t, e) {
            var n = t.ci,
                r = this.table,
                i = this.selector;
            this.data.cols.setWidth(n, e),
                r.render(),
                i.resetAreaOffset(),
                Ql.call(this),
                fu.call(this);
        }
        function bu(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'finished',
                n = this.data,
                r = this.table;
            if ('read' !== n.settings.mode) {
                n.setSelectedCellText(t, e);
                var i = n.selector,
                    o = i.ri,
                    a = i.ci;
                'finished' === e ? r.render() : this.trigger('cell-edited', t, o, a);
            }
        }
        function mu(t) {
            var e = this.data;
            'read' !== e.settings.mode &&
                ('insert-row' === t
                    ? e.insert('row')
                    : 'delete-row' === t
                    ? e.delete('row')
                    : 'insert-column' === t
                    ? e.insert('column')
                    : 'delete-column' === t
                    ? e.delete('column')
                    : 'delete-cell' === t
                    ? e.deleteCell()
                    : 'delete-cell-format' === t
                    ? e.deleteCell('format')
                    : 'delete-cell-text' === t
                    ? e.deleteCell('text')
                    : 'cell-printable' === t
                    ? e.setSelectedCellAttr('printable', !0)
                    : 'cell-non-printable' === t
                    ? e.setSelectedCellAttr('printable', !1)
                    : 'cell-editable' === t
                    ? e.setSelectedCellAttr('editable', !0)
                    : 'cell-non-editable' === t && e.setSelectedCellAttr('editable', !1),
                nu.call(this),
                eu.call(this));
        }
        function gu(t, e) {
            var n = this.data;
            if ('undo' === t) this.undo();
            else if ('redo' === t) this.redo();
            else if ('print' === t) this.print.preview();
            else if ('paintformat' === t) !0 === e ? ru.call(this) : nu.call(this);
            else if ('clearformat' === t) mu.call(this, 'delete-cell-format');
            else if ('link' === t);
            else if ('chart' === t);
            else if ('autofilter' === t) lu.call(this);
            else if ('freeze' === t)
                if (e) {
                    var r = n.selector,
                        i = r.ri,
                        o = r.ci;
                    this.freeze(i, o);
                } else this.freeze(0, 0);
            else
                n.setSelectedCellAttr(t, e),
                    'formula' !== t || n.selector.multiple() || hu.call(this),
                    eu.call(this);
        }
        function wu(t, e, n, r) {
            this.data.setAutoFilter(t, e, n, r), eu.call(this);
        }
        function ku() {
            var t,
                e,
                n,
                r,
                i,
                o,
                a = this,
                c = this.selector,
                l = this.overlayerEl,
                u = this.rowResizer,
                s = this.colResizer,
                f = this.verticalScrollbar,
                h = this.horizontalScrollbar,
                y = this.editor,
                p = this.contextMenu,
                d = this.toolbar,
                v = this.modalValidation,
                b = this.sortFilter;
            l
                .on('mousemove', function(t) {
                    Zl.call(a, t);
                })
                .on('mousedown', function(t) {
                    y.clear(),
                        p.hide(),
                        2 === t.buttons
                            ? (a.data.xyInSelectedRect(t.offsetX, t.offsetY) || su.call(a, t),
                              p.setPosition(t.offsetX, t.offsetY),
                              t.stopPropagation())
                            : 2 === t.detail
                            ? hu.call(a)
                            : su.call(a, t);
                })
                .on('mousewheel.stop', function(t) {
                    Kl.call(a, t);
                })
                .on('mouseout', function(t) {
                    var e = t.offsetX;
                    t.offsetY <= 0 && s.hide(), e <= 0 && u.hide();
                }),
                (c.inputChange = function(t) {
                    bu.call(a, t, 'input'), hu.call(a);
                }),
                (t = l.el),
                (n = (e = {
                    move: function(t, e) {
                        Jl.call(a, t, e);
                    },
                }).move),
                (r = e.end),
                (i = 0),
                (o = 0),
                Ct(t, 'touchstart', function(t) {
                    var e = t.touches[0],
                        n = e.pageX,
                        r = e.pageY;
                    (i = n), (o = r);
                }),
                Ct(t, 'touchmove', function(t) {
                    if (n) {
                        var e = t.changedTouches[0],
                            r = e.pageX,
                            a = e.pageY,
                            c = r - i,
                            l = a - o;
                        (Math.abs(c) > 10 || Math.abs(l) > 10) &&
                            (Dt(c, l, t, n), (i = r), (o = a)),
                            t.preventDefault();
                    }
                }),
                Ct(t, 'touchend', function(t) {
                    if (r) {
                        var e = t.changedTouches[0],
                            n = e.pageX,
                            a = e.pageY;
                        Dt(n - i, a - o, t, r);
                    }
                }),
                (d.change = function(t, e) {
                    return gu.call(a, t, e);
                }),
                (b.ok = function(t, e, n, r) {
                    return wu.call(a, t, e, n, r);
                }),
                (u.finishedFn = function(t, e) {
                    du.call(a, t, e);
                }),
                (s.finishedFn = function(t, e) {
                    vu.call(a, t, e);
                }),
                (u.unhideFn = function(t) {
                    cu.call(a, 'row', t);
                }),
                (s.unhideFn = function(t) {
                    cu.call(a, 'col', t);
                }),
                (f.moveFn = function(t, e) {
                    yu.call(a, t, e);
                }),
                (h.moveFn = function(t, e) {
                    pu.call(a, t, e);
                }),
                (y.change = function(t, e) {
                    bu.call(a, e, t);
                }),
                (v.change = function(t) {
                    if ('save' === t) {
                        for (
                            var e, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1;
                            i < n;
                            i++
                        )
                            r[i - 1] = arguments[i];
                        (e = a.data).addValidation.apply(e, r);
                    } else a.data.removeValidation();
                }),
                (p.itemClick = function(t) {
                    'validation' === t
                        ? v.setValue(a.data.getSelectedValidation())
                        : 'copy' === t
                        ? ru.call(a)
                        : 'cut' === t
                        ? iu.call(a)
                        : 'paste' === t
                        ? ou.call(a, 'all')
                        : 'paste-value' === t
                        ? ou.call(a, 'text')
                        : 'paste-format' === t
                        ? ou.call(a, 'format')
                        : 'hide' === t
                        ? au.call(a)
                        : mu.call(a, t);
                }),
                Ct(window, 'resize', function() {
                    a.reload();
                }),
                Ct(window, 'click', function(t) {
                    a.focusing = l.contains(t.target);
                }),
                Ct(window, 'paste', function(t) {
                    ou.call(a, 'all', t), t.preventDefault();
                }),
                Ct(window, 'keydown', function(t) {
                    if (a.focusing) {
                        var e = t.keyCode || t.which,
                            n = t.key,
                            r = t.ctrlKey,
                            i = t.shiftKey,
                            o = t.metaKey;
                        if (r || o)
                            switch (e) {
                                case 90:
                                    a.undo(), t.preventDefault();
                                    break;
                                case 89:
                                    a.redo(), t.preventDefault();
                                    break;
                                case 67:
                                    ru.call(a), t.preventDefault();
                                    break;
                                case 88:
                                    iu.call(a), t.preventDefault();
                                    break;
                                case 85:
                                    d.trigger('underline'), t.preventDefault();
                                    break;
                                case 86:
                                    break;
                                case 37:
                                    Xl.call(a, i, 'row-first'), t.preventDefault();
                                    break;
                                case 38:
                                    Xl.call(a, i, 'col-first'), t.preventDefault();
                                    break;
                                case 39:
                                    Xl.call(a, i, 'row-last'), t.preventDefault();
                                    break;
                                case 40:
                                    Xl.call(a, i, 'col-last'), t.preventDefault();
                                    break;
                                case 32:
                                    Ll.call(a, !1, -1, a.data.selector.ci, !1), t.preventDefault();
                                    break;
                                case 66:
                                    d.trigger('bold');
                                    break;
                                case 73:
                                    d.trigger('italic');
                            }
                        else {
                            switch (e) {
                                case 32:
                                    i && Ll.call(a, !1, a.data.selector.ri, -1, !1);
                                    break;
                                case 27:
                                    p.hide(), nu.call(a);
                                    break;
                                case 37:
                                    Xl.call(a, i, 'left'), t.preventDefault();
                                    break;
                                case 38:
                                    Xl.call(a, i, 'up'), t.preventDefault();
                                    break;
                                case 39:
                                    Xl.call(a, i, 'right'), t.preventDefault();
                                    break;
                                case 40:
                                    Xl.call(a, i, 'down'), t.preventDefault();
                                    break;
                                case 9:
                                    y.clear(),
                                        Xl.call(a, !1, i ? 'left' : 'right'),
                                        t.preventDefault();
                                    break;
                                case 13:
                                    y.clear(),
                                        Xl.call(a, !1, i ? 'up' : 'down'),
                                        t.preventDefault();
                                    break;
                                case 8:
                                    mu.call(a, 'delete-cell-text'), t.preventDefault();
                            }
                            'Delete' === n
                                ? (mu.call(a, 'delete-cell-text'), t.preventDefault())
                                : (e >= 65 && e <= 90) ||
                                  (e >= 48 && e <= 57) ||
                                  (e >= 96 && e <= 105) ||
                                  '=' === t.key
                                ? (bu.call(a, t.key, 'input'), hu.call(a))
                                : 113 === e && hu.call(a);
                        }
                    }
                });
        }
        var Su = (function() {
            function t(e, n) {
                var r = this;
                !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, t),
                    (this.eventMap = new Map());
                var i = n.settings,
                    o = i.view,
                    a = i.showToolbar,
                    c = i.showContextmenu;
                (this.el = l('div', ''.concat(zt, '-sheet'))),
                    (this.toolbar = new yl(n, o.width, !a)),
                    (this.print = new Jn(n)),
                    e.children(this.toolbar.el, this.el, this.print.el),
                    (this.data = n),
                    (this.tableEl = l('canvas', ''.concat(zt, '-table'))),
                    (this.rowResizer = new Nt(!1, n.rows.height)),
                    (this.colResizer = new Nt(!0, n.cols.minWidth)),
                    (this.verticalScrollbar = new Wt(!0)),
                    (this.horizontalScrollbar = new Wt(!1)),
                    (this.editor = new Ie(
                        vn,
                        function() {
                            return r.getTableOffset();
                        },
                        n.rows.height,
                    )),
                    (this.modalValidation = new Il()),
                    (this.contextMenu = new or(function() {
                        return r.getRect();
                    }, !c)),
                    (this.selector = new oe(n)),
                    (this.overlayerCEl = l('div', ''.concat(zt, '-overlayer-content')).children(
                        this.editor.el,
                        this.selector.el,
                    )),
                    (this.overlayerEl = l('div', ''.concat(zt, '-overlayer')).child(
                        this.overlayerCEl,
                    )),
                    (this.sortFilter = new Fl()),
                    this.el.children(
                        this.tableEl,
                        this.overlayerEl.el,
                        this.rowResizer.el,
                        this.colResizer.el,
                        this.verticalScrollbar.el,
                        this.horizontalScrollbar.el,
                        this.contextMenu.el,
                        this.modalValidation.el,
                        this.sortFilter.el,
                    ),
                    (this.table = new Vn(this.tableEl.el, n)),
                    ku.call(this),
                    eu.call(this),
                    Ll.call(this, !1, 0, 0);
            }
            var e, n, r;
            return (
                (e = t),
                (n = [
                    {
                        key: 'on',
                        value: function(t, e) {
                            return this.eventMap.set(t, e), this;
                        },
                    },
                    {
                        key: 'trigger',
                        value: function(t) {
                            var e = this.eventMap;
                            if (e.has(t)) {
                                for (
                                    var n,
                                        r = arguments.length,
                                        i = new Array(r > 1 ? r - 1 : 0),
                                        o = 1;
                                    o < r;
                                    o++
                                )
                                    i[o - 1] = arguments[o];
                                (n = e.get(t)).call.apply(n, [this].concat(i));
                            }
                        },
                    },
                    {
                        key: 'resetData',
                        value: function(t) {
                            this.editor.clear(),
                                (this.data = t),
                                Gl.call(this),
                                Ql.call(this),
                                this.toolbar.resetData(t),
                                this.print.resetData(t),
                                this.selector.resetData(t),
                                this.table.resetData(t);
                        },
                    },
                    {
                        key: 'loadData',
                        value: function(t) {
                            return this.data.setData(t), eu.call(this), this;
                        },
                    },
                    {
                        key: 'freeze',
                        value: function(t, e) {
                            return this.data.setFreeze(t, e), eu.call(this), this;
                        },
                    },
                    {
                        key: 'undo',
                        value: function() {
                            this.data.undo(), eu.call(this);
                        },
                    },
                    {
                        key: 'redo',
                        value: function() {
                            this.data.redo(), eu.call(this);
                        },
                    },
                    {
                        key: 'reload',
                        value: function() {
                            return eu.call(this), this;
                        },
                    },
                    {
                        key: 'getRect',
                        value: function() {
                            var t = this.data;
                            return { width: t.viewWidth(), height: t.viewHeight() };
                        },
                    },
                    {
                        key: 'getTableOffset',
                        value: function() {
                            var t = this.data,
                                e = t.rows,
                                n = t.cols,
                                r = this.getRect(),
                                i = r.width,
                                o = r.height;
                            return {
                                width: i - n.indexWidth,
                                height: o - e.height,
                                left: n.indexWidth,
                                top: e.height,
                            };
                        },
                    },
                ]) && Vl(e.prototype, n),
                r && Vl(e, r),
                t
            );
        })();
        function Ou(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                Eu(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function xu(t) {
            return (xu =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        function ju(t) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return Ru(t);
                })(t) ||
                (function(t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(t))
                        return Array.from(t);
                })(t) ||
                Eu(t) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function Eu(t, e) {
            if (t) {
                if ('string' == typeof t) return Ru(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return (
                    'Object' === n && t.constructor && (n = t.constructor.name),
                    'Map' === n || 'Set' === n
                        ? Array.from(t)
                        : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                        ? Ru(t, e)
                        : void 0
                );
            }
        }
        function Ru(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function _u(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function Cu(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        function Au(t, e, n) {
            return e && Cu(t.prototype, e), n && Cu(t, n), t;
        }
        function Pu(t, e) {
            return (Pu =
                Object.setPrototypeOf ||
                function(t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function Tu(t) {
            var e = (function() {
                if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
                    );
                } catch (t) {
                    return !1;
                }
            })();
            return function() {
                var n,
                    r = Du(t);
                if (e) {
                    var i = Du(this).constructor;
                    n = Reflect.construct(r, arguments, i);
                } else n = r.apply(this, arguments);
                return Iu(this, n);
            };
        }
        function Iu(t, e) {
            return !e || ('object' !== xu(e) && 'function' != typeof e)
                ? (function(t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                          );
                      return t;
                  })(t)
                : e;
        }
        function Du(t) {
            return (Du = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        var zu = (function(t) {
                !(function(t, e) {
                    if ('function' != typeof e && null !== e)
                        throw new TypeError('Super expression must either be null or a function');
                    (t.prototype = Object.create(e && e.prototype, {
                        constructor: { value: t, writable: !0, configurable: !0 },
                    })),
                        e && Pu(t, e);
                })(n, t);
                var e = Tu(n);
                function n(t) {
                    var r;
                    _u(this, n);
                    var i = new ke('ellipsis');
                    return ((r = e.call(this, i, 'auto', !1, 'top-left')).contentClick = t), r;
                }
                return (
                    Au(n, [
                        {
                            key: 'reset',
                            value: function(t) {
                                var e = this,
                                    n = t.map(function(t, n) {
                                        return l('div', ''.concat(zt, '-item'))
                                            .css('width', '150px')
                                            .css('font-weight', 'normal')
                                            .on('click', function() {
                                                e.contentClick(n), e.hide();
                                            })
                                            .child(t);
                                    });
                                this.setContentChildren.apply(this, ju(n));
                            },
                        },
                        { key: 'setTitle', value: function() {} },
                    ]),
                    n
                );
            })(xr),
            Mu = [{ key: 'delete', title: tt('contextmenu.deleteSheet') }];
        function Hu(t) {
            var e = this;
            return l('div', ''.concat(zt, '-item'))
                .child(t.title())
                .on('click', function() {
                    e.itemClick(t.key), e.hide();
                });
        }
        function Nu() {
            var t = this;
            return Mu.map(function(e) {
                return Hu.call(t, e);
            });
        }
        var Fu = (function() {
                function t() {
                    var e;
                    _u(this, t),
                        (this.el = (e = l('div', ''.concat(zt, '-contextmenu')).css(
                            'width',
                            '160px',
                        )).children
                            .apply(e, ju(Nu.call(this)))
                            .hide()),
                        (this.itemClick = function() {});
                }
                return (
                    Au(t, [
                        {
                            key: 'hide',
                            value: function() {
                                var t = this.el;
                                t.hide(), Pt(t);
                            },
                        },
                        {
                            key: 'setOffset',
                            value: function(t) {
                                var e = this.el;
                                e.offset(t), e.show(), Tt(e);
                            },
                        },
                    ]),
                    t
                );
            })(),
            Wu = (function() {
                function t() {
                    var e = this,
                        n =
                            arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : function() {},
                        r =
                            arguments.length > 1 && void 0 !== arguments[1]
                                ? arguments[1]
                                : function() {},
                        i =
                            arguments.length > 2 && void 0 !== arguments[2]
                                ? arguments[2]
                                : function() {},
                        o =
                            arguments.length > 3 && void 0 !== arguments[3]
                                ? arguments[3]
                                : function() {};
                    _u(this, t),
                        (this.swapFunc = r),
                        (this.updateFunc = o),
                        (this.dataNames = []),
                        (this.activeEl = null),
                        (this.deleteEl = null),
                        (this.items = []),
                        (this.moreEl = new zu(function(t) {
                            e.clickSwap2(e.items[t]);
                        })),
                        (this.contextMenu = new Fu()),
                        (this.contextMenu.itemClick = i),
                        (this.el = l('div', ''.concat(zt, '-bottombar')).children(
                            this.contextMenu.el,
                            (this.menuEl = l('ul', ''.concat(zt, '-menu')).child(
                                l('li', '').children(
                                    new ke('add').on('click', function() {
                                        e.dataNames.length < 10
                                            ? n()
                                            : Wl('tip', 'it less than or equal to 10');
                                    }),
                                    l('span', '').child(this.moreEl),
                                ),
                            )),
                        ));
                }
                return (
                    Au(t, [
                        {
                            key: 'addItem',
                            value: function(t, e) {
                                var n = this;
                                this.dataNames.push(t);
                                var r = l('li', e ? 'active' : '').child(t);
                                r
                                    .on('click', function() {
                                        n.clickSwap2(r);
                                    })
                                    .on('contextmenu', function(t) {
                                        var e = t.target,
                                            i = e.offsetLeft,
                                            o = e.offsetHeight;
                                        n.contextMenu.setOffset({ left: i, bottom: o + 1 }),
                                            (n.deleteEl = r);
                                    })
                                    .on('dblclick', function() {
                                        var t = r.html(),
                                            e = new wl('auto', '');
                                        e.val(t),
                                            e.input.on('blur', function(e) {
                                                var r = e.target.value,
                                                    i = n.dataNames.findIndex(function(e) {
                                                        return e === t;
                                                    });
                                                n.renameItem(i, r);
                                            }),
                                            r.html('').child(e.el),
                                            e.focus();
                                    }),
                                    e && this.clickSwap(r),
                                    this.items.push(r),
                                    this.menuEl.child(r),
                                    this.moreEl.reset(this.dataNames);
                            },
                        },
                        {
                            key: 'renameItem',
                            value: function(t, e) {
                                this.dataNames.splice(t, 1, e),
                                    this.moreEl.reset(this.dataNames),
                                    this.items[t].html('').child(e),
                                    this.updateFunc(t, e);
                            },
                        },
                        {
                            key: 'clear',
                            value: function() {
                                var t = this;
                                this.items.forEach(function(e) {
                                    t.menuEl.removeChild(e.el);
                                }),
                                    (this.items = []),
                                    (this.dataNames = []),
                                    this.moreEl.reset(this.dataNames);
                            },
                        },
                        {
                            key: 'deleteItem',
                            value: function() {
                                var t = this.activeEl,
                                    e = this.deleteEl;
                                if (this.items.length > 1) {
                                    var n = this.items.findIndex(function(t) {
                                        return t === e;
                                    });
                                    if (
                                        (this.items.splice(n, 1),
                                        this.dataNames.splice(n, 1),
                                        this.menuEl.removeChild(e.el),
                                        this.moreEl.reset(this.dataNames),
                                        t === e)
                                    ) {
                                        var r = Ou(this.items, 1)[0];
                                        return (this.activeEl = r), this.activeEl.toggle(), [n, 0];
                                    }
                                    return [n, -1];
                                }
                                return [-1];
                            },
                        },
                        {
                            key: 'clickSwap2',
                            value: function(t) {
                                var e = this.items.findIndex(function(e) {
                                    return e === t;
                                });
                                this.clickSwap(t), this.activeEl.toggle(), this.swapFunc(e);
                            },
                        },
                        {
                            key: 'clickSwap',
                            value: function(t) {
                                null !== this.activeEl && this.activeEl.toggle(),
                                    (this.activeEl = t);
                            },
                        },
                    ]),
                    t
                );
            })();
        n(1);
        function Vu(t, e) {
            return (
                (function(t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function(t, e) {
                    if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var a, c = t[Symbol.iterator]();
                            !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e);
                            r = !0
                        );
                    } catch (t) {
                        (i = !0), (o = t);
                    } finally {
                        try {
                            r || null == c.return || c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                })(t, e) ||
                (function(t, e) {
                    if (!t) return;
                    if ('string' == typeof t) return qu(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    'Object' === n && t.constructor && (n = t.constructor.name);
                    if ('Map' === n || 'Set' === n) return Array.from(t);
                    if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                        return qu(t, e);
                })(t, e) ||
                (function() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                })()
            );
        }
        function qu(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r;
        }
        function Uu(t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        }
        function $u(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
            }
        }
        var Bu = (function() {
                function t(e) {
                    var n = this,
                        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    Uu(this, t);
                    var i = e;
                    (this.options = r),
                        (this.sheetIndex = 1),
                        (this.datas = []),
                        'string' == typeof e && (i = document.querySelector(e)),
                        (this.bottombar = new Wu(
                            function() {
                                var t = n.addSheet();
                                n.sheet.resetData(t);
                            },
                            function(t) {
                                var e = n.datas[t];
                                n.sheet.resetData(e);
                            },
                            function() {
                                n.deleteSheet();
                            },
                            function(t, e) {
                                n.datas[t].name = e;
                            },
                        )),
                        (this.data = this.addSheet());
                    var o = l('div', ''.concat(zt)).on('contextmenu', function(t) {
                        return t.preventDefault();
                    });
                    i.appendChild(o.el),
                        (this.sheet = new Su(o, this.data)),
                        o.child(this.bottombar.el);
                }
                var e, n, r;
                return (
                    (e = t),
                    (r = [
                        {
                            key: 'locale',
                            value: function(t, e) {
                                et(t, e);
                            },
                        },
                    ]),
                    (n = [
                        {
                            key: 'addSheet',
                            value: function(t) {
                                var e = this,
                                    n =
                                        !(arguments.length > 1 && void 0 !== arguments[1]) ||
                                        arguments[1],
                                    r = t || 'sheet'.concat(this.sheetIndex),
                                    i = new _t(r, this.options);
                                return (
                                    (i.change = function() {
                                        for (
                                            var t, n = arguments.length, r = new Array(n), i = 0;
                                            i < n;
                                            i++
                                        )
                                            r[i] = arguments[i];
                                        (t = e.sheet).trigger.apply(t, ['change'].concat(r));
                                    }),
                                    this.datas.push(i),
                                    this.bottombar.addItem(r, n),
                                    (this.sheetIndex += 1),
                                    i
                                );
                            },
                        },
                        {
                            key: 'deleteSheet',
                            value: function() {
                                var t = Vu(this.bottombar.deleteItem(), 2),
                                    e = t[0],
                                    n = t[1];
                                e >= 0 &&
                                    (this.datas.splice(e, 1),
                                    n >= 0 && this.sheet.resetData(this.datas[n]));
                            },
                        },
                        {
                            key: 'loadData',
                            value: function(t) {
                                var e = Array.isArray(t) ? t : [t];
                                if ((this.bottombar.clear(), (this.datas = []), e.length > 0))
                                    for (var n = 0; n < e.length; n += 1) {
                                        var r = e[n],
                                            i = this.addSheet(r.name, 0 === n);
                                        i.setData(r), 0 === n && this.sheet.resetData(i);
                                    }
                                return this;
                            },
                        },
                        {
                            key: 'getData',
                            value: function() {
                                return this.datas.map(function(t) {
                                    return t.getData();
                                });
                            },
                        },
                        {
                            key: 'cellText',
                            value: function(t, e, n) {
                                var r =
                                    arguments.length > 3 && void 0 !== arguments[3]
                                        ? arguments[3]
                                        : 0;
                                return this.datas[r].setCellText(t, e, n, 'finished'), this;
                            },
                        },
                        {
                            key: 'cell',
                            value: function(t, e) {
                                var n =
                                    arguments.length > 2 && void 0 !== arguments[2]
                                        ? arguments[2]
                                        : 0;
                                return this.datas[n].getCell(t, e);
                            },
                        },
                        {
                            key: 'cellStyle',
                            value: function(t, e) {
                                var n =
                                    arguments.length > 2 && void 0 !== arguments[2]
                                        ? arguments[2]
                                        : 0;
                                return this.datas[n].getCellStyle(t, e);
                            },
                        },
                        {
                            key: 'reRender',
                            value: function() {
                                return this.sheet.table.render(), this;
                            },
                        },
                        {
                            key: 'on',
                            value: function(t, e) {
                                return this.sheet.on(t, e), this;
                            },
                        },
                        {
                            key: 'validate',
                            value: function() {
                                return this.data.validations.errors.size <= 0;
                            },
                        },
                        {
                            key: 'change',
                            value: function(t) {
                                return this.sheet.on('change', t), this;
                            },
                        },
                    ]) && $u(e.prototype, n),
                    r && $u(e, r),
                    t
                );
            })(),
            Lu = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return new Bu(t, e);
            };
        window &&
            ((window.x_spreadsheet = Lu),
            (window.x_spreadsheet.locale = function(t, e) {
                return et(t, e);
            }));
        e.default = Bu;
    },
]);
//# sourceMappingURL=spreadsheet.js.map
