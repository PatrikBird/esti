<script setup lang='ts'>
import { ref as dbRef, getDatabase, push } from 'firebase/database'

const router = useRouter()
const mainStore = useMainStore()

function writeData() {
  const db = getDatabase()
  const rootRef = dbRef(db)

  mainStore.session.id = push(rootRef, {
    sessionState: {
      isRevealed: false,
      lastVoteReveal: 'null',
      lastVoteReset: 'null',
    },
  }).key!.toString()

  const usersRef = dbRef(db, `${mainStore.session.id}/users`)
  mainStore.user.id = push(usersRef, {
    name: mainStore.user.name,
    voteValue: 'null',
    isObserver: mainStore.user.isObserver,
    lastVote: 'null',
  }).key!.toString()

  router.push(`/session/${mainStore.session.id}`)
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">
        Create a new estimation
      </h2>
      <p class="mt-2 text-center text-sm">
        Or
        <RouterLink
          to="/join"
          class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
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
              Create session
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
