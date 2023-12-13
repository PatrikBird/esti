<script setup lang='ts'>
const mapping = { XS: 20, S: 40, M: 60, L: 80, XL: 100 }
</script>

<template>
  <div
    v-visible="averageVoteValue"
    class="mb-5 flex items-center justify-center gap-1"
  >
    <p class="items-center rounded bg-blue-100 p-1.5 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
      {{ averageVoteValue ?? "None" }}
    </p>
    <p class="font-medium text-zinc-900 dark:text-white">
      Average
    </p>
    <div class="flex items-center gap-1">
      <span i-mdi:arrow-right-thin class="inline-block h-5 w-5" />
      <pop-over>
        {{ closestAvailableVote }}
      </pop-over>
      <span class="mx-2 h-1 w-1 rounded-full bg-zinc-900 dark:bg-zinc-500" />
      <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        based on {{ voters?.length }} {{ voters?.length === 1 ? 'vote' : 'votes' }}
      </p>
    </div>
  </div>
</template>
