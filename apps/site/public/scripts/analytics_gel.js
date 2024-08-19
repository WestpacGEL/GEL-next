// prod = use production suite for domains in following sections
// brand = brand for pageName. e.g. 'wbc'. Subdomains of westpac.com.au are always 'wbc' brand
// site = site for pageName. e.g. 'www'. Subdomains of westpac.com.au are used automatically as site name

//setup object without code in page head
(function (win, doc, scr, loc, objName, collectLoadStartTime) {
  var element, scripts;
  win['WBGAnalyticsObject'] = objName; // Reference object named with string to avoid property renaming in advanced obfuscation. Do not change this name.
  win[objName] =
    win[objName] ||
    function () {
      (win[objName].q = win[objName].q || []).push(arguments);
    };
  win[objName].config = {};

  // if this script is in head (high in HTML) capture time as start of page load time (for safari and old IE without native timing support)
  //win[objName].config.ls = collectLoadStartTime ? (+new Date()) : 0; // ls = load start time
})(window, document, 'script', '', 'wa', 0);

(function (win, doc) {
  var trackingObjectName = win['WBGAnalyticsObject'], // Do not change this name.
    pageConfig = win[trackingObjectName].config,
    testTracking = win.testTracking || {}, // test page objects
    //util = win.util ||{}, //use helper not util
    helpers;

  // defaults for s_code. customisations below.
  pageConfig.prod = 0;
  pageConfig.brand = 0;
  pageConfig.site = 0;

  helpers = {
    location: testTracking.location || win.location,
    addHandler: function (element, event, handler) {
      if (element.addEventListener) {
        element.addEventListener(event, handler, false);
      } else {
        if (element.attachEvent) {
          element.attachEvent('on' + event, handler);
        }
      }
    },
    // use onReady to attach at window.load (or later) if required to reduce impact on load time (delay load script), or to track navigation timing data
    onReady: function (func) {
      if (/complete/.test(doc.readyState)) {
        // fire/attach immediately in case window load has already occured
        func();
      } else {
        helpers.addHandler(win, 'load', function () {
          // fire/attach when window loads. include a timeout to prevent Chrome/Safari spinner immediately after load
          setTimeout(func, 4); // should be 4
        });
      }
    },
    scriptElement: function (id) {
      var existing = doc.getElementById(id),
        scripts = doc.getElementsByTagName('script')[0],
        //sibling = scripts[scripts.length - 1],
        element;

      if (existing) {
        return existing;
      }

      element = doc.createElement('script');
      element.id = id;
      //element.type = 'text/javascript';
      element.async = 1;
      //element.defer = true;

      //sibling.parentNode.insertBefore(element, sibling.nextSibling);
      scripts.parentNode.insertBefore(element, scripts);

      return element;
    },
    cookieRead: function (sKey) {
      return (
        decodeURIComponent(
          doc.cookie.replace(
            new RegExp(
              '(?:(?:^|.*;)\\s*' +
                encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
                '\\s*\\=\\s*([^;]*).*$)|^.*$',
            ),
            '$1',
          ),
        ) || ''
      );
    },
    cookieWrite: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }
      var sExpires = '';
      if (vEnd && vEnd.constructor === Date) {
        sExpires = '; expires=' + vEnd.toUTCString();
      }
      doc.cookie =
        encodeURIComponent(sKey) +
        '=' +
        encodeURIComponent(sValue) +
        sExpires +
        (sDomain ? '; domain=' + sDomain : '') +
        (sPath ? '; path=' + sPath : '') +
        (bSecure ? '; secure' : '');
      return true;
    },
    cloneObject: function (oToBeCloned, clones) {
      var oClone,
        Constr = oToBeCloned && oToBeCloned.constructor ? oToBeCloned.constructor : undefined,
        lp,
        len,
        cloneRef,
        alreadyCloned,
        prpty;

      if (
        !oToBeCloned ||
        (Constr !== RegExp && Constr !== Date && Constr !== Function && Constr !== Object && Constr !== Array)
      ) {
        return oToBeCloned;
      }

      switch (Constr) {
        // handle special object types
        case RegExp:
          oClone = new Constr(
            oToBeCloned.source,
            'g'.substr(0, Number(oToBeCloned.global)) +
              'i'.substr(0, Number(oToBeCloned.ignoreCase)) +
              'm'.substr(0, Number(oToBeCloned.multiline)),
          );
          break;
        case Date:
          oClone = new Constr(oToBeCloned.getTime());
          break;
        case Function:
          oClone = oToBeCloned;
          break;
        default:
          // should only be plain objects and arrays that need looping
          oClone = new Constr();
      }

      clones = clones || [];
      for (lp = 0, len = clones.length; lp < len; lp++) {
        cloneRef = clones[lp];
        if (cloneRef[0] === oToBeCloned) {
          alreadyCloned = cloneRef[1];
          break;
        }
      }
      if (alreadyCloned) {
        return alreadyCloned;
      }
      clones.push([oToBeCloned, oClone]); // keep track of objects we've cloned
      for (prpty in oToBeCloned) {
        if (oToBeCloned.hasOwnProperty(prpty)) {
          if (oToBeCloned[prpty] === oToBeCloned) {
            oClone[prpty] = oClone;
          } else {
            oClone[prpty] = helpers.cloneObject(oToBeCloned[prpty], clones);
          }
        }
      }
      return oClone;
    },
    addCallback: function (scriptEl, readyCheck, callback) {
      var thisFunction = helpers.addCallback;
      thisFunction.q = thisFunction.q || [];

      if (scriptEl.readyState) {
        thisFunction.q.push(callback); // ability to add multiple callbacks in IE

        scriptEl.onreadystatechange = function () {
          var callbackItem;

          //console.log('readyState = ' + scriptEl.readyState);
          //console.log('s = ' + win.s);
          //console.log('readyCheck IE = ' + readyCheck());

          if (/loaded|complete/.test(scriptEl.readyState) && readyCheck()) {
            // readyCheck to verify that all scripts required are actually ready (mainly to confirm IE readystate)
            scriptEl.onreadystatechange = null;
            while (thisFunction.q.length) {
              callbackItem = thisFunction.q.shift();
              callbackItem();
            }
          }
        };
      } else {
        //console.log('readyCheck non-IE = ' + readyCheck());
        helpers.addHandler(scriptEl, 'load', function () {
          if (readyCheck()) {
            // in case the file loaded is not actually s_code
            callback();
          }
        });
      }
    },
    tracker: function () {
      var args = Array.prototype.slice.call(arguments),
        method = args.shift();
      if (method) {
        if (typeof method === 'function') {
          method();
        } else {
          // can do something special based on method name here if required
          if (helpers.send[method]) {
            helpers.send[method].apply(win, args);
          }
        }
      }
    },
    processQueue: function () {
      var queue = win[trackingObjectName].q,
        realTrackingFunction = helpers.tracker;
      realTrackingFunction.config = pageConfig;
      while (queue && queue.length) {
        realTrackingFunction.apply(win, queue.shift());
      }
      win[trackingObjectName] = realTrackingFunction;
    },
    pageSetup: function () {
      // config for initial page defaults/s_code load only
      //alert('running analytics.js pageSetup');
      var staticResource = '';
      staticResource =
        (window.org && window.org.bt && window.org.bt.location.base ? window.org.bt.location.base : '') +
        (window.org && window.org.bt && window.org.bt.location ? window.org.bt.location.version : '');

      var omnitureScriptElement = helpers.scriptElement('app-measurement'), //util.scriptElement('app-measurement'), //use helper not util
        omnitureScriptSource = testTracking.location
          ? '/analytics-web/published/wbg/appmeasurement_combined.js'
          : staticResource + window.__adobe_anayltics_appmeasurement,
        omnitureScriptReady = function () {
          return win.s3 && win.s3.w_trackPage;
        };
      // to switch on live host only
      if (/gel\.westpacgroup\.com\.au$/i.test(location.hostname)) {
        pageConfig.prod = true;
      }

      if (/gel\.westpacgroup\.com\.au$/i.test(helpers.location.hostname)) {
        pageConfig.brand = 'wbc';
        pageConfig.site = 'gel';
      }
      // add files to attach to page (based on conditions if required)
      //util.onReady(function () { //use helper not util
      helpers.onReady(function () {
        // i.e. wait until window load to attach script. avoid gomez measurement + browser loading spinner.
        pageConfig.lc = +new Date(); // lc = load complete time for browsers without native support

        // load any script required and check if required functions are ready
        omnitureScriptElement.src = omnitureScriptSource;

        // can add the process callback straight away
        helpers.addCallback(omnitureScriptElement, omnitureScriptReady, function () {
          helpers.processQueue();
        });
      });
    },
    send: {
      livechat: function (details) {
        s3.w_trackLiveChat(true, details);
      },
      impression: function (impressions) {
        s3.trackImpression(impressions);
      },
      page: function (details) {
        var pageDetails = helpers.cloneObject(details || {}); // copy object passed to leave original as-is
        // set this file date for version monitoring across all sites using this file
        if (!pageDetails.siteVersion) {
          pageDetails.siteVersion = 'analytics_gel.js:20240816'; // TODO: ------ Code release date to be updated with changes
        }

        s3.w_trackPage(pageDetails);
      },
    },
  };

  if (trackingObjectName) {
    helpers.pageSetup();
  }
})(window, document);
