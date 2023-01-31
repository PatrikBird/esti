<script setup lang='ts'>
import { useCollection, useDatabaseObject, useDocument } from 'vuefire'
import { ref as dbRef, getDatabase } from 'firebase/database'
import { collection, doc, getFirestore, orderBy, query, where } from 'firebase/firestore'
import type { SessionData, SessionState, User } from '../../types'

const db = getFirestore()
const route = useRoute()
const mainStore = useMainStore()

// function mapSessionState(data: any): SessionState {
//   return {
//     createdOn: `${data.createdOn.seconds}.${data.createdOn.nanoseconds}`,
//     isVoteRevealed: data.isVoteRevealed,
//     lastRevealOn: data.lastRevealOn,
//     lastResetOn: data.lastResetOn,
//   }
// }
// const { data: sessionState, pending, error } = useDocument(doc(collection(db, route.params.sessionID as string), 'sessionState'))
// const { data: sessionState } = useDocument<SessionState>(doc(collection(db, route.params.sessionID as string), 'sessionState'))
const collectionID = ref(route.params.sessionID as string)
// const collectionRef = collection(db, collectionID.value)

const { data: sessionState, pending: statePending, error: stateError } = useCollection<SessionState[]>(
  query(
    collection(db, collectionID.value),
    where('isVoteRevealed', '!=', null)))

const { data: users, pending: usersPending, error: usersError } = useCollection<User[]>(
  query(
    collection(db, collectionID.value),
    where('name', '!=', null)))

// const state = query(collection(db, route.params.sessionID as string), where('isVoteRevealed', '!=', null))
// const users = query(collection(db, route.params.sessionID as string), where('name', '!=', null))
// const wootstate = useCollection<SessionState[]>(state)
// const wootusers = useCollection<User[]>(users)

// watchEffect(() => {
//   console.log(sessionState.value)
// })
// const observers = computed(() => sessionData.value.filter(u => u.users === true))
// const voters = computed(() => allUsers.value.filter(u => u.isObserver === false))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>state: {{ sessionState }}</div>
  <br>
  <div>users: {{ users }}</div>
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
    <user-connection v-if="!mainStore.user.id" />
    <VoteCards
      :available-votes="[
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
      ]"
      :coffee="true"
    />
    <div class="mx-auto max-w-3xl">
      <TheButtons />
      <LoadingTable v-if="!users" />
      <TheTable v-else :voters="users" />
      <TheObservers :observers="users" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: lay-session
</route>
