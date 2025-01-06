import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// Fallback to empty string if env vars are missing
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Only initialize Firebase if all required config values are present
const isConfigValid = Object.values(firebaseConfig).every(value => value !== '');

let messaging: any = null;

if (isConfigValid) {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export async function getFCMToken(): Promise<string> {
  if (!messaging) {
    console.warn('Firebase messaging is not initialized. Using fallback device ID.');
    return 'FIREBASE_NOT_CONFIGURED';
  }

  try {
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    if (!vapidKey) {
      throw new Error('VAPID key not configured');
    }

    const currentToken = await getToken(messaging, { vapidKey });
    return currentToken || 'TOKEN_UNAVAILABLE';
  } catch (err) {
    console.error('FCM token error:', err);
    return 'FCM_ERROR';
  }
}