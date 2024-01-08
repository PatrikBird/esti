<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ voters?: User[] }>()

const mainStore = useMainStore()

const isEvenClasses = computed(() => ({
  'bg-zinc-100': true,
  'dark:bg-zinc-700/50': true,
}))
</script>

<template>
  <div class="mt-8 flex flex-col slide-up-animation">
    <div class="inline-block min-w-full py-2 align-middle">
      <div class="overflow-hidden shadow ring-1 ring-black/5 dark:ring-zinc-700 md:rounded-lg">
        <table
          class="min-w-full table-fixed divide-y divide-zinc-300
        dark:(divide-zinc-700 bg-zinc-800)"
        >
          <thead>
            <tr>
              <th scope="col" class="w-1/2 whitespace-nowrap px-2 py-3.5 text-right font-medium">
                Name
              </th>
              <th scope="col" class="w-1/4 whitespace-nowrap px-2 py-3.5 text-center font-medium">
                Vote
              </th>
              <th
                scope="col"
                class="w-1/4 select-none whitespace-nowrap px-2 py-3.5 text-center font-medium"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
            <tr
              v-for="(user, idx) in props.voters"
              :key="user.id"
              :class="idx as number % 2 && isEvenClasses"
            >
              <td
                class="whitespace-nowrap p-2 text-right text-sm"
                :class="user.id === mainStore.user.id && 'text-blue-600 dark:text-blue-500'"
              >
                {{ user.name }}
              </td>
              <td class="whitespace-nowrap p-2 text-center text-sm">
                <span
                  v-if="!user.voteValue" i-line-md:confirm-circle-to-circle-transition
                  class="inline-block h-5 w-5 text-amber-500"
                />
                <span
                  v-else i-line-md:circle-to-confirm-circle-transition
                  class="inline-block h-5 w-5 text-emerald-600"
                />
              </td>
              <td>
                <switch-user-btn
                  :user-id="user.id"
                  :set-is-observer-to="true"
                />
                <delete-user-btn :user-id="user.id" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-up-animation {
  animation: slide-up 0.3s ease-in-out forwards;
}
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  70% {
    opacity: 0.8;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
