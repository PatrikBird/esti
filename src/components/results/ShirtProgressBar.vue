<script setup lang='ts'>
import type { ComputedRef } from 'vue'

const props = defineProps<{ name: string; voteValue: string | null; maxVote?: number }>()

const voteIsNotAShirtSize = computed(() => {
  if (props.voteValue && props.voteValue !== '?' && props.voteValue !== 'coffee')
    return false
  return true
})

const val: ComputedRef<number> = computed(() => {
  if (props.voteValue && !voteIsNotAShirtSize.value) {
    if (props.voteValue === 'XS')
      return 20
    if (props.voteValue === 'S')
      return 40
    if (props.voteValue === 'M')
      return 60
    if (props.voteValue === 'L')
      return 80
    if (props.voteValue === 'XL')
      return 100
  }
  return 100
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
          :class="{ '!bg-amber-500': voteIsNotAShirtSize }"
        />
      </div>
      <div
        class="float-right flex w-1/12 pop-animation"
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

.pop-animation {
  opacity: 0; /* Initial state: hidden */
  /* transform: scale(0); Initial state: scale(0); */
  animation: pop .2s ease-in 0.5s forwards;
}

@keyframes pop {
  0% {
    /* transform: scale(0); */
    opacity: 0;
  }
  100% {
    /* transform: scale(1); */
    opacity: 1;
  }
}
</style>
