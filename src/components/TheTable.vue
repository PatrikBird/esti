<script setup lang="ts">
import type { User } from '../types'

const props = defineProps<{ voters?: User[] }>()

const isEvenClasses = computed(() => ({
  'bg-slate-100': true,
  'dark:bg-slate-700': true,
}))
</script>

<template>
  <div class="mt-8 flex flex-col">
    <div class="inline-block min-w-full py-2 align-middle">
      <div class="overflow-hidden shadow ring-1 ring-black/5 dark:ring-slate-700 md:rounded-lg">
        <table class="min-w-full divide-y divide-slate-300 dark:divide-slate-700 dark:bg-slate-800 dark:text-slate-400">
          <thead>
            <tr>
              <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-right font-medium">
                Name
              </th>
              <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-center font-bold">
                Vote
              </th>
              <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-center font-medium">
                Edit
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
            <tr v-for="(user, idx) in voters" :key="user.id" :class="idx % 2 && isEvenClasses">
              <td class="whitespace-nowrap p-2 text-right text-sm">
                {{ user.name }}
              </td>
              <td class="whitespace-nowrap p-2 text-center text-sm font-bold">
                {{ user.voteValue }}
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
