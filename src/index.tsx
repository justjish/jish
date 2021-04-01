//import {} from "react-dom/experimental"; // used to ensure experimental types are being referrenced when testing concurrent mode.
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { preRender, postRender } from 'config/startup';
import App from 'apps/App';

preRender();
render(<StrictMode><App /></StrictMode>, document.getElementById("root"));
postRender();