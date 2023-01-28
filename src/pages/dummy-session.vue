<script setup lang='ts'>
import { useDatabaseObject } from 'vuefire'
import { ref as dbRef, getDatabase } from 'firebase/database'
import type { SessionData, SessionState, User } from '../types'

const db = getDatabase()
const sessionID = '1234-session-ID-56789'
const sessionData = useDatabaseObject<SessionData>(dbRef(db, sessionID))
const sessionState = computed(() => sessionData.value?.sessionState as unknown as SessionState)
const allUser = computed(() => sessionData.value?.users as unknown as User[])
const allObserver = computed(() => allUser.value?.filter(user => user.isObserver === true))
const allVoter = computed(() => allUser.value?.filter(user => user.isObserver === false))
const ada = computed(() => allUser.value?.find(user => user.name === 'Ada Lovelace'))
// get id from route
const route = useRoute()
const sessionIDsoon = route.name
</script>

<template>
  <!-- <ItsToast /> -->
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
    <!-- <Suspense> -->
    <LoadingTable v-if="!allVoter" />
    <TheTable v-else :voters="allVoter" />
    <TheObservers :observers="allObserver" />
    <!-- </Suspense> -->
  </div>
</template>

<route lang="yaml">
meta:
  layout: lay-session
</route>
