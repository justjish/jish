import {
  UNSAFE_DEFERRED_SYMBOL,
  createStaticHandler,
  defer,
  getStaticContextFromError,
  init_router,
  isRouteErrorResponse,
  matchRoutes,
} from '/build/_shared/chunk-LVR3G7GU.js';
import { __commonJS, __esm, __export, __toESM } from '/build/_shared/chunk-4IYZMDEG.js';

// ../../node_modules/@remix-run/server-runtime/dist/esm/errors.js
async function serializeError(error) {
  return {
    message: error.message,
    stack: error.stack,
  };
}
function serializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = {
        ...val,
        __type: 'RouteErrorResponse',
      };
    } else if (val instanceof Error) {
      serialized[key] = {
        message: val.message,
        stack: val.stack,
        __type: 'Error',
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
var init_errors = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/errors.js'() {
    init_router();
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/responses.js
function isDeferredData(value) {
  let deferred = value;
  return (
    deferred &&
    typeof deferred === 'object' &&
    typeof deferred.data === 'object' &&
    typeof deferred.subscribe === 'function' &&
    typeof deferred.cancel === 'function' &&
    typeof deferred.resolveData === 'function'
  );
}
function isResponse(value) {
  return (
    value != null &&
    typeof value.status === 'number' &&
    typeof value.statusText === 'string' &&
    typeof value.headers === 'object' &&
    typeof value.body !== 'undefined'
  );
}
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes.has(statusCode);
}
function isRedirectResponse(response) {
  return isRedirectStatusCode(response.status);
}
function isTrackedPromise(value) {
  return value != null && typeof value.then === 'function' && value._tracked === true;
}
function createDeferredReadableStream(deferredData, signal) {
  let encoder = new TextEncoder();
  let stream = new ReadableStream({
    async start(controller) {
      let criticalData = {};
      let preresolvedKeys = [];
      for (let [key, value] of Object.entries(deferredData.data)) {
        if (isTrackedPromise(value)) {
          criticalData[key] = `${DEFERRED_VALUE_PLACEHOLDER_PREFIX}${key}`;
          if (typeof value._data !== 'undefined' || typeof value._error !== 'undefined') {
            preresolvedKeys.push(key);
          }
        } else {
          criticalData[key] = value;
        }
      }
      controller.enqueue(encoder.encode(JSON.stringify(criticalData) + '\n\n'));
      for (let preresolvedKey of preresolvedKeys) {
        enqueueTrackedPromise(controller, encoder, preresolvedKey, deferredData.data[preresolvedKey]);
      }
      let unsubscribe = deferredData.subscribe((aborted, settledKey) => {
        if (settledKey) {
          enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey]);
        }
      });
      await deferredData.resolveData(signal);
      unsubscribe();
      controller.close();
    },
  });
  return stream;
}
function enqueueTrackedPromise(controller, encoder, settledKey, promise) {
  if ('_error' in promise) {
    controller.enqueue(
      encoder.encode(
        'error:' +
          JSON.stringify({
            [settledKey]: serializeError(promise._error),
          }) +
          '\n\n',
      ),
    );
  } else {
    controller.enqueue(
      encoder.encode(
        'data:' +
          JSON.stringify({
            [settledKey]: promise._data ?? null,
          }) +
          '\n\n',
      ),
    );
  }
}
var json, defer2, redirect, redirectStatusCodes, DEFERRED_VALUE_PLACEHOLDER_PREFIX;
var init_responses = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/responses.js'() {
    init_router();
    init_errors();
    json = (data, init = {}) => {
      let responseInit =
        typeof init === 'number'
          ? {
              status: init,
            }
          : init;
      let headers = new Headers(responseInit.headers);
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json; charset=utf-8');
      }
      return new Response(JSON.stringify(data), {
        ...responseInit,
        headers,
      });
    };
    defer2 = (data, init = {}) => {
      let responseInit =
        typeof init === 'number'
          ? {
              status: init,
            }
          : init;
      let headers = new Headers(responseInit.headers);
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json; charset=utf-8');
      }
      return defer(data, {
        ...responseInit,
        headers,
      });
    };
    redirect = (url, init = 302) => {
      let responseInit = init;
      if (typeof responseInit === 'number') {
        responseInit = {
          status: responseInit,
        };
      } else if (typeof responseInit.status === 'undefined') {
        responseInit.status = 302;
      }
      let headers = new Headers(responseInit.headers);
      headers.set('Location', url);
      return new Response(null, {
        ...responseInit,
        headers,
      });
    };
    redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    DEFERRED_VALUE_PLACEHOLDER_PREFIX = '__deferred_promise:';
  },
});

// ../../node_modules/cookie/index.js
var require_cookie = __commonJS({
  '../../node_modules/cookie/index.js'(exports) {
    'use strict';
    exports.parse = parse2;
    exports.serialize = serialize2;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options) {
      if (typeof str !== 'string') {
        throw new TypeError('argument str must be a string');
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(';');
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var index = pair.indexOf('=');
        if (index < 0) {
          continue;
        }
        var key = pair.substring(0, index).trim();
        if (void 0 == obj[key]) {
          var val = pair.substring(index + 1, pair.length).trim();
          if (val[0] === '"') {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize2(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== 'function') {
        throw new TypeError('option encode is invalid');
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError('argument name is invalid');
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError('argument val is invalid');
      }
      var str = name + '=' + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError('option maxAge is invalid');
        }
        str += '; Max-Age=' + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError('option domain is invalid');
        }
        str += '; Domain=' + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError('option path is invalid');
        }
        str += '; Path=' + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== 'function') {
          throw new TypeError('option expires is invalid');
        }
        str += '; Expires=' + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += '; HttpOnly';
      }
      if (opt.secure) {
        str += '; Secure';
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += '; SameSite=Strict';
            break;
          case 'lax':
            str += '; SameSite=Lax';
            break;
          case 'strict':
            str += '; SameSite=Strict';
            break;
          case 'none':
            str += '; SameSite=None';
            break;
          default:
            throw new TypeError('option sameSite is invalid');
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/warnings.js
function warnOnce(condition, message) {
  if (!condition && !alreadyWarned[message]) {
    alreadyWarned[message] = true;
    console.warn(message);
  }
}
var alreadyWarned;
var init_warnings = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/warnings.js'() {
    alreadyWarned = {};
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/cookies.js
async function encodeCookieValue(sign, value, secrets) {
  let encoded = encodeData(value);
  if (secrets.length > 0) {
    encoded = await sign(encoded, secrets[0]);
  }
  return encoded;
}
async function decodeCookieValue(unsign, value, secrets) {
  if (secrets.length > 0) {
    for (let secret of secrets) {
      let unsignedValue = await unsign(value, secret);
      if (unsignedValue !== false) {
        return decodeData(unsignedValue);
      }
    }
    return null;
  }
  return decodeData(value);
}
function encodeData(value) {
  return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))));
}
function decodeData(value) {
  try {
    return JSON.parse(decodeURIComponent(myEscape(atob(value))));
  } catch (error) {
    return {};
  }
}
function myEscape(value) {
  let str = value.toString();
  let result = '';
  let index = 0;
  let chr, code;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (/[\w*+\-./@]/.exec(chr)) {
      result += chr;
    } else {
      code = chr.charCodeAt(0);
      if (code < 256) {
        result += '%' + hex(code, 2);
      } else {
        result += '%u' + hex(code, 4).toUpperCase();
      }
    }
  }
  return result;
}
function hex(code, length) {
  let result = code.toString(16);
  while (result.length < length) result = '0' + result;
  return result;
}
function myUnescape(value) {
  let str = value.toString();
  let result = '';
  let index = 0;
  let chr, part;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (chr === '%') {
      if (str.charAt(index) === 'u') {
        part = str.slice(index + 1, index + 5);
        if (/^[\da-f]{4}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 5;
          continue;
        }
      } else {
        part = str.slice(index, index + 2);
        if (/^[\da-f]{2}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 2;
          continue;
        }
      }
    }
    result += chr;
  }
  return result;
}
function warnOnceAboutExpiresCookie(name, expires) {
  warnOnce(
    !expires,
    `The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`,
  );
}
var import_cookie, createCookieFactory, isCookie;
var init_cookies = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/cookies.js'() {
    import_cookie = __toESM(require_cookie());
    init_warnings();
    createCookieFactory =
      ({ sign, unsign }) =>
      (name, cookieOptions = {}) => {
        let { secrets, ...options } = {
          secrets: [],
          path: '/',
          sameSite: 'lax',
          ...cookieOptions,
        };
        warnOnceAboutExpiresCookie(name, options.expires);
        return {
          get name() {
            return name;
          },
          get isSigned() {
            return secrets.length > 0;
          },
          get expires() {
            return typeof options.maxAge !== 'undefined'
              ? new Date(Date.now() + options.maxAge * 1e3)
              : options.expires;
          },
          async parse(cookieHeader, parseOptions) {
            if (!cookieHeader) return null;
            let cookies = (0, import_cookie.parse)(cookieHeader, {
              ...options,
              ...parseOptions,
            });
            return name in cookies
              ? cookies[name] === ''
                ? ''
                : await decodeCookieValue(unsign, cookies[name], secrets)
              : null;
          },
          async serialize(value, serializeOptions) {
            return (0, import_cookie.serialize)(
              name,
              value === '' ? '' : await encodeCookieValue(sign, value, secrets),
              {
                ...options,
                ...serializeOptions,
              },
            );
          },
        };
      };
    isCookie = (object) => {
      return (
        object != null &&
        typeof object.name === 'string' &&
        typeof object.isSigned === 'boolean' &&
        typeof object.parse === 'function' &&
        typeof object.serialize === 'function'
      );
    };
  },
});

// ../../node_modules/@web3-storage/multipart-parser/esm/src/utils.js
function stringToArray(s) {
  const utf8 = unescape(encodeURIComponent(s));
  return Uint8Array.from(utf8, (_, i) => utf8.charCodeAt(i));
}
function arrayToString(a) {
  const utf8 = String.fromCharCode.apply(null, a);
  return decodeURIComponent(escape(utf8));
}
function mergeArrays(...arrays) {
  const out = new Uint8Array(arrays.reduce((total, arr) => total + arr.length, 0));
  let offset = 0;
  for (const arr of arrays) {
    out.set(arr, offset);
    offset += arr.length;
  }
  return out;
}
function arraysEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
var init_utils = __esm({
  '../../node_modules/@web3-storage/multipart-parser/esm/src/utils.js'() {},
});

// ../../node_modules/@web3-storage/multipart-parser/esm/src/search.js
function coerce(a) {
  if (a instanceof Uint8Array) {
    return (index) => a[index];
  }
  return a;
}
function jsmemcmp(buf1, pos1, buf2, pos2, len) {
  const fn1 = coerce(buf1);
  const fn2 = coerce(buf2);
  for (let i = 0; i < len; ++i) {
    if (fn1(pos1 + i) !== fn2(pos2 + i)) {
      return false;
    }
  }
  return true;
}
function createOccurenceTable(s) {
  const table = new Array(256).fill(s.length);
  if (s.length > 1) {
    for (let i = 0; i < s.length - 1; i++) {
      table[s[i]] = s.length - 1 - i;
    }
  }
  return table;
}
var MATCH, StreamSearch, ReadableStreamSearch, EOQ, QueueableStreamSearch;
var init_search = __esm({
  '../../node_modules/@web3-storage/multipart-parser/esm/src/search.js'() {
    init_utils();
    MATCH = Symbol('Match');
    StreamSearch = class {
      constructor(needle) {
        this._lookbehind = new Uint8Array();
        if (typeof needle === 'string') {
          this._needle = needle = stringToArray(needle);
        } else {
          this._needle = needle;
        }
        this._lastChar = needle[needle.length - 1];
        this._occ = createOccurenceTable(needle);
      }
      feed(chunk) {
        let pos = 0;
        let tokens;
        const allTokens = [];
        while (pos !== chunk.length) {
          [pos, ...tokens] = this._feed(chunk, pos);
          allTokens.push(...tokens);
        }
        return allTokens;
      }
      end() {
        const tail = this._lookbehind;
        this._lookbehind = new Uint8Array();
        return tail;
      }
      _feed(data, bufPos) {
        const tokens = [];
        let pos = -this._lookbehind.length;
        if (pos < 0) {
          while (pos < 0 && pos <= data.length - this._needle.length) {
            const ch = this._charAt(data, pos + this._needle.length - 1);
            if (ch === this._lastChar && this._memcmp(data, pos, this._needle.length - 1)) {
              if (pos > -this._lookbehind.length) {
                tokens.push(this._lookbehind.slice(0, this._lookbehind.length + pos));
              }
              tokens.push(MATCH);
              this._lookbehind = new Uint8Array();
              return [pos + this._needle.length, ...tokens];
            } else {
              pos += this._occ[ch];
            }
          }
          if (pos < 0) {
            while (pos < 0 && !this._memcmp(data, pos, data.length - pos)) {
              pos++;
            }
          }
          if (pos >= 0) {
            tokens.push(this._lookbehind);
            this._lookbehind = new Uint8Array();
          } else {
            const bytesToCutOff = this._lookbehind.length + pos;
            if (bytesToCutOff > 0) {
              tokens.push(this._lookbehind.slice(0, bytesToCutOff));
              this._lookbehind = this._lookbehind.slice(bytesToCutOff);
            }
            this._lookbehind = Uint8Array.from(new Array(this._lookbehind.length + data.length), (_, i) =>
              this._charAt(data, i - this._lookbehind.length),
            );
            return [data.length, ...tokens];
          }
        }
        pos += bufPos;
        while (pos <= data.length - this._needle.length) {
          const ch = data[pos + this._needle.length - 1];
          if (
            ch === this._lastChar &&
            data[pos] === this._needle[0] &&
            jsmemcmp(this._needle, 0, data, pos, this._needle.length - 1)
          ) {
            if (pos > bufPos) {
              tokens.push(data.slice(bufPos, pos));
            }
            tokens.push(MATCH);
            return [pos + this._needle.length, ...tokens];
          } else {
            pos += this._occ[ch];
          }
        }
        if (pos < data.length) {
          while (
            pos < data.length &&
            (data[pos] !== this._needle[0] || !jsmemcmp(data, pos, this._needle, 0, data.length - pos))
          ) {
            ++pos;
          }
          if (pos < data.length) {
            this._lookbehind = data.slice(pos);
          }
        }
        if (pos > 0) {
          tokens.push(data.slice(bufPos, pos < data.length ? pos : data.length));
        }
        return [data.length, ...tokens];
      }
      _charAt(data, pos) {
        if (pos < 0) {
          return this._lookbehind[this._lookbehind.length + pos];
        }
        return data[pos];
      }
      _memcmp(data, pos, len) {
        return jsmemcmp(this._charAt.bind(this, data), pos, this._needle, 0, len);
      }
    };
    ReadableStreamSearch = class {
      constructor(needle, _readableStream) {
        this._readableStream = _readableStream;
        this._search = new StreamSearch(needle);
      }
      async *[Symbol.asyncIterator]() {
        const reader = this._readableStream.getReader();
        try {
          while (true) {
            const result = await reader.read();
            if (result.done) {
              break;
            }
            yield* this._search.feed(result.value);
          }
          const tail = this._search.end();
          if (tail.length) {
            yield tail;
          }
        } finally {
          reader.releaseLock();
        }
      }
    };
    EOQ = Symbol('End of Queue');
    QueueableStreamSearch = class {
      constructor(needle) {
        this._chunksQueue = [];
        this._closed = false;
        this._search = new StreamSearch(needle);
      }
      push(...chunks) {
        if (this._closed) {
          throw new Error('cannot call push after close');
        }
        this._chunksQueue.push(...chunks);
        if (this._notify) {
          this._notify();
        }
      }
      close() {
        if (this._closed) {
          throw new Error('close was already called');
        }
        this._closed = true;
        this._chunksQueue.push(EOQ);
        if (this._notify) {
          this._notify();
        }
      }
      async *[Symbol.asyncIterator]() {
        while (true) {
          let chunk;
          while (!(chunk = this._chunksQueue.shift())) {
            await new Promise((resolve) => (this._notify = resolve));
            this._notify = void 0;
          }
          if (chunk === EOQ) {
            break;
          }
          yield* this._search.feed(chunk);
        }
        const tail = this._search.end();
        if (tail.length) {
          yield tail;
        }
      }
    };
  },
});

// ../../node_modules/@web3-storage/multipart-parser/esm/src/index.js
function parseContentDisposition(header) {
  const parts = header.split(';').map((part) => part.trim());
  if (parts.shift() !== 'form-data') {
    throw new Error('malformed content-disposition header: missing "form-data" in `' + JSON.stringify(parts) + '`');
  }
  const out = {};
  for (const part of parts) {
    const kv = part.split('=', 2);
    if (kv.length !== 2) {
      throw new Error(
        'malformed content-disposition header: key-value pair not found - ' + part + ' in `' + header + '`',
      );
    }
    const [name, value] = kv;
    if (value[0] === '"' && value[value.length - 1] === '"') {
      out[name] = value.slice(1, -1).replace(/\\"/g, '"');
    } else if (value[0] !== '"' && value[value.length - 1] !== '"') {
      out[name] = value;
    } else if (
      (value[0] === '"' && value[value.length - 1] !== '"') ||
      (value[0] !== '"' && value[value.length - 1] === '"')
    ) {
      throw new Error('malformed content-disposition header: mismatched quotations in `' + header + '`');
    }
  }
  if (!out.name) {
    throw new Error('malformed content-disposition header: missing field name in `' + header + '`');
  }
  return out;
}
function parsePartHeaders(lines) {
  const entries = [];
  let disposition = false;
  let line;
  while (typeof (line = lines.shift()) !== 'undefined') {
    const colon = line.indexOf(':');
    if (colon === -1) {
      throw new Error('malformed multipart-form header: missing colon');
    }
    const header = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();
    switch (header) {
      case 'content-disposition':
        disposition = true;
        entries.push(...Object.entries(parseContentDisposition(value)));
        break;
      case 'content-type':
        entries.push(['contentType', value]);
    }
  }
  if (!disposition) {
    throw new Error('malformed multipart-form header: missing content-disposition');
  }
  return Object.fromEntries(entries);
}
async function readHeaderLines(it, needle) {
  let firstChunk = true;
  let lastTokenWasMatch = false;
  const headerLines = [[]];
  const crlfSearch = new StreamSearch(CRLF);
  for (;;) {
    const result = await it.next();
    if (result.done) {
      throw new Error('malformed multipart-form data: unexpected end of stream');
    }
    if (firstChunk && result.value !== MATCH && arraysEqual(result.value.slice(0, 2), dash)) {
      return [void 0, new Uint8Array()];
    }
    let chunk;
    if (result.value !== MATCH) {
      chunk = result.value;
    } else if (!lastTokenWasMatch) {
      chunk = needle;
    } else {
      throw new Error('malformed multipart-form data: unexpected boundary');
    }
    if (!chunk.length) {
      continue;
    }
    if (firstChunk) {
      firstChunk = false;
    }
    const tokens = crlfSearch.feed(chunk);
    for (const [i, token] of tokens.entries()) {
      const isMatch = token === MATCH;
      if (!isMatch && !token.length) {
        continue;
      }
      if (lastTokenWasMatch && isMatch) {
        tokens.push(crlfSearch.end());
        return [
          headerLines
            .filter((chunks) => chunks.length)
            .map(mergeArrays2)
            .map(arrayToString),
          mergeArrays(...tokens.slice(i + 1).map((token2) => (token2 === MATCH ? CRLF : token2))),
        ];
      }
      if ((lastTokenWasMatch = isMatch)) {
        headerLines.push([]);
      } else {
        headerLines[headerLines.length - 1].push(token);
      }
    }
  }
}
async function* streamMultipart(body, boundary) {
  const needle = mergeArrays(dash, stringToArray(boundary));
  const it = new ReadableStreamSearch(needle, body)[Symbol.asyncIterator]();
  for (;;) {
    const result = await it.next();
    if (result.done) {
      return;
    }
    if (result.value === MATCH) {
      break;
    }
  }
  const crlfSearch = new StreamSearch(CRLF);
  for (;;) {
    let feedChunk = function (chunk) {
      const chunks = [];
      for (const token of crlfSearch.feed(chunk)) {
        if (trailingCRLF) {
          chunks.push(CRLF);
        }
        if (!(trailingCRLF = token === MATCH)) {
          chunks.push(token);
        }
      }
      return mergeArrays(...chunks);
    };
    const [headerLines, tail] = await readHeaderLines(it, needle);
    if (!headerLines) {
      return;
    }
    async function nextToken() {
      const result = await it.next();
      if (result.done) {
        throw new Error('malformed multipart-form data: unexpected end of stream');
      }
      return result;
    }
    let trailingCRLF = false;
    let done = false;
    async function nextChunk() {
      const result = await nextToken();
      let chunk;
      if (result.value !== MATCH) {
        chunk = result.value;
      } else if (!trailingCRLF) {
        chunk = CRLF;
      } else {
        done = true;
        return { value: crlfSearch.end() };
      }
      return { value: feedChunk(chunk) };
    }
    const bufferedChunks = [{ value: feedChunk(tail) }];
    yield {
      ...parsePartHeaders(headerLines),
      data: {
        [Symbol.asyncIterator]() {
          return this;
        },
        async next() {
          for (;;) {
            const result = bufferedChunks.shift();
            if (!result) {
              break;
            }
            if (result.value.length > 0) {
              return result;
            }
          }
          for (;;) {
            if (done) {
              return {
                done,
                value: void 0,
              };
            }
            const result = await nextChunk();
            if (result.value.length > 0) {
              return result;
            }
          }
        },
      },
    };
    while (!done) {
      bufferedChunks.push(await nextChunk());
    }
  }
}
var mergeArrays2, dash, CRLF;
var init_src = __esm({
  '../../node_modules/@web3-storage/multipart-parser/esm/src/index.js'() {
    init_search();
    init_utils();
    mergeArrays2 = Function.prototype.apply.bind(mergeArrays, void 0);
    dash = stringToArray('--');
    CRLF = stringToArray('\r\n');
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/formData.js
function composeUploadHandlers(...handlers) {
  return async (part) => {
    for (let handler of handlers) {
      let value = await handler(part);
      if (typeof value !== 'undefined' && value !== null) {
        return value;
      }
    }
    return void 0;
  };
}
async function parseMultipartFormData(request, uploadHandler) {
  let contentType = request.headers.get('Content-Type') || '';
  let [type, boundary] = contentType.split(/\s*;\s*boundary=/);
  if (!request.body || !boundary || type !== 'multipart/form-data') {
    throw new TypeError('Could not parse content as FormData.');
  }
  let formData = new FormData();
  let parts = streamMultipart(request.body, boundary);
  for await (let part of parts) {
    if (part.done) break;
    if (typeof part.filename === 'string') {
      part.filename = part.filename.split(/[/\\]/).pop();
    }
    let value = await uploadHandler(part);
    if (typeof value !== 'undefined' && value !== null) {
      formData.append(part.name, value);
    }
  }
  return formData;
}
var init_formData = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/formData.js'() {
    init_src();
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/entry.js
function createEntryRouteModules(manifest) {
  return Object.keys(manifest).reduce((memo, routeId) => {
    memo[routeId] = manifest[routeId].module;
    return memo;
  }, {});
}
var init_entry = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/entry.js'() {},
});

// ../../node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  '../../node_modules/set-cookie-parser/lib/set-cookie.js'(exports, module) {
    'use strict';
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false,
    };
    function isNonEmptyString(str) {
      return typeof str === 'string' && !!str.trim();
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(';').filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" +
            value +
            "'. Set options.decodeValues to false to disable this feature.",
          e,
        );
      }
      var cookie = {
        name,
        value,
      };
      parts.forEach(function (part) {
        var sides = part.split('=');
        var key = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join('=');
        if (key === 'expires') {
          cookie.expires = new Date(value2);
        } else if (key === 'max-age') {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key === 'secure') {
          cookie.secure = true;
        } else if (key === 'httponly') {
          cookie.httpOnly = true;
        } else if (key === 'samesite') {
          cookie.sameSite = value2;
        } else {
          cookie[key] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = '';
      var value = '';
      var nameValueArr = nameValuePairStr.split('=');
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join('=');
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse2(input, options) {
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!input) {
        if (!options.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers && input.headers['set-cookie']) {
        input = input.headers['set-cookie'];
      } else if (input.headers) {
        var sch =
          input.headers[
            Object.keys(input.headers).find(function (key) {
              return key.toLowerCase() === 'set-cookie';
            })
          ];
        if (!sch && input.headers.cookie && !options.silent) {
          console.warn(
            'Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.',
          );
        }
        input = sch;
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!options.map) {
        return input.filter(isNonEmptyString).map(function (str) {
          return parseString(str, options);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function (cookies2, str) {
          var cookie = parseString(str, options);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== 'string') {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== '=' && ch !== ';' && ch !== ',';
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ',') {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === '=') {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse2;
    module.exports.parse = parse2;
    module.exports.parseString = parseString;
    module.exports.splitCookiesString = splitCookiesString2;
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/headers.js
function getDocumentHeadersRR(build, context) {
  let matches = context.errors
    ? context.matches.slice(0, context.matches.findIndex((m) => context.errors[m.route.id]) + 1)
    : context.matches;
  return matches.reduce((parentHeaders, match) => {
    let { id } = match.route;
    let routeModule = build.routes[id].module;
    let loaderHeaders = context.loaderHeaders[id] || new Headers();
    let actionHeaders = context.actionHeaders[id] || new Headers();
    let headers = new Headers(
      routeModule.headers
        ? typeof routeModule.headers === 'function'
          ? routeModule.headers({
              loaderHeaders,
              parentHeaders,
              actionHeaders,
            })
          : routeModule.headers
        : void 0,
    );
    prependCookies(actionHeaders, headers);
    prependCookies(loaderHeaders, headers);
    prependCookies(parentHeaders, headers);
    return headers;
  }, new Headers());
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get('Set-Cookie');
  if (parentSetCookieString) {
    let cookies = (0, import_set_cookie_parser.splitCookiesString)(parentSetCookieString);
    cookies.forEach((cookie) => {
      childHeaders.append('Set-Cookie', cookie);
    });
  }
}
var import_set_cookie_parser;
var init_headers = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/headers.js'() {
    import_set_cookie_parser = __toESM(require_set_cookie());
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/invariant.js
function invariant(value, message) {
  if (value === false || value === null || typeof value === 'undefined') {
    console.error(
      'The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new',
    );
    throw new Error(message);
  }
}
var init_invariant = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/invariant.js'() {},
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/mode.js
function isServerMode(value) {
  return value === ServerMode.Development || value === ServerMode.Production || value === ServerMode.Test;
}
var ServerMode;
var init_mode = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/mode.js'() {
    (function (ServerMode2) {
      ServerMode2['Development'] = 'development';
      ServerMode2['Production'] = 'production';
      ServerMode2['Test'] = 'test';
    })(ServerMode || (ServerMode = {}));
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js
function matchServerRoutes(routes, pathname) {
  let matches = matchRoutes(routes, pathname);
  if (!matches) return null;
  return matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route,
  }));
}
var init_routeMatching = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js'() {
    init_router();
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/data.js
async function callRouteActionRR({ loadContext, action, params, request, routeId }) {
  let result = await action({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params,
  });
  if (result === void 0) {
    throw new Error(
      `You defined an action for route "${routeId}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`,
    );
  }
  return isResponse(result) ? result : json(result);
}
async function callRouteLoaderRR({ loadContext, loader, params, request, routeId }) {
  let result = await loader({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params,
  });
  if (result === void 0) {
    throw new Error(
      `You defined a loader for route "${routeId}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`,
    );
  }
  if (isDeferredData(result)) {
    if (result.init && isRedirectStatusCode(result.init.status || 200)) {
      return redirect(new Headers(result.init.headers).get('Location'), result.init);
    }
    return result;
  }
  return isResponse(result) ? result : json(result);
}
function stripIndexParam(request) {
  let url = new URL(request.url);
  let indexValues = url.searchParams.getAll('index');
  url.searchParams.delete('index');
  let indexValuesToKeep = [];
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append('index', toKeep);
  }
  return new Request(url.href, request);
}
function stripDataParam(request) {
  let url = new URL(request.url);
  url.searchParams.delete('_data');
  return new Request(url.href, request);
}
var init_data = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/data.js'() {
    init_responses();
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/routes.js
function groupRoutesByParentId(manifest) {
  let routes = {};
  Object.values(manifest).forEach((route) => {
    let parentId = route.parentId || '';
    if (!routes[parentId]) {
      routes[parentId] = [];
    }
    routes[parentId].push(route);
  });
  return routes;
}
function createRoutes(manifest, parentId = '', routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => ({
    ...route,
    children: createRoutes(manifest, route.id, routesByParentId),
  }));
}
function createStaticHandlerDataRoutes(
  manifest,
  future,
  parentId = '',
  routesByParentId = groupRoutesByParentId(manifest),
) {
  return (routesByParentId[parentId] || []).map((route) => {
    let hasErrorBoundary =
      future.v2_errorBoundary === true
        ? route.id === 'root' || route.module.ErrorBoundary != null
        : route.id === 'root' || route.module.CatchBoundary != null || route.module.ErrorBoundary != null;
    let commonRoute = {
      hasErrorBoundary,
      id: route.id,
      path: route.path,
      loader: route.module.loader
        ? (args) =>
            callRouteLoaderRR({
              request: args.request,
              params: args.params,
              loadContext: args.context,
              loader: route.module.loader,
              routeId: route.id,
            })
        : void 0,
      action: route.module.action
        ? (args) =>
            callRouteActionRR({
              request: args.request,
              params: args.params,
              loadContext: args.context,
              action: route.module.action,
              routeId: route.id,
            })
        : void 0,
      handle: route.module.handle,
    };
    return route.index
      ? {
          index: true,
          ...commonRoute,
        }
      : {
          caseSensitive: route.caseSensitive,
          children: createStaticHandlerDataRoutes(manifest, future, route.id, routesByParentId),
          ...commonRoute,
        };
  });
}
var init_routes = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/routes.js'() {
    init_data();
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/markup.js
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
var ESCAPE_LOOKUP, ESCAPE_REGEX;
var init_markup = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/markup.js'() {
    ESCAPE_LOOKUP = {
      '&': '\\u0026',
      '>': '\\u003e',
      '<': '\\u003c',
      '\u2028': '\\u2028',
      '\u2029': '\\u2029',
    };
    ESCAPE_REGEX = /[&><\u2028\u2029]/g;
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js
function createServerHandoffString(serverHandoff) {
  return escapeHtml(JSON.stringify(serverHandoff));
}
var init_serverHandoff = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js'() {
    init_markup();
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/server.js
async function handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext,
    });
    if (isRedirectResponse(response)) {
      let headers = new Headers(response.headers);
      headers.set('X-Remix-Redirect', headers.get('Location'));
      headers.set('X-Remix-Status', response.status);
      headers.delete('Location');
      if (response.headers.get('Set-Cookie') !== null) {
        headers.set('X-Remix-Revalidate', 'yes');
      }
      return new Response(null, {
        status: 204,
        headers,
      });
    }
    if (UNSAFE_DEFERRED_SYMBOL in response) {
      let deferredData = response[UNSAFE_DEFERRED_SYMBOL];
      let body = createDeferredReadableStream(deferredData, request.signal);
      let init = deferredData.init || {};
      let headers = new Headers(init.headers);
      headers.set('Content-Type', 'text/remix-deferred');
      init.headers = headers;
      return new Response(body, init);
    }
    return response;
  } catch (error) {
    if (isResponse(error)) {
      error.headers.set('X-Remix-Catch', 'yes');
      return error;
    }
    let status = 500;
    let errorInstance = error;
    if (isRouteErrorResponse(error)) {
      status = error.status;
      errorInstance = error.error || errorInstance;
    }
    if (serverMode !== ServerMode.Test && !request.signal.aborted) {
      console.error(errorInstance);
    }
    if (serverMode === ServerMode.Development && errorInstance instanceof Error) {
      return errorBoundaryError(errorInstance, status);
    }
    return errorBoundaryError(new Error('Unexpected Server Error'), status);
  }
}
function findParentBoundary(routes, routeId, error) {
  let route = routes[routeId] || routes['root'];
  let isCatch = isRouteErrorResponse(error) && (!error.error || error.status === 404);
  if ((isCatch && route.module.CatchBoundary) || (!isCatch && route.module.ErrorBoundary) || !route.parentId) {
    return route.id;
  }
  return findParentBoundary(routes, route.parentId, error);
}
function differentiateCatchVersusErrorBoundaries(build, context) {
  if (!context.errors) {
    return;
  }
  let errors = {};
  for (let routeId of Object.keys(context.errors)) {
    let error = context.errors[routeId];
    let handlingRouteId = findParentBoundary(build.routes, routeId, error);
    errors[handlingRouteId] = error;
  }
  context.errors = errors;
}
async function handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext) {
  let context;
  try {
    context = await staticHandler.query(request, {
      requestContext: loadContext,
    });
  } catch (error) {
    if (!request.signal.aborted && serverMode !== ServerMode.Test) {
      console.error(error);
    }
    return new Response(null, {
      status: 500,
    });
  }
  if (isResponse(context)) {
    return context;
  }
  if (build.future.v2_errorBoundary !== true) {
    differentiateCatchVersusErrorBoundaries(build, context);
  }
  let headers = getDocumentHeadersRR(build, context);
  let entryContext = {
    manifest: build.assets,
    routeModules: createEntryRouteModules(build.routes),
    staticHandlerContext: context,
    serverHandoffString: createServerHandoffString({
      state: {
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: serializeErrors(context.errors),
      },
      future: build.future,
      dev: build.dev,
    }),
    future: build.future,
  };
  let handleDocumentRequestFunction = build.entry.module.default;
  try {
    return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext);
  } catch (error) {
    context = getStaticContextFromError(staticHandler.dataRoutes, context, error);
    if (build.future.v2_errorBoundary !== true) {
      differentiateCatchVersusErrorBoundaries(build, context);
    }
    entryContext = {
      ...entryContext,
      staticHandlerContext: context,
      serverHandoffString: createServerHandoffString({
        state: {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors(context.errors),
        },
        future: build.future,
      }),
    };
    try {
      return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext);
    } catch (error2) {
      return returnLastResortErrorResponse(error2, serverMode);
    }
  }
}
async function handleResourceRequestRR(serverMode, staticHandler, routeId, request, loadContext) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext,
    });
    invariant(isResponse(response), 'Expected a Response to be returned from queryRoute');
    return response;
  } catch (error) {
    if (isResponse(error)) {
      error.headers.set('X-Remix-Catch', 'yes');
      return error;
    }
    return returnLastResortErrorResponse(error, serverMode);
  }
}
async function errorBoundaryError(error, status) {
  return json(await serializeError(error), {
    status,
    headers: {
      'X-Remix-Error': 'yes',
    },
  });
}
function returnLastResortErrorResponse(error, serverMode) {
  if (serverMode !== ServerMode.Test) {
    console.error(error);
  }
  let message = 'Unexpected Server Error';
  if (serverMode !== ServerMode.Production) {
    message += `

${String(error)}`;
  }
  return new Response(message, {
    status: 500,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
var createRequestHandler;
var init_server = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/server.js'() {
    init_router();
    init_entry();
    init_errors();
    init_headers();
    init_invariant();
    init_mode();
    init_routeMatching();
    init_routes();
    init_responses();
    init_serverHandoff();
    createRequestHandler = (build, mode) => {
      let routes = createRoutes(build.routes);
      let dataRoutes = createStaticHandlerDataRoutes(build.routes, build.future);
      let serverMode = isServerMode(mode) ? mode : ServerMode.Production;
      let staticHandler = createStaticHandler(dataRoutes);
      return async function requestHandler(request, loadContext = {}) {
        let url = new URL(request.url);
        let { unstable_dev } = build.future;
        if (
          mode === 'development' &&
          unstable_dev !== false &&
          url.pathname === (unstable_dev.remixRequestHandlerPath ?? '') + '/__REMIX_ASSETS_MANIFEST'
        ) {
          if (request.method !== 'GET') {
            return new Response('Method not allowed', {
              status: 405,
            });
          }
          return new Response(JSON.stringify(build.assets), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
        let matches = matchServerRoutes(routes, url.pathname);
        let response;
        if (url.searchParams.has('_data')) {
          let routeId = url.searchParams.get('_data');
          response = await handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext);
          if (build.entry.module.handleDataRequest) {
            let match = matches.find((match2) => match2.route.id == routeId);
            response = await build.entry.module.handleDataRequest(response, {
              context: loadContext,
              params: match.params,
              request,
            });
          }
        } else if (matches && matches[matches.length - 1].route.module.default == null) {
          response = await handleResourceRequestRR(
            serverMode,
            staticHandler,
            matches.slice(-1)[0].route.id,
            request,
            loadContext,
          );
        } else {
          response = await handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext);
        }
        if (request.method === 'HEAD') {
          return new Response(null, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
          });
        }
        return response;
      };
    };
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/sessions.js
function flash(name) {
  return `__flash_${name}__`;
}
function warnOnceAboutSigningSessionCookie(cookie) {
  warnOnce(
    cookie.isSigned,
    `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`,
  );
}
var createSession, isSession, createSessionStorageFactory;
var init_sessions = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/sessions.js'() {
    init_cookies();
    init_warnings();
    createSession = (initialData = {}, id = '') => {
      let map = new Map(Object.entries(initialData));
      return {
        get id() {
          return id;
        },
        get data() {
          return Object.fromEntries(map);
        },
        has(name) {
          return map.has(name) || map.has(flash(name));
        },
        get(name) {
          if (map.has(name)) return map.get(name);
          let flashName = flash(name);
          if (map.has(flashName)) {
            let value = map.get(flashName);
            map.delete(flashName);
            return value;
          }
          return void 0;
        },
        set(name, value) {
          map.set(name, value);
        },
        flash(name, value) {
          map.set(flash(name), value);
        },
        unset(name) {
          map.delete(name);
        },
      };
    };
    isSession = (object) => {
      return (
        object != null &&
        typeof object.id === 'string' &&
        typeof object.data !== 'undefined' &&
        typeof object.has === 'function' &&
        typeof object.get === 'function' &&
        typeof object.set === 'function' &&
        typeof object.flash === 'function' &&
        typeof object.unset === 'function'
      );
    };
    createSessionStorageFactory =
      (createCookie) =>
      ({ cookie: cookieArg, createData, readData, updateData, deleteData }) => {
        let cookie = isCookie(cookieArg)
          ? cookieArg
          : createCookie(
              (cookieArg === null || cookieArg === void 0 ? void 0 : cookieArg.name) || '__session',
              cookieArg,
            );
        warnOnceAboutSigningSessionCookie(cookie);
        return {
          async getSession(cookieHeader, options) {
            let id = cookieHeader && (await cookie.parse(cookieHeader, options));
            let data = id && (await readData(id));
            return createSession(data || {}, id || '');
          },
          async commitSession(session, options) {
            let { id, data } = session;
            if (id) {
              await updateData(id, data, cookie.expires);
            } else {
              id = await createData(data, cookie.expires);
            }
            return cookie.serialize(id, options);
          },
          async destroySession(session, options) {
            await deleteData(session.id);
            return cookie.serialize('', {
              ...options,
              expires: new Date(0),
            });
          },
        };
      };
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js
var createCookieSessionStorageFactory;
var init_cookieStorage = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js'() {
    init_cookies();
    init_sessions();
    createCookieSessionStorageFactory =
      (createCookie) =>
      ({ cookie: cookieArg } = {}) => {
        let cookie = isCookie(cookieArg)
          ? cookieArg
          : createCookie(
              (cookieArg === null || cookieArg === void 0 ? void 0 : cookieArg.name) || '__session',
              cookieArg,
            );
        warnOnceAboutSigningSessionCookie(cookie);
        return {
          async getSession(cookieHeader, options) {
            return createSession((cookieHeader && (await cookie.parse(cookieHeader, options))) || {});
          },
          async commitSession(session, options) {
            let serializedCookie = await cookie.serialize(session.data, options);
            if (serializedCookie.length > 4096) {
              throw new Error('Cookie length will exceed browser maximum. Length: ' + serializedCookie.length);
            }
            return serializedCookie;
          },
          async destroySession(_session, options) {
            return cookie.serialize('', {
              ...options,
              expires: new Date(0),
            });
          },
        };
      };
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js
var createMemorySessionStorageFactory;
var init_memoryStorage = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js'() {
    createMemorySessionStorageFactory =
      (createSessionStorage) =>
      ({ cookie } = {}) => {
        let uniqueId = 0;
        let map = /* @__PURE__ */ new Map();
        return createSessionStorage({
          cookie,
          async createData(data, expires) {
            let id = (++uniqueId).toString();
            map.set(id, {
              data,
              expires,
            });
            return id;
          },
          async readData(id) {
            if (map.has(id)) {
              let { data, expires } = map.get(id);
              if (!expires || expires > new Date()) {
                return data;
              }
              if (expires) map.delete(id);
            }
            return null;
          },
          async updateData(id, data, expires) {
            map.set(id, {
              data,
              expires,
            });
          },
          async deleteData(id) {
            map.delete(id);
          },
        });
      };
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/upload/errors.js
var MaxPartSizeExceededError;
var init_errors2 = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/upload/errors.js'() {
    MaxPartSizeExceededError = class extends Error {
      constructor(field, maxBytes) {
        super(`Field "${field}" exceeded upload size of ${maxBytes} bytes.`);
        this.field = field;
        this.maxBytes = maxBytes;
      }
    };
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js
function createMemoryUploadHandler({ filter, maxPartSize = 3e6 } = {}) {
  return async ({ filename, contentType, name, data }) => {
    if (
      filter &&
      !(await filter({
        filename,
        contentType,
        name,
      }))
    ) {
      return void 0;
    }
    let size = 0;
    let chunks = [];
    for await (let chunk of data) {
      size += chunk.byteLength;
      if (size > maxPartSize) {
        throw new MaxPartSizeExceededError(name, maxPartSize);
      }
      chunks.push(chunk);
    }
    if (typeof filename === 'string') {
      return new File(chunks, filename, {
        type: contentType,
      });
    }
    return await new Blob(chunks, {
      type: contentType,
    }).text();
  };
}
var init_memoryUploadHandler = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js'() {
    init_errors2();
  },
});

// ../../node_modules/@remix-run/server-runtime/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  MaxPartSizeExceededError: () => MaxPartSizeExceededError,
  createCookieFactory: () => createCookieFactory,
  createCookieSessionStorageFactory: () => createCookieSessionStorageFactory,
  createMemorySessionStorageFactory: () => createMemorySessionStorageFactory,
  createRequestHandler: () => createRequestHandler,
  createSession: () => createSession,
  createSessionStorageFactory: () => createSessionStorageFactory,
  defer: () => defer2,
  isCookie: () => isCookie,
  isSession: () => isSession,
  json: () => json,
  redirect: () => redirect,
  unstable_composeUploadHandlers: () => composeUploadHandlers,
  unstable_createMemoryUploadHandler: () => createMemoryUploadHandler,
  unstable_parseMultipartFormData: () => parseMultipartFormData,
});
var init_esm = __esm({
  '../../node_modules/@remix-run/server-runtime/dist/esm/index.js'() {
    init_cookies();
    init_formData();
    init_responses();
    init_server();
    init_sessions();
    init_cookieStorage();
    init_memoryStorage();
    init_memoryUploadHandler();
    init_errors2();
  },
});

export { esm_exports, init_esm };
//# sourceMappingURL=/build/_shared/chunk-2BZS2RP3.js.map
