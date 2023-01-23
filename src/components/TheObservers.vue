<script setup lang="ts">
import type { User } from '../types'

const props = defineProps<{ observers?: User[] }>()
</script>

<template>
  <div class="mt-5 grid grid-cols-2 gap-2">
    <div v-for="person in observers" :key="person.id" class="relative flex select-none items-center space-x-3 rounded-lg border border-slate-300 px-6 py-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div class="shrink-0">
        <icon:mdi:eye class="h-6 w-6" />
      </div>
      <div class="min-w-0 flex-1">
        <div href="#">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="truncate text-sm font-medium">
            {{ person.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
