<script setup lang='ts'>
// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{ userId: string; setIsObserverTo: boolean }>()
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
    <icon:mdi:arrow-up
      v-show="hoveredUserID === userId"
      class="inline-block h-5 w-5"
      :class="setIsObserverTo && 'rotate-180'"
    />
    <icon:mdi:eye
      v-show="hoveredUserID !== userId"
      class="inline-block h-5 w-5"
    />
  </table-action-btn>
</template>
