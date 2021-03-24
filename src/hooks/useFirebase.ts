'use strict';
import FB from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-analytics';
import 'firebase/firebase-functions';
import 'firebase/firebase-firestore';
import 'firebase/firebase-database';
import 'firebase/firebase-analytics';
import 'firebase/firebase-remote-config';
import 'firebase/firebase-storage';
import 'firebase/firebase-performance';

const options = Object.freeze({
  apiKey: String(import.meta?.env?.API_KEY ?? 'AIzaSyArhfn0D4wXLz7jxnXmRZdTgg37-Y7u9OY'),
  appId: String(import.meta?.env?.APP_ID ?? '1:114288485302:web:1cf525070c727a5ef41717'),
  projectId: String(import.meta?.env?.PROJECT_ID ?? 'jish-dev'),
  authDomain: String(import.meta?.env?.AUTH_DOMAIN ?? 'jish-dev.firebaseapp.com'),
  databaseURL: String(import.meta?.env?.DATABASE_URL ?? 'https://jish-dev.firebaseio.com'),
  storageBucket: String(import.meta?.env?.STORAGE_BUCKET ?? 'jish-dev.appspot.com'),
  messagingSenderId: String(import.meta?.env?.MESSAGINGSENDER_ID ?? '114288485302'),
  measurementId: String(import.meta?.env?.MEASUREMENT_ID ?? 'G-YTYNGYWFWK'),
});

const useFirebase = FB.initializeApp({ ...options });

export const useAuth = useFirebase.auth();
export const useStorage = useFirebase.storage();
export const useDatabase = useFirebase.firestore();
export const useRealtime = useFirebase.database();
export const useAnalytics = useFirebase.analytics();
export const usePerformance = useFirebase.performance();
export default useFirebase;
