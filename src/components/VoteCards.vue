<script setup lang='ts'>
const props = defineProps<{ availableVotes: string[]; coffee: boolean }>()
</script>

<template>
  <div class="text-center">
    <div
      v-for="vote in props.availableVotes"
      :key="vote"
      class="m-1 inline-block w-24 cursor-pointer rounded-lg border border-slate-200 p-6 text-center shadow-md duration-75 ease-in hover:scale-95 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
    >
      <p class="select-none font-normal text-slate-700 dark:text-slate-400">
        {{ vote }}
      </p>
    </div>
    <div v-if="props.coffee" class="m-1 inline-block w-24 cursor-pointer rounded-lg border border-slate-200 p-6 text-center shadow-md duration-75 ease-in hover:scale-95 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">
      <p class="select-none font-normal text-slate-700 dark:text-slate-400">
        <icon:line-md:coffee-filled class="inline-block h-6 w-6" />
      </p>
    </div>
  </div>
</template>
