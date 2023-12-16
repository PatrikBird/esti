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
    class="mb-5 flex items-center justify-center gap-1 fade-animation"
  >
    <p class="items-center rounded bg-blue-100 p-1.5 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
      {{ averageVoteValue ?? "None" }}
    </p>
    <p class="font-medium text-zinc-900 dark:text-white">
      Average
    </p>
    <div class="flex items-center gap-1">
      <span i-mdi:arrow-right-thin class="inline-block h-5 w-5" />
      <div
        class="relative m-1 inline-block h-10 w-12 select-none rounded-lg
        border border-zinc-200 p-2 text-center shadow-md
        dark:(border-zinc-900 bg-zinc-800)"
      >
        {{ closestAvailableVote }}
      </div>
      <span class="mx-2 h-1 w-1 rounded-full bg-zinc-900 dark:bg-zinc-500" />
      <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        based on {{ voters?.length }} {{ voters?.length === 1 ? 'vote' : 'votes' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.fade-animation {
  opacity: 0; /* Initial state: hidden */
  /* transform: scale(0); Initial state: scale(0); */
  animation: fade .2s ease-in 0.5s forwards;
}

@keyframes fade {
  0% {
    /* transform: scale(0); */
    opacity: 0;
  }
  100% {
    /* transform: scale(1); */
    opacity: 1;
  }
}
</style>
