import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'apps/App';
// Lets not assume our initial element exists...
const root = createRoot(document.getElementById('root') ?? document.createElement('div'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
