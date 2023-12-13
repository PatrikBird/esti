<script setup lang='ts'>
import { useCollection, useDocument } from 'vuefire'
import { collection, doc, query, where } from 'firebase/firestore'
import type { SessionState, User } from '~/types'
import { db } from '~/modules/firebase'

const route = useRoute()
const mainStore = useMainStore()

const collectionID = ref(route.params.sessionID as string)
mainStore.session.id = collectionID.value

const showSessionNotFound = ref(false)
const { isSessionIDValid } = await useSessionExists(collectionID)
if (!isSessionIDValid.value) {
  console.error('Session ID is not valid!')
  showSessionNotFound.value = true
}

const { data: users, pending: usersPending, error: usersError } = useCollection<User>(
  query(
    collection(db, collectionID.value),
    where('name', '!=', null),
  ),
)

const userIDNotInDB = computed(() => {
  return !users.value?.find(u => u.id === mainStore.user.id)
})

const userIDIfSet = computed(() => {
  if (mainStore.user.id.length === 0)
    return '12345'
  else
    return mainStore.user.id
})
const { data: currentUserData } = useDocument<User>(
  doc(collection(db, collectionID.value), userIDIfSet.value),
)

const { data: sessionState, pending: statePending, error: stateError } = useDocument<SessionState>(
  doc(collection(db, collectionID.value), 'sessionState'),
)

const isVoteRevealed = computed(() => sessionState.value?.isVoteRevealed)

const voters = computed(() => {
  return users.value.filter(u => u.isObserver === false)
})
const observers = computed(() => {
  return users.value.filter(u => u.isObserver === true)
})
const voteRevealed = computed(() => {
  return sessionState.value?.isVoteRevealed
})

const allVotersHaveVoted = computed(() => {
  if (voters.value.length < 1)
    return false
  return voters.value.every(v => v.voteValue !== undefined && v.voteValue !== null)
})

const isShirtMode = computed(() => {
  return sessionState.value?.isShirtMode
})
const availableVotes: Ref<string[]> = ref([])
watchEffect(() => {
  if (isShirtMode.value) {
    availableVotes.value = [
      'XS',
      'S',
      'M',
      'L',
      'XL',
      '?',
      'coffee',
    ]
  }
  else {
    availableVotes.value = [
      '0',
      '1',
      '2',
      '3',
      '5',
      '8',
      '13',
      '20',
      '40',
      '100',
      '?',
      'coffee',
    ]
  }
})
provide('availableVotes', availableVotes)
</script>

<template>
  <SessionNotFound v-if="showSessionNotFound || stateError || usersError" />
  <LoadingSpinner v-else-if="statePending || usersPending" />
  <div v-else>
    <UserConnection
      v-if="!currentUserData && userIDNotInDB" :users="users"
    />
    <div v-else class="mt-5">
      <VoteCards
        :available-votes="availableVotes"
        :is-vote-revealed="isVoteRevealed"
      />
      <div class="mx-auto max-w-3xl">
        <TheButtons
          :is-vote-revealed="isVoteRevealed"
          :all-voters-have-voted="allVotersHaveVoted"
        />
        <div v-if="!voteRevealed">
          <LoadingTable v-if="!users" />
          <TheTable v-else :voters="voters" />
          <TheObservers :observers="observers" />
        </div>
        <VoteResults
          v-else
          :voters="voters"
          :is-shirt-mode="isShirtMode"
        />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: lay-session
</route>
