'use strict';

(function (window, document) {
  // in event JS loads before first tag
  window._ideng = window._ideng || {e: []};

  // set empty pids array
  window._ideng.pids ||= [];

  // see if pixel already loaded (must do before handling sampling)
  var pixelId = '<%= @id %>';

  // PRIVATE FUNCTIONS

  // modify original logger so we can hide idiotic messages by scripts that don't play nice
  var preservedConsoleLog = window.console.log || {};
  window.console.log = function() {
    var arg0 = arguments[0];
    if (
      arguments[0] === '1. "Pixel" Fire' ||
      arguments[0] === '2. "Pixel" Captured' ||
      arguments[0] === '2.5 - No Device Found' ||
      /2\.5 Device Found/.test(arg0)
    ) return;
    preservedConsoleLog.apply(console, arguments);
  }
  var consoleOriginal = window.console;
  var consoleSilenced = {debug: function() {}, error: function() {}, info: function() {}, log: function() {}, warn: function() {}};
  var loggingDisable = function() { window.console = consoleSilenced; };
  var loggingEnable = function() { window.console = consoleOriginal; };

  // decryption function
  // encrypt the password defined in load_controller using: https://anseki.github.io/gnirts/
  // https://github.com/KyleBanks/XOREncryption
  var decrypt = function(text) {
    var key = (function(){var P=Array.prototype.slice.call(arguments),y=P.shift();return P.reverse().map(function(A,s){return String.fromCharCode(A-y-20-s)}).join('')})(20,169,168,167,94,93,103,159,155,158,157,144)+(30).toString(36).toLowerCase().split('').map(function(C){return String.fromCharCode(C.charCodeAt()+(-71))}).join('')+(75513568442).toString(36).toLowerCase()+(30).toString(36).toLowerCase().split('').map(function(e){return String.fromCharCode(e.charCodeAt()+(-71))}).join('')+(456).toString(36).toLowerCase()+(function(){var m=Array.prototype.slice.call(arguments),j=m.shift();return m.reverse().map(function(x,r){return String.fromCharCode(x-j-42-r)}).join('')})(23,183,171,185,168,137,198,130,196,157,175,135,191,135,175,169,185,165,186,113,174)+(33).toString(36).toLowerCase().split('').map(function(g){return String.fromCharCode(g.charCodeAt()+(-39))}).join('');
    var output = [];
    var keyLength = key.length;
    for (var i = 0; i < text.length; i++) {
      var charCode = text.charCodeAt(i) ^ key[i % keyLength].charCodeAt(0);
      output.push(String.fromCharCode(charCode));
    }
    return output.join('');
  };

  var sid = function() {
    if (window._ideng.sid) return window._ideng.sid;
    try {
      // FOR THE FOLLOWING SCRIPTS YOU MUST RENAME THE MINIFIED VERSION SO THAT YOU CAN DELETE THEM WHEN DONE USING THEM
      // Cookies -> __idengCookies (3 spots)
      // uuidv4  -> __idengUuidv4  (1 spot)
      // js-cookie v3.0.1 - https://cdnjs.com/libraries/js-cookie
      if (window._ideng.cookies === undefined) {
        !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.__idengCookies,o=e.__idengCookies=t();o.noConflict=function(){return e.__idengCookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));
        window._ideng.cookies = window.__idengCookies;
        delete window.__idengCookies;
      }
      // uuid 8.3.2 - https://cdnjs.com/libraries/uuid
      if (window._ideng.uuid === undefined) {
        !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).__idengUuidv4=e()}(this,(function(){"use strict";var t,e=new Uint8Array(16);function o(){if(!t&&!(t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(e)}var n=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function r(t){return"string"==typeof t&&n.test(t)}for(var i=[],u=0;u<256;++u)i.push((u+256).toString(16).substr(1));return function(t,e,n){var u=(t=t||{}).random||(t.rng||o)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,e){n=n||0;for(var f=0;f<16;++f)e[n+f]=u[f];return e}return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=(i[t[e+0]]+i[t[e+1]]+i[t[e+2]]+i[t[e+3]]+"-"+i[t[e+4]]+i[t[e+5]]+"-"+i[t[e+6]]+i[t[e+7]]+"-"+i[t[e+8]]+i[t[e+9]]+"-"+i[t[e+10]]+i[t[e+11]]+i[t[e+12]]+i[t[e+13]]+i[t[e+14]]+i[t[e+15]]).toLowerCase();if(!r(o))throw TypeError("Stringified UUID is invalid");return o}(u)}}));
        window._ideng.uuid = window.__idengUuidv4;
        delete window.__idengUuidv4;
      }
      var sessionId = window._ideng.cookies.get('__idengine_sid');
      if (!sessionId) {
        sessionId = window._ideng.uuid();
        window._ideng.cookies.set('__idengine_sid', sessionId, {expires: 365 * 2, sameSite: 'Lax'});
      }
      window._ideng.sid = sessionId;
    } catch(error) {
      // if crypto isn't supported in browser, uuidv4 throws an error, so for now do nothing and simply let the script proceed without a session id
      window._ideng.sid = null;
    }
  };
  sid(); // force load to get session id into window object

  var reprocessEvents = function() {
    // note the way we handle events. we don't require passing a pid key in each event,
    // therefore every event in the array will trigger for every pixel on the page
    // fail silently where crypto library cant load
    if (!sid()) return;
    for (var i = 0; i < window._ideng.e.q.length; i++) {
      var event = window._ideng.e.q[i];
      event.pids ||= [];
      for (var p = 0; p < window._ideng.pids.length; p++) {
        var pid = window._ideng.pids[p];
        // send every event item to every pid only once
        // NOTE this will trigger duplicate events if you ever do:
        // load pixel1
        // fire EVENT_69
        // load pixel2
        // fire EVENT_69 (in this case only fire the event a single time, as it applies to all pixels)
        if (event.pids.includes(pid)) continue;
        event.pids.push(pid);
        // make event
        try {
          // remove pids key
          var eventPayload = Object.assign({}, event);
          delete eventPayload.pids;
          var data = {
            event: eventPayload,
            page_url: window.location.href,
            session_id: sid(),
          };
          window._ideng.makeRequest(
            'POST',
            'https://serve.idengine.ai/events/' + pid,
            [['Content-Type', 'application/json; charset=utf-8']],
            JSON.stringify(data),
          );
        } catch(error) {}
      }
    }
  };

  // INITIALIZATION (happens only once per page load)

  if (!window._ideng.loaded) {
    window._ideng.makeRequest = function(type, url, headers, data) {
      req = new XMLHttpRequest();
      req.open(type, url);
      for (var i = 0; i < headers.length; i++) {
        req.setRequestHeader(headers[i][0], headers[i][1]);
      }
      req.send(data);
    };

    // overwrite event push function
    window._ideng.e = {
      q: window._ideng.e,
      push: function(event) {
        window._ideng.e.q.push(event);
        reprocessEvents();
      },
    };
  }

  // ABORT PIXEL LOADING FURTHER IF SAMPLED OUT
  if('<%@sample_rate < 1.0 %>')
    if (Math.random() > '<%= @sample_rate %>') return;
  '<% end %>'

  // FIRE DEFAULT EVENTS (still once per page load)

  if (!window._ideng.loaded) {
    if ('<%= !@suppression %>') {
      window._ideng.e.push({event: 'PAGEVIEW'});
    } else {
      window._ideng.e.push({event: 'SUPPRESSION'});
    }
    // now were officially loaded
    window._ideng.loaded = true;
  }

  // LOAD (happens once per pixel)

  // inject html
  var body = document.getElementsByTagName('body')[0];
  console.log("body",body)
  var loadPixel = function() {
    // abort if this pixel html has already been loaded
    // otherwise push it
    if (window._ideng.pids.includes(pixelId)) return;
    window._ideng.pids.push(pixelId);

    // process event queue for instances where script loads after e: []
    // note that this must happen after pushing the pid above
    reprocessEvents();

    var container = document.createElement('div')
    container.innerHTML = decrypt('<%= [@html_encrypted].to_json.html_safe %>[0]');

    if('<%Rails.env.production? %>')
      loggingDisable();
    '<% end %>'

    var children = container.children;
    var length = children.length;
    // note that you can't use children.length because it mutates as you call appendChild
    for (var i = 0; i < length; i++) {
      var toInsert;
      var elem = children[i];
      if (elem.nodeName.toUpperCase() === 'SCRIPT') {
        toInsert = document.createElement('script');
        // set text
        toInsert.text = elem.text || elem.textContent || elem.innerHTML || '';
        // set attributes
        var attributes = Array.prototype.slice.call(elem.attributes);
        var attr;
        while(attr = attributes.pop()) {
          toInsert.setAttribute(attr.nodeName, attr.nodeValue);
        }
      } else {
        toInsert = elem.cloneNode(true);
      }
      body.appendChild(toInsert);
    }

    loggingEnable();
  };

  // load html only when body loads (in case tags need it)
  if (body) {
    loadPixel();
  } else {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
    if (document.readyState === 'loading') {
      // Loading hasn't finished yet
      document.addEventListener('DOMContentLoaded', function() {
        loadPixel();
      });
    } else {
      // DOMContentLoaded has already fired
      loadPixel();
    }
  }
})(window, document);
