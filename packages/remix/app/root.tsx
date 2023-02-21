import { json, type LinksFunction, type MetaFunction, type LoaderFunction } from '@remix-run/server-runtime';
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react';
import cfaSource from '~/scripts/beacon.min.js';
import appStyles from '~/styles/app.css';
import imageStyles from 'remix-image/remix-image.css';

/**
 * The `links` export is a function that returns an array of objects that map to
 * the attributes for an HTML `<link>` element. These will load `<link>` tags on
 * every route in the app, but individual routes can include their own links
 * that are automatically unloaded when a user navigates away from the route.
 *
 * https://remix.run/api/app#links
 */
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: appStyles },
    { rel: 'stylesheet', href: imageStyles },
  ];
};
export const meta: MetaFunction = () => {
  return {
    viewport: 'width=device-width, initial-scale=1',
  };
};

export const loader: LoaderFunction = async ({ context }) => {
  return json({ date: new Date() });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{'Jish.Dev'}</title>
        <Meta />
        <Links />
      </head>
      <body className="w-full h-full overflow-x-hidden bg-[rgba(21,16,25)] m-0 p-0 overflow-hidden;">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'production' && (
          <script defer src={cfaSource} data-cf-beacon='{"token": "60176af6d4724c15a9bc6f4e1dcbc259"}'></script>
        )}
        {process.env.NODE_ENV === 'development' && <LiveReload port={Number(8002)} />}
      </body>
    </html>
  );
}
export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
      break;
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <h1>
      {caught.status}: {caught.statusText}
      {message}
    </h1>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div>
      <h1>There was an error</h1>
      <p>{error.message}</p>
      <hr />
      <p>Hey, developer, you should replace this with what you want your users to see.</p>
    </div>
  );
}
