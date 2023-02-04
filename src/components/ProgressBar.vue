<script setup lang='ts'>
const props = defineProps<{ name: string; voteValue: string | null; maxVote?: number }>()

const val = computed(() =>
  (props.voteValue === '?' || props.voteValue === 'break') ? '100' : props.voteValue,
)

const progressWidth = computed(() => {
  if (val.value === null)
    return 'w-0'
  if (val.value === 'coffee' || val.value === '?')
    return 'w-100'

  // if (props.maxVote)
  //   return `w-${Math.round((+val.value / props.maxVote) * 100)}%`

  return `w-[${val.value}%]`
})

watchEffect(() => {
  console.log('progressWidth', progressWidth.value)
})
</script>

<template>
  <!-- <div class="w-full rounded-full bg-gray-200 dark:bg-gray-700">
    <div class="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100" style="width: 45%">
      45%
    </div>
  </div> -->
  <dl>
    <dt class="pt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 sm:pt-0">
      {{ name }}
    </dt>
    <dd class="mb-3 flex items-center">
      <div class="mr-2 h-2.5 w-full rounded bg-zinc-200 dark:bg-zinc-700">
        <div
          :class="progressWidth"
          class="h-2.5 rounded bg-indigo-600 dark:bg-indigo-500"
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
