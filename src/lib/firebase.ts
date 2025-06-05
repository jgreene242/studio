
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from 'firebase/app-check';
import { getAnalytics, isSupported as isAnalyticsSupported, Analytics } from 'firebase/analytics';
import { getPerformance, FirebasePerformance } from 'firebase/performance';

const firebaseConfig = {
  apiKey: "AIzaSyAtzuBFcr-IfRyNJnozt46ZrjmGYnzJzrc",
  authDomain: "dispatchnow-9flvh.firebaseapp.com",
  databaseURL: "https://dispatchnow-9flvh-default-rtdb.firebaseio.com",
  projectId: "dispatchnow-9flvh",
  storageBucket: "dispatchnow-9flvh.firebasestorage.app",
  messagingSenderId: "779499045423",
  appId: "1:779499045423:web:c0e83c45d5bdae3092bcda",
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
    try {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY),
        isTokenAutoRefreshEnabled: true,
      });
      console.log("Firebase App Check initialized successfully.");
    } catch (error) {
      console.error("Firebase App Check initialization error:", error);
    }
  } else {
    console.warn("App Check not initialized: NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY is not set.");
  }

  // Initialize Analytics
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
        console.log("Firebase Analytics initialized.");
      } catch (error) {
        console.error("Error initializing Firebase Analytics inside supported check:", error);
      }
    } else {
      console.log("Firebase Analytics is not supported in this environment.");
    }
  }).catch(error => {
    console.error("Error checking Firebase Analytics support:", error);
  });

  // Initialize Performance Monitoring
  try {
    perf = getPerformance(app);
    console.log("Firebase Performance Monitoring initialized.");
  } catch (error) {
    console.error("Error initializing Firebase Performance Monitoring:", error);
  }
}

export { app, auth, db, appCheck, analytics, perf };
