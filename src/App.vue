<script setup lang="ts">
useHead({
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  script: [
    {
      'src': 'https://plausible.io/js/script.js',
      'data-domain': 'esti.patbird.me',
      'defer': true,
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
  <TheNavbar class="mb-8" />
  <div class="text-slate-700 dark:border-slate-700 dark:text-slate-400">
    <RouterView />
  </div>
</template>
