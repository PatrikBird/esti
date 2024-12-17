import type { UserModule } from '~/types'
import { initializeApp } from 'firebase/app'
import {
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore'
import { VueFire } from 'vuefire'

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY! as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN! as string,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABSE_URL! as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID! as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET! as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID! as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID! as string,
})

export const db = getFirestore()

if (import.meta.env.MODE === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080)
  // eslint-disable-next-line no-console
  console.info('Using local FireStore emulator!')

//   await setDoc(doc(db, '1111111111111', 'sessionState'), {
//     isVoteRevealed: false,
//     isShirtMode: false,
//     lastRevealOn: null,
//     lastResetOn: null,
//     createdOn: Timestamp.fromDate(new Date()),
//   })
//   console.log('Data seeded successfully!')
}

export const install: UserModule = ({ app }) => {
  app.use(VueFire, { firebaseApp })
}
