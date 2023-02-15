import { require_react_dom } from '/build/_shared/chunk-QKK2MX43.js';
import { esm_exports, init_esm } from '/build/_shared/chunk-2BZS2RP3.js';
import { require_jsx_dev_runtime, require_react, require_shim, useLoaderData } from '/build/_shared/chunk-LVR3G7GU.js';
import { __commonJS, __toCommonJS, __toESM } from '/build/_shared/chunk-4IYZMDEG.js';

// ../../node_modules/@remix-run/cloudflare/dist/crypto.js
var require_crypto = __commonJS({
  '../../node_modules/@remix-run/cloudflare/dist/crypto.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var encoder = new TextEncoder();
    var sign = async (value, secret) => {
      let key = await createKey(secret, ['sign']);
      let data = encoder.encode(value);
      let signature = await crypto.subtle.sign('HMAC', key, data);
      let hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=+$/, '');
      return value + '.' + hash;
    };
    var unsign = async (signed, secret) => {
      let index = signed.lastIndexOf('.');
      let value = signed.slice(0, index);
      let hash = signed.slice(index + 1);
      let key = await createKey(secret, ['verify']);
      let data = encoder.encode(value);
      let signature = byteStringToUint8Array(atob(hash));
      let valid = await crypto.subtle.verify('HMAC', key, signature, data);
      return valid ? value : false;
    };
    async function createKey(secret, usages) {
      let key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        {
          name: 'HMAC',
          hash: 'SHA-256',
        },
        false,
        usages,
      );
      return key;
    }
    function byteStringToUint8Array(byteString) {
      let array = new Uint8Array(byteString.length);
      for (let i2 = 0; i2 < byteString.length; i2++) {
        array[i2] = byteString.charCodeAt(i2);
      }
      return array;
    }
    exports.sign = sign;
    exports.unsign = unsign;
  },
});

// ../../node_modules/@remix-run/cloudflare/dist/implementations.js
var require_implementations = __commonJS({
  '../../node_modules/@remix-run/cloudflare/dist/implementations.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var serverRuntime = (init_esm(), __toCommonJS(esm_exports));
    var crypto2 = require_crypto();
    var createCookie = serverRuntime.createCookieFactory({
      sign: crypto2.sign,
      unsign: crypto2.unsign,
    });
    var createCookieSessionStorage = serverRuntime.createCookieSessionStorageFactory(createCookie);
    var createSessionStorage = serverRuntime.createSessionStorageFactory(createCookie);
    var createMemorySessionStorage = serverRuntime.createMemorySessionStorageFactory(createSessionStorage);
    exports.createCookie = createCookie;
    exports.createCookieSessionStorage = createCookieSessionStorage;
    exports.createMemorySessionStorage = createMemorySessionStorage;
    exports.createSessionStorage = createSessionStorage;
  },
});

// ../../node_modules/@remix-run/cloudflare/dist/sessions/workersKVStorage.js
var require_workersKVStorage = __commonJS({
  '../../node_modules/@remix-run/cloudflare/dist/sessions/workersKVStorage.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var implementations = require_implementations();
    function createWorkersKVSessionStorage({ cookie, kv }) {
      return implementations.createSessionStorage({
        cookie,
        async createData(data, expires) {
          while (true) {
            let randomBytes = new Uint8Array(8);
            crypto.getRandomValues(randomBytes);
            let id = [...randomBytes].map((x) => x.toString(16).padStart(2, '0')).join('');
            if (await kv.get(id, 'json')) {
              continue;
            }
            await kv.put(id, JSON.stringify(data), {
              expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0,
            });
            return id;
          }
        },
        async readData(id) {
          let session = await kv.get(id);
          if (!session) {
            return null;
          }
          return JSON.parse(session);
        },
        async updateData(id, data, expires) {
          await kv.put(id, JSON.stringify(data), {
            expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0,
          });
        },
        async deleteData(id) {
          await kv.delete(id);
        },
      });
    }
    exports.createWorkersKVSessionStorage = createWorkersKVSessionStorage;
  },
});

// ../../node_modules/@remix-run/cloudflare/dist/index.js
var require_dist = __commonJS({
  '../../node_modules/@remix-run/cloudflare/dist/index.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var workersKVStorage = require_workersKVStorage();
    var implementations = require_implementations();
    var serverRuntime = (init_esm(), __toCommonJS(esm_exports));
    var warn =
      (fn, message) =>
      (...args) => {
        console.warn(message);
        return fn(...args);
      };
    var createCloudflareKVSessionStorage = warn(
      workersKVStorage.createWorkersKVSessionStorage,
      '`createCloudflareKVSessionStorage` is deprecated. Please use `createWorkersKVSessionStorage` instead.',
    );
    exports.createWorkersKVSessionStorage = workersKVStorage.createWorkersKVSessionStorage;
    exports.createCookie = implementations.createCookie;
    exports.createCookieSessionStorage = implementations.createCookieSessionStorage;
    exports.createMemorySessionStorage = implementations.createMemorySessionStorage;
    exports.createSessionStorage = implementations.createSessionStorage;
    Object.defineProperty(exports, 'MaxPartSizeExceededError', {
      enumerable: true,
      get: function () {
        return serverRuntime.MaxPartSizeExceededError;
      },
    });
    Object.defineProperty(exports, 'createRequestHandler', {
      enumerable: true,
      get: function () {
        return serverRuntime.createRequestHandler;
      },
    });
    Object.defineProperty(exports, 'createSession', {
      enumerable: true,
      get: function () {
        return serverRuntime.createSession;
      },
    });
    Object.defineProperty(exports, 'defer', {
      enumerable: true,
      get: function () {
        return serverRuntime.defer;
      },
    });
    Object.defineProperty(exports, 'isCookie', {
      enumerable: true,
      get: function () {
        return serverRuntime.isCookie;
      },
    });
    Object.defineProperty(exports, 'isSession', {
      enumerable: true,
      get: function () {
        return serverRuntime.isSession;
      },
    });
    Object.defineProperty(exports, 'json', {
      enumerable: true,
      get: function () {
        return serverRuntime.json;
      },
    });
    Object.defineProperty(exports, 'redirect', {
      enumerable: true,
      get: function () {
        return serverRuntime.redirect;
      },
    });
    Object.defineProperty(exports, 'unstable_composeUploadHandlers', {
      enumerable: true,
      get: function () {
        return serverRuntime.unstable_composeUploadHandlers;
      },
    });
    Object.defineProperty(exports, 'unstable_createMemoryUploadHandler', {
      enumerable: true,
      get: function () {
        return serverRuntime.unstable_createMemoryUploadHandler;
      },
    });
    Object.defineProperty(exports, 'unstable_parseMultipartFormData', {
      enumerable: true,
      get: function () {
        return serverRuntime.unstable_parseMultipartFormData;
      },
    });
    exports.createCloudflareKVSessionStorage = createCloudflareKVSessionStorage;
  },
});

// ../../node_modules/debounce/index.js
var require_debounce = __commonJS({
  '../../node_modules/debounce/index.js'(exports, module) {
    function debounce(func, wait, immediate) {
      var timeout, args, context, timestamp, result;
      if (null == wait) wait = 100;
      function later() {
        var last = Date.now() - timestamp;
        if (last < wait && last >= 0) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
            context = args = null;
          }
        }
      }
      var debounced = function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }
        return result;
      };
      debounced.clear = function () {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
      };
      debounced.flush = function () {
        if (timeout) {
          result = func.apply(context, args);
          context = args = null;
          clearTimeout(timeout);
          timeout = null;
        }
      };
      return debounced;
    }
    debounce.debounce = debounce;
    module.exports = debounce;
  },
});

// ../../node_modules/randomcolor/randomColor.js
var require_randomColor = __commonJS({
  '../../node_modules/randomcolor/randomColor.js'(exports, module) {
    (function (root, factory) {
      if (typeof exports === 'object') {
        var randomColor2 = factory();
        if (typeof module === 'object' && module && module.exports) {
          exports = module.exports = randomColor2;
        }
        exports.randomColor = randomColor2;
      } else if (typeof define === 'function' && define.amd) {
        define([], factory);
      } else {
        root.randomColor = factory();
      }
    })(exports, function () {
      var seed = null;
      var colorDictionary = {};
      loadColorBounds();
      var colorRanges = [];
      var randomColor2 = function (options) {
        options = options || {};
        if (options.seed !== void 0 && options.seed !== null && options.seed === parseInt(options.seed, 10)) {
          seed = options.seed;
        } else if (typeof options.seed === 'string') {
          seed = stringToInteger(options.seed);
        } else if (options.seed !== void 0 && options.seed !== null) {
          throw new TypeError('The seed value must be an integer or string');
        } else {
          seed = null;
        }
        var H, S, B;
        if (options.count !== null && options.count !== void 0) {
          var totalColors = options.count,
            colors2 = [];
          for (var i2 = 0; i2 < options.count; i2++) {
            colorRanges.push(false);
          }
          options.count = null;
          while (totalColors > colors2.length) {
            var color = randomColor2(options);
            if (seed !== null) {
              options.seed = seed;
            }
            colors2.push(color);
          }
          options.count = totalColors;
          return colors2;
        }
        H = pickHue(options);
        S = pickSaturation(H, options);
        B = pickBrightness(H, S, options);
        return setFormat([H, S, B], options);
      };
      function pickHue(options) {
        if (colorRanges.length > 0) {
          var hueRange = getRealHueRange(options.hue);
          var hue = randomWithin(hueRange);
          var step = (hueRange[1] - hueRange[0]) / colorRanges.length;
          var j = parseInt((hue - hueRange[0]) / step);
          if (colorRanges[j] === true) {
            j = (j + 2) % colorRanges.length;
          } else {
            colorRanges[j] = true;
          }
          var min = (hueRange[0] + j * step) % 359,
            max = (hueRange[0] + (j + 1) * step) % 359;
          hueRange = [min, max];
          hue = randomWithin(hueRange);
          if (hue < 0) {
            hue = 360 + hue;
          }
          return hue;
        } else {
          var hueRange = getHueRange(options.hue);
          hue = randomWithin(hueRange);
          if (hue < 0) {
            hue = 360 + hue;
          }
          return hue;
        }
      }
      function pickSaturation(hue, options) {
        if (options.hue === 'monochrome') {
          return 0;
        }
        if (options.luminosity === 'random') {
          return randomWithin([0, 100]);
        }
        var saturationRange = getSaturationRange(hue);
        var sMin = saturationRange[0],
          sMax = saturationRange[1];
        switch (options.luminosity) {
          case 'bright':
            sMin = 55;
            break;
          case 'dark':
            sMin = sMax - 10;
            break;
          case 'light':
            sMax = 55;
            break;
        }
        return randomWithin([sMin, sMax]);
      }
      function pickBrightness(H, S, options) {
        var bMin = getMinimumBrightness(H, S),
          bMax = 100;
        switch (options.luminosity) {
          case 'dark':
            bMax = bMin + 20;
            break;
          case 'light':
            bMin = (bMax + bMin) / 2;
            break;
          case 'random':
            bMin = 0;
            bMax = 100;
            break;
        }
        return randomWithin([bMin, bMax]);
      }
      function setFormat(hsv, options) {
        switch (options.format) {
          case 'hsvArray':
            return hsv;
          case 'hslArray':
            return HSVtoHSL(hsv);
          case 'hsl':
            var hsl2 = HSVtoHSL(hsv);
            return 'hsl(' + hsl2[0] + ', ' + hsl2[1] + '%, ' + hsl2[2] + '%)';
          case 'hsla':
            var hslColor = HSVtoHSL(hsv);
            var alpha = options.alpha || Math.random();
            return 'hsla(' + hslColor[0] + ', ' + hslColor[1] + '%, ' + hslColor[2] + '%, ' + alpha + ')';
          case 'rgbArray':
            return HSVtoRGB(hsv);
          case 'rgb':
            var rgb2 = HSVtoRGB(hsv);
            return 'rgb(' + rgb2.join(', ') + ')';
          case 'rgba':
            var rgbColor = HSVtoRGB(hsv);
            var alpha = options.alpha || Math.random();
            return 'rgba(' + rgbColor.join(', ') + ', ' + alpha + ')';
          default:
            return HSVtoHex(hsv);
        }
      }
      function getMinimumBrightness(H, S) {
        var lowerBounds = getColorInfo(H).lowerBounds;
        for (var i2 = 0; i2 < lowerBounds.length - 1; i2++) {
          var s1 = lowerBounds[i2][0],
            v1 = lowerBounds[i2][1];
          var s2 = lowerBounds[i2 + 1][0],
            v2 = lowerBounds[i2 + 1][1];
          if (S >= s1 && S <= s2) {
            var m = (v2 - v1) / (s2 - s1),
              b = v1 - m * s1;
            return m * S + b;
          }
        }
        return 0;
      }
      function getHueRange(colorInput) {
        if (typeof parseInt(colorInput) === 'number') {
          var number = parseInt(colorInput);
          if (number < 360 && number > 0) {
            return [number, number];
          }
        }
        if (typeof colorInput === 'string') {
          if (colorDictionary[colorInput]) {
            var color = colorDictionary[colorInput];
            if (color.hueRange) {
              return color.hueRange;
            }
          } else if (colorInput.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
            var hue = HexToHSB(colorInput)[0];
            return [hue, hue];
          }
        }
        return [0, 360];
      }
      function getSaturationRange(hue) {
        return getColorInfo(hue).saturationRange;
      }
      function getColorInfo(hue) {
        if (hue >= 334 && hue <= 360) {
          hue -= 360;
        }
        for (var colorName in colorDictionary) {
          var color = colorDictionary[colorName];
          if (color.hueRange && hue >= color.hueRange[0] && hue <= color.hueRange[1]) {
            return colorDictionary[colorName];
          }
        }
        return 'Color not found';
      }
      function randomWithin(range) {
        if (seed === null) {
          var golden_ratio = 0.618033988749895;
          var r3 = Math.random();
          r3 += golden_ratio;
          r3 %= 1;
          return Math.floor(range[0] + r3 * (range[1] + 1 - range[0]));
        } else {
          var max = range[1] || 1;
          var min = range[0] || 0;
          seed = (seed * 9301 + 49297) % 233280;
          var rnd = seed / 233280;
          return Math.floor(min + rnd * (max - min));
        }
      }
      function HSVtoHex(hsv) {
        var rgb2 = HSVtoRGB(hsv);
        function componentToHex(c6) {
          var hex2 = c6.toString(16);
          return hex2.length == 1 ? '0' + hex2 : hex2;
        }
        var hex = '#' + componentToHex(rgb2[0]) + componentToHex(rgb2[1]) + componentToHex(rgb2[2]);
        return hex;
      }
      function defineColor(name, hueRange, lowerBounds) {
        var sMin = lowerBounds[0][0],
          sMax = lowerBounds[lowerBounds.length - 1][0],
          bMin = lowerBounds[lowerBounds.length - 1][1],
          bMax = lowerBounds[0][1];
        colorDictionary[name] = {
          hueRange,
          lowerBounds,
          saturationRange: [sMin, sMax],
          brightnessRange: [bMin, bMax],
        };
      }
      function loadColorBounds() {
        defineColor('monochrome', null, [
          [0, 0],
          [100, 0],
        ]);
        defineColor(
          'red',
          [-26, 18],
          [
            [20, 100],
            [30, 92],
            [40, 89],
            [50, 85],
            [60, 78],
            [70, 70],
            [80, 60],
            [90, 55],
            [100, 50],
          ],
        );
        defineColor(
          'orange',
          [18, 46],
          [
            [20, 100],
            [30, 93],
            [40, 88],
            [50, 86],
            [60, 85],
            [70, 70],
            [100, 70],
          ],
        );
        defineColor(
          'yellow',
          [46, 62],
          [
            [25, 100],
            [40, 94],
            [50, 89],
            [60, 86],
            [70, 84],
            [80, 82],
            [90, 80],
            [100, 75],
          ],
        );
        defineColor(
          'green',
          [62, 178],
          [
            [30, 100],
            [40, 90],
            [50, 85],
            [60, 81],
            [70, 74],
            [80, 64],
            [90, 50],
            [100, 40],
          ],
        );
        defineColor(
          'blue',
          [178, 257],
          [
            [20, 100],
            [30, 86],
            [40, 80],
            [50, 74],
            [60, 60],
            [70, 52],
            [80, 44],
            [90, 39],
            [100, 35],
          ],
        );
        defineColor(
          'purple',
          [257, 282],
          [
            [20, 100],
            [30, 87],
            [40, 79],
            [50, 70],
            [60, 65],
            [70, 59],
            [80, 52],
            [90, 45],
            [100, 42],
          ],
        );
        defineColor(
          'pink',
          [282, 334],
          [
            [20, 100],
            [30, 90],
            [40, 86],
            [60, 84],
            [80, 80],
            [90, 75],
            [100, 73],
          ],
        );
      }
      function HSVtoRGB(hsv) {
        var h5 = hsv[0];
        if (h5 === 0) {
          h5 = 1;
        }
        if (h5 === 360) {
          h5 = 359;
        }
        h5 = h5 / 360;
        var s2 = hsv[1] / 100,
          v = hsv[2] / 100;
        var h_i = Math.floor(h5 * 6),
          f2 = h5 * 6 - h_i,
          p2 = v * (1 - s2),
          q = v * (1 - f2 * s2),
          t2 = v * (1 - (1 - f2) * s2),
          r3 = 256,
          g = 256,
          b = 256;
        switch (h_i) {
          case 0:
            r3 = v;
            g = t2;
            b = p2;
            break;
          case 1:
            r3 = q;
            g = v;
            b = p2;
            break;
          case 2:
            r3 = p2;
            g = v;
            b = t2;
            break;
          case 3:
            r3 = p2;
            g = q;
            b = v;
            break;
          case 4:
            r3 = t2;
            g = p2;
            b = v;
            break;
          case 5:
            r3 = v;
            g = p2;
            b = q;
            break;
        }
        var result = [Math.floor(r3 * 255), Math.floor(g * 255), Math.floor(b * 255)];
        return result;
      }
      function HexToHSB(hex) {
        hex = hex.replace(/^#/, '');
        hex = hex.length === 3 ? hex.replace(/(.)/g, '$1$1') : hex;
        var red = parseInt(hex.substr(0, 2), 16) / 255,
          green = parseInt(hex.substr(2, 2), 16) / 255,
          blue = parseInt(hex.substr(4, 2), 16) / 255;
        var cMax = Math.max(red, green, blue),
          delta = cMax - Math.min(red, green, blue),
          saturation = cMax ? delta / cMax : 0;
        switch (cMax) {
          case red:
            return [60 * (((green - blue) / delta) % 6) || 0, saturation, cMax];
          case green:
            return [60 * ((blue - red) / delta + 2) || 0, saturation, cMax];
          case blue:
            return [60 * ((red - green) / delta + 4) || 0, saturation, cMax];
        }
      }
      function HSVtoHSL(hsv) {
        var h5 = hsv[0],
          s2 = hsv[1] / 100,
          v = hsv[2] / 100,
          k = (2 - s2) * v;
        return [h5, Math.round(((s2 * v) / (k < 1 ? k : 2 - k)) * 1e4) / 100, (k / 2) * 100];
      }
      function stringToInteger(string) {
        var total = 0;
        for (var i2 = 0; i2 !== string.length; i2++) {
          if (total >= Number.MAX_SAFE_INTEGER) break;
          total += string.charCodeAt(i2);
        }
        return total;
      }
      function getRealHueRange(colorHue) {
        if (!isNaN(colorHue)) {
          var number = parseInt(colorHue);
          if (number < 360 && number > 0) {
            return getColorInfo(colorHue).hueRange;
          }
        } else if (typeof colorHue === 'string') {
          if (colorDictionary[colorHue]) {
            var color = colorDictionary[colorHue];
            if (color.hueRange) {
              return color.hueRange;
            }
          } else if (colorHue.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
            var hue = HexToHSB(colorHue)[0];
            return getColorInfo(hue).hueRange;
          }
        }
        return [0, 360];
      }
      return randomColor2;
    });
  },
});

// app/routes/index.tsx
var import_cloudflare = __toESM(require_dist(), 1);

// ../../node_modules/@react-spring/rafz/dist/react-spring-rafz.esm.js
var updateQueue = makeQueue();
var raf = (fn) => schedule(fn, updateQueue);
var writeQueue = makeQueue();
raf.write = (fn) => schedule(fn, writeQueue);
var onStartQueue = makeQueue();
raf.onStart = (fn) => schedule(fn, onStartQueue);
var onFrameQueue = makeQueue();
raf.onFrame = (fn) => schedule(fn, onFrameQueue);
var onFinishQueue = makeQueue();
raf.onFinish = (fn) => schedule(fn, onFinishQueue);
var timeouts = [];
raf.setTimeout = (handler, ms) => {
  let time = raf.now() + ms;
  let cancel = () => {
    let i2 = timeouts.findIndex((t2) => t2.cancel == cancel);
    if (~i2) timeouts.splice(i2, 1);
    pendingCount -= ~i2 ? 1 : 0;
  };
  let timeout = {
    time,
    handler,
    cancel,
  };
  timeouts.splice(findTimeout(time), 0, timeout);
  pendingCount += 1;
  start();
  return timeout;
};
var findTimeout = (time) => ~(~timeouts.findIndex((t2) => t2.time > time) || ~timeouts.length);
raf.cancel = (fn) => {
  onStartQueue.delete(fn);
  onFrameQueue.delete(fn);
  onFinishQueue.delete(fn);
  updateQueue.delete(fn);
  writeQueue.delete(fn);
};
raf.sync = (fn) => {
  sync = true;
  raf.batchedUpdates(fn);
  sync = false;
};
raf.throttle = (fn) => {
  let lastArgs;
  function queuedFn() {
    try {
      fn(...lastArgs);
    } finally {
      lastArgs = null;
    }
  }
  function throttled(...args) {
    lastArgs = args;
    raf.onStart(queuedFn);
  }
  throttled.handler = fn;
  throttled.cancel = () => {
    onStartQueue.delete(queuedFn);
    lastArgs = null;
  };
  return throttled;
};
var nativeRaf = typeof window != 'undefined' ? window.requestAnimationFrame : () => {};
raf.use = (impl) => (nativeRaf = impl);
raf.now = typeof performance != 'undefined' ? () => performance.now() : Date.now;
raf.batchedUpdates = (fn) => fn();
raf.catch = console.error;
raf.frameLoop = 'always';
raf.advance = () => {
  if (raf.frameLoop !== 'demand') {
    console.warn('Cannot call the manual advancement of rafz whilst frameLoop is not set as demand');
  } else {
    update();
  }
};
var ts = -1;
var pendingCount = 0;
var sync = false;
function schedule(fn, queue) {
  if (sync) {
    queue.delete(fn);
    fn(0);
  } else {
    queue.add(fn);
    start();
  }
}
function start() {
  if (ts < 0) {
    ts = 0;
    if (raf.frameLoop !== 'demand') {
      nativeRaf(loop);
    }
  }
}
function stop() {
  ts = -1;
}
function loop() {
  if (~ts) {
    nativeRaf(loop);
    raf.batchedUpdates(update);
  }
}
function update() {
  let prevTs = ts;
  ts = raf.now();
  let count = findTimeout(ts);
  if (count) {
    eachSafely(timeouts.splice(0, count), (t2) => t2.handler());
    pendingCount -= count;
  }
  if (!pendingCount) {
    stop();
    return;
  }
  onStartQueue.flush();
  updateQueue.flush(prevTs ? Math.min(64, ts - prevTs) : 16.667);
  onFrameQueue.flush();
  writeQueue.flush();
  onFinishQueue.flush();
}
function makeQueue() {
  let next = /* @__PURE__ */ new Set();
  let current = next;
  return {
    add(fn) {
      pendingCount += current == next && !next.has(fn) ? 1 : 0;
      next.add(fn);
    },
    delete(fn) {
      pendingCount -= current == next && next.has(fn) ? 1 : 0;
      return next.delete(fn);
    },
    flush(arg) {
      if (current.size) {
        next = /* @__PURE__ */ new Set();
        pendingCount -= current.size;
        eachSafely(current, (fn) => fn(arg) && next.add(fn));
        pendingCount += next.size;
        current = next;
      }
    },
  };
}
function eachSafely(values, each2) {
  values.forEach((value) => {
    try {
      each2(value);
    } catch (e2) {
      raf.catch(e2);
    }
  });
}

// ../../node_modules/@react-spring/shared/dist/react-spring-shared.esm.js
var import_react = __toESM(require_react());
function noop() {}
var defineHidden = (obj, key, value) =>
  Object.defineProperty(obj, key, {
    value,
    writable: true,
    configurable: true,
  });
var is = {
  arr: Array.isArray,
  obj: (a2) => !!a2 && a2.constructor.name === 'Object',
  fun: (a2) => typeof a2 === 'function',
  str: (a2) => typeof a2 === 'string',
  num: (a2) => typeof a2 === 'number',
  und: (a2) => a2 === void 0,
};
function isEqual(a2, b) {
  if (is.arr(a2)) {
    if (!is.arr(b) || a2.length !== b.length) return false;
    for (let i2 = 0; i2 < a2.length; i2++) {
      if (a2[i2] !== b[i2]) return false;
    }
    return true;
  }
  return a2 === b;
}
var each = (obj, fn) => obj.forEach(fn);
function eachProp(obj, fn, ctx2) {
  if (is.arr(obj)) {
    for (let i2 = 0; i2 < obj.length; i2++) {
      fn.call(ctx2, obj[i2], `${i2}`);
    }
    return;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn.call(ctx2, obj[key], key);
    }
  }
}
var toArray = (a2) => (is.und(a2) ? [] : is.arr(a2) ? a2 : [a2]);
function flush(queue, iterator) {
  if (queue.size) {
    const items2 = Array.from(queue);
    queue.clear();
    each(items2, iterator);
  }
}
var flushCalls = (queue, ...args) => flush(queue, (fn) => fn(...args));
var isSSR = () =>
  typeof window === 'undefined' || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
var createStringInterpolator$1;
var to;
var colors$1 = null;
var skipAnimation = false;
var willAdvance = noop;
var assign = (globals2) => {
  if (globals2.to) to = globals2.to;
  if (globals2.now) raf.now = globals2.now;
  if (globals2.colors !== void 0) colors$1 = globals2.colors;
  if (globals2.skipAnimation != null) skipAnimation = globals2.skipAnimation;
  if (globals2.createStringInterpolator) createStringInterpolator$1 = globals2.createStringInterpolator;
  if (globals2.requestAnimationFrame) raf.use(globals2.requestAnimationFrame);
  if (globals2.batchedUpdates) raf.batchedUpdates = globals2.batchedUpdates;
  if (globals2.willAdvance) willAdvance = globals2.willAdvance;
  if (globals2.frameLoop) raf.frameLoop = globals2.frameLoop;
};
var globals = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return createStringInterpolator$1;
  },
  get to() {
    return to;
  },
  get colors() {
    return colors$1;
  },
  get skipAnimation() {
    return skipAnimation;
  },
  get willAdvance() {
    return willAdvance;
  },
  assign,
});
var startQueue = /* @__PURE__ */ new Set();
var currentFrame = [];
var prevFrame = [];
var priority = 0;
var frameLoop = {
  get idle() {
    return !startQueue.size && !currentFrame.length;
  },
  start(animation) {
    if (priority > animation.priority) {
      startQueue.add(animation);
      raf.onStart(flushStartQueue);
    } else {
      startSafely(animation);
      raf(advance);
    }
  },
  advance,
  sort(animation) {
    if (priority) {
      raf.onFrame(() => frameLoop.sort(animation));
    } else {
      const prevIndex = currentFrame.indexOf(animation);
      if (~prevIndex) {
        currentFrame.splice(prevIndex, 1);
        startUnsafely(animation);
      }
    }
  },
  clear() {
    currentFrame = [];
    startQueue.clear();
  },
};
function flushStartQueue() {
  startQueue.forEach(startSafely);
  startQueue.clear();
  raf(advance);
}
function startSafely(animation) {
  if (!currentFrame.includes(animation)) startUnsafely(animation);
}
function startUnsafely(animation) {
  currentFrame.splice(
    findIndex(currentFrame, (other) => other.priority > animation.priority),
    0,
    animation,
  );
}
function advance(dt) {
  const nextFrame = prevFrame;
  for (let i2 = 0; i2 < currentFrame.length; i2++) {
    const animation = currentFrame[i2];
    priority = animation.priority;
    if (!animation.idle) {
      willAdvance(animation);
      animation.advance(dt);
      if (!animation.idle) {
        nextFrame.push(animation);
      }
    }
  }
  priority = 0;
  prevFrame = currentFrame;
  prevFrame.length = 0;
  currentFrame = nextFrame;
  return currentFrame.length > 0;
}
function findIndex(arr, test) {
  const index = arr.findIndex(test);
  return index < 0 ? arr.length : index;
}
var clamp = (min, max, v) => Math.min(Math.max(v, min), max);
var colors = {
  transparent: 0,
  aliceblue: 4042850303,
  antiquewhite: 4209760255,
  aqua: 16777215,
  aquamarine: 2147472639,
  azure: 4043309055,
  beige: 4126530815,
  bisque: 4293182719,
  black: 255,
  blanchedalmond: 4293643775,
  blue: 65535,
  blueviolet: 2318131967,
  brown: 2771004159,
  burlywood: 3736635391,
  burntsienna: 3934150143,
  cadetblue: 1604231423,
  chartreuse: 2147418367,
  chocolate: 3530104575,
  coral: 4286533887,
  cornflowerblue: 1687547391,
  cornsilk: 4294499583,
  crimson: 3692313855,
  cyan: 16777215,
  darkblue: 35839,
  darkcyan: 9145343,
  darkgoldenrod: 3095792639,
  darkgray: 2846468607,
  darkgreen: 6553855,
  darkgrey: 2846468607,
  darkkhaki: 3182914559,
  darkmagenta: 2332068863,
  darkolivegreen: 1433087999,
  darkorange: 4287365375,
  darkorchid: 2570243327,
  darkred: 2332033279,
  darksalmon: 3918953215,
  darkseagreen: 2411499519,
  darkslateblue: 1211993087,
  darkslategray: 793726975,
  darkslategrey: 793726975,
  darkturquoise: 13554175,
  darkviolet: 2483082239,
  deeppink: 4279538687,
  deepskyblue: 12582911,
  dimgray: 1768516095,
  dimgrey: 1768516095,
  dodgerblue: 512819199,
  firebrick: 2988581631,
  floralwhite: 4294635775,
  forestgreen: 579543807,
  fuchsia: 4278255615,
  gainsboro: 3705462015,
  ghostwhite: 4177068031,
  gold: 4292280575,
  goldenrod: 3668254975,
  gray: 2155905279,
  green: 8388863,
  greenyellow: 2919182335,
  grey: 2155905279,
  honeydew: 4043305215,
  hotpink: 4285117695,
  indianred: 3445382399,
  indigo: 1258324735,
  ivory: 4294963455,
  khaki: 4041641215,
  lavender: 3873897215,
  lavenderblush: 4293981695,
  lawngreen: 2096890111,
  lemonchiffon: 4294626815,
  lightblue: 2916673279,
  lightcoral: 4034953471,
  lightcyan: 3774873599,
  lightgoldenrodyellow: 4210742015,
  lightgray: 3553874943,
  lightgreen: 2431553791,
  lightgrey: 3553874943,
  lightpink: 4290167295,
  lightsalmon: 4288707327,
  lightseagreen: 548580095,
  lightskyblue: 2278488831,
  lightslategray: 2005441023,
  lightslategrey: 2005441023,
  lightsteelblue: 2965692159,
  lightyellow: 4294959359,
  lime: 16711935,
  limegreen: 852308735,
  linen: 4210091775,
  magenta: 4278255615,
  maroon: 2147483903,
  mediumaquamarine: 1724754687,
  mediumblue: 52735,
  mediumorchid: 3126187007,
  mediumpurple: 2473647103,
  mediumseagreen: 1018393087,
  mediumslateblue: 2070474495,
  mediumspringgreen: 16423679,
  mediumturquoise: 1221709055,
  mediumvioletred: 3340076543,
  midnightblue: 421097727,
  mintcream: 4127193855,
  mistyrose: 4293190143,
  moccasin: 4293178879,
  navajowhite: 4292783615,
  navy: 33023,
  oldlace: 4260751103,
  olive: 2155872511,
  olivedrab: 1804477439,
  orange: 4289003775,
  orangered: 4282712319,
  orchid: 3664828159,
  palegoldenrod: 4008225535,
  palegreen: 2566625535,
  paleturquoise: 2951671551,
  palevioletred: 3681588223,
  papayawhip: 4293907967,
  peachpuff: 4292524543,
  peru: 3448061951,
  pink: 4290825215,
  plum: 3718307327,
  powderblue: 2967529215,
  purple: 2147516671,
  rebeccapurple: 1714657791,
  red: 4278190335,
  rosybrown: 3163525119,
  royalblue: 1097458175,
  saddlebrown: 2336560127,
  salmon: 4202722047,
  sandybrown: 4104413439,
  seagreen: 780883967,
  seashell: 4294307583,
  sienna: 2689740287,
  silver: 3233857791,
  skyblue: 2278484991,
  slateblue: 1784335871,
  slategray: 1887473919,
  slategrey: 1887473919,
  snow: 4294638335,
  springgreen: 16744447,
  steelblue: 1182971135,
  tan: 3535047935,
  teal: 8421631,
  thistle: 3636451583,
  tomato: 4284696575,
  turquoise: 1088475391,
  violet: 4001558271,
  wheat: 4125012991,
  white: 4294967295,
  whitesmoke: 4126537215,
  yellow: 4294902015,
  yellowgreen: 2597139199,
};
var NUMBER = '[-+]?\\d*\\.?\\d+';
var PERCENTAGE = NUMBER + '%';
function call(...parts) {
  return '\\(\\s*(' + parts.join(')\\s*,\\s*(') + ')\\s*\\)';
}
var rgb = new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER));
var rgba = new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER));
var hsl = new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE));
var hsla = new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
var hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex6 = /^#([0-9a-fA-F]{6})$/;
var hex8 = /^#([0-9a-fA-F]{8})$/;
function normalizeColor(color) {
  let match;
  if (typeof color === 'number') {
    return color >>> 0 === color && color >= 0 && color <= 4294967295 ? color : null;
  }
  if ((match = hex6.exec(color))) return parseInt(match[1] + 'ff', 16) >>> 0;
  if (colors$1 && colors$1[color] !== void 0) {
    return colors$1[color];
  }
  if ((match = rgb.exec(color))) {
    return ((parse255(match[1]) << 24) | (parse255(match[2]) << 16) | (parse255(match[3]) << 8) | 255) >>> 0;
  }
  if ((match = rgba.exec(color))) {
    return (
      ((parse255(match[1]) << 24) | (parse255(match[2]) << 16) | (parse255(match[3]) << 8) | parse1(match[4])) >>> 0
    );
  }
  if ((match = hex3.exec(color))) {
    return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + 'ff', 16) >>> 0;
  }
  if ((match = hex8.exec(color))) return parseInt(match[1], 16) >>> 0;
  if ((match = hex4.exec(color))) {
    return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
  }
  if ((match = hsl.exec(color))) {
    return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 255) >>> 0;
  }
  if ((match = hsla.exec(color))) {
    return (
      (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | parse1(match[4])) >>> 0
    );
  }
  return null;
}
function hue2rgb(p2, q, t2) {
  if (t2 < 0) t2 += 1;
  if (t2 > 1) t2 -= 1;
  if (t2 < 1 / 6) return p2 + (q - p2) * 6 * t2;
  if (t2 < 1 / 2) return q;
  if (t2 < 2 / 3) return p2 + (q - p2) * (2 / 3 - t2) * 6;
  return p2;
}
function hslToRgb(h5, s2, l2) {
  const q = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
  const p2 = 2 * l2 - q;
  const r3 = hue2rgb(p2, q, h5 + 1 / 3);
  const g = hue2rgb(p2, q, h5);
  const b = hue2rgb(p2, q, h5 - 1 / 3);
  return (Math.round(r3 * 255) << 24) | (Math.round(g * 255) << 16) | (Math.round(b * 255) << 8);
}
function parse255(str) {
  const int = parseInt(str, 10);
  if (int < 0) return 0;
  if (int > 255) return 255;
  return int;
}
function parse360(str) {
  const int = parseFloat(str);
  return (((int % 360) + 360) % 360) / 360;
}
function parse1(str) {
  const num = parseFloat(str);
  if (num < 0) return 0;
  if (num > 1) return 255;
  return Math.round(num * 255);
}
function parsePercentage(str) {
  const int = parseFloat(str);
  if (int < 0) return 0;
  if (int > 100) return 1;
  return int / 100;
}
function colorToRgba(input) {
  let int32Color = normalizeColor(input);
  if (int32Color === null) return input;
  int32Color = int32Color || 0;
  let r3 = (int32Color & 4278190080) >>> 24;
  let g = (int32Color & 16711680) >>> 16;
  let b = (int32Color & 65280) >>> 8;
  let a2 = (int32Color & 255) / 255;
  return `rgba(${r3}, ${g}, ${b}, ${a2})`;
}
var createInterpolator = (range, output, extrapolate) => {
  if (is.fun(range)) {
    return range;
  }
  if (is.arr(range)) {
    return createInterpolator({
      range,
      output,
      extrapolate,
    });
  }
  if (is.str(range.output[0])) {
    return createStringInterpolator$1(range);
  }
  const config2 = range;
  const outputRange = config2.output;
  const inputRange = config2.range || [0, 1];
  const extrapolateLeft = config2.extrapolateLeft || config2.extrapolate || 'extend';
  const extrapolateRight = config2.extrapolateRight || config2.extrapolate || 'extend';
  const easing = config2.easing || ((t2) => t2);
  return (input) => {
    const range2 = findRange(input, inputRange);
    return interpolate(
      input,
      inputRange[range2],
      inputRange[range2 + 1],
      outputRange[range2],
      outputRange[range2 + 1],
      easing,
      extrapolateLeft,
      extrapolateRight,
      config2.map,
    );
  };
};
function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
  let result = map ? map(input) : input;
  if (result < inputMin) {
    if (extrapolateLeft === 'identity') return result;
    else if (extrapolateLeft === 'clamp') result = inputMin;
  }
  if (result > inputMax) {
    if (extrapolateRight === 'identity') return result;
    else if (extrapolateRight === 'clamp') result = inputMax;
  }
  if (outputMin === outputMax) return outputMin;
  if (inputMin === inputMax) return input <= inputMin ? outputMin : outputMax;
  if (inputMin === -Infinity) result = -result;
  else if (inputMax === Infinity) result = result - inputMin;
  else result = (result - inputMin) / (inputMax - inputMin);
  result = easing(result);
  if (outputMin === -Infinity) result = -result;
  else if (outputMax === Infinity) result = result + outputMin;
  else result = result * (outputMax - outputMin) + outputMin;
  return result;
}
function findRange(input, inputRange) {
  for (var i2 = 1; i2 < inputRange.length - 1; ++i2) if (inputRange[i2] >= input) break;
  return i2 - 1;
}
var steps =
  (steps2, direction = 'end') =>
  (progress2) => {
    progress2 = direction === 'end' ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
    const expanded = progress2 * steps2;
    const rounded = direction === 'end' ? Math.floor(expanded) : Math.ceil(expanded);
    return clamp(0, 1, rounded / steps2);
  };
var c1 = 1.70158;
var c2 = c1 * 1.525;
var c3 = c1 + 1;
var c4 = (2 * Math.PI) / 3;
var c5 = (2 * Math.PI) / 4.5;
var bounceOut = (x) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
var easings = {
  linear: (x) => x,
  easeInQuad: (x) => x * x,
  easeOutQuad: (x) => 1 - (1 - x) * (1 - x),
  easeInOutQuad: (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2),
  easeInCubic: (x) => x * x * x,
  easeOutCubic: (x) => 1 - Math.pow(1 - x, 3),
  easeInOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  easeInQuart: (x) => x * x * x * x,
  easeOutQuart: (x) => 1 - Math.pow(1 - x, 4),
  easeInOutQuart: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2),
  easeInQuint: (x) => x * x * x * x * x,
  easeOutQuint: (x) => 1 - Math.pow(1 - x, 5),
  easeInOutQuint: (x) => (x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2),
  easeInSine: (x) => 1 - Math.cos((x * Math.PI) / 2),
  easeOutSine: (x) => Math.sin((x * Math.PI) / 2),
  easeInOutSine: (x) => -(Math.cos(Math.PI * x) - 1) / 2,
  easeInExpo: (x) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10)),
  easeOutExpo: (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  easeInOutExpo: (x) =>
    x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,
  easeInCirc: (x) => 1 - Math.sqrt(1 - Math.pow(x, 2)),
  easeOutCirc: (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
  easeInOutCirc: (x) =>
    x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2,
  easeInBack: (x) => c3 * x * x * x - c1 * x * x,
  easeOutBack: (x) => 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2),
  easeInOutBack: (x) =>
    x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2,
  easeInElastic: (x) => (x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4)),
  easeOutElastic: (x) => (x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1),
  easeInOutElastic: (x) =>
    x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1,
  easeInBounce: (x) => 1 - bounceOut(1 - x),
  easeOutBounce: bounceOut,
  easeInOutBounce: (x) => (x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2),
  steps,
};
function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
          var source = arguments[i2];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
}
var $get = Symbol.for('FluidValue.get');
var $observers = Symbol.for('FluidValue.observers');
var hasFluidValue = (arg) => Boolean(arg && arg[$get]);
var getFluidValue = (arg) => (arg && arg[$get] ? arg[$get]() : arg);
var getFluidObservers = (target) => target[$observers] || null;
function callFluidObserver(observer2, event) {
  if (observer2.eventObserved) {
    observer2.eventObserved(event);
  } else {
    observer2(event);
  }
}
function callFluidObservers(target, event) {
  let observers = target[$observers];
  if (observers) {
    observers.forEach((observer2) => {
      callFluidObserver(observer2, event);
    });
  }
}
var FluidValue = class {
  constructor(get) {
    this[$get] = void 0;
    this[$observers] = void 0;
    if (!get && !(get = this.get)) {
      throw Error('Unknown getter');
    }
    setFluidGetter(this, get);
  }
};
var setFluidGetter = (target, get) => setHidden(target, $get, get);
function addFluidObserver(target, observer2) {
  if (target[$get]) {
    let observers = target[$observers];
    if (!observers) {
      setHidden(target, $observers, (observers = /* @__PURE__ */ new Set()));
    }
    if (!observers.has(observer2)) {
      observers.add(observer2);
      if (target.observerAdded) {
        target.observerAdded(observers.size, observer2);
      }
    }
  }
  return observer2;
}
function removeFluidObserver(target, observer2) {
  let observers = target[$observers];
  if (observers && observers.has(observer2)) {
    const count = observers.size - 1;
    if (count) {
      observers.delete(observer2);
    } else {
      target[$observers] = null;
    }
    if (target.observerRemoved) {
      target.observerRemoved(count, observer2);
    }
  }
}
var setHidden = (target, key, value) =>
  Object.defineProperty(target, key, {
    value,
    writable: true,
    configurable: true,
  });
var numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
var unitRegex = new RegExp(`(${numberRegex.source})(%|[a-z]+)`, 'i');
var rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
var variableToRgba = (input) => {
  const [token, fallback] = parseCSSVariable(input);
  if (!token || isSSR()) {
    return input;
  }
  const value = window.getComputedStyle(document.documentElement).getPropertyValue(token);
  if (value) {
    return value.trim();
  } else if (fallback && fallback.startsWith('--')) {
    const _value = window.getComputedStyle(document.documentElement).getPropertyValue(fallback);
    if (_value) {
      return _value;
    } else {
      return input;
    }
  } else if (fallback && cssVariableRegex.test(fallback)) {
    return variableToRgba(fallback);
  } else if (fallback) {
    return fallback;
  }
  return input;
};
var parseCSSVariable = (current) => {
  const match = cssVariableRegex.exec(current);
  if (!match) return [,];
  const [, token, fallback] = match;
  return [token, fallback];
};
var namedColorRegex;
var rgbaRound = (_, p1, p2, p3, p4) => `rgba(${Math.round(p1)}, ${Math.round(p2)}, ${Math.round(p3)}, ${p4})`;
var createStringInterpolator = (config2) => {
  if (!namedColorRegex)
    namedColorRegex = colors$1 ? new RegExp(`(${Object.keys(colors$1).join('|')})(?!\\w)`, 'g') : /^\b$/;
  const output = config2.output.map((value) => {
    return getFluidValue(value)
      .replace(cssVariableRegex, variableToRgba)
      .replace(colorRegex, colorToRgba)
      .replace(namedColorRegex, colorToRgba);
  });
  const keyframes = output.map((value) => value.match(numberRegex).map(Number));
  const outputRanges = keyframes[0].map((_, i2) =>
    keyframes.map((values) => {
      if (!(i2 in values)) {
        throw Error('The arity of each "output" value must be equal');
      }
      return values[i2];
    }),
  );
  const interpolators = outputRanges.map((output2) =>
    createInterpolator(
      _extends({}, config2, {
        output: output2,
      }),
    ),
  );
  return (input) => {
    var _output$find;
    const missingUnit =
      !unitRegex.test(output[0]) &&
      ((_output$find = output.find((value) => unitRegex.test(value))) == null
        ? void 0
        : _output$find.replace(numberRegex, ''));
    let i2 = 0;
    return output[0]
      .replace(numberRegex, () => `${interpolators[i2++](input)}${missingUnit || ''}`)
      .replace(rgbaRegex, rgbaRound);
  };
};
var prefix = 'react-spring: ';
var once = (fn) => {
  const func = fn;
  let called = false;
  if (typeof func != 'function') {
    throw new TypeError(`${prefix}once requires a function parameter`);
  }
  return (...args) => {
    if (!called) {
      func(...args);
      called = true;
    }
  };
};
var warnInterpolate = once(console.warn);
function deprecateInterpolate() {
  warnInterpolate(`${prefix}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
var warnDirectCall = once(console.warn);
function deprecateDirectCall() {
  warnDirectCall(
    `${prefix}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`,
  );
}
function isAnimatedString(value) {
  return (
    is.str(value) &&
    (value[0] == '#' || /\d/.test(value) || (!isSSR() && cssVariableRegex.test(value)) || value in (colors$1 || {}))
  );
}
var observer;
var resizeHandlers = /* @__PURE__ */ new WeakMap();
var handleObservation = (entries) =>
  entries.forEach(({ target, contentRect }) => {
    var _resizeHandlers$get;
    return (_resizeHandlers$get = resizeHandlers.get(target)) == null
      ? void 0
      : _resizeHandlers$get.forEach((handler) => handler(contentRect));
  });
function resizeElement(handler, target) {
  if (!observer) {
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(handleObservation);
    }
  }
  let elementHandlers = resizeHandlers.get(target);
  if (!elementHandlers) {
    elementHandlers = /* @__PURE__ */ new Set();
    resizeHandlers.set(target, elementHandlers);
  }
  elementHandlers.add(handler);
  if (observer) {
    observer.observe(target);
  }
  return () => {
    const elementHandlers2 = resizeHandlers.get(target);
    if (!elementHandlers2) return;
    elementHandlers2.delete(handler);
    if (!elementHandlers2.size && observer) {
      observer.unobserve(target);
    }
  };
}
var listeners = /* @__PURE__ */ new Set();
var cleanupWindowResizeHandler;
var createResizeHandler = () => {
  const handleResize = () => {
    listeners.forEach((callback) =>
      callback({
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    );
  };
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
};
var resizeWindow = (callback) => {
  listeners.add(callback);
  if (!cleanupWindowResizeHandler) {
    cleanupWindowResizeHandler = createResizeHandler();
  }
  return () => {
    listeners.delete(callback);
    if (!listeners.size && cleanupWindowResizeHandler) {
      cleanupWindowResizeHandler();
      cleanupWindowResizeHandler = void 0;
    }
  };
};
var onResize = (callback, { container: _container = document.documentElement } = {}) => {
  if (_container === document.documentElement) {
    return resizeWindow(callback);
  } else {
    return resizeElement(callback, _container);
  }
};
var progress = (min, max, value) => (max - min === 0 ? 1 : (value - min) / (max - min));
var SCROLL_KEYS = {
  x: {
    length: 'Width',
    position: 'Left',
  },
  y: {
    length: 'Height',
    position: 'Top',
  },
};
var ScrollHandler = class {
  constructor(callback, container) {
    this.callback = void 0;
    this.container = void 0;
    this.info = void 0;
    this.createAxis = () => ({
      current: 0,
      progress: 0,
      scrollLength: 0,
    });
    this.updateAxis = (axisName) => {
      const axis = this.info[axisName];
      const { length, position } = SCROLL_KEYS[axisName];
      axis.current = this.container[`scroll${position}`];
      axis.scrollLength = this.container['scroll' + length] - this.container['client' + length];
      axis.progress = progress(0, axis.scrollLength, axis.current);
    };
    this.update = () => {
      this.updateAxis('x');
      this.updateAxis('y');
    };
    this.sendEvent = () => {
      this.callback(this.info);
    };
    this.advance = () => {
      this.update();
      this.sendEvent();
    };
    this.callback = callback;
    this.container = container;
    this.info = {
      time: 0,
      x: this.createAxis(),
      y: this.createAxis(),
    };
  }
};
var scrollListeners = /* @__PURE__ */ new WeakMap();
var resizeListeners = /* @__PURE__ */ new WeakMap();
var onScrollHandlers = /* @__PURE__ */ new WeakMap();
var getTarget = (container) => (container === document.documentElement ? window : container);
var onScroll = (callback, { container: _container = document.documentElement } = {}) => {
  let containerHandlers = onScrollHandlers.get(_container);
  if (!containerHandlers) {
    containerHandlers = /* @__PURE__ */ new Set();
    onScrollHandlers.set(_container, containerHandlers);
  }
  const containerHandler = new ScrollHandler(callback, _container);
  containerHandlers.add(containerHandler);
  if (!scrollListeners.has(_container)) {
    const listener = () => {
      var _containerHandlers;
      (_containerHandlers = containerHandlers) == null
        ? void 0
        : _containerHandlers.forEach((handler) => handler.advance());
      return true;
    };
    scrollListeners.set(_container, listener);
    const target = getTarget(_container);
    window.addEventListener('resize', listener, {
      passive: true,
    });
    if (_container !== document.documentElement) {
      resizeListeners.set(
        _container,
        onResize(listener, {
          container: _container,
        }),
      );
    }
    target.addEventListener('scroll', listener, {
      passive: true,
    });
  }
  const animateScroll = scrollListeners.get(_container);
  raf(animateScroll);
  return () => {
    raf.cancel(animateScroll);
    const containerHandlers2 = onScrollHandlers.get(_container);
    if (!containerHandlers2) return;
    containerHandlers2.delete(containerHandler);
    if (containerHandlers2.size) return;
    const listener = scrollListeners.get(_container);
    scrollListeners.delete(_container);
    if (listener) {
      var _resizeListeners$get;
      getTarget(_container).removeEventListener('scroll', listener);
      window.removeEventListener('resize', listener);
      (_resizeListeners$get = resizeListeners.get(_container)) == null ? void 0 : _resizeListeners$get();
    }
  };
};
var useIsomorphicLayoutEffect = isSSR() ? import_react.useEffect : import_react.useLayoutEffect;
var useIsMounted = () => {
  const isMounted = (0, import_react.useRef)(false);
  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};
function useForceUpdate() {
  const update3 = (0, import_react.useState)()[1];
  const isMounted = useIsMounted();
  return () => {
    if (isMounted.current) {
      update3(Math.random());
    }
  };
}
function useMemoOne(getResult, inputs) {
  const [initial] = (0, import_react.useState)(() => ({
    inputs,
    result: getResult(),
  }));
  const committed = (0, import_react.useRef)();
  const prevCache = committed.current;
  let cache = prevCache;
  if (cache) {
    const useCache = Boolean(inputs && cache.inputs && areInputsEqual(inputs, cache.inputs));
    if (!useCache) {
      cache = {
        inputs,
        result: getResult(),
      };
    }
  } else {
    cache = initial;
  }
  (0, import_react.useEffect)(() => {
    committed.current = cache;
    if (prevCache == initial) {
      initial.inputs = initial.result = void 0;
    }
  }, [cache]);
  return cache.result;
}
function areInputsEqual(next, prev) {
  if (next.length !== prev.length) {
    return false;
  }
  for (let i2 = 0; i2 < next.length; i2++) {
    if (next[i2] !== prev[i2]) {
      return false;
    }
  }
  return true;
}
var useOnce = (effect) => (0, import_react.useEffect)(effect, emptyDeps);
var emptyDeps = [];
function usePrev(value) {
  const prevRef = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    prevRef.current = value;
  });
  return prevRef.current;
}

// ../../node_modules/@react-spring/core/dist/react-spring-core.esm.js
var React2 = __toESM(require_react());
var import_react3 = __toESM(require_react());

// ../../node_modules/@react-spring/animated/dist/react-spring-animated.esm.js
var React = __toESM(require_react());
var import_react2 = __toESM(require_react());
var $node = Symbol.for('Animated:node');
var isAnimated = (value) => !!value && value[$node] === value;
var getAnimated = (owner) => owner && owner[$node];
var setAnimated = (owner, node) => defineHidden(owner, $node, node);
var getPayload = (owner) => owner && owner[$node] && owner[$node].getPayload();
var Animated = class {
  constructor() {
    this.payload = void 0;
    setAnimated(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
};
var AnimatedValue = class extends Animated {
  constructor(_value) {
    super();
    this.done = true;
    this.elapsedTime = void 0;
    this.lastPosition = void 0;
    this.lastVelocity = void 0;
    this.v0 = void 0;
    this.durationProgress = 0;
    this._value = _value;
    if (is.num(this._value)) {
      this.lastPosition = this._value;
    }
  }
  static create(value) {
    return new AnimatedValue(value);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(value, step) {
    if (is.num(value)) {
      this.lastPosition = value;
      if (step) {
        value = Math.round(value / step) * step;
        if (this.done) {
          this.lastPosition = value;
        }
      }
    }
    if (this._value === value) {
      return false;
    }
    this._value = value;
    return true;
  }
  reset() {
    const { done } = this;
    this.done = false;
    if (is.num(this._value)) {
      this.elapsedTime = 0;
      this.durationProgress = 0;
      this.lastPosition = this._value;
      if (done) this.lastVelocity = null;
      this.v0 = null;
    }
  }
};
var AnimatedString = class extends AnimatedValue {
  constructor(value) {
    super(0);
    this._string = null;
    this._toString = void 0;
    this._toString = createInterpolator({
      output: [value, value],
    });
  }
  static create(value) {
    return new AnimatedString(value);
  }
  getValue() {
    let value = this._string;
    return value == null ? (this._string = this._toString(this._value)) : value;
  }
  setValue(value) {
    if (is.str(value)) {
      if (value == this._string) {
        return false;
      }
      this._string = value;
      this._value = 1;
    } else if (super.setValue(value)) {
      this._string = null;
    } else {
      return false;
    }
    return true;
  }
  reset(goal) {
    if (goal) {
      this._toString = createInterpolator({
        output: [this.getValue(), goal],
      });
    }
    this._value = 0;
    super.reset();
  }
};
var TreeContext = {
  dependencies: null,
};
var AnimatedObject = class extends Animated {
  constructor(source) {
    super();
    this.source = source;
    this.setValue(source);
  }
  getValue(animated2) {
    const values = {};
    eachProp(this.source, (source, key) => {
      if (isAnimated(source)) {
        values[key] = source.getValue(animated2);
      } else if (hasFluidValue(source)) {
        values[key] = getFluidValue(source);
      } else if (!animated2) {
        values[key] = source;
      }
    });
    return values;
  }
  setValue(source) {
    this.source = source;
    this.payload = this._makePayload(source);
  }
  reset() {
    if (this.payload) {
      each(this.payload, (node) => node.reset());
    }
  }
  _makePayload(source) {
    if (source) {
      const payload = /* @__PURE__ */ new Set();
      eachProp(source, this._addToPayload, payload);
      return Array.from(payload);
    }
  }
  _addToPayload(source) {
    if (TreeContext.dependencies && hasFluidValue(source)) {
      TreeContext.dependencies.add(source);
    }
    const payload = getPayload(source);
    if (payload) {
      each(payload, (node) => this.add(node));
    }
  }
};
var AnimatedArray = class extends AnimatedObject {
  constructor(source) {
    super(source);
  }
  static create(source) {
    return new AnimatedArray(source);
  }
  getValue() {
    return this.source.map((node) => node.getValue());
  }
  setValue(source) {
    const payload = this.getPayload();
    if (source.length == payload.length) {
      return payload.map((node, i2) => node.setValue(source[i2])).some(Boolean);
    }
    super.setValue(source.map(makeAnimated));
    return true;
  }
};
function makeAnimated(value) {
  const nodeType = isAnimatedString(value) ? AnimatedString : AnimatedValue;
  return nodeType.create(value);
}
function getAnimatedType(value) {
  const parentNode = getAnimated(value);
  return parentNode
    ? parentNode.constructor
    : is.arr(value)
    ? AnimatedArray
    : isAnimatedString(value)
    ? AnimatedString
    : AnimatedValue;
}
function _extends2() {
  _extends2 = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
          var source = arguments[i2];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends2.apply(this, arguments);
}
var withAnimated = (Component, host2) => {
  const hasInstance = !is.fun(Component) || (Component.prototype && Component.prototype.isReactComponent);
  return (0, import_react2.forwardRef)((givenProps, givenRef) => {
    const instanceRef = (0, import_react2.useRef)(null);
    const ref2 =
      hasInstance &&
      (0, import_react2.useCallback)(
        (value) => {
          instanceRef.current = updateRef(givenRef, value);
        },
        [givenRef],
      );
    const [props, deps] = getAnimatedState(givenProps, host2);
    const forceUpdate = useForceUpdate();
    const callback = () => {
      const instance = instanceRef.current;
      if (hasInstance && !instance) {
        return;
      }
      const didUpdate = instance ? host2.applyAnimatedValues(instance, props.getValue(true)) : false;
      if (didUpdate === false) {
        forceUpdate();
      }
    };
    const observer2 = new PropsObserver(callback, deps);
    const observerRef = (0, import_react2.useRef)();
    useIsomorphicLayoutEffect(() => {
      observerRef.current = observer2;
      each(deps, (dep) => addFluidObserver(dep, observer2));
      return () => {
        if (observerRef.current) {
          each(observerRef.current.deps, (dep) => removeFluidObserver(dep, observerRef.current));
          raf.cancel(observerRef.current.update);
        }
      };
    });
    (0, import_react2.useEffect)(callback, []);
    useOnce(() => () => {
      const observer3 = observerRef.current;
      each(observer3.deps, (dep) => removeFluidObserver(dep, observer3));
    });
    const usedProps = host2.getComponentProps(props.getValue());
    return React.createElement(
      Component,
      _extends2({}, usedProps, {
        ref: ref2,
      }),
    );
  });
};
var PropsObserver = class {
  constructor(update3, deps) {
    this.update = update3;
    this.deps = deps;
  }
  eventObserved(event) {
    if (event.type == 'change') {
      raf.write(this.update);
    }
  }
};
function getAnimatedState(props, host2) {
  const dependencies = /* @__PURE__ */ new Set();
  TreeContext.dependencies = dependencies;
  if (props.style)
    props = _extends2({}, props, {
      style: host2.createAnimatedStyle(props.style),
    });
  props = new AnimatedObject(props);
  TreeContext.dependencies = null;
  return [props, dependencies];
}
function updateRef(ref2, value) {
  if (ref2) {
    if (is.fun(ref2)) ref2(value);
    else ref2.current = value;
  }
  return value;
}
var cacheKey = Symbol.for('AnimatedComponent');
var createHost = (
  components,
  {
    applyAnimatedValues: _applyAnimatedValues = () => false,
    createAnimatedStyle: _createAnimatedStyle = (style) => new AnimatedObject(style),
    getComponentProps: _getComponentProps = (props) => props,
  } = {},
) => {
  const hostConfig = {
    applyAnimatedValues: _applyAnimatedValues,
    createAnimatedStyle: _createAnimatedStyle,
    getComponentProps: _getComponentProps,
  };
  const animated2 = (Component) => {
    const displayName = getDisplayName(Component) || 'Anonymous';
    if (is.str(Component)) {
      Component = animated2[Component] || (animated2[Component] = withAnimated(Component, hostConfig));
    } else {
      Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
    }
    Component.displayName = `Animated(${displayName})`;
    return Component;
  };
  eachProp(components, (Component, key) => {
    if (is.arr(components)) {
      key = getDisplayName(Component);
    }
    animated2[key] = animated2(Component);
  });
  return {
    animated: animated2,
  };
};
var getDisplayName = (arg) =>
  is.str(arg) ? arg : arg && is.str(arg.displayName) ? arg.displayName : (is.fun(arg) && arg.name) || null;

// ../../node_modules/@react-spring/core/dist/react-spring-core.esm.js
function _extends3() {
  _extends3 = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
          var source = arguments[i2];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends3.apply(this, arguments);
}
function callProp(value, ...args) {
  return is.fun(value) ? value(...args) : value;
}
var matchProp = (value, key) =>
  value === true || !!(key && value && (is.fun(value) ? value(key) : toArray(value).includes(key)));
var resolveProp = (prop, key) => (is.obj(prop) ? key && prop[key] : prop);
var getDefaultProp = (props, key) =>
  props.default === true ? props[key] : props.default ? props.default[key] : void 0;
var noopTransform = (value) => value;
var getDefaultProps = (props, transform = noopTransform) => {
  let keys2 = DEFAULT_PROPS;
  if (props.default && props.default !== true) {
    props = props.default;
    keys2 = Object.keys(props);
  }
  const defaults2 = {};
  for (const key of keys2) {
    const value = transform(props[key], key);
    if (!is.und(value)) {
      defaults2[key] = value;
    }
  }
  return defaults2;
};
var DEFAULT_PROPS = ['config', 'onProps', 'onStart', 'onChange', 'onPause', 'onResume', 'onRest'];
var RESERVED_PROPS = {
  config: 1,
  from: 1,
  to: 1,
  ref: 1,
  loop: 1,
  reset: 1,
  pause: 1,
  cancel: 1,
  reverse: 1,
  immediate: 1,
  default: 1,
  delay: 1,
  onProps: 1,
  onStart: 1,
  onChange: 1,
  onPause: 1,
  onResume: 1,
  onRest: 1,
  onResolve: 1,
  items: 1,
  trail: 1,
  sort: 1,
  expires: 1,
  initial: 1,
  enter: 1,
  update: 1,
  leave: 1,
  children: 1,
  onDestroyed: 1,
  keys: 1,
  callId: 1,
  parentId: 1,
};
function getForwardProps(props) {
  const forward = {};
  let count = 0;
  eachProp(props, (value, prop) => {
    if (!RESERVED_PROPS[prop]) {
      forward[prop] = value;
      count++;
    }
  });
  if (count) {
    return forward;
  }
}
function inferTo(props) {
  const to2 = getForwardProps(props);
  if (to2) {
    const out = {
      to: to2,
    };
    eachProp(props, (val, key) => key in to2 || (out[key] = val));
    return out;
  }
  return _extends3({}, props);
}
function computeGoal(value) {
  value = getFluidValue(value);
  return is.arr(value)
    ? value.map(computeGoal)
    : isAnimatedString(value)
    ? globals.createStringInterpolator({
        range: [0, 1],
        output: [value, value],
      })(1)
    : value;
}
function hasProps(props) {
  for (const _ in props) return true;
  return false;
}
function isAsyncTo(to2) {
  return is.fun(to2) || (is.arr(to2) && is.obj(to2[0]));
}
function detachRefs(ctrl, ref2) {
  var _ctrl$ref;
  (_ctrl$ref = ctrl.ref) == null ? void 0 : _ctrl$ref.delete(ctrl);
  ref2 == null ? void 0 : ref2.delete(ctrl);
}
function replaceRef(ctrl, ref2) {
  if (ref2 && ctrl.ref !== ref2) {
    var _ctrl$ref2;
    (_ctrl$ref2 = ctrl.ref) == null ? void 0 : _ctrl$ref2.delete(ctrl);
    ref2.add(ctrl);
    ctrl.ref = ref2;
  }
}
var config = {
  default: {
    tension: 170,
    friction: 26,
  },
  gentle: {
    tension: 120,
    friction: 14,
  },
  wobbly: {
    tension: 180,
    friction: 12,
  },
  stiff: {
    tension: 210,
    friction: 20,
  },
  slow: {
    tension: 280,
    friction: 60,
  },
  molasses: {
    tension: 280,
    friction: 120,
  },
};
var defaults = _extends3({}, config.default, {
  mass: 1,
  damping: 1,
  easing: easings.linear,
  clamp: false,
});
var AnimationConfig = class {
  constructor() {
    this.tension = void 0;
    this.friction = void 0;
    this.frequency = void 0;
    this.damping = void 0;
    this.mass = void 0;
    this.velocity = 0;
    this.restVelocity = void 0;
    this.precision = void 0;
    this.progress = void 0;
    this.duration = void 0;
    this.easing = void 0;
    this.clamp = void 0;
    this.bounce = void 0;
    this.decay = void 0;
    this.round = void 0;
    Object.assign(this, defaults);
  }
};
function mergeConfig(config2, newConfig, defaultConfig) {
  if (defaultConfig) {
    defaultConfig = _extends3({}, defaultConfig);
    sanitizeConfig(defaultConfig, newConfig);
    newConfig = _extends3({}, defaultConfig, newConfig);
  }
  sanitizeConfig(config2, newConfig);
  Object.assign(config2, newConfig);
  for (const key in defaults) {
    if (config2[key] == null) {
      config2[key] = defaults[key];
    }
  }
  let { mass, frequency, damping } = config2;
  if (!is.und(frequency)) {
    if (frequency < 0.01) frequency = 0.01;
    if (damping < 0) damping = 0;
    config2.tension = Math.pow((2 * Math.PI) / frequency, 2) * mass;
    config2.friction = (4 * Math.PI * damping * mass) / frequency;
  }
  return config2;
}
function sanitizeConfig(config2, props) {
  if (!is.und(props.decay)) {
    config2.duration = void 0;
  } else {
    const isTensionConfig = !is.und(props.tension) || !is.und(props.friction);
    if (isTensionConfig || !is.und(props.frequency) || !is.und(props.damping) || !is.und(props.mass)) {
      config2.duration = void 0;
      config2.decay = void 0;
    }
    if (isTensionConfig) {
      config2.frequency = void 0;
    }
  }
}
var emptyArray = [];
var Animation = class {
  constructor() {
    this.changed = false;
    this.values = emptyArray;
    this.toValues = null;
    this.fromValues = emptyArray;
    this.to = void 0;
    this.from = void 0;
    this.config = new AnimationConfig();
    this.immediate = false;
  }
};
function scheduleProps(callId, { key, props, defaultProps, state, actions }) {
  return new Promise((resolve, reject) => {
    var _props$cancel;
    let delay;
    let timeout;
    let cancel = matchProp(
      (_props$cancel = props.cancel) != null ? _props$cancel : defaultProps == null ? void 0 : defaultProps.cancel,
      key,
    );
    if (cancel) {
      onStart();
    } else {
      if (!is.und(props.pause)) {
        state.paused = matchProp(props.pause, key);
      }
      let pause = defaultProps == null ? void 0 : defaultProps.pause;
      if (pause !== true) {
        pause = state.paused || matchProp(pause, key);
      }
      delay = callProp(props.delay || 0, key);
      if (pause) {
        state.resumeQueue.add(onResume);
        actions.pause();
      } else {
        actions.resume();
        onResume();
      }
    }
    function onPause() {
      state.resumeQueue.add(onResume);
      state.timeouts.delete(timeout);
      timeout.cancel();
      delay = timeout.time - raf.now();
    }
    function onResume() {
      if (delay > 0 && !globals.skipAnimation) {
        state.delayed = true;
        timeout = raf.setTimeout(onStart, delay);
        state.pauseQueue.add(onPause);
        state.timeouts.add(timeout);
      } else {
        onStart();
      }
    }
    function onStart() {
      if (state.delayed) {
        state.delayed = false;
      }
      state.pauseQueue.delete(onPause);
      state.timeouts.delete(timeout);
      if (callId <= (state.cancelId || 0)) {
        cancel = true;
      }
      try {
        actions.start(
          _extends3({}, props, {
            callId,
            cancel,
          }),
          resolve,
        );
      } catch (err) {
        reject(err);
      }
    }
  });
}
var getCombinedResult = (target, results) =>
  results.length == 1
    ? results[0]
    : results.some((result) => result.cancelled)
    ? getCancelledResult(target.get())
    : results.every((result) => result.noop)
    ? getNoopResult(target.get())
    : getFinishedResult(
        target.get(),
        results.every((result) => result.finished),
      );
var getNoopResult = (value) => ({
  value,
  noop: true,
  finished: true,
  cancelled: false,
});
var getFinishedResult = (value, finished, cancelled = false) => ({
  value,
  finished,
  cancelled,
});
var getCancelledResult = (value) => ({
  value,
  cancelled: true,
  finished: false,
});
function runAsync(to2, props, state, target) {
  const { callId, parentId, onRest } = props;
  const { asyncTo: prevTo, promise: prevPromise } = state;
  if (!parentId && to2 === prevTo && !props.reset) {
    return prevPromise;
  }
  return (state.promise = (async () => {
    state.asyncId = callId;
    state.asyncTo = to2;
    const defaultProps = getDefaultProps(props, (value, key) => (key === 'onRest' ? void 0 : value));
    let preventBail;
    let bail;
    const bailPromise = new Promise((resolve, reject) => ((preventBail = resolve), (bail = reject)));
    const bailIfEnded = (bailSignal) => {
      const bailResult =
        (callId <= (state.cancelId || 0) && getCancelledResult(target)) ||
        (callId !== state.asyncId && getFinishedResult(target, false));
      if (bailResult) {
        bailSignal.result = bailResult;
        bail(bailSignal);
        throw bailSignal;
      }
    };
    const animate = (arg1, arg2) => {
      const bailSignal = new BailSignal();
      const skipAnimationSignal = new SkipAnimationSignal();
      return (async () => {
        if (globals.skipAnimation) {
          stopAsync(state);
          skipAnimationSignal.result = getFinishedResult(target, false);
          bail(skipAnimationSignal);
          throw skipAnimationSignal;
        }
        bailIfEnded(bailSignal);
        const props2 = is.obj(arg1)
          ? _extends3({}, arg1)
          : _extends3({}, arg2, {
              to: arg1,
            });
        props2.parentId = callId;
        eachProp(defaultProps, (value, key) => {
          if (is.und(props2[key])) {
            props2[key] = value;
          }
        });
        const result2 = await target.start(props2);
        bailIfEnded(bailSignal);
        if (state.paused) {
          await new Promise((resume) => {
            state.resumeQueue.add(resume);
          });
        }
        return result2;
      })();
    };
    let result;
    if (globals.skipAnimation) {
      stopAsync(state);
      return getFinishedResult(target, false);
    }
    try {
      let animating;
      if (is.arr(to2)) {
        animating = (async (queue) => {
          for (const props2 of queue) {
            await animate(props2);
          }
        })(to2);
      } else {
        animating = Promise.resolve(to2(animate, target.stop.bind(target)));
      }
      await Promise.all([animating.then(preventBail), bailPromise]);
      result = getFinishedResult(target.get(), true, false);
    } catch (err) {
      if (err instanceof BailSignal) {
        result = err.result;
      } else if (err instanceof SkipAnimationSignal) {
        result = err.result;
      } else {
        throw err;
      }
    } finally {
      if (callId == state.asyncId) {
        state.asyncId = parentId;
        state.asyncTo = parentId ? prevTo : void 0;
        state.promise = parentId ? prevPromise : void 0;
      }
    }
    if (is.fun(onRest)) {
      raf.batchedUpdates(() => {
        onRest(result, target, target.item);
      });
    }
    return result;
  })());
}
function stopAsync(state, cancelId) {
  flush(state.timeouts, (t2) => t2.cancel());
  state.pauseQueue.clear();
  state.resumeQueue.clear();
  state.asyncId = state.asyncTo = state.promise = void 0;
  if (cancelId) state.cancelId = cancelId;
}
var BailSignal = class extends Error {
  constructor() {
    super(
      'An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise.',
    );
    this.result = void 0;
  }
};
var SkipAnimationSignal = class extends Error {
  constructor() {
    super('SkipAnimationSignal');
    this.result = void 0;
  }
};
var isFrameValue = (value) => value instanceof FrameValue;
var nextId$1 = 1;
var FrameValue = class extends FluidValue {
  constructor(...args) {
    super(...args);
    this.id = nextId$1++;
    this.key = void 0;
    this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(priority2) {
    if (this._priority != priority2) {
      this._priority = priority2;
      this._onPriorityChange(priority2);
    }
  }
  get() {
    const node = getAnimated(this);
    return node && node.getValue();
  }
  to(...args) {
    return globals.to(this, args);
  }
  interpolate(...args) {
    deprecateInterpolate();
    return globals.to(this, args);
  }
  toJSON() {
    return this.get();
  }
  observerAdded(count) {
    if (count == 1) this._attach();
  }
  observerRemoved(count) {
    if (count == 0) this._detach();
  }
  _attach() {}
  _detach() {}
  _onChange(value, idle = false) {
    callFluidObservers(this, {
      type: 'change',
      parent: this,
      value,
      idle,
    });
  }
  _onPriorityChange(priority2) {
    if (!this.idle) {
      frameLoop.sort(this);
    }
    callFluidObservers(this, {
      type: 'priority',
      parent: this,
      priority: priority2,
    });
  }
};
var $P = Symbol.for('SpringPhase');
var HAS_ANIMATED = 1;
var IS_ANIMATING = 2;
var IS_PAUSED = 4;
var hasAnimated = (target) => (target[$P] & HAS_ANIMATED) > 0;
var isAnimating = (target) => (target[$P] & IS_ANIMATING) > 0;
var isPaused = (target) => (target[$P] & IS_PAUSED) > 0;
var setActiveBit = (target, active) =>
  active ? (target[$P] |= IS_ANIMATING | HAS_ANIMATED) : (target[$P] &= ~IS_ANIMATING);
var setPausedBit = (target, paused) => (paused ? (target[$P] |= IS_PAUSED) : (target[$P] &= ~IS_PAUSED));
var SpringValue = class extends FrameValue {
  constructor(arg1, arg2) {
    super();
    this.key = void 0;
    this.animation = new Animation();
    this.queue = void 0;
    this.defaultProps = {};
    this._state = {
      paused: false,
      delayed: false,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set(),
    };
    this._pendingCalls = /* @__PURE__ */ new Set();
    this._lastCallId = 0;
    this._lastToId = 0;
    this._memoizedDuration = 0;
    if (!is.und(arg1) || !is.und(arg2)) {
      const props = is.obj(arg1)
        ? _extends3({}, arg1)
        : _extends3({}, arg2, {
            from: arg1,
          });
      if (is.und(props.default)) {
        props.default = true;
      }
      this.start(props);
    }
  }
  get idle() {
    return !(isAnimating(this) || this._state.asyncTo) || isPaused(this);
  }
  get goal() {
    return getFluidValue(this.animation.to);
  }
  get velocity() {
    const node = getAnimated(this);
    return node instanceof AnimatedValue
      ? node.lastVelocity || 0
      : node.getPayload().map((node2) => node2.lastVelocity || 0);
  }
  get hasAnimated() {
    return hasAnimated(this);
  }
  get isAnimating() {
    return isAnimating(this);
  }
  get isPaused() {
    return isPaused(this);
  }
  get isDelayed() {
    return this._state.delayed;
  }
  advance(dt) {
    let idle = true;
    let changed = false;
    const anim = this.animation;
    let { config: config2, toValues } = anim;
    const payload = getPayload(anim.to);
    if (!payload && hasFluidValue(anim.to)) {
      toValues = toArray(getFluidValue(anim.to));
    }
    anim.values.forEach((node2, i2) => {
      if (node2.done) return;
      const to2 = node2.constructor == AnimatedString ? 1 : payload ? payload[i2].lastPosition : toValues[i2];
      let finished = anim.immediate;
      let position = to2;
      if (!finished) {
        position = node2.lastPosition;
        if (config2.tension <= 0) {
          node2.done = true;
          return;
        }
        let elapsed = (node2.elapsedTime += dt);
        const from = anim.fromValues[i2];
        const v0 =
          node2.v0 != null ? node2.v0 : (node2.v0 = is.arr(config2.velocity) ? config2.velocity[i2] : config2.velocity);
        let velocity;
        const precision = config2.precision || (from == to2 ? 5e-3 : Math.min(1, Math.abs(to2 - from) * 1e-3));
        if (!is.und(config2.duration)) {
          let p2 = 1;
          if (config2.duration > 0) {
            if (this._memoizedDuration !== config2.duration) {
              this._memoizedDuration = config2.duration;
              if (node2.durationProgress > 0) {
                node2.elapsedTime = config2.duration * node2.durationProgress;
                elapsed = node2.elapsedTime += dt;
              }
            }
            p2 = (config2.progress || 0) + elapsed / this._memoizedDuration;
            p2 = p2 > 1 ? 1 : p2 < 0 ? 0 : p2;
            node2.durationProgress = p2;
          }
          position = from + config2.easing(p2) * (to2 - from);
          velocity = (position - node2.lastPosition) / dt;
          finished = p2 == 1;
        } else if (config2.decay) {
          const decay = config2.decay === true ? 0.998 : config2.decay;
          const e2 = Math.exp(-(1 - decay) * elapsed);
          position = from + (v0 / (1 - decay)) * (1 - e2);
          finished = Math.abs(node2.lastPosition - position) <= precision;
          velocity = v0 * e2;
        } else {
          velocity = node2.lastVelocity == null ? v0 : node2.lastVelocity;
          const restVelocity = config2.restVelocity || precision / 10;
          const bounceFactor = config2.clamp ? 0 : config2.bounce;
          const canBounce = !is.und(bounceFactor);
          const isGrowing = from == to2 ? node2.v0 > 0 : from < to2;
          let isMoving;
          let isBouncing = false;
          const step = 1;
          const numSteps = Math.ceil(dt / step);
          for (let n2 = 0; n2 < numSteps; ++n2) {
            isMoving = Math.abs(velocity) > restVelocity;
            if (!isMoving) {
              finished = Math.abs(to2 - position) <= precision;
              if (finished) {
                break;
              }
            }
            if (canBounce) {
              isBouncing = position == to2 || position > to2 == isGrowing;
              if (isBouncing) {
                velocity = -velocity * bounceFactor;
                position = to2;
              }
            }
            const springForce = -config2.tension * 1e-6 * (position - to2);
            const dampingForce = -config2.friction * 1e-3 * velocity;
            const acceleration = (springForce + dampingForce) / config2.mass;
            velocity = velocity + acceleration * step;
            position = position + velocity * step;
          }
        }
        node2.lastVelocity = velocity;
        if (Number.isNaN(position)) {
          console.warn(`Got NaN while animating:`, this);
          finished = true;
        }
      }
      if (payload && !payload[i2].done) {
        finished = false;
      }
      if (finished) {
        node2.done = true;
      } else {
        idle = false;
      }
      if (node2.setValue(position, config2.round)) {
        changed = true;
      }
    });
    const node = getAnimated(this);
    const currVal = node.getValue();
    if (idle) {
      const finalVal = getFluidValue(anim.to);
      if ((currVal !== finalVal || changed) && !config2.decay) {
        node.setValue(finalVal);
        this._onChange(finalVal);
      } else if (changed && config2.decay) {
        this._onChange(currVal);
      }
      this._stop();
    } else if (changed) {
      this._onChange(currVal);
    }
  }
  set(value) {
    raf.batchedUpdates(() => {
      this._stop();
      this._focus(value);
      this._set(value);
    });
    return this;
  }
  pause() {
    this._update({
      pause: true,
    });
  }
  resume() {
    this._update({
      pause: false,
    });
  }
  finish() {
    if (isAnimating(this)) {
      const { to: to2, config: config2 } = this.animation;
      raf.batchedUpdates(() => {
        this._onStart();
        if (!config2.decay) {
          this._set(to2, false);
        }
        this._stop();
      });
    }
    return this;
  }
  update(props) {
    const queue = this.queue || (this.queue = []);
    queue.push(props);
    return this;
  }
  start(to2, arg2) {
    let queue;
    if (!is.und(to2)) {
      queue = [
        is.obj(to2)
          ? to2
          : _extends3({}, arg2, {
              to: to2,
            }),
      ];
    } else {
      queue = this.queue || [];
      this.queue = [];
    }
    return Promise.all(
      queue.map((props) => {
        const up = this._update(props);
        return up;
      }),
    ).then((results) => getCombinedResult(this, results));
  }
  stop(cancel) {
    const { to: to2 } = this.animation;
    this._focus(this.get());
    stopAsync(this._state, cancel && this._lastCallId);
    raf.batchedUpdates(() => this._stop(to2, cancel));
    return this;
  }
  reset() {
    this._update({
      reset: true,
    });
  }
  eventObserved(event) {
    if (event.type == 'change') {
      this._start();
    } else if (event.type == 'priority') {
      this.priority = event.priority + 1;
    }
  }
  _prepareNode(props) {
    const key = this.key || '';
    let { to: to2, from } = props;
    to2 = is.obj(to2) ? to2[key] : to2;
    if (to2 == null || isAsyncTo(to2)) {
      to2 = void 0;
    }
    from = is.obj(from) ? from[key] : from;
    if (from == null) {
      from = void 0;
    }
    const range = {
      to: to2,
      from,
    };
    if (!hasAnimated(this)) {
      if (props.reverse) [to2, from] = [from, to2];
      from = getFluidValue(from);
      if (!is.und(from)) {
        this._set(from);
      } else if (!getAnimated(this)) {
        this._set(to2);
      }
    }
    return range;
  }
  _update(_ref, isLoop) {
    let props = _extends3({}, _ref);
    const { key, defaultProps } = this;
    if (props.default)
      Object.assign(
        defaultProps,
        getDefaultProps(props, (value, prop) => (/^on/.test(prop) ? resolveProp(value, key) : value)),
      );
    mergeActiveFn(this, props, 'onProps');
    sendEvent(this, 'onProps', props, this);
    const range = this._prepareNode(props);
    if (Object.isFrozen(this)) {
      throw Error(
        'Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?',
      );
    }
    const state = this._state;
    return scheduleProps(++this._lastCallId, {
      key,
      props,
      defaultProps,
      state,
      actions: {
        pause: () => {
          if (!isPaused(this)) {
            setPausedBit(this, true);
            flushCalls(state.pauseQueue);
            sendEvent(this, 'onPause', getFinishedResult(this, checkFinished(this, this.animation.to)), this);
          }
        },
        resume: () => {
          if (isPaused(this)) {
            setPausedBit(this, false);
            if (isAnimating(this)) {
              this._resume();
            }
            flushCalls(state.resumeQueue);
            sendEvent(this, 'onResume', getFinishedResult(this, checkFinished(this, this.animation.to)), this);
          }
        },
        start: this._merge.bind(this, range),
      },
    }).then((result) => {
      if (props.loop && result.finished && !(isLoop && result.noop)) {
        const nextProps = createLoopUpdate(props);
        if (nextProps) {
          return this._update(nextProps, true);
        }
      }
      return result;
    });
  }
  _merge(range, props, resolve) {
    if (props.cancel) {
      this.stop(true);
      return resolve(getCancelledResult(this));
    }
    const hasToProp = !is.und(range.to);
    const hasFromProp = !is.und(range.from);
    if (hasToProp || hasFromProp) {
      if (props.callId > this._lastToId) {
        this._lastToId = props.callId;
      } else {
        return resolve(getCancelledResult(this));
      }
    }
    const { key, defaultProps, animation: anim } = this;
    const { to: prevTo, from: prevFrom } = anim;
    let { to: to2 = prevTo, from = prevFrom } = range;
    if (hasFromProp && !hasToProp && (!props.default || is.und(to2))) {
      to2 = from;
    }
    if (props.reverse) [to2, from] = [from, to2];
    const hasFromChanged = !isEqual(from, prevFrom);
    if (hasFromChanged) {
      anim.from = from;
    }
    from = getFluidValue(from);
    const hasToChanged = !isEqual(to2, prevTo);
    if (hasToChanged) {
      this._focus(to2);
    }
    const hasAsyncTo = isAsyncTo(props.to);
    const { config: config2 } = anim;
    const { decay, velocity } = config2;
    if (hasToProp || hasFromProp) {
      config2.velocity = 0;
    }
    if (props.config && !hasAsyncTo) {
      mergeConfig(
        config2,
        callProp(props.config, key),
        props.config !== defaultProps.config ? callProp(defaultProps.config, key) : void 0,
      );
    }
    let node = getAnimated(this);
    if (!node || is.und(to2)) {
      return resolve(getFinishedResult(this, true));
    }
    const reset = is.und(props.reset) ? hasFromProp && !props.default : !is.und(from) && matchProp(props.reset, key);
    const value = reset ? from : this.get();
    const goal = computeGoal(to2);
    const isAnimatable = is.num(goal) || is.arr(goal) || isAnimatedString(goal);
    const immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps.immediate || props.immediate, key));
    if (hasToChanged) {
      const nodeType = getAnimatedType(to2);
      if (nodeType !== node.constructor) {
        if (immediate) {
          node = this._set(goal);
        } else
          throw Error(
            `Cannot animate between ${node.constructor.name} and ${nodeType.name}, as the "to" prop suggests`,
          );
      }
    }
    const goalType = node.constructor;
    let started = hasFluidValue(to2);
    let finished = false;
    if (!started) {
      const hasValueChanged = reset || (!hasAnimated(this) && hasFromChanged);
      if (hasToChanged || hasValueChanged) {
        finished = isEqual(computeGoal(value), goal);
        started = !finished;
      }
      if (
        (!isEqual(anim.immediate, immediate) && !immediate) ||
        !isEqual(config2.decay, decay) ||
        !isEqual(config2.velocity, velocity)
      ) {
        started = true;
      }
    }
    if (finished && isAnimating(this)) {
      if (anim.changed && !reset) {
        started = true;
      } else if (!started) {
        this._stop(prevTo);
      }
    }
    if (!hasAsyncTo) {
      if (started || hasFluidValue(prevTo)) {
        anim.values = node.getPayload();
        anim.toValues = hasFluidValue(to2) ? null : goalType == AnimatedString ? [1] : toArray(goal);
      }
      if (anim.immediate != immediate) {
        anim.immediate = immediate;
        if (!immediate && !reset) {
          this._set(prevTo);
        }
      }
      if (started) {
        const { onRest } = anim;
        each(ACTIVE_EVENTS, (type) => mergeActiveFn(this, props, type));
        const result = getFinishedResult(this, checkFinished(this, prevTo));
        flushCalls(this._pendingCalls, result);
        this._pendingCalls.add(resolve);
        if (anim.changed)
          raf.batchedUpdates(() => {
            anim.changed = !reset;
            onRest == null ? void 0 : onRest(result, this);
            if (reset) {
              callProp(defaultProps.onRest, result);
            } else {
              anim.onStart == null ? void 0 : anim.onStart(result, this);
            }
          });
      }
    }
    if (reset) {
      this._set(value);
    }
    if (hasAsyncTo) {
      resolve(runAsync(props.to, props, this._state, this));
    } else if (started) {
      this._start();
    } else if (isAnimating(this) && !hasToChanged) {
      this._pendingCalls.add(resolve);
    } else {
      resolve(getNoopResult(value));
    }
  }
  _focus(value) {
    const anim = this.animation;
    if (value !== anim.to) {
      if (getFluidObservers(this)) {
        this._detach();
      }
      anim.to = value;
      if (getFluidObservers(this)) {
        this._attach();
      }
    }
  }
  _attach() {
    let priority2 = 0;
    const { to: to2 } = this.animation;
    if (hasFluidValue(to2)) {
      addFluidObserver(to2, this);
      if (isFrameValue(to2)) {
        priority2 = to2.priority + 1;
      }
    }
    this.priority = priority2;
  }
  _detach() {
    const { to: to2 } = this.animation;
    if (hasFluidValue(to2)) {
      removeFluidObserver(to2, this);
    }
  }
  _set(arg, idle = true) {
    const value = getFluidValue(arg);
    if (!is.und(value)) {
      const oldNode = getAnimated(this);
      if (!oldNode || !isEqual(value, oldNode.getValue())) {
        const nodeType = getAnimatedType(value);
        if (!oldNode || oldNode.constructor != nodeType) {
          setAnimated(this, nodeType.create(value));
        } else {
          oldNode.setValue(value);
        }
        if (oldNode) {
          raf.batchedUpdates(() => {
            this._onChange(value, idle);
          });
        }
      }
    }
    return getAnimated(this);
  }
  _onStart() {
    const anim = this.animation;
    if (!anim.changed) {
      anim.changed = true;
      sendEvent(this, 'onStart', getFinishedResult(this, checkFinished(this, anim.to)), this);
    }
  }
  _onChange(value, idle) {
    if (!idle) {
      this._onStart();
      callProp(this.animation.onChange, value, this);
    }
    callProp(this.defaultProps.onChange, value, this);
    super._onChange(value, idle);
  }
  _start() {
    const anim = this.animation;
    getAnimated(this).reset(getFluidValue(anim.to));
    if (!anim.immediate) {
      anim.fromValues = anim.values.map((node) => node.lastPosition);
    }
    if (!isAnimating(this)) {
      setActiveBit(this, true);
      if (!isPaused(this)) {
        this._resume();
      }
    }
  }
  _resume() {
    if (globals.skipAnimation) {
      this.finish();
    } else {
      frameLoop.start(this);
    }
  }
  _stop(goal, cancel) {
    if (isAnimating(this)) {
      setActiveBit(this, false);
      const anim = this.animation;
      each(anim.values, (node) => {
        node.done = true;
      });
      if (anim.toValues) {
        anim.onChange = anim.onPause = anim.onResume = void 0;
      }
      callFluidObservers(this, {
        type: 'idle',
        parent: this,
      });
      const result = cancel
        ? getCancelledResult(this.get())
        : getFinishedResult(this.get(), checkFinished(this, goal != null ? goal : anim.to));
      flushCalls(this._pendingCalls, result);
      if (anim.changed) {
        anim.changed = false;
        sendEvent(this, 'onRest', result, this);
      }
    }
  }
};
function checkFinished(target, to2) {
  const goal = computeGoal(to2);
  const value = computeGoal(target.get());
  return isEqual(value, goal);
}
function createLoopUpdate(props, loop2 = props.loop, to2 = props.to) {
  let loopRet = callProp(loop2);
  if (loopRet) {
    const overrides = loopRet !== true && inferTo(loopRet);
    const reverse = (overrides || props).reverse;
    const reset = !overrides || overrides.reset;
    return createUpdate(
      _extends3(
        {},
        props,
        {
          loop: loop2,
          default: false,
          pause: void 0,
          to: !reverse || isAsyncTo(to2) ? to2 : void 0,
          from: reset ? props.from : void 0,
          reset,
        },
        overrides,
      ),
    );
  }
}
function createUpdate(props) {
  const { to: to2, from } = (props = inferTo(props));
  const keys2 = /* @__PURE__ */ new Set();
  if (is.obj(to2)) findDefined(to2, keys2);
  if (is.obj(from)) findDefined(from, keys2);
  props.keys = keys2.size ? Array.from(keys2) : null;
  return props;
}
function declareUpdate(props) {
  const update3 = createUpdate(props);
  if (is.und(update3.default)) {
    update3.default = getDefaultProps(update3);
  }
  return update3;
}
function findDefined(values, keys2) {
  eachProp(values, (value, key) => value != null && keys2.add(key));
}
var ACTIVE_EVENTS = ['onStart', 'onRest', 'onChange', 'onPause', 'onResume'];
function mergeActiveFn(target, props, type) {
  target.animation[type] = props[type] !== getDefaultProp(props, type) ? resolveProp(props[type], target.key) : void 0;
}
function sendEvent(target, type, ...args) {
  var _target$animation$typ, _target$animation, _target$defaultProps$, _target$defaultProps;
  (_target$animation$typ = (_target$animation = target.animation)[type]) == null
    ? void 0
    : _target$animation$typ.call(_target$animation, ...args);
  (_target$defaultProps$ = (_target$defaultProps = target.defaultProps)[type]) == null
    ? void 0
    : _target$defaultProps$.call(_target$defaultProps, ...args);
}
var BATCHED_EVENTS = ['onStart', 'onChange', 'onRest'];
var nextId = 1;
var Controller = class {
  constructor(props, flush2) {
    this.id = nextId++;
    this.springs = {};
    this.queue = [];
    this.ref = void 0;
    this._flush = void 0;
    this._initialProps = void 0;
    this._lastAsyncId = 0;
    this._active = /* @__PURE__ */ new Set();
    this._changed = /* @__PURE__ */ new Set();
    this._started = false;
    this._item = void 0;
    this._state = {
      paused: false,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set(),
    };
    this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map(),
    };
    this._onFrame = this._onFrame.bind(this);
    if (flush2) {
      this._flush = flush2;
    }
    if (props) {
      this.start(
        _extends3(
          {
            default: true,
          },
          props,
        ),
      );
    }
  }
  get idle() {
    return (
      !this._state.asyncTo &&
      Object.values(this.springs).every((spring) => {
        return spring.idle && !spring.isDelayed && !spring.isPaused;
      })
    );
  }
  get item() {
    return this._item;
  }
  set item(item) {
    this._item = item;
  }
  get() {
    const values = {};
    this.each((spring, key) => (values[key] = spring.get()));
    return values;
  }
  set(values) {
    for (const key in values) {
      const value = values[key];
      if (!is.und(value)) {
        this.springs[key].set(value);
      }
    }
  }
  update(props) {
    if (props) {
      this.queue.push(createUpdate(props));
    }
    return this;
  }
  start(props) {
    let { queue } = this;
    if (props) {
      queue = toArray(props).map(createUpdate);
    } else {
      this.queue = [];
    }
    if (this._flush) {
      return this._flush(this, queue);
    }
    prepareKeys(this, queue);
    return flushUpdateQueue(this, queue);
  }
  stop(arg, keys2) {
    if (arg !== !!arg) {
      keys2 = arg;
    }
    if (keys2) {
      const springs = this.springs;
      each(toArray(keys2), (key) => springs[key].stop(!!arg));
    } else {
      stopAsync(this._state, this._lastAsyncId);
      this.each((spring) => spring.stop(!!arg));
    }
    return this;
  }
  pause(keys2) {
    if (is.und(keys2)) {
      this.start({
        pause: true,
      });
    } else {
      const springs = this.springs;
      each(toArray(keys2), (key) => springs[key].pause());
    }
    return this;
  }
  resume(keys2) {
    if (is.und(keys2)) {
      this.start({
        pause: false,
      });
    } else {
      const springs = this.springs;
      each(toArray(keys2), (key) => springs[key].resume());
    }
    return this;
  }
  each(iterator) {
    eachProp(this.springs, iterator);
  }
  _onFrame() {
    const { onStart, onChange, onRest } = this._events;
    const active = this._active.size > 0;
    const changed = this._changed.size > 0;
    if ((active && !this._started) || (changed && !this._started)) {
      this._started = true;
      flush(onStart, ([onStart2, result]) => {
        result.value = this.get();
        onStart2(result, this, this._item);
      });
    }
    const idle = !active && this._started;
    const values = changed || (idle && onRest.size) ? this.get() : null;
    if (changed && onChange.size) {
      flush(onChange, ([onChange2, result]) => {
        result.value = values;
        onChange2(result, this, this._item);
      });
    }
    if (idle) {
      this._started = false;
      flush(onRest, ([onRest2, result]) => {
        result.value = values;
        onRest2(result, this, this._item);
      });
    }
  }
  eventObserved(event) {
    if (event.type == 'change') {
      this._changed.add(event.parent);
      if (!event.idle) {
        this._active.add(event.parent);
      }
    } else if (event.type == 'idle') {
      this._active.delete(event.parent);
    } else return;
    raf.onFrame(this._onFrame);
  }
};
function flushUpdateQueue(ctrl, queue) {
  return Promise.all(queue.map((props) => flushUpdate(ctrl, props))).then((results) =>
    getCombinedResult(ctrl, results),
  );
}
async function flushUpdate(ctrl, props, isLoop) {
  const { keys: keys2, to: to2, from, loop: loop2, onRest, onResolve } = props;
  const defaults2 = is.obj(props.default) && props.default;
  if (loop2) {
    props.loop = false;
  }
  if (to2 === false) props.to = null;
  if (from === false) props.from = null;
  const asyncTo = is.arr(to2) || is.fun(to2) ? to2 : void 0;
  if (asyncTo) {
    props.to = void 0;
    props.onRest = void 0;
    if (defaults2) {
      defaults2.onRest = void 0;
    }
  } else {
    each(BATCHED_EVENTS, (key) => {
      const handler = props[key];
      if (is.fun(handler)) {
        const queue = ctrl['_events'][key];
        props[key] = ({ finished, cancelled }) => {
          const result2 = queue.get(handler);
          if (result2) {
            if (!finished) result2.finished = false;
            if (cancelled) result2.cancelled = true;
          } else {
            queue.set(handler, {
              value: null,
              finished: finished || false,
              cancelled: cancelled || false,
            });
          }
        };
        if (defaults2) {
          defaults2[key] = props[key];
        }
      }
    });
  }
  const state = ctrl['_state'];
  if (props.pause === !state.paused) {
    state.paused = props.pause;
    flushCalls(props.pause ? state.pauseQueue : state.resumeQueue);
  } else if (state.paused) {
    props.pause = true;
  }
  const promises = (keys2 || Object.keys(ctrl.springs)).map((key) => ctrl.springs[key].start(props));
  const cancel = props.cancel === true || getDefaultProp(props, 'cancel') === true;
  if (asyncTo || (cancel && state.asyncId)) {
    promises.push(
      scheduleProps(++ctrl['_lastAsyncId'], {
        props,
        state,
        actions: {
          pause: noop,
          resume: noop,
          start(props2, resolve) {
            if (cancel) {
              stopAsync(state, ctrl['_lastAsyncId']);
              resolve(getCancelledResult(ctrl));
            } else {
              props2.onRest = onRest;
              resolve(runAsync(asyncTo, props2, state, ctrl));
            }
          },
        },
      }),
    );
  }
  if (state.paused) {
    await new Promise((resume) => {
      state.resumeQueue.add(resume);
    });
  }
  const result = getCombinedResult(ctrl, await Promise.all(promises));
  if (loop2 && result.finished && !(isLoop && result.noop)) {
    const nextProps = createLoopUpdate(props, loop2, to2);
    if (nextProps) {
      prepareKeys(ctrl, [nextProps]);
      return flushUpdate(ctrl, nextProps, true);
    }
  }
  if (onResolve) {
    raf.batchedUpdates(() => onResolve(result, ctrl, ctrl.item));
  }
  return result;
}
function getSprings(ctrl, props) {
  const springs = _extends3({}, ctrl.springs);
  if (props) {
    each(toArray(props), (props2) => {
      if (is.und(props2.keys)) {
        props2 = createUpdate(props2);
      }
      if (!is.obj(props2.to)) {
        props2 = _extends3({}, props2, {
          to: void 0,
        });
      }
      prepareSprings(springs, props2, (key) => {
        return createSpring(key);
      });
    });
  }
  setSprings(ctrl, springs);
  return springs;
}
function setSprings(ctrl, springs) {
  eachProp(springs, (spring, key) => {
    if (!ctrl.springs[key]) {
      ctrl.springs[key] = spring;
      addFluidObserver(spring, ctrl);
    }
  });
}
function createSpring(key, observer2) {
  const spring = new SpringValue();
  spring.key = key;
  if (observer2) {
    addFluidObserver(spring, observer2);
  }
  return spring;
}
function prepareSprings(springs, props, create) {
  if (props.keys) {
    each(props.keys, (key) => {
      const spring = springs[key] || (springs[key] = create(key));
      spring['_prepareNode'](props);
    });
  }
}
function prepareKeys(ctrl, queue) {
  each(queue, (props) => {
    prepareSprings(ctrl.springs, props, (key) => {
      return createSpring(key, ctrl);
    });
  });
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var _excluded$6 = ['children'];
var SpringContext = (_ref) => {
  let { children } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$6);
  const inherited = (0, import_react3.useContext)(ctx);
  const pause = props.pause || !!inherited.pause,
    immediate = props.immediate || !!inherited.immediate;
  props = useMemoOne(
    () => ({
      pause,
      immediate,
    }),
    [pause, immediate],
  );
  const { Provider } = ctx;
  return React2.createElement(
    Provider,
    {
      value: props,
    },
    children,
  );
};
var ctx = makeContext(SpringContext, {});
SpringContext.Provider = ctx.Provider;
SpringContext.Consumer = ctx.Consumer;
function makeContext(target, init) {
  Object.assign(target, React2.createContext(init));
  target.Provider._context = target;
  target.Consumer._context = target;
  return target;
}
var SpringRef = () => {
  const current = [];
  const SpringRef2 = function SpringRef3(props) {
    deprecateDirectCall();
    const results = [];
    each(current, (ctrl, i2) => {
      if (is.und(props)) {
        results.push(ctrl.start());
      } else {
        const update3 = _getProps(props, ctrl, i2);
        if (update3) {
          results.push(ctrl.start(update3));
        }
      }
    });
    return results;
  };
  SpringRef2.current = current;
  SpringRef2.add = function (ctrl) {
    if (!current.includes(ctrl)) {
      current.push(ctrl);
    }
  };
  SpringRef2.delete = function (ctrl) {
    const i2 = current.indexOf(ctrl);
    if (~i2) current.splice(i2, 1);
  };
  SpringRef2.pause = function () {
    each(current, (ctrl) => ctrl.pause(...arguments));
    return this;
  };
  SpringRef2.resume = function () {
    each(current, (ctrl) => ctrl.resume(...arguments));
    return this;
  };
  SpringRef2.set = function (values) {
    each(current, (ctrl) => ctrl.set(values));
  };
  SpringRef2.start = function (props) {
    const results = [];
    each(current, (ctrl, i2) => {
      if (is.und(props)) {
        results.push(ctrl.start());
      } else {
        const update3 = this._getProps(props, ctrl, i2);
        if (update3) {
          results.push(ctrl.start(update3));
        }
      }
    });
    return results;
  };
  SpringRef2.stop = function () {
    each(current, (ctrl) => ctrl.stop(...arguments));
    return this;
  };
  SpringRef2.update = function (props) {
    each(current, (ctrl, i2) => ctrl.update(this._getProps(props, ctrl, i2)));
    return this;
  };
  const _getProps = function _getProps2(arg, ctrl, index) {
    return is.fun(arg) ? arg(index, ctrl) : arg;
  };
  SpringRef2._getProps = _getProps;
  return SpringRef2;
};
function useSprings(length, props, deps) {
  const propsFn = is.fun(props) && props;
  if (propsFn && !deps) deps = [];
  const ref2 = (0, import_react3.useMemo)(() => (propsFn || arguments.length == 3 ? SpringRef() : void 0), []);
  const layoutId = (0, import_react3.useRef)(0);
  const forceUpdate = useForceUpdate();
  const state = (0, import_react3.useMemo)(
    () => ({
      ctrls: [],
      queue: [],
      flush(ctrl, updates2) {
        const springs2 = getSprings(ctrl, updates2);
        const canFlushSync =
          layoutId.current > 0 && !state.queue.length && !Object.keys(springs2).some((key) => !ctrl.springs[key]);
        return canFlushSync
          ? flushUpdateQueue(ctrl, updates2)
          : new Promise((resolve) => {
              setSprings(ctrl, springs2);
              state.queue.push(() => {
                resolve(flushUpdateQueue(ctrl, updates2));
              });
              forceUpdate();
            });
      },
    }),
    [],
  );
  const ctrls = (0, import_react3.useRef)([...state.ctrls]);
  const updates = [];
  const prevLength = usePrev(length) || 0;
  (0, import_react3.useMemo)(() => {
    each(ctrls.current.slice(length, prevLength), (ctrl) => {
      detachRefs(ctrl, ref2);
      ctrl.stop(true);
    });
    ctrls.current.length = length;
    declareUpdates(prevLength, length);
  }, [length]);
  (0, import_react3.useMemo)(() => {
    declareUpdates(0, Math.min(prevLength, length));
  }, deps);
  function declareUpdates(startIndex, endIndex) {
    for (let i2 = startIndex; i2 < endIndex; i2++) {
      const ctrl = ctrls.current[i2] || (ctrls.current[i2] = new Controller(null, state.flush));
      const update3 = propsFn ? propsFn(i2, ctrl) : props[i2];
      if (update3) {
        updates[i2] = declareUpdate(update3);
      }
    }
  }
  const springs = ctrls.current.map((ctrl, i2) => getSprings(ctrl, updates[i2]));
  const context = (0, import_react3.useContext)(SpringContext);
  const prevContext = usePrev(context);
  const hasContext = context !== prevContext && hasProps(context);
  useIsomorphicLayoutEffect(() => {
    layoutId.current++;
    state.ctrls = ctrls.current;
    const { queue } = state;
    if (queue.length) {
      state.queue = [];
      each(queue, (cb) => cb());
    }
    each(ctrls.current, (ctrl, i2) => {
      ref2 == null ? void 0 : ref2.add(ctrl);
      if (hasContext) {
        ctrl.start({
          default: context,
        });
      }
      const update3 = updates[i2];
      if (update3) {
        replaceRef(ctrl, update3.ref);
        if (ctrl.ref) {
          ctrl.queue.push(update3);
        } else {
          ctrl.start(update3);
        }
      }
    });
  });
  useOnce(() => () => {
    each(state.ctrls, (ctrl) => ctrl.stop(true));
  });
  const values = springs.map((x) => _extends3({}, x));
  return ref2 ? [values, ref2] : values;
}
function useSpring(props, deps) {
  const isFn = is.fun(props);
  const [[values], ref2] = useSprings(1, isFn ? props : [props], isFn ? deps || [] : deps);
  return isFn || arguments.length == 2 ? [values, ref2] : values;
}
var TransitionPhase;
(function (TransitionPhase2) {
  TransitionPhase2['MOUNT'] = 'mount';
  TransitionPhase2['ENTER'] = 'enter';
  TransitionPhase2['UPDATE'] = 'update';
  TransitionPhase2['LEAVE'] = 'leave';
})(TransitionPhase || (TransitionPhase = {}));
var _excluded$5 = ['container'];
var useScroll = (_ref = {}) => {
  let { container } = _ref,
    springOptions = _objectWithoutPropertiesLoose(_ref, _excluded$5);
  const [scrollValues2, api] = useSpring(
    () =>
      _extends3(
        {
          scrollX: 0,
          scrollY: 0,
          scrollXProgress: 0,
          scrollYProgress: 0,
        },
        springOptions,
      ),
    [],
  );
  useIsomorphicLayoutEffect(() => {
    const cleanupScroll = onScroll(
      ({ x, y: y2 }) => {
        api.start({
          scrollX: x.current,
          scrollXProgress: x.progress,
          scrollY: y2.current,
          scrollYProgress: y2.progress,
        });
      },
      {
        container: (container == null ? void 0 : container.current) || void 0,
      },
    );
    return () => {
      each(Object.values(scrollValues2), (value) => value.stop());
      cleanupScroll();
    };
  }, []);
  return scrollValues2;
};
var Interpolation = class extends FrameValue {
  constructor(source, args) {
    super();
    this.key = void 0;
    this.idle = true;
    this.calc = void 0;
    this._active = /* @__PURE__ */ new Set();
    this.source = source;
    this.calc = createInterpolator(...args);
    const value = this._get();
    const nodeType = getAnimatedType(value);
    setAnimated(this, nodeType.create(value));
  }
  advance(_dt) {
    const value = this._get();
    const oldValue = this.get();
    if (!isEqual(value, oldValue)) {
      getAnimated(this).setValue(value);
      this._onChange(value, this.idle);
    }
    if (!this.idle && checkIdle(this._active)) {
      becomeIdle(this);
    }
  }
  _get() {
    const inputs = is.arr(this.source) ? this.source.map(getFluidValue) : toArray(getFluidValue(this.source));
    return this.calc(...inputs);
  }
  _start() {
    if (this.idle && !checkIdle(this._active)) {
      this.idle = false;
      each(getPayload(this), (node) => {
        node.done = false;
      });
      if (globals.skipAnimation) {
        raf.batchedUpdates(() => this.advance());
        becomeIdle(this);
      } else {
        frameLoop.start(this);
      }
    }
  }
  _attach() {
    let priority2 = 1;
    each(toArray(this.source), (source) => {
      if (hasFluidValue(source)) {
        addFluidObserver(source, this);
      }
      if (isFrameValue(source)) {
        if (!source.idle) {
          this._active.add(source);
        }
        priority2 = Math.max(priority2, source.priority + 1);
      }
    });
    this.priority = priority2;
    this._start();
  }
  _detach() {
    each(toArray(this.source), (source) => {
      if (hasFluidValue(source)) {
        removeFluidObserver(source, this);
      }
    });
    this._active.clear();
    becomeIdle(this);
  }
  eventObserved(event) {
    if (event.type == 'change') {
      if (event.idle) {
        this.advance();
      } else {
        this._active.add(event.parent);
        this._start();
      }
    } else if (event.type == 'idle') {
      this._active.delete(event.parent);
    } else if (event.type == 'priority') {
      this.priority = toArray(this.source).reduce(
        (highest, parent) => Math.max(highest, (isFrameValue(parent) ? parent.priority : 0) + 1),
        0,
      );
    }
  }
};
function isIdle(source) {
  return source.idle !== false;
}
function checkIdle(active) {
  return !active.size || Array.from(active).every(isIdle);
}
function becomeIdle(self) {
  if (!self.idle) {
    self.idle = true;
    each(getPayload(self), (node) => {
      node.done = true;
    });
    callFluidObservers(self, {
      type: 'idle',
      parent: self,
    });
  }
}
globals.assign({
  createStringInterpolator,
  to: (source, args) => new Interpolation(source, args),
});
var update2 = frameLoop.advance;

// ../../node_modules/@react-spring/web/dist/react-spring-web.esm.js
var import_react_dom = __toESM(require_react_dom());
function _objectWithoutPropertiesLoose2(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var _excluded$2 = ['style', 'children', 'scrollTop', 'scrollLeft', 'viewBox'];
var isCustomPropRE = /^--/;
function dangerousStyleValue(name, value) {
  if (value == null || typeof value === 'boolean' || value === '') return '';
  if (
    typeof value === 'number' &&
    value !== 0 &&
    !isCustomPropRE.test(name) &&
    !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])
  )
    return value + 'px';
  return ('' + value).trim();
}
var attributeCache = {};
function applyAnimatedValues(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }
  const isFilterElement =
    instance.nodeName === 'filter' || (instance.parentNode && instance.parentNode.nodeName === 'filter');
  const _ref = props,
    { style, children, scrollTop, scrollLeft, viewBox } = _ref,
    attributes = _objectWithoutPropertiesLoose2(_ref, _excluded$2);
  const values = Object.values(attributes);
  const names = Object.keys(attributes).map((name) =>
    isFilterElement || instance.hasAttribute(name)
      ? name
      : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, (n2) => '-' + n2.toLowerCase())),
  );
  if (children !== void 0) {
    instance.textContent = children;
  }
  for (let name in style) {
    if (style.hasOwnProperty(name)) {
      const value = dangerousStyleValue(name, style[name]);
      if (isCustomPropRE.test(name)) {
        instance.style.setProperty(name, value);
      } else {
        instance.style[name] = value;
      }
    }
  }
  names.forEach((name, i2) => {
    instance.setAttribute(name, values[i2]);
  });
  if (scrollTop !== void 0) {
    instance.scrollTop = scrollTop;
  }
  if (scrollLeft !== void 0) {
    instance.scrollLeft = scrollLeft;
  }
  if (viewBox !== void 0) {
    instance.setAttribute('viewBox', viewBox);
  }
}
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
};
var prefixKey = (prefix2, key) => prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
var prefixes = ['Webkit', 'Ms', 'Moz', 'O'];
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
  prefixes.forEach((prefix2) => (acc[prefixKey(prefix2, prop)] = acc[prop]));
  return acc;
}, isUnitlessNumber);
var _excluded$1 = ['x', 'y', 'z'];
var domTransforms = /^(matrix|translate|scale|rotate|skew)/;
var pxTransforms = /^(translate)/;
var degTransforms = /^(rotate|skew)/;
var addUnit = (value, unit) => (is.num(value) && value !== 0 ? value + unit : value);
var isValueIdentity = (value, id) =>
  is.arr(value) ? value.every((v) => isValueIdentity(v, id)) : is.num(value) ? value === id : parseFloat(value) === id;
var AnimatedStyle = class extends AnimatedObject {
  constructor(_ref) {
    let { x, y: y2, z } = _ref,
      style = _objectWithoutPropertiesLoose2(_ref, _excluded$1);
    const inputs = [];
    const transforms = [];
    if (x || y2 || z) {
      inputs.push([x || 0, y2 || 0, z || 0]);
      transforms.push((xyz) => [`translate3d(${xyz.map((v) => addUnit(v, 'px')).join(',')})`, isValueIdentity(xyz, 0)]);
    }
    eachProp(style, (value, key) => {
      if (key === 'transform') {
        inputs.push([value || '']);
        transforms.push((transform) => [transform, transform === '']);
      } else if (domTransforms.test(key)) {
        delete style[key];
        if (is.und(value)) return;
        const unit = pxTransforms.test(key) ? 'px' : degTransforms.test(key) ? 'deg' : '';
        inputs.push(toArray(value));
        transforms.push(
          key === 'rotate3d'
            ? ([x2, y3, z2, deg]) => [`rotate3d(${x2},${y3},${z2},${addUnit(deg, unit)})`, isValueIdentity(deg, 0)]
            : (input) => [
                `${key}(${input.map((v) => addUnit(v, unit)).join(',')})`,
                isValueIdentity(input, key.startsWith('scale') ? 1 : 0),
              ],
        );
      }
    });
    if (inputs.length) {
      style.transform = new FluidTransform(inputs, transforms);
    }
    super(style);
  }
};
var FluidTransform = class extends FluidValue {
  constructor(inputs, transforms) {
    super();
    this._value = null;
    this.inputs = inputs;
    this.transforms = transforms;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let transform = '';
    let identity2 = true;
    each(this.inputs, (input, i2) => {
      const arg1 = getFluidValue(input[0]);
      const [t2, id] = this.transforms[i2](is.arr(arg1) ? arg1 : input.map(getFluidValue));
      transform += ' ' + t2;
      identity2 = identity2 && id;
    });
    return identity2 ? 'none' : transform;
  }
  observerAdded(count) {
    if (count == 1)
      each(this.inputs, (input) => each(input, (value) => hasFluidValue(value) && addFluidObserver(value, this)));
  }
  observerRemoved(count) {
    if (count == 0)
      each(this.inputs, (input) => each(input, (value) => hasFluidValue(value) && removeFluidObserver(value, this)));
  }
  eventObserved(event) {
    if (event.type == 'change') {
      this._value = null;
    }
    callFluidObservers(this, event);
  }
};
var primitives = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'circle',
  'clipPath',
  'defs',
  'ellipse',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan',
];
var _excluded = ['scrollTop', 'scrollLeft'];
globals.assign({
  batchedUpdates: import_react_dom.unstable_batchedUpdates,
  createStringInterpolator,
  colors,
});
var host = createHost(primitives, {
  applyAnimatedValues,
  createAnimatedStyle: (style) => new AnimatedStyle(style),
  getComponentProps: (_ref) => {
    let props = _objectWithoutPropertiesLoose2(_ref, _excluded);
    return props;
  },
});
var animated = host.animated;

// app/hooks/useWindowHeightRef.ts
var import_react4 = __toESM(require_react(), 1);

// app/utils/utils.ts
var isEven = (x) => (x % 2 === 0 ? true : false);
var noop2 = () => ({});
var isSSR2 = () =>
  typeof window === 'undefined' || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);

// app/hooks/useWindowHeightRef.ts
var useWindowHeightRef = () => {
  const ref2 = (0, import_react4.useRef)(1);
  useIsomorphicLayoutEffect(() => {
    if (isSSR2()) return;
    const handleResize = () => {
      ref2.current = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref2]);
  return ref2;
};

// ../../node_modules/clsx/dist/clsx.m.js
function r(e2) {
  var t2,
    f2,
    n2 = '';
  if ('string' == typeof e2 || 'number' == typeof e2) n2 += e2;
  else if ('object' == typeof e2)
    if (Array.isArray(e2))
      for (t2 = 0; t2 < e2.length; t2++) e2[t2] && (f2 = r(e2[t2])) && (n2 && (n2 += ' '), (n2 += f2));
    else for (t2 in e2) e2[t2] && (n2 && (n2 += ' '), (n2 += t2));
  return n2;
}
function clsx() {
  for (var e2, t2, f2 = 0, n2 = ''; f2 < arguments.length; )
    (e2 = arguments[f2++]) && (t2 = r(e2)) && (n2 && (n2 += ' '), (n2 += t2));
  return n2;
}

// app/styles/legacy.ts
var section = 'box-border h-screen flex overflow-hidden items-center justify-center flex-col p-5';
var box =
  'bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[5px] border rounded-2xl border-solid border-[rgba(255,255,255,0.18)] py-2 px-4 text-center';
var h1 = 'font-extrabold not-italic text-[4rem] leading-[0.7] text-[rgba(253,223,70,1)] font-acier';
var h2 = 'not-italic text-[1.25rem] whitespace-nowrap text-[rgba(8,9,69,1)] font-vag';
var h3 = 'font-extrabold not-italic uppercase text-[1.35rem] text-[rgba(136,200,255,1)] font-omnium';
var h4 = 'font-bold not-italic font-sauna';
var h3Inline = 'font-extrabold not-italic uppercase text-[2em] text-[yellow] inline font-omnium';
var row = 'w-full flex flex-wrap justify-center items-center transition duration-75 ease-in-out ';
var grid = clsx(box, 'grid grid-cols-[0.2fr_0.8fr] gap-[0.4rem]');
var flex = clsx(box, 'flex');
var menuBox =
  'bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[5px] border fixed flex flex-row items-start justify-between max-w-[90%] h-16 w-[500px] m-auto rounded-2xl border-solid border-[rgba(255,255,255,0.18)] top-5 inset-x-0';
var menuItem =
  'bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[5px] border flex flex-col justify-center items-center text-center h-12 w-12 touch-none select-none m-auto rounded-2xl border-solid border-[rgba(255,255,255,0.18)]';

// app/components/MenuItem.tsx
var import_react9 = __toESM(require_react(), 1);

// ../../node_modules/@use-gesture/core/dist/maths-0ab39ae9.esm.js
function clamp2(v, min, max) {
  return Math.max(min, Math.min(v, max));
}
var V = {
  toVector(v, fallback) {
    if (v === void 0) v = fallback;
    return Array.isArray(v) ? v : [v, v];
  },
  add(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
  },
  sub(v1, v2) {
    return [v1[0] - v2[0], v1[1] - v2[1]];
  },
  addTo(v1, v2) {
    v1[0] += v2[0];
    v1[1] += v2[1];
  },
  subTo(v1, v2) {
    v1[0] -= v2[0];
    v1[1] -= v2[1];
  },
};
function rubberband(distance, dimension, constant) {
  if (dimension === 0 || Math.abs(dimension) === Infinity) return Math.pow(distance, constant * 5);
  return (distance * dimension * constant) / (dimension + constant * distance);
}
function rubberbandIfOutOfBounds(position, min, max, constant = 0.15) {
  if (constant === 0) return clamp2(position, min, max);
  if (position < min) return -rubberband(min - position, max - min, constant) + min;
  if (position > max) return +rubberband(position - max, max - min, constant) + max;
  return position;
}
function computeRubberband(bounds, [Vx, Vy], [Rx, Ry]) {
  const [[X0, X1], [Y0, Y1]] = bounds;
  return [rubberbandIfOutOfBounds(Vx, X0, X1, Rx), rubberbandIfOutOfBounds(Vy, Y0, Y1, Ry)];
}

// ../../node_modules/@use-gesture/core/dist/actions-b1cc53c2.esm.js
function _toPrimitive(input, hint) {
  if (typeof input !== 'object' || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || 'default');
    if (typeof res !== 'object') return res;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (hint === 'string' ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, 'string');
  return typeof key === 'symbol' ? key : String(key);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = null != arguments[i2] ? arguments[i2] : {};
    i2 % 2
      ? ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}
var EVENT_TYPE_MAP = {
  pointer: {
    start: 'down',
    change: 'move',
    end: 'up',
  },
  mouse: {
    start: 'down',
    change: 'move',
    end: 'up',
  },
  touch: {
    start: 'start',
    change: 'move',
    end: 'end',
  },
  gesture: {
    start: 'start',
    change: 'change',
    end: 'end',
  },
};
function capitalize(string) {
  if (!string) return '';
  return string[0].toUpperCase() + string.slice(1);
}
var actionsWithoutCaptureSupported = ['enter', 'leave'];
function hasCapture(capture = false, actionKey) {
  return capture && !actionsWithoutCaptureSupported.includes(actionKey);
}
function toHandlerProp(device, action = '', capture = false) {
  const deviceProps = EVENT_TYPE_MAP[device];
  const actionKey = deviceProps ? deviceProps[action] || action : action;
  return 'on' + capitalize(device) + capitalize(actionKey) + (hasCapture(capture, actionKey) ? 'Capture' : '');
}
var pointerCaptureEvents = ['gotpointercapture', 'lostpointercapture'];
function parseProp(prop) {
  let eventKey = prop.substring(2).toLowerCase();
  const passive = !!~eventKey.indexOf('passive');
  if (passive) eventKey = eventKey.replace('passive', '');
  const captureKey = pointerCaptureEvents.includes(eventKey) ? 'capturecapture' : 'capture';
  const capture = !!~eventKey.indexOf(captureKey);
  if (capture) eventKey = eventKey.replace('capture', '');
  return {
    device: eventKey,
    capture,
    passive,
  };
}
function toDomEventType(device, action = '') {
  const deviceProps = EVENT_TYPE_MAP[device];
  const actionKey = deviceProps ? deviceProps[action] || action : action;
  return device + actionKey;
}
function isTouch(event) {
  return 'touches' in event;
}
function getPointerType(event) {
  if (isTouch(event)) return 'touch';
  if ('pointerType' in event) return event.pointerType;
  return 'mouse';
}
function getCurrentTargetTouchList(event) {
  return Array.from(event.touches).filter((e2) => {
    var _event$currentTarget, _event$currentTarget$;
    return (
      e2.target === event.currentTarget ||
      ((_event$currentTarget = event.currentTarget) === null || _event$currentTarget === void 0
        ? void 0
        : (_event$currentTarget$ = _event$currentTarget.contains) === null || _event$currentTarget$ === void 0
        ? void 0
        : _event$currentTarget$.call(_event$currentTarget, e2.target))
    );
  });
}
function getTouchList(event) {
  return event.type === 'touchend' || event.type === 'touchcancel' ? event.changedTouches : event.targetTouches;
}
function getValueEvent(event) {
  return isTouch(event) ? getTouchList(event)[0] : event;
}
function distanceAngle(P1, P2) {
  const dx = P2.clientX - P1.clientX;
  const dy = P2.clientY - P1.clientY;
  const cx = (P2.clientX + P1.clientX) / 2;
  const cy = (P2.clientY + P1.clientY) / 2;
  const distance = Math.hypot(dx, dy);
  const angle = -(Math.atan2(dx, dy) * 180) / Math.PI;
  const origin = [cx, cy];
  return {
    angle,
    distance,
    origin,
  };
}
function touchIds(event) {
  return getCurrentTargetTouchList(event).map((touch) => touch.identifier);
}
function touchDistanceAngle(event, ids) {
  const [P1, P2] = Array.from(event.touches).filter((touch) => ids.includes(touch.identifier));
  return distanceAngle(P1, P2);
}
function pointerId(event) {
  const valueEvent = getValueEvent(event);
  return isTouch(event) ? valueEvent.identifier : valueEvent.pointerId;
}
function pointerValues(event) {
  const valueEvent = getValueEvent(event);
  return [valueEvent.clientX, valueEvent.clientY];
}
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;
function wheelValues(event) {
  let { deltaX, deltaY, deltaMode } = event;
  if (deltaMode === 1) {
    deltaX *= LINE_HEIGHT;
    deltaY *= LINE_HEIGHT;
  } else if (deltaMode === 2) {
    deltaX *= PAGE_HEIGHT;
    deltaY *= PAGE_HEIGHT;
  }
  return [deltaX, deltaY];
}
function scrollValues(event) {
  var _ref, _ref2;
  const { scrollX, scrollY, scrollLeft, scrollTop } = event.currentTarget;
  return [
    (_ref = scrollX !== null && scrollX !== void 0 ? scrollX : scrollLeft) !== null && _ref !== void 0 ? _ref : 0,
    (_ref2 = scrollY !== null && scrollY !== void 0 ? scrollY : scrollTop) !== null && _ref2 !== void 0 ? _ref2 : 0,
  ];
}
function getEventDetails(event) {
  const payload = {};
  if ('buttons' in event) payload.buttons = event.buttons;
  if ('shiftKey' in event) {
    const { shiftKey, altKey, metaKey, ctrlKey } = event;
    Object.assign(payload, {
      shiftKey,
      altKey,
      metaKey,
      ctrlKey,
    });
  }
  return payload;
}
function call2(v, ...args) {
  if (typeof v === 'function') {
    return v(...args);
  } else {
    return v;
  }
}
function noop3() {}
function chain(...fns) {
  if (fns.length === 0) return noop3;
  if (fns.length === 1) return fns[0];
  return function () {
    let result;
    for (const fn of fns) {
      result = fn.apply(this, arguments) || result;
    }
    return result;
  };
}
function assignDefault(value, fallback) {
  return Object.assign({}, fallback, value || {});
}
var BEFORE_LAST_KINEMATICS_DELAY = 32;
var Engine = class {
  constructor(ctrl, args, key) {
    this.ctrl = ctrl;
    this.args = args;
    this.key = key;
    if (!this.state) {
      this.state = {};
      this.computeValues([0, 0]);
      this.computeInitial();
      if (this.init) this.init();
      this.reset();
    }
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(state) {
    this.ctrl.state[this.key] = state;
  }
  get shared() {
    return this.ctrl.state.shared;
  }
  get eventStore() {
    return this.ctrl.gestureEventStores[this.key];
  }
  get timeoutStore() {
    return this.ctrl.gestureTimeoutStores[this.key];
  }
  get config() {
    return this.ctrl.config[this.key];
  }
  get sharedConfig() {
    return this.ctrl.config.shared;
  }
  get handler() {
    return this.ctrl.handlers[this.key];
  }
  reset() {
    const { state, shared, ingKey, args } = this;
    shared[ingKey] = state._active = state.active = state._blocked = state._force = false;
    state._step = [false, false];
    state.intentional = false;
    state._movement = [0, 0];
    state._distance = [0, 0];
    state._direction = [0, 0];
    state._delta = [0, 0];
    state._bounds = [
      [-Infinity, Infinity],
      [-Infinity, Infinity],
    ];
    state.args = args;
    state.axis = void 0;
    state.memo = void 0;
    state.elapsedTime = 0;
    state.direction = [0, 0];
    state.distance = [0, 0];
    state.overflow = [0, 0];
    state._movementBound = [false, false];
    state.velocity = [0, 0];
    state.movement = [0, 0];
    state.delta = [0, 0];
    state.timeStamp = 0;
  }
  start(event) {
    const state = this.state;
    const config2 = this.config;
    if (!state._active) {
      this.reset();
      this.computeInitial();
      state._active = true;
      state.target = event.target;
      state.currentTarget = event.currentTarget;
      state.lastOffset = config2.from ? call2(config2.from, state) : state.offset;
      state.offset = state.lastOffset;
    }
    state.startTime = state.timeStamp = event.timeStamp;
  }
  computeValues(values) {
    const state = this.state;
    state._values = values;
    state.values = this.config.transform(values);
  }
  computeInitial() {
    const state = this.state;
    state._initial = state._values;
    state.initial = state.values;
  }
  compute(event) {
    const { state, config: config2, shared } = this;
    state.args = this.args;
    let dt = 0;
    if (event) {
      state.event = event;
      if (config2.preventDefault && event.cancelable) state.event.preventDefault();
      state.type = event.type;
      shared.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size;
      shared.locked = !!document.pointerLockElement;
      Object.assign(shared, getEventDetails(event));
      shared.down = shared.pressed = shared.buttons % 2 === 1 || shared.touches > 0;
      dt = event.timeStamp - state.timeStamp;
      state.timeStamp = event.timeStamp;
      state.elapsedTime = state.timeStamp - state.startTime;
    }
    if (state._active) {
      const _absoluteDelta = state._delta.map(Math.abs);
      V.addTo(state._distance, _absoluteDelta);
    }
    if (this.axisIntent) this.axisIntent(event);
    const [_m0, _m1] = state._movement;
    const [t0, t1] = config2.threshold;
    const { _step, values } = state;
    if (config2.hasCustomTransform) {
      if (_step[0] === false) _step[0] = Math.abs(_m0) >= t0 && values[0];
      if (_step[1] === false) _step[1] = Math.abs(_m1) >= t1 && values[1];
    } else {
      if (_step[0] === false) _step[0] = Math.abs(_m0) >= t0 && Math.sign(_m0) * t0;
      if (_step[1] === false) _step[1] = Math.abs(_m1) >= t1 && Math.sign(_m1) * t1;
    }
    state.intentional = _step[0] !== false || _step[1] !== false;
    if (!state.intentional) return;
    const movement = [0, 0];
    if (config2.hasCustomTransform) {
      const [v0, v1] = values;
      movement[0] = _step[0] !== false ? v0 - _step[0] : 0;
      movement[1] = _step[1] !== false ? v1 - _step[1] : 0;
    } else {
      movement[0] = _step[0] !== false ? _m0 - _step[0] : 0;
      movement[1] = _step[1] !== false ? _m1 - _step[1] : 0;
    }
    if (this.restrictToAxis && !state._blocked) this.restrictToAxis(movement);
    const previousOffset = state.offset;
    const gestureIsActive = (state._active && !state._blocked) || state.active;
    if (gestureIsActive) {
      state.first = state._active && !state.active;
      state.last = !state._active && state.active;
      state.active = shared[this.ingKey] = state._active;
      if (event) {
        if (state.first) {
          if ('bounds' in config2) state._bounds = call2(config2.bounds, state);
          if (this.setup) this.setup();
        }
        state.movement = movement;
        this.computeOffset();
      }
    }
    const [ox, oy] = state.offset;
    const [[x0, x1], [y0, y1]] = state._bounds;
    state.overflow = [ox < x0 ? -1 : ox > x1 ? 1 : 0, oy < y0 ? -1 : oy > y1 ? 1 : 0];
    state._movementBound[0] = state.overflow[0]
      ? state._movementBound[0] === false
        ? state._movement[0]
        : state._movementBound[0]
      : false;
    state._movementBound[1] = state.overflow[1]
      ? state._movementBound[1] === false
        ? state._movement[1]
        : state._movementBound[1]
      : false;
    const rubberband2 = state._active ? config2.rubberband || [0, 0] : [0, 0];
    state.offset = computeRubberband(state._bounds, state.offset, rubberband2);
    state.delta = V.sub(state.offset, previousOffset);
    this.computeMovement();
    if (gestureIsActive && (!state.last || dt > BEFORE_LAST_KINEMATICS_DELAY)) {
      state.delta = V.sub(state.offset, previousOffset);
      const absoluteDelta = state.delta.map(Math.abs);
      V.addTo(state.distance, absoluteDelta);
      state.direction = state.delta.map(Math.sign);
      state._direction = state._delta.map(Math.sign);
      if (!state.first && dt > 0) {
        state.velocity = [absoluteDelta[0] / dt, absoluteDelta[1] / dt];
      }
    }
  }
  emit() {
    const state = this.state;
    const shared = this.shared;
    const config2 = this.config;
    if (!state._active) this.clean();
    if ((state._blocked || !state.intentional) && !state._force && !config2.triggerAllEvents) return;
    const memo = this.handler(
      _objectSpread2(
        _objectSpread2(_objectSpread2({}, shared), state),
        {},
        {
          [this.aliasKey]: state.values,
        },
      ),
    );
    if (memo !== void 0) state.memo = memo;
  }
  clean() {
    this.eventStore.clean();
    this.timeoutStore.clean();
  }
};
function selectAxis([dx, dy], threshold) {
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  if (absDx > absDy && absDx > threshold) {
    return 'x';
  }
  if (absDy > absDx && absDy > threshold) {
    return 'y';
  }
  return void 0;
}
var CoordinatesEngine = class extends Engine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, 'aliasKey', 'xy');
  }
  reset() {
    super.reset();
    this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0];
    this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = V.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = V.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(event) {
    const state = this.state;
    const config2 = this.config;
    if (!state.axis && event) {
      const threshold =
        typeof config2.axisThreshold === 'object'
          ? config2.axisThreshold[getPointerType(event)]
          : config2.axisThreshold;
      state.axis = selectAxis(state._movement, threshold);
    }
    state._blocked =
      ((config2.lockDirection || !!config2.axis) && !state.axis) || (!!config2.axis && config2.axis !== state.axis);
  }
  restrictToAxis(v) {
    if (this.config.axis || this.config.lockDirection) {
      switch (this.state.axis) {
        case 'x':
          v[1] = 0;
          break;
        case 'y':
          v[0] = 0;
          break;
      }
    }
  }
};
var identity = (v) => v;
var DEFAULT_RUBBERBAND = 0.15;
var commonConfigResolver = {
  enabled(value = true) {
    return value;
  },
  eventOptions(value, _k, config2) {
    return _objectSpread2(_objectSpread2({}, config2.shared.eventOptions), value);
  },
  preventDefault(value = false) {
    return value;
  },
  triggerAllEvents(value = false) {
    return value;
  },
  rubberband(value = 0) {
    switch (value) {
      case true:
        return [DEFAULT_RUBBERBAND, DEFAULT_RUBBERBAND];
      case false:
        return [0, 0];
      default:
        return V.toVector(value);
    }
  },
  from(value) {
    if (typeof value === 'function') return value;
    if (value != null) return V.toVector(value);
  },
  transform(value, _k, config2) {
    const transform = value || config2.shared.transform;
    this.hasCustomTransform = !!transform;
    if (true) {
      const originalTransform = transform || identity;
      return (v) => {
        const r3 = originalTransform(v);
        if (!isFinite(r3[0]) || !isFinite(r3[1])) {
          console.warn(`[@use-gesture]: config.transform() must produce a valid result, but it was: [${r3[0]},${[1]}]`);
        }
        return r3;
      };
    }
    return transform || identity;
  },
  threshold(value) {
    return V.toVector(value, 0);
  },
};
if (true) {
  Object.assign(commonConfigResolver, {
    domTarget(value) {
      if (value !== void 0) {
        throw Error(`[@use-gesture]: \`domTarget\` option has been renamed to \`target\`.`);
      }
      return NaN;
    },
    lockDirection(value) {
      if (value !== void 0) {
        throw Error(
          `[@use-gesture]: \`lockDirection\` option has been merged with \`axis\`. Use it as in \`{ axis: 'lock' }\``,
        );
      }
      return NaN;
    },
    initial(value) {
      if (value !== void 0) {
        throw Error(`[@use-gesture]: \`initial\` option has been renamed to \`from\`.`);
      }
      return NaN;
    },
  });
}
var DEFAULT_AXIS_THRESHOLD = 0;
var coordinatesConfigResolver = _objectSpread2(
  _objectSpread2({}, commonConfigResolver),
  {},
  {
    axis(_v, _k, { axis }) {
      this.lockDirection = axis === 'lock';
      if (!this.lockDirection) return axis;
    },
    axisThreshold(value = DEFAULT_AXIS_THRESHOLD) {
      return value;
    },
    bounds(value = {}) {
      if (typeof value === 'function') {
        return (state) => coordinatesConfigResolver.bounds(value(state));
      }
      if ('current' in value) {
        return () => value.current;
      }
      if (typeof HTMLElement === 'function' && value instanceof HTMLElement) {
        return value;
      }
      const { left = -Infinity, right = Infinity, top = -Infinity, bottom = Infinity } = value;
      return [
        [left, right],
        [top, bottom],
      ];
    },
  },
);
var KEYS_DELTA_MAP = {
  ArrowRight: (displacement, factor = 1) => [displacement * factor, 0],
  ArrowLeft: (displacement, factor = 1) => [-1 * displacement * factor, 0],
  ArrowUp: (displacement, factor = 1) => [0, -1 * displacement * factor],
  ArrowDown: (displacement, factor = 1) => [0, displacement * factor],
};
var DragEngine = class extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, 'ingKey', 'dragging');
  }
  reset() {
    super.reset();
    const state = this.state;
    state._pointerId = void 0;
    state._pointerActive = false;
    state._keyboardActive = false;
    state._preventScroll = false;
    state._delayed = false;
    state.swipe = [0, 0];
    state.tap = false;
    state.canceled = false;
    state.cancel = this.cancel.bind(this);
  }
  setup() {
    const state = this.state;
    if (state._bounds instanceof HTMLElement) {
      const boundRect = state._bounds.getBoundingClientRect();
      const targetRect = state.currentTarget.getBoundingClientRect();
      const _bounds = {
        left: boundRect.left - targetRect.left + state.offset[0],
        right: boundRect.right - targetRect.right + state.offset[0],
        top: boundRect.top - targetRect.top + state.offset[1],
        bottom: boundRect.bottom - targetRect.bottom + state.offset[1],
      };
      state._bounds = coordinatesConfigResolver.bounds(_bounds);
    }
  }
  cancel() {
    const state = this.state;
    if (state.canceled) return;
    state.canceled = true;
    state._active = false;
    setTimeout(() => {
      this.compute();
      this.emit();
    }, 0);
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean();
    this.state._pointerActive = false;
    this.state._keyboardActive = false;
    super.clean();
  }
  pointerDown(event) {
    const config2 = this.config;
    const state = this.state;
    if (
      event.buttons != null &&
      (Array.isArray(config2.pointerButtons)
        ? !config2.pointerButtons.includes(event.buttons)
        : config2.pointerButtons !== -1 && config2.pointerButtons !== event.buttons)
    )
      return;
    const ctrlIds = this.ctrl.setEventIds(event);
    if (config2.pointerCapture) {
      event.target.setPointerCapture(event.pointerId);
    }
    if (ctrlIds && ctrlIds.size > 1 && state._pointerActive) return;
    this.start(event);
    this.setupPointer(event);
    state._pointerId = pointerId(event);
    state._pointerActive = true;
    this.computeValues(pointerValues(event));
    this.computeInitial();
    if (config2.preventScrollAxis && getPointerType(event) !== 'mouse') {
      state._active = false;
      this.setupScrollPrevention(event);
    } else if (config2.delay > 0) {
      this.setupDelayTrigger(event);
      if (config2.triggerAllEvents) {
        this.compute(event);
        this.emit();
      }
    } else {
      this.startPointerDrag(event);
    }
  }
  startPointerDrag(event) {
    const state = this.state;
    state._active = true;
    state._preventScroll = true;
    state._delayed = false;
    this.compute(event);
    this.emit();
  }
  pointerMove(event) {
    const state = this.state;
    const config2 = this.config;
    if (!state._pointerActive) return;
    if (state.type === event.type && event.timeStamp === state.timeStamp) return;
    const id = pointerId(event);
    if (state._pointerId !== void 0 && id !== state._pointerId) return;
    const _values = pointerValues(event);
    if (document.pointerLockElement === event.target) {
      state._delta = [event.movementX, event.movementY];
    } else {
      state._delta = V.sub(_values, state._values);
      this.computeValues(_values);
    }
    V.addTo(state._movement, state._delta);
    this.compute(event);
    if (state._delayed && state.intentional) {
      this.timeoutStore.remove('dragDelay');
      state.active = false;
      this.startPointerDrag(event);
      return;
    }
    if (config2.preventScrollAxis && !state._preventScroll) {
      if (state.axis) {
        if (state.axis === config2.preventScrollAxis || config2.preventScrollAxis === 'xy') {
          state._active = false;
          this.clean();
          return;
        } else {
          this.timeoutStore.remove('startPointerDrag');
          this.startPointerDrag(event);
          return;
        }
      } else {
        return;
      }
    }
    this.emit();
  }
  pointerUp(event) {
    this.ctrl.setEventIds(event);
    try {
      if (this.config.pointerCapture && event.target.hasPointerCapture(event.pointerId)) {
        event.target.releasePointerCapture(event.pointerId);
      }
    } catch (_unused) {
      if (true) {
        console.warn(`[@use-gesture]: If you see this message, it's likely that you're using an outdated version of \`@react-three/fiber\`. 

Please upgrade to the latest version.`);
      }
    }
    const state = this.state;
    const config2 = this.config;
    if (!state._active || !state._pointerActive) return;
    const id = pointerId(event);
    if (state._pointerId !== void 0 && id !== state._pointerId) return;
    this.state._pointerActive = false;
    this.setActive();
    this.compute(event);
    const [dx, dy] = state._distance;
    state.tap = dx <= config2.tapsThreshold && dy <= config2.tapsThreshold;
    if (state.tap && config2.filterTaps) {
      state._force = true;
    } else {
      const [dirx, diry] = state.direction;
      const [vx, vy] = state.velocity;
      const [mx, my] = state.movement;
      const [svx, svy] = config2.swipe.velocity;
      const [sx, sy] = config2.swipe.distance;
      const sdt = config2.swipe.duration;
      if (state.elapsedTime < sdt) {
        if (Math.abs(vx) > svx && Math.abs(mx) > sx) state.swipe[0] = dirx;
        if (Math.abs(vy) > svy && Math.abs(my) > sy) state.swipe[1] = diry;
      }
    }
    this.emit();
  }
  pointerClick(event) {
    if (!this.state.tap && event.detail > 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  setupPointer(event) {
    const config2 = this.config;
    const device = config2.device;
    if (true) {
      try {
        if (device === 'pointer' && config2.preventScrollDelay === void 0) {
          const currentTarget = 'uv' in event ? event.sourceEvent.currentTarget : event.currentTarget;
          const style = window.getComputedStyle(currentTarget);
          if (style.touchAction === 'auto') {
            console.warn(
              `[@use-gesture]: The drag target has its \`touch-action\` style property set to \`auto\`. It is recommended to add \`touch-action: 'none'\` so that the drag gesture behaves correctly on touch-enabled devices. For more information read this: https://use-gesture.netlify.app/docs/extras/#touch-action.

This message will only show in development mode. It won't appear in production. If this is intended, you can ignore it.`,
              currentTarget,
            );
          }
        }
      } catch (_unused2) {}
    }
    if (config2.pointerLock) {
      event.currentTarget.requestPointerLock();
    }
    if (!config2.pointerCapture) {
      this.eventStore.add(this.sharedConfig.window, device, 'change', this.pointerMove.bind(this));
      this.eventStore.add(this.sharedConfig.window, device, 'end', this.pointerUp.bind(this));
      this.eventStore.add(this.sharedConfig.window, device, 'cancel', this.pointerUp.bind(this));
    }
  }
  pointerClean() {
    if (this.config.pointerLock && document.pointerLockElement === this.state.currentTarget) {
      document.exitPointerLock();
    }
  }
  preventScroll(event) {
    if (this.state._preventScroll && event.cancelable) {
      event.preventDefault();
    }
  }
  setupScrollPrevention(event) {
    this.state._preventScroll = false;
    persistEvent(event);
    const remove = this.eventStore.add(this.sharedConfig.window, 'touch', 'change', this.preventScroll.bind(this), {
      passive: false,
    });
    this.eventStore.add(this.sharedConfig.window, 'touch', 'end', remove);
    this.eventStore.add(this.sharedConfig.window, 'touch', 'cancel', remove);
    this.timeoutStore.add('startPointerDrag', this.startPointerDrag.bind(this), this.config.preventScrollDelay, event);
  }
  setupDelayTrigger(event) {
    this.state._delayed = true;
    this.timeoutStore.add(
      'dragDelay',
      () => {
        this.state._step = [0, 0];
        this.startPointerDrag(event);
      },
      this.config.delay,
    );
  }
  keyDown(event) {
    const deltaFn = KEYS_DELTA_MAP[event.key];
    if (deltaFn) {
      const state = this.state;
      const factor = event.shiftKey ? 10 : event.altKey ? 0.1 : 1;
      this.start(event);
      state._delta = deltaFn(this.config.keyboardDisplacement, factor);
      state._keyboardActive = true;
      V.addTo(state._movement, state._delta);
      this.compute(event);
      this.emit();
    }
  }
  keyUp(event) {
    if (!(event.key in KEYS_DELTA_MAP)) return;
    this.state._keyboardActive = false;
    this.setActive();
    this.compute(event);
    this.emit();
  }
  bind(bindFunction) {
    const device = this.config.device;
    bindFunction(device, 'start', this.pointerDown.bind(this));
    if (this.config.pointerCapture) {
      bindFunction(device, 'change', this.pointerMove.bind(this));
      bindFunction(device, 'end', this.pointerUp.bind(this));
      bindFunction(device, 'cancel', this.pointerUp.bind(this));
      bindFunction('lostPointerCapture', '', this.pointerUp.bind(this));
    }
    if (this.config.keys) {
      bindFunction('key', 'down', this.keyDown.bind(this));
      bindFunction('key', 'up', this.keyUp.bind(this));
    }
    if (this.config.filterTaps) {
      bindFunction('click', '', this.pointerClick.bind(this), {
        capture: true,
        passive: false,
      });
    }
  }
};
function persistEvent(event) {
  'persist' in event && typeof event.persist === 'function' && event.persist();
}
var isBrowser = typeof window !== 'undefined' && window.document && window.document.createElement;
function supportsTouchEvents() {
  return isBrowser && 'ontouchstart' in window;
}
function isTouchScreen() {
  return supportsTouchEvents() || (isBrowser && window.navigator.maxTouchPoints > 1);
}
function supportsPointerEvents() {
  return isBrowser && 'onpointerdown' in window;
}
function supportsPointerLock() {
  return isBrowser && 'exitPointerLock' in window.document;
}
function supportsGestureEvents() {
  try {
    return 'constructor' in GestureEvent;
  } catch (e2) {
    return false;
  }
}
var SUPPORT = {
  isBrowser,
  gesture: supportsGestureEvents(),
  touch: isTouchScreen(),
  touchscreen: isTouchScreen(),
  pointer: supportsPointerEvents(),
  pointerLock: supportsPointerLock(),
};
var DEFAULT_PREVENT_SCROLL_DELAY = 250;
var DEFAULT_DRAG_DELAY = 180;
var DEFAULT_SWIPE_VELOCITY = 0.5;
var DEFAULT_SWIPE_DISTANCE = 50;
var DEFAULT_SWIPE_DURATION = 250;
var DEFAULT_KEYBOARD_DISPLACEMENT = 10;
var DEFAULT_DRAG_AXIS_THRESHOLD = {
  mouse: 0,
  touch: 0,
  pen: 8,
};
var dragConfigResolver = _objectSpread2(
  _objectSpread2({}, coordinatesConfigResolver),
  {},
  {
    device(_v, _k, { pointer: { touch = false, lock = false, mouse = false } = {} }) {
      this.pointerLock = lock && SUPPORT.pointerLock;
      if (SUPPORT.touch && touch) return 'touch';
      if (this.pointerLock) return 'mouse';
      if (SUPPORT.pointer && !mouse) return 'pointer';
      if (SUPPORT.touch) return 'touch';
      return 'mouse';
    },
    preventScrollAxis(value, _k, { preventScroll }) {
      this.preventScrollDelay =
        typeof preventScroll === 'number'
          ? preventScroll
          : preventScroll || (preventScroll === void 0 && value)
          ? DEFAULT_PREVENT_SCROLL_DELAY
          : void 0;
      if (!SUPPORT.touchscreen || preventScroll === false) return void 0;
      return value ? value : preventScroll !== void 0 ? 'y' : void 0;
    },
    pointerCapture(_v, _k, { pointer: { capture = true, buttons = 1, keys: keys2 = true } = {} }) {
      this.pointerButtons = buttons;
      this.keys = keys2;
      return !this.pointerLock && this.device === 'pointer' && capture;
    },
    threshold(value, _k, { filterTaps = false, tapsThreshold = 3, axis = void 0 }) {
      const threshold = V.toVector(value, filterTaps ? tapsThreshold : axis ? 1 : 0);
      this.filterTaps = filterTaps;
      this.tapsThreshold = tapsThreshold;
      return threshold;
    },
    swipe({
      velocity = DEFAULT_SWIPE_VELOCITY,
      distance = DEFAULT_SWIPE_DISTANCE,
      duration = DEFAULT_SWIPE_DURATION,
    } = {}) {
      return {
        velocity: this.transform(V.toVector(velocity)),
        distance: this.transform(V.toVector(distance)),
        duration,
      };
    },
    delay(value = 0) {
      switch (value) {
        case true:
          return DEFAULT_DRAG_DELAY;
        case false:
          return 0;
        default:
          return value;
      }
    },
    axisThreshold(value) {
      if (!value) return DEFAULT_DRAG_AXIS_THRESHOLD;
      return _objectSpread2(_objectSpread2({}, DEFAULT_DRAG_AXIS_THRESHOLD), value);
    },
    keyboardDisplacement(value = DEFAULT_KEYBOARD_DISPLACEMENT) {
      return value;
    },
  },
);
if (true) {
  Object.assign(dragConfigResolver, {
    useTouch(value) {
      if (value !== void 0) {
        throw Error(
          `[@use-gesture]: \`useTouch\` option has been renamed to \`pointer.touch\`. Use it as in \`{ pointer: { touch: true } }\`.`,
        );
      }
      return NaN;
    },
    experimental_preventWindowScrollY(value) {
      if (value !== void 0) {
        throw Error(
          `[@use-gesture]: \`experimental_preventWindowScrollY\` option has been renamed to \`preventScroll\`.`,
        );
      }
      return NaN;
    },
    swipeVelocity(value) {
      if (value !== void 0) {
        throw Error(
          `[@use-gesture]: \`swipeVelocity\` option has been renamed to \`swipe.velocity\`. Use it as in \`{ swipe: { velocity: 0.5 } }\`.`,
        );
      }
      return NaN;
    },
    swipeDistance(value) {
      if (value !== void 0) {
        throw Error(
          `[@use-gesture]: \`swipeDistance\` option has been renamed to \`swipe.distance\`. Use it as in \`{ swipe: { distance: 50 } }\`.`,
        );
      }
      return NaN;
    },
    swipeDuration(value) {
      if (value !== void 0) {
        throw Error(
          `[@use-gesture]: \`swipeDuration\` option has been renamed to \`swipe.duration\`. Use it as in \`{ swipe: { duration: 250 } }\`.`,
        );
      }
      return NaN;
    },
  });
}
function clampStateInternalMovementToBounds(state) {
  const [ox, oy] = state.overflow;
  const [dx, dy] = state._delta;
  const [dirx, diry] = state._direction;
  if ((ox < 0 && dx > 0 && dirx < 0) || (ox > 0 && dx < 0 && dirx > 0)) {
    state._movement[0] = state._movementBound[0];
  }
  if ((oy < 0 && dy > 0 && diry < 0) || (oy > 0 && dy < 0 && diry > 0)) {
    state._movement[1] = state._movementBound[1];
  }
}
var SCALE_ANGLE_RATIO_INTENT_DEG = 30;
var PINCH_WHEEL_RATIO = 100;
var PinchEngine = class extends Engine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, 'ingKey', 'pinching');
    _defineProperty(this, 'aliasKey', 'da');
  }
  init() {
    this.state.offset = [1, 0];
    this.state.lastOffset = [1, 0];
    this.state._pointerEvents = /* @__PURE__ */ new Map();
  }
  reset() {
    super.reset();
    const state = this.state;
    state._touchIds = [];
    state.canceled = false;
    state.cancel = this.cancel.bind(this);
    state.turns = 0;
  }
  computeOffset() {
    const { type, movement, lastOffset } = this.state;
    if (type === 'wheel') {
      this.state.offset = V.add(movement, lastOffset);
    } else {
      this.state.offset = [(1 + movement[0]) * lastOffset[0], movement[1] + lastOffset[1]];
    }
  }
  computeMovement() {
    const { offset, lastOffset } = this.state;
    this.state.movement = [offset[0] / lastOffset[0], offset[1] - lastOffset[1]];
  }
  axisIntent() {
    const state = this.state;
    const [_m0, _m1] = state._movement;
    if (!state.axis) {
      const axisMovementDifference = Math.abs(_m0) * SCALE_ANGLE_RATIO_INTENT_DEG - Math.abs(_m1);
      if (axisMovementDifference < 0) state.axis = 'angle';
      else if (axisMovementDifference > 0) state.axis = 'scale';
    }
  }
  restrictToAxis(v) {
    if (this.config.lockDirection) {
      if (this.state.axis === 'scale') v[1] = 0;
      else if (this.state.axis === 'angle') v[0] = 0;
    }
  }
  cancel() {
    const state = this.state;
    if (state.canceled) return;
    setTimeout(() => {
      state.canceled = true;
      state._active = false;
      this.compute();
      this.emit();
    }, 0);
  }
  touchStart(event) {
    this.ctrl.setEventIds(event);
    const state = this.state;
    const ctrlTouchIds = this.ctrl.touchIds;
    if (state._active) {
      if (state._touchIds.every((id) => ctrlTouchIds.has(id))) return;
    }
    if (ctrlTouchIds.size < 2) return;
    this.start(event);
    state._touchIds = Array.from(ctrlTouchIds).slice(0, 2);
    const payload = touchDistanceAngle(event, state._touchIds);
    this.pinchStart(event, payload);
  }
  pointerStart(event) {
    if (event.buttons != null && event.buttons % 2 !== 1) return;
    this.ctrl.setEventIds(event);
    event.target.setPointerCapture(event.pointerId);
    const state = this.state;
    const _pointerEvents = state._pointerEvents;
    const ctrlPointerIds = this.ctrl.pointerIds;
    if (state._active) {
      if (Array.from(_pointerEvents.keys()).every((id) => ctrlPointerIds.has(id))) return;
    }
    if (_pointerEvents.size < 2) {
      _pointerEvents.set(event.pointerId, event);
    }
    if (state._pointerEvents.size < 2) return;
    this.start(event);
    const payload = distanceAngle(...Array.from(_pointerEvents.values()));
    this.pinchStart(event, payload);
  }
  pinchStart(event, payload) {
    const state = this.state;
    state.origin = payload.origin;
    this.computeValues([payload.distance, payload.angle]);
    this.computeInitial();
    this.compute(event);
    this.emit();
  }
  touchMove(event) {
    if (!this.state._active) return;
    const payload = touchDistanceAngle(event, this.state._touchIds);
    this.pinchMove(event, payload);
  }
  pointerMove(event) {
    const _pointerEvents = this.state._pointerEvents;
    if (_pointerEvents.has(event.pointerId)) {
      _pointerEvents.set(event.pointerId, event);
    }
    if (!this.state._active) return;
    const payload = distanceAngle(...Array.from(_pointerEvents.values()));
    this.pinchMove(event, payload);
  }
  pinchMove(event, payload) {
    const state = this.state;
    const prev_a = state._values[1];
    const delta_a = payload.angle - prev_a;
    let delta_turns = 0;
    if (Math.abs(delta_a) > 270) delta_turns += Math.sign(delta_a);
    this.computeValues([payload.distance, payload.angle - 360 * delta_turns]);
    state.origin = payload.origin;
    state.turns = delta_turns;
    state._movement = [state._values[0] / state._initial[0] - 1, state._values[1] - state._initial[1]];
    this.compute(event);
    this.emit();
  }
  touchEnd(event) {
    this.ctrl.setEventIds(event);
    if (!this.state._active) return;
    if (this.state._touchIds.some((id) => !this.ctrl.touchIds.has(id))) {
      this.state._active = false;
      this.compute(event);
      this.emit();
    }
  }
  pointerEnd(event) {
    const state = this.state;
    this.ctrl.setEventIds(event);
    try {
      event.target.releasePointerCapture(event.pointerId);
    } catch (_unused) {}
    if (state._pointerEvents.has(event.pointerId)) {
      state._pointerEvents.delete(event.pointerId);
    }
    if (!state._active) return;
    if (state._pointerEvents.size < 2) {
      state._active = false;
      this.compute(event);
      this.emit();
    }
  }
  gestureStart(event) {
    if (event.cancelable) event.preventDefault();
    const state = this.state;
    if (state._active) return;
    this.start(event);
    this.computeValues([event.scale, event.rotation]);
    state.origin = [event.clientX, event.clientY];
    this.compute(event);
    this.emit();
  }
  gestureMove(event) {
    if (event.cancelable) event.preventDefault();
    if (!this.state._active) return;
    const state = this.state;
    this.computeValues([event.scale, event.rotation]);
    state.origin = [event.clientX, event.clientY];
    const _previousMovement = state._movement;
    state._movement = [event.scale - 1, event.rotation];
    state._delta = V.sub(state._movement, _previousMovement);
    this.compute(event);
    this.emit();
  }
  gestureEnd(event) {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute(event);
    this.emit();
  }
  wheel(event) {
    const modifierKey = this.config.modifierKey;
    if (modifierKey && !event[modifierKey]) return;
    if (!this.state._active) this.wheelStart(event);
    else this.wheelChange(event);
    this.timeoutStore.add('wheelEnd', this.wheelEnd.bind(this));
  }
  wheelStart(event) {
    this.start(event);
    this.wheelChange(event);
  }
  wheelChange(event) {
    const isR3f = 'uv' in event;
    if (!isR3f) {
      if (event.cancelable) {
        event.preventDefault();
      }
      if (!event.defaultPrevented) {
        console.warn(`[@use-gesture]: To properly support zoom on trackpads, try using the \`target\` option.

This message will only appear in development mode.`);
      }
    }
    const state = this.state;
    state._delta = [(-wheelValues(event)[1] / PINCH_WHEEL_RATIO) * state.offset[0], 0];
    V.addTo(state._movement, state._delta);
    clampStateInternalMovementToBounds(state);
    this.state.origin = [event.clientX, event.clientY];
    this.compute(event);
    this.emit();
  }
  wheelEnd() {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute();
    this.emit();
  }
  bind(bindFunction) {
    const device = this.config.device;
    if (!!device) {
      bindFunction(device, 'start', this[device + 'Start'].bind(this));
      bindFunction(device, 'change', this[device + 'Move'].bind(this));
      bindFunction(device, 'end', this[device + 'End'].bind(this));
      bindFunction(device, 'cancel', this[device + 'End'].bind(this));
    }
    if (this.config.pinchOnWheel) {
      bindFunction('wheel', '', this.wheel.bind(this), {
        passive: false,
      });
    }
  }
};
var pinchConfigResolver = _objectSpread2(
  _objectSpread2({}, commonConfigResolver),
  {},
  {
    device(_v, _k, { shared, pointer: { touch = false } = {} }) {
      const sharedConfig = shared;
      if (sharedConfig.target && !SUPPORT.touch && SUPPORT.gesture) return 'gesture';
      if (SUPPORT.touch && touch) return 'touch';
      if (SUPPORT.touchscreen) {
        if (SUPPORT.pointer) return 'pointer';
        if (SUPPORT.touch) return 'touch';
      }
    },
    bounds(_v, _k, { scaleBounds = {}, angleBounds = {} }) {
      const _scaleBounds = (state) => {
        const D = assignDefault(call2(scaleBounds, state), {
          min: -Infinity,
          max: Infinity,
        });
        return [D.min, D.max];
      };
      const _angleBounds = (state) => {
        const A = assignDefault(call2(angleBounds, state), {
          min: -Infinity,
          max: Infinity,
        });
        return [A.min, A.max];
      };
      if (typeof scaleBounds !== 'function' && typeof angleBounds !== 'function')
        return [_scaleBounds(), _angleBounds()];
      return (state) => [_scaleBounds(state), _angleBounds(state)];
    },
    threshold(value, _k, config2) {
      this.lockDirection = config2.axis === 'lock';
      const threshold = V.toVector(value, this.lockDirection ? [0.1, 3] : 0);
      return threshold;
    },
    modifierKey(value) {
      if (value === void 0) return 'ctrlKey';
      return value;
    },
    pinchOnWheel(value = true) {
      return value;
    },
  },
);
var MoveEngine = class extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, 'ingKey', 'moving');
  }
  move(event) {
    if (this.config.mouseOnly && event.pointerType !== 'mouse') return;
    if (!this.state._active) this.moveStart(event);
    else this.moveChange(event);
    this.timeoutStore.add('moveEnd', this.moveEnd.bind(this));
  }
  moveStart(event) {
    this.start(event);
    this.computeValues(pointerValues(event));
    this.compute(event);
    this.computeInitial();
    this.emit();
  }
  moveChange(event) {
    if (!this.state._active) return;
    const values = pointerValues(event);
    const state = this.state;
    state._delta = V.sub(values, state._values);
    V.addTo(state._movement, state._delta);
    this.computeValues(values);
    this.compute(event);
    this.emit();
  }
  moveEnd(event) {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute(event);
    this.emit();
  }
  bind(bindFunction) {
    bindFunction('pointer', 'change', this.move.bind(this));
    bindFunction('pointer', 'leave', this.moveEnd.bind(this));
  }
};
var moveConfigResolver = _objectSpread2(
  _objectSpread2({}, coordinatesConfigResolver),
  {},
  {
    mouseOnly: (value = true) => value,
  },
);
var ScrollEngine = class extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, 'ingKey', 'scrolling');
  }
  scroll(event) {
    if (!this.state._active) this.start(event);
    this.scrollChange(event);
    this.timeoutStore.add('scrollEnd', this.scrollEnd.bind(this));
  }
  scrollChange(event) {
    if (event.cancelable) event.preventDefault();
    const state = this.state;
    const values = scrollValues(event);
    state._delta = V.sub(values, state._values);
    V.addTo(state._movement, state._delta);
    this.computeValues(values);
    this.compute(event);
    this.emit();
  }
  scrollEnd() {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute();
    this.emit();
  }
  bind(bindFunction) {
    bindFunction('scroll', '', this.scroll.bind(this));
  }
};
var scrollConfigResolver = coordinatesConfigResolver;
var WheelEngine = class extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, 'ingKey', 'wheeling');
  }
  wheel(event) {
    if (!this.state._active) this.start(event);
    this.wheelChange(event);
    this.timeoutStore.add('wheelEnd', this.wheelEnd.bind(this));
  }
  wheelChange(event) {
    const state = this.state;
    state._delta = wheelValues(event);
    V.addTo(state._movement, state._delta);
    clampStateInternalMovementToBounds(state);
    this.compute(event);
    this.emit();
  }
  wheelEnd() {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute();
    this.emit();
  }
  bind(bindFunction) {
    bindFunction('wheel', '', this.wheel.bind(this));
  }
};
var wheelConfigResolver = coordinatesConfigResolver;
var HoverEngine = class extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, 'ingKey', 'hovering');
  }
  enter(event) {
    if (this.config.mouseOnly && event.pointerType !== 'mouse') return;
    this.start(event);
    this.computeValues(pointerValues(event));
    this.compute(event);
    this.emit();
  }
  leave(event) {
    if (this.config.mouseOnly && event.pointerType !== 'mouse') return;
    const state = this.state;
    if (!state._active) return;
    state._active = false;
    const values = pointerValues(event);
    state._movement = state._delta = V.sub(values, state._values);
    this.computeValues(values);
    this.compute(event);
    state.delta = state.movement;
    this.emit();
  }
  bind(bindFunction) {
    bindFunction('pointer', 'enter', this.enter.bind(this));
    bindFunction('pointer', 'leave', this.leave.bind(this));
  }
};
var hoverConfigResolver = _objectSpread2(
  _objectSpread2({}, coordinatesConfigResolver),
  {},
  {
    mouseOnly: (value = true) => value,
  },
);
var EngineMap = /* @__PURE__ */ new Map();
var ConfigResolverMap = /* @__PURE__ */ new Map();
function registerAction(action) {
  EngineMap.set(action.key, action.engine);
  ConfigResolverMap.set(action.key, action.resolver);
}
var dragAction = {
  key: 'drag',
  engine: DragEngine,
  resolver: dragConfigResolver,
};
var hoverAction = {
  key: 'hover',
  engine: HoverEngine,
  resolver: hoverConfigResolver,
};
var moveAction = {
  key: 'move',
  engine: MoveEngine,
  resolver: moveConfigResolver,
};
var pinchAction = {
  key: 'pinch',
  engine: PinchEngine,
  resolver: pinchConfigResolver,
};
var scrollAction = {
  key: 'scroll',
  engine: ScrollEngine,
  resolver: scrollConfigResolver,
};
var wheelAction = {
  key: 'wheel',
  engine: WheelEngine,
  resolver: wheelConfigResolver,
};

// ../../node_modules/@use-gesture/react/dist/use-gesture-react.esm.js
var import_react5 = __toESM(require_react());

// ../../node_modules/@use-gesture/core/dist/use-gesture-core.esm.js
function _objectWithoutPropertiesLoose3(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose3(source, excluded);
  var key, i2;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
      key = sourceSymbolKeys[i2];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
var sharedConfigResolver = {
  target(value) {
    if (value) {
      return () => ('current' in value ? value.current : value);
    }
    return void 0;
  },
  enabled(value = true) {
    return value;
  },
  window(value = SUPPORT.isBrowser ? window : void 0) {
    return value;
  },
  eventOptions({ passive = true, capture = false } = {}) {
    return {
      passive,
      capture,
    };
  },
  transform(value) {
    return value;
  },
};
var _excluded2 = ['target', 'eventOptions', 'window', 'enabled', 'transform'];
function resolveWith(config2 = {}, resolvers) {
  const result = {};
  for (const [key, resolver] of Object.entries(resolvers)) {
    switch (typeof resolver) {
      case 'function':
        if (true) {
          const r3 = resolver.call(result, config2[key], key, config2);
          if (!Number.isNaN(r3)) result[key] = r3;
        } else {
          result[key] = resolver.call(result, config2[key], key, config2);
        }
        break;
      case 'object':
        result[key] = resolveWith(config2[key], resolver);
        break;
      case 'boolean':
        if (resolver) result[key] = config2[key];
        break;
    }
  }
  return result;
}
function parse(newConfig, gestureKey, _config = {}) {
  const _ref = newConfig,
    { target, eventOptions, window: window2, enabled, transform } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded2);
  _config.shared = resolveWith(
    {
      target,
      eventOptions,
      window: window2,
      enabled,
      transform,
    },
    sharedConfigResolver,
  );
  if (gestureKey) {
    const resolver = ConfigResolverMap.get(gestureKey);
    _config[gestureKey] = resolveWith(
      _objectSpread2(
        {
          shared: _config.shared,
        },
        rest,
      ),
      resolver,
    );
  } else {
    for (const key in rest) {
      const resolver = ConfigResolverMap.get(key);
      if (resolver) {
        _config[key] = resolveWith(
          _objectSpread2(
            {
              shared: _config.shared,
            },
            rest[key],
          ),
          resolver,
        );
      } else if (true) {
        if (!['drag', 'pinch', 'scroll', 'wheel', 'move', 'hover'].includes(key)) {
          if (key === 'domTarget') {
            throw Error(`[@use-gesture]: \`domTarget\` option has been renamed to \`target\`.`);
          }
          console.warn(
            `[@use-gesture]: Unknown config key \`${key}\` was used. Please read the documentation for further information.`,
          );
        }
      }
    }
  }
  return _config;
}
var EventStore = class {
  constructor(ctrl, gestureKey) {
    _defineProperty(this, '_listeners', /* @__PURE__ */ new Set());
    this._ctrl = ctrl;
    this._gestureKey = gestureKey;
  }
  add(element, device, action, handler, options) {
    const listeners2 = this._listeners;
    const type = toDomEventType(device, action);
    const _options = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {};
    const eventOptions = _objectSpread2(_objectSpread2({}, _options), options);
    element.addEventListener(type, handler, eventOptions);
    const remove = () => {
      element.removeEventListener(type, handler, eventOptions);
      listeners2.delete(remove);
    };
    listeners2.add(remove);
    return remove;
  }
  clean() {
    this._listeners.forEach((remove) => remove());
    this._listeners.clear();
  }
};
var TimeoutStore = class {
  constructor() {
    _defineProperty(this, '_timeouts', /* @__PURE__ */ new Map());
  }
  add(key, callback, ms = 140, ...args) {
    this.remove(key);
    this._timeouts.set(key, window.setTimeout(callback, ms, ...args));
  }
  remove(key) {
    const timeout = this._timeouts.get(key);
    if (timeout) window.clearTimeout(timeout);
  }
  clean() {
    this._timeouts.forEach((timeout) => void window.clearTimeout(timeout));
    this._timeouts.clear();
  }
};
var Controller2 = class {
  constructor(handlers) {
    _defineProperty(this, 'gestures', /* @__PURE__ */ new Set());
    _defineProperty(this, '_targetEventStore', new EventStore(this));
    _defineProperty(this, 'gestureEventStores', {});
    _defineProperty(this, 'gestureTimeoutStores', {});
    _defineProperty(this, 'handlers', {});
    _defineProperty(this, 'config', {});
    _defineProperty(this, 'pointerIds', /* @__PURE__ */ new Set());
    _defineProperty(this, 'touchIds', /* @__PURE__ */ new Set());
    _defineProperty(this, 'state', {
      shared: {
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
      },
    });
    resolveGestures(this, handlers);
  }
  setEventIds(event) {
    if (isTouch(event)) {
      this.touchIds = new Set(touchIds(event));
      return this.touchIds;
    } else if ('pointerId' in event) {
      if (event.type === 'pointerup' || event.type === 'pointercancel') this.pointerIds.delete(event.pointerId);
      else if (event.type === 'pointerdown') this.pointerIds.add(event.pointerId);
      return this.pointerIds;
    }
  }
  applyHandlers(handlers, nativeHandlers) {
    this.handlers = handlers;
    this.nativeHandlers = nativeHandlers;
  }
  applyConfig(config2, gestureKey) {
    this.config = parse(config2, gestureKey, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const key of this.gestures) {
      this.gestureEventStores[key].clean();
      this.gestureTimeoutStores[key].clean();
    }
  }
  effect() {
    if (this.config.shared.target) this.bind();
    return () => this._targetEventStore.clean();
  }
  bind(...args) {
    const sharedConfig = this.config.shared;
    const props = {};
    let target;
    if (sharedConfig.target) {
      target = sharedConfig.target();
      if (!target) return;
    }
    if (sharedConfig.enabled) {
      for (const gestureKey of this.gestures) {
        const gestureConfig = this.config[gestureKey];
        const bindFunction = bindToProps(props, gestureConfig.eventOptions, !!target);
        if (gestureConfig.enabled) {
          const Engine2 = EngineMap.get(gestureKey);
          new Engine2(this, args, gestureKey).bind(bindFunction);
        }
      }
      const nativeBindFunction = bindToProps(props, sharedConfig.eventOptions, !!target);
      for (const eventKey in this.nativeHandlers) {
        nativeBindFunction(
          eventKey,
          '',
          (event) =>
            this.nativeHandlers[eventKey](
              _objectSpread2(
                _objectSpread2({}, this.state.shared),
                {},
                {
                  event,
                  args,
                },
              ),
            ),
          void 0,
          true,
        );
      }
    }
    for (const handlerProp in props) {
      props[handlerProp] = chain(...props[handlerProp]);
    }
    if (!target) return props;
    for (const handlerProp in props) {
      const { device, capture, passive } = parseProp(handlerProp);
      this._targetEventStore.add(target, device, '', props[handlerProp], {
        capture,
        passive,
      });
    }
  }
};
function setupGesture(ctrl, gestureKey) {
  ctrl.gestures.add(gestureKey);
  ctrl.gestureEventStores[gestureKey] = new EventStore(ctrl, gestureKey);
  ctrl.gestureTimeoutStores[gestureKey] = new TimeoutStore();
}
function resolveGestures(ctrl, internalHandlers) {
  if (internalHandlers.drag) setupGesture(ctrl, 'drag');
  if (internalHandlers.wheel) setupGesture(ctrl, 'wheel');
  if (internalHandlers.scroll) setupGesture(ctrl, 'scroll');
  if (internalHandlers.move) setupGesture(ctrl, 'move');
  if (internalHandlers.pinch) setupGesture(ctrl, 'pinch');
  if (internalHandlers.hover) setupGesture(ctrl, 'hover');
}
var bindToProps =
  (props, eventOptions, withPassiveOption) =>
  (device, action, handler, options = {}, isNative = false) => {
    var _options$capture, _options$passive;
    const capture =
      (_options$capture = options.capture) !== null && _options$capture !== void 0
        ? _options$capture
        : eventOptions.capture;
    const passive =
      (_options$passive = options.passive) !== null && _options$passive !== void 0
        ? _options$passive
        : eventOptions.passive;
    let handlerProp = isNative ? device : toHandlerProp(device, action, capture);
    if (withPassiveOption && passive) handlerProp += 'Passive';
    props[handlerProp] = props[handlerProp] || [];
    props[handlerProp].push(handler);
  };
var RE_NOT_NATIVE = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function sortHandlers(_handlers) {
  const native = {};
  const handlers = {};
  const actions = /* @__PURE__ */ new Set();
  for (let key in _handlers) {
    if (RE_NOT_NATIVE.test(key)) {
      actions.add(RegExp.lastMatch);
      handlers[key] = _handlers[key];
    } else {
      native[key] = _handlers[key];
    }
  }
  return [handlers, native, actions];
}
function registerGesture(actions, handlers, handlerKey, key, internalHandlers, config2) {
  if (!actions.has(handlerKey)) return;
  if (!EngineMap.has(key)) {
    if (true) {
      console.warn(`[@use-gesture]: You've created a custom handler that that uses the \`${key}\` gesture but isn't properly configured.

Please add \`${key}Action\` when creating your handler.`);
    }
    return;
  }
  const startKey = handlerKey + 'Start';
  const endKey = handlerKey + 'End';
  const fn = (state) => {
    let memo = void 0;
    if (state.first && startKey in handlers) handlers[startKey](state);
    if (handlerKey in handlers) memo = handlers[handlerKey](state);
    if (state.last && endKey in handlers) handlers[endKey](state);
    return memo;
  };
  internalHandlers[key] = fn;
  config2[key] = config2[key] || {};
}
function parseMergedHandlers(mergedHandlers, mergedConfig) {
  const [handlers, nativeHandlers, actions] = sortHandlers(mergedHandlers);
  const internalHandlers = {};
  registerGesture(actions, handlers, 'onDrag', 'drag', internalHandlers, mergedConfig);
  registerGesture(actions, handlers, 'onWheel', 'wheel', internalHandlers, mergedConfig);
  registerGesture(actions, handlers, 'onScroll', 'scroll', internalHandlers, mergedConfig);
  registerGesture(actions, handlers, 'onPinch', 'pinch', internalHandlers, mergedConfig);
  registerGesture(actions, handlers, 'onMove', 'move', internalHandlers, mergedConfig);
  registerGesture(actions, handlers, 'onHover', 'hover', internalHandlers, mergedConfig);
  return {
    handlers: internalHandlers,
    config: mergedConfig,
    nativeHandlers,
  };
}

// ../../node_modules/@use-gesture/react/dist/use-gesture-react.esm.js
function useRecognizers(handlers, config2 = {}, gestureKey, nativeHandlers) {
  const ctrl = import_react5.default.useMemo(() => new Controller2(handlers), []);
  ctrl.applyHandlers(handlers, nativeHandlers);
  ctrl.applyConfig(config2, gestureKey);
  import_react5.default.useEffect(ctrl.effect.bind(ctrl));
  import_react5.default.useEffect(() => {
    return ctrl.clean.bind(ctrl);
  }, []);
  if (config2.target === void 0) {
    return ctrl.bind.bind(ctrl);
  }
  return void 0;
}
function createUseGesture(actions) {
  actions.forEach(registerAction);
  return function useGesture2(_handlers, _config) {
    const { handlers, nativeHandlers, config: config2 } = parseMergedHandlers(_handlers, _config || {});
    return useRecognizers(handlers, config2, void 0, nativeHandlers);
  };
}
function useGesture(handlers, config2) {
  const hook = createUseGesture([dragAction, pinchAction, scrollAction, wheelAction, moveAction, hoverAction]);
  return hook(handlers, config2 || {});
}

// app/hooks/useInteract.ts
var useInteract = ({ onClick = () => ({}) }) => {
  const [interactStyles, api] = useSpring({ scale: 1, config: config.wobbly }, []);
  const bind = useGesture({
    onMouseDown: () => interactStyles.scale.start(0.9),
    onMouseUp: async () => {
      onClick();
    },
    onHover: ({ hovering }) => (hovering ? interactStyles.scale.start(1.1) : interactStyles.scale.start(1)),
  });
  return { bind, interactStyles };
};
var useInteract_default = useInteract;

// app/hooks/useMenu.tsx
var import_react8 = __toESM(require_react(), 1);

// ../../node_modules/proxy-compare/dist/index.modern.js
var e = Symbol();
var t = Symbol();
var r2 = 'a';
var n = 'w';
var o = (e2, t2) => new Proxy(e2, t2);
var s = Object.getPrototypeOf;
var c = /* @__PURE__ */ new WeakMap();
var l = (e2) => e2 && (c.has(e2) ? c.get(e2) : s(e2) === Object.prototype || s(e2) === Array.prototype);
var f = (e2) => 'object' == typeof e2 && null !== e2;
var i = (e2) => {
  if (Array.isArray(e2)) return Array.from(e2);
  const t2 = Object.getOwnPropertyDescriptors(e2);
  return (
    Object.values(t2).forEach((e3) => {
      e3.configurable = true;
    }),
    Object.create(s(e2), t2)
  );
};
var u = (e2) => e2[t] || e2;
var a = (s2, c6, f2, p2) => {
  if (!l(s2)) return s2;
  let g = p2 && p2.get(s2);
  if (!g) {
    const e2 = u(s2);
    (g = ((e3) => Object.values(Object.getOwnPropertyDescriptors(e3)).some((e4) => !e4.configurable && !e4.writable))(
      e2,
    )
      ? [e2, i(e2)]
      : [e2]),
      null == p2 || p2.set(s2, g);
  }
  const [y2, h5] = g;
  let w2 = f2 && f2.get(y2);
  return (
    (w2 && w2[1].f === !!h5) ||
      ((w2 = ((o3, s3) => {
        const c7 = { f: s3 };
        let l2 = false;
        const f3 = (e2, t2) => {
            if (!l2) {
              let s4 = c7[r2].get(o3);
              if ((s4 || ((s4 = {}), c7[r2].set(o3, s4)), e2 === n)) s4[n] = true;
              else {
                let r3 = s4[e2];
                r3 || ((r3 = /* @__PURE__ */ new Set()), (s4[e2] = r3)), r3.add(t2);
              }
            }
          },
          i2 = {
            get: (e2, n2) => (n2 === t ? o3 : (f3('k', n2), a(Reflect.get(e2, n2), c7[r2], c7.c))),
            has: (t2, n2) => (n2 === e ? ((l2 = true), c7[r2].delete(o3), true) : (f3('h', n2), Reflect.has(t2, n2))),
            getOwnPropertyDescriptor: (e2, t2) => (f3('o', t2), Reflect.getOwnPropertyDescriptor(e2, t2)),
            ownKeys: (e2) => (f3(n), Reflect.ownKeys(e2)),
          };
        return s3 && (i2.set = i2.deleteProperty = () => false), [i2, c7];
      })(y2, !!h5)),
      (w2[1].p = o(h5 || y2, w2[0])),
      f2 && f2.set(y2, w2)),
    (w2[1][r2] = c6),
    (w2[1].c = f2),
    w2[1].p
  );
};
var p = (e2, t2, r3, o3) => {
  if (Object.is(e2, t2)) return false;
  if (!f(e2) || !f(t2)) return true;
  const s2 = r3.get(u(e2));
  if (!s2) return true;
  if (o3) {
    const r4 = o3.get(e2);
    if (r4 && r4.n === t2) return r4.g;
    o3.set(e2, { n: t2, g: false });
  }
  let c6 = null;
  try {
    for (const r4 of s2.h || []) if (((c6 = Reflect.has(e2, r4) !== Reflect.has(t2, r4)), c6)) return c6;
    if (true === s2[n]) {
      if (
        ((c6 = ((e3, t3) => {
          const r4 = Reflect.ownKeys(e3),
            n2 = Reflect.ownKeys(t3);
          return r4.length !== n2.length || r4.some((e4, t4) => e4 !== n2[t4]);
        })(e2, t2)),
        c6)
      )
        return c6;
    } else
      for (const r4 of s2.o || [])
        if (((c6 = !!Reflect.getOwnPropertyDescriptor(e2, r4) != !!Reflect.getOwnPropertyDescriptor(t2, r4)), c6))
          return c6;
    for (const n2 of s2.k || []) if (((c6 = p(e2[n2], t2[n2], r3, o3)), c6)) return c6;
    return null === c6 && (c6 = true), c6;
  } finally {
    o3 && o3.set(e2, { n: t2, g: c6 });
  }
};
var y = (e2) => (l(e2) && e2[t]) || null;
var h = (e2, t2 = true) => {
  c.set(e2, t2);
};
var w = (e2, t2, r3) => {
  const o3 = [],
    s2 = /* @__PURE__ */ new WeakSet(),
    c6 = (e3, l2) => {
      if (s2.has(e3)) return;
      f(e3) && s2.add(e3);
      const i2 = f(e3) && t2.get(u(e3));
      if (i2) {
        var a2, p2;
        if (
          (null == (a2 = i2.h) ||
            a2.forEach((e4) => {
              const t3 = `:has(${String(e4)})`;
              o3.push(l2 ? [...l2, t3] : [t3]);
            }),
          true === i2[n])
        ) {
          const e4 = ':ownKeys';
          o3.push(l2 ? [...l2, e4] : [e4]);
        } else {
          var g;
          null == (g = i2.o) ||
            g.forEach((e4) => {
              const t3 = `:hasOwn(${String(e4)})`;
              o3.push(l2 ? [...l2, t3] : [t3]);
            });
        }
        null == (p2 = i2.k) ||
          p2.forEach((t3) => {
            (r3 && !('value' in (Object.getOwnPropertyDescriptor(e3, t3) || {}))) ||
              c6(e3[t3], l2 ? [...l2, t3] : [t3]);
          });
      } else l2 && o3.push(l2);
    };
  return c6(e2), o3;
};

// ../../node_modules/valtio/esm/vanilla.mjs
var isObject = (x) => typeof x === 'object' && x !== null;
var proxyStateMap = /* @__PURE__ */ new WeakMap();
var refSet = /* @__PURE__ */ new WeakSet();
var buildProxyFunction = (
  objectIs = Object.is,
  newProxy = (target, handler) => new Proxy(target, handler),
  canProxy = (x) =>
    isObject(x) &&
    !refSet.has(x) &&
    (Array.isArray(x) || !(Symbol.iterator in x)) &&
    !(x instanceof WeakMap) &&
    !(x instanceof WeakSet) &&
    !(x instanceof Error) &&
    !(x instanceof Number) &&
    !(x instanceof Date) &&
    !(x instanceof String) &&
    !(x instanceof RegExp) &&
    !(x instanceof ArrayBuffer),
  defaultHandlePromise = (promise) => {
    switch (promise.status) {
      case 'fulfilled':
        return promise.value;
      case 'rejected':
        throw promise.reason;
      default:
        throw promise;
    }
  },
  snapCache = /* @__PURE__ */ new WeakMap(),
  createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
    const cache = snapCache.get(target);
    if ((cache == null ? void 0 : cache[0]) === version) {
      return cache[1];
    }
    const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
    h(snap, true);
    snapCache.set(target, [version, snap]);
    Reflect.ownKeys(target).forEach((key) => {
      if (Object.getOwnPropertyDescriptor(snap, key)) {
        return;
      }
      const value = Reflect.get(target, key);
      const desc = {
        value,
        enumerable: true,
        configurable: true,
      };
      if (refSet.has(value)) {
        h(value, false);
      } else if (value instanceof Promise) {
        delete desc.value;
        desc.get = () => handlePromise(value);
      } else if (proxyStateMap.has(value)) {
        const [target2, ensureVersion] = proxyStateMap.get(value);
        desc.value = createSnapshot(target2, ensureVersion(), handlePromise);
      }
      Object.defineProperty(snap, key, desc);
    });
    return snap;
  },
  proxyCache = /* @__PURE__ */ new WeakMap(),
  versionHolder = [1, 1],
  proxyFunction = (initialObject) => {
    if (!isObject(initialObject)) {
      throw new Error('object required');
    }
    const found = proxyCache.get(initialObject);
    if (found) {
      return found;
    }
    let version = versionHolder[0];
    const listeners2 = /* @__PURE__ */ new Set();
    const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
      if (version !== nextVersion) {
        version = nextVersion;
        listeners2.forEach((listener) => listener(op, nextVersion));
      }
    };
    let checkVersion = versionHolder[1];
    const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
      if (checkVersion !== nextCheckVersion && !listeners2.size) {
        checkVersion = nextCheckVersion;
        propProxyStates.forEach(([propProxyState]) => {
          const propVersion = propProxyState[1](nextCheckVersion);
          if (propVersion > version) {
            version = propVersion;
          }
        });
      }
      return version;
    };
    const createPropListener = (prop) => (op, nextVersion) => {
      const newOp = [...op];
      newOp[1] = [prop, ...newOp[1]];
      notifyUpdate(newOp, nextVersion);
    };
    const propProxyStates = /* @__PURE__ */ new Map();
    const addPropListener = (prop, propProxyState) => {
      var _a;
      if (((_a = import.meta.env) == null ? void 0 : _a.MODE) !== 'production' && propProxyStates.has(prop)) {
        throw new Error('prop listener already exists');
      }
      if (listeners2.size) {
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      } else {
        propProxyStates.set(prop, [propProxyState]);
      }
    };
    const removePropListener = (prop) => {
      var _a;
      const entry = propProxyStates.get(prop);
      if (entry) {
        propProxyStates.delete(prop);
        (_a = entry[1]) == null ? void 0 : _a.call(entry);
      }
    };
    const addListener = (listener) => {
      listeners2.add(listener);
      if (listeners2.size === 1) {
        propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
          var _a;
          if (((_a = import.meta.env) == null ? void 0 : _a.MODE) !== 'production' && prevRemove) {
            throw new Error('remove already exists');
          }
          const remove = propProxyState[3](createPropListener(prop));
          propProxyStates.set(prop, [propProxyState, remove]);
        });
      }
      const removeListener = () => {
        listeners2.delete(listener);
        if (listeners2.size === 0) {
          propProxyStates.forEach(([propProxyState, remove], prop) => {
            if (remove) {
              remove();
              propProxyStates.set(prop, [propProxyState]);
            }
          });
        }
      };
      return removeListener;
    };
    const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
    const handler = {
      deleteProperty(target, prop) {
        const prevValue = Reflect.get(target, prop);
        removePropListener(prop);
        const deleted = Reflect.deleteProperty(target, prop);
        if (deleted) {
          notifyUpdate(['delete', [prop], prevValue]);
        }
        return deleted;
      },
      set(target, prop, value, receiver) {
        const hasPrevValue = Reflect.has(target, prop);
        const prevValue = Reflect.get(target, prop, receiver);
        if (
          hasPrevValue &&
          (objectIs(prevValue, value) || (proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value))))
        ) {
          return true;
        }
        removePropListener(prop);
        if (isObject(value)) {
          value = y(value) || value;
        }
        let nextValue = value;
        if (value instanceof Promise) {
          value
            .then((v) => {
              value.status = 'fulfilled';
              value.value = v;
              notifyUpdate(['resolve', [prop], v]);
            })
            .catch((e2) => {
              value.status = 'rejected';
              value.reason = e2;
              notifyUpdate(['reject', [prop], e2]);
            });
        } else {
          if (!proxyStateMap.has(value) && canProxy(value)) {
            nextValue = proxyFunction(value);
          }
          const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
          if (childProxyState) {
            addPropListener(prop, childProxyState);
          }
        }
        Reflect.set(target, prop, nextValue, receiver);
        notifyUpdate(['set', [prop], value, prevValue]);
        return true;
      },
    };
    const proxyObject = newProxy(baseObject, handler);
    proxyCache.set(initialObject, proxyObject);
    const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
    proxyStateMap.set(proxyObject, proxyState);
    Reflect.ownKeys(initialObject).forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(initialObject, key);
      const hasValue = 'value' in desc;
      delete desc.value;
      Object.defineProperty(baseObject, key, desc);
      if (hasValue) {
        proxyObject[key] = initialObject[key];
      }
    });
    return proxyObject;
  },
) => [
  proxyFunction,
  proxyStateMap,
  refSet,
  objectIs,
  newProxy,
  canProxy,
  defaultHandlePromise,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder,
];
var [defaultProxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return defaultProxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  var _a;
  const proxyState = proxyStateMap.get(proxyObject);
  if (((_a = import.meta.env) == null ? void 0 : _a.MODE) !== 'production' && !proxyState) {
    console.warn('Please use proxy object');
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  var _a;
  const proxyState = proxyStateMap.get(proxyObject);
  if (((_a = import.meta.env) == null ? void 0 : _a.MODE) !== 'production' && !proxyState) {
    console.warn('Please use proxy object');
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}

// ../../node_modules/valtio/esm/react.mjs
var import_react7 = __toESM(require_react(), 1);
var import_shim = __toESM(require_shim(), 1);
var { use } = import_react7.default;
var { useSyncExternalStore } = import_shim.default;
var useAffectedDebugValue = (state, affected) => {
  const pathList = (0, import_react7.useRef)();
  (0, import_react7.useEffect)(() => {
    pathList.current = w(state, affected, true);
  });
  (0, import_react7.useDebugValue)(pathList.current);
};
var targetCache = /* @__PURE__ */ new WeakMap();
function useSnapshot(proxyObject, options) {
  var _a;
  const notifyInSync = options == null ? void 0 : options.sync;
  const lastSnapshot = (0, import_react7.useRef)();
  const lastAffected = (0, import_react7.useRef)();
  let inRender = true;
  const currSnapshot = useSyncExternalStore(
    (0, import_react7.useCallback)(
      (callback) => {
        const unsub = subscribe(proxyObject, callback, notifyInSync);
        callback();
        return unsub;
      },
      [proxyObject, notifyInSync],
    ),
    () => {
      const nextSnapshot = snapshot(proxyObject, use);
      try {
        if (
          !inRender &&
          lastSnapshot.current &&
          lastAffected.current &&
          !p(lastSnapshot.current, nextSnapshot, lastAffected.current, /* @__PURE__ */ new WeakMap())
        ) {
          return lastSnapshot.current;
        }
      } catch (e2) {}
      return nextSnapshot;
    },
    () => snapshot(proxyObject, use),
  );
  inRender = false;
  const currAffected = /* @__PURE__ */ new WeakMap();
  (0, import_react7.useEffect)(() => {
    lastSnapshot.current = currSnapshot;
    lastAffected.current = currAffected;
  });
  if (((_a = import.meta.env) == null ? void 0 : _a.MODE) !== 'production') {
    useAffectedDebugValue(currSnapshot, currAffected);
  }
  const proxyCache = (0, import_react7.useMemo)(() => /* @__PURE__ */ new WeakMap(), []);
  return a(currSnapshot, currAffected, proxyCache, targetCache);
}

// ../../node_modules/valtio/esm/vanilla/utils.mjs
var DEVTOOLS = Symbol();
function devtools(proxyObject, options) {
  var _a, _b;
  if (typeof options === 'string') {
    console.warn('string name option is deprecated, use { name }. https://github.com/pmndrs/valtio/pull/400');
    options = { name: options };
  }
  const { enabled, name = '' } = options || {};
  let extension;
  try {
    extension =
      (enabled != null ? enabled : ((_a = import.meta.env) == null ? void 0 : _a.MODE) !== 'production') &&
      window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {}
  if (!extension) {
    if (((_b = import.meta.env) == null ? void 0 : _b.MODE) !== 'production' && enabled) {
      console.warn('[Warning] Please install/enable Redux devtools extension');
    }
    return;
  }
  let isTimeTraveling = false;
  const devtools2 = extension.connect({ name });
  const unsub1 = subscribe(proxyObject, (ops) => {
    const action = ops
      .filter(([_, path]) => path[0] !== DEVTOOLS)
      .map(([op, path]) => `${op}:${path.map(String).join('.')}`)
      .join(', ');
    if (!action) {
      return;
    }
    if (isTimeTraveling) {
      isTimeTraveling = false;
    } else {
      const snapWithoutDevtools = Object.assign({}, snapshot(proxyObject));
      delete snapWithoutDevtools[DEVTOOLS];
      devtools2.send(
        {
          type: action,
          updatedAt: /* @__PURE__ */ new Date().toLocaleString(),
        },
        snapWithoutDevtools,
      );
    }
  });
  const unsub2 = devtools2.subscribe((message) => {
    var _a2, _b2, _c, _d, _e, _f;
    if (message.type === 'ACTION' && message.payload) {
      try {
        Object.assign(proxyObject, JSON.parse(message.payload));
      } catch (e2) {
        console.error('please dispatch a serializable value that JSON.parse() and proxy() support\n', e2);
      }
    }
    if (message.type === 'DISPATCH' && message.state) {
      if (
        ((_a2 = message.payload) == null ? void 0 : _a2.type) === 'JUMP_TO_ACTION' ||
        ((_b2 = message.payload) == null ? void 0 : _b2.type) === 'JUMP_TO_STATE'
      ) {
        isTimeTraveling = true;
        const state = JSON.parse(message.state);
        Object.assign(proxyObject, state);
      }
      proxyObject[DEVTOOLS] = message;
    } else if (message.type === 'DISPATCH' && ((_c = message.payload) == null ? void 0 : _c.type) === 'COMMIT') {
      devtools2.init(snapshot(proxyObject));
    } else if (message.type === 'DISPATCH' && ((_d = message.payload) == null ? void 0 : _d.type) === 'IMPORT_STATE') {
      const actions = (_e = message.payload.nextLiftedState) == null ? void 0 : _e.actionsById;
      const computedStates = ((_f = message.payload.nextLiftedState) == null ? void 0 : _f.computedStates) || [];
      isTimeTraveling = true;
      computedStates.forEach(({ state }, index) => {
        const action = actions[index] || 'No action found';
        Object.assign(proxyObject, state);
        if (index === 0) {
          devtools2.init(snapshot(proxyObject));
        } else {
          devtools2.send(action, snapshot(proxyObject));
        }
      });
    }
  });
  devtools2.init(snapshot(proxyObject));
  return () => {
    unsub1();
    unsub2 == null ? void 0 : unsub2();
  };
}

// app/hooks/useMenu.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
var MenuContext = (0, import_react8.createContext)(null);
var MenuProvider = ({ children }) => {
  const state = (0, import_react8.useRef)(
    proxy({
      click: 0,
      hello: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 0 },
      story: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 100 },
      brain: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 200 },
      lives: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 300 },
      learn: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 400 },
      setClick: (to2) => void (state.click = to2),
      setHello: (bounds) => void (state.hello = bounds),
      setStory: (bounds) => void (state.story = bounds),
      setBrain: (bounds) => void (state.brain = bounds),
      setLives: (bounds) => void (state.lives = bounds),
      setLearn: (bounds) => void (state.learn = bounds),
    }),
  ).current;
  devtools(state, { name: 'Menu' });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    MenuContext.Provider,
    { value: state, children },
    void 0,
    false,
    {
      fileName: 'app/hooks/useMenu.tsx',
      lineNumber: 40,
      columnNumber: 10,
    },
    this,
  );
};
var useMenuState = () => {
  const state = (0, import_react8.useContext)(MenuContext);
  if (!state) throw new Error('useMenu must be used within a MenuProvider');
  return state;
};
var useMenuSnapshot = () => {
  const state = useMenuState();
  return useSnapshot(state);
};

// app/components/MenuItem.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
var MenuItem = ({ icon = '', alt, lookup }) => {
  const { [lookup]: details } = useMenuSnapshot();
  const handleClick = (0, import_react9.useCallback)(() => {
    window.scrollTo({ top: details['absoluteTop'], left: 0, behavior: 'smooth' });
  }, [details]);
  const { height, width } = useSpring({ height: '30px', width: '30px' });
  const { bind, interactStyles } = useInteract_default({ onClick: handleClick });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
    animated.div,
    {
      className: menuItem,
      ...bind(),
      style: { ...interactStyles },
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        animated.img,
        { height, width, src: icon, alt, draggable: 'false' },
        void 0,
        false,
        {
          fileName: 'app/components/MenuItem.tsx',
          lineNumber: 17,
          columnNumber: 7,
        },
        this,
      ),
    },
    void 0,
    false,
    {
      fileName: 'app/components/MenuItem.tsx',
      lineNumber: 16,
      columnNumber: 5,
    },
    this,
  );
};

// app/assets/icons/hello.svg
var hello_default = '/build/_assets/hello-HOCVOZQR.svg';

// app/assets/icons/bag.svg
var bag_default = '/build/_assets/bag-345H75YI.svg';

// app/assets/icons/brain.svg
var brain_default = '/build/_assets/brain-TX3J3G2H.svg';

// app/assets/icons/lives.svg
var lives_default = '/build/_assets/lives-CN6AV754.svg';

// app/assets/icons/dots.svg
var dots_default = '/build/_assets/dots-EHXQPFOA.svg';

// app/data/MenuData.tsx
var items = [
  { lookup: 'hello', icon: hello_default, alt: 'Hello' },
  { lookup: 'story', icon: bag_default, alt: 'History' },
  { lookup: 'brain', icon: brain_default, alt: 'Skills' },
  { lookup: 'lives', icon: lives_default, alt: 'Location' },
  { lookup: 'learn', icon: dots_default, alt: 'Learn More' },
];

// app/components/Menu.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
var import_react10 = __toESM(require_react(), 1);
var Menu = () => {
  const [{ width }] = useSpring(
    {
      from: { width: '38px' },
      to: { width: '500px' },
      config: config.stiff,
    },
    [],
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
    animated.div,
    {
      className: menuBox,
      style: { width },
      children: items.map((props, index) =>
        /* @__PURE__ */ (0, import_react10.createElement)(MenuItem, { ...props, key: index }),
      ),
    },
    void 0,
    false,
    {
      fileName: 'app/components/Menu.tsx',
      lineNumber: 16,
      columnNumber: 5,
    },
    this,
  );
};
var Menu_default = Menu;

// app/components/Hello.tsx
var import_react13 = __toESM(require_react(), 1);

// ../../node_modules/react-use-measure/dist/web.js
var import_react11 = __toESM(require_react());
var import_debounce = __toESM(require_debounce());
function useMeasure(_temp) {
  let { debounce, scroll, polyfill, offsetSize } =
    _temp === void 0
      ? {
          debounce: 0,
          scroll: false,
          offsetSize: false,
        }
      : _temp;
  const ResizeObserver2 = polyfill || (typeof window === 'undefined' ? class ResizeObserver {} : window.ResizeObserver);
  if (!ResizeObserver2) {
    throw new Error(
      'This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills',
    );
  }
  const [bounds, set] = (0, import_react11.useState)({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
  });
  const state = (0, import_react11.useRef)({
    element: null,
    scrollContainers: null,
    resizeObserver: null,
    lastBounds: bounds,
  });
  const scrollDebounce = debounce ? (typeof debounce === 'number' ? debounce : debounce.scroll) : null;
  const resizeDebounce = debounce ? (typeof debounce === 'number' ? debounce : debounce.resize) : null;
  const mounted = (0, import_react11.useRef)(false);
  (0, import_react11.useEffect)(() => {
    mounted.current = true;
    return () => void (mounted.current = false);
  });
  const [forceRefresh, resizeChange, scrollChange] = (0, import_react11.useMemo)(() => {
    const callback = () => {
      if (!state.current.element) return;
      const { left, top, width, height, bottom, right, x, y: y2 } = state.current.element.getBoundingClientRect();
      const size = {
        left,
        top,
        width,
        height,
        bottom,
        right,
        x,
        y: y2,
      };
      if (state.current.element instanceof HTMLElement && offsetSize) {
        size.height = state.current.element.offsetHeight;
        size.width = state.current.element.offsetWidth;
      }
      Object.freeze(size);
      if (mounted.current && !areBoundsEqual(state.current.lastBounds, size)) set((state.current.lastBounds = size));
    };
    return [
      callback,
      resizeDebounce ? (0, import_debounce.default)(callback, resizeDebounce) : callback,
      scrollDebounce ? (0, import_debounce.default)(callback, scrollDebounce) : callback,
    ];
  }, [set, offsetSize, scrollDebounce, resizeDebounce]);
  function removeListeners() {
    if (state.current.scrollContainers) {
      state.current.scrollContainers.forEach((element) => element.removeEventListener('scroll', scrollChange, true));
      state.current.scrollContainers = null;
    }
    if (state.current.resizeObserver) {
      state.current.resizeObserver.disconnect();
      state.current.resizeObserver = null;
    }
  }
  function addListeners() {
    if (!state.current.element) return;
    state.current.resizeObserver = new ResizeObserver2(scrollChange);
    state.current.resizeObserver.observe(state.current.element);
    if (scroll && state.current.scrollContainers) {
      state.current.scrollContainers.forEach((scrollContainer) =>
        scrollContainer.addEventListener('scroll', scrollChange, {
          capture: true,
          passive: true,
        }),
      );
    }
  }
  const ref2 = (node) => {
    if (!node || node === state.current.element) return;
    removeListeners();
    state.current.element = node;
    state.current.scrollContainers = findScrollContainers(node);
    addListeners();
  };
  useOnWindowScroll(scrollChange, Boolean(scroll));
  useOnWindowResize(resizeChange);
  (0, import_react11.useEffect)(() => {
    removeListeners();
    addListeners();
  }, [scroll, scrollChange, resizeChange]);
  (0, import_react11.useEffect)(() => removeListeners, []);
  return [ref2, bounds, forceRefresh];
}
function useOnWindowResize(onWindowResize) {
  (0, import_react11.useEffect)(() => {
    const cb = onWindowResize;
    window.addEventListener('resize', cb);
    return () => void window.removeEventListener('resize', cb);
  }, [onWindowResize]);
}
function useOnWindowScroll(onScroll2, enabled) {
  (0, import_react11.useEffect)(() => {
    if (enabled) {
      const cb = onScroll2;
      window.addEventListener('scroll', cb, {
        capture: true,
        passive: true,
      });
      return () => void window.removeEventListener('scroll', cb, true);
    }
  }, [onScroll2, enabled]);
}
function findScrollContainers(element) {
  const result = [];
  if (!element || element === document.body) return result;
  const { overflow, overflowX, overflowY } = window.getComputedStyle(element);
  if ([overflow, overflowX, overflowY].some((prop) => prop === 'auto' || prop === 'scroll')) result.push(element);
  return [...result, ...findScrollContainers(element.parentElement)];
}
var keys = ['x', 'y', 'top', 'bottom', 'left', 'right', 'width', 'height'];
var areBoundsEqual = (a2, b) => keys.every((key) => a2[key] === b[key]);

// ../../node_modules/react-merge-refs/dist/index.mjs
function o2(f2) {
  return (r3) => {
    f2.forEach((n2) => {
      typeof n2 == 'function' ? n2(r3) : n2 != null && (n2.current = r3);
    });
  };
}

// app/components/HelloHeading.tsx
var import_react12 = __toESM(require_react(), 1);
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
var HelloHeading = ({ opacity, x }) => {
  const onClick = (0, import_react12.useCallback)(() => noop2(), []);
  const { bind, interactStyles } = useInteract_default({ onClick });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    animated.div,
    {
      ...bind(),
      style: interactStyles,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
          animated.div,
          {
            className: clsx(h3, 'text-center text-[1.35rem] sm:text-[2rem] lg:text-[2.5rem] 2xl:text-[3rem]'),
            children: 'Jish.Dev Presents',
          },
          void 0,
          false,
          {
            fileName: 'app/components/HelloHeading.tsx',
            lineNumber: 16,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
          animated.div,
          {
            className: clsx(h1, 'text-center text-[4rem] sm:text-[6rem] lg:text-[7rem] 2xl:text-[9rem]'),
            style: { opacity, x },
            children: 'Sujish Patel',
          },
          void 0,
          false,
          {
            fileName: 'app/components/HelloHeading.tsx',
            lineNumber: 19,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
          animated.div,
          {
            className: clsx(h3, 'text-center text-[1.35rem] sm:text-[2rem] lg:text-[2.5rem] 2xl:text-[3rem]'),
            style: { opacity, x },
            children: 'A Full Stack Developer',
          },
          void 0,
          false,
          {
            fileName: 'app/components/HelloHeading.tsx',
            lineNumber: 25,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/HelloHeading.tsx',
      lineNumber: 15,
      columnNumber: 5,
    },
    this,
  );
};

// app/assets/pictures/fullbody.png
var fullbody_default = '/build/_assets/fullbody-IGJT6T66.png';

// app/components/HelloProfile.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
var HelloProfile = ({ opacity, x }) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    animated.img,
    {
      className: 'object-scale-down w-[120vw] sm:w-[90vw] lg:w-[50vw] 2xl:w-[40vw]',
      src: fullbody_default,
      alt: 'sujish patel',
      style: { opacity, x },
    },
    void 0,
    false,
    {
      fileName: 'app/components/HelloProfile.tsx',
      lineNumber: 10,
      columnNumber: 5,
    },
    this,
  );
};

// app/assets/icons/scrolldown.svg
var scrolldown_default = '/build/_assets/scrolldown-YVQ4IQF4.svg';

// app/hooks/useBouncing.ts
var useBouncing = (range) => {
  const style = useSpring({
    loop: { reverse: true },
    from: { y: -range },
    to: { y: range },
    config: { mass: 1, tension: 50, friction: 0 },
  });
  return [style];
};

// app/components/HelloScrollDown.tsx
var import_jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime(), 1);
var HelloScrollDown = () => {
  const [{ y: y2 }] = useBouncing(2);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
    animated.img,
    {
      className: 'relative z-10 m-auto h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]',
      src: scrolldown_default,
      style: { y: y2 },
    },
    void 0,
    false,
    {
      fileName: 'app/components/HelloScrollDown.tsx',
      lineNumber: 9,
      columnNumber: 5,
    },
    this,
  );
};

// app/components/Hello.tsx
var import_jsx_dev_runtime7 = __toESM(require_jsx_dev_runtime(), 1);
var Hello = ({ offset }) => {
  const [ref2, bounds] = useMeasure();
  const localRef = (0, import_react13.useRef)(null);
  const { setHello } = useMenuState();
  (0, import_react13.useEffect)(
    () => setHello({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 0 }),
    [bounds, setHello],
  );
  const [{ x, scale, opacity, background }] = useSpring(
    {
      to: [{ scale: 1, background: 'rgba(73, 82, 109, .75)', opacity: 1, x: offset.to([0, 1], [0, 1e3]) }],
      from: {
        scale: 1.5,
        opacity: 0,
        background: 'rgba(255, 70, 118, 1.00)',
        x: -500,
      },
      config: config.slow,
    },
    [],
  );
  const [{ y: y2 }] = useSpring({ y: offset.to([0, 0.2], [200, 0]), config: config.stiff }, []);
  const [{ rotateX }] = useSpring({ rotateX: y2.to([0, 100], [0, 180]), config: config.stiff, immediate: true }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    'div',
    {
      className: section,
      ref: o2([ref2, localRef]),
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
          animated.div,
          {
            className: box,
            style: { scale, y: y2, background, zIndex: 2, position: 'absolute', rotateX },
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
                HelloHeading,
                { opacity, x },
                void 0,
                false,
                {
                  fileName: 'app/components/Hello.tsx',
                  lineNumber: 50,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
                HelloScrollDown,
                {},
                void 0,
                false,
                {
                  fileName: 'app/components/Hello.tsx',
                  lineNumber: 51,
                  columnNumber: 9,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: 'app/components/Hello.tsx',
            lineNumber: 49,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
          HelloProfile,
          { opacity, x },
          void 0,
          false,
          {
            fileName: 'app/components/Hello.tsx',
            lineNumber: 53,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/Hello.tsx',
      lineNumber: 48,
      columnNumber: 5,
    },
    this,
  );
};
var Hello_default = Hello;

// app/components/Story.tsx
var import_react18 = __toESM(require_react(), 1);

// app/assets/logos/ellipsishealth.svg
var ellipsishealth_default = '/build/_assets/ellipsishealth-HV53G6HV.svg';

// app/assets/logos/elementus.svg
var elementus_default = '/build/_assets/elementus-P4WXH3JQ.svg';

// app/assets/logos/netsmart.svg
var netsmart_default = '/build/_assets/netsmart-6BOVE6TC.svg';

// app/assets/logos/rutgers.svg
var rutgers_default = '/build/_assets/rutgers-D2RKXIB4.svg';

// app/assets/logos/erre.svg
var erre_default = '/build/_assets/erre-JMHJLBRO.svg';

// app/data/StoryData.tsx
var StoryData = [
  {
    logo: ellipsishealth_default,
    focus: 'Principal Software Engineer',
    time: '2021 - 2023',
    color: `rgba(58, 186, 182, 1.00)`,
    speed: 1,
    includePlus: true,
  },
  {
    logo: elementus_default,
    focus: 'Full Stack Developer',
    time: '2020',
    color: 'rgba(121, 61, 251, 1.00)',
    speed: 2,
    includePlus: true,
  },
  {
    logo: netsmart_default,
    focus: 'Software Engineer',
    time: '2016 - 2018',
    color: 'rgba(44, 79, 120, 1.00)',
    speed: 3,
    includePlus: true,
  },
  {
    logo: rutgers_default,
    focus: 'B.A. Computer Science',
    time: '2016',
    color: 'rgba(225, 26, 55, 1.00)',
    speed: 4,
    includePlus: true,
  },
  {
    logo: erre_default,
    focus: 'Head of IT and Marketing',
    time: '2011-2016',
    color: 'rgba(60, 132, 86, 1.00)',
    speed: 5,
    includePlus: false,
  },
];
var StoryData_default = StoryData;

// app/components/StoryPlace.tsx
var import_react16 = __toESM(require_react(), 1);

// app/hooks/useMeasurementCapture.ts
var import_react14 = __toESM(require_react(), 1);
var useMeasurementCapture = ({ preventCapture } = { preventCapture: [() => true, []] }) => {
  const [{ originalHeight, originalWidth, isReady }, set] = (0, import_react14.useState)({
    originalHeight: null,
    originalWidth: null,
    isReady: false,
  });
  const [[cancelCapture, deps], updatePreventChange] = (0, import_react14.useState)(preventCapture);
  const [measureRef, bounds] = useMeasure({ debounce: 200 });
  const localRef = (0, import_react14.useRef)(null);
  (0, import_react14.useEffect)(() => {
    if (
      !localRef.current ||
      originalHeight !== null ||
      originalWidth !== null ||
      !bounds.height ||
      !bounds.width ||
      cancelCapture()
    ) {
      return;
    }
    set({ originalHeight: bounds.height, originalWidth: bounds.width, isReady: true });
  }, [localRef.current, bounds, originalHeight, originalWidth, ...deps]);
  return [o2([measureRef, localRef]), { originalHeight, originalWidth, isReady }, updatePreventChange];
};

// app/components/StoryPlace.tsx
var import_react17 = __toESM(require_react(), 1);

// app/hooks/useStory.tsx
var import_react15 = __toESM(require_react(), 1);
var import_jsx_dev_runtime8 = __toESM(require_jsx_dev_runtime(), 1);
var StoryContext = (0, import_react15.createContext)(null);
var StoryProvider = ({ children }) => {
  const state = (0, import_react15.useRef)(proxy({ selected: null })).current;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
    StoryContext.Provider,
    { value: state, children },
    void 0,
    false,
    {
      fileName: 'app/hooks/useStory.tsx',
      lineNumber: 8,
      columnNumber: 10,
    },
    this,
  );
};
var useStoryState = () => {
  const state = (0, import_react15.useContext)(StoryContext);
  if (!state) throw new Error('useStory must be used within a StoryProvider');
  return state;
};
var useStorySnapshot = () => {
  const state = useStoryState();
  return useSnapshot(state);
};

// app/components/StoryPlace.tsx
var import_jsx_dev_runtime9 = __toESM(require_jsx_dev_runtime(), 1);
var StoryPlace = ({ id, offset, logo, focus, time, speed }) => {
  const state = useStoryState();
  const snap = useStorySnapshot();
  const onSelect = (0, import_react17.useCallback)(
    async (id2) => {
      switch (snap.selected) {
        case id2:
          state.selected = null;
          return;
        default:
          state.selected = id2;
          return;
      }
    },
    [state, snap],
  );
  const {
    bind,
    interactStyles: { scale },
  } = useInteract_default({ onClick: () => onSelect(id) });
  const [ref2, { originalHeight, originalWidth, isReady }] = useMeasurementCapture({
    preventCapture: [() => scale.get() !== 1, [scale]],
  });
  const [{ x }] = useSpring(() => ({
    x: offset.to([1, 0], [0, 1e3]),
    config: { mass: 50 / 15, tension: 100 - 15 * speed, friction: 26 },
  }));
  const { skewX } = useSpring({
    skewX: x.to([0, 100], [0, 1]),
    config: config.molasses,
    immediate: true,
  });
  const original = (0, import_react16.useMemo)(
    () =>
      isReady
        ? {
            height: originalHeight,
            width: originalWidth,
            zIndex: 1,
            config: config.slow,
            x,
            y: 0,
            display: 'block',
            scale,
            skewX,
            opacity: 1,
          }
        : {},
    [isReady, originalHeight, originalWidth, x, scale, skewX],
  );
  const expanded = (0, import_react16.useMemo)(() => {
    if (!isReady) return {};
    return {
      height: window.innerHeight * 0.75,
      width: window.innerWidth * 0.75,
      opacity: 1,
      zIndex: 999,
      config: config.slow,
      scale,
      display: 'block',
      skewX,
    };
  }, [originalWidth, originalHeight, isReady, skewX, scale]);
  const removed = (0, import_react16.useMemo)(
    () => ({
      opacity: 0,
      scale: 0,
      y: 0,
    }),
    [],
  );
  const [card, api] = useSpring(() => original, [original]);
  (0, import_react16.useEffect)(() => {
    if (!isReady) return;
    switch (snap.selected) {
      case null:
        api.start(original);
        return;
      case id:
        api.start(expanded);
        return;
      default:
        api.start(removed);
        card.display.set('none');
        return;
    }
  }, [originalHeight, originalWidth, snap, id, x, api, scale, card]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
    animated.div,
    {
      ref: ref2,
      className: clsx(box, 'm-3'),
      ...bind(),
      style: { ...card },
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          'img',
          { className: 'object-contain h-[50px] m-auto', src: logo, alt: 'company' },
          void 0,
          false,
          {
            fileName: 'app/components/StoryPlace.tsx',
            lineNumber: 115,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          'div',
          { className: h2, children: focus },
          void 0,
          false,
          {
            fileName: 'app/components/StoryPlace.tsx',
            lineNumber: 116,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          'div',
          { className: h2, children: time },
          void 0,
          false,
          {
            fileName: 'app/components/StoryPlace.tsx',
            lineNumber: 117,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/StoryPlace.tsx',
      lineNumber: 114,
      columnNumber: 5,
    },
    this,
  );
};

// app/components/StoryYears.tsx
var import_jsx_dev_runtime10 = __toESM(require_jsx_dev_runtime(), 1);
var StoryYears = ({ offset }) => {
  const [{ x }] = useSpring(
    {
      x: offset.to([1, 0], [0, 1e3]),
      config: { mass: 50 / 15, tension: 100 - 15 * 5, friction: 26 },
    },
    [],
  );
  const { bind, interactStyles } = useInteract_default({ onClick: noop2 });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
    animated.div,
    {
      className: clsx(box, 'w-[350px]'),
      ...bind(),
      style: { ...interactStyles, x },
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
          'div',
          { className: h2, children: 'Years Coding' },
          void 0,
          false,
          {
            fileName: 'app/components/StoryYears.tsx',
            lineNumber: 18,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
          'div',
          { className: clsx(h1, 'text-[8em]'), children: '10+' },
          void 0,
          false,
          {
            fileName: 'app/components/StoryYears.tsx',
            lineNumber: 19,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/StoryYears.tsx',
      lineNumber: 17,
      columnNumber: 5,
    },
    this,
  );
};

// app/components/StoryHeading.tsx
var import_jsx_dev_runtime11 = __toESM(require_jsx_dev_runtime(), 1);
var StoryHeading = ({ offset }) => {
  const snapshot2 = useStorySnapshot();
  const [{ scale, y: y2 }] = useSpring(
    snapshot2.selected === null
      ? {
          scale: offset.to([0, 1], [2, 1]),
          y: offset.to([0, 1], [0, 200]),
          from: { scale: 10, y: 0 },
        }
      : {
          scale: 0,
          y: 500,
          config: config.slow,
        },
    [snapshot2, offset],
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
    animated.div,
    {
      className: clsx(h3, 'z-[1] absolute text-[2rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]'),
      style: { scale, y: y2 },
      children: [
        'with',
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          'div',
          { className: h3Inline, children: 'Years' },
          void 0,
          false,
          {
            fileName: 'app/components/StoryHeading.tsx',
            lineNumber: 30,
            columnNumber: 7,
          },
          this,
        ),
        ' of Experience',
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/StoryHeading.tsx',
      lineNumber: 25,
      columnNumber: 5,
    },
    this,
  );
};

// app/components/StoryBackground.tsx
var import_jsx_dev_runtime12 = __toESM(require_jsx_dev_runtime(), 1);
var StoryBackground = ({ offset }) => {
  const [{ r: r3 }] = useSpring(
    {
      r: offset.to({ range: [0, 1], output: [0, 100] }),
      from: { r: 0 },
      config: { mass: 50 / 15, tension: 50, friction: 26 },
    },
    [],
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
    'svg',
    {
      width: '100%',
      height: '100%',
      viewBox: '0 0 100 100',
      className: 'z-[-1] absolute',
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          animated.circle,
          { cx: '-50%', cy: '50%', r: r3, fill: 'rgba(8, 9, 69, 1.00)', className: 'mix-blend-screen' },
          void 0,
          false,
          {
            fileName: 'app/components/StoryBackground.tsx',
            lineNumber: 15,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          animated.circle,
          { className: 'mix-blend-screen', cx: '100%', cy: '50%', r: r3, fill: 'rgba(4, 40, 110, 1.00)' },
          void 0,
          false,
          {
            fileName: 'app/components/StoryBackground.tsx',
            lineNumber: 16,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/StoryBackground.tsx',
      lineNumber: 14,
      columnNumber: 5,
    },
    this,
  );
};

// app/components/Story.tsx
var import_jsx_dev_runtime13 = __toESM(require_jsx_dev_runtime(), 1);
var Story = ({ data = StoryData_default, offset }) => {
  const [ref2, bounds] = useMeasure({ debounce: 200 });
  const localRef = (0, import_react18.useRef)(null);
  const { setStory } = useMenuState();
  (0, import_react18.useEffect)(
    () => setStory({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 100 }),
    [bounds, setStory],
  );
  const Places = (0, import_react18.useMemo)(
    () =>
      data.map((props, i2) =>
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          StoryPlace,
          { offset, id: i2, ...props },
          i2,
          false,
          {
            fileName: 'app/components/Story.tsx',
            lineNumber: 19,
            columnNumber: 34,
          },
          this,
        ),
      ),
    [offset],
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
    'div',
    {
      className: section,
      ref: o2([ref2, localRef]),
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          'div',
          {
            className: row,
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
                StoryBackground,
                { offset },
                void 0,
                false,
                {
                  fileName: 'app/components/Story.tsx',
                  lineNumber: 25,
                  columnNumber: 9,
                },
                this,
              ),
              Places,
              /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
                StoryYears,
                { offset },
                void 0,
                false,
                {
                  fileName: 'app/components/Story.tsx',
                  lineNumber: 27,
                  columnNumber: 9,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: 'app/components/Story.tsx',
            lineNumber: 24,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          StoryHeading,
          { offset },
          void 0,
          false,
          {
            fileName: 'app/components/Story.tsx',
            lineNumber: 29,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/Story.tsx',
      lineNumber: 23,
      columnNumber: 5,
    },
    this,
  );
};
var Story_default = Story;

// app/components/Brain.tsx
var import_react21 = __toESM(require_react(), 1);

// ../../node_modules/react-icons/lib/esm/iconBase.js
var import_react20 = __toESM(require_react());

// ../../node_modules/react-icons/lib/esm/iconContext.js
var import_react19 = __toESM(require_react());
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0,
};
var IconContext = import_react19.default.createContext && import_react19.default.createContext(DefaultContext);

// ../../node_modules/react-icons/lib/esm/iconBase.js
var __assign = function () {
  __assign =
    Object.assign ||
    function (t2) {
      for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
        s2 = arguments[i2];
        for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2)) t2[p2] = s2[p2];
      }
      return t2;
    };
  return __assign.apply(this, arguments);
};
var __rest = function (s2, e2) {
  var t2 = {};
  for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === 'function')
    for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
    }
  return t2;
};
function Tree2Element(tree) {
  return (
    tree &&
    tree.map(function (node, i2) {
      return import_react20.default.createElement(
        node.tag,
        __assign(
          {
            key: i2,
          },
          node.attr,
        ),
        Tree2Element(node.child),
      );
    })
  );
}
function GenIcon(data) {
  return function (props) {
    return import_react20.default.createElement(
      IconBase,
      __assign(
        {
          attr: __assign({}, data.attr),
        },
        props,
      ),
      Tree2Element(data.child),
    );
  };
}
function IconBase(props) {
  var elem = function (conf) {
    var attr = props.attr,
      size = props.size,
      title = props.title,
      svgProps = __rest(props, ['attr', 'size', 'title']);
    var computedSize = size || conf.size || '1em';
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + ' ' : '') + props.className;
    return import_react20.default.createElement(
      'svg',
      __assign(
        {
          stroke: 'currentColor',
          fill: 'currentColor',
          strokeWidth: '0',
        },
        conf.attr,
        attr,
        svgProps,
        {
          className,
          style: __assign(
            __assign(
              {
                color: props.color || conf.color,
              },
              conf.style,
            ),
            props.style,
          ),
          height: computedSize,
          width: computedSize,
          xmlns: 'http://www.w3.org/2000/svg',
        },
      ),
      title && import_react20.default.createElement('title', null, title),
      props.children,
    );
  };
  return IconContext !== void 0
    ? import_react20.default.createElement(IconContext.Consumer, null, function (conf) {
        return elem(conf);
      })
    : elem(DefaultContext);
}

// ../../node_modules/react-icons/fa/index.esm.js
function FaNodeJs(props) {
  return GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 448 512' },
    child: [
      {
        tag: 'path',
        attr: {
          d: 'M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6.4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2.7 376.3.7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 26.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2zm149.1-210.1c0-39.9-27-50.5-83.7-58-57.4-7.6-63.2-11.5-63.2-24.9 0-11.1 4.9-25.9 47.4-25.9 37.9 0 51.9 8.2 57.7 33.8.5 2.4 2.7 4.2 5.2 4.2h24c1.5 0 2.9-.6 3.9-1.7s1.5-2.6 1.4-4.1c-3.7-44.1-33-64.6-92.2-64.6-52.7 0-84.1 22.2-84.1 59.5 0 40.4 31.3 51.6 81.8 56.6 60.5 5.9 65.2 14.8 65.2 26.7 0 20.6-16.6 29.4-55.5 29.4-48.9 0-59.6-12.3-63.2-36.6-.4-2.6-2.6-4.5-5.3-4.5h-23.9c-3 0-5.3 2.4-5.3 5.3 0 31.1 16.9 68.2 97.8 68.2 58.4-.1 92-23.2 92-63.4z',
        },
      },
    ],
  })(props);
}
function FaReact(props) {
  return GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 512 512' },
    child: [
      {
        tag: 'path',
        attr: {
          d: 'M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z',
        },
      },
    ],
  })(props);
}

// ../../node_modules/react-icons/si/index.esm.js
function SiAmazon(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z',
        },
      },
    ],
  })(props);
}
function SiDeno(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M11.055.008c-.056.006-.236.027-.398.041C8.349.291 6.076 1.27 4.223 2.82a15.658 15.654 0 00-1.405 1.405C1.283 6.058.386 8.115.056 10.549c-.074.54-.074 2.364 0 2.904.33 2.435 1.228 4.492 2.762 6.325a15.658 15.654 0 001.405 1.405c1.833 1.535 3.89 2.432 6.325 2.762.54.073 2.364.073 2.904 0 2.435-.331 4.492-1.228 6.325-2.762a15.658 15.654 0 001.405-1.405c1.535-1.833 2.432-3.89 2.762-6.325.074-.54.074-2.364 0-2.904-.33-2.433-1.228-4.49-2.762-6.323a15.658 15.654 0 00-1.405-1.405C17.95 1.291 15.872.382 13.47.061c-.26-.036-.637-.05-1.337-.057a25.795 25.788 0 00-1.077.003zm.147 1.275c0 .345.024 1.095.056 1.806.018.348.038.847.047 1.107.032.92.13 3.338.145 3.553l.015.215-.133-.015a.504.504 0 01-.153-.032 3.247 3.247 0 01-.041-.455 702.86 702.682 0 01-.245-5.723l-.018-.655.083-.012c.044-.006.118-.015.165-.018l.08-.003v.23zm2.825-.07c.003.002.012.893.021 1.98.012 1.088.027 2.065.035 2.17.01.11.006.205-.009.21a.433.433 0 01-.159 0l-.136-.011-.02-.86-.033-1.17c-.024-.523-.044-2.297-.027-2.34.012-.033.044-.036.168-.016.086.018.156.032.16.035zM7.2 2.2c.018.027.156 1.653.328 3.78.056.724.112 1.385.12 1.468.016.15.013.156-.082.215a.519.519 0 01-.118.059c-.01 0-.027-.077-.035-.171-.041-.384-.201-2.237-.313-3.577a173.64 173.628 0 00-.133-1.57c-.015-.13-.012-.142.065-.183.094-.05.148-.059.168-.02zm8.125.593c.083.03.091.044.11.213.03.295.02 1.706-.013 1.706-.086 0-.263-.1-.277-.156a14.379 14.375 0 01-.018-.93c0-.959-.012-.903.198-.832zm-5.451.14c0 .08.02.518.044.982L9.98 5.22c.02.514.027.496-.171.508-.097.003-.097.003-.103-.145-.006-.083-.021-.34-.038-.576-.015-.236-.05-.747-.074-1.136a32.49 32.486 0 00-.062-.859c-.018-.148-.015-.153.065-.183a.617.617 0 01.183-.032c.094-.003.094-.003.094.136zm8.187.403l.1.041.021.395c.01.215.015.682.01 1.033l-.01.643-.124-.062-.124-.06-.009-.98a21.73 21.728 0 01.003-1.017c.012-.044.012-.044.133.006zm-5.389.387c.018.018.059 1.45.062 2.175l.003.437-.139-.021a1.3 1.3 0 01-.148-.021c-.009-.006-.097-2.193-.097-2.405V3.67l.151.018a.743.743 0 01.168.035zm6.797.21c.035.04.041.687.05 4.252.01 4.092.01 4.2-.044 4.2a.197.197 0 01-.103-.04c-.044-.032-.05-.39-.065-3.885a475.465 475.342 0 00-.035-4.277l-.018-.425.086.062c.05.035.106.086.13.112zm-2.647.605c.015.012.03.18.032.372.015.652.018 4.65.003 4.663-.006.006-.059-.01-.118-.032l-.106-.044v-5.02l.083.018c.044.012.092.03.106.044zm-8.146.165c.009.08.024.26.032.407l.047.732c.035.519.03.552-.14.552-.088 0-.1-.01-.111-.097-.03-.174-.133-1.626-.118-1.65a.654.654 0 01.239-.08c.018-.003.04.06.05.136zm-4.882.752l.145 1.455c.05.487.092.9.092.918 0 .035-.227.148-.251.124a96.061 96.036 0 01-.31-2.745c0-.07.227-.37.257-.336a6.6 6.6 0 01.068.584zm11.572.31l.086.05.003.638c.003.348.01.738.01.865.005.266-.028.31-.187.254l-.09-.032v-.254c0-.142-.01-.552-.022-.915l-.018-.655h.068a.41.41 0 01.151.05zM5.09 6.91l.195 2.125.1 1.09-.115.115-.112.115-.021-.233c-.012-.13-.071-.73-.133-1.34-.062-.606-.151-1.49-.195-1.96l-.083-.85.115-.104c.103-.097.115-.1.136-.047.012.03.062.519.112 1.089zm-2.211.358c.065.58.236 2.128.384 3.433.148 1.307.286 2.568.313 2.804.024.236.065.593.089.797.04.345.04.37-.006.404-.071.053-.1.047-.1-.015 0-.027-.027-.25-.06-.493l-.338-2.627c-.041-.31-.121-.927-.177-1.372a466.6 466.482 0 01-.37-2.87c-.052-.401-.085-.76-.076-.797.02-.08.195-.357.213-.34.006.01.065.49.13 1.075zM1.976 8.54l.183 1.44c.056.435.127.981.159 1.21l.056.411-.062.053c-.035.03-.071.04-.083.03a1.17 1.17 0 01-.053-.26c-.018-.13-.127-.888-.245-1.68l-.21-1.446.068-.201a.724.724 0 01.083-.198c.012 0 .056.289.103.64zm16.203-.387c.041.04.047.224.047 1.579v1.53h-.083c-.18 0-.177.044-.189-1.63l-.009-1.526h.094c.05 0 .115.02.14.047zm-6.46.528c.667.1 1.248.286 1.824.58.372.193.55.326.962.72.614.586.992 1.1 1.346 1.826.516 1.057.717 1.992.971 4.5.115 1.125.266 3.165.298 4 .01.242.03.64.047.885.032.519.071.449-.387.67-.635.307-1.245.519-2.05.717-.987.242-1.624.319-2.598.322l-.708.003.006-.34c0-.185.018-.62.035-.958.089-1.644.071-3.72-.044-4.87-.065-.66-.192-1.464-.263-1.64-.015-.04.053-.072.345-.172.534-.186.998-.42 1.068-.534.127-.218-.1-.53-.39-.53-.05 0-.201.052-.339.114-.661.304-1.986.66-2.751.74a7.794 7.792 0 01-1.918-.08c-.31-.055-.865-.265-1.328-.504-.534-.277-.862-.646-.96-1.083-.052-.236-.037-.708.03-.974a3.15 3.15 0 01.47-.965c.84-1.105 2.577-2.064 4.356-2.4a6.632 6.632 0 011.977-.027zm9.105.092c.106.044.118.056.118.156.006.806-.012 2.645-.027 2.722-.003.027-.156.03-.22.006-.042-.015-.048-.174-.048-1.476 0-.931.012-1.456.03-1.456.015 0 .083.02.148.047zm1.29 1.62l.105.042-.02 2.444c-.025 3.114-.028 3.205-.14 3.474-.183.44-.174.528-.156-1.402.006-.965.021-1.942.027-2.17.006-.226.012-.867.015-1.425 0-.673.01-1.01.03-1.01.018 0 .08.022.14.045zm-17.75.733c.018.24.012.263-.074.452l-.094.2-.035-.294c-.056-.472-.056-.493.056-.564.05-.035.103-.06.112-.053.009.006.027.124.035.26zm-1.824 1.78c.027.242.233 1.848.339 2.636.159 1.219.17 1.393.1 1.319a14.7 14.696 0 01-.148-.912c-.46-3.182-.457-3.16-.42-3.185.08-.053.107-.024.128.142zm2.125 1.35c.018.075.103.875.103.972 0 .083-.106.16-.153.112-.015-.015-.053-.266-.083-.555l-.074-.676-.018-.148.103.118a.656.656 0 01.12.177zm2.382 1.114c.032.03.053.148.08.466.044.576.05.53-.071.53-.124 0-.121.01-.162-.51-.041-.528-.041-.522.038-.522.038 0 .089.018.115.035zm2.337.044c.006.03.02.207.032.393.009.186.035.605.059.93.083 1.192.086 1.343.035 1.343-.056 0-.062-.044-.127-.885a70.726 70.708 0 00-.097-1.22c-.027-.32-.044-.59-.035-.595.032-.035.118-.01.133.035zm-5.548.567c.018.027.13.97.269 2.26.04.39.083.765.09.836l.016.127-.074-.047a.153.153 0 01-.077-.145c0-.186-.127-1.411-.224-2.16-.056-.425-.1-.8-.1-.835 0-.062.07-.086.1-.035zm17.032 1.234l-.02 1.234-.075.109c-.168.248-.159.295-.15-1.086l.005-1.266.11-.112a.574.574 0 01.13-.11c.008 0 .008.556 0 1.232zm-2.73 1.956c.015 1.715.012 1.848-.035 1.9-.03.033-.056.054-.065.045-.02-.024-.05-3.763-.027-3.784.012-.012.041-.018.068-.015.038.009.047.218.06 1.853zm-9.64-1.174c.022.183.095 1.06.125 1.473.018.277.018.286-.047.307-.035.012-.077.009-.09-.006-.02-.021-.085-.676-.164-1.685l-.021-.242h.09c.087 0 .092.006.107.153zm-2.32 1.033c.022.02.036.094.036.168 0 .077.035.475.074.888.112 1.13.12 1.284.07 1.254-.076-.044-.144-.112-.13-.13a2.02 2.02 0 00-.03-.328 14.43 14.429 0 01-.058-.62 19.044 19.04 0 00-.062-.694c-.056-.516-.053-.576.012-.576.03 0 .068.015.089.035zm1.397 1.986c.009.065.027.307.038.537.02.443.012.475-.11.384-.034-.027-.058-.14-.093-.475-.062-.608-.065-.584.05-.573.086.009.097.02.115.127zM6.52 10.094c-.307.133-.331.55-.041.697.21.106.422.056.53-.127a.392.392 0 00-.49-.57zm2 .283a.453.453 0 000 .767c.28.168.644-.053.644-.39 0-.325-.372-.543-.643-.378z',
        },
      },
    ],
  })(props);
}
function SiDocker(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z',
        },
      },
    ],
  })(props);
}
function SiFirebase(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z',
        },
      },
    ],
  })(props);
}
function SiFlutter(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z',
        },
      },
    ],
  })(props);
}
function SiGithub(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
        },
      },
    ],
  })(props);
}
function SiGooglecloud(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z',
        },
      },
    ],
  })(props);
}
function SiJava(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639',
        },
      },
    ],
  })(props);
}
function SiJavascript(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z',
        },
      },
    ],
  })(props);
}
function SiMongodb(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z',
        },
      },
    ],
  })(props);
}
function SiPython(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z',
        },
      },
    ],
  })(props);
}
function SiRedux(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.047-.914-.796-1.648-1.709-1.648h-.061a1.71 1.71 0 00-1.648 1.769c.03.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.005 4.795-1.603.838-3.296 1.154-4.944.93-1.378-.195-2.456-.81-3.116-1.799-.988-1.499-1.078-3.116-.255-4.734.6-1.17 1.499-2.023 2.099-2.443a9.96 9.96 0 01-.42-1.543C-.868 14.408-.416 18.752.932 20.805c1.004 1.498 3.057 2.456 5.304 2.456.6 0 1.23-.044 1.843-.194 3.897-.749 6.848-3.086 8.541-6.532zm5.348-3.746c-2.32-2.728-5.738-4.226-9.634-4.226h-.51c-.253-.554-.837-.899-1.498-.899h-.045c-.943 0-1.678.81-1.647 1.753.03.898.794 1.648 1.708 1.648h.074a1.69 1.69 0 001.499-1.049h.555c2.309 0 4.495.674 6.488 1.992 1.527 1.005 2.622 2.323 3.237 3.897.538 1.288.509 2.547-.045 3.597-.855 1.647-2.294 2.517-4.196 2.517-1.199 0-2.367-.375-2.967-.644-.36.298-.96.793-1.394 1.093 1.318.598 2.652.943 3.94.943 2.922 0 5.094-1.647 5.919-3.236.898-1.798.824-4.824-1.47-7.416zM6.49 17.042c.03.899.793 1.648 1.708 1.648h.06a1.688 1.688 0 001.648-1.768c0-.9-.779-1.647-1.693-1.647h-.06c-.06 0-.15 0-.226.029-1.243-2.098-1.768-4.347-1.572-6.772.12-1.828.72-3.417 1.797-4.735.9-1.124 2.593-1.68 3.747-1.708 3.236-.061 4.585 3.971 4.689 5.574l1.498.45C17.741 3.197 14.686.62 11.764.62 9.02.62 6.49 2.613 5.47 5.535 4.077 9.43 4.991 13.177 6.7 16.174c-.15.195-.24.539-.21.868z',
        },
      },
    ],
  })(props);
}
function SiTerraform(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M1.44 0v7.575l6.561 3.79V3.787zm21.12 4.227l-6.561 3.791v7.574l6.56-3.787zM8.72 4.23v7.575l6.561 3.787V8.018zm0 8.405v7.575L15.28 24v-7.578z',
        },
      },
    ],
  })(props);
}
function SiTypescript(props) {
  return GenIcon({
    tag: 'svg',
    attr: { role: 'img', viewBox: '0 0 24 24' },
    child: [
      { tag: 'title', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z',
        },
      },
    ],
  })(props);
}

// ../../node_modules/react-icons/ai/index.esm.js
function AiFillFacebook(props) {
  return GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 1024 1024' },
    child: [
      {
        tag: 'path',
        attr: {
          d: 'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z',
        },
      },
    ],
  })(props);
}
function AiFillGithub(props) {
  return GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 1024 1024' },
    child: [
      {
        tag: 'path',
        attr: {
          d: 'M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z',
        },
      },
    ],
  })(props);
}
function AiFillInstagram(props) {
  return GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 1024 1024' },
    child: [
      {
        tag: 'path',
        attr: {
          d: 'M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z',
        },
      },
    ],
  })(props);
}
function AiFillLinkedin(props) {
  return GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 1024 1024' },
    child: [
      {
        tag: 'path',
        attr: {
          d: 'M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z',
        },
      },
    ],
  })(props);
}
function AiOutlineFunction(props) {
  return GenIcon({
    tag: 'svg',
    attr: { t: '1569683610100', viewBox: '0 0 1024 1024', version: '1.1' },
    child: [
      { tag: 'defs', attr: {}, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M841 370c3-3.3 2.7-8.3-0.6-11.3-1.5-1.3-3.4-2.1-5.3-2.1h-72.6c-2.4 0-4.6 1-6.1 2.8L633.5 504.6c-2.9 3.4-7.9 3.8-11.3 0.9-0.9-0.8-1.6-1.7-2.1-2.8l-63.5-141.3c-1.3-2.9-4.1-4.7-7.3-4.7H380.7l0.9-4.7 8-42.3c10.5-55.4 38-81.4 85.8-81.4 18.6 0 35.5 1.7 48.8 4.7l14.1-66.8c-22.6-4.7-35.2-6.1-54.9-6.1-103.3 0-156.4 44.3-175.9 147.3l-9.4 49.4h-97.6c-3.8 0-7.1 2.7-7.8 6.4L181.9 415c-0.9 4.3 1.9 8.6 6.2 9.5 0.5 0.1 1.1 0.2 1.6 0.2H284l-89 429.9c-0.9 4.3 1.9 8.6 6.2 9.5 0.5 0.1 1.1 0.2 1.6 0.2H269c3.8 0 7.1-2.7 7.8-6.4l89.7-433.1h135.8l68.2 139.1c1.4 2.9 1 6.4-1.2 8.8l-180.6 203c-2.9 3.3-2.6 8.4 0.7 11.3 1.5 1.3 3.4 2 5.3 2h72.7c2.4 0 4.6-1 6.1-2.8l123.7-146.7c2.8-3.4 7.9-3.8 11.3-1 0.9 0.8 1.6 1.7 2.1 2.8L676.4 784c1.3 2.8 4.1 4.7 7.3 4.7h64.6c4.4 0 8-3.6 8-8 0-1.2-0.3-2.4-0.8-3.5l-95.2-198.9c-1.4-2.9-0.9-6.4 1.3-8.8L841 370z',
        },
      },
    ],
  })(props);
}

// ../../node_modules/react-icons/md/index.esm.js
function MdHttp(props) {
  return GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 24 24' },
    child: [
      {
        tag: 'path',
        attr: {
          d: 'M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z',
        },
      },
      { tag: 'path', attr: { fill: 'none', d: 'M24 24H0V0h24v24z' } },
    ],
  })(props);
}
function MdEmail(props) {
  return GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 24 24' },
    child: [
      { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
      {
        tag: 'path',
        attr: {
          d: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
        },
      },
    ],
  })(props);
}

// ../../node_modules/react-icons/gr/index.esm.js
function GrNodes(props) {
  return GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 24 24' },
    child: [
      {
        tag: 'path',
        attr: {
          fill: 'none',
          stroke: '#000',
          strokeWidth: '2',
          d: 'M14,4 C14,5.1048 13.1048,6 12,6 C10.8952,6 10,5.1048 10,4 C10,2.8952 10.8952,2 12,2 C13.1048,2 14,2.8952 14,4 Z M14,20 C14,21.1048 13.1048,22 12,22 C10.8952,22 10,21.1048 10,20 C10,18.8952 10.8952,18 12,18 C13.1048,18 14,18.8952 14,20 Z M7,8 C7,9.1048 6.1048,10 5,10 C3.8952,10 3,9.1048 3,8 C3,6.8952 3.8952,6 5,6 C6.1048,6 7,6.8952 7,8 Z M7,16 C7,17.1048 6.1048,18 5,18 C3.8952,18 3,17.1048 3,16 C3,14.8952 3.8952,14 5,14 C6.1048,14 7,14.8952 7,16 Z M21,8 C21,9.1048 20.1048,10 19,10 C17.8952,10 17,9.1048 17,8 C17,6.8952 17.8952,6 19,6 C20.1048,6 21,6.8952 21,8 Z M21,16 C21,17.1048 20.1048,18 19,18 C17.8952,18 17,17.1048 17,16 C17,14.8952 17.8952,14 19,14 C20.1048,14 21,14.8952 21,16 Z',
        },
      },
    ],
  })(props);
}

// app/data/BrainData.tsx
var BrainData = [
  { idx: 1, size: 75 /* lg */, type: 'Library' /* library */, desc: 'React', Icon: FaReact },
  { idx: 2, size: 75 /* lg */, type: 'Runtime' /* runtime */, desc: 'Node', Icon: FaNodeJs },
  { idx: 3, size: 75 /* lg */, type: 'Language' /* language */, desc: 'Javascript', Icon: SiJavascript },
  { idx: 4, size: 75 /* lg */, type: 'Language' /* language */, desc: 'Typescript', Icon: SiTypescript },
  {
    idx: 5,
    size: 50 /* md */,
    type: 'Paradigm' /* paradigm */,
    desc: 'Function(al)(Programming)',
    Icon: AiOutlineFunction,
  },
  { idx: 6, size: 25 /* sm */, type: 'Frontend' /* frontend */, desc: 'Redux', Icon: SiRedux },
  { idx: 7, size: 25 /* sm */, type: 'Language' /* language */, desc: 'Java', Icon: SiJava },
  { idx: 8, size: 50 /* md */, type: 'Language' /* language */, desc: 'Python', Icon: SiPython },
  { idx: 9, size: 25 /* sm */, type: 'cloud' /* cloud */, desc: 'AWS', Icon: SiAmazon },
  { idx: 10, size: 75 /* lg */, type: 'cloud' /* cloud */, desc: 'Google Cloud', Icon: SiGooglecloud },
  { idx: 11, size: 25 /* sm */, desc: 'Deno', type: 'Runtime' /* runtime */, Icon: SiDeno },
  { idx: 12, size: 25 /* sm */, desc: 'Flutter', type: 'framework' /* framework */, Icon: SiFlutter },
  { idx: 13, size: 25 /* sm */, type: 'common' /* common */, desc: 'Github', Icon: SiGithub },
  { idx: 14, size: 25 /* sm */, type: 'DevOps' /* devops */, desc: 'Terraform', Icon: SiTerraform },
  { idx: 15, size: 25 /* sm */, type: 'protocol' /* protocol */, desc: 'HTTP/3', Icon: MdHttp },
  { idx: 16, size: 50 /* md */, type: 'database' /* database */, desc: 'Firebase', Icon: SiFirebase },
  { idx: 17, size: 50 /* md */, type: 'database' /* database */, desc: 'MongoDB + Atlas', Icon: SiMongodb },
  { idx: 18, size: 75 /* lg */, type: 'DevOps' /* devops */, desc: 'Docker', Icon: SiDocker },
  { idx: 19, size: 50 /* md */, type: 'concept' /* concept */, desc: 'Graph Theory', Icon: GrNodes },
  { idx: 20, size: 75 /* lg */, type: 'Library' /* library */, desc: 'React Hooks' },
  { idx: 21, size: 75 /* lg */, type: 'Library' /* library */, desc: 'Webpack' },
  { idx: 22, size: 75 /* lg */, type: 'Library' /* library */, desc: 'Rollup' },
  { idx: 23, size: 75 /* lg */, type: 'Frontend' /* frontend */, desc: 'Snowpack' },
  { idx: 24, size: 75 /* lg */, type: 'Frontend' /* frontend */, desc: 'Vite.js' },
  { idx: 25, size: 75 /* lg */, type: 'Frontend' /* frontend */, desc: 'Parcel' },
  { idx: 27, size: 50 /* md */, type: 'concept' /* concept */, desc: 'CI/CD' },
  { idx: 28, size: 75 /* lg */, type: 'Language' /* language */, desc: 'C' },
  { idx: 30, size: 25 /* sm */, type: 'Language' /* language */, desc: 'LaTeX' },
  { idx: 31, size: 25 /* sm */, type: 'Language' /* language */, desc: 'Prolog' },
  { idx: 32, size: 25 /* sm */, type: 'Language' /* language */, desc: 'MUMPS' },
  { idx: 33, size: 25 /* sm */, type: 'Language' /* language */, desc: 'LISP' },
  { idx: 34, size: 25 /* sm */, type: 'Language' /* language */, desc: 'Scheme' },
  { idx: 35, size: 25 /* sm */, type: 'Language' /* language */, desc: 'Objectscript' },
  { idx: 36, size: 50 /* md */, type: 'Library' /* library */, desc: 'Express' },
  { idx: 37, size: 25 /* sm */, type: 'Library' /* library */, desc: 'Angular 1' },
  { idx: 40, size: 50 /* md */, type: 'Frontend' /* frontend */, desc: 'Android' },
  { idx: 43, size: 50 /* md */, type: 'concept' /* concept */, desc: 'OO extends P' },
  { idx: 44, size: 50 /* md */, type: 'concept' /* concept */, desc: 'Data Modeling' },
  { idx: 46, size: 25 /* sm */, type: 'concept' /* concept */, desc: 'Agile' },
  { idx: 47, size: 25 /* sm */, type: 'concept' /* concept */, desc: 'TDD' },
  { idx: 48, size: 25 /* sm */, type: 'concept' /* concept */, desc: 'Mentor' },
  { idx: 51, size: 75 /* lg */, type: 'concept' /* concept */, desc: 'NoSQL Databases' },
  { idx: 52, size: 25 /* sm */, type: 'concept' /* concept */, desc: 'SQL' },
  { idx: 53, size: 25 /* sm */, type: 'DevOps' /* devops */, desc: 'Postgres' },
  { idx: 54, size: 25 /* sm */, type: 'DevOps' /* devops */, desc: 'MySQL' },
  { idx: 55, size: 25 /* sm */, type: 'concept' /* concept */, desc: 'Publish and Subscribe' },
  { idx: 56, size: 25 /* sm */, type: 'concept' /* concept */, desc: 'Unit Tests' },
  { idx: 57, size: 25 /* sm */, type: 'DevOps' /* devops */, desc: 'A/B Testing' },
  { idx: 58, size: 25 /* sm */, type: 'concept' /* concept */, desc: 'Internet of Things (IOT)' },
  { idx: 59, size: 75 /* lg */, type: 'concept' /* concept */, desc: 'Microservices' },
  { idx: 60, size: 25 /* sm */, type: 'DevOps' /* devops */, desc: 'Git' },
  { idx: 61, size: 25 /* sm */, type: 'DevOps' /* devops */, desc: 'SVN' },
  { idx: 62, size: 25 /* sm */, type: 'concept' /* concept */, desc: 'Machine Learning' },
  { idx: 63, size: 50 /* md */, type: 'concept' /* concept */, desc: 'Web Crawling' },
  { idx: 64, size: 25 /* sm */, type: 'Team' /* team */, desc: 'Project Management' },
  { idx: 65, size: 25 /* sm */, type: 'Hardware' /* hardware */, desc: 'Raspberry Pi ' },
];

// app/components/BrainSkill.tsx
var import_randomcolor = __toESM(require_randomColor(), 1);
var import_jsx_dev_runtime14 = __toESM(require_jsx_dev_runtime(), 1);
var BrainSkill = ({ Icon = null, idx, size, type, desc, offset }) => {
  const [{ y: y2, color }] = useSpring(
    {
      y: offset.to([0, 2, 2.75], [5e3, 0, -1e3]),
      from: { y: 5e3, color: (0, import_randomcolor.default)({ seed: type, luminosity: 'bright', alpha: 0.5 }) },
      config: {
        mass: (100 - size + (isEven(idx) ? -idx : idx)) / 25,
        tension: 50,
        friction: 25,
      },
    },
    [],
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
    animated.div,
    {
      className: clsx(Icon ? grid : flex),
      style: { y: y2, color },
      children: [
        Icon &&
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
            Icon,
            { className: 'm-auto', title: desc, style: { height: `${size}px`, width: `${size}px` } },
            void 0,
            false,
            {
              fileName: 'app/components/BrainSkill.tsx',
              lineNumber: 33,
              columnNumber: 16,
            },
            this,
          ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
          'div',
          {
            className: 'font-medium not-italic uppercase font-futura m-auto',
            style: { fontSize: `${(50 * size) / 100}px` },
            children: desc,
          },
          void 0,
          false,
          {
            fileName: 'app/components/BrainSkill.tsx',
            lineNumber: 34,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/BrainSkill.tsx',
      lineNumber: 32,
      columnNumber: 5,
    },
    this,
  );
};

// app/components/BrainHeading.tsx
var import_jsx_dev_runtime15 = __toESM(require_jsx_dev_runtime(), 1);
var BrainHeading = ({ offset }) => {
  const { scale } = useSpring({ scale: offset.to([1, 2], [2, 1]), from: { scale: 1 } });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
    animated.div,
    {
      className: clsx(h3, 'text-[2rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]'),
      style: { scale },
      children: [
        'an ',
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          animated.div,
          { className: h3Inline, children: 'EXPANSIVE ' },
          void 0,
          false,
          {
            fileName: 'app/components/BrainHeading.tsx',
            lineNumber: 13,
            columnNumber: 10,
          },
          this,
        ),
        'skillset',
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/BrainHeading.tsx',
      lineNumber: 12,
      columnNumber: 5,
    },
    this,
  );
};

// app/components/Brain.tsx
var import_jsx_dev_runtime16 = __toESM(require_jsx_dev_runtime(), 1);
var Brain = ({ data = BrainData, offset }) => {
  const [ref2, bounds] = useMeasure({ debounce: 200 });
  const localRef = (0, import_react21.useRef)(null);
  const { setBrain } = useMenuState();
  (0, import_react21.useEffect)(
    () => setBrain({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 200 }),
    [bounds, setBrain],
  );
  const Skills = (0, import_react21.useMemo)(
    () =>
      data.map((o3, index) =>
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          BrainSkill,
          { offset, ...o3 },
          index,
          false,
          {
            fileName: 'app/components/Brain.tsx',
            lineNumber: 23,
            columnNumber: 55,
          },
          this,
        ),
      ),
    [],
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
    'div',
    {
      className: section,
      ref: o2([localRef, ref2]),
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          'div',
          { className: clsx(row, 'absolute h-screen overflow-hidden gap-2'), children: [...Skills] },
          void 0,
          true,
          {
            fileName: 'app/components/Brain.tsx',
            lineNumber: 26,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          BrainHeading,
          { offset },
          void 0,
          false,
          {
            fileName: 'app/components/Brain.tsx',
            lineNumber: 27,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/Brain.tsx',
      lineNumber: 25,
      columnNumber: 5,
    },
    this,
  );
};
var Brain_default = Brain;

// app/components/Lives.tsx
var import_react22 = __toESM(require_react(), 1);

// app/components/LivesHeading.tsx
var import_jsx_dev_runtime17 = __toESM(require_jsx_dev_runtime(), 1);
var LivesHeading = ({ offset }) => {
  const { scale, y: y2 } = useSpring({
    scale: offset.to([2, 3], [2, 1]),
    y: offset.to([0, 1], [0, 1]),
    from: { scale: 10, y: 0 },
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
    animated.div,
    {
      className: clsx(h3, 'absolute text-[2rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]'),
      style: { scale, y: y2 },
      children: [
        'Based In ',
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
          'div',
          { className: h3Inline, children: 'NYC' },
          void 0,
          false,
          {
            fileName: 'app/components/LivesHeading.tsx',
            lineNumber: 18,
            columnNumber: 16,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/LivesHeading.tsx',
      lineNumber: 14,
      columnNumber: 5,
    },
    this,
  );
};

// app/assets/graphics/cityFrameCircle.svg
var cityFrameCircle_default = '/build/_assets/cityFrameCircle-Y45X5PVZ.svg';

// app/components/LivesBackground.tsx
var import_jsx_dev_runtime18 = __toESM(require_jsx_dev_runtime(), 1);
var LivesBackground = ({ scale, y: y2 }) =>
  /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
    'div',
    {
      className: row,
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
        animated.img,
        { className: 'w-screen relative', style: { scale, y: y2 }, src: cityFrameCircle_default },
        void 0,
        false,
        {
          fileName: 'app/components/LivesBackground.tsx',
          lineNumber: 8,
          columnNumber: 5,
        },
        this,
      ),
    },
    void 0,
    false,
    {
      fileName: 'app/components/LivesBackground.tsx',
      lineNumber: 7,
      columnNumber: 3,
    },
    this,
  );

// app/components/Lives.tsx
var import_jsx_dev_runtime19 = __toESM(require_jsx_dev_runtime(), 1);
var Lives = ({ offset }) => {
  const [ref2, bounds] = useMeasure();
  const localRef = (0, import_react22.useRef)(null);
  const { setLives } = useMenuState();
  (0, import_react22.useEffect)(
    () => setLives({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 300 }),
    [bounds, setLives],
  );
  const [{ scale }] = useSpring(
    { scale: offset.to({ range: [2, 4], output: [3, 1], extrapolate: 'clamp' }), config: config.molasses },
    [],
  );
  const [{ y: y2 }] = useSpring(
    {
      y: offset.to({ range: [2.5, 3.5], output: [-bounds.height, bounds.height], extrapolate: 'clamp' }),
      config: config.slow,
    },
    [bounds.height],
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
    'div',
    {
      className: section,
      ref: o2([localRef, ref2]),
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
          LivesBackground,
          { scale, y: y2 },
          void 0,
          false,
          {
            fileName: 'app/components/Lives.tsx',
            lineNumber: 29,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
          LivesHeading,
          { offset },
          void 0,
          false,
          {
            fileName: 'app/components/Lives.tsx',
            lineNumber: 30,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/Lives.tsx',
      lineNumber: 28,
      columnNumber: 5,
    },
    this,
  );
};
var Lives_default = Lives;

// app/components/Learn.tsx
var import_react23 = __toESM(require_react(), 1);

// app/components/LearnHeading.tsx
var import_jsx_dev_runtime20 = __toESM(require_jsx_dev_runtime(), 1);
var LearnHeading = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
    animated.div,
    {
      className: clsx(h3, 'text-[1rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]'),
      children: [
        'More',
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
          'div',
          { className: h3Inline, children: ' Coming ' },
          void 0,
          false,
          {
            fileName: 'app/components/LearnHeading.tsx',
            lineNumber: 8,
            columnNumber: 11,
          },
          this,
        ),
        'Soon!',
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/components/LearnHeading.tsx',
      lineNumber: 7,
      columnNumber: 5,
    },
    this,
  );
};

// app/components/LearnMessage.tsx
var import_jsx_dev_runtime21 = __toESM(require_jsx_dev_runtime(), 1);
var LearnMessage = () =>
  /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
    'div',
    { className: clsx(h4, 'text-white text-[2rem] pb-10'), children: 'In the meantime ...' },
    void 0,
    false,
    {
      fileName: 'app/components/LearnMessage.tsx',
      lineNumber: 6,
      columnNumber: 3,
    },
    this,
  );

// app/components/LearnExternal.tsx
var import_jsx_dev_runtime22 = __toESM(require_jsx_dev_runtime(), 1);
var LearnExternal = ({ Icon, message, link, download = false }) => {
  const { bind, interactStyles } = useInteract_default({ onClick: () => ({}) });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
    animated.a,
    {
      ...bind(),
      href: link,
      className: clsx(box, 'no-underline text-[white]'),
      style: { ...interactStyles },
      download,
      target: '_blank',
      rel: 'noopener',
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
        animated.div,
        {
          className: clsx(
            h4,
            'no-underline text-[white] text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] 2xl:text-[3rem]',
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
              Icon,
              { className: 'm-auto align-middle' },
              void 0,
              false,
              {
                fileName: 'app/components/LearnExternal.tsx',
                lineNumber: 29,
                columnNumber: 9,
              },
              this,
            ),
            ' ',
            /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
              'div',
              { className: clsx(h4, 'text-[0.5em]'), children: message },
              void 0,
              false,
              {
                fileName: 'app/components/LearnExternal.tsx',
                lineNumber: 29,
                columnNumber: 50,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: 'app/components/LearnExternal.tsx',
          lineNumber: 26,
          columnNumber: 7,
        },
        this,
      ),
    },
    void 0,
    false,
    {
      fileName: 'app/components/LearnExternal.tsx',
      lineNumber: 17,
      columnNumber: 5,
    },
    this,
  );
};

// ../../node_modules/react-icons/hi/index.esm.js
function HiOutlineDocumentDownload(props) {
  return GenIcon({
    tag: 'svg',
    attr: { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
    child: [
      {
        tag: 'path',
        attr: {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '2',
          d: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        },
      },
    ],
  })(props);
}

// app/data/LearnData.ts
var externalData = [
  {
    Icon: AiFillGithub,
    message: 'See the code',
    handle: 'sujishpatel',
    link: 'https://github.com/sujishpatel/jish-dev',
    download: false,
  },
  {
    Icon: MdEmail,
    message: 'Send a message',
    handle: 'justjish@gmail.com',
    link: 'mailto:justjish@gmail.com?subject=Just saw your site',
    download: false,
  },
  {
    Icon: HiOutlineDocumentDownload,
    message: 'Get the resume',
    handle: 'naw',
    link: '/Resume_Sujish_Patel_02-2023.pdf',
    download: true,
  },
  {
    Icon: AiFillInstagram,
    message: 'View some grams',
    handle: 'justjish',
    link: 'https://www.instagram.com/justjish/',
    download: false,
  },
  {
    Icon: AiFillLinkedin,
    message: 'Connect with me',
    handle: 'naw',
    link: 'https://www.linkedin.com/in/sujishpatel/',
    download: false,
  },
  {
    Icon: AiFillFacebook,
    message: 'See a timeline',
    handle: 'naw',
    link: 'https://www.facebook.com/justjish',
    download: false,
  },
];

// app/components/Learn.tsx
var import_jsx_dev_runtime23 = __toESM(require_jsx_dev_runtime(), 1);
var import_react24 = __toESM(require_react(), 1);
var Learn = ({ offset }) => {
  const [ref2, bounds] = useMeasure();
  const localRef = (0, import_react23.useRef)(null);
  const { setLearn } = useMenuState();
  (0, import_react23.useEffect)(
    () => setLearn({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 400 }),
    [bounds, setLearn],
  );
  const [{ opacity, scale, y: y2 }] = useSpring(
    {
      opacity: offset.to([1.5, 4], [0, 1]),
      scale: offset.to([2.5, 4], [0.5, 1]),
      y: offset.to([3, 4], [-600, 0]),
      config: config.default,
    },
    [],
  );
  const ExternalLinks = (0, import_react23.useMemo)(
    () =>
      externalData.map((props, i2) =>
        /* @__PURE__ */ (0, import_react24.createElement)(LearnExternal, { ...props, key: i2 }),
      ),
    [],
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
    'div',
    {
      className: section,
      ref: o2([localRef, ref2]),
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
        animated.div,
        {
          className: clsx(box, 'overflow-hidden'),
          style: { opacity, scale, y: y2 },
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
              LearnHeading,
              {},
              void 0,
              false,
              {
                fileName: 'app/components/Learn.tsx',
                lineNumber: 35,
                columnNumber: 9,
              },
              this,
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
              LearnMessage,
              {},
              void 0,
              false,
              {
                fileName: 'app/components/Learn.tsx',
                lineNumber: 36,
                columnNumber: 9,
              },
              this,
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
              'div',
              { className: 'grid grid-cols-[repeat(3,1fr)] gap-5', children: [' ', ...ExternalLinks, ' '] },
              void 0,
              true,
              {
                fileName: 'app/components/Learn.tsx',
                lineNumber: 37,
                columnNumber: 9,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: 'app/components/Learn.tsx',
          lineNumber: 34,
          columnNumber: 7,
        },
        this,
      ),
    },
    void 0,
    false,
    {
      fileName: 'app/components/Learn.tsx',
      lineNumber: 33,
      columnNumber: 5,
    },
    this,
  );
};
var Learn_default = Learn;

// app/components/App.tsx
var import_jsx_dev_runtime24 = __toESM(require_jsx_dev_runtime(), 1);
var App = () => {
  const heightRef = useWindowHeightRef();
  const scrollPos = useScroll({});
  const [{ offset }] = useSpring({ offset: scrollPos.scrollY.to((v) => v / heightRef.current) }, [scrollPos]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
    MenuProvider,
    {
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
        'div',
        {
          className: 'absolute w-screen h-[500vh] overflow-x-hidden m-0 p-0',
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
              Hello_default,
              { offset },
              void 0,
              false,
              {
                fileName: 'app/components/App.tsx',
                lineNumber: 55,
                columnNumber: 9,
              },
              this,
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
              StoryProvider,
              {
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
                  Story_default,
                  { offset },
                  void 0,
                  false,
                  {
                    fileName: 'app/components/App.tsx',
                    lineNumber: 57,
                    columnNumber: 11,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName: 'app/components/App.tsx',
                lineNumber: 56,
                columnNumber: 9,
              },
              this,
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
              Brain_default,
              { offset },
              void 0,
              false,
              {
                fileName: 'app/components/App.tsx',
                lineNumber: 59,
                columnNumber: 9,
              },
              this,
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
              Lives_default,
              { offset },
              void 0,
              false,
              {
                fileName: 'app/components/App.tsx',
                lineNumber: 60,
                columnNumber: 9,
              },
              this,
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
              Learn_default,
              { offset },
              void 0,
              false,
              {
                fileName: 'app/components/App.tsx',
                lineNumber: 61,
                columnNumber: 9,
              },
              this,
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
              Menu_default,
              {},
              void 0,
              false,
              {
                fileName: 'app/components/App.tsx',
                lineNumber: 62,
                columnNumber: 9,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: 'app/components/App.tsx',
          lineNumber: 54,
          columnNumber: 7,
        },
        this,
      ),
    },
    void 0,
    false,
    {
      fileName: 'app/components/App.tsx',
      lineNumber: 53,
      columnNumber: 5,
    },
    this,
  );
};
var App_default = App;

// app/routes/index.tsx
var import_jsx_dev_runtime25 = __toESM(require_jsx_dev_runtime(), 1);
var meta = () => {
  return {
    title: 'jish.dev',
    description: 'All-in-one remix starter template for Cloudflare Workers',
  };
};
var links = () => {
  return [];
};
function Index() {
  const { title } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
    App_default,
    {},
    void 0,
    false,
    {
      fileName: 'app/routes/index.tsx',
      lineNumber: 27,
      columnNumber: 10,
    },
    this,
  );
}
export { Index as default, links, meta };
//# sourceMappingURL=/build/routes/index-AXA5EGXX.js.map
