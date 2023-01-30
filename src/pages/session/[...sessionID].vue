<script setup lang='ts'>
import { useDatabaseObject } from 'vuefire'
import { ref as dbRef, getDatabase } from 'firebase/database'
import type { SessionState, State, Users } from '../../types'

const db = getDatabase()
const route = useRoute()
const mainStore = useMainStore()
const userArr = ref([])

const { data: sessionData, pending, error } = useDatabaseObject<State>(dbRef(db, route.params.sessionID as string))
const sessionState = computed(() => sessionData.value?.sessionState as SessionState)
const allUsers = computed(() => sessionData.value?.users as Users)

// watch(allUsers, (val) => {
//   console.log(val)
//   // update userArr with Object.values(allUsers.value) ? allUsers.value : []
//   userArr.value = Object.values(allUsers.value)
// })

// const test = computed(() => {
//   return Object.values(allUsers)
// })

// const allUsersArr = computed(() => {
//   return Object.values(allUsers.value) ? allUsers.value : []
// })
// const allVoter = computed(() => allUsers.value?.filter(user => user.isObserver === false))
// const allObserver = computed(() => allUsers.value?.filter(user => user.isObserver === true))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <!-- <p>{{ sessionState }}</p> -->
  <p>{{ allUsers }}</p>
  <!-- {{ test }} -->
  <div v-if="error">
    <SessionNotFound />
  </div>
  <div v-else-if="pending">
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
      <!-- <LoadingTable v-if="!allVoter" /> -->
      <!-- <TheTable v-else :voters="allVoter" /> -->
      <TheTable :voters="allUsers" />
      <!-- <TheObservers :observers="allObserver" /> -->
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: lay-session
</route>