<script setup lang='ts'>
import { useDatabaseObject } from 'vuefire'
import { ref as dbRef, getDatabase } from 'firebase/database'
import type { SessionData, SessionState, User } from '../types'

const db = getDatabase()
const sessionID = '1234-session-ID-56789'
const sessionData = useDatabaseObject<SessionData>(dbRef(db, sessionID))
const sessionState = computed(() => sessionData.value?.sessionState as unknown as SessionState)
const allUsers = computed(() => sessionData.value?.users as unknown as User[])
const ada = computed(() => allUsers.value?.find(user => user.name === 'Ada Lovelace'))
</script>

<template>
  <div class="mb-6">
    <p class="mb-6">
      session data:
    </p>
    {{ sessionData }}
    <p class="my-6">
      session state:
    </p>
    {{ sessionState }}
    <p class="my-6">
      all Users:
    </p>
    {{ allUsers }}
    <p class="my-6">
      Ada:
    </p>
    {{ ada }}
  </div>
  <ul class="my-6">
    <p>
      Iterate over list:
    </p>
    <li v-for="user in allUsers" :key="user.id">
      name: {{ user.name }},
      vote: {{ user.voteValue }},
      isObserver: {{ user.isObserver }}
      lastVote: {{ user.lastVote }}
    </li>
  </ul>
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
  <TheButtons />
  <TheTable />
</template>
