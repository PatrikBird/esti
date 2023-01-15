import { VueFire } from 'vuefire'
import { initializeApp } from 'firebase/app'
import { connectDatabaseEmulator, getDatabase } from 'firebase/database'
import { type UserModule } from '../types'

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY! as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN! as string,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABSE_URL! as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID! as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET! as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID! as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID! as string,
})

const db = getDatabase()
if (window.location.hostname.includes('localhost'))
  connectDatabaseEmulator(db, 'localhost', 9000)

export const install: UserModule = ({ app }) => {
  app.use(VueFire, { firebaseApp })
}
