<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { collection, doc } from 'firebase/firestore'
import { useDocument } from 'vuefire'
import type { Person, User } from '~/types'
import { db } from '~/modules/firebase'

const props = defineProps<{ users: User[] }>()

const open = ref(true)

const user = ref()
function onSelectedPersonChanged(person: Person) {
  user.value = person
}

const isUserNotUndefined = computed(() => user.value !== undefined)

const formSending = ref(false)
const mainStore = useMainStore()

function claimExistingUser() {
  formSending.value = true
  open.value = false
  mainStore.user.id = user.value.id
  mainStore.user.name = user.value.name
}

const userIDIfSet = computed(() => {
  if (mainStore.user.id.length === 0)
    return '12345'
  else
    return mainStore.user.id
})
const { data: currentUserData } = useDocument<User>(
  doc(collection(db, mainStore.session.id), userIDIfSet.value),
)
</script>

<template>
  <div v-if="!currentUserData">
    <TransitionRoot as="template" :show="open">
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
                  <span i-mdi:account-question class="h-6 w-6 text-amber-600" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6">
                    User not found
                  </DialogTitle>
                  <p class="my-2 text-sm text-zinc-500 dark:text-zinc-300">
                    The user could not be retrieved from database. <br>
                    You can either claim an existing user within the current session...
                  </p>
                </div>
                <form @submit.prevent="claimExistingUser">
                  <div class="grid grid-flow-row-dense gap-3 sm:mt-6 sm:grid-cols-2">
                    <ComboBox :users="props.users" @selected-changed="onSelectedPersonChanged" />
                    <FormButton
                      btn-text="Claim existing user"
                      :form-sending="formSending"
                      :name-or-user-is-valid="isUserNotUndefined"
                    />
                  </div>
                </form>

                <div class="inline-flex w-full items-center justify-center">
                  <hr class="my-8 h-px w-64 border-0 bg-zinc-200 dark:bg-zinc-700">
                  <span class="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium dark:bg-zinc-800">
                    or join as new user
                  </span>
                </div>

                <JoinWithNewUser />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
