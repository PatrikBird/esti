<script setup lang="ts">
useHead({
  meta: [
    { name: 'description', content: 'Story estimation made easy' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  // link: [
  //   {
  //     rel: 'icon',
  //     type: 'image/svg+xml',
  //     href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
  //   },
  // ],
})
</script>

<template>
  <TheNavbar />
  <RouterView />
</template>
