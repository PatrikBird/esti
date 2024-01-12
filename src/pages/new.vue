<script setup lang='ts'>
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { voteSystems } from '../utils/voteSystemProvider'
import { db } from '~/modules/firebase'
import { VoteSystem } from '~/types'

const router = useRouter()
const mainStore = useMainStore()

const formSending = ref(false)
const isObserver = ref(false)

const hasCoffeeVote = ref(true)
const hasQuestionVote = ref(true)
const selectedVoteSystem = ref<{ name: VoteSystem, values: string[] }>(voteSystems[0])

const availableVotes = computed(() => {
  let votes = [...selectedVoteSystem.value.values]

  if (hasCoffeeVote.value)
    votes = [...votes, 'coffee']
  else
    votes = votes.filter(vote => vote !== 'coffee')

  if (hasQuestionVote.value)
    votes = [...votes, '?']
  else
    votes = votes.filter(vote => vote !== '?')

  return votes
})

provide('availableVotes', availableVotes)

const isShirtMode = computed(() => selectedVoteSystem.value.name === VoteSystem.TShirtSizes)

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
    availableVotes: availableVotes.value,
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

// TODO: sort array before matching
const matchingVoteSystem = computed(() => {
  return voteSystems.find((voteSystem) => {
    return JSON.stringify(voteSystem.values) === JSON.stringify(props.availableVotes)
  })
})
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
      <label
        class="block w-full py-1 text-left text-sm font-medium"
      >
        Vote System
        <div class="w-full">
          <Listbox v-model="selectedVoteSystem">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-full cursor-default rounded bg-white py-2 pl-3
                pr-10 text-left shadow focus:outline-none cursor-pointer
                focus-visible:(border-indigo-500 ring-2 ring-white/75 ring-offset-2 ring-offset-orange-300)
                sm:text-sm"
              >
                <span class="block truncate">{{ selectedVoteSystem.name }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <span i-heroicons:chevron-up-down />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white
                  py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none
                  sm:text-sm"
                >
                  <ListboxOption
                    v-for="voteSystem in voteSystems"
                    v-slot="{ active, selected }"
                    :key="voteSystem.name"
                    :value="voteSystem"
                    as="template"
                  >
                    <li
                      class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                      :class="[active ? 'bg-amber-100 text-amber-900' : 'text-gray-900']"
                    >
                      <span class="block truncate text-left">{{ voteSystem.name }}</span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <span i-material-symbols:check-circle-outline />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
      </label>
      <div class="flex gap4">
        <input id="questionMarkCheckbox" v-model="hasQuestionVote" type="checkbox">
        <label for="questionMarkCheckbox">Question Mark</label>

        <input id="coffeeCheckbox" v-model="hasCoffeeVote" type="checkbox">
        <label for="coffeeCheckbox">Coffee</label>
      </div>
    </template>
    <template #formButton>
      <div class="flex items-center gap4">
        <FormButton
          btn-text="Create session"
          :form-sending="formSending"
          :name-or-user-is-valid="nameIsValid"
          :entered-name-too-long="enteredNameTooLong"
        />
      </div>
    </template>
  </BaseUserForm>
</template>
