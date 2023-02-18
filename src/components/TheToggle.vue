<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const emit = defineEmits<{
  (e: 'isObserver', isObserver: boolean): void
}>()

const isDisabledClasses = computed(() => ({
  'bg-zinc-200': true,
  'dark:bg-zinc-800': true,
}))

const isObserver = ref(false)
watchEffect(() => {
  emit('isObserver', isObserver.value)
})
</script>

<template>
  <SwitchGroup as="div" class="flex items-center">
    <SwitchLabel as="span" class="mr-3 cursor-pointer">
      <span class="text-sm font-medium">Voter</span>
    </SwitchLabel>
    <Switch
      v-model="isObserver"
      class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent ring-offset-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-zinc-800"
      :class="[isObserver ? 'bg-blue-600' : isDisabledClasses]"
    >
      <span class="sr-only">Use setting</span>
      <span
        class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        :class="[isObserver ? 'translate-x-5' : 'translate-x-0']"
      >
        <span
          class="absolute inset-0 flex h-full w-full items-center justify-center"
          :class="[isObserver ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200']" aria-hidden="true"
        >
          <icon:line-md:chevron-left class="text-black" />
        </span>
        <span
          class="absolute inset-0 flex h-full w-full items-center justify-center"
          :class="[isObserver ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100']" aria-hidden="true"
        >
          <icon:line-md:chevron-left class="rotate-180 text-black" />
        </span>
      </span>
    </Switch>
    <SwitchLabel as="span" class="ml-3 cursor-pointer">
      <span class="text-sm font-medium">Observer</span>
    </SwitchLabel>
  </SwitchGroup>
</template>
