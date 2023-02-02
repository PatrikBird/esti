<script setup lang='ts'>
// import type { StyleValue } from 'vue'
import type { User } from '../types'

const props = defineProps<{ voters?: User[] }>()

// const progressWidth = computed(() => 80 as unknown as StyleValue)
</script>

<template>
  <!-- <div class="w-full rounded-full bg-gray-200 dark:bg-gray-700">
    <div class="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100" style="width: 45%">
      45%
    </div>
  </div> -->
  <dl v-for="user in voters" :key="user.id">
    <dt class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
      {{ user.name }}
      <!-- TODO: move name on front of progress bar -->
    </dt>
    <dd class="mb-3 flex items-center">
      <div class="mr-2 h-2.5 w-full rounded bg-zinc-200 dark:bg-zinc-700">
        <div class="h-2.5 rounded bg-indigo-600 dark:bg-indigo-500" style="width: 45%" />
      </div>
      <span v-if="user.voteValue === 'coffee'" class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <icon:line-md:coffee-filled />
      </span>
      <span v-else class="text-sm font-medium text-zinc-500 dark:text-zinc-400">{{ user.voteValue }}</span>
    </dd>
  </dl>
</template>
