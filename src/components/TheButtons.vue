<script setup lang='ts'>
import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '~/modules/firebase'

const props = defineProps<{
  isVoteRevealed?: boolean
  allVotersHaveVoted?: boolean
}>()

const { collectionID } = useCollectionID()

async function resetVotes() {
  updateDoc(doc(db, collectionID, 'sessionState'), { isVoteRevealed: false, lastResetOn: serverTimestamp() })
  // TODO: verify if unsub necessary or any memory leaks
  const querySnapshot = await getDocs(collection(db, collectionID))
  querySnapshot.forEach((userDoc) => {
    if (userDoc.id === 'sessionState')
      return
    updateDoc(doc(db, collectionID, userDoc.id), { voteValue: null })
  })
}

async function revealVotes() {
  updateDoc(doc(db, collectionID, 'sessionState'), { isVoteRevealed: true, lastRevealOn: serverTimestamp() })
}

const mainStore = useMainStore()
const collectionRef = collection(db, mainStore.session.id)
async function addObserver() {
  await addDoc(collectionRef, {
    name: `observer${Math.floor(Math.random() * 100)}`,
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
    // voteValue: Math.floor(Math.random() * 100).toString(),
    isObserver: false,
    lastVoteOn: '13',
    joinedOn: serverTimestamp(),
  })
}
// async function addRandomVotes() {
//   const querySnapshot = await getDocs(collectionRef)
//   querySnapshot.forEach((userDoc) => {
//     if (userDoc.id === 'sessionState')
//       return
//     updateDoc(doc(db, collectionID, userDoc.id), { voteValue: Math.floor(Math.random() * 100).toString() })
//   })
// }

const isDev = ref(import.meta.env.DEV)
</script>

<template>
  <div class="mt-5 flex select-none justify-center space-x-3">
    <div v-if="isDev" class="space-x-3">
      <button
        type="button"
        class="secondaryBtn"
        @click="addVoter"
      >
        Add Voter
      </button>
      <button
        type="button"
        class="secondaryBtn"
        @click="addObserver"
      >
        Add Observer
      </button>
      <!-- <button
        type="button"
        class="inline-flex items-center justify-center rounded-md
    bg-white border border-zinc-200 p-5 text-sm font-medium shadow-sm
    hover:bg-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-100
    dark:border-none dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-900"
        @click="addRandomVotes"
      >
        Random
      </button> -->
    </div>
    <button
      class="secondaryBtn"
      @click="resetVotes"
    >
      RESET
    </button>
    <button
      class="inline-flex items-center justify-center rounded-md bg-blue-600 p-5 text-sm
      font-medium text-white shadow-sm hover:bg-blue-700
      focus:(outline-none ring-1 ring-blue-500 ring-offset-2 ring-offset-zinc-100)
      dark:focus:ring-offset-zinc-900"
      :class="{ 'ring-2 ring-zinc-500 ring-offset-2 dark:ring-zinc-300 dark:ring-offset-zinc-800': allVotersHaveVoted }"

      @click="revealVotes"
    >
      REVEAL
    </button>
  </div>
  <p v-if="props.isVoteRevealed" class="mt-4">
    Click 'Reset' to begin a new vote.
  </p>
</template>
