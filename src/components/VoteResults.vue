<script setup lang="ts">
import type { User } from '../types'

const props = defineProps<{ voters?: User[] }>()
const votersWithoutNull = computed(() => props.voters?.filter(v => v.voteValue !== null))
</script>

<template>
  <average-vote :voters="votersWithoutNull" />
  <div class="sm:grid sm:grid-cols-2 sm:gap-y-2 sm:gap-x-8">
    <progress-bar
      v-for="{ id, name, voteValue } in votersWithoutNull" :key="id"
      :name="name"
      :vote-value="voteValue"
    />
  </div>
</template>
