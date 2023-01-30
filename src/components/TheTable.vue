<script setup lang="ts">
import type { Users } from '../types'

const props = defineProps<{ voters?: Users }>()

const isEvenClasses = computed(() => ({
  'bg-zinc-100': true,
  'dark:bg-zinc-700/50': true,
}))
</script>

<template>
  <div class="mt-8 flex flex-col">
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
            <tr v-for="(user, idx) in voters" :key="idx" :class="idx as number % 2 && isEvenClasses">
              <td class="whitespace-nowrap p-2 text-right text-sm">
                {{ user.name }}
              </td>
              <td class="whitespace-nowrap p-2 text-center text-sm">
                <!-- {{ user.voteValue }} -->
                <icon:line-md:circle class="inline-block h-5 w-5 text-amber-500" />
                <!-- <icon:line-md:circle-to-confirm-circle-transition class="inline-block h-5 w-5 text-emerald-500" />
                <icon:line-md:confirm-circle-to-circle-transition class="inline-block h-5 w-5 text-amber-500" /> -->
              </td>
              <td class="text-center">
                <icon:ic:baseline-settings class="inline-block h-5 w-5 cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
