import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import config from './config.js'

function initialize(existingApp) {
  const firebaseApp = existingApp || initializeApp(config)
  const auth = getAuth(firebaseApp)
  const firestore = getFirestore(firebaseApp)
  const storage = getStorage(firebaseApp)
  return { firebaseApp, auth, firestore, storage }
}

export function getFirebase() {
  const existingApp = getApps().at(0)
  return initialize(existingApp)
}
