import { type EntryContext } from '@remix-run/cloudflare';
import { RemixServer } from '@remix-run/react';
import { NonceProvider } from './contexts/nonce';
import isbot from 'isbot';
import { renderToReadableStream } from 'react-dom/server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const nonce = [...crypto.getRandomValues(new Uint8Array(32))].map((m) => ('0' + m.toString(16)).slice(-2)).join('');
  const body = await renderToReadableStream(
    <NonceProvider nonce={nonce}>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      onError: (error) => {
        responseStatusCode = 500;
        console.error(error);
      },
      signal: request.signal,
      nonce,
    },
  );

  if (isbot(request.headers.get('User-Agent'))) {
    await body.allReady;
  }
  const headers = new Headers(responseHeaders);
  headers.set('Content-Type', 'text/html');
  headers.set("Content-Security-Policy", `script-src 'nonce-${nonce}' 'strict-dynamic'; object-src 'none'; base-uri 'none';`)
  return new Response(body, {
    status: responseStatusCode,
    headers,
  });
}
