<script setup lang='ts'>
const props = defineProps<{ linkHref: string }>()
const emits = defineEmits<{
  (e: 'onFormSubmit'): void
}>()
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-14 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-2xl font-bold tracking-tight">
        <span class="text-blue-600">esti</span>mate
      </h1>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">
        <slot name="headline" />
      </h2>
      <p class="mt-2 text-center text-sm">
        Or
        <RouterLink
          :to="props.linkHref"
          class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-400"
        >
          <slot name="linkText" />
        </RouterLink>
      </p>
    </div>
    <div class="mx-auto mt-8 w-full max-w-md">
      <div class="rounded-lg bg-zinc-50 py-8 px-10 shadow-xl dark:bg-zinc-800">
        <form class="space-y-4" @submit.prevent="emits('onFormSubmit')">
          <div>
            <slot name="formInput" />
          </div>
          <div class="flex flex-col items-center justify-center gap-5">
            <slot name="formToggle" />
          </div>
          <slot name="formButton" />
        </form>
      </div>
    </div>
  </div>
</template>
