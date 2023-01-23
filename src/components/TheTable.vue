<script setup lang="ts">
import type { User } from '../types'

const props = defineProps<{ voters?: User[] }>()

// const allObserver = allUser.filter(user => user.isObserver === true)
// const allVoter = allUser.filter(user => user.isObserver === false)

const isEvenClasses = computed(() => ({
  'bg-slate-100': true,
  'dark:bg-slate-700': true,
}))
</script>

<template>
  <!-- <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"> -->
  <div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black/5 dark:ring-slate-700 md:rounded-lg">
          <table class="min-w-full divide-y divide-slate-300 dark:divide-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <thead>
              <tr>
                <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-right text-sm font-semibold">
                  Name
                </th>
                <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-right text-sm font-semibold">
                  Vote
                </th>
                <th scope="col" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
              <tr v-for="(user, idx) in voters" :key="user.id" :class="idx % 2 && isEvenClasses">
                <td class="whitespace-nowrap p-2 text-right text-sm font-medium">
                  {{ user.name }}
                </td>
                <td class="whitespace-nowrap p-2 text-right text-sm">
                  {{ user.voteValue }}
                </td>
                <td class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right sm:pr-6">
                  <icon:ic:baseline-settings class="cursor-pointer" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
