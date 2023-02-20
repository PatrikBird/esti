<script setup lang='ts'>
import { useCollection, useDocument } from 'vuefire'
import { collection, doc, query, where } from 'firebase/firestore'
import type { Person, SessionState, User } from '~/types'
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
    where('name', '!=', null)))

const userIDNotInDB = computed(() => {
  return !users.value?.find(u => u.id === mainStore.user.id)
})

const { data: sessionState, pending: statePending, error: stateError } = useDocument<SessionState>(
  doc(collection(db, collectionID.value), 'sessionState'))

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
const showToast = ref(false)
function userHasBeenClaimed(user: Person) {
  console.log('User has been claimed: ', user)
  showToast.value = true
}
function newUserHasBeenCreated(userID: string) {
  console.log('New User has been created: ', userID)
  showToast.value = true
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <SessionNotFound v-if="showSessionNotFound || stateError || usersError" />
  <LoadingSpinner v-else-if="statePending || usersPending" />
  <div v-else>
    <user-connection
      v-if="userIDNotInDB" :users="users"
      @user-claimed="userHasBeenClaimed"
      @user-created="newUserHasBeenCreated"
    />
    <div v-else class="mt-5">
      <!-- <div v-if="showToast">
        <its-toast />
      </div> -->
      <vote-cards
        :available-votes="availableVotes"
        :coffee="true"
        :is-vote-revealed="isVoteRevealed"
      />
      <div class="mx-auto max-w-3xl">
        <the-buttons
          :is-vote-revealed="isVoteRevealed"
        />
        <div v-if="!voteRevealed">
          <loading-table v-if="!users" />
          <the-table v-else :voters="voters" />
          <the-observers :observers="observers" />
        </div>
        <div v-else>
          <vote-results :voters="voters" />
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: lay-session
</route>
