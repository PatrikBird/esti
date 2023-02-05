<script setup lang='ts'>
import { collection, doc, query, updateDoc, where } from 'firebase/firestore'
import { useCollection, useDocument } from 'vuefire'
import type { SessionState, User } from '~/types'
import { db } from '~/modules/firebase'

const props = defineProps<{ availableVotes: string[]; coffee: boolean }>()

const mainStore = useMainStore()
const route = useRoute()
const collectionID = ref(route.params.sessionID as string)

const votes = computed(() => {
  if (props.coffee)
    return [...props.availableVotes, 'coffee']
  else
    return props.availableVotes
})

// TODO: refactor hacky solution to avoid running watcher on initial load
const lastResetOnUpdated = ref(false)

const selectedVote = ref()
function selectVote(vote: string) {
  selectedVote.value = vote
  updateDoc(doc(db, collectionID.value, mainStore.user.id), { voteValue: selectedVote.value })
  lastResetOnUpdated.value = false
}

const { data: users, pending: usersPending, error: usersError } = useCollection<User>(
  query(
    collection(db, collectionID.value),
    where('name', '!=', null)))

const getSelectedVoteFromDB = computed(() => {
  return users.value.find(u => u.id === mainStore.user.id)?.voteValue
})
watch(getSelectedVoteFromDB, () => {
  if (!usersPending.value)
    selectedVote.value = getSelectedVoteFromDB.value
})

const { data: sessionState, pending: statePending, error: stateError } = useDocument<SessionState>(
  doc(collection(db, collectionID.value), 'sessionState'))

const lastResetOn = computed(() => sessionState.value?.lastResetOn)
watch(lastResetOn, () => {
  if (!statePending.value && !lastResetOnUpdated.value) {
    console.log('Reset vote visuals')
    lastResetOnUpdated.value = true
    selectedVote.value = undefined
  }
})
</script>

<template>
  <div
    v-for="vote in votes"
    :key="vote"
    tabindex="0"
    :class="[{ '!bg-emerald-400': vote === selectedVote }, { '!text-black': vote === selectedVote }]"
    class="m-1 inline-block w-24 cursor-pointer select-none rounded-lg border border-zinc-200 p-6
    text-center shadow-md transition-transform duration-75 ease-in hover:scale-95 hover:bg-zinc-100
    dark:border-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 "
    @click="selectVote(vote)"
  >
    <p v-if="vote !== 'coffee'">
      {{ vote }}
    </p>
    <p v-else>
      <icon:mdi:coffee class="inline-block h-6 w-6" />
    </p>
  </div>
</template>
