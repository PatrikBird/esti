<script setup lang='ts'>
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../modules/firebase'

const mainStore = useMainStore()

async function writeData() {
  const userDocRef = await addDoc(collection(db, mainStore.session.id), {
    name: mainStore.user.name,
    voteValue: null,
    isObserver: mainStore.user.isObserver,
    lastVoteOn: null,
    joinedOn: Timestamp.fromDate(new Date()),
  })
  mainStore.user.id = userDocRef.id
  console.log('writeData executed')
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="writeData">
    <div>
      <label for="username" class="block text-left text-sm font-medium">Name</label>
      <div class="mt-1">
        <input
          id="username"
          v-model="mainStore.user.name"
          name="username"
          type="text"
          required
          class="block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-indigo-500"
        >
      </div>
    </div>
    <div class="flex items-center justify-center">
      <TheToggle />
    </div>
    <div>
      <button
        type="submit"
        class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        As new user
      </button>
    </div>
  </form>
</template>
