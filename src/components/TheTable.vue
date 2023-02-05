<script setup lang="ts">
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '~/modules/firebase'
import type { User } from '~/types'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{ voters?: User[] }>()

const mainStore = useMainStore()

const isEvenClasses = computed(() => ({
  'bg-zinc-100': true,
  'dark:bg-zinc-700/50': true,
}))

function removeUser(userID: string) {
  deleteDoc(doc(db, mainStore.session.id, userID))
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
        <table class="min-w-full divide-y divide-zinc-300 dark:divide-zinc-700 dark:bg-zinc-800">
          <thead>
            <tr>
              <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-right font-medium">
                Name
              </th>
              <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-center font-medium">
                Vote
              </th>
              <th scope="col" class="select-none whitespace-nowrap px-2 py-3.5 text-center font-medium">
                Edit
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
            <tr v-for="(user, idx) in voters" :key="user.id" :class="idx as number % 2 && isEvenClasses">
              <td
                class="whitespace-nowrap p-2 text-right text-sm"
                :class="user.id === mainStore.user.id && 'text-emerald-500'"
              >
                {{ user.name }}
              </td>
              <td class="whitespace-nowrap p-2 text-center text-sm">
                <icon:line-md:confirm-circle-to-circle-transition v-if="!user.voteValue" class="inline-block h-5 w-5 text-amber-500" />
                <icon:line-md:circle-to-confirm-circle-transition v-else class="inline-block h-5 w-5 text-emerald-500" />
                <!-- <icon:line-md:confirm-circle-to-circle-transition class="inline-block h-5 w-5 text-amber-500" /> -->
              </td>
              <td class="text-center">
                <button
                  type="button"
                  class="rounded-md bg-black/20 px-2 py-1 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                  @click="removeUser(user.id)"
                >
                  <icon:mdi:delete class="inline-block h-5 w-5 cursor-pointer" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
