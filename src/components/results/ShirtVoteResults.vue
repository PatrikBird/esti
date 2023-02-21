<script setup lang='ts'>
import type { User } from '~/types'

const props = defineProps<{ voters?: User[] }>()

const availableVotes: Ref<string[]> = inject('availableVotes') as Ref<string[]>

const votersByVoteValue = computed(() => {
  if (!props.voters)
    return undefined

  const myVoters = props.voters.slice()
  const result = {} as Record<string, User[]>

  for (const vote of availableVotes.value)
    result[vote] = myVoters.filter(v => v.voteValue === vote)

  return result
})

// const votersThatVotedAShirtSize = computed(() =>
//   props.voters?.filter(u => u.voteValue !== '?' && u.voteValue !== 'coffee'),
// )

const voteValues = computed(() => Object.values(votersByVoteValue.value || {}))
const totalVotes = computed(() =>
  voteValues.value.reduce((sum, votes) => sum + votes.length, 0),
)
const totalSlices = computed(() => voteValues.value.length)

watchEffect(() => {
  console.log('votersByVoteValue', votersByVoteValue.value)
  console.log('voteValues', voteValues.value)
  console.log('totalVotes', totalVotes.value)
  console.log('totalSlices', totalSlices.value)
})
</script>

<template>
  <div class="grid gap-y-2 gap-x-8 sm:grid-cols-2">
    <div v-for="(users, key) in votersByVoteValue" :key="key">
      <ShirtProgressBar
        v-for="{ id, name, voteValue } in users" :key="id" :name="name"
        :vote-value="voteValue"
      />
    </div>
    <!-- <ShirtProgressBar
      v-for="{ id, name, voteValue } in sortedVotersWithoutNull" :key="id"
      :name="name"
      :vote-value="voteValue"
    /> -->
  </div>
</template>
