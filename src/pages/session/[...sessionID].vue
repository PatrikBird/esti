<script setup lang='ts'>
import { useDatabaseObject } from 'vuefire'
import { ref as dbRef, getDatabase } from 'firebase/database'
import type { SessionData, User } from '../../types'

const db = getDatabase()
const route = useRoute()
// const regex = /\/session\/\d{13}/
// if (regex.test(route.path))
//   console.log('regex.test(route.path) === true')

const sessionID = `session-${route.params.sessionID as string}`
const mainStore = useMainStore()
mainStore.session.id = sessionID

const sessionData = useDatabaseObject<SessionData>(dbRef(db, sessionID))
// const sessionState = computed(() => sessionData.value?.sessionState as unknown as SessionState)
const allUser = computed(() => sessionData.value?.users as unknown as User[])

const allVoter = computed(() => allUser.value?.filter(user => user.isObserver === false))
const allObserver = computed(() => allUser.value?.filter(user => user.isObserver === true))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <!-- <p>{{ allUser }}</p>
  <p>{{ allVoter }}</p>
  <p>{{ allObserver }}</p> -->
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
