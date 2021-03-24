//import {} from "react-dom/experimental"; // used to ensure experimental types are being referrenced.
import {StrictMode} from 'react';
import {render} from 'react-dom';
import App from 'apps/App';
import reportWebVitals from 'functions/reportWebVitals';
const root = document.getElementById("root");
render(<StrictMode><App /></StrictMode>, root);

if (import.meta.env.DEV) {
  reportWebVitals(console.log);
}