<script setup lang="ts">
import { useDatabaseList } from 'vuefire'
import { ref as dbRef, getDatabase, ref, set } from 'firebase/database'

const db = getDatabase()
// set(dbRef(db, '1234-session-ID-56789'), {
//   'user-ID-123': {
//     name: 'Ada Lovelace',
//     voteValue: '8',
//     isObserver: false,
//     lastVote: '2018-01-01T00:00:00.000Z',
//   },
//   'user-ID-789': {
//     name: 'Grace Hopper',
//     voteValue: 'null',
//     isOberver: true,
//     lastVote: null,
//   },
//   'user-ID-0815': {
//     name: 'Alan Turing',
//     voteValue: '?',
//     isOberver: false,
//     lastVote: '2018-01-01T00:00:00.000Z',
//   },
//   'sessionState': {
//     voting: true,
//     isRevealed: false,
//     lastVoteReveal: '2018-01-01T00:00:00.000Z',
//     lastVoteReset: '2018-01-01T00:00:00.000Z',
//   },
// })

const users = useDatabaseList(ref(db, 'users'))
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      <p>user id: {{ user.id }}</p>
      <p>user name: {{ user.username }}</p>
      <p>user email: {{ user.email }}</p>
    </li>
  </ul>
</template>
