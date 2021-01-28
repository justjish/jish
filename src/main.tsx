import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { useAuth } from './hooks/useFirebase';
import useStore from './hooks/useStore';
import { Provider } from 'jotai';
import { ToastProvider } from 'react-toast-notifications';

useAuth
  .signInAnonymously()
  .then((creds) => Promise.resolve(useStore.getState().set((state) => void (state.store.creds = creds))));

ReactDOM.render(
  <Provider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Provider>,
  document.getElementById('root'),
);
