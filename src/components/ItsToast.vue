<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 opacity-90 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="show" class="ring-1/5 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-zinc-50 shadow-lg dark:bg-zinc-200">
          <div class="p-4">
            <div class="flex items-center">
              <div class="shrink-0 align-middle">
                <icon:mdi:check-circle-outline class="h-6 w-6 text-emerald-600" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-zinc-900">
                  Successfully saved!
                </p>
                <p class="mt-1 text-sm text-zinc-500">
                  Anyone with a link can now view this file.
                </p>
              </div>
              <div class="ml-4 flex shrink-0 self-start">
                <button
                  type="button"
                  class="inline-flex rounded-md bg-zinc-50 text-zinc-800 opacity-75 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-zinc-200"
                  @click="show = false"
                >
                  <span class="sr-only">Close</span>
                  <icon:mdi:close class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
