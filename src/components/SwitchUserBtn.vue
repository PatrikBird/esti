<script setup lang='ts'>
// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{ userId: string, setIsObserverTo: boolean }>()
const hoveredUserID = ref('')

const { switchUserMode } = useUserModeSwitch()
</script>

<template>
  <table-action-btn
    :title="setIsObserverTo ? 'Move User to Observer' : 'Move User to Voter'"
    @click="switchUserMode(userId, setIsObserverTo)"
    @mouseover="hoveredUserID = userId"
    @mouseleave="hoveredUserID = ''"
  >
    <span
      v-show="hoveredUserID === userId"
      i-mdi:arrow-up
      class="inline-block h-5 w-5"
      :class="setIsObserverTo && 'rotate-180'"
    />
    <span
      v-show="hoveredUserID !== userId"
      i-mdi:eye
      class="inline-block h-5 w-5"
    />
  </table-action-btn>
</template>
