<script setup lang="ts">
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import type { User } from '~/types'
import { db } from '~/modules/firebase'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{ observers?: User[] }>()

const mainStore = useMainStore()
const route = useRoute()

const hoveredUserID = ref('')

function removeUser(userID: string) {
  deleteDoc(doc(db, mainStore.session.id, userID))
}

const collectionID = ref(route.params.sessionID as string)
function switchUserMode(userID: string) {
  updateDoc(doc(db, collectionID.value, userID), { isObserver: false })
}
</script>

<template>
  <div
    v-motion class="mt-5 grid grid-cols-2 gap-2" :initial="{
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
    <div
      v-for="user in observers" :key="user.id"
      class="flex items-center space-x-2 rounded-lg border border-zinc-300 px-6 py-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
    >
      <div class="min-w-0 flex-1">
        <p :class="user.id === mainStore.user.id && 'text-indigo-600'" class="truncate text-sm font-medium">
          {{ user.name }}
        </p>
      </div>
      <div class="shrink-0">
        <button
          type="button"
          class="rounded-md px-1.5 py-1 text-sm font-medium shadow-sm hover:bg-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:hover:bg-zinc-700"
          title="Move User to Voters"
          @click="switchUserMode(user.id)"
          @mouseover="hoveredUserID = user.id"
          @mouseleave="hoveredUserID = ''"
        >
          <icon:mdi:arrow-up v-show="hoveredUserID === user.id" class="inline-block h-5 w-5" />
          <icon:mdi:eye v-show="hoveredUserID !== user.id" class="inline-block h-5 w-5" />
        </button>
        <button
          type="button"
          class="rounded-md px-1.5 py-1 text-sm font-medium shadow-sm hover:bg-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:hover:bg-zinc-700"
          title="Delete User"
          @click="removeUser(user.id)"
        >
          <icon:mdi:delete class="inline-block h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>
