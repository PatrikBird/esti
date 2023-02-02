<script setup lang="ts">
import type { User } from '../types'

const props = defineProps<{ voters?: User[] }>()
</script>

<template>
  <average-vote :voters="voters" />
  <div class="gap-y-2 gap-x-8 sm:grid sm:grid-cols-2">
    <progress-bar :voters="voters" />
  </div>
</template>
