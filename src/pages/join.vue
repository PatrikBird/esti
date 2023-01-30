<script setup lang='ts'>
import { child, ref as dbRef, get, getDatabase } from 'firebase/database'

const mainStore = useMainStore()
const router = useRouter()

// TODO: generate new user ID if user is not in local storage
// const { newUserID } = generateID()

function sessionLookup() {
  const reference = dbRef(getDatabase())
  get(child(reference, mainStore.session.id as string)).then((snapshot) => {
    if (snapshot.exists()) {
      if (!mainStore.user.id)
        mainStore.user.id = generateIDs().newUserID

      // TODO: add error class to session id input
      router.push(`session/${mainStore.session.id}`)
    }
    else { console.log('No data available') }
  }).catch((error) => {
    console.error(error)
  })
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
        <form class="space-y-6" @submit.prevent="sessionLookup">
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
            <TheToggle />
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
