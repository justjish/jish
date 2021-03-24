'use strict';
import FB from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-analytics';
import 'firebase/firebase-functions';
import 'firebase/firebase-firestore';
import 'firebase/firebase-database';
import 'firebase/firebase-remote-config';
import 'firebase/firebase-storage';
import 'firebase/firebase-performance';

const options = Object.freeze({
  apiKey: String(import.meta.env.VITE_API_KEY ),
  appId: String(import.meta.env.VITE_APP_ID),
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  authDomain: String(import.meta.env.VITE_AUTH_DOMAIN ),
  databaseURL: String(import.meta.env.VITE_DATABASE_URL ),
  storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_MESSAGINGSENDER_ID ),
  measurementId: String(import.meta.env.VITE_MEASUREMENT_ID),
});

const useFirebase = FB.initializeApp({ ...options });

export const useAuth = useFirebase.auth();
export const useStorage = useFirebase.storage();
export const useDatabase = useFirebase.firestore();
export const useRealtime = useFirebase.database();
export const useAnalytics = useFirebase.analytics();
export const usePerformance = useFirebase.performance();
export default useFirebase;
