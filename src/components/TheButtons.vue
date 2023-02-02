<script setup lang='ts'>
import { addDoc, collection, doc, getDocs, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore'

const db = getFirestore()
const route = useRoute()
const collectionID = ref(route.params.sessionID as string)

async function resetVotes() {
  updateDoc(doc(db, collectionID.value, 'sessionState'), { isVoteRevealed: false, lastResetOn: serverTimestamp() })
  // TODO: verify if unsub necessary or any memory leaks
  const querySnapshot = await getDocs(collection(db, collectionID.value))
  querySnapshot.forEach((userDoc) => {
    if (userDoc.id === 'sessionState')
      return
    updateDoc(doc(db, collectionID.value, userDoc.id), { voteValue: null })
  })
}

async function revealVotes() {
  updateDoc(doc(db, collectionID.value, 'sessionState'), { isVoteRevealed: true, lastRevealOn: serverTimestamp() })
}

const mainStore = useMainStore()
const collectionRef = collection(db, mainStore.session.id)
async function addObserver() {
  await addDoc(collectionRef, {
    name: 'another user',
    voteValue: null,
    isObserver: true,
    lastVoteOn: null,
    joinedOn: serverTimestamp(),
  })
}
async function addVoter() {
  await addDoc(collectionRef, {
    name: `voter${Math.floor(Math.random() * 100)}`,
    voteValue: null,
    isObserver: false,
    lastVoteOn: '13',
    joinedOn: serverTimestamp(),
  })
}
</script>

<template>
  <div class="mt-5 flex select-none justify-center space-x-3">
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-md
    border border-zinc-200 p-5 text-sm font-medium shadow-sm
    hover:bg-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-100
    dark:border-none dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-900"
      @click="addVoter"
    >
      Add Voter
    </button>
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-md
    border border-zinc-200 p-5 text-sm font-medium shadow-sm
    hover:bg-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-100
    dark:border-none dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-900"
      @click="addObserver"
    >
      Add Observer
    </button>
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-md
    border border-zinc-200 p-5 text-sm font-medium shadow-sm
    hover:bg-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-100
    dark:border-none dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-900"
      @click="resetVotes"
    >
      RESET
    </button>
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-md bg-indigo-600 p-5
    text-sm font-medium text-white shadow-sm hover:bg-indigo-700
    focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-100
    dark:focus:ring-offset-zinc-900"
      @click="revealVotes"
    >
      REVEAL
    </button>
  </div>
</template>
