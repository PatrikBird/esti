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

  // filter empty values
  for (const key in result) {
    if (result[key].length === 0)
      delete result[key]
  }

  return result
})

// const voteValues = computed(() => Object.values(votersByVoteValue.value || {}))
// const totalVotes = computed(() =>
//   voteValues.value.reduce((sum, votes) => sum + votes.length, 0),
// )
// const totalSlices = computed(() => voteValues.value.length)

watchEffect(() => {
  // console.log('votersByVoteValue', votersByVoteValue.value)
  // console.log('voteValues', voteValues.value)
  // console.log('totalVotes', totalVotes.value)
  // console.log('totalSlices', totalSlices.value)
})
</script>

<template>
  <div class="grid grid-cols-1 gap-y-2 gap-x-8">
    <div v-for="(users, key) in votersByVoteValue" :key="key">
      <ShirtProgressBar
        v-for="{ id, name, voteValue } in users" :key="id" :name="name"
        :vote-value="voteValue"
      />
    </div>
  </div>
</template>
