<script setup lang='ts'>
import type { User } from '~/types'

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

const availableVotes: Ref<string[]> = inject('availableVotes') as Ref<string[]>
const availableVotesNum = computed(() => availableVotes.value.map(v => +v))

const closestAvailableVote = computed(() => {
  const availableVotes = availableVotesNum.value
  const average = +averageVoteValue.value!
  if (average === null)
    return null

  const closest = availableVotes.reduce((acc, v) =>
    Math.abs(v - average) < Math.abs(acc - average) ? v : acc,
  )
  return closest.toString()
})
</script>

<template>
  <div
    v-visible="averageVoteValue"
    v-motion-fade
    :delay="600"
    class="mb-5 flex items-center justify-center gap-1"
  >
    <p class="items-center rounded bg-blue-100 p-1.5 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
      {{ averageVoteValue ?? "None" }}
    </p>
    <p class="font-medium text-zinc-900 dark:text-white">
      Average
    </p>
    <div class="flex items-center gap-1">
      <span i-mdi:arrow-right-thin class="inline-block h-5 w-5" />
      <pop-over>
        {{ closestAvailableVote }}
      </pop-over>
      <span class="mx-2 h-1 w-1 rounded-full bg-zinc-900 dark:bg-zinc-500" />
      <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        based on {{ voters?.length }} {{ voters?.length === 1 ? 'vote' : 'votes' }}
      </p>
    </div>
  </div>
</template>
