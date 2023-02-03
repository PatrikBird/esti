<script setup lang='ts'>
import type { User } from '../types'

const props = defineProps<{ voters?: User[] }>()

const votes = computed(() =>
  props.voters?.filter(u => u.voteValue !== null && u.voteValue !== '?' && u.voteValue !== 'coffee')
    .map(u => +u.voteValue!),
)

const averageVoteValue = computed(() => {
  if (votes.value?.length === 0)
    return null

  if (votes.value)
    return (votes.value.reduce((sum, v) => sum + v, 0) / votes.value.length).toFixed(1)
})
</script>

<template>
  <div class="mb-5 flex items-center pt-12">
    <p class="inline-flex items-center rounded bg-indigo-100 p-1.5 text-sm font-semibold text-indigo-800 dark:bg-indigo-200 dark:text-indigo-800">
      {{ averageVoteValue ?? "None" }}
    </p>
    <p class="ml-2 font-medium text-zinc-900 dark:text-white">
      Average
    </p>
    <span>&nbsp;<icon:line-md:arrow-left class="inline-block rotate-180" />
      value
    </span>
    <span class="mx-2 h-1 w-1 rounded-full bg-zinc-900 dark:bg-zinc-500" />
    <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
      based on {{ voters?.length }} votes
    </p>
  </div>
</template>
