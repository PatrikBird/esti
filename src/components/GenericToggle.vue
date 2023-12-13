<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const props = defineProps<{ off: string, on: string }>()

const emit = defineEmits<{
  (e: 'isActive', isActive: boolean): void
}>()

const isActive = ref(false)
watchEffect(() => {
  emit('isActive', isActive.value)
})
</script>

<template>
  <SwitchGroup as="div" class="flex items-center">
    <SwitchLabel as="span" class="mr-3 cursor-pointer">
      <span class="text-sm font-medium">{{ props.off }}</span>
    </SwitchLabel>
    <Switch
      v-model="isActive"
      class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-blue-600 ring-offset-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-zinc-800"
    >
      <span
        class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        :class="[isActive ? 'translate-x-5' : 'translate-x-0']"
      >
        <span
          class="absolute inset-0 flex h-full w-full items-center justify-center"
          :class="[isActive ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in']" aria-hidden="true"
        >
          <span i-line-md:chevron-left class="text-black" />
        </span>
        <span
          class="absolute inset-0 flex h-full w-full items-center justify-center"
          :class="[isActive ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out']" aria-hidden="true"
        >
          <span i-line-md:chevron-left class="rotate-180 text-black" />
        </span>
      </span>
    </Switch>
    <SwitchLabel as="span" class="ml-3 cursor-pointer">
      <span class="text-sm font-medium">{{ props.on }}</span>
    </SwitchLabel>
  </SwitchGroup>
</template>
