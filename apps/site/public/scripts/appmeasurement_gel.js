/**
 * @license
 * Adobe Visitor API for JavaScript version: 4.4.0
 * Copyright 2019 Adobe, Inc. All Rights Reserved
 * More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
 */
//if ("undefined" === typeof Visitor || "function" != typeof Visitor.getInstance) {
    var e=function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(){return{callbacks:{},add:function(e,t){this.callbacks[e]=this.callbacks[e]||[];var n=this.callbacks[e].push(t)-1,i=this;return function(){i.callbacks[e].splice(n,1)}},execute:function(e,t){if(this.callbacks[e]){t=void 0===t?[]:t,t=t instanceof Array?t:[t];try{for(;this.callbacks[e].length;){var n=this.callbacks[e].shift();"function"==typeof n?n.apply(null,t):n instanceof Array&&n[1].apply(n[0],t)}delete this.callbacks[e]}catch(e){}}},executeAll:function(e,t){(t||e&&!j.isObjectEmpty(e))&&Object.keys(this.callbacks).forEach(function(t){var n=void 0!==e[t]?e[t]:"";this.execute(t,n)},this)},hasCallbacks:function(){return Boolean(Object.keys(this.callbacks).length)}}}function i(e,t,n){var i=null==e?void 0:e[t];return void 0===i?n:i}function r(e){for(var t=/^\d+$/,n=0,i=e.length;n<i;n++)if(!t.test(e[n]))return!1;return!0}function a(e,t){for(;e.length<t.length;)e.push("0");for(;t.length<e.length;)t.push("0")}function o(e,t){for(var n=0;n<e.length;n++){var i=parseInt(e[n],10),r=parseInt(t[n],10);if(i>r)return 1;if(r>i)return-1}return 0}function s(e,t){if(e===t)return 0;var n=e.toString().split("."),i=t.toString().split(".");return r(n.concat(i))?(a(n,i),o(n,i)):NaN}function l(e){return e===Object(e)&&0===Object.keys(e).length}function c(e){return"function"==typeof e||e instanceof Array&&e.length}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){return!0};this.log=_e("log",e,t),this.warn=_e("warn",e,t),this.error=_e("error",e,t)}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.isEnabled,n=e.cookieName,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=i.cookies;return t&&n&&r?{remove:function(){r.remove(n)},get:function(){var e=r.get(n),t={};try{t=JSON.parse(e)}catch(e){t={}}return t},set:function(e,t){t=t||{},r.set(n,JSON.stringify(e),{domain:t.optInCookieDomain||"",cookieLifetime:t.optInStorageExpiry||3419e4,expires:!0})}}:{get:Le,set:Le,remove:Le}}function f(e){this.name=this.constructor.name,this.message=e,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error(e).stack}function p(){function e(e,t){var n=Se(e);return n.length?n.every(function(e){return!!t[e]}):De(t)}function t(){M(b),O(ce.COMPLETE),_(h.status,h.permissions),m.set(h.permissions,{optInCookieDomain:l,optInStorageExpiry:c}),C.execute(xe)}function n(e){return function(n,i){if(!Ae(n))throw new Error("[OptIn] Invalid category(-ies). Please use the `OptIn.Categories` enum.");return O(ce.CHANGED),Object.assign(b,ye(Se(n),e)),i||t(),h}}var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=i.doesOptInApply,a=i.previousPermissions,o=i.preOptInApprovals,s=i.isOptInStorageEnabled,l=i.optInCookieDomain,c=i.optInStorageExpiry,u=i.isIabContext,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},p=f.cookies,g=Pe(a);Re(g,"Invalid `previousPermissions`!"),Re(o,"Invalid `preOptInApprovals`!");var m=d({isEnabled:!!s,cookieName:"adobeujs-optin"},{cookies:p}),h=this,_=le(h),C=ge(),I=Me(g),v=Me(o),S=m.get(),D={},A=function(e,t){return ke(e)||t&&ke(t)?ce.COMPLETE:ce.PENDING}(I,S),y=function(e,t,n){var i=ye(pe,!r);return r?Object.assign({},i,e,t,n):i}(v,I,S),b=be(y),O=function(e){return A=e},M=function(e){return y=e};h.deny=n(!1),h.approve=n(!0),h.denyAll=h.deny.bind(h,pe),h.approveAll=h.approve.bind(h,pe),h.isApproved=function(t){return e(t,h.permissions)},h.isPreApproved=function(t){return e(t,v)},h.fetchPermissions=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?h.on(ce.COMPLETE,e):Le;return!r||r&&h.isComplete||!!o?e(h.permissions):t||C.add(xe,function(){return e(h.permissions)}),n},h.complete=function(){h.status===ce.CHANGED&&t()},h.registerPlugin=function(e){if(!e||!e.name||"function"!=typeof e.onRegister)throw new Error(je);D[e.name]||(D[e.name]=e,e.onRegister.call(e,h))},h.execute=Ne(D),Object.defineProperties(h,{permissions:{get:function(){return y}},status:{get:function(){return A}},Categories:{get:function(){return ue}},doesOptInApply:{get:function(){return!!r}},isPending:{get:function(){return h.status===ce.PENDING}},isComplete:{get:function(){return h.status===ce.COMPLETE}},__plugins:{get:function(){return Object.keys(D)}},isIabContext:{get:function(){return u}}})}function g(e,t){function n(){r=null,e.call(e,new f("The call took longer than you wanted!"))}function i(){r&&(clearTimeout(r),e.apply(e,arguments))}if(void 0===t)return e;var r=setTimeout(n,t);return i}function m(){if(window.__cmp)return window.__cmp;var e=window;if(e===window.top)return void Ie.error("__cmp not found");for(var t;!t;){e=e.parent;try{e.frames.__cmpLocator&&(t=e)}catch(e){}if(e===window.top)break}if(!t)return void Ie.error("__cmp not found");var n={};return window.__cmp=function(e,i,r){var a=Math.random()+"",o={__cmpCall:{command:e,parameter:i,callId:a}};n[a]=r,t.postMessage(o,"*")},window.addEventListener("message",function(e){var t=e.data;if("string"==typeof t)try{t=JSON.parse(e.data)}catch(e){}if(t.__cmpReturn){var i=t.__cmpReturn;n[i.callId]&&(n[i.callId](i.returnValue,i.success),delete n[i.callId])}},!1),window.__cmp}function h(){var e=this;e.name="iabPlugin",e.version="0.0.1";var t=ge(),n={allConsentData:null},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n[e]=t};e.fetchConsentData=function(e){var t=e.callback,n=e.timeout,i=g(t,n);r({callback:i})},e.isApproved=function(e){var t=e.callback,i=e.category,a=e.timeout;if(n.allConsentData)return t(null,s(i,n.allConsentData.vendorConsents,n.allConsentData.purposeConsents));var o=g(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.vendorConsents,a=n.purposeConsents;t(e,s(i,r,a))},a);r({category:i,callback:o})},e.onRegister=function(t){var n=Object.keys(de),i=function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=i.purposeConsents,a=i.gdprApplies,o=i.vendorConsents;!e&&a&&o&&r&&(n.forEach(function(e){var n=s(e,o,r);t[n?"approve":"deny"](e,!0)}),t.complete())};e.fetchConsentData({callback:i})};var r=function(e){var r=e.callback;if(n.allConsentData)return r(null,n.allConsentData);t.add("FETCH_CONSENT_DATA",r);var s={};o(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.purposeConsents,o=e.gdprApplies,l=e.vendorConsents;(arguments.length>1?arguments[1]:void 0)&&(s={purposeConsents:r,gdprApplies:o,vendorConsents:l},i("allConsentData",s)),a(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(arguments.length>1?arguments[1]:void 0)&&(s.consentString=e.consentData,i("allConsentData",s)),t.execute("FETCH_CONSENT_DATA",[null,n.allConsentData])})})},a=function(e){var t=m();t&&t("getConsentData",null,e)},o=function(e){var t=Fe(de),n=m();n&&n("getVendorConsents",t,e)},s=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=!!t[de[e]];return i&&function(){return fe[e].every(function(e){return n[e]})}()}}var _="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};Object.assign=Object.assign||function(e){for(var t,n,i=1;i<arguments.length;++i){n=arguments[i];for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e};var C,I,v={HANDSHAKE:"HANDSHAKE",GETSTATE:"GETSTATE",PARENTSTATE:"PARENTSTATE"},S={MCMID:"MCMID",MCAID:"MCAID",MCAAMB:"MCAAMB",MCAAMLH:"MCAAMLH",MCOPTOUT:"MCOPTOUT",CUSTOMERIDS:"CUSTOMERIDS"},D={MCMID:"getMarketingCloudVisitorID",MCAID:"getAnalyticsVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"isOptedOut",ALLFIELDS:"getVisitorValues"},A={CUSTOMERIDS:"getCustomerIDs"},y={MCMID:"getMarketingCloudVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"isOptedOut",MCAID:"getAnalyticsVisitorID",CUSTOMERIDS:"getCustomerIDs",ALLFIELDS:"getVisitorValues"},b={MC:"MCMID",A:"MCAID",AAM:"MCAAMB"},O={MCMID:"MCMID",MCOPTOUT:"MCOPTOUT",MCAID:"MCAID",MCAAMLH:"MCAAMLH",MCAAMB:"MCAAMB"},M={UNKNOWN:0,AUTHENTICATED:1,LOGGED_OUT:2},k={GLOBAL:"global"},E={MESSAGES:v,STATE_KEYS_MAP:S,ASYNC_API_MAP:D,SYNC_API_MAP:A,ALL_APIS:y,FIELDGROUP_TO_FIELD:b,FIELDS:O,AUTH_STATE:M,OPT_OUT:k},T=E.STATE_KEYS_MAP,L=function(e){function t(){}function n(t,n){var i=this;return function(){var r=e(0,t),a={};return a[t]=r,i.setStateAndPublish(a),n(r),r}}this.getMarketingCloudVisitorID=function(e){e=e||t;var i=this.findField(T.MCMID,e),r=n.call(this,T.MCMID,e);return void 0!==i?i:r()},this.getVisitorValues=function(e){this.getMarketingCloudVisitorID(function(t){e({MCMID:t})})}},P=E.MESSAGES,R=E.ASYNC_API_MAP,w=E.SYNC_API_MAP,F=function(){function e(){}function t(e,t){var n=this;return function(){return n.callbackRegistry.add(e,t),n.messageParent(P.GETSTATE),""}}function n(n){this[R[n]]=function(i){i=i||e;var r=this.findField(n,i),a=t.call(this,n,i);return void 0!==r?r:a()}}function i(t){this[w[t]]=function(){return this.findField(t,e)||{}}}Object.keys(R).forEach(n,this),Object.keys(w).forEach(i,this)},N=E.ASYNC_API_MAP,x=function(){Object.keys(N).forEach(function(e){this[N[e]]=function(t){this.callbackRegistry.add(e,t)}},this)},j=function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(t,n){n.isObjectEmpty=function(e){return e===Object(e)&&0===Object.keys(e).length},n.isValueEmpty=function(e){return""===e||n.isObjectEmpty(e)},n.getIeVersion=function(){if(document.documentMode)return document.documentMode;for(var e=7;e>4;e--){var t=document.createElement("div");if(t.innerHTML="\x3c!--[if IE "+e+"]><span></span><![endif]--\x3e",t.getElementsByTagName("span").length)return t=null,e;t=null}return null},n.encodeAndBuildRequest=function(e,t){return e.map(encodeURIComponent).join(t)},n.isObject=function(t){return null!==t&&"object"===e(t)&&!1===Array.isArray(t)},n.defineGlobalNamespace=function(){return window.adobe=n.isObject(window.adobe)?window.adobe:{},window.adobe},n.pluck=function(e,t){return t.reduce(function(t,n){return e[n]&&(t[n]=e[n]),t},Object.create(null))},n.parseOptOut=function(e,t,n){t||(t=n,e.d_optout&&e.d_optout instanceof Array&&(t=e.d_optout.join(",")));var i=parseInt(e.d_ottl,10);return isNaN(i)&&(i=7200),{optOut:t,d_ottl:i}},n.normalizeBoolean=function(e){var t=e;return"true"===e?t=!0:"false"===e&&(t=!1),t}}),V=(j.isObjectEmpty,j.isValueEmpty,j.getIeVersion,j.encodeAndBuildRequest,j.isObject,j.defineGlobalNamespace,j.pluck,j.parseOptOut,j.normalizeBoolean,n),H=E.MESSAGES,U={0:"prefix",1:"orgID",2:"state"},B=function(e,t){this.parse=function(e){try{var t={};return e.data.split("|").forEach(function(e,n){if(void 0!==e){t[U[n]]=2!==n?e:JSON.parse(e)}}),t}catch(e){}},this.isInvalid=function(n){var i=this.parse(n);if(!i||Object.keys(i).length<2)return!0;var r=e!==i.orgID,a=!t||n.origin!==t,o=-1===Object.keys(H).indexOf(i.prefix);return r||a||o},this.send=function(n,i,r){var a=i+"|"+e;r&&r===Object(r)&&(a+="|"+JSON.stringify(r));try{n.postMessage(a,t)}catch(e){}}},G=E.MESSAGES,Y=function(e,t,n,i){function r(e){Object.assign(p,e)}function a(e){Object.assign(p.state,e),Object.assign(p.state.ALLFIELDS,e),p.callbackRegistry.executeAll(p.state)}function o(e){if(!h.isInvalid(e)){m=!1;var t=h.parse(e);p.setStateAndPublish(t.state)}}function s(e){!m&&g&&(m=!0,h.send(i,e))}function l(){r(new L(n._generateID)),p.getMarketingCloudVisitorID(),p.callbackRegistry.executeAll(p.state,!0),_.removeEventListener("message",c)}function c(e){if(!h.isInvalid(e)){var t=h.parse(e);m=!1,_.clearTimeout(p._handshakeTimeout),_.removeEventListener("message",c),r(new F(p)),_.addEventListener("message",o),p.setStateAndPublish(t.state),p.callbackRegistry.hasCallbacks()&&s(G.GETSTATE)}}function u(){g&&postMessage?(_.addEventListener("message",c),s(G.HANDSHAKE),p._handshakeTimeout=setTimeout(l,250)):l()}function d(){_.s_c_in||(_.s_c_il=[],_.s_c_in=0),p._c="Visitor",p._il=_.s_c_il,p._in=_.s_c_in,p._il[p._in]=p,_.s_c_in++}function f(){function e(e){0!==e.indexOf("_")&&"function"==typeof n[e]&&(p[e]=function(){})}Object.keys(n).forEach(e),p.getSupplementalDataID=n.getSupplementalDataID,p.isAllowed=function(){return!0}}var p=this,g=t.whitelistParentDomain;p.state={ALLFIELDS:{}},p.version=n.version,p.marketingCloudOrgID=e,p.cookieDomain=n.cookieDomain||"",p._instanceType="child";var m=!1,h=new B(e,g);p.callbackRegistry=V(),p.init=function(){d(),f(),r(new x(p)),u()},p.findField=function(e,t){if(void 0!==p.state[e])return t(p.state[e]),p.state[e]},p.messageParent=s,p.setStateAndPublish=a},q=E.MESSAGES,X=E.ALL_APIS,W=E.ASYNC_API_MAP,J=E.FIELDGROUP_TO_FIELD,K=function(e,t){function n(){var t={};return Object.keys(X).forEach(function(n){var i=X[n],r=e[i]();j.isValueEmpty(r)||(t[n]=r)}),t}function i(){var t=[];return e._loading&&Object.keys(e._loading).forEach(function(n){if(e._loading[n]){var i=J[n];t.push(i)}}),t.length?t:null}function r(t){return function n(r){var a=i();if(a){var o=W[a[0]];e[o](n,!0)}else t()}}function a(e,i){var r=n();t.send(e,i,r)}function o(e){l(e),a(e,q.HANDSHAKE)}function s(e){r(function(){a(e,q.PARENTSTATE)})()}function l(n){function i(i){r.call(e,i),t.send(n,q.PARENTSTATE,{CUSTOMERIDS:e.getCustomerIDs()})}var r=e.setCustomerIDs;e.setCustomerIDs=i}return function(e){if(!t.isInvalid(e)){(t.parse(e).prefix===q.HANDSHAKE?o:s)(e.source)}}},z=function(e,t){function n(e){return function(n){i[e]=n,r++,r===a&&t(i)}}var i={},r=0,a=Object.keys(e).length;Object.keys(e).forEach(function(t){var i=e[t];if(i.fn){var r=i.args||[];r.unshift(n(t)),i.fn.apply(i.context||null,r)}})},Q={get:function(e){e=encodeURIComponent(e);var t=(";"+document.cookie).split(" ").join(";"),n=t.indexOf(";"+e+"="),i=n<0?n:t.indexOf(";",n+1);return n<0?"":decodeURIComponent(t.substring(n+2+e.length,i<0?t.length:i))},set:function(e,t,n){var r=i(n,"cookieLifetime"),a=i(n,"expires"),o=i(n,"domain"),s=i(n,"secure"),l=s?"Secure":"";if(a&&"SESSION"!==r&&"NONE"!==r){var c=""!==t?parseInt(r||0,10):-60;if(c)a=new Date,a.setTime(a.getTime()+1e3*c);else if(1===a){a=new Date;var u=a.getYear();a.setYear(u+2+(u<1900?1900:0))}}else a=0;return e&&"NONE"!==r?(document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+"; path=/;"+(a?" expires="+a.toGMTString()+";":"")+(o?" domain="+o+";":"")+l,this.get(e)===t):0},remove:function(e,t){var n=i(t,"domain");n=n?" domain="+n+";":"",document.cookie=encodeURIComponent(e)+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"+n}},$=function(e){var t;!e&&_.location&&(e=_.location.hostname),t=e;var n,i=t.split(".");for(n=i.length-2;n>=0;n--)if(t=i.slice(n).join("."),Q.set("test","cookie",{domain:t}))return Q.remove("test",{domain:t}),t;return""},Z={compare:s,isLessThan:function(e,t){return s(e,t)<0},areVersionsDifferent:function(e,t){return 0!==s(e,t)},isGreaterThan:function(e,t){return s(e,t)>0},isEqual:function(e,t){return 0===s(e,t)}},ee=!!_.postMessage,te={postMessage:function(e,t,n){var i=1;t&&(ee?n.postMessage(e,t.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):t&&(n.location=t.replace(/#.*$/,"")+"#"+ +new Date+i+++"&"+e))},receiveMessage:function(e,t){var n;try{ee&&(e&&(n=function(n){if("string"==typeof t&&n.origin!==t||"[object Function]"===Object.prototype.toString.call(t)&&!1===t(n.origin))return!1;e(n)}),_.addEventListener?_[e?"addEventListener":"removeEventListener"]("message",n):_[e?"attachEvent":"detachEvent"]("onmessage",n))}catch(e){}}},ne=function(e){var t,n,i="0123456789",r="",a="",o=8,s=10,l=10;if(1==e){for(i+="ABCDEF",t=0;16>t;t++)n=Math.floor(Math.random()*o),r+=i.substring(n,n+1),n=Math.floor(Math.random()*o),a+=i.substring(n,n+1),o=16;return r+"-"+a}for(t=0;19>t;t++)n=Math.floor(Math.random()*s),r+=i.substring(n,n+1),0===t&&9==n?s=3:(1==t||2==t)&&10!=s&&2>n?s=10:2<t&&(s=10),n=Math.floor(Math.random()*l),a+=i.substring(n,n+1),0===t&&9==n?l=3:(1==t||2==t)&&10!=l&&2>n?l=10:2<t&&(l=10);return r+a},ie=function(e,t){return{corsMetadata:function(){var e="none",t=!0;return"undefined"!=typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?e="XMLHttpRequest":"undefined"!=typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(t=!1),Object.prototype.toString.call(_.HTMLElement).indexOf("Constructor")>0&&(t=!1)),{corsType:e,corsCookiesEnabled:t}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new _[this.corsMetadata.corsType]},fireCORS:function(t,n,i){function r(e){var n;try{if((n=JSON.parse(e))!==Object(n))return void a.handleCORSError(t,null,"Response is not JSON")}catch(e){return void a.handleCORSError(t,e,"Error parsing response as JSON")}try{for(var i=t.callback,r=_,o=0;o<i.length;o++)r=r[i[o]];r(n)}catch(e){a.handleCORSError(t,e,"Error forming callback function")}}var a=this;n&&(t.loadErrorHandler=n);try{var o=this.getCORSInstance();o.open("get",t.corsUrl+"&ts="+(new Date).getTime(),!0),"XMLHttpRequest"===this.corsMetadata.corsType&&(o.withCredentials=!0,o.timeout=e.loadTimeout,o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.onreadystatechange=function(){4===this.readyState&&200===this.status&&r(this.responseText)}),o.onerror=function(e){a.handleCORSError(t,e,"onerror")},o.ontimeout=function(e){a.handleCORSError(t,e,"ontimeout")},o.send(),e._log.requests.push(t.corsUrl)}catch(e){this.handleCORSError(t,e,"try-catch")}},handleCORSError:function(t,n,i){e.CORSErrors.push({corsData:t,error:n,description:i}),t.loadErrorHandler&&("ontimeout"===i?t.loadErrorHandler(!0):t.loadErrorHandler(!1))}}},re={POST_MESSAGE_ENABLED:!!_.postMessage,DAYS_BETWEEN_SYNC_ID_CALLS:1,MILLIS_PER_DAY:864e5,ADOBE_MC:"adobe_mc",ADOBE_MC_SDID:"adobe_mc_sdid",VALID_VISITOR_ID_REGEX:/^[0-9a-fA-F\-]+$/,ADOBE_MC_TTL_IN_MIN:5,VERSION_REGEX:/vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/,FIRST_PARTY_SERVER_COOKIE:"s_ecid"},ae=function(e,t){var n=_.document;return{THROTTLE_START:3e4,MAX_SYNCS_LENGTH:649,throttleTimerSet:!1,id:null,onPagePixels:[],iframeHost:null,getIframeHost:function(e){if("string"==typeof e){var t=e.split("/");return t[0]+"//"+t[2]}},subdomain:null,url:null,getUrl:function(){var t,i="http://fast.",r="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(n.location.origin);return this.subdomain||(this.subdomain="nosubdomainreturned"),e.loadSSL&&(i=e.idSyncSSLUseAkamai?"https://fast.":"https://"),t=i+this.subdomain+".demdex.net/dest5.html"+r,this.iframeHost=this.getIframeHost(t),this.id="destination_publishing_iframe_"+this.subdomain+"_"+e.idSyncContainerID,t},checkDPIframeSrc:function(){var t="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(n.location.href);"string"==typeof e.dpIframeSrc&&e.dpIframeSrc.length&&(this.id="destination_publishing_iframe_"+(e._subdomain||this.subdomain||(new Date).getTime())+"_"+e.idSyncContainerID,this.iframeHost=this.getIframeHost(e.dpIframeSrc),this.url=e.dpIframeSrc+t)},idCallNotProcesssed:null,doAttachIframe:!1,startedAttachingIframe:!1,iframeHasLoaded:null,iframeIdChanged:null,newIframeCreated:null,originalIframeHasLoadedAlready:null,iframeLoadedCallbacks:[],regionChanged:!1,timesRegionChanged:0,sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],messageSendingInterval:re.POST_MESSAGE_ENABLED?null:100,onPageDestinationsFired:[],jsonForComparison:[],jsonDuplicates:[],jsonWaiting:[],jsonProcessed:[],canSetThirdPartyCookies:!0,receivedThirdPartyCookiesNotification:!1,readyToAttachIframePreliminary:function(){return!(e.idSyncDisableSyncs||e.disableIdSyncs||e.idSyncDisable3rdPartySyncing||e.disableThirdPartyCookies||e.disableThirdPartyCalls)},readyToAttachIframe:function(){return this.readyToAttachIframePreliminary()&&(this.doAttachIframe||e._doAttachIframe)&&(this.subdomain&&"nosubdomainreturned"!==this.subdomain||e._subdomain)&&this.url&&!this.startedAttachingIframe},attachIframe:function(){function e(){r=n.createElement("iframe"),r.sandbox="allow-scripts allow-same-origin",r.title="Adobe ID Syncing iFrame",r.id=i.id,r.name=i.id+"_name",r.style.cssText="display: none; width: 0; height: 0;",r.src=i.url,i.newIframeCreated=!0,t(),n.body.appendChild(r)}function t(e){r.addEventListener("load",function(){r.className="aamIframeLoaded",i.iframeHasLoaded=!0,i.fireIframeLoadedCallbacks(e),i.requestToProcess()})}this.startedAttachingIframe=!0;var i=this,r=n.getElementById(this.id);r?"IFRAME"!==r.nodeName?(this.id+="_2",this.iframeIdChanged=!0,e()):(this.newIframeCreated=!1,"aamIframeLoaded"!==r.className?(this.originalIframeHasLoadedAlready=!1,t("The destination publishing iframe already exists from a different library, but hadn't loaded yet.")):(this.originalIframeHasLoadedAlready=!0,this.iframeHasLoaded=!0,this.iframe=r,this.fireIframeLoadedCallbacks("The destination publishing iframe already exists from a different library, and had loaded alresady."),this.requestToProcess())):e(),this.iframe=r},fireIframeLoadedCallbacks:function(e){this.iframeLoadedCallbacks.forEach(function(t){"function"==typeof t&&t({message:e||"The destination publishing iframe was attached and loaded successfully."})}),this.iframeLoadedCallbacks=[]},requestToProcess:function(t){function n(){r.jsonForComparison.push(t),r.jsonWaiting.push(t),r.processSyncOnPage(t)}var i,r=this;if(t===Object(t)&&t.ibs)if(i=JSON.stringify(t.ibs||[]),this.jsonForComparison.length){var a,o,s,l=!1;for(a=0,o=this.jsonForComparison.length;a<o;a++)if(s=this.jsonForComparison[a],i===JSON.stringify(s.ibs||[])){l=!0;break}l?this.jsonDuplicates.push(t):n()}else n();if((this.receivedThirdPartyCookiesNotification||!re.POST_MESSAGE_ENABLED||this.iframeHasLoaded)&&this.jsonWaiting.length){var c=this.jsonWaiting.shift();this.process(c),this.requestToProcess()}e.idSyncDisableSyncs||e.disableIdSyncs||!this.iframeHasLoaded||!this.messages.length||this.sendingMessages||(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){r.messageSendingInterval=re.POST_MESSAGE_ENABLED?null:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},getRegionAndCheckIfChanged:function(t,n){var i=e._getField("MCAAMLH"),r=t.d_region||t.dcs_region;return i?r&&(e._setFieldExpire("MCAAMLH",n),e._setField("MCAAMLH",r),parseInt(i,10)!==r&&(this.regionChanged=!0,this.timesRegionChanged++,e._setField("MCSYNCSOP",""),e._setField("MCSYNCS",""),i=r)):(i=r)&&(e._setFieldExpire("MCAAMLH",n),e._setField("MCAAMLH",i)),i||(i=""),i},processSyncOnPage:function(e){var t,n,i,r;if((t=e.ibs)&&t instanceof Array&&(n=t.length))for(i=0;i<n;i++)r=t[i],r.syncOnPage&&this.checkFirstPartyCookie(r,"","syncOnPage")},process:function(e){var t,n,i,r,a,o=encodeURIComponent,s=!1;if((t=e.ibs)&&t instanceof Array&&(n=t.length))for(s=!0,i=0;i<n;i++)r=t[i],a=[o("ibs"),o(r.id||""),o(r.tag||""),j.encodeAndBuildRequest(r.url||[],","),o(r.ttl||""),"","",r.fireURLSync?"true":"false"],r.syncOnPage||(this.canSetThirdPartyCookies?this.addMessage(a.join("|")):r.fireURLSync&&this.checkFirstPartyCookie(r,a.join("|")));s&&this.jsonProcessed.push(e)},checkFirstPartyCookie:function(t,n,i){var r="syncOnPage"===i,a=r?"MCSYNCSOP":"MCSYNCS";e._readVisitor();var o,s,l=e._getField(a),c=!1,u=!1,d=Math.ceil((new Date).getTime()/re.MILLIS_PER_DAY);l?(o=l.split("*"),s=this.pruneSyncData(o,t.id,d),c=s.dataPresent,u=s.dataValid,c&&u||this.fireSync(r,t,n,o,a,d)):(o=[],this.fireSync(r,t,n,o,a,d))},pruneSyncData:function(e,t,n){var i,r,a,o=!1,s=!1;for(r=0;r<e.length;r++)i=e[r],a=parseInt(i.split("-")[1],10),i.match("^"+t+"-")?(o=!0,n<a?s=!0:(e.splice(r,1),r--)):n>=a&&(e.splice(r,1),r--);return{dataPresent:o,dataValid:s}},manageSyncsSize:function(e){if(e.join("*").length>this.MAX_SYNCS_LENGTH)for(e.sort(function(e,t){return parseInt(e.split("-")[1],10)-parseInt(t.split("-")[1],10)});e.join("*").length>this.MAX_SYNCS_LENGTH;)e.shift()},fireSync:function(t,n,i,r,a,o){var s=this;if(t){if("img"===n.tag){var l,c,u,d,f=n.url,p=e.loadSSL?"https:":"http:";for(l=0,c=f.length;l<c;l++){u=f[l],d=/^\/\//.test(u);var g=new Image;g.addEventListener("load",function(t,n,i,r){return function(){s.onPagePixels[t]=null,e._readVisitor();var o,l=e._getField(a),c=[];if(l){o=l.split("*");var u,d,f;for(u=0,d=o.length;u<d;u++)f=o[u],f.match("^"+n.id+"-")||c.push(f)}s.setSyncTrackingData(c,n,i,r)}}(this.onPagePixels.length,n,a,o)),g.src=(d?p:"")+u,this.onPagePixels.push(g)}}}else this.addMessage(i),this.setSyncTrackingData(r,n,a,o)},addMessage:function(t){var n=encodeURIComponent,i=n(e._enableErrorReporting?"---destpub-debug---":"---destpub---");this.messages.push((re.POST_MESSAGE_ENABLED?"":i)+t)},setSyncTrackingData:function(t,n,i,r){t.push(n.id+"-"+(r+Math.ceil(n.ttl/60/24))),this.manageSyncsSize(t),e._setField(i,t.join("*"))},sendMessages:function(){var e,t=this,n="",i=encodeURIComponent;this.regionChanged&&(n=i("---destpub-clear-dextp---"),this.regionChanged=!1),this.messages.length?re.POST_MESSAGE_ENABLED?(e=n+i("---destpub-combined---")+this.messages.join("%01"),this.postMessage(e),this.messages=[],this.sendingMessages=!1):(e=this.messages.shift(),this.postMessage(n+e),setTimeout(function(){t.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1},postMessage:function(e){te.postMessage(e,this.url,this.iframe.contentWindow),this.messagesPosted.push(e)},receiveMessage:function(e){var t,n=/^---destpub-to-parent---/;"string"==typeof e&&n.test(e)&&(t=e.replace(n,"").split("|"),"canSetThirdPartyCookies"===t[0]&&(this.canSetThirdPartyCookies="true"===t[1],this.receivedThirdPartyCookiesNotification=!0,this.requestToProcess()),this.messagesReceived.push(e))},processIDCallData:function(i){(null==this.url||i.subdomain&&"nosubdomainreturned"===this.subdomain)&&("string"==typeof e._subdomain&&e._subdomain.length?this.subdomain=e._subdomain:this.subdomain=i.subdomain||"",this.url=this.getUrl()),i.ibs instanceof Array&&i.ibs.length&&(this.doAttachIframe=!0),this.readyToAttachIframe()&&(e.idSyncAttachIframeOnWindowLoad?(t.windowLoaded||"complete"===n.readyState||"loaded"===n.readyState)&&this.attachIframe():this.attachIframeASAP()),"function"==typeof e.idSyncIDCallResult?e.idSyncIDCallResult(i):this.requestToProcess(i),"function"==typeof e.idSyncAfterIDCallResult&&e.idSyncAfterIDCallResult(i)},canMakeSyncIDCall:function(t,n){return e._forceSyncIDCall||!t||n-t>re.DAYS_BETWEEN_SYNC_ID_CALLS},attachIframeASAP:function(){function e(){t.startedAttachingIframe||(n.body?t.attachIframe():setTimeout(e,30))}var t=this;e()}}},oe={audienceManagerServer:{},audienceManagerServerSecure:{},cookieDomain:{},cookieLifetime:{},cookieName:{},doesOptInApply:{},disableThirdPartyCalls:{},discardTrackingServerECID:{},idSyncAfterIDCallResult:{},idSyncAttachIframeOnWindowLoad:{},idSyncContainerID:{},idSyncDisable3rdPartySyncing:{},disableThirdPartyCookies:{},idSyncDisableSyncs:{},disableIdSyncs:{},idSyncIDCallResult:{},idSyncSSLUseAkamai:{},isCoopSafe:{},isIabContext:{},isOptInStorageEnabled:{},loadSSL:{},loadTimeout:{},marketingCloudServer:{},marketingCloudServerSecure:{},optInCookieDomain:{},optInStorageExpiry:{},overwriteCrossDomainMCIDAndAID:{},preOptInApprovals:{},previousPermissions:{},resetBeforeVersion:{},sdidParamExpiry:{},serverState:{},sessionCookieName:{},secureCookie:{},takeTimeoutMetrics:{},trackingServer:{},trackingServerSecure:{},whitelistIframeDomains:{},whitelistParentDomain:{}},se={getConfigNames:function(){return Object.keys(oe)},getConfigs:function(){return oe},normalizeConfig:function(e){return"function"!=typeof e?e:e()}},le=function(e){var t={};return e.on=function(e,n,i){if(!n||"function"!=typeof n)throw new Error("[ON] Callback should be a function.");t.hasOwnProperty(e)||(t[e]=[]);var r=t[e].push({callback:n,context:i})-1;return function(){t[e].splice(r,1),t[e].length||delete t[e]}},e.off=function(e,n){t.hasOwnProperty(e)&&(t[e]=t[e].filter(function(e){if(e.callback!==n)return e}))},e.publish=function(e){if(t.hasOwnProperty(e)){var n=[].slice.call(arguments,1);t[e].slice(0).forEach(function(e){e.callback.apply(e.context,n)})}},e.publish},ce={PENDING:"pending",CHANGED:"changed",COMPLETE:"complete"},ue={AAM:"aam",ADCLOUD:"adcloud",ANALYTICS:"aa",CAMPAIGN:"campaign",ECID:"ecid",LIVEFYRE:"livefyre",TARGET:"target",VIDEO_ANALYTICS:"videoaa"},de=(C={},t(C,ue.AAM,565),t(C,ue.ECID,565),C),fe=(I={},t(I,ue.AAM,[1,2,5]),t(I,ue.ECID,[1,2,5]),I),pe=function(e){return Object.keys(e).map(function(t){return e[t]})}(ue),ge=function(){var e={};return e.callbacks=Object.create(null),e.add=function(t,n){if(!c(n))throw new Error("[callbackRegistryFactory] Make sure callback is a function or an array of functions.");e.callbacks[t]=e.callbacks[t]||[];var i=e.callbacks[t].push(n)-1;return function(){e.callbacks[t].splice(i,1)}},e.execute=function(t,n){if(e.callbacks[t]){n=void 0===n?[]:n,n=n instanceof Array?n:[n];try{for(;e.callbacks[t].length;){var i=e.callbacks[t].shift();"function"==typeof i?i.apply(null,n):i instanceof Array&&i[1].apply(i[0],n)}delete e.callbacks[t]}catch(e){}}},e.executeAll=function(t,n){(n||t&&!l(t))&&Object.keys(e.callbacks).forEach(function(n){var i=void 0!==t[n]?t[n]:"";e.execute(n,i)},e)},e.hasCallbacks=function(){return Boolean(Object.keys(e.callbacks).length)},e},me=function(){},he=function(e){var t=window,n=t.console;return!!n&&"function"==typeof n[e]},_e=function(e,t,n){return n()?function(){if(he(e)){for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];console[e].apply(console,[t].concat(i))}}:me},Ce=u,Ie=new Ce("[ADOBE OPT-IN]"),ve=function(t,n){return e(t)===n},Se=function(e,t){return e instanceof Array?e:ve(e,"string")?[e]:t||[]},De=function(e){var t=Object.keys(e);return!!t.length&&t.every(function(t){return!0===e[t]})},Ae=function(e){return!(!e||Oe(e))&&Se(e).every(function(e){return pe.indexOf(e)>-1})},ye=function(e,t){return e.reduce(function(e,n){return e[n]=t,e},{})},be=function(e){return JSON.parse(JSON.stringify(e))},Oe=function(e){return"[object Array]"===Object.prototype.toString.call(e)&&!e.length},Me=function(e){if(Te(e))return e;try{return JSON.parse(e)}catch(e){return{}}},ke=function(e){return void 0===e||(Te(e)?Ae(Object.keys(e)):Ee(e))},Ee=function(e){try{var t=JSON.parse(e);return!!e&&ve(e,"string")&&Ae(Object.keys(t))}catch(e){return!1}},Te=function(e){return null!==e&&ve(e,"object")&&!1===Array.isArray(e)},Le=function(){},Pe=function(e){return ve(e,"function")?e():e},Re=function(e,t){ke(e)||Ie.error("".concat(t))},we=function(e){return Object.keys(e).map(function(t){return e[t]})},Fe=function(e){return we(e).filter(function(e,t,n){return n.indexOf(e)===t})},Ne=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.command,i=t.params,r=void 0===i?{}:i,a=t.callback,o=void 0===a?Le:a;if(!n||-1===n.indexOf("."))throw new Error("[OptIn.execute] Please provide a valid command.");try{var s=n.split("."),l=e[s[0]],c=s[1];if(!l||"function"!=typeof l[c])throw new Error("Make sure the plugin and API name exist.");var u=Object.assign(r,{callback:o});l[c].call(l,u)}catch(e){Ie.error("[execute] Something went wrong: "+e.message)}}};f.prototype=Object.create(Error.prototype),f.prototype.constructor=f;var xe="fetchPermissions",je="[OptIn#registerPlugin] Plugin is invalid.";p.Categories=ue,p.TimeoutError=f;var Ve=Object.freeze({OptIn:p,IabPlugin:h}),He=function(e,t){e.publishDestinations=function(n){var i=arguments[1],r=arguments[2];try{r="function"==typeof r?r:n.callback}catch(e){r=function(){}}var a=t;if(!a.readyToAttachIframePreliminary())return void r({error:"The destination publishing iframe is disabled in the Visitor library."});if("string"==typeof n){if(!n.length)return void r({error:"subdomain is not a populated string."});if(!(i instanceof Array&&i.length))return void r({error:"messages is not a populated array."});var o=!1;if(i.forEach(function(e){
        "string"==typeof e&&e.length&&(a.addMessage(e),o=!0)}),!o)return void r({error:"None of the messages are populated strings."})}else{if(!j.isObject(n))return void r({error:"Invalid parameters passed."});var s=n;if("string"!=typeof(n=s.subdomain)||!n.length)return void r({error:"config.subdomain is not a populated string."});var l=s.urlDestinations;if(!(l instanceof Array&&l.length))return void r({error:"config.urlDestinations is not a populated array."});var c=[];l.forEach(function(e){j.isObject(e)&&(e.hideReferrer?e.message&&a.addMessage(e.message):c.push(e))});!function e(){c.length&&setTimeout(function(){var t=new Image,n=c.shift();t.src=n.url,a.onPageDestinationsFired.push(n),e()},100)}()}a.iframe?(r({message:"The destination publishing iframe is already attached and loaded."}),a.requestToProcess()):!e.subdomain&&e._getField("MCMID")?(a.subdomain=n,a.doAttachIframe=!0,a.url=a.getUrl(),a.readyToAttachIframe()?(a.iframeLoadedCallbacks.push(function(e){r({message:"Attempted to attach and load the destination publishing iframe through this API call. Result: "+(e.message||"no result")})}),a.attachIframe()):r({error:"Encountered a problem in attempting to attach and load the destination publishing iframe through this API call."})):a.iframeLoadedCallbacks.push(function(e){r({message:"Attempted to attach and load the destination publishing iframe through normal Visitor API processing. Result: "+(e.message||"no result")})})}},Ue=function e(t){function n(e,t){return e>>>t|e<<32-t}for(var i,r,a=Math.pow,o=a(2,32),s="",l=[],c=8*t.length,u=e.h=e.h||[],d=e.k=e.k||[],f=d.length,p={},g=2;f<64;g++)if(!p[g]){for(i=0;i<313;i+=g)p[i]=g;u[f]=a(g,.5)*o|0,d[f++]=a(g,1/3)*o|0}for(t+="";t.length%64-56;)t+="\0";for(i=0;i<t.length;i++){if((r=t.charCodeAt(i))>>8)return;l[i>>2]|=r<<(3-i)%4*8}for(l[l.length]=c/o|0,l[l.length]=c,r=0;r<l.length;){var m=l.slice(r,r+=16),h=u;for(u=u.slice(0,8),i=0;i<64;i++){var _=m[i-15],C=m[i-2],I=u[0],v=u[4],S=u[7]+(n(v,6)^n(v,11)^n(v,25))+(v&u[5]^~v&u[6])+d[i]+(m[i]=i<16?m[i]:m[i-16]+(n(_,7)^n(_,18)^_>>>3)+m[i-7]+(n(C,17)^n(C,19)^C>>>10)|0);u=[S+((n(I,2)^n(I,13)^n(I,22))+(I&u[1]^I&u[2]^u[1]&u[2]))|0].concat(u),u[4]=u[4]+S|0}for(i=0;i<8;i++)u[i]=u[i]+h[i]|0}for(i=0;i<8;i++)for(r=3;r+1;r--){var D=u[i]>>8*r&255;s+=(D<16?0:"")+D.toString(16)}return s},Be=function(e,t){return"SHA-256"!==t&&"SHA256"!==t&&"sha256"!==t&&"sha-256"!==t||(e=Ue(e)),e},Ge=function(e){return String(e).trim().toLowerCase()},Ye=Ve.OptIn;j.defineGlobalNamespace(),window.adobe.OptInCategories=Ye.Categories;var qe=function(t,n,i){function r(e){var t=e;return function(e){var n=e||v.location.href;try{var i=g._extractParamFromUri(n,t);if(i)return w.parsePipeDelimetedKeyValues(i)}catch(e){}}}function a(e){function t(e,t,n){e&&e.match(re.VALID_VISITOR_ID_REGEX)&&(n===A&&(I=!0),t(e))}t(e[A],g.setMarketingCloudVisitorID,A),g._setFieldExpire(k,-1),t(e[O],g.setAnalyticsVisitorID)}function o(e){e=e||{},g._supplementalDataIDCurrent=e.supplementalDataIDCurrent||"",g._supplementalDataIDCurrentConsumed=e.supplementalDataIDCurrentConsumed||{},g._supplementalDataIDLast=e.supplementalDataIDLast||"",g._supplementalDataIDLastConsumed=e.supplementalDataIDLastConsumed||{}}function s(e){function t(e,t,n){return n=n?n+="|":n,n+=e+"="+encodeURIComponent(t)}function n(e,n){var i=n[0],r=n[1];return null!=r&&r!==T&&(e=t(i,r,e)),e}var i=e.reduce(n,"");return function(e){var t=w.getTimestampInSeconds();return e=e?e+="|":e,e+="TS="+t}(i)}function l(e){var t=e.minutesToLive,n="";return(g.idSyncDisableSyncs||g.disableIdSyncs)&&(n=n||"Error: id syncs have been disabled"),"string"==typeof e.dpid&&e.dpid.length||(n=n||"Error: config.dpid is empty"),"string"==typeof e.url&&e.url.length||(n=n||"Error: config.url is empty"),void 0===t?t=20160:(t=parseInt(t,10),(isNaN(t)||t<=0)&&(n=n||"Error: config.minutesToLive needs to be a positive number")),{error:n,ttl:t}}function c(){return!!g.configs.doesOptInApply&&!(m.optIn.isComplete&&u())}function u(){return g.configs.isIabContext?m.optIn.isApproved(m.optIn.Categories.ECID)&&C:m.optIn.isApproved(m.optIn.Categories.ECID)}function d(e,t){if(C=!0,e)throw new Error("[IAB plugin] : "+e);t.gdprApplies&&(h=t.consentString),g.init(),p()}function f(){m.optIn.isApproved(m.optIn.Categories.ECID)&&(g.configs.isIabContext?m.optIn.execute({command:"iabPlugin.fetchConsentData",callback:d}):(g.init(),p()))}function p(){m.optIn.off("complete",f)}if(!i||i.split("").reverse().join("")!==t)throw new Error("Please use `Visitor.getInstance` to instantiate Visitor.");var g=this,m=window.adobe,h="",C=!1,I=!1;g.version="4.4.0";var v=_,S=v.Visitor;S.version=g.version,S.AuthState=E.AUTH_STATE,S.OptOut=E.OPT_OUT,v.s_c_in||(v.s_c_il=[],v.s_c_in=0),g._c="Visitor",g._il=v.s_c_il,g._in=v.s_c_in,g._il[g._in]=g,v.s_c_in++,g._instanceType="regular",g._log={requests:[]},g.marketingCloudOrgID=t,g.cookieName="AMCV_"+t,g.sessionCookieName="AMCVS_"+t,g.cookieDomain=$(),g.loadSSL=v.location.protocol.toLowerCase().indexOf("https")>=0,g.loadTimeout=3e4,g.CORSErrors=[],g.marketingCloudServer=g.audienceManagerServer="dpm.demdex.net",g.sdidParamExpiry=30;var D=null,A="MCMID",y="MCIDTS",b="A",O="MCAID",M="AAM",k="MCAAMB",T="NONE",L=function(e){return!Object.prototype[e]},P=ie(g);g.FIELDS=E.FIELDS,g.cookieRead=function(e){return Q.get(e)},g.cookieWrite=function(e,t,n){var i=g.cookieLifetime?(""+g.cookieLifetime).toUpperCase():"",r=!1;return g.configs&&g.configs.secureCookie&&"https:"===location.protocol&&(r=!0),Q.set(e,""+t,{expires:n,domain:g.cookieDomain,cookieLifetime:i,secure:r})},g.resetState=function(e){e?g._mergeServerState(e):o()},g._isAllowedDone=!1,g._isAllowedFlag=!1,g.isAllowed=function(){return g._isAllowedDone||(g._isAllowedDone=!0,(g.cookieRead(g.cookieName)||g.cookieWrite(g.cookieName,"T",1))&&(g._isAllowedFlag=!0)),"T"===g.cookieRead(g.cookieName)&&g._helpers.removeCookie(g.cookieName),g._isAllowedFlag},g.setMarketingCloudVisitorID=function(e){g._setMarketingCloudFields(e)},g._use1stPartyMarketingCloudServer=!1,g.getMarketingCloudVisitorID=function(e,t){g.marketingCloudServer&&g.marketingCloudServer.indexOf(".demdex.net")<0&&(g._use1stPartyMarketingCloudServer=!0);var n=g._getAudienceManagerURLData("_setMarketingCloudFields"),i=n.url;return g._getRemoteField(A,i,e,t,n)},g.getVisitorValues=function(e,t){var n={MCMID:{fn:g.getMarketingCloudVisitorID,args:[!0],context:g},MCOPTOUT:{fn:g.isOptedOut,args:[void 0,!0],context:g},MCAID:{fn:g.getAnalyticsVisitorID,args:[!0],context:g},MCAAMLH:{fn:g.getAudienceManagerLocationHint,args:[!0],context:g},MCAAMB:{fn:g.getAudienceManagerBlob,args:[!0],context:g}},i=t&&t.length?j.pluck(n,t):n;z(i,e)},g._currentCustomerIDs={},g._customerIDsHashChanged=!1,g._newCustomerIDsHash="",g.setCustomerIDs=function(t,n){function i(){g._customerIDsHashChanged=!1}if(!g.isOptedOut()&&t){if(!j.isObject(t)||j.isObjectEmpty(t))return!1;g._readVisitor();var r,a,o;for(r in t)if(L(r)&&(a=t[r],n=a.hasOwnProperty("hashType")?a.hashType:n,a))if("object"===e(a)){var s={};if(a.id){if(n){if(!(o=Be(Ge(a.id),n)))return;a.id=o,s.hashType=n}s.id=a.id}void 0!=a.authState&&(s.authState=a.authState),g._currentCustomerIDs[r]=s}else if(n){if(!(o=Be(Ge(a),n)))return;g._currentCustomerIDs[r]={id:o,hashType:n}}else g._currentCustomerIDs[r]={id:a};var l=g.getCustomerIDs(),c=g._getField("MCCIDH"),u="";c||(c=0);for(r in l)L(r)&&(a=l[r],u+=(u?"|":"")+r+"|"+(a.id?a.id:"")+(a.authState?a.authState:""));g._newCustomerIDsHash=String(g._hash(u)),g._newCustomerIDsHash!==c&&(g._customerIDsHashChanged=!0,g._mapCustomerIDs(i))}},g.getCustomerIDs=function(){g._readVisitor();var e,t,n={};for(e in g._currentCustomerIDs)L(e)&&(t=g._currentCustomerIDs[e],n[e]||(n[e]={}),t.id&&(n[e].id=t.id),void 0!=t.authState?n[e].authState=t.authState:n[e].authState=S.AuthState.UNKNOWN,t.hashType&&(n[e].hashType=t.hashType));return n},g.setAnalyticsVisitorID=function(e){g._setAnalyticsFields(e)},g.getAnalyticsVisitorID=function(e,t,n){if(!w.isTrackingServerPopulated()&&!n)return g._callCallback(e,[""]),"";var i="";if(n||(i=g.getMarketingCloudVisitorID(function(t){g.getAnalyticsVisitorID(e,!0)})),i||n){var r=n?g.marketingCloudServer:g.trackingServer,a="";g.loadSSL&&(n?g.marketingCloudServerSecure&&(r=g.marketingCloudServerSecure):g.trackingServerSecure&&(r=g.trackingServerSecure));var o={};if(r){var s="http"+(g.loadSSL?"s":"")+"://"+r+"/id",l="d_visid_ver="+g.version+"&mcorgid="+encodeURIComponent(g.marketingCloudOrgID)+(i?"&mid="+encodeURIComponent(i):"")+(g.idSyncDisable3rdPartySyncing||g.disableThirdPartyCookies?"&d_coppa=true":""),c=["s_c_il",g._in,"_set"+(n?"MarketingCloud":"Analytics")+"Fields"];a=s+"?"+l+"&callback=s_c_il%5B"+g._in+"%5D._set"+(n?"MarketingCloud":"Analytics")+"Fields",o.corsUrl=s+"?"+l,o.callback=c}return o.url=a,g._getRemoteField(n?A:O,a,e,t,o)}return""},g.getAudienceManagerLocationHint=function(e,t){if(g.getMarketingCloudVisitorID(function(t){g.getAudienceManagerLocationHint(e,!0)})){var n=g._getField(O);if(!n&&w.isTrackingServerPopulated()&&(n=g.getAnalyticsVisitorID(function(t){g.getAudienceManagerLocationHint(e,!0)})),n||!w.isTrackingServerPopulated()){var i=g._getAudienceManagerURLData(),r=i.url;return g._getRemoteField("MCAAMLH",r,e,t,i)}}return""},g.getLocationHint=g.getAudienceManagerLocationHint,g.getAudienceManagerBlob=function(e,t){if(g.getMarketingCloudVisitorID(function(t){g.getAudienceManagerBlob(e,!0)})){var n=g._getField(O);if(!n&&w.isTrackingServerPopulated()&&(n=g.getAnalyticsVisitorID(function(t){g.getAudienceManagerBlob(e,!0)})),n||!w.isTrackingServerPopulated()){var i=g._getAudienceManagerURLData(),r=i.url;return g._customerIDsHashChanged&&g._setFieldExpire(k,-1),g._getRemoteField(k,r,e,t,i)}}return""},g._supplementalDataIDCurrent="",g._supplementalDataIDCurrentConsumed={},g._supplementalDataIDLast="",g._supplementalDataIDLastConsumed={},g.getSupplementalDataID=function(e,t){g._supplementalDataIDCurrent||t||(g._supplementalDataIDCurrent=g._generateID(1));var n=g._supplementalDataIDCurrent;return g._supplementalDataIDLast&&!g._supplementalDataIDLastConsumed[e]?(n=g._supplementalDataIDLast,g._supplementalDataIDLastConsumed[e]=!0):n&&(g._supplementalDataIDCurrentConsumed[e]&&(g._supplementalDataIDLast=g._supplementalDataIDCurrent,g._supplementalDataIDLastConsumed=g._supplementalDataIDCurrentConsumed,g._supplementalDataIDCurrent=n=t?"":g._generateID(1),g._supplementalDataIDCurrentConsumed={}),n&&(g._supplementalDataIDCurrentConsumed[e]=!0)),n};var R=!1;g._liberatedOptOut=null,g.getOptOut=function(e,t){var n=g._getAudienceManagerURLData("_setMarketingCloudFields"),i=n.url;if(u())return g._getRemoteField("MCOPTOUT",i,e,t,n);if(g._registerCallback("liberatedOptOut",e),null!==g._liberatedOptOut)return g._callAllCallbacks("liberatedOptOut",[g._liberatedOptOut]),R=!1,g._liberatedOptOut;if(R)return null;R=!0;var r="liberatedGetOptOut";return n.corsUrl=n.corsUrl.replace(/dpm\.demdex\.net\/id\?/,"dpm.demdex.net/optOutStatus?"),n.callback=[r],_[r]=function(e){if(e===Object(e)){var t,n,i=j.parseOptOut(e,t,T);t=i.optOut,n=1e3*i.d_ottl,g._liberatedOptOut=t,setTimeout(function(){g._liberatedOptOut=null},n)}g._callAllCallbacks("liberatedOptOut",[t]),R=!1},P.fireCORS(n),null},g.isOptedOut=function(e,t,n){t||(t=S.OptOut.GLOBAL);var i=g.getOptOut(function(n){var i=n===S.OptOut.GLOBAL||n.indexOf(t)>=0;g._callCallback(e,[i])},n);return i?i===S.OptOut.GLOBAL||i.indexOf(t)>=0:null},g._fields=null,g._fieldsExpired=null,g._hash=function(e){var t,n,i=0;if(e)for(t=0;t<e.length;t++)n=e.charCodeAt(t),i=(i<<5)-i+n,i&=i;return i},g._generateID=ne,g._generateLocalMID=function(){var e=g._generateID(0);return N.isClientSideMarketingCloudVisitorID=!0,e},g._callbackList=null,g._callCallback=function(e,t){try{"function"==typeof e?e.apply(v,t):e[1].apply(e[0],t)}catch(e){}},g._registerCallback=function(e,t){t&&(null==g._callbackList&&(g._callbackList={}),void 0==g._callbackList[e]&&(g._callbackList[e]=[]),g._callbackList[e].push(t))},g._callAllCallbacks=function(e,t){if(null!=g._callbackList){var n=g._callbackList[e];if(n)for(;n.length>0;)g._callCallback(n.shift(),t)}},g._addQuerystringParam=function(e,t,n,i){var r=encodeURIComponent(t)+"="+encodeURIComponent(n),a=w.parseHash(e),o=w.hashlessUrl(e);if(-1===o.indexOf("?"))return o+"?"+r+a;var s=o.split("?"),l=s[0]+"?",c=s[1];return l+w.addQueryParamAtLocation(c,r,i)+a},g._extractParamFromUri=function(e,t){var n=new RegExp("[\\?&#]"+t+"=([^&#]*)"),i=n.exec(e);if(i&&i.length)return decodeURIComponent(i[1])},g._parseAdobeMcFromUrl=r(re.ADOBE_MC),g._parseAdobeMcSdidFromUrl=r(re.ADOBE_MC_SDID),g._attemptToPopulateSdidFromUrl=function(e){var n=g._parseAdobeMcSdidFromUrl(e),i=1e9;n&&n.TS&&(i=w.getTimestampInSeconds()-n.TS),n&&n.SDID&&n.MCORGID===t&&i<g.sdidParamExpiry&&(g._supplementalDataIDCurrent=n.SDID,g._supplementalDataIDCurrentConsumed.SDID_URL_PARAM=!0)},g._attemptToPopulateIdsFromUrl=function(){var e=g._parseAdobeMcFromUrl();if(e&&e.TS){var n=w.getTimestampInSeconds(),i=n-e.TS;if(Math.floor(i/60)>re.ADOBE_MC_TTL_IN_MIN||e.MCORGID!==t)return;a(e)}},g._mergeServerState=function(e){if(e)try{if(e=function(e){return w.isObject(e)?e:JSON.parse(e)}(e),e[g.marketingCloudOrgID]){var t=e[g.marketingCloudOrgID];!function(e){w.isObject(e)&&g.setCustomerIDs(e)}(t.customerIDs),o(t.sdid)}}catch(e){throw new Error("`serverState` has an invalid format.")}},g._timeout=null,g._loadData=function(e,t,n,i){t=g._addQuerystringParam(t,"d_fieldgroup",e,1),i.url=g._addQuerystringParam(i.url,"d_fieldgroup",e,1),i.corsUrl=g._addQuerystringParam(i.corsUrl,"d_fieldgroup",e,1),N.fieldGroupObj[e]=!0,i===Object(i)&&i.corsUrl&&"XMLHttpRequest"===P.corsMetadata.corsType&&P.fireCORS(i,n,e)},g._clearTimeout=function(e){null!=g._timeout&&g._timeout[e]&&(clearTimeout(g._timeout[e]),g._timeout[e]=0)},g._settingsDigest=0,g._getSettingsDigest=function(){if(!g._settingsDigest){var e=g.version;g.audienceManagerServer&&(e+="|"+g.audienceManagerServer),g.audienceManagerServerSecure&&(e+="|"+g.audienceManagerServerSecure),g._settingsDigest=g._hash(e)}return g._settingsDigest},g._readVisitorDone=!1,g._readVisitor=function(){if(!g._readVisitorDone){g._readVisitorDone=!0;var e,t,n,i,r,a,o=g._getSettingsDigest(),s=!1,l=g.cookieRead(g.cookieName),c=new Date;if(l||I||g.discardTrackingServerECID||(l=g.cookieRead(re.FIRST_PARTY_SERVER_COOKIE)),null==g._fields&&(g._fields={}),l&&"T"!==l)for(l=l.split("|"),l[0].match(/^[\-0-9]+$/)&&(parseInt(l[0],10)!==o&&(s=!0),l.shift()),l.length%2==1&&l.pop(),e=0;e<l.length;e+=2)t=l[e].split("-"),n=t[0],i=l[e+1],t.length>1?(r=parseInt(t[1],10),a=t[1].indexOf("s")>0):(r=0,a=!1),s&&("MCCIDH"===n&&(i=""),r>0&&(r=c.getTime()/1e3-60)),n&&i&&(g._setField(n,i,1),r>0&&(g._fields["expire"+n]=r+(a?"s":""),(c.getTime()>=1e3*r||a&&!g.cookieRead(g.sessionCookieName))&&(g._fieldsExpired||(g._fieldsExpired={}),g._fieldsExpired[n]=!0)));!g._getField(O)&&w.isTrackingServerPopulated()&&(l=g.cookieRead("s_vi"))&&(l=l.split("|"),l.length>1&&l[0].indexOf("v1")>=0&&(i=l[1],e=i.indexOf("["),e>=0&&(i=i.substring(0,e)),i&&i.match(re.VALID_VISITOR_ID_REGEX)&&g._setField(O,i)))}},g._appendVersionTo=function(e){var t="vVersion|"+g.version,n=e?g._getCookieVersion(e):null;return n?Z.areVersionsDifferent(n,g.version)&&(e=e.replace(re.VERSION_REGEX,t)):e+=(e?"|":"")+t,e},g._writeVisitor=function(){var e,t,n=g._getSettingsDigest();for(e in g._fields)L(e)&&g._fields[e]&&"expire"!==e.substring(0,6)&&(t=g._fields[e],n+=(n?"|":"")+e+(g._fields["expire"+e]?"-"+g._fields["expire"+e]:"")+"|"+t);n=g._appendVersionTo(n),g.cookieWrite(g.cookieName,n,1)},g._getField=function(e,t){return null==g._fields||!t&&g._fieldsExpired&&g._fieldsExpired[e]?null:g._fields[e]},g._setField=function(e,t,n){null==g._fields&&(g._fields={}),g._fields[e]=t,n||g._writeVisitor()},g._getFieldList=function(e,t){var n=g._getField(e,t);return n?n.split("*"):null},g._setFieldList=function(e,t,n){g._setField(e,t?t.join("*"):"",n)},g._getFieldMap=function(e,t){var n=g._getFieldList(e,t);if(n){var i,r={};for(i=0;i<n.length;i+=2)r[n[i]]=n[i+1];return r}return null},g._setFieldMap=function(e,t,n){var i,r=null;if(t){r=[];for(i in t)L(i)&&(r.push(i),r.push(t[i]))}g._setFieldList(e,r,n)},g._setFieldExpire=function(e,t,n){var i=new Date;i.setTime(i.getTime()+1e3*t),null==g._fields&&(g._fields={}),g._fields["expire"+e]=Math.floor(i.getTime()/1e3)+(n?"s":""),t<0?(g._fieldsExpired||(g._fieldsExpired={}),g._fieldsExpired[e]=!0):g._fieldsExpired&&(g._fieldsExpired[e]=!1),n&&(g.cookieRead(g.sessionCookieName)||g.cookieWrite(g.sessionCookieName,"1"))},g._findVisitorID=function(t){return t&&("object"===e(t)&&(t=t.d_mid?t.d_mid:t.visitorID?t.visitorID:t.id?t.id:t.uuid?t.uuid:""+t),t&&"NOTARGET"===(t=t.toUpperCase())&&(t=T),t&&(t===T||t.match(re.VALID_VISITOR_ID_REGEX))||(t="")),t},g._setFields=function(t,n){if(g._clearTimeout(t),null!=g._loading&&(g._loading[t]=!1),N.fieldGroupObj[t]&&N.setState(t,!1),"MC"===t){!0!==N.isClientSideMarketingCloudVisitorID&&(N.isClientSideMarketingCloudVisitorID=!1);var i=g._getField(A);if(!i||g.overwriteCrossDomainMCIDAndAID){if(!(i="object"===e(n)&&n.mid?n.mid:g._findVisitorID(n))){if(g._use1stPartyMarketingCloudServer&&!g.tried1stPartyMarketingCloudServer)return g.tried1stPartyMarketingCloudServer=!0,void g.getAnalyticsVisitorID(null,!1,!0);i=g._generateLocalMID()}g._setField(A,i)}i&&i!==T||(i=""),"object"===e(n)&&((n.d_region||n.dcs_region||n.d_blob||n.blob)&&g._setFields(M,n),g._use1stPartyMarketingCloudServer&&n.mid&&g._setFields(b,{id:n.id})),g._callAllCallbacks(A,[i])}if(t===M&&"object"===e(n)){var r=604800;void 0!=n.id_sync_ttl&&n.id_sync_ttl&&(r=parseInt(n.id_sync_ttl,10));var a=F.getRegionAndCheckIfChanged(n,r);g._callAllCallbacks("MCAAMLH",[a]);var o=g._getField(k);(n.d_blob||n.blob)&&(o=n.d_blob,o||(o=n.blob),g._setFieldExpire(k,r),g._setField(k,o)),o||(o=""),g._callAllCallbacks(k,[o]),!n.error_msg&&g._newCustomerIDsHash&&g._setField("MCCIDH",g._newCustomerIDsHash)}if(t===b){var s=g._getField(O);s&&!g.overwriteCrossDomainMCIDAndAID||(s=g._findVisitorID(n),s?s!==T&&g._setFieldExpire(k,-1):s=T,g._setField(O,s)),s&&s!==T||(s=""),g._callAllCallbacks(O,[s])}if(g.idSyncDisableSyncs||g.disableIdSyncs)F.idCallNotProcesssed=!0;else{F.idCallNotProcesssed=!1;var l={};l.ibs=n.ibs,l.subdomain=n.subdomain,F.processIDCallData(l)}if(n===Object(n)){var c,d;u()&&g.isAllowed()&&(c=g._getField("MCOPTOUT"));var f=j.parseOptOut(n,c,T);c=f.optOut,d=f.d_ottl,g._setFieldExpire("MCOPTOUT",d,!0),g._setField("MCOPTOUT",c),g._callAllCallbacks("MCOPTOUT",[c])}},g._loading=null,g._getRemoteField=function(e,t,n,i,r){var a,o="",s=w.isFirstPartyAnalyticsVisitorIDCall(e),l={MCAAMLH:!0,MCAAMB:!0};if(u()&&g.isAllowed()){g._readVisitor(),o=g._getField(e,!0===l[e]);if(function(){return(!o||g._fieldsExpired&&g._fieldsExpired[e])&&(!g.disableThirdPartyCalls||s)}()){if(e===A||"MCOPTOUT"===e?a="MC":"MCAAMLH"===e||e===k?a=M:e===O&&(a=b),a)return!t||null!=g._loading&&g._loading[a]||(null==g._loading&&(g._loading={}),g._loading[a]=!0,g._loadData(a,t,function(t){if(!g._getField(e)){t&&N.setState(a,!0);var n="";e===A?n=g._generateLocalMID():a===M&&(n={error_msg:"timeout"}),g._setFields(a,n)}},r)),g._registerCallback(e,n),o||(t||g._setFields(a,{id:T}),"")}else o||(e===A?(g._registerCallback(e,n),o=g._generateLocalMID(),g.setMarketingCloudVisitorID(o)):e===O?(g._registerCallback(e,n),o="",g.setAnalyticsVisitorID(o)):(o="",i=!0))}return e!==A&&e!==O||o!==T||(o="",i=!0),n&&i&&g._callCallback(n,[o]),o},g._setMarketingCloudFields=function(e){g._readVisitor(),g._setFields("MC",e)},g._mapCustomerIDs=function(e){g.getAudienceManagerBlob(e,!0)},g._setAnalyticsFields=function(e){g._readVisitor(),g._setFields(b,e)},g._setAudienceManagerFields=function(e){g._readVisitor(),g._setFields(M,e)},g._getAudienceManagerURLData=function(e){var t=g.audienceManagerServer,n="",i=g._getField(A),r=g._getField(k,!0),a=g._getField(O),o=a&&a!==T?"&d_cid_ic=AVID%01"+encodeURIComponent(a):"";if(g.loadSSL&&g.audienceManagerServerSecure&&(t=g.audienceManagerServerSecure),t){var s,l,c=g.getCustomerIDs();if(c)for(s in c)L(s)&&(l=c[s],o+="&d_cid_ic="+encodeURIComponent(s)+"%01"+encodeURIComponent(l.id?l.id:"")+(l.authState?"%01"+l.authState:""));e||(e="_setAudienceManagerFields");var u="http"+(g.loadSSL?"s":"")+"://"+t+"/id",d="d_visid_ver="+g.version+(h&&-1!==u.indexOf("demdex.net")?"&gdpr=1&gdpr_force=1&gdpr_consent="+h:"")+"&d_rtbd=json&d_ver=2"+(!i&&g._use1stPartyMarketingCloudServer?"&d_verify=1":"")+"&d_orgid="+encodeURIComponent(g.marketingCloudOrgID)+"&d_nsid="+(g.idSyncContainerID||0)+(i?"&d_mid="+encodeURIComponent(i):"")+(g.idSyncDisable3rdPartySyncing||g.disableThirdPartyCookies?"&d_coppa=true":"")+(!0===D?"&d_coop_safe=1":!1===D?"&d_coop_unsafe=1":"")+(r?"&d_blob="+encodeURIComponent(r):"")+o,f=["s_c_il",g._in,e];return n=u+"?"+d+"&d_cb=s_c_il%5B"+g._in+"%5D."+e,{url:n,corsUrl:u+"?"+d,callback:f}}return{url:n}},g.appendVisitorIDsTo=function(e){try{var t=[[A,g._getField(A)],[O,g._getField(O)],["MCORGID",g.marketingCloudOrgID]];return g._addQuerystringParam(e,re.ADOBE_MC,s(t))}catch(t){return e}},g.appendSupplementalDataIDTo=function(e,t){if(!(t=t||g.getSupplementalDataID(w.generateRandomString(),!0)))return e;try{var n=s([["SDID",t],["MCORGID",g.marketingCloudOrgID]]);return g._addQuerystringParam(e,re.ADOBE_MC_SDID,n)}catch(t){return e}};var w={parseHash:function(e){var t=e.indexOf("#");return t>0?e.substr(t):""},hashlessUrl:function(e){var t=e.indexOf("#");return t>0?e.substr(0,t):e},addQueryParamAtLocation:function(e,t,n){var i=e.split("&");return n=null!=n?n:i.length,i.splice(n,0,t),i.join("&")},isFirstPartyAnalyticsVisitorIDCall:function(e,t,n){if(e!==O)return!1;var i;return t||(t=g.trackingServer),n||(n=g.trackingServerSecure),!("string"!=typeof(i=g.loadSSL?n:t)||!i.length)&&(i.indexOf("2o7.net")<0&&i.indexOf("omtrdc.net")<0)},isObject:function(e){return Boolean(e&&e===Object(e))},removeCookie:function(e){Q.remove(e,{domain:g.cookieDomain})},isTrackingServerPopulated:function(){return!!g.trackingServer||!!g.trackingServerSecure},getTimestampInSeconds:function(){return Math.round((new Date).getTime()/1e3)},parsePipeDelimetedKeyValues:function(e){return e.split("|").reduce(function(e,t){var n=t.split("=");return e[n[0]]=decodeURIComponent(n[1]),e},{})},generateRandomString:function(e){e=e||5;for(var t="",n="abcdefghijklmnopqrstuvwxyz0123456789";e--;)t+=n[Math.floor(Math.random()*n.length)];return t},normalizeBoolean:function(e){return"true"===e||"false"!==e&&e},parseBoolean:function(e){return"true"===e||"false"!==e&&null},replaceMethodsWithFunction:function(e,t){for(var n in e)e.hasOwnProperty(n)&&"function"==typeof e[n]&&(e[n]=t);return e}};g._helpers=w;var F=ae(g,S);g._destinationPublishing=F,g.timeoutMetricsLog=[];var N={isClientSideMarketingCloudVisitorID:null,MCIDCallTimedOut:null,AnalyticsIDCallTimedOut:null,AAMIDCallTimedOut:null,fieldGroupObj:{},setState:function(e,t){switch(e){case"MC":!1===t?!0!==this.MCIDCallTimedOut&&(this.MCIDCallTimedOut=!1):this.MCIDCallTimedOut=t;break;case b:!1===t?!0!==this.AnalyticsIDCallTimedOut&&(this.AnalyticsIDCallTimedOut=!1):this.AnalyticsIDCallTimedOut=t;break;case M:!1===t?!0!==this.AAMIDCallTimedOut&&(this.AAMIDCallTimedOut=!1):this.AAMIDCallTimedOut=t}}};g.isClientSideMarketingCloudVisitorID=function(){return N.isClientSideMarketingCloudVisitorID},g.MCIDCallTimedOut=function(){return N.MCIDCallTimedOut},g.AnalyticsIDCallTimedOut=function(){return N.AnalyticsIDCallTimedOut},g.AAMIDCallTimedOut=function(){return N.AAMIDCallTimedOut},g.idSyncGetOnPageSyncInfo=function(){return g._readVisitor(),g._getField("MCSYNCSOP")},g.idSyncByURL=function(e){if(!g.isOptedOut()){var t=l(e||{});if(t.error)return t.error;var n,i,r=e.url,a=encodeURIComponent,o=F;return r=r.replace(/^https:/,"").replace(/^http:/,""),n=j.encodeAndBuildRequest(["",e.dpid,e.dpuuid||""],","),i=["ibs",a(e.dpid),"img",a(r),t.ttl,"",n],o.addMessage(i.join("|")),o.requestToProcess(),"Successfully queued"}},g.idSyncByDataSource=function(e){if(!g.isOptedOut())return e===Object(e)&&"string"==typeof e.dpuuid&&e.dpuuid.length?(e.url="//dpm.demdex.net/ibs:dpid="+e.dpid+"&dpuuid="+e.dpuuid,g.idSyncByURL(e)):"Error: config or config.dpuuid is empty"},He(g,F),g._getCookieVersion=function(e){e=e||g.cookieRead(g.cookieName);var t=re.VERSION_REGEX.exec(e);return t&&t.length>1?t[1]:null},g._resetAmcvCookie=function(e){var t=g._getCookieVersion();t&&!Z.isLessThan(t,e)||w.removeCookie(g.cookieName)},g.setAsCoopSafe=function(){D=!0},g.setAsCoopUnsafe=function(){D=!1},function(){if(g.configs=Object.create(null),w.isObject(n))for(var e in n)L(e)&&(g[e]=n[e],g.configs[e]=n[e])}(),function(){[["getMarketingCloudVisitorID"],["setCustomerIDs",void 0],["getAnalyticsVisitorID"],["getAudienceManagerLocationHint"],["getLocationHint"],["getAudienceManagerBlob"]].forEach(function(e){var t=e[0],n=2===e.length?e[1]:"",i=g[t];g[t]=function(e){return u()&&g.isAllowed()?i.apply(g,arguments):("function"==typeof e&&g._callCallback(e,[n]),n)}})}(),g.init=function(){if(c())return m.optIn.fetchPermissions(f,!0);!function(){if(w.isObject(n)){g.idSyncContainerID=g.idSyncContainerID||0,D="boolean"==typeof g.isCoopSafe?g.isCoopSafe:w.parseBoolean(g.isCoopSafe),g.resetBeforeVersion&&g._resetAmcvCookie(g.resetBeforeVersion),g._attemptToPopulateIdsFromUrl(),g._attemptToPopulateSdidFromUrl(),g._readVisitor();var e=g._getField(y),t=Math.ceil((new Date).getTime()/re.MILLIS_PER_DAY);g.idSyncDisableSyncs||g.disableIdSyncs||!F.canMakeSyncIDCall(e,t)||(g._setFieldExpire(k,-1),g._setField(y,t)),g.getMarketingCloudVisitorID(),g.getAudienceManagerLocationHint(),g.getAudienceManagerBlob(),g._mergeServerState(g.serverState)}else g._attemptToPopulateIdsFromUrl(),g._attemptToPopulateSdidFromUrl()}(),function(){if(!g.idSyncDisableSyncs&&!g.disableIdSyncs){F.checkDPIframeSrc();var e=function(){var e=F;e.readyToAttachIframe()&&e.attachIframe()};v.addEventListener("load",function(){S.windowLoaded=!0,e()});try{te.receiveMessage(function(e){F.receiveMessage(e.data)},F.iframeHost)}catch(e){}}}(),function(){g.whitelistIframeDomains&&re.POST_MESSAGE_ENABLED&&(g.whitelistIframeDomains=g.whitelistIframeDomains instanceof Array?g.whitelistIframeDomains:[g.whitelistIframeDomains],g.whitelistIframeDomains.forEach(function(e){var n=new B(t,e),i=K(g,n);te.receiveMessage(i,e)}))}()}};qe.config=se,_.Visitor=qe;var Xe=qe,We=function(e){if(j.isObject(e))return Object.keys(e).filter(function(t){return""!==e[t]}).reduce(function(t,n){var i="doesOptInApply"!==n?e[n]:se.normalizeConfig(e[n]),r=j.normalizeBoolean(i);return t[n]=r,t},Object.create(null))},Je=Ve.OptIn,Ke=Ve.IabPlugin;return Xe.getInstance=function(e,t){if(!e)throw new Error("Visitor requires Adobe Marketing Cloud Org ID.");e.indexOf("@")<0&&(e+="@AdobeOrg");var n=function(){var t=_.s_c_il;if(t)for(var n=0;n<t.length;n++){var i=t[n];if(i&&"Visitor"===i._c&&i.marketingCloudOrgID===e)return i}}();if(n)return n;var i=We(t);!function(e){_.adobe.optIn=_.adobe.optIn||function(){var t=j.pluck(e,["doesOptInApply","previousPermissions","preOptInApprovals","isOptInStorageEnabled","optInStorageExpiry","isIabContext"]),n=e.optInCookieDomain||e.cookieDomain;n=n||$(),n=n===window.location.hostname?"":n,t.optInCookieDomain=n;var i=new Je(t,{cookies:Q});if(t.isIabContext){var r=new Ke(window.__cmp);i.registerPlugin(r)}return i}()}(i||{});var r=e,a=r.split("").reverse().join(""),o=new Xe(e,null,a);j.isObject(i)&&i.cookieDomain&&(o.cookieDomain=i.cookieDomain),function(){_.s_c_il.splice(--_.s_c_in,1)}();var s=j.getIeVersion();if("number"==typeof s&&s<10)return o._helpers.replaceMethodsWithFunction(o,function(){});var l=function(){try{return _.self!==_.parent}catch(e){return!0}}()&&!function(e){return e.cookieWrite("TEST_AMCV_COOKIE","T",1),"T"===e.cookieRead("TEST_AMCV_COOKIE")&&(e._helpers.removeCookie("TEST_AMCV_COOKIE"),!0)}(o)&&_.parent?new Y(e,i,o,_.parent):new Xe(e,i,a);return o=null,l.init(),l},function(){function e(){Xe.windowLoaded=!0}_.addEventListener?_.addEventListener("load",e):_.attachEvent&&_.attachEvent("onload",e),Xe.codeLoadEnd=(new Date).getTime()}(),Xe}();
        //}

        var dPeriod = ((/.+\.(com\.au|org\.au|co\.nz|co\.uk)$/i).test(location.hostname)? 3 : 2)
            dLen = location.hostname.split('.').length,
            dRoot=location.hostname.split('.').slice(dLen-dPeriod).join('.'),
            tServer = 'metrics.westpacgroup.com.au',
            tSecServer = 'smetrics.westpacgroup.com.au';

        /******** VISITOR ID SERVICE CONFIG - REQUIRES VisitorAPI.js ********/
            var visitor = Visitor.getInstance("3A4B7BAF56F01DA67F000101@AdobeOrg", {
                trackingServer: tServer, // same as s.trackingServer
                trackingServerSecure: tSecServer, // same as s.trackingServerSecure
                marketingCloudServer: tServer,
                marketingCloudServerSecure:tSecServer,
                //cookieDomain: (/(([0-9]{1,3})$|cloudfront)/i).test(location.hostname)? location.hostname : location.hostname.split('.').slice(1).join('.'),
                cookieDomain: dRoot,
                disableIdSyncs: true,
                overwriteCrossDomainMCIDAndAID: true //Set overwrite property
            });
            /* Reset server state - for Target API Server side delivery*/
            if(window.serverState){
                visitor.resetState(window.serverState);
                delete window.serverState;
            }


            /* setting MID from native app */

            var cookieMID, regexMid = 'MCMID=(.*?)(?=\\?|&|;|#|\\/|$)';
            regexMid = new RegExp(regexMid, 'i');
            var currentMID = visitor.getMarketingCloudVisitorID() || '';

            cookieMID = ((regexMid.test(document.cookie)) ? (document.cookie.match(regexMid)[0]) : '');
            if (cookieMID && currentMID) {
                cookieMID = cookieMID.replace('MCMID=', '')
                if (cookieMID !== currentMID) {
                    visitor.setMarketingCloudVisitorID(cookieMID);
                    //console.log("visitor.setMarketingCloudVisitorID is called");
                }
            } else if (cookieMID && currentMID == '') {
                cookieMID = cookieMID.replace('MCMID=', '')
                visitor.setMarketingCloudVisitorID(cookieMID);
                //console.log("visitor.setMarketingCloudVisitorID is called");
            }

            var ctid ={},
            regAuth = new RegExp('s_wbc_auth=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
            regWbcid = new RegExp('s_wbc-ti=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
            regBizAuth = new RegExp('s_biz_auth=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
            regBizid = new RegExp('s_biz-ti=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
            regStgAuth = new RegExp('s_stg_auth=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
            regStgid = new RegExp('s_stg_ti=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
            regBomAuth = new RegExp('s_bom_auth=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
            regBomid = new RegExp('s_bom_ti=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
            regBsaAuth = new RegExp('s_bsa_auth=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
            regBsaid = new RegExp('s_bsa_ti=(.*?)(?=\\?|&|;|#|\\/|$)', 'i'),
            wbc_id = ((regWbcid.test(document.cookie)) ? (document.cookie.match(regWbcid)[0]).replace('s_wbc-ti=','') : ''),
            wbc_auth = ((regAuth.test(document.cookie)) ? (document.cookie.match(regAuth)[0]).replace('s_wbc_auth=','') : ''),
            biz_id = ((regBizid.test(document.cookie)) ? (document.cookie.match(regBizid)[0]).replace('s_biz-ti=','') : ''),
            biz_auth = ((regBizAuth.test(document.cookie)) ? (document.cookie.match(regBizAuth)[0]).replace('s_biz_auth=','') : ''),
            stg_id = ((regStgid.test(document.cookie)) ? (document.cookie.match(regStgid)[0]).replace('s_stg_ti=','') : ''),
            stg_auth = ((regStgAuth.test(document.cookie)) ? (document.cookie.match(regStgAuth)[0]).replace('s_stg_auth=','') : ''),
            bom_id = ((regBomid.test(document.cookie)) ? (document.cookie.match(regBomid)[0]).replace('s_bom_ti=','') : ''),
            bom_auth = ((regBomAuth.test(document.cookie)) ? (document.cookie.match(regBomAuth)[0]).replace('s_bom_auth=','') : ''),
            bsa_id = ((regBsaid.test(document.cookie)) ? (document.cookie.match(regBsaid)[0]).replace('s_bsa_ti=','') : ''),
            bsa_auth = ((regBsaAuth.test(document.cookie)) ? (document.cookie.match(regBsaAuth)[0]).replace('s_bsa_auth=','') : '');

            if (wbc_id || biz_id){
                if(wbc_id){
                    ctid.wbcid = {"id" : wbc_id, "authState": (wbc_auth ? wbc_auth : 0)}
                }
                if(biz_id){
                    ctid.bizid = {"id" : biz_id, "authState": (biz_auth ? biz_auth : 0)}
                }
                visitor.setCustomerIDs(ctid);
            }
            if (stg_id || bom_id || bsa_id){
                if(stg_id){
                    ctid.compassid = {"id" : stg_id, "authState": (stg_auth ? stg_auth : 0)}
                }
                if(bom_id){
                    ctid.compassid = {"id" : bom_id, "authState": (bom_auth ? bom_auth : 0)}
                }
                if(bsa_id){
                    ctid.compassid = {"id" : bsa_id, "authState": (bsa_auth? bsa_auth : 0)}
                }
                if(biz_id){
                    ctid.bizid = {"id" : biz_id, "authState": (biz_auth ? biz_auth : 0)}
                }
                visitor.setCustomerIDs(ctid);
            }

            /******** visitor.js [end]********/
            /******** util.js [start]********/
            var util = window.util || {};
            util.version = 'U:0.24';
            util.w_wtT =window.w_wtT || window.testTracking || {};//test environment variables
            util.pathConcatDelim = ':';
            util.queryVarsList= '';
            util.pathExcludeList=''; // elements to exclude from the path - index.html? default.aspx for info?
            util.pathExcludeDelim = ';'; // portion of the path to exclude - was ;
            util.siteID= '';  //s.siteID set in doPlugins to allow changing to 'app' based on visitorID cookie from apps
            util.domainPeriod = function(domain){
                return ((/.+\.(com\.au|org\.au|co\.nz|co\.uk)$/i).test(domain||location.hostname))? 3 : 2
            };
            util.cookieDomain = function(domain){
                var host = domain || location.hostname,
                dp= util.domainPeriod(domain),
                ln = host.split('.').length;
                if((/[0-9]{1,3}$/i).test(location.hostname)){
                    return host;
                }
                return '.'+host.split('.').slice(ln-dp).join('.');
            };
            //util.codeVers="vid"+visitor.version+","+util.version;
            util.location = util.w_wtT.location || window.location;
            // moved from original responsive CSS function in analytics.js
            util.isVisible_ex = "util.isVisible(@selector, @element, @tabFlag) \nreturn true if the item is not hidded @tabFlag =0 (default is 1)if tabindex is userd for the visible items";
            util.isVisible = function (selector, element, tabFlag) {
                var elem = selector ? document.querySelector && document.querySelector(selector) : element, ieDisplayNoneBug;
                // fix for IE bug with inline and block elements stating offsets incorrectly
                ieDisplayNoneBug = elem && elem.currentStyle && elem.currentStyle.display === 'none' ? true : false;
                //console.log('tabIndex: '+elem.tabIndex);
                if(tabFlag===0){
                    return elem && (elem.offsetWidth > 0 && elem.offsetHeight > 0) && !ieDisplayNoneBug; // other conditions can be added if required
                }else{
                    return elem && ((elem.offsetWidth > 0 && elem.offsetHeight > 0) && elem.tabIndex > -1) && !ieDisplayNoneBug; // other conditions can be added if required
                }
            };
            util.random_ex ="util.random() \nreturn an rendom number";
            util.random = function(){
                var dd = new Date();
                return Math.round(Math.abs(Math.sin(dd.getTime()))*1000000000)%10000000;
            };
            util.loadScript_ex ="util.loadScript(@url,@delay,@random, @idVal,@callback) \nload an script async \n@url destination URL, \n@delay is use for setTimeout defauel 4000ms  \n@random supply string which will be replaced by rendom number at runtime\n @idVal any value supplied this will replace {ID} paramer inside the URL  \n@example util.loadScript('//abc.abc.com/pages/scripts/abc.js?id={ID}&g=RAND',4,'RAND','abc123')";
            util.loadScript = function(url,delay,random,idVal,callback){
                var d = delay ? d=delay : 4000; //default delay 4000ms
                url = random ? String(url).replace(new RegExp(random),util.random()) : String(url);
                url = url.replace(/^https?\:/i,'');
                url = idVal ? String(url).replace(/\{ID\}/g,idVal) : String(url);
                //console.log(document.location.protocol+url);
                setTimeout(function(){
                    var a=document.createElement("script");
                    var b=document.getElementsByTagName("script")[0];
                    a.src=document.location.protocol+url;
                    a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b);
                    if(callback && (typeof callback === 'function'))
                        callback();
                }, d);
            };
            util.loadImgPixel_ex ="util.loadImgPixel(@url,@delay,@random, @idVal, @pageURL) \nload an image \n@url destination URL, \n@delay is use for setTimeout defauel 4000ms  \n@random supply string which will be replaced by rendom number at runtime\n @idVal any value supplied this will replace {ID} paramer inside the URL  \n@example util.loadScript('//abc.abc.com/pages/scripts/abc.js?id={ID}&url={URL}&g={RAND}',4,'{RAND}','abc123','')";
            util.loadImgPixel = function(url,delay,random,idVal,pageUrl){
                var d = delay ? d=delay : 4000; //default delay 4000ms
                url = random ? String(url).replace(new RegExp(random),util.random()) : String(url);
                url = url.replace(/^https?\:/i,'');
                currentUrl = encodeURIComponent(pageUrl? pageUrl:(document.location.origin+ document.location.pathname+ document.location.search));
                url = String(url).replace(/\{URL\}/g,currentUrl);
                url = idVal ? String(url).replace(/\{ID\}/g,idVal) : String(url);
                setTimeout(function(){
                    var ad_image = new Image(1,1);
                    ad_image.src = document.location.protocol+url;
                    document.body.appendChild(ad_image);
                }, d);
            };
            util.getExp_ex="util.getExp() \nreturn responsive experence as mob, tab or desktop\based on css class .analytics-experience .pagedetails-experience";
            util.getExp = function () {
                var isVis = util.isVisible,
                cssExperienceMob = isVis('.pagedetails-experience-mob','',0) || isVis('.analytics-experience-mob','',0), // responsive site mobile class visible check. name changed to analytics-... to be more relevant
                cssExperienceTab = isVis('.pagedetails-experience-tab','',0) || isVis('.analytics-experience-tab','',0), // responsive site tablet class visible check. name changed to analytics-... to be more relevant
                cssExperienceDesktop = isVis('.analytics-experience-desktop','',0), // responsive site tablet class visible check. name changed to analytics-... to be more relevant
                cssNotDetected = cssExperienceMob === null && cssExperienceTab === null && cssExperienceDesktop === null,
                experienceResult;

                // logic to determine experience based on elements with classes being found/hidden/visible
                experienceResult = (cssExperienceMob || (cssExperienceMob !== false && cssExperienceDesktop === false && !cssExperienceTab)) ? 'mob' : ((cssExperienceTab || (cssExperienceTab !== false && cssExperienceDesktop === false && !cssExperienceMob)) ? 'tab' : 'desktop'); // TESTING with !desktop options etc.

                // save taddEventListenerhe experience determined by the logic
                util.expOrig = util.expOrig || experienceResult;

                // if no elements with classes detected, use the first saved experience
                if (cssNotDetected) {
                    experienceResult = util.expOrig;
                }

                return experienceResult;
            };
            util.addHandler_ex="util.addHandler(@element, @event, @handler) add event Listener";
            util.addHandler = function (element, event, handler) {
                if (element.addEventListener) {
                    element.addEventListener(event, handler, false);
                } else {
                    if (element.attachEvent) {
                        element.attachEvent('on' + event, handler);
                    }
                }
            };
            util.onReady = function (func) {
                if (/complete/.test(document.readyState)) { // fire/attach immediately in case window load has already occured
                        func();
                    } else {
                        util.addHandler(window, 'load', function () { // fire/attach when window loads. include a timeout to prevent Chrome/Safari spinner immediately after load
                        setTimeout(func, 4); // should be 4
                    });
                }
            };
            util.cookieRead_ex="util.cookieRead(@sKey) \nreturn the value of a given cookie \@sKey =cookie name";
            util.cookieRead = function (sKey) {
                return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || '';
            };
            util.combinedcookieRead_ex ="util.combinedcookieRead(@sKey,@cKey) \nreturn the value of a given combined cookie rata \@sKey =cookie name \@cKey =Combined cookie name \n\@return as single value or an array of objects";
            util.combinedcookieRead = function (sKey,cKey) {
                var temp = decodeURIComponent(util.cookieRead(sKey)).match(new RegExp(cKey+'=(.+?)\\|\\d{13}\\;'),'$1');
                temp =temp ? temp[1].replace(/\[(\[.*?\])\]/g,'$1'): '';
                temp = temp.match(/\'(.+?)\'/g)? temp.match(/\'(.+?)\'/g, $1 ): temp;
                return temp;
            };
            util.cookieWrite_ex="util.cookieWrite(@sKey, @sValue, @vEnd, @sPath, @sDomain, @bSecure) \nWrite a cookie with given value \n@sKey =cookie name \n@sValue = cookie value, \n@vEnd = cookie expiry \n@sPath = domain path \n@sDomain = cookie domain \n@bSecure = secure flug";
            util.cookieWrite = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
                if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                    return false;
                }
                var sExpires = '';
                if (vEnd && vEnd.constructor === Date) {
                    sExpires = '; expires=' + vEnd.toUTCString();
                }
                document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
                return true;
            };
            util.cookieAudit = function(){
                return document.cookie.length;
            }
            util.scriptElement = function (id) {
                var existing = document.getElementById(id),
                scripts = document.getElementsByTagName('script')[0],
                //sibling = scripts[scripts.length - 1],
                element;

                if (existing) {
                    return existing;
                }

                element = document.createElement('script');
                element.id = id;
                //element.type = 'text/javascript';
                element.async = 1;
                //element.defer = true;

                //sibling.parentNode.insertBefore(element, sibling.nextSibling);
                scripts.parentNode.insertBefore(element, scripts);

                return element;
            };
            util.cloneObject_ex ="util.cloneObject(@oToBeCloned, @clones)";
            util.cloneObject=function (oToBeCloned, clones) {
                var oClone,
                Constr = oToBeCloned && oToBeCloned.constructor ? oToBeCloned.constructor : undefined,
                lp,
                len,
                cloneRef,
                alreadyCloned,
                prpty;

                if (!oToBeCloned || (Constr !== RegExp && Constr !== Date && Constr !== Function && Constr !== Object && Constr !== Array)) {
                    return oToBeCloned;
                }

                switch (Constr) {
                    // handle special object types
                case RegExp:
                    oClone = new Constr(oToBeCloned.source, 'g'.substr(0, Number(oToBeCloned.global)) + 'i'.substr(0, Number(oToBeCloned.ignoreCase)) + 'm'.substr(0, Number(oToBeCloned.multiline)));
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
                            oClone[prpty] = util.cloneObject(oToBeCloned[prpty], clones);
                        }
                    }
                }
                return oClone;
            };
            util.qSA_ex ="util.qSA(@doc, @selector, @tag, @attr, @regex) return selected elements \n@doc = document  \n@selector = any selecton \nFor non supported browser: \n@tag, @attr, @regex";
            util.qSA = function (doc, selector, tag, attr, regex) {
                var lp,
                len,
                result = [],
                target,
                tempAttr;

                if (doc && doc.querySelectorAll) {
                    result = doc.querySelectorAll(selector);
                } else {
                    target = doc && doc.getElementsByTagName(tag);
                    if (attr && regex) {
                        for (lp = 0, len = target.length; lp < len; lp++) {
                            tempAttr = (attr === 'class' ? target[lp].className : target[lp].getAttribute(attr));
                            if (tempAttr && regex.test(tempAttr)) {
                                result.push(target[lp]);
                            }
                        }
                    } else if (regex) {
                        for (lp = 0, len = target.length; lp < len; lp++) {
                            if (regex.test(target[lp].innerHTML)) {
                                result.push(target[lp]);
                            }
                        }
                    } else {
                        return target || 0;
                    }
                }
                return result;
            };
            util.getText_ex = "util.getText(@elem) \nreturn text of any element"
            util.getText = function (elem) {
                var elemText;
                if (elem) {
                    elemText = elem.innerText || elem.textContent;
                } else {
                    elemText = '';
                }
                return elemText.replace(/^\s+|\s+$/g, ''); // trim
            };
            util.removeNumbers_ex = "util.removeNumbers(@str) \nremove number from a given string"
            util.removeNumbers = function (str) {
                return str.replace(/\s+\(\s*\d+\s*\)$/g, ''); // remove numbers and trim
            };
            util.addCallback = function (scriptEl, readyCheck, callback) {
                var thisFunction = util.addCallback;
                thisFunction.q = thisFunction.q || [];

                if (scriptEl.readyState) {
                    thisFunction.q.push(callback); // ability to add multiple callbacks in IE

                    scriptEl.onreadystatechange = function () {
                        var callbackItem;
                        if (/loaded|complete/.test(scriptEl.readyState) && readyCheck()) { // readyCheck to verify that all scripts required are actually ready (mainly to confirm IE readystate)
                            scriptEl.onreadystatechange = null;
                            while (thisFunction.q.length) {
                                callbackItem = thisFunction.q.shift();
                                callbackItem();
                            }
                        }
                    };
                } else {
                    //console.log('readyCheck non-IE = ' + readyCheck());
                    util.addHandler(scriptEl, 'load', function () {
                        if (readyCheck()) { // in case the file loaded is not actually s_code
                            callback();
                        }
                    });
                }
            };
            util.guidRgx = /\b\w{8}-\w{4}-\w{4}-\w{4}-\w{12}\b/g;
            util.guidBt = /\b(\/|a=)\w{48}(\/|$)\b/g;
            util.guidCompass= /\bnameId\=\w{64}\b/g;
            util.guidAce= /\ACEdata\=\w{634}\b/g;
            util.guidMid = new RegExp('adobe_mc=(.*?)(?=\\?|&|;|#|\\/|$)','i');
            util.guidAid = new RegExp('(adobe_aa_vid|s_vi|s_vid)=(.*?)(?=\\?|&|;|#|\\/|$)','i');
            util.dateUrl = /\b\d{4}-\d{1,2}-\d{1,2}\b/g;
            util.guidWebMid = new RegExp('webmid=(.*?)(?=\\?|&|;|#|\\/|$)','i');
            util.wLiveId = new RegExp('(accountglobalid|paymentid|payeeendpointid|memberid|workflowid|ppid|alertid|billid|compartmentid|messageid|(\\?|&|#)id)=(.*?)(?=\\?|&|;|#|\\/|$)','i');
            util.latlong = new RegExp('(\\-?)\\d{1,3}\\.\\d{6}:(\\-?)\\d{1,3}\\.\\d{6}','i');
            util.cleanJSON_ex = "util.cleanJSON(@JSONdata) \n remove non-printable and other non-valid JSON chars";
            util.cleanJSON = function (JSONdata) {
                JSONdata = JSONdata.replace(/\\n/g, "\\n")
                               .replace(/\\'/g, "\\'")
                               .replace(/\\"/g, '\\"')
                               .replace(/\\&/g, "\\&")
                               .replace(/\\r/g, "\\r")
                               .replace(/\\t/g, "\\t")
                               .replace(/\\b/g, "\\b")
                               .replace(/\\f/g, "\\f");
                // remove non-printable and other non-valid JSON chars
                JSONdata = JSONdata.replace(/[\u0000-\u0019]+/g,"");
                return JSONdata = JSON.parse(JSONdata);
            };

            util.cleanURL_ex = "util.cleanURL(@loc, @locType) \nremove guidRgx,referrer querystring parameter, multiple slashes, session ID,hash or hashbang\@locType = 1 remove cid";
            util.cleanURL = function (loc, locType) {
                var cleanedUrl = (loc || '')
                .replace(/(\w)\/\/+/g, '$1/') // replace multiple slashes after a word char. with single slash (except for ://) for clean pageName (from location)
                .replace(/((?:&|\?)referrer=.*?(?=&|$))/ig, '') // always remove referrer querystring parameter - it was generated for unica
                .replace(/(^https?:.+?(?:online|banking).+\/cust\/wps\/(my)?portal\/[pw]ol\/)!ut\/.*/i, '$1oregon-application') // Oregon - portal/pol|wol. remove session ID in path
                //.replace(/(^https?:.+?(www.)?forms.+\.nsf)(?:.*\w{32}.*)/i,'$1$2'); // Remove session ID only from Domino path $1 adds www. ???
                .replace(/(^https?:.+?(forms|online)(?:\.|-).*\.nsf.*?)(?:\/\w{32}(?=\?))/i, '$1') // Remove session ID only from Domino path $1 adds www. ???
                .replace(util.guidRgx, '') // remove OTP user GUID
                .replace(util.guidBt, '') // remove OTP user GUID
                .replace(/\baccountGlobalId=\w{128}\b/g, '') // remove OTP user GUID
                .replace(util.guidMid, '') //Remove adobe MCMID
                .replace(util.guidWebMid, '') //Remove adobe WEBMID
                .replace(util.wLiveId, '') //Remove wlive other id
                .replace(util.latlong, '') //remove latlong from URL
                .replace(util.guidCompass, '') //remove compass GUID
                .replace(util.guidAce, '') //remove compass GUID
                .replace(/#+!*$/, '') // remove hash or hashbang (or multiples of these characters) at end of loc (only) to unify URLs that would otherwise match
                .replace(/(default|index)(\.html|\.htm)/, '')
                .replace(/\.html|\.htm/, '')
            ;

                if (locType === 1) {
                    // locType 1 is page location
                    // Keep querystring if it contains cid parameter for paid search detection
                    // remove complete querystring for privacy/security/uniqueness/shorter request if not on Domino/oregon? form (handled separately)
                    //cleanedUrl = cleanedUrl.replace(/\?(?!(?:openform|readform|opendocument|funcreqd)).*/i, '');
                    //cleanedUrl = cleanedUrl.replace(/\?(?!(?:cid=.+|.*&cid=.+|openform|readform|opendocument|funcreqd)).*/i, '');
                    //cleanedUrl = cleanedUrl.replace(/(\?|&)(?!(?:cid=.+|openform|readform|opendocument|funcreqd)).*/i, '');
                    //cleanedUrl = cleanedUrl.replace(/((\?|&)(?!(?:cid=.+|openform|readform|opendocument|funcreqd))|#).*/i, ''); // this regex doesn't work. Still replaces if CID somewhere in querystring

                    // if querystring doesn't contain things we want to keep, remove it. Remove hash and append it to eVar only.
                    if (!(/(\?|&)(cid=.+|openform|readform|opendocument|funcreqd)/i).test(cleanedUrl)) {
                        //cleanedUrl = cleanedUrl.replace(/(\?|&).*/, '');
                        cleanedUrl = cleanedUrl.replace(/(\?|&|#).*/, '');
                    }
                }
                if (locType === 2) {
                    cleanedUrl = cleanedUrl.replace(/(\?|&|#).*/, '');
                }
                //if (locType === 2) {
                // locType 2 is referrer.

                // truncate to avoid excessive pixel length (2047 IE limit)
                // trim to 150 chars.
                //if (cleanedUrl.length > 150) {
                //	cleanedUrl = cleanedUrl.substring(0, 150) + '...';
                //}

                // extended to 400 chars. to capture longer search referrers with q=keyword
                // standard s_code trims to 255...
                //cleanedUrl = cleanedUrl.length > 400 ? cleanedUrl.substring(0, 400) + '...' : cleanedUrl;
                //}

                return cleanedUrl;
            };
            util.cleanGUID = function (loc) {
                var cleanedUrl = (loc || '')
                    .replace(util.guidRgx, '(GUID)') // remove OTP user GUID
                    .replace(util.guidBt, '(GUID)') // remove OTP user GUID
                    .replace(/\baccountGlobalId=\w{128}\b/g, '(GUID)') // remove OTP user GUID
                    .replace(/\guid=\w{32}\b/g, '(GUID)') // remove FSV user GUID
                    .replace(util.guidMid, '(MCMID)') //Remove adobe MCMID
                    .replace(util.guidWebMid, '(WEBMID)') //Remove webmid from universal link
                    .replace(util.wLiveId, '(WLID)') //Remove Other id from wLive
                    .replace(util.guidAid, '(AID)') //Remove adobe MCMID
                    .replace(util.dateUrl, '(DATE)') //Remove Date yyyy-mm-dd
                    .replace(util.latlong, '(GEO)') //remove latlong from URL
                    .replace(util.guidCompass, '(COMPASS)') //remove latlong from URL
                    .replace(util.guidAce, '(GUID)') //remove latlong from URL
                    .replace(/(state=)(.+)\&/g, '$1(GUID)&') //remove
                ;
                return cleanedUrl;
            }
            util.getLoc_ex = "util.getLoc() return full current URL for test or prod";
            util.getLoc = function () {
                return util.w_wtT.location || window.location;
            };
            util.defaultPage = /^\/((default|index)\.html?)?$/.test(util.getLoc().pathname) ? 'home' : ''; // filename to add when none exists (www home page)
            // default/initialised s.pageURL
            util.pageURL = util.cleanURL(util.getLoc().href, 1);

            // Use secure on https:
            util.ssl = util.getLoc().protocol === 'https:';
            // time parting
            util.timePart = function () {
                var dateNow = new Date(),
                dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                return dayNames[dateNow.getDay()] + ' ' + ('00' + dateNow.getHours()).slice(-2) + ':' + (dateNow.getMinutes() > 29 ? '30' : '00');
            };

            util.lowerCase_ex ="util.lowerCase(@val, @alt) \nlower case strings or (not set) if empty";
            util.lowerCase = function (val, alt) {
                var altVal = alt ? '(not set)' : '';
                return String(val || altVal).toLowerCase();
            };
            //util.lCase = util.lowerCase;
            util.clean_ex ="util.clean(@str) \nclean strings - trim and remove multiple spaces for consistency";
            util.clean = function (str) {
                return (str ? String(str) : '').replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
            };

            util.fixZero_ex = "util.fixZero(@val) return 'zero' for '0' value";
            util.fixZero = function (val) {
                return String(val) === '0' ? 'zero' : val;
            };
            // return filtered search terms and replace numbers if necessary
            util.srchTerm = function (val) {
                var srchTerm = val,
                lp = 8,
                hashes = '########'; //,hashes=new Array(lp).join('#')

                if (srchTerm) {
                    //srchTerm=s.w_clean(s.w_lCase(srchTerm));
                    srchTerm = util.lowerCase(srchTerm);
                    while (lp--) {
                        srchTerm = srchTerm.replace(new RegExp('(\\d{4}.?)\\d{' + (lp + 1) + ',}', 'g'), '$1' + hashes.substring(0, lp + 1));
                    }
                }
                //console.log(srchTerm);
                return srchTerm;
            };
            // cap numbers to reduce number of items for classifactions
            util.cap_ex = "util.cap(@item, @cap) \nif item value is greater than, or equal to cap, append '+'";
            util.cap = function (item, cap) {
                return item >= cap ? cap + '+' : item; // if item value is greater than, or equal to cap, append '+'. event50 (page load time) removes the '+', because the event value must be numeric.
            };

            // Helper function for standard numeric s.apl event call to reduce frequently used code
            util.addEvt = function (obj,evtName,evtValue){
                // allow text or numeric events to be passed
                obj['ev_'+ evtName] = evtValue ? evtValue : 1;
                //s2.events = s2.apl(s2.events, isNaN(evt) ? evt || '' : 'event' + evt, ',', 2);
            };
            util.addSerialiseEvt = function (obj,evtNumber,evtValue){
                // allow text or numeric events to be passed
                obj['&&events'] = evtValue ? evtNumber + ':'+evtValue : evtNumber + ':1';
                //s2.events = s2.apl(s2.events, isNaN(evt) ? evt || '' : 'event' + evt, ',', 2);
            };
            util.fl_ex = "util.fl(@str, @len) \nreturn substring of a given length";
            util.fl = function(x,l){
            return x?(''+x).substring(0,l):x
            };

            util.p_c = function (v, c) {
                var x = v.indexOf('=');
                return c.toLowerCase() == v.substring(0, x < 0 ? v.length : x).toLowerCase() ? v : 0;
            };

            util.pt_ex ="pt - runs function in f argument against list of \nvariables declared in x (delimited by d), with a as an optional \nargument to be included in f function call";
            util.pt=function(x,d,f,a){
                var t=x,
                z=0,
                y,
                r;
                while (t){
                    y = t.indexOf(d);
                    y = y < 0 ? t.length : y;
                    t = t.substring(0, y);
                    r = util.p_c(t, a);
                    if (r)
                        return r;
                    z += y + d.length;
                    t = x.substring(z, x.length);
                    t = z < x.length ? t : ''
                }
                return '';
            };
            util.isPageHidden_ex ="check if whole page is hidden/visible";
            util.isPageHidden = function (u) {
                return document.hidden || (document.msHidden || document.webkitHidden);
            };
            util.isHomePage_ex ="check if the page is home page";
            util.isHomePage = function (u) {
                return /^\/((default|index)\.html?)?$/.test(util.getLoc().pathname);
            };
            util.getPageName = function (u) {
                var v = u || String(util.pageURL),
                x = v.indexOf(':'),
                y = v.indexOf('/', x + 4),
                z = v.indexOf('?'),
                c = util.pathConcatDelim,
                e = util.pathExcludeDelim,
                g = util.queryVarsList,
                d = util.siteID,
                n = d || '',
                q = z < 0 ? '' : v.substring(z + 1),
                p = v.substring(y + 1, q ? z : v.length);
                z = p.indexOf('#');
                p = z < 0 ? p : util.fl(p, z);
                x = e ? p.indexOf(e) : -1;
                p = x < 0 ? p : util.fl(p, x);
                p += !p || p.charAt(p.length - 1) == '/' ? util.defaultPage : '';
                y = c || '/';
                while (p) {
                    x = p.indexOf('/');
                    x = x < 0 ? p.length : x;
                    z = util.fl(p, x);
                    if (!util.pt(util.pathExcludeList, ',', 'p_c', z)) {
                        n += n ? y + z : z;
                    }
                    p = p.substring(x + 1);
                }
                y = c || '?';
                while (g) {
                    x = g.indexOf(',');
                    x = x < 0 ? g.length : x;
                    z = util.fl(g, x);
                    z = util.pt(q, '&', 'p_c', z);
                    if (z) {
                        n += n ? y + z : z;
                        y = c || '&';
                    }
                    g = g.substring(x + 1);
                }
                return n;
            };

            /*
             * Plugin: getValOnce_v1.1
             */
            util.getValOnce = function (v, c, e, t) {
                // value, cookie, time amount, time type (mins/days)
                var a = new Date(),
                vv = v || '',
                cc = c || 'u_gvo',
                ee = e || 0,
                i = t == 'm' ? 60000 : 86400000,
                cd = util.cookieDomain(),
                k;
                k = util.cookieRead(c);
                if (vv) {
                    a.setTime(a.getTime() + ee * i);
                    util.cookieWrite(cc, vv, ee == 0 ? 0 : a,'/', cd);
                }
                return vv == k ? '' : vv;
            };
            /*
             * Plugin: getVisitNum - version 3.0
             */
            util.getVisitNum = function (tp, c, c2) {
                var e = new Date,
                cval,
                cvisit,
                cd = util.cookieDomain(),
                ct = e.getTime(),
                d;
                if (!tp) {
                    tp = 'm';
                }
                if (tp == 'm' || tp == 'w' || tp == 'd') {
                    eo = util.endof(tp),
                    y = eo.getTime();
                    e.setTime(y);
                } else {
                    d = tp * 86400000;
                    e.setTime(ct + d);
                }
                if (!c) {
                    c = 'u_vnum';
                }
                if (!c2) {
                    c2 = 'u_invisit';
                }
                cval = util.cookieRead(c);
                if (cval) {
                    var i = cval.indexOf('&vn='),
                    str = cval.substring(i + 4, cval.length),
                    k;
                }
                cvisit = util.cookieRead(c2);
                if (cvisit) {
                    if (str) {
                        e.setTime(ct + 1800000);
                        util.cookieWrite(c2, 'true', e, '/', cd);
                        return str;
                    } else {
                        return 'unknown visit number';
                    }
                } else {
                    if (str) {
                        str++;
                        k = cval.substring(0, i);
                        e.setTime(k);
                        util.cookieWrite(c, k + '&vn=' + str, e, '/', cd);
                        e.setTime(ct + 1800000);
                        util.cookieWrite(c2, 'true', e,'/', cd);
                        return str;
                    } else {
                        util.cookieWrite(c, e.getTime() + '&vn=1', e,'/', cd);
                        e.setTime(ct + 1800000);
                        util.cookieWrite(c2, 'true', e, '/', cd);
                        return 1;
                    }
                }
            };
            util.dimo = function (m, y) {
                var d = new Date(y, m + 1, 0);
                return d.getDate();
            };
            util.endof = function (x) {
                var t = new Date;
                t.setHours(0);
                t.setMinutes(0);
                t.setSeconds(0);
                if (x == 'm') {
                    d = util.dimo(t.getMonth(), t.getFullYear()) - t.getDate() + 1;
                } else if (x == 'w') {
                    d = 7 - t.getDay();
                } else {
                    d = 1;
                }
                t.setDate(t.getDate() + d);
                return t;
            };

            // serialisation value for events
            util.serial = function () {
                var serial = ('0000000' + Math.floor(Math.random() * (268435455 + 1)).toString(16)).slice(-7) + String(+new Date());
                //console.log('serial = ' + serial + ' ....... length ==== ' + serial.length);
                return String(serial).length === 20 ? serial : '';
            };

            // maintain serialisation for the same form/product/any item and reset after complete of same form
            util.serialise = function (serialKey, formStep) {
                var lStorKey = 'appmeasurement_aoSerials',
                keyName = serialKey && String(serialKey).replace(/\W/g, ''),
                serialStore = util.lStor('get', lStorKey),
                dateStamp = new Date(),
                serialDay = String(dateStamp.getFullYear()) + (dateStamp.getMonth() + 1) + dateStamp.getDate(), // serial memory persists for current day
                serialVisit = util.getVisitNum(365), // serial memory persists for current visit
                //serialRange = serialVisit >= 1 ? serialVisit : serialDay, // persist for visit if number returned, else day
                serialRange = serialDay + (serialVisit >= 1 ? serialVisit : 0), // persist for visit per day if number returned, else day + 0
                newSerial = util.serial(),
                setSerial = '';

                //console.log('serialStore = ' + serialStore);
                //console.log('newSerial = ' + newSerial);
                //console.log('serialDay = ' + serialDay);
                //console.log('serialVisit = ' + serialVisit);

                if (keyName && (formStep === 'start' || formStep === 'complete')) {
                    if (serialStore.indexOf(serialRange + ',') !== 0) {
                        // reset the store each day or if incorrect format
                        util.lStor('set', lStorKey, serialRange + ',' + keyName + '=' + newSerial + formStep);
                    }

                    // check if localStorage is working
                    serialStore = util.lStor('get', lStorKey);

                    if (serialStore) {
                        // if storage found, check if this thing has been hit already and get the serial
                        setSerial = serialStore.match(new RegExp(',' + keyName + '=(.{20}(start|complete)?)(?=,|$)'));
                        setSerial = setSerial && setSerial[1] ? setSerial[1] : '';

                        //console.log('setSerial 1 = ' + setSerial);

                        if (!setSerial) {
                            // if this thing is not serialised yet, add the details
                            util.lStor('set', lStorKey, serialStore + ',' + keyName + '=' + newSerial + formStep);
                            setSerial = newSerial;
                        } else {
                            // if complete step of a serialised form, set to complete if was previously start
                            if (formStep === 'complete' && setSerial.indexOf('start') === 20) {
                                util.lStor('set', lStorKey, serialStore.replace(new RegExp('(,' + keyName + '=.{20})(start)(?=,|$)'), '$1' + formStep));
                            }
                            // if start step of a previously completed serial form, set a new serial
                            if (formStep === 'start' && setSerial.indexOf('complete') === 20) {
                                util.lStor('set', lStorKey, serialStore.replace(new RegExp('(,' + keyName + '=)(.{20})(complete)(?=,|$)'), '$1' + newSerial + formStep));
                                setSerial = newSerial;
                            }

                            // if start/start or complete/complete, just trim the serial taken from the storage
                            setSerial = setSerial.slice(0, 20);

                            //console.log('setSerial 2 = ' + setSerial);
                        }
                    }
                }
                //console.log('setSerial 3 = ' + setSerial);
                //console.log('length = ' + setSerial.length);
                return String(setSerial).length === 20 ? setSerial : '';
            };
            util.lStor = function (action, key, data) {
                try {
                    if (action === 'set') {
                        if (/^reset$/i.test(data)) {
                            localStorage.removeItem(key);
                            //sessionStorage.removeItem(key); // zzzzz consider session storage only
                        } else {
                            if (typeof data !== 'string') {
                                try {
                                    data = JSON.stringify(data);
                                } catch (err) {
                                    //s.w_log(err);
                                    data = '';
                                }
                            }
                            localStorage.setItem(key, data);
                            //sessionStorage.setItem(key, data);
                        }
                        return true;
                    }
                    if (action === 'get') {
                        return localStorage.getItem(key) || '';
                        //return sessionStorage.getItem(key);
                    }
                } catch (err) {
                    //console.log(err);
                    return '';
                }
            };
            util.valReplace = function (initialVal, replaceDetails) {
                //console.log('initialVal = ' + initialVal);
                var prpty,
                //replaceSet = s.w_lStor('get', replaceDetails) || '[]',
                replaceSet = replaceDetails || [],
                replaceSetLength,
                replaceItem,
                resultName = initialVal;

                try {
                    if (typeof replaceSet === 'string') {
                        replaceSet = JSON.parse(replaceSet);
                    }
                } catch (err) {
                    //s.w_log(err);
                    replaceSet = [];
                }
                //console.log('replaceSet = ' + replaceSet);
                //console.log(replaceSet);

                replaceSetLength = replaceSet.length;

                for (prpty = 0; prpty < replaceSetLength; prpty++) {
                    //replaceItem = replaceSet[prpty].split('\r');
                    replaceItem = replaceSet[prpty];

                    //console.log('replaceItem = ' + replaceItem);
                    //console.log('replaceItem.length = ' + replaceItem.length);

                    //if (replaceItem.length === 3) {
                    if (replaceItem.exp) {
                        //resultName = resultName.replace(new RegExp(replaceItem[0], replaceItem[1]), replaceItem[2]);
                        resultName = resultName.replace(new RegExp(replaceItem.exp, replaceItem.flags || ''), replaceItem.subs || '');

                        //console.log('new RegExp(replaceItem[0], replaceItem[1]) = ' + new RegExp(replaceItem[0], replaceItem[1]));
                        //console.log('re = ' + new RegExp(replaceItem.exp, replaceItem.flags || '') + ', repl = ' + replaceItem.subs || '');
                        //console.log('resultName = ' + resultName);
                    }
                }

                //console.log('resultName = ' + resultName);
                return resultName;
            };
            util.getQueryParam ="util.getQueryParam(@parameters, @delimiter, @url, @startFromHash) \nReturn a Query Param value(s)";
            util.getQueryParam = function (parameters, delimiter, url, startFromHash) {
                var params = parameters.split(','),
                delim = delimiter || '',
                //ABU loc = String(url === 'f' ? s2.gtfs().location : url || (s2.w_getLoc().href || (s2.pageURL || s2.wd.location))), // 'f' from original function - used in case of frames?
                loc = String(url|| (util.getLoc().href || window.location)),
                lp = 0,
                len = params.length,
                rgx,
                rgxStart = startFromHash === 1 ? '#(?:.*?&)?' : '(?:\\?|&|;|#)',
                val,
                values = [];

                //console.log('delim = ' + delim);
                //console.log('loc = ' + loc);
                //console.log('startFromHash = ' + startFromHash);

                if (parameters) {
                    for (lp = 0; lp < len; lp++) {
                        rgx = new RegExp(rgxStart + params[lp] + '=(.*?)(?=\\?|&|;|#|/|$)', 'i');
                        val = rgx.exec(loc);

                        //console.log(params[lp] + ' = ' + (val && val[1]));

                        if (val) {
                            values.push(decodeURIComponent(val[1].replace(/\+/g, '%20')));
                        }
                    }
                }
                return values.join(delim);
            };
            // convert prodVal into an array if it was only a string (single product or comma separated)
            util.prodArr = function (prodVal) {
                var prodTemp,
                prodArr,
                lp = 0,
                len;

                if (prodVal && typeof prodVal !== 'object') {
                    //prodTemp = String(prodVal).replace(/^,+|,+$/g,'').split(',');
                    prodTemp = String(prodVal).split(',');
                    prodArr = [];
                    for (len = prodTemp.length; lp < len; lp++) {
                        // push individual product objects into prodArr array
                        if (prodTemp[lp]) {
                            prodArr.push({
                                'prod' : prodTemp[lp]
                            });
                        }
                    }
                } else {
                    prodArr = prodVal || [];
                }
                return prodArr;
            };
            util.moduleLookup = function (mods, modKey) {
                // may be simpler if lookup could be passed directly as object, but following code will turn a string (key=name[,key=name]) into an object
                //var modKey = (pageDetails.moduleKey || '').split(','),
                var lp,
                len,
                moduleFriendlyLookup = {},
                moduleFriendlyNames = [];

                for (lp = 0, len = modKey.length; lp < len; lp++) {
                    moduleFriendlyLookup[modKey[lp].split('=')[0]] = modKey[lp].split('=')[1];
                }
                for (lp = 0, len = mods.length; lp < len; lp++) {
                    // dont add module if value is blank (key=,key=...)
                    //if (moduleFriendlyLookup[mods[lp]] !== '') {
                    // if key has value or is undefined, use value or default to key name
                    //	moduleFriendlyNames.push(moduleFriendlyLookup[mods[lp]] || mods[lp]);
                    // track modules by moduleKey opt-in only. (previously module name captured by default for modeuls without key)
                    if (moduleFriendlyLookup[mods[lp]]) {
                        moduleFriendlyNames.push(moduleFriendlyLookup[mods[lp]]);
                    }
                }
                moduleFriendlyNames = moduleFriendlyNames.join(',');
                //console.log('moduleFriendlyNames = '+moduleFriendlyNames);
                // add ',+' to indicate more than 100 chars of module string was detected (including 'list,'/'grid,') to avoid truncating when many values
                if (moduleFriendlyNames.length > 95 && moduleFriendlyNames.indexOf(',') > -1) {
                    moduleFriendlyNames = moduleFriendlyNames.substring(0, moduleFriendlyNames.lastIndexOf(',', 93)) + ',+';
                }
                return moduleFriendlyNames;
            };
            util.amntBnds_ex = "util.amntBnds(@type, @Value) \nReturns bands of any value";
            util.amntBnds = function (type, transactionValue) { // type not required? all use the same bands
                var bands,
                band = {
                    'range' : type +':NaN', // default to unknown currency/value
                    'avg' : 0 // default
                },
                lp;
                //transactionDetails=(transactionValue||'').match(/(^\D*)(.*)/), // Values may be like '1200', '$123.45' ($=AUD), 'USD123.45', 'EUR123' etc.
                //currency,
                //amount;

                //currency=(transactionDetails[1]||'AUD').toUpperCase(); // default to AUD if currency missing
                //if(currency==='$'){ // default to AUD if currency prefix = $
                //	currency='AUD';
                //}
                //s.currencyCode=currency; // how to ensure reverts to AUD and any currency specified is used for all/appropriate items in request? i.e. not overwritten if set

                //amount=(transactionDetails[2]||'x'); // make amount 'x' (NaN - Not a Number) and exit function if no value set, instead of defaulting to zero and looping through bands
                //if(isNaN(amount)){
                if (isNaN(transactionValue)) {
                    //band.range=type+':'+currency+':'+'NaN';
                    //band.range=type+':NaN';
                    //band.avg=0;
                    return band;
                }
                //amount=Math.round(amount)/1000;
                transactionValue = Math.round(transactionValue) / 1000;

                bands = {
                    '0' : {
                        min : -1,
                        max : 0,
                        avg : 0
                    },
                    '0-100' : {
                        min : 0,
                        max : 0.1,
                        avg : 0.05
                    },
                    '100-500' : {
                        min : 0.1,
                        max : 0.5,
                        avg : 0.3
                    },
                    '500-1K' : {
                        min : 0.5,
                        max : 1,
                        avg : 0.75
                    },
                    '1K-2K' : {
                        min : 1,
                        max : 2,
                        avg : 1.5
                    },
                    '2K-5K' : {
                        min : 2,
                        max : 5,
                        avg : 3.5
                    },
                    '5K-10K' : {
                        min : 5,
                        max : 10,
                        avg : 7.5
                    },
                    '10K-20K' : {
                        min : 10,
                        max : 20,
                        avg : 15
                    },
                    '20K-30K' : {
                        min : 20,
                        max : 30,
                        avg : 25
                    },
                    '30K-50K' : {
                        min : 30,
                        max : 50,
                        avg : 40
                    },
                    '50K-100K' : {
                        min : 50,
                        max : 100,
                        avg : 75
                    },
                    '100K-150K' : {
                        min : 100,
                        max : 150,
                        avg : 125
                    },
                    '150K-200K' : {
                        min : 150,
                        max : 200,
                        avg : 175
                    },
                    '200K-250K' : {
                        min : 200,
                        max : 250,
                        avg : 225
                    },
                    '250K-300K' : {
                        min : 250,
                        max : 300,
                        avg : 275
                    },
                    '300K-400K' : {
                        min : 300,
                        max : 400,
                        avg : 350
                    },
                    '400K-500K' : {
                        min : 400,
                        max : 500,
                        avg : 450
                    },
                    '500K-600K' : {
                        min : 500,
                        max : 600,
                        avg : 550
                    },
                    '600K-700K' : {
                        min : 600,
                        max : 700,
                        avg : 650
                    },
                    '700K-800K' : {
                        min : 700,
                        max : 800,
                        avg : 750
                    },
                    '800K-1M' : {
                        min : 800,
                        max : 1000,
                        avg : 900
                    },
                    '1M+' : {
                        min : 1000,
                        max : '+',
                        avg : 1000
                    }
                };

                //}
                // determine band
                for (lp in bands) {
                    if (bands.hasOwnProperty(lp)) {
                        //if(amount>bands[lp][0] && (bands[lp][1]==='+'?true:amount<=bands[lp][1])){
                        //if(amount>bands[lp][0][0] && (bands[lp][0][1]==='+'?true:amount<=bands[lp][0][1])){
                        if (transactionValue > bands[lp].min && (bands[lp].max === '+' ? true : transactionValue <= bands[lp].max)) {
                            //band.range=type+':'+currency+lp.replace(/-/,'-$');
                            //band.range=type+':'+currency+':'+lp;
                            band.range = type ? (type + ':' + lp) : lp;
                            band.avg = bands[lp].avg * 1000;
                            break;
                        }
                    }
                }
                return band;
            };
            util.ageBnds_ex = "util.amntAge(@text, @Value) \nReturns bands of any value";
            util.ageBnds = function (txt, age) { // type not required? all use the same bands
                var bands,
                band = {
                    'range' : txt + ':NaN' // default to unknown currency/value
                },
                lp;
                //amount=(transactionDetails[2]||'x'); // make amount 'x' (NaN - Not a Number) and exit function if no value set, instead of defaulting to zero and looping through bands
                //if(isNaN(amount)){
                if (isNaN(age)) {
                    //band.range=type+':'+currency+':'+'NaN';
                    //band.range=type+':NaN';
                    //band.avg=0;
                    return band;
                }
                //amount=Math.round(amount)/1000;
                //transactionValue = Math.round(transactionValue) / 10;

                bands = {
                    '18<' : {
                        min : 0,
                        max : 18
                    },
                    '18-30' : {
                        min : 19,
                        max : 30
                    },
                    '31-40' : {
                        min : 31,
                        max : 40
                    },
                    '41-50' : {
                        min : 41,
                        max : 50
                    },
                    '61-70' : {
                        min : 61,
                        max : 70
                    },
                    '71-80' : {
                        min : 71,
                        max : 80
                    },
                    '80+' : {
                        min : 81,
                        max : 200
                    }
                };

                for (lp in bands) {
                    //console.log(bands.hasOwnProperty(lp));
                    if (bands.hasOwnProperty(lp)) {
                        //if(amount>bands[lp][0] && (bands[lp][1]==='+'?true:amount<=bands[lp][1])){
                        //if(amount>bands[lp][0][0] && (bands[lp][0][1]==='+'?true:amount<=bands[lp][0][1])){
                            //console.log('age:' + age + ' (' + bands[lp].min + bands[lp].max + ')')
                        if (age > bands[lp].min && age <= bands[lp].max) {
                            //band.range=type+':'+currency+lp.replace(/-/,'-$');
                            //band.range=type+':'+currency+':'+lp;
                            band.range = txt ? (txt + ':' + lp) : lp;
                            break;
                        }
                    }
                }
                return band;
            };
            util.setFormFieldVar = function (sitename, formname, fieldobj) { //TODO Make this more ganaric
                var fieldVar = '', formatedVal ='';
                if (typeof(fieldobj) == "string"){
                    fieldVar = fieldobj;
                } else {
                    for (lp in fieldobj){
                        if (fieldobj.hasOwnProperty(lp)) {
                            //console.log( lp + " == "+ fieldobj[lp] + '( NaN:'+ isNaN(fieldobj[lp])+')');
                            formatedVal =  isNaN(fieldobj[lp]) ? fieldobj[lp] : (lp.match(/age/gi) ? util.ageBnds('',fieldobj[lp]).range : util.amntBnds('', fieldobj[lp]).range);
                            //console.log(lp +':'+ formatedVal +'|\n');
                            fieldVar = fieldVar + lp +':'+ formatedVal +'|'
                            //console.log(fieldVar);
                        }
                    }
                }
                fieldVar = fieldVar.replace(/propertyType/ig, 'pType')
                        .replace(/propertyPurpose/ig, 'pPurp')
                        .replace(/firstHomeBuyer/ig, 'fHB')
                        .replace(/buyingStage/ig, 'bStg')
                        .replace(/borrowAmt/ig, 'bAmt')
                        .replace(/depositAmt/ig, 'dAmt')
                        .replace(/repaymentType/ig, 'rType')
                        .replace(/totalIncomeAmt/ig, 'incAmt')
                        .replace(/totalExpenseAmt/ig, 'expAmt')
                        .replace(/totalLiability/ig, 'liaAmt')
                        .replace(/loanAmtOffered/ig, 'loanAmt')
                        .replace(/savingsBank/ig, 'savBank')
                        .replace(/savedAmt/ig, 'savAmt')
                        .replace(/propertyAddress/ig, 'pAddr')
                        .replace(/estPropertyValue/ig, 'epVal')
                        .replace(/\|$/g, '')

                var formFieldPrefix = (sitename?sitename: '') + (formname? (':' + formname):'');
                return (formFieldPrefix ? (formFieldPrefix + '_'): '') + fieldVar;
            }
            util.setInteractionVars = function (dataLayer) {
                var contextVar = {},
                    isPropertyCalculator,
                    //authored values
                    calculatorType = dataLayer.calculatorType,
                    calculatorName = dataLayer.calculatorName,
                    /*
                    dyanamic values - user-input/selection
                    divided into four categors
                    Amount Variables --> loanAmount & depositAmount
                    Term Variables --> loanTerm & depositTerm
                    Product Variables --> prodSelected
                    Property Variables --> borrowingPurpose, firstHomeBuyer, propertyType, loanType, propertyValue
                     */
                    //Amount Variables
                    loanAmount = dataLayer.loanAmount||'',
                    depositAmount = dataLayer.depositAmount||'',
                    transactionAmount = dataLayer.transactionAmount || '', // added to include eftpos1 calculators all brands

                    //Term Variables
                    loanTerm = dataLayer.loanTerm||'',
                    depositTerm = dataLayer.depositTerm||'',
                    //Product Variables
                    prodSelected = dataLayer.prodSelected||'',
                    //Property Variables
                    borrowingPurpose = dataLayer.borrowingPurpose||'',
                    firstHomeBuyer = dataLayer.firstHomeBuyer||'',
                    propertyType = dataLayer.propertyType||'',
                    loanType = dataLayer.loanType||'',
                    propertyValue = dataLayer.propertyValue||'',
                    //category values
                    amountVars,
                    termVars,
                    productVars,
                    propertyVars,
                    //amountBand
                    amtBand =util.amntBnds,
                    amtRange,
                    // calculator name (eVar62)
                    calcDetails,
                    calcName = (calculatorType ? calculatorType:'(not set)') + ':' + (calculatorName ? calculatorName:'(not set)');

                // band for property range if it exists
                if(propertyValue){
                    prptyValRange = amtBand('', propertyValue);
                    propertyValue = prptyValRange.range;
                }
                //console.info('calcName', calcName);
                //chcek if propertyVar is valid for the current calculator
                isPropertyCalculator = borrowingPurpose || firstHomeBuyer || propertyType || loanType || propertyValue;
                //console.info('isPropertyCalc', isPropertyCalculator);
                //console.info('productVars', productVars);
                if (isPropertyCalculator) {
                    propertyVars = 'PROP_' + (borrowingPurpose ? '' + borrowingPurpose : '') + (firstHomeBuyer ? ';' + firstHomeBuyer : '') + (propertyType ? ';' + propertyType : '') + (loanType ? ';' + loanType : '') + (propertyValue ? ';' + propertyValue : '');
                }
                if (prodSelected) {
                    productVars = 'PROD_' + prodSelected;
                }
                if (loanAmount || depositAmount || transactionAmount) {
                    var amtToRange;
                    amtToRange = loanAmount || depositAmount || transactionAmount;
                    amtRange = amtBand('', amtToRange);
                    amtRange = amtRange.range;
                    //console.info('amtRange', amtRange);
                    amountVars = 'AMNT_' + amtRange;
                    //console.info('amountVars', amountVars);
                }
                if (loanTerm || depositTerm) {
                    termVars = 'TERM_' + loanTerm || depositTerm;
                    //console.info(termVars);
                }

                calcDetails = 'calc' + '_' + (amountVars ? '|' + amountVars : '') + (termVars ? '|' + termVars : '') + (productVars ? '|' + productVars : '') + (propertyVars ? '|' + propertyVars : '') + '|';

                contextVar = {
                    'amountVar': amountVars,
                    'termVar': termVars,
                    'productVar': productVars,
                    'propertyVar': propertyVars,
                    'calculatorName': calcName,
                    'calculatorDetails': calcDetails,
                };
                return contextVar;
            };
            /*---- wbg|form|rq14 ----
                Application Status: used to track the formcomplete status
                used only for STP form when applicationStatus array is available on complete step
                "formIsSTP": "true",
                "applicationStatus": [
                    {
                        "accountStatus": "opened",
                        "profileStatus": "created",
                        "verificationStatus": "idv",
                        "exceptionCode": "0001"
                    }
                ],

            */
            util.appStatusSetup = function (status) {
                if(Array.isArray(status)){
                    var formStatusArray = status,
                        finalVal = [],
                        formStatusDetail;
                    for (var _i = 0, formStatusArray_1 = formStatusArray; _i < formStatusArray_1.length; _i++) {
                        var items = formStatusArray_1[_i],
                            frmStVal;
                        frmStVal = 'accStatus:' + items.accountStatus + '|' + 'proStatus:' + items.profileStatus + '|' + 'verStatus:' + items.verificationStatus + '|' + 'exceCode:' + items.exceptionCode;
                        finalVal.push(frmStVal);
                    }
                    //console.info(finalVal);
                    formStatusDetail = finalVal.join(';');
                    return formStatusDetail;
                }else{
                    return JSON.stringify(status).replace(/(\[|\]|\{|\}|\'|\")/ig,'').replace(/\,/ig,'|');
                }
                //console.info('stringVal = ', formStatusDetail);
            };
            /*---- wbg|form|rq12 ----
                TransactionID:multiple transactionID
                Convention: new property in dataLayr "appReference" is an array captures multiple tranactionID,
                This array is passed into util.createTransID function to concatenate transID to create a single transactionID
                Used in application|enquiry|quote start or complete steps
            */
            util.createTransID = function (prodArray) {
                var transIDArray = prodArray,
                    finalVal = [],
                    combinedtransID;
                for (var _i = 0, transIDArray_1 = transIDArray; _i < transIDArray_1.length; _i++) {
                    var items = transIDArray_1[_i],
                        transIDVal;
                    transIDVal = items.prod + '_' + items.Id;
                    finalVal.push(transIDVal);
                }
                //console.info(finalVal);
                combinedtransID = finalVal.join(';');
                return combinedtransID;
            };

            /******** util.js [end]********/
            /******** Don't set any variables after this line ********/

            // for success messages etc. option to use pageDetails process, but send as link
            //if(pageDetails.trackAsLink==='true'){
            /*
            if (/true/i.test(pageDetails.trackAsLink)) {
                //console.log('Tracking as link - '+sPageNameTemp);
                // prevent looping
                delete pageDetails.trackAsLink;

                // make tracking request as link instead of page
                // filtered pageURL or custom passed property into href of custom link 'location' object
                s2.lnk = {
                    href : pageDetails.s_linkUrl || s2.pageURL
                };
                s2.w_trackLinkCustom(true, 'D="page:"+pageName', 'o', s2); // default values if no overrides set in pageDetails

                // abort initial page tracking
                s2.abort = true;
            }

            // set override values for trackLinkCustom and 'trackAsLink' calls, before final s_ overrides
            for (prpty in pageDetails) {
                if (pageDetails.hasOwnProperty(prpty)) {
                    if (/^temp_/.test(prpty)) {
                        //ABU sq[prpty.replace(/^temp_/, '')] = pageDetails[prpty];
                        s2[prpty.replace(/^temp_/, '')] = pageDetails[prpty];
                        // always remove all temp_ overrides - they are only for s.w_trackLinkCustom and shouldnt persist on the page (in s.w_tempPageDetails)
                        delete pageDetails[prpty]; // only allow overrides to fire once, otherwise they persist to all subsequent calls (links, single-page-form pages etc.) // may not need to delete these as obj is temp, not on page... Needed to delete these for normal links following full custom links (the custom _temp details remain in the temp object for page name etc.) zzzzz test this change
                    }
                }
            }
            for (prpty in pageDetails) {
                if (pageDetails.hasOwnProperty(prpty)) {
                    if (/^s_/.test(prpty)) {
                        s2[prpty.replace(/^s_/, '')] = pageDetails[prpty];
                        if (prpty !== 's_pageName') {
                            // remove all overrides except s_pageName (to identify page name for custom links). Other valus may impact link tracking vars. zzzzz test this change
                            delete pageDetails[prpty]; // only allow overrides (e.g. s_abort) to fire once, otherwise they persist to all subsequent calls (links, single-page-form pages etc.) // may not need to delete these as obj is temp, not on page
                        }
                        trackingOverrideEnabled = true;
                    }
                }
            }
            if (trackingOverrideEnabled) {
                // append override when in use
                s2.prop39 += '+" (with override)"';
            }

            // set timers based on events being set/passed by logic or overrides (moved to this block to capture ALL overrides)
            s2.eVar31 = getTimeToCmplt(evtTimer(21, 22), 's_app_s_c', 365); // app start - complete
            //s.eVar32 = getTimeToCmplt(evtTimer(22, 47), 's_app_c_l', 365); // app complete - first login ... first login event removed...
            s2.eVar33 = getTimeToCmplt(evtTimer(46, 22), 's_app_l_c', 365); // login - app complete. eVar33 not required to be set - use events to determine timers

            // getTimeToComplete functions like getValOnce and will clear the timers as soon as the respective events are seen in s.events. The values should only be retrieved if they will actually be sent (i.e. not dom click or s.abort)
            //console.log('s.events = ' + s.events);
            //console.log('s.eVar32 = ' + s.eVar32);

            //s.prop31 = s.eVar31 ? 'D=v31' : '';
            //s.prop32 = s.eVar32 ? 'D=v32' : '';
            //s.prop33 = s.eVar33 ? 'D=v33' : '';
            s2.prop31 = dVar(31);
            //s.prop32 = dVar(32);
            s2.prop33 = dVar(33);

            // set logged in status based on event being set/passed by logic or override
            if (/\bevent46\b/i.test(s2.events)) {
                s2.eVar40 = 'logged in';
            }
            */
            // change any s object values async (in order of calls)
            //s.w_changeIf(pageDetails, true); // zzzzz enable to change any values with replace etc. for weird issues that may come up.



            /* ABU Moving it to analytics.js
            // Brand specific
            if (/(?:^|\.)banksa\.com\.au$/i.test(util.getLoc().hostname)) {
                pageBrand = 'bsa';
                pageSite = /(.+)(?:\.bankofmelbourne\.com\.au$)/i.exec(util.getLoc().hostname); // || [];
                pageSite = pageSite ? pageSite[1] : notSet;
            }
            // Brand specific
            if (/(?:^|\.)bankofmelbourne\.com\.au$/i.test(util.getLoc().hostname)) {
                pageBrand = 'bom';
                pageSite = /(.+)(?:\.bankofmelbourne\.com\.au$)/i.exec(util.getLoc().hostname); // || [];
                pageSite = pageSite ? pageSite[1] : notSet;
            }

            // Brand specific
            if (/(?:^|\.)stgeorge\.com\.au$/i.test(util.getLoc().hostname)) {
                pageBrand = 'stg';
                pageSite = /(.+)(?:\.stgeorge\.com\.au$)/i.exec(util.getLoc().hostname); // || [];
                pageSite = pageSite ? pageSite[1] : notSet;
            }

            // Brand specific
            if (/(?:^|\.)bt\.com\.au$/i.test(util.getLoc().hostname)) {
                pageBrand = 'bt';
                pageSite = /(.+)(?:\.bt\.com\.au$)/i.exec(util.getLoc().hostname); // || [];
                pageSite = pageSite ? pageSite[1] : notSet;
            }

            //if (/(?:^|\.)westpac\.com\.au$/i.test(fullLocHostname) || (window.s_w_wbcrgx && window.s_w_wbcrgx.test(fullLocHostname))) {
            if (/(?:^|\.)westpac\.com\.au$/i.test(util.getLoc().hostname)) {
                pageBrand = 'wbc';
                pageSite = /(.+)(?:\.westpac\.com\.au$)/i.exec(util.getLoc().hostname); // || [];
                pageSite = pageSite ? pageSite[1] : notSet;

                // OTP secure, oregon secure forms, oregon secure domino forms -
                //if(pageSite === 'banking' && /^\/+secure\/+banking(?:\/|$)/i.test(fullLocObj.pathname)){
                //if (/\bbanking\b/i.test(pageSite) && /^(?:\/secure\/|\/cust\/wps\/(?:my)?portal\/wol\/)/i.test(fullLocObj.pathname)) {
                if ((/\bbanking\b/i).test(pageSite) && (/^(?:\/secure\/|\/cust\/wps\/(?:my)?portal\/wol\/|\/oregon\/[^\/]+?\/wol\/)/i).test(util.getLoc().pathname)) {
                    pdInSession = true;
                    //pageStatus = 'secure'; // extended to in/out of session for all platforms and for formType
                }

                // OTP SameView staff emulation mode
                if ((/net$/i).test(pageSite) && (/\/emulationbanking\b/i).test(util.getLoc().pathname)) {
                    pdInSession = true;

                    // Change pageSite to 'banking' to consolidate OTP page names when in emulation in prod (necessary due to different domains)
                    if (s3.w_prod) {
                        pageSite = 'banking';
                    }
                }

                //if(/online/i.test(pageSite)){
                //if(pageSite === 'online'){
                if ((/\bonline\b/i).test(pageSite) && (/^(?:\/dforms\/forms\/secure\/|\/cust\/wps\/(?:my)?portal\/wol\/|\/oregon\/[^\/]+?\/wol\/)/i).test(util.getLoc().pathname)) {
                    pdInSession = true;
                }

                var corpSubDomain = /(.+)(?:\.corp(?:.*?)\.westpac\.(?:com\.au|co\.nz)$)/i.exec(util.getLoc().hostname);
                    if (corpSubDomain) {
                        pageSite = 'corp';
                        //pageDetails.subSite = corpSubDomain[1];
                        pdSubSite = corpSubDomain[1];
                        // A custom subSiteSeparator may be used for concatenating subSite into pageName in s_code (Westpac uses default value of hyphen)
                        pageDetails.subSiteSeparator = ':';
                    }

            }*/
            /******** AppMeasurement.js [start]********/
            var digital={},
                util = window.util || {},
                pdInSession = false, // if page is in secure/unsecure area
                pageDetails = window.pageDetails || {};

            //initialize AppMeasurement
            var s3_account="wbg-banking-dev"
            /******** PROD overrides ********/
            /****WBC****/
            var s3=s3_gi(s3_account)
            // prod/brand/site settings etc. from analytics js files
            s3.w_config = ((window[window['WBGAnalyticsObject']] || {}).config) || {}; // leave this name as string to prevent renaming in obfuscation. do not change. confirm name if obfuscated twice.
            s3.w_wtT = window.testTracking || {};
            //s3.w_prod = (/^(?:www|banking|forms|online|businessonline|search|hlc1|locator)\.westpac\.com\.au$/i).test(location.hostname) || ((/^gs.{8}net\.westpac\.com\.au$/i).test(location.hostname) && (/RM\/emulationbanking\b/i).test(location.pathname)) || s3.w_config.prod; // with emulation mode details, regex excludes SIT SameView hostname
            //s3.w_prod = (/^ibanking\.(stgeorge|bankofmelbourne|banksa)\.com\.au$/i).test(location.hostname) ||  s3.w_config.prod; // STG/BOM/BSA compass
            s3.w_prod = (/^(ibanking|eforms|www.ui)\.(stgeorge|bankofmelbourne|banksa)\.com\.au$/i).test(location.hostname)||(/^(?:www|banking|forms|online|businessonline|search|hlc1|locator|www.ui)\.westpac\.com\.au$/i).test(location.hostname) || ((/^gs.{8}net\.westpac\.com\.au$/i).test(location.hostname) && (/RM\/emulationbanking\b/i).test(location.pathname)) || s3.w_config.prod;

            s3.w_isProd = s3.w_config.findProd;
            if(s3.w_isProd){
                s3.w_prod = (/^prod$/i).test(pageDetails.siteEnv);
            }
            if (s3.w_prod) {
                s3_account ="wbg-banking-prd"
                s3.sa(s3_account);
            }
            //s3.w_log('VisitorID.config',visitorConfig)
            var customVisitorID = util.getQueryParam('MCMID', '', util.getLoc().href) || util.cookieRead('MCMID')
            s3.visitor=Visitor.getInstance("3A4B7BAF56F01DA67F000101@AdobeOrg")
        //	if(customVisitorID){
        //		s3.visitor.setMarketingCloudVisitorID(customVisitorID);
        //	}
            /************************** CONFIG SECTION **************************/
            /* You may add or alter any code config here. */
            s3.w_codeVers = "20240313 prd" //util U:0.24 visitor ID 4.0 required
            s3.charSet="UTF-8"
            s3.cookieDomainPeriods=3
            /* Conversion Config */
            s3.currencyCode="AUD"
            /* Link Tracking Config */
            //s3.trackDownloadLinks=true // use custom tracking for downloads and product disclosures. undeclared is false (default)
            //s3.trackExternalLinks=true // use custom tracking for social links etc. undeclared is false (default)
            s3.trackInlineStats=true
            s3.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
            //common Settings
            //s3.linkInternalFilters="javascript:,tel:,mailto:," + util.getLoc().hostname
            //WBC Settings
            s3.linkInternalFilters="javascript:,tel:,mailto:,movingtoaustralia.westpac.asia,westpac.com.au,movingtoaustralia.westpac.co.nz,movingtoaustralia.westpac.co.uk," + util.getLoc().hostname
            //STG Settings
            //s3.linkInternalFilters="javascript:,tel:,mailto:,stgeorge.com.au,stgeorge.com,sgb.com.au,stgeorgebank.com.au,einsure.com.au,fxmoneyonline.com.au," + util.getLoc().hostname
            //BOM Settings
            //s3.linkInternalFilters="javascript:,tel:,mailto:,bankofmelbourne.com.au," + util.getLoc().hostname
            //BSA Settings
            //s3.linkInternalFilters="javascript:,tel:,mailto:,banksa.com.au," + util.getLoc().hostname
            //BT Settings
            //s3.linkInternalFilters="javascript:,tel:,mailto:,bt.com.au,panorama.com.au,panoramainvestor.com.au,panoramaadviser.com.au,btadvisercentre.com.au,westpac.com.au,towerswatson.com," + util.getLoc().hostname
            //WBC/STG/BOM/BSA Settings
            s3.linkInternalFilters="javascript:,tel:,mailto:,movingtoaustralia.westpac.asia,westpac.com.au,movingtoaustralia.westpac.co.nz,movingtoaustralia.westpac.co.uk,stgeorge.com.au,bankofmelbourne.com.au,banksa.com.au,stgeorge.com,sgb.com.au,einsure.com.au,fxmoneyonline.com.au," + util.getLoc().hostname
            s3.linkLeaveQueryString=false
            s3.linkTrackVars="None"
            s3.linkTrackEvents="None"
            //Abu zzz
            s3.w_ltv = 'server,channel,eVar1,prop1,eVar6,prop6,eVar7,prop15,prop25,eVar25,prop35,eVar35,prop39,prop69,eVar21'; // default vars required in all click tracking functions (linkTrackVars)

            /* uncomment below to use doPlugins */
            s3.usePlugins=true
            function s3_doPlugins(s3) {
            /* ----wbg|form|rq16---
            do not delete used to track newformupdates version
            newformupdates:version:0.06
            */

            //var _tempContext = {},
            //digital={},
            //pageBrand='',
            //pageSite='',
            digital ={};
            var trackingPage = !s3.linkType;
                //pageDetails = trackingPage ? pageDetails : s3.w_queue.shift(); // links need to get details from any previous page call if available. In OTP window.pageDetails is not necessarily what was passed to trackPage()
            var notSet = '(not set)', // to identify missing values
            findBrand = s3.w_config.findBrand|| '',
            findSite = s3.w_config.findSite || '',
            lowerCaseVal = util.lowerCase,
            fullLocObj = util.getLoc(), // update each call
            cleanText = util.clean,
            appendEvent = util.addEvt,
            //dVar = s3.w_dVar,
            // store copy in s object for clicks etc to refer to previous details (pageName etc.)
            pageDetails = trackingPage ? s3.w_queue.shift()|| window.pageDetails : (util.w_wtT.pageDetails || window.digitalData || window.pageDetails || {}),
            pageBrand =(findBrand? pageDetails.siteBrand:(s3.w_config.brand || notSet)),
            pageSite = (findSite? pageDetails.siteName:(s3.w_config.site || notSet)),
            pdPageName = cleanText(pageDetails.pageName|| ''),
            pdPageProperty = lowerCaseVal(cleanText(pageDetails.pageProperty)),
            pdDialogTitle = cleanText(pageDetails.dialogTitle), // captures titles of dialogs in OTP and CTRT code for dynamic campaign landing page. Value is appended to end of page name.
            sPageNameTemp = '',
            pageTypeAlt, // for tracking other page types, and applying a rule to classify other pages
            pdProductID = util.prodArr(pageDetails.productID || ''), // products string converted into array
            paymentProduct, // for products string where required
            pdFormName = lowerCaseVal(cleanText(pageDetails.formName)),
            pdFormType = lowerCaseVal(cleanText(pageDetails.formType)),
            pdFormData = lowerCaseVal(cleanText(pageDetails.formData)),
            pdnewFormName = lowerCaseVal(cleanText(pageDetails.newFormName)),
            //pdnewFormName =lowerCaseVal(cleanText((pageDetails.newFormName||pageDetails.formName)||'')),
            pdJourneyType = lowerCaseVal(cleanText(pageDetails.journeyType)),
            pdAccountType = lowerCaseVal(cleanText(pageDetails.accountType)),
            pdBusinessType = lowerCaseVal(cleanText(pageDetails.businessType)),
			pdRoleType = lowerCaseVal(cleanText(pageDetails.roleType)),
			pdProfileType = lowerCaseVal(cleanText(pageDetails.profileType)),
			pdFormIsStp = lowerCaseVal(cleanText(pageDetails.formIsSTP)),
            pdSiteName = lowerCaseVal(cleanText(pageDetails.siteName)),
            pdFormVariant = lowerCaseVal(cleanText(pageDetails.formVariant)),
            pdFormMilestone = lowerCaseVal(cleanText(pageDetails.formMilestone)),
            journeyTypeOverride,
            pdAppStatus = pageDetails.applicationStatus,
            //pdInSession = false, // if page is in secure/unsecure area
            pdEexternalSiteName = lowerCaseVal(cleanText(pageDetails.externalSiteName)),
            pdSelfserviceDetails = lowerCaseVal(cleanText(pageDetails.selfserviceDetail)), // for selfservice details tracking
            pdTransactionType = lowerCaseVal(pageDetails.transactionType), // for transactions
            pdTransactionAmount = pageDetails.transactionAmount || '', // for transactions, value should be in nnnn[.nn] format - without thousand separator. decimal is optional, but should be separated by dot (period)
            transactionMerch = [], // for transactions - quantity + details etc.
            pdTransactionQty = pageDetails.transactionQty || '', // for transactions - multiple payments quantity
            pdTransactionDetails = lowerCaseVal(cleanText(pageDetails.transactionDetails || '')), // for transactions - multiple payments quantity
            formNameAlt, // Payments use pdTransactionType as part of form name, instead of formName
            pdProdDescription = lowerCaseVal(cleanText(pageDetails.prodDescription)),
            //pdTransactionId = pageDetails.transactionID || '', // for transactions - confirm uniqueness - '[CID:...]' on Domino
            //prchId = pdTransactionId || '', // local copy for purchaseID manipulation
            //Anil new appReference
            pdTransactionId = pageDetails.appReference || '',
            prchId,
            pdFormStatus = lowerCaseVal(cleanText(pageDetails.formStatus)), // local var reference
            pdSetupOptions = pageDetails.setupOptions || '',
            pdQuoteStatus = JSON.stringify(pageDetails.quoteStatus)||'',
            pdSearchTerm = cleanText(pageDetails.searchTerm),
            pdSearchFilter = cleanText(pageDetails.searchFilter),
            pdSearchResults = String((String(pageDetails.searchResults) || notSet) > -1 ? util.cap(pageDetails.searchResults, 5000) : notSet), // need to differentiate between undefined, 0, '0' and ''.
            pdItemName = cleanText(pageDetails.itemName), // item name for faq and atm
            pageExperience = pageDetails.experience || pageDetails.siteExperience || '',
            trackingOverrideEnabled = false, // for trackingOverride
            prpty, // local var for looping properties
            friendlyModules,
            channelManagerKeywords,
            channelManagerSearchType = false,
            clickMapOid,
            //visitorLifecycle,
            //visitorLifecycleAware = 'Aware',
            //visitorLifecycleEngaged = 'Engaged',
            //visitorLifecycleConverted = 'Converted',
            //visitorLifecycleRetained = 'Retained',
            dateZero = new Date(0), // old date used to clear cookies
            datePlusOneYear = new Date(+new Date() + 31536000000), // 31536000000 = 365*24*60*60*1000 = 1 year
            datePlusTwoYear = new Date(+new Date() + 63072000000), // 63072000000 = 2* 365*24*60*60*1000 = 2 year
            pageNamePathArray,
            pdPageNumber = pageDetails.pageNumber,
            pdSubSite = cleanText(pageDetails.subSite),
            pdExternalSiteName = lowerCaseVal(pageDetails.externalSiteName),
            pdPageNamePrefixPair = cleanText(pageDetails.pageNamePrefixes).split('|'),
            pdCampaignCodeView = lowerCaseVal(cleanText(pageDetails.campaignCodeList)),
            pdPromoCodeView = lowerCaseVal(cleanText(pageDetails.promoCodeList)),
            pdCampaignCodeClicked = lowerCaseVal(cleanText(pageDetails.campaignCode)),
            pdPromoCodeClicked = lowerCaseVal(cleanText(pageDetails.promoCode)),
            pdPageNamePrefix,
            pdFeaturedContent,
            ttIdQuerystring,
            pidQuerystring,
            promoCodeQuerystring,
            campaignCodeQuerystring,
            isSearchResultLanding,
            formTypeOverride,
            getValueOnce = util.getValOnce,
            lastSentPage = s3.c_r('lastPage'),
            getQuerystringParam = util.getQueryParam,
            nativeExitToBrowser = (((/\b(appAction=exit|exitapp=yes)\b/i).test(fullLocObj.href)) || s3.c_r('s_exitapp')); // appAction=exit querystring for app safari/browser links that exit the app to desktop-style pages that should go to mob suite to retain app visitor journey
            nativeAppVersion = s3.c_rr('AppVersion'),
            voyagerLoadBalancerID = s3.c_rr('LBWeb'), // to identify issues with load balancers in voyager/OTP not reading RESX values correctly
            nativeMid = s3.c_rr('MCMID'),
            pdPreImprs = cleanText(pageDetails.preImprs),
            pdPageType = lowerCaseVal(pageDetails.pageType), // local var reference
            pdPageStep = lowerCaseVal(pageDetails.pageStep, 1), // local var reference
            //pdPageStep = lowerCaseVal((pageDetails.pageAction||pageDetails.pageStep)||''), //if pageStep when pageAction not present
            pdChannel = lowerCaseVal(pageDetails.channel), // channel var reference
            pdTouchPoint = lowerCaseVal(pageDetails.touchPoint), // touchPoint var reference (WDP channel)
            pdBranchLocationCode = lowerCaseVal(pageDetails.location), // local var reference
            pdCalculatorName = lowerCaseVal(pageDetails.calculatorName),
            pdCalculatorType = lowerCaseVal(pageDetails.calculatorType),
            pdTrackId = lowerCaseVal(pageDetails.encryptedID),
            pdGenericId = lowerCaseVal(pageDetails.genericID),
            pdEmpId = lowerCaseVal(pageDetails.empId),
            pdBtAdviserID = lowerCaseVal(pageDetails.adviserId),
            pdPanoramaID = lowerCaseVal(pageDetails.panoramaId),
            pdGroupCode = lowerCaseVal(pageDetails.loggedUser),
            pdAddEvents =  lowerCaseVal(pageDetails.addEvents),
            pdErrorCode =  lowerCaseVal(pageDetails.errorCode),
            pdErrorDetails =  lowerCaseVal(pageDetails.errorDetails),
            pdTargetCampaignsList =  decodeURIComponent(lowerCaseVal(pageDetails.targetCampaignViewed)),
            pdTargetCampaignClicked = decodeURIComponent(lowerCaseVal(pageDetails.targetCampaignClicked)),
            pdTargetLocationId =  decodeURIComponent(lowerCaseVal(pageDetails.targetLocationId)),
            pdTargetClickedLocationId =  decodeURIComponent(lowerCaseVal(pageDetails.targetClickedLocationId)),
            pdTargetClickedAction =  decodeURIComponent(lowerCaseVal(pageDetails.targetAction)),
            pdPageModules = lowerCaseVal(pageDetails.pageModules),
            pdExtCampaign = lowerCaseVal(pageDetails.extCampaign),
            pdInternalCampaignList = lowerCaseVal(pageDetails.internalCampaignViewed),
            pdInternalCampaignClicked = lowerCaseVal(pageDetails.internalCampaignClicked),
            pdNotification = pageDetails.notification ||'',
            pdNotificationDetail = pageDetails.notificationDetail ||'',
            pdChatbotName = pageDetails.chatbotName || '',
            setFormFieldVar = util.setFormFieldVar,
            pdFormFieldObj = pageDetails.loanAttributes,
            pdToolsFormFieldObj = pageDetails.toolInputs,
            pdToolsDetail = lowerCaseVal(pageDetails.toolDetails),
            pdToolOutcome =  pageDetails.toolOutcome || '',
            pageNameDynamicVariable = 'D=pageName'; // zzzzz change to D.pageName to reduce pixel
            // Set values for microsites. This may be commented out for other domains
            /*ABU: TODO Other domain*/
            //digital['dd.brand']= pageBrand
            //digital['dd.site'] = pageBrand + ':' + pageSite + (pdSubSite ? (pageDetails.subSiteSeparator || '-') + pdSubSite : ''); // with subSite like APPS - brand:site-subSite:section.
            //util.siteID = digital['dd.site'];

            // pageStep compatibility when it co-exists with pageAction

            if (pageDetails.pageStep && pageDetails.pageAction) {
                /* pick up pageAction when both exits*/
                pdPageStep = lowerCaseVal(pageDetails.pageAction, 1)
            } else if (pageDetails.pageAction) {
                /* pick up pageAction when it is the only case exits */
                pdPageStep = lowerCaseVal(pageDetails.pageAction, 1);
            } else {
                /* use pageStep when it is the ONLY prop available */
                pdPageStep = lowerCaseVal(pageDetails.pageStep, 1);
            }

        // formName compatibility when it co-exists with newFormName
        // westpac live may not have newFormName, use formName instead.
            if (pageDetails.newFormName && pageDetails.formName) {
                /* by default should be new formName*/
                pdnewFormName = lowerCaseVal(cleanText(pageDetails.newFormName))
            } else if (pageDetails.newFormName) {
                /* pick up pageAction when it is the only case exits */
                pdnewFormName = lowerCaseVal(cleanText(pageDetails.newFormName))
            } else {
                /* use pageStep when it is the ONLY prop available */
                pdnewFormName = lowerCaseVal(cleanText(pageDetails.formName))
            }

            //Brand: WBC
            if(pageBrand === notSet){    //this is only for the test site
                if (/(?:^|\.)westpac\.com\.au$/i.test(util.getLoc().hostname)) {
                    pageBrand = 'wbc';
                    pageSite = /(.+)(?:\.westpac\.com\.au$)/i.exec(util.getLoc().hostname); // || [];
                    pageSite = pageSite ? pageSite[1] : notSet;
                }
            }
            //Brand: WBC Banking
            // OTP secure, oregon secure forms, oregon secure domino forms -
            //if(pageSite === 'banking' && /^\/+secure\/+banking(?:\/|$)/i.test(fullLocObj.pathname)){
            //if (/\bbanking\b/i.test(pageSite) && /^(?:\/secure\/|\/cust\/wps\/(?:my)?portal\/wol\/)/i.test(fullLocObj.pathname)) {
            if ((/\bbanking\b/i).test(pageSite) && (/^(?:\/secure\/|\/cust\/wps\/(?:my)?portal\/wol\/|\/oregon\/[^\/]+?\/wol\/)/i).test(util.getLoc().pathname)) {
                pdInSession = true;
                //pageStatus = 'secure'; // extended to in/out of session for all platforms and for formType
            }

            // OTP SameView staff emulation mode
            if ((/net$/i).test(pageSite) && (/\/emulationbanking\b/i).test(util.getLoc().pathname)) {
                pdInSession = true;

                // Change pageSite to 'banking' to consolidate OTP page names when in emulation in prod (necessary due to different domains)
                if (s3.w_prod) {
                    pageSite = 'banking-emu';
                }
            }

            //if(/online/i.test(pageSite)){
            //if(pageSite === 'online'){
            if ((/\bonline\b/i).test(pageSite) && (/^(?:\/dforms\/forms\/secure\/|\/cust\/wps\/(?:my)?portal\/wol\/|\/oregon\/[^\/]+?\/wol\/)/i).test(util.getLoc().pathname)) {
                pdInSession = true;
            }

            //Brand: STG
            /*if(pageBrand === notSet){    //this is only for the test site
                if (/(?:^|\.)stgeorge\.com\.au$/i.test(util.getLoc().hostname)) {
                    pageBrand = 'stg';
                    pageSite = /(.+)(?:\.stgeorge\.com\.au$)/i.exec(util.getLoc().hostname); // || [];
                    pageSite = pageSite ? pageSite[1] : notSet;
                }
            }*/
            //Brand: BOM
            /*if(pageBrand === notSet){    //this is only for the test site
                if (/(?:^|\.)bankofmelbourne\.com\.au$/i.test(util.getLoc().hostname)) {
                    pageBrand = 'bom';
                    pageSite = /(.+)(?:\.bankofmelbourne\.com\.au$)/i.exec(util.getLoc().hostname); // || [];
                    pageSite = pageSite ? pageSite[1] : notSet;
                }
            }*/
            //Brand: BSA
            /*if(pageBrand === notSet){    //this is only for the test site
                if (/(?:^|\.)banksa\.com\.au$/i.test(util.getLoc().hostname)) {
                    pageBrand = 'bsa';
                    pageSite = /(.+)(?:\.banksa\.com\.au$)/i.exec(util.getLoc().hostname); // || [];
                    pageSite = pageSite ? pageSite[1] : notSet;
                }
            }*/
            //Brand: BT
            /*if(pageBrand === notSet){    //this is only for the test site
                if (/(?:^|\.)bt\.com\.au$/i.test(util.getLoc().hostname)) {
                    pageBrand = 'bt';
                    pageSite = /(.+)(?:\.bt\.com\.au$)/i.exec(util.getLoc().hostname); // || [];
                    pageSite = pageSite ? pageSite[1] : notSet;
                }
            }*/
            util.siteID = pageBrand + ':' + pageSite + (pdSubSite ? (pageDetails.subSiteSeparator || '-') + pdSubSite : ''); // with subSite like APPS - brand:site-subSite:section.
            // switch short/long forms based on in/out of session URLs
            if (pdFormType === 'checkurl') {
                pdFormType = pdInSession ? 'short' : 'long';
            }


            // Store formName when starting on a long version, to keep tracking as long after logging in and using short form.
            // When same form in same session, keep as 'long'. Reset at any long start step, or non-long version of the same form
            /*
            if (pdPageStep === 'start') {
            if (pdFormName && pdFormType === 'long') {
            s.c_w('frmTypOv', pdPageType + pdFormName);
            } else {
            if (s.c_r('frmTypOv') === pdPageType + pdFormName) { // only remove cookie if on same form again
            s.c_w('frmTypOv', 0, dateZero);
            }
            }
            } else {
            if (s.c_r('frmTypOv') === pdPageType + pdFormName) {
            pdFormType = 'long-' + pdFormType; // only if pdFormType is different to current...
            }
            }
             */

            // adjusted to adapt to the journey - e.g. long-short, long-concise
            //if (pdFormType) {
            /*if (pdPageType && pdFormName) {
                //if (pdPageStep === 'start') {
                //if (pdPageStep === 'start' && pdPageType !== 'login') { // login form start step breaks long-short formType setting in the middle of other form journeys
                if ((pdPageStep === 'start' || pdPageStep === 'intro') && pdPageType !== 'login') { // login form start step breaks long-short formType setting in the middle of other form journeys. intro pageStep forces any pages prior to a start step to use a static formType (not crossover like long-short etc.)
                    util.cookieWrite('frmTypOv', pdPageType + pdFormName + '-' + pdFormType);
                    //s2.c_w('frmTypOv', pdPageType + pdFormName + '-' + pdFormType); // prefix should also include pdSubSite to avoid clash on multi-sites?
                } else {
                    formTypeOverride = /(.*)-(.*)/.exec(util.cookieRead('frmTypOv'));
                    //formTypeOverride = /(.*)-(.*)/.exec(s2.c_r('frmTypOv'));
                    //console.log('formTypeOverride[1] = ' + formTypeOverride[1]);
                    //console.log('formTypeOverride[2] = ' + formTypeOverride[2]);

                    // if the override matches the current form
                    if (formTypeOverride && formTypeOverride[1] === pdPageType + pdFormName) { // prefix should also include pdSubSite to avoid clash on multi-sites?
                        pdFormType = formTypeOverride[2] + (pdFormType && pdFormType !== formTypeOverride[2] ? '-' + pdFormType : '');
                    }
                }
            }*/
            /*---- wbg|form|rq1 ----
                eVar41:Journey Type(pdJourneyType)
                Convention: Updated code to capture journey type via dataLayer property journeyType(new)
                sampleValues: pub, pub-auth, auth, concise
            */
            if (pdPageType && pdnewFormName) {
                //if (pdPageStep === 'start') {
                //if (pdPageStep === 'start' && pdPageType !== 'login') { // login form start step breaks long-short formType setting in the middle of other form journeys
                //if ((pdPageStep === 'start' || pdPageStep === 'intro' || pdPageStep === 'welcome') && pdPageType !== 'login') { // login form start step breaks long-short formType setting in the middle of other form journeys. intro pageStep forces any pages prior to a start step to use a static formType (not crossover like long-short etc.)
                if ((pdPageStep === 'intro' || pdPageStep === 'welcome') && pdPageType !== 'login') { // login form start step breaks long-short formType setting in the middle of other form journeys. intro pageStep forces any pages prior to a start step to use a static formType (not crossover like long-short etc.)
                    //s3.c_r('journeyTypOv', pdPageType + pdnewFormName + '-' + pdJourneyType);
                    // s3.c_r does not work! why? wheras util cookieWrite works.. why two separate cookie write? when to use these? unclear
                    //util.cookieWrite('journeyTypOv', pdPageType + pdnewFormName + '-' + pdJourneyType);
                    s3.c_w('journeyTypOv', pdPageType + pdnewFormName + '-' + pdJourneyType); // prefix should also include pdSubSite to avoid clash on multi-sites?
                } else {
                    journeyTypeOverride = /(.*)-(.*)/.exec(s3.c_r('journeyTypOv'));
                    //journeyTypeOverride = /(.*)-(.*)/.exec(util.cookieRead('journeyTypOv'));
                    //console.info('journeyTypeOverride', journeyTypeOverride)
                    //journeyTypeOverride = /(.*)-(.*)/.exec(s2.c_r('frmTypOv'));
                    //console.log('journeyTypeOverride[1] = ' + journeyTypeOverride[1]);
                    //console.log('journeyTypeOverride[2] = ' + journeyTypeOverride[2]);

                    // if the override matches the current form
                    if (journeyTypeOverride && journeyTypeOverride[1] === pdPageType + pdnewFormName) { // prefix should also include pdSubSite to avoid clash on multi-sites?
                        pdJourneyType = journeyTypeOverride[2] + (pdJourneyType && pdJourneyType !== journeyTypeOverride[2] ? '-' + pdJourneyType : '');

                    }
                }
            }


            //console.log('pdFormType = ' + pdFormType);

            // Dynamic pageName prefix for in- and out-of-session pages to uniquely identify the page in separate path/section
            // Prefix value should be two pipe delimited values. The values can be matching, or either value may be blank.
            pdPageNamePrefix = pdPageNamePrefixPair.length === 2 ? cleanText(pdInSession ? pdPageNamePrefixPair[0] : pdPageNamePrefixPair[1]) : '';

            // Payments use pdTransactionType as part of page and form name, instead of formName
            //formNameAlt = pdFormName || pdTransactionType;
            //formNameAlt = pdFormName ? (pdFormName + (pdFormType ? ':' + pdFormType : '')) : pdTransactionType; // to switch short/long form type when required
            formNameAlt = pdnewFormName || pdTransactionType; // to switch short/long form type when required

            // set pageName syntax for forms
            if (formNameAlt || (/^(?:tool|survey|selfservice|registration|payment|login|enquiry|application)$/).test(pdPageType)) { // pageType considered to be a form, use form syntax for pageName
                formNameAlt = formNameAlt || notSet;
                var newPageType;
                newPageType = pdPageType;

                newPageType = lowerCaseVal(
                    newPageType.replace(/application/i, 'app')
                        .replace(/enquiry/i, 'enq')
                        .replace(/quote/i, 'quo')
                        .replace(/selfservice/i, 'ser')
                        .replace(/registration/i, 'reg')
                        .replace(/payment/i, 'pay')
                        .replace(/survey/i, 'sur')
                );
                sPageNameTemp = util.siteID + ':' + (newPageType || notSet) + ':' + formNameAlt + (pdPageName ? ':' + pdPageName : ''); // with subSite coming from s.siteID
                //sPageNameTemp = s2.siteID + ':' + (pdPageType || notSet) + ':' + formNameAlt + (pdPageName ? ':' + pdPageName : ''); // with subSite coming from s.siteID
                //sPageNameTemp = s.siteID + ':' + (pdSubSite ? pdSubSite + ':' : '') + (pdPageType || notSet) + ':' + formNameAlt + (pdPageName ? ':' + pdPageName : '');
            } else {
                if (pdPageName) {
                    // orig name code -
                    //sPageNameTemp = s.siteID + ':' + pdPageName;
                    // now with switch for in/out of session prefix -
                    //sPageNameTemp = s.siteID + ':' + (pdPageNamePrefix ? pdPageNamePrefix + ':' : '') + pdPageName;
                    //sPageNameTemp = s.siteID + ':' + (pdSubSite ? pdSubSite + ':' : '') + (pdPageNamePrefix ? pdPageNamePrefix + ':' : '') + pdPageName;
                    //sPageNameTemp = s2.siteID + ':' + (pdPageNamePrefix ? pdPageNamePrefix + ':' : '') + pdPageName; // with subSite coming from s.siteID
                    sPageNameTemp = util.siteID + ':' + (pdPageNamePrefix ? pdPageNamePrefix + ':' : '') + pdPageName; // with subSite coming from s.siteID
                } else {
                    // else use getPageName plugin to get details directly from URL
                    //sPageNameTemp = s.getPageName(s.pageURL); // may be decodeURIComponent(s.pageURL) for consistent URL format when errors/encoded chars. e.g %2F in OTP - may remove encoded chars in querystring though
                    //sPageNameTemp = decodeURIComponent(s.getPageName(s.pageURL)); // may be decodeURIComponent(s.pageURL) for consistent URL format when errors/encoded chars. e.g %2F in OTP - may remove encoded chars in querystring though
                    //sPageNameTemp = decodeURIComponent(s.getPageName(s.pageURL)).replace(/^(.+?:.+?:)/, '$1' + (pdSubSite ? pdSubSite + ':' : '')); // may be decodeURIComponent(s.pageURL) for consistent URL format when errors/encoded chars. e.g %2F in OTP - may remove encoded chars in querystring though
                    //sPageNameTemp = decodeURIComponent(s2.getPageName(s2.pageURL)); // may be decodeURIComponent(s.pageURL) for consistent URL format when errors/encoded chars. e.g %2F in OTP - may remove encoded chars in querystring though
                    sPageNameTemp = decodeURIComponent(util.getPageName(util.pageURL)); // may be decodeURIComponent(s.pageURL) for consistent URL format when errors/encoded chars. e.g %2F in OTP - may remove encoded chars in querystring though
                    //console.log(sPageNameTemp);
                }
            }
            //alert(sPageNameTemp +'||||'+ pdPageName);
            // If pageName override (overrides are any pageDetails properties named as 's_...') set, use it to replace all path and section details, else all those details must be passed as individual overrides (Individual overrides can still be set though)
            sPageNameTemp = cleanText((pageDetails.s_pageName || sPageNameTemp) + (pdDialogTitle ? ':' + pdDialogTitle : ''));

            // format pageName and replace long URL details
            sPageNameTemp = lowerCaseVal(
                    sPageNameTemp.replace(/:personal-banking(\:|$)/i, ':pers$1')
                    .replace(/:business-banking(\:|$)/i, ':bus$1')
                    .replace(/:corporate-banking(\:|$)/i, ':corp$1')
                    .replace(/:about-westpac(\:|$)/i, ':about$1')
                    .replace(/:secure:banking(\:|$)/i, ':olb$1') // Abbreviate the path for olb
                    .replace(/(.*:)(.*?:emulationbanking)(\:|$)/i, '$1olb$3') // Abbreviate the path for emulation
                    .replace(/^((?:[\.\w\-]*?:){2})mobile$/i, '$1mobile:home') // set mobile root pages as a type of home page. mobile home page being overtaken by OTP and may be different?
                    .replace(/(.+:atm:.+):-?\d+(.\d+)?:\d+(.\d+)$/i, '$1') // remove coords from atm detail pages
                    //.replace(/(?:\s|%20)+/g, ' ') // replace these characters (or multiples of) with single space
                    .replace(/(?:-|_)+/g, '-') // replace these characters (or multiples of) with single dash
            );
            /*ABU: TODO Dynamic variable not supported
            // pageName eVar
            //ABU dd.pageName
            s2.eVar21 = pageNameDynamicVariable;

            // hierarchy
            s2.hier1 = pageNameDynamicVariable;
            */

            // common event58 for branchdetail, atmdetail, teamdetail pages
            if (/^(?:branch|atm|team)detail$/.test(pdPageType)) {
                //s.events = s.apl(s.events, 'event58', ',', 2); // using shorter function call like appendEvent(58);
                appendEvent(digital,'branchATMdetail');
                //appendEvent(58);
            }

            // this should work for identifying both application and enquiry forms for serialisation
            //ABU TODO
            var eventSerialisationKey = ((pdProductID && pdProductID[0] && pdProductID[0].Product)||(pdProductID && pdProductID[0] && pdProductID[0].prod) || '') + pdnewFormName; // if the product or form name changes between start and complete steps, or journey crosses domain origin (localStorage), the serialisation won't reset at complete step in that serial range (e.g. visit).
            eventSerialisationKey = eventSerialisationKey ? eventSerialisationKey + pdFormType : false; // without formType, the same product or form name in a different journeys could be deduped, e.g. skipping some start events. If prod and form are blank, dont use only formType - it could dedupe many other forms of the same type. Would require subSite in key if same pageType + formName shouldn't be joined across different subSite + formType (e.g. should long-short form across two different subSites match?)

            // determine tracking scenario
            switch (pdPageType) {
            case 'form':
                if (pdPageStep && pdTransactionId) {
                    digital['dd.applicationID'] = digital['dd.transactionID'] = pdPageStep + '_' + pdTransactionId[0].Id;
                    //s2.transactionID = pdPageStep + '_' + pdTransactionId;
                    //s2.eVar39 = 'D=xact';
                }
                if (pdPageStep === 'save') {
                    //s.transactionID = pdTransactionId ? 'save_' + pdTransactionId : '';
                    //s.eVar39 = 'D=xact';
                    appendEvent(digital,'formSave');
                    //appendEvent(73);
                }
                if (pdPageStep === 'retrieve') {
                    appendEvent(digital,'formRetrieve');
                    //appendEvent(74);
                }
                break;
            case 'tool':
                //s.eVar23 = 'tool:'+pdFormName; // remove all these from switch cases, capture once for all forms
                //s.prop23 = 'D=v23';
                //s.eVar62 = lowerCaseVal(pdFormName,1);
                //	pageDetails.toolInputs = { == pdToolsFormFieldObj
                //		Age: band,
                //		salary: band,
                //		relation: string,
                //		child: number,
                //		covers: string
                //	};

                digital['dd.toolName']= pdFormName || notSet;
                var tempToolName = digital['dd.toolName'];
                //appendEvent(digital,'toolUsage');

                if(pdToolsDetail){
                    digital['dd.toolDetails'] = pdToolsDetail
                } else {
                    if (pdCalculatorType && pdCalculatorName) {
                        var tType = pageDetails.calculatorType || notSet,
                        tAmount = pageDetails.transactionAmount || notSet,
                        pSelected = pageDetails.prodSelected || notSet,
                        getRangeAvg = util.amntBnds('transactions', tAmount),
                        amntRange = getRangeAvg.range;
                        digital['dd.toolName'] = pdCalculatorName || notSet;
                        digital['dd.toolDetails'] = 'tool:' + tType + '|' + 'product:' + pSelected + '|' + amntRange;
                    }
                }

                if(pdToolsFormFieldObj){
                    digital['dd.toolInput'] = setFormFieldVar(pdPageType, '', pdToolsFormFieldObj);
                }
                //tactical caclculator code-START
                //tactical code for calculators until AEM framework is in place

                if (pdPageStep === 'result') {
                    appendEvent(digital,'toolResult');
                    if(pdToolOutcome){
                        digital['dd.toolOutcome'] = pdToolOutcome;
                    }
                } else {
                    appendEvent(digital, 'toolInteraction');
                }
                sPageNameTemp = util.siteID + ':' + (pageDetails.pageType || notSet) + ':' + (pdCalculatorName || tempToolName) + (pdPageName ? ':' + pdPageName : '');
                //tactical caclculator code-END
                //s2.eVar62 = pdFormName || notSet;
                //s2.prop62 = dVar(62);
                //appendEvent(68);
                break;
            case 'calc-tool':
                if(pdToolsFormFieldObj){
                    digital['dd.toolInput'] = setFormFieldVar(pdPageType, '', pdToolsFormFieldObj);
                }
                if (pdCalculatorType && pdCalculatorName) {
                    var calcInfo = util.setInteractionVars(pageDetails),
                        calcDet = calcInfo.calculatorDetails||'',
                        calcName = calcInfo.calculatorName||'';
                    digital['dd.toolName'] = calcName || notSet;
                    if(calcDet){
                        digital['dd.toolDetails'] = calcDet;
                    }
                    appendEvent(digital, 'toolInteraction');
                }
                if (pdPageStep === 'result') {
                    appendEvent(digital,'toolResult');
                    if(pdToolOutcome){
                        digital['dd.toolOutcome'] = pdToolOutcome;
                    }
                }
                sPageNameTemp = util.siteID + ':' + (pageDetails.pageType || notSet) + ':' + calcName + (pdPageName ? ':' + pdPageName : '');
                break;
            case 'survey':
                //s.eVar23 = 'survey:'+pdFormName;
                //s.prop23 = 'D=v23';
                /*
                switch(pdPageStep){
                //case 'start':
                //	appendEvent(55); // now common for all forms
                //	break;
                case 'complete':
                s.eVar28 = (pageDetails.surveyScore||notSet);
                appendEvent(64);
                break;
                }
                 */
                if (pdPageStep === 'complete') {
                    digital['dd.score'] = util.fixZero(pageDetails.surveyScore) || notSet;
                    appendEvent(digital,'surveyResponse');
                    //s2.eVar28 = s2.w_fixZero(pageDetails.surveyScore) || notSet;
                    //appendEvent(64);
                }
                break;
            case 'selfservice':
                //s.eVar23 = 'selfserv:'+pdFormName;
                //s.prop23 = 'D=v23';
                //s.eVar38 = lowerCaseVal(pdFormName,1);
                //selfservice name *compatibility with formName and newFormName
                var updatedFormName;
                if (pdnewFormName) {
                    updatedFormName = pdnewFormName;
                } else {
                    updatedFormName = pdFormName;
                }

                digital['dd.selfserviceName'] = updatedFormName || notSet;
                //s2.eVar38 = pdFormName || notSet;
                //s2.prop38 = dVar(38);
                if(pdExternalSiteName){
                    digital['dd.extAcct'] = pdExternalSiteName|| notSet;
                }
                //s2.eVar64 = lowerCaseVal(pageDetails.externalSiteName);

                switch (pdPageStep) {
                    case 'start':
                        appendEvent(digital,'selfServiceStart');
                        //appendEvent(35);
                        break;
                    case 'complete':
                        appendEvent(digital,'selfServiceComplete');
                        //appendEvent(36);
                        if (pdSelfserviceDetails) {
                            digital['dd.selfserviceDetails']= pdSelfserviceDetails || notSet;
                            //s2.eVar46 = pdSelfserviceDetails || notSet;
                            //s2.prop46 = dVar(46);
                            // self service detail var to capture type of self service, introduced as part of Nov 16E1  Wlive release  *au
                        }
                        break;
                    case 'forgotpasswordstart':
                        appendEvent(digital,'forgotPassword');
                        appendEvent(digital,'selfServiceStart');
                        //appendEvent(48);
                        //appendEvent(35);
                        break;
                    case 'forgotpasswordcomplete':
                        appendEvent(digital,'selfServiceComplete');
                        //appendEvent(36);
                        break;
                    }
                break;
            case 'sitesearch':
                var ln = sPageNameTemp.split(':').length;
                if (ln > 2){
                    sPageNameTemp = (sPageNameTemp.split(':').slice(0, 2).join(':'))+":sitesearch:"+(sPageNameTemp.split(':').slice(2, ln).join(':'));
                }
                 //s3.eVar14 = util.getValOnce(util.srchTerm(pdSearchTerm), 's3tv', 30, 'm'); // getValOnce after #. Hash only 5+ digits?
                 var searchTermTemp = util.getValOnce(util.srchTerm(pdSearchTerm), 's3tv', 30, 'm'); // getValOnce after #. Hash only 5+ digits?
                    if (searchTermTemp) {
                        digital['dd.searchTerm'] = searchTermTemp;
                        digital['dd.searchFilter'] = pdSearchFilter;
                        //s3.prop14 = s3.dVar(14);
                        // split search term into keywords
                        s3.list1 = util.clean(searchTermTemp.replace(/[^a-z]+/gi, ' ')).replace(/\s/g, ','); // ,4); // for list prop, remove all chars outside a-z
                        //s.eVar15 = pageBrand + ':' + (pageSite==='banking'?'secure':'public'); // OTP doesnt have site search
                        appendEvent(digital,'intSearch');
                        //s3.w_addEvt(14);
                        //s.eVar30 = 'sitesearch:' + pdSearchResults; // use pdPageType here in place of text sitesearch string
                        digital['dd.itemCount'] = pdPageType + ':' + pdSearchResults;
                        //s3.eVar30 = pdPageType + ':' + pdSearchResults;
                        //if(s.eVar30==='sitesearch:0'){
                        //console.log(pdSearchResults);
                        //if (s.eVar30 === pdPageType + ':0') {
                        if (pdSearchResults === '0') {
                            //s3.w_addEvt(16);
                            appendEvent(digital,'intSearchZeroResults');
                        }
                    }

                /*
                //s.eVar14 = getValueOnce(lowerCaseVal(getQuerystringParam('query','',fullLocObj.href)).replace(/\d/g,'#').replace(/\s+/g,' ').replace(/^\s|\s$/g,''),'s_stv',0); // getValOnce after #. Hash only 5+ digits?
                //s.eVar14 = getValueOnce(lowerCaseVal(pageDetails.searchTerm,1).replace(/\d/g,'#').replace(/\s+/g,' ').replace(/^\s|\s$/g,''),'s_stv',0); // getValOnce after #. Hash only 5+ digits?
                digital['dd.searchTerm'] = getValueOnce(util.srchTerm(pdSearchTerm), 's3tv', 30, 'm'); // getValOnce after #. Hash only 5+ digits?
                //s2.eVar14 = getValueOnce(s2.w_srchTerm(pdSearchTerm), 'stv', 30, 'm'); // getValOnce after #. Hash only 5+ digits?

                if (digital['dd.searchTerm']) {
                    //s2.prop14 = dVar(14); //Not required
                    // split search term into keywords
                    s3.list1 = cleanText(digital['dd.searchTerm'].replace(/[^a-z]+/gi, ' ')).replace(/\s/g, ','); // ,4); // for list prop, remove all chars outside a-z
                    //s2.list1 = cleanText(s2.eVar14.replace(/[^a-z]+/gi, ' ')).replace(/\s/g, ','); // ,4); // for list prop, remove all chars outside a-z
                    //s.eVar15 = pageBrand + ':' + (pageSite==='banking'?'secure':'public'); // OTP doesnt have site search
                    appendEvent(digital,'intSearch');
                    //appendEvent(14);
                    //s.eVar30 = 'sitesearch:' + pdSearchResults; // use pdPageType here in place of text sitesearch string
                    digital['dd.itemCount'] = pdPageType + ':' + pdSearchResults;
                    //s2.eVar30 = pdPageType + ':' + pdSearchResults;
                    //if(s.eVar30==='sitesearch:0'){
                    //console.log(pdSearchResults);
                    //if (s.eVar30 === pdPageType + ':0') {
                    if (pdSearchResults === '0') {
                        appendEvent(digital,'intSearchZeroResults');
                        //appendEvent(16);
                    }
                } //else{
                //	s.eVar14 = notSet;
                //}
                //} **/
                break;
            case 'faqsearch':
                var ln = sPageNameTemp.split(':').length;
                if (ln > 2){
                    sPageNameTemp = (sPageNameTemp.split(':').slice(0, 2).join(':'))+":faq:"+(sPageNameTemp.split(':').slice(2, ln).join(':'));
                }
                // pageDetails passed from function call on faq search result div load
                digital['dd.faqSearchTerm'] = getValueOnce(util.srchTerm(pdSearchTerm), 's3_faq', 30, 'm');
                //s2.eVar58 = getValueOnce(s2.w_srchTerm(pdSearchTerm), 'faq', 30, 'm');
                if (digital['dd.faqSearchTerm']) {
                    //s2.prop58 = dVar(58);
                    appendEvent(digital,'faqSearch');
                    //appendEvent(65);
                    //s.eVar30 = 'faqsearch:' + pdSearchResults;
                    digital['dd.itemCount'] = pdPageType + ':' + pdSearchResults;
                    //s2.eVar30 = pdPageType + ':' + pdSearchResults;
                }
                break;
            case 'branchsearch':
                // pageDetails passed from function call on branch search result div load
                var ln = sPageNameTemp.split(':').length;
                if (ln > 2){
                    sPageNameTemp = (sPageNameTemp.split(':').slice(0, 2).join(':'))+":branchsearch:"+(sPageNameTemp.split(':').slice(2, ln).join(':'));
                }
                    sPageNameTemp += ':searchresults';

                //if(s.w_pgLoad){ // getValOnce would be cleared on every page click/doPlugins in this pageType case
                //s.eVar44 = getValueOnce(lowerCaseVal(pageDetails.searchTerm,1).replace(/\d/g,'#').replace(/\s+/g,' ').replace(/^\s|\s$/g,''),'s_brnch',0); // hash numbers, postcodes
                //s.eVar44 = getValueOnce(s.w_srchTerm(),'s_brnch',0); // hash numbers, keep postcodes in function
                digital['dd.branchSearchLocation'] = util.srchTerm(pdSearchTerm); // hash numbers, keep postcodes. not val once, every time
                //s2.eVar44 = s2.w_srchTerm(pdSearchTerm); // hash numbers, keep postcodes. not val once, every time
                if (digital['dd.branchSearchLocation']) {
                    //s2.prop44 = dVar(44);
                    digital['dd.branchSearchFilters'] = pageDetails.searchFilters || notSet;
                    appendEvent(digital,'branchSearch');
                    //s2.prop45 = pageDetails.searchFilters || notSet;
                    //appendEvent(57);
                    //s.eVar30 = 'branchsearch:' + pdSearchResults;
                    digital['dd.itemCount'] = pdPageType + ':' + pdSearchResults;
                    //s2.eVar30 = pdPageType + ':' + pdSearchResults;
                    //if(s.eVar30==='branchsearch:0'){
                    //if (s.eVar30 === pdPageType + ':0') {
                    if (pdSearchResults === '0') {
                        appendEvent(digital,'intSearchZeroResults');
                        //appendEvent(16);
                    }
                }
                //}
                break;
            case 'branchdetail':
                    //wbc BUG fix
                    if(pdItemName==='' & util.getLoc().hash !==''){
                        pdItemName = util.getLoc().hash.replace(/\#\//i,'').replace(/\//g, ':');
                    } else if(pdItemName===''){
                        pdItemName = util.getLoc().pathname.replace(/\/(locateus|locator)\//ig,'').replace(/\//ig,':');
                    }

                    var ln = sPageNameTemp.split(':').length;
                    if (ln > 2){
                        sPageNameTemp = (sPageNameTemp.split(':').slice(0, 2).join(':'))+":branchsearch:"+(sPageNameTemp.split(':').slice(2, ln).join(':'));
                    }
                    sPageNameTemp += ':' + lowerCaseVal(pdItemName.replace(/\s/g, ''), 1);
                //appendEvent(58);
                // common events set above
                break;
            case 'atmdetail':
                //sPageNameTemp=sPageNameTemp.replace(/:-?\d+(.\d+)?:\d+(.\d+)$/i,':'+lowerCaseVal(pageDetails.itemName,1));
                var ln = sPageNameTemp.split(':').length;
                if (ln > 2){
                    sPageNameTemp = (sPageNameTemp.split(':').slice(0, 2).join(':'))+":branchsearch:"+(sPageNameTemp.split(':').slice(2, ln).join(':'));
                }
                sPageNameTemp += ':' + lowerCaseVal(pdItemName.replace(/\s/g, ''), 1);
                // common events set above
                //appendEvent(58);
                break;
                //case 'teamdetail':
                // common events set above
                //appendEvent(58);
                //	break;
            case 'registration':
                //s.eVar23 = 'reg:'+s.eVar6+':'+pdFormName; // does the brand from the URL make sense here? Is it required, or should it be external site name?
                //s.prop23 = 'D=v23';
                //s.eVar45 = lowerCaseVal(pdFormName,1); // should brand and external site name be included here?
                switch (pdPageStep) {
                case 'start':
                    appendEvent(digital,'registrationStart');
                    //appendEvent(51);
                    break;
                case 'complete':
                    appendEvent(digital,'registrationComplete');
                    //appendEvent(52);
                    //appendEvent(46); // this should be set automatically by session/cookie server-side process in OTP/online banking
                    break;
                }
                break;
            case 'product':
                //s.products = ';' + (pageDetails.productID||notSet).replace(/,/g,',;');
                switch (pdPageStep) {
                case 'view':
                    appendEvent(digital,'customProdView');
                    //appendEvent(13);
                    break;
                    //case 'selection': // product selection event/page not applicable/required
                    //	appendEvent(32);
                    //	break;
                case 'comparison':
                    appendEvent(digital,'prodCompare');
                    //appendEvent(30);
                    break;
                }
                break;
            case 'payment':
                // s.eVar37 = lowerCaseVal(pdTransactionType,1);

                // payment status captured as merchandising eVar to relate to payment amount. two methods -
                //pdProductID=[{'prod':'payment:'+lowerCaseVal(pdTransactionType,1),'events':(pdPageStep==='complete'?'payment:'+lowerCaseVal(pdTransactionType,1)+(pdFormStatus?':'+pdFormStatus:'')+'='+pdTransactionAmount:'')}]; // capture status directly appended to pdTransactionType details
                //pdProductID=[{'prod':'payment:'+lowerCaseVal(pdTransactionType,1),'events':(pdPageStep==='complete'?'payment:'+lowerCaseVal(pdTransactionType,1)+'='+pdTransactionAmount:'')}]; // generic form status applied to merch in prod string processing
                // generic form status applied to merch in prod string processing

                if (pdTransactionQty) {
                    transactionMerch.push('payment:qty:' + pdTransactionQty);
                }
                if (pdTransactionDetails) {
                    transactionMerch.push(pdTransactionDetails);
                }

                // Currently set only for steps below. Otherwise products tracks as 'payment:(not set)' in review step etc.
                paymentProduct = [{
                        'prod' : 'payment:' + (pdTransactionType || notSet),
                        //'events' : ((pdPageStep === 'complete' || pdPageStep === 'effectpayment') ? 'payment:' + (pdTransactionType || notSet) + '=' + pdTransactionAmount : '') // complete or effectpayment should set the payment/product details.
                        'events' : /^(complete|effectpayment|bulkpaymentapproval)$/.test(pdPageStep) ? 'payment:' + (pdTransactionType || notSet) + '=' + pdTransactionAmount : '', // complete or effectpayment should set the payment/product details.
                        //'merch' : pdTransactionQty ? 'options=payment:qty:' + pdTransactionQty : ''
                        'merch' : transactionMerch.length ? 'options=' + transactionMerch.join('+') : ''
                    }
                ];

                switch (pdPageStep) {
                    case 'start':
                        appendEvent(digital,'paymentStart');
                        //appendEvent(38);
                        pdProductID = paymentProduct;
                        break;
                        //case 'pinauthorisation':
                        //	appendEvent(42); // not used
                        //	break;
                    case 'complete':
                        appendEvent(digital,'paymentComplete');
                        //appendEvent(39);
                        pdProductID = paymentProduct;

                        // removed to reduce reference IDs. payment ref not required
                        //s.transactionID = pdTransactionId ? 'pay_' + pdTransactionId : ''; // prefix to avoid duplicates with other applications etc. only capture ID if set
                        //s.eVar39 = 'D=xact';

                        //s.purchaseID = prchId; // serialise all events with revenue/value. confirm uniqueness. maybe only capture in transactionID/xact
                        //appendEvent('purchase'); // TODO. serialise payments to de-dupe amounts?

                        break;
                    case 'businessstart':
                        // payment submitted/created, awating approval. business OTP 1.2
                        appendEvent(digital,'busPaymentStart');
                        //appendEvent(42);
                        pdProductID = paymentProduct;
                        break;
                    case 'createpayment':
                        // payment submitted/created, awating approval. business OTP 1.2
                        appendEvent(digital,'busPaymentCreated');
                        //appendEvent(43);
                        pdProductID = paymentProduct;
                        break;
                    case 'authorisepayment':
                        // intermediate approval step. business OTP 1.2
                        //s.eVar42 = lowerCaseVal(pageDetails.businessAuthType, 1); // not used
                        //s.prop42 = dVar(42);
                        appendEvent(digital,'busPaymentAuthorised');
                        //appendEvent(44);
                        pdProductID = paymentProduct;
                        break;
                    case 'effectpayment':
                        // final approval step, payment processed/scheduled. business OTP 1.2
                        appendEvent(digital,'busPaymentEffected');
                        //appendEvent(45);
                        pdProductID = paymentProduct;
                        break;
                    case 'bulkpaymentapproval':
                        // final bulk approval step. business OTP 1.2 step name also above, in setting paymentProduct
                        appendEvent(digital,'busBulkApprovals');
                        //appendEvent(37); // bulk payment approval completed step
                        pdProductID = paymentProduct;
                        break;
                    }
                break;
            case 'login':
                //s.eVar23 = 'login:'+s.eVar6+':'+pdFormName; // does the brand from the URL make sense here? Is it required, or should it be external site name? eWise?
                //if(/^(?:firsttime|complete)$/i.test(pdPageStep)){
                //	s.eVar40 = 'logged in';
                //s.prop40 = 'D=v40';
                //}

                /*
                switch (pdPageStep) {
                case 'lockout':
                appendEvent(49);
                break;
                //case 'firsttime':
                //	appendEvent(47); // removed due to inaccurate implementation
                //appendEvent(46); // this should be set automatically by session/cookie server-side process in OTP/online banking
                //s.eVar32 = 'stop';
                //	break;
                case 'complete':
                // login complete step probably won't be used directly in OTP
                appendEvent(46);
                //	//s.eVar33 = 'start';
                break;
                }
                 */

                if (pdPageStep === 'complete') {
                    digital['dd.loginStatus'] = 'logged in';
                    appendEvent(digital,'loginComplete');
                    //util.cookieWrite('s_wbc_auth', 1, new Date(+new Date() + (20 * 60 * 1000)),'/', util.cookieDomain());
                    //for westpac specific
                    //appendEvent(46);
                }

                break;
            case 'logout':
                //s.eVar23 = 'logout:'+s.eVar6+':'+pdFormName; // does the brand from the URL make sense here? Is it required, or should it be external site name?
                digital['dd.loginStatus'] = 'logged out';
                //Brand:WBC Banking
                //util.cookieWrite('s_wbc_auth', 2, new Date(+new Date() + (60 * 60 * 1000)),'/', util.cookieDomain()); //setting auth state in westpac cookie
                //s2.eVar40 = 'logged out';
                //s.prop40 = 'D=v40';
                break;

                /*
                case 'livechat': // triggered on live person popup winfdow, not on page or click
                switch(pdPageStep){
                case 'start':
                s.eVar57 = (s.eVar57||'{LivePerson Session ID}'); // check value
                s.prop57 = 'D=v57';
                appendEvent(63);
                break;
                }
                break;
                 */
            case 'enquiry':
                // was 'lead'
                //s.eVar23 = 'lead:'+pdFormName;
                //s.prop23 = 'D=v23';
                //s.products = (pageDetails.productID?';' + pageDetails.productID.replace(/,/g,',;'):'');
                switch (pdPageStep) {
                    case 'start':
                        appendEvent(digital,'enqStart');
                        //appendEvent(53);
                        // serialise enquiry start
                        //Abu todo serialise event ZZZZ
                        //util.addSerialiseEvt(digital,'event28',util.serialise(eventSerialisationKey, pdPageStep));
                        //appendEvent('event28' + util.serialise(eventSerialisationKey, pdPageStep));
                        break;
                    case 'complete':
                        appendEvent(digital,'enqComplete');
                        //appendEvent(54);
                        // serialise enquiry complete
                        //Abu todo serialise event ZZZZ
                        //appendEvent(digital,'enqCompleteSerialised', util.serialise(eventSerialisationKey, pdPageStep));
                        //util.addSerialiseEvt(digital,'event29',util.serialise(eventSerialisationKey, pdPageStep));
                        //appendEvent('event29' + s2.w_serialise(eventSerialisationKey, pdPageStep));
                        /*
                        the transactionID for enquiry complete has workaround for westpac live!, westpac live does not have new datalayer
                        so check if transactionID exists instead to use or use notSet
                        remove the conditions below once new data layer is implemented in westpac live
                        */
                        if (pdTransactionId) {
                                        digital['dd.transactionID'] = digital['dd.applicationID'] = 'enq_' + util.createTransID(pdTransactionId);
                        } else if (pageDetails.transactionID) {
                                        /* pick up transactionID when it is the only one available */
                                        digital['dd.transactionID'] = digital['dd.applicationID'] = 'enq_' + pageDetails.transactionID;
                        } else {
                                        /* assign notSet when none available */
                                        digital['dd.transactionID'] = digital['dd.applicationID'] = 'enq_' + notSet;
                        }

                        //s.transactionID='enq_'+pdTransactionId; // prefix to avoid duplicates with other applications etc.
                        //digital['dd.applicationID']  = digital['dd.transactionID'] = pdTransactionId[0].Id ? 'enq_' + pdTransactionId[0].Id : ''; // prefix to avoid duplicates with other applications etc. only capture ID if set
                        //s2.transactionID = pdTransactionId ? 'enq_' + pdTransactionId : ''; // prefix to avoid duplicates with other applications etc. only capture ID if set
                        //s2.eVar39 = 'D=xact'; //ABU not sure 'D=xact' replacemint  ZZZ

                        //s.purchaseID = prchId; // serialise all events like application complete. confirm uniqueness across all types and platforms
                        //appendEvent('purchase');

                        break;
                    }
                break;
            case 'faq':
                //s.eVar58 = lowerCaseVal(pageDetails.itemName,1);
                //s.prop58 = 'D=v58';
                //appendEvent(65);
                sPageNameTemp += ':' + lowerCaseVal(pdItemName, 1);
                break;

                /*
                case 'enquiry':
                //s.eVar23 = 'enquiry:'+pdFormName;
                //s.prop23 = 'D=v23';
                s.eVar43 = lowerCaseVal(pdFormName,1);
                s.prop43 = 'D=v43';
                //s.products = ';' + (pageDetails.productID||notSet).replace(/,/g,',;');
                switch(pdPageStep){
                case 'complete':
                appendEvent(50);
                s.transactionID=pdTransactionId;
                s.eVar39='D=xact'; // for enquiry? capture whenever set?
                break;
                }
                break;
                 */

            case 'application':
                //s.eVar23 = 'appl:'+pdFormName;
                //s.prop23 = 'D=v23';
                //s.products = (pageDetails.productID?';' + pageDetails.productID.replace(/,/g,',;'):'');

                //s.prop68 = (pageDetails.businessABN||notSet); // ABN not required

                //		s.eVar37 = lowerCaseVal(pdTransactionType,1);

                /*
                if(/^(?:save|complete)$/i.test(pdPageStep)){ // different reference number specified between save and complete?
                //s.eVar39=pdTransactionId;
                //s.transactionID='D=v39';
                s.transactionID=pdTransactionId;
                s.eVar39='D=xact';
                }
                 */

                //eventSerialisationKey = (pdProductID && pdProductID[0] && pdProductID[0].prod) || pdFormName;
                //eventSerialisationKey = eventSerialisationKey ? eventSerialisationKey + pdFormType : 0;

                //eventSerialisationKey = ((pdProductID && pdProductID[0] && pdProductID[0].prod) || '') + pdFormName; // if the product or form name changes between start and complete steps, or journey crosses domain origin (localStorage), the serialisation won't reset at complete step in that serial range (e.g. visit).
                //eventSerialisationKey = eventSerialisationKey ? eventSerialisationKey + pdFormType : false; // without formType, the same product or form name in a different journeys could be deduped, e.g. skipping some start events. If prod and form are blank, dont use only formType - it could dedupe many other forms of the same type.

                if (pdPageStep && pdTransactionId) {
                    digital['dd.transactionID'] = digital['dd.applicationID'] = pdPageStep + '_' + pdTransactionId[0].Id;
                    //s2.transactionID = pdPageStep + '_' + pdTransactionId;
                    //s2.eVar39 = 'D=xact';
                }

                /*---- wbg|form|rq2 ----
                    eVar41:Form-Type(pdFormIsStp & pdFormVariant)
                    Convention: captured on all STP form application steps ,
                    sampleValues: stp_na, stp_unlock, stp_activate, non-stp
                */
                /*
                old code only for oneclick
                if (pdFormIsStp) {
                    digital['dd.formType'] = 'stp' + '_' + (lowerCaseVal(pdFormVariant) || 'na');
                } else {
                    digital['dd.formType'] = 'non-stp';
                }
                */
                // extended version for oneclick and oregon
                if (pdFormIsStp) {
                    /* for oneclick forms which are stp*/
                    digital['dd.formType'] = 'stp' + '_' + (lowerCaseVal(pdFormVariant) || 'na');
                } else if (pdSiteName === 'oregon' && pdFormVariant) {
                    /* works for oregon when formvariant is present */
                    digital['dd.formType'] = 'non-stp' + '_' + (lowerCaseVal(pdFormVariant) || 'na');
                } else {
                    /* when non stp and oregon with no formVariant */
                    digital['dd.formType'] = 'non-stp';
                }

                /*---- wbg|form|rq4 ----
                    eVar43:Form-Type(pdAccountType)
                    Convention: captured on all application steps ,
                    sampleValues: single, joint or multiple
                */
                if(pdAccountType){
                    digital['dd.accountType'] = lowerCaseVal(pdAccountType);
                }
                /*---- wbg|form|rq6 ----
                    prop43:Form-Type(pdBusinessType)
                    Convention: captured on all application steps ,
                    sampleValues: sole-trader, director
                */
                if(pdBusinessType){
                    digital['dd.businessType'] = lowerCaseVal(pdBusinessType);
                }
                if (pdFormFieldObj) {
                    digital['dd.formFieldValues'] = setFormFieldVar(pdSiteName, pdnewFormName, pdFormFieldObj)
                }
                switch (pdPageStep) {
                    /*---- wbg|form|rq7 ----
                        event17:Application Welcome
                        Convention: only for applications, used on step where visitor choose to login or continue to public forms
                    */
                    case 'welcome':
                        appendEvent(digital, 'welcome');

                        break;
                    case 'start':
                        appendEvent(digital,'appStart');
                        //appendEvent(21);
                        //ABU todo serilize event ZZZZ
                        //appendEvent(digital,'appStartSerialised',util.serialise(eventSerialisationKey, pdPageStep));
                        //util.addSerialiseEvt(digital,'event26',util.serialise(eventSerialisationKey, pdPageStep));
                        //appendEvent('event26' + s2.w_serialise(eventSerialisationKey, pdPageStep));

                        //console.log('s.events = ' + s.events);
                        //s.eVar31 = 'start';

                        break;
                    case 'save':
                        appendEvent(digital,'appSaved');
                        //appendEvent(24);
                        break;
                    case 'retrieve':
                        appendEvent(digital,'appRetrieved');
                        //appendEvent(23);
                        break;
                    case 'milestone':
                        // when application reached important milestores
                        appendEvent(digital,'appMilestone');
                        if (pdFormMilestone) {
                            digital['dd.formMilestone'] = pdFormMilestone;
                        }
                        if (pdFormMilestone && pdTransactionId) {
                            digital['dd.transactionID'] = digital['dd.applicationID'] = 'milestone:'+pdFormMilestone + '_' + pdTransactionId[0].Id;
                        }
                        break;
                    case 'complete':
                        appendEvent(digital,'appComplete');
                        //appendEvent(22);
                        // mark serial stamp as complete once hit. re-use same stamp if starting same form again if not completed, generate new serial if form has been completed (in the same origin)
                        //ABU todo serilize event ZZZZ
                        //util.addSerialiseEvt(digital,'event27',util.serialise(eventSerialisationKey, pdPageStep));
                        //s3.events = s3.apl(s3.events, 'event71' + ':' + util.serialise(eventSerialisationKey, pdPageStep), '', 1);
                        //s3.events=s3.apl(s3.events,"event1",",",1);
                        //appendEvent('event27' + util.serialise(eventSerialisationKey, pdPageStep));
                        //console.log(eventSerialisationKey);
                        //digital['dd.transactionID'] = pdTransactionId;
                        if (pdTransactionId) {
                            digital['dd.transactionID'] = digital['dd.applicationID'] = util.createTransID(pdTransactionId);
                        } else if (pageDetails.transactionID) {
                            if(/^\[CID:.+\]/i.test(pageDetails.transactionID)){ // updated to ignore case for some domino forms
                            // if using CID format, take last 20 chars of CID cookie (if exists)+timestamp
                                digital['dd.transactionID'] = digital['dd.applicationID'] = (pageDetails.transactionID).replace(/\[CID:(.+)\]/ig,'$1');
                            }else{
                                /* pick up transactionID when it is the only one available */
                                digital['dd.transactionID'] = digital['dd.applicationID'] = pageDetails.transactionID;
                            }
                        }
                        //s2.transactionID = pdTransactionId;
                        //s.eVar39 = 'D=xact'; // if multiple transacation ID's, what happens on forms without productID? are there any without products? Have form txn ID + multi prod IDs?
                        //s.purchaseID = 'D=v39';
                        //s.purchaseID = 'D=xact';

                        /*
                        if(/^\[CID:.+\]/i.test(prchId)){ // updated to ignore case for some domino forms
                        // if using CID format, take last 20 chars of CID cookie (if exists)+timestamp
                        prchId = /.{1,20}(?=\])/.exec(prchId.replace(/(-|\s|:|^\[CID)/gi,''))[0];
                        }
                        // always trim purchaseID to first 20 chars only
                        s.purchaseID = prchId.substring(0,20);
                         */
                        if (pdTransactionId) {
                            prchId = lowerCaseVal(cleanText(pageDetails.appReference[0].Id || ''));
                            digital['dd.purchaseID'] = prchId;
                        }

                        //s2.purchaseID = prchId; // confirm uniqueness
                        //s.events = s.apl(s.events,'purchase',',',2);
                        appendEvent(digital,'purchase');
                        //appendEvent('purchase'); // only when approved? (not declined, referred, customer declined). Only really used for serialising, so maybe always fire?...

                        //s.eVar31 = 'stop';
                        //s.eVar32 = 'start';
                        //s.eVar33 = 'stop';

                        // apply transactionType and transactionAmount against first product if legacy values exist
                        if (pdProductID && pdProductID[0] && !pdProductID[0].events) {
                            //pdProductID[0].events=lowerCaseVal(pdTransactionType,1)+(pdFormStatus?':'+pdFormStatus:'')+'='+pdTransactionAmount; // apply status directly to first product
                            //pdProductID[0].events=lowerCaseVal(pdTransactionType,1)+'='+pdTransactionAmount; // generic pdFormStatus applied during prod string processing
                            pdProductID[0].events = (pdTransactionType || notSet) + '=' + pdTransactionAmount; // generic pdFormStatus applied during prod string processing
                        }
                        // - - - - - - - - -  wbg|form|rq14 - - - - - - - - - - -
                        if (pdFormIsStp && pdAppStatus) {
                            // call applicationStatus function here with pdAppStatus as argument
                            digital['dd.applicationStatus'] = util.appStatusSetup(pdAppStatus);
                        }else if (pdAppStatus){
                            digital['dd.applicationStatus'] = JSON.stringify(pdAppStatus).replace(/(\[|\]|\{|\}|\'|\")/ig,'').replace(/\,/ig,'|');
                        }

                        // track status of whole form submission (even though form may include multiple products)
                        // pdFormStatus is applied directly to merchandising with every transaction amount band
                        /*
                        switch (pdFormStatus) {
                        case 'approved':
                        appendEvent(18);
                        break;
                        case 'declined':
                        appendEvent(19);
                        break;
                        case 'referred':
                        appendEvent(20);
                        break;
                        }
                         */

                        //if (/^approved($|:upsell|:downsell$)/i.test(pdFormStatus)) {
                        if (/^approved(?!:downselldeclined)/i.test(pdFormStatus)) {
                            appendEvent(digital,'appApproved');
                            //appendEvent(18);
                        }
                        //if (pdFormStatus === 'declined') {
                        if (/^declined/i.test(pdFormStatus)) {
                            appendEvent(digital,'appDeclined');
                            //appendEvent(19);
                        }
                        //if (pdFormStatus === 'referred') {
                        if (/^referred/i.test(pdFormStatus)) {
                            appendEvent(digital,'appReferred');
                            //appendEvent(20);
                        }
                        if (pdFormStatus === 'approved:downselldeclined') {
                            appendEvent(digital,'appCustDeclined');
                            //appendEvent(25);
                        }

                        break;
                }
                break;
            case 'quote':
                /*
                  ---- wbg|form|rq8 ----
                  ---- wbg|form|rq9 ----
                  ---- wbg|form|rq10 ----
                  ---- wbg|form|rq11 ----
                event73,74,86,& 87:Quote start, complete, save and retrive
                Convention:added new events, in addition capture transactionID/applicationID on start/save and complete quote
                */
                switch (pdPageStep) {
                    case 'start':
                        appendEvent(digital, 'quoteStart');
                        if (pdTransactionId) {
                            digital['dd.transactionID'] = digital['dd.applicationID'] = 'quote_' + util.createTransID(pdTransactionId);
                        }

                        break;
                    case 'save':
                        appendEvent(digital, 'quoteSaved');
                        if (pdTransactionId) {
                            digital['dd.transactionID'] = digital['dd.applicationID'] = 'quote_' + util.createTransID(pdTransactionId);
                        }

                        break;
                    case 'retrieve':
                        appendEvent(digital, 'quoteRetrieved');

                        break;
                    case 'complete':
                        appendEvent(digital, 'quoteComplete');
                        if (pdTransactionId) {
                            digital['dd.transactionID'] =  digital['dd.applicationID'] = 'quote_' + util.createTransID(pdTransactionId);
                        }
                        break;
                    }
                break;
                case 'servererror':
                    // 404, 500 etc. on page load
                    // align pageName for errors to correspond to similar section details of other pages
                    sPageNameTemp = util.siteID + ':error';
                    //console.log(sPageNameTemp);
                    pageNamePathArray = sPageNameTemp.split(':').slice(0, 4); // provide truncated path for section details, if error page (remove URL)
                    if (String(pageDetails.errorCode) === '404') {
                        pdErrorDetails='page not found'
                        //s2.pageType = 'errorPage';
                    }
                    digital['dd.errorCode'] =  (pdErrorCode ? pdErrorCode+':':'') + pdErrorDetails
                    digital['dd.pageType'] = 'errorPage';
                    util.addEvt(digital,'error');
                    break;

                    // pageerror pageType doesn't make sense - errors would usually occur on another pageType
                    //case 'pageerror': // not required? always capture errors if set?
                    //s.prop17=s.siteID+':'+lowerCaseVal(s.prop17||pageDetails.errorCode,1); // different approach for form errors below
                    //	s.prop17=lowerCaseVal(s.prop17||pageDetails.errorCode,1); // stored in list prop
                    //	break;
                }

                // apply any global pageName replace
                //sPageNameTemp = s.w_valReplace(sPageNameTemp, 'appmeasurement_pageNameReplace');
                sPageNameTemp = util.valReplace(util.valReplace(sPageNameTemp, util.lStor('get', 'appmeasurement_pageNameReplace')), pageDetails.pageNameReplace); // global + local replace
                //sPageNameTemp = s2.w_valReplace(s2.w_valReplace(sPageNameTemp, s2.w_lStor('get', 'appmeasurement_pageNameReplace')), pageDetails.pageNameReplace); // global + local replace
                // standard changeIf syntax, operating on pageName property only
                //sPageNameTemp = changeIf({
                //		'pageName' : sPageNameTemp,
                //		'changeIf' : s.w_lStor('get', 'appmeasurement_pageNameReplace')
                //	}).pageName; // analytics_pageNameReplace > analytics_pageNameChange = originPageNameChange

                // remove any detail for this page only
                //sPageNameTemp = sPageNameTemp.replace(new RegExp(pageDetails.pageNameReplace, 'gi'), ''); // remove anything matching pageNameReplace regex. if not used, use changeIf instead?
                //sPageNameTemp = changeIf({
                //		'pageName' : sPageNameTemp,
                //		'changeIf' : pageDetails.pageNameReplace
                //	}).pageName; // pageNameReplace > pageNameChange = pageNameChange

                // copy pageName details to section eVars -
                // now copying longest detail to all section vars for more accurate reporting on page views in/below that section
                // -----------------------------------------------------------------------------------------------------------------------------
                pageNamePathArray = pageNamePathArray || sPageNameTemp.split(':');
                //console.log(pageNamePathArray);
                //console.log(sPageNameTemp);
                //s.w_pathArr = pageNamePathArray; // for use outside this function
                // New version with experience removed from pageName -

                //Abu to investigate ZZZ
                digital['dd.brand']= pageNamePathArray[0]; // Brand
                digital['dd.site']     = pageNamePathArray[1]? pageNamePathArray.slice(0, 2).join(':') : digital['dd.brand'];
                digital['dd.section1'] = pageNamePathArray[2]? pageNamePathArray.slice(0, 3).join(':') : digital['dd.site'] ;
                digital['dd.section2'] = pageNamePathArray[3]? pageNamePathArray.slice(0, 4).join(':') : digital['dd.section1'] ;
                digital['dd.section3'] = pageNamePathArray[4]? pageNamePathArray.slice(0, 5).join(':') : digital['dd.section2'] ;
                digital['dd.section4'] = pageNamePathArray[5]? pageNamePathArray.slice(0, 6).join(':') : digital['dd.section3'] ;

                //dd.brand = pageNamePathArray[0]; // Brand
                //s2.eVar6 = pageNamePathArray[0]; // Brand
                //s2.prop6 = dVar(6);
                //if (pageNamePathArray[1]) { // Site

                //Abu to investigate ZZZ
                //dd.site =  pageNamePathArray.slice(0, 2).join(':');
                //s2.eVar1 = pageNamePathArray.slice(0, 2).join(':');
                //s2.prop1 = dVar(1);
                //}
                //if (pageNamePathArray[2]) { // Site section



                //s2.eVar2 = pageNamePathArray.slice(0, 3).join(':');
                //s2.prop2 = dVar(2);

                //ABU Not required DynamicVariable
                //if (s2.eVar2 === sPageNameTemp) {
                //	s2.eVar2 = s2.prop2 = pageNameDynamicVariable;
                //}
                //}
                //if (pageNamePathArray[3]) { // Sub section

                //s2.eVar3 = pageNamePathArray.slice(0, 4).join(':');
                //s2.prop3 = dVar(3);
                //ABU Not required DynamicVariable
                //if (s2.eVar3 === sPageNameTemp) {
                //	s2.eVar3 = s2.prop3 = pageNameDynamicVariable;
                //}
                //}
                //if (pageNamePathArray[4]) { // Sub sub section

                //s2.eVar4 = pageNamePathArray.slice(0, 5).join(':');
                //s2.prop4 = dVar(4);
                //ABU Not required DynamicVariable
                //if (s2.eVar4 === sPageNameTemp) {
                //	s2.eVar4 = s2.prop4 = pageNameDynamicVariable;
                //}
                //}
                //if (pageNamePathArray[5]) { // Sub sub sub section

                //s2.eVar5 = pageNamePathArray.slice(0, 6).join(':');
                //s2.prop5 = dVar(5);
                //ABU Not required DynamicVariable
                //if (s2.eVar5 === sPageNameTemp) {
                //	s2.eVar5 = s2.prop5 = pageNameDynamicVariable;
                //}
                //}

                // server from full domain
                //ABU server is move to do_plugins
                //s.server = lowerCaseVal(fullLocObj.hostname);
                //digital['dd.server'] = lowerCaseVal(fullLocObj.hostname + (/\s(banking|dev)\s/i.test(util.codeVers) && voyagerLoadBalancerID ? '-' + voyagerLoadBalancerID : '')); // capture server/load balancer ID R01 = Ryde, WS01 = Western Sydney
                //s2.server = lowerCaseVal(fullLocObj.hostname + (/\s(banking|dev)\s/i.test(s2.w_codeVers) && voyagerLoadBalancerID ? '-' + voyagerLoadBalancerID : '')); // capture server/load balancer ID R01 = Ryde, WS01 = Western Sydney

                if(pdBranchLocationCode){
                    digital['dd.branchcode'] = pdBranchLocationCode;
                }
                if(pdQuoteStatus){
                    pdQuoteStatus = pdQuoteStatus.replace(/\[\{(.*?)\}\]/ig,'$1').replace(/\"/ig,'').replace(/\,/ig,'|');
                    digital['dd.quoteStatus'] = lowerCaseVal(cleanText(pdQuoteStatus));
                }
                if(pdSetupOptions){
                    digital['dd.setupOptions']=lowerCaseVal(cleanText(pdSetupOptions));
                }
                //s2.eVar7 = pageExperience;
                //s2.channel = dVar(7);

                // standard form name details
                //formNameAlt=(pdFormName||pdTransactionType); // Payments use pdTransactionType as part of form name, not the formName from pageDetails
                /*---- wbg|form|rq15 ----
                    eVar23:made changes as part of new form name convention
                    removed the journey information from form name
                    pageType (or formtype) is now shorter (app|enq|quo) instead of application|enquiry etc
                */
                if (pdPageType && formNameAlt) {
                    //s.eVar23 = s.eVar6+':'+pdPageType+':'+formNameAlt; // excludes sub-domain, e.g. - wbc:application
                    var newPageType,
                        newFormName,
                        prodDescriptionRequired,
                        prodDescription,
                        productIDExists,
                    newPageType = pdPageType;

                    newPageType = lowerCaseVal(
                        newPageType.replace(/application/i, 'app')
                            .replace(/enquiry/i, 'enq')
                            .replace(/quote/i, 'quo')
                            .replace(/selfservice/i, 'ser')
                            .replace(/registration/i, 'reg')
                            .replace(/payment/i, 'pay')
                            .replace(/survey/i, 'sur')
                    );

                    newFormName = util.siteID + ':' + newPageType + ':' + formNameAlt; // includes sub-domain, e.g. - wbc:online:application // if this matches v3, D=v3 could be used here
                    digital['dd.formName'] = newFormName;
                    /*---- wbg|form|rq17 ----
                    eVar16: product description new eVar for BT requirement
                    concatenate formName and product description from data layer, only populate for quote/enquiry/application pages.
                    */
                    prodDescriptionRequired = /(app|quo|enq)/i.test(newPageType);
                    if (pdProductID && pdProductID[0]) {
                        productIDExists = true;
                    }

                    if (prodDescriptionRequired && productIDExists) {
                        prodDescription = pdProductID[0].ProductName;
                        digital['dd.prodDescription'] = newFormName + ':' + prodDescription
                    }

                    //s2.eVar23 = util.siteID + ':' + pdPageType + ':' + formNameAlt; // includes sub-domain, e.g. - wbc:online:application // if this matches v3, D=v3 could be used here
                    //s2.prop23 = dVar(23);

                    if (pdPageStep === 'start') {
                        appendEvent(digital, 'formStart');
                        //appendEvent(55);
                    }
                    if (pdPageStep === 'complete') {
                        appendEvent(digital, 'formComplete');
                        //appendEvent(56);
                    }

                    // ---- wbg|form|rq1 ----
                    // moved into this section to populate journeType wherever available irrespective of pageType
                    if (pdJourneyType) {
                        digital['dd.journeyType'] = lowerCaseVal(pdJourneyType);
                    }

                }

                // details to track on full page loads only. i.e. not on every click...
                /*
                if(s.w_pgLoad){
                // if available after page load
                s.list2=s.c_r('banners'); // check suitable cookie name. this should contain a comma separated list of banners seen on previous page
                if(s.list2){
                appendEvent(11);
                s.c_w('banners',0,new Date(0));
                }

                // capture number of form validation errors from cookie
                if(s.c_r('errCount')){
                s.prop17=s.c_r('errCode');
                //s.eVar30 = (s.prop17.indexOf(s.w_inlErr+',')>-1? s.prop17 : 'defined errors') + ':' + s.c_r('errCount');
                s.eVar30 = 'errors:' + s.c_r('errCount');
                s.c_w('errCode',0,new Date(0));
                s.c_w('errCount',0,new Date(0));
                }

                // Navigation menu ID
                s.prop59=s.c_r('s_nav');
                s.c_w('s_nav','',new Date(0)); // remove s_nav cookie after tracking

                // if search results 'click past' rank cookie has been set from result link click, track the rank and click event and delete the cookie.
                s.prop16=s.c_r('cpr'); // The cookie is set on search results link clicks with the rank of the link
                if(s.prop16){
                appendEvent(15);
                s.c_w('cpr','',new Date(0)); // delete cookie after tracking
                }
                }
                 */

                // Rules to track a cross-section of key page types without pageType specified
                if (pageSite === 'www') {
                    pageTypeAlt = 'www:' + notSet; // default for unspecified pages
                    //if(sPageNameTemp==='wbc:www:home'){
                    if (/^wbc:www:(?:mobile:)?home$/i.test(sPageNameTemp)) { // desktop or mobile home page as www:home page type
                        pageTypeAlt = 'www:home';
                    }
                    //console.log(pageNamePathArray);
                    if (/^(?:pers|bus|corp)$/.test(pageNamePathArray[2])) {
                        //if (!s.eVar3) {
                        if (pageNamePathArray.length === 3) {
                            pageTypeAlt = 'www:section home'; // i.e. 1st directory only.
                        }
                        //if (!s.eVar4) {
                        if (pageNamePathArray.length === 4) {
                            pageTypeAlt = 'www:product home'; // i.e. to 2nd directory only.
                        }
                    }
                }
                /*
                if(s.w_site==='banking'){
                pageTypeAlt='banking:'+notSet; // page types on banking - can be populated in pageType key in RESX if required
                }
                if(/^(?:info|ruby|dav)$/i.test(s.w_site)){
                pageTypeAlt='microsite'; // page types for mactel etc.?
                }
                 */
                digital['dd.pageType'] = pdPageType || pageTypeAlt;
                //s2.prop7 = pdPageType || pageTypeAlt;

                // track page number for search results etc.
                if(pdPageNumber){
                    digital['dd.pageNumber'] = pdPageNumber ? ((pdPageType || notSet) + ':' + pdPageNumber) : '';
                }
                //s2.prop8 = pdPageNumber ? ((pdPageType || notSet) + ':' + pdPageNumber) : '';

                // Visit number
                //s.eVar8 = s.w_cap(s.getVisitNum(365), 1000);
                //ABU TODO   zzzz
                //s2.eVar8 = s2.w_cap(s2.getVisitNum(365), 1000) + s2.w_extCkSfx; // appends if external cookie data
                //if(s.eVar8>1000){
                //	s.eVar8='1000+';
                //}

                // days since last visit
                //s.eVar29=s.getDaysSinceLastVisit('s_lv',1);
                //s.eVar29=(s.eVar29==='0'?'zero':s.eVar29);
                //s.eVar29=s.w_fixZero(s.eVar29);
                //ABU TODO ZZZZ
                //s2.eVar29 = s2.w_cap(s2.w_fixZero(s2.getDaysSinceLastVisit('s_lv', 1)), 1000) + s2.w_extCkSfx; // appends if external cookie data
                //if(s.eVar29>1000){
                //	s.eVar29='1000+';
                //}

                // visitor id
                //ABU s2.eVar25 = s2.prop25 = (customVisitorID ? 'D=vid' : 'D=s_vi'); // if s.visitorID passed from mobile app to hybrid pages, variable will be vid, else use FP-cookie name

                //ABU TODO ZZZZ
                //s2.eVar25 = s2.prop25 = (customVisitorID ? 'D=vid' : 'D=s_mid');
                //s.prop25 = s.eVar25;



                // page status
                //s.prop40 = pageStatus;
                //s.prop40 = pdInSession ? 'secure' : 'unsecure'; // switching based on URL
                digital['dd.pageStatus'] = pdInSession ? 'auth' : 'pub'; // switching based on URL
                //s2.prop40 = pdInSession ? 'logged in' : 'public'; // switching based on URL

                // site language from page if set
                //s.eVar63 = lowerCaseVal(pageDetails.language||'en'); // only captured in prop63
                digital['dd.lang'] = lowerCaseVal(pageDetails.language || 'en');
                //s2.prop63 = lowerCaseVal(pageDetails.language || 'en');
                //s.prop63 = 'D=v63';

                // Day Of Week, Time Of Day
                //var s_tpA = s.getTimeParting('s','+10');
                //s.eVar10 = s_tpA[1]+'|'+s_tpA[2]; // Adobe orig converted format
                digital['dd.dayTime'] = util.timePart(); // local time in shorter format
                //s2.eVar10 = s2.w_timePart(); // local time in shorter format
                //s2.prop10 = dVar(10);

                // External Campaigns
                //if(!s.campaign){
                //if (doPluginsAsPageLoad) { // use getQueryParam to record details on page load only, else getValOnce is fired on the doPlugins calls from link clicks and prevents capture at subsequent load. (this assists with test page links)
                //digital['dd.campaign'] = getValueOnce(lowerCaseVal(getQuerystringParam('cid', '', fullLocObj.href)), 's_cid', 30, 'm'); // getValueOnce only if data will be sent, else value may not be sent
                //s2.campaign = getValueOnce(lowerCaseVal(getQuerystringParam('cid', '', fullLocObj.href)), 's_cid', 30, 'm'); // getValueOnce only if data will be sent, else value may not be sent
                //}

                //ABU TODO
                /*if (s2.campaign) {
                    s2.eVar16 = 'D=v0';
                    s2.eVar17 = 'D=v0';
                    s2.eVar18 = crossVisitPrtcptn(s2.campaign, 's_ev18', '30', '5', '>', 'event22'); // this is cleared every time event22 fires. i.e. Application Complete step
                }

                //console.log('ORIG s.list2  = ' + s.list2); // impressions from banner cookie related to previous page, collected after it loaded
                //console.log('pdPreImprs    = ' + pdPreImprs); // any other impressions passed for the current page after trackPage was called, but before it completed (and scanning links)
                pdPreImprs = pdPreImprs ? (pdPreImprs||'').split(',') : [];
                for (prpty = 0; prpty < pdPreImprs.length; prpty++) {
                    digital['dd.list2'] = util.apl(digital['dd.list2'], pdPreImprs[prpty], ',', 2);
                    //s2.list2 = s2.apl(s2.list2, pdPreImprs[prpty], ',', 2);
                }
                //console.log('NEW s.list2   = ' + s.list2); // combined list of impressions for previous page

                if (digital['dd.list2']) {
                    appendEvent(digital,'intImpressions');
                    //s2.w_addEvt(11);
                }

                // Internal banner clicks
                pidQuerystring = lowerCaseVal(getQuerystringParam('pid', '', fullLocObj.href));
                //if (doPluginsAsPageLoad) { // use getQueryParam to record details on page load only, else getValOnce is fired on the doPlugins calls from link clicks and prevents capture at subsequent load. (this assists with test page links)
                digital['dd.intCampaign']  = getValueOnce(pidQuerystring, 'u_pid', 30, 'm');
                //s2.eVar22 = getValueOnce(pidQuerystring, 's_pid', 30, 'm');
                //}

                // count every pid click for comparison to getValueOnce count
                if (pidQuerystring) {
                    appendEvent(digital,'pidTotalClicks');
                    //appendEvent(10);
                }

                //if(s.eVar22&&!s.eVar65){
                if (digital['dd.intCampaign']) {
                    appendEvent(digital,'intClickThroughs');
                    //appendEvent(12);
                    //ABU todo zzz`
                    //s2.eVar20 = crossVisitPrtcptn(s2.eVar22, 's_ev20', '30', '5', '>', 'event22');
                }
                //if (doPluginsAsPageLoad) { // use getQueryParam to record details on page load only, else getValOnce is fired on the doPlugins calls from link clicks and prevents capture at subsequent load. (this assists with test page links)
                digital['dd.extSite']  = getValueOnce(lowerCaseVal(getQuerystringParam('ref', '', fullLocObj.href)), 'refPrm', 30, 'm');
                //s2.eVar65 = getValueOnce(lowerCaseVal(getQuerystringParam('ref', '', fullLocObj.href)), 'refPrm', 30, 'm');
                //}
                // incoming links from AFS-group sites
                //if(s.eVar22&&s.eVar65){
                // ref is now just an additional parameter for tracking links from other sites
                if (digital['dd.extSite'] ) {
                    appendEvent(digital,'linkClicksAFS');
                    //appendEvent(72);
                }
                //else{
                //	s.eVar65='';
                //}
                */
                // Page modules shown on dashboard
                // refer to widget name mapping in resx to lookup friendly names
                //pdModules=lowerCaseVal((pageDetails.modules||'').replace(/\B[aeiou]\B|\s|widget/gi,'').replace(/accnts/gi,'acts').replace(/pymnts/gi,'pmts'));
                //pdModules=(pageDetails.modules||'').replace(/\B[aeiou]\B|\s|widget/gi,'').replace(/accnts/gi,'acts').replace(/pymnts/gi,'pmts');
                //pdModules=(pageDetails.modules||'').split(',');
                //pdModules = pdModules.split(',');
                //ABU REMOVE MODULE
                /*friendlyModules = util.moduleLookup((pageDetails.modules || '').split(','), (pageDetails.moduleKey || '').split(','));

                //s.eVar55 = getValueOnce((friendlyModules ? (/:overview:dashboard$/i.test(sPageNameTemp) ? 'grid' : 'list') + ',' + friendlyModules : ''), 'mdlVar', 0); // modules will be in grid format on overview/dashboard
                dd.pageModuleSet = getValueOnce((pageDetails.moduleLayout || '') + (friendlyModules ? ',' + friendlyModules : ''), 'mdlVar', 30, 'm'); // modules will be in grid format on overview/dashboard
                //s2.eVar55 = getValueOnce((pageDetails.moduleLayout || '') + (friendlyModules ? ',' + friendlyModules : ''), 'mdlVar', 30, 'm'); // modules will be in grid format on overview/dashboard

                //s.prop55 = 'D=v55';
                //s2.prop55 = dVar(55);

                // call every time on dashboard page to compare current to previous modules and diff for added/removed
                // except when only switching profiles. when switching profile, modules change, but not through direct modification.
                if (userSwitchedProfile) {
                    // when switching, update stored module set to current profile modules
                    s2.c_w('mdlSet', friendlyModules);
                } else {
                    // track as a module change
                    s2.prop64 = s2.w_checkModuleChanges('mdlSet', friendlyModules);
                    if (s2.prop64) {
                        appendEvent(70);
                    }
                } */

                /*ABU TODO Click map to Actifity MAP
                // clear invalid clickmap values generated for custom links
                clickMapOid = (/(.*oid%3D)(.*?)(%26|$)/).exec(s2.c_r('s_sq'));
                if (clickMapOid && clickMapOid[2]) {
                    if (!(/_[0-9]+$/).test(clickMapOid[2])) {
                        s.c_w('s_sq', 0, dateZero); // remove invalid s_sq cookie
                    }
                }*/

                // Featured content - fid/wbcfrom - for secondary promo tracking (Patrick)
                //if (doPluginsAsPageLoad) { // use getQueryParam to record details on page load only, else getValOnce is fired on the doPlugins calls from link clicks and prevents capture at subsequent load. (this assists with test page links)
                pdFeaturedContent = getValueOnce(lowerCaseVal((cleanText(pageDetails.featuredContent) || getQuerystringParam('fid', '', fullLocObj.href)) || getQuerystringParam('wbcfrom', '', fullLocObj.href)), 's3_feat', 30, 'm');
                //s2.eVar60 = getValueOnce(lowerCaseVal(getQuerystringParam('fid', '', fullLocObj.href) || getQuerystringParam('wbcfrom', '', fullLocObj.href)), 'feat', 30, 'm');
                //}
                if (pdFeaturedContent) {
                    digital['dd.featuredContent'] = pdFeaturedContent;
                    appendEvent(digital,'featuredContent');
                    //appendEvent(66);
                    //s2.prop60 = dVar(60);
                }
                //notification and messaging
                if(pdNotification && pdNotification.length>=1){
                    var notifications = '';
                    for(var i=0; i<pdNotification.length; i++){
                        notifications=s3.apl(notifications,(pdNotification[i].notificationTitle||''),',',2);
                    }
                    digital['dd.notificationTitle'] = notifications;
                    appendEvent(digital,'notificationImpression');
                }
                if(pdNotificationDetail){
                    digital['dd.notificationTitle'] = pdNotificationDetail;
                    appendEvent(digital,'notificationDetail');
                }
                if(pdPageProperty){
                    digital['dd.pageProperty'] = pdPageProperty;
                }
                if(pdChatbotName){
                    digital['dd.chatbotName'] = pdChatbotName;
                }
				/* --- Role Type --- */
				if(pdRoleType){
					digital['dd.roleType'] = lowerCaseVal(pdRoleType);
				}
				/* --- Network Profile Type --- */
				if(pdProfileType){
					digital['dd.profileType'] = lowerCaseVal(pdProfileType);
				}
                //ABU toDO crossVisitPrtcptn
                // Combined Internal External Stack
                /*if (s2.eVar22) {
                    s2.eVar19 = crossVisitPrtcptn(s2.eVar22, 's_ev19', '30', '10', '>', 'event22');
                }
                if (s2.campaign) {
                    s2.eVar19 = crossVisitPrtcptn(s2.campaign, 's_ev19', '30', '10', '>', 'event22');
                }*/

                // Paid/Natural Search Keyword
                //ABU toDO
                /*s2.prop18 = pageNameDynamicVariable; // set to just pageName as default
                s2._channelParameter = 'Campaign|cid';
                s2.w_channelManager('cid');

                //channelManagerKeywords = cleanText(s._keywords || ''); // filter search keywords a bit - strip multiple spaces etc.
                channelManagerKeywords = cleanText(s2._keywords); // filter search keywords a bit - strip multiple spaces etc.

                if (s2._channel === 'Natural Search') {
                    channelManagerSearchType = 'NS';
                    // prop18 seo keywords and entry page
                    s2.prop18 = 'D="' + channelManagerKeywords + '|"+pageName';
                }
                //if(s._channel==='Campaign'&&/^sem:/i.test(s._campaign)){ // if cid param, and value starts with 'sem:' (just check for any CID). confirm identifier for PPC tracking codes
                if (s2._channel === 'Campaign' && channelManagerKeywords !== 'n/a') { // only if cid param exists and keywords are found, it's paid search. We may not have keywords if they are not passed by the search engine (usually for NS)
                    channelManagerSearchType = 'PS';
                }
                if (channelManagerSearchType) {
                    s2.eVar11 = channelManagerKeywords === 'n/a' ? 'Keyword Unavailable' : channelManagerKeywords;
                    s2.prop11 = dVar(11);

                    s2.eVar12 = crossVisitPrtcptn(channelManagerSearchType + '|' + channelManagerKeywords, 's_ev12', '30', '5', '>', 'event22');
                }*/

                // Lifecycle. consider re-setting to avoid build up to later levels?
                //ABU toDO
                /*visitorLifecycle = s2.c_r('s_lfcl');
                if (visitorLifecycle === '') { // No previous lifecycle cookie
                    if (!s2.c_w('testCkie', 'set', new Date(+new Date() + 10000))) { // test if lifecycle cookie can be set to prevent events from re-firing
                        visitorLifecycle = 'No cookies';
                    } else {
                        s2.c_w('testCkie', 0, dateZero);
                        visitorLifecycle = visitorLifecycleAware;
                        appendEvent(6);
                    }
                }
                if (visitorLifecycle === visitorLifecycleAware && (/\b(event(13|21|30|31|54|61|63|68))\b/i).test(s2.events)) { // Confirm Engagement status criteria
                    visitorLifecycle = visitorLifecycleEngaged;
                    appendEvent(7);
                }
                if (visitorLifecycle === visitorLifecycleEngaged && (/\b(event(22))\b/i).test(s2.events)) { // Conversion status criteria
                    visitorLifecycle = visitorLifecycleConverted;
                    appendEvent(8);
                }
                if (visitorLifecycle === visitorLifecycleConverted && (/\b(event(46))\b/i).test(s2.events) && s2.getVisitNum(365) > 1) { // Retention status criteria
                    visitorLifecycle = visitorLifecycleRetained;
                    appendEvent(9);
                }
                s2.c_w('s_lfcl', visitorLifecycle, datePlusOneYear);
                s2.eVar36 = visitorLifecycle + s2.w_extCkSfx; // appends if external cookie data
                s2.prop36 = dVar(36);
                */
                // search results clickthru event for auto suggest results only *au
                wbcfromQuerystring = lowerCaseVal(getQuerystringParam('wbcfrom', '', fullLocObj.href));
                if (/sitesearch:autosuggest:results/i.test(wbcfromQuerystring)) {
                    appendEvent(digital,'intSearchClickThru');
                    //s2.w_addEvt(15);
                    // clickthru event from "search results page" is triggered when prop16 is set
                }

                // search results details *au
                // new way to track clickthru, rank, result category etc
                // convention for search result details eVar
                //search-source|result-type|searched-keyword|result-category|result-rank
                // example output: source:search-page|type:natural|kw:low-rate-card|cat:services|rank:1
                // example output non natural type: source:search-page|type:recommended|kw:low-rate-card
                // example output non natural type: source:search-page|type:quicklinks|kw:low-rate-card
                // AEM release 1.1 updated type query param to result-type
                isSearchResultLanding = lowerCaseVal(getQuerystringParam('searchsource', '', fullLocObj.href));
                if (isSearchResultLanding) {
                    var searchOrigin,
                        searchResultType,
                        searchKeyword,
                        searchResultCategory,
                        searchResultRank;
                    searchOrigin = lowerCaseVal(getQuerystringParam('searchsource', '', fullLocObj.href));
                    searchResultType = lowerCaseVal(getQuerystringParam('result-type', '', fullLocObj.href));
                    searchKeyword = lowerCaseVal(getQuerystringParam('kw', '', fullLocObj.href));
                    searchResultCategory = lowerCaseVal(getQuerystringParam('cat', '', fullLocObj.href));


                    switch (searchResultType) {
                        case 'natural':
                        case 'natural:fast-answer':
                            searchResultRank = lowerCaseVal(getQuerystringParam('rank', '', fullLocObj.href));
                            s3.prop16 = searchResultRank;
                            if (s3.prop16) {
                                appendEvent(digital,'intSearchClickThru');
                                //s3.w_addEvt(15);
                            }
                            s3.eVar13 = 'source:' + searchOrigin + '|' + 'type:' + searchResultType + '|' + 'kw:' + searchKeyword + '|' + 'cat:' + searchResultCategory + '|' + 'rank:' + searchResultRank;
                            break;
                        case 'recommended':
                        case 'fast-answer':
                        case 'quicklinks':
                            s3.eVar13 = 'source:' + searchOrigin + '|' + 'type:' + searchResultType + '|' + 'kw:' + searchKeyword;
                            // added event15 to include recommend and quicklinks for clickthru tracing *au 24/08
                            appendEvent(digital,'intSearchClickThru');
                            //s3.w_addEvt(15);
                            break;
                    }
                }
                //search type var to understand type of search feature used .. suggested/predictive/simillar to ..
                wbcSearchType = lowerCaseVal(getQuerystringParam('searchtype', '', fullLocObj.href));
                if (wbcSearchType) {
                    s3.eVar15 = 'searchtype:' + wbcSearchType;
                }
                // Previous Page name
                //s.prop15 = s.getPreviousValue(sPageNameTemp, 'gpv_p15', '');
                //if (s.prop15 === sPageNameTemp) {
                //	s.prop15 = pageNameDynamicVariable;
                //}
                // refactored and referencing lastPg cookie

                //s2.prop15 = lastSentPage === sPageNameTemp ? pageNameDynamicVariable : lastSentPage;


                // Previous pixel length
                //s2.prop69 = s2.w_cap(s2.c_r('lastReqLen'), 5000);
                //if(s.prop69>5000){
                //	s.prop69='5000+';
                //}

                // capture URL
                //s.eVar26 = 'D=Referer'; // this is the full unprocessed page URL from HTTP header (excludes hash)
                //s.eVar26 = 'D=Referer' + (fullLocObj.hash ? '+"' + fullLocObj.hash + '"' : ''); // this is the full unprocessed page URL from HTTP header (includes hash)
                //s2.eVar26 = 'D=Referer+"' + fullLocObj.hash.replace(s2.w_guidRgx, '(GUID)') + '"'; // this is the full unprocessed page URL from HTTP header (includes hash)

                //s2.prop26 = 'D=g'; // this is the filtered page URL from JS document (will include hash if any)


                // track scode version
                //digital['dd.analyticsVersion'] = util.codeVers;
                //s2.prop39 = s2.w_codeVers;

                // track site + source data version/details + pageKey for page audit.
                // dont capture in IE - makes pixel too long
                //ABU TODO no if (!s.isie) { // as of s_code version H.26.2, s.isie == false in IE11 due to useragent change in IE 11 to distinguish its DOM compatibility vs. older versions
                digital['dd.pageAudit']= pageSite + ':' + lowerCaseVal(pageDetails.src, 1) + ':' + lowerCaseVal(pageDetails.pageKey, 1);
                //s2.prop13 = pageSite + ':' + lowerCaseVal(pageDetails.src, 1) + ':' + lowerCaseVal(pageDetails.pageKey, 1);
                //}

                // Site release version - set on OTP pages, apps, public? etc.
                digital['dd.siteVersion'] = pageSite +
                                            (pageDetails.siteVersion ? (':' + lowerCaseVal(pageDetails.siteVersion, 1)):'') +
                                            (pageDetails.dataLayerVer ? (':dataVar:'+ lowerCaseVal(pageDetails.dataLayerVer, 1)):'');
                //s2.eVar52 = pageSite + ':' + lowerCaseVal(pageDetails.siteVersion, 1);
                //s2.prop52 = dVar(52);
                if(pdErrorCode || pdErrorDetails){
                    digital['dd.errorCode'] =  (pdErrorCode ? pdErrorCode:'(notset)') + (pdErrorDetails? ':'+pdErrorDetails:'');
                    digital['dd.pageType'] = 'errorPage';
                    util.addEvt(digital,'error');
                }

                // fid (3rd-party fallback visitor ID) not required when on first party collection domain (i.e. westpac.com.au). What if other domain? (we capture s_vi not fid)
                //if(/\.westpac\.com\.au$/i.test(location.hostname)){
                //if (/\.westpac\.com\.au$/i.test(fullLocObj.hostname)) {
                //if (s2.w_coreDomain) {
                //	s2.fid = ''; // Not used for implementations that use first-party cookies.
                //}

                /*s2.plugins = ''; // empty to prevent tracking plugins. not available for reporting in SC15

                // clean referrer to reduce length and remove session details (creates too many values), etc.
                //s.testRef='https://uat.banking.westpac.com.au/cust/wps/portal/wodp/c1/04_SB8K8xLLM9MSSzPy8xBz9CP0os3gvRx9X04_SB8K8xLLM9MSSzPy8xBz9CP0os3gvRx9X04_SB8K8xLLM9MSSzPy8xBz9CP0os3gvRx9X';
                //s.referrer=s.w_cleanURL(s.testRef,2);
                //s.referrer=s.w_cleanURL('',2);
                //s.referrer=s.w_cleanURL(null,2);
                if (!s2.w_refSent) { // added to match adobe approach in AppMeasurement v1.4.3
                    s2.w_refSent = true;

                    s2.referrer = s2.w_cleanURL(document.referrer, 2);

                    // set s.referrer here if able to identify sources otherwise incorrectly tracked as 'None' or 'Unspecified'. e.g. app links etc...
                    // nativeAppVersion
                    // file://native.app/?cid=app_abc_123

                    // edm
                    if (/\:edm\:/i.test(s2.campaign)) {
                        s2.referrer = 'mail://edm.cid/?cid=' + cleanText(s2.campaign) + '&referrer=' + (s2.referrer || notSet); // Force any :edm: CID to Email Referrer Type
                    }
                }*/

                // convert product array into Omniture-format string
                //sProductsTemp = s.w_prodStr(pdProductID, pageDetails);
                // run replace function on s.products
                //console.log('ORIG s.products = ' + s.products);
                //s.products = s.w_valReplace(s.w_prodStr(pdProductID, pageDetails), 'appmeasurement_productsReplace');  // global replace
                //s2.products = s2.w_valReplace(s2.w_valReplace(s2.w_prodStr(pdProductID, pageDetails), s2.w_lStor('get', 'appmeasurement_productsReplace')), pageDetails.productsReplace); // global + local replace
                //s.products = changeIf({
                //		's.products' : s.w_prodStr(pdProductID, pageDetails),
                //		'changeIf' : s.w_lStor('get', 'appmeasurement_productsReplace')
                //	})['s.products'];
                //console.log('NEW  s.products = ' + s.products);

                // option to prevent sending two matching pageNames in a row
                //if (!pageDetails.s_abort) {
                //	clicks on page overwriting the stored value with this logic
                //
                //	repeatCall = !getValueOnce(sPageNameTemp, 'lastPg', 0); // this should prevent consecutive calls of same pageName. e.g. mobile 'select' screen nav, and confirmation screens as a way to serialise events
                //	if (/true/i.test(pageDetails.trackDedupe) && repeatCall) {
                //		s.abort = true;
                //	}
                //}


                // only compare to the cookie value that was read, don't write at the same time (with getValOnce)
                // this logic needs to match logic in trackPage function to prevent impressions being collected etc.

                //if (/true/i.test(pageDetails.trackDedupe) && lastSentPage === sPageNameTemp) {
                //if ((/true/i.test(pageDetails.trackDedupe) && lastSentPage === sPageNameTemp) || (/true/i.test(pageDetails.trackOnce) && s.w_pageTracked(sPageNameTemp))) {
                //if ((/true/i.test(pageDetails.trackDedupe) && lastSentPage === sPageNameTemp) || ((/true/i.test(pageDetails.trackOnce) && s.w_pageTracked(sPageNameTemp)) || s.w_globalDrop(pageDetails))) {
                // check if this page should be fired or has met a condition to drop
                //if (pageDetails._drop) {
                //	s.abort = true;

                //s.w_pgTrkStatus = 'blocked';
                //s.c_w('impTmp', 0, new Date(0)); // clear any tmp banners of aborted pages
                //}

                // populate s.pageName from local var
                //s2.pageName = sPageNameTemp;
                //WBC Banking Login status
                /*if (/:(overview:dashboard|accounts:getsummarystartpage)$/i.test(sPageNameTemp)){ //setting auth state cookie for westpac live
                    util.cookieWrite('s_wbc_auth', 1, new Date(+new Date() + (20 * 60 * 1000)),'/', util.cookieDomain());
                }*/
                if ((s3.c_r("s_wbc_auth") === '1')||((s3.c_r("s_bom_auth") === '1')||((s3.c_r("s_bsa_auth") === '1')||(s3.c_r("s_stg_auth") === '1')))){
                    digital['dd.loginStatus'] = 'logged in';
                }
                if ((s3.c_r("s_wbc_auth") === '2')||((s3.c_r("s_bom_auth") === '2')||((s3.c_r("s_bsa_auth") === '2')||(s3.c_r("s_stg_auth") === '2')))){
                    digital['dd.loginStatus'] = 'logged out';
                }

                digital['dd.pageName'] = sPageNameTemp;

                var isJSInterface = ((typeof(window.NativeJSInterface)!=="undefined") && (window.NativeJSInterface.isNativeContainer()!==false))
                if (isJSInterface){
                    if(!util.lStor('get', 'app_err')){
                        digital['dd.appid'] = util.lStor('get', 'app_id');
                        digital['dd.appCapabilities'] =util.lStor('get', 'app_capabilities');
                        s3.eVar17 = 'native app:'+ util.lStor('get', 'app_exp') +':' + util.lStor('get', 'app_id') +' capabilities:' + NativeJSInterface.getLibVersion();
                    } else{
                        digital['dd.appCapabilities'] = util.lStor('get', 'app_err');
                        s3.eVar17 = 'native app:(notset):'+ util.lStor('get', 'app_id')  +' capabilities:' + NativeJSInterface.getLibVersion();
                    }
                }
                //ABU:DEBUG Mobile app value pass
                var isMobileView = ((typeof(window.NativeJSInterface)!=="undefined") && (window.NativeJSInterface.isNativeContainer()!==false))||(/adobe_mc=.+/i.test(util.getLoc().href))||s3.c_rr('MCMID');
                //var isMobileView = ((/adobe_aa_vid=.+/i.test(util.getLoc().href))||(/s_vi=.+/i.test(util.getLoc().href))||(/adobe_mc=.+/i.test(util.getLoc().href))||s3.c_rr('MCMID')|| s3.c_r('MCMID'))
                if(isMobileView){
                    var regexMid = 'MCMID(=|\\%3D)(.+?)(?=\\?|&|;|#|\\/|\\||$|\\%7C)';
                        regexMid = new RegExp( regexMid,'i');
                    digital['dd.midUrl'] = (regexMid.test(util.getLoc().href))? util.getLoc().href.match(regexMid)[2]:'';
                    digital['dd.midCookie'] = s3.c_rr('MCMID')|| s3.c_r('MCMID');
                    digital['dd.aVidUrl'] =  util.getQueryParam('adobe_aa_vid', '', util.getLoc().href);
                    digital['dd.sviUrl'] = util.getQueryParam('s_vi', '', util.getLoc().href);
                    digital['dd.sviCookie'] = s3.c_rr('s_vi')|| s3.c_r('s_vi');
                }

            // experience from app/pageDetails
            //s.eVar7=pageExperience; // mob/mobapp/tab/tabapp is mobile suite, everything else is desktop
            //s.eVar7 = s.linkName ? 'link' : pageExperience; // switch to 'link' for link tracking
            // switch to '(link)' for link tracking where experience may not be set/available in pageDetails?
            //s.eVar7 = s.linkName ? (pageExperience || '(link)') : pageExperience;
            //digital['dd.experience'] = digital['dd.channel'] = pageExperience||util.getExp();
            if (isJSInterface||nativeAppVersion){//WBC
            //if(isMobileView){						//STG
                digital['dd.experience'] = digital['dd.channel'] = "mobapp";
             }else{
                digital['dd.experience'] = digital['dd.channel'] =(pageExperience||util.getExp()).replace(/^titan$/i, 'mob') //WBG
                //digital['dd.experience'] = digital['dd.channel'] = pageExperience||util.getExp();							   //STG
            }
            if (pdTouchPoint){ // WDP touch point
                digital['dd.touchpoint'] = pdTouchPoint ;
            }else{
                pdChannel = pdChannel
                    .replace(/^(fi|fi_self_serv|fi_mobile|fi_mob_self_serv|fi_self_serv_mobile)$/ig, 'digital')
                    .replace(/^fi_cc$/ig, 'ccc')
                    .replace(/^fi_branch$/ig, 'branch');
                digital['dd.touchpoint'] = pdChannel ? pdChannel :'digital';
            }
            s3.prop12 = (nativeAppVersion || nativeExitToBrowser) ? 'native app:' + (nativeAppVersion || '(exit app)') : '';

            // External Campaigns
            //if(!s.campaign){
            //if (doPluginsAsPageLoad) { // use getQueryParam to record details on page load only, else getValOnce is fired on the doPlugins calls from link clicks and prevents capture at subsequent load. (this assists with test page links)
            s3.campaign = util.getValOnce(util.lowerCase(util.getQueryParam('cid', '', util.getLoc().href)||pdExtCampaign), 's3_cid', 30, 'm'); // getValueOnce only if data will be sent, else value may not be sent
            //}
            if (s3.campaign) {
                //s3.eVar16 = 'D=v0';
                //s3.eVar17 = 'D=v0';
                s3.eVar18 = s3.crossVisitParticipation(s3.campaign, 's3_ev18', '30', '5', '>', 'event27'); // this is cleared every time event22 fires. i.e. Application Complete step
            }

            //console.log('ORIG s.list2  = ' + s.list2); // impressions from banner cookie related to previous page, collected after it loaded
            //console.log('pdPreImprs    = ' + pdPreImprs); // any other impressions passed for the current page after trackPage was called, but before it completed (and scanning links)
            /* ABU var pdPreImprs = pageDetails.preImprs;
            pdPreImprs = pdPreImprs ? pdPreImprs.split(',') : [];
            for (prpty = 0; prpty < pdPreImprs.length; prpty++) {
                s3.list2 = s3.apl(s3.list2, pdPreImprs[prpty], ',', 2);
            }*/
            if(pdInternalCampaignList && (typeof s3.list2 == 'undefined'|| s3.list2 =='')){
                s3.list2 = pdInternalCampaignList;
            }else if(pdInternalCampaignList && s3.list2) {
                s3.list2 = pdInternalCampaignList+','+s3.list2;
            }
            //console.log('NEW s3.list2   = ' + s3.list2); // combined list of impressions for previous page
            if (typeof s3.list2 !== 'undefined') {
                //s3.w_addEvt(11);
                if(s3.list2 !==''){
                    util.addEvt(digital,'intImpressions');
                }
            }

            //adobe Target reporting in Analytics
            if(!s3.linkType){ //only complet this step if its a page level tracking not a link tracking
                s3.list3 = s3.targetImpression(pdTargetCampaignsList); //Target impression
                if (s3.list3) {
                    //appendEvent(8);
                    if (pdTargetLocationId) {
                        s3.prop32 = pdTargetLocationId;
                    }
                    if(pdPageModules){
                        digital['dd.pageModules']=lowerCaseVal(cleanText(pdPageModules));
                    }
                    util.addEvt(digital,'targetImpression');
                    delete pageDetails.targetCampaignViewed;
                    delete pageDetails.pageModules;
                }
            }
            // Target banner clicks
            var ttIdQuerystring = pdTargetCampaignClicked||decodeURIComponent(util.lowerCase(util.getQueryParam('ttid', '', util.getLoc().href))),
                ttClickedLocationId = pdTargetClickedLocationId||decodeURIComponent(util.lowerCase(util.getQueryParam('locationid', '', util.getLoc().href))),
                ttAction=pdTargetClickedAction||decodeURIComponent(util.lowerCase(util.getQueryParam('action', '', util.getLoc().href)));
            //if (doPluginsAsPageLoad) { // use getQueryParam to record details on page load only, else getValOnce is fired on the doPlugins calls from link clicks and prevents capture at subsequent load. (this assists with test page links)
            //s3.eVar33 = util.getValOnce(ttIdQuerystring, 's3_ttid', 30, 'm');
            //removing getValOnce as this reduct the click through rates
            if (ttIdQuerystring) {
                if (ttClickedLocationId) {
                    s3.prop32 = ttClickedLocationId;
                } else if (pdTargetLocationId) { //fix target campaign click through DL same as impression
                    s3.prop32 = pdTargetLocationId;
                }
                if(ttAction){
                    s3.eVar53 = ttAction;
                    s3.prop53 = s3.eVar53;
                }
                s3.eVar33 = ttIdQuerystring
                //appendEvent(9);
                util.addEvt(digital,'targetClickThroughs');
                s3.prop33 = s3.eVar33;
            }
            //}

            // Internal banner clicks
            pidQuerystring = util.lowerCase(util.getQueryParam('pid', '', util.getLoc().href))||util.lowerCase(pdInternalCampaignClicked);
            //if (doPluginsAsPageLoad) { // use getQueryParam to record details on page load only, else getValOnce is fired on the doPlugins calls from link clicks and prevents capture at subsequent load. (this assists with test page links)
            if(!s3.linkType){ //only complet this step if its a page level tracking not a link tracking
                s3.eVar22 = util.getValOnce(pidQuerystring, 's3_pid', 30, 'm');
            }
            //}

            // count every pid click for comparison to getValueOnce count
            /*if (pidQuerystring) {
                //appendEvent(10);
                util.addEvt(digital,'pidTotalClicks');
            }*/

            //if(s.eVar22&&!s.eVar65){
            if (s3.eVar22) {
                //appendEvent(12);
                util.addEvt(digital,'intClickThroughs');
                //s3.eVar20 = s3.crossVisitParticipation(s3.eVar22, 's3_ev20', '30', '5', '>', 'event27');
                //s3.c_w("s3_ev20",'');
            }
            if(pdCampaignCodeView || pdPromoCodeView){
                digital["dd.campaignCodeList"] = util.lowerCase((pdCampaignCodeView?'cc:'+pdCampaignCodeView:'')+(pdPromoCodeView?'|pc:'+pdPromoCodeView:''))
                util.addEvt(digital,'campaignCodeImpressions');
            }
            campaignCodeQuerystring= util.lowerCase(util.getQueryParam('campaigncode', '', util.getLoc().href))||pdCampaignCodeClicked;
            promoCodeQuerystring = util.lowerCase(util.getQueryParam('promocode', '', util.getLoc().href))||pdPromoCodeClicked;

            if(campaignCodeQuerystring || promoCodeQuerystring){
                digital["dd.campaignCode"] = util.lowerCase((campaignCodeQuerystring?'cc:'+campaignCodeQuerystring:'')+(promoCodeQuerystring?'|pc:'+promoCodeQuerystring:''))
                util.addEvt(digital,'campaignCodeClickThroughs');
            }

            //if (doPluginsAsPageLoad) { // use getQueryParam to record details on page load only, else getValOnce is fired on the doPlugins calls from link clicks and prevents capture at subsequent load. (this assists with test page links)
            //s3.eVar65 = util.getValOnce(util.lowerCase(util.getQueryParam('ref', '', util.getLoc().href)), 'refPrm', 30, 'm');
            //}
            // incoming links from AFS-group sites
            //if(s.eVar22&&s.eVar65){
            // ref is now just an additional parameter for tracking links from other sites
            //if (s3.eVar65) {
                //appendEvent(72);
                //util.addEvt(digital,'afs-group');
            //}
            //else{
            //	s.eVar65='';
            //}

            // Combined Internal External Stack
            /*if (s3.eVar22) {
                s3.eVar19 = s3.crossVisitParticipation(s3.eVar22, 's3_ev19', '30', '10', '>', 'event27');
                //s3.c_w("s3_ev19",'');
            }
            if (s3.campaign) {
                s3.eVar19 = s3.crossVisitParticipation(s3.campaign, 's3_ev19', '30', '10', '>', 'event27');
                //s3.c_w("s3_ev19",'');
            }*/
            /*---- wbg|form|rq18 -----
            prop18: commented out s3.prop18 since no more part of new WBG sdd
            */
            // Paid/Natural Search Keyword
            //s3.prop18 = pageNameDynamicVariable; // set to just pageName as default
            s3._channelParameter = 'Campaign|cid';
            s3.channelManager('cid','','s3_c_m');

            //channelManagerKeywords = cleanText(s._keywords || ''); // filter search keywords a bit - strip multiple spaces etc.
            channelManagerKeywords = util.clean(s3._keywords); // filter search keywords a bit - strip multiple spaces etc.
            /*
            if (s3._channel === 'Natural Search') {
                channelManagerSearchType = 'NS';
                // prop18 seo keywords and entry page
                s3.prop18 = 'D="' + channelManagerKeywords + '|"+pageName';
            }
            */
            //if(s._channel==='Campaign'&&/^sem:/i.test(s._campaign)){ // if cid param, and value starts with 'sem:' (just check for any CID). confirm identifier for PPC tracking codes
            if (s3._channel === 'Campaign' && channelManagerKeywords !== 'n/a') { // only if cid param exists and keywords are found, it's paid search. We may not have keywords if they are not passed by the search engine (usually for NS)
                channelManagerSearchType = 'PS';
            }
            /*if (channelManagerSearchType) {
                s3.eVar11 = channelManagerKeywords === 'n/a' ? 'Keyword Unavailable' : channelManagerKeywords;
                s3.prop11 = s3.dVar(11);
                s3.eVar12 = s3.crossVisitParticipation(channelManagerSearchType + '|' + channelManagerKeywords, 's3_ev12', '30', '5', '>', 'event22');
            }*/

            s3.eVar29 = s3.getDaysSinceLastVisit('s3_lv');
            s3.prop39 = 'vid:'+(Visitor.version?Visitor.version:visitor.version)+' '+util.version+' App:'+ s3.version + ' c:'+ s3.w_codeVers +' env:'+ (pageDetails.siteEnv||'') +' h:'+ util.getLoc().hostname;
            /*if (/^sitesearch$/.test(pdPageType)) {
                //s.eVar14 = getValueOnce(lowerCaseVal(pageDetails.searchTerm,1).replace(/\d/g,'#').replace(/\s+/g,' ').replace(/^\s|\s$/g,''),'s_stv',0); // getValOnce after #. Hash only 5+ digits?
                s3.eVar14 = util.getValOnce(util.srchTerm(pdSearchTerm), 's3tv', 30, 'm'); // getValOnce after #. Hash only 5+ digits?
                if (s3.eVar14) {
                    s3.prop14 = s3.dVar(14);
                    // split search term into keywords
                    s3.list1 = util.clean(s3.eVar14.replace(/[^a-z]+/gi, ' ')).replace(/\s/g, ','); // ,4); // for list prop, remove all chars outside a-z
                    //s.eVar15 = pageBrand + ':' + (pageSite==='banking'?'secure':'public'); // OTP doesnt have site search
                    s3.w_addEvt(14);
                    //s.eVar30 = 'sitesearch:' + pdSearchResults; // use pdPageType here in place of text sitesearch string
                    s3.eVar30 = pdPageType + ':' + pdSearchResults;
                    //if(s.eVar30==='sitesearch:0'){
                    //console.log(pdSearchResults);
                    //if (s.eVar30 === pdPageType + ':0') {
                    if (pdSearchResults === '0') {
                        s3.w_addEvt(16);
                    }
                } //else{
                //	s.eVar14 = notSet;
                //}
                //}
            }*/
            // capture URL
            s3.pageName = digital['dd.pageName'];
            s3.products = util.valReplace(util.valReplace(s3.w_prodStr(pdProductID, pageDetails), util.lStor('get', 'appmeasurement_productsReplace')), pageDetails.productsReplace); // global + local replace
            //Visit number
            s3.eVar8 = util.cap(util.getVisitNum(365), 1000);
            s3.eVar21 = pageNameDynamicVariable; // pageName eVar
            //s3.w_addEvt('26:' + util.serialise(eventSerialisationKey, pdPageStep));
            //s3.events = s3.apl(s3.events,'event26' + ':' + util.serialise(eventSerialisationKey, pdPageStep), '', 1);
            // hierarchy
            //s3.hier1 = pageNameDynamicVariable;
            if(pdProductID && pdProductID[0]){
                s3.hier1 = ((pdProductID[0].ProductFamily||pdProductID[0].family)||'');
            }else{
                s3.hier1 = pageDetails.siteSection||(pageNamePathArray[1]?pageNamePathArray[1]:'');
            }
            s3.hier1 = s3.hier1 +(pageDetails.pageType ? (':'+pageDetails.pageType):'') +
                    (pageDetails.pageAction? (':'+ pageDetails.pageAction):(pageDetails.pageStep? (':'+ pageDetails.pageStep):''));
            //s3.eVar25 = s3.marketingCloudVisitorID;
            //s3.server = lowerCaseVal(fullLocObj.hostname);
            s3.server  = util.lowerCase(util.getLoc().hostname)+ (voyagerLoadBalancerID?'-' + voyagerLoadBalancerID : ''); //ABU remove + (/\s(banking|dev)\s/i.test(util.codeVers) && voyagerLoadBalancerID ? '-' + voyagerLoadBalancerID : '')); // capture server/load balancer ID R01 = Ryde, WS01 = Western Sydney
            //s2.server = lowerCaseVal(fullLocObj.hostname + (/\s(banking|dev)\s/i.test(s2.w_codeVers) && voyagerLoadBalancerID ? '-' + voyagerLoadBalancerID : '')); // capture server/load balancer ID R01 = Ryde, WS01 = Western Sydney

            //console.log('last Page'+ lastSentPage );
            //Previous page
            if(typeof lastSentPage!=='undefined'){
                digital['dd.previousPage'] = lastSentPage;
                var lastPixelLength = s3.c_r('lastPixelLen')
                digital['dd.lastPixelLength'] = lastPixelLength;
            }

            // use implementation plug-ins that are defined below
            // in this section. For example, if you copied the append
            // list plug-in code below, you could call:
            s3.events=s3.apl(s3.events,"event1",",",1);
            s3.contextData = digital;

            //serialise events
            if (digital['ev_appStart']){
                s3.events = s3.apl(s3.events, 'event26' + ':' + util.serialise(eventSerialisationKey, pdPageStep), ',', 1);
            }
            if (digital['ev_appComplete']){
                s3.events = s3.apl(s3.events, 'event27' + ':' + util.serialise(eventSerialisationKey, pdPageStep), ',', 1);
            }
            if (digital['ev_enqStart']){
                s3.events = s3.apl(s3.events, 'event28' + ':' + util.serialise(eventSerialisationKey, pdPageStep), ',', 1);
            }
            if (digital['ev_enqComplete']){
                s3.events = s3.apl(s3.events, 'event29' + ':' + util.serialise(eventSerialisationKey, pdPageStep), ',', 1);
            }

            // Navigation menu ID
            s3.prop59=s3.c_r('s3_nav');
            s3.c_w('s3_nav','',new Date(0)); // remove s_nav cookie after tracking

                //ABU zzz Try Dynamic value 'D=mid' or capture mid manual
            /*if(typeof visitor != 'undefined'){
                s3.eVar25 = s3.prop25 = visitor.getMarketingCloudVisitorID(visitor.cookieName);
            }*/
            //s3.eVar25 = 'D=mid'; //s3.prop25 =
            s3.eVar25 = s3.prop25 = 'D=mid';

            //AddEvents datalayer proerty
            if(pdAddEvents){
                s3.events=s3.apl(s3.events,isNaN(pdAddEvents)?pdAddEvents:'event' + pdAddEvents,',',2);
                /*if(/\bevent46\b/i.test(pdAddEvents)){ //westpac banking only
                    util.cookieWrite('s_wbc_auth', 1, new Date(+new Date() + (20 * 60 * 1000)),'/', util.cookieDomain());
                }*/
            }
            //ABU: Analytics Customer ID tracking (Required for SPA)
            var trackingid ={};
            if (s3.c_r("s_stg_ti")){trackingid.compassid = {"id" : s3.c_r("s_stg_ti"), "authState": (s3.c_r("s_stg_auth") ? s3.c_r("s_stg_auth"): 0)}}
            if (s3.c_r("s_bom_ti")){trackingid.compassid = {"id" : s3.c_r("s_bom_ti"), "authState": (s3.c_r("s_bom_auth") ? s3.c_r("s_bom_auth"): 0)}}
            if (s3.c_r("s_bsa_ti")){trackingid.compassid = {"id" : s3.c_r("s_bsa_ti"), "authState": (s3.c_r("s_bsa_auth") ? s3.c_r("s_bsa_auth"): 0)}}
            if (s3.c_r("s_wbc-ti")){trackingid.wbcid = {"id" : s3.c_r("s_wbc-ti"), "authState": (s3.c_r("s_wbc_auth") ? s3.c_r("s_wbc_auth"): 0)}}

            if(trackingid.compassid || trackingid.wbcid){
                s3.visitor.setCustomerIDs(trackingid);
            }


            if (pageBrand === 'wbc'){
                // === WESTPAC == //
                // generic account ID - value in cookie should have a prefix like 'corp_'. These will get overwritten through different sites, but could be tied together with visitor ID etc.
                // included for CORP and other sites that require tracking ID
                s3.eVar34 = s3.c_r("s_wbc-gi"); //s3.prop34 =
                // customer tracking ID
                s3.eVar35 =   s3.c_r("s_wbc-ti")||pdTrackId; //s3.prop35 =// cookie is set at .westpac.com.au
                // customer otp profile
                s3.eVar47 = s3.c_r("s_wbc-pi"); //s3.prop47 =
                // Webseal ID proxy
                s3.eVar48  = s3.c_r("s_wbc-ses"); //= s3.prop48
                // customer type segment
                s3.eVar50 = s3.c_r("s_bt-seg")|| s3.c_r("s_wbc-seg"); //BT panorama segments overwrite wLive segments// if values are short capture as-is, else use dynamic value to get value server-side.

                // detect OTP/online banking profile switching
                custTrackingId = s3.c_rr('s_wbc-ti');
                if (custTrackingId) {
                    custTrackingIdPrevious = s3.c_r('temp-ti');
                    s3.c_w('temp-ti', custTrackingId); // update to current
                }
                custProfileId = s3.c_rr('s_wbc-pi');
                if (custProfileId) {
                    custProfileIdPrevious = s3.c_r('temp-pi');
                    s3.c_w('temp-pi', custProfileId); // update to current
                }
                if (custTrackingId && custTrackingId === custTrackingIdPrevious && custProfileId && custProfileIdPrevious && custProfileId !== custProfileIdPrevious) {
                    userSwitchedProfile = true;
                    s3.prop59 = '(switch profile)';
                    //console.log('Profile switched'); // detect when only switching profiles and landing on dashboard vs. a new login to dashboard
                }
            }
            // === STG == //
            if (pageBrand === 'stg'){
                s3.eVar36 = s3.c_r("s_stg_ti")||pdTrackId;//s3.prop34 =
            }
            // === BOM == //
            if (pageBrand === 'bom'){
                s3.eVar36 = s3.c_r("s_bom_ti")||pdTrackId; //s3.prop34 =
            }
            // === BSA == //
            if (pageBrand === 'bsa'){
                s3.eVar36 = s3.c_r("s_bsa_ti")||pdTrackId; //s3.prop34 =
            }
            if(pdEmpId){
                s3.eVar65 = pdEmpId;
            }
            if(s3.c_r("s_biz_auth")){
                s3.eVar71 = s3.c_rr('s_biz-ti');
            }
            if (pageBrand === 'bt'){
                if(pdBtAdviserID){
                    s3.eVar70 = pdBtAdviserID;
                }
                if(pdPanoramaID){
                    s3.eVar66 = pdPanoramaID;
                }
                else if(s3.c_r("s_bt-ti")){
                    s3.eVar66 = s3.c_r("s_bt-ti");
                }
                if(s3.c_r("s_bt-seg")){
                    s3.eVar50 = s3.c_r("s_bt-seg");
                }

            }
            if(s3.c_r("s_biz_auth") === '1'){
                s3.prop47=s3.eVar45 = 'business';
            }else if(s3.c_r("s_wbc_auth") === '1'){
                s3.prop47=s3.eVar45 = 'Personal';
            }
            if(pdGenericId){
                s3.eVar34 =(pageSite===notSet ? '' :(pageSite +'_')) + pdGenericId;
            }
            if(pdGroupCode){
                s3.eVar81 = pdGroupCode | '' ;
            }
            // capture user-agent
            s3.eVar27 = 'D=User-Agent'; // capture with proc rule to increase capture (non-JS), reduce JS size and reduce pixel length
            s3.eVar26 = util.getLoc().protocol+'//'+ util.getLoc().hostname+util.cleanGUID(util.getLoc().pathname.replace(/\/$/g,'')+ ((util.getLoc().hash.length>0)? '/'+util.getLoc().hash:'')); // this is the full unprocessed page URL from HTTP header (includes hash)
            s3.prop26 = util.cleanGUID(util.getLoc().href);
            s3.prop70 = util.cookieAudit();
            if(nativeMid && (nativeMid !== s3.marketingCloudVisitorID)){
                //s3.prop71 = '(mid mismatch)';
                util.addEvt(digital,'midMismatch');
            }

            //BT Panorama specific clean GUID from URL
            //s3.eVar26 = util.getLoc().protocol+'//'+util.getLoc().hostname+util.getLoc().pathname+ '/'+util.getLoc().hash.replace(util.guidBt, '(GUID)'); // this is the full unprocessed page URL from HTTP header (includes hash)
            //s3.prop26 = 'D=Referer+"' + util.getLoc().pathname.replace(util.guidBt, '(GUID)') + '"';
            //WBC/BOM/BSA
            //s3.prop26 = 'D=g'; // this is the filtered page URL from JS document (will include hash if any)

            /*var disableAAMDestCall = false; //we will enable destination URL when required
            if (util.isHomePage()) {    //BT specific
                disableAAMDestCall = true;
            }*/
            var disableAAMDestCall = true;
            s3.AudienceManagement.setup({
                  "partner": "wbg",
                  "containerNSID": 0,
                  "uuidCookie": {
                      "name": "aam_uuid",
                      "days": 30
                  },
                  "visitorService":{
                    "namespace": "3A4B7BAF56F01DA67F000101@AdobeOrg"
                  },
            "disableDefaultRequest": true,
            "disableScriptAttachment": true,
            "disableCORS": true,
            "disableDestinationPublishingIframe": disableAAMDestCall
            });


            if (typeof s3.w_wtT.complete === 'function') {
                s3.w_wtT.complete(s3);
            }

            }
            s3.doPlugins=s3_doPlugins

            /* WARNING: Changing any of the below variables will cause drastic
            changes to how your visitor data is collected.  Changes should only be
            made when instructed to do so by your account manager.*/

            var dPeriod = ((/.+\.(com\.au|org\.au|co\.nz|co\.uk)$/i).test(location.hostname)? 3 : 2)
            dLen = location.hostname.split('.').length,
            dRoot=location.hostname.split('.').slice(dLen-dPeriod).join('.'),
            tServer = 'westpacbankinggroup.sc.omtrdc.net',
            tSecServer = 'westpacbankinggroup.sc.omtrdc.net';
            //console.log('dPeriod:'+dPeriod +' dLen:'+dLen +' dRoot:'+dRoot)
            if((/westpac\.com\.au/i).test(dRoot)){
                tServer = 'metrics.westpac.com.au',
                tSecServer = 'smetrics.westpac.com.au'
            }else if((/stgeorge\.com\.au/i).test(dRoot)){
                tServer = 'metrics.stgeorge.com.au',
                tSecServer = 'smetrics.stgeorge.com.au'
            }else if((/bankofmelbourne\.com\.au/i).test(dRoot)){
                tServer = 'metrics.bankofmelbourne.com.au',
                tSecServer = 'smetrics.bankofmelbourne.com.au'
            }else if((/banksa\.com\.au/i).test(dRoot)){
                tServer = 'metrics.banksa.com.au',
                tSecServer = 'smetrics.banksa.com.au'
            }else if((/bt\.com\.au/i).test(dRoot)){
                tServer = 'metrics.bt.com.au',
                tSecServer = 'smetrics.bt.com.au'
            }
            s3.visitorNamespace="westpacbankinggroup"
            s3.trackingServer= tServer
            s3.trackingServerSecure=tSecServer  // same as s.trackingServerSecure
            //console.log(typeof(Visitor) != "undefined" ? "VisitorAPI Present" : "VisitorAPI Missing");

            /************************** PLUGINS SECTION *************************/

            // copy and paste implementation plug-ins here - See "Implementation Plug-ins" @
            // https://marketing.adobe.com/resources/help/en_US/sc/implement/#Implementation_Plugins
            // Plug-ins can then be used in the s_doPlugins(s) function above

            /*
            * Plugin: Cookiecombined utility v0.5.
            */

            if(!s3.__ccucr)
                {
                    s3.c_rr = s3.c_r;
                    s3.__ccucr = true;
                    function s3_c_r(k)
                    {
                        var s3 = this, d = new Date, v = s3.c_rr(k), c = s3.c_rspers(), i, m, e;
                        if(v) return v; k = s3.escape ? s3.escape(k) : encodeURIComponent(k);
                        i = c.indexOf(' ' + k + '='); c = i < 0 ? s3.c_rr('s3_sess') : c;
                        i = c.indexOf(' ' + k + '='); m = i < 0 ? i : c.indexOf('|', i);
                        e = i < 0 ? i : c.indexOf(';', i); m = m > 0 ? m : e;
                        v = i < 0 ? '' : s3.unescape ? s3.unescape(c.substring(i + 2 + k.length, m < 0 ? c.length : m)) : decodeURIComponent(c.substring(i + 2 + k.length, m < 0 ? c.length : m));
                        return v;
                    }
                    function s3_c_rspers()
                    {
                        var s3 = this, cv = s3.c_rr("s3_pers"), date = new Date().getTime(), expd = null, cvarr = [], vcv = "";
                        if(!cv) return vcv; cvarr = cv.split(";"); for(var i = 0, l = cvarr.length; i < l; i++)  { expd = cvarr[i].match(/\|([0-9]+)$/);
                        if(expd && parseInt(expd[1]) >= date) { vcv += cvarr[i] + ";"; } } return vcv;
                    }
                    s3.c_rspers = s3_c_rspers;
                    s3.c_r = s3.cookieRead = s3_c_r;
                }
            if(!s3.__ccucw)
                {
                    s3.c_wr = s3.c_w;
                    s3.__ccucw = true;
                    function s3_c_w(k, v, e)
                    {
                        var s3 = this, d = new Date, ht = 0, pn = 's3_pers', sn = 's3_sess', pc = 0, sc = 0, pv, sv, c, i, t, f;
                        d.setTime(d.getTime() - 60000); if(s3.c_rr(k)) s3.c_wr(k, '', d); k = s3.escape ? s3.escape(k) : encodeURIComponent(k);
                        pv = s3.c_rspers(); i = pv.indexOf(' ' + k + '='); if(i > -1) { pv = pv.substring(0, i) + pv.substring(pv.indexOf(';', i) + 1); pc = 1; }
                        sv = s3.c_rr(sn); i = sv.indexOf(' ' + k + '='); if(i > -1) { sv = sv.substring(0, i) + sv.substring(sv.indexOf(';', i) + 1);
                        sc = 1; } d = new Date; if(e) { if(e == 1) e = new Date, f = e.getYear(), e.setYear(f + 5 + (f < 1900 ? 1900 : 0));
                        if(e.getTime() > d.getTime()) {  pv += ' ' + k + '=' + (s3.escape ? s3.escape(v) : encodeURIComponent(v)) + '|' + e.getTime() + ';';
                        pc = 1; } } else { sv += ' ' + k + '=' + (s3.escape ? s3.escape(v) : encodeURIComponent(v)) + ';';
                        sc = 1; } sv = sv.replace(/%00/g, ''); pv = pv.replace(/%00/g, ''); if(sc) s3.c_wr(sn, sv, 0);
                        if(pc) { t = pv; while(t && t.indexOf(';') != -1) { var t1 = parseInt(t.substring(t.indexOf('|') + 1, t.indexOf(';')));
                        t = t.substring(t.indexOf(';') + 1); ht = ht < t1 ? t1 : ht; } d.setTime(ht); s3.c_wr(pn, pv, d); }
                        return v == s3.c_r(s3.unescape ? s3.unescape(k) : decodeURIComponent(k));
                    }
                    s3.c_w = s3.cookieWrite = s3_c_w;
                }
            /*
            * Plugin: Compatibility v1.0.
            */
            s3.wd=window;
            s3.fl=util.fl;
            // JS 1.1 split
            s3.split = function (l, d) {
                return l ? l.split(d) : [];
            };
            /*
             * Utility Function: p_c
             */
            s3.p_c = function (v, c) {
                var x = v.indexOf('=');
                return c.toLowerCase() == v.substring(0, x < 0 ? v.length : x).toLowerCase() ? v : 0;
            };
            /*
             * s.join: 1.0 - Joins an array into a string
             */
            s3.join = function (v, p) {
                var s3 = this,
                x,
                f,
                b,
                d,
                w,
                str;
                if (p) {
                    f = p.front || '';
                    b = p.back || '';
                    d = p.delim || '';
                    w = p.wrap || '';
                }
                str = '';
                for (x = 0; x < v.length; x++) {
                    if (typeof(v[x]) == 'object') {
                        str += s3.join(v[x], p);
                    } else {
                        str += w + v[x] + w;
                    }
                    if (x < v.length - 1) {
                        str += d;
                    }
                }
                return f + str + b;
            };
            /*
             * Plugin Utility: pt - runs function in f argument against list of
             * variables declared in x (delimited by d), with a as an optional
             * argument to be included in f function call
             */
            s3.pt=util.pt;

            /*
             * Plugin Utility: Replace v1.0
             */
            s3.repl = function (x, o, n) {
                var i = x.indexOf(o),
                l = n.length;
                while (x && i >= 0) {
                    x = x.substring(0, i) + n + x.substring(i + o.length);
                    i = x.indexOf(o, i + l);
                }
                return x;
            };
            /*
             * Plugin Utility: apl v1.1 - append item to list
             */
            s3.apl = function (l, v, d, u) {
                var s3 = this,
                m = 0,
                i,
                n,
                a;
                if (!l) {
                    l = '';
                }
                if (u) {
                    a = s3.split(l, d);
                    for (i = 0; i < a.length; i++) {
                        n = a[i];
                        m = m || (u == 1 ? n == v : n.toLowerCase() == v.toLowerCase());
                    }
                }
                if (!m) {
                    l = l ? l + d + v : v;
                }
                return l;
            };
            // only set prop to dynamic copy if eVar has a value to reduce pixel length
            s3.dVar = function (id) {
                return s3['eVar' + id] ? 'D=v' + id : '';
            };

            /*
             * Plugin channelManager v3.01 - Tracking External Traffic
             */
            s3.channelManager = function (a, b, c, d, e, f, g) {
                var s3 = this,
                h = new Date,
                i = 0,
                j,
                k,
                l,
                m,
                n,
                o,
                p,
                q,
                r,
                t,
                u,
                v,
                w,
                x,
                y,
                z,
                A,
                B,
                C,
                D,
                E,
                F,
                G,
                H,
                I,
                J,
                K,
                L,
                M,
                N,
                O,
                P,
                Q,
                R,
                S,
                T,
                U,
                V;
                U = s3.getQueryParam ? 1 : 0;
                V = s3.repl ? 1 : 0;
                h.setTime(h.getTime() + 1800000);
                if (e) {
                    i = 1;
                    if (s3.c_r(e))
                        i = 0;
                    if (!s3.c_w(e, 1, h))
                        s3.c_w(e, 1, 0);
                    if (!s3.c_r(e))
                        i = 0;
                    if (f && s3.c_r('s3_tbm' + f))
                        i = 0;
                }
                j = s3.referrer ? s3.referrer : document.referrer;
                j = decodeURIComponent(j.toLowerCase());
                if (!j)
                    k = 1;
                else {
                    l = j.indexOf('?') > -1 ? j.indexOf('?') : j.length;
                    m = j.substring(0, l);
                    n = j.split('/');
                    n = n[2].split('?');
                    o = n[0].toLowerCase();
                    p = s3.linkInternalFilters.toLowerCase();
                    p = p.split(',');
                    for (q = 0; q < p.length; q++) {
                        r = o.indexOf(p[q]) == -1 ? '' : j;
                        if (r)
                            break;
                    }
                }
                if (!r && !k) {
                    t = j;
                    u = o;
                    w = 'Other Natural Referrers';
                    v = w + ' ' + o;
                    x = s3.seList + '>' + s3._extraSearchEngines;
                    if (d == 1) {
                        m = V ? s3.repl(m, 'oogle', '%') : s3.replace(m, 'oogle', '%');
                        m = V ? s3.repl(m, 'ahoo', '^') : s3.replace(m, 'ahoo', '^');
                        j = V ? s3.repl(j, 'as_q', '*') : s3.replace(j, 'as_q', '*');
                    }
                    y = x.split('>');
                    for (z = 0; z < y.length; z++) {
                        A = y[z];
                        A = A.split('|');
                        B = A[0].split(',');
                        for (C = 0; C < B.length; C++) {
                            D = m.indexOf(B[C]);
                            if (D > -1) {
                                if (A[2])
                                    E = v = A[2];
                                else
                                    E = o;
                                if (d == 1) {
                                    E = V ? s3.repl(E, '#', ' - ') : s3.replace(E, '#', ' - ');
                                    j = V ? s3.repl(j, '*', 'as_q') : s3.replace(j, '*', 'as_q');
                                    E = V ? s3.repl(E, '^', 'ahoo') : s3.replace(E, '^', 'ahoo');
                                    E = V ? s3.repl(E, '%', 'oogle') : s3.replace(E, '%', 'oogle');
                                }
                                F = A[1].split(',');
                                for (G = 0; G < F.length; G++) {
                                    if (j.indexOf(F[G] + '=') > -1 || j.indexOf('https://www.google.') == 0 || j.indexOf('http://r.search.yahoo.com') == 0)
                                        H = 1;
                                    I = U ? s3.getQueryParam(F[G], '', j).toLowerCase() : s3.Util.getQueryParam(F[G], j).toLowerCase();
                                    if (H || I)
                                        break;
                                }
                            }
                            if (H || I)
                                break;
                        }
                        if (H || I)
                            break;
                    }
                }
                if (!r || g != '1') {
                    J = a.split(',');
                    for (var q in J) {
                        if (J.hasOwnProperty(q)) {
                            if (U ? s3.getQueryParam(J[q]) : s3.Util.getQueryParam(J[q])) {
                                T = T ? T + b + (U ? s3.getQueryParam(J[q]) : s3.Util.getQueryParam(J[q])) : (U ? s3.getQueryParam(J[q]) : s3.Util.getQueryParam(J[q]));
                            }
                        }
                    }
                    if (T) {
                        v = T;
                        if (E)
                            w = 'Paid Search';
                        else
                            w = 'Unknown Paid Channel';
                    }
                    if (!T && E && H) {
                        w = 'Natural Search';
                        v = w + ' ' + E;
                    }
                }
                if (i && k && !T)
                    t = u = v = w = 'Typed/Bookmarked';
                J = s3._channelDomain;
                if (J && o && !r) {
                    K = J.split('>');
                    for (L = 0; L < K.length; L++) {
                        M = K[L] ? K[L].split('|') : '';
                        N = M[1] ? M[1].split(',') : '';
                        O = N.length;
                        for (P = 0; P < O; P++) {
                            Q = N[P].toLowerCase();
                            R = ('/' + o).indexOf(Q);
                            if (R > -1) {
                                w = M[0];
                                break;
                            }
                        }
                        if (R > -1)
                            break;
                    }
                }
                J = s3._channelParameter;
                if (J) {
                    K = J.split('>');
                    for (L = 0; L < K.length; L++) {
                        M = K[L] ? K[L].split('|') : '';
                        N = M[1] ? M[1].split(',') : '';
                        O = N.length;
                        for (P = 0; P < O; P++) {
                            R = U ? s3.getQueryParam(N[P]) : s3.Util.getQueryParam(N[P]);
                            if (R) {
                                w = M[0];
                                break;
                            }
                        }
                        if (R)
                            break;
                    }
                }
                J = s3._channelPattern;
                if (J) {
                    K = J.split('>');
                    for (L = 0; L < K.length; L++) {
                        M = K[L] ? K[L].split('|') : '';
                        N = M[1] ? M[1].split(',') : '';
                        O = N.length;
                        for (P = 0; P < O; P++) {
                            Q = N[P].toLowerCase();
                            R = T ? T.toLowerCase() : '';
                            S = R.indexOf(Q);
                            if (S == 0) {
                                w = M[0];
                                break;
                            }
                        }
                        if (S == 0)
                            break;
                    }
                }
                S = w ? T + u + w + I : '';
                c = c ? c : 'c_m';
                if (c != '0')
                    S = util.getValOnce(S, c, 0); //getValOnce move to util
                if (S) {
                    s3._campaignID = T ? T : 'n/a';
                    s3._referrer = t ? t : 'n/a';
                    s3._referringDomain = u ? u : 'n/a';
                    s3._campaign = v ? v : 'n/a';
                    s3._channel = w ? w : 'n/a';
                    s3._partner = E ? E : 'n/a';
                    s3._keywords = H ? I ? I : 'Keyword Unavailable' : 'n/a';
                    if (f && w != 'Typed/Bookmarked') {
                        h.setTime(h.getTime() + f * 86400000);
                        s3.c_w('s3_tbm' + f, 1, h);
                    }
                } else
                    s3._campaignID = s3._referrer = s3._referringDomain = s3._campaign = s3._channel = s3._partner = s3._keywords = '';
            }
            /* Top 130 - Grouped */
            s3.seList="google.,googlesyndication.com,.googleadservices.com|q,as_q|"
            +"Google>bing.com|q|Bing>yahoo.com,yahoo.co.jp|p,va|Yahoo!>ask.jp,ask"
            +".co|q,ask|Ask>search.aol.,suche.aolsvc.de|q,query|AOL>altavista.co,"
            +"altavista.de|q,r|AltaVista>.mywebsearch.com|searchfor|MyWebSearch>w"
            +"ebcrawler.com|q|WebCrawler>wow.com|q|Wow>infospace.com|q|InfoSpace>"
            +"blekko.com|q|Blekko>dogpile.com|q|DogPile>alhea.com|q|Alhea>goduckg"
            +"o.com|q|GoDuckGo>info.com|qkw|Info.com>contenko.com|q|Contenko>baid"
            +"u.com|word,wd|Baidu>daum.net,search.daum.net|q|Daum>icqit.com|q|icq"
            +">myway.com|searchfor|MyWay.com>naver.com,search.naver.com|query|Nav"
            +"er>netscape.com|query,search|Netscape Search>reference.com|q|Refere"
            +"nce.com>seznam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it,www.ti"
            +"scali.co.uk|key,query|Tiscali>virgilio.it|qs|Virgilio>yandex|text|Y"
            +"andex.ru>optimum.net|q|Optimum Search>search.earthlink.net|q|Earthl"
            +"ink>search.comcast.net|q|Comcast>libero.it|query|libero.it>excite.c"
            +"o|search|Excite>mail.ru|q|Mail.ru>isearch.avg.com|q|AVG>msn.com|q|M"
            +"SN>seznam.cz|q|seznam.cz>so.com|q|so.com>ixquick.com|query|ixquick."
            +"com>sogou.com|query|sogou.com>360.cn|q|360.cn";

            /*
             * Plug-in: crossVisitParticipation v1.7
             */
            //s3.crossVisitParticipation(s3.campaign, 's3_ev18', '30', '5', '>', 'event22');
            s3.crossVisitParticipation = function (v, cn, ex, ct, dl, ev, dv) {
                var s3 = this,
                ce,
                u,
                x,
                diff,
                q,
                z,
                ay,
                ea,
                arry = [],
                a = [],
                c,
                g,
                h = [],
                e,
                start,
                td,
                data,
                r;
                if (!s3.c_r) {
                    s3 = window.s3; // added alternate for when called outside of this scope
                }
                if (typeof dv === 'undefined') {
                    dv = 0;
                }
                if (s3.events && ev) {
                    ay = s3.split(ev, ',');
                    ea = s3.split(s3.events, ',');
                    for (u = 0; u < ay.length; u++) {
                        for (x = 0; x < ea.length; x++) {
                            if (ay[u] == ea[x]) {
                                ce = 1;
                            }
                        }
                    }
                }
                if (!v || v == '') {
                    if (ce) {
                        s3.c_w(cn, '');
                    }
                    return '';
                }
                v = escape(v);
                c = s3.c_r(cn);
                g = 0;
                if (c && c != '') {
                    arry = s3.split(c, '],[');
                    for (q = 0; q < arry.length; q++) {
                        z = arry[q];
                        z = s3.repl(z, '[', '');
                        z = s3.repl(z, ']', '');
                        z = s3.repl(z, '\'', '');
                        arry[q] = s3.split(z, ',');
                    }
                }
                e = new Date();
                e.setFullYear(e.getFullYear() + 5);
                if (dv == 0 && arry.length > 0 && arry[arry.length - 1][0] == v) {
                    arry[arry.length - 1] = [v, new Date().getTime()];
                } else {
                    arry[arry.length] = [v, new Date().getTime()];
                }
                start = arry.length - ct < 0 ? 0 : arry.length - ct;
                td = new Date();
                for (x = start; x < arry.length; x++) {
                    diff = Math.round((td.getTime() - arry[x][1]) / 86400000);
                    if (diff < ex) {
                        h[g] = unescape(arry[x][0]);
                        a[g] = [arry[x][0], arry[x][1]];
                        g++;
                    }
                }
                data = s3.join(a, {
                        delim : ',',
                        front : '[',
                        back : ']',
                        wrap : '\''
                    });
                s3.c_w(cn, data, e);
                r = s3.join(h, {
                        delim : dl
                    });
                if (ce) {
                    s3.c_w(cn, '');
                }
                return r;
            };

            /*
             * Plugin: Days since last Visit 1.1.H - capture time from last visit
             */
            s3.getDaysSinceLastVisit = function (c) {
                var s3 = this,
                e = new Date(),
                es = new Date(),
                cval,
                cval_s,
                cval_ss,
                ct = e.getTime(),
                day = 24 * 60 * 60 * 1000,
                f1,
                f2,
                f3,
                f4,
                f5;
                e.setTime(ct + 3 * 365 * day);
                es.setTime(ct + 30 * 60 * 1000);
                f0 = 'Cookies Not Supported';
                f1 = 'First Visit';
                f2 = 'More than 30 days';
                f3 = 'More than 7 days';
                f4 = 'Less than 7 days';
                f5 = 'Less than 1 day';
                cval = s3.c_r(c);
                if (cval.length == 0) {
                    s3.c_w(c, ct, e);
                    s3.c_w(c + '_s', f1, es);
                } else {
                    var d = ct - cval;
                    if (d > 30 * 60 * 1000) {
                        if (d > 30 * day) {
                            s3.c_w(c, ct, e);
                            s3.c_w(c + '_s', f2, es);
                        } else if (d < 30 * day + 1 && d > 7 * day) {
                            s3.c_w(c, ct, e);
                            s3.c_w(c + '_s', f3, es);
                        } else if (d < 7 * day + 1 && d > day) {
                            s3.c_w(c, ct, e);
                            s3.c_w(c + '_s', f4, es);
                        } else if (d < day + 1) {
                            s3.c_w(c, ct, e);
                            s3.c_w(c + '_s', f5, es);
                        }
                    } else {
                        s3.c_w(c, ct, e);
                        cval_ss = s3.c_r(c + '_s');
                        s3.c_w(c + '_s', cval_ss, es);
                    }
                }
                cval_s = s3.c_r(c + '_s');
                if (cval_s.length == 0)
                    return f0;
                else if (cval_s != f1 && cval_s != f2 && cval_s != f3 && cval_s != f4 && cval_s != f5)
                    return '';
                else
                    return cval_s;
            }
            /*
             *Gets the AAM segments out of a cookie. Requires replace (repl)
             */
            s3.getAamSegments=function(a,b){
                //var s3=this;
                var c=s3.c_r(a);
                if(c){
                    c=s3.repl(c,b+'=','');
                }
                return c
            };

            // Helper function for standard numeric s.apl event call to reduce frequently used code
            s3.w_addEvt = function (evt) {
                // allow text or numeric events to be passed
                s3.events = s3.apl(s3.events, isNaN(evt) ? evt || '' : 'event' + evt, ',', 2);
            };
            // handler functions for event listening for custom link tracking
            s3.w_getEvtTrgt = function (evt, attrRequired) {
                var evtTarget = evt || window.event,
                lp,
                max = 10; // search 10 ancestors up from clicked element to find suitable target

                evtTarget = evtTarget ? evtTarget.target || evtTarget.srcElement : 0;

                //if (evtTarget && (evtTarget.target || evtTarget.srcElement)) {
                //	evtTarget = evtTarget.target || evtTarget.srcElement; // should really just be able to use 'this' inside handler to refer to calling element, but doesn't work in older IE

                // Safari may target a non-element node, so move to parent
                for (lp = 0; evtTarget && evtTarget.nodeType !== 1 && lp <= max; lp++) {
                    evtTarget = evtTarget.parentNode;
                }

                //console.log('attrRequired = ' + attrRequired + ' ================ ')
                //console.log('attrRequired = ' + attrRequired + ', nodeName = ' + evtTarget.nodeName + ', type = ' + (evtTarget.getAttribute && evtTarget.getAttribute(attrRequired)));

                if (attrRequired) {
                    // find the element the handler should be referring to, in case the event target is a child node
                    for (lp = 0; evtTarget && evtTarget.getAttribute && !evtTarget.getAttribute(attrRequired) && lp <= max; lp++) {
                        // work up to find first parent with attrRequired - should be the el with handler attached
                        evtTarget = evtTarget.parentNode;

                        //console.log('attrRequired = ' + attrRequired + ', nodeName = ' + evtTarget.nodeName + ', type = ' + (evtTarget.getAttribute && evtTarget.getAttribute(attrRequired)));
                    }

                    // set to zero if node with required attribute not found in parents
                    //if (evtTarget && evtTarget.getAttribute && !evtTarget.getAttribute(attrRequired)) {
                    if ((evtTarget && !evtTarget.getAttribute) || (evtTarget && evtTarget.getAttribute && !evtTarget.getAttribute(attrRequired))) {
                        evtTarget = 0;
                    }
                }
                //} else {
                //	evtTarget = 0;
                //}
                //evtTarget=0; // this line only for testing if node not found. should be commented
                return evtTarget || 0;
            };
            // Navigation menu ID config. define data-attribute to identify link groups
            s3.w_getNavMenuId = function (evt) {
                var lp,
                len,
                node = s3.w_getEvtTrgt(evt),
                nav = '';

                // cycle through up to 'len' parent nodes to find a data-analytics-nav attribute
                for (lp = 0, len = 50; lp < len; lp++) {
                    if (node) {
                        if (node.nodeType === 1) {
                            nav = node.getAttribute('data-analytics-nav');
                            if (nav) {
                                // set val in cookie
                                //console.log('nav = ' + nav);
                                s3.c_w('s3_nav', nav);
                                break;
                            }
                        }
                        node = node.parentNode;
                    }
                }
            };
            // Do things after pixel sent
            s3.w_endTrckng = function () {
                //console.log('w_endTrckng:'+s3.rb);
                // record length of last pixel
                //var sVisitorNamespace = s.visitorNamespace,
                //s = s.rc ? s.rc[sVisitorNamespace] : 0,
                //var lastPixel = window['s_i_' + s3.account],
                //lastPixelSrc = lastPixel && lastPixel.getAttribute('src'),
                //lastPixelSrc = lastPixel && lastPixel.src,
                //var lastPixelSrc = window['s_i_' + s3.account].src === 'undefined' ? window['s_i_' + s3.account].src: s3.rb,
                setTimeout(function(){
                    //console.log('timeout:'+s3.Gb);
                    var lastPixelSrc = s3.Gb||'';
                    lastPixelLength = 0;
                    s3.w_log('s3_code', s3.pageName);
                    if (/^undefined$/i.test(s3.pageName)){
                        //page name not set yet
                    }else{
                        s3.c_w('lastPage', s3.pageName, new Date(+new Date() + (24 * 60 * 60 * 1000)));
                    }
                    //var lastPixelSrc = window["s2"].kb
                    if (lastPixelSrc) { // changed to lastPixel.getAttribute('src') to avoid invalid pointer error in IE11 when reading .src
                        lastPixelLength = lastPixelSrc.length;

                        // add pixels to an array to simplify testing
                        s3.w_pixels = s3.w_pixels || [];
                        s3.w_pixels.push(lastPixelSrc);

                        // store length of the pixel just fired in a cookie, to extract on next page load
                        s3.c_w('lastPixelLen', lastPixelLength);
                        //util.cookieWrite('lastPage', s3.pageName, new Date(+new Date() + (24 * 60 * 60 * 1000)));
                        if (!digital._drop) {

                                //console.log('previousPage:'+ s3.pageName);
                                s3.w_pgTrkStatus = 'sent';

                        }

                    }
                }, 1000);
                //return lastPixelLength;
            };
            s3.w_trackLink = function (evt,type) {

                var eTarg = s3.w_getEvtTrgt(evt, 'href');
                s3 = s3_gi(s3_account);
                //s.events = 'event71';
                switch(type){
                    case 'social':
                        s3.linkTrackEvents = s3.events = 'event71';
                        s3.linkTrackVars = s3.w_ltv + ',prop64,events';
                        s3.prop64 =  util.lowerCase(eTarg.href, 1);
                        s3.tl(eTarg || true, 'e', 'social:' + util.lowerCase(eTarg.href, 1)); // 'eTarg' assumes this function only called from link clicks
                        //console.log('tl() link:'+type);
                        s3.w_endTrckng();
                        break;
                    case 'exitCampaign':
                        var TargetId = decodeURIComponent(util.lowerCase(util.getQueryParam('ttid', '',eTarg.href))),
                            Targetlocid = decodeURIComponent(util.lowerCase(util.getQueryParam('locationid', '',eTarg.href))),
                            TargetAction = decodeURIComponent(util.lowerCase(util.getQueryParam('action', '',eTarg.href))),
                            IntCampId = decodeURIComponent(util.lowerCase(util.getQueryParam('pid', '',eTarg.href)));

                        s3.linkTrackEvents = s3.events = '';
                        s3.linkTrackVars = s3.w_ltv + ',eVar33,eVar53,eVar22,prop33,prop32,prop53,events'; // includes eVar21 and c39

                        //Target campaign click through to external
                        if(IntCampId){
                            s3.eVar22 = IntCampId;
                            s3.events=s3.apl(s3.events,"event12",",",2);
                        }
                        if (TargetId) {
                            s3.eVar33 = TargetId;
                            s3.prop33 = TargetId;
                            if (Targetlocid){
                                s3.prop32 = Targetlocid;
                            }
                            if(TargetAction){
                                s3.eVar53 = TargetAction
                                s3.prop53 = TargetAction;
                            }
                            s3.events=s3.apl(s3.events,"event9",",",2);

                        }
                        s3.tl(eTarg || true, 'e', 'exitCampaign:' + util.lowerCase(eTarg.href, 1)); // 'eTarg' assumes this function only called from link clicks
                        //console.log('tl() link:'+type);
                        s3.w_endTrckng();
                        break;
                    case 'exit':
                        s3.linkTrackEvents = s3.events = '';
                        s3.linkTrackVars = s3.w_ltv;
                        s3.eVar6=s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                        s3.eVar1=s3.prop1 ='impression:exit';
                        s3.tl(eTarg || true, 'e', util.lowerCase(eTarg.href, 1)); // 'eTarg' assumes this function only called from link clicks
                        //console.log('tl() link:'+type);
                        s3.w_endTrckng();
                        break;
                    case 'custdownload':
                        var eTarg = s3.w_getEvtTrgt(evt, 'data-analytics-download'),
                        detail = util.lowerCase(eTarg && eTarg.getAttribute('data-analytics-download'), 1);
                        s3.events = 'event67';
                        s3.linkTrackEvents = s3.events;
                        s3.linkTrackVars = s3.w_ltv + ',eVar61,events';
                        s3.eVar61 = detail;
                        s3.eVar6=s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                        s3.eVar1=s3.prop1 ='impression:download';
                        s3.tl(eTarg || true, 'd',  detail); // 'eTarg' assumes this function only called from link clicks
                        //console.log('tl() link:'+type);
                        s3.w_endTrckng();
                        break;
                    case 'download':
                         s3.events = 'event67';
                        var pd = (((/pds\.pdf(?:\?|$)/i).test(eTarg.href) || ((/\b(terms\ and\ conditions|product\ disclosure\ statement)\b/i).test(eTarg.innerHTML) && (/\.pdf(?:\?|$)/i).test(eTarg.href))) ? 'pds:' : ''); // ...pds.pdf in href or T and C in link text to identify product disclosure downloads
                        s3.linkTrackEvents = s3.events;
                        s3.linkTrackVars = s3.w_ltv + ',eVar61,events';
                        s3.eVar61 = pd + (util.lowerCase(eTarg.href, 1).replace(/(.*\/)?(\.*?)/, '$2')); // record file name only
                        s3.eVar6=s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                        s3.eVar1=s3.prop1 ='impression:download';
                        s3.tl(eTarg || true, 'd', pd + util.lowerCase(eTarg.href, 1)); // 'eTarg' assumes this function only called from link clicks
                        //console.log('tl() link:'+type);
                        s3.w_endTrckng();
                        break;
                    case 'call':
                        var detail = decodeURI(util.lowerCase(eTarg.href, 1)).replace(/^tel:|\s+/gi, ''); // Appears in the Page interactions name report (v54). custom call links may not have friendly href
                        s3.linkTrackEvents = s3.events = 'event61,event69';
                        //s.linkTrackVars='prop15,prop69,eVar54,prop54,eVar59,events';
                        s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,eVar59,events';
                        s3.eVar54 = 'call:' + detail;
                        s3.prop54 = 'D=v54';
                        s3.eVar59 = detail;
                        s3.eVar6=s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                        s3.eVar1=s3.prop1 ='impression:call';
                        //s.forcedLinkTrackingTimeout = 500;
                        //s.useForcedLinkTracking = false;

                        s3.tl(eTarg || true, 'o', 'interaction:call:' + detail); // 'eTarg' assumes this function only called from link clicks
                        //s.tl(eTarg||true,'o','interaction:call:'+detail, null, 'navigate'); // 'eTarg' assumes this function only called from link clicks // this or 'navigate' breaks FF in test page?
                        //console.log('tl() link:'+type);
                        s3.w_endTrckng();
                        break;

                }
                /*if(/^social/i.test(type)){
                    s3.linkTrackEvents = s3.events = 'event71';
                    s3.linkTrackVars = s3.w_ltv + ',eVar56,prop56,events'; // includes eVar21 and c39
                    s3.eVar56 = util.lowerCase(eTarg.href, 1);
                    s3.prop56 = 'D=v56';
                    s3.tl(eTarg || true, 'e', 'social:' + util.lowerCase(eTarg.href, 1)); // 'eTarg' assumes this function only called from link clicks
                    console.log('tl() link:'+type)
                }
                if(/^exit/i.test(type)){
                    s3.linkTrackEvents = s3.events = '';
                    s3.linkTrackVars = s3.w_ltv;
                    s3.tl(eTarg || true, 'e', util.lowerCase(eTarg.href, 1)); // 'eTarg' assumes this function only called from link clicks
                    console.log('tl() link:'+type)
                }
                if(/^download/i.test(type)){
                    s3.events = 'event67';
                    var pd = (((/pds\.pdf(?:\?|$)/i).test(eTarg.href) || ((/\b(terms\ and\ conditions|product\ disclosure\ statement)\b/i).test(eTarg.innerHTML) && (/\.pdf(?:\?|$)/i).test(eTarg.href))) ? 'pds:' : ''); // ...pds.pdf in href or T and C in link text to identify product disclosure downloads
                    if (pd) {
                        s3.events+=',event31';
                    }
                    s3.linkTrackEvents = s3.events;
                    s3.linkTrackVars = s3.w_ltv + ',eVar61,prop61,events';
                    s3.eVar61 = pd + (util.lowerCase(eTarg.href, 1).replace(/(.*\/)?(\.*?)/, '$2')); // record file name only
                    s3.prop61 = 'D=v61';
                    s3.tl(eTarg || true, 'd', pd + util.lowerCase(eTarg.href, 1)); // 'eTarg' assumes this function only called from link clicks
                    console.log('tl() link:'+type)
                }
                if(/^call/i.test(type)){
                    var detail = decodeURI(util.lowerCase(eTarg.href, 1)).replace(/^tel:|\s+/gi, ''); // Appears in the Page interactions name report (v54). custom call links may not have friendly href
                    s3.linkTrackEvents = s3.events = 'event61,event69';
                    //s.linkTrackVars='prop15,prop69,eVar54,prop54,eVar59,events';
                    s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,eVar59,events';
                    s3.eVar54 = 'call:' + detail;
                    s3.prop54 = 'D=v54';
                    s3.eVar59 = detail;

                    //s.forcedLinkTrackingTimeout = 500;
                    //s.useForcedLinkTracking = false;

                    s3.tl(eTarg || true, 'o', 'interaction:call:' + detail); // 'eTarg' assumes this function only called from link clicks
                    //s.tl(eTarg||true,'o','interaction:call:'+detail, null, 'navigate'); // 'eTarg' assumes this function only called from link clicks // this or 'navigate' breaks FF in test page?
                    console.log('tl() link:'+type)
                }
                s3.w_endTrckng();*/
            };
            s3.w_trackLiveChat = function (evt, args) {
                // this function is called directly by LivePerson code when the Interactive Chat event is fired in LivePerson
                var eTarg = s3.w_getEvtTrgt(evt),
                argsObj = args || {},
                detail = util.lowerCase(argsObj.detail, 1),
                events = util.lowerCase(argsObj.events, 1),
                type = util.lowerCase(argsObj.type, 1)
                ; // details passed from LivePerson rule
                s3 = s3_gi(s3_account);
                s3.events = 'event63,event69'+events;
                s3.linkTrackEvents = 'event63,event69'+(events.replace(/\:.*/,''));
                //s.linkTrackVars='prop15,prop69,eVar54,prop54,eVar57,prop57,events';
                s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,eVar55,eVar57,prop57,events';
                s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                s3.eVar1 = s3.prop1 = 'interaction:live chat';
                s3.eVar55 = 'live chat:' + detail;
                s3.eVar6=s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                s3.eVar54 = s3.prop54 = 'live chat:'+type;
                s3.eVar57 = s3.prop57 = util.lowerCase(argsObj.session, 1);
                s3.tl(eTarg || true, 'o', 'interaction:live chat:' + type); // (eTarg||true) allows this function to be called from script or link clicks
                s3.w_endTrckng();
            };
            s3.w_trackChat = function (evt, args) {
                // this function is called directly by LivePerson code when the Interactive Chat event is fired in LivePerson
                var eTarg = s3.w_getEvtTrgt(evt),
                events ='',
                analyticsVar ='',
                argsObj = args || {},
                chatId = argsObj.chatId||'',
                chatbotName = argsObj.chatbotName||'',
                chatAssistedId = argsObj.chatAssistedId||'',
                chatIntend =  argsObj.chatIntend ||'',
                chatAssistedDetails = argsObj.chatAssistedDetails ||'',
                //detail = util.lowerCase(argsObj.detail, 1),
                chatevent = util.lowerCase(argsObj.chatEvent, 1),
                chatLoc = util.lowerCase(argsObj.chatLocation, 1)
                ; // details passed from LivePerson rule
                if (chatevent ==='start'){
                    events = 'event88' + (chatId ? ':'+chatId:'');
                }else if (chatevent ==='interactive'){
                    events = 'event89' + (chatId ? ':'+chatId:'');
                }else if (chatevent ==='intend-changed'){
                    events = 'event90';
                    analyticsVar = analyticsVar + (chatIntend ? ',prop73':'');
                    s3.prop73 = 'chatbot:intend:' + chatIntend;
                }else if (chatevent ==='ended'){
                    events = 'event91' + (chatId ? ':'+chatId:'');
                }else if (chatevent ==='assisted-start'){
                    events = 'event92' + (chatId ? ':'+chatId:'');
                    analyticsVar = analyticsVar + (chatAssistedId ? ',prop72':'') + (chatAssistedDetails ? ',prop71':'');
                    s3.prop72 = 'chatbot:assisted-start:' + chatAssistedId;
                    s3.prop71 = 'chatbot:assisted-start:' + util.lowerCase(chatAssistedDetails,1);
                }else if (chatevent ==='assisted-interactive'){
                    events = 'event93' + (chatId ? ':'+chatId:'');
                    analyticsVar = analyticsVar + (chatAssistedId ? ',prop72':'') + (chatAssistedDetails ? ',prop71':'');
                    s3.prop72 = 'chatbot:assisted-interactive:' + chatAssistedId;
                    s3.prop71 = 'chatbot:assisted-interactive:' + util.lowerCase(chatAssistedDetails,1);
                }else if (chatevent ==='assisted-ended'){
                    events = 'event94' + (chatId ? ':'+chatId :'');
                    analyticsVar = analyticsVar + (chatAssistedId ? ',prop72':'') + (chatAssistedDetails ? ',prop71':'');
                    s3.prop72 = 'chatbot:assisted-ended:' + chatAssistedId;
                    s3.prop71 = 'chatbot:assisted-ended:' + util.lowerCase(chatAssistedDetails,1);
                }else if (chatevent ==='feedback-start'){
                    events = 'event95' + (chatId ? ':'+chatId:'');
                    analyticsVar = analyticsVar + (chatAssistedId ? ',prop72':'');
                    s3.prop72 = 'chatbot:feedback-start:' + chatAssistedId;
                }else if (chatevent ==='feedback-ended'){
                    events = 'event96' + (chatId ? ':'+chatId:'');
                    analyticsVar = analyticsVar + (chatAssistedId ? ',prop72':'');
                    s3.prop72 = 'chatbot:feedback-ended:' + chatAssistedId;
                }
                s3 = s3_gi(s3_account);
                s3.events = 'event69,'+events;
                s3.linkTrackEvents = 'event69,'+(events.replace(/\:.*/,''));
                //s.linkTrackVars='prop15,prop69,eVar54,prop54,eVar57,prop57,events';
                s3.linkTrackVars = s3.w_ltv + analyticsVar +',eVar54,prop54,eVar74,events';
                s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                s3.eVar76 = chatbotName;
                s3.eVar1 = s3.prop1 = 'interaction:chatbot';
                s3.eVar54 = 'chatbot:' + chatevent;
                s3.prop54 = 'chatbot:' + chatLoc;
                s3.eVar74 = util.lowerCase(chatId, 1);
                s3.tl(eTarg || true, 'o', 'interaction:chatbot:' + chatLoc); // (eTarg||true) allows this function to be called from script or link clicks
                s3.w_endTrckng();
            };
            s3.w_trackRank = function (evt) {
                // Track search result rank clicks
                // this refers to data set by another script on the funnelback search results page
                var eTarg = s3.w_getEvtTrgt(evt, 'data-analytics-rank'),
                detail = util.lowerCase(eTarg && eTarg.getAttribute('data-analytics-rank'), 1);

                s3.c_w('cpr', detail);
                //alert('Set cookie, rank: '+detail);
                //s.w_stopEvt(evt);
            };
            s3.w_searchLoc = function (evt) {
                // Track search result rank clicks
                // this refers to data set by another script on the funnelback search results page
                var eTarg = s3.w_getEvtTrgt(evt, 'data-analytics-search-searchsource'),
                detail = util.lowerCase(eTarg && eTarg.getAttribute('data-analytics-search-searchsource'), 1);

                s3.c_w('s_loc', detail);
                //alert('Set cookie, rank: '+detail);
                //s.w_stopEvt(evt);
            };
            s3.w_searchKeyWords = function (evt) {
                // Track search result rank clicks
                // this refers to data set by another script on the funnelback search results page
                var eTarg = s3.w_getEvtTrgt(evt, 'data-analytics-search-kw'),
                detail = util.lowerCase(eTarg && eTarg.getAttribute('data-analytics-search-kw'), 1);

                s3.c_w('s_kw', detail);
                //alert('Set cookie, rank: '+detail);
                //s.w_stopEvt(evt);
            };
            s3.w_searchType = function (evt) {
                // Track search result rank clicks
                // this refers to data set by another script on the funnelback search results page
                var eTarg = s3.w_getEvtTrgt(evt, 'data-analytics-search-type'),
                detail = util.lowerCase(eTarg && eTarg.getAttribute('data-analytics-search-type'), 1);

                s3.c_w('s_rt', detail);
                //alert('Set cookie, rank: '+detail);
                //s.w_stopEvt(evt);
            };
            s3.w_searchCat = function (evt) {
                // Track search result rank clicks
                // this refers to data set by another script on the funnelback search results page
                var eTarg = s3.w_getEvtTrgt(evt, 'data-analytics-search-cat'),
                detail = util.lowerCase(eTarg && eTarg.getAttribute('data-analytics-search-cat'), 1);

                s3.c_w('s_cat', detail);
                //alert('Set cookie, rank: '+detail);
                //s.w_stopEvt(evt);
            };
            s3.w_notificationTitle = function (evt) {
                // Track search result rank clicks
                // this refers to data set by another script on the funnelback search results page
                var eTarg = s3.w_getEvtTrgt(evt, 'data-analytics-notification-title'),
                detail = util.lowerCase(eTarg && eTarg.getAttribute('data-analytics-notification-title'), 1);

                s3.c_w('s_ntitle', detail);
                //alert('Set cookie, rank: '+detail);
                //s.w_stopEvt(evt);
            };
            s3.w_notificationType = function (evt) {
                // Track search result rank clicks
                // this refers to data set by another script on the funnelback search results page
                var eTarg = s3.w_getEvtTrgt(evt, 'data-analytics-notification-type'),
                detail = util.lowerCase(eTarg && eTarg.getAttribute('data-analytics-notification-type'), 1);

                s3.c_w('s_ntype', detail);
                //alert('Set cookie, rank: '+detail);
                //s.w_stopEvt(evt);
            };
            s3.w_notificationLink = function (evt) {
                // Track search result rank clicks
                // this refers to data set by another script on the funnelback search results page
                var eTarg = s3.w_getEvtTrgt(evt, 'data-analytics-notification-linktitle'),
                detail = util.lowerCase(eTarg && eTarg.getAttribute('data-analytics-notification-linktitle'), 1);

                s3.c_w('s_nlink', detail);
                //alert('Set cookie, rank: '+detail);
                //s.w_stopEvt(evt);
            };
            s3.w_trackInteractionEvents = function (evt, details){
                s3.prop55 = '';
                if (details.interactionDetails){
                    var pdinteractionDetails = util.lowerCase(util.clean(details.interactionDetails));
                    s3.prop55 = pdinteractionDetails || '';
                    s3.w_ltv = s3.w_ltv+',prop55';
                };
                if(evt=='custom'){
                    //?newFormName
                    //?action
                    //?type

                }else if(evt=='link'){
                    s3.events = 'event69';
                    s3.linkTrackEvents = s3.events;
                    s3.linkTrackVars = s3.w_ltv +',eVar54,prop54,events';
                    s3.prop54 = s3.eVar54 = evt + ':' + util.lowerCase(details.pageInteractions);
                    s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                    s3.eVar1 = s3.prop1 = 'interaction:link';
                    s3.tl(true, 'o', evt);
                } else if(evt=='download'){
                    s3.events = 'event67';
                    s3.linkTrackEvents = s3.events;
                    s3.linkTrackVars = s3.w_ltv + ',eVar61,events';
                    s3.eVar61 = util.lowerCase(details.pageInteractions);
                    s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                    s3.eVar1 = s3.prop1 = 'interaction:download';
                    s3.tl(true, 'd', evt);
                } else if (evt=='call'){
                    s3.events = 'event61,event69';
                    s3.linkTrackEvents = s3.events;
                    s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,eVar59,events';
                    s3.prop54 = s3.eVar54 = evt + ':' + util.lowerCase(details.pageInteractions);
                    s3.eVar59 =  details;
                    s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                    s3.eVar1 = s3.prop1 = 'interaction:call';
                    s3.tl(true, 'o', evt);
                } else if (evt=='exit'){
                    s3.linkTrackEvents = s3.events = '';
                    s3.linkTrackVars = s3.w_ltv +',eVar54,prop54,events';
                    s3.prop54 = s3.eVar54 = evt + ':' + util.lowerCase(details.pageInteractions);
                    s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                    s3.eVar1 = s3.prop1 = 'interaction:exit';
                    s3.tl(true, 'e', util.lowerCase(details.pageInteractions));
                } else if (evt=='button'){
                    s3.events = 'event69';
                    s3.linkTrackEvents = s3.events;
                    s3.linkTrackVars = s3.w_ltv +',eVar54,prop54,events';
                    s3.prop54 = s3.eVar54 = evt + ':' + util.lowerCase(details.pageInteractions);
                    s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                    s3.eVar1 = s3.prop1 = 'interaction:button';
                    s3.tl(true, 'o', evt);
                } else if (evt=='pidexit'){
                    s3.events = 'event12';
                    s3.linkTrackEvents = s3.events;
                    s3.linkTrackVars = s3.w_ltv +',eVar22,eVar54,prop54,events';
                    s3.eVar22 = util.lowerCase(details.internalCampaignClicked);
                    s3.prop54 = s3.eVar54 = evt + ':' + util.lowerCase(details.pageInteractions);
                    s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                    s3.eVar1 = s3.prop1 = 'interaction:pidexit';
                    s3.tl(true, 'e', util.lowerCase(details.pageInteractions));
                }
                s3.w_endTrckng();
                return true;
            };
            s3.w_trackInteraction = function (evt, args) {
                //console.log('w_trackInteraction:')
                var argsObj = args || {},
                eTarg = s3.w_getEvtTrgt(evt, argsObj.detail ? 'href' : 'data-tracking-link'),
                detail = util.clean(decodeURIComponent(util.lowerCase(argsObj.detail || (eTarg && eTarg.getAttribute('data-tracking-link')), 1))); // tracks details from object passed or event target with data-analytics-link attribute

                if (detail === 'download') {
                    s3.w_trackLink(evt,'download'); // Some downloads in OTP are tagged directly as a 'download' (button tags etc. instead of a href)
                    return;
                }

                s3 = s3_gi(s3_account);
                //s.events = 'event69';
                s3.linkTrackEvents = s3.events = 'event69';
                //s.linkTrackVars='prop15,prop69,eVar54,prop54,events';
                s3.linkTrackVars = s3.w_ltv + ',eVar54,prop54,events';
                s3.prop54 = s3.eVar54 = detail;
                s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                s3.eVar1 = s3.prop1 = 'interaction';
                s3.tl(eTarg || true, 'o', 'interaction:' + detail); // 'eTarg' assumes this function only called from link clicks

                if (argsObj.stopDefault) {
                    // dont stop default event unless specified
                    s3.w_stopEvt(evt);
                }
                s3.w_endTrckng();
            };
            s3.w_trackToolInteraction = function (evt, args) {
                // this function is called directly by Launch
                // s3.w_trackToolInteraction('interact',pageDetails);
                var eTarg = s3.w_getEvtTrgt(evt),
                events ='event70',
                analyticsVar =',eVar54,prop54',
                tCToolsDetails ='',
                tCToolsName = '',
                tNotSet = '(not set)',
                argsObj = args || {},
                tCalculatorName = util.lowerCase(argsObj.calculatorName),
                tCalculatorType = util.lowerCase(argsObj.calculatorType),
                tPageStep = util.lowerCase(argsObj.pageAction||argsObj.pageStep)||'',
                //tPageAction = argsObj.pageAction||'',
                tPageType = argsObj.pageType||'',
                tType = argsObj.calculatorType || tNotSet,
                tAmount = argsObj.transactionAmount || tNotSet,
                pSelected = argsObj.prodSelected || tNotSet,
                getRangeAvg = util.amntBnds('transactions', tAmount),
                amntRange = getRangeAvg.range,
                tFormName = util.lowerCase(argsObj.newFormName||argsObj.formName)||'',
                tFormFieldObj = argsObj.toolInputs,
                tToolsName = argsObj.toolsName||'',
                tToolsDetails = argsObj.toolsDetail ||'',
                tSetupOptions = util.lowerCase(argsObj.setupOptions) ||'',
                tPageProperty = util.lowerCase(argsObj.pageProperty) ||'',
                tToolOutcome = util.lowerCase(argsObj.toolOutcome) ||'',
                tToolEvent = util.lowerCase(argsObj.toolEvent)||'',
                tToolLoc = util.lowerCase(argsObj.toolLocation)||'',
                tEnqLoc = util.lowerCase(argsObj.enquiryLocation)||'',
                tTransactionId = util.lowerCase(argsObj.appReference || argsObj.transactionID) ||''
                ; // details passed from LivePerson rule

                if (tPageType == 'enquiry'){
                    if (tPageStep === 'start'){
                        events = events + ',event28';
                    }else if (tPageStep === 'complete'){
                        events = ',event29';
                        if(tTransactionId){
                            analyticsVar = analyticsVar + ',transactionID';
                            //console.log('tSetupOptions:'+ 'setup test' + 'analyticsVar' + analyticsVar );
                        }
                    }

                } else { //tools & calculator
                    /*if (tToolEvent ==='toolInteraction'){
                        events = 'event70';
                    }else if (tToolEvent ==='toolResult'){
                        events = 'event70,event68';
                    }else if (tPageAction ==='interact'){
                        events = 'event70';
                    }else */
                    if (tPageStep === 'result'){
                        events = events + ',event68';
                    }
                }

                s3 = s3_gi(s3_account);
                s3.events = events;
                s3.linkTrackEvents = (events.replace(/\:.*/,''));

                //console.log('tPageProperty:'+ tPageProperty + '::tSetupOptions:'+tSetupOptions);
                if(tPageProperty){
                    analyticsVar = analyticsVar + ',prop22';
                }
                if(tSetupOptions){
                    analyticsVar = analyticsVar + ',eVar69';
                    //console.log('tSetupOptions:'+ 'setup test' + 'analyticsVar' + analyticsVar );
                }

                if (tPageType == 'enquiry'){

                    //console.log('enquiry:');
                    analyticsVar = analyticsVar + ',eVar23,prop23';
                    s3.linkTrackVars = s3.w_ltv + '' + analyticsVar +',eVar23,prop23,events';
                    s3.eVar23 = s3.prop23 = util.lowerCase(pageDetails.siteBrand)+':' +util.lowerCase(pageDetails.siteName)+ ':enq:'+(tFormName||tNotSet);
                }else{
                    //console.log('tToolsDetails:');
                    analyticsVar = analyticsVar + ',eVar62,eVar63';
                    if (tCalculatorType && tCalculatorName) {
                        var calcInfo = util.setInteractionVars(pageDetails),
                            calcDet = calcInfo.calculatorDetails||'',
                            calcName = calcInfo.calculatorName||'';
                            tCToolsName = calcName || tNotSet;
                        if(calcDet){
                            tCToolsDetails = calcDet;
                        }
                    }

                    //console.log('tToolsDetails:'+ tToolsDetails + '::tCToolsDetails:'+tCToolsDetails);

                    if(tFormFieldObj){
                        // console.log('tFormFieldObj:'+ tFormFieldObj);
                        analyticsVar = analyticsVar + ',eVar83';
                    }
                    if (tPageStep === 'result'){
                        analyticsVar = analyticsVar + ',eVar78';
                    }

                    s3.linkTrackVars = s3.w_ltv + '' + analyticsVar +',events';
                    if (tCalculatorType && tCalculatorName) {
                        var calcInfo = util.setInteractionVars(pageDetails),
                            calcDet = calcInfo.calculatorDetails||'',
                            calcName = calcInfo.calculatorName||'';
                            tCToolsName = calcName || tNotSet;
                        if(calcDet){
                            tCToolsDetails = calcDet;
                        }
                    }
                    // console.log('tToolsName:'+ tToolsName + '::tCToolsName:'+tCToolsName);
                    if(tToolsName || tCToolsName){
                        s3.eVar62 = tToolsName || tCToolsName;
                    }else{
                        s3.eVar62 = tFormName || tNotSet;
                    };

                    //console.log('tToolsDetails:'+ tToolsDetails + '::tCToolsDetails:'+tCToolsDetails);
                    if(tToolsDetails || tCToolsDetails){
                        s3.eVar63 = tToolsDetails || tCToolsDetails;
                    }else{
                        s3.eVar63 =  'tool:' + tType + '|' + 'product:' + pSelected + '|' + amntRange;
                    };
                    if(tFormFieldObj){
                        //console.log('tFormFieldObj:'+ tFormFieldObj);
                        s3.eVar83 = util.setFormFieldVar(tPageType, '', tFormFieldObj);
                    }
                    if (tPageStep === 'result'){
                        s3.eVar78 = tToolOutcome;
                    }
                }
                //console.log('linkTrackVars:'+ s3.linkTrackVars  + '\n::w_ltv:'+s3.w_ltv);
                s3.eVar6 = s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                s3.eVar1 = s3.prop1 =  util.lowerCase(pageDetails.siteName);
                if(tTransactionId){
                    s3.transactionID = 'enq_' + pageDetails.transactionID;
                }
                // console.log('tPageProperty:'+ tPageProperty + '::tSetupOptions:'+tSetupOptions);
                if(tPageProperty){
                    s3.prop22 = tPageProperty;
                }
                if(tSetupOptions){
                    s3.eVar69 = tSetupOptions;
                }
                // console.log('tanalyticsVar:'+ analyticsVar+ '::tSetupOptions:'+tSetupOptions);
                s3.eVar54 = 'toolInteraction:' + tPageType+':'+tToolEvent+(tPageStep||evt);
                s3.prop54 = 'toolInteraction:loc:'+ ((tToolLoc||tEnqLoc)||tNotSet);
                s3.tl(eTarg || true, 'o', 'interaction:tool:'+ ((tToolEvent||evt)||'') ); // (eTarg||true) allows this function to be called from script or link clicks
                s3.w_endTrckng();
            };
            // link tracking handler
            s3.w_linkTracking = function (evt) {
                //console.log('w_linkTracking:')
                var target = s3.w_getEvtTrgt(evt, 'href'),
                linkRegexInternal = new RegExp(s3.linkInternalFilters.replace(/^,|,$/g, '').replace(/,/g, '|'), 'i'),
                linkRegexDownload = new RegExp('\\.(?:' + s3.linkDownloadFileTypes.replace(/,/g, '|') + ')(?:\\?|$)', 'i'),
                linkRegexSocial = (/(?:\/\/|\.)(?:youtube|facebook|twitter|linkedin|plus\.google)\.com/i), // need to confirm list. required to fire event71 if social exit link
                linkRegexAppStoreCampaigns =/(apps\.apple|play\.google)\.com(.*)(\&|\?)(cid\=|pid\=|ttid\=)/i,
                dataAnalyticsLink;

                //console.log('linkRegexDownload = ' + linkRegexDownload);

                // set custom object IDs for clickmap
                // only apply link handlers etc. if trackInlineStats is true
                //if(s.trackInlineStats){
                //	s.setOIDs(); // this probably should only be set once after window load, else link IDs generated every click on page...
                //}

                if (target.nodeName === 'A') {
                    // set nav area in cookie
                    s3.w_getNavMenuId(evt);

                    // social link handling (social link event)
                    if ((!linkRegexInternal.test(target.href)) && (linkRegexSocial.test(target.href))) {
                        s3.w_trackLink(evt,'social');
                    }
                    // exit link with campaign handling
                    if (linkRegexAppStoreCampaigns.test(target.href)) {
                        s3.w_trackLink(evt,'exitCampaign');
                    }
                    // exit link handling
                    if (target.href && (!linkRegexInternal.test(target.href)) && (!linkRegexSocial.test(target.href))) {
                        s3.w_trackLink(evt,'exit');
                    }
                    // download link handling. data-analytics-link attribute used in OTP to define some download links/buttons
                    if (linkRegexDownload.test(target.href)) {
                        s3.w_trackLink(evt,'download');
                    }// site search results link tracking
                    if (target.getAttribute('data-analytics-rank')) { // && /.+/.test(target.getAttribute('data-analytics-rank'))) { // previously in selenium two commands were required to capture the rank and click-past. The listener now captures the details in the first click
                        s3.w_trackRank(evt);
                    }
                    if (target.getAttribute('data-analytics-search-searchsource')) { // && /.+/.test(target.getAttribute('data-analytics-rank'))) { // previously in selenium two commands were required to capture the rank and click-past. The listener now captures the details in the first click
                        s3.w_searchLoc(evt);
                    }
                    if (target.getAttribute('data-analytics-search-kw')) { // && /.+/.test(target.getAttribute('data-analytics-rank'))) { // previously in selenium two commands were required to capture the rank and click-past. The listener now captures the details in the first click
                        s3.w_searchKeyWords(evt);
                    }
                    if (target.getAttribute('data-analytics-search-type')) { // && /.+/.test(target.getAttribute('data-analytics-rank'))) { // previously in selenium two commands were required to capture the rank and click-past. The listener now captures the details in the first click
                        s3.w_searchType(evt);
                    }
                    if (target.getAttribute('data-analytics-search-cat')) { // && /.+/.test(target.getAttribute('data-analytics-rank'))) { // previously in selenium two commands were required to capture the rank and click-past. The listener now captures the details in the first click
                        s3.w_searchCat(evt);
                    }
                    if (target.getAttribute('data-analytics-notification-title')) { // && /.+/.test(target.getAttribute('data-analytics-rank'))) { // previously in selenium two commands were required to capture the rank and click-past. The listener now captures the details in the first click
                        s3.w_notificationTitle(evt);
                    }
                    if (target.getAttribute('data-analytics-notification-type')) { // && /.+/.test(target.getAttribute('data-analytics-rank'))) { // previously in selenium two commands were required to capture the rank and click-past. The listener now captures the details in the first click
                        s3.w_notificationType(evt);
                    }
                    if (target.getAttribute('data-analytics-notification-linktitle')) { // && /.+/.test(target.getAttribute('data-analytics-rank'))) { // previously in selenium two commands were required to capture the rank and click-past. The listener now captures the details in the first click
                        s3.w_notificationLink(evt);
                    }
                    if (target.getAttribute('data-analytics-download')) { // && /.+/.test(target.getAttribute('data-analytics-rank'))) { // previously in selenium two commands were required to capture the rank and click-past. The listener now captures the details in the first click
                        s3.w_trackLink(evt,'custdownload');
                    }
                    // mailto: links?
                    if (/^mailto:/i.test(target.href)) {
                        target.setAttribute('data-tracking-link', 'email:' + decodeURI(target.href.replace(/^mailto:/i, '').replace(/((?:&|\?)body=.*?(?=&|$))/ig, ''))); // added .replace(/^mailto:/i,'')
                        //ABU tpo FIX:  s3.w_trackInteraction(evt);
                    }

                    // Print link on branch detail page has class=print
                    //if (target.getAttribute('data-analytics-link')) { // && /.+/.test(target.getAttribute('data-analytics-rank'))) {
                    dataAnalyticsLink = target.getAttribute('data-tracking-link');
                    //console.log('dataAnalyticsLink = ' + dataAnalyticsLink);
                    if (dataAnalyticsLink) { // && /.+/.test(target.getAttribute('data-analytics-rank'))) {
                        if (!linkRegexDownload.test(target.href)) { // only if hasn't already been matched by linkRegexDownload regex above (OTP downloads may use data-attrs instead)
                            s3.w_trackInteraction(evt);

                            if (/^trackonce:/i.test(dataAnalyticsLink)) { // if the link name (data-analytics-link attribute value) starts with 'trackonce:', only track once, then remove the value to prevent subsequent click tracking
                                target.setAttribute('data-tracking-link', '');
                            }
                        }
                    }
                    // tel: links
                    if (/^tel:/i.test(target.href)) {
                        s3.w_trackLink(evt,'call');
                    }

                    // automatic banner dismiss auto-tracking. function for manual dismiss tracking available
                    // this probably requires more than just className selection? may need to be by data-attribute?
                    /*
                    target = s.w_altGetElemsByClassName(doc.body,'A','pid-dismiss');
                    //s.w_addHandler(target[lp],'click',function(evt){s.w_trackBannerDismiss(evt,'text',true)});
                    s.w_addHandler(target[lp],'click',s.w_trackBannerDismiss);
                     */

                }

                // update time with every click
                if (!window.performance) {
                    s3.c_w('navt',  + new Date(), new Date(+new Date() + 30000)); // cookie updated every click and only lasts for 30 seconds
                }
                digital ={}; //rest the digital for SPA
            };

            // convert prodVal into an array if it was only a string (single product or comma separated)
            s3.w_prodArr = function (prodVal) {
                var prodTemp,
                prodArr,
                lp = 0,
                len;

                if (prodVal && typeof prodVal !== 'object') {
                    //prodTemp = String(prodVal).replace(/^,+|,+$/g,'').split(',');
                    prodTemp = String(prodVal).split(',');
                    prodArr = [];
                    for (len = prodTemp.length; lp < len; lp++) {
                        // push individual product objects into prodArr array
                        if (prodTemp[lp]) {
                            prodArr.push({
                                'prod' : prodTemp[lp]
                            });
                        }
                    }
                } else {
                    prodArr = prodVal || [];
                }
                return prodArr;
            };

            // convert product array into Omniture format product string
            s3.w_prodStr = function (prodArr, details) {
                // join product object array into Omniture formatted prod string for tracking
                var prodSyntax = [],
                    //pdFormStatus = pageDetails.formStatus,
                    pdFormStatus = util.lowerCase(util.clean(details.formStatus)),
                    pdPageType = util.lowerCase(util.clean(details.pageType)),
                    pdPageStep = util.lowerCase(util.clean(details.pageStep)),
                    lp1,
                    lp2,
                    prodArrLen = prodArr.length,
                    //productCount,
                    //pCount = [],
                    prodEvents,
                    prodEventDetails,
                    prodMerch,
                    txnType,
                    txnEvt,
                    txnBand,
                    transactionDetails,
                    currency,
                    amount,
                    currencySpecified = false,
                    //primaryProduct,
                    //primaryProductSpecified = false;
                    validProductCount = 0,
                    crossSellCheckLen = prodArrLen,
                    crossSellProduct,
                    crossSellProductSpecified = false,
                    primaryProduct,
                    secondaryProduct;
                // loop through all products in the prodArr to set transaction amounts (band and average) and translate friendly transaction types into correct event numbers
                //console.log('prodArr = ' + prodArr);
                while (crossSellCheckLen--) { // loop to check if a 'crossSell' item has been explicitly defined. if so, use the details supplied, else assume all products after the first are cross-sell
                    if (prodArr[crossSellCheckLen].Product && (/true/i).test(prodArr[crossSellCheckLen].crossSell)) {
                        crossSellProductSpecified = true;
                        break;
                    }
                }

                for (lp1 = 0; lp1 < prodArrLen; lp1++) {
                    if (prodArr[lp1].Product || prodArr[lp1].prod) {
                        validProductCount += 1;

                        if (crossSellProductSpecified) {
                            crossSellProduct = /true/i.test(prodArr[lp1].crossSell); // assume crossSell will be specified correctly in details
                        } else {
                            crossSellProduct = validProductCount > 1 ? true : false; // if nothing specified, anything after first valid product is assumed to be cross-sell
                        }

                        /*---- wbg|form|rq5 ----
                            Prop41:product-count(productCount)
                            Convention: Only for application and step complete, populate total products sold
                            sampleValues: 1, 2, 3

                        if (prodArr[lp1].qty) {
                            var totalProductsSold = 0;
                            pCount.push(prodArr[lp1].qty);
                            pCount = pCount.map(parseFloat);

                            for (var i in pCount) {
                                totalProductsSold += pCount[i];
                            }
                            productCount = totalProductsSold;
                        }
                        if (productCount && pdPageStep === 'complete' && pdPageType === 'application') {
                            digital['dd.productCount'] = productCount;
                        }*/
                        prodEvents = prodArr[lp1].events;
                        prodMerch = prodArr[lp1].merch;
                        prodMerch = prodMerch === 'options=' ? '' : prodMerch; // remove redundant options if none specified

                        if (prodEvents) { // only need to add transaction bands to merch vars if there is a transaction event
                            prodEvents = prodEvents.split('|');
                            prodMerch = prodMerch ? prodMerch.split('|') : [];

                            for (lp2 = 0; lp2 < prodEvents.length; lp2++) {
                                prodEventDetails = prodEvents[lp2].split('=');
                                txnType = prodEventDetails[0];
                                txnEvt = txnType; // default is value passed in object

                                // ensure all events specified in s.products are also set in s.events
                                if (/^deposit\b/.test(txnType)) { // event5 for deposit amount event
                                    txnEvt = 'event5';
                                }
                                /*else{
                                if(/^event5\b/.test(txnType)){ // 'deposit' for amount band merch evar if event5 specified
                                txnType='deposit';
                                }
                                }*/
                                if (/^payment\b/.test(txnType)) {
                                    txnEvt = 'event40';
                                }
                                /*else{
                                if(/^event40\b/.test(txnType)){
                                txnType='payment';
                                }
                                }*/
                                if (/^loan\b/.test(txnType)) {
                                    txnEvt = 'event41';
                                }
                                /*else{
                                if(/^event41\b/.test(txnType)){
                                txnType='loan';
                                }
                                }*/

                                if ((/^(?:deposit|payment|loan|\(not\ set\))(?::|$)/).test(txnType)) {
                                    // values may be like 'payment:processing...', 'loan:approved...'
                                    // could check end of txnType for status (:processing/:approved/:declined) of individual products to set relevant events (e.g. 18, 19, 20) here, if multiple respective status of products in a form is ever required/possible.
                                    // pdFormStatus as the generic value could be removed from the s.w_amntBnds parameters to allow respective product values to be used instead


                                    // Transaction values may be like '1200', '$123.45' ($=AUD), 'USD123.45', 'EUR123' etc. default to AUD if currency missing
                                    transactionDetails = (prodEventDetails[1] || '').match(/^(\D*)(.*)/); // get currency and amount
                                    currency = (transactionDetails[1] || '$').toUpperCase(); // default to $ if currency missing
                                    if (currency === '$') { // Set to AUD if currency prefix was set, or defaulted to '$'
                                        currency = 'AUD';
                                    }
                                    if (!currencySpecified) {
                                        currencySpecified = true; // set base currency to first detected in product set only
                                        s3.currencyCode = currency;
                                    }
                                    if (currency !== s3.currencyCode) {
                                        // if different to 1st product currency, append '-mix' to currency. Only one currency allowed per request. keep only values matching 1st currency
                                        currency += '-mix';
                                    }
                                    amount = transactionDetails[2];

                                    // get amount band. pass status from generic pageDetails value, or use status set in txnType set against each respective product in array
                                    txnBand = util.amntBnds(txnType + (pdFormStatus ? ':' + pdFormStatus : '') + ':' + currency, amount); // set all products in a form to the generic form status
                                    //txnBand=s.w_amntBnds(txnType+':'+currency, amount); // txnType passed with product array item could specify respective status for each product, like 'loan:approved=123'

                                    if (/^(?:\(not\ set\))(?::|$)/.test(txnType)) {
                                        // if application transactionType not set, we don't know which event to set the txn amount into
                                        prodEvents[lp2] = '';
                                    } else {
                                        // only set s.events and prod events if valid event
                                        prodEvents[lp2] = txnEvt + '=' + (currency === s3.currencyCode ? txnBand.avg : 0); // set value of different currency amounts to zero to avoid incorrect conversion to base currency of request (taken from first value)
                                        //s.events = s.apl(s.events,txnEvt,',',2);
                                        s3.w_addEvt(txnEvt);
                                    }
                                    // always set bands even if some values not set. Dont set transaction type and amount if both values empty
                                    //prodMerch.push('eVar37='+txnType); // txnType doesn't set any merch details. eVar37 now product options
                                    if (txnBand.avg !== 0 || txnType !== '(not set)') {
                                        prodMerch.push('eVar51=' + txnBand.range);
                                    }
                                }
                            }
                            prodEvents = prodEvents.join('|');
                            prodMerch = prodMerch.join('|');
                        }

                        // translate product object into an omniture-formatted string and add it to an array. set qty as 1 by default
                        //console.log('prod = ' + prodArr[lp1].prod);

                        prodSyntax.push(
                        util.lowerCase(prodArr[lp1].cat || '') + ';' +
                        //util.lowerCase((prodArr[lp1].ProductCategory + prodArr[lp1].ProductSubcategory|| '').replace(/,/g, ' ')) + ';' +
                        //s.w_lCase(prodArr[lp1].prod) + (pdPageType === 'application' && !primaryProduct ? '-x' : '') + ';' + // identify primary product/s for enhanced cross-sell reporting
                        //s.w_lCase(s.w_clean(prodArr[lp1].prod.replace(/,/g, ' '))) + (pdPageType === 'application' && !primaryProduct ? '-x' : '') + ';' + // identify primary product/s for enhanced cross-sell reporting
                        //util.lowerCase(util.lowerCase(prodArr[lp1].prod.replace(/,/g, ' '))) + (pdPageType === 'application' && crossSellProduct ? '-x' : '') + ';' + // identify primary product/s for enhanced cross-sell reporting
                        util.lowerCase(util.lowerCase((prodArr[lp1].Product||prodArr[lp1].prod).replace(/,/g, ' '))) + (pdPageType === 'application' && crossSellProduct ? '-x' : '') + ';' + // identify primary product/s for enhanced cross-sell reporting
                        //(pdPageType === 'application' && crossSellProduct ? 'x-' : '' || secondaryProduct ? '2-' : '' || primaryProduct ? '1-' : '') + util.lowerCase(util.clean(prodArr[lp1].prod.replace(/,/g, ' '))) + ';' +  // identify primary product/s for enhanced cross-sell reporting
                        (prodArr[lp1].qty || '1') + ';' + (prodArr[lp1].total || '') + ';' + (prodEvents || '') + ';' +
                        //.replace(/deposit(?==)/g,'event5') // replace friendly product event names with event numbers
                        //.replace(/loan(?==)/g,'event41')
                        //.replace(/payment(?==)/g,'event40')+';'+
                        (prodMerch || '')
                            .replace(/(^|\|)options=/g, '$1eVar37=') // set product options into eVar37
                        //.replace(/(^|\|)merchVar(?==)/g,'eVarX') // example only, replace friendly merchandising names with eVar numbers
                        );
                    }
                }
                // if only one product, or if more than one product and no primary specified, only the first product is primary.
                /*
                if (prodSyntax.length === 1 || (prodSyntax.length > 1 && !primaryProductSpecified)) {
                prodSyntax[0] = prodSyntax[0].replace(/(.*?;.*?)-x(?:;|$)/, '$1;');
                }
                 */
                return prodSyntax.join(',').replace(/;;;,/g, ',').replace(/;;;$/, ''); // join product string array and remove unnecessary delimiters to reduce pixel length
            };
            s3.w_log = function (type, data) {
                if (s3.c_rr('s3_pers_wp_dev') || !s3.w_prod) {
                    try {
                        console.info( type + ' : ' + data); // debug logging only when dev, or dev cookies set. this should be on for live sites for debugging
                    } catch (ignore) {
                        // don't log if console unavailable
                    }
                }
            };
            s3.w_trackErrorCount = function (count, errCodes) {
                if (count && count > s3.c_r('errCount')) {
                    if (!errCodes) {
                        s3.c_w('errCode', s3.apl(s3.c_r('errCode'), '(count)', ',', 2));
                    }
                    s3.c_w('errCount', count);
                }
            };

            s3.w_trackError = function (detail) {
                //var doc = document,
                var lp,
                len,
                target;

                // if function called with no detail passed, scan page and track errors/count of errors found by className/data-attr?
                if (!detail) {
                    // capture any error message elements tagged with a data-attr or className containing the error code
                    //target = s.w_qSA(doc, '[data-analytics-error]', '*', 'data-analytics-error', /.*/);
                    //var target = s.w_altGetElemsByClassName(doc.body,'span','error-label'); // look for number of li in errorLinks div id
                    target = document.getElementById('error-message'); //.getElementsByTagName('li'); // look for number of li in errorLinks div id
                    if (target) {
                        len = target.getElementsByTagName('li').length; // look for number of li in errorLinks div id
                        // store number of errors if more then previously stored (capture the highest number of errors the user has seen per page)
                        //if(len&&len>s.c_r('errCount')){
                        //	s.c_w('errCode',s.w_inlErr); // this text is matched on page load to determine error count prefix
                        //	s.c_w('errCount',len);
                        //}
                        s3.c_w('errCode', s3.apl(s3.c_r('errCode'), '(auto)', ',', 2));
                        s3.w_trackErrorCount(len, true);
                    }

                    // capture all error item text. put value into list? prop17?
                    /*
                    for(lp=0,len=target.length;lp<len;lp++){
                    // store errors in var and send list to function?
                    detail=s.apl(detail,(target[lp].textContent||target[lp].innerText),',',2);
                    }
                     */
                }
                // send errors if any as custom link request
                /*
                if(detail){
                detail=s.w_lCase(detail,1);
                s=s_gi(s_account);
                s.linkTrackVars='prop15,prop69,prop17';
                //s.prop17=s.siteID+':'+detail;
                s.prop17=detail; // capture as list prop?
                s.tl(true,'o','page code error'); // 'true' assumes this function only called from script, not link clicks
                s.w_endTrckng();
                }
                 */

                // always store errors in cookie for next page
                else {
                    // Split error fields from Domino like -
                    // NumApplicants;ConfirmCompared;ConfirmResident;ReadConsent;ConfirmElectronic;Email_1;EmailConfirm_1;
                    // NumApplicants,ConfirmCompared,ConfirmResident,ReadConsent,ConfirmElectronic,Email_1,EmailConfirm_1,
                    //target=detail.replace(/^,|,$/,'').split(',');
                    target = String(detail || '').split(',');

                    detail = s3.c_r('errCode');
                    for (lp = 0, len = target.length; lp < len; lp++) {
                        if (target[lp]) {
                            //detail=s.apl(detail,s.w_lCase(target[lp]),',',2);
                            detail = s3.apl(detail, util.lowerCase(util.clean(util.clean(target[lp]).substring(0, 50))), ',', 2); // trimmed length to 50 chars to ensure useful data and minimise pixel length
                        }
                    }
                    //s.c_w('errCode',s.apl(s.c_r('errCode'),s.w_lCase(detail),',',2));
                    //s.c_w('errCount',(+s.c_r('errCount'))+1); // increment number of errors seen
                    s3.c_w('errCode', detail);
                    s3.w_trackErrorCount(detail.split(',').length, true);
                }
            };

            s3.w_collectStoredData = function (digital) {
                // epoch date used to clear cookies
                var dateZero = new Date(0); //,
                //impTmp = s.c_r('impTmp'); //

                // collect pid impressions from after previous page load
                s3.list2 = s3.c_r('visImpTmp');

                // put the temp banners into the normal cookie
                //s.c_w('banners', impTmp, impTmp ? new Date(+new Date() + (24 * 60 * 60 * 1000)) : dateZero); // store new banners from this page. keep impressions in cookie for 24 hours
                //s.c_w('impTmp', 0, dateZero); // clear banner cookie after adding to cookie for sending

                //console.log('COLLECT STORED - impTmp = ' + impTmp);

                s3.c_w('visImpTmp', 0, dateZero); // clear after sending
                //s.w_prevPgCkiesSent = true;

                // capture number of form validation errors from cookie
                if (s3.c_r('errCount')) {
                    s3.prop17 = s3.c_r('errCode');
                    //s.eVar30 = (s.prop17.indexOf(s.w_inlErr+',')>-1? s.prop17 : 'defined errors') + ':' + s.c_r('errCount');
                    s3.eVar30 = 'errors:' + util.cap(s3.c_r('errCount'), 50);
                    s3.c_w('errCode', 0, dateZero);
                    s3.c_w('errCount', 0, dateZero);
                }
                //Target campaign click through via Cookie
                var ttIdCookie = s3.c_r("s_ttid"),
                    tLocCookie = s3.c_r("s_tloc"),
                    tActionCookie = s3.c_r("s_tAction"),
                    iPid = s3.c_r("s_pid")
                    ;
                if(iPid){
                    s3.eVar22 = iPid + s3.eVar22? ','+ s3.eVar22:'';
                    s3.events=s3.apl(s3.events,"event12",",",2);
                    s3.c_w('s_pid', 0, dateZero);
                }
                if (ttIdCookie) {
                    s3.eVar33 = ttIdCookie;
                    s3.prop33 = ttIdCookie;
                    if (tLocCookie){
                        s3.prop32 = tLocCookie;
                    }
                    if(tActionCookie){
                        s3.eVar53 = tActionCookie
                        s3.prop53 = tActionCookie;
                    }
                    s3.events=s3.apl(s3.events,"event9",",",2);
                    //s3.addEvents
                    s3.c_w('s_ttid', 0, dateZero);
                    s3.c_w('s_tloc', 0, dateZero);
                    s3.c_w('s_tAction', 0, dateZero);
                }
                // if search results 'click past rank' cookie has been set from result link click, track the rank and click event and delete the cookie.
                // The cookie is set on search results link clicks with the rank of the link

                // example output: source:search-page|type:natural|kw:low-rate-card|cat:services|rank:1
                // example output non natural type: source:search-page|type:recommended|kw:low-rate-card
                // example output non natural type: source:search-page|type:quicklinks|kw:low-rate-card
                var
                sOrigin = s3.c_r('s_loc')|| util.lowerCase(util.getQueryParam('searchsource', '', util.getLoc().href)),
                sResultType = s3.c_r('s_rt')||util.lowerCase(util.getQueryParam('result-type', '', util.getLoc().href)),
                sKeyword = s3.c_r('s_kw')||util.lowerCase(util.getQueryParam('kw', '', util.getLoc().href)),
                sResultCategory = s3.c_r('s_cat')||util.lowerCase(util.getQueryParam('cat', '', util.getLoc().href)),
                sResultRank = util.cap(s3.c_r('cpr'), 101)
                ;
                if(sResultRank){
                    s3.eVar13 ='source:' + sOrigin + '|'+
                            'type:' + sResultType + '|' +
                            'kw:' + sKeyword + '|' +
                            'cat:' + sResultCategory + '|'+
                            'rank:' + sResultRank
                            ;
                    s3.prop16 = sResultRank;
                    s3.events=s3.apl(s3.events,"event15",",",2);
                    s3.c_w('s_loc', 0, dateZero);
                    s3.c_w('s_kw', 0, dateZero);
                    s3.c_w('s_rt', 0, dateZero);
                    s3.c_w('s_cat', 0, dateZero);
                    s3.c_w('cpr', 0, dateZero);
                }

                var notifyTitle = s3.c_r('s_ntitle')||'',
                    notifyType = s3.c_r('s_ntype')||'(not set)',
                    notifyLink = s3.c_r('s_nlink')||''
                    ;
                if(notifyTitle){
                    s3.eVar75 = util.lowerCase(notifyType + ':' + notifyTitle);
                    if(notifyLink){
                        s3.prop76 = util.lowerCase(notifyLink);
                    }
                    s3.events=s3.apl(s3.events,"event98",",",2);
                    s3.c_w('s_ntitle', 0, dateZero);
                    s3.c_w('s_ntype', 0, dateZero);
                    s3.c_w('s_nlink', 0, dateZero);
                }
            };
            /*s3.w_clearOmniVars = function () {
                var lp,
                len,
                //sVarArr,
                empty = '';

                for (lp = 0, len = 75; lp <= len; lp++) {
                    s['prop' + lp] = empty;
                    s['eVar' + lp] = empty;

                    if (lp <= 5) {
                        s['hier' + lp] = empty;
                        s['list' + lp] = empty;
                        s['pev' + lp] = empty;
                    }
                }
                s3.pageName = s3.pageType = s3.channel = s3.products = s3.productsList = s3.events = s3.eventList = s3.campaign = s3.purchaseID = s3.transactionID = s3.state = s3.zip = s3.server = s3.linkName = empty;

            };*/
            // test global drop list to decide if the page should be aborted
            s3.w_globalDrop = function (refObj) {
                var testResult = 0,
                siteDropList = util.lStor('get', 'appmeasurement_nameKeyDrop'); //,
                //pageDropCondition = String(refObj.abortIf).split('=', 2),
                //pageDropCompare;

                // global (within origin) drops
                if (siteDropList) {
                    testResult = new RegExp('(^|,)' + String(refObj._nameKey).replace(/([.*+?\^=!:${}()\|\[\]\/\\])/g, '\\$1') + '(,|$)').test(siteDropList);
                }

                //console.log('testResult = ' + testResult);

                return testResult;
            };
            // test specific values to decide if the pageDetails should be aborted, changed etc.
            //s.w_changeIf = function (refObj, sObjectProperties) // dynamically change pageDetails or s object
            s3.w_changeIf = function (refObj) { // dynamically change pageDetails
                var prpty,
                expressionSet = refObj.changeIf || [],
                expressionSetLength,
                expressionItem,
                //sObjectItem,
                //getSObjectProperty = function (item) {
                //	return sObjectProperties && /^s\.(prop|eVar)/.test(item) && item.replace(/^s\./, '');
                //},
                ifItemVal,
                equalsItemVal,
                andIf,
                andEvaluation,
                dynamicItems = {
                    '(lastpage)' : s3.c_r('lastPage'),
                    '(location)' : util.getLoc().href,
                    '(referrer)' : document.referrer,
                    '(s3_pers)' : s3.c_rr('s3_pers'), // these cookie values can only be used in the if expression, not equals
                    '(s3_sess)' : s3.c_rr('s3_sess') // these cookie values can only be used in the if expression, not equals
                };
                //console.log(dynamicItems);

                try {
                    if (typeof expressionSet === 'string') {
                        expressionSet = JSON.parse(expressionSet);
                    }
                } catch (err) {
                    //s.w_log(err);
                    expressionSet = [];
                }

                //console.log('expressionSet = ');
                //console.log(expressionSet);

                expressionSetLength = expressionSet.length;

                for (prpty = 0; prpty < expressionSetLength; prpty++) {
                    expressionItem = expressionSet[prpty];
                    //console.log(expressionItem);

                    if (expressionItem.item && expressionItem.like && expressionItem.then) {
                        //console.log('expressionItem = ');
                        //console.log(expressionItem);
                        //sObjectItem = getSObjectProperty(expressionItem.item);
                        //ifItemVal = String(dynamicItems[expressionItem.item] || refObj[expressionItem.item] || (sObjectItem && window.s[sObjectItem]) || ''); // only when called from end of doPlugins, for async
                        ifItemVal = String(dynamicItems[expressionItem.item] || refObj[expressionItem.item] || ''); // only when called from end of doPlugins, for async
                        //console.log('ifItemVal = ');
                        //console.log(ifItemVal);
                        //sObjectItem = getSObjectProperty(expressionItem.equals);
                        //equalsItemVal = String(dynamicItems[expressionItem.equals] || refObj[expressionItem.equals] || (sObjectItem && window.s[sObjectItem]) || expressionItem.equals || ''); // added option to set a property to one of the dynamic values
                        equalsItemVal = String(dynamicItems[(expressionItem.equals || '').replace(/\((s_pers|s_sess)\)/i, '')] || refObj[expressionItem.equals] || expressionItem.equals || ''); // added option to set a property to one of the dynamic values
                        //console.log('equalsItemVal = ');
                        //console.log(equalsItemVal);

                        andEvaluation = true;
                        andIf = expressionItem.and;
                        if (andIf && andIf.item && andIf.like) {
                            andEvaluation = new RegExp(andIf.like, 'i').test(String(dynamicItems[andIf.item] || refObj[andIf.item] || ''));
                        }

                        if (new RegExp(expressionItem.like, 'i').test(ifItemVal) && andEvaluation) {
                            if (expressionItem.replace) {
                                //console.log('regex = ' + new RegExp(expressionItem.replace.exp, expressionItem.replace.flags || ''));
                                equalsItemVal = equalsItemVal.replace(new RegExp(expressionItem.replace.exp, expressionItem.replace.flags || ''), expressionItem.replace.subs || '');
                            }
                            //console.log('equalsItemVal = ' + equalsItemVal);
                            refObj[expressionItem.then] = equalsItemVal;
                            //sObjectItem = getSObjectProperty(expressionItem.then);
                            //if (sObjectItem) {
                            //	window.s[sObjectItem] = equalsItemVal;
                            //}
                        }
                    }
                }

                //console.log('refObj = ');
                //console.log(refObj);
            };
            s3.trackImprs = function () {
                var lp,
                targetSet,
                targetItem,
                linkHref,
                attrHref,
                linkPid,
                pidRecordedFlag = 'data-analytics-pid-imp',
                arrImprs = [];

                //targetSet = document.getElementsByTagName('A');
                targetSet = util.qSA(document, "a[href*='pid\\='],[data-analytics-pid]", 'A', 'href', (/pid=/i));

                lp = targetSet.length;
                while (lp--) {
                    // check for any links with pid= and add them to the impressions list
                    // THIS BLOCK SHOULD RUN AFTER S.T(), ELSE DOPLUGINS WILL TRACK IMPRESSIONS WITH THE CURRENT PAGE (post-load impressions are only meaningfully reported against previous page)
                    targetItem = targetSet[lp];

                    // if it's an anchor link, look in the anchor only, not full URL in case already a pid click parameter in current querystring
                    attrHref = targetItem.getAttribute('href');
                    linkHref = /^#/.test(attrHref) ? attrHref : targetItem.href;
                    linkPid = util.getQueryParam('pid', '', linkHref);


                    /*if (linkPid) {
                    console.log(targetItem.href);
                    console.log('s.w_trackImprs found pid: ' + linkPid);
                    console.log('Visible size?: ' + targetItem.offsetWidth + 'x' + targetItem.offsetHeight + '. Vis test === ' + (linkPid && util.isVisible(0, targetItem)));
                    }*/


                    // fix for IE bug with inline and block elements stating offsets incorrectly
                    //ieDisplayNoneBug = target[lp].currentStyle && target[lp].currentStyle.display === 'none' ? true : false;

                    // not an impression if the element is not visible
                    //if (linkPid && (target[lp].offsetWidth > 0 && target[lp].offsetHeight > 0)) {
                    //if (linkPid && (target[lp].offsetWidth > 0 && target[lp].offsetHeight > 0) && !ieDisplayNoneBug) {
                    //if (linkPid && s.w_isVis(0, targetItem)) {
                    if (linkPid && util.isVisible(0, targetItem) && !targetItem.getAttribute(pidRecordedFlag)) {

                        // if not already collected on this window load
                        //window.console && console.log(linkPid + ' collected? = ' + targetItem.getAttribute(pidRecordedFlag));

                        arrImprs.push(linkPid.replace(/,/g, '%2C')); // encode commas in url pid's so they arent split into multiple impressions

                        // set a flag
                        targetItem.setAttribute(pidRecordedFlag, '1');
                    }
                }
                if (arrImprs) {
                    //window.console && console.log('s.w_trackImprs to send = ' + arrImprs.join(','));
                    s3.trackImpression(arrImprs.join(','));
                }
            };
            s3.trackImpression = function (detail) {
                var lp,
                len,
                newData,
                items,
                ckName = 'visImpTmp',
                detailObj = detail,
                attrHref,
                linkHref,
                pidRecordedFlag = 'data-analytics-pid-imp';
                if (!util.isPageHidden()) {
                    if (detailObj && detailObj.nodeName === 'A') {
                        if (util.isVisible(0, detailObj) && !detailObj.getAttribute(pidRecordedFlag)) {
                            attrHref = detailObj.getAttribute('href');
                            linkHref = /^#/.test(attrHref) ? attrHref : detailObj.href;
                            detail = util.getQueryParam('pid', '', linkHref);
                            if (detail) {
                                detailObj.setAttribute(pidRecordedFlag, '1');
                            }
                        } else {
                            detail = 0;
                        }
                    }
                    if (detail && ckName) {
                        newData = String(detail || '');
                        items = newData.split(',');
                        newData = s3.c_r(ckName) || '';
                        for (lp = 0, len = items.length; lp < len; lp++) {
                            if (items[lp]) {
                                newData = s3.apl(newData, util.lowerCase(items[lp]), ',', 2);
                            }
                        }
                        // if the cookie has more than five banners send a custom request to prevent the string becoming truncated? How long are the pid's? evar=255 chars
                        //s.c_w('banners',newData);
                            s3.c_w(ckName, newData, new Date(+new Date() + (24 * 60 * 60 * 1000))); // keep impressions in cookie for 24 hours

                    }
                }
                return newData;
            };
            s3.targetImpression = function(data){
                var targetContent = util.qSA(document,".target-container", 'span', 'class', (/target-container/i)),
                tntlist = [],
                lp = targetContent.length;
                while (lp--) {
                    var
                    targetItem = targetContent[lp],
                    tntVar=targetItem.getAttribute('data-target-var')
                    if(tntVar){
                        tntlist.push(tntVar.replace(/,/g, '%2C'));
                    }
                }
                if(data){
                    var campaigns = data.split(','),
                    ln = campaigns.length
                    while (ln--) {
                        tntlist.push(campaigns[ln]);
                    }
                }
                if (tntlist && tntlist.length>0) {
                    //window.console && console.log('s.w_trackImprs to send = ' + arrImprs.join(','));
                    //console.log(tntlist);
                    //return tntlist[0];
                    return tntlist.join(',');
                } else{
                        return "";
                    }
                };
            s3.w_trackTargetImpressionObj = function(data){
                var targetList = decodeURIComponent(util.lowerCase(data.targetCampaignViewed)),
                    tergetLoc = decodeURIComponent(util.lowerCase(data.targetLocationId)),
                    targetMod = util.lowerCase(data.pageModules);

                if(window.serverState && window.visitor){
                    visitor.resetState(window.serverState);
                    delete window.serverState;
                }
                if(targetList){
                    //pageDetails["targetCampaignViewed"] = targetList;
                    s3.events = 'event8';
                    s3.linkTrackVars = s3.w_ltv +',prop32,prop41,list3,events';
                    s3.list3 = targetList; // record ttid name only
                    s3.linkTrackEvents = s3.events;
                    s3.eVar6=s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                    s3.eVar1=s3.prop1 ='target:impression';
                    s3.prop41 = targetMod;
                    s3.prop32 = tergetLoc;
                    s3.tl(true, 'o', 'target:impression:'+ targetList);
                    delete pageDetails.targetCampaignViewed;
                    delete pageDetails.targetLocationId;
                    delete pageDetails.pageModules;
                    s3.w_endTrckng();
                    return true;
                }
            };
            s3.w_trackTargetImpression = function(data){
                var intCamp = decodeURIComponent(util.lowerCase(typeof(data) == 'object' ? data.internalCampaignViewed:pageDetails.internalCampaignViewed)),
                targetList = decodeURIComponent(util.lowerCase(typeof(data) == 'object' ? data.targetCampaignViewed:pageDetails.targetCampaignViewed)),
                pCode = decodeURIComponent(util.lowerCase(typeof(data) == 'object' ? data.promoCode:pageDetails.promoCode)),
                CCode = decodeURIComponent(util.lowerCase(typeof(data) == 'object' ? data.campaignCode:pageDetails.campaignCode))
                ;
                if(targetList && (data && typeof(data)!= 'object')){
                    targetList = targetList+','+data;
                    //pageDetails["targetCampaignViewed"] = targetList;
                }

                if(targetList || intCamp){
                    if(window.serverState && window.visitor){
                        visitor.resetState(window.serverState);
                        delete window.serverState;
                    }
                    if(targetList && intCamp){
                        s3.events = 'event8,event11';
                        s3.linkTrackVars = s3.w_ltv +',prop32,prop41,list2,list3,events';
                        s3.list2 = intCamp; // record ttid name only
                        s3.list3 = s3.targetImpression(targetList); // record ttid name only
                    }else if(targetList){
                        s3.events = 'event8';
                        s3.linkTrackVars = s3.w_ltv +',prop32,prop41,list3,events';
                        s3.list3 = s3.targetImpression(targetList); // record ttid name only
                    }else if(intCamp){
                        s3.events = 'event11';
                        s3.linkTrackVars = s3.w_ltv +',prop32,prop41,list2,events';
                        s3.list2 = intCamp; // record ttid name only
                    }
                    if(pCode || CCode){
                        s3.events =   s3.events + ',event6'
                        s3.linkTrackVars =  s3.linkTrackVars + ',eVar11'
                        s3.eVar11 = util.lowerCase((pageDetails.campaignCode?'cc:'+pageDetails.campaignCode:'')+(pageDetails.promoCode?'|pc:'+pageDetails.promoCode:''))
                    }
                    s3.linkTrackEvents = s3.events;
                    s3.eVar6=s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                    s3.eVar1=s3.prop1 ='target:impression';
                    s3.prop41 = util.lowerCase(pageDetails.pageModules||'');
                    s3.prop32 = util.lowerCase(pageDetails.targetLocationId||'');
                    s3.tl(true, 'o', 'target:impression:'+ targetList+ (intCamp?'|'+intCamp:'') ); // 'eTarg' assumes this function only called from link clicks
                    //console.log('tl() target:impression:'+targetList);
                    //delete pageDetails.internalCampaignViewed;
                    //delete pageDetails.targetCampaignViewed;
                    s3.w_endTrckng();
                    return true;
                }else{
                    return false;
                }
            };
            s3.w_trackTargetDismissExpand = function(evt,data){
                var targetList = decodeURIComponent(util.lowerCase(typeof(data) == 'object' ? data.targetCampaignViewed : pageDetails.targetCampaignViewed)),
                targetAction = decodeURIComponent(util.lowerCase(typeof(data) == 'object' ? data.action : pageDetails.action)),
                targetModule = decodeURIComponent(util.lowerCase(typeof(data) == 'object' ? data.pageModules : pageDetails.pageModules))
                targetLocation = decodeURIComponent(util.lowerCase(typeof(data) == 'object' ? data.targetLocationId : pageDetails.targetLocationId))
                ;
                /*if(targetList && (data && typeof(data)!= 'object')){
                    targetList = targetList+','+data;
                    pageDetails["targetCampaignViewed"] = targetList;
                }*/
                if(targetList){
                    //pageDetails["targetCampaignViewed"] = targetList;
                    if(evt){
                        if(evt == 'dismiss'){
                            s3.events = 'event4';
                        }else if(evt == 'expanded'){
                            s3.events = 'event31';
                        }
                        s3.linkTrackVars = s3.w_ltv +',prop32,prop41,list3,events';
                        s3.list3 = targetList; // record ttid name only
                    }
                    if(targetAction){
                        s3.linkTrackVars =  s3.linkTrackVars + ',eVar53,prop53'
                        s3.eVar53= targetAction ;
                        s3.prop53 = targetAction ;
                    }
                    s3.linkTrackEvents = s3.events;
                    s3.eVar6=s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                    s3.eVar1=s3.prop1 ='target:'+evt;
                    s3.prop41 = targetModule||'';
                    s3.prop32 = targetLocation||'';
                    s3.tl(true, 'o', 'target:'+evt + targetList ); // 'eTarg' assumes this function only called from link clicks
                    //console.log('tl() target:impression:'+targetList);
                    //delete pageDetails.targetCampaignViewed;
                    //delete pageDetails.targetLocationId;
                    //delete pageDetails.pageModules;
                    //delete pageDetails.action;
                    s3.w_endTrckng();
                    return true;
                }else{
                    return false;
                }
            };
            s3.w_trackNotification = function(evt, data){
                var pdNotification = (typeof(data) == 'object'? data.notification:''),
                notifications = '';
                if(pdNotification && pdNotification.length>=1){
                    for(var i=0; i<pdNotification.length; i++){
                        notifications=s3.apl(notifications,(pdNotification[i].notificationTitle||''),',',2);
                    }
                }
                if(notifications){
                    if(evt==='impression'){
                        s3.events = 'event97';

                    }else if(evt==='close'){
                        s3.events = 'event99';
                    }
                    s3.linkTrackVars = s3.w_ltv +',eVar75,events';
                    s3.eVar75 = notifications; // record ttid name only
                    s3.linkTrackEvents = s3.events;
                    s3.eVar6=s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                    s3.eVar1=s3.prop1 ='impression';
                    s3.tl(true, 'o', 'notification:'+evt+':'+ notifications); // 'eTarg' assumes this function only called from link clicks
                    //console.log('tl() target:impression:'+targetList);
                    delete pageDetails.internalCampaignViewed;
                    delete pageDetails.targetCampaignViewed;
                    s3.w_endTrckng();
                    return true;
                } else{
                    return false;
                }
            };
            // YouTube video player tracking Code
            s3.w_trackMedia = function(data){
                var vId = data.id,
                    vTitle = data.title ||'',
                    vDuration = data.duration ||'',
                    vEvent = data.event ||'',
                    ctime = data.currentTime ||'';
                s3.linkTrackEvents = s3.events = '';
                s3.linkTrackVars = '';
                s3.prop20 = '';
                if (vEvent === 'loaded'){
                    s3.linkTrackEvents=s3.events = 'event81';
                } else if(vEvent === 'open' && vId ){
                    s3.linkTrackEvents=s3.events = 'event82';
                } else if(vEvent === '25' && vId ){
                    s3.linkTrackEvents=s3.events = 'event83';
                } else if(vEvent === '50' && vId){
                    s3.linkTrackEvents=s3.events = 'event84';
                } else if(vEvent === '75' && vId){
                    s3.linkTrackEvents=s3.events = 'event85';
                } else if(vEvent === 'completed'){
                    s3.linkTrackEvents=s3.events = 'event79';
                } else if(vEvent === 'skipping'){
                    s3.prop20 ='video:skipped:'+ctime;
                    s3.linkTrackEvents = s3.events='event69';
                } else if(vEvent === 'stop'){
                    s3.prop20 ='video:paused:'+ctime;
                    s3.linkTrackEvents = s3.events='event69';
                }
                s3.linkTrackVars = s3.w_ltv +',eVar80,prop68,prop20,events';
                s3.eVar80 = s3.prop68 = vDuration + '|' + vTitle; // record ttid name only
                s3.eVar6=s3.prop6 = util.lowerCase(pageDetails.siteBrand);
                s3.eVar1=s3.prop1 ='video';
                s3.tl(true, 'o', 'video:'+vEvent+':'+ vId); // 'eTarg' assumes this function only called from link clicks
                //console.log('tl() target:impression:'+targetList);
                delete data.event;
                delete data.currentTime;
                s3.w_endTrckng();
                return true;
            };

            // track a page only once per window load (for single page applications). All names sent stored in array to compare for all further calls until reset or page reloaded (array cleared)
            s3.w_pageTracked = function (pgName) {
                var lp,
                tracked = false;

                s3.w_trackedPages = s3.w_trackedPages || [];
                lp = s3.w_trackedPages.length;
                while (lp--) {
                    if (s3.w_trackedPages[lp] === pgName) {
                        // already been tracked this page load
                        tracked = true;
                        break;
                    }
                }
                if (!tracked) {
                    s3.w_trackedPages.push(pgName);
                }
                //console.log('tracked '+pgName+'? '+tracked + '. s.w_trackedPages = '+s.w_trackedPages);
                return tracked;
            };
            s3.w_queue = [];
            // track a page load
            s3.w_trackPage = function (details) {
                var referenceObj = details || pageDetails,
                lastPredictedPageName = s3.c_r('lppn'),
                currPredictedPageName,
                detailsCopy; //,

                // remove this property in case it was set manually. This is for internal code logic only
                delete referenceObj._drop;

                if (referenceObj.originNameKeyDrop) {
                    util.lStor('set', 'appmeasurement_nameKeyDrop', referenceObj.originNameKeyDrop);
                }
                if (referenceObj.originPageNameReplace) {
                    util.lStor('set', 'appmeasurement_pageNameReplace', referenceObj.originPageNameReplace);
                }
                if (referenceObj.originProductsReplace) {
                    util.lStor('set', 'appmeasurement_productsReplace', referenceObj.originProductsReplace);
                }

                s3.w_pgTrkStatus = referenceObj.s_abort ? 'blocked' : 'started'; // any new impressions passed should now be associated with this page if not being dropped


                // make object copy for async pageDetails delayed tracking (can't operate async on a single object)
                //detailsCopy = JSON.parse(JSON.stringify(details));
                detailsCopy = util.cloneObject(referenceObj);

                // after object passed has been copied, clear window.pageDetails ready for new values
                if (/true/i.test(detailsCopy.reset)) {
                    pageDetails = {};
                    digital = {};
                }

                // Always remove these page/screen specific properties from any reference object so they doesn't persist to any subsequent pages/screens if the whole context is used in the next screen/dialog in fiserv OTP code
                // s_ override keys may also need to be removed if set and persisted by single page apps etc.
                delete referenceObj.trackAsLink;
                delete referenceObj.s_linkType;
                delete referenceObj.trackOnce;
                delete referenceObj.s_abort;
                delete referenceObj.addEvents;
                delete referenceObj.sendDelay;

                // initialise siteID for consistent getPageName prediction below. Real site ID determined in doPlugins
                s3.siteID = false;

                // Predict expected pageName for dupe/trackOnce to decide whether to keep or ignore new impressions being passed
                dcPageName = detailsCopy.pageName || '0';
                // change any details async (in order of calls)
                s3.w_changeIf(detailsCopy);
                currPredictedPageName = (detailsCopy.s_pageName || (detailsCopy.newFormName ? detailsCopy.newFormName + (detailsCopy.pageType || '0') + dcPageName : (detailsCopy.transactionType ? detailsCopy.transactionType + dcPageName : (detailsCopy.subSite || '0') + (detailsCopy.pageName ? (detailsCopy.pageNamePrefixes || '0') + dcPageName : decodeURIComponent(util.getPageName(util.pageURL)))))) + (detailsCopy.pageType || '0') + (detailsCopy.dialogTitle || '0') + (detailsCopy.itemName || '0') + (detailsCopy.pageNameReplace || '0'); // replace undefined's with '0' to shorten value
                /*
                console.log('s.getPageName(s.pageURL) ' + s.getPageName(s.pageURL));
                console.log('s.getPageName(s.pageURL) ' + decodeURI(s.getPageName(s.pageURL)));
                console.log('s.getPageName(s.pageURL) ' + decodeURIComponent(s.getPageName(s.pageURL)));
                 */
                detailsCopy._nameKey = ((detailsCopy.pageKey || '0') + (detailsCopy.experience || '0') + currPredictedPageName).replace(/,/g, '_'); // replace commas with underscore (stored drop string is comma separated)

                // reset trackOnce data to allow SPA pages to be sent again
                if (/reset/i.test(detailsCopy.trackOnce)) {
                    s3.w_trackedPages = 0;
                }
                //s3.w_log('lastPredictedPageName',lastPredictedPageName)
                //s3.w_log('currPredictedPageName',currPredictedPageName)
                if (detailsCopy.s_abort || ((/true/i.test(detailsCopy.trackDedupe) && lastPredictedPageName === currPredictedPageName) || ((/true/i.test(detailsCopy.trackOnce) && s3.w_pageTracked('pre_' + currPredictedPageName)) || s3.w_globalDrop(detailsCopy)))) {
                    //if (detailsCopy.s_abort || ((/true/i.test(detailsCopy.trackDedupe) && lastPredictedPageName === currPredictedPageName) || ((/true/i.test(detailsCopy.trackOnce) && s3.w_pageTracked('pre_' + currPredictedPageName)) || globalDrop))) {
                    // stop trackDedupe and trackOnce calls from collecting impressions
                    //trackingToBeSent = 0;
                    // allow trackDedupe calls to continue tracking process until accurate dedupe name is determined in doPlugins
                    detailsCopy._drop = 1;
                    s3.w_pgTrkStatus = 'blocked'; // don't collect banners for pages being aborted or meeting trackDedupe/trackOnce rules
                } else {

                    // set 'Last Predicted PageName' to current name being sent, to compare next call
                    s3.c_w('lppn', currPredictedPageName, new Date(+new Date() + (30 * 60 * 1000))); // keep last page name in cookie for 24 hours for impressions etc.
                }
                // always reset after first trackPage call
                // clear s object vars ready for new step of 1-page	 forms
                //s3.w_clearOmniVars();
                s3.clearVars();
                s3.w_log('s3 pageDetails',unescape(JSON.stringify(detailsCopy, null, 4).replace(/\\u([\w\d]{4})/g, '%u$1')));

                if (detailsCopy.s_abort || detailsCopy._drop) {
                    s3.w_log('s3_drop',true)
                }else{
                    /*if ((/^prod$/i).test(detailsCopy.siteEnv)) {  //WDP Only
                       s3_account ="wbg-banking-prd";
        +		      s3.sa(s3_account);
                    }*/
                    //forcing to prod report suite
                    if (s3.c_r('f_prd')){
                        s3_account ="wbg-banking-prd";
                        s3.sa(s3_account);
                    }

                    s3.w_pgTrkStatus = 'sent'; // ok to start collecting banners for this page
                    s3.w_perfTracked = true; // prevent from re-running

                    // collect and remove data only if it is likely to actually be sent
                    s3.w_collectStoredData(digital);

                    //s.w_queue.push(JSON.parse(JSON.stringify(pageDetails))); // copy object into queue
                    s3.w_queue.push(detailsCopy); // store details in pageDetailsArray
                    //console.log('1 - '+JSON.stringify(s.w_queue));
                    s3.t();
                    //console.log('f():w_trackPage s3.t()');
                    s3.trackImprs();
                    s3.w_endTrckng();
                    s3.w_log('context data s3', unescape(JSON.stringify(digital, null, 4).replace(/\\u([\w\d]{4})/g, '%u$1')));
                    digital ={}; //reset the digital variable for SPA pages
                }
            }



            /*s3.ActivityMap.link = function(ele, linkName) {
                if (ele) {
                    var objectId = ele.getAttribute('data-s-object-id');
                    if (objectId) {
                        return objectId;
                    }

                    if (ele.tagName == 'A' && ele.href) {
                        return ele.href;
                    }
                }
                if (linkName) {
                    return linkName;
                }
            }*/
            s3.ActivityMap.link = function(ele, linkName) {
                 if (ele) {
                     var objectId = ele.getAttribute('data-s-object-id');
                     if (objectId) {
                         return objectId;
                     }

                     if (ele.tagName == 'A' && ele.href) {
                         // mailto: links?
                         if (/^mailto:/i.test(ele.href)) {
                             return 'email:' + decodeURI(ele.href.replace(/^mailto:/i, '').replace(/((?:&|\?)body=.*?(?=&|$))/ig, '')); // added .replace(/^mailto:/i,'')
                         } else if (/^tel:/i.test(ele.href)) {
                            return 'call:' + decodeURI(util.lowerCase(ele.href, 1)).replace(/^tel:|\s+/gi, '');
                         }
                         return ele.href;
                     }
                 }
                 if (linkName) {
                     return linkName;
                 }
                 return "";
            };

            s3.ActivityMap.region = function(ele) {
                var nav='';
                var ele_orig = ele;
                // for westpac.com.au
                while ((ele && (ele = ele.parentNode))) {
                    if (ele.nodeType === 1) {
                        nav = ele.getAttribute('data-analytics-nav');
                        if (nav) {
                            return nav;
                        }
                    }
                }

                // for stg
                ele = ele_orig;
                var classNameArray;
                var className,
                    classNames = {
                        'top-header': 1,
                        'topnav': 1,
                        'header': 1,
                        'breadcrumb': 1,
                        'leftside-navigation':1,
                        'asideright':1,
                        'content':1,
                        'footer': 1,
                        'title-bar': 1,
                        'main-nav': 1,
                        'footer-nav': 1,
                        'interaction-wrapper': 1
                    };

                // for BT
                /*ele = ele_orig;
                var classNameArray;
                var className,
                    classNames = {
                        'top-header': 1,
                        'topnav': 1,
                        'header': 1,
                        'breadcrumb': 1,
                        'leftside-navigation':1,
                        'asideright':1,
                        'content':1,
                        'footer': 1,
                        'header__drawers':1,
                        'header__primary-drawer':1,
                        'header__top-bar-sm':1,
                        'header__top-bar-md':1,
                        'header__search-drawer':1,
                    };*/
                while ((ele && (ele = ele.parentNode))) {
                    if (ele.nodeType === 1) {
                    classNameArray = ele.className.split(" ");

                    for (var i = 0; i < classNameArray.length; ++i) {
                        if ((className = classNameArray[i]) && classNames[className]) {
                            return className;
                        }
                    }
                    }
                }
                return "BODY";
            }

            // attach link handler to document
            util.addHandler(document, 'click', s3.w_linkTracking); // testing handler on document instead of applying directly to every link. Simulate jQuery .on()


            /****************************** MODULES *****************************/

            // copy and paste implementation modules (Media, Integrate) here
            // AppMeasurement_Module_Media.js - Media Module, included in AppMeasurement zip
            // AppMeasurement_Module_Integrate.js - Integrate Module, included in AppMeasurement zip

            /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/


            s3.loadModule("AudienceManagement");

            function AppMeasurement_Module_AudienceManagement(d){var a=this;a.s=d;var b=window;b.s_c_in||(b.s_c_il=[],b.s_c_in=0);a._il=b.s_c_il;a._in=b.s_c_in;a._il[a._in]=a;b.s_c_in++;a._c="s_m";a.setup=function(c){b.DIL&&c&&(c.disableDefaultRequest=!0,c.disableScriptAttachment=!0,c.disableCORS=!0,c.secureDataCollection=!1,a.instance=b.DIL.create(c),a.tools=b.DIL.tools)};a.isReady=function(){return a.instance?!0:!1};a.getEventCallConfigParams=function(){return a.instance&&a.instance.api&&a.instance.api.getEventCallConfigParams?
            a.instance.api.getEventCallConfigParams():{}};a.passData=function(b){a.instance&&a.instance.api&&a.instance.api.passData&&a.instance.api.passData(b)}}
            !function(){"use strict";var r,o,a;"function"!=typeof window.DIL&&(window.DIL=function(n){var c,e,I,r,u,h,t,o,s,i,a,d,y,l,f,g,p,m,b,v,D,O=[],C={};function S(e){return void 0===e||!0===e}n!==Object(n)&&(n={}),I=n.partner,r=n.containerNSID,u=n.mappings,h=n.uuidCookie,t=!0===n.enableErrorReporting,o=n.visitorService,s=n.declaredId,i=!0===n.delayAllUntilWindowLoad,a=S(n.secureDataCollection),d="boolean"==typeof n.isCoopSafe?n.isCoopSafe:null,y=S(n.enableHrefererParam),l=S(n.enableLogging),f=S(n.enableUrlDestinations),g=S(n.enableCookieDestinations),p=!0===n.disableDefaultRequest,m=n.afterResultForDefaultRequest,b=n.visitorConstructor,v=!0===n.disableCORS,D=!0===n.ignoreHardDependencyOnVisitorAPI,t&&DIL.errorModule.activate(),D&&O.push("Warning: this instance is configured to ignore the hard dependency on the VisitorAPI service. This means that no URL destinations will be fired if the instance has no connection to VisitorAPI. If the VisitorAPI service is not instantiated, ID syncs will not be fired either.");var w=!0===window._dil_unit_tests;if((c=arguments[1])&&O.push(c+""),!I||"string"!=typeof I){var _={name:"error",message:c="DIL partner is invalid or not specified in initConfig",filename:"dil.js"};return DIL.errorModule.handleError(_),new Error(c)}if(c="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0",(r||"number"==typeof r)&&(r=parseInt(r,10),!isNaN(r)&&0<=r&&(c="")),c&&(r=0,O.push(c),c=""),(e=DIL.getDil(I,r))instanceof DIL&&e.api.getPartner()===I&&e.api.getContainerNSID()===r)return e;if(!(this instanceof DIL))return new DIL(n,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+I+" and containerNSID = "+r);DIL.registerDil(this,I,r);var R={doesConsoleLogExist:window.console===Object(window.console)&&"function"==typeof window.console.log,logMemo:{},log:function(e){(O.push(e),l&&this.doesConsoleLogExist)&&Function.prototype.bind.call(window.console.log,window.console).apply(window.console,arguments)},logOnce:function(e){this.logMemo[e]||(this.logMemo[e]=!0,R.log(e))}},E={IS_HTTPS:a||"https:"===document.location.protocol,SIX_MONTHS_IN_MINUTES:259200,IE_VERSION:function(){if(document.documentMode)return document.documentMode;for(var e=7;4<e;e--){var t=document.createElement("div");if(t.innerHTML="\x3c!--[if IE "+e+"]><span></span><![endif]--\x3e",t.getElementsByTagName("span").length)return t=null,e}return null}()};E.IS_IE_LESS_THAN_10="number"==typeof E.IE_VERSION&&E.IE_VERSION<10;var P={stuffed:{}},L={},A={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},firstRequestHasFired:!1,abortRequests:!1,num_of_cors_responses:0,num_of_cors_errors:0,corsErrorSources:[],num_of_img_responses:0,num_of_img_errors:0,platformParams:{d_nsid:r+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:3e4,calledBack:!1,mid:null,noVisitorAPI:null,VisitorAPI:null,instance:null,releaseType:"no VisitorAPI",isOptedOut:!0,isOptedOutCallbackCalled:!1,admsProcessingStarted:!1,process:function(e){try{if(this.admsProcessingStarted)return;this.admsProcessingStarted=!0;var t,n,s,i=o;if("function"!=typeof e||"function"!=typeof e.getInstance)throw this.noVisitorAPI=!0,new Error("Visitor does not exist.");if(i!==Object(i)||!(t=i.namespace)||"string"!=typeof t)throw this.releaseType="no namespace",new Error("DIL.create() needs the initConfig property `visitorService`:{namespace:'<Experience Cloud Org ID>'}");if(!((n=e.getInstance(t,{idSyncContainerID:r}))===Object(n)&&n instanceof e&&"function"==typeof n.isAllowed&&"function"==typeof n.getMarketingCloudVisitorID&&"function"==typeof n.getCustomerIDs&&"function"==typeof n.isOptedOut&&"function"==typeof n.publishDestinations))throw this.releaseType="invalid instance",s="Invalid Visitor instance.",n===Object(n)&&"function"!=typeof n.publishDestinations&&(s+=" In particular, visitorInstance.publishDestinations is not a function. This is needed to fire URL destinations in DIL v8.0+ and should be present in Visitor v3.3.0+ ."),new Error(s);if(this.VisitorAPI=e,!n.isAllowed())return this.releaseType="VisitorAPI is not allowed to write cookies",void this.releaseRequests();this.instance=n,this.waitForMidToReleaseRequests()}catch(e){if(!D)throw new Error("Error in processing Visitor API, which is a hard dependency for DIL v8.0+: "+e.message);this.releaseRequests()}},waitForMidToReleaseRequests:function(){var t=this;this.instance&&(this.instance.getMarketingCloudVisitorID(function(e){t.mid=e,t.releaseType="VisitorAPI",t.releaseRequests()},!0),(!N.exists||!N.isIabContext&&N.isApproved()||N.isIabContext&&B.hasGoSignal())&&setTimeout(function(){"VisitorAPI"!==t.releaseType&&(t.releaseType="timeout",t.releaseRequests())},this.getLoadTimeout()))},releaseRequests:function(){this.calledBack=!0,A.registerRequest()},getMarketingCloudVisitorID:function(){return this.instance?this.instance.getMarketingCloudVisitorID():null},getMIDQueryString:function(){var e=k.isPopulatedString,t=this.getMarketingCloudVisitorID();return e(this.mid)&&this.mid===t||(this.mid=t),e(this.mid)?"d_mid="+this.mid+"&":""},getCustomerIDs:function(){return this.instance?this.instance.getCustomerIDs():null},getCustomerIDsQueryString:function(e){if(e!==Object(e))return"";var t,n,s,i,r="",o=[],a=[];for(t in e)e.hasOwnProperty(t)&&(n=e[a[0]=t])===Object(n)&&(a[1]=n.id||"",a[2]=n.authState||0,o.push(a),a=[]);if(i=o.length)for(s=0;s<i;s++)r+="&d_cid_ic="+x.encodeAndBuildRequest(o[s],"%01");return r},getIsOptedOut:function(){this.instance?this.instance.isOptedOut([this,this.isOptedOutCallback],this.VisitorAPI.OptOut.GLOBAL,!0):(this.isOptedOut=!1,this.isOptedOutCallbackCalled=!0)},isOptedOutCallback:function(e){this.isOptedOut=e,this.isOptedOutCallbackCalled=!0,A.registerRequest(),N.isIabContext()&&B.checkQueryStringObject()},getLoadTimeout:function(){var e=this.instance;if(e){if("function"==typeof e.getLoadTimeout)return e.getLoadTimeout();if(void 0!==e.loadTimeout)return e.loadTimeout}return this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE}},declaredId:{declaredId:{init:null,request:null},declaredIdCombos:{},setDeclaredId:function(e,t){var n=k.isPopulatedString,s=encodeURIComponent;if(e===Object(e)&&n(t)){var i=e.dpid,r=e.dpuuid,o=null;if(n(i)&&n(r))return o=s(i)+"$"+s(r),!0===this.declaredIdCombos[o]?"setDeclaredId: combo exists for type '"+t+"'":(this.declaredIdCombos[o]=!0,this.declaredId[t]={dpid:i,dpuuid:r},"setDeclaredId: succeeded for type '"+t+"'")}return"setDeclaredId: failed for type '"+t+"'"},getDeclaredIdQueryString:function(){var e=this.declaredId.request,t=this.declaredId.init,n=encodeURIComponent,s="";return null!==e?s="&d_dpid="+n(e.dpid)+"&d_dpuuid="+n(e.dpuuid):null!==t&&(s="&d_dpid="+n(t.dpid)+"&d_dpuuid="+n(t.dpuuid)),s}},registerRequest:function(e){var t,n=this.firingQueue;e===Object(e)&&(n.push(e),e.isDefaultRequest||(p=!0)),this.firing||!n.length||i&&!DIL.windowLoaded||(this.adms.isOptedOutCallbackCalled||this.adms.getIsOptedOut(),this.adms.calledBack&&!this.adms.isOptedOut&&this.adms.isOptedOutCallbackCalled&&(N.isApproved()||B.hasGoSignal())&&(this.adms.isOptedOutCallbackCalled=!1,(t=n.shift()).src=t.src.replace(/&d_nsid=/,"&"+this.adms.getMIDQueryString()+B.getQueryString()+"d_nsid="),k.isPopulatedString(t.corsPostData)&&(t.corsPostData=t.corsPostData.replace(/^d_nsid=/,this.adms.getMIDQueryString()+B.getQueryString()+"d_nsid=")),V.fireRequest(t),this.firstRequestHasFired||"script"!==t.tag&&"cors"!==t.tag||(this.firstRequestHasFired=!0)))},processVisitorAPI:function(){this.adms.process(b||window.Visitor)},getCoopQueryString:function(){var e="";return!0===d?e="&d_coop_safe=1":!1===d&&(e="&d_coop_unsafe=1"),e}};C.requestController=A;var q,j,T={sendingMessages:!1,messages:[],messagesPosted:[],destinations:[],destinationsPosted:[],jsonForComparison:[],jsonDuplicates:[],jsonWaiting:[],jsonProcessed:[],publishDestinationsVersion:null,requestToProcess:function(e,t){var n,s=this;function i(){s.jsonForComparison.push(e),s.jsonWaiting.push([e,t])}if(e&&!k.isEmptyObject(e))if(n=JSON.stringify(e.dests||[]),this.jsonForComparison.length){var r,o,a,d=!1;for(r=0,o=this.jsonForComparison.length;r<o;r++)if(a=this.jsonForComparison[r],n===JSON.stringify(a.dests||[])){d=!0;break}d?this.jsonDuplicates.push(e):i()}else i();if(this.jsonWaiting.length){var u=this.jsonWaiting.shift();this.process(u[0],u[1]),this.requestToProcess()}this.messages.length&&!this.sendingMessages&&this.sendMessages()},process:function(e){if(f){var t,n,s,i,r,o,a=encodeURIComponent,d=this.getPublishDestinationsVersion(),u=!1;if(-1!==d){if((t=e.dests)&&t instanceof Array&&(n=t.length)){for(s=0;s<n;s++)i=t[s],o=[a("dests"),a(i.id||""),a(i.y||""),a(i.c||"")].join("|"),this.addMessage(o),r={url:i.c,hideReferrer:void 0===i.hr||!!i.hr,message:o},this.addDestination(r),void 0!==i.hr&&(u=!0);1===d&&u&&R.logOnce("Warning: visitorInstance.publishDestinations version is old (Visitor v3.3.0 to v4.0.0). URL destinations will not have the option of being fired on page, only in the iframe.")}this.jsonProcessed.push(e)}}},addMessage:function(e){this.messages.push(e)},addDestination:function(e){this.destinations.push(e)},sendMessages:function(){this.sendingMessages||(this.sendingMessages=!0,f&&this.messages.length&&this.publishDestinations())},publishDestinations:function(){var t=this,e=A.adms.instance,n=[],s=[],i=function(e){R.log("visitor.publishDestinations() result: "+(e.error||e.message)),t.sendingMessages=!1,t.requestToProcess()},r=function(){t.messages=[],t.destinations=[]};return 1===this.publishDestinationsVersion?(x.extendArray(n,this.messages),x.extendArray(this.messagesPosted,this.messages),r(),e.publishDestinations(I,n,i),"Called visitor.publishDestinations() version 1"):1<this.publishDestinationsVersion?(x.extendArray(s,this.destinations),x.extendArray(this.destinationsPosted,this.destinations),r(),e.publishDestinations({subdomain:I,callback:i,urlDestinations:s}),"Called visitor.publishDestinations() version > 1"):void 0},getPublishDestinationsVersion:function(){if(null!==this.publishDestinationsVersion)return this.publishDestinationsVersion;var e=A.adms.instance,n=-1;return e.publishDestinations(null,null,function(e){if(e===Object(e)){var t=e.error;"subdomain is not a populated string."===t?n=1:"Invalid parameters passed."===t&&(n=2)}}),this.publishDestinationsVersion=n}},M={traits:function(e){return k.isValidPdata(e)&&(L.sids instanceof Array||(L.sids=[]),x.extendArray(L.sids,e)),this},pixels:function(e){return k.isValidPdata(e)&&(L.pdata instanceof Array||(L.pdata=[]),x.extendArray(L.pdata,e)),this},logs:function(e){return k.isValidLogdata(e)&&(L.logdata!==Object(L.logdata)&&(L.logdata={}),x.extendObject(L.logdata,e)),this},customQueryParams:function(e){return k.isEmptyObject(e)||x.extendObject(L,e,A.reservedKeys),this},signals:function(e,t){var n,s=e;if(!k.isEmptyObject(s)){if(t&&"string"==typeof t)for(n in s={},e)e.hasOwnProperty(n)&&(s[t+n]=e[n]);x.extendObject(L,s,A.reservedKeys)}return this},declaredId:function(e){return A.declaredId.setDeclaredId(e,"request"),this},result:function(e){return"function"==typeof e&&(L.callback=e),this},afterResult:function(e){return"function"==typeof e&&(L.postCallbackFn=e),this},useImageRequest:function(){return L.useImageRequest=!0,this},clearData:function(){return L={},this},submit:function(e){return L.isDefaultRequest=!!e,V.submitRequest(L),L={},this},getPartner:function(){return I},getContainerNSID:function(){return r},getEventLog:function(){return O},getState:function(){var e={},t={};return x.extendObject(e,A,{registerRequest:!0}),x.extendObject(t,T,{requestToProcess:!0,process:!0,sendMessages:!0}),{initConfig:n,pendingRequest:L,otherRequestInfo:e,destinationPublishingInfo:t,log:O}},idSync:function(){throw new Error("Please use the `idSyncByURL` method of the Experience Cloud ID Service (Visitor) instance")},aamIdSync:function(){throw new Error("Please use the `idSyncByDataSource` method of the Experience Cloud ID Service (Visitor) instance")},passData:function(e){return k.isEmptyObject(e)?"Error: json is empty or not an object":(V.defaultCallback(e),e)},getPlatformParams:function(){return A.platformParams},getEventCallConfigParams:function(){var e,t=A,n=t.modStatsParams,s=t.platformParams;if(!n){for(e in n={},s)s.hasOwnProperty(e)&&!t.nonModStatsParams[e]&&(n[e.replace(/^d_/,"")]=s[e]);!0===d?n.coop_safe=1:!1===d&&(n.coop_unsafe=1),t.modStatsParams=n}return n},setAsCoopSafe:function(){return d=!0,this},setAsCoopUnsafe:function(){return d=!1,this},getEventCallIabSignals:function(e){var t;return e!==Object(e)?"Error: config is not an object":"function"!=typeof e.callback?"Error: config.callback is not a function":(t=parseInt(e.timeout,10),isNaN(t)&&(t=null),void B.getQueryStringObject(e.callback,t))}},V={corsMetadata:(q="none","undefined"!=typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&"withCredentials"in new XMLHttpRequest&&(q="XMLHttpRequest"),{corsType:q}),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new window[this.corsMetadata.corsType]},submitRequest:function(e){return A.registerRequest(V.createQueuedRequest(e)),!0},createQueuedRequest:function(e){var t,n,s,i,r,o=e.callback,a="img",d=e.isDefaultRequest;if(delete e.isDefaultRequest,!k.isEmptyObject(u))for(s in u)if(u.hasOwnProperty(s)){if(null==(i=u[s])||""===i)continue;if(s in e&&!(i in e)&&!(i in A.reservedKeys)){if(null==(r=e[s])||""===r)continue;e[i]=r}}return k.isValidPdata(e.sids)||(e.sids=[]),k.isValidPdata(e.pdata)||(e.pdata=[]),k.isValidLogdata(e.logdata)||(e.logdata={}),e.logdataArray=x.convertObjectToKeyValuePairs(e.logdata,"=",!0),e.logdataArray.push("_ts="+(new Date).getTime()),"function"!=typeof o&&(o=this.defaultCallback),t=this.makeRequestSrcData(e),(n=this.getCORSInstance())&&!0!==e.useImageRequest&&(a="cors"),{tag:a,src:t.src,corsSrc:t.corsSrc,callbackFn:o,postCallbackFn:e.postCallbackFn,useImageRequest:!!e.useImageRequest,requestData:e,corsInstance:n,corsPostData:t.corsPostData,isDefaultRequest:d}},defaultCallback:function(e,t){var n,s,i,r,o,a,d,u,c;if(g&&(n=e.stuff)&&n instanceof Array&&(s=n.length))for(i=0;i<s;i++)(r=n[i])&&r===Object(r)&&(o=r.cn,a=r.cv,void 0!==(d=r.ttl)&&""!==d||(d=Math.floor(x.getMaxCookieExpiresInMinutes()/60/24)),u=r.dmn||"."+document.domain.replace(/^www\./,""),c=r.type,o&&(a||"number"==typeof a)&&("var"!==c&&(d=parseInt(d,10))&&!isNaN(d)&&x.setCookie(o,a,24*d*60,"/",u,!1),P.stuffed[o]=a));var l,f,p=e.uuid;k.isPopulatedString(p)&&(k.isEmptyObject(h)||("string"==typeof(l=h.path)&&l.length||(l="/"),f=parseInt(h.days,10),isNaN(f)&&(f=100),x.setCookie(h.name||"aam_did",p,24*f*60,l,h.domain||"."+document.domain.replace(/^www\./,""),!0===h.secure))),A.abortRequests||T.requestToProcess(e,t)},makeRequestSrcData:function(r){r.sids=k.removeEmptyArrayValues(r.sids||[]),r.pdata=k.removeEmptyArrayValues(r.pdata||[]);var o=A,e=o.platformParams,t=x.encodeAndBuildRequest(r.sids,","),n=x.encodeAndBuildRequest(r.pdata,","),s=(r.logdataArray||[]).join("&");delete r.logdataArray;var i,a,d=encodeURIComponent,u=E.IS_HTTPS?"https://":"http://",c=o.declaredId.getDeclaredIdQueryString(),l=o.adms.instance?o.adms.getCustomerIDsQueryString(o.adms.getCustomerIDs()):"",f=function(){var e,t,n,s,i=[];for(e in r)if(!(e in o.reservedKeys)&&r.hasOwnProperty(e))if(t=r[e],e=d(e),t instanceof Array)for(n=0,s=t.length;n<s;n++)i.push(e+"="+d(t[n]));else i.push(e+"="+d(t));return i.length?"&"+i.join("&"):""}(),p="d_dil_ver="+d(DIL.version),h="d_nsid="+e.d_nsid+o.getCoopQueryString()+c+l+(t.length?"&d_sid="+t:"")+(n.length?"&d_px="+n:"")+(s.length?"&d_ld="+d(s):""),g="&d_rtbd="+e.d_rtbd+"&d_jsonv="+e.d_jsonv+"&d_dst="+e.d_dst,m=y?"&h_referer="+d(location.href):"";return a=(i=u+I+".demdex.net/event")+"?"+p+"&"+h+g+f+m,{corsSrc:i+"?"+p+"&_ts="+(new Date).getTime(),src:a,corsPostData:h+g+f+m,isDeclaredIdCall:""!==c}},fireRequest:function(e){if("img"===e.tag)this.fireImage(e);else{var t=A.declaredId,n=t.declaredId.request||t.declaredId.init||{},s={dpid:n.dpid||"",dpuuid:n.dpuuid||""};this.fireCORS(e,s)}},fireImage:function(t){var e,n,s=A;s.abortRequests||(s.firing=!0,e=new Image(0,0),s.sent.push(t),e.onload=function(){s.firing=!1,s.fired.push(t),s.num_of_img_responses++,s.registerRequest()},n=function(e){c="imgAbortOrErrorHandler received the event of type "+e.type,R.log(c),s.abortRequests=!0,s.firing=!1,s.errored.push(t),s.num_of_img_errors++,s.registerRequest()},e.addEventListener("error",n),e.addEventListener("abort",n),e.src=t.src)},fireCORS:function(s,i){var r=this,o=A,e=this.corsMetadata.corsType,t=s.corsSrc,n=s.corsInstance,a=s.corsPostData,d=s.postCallbackFn,u="function"==typeof d;if(!o.abortRequests&&!v){o.firing=!0;try{n.open("post",t,!0),"XMLHttpRequest"===e&&(n.withCredentials=!0,n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.onreadystatechange=function(){4===this.readyState&&200===this.status&&function(e){var t;try{if((t=JSON.parse(e))!==Object(t))return r.handleCORSError(s,i,"Response is not JSON")}catch(e){return r.handleCORSError(s,i,"Error parsing response as JSON")}try{var n=s.callbackFn;o.firing=!1,o.fired.push(s),o.num_of_cors_responses++,n(t,i),u&&d(t,i)}catch(e){e.message="DIL handleCORSResponse caught error with message "+e.message,c=e.message,R.log(c),e.filename=e.filename||"dil.js",e.partner=I,DIL.errorModule.handleError(e);try{n({error:e.name+"|"+e.message},i),u&&d({error:e.name+"|"+e.message},i)}catch(e){}}finally{o.registerRequest()}}(this.responseText)}),n.onerror=function(){r.handleCORSError(s,i,"onerror")},n.ontimeout=function(){r.handleCORSError(s,i,"ontimeout")},n.send(a)}catch(e){this.handleCORSError(s,i,"try-catch")}o.sent.push(s),o.declaredId.declaredId.request=null}},handleCORSError:function(e,t,n){A.num_of_cors_errors++,A.corsErrorSources.push(n)}},k={isValidPdata:function(e){return!!(e instanceof Array&&this.removeEmptyArrayValues(e).length)},isValidLogdata:function(e){return!this.isEmptyObject(e)},isEmptyObject:function(e){if(e!==Object(e))return!0;var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0},removeEmptyArrayValues:function(e){var t,n=0,s=e.length,i=[];for(n=0;n<s;n++)null!=(t=e[n])&&""!==t&&i.push(t);return i},isPopulatedString:function(e){return"string"==typeof e&&e.length}},x={convertObjectToKeyValuePairs:function(e,t,n){var s,i,r=[];for(s in t||(t="="),e)e.hasOwnProperty(s)&&null!=(i=e[s])&&""!==i&&r.push(s+t+(n?encodeURIComponent(i):i));return r},encodeAndBuildRequest:function(e,t){return e.map(function(e){return encodeURIComponent(e)}).join(t)},getCookie:function(e){var t,n,s,i=e+"=",r=document.cookie.split(";");for(t=0,n=r.length;t<n;t++){for(s=r[t];" "===s.charAt(0);)s=s.substring(1,s.length);if(0===s.indexOf(i))return decodeURIComponent(s.substring(i.length,s.length))}return null},setCookie:function(e,t,n,s,i,r){var o=new Date;n&&(n=1e3*n*60),document.cookie=e+"="+encodeURIComponent(t)+(n?";expires="+new Date(o.getTime()+n).toUTCString():"")+(s?";path="+s:"")+(i?";domain="+i:"")+(r?";secure":"")},extendArray:function(e,t){return e instanceof Array&&t instanceof Array&&(Array.prototype.push.apply(e,t),!0)},extendObject:function(e,t,n){var s;if(e!==Object(e)||t!==Object(t))return!1;for(s in t)if(t.hasOwnProperty(s)){if(!k.isEmptyObject(n)&&s in n)continue;e[s]=t[s]}return!0},getMaxCookieExpiresInMinutes:function(){return E.SIX_MONTHS_IN_MINUTES},replaceMethodsWithFunction:function(e,t){var n;if(e===Object(e)&&"function"==typeof t)for(n in e)e.hasOwnProperty(n)&&"function"==typeof e[n]&&(e[n]=t)}},N=(j=C.requestController,{exists:null,instance:null,aamIsApproved:null,init:function(){var e=this;this.checkIfExists()?(this.exists=!0,this.instance=window.adobe.optIn,this.instance.fetchPermissions(function(){e.callback()},!0)):this.exists=!1},checkIfExists:function(){return window.adobe===Object(window.adobe)&&window.adobe.optIn===Object(window.adobe.optIn)},callback:function(){this.aamIsApproved=this.instance.isApproved([this.instance.Categories.AAM]),j.adms.waitForMidToReleaseRequests(),j.adms.getIsOptedOut()},isApproved:function(){return!this.isIabContext()&&!j.adms.isOptedOut&&(!this.exists||this.aamIsApproved)},isIabContext:function(){return this.instance&&this.instance.isIabContext}});C.optIn=N;var F,Q,H,U,B=(Q=(F=C).requestController,H=F.optIn,U={isVendorConsented:null,doesGdprApply:null,consentString:null,queryStringObjectCallbacks:[],init:function(){this.fetchConsentData()},hasGoSignal:function(){return!(!(H.isIabContext()&&this.isVendorConsented&&this.doesGdprApply&&"string"==typeof this.consentString&&this.consentString.length)||Q.adms.isOptedOut)},fetchConsentData:function(n,e){var s=this,t={};"function"!=typeof n&&(n=function(){}),H.instance&&H.isIabContext()?(e&&(t.timeout=e),H.instance.execute({command:"iabPlugin.fetchConsentData",params:t,callback:function(e,t){t===Object(t)?(s.doesGdprApply=!!t.gdprApplies,s.consentString=t.consentString||""):(s.doesGdprApply=!1,s.consentString=""),s.isVendorConsented=H.instance.isApproved(H.instance.Categories.AAM),e?n({}):s.checkQueryStringObject(n),Q.adms.waitForMidToReleaseRequests()}})):n({})},getQueryString:function(){return H.isIabContext()?"gdpr="+(this.doesGdprApply?1:0)+"&gdpr_consent="+this.consentString+"&":""},getQueryStringObject:function(e,t){this.fetchConsentData(e,t)},checkQueryStringObject:function(e){U.hasGoSignal()&&"function"==typeof e&&e({gdpr:this.doesGdprApply?1:0,gdpr_consent:this.consentString})}});C.iab=B,"error"===I&&0===r&&window.addEventListener("load",function(){DIL.windowLoaded=!0});var G=!1,W=function(){G||(G=!0,A.registerRequest(),X())},X=function(){setTimeout(function(){p||A.firstRequestHasFired||("function"==typeof m?M.afterResult(m).submit(!0):M.submit(!0))},DIL.constants.TIME_TO_DEFAULT_REQUEST)},K=document;"error"!==I&&(DIL.windowLoaded?W():"complete"!==K.readyState&&"loaded"!==K.readyState?window.addEventListener("load",function(){DIL.windowLoaded=!0,W()}):(DIL.windowLoaded=!0,W())),A.declaredId.setDeclaredId(s,"init"),N.init(),B.init(),A.processVisitorAPI();E.IS_IE_LESS_THAN_10&&x.replaceMethodsWithFunction(M,function(){return this}),this.api=M,this.getStuffedVariable=function(e){var t=P.stuffed[e];return t||"number"==typeof t||(t=x.getCookie(e))||"number"==typeof t||(t=""),t},this.validators=k,this.helpers=x,this.constants=E,this.log=O,this.pendingRequest=L,this.requestController=A,this.destinationPublishing=T,this.requestProcs=V,this.units=C,this.initConfig=n,this.logger=R,w&&(this.variables=P,this.callWindowLoadFunctions=W)},DIL.extendStaticPropertiesAndMethods=function(e){var t;if(e===Object(e))for(t in e)e.hasOwnProperty(t)&&(this[t]=e[t])},DIL.extendStaticPropertiesAndMethods({version:"9.3",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:500},variables:{scriptNodeList:document.getElementsByTagName("script")},windowLoaded:!1,dils:{},isAddedPostWindowLoad:function(){var e=arguments[0];this.windowLoaded="function"==typeof e?!!e():"boolean"!=typeof e||e},create:function(e){try{return new DIL(e)}catch(e){throw new Error("Error in attempt to create DIL instance with DIL.create(): "+e.message)}},registerDil:function(e,t,n){var s=t+"$"+n;s in this.dils||(this.dils[s]=e)},getDil:function(e,t){var n;return"string"!=typeof e&&(e=""),t||(t=0),(n=e+"$"+t)in this.dils?this.dils[n]:new Error("The DIL instance with partner = "+e+" and containerNSID = "+t+" was not found")},dexGetQSVars:function(e,t,n){var s=this.getDil(t,n);return s instanceof this?s.getStuffedVariable(e):""}}),DIL.errorModule=(r=DIL.create({partner:"error",containerNSID:0,ignoreHardDependencyOnVisitorAPI:!0}),a=!(o={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020}),{activate:function(){a=!0},handleError:function(e){if(!a)return"DIL error module has not been activated";e!==Object(e)&&(e={});var t=e.name?(e.name+"").toLowerCase():"",n=t in o?o[t]:o.noerrortypedefined,s=[],i={name:t,filename:e.filename?e.filename+"":"",partner:e.partner?e.partner+"":"no_partner",site:e.site?e.site+"":document.location.href,message:e.message?e.message+"":""};return s.push(n),r.api.pixels(s).logs(i).useImageRequest().submit(),"DIL error report sent"},pixelMap:o}),DIL.tools={},DIL.modules={helpers:{}})}();

            /*
            Start ActivityMap Module

            The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
            allows you to view data overlays on your links and content to understand how
            users engage with your web site. If you do not intend to use ActivityMap, you
            can remove the following block of code from your AppMeasurement.js file.
            Additional documentation on how to configure ActivityMap is available at:
            https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
            */
            function AppMeasurement_Module_ActivityMap(h){function q(){var a=f.pageYOffset+(f.innerHeight||0);a&&a>+g&&(g=a)}function r(){if(e.scrollReachSelector){var a=h.d.querySelector&&h.d.querySelector(e.scrollReachSelector);a?(g=a.scrollTop||0,a.addEventListener("scroll",function(){var d;(d=a&&a.scrollTop+a.clientHeight||0)>g&&(g=d)})):0<w--&&setTimeout(r,1E3)}}function l(a,d){var c,b,n;if(a&&d&&(c=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<c.length&&(b=c[n++]);)if(-1<a.indexOf(b))return null;p=1;return a}
            function s(a,d,c,b,e){var f,k;if(a.dataset&&(k=a.dataset[d]))f=k;else if(a.getAttribute)if(k=a.getAttribute("data-"+c))f=k;else if(k=a.getAttribute(c))f=k;if(!f&&h.useForcedLinkTracking&&e){var g;a=a.onclick?""+a.onclick:"";varValue="";if(b&&a&&(d=a.indexOf(b),0<=d)){for(d+=b.length;d<a.length;)if(c=a.charAt(d++),0<="'\"".indexOf(c)){g=c;break}for(k=!1;d<a.length&&g;){c=a.charAt(d);if(!k&&c===g)break;"\\"===c?k=!0:(varValue+=c,k=!1);d++}}(g=varValue)&&(h.w[b]=g)}return f||e&&h.w[b]}function t(a,d,
            c){var b;return(b=e[d](a,c))&&(p?(p=0,b):l(m(b),e[d+"Exclusions"]))}function u(a,d,c){var b;if(a&&!(1===(b=a.nodeType)&&(b=a.nodeName)&&(b=b.toUpperCase())&&x[b])&&(1===a.nodeType&&(b=a.nodeValue)&&(d[d.length]=b),c.a||c.t||c.s||!a.getAttribute||((b=a.getAttribute("alt"))?c.a=b:(b=a.getAttribute("title"))?c.t=b:"IMG"==(""+a.nodeName).toUpperCase()&&(b=a.getAttribute("src")||a.src)&&(c.s=b)),(b=a.childNodes)&&b.length))for(a=0;a<b.length;a++)u(b[a],d,c)}function m(a){if(null==a||void 0==a)return a;
            try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=h;var f=window;f.s_c_in||(f.s_c_il=[],f.s_c_in=0);e._il=f.s_c_il;e._in=f.s_c_in;e._il[e._in]=e;f.s_c_in++;
            e._c="s_m";var g=0,v,w=60;e.c={};var p=0,x={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,c,b=h.contextData,e=h.linkObject;(a=h.pageName||h.pageURL)&&(d=t(e,"link",h.linkName))&&(c=t(e,"region"))&&(b["a.activitymap.page"]=a.substring(0,255),b["a.activitymap.link"]=128<d.length?d.substring(0,128):d,b["a.activitymap.region"]=127<c.length?c.substring(0,127):c,0<g&&(b["a.activitymap.xy"]=10*Math.floor(g/10)),b["a.activitymap.pageIDType"]=h.pageName?1:0)};e.e=function(){e.trackScrollReach&&
            !v&&(e.scrollReachSelector?r():(q(),f.addEventListener&&f.addEventListener("scroll",q,!1)),v=!0)};e.link=function(a,d){var c;if(d)c=l(m(d),e.linkExclusions);else if((c=a)&&!(c=s(a,"sObjectId","s-object-id","s_objectID",1))){var b,f;(f=l(m(a.innerText||a.textContent),e.linkExclusions))||(u(a,b=[],c={a:void 0,t:void 0,s:void 0}),(f=l(m(b.join(""))))||(f=l(m(c.a?c.a:c.t?c.t:c.s?c.s:void 0)))||!(b=(b=a.tagName)&&b.toUpperCase?b.toUpperCase():"")||("INPUT"==b||"SUBMIT"==b&&a.value?f=l(m(a.value)):"IMAGE"==
            b&&a.src&&(f=l(m(a.src)))));c=f}return c};e.region=function(a){for(var d,c=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=s(a,c,c,c))return d;if("BODY"==a.nodeName)return"BODY"}}}
            /* End ActivityMap Module */
            /*
         ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

        AppMeasurement for JavaScript version: 2.16.0
        Copyright 1996-2016 Adobe, Inc. All Rights Reserved
        More info available at http://www.adobe.com/marketing-cloud.html
        */
        function AppMeasurement(r){var a=this;a.version="2.16.0";var h=window;h.s_c_in||(h.s_c_il=[],h.s_c_in=0);a._il=h.s_c_il;a._in=h.s_c_in;a._il[a._in]=a;h.s_c_in++;a._c="s_c";var q=h.AppMeasurement.fc;q||(q=null);var p=h,m,s;try{for(m=p.parent,s=p.location;m&&m.location&&s&&""+m.location!=""+s&&p.location&&""+m.location!=""+p.location&&m.location.host==s.host;)p=m,m=p.parent}catch(u){}a.C=function(a){try{console.log(a)}catch(b){}};a.Ra=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
            0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.Lb=function(){var c=h.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ka&&!/^[0-9.]+$/.test(c)&&
            (b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ka=0<d?c.substring(d):c}return a.Ka};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.Lb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
            (d=new Date,d.setTime(d.getTime()+1E3*g)):1===d&&(d=new Date,g=d.getYear(),d.setYear(g+2+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toUTCString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.Ib=function(){var c=a.Util.getIeVersion();"number"===typeof c&&10>c&&(a.unsupportedBrowser=!0,a.vb(a,function(){}))};a.vb=function(a,b){for(var d in a)a.hasOwnProperty(d)&&"function"===typeof a[d]&&(a[d]=b)};
            a.K=[];a.da=function(c,b,d){if(a.La)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,k=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ea)for(a.ea=1,d=0;d<k.length;d++)a.d.addEventListener(k[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ea=0,a.delayReady())});f=1;e=0}else d||a.u("_d")&&(f=1);f&&(a.K.push({m:c,a:b,t:e}),a.ea||setTimeout(a.delayReady,
            a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.u("_d")?b=1:a.ya();0<a.K.length;){d=a.K.shift();if(b&&!d.t&&d.t>c){a.K.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.La=1;a[d.m].apply(a,d.a);a.La=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.da("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=
            c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,k="";e=f="";if(a.lightProfileID)d=a.O,(k=a.lightTrackVars)&&(k=","+k+","+a.ja.join(",")+",");else{d=a.g;if(a.pe||a.linkType)k=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(k=a[e].bc,f=a[e].ac));k&&(k=","+k+","+a.F.join(",")+",");f&&k&&(k+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!k||0<=k.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.o=function(c,
            b,d,f,e){var g="",k,l,h,n,m=0;"contextData"==c&&(c="c");if(b){for(k in b)if(!(Object.prototype[k]||e&&k.substring(0,e.length)!=e)&&b[k]&&(!d||0<=d.indexOf(","+(f?f+".":"")+k+","))){h=!1;if(m)for(l=0;l<m.length;l++)if(k.substring(0,m[l].length)==m[l]){h=!0;break}if(!h&&(""==g&&(g+="&"+c+"."),l=b[k],e&&(k=k.substring(e.length)),0<k.length))if(h=k.indexOf("."),0<h)l=k.substring(0,h),h=(e?e:"")+l+".",m||(m=[]),m.push(h),g+=a.o(l,b,d,f,h);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==
            f&&0>e.indexOf(".contextData."))switch(h=k.substring(0,4),n=k.substring(4),k){case "transactionID":k="xact";break;case "channel":k="ch";break;case "campaign":k="v0";break;default:a.Ra(n)&&("prop"==h?k="c"+n:"eVar"==h?k="v"+n:"list"==h?k="l"+n:"hier"==h&&(k="h"+n,l=l.substring(0,255)))}g+="&"+a.escape(k)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.Ob=function(){var c="",b,d,f,e,g,k,l,h,n="",m="",p=e="",r=a.T();if(a.lightProfileID)b=a.O,(n=a.lightTrackVars)&&(n=","+n+","+a.ja.join(",")+
            ",");else{b=a.g;if(a.pe||a.linkType)n=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].bc,m=a[e].ac));n&&(n=","+n+","+a.F.join(",")+",");m&&(m=","+m+",",n&&(n+=",events,"));a.events2&&(p+=(""!=p?",":"")+a.events2)}if(r&&a.wa()&&r.getCustomerIDs){e=q;if(g=r.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.o("cid",e))}a.AudienceManagement&&
            a.AudienceManagement.isReady()&&(c+=a.o("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);k=e.substring(4);g||("events"==e&&p?(g=p,p=""):"marketingCloudOrgID"==e&&r&&a.V("ECID")&&(g=r.marketingCloudOrgID));if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e=
            "D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&
            a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;
            case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":p&&(g+=(""!=g?",":"")+p);if(m)for(k=g.split(","),g="",f=0;f<k.length;f++)l=k[f],h=l.indexOf("="),0<=h&&(l=l.substring(0,h)),h=l.indexOf(":"),0<=h&&(l=l.substring(0,h)),0<=m.indexOf(","+l+",")&&(g+=
            (g?",":"")+k[f]);break;case "events2":g="";break;case "contextData":c+=a.o("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.o("mts",a[e],n,e));g="";break;default:a.Ra(k)&&("prop"==f?e="c"+k:"eVar"==f?e="v"+k:"list"==
            f?e="l"+k:"hier"==f&&(e="h"+k,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}a.ia&&(c+="&lrt="+a.ia,a.ia=null);return c};a.B=function(a){var b=a.tagName;if("undefined"!=""+a.ic||"undefined"!=""+a.Xb&&"HTML"!=(""+a.Xb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Na=function(a){var b=h.location,
            d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.L=function(c){var b=a.B(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+
            f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Na(c),e)?{id:e.substring(0,100),type:g}:0};a.gc=function(c){for(var b=a.B(c),d=a.L(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.B(c),d=a.L(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Wb=function(){var c,b,d=a.linkObject,
            f=a.linkType,e=a.linkURL,g,k;a.ka=1;d||(a.ka=0,d=a.clickObject);if(d){c=a.B(d);for(b=a.L(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.B(d),b=a.L(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.ka=1;!e&&d&&(e=a.Na(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,n=0,p;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),
            g=l.indexOf("?"),k=l.indexOf("#"),0<=g?0<=k&&k<g&&(g=k):g=k,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),k=0;k<g.length;k++)(p=g[k])&&l.substring(l.length-(p.length+1))=="."+p&&(f="d");if(a.trackExternalLinks&&!f&&(l=e.toLowerCase(),a.Qa(l)&&(a.linkInternalFilters||(a.linkInternalFilters=h.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(k=
            0;k<g.length;k++)p=g[k],0<=l.indexOf(p)&&(n=1);n?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),h.s_objectID&&(b.id=h.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Pb=function(){var c=a.ka,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||
            f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.Sb()){var b={},d=0,e=a.qb(),g=e?e.split("&"):0,k,l,h,e=0;if(g)for(k=0;k<g.length;k++)l=g[k].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");k={};for(h in a.contextData)h&&!Object.prototype[h]&&"a.activitymap."==h.substring(0,14)&&(k[h]=a.contextData[h],a.contextData[h]="");a.e=a.o("c",k)+
            (a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(h=0;h<f.length;h++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),k=0;k<b[l].length;k++)g=b[l][k],g==f[h]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(k,1),d=1);c||(d=1);if(d){e="";k=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),k=1);for(l in b)!Object.prototype[l]&&0<k&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),
            k--);a.xb(e)}}}return c};a.qb=function(){if(a.useLinkTrackSessionStorage){if(a.Da())return h.sessionStorage.getItem(a.P)}else return a.cookieRead(a.P)};a.Da=function(){return h.sessionStorage?!0:!1};a.xb=function(c){a.useLinkTrackSessionStorage?a.Da()&&h.sessionStorage.setItem(a.P,c):a.cookieWrite(a.P,c)};a.Qb=function(){if(!a.$b){var c=new Date,b=p.location,d,f,e=f=d="",g="",k="",l="1.2",h=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",q="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&(l="1.5",c=[],c.forEach))){l=
            "1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;k=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.hc(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),
            q=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=h;a.browserWidth=g;a.browserHeight=k;a.connectionType=q;a.homepage=m;a.$b=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=h["AppMeasurement_Module_"+c]?new h["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.kb=function(){return d.tb};d.yb=function(b){if(d.tb=b)a[c+"_onLoad"]=b,a.da(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",
            {get:d.kb,set:d.yb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.da(c+"_onLoad",[a,d],1)||b(a,d))};a.u=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Sb=function(){return a.ActivityMap&&a.ActivityMap._c?!0:!1};a.Tb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);
            if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.S=function(c,b){var d,f,e,g,k,h,m;m={};for(d=0;2>d;d++)for(f=0<d?a.Ga:a.g,e=0;e<f.length;e++)if(g=f[e],(k=c[g])||c["!"+g]){if(k&&!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(h in a[g])k[h]||(k[h]=a[g][h]);a[g]||(m["!"+g]=1);m[g]=a[g];a[g]=k}return m};a.ec=function(c){var b,d,f,e;for(b=0;2>b;b++)for(d=0<b?a.Ga:a.g,f=0;f<d.length;f++)e=d[f],c[e]=a[e],c[e]||"prop"!==e.substring(0,4)&&
            "eVar"!==e.substring(0,4)&&"hier"!==e.substring(0,4)&&"list"!==e.substring(0,4)&&"channel"!==e&&"events"!==e&&"eventList"!==e&&"products"!==e&&"productList"!==e&&"purchaseID"!==e&&"transactionID"!==e&&"state"!==e&&"zip"!==e&&"campaign"!==e&&"events2"!==e&&"latitude"!==e&&"longitude"!==e&&"ms_a"!==e&&"contextData"!==e&&"supplementalDataID"!==e&&"tnt"!==e&&"timestamp"!==e&&"abort"!==e&&"useBeacon"!==e&&"linkObject"!==e&&"clickObject"!==e&&"linkType"!==e&&"linkName"!==e&&"linkURL"!==e&&"bodyClickTarget"!==
            e&&"bodyClickFunction"!==e||(c["!"+e]=1)};a.Kb=function(a){var b,d,f,e,g,k=0,h,m="",n="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(h=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?k=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(k=",p,ei,"),k&&h)))){if((a=h.split("&"))&&1<a.length){for(f=0;f<
            a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=k.indexOf(","+e.substring(0,d)+",")?m+=(m?"&":"")+e:n+=(n?"&":"")+e;m&&n?h=m+"&"+n:n=""}d=253-(h.length-n.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+h}return a};a.eb=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});
            return!1}return!0};a.aa=!1;a.H=!1;a.Ab=function(){a.H=!0;a.p()};a.I=!1;a.Fa=!1;a.Ba=function(){var c=a.T();!a.I&&c&&c.getVisitorValues&&(a.Fa=!0,a.I=!0,c.getVisitorValues(a.Bb))};a.Bb=function(c){a.marketingCloudVisitorID=c.MCMID;a.visitorOptedOut=c.MCOPTOUT;a.analyticsVisitorID=c.MCAID;a.audienceManagerLocationHint=c.MCAAMLH;a.audienceManagerBlob=c.MCAAMB;a.I=!1;a.p()};a.cb=function(c){a.maxDelay||(a.maxDelay=250);return a.u("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.Y=!1;a.G=!1;
            a.ya=function(){a.G=!0;a.p()};a.isReadyToTrack=function(){var c=!0;if(!a.ob()||!a.mb())return!1;a.wa()||(c=!1);a.sb()||(c=!1);return c};a.ob=function(){a.aa||a.H||(a.eb(a.Ab)?a.H=!0:a.aa=!0);return a.aa&&!a.H?!1:!0};a.mb=function(){var c=a.ua();if(c)if(a.qa||a.Z)if(a.qa){if(!c.isApproved(c.Categories.ANALYTICS))return!1}else return!1;else return c.fetchPermissions(a.ub,!0),a.Z=!0,!1;return!0};a.V=function(c){var b=a.ua();return b&&!b.isApproved(b.Categories[c])?!1:!0};a.ua=function(){return h.adobe&&
            h.adobe.optIn?h.adobe.optIn:null};a.wa=function(){a.Fa||a.Ba();return!a.I};a.T=function(){var c=a.visitor;c&&!c.isAllowed()&&(c=null);return c};a.sb=function(){a.Y||a.G||(a.cb(a.ya)?a.G=!0:a.Y=!0);return a.Y&&!a.G?!1:!0};a.Z=!1;a.ub=function(){a.Z=!1;a.qa=!0};a.j=q;a.q=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.Fb=c;f.Eb=b;f.Cb=d;a.j==q&&(a.j=[]);a.j.push(f);0==a.q&&(a.q=setInterval(a.p,100))};a.p=function(){var c;if(a.isReadyToTrack()&&(a.zb(),a.j!=q))for(;0<a.j.length;)c=a.j.shift(),
            c.Eb.apply(c.Fb,c.Cb)};a.zb=function(){a.q&&(clearInterval(a.q),a.q=0)};a.ra=function(c){var b,d={};a.ec(d);if(c!=q)for(b in c)d[b]=c[b];a.callbackWhenReadyToTrack(a,a.Ea,[d]);a.Ca()};a.Mb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.Ea=function(c){var b=
            new Date,d="s"+Math.floor(b.getTime()/108E5)%10+Math.floor(1E13*Math.random()),f=b.getYear(),f="t="+a.escape(b.getDate()+"/"+b.getMonth()+"/"+(1900>f?f+1900:f)+" "+b.getHours()+":"+b.getMinutes()+":"+b.getSeconds()+" "+b.getDay()+" "+b.getTimezoneOffset()),e=a.T(),g;c&&(g=a.S(c,1));a.Tb()&&!a.visitorOptedOut&&(a.va()||(a.fid=a.Mb()),a.Wb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(b.getTime()/1E3)),c=h.location,a.pageURL||
            (a.pageURL=c.href?c.href:c),a.referrer||a.ab||(c=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=c||void 0===c?void 0===c?"":c:p.document.referrer),a.ab=1,a.referrer=a.Kb(a.referrer),a.u("_g")),a.Pb()&&!a.abort&&(e&&a.V("TARGET")&&!a.supplementalDataID&&e.getSupplementalDataID&&(a.supplementalDataID=e.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.V("AAM")||(a.contextData["cm.ssf"]=1),a.Qb(),f+=a.Ob(),a.rb(d,f),a.u("_t"),a.referrer="")));a.Ca();g&&a.S(g,
            1)};a.t=a.track=function(c,b){b&&a.S(b);a.Ba();a.isReadyToTrack()?null!=a.j&&0<a.j.length?(a.ra(c),a.p()):a.Ea(c):a.ra(c)};a.Ca=function(){a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=h.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=a.useBeacon=a.referrer=0};a.Aa=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Aa.push([c,b]):a.debugTracking&&
            a.C("DEBUG: Non function type passed to registerPreTrackCallback")};a.hb=function(c){a.ta(a.Aa,c)};a.za=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.C("DEBUG: Non function type passed to registerPostTrackCallback")};a.gb=function(c){a.ta(a.za,c)};a.ta=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1].slice();e.unshift(b);if("function"==typeof f)try{f.apply(null,
            e)}catch(g){a.debugTracking&&a.C(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.bodyClickTarget=c,a.bodyClickFunction=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==
            b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.rb=function(c,b){var d=a.ib()+"/"+c+"?AQB=1&ndh=1&pf=1&"+(a.xa()?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.hb(d);a.fb(d);a.U()};a.ib=function(){var c=a.jb();return"http"+(a.ssl?"s":"")+"://"+c+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(a.xa()?"10":"1")+"/JS-"+a.version+(a.Zb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:
            "")};a.xa=function(){return a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks};a.jb=function(){var c=a.dc,b=a.trackingServer;b?a.trackingServerSecure&&a.ssl&&(b=a.trackingServerSecure):(c=c?(""+c).toLowerCase():"d1","d1"==c?c="112":"d2"==c&&(c="122"),b=a.lb()+"."+c+".2o7.net");return b};a.lb=function(){var c=a.visitorNamespace;c||(c=a.account.split(",")[0],c=c.replace(/[^0-9a-z]/gi,""));return c};a.$a=/{(%?)(.*?)(%?)}/;a.cc=RegExp(a.$a.source,"g");a.Jb=function(c){if("object"==
            typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.cc),e=0;e<f.length;++e){var g=f[e],k=g.match(a.$a),h="";"%"==k[1]&&"timezone_offset"==k[2]?h=(new Date).getTimezoneOffset():"%"==k[1]&&"timestampz"==k[2]&&(h=a.Nb());d.c=d.c.replace(g,a.escape(h))}}};a.Nb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,
            c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.oa={};a.doPostbacks=function(c){if("object"==typeof c)if(a.Jb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&
            "object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.oa[d.id]=new Image,a.oa[d.id].alt="",a.oa[d.id].src=d.c)}};a.fb=function(c){a.i||a.Rb();a.i.push(c);a.ha=a.A();a.Ya()};a.Rb=function(){a.i=a.Ub();a.i||(a.i=[])};a.Ub=function(){var c,b;if(a.na()){try{(b=h.localStorage.getItem(a.la()))&&(c=h.JSON.parse(b))}catch(d){}return c}};a.na=function(){var c=!0;a.trackOffline&&a.offlineFilename&&
            h.localStorage&&h.JSON||(c=!1);return c};a.Oa=function(){var c=0;a.i&&(c=a.i.length);a.l&&c++;return c};a.U=function(){if(a.l&&(a.v&&a.v.complete&&a.v.D&&a.v.R(),a.l))return;a.Pa=q;if(a.ma)a.ha>a.N&&a.Wa(a.i),a.pa(500);else{var c=a.Db();if(0<c)a.pa(c);else if(c=a.Ma())a.l=1,a.Vb(c),a.Yb(c)}};a.pa=function(c){a.Pa||(c||(c=0),a.Pa=setTimeout(a.U,c))};a.Db=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.A()-a.Ua;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};
            a.Ma=function(){if(0<a.i.length)return a.i.shift()};a.Vb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.C(b)}};a.va=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.X=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.X=!0,a.W=function(a){return JSON.parse(a)}):h.$&&h.$.parseJSON?(a.W=function(a){return h.$.parseJSON(a)},a.X=!0):a.W=function(){return null};a.Yb=function(c){var b,
            d,f;a.nb(c)&&(d=1,b={send:function(c){a.useBeacon=!1;navigator.sendBeacon(c)?b.R():b.fa()}});!b&&a.va()&&4047<c.length&&(a.bb()&&(d=2,b=new XMLHttpRequest),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.X?b.Ha=!0:b=0));!b&&a.Za&&(c=c.substring(0,4047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type=
            "text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof h.InstallTrigger||(b.abort=function(){b.src=q}));b.Va=Date.now();b.Ja=function(){try{b.D&&(clearTimeout(b.D),b.D=0)}catch(a){}};b.onload=b.R=function(){b.Va&&(a.ia=Date.now()-b.Va);a.gb(c);b.Ja();a.Hb();a.ba();a.l=0;a.U();if(b.Ha){b.Ha=!1;try{a.doPostbacks(a.W(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.fa=function(){b.Ja();(a.trackOffline||a.ma)&&a.l&&a.i.unshift(a.Gb);a.l=0;
            a.ha>a.N&&a.Wa(a.i);a.ba();a.pa(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.R():b.fa())};a.Ua=a.A();if(1===d)b.send(c);else if(2===d)f=c.indexOf("?"),d=c.substring(0,f),f=c.substring(f+1),f=f.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,""),b.open("POST",d,!0),b.withCredentials=!0,b.send(f);else if(b.src=c,3===d){if(a.Sa)try{f.removeChild(a.Sa)}catch(e){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Sa=a.v}b.D=setTimeout(function(){b.D&&(b.complete?b.R():(a.trackOffline&&
            b.abort&&b.abort(),b.fa()))},5E3);a.Gb=c;a.v=h["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.J||a.bodyClickFunction)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.ca=setTimeout(a.ba,a.forcedLinkTrackingTimeout)};a.nb=function(c){var b=!1;navigator.sendBeacon&&(a.pb(c)?b=!0:a.useBeacon&&(b=!0));a.wb(c)&&(b=!1);return b};a.pb=function(a){return a&&0<a.indexOf("pe=lnk_e")?!0:!1};a.wb=function(a){return 64E3<=a.length};a.bb=function(){return"undefined"!==typeof XMLHttpRequest&&
            "withCredentials"in new XMLHttpRequest?!0:!1};a.Hb=function(){if(a.na()&&!(a.Ta>a.N))try{h.localStorage.removeItem(a.la()),a.Ta=a.A()}catch(c){}};a.Wa=function(c){if(a.na()){a.Ya();try{h.localStorage.setItem(a.la(),h.JSON.stringify(c)),a.N=a.A()}catch(b){}}};a.Ya=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ma()}};a.forceOffline=function(){a.ma=!0};a.forceOnline=function(){a.ma=!1};a.la=function(){return a.offlineFilename+
            "-"+a.visitorNamespace+a.account};a.A=function(){return(new Date).getTime()};a.Qa=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Zb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.S(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=
            typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:h.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>
            e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}},getIeVersion:function(){if(document.documentMode)return document.documentMode;for(var a=7;4<a;a--){var b=document.createElement("div");b.innerHTML="\x3c!--[if IE "+a+"]><span></span><![endif]--\x3e";if(b.getElementsByTagName("span").length)return a}return null}};
            a.F="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
            a.g=a.F.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ja="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.O=a.ja.slice(0);a.Ga="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout useLinkTrackSessionStorage trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData useBeacon usePostbacks registerPreTrackCallback registerPostTrackCallback bodyClickTarget bodyClickFunction AudienceManagement".split(" ");
            for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.O.push("prop"+m)),a.g.push("eVar"+m),a.O.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID ms_a".split(" ");a.g=a.g.concat(m);a.F=a.F.concat(m);a.ssl=0<=h.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
            0;a.offlineFilename="AppMeasurement.offline";a.P="s_sq";a.Ua=0;a.ha=0;a.N=0;a.Ta=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=h;a.d=h.document;try{if(a.Za=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Za=!0}}catch(x){}a.ba=function(){a.ca&&(h.clearTimeout(a.ca),a.ca=q);a.bodyClickTarget&&a.J&&a.bodyClickTarget.dispatchEvent(a.J);
            a.bodyClickFunction&&("function"==typeof a.bodyClickFunction?a.bodyClickFunction():a.bodyClickTarget&&a.bodyClickTarget.href&&(a.d.location=a.bodyClickTarget.href));a.bodyClickTarget=a.J=a.bodyClickFunction=0};a.Xa=function(){a.b=a.d.body;a.b?(a.r=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ia)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.r,!1);else{a.b.removeEventListener("click",a.r,!0);a.Ia=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=
            0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.M&&a.M==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=0;else{var k=a.M=a.clickObject;a.ga&&(clearTimeout(a.ga),a.ga=0);a.ga=setTimeout(function(){a.M==k&&(a.M=0)},1E4);f=a.Oa();a.track();if(f<a.Oa()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Qa(g)||
            (g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||h.name&&d==h.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=new h.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.bodyClickTarget=
            c.target,a.J=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.r):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&h.MouseEvent)&&(a.Ia=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.r,!0)),a.b.addEventListener("click",a.r,!1))):setTimeout(a.Xa,30)};a.Ib();a.jc||(r?a.setAccount(r):a.C("Error, missing Report Suite ID in AppMeasurement initialization"),a.Xa(),
            a.loadModule("ActivityMap"))}
            /*This function is modified to support s3*/
            /*(2047 IE limit) is changed t 4047 to avoid htr request*/
            function s3_gi(r){var a,h=window.s_c_il,q,p,m=r.split(","),s,u,t=0;if(h)for(q=0;!t&&q<h.length;){a=h[q];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(p=a.account?a.account:a.oun,p=a.allAccounts?a.allAccounts:p.split(","),s=0;s<m.length;s++)for(u=0;u<p.length;u++)m[s]==p[u]&&(t=1);q++}t?a.setAccount&&a.setAccount(r):a=new AppMeasurement(r);return a}AppMeasurement.getInstance=s3_gi;window.s_objectID||(window.s_objectID=0);
            function s3_pgicq(){var r=window,a=r.s_giq,h,q,p;if(a)for(h=0;h<a.length;h++)q=a[h],p=s3_gi(q.oun),p.setAccount(q.un),p.setTagContainer(q.tagContainerName);r.s_giq=0}s3_pgicq();

