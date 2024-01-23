<script setup lang="ts">
import { DialogTitle } from '@headlessui/vue'
import type { Person } from '~/types'

const emits = defineEmits<{
  (e: 'toggleModal'): void
}>()

const user = ref()
function onSelectedPersonChanged(person: Person) {
  user.value = person
}

const isUserNotUndefined = computed(() => user.value !== undefined)

const formSending = ref(false)
const mainStore = useMainStore()

function claimExistingUser() {
  formSending.value = true
  mainStore.user.id = user.value.id
  mainStore.user.name = user.value.name
}
</script>

<template>
  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
    <span i-mdi:account-convert class="size-6 text-blue-600" />
  </div>
  <div class="mt-3 text-center sm:mt-5">
    <DialogTitle as="h3" class="text-lg font-medium leading-6">
      Claiming an existing user
    </DialogTitle>
    <p class="my-2 text-sm text-zinc-500 dark:text-zinc-300">
      You can also <span class="myLink" @click="emits('toggleModal')">join as a new user</span>.
    </p>
  </div>
  <form @submit.prevent="claimExistingUser">
    <div class="grid grid-flow-row-dense gap-3 sm:(mt-6 grid-cols-2)">
      <ComboBox @selected-changed="onSelectedPersonChanged" />
      <FormButton
        btn-text="Claim existing user"
        :form-sending="formSending"
        :name-or-user-is-valid="isUserNotUndefined"
      />
    </div>
  </form>
</template>
