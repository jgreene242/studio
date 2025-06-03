
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from 'firebase/app-check';
import { getAnalytics, isSupported as isAnalyticsSupported, Analytics } from 'firebase/analytics';
import { getPerformance, FirebasePerformance } from 'firebase/performance';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

let appCheck: AppCheck | undefined;
let analytics: Analytics | undefined;
let perf: FirebasePerformance | undefined;

if (typeof window !== 'undefined') {
  // Initialize App Check
  if (process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY) {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
  } else {
    console.warn("App Check not initialized: NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY is not set.");
  }

  // Initialize Analytics
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });

  // Initialize Performance Monitoring
  perf = getPerformance(app);
}

export { app, auth, db, appCheck, analytics, perf };
