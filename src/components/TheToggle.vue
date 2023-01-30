<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const mainStore = useMainStore()

const isDisabledClasses = computed(() => ({
  'bg-zinc-200': true,
  'dark:bg-zinc-700': true,
}))
</script>

<template>
  <SwitchGroup as="div" class="flex items-center">
    <SwitchLabel as="span" class="mr-3 cursor-pointer">
      <span class="text-sm font-medium">Voter</span>
    </SwitchLabel>
    <Switch v-model="mainStore.user.isObserver" class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent ring-offset-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-zinc-800" :class="[mainStore.user.isObserver ? 'bg-indigo-600' : isDisabledClasses]">
      <span class="sr-only">Use setting</span>
      <span class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" :class="[mainStore.user.isObserver ? 'translate-x-5' : 'translate-x-0']">
        <span class="absolute inset-0 flex h-full w-full items-center justify-center" :class="[mainStore.user.isObserver ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200']" aria-hidden="true">
          <!-- <svg class="h-3 w-3 text-zinc-400" fill="none" viewBox="0 0 12 12">
            <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg> -->
          <icon:line-md:chevron-left class="text-black" />
        </span>
        <span class="absolute inset-0 flex h-full w-full items-center justify-center" :class="[mainStore.user.isObserver ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100']" aria-hidden="true">
          <!-- <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg> -->
          <icon:line-md:chevron-left class="rotate-180 text-black" />

        </span>
      </span>
    </Switch>
    <SwitchLabel as="span" class="ml-3 cursor-pointer">
      <span class="text-sm font-medium">Observer</span>
    </SwitchLabel>
  </SwitchGroup>
</template>
