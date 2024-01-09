<script setup lang='ts'>
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '~/modules/firebase'

const router = useRouter()
const mainStore = useMainStore()

const formSending = ref(false)
const isObserver = ref(false)
const isShirtMode = ref(false)
provide('isShirtMode', isShirtMode)
const availableVotes: Ref<string[]> = ref([])
provide('availableVotes', availableVotes)

const enteredName = ref('')
const { nameIsValid, enteredNameTooLong } = useNameValidator(enteredName)

async function onFormSubmit() {
  formSending.value = true
  mainStore.user.name = enteredName.value
  mainStore.session.id = Date.now().toString()
  const collectionRef = collection(db, mainStore.session.id)

  await setDoc(doc(db, mainStore.session.id, 'sessionState'), {
    isVoteRevealed: false,
    isShirtMode: isShirtMode.value,
    lastRevealOn: null,
    lastResetOn: null,
    createdOn: Timestamp.fromDate(new Date()),
  })

  const userDocRef = await addDoc(collectionRef, {
    name: mainStore.user.name,
    voteValue: null,
    isObserver: isObserver.value,
    lastVoteOn: null,
    joinedOn: Timestamp.fromDate(new Date()),
  })
  mainStore.user.id = userDocRef.id
  router.push(`/session/${mainStore.session.id}`)
}

function handleUserOptionSelected(option: string) {
  isObserver.value = option === 'Observer'
}
function handleVoteOptionSelected(option: string) {
  isShirtMode.value = option === 'T-Shirt'
}
</script>

<template>
  <BaseUserForm link-href="/join" @on-form-submit="onFormSubmit">
    <template #headline>
      Create a new estimation
    </template>
    <template #linkText>
      join an existing session
    </template>
    <template #formInput>
      <UsernameInput v-model="enteredName" />
    </template>
    <template #formToggle>
      <GenericToggle :options="['Voter', 'Observer']" @option-selected="handleUserOptionSelected" />
      <GenericToggle :options="['Numbers', 'T-Shirt']" @option-selected="handleVoteOptionSelected" />
    </template>
    <template #formButton>
      <FormButton
        btn-text="Create session"
        :form-sending="formSending"
        :name-or-user-is-valid="nameIsValid"
        :entered-name-too-long="enteredNameTooLong"
      />
    </template>
  </BaseUserForm>
</template>
