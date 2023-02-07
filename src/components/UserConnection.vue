<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type { Person, User } from '~/types'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{ users: User[] }>()
console.log('user connection')

const open = ref(true)

const user = ref()
function onSelectedPersonChanged(person: Person) {
  user.value = person
}

const mainStore = useMainStore()
function claimExistingUser() {
  open.value = false
  mainStore.user.id = user.value.id
  mainStore.user.name = user.value.name
}
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-zinc-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative overflow-visible rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-zinc-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <icon:mdi:account-question class="h-6 w-6 text-amber-600" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6">
                    Cached user not found
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-zinc-500 dark:text-zinc-300">
                      The user could not be retrieved from local storage. <br> You can either claim an existing user or create a new one.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  @click="claimExistingUser"
                >
                  Claim existing user
                </button>
                <ComboBox :users="users" @selected-changed="onSelectedPersonChanged" />
              </div>

              <div class="inline-flex w-full items-center justify-center">
                <hr class="my-8 h-px w-64 border-0 bg-zinc-200 dark:bg-zinc-700">
                <span class="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium dark:bg-zinc-800">or join as new user</span>
              </div>

              <JoinWithNewUser />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
