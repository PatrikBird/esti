<script setup lang='ts'>
import { useCollection, useDocument } from 'vuefire'
import { collection, doc, query, where } from 'firebase/firestore'
import type { SessionState, User } from '../../types'
import { db } from '../../modules/firebase'

const route = useRoute()
const mainStore = useMainStore()

const collectionID = ref(route.params.sessionID as string)

const { data: sessionState, pending: statePending, error: stateError } = useDocument<SessionState>(
  doc(collection(db, collectionID.value), 'sessionState'))

const { data: users, pending: usersPending, error: usersError } = useCollection<User>(
  query(
    collection(db, collectionID.value),
    where('name', '!=', null)))

const userIDNotInDB = computed(() => {
  return mainStore.user.id && !users.value?.find(u => u.id === mainStore.user.id)
})

const voters = computed(() => {
  return users.value.filter(u => u.isObserver === false)
})
const observers = computed(() => {
  return users.value.filter(u => u.isObserver === true)
})
const voteRevealed = computed(() => {
  return sessionState.value?.isVoteRevealed
})

const availableVotes = [
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
]
provide('availableVotes', availableVotes)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <!-- <div>voters: {{ voters }}</div>
  <br>
  <div>observers: {{ observers }}</div>
  <br>
  <div>state: {{ sessionState }}</div> -->
  <div v-if="stateError">
    <SessionNotFound />
  </div>
  <div v-else-if="statePending">
    <!-- Temp loader -->
    <div class="flex h-screen flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
          <svg class="h-6 w-6 text-white" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p class="mt-2 text-green-500">
          Loading...
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <user-connection v-if="!mainStore.user.id || userIDNotInDB" :users="users" />
    <VoteCards
      :available-votes="availableVotes"
      :coffee="true"
    />
    <div class="mx-auto max-w-3xl">
      <TheButtons />
      <div v-if="!voteRevealed">
        <LoadingTable v-if="!users" />
        <TheTable v-else :voters="voters" />
        <TheObservers :observers="observers" />
      </div>
      <div v-else>
        <vote-results :voters="voters" />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: lay-session
</route>
