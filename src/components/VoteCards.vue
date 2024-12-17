<script setup lang='ts'>
import type { SessionState, User } from '~/types'
import { collection, doc, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { useCollection, useDocument } from 'vuefire'
import { db } from '~/modules/firebase'

const props = defineProps<{
  availableVotes: string[]
  isVoteRevealed?: boolean
}>()

const mainStore = useMainStore()
const { collectionID } = useCollectionID()

// TODO: refactor hacky solution to avoid running watcher on initial load
const lastResetOnUpdated = ref(false)

const selectedVote = ref()
function selectVote(vote: string) {
  selectedVote.value = vote
  updateDoc(doc(db, collectionID, mainStore.user.id), { voteValue: selectedVote.value, lastVoteOn: serverTimestamp() })
  lastResetOnUpdated.value = false
}

const { data: users, pending: usersPending } = useCollection<User>(
  query(
    collection(db, collectionID),
    where('name', '!=', null),
  ),
)

const getSelectedVoteFromDB = computed(() => {
  return users.value.find(u => u.id === mainStore.user.id)?.voteValue
})
watch(getSelectedVoteFromDB, () => {
  if (!usersPending.value)
    selectedVote.value = getSelectedVoteFromDB.value
})

const { data: sessionState, pending: statePending } = useDocument<SessionState>(
  doc(collection(db, collectionID), 'sessionState'),
)

const lastResetOn = computed(() => sessionState.value?.lastResetOn)
watch(lastResetOn, () => {
  if (!statePending.value && !lastResetOnUpdated.value) {
    lastResetOnUpdated.value = true
    selectedVote.value = undefined
  }
})

const { data: currentUserData } = useDocument<User>(
  doc(collection(db, collectionID), mainStore.user.id ?? 0),
)
</script>

<template>
  <button
    v-for="vote in props.availableVotes"
    :key="vote"
    :class="[
      { '!bg-emerald-400 !text-black': vote === selectedVote },
      { 'pointer-events-none opacity-40': props.isVoteRevealed || currentUserData?.isObserver },
    ]"
    class="m-1 inline-block w-24 rounded-lg bg-white border border-zinc-200 p-6
    text-center shadow-md transition-colors duration-100 ease-in-out hover:bg-emerald-100
    dark:(border-zinc-900 bg-zinc-800 hover:bg-emerald-700)"
    @click="selectVote(vote)"
  >
    <p v-if="vote !== 'coffee'">
      {{ vote }}
    </p>
    <p v-else>
      <span i-mdi:coffee class="inline-block h-6 w-6" />
    </p>
  </button>
</template>
