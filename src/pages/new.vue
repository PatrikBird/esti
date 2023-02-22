<script setup lang='ts'>
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '~/modules/firebase'

const router = useRouter()
const mainStore = useMainStore()

const formSending = ref(false)
const isObserver = ref(false)
const isShirtMode = ref(false)

const enteredName = ref('')
const { nameIsValid, enteredNameTooLong } = useNameValidator(enteredName)

async function writeData() {
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
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-14 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-2xl font-bold tracking-tight">
        <span class="text-blue-600">esti</span>mate
      </h1>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">
        Create a new estimation
      </h2>
      <p class="mt-2 text-center text-sm">
        Or
        <RouterLink
          to="/join"
          class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-400"
        >
          join an existing session
        </RouterLink>
      </p>
    </div>

    <div class="mx-auto mt-8 w-full max-w-md">
      <div class="rounded-lg bg-zinc-50 py-8 px-10 shadow-xl dark:bg-zinc-700">
        <form class="space-y-6" @submit.prevent="writeData">
          <UsernameInput v-model="enteredName" />
          <div class="flex items-center justify-center">
            <GenericToggle off="Voter" on="Observer" @is-active="(e) => isObserver = e" />
          </div>
          <div class="flex items-center justify-center">
            <GenericToggle off="Numbers" on="T-Shirt" @is-active="(e) => isShirtMode = e" />
          </div>
          <FormButton
            btn-text="Create session"
            :form-sending="formSending"
            :name-is-valid="nameIsValid"
            :entered-name-too-long="enteredNameTooLong"
          />
        </form>
        <!-- <div class="mt-6">
          <div class="mt-6 grid grid-cols-3 gap-3" />
        </div> -->
      </div>
    </div>
  </div>
</template>
