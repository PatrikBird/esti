<script setup lang='ts'>
const props = defineProps<{ availableVotes: string[]; coffee: boolean }>()
const votes = computed(() => {
  if (props.coffee)
    return [...props.availableVotes, 'coffee']
  else
    return props.availableVotes
})

const selectedVote = ref()
function selectVote(vote: string) {
  selectedVote.value = vote
}
</script>

<template>
  <div
    v-for="vote in votes"
    :key="vote"
    tabindex="0"
    :class="{ '!bg-emerald-200': vote === selectedVote }"
    class="m-1 inline-block w-24 cursor-pointer select-none rounded-lg border border-slate-200 p-6 text-center shadow-md duration-75 ease-in hover:scale-95 hover:bg-slate-100 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
    @click="selectVote(vote)"
  >
    <p v-if="vote !== 'coffee'">
      {{ vote }}
    </p>
    <p v-else>
      <icon:line-md:coffee-filled class="inline-block h-6 w-6" />
    </p>
  </div>
</template>
