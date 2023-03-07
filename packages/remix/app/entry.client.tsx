import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
}
// Safari doesn't support requestIdleCallback https://caniuse.com/requestidlecallback
typeof requestIdleCallback === 'function' ? requestIdleCallback(hydrate):setTimeout(hydrate, 1);

