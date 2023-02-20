<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { collection, doc } from 'firebase/firestore'
import { useDocument } from 'vuefire'
import type { Person, User } from '~/types'
import { db } from '~/modules/firebase'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{ users: User[] }>()
const emit = defineEmits<{
  (e: 'userClaimed', user: Person): void
  (e: 'userCreated', userID: string): void
}>()

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
  emit('userClaimed', user.value)
}

const userIDIfSet = computed(() => {
  if (mainStore.user.id.length === 0)
    return '12345'
  else
    return mainStore.user.id
})
const { data: currentUserData } = useDocument<User>(
  doc(collection(db, mainStore.session.id), userIDIfSet.value))

function userCreated(userDocRef: string) {
  emit('userCreated', userDocRef)
  // open.value = false
}
</script>

<template>
  <div v-if="!currentUserData">
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-50">
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
                        The user could not be retrieved from database. <br>
                        <span v-show="users.length > 0">
                          You can either claim an existing user or create a new one.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <!-- <div v-show="users.length > 0" class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"> -->
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    @click="claimExistingUser"
                  >
                    Claim existing user
                  </button>
                  <ComboBox :users="users" @selected-changed="onSelectedPersonChanged" />
                </div>

                <!-- <div v-show="users.length > 0" class="inline-flex w-full items-center justify-center"> -->
                <div class="inline-flex w-full items-center justify-center">
                  <hr class="my-8 h-px w-64 border-0 bg-zinc-200 dark:bg-zinc-700">
                  <span class="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium dark:bg-zinc-800">or join as new user</span>
                </div>

                <JoinWithNewUser @new-user-created="userCreated" />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
