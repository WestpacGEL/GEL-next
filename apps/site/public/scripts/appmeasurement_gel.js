/*

 Adobe Visitor API for JavaScript version: 4.4.0
 Copyright 2019 Adobe, Inc. All Rights Reserved
 More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
*/
var e = (function () {
    function b(q) {
      return (b =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (v) {
              return typeof v;
            }
          : function (v) {
              return v && 'function' == typeof Symbol && v.constructor === Symbol && v !== Symbol.prototype
                ? 'symbol'
                : typeof v;
            })(q);
    }
    function a(q, v, w) {
      return (
        v in q ? Object.defineProperty(q, v, { value: w, enumerable: !0, configurable: !0, writable: !0 }) : (q[v] = w),
        q
      );
    }
    function g(q, v, w) {
      q = null == q ? void 0 : q[v];
      return void 0 === q ? w : q;
    }
    function k(q, v) {
      if (q === v) return 0;
      q = q.toString().split('.');
      v = v.toString().split('.');
      a: {
        var w = q.concat(v);
        for (var p = /^\d+$/, z = 0, J = w.length; z < J; z++)
          if (!p.test(w[z])) {
            w = !1;
            break a;
          }
        w = !0;
      }
      if (w) {
        for (; q.length < v.length; ) q.push('0');
        for (; v.length < q.length; ) v.push('0');
        a: {
          for (w = 0; w < q.length; w++) {
            p = parseInt(q[w], 10);
            z = parseInt(v[w], 10);
            if (p > z) {
              q = 1;
              break a;
            }
            if (z > p) {
              q = -1;
              break a;
            }
          }
          q = 0;
        }
      } else q = NaN;
      return q;
    }
    function n() {
      var q = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
        v = q.cookieName,
        w = (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}).cookies;
      return q.isEnabled && v && w
        ? {
            remove: function () {
              w.remove(v);
            },
            get: function () {
              var p = w.get(v),
                z = {};
              try {
                z = JSON.parse(p);
              } catch (J) {
                z = {};
              }
              return z;
            },
            set: function (p, z) {
              z = z || {};
              w.set(v, JSON.stringify(p), {
                domain: z.optInCookieDomain || '',
                cookieLifetime: z.optInStorageExpiry || 3419e4,
                expires: !0,
              });
            },
          }
        : { get: ia, set: ia, remove: ia };
    }
    function D(q) {
      this.name = this.constructor.name;
      this.message = q;
      'function' == typeof Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = Error(q).stack);
    }
    function B() {
      function q(ja, ea) {
        ja = V(ja);
        return ja.length
          ? ja.every(function (ta) {
              return !!ea[ta];
            })
          : Z(ea);
      }
      function v() {
        va = Va;
        Sa = Ma.COMPLETE;
        ca(X.status, X.permissions);
        ba.set(X.permissions, { optInCookieDomain: Q, optInStorageExpiry: O });
        ra.execute(eb);
      }
      function w(ja) {
        return function (ea, ta) {
          if (!na(ea)) throw Error('[OptIn] Invalid category(-ies). Please use the `OptIn.Categories` enum.');
          return (Sa = Ma.CHANGED), Object.assign(Va, pa(V(ea), ja)), ta || v(), X;
        };
      }
      var p = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
        z = p.doesOptInApply,
        J = p.preOptInApprovals,
        M = p.isOptInStorageEnabled,
        Q = p.optInCookieDomain,
        O = p.optInStorageExpiry,
        L = p.isIabContext,
        f = (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}).cookies;
      p = Wa(p.previousPermissions);
      Ea(p) || P.error(''.concat('Invalid `previousPermissions`!'));
      Ea(J) || P.error(''.concat('Invalid `preOptInApprovals`!'));
      var ba = n({ isEnabled: !!M, cookieName: 'adobeujs-optin' }, { cookies: f }),
        X = this,
        ca = Fa(X),
        ra = t();
      M = Ta(p);
      var ua = Ta(J);
      f = ba.get();
      var xa = {},
        Sa = (function (ja, ea) {
          return Ea(ja) || (ea && Ea(ea)) ? Ma.COMPLETE : Ma.PENDING;
        })(M, f),
        va = (function (ja, ea, ta) {
          var Na = pa(Ha, !z);
          return z ? Object.assign({}, Na, ja, ea, ta) : Na;
        })(ua, M, f),
        Va = JSON.parse(JSON.stringify(va));
      X.deny = w(!1);
      X.approve = w(!0);
      X.denyAll = X.deny.bind(X, Ha);
      X.approveAll = X.approve.bind(X, Ha);
      X.isApproved = function (ja) {
        return q(ja, X.permissions);
      };
      X.isPreApproved = function (ja) {
        return q(ja, ua);
      };
      X.fetchPermissions = function (ja) {
        var ea = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
          ta = ea ? X.on(Ma.COMPLETE, ja) : ia;
        return (
          !z || (z && X.isComplete) || J
            ? ja(X.permissions)
            : ea ||
              ra.add(eb, function () {
                return ja(X.permissions);
              }),
          ta
        );
      };
      X.complete = function () {
        X.status === Ma.CHANGED && v();
      };
      X.registerPlugin = function (ja) {
        if (!ja || !ja.name || 'function' != typeof ja.onRegister) throw Error(gb);
        xa[ja.name] || ((xa[ja.name] = ja), ja.onRegister.call(ja, X));
      };
      X.execute = bb(xa);
      Object.defineProperties(X, {
        permissions: {
          get: function () {
            return va;
          },
        },
        status: {
          get: function () {
            return Sa;
          },
        },
        Categories: {
          get: function () {
            return za;
          },
        },
        doesOptInApply: {
          get: function () {
            return !!z;
          },
        },
        isPending: {
          get: function () {
            return X.status === Ma.PENDING;
          },
        },
        isComplete: {
          get: function () {
            return X.status === Ma.COMPLETE;
          },
        },
        __plugins: {
          get: function () {
            return Object.keys(xa);
          },
        },
        isIabContext: {
          get: function () {
            return L;
          },
        },
      });
    }
    function E(q, v) {
      if (void 0 === v) return q;
      var w = setTimeout(function () {
        w = null;
        q.call(q, new D('The call took longer than you wanted!'));
      }, v);
      return function () {
        w && (clearTimeout(w), q.apply(q, arguments));
      };
    }
    function K() {
      if (window.__cmp) return window.__cmp;
      var q = window;
      if (q === window.top) return void P.error('__cmp not found');
      for (var v; !v; ) {
        q = q.parent;
        try {
          q.frames.__cmpLocator && (v = q);
        } catch (p) {}
        if (q === window.top) break;
      }
      if (!v) return void P.error('__cmp not found');
      var w = {};
      return (
        (window.__cmp = function (p, z, J) {
          var M = Math.random() + '';
          p = { __cmpCall: { command: p, parameter: z, callId: M } };
          w[M] = J;
          v.postMessage(p, '*');
        }),
        window.addEventListener(
          'message',
          function (p) {
            var z = p.data;
            if ('string' == typeof z)
              try {
                z = JSON.parse(p.data);
              } catch (J) {}
            z.__cmpReturn &&
              ((p = z.__cmpReturn), w[p.callId] && (w[p.callId](p.returnValue, p.success), delete w[p.callId]));
          },
          !1,
        ),
        window.__cmp
      );
    }
    var c =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
          ? window
          : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
              ? self
              : {};
    Object.assign =
      Object.assign ||
      function (q) {
        for (var v, w, p = 1; p < arguments.length; ++p)
          for (v in ((w = arguments[p]), w)) Object.prototype.hasOwnProperty.call(w, v) && (q[v] = w[v]);
        return q;
      };
    var h,
      m,
      r = { HANDSHAKE: 'HANDSHAKE', GETSTATE: 'GETSTATE', PARENTSTATE: 'PARENTSTATE' },
      u = {
        MCMID: 'getMarketingCloudVisitorID',
        MCAID: 'getAnalyticsVisitorID',
        MCAAMB: 'getAudienceManagerBlob',
        MCAAMLH: 'getAudienceManagerLocationHint',
        MCOPTOUT: 'isOptedOut',
        ALLFIELDS: 'getVisitorValues',
      },
      H = { MCMID: 'MCMID', MCOPTOUT: 'MCOPTOUT', MCAID: 'MCAID', MCAAMLH: 'MCAAMLH', MCAAMB: 'MCAAMB' },
      A = { UNKNOWN: 0, AUTHENTICATED: 1, LOGGED_OUT: 2 },
      G = { GLOBAL: 'global' },
      N = function (q) {
        function v() {}
        function w(p, z) {
          var J = this;
          return function () {
            var M = q(0, p),
              Q = {};
            return (Q[p] = M), J.setStateAndPublish(Q), z(M), M;
          };
        }
        this.getMarketingCloudVisitorID = function (p) {
          p = p || v;
          var z = this.findField('MCMID', p);
          p = w.call(this, 'MCMID', p);
          return void 0 !== z ? z : p();
        };
        this.getVisitorValues = function (p) {
          this.getMarketingCloudVisitorID(function (z) {
            p({ MCMID: z });
          });
        };
      },
      S = { CUSTOMERIDS: 'getCustomerIDs' },
      W = function () {
        function q() {}
        function v(w, p) {
          var z = this;
          return function () {
            return z.callbackRegistry.add(w, p), z.messageParent(r.GETSTATE), '';
          };
        }
        Object.keys(u).forEach(function (w) {
          this[u[w]] = function (p) {
            p = p || q;
            var z = this.findField(w, p);
            p = v.call(this, w, p);
            return void 0 !== z ? z : p();
          };
        }, this);
        Object.keys(S).forEach(function (w) {
          this[S[w]] = function () {
            return this.findField(w, q) || {};
          };
        }, this);
      },
      da = function () {
        Object.keys(u).forEach(function (q) {
          this[u[q]] = function (v) {
            this.callbackRegistry.add(q, v);
          };
        }, this);
      },
      aa = (function (q, v) {
        return (v = { exports: {} }), q(v, v.exports), v.exports;
      })(function (q, v) {
        v.isObjectEmpty = function (w) {
          return w === Object(w) && 0 === Object.keys(w).length;
        };
        v.isValueEmpty = function (w) {
          return '' === w || v.isObjectEmpty(w);
        };
        v.getIeVersion = function () {
          if (document.documentMode) return document.documentMode;
          for (var w = 7; 4 < w; w--) {
            var p = document.createElement('div');
            if (
              ((p.innerHTML = '\x3c!--[if IE ' + w + ']><span></span><![endif]--\x3e'),
              p.getElementsByTagName('span').length)
            )
              return w;
          }
          return null;
        };
        v.encodeAndBuildRequest = function (w, p) {
          return w.map(encodeURIComponent).join(p);
        };
        v.isObject = function (w) {
          return null !== w && 'object' === b(w) && !1 === Array.isArray(w);
        };
        v.defineGlobalNamespace = function () {
          return (window.adobe = v.isObject(window.adobe) ? window.adobe : {}), window.adobe;
        };
        v.pluck = function (w, p) {
          return p.reduce(function (z, J) {
            return w[J] && (z[J] = w[J]), z;
          }, Object.create(null));
        };
        v.parseOptOut = function (w, p, z) {
          p || ((p = z), w.d_optout && w.d_optout instanceof Array && (p = w.d_optout.join(',')));
          w = parseInt(w.d_ottl, 10);
          return isNaN(w) && (w = 7200), { optOut: p, d_ottl: w };
        };
        v.normalizeBoolean = function (w) {
          var p = w;
          return 'true' === w ? (p = !0) : 'false' === w && (p = !1), p;
        };
      }),
      Ba =
        (aa.isObjectEmpty,
        aa.isValueEmpty,
        aa.getIeVersion,
        aa.encodeAndBuildRequest,
        aa.isObject,
        aa.defineGlobalNamespace,
        aa.pluck,
        aa.parseOptOut,
        aa.normalizeBoolean,
        function () {
          return {
            callbacks: {},
            add: function (q, v) {
              this.callbacks[q] = this.callbacks[q] || [];
              var w = this.callbacks[q].push(v) - 1,
                p = this;
              return function () {
                p.callbacks[q].splice(w, 1);
              };
            },
            execute: function (q, v) {
              if (this.callbacks[q]) {
                v = void 0 === v ? [] : v;
                v = v instanceof Array ? v : [v];
                try {
                  for (; this.callbacks[q].length; ) {
                    var w = this.callbacks[q].shift();
                    'function' == typeof w ? w.apply(null, v) : w instanceof Array && w[1].apply(w[0], v);
                  }
                  delete this.callbacks[q];
                } catch (p) {}
              }
            },
            executeAll: function (q, v) {
              (v || (q && !aa.isObjectEmpty(q))) &&
                Object.keys(this.callbacks).forEach(function (w) {
                  this.execute(w, void 0 !== q[w] ? q[w] : '');
                }, this);
            },
            hasCallbacks: function () {
              return !!Object.keys(this.callbacks).length;
            },
          };
        }),
      wa = { 0: 'prefix', 1: 'orgID', 2: 'state' },
      Ia = function (q, v) {
        this.parse = function (w) {
          try {
            var p = {};
            return (
              w.data.split('|').forEach(function (z, J) {
                void 0 !== z && (p[wa[J]] = 2 !== J ? z : JSON.parse(z));
              }),
              p
            );
          } catch (z) {}
        };
        this.isInvalid = function (w) {
          var p = this.parse(w);
          if (!p || 2 > Object.keys(p).length) return !0;
          var z = q !== p.orgID;
          w = !v || w.origin !== v;
          p = -1 === Object.keys(r).indexOf(p.prefix);
          return z || w || p;
        };
        this.send = function (w, p, z) {
          p = p + '|' + q;
          z && z === Object(z) && (p += '|' + JSON.stringify(z));
          try {
            w.postMessage(p, v);
          } catch (J) {}
        };
      },
      Ga = function (q, v, w, p) {
        function z(ca) {
          X.isInvalid(ca) || ((ba = !1), (ca = X.parse(ca)), L.setStateAndPublish(ca.state));
        }
        function J(ca) {
          !ba && f && ((ba = !0), X.send(p, ca));
        }
        function M() {
          Object.assign(L, new N(w._generateID));
          L.getMarketingCloudVisitorID();
          L.callbackRegistry.executeAll(L.state, !0);
          c.removeEventListener('message', Q);
        }
        function Q(ca) {
          X.isInvalid(ca) ||
            ((ca = X.parse(ca)),
            (ba = !1),
            c.clearTimeout(L._handshakeTimeout),
            c.removeEventListener('message', Q),
            Object.assign(L, new W(L)),
            c.addEventListener('message', z),
            L.setStateAndPublish(ca.state),
            L.callbackRegistry.hasCallbacks() && J(r.GETSTATE));
        }
        function O() {
          Object.keys(w).forEach(function (ca) {
            0 !== ca.indexOf('_') && 'function' == typeof w[ca] && (L[ca] = function () {});
          });
          L.getSupplementalDataID = w.getSupplementalDataID;
          L.isAllowed = function () {
            return !0;
          };
        }
        var L = this,
          f = v.whitelistParentDomain;
        L.state = { ALLFIELDS: {} };
        L.version = w.version;
        L.marketingCloudOrgID = q;
        L.cookieDomain = w.cookieDomain || '';
        L._instanceType = 'child';
        var ba = !1,
          X = new Ia(q, f);
        L.callbackRegistry = Ba();
        L.init = function () {
          c.s_c_in || ((c.s_c_il = []), (c.s_c_in = 0));
          L._c = 'Visitor';
          L._il = c.s_c_il;
          L._in = c.s_c_in;
          L._il[L._in] = L;
          c.s_c_in++;
          O();
          Object.assign(L, new da(L));
          f && postMessage
            ? (c.addEventListener('message', Q), J(r.HANDSHAKE), (L._handshakeTimeout = setTimeout(M, 250)))
            : M();
        };
        L.findField = function (ca, ra) {
          if (void 0 !== L.state[ca]) return ra(L.state[ca]), L.state[ca];
        };
        L.messageParent = J;
        L.setStateAndPublish = function (ca) {
          Object.assign(L.state, ca);
          Object.assign(L.state.ALLFIELDS, ca);
          L.callbackRegistry.executeAll(L.state);
        };
      },
      Ua = {
        MCMID: 'getMarketingCloudVisitorID',
        MCAAMB: 'getAudienceManagerBlob',
        MCAAMLH: 'getAudienceManagerLocationHint',
        MCOPTOUT: 'isOptedOut',
        MCAID: 'getAnalyticsVisitorID',
        CUSTOMERIDS: 'getCustomerIDs',
        ALLFIELDS: 'getVisitorValues',
      },
      Oa = { MC: 'MCMID', A: 'MCAID', AAM: 'MCAAMB' },
      fa = function (q, v) {
        function w() {
          var O = {};
          return (
            Object.keys(Ua).forEach(function (L) {
              var f = q[Ua[L]]();
              aa.isValueEmpty(f) || (O[L] = f);
            }),
            O
          );
        }
        function p() {
          var O = [];
          return (
            q._loading &&
              Object.keys(q._loading).forEach(function (L) {
                q._loading[L] && O.push(Oa[L]);
              }),
            O.length ? O : null
          );
        }
        function z(O) {
          return function ba(f) {
            if ((f = p())) q[u[f[0]]](ba, !0);
            else O();
          };
        }
        function J(O) {
          Q(O);
          var L = r.HANDSHAKE,
            f = w();
          v.send(O, L, f);
        }
        function M(O) {
          z(function () {
            var L = r.PARENTSTATE,
              f = w();
            v.send(O, L, f);
          })();
        }
        function Q(O) {
          var L = q.setCustomerIDs;
          q.setCustomerIDs = function (f) {
            L.call(q, f);
            v.send(O, r.PARENTSTATE, { CUSTOMERIDS: q.getCustomerIDs() });
          };
        }
        return function (O) {
          v.isInvalid(O) || (v.parse(O).prefix === r.HANDSHAKE ? J : M)(O.source);
        };
      },
      Aa = function (q, v) {
        function w(M) {
          return function (Q) {
            p[M] = Q;
            z++;
            z === J && v(p);
          };
        }
        var p = {},
          z = 0,
          J = Object.keys(q).length;
        Object.keys(q).forEach(function (M) {
          var Q = q[M];
          if (Q.fn) {
            var O = Q.args || [];
            O.unshift(w(M));
            Q.fn.apply(Q.context || null, O);
          }
        });
      },
      qa = {
        get: function (q) {
          q = encodeURIComponent(q);
          var v = (';' + document.cookie).split(' ').join(';'),
            w = v.indexOf(';' + q + '='),
            p = 0 > w ? w : v.indexOf(';', w + 1);
          return 0 > w ? '' : decodeURIComponent(v.substring(w + 2 + q.length, 0 > p ? v.length : p));
        },
        set: function (q, v, w) {
          var p = g(w, 'cookieLifetime'),
            z = g(w, 'expires'),
            J = g(w, 'domain');
          w = g(w, 'secure') ? 'Secure' : '';
          if (z && 'SESSION' !== p && 'NONE' !== p) {
            var M = '' !== v ? parseInt(p || 0, 10) : -60;
            M
              ? ((z = new Date()), z.setTime(z.getTime() + 1e3 * M))
              : 1 === z && ((z = new Date()), (M = z.getYear()), z.setYear(M + 2 + (1900 > M ? 1900 : 0)));
          } else z = 0;
          return q && 'NONE' !== p
            ? ((document.cookie =
                encodeURIComponent(q) +
                '=' +
                encodeURIComponent(v) +
                '; path=/;' +
                (z ? ' expires=' + z.toGMTString() + ';' : '') +
                (J ? ' domain=' + J + ';' : '') +
                w),
              this.get(q) === v)
            : 0;
        },
        remove: function (q, v) {
          v = (v = g(v, 'domain')) ? ' domain=' + v + ';' : '';
          document.cookie = encodeURIComponent(q) + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;' + v;
        },
      },
      ya = function (q) {
        var v;
        !q && c.location && (q = c.location.hostname);
        var w = q.split('.');
        for (q = w.length - 2; 0 <= q; q--)
          if (((v = w.slice(q).join('.')), qa.set('test', 'cookie', { domain: v })))
            return qa.remove('test', { domain: v }), v;
        return '';
      },
      ka = {
        compare: k,
        isLessThan: function (q, v) {
          return 0 > k(q, v);
        },
        areVersionsDifferent: function (q, v) {
          return 0 !== k(q, v);
        },
        isGreaterThan: function (q, v) {
          return 0 < k(q, v);
        },
        isEqual: function (q, v) {
          return 0 === k(q, v);
        },
      },
      ha = !!c.postMessage,
      Ja = {
        postMessage: function (q, v, w) {
          var p = 1;
          v &&
            (ha
              ? w.postMessage(q, v.replace(/([^:]+:\/\/[^\/]+).*/, '$1'))
              : v && (w.location = v.replace(/#.*$/, '') + '#' + +new Date() + p++ + '&' + q));
        },
        receiveMessage: function (q, v) {
          var w;
          try {
            ha &&
              (q &&
                (w = function (p) {
                  if (
                    ('string' == typeof v && p.origin !== v) ||
                    ('[object Function]' === Object.prototype.toString.call(v) && !1 === v(p.origin))
                  )
                    return !1;
                  q(p);
                }),
              c.addEventListener
                ? c[q ? 'addEventListener' : 'removeEventListener']('message', w)
                : c[q ? 'attachEvent' : 'detachEvent']('onmessage', w));
          } catch (p) {}
        },
      },
      Xa = function (q) {
        var v = '0123456789',
          w = '',
          p = '',
          z = 8,
          J = 10,
          M = 10;
        if (1 == q) {
          v += 'ABCDEF';
          for (q = 0; 16 > q; q++) {
            var Q = Math.floor(Math.random() * z);
            w += v.substring(Q, Q + 1);
            Q = Math.floor(Math.random() * z);
            p += v.substring(Q, Q + 1);
            z = 16;
          }
          return w + '-' + p;
        }
        for (q = 0; 19 > q; q++)
          (Q = Math.floor(Math.random() * J)),
            (w += v.substring(Q, Q + 1)),
            0 === q && 9 == Q ? (J = 3) : (1 == q || 2 == q) && 10 != J && 2 > Q ? (J = 10) : 2 < q && (J = 10),
            (Q = Math.floor(Math.random() * M)),
            (p += v.substring(Q, Q + 1)),
            0 === q && 9 == Q ? (M = 3) : (1 == q || 2 == q) && 10 != M && 2 > Q ? (M = 10) : 2 < q && (M = 10);
        return w + p;
      },
      Qa = function (q, v) {
        return {
          corsMetadata: (function () {
            var w = 'none',
              p = !0;
            return (
              'undefined' != typeof XMLHttpRequest &&
                XMLHttpRequest === Object(XMLHttpRequest) &&
                ('withCredentials' in new XMLHttpRequest()
                  ? (w = 'XMLHttpRequest')
                  : 'undefined' != typeof XDomainRequest && XDomainRequest === Object(XDomainRequest) && (p = !1),
                0 < Object.prototype.toString.call(c.HTMLElement).indexOf('Constructor') && (p = !1)),
              { corsType: w, corsCookiesEnabled: p }
            );
          })(),
          getCORSInstance: function () {
            return 'none' === this.corsMetadata.corsType ? null : new c[this.corsMetadata.corsType]();
          },
          fireCORS: function (w, p, z) {
            var J = this;
            p && (w.loadErrorHandler = p);
            try {
              var M = this.getCORSInstance();
              M.open('get', w.corsUrl + '&ts=' + new Date().getTime(), !0);
              'XMLHttpRequest' === this.corsMetadata.corsType &&
                ((M.withCredentials = !0),
                (M.timeout = q.loadTimeout),
                M.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'),
                (M.onreadystatechange = function () {
                  if (4 === this.readyState && 200 === this.status)
                    a: {
                      var Q;
                      try {
                        if ((Q = JSON.parse(this.responseText)) !== Object(Q)) {
                          J.handleCORSError(w, null, 'Response is not JSON');
                          break a;
                        }
                      } catch (ba) {
                        J.handleCORSError(w, ba, 'Error parsing response as JSON');
                        break a;
                      }
                      try {
                        for (var O = w.callback, L = c, f = 0; f < O.length; f++) L = L[O[f]];
                        L(Q);
                      } catch (ba) {
                        J.handleCORSError(w, ba, 'Error forming callback function');
                      }
                    }
                }));
              M.onerror = function (Q) {
                J.handleCORSError(w, Q, 'onerror');
              };
              M.ontimeout = function (Q) {
                J.handleCORSError(w, Q, 'ontimeout');
              };
              M.send();
              q._log.requests.push(w.corsUrl);
            } catch (Q) {
              this.handleCORSError(w, Q, 'try-catch');
            }
          },
          handleCORSError: function (w, p, z) {
            q.CORSErrors.push({ corsData: w, error: p, description: z });
            w.loadErrorHandler && ('ontimeout' === z ? w.loadErrorHandler(!0) : w.loadErrorHandler(!1));
          },
        };
      },
      sa = !!c.postMessage,
      Pa = /^[0-9a-fA-F\-]+$/,
      T = /vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/,
      oa = function (q, v) {
        var w = c.document;
        return {
          THROTTLE_START: 3e4,
          MAX_SYNCS_LENGTH: 649,
          throttleTimerSet: !1,
          id: null,
          onPagePixels: [],
          iframeHost: null,
          getIframeHost: function (p) {
            if ('string' == typeof p) return (p = p.split('/')), p[0] + '//' + p[2];
          },
          subdomain: null,
          url: null,
          getUrl: function () {
            var p,
              z = 'http://fast.',
              J = '?d_nsid=' + q.idSyncContainerID + '#' + encodeURIComponent(w.location.origin);
            return (
              this.subdomain || (this.subdomain = 'nosubdomainreturned'),
              q.loadSSL && (z = q.idSyncSSLUseAkamai ? 'https://fast.' : 'https://'),
              (p = z + this.subdomain + '.demdex.net/dest5.html' + J),
              (this.iframeHost = this.getIframeHost(p)),
              (this.id = 'destination_publishing_iframe_' + this.subdomain + '_' + q.idSyncContainerID),
              p
            );
          },
          checkDPIframeSrc: function () {
            var p = '?d_nsid=' + q.idSyncContainerID + '#' + encodeURIComponent(w.location.href);
            'string' == typeof q.dpIframeSrc &&
              q.dpIframeSrc.length &&
              ((this.id =
                'destination_publishing_iframe_' +
                (q._subdomain || this.subdomain || new Date().getTime()) +
                '_' +
                q.idSyncContainerID),
              (this.iframeHost = this.getIframeHost(q.dpIframeSrc)),
              (this.url = q.dpIframeSrc + p));
          },
          idCallNotProcesssed: null,
          doAttachIframe: !1,
          startedAttachingIframe: !1,
          iframeHasLoaded: null,
          iframeIdChanged: null,
          newIframeCreated: null,
          originalIframeHasLoadedAlready: null,
          iframeLoadedCallbacks: [],
          regionChanged: !1,
          timesRegionChanged: 0,
          sendingMessages: !1,
          messages: [],
          messagesPosted: [],
          messagesReceived: [],
          messageSendingInterval: sa ? null : 100,
          onPageDestinationsFired: [],
          jsonForComparison: [],
          jsonDuplicates: [],
          jsonWaiting: [],
          jsonProcessed: [],
          canSetThirdPartyCookies: !0,
          receivedThirdPartyCookiesNotification: !1,
          readyToAttachIframePreliminary: function () {
            return !(
              q.idSyncDisableSyncs ||
              q.disableIdSyncs ||
              q.idSyncDisable3rdPartySyncing ||
              q.disableThirdPartyCookies ||
              q.disableThirdPartyCalls
            );
          },
          readyToAttachIframe: function () {
            return (
              this.readyToAttachIframePreliminary() &&
              (this.doAttachIframe || q._doAttachIframe) &&
              ((this.subdomain && 'nosubdomainreturned' !== this.subdomain) || q._subdomain) &&
              this.url &&
              !this.startedAttachingIframe
            );
          },
          attachIframe: function () {
            function p() {
              M = w.createElement('iframe');
              M.sandbox = 'allow-scripts allow-same-origin';
              M.title = 'Adobe ID Syncing iFrame';
              M.id = J.id;
              M.name = J.id + '_name';
              M.style.cssText = 'display: none; width: 0; height: 0;';
              M.src = J.url;
              J.newIframeCreated = !0;
              z();
              w.body.appendChild(M);
            }
            function z(Q) {
              M.addEventListener('load', function () {
                M.className = 'aamIframeLoaded';
                J.iframeHasLoaded = !0;
                J.fireIframeLoadedCallbacks(Q);
                J.requestToProcess();
              });
            }
            this.startedAttachingIframe = !0;
            var J = this,
              M = w.getElementById(this.id);
            M
              ? 'IFRAME' !== M.nodeName
                ? ((this.id += '_2'), (this.iframeIdChanged = !0), p())
                : ((this.newIframeCreated = !1),
                  'aamIframeLoaded' !== M.className
                    ? ((this.originalIframeHasLoadedAlready = !1),
                      z(
                        "The destination publishing iframe already exists from a different library, but hadn't loaded yet.",
                      ))
                    : ((this.originalIframeHasLoadedAlready = !0),
                      (this.iframeHasLoaded = !0),
                      (this.iframe = M),
                      this.fireIframeLoadedCallbacks(
                        'The destination publishing iframe already exists from a different library, and had loaded alresady.',
                      ),
                      this.requestToProcess()))
              : p();
            this.iframe = M;
          },
          fireIframeLoadedCallbacks: function (p) {
            this.iframeLoadedCallbacks.forEach(function (z) {
              'function' == typeof z &&
                z({ message: p || 'The destination publishing iframe was attached and loaded successfully.' });
            });
            this.iframeLoadedCallbacks = [];
          },
          requestToProcess: function (p) {
            function z() {
              M.jsonForComparison.push(p);
              M.jsonWaiting.push(p);
              M.processSyncOnPage(p);
            }
            var J,
              M = this;
            if (p === Object(p) && p.ibs)
              if (((J = JSON.stringify(p.ibs || [])), this.jsonForComparison.length)) {
                var Q,
                  O,
                  L = !1;
                var f = 0;
                for (Q = this.jsonForComparison.length; f < Q; f++)
                  if (((O = this.jsonForComparison[f]), J === JSON.stringify(O.ibs || []))) {
                    L = !0;
                    break;
                  }
                L ? this.jsonDuplicates.push(p) : z();
              } else z();
            (this.receivedThirdPartyCookiesNotification || !sa || this.iframeHasLoaded) &&
              this.jsonWaiting.length &&
              ((J = this.jsonWaiting.shift()), this.process(J), this.requestToProcess());
            q.idSyncDisableSyncs ||
              q.disableIdSyncs ||
              !this.iframeHasLoaded ||
              !this.messages.length ||
              this.sendingMessages ||
              (this.throttleTimerSet ||
                ((this.throttleTimerSet = !0),
                setTimeout(function () {
                  M.messageSendingInterval = sa ? null : 150;
                }, this.THROTTLE_START)),
              (this.sendingMessages = !0),
              this.sendMessages());
          },
          getRegionAndCheckIfChanged: function (p, z) {
            var J = q._getField('MCAAMLH');
            p = p.d_region || p.dcs_region;
            return (
              J
                ? p &&
                  (q._setFieldExpire('MCAAMLH', z),
                  q._setField('MCAAMLH', p),
                  parseInt(J, 10) !== p &&
                    ((this.regionChanged = !0),
                    this.timesRegionChanged++,
                    q._setField('MCSYNCSOP', ''),
                    q._setField('MCSYNCS', ''),
                    (J = p)))
                : (J = p) && (q._setFieldExpire('MCAAMLH', z), q._setField('MCAAMLH', J)),
              (J ||= ''),
              J
            );
          },
          processSyncOnPage: function (p) {
            var z, J;
            if ((z = p.ibs) && z instanceof Array && (J = z.length))
              for (p = 0; p < J; p++) {
                var M = z[p];
                M.syncOnPage && this.checkFirstPartyCookie(M, '', 'syncOnPage');
              }
          },
          process: function (p) {
            var z,
              J,
              M,
              Q = encodeURIComponent,
              O = !1;
            if ((z = p.ibs) && z instanceof Array && (J = z.length))
              for (O = !0, M = 0; M < J; M++) {
                var L = z[M];
                var f = [
                  Q('ibs'),
                  Q(L.id || ''),
                  Q(L.tag || ''),
                  aa.encodeAndBuildRequest(L.url || [], ','),
                  Q(L.ttl || ''),
                  '',
                  '',
                  L.fireURLSync ? 'true' : 'false',
                ];
                L.syncOnPage ||
                  (this.canSetThirdPartyCookies
                    ? this.addMessage(f.join('|'))
                    : L.fireURLSync && this.checkFirstPartyCookie(L, f.join('|')));
              }
            O && this.jsonProcessed.push(p);
          },
          checkFirstPartyCookie: function (p, z, J) {
            var M = (J = 'syncOnPage' === J) ? 'MCSYNCSOP' : 'MCSYNCS';
            q._readVisitor();
            var Q,
              O,
              L = q._getField(M),
              f = !1,
              ba = !1,
              X = Math.ceil(new Date().getTime() / 864e5);
            L
              ? ((Q = L.split('*')),
                (O = this.pruneSyncData(Q, p.id, X)),
                (f = O.dataPresent),
                (ba = O.dataValid),
                (f && ba) || this.fireSync(J, p, z, Q, M, X))
              : ((Q = []), this.fireSync(J, p, z, Q, M, X));
          },
          pruneSyncData: function (p, z, J) {
            var M,
              Q = !1,
              O = !1;
            for (M = 0; M < p.length; M++) {
              var L = p[M];
              var f = parseInt(L.split('-')[1], 10);
              L.match('^' + z + '-')
                ? ((Q = !0), J < f ? (O = !0) : (p.splice(M, 1), M--))
                : J >= f && (p.splice(M, 1), M--);
            }
            return { dataPresent: Q, dataValid: O };
          },
          manageSyncsSize: function (p) {
            if (p.join('*').length > this.MAX_SYNCS_LENGTH)
              for (
                p.sort(function (z, J) {
                  return parseInt(z.split('-')[1], 10) - parseInt(J.split('-')[1], 10);
                });
                p.join('*').length > this.MAX_SYNCS_LENGTH;

              )
                p.shift();
          },
          fireSync: function (p, z, J, M, Q, O) {
            var L = this;
            if (p) {
              if ('img' === z.tag) {
                var f = z.url,
                  ba = q.loadSSL ? 'https:' : 'http:';
                p = 0;
                for (J = f.length; p < J; p++) {
                  M = f[p];
                  var X = /^\/\//.test(M);
                  var ca = new Image();
                  ca.addEventListener(
                    'load',
                    (function (ra, ua, xa, Sa) {
                      return function () {
                        L.onPagePixels[ra] = null;
                        q._readVisitor();
                        var va = q._getField(Q);
                        var Va = [];
                        if (va) {
                          va = va.split('*');
                          var ja;
                          var ea = 0;
                          for (ja = va.length; ea < ja; ea++) {
                            var ta = va[ea];
                            ta.match('^' + ua.id + '-') || Va.push(ta);
                          }
                        }
                        L.setSyncTrackingData(Va, ua, xa, Sa);
                      };
                    })(this.onPagePixels.length, z, Q, O),
                  );
                  ca.src = (X ? ba : '') + M;
                  this.onPagePixels.push(ca);
                }
              }
            } else this.addMessage(J), this.setSyncTrackingData(M, z, Q, O);
          },
          addMessage: function (p) {
            var z = encodeURIComponent(q._enableErrorReporting ? '---destpub-debug---' : '---destpub---');
            this.messages.push((sa ? '' : z) + p);
          },
          setSyncTrackingData: function (p, z, J, M) {
            p.push(z.id + '-' + (M + Math.ceil(z.ttl / 60 / 24)));
            this.manageSyncsSize(p);
            q._setField(J, p.join('*'));
          },
          sendMessages: function () {
            var p,
              z = this,
              J = '',
              M = encodeURIComponent;
            this.regionChanged && ((J = M('---destpub-clear-dextp---')), (this.regionChanged = !1));
            this.messages.length
              ? sa
                ? ((p = J + M('---destpub-combined---') + this.messages.join('%01')),
                  this.postMessage(p),
                  (this.messages = []),
                  (this.sendingMessages = !1))
                : ((p = this.messages.shift()),
                  this.postMessage(J + p),
                  setTimeout(function () {
                    z.sendMessages();
                  }, this.messageSendingInterval))
              : (this.sendingMessages = !1);
          },
          postMessage: function (p) {
            Ja.postMessage(p, this.url, this.iframe.contentWindow);
            this.messagesPosted.push(p);
          },
          receiveMessage: function (p) {
            var z,
              J = /^---destpub-to-parent---/;
            'string' == typeof p &&
              J.test(p) &&
              ((z = p.replace(J, '').split('|')),
              'canSetThirdPartyCookies' === z[0] &&
                ((this.canSetThirdPartyCookies = 'true' === z[1]),
                (this.receivedThirdPartyCookiesNotification = !0),
                this.requestToProcess()),
              this.messagesReceived.push(p));
          },
          processIDCallData: function (p) {
            (null == this.url || (p.subdomain && 'nosubdomainreturned' === this.subdomain)) &&
              ('string' == typeof q._subdomain && q._subdomain.length
                ? (this.subdomain = q._subdomain)
                : (this.subdomain = p.subdomain || ''),
              (this.url = this.getUrl()));
            p.ibs instanceof Array && p.ibs.length && (this.doAttachIframe = !0);
            this.readyToAttachIframe() &&
              (q.idSyncAttachIframeOnWindowLoad
                ? (v.windowLoaded || 'complete' === w.readyState || 'loaded' === w.readyState) && this.attachIframe()
                : this.attachIframeASAP());
            'function' == typeof q.idSyncIDCallResult ? q.idSyncIDCallResult(p) : this.requestToProcess(p);
            'function' == typeof q.idSyncAfterIDCallResult && q.idSyncAfterIDCallResult(p);
          },
          canMakeSyncIDCall: function (p, z) {
            return q._forceSyncIDCall || !p || 1 < z - p;
          },
          attachIframeASAP: function () {
            function p() {
              z.startedAttachingIframe || (w.body ? z.attachIframe() : setTimeout(p, 30));
            }
            var z = this;
            p();
          },
        };
      },
      Ka = {
        audienceManagerServer: {},
        audienceManagerServerSecure: {},
        cookieDomain: {},
        cookieLifetime: {},
        cookieName: {},
        doesOptInApply: {},
        disableThirdPartyCalls: {},
        discardTrackingServerECID: {},
        idSyncAfterIDCallResult: {},
        idSyncAttachIframeOnWindowLoad: {},
        idSyncContainerID: {},
        idSyncDisable3rdPartySyncing: {},
        disableThirdPartyCookies: {},
        idSyncDisableSyncs: {},
        disableIdSyncs: {},
        idSyncIDCallResult: {},
        idSyncSSLUseAkamai: {},
        isCoopSafe: {},
        isIabContext: {},
        isOptInStorageEnabled: {},
        loadSSL: {},
        loadTimeout: {},
        marketingCloudServer: {},
        marketingCloudServerSecure: {},
        optInCookieDomain: {},
        optInStorageExpiry: {},
        overwriteCrossDomainMCIDAndAID: {},
        preOptInApprovals: {},
        previousPermissions: {},
        resetBeforeVersion: {},
        sdidParamExpiry: {},
        serverState: {},
        sessionCookieName: {},
        secureCookie: {},
        takeTimeoutMetrics: {},
        trackingServer: {},
        trackingServerSecure: {},
        whitelistIframeDomains: {},
        whitelistParentDomain: {},
      },
      Ya = {
        getConfigNames: function () {
          return Object.keys(Ka);
        },
        getConfigs: function () {
          return Ka;
        },
        normalizeConfig: function (q) {
          return 'function' != typeof q ? q : q();
        },
      },
      Fa = function (q) {
        var v = {};
        return (
          (q.on = function (w, p, z) {
            if (!p || 'function' != typeof p) throw Error('[ON] Callback should be a function.');
            v.hasOwnProperty(w) || (v[w] = []);
            var J = v[w].push({ callback: p, context: z }) - 1;
            return function () {
              v[w].splice(J, 1);
              v[w].length || delete v[w];
            };
          }),
          (q.off = function (w, p) {
            v.hasOwnProperty(w) &&
              (v[w] = v[w].filter(function (z) {
                if (z.callback !== p) return z;
              }));
          }),
          (q.publish = function (w) {
            if (v.hasOwnProperty(w)) {
              var p = [].slice.call(arguments, 1);
              v[w].slice(0).forEach(function (z) {
                z.callback.apply(z.context, p);
              });
            }
          }),
          q.publish
        );
      },
      Ma = { PENDING: 'pending', CHANGED: 'changed', COMPLETE: 'complete' },
      za = {
        AAM: 'aam',
        ADCLOUD: 'adcloud',
        ANALYTICS: 'aa',
        CAMPAIGN: 'campaign',
        ECID: 'ecid',
        LIVEFYRE: 'livefyre',
        TARGET: 'target',
        VIDEO_ANALYTICS: 'videoaa',
      },
      Ca = ((h = {}), a(h, za.AAM, 565), a(h, za.ECID, 565), h),
      Za = ((m = {}), a(m, za.AAM, [1, 2, 5]), a(m, za.ECID, [1, 2, 5]), m),
      Ha = (function (q) {
        return Object.keys(q).map(function (v) {
          return q[v];
        });
      })(za),
      t = function () {
        var q = {};
        return (
          (q.callbacks = Object.create(null)),
          (q.add = function (v, w) {
            if (!('function' == typeof w || (w instanceof Array && w.length)))
              throw Error('[callbackRegistryFactory] Make sure callback is a function or an array of functions.');
            q.callbacks[v] = q.callbacks[v] || [];
            var p = q.callbacks[v].push(w) - 1;
            return function () {
              q.callbacks[v].splice(p, 1);
            };
          }),
          (q.execute = function (v, w) {
            if (q.callbacks[v]) {
              w = void 0 === w ? [] : w;
              w = w instanceof Array ? w : [w];
              try {
                for (; q.callbacks[v].length; ) {
                  var p = q.callbacks[v].shift();
                  'function' == typeof p ? p.apply(null, w) : p instanceof Array && p[1].apply(p[0], w);
                }
                delete q.callbacks[v];
              } catch (z) {}
            }
          }),
          (q.executeAll = function (v, w) {
            (w || (v && (v !== Object(v) || 0 !== Object.keys(v).length))) &&
              Object.keys(q.callbacks).forEach(function (p) {
                q.execute(p, void 0 !== v[p] ? v[p] : '');
              }, q);
          }),
          (q.hasCallbacks = function () {
            return !!Object.keys(q.callbacks).length;
          }),
          q
        );
      },
      F = function () {},
      I = function (q, v, w) {
        return w()
          ? function () {
              var p = window.console;
              if (p && 'function' == typeof p[q]) {
                p = arguments.length;
                for (var z = Array(p), J = 0; J < p; J++) z[J] = arguments[J];
                console[q].apply(console, [v].concat(z));
              }
            }
          : F;
      },
      P = new (function () {
        var q = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : '',
          v =
            1 < arguments.length && void 0 !== arguments[1]
              ? arguments[1]
              : function () {
                  return !0;
                };
        this.log = I('log', q, v);
        this.warn = I('warn', q, v);
        this.error = I('error', q, v);
      })('[ADOBE OPT-IN]'),
      V = function (q, v) {
        return q instanceof Array ? q : 'string' === b(q) ? [q] : v || [];
      },
      Z = function (q) {
        var v = Object.keys(q);
        return (
          !!v.length &&
          v.every(function (w) {
            return !0 === q[w];
          })
        );
      },
      na = function (q) {
        return (
          !(!q || la(q)) &&
          V(q).every(function (v) {
            return -1 < Ha.indexOf(v);
          })
        );
      },
      pa = function (q, v) {
        return q.reduce(function (w, p) {
          return (w[p] = v), w;
        }, {});
      },
      la = function (q) {
        return '[object Array]' === Object.prototype.toString.call(q) && !q.length;
      },
      Ta = function (q) {
        if (Ra(q)) return q;
        try {
          return JSON.parse(q);
        } catch (v) {
          return {};
        }
      },
      Ea = function (q) {
        var v;
        if (!(v = void 0 === q)) {
          if (Ra(q)) var w = na(Object.keys(q));
          else
            try {
              var p = JSON.parse(q);
              w = !!q && 'string' === b(q) && na(Object.keys(p));
            } catch (z) {
              w = !1;
            }
          v = w;
        }
        return v;
      },
      Ra = function (q) {
        return null !== q && 'object' === b(q) && !1 === Array.isArray(q);
      },
      ia = function () {},
      Wa = function (q) {
        return 'function' === b(q) ? q() : q;
      },
      db = function (q) {
        return Object.keys(q).map(function (v) {
          return q[v];
        });
      },
      ab = function (q) {
        return db(q).filter(function (v, w, p) {
          return p.indexOf(v) === w;
        });
      },
      bb = function (q) {
        return function () {
          var v = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            w = v.command,
            p = v.params;
          p = void 0 === p ? {} : p;
          v = v.callback;
          v = void 0 === v ? ia : v;
          if (!w || -1 === w.indexOf('.')) throw Error('[OptIn.execute] Please provide a valid command.');
          try {
            var z = w.split('.'),
              J = q[z[0]],
              M = z[1];
            if (!J || 'function' != typeof J[M]) throw Error('Make sure the plugin and API name exist.');
            var Q = Object.assign(p, { callback: v });
            J[M].call(J, Q);
          } catch (O) {
            P.error('[execute] Something went wrong: ' + O.message);
          }
        };
      };
    D.prototype = Object.create(Error.prototype);
    D.prototype.constructor = D;
    var eb = 'fetchPermissions',
      gb = '[OptIn#registerPlugin] Plugin is invalid.';
    B.Categories = za;
    B.TimeoutError = D;
    h = Object.freeze({
      OptIn: B,
      IabPlugin: function () {
        var q = this;
        q.name = 'iabPlugin';
        q.version = '0.0.1';
        var v = t(),
          w = { allConsentData: null },
          p = function (O) {
            return (w[O] = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {});
          };
        q.fetchConsentData = function (O) {
          O = E(O.callback, O.timeout);
          z({ callback: O });
        };
        q.isApproved = function (O) {
          var L = O.callback,
            f = O.category;
          O = O.timeout;
          if (w.allConsentData) return L(null, Q(f, w.allConsentData.vendorConsents, w.allConsentData.purposeConsents));
          O = E(function (ba) {
            var X = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            L(ba, Q(f, X.vendorConsents, X.purposeConsents));
          }, O);
          z({ category: f, callback: O });
        };
        q.onRegister = function (O) {
          var L = Object.keys(Ca);
          q.fetchConsentData({
            callback: function (f) {
              var ba = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                X = ba.purposeConsents,
                ca = ba.gdprApplies,
                ra = ba.vendorConsents;
              !f &&
                ca &&
                ra &&
                X &&
                (L.forEach(function (ua) {
                  var xa = Q(ua, ra, X);
                  O[xa ? 'approve' : 'deny'](ua, !0);
                }),
                O.complete());
            },
          });
        };
        var z = function (O) {
            O = O.callback;
            if (w.allConsentData) return O(null, w.allConsentData);
            v.add('FETCH_CONSENT_DATA', O);
            var L = {};
            M(function () {
              var f = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                ba = f.purposeConsents,
                X = f.gdprApplies;
              f = f.vendorConsents;
              1 < arguments.length &&
                arguments[1] &&
                ((L = { purposeConsents: ba, gdprApplies: X, vendorConsents: f }), p('allConsentData', L));
              J(function () {
                var ca = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                1 < arguments.length && arguments[1] && ((L.consentString = ca.consentData), p('allConsentData', L));
                v.execute('FETCH_CONSENT_DATA', [null, w.allConsentData]);
              });
            });
          },
          J = function (O) {
            var L = K();
            L && L('getConsentData', null, O);
          },
          M = function (O) {
            var L = ab(Ca),
              f = K();
            f && f('getVendorConsents', L, O);
          },
          Q = function (O) {
            var L = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
            return (
              !!(1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {})[Ca[O]] &&
              (function () {
                return Za[O].every(function (f) {
                  return L[f];
                });
              })()
            );
          };
      },
    });
    var hb = function (q, v) {
        q.publishDestinations = function (w, p, z) {
          var J = z;
          try {
            J = 'function' == typeof J ? J : w.callback;
          } catch (O) {
            J = function () {};
          }
          if (!v.readyToAttachIframePreliminary())
            return void J({ error: 'The destination publishing iframe is disabled in the Visitor library.' });
          if ('string' == typeof w) {
            if (!w.length) return void J({ error: 'subdomain is not a populated string.' });
            if (!(p instanceof Array && p.length)) return void J({ error: 'messages is not a populated array.' });
            var M = !1;
            if (
              (p.forEach(function (O) {
                'string' == typeof O && O.length && (v.addMessage(O), (M = !0));
              }),
              !M)
            )
              return void J({ error: 'None of the messages are populated strings.' });
          } else {
            if (!aa.isObject(w)) return void J({ error: 'Invalid parameters passed.' });
            p = w;
            if ('string' != typeof (w = p.subdomain) || !w.length)
              return void J({ error: 'config.subdomain is not a populated string.' });
            p = p.urlDestinations;
            if (!(p instanceof Array && p.length))
              return void J({ error: 'config.urlDestinations is not a populated array.' });
            var Q = [];
            p.forEach(function (O) {
              aa.isObject(O) && (O.hideReferrer ? O.message && v.addMessage(O.message) : Q.push(O));
            });
            !(function L() {
              Q.length &&
                setTimeout(function () {
                  var f = new Image(),
                    ba = Q.shift();
                  f.src = ba.url;
                  v.onPageDestinationsFired.push(ba);
                  L();
                }, 100);
            })();
          }
          v.iframe
            ? (J({ message: 'The destination publishing iframe is already attached and loaded.' }),
              v.requestToProcess())
            : !q.subdomain && q._getField('MCMID')
              ? ((v.subdomain = w),
                (v.doAttachIframe = !0),
                (v.url = v.getUrl()),
                v.readyToAttachIframe()
                  ? (v.iframeLoadedCallbacks.push(function (O) {
                      J({
                        message:
                          'Attempted to attach and load the destination publishing iframe through this API call. Result: ' +
                          (O.message || 'no result'),
                      });
                    }),
                    v.attachIframe())
                  : J({
                      error:
                        'Encountered a problem in attempting to attach and load the destination publishing iframe through this API call.',
                    }))
              : v.iframeLoadedCallbacks.push(function (O) {
                  J({
                    message:
                      'Attempted to attach and load the destination publishing iframe through normal Visitor API processing. Result: ' +
                      (O.message || 'no result'),
                  });
                });
        };
      },
      ib = function w(v) {
        function p(ua, xa) {
          return (ua >>> xa) | (ua << (32 - xa));
        }
        var z;
        var J = Math.pow;
        for (
          var M = J(2, 32),
            Q = '',
            O = [],
            L = 8 * v.length,
            f = (w.h = w.h || []),
            ba = (w.k = w.k || []),
            X = ba.length,
            ca = {},
            ra = 2;
          64 > X;
          ra++
        )
          if (!ca[ra]) {
            for (z = 0; 313 > z; z += ra) ca[z] = ra;
            f[X] = (J(ra, 0.5) * M) | 0;
            ba[X++] = (J(ra, 1 / 3) * M) | 0;
          }
        for (v += '\u0080'; (v.length % 64) - 56; ) v += '\x00';
        for (z = 0; z < v.length; z++) {
          if ((J = v.charCodeAt(z)) >> 8) return;
          O[z >> 2] |= J << (((3 - z) % 4) * 8);
        }
        O[O.length] = (L / M) | 0;
        O[O.length] = L;
        for (J = 0; J < O.length; ) {
          v = O.slice(J, (J += 16));
          M = f;
          f = f.slice(0, 8);
          for (z = 0; 64 > z; z++)
            (X = v[z - 15]),
              (ca = v[z - 2]),
              (L = f[0]),
              (ra = f[4]),
              (X =
                f[7] +
                (p(ra, 6) ^ p(ra, 11) ^ p(ra, 25)) +
                ((ra & f[5]) ^ (~ra & f[6])) +
                ba[z] +
                (v[z] =
                  16 > z
                    ? v[z]
                    : (v[z - 16] +
                        (p(X, 7) ^ p(X, 18) ^ (X >>> 3)) +
                        v[z - 7] +
                        (p(ca, 17) ^ p(ca, 19) ^ (ca >>> 10))) |
                      0)),
              (f = [(X + ((p(L, 2) ^ p(L, 13) ^ p(L, 22)) + ((L & f[1]) ^ (L & f[2]) ^ (f[1] & f[2])))) | 0].concat(f)),
              (f[4] = (f[4] + X) | 0);
          for (z = 0; 8 > z; z++) f[z] = (f[z] + M[z]) | 0;
        }
        for (z = 0; 8 > z; z++)
          for (J = 3; J + 1; J--) (O = (f[z] >> (8 * J)) & 255), (Q += (16 > O ? 0 : '') + O.toString(16));
        return Q;
      },
      fb = function (v, w) {
        return ('SHA-256' !== w && 'SHA256' !== w && 'sha256' !== w && 'sha-256' !== w) || (v = ib(v)), v;
      };
    m = h.OptIn;
    aa.defineGlobalNamespace();
    window.adobe.OptInCategories = m.Categories;
    var $a = function (v, w, p) {
      function z(l) {
        return function (x) {
          x = x || ua.location.href;
          try {
            var C = f._extractParamFromUri(x, l);
            if (C) return ea.parsePipeDelimetedKeyValues(C);
          } catch (R) {}
        };
      }
      function J(l) {
        l = l || {};
        f._supplementalDataIDCurrent = l.supplementalDataIDCurrent || '';
        f._supplementalDataIDCurrentConsumed = l.supplementalDataIDCurrentConsumed || {};
        f._supplementalDataIDLast = l.supplementalDataIDLast || '';
        f._supplementalDataIDLastConsumed = l.supplementalDataIDLastConsumed || {};
      }
      function M(l) {
        return (function (x) {
          var C = ea.getTimestampInSeconds();
          return (x = x ? (x += '|') : x), x + ('TS=' + C);
        })(
          l.reduce(function (x, C) {
            var R = C[0];
            C = C[1];
            if (null != C && C !== va) {
              var U = x;
              x = ((U = U ? (U += '|') : U), U + (R + '=' + encodeURIComponent(C)));
            }
            return x;
          }, ''),
        );
      }
      function Q() {
        return f.configs.isIabContext
          ? ba.optIn.isApproved(ba.optIn.Categories.ECID) && ca
          : ba.optIn.isApproved(ba.optIn.Categories.ECID);
      }
      function O(l, x) {
        if (((ca = !0), l)) throw Error('[IAB plugin] : ' + l);
        x.gdprApplies && (X = x.consentString);
        f.init();
        ba.optIn.off('complete', L);
      }
      function L() {
        ba.optIn.isApproved(ba.optIn.Categories.ECID) &&
          (f.configs.isIabContext
            ? ba.optIn.execute({ command: 'iabPlugin.fetchConsentData', callback: O })
            : (f.init(), ba.optIn.off('complete', L)));
      }
      if (!p || p.split('').reverse().join('') !== v)
        throw Error('Please use `Visitor.getInstance` to instantiate Visitor.');
      var f = this,
        ba = window.adobe,
        X = '',
        ca = !1,
        ra = !1;
      f.version = '4.4.0';
      var ua = c,
        xa = ua.Visitor;
      xa.version = f.version;
      xa.AuthState = A;
      xa.OptOut = G;
      ua.s_c_in || ((ua.s_c_il = []), (ua.s_c_in = 0));
      f._c = 'Visitor';
      f._il = ua.s_c_il;
      f._in = ua.s_c_in;
      f._il[f._in] = f;
      ua.s_c_in++;
      f._instanceType = 'regular';
      f._log = { requests: [] };
      f.marketingCloudOrgID = v;
      f.cookieName = 'AMCV_' + v;
      f.sessionCookieName = 'AMCVS_' + v;
      f.cookieDomain = ya();
      f.loadSSL = 0 <= ua.location.protocol.toLowerCase().indexOf('https');
      f.loadTimeout = 3e4;
      f.CORSErrors = [];
      f.marketingCloudServer = f.audienceManagerServer = 'dpm.demdex.net';
      f.sdidParamExpiry = 30;
      var Sa = null,
        va = 'NONE',
        Va = Qa(f);
      f.FIELDS = H;
      f.cookieRead = function (l) {
        return qa.get(l);
      };
      f.cookieWrite = function (l, x, C) {
        var R = f.cookieLifetime ? ('' + f.cookieLifetime).toUpperCase() : '',
          U = !1;
        return (
          f.configs && f.configs.secureCookie && 'https:' === location.protocol && (U = !0),
          qa.set(l, '' + x, { expires: C, domain: f.cookieDomain, cookieLifetime: R, secure: U })
        );
      };
      f.resetState = function (l) {
        l ? f._mergeServerState(l) : J();
      };
      f._isAllowedDone = !1;
      f._isAllowedFlag = !1;
      f.isAllowed = function () {
        return (
          f._isAllowedDone ||
            ((f._isAllowedDone = !0),
            (f.cookieRead(f.cookieName) || f.cookieWrite(f.cookieName, 'T', 1)) && (f._isAllowedFlag = !0)),
          'T' === f.cookieRead(f.cookieName) && f._helpers.removeCookie(f.cookieName),
          f._isAllowedFlag
        );
      };
      f.setMarketingCloudVisitorID = function (l) {
        f._setMarketingCloudFields(l);
      };
      f._use1stPartyMarketingCloudServer = !1;
      f.getMarketingCloudVisitorID = function (l, x) {
        f.marketingCloudServer &&
          0 > f.marketingCloudServer.indexOf('.demdex.net') &&
          (f._use1stPartyMarketingCloudServer = !0);
        var C = f._getAudienceManagerURLData('_setMarketingCloudFields');
        return f._getRemoteField('MCMID', C.url, l, x, C);
      };
      f.getVisitorValues = function (l, x) {
        var C = {
          MCMID: { fn: f.getMarketingCloudVisitorID, args: [!0], context: f },
          MCOPTOUT: { fn: f.isOptedOut, args: [void 0, !0], context: f },
          MCAID: { fn: f.getAnalyticsVisitorID, args: [!0], context: f },
          MCAAMLH: { fn: f.getAudienceManagerLocationHint, args: [!0], context: f },
          MCAAMB: { fn: f.getAudienceManagerBlob, args: [!0], context: f },
        };
        x = x && x.length ? aa.pluck(C, x) : C;
        Aa(x, l);
      };
      f._currentCustomerIDs = {};
      f._customerIDsHashChanged = !1;
      f._newCustomerIDsHash = '';
      f.setCustomerIDs = function (l, x) {
        function C() {
          f._customerIDsHashChanged = !1;
        }
        if (!f.isOptedOut() && l) {
          if (!aa.isObject(l) || aa.isObjectEmpty(l)) return !1;
          f._readVisitor();
          var R, U, Y;
          for (R in l)
            if (!Object.prototype[R] && ((U = l[R]), (x = U.hasOwnProperty('hashType') ? U.hashType : x), U))
              if ('object' === b(U)) {
                var ma = {};
                if (U.id) {
                  if (x) {
                    if (!(Y = fb(String(U.id).trim().toLowerCase(), x))) return;
                    U.id = Y;
                    ma.hashType = x;
                  }
                  ma.id = U.id;
                }
                void 0 != U.authState && (ma.authState = U.authState);
                f._currentCustomerIDs[R] = ma;
              } else if (x) {
                if (!(Y = fb(String(U).trim().toLowerCase(), x))) return;
                f._currentCustomerIDs[R] = { id: Y, hashType: x };
              } else f._currentCustomerIDs[R] = { id: U };
          l = f.getCustomerIDs();
          x = f._getField('MCCIDH');
          Y = '';
          x ||= 0;
          for (R in l)
            !Object.prototype[R] &&
              ((U = l[R]), (Y += (Y ? '|' : '') + R + '|' + (U.id ? U.id : '') + (U.authState ? U.authState : '')));
          f._newCustomerIDsHash = String(f._hash(Y));
          f._newCustomerIDsHash !== x && ((f._customerIDsHashChanged = !0), f._mapCustomerIDs(C));
        }
      };
      f.getCustomerIDs = function () {
        f._readVisitor();
        var l,
          x,
          C = {};
        for (l in f._currentCustomerIDs)
          !Object.prototype[l] &&
            ((x = f._currentCustomerIDs[l]),
            C[l] || (C[l] = {}),
            x.id && (C[l].id = x.id),
            void 0 != x.authState ? (C[l].authState = x.authState) : (C[l].authState = xa.AuthState.UNKNOWN),
            x.hashType && (C[l].hashType = x.hashType));
        return C;
      };
      f.setAnalyticsVisitorID = function (l) {
        f._setAnalyticsFields(l);
      };
      f.getAnalyticsVisitorID = function (l, x, C) {
        if (!ea.isTrackingServerPopulated() && !C) return f._callCallback(l, ['']), '';
        var R = '';
        if (
          (C ||
            (R = f.getMarketingCloudVisitorID(function (Da) {
              f.getAnalyticsVisitorID(l, !0);
            })),
          R || C)
        ) {
          var U = C ? f.marketingCloudServer : f.trackingServer,
            Y = '';
          f.loadSSL &&
            (C
              ? f.marketingCloudServerSecure && (U = f.marketingCloudServerSecure)
              : f.trackingServerSecure && (U = f.trackingServerSecure));
          var ma = {};
          if (U) {
            U = 'http' + (f.loadSSL ? 's' : '') + '://' + U + '/id';
            R =
              'd_visid_ver=' +
              f.version +
              '&mcorgid=' +
              encodeURIComponent(f.marketingCloudOrgID) +
              (R ? '&mid=' + encodeURIComponent(R) : '') +
              (f.idSyncDisable3rdPartySyncing || f.disableThirdPartyCookies ? '&d_coppa=true' : '');
            var La = ['s_c_il', f._in, '_set' + (C ? 'MarketingCloud' : 'Analytics') + 'Fields'];
            Y =
              U +
              '?' +
              R +
              '&callback=s_c_il%5B' +
              f._in +
              '%5D._set' +
              (C ? 'MarketingCloud' : 'Analytics') +
              'Fields';
            ma.corsUrl = U + '?' + R;
            ma.callback = La;
          }
          return (ma.url = Y), f._getRemoteField(C ? 'MCMID' : 'MCAID', Y, l, x, ma);
        }
        return '';
      };
      f.getAudienceManagerLocationHint = function (l, x) {
        if (
          f.getMarketingCloudVisitorID(function (R) {
            f.getAudienceManagerLocationHint(l, !0);
          })
        ) {
          var C = f._getField('MCAID');
          if (
            (!C &&
              ea.isTrackingServerPopulated() &&
              (C = f.getAnalyticsVisitorID(function (R) {
                f.getAudienceManagerLocationHint(l, !0);
              })),
            C || !ea.isTrackingServerPopulated())
          )
            return (C = f._getAudienceManagerURLData()), f._getRemoteField('MCAAMLH', C.url, l, x, C);
        }
        return '';
      };
      f.getLocationHint = f.getAudienceManagerLocationHint;
      f.getAudienceManagerBlob = function (l, x) {
        if (
          f.getMarketingCloudVisitorID(function (U) {
            f.getAudienceManagerBlob(l, !0);
          })
        ) {
          var C = f._getField('MCAID');
          if (
            (!C &&
              ea.isTrackingServerPopulated() &&
              (C = f.getAnalyticsVisitorID(function (U) {
                f.getAudienceManagerBlob(l, !0);
              })),
            C || !ea.isTrackingServerPopulated())
          ) {
            C = f._getAudienceManagerURLData();
            var R = C.url;
            return (
              f._customerIDsHashChanged && f._setFieldExpire('MCAAMB', -1), f._getRemoteField('MCAAMB', R, l, x, C)
            );
          }
        }
        return '';
      };
      f._supplementalDataIDCurrent = '';
      f._supplementalDataIDCurrentConsumed = {};
      f._supplementalDataIDLast = '';
      f._supplementalDataIDLastConsumed = {};
      f.getSupplementalDataID = function (l, x) {
        f._supplementalDataIDCurrent || x || (f._supplementalDataIDCurrent = f._generateID(1));
        var C = f._supplementalDataIDCurrent;
        return (
          f._supplementalDataIDLast && !f._supplementalDataIDLastConsumed[l]
            ? ((C = f._supplementalDataIDLast), (f._supplementalDataIDLastConsumed[l] = !0))
            : C &&
              (f._supplementalDataIDCurrentConsumed[l] &&
                ((f._supplementalDataIDLast = f._supplementalDataIDCurrent),
                (f._supplementalDataIDLastConsumed = f._supplementalDataIDCurrentConsumed),
                (f._supplementalDataIDCurrent = C = x ? '' : f._generateID(1)),
                (f._supplementalDataIDCurrentConsumed = {})),
              C && (f._supplementalDataIDCurrentConsumed[l] = !0)),
          C
        );
      };
      var ja = !1;
      f._liberatedOptOut = null;
      f.getOptOut = function (l, x) {
        var C = f._getAudienceManagerURLData('_setMarketingCloudFields'),
          R = C.url;
        if (Q()) return f._getRemoteField('MCOPTOUT', R, l, x, C);
        if ((f._registerCallback('liberatedOptOut', l), null !== f._liberatedOptOut))
          return f._callAllCallbacks('liberatedOptOut', [f._liberatedOptOut]), (ja = !1), f._liberatedOptOut;
        if (ja) return null;
        ja = !0;
        return (
          (C.corsUrl = C.corsUrl.replace(/dpm\.demdex\.net\/id\?/, 'dpm.demdex.net/optOutStatus?')),
          (C.callback = ['liberatedGetOptOut']),
          (c.liberatedGetOptOut = function (U) {
            if (U === Object(U)) {
              U = aa.parseOptOut(U, Y, va);
              var Y = U.optOut;
              U = 1e3 * U.d_ottl;
              f._liberatedOptOut = Y;
              setTimeout(function () {
                f._liberatedOptOut = null;
              }, U);
            }
            f._callAllCallbacks('liberatedOptOut', [Y]);
            ja = !1;
          }),
          Va.fireCORS(C),
          null
        );
      };
      f.isOptedOut = function (l, x, C) {
        x ||= xa.OptOut.GLOBAL;
        return (C = f.getOptOut(function (R) {
          R = R === xa.OptOut.GLOBAL || 0 <= R.indexOf(x);
          f._callCallback(l, [R]);
        }, C))
          ? C === xa.OptOut.GLOBAL || 0 <= C.indexOf(x)
          : null;
      };
      f._fields = null;
      f._fieldsExpired = null;
      f._hash = function (l) {
        var x,
          C = 0;
        if (l)
          for (x = 0; x < l.length; x++) {
            var R = l.charCodeAt(x);
            C = (C << 5) - C + R;
            C &= C;
          }
        return C;
      };
      f._generateID = Xa;
      f._generateLocalMID = function () {
        var l = f._generateID(0);
        return (Na.isClientSideMarketingCloudVisitorID = !0), l;
      };
      f._callbackList = null;
      f._callCallback = function (l, x) {
        try {
          'function' == typeof l ? l.apply(ua, x) : l[1].apply(l[0], x);
        } catch (C) {}
      };
      f._registerCallback = function (l, x) {
        x &&
          (null == f._callbackList && (f._callbackList = {}),
          void 0 == f._callbackList[l] && (f._callbackList[l] = []),
          f._callbackList[l].push(x));
      };
      f._callAllCallbacks = function (l, x) {
        if (null != f._callbackList && (l = f._callbackList[l])) for (; 0 < l.length; ) f._callCallback(l.shift(), x);
      };
      f._addQuerystringParam = function (l, x, C, R) {
        x = encodeURIComponent(x) + '=' + encodeURIComponent(C);
        C = ea.parseHash(l);
        l = ea.hashlessUrl(l);
        if (-1 === l.indexOf('?')) return l + '?' + x + C;
        l = l.split('?');
        return l[0] + '?' + ea.addQueryParamAtLocation(l[1], x, R) + C;
      };
      f._extractParamFromUri = function (l, x) {
        if ((l = new RegExp('[\\?&#]' + x + '=([^&#]*)').exec(l)) && l.length) return decodeURIComponent(l[1]);
      };
      f._parseAdobeMcFromUrl = z('adobe_mc');
      f._parseAdobeMcSdidFromUrl = z('adobe_mc_sdid');
      f._attemptToPopulateSdidFromUrl = function (l) {
        l = f._parseAdobeMcSdidFromUrl(l);
        var x = 1e9;
        l && l.TS && (x = ea.getTimestampInSeconds() - l.TS);
        l &&
          l.SDID &&
          l.MCORGID === v &&
          x < f.sdidParamExpiry &&
          ((f._supplementalDataIDCurrent = l.SDID), (f._supplementalDataIDCurrentConsumed.SDID_URL_PARAM = !0));
      };
      f._attemptToPopulateIdsFromUrl = function () {
        var l = f._parseAdobeMcFromUrl();
        if (l && l.TS) {
          var x = ea.getTimestampInSeconds() - l.TS;
          if (!(5 < Math.floor(x / 60) || l.MCORGID !== v)) {
            x = l.MCMID;
            var C = f.setMarketingCloudVisitorID;
            x && x.match(Pa) && ((ra = !0), C(x));
            f._setFieldExpire('MCAAMB', -1);
            l = l.MCAID;
            x = f.setAnalyticsVisitorID;
            l && l.match(Pa) && x(l);
          }
        }
      };
      f._mergeServerState = function (l) {
        if (l)
          try {
            if (
              ((l = (function (C) {
                return ea.isObject(C) ? C : JSON.parse(C);
              })(l)),
              l[f.marketingCloudOrgID])
            ) {
              var x = l[f.marketingCloudOrgID];
              !(function (C) {
                ea.isObject(C) && f.setCustomerIDs(C);
              })(x.customerIDs);
              J(x.sdid);
            }
          } catch (C) {
            throw Error('`serverState` has an invalid format.');
          }
      };
      f._timeout = null;
      f._loadData = function (l, x, C, R) {
        f._addQuerystringParam(x, 'd_fieldgroup', l, 1);
        R.url = f._addQuerystringParam(R.url, 'd_fieldgroup', l, 1);
        R.corsUrl = f._addQuerystringParam(R.corsUrl, 'd_fieldgroup', l, 1);
        Na.fieldGroupObj[l] = !0;
        R === Object(R) && R.corsUrl && 'XMLHttpRequest' === Va.corsMetadata.corsType && Va.fireCORS(R, C, l);
      };
      f._clearTimeout = function (l) {
        null != f._timeout && f._timeout[l] && (clearTimeout(f._timeout[l]), (f._timeout[l] = 0));
      };
      f._settingsDigest = 0;
      f._getSettingsDigest = function () {
        if (!f._settingsDigest) {
          var l = f.version;
          f.audienceManagerServer && (l += '|' + f.audienceManagerServer);
          f.audienceManagerServerSecure && (l += '|' + f.audienceManagerServerSecure);
          f._settingsDigest = f._hash(l);
        }
        return f._settingsDigest;
      };
      f._readVisitorDone = !1;
      f._readVisitor = function () {
        if (!f._readVisitorDone) {
          f._readVisitorDone = !0;
          var l, x, C;
          var R = f._getSettingsDigest();
          var U = !1,
            Y = f.cookieRead(f.cookieName),
            ma = new Date();
          if (
            (Y || ra || f.discardTrackingServerECID || (Y = f.cookieRead('s_ecid')),
            null == f._fields && (f._fields = {}),
            Y && 'T' !== Y)
          )
            for (
              Y = Y.split('|'),
                Y[0].match(/^[\-0-9]+$/) && (parseInt(Y[0], 10) !== R && (U = !0), Y.shift()),
                1 == Y.length % 2 && Y.pop(),
                l = 0;
              l < Y.length;
              l += 2
            ) {
              R = Y[l].split('-');
              var La = R[0];
              var Da = Y[l + 1];
              1 < R.length ? ((x = parseInt(R[1], 10)), (C = 0 < R[1].indexOf('s'))) : ((x = 0), (C = !1));
              U && ('MCCIDH' === La && (Da = ''), 0 < x && (x = ma.getTime() / 1e3 - 60));
              La &&
                Da &&
                (f._setField(La, Da, 1),
                0 < x &&
                  ((f._fields['expire' + La] = x + (C ? 's' : '')),
                  (ma.getTime() >= 1e3 * x || (C && !f.cookieRead(f.sessionCookieName))) &&
                    (f._fieldsExpired || (f._fieldsExpired = {}), (f._fieldsExpired[La] = !0))));
            }
          !f._getField('MCAID') &&
            ea.isTrackingServerPopulated() &&
            (Y = f.cookieRead('s_vi')) &&
            ((Y = Y.split('|')),
            1 < Y.length &&
              0 <= Y[0].indexOf('v1') &&
              ((Da = Y[1]),
              (l = Da.indexOf('[')),
              0 <= l && (Da = Da.substring(0, l)),
              Da && Da.match(Pa) && f._setField('MCAID', Da)));
        }
      };
      f._appendVersionTo = function (l) {
        var x = 'vVersion|' + f.version,
          C = l ? f._getCookieVersion(l) : null;
        return C ? ka.areVersionsDifferent(C, f.version) && (l = l.replace(T, x)) : (l += (l ? '|' : '') + x), l;
      };
      f._writeVisitor = function () {
        var l,
          x,
          C = f._getSettingsDigest();
        for (l in f._fields)
          !Object.prototype[l] &&
            f._fields[l] &&
            'expire' !== l.substring(0, 6) &&
            ((x = f._fields[l]),
            (C += (C ? '|' : '') + l + (f._fields['expire' + l] ? '-' + f._fields['expire' + l] : '') + '|' + x));
        C = f._appendVersionTo(C);
        f.cookieWrite(f.cookieName, C, 1);
      };
      f._getField = function (l, x) {
        return null == f._fields || (!x && f._fieldsExpired && f._fieldsExpired[l]) ? null : f._fields[l];
      };
      f._setField = function (l, x, C) {
        null == f._fields && (f._fields = {});
        f._fields[l] = x;
        C || f._writeVisitor();
      };
      f._getFieldList = function (l, x) {
        return (l = f._getField(l, x)) ? l.split('*') : null;
      };
      f._setFieldList = function (l, x, C) {
        f._setField(l, x ? x.join('*') : '', C);
      };
      f._getFieldMap = function (l, x) {
        if ((l = f._getFieldList(l, x))) {
          var C = {};
          for (x = 0; x < l.length; x += 2) C[l[x]] = l[x + 1];
          return C;
        }
        return null;
      };
      f._setFieldMap = function (l, x, C) {
        var R,
          U = null;
        if (x) for (R in ((U = []), x)) !Object.prototype[R] && (U.push(R), U.push(x[R]));
        f._setFieldList(l, U, C);
      };
      f._setFieldExpire = function (l, x, C) {
        var R = new Date();
        R.setTime(R.getTime() + 1e3 * x);
        null == f._fields && (f._fields = {});
        f._fields['expire' + l] = Math.floor(R.getTime() / 1e3) + (C ? 's' : '');
        0 > x
          ? (f._fieldsExpired || (f._fieldsExpired = {}), (f._fieldsExpired[l] = !0))
          : f._fieldsExpired && (f._fieldsExpired[l] = !1);
        C && (f.cookieRead(f.sessionCookieName) || f.cookieWrite(f.sessionCookieName, '1'));
      };
      f._findVisitorID = function (l) {
        return (
          l &&
            ('object' === b(l) &&
              (l = l.d_mid ? l.d_mid : l.visitorID ? l.visitorID : l.id ? l.id : l.uuid ? l.uuid : '' + l),
            l && 'NOTARGET' === (l = l.toUpperCase()) && (l = va),
            (l && (l === va || l.match(Pa))) || (l = '')),
          l
        );
      };
      f._setFields = function (l, x) {
        if (
          (f._clearTimeout(l),
          null != f._loading && (f._loading[l] = !1),
          Na.fieldGroupObj[l] && Na.setState(l, !1),
          'MC' === l)
        ) {
          !0 !== Na.isClientSideMarketingCloudVisitorID && (Na.isClientSideMarketingCloudVisitorID = !1);
          var C = f._getField('MCMID');
          if (!C || f.overwriteCrossDomainMCIDAndAID) {
            if (!(C = 'object' === b(x) && x.mid ? x.mid : f._findVisitorID(x))) {
              if (f._use1stPartyMarketingCloudServer && !f.tried1stPartyMarketingCloudServer)
                return (f.tried1stPartyMarketingCloudServer = !0), void f.getAnalyticsVisitorID(null, !1, !0);
              C = f._generateLocalMID();
            }
            f._setField('MCMID', C);
          }
          (C && C !== va) || (C = '');
          'object' === b(x) &&
            ((x.d_region || x.dcs_region || x.d_blob || x.blob) && f._setFields('AAM', x),
            f._use1stPartyMarketingCloudServer && x.mid && f._setFields('A', { id: x.id }));
          f._callAllCallbacks('MCMID', [C]);
        }
        if ('AAM' === l && 'object' === b(x)) {
          C = 604800;
          void 0 != x.id_sync_ttl && x.id_sync_ttl && (C = parseInt(x.id_sync_ttl, 10));
          var R = ta.getRegionAndCheckIfChanged(x, C);
          f._callAllCallbacks('MCAAMLH', [R]);
          R = f._getField('MCAAMB');
          (x.d_blob || x.blob) &&
            ((R = x.d_blob), (R ||= x.blob), f._setFieldExpire('MCAAMB', C), f._setField('MCAAMB', R));
          R ||= '';
          f._callAllCallbacks('MCAAMB', [R]);
          !x.error_msg && f._newCustomerIDsHash && f._setField('MCCIDH', f._newCustomerIDsHash);
        }
        'A' === l &&
          (((l = f._getField('MCAID')) && !f.overwriteCrossDomainMCIDAndAID) ||
            ((l = f._findVisitorID(x)),
            l ? l !== va && f._setFieldExpire('MCAAMB', -1) : (l = va),
            f._setField('MCAID', l)),
          (l && l !== va) || (l = ''),
          f._callAllCallbacks('MCAID', [l]));
        f.idSyncDisableSyncs || f.disableIdSyncs
          ? (ta.idCallNotProcesssed = !0)
          : ((ta.idCallNotProcesssed = !1),
            (l = {}),
            (l.ibs = x.ibs),
            (l.subdomain = x.subdomain),
            ta.processIDCallData(l));
        if (x === Object(x)) {
          var U;
          Q() && f.isAllowed() && (U = f._getField('MCOPTOUT'));
          x = aa.parseOptOut(x, U, va);
          U = x.optOut;
          f._setFieldExpire('MCOPTOUT', x.d_ottl, !0);
          f._setField('MCOPTOUT', U);
          f._callAllCallbacks('MCOPTOUT', [U]);
        }
      };
      f._loading = null;
      f._getRemoteField = function (l, x, C, R, U) {
        var Y,
          ma = '',
          La = ea.isFirstPartyAnalyticsVisitorIDCall(l),
          Da = { MCAAMLH: !0, MCAAMB: !0 };
        if (Q() && f.isAllowed())
          if (
            (f._readVisitor(),
            (ma = f._getField(l, !0 === Da[l])),
            !(!ma || (f._fieldsExpired && f._fieldsExpired[l])) || (f.disableThirdPartyCalls && !La))
          )
            ma ||
              ('MCMID' === l
                ? (f._registerCallback(l, C), (ma = f._generateLocalMID()), f.setMarketingCloudVisitorID(ma))
                : 'MCAID' === l
                  ? (f._registerCallback(l, C), (ma = ''), f.setAnalyticsVisitorID(ma))
                  : ((ma = ''), (R = !0)));
          else if (
            ('MCMID' === l || 'MCOPTOUT' === l
              ? (Y = 'MC')
              : 'MCAAMLH' === l || 'MCAAMB' === l
                ? (Y = 'AAM')
                : 'MCAID' === l && (Y = 'A'),
            Y)
          )
            return (
              !x ||
                (null != f._loading && f._loading[Y]) ||
                (null == f._loading && (f._loading = {}),
                (f._loading[Y] = !0),
                f._loadData(
                  Y,
                  x,
                  function (cb) {
                    f._getField(l) ||
                      (cb && Na.setState(Y, !0),
                      (cb = ''),
                      'MCMID' === l ? (cb = f._generateLocalMID()) : 'AAM' === Y && (cb = { error_msg: 'timeout' }),
                      f._setFields(Y, cb));
                  },
                  U,
                )),
              f._registerCallback(l, C),
              ma || (x || f._setFields(Y, { id: va }), '')
            );
        return (
          ('MCMID' !== l && 'MCAID' !== l) || ma !== va || ((ma = ''), (R = !0)), C && R && f._callCallback(C, [ma]), ma
        );
      };
      f._setMarketingCloudFields = function (l) {
        f._readVisitor();
        f._setFields('MC', l);
      };
      f._mapCustomerIDs = function (l) {
        f.getAudienceManagerBlob(l, !0);
      };
      f._setAnalyticsFields = function (l) {
        f._readVisitor();
        f._setFields('A', l);
      };
      f._setAudienceManagerFields = function (l) {
        f._readVisitor();
        f._setFields('AAM', l);
      };
      f._getAudienceManagerURLData = function (l) {
        var x = f.audienceManagerServer,
          C = '',
          R = f._getField('MCMID'),
          U = f._getField('MCAAMB', !0),
          Y = f._getField('MCAID');
        Y = Y && Y !== va ? '&d_cid_ic=AVID%01' + encodeURIComponent(Y) : '';
        if ((f.loadSSL && f.audienceManagerServerSecure && (x = f.audienceManagerServerSecure), x)) {
          var ma,
            La,
            Da = f.getCustomerIDs();
          if (Da)
            for (ma in Da)
              !Object.prototype[ma] &&
                ((La = Da[ma]),
                (Y +=
                  '&d_cid_ic=' +
                  encodeURIComponent(ma) +
                  '%01' +
                  encodeURIComponent(La.id ? La.id : '') +
                  (La.authState ? '%01' + La.authState : '')));
          l ||= '_setAudienceManagerFields';
          x = 'http' + (f.loadSSL ? 's' : '') + '://' + x + '/id';
          R =
            'd_visid_ver=' +
            f.version +
            (X && -1 !== x.indexOf('demdex.net') ? '&gdpr=1&gdpr_force=1&gdpr_consent=' + X : '') +
            '&d_rtbd=json&d_ver=2' +
            (!R && f._use1stPartyMarketingCloudServer ? '&d_verify=1' : '') +
            '&d_orgid=' +
            encodeURIComponent(f.marketingCloudOrgID) +
            '&d_nsid=' +
            (f.idSyncContainerID || 0) +
            (R ? '&d_mid=' + encodeURIComponent(R) : '') +
            (f.idSyncDisable3rdPartySyncing || f.disableThirdPartyCookies ? '&d_coppa=true' : '') +
            (!0 === Sa ? '&d_coop_safe=1' : !1 === Sa ? '&d_coop_unsafe=1' : '') +
            (U ? '&d_blob=' + encodeURIComponent(U) : '') +
            Y;
          U = ['s_c_il', f._in, l];
          return (
            (C = x + '?' + R + '&d_cb=s_c_il%5B' + f._in + '%5D.' + l), { url: C, corsUrl: x + '?' + R, callback: U }
          );
        }
        return { url: C };
      };
      f.appendVisitorIDsTo = function (l) {
        try {
          var x = [
            ['MCMID', f._getField('MCMID')],
            ['MCAID', f._getField('MCAID')],
            ['MCORGID', f.marketingCloudOrgID],
          ];
          return f._addQuerystringParam(l, 'adobe_mc', M(x));
        } catch (C) {
          return l;
        }
      };
      f.appendSupplementalDataIDTo = function (l, x) {
        if (!(x = x || f.getSupplementalDataID(ea.generateRandomString(), !0))) return l;
        try {
          var C = M([
            ['SDID', x],
            ['MCORGID', f.marketingCloudOrgID],
          ]);
          return f._addQuerystringParam(l, 'adobe_mc_sdid', C);
        } catch (R) {
          return l;
        }
      };
      var ea = {
        parseHash: function (l) {
          var x = l.indexOf('#');
          return 0 < x ? l.substr(x) : '';
        },
        hashlessUrl: function (l) {
          var x = l.indexOf('#');
          return 0 < x ? l.substr(0, x) : l;
        },
        addQueryParamAtLocation: function (l, x, C) {
          l = l.split('&');
          return (C = null != C ? C : l.length), l.splice(C, 0, x), l.join('&');
        },
        isFirstPartyAnalyticsVisitorIDCall: function (l, x, C) {
          if ('MCAID' !== l) return !1;
          var R;
          return (
            (x ||= f.trackingServer),
            (C ||= f.trackingServerSecure),
            !('string' != typeof (R = f.loadSSL ? C : x) || !R.length) &&
              0 > R.indexOf('2o7.net') &&
              0 > R.indexOf('omtrdc.net')
          );
        },
        isObject: function (l) {
          return !(!l || l !== Object(l));
        },
        removeCookie: function (l) {
          qa.remove(l, { domain: f.cookieDomain });
        },
        isTrackingServerPopulated: function () {
          return !!f.trackingServer || !!f.trackingServerSecure;
        },
        getTimestampInSeconds: function () {
          return Math.round(new Date().getTime() / 1e3);
        },
        parsePipeDelimetedKeyValues: function (l) {
          return l.split('|').reduce(function (x, C) {
            C = C.split('=');
            return (x[C[0]] = decodeURIComponent(C[1])), x;
          }, {});
        },
        generateRandomString: function (l) {
          l = l || 5;
          for (var x = ''; l--; ) x += 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(36 * Math.random())];
          return x;
        },
        normalizeBoolean: function (l) {
          return 'true' === l || ('false' !== l && l);
        },
        parseBoolean: function (l) {
          return 'true' === l || ('false' !== l && null);
        },
        replaceMethodsWithFunction: function (l, x) {
          for (var C in l) l.hasOwnProperty(C) && 'function' == typeof l[C] && (l[C] = x);
          return l;
        },
      };
      f._helpers = ea;
      var ta = oa(f, xa);
      f._destinationPublishing = ta;
      f.timeoutMetricsLog = [];
      var Na = {
        isClientSideMarketingCloudVisitorID: null,
        MCIDCallTimedOut: null,
        AnalyticsIDCallTimedOut: null,
        AAMIDCallTimedOut: null,
        fieldGroupObj: {},
        setState: function (l, x) {
          switch (l) {
            case 'MC':
              !1 === x ? !0 !== this.MCIDCallTimedOut && (this.MCIDCallTimedOut = !1) : (this.MCIDCallTimedOut = x);
              break;
            case 'A':
              !1 === x
                ? !0 !== this.AnalyticsIDCallTimedOut && (this.AnalyticsIDCallTimedOut = !1)
                : (this.AnalyticsIDCallTimedOut = x);
              break;
            case 'AAM':
              !1 === x ? !0 !== this.AAMIDCallTimedOut && (this.AAMIDCallTimedOut = !1) : (this.AAMIDCallTimedOut = x);
          }
        },
      };
      f.isClientSideMarketingCloudVisitorID = function () {
        return Na.isClientSideMarketingCloudVisitorID;
      };
      f.MCIDCallTimedOut = function () {
        return Na.MCIDCallTimedOut;
      };
      f.AnalyticsIDCallTimedOut = function () {
        return Na.AnalyticsIDCallTimedOut;
      };
      f.AAMIDCallTimedOut = function () {
        return Na.AAMIDCallTimedOut;
      };
      f.idSyncGetOnPageSyncInfo = function () {
        return f._readVisitor(), f._getField('MCSYNCSOP');
      };
      f.idSyncByURL = function (l) {
        if (!f.isOptedOut()) {
          var x = l || {},
            C = x.minutesToLive,
            R = '';
          var U =
            ((f.idSyncDisableSyncs || f.disableIdSyncs) && (R = R || 'Error: id syncs have been disabled'),
            ('string' == typeof x.dpid && x.dpid.length) || (R = R || 'Error: config.dpid is empty'),
            ('string' == typeof x.url && x.url.length) || (R = R || 'Error: config.url is empty'),
            void 0 === C
              ? (C = 20160)
              : ((C = parseInt(C, 10)),
                (isNaN(C) || 0 >= C) && (R = R || 'Error: config.minutesToLive needs to be a positive number')),
            { error: R, ttl: C });
          if (U.error) return U.error;
          var Y, ma;
          x = l.url;
          C = encodeURIComponent;
          R = ta;
          return (
            (x = x.replace(/^https:/, '').replace(/^http:/, '')),
            (Y = aa.encodeAndBuildRequest(['', l.dpid, l.dpuuid || ''], ',')),
            (ma = ['ibs', C(l.dpid), 'img', C(x), U.ttl, '', Y]),
            R.addMessage(ma.join('|')),
            R.requestToProcess(),
            'Successfully queued'
          );
        }
      };
      f.idSyncByDataSource = function (l) {
        if (!f.isOptedOut())
          return l === Object(l) && 'string' == typeof l.dpuuid && l.dpuuid.length
            ? ((l.url = '//dpm.demdex.net/ibs:dpid=' + l.dpid + '&dpuuid=' + l.dpuuid), f.idSyncByURL(l))
            : 'Error: config or config.dpuuid is empty';
      };
      hb(f, ta);
      f._getCookieVersion = function (l) {
        l = l || f.cookieRead(f.cookieName);
        return (l = T.exec(l)) && 1 < l.length ? l[1] : null;
      };
      f._resetAmcvCookie = function (l) {
        var x = f._getCookieVersion();
        (x && !ka.isLessThan(x, l)) || ea.removeCookie(f.cookieName);
      };
      f.setAsCoopSafe = function () {
        Sa = !0;
      };
      f.setAsCoopUnsafe = function () {
        Sa = !1;
      };
      (function () {
        if (((f.configs = Object.create(null)), ea.isObject(w)))
          for (var l in w) !Object.prototype[l] && ((f[l] = w[l]), (f.configs[l] = w[l]));
      })();
      (function () {
        [
          ['getMarketingCloudVisitorID'],
          ['setCustomerIDs', void 0],
          ['getAnalyticsVisitorID'],
          ['getAudienceManagerLocationHint'],
          ['getLocationHint'],
          ['getAudienceManagerBlob'],
        ].forEach(function (l) {
          var x = l[0],
            C = 2 === l.length ? l[1] : '',
            R = f[x];
          f[x] = function (U) {
            return Q() && f.isAllowed()
              ? R.apply(f, arguments)
              : ('function' == typeof U && f._callCallback(U, [C]), C);
          };
        });
      })();
      f.init = function () {
        if (f.configs.doesOptInApply && (!ba.optIn.isComplete || !Q())) return ba.optIn.fetchPermissions(L, !0);
        !(function () {
          if (ea.isObject(w)) {
            f.idSyncContainerID = f.idSyncContainerID || 0;
            Sa = 'boolean' == typeof f.isCoopSafe ? f.isCoopSafe : ea.parseBoolean(f.isCoopSafe);
            f.resetBeforeVersion && f._resetAmcvCookie(f.resetBeforeVersion);
            f._attemptToPopulateIdsFromUrl();
            f._attemptToPopulateSdidFromUrl();
            f._readVisitor();
            var l = f._getField('MCIDTS'),
              x = Math.ceil(new Date().getTime() / 864e5);
            f.idSyncDisableSyncs ||
              f.disableIdSyncs ||
              !ta.canMakeSyncIDCall(l, x) ||
              (f._setFieldExpire('MCAAMB', -1), f._setField('MCIDTS', x));
            f.getMarketingCloudVisitorID();
            f.getAudienceManagerLocationHint();
            f.getAudienceManagerBlob();
            f._mergeServerState(f.serverState);
          } else f._attemptToPopulateIdsFromUrl(), f._attemptToPopulateSdidFromUrl();
        })();
        (function () {
          if (!f.idSyncDisableSyncs && !f.disableIdSyncs) {
            ta.checkDPIframeSrc();
            ua.addEventListener('load', function () {
              xa.windowLoaded = !0;
              var l = ta;
              l.readyToAttachIframe() && l.attachIframe();
            });
            try {
              Ja.receiveMessage(function (l) {
                ta.receiveMessage(l.data);
              }, ta.iframeHost);
            } catch (l) {}
          }
        })();
        (function () {
          f.whitelistIframeDomains &&
            sa &&
            ((f.whitelistIframeDomains =
              f.whitelistIframeDomains instanceof Array ? f.whitelistIframeDomains : [f.whitelistIframeDomains]),
            f.whitelistIframeDomains.forEach(function (l) {
              var x = new Ia(v, l);
              x = fa(f, x);
              Ja.receiveMessage(x, l);
            }));
        })();
      };
    };
    $a.config = Ya;
    c.Visitor = $a;
    var jb = function (v) {
        if (aa.isObject(v))
          return Object.keys(v)
            .filter(function (w) {
              return '' !== v[w];
            })
            .reduce(function (w, p) {
              var z = 'doesOptInApply' !== p ? v[p] : Ya.normalizeConfig(v[p]);
              z = aa.normalizeBoolean(z);
              return (w[p] = z), w;
            }, Object.create(null));
      },
      kb = h.OptIn,
      lb = h.IabPlugin;
    return (
      ($a.getInstance = function (v, w) {
        if (!v) throw Error('Visitor requires Adobe Marketing Cloud Org ID.');
        0 > v.indexOf('@') && (v += '@AdobeOrg');
        var p = (function () {
          var Q = c.s_c_il;
          if (Q)
            for (var O = 0; O < Q.length; O++) {
              var L = Q[O];
              if (L && 'Visitor' === L._c && L.marketingCloudOrgID === v) return L;
            }
        })();
        if (p) return p;
        p = jb(w);
        !(function (Q) {
          var O = c.adobe,
            L;
          (L = c.adobe.optIn) ||
            ((L = aa.pluck(
              Q,
              'doesOptInApply previousPermissions preOptInApprovals isOptInStorageEnabled optInStorageExpiry isIabContext'.split(
                ' ',
              ),
            )),
            (Q = (Q = Q.optInCookieDomain || Q.cookieDomain) || ya()),
            (Q = Q === window.location.hostname ? '' : Q),
            (L.optInCookieDomain = Q),
            (Q = new kb(L, { cookies: qa })),
            L.isIabContext && ((L = new lb(window.__cmp)), Q.registerPlugin(L)),
            (L = Q));
          O.optIn = L;
        })(p || {});
        var z = v.split('').reverse().join('');
        w = new $a(v, null, z);
        aa.isObject(p) && p.cookieDomain && (w.cookieDomain = p.cookieDomain);
        c.s_c_il.splice(--c.s_c_in, 1);
        var J = aa.getIeVersion();
        if ('number' == typeof J && 10 > J) return w._helpers.replaceMethodsWithFunction(w, function () {});
        try {
          var M = c.self !== c.parent;
        } catch (Q) {
          M = !0;
        }
        M =
          M &&
          !(function (Q) {
            return (
              Q.cookieWrite('TEST_AMCV_COOKIE', 'T', 1),
              'T' === Q.cookieRead('TEST_AMCV_COOKIE') && (Q._helpers.removeCookie('TEST_AMCV_COOKIE'), !0)
            );
          })(w) &&
          c.parent
            ? new Ga(v, p, w, c.parent)
            : new $a(v, p, z);
        return (w = null), M.init(), M;
      }),
      (function () {
        function v() {
          $a.windowLoaded = !0;
        }
        c.addEventListener ? c.addEventListener('load', v) : c.attachEvent && c.attachEvent('onload', v);
        $a.codeLoadEnd = new Date().getTime();
      })(),
      $a
    );
  })(),
  dPeriod = /.+\.(com\.au|org\.au|co\.nz|co\.uk)$/i.test(location.hostname) ? 3 : 2;
dLen = location.hostname.split('.').length;
dRoot = location.hostname
  .split('.')
  .slice(dLen - dPeriod)
  .join('.');
tServer = 'metrics.westpacgroup.com.au';
tSecServer = 'smetrics.westpacgroup.com.au';
/westpac\.com\.au/i.test(dRoot)
  ? ((tServer = 'metrics.westpac.com.au'), (tSecServer = 'smetrics.westpac.com.au'))
  : /stgeorge\.com\.au/i.test(dRoot)
    ? ((tServer = 'metrics.stgeorge.com.au'), (tSecServer = 'smetrics.stgeorge.com.au'))
    : /bankofmelbourne\.com\.au/i.test(dRoot)
      ? ((tServer = 'metrics.bankofmelbourne.com.au'), (tSecServer = 'smetrics.bankofmelbourne.com.au'))
      : /banksa\.com\.au/i.test(dRoot)
        ? ((tServer = 'metrics.banksa.com.au'), (tSecServer = 'smetrics.banksa.com.au'))
        : /bt\.com\.au/i.test(dRoot) && ((tServer = 'metrics.bt.com.au'), (tSecServer = 'smetrics.bt.com.au'));
var visitor = Visitor.getInstance('3A4B7BAF56F01DA67F000101@AdobeOrg', {
  trackingServer: tServer,
  trackingServerSecure: tSecServer,
  marketingCloudServer: tServer,
  marketingCloudServerSecure: tSecServer,
  cookieDomain: dRoot,
  disableIdSyncs: !0,
  overwriteCrossDomainMCIDAndAID: !0,
});
window.serverState && (visitor.resetState(window.serverState), delete window.serverState);
var cookieMID,
  regexMid = 'MCMID=(.*?)(?=\\?|&|;|#|\\/|$)';
regexMid = new RegExp(regexMid, 'i');
var currentMID = visitor.getMarketingCloudVisitorID() || '';
(cookieMID = regexMid.test(document.cookie) ? document.cookie.match(regexMid)[0] : '') && currentMID
  ? ((cookieMID = cookieMID.replace('MCMID=', '')),
    cookieMID !== currentMID && visitor.setMarketingCloudVisitorID(cookieMID))
  : cookieMID &&
    '' == currentMID &&
    ((cookieMID = cookieMID.replace('MCMID=', '')), visitor.setMarketingCloudVisitorID(cookieMID));
var ctid = {},
  regAuth = RegExp('s_wbc_auth=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
  regWbcid = RegExp('s_wbc-ti=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
  regBizAuth = RegExp('s_biz_auth=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
  regBizid = RegExp('s_biz-ti=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
  regStgAuth = RegExp('s_stg_auth=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
  regStgid = RegExp('s_stg_ti=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
  regBomAuth = RegExp('s_bom_auth=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
  regBomid = RegExp('s_bom_ti=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
  regBsaAuth = RegExp('s_bsa_auth=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
  regBsaid = RegExp('s_bsa_ti=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
  wbc_id = regWbcid.test(document.cookie) ? document.cookie.match(regWbcid)[0].replace('s_wbc-ti=', '') : '',
  wbc_auth = regAuth.test(document.cookie) ? document.cookie.match(regAuth)[0].replace('s_wbc_auth=', '') : '',
  biz_id = regBizid.test(document.cookie) ? document.cookie.match(regBizid)[0].replace('s_biz-ti=', '') : '',
  biz_auth = regBizAuth.test(document.cookie) ? document.cookie.match(regBizAuth)[0].replace('s_biz_auth=', '') : '',
  stg_id = regStgid.test(document.cookie) ? document.cookie.match(regStgid)[0].replace('s_stg_ti=', '') : '',
  stg_auth = regStgAuth.test(document.cookie) ? document.cookie.match(regStgAuth)[0].replace('s_stg_auth=', '') : '',
  bom_id = regBomid.test(document.cookie) ? document.cookie.match(regBomid)[0].replace('s_bom_ti=', '') : '',
  bom_auth = regBomAuth.test(document.cookie) ? document.cookie.match(regBomAuth)[0].replace('s_bom_auth=', '') : '',
  bsa_id = regBsaid.test(document.cookie) ? document.cookie.match(regBsaid)[0].replace('s_bsa_ti=', '') : '',
  bsa_auth = regBsaAuth.test(document.cookie) ? document.cookie.match(regBsaAuth)[0].replace('s_bsa_auth=', '') : '';
if (wbc_id || biz_id)
  wbc_id && (ctid.wbcid = { id: wbc_id, authState: wbc_auth ? wbc_auth : 0 }),
    biz_id && (ctid.bizid = { id: biz_id, authState: biz_auth ? biz_auth : 0 }),
    visitor.setCustomerIDs(ctid);
if (stg_id || bom_id || bsa_id)
  stg_id && (ctid.compassid = { id: stg_id, authState: stg_auth ? stg_auth : 0 }),
    bom_id && (ctid.compassid = { id: bom_id, authState: bom_auth ? bom_auth : 0 }),
    bsa_id && (ctid.compassid = { id: bsa_id, authState: bsa_auth ? bsa_auth : 0 }),
    biz_id && (ctid.bizid = { id: biz_id, authState: biz_auth ? biz_auth : 0 }),
    visitor.setCustomerIDs(ctid);
var util = window.util || {};
util.version = 'U:0.23';
util.w_wtT = window.w_wtT || window.testTracking || {};
util.pathConcatDelim = ':';
util.queryVarsList = '';
util.pathExcludeList = '';
util.pathExcludeDelim = ';';
util.siteID = '';
util.domainPeriod = function (b) {
  return /.+\.(com\.au|org\.au|co\.nz|co\.uk)$/i.test(b || location.hostname) ? 3 : 2;
};
util.cookieDomain = function (b) {
  var a = b || location.hostname;
  b = util.domainPeriod(b);
  var g = a.split('.').length;
  return /[0-9]{1,3}$/i.test(location.hostname)
    ? a
    : '.' +
        a
          .split('.')
          .slice(g - b)
          .join('.');
};
util.location = util.w_wtT.location || window.location;
util.isVisible_ex =
  'util.isVisible(@selector, @element, @tabFlag) \nreturn true if the item is not hidded @tabFlag =0 (default is 1)if tabindex is userd for the visible items';
util.isVisible = function (b, a, g) {
  a =
    (b = b ? document.querySelector && document.querySelector(b) : a) &&
    b.currentStyle &&
    'none' === b.currentStyle.display
      ? !0
      : !1;
  return 0 === g
    ? b && 0 < b.offsetWidth && 0 < b.offsetHeight && !a
    : b && 0 < b.offsetWidth && 0 < b.offsetHeight && -1 < b.tabIndex && !a;
};
util.random_ex = 'util.random() \nreturn an rendom number';
util.random = function () {
  return Math.round(1e9 * Math.abs(Math.sin(new Date().getTime()))) % 1e7;
};
util.loadScript_ex =
  "util.loadScript(@url,@delay,@random, @idVal,@callback) \nload an script async \n@url destination URL, \n@delay is use for setTimeout defauel 4000ms  \n@random supply string which will be replaced by rendom number at runtime\n @idVal any value supplied this will replace {ID} paramer inside the URL  \n@example util.loadScript('//abc.abc.com/pages/scripts/abc.js?id={ID}&g=RAND',4,'RAND','abc123')";
util.loadScript = function (b, a, g, k, n) {
  a = a ? a : 4e3;
  b = g ? String(b).replace(new RegExp(g), util.random()) : String(b);
  b = b.replace(/^https?:/i, '');
  b = k ? String(b).replace(/\{ID\}/g, k) : String(b);
  setTimeout(function () {
    var D = document.createElement('script'),
      B = document.getElementsByTagName('script')[0];
    D.src = document.location.protocol + b;
    D.async = !0;
    D.type = 'text/javascript';
    B.parentNode.insertBefore(D, B);
    n && 'function' === typeof n && n();
  }, a);
};
util.loadImgPixel_ex =
  "util.loadImgPixel(@url,@delay,@random, @idVal, @pageURL) \nload an image \n@url destination URL, \n@delay is use for setTimeout defauel 4000ms  \n@random supply string which will be replaced by rendom number at runtime\n @idVal any value supplied this will replace {ID} paramer inside the URL  \n@example util.loadScript('//abc.abc.com/pages/scripts/abc.js?id={ID}&url={URL}&g={RAND}',4,'{RAND}','abc123','')";
util.loadImgPixel = function (b, a, g, k, n) {
  a = a ? a : 4e3;
  b = g ? String(b).replace(new RegExp(g), util.random()) : String(b);
  b = b.replace(/^https?:/i, '');
  currentUrl = encodeURIComponent(
    n ? n : document.location.origin + document.location.pathname + document.location.search,
  );
  b = String(b).replace(/\{URL\}/g, currentUrl);
  b = k ? String(b).replace(/\{ID\}/g, k) : String(b);
  setTimeout(function () {
    var D = new Image(1, 1);
    D.src = document.location.protocol + b;
    document.body.appendChild(D);
  }, a);
};
util.getExp_ex =
  'util.getExp() \nreturn responsive experence as mob, tab or desktop\based on css class .analytics-experience .pagedetails-experience';
util.getExp = function () {
  var b = util.isVisible,
    a = b('.pagedetails-experience-mob', '', 0) || b('.analytics-experience-mob', '', 0),
    g = b('.pagedetails-experience-tab', '', 0) || b('.analytics-experience-tab', '', 0);
  b = b('.analytics-experience-desktop', '', 0);
  var k = a || (!1 !== a && !1 === b && !g) ? 'mob' : g || (!1 !== g && !1 === b && !a) ? 'tab' : 'desktop';
  util.expOrig = util.expOrig || k;
  null === a && null === g && null === b && (k = util.expOrig);
  return k;
};
util.addHandler_ex = 'util.addHandler(@element, @event, @handler) add event Listener';
util.addHandler = function (b, a, g) {
  b.addEventListener ? b.addEventListener(a, g, !1) : b.attachEvent && b.attachEvent('on' + a, g);
};
util.onReady = function (b) {
  /complete/.test(document.readyState)
    ? b()
    : util.addHandler(window, 'load', function () {
        setTimeout(b, 4);
      });
};
util.cookieRead_ex = 'util.cookieRead(@sKey) \nreturn the value of a given cookie @sKey =cookie name';
util.cookieRead = function (b) {
  return (
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          '(?:(?:^|.*;)\\s*' + encodeURIComponent(b).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$',
        ),
        '$1',
      ),
    ) || ''
  );
};
util.combinedcookieRead_ex =
  'util.combinedcookieRead(@sKey,@cKey) \nreturn the value of a given combined cookie rata @sKey =cookie name @cKey =Combined cookie name \n@return as single value or an array of objects';
util.combinedcookieRead = function (b, a) {
  b = (b = decodeURIComponent(util.cookieRead(b)).match(new RegExp(a + '=(.+?)\\|\\d{13}\\;'), '$1'))
    ? b[1].replace(/\[(\[.*?\])\]/g, '$1')
    : '';
  return (b = b.match(/'(.+?)'/g) ? b.match(/'(.+?)'/g, $1) : b);
};
util.cookieWrite_ex =
  'util.cookieWrite(@sKey, @sValue, @vEnd, @sPath, @sDomain, @bSecure) \nWrite a cookie with given value \n@sKey =cookie name \n@sValue = cookie value, \n@vEnd = cookie expiry \n@sPath = domain path \n@sDomain = cookie domain \n@bSecure = secure flug';
util.cookieWrite = function (b, a, g, k, n, D) {
  if (!b || /^(?:expires|max\-age|path|domain|secure)$/i.test(b)) return !1;
  var B = '';
  g && g.constructor === Date && (B = '; expires=' + g.toUTCString());
  document.cookie =
    encodeURIComponent(b) +
    '=' +
    encodeURIComponent(a) +
    B +
    (n ? '; domain=' + n : '') +
    (k ? '; path=' + k : '') +
    (D ? '; secure' : '');
  return !0;
};
util.cookieAudit = function () {
  return document.cookie.length;
};
util.scriptElement = function (b) {
  var a = document.getElementById(b),
    g = document.getElementsByTagName('script')[0];
  if (a) return a;
  a = document.createElement('script');
  a.id = b;
  a.async = 1;
  g.parentNode.insertBefore(a, g);
  return a;
};
util.cloneObject_ex = 'util.cloneObject(@oToBeCloned, @clones)';
util.cloneObject = function (b, a) {
  var g = b && b.constructor ? b.constructor : void 0;
  var k, n;
  if (!b || (g !== RegExp && g !== Date && g !== Function && g !== Object && g !== Array)) return b;
  switch (g) {
    case RegExp:
      g = new g(
        b.source,
        'g'.substr(0, Number(b.global)) + 'i'.substr(0, Number(b.ignoreCase)) + 'm'.substr(0, Number(b.multiline)),
      );
      break;
    case Date:
      g = new g(b.getTime());
      break;
    case Function:
      g = b;
      break;
    default:
      g = new g();
  }
  a = a || [];
  var D = 0;
  for (k = a.length; D < k; D++) {
    var B = a[D];
    if (B[0] === b) {
      var E = B[1];
      break;
    }
  }
  if (E) return E;
  a.push([b, g]);
  for (n in b) b.hasOwnProperty(n) && (g[n] = b[n] === b ? g : util.cloneObject(b[n], a));
  return g;
};
util.qSA_ex =
  'util.qSA(@doc, @selector, @tag, @attr, @regex) return selected elements \n@doc = document  \n@selector = any selecton \nFor non supported browser: \n@tag, @attr, @regex';
util.qSA = function (b, a, g, k, n) {
  var D = [],
    B;
  if (b && b.querySelectorAll) D = b.querySelectorAll(a);
  else if (((g = b && b.getElementsByTagName(g)), k && n))
    for (b = 0, a = g.length; b < a; b++)
      (B = 'class' === k ? g[b].className : g[b].getAttribute(k)) && n.test(B) && D.push(g[b]);
  else if (n) for (b = 0, a = g.length; b < a; b++) n.test(g[b].innerHTML) && D.push(g[b]);
  else return g || 0;
  return D;
};
util.getText_ex = 'util.getText(@elem) \nreturn text of any element';
util.getText = function (b) {
  return (b ? b.innerText || b.textContent : '').replace(/^\s+|\s+$/g, '');
};
util.removeNumbers_ex = 'util.removeNumbers(@str) \nremove number from a given string';
util.removeNumbers = function (b) {
  return b.replace(/\s+\(\s*\d+\s*\)$/g, '');
};
util.addCallback = function (b, a, g) {
  var k = util.addCallback;
  k.q = k.q || [];
  b.readyState
    ? (k.q.push(g),
      (b.onreadystatechange = function () {
        if (/loaded|complete/.test(b.readyState) && a())
          for (b.onreadystatechange = null; k.q.length; ) {
            var n = k.q.shift();
            n();
          }
      }))
    : util.addHandler(b, 'load', function () {
        a() && g();
      });
};
util.guidRgx = /\b\w{8}-\w{4}-\w{4}-\w{4}-\w{12}\b/g;
util.guidBt = /\b(\/|a=)\w{48}(\/|$)\b/g;
util.guidCompass = /\bnameId=\w{64}\b/g;
util.guidAce = /ACEdata=\w{634}\b/g;
util.guidMid = RegExp('adobe_mc=(.*?)(?=\\?|&|;|#|\\/|$)', 'i');
util.guidAid = RegExp('(adobe_aa_vid|s_vi|s_vid)=(.*?)(?=\\?|&|;|#|\\/|$)', 'i');
util.dateUrl = /\b\d{4}-\d{1,2}-\d{1,2}\b/g;
util.guidWebMid = RegExp('webmid=(.*?)(?=\\?|&|;|#|\\/|$)', 'i');
util.wLiveId = RegExp(
  '(accountglobalid|paymentid|payeeendpointid|memberid|workflowid|ppid|alertid|billid|compartmentid|messageid|(\\?|&|#)id)=(.*?)(?=\\?|&|;|#|\\/|$)',
  'i',
);
util.latlong = RegExp('(\\-?)\\d{1,3}\\.\\d{6}:(\\-?)\\d{1,3}\\.\\d{6}', 'i');
util.cleanJSON_ex = 'util.cleanJSON(@JSONdata) \n remove non-printable and other non-valid JSON chars';
util.cleanJSON = function (b) {
  b = b
    .replace(/\\n/g, '\\n')
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, '\\&')
    .replace(/\\r/g, '\\r')
    .replace(/\\t/g, '\\t')
    .replace(/\\b/g, '\\b')
    .replace(/\\f/g, '\\f');
  b = b.replace(/[\u0000-\u0019]+/g, '');
  return JSON.parse(b);
};
util.cleanURL_ex =
  'util.cleanURL(@loc, @locType) \nremove guidRgx,referrer querystring parameter, multiple slashes, session ID,hash or hashbang@locType = 1 remove cid';
util.cleanURL = function (b, a) {
  b = (b || '')
    .replace(/(\w)\/\/+/g, '$1/')
    .replace(/((?:&|\?)referrer=.*?(?=&|$))/gi, '')
    .replace(/(^https?:.+?(?:online|banking).+\/cust\/wps\/(my)?portal\/[pw]ol\/)!ut\/.*/i, '$1oregon-application')
    .replace(/(^https?:.+?(forms|online)(?:\.|-).*\.nsf.*?)(?:\/\w{32}(?=\?))/i, '$1')
    .replace(util.guidRgx, '')
    .replace(util.guidBt, '')
    .replace(/\baccountGlobalId=\w{128}\b/g, '')
    .replace(util.guidMid, '')
    .replace(util.guidWebMid, '')
    .replace(util.wLiveId, '')
    .replace(util.latlong, '')
    .replace(util.guidCompass, '')
    .replace(util.guidAce, '')
    .replace(/#+!*$/, '')
    .replace(/(default|index)(\.html|\.htm)/, '')
    .replace(/\.html|\.htm/, '');
  1 === a && (/(\?|&)(cid=.+|openform|readform|opendocument|funcreqd)/i.test(b) || (b = b.replace(/(\?|&|#).*/, '')));
  2 === a && (b = b.replace(/(\?|&|#).*/, ''));
  return b;
};
util.cleanGUID = function (b) {
  return (b || '')
    .replace(util.guidRgx, '(GUID)')
    .replace(util.guidBt, '(GUID)')
    .replace(/\baccountGlobalId=\w{128}\b/g, '(GUID)')
    .replace(/guid=\w{32}\b/g, '(GUID)')
    .replace(util.guidMid, '(MCMID)')
    .replace(util.guidWebMid, '(WEBMID)')
    .replace(util.wLiveId, '(WLID)')
    .replace(util.guidAid, '(AID)')
    .replace(util.dateUrl, '(DATE)')
    .replace(util.latlong, '(GEO)')
    .replace(util.guidCompass, '(COMPASS)')
    .replace(util.guidAce, '(GUID)')
    .replace(/(state=)(.+)&/g, '$1(GUID)&');
};
util.getLoc_ex = 'util.getLoc() return full current URL for test or prod';
util.getLoc = function () {
  return util.w_wtT.location || window.location;
};
util.defaultPage = /^\/((default|index)\.html?)?$/.test(util.getLoc().pathname) ? 'home' : '';
util.pageURL = util.cleanURL(util.getLoc().href, 1);
util.ssl = 'https:' === util.getLoc().protocol;
util.timePart = function () {
  var b = new Date();
  return (
    'Sun Mon Tue Wed Thu Fri Sat'.split(' ')[b.getDay()] +
    ' ' +
    ('00' + b.getHours()).slice(-2) +
    ':' +
    (29 < b.getMinutes() ? '30' : '00')
  );
};
util.lowerCase_ex = 'util.lowerCase(@val, @alt) \nlower case strings or (not set) if empty';
util.lowerCase = function (b, a) {
  return String(b || (a ? '(not set)' : '')).toLowerCase();
};
util.clean_ex = 'util.clean(@str) \nclean strings - trim and remove multiple spaces for consistency';
util.clean = function (b) {
  return (b ? String(b) : '').replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
};
util.fixZero_ex = "util.fixZero(@val) return 'zero' for '0' value";
util.fixZero = function (b) {
  return '0' === String(b) ? 'zero' : b;
};
util.srchTerm = function (b) {
  var a = 8;
  if (b)
    for (b = util.lowerCase(b); a--; )
      b = b.replace(new RegExp('(\\d{4}.?)\\d{' + (a + 1) + ',}', 'g'), '$1' + '########'.substring(0, a + 1));
  return b;
};
util.cap_ex = "util.cap(@item, @cap) \nif item value is greater than, or equal to cap, append '+'";
util.cap = function (b, a) {
  return b >= a ? a + '+' : b;
};
util.addEvt = function (b, a, g) {
  b['ev_' + a] = g ? g : 1;
};
util.addSerialiseEvt = function (b, a, g) {
  b['&&events'] = g ? a + ':' + g : a + ':1';
};
util.fl_ex = 'util.fl(@str, @len) \nreturn substring of a given length';
util.fl = function (b, a) {
  return b ? ('' + b).substring(0, a) : b;
};
util.p_c = function (b, a) {
  var g = b.indexOf('=');
  return a.toLowerCase() == b.substring(0, 0 > g ? b.length : g).toLowerCase() ? b : 0;
};
util.pt_ex =
  'pt - runs function in f argument against list of \nvariables declared in x (delimited by d), with a as an optional \nargument to be included in f function call';
util.pt = function (b, a, g, k) {
  var n = b;
  g = 0;
  for (var D; n; ) {
    D = n.indexOf(a);
    D = 0 > D ? n.length : D;
    n = n.substring(0, D);
    if ((n = util.p_c(n, k))) return n;
    g += D + a.length;
    n = b.substring(g, b.length);
    n = g < b.length ? n : '';
  }
  return '';
};
util.isPageHidden_ex = 'check if whole page is hidden/visible';
util.isPageHidden = function (b) {
  return document.hidden || document.msHidden || document.webkitHidden;
};
util.isHomePage_ex = 'check if the page is home page';
util.isHomePage = function (b) {
  return /^\/((default|index)\.html?)?$/.test(util.getLoc().pathname);
};
util.getPageName = function (b) {
  var a = b || String(util.pageURL),
    g = a.indexOf(':');
  b = a.indexOf('/', g + 4);
  var k = a.indexOf('?'),
    n = util.pathConcatDelim;
  g = util.pathExcludeDelim;
  var D = util.queryVarsList,
    B = util.siteID || '',
    E = 0 > k ? '' : a.substring(k + 1);
  a = a.substring(b + 1, E ? k : a.length);
  k = a.indexOf('#');
  a = 0 > k ? a : util.fl(a, k);
  g = g ? a.indexOf(g) : -1;
  a = 0 > g ? a : util.fl(a, g);
  a += a && '/' != a.charAt(a.length - 1) ? '' : util.defaultPage;
  for (b = n || '/'; a; )
    (g = a.indexOf('/')),
      (g = 0 > g ? a.length : g),
      (k = util.fl(a, g)),
      util.pt(util.pathExcludeList, ',', 'p_c', k) || (B += B ? b + k : k),
      (a = a.substring(g + 1));
  for (b = n || '?'; D; ) {
    g = D.indexOf(',');
    g = 0 > g ? D.length : g;
    k = util.fl(D, g);
    if ((k = util.pt(E, '&', 'p_c', k))) (B += B ? b + k : k), (b = n || '&');
    D = D.substring(g + 1);
  }
  return B;
};
util.getValOnce = function (b, a, g, k) {
  var n = new Date();
  b = b || '';
  var D = a || 'u_gvo';
  g = g || 0;
  k = 'm' == k ? 6e4 : 864e5;
  var B = util.cookieDomain();
  a = util.cookieRead(a);
  b && (n.setTime(n.getTime() + g * k), util.cookieWrite(D, b, 0 == g ? 0 : n, '/', B));
  return b == a ? '' : b;
};
util.getVisitNum = function (b, a, g) {
  var k = new Date(),
    n = util.cookieDomain(),
    D = k.getTime();
  b ||= 'm';
  'm' == b || 'w' == b || 'd' == b
    ? ((eo = util.endof(b)), (y = eo.getTime()), k.setTime(y))
    : k.setTime(D + 864e5 * b);
  a ||= 'u_vnum';
  g ||= 'u_invisit';
  if ((b = util.cookieRead(a)))
    var B = b.indexOf('&vn='),
      E = b.substring(B + 4, b.length);
  if (util.cookieRead(g))
    return E ? (k.setTime(D + 18e5), util.cookieWrite(g, 'true', k, '/', n), E) : 'unknown visit number';
  if (E)
    return (
      E++,
      (B = b.substring(0, B)),
      k.setTime(B),
      util.cookieWrite(a, B + '&vn=' + E, k, '/', n),
      k.setTime(D + 18e5),
      util.cookieWrite(g, 'true', k, '/', n),
      E
    );
  util.cookieWrite(a, k.getTime() + '&vn=1', k, '/', n);
  k.setTime(D + 18e5);
  util.cookieWrite(g, 'true', k, '/', n);
  return 1;
};
util.dimo = function (b, a) {
  return new Date(a, b + 1, 0).getDate();
};
util.endof = function (b) {
  var a = new Date();
  a.setHours(0);
  a.setMinutes(0);
  a.setSeconds(0);
  d = 'm' == b ? util.dimo(a.getMonth(), a.getFullYear()) - a.getDate() + 1 : 'w' == b ? 7 - a.getDay() : 1;
  a.setDate(a.getDate() + d);
  return a;
};
util.serial = function () {
  var b = ('0000000' + Math.floor(268435456 * Math.random()).toString(16)).slice(-7) + String(+new Date());
  return 20 === String(b).length ? b : '';
};
util.serialise = function (b, a) {
  b = b && String(b).replace(/\W/g, '');
  var g = util.lStor('get', 'appmeasurement_aoSerials'),
    k = new Date();
  k = String(k.getFullYear()) + (k.getMonth() + 1) + k.getDate();
  var n = util.getVisitNum(365);
  k += 1 <= n ? n : 0;
  n = util.serial();
  var D = '';
  b &&
    ('start' === a || 'complete' === a) &&
    (0 !== g.indexOf(k + ',') && util.lStor('set', 'appmeasurement_aoSerials', k + ',' + b + '=' + n + a),
    (g = util.lStor('get', 'appmeasurement_aoSerials'))) &&
    ((D = (D = g.match(new RegExp(',' + b + '=(.{20}(start|complete)?)(?=,|$)'))) && D[1] ? D[1] : '')
      ? ('complete' === a &&
          20 === D.indexOf('start') &&
          util.lStor(
            'set',
            'appmeasurement_aoSerials',
            g.replace(new RegExp('(,' + b + '=.{20})(start)(?=,|$)'), '$1' + a),
          ),
        'start' === a &&
          20 === D.indexOf('complete') &&
          (util.lStor(
            'set',
            'appmeasurement_aoSerials',
            g.replace(new RegExp('(,' + b + '=)(.{20})(complete)(?=,|$)'), '$1' + n + a),
          ),
          (D = n)),
        (D = D.slice(0, 20)))
      : (util.lStor('set', 'appmeasurement_aoSerials', g + ',' + b + '=' + n + a), (D = n)));
  return 20 === String(D).length ? D : '';
};
util.lStor = function (b, a, g) {
  try {
    if ('set' === b) {
      if (/^reset$/i.test(g)) localStorage.removeItem(a);
      else {
        if ('string' !== typeof g)
          try {
            g = JSON.stringify(g);
          } catch (k) {
            g = '';
          }
        localStorage.setItem(a, g);
      }
      return !0;
    }
    if ('get' === b) return localStorage.getItem(a) || '';
  } catch (k) {
    return '';
  }
};
util.valReplace = function (b, a) {
  a = a || [];
  var g = b;
  try {
    'string' === typeof a && (a = JSON.parse(a));
  } catch (D) {
    a = [];
  }
  var k = a.length;
  for (b = 0; b < k; b++) {
    var n = a[b];
    n.exp && (g = g.replace(new RegExp(n.exp, n.flags || ''), n.subs || ''));
  }
  return g;
};
util.getQueryParam =
  'util.getQueryParam(@parameters, @delimiter, @url, @startFromHash) \nReturn a Query Param value(s)';
util.getQueryParam = function (b, a, g, k) {
  var n = b.split(',');
  a = a || '';
  g = String(g || util.getLoc().href || window.location);
  var D = n.length;
  k = 1 === k ? '#(?:.*?&)?' : '(?:\\?|&|;|#)';
  var B = [];
  if (b)
    for (b = 0; b < D; b++) {
      var E = new RegExp(k + n[b] + '=(.*?)(?=\\?|&|;|#|/|$)', 'i');
      (E = E.exec(g)) && B.push(decodeURIComponent(E[1].replace(/\+/g, '%20')));
    }
  return B.join(a);
};
util.prodArr = function (b) {
  var a = 0,
    g;
  if (b && 'object' !== typeof b) {
    b = String(b).split(',');
    var k = [];
    for (g = b.length; a < g; a++) b[a] && k.push({ prod: b[a] });
  } else k = b || [];
  return k;
};
util.moduleLookup = function (b, a) {
  var g,
    k = {},
    n = [];
  var D = 0;
  for (g = a.length; D < g; D++) k[a[D].split('=')[0]] = a[D].split('=')[1];
  D = 0;
  for (g = b.length; D < g; D++) k[b[D]] && n.push(k[b[D]]);
  n = n.join(',');
  95 < n.length && -1 < n.indexOf(',') && (n = n.substring(0, n.lastIndexOf(',', 93)) + ',+');
  return n;
};
util.amntBnds_ex = 'util.amntBnds(@type, @Value) \nReturns bands of any value';
util.amntBnds = function (b, a) {
  var g = { range: b + ':NaN', avg: 0 },
    k;
  if (isNaN(a)) return g;
  a = Math.round(a) / 1e3;
  var n = {
    0: { min: -1, max: 0, avg: 0 },
    '0-100': { min: 0, max: 0.1, avg: 0.05 },
    '100-500': { min: 0.1, max: 0.5, avg: 0.3 },
    '500-1K': { min: 0.5, max: 1, avg: 0.75 },
    '1K-2K': { min: 1, max: 2, avg: 1.5 },
    '2K-5K': { min: 2, max: 5, avg: 3.5 },
    '5K-10K': { min: 5, max: 10, avg: 7.5 },
    '10K-20K': { min: 10, max: 20, avg: 15 },
    '20K-30K': { min: 20, max: 30, avg: 25 },
    '30K-50K': { min: 30, max: 50, avg: 40 },
    '50K-100K': { min: 50, max: 100, avg: 75 },
    '100K-150K': { min: 100, max: 150, avg: 125 },
    '150K-200K': { min: 150, max: 200, avg: 175 },
    '200K-250K': { min: 200, max: 250, avg: 225 },
    '250K-300K': { min: 250, max: 300, avg: 275 },
    '300K-400K': { min: 300, max: 400, avg: 350 },
    '400K-500K': { min: 400, max: 500, avg: 450 },
    '500K-600K': { min: 500, max: 600, avg: 550 },
    '600K-700K': { min: 600, max: 700, avg: 650 },
    '700K-800K': { min: 700, max: 800, avg: 750 },
    '800K-1M': { min: 800, max: 1e3, avg: 900 },
    '1M+': { min: 1e3, max: '+', avg: 1e3 },
  };
  for (k in n)
    if (n.hasOwnProperty(k) && a > n[k].min && ('+' === n[k].max || a <= n[k].max)) {
      g.range = b ? b + ':' + k : k;
      g.avg = 1e3 * n[k].avg;
      break;
    }
  return g;
};
util.ageBnds_ex = 'util.amntAge(@text, @Value) \nReturns bands of any value';
util.ageBnds = function (b, a) {
  var g = { range: b + ':NaN' },
    k;
  if (isNaN(a)) return g;
  var n = {
    '18<': { min: 0, max: 18 },
    '18-30': { min: 19, max: 30 },
    '31-40': { min: 31, max: 40 },
    '41-50': { min: 41, max: 50 },
    '61-70': { min: 61, max: 70 },
    '71-80': { min: 71, max: 80 },
    '80+': { min: 81, max: 200 },
  };
  for (k in n)
    if (n.hasOwnProperty(k) && a > n[k].min && a <= n[k].max) {
      g.range = b ? b + ':' + k : k;
      break;
    }
  return g;
};
util.setFormFieldVar = function (b, a, g) {
  var k = '';
  if ('string' == typeof g) k = g;
  else
    for (lp in g)
      if (g.hasOwnProperty(lp)) {
        var n = isNaN(g[lp])
          ? g[lp]
          : lp.match(/age/gi)
            ? util.ageBnds('', g[lp]).range
            : util.amntBnds('', g[lp]).range;
        k = k + lp + ':' + n + '|';
      }
  k = k
    .replace(/propertyType/gi, 'pType')
    .replace(/propertyPurpose/gi, 'pPurp')
    .replace(/firstHomeBuyer/gi, 'fHB')
    .replace(/buyingStage/gi, 'bStg')
    .replace(/borrowAmt/gi, 'bAmt')
    .replace(/depositAmt/gi, 'dAmt')
    .replace(/repaymentType/gi, 'rType')
    .replace(/totalIncomeAmt/gi, 'incAmt')
    .replace(/totalExpenseAmt/gi, 'expAmt')
    .replace(/totalLiability/gi, 'liaAmt')
    .replace(/loanAmtOffered/gi, 'loanAmt')
    .replace(/savingsBank/gi, 'savBank')
    .replace(/savedAmt/gi, 'savAmt')
    .replace(/propertyAddress/gi, 'pAddr')
    .replace(/estPropertyValue/gi, 'epVal')
    .replace(/\|$/g, '');
  b = (b ? b : '') + (a ? ':' + a : '');
  return (b ? b + '_' : '') + k;
};
util.setInteractionVars = function (b) {
  var a = b.calculatorType,
    g = b.calculatorName,
    k = b.loanAmount || '',
    n = b.depositAmount || '',
    D = b.transactionAmount || '',
    B = b.loanTerm || '',
    E = b.depositTerm || '',
    K = b.prodSelected || '',
    c = b.borrowingPurpose || '',
    h = b.firstHomeBuyer || '',
    m = b.propertyType || '',
    r = b.loanType || '';
  b = b.propertyValue || '';
  var u,
    H = util.amntBnds;
  a = (a ? a : '(not set)') + ':' + (g ? g : '(not set)');
  b && ((prptyValRange = H('', b)), (b = prptyValRange.range));
  if (c || h || m || r || b)
    var A =
      'PROP_' + (c ? '' + c : '') + (h ? ';' + h : '') + (m ? ';' + m : '') + (r ? ';' + r : '') + (b ? ';' + b : '');
  K && (u = 'PROD_' + K);
  if (k || n || D) {
    k = H('', k || n || D);
    k = k.range;
    var G = 'AMNT_' + k;
  }
  if (B || E) var N = 'TERM_' + B || E;
  return {
    amountVar: G,
    termVar: N,
    productVar: u,
    propertyVar: A,
    calculatorName: a,
    calculatorDetails:
      'calc_' + (G ? '|' + G : '') + (N ? '|' + N : '') + (u ? '|' + u : '') + (A ? '|' + A : '') + '|',
  };
};
util.appStatusSetup = function (b) {
  if (Array.isArray(b)) {
    for (var a = [], g = 0; g < b.length; g++) {
      var k = b[g];
      a.push(
        'accStatus:' +
          k.accountStatus +
          '|proStatus:' +
          k.profileStatus +
          '|verStatus:' +
          k.verificationStatus +
          '|exceCode:' +
          k.exceptionCode,
      );
    }
    return a.join(';');
  }
  return JSON.stringify(b)
    .replace(/(\[|\]|\{|\}|'|")/gi, '')
    .replace(/,/gi, '|');
};
util.createTransID = function (b) {
  for (var a = [], g = 0; g < b.length; g++) {
    var k = b[g];
    a.push(k.prod + '_' + k.Id);
  }
  return a.join(';');
};
var digital = {};
util = window.util || {};
var pdInSession = !1,
  pageDetails = window.pageDetails || {},
  s3_account = 'wbg-banking-dev',
  s3 = s3_gi(s3_account);
s3.w_config = (window[window.WBGAnalyticsObject] || {}).config || {};
s3.w_wtT = window.testTracking || {};
s3.w_prod =
  /^(ibanking|eforms|www.ui)\.(stgeorge|bankofmelbourne|banksa)\.com\.au$/i.test(location.hostname) ||
  /^(?:www|banking|forms|online|businessonline|search|hlc1|locator|www.ui)\.westpac\.com\.au$/i.test(
    location.hostname,
  ) ||
  (/^gs.{8}net\.westpac\.com\.au$/i.test(location.hostname) && /RM\/emulationbanking\b/i.test(location.pathname)) ||
  s3.w_config.prod;
s3.w_isProd = s3.w_config.findProd;
s3.w_isProd && (s3.w_prod = /^prod$/i.test(pageDetails.siteEnv));
s3.w_prod && ((s3_account = 'wbg-banking-prd'), s3.sa(s3_account));
var customVisitorID = util.getQueryParam('MCMID', '', util.getLoc().href) || util.cookieRead('MCMID');
s3.visitor = Visitor.getInstance('3A4B7BAF56F01DA67F000101@AdobeOrg');
s3.w_codeVers = '20210906 prd';
s3.charSet = 'UTF-8';
s3.cookieDomainPeriods = 3;
s3.currencyCode = 'AUD';
s3.trackInlineStats = !0;
s3.linkDownloadFileTypes = 'exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
s3.linkInternalFilters =
  'javascript:,tel:,mailto:,movingtoaustralia.westpac.asia,westpac.com.au,movingtoaustralia.westpac.co.nz,movingtoaustralia.westpac.co.uk,stgeorge.com.au,bankofmelbourne.com.au,banksa.com.au,stgeorge.com,sgb.com.au,einsure.com.au,fxmoneyonline.com.au,' +
  util.getLoc().hostname;
s3.linkLeaveQueryString = !1;
s3.linkTrackVars = 'None';
s3.linkTrackEvents = 'None';
s3.w_ltv = 'server,channel,eVar1,prop1,eVar6,prop6,eVar7,prop15,prop25,eVar25,prop35,eVar35,prop39,prop69,eVar21';
s3.usePlugins = !0;
function s3_doPlugins(b) {
  digital = {};
  var a = !b.linkType,
    g = b.w_config.findBrand || '',
    k = b.w_config.findSite || '',
    n = util.lowerCase,
    D = util.getLoc(),
    B = util.clean,
    E = util.addEvt;
  a = a
    ? b.w_queue.shift() || window.pageDetails
    : util.w_wtT.pageDetails || window.digitalData || window.pageDetails || {};
  g = g ? a.siteBrand : b.w_config.brand || '(not set)';
  k = k ? a.siteName : b.w_config.site || '(not set)';
  var K = B(a.pageName || ''),
    c = n(B(a.pageProperty)),
    h = B(a.dialogTitle),
    m = util.prodArr(a.productID || ''),
    r = n(B(a.formName)),
    u = n(B(a.formType));
  n(B(a.formData));
  n(B(a.newFormName));
  var H = n(B(a.journeyType)),
    A = n(B(a.accountType)),
    G = n(B(a.businessType)),
    N = n(B(a.formIsSTP)),
    S = n(B(a.siteName)),
    W = n(B(a.formVariant)),
    da = n(B(a.formMilestone)),
    aa = a.applicationStatus;
  n(B(a.externalSiteName));
  var Ba = n(B(a.selfserviceDetail)),
    wa = n(a.transactionType),
    Ia = a.transactionAmount || '',
    Ga = [],
    Ua = a.transactionQty || '',
    Oa = n(B(a.transactionDetails || ''));
  n(B(a.prodDescription));
  var fa = a.appReference || '',
    Aa = n(B(a.formStatus)),
    qa = a.setupOptions || '',
    ya = JSON.stringify(a.quoteStatus) || '',
    ka = B(a.searchTerm),
    ha = String(-1 < (String(a.searchResults) || '(not set)') ? util.cap(a.searchResults, 5e3) : '(not set)'),
    Ja = B(a.itemName),
    Xa = a.experience || a.siteExperience || '',
    Qa = a.pageNumber;
  var sa = B(a.subSite);
  var Pa = n(a.externalSiteName);
  var T = B(a.pageNamePrefixes).split('|');
  var oa = n(B(a.campaignCodeList)),
    Ka = n(B(a.promoCodeList)),
    Ya = n(B(a.campaignCode)),
    Fa = n(B(a.promoCode)),
    Ma = util.getValOnce,
    za = b.c_r('lastPage'),
    Ca = util.getQueryParam,
    Za = /\b(appAction=exit|exitapp=yes)\b/i.test(D.href) || b.c_r('s_exitapp');
  nativeAppVersion = b.c_rr('AppVersion');
  voyagerLoadBalancerID = b.c_rr('LBWeb');
  nativeMid = b.c_rr('MCMID');
  pdPreImprs = B(a.preImprs);
  pdPageType = n(a.pageType);
  pdPageStep = n(a.pageStep, 1);
  pdChannel = n(a.channel);
  pdTouchPoint = n(a.touchPoint);
  pdBranchLocationCode = n(a.location);
  pdCalculatorName = n(a.calculatorName);
  pdCalculatorType = n(a.calculatorType);
  pdTrackId = n(a.encryptedID);
  pdGenericId = n(a.genericID);
  pdEmpId = n(a.empId);
  pdBtAdviserID = n(a.adviserId);
  pdPanoramaID = n(a.panoramaId);
  pdGroupCode = n(a.loggedUser);
  pdAddEvents = n(a.addEvents);
  pdErrorCode = n(a.errorCode);
  pdErrorDetails = n(a.errorDetails);
  pdTargetCampaignsList = decodeURIComponent(n(a.targetCampaignViewed));
  pdTargetCampaignClicked = decodeURIComponent(n(a.targetCampaignClicked));
  pdTargetLocationId = decodeURIComponent(n(a.targetLocationId));
  pdTargetClickedLocationId = decodeURIComponent(n(a.targetClickedLocationId));
  pdTargetClickedAction = decodeURIComponent(n(a.targetAction));
  pdPageModules = n(a.pageModules);
  pdExtCampaign = n(a.extCampaign);
  pdInternalCampaignList = n(a.internalCampaignViewed);
  pdInternalCampaignClicked = n(a.internalCampaignClicked);
  pdNotification = a.notification || '';
  pdNotificationDetail = a.notificationDetail || '';
  pdChatbotName = a.chatbotName || '';
  setFormFieldVar = util.setFormFieldVar;
  pdFormFieldObj = a.loanAttributes;
  pdToolsFormFieldObj = a.toolInputs;
  pdToolsDetail = n(a.toolDetails);
  pdToolOutcome = a.toolOutcome || '';
  pageNameDynamicVariable = 'D=pageName';
  pdPageStep = a.pageStep && a.pageAction ? n(a.pageAction, 1) : a.pageAction ? n(a.pageAction, 1) : n(a.pageStep, 1);
  var Ha = a.newFormName && a.formName ? n(B(a.newFormName)) : a.newFormName ? n(B(a.newFormName)) : n(B(a.formName));
  '(not set)' === g &&
    /(?:^|\.)westpac\.com\.au$/i.test(util.getLoc().hostname) &&
    ((g = 'wbc'), (k = (k = /(.+)(?:\.westpac\.com\.au$)/i.exec(util.getLoc().hostname)) ? k[1] : '(not set)'));
  /\bbanking\b/i.test(k) &&
    /^(?:\/secure\/|\/cust\/wps\/(?:my)?portal\/wol\/|\/oregon\/[^\/]+?\/wol\/)/i.test(util.getLoc().pathname) &&
    (pdInSession = !0);
  /net$/i.test(k) &&
    /\/emulationbanking\b/i.test(util.getLoc().pathname) &&
    ((pdInSession = !0), b.w_prod && (k = 'banking-emu'));
  /\bonline\b/i.test(k) &&
    /^(?:\/dforms\/forms\/secure\/|\/cust\/wps\/(?:my)?portal\/wol\/|\/oregon\/[^\/]+?\/wol\/)/i.test(
      util.getLoc().pathname,
    ) &&
    (pdInSession = !0);
  util.siteID = g + ':' + k + (sa ? (a.subSiteSeparator || '-') + sa : '');
  'checkurl' === u && (u = pdInSession ? 'short' : 'long');
  pdPageType &&
    Ha &&
    (('intro' !== pdPageStep && 'welcome' !== pdPageStep) || 'login' === pdPageType
      ? (sa = /(.*)-(.*)/.exec(b.c_r('journeyTypOv'))) &&
        sa[1] === pdPageType + Ha &&
        (H = sa[2] + (H && H !== sa[2] ? '-' + H : ''))
      : b.c_w('journeyTypOv', pdPageType + Ha + '-' + H));
  T = 2 === T.length ? B(pdInSession ? T[0] : T[1]) : '';
  if (
    (sa = Ha || wa) ||
    /^(?:tool|survey|selfservice|registration|payment|login|enquiry|application)$/.test(pdPageType)
  ) {
    sa = sa || '(not set)';
    var t = pdPageType;
    t = n(
      t
        .replace(/application/i, 'app')
        .replace(/enquiry/i, 'enq')
        .replace(/quote/i, 'quo')
        .replace(/selfservice/i, 'ser')
        .replace(/registration/i, 'reg')
        .replace(/payment/i, 'pay')
        .replace(/survey/i, 'sur'),
    );
    T = util.siteID + ':' + (t || '(not set)') + ':' + sa + (K ? ':' + K : '');
  } else T = K ? util.siteID + ':' + (T ? T + ':' : '') + K : decodeURIComponent(util.getPageName(util.pageURL));
  T = B((a.s_pageName || T) + (h ? ':' + h : ''));
  T = n(
    T.replace(/:personal-banking(:|$)/i, ':pers$1')
      .replace(/:business-banking(:|$)/i, ':bus$1')
      .replace(/:corporate-banking(:|$)/i, ':corp$1')
      .replace(/:about-westpac(:|$)/i, ':about$1')
      .replace(/:secure:banking(:|$)/i, ':olb$1')
      .replace(/(.*:)(.*?:emulationbanking)(:|$)/i, '$1olb$3')
      .replace(/^((?:[\.\w\-]*?:){2})mobile$/i, '$1mobile:home')
      .replace(/(.+:atm:.+):-?\d+(.\d+)?:\d+(.\d+)$/i, '$1')
      .replace(/(?:-|_)+/g, '-'),
  );
  /^(?:branch|atm|team)detail$/.test(pdPageType) && E(digital, 'branchATMdetail');
  h = (h = ((m && m[0] && m[0].Product) || (m && m[0] && m[0].prod) || '') + Ha) ? h + u : !1;
  switch (pdPageType) {
    case 'form':
      pdPageStep && fa && (digital['dd.applicationID'] = digital['dd.transactionID'] = pdPageStep + '_' + fa[0].Id);
      'save' === pdPageStep && E(digital, 'formSave');
      'retrieve' === pdPageStep && E(digital, 'formRetrieve');
      break;
    case 'tool':
      digital['dd.toolName'] = r || '(not set)';
      T = digital['dd.toolName'];
      if (pdToolsDetail) digital['dd.toolDetails'] = pdToolsDetail;
      else if (pdCalculatorType && pdCalculatorName) {
        var F = a.calculatorType || '(not set)';
        ha = a.prodSelected || '(not set)';
        N = util.amntBnds('transactions', a.transactionAmount || '(not set)').range;
        digital['dd.toolName'] = pdCalculatorName || '(not set)';
        digital['dd.toolDetails'] = 'tool:' + F + '|product:' + ha + '|' + N;
      }
      pdToolsFormFieldObj && (digital['dd.toolInput'] = setFormFieldVar('', '', pdToolsFormFieldObj));
      'result' === pdPageStep
        ? (E(digital, 'toolResult'), pdToolOutcome && (digital['dd.toolOutcome'] = pdToolOutcome))
        : E(digital, 'toolInteraction');
      T = util.siteID + ':' + (a.pageType || '(not set)') + ':' + (pdCalculatorName || T) + (K ? ':' + K : '');
      break;
    case 'calc-tool':
      pdToolsFormFieldObj && (digital['dd.toolInput'] = setFormFieldVar(pdPageType, '', pdToolsFormFieldObj));
      pdCalculatorType &&
        pdCalculatorName &&
        ((F = util.setInteractionVars(a)),
        (T = F.calculatorDetails || ''),
        (F = F.calculatorName || ''),
        (digital['dd.toolName'] = F || '(not set)'),
        T && (digital['dd.toolDetails'] = T),
        E(digital, 'toolInteraction'));
      'result' === pdPageStep &&
        (E(digital, 'toolResult'), pdToolOutcome && (digital['dd.toolOutcome'] = pdToolOutcome));
      T = util.siteID + ':' + (a.pageType || '(not set)') + ':' + F + (K ? ':' + K : '');
      break;
    case 'survey':
      'complete' === pdPageStep &&
        ((digital['dd.score'] = util.fixZero(a.surveyScore) || '(not set)'), E(digital, 'surveyResponse'));
      break;
    case 'selfservice':
      digital['dd.selfserviceName'] = (Ha ? Ha : r) || '(not set)';
      Pa && (digital['dd.extAcct'] = Pa || '(not set)');
      switch (pdPageStep) {
        case 'start':
          E(digital, 'selfServiceStart');
          break;
        case 'complete':
          E(digital, 'selfServiceComplete');
          Ba && (digital['dd.selfserviceDetails'] = Ba || '(not set)');
          break;
        case 'forgotpasswordstart':
          E(digital, 'forgotPassword');
          E(digital, 'selfServiceStart');
          break;
        case 'forgotpasswordcomplete':
          E(digital, 'selfServiceComplete');
      }
      break;
    case 'sitesearch':
      K = T.split(':').length;
      2 < K && (T = T.split(':').slice(0, 2).join(':') + ':sitesearch:' + T.split(':').slice(2, K).join(':'));
      if ((K = util.getValOnce(util.srchTerm(ka), 's3tv', 30, 'm')))
        (digital['dd.searchTerm'] = K),
          (b.list1 = util.clean(K.replace(/[^a-z]+/gi, ' ')).replace(/\s/g, ',')),
          E(digital, 'intSearch'),
          (digital['dd.itemCount'] = pdPageType + ':' + ha),
          '0' === ha && E(digital, 'intSearchZeroResults');
      break;
    case 'faqsearch':
      K = T.split(':').length;
      2 < K && (T = T.split(':').slice(0, 2).join(':') + ':faq:' + T.split(':').slice(2, K).join(':'));
      digital['dd.faqSearchTerm'] = Ma(util.srchTerm(ka), 's3_faq', 30, 'm');
      digital['dd.faqSearchTerm'] && (E(digital, 'faqSearch'), (digital['dd.itemCount'] = pdPageType + ':' + ha));
      break;
    case 'branchsearch':
      K = T.split(':').length;
      2 < K && (T = T.split(':').slice(0, 2).join(':') + ':branchsearch:' + T.split(':').slice(2, K).join(':'));
      T += ':searchresults';
      digital['dd.branchSearchLocation'] = util.srchTerm(ka);
      digital['dd.branchSearchLocation'] &&
        ((digital['dd.branchSearchFilters'] = a.searchFilters || '(not set)'),
        E(digital, 'branchSearch'),
        (digital['dd.itemCount'] = pdPageType + ':' + ha),
        '0' === ha && E(digital, 'intSearchZeroResults'));
      break;
    case 'branchdetail':
      ('' === Ja) & ('' !== util.getLoc().hash)
        ? (Ja = util.getLoc().hash.replace(/#\//i, '').replace(/\//g, ':'))
        : '' === Ja &&
          (Ja = util
            .getLoc()
            .pathname.replace(/\/(locateus|locator)\//gi, '')
            .replace(/\//gi, ':'));
      K = T.split(':').length;
      2 < K && (T = T.split(':').slice(0, 2).join(':') + ':branchsearch:' + T.split(':').slice(2, K).join(':'));
      T += ':' + n(Ja.replace(/\s/g, ''), 1);
      break;
    case 'atmdetail':
      K = T.split(':').length;
      2 < K && (T = T.split(':').slice(0, 2).join(':') + ':branchsearch:' + T.split(':').slice(2, K).join(':'));
      T += ':' + n(Ja.replace(/\s/g, ''), 1);
      break;
    case 'registration':
      switch (pdPageStep) {
        case 'start':
          E(digital, 'registrationStart');
          break;
        case 'complete':
          E(digital, 'registrationComplete');
      }
      break;
    case 'product':
      switch (pdPageStep) {
        case 'view':
          E(digital, 'customProdView');
          break;
        case 'comparison':
          E(digital, 'prodCompare');
      }
      break;
    case 'payment':
      Ua && Ga.push('payment:qty:' + Ua);
      Oa && Ga.push(Oa);
      K = [
        {
          prod: 'payment:' + (wa || '(not set)'),
          events: /^(complete|effectpayment|bulkpaymentapproval)$/.test(pdPageStep)
            ? 'payment:' + (wa || '(not set)') + '=' + Ia
            : '',
          merch: Ga.length ? 'options=' + Ga.join('+') : '',
        },
      ];
      switch (pdPageStep) {
        case 'start':
          E(digital, 'paymentStart');
          m = K;
          break;
        case 'complete':
          E(digital, 'paymentComplete');
          m = K;
          break;
        case 'businessstart':
          E(digital, 'busPaymentStart');
          m = K;
          break;
        case 'createpayment':
          E(digital, 'busPaymentCreated');
          m = K;
          break;
        case 'authorisepayment':
          E(digital, 'busPaymentAuthorised');
          m = K;
          break;
        case 'effectpayment':
          E(digital, 'busPaymentEffected');
          m = K;
          break;
        case 'bulkpaymentapproval':
          E(digital, 'busBulkApprovals'), (m = K);
      }
      break;
    case 'login':
      'complete' === pdPageStep &&
        ((digital['dd.loginStatus'] = 'logged in'),
        E(digital, 'loginComplete'),
        util.cookieWrite('s_wbc_auth', 1, new Date(+new Date() + 12e5), '/', util.cookieDomain()));
      break;
    case 'logout':
      digital['dd.loginStatus'] = 'logged out';
      util.cookieWrite('s_wbc_auth', 2, new Date(+new Date() + 36e5), '/', util.cookieDomain());
      break;
    case 'enquiry':
      switch (pdPageStep) {
        case 'start':
          E(digital, 'enqStart');
          break;
        case 'complete':
          E(digital, 'enqComplete'),
            (digital['dd.transactionID'] = fa
              ? (digital['dd.applicationID'] = 'enq_' + util.createTransID(fa))
              : a.transactionID
                ? (digital['dd.applicationID'] = 'enq_' + a.transactionID)
                : (digital['dd.applicationID'] = 'enq_(not set)'));
      }
      break;
    case 'faq':
      T += ':' + n(Ja, 1);
      break;
    case 'application':
      pdPageStep && fa && (digital['dd.transactionID'] = digital['dd.applicationID'] = pdPageStep + '_' + fa[0].Id);
      digital['dd.formType'] = N
        ? 'stp_' + (n(W) || 'na')
        : 'oregon' === S && W
          ? 'non-stp_' + (n(W) || 'na')
          : 'non-stp';
      A && (digital['dd.accountType'] = n(A));
      G && (digital['dd.businessType'] = n(G));
      pdFormFieldObj && (digital['dd.formFieldValues'] = setFormFieldVar(S, Ha, pdFormFieldObj));
      switch (pdPageStep) {
        case 'welcome':
          E(digital, 'welcome');
          break;
        case 'start':
          E(digital, 'appStart');
          break;
        case 'save':
          E(digital, 'appSaved');
          break;
        case 'retrieve':
          E(digital, 'appRetrieved');
          break;
        case 'milestone':
          E(digital, 'appMilestone');
          da && (digital['dd.formMilestone'] = da);
          da && fa && (digital['dd.transactionID'] = digital['dd.applicationID'] = 'milestone:' + da + '_' + fa[0].Id);
          break;
        case 'complete':
          E(digital, 'appComplete'),
            fa
              ? (digital['dd.transactionID'] = digital['dd.applicationID'] = util.createTransID(fa))
              : a.transactionID &&
                (/^\[CID:.+\]/i.test(a.transactionID)
                  ? (digital['dd.transactionID'] = digital['dd.applicationID'] =
                      a.transactionID.replace(/\[CID:(.+)\]/gi, '$1'))
                  : (digital['dd.transactionID'] = digital['dd.applicationID'] = a.transactionID)),
            fa && ((K = n(B(a.appReference[0].Id || ''))), (digital['dd.purchaseID'] = K)),
            E(digital, 'purchase'),
            m && m[0] && !m[0].events && (m[0].events = (wa || '(not set)') + '=' + Ia),
            N && aa
              ? (digital['dd.applicationStatus'] = util.appStatusSetup(aa))
              : aa &&
                (digital['dd.applicationStatus'] = JSON.stringify(aa)
                  .replace(/(\[|\]|\{|\}|'|")/gi, '')
                  .replace(/,/gi, '|')),
            /^approved(?!:downselldeclined)/i.test(Aa) && E(digital, 'appApproved'),
            /^declined/i.test(Aa) && E(digital, 'appDeclined'),
            /^referred/i.test(Aa) && E(digital, 'appReferred'),
            'approved:downselldeclined' === Aa && E(digital, 'appCustDeclined');
      }
      break;
    case 'quote':
      switch (pdPageStep) {
        case 'start':
          E(digital, 'quoteStart');
          fa && (digital['dd.transactionID'] = digital['dd.applicationID'] = 'quote_' + util.createTransID(fa));
          break;
        case 'save':
          E(digital, 'quoteSaved');
          fa && (digital['dd.transactionID'] = digital['dd.applicationID'] = 'quote_' + util.createTransID(fa));
          break;
        case 'retrieve':
          E(digital, 'quoteRetrieved');
          break;
        case 'complete':
          E(digital, 'quoteComplete'),
            fa && (digital['dd.transactionID'] = digital['dd.applicationID'] = 'quote_' + util.createTransID(fa));
      }
      break;
    case 'servererror':
      T = util.siteID + ':error';
      var I = T.split(':').slice(0, 4);
      '404' === String(a.errorCode) && (pdErrorDetails = 'page not found');
      digital['dd.errorCode'] = (pdErrorCode ? pdErrorCode + ':' : '') + pdErrorDetails;
      digital['dd.pageType'] = 'errorPage';
      util.addEvt(digital, 'error');
  }
  T = util.valReplace(util.valReplace(T, util.lStor('get', 'appmeasurement_pageNameReplace')), a.pageNameReplace);
  I = I || T.split(':');
  digital['dd.brand'] = I[0];
  digital['dd.site'] = I[1] ? I.slice(0, 2).join(':') : digital['dd.brand'];
  digital['dd.section1'] = I[2] ? I.slice(0, 3).join(':') : digital['dd.site'];
  digital['dd.section2'] = I[3] ? I.slice(0, 4).join(':') : digital['dd.section1'];
  digital['dd.section3'] = I[4] ? I.slice(0, 5).join(':') : digital['dd.section2'];
  digital['dd.section4'] = I[5] ? I.slice(0, 6).join(':') : digital['dd.section3'];
  pdBranchLocationCode && (digital['dd.branchcode'] = pdBranchLocationCode);
  ya &&
    ((ya = ya
      .replace(/\[\{(.*?)\}\]/gi, '$1')
      .replace(/"/gi, '')
      .replace(/,/gi, '|')),
    (digital['dd.quoteStatus'] = n(B(ya))));
  qa && (digital['dd.setupOptions'] = n(B(qa)));
  if (pdPageType && sa) {
    var P;
    t = pdPageType;
    t = n(
      t
        .replace(/application/i, 'app')
        .replace(/enquiry/i, 'enq')
        .replace(/quote/i, 'quo')
        .replace(/selfservice/i, 'ser')
        .replace(/registration/i, 'reg')
        .replace(/payment/i, 'pay')
        .replace(/survey/i, 'sur'),
    );
    qa = util.siteID + ':' + t + ':' + sa;
    digital['dd.formName'] = qa;
    ya = /(app|quo|enq)/i.test(t);
    m && m[0] && (P = !0);
    ya && P && ((P = m[0].ProductName), (digital['dd.prodDescription'] = qa + ':' + P));
    'start' === pdPageStep && E(digital, 'formStart');
    'complete' === pdPageStep && E(digital, 'formComplete');
    H && (digital['dd.journeyType'] = n(H));
  }
  if ('www' === k) {
    var V = 'www:(not set)';
    /^wbc:www:(?:mobile:)?home$/i.test(T) && (V = 'www:home');
    /^(?:pers|bus|corp)$/.test(I[2]) &&
      (3 === I.length && (V = 'www:section home'), 4 === I.length && (V = 'www:product home'));
  }
  digital['dd.pageType'] = pdPageType || V;
  Qa && (digital['dd.pageNumber'] = Qa ? (pdPageType || '(not set)') + ':' + Qa : '');
  digital['dd.pageStatus'] = pdInSession ? 'auth' : 'pub';
  digital['dd.lang'] = n(a.language || 'en');
  digital['dd.dayTime'] = util.timePart();
  if ((V = Ma(n(B(a.featuredContent) || Ca('fid', '', D.href) || Ca('wbcfrom', '', D.href)), 's3_feat', 30, 'm')))
    (digital['dd.featuredContent'] = V), E(digital, 'featuredContent');
  if (pdNotification && 1 <= pdNotification.length) {
    V = '';
    for (P = 0; P < pdNotification.length; P++) V = b.apl(V, pdNotification[P].notificationTitle || '', ',', 2);
    digital['dd.notificationTitle'] = V;
    E(digital, 'notificationImpression');
  }
  pdNotificationDetail && ((digital['dd.notificationTitle'] = pdNotificationDetail), E(digital, 'notificationDetail'));
  c && (digital['dd.pageProperty'] = c);
  pdChatbotName && (digital['dd.chatbotName'] = pdChatbotName);
  wbcfromQuerystring = n(Ca('wbcfrom', '', D.href));
  /sitesearch:autosuggest:results/i.test(wbcfromQuerystring) && E(digital, 'intSearchClickThru');
  if (n(Ca('searchsource', '', D.href)))
    switch (
      ((c = n(Ca('searchsource', '', D.href))),
      (V = n(Ca('result-type', '', D.href))),
      (P = n(Ca('kw', '', D.href))),
      (H = n(Ca('cat', '', D.href))),
      V)
    ) {
      case 'natural':
      case 'natural:fast-answer':
        Qa = n(Ca('rank', '', D.href));
        b.prop16 = Qa;
        b.prop16 && E(digital, 'intSearchClickThru');
        b.eVar13 = 'source:' + c + '|type:' + V + '|kw:' + P + '|cat:' + H + '|rank:' + Qa;
        break;
      case 'recommended':
      case 'fast-answer':
      case 'quicklinks':
        (b.eVar13 = 'source:' + c + '|type:' + V + '|kw:' + P), E(digital, 'intSearchClickThru');
    }
  if ((wbcSearchType = n(Ca('searchtype', '', D.href)))) b.eVar15 = 'searchtype:' + wbcSearchType;
  digital['dd.pageAudit'] = k + ':' + n(a.src, 1) + ':' + n(a.pageKey, 1);
  digital['dd.siteVersion'] =
    k + (a.siteVersion ? ':' + n(a.siteVersion, 1) : '') + (a.dataLayerVer ? ':dataVar:' + n(a.dataLayerVer, 1) : '');
  if (pdErrorCode || pdErrorDetails)
    (digital['dd.errorCode'] = (pdErrorCode ? pdErrorCode : '(notset)') + (pdErrorDetails ? ':' + pdErrorDetails : '')),
      (digital['dd.pageType'] = 'errorPage'),
      util.addEvt(digital, 'error');
  if (
    '1' === b.c_r('s_wbc_auth') ||
    '1' === b.c_r('s_bom_auth') ||
    '1' === b.c_r('s_bsa_auth') ||
    '1' === b.c_r('s_stg_auth')
  )
    digital['dd.loginStatus'] = 'logged in';
  if (
    '2' === b.c_r('s_wbc_auth') ||
    '2' === b.c_r('s_bom_auth') ||
    '2' === b.c_r('s_bsa_auth') ||
    '2' === b.c_r('s_stg_auth')
  )
    digital['dd.loginStatus'] = 'logged out';
  digital['dd.pageName'] = T;
  if ((D = 'undefined' !== typeof window.NativeJSInterface && !1 !== window.NativeJSInterface.isNativeContainer()))
    util.lStor('get', 'app_err')
      ? ((digital['dd.appCapabilities'] = util.lStor('get', 'app_err')),
        (b.eVar17 =
          'native app:(notset):' + util.lStor('get', 'app_id') + ' capabilities:' + NativeJSInterface.getLibVersion()))
      : ((digital['dd.appid'] = util.lStor('get', 'app_id')),
        (digital['dd.appCapabilities'] = util.lStor('get', 'app_capabilities')),
        (b.eVar17 =
          'native app:' +
          util.lStor('get', 'app_exp') +
          ':' +
          util.lStor('get', 'app_id') +
          ' capabilities:' +
          NativeJSInterface.getLibVersion()));
  if (
    ('undefined' !== typeof window.NativeJSInterface && !1 !== window.NativeJSInterface.isNativeContainer()) ||
    /adobe_mc=.+/i.test(util.getLoc().href) ||
    b.c_rr('MCMID')
  )
    (E = new RegExp('MCMID(=|\\%3D)(.+?)(?=\\?|&|;|#|\\/|\\||$|\\%7C)', 'i')),
      (digital['dd.midUrl'] = E.test(util.getLoc().href) ? util.getLoc().href.match(E)[2] : ''),
      (digital['dd.midCookie'] = b.c_rr('MCMID') || b.c_r('MCMID')),
      (digital['dd.aVidUrl'] = util.getQueryParam('adobe_aa_vid', '', util.getLoc().href)),
      (digital['dd.sviUrl'] = util.getQueryParam('s_vi', '', util.getLoc().href)),
      (digital['dd.sviCookie'] = b.c_rr('s_vi') || b.c_r('s_vi'));
  digital['dd.experience'] =
    D || nativeAppVersion
      ? (digital['dd.channel'] = 'mobapp')
      : (digital['dd.channel'] = (Xa || util.getExp()).replace(/^titan$/i, 'mob'));
  pdTouchPoint
    ? (digital['dd.touchpoint'] = pdTouchPoint)
    : ((pdChannel = pdChannel
        .replace(/^(fi|fi_self_serv|fi_mobile|fi_mob_self_serv|fi_self_serv_mobile)$/gi, 'digital')
        .replace(/^fi_cc$/gi, 'ccc')
        .replace(/^fi_branch$/gi, 'branch')),
      (digital['dd.touchpoint'] = pdChannel ? pdChannel : 'digital'));
  b.prop12 = nativeAppVersion || Za ? 'native app:' + (nativeAppVersion || '(exit app)') : '';
  b.campaign = util.getValOnce(
    util.lowerCase(util.getQueryParam('cid', '', util.getLoc().href) || pdExtCampaign),
    's3_cid',
    30,
    'm',
  );
  b.campaign && (b.eVar18 = b.crossVisitParticipation(b.campaign, 's3_ev18', '30', '5', '>', 'event27'));
  !pdInternalCampaignList || ('undefined' != typeof b.list2 && '' != b.list2)
    ? pdInternalCampaignList && b.list2 && (b.list2 = pdInternalCampaignList + ',' + b.list2)
    : (b.list2 = pdInternalCampaignList);
  'undefined' !== typeof b.list2 && '' !== b.list2 && util.addEvt(digital, 'intImpressions');
  b.linkType ||
    ((b.list3 = b.targetImpression(pdTargetCampaignsList)),
    b.list3 &&
      (pdTargetLocationId && (b.prop32 = pdTargetLocationId),
      pdPageModules && (digital['dd.pageModules'] = n(B(pdPageModules))),
      util.addEvt(digital, 'targetImpression'),
      delete a.targetCampaignViewed,
      delete a.pageModules));
  n = pdTargetCampaignClicked || decodeURIComponent(util.lowerCase(util.getQueryParam('ttid', '', util.getLoc().href)));
  B =
    pdTargetClickedLocationId ||
    decodeURIComponent(util.lowerCase(util.getQueryParam('locationid', '', util.getLoc().href)));
  D = pdTargetClickedAction || decodeURIComponent(util.lowerCase(util.getQueryParam('action', '', util.getLoc().href)));
  n &&
    (B ? (b.prop32 = B) : pdTargetLocationId && (b.prop32 = pdTargetLocationId),
    D && ((b.eVar53 = D), (b.prop53 = b.eVar53)),
    (b.eVar33 = n),
    util.addEvt(digital, 'targetClickThroughs'),
    (b.prop33 = b.eVar33));
  n = util.lowerCase(util.getQueryParam('pid', '', util.getLoc().href)) || util.lowerCase(pdInternalCampaignClicked);
  b.linkType || (b.eVar22 = util.getValOnce(n, 's3_pid', 30, 'm'));
  b.eVar22 && util.addEvt(digital, 'intClickThroughs');
  if (oa || Ka)
    (digital['dd.campaignCodeList'] = util.lowerCase((oa ? 'cc:' + oa : '') + (Ka ? '|pc:' + Ka : ''))),
      util.addEvt(digital, 'campaignCodeImpressions');
  oa = util.lowerCase(util.getQueryParam('campaigncode', '', util.getLoc().href)) || Ya;
  Fa = util.lowerCase(util.getQueryParam('promocode', '', util.getLoc().href)) || Fa;
  if (oa || Fa)
    (digital['dd.campaignCode'] = util.lowerCase((oa ? 'cc:' + oa : '') + (Fa ? '|pc:' + Fa : ''))),
      util.addEvt(digital, 'campaignCodeClickThroughs');
  b._channelParameter = 'Campaign|cid';
  b.channelManager('cid', '', 's3_c_m');
  util.clean(b._keywords);
  b.eVar29 = b.getDaysSinceLastVisit('s3_lv');
  b.prop39 =
    'vid:' +
    (Visitor.version ? Visitor.version : visitor.version) +
    ' ' +
    util.version +
    ' App:' +
    b.version +
    ' c:' +
    b.w_codeVers +
    ' env:' +
    (a.siteEnv || '') +
    ' h:' +
    util.getLoc().hostname;
  b.pageName = digital['dd.pageName'];
  b.products = util.valReplace(
    util.valReplace(b.w_prodStr(m, a), util.lStor('get', 'appmeasurement_productsReplace')),
    a.productsReplace,
  );
  b.eVar8 = util.cap(util.getVisitNum(365), 1e3);
  b.eVar21 = pageNameDynamicVariable;
  b.hier1 = m && m[0] ? m[0].ProductFamily || m[0].family || '' : a.siteSection || (I[1] ? I[1] : '');
  b.hier1 =
    b.hier1 +
    (a.pageType ? ':' + a.pageType : '') +
    (a.pageAction ? ':' + a.pageAction : a.pageStep ? ':' + a.pageStep : '');
  b.server = util.lowerCase(util.getLoc().hostname) + (voyagerLoadBalancerID ? '-' + voyagerLoadBalancerID : '');
  'undefined' !== typeof za &&
    ((digital['dd.previousPage'] = za), (I = b.c_r('lastPixelLen')), (digital['dd.lastPixelLength'] = I));
  b.events = b.apl(b.events, 'event1', ',', 1);
  b.contextData = digital;
  digital.ev_appStart && (b.events = b.apl(b.events, 'event26:' + util.serialise(h, pdPageStep), ',', 1));
  digital.ev_appComplete && (b.events = b.apl(b.events, 'event27:' + util.serialise(h, pdPageStep), ',', 1));
  digital.ev_enqStart && (b.events = b.apl(b.events, 'event28:' + util.serialise(h, pdPageStep), ',', 1));
  digital.ev_enqComplete && (b.events = b.apl(b.events, 'event29:' + util.serialise(h, pdPageStep), ',', 1));
  b.prop59 = b.c_r('s3_nav');
  b.c_w('s3_nav', '', new Date(0));
  b.eVar25 = b.prop25 = 'D=mid';
  pdAddEvents &&
    ((b.events = b.apl(b.events, isNaN(pdAddEvents) ? pdAddEvents : 'event' + pdAddEvents, ',', 2)),
    /\bevent46\b/i.test(pdAddEvents) &&
      util.cookieWrite('s_wbc_auth', 1, new Date(+new Date() + 12e5), '/', util.cookieDomain()));
  if ('wbc' === g) {
    b.eVar34 = b.c_r('s_wbc-gi');
    b.eVar35 = b.c_r('s_wbc-ti') || pdTrackId;
    b.eVar47 = b.c_r('s_wbc-pi');
    b.eVar48 = b.c_r('s_wbc-ses');
    b.eVar50 = b.c_r('s_bt-seg') || b.c_r('s_wbc-seg');
    if ((custTrackingId = b.c_rr('s_wbc-ti')))
      (custTrackingIdPrevious = b.c_r('temp-ti')), b.c_w('temp-ti', custTrackingId);
    if ((custProfileId = b.c_rr('s_wbc-pi')))
      (custProfileIdPrevious = b.c_r('temp-pi')), b.c_w('temp-pi', custProfileId);
    custTrackingId &&
      custTrackingId === custTrackingIdPrevious &&
      custProfileId &&
      custProfileIdPrevious &&
      custProfileId !== custProfileIdPrevious &&
      ((userSwitchedProfile = !0), (b.prop59 = '(switch profile)'));
  }
  'stg' === g && (b.eVar36 = b.c_r('s_stg_ti') || pdTrackId);
  'bom' === g && (b.eVar36 = b.c_r('s_bom_ti') || pdTrackId);
  'bsa' === g && (b.eVar36 = b.c_r('s_bsa_ti') || pdTrackId);
  pdEmpId && (b.eVar65 = pdEmpId);
  b.c_r('s_biz_auth') && (b.eVar71 = b.c_rr('s_biz-ti'));
  'bt' === g &&
    (pdBtAdviserID && (b.eVar70 = pdBtAdviserID),
    pdPanoramaID ? (b.eVar66 = pdPanoramaID) : b.c_r('s_bt-ti') && (b.eVar66 = b.c_r('s_bt-ti')),
    b.c_r('s_bt-seg') && (b.eVar50 = b.c_r('s_bt-seg')));
  '1' === b.c_r('s_biz_auth')
    ? (b.prop47 = b.eVar45 = 'business')
    : '1' === b.c_r('s_wbc_auth') && (b.prop47 = b.eVar45 = 'Personal');
  pdGenericId && (b.eVar34 = ('(not set)' === k ? '' : k + '_') + pdGenericId);
  pdGroupCode && (b.eVar81 = pdGroupCode | 0);
  b.eVar27 = 'D=User-Agent';
  b.eVar26 =
    util.getLoc().protocol +
    '//' +
    util.getLoc().hostname +
    util.cleanGUID(
      util.getLoc().pathname.replace(/\/$/g, '') + (0 < util.getLoc().hash.length ? '/' + util.getLoc().hash : ''),
    );
  b.prop26 = util.cleanGUID(util.getLoc().href);
  b.prop70 = util.cookieAudit();
  nativeMid && nativeMid !== b.marketingCloudVisitorID && util.addEvt(digital, 'midMismatch');
  b.AudienceManagement.setup({
    partner: 'wbg',
    containerNSID: 0,
    uuidCookie: { name: 'aam_uuid', days: 30 },
    visitorService: { namespace: '3A4B7BAF56F01DA67F000101@AdobeOrg' },
    disableDefaultRequest: !0,
    disableScriptAttachment: !0,
    disableCORS: !0,
    disableDestinationPublishingIframe: !0,
  });
  'function' === typeof b.w_wtT.complete && b.w_wtT.complete(b);
}
s3.doPlugins = s3_doPlugins;
dPeriod = /.+\.(com\.au|org\.au|co\.nz|co\.uk)$/i.test(location.hostname) ? 3 : 2;
dLen = location.hostname.split('.').length;
dRoot = location.hostname
  .split('.')
  .slice(dLen - dPeriod)
  .join('.');
tSecServer = tServer = 'westpacbankinggroup.sc.omtrdc.net';
/westpac\.com\.au/i.test(dRoot)
  ? ((tServer = 'metrics.westpac.com.au'), (tSecServer = 'smetrics.westpac.com.au'))
  : /stgeorge\.com\.au/i.test(dRoot)
    ? ((tServer = 'metrics.stgeorge.com.au'), (tSecServer = 'smetrics.stgeorge.com.au'))
    : /bankofmelbourne\.com\.au/i.test(dRoot)
      ? ((tServer = 'metrics.bankofmelbourne.com.au'), (tSecServer = 'smetrics.bankofmelbourne.com.au'))
      : /banksa\.com\.au/i.test(dRoot)
        ? ((tServer = 'metrics.banksa.com.au'), (tSecServer = 'smetrics.banksa.com.au'))
        : /bt\.com\.au/i.test(dRoot) && ((tServer = 'metrics.bt.com.au'), (tSecServer = 'smetrics.bt.com.au'));
s3.visitorNamespace = 'westpacbankinggroup';
s3.trackingServer = tServer;
s3.trackingServerSecure = tSecServer;
s3.__ccucr ||
  ((s3.c_rr = s3.c_r),
  (s3.__ccucr = !0),
  (s3.c_rspers = function () {
    var b = this.c_rr('s3_pers'),
      a = new Date().getTime(),
      g = '';
    if (!b) return g;
    var k = b.split(';');
    for (var n = 0, D = k.length; n < D; n++)
      (b = k[n].match(/\|([0-9]+)$/)) && parseInt(b[1]) >= a && (g += k[n] + ';');
    return g;
  }),
  (s3.c_r = s3.cookieRead =
    function (b) {
      var a = this.c_rr(b),
        g = this.c_rspers();
      if (a) return a;
      b = this.escape ? this.escape(b) : encodeURIComponent(b);
      a = g.indexOf(' ' + b + '=');
      g = 0 > a ? this.c_rr('s3_sess') : g;
      a = g.indexOf(' ' + b + '=');
      var k = 0 > a ? a : g.indexOf('|', a);
      var n = 0 > a ? a : g.indexOf(';', a);
      k = 0 < k ? k : n;
      return (a =
        0 > a
          ? ''
          : this.unescape
            ? this.unescape(g.substring(a + 2 + b.length, 0 > k ? g.length : k))
            : decodeURIComponent(g.substring(a + 2 + b.length, 0 > k ? g.length : k)));
    }));
s3.__ccucw ||
  ((s3.c_wr = s3.c_w),
  (s3.__ccucw = !0),
  (s3.c_w = s3.cookieWrite =
    function (b, a, g) {
      var k = new Date(),
        n = 0,
        D = 0,
        B = 0;
      k.setTime(k.getTime() - 6e4);
      this.c_rr(b) && this.c_wr(b, '', k);
      b = this.escape ? this.escape(b) : encodeURIComponent(b);
      var E = this.c_rspers();
      k = E.indexOf(' ' + b + '=');
      -1 < k && ((E = E.substring(0, k) + E.substring(E.indexOf(';', k) + 1)), (D = 1));
      var K = this.c_rr('s3_sess');
      k = K.indexOf(' ' + b + '=');
      -1 < k && ((K = K.substring(0, k) + K.substring(K.indexOf(';', k) + 1)), (B = 1));
      k = new Date();
      if (g) {
        if (1 == g) {
          g = new Date();
          var c = g.getYear();
          g.setYear(c + 5 + (1900 > c ? 1900 : 0));
        }
        g.getTime() > k.getTime() &&
          ((E += ' ' + b + '=' + (this.escape ? this.escape(a) : encodeURIComponent(a)) + '|' + g.getTime() + ';'),
          (D = 1));
      } else (K += ' ' + b + '=' + (this.escape ? this.escape(a) : encodeURIComponent(a)) + ';'), (B = 1);
      K = K.replace(/%00/g, '');
      E = E.replace(/%00/g, '');
      B && this.c_wr('s3_sess', K, 0);
      if (D) {
        for (g = E; g && -1 != g.indexOf(';'); )
          (D = parseInt(g.substring(g.indexOf('|') + 1, g.indexOf(';')))),
            (g = g.substring(g.indexOf(';') + 1)),
            (n = n < D ? D : n);
        k.setTime(n);
        this.c_wr('s3_pers', E, k);
      }
      return a == this.c_r(this.unescape ? this.unescape(b) : decodeURIComponent(b));
    }));
s3.wd = window;
s3.fl = util.fl;
s3.split = function (b, a) {
  return b ? b.split(a) : [];
};
s3.p_c = function (b, a) {
  var g = b.indexOf('=');
  return a.toLowerCase() == b.substring(0, 0 > g ? b.length : g).toLowerCase() ? b : 0;
};
s3.join = function (b, a) {
  var g;
  if (a) {
    var k = a.front || '';
    var n = a.back || '';
    var D = a.delim || '';
    var B = a.wrap || '';
  }
  var E = '';
  for (g = 0; g < b.length; g++)
    (E = 'object' == typeof b[g] ? E + this.join(b[g], a) : E + (B + b[g] + B)), g < b.length - 1 && (E += D);
  return k + E + n;
};
s3.pt = util.pt;
s3.repl = function (b, a, g) {
  for (var k = b.indexOf(a), n = g.length; b && 0 <= k; )
    (b = b.substring(0, k) + g + b.substring(k + a.length)), (k = b.indexOf(a, k + n));
  return b;
};
s3.apl = function (b, a, g, k) {
  var n = 0,
    D;
  b ||= '';
  if (k) {
    var B = this.split(b, g);
    for (D = 0; D < B.length; D++) {
      var E = B[D];
      n = n || (1 == k ? E == a : E.toLowerCase() == a.toLowerCase());
    }
  }
  n || (b = b ? b + g + a : a);
  return b;
};
s3.dVar = function (b) {
  return s3['eVar' + b] ? 'D=v' + b : '';
};
s3.channelManager = function (b, a, g, k, n, D, B) {
  var E = new Date(),
    K = 0,
    c,
    h,
    m,
    r,
    u,
    H;
  var A = this.getQueryParam ? 1 : 0;
  var G = this.repl ? 1 : 0;
  E.setTime(E.getTime() + 18e5);
  n &&
    ((K = 1),
    this.c_r(n) && (K = 0),
    this.c_w(n, 1, E) || this.c_w(n, 1, 0),
    this.c_r(n) || (K = 0),
    D && this.c_r('s3_tbm' + D) && (K = 0));
  n = this.referrer ? this.referrer : document.referrer;
  if ((n = decodeURIComponent(n.toLowerCase()))) {
    var N = -1 < n.indexOf('?') ? n.indexOf('?') : n.length;
    var S = n.substring(0, N);
    N = n.split('/');
    N = N[2].split('?');
    N = N[0].toLowerCase();
    var W = this.linkInternalFilters.toLowerCase();
    W = W.split(',');
    for (c = 0; c < W.length && !(h = -1 == N.indexOf(W[c]) ? '' : n); c++);
  } else var da = 1;
  if (!h && !da) {
    var aa = n;
    var Ba = N;
    var wa = 'Other Natural Referrers';
    var Ia = wa + ' ' + N;
    W = this.seList + '>' + this._extraSearchEngines;
    1 == k &&
      ((S = G ? this.repl(S, 'oogle', '%') : this.replace(S, 'oogle', '%')),
      (S = G ? this.repl(S, 'ahoo', '^') : this.replace(S, 'ahoo', '^')),
      (n = G ? this.repl(n, 'as_q', '*') : this.replace(n, 'as_q', '*')));
    W = W.split('>');
    for (m = 0; m < W.length; m++) {
      var Ga = W[m];
      Ga = Ga.split('|');
      var Ua = Ga[0].split(',');
      for (r = 0; r < Ua.length; r++) {
        var Oa = S.indexOf(Ua[r]);
        if (-1 < Oa) {
          var fa = Ga[2] ? (Ia = Ga[2]) : N;
          1 == k &&
            ((fa = G ? this.repl(fa, '#', ' - ') : this.replace(fa, '#', ' - ')),
            (n = G ? this.repl(n, '*', 'as_q') : this.replace(n, '*', 'as_q')),
            (fa = G ? this.repl(fa, '^', 'ahoo') : this.replace(fa, '^', 'ahoo')),
            (fa = G ? this.repl(fa, '%', 'oogle') : this.replace(fa, '%', 'oogle')));
          Oa = Ga[1].split(',');
          for (u = 0; u < Oa.length; u++) {
            if (
              -1 < n.indexOf(Oa[u] + '=') ||
              0 == n.indexOf('https://www.google.') ||
              0 == n.indexOf('http://r.search.yahoo.com')
            )
              var Aa = 1;
            var qa = A
              ? this.getQueryParam(Oa[u], '', n).toLowerCase()
              : this.Util.getQueryParam(Oa[u], n).toLowerCase();
            if (Aa || qa) break;
          }
        }
        if (Aa || qa) break;
      }
      if (Aa || qa) break;
    }
  }
  if (!h || '1' != B) {
    b = b.split(',');
    for (c in b)
      b.hasOwnProperty(c) &&
        (A ? this.getQueryParam(b[c]) : this.Util.getQueryParam(b[c])) &&
        (H = H
          ? H + a + (A ? this.getQueryParam(b[c]) : this.Util.getQueryParam(b[c]))
          : A
            ? this.getQueryParam(b[c])
            : this.Util.getQueryParam(b[c]));
    H && ((Ia = H), (wa = fa ? 'Paid Search' : 'Unknown Paid Channel'));
    !H && fa && Aa && ((wa = 'Natural Search'), (Ia = wa + ' ' + fa));
  }
  K && da && !H && (aa = Ba = Ia = wa = 'Typed/Bookmarked');
  if ((b = this._channelDomain) && N && !h)
    for (a = b.split('>'), K = 0; K < a.length; K++) {
      da = a[K] ? a[K].split('|') : '';
      h = da[1] ? da[1].split(',') : '';
      b = h.length;
      for (k = 0; k < b; k++) {
        B = h[k].toLowerCase();
        var ya = ('/' + N).indexOf(B);
        if (-1 < ya) {
          wa = da[0];
          break;
        }
      }
      if (-1 < ya) break;
    }
  if ((b = this._channelParameter))
    for (a = b.split('>'), K = 0; K < a.length; K++) {
      da = a[K] ? a[K].split('|') : '';
      h = da[1] ? da[1].split(',') : '';
      b = h.length;
      for (k = 0; k < b; k++)
        if ((ya = A ? this.getQueryParam(h[k]) : this.Util.getQueryParam(h[k]))) {
          wa = da[0];
          break;
        }
      if (ya) break;
    }
  if ((b = this._channelPattern))
    for (a = b.split('>'), K = 0; K < a.length; K++) {
      da = a[K] ? a[K].split('|') : '';
      h = da[1] ? da[1].split(',') : '';
      b = h.length;
      for (k = 0; k < b; k++) {
        B = h[k].toLowerCase();
        ya = H ? H.toLowerCase() : '';
        var ka = ya.indexOf(B);
        if (0 == ka) {
          wa = da[0];
          break;
        }
      }
      if (0 == ka) break;
    }
  ka = wa ? H + Ba + wa + qa : '';
  g = g ? g : 'c_m';
  '0' != g && (ka = util.getValOnce(ka, g, 0));
  ka
    ? ((this._campaignID = H ? H : 'n/a'),
      (this._referrer = aa ? aa : 'n/a'),
      (this._referringDomain = Ba ? Ba : 'n/a'),
      (this._campaign = Ia ? Ia : 'n/a'),
      (this._channel = wa ? wa : 'n/a'),
      (this._partner = fa ? fa : 'n/a'),
      (this._keywords = Aa ? (qa ? qa : 'Keyword Unavailable') : 'n/a'),
      D && 'Typed/Bookmarked' != wa && (E.setTime(E.getTime() + 864e5 * D), this.c_w('s3_tbm' + D, 1, E)))
    : (this._campaignID =
        this._referrer =
        this._referringDomain =
        this._campaign =
        this._channel =
        this._partner =
        this._keywords =
          '');
};
s3.seList =
  'google.,googlesyndication.com,.googleadservices.com|q,as_q|Google>bing.com|q|Bing>yahoo.com,yahoo.co.jp|p,va|Yahoo!>ask.jp,ask.co|q,ask|Ask>search.aol.,suche.aolsvc.de|q,query|AOL>altavista.co,altavista.de|q,r|AltaVista>.mywebsearch.com|searchfor|MyWebSearch>webcrawler.com|q|WebCrawler>wow.com|q|Wow>infospace.com|q|InfoSpace>blekko.com|q|Blekko>dogpile.com|q|DogPile>alhea.com|q|Alhea>goduckgo.com|q|GoDuckGo>info.com|qkw|Info.com>contenko.com|q|Contenko>baidu.com|word,wd|Baidu>daum.net,search.daum.net|q|Daum>icqit.com|q|icq>myway.com|searchfor|MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|query,search|Netscape Search>reference.com|q|Reference.com>seznam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it,www.tiscali.co.uk|key,query|Tiscali>virgilio.it|qs|Virgilio>yandex|text|Yandex.ru>optimum.net|q|Optimum Search>search.earthlink.net|q|Earthlink>search.comcast.net|q|Comcast>libero.it|query|libero.it>excite.co|search|Excite>mail.ru|q|Mail.ru>isearch.avg.com|q|AVG>msn.com|q|MSN>seznam.cz|q|seznam.cz>so.com|q|so.com>ixquick.com|query|ixquick.com>sogou.com|query|sogou.com>360.cn|q|360.cn';
s3.crossVisitParticipation = function (b, a, g, k, n, D, B) {
  var E = this,
    K,
    c,
    h = [],
    m = [],
    r = [];
  E.c_r || (E = window.s3);
  'undefined' === typeof B && (B = 0);
  if (E.events && D) {
    var u = E.split(D, ',');
    var H = E.split(E.events, ',');
    for (D = 0; D < u.length; D++) for (c = 0; c < H.length; c++) u[D] == H[c] && (K = 1);
  }
  if (!b || '' == b) return K && E.c_w(a, ''), '';
  b = escape(b);
  c = E.c_r(a);
  D = 0;
  if (c && '' != c)
    for (h = E.split(c, '],['), c = 0; c < h.length; c++)
      (u = h[c]),
        (u = E.repl(u, '[', '')),
        (u = E.repl(u, ']', '')),
        (u = E.repl(u, "'", '')),
        (h[c] = E.split(u, ','));
  u = new Date();
  u.setFullYear(u.getFullYear() + 5);
  0 == B && 0 < h.length && h[h.length - 1][0] == b
    ? (h[h.length - 1] = [b, new Date().getTime()])
    : (h[h.length] = [b, new Date().getTime()]);
  k = 0 > h.length - k ? 0 : h.length - k;
  b = new Date();
  for (c = k; c < h.length; c++)
    (k = Math.round((b.getTime() - h[c][1]) / 864e5)),
      k < g && ((r[D] = unescape(h[c][0])), (m[D] = [h[c][0], h[c][1]]), D++);
  g = E.join(m, { delim: ',', front: '[', back: ']', wrap: "'" });
  E.c_w(a, g, u);
  n = E.join(r, { delim: n });
  K && E.c_w(a, '');
  return n;
};
s3.getDaysSinceLastVisit = function (b) {
  var a = new Date(),
    g = new Date(),
    k = a.getTime();
  a.setTime(k + 94608e6);
  g.setTime(k + 18e5);
  f0 = 'Cookies Not Supported';
  var n = this.c_r(b);
  0 == n.length
    ? (this.c_w(b, k, a), this.c_w(b + '_s', 'First Visit', g))
    : ((n = k - n),
      18e5 < n
        ? 2592e6 < n
          ? (this.c_w(b, k, a), this.c_w(b + '_s', 'More than 30 days', g))
          : n < 2592e6 + 1 && 6048e5 < n
            ? (this.c_w(b, k, a), this.c_w(b + '_s', 'More than 7 days', g))
            : n < 6048e5 + 1 && 864e5 < n
              ? (this.c_w(b, k, a), this.c_w(b + '_s', 'Less than 7 days', g))
              : n < 864e5 + 1 && (this.c_w(b, k, a), this.c_w(b + '_s', 'Less than 1 day', g))
        : (this.c_w(b, k, a), (a = this.c_r(b + '_s')), this.c_w(b + '_s', a, g)));
  b = this.c_r(b + '_s');
  return 0 == b.length
    ? f0
    : 'First Visit' != b &&
        'More than 30 days' != b &&
        'More than 7 days' != b &&
        'Less than 7 days' != b &&
        'Less than 1 day' != b
      ? ''
      : b;
};
s3.getAamSegments = function (b, a) {
  (b = s3.c_r(b)) && (b = s3.repl(b, a + '=', ''));
  return b;
};
s3.w_addEvt = function (b) {
  s3.events = s3.apl(s3.events, isNaN(b) ? b || '' : 'event' + b, ',', 2);
};
s3.w_getEvtTrgt = function (b, a) {
  b = b || window.event;
  var g;
  b = b ? b.target || b.srcElement : 0;
  for (g = 0; b && 1 !== b.nodeType && 10 >= g; g++) b = b.parentNode;
  if (a) {
    for (g = 0; b && b.getAttribute && !b.getAttribute(a) && 10 >= g; g++) b = b.parentNode;
    if ((b && !b.getAttribute) || (b && b.getAttribute && !b.getAttribute(a))) b = 0;
  }
  return b || 0;
};
s3.w_getNavMenuId = function (b) {
  var a = s3.w_getEvtTrgt(b),
    g;
  for (b = 0; 50 > b; b++)
    if (a) {
      if (1 === a.nodeType && (g = a.getAttribute('data-analytics-nav'))) {
        s3.c_w('s3_nav', g);
        break;
      }
      a = a.parentNode;
    }
};
s3.w_endTrckng = function () {
  setTimeout(function () {
    var b = s3.Gb || '';
    lastPixelLength = 0;
    s3.w_log('s3_code', s3.pageName);
    /^undefined$/i.test(s3.pageName) || s3.c_w('lastPage', s3.pageName, new Date(+new Date() + 864e5));
    b &&
      ((lastPixelLength = b.length),
      (s3.w_pixels = s3.w_pixels || []),
      s3.w_pixels.push(b),
      s3.c_w('lastPixelLen', lastPixelLength),
      digital._drop || (s3.w_pgTrkStatus = 'sent'));
  }, 1e3);
};
s3.w_trackLink = function (b, a) {
  var g = s3.w_getEvtTrgt(b, 'href');
  s3 = s3_gi(s3_account);
  switch (a) {
    case 'exitCampaign':
      b = decodeURIComponent(util.lowerCase(util.getQueryParam('ttid', '', g.href)));
      a = decodeURIComponent(util.lowerCase(util.getQueryParam('locationid', '', g.href)));
      var k = decodeURIComponent(util.lowerCase(util.getQueryParam('action', '', g.href))),
        n = decodeURIComponent(util.lowerCase(util.getQueryParam('pid', '', g.href)));
      s3.linkTrackEvents = s3.events = '';
      s3.linkTrackVars = s3.w_ltv + ',eVar33,eVar53,eVar22,prop33,prop32,prop53,events';
      n && ((s3.eVar22 = n), (s3.events = s3.apl(s3.events, 'event12', ',', 2)));
      b &&
        ((s3.eVar33 = b),
        (s3.prop33 = b),
        a && (s3.prop32 = a),
        k && ((s3.eVar53 = k), (s3.prop53 = k)),
        (s3.events = s3.apl(s3.events, 'event9', ',', 2)));
      s3.tl(g || !0, 'e', 'exitCampaign:' + util.lowerCase(g.href, 1));
      s3.w_endTrckng();
      break;
    case 'exit':
      s3.linkTrackEvents = s3.events = '';
      s3.linkTrackVars = s3.w_ltv;
      s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
      s3.eVar1 = s3.prop1 = 'impression:exit';
      s3.tl(g || !0, 'e', util.lowerCase(g.href, 1));
      s3.w_endTrckng();
      break;
    case 'custdownload':
      g = s3.w_getEvtTrgt(b, 'data-analytics-download');
      b = util.lowerCase(g && g.getAttribute('data-analytics-download'), 1);
      s3.events = 'event67';
      s3.linkTrackEvents = s3.events;
      s3.linkTrackVars = s3.w_ltv + ',eVar61,events';
      s3.eVar61 = b;
      s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
      s3.eVar1 = s3.prop1 = 'impression:download';
      s3.tl(g || !0, 'd', b);
      s3.w_endTrckng();
      break;
    case 'download':
      s3.events = 'event67';
      b =
        /pds\.pdf(?:\?|$)/i.test(g.href) ||
        (/\b(terms and conditions|product disclosure statement)\b/i.test(g.innerHTML) && /\.pdf(?:\?|$)/i.test(g.href))
          ? 'pds:'
          : '';
      s3.linkTrackEvents = s3.events;
      s3.linkTrackVars = s3.w_ltv + ',eVar61,events';
      s3.eVar61 = b + util.lowerCase(g.href, 1).replace(/(.*\/)?(\.*?)/, '$2');
      s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
      s3.eVar1 = s3.prop1 = 'impression:download';
      s3.tl(g || !0, 'd', b + util.lowerCase(g.href, 1));
      s3.w_endTrckng();
      break;
    case 'call':
      (b = decodeURI(util.lowerCase(g.href, 1)).replace(/^tel:|\s+/gi, '')),
        (s3.linkTrackEvents = s3.events = 'event61,event69'),
        (s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,eVar59,events'),
        (s3.eVar54 = 'call:' + b),
        (s3.prop54 = 'D=v54'),
        (s3.eVar59 = b),
        (s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand)),
        (s3.eVar1 = s3.prop1 = 'impression:call'),
        s3.tl(g || !0, 'o', 'interaction:call:' + b),
        s3.w_endTrckng();
  }
};
s3.w_trackLiveChat = function (b, a) {
  b = s3.w_getEvtTrgt(b);
  a = a || {};
  var g = util.lowerCase(a.detail, 1),
    k = util.lowerCase(a.events, 1),
    n = util.lowerCase(a.type, 1);
  s3 = s3_gi(s3_account);
  s3.events = 'event63,event69' + k;
  s3.linkTrackEvents = 'event63,event69' + k.replace(/:.*/, '');
  s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,eVar55,eVar57,prop57,events';
  s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
  s3.eVar1 = s3.prop1 = 'interaction:live chat';
  s3.eVar55 = 'live chat:' + g;
  s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
  s3.eVar54 = s3.prop54 = 'live chat:' + n;
  s3.eVar57 = s3.prop57 = util.lowerCase(a.session, 1);
  s3.tl(b || !0, 'o', 'interaction:live chat:' + n);
  s3.w_endTrckng();
};
s3.w_trackChat = function (b, a) {
  b = s3.w_getEvtTrgt(b);
  var g = '',
    k = '',
    n = a || {};
  a = n.chatId || '';
  var D = n.chatbotName || '',
    B = n.chatAssistedId || '',
    E = n.chatIntend || '',
    K = n.chatAssistedDetails || '',
    c = util.lowerCase(n.chatEvent, 1);
  n = util.lowerCase(n.chatLocation, 1);
  'start' === c
    ? (g = 'event88' + (a ? ':' + a : ''))
    : 'interactive' === c
      ? (g = 'event89' + (a ? ':' + a : ''))
      : 'intend-changed' === c
        ? ((g = 'event90'), (k += E ? ',prop73' : ''), (s3.prop73 = 'chatbot:intend:' + E))
        : 'ended' === c
          ? (g = 'event91' + (a ? ':' + a : ''))
          : 'assisted-start' === c
            ? ((g = 'event92' + (a ? ':' + a : '')),
              (k = k + (B ? ',prop72' : '') + (K ? ',prop71' : '')),
              (s3.prop72 = 'chatbot:assisted-start:' + B),
              (s3.prop71 = 'chatbot:assisted-start:' + util.lowerCase(K, 1)))
            : 'assisted-interactive' === c
              ? ((g = 'event93' + (a ? ':' + a : '')),
                (k = k + (B ? ',prop72' : '') + (K ? ',prop71' : '')),
                (s3.prop72 = 'chatbot:assisted-interactive:' + B),
                (s3.prop71 = 'chatbot:assisted-interactive:' + util.lowerCase(K, 1)))
              : 'assisted-ended' === c
                ? ((g = 'event94' + (a ? ':' + a : '')),
                  (k = k + (B ? ',prop72' : '') + (K ? ',prop71' : '')),
                  (s3.prop72 = 'chatbot:assisted-ended:' + B),
                  (s3.prop71 = 'chatbot:assisted-ended:' + util.lowerCase(K, 1)))
                : 'feedback-start' === c
                  ? ((g = 'event95' + (a ? ':' + a : '')),
                    (k += B ? ',prop72' : ''),
                    (s3.prop72 = 'chatbot:feedback-start:' + B))
                  : 'feedback-ended' === c &&
                    ((g = 'event96' + (a ? ':' + a : '')),
                    (k += B ? ',prop72' : ''),
                    (s3.prop72 = 'chatbot:feedback-ended:' + B));
  s3 = s3_gi(s3_account);
  s3.events = 'event69,' + g;
  s3.linkTrackEvents = 'event69,' + g.replace(/:.*/, '');
  s3.linkTrackVars = s3.w_ltv + k + ',eVar54,prop54,eVar74,events';
  s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
  s3.eVar76 = D;
  s3.eVar1 = s3.prop1 = 'interaction:chatbot';
  s3.eVar54 = 'chatbot:' + c;
  s3.prop54 = 'chatbot:' + n;
  s3.eVar74 = util.lowerCase(a, 1);
  s3.tl(b || !0, 'o', 'interaction:chatbot:' + n);
  s3.w_endTrckng();
};
s3.w_trackRank = function (b) {
  b = s3.w_getEvtTrgt(b, 'data-analytics-rank');
  b = util.lowerCase(b && b.getAttribute('data-analytics-rank'), 1);
  s3.c_w('cpr', b);
};
s3.w_searchLoc = function (b) {
  b = s3.w_getEvtTrgt(b, 'data-analytics-search-searchsource');
  b = util.lowerCase(b && b.getAttribute('data-analytics-search-searchsource'), 1);
  s3.c_w('s_loc', b);
};
s3.w_searchKeyWords = function (b) {
  b = s3.w_getEvtTrgt(b, 'data-analytics-search-kw');
  b = util.lowerCase(b && b.getAttribute('data-analytics-search-kw'), 1);
  s3.c_w('s_kw', b);
};
s3.w_searchType = function (b) {
  b = s3.w_getEvtTrgt(b, 'data-analytics-search-type');
  b = util.lowerCase(b && b.getAttribute('data-analytics-search-type'), 1);
  s3.c_w('s_rt', b);
};
s3.w_searchCat = function (b) {
  b = s3.w_getEvtTrgt(b, 'data-analytics-search-cat');
  b = util.lowerCase(b && b.getAttribute('data-analytics-search-cat'), 1);
  s3.c_w('s_cat', b);
};
s3.w_notificationTitle = function (b) {
  b = s3.w_getEvtTrgt(b, 'data-analytics-notification-title');
  b = util.lowerCase(b && b.getAttribute('data-analytics-notification-title'), 1);
  s3.c_w('s_ntitle', b);
};
s3.w_notificationType = function (b) {
  b = s3.w_getEvtTrgt(b, 'data-analytics-notification-type');
  b = util.lowerCase(b && b.getAttribute('data-analytics-notification-type'), 1);
  s3.c_w('s_ntype', b);
};
s3.w_notificationLink = function (b) {
  b = s3.w_getEvtTrgt(b, 'data-analytics-notification-linktitle');
  b = util.lowerCase(b && b.getAttribute('data-analytics-notification-linktitle'), 1);
  s3.c_w('s_nlink', b);
};
s3.w_trackInteractionEvents = function (b, a) {
  s3.prop55 = '';
  if (a.interactionDetails) {
    var g = util.lowerCase(util.clean(a.interactionDetails));
    s3.prop55 = g || '';
    s3.w_ltv += ',prop55';
  }
  'custom' != b &&
    ('link' == b
      ? ((s3.events = 'event69'),
        (s3.linkTrackEvents = s3.events),
        (s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,events'),
        (s3.prop54 = s3.eVar54 = b + ':' + util.lowerCase(a.pageInteractions)),
        (s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand)),
        (s3.eVar1 = s3.prop1 = 'interaction:link'),
        s3.tl(!0, 'o', b))
      : 'download' == b
        ? ((s3.events = 'event67'),
          (s3.linkTrackEvents = s3.events),
          (s3.linkTrackVars = s3.w_ltv + ',eVar61,events'),
          (s3.eVar61 = util.lowerCase(a.pageInteractions)),
          (s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand)),
          (s3.eVar1 = s3.prop1 = 'interaction:download'),
          s3.tl(!0, 'd', b))
        : 'call' == b
          ? ((s3.events = 'event61,event69'),
            (s3.linkTrackEvents = s3.events),
            (s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,eVar59,events'),
            (s3.prop54 = s3.eVar54 = b + ':' + util.lowerCase(a.pageInteractions)),
            (s3.eVar59 = a),
            (s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand)),
            (s3.eVar1 = s3.prop1 = 'interaction:call'),
            s3.tl(!0, 'o', b))
          : 'exit' == b
            ? ((s3.linkTrackEvents = s3.events = ''),
              (s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,events'),
              (s3.prop54 = s3.eVar54 = b + ':' + util.lowerCase(a.pageInteractions)),
              (s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand)),
              (s3.eVar1 = s3.prop1 = 'interaction:exit'),
              s3.tl(!0, 'e', util.lowerCase(a.pageInteractions)))
            : 'button' == b
              ? ((s3.events = 'event69'),
                (s3.linkTrackEvents = s3.events),
                (s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,events'),
                (s3.prop54 = s3.eVar54 = b + ':' + util.lowerCase(a.pageInteractions)),
                (s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand)),
                (s3.eVar1 = s3.prop1 = 'interaction:button'),
                s3.tl(!0, 'o', b))
              : 'pidexit' == b &&
                ((s3.events = 'event12'),
                (s3.linkTrackEvents = s3.events),
                (s3.linkTrackVars = s3.w_ltv + ',eVar22,eVar54,prop54,events'),
                (s3.eVar22 = util.lowerCase(a.internalCampaignClicked)),
                (s3.prop54 = s3.eVar54 = b + ':' + util.lowerCase(a.pageInteractions)),
                (s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand)),
                (s3.eVar1 = s3.prop1 = 'interaction:pidexit'),
                s3.tl(!0, 'e', util.lowerCase(a.pageInteractions))));
  s3.w_endTrckng();
  return !0;
};
s3.w_trackInteraction = function (b, a) {
  a = a || {};
  var g = s3.w_getEvtTrgt(b, a.detail ? 'href' : 'data-tracking-link'),
    k = util.clean(decodeURIComponent(util.lowerCase(a.detail || (g && g.getAttribute('data-tracking-link')), 1)));
  'download' === k
    ? s3.w_trackLink(b, 'download')
    : ((s3 = s3_gi(s3_account)),
      (s3.linkTrackEvents = s3.events = 'event69'),
      (s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,events'),
      (s3.prop54 = s3.eVar54 = k),
      (s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand)),
      (s3.eVar1 = s3.prop1 = 'interaction'),
      s3.tl(g || !0, 'o', 'interaction:' + k),
      a.stopDefault && s3.w_stopEvt(b),
      s3.w_endTrckng());
};
s3.w_linkTracking = function (b) {
  var a = s3.w_getEvtTrgt(b, 'href'),
    g = new RegExp(s3.linkInternalFilters.replace(/^,|,$/g, '').replace(/,/g, '|'), 'i'),
    k = new RegExp('\\.(?:' + s3.linkDownloadFileTypes.replace(/,/g, '|') + ')(?:\\?|$)', 'i'),
    n = /(?:\/\/|\.)(?:youtube|facebook|twitter|linkedin|plus\.google)\.com/i,
    D = /(apps\.apple|play\.google)\.com(.*)(&|\?)(cid=|pid=|ttid=)/i;
  'A' === a.nodeName &&
    (s3.w_getNavMenuId(b),
    !g.test(a.href) && n.test(a.href) && s3.w_trackLink(b, 'social'),
    D.test(a.href) && s3.w_trackLink(b, 'exitCampaign'),
    !a.href || g.test(a.href) || n.test(a.href) || s3.w_trackLink(b, 'exit'),
    k.test(a.href) && s3.w_trackLink(b, 'download'),
    a.getAttribute('data-analytics-rank') && s3.w_trackRank(b),
    a.getAttribute('data-analytics-search-searchsource') && s3.w_searchLoc(b),
    a.getAttribute('data-analytics-search-kw') && s3.w_searchKeyWords(b),
    a.getAttribute('data-analytics-search-type') && s3.w_searchType(b),
    a.getAttribute('data-analytics-search-cat') && s3.w_searchCat(b),
    a.getAttribute('data-analytics-notification-title') && s3.w_notificationTitle(b),
    a.getAttribute('data-analytics-notification-type') && s3.w_notificationType(b),
    a.getAttribute('data-analytics-notification-linktitle') && s3.w_notificationLink(b),
    a.getAttribute('data-analytics-download') && s3.w_trackLink(b, 'custdownload'),
    /^mailto:/i.test(a.href) &&
      a.setAttribute(
        'data-tracking-link',
        'email:' + decodeURI(a.href.replace(/^mailto:/i, '').replace(/((?:&|\?)body=.*?(?=&|$))/gi, '')),
      ),
    (g = a.getAttribute('data-tracking-link')) &&
      !k.test(a.href) &&
      (s3.w_trackInteraction(b), /^trackonce:/i.test(g) && a.setAttribute('data-tracking-link', '')),
    /^tel:/i.test(a.href) && s3.w_trackLink(b, 'call'));
  window.performance || s3.c_w('navt', +new Date(), new Date(+new Date() + 3e4));
  digital = {};
};
s3.w_prodArr = function (b) {
  var a = 0,
    g;
  if (b && 'object' !== typeof b) {
    b = String(b).split(',');
    var k = [];
    for (g = b.length; a < g; a++) b[a] && k.push({ prod: b[a] });
  } else k = b || [];
  return k;
};
s3.w_prodStr = function (b, a) {
  var g = [],
    k = util.lowerCase(util.clean(a.formStatus)),
    n = util.lowerCase(util.clean(a.pageType));
  util.lowerCase(util.clean(a.pageStep));
  var D;
  a = b.length;
  var B,
    E = !1,
    K = 0;
  var c = a;
  for (var h, m = !1; c--; )
    if (b[c].Product && /true/i.test(b[c].crossSell)) {
      m = !0;
      break;
    }
  for (c = 0; c < a; c++)
    if (b[c].Product || b[c].prod) {
      K += 1;
      h = m ? /true/i.test(b[c].crossSell) : 1 < K ? !0 : !1;
      var r = b[c].events;
      var u = b[c].merch;
      u = 'options=' === u ? '' : u;
      if (r) {
        r = r.split('|');
        u = u ? u.split('|') : [];
        for (D = 0; D < r.length; D++) {
          var H = r[D].split('=');
          var A = (B = H[0]);
          /^deposit\b/.test(B) && (A = 'event5');
          /^payment\b/.test(B) && (A = 'event40');
          /^loan\b/.test(B) && (A = 'event41');
          if (/^(?:deposit|payment|loan|\(not set\))(?::|$)/.test(B)) {
            var G = (H[1] || '').match(/^(\D*)(.*)/);
            H = (G[1] || '$').toUpperCase();
            '$' === H && (H = 'AUD');
            E || ((E = !0), (s3.currencyCode = H));
            H !== s3.currencyCode && (H += '-mix');
            G = G[2];
            G = util.amntBnds(B + (k ? ':' + k : '') + ':' + H, G);
            /^(?:\(not set\))(?::|$)/.test(B)
              ? (r[D] = '')
              : ((r[D] = A + '=' + (H === s3.currencyCode ? G.avg : 0)), s3.w_addEvt(A));
            (0 === G.avg && '(not set)' === B) || u.push('eVar51=' + G.range);
          }
        }
        r = r.join('|');
        u = u.join('|');
      }
      g.push(
        util.lowerCase(b[c].cat || '') +
          ';' +
          util.lowerCase(util.lowerCase((b[c].Product || b[c].prod).replace(/,/g, ' '))) +
          ('application' === n && h ? '-x' : '') +
          ';' +
          (b[c].qty || '1') +
          ';' +
          (b[c].total || '') +
          ';' +
          (r || '') +
          ';' +
          (u || '').replace(/(^|\|)options=/g, '$1eVar37='),
      );
    }
  return g.join(',').replace(/;;;,/g, ',').replace(/;;;$/, '');
};
s3.w_log = function (b, a) {
  if (s3.c_rr('s3_pers_wp_dev') || !s3.w_prod)
    try {
      console.info(b + ' : ' + a);
    } catch (g) {}
};
s3.w_trackErrorCount = function (b, a) {
  b &&
    b > s3.c_r('errCount') &&
    (a || s3.c_w('errCode', s3.apl(s3.c_r('errCode'), '(count)', ',', 2)), s3.c_w('errCount', b));
};
s3.w_trackError = function (b) {
  var a;
  if (b) {
    var g = String(b || '').split(',');
    b = s3.c_r('errCode');
    var k = 0;
    for (a = g.length; k < a; k++)
      g[k] && (b = s3.apl(b, util.lowerCase(util.clean(util.clean(g[k]).substring(0, 50))), ',', 2));
    s3.c_w('errCode', b);
    s3.w_trackErrorCount(b.split(',').length, !0);
  } else if ((g = document.getElementById('error-message')))
    (a = g.getElementsByTagName('li').length),
      s3.c_w('errCode', s3.apl(s3.c_r('errCode'), '(auto)', ',', 2)),
      s3.w_trackErrorCount(a, !0);
};
s3.w_collectStoredData = function (b) {
  b = new Date(0);
  s3.list2 = s3.c_r('visImpTmp');
  s3.c_w('visImpTmp', 0, b);
  s3.c_r('errCount') &&
    ((s3.prop17 = s3.c_r('errCode')),
    (s3.eVar30 = 'errors:' + util.cap(s3.c_r('errCount'), 50)),
    s3.c_w('errCode', 0, b),
    s3.c_w('errCount', 0, b));
  var a = s3.c_r('s_ttid'),
    g = s3.c_r('s_tloc'),
    k = s3.c_r('s_tAction'),
    n = s3.c_r('s_pid');
  n &&
    ((s3.eVar22 = n + s3.eVar22 ? ',' + s3.eVar22 : ''),
    (s3.events = s3.apl(s3.events, 'event12', ',', 2)),
    s3.c_w('s_pid', 0, b));
  a &&
    ((s3.eVar33 = a),
    (s3.prop33 = a),
    g && (s3.prop32 = g),
    k && ((s3.eVar53 = k), (s3.prop53 = k)),
    (s3.events = s3.apl(s3.events, 'event9', ',', 2)),
    s3.c_w('s_ttid', 0, b),
    s3.c_w('s_tloc', 0, b),
    s3.c_w('s_tAction', 0, b));
  a = s3.c_r('s_loc') || util.lowerCase(util.getQueryParam('searchsource', '', util.getLoc().href));
  g = s3.c_r('s_rt') || util.lowerCase(util.getQueryParam('result-type', '', util.getLoc().href));
  k = s3.c_r('s_kw') || util.lowerCase(util.getQueryParam('kw', '', util.getLoc().href));
  n = s3.c_r('s_cat') || util.lowerCase(util.getQueryParam('cat', '', util.getLoc().href));
  var D = util.cap(s3.c_r('cpr'), 101);
  D &&
    ((s3.eVar13 = 'source:' + a + '|type:' + g + '|kw:' + k + '|cat:' + n + '|rank:' + D),
    (s3.prop16 = D),
    (s3.events = s3.apl(s3.events, 'event15', ',', 2)),
    s3.c_w('s_loc', 0, b),
    s3.c_w('s_kw', 0, b),
    s3.c_w('s_rt', 0, b),
    s3.c_w('s_cat', 0, b),
    s3.c_w('cpr', 0, b));
  a = s3.c_r('s_ntitle') || '';
  g = s3.c_r('s_ntype') || '(not set)';
  k = s3.c_r('s_nlink') || '';
  a &&
    ((s3.eVar75 = util.lowerCase(g + ':' + a)),
    k && (s3.prop76 = util.lowerCase(k)),
    (s3.events = s3.apl(s3.events, 'event98', ',', 2)),
    s3.c_w('s_ntitle', 0, b),
    s3.c_w('s_ntype', 0, b),
    s3.c_w('s_nlink', 0, b));
};
s3.w_globalDrop = function (b) {
  var a = 0,
    g = util.lStor('get', 'appmeasurement_nameKeyDrop');
  g &&
    (a = new RegExp('(^|,)' + String(b._nameKey).replace(/([.*+?\^=!:${}()\|\[\]\/\\])/g, '\\$1') + '(,|$)').test(g));
  return a;
};
s3.w_changeIf = function (b) {
  var a,
    g = b.changeIf || [],
    k,
    n = {
      '(lastpage)': s3.c_r('lastPage'),
      '(location)': util.getLoc().href,
      '(referrer)': document.referrer,
      '(s3_pers)': s3.c_rr('s3_pers'),
      '(s3_sess)': s3.c_rr('s3_sess'),
    };
  try {
    'string' === typeof g && (g = JSON.parse(g));
  } catch (h) {
    g = [];
  }
  var D = g.length;
  for (a = 0; a < D; a++) {
    var B = g[a];
    if (B.item && B.like && B.then) {
      var E = String(n[B.item] || b[B.item] || '');
      var K = String(n[(B.equals || '').replace(/\((s_pers|s_sess)\)/i, '')] || b[B.equals] || B.equals || '');
      var c = !0;
      (k = B.and) && k.item && k.like && (c = new RegExp(k.like, 'i').test(String(n[k.item] || b[k.item] || '')));
      new RegExp(B.like, 'i').test(E) &&
        c &&
        (B.replace && (K = K.replace(new RegExp(B.replace.exp, B.replace.flags || ''), B.replace.subs || '')),
        (b[B.then] = K));
    }
  }
};
s3.trackImprs = function () {
  var b,
    a = [];
  var g = util.qSA(document, "a[href*='pid\\='],[data-analytics-pid]", 'A', 'href', /pid=/i);
  for (b = g.length; b--; ) {
    var k = g[b];
    var n = k.getAttribute('href');
    n = /^#/.test(n) ? n : k.href;
    (n = util.getQueryParam('pid', '', n)) &&
      util.isVisible(0, k) &&
      !k.getAttribute('data-analytics-pid-imp') &&
      (a.push(n.replace(/,/g, '%2C')), k.setAttribute('data-analytics-pid-imp', '1'));
  }
  a && s3.trackImpression(a.join(','));
};
s3.trackImpression = function (b) {
  var a = b;
  if (
    !util.isPageHidden() &&
    (a &&
      'A' === a.nodeName &&
      (util.isVisible(0, a) && !a.getAttribute('data-analytics-pid-imp')
        ? ((b = a.getAttribute('href')),
          (b = /^#/.test(b) ? b : a.href),
          (b = util.getQueryParam('pid', '', b)) && a.setAttribute('data-analytics-pid-imp', '1'))
        : (b = 0)),
    b)
  ) {
    var g = String(b || '');
    var k = g.split(',');
    g = s3.c_r('visImpTmp') || '';
    a = 0;
    for (b = k.length; a < b; a++) k[a] && (g = s3.apl(g, util.lowerCase(k[a]), ',', 2));
    s3.c_w('visImpTmp', g, new Date(+new Date() + 864e5));
  }
  return g;
};
s3.targetImpression = function (b) {
  for (
    var a = util.qSA(document, '.target-container', 'span', 'class', /target-container/i), g = [], k = a.length;
    k--;

  ) {
    var n = a[k].getAttribute('data-target-var');
    n && g.push(n.replace(/,/g, '%2C'));
  }
  if (b) for (b = b.split(','), a = b.length; a--; ) g.push(b[a]);
  return g && 0 < g.length ? g.join(',') : '';
};
s3.w_trackTargetImpressionObj = function (b) {
  var a = decodeURIComponent(util.lowerCase(b.targetCampaignViewed)),
    g = decodeURIComponent(util.lowerCase(b.targetLocationId));
  b = util.lowerCase(b.pageModules);
  window.serverState && window.visitor && (visitor.resetState(window.serverState), delete window.serverState);
  if (a)
    return (
      (s3.events = 'event8'),
      (s3.linkTrackVars = s3.w_ltv + ',prop32,prop41,list3,events'),
      (s3.list3 = a),
      (s3.linkTrackEvents = s3.events),
      (s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand)),
      (s3.eVar1 = s3.prop1 = 'target:impression'),
      (s3.prop41 = b),
      (s3.prop32 = g),
      s3.tl(!0, 'o', 'target:impression:' + a),
      delete pageDetails.targetCampaignViewed,
      delete pageDetails.targetLocationId,
      delete pageDetails.pageModules,
      s3.w_endTrckng(),
      !0
    );
};
s3.w_trackTargetImpression = function (b) {
  var a = decodeURIComponent(
      util.lowerCase('object' == typeof b ? b.internalCampaignViewed : pageDetails.internalCampaignViewed),
    ),
    g = decodeURIComponent(
      util.lowerCase('object' == typeof b ? b.targetCampaignViewed : pageDetails.targetCampaignViewed),
    ),
    k = decodeURIComponent(util.lowerCase('object' == typeof b ? b.promoCode : pageDetails.promoCode)),
    n = decodeURIComponent(util.lowerCase('object' == typeof b ? b.campaignCode : pageDetails.campaignCode));
  g && b && 'object' != typeof b && (g = g + ',' + b);
  if (g || a) {
    window.serverState && window.visitor && (visitor.resetState(window.serverState), delete window.serverState);
    g && a
      ? ((s3.events = 'event8,event11'),
        (s3.linkTrackVars = s3.w_ltv + ',prop32,prop41,list2,list3,events'),
        (s3.list2 = a),
        (s3.list3 = s3.targetImpression(g)))
      : g
        ? ((s3.events = 'event8'),
          (s3.linkTrackVars = s3.w_ltv + ',prop32,prop41,list3,events'),
          (s3.list3 = s3.targetImpression(g)))
        : a && ((s3.events = 'event11'), (s3.linkTrackVars = s3.w_ltv + ',prop32,prop41,list2,events'), (s3.list2 = a));
    if (k || n)
      (s3.events += ',event6'),
        (s3.linkTrackVars += ',eVar11'),
        (s3.eVar11 = util.lowerCase(
          (pageDetails.campaignCode ? 'cc:' + pageDetails.campaignCode : '') +
            (pageDetails.promoCode ? '|pc:' + pageDetails.promoCode : ''),
        ));
    s3.linkTrackEvents = s3.events;
    s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
    s3.eVar1 = s3.prop1 = 'target:impression';
    s3.prop41 = util.lowerCase(pageDetails.pageModules || '');
    s3.prop32 = util.lowerCase(pageDetails.targetLocationId || '');
    s3.tl(!0, 'o', 'target:impression:' + g + (a ? '|' + a : ''));
    s3.w_endTrckng();
    return !0;
  }
  return !1;
};
s3.w_trackTargetDismissExpand = function (b, a) {
  var g = decodeURIComponent(
      util.lowerCase('object' == typeof a ? a.targetCampaignViewed : pageDetails.targetCampaignViewed),
    ),
    k = decodeURIComponent(util.lowerCase('object' == typeof a ? a.action : pageDetails.action)),
    n = decodeURIComponent(util.lowerCase('object' == typeof a ? a.pageModules : pageDetails.pageModules));
  targetLocation = decodeURIComponent(
    util.lowerCase('object' == typeof a ? a.targetLocationId : pageDetails.targetLocationId),
  );
  return g
    ? (b &&
        ('dismiss' == b ? (s3.events = 'event4') : 'expanded' == b && (s3.events = 'event31'),
        (s3.linkTrackVars = s3.w_ltv + ',prop32,prop41,list3,events'),
        (s3.list3 = g)),
      k && ((s3.linkTrackVars += ',eVar53,prop53'), (s3.eVar53 = k), (s3.prop53 = k)),
      (s3.linkTrackEvents = s3.events),
      (s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand)),
      (s3.eVar1 = s3.prop1 = 'target:' + b),
      (s3.prop41 = n || ''),
      (s3.prop32 = targetLocation || ''),
      s3.tl(!0, 'o', 'target:' + b + g),
      s3.w_endTrckng(),
      !0)
    : !1;
};
s3.w_trackNotification = function (b, a) {
  a = 'object' == typeof a ? a.notification : '';
  var g = '';
  if (a && 1 <= a.length) for (var k = 0; k < a.length; k++) g = s3.apl(g, a[k].notificationTitle || '', ',', 2);
  return g
    ? ('impression' === b ? (s3.events = 'event97') : 'close' === b && (s3.events = 'event99'),
      (s3.linkTrackVars = s3.w_ltv + ',eVar75,events'),
      (s3.eVar75 = g),
      (s3.linkTrackEvents = s3.events),
      (s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand)),
      (s3.eVar1 = s3.prop1 = 'impression'),
      s3.tl(!0, 'o', 'notification:' + b + ':' + g),
      delete pageDetails.internalCampaignViewed,
      delete pageDetails.targetCampaignViewed,
      s3.w_endTrckng(),
      !0)
    : !1;
};
s3.w_trackMedia = function (b) {
  var a = b.id,
    g = b.title || '',
    k = b.duration || '',
    n = b.event || '',
    D = b.currentTime || '';
  s3.linkTrackEvents = s3.events = '';
  s3.linkTrackVars = '';
  s3.prop20 = '';
  'loaded' === n
    ? (s3.linkTrackEvents = s3.events = 'event81')
    : 'open' === n && a
      ? (s3.linkTrackEvents = s3.events = 'event82')
      : '25' === n && a
        ? (s3.linkTrackEvents = s3.events = 'event83')
        : '50' === n && a
          ? (s3.linkTrackEvents = s3.events = 'event84')
          : '75' === n && a
            ? (s3.linkTrackEvents = s3.events = 'event85')
            : 'completed' === n
              ? (s3.linkTrackEvents = s3.events = 'event79')
              : 'skipping' === n
                ? ((s3.prop20 = 'video:skipped:' + D), (s3.linkTrackEvents = s3.events = 'event69'))
                : 'stop' === n && ((s3.prop20 = 'video:paused:' + D), (s3.linkTrackEvents = s3.events = 'event69'));
  s3.linkTrackVars = s3.w_ltv + ',eVar80,prop68,prop20,events';
  s3.eVar80 = s3.prop68 = k + '|' + g;
  s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
  s3.eVar1 = s3.prop1 = 'video';
  s3.tl(!0, 'o', 'video:' + n + ':' + a);
  delete b.event;
  delete b.currentTime;
  s3.w_endTrckng();
  return !0;
};
s3.w_pageTracked = function (b) {
  var a,
    g = !1;
  s3.w_trackedPages = s3.w_trackedPages || [];
  for (a = s3.w_trackedPages.length; a--; )
    if (s3.w_trackedPages[a] === b) {
      g = !0;
      break;
    }
  g || s3.w_trackedPages.push(b);
  return g;
};
s3.w_queue = [];
s3.w_trackPage = function (b) {
  var a = b || pageDetails;
  b = s3.c_r('lppn');
  delete a._drop;
  a.originNameKeyDrop && util.lStor('set', 'appmeasurement_nameKeyDrop', a.originNameKeyDrop);
  a.originPageNameReplace && util.lStor('set', 'appmeasurement_pageNameReplace', a.originPageNameReplace);
  a.originProductsReplace && util.lStor('set', 'appmeasurement_productsReplace', a.originProductsReplace);
  s3.w_pgTrkStatus = a.s_abort ? 'blocked' : 'started';
  var g = util.cloneObject(a);
  /true/i.test(g.reset) && ((pageDetails = {}), (digital = {}));
  delete a.trackAsLink;
  delete a.s_linkType;
  delete a.trackOnce;
  delete a.s_abort;
  delete a.addEvents;
  delete a.sendDelay;
  s3.siteID = !1;
  dcPageName = g.pageName || '0';
  s3.w_changeIf(g);
  a =
    (g.s_pageName ||
      (g.newFormName
        ? g.newFormName + (g.pageType || '0') + dcPageName
        : g.transactionType
          ? g.transactionType + dcPageName
          : (g.subSite || '0') +
            (g.pageName
              ? (g.pageNamePrefixes || '0') + dcPageName
              : decodeURIComponent(util.getPageName(util.pageURL))))) +
    (g.pageType || '0') +
    (g.dialogTitle || '0') +
    (g.itemName || '0') +
    (g.pageNameReplace || '0');
  g._nameKey = ((g.pageKey || '0') + (g.experience || '0') + a).replace(/,/g, '_');
  /reset/i.test(g.trackOnce) && (s3.w_trackedPages = 0);
  g.s_abort ||
  (/true/i.test(g.trackDedupe) && b === a) ||
  (/true/i.test(g.trackOnce) && s3.w_pageTracked('pre_' + a)) ||
  s3.w_globalDrop(g)
    ? ((g._drop = 1), (s3.w_pgTrkStatus = 'blocked'))
    : s3.c_w('lppn', a, new Date(+new Date() + 18e5));
  s3.clearVars();
  s3.w_log('s3 pageDetails', unescape(JSON.stringify(g, null, 4).replace(/\\u([\w\d]{4})/g, '%u$1')));
  g.s_abort || g._drop
    ? s3.w_log('s3_drop', !0)
    : (/^prod$/i.test(g.siteEnv) && ((s3_account = 'wbg-banking-prd'), +s3.sa(s3_account)),
      s3.c_r('f_prd') && ((s3_account = 'wbg-banking-prd'), s3.sa(s3_account)),
      (s3.w_pgTrkStatus = 'sent'),
      (s3.w_perfTracked = !0),
      s3.w_collectStoredData(digital),
      s3.w_queue.push(g),
      s3.t(),
      s3.trackImprs(),
      s3.w_endTrckng(),
      s3.w_log('context data s3', unescape(JSON.stringify(digital, null, 4).replace(/\\u([\w\d]{4})/g, '%u$1'))),
      (digital = {}));
};
s3.ActivityMap.link = function (b, a) {
  if (b) {
    var g = b.getAttribute('data-s-object-id');
    if (g) return g;
    if ('A' == b.tagName && b.href)
      return /^mailto:/i.test(b.href)
        ? 'email:' + decodeURI(b.href.replace(/^mailto:/i, '').replace(/((?:&|\?)body=.*?(?=&|$))/gi, ''))
        : /^tel:/i.test(b.href)
          ? 'call:' + decodeURI(util.lCase(b.href, 1)).replace(/^tel:|\s+/gi, '')
          : b.href;
  }
  return a ? a : '';
};
s3.ActivityMap.region = function (b) {
  for (var a, g = b; (b &&= b.parentNode); )
    if (1 === b.nodeType && (a = b.getAttribute('data-analytics-nav'))) return a;
  b = g;
  var k;
  for (
    g = {
      'top-header': 1,
      topnav: 1,
      header: 1,
      breadcrumb: 1,
      'leftside-navigation': 1,
      asideright: 1,
      content: 1,
      footer: 1,
      'title-bar': 1,
      'main-nav': 1,
      'footer-nav': 1,
      'interaction-wrapper': 1,
    };
    (b &&= b.parentNode);

  )
    if (1 === b.nodeType) {
      a = b.className.split(' ');
      for (var n = 0; n < a.length; ++n) if ((k = a[n]) && g[k]) return k;
    }
  return 'BODY';
};
util.addHandler(document, 'click', s3.w_linkTracking);
s3.loadModule('AudienceManagement');
function AppMeasurement_Module_AudienceManagement(b) {
  var a = this;
  a.s = b;
  var g = window;
  g.s_c_in || ((g.s_c_il = []), (g.s_c_in = 0));
  a._il = g.s_c_il;
  a._in = g.s_c_in;
  a._il[a._in] = a;
  g.s_c_in++;
  a._c = 's_m';
  a.setup = function (k) {
    g.DIL &&
      k &&
      ((k.disableDefaultRequest = !0),
      (k.disableScriptAttachment = !0),
      (k.disableCORS = !0),
      (k.secureDataCollection = !1),
      (a.instance = g.DIL.create(k)),
      (a.tools = g.DIL.tools));
  };
  a.isReady = function () {
    return a.instance ? !0 : !1;
  };
  a.getEventCallConfigParams = function () {
    return a.instance && a.instance.api && a.instance.api.getEventCallConfigParams
      ? a.instance.api.getEventCallConfigParams()
      : {};
  };
  a.passData = function (k) {
    a.instance && a.instance.api && a.instance.api.passData && a.instance.api.passData(k);
  };
}
!(function () {
  var b, a, g;
  'function' != typeof window.DIL &&
    ((window.DIL = function (k, n) {
      function D(t) {
        return void 0 === t || !0 === t;
      }
      var B,
        E,
        K = [],
        c = {};
      k !== Object(k) && (k = {});
      var h = k.partner;
      var m = k.containerNSID;
      var r = k.mappings;
      var u = k.uuidCookie;
      var H = !0 === k.enableErrorReporting;
      var A = k.visitorService;
      var G = k.declaredId;
      var N = !0 === k.delayAllUntilWindowLoad;
      var S = D(k.secureDataCollection);
      var W = 'boolean' == typeof k.isCoopSafe ? k.isCoopSafe : null;
      var da = D(k.enableHrefererParam);
      var aa = D(k.enableLogging);
      var Ba = D(k.enableUrlDestinations);
      var wa = D(k.enableCookieDestinations);
      var Ia = !0 === k.disableDefaultRequest;
      var Ga = k.afterResultForDefaultRequest;
      var Ua = k.visitorConstructor;
      var Oa = !0 === k.disableCORS;
      var fa = !0 === k.ignoreHardDependencyOnVisitorAPI;
      H && DIL.errorModule.activate();
      fa &&
        K.push(
          'Warning: this instance is configured to ignore the hard dependency on the VisitorAPI service. This means that no URL destinations will be fired if the instance has no connection to VisitorAPI. If the VisitorAPI service is not instantiated, ID syncs will not be fired either.',
        );
      H = !0 === window._dil_unit_tests;
      if (((B = n) && K.push(B + ''), !h || 'string' != typeof h))
        return (
          (G = {
            name: 'error',
            message: (B = 'DIL partner is invalid or not specified in initConfig'),
            filename: 'dil.js',
          }),
          DIL.errorModule.handleError(G),
          Error(B)
        );
      if (
        ((B = 'DIL containerNSID is invalid or not specified in initConfig, setting to default of 0'),
        (m || 'number' == typeof m) && ((m = parseInt(m, 10)), !isNaN(m) && 0 <= m && (B = '')),
        B && ((m = 0), K.push(B), (B = '')),
        (E = DIL.getDil(h, m)) instanceof DIL && E.api.getPartner() === h && E.api.getContainerNSID() === m)
      )
        return E;
      if (!(this instanceof DIL))
        return new DIL(
          k,
          "DIL was not instantiated with the 'new' operator, returning a valid instance with partner = " +
            h +
            ' and containerNSID = ' +
            m,
        );
      DIL.registerDil(this, h, m);
      var Aa = {
          doesConsoleLogExist: window.console === Object(window.console) && 'function' == typeof window.console.log,
          logMemo: {},
          log: function (t) {
            (K.push(t), aa && this.doesConsoleLogExist) &&
              Function.prototype.bind.call(window.console.log, window.console).apply(window.console, arguments);
          },
          logOnce: function (t) {
            this.logMemo[t] || ((this.logMemo[t] = !0), Aa.log(t));
          },
        },
        qa = {
          IS_HTTPS: S || 'https:' === document.location.protocol,
          SIX_MONTHS_IN_MINUTES: 259200,
          IE_VERSION: (function () {
            if (document.documentMode) return document.documentMode;
            for (var t = 7; 4 < t; t--) {
              var F = document.createElement('div');
              if (
                ((F.innerHTML = '\x3c!--[if IE ' + t + ']><span></span><![endif]--\x3e'),
                F.getElementsByTagName('span').length)
              )
                return t;
            }
            return null;
          })(),
        };
      qa.IS_IE_LESS_THAN_10 = 'number' == typeof qa.IE_VERSION && 10 > qa.IE_VERSION;
      var ya = { stuffed: {} },
        ka = {},
        ha = {
          firingQueue: [],
          fired: [],
          firing: !1,
          sent: [],
          errored: [],
          reservedKeys: { sids: !0, pdata: !0, logdata: !0, callback: !0, postCallbackFn: !0, useImageRequest: !0 },
          firstRequestHasFired: !1,
          abortRequests: !1,
          num_of_cors_responses: 0,
          num_of_cors_errors: 0,
          corsErrorSources: [],
          num_of_img_responses: 0,
          num_of_img_errors: 0,
          platformParams: { d_nsid: m + '', d_rtbd: 'json', d_jsonv: DIL.jsonVersion + '', d_dst: '1' },
          nonModStatsParams: { d_rtbd: !0, d_dst: !0, d_cts: !0, d_rs: !0 },
          modStatsParams: null,
          adms: {
            TIME_TO_CATCH_ALL_REQUESTS_RELEASE: 3e4,
            calledBack: !1,
            mid: null,
            noVisitorAPI: null,
            VisitorAPI: null,
            instance: null,
            releaseType: 'no VisitorAPI',
            isOptedOut: !0,
            isOptedOutCallbackCalled: !1,
            admsProcessingStarted: !1,
            process: function (t) {
              try {
                if (!this.admsProcessingStarted) {
                  this.admsProcessingStarted = !0;
                  var F, I, P;
                  if ('function' != typeof t || 'function' != typeof t.getInstance)
                    throw ((this.noVisitorAPI = !0), Error('Visitor does not exist.'));
                  if (A !== Object(A) || !(F = A.namespace) || 'string' != typeof F)
                    throw (
                      ((this.releaseType = 'no namespace'),
                      Error(
                        "DIL.create() needs the initConfig property `visitorService`:{namespace:'<Experience Cloud Org ID>'}",
                      ))
                    );
                  if (
                    !(
                      (I = t.getInstance(F, { idSyncContainerID: m })) === Object(I) &&
                      I instanceof t &&
                      'function' == typeof I.isAllowed &&
                      'function' == typeof I.getMarketingCloudVisitorID &&
                      'function' == typeof I.getCustomerIDs &&
                      'function' == typeof I.isOptedOut &&
                      'function' == typeof I.publishDestinations
                    )
                  )
                    throw (
                      ((this.releaseType = 'invalid instance'),
                      (P = 'Invalid Visitor instance.'),
                      I === Object(I) &&
                        'function' != typeof I.publishDestinations &&
                        (P +=
                          ' In particular, visitorInstance.publishDestinations is not a function. This is needed to fire URL destinations in DIL v8.0+ and should be present in Visitor v3.3.0+ .'),
                      Error(P))
                    );
                  if (((this.VisitorAPI = t), !I.isAllowed()))
                    return (
                      (this.releaseType = 'VisitorAPI is not allowed to write cookies'), void this.releaseRequests()
                    );
                  this.instance = I;
                  this.waitForMidToReleaseRequests();
                }
              } catch (V) {
                if (!fa)
                  throw Error(
                    'Error in processing Visitor API, which is a hard dependency for DIL v8.0+: ' + V.message,
                  );
                this.releaseRequests();
              }
            },
            waitForMidToReleaseRequests: function () {
              var t = this;
              this.instance &&
                (this.instance.getMarketingCloudVisitorID(function (F) {
                  t.mid = F;
                  t.releaseType = 'VisitorAPI';
                  t.releaseRequests();
                }, !0),
                (!Ka.exists || (!Ka.isIabContext && Ka.isApproved()) || (Ka.isIabContext && za.hasGoSignal())) &&
                  setTimeout(function () {
                    'VisitorAPI' !== t.releaseType && ((t.releaseType = 'timeout'), t.releaseRequests());
                  }, this.getLoadTimeout()));
            },
            releaseRequests: function () {
              this.calledBack = !0;
              ha.registerRequest();
            },
            getMarketingCloudVisitorID: function () {
              return this.instance ? this.instance.getMarketingCloudVisitorID() : null;
            },
            getMIDQueryString: function () {
              var t = T.isPopulatedString,
                F = this.getMarketingCloudVisitorID();
              return (t(this.mid) && this.mid === F) || (this.mid = F), t(this.mid) ? 'd_mid=' + this.mid + '&' : '';
            },
            getCustomerIDs: function () {
              return this.instance ? this.instance.getCustomerIDs() : null;
            },
            getCustomerIDsQueryString: function (t) {
              if (t !== Object(t)) return '';
              var F,
                I,
                P = '',
                V = [],
                Z = [];
              for (F in t)
                t.hasOwnProperty(F) &&
                  (I = t[(Z[0] = F)]) === Object(I) &&
                  ((Z[1] = I.id || ''), (Z[2] = I.authState || 0), V.push(Z), (Z = []));
              if ((F = V.length)) for (t = 0; t < F; t++) P += '&d_cid_ic=' + oa.encodeAndBuildRequest(V[t], '%01');
              return P;
            },
            getIsOptedOut: function () {
              this.instance
                ? this.instance.isOptedOut([this, this.isOptedOutCallback], this.VisitorAPI.OptOut.GLOBAL, !0)
                : ((this.isOptedOut = !1), (this.isOptedOutCallbackCalled = !0));
            },
            isOptedOutCallback: function (t) {
              this.isOptedOut = t;
              this.isOptedOutCallbackCalled = !0;
              ha.registerRequest();
              Ka.isIabContext() && za.checkQueryStringObject();
            },
            getLoadTimeout: function () {
              var t = this.instance;
              if (t) {
                if ('function' == typeof t.getLoadTimeout) return t.getLoadTimeout();
                if (void 0 !== t.loadTimeout) return t.loadTimeout;
              }
              return this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE;
            },
          },
          declaredId: {
            declaredId: { init: null, request: null },
            declaredIdCombos: {},
            setDeclaredId: function (t, F) {
              var I = T.isPopulatedString,
                P = encodeURIComponent;
              if (t === Object(t) && I(F)) {
                var V = t.dpid;
                t = t.dpuuid;
                var Z = null;
                if (I(V) && I(t))
                  return (
                    (Z = P(V) + '$' + P(t)),
                    !0 === this.declaredIdCombos[Z]
                      ? "setDeclaredId: combo exists for type '" + F + "'"
                      : ((this.declaredIdCombos[Z] = !0),
                        (this.declaredId[F] = { dpid: V, dpuuid: t }),
                        "setDeclaredId: succeeded for type '" + F + "'")
                  );
              }
              return "setDeclaredId: failed for type '" + F + "'";
            },
            getDeclaredIdQueryString: function () {
              var t = this.declaredId.request,
                F = this.declaredId.init,
                I = encodeURIComponent,
                P = '';
              return (
                null !== t
                  ? (P = '&d_dpid=' + I(t.dpid) + '&d_dpuuid=' + I(t.dpuuid))
                  : null !== F && (P = '&d_dpid=' + I(F.dpid) + '&d_dpuuid=' + I(F.dpuuid)),
                P
              );
            },
          },
          registerRequest: function (t) {
            var F,
              I = this.firingQueue;
            t === Object(t) && (I.push(t), t.isDefaultRequest || (Ia = !0));
            this.firing ||
              !I.length ||
              (N && !DIL.windowLoaded) ||
              (this.adms.isOptedOutCallbackCalled || this.adms.getIsOptedOut(),
              this.adms.calledBack &&
                !this.adms.isOptedOut &&
                this.adms.isOptedOutCallbackCalled &&
                (Ka.isApproved() || za.hasGoSignal()) &&
                ((this.adms.isOptedOutCallbackCalled = !1),
                ((F = I.shift()).src = F.src.replace(
                  /&d_nsid=/,
                  '&' + this.adms.getMIDQueryString() + za.getQueryString() + 'd_nsid=',
                )),
                T.isPopulatedString(F.corsPostData) &&
                  (F.corsPostData = F.corsPostData.replace(
                    /^d_nsid=/,
                    this.adms.getMIDQueryString() + za.getQueryString() + 'd_nsid=',
                  )),
                Pa.fireRequest(F),
                this.firstRequestHasFired ||
                  ('script' !== F.tag && 'cors' !== F.tag) ||
                  (this.firstRequestHasFired = !0)));
          },
          processVisitorAPI: function () {
            this.adms.process(Ua || window.Visitor);
          },
          getCoopQueryString: function () {
            var t = '';
            return !0 === W ? (t = '&d_coop_safe=1') : !1 === W && (t = '&d_coop_unsafe=1'), t;
          },
        };
      c.requestController = ha;
      var Ja,
        Xa,
        Qa = {
          sendingMessages: !1,
          messages: [],
          messagesPosted: [],
          destinations: [],
          destinationsPosted: [],
          jsonForComparison: [],
          jsonDuplicates: [],
          jsonWaiting: [],
          jsonProcessed: [],
          publishDestinationsVersion: null,
          requestToProcess: function (t, F) {
            function I() {
              V.jsonForComparison.push(t);
              V.jsonWaiting.push([t, F]);
            }
            var P,
              V = this;
            if (t && !T.isEmptyObject(t))
              if (((P = JSON.stringify(t.dests || [])), this.jsonForComparison.length)) {
                var Z,
                  na,
                  pa = !1;
                var la = 0;
                for (Z = this.jsonForComparison.length; la < Z; la++)
                  if (((na = this.jsonForComparison[la]), P === JSON.stringify(na.dests || []))) {
                    pa = !0;
                    break;
                  }
                pa ? this.jsonDuplicates.push(t) : I();
              } else I();
            this.jsonWaiting.length &&
              ((P = this.jsonWaiting.shift()), this.process(P[0], P[1]), this.requestToProcess());
            this.messages.length && !this.sendingMessages && this.sendMessages();
          },
          process: function (t) {
            if (Ba) {
              var F,
                I,
                P,
                V = encodeURIComponent,
                Z = this.getPublishDestinationsVersion(),
                na = !1;
              if (-1 !== Z) {
                if ((F = t.dests) && F instanceof Array && (I = F.length)) {
                  for (P = 0; P < I; P++) {
                    var pa = F[P];
                    var la = [V('dests'), V(pa.id || ''), V(pa.y || ''), V(pa.c || '')].join('|');
                    this.addMessage(la);
                    la = { url: pa.c, hideReferrer: void 0 === pa.hr || !!pa.hr, message: la };
                    this.addDestination(la);
                    void 0 !== pa.hr && (na = !0);
                  }
                  1 === Z &&
                    na &&
                    Aa.logOnce(
                      'Warning: visitorInstance.publishDestinations version is old (Visitor v3.3.0 to v4.0.0). URL destinations will not have the option of being fired on page, only in the iframe.',
                    );
                }
                this.jsonProcessed.push(t);
              }
            }
          },
          addMessage: function (t) {
            this.messages.push(t);
          },
          addDestination: function (t) {
            this.destinations.push(t);
          },
          sendMessages: function () {
            this.sendingMessages ||
              ((this.sendingMessages = !0), Ba && this.messages.length && this.publishDestinations());
          },
          publishDestinations: function () {
            var t = this,
              F = ha.adms.instance,
              I = [],
              P = [],
              V = function (Z) {
                Aa.log('visitor.publishDestinations() result: ' + (Z.error || Z.message));
                t.sendingMessages = !1;
                t.requestToProcess();
              };
            1 === this.publishDestinationsVersion
              ? (oa.extendArray(I, this.messages),
                oa.extendArray(this.messagesPosted, this.messages),
                (t.messages = []),
                (t.destinations = []),
                (F = (F.publishDestinations(h, I, V), 'Called visitor.publishDestinations() version 1')))
              : 1 < this.publishDestinationsVersion
                ? (oa.extendArray(P, this.destinations),
                  oa.extendArray(this.destinationsPosted, this.destinations),
                  (t.messages = []),
                  (t.destinations = []),
                  (F =
                    (F.publishDestinations({ subdomain: h, callback: V, urlDestinations: P }),
                    'Called visitor.publishDestinations() version > 1')))
                : (F = void 0);
            return F;
          },
          getPublishDestinationsVersion: function () {
            if (null !== this.publishDestinationsVersion) return this.publishDestinationsVersion;
            var t = -1;
            return (
              ha.adms.instance.publishDestinations(null, null, function (F) {
                F === Object(F) &&
                  ((F = F.error),
                  'subdomain is not a populated string.' === F
                    ? (t = 1)
                    : 'Invalid parameters passed.' === F && (t = 2));
              }),
              (this.publishDestinationsVersion = t)
            );
          },
        },
        sa = {
          traits: function (t) {
            return T.isValidPdata(t) && (ka.sids instanceof Array || (ka.sids = []), oa.extendArray(ka.sids, t)), this;
          },
          pixels: function (t) {
            return (
              T.isValidPdata(t) && (ka.pdata instanceof Array || (ka.pdata = []), oa.extendArray(ka.pdata, t)), this
            );
          },
          logs: function (t) {
            return (
              T.isValidLogdata(t) &&
                (ka.logdata !== Object(ka.logdata) && (ka.logdata = {}), oa.extendObject(ka.logdata, t)),
              this
            );
          },
          customQueryParams: function (t) {
            return T.isEmptyObject(t) || oa.extendObject(ka, t, ha.reservedKeys), this;
          },
          signals: function (t, F) {
            var I,
              P = t;
            if (!T.isEmptyObject(P)) {
              if (F && 'string' == typeof F) for (I in ((P = {}), t)) t.hasOwnProperty(I) && (P[F + I] = t[I]);
              oa.extendObject(ka, P, ha.reservedKeys);
            }
            return this;
          },
          declaredId: function (t) {
            return ha.declaredId.setDeclaredId(t, 'request'), this;
          },
          result: function (t) {
            return 'function' == typeof t && (ka.callback = t), this;
          },
          afterResult: function (t) {
            return 'function' == typeof t && (ka.postCallbackFn = t), this;
          },
          useImageRequest: function () {
            return (ka.useImageRequest = !0), this;
          },
          clearData: function () {
            return (ka = {}), this;
          },
          submit: function (t) {
            return (ka.isDefaultRequest = !!t), Pa.submitRequest(ka), (ka = {}), this;
          },
          getPartner: function () {
            return h;
          },
          getContainerNSID: function () {
            return m;
          },
          getEventLog: function () {
            return K;
          },
          getState: function () {
            var t = {},
              F = {};
            return (
              oa.extendObject(t, ha, { registerRequest: !0 }),
              oa.extendObject(F, Qa, { requestToProcess: !0, process: !0, sendMessages: !0 }),
              { initConfig: k, pendingRequest: ka, otherRequestInfo: t, destinationPublishingInfo: F, log: K }
            );
          },
          idSync: function () {
            throw Error('Please use the `idSyncByURL` method of the Experience Cloud ID Service (Visitor) instance');
          },
          aamIdSync: function () {
            throw Error(
              'Please use the `idSyncByDataSource` method of the Experience Cloud ID Service (Visitor) instance',
            );
          },
          passData: function (t) {
            return T.isEmptyObject(t) ? 'Error: json is empty or not an object' : (Pa.defaultCallback(t), t);
          },
          getPlatformParams: function () {
            return ha.platformParams;
          },
          getEventCallConfigParams: function () {
            var t,
              F = ha,
              I = F.modStatsParams,
              P = F.platformParams;
            if (!I) {
              for (t in ((I = {}), P))
                P.hasOwnProperty(t) && !F.nonModStatsParams[t] && (I[t.replace(/^d_/, '')] = P[t]);
              !0 === W ? (I.coop_safe = 1) : !1 === W && (I.coop_unsafe = 1);
              F.modStatsParams = I;
            }
            return I;
          },
          setAsCoopSafe: function () {
            return (W = !0), this;
          },
          setAsCoopUnsafe: function () {
            return (W = !1), this;
          },
          getEventCallIabSignals: function (t) {
            var F;
            return t !== Object(t)
              ? 'Error: config is not an object'
              : 'function' != typeof t.callback
                ? 'Error: config.callback is not a function'
                : ((F = parseInt(t.timeout, 10)), isNaN(F) && (F = null), void za.getQueryStringObject(t.callback, F));
          },
        },
        Pa = {
          corsMetadata:
            ((Ja = 'none'),
            'undefined' != typeof XMLHttpRequest &&
              XMLHttpRequest === Object(XMLHttpRequest) &&
              'withCredentials' in new XMLHttpRequest() &&
              (Ja = 'XMLHttpRequest'),
            { corsType: Ja }),
          getCORSInstance: function () {
            return 'none' === this.corsMetadata.corsType ? null : new window[this.corsMetadata.corsType]();
          },
          submitRequest: function (t) {
            return ha.registerRequest(Pa.createQueuedRequest(t)), !0;
          },
          createQueuedRequest: function (t) {
            var F,
              I,
              P,
              V,
              Z,
              na = t.callback,
              pa = 'img',
              la = t.isDefaultRequest;
            if ((delete t.isDefaultRequest, !T.isEmptyObject(r)))
              for (P in r)
                r.hasOwnProperty(P) &&
                  null != (V = r[P]) &&
                  '' !== V &&
                  (!(P in t) || V in t || V in ha.reservedKeys || null == (Z = t[P]) || '' === Z || (t[V] = Z));
            return (
              T.isValidPdata(t.sids) || (t.sids = []),
              T.isValidPdata(t.pdata) || (t.pdata = []),
              T.isValidLogdata(t.logdata) || (t.logdata = {}),
              (t.logdataArray = oa.convertObjectToKeyValuePairs(t.logdata, '=', !0)),
              t.logdataArray.push('_ts=' + new Date().getTime()),
              'function' != typeof na && (na = this.defaultCallback),
              (F = this.makeRequestSrcData(t)),
              (I = this.getCORSInstance()) && !0 !== t.useImageRequest && (pa = 'cors'),
              {
                tag: pa,
                src: F.src,
                corsSrc: F.corsSrc,
                callbackFn: na,
                postCallbackFn: t.postCallbackFn,
                useImageRequest: !!t.useImageRequest,
                requestData: t,
                corsInstance: I,
                corsPostData: F.corsPostData,
                isDefaultRequest: la,
              }
            );
          },
          defaultCallback: function (t, F) {
            var I, P, V, Z, na, pa, la, Ta, Ea;
            if (wa && (I = t.stuff) && I instanceof Array && (P = I.length))
              for (V = 0; V < P; V++)
                (Z = I[V]) &&
                  Z === Object(Z) &&
                  ((na = Z.cn),
                  (pa = Z.cv),
                  (void 0 !== (la = Z.ttl) && '' !== la) ||
                    (la = Math.floor(oa.getMaxCookieExpiresInMinutes() / 60 / 24)),
                  (Ta = Z.dmn || '.' + document.domain.replace(/^www\./, '')),
                  (Ea = Z.type),
                  na &&
                    (pa || 'number' == typeof pa) &&
                    ('var' !== Ea &&
                      (la = parseInt(la, 10)) &&
                      !isNaN(la) &&
                      oa.setCookie(na, pa, 1440 * la, '/', Ta, !1),
                    (ya.stuffed[na] = pa)));
            var Ra, ia;
            I = t.uuid;
            T.isPopulatedString(I) &&
              (T.isEmptyObject(u) ||
                (('string' == typeof (Ra = u.path) && Ra.length) || (Ra = '/'),
                (ia = parseInt(u.days, 10)),
                isNaN(ia) && (ia = 100),
                oa.setCookie(
                  u.name || 'aam_did',
                  I,
                  1440 * ia,
                  Ra,
                  u.domain || '.' + document.domain.replace(/^www\./, ''),
                  !0 === u.secure,
                )));
            ha.abortRequests || Qa.requestToProcess(t, F);
          },
          makeRequestSrcData: function (t) {
            t.sids = T.removeEmptyArrayValues(t.sids || []);
            t.pdata = T.removeEmptyArrayValues(t.pdata || []);
            var F = ha,
              I = F.platformParams,
              P = oa.encodeAndBuildRequest(t.sids, ','),
              V = oa.encodeAndBuildRequest(t.pdata, ','),
              Z = (t.logdataArray || []).join('&');
            delete t.logdataArray;
            var na,
              pa,
              la = encodeURIComponent,
              Ta = qa.IS_HTTPS ? 'https://' : 'http://',
              Ea = F.declaredId.getDeclaredIdQueryString(),
              Ra = F.adms.instance ? F.adms.getCustomerIDsQueryString(F.adms.getCustomerIDs()) : '',
              ia,
              Wa,
              db,
              ab = [];
            for (ia in t)
              if (!(ia in F.reservedKeys) && t.hasOwnProperty(ia))
                if (((Wa = t[ia]), (ia = la(ia)), Wa instanceof Array)) {
                  var bb = 0;
                  for (db = Wa.length; bb < db; bb++) ab.push(ia + '=' + la(Wa[bb]));
                } else ab.push(ia + '=' + la(Wa));
            t = ab.length ? '&' + ab.join('&') : '';
            ia = 'd_dil_ver=' + la(DIL.version);
            F =
              'd_nsid=' +
              I.d_nsid +
              F.getCoopQueryString() +
              Ea +
              Ra +
              (P.length ? '&d_sid=' + P : '') +
              (V.length ? '&d_px=' + V : '') +
              (Z.length ? '&d_ld=' + la(Z) : '');
            I = '&d_rtbd=' + I.d_rtbd + '&d_jsonv=' + I.d_jsonv + '&d_dst=' + I.d_dst;
            la = da ? '&h_referer=' + la(location.href) : '';
            return (
              (pa = (na = Ta + h + '.demdex.net/event') + '?' + ia + '&' + F + I + t + la),
              {
                corsSrc: na + '?' + ia + '&_ts=' + new Date().getTime(),
                src: pa,
                corsPostData: F + I + t + la,
                isDeclaredIdCall: '' !== Ea,
              }
            );
          },
          fireRequest: function (t) {
            if ('img' === t.tag) this.fireImage(t);
            else {
              var F = ha.declaredId;
              F = F.declaredId.request || F.declaredId.init || {};
              this.fireCORS(t, { dpid: F.dpid || '', dpuuid: F.dpuuid || '' });
            }
          },
          fireImage: function (t) {
            var F,
              I,
              P = ha;
            P.abortRequests ||
              ((P.firing = !0),
              (F = new Image(0, 0)),
              P.sent.push(t),
              (F.onload = function () {
                P.firing = !1;
                P.fired.push(t);
                P.num_of_img_responses++;
                P.registerRequest();
              }),
              (I = function (V) {
                B = 'imgAbortOrErrorHandler received the event of type ' + V.type;
                Aa.log(B);
                P.abortRequests = !0;
                P.firing = !1;
                P.errored.push(t);
                P.num_of_img_errors++;
                P.registerRequest();
              }),
              F.addEventListener('error', I),
              F.addEventListener('abort', I),
              (F.src = t.src));
          },
          fireCORS: function (t, F) {
            var I = this,
              P = ha,
              V = this.corsMetadata.corsType,
              Z = t.corsSrc,
              na = t.corsInstance,
              pa = t.corsPostData,
              la = t.postCallbackFn,
              Ta = 'function' == typeof la;
            if (!P.abortRequests && !Oa) {
              P.firing = !0;
              try {
                na.open('post', Z, !0),
                  'XMLHttpRequest' === V &&
                    ((na.withCredentials = !0),
                    na.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'),
                    (na.onreadystatechange = function () {
                      if (4 === this.readyState && 200 === this.status)
                        a: {
                          var Ea;
                          try {
                            if ((Ea = JSON.parse(this.responseText)) !== Object(Ea)) {
                              I.handleCORSError(t, F, 'Response is not JSON');
                              break a;
                            }
                          } catch (ia) {
                            I.handleCORSError(t, F, 'Error parsing response as JSON');
                            break a;
                          }
                          try {
                            var Ra = t.callbackFn;
                            P.firing = !1;
                            P.fired.push(t);
                            P.num_of_cors_responses++;
                            Ra(Ea, F);
                            Ta && la(Ea, F);
                          } catch (ia) {
                            ia.message = 'DIL handleCORSResponse caught error with message ' + ia.message;
                            B = ia.message;
                            Aa.log(B);
                            ia.filename = ia.filename || 'dil.js';
                            ia.partner = h;
                            DIL.errorModule.handleError(ia);
                            try {
                              Ra({ error: ia.name + '|' + ia.message }, F),
                                Ta && la({ error: ia.name + '|' + ia.message }, F);
                            } catch (Wa) {}
                          } finally {
                            P.registerRequest();
                          }
                        }
                    })),
                  (na.onerror = function () {
                    I.handleCORSError(t, F, 'onerror');
                  }),
                  (na.ontimeout = function () {
                    I.handleCORSError(t, F, 'ontimeout');
                  }),
                  na.send(pa);
              } catch (Ea) {
                this.handleCORSError(t, F, 'try-catch');
              }
              P.sent.push(t);
              P.declaredId.declaredId.request = null;
            }
          },
          handleCORSError: function (t, F, I) {
            ha.num_of_cors_errors++;
            ha.corsErrorSources.push(I);
          },
        },
        T = {
          isValidPdata: function (t) {
            return !!(t instanceof Array && this.removeEmptyArrayValues(t).length);
          },
          isValidLogdata: function (t) {
            return !this.isEmptyObject(t);
          },
          isEmptyObject: function (t) {
            if (t !== Object(t)) return !0;
            for (var F in t) if (t.hasOwnProperty(F)) return !1;
            return !0;
          },
          removeEmptyArrayValues: function (t) {
            var F,
              I,
              P = t.length,
              V = [];
            for (I = 0; I < P; I++) null != (F = t[I]) && '' !== F && V.push(F);
            return V;
          },
          isPopulatedString: function (t) {
            return 'string' == typeof t && t.length;
          },
        },
        oa = {
          convertObjectToKeyValuePairs: function (t, F, I) {
            var P,
              V,
              Z = [];
            for (P in ((F ||= '='), t))
              t.hasOwnProperty(P) && null != (V = t[P]) && '' !== V && Z.push(P + F + (I ? encodeURIComponent(V) : V));
            return Z;
          },
          encodeAndBuildRequest: function (t, F) {
            return t
              .map(function (I) {
                return encodeURIComponent(I);
              })
              .join(F);
          },
          getCookie: function (t) {
            var F,
              I,
              P = t + '=',
              V = document.cookie.split(';');
            t = 0;
            for (F = V.length; t < F; t++) {
              for (I = V[t]; ' ' === I.charAt(0); ) I = I.substring(1, I.length);
              if (0 === I.indexOf(P)) return decodeURIComponent(I.substring(P.length, I.length));
            }
            return null;
          },
          setCookie: function (t, F, I, P, V, Z) {
            var na = new Date();
            I && (I *= 6e4);
            document.cookie =
              t +
              '=' +
              encodeURIComponent(F) +
              (I ? ';expires=' + new Date(na.getTime() + I).toUTCString() : '') +
              (P ? ';path=' + P : '') +
              (V ? ';domain=' + V : '') +
              (Z ? ';secure' : '');
          },
          extendArray: function (t, F) {
            return t instanceof Array && F instanceof Array && (Array.prototype.push.apply(t, F), !0);
          },
          extendObject: function (t, F, I) {
            var P;
            if (t !== Object(t) || F !== Object(F)) return !1;
            for (P in F) !F.hasOwnProperty(P) || (!T.isEmptyObject(I) && P in I) || (t[P] = F[P]);
            return !0;
          },
          getMaxCookieExpiresInMinutes: function () {
            return qa.SIX_MONTHS_IN_MINUTES;
          },
          replaceMethodsWithFunction: function (t, F) {
            var I;
            if (t === Object(t) && 'function' == typeof F)
              for (I in t) t.hasOwnProperty(I) && 'function' == typeof t[I] && (t[I] = F);
          },
        },
        Ka =
          ((Xa = c.requestController),
          {
            exists: null,
            instance: null,
            aamIsApproved: null,
            init: function () {
              var t = this;
              this.checkIfExists()
                ? ((this.exists = !0),
                  (this.instance = window.adobe.optIn),
                  this.instance.fetchPermissions(function () {
                    t.callback();
                  }, !0))
                : (this.exists = !1);
            },
            checkIfExists: function () {
              return window.adobe === Object(window.adobe) && window.adobe.optIn === Object(window.adobe.optIn);
            },
            callback: function () {
              this.aamIsApproved = this.instance.isApproved([this.instance.Categories.AAM]);
              Xa.adms.waitForMidToReleaseRequests();
              Xa.adms.getIsOptedOut();
            },
            isApproved: function () {
              return !this.isIabContext() && !Xa.adms.isOptedOut && (!this.exists || this.aamIsApproved);
            },
            isIabContext: function () {
              return this.instance && this.instance.isIabContext;
            },
          });
      c.optIn = Ka;
      var Ya,
        Fa,
        Ma,
        za =
          ((Ya = c.requestController),
          (Fa = c.optIn),
          (Ma = {
            isVendorConsented: null,
            doesGdprApply: null,
            consentString: null,
            queryStringObjectCallbacks: [],
            init: function () {
              this.fetchConsentData();
            },
            hasGoSignal: function () {
              return !(
                !(
                  Fa.isIabContext() &&
                  this.isVendorConsented &&
                  this.doesGdprApply &&
                  'string' == typeof this.consentString &&
                  this.consentString.length
                ) || Ya.adms.isOptedOut
              );
            },
            fetchConsentData: function (t, F) {
              var I = this,
                P = {};
              'function' != typeof t && (t = function () {});
              Fa.instance && Fa.isIabContext()
                ? (F && (P.timeout = F),
                  Fa.instance.execute({
                    command: 'iabPlugin.fetchConsentData',
                    params: P,
                    callback: function (V, Z) {
                      Z === Object(Z)
                        ? ((I.doesGdprApply = !!Z.gdprApplies), (I.consentString = Z.consentString || ''))
                        : ((I.doesGdprApply = !1), (I.consentString = ''));
                      I.isVendorConsented = Fa.instance.isApproved(Fa.instance.Categories.AAM);
                      V ? t({}) : I.checkQueryStringObject(t);
                      Ya.adms.waitForMidToReleaseRequests();
                    },
                  }))
                : t({});
            },
            getQueryString: function () {
              return Fa.isIabContext()
                ? 'gdpr=' + (this.doesGdprApply ? 1 : 0) + '&gdpr_consent=' + this.consentString + '&'
                : '';
            },
            getQueryStringObject: function (t, F) {
              this.fetchConsentData(t, F);
            },
            checkQueryStringObject: function (t) {
              Ma.hasGoSignal() &&
                'function' == typeof t &&
                t({ gdpr: this.doesGdprApply ? 1 : 0, gdpr_consent: this.consentString });
            },
          }));
      c.iab = za;
      'error' === h &&
        0 === m &&
        window.addEventListener('load', function () {
          DIL.windowLoaded = !0;
        });
      var Ca = !1,
        Za = function () {
          Ca || ((Ca = !0), ha.registerRequest(), Ha());
        },
        Ha = function () {
          setTimeout(function () {
            Ia || ha.firstRequestHasFired || ('function' == typeof Ga ? sa.afterResult(Ga).submit(!0) : sa.submit(!0));
          }, DIL.constants.TIME_TO_DEFAULT_REQUEST);
        };
      n = document;
      'error' !== h &&
        (DIL.windowLoaded
          ? Za()
          : 'complete' !== n.readyState && 'loaded' !== n.readyState
            ? window.addEventListener('load', function () {
                DIL.windowLoaded = !0;
                Za();
              })
            : ((DIL.windowLoaded = !0), Za()));
      ha.declaredId.setDeclaredId(G, 'init');
      Ka.init();
      za.init();
      ha.processVisitorAPI();
      qa.IS_IE_LESS_THAN_10 &&
        oa.replaceMethodsWithFunction(sa, function () {
          return this;
        });
      this.api = sa;
      this.getStuffedVariable = function (t) {
        var F = ya.stuffed[t];
        return F || 'number' == typeof F || (F = oa.getCookie(t)) || 'number' == typeof F || (F = ''), F;
      };
      this.validators = T;
      this.helpers = oa;
      this.constants = qa;
      this.log = K;
      this.pendingRequest = ka;
      this.requestController = ha;
      this.destinationPublishing = Qa;
      this.requestProcs = Pa;
      this.units = c;
      this.initConfig = k;
      this.logger = Aa;
      H && ((this.variables = ya), (this.callWindowLoadFunctions = Za));
    }),
    (DIL.extendStaticPropertiesAndMethods = function (k) {
      var n;
      if (k === Object(k)) for (n in k) k.hasOwnProperty(n) && (this[n] = k[n]);
    }),
    DIL.extendStaticPropertiesAndMethods({
      version: '9.3',
      jsonVersion: 1,
      constants: { TIME_TO_DEFAULT_REQUEST: 500 },
      variables: { scriptNodeList: document.getElementsByTagName('script') },
      windowLoaded: !1,
      dils: {},
      isAddedPostWindowLoad: function (k) {
        this.windowLoaded = 'function' == typeof k ? !!k() : 'boolean' != typeof k || k;
      },
      create: function (k) {
        try {
          return new DIL(k);
        } catch (n) {
          throw Error('Error in attempt to create DIL instance with DIL.create(): ' + n.message);
        }
      },
      registerDil: function (k, n, D) {
        n = n + '$' + D;
        n in this.dils || (this.dils[n] = k);
      },
      getDil: function (k, n) {
        var D;
        return (
          'string' != typeof k && (k = ''),
          (n ||= 0),
          (D = k + '$' + n) in this.dils
            ? this.dils[D]
            : Error('The DIL instance with partner = ' + k + ' and containerNSID = ' + n + ' was not found')
        );
      },
      dexGetQSVars: function (k, n, D) {
        n = this.getDil(n, D);
        return n instanceof this ? n.getStuffedVariable(k) : '';
      },
    }),
    (DIL.errorModule =
      ((b = DIL.create({ partner: 'error', containerNSID: 0, ignoreHardDependencyOnVisitorAPI: !0 })),
      (g = !(a = {
        harvestererror: 14138,
        destpuberror: 14139,
        dpmerror: 14140,
        generalerror: 14137,
        error: 14137,
        noerrortypedefined: 15021,
        evalerror: 15016,
        rangeerror: 15017,
        referenceerror: 15018,
        typeerror: 15019,
        urierror: 15020,
      })),
      {
        activate: function () {
          g = !0;
        },
        handleError: function (k) {
          if (!g) return 'DIL error module has not been activated';
          k !== Object(k) && (k = {});
          var n = k.name ? (k.name + '').toLowerCase() : '',
            D = [];
          k = {
            name: n,
            filename: k.filename ? k.filename + '' : '',
            partner: k.partner ? k.partner + '' : 'no_partner',
            site: k.site ? k.site + '' : document.location.href,
            message: k.message ? k.message + '' : '',
          };
          return (
            D.push(n in a ? a[n] : a.noerrortypedefined),
            b.api.pixels(D).logs(k).useImageRequest().submit(),
            'DIL error report sent'
          );
        },
        pixelMap: a,
      })),
    (DIL.tools = {}),
    (DIL.modules = { helpers: {} }));
})();
function AppMeasurement_Module_ActivityMap(b) {
  function a() {
    var A = c.pageYOffset + (c.innerHeight || 0);
    A && A > +h && (h = A);
  }
  function g() {
    if (K.scrollReachSelector) {
      var A = b.d.querySelector && b.d.querySelector(K.scrollReachSelector);
      A
        ? ((h = A.scrollTop || 0),
          A.addEventListener('scroll', function () {
            var G;
            (G = (A && A.scrollTop + A.clientHeight) || 0) > h && (h = G);
          }))
        : 0 < r-- && setTimeout(g, 1e3);
    }
  }
  function k(A, G) {
    var N, S;
    if (A && G && (N = K.c[G] || (K.c[G] = G.split(','))))
      for (G = 0; G < N.length && (S = N[G++]); ) if (-1 < A.indexOf(S)) return null;
    u = 1;
    return A;
  }
  function n(A, G, N, S, W) {
    var da;
    if (A.dataset && (da = A.dataset[G])) var aa = da;
    else if (A.getAttribute)
      if ((da = A.getAttribute('data-' + N))) aa = da;
      else if ((da = A.getAttribute(N))) aa = da;
    if (!aa && b.useForcedLinkTracking && W) {
      A = A.onclick ? '' + A.onclick : '';
      varValue = '';
      if (S && A && ((G = A.indexOf(S)), 0 <= G)) {
        for (G += S.length; G < A.length; )
          if (((N = A.charAt(G++)), 0 <= '\'"'.indexOf(N))) {
            var Ba = N;
            break;
          }
        for (da = !1; G < A.length && Ba; ) {
          N = A.charAt(G);
          if (!da && N === Ba) break;
          '\\' === N ? (da = !0) : ((varValue += N), (da = !1));
          G++;
        }
      }
      (Ba = varValue) && (b.w[S] = Ba);
    }
    return aa || (W && b.w[S]);
  }
  function D(A, G, N) {
    var S;
    return (S = K[G](A, N)) && (u ? ((u = 0), S) : k(E(S), K[G + 'Exclusions']));
  }
  function B(A, G, N) {
    var S;
    if (
      A &&
      !(1 === (S = A.nodeType) && (S = A.nodeName) && (S = S.toUpperCase()) && H[S]) &&
      (1 === A.nodeType && (S = A.nodeValue) && (G[G.length] = S),
      N.a ||
        N.t ||
        N.s ||
        !A.getAttribute ||
        ((S = A.getAttribute('alt'))
          ? (N.a = S)
          : (S = A.getAttribute('title'))
            ? (N.t = S)
            : 'IMG' == ('' + A.nodeName).toUpperCase() && (S = A.getAttribute('src') || A.src) && (N.s = S)),
      (S = A.childNodes) && S.length)
    )
      for (A = 0; A < S.length; A++) B(S[A], G, N);
  }
  function E(A) {
    if (null == A || void 0 == A) return A;
    try {
      return A.replace(
        RegExp('^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+', 'mg'),
        '',
      )
        .replace(
          RegExp('[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$', 'mg'),
          '',
        )
        .replace(
          RegExp('[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}', 'mg'),
          ' ',
        )
        .substring(0, 254);
    } catch (G) {}
  }
  var K = this;
  K.s = b;
  var c = window;
  c.s_c_in || ((c.s_c_il = []), (c.s_c_in = 0));
  K._il = c.s_c_il;
  K._in = c.s_c_in;
  K._il[K._in] = K;
  c.s_c_in++;
  K._c = 's_m';
  var h = 0,
    m,
    r = 60;
  K.c = {};
  var u = 0,
    H = { SCRIPT: 1, STYLE: 1, LINK: 1, CANVAS: 1 };
  K._g = function () {
    var A,
      G,
      N,
      S = b.contextData,
      W = b.linkObject;
    (A = b.pageName || b.pageURL) &&
      (G = D(W, 'link', b.linkName)) &&
      (N = D(W, 'region')) &&
      ((S['a.activitymap.page'] = A.substring(0, 255)),
      (S['a.activitymap.link'] = 128 < G.length ? G.substring(0, 128) : G),
      (S['a.activitymap.region'] = 127 < N.length ? N.substring(0, 127) : N),
      0 < h && (S['a.activitymap.xy'] = 10 * Math.floor(h / 10)),
      (S['a.activitymap.pageIDType'] = b.pageName ? 1 : 0));
  };
  K.e = function () {
    K.trackScrollReach &&
      !m &&
      (K.scrollReachSelector ? g() : (a(), c.addEventListener && c.addEventListener('scroll', a, !1)), (m = !0));
  };
  K.link = function (A, G) {
    if (G) G = k(E(G), K.linkExclusions);
    else if ((G = A) && !(G = n(A, 'sObjectId', 's-object-id', 's_objectID', 1))) {
      var N, S;
      (S = k(E(A.innerText || A.textContent), K.linkExclusions)) ||
        (B(A, (N = []), (G = { a: void 0, t: void 0, s: void 0 })),
        (S = k(E(N.join('')))) ||
          (S = k(E(G.a ? G.a : G.t ? G.t : G.s ? G.s : void 0))) ||
          !(N = (N = A.tagName) && N.toUpperCase ? N.toUpperCase() : '') ||
          ('INPUT' == N || ('SUBMIT' == N && A.value)
            ? (S = k(E(A.value)))
            : 'IMAGE' == N && A.src && (S = k(E(A.src)))));
      G = S;
    }
    return G;
  };
  K.region = function (A) {
    for (var G, N = K.regionIDAttribute || 'id'; (A &&= A.parentNode); ) {
      if ((G = n(A, N, N, N))) return G;
      if ('BODY' == A.nodeName) return 'BODY';
    }
  };
}
function AppMeasurement(b) {
  var a = this;
  a.version = '2.16.0';
  var g = window;
  g.s_c_in || ((g.s_c_il = []), (g.s_c_in = 0));
  a._il = g.s_c_il;
  a._in = g.s_c_in;
  a._il[a._in] = a;
  g.s_c_in++;
  a._c = 's_c';
  var k = g.AppMeasurement.fc;
  k ||= null;
  var n = g,
    D;
  try {
    var B = n.parent;
    for (
      D = n.location;
      B &&
      B.location &&
      D &&
      '' + B.location != '' + D &&
      n.location &&
      '' + B.location != '' + n.location &&
      B.location.host == D.host;

    )
      (n = B), (B = n.parent);
  } catch (c) {}
  a.C = function (c) {
    try {
      console.log(c);
    } catch (h) {}
  };
  a.Ra = function (c) {
    return '' + parseInt(c) == '' + c;
  };
  a.replace = function (c, h, m) {
    return !c || 0 > c.indexOf(h) ? c : c.split(h).join(m);
  };
  a.escape = function (c) {
    var h;
    if (!c) return c;
    c = encodeURIComponent(c);
    for (h = 0; 7 > h; h++) {
      var m = "+~!*()'".substring(h, h + 1);
      0 <= c.indexOf(m) && (c = a.replace(c, m, '%' + m.charCodeAt(0).toString(16).toUpperCase()));
    }
    return c;
  };
  a.unescape = function (c) {
    if (!c) return c;
    c = 0 <= c.indexOf('+') ? a.replace(c, '+', ' ') : c;
    try {
      return decodeURIComponent(c);
    } catch (h) {}
    return unescape(c);
  };
  a.Lb = function () {
    var c = g.location.hostname,
      h = a.fpCookieDomainPeriods,
      m;
    h ||= a.cookieDomainPeriods;
    if (
      c &&
      !a.Ka &&
      !/^[0-9.]+$/.test(c) &&
      ((h = h ? parseInt(h) : 2), (h = 2 < h ? h : 2), (m = c.lastIndexOf('.')), 0 <= m)
    ) {
      for (; 0 <= m && 1 < h; ) (m = c.lastIndexOf('.', m - 1)), h--;
      a.Ka = 0 < m ? c.substring(m) : c;
    }
    return a.Ka;
  };
  a.c_r = a.cookieRead = function (c) {
    c = a.escape(c);
    var h = ' ' + a.d.cookie,
      m = h.indexOf(' ' + c + '='),
      r = 0 > m ? m : h.indexOf(';', m);
    c = 0 > m ? '' : a.unescape(h.substring(m + 2 + c.length, 0 > r ? h.length : r));
    return '[[B]]' != c ? c : '';
  };
  a.c_w = a.cookieWrite = function (c, h, m) {
    var r = a.Lb(),
      u = a.cookieLifetime,
      H;
    h = '' + h;
    u = u ? ('' + u).toUpperCase() : '';
    m &&
      'SESSION' != u &&
      'NONE' != u &&
      ((H = '' != h ? parseInt(u ? u : 0) : -60)
        ? ((m = new Date()), m.setTime(m.getTime() + 1e3 * H))
        : 1 === m && ((m = new Date()), (H = m.getYear()), m.setYear(H + 2 + (1900 > H ? 1900 : 0))));
    return c && 'NONE' != u
      ? ((a.d.cookie =
          a.escape(c) +
          '=' +
          a.escape('' != h ? h : '[[B]]') +
          '; path=/;' +
          (m && 'SESSION' != u ? ' expires=' + m.toUTCString() + ';' : '') +
          (r ? ' domain=' + r + ';' : '')),
        a.cookieRead(c) == h)
      : 0;
  };
  a.Ib = function () {
    var c = a.Util.getIeVersion();
    'number' === typeof c && 10 > c && ((a.unsupportedBrowser = !0), a.vb(a, function () {}));
  };
  a.vb = function (c, h) {
    for (var m in c) c.hasOwnProperty(m) && 'function' === typeof c[m] && (c[m] = h);
  };
  a.K = [];
  a.da = function (c, h, m) {
    if (a.La) return 0;
    a.maxDelay || (a.maxDelay = 250);
    var r = 0,
      u = new Date().getTime() + a.maxDelay,
      H = a.d.visibilityState,
      A = ['webkitvisibilitychange', 'visibilitychange'];
    H ||= a.d.webkitVisibilityState;
    if (H && 'prerender' == H) {
      if (!a.ea)
        for (a.ea = 1, m = 0; m < A.length; m++)
          a.d.addEventListener(A[m], function () {
            var G = a.d.visibilityState;
            G ||= a.d.webkitVisibilityState;
            'visible' == G && ((a.ea = 0), a.delayReady());
          });
      r = 1;
      u = 0;
    } else m || (a.u('_d') && (r = 1));
    r && (a.K.push({ m: c, a: h, t: u }), a.ea || setTimeout(a.delayReady, a.maxDelay));
    return r;
  };
  a.delayReady = function () {
    var c = new Date().getTime(),
      h = 0;
    for (a.u('_d') ? (h = 1) : a.ya(); 0 < a.K.length; ) {
      var m = a.K.shift();
      if (h && !m.t && m.t > c) {
        a.K.unshift(m);
        setTimeout(a.delayReady, parseInt(a.maxDelay / 2));
        break;
      }
      a.La = 1;
      a[m.m].apply(a, m.a);
      a.La = 0;
    }
  };
  a.setAccount = a.sa = function (c) {
    var h;
    if (!a.da('setAccount', arguments))
      if (((a.account = c), a.allAccounts)) {
        var m = a.allAccounts.concat(c.split(','));
        a.allAccounts = [];
        m.sort();
        for (h = 0; h < m.length; h++) (0 != h && m[h - 1] == m[h]) || a.allAccounts.push(m[h]);
      } else a.allAccounts = c.split(',');
  };
  a.foreachVar = function (c, h) {
    var m,
      r,
      u = '';
    var H = (m = '');
    if (a.lightProfileID) {
      var A = a.O;
      (u = a.lightTrackVars) && (u = ',' + u + ',' + a.ja.join(',') + ',');
    } else {
      A = a.g;
      if (a.pe || a.linkType)
        (u = a.linkTrackVars),
          (m = a.linkTrackEvents),
          a.pe &&
            ((H = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1)), a[H] && ((u = a[H].bc), (m = a[H].ac)));
      u &&= ',' + u + ',' + a.F.join(',') + ',';
      m && u && (u += ',events,');
    }
    h &&= ',' + h + ',';
    for (m = 0; m < A.length; m++)
      (H = A[m]),
        (r = a[H]) && (!u || 0 <= u.indexOf(',' + H + ',')) && (!h || 0 <= h.indexOf(',' + H + ',')) && c(H, r);
  };
  a.o = function (c, h, m, r, u) {
    var H = '',
      A,
      G,
      N,
      S = 0;
    'contextData' == c && (c = 'c');
    if (h) {
      for (A in h)
        if (
          !(Object.prototype[A] || (u && A.substring(0, u.length) != u)) &&
          h[A] &&
          (!m || 0 <= m.indexOf(',' + (r ? r + '.' : '') + A + ','))
        ) {
          var W = !1;
          if (S)
            for (G = 0; G < S.length; G++)
              if (A.substring(0, S[G].length) == S[G]) {
                W = !0;
                break;
              }
          if (!W && ('' == H && (H += '&' + c + '.'), (G = h[A]), u && (A = A.substring(u.length)), 0 < A.length))
            if (((W = A.indexOf('.')), 0 < W))
              (G = A.substring(0, W)), (W = (u ? u : '') + G + '.'), (S ||= []), S.push(W), (H += a.o(G, h, m, r, W));
            else if (('boolean' == typeof G && (G = G ? 'true' : 'false'), G)) {
              if ('retrieveLightData' == r && 0 > u.indexOf('.contextData.'))
                switch (((W = A.substring(0, 4)), (N = A.substring(4)), A)) {
                  case 'transactionID':
                    A = 'xact';
                    break;
                  case 'channel':
                    A = 'ch';
                    break;
                  case 'campaign':
                    A = 'v0';
                    break;
                  default:
                    a.Ra(N) &&
                      ('prop' == W
                        ? (A = 'c' + N)
                        : 'eVar' == W
                          ? (A = 'v' + N)
                          : 'list' == W
                            ? (A = 'l' + N)
                            : 'hier' == W && ((A = 'h' + N), (G = G.substring(0, 255))));
                }
              H += '&' + a.escape(A) + '=' + a.escape(G);
            }
        }
      '' != H && (H += '&.' + c);
    }
    return H;
  };
  a.usePostbacks = 0;
  a.Ob = function () {
    var c = '',
      h,
      m,
      r,
      u,
      H = '',
      A = '',
      G = (r = ''),
      N = a.T();
    if (a.lightProfileID) {
      var S = a.O;
      (H = a.lightTrackVars) && (H = ',' + H + ',' + a.ja.join(',') + ',');
    } else {
      S = a.g;
      if (a.pe || a.linkType)
        (H = a.linkTrackVars),
          (A = a.linkTrackEvents),
          a.pe &&
            ((r = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1)), a[r] && ((H = a[r].bc), (A = a[r].ac)));
      H &&= ',' + H + ',' + a.F.join(',') + ',';
      A && ((A = ',' + A + ','), H && (H += ',events,'));
      a.events2 && (G += ('' != G ? ',' : '') + a.events2);
    }
    if (N && a.wa() && N.getCustomerIDs) {
      r = k;
      if ((u = N.getCustomerIDs()))
        for (h in u)
          Object.prototype[h] ||
            ((m = u[h]),
            'object' == typeof m &&
              ((r ||= {}), m.id && (r[h + '.id'] = m.id), m.authState && (r[h + '.as'] = m.authState)));
      r && (c += a.o('cid', r));
    }
    a.AudienceManagement &&
      a.AudienceManagement.isReady() &&
      (c += a.o('d', a.AudienceManagement.getEventCallConfigParams()));
    for (h = 0; h < S.length; h++) {
      r = S[h];
      u = a[r];
      m = r.substring(0, 4);
      var W = r.substring(4);
      u ||
        ('events' == r && G
          ? ((u = G), (G = ''))
          : 'marketingCloudOrgID' == r && N && a.V('ECID') && (u = N.marketingCloudOrgID));
      if (u && (!H || 0 <= H.indexOf(',' + r + ','))) {
        switch (r) {
          case 'customerPerspective':
            r = 'cp';
            break;
          case 'marketingCloudOrgID':
            r = 'mcorgid';
            break;
          case 'supplementalDataID':
            r = 'sdid';
            break;
          case 'timestamp':
            r = 'ts';
            break;
          case 'dynamicVariablePrefix':
            r = 'D';
            break;
          case 'visitorID':
            r = 'vid';
            break;
          case 'marketingCloudVisitorID':
            r = 'mid';
            break;
          case 'analyticsVisitorID':
            r = 'aid';
            break;
          case 'audienceManagerLocationHint':
            r = 'aamlh';
            break;
          case 'audienceManagerBlob':
            r = 'aamb';
            break;
          case 'authState':
            r = 'as';
            break;
          case 'pageURL':
            r = 'g';
            255 < u.length && ((a.pageURLRest = u.substring(255)), (u = u.substring(0, 255)));
            break;
          case 'pageURLRest':
            r = '-g';
            break;
          case 'referrer':
            r = 'r';
            break;
          case 'vmk':
          case 'visitorMigrationKey':
            r = 'vmt';
            break;
          case 'visitorMigrationServer':
            r = 'vmf';
            a.ssl && a.visitorMigrationServerSecure && (u = '');
            break;
          case 'visitorMigrationServerSecure':
            r = 'vmf';
            !a.ssl && a.visitorMigrationServer && (u = '');
            break;
          case 'charSet':
            r = 'ce';
            break;
          case 'visitorNamespace':
            r = 'ns';
            break;
          case 'cookieDomainPeriods':
            r = 'cdp';
            break;
          case 'cookieLifetime':
            r = 'cl';
            break;
          case 'variableProvider':
            r = 'vvp';
            break;
          case 'currencyCode':
            r = 'cc';
            break;
          case 'channel':
            r = 'ch';
            break;
          case 'transactionID':
            r = 'xact';
            break;
          case 'campaign':
            r = 'v0';
            break;
          case 'latitude':
            r = 'lat';
            break;
          case 'longitude':
            r = 'lon';
            break;
          case 'resolution':
            r = 's';
            break;
          case 'colorDepth':
            r = 'c';
            break;
          case 'javascriptVersion':
            r = 'j';
            break;
          case 'javaEnabled':
            r = 'v';
            break;
          case 'cookiesEnabled':
            r = 'k';
            break;
          case 'browserWidth':
            r = 'bw';
            break;
          case 'browserHeight':
            r = 'bh';
            break;
          case 'connectionType':
            r = 'ct';
            break;
          case 'homepage':
            r = 'hp';
            break;
          case 'events':
            G && (u += ('' != u ? ',' : '') + G);
            if (A)
              for (W = u.split(','), u = '', m = 0; m < W.length; m++) {
                var da = W[m];
                var aa = da.indexOf('=');
                0 <= aa && (da = da.substring(0, aa));
                aa = da.indexOf(':');
                0 <= aa && (da = da.substring(0, aa));
                0 <= A.indexOf(',' + da + ',') && (u += (u ? ',' : '') + W[m]);
              }
            break;
          case 'events2':
            u = '';
            break;
          case 'contextData':
            c += a.o('c', a[r], H, r);
            u = '';
            break;
          case 'lightProfileID':
            r = 'mtp';
            break;
          case 'lightStoreForSeconds':
            r = 'mtss';
            a.lightProfileID || (u = '');
            break;
          case 'lightIncrementBy':
            r = 'mti';
            a.lightProfileID || (u = '');
            break;
          case 'retrieveLightProfiles':
            r = 'mtsr';
            break;
          case 'deleteLightProfiles':
            r = 'mtsd';
            break;
          case 'retrieveLightData':
            a.retrieveLightProfiles && (c += a.o('mts', a[r], H, r));
            u = '';
            break;
          default:
            a.Ra(W) &&
              ('prop' == m
                ? (r = 'c' + W)
                : 'eVar' == m
                  ? (r = 'v' + W)
                  : 'list' == m
                    ? (r = 'l' + W)
                    : 'hier' == m && ((r = 'h' + W), (u = u.substring(0, 255))));
        }
        u && (c += '&' + r + '=' + ('pev' != r.substring(0, 3) ? a.escape(u) : u));
      }
      'pev3' == r && a.e && (c += a.e);
    }
    a.ia && ((c += '&lrt=' + a.ia), (a.ia = null));
    return c;
  };
  a.B = function (c) {
    var h = c.tagName;
    if ('undefined' != '' + c.ic || ('undefined' != '' + c.Xb && 'HTML' != ('' + c.Xb).toUpperCase())) return '';
    h = h && h.toUpperCase ? h.toUpperCase() : '';
    'SHAPE' == h && (h = '');
    h &&
      (('INPUT' == h || 'BUTTON' == h) && c.type && c.type.toUpperCase
        ? (h = c.type.toUpperCase())
        : !h && c.href && (h = 'A'));
    return h;
  };
  a.Na = function (c) {
    var h = g.location,
      m = c.href ? c.href : '';
    var r = m.indexOf(':');
    var u = m.indexOf('?');
    var H = m.indexOf('/');
    m &&
      (0 > r || (0 <= u && r > u) || (0 <= H && r > H)) &&
      ((u = c.protocol && 1 < c.protocol.length ? c.protocol : h.protocol ? h.protocol : ''),
      (r = h.pathname.lastIndexOf('/')),
      (m =
        (u ? u + '//' : '') +
        (c.host ? c.host : h.host ? h.host : '') +
        ('/' != m.substring(0, 1) ? h.pathname.substring(0, 0 > r ? 0 : r) + '/' : '') +
        m));
    return m;
  };
  a.L = function (c) {
    var h = a.B(c),
      m,
      r,
      u = '',
      H = 0;
    return h &&
      ((m = c.protocol),
      (r = c.onclick),
      !c.href || ('A' != h && 'AREA' != h) || (r && m && !(0 > m.toLowerCase().indexOf('javascript')))
        ? r
          ? ((u = a.replace(a.replace(a.replace(a.replace('' + r, '\r', ''), '\n', ''), '\t', ''), ' ', '')), (H = 2))
          : 'INPUT' == h || 'SUBMIT' == h
            ? (c.value ? (u = c.value) : c.innerText ? (u = c.innerText) : c.textContent && (u = c.textContent),
              (H = 3))
            : 'IMAGE' == h && c.src && (u = c.src)
        : (u = a.Na(c)),
      u)
      ? { id: u.substring(0, 100), type: H }
      : 0;
  };
  a.gc = function (c) {
    for (var h = a.B(c), m = a.L(c); c && !m && 'BODY' != h; )
      if ((c = c.parentElement ? c.parentElement : c.parentNode)) (h = a.B(c)), (m = a.L(c));
    (m && 'BODY' != h) || (c = 0);
    c && ((h = c.onclick ? '' + c.onclick : ''), 0 <= h.indexOf('.tl(') || 0 <= h.indexOf('.trackLink(')) && (c = 0);
    return c;
  };
  a.Wb = function () {
    var c,
      h = a.linkObject,
      m = a.linkType,
      r = a.linkURL,
      u;
    a.ka = 1;
    h || ((a.ka = 0), (h = a.clickObject));
    if (h) {
      var H = a.B(h);
      for (c = a.L(h); h && !c && 'BODY' != H; )
        if ((h = h.parentElement ? h.parentElement : h.parentNode)) (H = a.B(h)), (c = a.L(h));
      (c && 'BODY' != H) || (h = 0);
      if (h && !a.linkObject) {
        var A = h.onclick ? '' + h.onclick : '';
        if (0 <= A.indexOf('.tl(') || 0 <= A.indexOf('.trackLink(')) h = 0;
      }
    } else a.ka = 1;
    !r && h && (r = a.Na(h));
    r && !a.linkLeaveQueryString && ((u = r.indexOf('?')), 0 <= u && (r = r.substring(0, u)));
    if (!m && r) {
      var G = 0,
        N = 0,
        S;
      if (a.trackDownloadLinks && a.linkDownloadFileTypes) {
        A = r.toLowerCase();
        u = A.indexOf('?');
        var W = A.indexOf('#');
        0 <= u ? 0 <= W && W < u && (u = W) : (u = W);
        0 <= u && (A = A.substring(0, u));
        u = a.linkDownloadFileTypes.toLowerCase().split(',');
        for (W = 0; W < u.length; W++) (S = u[W]) && A.substring(A.length - (S.length + 1)) == '.' + S && (m = 'd');
      }
      if (
        a.trackExternalLinks &&
        !m &&
        ((A = r.toLowerCase()),
        a.Qa(A) &&
          (a.linkInternalFilters || (a.linkInternalFilters = g.location.hostname),
          (u = 0),
          a.linkExternalFilters
            ? ((u = a.linkExternalFilters.toLowerCase().split(',')), (G = 1))
            : a.linkInternalFilters && (u = a.linkInternalFilters.toLowerCase().split(',')),
          u))
      ) {
        for (W = 0; W < u.length; W++) (S = u[W]), 0 <= A.indexOf(S) && (N = 1);
        N ? G && (m = 'e') : G || (m = 'e');
      }
    }
    a.linkObject = h;
    a.linkURL = r;
    a.linkType = m;
    if (a.trackClickMap || a.trackInlineStats)
      (a.e = ''),
        h &&
          ((m = a.pageName),
          (r = 1),
          (h = h.sourceIndex),
          m || ((m = a.pageURL), (r = 0)),
          g.s_objectID && ((c.id = g.s_objectID), (h = c.type = 1)),
          m &&
            c &&
            c.id &&
            H &&
            (a.e =
              '&pid=' +
              a.escape(m.substring(0, 255)) +
              (r ? '&pidt=' + r : '') +
              '&oid=' +
              a.escape(c.id.substring(0, 100)) +
              (c.type ? '&oidt=' + c.type : '') +
              '&ot=' +
              H +
              (h ? '&oi=' + h : '')));
  };
  a.Pb = function () {
    var c = a.ka,
      h = a.linkType,
      m = a.linkURL,
      r = a.linkName;
    h &&
      (m || r) &&
      ((h = h.toLowerCase()),
      'd' != h && 'e' != h && (h = 'o'),
      (a.pe = 'lnk_' + h),
      (a.pev1 = m ? a.escape(m) : ''),
      (a.pev2 = r ? a.escape(r) : ''),
      (c = 1));
    a.abort && (c = 0);
    if (a.trackClickMap || a.trackInlineStats || a.Sb()) {
      h = {};
      m = 0;
      var u = a.qb(),
        H = u ? u.split('&') : 0,
        A,
        G;
      u = 0;
      if (H)
        for (A = 0; A < H.length; A++) {
          var N = H[A].split('=');
          r = a.unescape(N[0]).split(',');
          N = a.unescape(N[1]);
          h[N] = r;
        }
      r = a.account.split(',');
      A = {};
      for (G in a.contextData)
        G &&
          !Object.prototype[G] &&
          'a.activitymap.' == G.substring(0, 14) &&
          ((A[G] = a.contextData[G]), (a.contextData[G] = ''));
      a.e = a.o('c', A) + (a.e ? a.e : '');
      if (c || a.e) {
        c && !a.e && (u = 1);
        for (N in h)
          if (!Object.prototype[N])
            for (G = 0; G < r.length; G++)
              for (
                u &&
                  ((H = h[N].join(',')),
                  H == a.account && ((a.e += ('&' != N.charAt(0) ? '&' : '') + N), (h[N] = []), (m = 1))),
                  A = 0;
                A < h[N].length;
                A++
              )
                (H = h[N][A]),
                  H == r[G] &&
                    (u && (a.e += '&u=' + a.escape(H) + ('&' != N.charAt(0) ? '&' : '') + N + '&u=0'),
                    h[N].splice(A, 1),
                    (m = 1));
        c || (m = 1);
        if (m) {
          u = '';
          A = 2;
          !c && a.e && ((u = a.escape(r.join(',')) + '=' + a.escape(a.e)), (A = 1));
          for (N in h)
            !Object.prototype[N] &&
              0 < A &&
              0 < h[N].length &&
              ((u += (u ? '&' : '') + a.escape(h[N].join(',')) + '=' + a.escape(N)), A--);
          a.xb(u);
        }
      }
    }
    return c;
  };
  a.qb = function () {
    if (a.useLinkTrackSessionStorage) {
      if (a.Da()) return g.sessionStorage.getItem(a.P);
    } else return a.cookieRead(a.P);
  };
  a.Da = function () {
    return g.sessionStorage ? !0 : !1;
  };
  a.xb = function (c) {
    a.useLinkTrackSessionStorage ? a.Da() && g.sessionStorage.setItem(a.P, c) : a.cookieWrite(a.P, c);
  };
  a.Qb = function () {
    if (!a.$b) {
      var c = new Date(),
        h = n.location,
        m = '1.2',
        r = a.cookieWrite('s_cc', 'true', 0) ? 'Y' : 'N',
        u = '',
        H = '';
      if (c.setUTCDate && ((m = '1.3'), (0).toPrecision && ((m = '1.5'), (c = []), c.forEach))) {
        m = '1.6';
        var A = 0;
        var G = {};
        try {
          (A = new Iterator(G)),
            A.next &&
              ((m = '1.7'),
              c.reduce &&
                ((m = '1.8'),
                m.trim && ((m = '1.8.1'), Date.parse && ((m = '1.8.2'), Object.create && (m = '1.8.5')))));
        } catch (W) {}
      }
      G = screen.width + 'x' + screen.height;
      c = navigator.javaEnabled() ? 'Y' : 'N';
      A = screen.pixelDepth ? screen.pixelDepth : screen.colorDepth;
      var N = a.w.innerWidth ? a.w.innerWidth : a.d.documentElement.offsetWidth;
      var S = a.w.innerHeight ? a.w.innerHeight : a.d.documentElement.offsetHeight;
      try {
        a.b.addBehavior('#default#homePage'), (u = a.b.hc(h) ? 'Y' : 'N');
      } catch (W) {}
      try {
        a.b.addBehavior('#default#clientCaps'), (H = a.b.connectionType);
      } catch (W) {}
      a.resolution = G;
      a.colorDepth = A;
      a.javascriptVersion = m;
      a.javaEnabled = c;
      a.cookiesEnabled = r;
      a.browserWidth = N;
      a.browserHeight = S;
      a.connectionType = H;
      a.homepage = u;
      a.$b = 1;
    }
  };
  a.Q = {};
  a.loadModule = function (c, h) {
    var m = a.Q[c];
    if (!m) {
      m = g['AppMeasurement_Module_' + c] ? new g['AppMeasurement_Module_' + c](a) : {};
      a.Q[c] = a[c] = m;
      m.kb = function () {
        return m.tb;
      };
      m.yb = function (r) {
        if ((m.tb = r)) (a[c + '_onLoad'] = r), a.da(c + '_onLoad', [a, m], 1) || r(a, m);
      };
      try {
        Object.defineProperty ? Object.defineProperty(m, 'onLoad', { get: m.kb, set: m.yb }) : (m._olc = 1);
      } catch (r) {
        m._olc = 1;
      }
    }
    h && ((a[c + '_onLoad'] = h), a.da(c + '_onLoad', [a, m], 1) || h(a, m));
  };
  a.u = function (c) {
    var h, m;
    for (h in a.Q)
      if (
        !Object.prototype[h] &&
        (m = a.Q[h]) &&
        (m._olc && m.onLoad && ((m._olc = 0), m.onLoad(a, m)), m[c] && m[c]())
      )
        return 1;
    return 0;
  };
  a.Sb = function () {
    return a.ActivityMap && a.ActivityMap._c ? !0 : !1;
  };
  a.Tb = function () {
    var c = Math.floor(1e13 * Math.random()),
      h = a.visitorSampling,
      m = a.visitorSamplingGroup;
    m = 's_vsn_' + (a.visitorNamespace ? a.visitorNamespace : a.account) + (m ? '_' + m : '');
    var r = a.cookieRead(m);
    if (h) {
      h *= 100;
      r &&= parseInt(r);
      if (!r) {
        if (!a.cookieWrite(m, c)) return 0;
        r = c;
      }
      if (r % 1e4 > h) return 0;
    }
    return 1;
  };
  a.S = function (c, h) {
    var m, r, u, H, A;
    var G = {};
    for (m = 0; 2 > m; m++) {
      var N = 0 < m ? a.Ga : a.g;
      for (r = 0; r < N.length; r++)
        if (((u = N[r]), (H = c[u]) || c['!' + u])) {
          if (H && !h && ('contextData' == u || 'retrieveLightData' == u) && a[u])
            for (A in a[u]) H[A] || (H[A] = a[u][A]);
          a[u] || (G['!' + u] = 1);
          G[u] = a[u];
          a[u] = H;
        }
    }
    return G;
  };
  a.ec = function (c) {
    var h, m;
    for (h = 0; 2 > h; h++) {
      var r = 0 < h ? a.Ga : a.g;
      for (m = 0; m < r.length; m++) {
        var u = r[m];
        c[u] = a[u];
        c[u] ||
          ('prop' !== u.substring(0, 4) &&
            'eVar' !== u.substring(0, 4) &&
            'hier' !== u.substring(0, 4) &&
            'list' !== u.substring(0, 4) &&
            'channel' !== u &&
            'events' !== u &&
            'eventList' !== u &&
            'products' !== u &&
            'productList' !== u &&
            'purchaseID' !== u &&
            'transactionID' !== u &&
            'state' !== u &&
            'zip' !== u &&
            'campaign' !== u &&
            'events2' !== u &&
            'latitude' !== u &&
            'longitude' !== u &&
            'ms_a' !== u &&
            'contextData' !== u &&
            'supplementalDataID' !== u &&
            'tnt' !== u &&
            'timestamp' !== u &&
            'abort' !== u &&
            'useBeacon' !== u &&
            'linkObject' !== u &&
            'clickObject' !== u &&
            'linkType' !== u &&
            'linkName' !== u &&
            'linkURL' !== u &&
            'bodyClickTarget' !== u &&
            'bodyClickFunction' !== u) ||
          (c['!' + u] = 1);
      }
    }
  };
  a.Kb = function (c) {
    var h,
      m,
      r,
      u,
      H,
      A = 0,
      G,
      N = '',
      S = '';
    if (
      c &&
      255 < c.length &&
      ((h = '' + c),
      (m = h.indexOf('?')),
      0 < m &&
        ((G = h.substring(m + 1)),
        (h = h.substring(0, m)),
        (u = h.toLowerCase()),
        (r = 0),
        'http://' == u.substring(0, 7) ? (r += 7) : 'https://' == u.substring(0, 8) && (r += 8),
        (m = u.indexOf('/', r)),
        0 < m &&
          ((u = u.substring(r, m)),
          (H = h.substring(m)),
          (h = h.substring(0, m)),
          0 <= u.indexOf('google')
            ? (A = ',q,ie,start,search_key,word,kw,cd,')
            : 0 <= u.indexOf('yahoo.co') && (A = ',p,ei,'),
          A && G)))
    ) {
      if ((c = G.split('&')) && 1 < c.length) {
        for (r = 0; r < c.length; r++)
          (u = c[r]),
            (m = u.indexOf('=')),
            0 < m && 0 <= A.indexOf(',' + u.substring(0, m) + ',')
              ? (N += (N ? '&' : '') + u)
              : (S += (S ? '&' : '') + u);
        N && S ? (G = N + '&' + S) : (S = '');
      }
      m = 253 - (G.length - S.length) - h.length;
      c = h + (0 < m ? H.substring(0, m) : '') + '?' + G;
    }
    return c;
  };
  a.eb = function (c) {
    var h = a.d.visibilityState,
      m = ['webkitvisibilitychange', 'visibilitychange'];
    h ||= a.d.webkitVisibilityState;
    if (h && 'prerender' == h) {
      if (c)
        for (h = 0; h < m.length; h++)
          a.d.addEventListener(m[h], function () {
            var r = a.d.visibilityState;
            r ||= a.d.webkitVisibilityState;
            'visible' == r && c();
          });
      return !1;
    }
    return !0;
  };
  a.aa = !1;
  a.H = !1;
  a.Ab = function () {
    a.H = !0;
    a.p();
  };
  a.I = !1;
  a.Fa = !1;
  a.Ba = function () {
    var c = a.T();
    !a.I && c && c.getVisitorValues && ((a.Fa = !0), (a.I = !0), c.getVisitorValues(a.Bb));
  };
  a.Bb = function (c) {
    a.marketingCloudVisitorID = c.MCMID;
    a.visitorOptedOut = c.MCOPTOUT;
    a.analyticsVisitorID = c.MCAID;
    a.audienceManagerLocationHint = c.MCAAMLH;
    a.audienceManagerBlob = c.MCAAMB;
    a.I = !1;
    a.p();
  };
  a.cb = function (c) {
    a.maxDelay || (a.maxDelay = 250);
    return a.u('_d')
      ? (c &&
          setTimeout(function () {
            c();
          }, a.maxDelay),
        !1)
      : !0;
  };
  a.Y = !1;
  a.G = !1;
  a.ya = function () {
    a.G = !0;
    a.p();
  };
  a.isReadyToTrack = function () {
    var c = !0;
    if (!a.ob() || !a.mb()) return !1;
    a.wa() || (c = !1);
    a.sb() || (c = !1);
    return c;
  };
  a.ob = function () {
    a.aa || a.H || (a.eb(a.Ab) ? (a.H = !0) : (a.aa = !0));
    return a.aa && !a.H ? !1 : !0;
  };
  a.mb = function () {
    var c = a.ua();
    if (c)
      if (a.qa || a.Z)
        if (a.qa) {
          if (!c.isApproved(c.Categories.ANALYTICS)) return !1;
        } else return !1;
      else return c.fetchPermissions(a.ub, !0), (a.Z = !0), !1;
    return !0;
  };
  a.V = function (c) {
    var h = a.ua();
    return h && !h.isApproved(h.Categories[c]) ? !1 : !0;
  };
  a.ua = function () {
    return g.adobe && g.adobe.optIn ? g.adobe.optIn : null;
  };
  a.wa = function () {
    a.Fa || a.Ba();
    return !a.I;
  };
  a.T = function () {
    var c = a.visitor;
    c && !c.isAllowed() && (c = null);
    return c;
  };
  a.sb = function () {
    a.Y || a.G || (a.cb(a.ya) ? (a.G = !0) : (a.Y = !0));
    return a.Y && !a.G ? !1 : !0;
  };
  a.Z = !1;
  a.ub = function () {
    a.Z = !1;
    a.qa = !0;
  };
  a.j = k;
  a.q = 0;
  a.callbackWhenReadyToTrack = function (c, h, m) {
    var r = {};
    r.Fb = c;
    r.Eb = h;
    r.Cb = m;
    a.j == k && (a.j = []);
    a.j.push(r);
    0 == a.q && (a.q = setInterval(a.p, 100));
  };
  a.p = function () {
    if (a.isReadyToTrack() && (a.zb(), a.j != k))
      for (; 0 < a.j.length; ) {
        var c = a.j.shift();
        c.Eb.apply(c.Fb, c.Cb);
      }
  };
  a.zb = function () {
    a.q && (clearInterval(a.q), (a.q = 0));
  };
  a.ra = function (c) {
    var h,
      m = {};
    a.ec(m);
    if (c != k) for (h in c) m[h] = c[h];
    a.callbackWhenReadyToTrack(a, a.Ea, [m]);
    a.Ca();
  };
  a.Mb = function () {
    var c = a.cookieRead('s_fid'),
      h = '',
      m = '';
    var r = 8;
    var u = 4;
    if (!c || 0 > c.indexOf('-')) {
      for (c = 0; 16 > c; c++)
        (r = Math.floor(Math.random() * r)),
          (h += '0123456789ABCDEF'.substring(r, r + 1)),
          (r = Math.floor(Math.random() * u)),
          (m += '0123456789ABCDEF'.substring(r, r + 1)),
          (r = u = 16);
      c = h + '-' + m;
    }
    a.cookieWrite('s_fid', c, 1) || (c = 0);
    return c;
  };
  a.Ea = function (c) {
    var h = new Date(),
      m = 's' + (Math.floor(h.getTime() / 108e5) % 10) + Math.floor(1e13 * Math.random()),
      r = h.getYear();
    r =
      't=' +
      a.escape(
        h.getDate() +
          '/' +
          h.getMonth() +
          '/' +
          (1900 > r ? r + 1900 : r) +
          ' ' +
          h.getHours() +
          ':' +
          h.getMinutes() +
          ':' +
          h.getSeconds() +
          ' ' +
          h.getDay() +
          ' ' +
          h.getTimezoneOffset(),
      );
    var u = a.T(),
      H;
    c && (H = a.S(c, 1));
    a.Tb() &&
      !a.visitorOptedOut &&
      (a.va() || (a.fid = a.Mb()),
      a.Wb(),
      a.usePlugins && a.doPlugins && a.doPlugins(a),
      a.account &&
        (a.abort ||
          (a.trackOffline && !a.timestamp && (a.timestamp = Math.floor(h.getTime() / 1e3)),
          (c = g.location),
          a.pageURL || (a.pageURL = c.href ? c.href : c),
          a.referrer ||
            a.ab ||
            ((c = a.Util.getQueryParam('adobe_mc_ref', null, null, !0)),
            (a.referrer = c || void 0 === c ? (void 0 === c ? '' : c) : n.document.referrer)),
          (a.ab = 1),
          (a.referrer = a.Kb(a.referrer)),
          a.u('_g')),
        a.Pb() &&
          !a.abort &&
          (u &&
            a.V('TARGET') &&
            !a.supplementalDataID &&
            u.getSupplementalDataID &&
            (a.supplementalDataID = u.getSupplementalDataID(
              'AppMeasurement:' + a._in,
              a.expectSupplementalData ? !1 : !0,
            )),
          a.V('AAM') || (a.contextData['cm.ssf'] = 1),
          a.Qb(),
          (r += a.Ob()),
          a.rb(m, r),
          a.u('_t'),
          (a.referrer = ''))));
    a.Ca();
    H && a.S(H, 1);
  };
  a.t = a.track = function (c, h) {
    h && a.S(h);
    a.Ba();
    a.isReadyToTrack() ? (null != a.j && 0 < a.j.length ? (a.ra(c), a.p()) : a.Ea(c)) : a.ra(c);
  };
  a.Ca = function () {
    a.abort =
      a.supplementalDataID =
      a.timestamp =
      a.pageURLRest =
      a.linkObject =
      a.clickObject =
      a.linkURL =
      a.linkName =
      a.linkType =
      g.s_objectID =
      a.pe =
      a.pev1 =
      a.pev2 =
      a.pev3 =
      a.e =
      a.lightProfileID =
      a.useBeacon =
      a.referrer =
        0;
  };
  a.Aa = [];
  a.registerPreTrackCallback = function (c) {
    for (var h = [], m = 1; m < arguments.length; m++) h.push(arguments[m]);
    'function' == typeof c
      ? a.Aa.push([c, h])
      : a.debugTracking && a.C('DEBUG: Non function type passed to registerPreTrackCallback');
  };
  a.hb = function (c) {
    a.ta(a.Aa, c);
  };
  a.za = [];
  a.registerPostTrackCallback = function (c) {
    for (var h = [], m = 1; m < arguments.length; m++) h.push(arguments[m]);
    'function' == typeof c
      ? a.za.push([c, h])
      : a.debugTracking && a.C('DEBUG: Non function type passed to registerPostTrackCallback');
  };
  a.gb = function (c) {
    a.ta(a.za, c);
  };
  a.ta = function (c, h) {
    if ('object' == typeof c)
      for (var m = 0; m < c.length; m++) {
        var r = c[m][0],
          u = c[m][1].slice();
        u.unshift(h);
        if ('function' == typeof r)
          try {
            r.apply(null, u);
          } catch (H) {
            a.debugTracking && a.C(H.message);
          }
      }
  };
  a.tl = a.trackLink = function (c, h, m, r, u) {
    a.linkObject = c;
    a.linkType = h;
    a.linkName = m;
    u && ((a.bodyClickTarget = c), (a.bodyClickFunction = u));
    return a.track(r);
  };
  a.trackLight = function (c, h, m, r) {
    a.lightProfileID = c;
    a.lightStoreForSeconds = h;
    a.lightIncrementBy = m;
    return a.track(r);
  };
  a.clearVars = function () {
    var c, h;
    for (c = 0; c < a.g.length; c++)
      if (
        ((h = a.g[c]),
        'prop' == h.substring(0, 4) ||
          'eVar' == h.substring(0, 4) ||
          'hier' == h.substring(0, 4) ||
          'list' == h.substring(0, 4) ||
          'channel' == h ||
          'events' == h ||
          'eventList' == h ||
          'products' == h ||
          'productList' == h ||
          'purchaseID' == h ||
          'transactionID' == h ||
          'state' == h ||
          'zip' == h ||
          'campaign' == h)
      )
        a[h] = void 0;
  };
  a.tagContainerMarker = '';
  a.rb = function (c, h) {
    c =
      a.ib() +
      '/' +
      c +
      '?AQB=1&ndh=1&pf=1&' +
      (a.xa() ? 'callback=s_c_il[' + a._in + '].doPostbacks&et=1&' : '') +
      h +
      '&AQE=1';
    a.hb(c);
    a.fb(c);
    a.U();
  };
  a.ib = function () {
    var c = a.jb();
    return (
      'http' +
      (a.ssl ? 's' : '') +
      '://' +
      c +
      '/b/ss/' +
      a.account +
      '/' +
      (a.mobile ? '5.' : '') +
      (a.xa() ? '10' : '1') +
      '/JS-' +
      a.version +
      (a.Zb ? 'T' : '') +
      (a.tagContainerMarker ? '-' + a.tagContainerMarker : '')
    );
  };
  a.xa = function () {
    return (a.AudienceManagement && a.AudienceManagement.isReady()) || 0 != a.usePostbacks;
  };
  a.jb = function () {
    var c = a.dc,
      h = a.trackingServer;
    h
      ? a.trackingServerSecure && a.ssl && (h = a.trackingServerSecure)
      : ((c = c ? ('' + c).toLowerCase() : 'd1'),
        'd1' == c ? (c = '112') : 'd2' == c && (c = '122'),
        (h = a.lb() + '.' + c + '.2o7.net'));
    return h;
  };
  a.lb = function () {
    var c = a.visitorNamespace;
    c || ((c = a.account.split(',')[0]), (c = c.replace(/[^0-9a-z]/gi, '')));
    return c;
  };
  a.$a = /{(%?)(.*?)(%?)}/;
  a.cc = RegExp(a.$a.source, 'g');
  a.Jb = function (c) {
    if ('object' == typeof c.dests)
      for (var h = 0; h < c.dests.length; ++h) {
        var m = c.dests[h];
        if ('string' == typeof m.c && 'aa.' == m.id.substr(0, 3))
          for (var r = m.c.match(a.cc), u = 0; u < r.length; ++u) {
            var H = r[u],
              A = H.match(a.$a),
              G = '';
            '%' == A[1] && 'timezone_offset' == A[2]
              ? (G = new Date().getTimezoneOffset())
              : '%' == A[1] && 'timestampz' == A[2] && (G = a.Nb());
            m.c = m.c.replace(H, a.escape(G));
          }
      }
  };
  a.Nb = function () {
    var c = new Date(),
      h = new Date(6e4 * Math.abs(c.getTimezoneOffset()));
    return (
      a.k(4, c.getFullYear()) +
      '-' +
      a.k(2, c.getMonth() + 1) +
      '-' +
      a.k(2, c.getDate()) +
      'T' +
      a.k(2, c.getHours()) +
      ':' +
      a.k(2, c.getMinutes()) +
      ':' +
      a.k(2, c.getSeconds()) +
      (0 < c.getTimezoneOffset() ? '-' : '+') +
      a.k(2, h.getUTCHours()) +
      ':' +
      a.k(2, h.getUTCMinutes())
    );
  };
  a.k = function (c, h) {
    return (Array(c + 1).join(0) + h).slice(-c);
  };
  a.oa = {};
  a.doPostbacks = function (c) {
    if ('object' == typeof c)
      if (
        (a.Jb(c),
        'object' == typeof a.AudienceManagement &&
          'function' == typeof a.AudienceManagement.isReady &&
          a.AudienceManagement.isReady() &&
          'function' == typeof a.AudienceManagement.passData)
      )
        a.AudienceManagement.passData(c);
      else if ('object' == typeof c && 'object' == typeof c.dests)
        for (var h = 0; h < c.dests.length; ++h) {
          var m = c.dests[h];
          'object' == typeof m &&
            'string' == typeof m.c &&
            'string' == typeof m.id &&
            'aa.' == m.id.substr(0, 3) &&
            ((a.oa[m.id] = new Image()), (a.oa[m.id].alt = ''), (a.oa[m.id].src = m.c));
        }
  };
  a.fb = function (c) {
    a.i || a.Rb();
    a.i.push(c);
    a.ha = a.A();
    a.Ya();
  };
  a.Rb = function () {
    a.i = a.Ub();
    a.i || (a.i = []);
  };
  a.Ub = function () {
    var c, h;
    if (a.na()) {
      try {
        (h = g.localStorage.getItem(a.la())) && (c = g.JSON.parse(h));
      } catch (m) {}
      return c;
    }
  };
  a.na = function () {
    var c = !0;
    (a.trackOffline && a.offlineFilename && g.localStorage && g.JSON) || (c = !1);
    return c;
  };
  a.Oa = function () {
    var c = 0;
    a.i && (c = a.i.length);
    a.l && c++;
    return c;
  };
  a.U = function () {
    if (!a.l || (a.v && a.v.complete && a.v.D && a.v.R(), !a.l))
      if (((a.Pa = k), a.ma)) a.ha > a.N && a.Wa(a.i), a.pa(500);
      else {
        var c = a.Db();
        if (0 < c) a.pa(c);
        else if ((c = a.Ma())) (a.l = 1), a.Vb(c), a.Yb(c);
      }
  };
  a.pa = function (c) {
    a.Pa || ((c ||= 0), (a.Pa = setTimeout(a.U, c)));
  };
  a.Db = function () {
    if (!a.trackOffline || 0 >= a.offlineThrottleDelay) return 0;
    var c = a.A() - a.Ua;
    return a.offlineThrottleDelay < c ? 0 : a.offlineThrottleDelay - c;
  };
  a.Ma = function () {
    if (0 < a.i.length) return a.i.shift();
  };
  a.Vb = function (c) {
    if (a.debugTracking) {
      var h = 'AppMeasurement Debug: ' + c;
      c = c.split('&');
      var m;
      for (m = 0; m < c.length; m++) h += '\n\t' + a.unescape(c[m]);
      a.C(h);
    }
  };
  a.va = function () {
    return a.marketingCloudVisitorID || a.analyticsVisitorID;
  };
  a.X = !1;
  try {
    var E = JSON.parse('{"x":"y"}');
  } catch (c) {
    E = null;
  }
  E && 'y' == E.x
    ? ((a.X = !0),
      (a.W = function (c) {
        return JSON.parse(c);
      }))
    : g.$ && g.$.parseJSON
      ? ((a.W = function (c) {
          return g.$.parseJSON(c);
        }),
        (a.X = !0))
      : (a.W = function () {
          return null;
        });
  a.Yb = function (c) {
    var h, m, r;
    a.nb(c) &&
      ((m = 1),
      (h = {
        send: function (u) {
          a.useBeacon = !1;
          navigator.sendBeacon(u) ? h.R() : h.fa();
        },
      }));
    !h &&
      a.va() &&
      4047 < c.length &&
      (a.bb() && ((m = 2), (h = new XMLHttpRequest())),
      h &&
        ((a.AudienceManagement && a.AudienceManagement.isReady()) || 0 != a.usePostbacks) &&
        (a.X ? (h.Ha = !0) : (h = 0)));
    !h && a.Za && (c = c.substring(0, 4047));
    !h &&
      a.d.createElement &&
      (0 != a.usePostbacks || (a.AudienceManagement && a.AudienceManagement.isReady())) &&
      (h = a.d.createElement('SCRIPT')) &&
      'async' in h &&
      ((r = (r = a.d.getElementsByTagName('HEAD')) && r[0] ? r[0] : a.d.body)
        ? ((h.type = 'text/javascript'), h.setAttribute('async', 'async'), (m = 3))
        : (h = 0));
    h ||
      ((h = new Image()),
      (h.alt = ''),
      h.abort ||
        'undefined' === typeof g.InstallTrigger ||
        (h.abort = function () {
          h.src = k;
        }));
    h.Va = Date.now();
    h.Ja = function () {
      try {
        h.D && (clearTimeout(h.D), (h.D = 0));
      } catch (u) {}
    };
    h.onload = h.R = function () {
      h.Va && (a.ia = Date.now() - h.Va);
      a.gb(c);
      h.Ja();
      a.Hb();
      a.ba();
      a.l = 0;
      a.U();
      if (h.Ha) {
        h.Ha = !1;
        try {
          a.doPostbacks(a.W(h.responseText));
        } catch (u) {}
      }
    };
    h.onabort =
      h.onerror =
      h.fa =
        function () {
          h.Ja();
          (a.trackOffline || a.ma) && a.l && a.i.unshift(a.Gb);
          a.l = 0;
          a.ha > a.N && a.Wa(a.i);
          a.ba();
          a.pa(500);
        };
    h.onreadystatechange = function () {
      4 == h.readyState && (200 == h.status ? h.R() : h.fa());
    };
    a.Ua = a.A();
    if (1 === m) h.send(c);
    else if (2 === m)
      (r = c.indexOf('?')),
        (m = c.substring(0, r)),
        (r = c.substring(r + 1)),
        (r = r.replace(/&callback=[a-zA-Z0-9_.\[\]]+/, '')),
        h.open('POST', m, !0),
        (h.withCredentials = !0),
        h.send(r);
    else if (((h.src = c), 3 === m)) {
      if (a.Sa)
        try {
          r.removeChild(a.Sa);
        } catch (u) {}
      r.firstChild ? r.insertBefore(h, r.firstChild) : r.appendChild(h);
      a.Sa = a.v;
    }
    h.D = setTimeout(function () {
      h.D && (h.complete ? h.R() : (a.trackOffline && h.abort && h.abort(), h.fa()));
    }, 5e3);
    a.Gb = c;
    a.v = g['s_i_' + a.replace(a.account, ',', '_')] = h;
    if ((a.useForcedLinkTracking && a.J) || a.bodyClickFunction)
      a.forcedLinkTrackingTimeout || (a.forcedLinkTrackingTimeout = 250),
        (a.ca = setTimeout(a.ba, a.forcedLinkTrackingTimeout));
  };
  a.nb = function (c) {
    var h = !1;
    navigator.sendBeacon && (a.pb(c) ? (h = !0) : a.useBeacon && (h = !0));
    a.wb(c) && (h = !1);
    return h;
  };
  a.pb = function (c) {
    return c && 0 < c.indexOf('pe=lnk_e') ? !0 : !1;
  };
  a.wb = function (c) {
    return 64e3 <= c.length;
  };
  a.bb = function () {
    return 'undefined' !== typeof XMLHttpRequest && 'withCredentials' in new XMLHttpRequest() ? !0 : !1;
  };
  a.Hb = function () {
    if (a.na() && !(a.Ta > a.N))
      try {
        g.localStorage.removeItem(a.la()), (a.Ta = a.A());
      } catch (c) {}
  };
  a.Wa = function (c) {
    if (a.na()) {
      a.Ya();
      try {
        g.localStorage.setItem(a.la(), g.JSON.stringify(c)), (a.N = a.A());
      } catch (h) {}
    }
  };
  a.Ya = function () {
    if (a.trackOffline) {
      if (!a.offlineLimit || 0 >= a.offlineLimit) a.offlineLimit = 10;
      for (; a.i.length > a.offlineLimit; ) a.Ma();
    }
  };
  a.forceOffline = function () {
    a.ma = !0;
  };
  a.forceOnline = function () {
    a.ma = !1;
  };
  a.la = function () {
    return a.offlineFilename + '-' + a.visitorNamespace + a.account;
  };
  a.A = function () {
    return new Date().getTime();
  };
  a.Qa = function (c) {
    c = c.toLowerCase();
    return 0 != c.indexOf('#') && 0 != c.indexOf('about:') && 0 != c.indexOf('opera:') && 0 != c.indexOf('javascript:')
      ? !0
      : !1;
  };
  a.setTagContainer = function (c) {
    var h, m;
    a.Zb = c;
    for (h = 0; h < a._il.length; h++)
      if ((m = a._il[h]) && 's_l' == m._c && m.tagContainerName == c) {
        a.S(m);
        if (m.lmq)
          for (h = 0; h < m.lmq.length; h++) {
            var r = m.lmq[h];
            a.loadModule(r.n);
          }
        if (m.ml)
          for (r in m.ml)
            if (a[r])
              for (h in ((c = a[r]), (r = m.ml[r]), r))
                !Object.prototype[h] &&
                  ('function' != typeof r[h] || 0 > ('' + r[h]).indexOf('s_c_il')) &&
                  (c[h] = r[h]);
        if (m.mmq)
          for (h = 0; h < m.mmq.length; h++)
            (r = m.mmq[h]),
              a[r.m] &&
                ((c = a[r.m]), c[r.f] && 'function' == typeof c[r.f] && (r.a ? c[r.f].apply(c, r.a) : c[r.f].apply(c)));
        if (m.tq) for (h = 0; h < m.tq.length; h++) a.track(m.tq[h]);
        m.s = a;
        break;
      }
  };
  a.Util = {
    urlEncode: a.escape,
    urlDecode: a.unescape,
    cookieRead: a.cookieRead,
    cookieWrite: a.cookieWrite,
    getQueryParam: function (c, h, m, r) {
      var u = '';
      h ||= a.pageURL ? a.pageURL : g.location;
      m = m ? m : '&';
      if (!c || !h) return u;
      h = '' + h;
      var H = h.indexOf('?');
      if (0 > H) return u;
      h = m + h.substring(H + 1) + m;
      if (!r || !(0 <= h.indexOf(m + c + m) || 0 <= h.indexOf(m + c + '=' + m))) {
        H = h.indexOf('#');
        0 <= H && (h = h.substr(0, H) + m);
        H = h.indexOf(m + c + '=');
        if (0 > H) return u;
        h = h.substring(H + m.length + c.length + 1);
        H = h.indexOf(m);
        0 <= H && (h = h.substring(0, H));
        0 < h.length && (u = a.unescape(h));
        return u;
      }
    },
    getIeVersion: function () {
      if (document.documentMode) return document.documentMode;
      for (var c = 7; 4 < c; c--) {
        var h = document.createElement('div');
        h.innerHTML = '\x3c!--[if IE ' + c + ']><span></span><![endif]--\x3e';
        if (h.getElementsByTagName('span').length) return c;
      }
      return null;
    },
  };
  a.F =
    'supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData'.split(
      ' ',
    );
  a.g = a.F.concat(
    'purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt'.split(
      ' ',
    ),
  );
  a.ja =
    'timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy'.split(
      ' ',
    );
  a.O = a.ja.slice(0);
  a.Ga =
    'account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout useLinkTrackSessionStorage trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData useBeacon usePostbacks registerPreTrackCallback registerPostTrackCallback bodyClickTarget bodyClickFunction AudienceManagement'.split(
      ' ',
    );
  for (B = 0; 250 >= B; B++)
    76 > B && (a.g.push('prop' + B), a.O.push('prop' + B)),
      a.g.push('eVar' + B),
      a.O.push('eVar' + B),
      6 > B && a.g.push('hier' + B),
      4 > B && a.g.push('list' + B);
  B =
    'pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID ms_a'.split(
      ' ',
    );
  a.g = a.g.concat(B);
  a.F = a.F.concat(B);
  a.ssl = 0 <= g.location.protocol.toLowerCase().indexOf('https');
  a.charSet = 'UTF-8';
  a.contextData = {};
  a.offlineThrottleDelay = 0;
  a.offlineFilename = 'AppMeasurement.offline';
  a.P = 's_sq';
  a.Ua = 0;
  a.ha = 0;
  a.N = 0;
  a.Ta = 0;
  a.linkDownloadFileTypes = 'exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
  a.w = g;
  a.d = g.document;
  try {
    if (((a.Za = !1), navigator)) {
      var K = navigator.userAgent;
      if (
        'Microsoft Internet Explorer' == navigator.appName ||
        0 <= K.indexOf('MSIE ') ||
        (0 <= K.indexOf('Trident/') && 0 <= K.indexOf('Windows NT 6'))
      )
        a.Za = !0;
    }
  } catch (c) {}
  a.ba = function () {
    a.ca && (g.clearTimeout(a.ca), (a.ca = k));
    a.bodyClickTarget && a.J && a.bodyClickTarget.dispatchEvent(a.J);
    a.bodyClickFunction &&
      ('function' == typeof a.bodyClickFunction
        ? a.bodyClickFunction()
        : a.bodyClickTarget && a.bodyClickTarget.href && (a.d.location = a.bodyClickTarget.href));
    a.bodyClickTarget = a.J = a.bodyClickFunction = 0;
  };
  a.Xa = function () {
    a.b = a.d.body;
    a.b
      ? ((a.r = function (c) {
          var h, m, r;
          if (!((a.d && a.d.getElementById('cppXYctnr')) || (c && c['s_fe_' + a._in]))) {
            if (a.Ia)
              if (a.useForcedLinkTracking) a.b.removeEventListener('click', a.r, !1);
              else {
                a.b.removeEventListener('click', a.r, !0);
                a.Ia = a.useForcedLinkTracking = 0;
                return;
              }
            else a.useForcedLinkTracking = 0;
            a.clickObject = c.srcElement ? c.srcElement : c.target;
            try {
              if (
                !a.clickObject ||
                (a.M && a.M == a.clickObject) ||
                !(a.clickObject.tagName || a.clickObject.parentElement || a.clickObject.parentNode)
              )
                a.clickObject = 0;
              else {
                var u = (a.M = a.clickObject);
                a.ga && (clearTimeout(a.ga), (a.ga = 0));
                a.ga = setTimeout(function () {
                  a.M == u && (a.M = 0);
                }, 1e4);
                var H = a.Oa();
                a.track();
                if (H < a.Oa() && a.useForcedLinkTracking && c.target) {
                  for (
                    m = c.target;
                    m && m != a.b && 'A' != m.tagName.toUpperCase() && 'AREA' != m.tagName.toUpperCase();

                  )
                    m = m.parentNode;
                  if (
                    m &&
                    ((r = m.href),
                    a.Qa(r) || (r = 0),
                    (h = m.target),
                    c.target.dispatchEvent &&
                      r &&
                      (!h || '_self' == h || '_top' == h || '_parent' == h || (g.name && h == g.name)))
                  ) {
                    try {
                      var A = a.d.createEvent('MouseEvents');
                    } catch (G) {
                      A = new g.MouseEvent();
                    }
                    if (A) {
                      try {
                        A.initMouseEvent(
                          'click',
                          c.bubbles,
                          c.cancelable,
                          c.view,
                          c.detail,
                          c.screenX,
                          c.screenY,
                          c.clientX,
                          c.clientY,
                          c.ctrlKey,
                          c.altKey,
                          c.shiftKey,
                          c.metaKey,
                          c.button,
                          c.relatedTarget,
                        );
                      } catch (G) {
                        A = 0;
                      }
                      A &&
                        ((A['s_fe_' + a._in] = A.s_fe = 1),
                        c.stopPropagation(),
                        c.stopImmediatePropagation && c.stopImmediatePropagation(),
                        c.preventDefault(),
                        (a.bodyClickTarget = c.target),
                        (a.J = A));
                    }
                  }
                }
              }
            } catch (G) {
              a.clickObject = 0;
            }
          }
        }),
        a.b && a.b.attachEvent
          ? a.b.attachEvent('onclick', a.r)
          : a.b &&
            a.b.addEventListener &&
            (navigator &&
              ((0 <= navigator.userAgent.indexOf('WebKit') && a.d.createEvent) ||
                (0 <= navigator.userAgent.indexOf('Firefox/2') && g.MouseEvent)) &&
              ((a.Ia = 1), (a.useForcedLinkTracking = 1), a.b.addEventListener('click', a.r, !0)),
            a.b.addEventListener('click', a.r, !1)))
      : setTimeout(a.Xa, 30);
  };
  a.Ib();
  a.jc ||
    (b ? a.setAccount(b) : a.C('Error, missing Report Suite ID in AppMeasurement initialization'),
    a.Xa(),
    a.loadModule('ActivityMap'));
}
function s3_gi(b) {
  var a = window.s_c_il,
    g,
    k = b.split(','),
    n,
    D,
    B = 0;
  if (a)
    for (g = 0; !B && g < a.length; ) {
      var E = a[g];
      if ('s_c' == E._c && (E.account || E.oun))
        if (E.account && E.account == b) B = 1;
        else {
          var K = E.account ? E.account : E.oun;
          K = E.allAccounts ? E.allAccounts : K.split(',');
          for (n = 0; n < k.length; n++) for (D = 0; D < K.length; D++) k[n] == K[D] && (B = 1);
        }
      g++;
    }
  B ? E.setAccount && E.setAccount(b) : (E = new AppMeasurement(b));
  return E;
}
AppMeasurement.getInstance = s3_gi;
window.s_objectID || (window.s_objectID = 0);
function s3_pgicq() {
  var b = window,
    a = b.s_giq,
    g;
  if (a)
    for (g = 0; g < a.length; g++) {
      var k = a[g];
      var n = s3_gi(k.oun);
      n.setAccount(k.un);
      n.setTagContainer(k.tagContainerName);
    }
  b.s_giq = 0;
}
s3_pgicq();
