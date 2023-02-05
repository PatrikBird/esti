import { VueFire } from 'vuefire'
import { initializeApp } from 'firebase/app'
// import { connectDatabaseEmulator, getDatabase } from 'firebase/database'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { type UserModule } from '~/types'

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY! as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN! as string,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABSE_URL! as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID! as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET! as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID! as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID! as string,
})

// export const RTdb = getDatabase()
export const db = getFirestore()

if (import.meta.env.MODE === 'development') {
  // connectDatabaseEmulator(RTdb, 'localhost', 9000)
  // console.info('Using local RTdb emulator!')
  connectFirestoreEmulator(db, 'localhost', 8080)
  console.info('Using local FireStore emulator!')
}

export const install: UserModule = ({ app }) => {
  app.use(VueFire, { firebaseApp })
}
