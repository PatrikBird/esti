<script setup lang='ts'>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import JoinAsNewUserModal from './JoinAsNewUserModal.vue'
import ClaimExistingUserModal from './ClaimExistingUserModal.vue'

const props = withDefaults(defineProps<{ open?: boolean }>(), {
  open: true,
})

const currentModal = shallowRef(ClaimExistingUserModal)
function toggle() {
  currentModal.value = currentModal.value === JoinAsNewUserModal ? ClaimExistingUserModal : JoinAsNewUserModal
}
</script>

<template>
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
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:(items-center p-0)">
          <TransitionChild
            as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:(translate-y-0 scale-95)"
          >
            <DialogPanel
              class="relative overflow-visible rounded-lg bg-white px-4 pt-5 pb-4
              text-left shadow-xl transition-all dark:bg-zinc-800 sm:(my-8 w-full max-w-lg p-6)"
            >
              <component :is="currentModal" @toggle-modal="toggle" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
