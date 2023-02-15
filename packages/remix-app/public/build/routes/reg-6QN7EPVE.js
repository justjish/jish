import { Link, require_jsx_dev_runtime } from '/build/_shared/chunk-LVR3G7GU.js';
import { __toESM } from '/build/_shared/chunk-4IYZMDEG.js';

// app/routes/reg.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
var featureImage = 'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM';
var featureImage400 =
  'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM';
var featureImage800 =
  'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM';
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    'div',
    {
      style: { fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' },
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'h1',
          { children: 'Remix Image Component for Cloudflare' },
          void 0,
          false,
          {
            fileName: 'app/routes/reg.tsx',
            lineNumber: 14,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'p',
          {
            children: [
              'This image is loaded with the standard HTML ',
              `<img />`,
              ' tag. Note that different sized images must be provided in advance. Compare with ',
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Link,
                { to: '/pure', children: 'Image Component' },
                void 0,
                false,
                {
                  fileName: 'app/routes/reg.tsx',
                  lineNumber: 17,
                  columnNumber: 34,
                },
                this,
              ),
              ' utilizing a pure JS transformer.',
            ],
          },
          void 0,
          true,
          {
            fileName: 'app/routes/reg.tsx',
            lineNumber: 15,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'div',
          {
            className: 'fade-in',
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              'img',
              {
                src: featureImage,
                srcSet: `${featureImage400} 400w, ${featureImage800} 800w`,
                sizes: '(max-width: 640px) 400px, 800px',
                width: 2156,
                height: 1434,
                alt: 'Featured',
                decoding: 'async',
                style: {
                  backgroundSize: 'cover',
                  backgroundColor: '#eee',
                  width: '100%',
                  height: 'auto',
                },
              },
              void 0,
              false,
              {
                fileName: 'app/routes/reg.tsx',
                lineNumber: 20,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName: 'app/routes/reg.tsx',
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
      fileName: 'app/routes/reg.tsx',
      lineNumber: 13,
      columnNumber: 5,
    },
    this,
  );
}
export { Index as default };
//# sourceMappingURL=/build/routes/reg-6QN7EPVE.js.map
