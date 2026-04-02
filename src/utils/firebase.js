// ─── HireTrakkr Firebase Configuration ───────────────────────────────────────
// Replace the firebaseConfig below with your actual Firebase project credentials
// from https://console.firebase.google.com → Project Settings → Your Apps

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  writeBatch,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'

// ── FIREBASE CONFIG ───────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCEm5hLCD27NAQSU2ZnDdOEuqdyhfWguyE",
  authDomain: "hiretrakker.firebaseapp.com",
  projectId: "hiretrakker",
  storageBucket: "hiretrakker.firebasestorage.app",
  messagingSenderId: "1016845461095",
  appId: "1:1016845461095:web:b157f578ac2fbd853156c2",
  measurementId: "G-N93HC1W7QJ"
}
// ─────────────────────────────────────────────────────────────────────────────

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db, collection, doc, getDocs, setDoc, deleteDoc, writeBatch, query, where, onSnapshot }

// ── Firestore Helpers ─────────────────────────────────────────────────────────

export async function fsGetAll(storeName) {
  const snap = await getDocs(collection(db, storeName))
  return snap.docs.map(d => ({ ...d.data(), id: d.id }))
}

export async function fsPut(storeName, record) {
  await setDoc(doc(db, storeName, record.id), record)
}

export async function fsDelete(storeName, id) {
  await deleteDoc(doc(db, storeName, id))
}

export async function fsPutMany(storeName, records) {
  if (!records || records.length === 0) return
  // Firestore batch supports max 500 operations
  const chunks = []
  for (let i = 0; i < records.length; i += 400) {
    chunks.push(records.slice(i, i + 400))
  }
  for (const chunk of chunks) {
    const batch = writeBatch(db)
    chunk.forEach(record => {
      batch.set(doc(db, storeName, record.id), record)
    })
    await batch.commit()
  }
}

export async function fsCount(storeName) {
  const snap = await getDocs(collection(db, storeName))
  return snap.size
}
