<script setup lang='ts'>
import type { Ref } from 'vue'

const props = defineProps<{ availableVotes: string[]; coffee: boolean }>()
const votes = computed(() => {
  if (props.coffee)
    return [...props.availableVotes, 'coffee']
  else
    return props.availableVotes
})

// TODO: create watcher to reset selectedVote when Reset button is clicked

const selectedVote: Ref<string | undefined > = ref()
function selectVote(vote: string) {
  selectedVote.value = vote
}
</script>

<template>
  <div
    v-for="vote in votes"
    :key="vote"
    tabindex="0"
    :class="[{ '!bg-emerald-400': vote === selectedVote }, { '!text-black': vote === selectedVote }]"
    class="m-1 inline-block w-24 cursor-pointer select-none rounded-lg border border-slate-200 p-6 text-center shadow-md duration-75 ease-in hover:scale-95 hover:bg-slate-100 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
    @click="selectVote(vote)"
  >
    <p v-if="vote !== 'coffee'">
      {{ vote }}
    </p>
    <p v-else>
      <icon:mdi:coffee class="inline-block h-6 w-6" />
    </p>
  </div>
</template>
