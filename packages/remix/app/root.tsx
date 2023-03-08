import {
  json,
  type LinksFunction,
  type MetaFunction,
  type LoaderFunction,
  type HeadersFunction,
} from '@remix-run/server-runtime';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { Partytown } from '~/components/Partytown';
import appStyles from '~/styles/app.css';
import { useNonce } from './contexts/nonce';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: appStyles }];
};
export const meta: MetaFunction = () => {
  return {
    viewport: 'width=device-width, initial-scale=1',
  };
};

export const headers: HeadersFunction = () => {
  return {
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
  };
};

export const loader: LoaderFunction = async ({}) => {
  return json({ date: new Date() });
};

export default function App() {
  const nonce = useNonce();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{'Jish.Dev'}</title>
        <Partytown
          scriptProps={{ nonce: nonce }}
          debug={process.env.NODE_ENV === 'development'}
          forward={['dataLayer.push', '__cfBeacon']}
        />
        <Meta />
        <Links />
      </head>
      <body className="w-full h-full overflow-x-hidden bg-[rgba(21,16,25)] m-0 p-0 overflow-hidden;">
        <Outlet />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        {process.env.NODE_ENV === 'production' && (
          <script
            defer
            type="text/partytown"
            nonce={nonce}
            src={'/scripts/cfa.js'}
            data-cf-beacon={JSON.stringify({ token: '60176af6d4724c15a9bc6f4e1dcbc259', version: '2023.2.0', si: 100 })}
          />
        )}
        {process.env.NODE_ENV === 'development' && <LiveReload port={Number(8002)} nonce={nonce} />}
      </body>
    </html>
  );
}
