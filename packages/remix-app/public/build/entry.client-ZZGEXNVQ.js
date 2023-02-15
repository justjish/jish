import { require_react_dom } from '/build/_shared/chunk-QKK2MX43.js';
import { RemixBrowser, require_jsx_dev_runtime, require_react } from '/build/_shared/chunk-LVR3G7GU.js';
import { __commonJS, __toESM } from '/build/_shared/chunk-4IYZMDEG.js';

// ../../node_modules/react-dom/client.js
var require_client = __commonJS({
  '../../node_modules/react-dom/client.js'(exports) {
    'use strict';
    var m = require_react_dom();
    if (false) {
      exports.createRoot = m.createRoot;
      exports.hydrateRoot = m.hydrateRoot;
    } else {
      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function (c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function (c, h, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
    var i;
  },
});

// app/entry.client.tsx
var import_react2 = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function hydrate() {
  (0, import_react2.startTransition)(() => {
    (0, import_client.hydrateRoot)(
      document,
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react2.StrictMode,
        {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            RemixBrowser,
            {},
            void 0,
            false,
            {
              fileName: 'app/entry.client.tsx',
              lineNumber: 10,
              columnNumber: 9,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName: 'app/entry.client.tsx',
          lineNumber: 9,
          columnNumber: 7,
        },
        this,
      ),
    );
  });
}
if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
//# sourceMappingURL=/build/entry.client-ZZGEXNVQ.js.map
