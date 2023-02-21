<script setup lang='ts'>
import type { User } from '~/types'

const props = defineProps<{ voters?: User[] }>()

const votersWithoutNull = computed(() => props.voters?.filter(v => v.voteValue !== null))

const sortedVotersWithoutNull = computed(() => {
  if (!votersWithoutNull.value)
    return undefined
  const voters = votersWithoutNull.value.slice()
  voters.sort((a, b) => {
    if (a.voteValue === '?')
      return 1
    if (b.voteValue === '?')
      return -1
    if (a.voteValue === 'coffee')
      return 1
    if (b.voteValue === 'coffee')
      return -1
    return +a.voteValue! - +b.voteValue!
  })

  return voters
})

const votersThatVotedANumber = computed(() =>
  votersWithoutNull.value?.filter(u => u.voteValue !== null && u.voteValue !== '?' && u.voteValue !== 'coffee'),
)

const maxVote = computed(() =>
  votersThatVotedANumber.value?.reduce((max, v) => Math.max(max, +v.voteValue!), 0),
)
</script>

<template>
  <div v-if="sortedVotersWithoutNull && sortedVotersWithoutNull?.length > 0">
    <average-vote
      :voters="sortedVotersWithoutNull"
      class="pl-2 sm:pl-0"
    />
    <div class="grid gap-y-2 gap-x-8 sm:grid-cols-2">
      <progress-bar
        v-for="{ id, name, voteValue } in sortedVotersWithoutNull" :key="id"
        :name="name"
        :vote-value="voteValue"
        :max-vote="maxVote"
      />
    </div>
  </div>
</template>
