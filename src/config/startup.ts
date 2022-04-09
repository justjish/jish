import smoothscroll from 'smoothscroll-polyfill';
import reportWebVitals from 'functions/reportWebVitals';

export const preRender = () => {
  // Polyfill handles browser detection.
  smoothscroll.polyfill();
};
