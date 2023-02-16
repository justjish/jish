var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let body = await renderToReadableStream(/* @__PURE__ */ jsxDEV(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
    fileName: "app/entry.server.tsx",
    lineNumber: 12,
    columnNumber: 45
  }, this), {
    onError: (error) => {
      responseStatusCode = 500, console.error(error);
    },
    signal: request.signal
  });
  isbot(request.headers.get("User-Agent")) && await body.allReady;
  let headers = new Headers(responseHeaders);
  return headers.set("Content-Type", "text/html"), new Response(body, {
    status: responseStatusCode,
    headers
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
import { json } from "@remix-run/server-runtime";
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from "@remix-run/react";

// app/styles/app.css
var app_default = "/build/_assets/app-MI2L2GQI.css";

// ../../node_modules/.pnpm/remix-image@1.4.0_a76pfqipttv5kdu2hrknwkvns4/node_modules/remix-image/remix-image.css
var remix_image_default = "/build/_assets/remix-image-VVD6GTZH.css";

// app/root.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: app_default },
  { rel: "stylesheet", href: remix_image_default }
], meta = () => ({
  viewport: "width=device-width, initial-scale=1"
}), loader = async ({ context }) => json({ date: new Date() });
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("title", { children: "Jish.Dev" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { className: "w-full h-full overflow-x-hidden bg-[rgba(21,16,25)] m-0 p-0 overflow-hidden;", children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 43,
        columnNumber: 55
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 39,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
}
function Document({ children, title }) {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this),
      title ? /* @__PURE__ */ jsxDEV2("title", { children: title }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 54,
        columnNumber: 18
      }, this) : null,
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      children,
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(
        "script",
        {
          defer: !0,
          src: "https://static.cloudflareinsights.com/beacon.min.js",
          "data-cf-beacon": '{"token": "4e2d2deea0954d71b1504d3ef9ce5613"}'
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 62,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 67,
        columnNumber: 55
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 51,
    columnNumber: 5
  }, this);
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxDEV2("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsxDEV2("header", { className: "sticky top-0 p-5 bg-white border-b sm:px-10", children: /* @__PURE__ */ jsxDEV2(Link, { to: "/", title: "Remix", className: "remix-app__header-home-link", children: /* @__PURE__ */ jsxDEV2(RemixLogo, {}, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 77,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 76,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("main", { className: "flex-grow", children }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 80,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("footer", { className: "p-5 sm:px-10", children: [
      "Wanna know more about Remix? Check out",
      " ",
      /* @__PURE__ */ jsxDEV2("a", { className: "underline", href: "https://remix.guide", target: "_blank", rel: "noopener noreferrer", children: "Remix Guide" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 74,
    columnNumber: 5
  }, this);
}
function CatchBoundary() {
  let caught = useCatch(), message;
  switch (caught.status) {
    case 401:
      message = /* @__PURE__ */ jsxDEV2("p", { children: "Oops! Looks like you tried to visit a page that you do not have access to." }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 97,
        columnNumber: 17
      }, this);
      break;
    case 404:
      message = /* @__PURE__ */ jsxDEV2("p", { children: "Oops! Looks like you tried to visit a page that does not exist." }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 100,
        columnNumber: 17
      }, this);
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }
  return /* @__PURE__ */ jsxDEV2(Document, { title: `${caught.status} ${caught.statusText}`, children: /* @__PURE__ */ jsxDEV2(Layout, { children: [
    /* @__PURE__ */ jsxDEV2("h1", { children: [
      caught.status,
      ": ",
      caught.statusText
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 110,
      columnNumber: 9
    }, this),
    message
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 109,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 108,
    columnNumber: 5
  }, this);
}
function ErrorBoundary({ error }) {
  return console.error(error), /* @__PURE__ */ jsxDEV2(Document, { title: "Error!", children: /* @__PURE__ */ jsxDEV2(Layout, { children: /* @__PURE__ */ jsxDEV2("div", { children: [
    /* @__PURE__ */ jsxDEV2("h1", { children: "There was an error" }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 125,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV2("p", { children: error.message }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 126,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV2("hr", {}, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 127,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV2("p", { children: "Hey, developer, you should replace this with what you want your users to see." }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 128,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 124,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 123,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 122,
    columnNumber: 5
  }, this);
}
function RemixLogo(props) {
  return /* @__PURE__ */ jsxDEV2(
    "svg",
    {
      viewBox: "0 0 659 165",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      "aria-labelledby": "remix-run-logo-title",
      role: "img",
      width: "106",
      height: "30",
      fill: "currentColor",
      ...props,
      children: [
        /* @__PURE__ */ jsxDEV2("title", { id: "remix-run-logo-title", children: "Remix Logo" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 149,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV2("path", { d: "M0 161V136H45.5416C53.1486 136 54.8003 141.638 54.8003 145V161H0Z M133.85 124.16C135.3 142.762 135.3 151.482 135.3 161H92.2283C92.2283 158.927 92.2653 157.03 92.3028 155.107C92.4195 149.128 92.5411 142.894 91.5717 130.304C90.2905 111.872 82.3473 107.776 67.7419 107.776H54.8021H0V74.24H69.7918C88.2407 74.24 97.4651 68.632 97.4651 53.784C97.4651 40.728 88.2407 32.816 69.7918 32.816H0V0H77.4788C119.245 0 140 19.712 140 51.2C140 74.752 125.395 90.112 105.665 92.672C122.32 96 132.057 105.472 133.85 124.16Z" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 150,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV2("path", { d: "M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 151,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV2("path", { d: "M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 152,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV2("path", { d: "M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 153,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV2("path", { d: "M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 154,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/root.tsx",
      lineNumber: 137,
      columnNumber: 5
    },
    this
  );
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  links: () => links2,
  loader: () => loader2,
  meta: () => meta2
});
import { json as json2 } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

// app/components/App.tsx
import { useScroll, useSpring as useSpring15 } from "@react-spring/web";

// app/hooks/useWindowHeightRef.ts
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@react-spring/web";

// app/utils/utils.ts
var isEven = (x) => x % 2 === 0;
var noop = () => ({}), isSSR = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);

// app/hooks/useWindowHeightRef.ts
var useWindowHeightRef = () => {
  let ref = useRef(1);
  return useIsomorphicLayoutEffect(() => {
    if (isSSR())
      return;
    let handleResize = () => {
      ref.current = window.innerHeight;
    };
    return handleResize(), window.addEventListener("resize", handleResize), () => window.removeEventListener("resize", handleResize);
  }, [ref]), ref;
};

// app/components/Menu.tsx
import { a as a2, config as config2, useSpring as useSpring3 } from "@react-spring/web";

// app/styles/legacy.ts
import { clsx } from "clsx";
var section = "box-border h-screen flex overflow-hidden items-center justify-center flex-col p-5", box = "bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[5px] border rounded-2xl border-solid border-[rgba(255,255,255,0.18)] py-2 px-4 text-center", h1 = "font-extrabold not-italic text-[4rem] leading-[0.7] text-[rgba(253,223,70,1)] font-acier", h2 = "not-italic text-[1.25rem] whitespace-nowrap text-[rgba(8,9,69,1)] font-vag", h3 = "font-extrabold not-italic uppercase text-[1.35rem] text-[rgba(136,200,255,1)] font-omnium", h4 = "font-bold not-italic font-sauna", h3Inline = "font-extrabold not-italic uppercase text-[2em] text-[yellow] inline font-omnium", row = "w-full flex flex-wrap justify-center items-center transition duration-75 ease-in-out ", grid = clsx(box, "grid grid-cols-[0.2fr_0.8fr] gap-[0.4rem]"), flex = clsx(box, "flex"), menuBox = "bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[5px] border fixed flex flex-row items-start justify-between max-w-[90%] h-16 w-[500px] m-auto rounded-2xl border-solid border-[rgba(255,255,255,0.18)] top-5 inset-x-0", menuItem = "bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[5px] border flex flex-col justify-center items-center text-center h-12 w-12 touch-none select-none m-auto rounded-2xl border-solid border-[rgba(255,255,255,0.18)]";

// app/components/MenuItem.tsx
import { useCallback } from "react";
import { a, useSpring as useSpring2 } from "@react-spring/web";

// app/hooks/useInteract.ts
import { useSpring, config } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
var useInteract = ({ onClick = () => ({}) }) => {
  let [interactStyles, api] = useSpring({ scale: 1, config: config.wobbly }, []);
  return { bind: useGesture({
    onMouseDown: () => interactStyles.scale.start(0.9),
    onMouseUp: async () => {
      onClick();
    },
    onHover: ({ hovering }) => hovering ? interactStyles.scale.start(1.1) : interactStyles.scale.start(1)
  }), interactStyles };
}, useInteract_default = useInteract;

// app/hooks/useMenu.tsx
import { createContext, useContext, useRef as useRef2 } from "react";
import { proxy, useSnapshot } from "valtio";
import { devtools } from "valtio/utils";
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var MenuContext = createContext(null), MenuProvider = ({ children }) => {
  let state = useRef2(
    proxy({
      click: 0,
      hello: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 0 },
      story: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 100 },
      brain: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 200 },
      lives: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 300 },
      learn: { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, absoluteTop: 400 },
      setClick: (to) => void (state.click = to),
      setHello: (bounds) => void (state.hello = bounds),
      setStory: (bounds) => void (state.story = bounds),
      setBrain: (bounds) => void (state.brain = bounds),
      setLives: (bounds) => void (state.lives = bounds),
      setLearn: (bounds) => void (state.learn = bounds)
    })
  ).current;
  return devtools(state, { name: "Menu" }), /* @__PURE__ */ jsxDEV3(MenuContext.Provider, { value: state, children }, void 0, !1, {
    fileName: "app/hooks/useMenu.tsx",
    lineNumber: 40,
    columnNumber: 10
  }, this);
}, useMenuState = () => {
  let state = useContext(MenuContext);
  if (!state)
    throw new Error("useMenu must be used within a MenuProvider");
  return state;
}, useMenuSnapshot = () => {
  let state = useMenuState();
  return useSnapshot(state);
};

// app/components/MenuItem.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var MenuItem = ({ icon = "", alt, lookup }) => {
  let { [lookup]: details } = useMenuSnapshot(), handleClick = useCallback(() => {
    window.scrollTo({ top: details.absoluteTop, left: 0, behavior: "smooth" });
  }, [details]), { height, width } = useSpring2({ height: "30px", width: "30px" }), { bind, interactStyles } = useInteract_default({ onClick: handleClick });
  return /* @__PURE__ */ jsxDEV4(a.div, { className: menuItem, ...bind(), style: { ...interactStyles }, children: /* @__PURE__ */ jsxDEV4(a.img, { height, width, src: icon, alt, draggable: "false" }, void 0, !1, {
    fileName: "app/components/MenuItem.tsx",
    lineNumber: 17,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/MenuItem.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
};

// app/assets/icons/hello.svg
var hello_default = "/build/_assets/hello-HOCVOZQR.svg";

// app/assets/icons/bag.svg
var bag_default = "/build/_assets/bag-345H75YI.svg";

// app/assets/icons/brain.svg
var brain_default = "/build/_assets/brain-TX3J3G2H.svg";

// app/assets/icons/lives.svg
var lives_default = "/build/_assets/lives-CN6AV754.svg";

// app/assets/icons/dots.svg
var dots_default = "/build/_assets/dots-EHXQPFOA.svg";

// app/data/MenuData.tsx
var items = [
  { lookup: "hello", icon: hello_default, alt: "Hello" },
  { lookup: "story", icon: bag_default, alt: "History" },
  { lookup: "brain", icon: brain_default, alt: "Skills" },
  { lookup: "lives", icon: lives_default, alt: "Location" },
  { lookup: "learn", icon: dots_default, alt: "Learn More" }
];

// app/components/Menu.tsx
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
import { createElement } from "react";
var Menu = () => {
  let [{ width }] = useSpring3(
    {
      from: { width: "38px" },
      to: { width: "500px" },
      config: config2.stiff
    },
    []
  );
  return /* @__PURE__ */ jsxDEV5(a2.div, { className: menuBox, style: { width }, children: items.map((props, index) => /* @__PURE__ */ createElement(MenuItem, { ...props, key: index })) }, void 0, !1, {
    fileName: "app/components/Menu.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}, Menu_default = Menu;

// app/components/Hello.tsx
import { useEffect, useRef as useRef3 } from "react";
import { a as a6, config as config3, useSpring as useSpring5 } from "@react-spring/web";
import useMeasure from "react-use-measure";

// ../../node_modules/.pnpm/react-merge-refs@2.0.1/node_modules/react-merge-refs/dist/index.mjs
function o(f) {
  return (r) => {
    f.forEach((n) => {
      typeof n == "function" ? n(r) : n != null && (n.current = r);
    });
  };
}

// app/components/HelloHeading.tsx
import { useCallback as useCallback2 } from "react";
import { a as a3 } from "@react-spring/web";
import { clsx as clsx2 } from "clsx";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var HelloHeading = ({ opacity, x }) => {
  let onClick = useCallback2(() => noop(), []), { bind, interactStyles } = useInteract_default({ onClick });
  return /* @__PURE__ */ jsxDEV6(a3.div, { ...bind(), style: interactStyles, children: [
    /* @__PURE__ */ jsxDEV6(a3.div, { className: clsx2(h3, "text-center text-[1.35rem] sm:text-[2rem] lg:text-[2.5rem] 2xl:text-[3rem]"), children: "Jish.Dev Presents" }, void 0, !1, {
      fileName: "app/components/HelloHeading.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6(
      a3.div,
      {
        className: clsx2(h1, "text-center text-[4rem] sm:text-[6rem] lg:text-[7rem] 2xl:text-[9rem]"),
        style: { opacity, x },
        children: "Sujish Patel"
      },
      void 0,
      !1,
      {
        fileName: "app/components/HelloHeading.tsx",
        lineNumber: 19,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV6(
      a3.div,
      {
        className: clsx2(h3, "text-center text-[1.35rem] sm:text-[2rem] lg:text-[2.5rem] 2xl:text-[3rem]"),
        style: { opacity, x },
        children: "A Full Stack Developer"
      },
      void 0,
      !1,
      {
        fileName: "app/components/HelloHeading.tsx",
        lineNumber: 25,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/HelloHeading.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
};

// app/components/HelloProfile.tsx
import { a as a4 } from "@react-spring/web";

// app/assets/pictures/fullbody.png
var fullbody_default = "/build/_assets/fullbody-IGJT6T66.png";

// app/components/HelloProfile.tsx
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var HelloProfile = ({ opacity, x }) => /* @__PURE__ */ jsxDEV7(
  a4.img,
  {
    className: "object-scale-down w-[120vw] sm:w-[90vw] lg:w-[50vw] 2xl:w-[40vw]",
    src: fullbody_default,
    alt: "sujish patel",
    style: { opacity, x }
  },
  void 0,
  !1,
  {
    fileName: "app/components/HelloProfile.tsx",
    lineNumber: 10,
    columnNumber: 5
  },
  this
);

// app/assets/icons/scrolldown.svg
var scrolldown_default = "/build/_assets/scrolldown-YVQ4IQF4.svg";

// app/hooks/useBouncing.ts
import { useSpring as useSpring4 } from "@react-spring/web";
var useBouncing = (range) => [useSpring4({
  loop: { reverse: !0 },
  from: { y: -range },
  to: { y: range },
  config: { mass: 1, tension: 50, friction: 0 }
})];

// app/components/HelloScrollDown.tsx
import { a as a5 } from "@react-spring/web";
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var HelloScrollDown = () => {
  let [{ y }] = useBouncing(2);
  return /* @__PURE__ */ jsxDEV8(a5.img, { className: "relative z-10 m-auto h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]", src: scrolldown_default, style: { y } }, void 0, !1, {
    fileName: "app/components/HelloScrollDown.tsx",
    lineNumber: 9,
    columnNumber: 5
  }, this);
};

// app/components/Hello.tsx
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
var Hello = ({ offset }) => {
  let [ref, bounds] = useMeasure(), localRef = useRef3(null), { setHello } = useMenuState();
  useEffect(() => {
    var _a;
    return setHello({ ...bounds, absoluteTop: ((_a = localRef.current) == null ? void 0 : _a.offsetTop) ?? 0 });
  }, [bounds, setHello]);
  let [{ x, scale, opacity, background }] = useSpring5(
    {
      to: [{ scale: 1, background: "rgba(73, 82, 109, .75)", opacity: 1, x: offset.to([0, 1], [0, 1e3]) }],
      from: {
        scale: 1.5,
        opacity: 0,
        background: "rgba(255, 70, 118, 1.00)",
        x: -500
      },
      config: config3.slow
    },
    []
  ), [{ y }] = useSpring5({ y: offset.to([0, 0.2], [200, 0]), config: config3.stiff }, []), [{ rotateX }] = useSpring5({ rotateX: y.to([0, 100], [0, 180]), config: config3.stiff, immediate: !0 }, []);
  return /* @__PURE__ */ jsxDEV9("div", { className: section, ref: o([ref, localRef]), children: [
    /* @__PURE__ */ jsxDEV9(a6.div, { className: box, style: { scale, y, background, zIndex: 2, position: "absolute", rotateX }, children: [
      /* @__PURE__ */ jsxDEV9(HelloHeading, { opacity, x }, void 0, !1, {
        fileName: "app/components/Hello.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9(HelloScrollDown, {}, void 0, !1, {
        fileName: "app/components/Hello.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Hello.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9(HelloProfile, { opacity, x }, void 0, !1, {
      fileName: "app/components/Hello.tsx",
      lineNumber: 53,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Hello.tsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}, Hello_default = Hello;

// app/components/Story.tsx
import { useRef as useRef7, useEffect as useEffect4, useMemo as useMemo2 } from "react";
import useMeasure3 from "react-use-measure";

// app/assets/logos/ellipsishealth.svg
var ellipsishealth_default = "/build/_assets/ellipsishealth-HV53G6HV.svg";

// app/assets/logos/elementus.svg
var elementus_default = "/build/_assets/elementus-P4WXH3JQ.svg";

// app/assets/logos/netsmart.svg
var netsmart_default = "/build/_assets/netsmart-6BOVE6TC.svg";

// app/assets/logos/rutgers.svg
var rutgers_default = "/build/_assets/rutgers-D2RKXIB4.svg";

// app/assets/logos/erre.svg
var erre_default = "/build/_assets/erre-JMHJLBRO.svg";

// app/data/StoryData.tsx
var StoryData = [
  {
    logo: ellipsishealth_default,
    focus: "Principal Software Engineer",
    time: "2021 - 2023",
    color: "rgba(58, 186, 182, 1.00)",
    speed: 1,
    includePlus: !0
  },
  {
    logo: elementus_default,
    focus: "Full Stack Developer",
    time: "2020",
    color: "rgba(121, 61, 251, 1.00)",
    speed: 2,
    includePlus: !0
  },
  {
    logo: netsmart_default,
    focus: "Software Engineer",
    time: "2016 - 2018",
    color: "rgba(44, 79, 120, 1.00)",
    speed: 3,
    includePlus: !0
  },
  {
    logo: rutgers_default,
    focus: "B.A. Computer Science",
    time: "2016",
    color: "rgba(225, 26, 55, 1.00)",
    speed: 4,
    includePlus: !0
  },
  {
    logo: erre_default,
    focus: "Head of IT and Marketing",
    time: "2011-2016",
    color: "rgba(60, 132, 86, 1.00)",
    speed: 5,
    includePlus: !1
  }
], StoryData_default = StoryData;

// app/components/StoryPlace.tsx
import { useEffect as useEffect3, useMemo } from "react";
import { a as a7, config as config4, useSpring as useSpring6 } from "@react-spring/web";

// app/hooks/useMeasurementCapture.ts
import { useRef as useRef4, useState, useEffect as useEffect2 } from "react";
import useMeasure2 from "react-use-measure";
var useMeasurementCapture = ({ preventCapture } = { preventCapture: [() => !0, []] }) => {
  let [{ originalHeight, originalWidth, isReady }, set] = useState({ originalHeight: null, originalWidth: null, isReady: !1 }), [[cancelCapture, deps], updatePreventChange] = useState(preventCapture), [measureRef, bounds] = useMeasure2({ debounce: 200 }), localRef = useRef4(null);
  return useEffect2(() => {
    !localRef.current || originalHeight !== null || originalWidth !== null || !bounds.height || !bounds.width || cancelCapture() || set({ originalHeight: bounds.height, originalWidth: bounds.width, isReady: !0 });
  }, [localRef.current, bounds, originalHeight, originalWidth, ...deps]), [o([measureRef, localRef]), { originalHeight, originalWidth, isReady }, updatePreventChange];
};

// app/components/StoryPlace.tsx
import { clsx as clsx3 } from "clsx";
import { useCallback as useCallback3 } from "react";

// app/hooks/useStory.tsx
import { createContext as createContext2, useContext as useContext2, useRef as useRef5 } from "react";
import { proxy as proxy2, useSnapshot as useSnapshot2 } from "valtio";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var StoryContext = createContext2(null), StoryProvider = ({ children }) => {
  let state = useRef5(proxy2({ selected: null })).current;
  return /* @__PURE__ */ jsxDEV10(StoryContext.Provider, { value: state, children }, void 0, !1, {
    fileName: "app/hooks/useStory.tsx",
    lineNumber: 8,
    columnNumber: 10
  }, this);
}, useStoryState = () => {
  let state = useContext2(StoryContext);
  if (!state)
    throw new Error("useStory must be used within a StoryProvider");
  return state;
}, useStorySnapshot = () => {
  let state = useStoryState();
  return useSnapshot2(state);
};

// app/components/StoryPlace.tsx
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
var StoryPlace = ({ id, offset, logo, focus, time, speed }) => {
  let state = useStoryState(), snap = useStorySnapshot(), onSelect = useCallback3(
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
    [state, snap]
  ), {
    bind,
    interactStyles: { scale }
  } = useInteract_default({ onClick: () => onSelect(id) }), [ref, { originalHeight, originalWidth, isReady }] = useMeasurementCapture({
    preventCapture: [() => scale.get() !== 1, [scale]]
  }), [{ x }] = useSpring6(() => ({
    x: offset.to([1, 0], [0, 1e3]),
    config: { mass: 50 / 15, tension: 100 - 15 * speed, friction: 26 }
  })), { skewX } = useSpring6({
    skewX: x.to([0, 100], [0, 1]),
    config: config4.molasses,
    immediate: !0
  }), original = useMemo(
    () => isReady ? {
      height: originalHeight,
      width: originalWidth,
      zIndex: 1,
      config: config4.slow,
      x,
      y: 0,
      display: "block",
      scale,
      skewX,
      opacity: 1
    } : {},
    [isReady, originalHeight, originalWidth, x, scale, skewX]
  ), expanded = useMemo(() => isReady ? {
    height: window.innerHeight * 0.75,
    width: window.innerWidth * 0.75,
    opacity: 1,
    zIndex: 999,
    config: config4.slow,
    scale,
    display: "block",
    skewX
  } : {}, [originalWidth, originalHeight, isReady, skewX, scale]), removed = useMemo(
    () => ({
      opacity: 0,
      scale: 0,
      y: 0
    }),
    []
  ), [card, api] = useSpring6(() => original, [original]);
  return useEffect3(() => {
    if (!!isReady)
      switch (snap.selected) {
        case null:
          api.start(original);
          return;
        case id:
          api.start(expanded);
          return;
        default:
          api.start(removed), card.display.set("none");
          return;
      }
  }, [originalHeight, originalWidth, snap, id, x, api, scale, card]), /* @__PURE__ */ jsxDEV11(a7.div, { ref, className: clsx3(box, "m-3"), ...bind(), style: { ...card }, children: [
    /* @__PURE__ */ jsxDEV11("img", { className: "object-contain h-[50px] m-auto", src: logo, alt: "company" }, void 0, !1, {
      fileName: "app/components/StoryPlace.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11("div", { className: h2, children: focus }, void 0, !1, {
      fileName: "app/components/StoryPlace.tsx",
      lineNumber: 116,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11("div", { className: h2, children: time }, void 0, !1, {
      fileName: "app/components/StoryPlace.tsx",
      lineNumber: 117,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/StoryPlace.tsx",
    lineNumber: 114,
    columnNumber: 5
  }, this);
};

// app/components/StoryYears.tsx
import { animated as a8, useSpring as useSpring7 } from "@react-spring/web";
import { clsx as clsx4 } from "clsx";
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
var StoryYears = ({ offset }) => {
  let [{ x }] = useSpring7(
    {
      x: offset.to([1, 0], [0, 1e3]),
      config: { mass: 3.3333333333333335, tension: 25, friction: 26 }
    },
    []
  ), { bind, interactStyles } = useInteract_default({ onClick: noop });
  return /* @__PURE__ */ jsxDEV12(a8.div, { className: clsx4(box, "w-[350px]"), ...bind(), style: { ...interactStyles, x }, children: [
    /* @__PURE__ */ jsxDEV12("div", { className: h2, children: "Years Coding" }, void 0, !1, {
      fileName: "app/components/StoryYears.tsx",
      lineNumber: 18,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV12("div", { className: clsx4(h1, "text-[8em]"), children: "10+" }, void 0, !1, {
      fileName: "app/components/StoryYears.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/StoryYears.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
};

// app/components/StoryHeading.tsx
import { a as a9, useSpring as useSpring8, config as config5 } from "@react-spring/web";
import { clsx as clsx5 } from "clsx";
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
var StoryHeading = ({ offset }) => {
  let snapshot = useStorySnapshot(), [{ scale, y }] = useSpring8(
    snapshot.selected === null ? {
      scale: offset.to([0, 1], [2, 1]),
      y: offset.to([0, 1], [0, 200]),
      from: { scale: 10, y: 0 }
    } : {
      scale: 0,
      y: 500,
      config: config5.slow
    },
    [snapshot, offset]
  );
  return /* @__PURE__ */ jsxDEV13(
    a9.div,
    {
      className: clsx5(h3, "z-[1] absolute text-[2rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]"),
      style: { scale, y },
      children: [
        "with",
        /* @__PURE__ */ jsxDEV13("div", { className: h3Inline, children: "Years" }, void 0, !1, {
          fileName: "app/components/StoryHeading.tsx",
          lineNumber: 30,
          columnNumber: 7
        }, this),
        " of Experience"
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/StoryHeading.tsx",
      lineNumber: 25,
      columnNumber: 5
    },
    this
  );
};

// app/components/StoryBackground.tsx
import { a as a10, useSpring as useSpring9 } from "@react-spring/web";
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
var StoryBackground = ({ offset }) => {
  let [{ r }] = useSpring9(
    {
      r: offset.to({ range: [0, 1], output: [0, 100] }),
      from: { r: 0 },
      config: { mass: 3.3333333333333335, tension: 50, friction: 26 }
    },
    []
  );
  return /* @__PURE__ */ jsxDEV14("svg", { width: "100%", height: "100%", viewBox: "0 0 100 100", className: "z-[-1] absolute", children: [
    /* @__PURE__ */ jsxDEV14(a10.circle, { cx: "-50%", cy: "50%", r, fill: "rgba(8, 9, 69, 1.00)", className: "mix-blend-screen" }, void 0, !1, {
      fileName: "app/components/StoryBackground.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV14(a10.circle, { className: "mix-blend-screen", cx: "100%", cy: "50%", r, fill: "rgba(4, 40, 110, 1.00)" }, void 0, !1, {
      fileName: "app/components/StoryBackground.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/StoryBackground.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
};

// app/components/Story.tsx
import { jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
var Story = ({ data = StoryData_default, offset }) => {
  let [ref, bounds] = useMeasure3({ debounce: 200 }), localRef = useRef7(null), { setStory } = useMenuState();
  useEffect4(() => {
    var _a;
    return setStory({ ...bounds, absoluteTop: ((_a = localRef.current) == null ? void 0 : _a.offsetTop) ?? 100 });
  }, [bounds, setStory]);
  let Places = useMemo2(
    () => data.map((props, i) => /* @__PURE__ */ jsxDEV15(StoryPlace, { offset, id: i, ...props }, i, !1, {
      fileName: "app/components/Story.tsx",
      lineNumber: 19,
      columnNumber: 34
    }, this)),
    [offset]
  );
  return /* @__PURE__ */ jsxDEV15("div", { className: section, ref: o([ref, localRef]), children: [
    /* @__PURE__ */ jsxDEV15("div", { className: row, children: [
      /* @__PURE__ */ jsxDEV15(StoryBackground, { offset }, void 0, !1, {
        fileName: "app/components/Story.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      Places,
      /* @__PURE__ */ jsxDEV15(StoryYears, { offset }, void 0, !1, {
        fileName: "app/components/Story.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Story.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15(StoryHeading, { offset }, void 0, !1, {
      fileName: "app/components/Story.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Story.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}, Story_default = Story;

// app/components/Brain.tsx
import { useRef as useRef8, useEffect as useEffect5, useMemo as useMemo3 } from "react";

// app/data/BrainData.tsx
import { FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiAmazon,
  SiDeno,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiGithub,
  SiGooglecloud,
  SiJava,
  SiJavascript,
  SiMongodb,
  SiPython,
  SiRedux,
  SiTerraform,
  SiTypescript
} from "react-icons/si";
import { AiOutlineFunction } from "react-icons/ai";
import { MdHttp } from "react-icons/md";
import { GrNodes } from "react-icons/gr";
var BrainData = [
  { idx: 1, size: 75 /* lg */, type: "Library" /* library */, desc: "React", Icon: FaReact },
  { idx: 2, size: 75 /* lg */, type: "Runtime" /* runtime */, desc: "Node", Icon: FaNodeJs },
  { idx: 3, size: 75 /* lg */, type: "Language" /* language */, desc: "Javascript", Icon: SiJavascript },
  { idx: 4, size: 75 /* lg */, type: "Language" /* language */, desc: "Typescript", Icon: SiTypescript },
  { idx: 5, size: 50 /* md */, type: "Paradigm" /* paradigm */, desc: "Function(al)(Programming)", Icon: AiOutlineFunction },
  { idx: 6, size: 25 /* sm */, type: "Frontend" /* frontend */, desc: "Redux", Icon: SiRedux },
  { idx: 7, size: 25 /* sm */, type: "Language" /* language */, desc: "Java", Icon: SiJava },
  { idx: 8, size: 50 /* md */, type: "Language" /* language */, desc: "Python", Icon: SiPython },
  { idx: 9, size: 25 /* sm */, type: "cloud" /* cloud */, desc: "AWS", Icon: SiAmazon },
  { idx: 10, size: 75 /* lg */, type: "cloud" /* cloud */, desc: "Google Cloud", Icon: SiGooglecloud },
  { idx: 11, size: 25 /* sm */, desc: "Deno", type: "Runtime" /* runtime */, Icon: SiDeno },
  { idx: 12, size: 25 /* sm */, desc: "Flutter", type: "framework" /* framework */, Icon: SiFlutter },
  { idx: 13, size: 25 /* sm */, type: "common" /* common */, desc: "Github", Icon: SiGithub },
  { idx: 14, size: 25 /* sm */, type: "DevOps" /* devops */, desc: "Terraform", Icon: SiTerraform },
  { idx: 15, size: 25 /* sm */, type: "protocol" /* protocol */, desc: "HTTP/3", Icon: MdHttp },
  { idx: 16, size: 50 /* md */, type: "database" /* database */, desc: "Firebase", Icon: SiFirebase },
  { idx: 17, size: 50 /* md */, type: "database" /* database */, desc: "MongoDB + Atlas", Icon: SiMongodb },
  { idx: 18, size: 75 /* lg */, type: "DevOps" /* devops */, desc: "Docker", Icon: SiDocker },
  { idx: 19, size: 50 /* md */, type: "concept" /* concept */, desc: "Graph Theory", Icon: GrNodes },
  { idx: 20, size: 75 /* lg */, type: "Library" /* library */, desc: "React Hooks" },
  { idx: 21, size: 75 /* lg */, type: "Library" /* library */, desc: "Webpack" },
  { idx: 22, size: 75 /* lg */, type: "Library" /* library */, desc: "Rollup" },
  { idx: 23, size: 75 /* lg */, type: "Frontend" /* frontend */, desc: "Snowpack" },
  { idx: 24, size: 75 /* lg */, type: "Frontend" /* frontend */, desc: "Vite.js" },
  { idx: 25, size: 75 /* lg */, type: "Frontend" /* frontend */, desc: "Parcel" },
  { idx: 27, size: 50 /* md */, type: "concept" /* concept */, desc: "CI/CD" },
  { idx: 28, size: 75 /* lg */, type: "Language" /* language */, desc: "C" },
  { idx: 30, size: 25 /* sm */, type: "Language" /* language */, desc: "LaTeX" },
  { idx: 31, size: 25 /* sm */, type: "Language" /* language */, desc: "Prolog" },
  { idx: 32, size: 25 /* sm */, type: "Language" /* language */, desc: "MUMPS" },
  { idx: 33, size: 25 /* sm */, type: "Language" /* language */, desc: "LISP" },
  { idx: 34, size: 25 /* sm */, type: "Language" /* language */, desc: "Scheme" },
  { idx: 35, size: 25 /* sm */, type: "Language" /* language */, desc: "Objectscript" },
  { idx: 36, size: 50 /* md */, type: "Library" /* library */, desc: "Express" },
  { idx: 37, size: 25 /* sm */, type: "Library" /* library */, desc: "Angular 1" },
  { idx: 40, size: 50 /* md */, type: "Frontend" /* frontend */, desc: "Android" },
  { idx: 43, size: 50 /* md */, type: "concept" /* concept */, desc: "OO extends P" },
  { idx: 44, size: 50 /* md */, type: "concept" /* concept */, desc: "Data Modeling" },
  { idx: 46, size: 25 /* sm */, type: "concept" /* concept */, desc: "Agile" },
  { idx: 47, size: 25 /* sm */, type: "concept" /* concept */, desc: "TDD" },
  { idx: 48, size: 25 /* sm */, type: "concept" /* concept */, desc: "Mentor" },
  { idx: 51, size: 75 /* lg */, type: "concept" /* concept */, desc: "NoSQL Databases" },
  { idx: 52, size: 25 /* sm */, type: "concept" /* concept */, desc: "SQL" },
  { idx: 53, size: 25 /* sm */, type: "DevOps" /* devops */, desc: "Postgres" },
  { idx: 54, size: 25 /* sm */, type: "DevOps" /* devops */, desc: "MySQL" },
  { idx: 55, size: 25 /* sm */, type: "concept" /* concept */, desc: "Publish and Subscribe" },
  { idx: 56, size: 25 /* sm */, type: "concept" /* concept */, desc: "Unit Tests" },
  { idx: 57, size: 25 /* sm */, type: "DevOps" /* devops */, desc: "A/B Testing" },
  { idx: 58, size: 25 /* sm */, type: "concept" /* concept */, desc: "Internet of Things (IOT)" },
  { idx: 59, size: 75 /* lg */, type: "concept" /* concept */, desc: "Microservices" },
  { idx: 60, size: 25 /* sm */, type: "DevOps" /* devops */, desc: "Git" },
  { idx: 61, size: 25 /* sm */, type: "DevOps" /* devops */, desc: "SVN" },
  { idx: 62, size: 25 /* sm */, type: "concept" /* concept */, desc: "Machine Learning" },
  { idx: 63, size: 50 /* md */, type: "concept" /* concept */, desc: "Web Crawling" },
  { idx: 64, size: 25 /* sm */, type: "Team" /* team */, desc: "Project Management" },
  { idx: 65, size: 25 /* sm */, type: "Hardware" /* hardware */, desc: "Raspberry Pi " }
];

// app/components/Brain.tsx
import useMeasure4 from "react-use-measure";

// app/components/BrainSkill.tsx
import { a as a11, useSpring as useSpring10 } from "@react-spring/web";
import randomColor from "randomcolor";
import { clsx as clsx6 } from "clsx";
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
var BrainSkill = ({
  Icon = null,
  idx,
  size,
  type: type2,
  desc,
  offset
}) => {
  let [{ y, color }] = useSpring10(
    {
      y: offset.to([0, 2, 2.75], [5e3, 0, -1e3]),
      from: { y: 5e3, color: randomColor({ seed: type2, luminosity: "bright", alpha: 0.5 }) },
      config: {
        mass: (100 - size + (isEven(idx) ? -idx : idx)) / 25,
        tension: 50,
        friction: 25
      }
    },
    []
  );
  return /* @__PURE__ */ jsxDEV16(a11.div, { className: clsx6(Icon ? grid : flex), style: { y, color }, children: [
    Icon && /* @__PURE__ */ jsxDEV16(Icon, { className: "m-auto", title: desc, style: { height: `${size}px`, width: `${size}px` } }, void 0, !1, {
      fileName: "app/components/BrainSkill.tsx",
      lineNumber: 33,
      columnNumber: 16
    }, this),
    /* @__PURE__ */ jsxDEV16(
      "div",
      {
        className: "font-medium not-italic uppercase font-futura m-auto",
        style: { fontSize: `${50 * size / 100}px` },
        children: desc
      },
      void 0,
      !1,
      {
        fileName: "app/components/BrainSkill.tsx",
        lineNumber: 34,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/BrainSkill.tsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
};

// app/components/BrainHeading.tsx
import { useSpring as useSpring11, a as a12 } from "@react-spring/web";
import { clsx as clsx7 } from "clsx";
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
var BrainHeading = ({ offset }) => {
  let { scale } = useSpring11({ scale: offset.to([1, 2], [2, 1]), from: { scale: 1 } });
  return /* @__PURE__ */ jsxDEV17(a12.div, { className: clsx7(h3, "text-[2rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]"), style: { scale }, children: [
    "an ",
    /* @__PURE__ */ jsxDEV17(a12.div, { className: h3Inline, children: "EXPANSIVE " }, void 0, !1, {
      fileName: "app/components/BrainHeading.tsx",
      lineNumber: 13,
      columnNumber: 10
    }, this),
    "skillset"
  ] }, void 0, !0, {
    fileName: "app/components/BrainHeading.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
};

// app/components/Brain.tsx
import { clsx as clsx8 } from "clsx";
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
var Brain = ({ data = BrainData, offset }) => {
  let [ref, bounds] = useMeasure4({ debounce: 200 }), localRef = useRef8(null), { setBrain } = useMenuState();
  useEffect5(() => {
    var _a;
    return setBrain({ ...bounds, absoluteTop: ((_a = localRef.current) == null ? void 0 : _a.offsetTop) ?? 200 });
  }, [bounds, setBrain]);
  let Skills = useMemo3(() => data.map((o2, index) => /* @__PURE__ */ jsxDEV18(BrainSkill, { offset, ...o2 }, index, !1, {
    fileName: "app/components/Brain.tsx",
    lineNumber: 23,
    columnNumber: 55
  }, this)), []);
  return /* @__PURE__ */ jsxDEV18("div", { className: section, ref: o([localRef, ref]), children: [
    /* @__PURE__ */ jsxDEV18("div", { className: clsx8(row, "absolute h-screen overflow-hidden gap-2"), children: [
      ...Skills
    ] }, void 0, !0, {
      fileName: "app/components/Brain.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV18(BrainHeading, { offset }, void 0, !1, {
      fileName: "app/components/Brain.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Brain.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}, Brain_default = Brain;

// app/components/Lives.tsx
import { useRef as useRef9, useEffect as useEffect6 } from "react";
import { useSpring as useSpring13, config as config6 } from "@react-spring/web";
import useMeasure5 from "react-use-measure";

// app/components/LivesHeading.tsx
import { useSpring as useSpring12, a as a13 } from "@react-spring/web";
import { clsx as clsx9 } from "clsx";
import { jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
var LivesHeading = ({ offset }) => {
  let { scale, y } = useSpring12({
    scale: offset.to([2, 3], [2, 1]),
    y: offset.to([0, 1], [0, 1]),
    from: { scale: 10, y: 0 }
  });
  return /* @__PURE__ */ jsxDEV19(
    a13.div,
    {
      className: clsx9(h3, "absolute text-[2rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]"),
      style: { scale, y },
      children: [
        "Based In ",
        /* @__PURE__ */ jsxDEV19("div", { className: h3Inline, children: "NYC" }, void 0, !1, {
          fileName: "app/components/LivesHeading.tsx",
          lineNumber: 18,
          columnNumber: 16
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/LivesHeading.tsx",
      lineNumber: 14,
      columnNumber: 5
    },
    this
  );
};

// app/components/LivesBackground.tsx
import { a as a14 } from "@react-spring/web";

// app/assets/graphics/cityFrameCircle.svg
var cityFrameCircle_default = "/build/_assets/cityFrameCircle-Y45X5PVZ.svg";

// app/components/LivesBackground.tsx
import { jsxDEV as jsxDEV20 } from "react/jsx-dev-runtime";
var LivesBackground = ({ scale, y }) => /* @__PURE__ */ jsxDEV20("div", { className: row, children: /* @__PURE__ */ jsxDEV20(a14.img, { className: "w-screen relative", style: { scale, y }, src: cityFrameCircle_default }, void 0, !1, {
  fileName: "app/components/LivesBackground.tsx",
  lineNumber: 8,
  columnNumber: 5
}, this) }, void 0, !1, {
  fileName: "app/components/LivesBackground.tsx",
  lineNumber: 7,
  columnNumber: 3
}, this);

// app/components/Lives.tsx
import { jsxDEV as jsxDEV21 } from "react/jsx-dev-runtime";
var Lives = ({ offset }) => {
  let [ref, bounds] = useMeasure5(), localRef = useRef9(null), { setLives } = useMenuState();
  useEffect6(() => {
    var _a;
    return setLives({ ...bounds, absoluteTop: ((_a = localRef.current) == null ? void 0 : _a.offsetTop) ?? 300 });
  }, [bounds, setLives]);
  let [{ scale }] = useSpring13(
    { scale: offset.to({ range: [2, 4], output: [3, 1], extrapolate: "clamp" }), config: config6.molasses },
    []
  ), [{ y }] = useSpring13(
    {
      y: offset.to({ range: [2.5, 3.5], output: [-bounds.height, bounds.height], extrapolate: "clamp" }),
      config: config6.slow
    },
    [bounds.height]
  );
  return /* @__PURE__ */ jsxDEV21("div", { className: section, ref: o([localRef, ref]), children: [
    /* @__PURE__ */ jsxDEV21(LivesBackground, { scale, y }, void 0, !1, {
      fileName: "app/components/Lives.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV21(LivesHeading, { offset }, void 0, !1, {
      fileName: "app/components/Lives.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Lives.tsx",
    lineNumber: 28,
    columnNumber: 5
  }, this);
}, Lives_default = Lives;

// app/components/Learn.tsx
import { useRef as useRef10, useEffect as useEffect7, useMemo as useMemo4 } from "react";
import { a as a17, useSpring as useSpring14, config as config7 } from "@react-spring/web";
import useMeasure6 from "react-use-measure";

// app/components/LearnHeading.tsx
import { a as a15 } from "@react-spring/web";
import { clsx as clsx10 } from "clsx";
import { jsxDEV as jsxDEV22 } from "react/jsx-dev-runtime";
var LearnHeading = () => /* @__PURE__ */ jsxDEV22(a15.div, { className: clsx10(h3, "text-[1rem] sm:text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem]"), children: [
  "More",
  /* @__PURE__ */ jsxDEV22("div", { className: h3Inline, children: " Coming " }, void 0, !1, {
    fileName: "app/components/LearnHeading.tsx",
    lineNumber: 8,
    columnNumber: 11
  }, this),
  "Soon!"
] }, void 0, !0, {
  fileName: "app/components/LearnHeading.tsx",
  lineNumber: 7,
  columnNumber: 5
}, this);

// app/components/LearnMessage.tsx
import { clsx as clsx11 } from "clsx";
import { jsxDEV as jsxDEV23 } from "react/jsx-dev-runtime";
var LearnMessage = () => /* @__PURE__ */ jsxDEV23("div", { className: clsx11(h4, "text-white text-[2rem] pb-10"), children: "In the meantime ..." }, void 0, !1, {
  fileName: "app/components/LearnMessage.tsx",
  lineNumber: 6,
  columnNumber: 3
}, this);

// app/components/LearnExternal.tsx
import { a as a16 } from "@react-spring/web";
import { clsx as clsx12 } from "clsx";
import { jsxDEV as jsxDEV24 } from "react/jsx-dev-runtime";
var LearnExternal = ({ Icon, message, link, download = !1 }) => {
  let { bind, interactStyles } = useInteract_default({ onClick: () => ({}) });
  return /* @__PURE__ */ jsxDEV24(
    a16.a,
    {
      ...bind(),
      href: link,
      className: clsx12(box, "no-underline text-[white]"),
      style: { ...interactStyles },
      download,
      target: "_blank",
      rel: "noopener",
      children: /* @__PURE__ */ jsxDEV24(
        a16.div,
        {
          className: clsx12(h4, "no-underline text-[white] text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] 2xl:text-[3rem]"),
          children: [
            /* @__PURE__ */ jsxDEV24(Icon, { className: "m-auto align-middle" }, void 0, !1, {
              fileName: "app/components/LearnExternal.tsx",
              lineNumber: 29,
              columnNumber: 9
            }, this),
            " ",
            /* @__PURE__ */ jsxDEV24("div", { className: clsx12(h4, "text-[0.5em]"), children: message }, void 0, !1, {
              fileName: "app/components/LearnExternal.tsx",
              lineNumber: 29,
              columnNumber: 50
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/LearnExternal.tsx",
          lineNumber: 26,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/components/LearnExternal.tsx",
      lineNumber: 17,
      columnNumber: 5
    },
    this
  );
};

// app/data/LearnData.ts
import { AiFillGithub, AiFillFacebook, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
var externalData = [
  {
    Icon: AiFillGithub,
    message: "See the code",
    handle: "sujishpatel",
    link: "https://github.com/sujishpatel/jish-dev",
    download: !1
  },
  {
    Icon: MdEmail,
    message: "Send a message",
    handle: "justjish@gmail.com",
    link: "mailto:justjish@gmail.com?subject=Just saw your site",
    download: !1
  },
  {
    Icon: HiOutlineDocumentDownload,
    message: "Get the resume",
    handle: "naw",
    link: "/Resume_Sujish_Patel_02-2023.pdf",
    download: !0
  },
  {
    Icon: AiFillInstagram,
    message: "View some grams",
    handle: "justjish",
    link: "https://www.instagram.com/justjish/",
    download: !1
  },
  {
    Icon: AiFillLinkedin,
    message: "Connect with me",
    handle: "naw",
    link: "https://www.linkedin.com/in/sujishpatel/",
    download: !1
  },
  {
    Icon: AiFillFacebook,
    message: "See a timeline",
    handle: "naw",
    link: "https://www.facebook.com/justjish",
    download: !1
  }
];

// app/components/Learn.tsx
import { clsx as clsx13 } from "clsx";
import { jsxDEV as jsxDEV25 } from "react/jsx-dev-runtime";
import { createElement as createElement2 } from "react";
var Learn = ({ offset }) => {
  let [ref, bounds] = useMeasure6(), localRef = useRef10(null), { setLearn } = useMenuState();
  useEffect7(() => {
    var _a;
    return setLearn({ ...bounds, absoluteTop: ((_a = localRef.current) == null ? void 0 : _a.offsetTop) ?? 400 });
  }, [bounds, setLearn]);
  let [{ opacity, scale, y }] = useSpring14(
    {
      opacity: offset.to([1.5, 4], [0, 1]),
      scale: offset.to([2.5, 4], [0.5, 1]),
      y: offset.to([3, 4], [-600, 0]),
      config: config7.default
    },
    []
  ), ExternalLinks = useMemo4(() => externalData.map((props, i) => /* @__PURE__ */ createElement2(LearnExternal, { ...props, key: i })), []);
  return /* @__PURE__ */ jsxDEV25("div", { className: section, ref: o([localRef, ref]), children: /* @__PURE__ */ jsxDEV25(a17.div, { className: clsx13(box, "overflow-hidden"), style: { opacity, scale, y }, children: [
    /* @__PURE__ */ jsxDEV25(LearnHeading, {}, void 0, !1, {
      fileName: "app/components/Learn.tsx",
      lineNumber: 35,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV25(LearnMessage, {}, void 0, !1, {
      fileName: "app/components/Learn.tsx",
      lineNumber: 36,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV25("div", { className: "grid grid-cols-[repeat(3,1fr)] gap-5", children: [
      " ",
      ...ExternalLinks,
      " "
    ] }, void 0, !0, {
      fileName: "app/components/Learn.tsx",
      lineNumber: 37,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Learn.tsx",
    lineNumber: 34,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/Learn.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, this);
}, Learn_default = Learn;

// app/components/App.tsx
import { jsxDEV as jsxDEV26 } from "react/jsx-dev-runtime";
var App2 = () => {
  let heightRef = useWindowHeightRef(), scrollPos = useScroll({}), [{ offset }] = useSpring15({ offset: scrollPos.scrollY.to((v) => v / heightRef.current) }, [scrollPos]);
  return /* @__PURE__ */ jsxDEV26(MenuProvider, { children: /* @__PURE__ */ jsxDEV26("div", { className: "absolute w-screen h-[500vh] overflow-x-hidden m-0 p-0", children: [
    /* @__PURE__ */ jsxDEV26(Hello_default, { offset }, void 0, !1, {
      fileName: "app/components/App.tsx",
      lineNumber: 55,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV26(StoryProvider, { children: /* @__PURE__ */ jsxDEV26(Story_default, { offset }, void 0, !1, {
      fileName: "app/components/App.tsx",
      lineNumber: 57,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/App.tsx",
      lineNumber: 56,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV26(Brain_default, { offset }, void 0, !1, {
      fileName: "app/components/App.tsx",
      lineNumber: 59,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV26(Lives_default, { offset }, void 0, !1, {
      fileName: "app/components/App.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV26(Learn_default, { offset }, void 0, !1, {
      fileName: "app/components/App.tsx",
      lineNumber: 61,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV26(Menu_default, {}, void 0, !1, {
      fileName: "app/components/App.tsx",
      lineNumber: 62,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/App.tsx",
    lineNumber: 54,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/App.tsx",
    lineNumber: 53,
    columnNumber: 5
  }, this);
}, App_default = App2;

// app/routes/_index.tsx
import { jsxDEV as jsxDEV27 } from "react/jsx-dev-runtime";
var meta2 = () => ({
  title: "jish.dev",
  description: "All-in-one remix starter template for Cloudflare Workers"
}), links2 = () => [], loader2 = async ({ request, context }) => {
  let { ...args } = context;
  return json2({
    title: "remix-worker-template"
  });
};
function Index() {
  let { title } = useLoaderData();
  return /* @__PURE__ */ jsxDEV27(App_default, {}, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 27,
    columnNumber: 10
  }, this);
}

// app/routes/api.geo.ts
var api_geo_exports = {};
__export(api_geo_exports, {
  loader: () => loader3
});
var loader3 = async ({ request, context }) => {
  let doesCFExistInRequest = "cf" in request ? "CF EXISTS IN REQUEST" : "CF DOES NOT EXIST IN REQUEST", doesCFExistInContext = "cf" in context ? "CF EXISTS IN CONTEXT" : "CF DOES NOT EXIST IN CONTEXT", propertiesOfRequest = Object.getOwnPropertyNames(request), propertiesOfContext = Object.getOwnPropertyNames(context);
  return new Response(
    JSON.stringify({
      doesCFExistInRequest,
      cfContentsInRequest: request == null ? void 0 : request.arrayBuffer(),
      doesCFExistInContext,
      propertiesOfRequest,
      propertiesOfContext
    })
  );
};

// app/routes/api.img.ts
var api_img_exports = {};
__export(api_img_exports, {
  loader: () => loader4
});
import { json as json3 } from "react-router";
import { enums, nullable, is, type } from "superstruct";
var FormatStruct = enums(["avif", "webp", "jpeg", "png", "json"]), TransformOptionsStruct = type({
  format: nullable(FormatStruct),
  fit: nullable(is("cover", "contain", "fill", "inside", "outside"))
}), loader4 = async ({ request, context, params }) => {
  let url = new URL(request.url), imageProps = {
    format: "avif"
  }, format = url.searchParams.get("format"), fit = url.searchParams.get("fit");
  return json3({ ok: !0 });
};

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "2df99cbb", entry: { module: "/build/entry.client-QFR6TUTL.js", imports: ["/build/_shared/chunk-JRG4X5K3.js", "/build/_shared/chunk-2X7K6LDP.js", "/build/_shared/chunk-4IYZMDEG.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-2HUC6JU6.js", imports: ["/build/_shared/chunk-BCMZQV3T.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-EYDPAVMJ.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api.geo": { id: "routes/api.geo", parentId: "root", path: "api/geo", index: void 0, caseSensitive: void 0, module: "/build/routes/api.geo-I7Z5AGZJ.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api.img": { id: "routes/api.img", parentId: "root", path: "api/img", index: void 0, caseSensitive: void 0, module: "/build/routes/api.img-PZQP2UEE.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, url: "/build/manifest-2DF99CBB.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !0, unstable_postcss: !1, unstable_tailwind: !0, unstable_vanillaExtract: !1, v2_errorBoundary: !1, v2_meta: !1, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/api.geo": {
    id: "routes/api.geo",
    parentId: "root",
    path: "api/geo",
    index: void 0,
    caseSensitive: void 0,
    module: api_geo_exports
  },
  "routes/api.img": {
    id: "routes/api.img",
    parentId: "root",
    path: "api/img",
    index: void 0,
    caseSensitive: void 0,
    module: api_img_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
