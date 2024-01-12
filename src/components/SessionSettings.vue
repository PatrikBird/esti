<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const { collectionID } = useCollectionId()
const { isShirtMode, availableVotes } = useSessionState(collectionID)
</script>

<template>
  <div class="inset-0 flex items-center justify-center">
    <button
      type="button"
      class="group rounded-full px-3 py-2 bg-white shadow-lg shadow-zinc-800/5
      ring-1 ring-zinc-900/5 hover:text-blue-500
      dark:(bg-zinc-800 ring-white/10 hover:text-blue-400 hover:ring-white/20)"
      @click="openModal"
    >
      <span i-carbon:settings class="h-[1.3rem] w-[1.3rem]" />
    </button>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-40" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-zinc-900/50 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="relative overflow-visible rounded-lg bg-white px-4 pt-5 pb-4
                text-left shadow-xl transition-all dark:bg-zinc-800 sm:(my-8 w-full max-w-lg p-6)"
            >
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <span i-carbon:settings class="h-[1.3rem] w-[1.3rem]" />
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-lg font-medium leading-6">
                  Settings
                </DialogTitle>
                <p class="my-2 text-sm text-zinc-500 dark:text-zinc-300">
                  Bla bla adjust settings bla bla
                </p>
              </div>

              <VoteSystemSelect />

              <FormButton
                btn-text="Save"
                :form-sending="false"
                :name-or-user-is-valid="true"
                @click="closeModal"
              />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
