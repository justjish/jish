/** 
 * Simple helper file to make firebase feel like a hook.
 * Avoiding the use of it to ensure bundle size is small.
 */
'use strict';
import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-analytics';
import 'firebase/firebase-functions';
import 'firebase/firebase-firestore';
import 'firebase/firebase-database';
import 'firebase/firebase-remote-config';
import 'firebase/firebase-storage';
import 'firebase/firebase-performance';

const options = Object.freeze({
  apiKey: import.meta.env.VITE_API_KEY,
  appId: import.meta.env.VITE_APP_ID,
  projectId: import.meta.env.VITE_PROJECT_ID,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN ,
  databaseURL: import.meta.env.VITE_DATABASE_URL ,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDER_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
});

const useFirebase = firebase.initializeApp({ ...options });
// Use emulators if running locally
if (import.meta.env.DEV) {
  firebase.auth().useEmulator("http://localhost:9099");
  firebase.functions().useEmulator("localhost", 5001);
  firebase.firestore().useEmulator('localhost', 8080);
  firebase.database().useEmulator('localhost', 9000);
  
}
export const useAuth = useFirebase.auth();
export const useStorage = useFirebase.storage();
export const useDatabase = useFirebase.firestore();
export const useRealtime = useFirebase.database();
export const useAnalytics = useFirebase.analytics();
export const usePerformance = useFirebase.performance();
export default useFirebase;
