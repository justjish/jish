import '/build/_shared/chunk-2BZS2RP3.js';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  require_jsx_dev_runtime,
  useCatch,
} from '/build/_shared/chunk-LVR3G7GU.js';
import { __toESM } from '/build/_shared/chunk-4IYZMDEG.js';

// app/styles/app.css
var app_default = '/build/_assets/app-NZKMIH5Y.css';

// ../../node_modules/remix-image/remix-image.css
var remix_image_default = '/build/_assets/remix-image-HRGDAORA.css';

// app/root.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
var links = () => {
  return [
    { rel: 'stylesheet', href: app_default },
    { rel: 'stylesheet', href: remix_image_default },
  ];
};
var meta = () => {
  return {
    viewport: 'width=device-width, initial-scale=1',
  };
};
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    'html',
    {
      lang: 'en',
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'head',
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                'meta',
                { charSet: 'utf-8' },
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 34,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                'title',
                { children: 'Jish.Dev' },
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 35,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Meta,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 36,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Links,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
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
            fileName: 'app/root.tsx',
            lineNumber: 33,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'body',
          {
            className: 'w-full h-full overflow-x-hidden bg-[rgba(21,16,25)] m-0 p-0 overflow-hidden;',
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Outlet,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 40,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                ScrollRestoration,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 41,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Scripts,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 42,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                LiveReload,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 43,
                  columnNumber: 55,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: 'app/root.tsx',
            lineNumber: 39,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/root.tsx',
      lineNumber: 32,
      columnNumber: 5,
    },
    this,
  );
}
function Document({ children, title }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    'html',
    {
      lang: 'en',
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'head',
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                'meta',
                { charSet: 'utf-8' },
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 53,
                  columnNumber: 9,
                },
                this,
              ),
              title
                ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    'title',
                    { children: title },
                    void 0,
                    false,
                    {
                      fileName: 'app/root.tsx',
                      lineNumber: 54,
                      columnNumber: 18,
                    },
                    this,
                  )
                : null,
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Meta,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 55,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Links,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 56,
                  columnNumber: 9,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: 'app/root.tsx',
            lineNumber: 52,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'body',
          {
            children: [
              children,
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                ScrollRestoration,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 60,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Scripts,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 61,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                'script',
                {
                  defer: true,
                  src: 'https://static.cloudflareinsights.com/beacon.min.js',
                  'data-cf-beacon': '{"token": "4e2d2deea0954d71b1504d3ef9ce5613"}',
                },
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 62,
                  columnNumber: 9,
                },
                this,
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                LiveReload,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 67,
                  columnNumber: 55,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: 'app/root.tsx',
            lineNumber: 58,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/root.tsx',
      lineNumber: 51,
      columnNumber: 5,
    },
    this,
  );
}
function Layout({ children }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    'div',
    {
      className: 'flex flex-col min-h-screen',
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'header',
          {
            className: 'sticky top-0 p-5 bg-white border-b sm:px-10',
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              Link,
              {
                to: '/',
                title: 'Remix',
                className: 'remix-app__header-home-link',
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  RemixLogo,
                  {},
                  void 0,
                  false,
                  {
                    fileName: 'app/root.tsx',
                    lineNumber: 77,
                    columnNumber: 11,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName: 'app/root.tsx',
                lineNumber: 76,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName: 'app/root.tsx',
            lineNumber: 75,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'main',
          { className: 'flex-grow', children },
          void 0,
          false,
          {
            fileName: 'app/root.tsx',
            lineNumber: 80,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'footer',
          {
            className: 'p-5 sm:px-10',
            children: [
              'Wanna know more about Remix? Check out',
              ' ',
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                'a',
                {
                  className: 'underline',
                  href: 'https://remix.guide',
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  children: 'Remix Guide',
                },
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 83,
                  columnNumber: 9,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: 'app/root.tsx',
            lineNumber: 81,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/root.tsx',
      lineNumber: 74,
      columnNumber: 5,
    },
    this,
  );
}
function CatchBoundary() {
  const caught = useCatch();
  let message;
  switch (caught.status) {
    case 401:
      message = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        'p',
        { children: 'Oops! Looks like you tried to visit a page that you do not have access to.' },
        void 0,
        false,
        {
          fileName: 'app/root.tsx',
          lineNumber: 97,
          columnNumber: 17,
        },
        this,
      );
      break;
    case 404:
      message = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        'p',
        { children: 'Oops! Looks like you tried to visit a page that does not exist.' },
        void 0,
        false,
        {
          fileName: 'app/root.tsx',
          lineNumber: 100,
          columnNumber: 17,
        },
        this,
      );
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    Document,
    {
      title: `${caught.status} ${caught.statusText}`,
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Layout,
        {
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              'h1',
              { children: [caught.status, ': ', caught.statusText] },
              void 0,
              true,
              {
                fileName: 'app/root.tsx',
                lineNumber: 110,
                columnNumber: 9,
              },
              this,
            ),
            message,
          ],
        },
        void 0,
        true,
        {
          fileName: 'app/root.tsx',
          lineNumber: 109,
          columnNumber: 7,
        },
        this,
      ),
    },
    void 0,
    false,
    {
      fileName: 'app/root.tsx',
      lineNumber: 108,
      columnNumber: 5,
    },
    this,
  );
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    Document,
    {
      title: 'Error!',
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Layout,
        {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            'div',
            {
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  'h1',
                  { children: 'There was an error' },
                  void 0,
                  false,
                  {
                    fileName: 'app/root.tsx',
                    lineNumber: 125,
                    columnNumber: 11,
                  },
                  this,
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  'p',
                  { children: error.message },
                  void 0,
                  false,
                  {
                    fileName: 'app/root.tsx',
                    lineNumber: 126,
                    columnNumber: 11,
                  },
                  this,
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  'hr',
                  {},
                  void 0,
                  false,
                  {
                    fileName: 'app/root.tsx',
                    lineNumber: 127,
                    columnNumber: 11,
                  },
                  this,
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  'p',
                  { children: 'Hey, developer, you should replace this with what you want your users to see.' },
                  void 0,
                  false,
                  {
                    fileName: 'app/root.tsx',
                    lineNumber: 128,
                    columnNumber: 11,
                  },
                  this,
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: 'app/root.tsx',
              lineNumber: 124,
              columnNumber: 9,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName: 'app/root.tsx',
          lineNumber: 123,
          columnNumber: 7,
        },
        this,
      ),
    },
    void 0,
    false,
    {
      fileName: 'app/root.tsx',
      lineNumber: 122,
      columnNumber: 5,
    },
    this,
  );
}
function RemixLogo(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    'svg',
    {
      viewBox: '0 0 659 165',
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg',
      xmlnsXlink: 'http://www.w3.org/1999/xlink',
      'aria-labelledby': 'remix-run-logo-title',
      role: 'img',
      width: '106',
      height: '30',
      fill: 'currentColor',
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'title',
          { id: 'remix-run-logo-title', children: 'Remix Logo' },
          void 0,
          false,
          {
            fileName: 'app/root.tsx',
            lineNumber: 149,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'path',
          {
            d: 'M0 161V136H45.5416C53.1486 136 54.8003 141.638 54.8003 145V161H0Z M133.85 124.16C135.3 142.762 135.3 151.482 135.3 161H92.2283C92.2283 158.927 92.2653 157.03 92.3028 155.107C92.4195 149.128 92.5411 142.894 91.5717 130.304C90.2905 111.872 82.3473 107.776 67.7419 107.776H54.8021H0V74.24H69.7918C88.2407 74.24 97.4651 68.632 97.4651 53.784C97.4651 40.728 88.2407 32.816 69.7918 32.816H0V0H77.4788C119.245 0 140 19.712 140 51.2C140 74.752 125.395 90.112 105.665 92.672C122.32 96 132.057 105.472 133.85 124.16Z',
          },
          void 0,
          false,
          {
            fileName: 'app/root.tsx',
            lineNumber: 150,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'path',
          {
            d: 'M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z',
          },
          void 0,
          false,
          {
            fileName: 'app/root.tsx',
            lineNumber: 151,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'path',
          {
            d: 'M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z',
          },
          void 0,
          false,
          {
            fileName: 'app/root.tsx',
            lineNumber: 152,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'path',
          { d: 'M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z' },
          void 0,
          false,
          {
            fileName: 'app/root.tsx',
            lineNumber: 153,
            columnNumber: 7,
          },
          this,
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'path',
          {
            d: 'M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z',
          },
          void 0,
          false,
          {
            fileName: 'app/root.tsx',
            lineNumber: 154,
            columnNumber: 7,
          },
          this,
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/root.tsx',
      lineNumber: 137,
      columnNumber: 5,
    },
    this,
  );
}
export { CatchBoundary, ErrorBoundary, App as default, links, meta };
//# sourceMappingURL=/build/root-ATCUSXUX.js.map
