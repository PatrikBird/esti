<script setup lang='ts'>
import type { ComputedRef } from 'vue'

const props = defineProps<{ name: string; voteValue: string | null; maxVote?: number }>()

const val: ComputedRef<string> = computed(() => {
  let percentage = 100
  if (props.voteValue && props.voteValue !== '?' && props.voteValue !== 'coffee')
    percentage = (Number.parseInt(props.voteValue) / props.maxVote!) * 100

  return `${percentage}`
})

const voteIsNotANumber = computed(() => {
  if (props.voteValue && props.voteValue !== '?' && props.voteValue !== 'coffee')
    return false
  return true
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
          class="fill-me h-2.5 rounded bg-blue-600 dark:bg-blue-500"
          :class="{ '!bg-amber-500': voteIsNotANumber }"
        />
      </div>
      <div
        v-motion-pop
        :delay="200"
        class="float-right flex w-1/12"
      >
        <span v-if="voteValue === 'coffee'" class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <span i-mdi:coffee class="h-5 w-5" />
        </span>
        <span v-else class="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{{ voteValue }}</span>
      </div>
    </dd>
  </dl>
</template>

<style scoped>
.fill-me {
  animation: load .5s ease-in-out .1s;
  animation-fill-mode: forwards;
  width: 0%;
}
@keyframes load {
  from {
    width: 0%;
  }
  to {
    width: v-bind('`${val}%`');
  }
}
@-webkit-keyframes load {
  from {
    width: 0%;
  }
  to {
    width: v-bind('`${val}%`');
  }
}
</style>
