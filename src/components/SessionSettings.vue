<script setup lang='ts'>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
</script>

<template>
  <div class="w-full">
    <div class="mx-auto w-full">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="flex w-full justify-between rounded bg-purple-100 px-4 py-2
          text-left text-sm font-medium hover:bg-purple-200
          focus:outline-none"
        >
          <span>Settings</span>
          <div
            i-carbon:chevron-up
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-purple-500"
          />
          <!-- <span i-carbon:settings /> -->
        </DisclosureButton>
        <DisclosurePanel class="pb-1 pt-4 text-sm">
          <VoteSystemSelect />
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>
