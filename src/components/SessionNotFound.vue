<script setup lang='ts'>
import { useMainStore } from '~/stores/main'

const mainStore = useMainStore()
mainStore.session.id = ''
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">
        Session not found
      </h2>
      <p class="mt-2 text-center text-sm">
        Try to
        <RouterLink to="/new" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
          create a new session
        </RouterLink>
        or
        <RouterLink to="/join" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
          join a session
        </RouterLink>
        instead.
      </p>
    </div>
  </div>
</template>
