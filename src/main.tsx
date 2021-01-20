import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App'
import useDatasets from './hooks/useDatasets';
import { useAuth } from './hooks/useFirebase';

const login = async () => await useAuth.signInAnonymously().catch(res => console.log(res));
login();
ReactDOM.render(<App />, document.getElementById('root'));

