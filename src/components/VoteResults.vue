<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ voters?: User[], isShirtMode?: boolean }>()

const votersWithoutNull = computed(() => props.voters?.filter(v => v.voteValue !== null))
</script>

<template>
  <div class="mt-5">
    <div v-if="votersWithoutNull && votersWithoutNull?.length > 0">
      <number-vote-results v-if="!props.isShirtMode" :voters="votersWithoutNull" />
      <shirt-vote-results v-else-if="props.isShirtMode" :voters="votersWithoutNull" />
    </div>
    <!-- TODO: remove -->
    <p v-else>
      <img
        src="https://media.tenor.com/WnjJsVOwoJQAAAAC/john-travolta-well.gif"
        alt="Confused Travolta"
        class="mx-auto my-5"
      >
      No votes :)
    </p>
  </div>
</template>
