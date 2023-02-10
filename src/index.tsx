import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from 'apps/App';
import './index.css';
createRoot(document.getElementById('root') as HTMLElement).render(<App />);
