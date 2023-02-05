<script setup lang="ts">
import { deleteDoc, doc } from 'firebase/firestore'
import type { User } from '~/types'
import { db } from '~/modules/firebase'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{ observers?: User[] }>()
const mainStore = useMainStore()

function removeUser(userID: string) {
  deleteDoc(doc(db, mainStore.session.id, userID))
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
      class="relative flex select-none items-center space-x-2 rounded-lg border border-zinc-300 px-6 py-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
    >
      <div class="shrink-0">
        <icon:mdi:eye class="h-6 w-6" />
      </div>
      <div class="min-w-0 flex-1">
        <div href="#">
          <span class="absolute inset-0" aria-hidden="true" />
          <p :class="user.id === mainStore.user.id && 'text-emerald-600'" class="truncate text-sm font-medium">
            {{ user.name }}
          </p>
        </div>
      </div>
      <div class="absolute top-0 right-0">
        <button class="opacity-75 hover:opacity-100">
          <icon:mdi:close class="h-4 w-4" @click="removeUser(user.id)" />
        </button>
      </div>
    </div>
  </div>
</template>
