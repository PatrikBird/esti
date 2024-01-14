<script setup lang='ts'>
const props = defineProps<{ userID: string, setIsObserverTo: boolean }>()
const hoveredUserID = ref('')

const { toggleUserMode } = useUserModeToggle()
</script>

<template>
  <table-action-btn
    :title="props.setIsObserverTo ? 'Move User to Observer' : 'Move User to Voter'"
    @click="toggleUserMode(props.userID, props.setIsObserverTo)"
    @mouseover="hoveredUserID = props.userID"
    @mouseleave="hoveredUserID = ''"
  >
    <span
      v-show="hoveredUserID === props.userID"
      i-mdi:arrow-up
      class="inline-block h-5 w-5"
      :class="props.setIsObserverTo && 'rotate-180'"
    />
    <span
      v-show="hoveredUserID !== props.userID"
      i-mdi:eye
      class="inline-block h-5 w-5"
    />
  </table-action-btn>
</template>
