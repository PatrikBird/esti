<script setup lang='ts'>
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '~/modules/firebase'

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
  <form class="space-y-6" @submit.prevent="addUserToDB">
    <UsernameInput v-model="enteredName" :error="enteredNameTooLong" class="mt-1" />
    <div class="flex items-center justify-center">
      <GenericToggle :options="['Voter', 'Observer']" @option-selected="handleUserOptionSelected" />
    </div>
    <FormButton
      btn-text="Join as new user"
      :form-sending="formSending"
      :name-or-user-is-valid="nameIsValid"
      :entered-name-too-long="enteredNameTooLong"
    />
  </form>
</template>
