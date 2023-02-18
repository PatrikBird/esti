<script setup lang='ts'>
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '~/modules/firebase'

const router = useRouter()
const mainStore = useMainStore()

const formSending = ref(false)
const isObserver = ref(false)

async function writeData() {
  formSending.value = true
  mainStore.session.id = Date.now().toString()
  const collectionRef = collection(db, mainStore.session.id)

  console.log('sessionState writing...')
  await setDoc(doc(db, mainStore.session.id, 'sessionState'), {
    isVoteRevealed: false,
    lastRevealOn: null,
    lastResetOn: null,
    createdOn: Timestamp.fromDate(new Date()),
  })
  console.log('sessionState written')

  console.log('user writing...')
  const userDocRef = await addDoc(collectionRef, {
    name: mainStore.user.name,
    voteValue: null,
    isObserver: isObserver.value,
    lastVoteOn: null,
    joinedOn: Timestamp.fromDate(new Date()),
  })
  console.log('user written')
  mainStore.user.id = userDocRef.id
  router.push(`/session/${mainStore.session.id}`)
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-24 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- <img class="mx-auto h-24 w-auto" src="/esti.svg" alt="Esti Logo"> -->
      <h1 class="text-2xl font-bold tracking-tight">
        <span class="text-blue-600">esti</span>mate
      </h1>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">
        Create a new estimation
      </h2>
      <p class="mt-2 text-center text-sm">
        Or
        <RouterLink
          to="/join"
          class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
        >
          join an existing session
        </RouterLink>
      </p>
    </div>

    <div class="mx-auto mt-8 w-full max-w-md">
      <div class="rounded-lg border border-zinc-200 py-8 px-10 shadow-xl dark:border-zinc-700/50">
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
                class="block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-blue-500"
              >
            </div>
          </div>

          <div class="flex items-center justify-center">
            <TheToggle @is-observer="(e) => isObserver = e" />
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-600/50 disabled:hover:bg-blue-600/50"
              :disabled="formSending"
            >
              <icon:line-md:loading-twotone-loop v-if="formSending" class="mr-1 h-5 w-5" />
              {{ formSending ? 'Loading...' : 'Create session' }}
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="mt-6 grid grid-cols-3 gap-3" />
        </div>
      </div>
    </div>
  </div>
</template>
