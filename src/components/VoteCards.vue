<script setup lang='ts'>
const props = defineProps<{ availableVotes: string[] }>()
</script>

<template>
  <div
    v-for="vote in props.availableVotes"
    :key="vote"
    class="w-24 text-center cursor-pointer inline-block m-1 p-6 border border-slate-200 rounded-lg shadow-md hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700"
  >
    <p class="font-normal select-none text-gray-700 dark:text-gray-400">
      {{ vote }}
    </p>
  </div>
</template>
