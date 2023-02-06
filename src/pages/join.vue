<script setup lang='ts'>
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { RouterLink } from 'vue-router'
import { db } from '~/modules/firebase'

const mainStore = useMainStore()
const router = useRouter()

const isObserver = ref(false)

async function retrieveUserFromDB() {
  if (!mainStore.user.id)
    return
  const docRef = doc(db, mainStore.session.id, mainStore.user.id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data(), docSnap.id)
    return { data: docSnap.data(), id: docSnap.id }
  }
  else {
    console.log('User not found!')
  }
}

async function joinSession() {
  const retrievedUser = await retrieveUserFromDB()
  if (!retrievedUser) {
    console.log('Creating new user!')
    const collectionRef = collection(db, mainStore.session.id)
    const userDocRef = await addDoc(collectionRef, {
      name: mainStore.user.name,
      voteValue: null,
      isObserver: isObserver.value,
      lastVoteOn: null,
    })
    mainStore.user.id = userDocRef.id
  }
  else {
    console.log('User found!')
    // TODO: Show modal to ask if user wants to retrieve data from DB
    // TRUE: Retrieve data from DB, FALSE: Create new user
    // Or just show Toast that user already exists and will be retrieved?
    mainStore.user.name = retrievedUser.data.name
    mainStore.user.id = retrievedUser.id
  }
  router.push(`/session/${mainStore.session.id}`)
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">
        Join an existing estimation
      </h2>
      <p class="mt-2 text-center text-sm">
        Or
        <RouterLink to="/new" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
          create a new session
        </RouterLink>
      </p>
    </div>

    <div class="mx-auto mt-8 w-full max-w-md">
      <div class="rounded-lg border border-zinc-200 py-8 px-10 shadow-xl dark:border-zinc-700/50">
        <form class="space-y-6" @submit.prevent="joinSession">
          <div>
            <label for="id" class="block text-left text-sm font-medium">Session ID</label>
            <div class="mt-1">
              <input id="id" v-model="mainStore.session.id" name="id" type="text" required class="block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-indigo-500">
            </div>
            <label for="username" class="mt-5 block text-left text-sm font-medium">Name</label>
            <div class="mt-1">
              <input id="username" v-model="mainStore.user.name" name="username" type="text" required class="block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:border-indigo-500">
            </div>
          </div>

          <div class="flex items-center justify-center">
            <TheToggle @is-observer="(e) => isObserver = e" />
          </div>

          <div>
            <button
              autofocus
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Join session
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
