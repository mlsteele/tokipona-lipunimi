/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var Dictionary = __webpack_require__(4);
	Dictionary.init(getQueryParameter("backend") || "fuse");

	var colors = {
	  lightOrange: "hsl(30, 100%, 85%)",
	  lightBlue: "hsl(175, 50%, 93%)",
	  lightGrey: "hsl(0, 0%, 30%)"
	};

	var Root = React.createClass({
	  displayName: "Root",

	  getInitialState: function () {
	    return { query: "" };
	  },

	  _setQuery: function (query) {
	    this.setState({ query: query });
	  },

	  _onInputChange(event) {
	    this._setQuery(event.target.value);
	  },

	  render: function () {
	    var entries = Dictionary.search(this.state.query);
	    var entryElements = entries.map(function (entry, i) {
	      var key = simpleHash(entry.toki);
	      return React.createElement(WordEntry, { key: entry.toki, i: i,
	        eng: entry.eng, toki: entry.toki });
	    });

	    var instructions = null;
	    if (this.state.query.length == 0) {
	      instructions = React.createElement(
	        "div",
	        { style: _.extend({}, this.styles.subtext, { maxWidth: 350 }) },
	        "Enter a word or phrase in English or Toki Pona."
	      );
	    }

	    var nomatch = null;
	    if (this.state.query.length > 0 && entries.length == 0) {
	      nomatch = React.createElement(
	        "div",
	        { style: _.extend({}, this.styles.subtext, { maxWidth: 150 }) },
	        "No matching words."
	      );
	    }

	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "div",
	        { style: this.styles.inputWrap },
	        React.createElement("input", { style: this.styles.tpinput, autoFocus: true, type: "text", onChange: this._onInputChange }),
	        React.createElement(About, { url: "https://github.com/mlsteele/tokipona-lipunimi" })
	      ),
	      instructions,
	      nomatch,
	      entryElements
	    );
	  }
	});

	Root.prototype.styles = {
	  inputWrap: {
	    width: "100%",
	    padding: "10px 10px",
	    backgroundColor: colors.lightOrange,
	    marginBottom: 10,
	    textAlign: "center"
	  },
	  tpinput: {
	    display: "inline-block",
	    borderWidth: 1,
	    borderColor: "black",
	    maxWidth: 230,
	    height: "1.4em",
	    fontSize: "1.4em",
	    padding: "5px 7px",
	    margin: "0 auto"
	  },
	  subtext: {
	    fontFamily: "'Open Sans', sans-serif",
	    fontSize: "16px",
	    margin: "0 auto",
	    color: colors.lightGrey,
	    padding: 10,
	    paddingTop: 10
	  }
	};

	var WordEntry = React.createClass({
	  displayName: "WordEntry",

	  propTypes: {
	    eng: React.PropTypes.string.isRequired,
	    toki: React.PropTypes.string.isRequired,
	    i: React.PropTypes.number.isRequired
	  },

	  render: function () {
	    var boxStyle = this.styles.box;
	    if (this.props.i % 2 === 0) {
	      boxStyle = _.extend({}, this.styles.box, this.styles.even);
	    }

	    return React.createElement(
	      "div",
	      { style: boxStyle },
	      React.createElement(
	        "p",
	        { style: this.styles.toki },
	        this.props.toki
	      ),
	      React.createElement(
	        "p",
	        { style: this.styles.eng },
	        this.props.eng
	      )
	    );
	  }
	});

	WordEntry.prototype.styles = {
	  box: {
	    padding: "15px 25px",
	    width: "80%",
	    margin: "5px auto",
	    borderBottom: "1px solid #444"
	  },
	  toki: {
	    color: colors.lightGrey,
	    fontFamily: "'Open Sans', sans-serif",
	    fontWeight: 600,
	    margin: 0,
	    padding: 0
	  },
	  eng: {
	    color: colors.lightGrey,
	    fontFamily: "'Open Sans', sans-serif",
	    margin: 0,
	    padding: 0
	  },
	  even: {
	    // backgroundColor: colors.lightBlue,
	  }
	};

	document.addEventListener("DOMContentLoaded", function (event) {
	  ReactDOM.render(React.createElement(Root, null), document.getElementById("react-container"));
	});

	var About = React.createClass({
	  displayName: "About",

	  propTypes: {
	    url: React.PropTypes.string.isRequired
	  },

	  render: function () {
	    return React.createElement(
	      "a",
	      { href: this.props.url },
	      React.createElement(
	        "div",
	        { style: this.styles.box },
	        React.createElement(
	          "span",
	          null,
	          "?"
	        )
	      )
	    );
	  }
	});

	About.prototype.styles = {
	  box: {
	    float: "right",
	    width: 23,
	    height: 23,
	    textAlign: "center",
	    borderRadius: 50,
	    padding: 10,
	    margin: 0,
	    marginRight: 20,
	    backgroundColor: "hsla(0, 0%, 100%, 0.5)",
	    fontSize: "23px",
	    lineHeight: 1,
	    color: "hsl(0, 0%, 50%)"
	  }
	};

	var simpleHash = function (x) {
	  var hash = 0,
	      i,
	      chr,
	      len;
	  if (x.length === 0) return hash;
	  for (i = 0, len = x.length; i < len; i++) {
	    chr = x.charCodeAt(i);
	    hash = (hash << 5) - hash + chr;
	    hash |= 0; // Convert to 32bit integer
	  }
	  return hash;
	};

	function getQueryParameter(name) {
	  // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
	  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	  var results = regex.exec(location.search);
	  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * lodash 3.10.1 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
	 * Build: `lodash modern -o ./lodash.js`
	 */
	;(function () {
	  function n(n, t) {
	    if (n !== t) {
	      var r = null === n,
	          e = n === w,
	          u = n === n,
	          o = null === t,
	          i = t === w,
	          f = t === t;if (n > t && !o || !u || r && !i && f || e && f) return 1;if (n < t && !r || !f || o && !e && u || i && u) return -1;
	    }return 0;
	  }function t(n, t, r) {
	    for (var e = n.length, u = r ? e : -1; r ? u-- : ++u < e;) if (t(n[u], u, n)) return u;return -1;
	  }function r(n, t, r) {
	    if (t !== t) return p(n, r);r -= 1;for (var e = n.length; ++r < e;) if (n[r] === t) return r;return -1;
	  }function e(n) {
	    return typeof n == "function" || false;
	  }function u(n) {
	    return null == n ? "" : n + "";
	  }function o(n, t) {
	    for (var r = -1, e = n.length; ++r < e && -1 < t.indexOf(n.charAt(r)););
	    return r;
	  }function i(n, t) {
	    for (var r = n.length; r-- && -1 < t.indexOf(n.charAt(r)););return r;
	  }function f(t, r) {
	    return n(t.a, r.a) || t.b - r.b;
	  }function a(n) {
	    return Nn[n];
	  }function c(n) {
	    return Tn[n];
	  }function l(n, t, r) {
	    return t ? n = Bn[n] : r && (n = Dn[n]), "\\" + n;
	  }function s(n) {
	    return "\\" + Dn[n];
	  }function p(n, t, r) {
	    var e = n.length;for (t += r ? 0 : -1; r ? t-- : ++t < e;) {
	      var u = n[t];if (u !== u) return t;
	    }return -1;
	  }function h(n) {
	    return !!n && typeof n == "object";
	  }function _(n) {
	    return 160 >= n && 9 <= n && 13 >= n || 32 == n || 160 == n || 5760 == n || 6158 == n || 8192 <= n && (8202 >= n || 8232 == n || 8233 == n || 8239 == n || 8287 == n || 12288 == n || 65279 == n);
	  }function v(n, t) {
	    for (var r = -1, e = n.length, u = -1, o = []; ++r < e;) n[r] === t && (n[r] = z, o[++u] = r);return o;
	  }function g(n) {
	    for (var t = -1, r = n.length; ++t < r && _(n.charCodeAt(t)););return t;
	  }function y(n) {
	    for (var t = n.length; t-- && _(n.charCodeAt(t)););return t;
	  }function d(n) {
	    return Ln[n];
	  }function m(_) {
	    function Nn(n) {
	      if (h(n) && !(Oo(n) || n instanceof zn)) {
	        if (n instanceof Ln) return n;if (nu.call(n, "__chain__") && nu.call(n, "__wrapped__")) return Mr(n);
	      }return new Ln(n);
	    }function Tn() {}function Ln(n, t, r) {
	      this.__wrapped__ = n, this.__actions__ = r || [], this.__chain__ = !!t;
	    }function zn(n) {
	      this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = Ru, this.__views__ = [];
	    }function Bn() {
	      this.__data__ = {};
	    }function Dn(n) {
	      var t = n ? n.length : 0;for (this.data = { hash: gu(null), set: new lu() }; t--;) this.push(n[t]);
	    }function Mn(n, t) {
	      var r = n.data;return (typeof t == "string" || ge(t) ? r.set.has(t) : r.hash[t]) ? 0 : -1;
	    }function qn(n, t) {
	      var r = -1,
	          e = n.length;for (t || (t = Be(e)); ++r < e;) t[r] = n[r];return t;
	    }function Pn(n, t) {
	      for (var r = -1, e = n.length; ++r < e && false !== t(n[r], r, n););
	      return n;
	    }function Kn(n, t) {
	      for (var r = -1, e = n.length; ++r < e;) if (!t(n[r], r, n)) return false;return true;
	    }function Vn(n, t) {
	      for (var r = -1, e = n.length, u = -1, o = []; ++r < e;) {
	        var i = n[r];t(i, r, n) && (o[++u] = i);
	      }return o;
	    }function Gn(n, t) {
	      for (var r = -1, e = n.length, u = Be(e); ++r < e;) u[r] = t(n[r], r, n);return u;
	    }function Jn(n, t) {
	      for (var r = -1, e = t.length, u = n.length; ++r < e;) n[u + r] = t[r];return n;
	    }function Xn(n, t, r, e) {
	      var u = -1,
	          o = n.length;for (e && o && (r = n[++u]); ++u < o;) r = t(r, n[u], u, n);return r;
	    }function Hn(n, t) {
	      for (var r = -1, e = n.length; ++r < e;) if (t(n[r], r, n)) return true;
	      return false;
	    }function Qn(n, t, r, e) {
	      return n !== w && nu.call(e, r) ? n : t;
	    }function nt(n, t, r) {
	      for (var e = -1, u = zo(t), o = u.length; ++e < o;) {
	        var i = u[e],
	            f = n[i],
	            a = r(f, t[i], i, n, t);(a === a ? a === f : f !== f) && (f !== w || i in n) || (n[i] = a);
	      }return n;
	    }function tt(n, t) {
	      return null == t ? n : et(t, zo(t), n);
	    }function rt(n, t) {
	      for (var r = -1, e = null == n, u = !e && Er(n), o = u ? n.length : 0, i = t.length, f = Be(i); ++r < i;) {
	        var a = t[r];f[r] = u ? Cr(a, o) ? n[a] : w : e ? w : n[a];
	      }return f;
	    }function et(n, t, r) {
	      r || (r = {});for (var e = -1, u = t.length; ++e < u;) {
	        var o = t[e];r[o] = n[o];
	      }return r;
	    }function ut(n, t, r) {
	      var e = typeof n;return "function" == e ? t === w ? n : Bt(n, t, r) : null == n ? Fe : "object" == e ? bt(n) : t === w ? ze(n) : xt(n, t);
	    }function ot(n, t, r, e, u, o, i) {
	      var f;if (r && (f = u ? r(n, e, u) : r(n)), f !== w) return f;if (!ge(n)) return n;if (e = Oo(n)) {
	        if (f = kr(n), !t) return qn(n, f);
	      } else {
	        var a = ru.call(n),
	            c = a == K;if (a != Z && a != B && (!c || u)) return Fn[a] ? Rr(n, a, t) : u ? n : {};if (f = Ir(c ? {} : n), !t) return tt(f, n);
	      }for (o || (o = []), i || (i = []), u = o.length; u--;) if (o[u] == n) return i[u];return o.push(n), i.push(f), (e ? Pn : _t)(n, function (e, u) {
	        f[u] = ot(e, t, r, u, n, o, i);
	      }), f;
	    }function it(n, t, r) {
	      if (typeof n != "function") throw new Ge(L);return su(function () {
	        n.apply(w, r);
	      }, t);
	    }function ft(n, t) {
	      var e = n ? n.length : 0,
	          u = [];if (!e) return u;var o = -1,
	          i = xr(),
	          f = i === r,
	          a = f && t.length >= F && gu && lu ? new Dn(t) : null,
	          c = t.length;a && (i = Mn, f = false, t = a);n: for (; ++o < e;) if (a = n[o], f && a === a) {
	        for (var l = c; l--;) if (t[l] === a) continue n;u.push(a);
	      } else 0 > i(t, a, 0) && u.push(a);return u;
	    }function at(n, t) {
	      var r = true;return Su(n, function (n, e, u) {
	        return r = !!t(n, e, u);
	      }), r;
	    }function ct(n, t, r, e) {
	      var u = e,
	          o = u;return Su(n, function (n, i, f) {
	        i = +t(n, i, f), (r(i, u) || i === e && i === o) && (u = i, o = n);
	      }), o;
	    }function lt(n, t) {
	      var r = [];return Su(n, function (n, e, u) {
	        t(n, e, u) && r.push(n);
	      }), r;
	    }function st(n, t, r, e) {
	      var u;return r(n, function (n, r, o) {
	        return t(n, r, o) ? (u = e ? r : n, false) : void 0;
	      }), u;
	    }function pt(n, t, r, e) {
	      e || (e = []);for (var u = -1, o = n.length; ++u < o;) {
	        var i = n[u];h(i) && Er(i) && (r || Oo(i) || pe(i)) ? t ? pt(i, t, r, e) : Jn(e, i) : r || (e[e.length] = i);
	      }return e;
	    }function ht(n, t) {
	      Nu(n, t, Re);
	    }function _t(n, t) {
	      return Nu(n, t, zo);
	    }function vt(n, t) {
	      return Tu(n, t, zo);
	    }function gt(n, t) {
	      for (var r = -1, e = t.length, u = -1, o = []; ++r < e;) {
	        var i = t[r];
	        ve(n[i]) && (o[++u] = i);
	      }return o;
	    }function yt(n, t, r) {
	      if (null != n) {
	        r !== w && r in Br(n) && (t = [r]), r = 0;for (var e = t.length; null != n && r < e;) n = n[t[r++]];return r && r == e ? n : w;
	      }
	    }function dt(n, t, r, e, u, o) {
	      if (n === t) n = true;else if (null == n || null == t || !ge(n) && !h(t)) n = n !== n && t !== t;else n: {
	        var i = dt,
	            f = Oo(n),
	            a = Oo(t),
	            c = D,
	            l = D;f || (c = ru.call(n), c == B ? c = Z : c != Z && (f = xe(n))), a || (l = ru.call(t), l == B ? l = Z : l != Z && xe(t));var s = c == Z,
	            a = l == Z,
	            l = c == l;if (!l || f || s) {
	          if (!e && (c = s && nu.call(n, "__wrapped__"), a = a && nu.call(t, "__wrapped__"), c || a)) {
	            n = i(c ? n.value() : n, a ? t.value() : t, r, e, u, o);
	            break n;
	          }if (l) {
	            for (u || (u = []), o || (o = []), c = u.length; c--;) if (u[c] == n) {
	              n = o[c] == t;break n;
	            }u.push(n), o.push(t), n = (f ? yr : mr)(n, t, i, r, e, u, o), u.pop(), o.pop();
	          } else n = false;
	        } else n = dr(n, t, c);
	      }return n;
	    }function mt(n, t, r) {
	      var e = t.length,
	          u = e,
	          o = !r;if (null == n) return !u;for (n = Br(n); e--;) {
	        var i = t[e];if (o && i[2] ? i[1] !== n[i[0]] : !(i[0] in n)) return false;
	      }for (; ++e < u;) {
	        var i = t[e],
	            f = i[0],
	            a = n[f],
	            c = i[1];if (o && i[2]) {
	          if (a === w && !(f in n)) return false;
	        } else if (i = r ? r(a, c, f) : w, i === w ? !dt(c, a, r, true) : !i) return false;
	      }return true;
	    }function wt(n, t) {
	      var r = -1,
	          e = Er(n) ? Be(n.length) : [];
	      return Su(n, function (n, u, o) {
	        e[++r] = t(n, u, o);
	      }), e;
	    }function bt(n) {
	      var t = Ar(n);if (1 == t.length && t[0][2]) {
	        var r = t[0][0],
	            e = t[0][1];return function (n) {
	          return null == n ? false : n[r] === e && (e !== w || r in Br(n));
	        };
	      }return function (n) {
	        return mt(n, t);
	      };
	    }function xt(n, t) {
	      var r = Oo(n),
	          e = Wr(n) && t === t && !ge(t),
	          u = n + "";return n = Dr(n), function (o) {
	        if (null == o) return false;var i = u;if (o = Br(o), !(!r && e || i in o)) {
	          if (o = 1 == n.length ? o : yt(o, Et(n, 0, -1)), null == o) return false;i = Zr(n), o = Br(o);
	        }return o[i] === t ? t !== w || i in o : dt(t, o[i], w, true);
	      };
	    }function At(n, t, r, e, u) {
	      if (!ge(n)) return n;var o = Er(t) && (Oo(t) || xe(t)),
	          i = o ? w : zo(t);return Pn(i || t, function (f, a) {
	        if (i && (a = f, f = t[a]), h(f)) {
	          e || (e = []), u || (u = []);n: {
	            for (var c = a, l = e, s = u, p = l.length, _ = t[c]; p--;) if (l[p] == _) {
	              n[c] = s[p];break n;
	            }var p = n[c],
	                v = r ? r(p, _, c, n, t) : w,
	                g = v === w;g && (v = _, Er(_) && (Oo(_) || xe(_)) ? v = Oo(p) ? p : Er(p) ? qn(p) : [] : me(_) || pe(_) ? v = pe(p) ? ke(p) : me(p) ? p : {} : g = false), l.push(_), s.push(v), g ? n[c] = At(v, _, r, l, s) : (v === v ? v !== p : p === p) && (n[c] = v);
	          }
	        } else c = n[a], l = r ? r(c, f, a, n, t) : w, (s = l === w) && (l = f), l === w && (!o || a in n) || !s && (l === l ? l === c : c !== c) || (n[a] = l);
	      }), n;
	    }function jt(n) {
	      return function (t) {
	        return null == t ? w : t[n];
	      };
	    }function kt(n) {
	      var t = n + "";return n = Dr(n), function (r) {
	        return yt(r, n, t);
	      };
	    }function It(n, t) {
	      for (var r = n ? t.length : 0; r--;) {
	        var e = t[r];if (e != u && Cr(e)) {
	          var u = e;pu.call(n, e, 1);
	        }
	      }
	    }function Rt(n, t) {
	      return n + yu(ku() * (t - n + 1));
	    }function Ot(n, t, r, e, u) {
	      return u(n, function (n, u, o) {
	        r = e ? (e = false, n) : t(r, n, u, o);
	      }), r;
	    }function Et(n, t, r) {
	      var e = -1,
	          u = n.length;for (t = null == t ? 0 : +t || 0, 0 > t && (t = -t > u ? 0 : u + t), r = r === w || r > u ? u : +r || 0, 0 > r && (r += u), u = t > r ? 0 : r - t >>> 0, t >>>= 0, r = Be(u); ++e < u;) r[e] = n[e + t];
	      return r;
	    }function Ct(n, t) {
	      var r;return Su(n, function (n, e, u) {
	        return r = t(n, e, u), !r;
	      }), !!r;
	    }function Ut(n, t) {
	      var r = n.length;for (n.sort(t); r--;) n[r] = n[r].c;return n;
	    }function Wt(t, r, e) {
	      var u = wr(),
	          o = -1;return r = Gn(r, function (n) {
	        return u(n);
	      }), t = wt(t, function (n) {
	        return { a: Gn(r, function (t) {
	            return t(n);
	          }), b: ++o, c: n };
	      }), Ut(t, function (t, r) {
	        var u;n: {
	          for (var o = -1, i = t.a, f = r.a, a = i.length, c = e.length; ++o < a;) if (u = n(i[o], f[o])) {
	            if (o >= c) break n;o = e[o], u *= "asc" === o || true === o ? 1 : -1;break n;
	          }u = t.b - r.b;
	        }return u;
	      });
	    }function $t(n, t) {
	      var r = 0;return Su(n, function (n, e, u) {
	        r += +t(n, e, u) || 0;
	      }), r;
	    }function St(n, t) {
	      var e = -1,
	          u = xr(),
	          o = n.length,
	          i = u === r,
	          f = i && o >= F,
	          a = f && gu && lu ? new Dn(void 0) : null,
	          c = [];a ? (u = Mn, i = false) : (f = false, a = t ? [] : c);n: for (; ++e < o;) {
	        var l = n[e],
	            s = t ? t(l, e, n) : l;if (i && l === l) {
	          for (var p = a.length; p--;) if (a[p] === s) continue n;t && a.push(s), c.push(l);
	        } else 0 > u(a, s, 0) && ((t || f) && a.push(s), c.push(l));
	      }return c;
	    }function Ft(n, t) {
	      for (var r = -1, e = t.length, u = Be(e); ++r < e;) u[r] = n[t[r]];return u;
	    }function Nt(n, t, r, e) {
	      for (var u = n.length, o = e ? u : -1; (e ? o-- : ++o < u) && t(n[o], o, n););
	      return r ? Et(n, e ? 0 : o, e ? o + 1 : u) : Et(n, e ? o + 1 : 0, e ? u : o);
	    }function Tt(n, t) {
	      var r = n;r instanceof zn && (r = r.value());for (var e = -1, u = t.length; ++e < u;) var o = t[e], r = o.func.apply(o.thisArg, Jn([r], o.args));return r;
	    }function Lt(n, t, r) {
	      var e = 0,
	          u = n ? n.length : e;if (typeof t == "number" && t === t && u <= Eu) {
	        for (; e < u;) {
	          var o = e + u >>> 1,
	              i = n[o];(r ? i <= t : i < t) && null !== i ? e = o + 1 : u = o;
	        }return u;
	      }return zt(n, t, Fe, r);
	    }function zt(n, t, r, e) {
	      t = r(t);for (var u = 0, o = n ? n.length : 0, i = t !== t, f = null === t, a = t === w; u < o;) {
	        var c = yu((u + o) / 2),
	            l = r(n[c]),
	            s = l !== w,
	            p = l === l;
	        (i ? p || e : f ? p && s && (e || null != l) : a ? p && (e || s) : null == l ? 0 : e ? l <= t : l < t) ? u = c + 1 : o = c;
	      }return xu(o, Ou);
	    }function Bt(n, t, r) {
	      if (typeof n != "function") return Fe;if (t === w) return n;switch (r) {case 1:
	          return function (r) {
	            return n.call(t, r);
	          };case 3:
	          return function (r, e, u) {
	            return n.call(t, r, e, u);
	          };case 4:
	          return function (r, e, u, o) {
	            return n.call(t, r, e, u, o);
	          };case 5:
	          return function (r, e, u, o, i) {
	            return n.call(t, r, e, u, o, i);
	          };}return function () {
	        return n.apply(t, arguments);
	      };
	    }function Dt(n) {
	      var t = new ou(n.byteLength);return new hu(t).set(new hu(n)), t;
	    }function Mt(n, t, r) {
	      for (var e = r.length, u = -1, o = bu(n.length - e, 0), i = -1, f = t.length, a = Be(f + o); ++i < f;) a[i] = t[i];for (; ++u < e;) a[r[u]] = n[u];for (; o--;) a[i++] = n[u++];return a;
	    }function qt(n, t, r) {
	      for (var e = -1, u = r.length, o = -1, i = bu(n.length - u, 0), f = -1, a = t.length, c = Be(i + a); ++o < i;) c[o] = n[o];for (i = o; ++f < a;) c[i + f] = t[f];for (; ++e < u;) c[i + r[e]] = n[o++];return c;
	    }function Pt(n, t) {
	      return function (r, e, u) {
	        var o = t ? t() : {};if (e = wr(e, u, 3), Oo(r)) {
	          u = -1;for (var i = r.length; ++u < i;) {
	            var f = r[u];n(o, f, e(f, u, r), r);
	          }
	        } else Su(r, function (t, r, u) {
	          n(o, t, e(t, r, u), u);
	        });return o;
	      };
	    }function Kt(n) {
	      return le(function (t, r) {
	        var e = -1,
	            u = null == t ? 0 : r.length,
	            o = 2 < u ? r[u - 2] : w,
	            i = 2 < u ? r[2] : w,
	            f = 1 < u ? r[u - 1] : w;for (typeof o == "function" ? (o = Bt(o, f, 5), u -= 2) : (o = typeof f == "function" ? f : w, u -= o ? 1 : 0), i && Ur(r[0], r[1], i) && (o = 3 > u ? w : o, u = 1); ++e < u;) (i = r[e]) && n(t, i, o);return t;
	      });
	    }function Vt(n, t) {
	      return function (r, e) {
	        var u = r ? Bu(r) : 0;if (!Sr(u)) return n(r, e);for (var o = t ? u : -1, i = Br(r); (t ? o-- : ++o < u) && false !== e(i[o], o, i););return r;
	      };
	    }function Zt(n) {
	      return function (t, r, e) {
	        var u = Br(t);e = e(t);for (var o = e.length, i = n ? o : -1; n ? i-- : ++i < o;) {
	          var f = e[i];if (false === r(u[f], f, u)) break;
	        }return t;
	      };
	    }function Yt(n, t) {
	      function r() {
	        return (this && this !== Zn && this instanceof r ? e : n).apply(t, arguments);
	      }var e = Jt(n);return r;
	    }function Gt(n) {
	      return function (t) {
	        var r = -1;t = $e(Ce(t));for (var e = t.length, u = ""; ++r < e;) u = n(u, t[r], r);return u;
	      };
	    }function Jt(n) {
	      return function () {
	        var t = arguments;switch (t.length) {case 0:
	            return new n();case 1:
	            return new n(t[0]);case 2:
	            return new n(t[0], t[1]);case 3:
	            return new n(t[0], t[1], t[2]);case 4:
	            return new n(t[0], t[1], t[2], t[3]);case 5:
	            return new n(t[0], t[1], t[2], t[3], t[4]);case 6:
	            return new n(t[0], t[1], t[2], t[3], t[4], t[5]);case 7:
	            return new n(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);}var r = $u(n.prototype),
	            t = n.apply(r, t);return ge(t) ? t : r;
	      };
	    }function Xt(n) {
	      function t(r, e, u) {
	        return u && Ur(r, e, u) && (e = w), r = gr(r, n, w, w, w, w, w, e), r.placeholder = t.placeholder, r;
	      }return t;
	    }function Ht(n, t) {
	      return le(function (r) {
	        var e = r[0];return null == e ? e : (r.push(t), n.apply(w, r));
	      });
	    }function Qt(n, t) {
	      return function (r, e, u) {
	        if (u && Ur(r, e, u) && (e = w), e = wr(e, u, 3), 1 == e.length) {
	          u = r = Oo(r) ? r : zr(r);for (var o = e, i = -1, f = u.length, a = t, c = a; ++i < f;) {
	            var l = u[i],
	                s = +o(l);n(s, a) && (a = s, c = l);
	          }if (u = c, !r.length || u !== t) return u;
	        }return ct(r, e, n, t);
	      };
	    }function nr(n, r) {
	      return function (e, u, o) {
	        return u = wr(u, o, 3), Oo(e) ? (u = t(e, u, r), -1 < u ? e[u] : w) : st(e, u, n);
	      };
	    }function tr(n) {
	      return function (r, e, u) {
	        return r && r.length ? (e = wr(e, u, 3), t(r, e, n)) : -1;
	      };
	    }function rr(n) {
	      return function (t, r, e) {
	        return r = wr(r, e, 3), st(t, r, n, true);
	      };
	    }function er(n) {
	      return function () {
	        for (var t, r = arguments.length, e = n ? r : -1, u = 0, o = Be(r); n ? e-- : ++e < r;) {
	          var i = o[u++] = arguments[e];if (typeof i != "function") throw new Ge(L);!t && Ln.prototype.thru && "wrapper" == br(i) && (t = new Ln([], true));
	        }for (e = t ? -1 : r; ++e < r;) {
	          var i = o[e],
	              u = br(i),
	              f = "wrapper" == u ? zu(i) : w;t = f && $r(f[0]) && f[1] == (E | k | R | C) && !f[4].length && 1 == f[9] ? t[br(f[0])].apply(t, f[3]) : 1 == i.length && $r(i) ? t[u]() : t.thru(i);
	        }return function () {
	          var n = arguments,
	              e = n[0];if (t && 1 == n.length && Oo(e) && e.length >= F) return t.plant(e).value();for (var u = 0, n = r ? o[u].apply(this, n) : e; ++u < r;) n = o[u].call(this, n);return n;
	        };
	      };
	    }function ur(n, t) {
	      return function (r, e, u) {
	        return typeof e == "function" && u === w && Oo(r) ? n(r, e) : t(r, Bt(e, u, 3));
	      };
	    }function or(n) {
	      return function (t, r, e) {
	        return (typeof r != "function" || e !== w) && (r = Bt(r, e, 3)), n(t, r, Re);
	      };
	    }function ir(n) {
	      return function (t, r, e) {
	        return (typeof r != "function" || e !== w) && (r = Bt(r, e, 3)), n(t, r);
	      };
	    }function fr(n) {
	      return function (t, r, e) {
	        var u = {};return r = wr(r, e, 3), _t(t, function (t, e, o) {
	          o = r(t, e, o), e = n ? o : e, t = n ? t : o, u[e] = t;
	        }), u;
	      };
	    }function ar(n) {
	      return function (t, r, e) {
	        return t = u(t), (n ? t : "") + pr(t, r, e) + (n ? "" : t);
	      };
	    }function cr(n) {
	      var t = le(function (r, e) {
	        var u = v(e, t.placeholder);return gr(r, n, w, e, u);
	      });return t;
	    }function lr(n, t) {
	      return function (r, e, u, o) {
	        var i = 3 > arguments.length;return typeof e == "function" && o === w && Oo(r) ? n(r, e, u, i) : Ot(r, wr(e, o, 4), u, i, t);
	      };
	    }function sr(n, t, r, e, u, o, i, f, a, c) {
	      function l() {
	        for (var m = arguments.length, b = m, j = Be(m); b--;) j[b] = arguments[b];if (e && (j = Mt(j, e, u)), o && (j = qt(j, o, i)), _ || y) {
	          var b = l.placeholder,
	              k = v(j, b),
	              m = m - k.length;if (m < c) {
	            var I = f ? qn(f) : w,
	                m = bu(c - m, 0),
	                E = _ ? k : w,
	                k = _ ? w : k,
	                C = _ ? j : w,
	                j = _ ? w : j;return t |= _ ? R : O, t &= ~(_ ? O : R), g || (t &= ~(x | A)), j = [n, t, r, C, E, j, k, I, a, m], I = sr.apply(w, j), $r(n) && Du(I, j), I.placeholder = b, I;
	          }
	        }if (b = p ? r : this, I = h ? b[n] : n, f) for (m = j.length, E = xu(f.length, m), k = qn(j); E--;) C = f[E], j[E] = Cr(C, m) ? k[C] : w;return s && a < j.length && (j.length = a), this && this !== Zn && this instanceof l && (I = d || Jt(n)), I.apply(b, j);
	      }var s = t & E,
	          p = t & x,
	          h = t & A,
	          _ = t & k,
	          g = t & j,
	          y = t & I,
	          d = h ? w : Jt(n);return l;
	    }function pr(n, t, r) {
	      return n = n.length, t = +t, n < t && mu(t) ? (t -= n, r = null == r ? " " : r + "", Ue(r, vu(t / r.length)).slice(0, t)) : "";
	    }function hr(n, t, r, e) {
	      function u() {
	        for (var t = -1, f = arguments.length, a = -1, c = e.length, l = Be(c + f); ++a < c;) l[a] = e[a];
	        for (; f--;) l[a++] = arguments[++t];return (this && this !== Zn && this instanceof u ? i : n).apply(o ? r : this, l);
	      }var o = t & x,
	          i = Jt(n);return u;
	    }function _r(n) {
	      var t = Pe[n];return function (n, r) {
	        return (r = r === w ? 0 : +r || 0) ? (r = au(10, r), t(n * r) / r) : t(n);
	      };
	    }function vr(n) {
	      return function (t, r, e, u) {
	        var o = wr(e);return null == e && o === ut ? Lt(t, r, n) : zt(t, r, o(e, u, 1), n);
	      };
	    }function gr(n, t, r, e, u, o, i, f) {
	      var a = t & A;if (!a && typeof n != "function") throw new Ge(L);var c = e ? e.length : 0;if (c || (t &= ~(R | O), e = u = w), c -= u ? u.length : 0, t & O) {
	        var l = e,
	            s = u;e = u = w;
	      }var p = a ? w : zu(n);
	      return r = [n, t, r, e, u, l, s, o, i, f], p && (e = r[1], t = p[1], f = e | t, u = t == E && e == k || t == E && e == C && r[7].length <= p[8] || t == (E | C) && e == k, (f < E || u) && (t & x && (r[2] = p[2], f |= e & x ? 0 : j), (e = p[3]) && (u = r[3], r[3] = u ? Mt(u, e, p[4]) : qn(e), r[4] = u ? v(r[3], z) : qn(p[4])), (e = p[5]) && (u = r[5], r[5] = u ? qt(u, e, p[6]) : qn(e), r[6] = u ? v(r[5], z) : qn(p[6])), (e = p[7]) && (r[7] = qn(e)), t & E && (r[8] = null == r[8] ? p[8] : xu(r[8], p[8])), null == r[9] && (r[9] = p[9]), r[0] = p[0], r[1] = f), t = r[1], f = r[9]), r[9] = null == f ? a ? 0 : n.length : bu(f - c, 0) || 0, (p ? Lu : Du)(t == x ? Yt(r[0], r[2]) : t != R && t != (x | R) || r[4].length ? sr.apply(w, r) : hr.apply(w, r), r);
	    }function yr(n, t, r, e, u, o, i) {
	      var f = -1,
	          a = n.length,
	          c = t.length;if (a != c && (!u || c <= a)) return false;for (; ++f < a;) {
	        var l = n[f],
	            c = t[f],
	            s = e ? e(u ? c : l, u ? l : c, f) : w;if (s !== w) {
	          if (s) continue;return false;
	        }if (u) {
	          if (!Hn(t, function (n) {
	            return l === n || r(l, n, e, u, o, i);
	          })) return false;
	        } else if (l !== c && !r(l, c, e, u, o, i)) return false;
	      }return true;
	    }function dr(n, t, r) {
	      switch (r) {case M:case q:
	          return +n == +t;case P:
	          return n.name == t.name && n.message == t.message;case V:
	          return n != +n ? t != +t : n == +t;case Y:case G:
	          return n == t + "";}return false;
	    }function mr(n, t, r, e, u, o, i) {
	      var f = zo(n),
	          a = f.length,
	          c = zo(t).length;
	      if (a != c && !u) return false;for (c = a; c--;) {
	        var l = f[c];if (!(u ? l in t : nu.call(t, l))) return false;
	      }for (var s = u; ++c < a;) {
	        var l = f[c],
	            p = n[l],
	            h = t[l],
	            _ = e ? e(u ? h : p, u ? p : h, l) : w;if (_ === w ? !r(p, h, e, u, o, i) : !_) return false;s || (s = "constructor" == l);
	      }return s || (r = n.constructor, e = t.constructor, !(r != e && "constructor" in n && "constructor" in t) || typeof r == "function" && r instanceof r && typeof e == "function" && e instanceof e) ? true : false;
	    }function wr(n, t, r) {
	      var e = Nn.callback || Se,
	          e = e === Se ? ut : e;return r ? e(n, t, r) : e;
	    }function br(n) {
	      for (var t = n.name + "", r = Wu[t], e = r ? r.length : 0; e--;) {
	        var u = r[e],
	            o = u.func;if (null == o || o == n) return u.name;
	      }return t;
	    }function xr(n, t, e) {
	      var u = Nn.indexOf || Vr,
	          u = u === Vr ? r : u;return n ? u(n, t, e) : u;
	    }function Ar(n) {
	      n = Oe(n);for (var t = n.length; t--;) {
	        var r = n[t][1];n[t][2] = r === r && !ge(r);
	      }return n;
	    }function jr(n, t) {
	      var r = null == n ? w : n[t];return ye(r) ? r : w;
	    }function kr(n) {
	      var t = n.length,
	          r = new n.constructor(t);return t && "string" == typeof n[0] && nu.call(n, "index") && (r.index = n.index, r.input = n.input), r;
	    }function Ir(n) {
	      return n = n.constructor, typeof n == "function" && n instanceof n || (n = Ve), new n();
	    }function Rr(n, t, r) {
	      var e = n.constructor;switch (t) {case J:
	          return Dt(n);case M:case q:
	          return new e(+n);case X:case H:case Q:case nn:case tn:case rn:case en:case un:case on:
	          return t = n.buffer, new e(r ? Dt(t) : t, n.byteOffset, n.length);case V:case G:
	          return new e(n);case Y:
	          var u = new e(n.source, kn.exec(n));u.lastIndex = n.lastIndex;}return u;
	    }function Or(n, t, r) {
	      return null == n || Wr(t, n) || (t = Dr(t), n = 1 == t.length ? n : yt(n, Et(t, 0, -1)), t = Zr(t)), t = null == n ? n : n[t], null == t ? w : t.apply(n, r);
	    }function Er(n) {
	      return null != n && Sr(Bu(n));
	    }function Cr(n, t) {
	      return n = typeof n == "number" || On.test(n) ? +n : -1, t = null == t ? Cu : t, -1 < n && 0 == n % 1 && n < t;
	    }function Ur(n, t, r) {
	      if (!ge(r)) return false;var e = typeof t;return ("number" == e ? Er(r) && Cr(t, r.length) : "string" == e && t in r) ? (t = r[t], n === n ? n === t : t !== t) : false;
	    }function Wr(n, t) {
	      var r = typeof n;return "string" == r && dn.test(n) || "number" == r ? true : Oo(n) ? false : !yn.test(n) || null != t && n in Br(t);
	    }function $r(n) {
	      var t = br(n),
	          r = Nn[t];return typeof r == "function" && t in zn.prototype ? n === r ? true : (t = zu(r), !!t && n === t[0]) : false;
	    }function Sr(n) {
	      return typeof n == "number" && -1 < n && 0 == n % 1 && n <= Cu;
	    }function Fr(n, t) {
	      return n === w ? t : Eo(n, t, Fr);
	    }function Nr(n, t) {
	      n = Br(n);for (var r = -1, e = t.length, u = {}; ++r < e;) {
	        var o = t[r];o in n && (u[o] = n[o]);
	      }return u;
	    }function Tr(n, t) {
	      var r = {};return ht(n, function (n, e, u) {
	        t(n, e, u) && (r[e] = n);
	      }), r;
	    }function Lr(n) {
	      for (var t = Re(n), r = t.length, e = r && n.length, u = !!e && Sr(e) && (Oo(n) || pe(n)), o = -1, i = []; ++o < r;) {
	        var f = t[o];(u && Cr(f, e) || nu.call(n, f)) && i.push(f);
	      }return i;
	    }function zr(n) {
	      return null == n ? [] : Er(n) ? ge(n) ? n : Ve(n) : Ee(n);
	    }function Br(n) {
	      return ge(n) ? n : Ve(n);
	    }function Dr(n) {
	      if (Oo(n)) return n;
	      var t = [];return u(n).replace(mn, function (n, r, e, u) {
	        t.push(e ? u.replace(An, "$1") : r || n);
	      }), t;
	    }function Mr(n) {
	      return n instanceof zn ? n.clone() : new Ln(n.__wrapped__, n.__chain__, qn(n.__actions__));
	    }function qr(n, t, r) {
	      return n && n.length ? ((r ? Ur(n, t, r) : null == t) && (t = 1), Et(n, 0 > t ? 0 : t)) : [];
	    }function Pr(n, t, r) {
	      var e = n ? n.length : 0;return e ? ((r ? Ur(n, t, r) : null == t) && (t = 1), t = e - (+t || 0), Et(n, 0, 0 > t ? 0 : t)) : [];
	    }function Kr(n) {
	      return n ? n[0] : w;
	    }function Vr(n, t, e) {
	      var u = n ? n.length : 0;if (!u) return -1;if (typeof e == "number") e = 0 > e ? bu(u + e, 0) : e;else if (e) return e = Lt(n, t), e < u && (t === t ? t === n[e] : n[e] !== n[e]) ? e : -1;return r(n, t, e || 0);
	    }function Zr(n) {
	      var t = n ? n.length : 0;return t ? n[t - 1] : w;
	    }function Yr(n) {
	      return qr(n, 1);
	    }function Gr(n, t, e, u) {
	      if (!n || !n.length) return [];null != t && typeof t != "boolean" && (u = e, e = Ur(n, t, u) ? w : t, t = false);var o = wr();if ((null != e || o !== ut) && (e = o(e, u, 3)), t && xr() === r) {
	        t = e;var i;e = -1, u = n.length;for (var o = -1, f = []; ++e < u;) {
	          var a = n[e],
	              c = t ? t(a, e, n) : a;e && i === c || (i = c, f[++o] = a);
	        }n = f;
	      } else n = St(n, e);return n;
	    }function Jr(n) {
	      if (!n || !n.length) return [];var t = -1,
	          r = 0;n = Vn(n, function (n) {
	        return Er(n) ? (r = bu(n.length, r), true) : void 0;
	      });for (var e = Be(r); ++t < r;) e[t] = Gn(n, jt(t));return e;
	    }function Xr(n, t, r) {
	      return n && n.length ? (n = Jr(n), null == t ? n : (t = Bt(t, r, 4), Gn(n, function (n) {
	        return Xn(n, t, w, true);
	      }))) : [];
	    }function Hr(n, t) {
	      var r = -1,
	          e = n ? n.length : 0,
	          u = {};for (!e || t || Oo(n[0]) || (t = []); ++r < e;) {
	        var o = n[r];t ? u[o] = t[r] : o && (u[o[0]] = o[1]);
	      }return u;
	    }function Qr(n) {
	      return n = Nn(n), n.__chain__ = true, n;
	    }function ne(n, t, r) {
	      return t.call(r, n);
	    }function te(n, t, r) {
	      var e = Oo(n) ? Kn : at;return r && Ur(n, t, r) && (t = w), (typeof t != "function" || r !== w) && (t = wr(t, r, 3)), e(n, t);
	    }function re(n, t, r) {
	      var e = Oo(n) ? Vn : lt;return t = wr(t, r, 3), e(n, t);
	    }function ee(n, t, r, e) {
	      var u = n ? Bu(n) : 0;return Sr(u) || (n = Ee(n), u = n.length), r = typeof r != "number" || e && Ur(t, r, e) ? 0 : 0 > r ? bu(u + r, 0) : r || 0, typeof n == "string" || !Oo(n) && be(n) ? r <= u && -1 < n.indexOf(t, r) : !!u && -1 < xr(n, t, r);
	    }function ue(n, t, r) {
	      var e = Oo(n) ? Gn : wt;return t = wr(t, r, 3), e(n, t);
	    }function oe(n, t, r) {
	      if (r ? Ur(n, t, r) : null == t) {
	        n = zr(n);var e = n.length;return 0 < e ? n[Rt(0, e - 1)] : w;
	      }r = -1, n = je(n);var e = n.length,
	          u = e - 1;for (t = xu(0 > t ? 0 : +t || 0, e); ++r < t;) {
	        var e = Rt(r, u),
	            o = n[e];
	        n[e] = n[r], n[r] = o;
	      }return n.length = t, n;
	    }function ie(n, t, r) {
	      var e = Oo(n) ? Hn : Ct;return r && Ur(n, t, r) && (t = w), (typeof t != "function" || r !== w) && (t = wr(t, r, 3)), e(n, t);
	    }function fe(n, t) {
	      var r;if (typeof t != "function") {
	        if (typeof n != "function") throw new Ge(L);var e = n;n = t, t = e;
	      }return function () {
	        return 0 < --n && (r = t.apply(this, arguments)), 1 >= n && (t = w), r;
	      };
	    }function ae(n, t, r) {
	      function e(t, r) {
	        r && iu(r), a = p = h = w, t && (_ = ho(), c = n.apply(s, f), p || a || (f = s = w));
	      }function u() {
	        var n = t - (ho() - l);0 >= n || n > t ? e(h, a) : p = su(u, n);
	      }function o() {
	        e(g, p);
	      }function i() {
	        if (f = arguments, l = ho(), s = this, h = g && (p || !y), false === v) var r = y && !p;else {
	          a || y || (_ = l);var e = v - (l - _),
	              i = 0 >= e || e > v;i ? (a && (a = iu(a)), _ = l, c = n.apply(s, f)) : a || (a = su(o, e));
	        }return i && p ? p = iu(p) : p || t === v || (p = su(u, t)), r && (i = true, c = n.apply(s, f)), !i || p || a || (f = s = w), c;
	      }var f,
	          a,
	          c,
	          l,
	          s,
	          p,
	          h,
	          _ = 0,
	          v = false,
	          g = true;if (typeof n != "function") throw new Ge(L);if (t = 0 > t ? 0 : +t || 0, true === r) var y = true,
	          g = false;else ge(r) && (y = !!r.leading, v = "maxWait" in r && bu(+r.maxWait || 0, t), g = "trailing" in r ? !!r.trailing : g);return i.cancel = function () {
	        p && iu(p), a && iu(a), _ = 0, a = p = h = w;
	      }, i;
	    }function ce(n, t) {
	      function r() {
	        var e = arguments,
	            u = t ? t.apply(this, e) : e[0],
	            o = r.cache;return o.has(u) ? o.get(u) : (e = n.apply(this, e), r.cache = o.set(u, e), e);
	      }if (typeof n != "function" || t && typeof t != "function") throw new Ge(L);return r.cache = new ce.Cache(), r;
	    }function le(n, t) {
	      if (typeof n != "function") throw new Ge(L);return t = bu(t === w ? n.length - 1 : +t || 0, 0), function () {
	        for (var r = arguments, e = -1, u = bu(r.length - t, 0), o = Be(u); ++e < u;) o[e] = r[t + e];switch (t) {case 0:
	            return n.call(this, o);case 1:
	            return n.call(this, r[0], o);
	          case 2:
	            return n.call(this, r[0], r[1], o);}for (u = Be(t + 1), e = -1; ++e < t;) u[e] = r[e];return u[t] = o, n.apply(this, u);
	      };
	    }function se(n, t) {
	      return n > t;
	    }function pe(n) {
	      return h(n) && Er(n) && nu.call(n, "callee") && !cu.call(n, "callee");
	    }function he(n, t, r, e) {
	      return e = (r = typeof r == "function" ? Bt(r, e, 3) : w) ? r(n, t) : w, e === w ? dt(n, t, r) : !!e;
	    }function _e(n) {
	      return h(n) && typeof n.message == "string" && ru.call(n) == P;
	    }function ve(n) {
	      return ge(n) && ru.call(n) == K;
	    }function ge(n) {
	      var t = typeof n;return !!n && ("object" == t || "function" == t);
	    }function ye(n) {
	      return null == n ? false : ve(n) ? uu.test(Qe.call(n)) : h(n) && Rn.test(n);
	    }function de(n) {
	      return typeof n == "number" || h(n) && ru.call(n) == V;
	    }function me(n) {
	      var t;if (!h(n) || ru.call(n) != Z || pe(n) || !(nu.call(n, "constructor") || (t = n.constructor, typeof t != "function" || t instanceof t))) return false;var r;return ht(n, function (n, t) {
	        r = t;
	      }), r === w || nu.call(n, r);
	    }function we(n) {
	      return ge(n) && ru.call(n) == Y;
	    }function be(n) {
	      return typeof n == "string" || h(n) && ru.call(n) == G;
	    }function xe(n) {
	      return h(n) && Sr(n.length) && !!Sn[ru.call(n)];
	    }function Ae(n, t) {
	      return n < t;
	    }function je(n) {
	      var t = n ? Bu(n) : 0;return Sr(t) ? t ? qn(n) : [] : Ee(n);
	    }function ke(n) {
	      return et(n, Re(n));
	    }function Ie(n) {
	      return gt(n, Re(n));
	    }function Re(n) {
	      if (null == n) return [];ge(n) || (n = Ve(n));for (var t = n.length, t = t && Sr(t) && (Oo(n) || pe(n)) && t || 0, r = n.constructor, e = -1, r = typeof r == "function" && r.prototype === n, u = Be(t), o = 0 < t; ++e < t;) u[e] = e + "";for (var i in n) o && Cr(i, t) || "constructor" == i && (r || !nu.call(n, i)) || u.push(i);return u;
	    }function Oe(n) {
	      n = Br(n);for (var t = -1, r = zo(n), e = r.length, u = Be(e); ++t < e;) {
	        var o = r[t];
	        u[t] = [o, n[o]];
	      }return u;
	    }function Ee(n) {
	      return Ft(n, zo(n));
	    }function Ce(n) {
	      return (n = u(n)) && n.replace(En, a).replace(xn, "");
	    }function Ue(n, t) {
	      var r = "";if (n = u(n), t = +t, 1 > t || !n || !mu(t)) return r;do t % 2 && (r += n), t = yu(t / 2), n += n; while (t);return r;
	    }function We(n, t, r) {
	      var e = n;return (n = u(n)) ? (r ? Ur(e, t, r) : null == t) ? n.slice(g(n), y(n) + 1) : (t += "", n.slice(o(n, t), i(n, t) + 1)) : n;
	    }function $e(n, t, r) {
	      return r && Ur(n, t, r) && (t = w), n = u(n), n.match(t || Wn) || [];
	    }function Se(n, t, r) {
	      return r && Ur(n, t, r) && (t = w), h(n) ? Ne(n) : ut(n, t);
	    }function Fe(n) {
	      return n;
	    }function Ne(n) {
	      return bt(ot(n, true));
	    }function Te(n, t, r) {
	      if (null == r) {
	        var e = ge(t),
	            u = e ? zo(t) : w;((u = u && u.length ? gt(t, u) : w) ? u.length : e) || (u = false, r = t, t = n, n = this);
	      }u || (u = gt(t, zo(t)));var o = true,
	          e = -1,
	          i = ve(n),
	          f = u.length;false === r ? o = false : ge(r) && "chain" in r && (o = r.chain);for (; ++e < f;) {
	        r = u[e];var a = t[r];n[r] = a, i && (n.prototype[r] = function (t) {
	          return function () {
	            var r = this.__chain__;if (o || r) {
	              var e = n(this.__wrapped__);return (e.__actions__ = qn(this.__actions__)).push({ func: t, args: arguments, thisArg: n }), e.__chain__ = r, e;
	            }return t.apply(n, Jn([this.value()], arguments));
	          };
	        }(a));
	      }return n;
	    }function Le() {}function ze(n) {
	      return Wr(n) ? jt(n) : kt(n);
	    }_ = _ ? Yn.defaults(Zn.Object(), _, Yn.pick(Zn, $n)) : Zn;var Be = _.Array,
	        De = _.Date,
	        Me = _.Error,
	        qe = _.Function,
	        Pe = _.Math,
	        Ke = _.Number,
	        Ve = _.Object,
	        Ze = _.RegExp,
	        Ye = _.String,
	        Ge = _.TypeError,
	        Je = Be.prototype,
	        Xe = Ve.prototype,
	        He = Ye.prototype,
	        Qe = qe.prototype.toString,
	        nu = Xe.hasOwnProperty,
	        tu = 0,
	        ru = Xe.toString,
	        eu = Zn._,
	        uu = Ze("^" + Qe.call(nu).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
	        ou = _.ArrayBuffer,
	        iu = _.clearTimeout,
	        fu = _.parseFloat,
	        au = Pe.pow,
	        cu = Xe.propertyIsEnumerable,
	        lu = jr(_, "Set"),
	        su = _.setTimeout,
	        pu = Je.splice,
	        hu = _.Uint8Array,
	        _u = jr(_, "WeakMap"),
	        vu = Pe.ceil,
	        gu = jr(Ve, "create"),
	        yu = Pe.floor,
	        du = jr(Be, "isArray"),
	        mu = _.isFinite,
	        wu = jr(Ve, "keys"),
	        bu = Pe.max,
	        xu = Pe.min,
	        Au = jr(De, "now"),
	        ju = _.parseInt,
	        ku = Pe.random,
	        Iu = Ke.NEGATIVE_INFINITY,
	        Ru = Ke.POSITIVE_INFINITY,
	        Ou = 4294967294,
	        Eu = 2147483647,
	        Cu = 9007199254740991,
	        Uu = _u && new _u(),
	        Wu = {};
	    Nn.support = {}, Nn.templateSettings = { escape: _n, evaluate: vn, interpolate: gn, variable: "", imports: { _: Nn } };var $u = function () {
	      function n() {}return function (t) {
	        if (ge(t)) {
	          n.prototype = t;var r = new n();n.prototype = w;
	        }return r || {};
	      };
	    }(),
	        Su = Vt(_t),
	        Fu = Vt(vt, true),
	        Nu = Zt(),
	        Tu = Zt(true),
	        Lu = Uu ? function (n, t) {
	      return Uu.set(n, t), n;
	    } : Fe,
	        zu = Uu ? function (n) {
	      return Uu.get(n);
	    } : Le,
	        Bu = jt("length"),
	        Du = function () {
	      var n = 0,
	          t = 0;return function (r, e) {
	        var u = ho(),
	            o = S - (u - t);if (t = u, 0 < o) {
	          if (++n >= $) return r;
	        } else n = 0;return Lu(r, e);
	      };
	    }(),
	        Mu = le(function (n, t) {
	      return h(n) && Er(n) ? ft(n, pt(t, false, true)) : [];
	    }),
	        qu = tr(),
	        Pu = tr(true),
	        Ku = le(function (n) {
	      for (var t = n.length, e = t, u = Be(l), o = xr(), i = o === r, f = []; e--;) {
	        var a = n[e] = Er(a = n[e]) ? a : [];u[e] = i && 120 <= a.length && gu && lu ? new Dn(e && a) : null;
	      }var i = n[0],
	          c = -1,
	          l = i ? i.length : 0,
	          s = u[0];n: for (; ++c < l;) if (a = i[c], 0 > (s ? Mn(s, a) : o(f, a, 0))) {
	        for (e = t; --e;) {
	          var p = u[e];if (0 > (p ? Mn(p, a) : o(n[e], a, 0))) continue n;
	        }s && s.push(a), f.push(a);
	      }return f;
	    }),
	        Vu = le(function (t, r) {
	      r = pt(r);var e = rt(t, r);return It(t, r.sort(n)), e;
	    }),
	        Zu = vr(),
	        Yu = vr(true),
	        Gu = le(function (n) {
	      return St(pt(n, false, true));
	    }),
	        Ju = le(function (n, t) {
	      return Er(n) ? ft(n, t) : [];
	    }),
	        Xu = le(Jr),
	        Hu = le(function (n) {
	      var t = n.length,
	          r = 2 < t ? n[t - 2] : w,
	          e = 1 < t ? n[t - 1] : w;return 2 < t && typeof r == "function" ? t -= 2 : (r = 1 < t && typeof e == "function" ? (--t, e) : w, e = w), n.length = t, Xr(n, r, e);
	    }),
	        Qu = le(function (n) {
	      return n = pt(n), this.thru(function (t) {
	        t = Oo(t) ? t : [Br(t)];for (var r = n, e = -1, u = t.length, o = -1, i = r.length, f = Be(u + i); ++e < u;) f[e] = t[e];for (; ++o < i;) f[e++] = r[o];return f;
	      });
	    }),
	        no = le(function (n, t) {
	      return rt(n, pt(t));
	    }),
	        to = Pt(function (n, t, r) {
	      nu.call(n, r) ? ++n[r] : n[r] = 1;
	    }),
	        ro = nr(Su),
	        eo = nr(Fu, true),
	        uo = ur(Pn, Su),
	        oo = ur(function (n, t) {
	      for (var r = n.length; r-- && false !== t(n[r], r, n););return n;
	    }, Fu),
	        io = Pt(function (n, t, r) {
	      nu.call(n, r) ? n[r].push(t) : n[r] = [t];
	    }),
	        fo = Pt(function (n, t, r) {
	      n[r] = t;
	    }),
	        ao = le(function (n, t, r) {
	      var e = -1,
	          u = typeof t == "function",
	          o = Wr(t),
	          i = Er(n) ? Be(n.length) : [];return Su(n, function (n) {
	        var f = u ? t : o && null != n ? n[t] : w;i[++e] = f ? f.apply(n, r) : Or(n, t, r);
	      }), i;
	    }),
	        co = Pt(function (n, t, r) {
	      n[r ? 0 : 1].push(t);
	    }, function () {
	      return [[], []];
	    }),
	        lo = lr(Xn, Su),
	        so = lr(function (n, t, r, e) {
	      var u = n.length;for (e && u && (r = n[--u]); u--;) r = t(r, n[u], u, n);return r;
	    }, Fu),
	        po = le(function (n, t) {
	      if (null == n) return [];var r = t[2];return r && Ur(t[0], t[1], r) && (t.length = 1), Wt(n, pt(t), []);
	    }),
	        ho = Au || function () {
	      return new De().getTime();
	    },
	        _o = le(function (n, t, r) {
	      var e = x;if (r.length) var u = v(r, _o.placeholder),
	          e = e | R;return gr(n, e, t, r, u);
	    }),
	        vo = le(function (n, t) {
	      t = t.length ? pt(t) : Ie(n);for (var r = -1, e = t.length; ++r < e;) {
	        var u = t[r];n[u] = gr(n[u], x, n);
	      }return n;
	    }),
	        go = le(function (n, t, r) {
	      var e = x | A;if (r.length) var u = v(r, go.placeholder),
	          e = e | R;return gr(t, e, n, r, u);
	    }),
	        yo = Xt(k),
	        mo = Xt(I),
	        wo = le(function (n, t) {
	      return it(n, 1, t);
	    }),
	        bo = le(function (n, t, r) {
	      return it(n, t, r);
	    }),
	        xo = er(),
	        Ao = er(true),
	        jo = le(function (n, t) {
	      if (t = pt(t), typeof n != "function" || !Kn(t, e)) throw new Ge(L);var r = t.length;return le(function (e) {
	        for (var u = xu(e.length, r); u--;) e[u] = t[u](e[u]);return n.apply(this, e);
	      });
	    }),
	        ko = cr(R),
	        Io = cr(O),
	        Ro = le(function (n, t) {
	      return gr(n, C, w, w, w, pt(t));
	    }),
	        Oo = du || function (n) {
	      return h(n) && Sr(n.length) && ru.call(n) == D;
	    },
	        Eo = Kt(At),
	        Co = Kt(function (n, t, r) {
	      return r ? nt(n, t, r) : tt(n, t);
	    }),
	        Uo = Ht(Co, function (n, t) {
	      return n === w ? t : n;
	    }),
	        Wo = Ht(Eo, Fr),
	        $o = rr(_t),
	        So = rr(vt),
	        Fo = or(Nu),
	        No = or(Tu),
	        To = ir(_t),
	        Lo = ir(vt),
	        zo = wu ? function (n) {
	      var t = null == n ? w : n.constructor;return typeof t == "function" && t.prototype === n || typeof n != "function" && Er(n) ? Lr(n) : ge(n) ? wu(n) : [];
	    } : Lr,
	        Bo = fr(true),
	        Do = fr(),
	        Mo = le(function (n, t) {
	      if (null == n) return {};if ("function" != typeof t[0]) return t = Gn(pt(t), Ye), Nr(n, ft(Re(n), t));var r = Bt(t[0], t[1], 3);return Tr(n, function (n, t, e) {
	        return !r(n, t, e);
	      });
	    }),
	        qo = le(function (n, t) {
	      return null == n ? {} : "function" == typeof t[0] ? Tr(n, Bt(t[0], t[1], 3)) : Nr(n, pt(t));
	    }),
	        Po = Gt(function (n, t, r) {
	      return t = t.toLowerCase(), n + (r ? t.charAt(0).toUpperCase() + t.slice(1) : t);
	    }),
	        Ko = Gt(function (n, t, r) {
	      return n + (r ? "-" : "") + t.toLowerCase();
	    }),
	        Vo = ar(),
	        Zo = ar(true),
	        Yo = Gt(function (n, t, r) {
	      return n + (r ? "_" : "") + t.toLowerCase();
	    }),
	        Go = Gt(function (n, t, r) {
	      return n + (r ? " " : "") + (t.charAt(0).toUpperCase() + t.slice(1));
	    }),
	        Jo = le(function (n, t) {
	      try {
	        return n.apply(w, t);
	      } catch (r) {
	        return _e(r) ? r : new Me(r);
	      }
	    }),
	        Xo = le(function (n, t) {
	      return function (r) {
	        return Or(r, n, t);
	      };
	    }),
	        Ho = le(function (n, t) {
	      return function (r) {
	        return Or(n, r, t);
	      };
	    }),
	        Qo = _r("ceil"),
	        ni = _r("floor"),
	        ti = Qt(se, Iu),
	        ri = Qt(Ae, Ru),
	        ei = _r("round");return Nn.prototype = Tn.prototype, Ln.prototype = $u(Tn.prototype), Ln.prototype.constructor = Ln, zn.prototype = $u(Tn.prototype), zn.prototype.constructor = zn, Bn.prototype["delete"] = function (n) {
	      return this.has(n) && delete this.__data__[n];
	    }, Bn.prototype.get = function (n) {
	      return "__proto__" == n ? w : this.__data__[n];
	    }, Bn.prototype.has = function (n) {
	      return "__proto__" != n && nu.call(this.__data__, n);
	    }, Bn.prototype.set = function (n, t) {
	      return "__proto__" != n && (this.__data__[n] = t), this;
	    }, Dn.prototype.push = function (n) {
	      var t = this.data;typeof n == "string" || ge(n) ? t.set.add(n) : t.hash[n] = true;
	    }, ce.Cache = Bn, Nn.after = function (n, t) {
	      if (typeof t != "function") {
	        if (typeof n != "function") throw new Ge(L);var r = n;n = t, t = r;
	      }return n = mu(n = +n) ? n : 0, function () {
	        return 1 > --n ? t.apply(this, arguments) : void 0;
	      };
	    }, Nn.ary = function (n, t, r) {
	      return r && Ur(n, t, r) && (t = w), t = n && null == t ? n.length : bu(+t || 0, 0), gr(n, E, w, w, w, w, t);
	    }, Nn.assign = Co, Nn.at = no, Nn.before = fe, Nn.bind = _o, Nn.bindAll = vo, Nn.bindKey = go, Nn.callback = Se, Nn.chain = Qr, Nn.chunk = function (n, t, r) {
	      t = (r ? Ur(n, t, r) : null == t) ? 1 : bu(yu(t) || 1, 1), r = 0;for (var e = n ? n.length : 0, u = -1, o = Be(vu(e / t)); r < e;) o[++u] = Et(n, r, r += t);
	      return o;
	    }, Nn.compact = function (n) {
	      for (var t = -1, r = n ? n.length : 0, e = -1, u = []; ++t < r;) {
	        var o = n[t];o && (u[++e] = o);
	      }return u;
	    }, Nn.constant = function (n) {
	      return function () {
	        return n;
	      };
	    }, Nn.countBy = to, Nn.create = function (n, t, r) {
	      var e = $u(n);return r && Ur(n, t, r) && (t = w), t ? tt(e, t) : e;
	    }, Nn.curry = yo, Nn.curryRight = mo, Nn.debounce = ae, Nn.defaults = Uo, Nn.defaultsDeep = Wo, Nn.defer = wo, Nn.delay = bo, Nn.difference = Mu, Nn.drop = qr, Nn.dropRight = Pr, Nn.dropRightWhile = function (n, t, r) {
	      return n && n.length ? Nt(n, wr(t, r, 3), true, true) : [];
	    }, Nn.dropWhile = function (n, t, r) {
	      return n && n.length ? Nt(n, wr(t, r, 3), true) : [];
	    }, Nn.fill = function (n, t, r, e) {
	      var u = n ? n.length : 0;if (!u) return [];for (r && typeof r != "number" && Ur(n, t, r) && (r = 0, e = u), u = n.length, r = null == r ? 0 : +r || 0, 0 > r && (r = -r > u ? 0 : u + r), e = e === w || e > u ? u : +e || 0, 0 > e && (e += u), u = r > e ? 0 : e >>> 0, r >>>= 0; r < u;) n[r++] = t;return n;
	    }, Nn.filter = re, Nn.flatten = function (n, t, r) {
	      var e = n ? n.length : 0;return r && Ur(n, t, r) && (t = false), e ? pt(n, t) : [];
	    }, Nn.flattenDeep = function (n) {
	      return n && n.length ? pt(n, true) : [];
	    }, Nn.flow = xo, Nn.flowRight = Ao, Nn.forEach = uo, Nn.forEachRight = oo, Nn.forIn = Fo, Nn.forInRight = No, Nn.forOwn = To, Nn.forOwnRight = Lo, Nn.functions = Ie, Nn.groupBy = io, Nn.indexBy = fo, Nn.initial = function (n) {
	      return Pr(n, 1);
	    }, Nn.intersection = Ku, Nn.invert = function (n, t, r) {
	      r && Ur(n, t, r) && (t = w), r = -1;for (var e = zo(n), u = e.length, o = {}; ++r < u;) {
	        var i = e[r],
	            f = n[i];t ? nu.call(o, f) ? o[f].push(i) : o[f] = [i] : o[f] = i;
	      }return o;
	    }, Nn.invoke = ao, Nn.keys = zo, Nn.keysIn = Re, Nn.map = ue, Nn.mapKeys = Bo, Nn.mapValues = Do, Nn.matches = Ne, Nn.matchesProperty = function (n, t) {
	      return xt(n, ot(t, true));
	    }, Nn.memoize = ce, Nn.merge = Eo, Nn.method = Xo, Nn.methodOf = Ho, Nn.mixin = Te, Nn.modArgs = jo, Nn.negate = function (n) {
	      if (typeof n != "function") throw new Ge(L);return function () {
	        return !n.apply(this, arguments);
	      };
	    }, Nn.omit = Mo, Nn.once = function (n) {
	      return fe(2, n);
	    }, Nn.pairs = Oe, Nn.partial = ko, Nn.partialRight = Io, Nn.partition = co, Nn.pick = qo, Nn.pluck = function (n, t) {
	      return ue(n, ze(t));
	    }, Nn.property = ze, Nn.propertyOf = function (n) {
	      return function (t) {
	        return yt(n, Dr(t), t + "");
	      };
	    }, Nn.pull = function () {
	      var n = arguments,
	          t = n[0];if (!t || !t.length) return t;for (var r = 0, e = xr(), u = n.length; ++r < u;) for (var o = 0, i = n[r]; -1 < (o = e(t, i, o));) pu.call(t, o, 1);
	      return t;
	    }, Nn.pullAt = Vu, Nn.range = function (n, t, r) {
	      r && Ur(n, t, r) && (t = r = w), n = +n || 0, r = null == r ? 1 : +r || 0, null == t ? (t = n, n = 0) : t = +t || 0;var e = -1;t = bu(vu((t - n) / (r || 1)), 0);for (var u = Be(t); ++e < t;) u[e] = n, n += r;return u;
	    }, Nn.rearg = Ro, Nn.reject = function (n, t, r) {
	      var e = Oo(n) ? Vn : lt;return t = wr(t, r, 3), e(n, function (n, r, e) {
	        return !t(n, r, e);
	      });
	    }, Nn.remove = function (n, t, r) {
	      var e = [];if (!n || !n.length) return e;var u = -1,
	          o = [],
	          i = n.length;for (t = wr(t, r, 3); ++u < i;) r = n[u], t(r, u, n) && (e.push(r), o.push(u));return It(n, o), e;
	    }, Nn.rest = Yr, Nn.restParam = le, Nn.set = function (n, t, r) {
	      if (null == n) return n;var e = t + "";t = null != n[e] || Wr(t, n) ? [e] : Dr(t);for (var e = -1, u = t.length, o = u - 1, i = n; null != i && ++e < u;) {
	        var f = t[e];ge(i) && (e == o ? i[f] = r : null == i[f] && (i[f] = Cr(t[e + 1]) ? [] : {})), i = i[f];
	      }return n;
	    }, Nn.shuffle = function (n) {
	      return oe(n, Ru);
	    }, Nn.slice = function (n, t, r) {
	      var e = n ? n.length : 0;return e ? (r && typeof r != "number" && Ur(n, t, r) && (t = 0, r = e), Et(n, t, r)) : [];
	    }, Nn.sortBy = function (n, t, r) {
	      if (null == n) return [];r && Ur(n, t, r) && (t = w);var e = -1;return t = wr(t, r, 3), n = wt(n, function (n, r, u) {
	        return { a: t(n, r, u),
	          b: ++e, c: n };
	      }), Ut(n, f);
	    }, Nn.sortByAll = po, Nn.sortByOrder = function (n, t, r, e) {
	      return null == n ? [] : (e && Ur(t, r, e) && (r = w), Oo(t) || (t = null == t ? [] : [t]), Oo(r) || (r = null == r ? [] : [r]), Wt(n, t, r));
	    }, Nn.spread = function (n) {
	      if (typeof n != "function") throw new Ge(L);return function (t) {
	        return n.apply(this, t);
	      };
	    }, Nn.take = function (n, t, r) {
	      return n && n.length ? ((r ? Ur(n, t, r) : null == t) && (t = 1), Et(n, 0, 0 > t ? 0 : t)) : [];
	    }, Nn.takeRight = function (n, t, r) {
	      var e = n ? n.length : 0;return e ? ((r ? Ur(n, t, r) : null == t) && (t = 1), t = e - (+t || 0), Et(n, 0 > t ? 0 : t)) : [];
	    }, Nn.takeRightWhile = function (n, t, r) {
	      return n && n.length ? Nt(n, wr(t, r, 3), false, true) : [];
	    }, Nn.takeWhile = function (n, t, r) {
	      return n && n.length ? Nt(n, wr(t, r, 3)) : [];
	    }, Nn.tap = function (n, t, r) {
	      return t.call(r, n), n;
	    }, Nn.throttle = function (n, t, r) {
	      var e = true,
	          u = true;if (typeof n != "function") throw new Ge(L);return false === r ? e = false : ge(r) && (e = "leading" in r ? !!r.leading : e, u = "trailing" in r ? !!r.trailing : u), ae(n, t, { leading: e, maxWait: +t, trailing: u });
	    }, Nn.thru = ne, Nn.times = function (n, t, r) {
	      if (n = yu(n), 1 > n || !mu(n)) return [];var e = -1,
	          u = Be(xu(n, 4294967295));for (t = Bt(t, r, 1); ++e < n;) 4294967295 > e ? u[e] = t(e) : t(e);
	      return u;
	    }, Nn.toArray = je, Nn.toPlainObject = ke, Nn.transform = function (n, t, r, e) {
	      var u = Oo(n) || xe(n);return t = wr(t, e, 4), null == r && (u || ge(n) ? (e = n.constructor, r = u ? Oo(n) ? new e() : [] : $u(ve(e) ? e.prototype : w)) : r = {}), (u ? Pn : _t)(n, function (n, e, u) {
	        return t(r, n, e, u);
	      }), r;
	    }, Nn.union = Gu, Nn.uniq = Gr, Nn.unzip = Jr, Nn.unzipWith = Xr, Nn.values = Ee, Nn.valuesIn = function (n) {
	      return Ft(n, Re(n));
	    }, Nn.where = function (n, t) {
	      return re(n, bt(t));
	    }, Nn.without = Ju, Nn.wrap = function (n, t) {
	      return t = null == t ? Fe : t, gr(t, R, w, [n], []);
	    }, Nn.xor = function () {
	      for (var n = -1, t = arguments.length; ++n < t;) {
	        var r = arguments[n];if (Er(r)) var e = e ? Jn(ft(e, r), ft(r, e)) : r;
	      }return e ? St(e) : [];
	    }, Nn.zip = Xu, Nn.zipObject = Hr, Nn.zipWith = Hu, Nn.backflow = Ao, Nn.collect = ue, Nn.compose = Ao, Nn.each = uo, Nn.eachRight = oo, Nn.extend = Co, Nn.iteratee = Se, Nn.methods = Ie, Nn.object = Hr, Nn.select = re, Nn.tail = Yr, Nn.unique = Gr, Te(Nn, Nn), Nn.add = function (n, t) {
	      return (+n || 0) + (+t || 0);
	    }, Nn.attempt = Jo, Nn.camelCase = Po, Nn.capitalize = function (n) {
	      return (n = u(n)) && n.charAt(0).toUpperCase() + n.slice(1);
	    }, Nn.ceil = Qo, Nn.clone = function (n, t, r, e) {
	      return t && typeof t != "boolean" && Ur(n, t, r) ? t = false : typeof t == "function" && (e = r, r = t, t = false), typeof r == "function" ? ot(n, t, Bt(r, e, 3)) : ot(n, t);
	    }, Nn.cloneDeep = function (n, t, r) {
	      return typeof t == "function" ? ot(n, true, Bt(t, r, 3)) : ot(n, true);
	    }, Nn.deburr = Ce, Nn.endsWith = function (n, t, r) {
	      n = u(n), t += "";var e = n.length;return r = r === w ? e : xu(0 > r ? 0 : +r || 0, e), r -= t.length, 0 <= r && n.indexOf(t, r) == r;
	    }, Nn.escape = function (n) {
	      return (n = u(n)) && hn.test(n) ? n.replace(sn, c) : n;
	    }, Nn.escapeRegExp = function (n) {
	      return (n = u(n)) && bn.test(n) ? n.replace(wn, l) : n || "(?:)";
	    }, Nn.every = te, Nn.find = ro, Nn.findIndex = qu, Nn.findKey = $o, Nn.findLast = eo, Nn.findLastIndex = Pu, Nn.findLastKey = So, Nn.findWhere = function (n, t) {
	      return ro(n, bt(t));
	    }, Nn.first = Kr, Nn.floor = ni, Nn.get = function (n, t, r) {
	      return n = null == n ? w : yt(n, Dr(t), t + ""), n === w ? r : n;
	    }, Nn.gt = se, Nn.gte = function (n, t) {
	      return n >= t;
	    }, Nn.has = function (n, t) {
	      if (null == n) return false;var r = nu.call(n, t);if (!r && !Wr(t)) {
	        if (t = Dr(t), n = 1 == t.length ? n : yt(n, Et(t, 0, -1)), null == n) return false;t = Zr(t), r = nu.call(n, t);
	      }return r || Sr(n.length) && Cr(t, n.length) && (Oo(n) || pe(n));
	    }, Nn.identity = Fe, Nn.includes = ee, Nn.indexOf = Vr, Nn.inRange = function (n, t, r) {
	      return t = +t || 0, r === w ? (r = t, t = 0) : r = +r || 0, n >= xu(t, r) && n < bu(t, r);
	    }, Nn.isArguments = pe, Nn.isArray = Oo, Nn.isBoolean = function (n) {
	      return true === n || false === n || h(n) && ru.call(n) == M;
	    }, Nn.isDate = function (n) {
	      return h(n) && ru.call(n) == q;
	    }, Nn.isElement = function (n) {
	      return !!n && 1 === n.nodeType && h(n) && !me(n);
	    }, Nn.isEmpty = function (n) {
	      return null == n ? true : Er(n) && (Oo(n) || be(n) || pe(n) || h(n) && ve(n.splice)) ? !n.length : !zo(n).length;
	    }, Nn.isEqual = he, Nn.isError = _e, Nn.isFinite = function (n) {
	      return typeof n == "number" && mu(n);
	    }, Nn.isFunction = ve, Nn.isMatch = function (n, t, r, e) {
	      return r = typeof r == "function" ? Bt(r, e, 3) : w, mt(n, Ar(t), r);
	    }, Nn.isNaN = function (n) {
	      return de(n) && n != +n;
	    }, Nn.isNative = ye, Nn.isNull = function (n) {
	      return null === n;
	    }, Nn.isNumber = de, Nn.isObject = ge, Nn.isPlainObject = me, Nn.isRegExp = we, Nn.isString = be, Nn.isTypedArray = xe, Nn.isUndefined = function (n) {
	      return n === w;
	    }, Nn.kebabCase = Ko, Nn.last = Zr, Nn.lastIndexOf = function (n, t, r) {
	      var e = n ? n.length : 0;if (!e) return -1;var u = e;if (typeof r == "number") u = (0 > r ? bu(e + r, 0) : xu(r || 0, e - 1)) + 1;else if (r) return u = Lt(n, t, true) - 1, n = n[u], (t === t ? t === n : n !== n) ? u : -1;
	      if (t !== t) return p(n, u, true);for (; u--;) if (n[u] === t) return u;return -1;
	    }, Nn.lt = Ae, Nn.lte = function (n, t) {
	      return n <= t;
	    }, Nn.max = ti, Nn.min = ri, Nn.noConflict = function () {
	      return Zn._ = eu, this;
	    }, Nn.noop = Le, Nn.now = ho, Nn.pad = function (n, t, r) {
	      n = u(n), t = +t;var e = n.length;return e < t && mu(t) ? (e = (t - e) / 2, t = yu(e), e = vu(e), r = pr("", e, r), r.slice(0, t) + n + r) : n;
	    }, Nn.padLeft = Vo, Nn.padRight = Zo, Nn.parseInt = function (n, t, r) {
	      return (r ? Ur(n, t, r) : null == t) ? t = 0 : t && (t = +t), n = We(n), ju(n, t || (In.test(n) ? 16 : 10));
	    }, Nn.random = function (n, t, r) {
	      r && Ur(n, t, r) && (t = r = w);
	      var e = null == n,
	          u = null == t;return null == r && (u && typeof n == "boolean" ? (r = n, n = 1) : typeof t == "boolean" && (r = t, u = true)), e && u && (t = 1, u = false), n = +n || 0, u ? (t = n, n = 0) : t = +t || 0, r || n % 1 || t % 1 ? (r = ku(), xu(n + r * (t - n + fu("1e-" + ((r + "").length - 1))), t)) : Rt(n, t);
	    }, Nn.reduce = lo, Nn.reduceRight = so, Nn.repeat = Ue, Nn.result = function (n, t, r) {
	      var e = null == n ? w : n[t];return e === w && (null == n || Wr(t, n) || (t = Dr(t), n = 1 == t.length ? n : yt(n, Et(t, 0, -1)), e = null == n ? w : n[Zr(t)]), e = e === w ? r : e), ve(e) ? e.call(n) : e;
	    }, Nn.round = ei, Nn.runInContext = m, Nn.size = function (n) {
	      var t = n ? Bu(n) : 0;
	      return Sr(t) ? t : zo(n).length;
	    }, Nn.snakeCase = Yo, Nn.some = ie, Nn.sortedIndex = Zu, Nn.sortedLastIndex = Yu, Nn.startCase = Go, Nn.startsWith = function (n, t, r) {
	      return n = u(n), r = null == r ? 0 : xu(0 > r ? 0 : +r || 0, n.length), n.lastIndexOf(t, r) == r;
	    }, Nn.sum = function (n, t, r) {
	      if (r && Ur(n, t, r) && (t = w), t = wr(t, r, 3), 1 == t.length) {
	        n = Oo(n) ? n : zr(n), r = n.length;for (var e = 0; r--;) e += +t(n[r]) || 0;n = e;
	      } else n = $t(n, t);return n;
	    }, Nn.template = function (n, t, r) {
	      var e = Nn.templateSettings;r && Ur(n, t, r) && (t = r = w), n = u(n), t = nt(tt({}, r || t), e, Qn), r = nt(tt({}, t.imports), e.imports, Qn);
	      var o,
	          i,
	          f = zo(r),
	          a = Ft(r, f),
	          c = 0;r = t.interpolate || Cn;var l = "__p+='";r = Ze((t.escape || Cn).source + "|" + r.source + "|" + (r === gn ? jn : Cn).source + "|" + (t.evaluate || Cn).source + "|$", "g");var p = "sourceURL" in t ? "//# sourceURL=" + t.sourceURL + "\n" : "";if (n.replace(r, function (t, r, e, u, f, a) {
	        return e || (e = u), l += n.slice(c, a).replace(Un, s), r && (o = true, l += "'+__e(" + r + ")+'"), f && (i = true, l += "';" + f + ";\n__p+='"), e && (l += "'+((__t=(" + e + "))==null?'':__t)+'"), c = a + t.length, t;
	      }), l += "';", (t = t.variable) || (l = "with(obj){" + l + "}"), l = (i ? l.replace(fn, "") : l).replace(an, "$1").replace(cn, "$1;"), l = "function(" + (t || "obj") + "){" + (t ? "" : "obj||(obj={});") + "var __t,__p=''" + (o ? ",__e=_.escape" : "") + (i ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + l + "return __p}", t = Jo(function () {
	        return qe(f, p + "return " + l).apply(w, a);
	      }), t.source = l, _e(t)) throw t;return t;
	    }, Nn.trim = We, Nn.trimLeft = function (n, t, r) {
	      var e = n;return (n = u(n)) ? n.slice((r ? Ur(e, t, r) : null == t) ? g(n) : o(n, t + "")) : n;
	    }, Nn.trimRight = function (n, t, r) {
	      var e = n;return (n = u(n)) ? (r ? Ur(e, t, r) : null == t) ? n.slice(0, y(n) + 1) : n.slice(0, i(n, t + "") + 1) : n;
	    }, Nn.trunc = function (n, t, r) {
	      r && Ur(n, t, r) && (t = w);var e = U;if (r = W, null != t) if (ge(t)) {
	        var o = "separator" in t ? t.separator : o,
	            e = "length" in t ? +t.length || 0 : e;r = "omission" in t ? u(t.omission) : r;
	      } else e = +t || 0;if (n = u(n), e >= n.length) return n;if (e -= r.length, 1 > e) return r;if (t = n.slice(0, e), null == o) return t + r;if (we(o)) {
	        if (n.slice(e).search(o)) {
	          var i,
	              f = n.slice(0, e);for (o.global || (o = Ze(o.source, (kn.exec(o) || "") + "g")), o.lastIndex = 0; n = o.exec(f);) i = n.index;t = t.slice(0, null == i ? e : i);
	        }
	      } else n.indexOf(o, e) != e && (o = t.lastIndexOf(o), -1 < o && (t = t.slice(0, o)));return t + r;
	    }, Nn.unescape = function (n) {
	      return (n = u(n)) && pn.test(n) ? n.replace(ln, d) : n;
	    }, Nn.uniqueId = function (n) {
	      var t = ++tu;return u(n) + t;
	    }, Nn.words = $e, Nn.all = te, Nn.any = ie, Nn.contains = ee, Nn.eq = he, Nn.detect = ro, Nn.foldl = lo, Nn.foldr = so, Nn.head = Kr, Nn.include = ee, Nn.inject = lo, Te(Nn, function () {
	      var n = {};return _t(Nn, function (t, r) {
	        Nn.prototype[r] || (n[r] = t);
	      }), n;
	    }(), false), Nn.sample = oe, Nn.prototype.sample = function (n) {
	      return this.__chain__ || null != n ? this.thru(function (t) {
	        return oe(t, n);
	      }) : oe(this.value());
	    }, Nn.VERSION = b, Pn("bind bindKey curry curryRight partial partialRight".split(" "), function (n) {
	      Nn[n].placeholder = Nn;
	    }), Pn(["drop", "take"], function (n, t) {
	      zn.prototype[n] = function (r) {
	        var e = this.__filtered__;if (e && !t) return new zn(this);r = null == r ? 1 : bu(yu(r) || 0, 0);var u = this.clone();return e ? u.__takeCount__ = xu(u.__takeCount__, r) : u.__views__.push({ size: r, type: n + (0 > u.__dir__ ? "Right" : "") }), u;
	      }, zn.prototype[n + "Right"] = function (t) {
	        return this.reverse()[n](t).reverse();
	      };
	    }), Pn(["filter", "map", "takeWhile"], function (n, t) {
	      var r = t + 1,
	          e = r != T;zn.prototype[n] = function (n, t) {
	        var u = this.clone();return u.__iteratees__.push({ iteratee: wr(n, t, 1), type: r }), u.__filtered__ = u.__filtered__ || e, u;
	      };
	    }), Pn(["first", "last"], function (n, t) {
	      var r = "take" + (t ? "Right" : "");zn.prototype[n] = function () {
	        return this[r](1).value()[0];
	      };
	    }), Pn(["initial", "rest"], function (n, t) {
	      var r = "drop" + (t ? "" : "Right");zn.prototype[n] = function () {
	        return this.__filtered__ ? new zn(this) : this[r](1);
	      };
	    }), Pn(["pluck", "where"], function (n, t) {
	      var r = t ? "filter" : "map",
	          e = t ? bt : ze;zn.prototype[n] = function (n) {
	        return this[r](e(n));
	      };
	    }), zn.prototype.compact = function () {
	      return this.filter(Fe);
	    }, zn.prototype.reject = function (n, t) {
	      return n = wr(n, t, 1), this.filter(function (t) {
	        return !n(t);
	      });
	    }, zn.prototype.slice = function (n, t) {
	      n = null == n ? 0 : +n || 0;var r = this;return r.__filtered__ && (0 < n || 0 > t) ? new zn(r) : (0 > n ? r = r.takeRight(-n) : n && (r = r.drop(n)), t !== w && (t = +t || 0, r = 0 > t ? r.dropRight(-t) : r.take(t - n)), r);
	    }, zn.prototype.takeRightWhile = function (n, t) {
	      return this.reverse().takeWhile(n, t).reverse();
	    }, zn.prototype.toArray = function () {
	      return this.take(Ru);
	    }, _t(zn.prototype, function (n, t) {
	      var r = /^(?:filter|map|reject)|While$/.test(t),
	          e = /^(?:first|last)$/.test(t),
	          u = Nn[e ? "take" + ("last" == t ? "Right" : "") : t];u && (Nn.prototype[t] = function () {
	        function t(n) {
	          return e && i ? u(n, 1)[0] : u.apply(w, Jn([n], o));
	        }var o = e ? [1] : arguments,
	            i = this.__chain__,
	            f = this.__wrapped__,
	            a = !!this.__actions__.length,
	            c = f instanceof zn,
	            l = o[0],
	            s = c || Oo(f);return s && r && typeof l == "function" && 1 != l.length && (c = s = false), l = { func: ne, args: [t], thisArg: w }, a = c && !a, e && !i ? a ? (f = f.clone(), f.__actions__.push(l), n.call(f)) : u.call(w, this.value())[0] : !e && s ? (f = a ? f : new zn(this), f = n.apply(f, o), f.__actions__.push(l), new Ln(f, i)) : this.thru(t);
	      });
	    }), Pn("join pop push replace shift sort splice split unshift".split(" "), function (n) {
	      var t = (/^(?:replace|split)$/.test(n) ? He : Je)[n],
	          r = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru",
	          e = /^(?:join|pop|replace|shift)$/.test(n);Nn.prototype[n] = function () {
	        var n = arguments;return e && !this.__chain__ ? t.apply(this.value(), n) : this[r](function (r) {
	          return t.apply(r, n);
	        });
	      };
	    }), _t(zn.prototype, function (n, t) {
	      var r = Nn[t];if (r) {
	        var e = r.name + "";(Wu[e] || (Wu[e] = [])).push({
	          name: t, func: r });
	      }
	    }), Wu[sr(w, A).name] = [{ name: "wrapper", func: w }], zn.prototype.clone = function () {
	      var n = new zn(this.__wrapped__);return n.__actions__ = qn(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = qn(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = qn(this.__views__), n;
	    }, zn.prototype.reverse = function () {
	      if (this.__filtered__) {
	        var n = new zn(this);n.__dir__ = -1, n.__filtered__ = true;
	      } else n = this.clone(), n.__dir__ *= -1;return n;
	    }, zn.prototype.value = function () {
	      var n,
	          t = this.__wrapped__.value(),
	          r = this.__dir__,
	          e = Oo(t),
	          u = 0 > r,
	          o = e ? t.length : 0;n = o;for (var i = this.__views__, f = 0, a = -1, c = i.length; ++a < c;) {
	        var l = i[a],
	            s = l.size;switch (l.type) {case "drop":
	            f += s;break;case "dropRight":
	            n -= s;break;case "take":
	            n = xu(n, f + s);break;case "takeRight":
	            f = bu(f, n - s);}
	      }if (n = { start: f, end: n }, i = n.start, f = n.end, n = f - i, u = u ? f : i - 1, i = this.__iteratees__, f = i.length, a = 0, c = xu(n, this.__takeCount__), !e || o < F || o == n && c == n) return Tt(t, this.__actions__);e = [];n: for (; n-- && a < c;) {
	        for (u += r, o = -1, l = t[u]; ++o < f;) {
	          var p = i[o],
	              s = p.type,
	              p = p.iteratee(l);
	          if (s == T) l = p;else if (!p) {
	            if (s == N) continue n;break n;
	          }
	        }e[a++] = l;
	      }return e;
	    }, Nn.prototype.chain = function () {
	      return Qr(this);
	    }, Nn.prototype.commit = function () {
	      return new Ln(this.value(), this.__chain__);
	    }, Nn.prototype.concat = Qu, Nn.prototype.plant = function (n) {
	      for (var t, r = this; r instanceof Tn;) {
	        var e = Mr(r);t ? u.__wrapped__ = e : t = e;var u = e,
	            r = r.__wrapped__;
	      }return u.__wrapped__ = n, t;
	    }, Nn.prototype.reverse = function () {
	      function n(n) {
	        return n.reverse();
	      }var t = this.__wrapped__;return t instanceof zn ? (this.__actions__.length && (t = new zn(this)), t = t.reverse(), t.__actions__.push({ func: ne, args: [n], thisArg: w }), new Ln(t, this.__chain__)) : this.thru(n);
	    }, Nn.prototype.toString = function () {
	      return this.value() + "";
	    }, Nn.prototype.run = Nn.prototype.toJSON = Nn.prototype.valueOf = Nn.prototype.value = function () {
	      return Tt(this.__wrapped__, this.__actions__);
	    }, Nn.prototype.collect = Nn.prototype.map, Nn.prototype.head = Nn.prototype.first, Nn.prototype.select = Nn.prototype.filter, Nn.prototype.tail = Nn.prototype.rest, Nn;
	  }var w,
	      b = "3.10.1",
	      x = 1,
	      A = 2,
	      j = 4,
	      k = 8,
	      I = 16,
	      R = 32,
	      O = 64,
	      E = 128,
	      C = 256,
	      U = 30,
	      W = "...",
	      $ = 150,
	      S = 16,
	      F = 200,
	      N = 1,
	      T = 2,
	      L = "Expected a function",
	      z = "__lodash_placeholder__",
	      B = "[object Arguments]",
	      D = "[object Array]",
	      M = "[object Boolean]",
	      q = "[object Date]",
	      P = "[object Error]",
	      K = "[object Function]",
	      V = "[object Number]",
	      Z = "[object Object]",
	      Y = "[object RegExp]",
	      G = "[object String]",
	      J = "[object ArrayBuffer]",
	      X = "[object Float32Array]",
	      H = "[object Float64Array]",
	      Q = "[object Int8Array]",
	      nn = "[object Int16Array]",
	      tn = "[object Int32Array]",
	      rn = "[object Uint8Array]",
	      en = "[object Uint8ClampedArray]",
	      un = "[object Uint16Array]",
	      on = "[object Uint32Array]",
	      fn = /\b__p\+='';/g,
	      an = /\b(__p\+=)''\+/g,
	      cn = /(__e\(.*?\)|\b__t\))\+'';/g,
	      ln = /&(?:amp|lt|gt|quot|#39|#96);/g,
	      sn = /[&<>"'`]/g,
	      pn = RegExp(ln.source),
	      hn = RegExp(sn.source),
	      _n = /<%-([\s\S]+?)%>/g,
	      vn = /<%([\s\S]+?)%>/g,
	      gn = /<%=([\s\S]+?)%>/g,
	      yn = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	      dn = /^\w*$/,
	      mn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
	      wn = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
	      bn = RegExp(wn.source),
	      xn = /[\u0300-\u036f\ufe20-\ufe23]/g,
	      An = /\\(\\)?/g,
	      jn = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
	      kn = /\w*$/,
	      In = /^0[xX]/,
	      Rn = /^\[object .+?Constructor\]$/,
	      On = /^\d+$/,
	      En = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,
	      Cn = /($^)/,
	      Un = /['\n\r\u2028\u2029\\]/g,
	      Wn = RegExp("[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?=[A-Z\\xc0-\\xd6\\xd8-\\xde][a-z\\xdf-\\xf6\\xf8-\\xff]+)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+|[A-Z\\xc0-\\xd6\\xd8-\\xde]+|[0-9]+", "g"),
	      $n = "Array ArrayBuffer Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Math Number Object RegExp Set String _ clearTimeout isFinite parseFloat parseInt setTimeout TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap".split(" "),
	      Sn = {};
	  Sn[X] = Sn[H] = Sn[Q] = Sn[nn] = Sn[tn] = Sn[rn] = Sn[en] = Sn[un] = Sn[on] = true, Sn[B] = Sn[D] = Sn[J] = Sn[M] = Sn[q] = Sn[P] = Sn[K] = Sn["[object Map]"] = Sn[V] = Sn[Z] = Sn[Y] = Sn["[object Set]"] = Sn[G] = Sn["[object WeakMap]"] = false;var Fn = {};Fn[B] = Fn[D] = Fn[J] = Fn[M] = Fn[q] = Fn[X] = Fn[H] = Fn[Q] = Fn[nn] = Fn[tn] = Fn[V] = Fn[Z] = Fn[Y] = Fn[G] = Fn[rn] = Fn[en] = Fn[un] = Fn[on] = true, Fn[P] = Fn[K] = Fn["[object Map]"] = Fn["[object Set]"] = Fn["[object WeakMap]"] = false;var Nn = { "\xc0": "A", "\xc1": "A", "\xc2": "A", "\xc3": "A", "\xc4": "A", "\xc5": "A", "\xe0": "a", "\xe1": "a", "\xe2": "a",
	    "\xe3": "a", "\xe4": "a", "\xe5": "a", "\xc7": "C", "\xe7": "c", "\xd0": "D", "\xf0": "d", "\xc8": "E", "\xc9": "E", "\xca": "E", "\xcb": "E", "\xe8": "e", "\xe9": "e", "\xea": "e", "\xeb": "e", "\xcc": "I", "\xcd": "I", "\xce": "I", "\xcf": "I", "\xec": "i", "\xed": "i", "\xee": "i", "\xef": "i", "\xd1": "N", "\xf1": "n", "\xd2": "O", "\xd3": "O", "\xd4": "O", "\xd5": "O", "\xd6": "O", "\xd8": "O", "\xf2": "o", "\xf3": "o", "\xf4": "o", "\xf5": "o", "\xf6": "o", "\xf8": "o", "\xd9": "U", "\xda": "U", "\xdb": "U", "\xdc": "U", "\xf9": "u", "\xfa": "u", "\xfb": "u", "\xfc": "u", "\xdd": "Y",
	    "\xfd": "y", "\xff": "y", "\xc6": "Ae", "\xe6": "ae", "\xde": "Th", "\xfe": "th", "\xdf": "ss" },
	      Tn = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#96;" },
	      Ln = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#96;": "`" },
	      zn = { "function": true, object: true },
	      Bn = { 0: "x30", 1: "x31", 2: "x32", 3: "x33", 4: "x34", 5: "x35", 6: "x36", 7: "x37", 8: "x38", 9: "x39", A: "x41", B: "x42", C: "x43", D: "x44", E: "x45", F: "x46", a: "x61", b: "x62", c: "x63", d: "x64", e: "x65", f: "x66", n: "x6e", r: "x72", t: "x74", u: "x75", v: "x76", x: "x78" },
	      Dn = { "\\": "\\",
	    "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" },
	      Mn = zn[typeof exports] && exports && !exports.nodeType && exports,
	      qn = zn[typeof module] && module && !module.nodeType && module,
	      Pn = zn[typeof self] && self && self.Object && self,
	      Kn = zn[typeof window] && window && window.Object && window,
	      Vn = qn && qn.exports === Mn && Mn,
	      Zn = Mn && qn && typeof global == "object" && global && global.Object && global || Kn !== (this && this.window) && Kn || Pn || this,
	      Yn = m(); true ? (Zn._ = Yn, !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return Yn;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))) : Mn && qn ? Vn ? (qn.exports = Yn)._ = Yn : Mn._ = Yn : Zn._ = Yn;
	}).call(this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module), (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var data = __webpack_require__(5);
	var _ = __webpack_require__(2);

	var RESULT_LIMIT = 10;

	// Find and report duplicates in the data.
	(function () {
	  // https://stackoverflow.com/questions/840781/easiest-way-to-find-duplicate-values-in-a-javascript-array
	  var arr = data.map(function (entry) {
	    return entry.toki.toLowerCase();
	  });
	  var sorted_arr = arr.sort();
	  var results = [];
	  for (var i = 0; i < arr.length - 1; i++) {
	    if (sorted_arr[i + 1] == sorted_arr[i]) {
	      results.push(sorted_arr[i]);
	    }
	  }

	  if (results.length > 0) {
	    console.warn("Duplicate toki entries in dictionary.");
	    console.log(results);
	  }
	})();

	// Search backends.
	backends = {};

	// Lunr backend.
	backends.lunr = function () {
	  var index = lunr(function () {
	    this.field("toki", { boost: 10 });
	    this.field("eng");
	  });

	  var store = {};

	  // Load data.
	  _.forEach(data, function (entry, i) {
	    var doc = {
	      toki: entry.toki,
	      eng: entry.eng,
	      id: i
	    };
	    store[i] = doc;
	    index.add(doc);
	  });

	  return function search(query) {
	    var results = index.search(query).map(function (res) {
	      return store[res.ref];
	    });
	    return results;
	  };
	};

	// Bloodhound backend.
	backends.bloodhound = function () {
	  var isNotEmptyString = function (s) {
	    return s.length !== 0;
	  };

	  var tokenize = function (s) {
	    return s.toLowerCase().split(/[\W+]/).filter(isNotEmptyString);
	  };

	  var queryTokenizer = function (query) {
	    return tokenize(query);
	  };

	  var datumTokenizer = function (datum) {
	    return tokenize(datum.toki + "|" + datum.eng);
	  };

	  var engine = new Bloodhound({
	    initialize: false,
	    local: data,
	    queryTokenizer: queryTokenizer,
	    datumTokenizer: datumTokenizer,
	    sufficient: RESULT_LIMIT
	  });

	  engine.initialize();

	  return function search(query) {
	    result = null;
	    engine.search(query, function (datums) {
	      result = datums;
	    });
	    return result.slice(0, RESULT_LIMIT);
	  };
	};

	// Fuse backend.
	backends.fuse = function () {
	  var fuse = new Fuse(data, {
	    caseSensitive: false,
	    include: ["score"],
	    shouldSort: true,
	    threshold: 0.2,
	    location: 0,
	    distance: 10000,
	    maxPatternLength: 128,
	    keys: ["eng", "toki"]
	  });

	  return function search(query) {
	    return fuse.search(query).slice(0, RESULT_LIMIT).map(function (res) {
	      res.item.score = res.score;
	      return res.item;
	    });
	  };
	};

	// The search backends to not seem to grant the appropriate degree of esteem to
	// exact matches. For example, 'mi' yields 'lawa', 'li', etc. but 'mi' isn't even
	// in the results!
	// This function wraps a search function and promotes exact matches on the toki to the top.
	function patchSearch(underlyingSearch) {
	  var isNotEmptyString = function (s) {
	    return s.length !== 0;
	  };

	  var normalize = function (s) {
	    return s.toLowerCase().split(/[\W+]/).filter(isNotEmptyString).join("");
	  };

	  var exactMatcher = function (query) {
	    var normQuery = normalize(query);
	    return function match(entry) {
	      return normalize(entry.toki) == normQuery;
	    };
	  };

	  var search = function (query) {
	    var underlyingResults = underlyingSearch(query);
	    var matcher = exactMatcher(query);
	    var exactResults = data.filter(matcher);
	    var inexactResults = underlyingResults.filter(function (entry) {
	      return !matcher(entry);
	    });
	    return exactResults.concat(inexactResults).slice(0, RESULT_LIMIT);
	  };

	  return search;
	}

	exports.init = function (backendName) {
	  exports.search = patchSearch(backends[backendName]());
	};

	exports.search = function () {
	  console.error("Run init to select a backend before using the dictionary.");
	  console.log("The available backends are:");
	  for (var bn in backends) {
	    console.log(bn);
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = [{
	  "eng": "well! ha! o! oh!",
	  "ita": "bene! ah! oh! oh!",
	  "toki": "a",
	  "rus": "а! ха! о! ой!",
	  "image": "a"
	}, {
	  "eng": "unpleasant animal, reptile, reptile",
	  "ita": "animale sgradevole, rettile, rettile",
	  "toki": "akesi",
	  "rus": "неприятное животное, рептилия, пресмыкающееся",
	  "image": "akesi"
	}, {
	  "eng": "No, no, non, nothing negative, zero, no!",
	  "ita": "No, no, non, nulla di negativo, pari a zero, no!",
	  "toki": "ala",
	  "rus": "не, нет, не-, ничего, отрицание, ноль, нет!",
	  "image": "ala"
	}, {
	  "eng": "all, every, life, the universe, all, each, whole, entire",
	  "ita": "tutto, ogni, la vita, l'universo, tutto, ogni, tutto, intero",
	  "toki": "ali, ale ",
	  "rus": "всё, каждое, жизнь, вселенная, все, каждый, целый, полный",
	  "image": "ali-ale"
	}, {
	  "eng": "bottom, lower portion below, a floor, below the bottom of lower down, humble",
	  "ita": "inferiore, parte inferiore sotto, un pavimento, sotto il fondo piu in basso",
	  "toki": "anpa",
	  "rus": "низ, нижняя часть, под, пол, ниже, низ, ниже, вниз",
	  "image": "anpa"
	}, {
	  "eng": "contrast, great, other, otherwise, change, change",
	  "ita": "contrasto, grande, altri, in caso contrario, il cambiamento, il cambiamento",
	  "toki": "ante",
	  "rus": "отличие, отличный, другой, иначе, изменить, сменить",
	  "image": "ante"
	}, {
	  "eng": "or",
	  "ita": "o",
	  "toki": "anu",
	  "rus": "или",
	  "image": "anu"
	}, {
	  "eng": "stay, wait, stay, store remaining, fixed, permanent, sedentary, sedentary, safe",
	  "ita": "stare, attendere, stare, magazzini rimanente, fisso, permanente, sedentario, sedentario",
	  "toki": "awen",
	  "rus": "оставаться, ждать, пребывать, хранить, оставшийся, неподвижный, постоянный, сидячий, оседлый",
	  "image": "awen"
	}, {
	  "eng": "divides the predicate and addition",
	  "ita": "divide il predicato e aggiunta",
	  "toki": "e",
	  "rus": "разделяет сказуемое и дополнение",
	  "image": "e"
	}, {
	  "eng": "and",
	  "ita": "e",
	  "toki": "en",
	  "rus": "и",
	  "image": "en"
	}, {
	  "eng": "thing, something, an object made out of something, to embody",
	  "ita": "cosa, una cosa, un oggetto fatto di qualcosa, di incarnare",
	  "toki": "ijo",
	  "rus": "вещь, что-то, объект, из чего-то, воплощать",
	  "image": "ijo"
	}, {
	  "eng": "bad, negative, wrong, evil, too complicated, (figuratively) the patient, sorry! alas! harmful, useless, anger, do bad, to worsen, cause negative effects to be bad",
	  "ita": "cattivo, negativo, sbagliato, il male, troppo complicato, (in senso figurato) il paziente, mi dispiace! ahime! dannoso, inutile, rabbia, fare il male, a peggiorare, causare effetti negativi a essere cattivo",
	  "toki": "ike",
	  "rus": "плохой, отрицательный, неправильный, злой, слишком сложный, (образно) больной,жаль! увы! вредность, негодность, злость, сделать плохим, ухудшить, вызвать негативный эффект, быть плохим",
	  "image": "ike"
	}, {
	  "eng": "instrument, apparatus, device, machine, apparatus, machine, device; thing ispolzemaya for a particular purpose",
	  "ita": "strumento, apparecchio, dispositivo, macchina, apparecchio, macchina, dispositivo; cosa ispolzemaya per un particolare scopo",
	  "toki": "ilo",
	  "rus": "инструмент, устройство, приспособление, механизм, аппарат, машина, прибор; вещь, использемая для определённой цели",
	  "image": "ilo"
	}, {
	  "eng": "inside, the center, the stomach, stomach, inner",
	  "ita": "dentro, il mondo interiore, il centro, lo stomaco, stomaco, interiore",
	  "toki": "insa",
	  "rus": "внутри, внутренний мир, центр, живот, желудок, внутренний",
	  "image": "insa"
	}, {
	  "eng": "dirty, rude, nasty, dirt, pollution, litter, abuse, pollute, dirty, yuck! ew! yuck!",
	  "ita": "sporco, maleducato, brutto, sporco, l'inquinamento, i rifiuti, l'abuso, inquinare, sporco, puah! ew! puah!",
	  "toki": "jaki",
	  "rus": "грязный, грубый, мерзкий, грязь, загрязнение, мусор, брань, загрязнять, грязный, фу! ew! yuck!",
	  "image": "jaki"
	}, {
	  "eng": "man, people, someone, man, someone, personal, personify, to humanize",
	  "ita": "uomo, la gente, qualcuno, uomo, qualcuno, personale, personificare, di umanizzare",
	  "toki": "jan",
	  "rus": "человек, люди, кто-то, человеческий, чей-то, личный, олицетворять, очеловечивать",
	  "image": "jan"
	}, {
	  "eng": "yellow, light green",
	  "ita": "giallo, verde chiaro",
	  "toki": "jelo",
	  "rus": "жёлтый, светло-зелёный",
	  "image": "jelo"
	}, {
	  "eng": "have, include, property, ownership, receive, take a, contain",
	  "ita": "hanno, includere, immobili, proprieta, ricevere, prendere una",
	  "toki": "jo",
	  "rus": "иметь, содержать, имущество, собственность, получить, взять",
	  "image": "jo"
	}, {
	  "eng": "fish, marine animal",
	  "ita": "pesci, animali marini",
	  "toki": "kala",
	  "rus": "рыба, морское животное",
	  "image": "kala"
	}, {
	  "eng": "sound, noise, voice, noise, call play (an instrument)",
	  "ita": "suono, rumore, voce, rumore, gioco chiamata (uno strumento)",
	  "toki": "kalama",
	  "rus": "звук, шум, голос, шуметь, звонить, играть (на инструменте)",
	  "image": "kalama"
	}, {
	  "eng": "approach, come, come, happen, start, lead to a state, event, accident, chance, arrival, start, offensive, future bring, call, become",
	  "ita": "approccio, vieni, vieni, accadere, iniziare, portare a uno stato, eventi, incidenti, caso, arrivo, avviare, offensivo, futuro portare, chiamata",
	  "toki": "kama",
	  "rus": "подходить, приходить, прибывать, случаться, начинать, приводить в состояние, событие, происшествие, шанс, прибытие, начало, наступление, будущее, принести, вызвать",
	  "image": "kama"
	}, {
	  "eng": "plants, leaves, wood, grass",
	  "ita": "piante, foglie, legno, erba",
	  "toki": "kasi",
	  "rus": "растение, лист, дерево, трава",
	  "image": "kasi"
	}, {
	  "eng": "to be able to allow, enable, opportunity, resolution, capacity, make it possible to allow, it is possible that...",
	  "ita": "essere in grado di consentire, permettere, opportunita, risoluzione, capacita, permettere di permettere, e possibile che...",
	  "toki": "ken",
	  "rus": "мочь, разрешать, сделать возможным, возможность, разрешение, способность, сделать возможным, разрешить, возможно, что…",
	  "image": "ken"
	}, {
	  "eng": "use by",
	  "ita": "da utilizzare",
	  "toki": "kepeken",
	  "rus": "использовать, с помощью",
	  "image": "kepeken"
	}, {
	  "eng": "fruit, fruit, vegetable, mushroom",
	  "ita": "frutta, frutta, verdura, funghi",
	  "toki": "kili",
	  "rus": "плод, фрукт, овощ, гриб",
	  "image": "kili"
	}, {
	  "eng": "also, even (increases words, before the word)",
	  "ita": "inoltre, anche (aumenta parole, prima della parola)",
	  "toki": "kin",
	  "rus": "также, даже, (усиливает слова, перед этим словом)",
	  "image": "kin"
	}, {
	  "eng": "hard, solid, stone, metal, hard thing, rock, stone, metal, earth",
	  "ita": "duro, solido, pietra, metallo, cosa difficile, roccia, pietra, metallo, terra",
	  "toki": "kiwen",
	  "rus": "твёрдый, сплошной, каменный, металлический, твёрдая вещь, скала, камень, металл, земля",
	  "image": "kiwen"
	}, {
	  "eng": "viscous substance, rubber, powder",
	  "ita": "sostanza viscosa, polvere di gomma",
	  "toki": "ko",
	  "rus": "вязкая субстанция, резина, порошок",
	  "image": "ko"
	}, {
	  "eng": "air, wind, smell, soul, spirit, airy, ethereal, gaseous, life",
	  "ita": "aria, il vento, l'odore, l'anima, lo spirito, arioso, etereo, gassoso",
	  "toki": "kon",
	  "rus": "воздух, ветер, запах, душа, дух, воздушный, неземной, газообразный",
	  "image": "kon"
	}, {
	  "eng": "color, paint, color, paint",
	  "ita": "colori, vernici, colori, vernici",
	  "toki": "kule",
	  "rus": "цвет, краска, цветной, красить",
	  "image": "kule"
	}, {
	  "eng": "listening, hearing, hearing",
	  "ita": "l'ascolto, l'udito, l'udito",
	  "toki": "kute",
	  "rus": "слушать, слуховой, слух",
	  "image": "kute"
	}, {
	  "eng": "group, community, sompaniya, people, general, public, joint",
	  "ita": "gruppo, comunita, sompaniya, la gente, in generale, pubblico, giunto",
	  "toki": "kulupu",
	  "rus": "группа, сообщество, сомпания, люди, общий, публичный, совместный",
	  "image": "kulupu"
	}, {
	  "eng": "separator between an adverb phrase or sentence context and",
	  "ita": "separatore tra una frase avverbio o contesto della frase e",
	  "toki": "la",
	  "rus": "разделитель между наречием или фразой контекста и предложением",
	  "image": "la"
	}, {
	  "eng": "sleep, rest, sleep, sleepy",
	  "ita": "sonno, riposo, sonno, sonnolento",
	  "toki": "lape",
	  "rus": "сон, отдых, спать, сонный",
	  "image": "lape"
	}, {
	  "eng": "blue, blue-green",
	  "ita": "blu, blu-verde",
	  "toki": "laso",
	  "rus": "синий, сине-зелёный",
	  "image": "laso"
	}, {
	  "eng": "head, mind, chief, leading, manage, supervise, guide, plan",
	  "ita": "testa, la mente, capo, leader, gestire, sorvegliare, guidare",
	  "toki": "lawa",
	  "rus": "голова, ум, главный, лидирующий, управлять, контролировать, направлять",
	  "image": "lawa"
	}, {
	  "eng": "clothing, fabric, cover",
	  "ita": "abbigliamento, tessuti",
	  "toki": "len",
	  "rus": "одежда, ткань",
	  "image": "len"
	}, {
	  "eng": "cold, cold, uncooked, raw, cool, freeze",
	  "ita": "freddo, freddo, crudo, freddo, congelare",
	  "toki": "lete",
	  "rus": "холод, холодный, неприготовленный, охладить, заморозить",
	  "image": "lete"
	}, {
	  "eng": "shares subject (except mi and sina) and predicate; also used to introduce a new verb to noun",
	  "ita": "azioni oggetto (tranne km e sina) e il predicato; utilizzato anche per introdurre un nuovo verbo a sostantivo",
	  "toki": "li",
	  "rus": "разделяет подлежащее (кроме mi и sina) и сказуемое; также используется для представления нового глагола для существительного",
	  "image": "li"
	}, {
	  "eng": "small, young, little, small, reduce, reduce",
	  "ita": "piccolo, giovane, piccolo, piccolo, ridurre, ridurre",
	  "toki": "lili",
	  "rus": "маленький, молодой, немного, мало, уменьшать, сокращать",
	  "image": "lili"
	}, {
	  "eng": "long, very thin object, rope, string, hair, chain",
	  "ita": "oggetto lungo e molto sottile, corda, corda, capelli, catena",
	  "toki": "linja",
	  "rus": "длинный, очень тонкий предмет, верёвка, нитка, волос, цепь",
	  "image": "linja"
	}, {
	  "eng": "a flat, flexible object, paper, card, ticket",
	  "ita": "un appartamento, oggetto flessibile, carta, cartoncino, biglietti",
	  "toki": "lipu",
	  "rus": "плоский и гибкий предмет, бумага, карточка, билет",
	  "image": "lipu"
	}, {
	  "eng": "red",
	  "ita": "rosso",
	  "toki": "loje",
	  "rus": "красный",
	  "image": "loje"
	}, {
	  "eng": "be, located, be present, to exist, although, true",
	  "ita": "essere, che si trova, essere presenti, di esistere, anche se",
	  "toki": "lon",
	  "rus": "быть в, располагаться, быть, присутствовать, существовать, правда",
	  "image": "lon"
	}, {
	  "eng": "hand",
	  "ita": "mano",
	  "toki": "luka",
	  "rus": "рука",
	  "image": "luka"
	}, {
	  "eng": "look, see, watch, read, visual, visible, try to",
	  "ita": "guardare, vedere, guardare, leggere, visivo, visibile",
	  "toki": "lukin",
	  "rus": "смотреть, видеть, наблюдать, читать, визуальный, видимый",
	  "image": "lukin"
	}, {
	  "eng": "hole, a hole, window, door, passageway",
	  "ita": "buco, un buco, finestra, porta, passaggio",
	  "toki": "lupa",
	  "rus": "дыра, отверстие, окно, дверь, проход",
	  "image": "lupa"
	}, {
	  "eng": "land, country, space, place",
	  "ita": "terra, paese, spazio, luogo",
	  "toki": "ma",
	  "rus": "земля, страна, пространство, место",
	  "image": "ma"
	}, {
	  "eng": "parent, mother, father, parent, father's, mother's",
	  "ita": "padre, madre, padre, madre, padre, madre di",
	  "toki": "mama",
	  "rus": "родитель, мама, папа, родительский, отцовский, материнский",
	  "image": "mama"
	}, {
	  "eng": "money, material possessions, wealth",
	  "ita": "denaro, beni materiali, la ricchezza",
	  "toki": "mani",
	  "rus": "деньги, материальные блага, богатство",
	  "image": "mani"
	}, {
	  "eng": "woman, girl, wife, girlfriend, female",
	  "ita": "donna, ragazza, moglie, fidanzata, femmina",
	  "toki": "meli",
	  "rus": "женщина, девочка, жена, подружка, женский",
	  "image": "meli"
	}, {
	  "eng": "I, we, my, our",
	  "ita": "Io, noi, il mio, il nostro",
	  "toki": "mi",
	  "rus": "я, мы, мой, наш",
	  "image": "mi"
	}, {
	  "eng": "man, husband, boyfriend, male",
	  "ita": "uomo, marito, fidanzato, maschio",
	  "toki": "mije",
	  "rus": "мужчина, муж, бойфренд, мужской",
	  "image": "mije"
	}, {
	  "eng": "eating, food, eat, drink, swallow, consume",
	  "ita": "mangiare, cibo, mangiare, bere, inghiottire, consumare",
	  "toki": "moku",
	  "rus": "еда, питание, есть, пить, глотать, потреблять",
	  "image": "moku"
	}, {
	  "eng": "death, die, be dead, kill, dead, deadly, fatal",
	  "ita": "morte, morire, essere morto, uccidere, morto, mortale, fatale",
	  "toki": "moli",
	  "rus": "смерть, умереть, быть мёртвым, убить, мёртвый, убийственный, фатальный",
	  "image": "moli"
	}, {
	  "eng": "back, butt, behind",
	  "ita": "indietro, indietro, indietro",
	  "toki": "monsi",
	  "rus": "зад, сзади, задний",
	  "image": "monsi"
	}, {
	  "eng": "wow! meow! mu! (voice of the animal)",
	  "ita": "Wow! Miao! mu! (Voice dell'animale)",
	  "toki": "mu",
	  "rus": "гав! мяу! му! (голос животного)",
	  "image": "mu"
	}, {
	  "eng": "moon, moon",
	  "ita": "luna, luna",
	  "toki": "mun",
	  "rus": "луна, лунный",
	  "image": "mun"
	}, {
	  "eng": "entertainment, game, recreation, art, artful, funny, entertainment, play, have fun, cheer",
	  "ita": "intrattenimento, gioco, ricreazione, arte, astuto, divertente, divertimento, giocare, divertirsi, allegria",
	  "toki": "musi",
	  "rus": "развлечение, игра, отдых, искусство, искусный, смешной, развлекательный, играть, развлекаться, развеселить",
	  "image": "musi"
	}, {
	  "eng": "many, somewhat longer, the number, amount, increase",
	  "ita": "molti, un po 'piu a lungo, il numero, importo, aumento",
	  "toki": "mute",
	  "rus": "много, очень, несколько, больше, число, количество, увеличить",
	  "image": "mute"
	}, {
	  "eng": "number (ordinal)",
	  "ita": "numero (ordinale)",
	  "toki": "nanpa",
	  "rus": "число (порядковое числительное)",
	  "image": "nanpa"
	}, {
	  "eng": "stupid, crazy, drunk, weird, maddening, kink",
	  "ita": "stupido, pazzo, ubriaco, strano, esasperante, kink",
	  "toki": "nasa",
	  "rus": "тупой, сумасшедший, пьяный, странный, сводить с ума, чудить",
	  "image": "nasa"
	}, {
	  "eng": "road, path selection, the doctrine, the method",
	  "ita": "strada, percorso di selezione, la dottrina, il metodo",
	  "toki": "nasin",
	  "rus": "дорога, путь, выбор, доктрина, метод",
	  "image": "nasin"
	}, {
	  "eng": "bump, bulge, nose, hill, mountain, button",
	  "ita": "urto, rigonfiamento, naso, collina,, pulsante montagna",
	  "toki": "nena",
	  "rus": "шишка, выпуклость, нос, холм, гора, кнопка",
	  "image": "nena"
	}, {
	  "eng": "it, this",
	  "ita": "esso, questo",
	  "toki": "ni",
	  "rus": "это,этот",
	  "image": "ni"
	}, {
	  "eng": "word, name",
	  "ita": "parola, un nome",
	  "toki": "nimi",
	  "rus": "слово, имя",
	  "image": "nimi"
	}, {
	  "eng": "foot",
	  "ita": "piede",
	  "toki": "noka",
	  "rus": "нога",
	  "image": "noka"
	}, {
	  "eng": "treatment or imperative, hey! (to attract someone's attention)",
	  "ita": "trattamento o imperativo, hey! (Per attirare l'attenzione di qualcuno)",
	  "toki": "o",
	  "rus": "обращение или повелительное наклонение, эй! (привлечь чьё-то внимание)",
	  "image": "o"
	}, {
	  "eng": "eye",
	  "ita": "occhio",
	  "toki": "oko",
	  "rus": "глаз",
	  "image": "oko"
	}, {
	  "eng": "love, respect",
	  "ita": "amore",
	  "toki": "olin",
	  "rus": "любовь",
	  "image": "olin"
	}, {
	  "eng": "he, she, they, that they, his, her, their",
	  "ita": "lui, lei, loro, che, la, la, la loro",
	  "toki": "ona",
	  "rus": "он, она, оно, это, они, его, её, их",
	  "image": "ona"
	}, {
	  "eng": "open, turn on",
	  "ita": "aperto, turno",
	  "toki": "open",
	  "rus": "открыть, включить",
	  "image": "open"
	}, {
	  "eng": "mistake, accident, mistake, destruction, damage, broken, destroyed, broken, damage, collapse, break down, fall apart, damn!",
	  "ita": "errore, incidente, errore, distruzione, danneggiamento, rotto, distrutto, rotto, danni, collasso, abbattere, cadere a pezzi, accidenti!",
	  "toki": "pakala",
	  "rus": "промах, происшествие, ошибка, разрушение, ущерб, сломанный, разрушить, сломать, повредить, разрушиться, сломаться, развалиться, чёрт!",
	  "image": "pakala"
	}, {
	  "eng": "Activity, activity, work, active, work, do, create, build, operate",
	  "ita": "Attivita, attivita, lavoro, attivita, lavoro, fare, creare, costruire, operare",
	  "toki": "pali",
	  "rus": "активность, деятельность, работа, активный, рабочий, делать, создавать, строить, работать",
	  "image": "pali"
	}, {
	  "eng": "long, hard object, stick, branch",
	  "ita": "lungo, oggetto duro, bastone, ramo",
	  "toki": "palisa",
	  "rus": "длинный, твёрдый объект, палка, ветка",
	  "image": "palisa"
	}, {
	  "eng": "give, put, send, produce, call (anything), transfer, exchange",
	  "ita": "dare, mettere, trasmettere, produrre, chiamata (qualsiasi cosa), il trasferimento, lo scambio",
	  "toki": "pana",
	  "rus": "давать, класть, посылать, выпускать, вызывать (что-либо), передача, обмен",
	  "image": "pana"
	}, {
	  "eng": "of, of (a separator in compound words)",
	  "ita": "di, di (un separatore di parole composte)",
	  "toki": "pi",
	  "rus": "из, of (разделитель в составных словах)",
	  "image": "pi"
	}, {
	  "eng": "feelings, emotions, feel, think about something, to feel, to touch",
	  "ita": "sentimenti, le emozioni, si sentono, pensare a qualcosa, di sentire, di toccare",
	  "toki": "pilin",
	  "rus": "чувства, эмоции, чувствовать, думать о чём-либо, ощущать, трогать",
	  "image": "pilin"
	}, {
	  "eng": "black, dark, darkness, shadow, darken",
	  "ita": "nero, scuro, oscurita, ombra, scurire",
	  "toki": "pimeja",
	  "rus": "чёрный, тёмный, темнота, тень, затемнять",
	  "image": "pimeja"
	}, {
	  "eng": "end, tip over, past, finish, zoom, turn off",
	  "ita": "fine, ribaltarsi, passato, finitura, zoom, spegnere la",
	  "toki": "pini",
	  "rus": "конец, кончик, законченный, прошлый, заканчивать, приближать, выключать",
	  "image": "pini"
	}, {
	  "eng": "insect, beetle, spider",
	  "ita": "insetto, scarabeo, ragno",
	  "toki": "pipi",
	  "rus": "насекомое, жук, паук",
	  "image": "pipi"
	}, {
	  "eng": "side-by-side, edge, hip, almost adjacent",
	  "ita": "side-by-side, bordo, anca, quasi adiacente",
	  "toki": "poka",
	  "rus": "сторона, бок, край, бедро, почти, соседний",
	  "image": "poka"
	}, {
	  "eng": "container, box, cup",
	  "ita": "contenitore, scatola, coppa",
	  "toki": "poki",
	  "rus": "контейнер, коробка, чашка",
	  "image": "poki"
	}, {
	  "eng": "kindness, simplicity, positivity, good, simple, correct, well! thank you! OK! cool! improve, repair",
	  "ita": "la gentilezza, la semplicita, positivita, buona, semplice, corretta, ben! grazie! Ok! cool! migliorare, riparazione",
	  "toki": "pona",
	  "rus": "доброта, простота, позитивность, хороший, простой, правильный, хорошо! спасибо! OK! круто! улучшать, ремонтировать",
	  "image": "pona"
	}, {
	  "eng": "same, similar, equal, as (compared)",
	  "ita": "stesso, simile, uguale, come (rispetto)",
	  "toki": "sama",
	  "rus": "такой же, похожий, равный, как (в сравнении)",
	  "image": "sama"
	}, {
	  "eng": "fire, heat, hot, warm, cooked (about food), heat, cook",
	  "ita": "fuoco, calore, caldo, caldo, cotto (di cibo), il calore, cucinare",
	  "toki": "seli",
	  "rus": "огонь, тепло, горячий, тёплый, приготовленный (о еде), нагревать, готовить",
	  "image": "seli"
	}, {
	  "eng": "surface, outside, leather, shell, form, skin",
	  "ita": "superficie, esterna, in pelle, conchiglia, forma",
	  "toki": "selo",
	  "rus": "поверхность, снаружи, кожа, раковина, форма",
	  "image": "selo"
	}, {
	  "eng": "what?",
	  "ita": "che cosa?",
	  "toki": "seme",
	  "rus": "что?",
	  "image": "seme"
	}, {
	  "eng": "who?",
	  "ita": "chi?",
	  "toki": "jan seme ",
	  "rus": "кто?",
	  "image": "seme"
	}, {
	  "eng": "where?",
	  "ita": "dove?",
	  "toki": "lon seme",
	  "rus": "где?",
	  "image": "seme"
	}, {
	  "eng": "why?",
	  "ita": "perche?",
	  "toki": "tan seme",
	  "rus": "почему?",
	  "image": "seme"
	}, {
	  "eng": "how?",
	  "ita": "Come?",
	  "toki": "kepeken nasin seme?",
	  "rus": "как? каким образом?",
	  "image": "seme"
	}, {
	  "eng": "top, above, on, top, sublime, religious, official, amazing",
	  "ita": "top, sopra, il, alto, sublime, religioso, ufficiale",
	  "toki": "sewi",
	  "rus": "верх, над, на, верхний, возвышенный, религиозный, официальный",
	  "image": "sewi"
	}, {
	  "eng": "body, physical state",
	  "ita": "corpo, stato fisico",
	  "toki": "sijelo",
	  "rus": "тело, физическое состояние",
	  "image": "sijelo"
	}, {
	  "eng": "circle, wheel, ring, ball, ball, round, periodic, circling, cycle",
	  "ita": "cerchio, ruota, anello, palla, palla, rotondo, periodici, girando",
	  "toki": "sike",
	  "rus": "круг, колесо, кольцо, шар, мяч, круглый, периодический, кружить",
	  "image": "sike"
	}, {
	  "eng": "new, fresh, different, yet, update, refresh",
	  "ita": "nuovo, fresco, diverso, eppure, aggiornamento, aggiornamento",
	  "toki": "sin",
	  "rus": "новый, свежий, другой, ещё,  обновить, освежить",
	  "image": "sin"
	}, {
	  "eng": "you, your",
	  "ita": "voi, il vostro",
	  "toki": "sina",
	  "rus": "ты, твой",
	  "image": "sina"
	}, {
	  "eng": "front, chest, torso, face, wall",
	  "ita": "fronte, al torace, torso, viso, parete",
	  "toki": "sinpin",
	  "rus": "перед, грудь, торс, лицо, стена",
	  "image": "sinpin"
	}, {
	  "eng": "image, picture, drawing, writing, represent",
	  "ita": "immagine, ritratto, disegno, scrittura",
	  "toki": "sitelen",
	  "rus": "изображение, картинка, рисовать, писать",
	  "image": "sitelen"
	}, {
	  "eng": "knowledge, wisdom, understanding, know, understand",
	  "ita": "conoscenza, saggezza, comprensione, conoscere, capire",
	  "toki": "sona",
	  "rus": "знание, мудрость, понимание, знать, понимать",
	  "image": "sona"
	}, {
	  "eng": "learn",
	  "ita": "imparare",
	  "toki": "kama sona",
	  "rus": "учиться",
	  "image": "sona"
	}, {
	  "eng": "animal, terrestrial mammal",
	  "ita": "animale, mammifero terrestre",
	  "toki": "soweli",
	  "rus": "животное, наземное млекопитающее",
	  "image": "soweli"
	}, {
	  "eng": "big, tall, long, adult, important, increase, lengthen, size",
	  "ita": "grande, alto, lungo, adulto, importante, crescita, allungare, dimensioni",
	  "toki": "suli",
	  "rus": "большой, высокий, длинный, взрослый, важный, увеличивать, удлиннять, размер",
	  "image": "suli"
	}, {
	  "eng": "sun, light",
	  "ita": "sole, luce",
	  "toki": "suno",
	  "rus": "солнце, свет",
	  "image": "suno"
	}, {
	  "eng": "horizontal surface, furniture, table, chair, column, floor",
	  "ita": "orizzontale di superficie, mobili, tavolo, sedia, colonna, piano",
	  "toki": "supa",
	  "rus": "горизонтальная поверхность, мебель, стол, стул, колонна, этаж",
	  "image": "supa"
	}, {
	  "eng": "candy, sweets, sweet, elegant, sweetening, cute, innocent",
	  "ita": "caramelle, dolci, dolce, elegante, addolcimento",
	  "toki": "suwi",
	  "rus": "конфетка, лакомство, сладкий, изящный, услащать",
	  "image": "suwi"
	}, {
	  "eng": "of, via, thanks, due, subsequently, after, source, the reason",
	  "ita": "di, via, grazie, dovuto, successivamente, dopo, fonte, la ragione",
	  "toki": "tan",
	  "rus": "из, с помощью, благодаря, из-за, впоследствии, после, источник, причина",
	  "image": "tan"
	}, {
	  "eng": "unique, exceptional, but, but",
	  "ita": "unico, eccezionale, ma, ma",
	  "toki": "taso",
	  "rus": "единственный, исключительный, но, однако",
	  "image": "taso"
	}, {
	  "eng": "to, for, towards (indicating purpose), to go, to walk, to travel, to move, to leave, moving, transportation, mobile, mobile, move, move",
	  "ita": "a, per, verso (indicando scopo), di andare, di camminare, di viaggiare, di muoversi, di lasciare, in movimento, trasporto, mobili, mobili, spostare, spostare",
	  "toki": "tawa",
	  "rus": "в, для, по направлению к (указывает на цель действия), до, идти, гулять, путешествовать, двигаться, покидать, передвижение, транспортировка, передвижной, мобильный,  двигать, перемещать",
	  "image": "tawa"
	}, {
	  "eng": "water, liquid, juice, washed",
	  "ita": "acqua, liquido, succo di frutta, lavato",
	  "toki": "telo",
	  "rus": "вода, жидкость, сок, мыть",
	  "image": "telo"
	}, {
	  "eng": "time, period, a time duration, the situation",
	  "ita": "periodo, di tempo, una durata di tempo, la situazione",
	  "toki": "tenpo",
	  "rus": "время, период, момент, длительность, ситуация",
	  "image": "tenpo"
	}, {
	  "eng": "language, speaking, speech, communication, talking, verbal, say, chat, hello! hi!",
	  "ita": "linguaggio, parlare, discorso, comunicazione, parlare, verbale, per esempio, chat, chattare, ciao! Ciao!",
	  "toki": "toki",
	  "rus": "язык, разговор, речь, коммуникация, говорящий, вербальный, сказать, общаться, болтать, привет! здравствуй!",
	  "image": "toki"
	}, {
	  "eng": "room, space, house, room, building, structure, urban, home",
	  "ita": "stanza, spazio, casa, stanza, costruzione, struttura, urbano, casa",
	  "toki": "tomo",
	  "rus": "помещение, пространство, дом, комната, здание, конструкция, городской, домашний",
	  "image": "tomo"
	}, {
	  "eng": "double, two, pair, share, separate, divide",
	  "ita": "doppio, due, coppia, condivisione, separata",
	  "toki": "tu",
	  "rus": "двойной, два, пара, разделять, отделять",
	  "image": "tu"
	}, {
	  "eng": "gender, sexuality, erotic, sex, sex",
	  "ita": "genere, la sessualita, erotismo, sesso, sesso",
	  "toki": "unpa",
	  "rus": "пол, сексуальность, эротический, половой, заниматься сексом",
	  "image": "unpa"
	}, {
	  "eng": "mouth, oral, pronounced aloud, oral",
	  "ita": "bocca, orale, pronunciato ad alta voce, per via orale",
	  "toki": "uta",
	  "rus": "рот, устный, произносимый вслух, оральный",
	  "image": "uta"
	}, {
	  "eng": "conflict, competition, fight, battle, war, attack, dispute, insult, abuse, udart, attack rival",
	  "ita": "conflitto, competizione, lotta, battaglia, guerra, attacco, disputa, insulti, abusi, udart, attacco rivale",
	  "toki": "utala",
	  "rus": "конфликт, соревнование, схватка, бой, война, атака, спор, оскорбление, насилие, ударть, атаковать, соперничать",
	  "image": "utala"
	}, {
	  "eng": "white, light, white thing, white, purity",
	  "ita": "bianco, luce, cosa bianca, bianco, purezza",
	  "toki": "walo",
	  "rus": "белый, светлый, белая вещь, белизна, чистота",
	  "image": "walo"
	}, {
	  "eng": "one, unit, element, of, particle, piece, combine",
	  "ita": "uno, unita, elemento, di, particella, pezzo, combinare",
	  "toki": "wan",
	  "rus": "один, единица, элемент, часть, частица, кусок, объединить",
	  "image": "wan"
	}, {
	  "eng": "bird, animal with wings",
	  "ita": "uccello, animale con le ali",
	  "toki": "waso",
	  "rus": "птица, животное с крыльями",
	  "image": "waso"
	}, {
	  "eng": "force, energy, powerful, intense, confident, strong, energetic, amplify, enhance, excite",
	  "ita": "la forza, l'energia, potente, intenso, fiducioso, forte, energico, amplificare, aumentare, eccita",
	  "toki": "wawa",
	  "rus": "сила, энергия, мощный, интенсивный, уверенный, сильный, энергичный, усиливать, укреплять, возбуждать",
	  "image": "wawa"
	}, {
	  "eng": "far, missing, missing, no, throw it away, clean, free, ignore",
	  "ita": "lontano, manca, manca, no, gettarlo via, pulito, libero",
	  "toki": "weka",
	  "rus": "далекий, отсутствующий, пропавший, отсутствие, выбросить, убрать, освободиться",
	  "image": "weka"
	}, {
	  "eng": "to want, to do in the future, the desire, the need, the will, the necessary",
	  "ita": "a voler fare in futuro, il desiderio, il bisogno, la volonta, la necessaria",
	  "toki": "wile",
	  "rus": "хотеть, желать, сделать в будущем, желание, нужда, воля, необходимый",
	  "image": "wile"
	}, {
	  "eng": "get/receive",
	  "toki": "kama jo"
	}, {
	  "eng": "child",
	  "toki": "jan lili"
	}, {
	  "eng": "soldier, fighter",
	  "toki": "jan utala"
	}, {
	  "eng": "friend",
	  "toki": "jan pona"
	}, {
	  "eng": "alchohol",
	  "toki": "telo nasa"
	}, {
	  "eng": "disabled person",
	  "toki": "jan pakala"
	}, {
	  "eng": "ugly",
	  "toki": "ike lukin"
	}, {
	  "eng": "argue",
	  "toki": "utala toki"
	}, {
	  "eng": "neighbour",
	  "toki": "jan poka"
	}, {
	  "eng": "beach/riverbank",
	  "toki": "poka telo"
	}, {
	  "eng": "dance",
	  "toki": "tawa musi"
	}, {
	  "eng": "nobody",
	  "toki": "jan ala"
	}, {
	  "eng": "everybody",
	  "toki": "jan ale"
	}, {
	  "eng": "pretty",
	  "toki": "pona lukin"
	}, {
	  "eng": "city/village",
	  "toki": "ma tomo"
	}, {
	  "eng": "good day!",
	  "toki": "suno pona!"
	}, {
	  "eng": "good night/sleep well!",
	  "toki": "lape pona!"
	}, {
	  "eng": "bon apetite",
	  "toki": "moku pona!"
	}, {
	  "eng": "goodbye (person leaving)",
	  "toki": "mi tawa!"
	}, {
	  "eng": "goodbye (reply to 1st goodbye)",
	  "toki": "tawa pona!"
	}, {
	  "eng": "welcome!",
	  "toki": "kama pona!"
	}, {
	  "eng": "have fun!",
	  "toki": "musi pona!"
	}, {
	  "eng": "my name is ...",
	  "toki": "nimi mi li ..."
	}, {
	  "eng": "I like it",
	  "toki": "ona li pona tawa mi"
	}, {
	  "eng": "I don't like it",
	  "toki": "ona li ike tawa mi"
	}, {
	  "eng": "where?",
	  "toki": "lon seme?"
	}, {
	  "eng": "who?",
	  "toki": "jan seme?"
	}, {
	  "eng": "where are you from?",
	  "toki": "sina kama tan ma seme?"
	}, {
	  "eng": "why?",
	  "toki": "tan seme?"
	}, {
	  "eng": "bed",
	  "toki": "supa lape"
	}, {
	  "eng": "pub",
	  "toki": "tomo pi telo nasa"
	}, {
	  "eng": "leader/boss",
	  "toki": "jan lawa"
	}, {
	  "eng": "plane",
	  "toki": "tomo tawa kon"
	}, {
	  "eng": "religion",
	  "toki": "nasin sewi"
	}, {
	  "eng": "music",
	  "toki": "kalama musi"
	}, {
	  "eng": "it is hot",
	  "toki": "seli li lon"
	}, {
	  "eng": "it is cold",
	  "toki": "lete li lon"
	}, {
	  "eng": "I'm alone",
	  "toki": "mi taso li lon"
	}, {
	  "eng": "film/TV show",
	  "toki": "sitelen tawa"
	}, {
	  "eng": "map",
	  "toki": "sitelen ma"
	}, {
	  "eng": "poison",
	  "toki": "telo moli"
	}, {
	  "eng": "grass",
	  "toki": "kasi anpa"
	}, {
	  "eng": "garden",
	  "toki": "ma kasi"
	}, {
	  "eng": "fly",
	  "toki": "tawa lon kon"
	}, {
	  "eng": "teeth",
	  "toki": "ijo uta walo"
	}, {
	  "eng": "neck",
	  "toki": "anpa lawa"
	}, {
	  "eng": "gloves",
	  "toki": "len luka"
	}, {
	  "eng": "shoes/trousers",
	  "toki": "len noka"
	}, {
	  "eng": "clothes",
	  "toki": "len sijelo"
	}, {
	  "eng": "boobs",
	  "toki": "nena sike meli"
	}, {
	  "eng": "willy/dick",
	  "toki": "palisa mije"
	}, {
	  "eng": "testicles",
	  "toki": "sike mije"
	}, {
	  "eng": "fanny",
	  "toki": "lupa meli"
	}, {
	  "eng": "ear",
	  "toki": "nena kute"
	}, {
	  "eng": "urine",
	  "toki": "telo jelo"
	}, {
	  "eng": "shit, poo",
	  "toki": "ko jaki"
	}, {
	  "eng": "blood",
	  "toki": "telo sijelo loje"
	}, {
	  "eng": "I am kissing you",
	  "toki": "mi pilin e uta sina kepeken uta mi."
	}, {
	  "eng": "my skin is itching (I have an itch)",
	  "toki": "selo mi li wile e ni: mi pilin e ona"
	}, {
	  "eng": "far from",
	  "toki": "weka tan"
	}, {
	  "eng": "not far from",
	  "toki": "weka ala tan"
	}, {
	  "eng": "often/a lot",
	  "toki": "tenpo mute"
	}, {
	  "eng": "how many times?",
	  "toki": "tenpo pi mute seme?"
	}, {
	  "eng": "How old are you?",
	  "toki": "tenpo pi mute seme la sina sike e suno?"
	}, {
	  "eng": "I'm old",
	  "toki": "tenpo mute mute la mi sike e suno"
	}, {
	  "eng": "school",
	  "toki": "tomo sona"
	}, {
	  "eng": "always",
	  "toki": "tenpo ale"
	}, {
	  "eng": "what's new?",
	  "toki": "seme li sin?"
	}, {
	  "eng": "sport (contact)",
	  "toki": "musi utala"
	}, {
	  "eng": "scientist/ knowledgeable/educated person",
	  "toki": "jan sona"
	}, {
	  "eng": "train",
	  "toki": "tomo tawa pi linja"
	}, {
	  "eng": "arrive/stop",
	  "toki": "pini e tawa"
	}, {
	  "eng": "waterfall",
	  "toki": "telo anpa lon kiwen suli"
	}, {
	  "eng": "war",
	  "toki": "utala suli"
	}, {
	  "eng": "I don't mind/it doesn't matter",
	  "toki": "ni li lili tawa mi"
	}, {
	  "eng": "Do you mind/care?",
	  "toki": "ni li lili li suli tawa sina?"
	}, {
	  "eng": "hotel",
	  "toki": "tomo pi jan awen"
	}, {
	  "eng": "curious",
	  "toki": "wile sona"
	}, {
	  "eng": "tree",
	  "toki": "kasi kiwen"
	}, {
	  "eng": "translate",
	  "toki": "toki ante"
	}, {
	  "eng": "take a photo",
	  "toki": "pali e sitelen"
	}, {
	  "eng": "bank",
	  "toki": "tomo mani"
	}, {
	  "eng": "buy/pay for ...",
	  "toki": "pana e mani tawa"
	}, {
	  "eng": "computer",
	  "toki": "ilo sona"
	}, {
	  "eng": "keep doing it/continue",
	  "toki": "awen pali e ona"
	}, {
	  "eng": "family",
	  "toki": "kulupu mama"
	}, {
	  "eng": "frozen",
	  "toki": "lete kiwen"
	}, {
	  "eng": "government",
	  "toki": "kulupu lawa"
	}, {
	  "eng": "milk",
	  "toki": "telo walo"
	}, {
	  "eng": "pet",
	  "toki": "soweli tomo"
	}, {
	  "eng": "it's raining",
	  "toki": "telo li kama"
	}, {
	  "eng": "sky",
	  "toki": "sewi kon"
	}, {
	  "eng": "stranger",
	  "toki": "jan sin"
	}, {
	  "eng": "telephone",
	  "toki": "ilo toki"
	}, {
	  "eng": "toilet",
	  "toki": "tomo telo"
	}, {
	  "eng": "improve/get better",
	  "toki": "kama pona"
	}, {
	  "eng": "How are you (feeling)?",
	  "toki": "sina pilin seme?"
	}, {
	  "eng": "I love you",
	  "toki": "mi olin e sina"
	}, {
	  "eng": "Where's the toilet?",
	  "toki": "tomo telo li lon seme?"
	}, {
	  "eng": "messenger",
	  "toki": "jan toki"
	}, {
	  "eng": "swamp/muddy area",
	  "toki": "ma telo"
	}, {
	  "eng": "otherwise/on the other hand",
	  "toki": "ante la"
	}, {
	  "eng": "unfortunately",
	  "toki": "ike la"
	}, {
	  "eng": "later",
	  "toki": "kama la"
	}, {
	  "eng": "maybe",
	  "toki": "ken la"
	}, {
	  "eng": "mainly",
	  "toki": "lawa la"
	}, {
	  "eng": "apparently/clearly",
	  "toki": "lukin la"
	}, {
	  "eng": "one of these days/some time",
	  "toki": "tenpo ijo kama la"
	}, {
	  "eng": "as for me/as far as I'm concerned",
	  "toki": "mi la"
	}, {
	  "eng": "if possible",
	  "toki": "ni li ken la"
	}, {
	  "eng": "firstly/to begin with/to kick off",
	  "toki": "open la"
	}, {
	  "eng": "for example",
	  "toki": "pana lukin la"
	}, {
	  "eng": "besides/anyway",
	  "toki": "poka la"
	}, {
	  "eng": "by the way",
	  "toki": "poka ni la"
	}, {
	  "eng": "fortunately",
	  "toki": "pona la"
	}, {
	  "eng": "similarly/likewise",
	  "toki": "sama la"
	}, {
	  "eng": "sometimes",
	  "toki": "tenpo pi mute lili la"
	}, {
	  "eng": "to start afresh",
	  "toki": "sin la"
	}, {
	  "eng": "suddenly/unexpectedly",
	  "toki": "sona kama ala la"
	}, {
	  "eng": "that's why/therefore",
	  "toki": "tan ni la"
	}, {
	  "eng": "once upon a time",
	  "toki": "tenpo ijo la"
	}, {
	  "eng": "at first/firstly",
	  "toki": "tenpo wan la"
	}, {
	  "eng": "Is he a parent?",
	  "toki": "ona li mama ala mama?"
	}, {
	  "eng": "Does she have many vegetables?",
	  "toki": "ona li jo ala jo e kili mute?"
	}, {
	  "eng": "Is the wise man eating a fish?",
	  "toki": "mije sona li moku e kala anu seme?"
	}, {
	  "eng": "What are you doing to her?",
	  "toki": "sina seme e ona?"
	}, {
	  "eng": "Do you listen to your parents?",
	  "toki": "sina kute ala kute e mama sina?"
	}, {
	  "eng": "What do sharks eat?",
	  "toki": "kala wawa li moku e seme?"
	}, {
	  "eng": "What tools do you have?",
	  "toki": "sina jo e ilo seme?"
	}, {
	  "eng": "Does the united community use the official Toki Pona book?",
	  "toki": "kulupu wan li pu ala pu?"
	}, {
	  "eng": "Does a fish drink water?",
	  "toki": "kala li moku ala moku e telo?"
	}, {
	  "eng": "Is the spoon small?",
	  "toki": "ilo moku li lili anu seme?"
	}, {
	  "eng": "Can I hear a man or a woman?",
	  "toki": "Mi kute e mije anu meli?"
	}, {
	  "eng": "What did he use?",
	  "toki": "ona li kepeken e seme?"
	}, {
	  "eng": "Is the new guy in the toilet?",
	  "toki": "mije sin li lon tomo telo anu seme?"
	}, {
	  "eng": "Do you know English?",
	  "toki": "sina sona ala sona e toki Inli?"
	}, {
	  "eng": "Are you from Germany?",
	  "toki": "sina tan ala tan ma Tosi?"
	}, {
	  "eng": "What's your name?",
	  "toki": "nimi sina li seme?"
	}, {
	  "eng": "What's the second thing?",
	  "toki": "ijo nanpa tu li seme?"
	}, {
	  "eng": "When are your parents coming?",
	  "toki": "tenpo seme la mama sina li kama?"
	}, {
	  "eng": "What did you put the red watch next to?",
	  "toki": "sina pana e ilo tenpo loje poka seme?"
	}, {
	  "eng": "Is this her dog?",
	  "toki": "ni li soweli ona anu seme?"
	}, {
	  "eng": "Why are you sad?",
	  "toki": "sina pilin ike tan seme?"
	}, {
	  "eng": "Can you come?",
	  "toki": "sina ken ala ken kama?"
	}, {
	  "eng": "Why did the black bear eat the child?",
	  "toki": "tan seme la soweli wawa pimeja li moku e jan lili?"
	}, {
	  "eng": "When is Mario coming?",
	  "toki": "jan Mawijo li kama lon tenpo seme?"
	}, {
	  "eng": "Who are you?",
	  "toki": "sina jan seme?"
	}, {
	  "eng": "Where is he?",
	  "toki": "ona li lon seme?"
	}, {
	  "eng": "How did you do it?",
	  "toki": "sina pali e ni kepeken nasin seme?"
	}, {
	  "eng": "How many times have you been there?",
	  "toki": "tenpo pi mute seme la sina lon ni?"
	}, {
	  "eng": "stupid person",
	  "toki": "jan pi sona lili"
	}, {
	  "eng": "The healthy little girl is watering the plants",
	  "toki": "meli lili pi sijelo pona li telo e kasi"
	}, {
	  "eng": "The happy man made a watch",
	  "toki": "mije pi pilin pona li pali e ilo tenpo"
	}, {
	  "eng": "I've been waiting for a long time",
	  "toki": "mi awen lon tenpo suli"
	}, {
	  "eng": "Toki pona scholars use the official Toki Pona book often",
	  "toki": "jan sona pi toki pona li pu lon tenpo mute"
	}, {
	  "eng": "Groups of Scientists are making life better",
	  "toki": "kulupu pi jan sona li pona e ale"
	}, {
	  "eng": "A strong person is waiting",
	  "toki": "jan pi sijelo wawa li awen"
	}, {
	  "eng": "The baby is inside the mother's womb",
	  "toki": "jan lili li lon insa pi mama meli"
	}, {
	  "eng": "Many green sea creatures are at the bottom of the sea",
	  "toki": "kala laso mute li lon anpa pi telo suli"
	}, {
	  "eng": "The warrior's new house is good",
	  "toki": "tomo sin pi jan utala li pona"
	}, {
	  "eng": "He is coming tonight",
	  "toki": "tenpo pimeja ni la ona li kama"
	}, {
	  "eng": "When I'm good to people, people are good to me",
	  "toki": "mi pona tawa jan, la jan li pona tawa mi"
	}, {
	  "eng": "If you come to my house, I'll serve food",
	  "toki": "sina kama lon tomo mi, la mi pana e moku"
	}, {
	  "eng": "When the sun is red, the time is right",
	  "toki": "suno li loje, la tenpo pona li lon"
	}, {
	  "eng": "If god wills it, I will do it tomorrow",
	  "toki": "sewi li wile, la mi pali e ona lon tenpo suno kama"
	}, {
	  "eng": "If your body is blue, it is a bad sign",
	  "toki": "sijelo sina li laso, la ni li ike"
	}, {
	  "eng": "During bad times, a person needs to talk to friends",
	  "toki": "tenpo ike la jan li wile toki tawa jan pona"
	}, {
	  "eng": "We're stronger as a group",
	  "toki": "kulupu la mi wawa"
	}, {
	  "eng": "When I use the Toki Pona book, I feel good",
	  "toki": "mi pu, la mi pilin pona"
	}, {
	  "eng": "If I don't have any animals, I eat vegetables",
	  "toki": "mi jo ala e soweli, la mi moku e kili"
	}, {
	  "eng": "In this school, children have to use Toki Pona",
	  "toki": "tomo sona ni la jan lili li wile kepeken e toki pona"
	}, {
	  "eng": "On the first day he only saw 1 blue bird",
	  "toki": "tenpo suno nanpa wan la ona li lukin e waso laso taso"
	}, {
	  "eng": "On the second day he heard a loud animal noise",
	  "toki": "tenpo suno nanpa tu la ona li kute e mu wawa"
	}, {
	  "eng": "Now he arrives at the door carrying 2 animals",
	  "toki": "tenpo ni la ona li kama lon lupa li jo e soweli tu"
	}, {
	  "eng": "the box is small and cold",
	  "toki": "poki li lili li lete"
	}, {
	  "eng": "But men and women are working and are feeling happy",
	  "toki": "taso mije en meli li pali li pilin pona"
	}, {
	  "eng": "My sister opened the first and the second door",
	  "toki": "meli sama mi li open e lupa nanpa wan e lupa nanpa tu"
	}, {
	  "eng": "He wants to go hunting and gets a bow and an orange vest",
	  "toki": "ona li wile alasa li kama jo e ilo alasa e len loje"
	}, {
	  "eng": "The little girl tidied the house and washed the clothes",
	  "toki": "jan meli lili li pona e tomo li telo e len"
	}, {
	  "eng": "She is happy and kisses her husband",
	  "toki": "ona li pilin pona li uta e mije ona"
	}, {
	  "eng": "He cooks the rabbit and some rice",
	  "toki": "ona li seli e soweli e pan"
	}, {
	  "eng": "I give a fish to her at home",
	  "toki": "mi pana e kala tawa ona lon tomo"
	}, {
	  "eng": "I'm moving towards you",
	  "toki": "mi tawa sina"
	}, {
	  "eng": "My parents are going to the sea",
	  "toki": "mama mi li tawa telo suli"
	}, {
	  "eng": "I work a lot because of this",
	  "toki": "mi pali mute tan ni"
	}, {
	  "eng": "I speak in Toki Pona",
	  "toki": "mi toki lon toki pona"
	}, {
	  "eng": "I know a lot of languages because of this woman",
	  "toki": "mi sona e toki mute tan meli ni"
	}, {
	  "eng": "He's giving away things from his house",
	  "toki": "ona li pana e ijo tan tomo ona"
	}, {
	  "eng": "You work using hot tools",
	  "toki": "sina pali kepeken ilo seli"
	}, {
	  "eng": "I'm here",
	  "toki": "mi lon"
	}, {
	  "eng": "I am next to the shop",
	  "toki": "mi lon poka esun"
	}, {
	  "eng": "The foundations of the building are strong",
	  "toki": "noka tomo li wawa"
	}, {
	  "eng": "The insect is inside the tree",
	  "toki": "pipi li lon insa pi kasi kiwen"
	}, {
	  "eng": "A large machine is moving in the sky",
	  "toki": "ilo suli li tawa lon sewi"
	}, {
	  "eng": "The toys are at the bottom of the red box",
	  "toki": "ijo musi li lon noka pi poki loje"
	}, {
	  "eng": "Water comes from the sky",
	  "toki": "telo li kama tan sewi"
	}, {
	  "eng": "The document is under the cat",
	  "toki": "lipu li lon noka soweli"
	}, {
	  "eng": "The vegetable is next to the spider",
	  "toki": "kili li lon poka pipi"
	}, {
	  "eng": "I can see a black woman in front of the building",
	  "toki": "mi lukin e meli pimeja lon sinpin tomo"
	}, {
	  "eng": "The rabid dog is behind you",
	  "toki": "soweli nasa li lon monsi sina"
	}, {
	  "eng": "Don't speak! Take action!",
	  "toki": "o toki ala! o pali!"
	}, {
	  "eng": "Neighbour! Why are you sad?",
	  "toki": "jan poka o. sina pilin ike tan seme?"
	}, {
	  "eng": "Don't eat my turnip!",
	  "toki": "o moku ala e kili mi"
	}, {
	  "eng": "God! Give goodness to me!",
	  "toki": "sewi o pana e pona tawa mi"
	}, {
	  "eng": "Obey your parents!",
	  "toki": "o kute e mama sina"
	}, {
	  "eng": "You're so tall!",
	  "toki": "sina suli a!"
	}, {
	  "eng": "I should eat good things",
	  "toki": "mi o moku e ijo pona"
	}, {
	  "eng": "Ha, ha, ha!",
	  "toki": "a a a!"
	}, {
	  "eng": "Do it now!",
	  "toki": "o pali e ona lon tenpo ni"
	}, {
	  "eng": "Go to your room!",
	  "toki": "o tawa tomo sina"
	}, {
	  "eng": "Canada has so many fish!",
	  "toki": "ma Kanata li jo e kala mute a!"
	}, {
	  "eng": "Wow! You're very strong!",
	  "toki": "a! sina wawa mute"
	}, {
	  "eng": "Be strong bro!",
	  "toki": "jan sama o wawa"
	}, {
	  "eng": "Don't use bad tools!",
	  "toki": "o kepeken ala e ilo ike"
	}, {
	  "eng": "The woman's health improved. Yay!",
	  "toki": "sijelo meli li kama pona a!"
	}, {
	  "eng": "omit needless words",
	  "toki": "o weka e nimi ike"
	}, {
	  "eng": "A person who only knows one language does not truly know that language",
	  "toki": "sina sona e toki wan taso, la sina sona ala e toki ni"
	}, {
	  "eng": "Happiness is when what you think, what you say and what you do are in harmony",
	  "toki": "toki sina en pali sina li sama, la sina pilin pona"
	}, {
	  "eng": "Be the change you want to see in the world",
	  "toki": "sina wile ante e ale, la o ante e sina"
	}, {
	  "eng": "The most fundamental question we can ever ask ourselves is whether or not the universe we live in is friendly or hostile",
	  "toki": "wile sona nanpa wan li ni: ale li pona anu ike?"
	}, {
	  "eng": "The wisdom of life consists in the elimination of non-essentials",
	  "toki": "sona pona li ni: o weka e ike"
	}, {
	  "eng": "Simplicity is the ultimate sophistication",
	  "toki": "nasin pona li pona nanpa wan"
	}, {
	  "eng": "If you can't explain something simply, you don't understand it well",
	  "toki": "sina ken ala toki e ijo lon toki pona, la sina sona pona ala e ona"
	}, {
	  "eng": "everything has a time",
	  "toki": "ale li jo e tenpo"
	}, {
	  "eng": "life is great",
	  "toki": "ale li pona"
	}, {
	  "eng": "times change",
	  "toki": "ante li kama"
	}, {
	  "eng": "shit happens",
	  "toki": "ike li kama"
	}, {
	  "eng": "A genius thinks unconventionally",
	  "toki": "jan sona li jan nasa"
	}, {
	  "eng": "People are more important than money",
	  "toki": "jan li suli mute. mani li suli lili"
	}, {
	  "eng": "When I improve all areas of my life, I improve myself",
	  "toki": "mi pona e ale mi, la mi pona e mi"
	}, {
	  "eng": "Love thy neighbour",
	  "toki": "o olin e jan poka"
	}, {
	  "eng": "All roads lead to Rome",
	  "toki": "nasin pona li mute"
	}, {
	  "eng": "Know thyself",
	  "toki": "o sona e sina"
	}, {
	  "eng": "One learns by experience",
	  "toki": "pali li pana e sona"
	}, {
	  "eng": "What goes around comes around",
	  "toki": "sina pana e ike, la sina kama jo e ike"
	}, {
	  "eng": "Mind over matter",
	  "toki": "pilin pona li pana e sijelo pona"
	}, {
	  "eng": "Energy is within",
	  "toki": "wawa li lon insa"
	}, {
	  "eng": "Temporary isolation is good for guidance",
	  "toki": "weka lili li pona tawa lawa"
	}, {
	  "eng": "Children don't know evil",
	  "toki": "jan lili li sona ala e ike"
	}, {
	  "eng": "Curiosity multiplies wisdom",
	  "toki": "wile sona li mute e sona"
	}, {
	  "eng": "Women will make men crazy",
	  "toki": "meli li nasa e mije"
	}, {
	  "eng": "When I erase others' faults, I cleanse myself of negativity",
	  "toki": "mi weka e ike jan, la mi weka e ike mi"
	}, {
	  "eng": "Water is essential",
	  "toki": "telo li pona"
	}, {
	  "eng": "Sleep is essential",
	  "toki": "lape li pona"
	}, {
	  "eng": "Different strokes for different folks",
	  "toki": "nasin ante li pona tawa jan ante"
	}, {
	  "eng": "Love the Earth",
	  "toki": "o pana e pona tawa ma"
	}, {
	  "eng": "Violence never solves anything",
	  "toki": "utala li ike"
	}, {
	  "eng": "A man of knowledge listens",
	  "toki": "jan sona li kute"
	}, {
	  "eng": "hello!",
	  "toki": "toki!"
	}, {
	  "eng": "thanks!",
	  "toki": "pona!"
	}, {
	  "eng": "Oh no!",
	  "toki": "ike a!"
	}, {
	  "eng": "life",
	  "toki": "ale"
	}, {
	  "eng": "deal",
	  "toki": "esun"
	}, {
	  "eng": "Oy! Hey!",
	  "toki": "o!"
	}, {
	  "eng": "Food makes me bigger",
	  "toki": "moku li suli e mi"
	}, {
	  "eng": "to cut",
	  "toki": "kipisi"
	}];

/***/ }
/******/ ]);