<script setup lang="ts">
import type { User } from '../types'

const props = defineProps<{ voters?: User[] }>()
</script>

<template>
  <average-vote :voters="voters" />
  <div class="sm:grid sm:grid-cols-2 sm:gap-y-2 sm:gap-x-8">
    <progress-bar
      v-for="{ id, name, voteValue } in voters" :key="id"
      :name="name"
      :vote-value="voteValue"
    />
  </div>
</template>
