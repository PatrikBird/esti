<template>
  <h1
    v-motion
    class="text-3xl"
    :initial="{
      opacity: 0,
      y: 100,
    }"
    :enter="{
      opacity: 1,
      y: 0,
    }"
  >
    Hello 👋
  </h1>
  <!-- <TheTable /> -->
</template>

<route lang="yaml">
meta:
  layout: clean
</route>
