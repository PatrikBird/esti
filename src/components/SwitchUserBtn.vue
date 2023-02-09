<script setup lang='ts'>
const props = defineProps<{ userId: string; setIsObserverTo: boolean }>()
const hoveredUserID = ref('')

const { switchUserMode } = useUserModeSwitch()
</script>

<template>
  <button
    type="button"
    class="rounded-md px-1.5 py-1 text-sm font-medium shadow-sm hover:bg-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:hover:bg-zinc-700"
    :title="setIsObserverTo ? 'Make Observer' : 'Make Voter'"
    @click="switchUserMode(userId, setIsObserverTo)"
    @mouseover="hoveredUserID = userId"
    @mouseleave="hoveredUserID = ''"
  >
    <icon:mdi:arrow-up
      v-show="hoveredUserID === userId"
      class="inline-block h-5 w-5"
      :class="setIsObserverTo && 'rotate-180'"
    />
    <icon:mdi:eye
      v-show="hoveredUserID !== userId"
      class="inline-block h-5 w-5"
    />
  </button>
</template>
