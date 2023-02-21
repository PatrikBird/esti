<script setup lang='ts'>
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '~/modules/firebase'

const emit = defineEmits<{
  (e: 'newUserCreated', userDocRef: string): void
}>()

const mainStore = useMainStore()

const isObserver = ref(false)
const formSending = ref(false)

async function addUserToDB() {
  formSending.value = true
  const userDocRef = await addDoc(collection(db, mainStore.session.id), {
    name: mainStore.user.name,
    voteValue: null,
    isObserver: isObserver.value,
    lastVoteOn: null,
    joinedOn: Timestamp.fromDate(new Date()),
  })
  mainStore.user.id = userDocRef.id
  emit('newUserCreated', userDocRef.id)
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="addUserToDB">
    <div>
      <label for="username" class="block text-left text-sm font-medium">Name</label>
      <div class="mt-1">
        <input
          id="username"
          v-model="mainStore.user.name"
          name="username"
          type="text"
          required
          class="block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-600 dark:focus:border-blue-500"
        >
      </div>
    </div>
    <div class="flex items-center justify-center">
      <GenericToggle off="Voter" on="Observer" @is-active="(e) => isObserver = e" />
    </div>
    <div>
      <button
        type="submit"
        class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :disabled="formSending"
      >
        <icon:line-md:loading-twotone-loop v-if="formSending" class="mr-1 h-5 w-5" />
        {{ formSending ? 'Loading...' : 'Join as new user' }}
      </button>
    </div>
  </form>
</template>
