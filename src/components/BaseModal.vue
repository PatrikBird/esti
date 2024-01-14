<script setup lang='ts'>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = withDefaults(defineProps<{ open: boolean }>(), {
  open: true,
})
</script>

<template>
  <!-- <div> -->
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" class="relative z-50">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-zinc-900/50 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative overflow-visible rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl
              transition-all dark:bg-zinc-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <slot name="icon" />
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-lg font-medium leading-6">
                  <slot name="title" />
                </DialogTitle>
                <p class="my-2 text-sm text-zinc-500 dark:text-zinc-300">
                  <slot name="description" />
                </p>
              </div>
              <slot name="content" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <!-- </div> -->
</template>
