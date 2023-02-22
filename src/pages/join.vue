<script setup lang='ts'>
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { db } from '~/modules/firebase'

const mainStore = useMainStore()
const router = useRouter()

const formSending = ref(false)
const isObserver = ref(false)

const enteredName = ref('')
const { nameIsValid, enteredNameTooLong } = useNameValidator(enteredName)

async function retrieveUserFromDB() {
  if (!mainStore.user.id)
    return
  const docRef = doc(db, mainStore.session.id, mainStore.user.id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists())
    return { data: docSnap.data(), id: docSnap.id }
}

async function onFormSubmit() {
  formSending.value = true
  mainStore.user.name = enteredName.value

  const { isSessionIDValid } = await useSessionExists(mainStore.session.id)
  if (!isSessionIDValid.value) {
    console.error('Session ID is not valid!')
    return
  }
  const retrievedUser = await retrieveUserFromDB()
  if (!retrievedUser) {
    const collectionRef = collection(db, mainStore.session.id)
    const userDocRef = await addDoc(collectionRef, {
      name: mainStore.user.name,
      voteValue: null,
      isObserver: isObserver.value,
      lastVoteOn: null,
    })
    mainStore.user.id = userDocRef.id
  }
  else {
    // TODO: Show modal to ask if user wants to retrieve data from DB
    // TRUE: Retrieve data from DB, FALSE: Create new user
    // Or just show Toast that user already exists and will be retrieved?
    mainStore.user.name = retrievedUser.data.name
    mainStore.user.id = retrievedUser.id
  }
  router.push(`/session/${mainStore.session.id}`)
}
</script>

<template>
  <BaseUserForm link-href="/new" @on-form-submit="onFormSubmit">
    <template #headline>
      Join an existing estimation
    </template>
    <template #linkText>
      create a new session
    </template>
    <template #formInput>
      <label for="id" class="block py-1 text-left text-sm font-medium">Session ID</label>
      <input
        id="id" v-model="mainStore.session.id"
        name="id"
        type="text"
        required
        class="block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700/5 dark:bg-zinc-800 dark:focus:border-blue-500"
      >
      <UsernameInput v-model="enteredName" />
    </template>
    <template #formToggle>
      <GenericToggle off="Voter" on="Observer" @is-active="(e) => isObserver = e" />
    </template>
    <template #formButton>
      <FormButton
        btn-text="Join session"
        :form-sending="formSending"
        :name-or-user-is-valid="nameIsValid"
        :entered-name-too-long="enteredNameTooLong"
      />
    </template>
  </BaseUserForm>
</template>
