(!(function (t, e, n, a, o, c) {
  ((t.WBGAnalyticsObject = o),
    (t[o] =
      t[o] ||
      function () {
        (t[o].q = t[o].q || []).push(arguments);
      }),
    (t[o].config = {}));
})(window, document, 0, 0, 'wa'),
  (function (t, e) {
    var n = t.WBGAnalyticsObject,
      a = t[n].config,
      o = t.testTracking || {};
    ((a.prod = 0), (a.brand = 0), (a.site = 0), (a.findBrand = !0), (a.findSite = !0));
    var c = {
      location: o.location || t.location,
      addHandler: function (t, e, n) {
        t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && t.attachEvent('on' + e, n);
      },
      onReady: function (n) {
        /complete/.test(e.readyState)
          ? n()
          : c.addHandler(t, 'load', function () {
              setTimeout(n, 4);
            });
      },
      scriptElement: function (t) {
        var n = e.getElementById(t),
          a = e.getElementsByTagName('script')[0];
        return n || (((n = e.createElement('script')).id = t), (n.async = 1), a.parentNode.insertBefore(n, a), n);
      },
      cookieRead: function (t) {
        return (
          decodeURIComponent(
            e.cookie.replace(
              new RegExp(
                '(?:(?:^|.*;)\\s*' +
                  encodeURIComponent(t).replace(/[\-\.\+\*]/g, '\\$&') +
                  '\\s*\\=\\s*([^;]*).*$)|^.*$',
              ),
              '$1',
            ),
          ) || ''
        );
      },
      cookieWrite: function (t, n, a, o, c, i) {
        if (!t || /^(?:expires|max-age|path|domain|secure)$/i.test(t)) return !1;
        var r = '';
        return (
          a && a.constructor === Date && (r = '; expires=' + a.toUTCString()),
          (e.cookie =
            encodeURIComponent(t) +
            '=' +
            encodeURIComponent(n) +
            r +
            (c ? '; domain=' + c : '') +
            (o ? '; path=' + o : '') +
            (i ? '; secure' : '')),
          !0
        );
      },
      cloneObject: function (t, e) {
        var n,
          a,
          o = t && t.constructor ? t.constructor : void 0;
        if (!t || (o !== RegExp && o !== Date && o !== Function && o !== Object && o !== Array)) return t;
        switch (o) {
          case RegExp:
            o = new o(
              t.source,
              'g'.substr(0, Number(t.global)) +
                'i'.substr(0, Number(t.ignoreCase)) +
                'm'.substr(0, Number(t.multiline)),
            );
            break;
          case Date:
            o = new o(t.getTime());
            break;
          case Function:
            o = t;
            break;
          default:
            o = new o();
        }
        var i = 0;
        for (n = (e = e || []).length; i < n; i++) {
          var r = e[i];
          if (r[0] === t) {
            var s = r[1];
            break;
          }
        }
        if (s) return s;
        for (a in (e.push([t, o]), t)) t.hasOwnProperty(a) && (o[a] = t[a] === t ? o : c.cloneObject(t[a], e));
        return o;
      },
      addCallback: function (t, e, n) {
        var a = c.addCallback;
        ((a.q = a.q || []),
          t.readyState
            ? (a.q.push(n),
              (t.onreadystatechange = function () {
                if (/loaded|complete/.test(t.readyState) && e())
                  for (t.onreadystatechange = null; a.q.length; ) {
                    a.q.shift()();
                  }
              }))
            : c.addHandler(t, 'load', function () {
                e() && n();
              }));
      },
      tracker: function () {
        var e = Array.prototype.slice.call(arguments),
          n = e.shift();
        n && ('function' == typeof n ? n() : c.send[n] && c.send[n].apply(t, e));
      },
      processQueue: function () {
        var e = t[n].q,
          o = c.tracker;
        for (o.config = a; e && e.length; ) o.apply(t, e.shift());
        t[n] = o;
      },
      pageSetup: function () {
        var e = c.scriptElement('app-measurement'),
          n = t.__adobe_analytics_app_measurement,
          o = function () {
            return t.s3 && t.s3.w_trackPage;
          };
        (/^(?:info|explore|wib|help|ww2|appointments)\.westpac\.com\.au$/i.test(location.hostname) && (a.prod = !0),
          /^(?:www|www\.ui|gel)\.(westpacgroup)\.com\.au$/i.test(location.hostname) && (a.prod = !0),
          this.onReady(function () {
            ((e.src = n),
              c.addCallback(e, o, function () {
                c.processQueue();
              }));
          }));
      },
      send: {
        exit: function (t) {
          s3.w_trackInteractionEvents('exit', t);
        },
        link: function (t) {
          s3.w_trackInteractionEvents('link', t);
        },
        button: function (t) {
          s3.w_trackInteractionEvents('button', t);
        },
        download: function (t) {
          s3.w_trackInteractionEvents('download', t);
        },
        call: function (t) {
          s3.w_trackInteractionEvents('call', t);
        },
        livechat: function (t) {
          s3.w_trackLiveChat(!0, t);
        },
        chat: function (t) {
          s3.w_trackChat(!0, t);
        },
        targetImpression: function (t) {
          s3.w_trackTargetImpression(t);
        },
        targetActionDismiss: function (t) {
          s3.w_trackTargetDismissExpand('dismiss', t);
        },
        targetActionExpand: function (t) {
          s3.w_trackTargetDismissExpand('expanded', t);
        },
        targetAction: function (t) {
          s3.w_trackTargetDismissExpand('other', t);
        },
        targetClicked: function (t) {
          var e = 0 | t.targetClickedLocationId,
            n = 0 | t.targetAction;
          (s3.c_wr('s_ttid', 0 | t.targetCampaignClicked),
            s3.c_wr('s_tloc', e),
            s3.c_wr('s_tAction', n),
            delete t.targetCampaignClicked,
            delete t.targetClickedLocationId,
            delete t.targetAction);
        },
        impression: function (t) {
          s3.trackImpression(t);
        },
        media: function (t) {
          s3.w_trackMedia(t.media);
        },
        page: function (t) {
          ((t = c.cloneObject(t || {})).siteVersion || (t.siteVersion = 'analytics_gel_wbg.js:1.1.6:20240825'),
            s3.w_trackPage(t));
        },
      },
    };
    n && c.pageSetup();
  })(window, document));
