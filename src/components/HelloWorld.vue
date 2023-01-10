<script setup lang="ts">
defineProps({
  msg: String,
})
const count = ref(0)
</script>

<template>
  <button type="button" @click="count++">
    count is {{ count }}
  </button>
  <p>Some info about this template?</p>
</template>
