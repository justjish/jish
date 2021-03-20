//import {} from "react-dom/experimental"; // used to ensure experimental types are being referrenced. 
import React from 'react';
import {render} from 'react-dom';
import App from 'apps/App';

const root = document.getElementById("root");
render(<React.StrictMode><App /></React.StrictMode>, root);