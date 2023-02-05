<script setup lang='ts'>
import type { ComputedRef } from 'vue'

const props = defineProps<{ name: string; voteValue: string | null; maxVote?: number }>()

// const val = computed(() =>
//   (props.voteValue === '?' || props.voteValue === 'break') ? '100' : props.voteValue,
// )
const val: ComputedRef<string> = computed(() => {
  let percentage = 100
  if (props.voteValue && props.voteValue !== '?' && props.voteValue !== 'break')
    percentage = (parseInt(props.voteValue) / props.maxVote!) * 100

  return `${percentage}`
})
</script>

<template>
  <dl>
    <dt class="pt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 sm:pt-0">
      {{ name }}
    </dt>
    <dd class="mb-3 flex items-center">
      <div class="mr-2 h-2.5 w-full rounded bg-zinc-200 dark:bg-zinc-700">
        <div
          class="fill-me h-2.5 rounded bg-indigo-600 dark:bg-indigo-500"
        />
      </div>
      <div class="float-right w-1/12">
        <span v-if="voteValue === 'coffee'" class="text-center text-lg font-medium text-zinc-500 dark:text-zinc-400">
          <icon:mdi:coffee />
        </span>
        <span v-else class="text-sm font-medium text-zinc-500 dark:text-zinc-400">{{ voteValue }}</span>
      </div>
    </dd>
  </dl>
</template>

<style scoped>
.fill-me {
width: v-bind('`${val}%`');
}
</style>
