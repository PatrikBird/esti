<script setup lang='ts'>
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { RouterLink } from 'vue-router'
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

async function joinSession() {
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
  <div class="flex min-h-full flex-col justify-center py-14 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- <img class="mx-auto h-24 w-auto" src="/esti.svg" alt="Esti Logo"> -->
      <h1 class="text-2xl font-bold tracking-tight">
        <span class="text-blue-600">esti</span>mate
      </h1>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">
        Join an existing estimation
      </h2>
      <p class="mt-2 text-center text-sm">
        Or
        <RouterLink to="/new" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-400">
          create a new session
        </RouterLink>
      </p>
    </div>

    <div class="mx-auto mt-8 w-full max-w-md">
      <div class="rounded-lg bg-zinc-50 py-8 px-10 shadow-xl dark:bg-zinc-700">
        <form class="space-y-6" @submit.prevent="joinSession">
          <div>
            <label for="id" class="block text-left text-sm font-medium">Session ID</label>
            <div class="mt-1">
              <input id="id" v-model="mainStore.session.id" name="id" type="text" required class="block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700/5 dark:bg-zinc-800 dark:focus:border-blue-500">
            </div>
            <UsernameInput v-model="enteredName" class="mt-1" />
          </div>

          <div class="flex items-center justify-center">
            <GenericToggle off="Voter" on="Observer" @is-active="(e) => isObserver = e" />
          </div>

          <FormButton
            btn-text="Join session"
            :form-sending="formSending"
            :name-is-valid="nameIsValid"
            :entered-name-too-long="enteredNameTooLong"
          />
        </form>

        <div class="mt-6">
          <div class="mt-6 grid grid-cols-3 gap-3" />
        </div>
      </div>
    </div>
  </div>
</template>
