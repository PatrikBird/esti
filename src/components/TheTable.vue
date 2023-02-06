<script setup lang="ts">
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '~/modules/firebase'
import type { User } from '~/types'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{ voters?: User[] }>()

const mainStore = useMainStore()
const route = useRoute()

const isEvenClasses = computed(() => ({
  'bg-zinc-100': true,
  'dark:bg-zinc-700/50': true,
}))

function removeUser(userID: string) {
  deleteDoc(doc(db, mainStore.session.id, userID))
}

const collectionID = ref(route.params.sessionID as string)
function switchVoterToObserver(userID: string) {
  updateDoc(doc(db, collectionID.value, userID), { isObserver: true })
}
</script>

<template>
  <div
    v-motion
    class="mt-8 flex flex-col" :initial="{
      opacity: 0,
      y: 100,
    }"
    :enter="{
      opacity: 1,
      y: 0,
    }"
    :leave="{
      opacity: 0,
      y: 1,
    }"
  >
    <div class="inline-block min-w-full py-2 align-middle">
      <div class="overflow-hidden shadow ring-1 ring-black/5 dark:ring-zinc-700 md:rounded-lg">
        <table class="min-w-full table-fixed divide-y divide-zinc-300 dark:divide-zinc-700 dark:bg-zinc-800">
          <thead>
            <tr>
              <th scope="col" class="w-1/2 whitespace-nowrap px-2 py-3.5 text-right font-medium">
                Name
              </th>
              <th scope="col" class="w-1/4 whitespace-nowrap px-2 py-3.5 text-center font-medium">
                Vote
              </th>
              <th scope="col" class="w-1/4 select-none whitespace-nowrap px-2 py-3.5 text-center font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
            <tr v-for="(user, idx) in voters" :key="user.id" :class="idx as number % 2 && isEvenClasses">
              <td
                class="whitespace-nowrap p-2 text-right text-sm"
                :class="user.id === mainStore.user.id && 'text-indigo-500'"
              >
                {{ user.name }}
              </td>
              <td class="whitespace-nowrap p-2 text-center text-sm">
                <icon:line-md:confirm-circle-to-circle-transition v-if="!user.voteValue" class="inline-block h-5 w-5 text-amber-500" />
                <icon:line-md:circle-to-confirm-circle-transition v-else class="inline-block h-5 w-5 text-emerald-500" />
              </td>
              <td class="flex justify-center gap-2">
                <button
                  type="button"
                  class="rounded-md px-1.5 py-1 text-sm font-medium shadow-sm hover:bg-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:hover:bg-zinc-700"
                  title="Delete User"
                  @click="removeUser(user.id)"
                >
                  <icon:mdi:delete class="inline-block h-5 w-5 cursor-pointer" />
                </button>
                <button
                  type="button"
                  class="rounded-md px-1.5 py-1 text-sm font-medium shadow-sm hover:bg-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:hover:bg-zinc-700"
                  title="Switch to Observer"
                  @click="switchVoterToObserver(user.id)"
                >
                  <icon:mdi:eye class="inline-block h-5 w-5 cursor-pointer" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
