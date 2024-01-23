<script setup lang='ts'>
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { DialogTitle } from '@headlessui/vue'
import { db } from '~/modules/firebase'

const emits = defineEmits<{
  (e: 'toggleModal'): void
}>()

const mainStore = useMainStore()

const isObserver = ref(false)
const formSending = ref(false)

const enteredName = ref('')
const { nameIsValid, enteredNameTooLong } = useNameValidator(enteredName)

async function addUserToDB() {
  formSending.value = true
  mainStore.user.name = enteredName.value

  const userDocRef = await addDoc(collection(db, mainStore.session.id), {
    name: mainStore.user.name,
    voteValue: null,
    isObserver: isObserver.value,
    lastVoteOn: null,
    joinedOn: Timestamp.fromDate(new Date()),
  })
  mainStore.user.id = userDocRef.id
}

function handleUserOptionSelected(option: string) {
  isObserver.value = option === 'Observer'
}
</script>

<template>
  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
    <span i-mdi:account class="size-6 text-blue-600" />
  </div>
  <div class="mt-3 text-center sm:mt-5">
    <DialogTitle as="h3" class="text-lg font-medium leading-6">
      Joining a session
    </DialogTitle>
    <p class="my-2 text-sm text-zinc-500 dark:text-zinc-300">
      You can also <span class="myLink" @click="emits('toggleModal')">claim an existing user</span> if you joined the session before.
    </p>
  </div>
  <form @submit.prevent="addUserToDB">
    <UsernameInput v-model="enteredName" :error="enteredNameTooLong" class="mt-1" />
    <div class="flex mb5 items-center justify-center">
      <GenericToggle :options="['Voter', 'Observer']" @option-selected="handleUserOptionSelected" />
    </div>
    <FormButton
      btn-text="Join session"
      :form-sending="formSending"
      :name-or-user-is-valid="nameIsValid"
      :entered-name-too-long="enteredNameTooLong"
    />
  </form>
</template>
