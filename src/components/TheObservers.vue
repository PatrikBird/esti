<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ observers?: User[] }>()

const mainStore = useMainStore()
</script>

<template>
  <div class="mt-5 grid grid-cols-2 gap-2 fade-animation">
    <div
      v-for="user in props.observers" :key="user.id" :data-testid="user.id"
      class="flex items-center space-x-2 rounded-lg border border-zinc-300 px-6 py-5 shadow-sm
      dark:(border-zinc-700 bg-zinc-800)"
    >
      <div class="min-w-0 flex-1">
        <p
          :class="user.id === mainStore.user.id && 'text-blue-600 dark:text-blue-500'"
          class="truncate text-sm font-medium"
        >
          {{ user.name }}
        </p>
      </div>
      <div class="shrink-0">
        <toggle-user-mode-btn
          :user-id="user.id"
          :set-is-observer-to="false"
        />
        <delete-user-btn :user-id="user.id" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-animation {
  opacity: 0; /* Initial state: hidden */
  animation: fade .1s ease-out 0.3s forwards;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
