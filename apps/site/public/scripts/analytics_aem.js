(function (d, l, m, h, k, e) {
  d.WBGAnalyticsObject = k;
  d[k] =
    d[k] ||
    function () {
      (d[k].q = d[k].q || []).push(arguments);
    };
  d[k].config = {};
})(window, document, 'script', '', 'wa', 0);
(function (d, l) {
  var m = d.WBGAnalyticsObject,
    h = d[m].config,
    k = d.testTracking || {};
  h.prod = 0;
  h.brand = 0;
  h.site = 0;
  h.findBrand = !0;
  h.findSite = !0;
  var e = {
    location: k.location || d.location,
    addHandler: function (a, b, c) {
      a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent('on' + b, c);
    },
    onReady: function (a) {
      /complete/.test(l.readyState)
        ? a()
        : e.addHandler(d, 'load', function () {
            setTimeout(a, 4);
          });
    },
    scriptElement: function (a) {
      var b = l.getElementById(a),
        c = l.getElementsByTagName('script')[0];
      if (b) return b;
      b = l.createElement('script');
      b.id = a;
      b.async = 1;
      c.parentNode.insertBefore(b, c);
      return b;
    },
    cookieRead: function (a) {
      return (
        decodeURIComponent(
          l.cookie.replace(
            new RegExp(
              '(?:(?:^|.*;)\\s*' + encodeURIComponent(a).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$',
            ),
            '$1',
          ),
        ) || ''
      );
    },
    cookieWrite: function (a, b, c, f, g, n) {
      if (!a || /^(?:expires|max-age|path|domain|secure)$/i.test(a)) return !1;
      var p = '';
      c && c.constructor === Date && (p = '; expires=' + c.toUTCString());
      l.cookie =
        encodeURIComponent(a) +
        '=' +
        encodeURIComponent(b) +
        p +
        (g ? '; domain=' + g : '') +
        (f ? '; path=' + f : '') +
        (n ? '; secure' : '');
      return !0;
    },
    cloneObject: function (a, b) {
      var c = a && a.constructor ? a.constructor : void 0;
      var f, g;
      if (!a || (c !== RegExp && c !== Date && c !== Function && c !== Object && c !== Array)) return a;
      switch (c) {
        case RegExp:
          c = new c(
            a.source,
            'g'.substr(0, Number(a.global)) + 'i'.substr(0, Number(a.ignoreCase)) + 'm'.substr(0, Number(a.multiline)),
          );
          break;
        case Date:
          c = new c(a.getTime());
          break;
        case Function:
          c = a;
          break;
        default:
          c = new c();
      }
      b = b || [];
      var n = 0;
      for (f = b.length; n < f; n++) {
        var p = b[n];
        if (p[0] === a) {
          var q = p[1];
          break;
        }
      }
      if (q) return q;
      b.push([a, c]);
      for (g in a) a.hasOwnProperty(g) && (c[g] = a[g] === a ? c : e.cloneObject(a[g], b));
      return c;
    },
    addCallback: function (a, b, c) {
      var f = e.addCallback;
      f.q = f.q || [];
      a.readyState
        ? (f.q.push(c),
          (a.onreadystatechange = function () {
            if (/loaded|complete/.test(a.readyState) && b())
              for (a.onreadystatechange = null; f.q.length; ) {
                var g = f.q.shift();
                g();
              }
          }))
        : e.addHandler(a, 'load', function () {
            b() && c();
          });
    },
    tracker: function () {
      var a = Array.prototype.slice.call(arguments),
        b = a.shift();
      b && ('function' === typeof b ? b() : e.send[b] && e.send[b].apply(d, a));
    },
    processQueue: function () {
      var a = d[m].q,
        b = e.tracker;
      for (b.config = h; a && a.length; ) b.apply(d, a.shift());
      d[m] = b;
    },
    pageSetup: function () {
      var a = e.scriptElement('app-measurement'),
        b = d.__adobe_analytics_app_measurement,
        c = function () {
          return d.s3 && d.s3.w_trackPage;
        };
      /^(?:info|explore|wib|help|ww2|appointments)\.westpac\.com\.au$/i.test(location.hostname) && (h.prod = !0);
      /^(?:www|www\.ui|gel)\.(westpacgroup)\.com\.au$/i.test(
        location.hostname,
      ) && (h.prod = !0);
      this.onReady(function () {
        a.src = b;
        e.addCallback(a, c, function () {
          e.processQueue();
        });
      });
    },
    send: {
      exit: function (a) {
        s3.w_trackInteractionEvents('exit', a);
      },
      link: function (a) {
        s3.w_trackInteractionEvents('link', a);
      },
      button: function (a) {
        s3.w_trackInteractionEvents('button', a);
      },
      download: function (a) {
        s3.w_trackInteractionEvents('download', a);
      },
      call: function (a) {
        s3.w_trackInteractionEvents('call', a);
      },
      livechat: function (a) {
        s3.w_trackLiveChat(!0, a);
      },
      chat: function (a) {
        s3.w_trackChat(!0, a);
      },
      targetImpression: function (a) {
        s3.w_trackTargetImpression(a);
      },
      targetActionDismiss: function (a) {
        s3.w_trackTargetDismissExpand('dismiss', a);
      },
      targetActionExpand: function (a) {
        s3.w_trackTargetDismissExpand('expanded', a);
      },
      targetAction: function (a) {
        s3.w_trackTargetDismissExpand('other', a);
      },
      targetClicked: function (a) {
        var b = a.targetClickedLocationId | 0,
          c = a.targetAction | 0;
        s3.c_wr('s_ttid', a.targetCampaignClicked | 0);
        s3.c_wr('s_tloc', b);
        s3.c_wr('s_tAction', c);
        delete a.targetCampaignClicked;
        delete a.targetClickedLocationId;
        delete a.targetAction;
      },
      impression: function (a) {
        s3.trackImpression(a);
      },
      media: function (a) {
        s3.w_trackMedia(a.media);
      },
      page: function (a) {
        a = e.cloneObject(a || {});
        a.siteVersion || (a.siteVersion = 'analytics_gel_wbg.js:1.1.6:20240825');
        s3.w_trackPage(a);
      },
    },
  };
  m && e.pageSetup();
})(window, document);
