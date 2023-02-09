<script setup lang="ts">
import type { User } from '~/types'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{ observers?: User[] }>()

const mainStore = useMainStore()
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
        <switch-user-btn
          :user-id="user.id"
          :set-is-observer-to="false"
        />
        <delete-user-btn :user-id="user.id" />
      </div>
    </div>
  </div>
</template>
