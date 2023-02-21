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

const votersThatVotedAShirtSize = computed(() =>
  props.voters?.filter(u => u.voteValue !== '?' && u.voteValue !== 'coffee'),
)
</script>

<template>
  <div class="mt-5 grid gap-4">
    <p>votersThatVotedAShirtSize: {{ votersThatVotedAShirtSize }}</p>
    <p>votersByVoteValue: {{ votersByVoteValue }}</p>
  </div>
</template>
