<script setup lang="ts">
import { ref } from 'vue'
import type { Person, User } from '~/types'

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

const { collectionID } = useCollectionId()
const { userState } = useUserState(collectionID)
</script>

<template>
  <BaseModal v-if="!userState" :open="open">
    <template #icon>
      <span i-mdi:account-question class="h-6 w-6 text-amber-600" />
    </template>
    <template #title>
      User not found
    </template>
    <template #description>
      The user could not be retrieved from database. <br>
      You can either claim an existing user within the current session...
    </template>
    <template #content>
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
    </template>
  </BaseModal>
</template>
