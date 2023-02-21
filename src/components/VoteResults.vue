<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ voters?: User[]; isShirtMode?: boolean }>()

// const availableVotes = inject('availableVotes') as Ref<string[]>
</script>

<template>
  <number-vote-results v-if="!props.isShirtMode" :voters="voters" />
  <shirt-vote-results v-else-if="props.isShirtMode" :voters="voters" />
  <!-- <div v-if="sortedVotersWithoutNull && sortedVotersWithoutNull?.length > 0">
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
  </div> -->
  <p v-else>
    <img
      v-motion-pop
      src="https://media.tenor.com/WnjJsVOwoJQAAAAC/john-travolta-well.gif"
      alt="Confused Travolta"
      class="mx-auto my-5"
    >
    No votes :)
  </p>
</template>
